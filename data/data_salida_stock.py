from data.data import Datos
from data.data_articulo import DatosArticulo
import custom_exceptions
from classes import SalidaStock, CantArticulo

class DatosSalidaStock(Datos):
    
    @classmethod
    def get_salidas_by_entidad(cls,id,noClose = False):
        try:
            cls.abrir_conexion()
            sql = ("SELECT idSalida, \
                           idTipoArticulo, \
                           fecha, \
                           cantidadSalida \
                           FROM salidasStock WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            salidas = cls.cursor.fetchall()
            salidasStock = []
            for s in salidas:
                articulos = CantArticulo(s[3],s[1])
                salida = SalidaStock(s[0],articulos,s[2])
                salidasStock.append(salida)
            return salidasStock

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_salidas()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        salidas de stock desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()