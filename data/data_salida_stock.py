from data.data import Datos
import custom_exceptions
from classes import SalidaStock

class DatosSalidaStock(Datos):
    
    @classmethod
    def get_salidas_by_entidad(cls,id,noClose = False):
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM salidasStock WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            salidas = cls.cursor.fetchall()
            salidasStock = []
            for s in salidas:
                salida = SalidaStock(s[0],s[1],s[2],s[3],s[4])
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