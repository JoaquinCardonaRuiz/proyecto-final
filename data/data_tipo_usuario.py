from classes import TipoUsuario
from data.data import Datos
import custom_exceptions
from classes import TipoUsuario


class DatosTipoUsuario(Datos):
    
    @classmethod
    def get_by_id(cls, id, noClose = False):
        """
        Busca un tipo de usuariocumento en la BD segun su id.
        """
        try:
            cls.abrir_conexion()
            print(id)
            sql = ("SELECT tiposUsuario.idTipoUsuario, \
                tiposUsuario.nombre \
                from tiposUsuario where tiposUsuario.idTipoUsuario = {}").format(id)
            cls.cursor.execute(sql)
            tipoUsu = cls.cursor.fetchall()[0]
            if len(tipoUsu) > 0:
                return TipoUsuario(tipoUsu[0],tipoUsu[1])
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_by_id()",
                                                        msj_adicional = "Tipo de usuario inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando tipo de usuario en la BD.")