from negocio.negocio import Negocio
from data.data_punto_retiro import DatosPuntoRetiro
import custom_exceptions

class NegocioPuntoRetiro(Negocio):
    @classmethod
    def get_all(cls):
        try:
            return DatosPuntoRetiro.get_all()
        except Exception as e:
            raise e


    @classmethod
    def get_by_id(cls,id):
        try:
            return DatosPuntoRetiro.get_by_id(id)
        except Exception as e:
            raise e