from data.data import Datos
from classes import Usuario
import custom_exceptions

class DatosUsuario(Datos):
    
    @classmethod
    def login(cls, email, password, noClose = False):
        """
        Busca un usuario en la BD que tenga el email y la contraseña que recibe como parámetro. Si no hay ninguno, devuelve False.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT usuarios.idUsuario, \
                usuarios.nroDoc, \
                usuarios.nombre, \
                usuarios.apellido, \
                usuarios.totalEP, \
                usuarios.email, \
                usuarios.password, \
                usuarios.idTipoUsuario, \
                usuarios.idTipoDoc, \
                usuarios.idDireccion, \
                usuarios.idNivel \
                from usuarios where email = %s and password = %s")
            values = (email, password)
            cls.cursor.execute(sql,values)
            usuarios = cls.cursor.fetchall()
            print(values)
            print(usuarios)
            if len(usuarios) > 0:
                usu = usuarios[0]
                ep = None
                da = None
                dv = None
                mp = None
                ped = None
                usuario = Usuario(usu[0],usu[1],usu[8],usu[2],usu[3],usu[6],usu[7],dir,ep,da,dv,mp,ped,usu[4],usu[10],None,None,None)
                return usuario
            else:
                raise custom_exceptions.ErrorDeConexion(origen="datos_usuario.login()",
                                                        msj_adicional = "Usuario inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.login()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando usuario en la BD para realizar el login.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()