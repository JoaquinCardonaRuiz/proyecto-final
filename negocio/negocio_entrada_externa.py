from negocio.negocio import Negocio
import custom_exceptions
from data.data_entrada_externa import DatosEntradaExterna
from datetime import datetime
from data.data_material import DatosMaterial
from negocio.negocio_material import NegocioMaterial


class NegocioEntradaExterna(Negocio):
    
    @classmethod
    def add_one(cls,idMaterial, cant, concepto, fecha):
        try:
            format_str = '%Y-%m-%d' # Formato de la fecha
            fecha = datetime.strptime(fecha, format_str)
            if DatosEntradaExterna.add_one(idMaterial, cant, concepto, fecha):
                DatosMaterial.addStock(idMaterial,float(cant))
        except Exception as e:
            raise e