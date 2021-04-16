from negocio.negocio import Negocio
import custom_exceptions
from data.data_salida_stock import DatosSalidaStock
from negocio.negocio_articulo import NegocioArticulo
from datetime import datetime

class NegocioSalidaStock(Negocio):
    
    @classmethod
    def get_all(cls):
        try:
            return DatosSalidaStock.get_all()
        except Exception as e:
            raise e
    
    @classmethod
    def add_one(cls,idEntidad, idArt, cant, concepto, fecha, valorTotal):
        try:
            cant = float(cant)
            format_str = '%Y-%m-%d' # Formato de la fecha
            fecha = datetime.strptime(fecha, format_str)
            art = NegocioArticulo.get_by_id(idArt)
            NegocioArticulo.checkStock(idArt,cant)
            costoTotal = art.costoTotal * cant
            if DatosSalidaStock.add_one(idArt,cant,concepto,fecha,idEntidad, valorTotal,costoTotal):
                NegocioArticulo.disminuirStock(idArt,cant)
        except Exception as e:
            raise e