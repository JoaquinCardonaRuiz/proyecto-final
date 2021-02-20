from data.data import Datos
from classes import EcoPuntos
import custom_exceptions

class DatosEcoPuntos(Datos):
    @classmethod
    def get_by_id(cls, id, noClose = False):
        cls.abrir_conexion()
        """Obtiene los EcoPuntos de un deposito según su ID.
        """
        try:
            sql = ("SELECT idEcoPuntos, \
                           cantidad, \
                           cantidadRestante \
                           FROM ecoPuntos WHERE idEcoPuntos = {};").format(id)
            cls.cursor.execute(sql)
            ep = cls.cursor.fetchone()
            if ep == None:
                return False
            else:
                ecopunto = EcoPuntos(ep[1],ep[2])
                return ecopunto
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un conjunto de ecopuntos en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()