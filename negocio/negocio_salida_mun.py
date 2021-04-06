from negocio.negocio import Negocio
import custom_exceptions
from data.data_salidas_mun import DatosSalidaStockMun

class NegocioSalidaMun(Negocio):
    
    @classmethod
    def get_all(cls):
        try:
            return DatosSalidaStockMun.get_all()
        except Exception as e:
            raise e