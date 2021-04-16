from negocio.negocio import Negocio
from data.data_reportes import DatosReportes
import custom_exceptions

class NegocioReportes():
    @classmethod
    def get_cant_usuarios(cls):
        try:
            return DatosReportes.get_cant_usuarios()
        except Exception as e:
            raise e