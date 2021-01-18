from negocio.negocio import Negocio
from data.data_demanda import DatosDemanda
import custom_exceptions

class NegocioDemanda(Negocio):
    @classmethod
    def delete(cls,idEnt,idArt):
        """
        Elimina una demanda de la BD a partir de un id de Entidad y uno de Articulo
        """
        try:
            DatosDemanda.delete(idEnt,idArt)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_demanda.delete()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de Negocio eliminando una demanda de la base de Datos")


    @classmethod
    def add(cls,idEnt,idArt,cantidad):
        """
            Agrega una demanda a la Base de Datos
        """
        try:
            DatosDemanda.add(idEnt,idArt,cantidad)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_demanda.add()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de Negocio agregando una demanda de la base de Datos")
