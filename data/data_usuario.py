from data.data import Datos
from data.data_direccion import DatosDireccion
from data.data_deposito import DatosDeposito
from data.data_pedido import DatosPedido
from classes import Usuario
import custom_exceptions

class DatosUsuario(Datos):
    
    @classmethod
    def login(cls, email, password, noClose = False):
        """
        Busca un usuario en la BD que tenga el email y la contraseña que recibe como parámetro. Si no hay ninguno, devuelve False.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT usuarios.idUsuario, \
                usuarios.nroDoc, \
                usuarios.nombre, \
                usuarios.apellido, \
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
            if len(usuarios) > 0:
                usu = usuarios[0]
                direc = DatosDireccion.get_one_id(usu[8])
                depositos = DatosDeposito.get_by_user_id(usu[0])
                da = [d for d in depositos if d.isActivo()]
                dv = [d for d in depositos if not(d.isActivo())]
                ped = DatosPedido.get_by_user_id(usu[0])
                usuario = Usuario(usu[0],usu[1],usu[7],usu[2],usu[3],usu[5],usu[6],direc,da,dv,ped,usu[9],[],[],[],usu[4])
                usuario.calcularTotalEcopuntos()
                return usuario
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_usuario.login()",
                                                        msj_adicional = "Usuario inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.login()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando usuario en la BD para realizar el login.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_by_id(cls, id, noClose = False):
        """
        Busca un usuario en la BD segun su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT usuarios.idUsuario, \
                usuarios.nroDoc, \
                usuarios.nombre, \
                usuarios.apellido, \
                usuarios.email, \
                usuarios.password, \
                usuarios.idTipoUsuario, \
                usuarios.idTipoDoc, \
                usuarios.idDireccion, \
                usuarios.idNivel \
                from usuarios where usuarios.idUsuario = {}").format(id)
            cls.cursor.execute(sql)
            usuarios = cls.cursor.fetchall()
            if len(usuarios) > 0:
                usu = usuarios[0]
                direc = DatosDireccion.get_one_id(usu[8])
                depositos = DatosDeposito.get_by_user_id(usu[0])
                da = [d for d in depositos if d.isActivo()]
                dv = [d for d in depositos if not(d.isActivo())]
                ped = DatosPedido.get_by_user_id(usu[0])
                usuario = Usuario(usu[0],usu[1],usu[7],usu[2],usu[3],usu[5],usu[6],direc,da,dv,ped,usu[9],[],[],[],usu[4])
                usuario.calcularTotalEcopuntos()
                return usuario
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_usuario.get_by_id()",
                                                        msj_adicional = "Usuario inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando usuario en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def update_nivel(cls,uid,id_nivel):
        """
        Asigna un nuevo nivel a un usuario
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE usuarios SET idNivel={} WHERE idUsuario={}").format(id_nivel,uid)
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.update_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un nivel de un usuario en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def update_email(cls,email,uid):
        """
        Asigna un nuevo email a un usuario
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE usuarios SET email=%s WHERE idUsuario=%s")
            values = (email,uid)
            cls.cursor.execute(sql, values)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.update_email()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el email de un usuario en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def update_documento(cls,nro,tipo,uid):
        """
        Asigna un nuevo documento a un usuario
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE usuarios SET nroDoc=%s, idTipoDoc=%s WHERE idUsuario=%s")
            values = (nro,tipo,uid)
            cls.cursor.execute(sql, values)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.update_documento()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el documento de un usuario en la BD.")
        finally:
            cls.cerrar_conexion()
        
    @classmethod
    def update_password(cls,password,uid):
        """
        Asigna una nueva contraseña a un usuario
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE usuarios SET password=%s WHERE idUsuario=%s")
            values = (password,uid)
            cls.cursor.execute(sql, values)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.update_password()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando la contraseña de un usuario en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_all_emails(cls,uid):
        """
        Obtiene todos los emails registrados distintos al del usuario.
        """
        try:
            cls.abrir_conexion()
            sql = ("select email from usuarios where idUsuario != {}").format(uid)
            cls.cursor.execute(sql)
            emails_ = cls.cursor.fetchall()
            emails = []
            for email in emails_:
                emails.append(email[0])
            return emails
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.get_all_emails()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todos los emails registrados distintos al del usuario de la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_all_documentos(cls,uid):
        """
        Obtiene todos los documentos registrados distintos al del usuario.
        """
        try:
            cls.abrir_conexion()
            sql = ("select nroDoc from usuarios where idUsuario != {}").format(uid)
            cls.cursor.execute(sql)
            docs_ = cls.cursor.fetchall()
            docs = []
            for doc in docs_:
                docs.append(doc[0])
            return docs
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.get_all_emails()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todos los emails registrados distintos al del usuario de la BD.")
        finally:
            cls.cerrar_conexion()