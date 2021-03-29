from data.data_material import DatosMaterial
from negocio.negocio_horario import NegocioHorario
from data.data_horario import DatosHorario
from negocio.negocio_direccion import NegocioDireccion
from classes import PuntoDeposito
from flask.json import jsonify
from utils import Utils
from werkzeug import utils
from data.data_punto_deposito import DatosPuntoDeposito
from negocio.negocio import Negocio
import custom_exceptions
import time
from datetime import datetime, timezone, timedelta
import pytz
import math
import ast
import numpy as np


class NegocioPuntoDeposito(Negocio):
    """Clase que representa la capa de negocio para la entidad Punto de Depósito. Hereda de Negocio."""      

    @classmethod
    def get_all(cls):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        #Conexión con el motor de BD.
        try:
            puntos_deposito = DatosPuntoDeposito.get_all()
            for punto_dep in puntos_deposito:
                punto_dep.estado = bool(punto_dep.estado)
            return puntos_deposito
        
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")
    
    @classmethod
    def get_horarios_id(cls, id):
        """
        Obtiene los horarios de un Punto de Depósito en base a un id y los convierte en un diccionario.
        """
        #Conexión con el motor de BD.
        try:
            horarios = DatosHorario.get_horariosPD_id(id)
            horarios_ = []
            for horario in horarios:

                horarios_.append({"id":horario.id,"horaDesde":horario.formato_horaDesde(), "horaHasta":horario.formato_horaHasta(),"dia":horario.dia})
            estado_actual = NegocioPuntoDeposito.esta_abierto(horarios)

            #Chequea si está abierto
            horarios_.append(estado_actual[0])
            #Obtiene cuanto le falta para el horario de cierre en base al horario actual
            horarios_.append(estado_actual[1])
            #Chequea si el punto abre los fines de semana.
            horarios_.append(NegocioPuntoDeposito.abre_fin_semana(horarios))
            #Chequea si el punto abre los dias de la semana.
            horarios_.append(NegocioPuntoDeposito.abre_toda_semana(horarios))
            #Añade los horarios correspendientes al día actual
            horarios_.append(estado_actual[2])

            return horarios_
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_horarios_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los horarios de un Punto por su ID de la capa de Datos.")
    

    
    @classmethod
    def esta_abierto(cls, horarios):
        """
        Obtiene los horarios de un Punto de Depósito en base a un id y los convierte en un diccionario.
        """
        #Conexión con el motor de BD.
        try:
            tz = pytz.timezone('America/Buenos_Aires')
            current_time = datetime.now(tz).time() #.strftime("%H:%M")
            current_day = Utils.traductor_nombre_dias(datetime.now(tz).strftime("%A"))
            for horario in horarios:
                if horario.dia == current_day:
                    if horario.horaDesde != False and horario.horaHasta != False:
                        times = [horario.horaDesde[:-3],horario.horaHasta[:-3]]
                        if datetime.strptime(horario.horaDesde, '%H:%M:%S').time() < current_time and datetime.strptime(horario.horaHasta, '%H:%M:%S').time() > current_time:
                            return [True, NegocioPuntoDeposito.tiempo_cierre(datetime.strptime(horario.horaHasta, '%H:%M:%S'),current_time),times]
                    else:
                        times = False

            return [False,False,times]
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.esta_abierto()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio determinando si un Punto de Depósito está abierto.")
    

    @classmethod
    def tiempo_cierre(cls, hora_hasta, current_time):
        """
        Obtiene el tiempo restante para el cierre de Punto, recibiendo como parámetro la hora actual y el horario de cierre.
        """
        #Conexión con el motor de BD.
        try:
            today = datetime.today()
            current_time = datetime.combine(today,current_time)
            hora_hasta = datetime.combine(today,hora_hasta.time())  
            diff = (hora_hasta - current_time).total_seconds()/3600 
            frac, whole = math.modf(diff)
            tiempo_cierre = str(int(whole)) + "hs " + str(int(round(60*frac,0))) + "min"
            return tiempo_cierre
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.tiempo_cierre()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio calculando el tiempo restante para el cierre del PD.")

    @classmethod
    def abre_fin_semana(cls, horarios):
        """
        Dtermina si un Punto de Depósito abre los fines de semana.
        """
        #Conexión con el motor de BD.
        try:
            sabado = next(x for x in horarios if x.dia == "Sábado")
            domingo = next(x for x in horarios if x.dia == "Domingo")

            if sabado.horaDesde != False and sabado.horaHasta != False:
                if domingo.horaDesde != False and domingo.horaHasta != False:
                    return True
            return False
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.abre_fin_semana()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio calculando si un Punto de Depósito abre los fines de semana.")
    
    @classmethod
    def abre_toda_semana(cls, horarios):
        """
        Dtermina si un Punto de Depósito abre de lunes a viernes.
        """
        #Conexión con el motor de BD.
        try:
            lunes = next(x for x in horarios if x.dia == "Lunes")
            martes = next(x for x in horarios if x.dia == "Martes")
            miercoles = next(x for x in horarios if x.dia == "Miércoles")
            jueves = next(x for x in horarios if x.dia == "Jueves")
            viernes = next(x for x in horarios if x.dia == "Viernes")

            if lunes.horaDesde != False and lunes.horaHasta != False:
                if martes.horaDesde != False and martes.horaHasta != False:
                    if miercoles.horaDesde != False and miercoles.horaHasta != False:
                        if jueves.horaDesde != False and jueves.horaHasta != False:
                            if viernes.horaDesde != False and viernes.horaHasta != False:
                                return True
            return False
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.abre_toda_semana()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio calculando si un PD abre de corrido durante la semana.")

    @classmethod
    def get_materialesPd_by_id(cls, idPunto, json_return=True):
        """
        Obtiene los materiales que acepta un punto de depósito en base al ID que recibe como parámetro.
        """
        #Conexión con el motor de BD.
        try:
            materiales = DatosMaterial.get_all_byIdPuntoDep(idPunto)
            materiales_ = []
            if json_return == False:
                return materiales
            else:
                for material in materiales:
                    materiales_.append({"id":material.id, "nombre":material.nombre, "unidadMedida":material.unidadMedida, "color":material.color, "estado":material.estado})
                return materiales_
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_materialesPd_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los materiales que acepta un PD de la capa de Datos.")

    
    @classmethod
    def get_all_names(cls):
        """
        Obtiene todos los nombres de los Puntos de Depósito de la BD.
        """
        #Conexión con el motor de BD.
        try:
            return DatosPuntoDeposito.get_all_names()
        
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all_names()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los nombres de los puntos de depósito de la capa de Datos.")

    
    @classmethod
    def alta_pd(cls, nombre, estado, calle, altura, ciudad, provincia, pais, horarios, materiales):
        """
        Gestiona el alta de un Punto de Depósito en la BD.
        """
        #Conexión con el motor de BD.
        try:
            #Valida que el nombre no esté vacío.
            if nombre == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. El nombre no puede quedar vacío.")
            #Valida RN25
            if nombre in cls.get_all_names():
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. El nombre ya fue utilizado.")

            #Valida RN24
            estado = Utils.js_py_bool_converter(estado)
            if estado != True and estado != False:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. El estado no puede ser distinto de True o False.")
            
            #Validación de direccion
            NegocioDireccion.valida_direccion(calle, altura, ciudad, provincia, pais)
            #Validacion horarios
            for horario in horarios:
                NegocioHorario.valida_horarios(horario)
            
            #Alta de la direccion
            idDireccion = NegocioDireccion.alta_direccion(calle, altura, ciudad, provincia, pais)
            #Alta Punto de Depósito
            idPuntoDep = DatosPuntoDeposito.alta_pd(PuntoDeposito(None, None, estado, nombre, None, None),idDireccion)
            #Alta horarios
            NegocioHorario.alta_horarios(horarios, idPuntoDep)
            #alta materiales_PD
            if materiales == "" or materiales =="[]":
                DatosPuntoDeposito.alta_materialPD([], idPuntoDep)
            else:
                DatosPuntoDeposito.alta_materialPD(ast.literal_eval(materiales), idPuntoDep)

            

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.alta_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta un Punto de Depósito.")
        

    @classmethod
    def mod_pd(cls, nombre, estado, calle, altura, ciudad, provincia, pais, horarios, materiales_new, id_direccion, id_punto, nombre_ant):
        """
        Gestiona la modificación de un PD.
        """
        try:
            #Conexión con el motor de BD.
            #Valida RN23
            if nombre == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.mod_pd()",
                                                        msj_adicional = "Error al modificar el Punto de Depósito. El nombre no puede quedar vacío.")
            #Valida RN25
            if nombre in cls.get_all_names() and nombre != nombre_ant:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.mod_pd()",
                                                        msj_adicional = "Error al modificar el Punto de Depósito. El nombre ya fue utilizado.")
            #Valida RN24
            estado = Utils.js_py_bool_converter(estado)
            if estado != True and estado != False:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.mod_pd()",
                                                        msj_adicional = "Error al modificar el Punto de Depósito. El estado no puede ser distinto de True o False.")
            
            #Validación de direccion
            NegocioDireccion.valida_direccion(calle, altura, ciudad, provincia, pais)
            #Validacion horarios
            for horario in horarios:
                NegocioHorario.valida_horarios(horario)
            
            #Modificación de la direccion
            NegocioDireccion.mod_direccion(id_direccion, calle, altura, ciudad, provincia, pais)
            #Modificación Punto de Depósito
            DatosPuntoDeposito.mod_pd(PuntoDeposito(id_punto, None, estado, nombre, None, None))
            #Modificación horarios
            NegocioHorario.mod_horarios(horarios, id_punto)
            
            #Modificacion materiales_PD
            #1-Obtengo listado ID materiales viejos
            materiales_ant_ = cls.get_materialesPd_by_id(id_punto, False)
            materiales_ant = []
            for material in materiales_ant_:
                materiales_ant.append(material.id)
            #2-Obtengo listado ID materiales nuevos
            if materiales_new != "":
                materiales_new = ast.literal_eval(materiales_new)
                #3-Materiales a añadir
                toAddMats = np.setdiff1d(materiales_new,materiales_ant)
                #4-Materiales a eliminar
                toRemoveMats = np.setdiff1d(materiales_ant,materiales_new)
                #5-Hago alta y eliminación
                DatosPuntoDeposito.alta_materialPD(toAddMats, id_punto)
                DatosPuntoDeposito.baja_materialPD(toRemoveMats, id_punto)


        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.mod_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio modificando un Punto de Depósito.")


    @classmethod
    def baja_pd(cls, idPunto):
        """
        Gestiona el borrado lógico un Punto de Depósito en base al ID que recibe como parámetro.
        """
        #Conexión con el motor de BD.
        try:
            if id != None:
                DatosPuntoDeposito.baja_pd(idPunto)
            else:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_deposito.baja_pd()",
                                                        msj_adicional = "Error al dar de baja el Punto de Depósito. El id del Punto está vacío.")
                
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.baja_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio eliminando un Punto de Depósito.")
    