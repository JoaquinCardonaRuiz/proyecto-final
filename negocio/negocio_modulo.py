from negocio.negocio import Negocio
import custom_exceptions
from data.data_modulo import DatosModulo

class NegocioModulo(Negocio):
    
    @classmethod
    def get_all(cls):
        try:
            return DatosModulo.get_all()
        except Exception as e:
            raise(e)