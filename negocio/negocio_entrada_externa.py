from negocio.negocio import Negocio
import custom_exceptions
from data.data_entrada_externa import DatosEntradaExterna
from datetime import datetime

class NegocioEntradaExterna(Negocio):
    
    @classmethod
    def add_one(cls,idMaterial, cant, concepto, fecha):
        try:
            format_str = '%Y-%m-%d' # The format
            fecha = datetime.strptime(fecha, format_str)
            return DatosEntradaExterna.add_one(idMaterial, cant, concepto, fecha)
        except Exception as e:
            raise e