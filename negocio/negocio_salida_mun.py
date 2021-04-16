from negocio.negocio import Negocio
import custom_exceptions
from data.data_salidas_mun import DatosSalidaStockMun
from data.data_articulo import DatosArticulo
from negocio.negocio_articulo import NegocioArticulo
from datetime import datetime

class NegocioSalidaMun(Negocio):
    
    @classmethod
    def get_all(cls):
        try:
            return DatosSalidaStockMun.get_all()
        except Exception as e:
            raise e
    
    @classmethod
    def add_one(cls,idArt, cant, concepto, fecha):
        try:
            cant = float(cant)
            format_str = '%Y-%m-%d' # Formato de la fecha
            fecha = datetime.strptime(fecha, format_str)
            NegocioArticulo.checkStock(idArt,cant)
            art = NegocioArticulo.get_by_id(idArt)
            NegocioArticulo.checkStock(idArt,cant)
            costoObtAlt = art.costoObtencionAlternativa * cant
            costoTotal = art.costoTotal * cant
            if DatosSalidaStockMun.add_one(idArt,cant,concepto,fecha,costoTotal,costoObtAlt):
                NegocioArticulo.disminuirStock(idArt,cant)
        except Exception as e:
            raise e