from data.data_material import DatosMaterial
from negocio.negocio_horario import NegocioHorario
from data.data_horario import DatosHorario
from negocio.negocio_direccion import NegocioDireccion
from classes import PuntoRetiro
from flask.json import jsonify
from utils import Utils
from werkzeug import utils
from data.data_punto_retiro import DatosPuntoRetiro
from negocio.negocio import Negocio
import custom_exceptions
import time
from datetime import datetime, timezone, timedelta
import pytz
import math
import ast
import numpy as np


class NegocioPuntoRetiro(Negocio):
    @classmethod
    def get_all(cls,noFilter=False,filterInactivos=False):
        try:
            return DatosPuntoRetiro.get_all(noFilter,filterInactivos)
        except Exception as e:
            raise e


    @classmethod
    def get_demora_promedio(cls):
        try:
            return DatosPuntoRetiro.get_demora_promedio()
        except Exception as e:
            raise e

    @classmethod
    def get_by_id(cls,id):
        try:
            return DatosPuntoRetiro.get_by_id(id)
        except Exception as e:
            raise e
    
    @classmethod
    def get_all_names(cls):
        try:
            return DatosPuntoRetiro.get_all_names()
        except Exception as e:
            raise e
    
    @classmethod
    def get_horarios_id(cls, id):
        """
        Obtiene los horarios de un Punto de Retiro en base a un id y los convierte en un diccionario.
        """
        #Conexión con el motor de BD.
        try:
            horarios = DatosHorario.get_horariosPR_id(id)
            horarios_ = []
            for horario in horarios:

                horarios_.append({"id":horario.id,"horaDesde":horario.formato_horaDesde(), "horaHasta":horario.formato_horaHasta(),"dia":horario.dia})
            estado_actual = cls.esta_abierto(horarios)

            #Chequea si está abierto
            horarios_.append(estado_actual[0])
            #Obtiene cuanto le falta para el horario de cierre en base al horario actual
            horarios_.append(estado_actual[1])
            #Chequea si el punto abre los fines de semana.
            horarios_.append(cls.abre_fin_semana(horarios))
            #Chequea si el punto abre los dias de la semana.
            horarios_.append(cls.abre_toda_semana(horarios))
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
        Obtiene los horarios de un Punto de Retiro en base a un id y los convierte en un diccionario.
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
                            return [True, cls.tiempo_cierre(datetime.strptime(horario.horaHasta, '%H:%M:%S'),current_time),times]
                    else:
                        times = False

            return [False,False,times]
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.esta_abierto()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio determinando si un Punto de Retiro está abierto.")
    

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
                                                    msj_adicional="Error en la capa de Negocio calculando el tiempo restante para el cierre del PR.")
    
    @classmethod
    def abre_fin_semana(cls, horarios):
        """
        Dtermina si un Punto de Retiro abre los fines de semana.
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
                                                    msj_adicional="Error en la capa de Negocio calculando si un Punto de Retiro abre los fines de semana.")
    
    @classmethod
    def abre_toda_semana(cls, horarios):
        """
        Dtermina si un Punto de Retiro abre de lunes a viernes.
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
                                                    msj_adicional="Error en la capa de Negocio calculando si un PR abre de corrido durante la semana.")
    
    @classmethod
    def alta_pr(cls, nombre, estado, calle, altura, ciudad, provincia, pais, horarios, demora):
        """
        Gestiona el alta de un Punto de Retiro en la BD.
        """
        #Conexión con el motor de BD.
        try:
            #Valida que el nombre no esté vacío.
            if nombre == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.alta_pr()",
                                                        msj_adicional = "Error al añadir el Punto de Retiro. El nombre no puede quedar vacío.")
            #Valida RN25
            if nombre in cls.get_all_names():
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.alta_p()",
                                                        msj_adicional = "Error al añadir el Punto de Retiro. El nombre ya fue utilizado.")

            #Valida RN24
            estado = Utils.js_py_bool_converter(estado)
            if estado != True and estado != False:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.alta_pr()",
                                                        msj_adicional = "Error al añadir el Punto de Retiro. El estado no puede ser distinto de True o False.")
            
            #Validación de direccion
            NegocioDireccion.valida_direccion(calle, altura, ciudad, provincia, pais)
            #Validacion horarios
            for horario in horarios:
                NegocioHorario.valida_horarios(horario)
            
            #Alta de la direccion
            idDireccion = NegocioDireccion.alta_direccion(calle, altura, ciudad, provincia, pais)
            #Alta Punto de Retiro
            idPuntoRetiro = DatosPuntoRetiro.alta_pr(PuntoRetiro(None,None,nombre,None,None,demora,estado),idDireccion)
            #Alta horarios
            NegocioHorario.alta_horarios(horarios, idPuntoRetiro, False)

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.alta_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta un Punto de Retiro.")

    @classmethod
    def mod_pr(cls, nombre, estado, calle, altura, ciudad, provincia, pais, horarios, demora, id_direccion, id_punto, nombre_ant):
        """
        Gestiona la modificación de un PD.
        """
        try:
            #Conexión con el motor de BD.
            #Valida que el nombre no esté vacío.
            if nombre == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.mod_pr()",
                                                        msj_adicional = "Error al modificar el Punto de Retiro. El nombre no puede quedar vacío.")
            #Valida RN25
            if nombre in cls.get_all_names() and nombre != nombre_ant:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.mod_pr()",
                                                        msj_adicional = "Error al modificar el Punto de Retiro. El nombre ya fue utilizado.")
            #Valida RN24
            estado = Utils.js_py_bool_converter(estado)
            if estado != True and estado != False:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.mod_pr()",
                                                        msj_adicional = "Error al modificar el Punto de Retiro. El estado no puede ser distinto de True o False.")
            
            #Validación de direccion
            NegocioDireccion.valida_direccion(calle, altura, ciudad, provincia, pais)
            #Validacion horarios
            for horario in horarios:
                NegocioHorario.valida_horarios(horario)
            
            #Modificación de la direccion
            NegocioDireccion.mod_direccion(id_direccion, calle, altura, ciudad, provincia, pais)
            #Modificación Punto de Retiro
            DatosPuntoRetiro.mod_pr(PuntoRetiro(id_punto,None,nombre,None,None,demora,estado))
            #Modificación horarios
            NegocioHorario.mod_horarios(horarios, id_punto, False)


        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.mod_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio modificando un Punto de Retiro.")

    @classmethod
    def baja_pr(cls, idPunto):
        """
        Gestiona el borrado lógico un Punto de Retiro en base al ID que recibe como parámetro.
        """
        #Conexión con el motor de BD.
        try:
            if id != None:
                DatosPuntoRetiro.baja_pr(idPunto)
            else:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_punto_retiro.baja_pr()",
                                                        msj_adicional = "Error al dar de baja el Punto de Retiro. El id del Punto está vacío.")
                
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.baja_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio eliminando un Punto de Retiro.")
