from negocio.negocio import Negocio
from data.data_ecopuntos import DatosEcoPuntos
import custom_exceptions

class NegocioEcoPuntos(Negocio):
    @classmethod
    def get_valor_EP(cls):
        try:
            return DatosEcoPuntos.get_valor_EP()
        except Exception as e:
            raise e