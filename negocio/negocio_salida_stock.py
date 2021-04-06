from negocio.negocio import Negocio
import custom_exceptions
from data.data_salida_stock import DatosSalidaStock

class NegocioSalidaStock(Negocio):
    
    @classmethod
    def get_all(cls):
        try:
            return DatosSalidaStock.get_all()
        except Exception as e:
            raise e