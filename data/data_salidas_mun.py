from data.data import Datos
from data.data_articulo import DatosArticulo
import custom_exceptions
from classes import SalidaStockMunicipalidad, CantArticulo

class DatosSalidaStockMun(Datos):
    
    @classmethod
    def get_all(cls,noClose = False):
        """Obtiene todas las salidas de la municipalidad de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idSalidaMun, \
                           idTipoArticulo, \
                           cantSalida, \
                           fecha   \
                           from salidasMun")
            cls.cursor.execute(sql)
            salidasMun = []
            salidasMun_ = cls.cursor.fetchall()
            if len(salidasMun_) > 0:
                for salida in salidasMun_:
                    cant_articulo = CantArticulo(salida[2],salida[1])
                    salidasMun.append(SalidaStockMunicipalidad(salida[0],cant_articulo,salida[3].strftime("%d/%m/%Y")))
            return salidasMun
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todas las salidas de la municipalidad de la BD.")