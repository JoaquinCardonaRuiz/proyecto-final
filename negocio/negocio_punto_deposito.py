from data.data_horario import DatosHorario
from flask.json import jsonify
from utils import Utils
from werkzeug import utils
from data.data_punto_deposito import DatosPuntoDeposito
from negocio.negocio import Negocio
import custom_exceptions

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
                horarios_.append({"id":horario.id,"horaDesde":horario.horaDesde,"horaHasta":horario.horaHasta,"dia":horario.dia})
            return horarios_
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los puntos de depósito de la capa de Datos.")
        
    
