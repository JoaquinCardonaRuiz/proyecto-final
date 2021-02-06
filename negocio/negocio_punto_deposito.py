from data.data_material import DatosMaterial
from negocio.negocio_entidad_destino import NegocioEntidadDestino
from data.data_horario import DatosHorario
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

class NegocioPuntoDeposito(Negocio):
    """Clase que representa la capa de negocio para la entidad Punto de Depósito. Hereda de Negocio."""      
    #TODO: Actualizar definiciones de métodos y mensajes de las excpeciones.                                     

    @classmethod
    def get_all(cls):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        #Conexión con el motor de BD.
        try:
            puntos_deposito = DatosPuntoDeposito.get_all()
            for punto_dep in puntos_deposito:
                punto_dep.direccion = Utils.adress_format(punto_dep.direccion)
                punto_dep.estado = Utils.boolean_tinyInt_converter(punto_dep.estado)
                punto_dep.fechaComienzoActividad = Utils.date_format(punto_dep.fechaComienzoActividad)
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
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")
    

    
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
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")
    

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
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")

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
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")
    
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
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")

    @classmethod
    def get_materialesPd_by_id(cls, idPunto):
        """
        Dtermina si un Punto de Depósito abre de lunes a viernes.
        """
        #Conexión con el motor de BD.
        try:
            materiales = DatosMaterial.get_all_byIdPuntoDep(idPunto)
            materiales_ = []
            for material in materiales:
                materiales_.append({"id":material.id, "nombre":material.nombre, "unidadMedida":material.unidadMedida, "color":material.color})
            return materiales_
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")

    
    @classmethod
    def get_all_names(cls):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        #Conexión con el motor de BD.
        try:
            return DatosPuntoDeposito.get_all_names()
        
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")