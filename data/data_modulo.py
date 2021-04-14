from data.data import Datos
import custom_exceptions
from classes import Modulo

class DatosModulo(Datos):
    
    @classmethod
    def get_all(cls, noClose = False):
        """
        Busca tosos los modulos en la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idModulo, \
                           nombre \
                           from modulos order by nombre ASC")
            cls.cursor.execute(sql)
            mods = cls.cursor.fetchall()
            modulos = []
            for mod in mods:
                modulos.append(Modulo(mod[0],mod[1]))
            return modulos

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_modulo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando todos los modulos en la BD.")