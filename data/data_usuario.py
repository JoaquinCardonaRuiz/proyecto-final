from data.data import Datos
from data.data_direccion import DatosDireccion
from data.data_deposito import DatosDeposito
from data.data_pedido import DatosPedido
from data.data_tipo_documento import DatosTipoDocumento
from classes import Usuario
from utils import Utils
import custom_exceptions
import datetime

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
                usuarios.idNivel, \
                usuarios.img, \
                usuarios.estado \
                from usuarios where email = %s and password = %s")
            values = (email, password)
            cls.cursor.execute(sql,values)
            usuarios = cls.cursor.fetchall()
            if len(usuarios) > 0:
                usu = usuarios[0]
                if usu[11] != "habilitado":
                    usuario = Usuario(usu[0],None,None,None,None,usu[5],None,None,email=usu[4],estado=usu[11])
                else:
                    direc = DatosDireccion.get_one_id(usu[8])
                    depositos = DatosDeposito.get_by_id_usuario(usu[0])
                    ped = DatosPedido.get_by_user_id(usu[0])
                    usuario = Usuario(usu[0],usu[1],usu[7],usu[2],usu[3],usu[5],usu[6],direc,depositos,ped,usu[9],[],[],[],usu[4],usu[10],usu[11])
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
                usuarios.idNivel, \
                usuarios.img \
                from usuarios where usuarios.idUsuario = {} and estado = \"habilitado\"").format(id)
            cls.cursor.execute(sql)
            usuarios = cls.cursor.fetchall()
            if len(usuarios) > 0:
                usu = usuarios[0]
                direc = DatosDireccion.get_one_id(usu[8])
                depositos = DatosDeposito.get_by_id_usuario(usu[0])
                ped = DatosPedido.get_by_user_id(usu[0])
                usuario = Usuario(usu[0],usu[1],usu[7],usu[2],usu[3],usu[5],usu[6],direc,depositos,ped,usu[9],[],[],[],usu[4],usu[10])
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
    def verificacion(cls,code):
        """
        Realiza la verificación del codigo del usuario.
        """
        try:
            cls.abrir_conexion()

            #Verifico si existe un usuario con este codigo
            sql = ("SELECT idUsuario,email,password,estado from usuarios where codigo_registro = %s")
            values = (code,)
            cls.cursor.execute(sql, values)
            user = cls.cursor.fetchone()
            print(user)
            if len(user) > 0 and user[3] == "no-verificado":
                #Una vez verificado, actualizo su estado
                sql = ("UPDATE usuarios set estado = %s where idUsuario = %s")
                values = ("no-activo",user[0])
                cls.cursor.execute(sql, values)

                cls.db.commit()

                return {"email":user[1],"password":user[2]}
            else:
                #Si no existe ningun usuario con ese codigo, o su estado no es "no-verificado", devuelvo False
                return False
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
    def get_all_emails(cls,uid=None):
        """
        Obtiene todos los emails registrados distintos al del usuario.
        """
        try:
            cls.abrir_conexion()
            if uid == None:
                sql = ("select email from usuarios")
            else:
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
            if uid != False:
                sql = ("select nroDoc from usuarios where idUsuario != {} and estado = \"habilitado\"").format(uid)
            else:
                sql = ("select nroDoc from usuarios where nroDoc is not NULL")
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


    @classmethod
    def update_img(cls,uid,img):
        """
        Asigna una nueva imagen a un usuario
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE usuarios SET img=\"{}\" WHERE idUsuario={}").format(img,uid)
            cls.cursor.execute(sql)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.update_img()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando la imagen de un usuario en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def get_all(cls):
        """
        Obtiene todos los usuarios
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
                usuarios.idNivel, \
                usuarios.img \
                from usuarios WHERE estado = \"habilitado\"")
            cls.cursor.execute(sql)
            usuarios = cls.cursor.fetchall()
            users = []
            for usu in usuarios:
                direc = DatosDireccion.get_one_id(usu[8])
                depositos = DatosDeposito.get_by_id_usuario(usu[0])
                ped = DatosPedido.get_by_user_id(usu[0])
                usuario = Usuario(usu[0],usu[1],usu[7],usu[2],usu[3],usu[5],usu[6],direc,depositos,ped,usu[9],[],[],[],usu[4],usu[10])
                usuario.calcularTotalEcopuntos()
                users.append(usuario)
            return users
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todos los usuarios.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def alta(cls, email, password, nroDoc=False, idTipoDoc=False, nombre=False, apellido=False,idTipoUsuario=False,idDireccion=False,idNivel=False,img=False,estado=False, activacion=False, noClose=False):
        """
        Da de alta un usuario en la BD.
        """
        try:
            if activacion == False:
                cls.abrir_conexion()
                sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'usuarios'")
                cls.cursor.execute(sql)
                id_asignado = cls.cursor.fetchone()[0]
                code = str(Utils.encripta_codigo(str(email) + str(password) + str(id_asignado)))
                sql = ("INSERT into usuarios (email,password,estado,codigo_registro) values (%s,%s,%s,%s)")
                values = (email, password,"no-verificado",code)
                cls.cursor.execute(sql, values)
                cls.db.commit()
                return code

            else:
                cls.abrir_conexion()
                sql = ("UPDATE usuarios SET nroDoc=%s,idTipoDoc=%s,nombre=%s,apellido=%s,idTipoUsuario=%s,idDireccion=%s,idNivel=%s,img=%s,estado=%s where email = %s")
                values = (nroDoc,idTipoDoc,nombre,apellido,idTipoUsuario,idDireccion,idNivel,img,estado,email)
                cls.cursor.execute(sql, values)
                cls.db.commit()
                return True
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.alta()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de lata un usuario en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_cant_usuarios(cls):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            cls.abrir_conexion()
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            sql = ("SELECT count(*) from usuarios")
            cls.cursor.execute()
            cant = cls.cursor.fetchone[0]
            data = []
            sql = ("SELECT min(fechaReg) from usuarios")
            cls.cursor.execute()
            res = cls.cursor.fetchone()
            if res != None:
                res = datetime.datetime.now()
            else:
                fecha_min = res[0]
            #TODO: calcular la cantidad de meses de diferencia entre la fecha actua y la que esta en fecha_min para iterar el for
            for i in range(1,13):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(cant)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en cantidad.
                    #Usuarios
                    sql = ("select count(*) from usuarios where month(fechaReg)=%s and year(fechaReg)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valCantMes = cls.cursor.fetchone()[0]

                    if valCantMes == None:
                        valCantMes = 0

                    #Aplico los movimientos del mes al stock
                    cant -= valCantMes
                    data.append(cant)

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            print(data)
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_movimientos_stock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def buscar_info_user(cls,busqueda):
        """
        Obtiene todos los usuarios según su ID, nombre completo, email, o documento
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
                usuarios.idNivel, \
                usuarios.img \
                from usuarios WHERE estado = \"habilitado\" AND (idUsuario=\"{}\" OR email=\"{}\" OR nroDOC=\"{}\")").format(busqueda,busqueda,busqueda)
            cls.cursor.execute(sql)
            usuarios = cls.cursor.fetchall()
            users = []
            for usu in usuarios:
                direc = DatosDireccion.get_one_id(usu[8])
                depositos = DatosDeposito.get_by_id_usuario(usu[0])
                ped = DatosPedido.get_by_user_id(usu[0])
                tipo_doc = DatosTipoDocumento.get_by_id(usu[7])
                usuario = Usuario(usu[0],usu[1],tipo_doc,usu[2],usu[3],usu[5],usu[6],direc,depositos,ped,usu[9],[],[],[],usu[4],usu[10])
                usuario.calcularTotalEcopuntos()
                users.append(usuario)
            return users
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_usuario.buscar_info_user()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando usuarios.")
        finally:
            cls.cerrar_conexion()