from classes import TipoUsuario
from data.data import Datos
import custom_exceptions
from classes import TipoUsuario


class DatosTipoUsuario(Datos):
    
    @classmethod
    def get_by_id(cls, id, noClose = False):
        """
        Busca un tipo de usuario en la BD segun su id.
        """
        try:
            cls.abrir_conexion()
            print(id)
            sql = ("SELECT tiposUsuario.idTipoUsuario, \
                tiposUsuario.nombre \
                from tiposUsuario where tiposUsuario.idTipoUsuario = {} and estado != 'eliminado'").format(id)
            cls.cursor.execute(sql)
            tipoUsu = cls.cursor.fetchall()[0]
            if len(tipoUsu) > 0:
                modulos = cls.get_modulos(tipoUsu[0])
                return TipoUsuario(tipoUsu[0],tipoUsu[1],modulos)
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_by_id()",
                                                        msj_adicional = "Tipo de usuario inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando tipo de usuario en la BD.")
    
    @classmethod
    def get_all(cls, noClose = False):
        """
        Busca tosos los tipos de usuario en la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT tiposUsuario.idTipoUsuario, \
                tiposUsuario.nombre \
                from tiposUsuario where estado != 'eliminado'")
            cls.cursor.execute(sql)
            tiposUsu_ = cls.cursor.fetchall()
            tiposUsu = []
            for tu in tiposUsu_:
                modulos = cls.get_modulos(tu[0])
                tiposUsu.append(TipoUsuario(tu[0],tu[1],modulos))
            return tiposUsu

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando todos los tipo de usuario en la BD.")

    @classmethod
    def get_modulos(cls,idTipUsu,noClose = False):
        """
        Obtiene los modulos a los que puede acceder un tipo de usuario en base a su ID
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idModulo from permisosAcceso where idTipoUsuario = %s")
            values = (idTipUsu,)
            cls.cursor.execute(sql,values)
            mods = cls.cursor.fetchall()
            modulos = []
            for mod in mods:
                modulos.append(mod[0])
            return modulos

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_usuario.get_modulos()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo los modulos a los que puede acceder un tipo de usuario en base a su IDD.")