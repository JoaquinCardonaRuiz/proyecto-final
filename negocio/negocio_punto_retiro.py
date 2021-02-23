from negocio.negocio import Negocio
from data.data_punto_retiro import DatosPuntoRetiro
import custom_exceptions

class NegocioPuntoRetiro(Negocio):
    @classmethod
    def get_demora_promedio(cls):
        try:
            DatosPuntoRetiro.get_demora_promedio()
        except Exception as e:
            raise e