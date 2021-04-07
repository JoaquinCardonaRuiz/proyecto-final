from data.data import Datos
from data.data_material import DatosMaterial
from data.data_cant_material import DatosCantMaterial
from data.data_ecopuntos import DatosEcoPuntos
from classes import Deposito, CantMaterial, EcoPuntos
import custom_exceptions
from datetime import datetime, timedelta
from utils import Utils

#TODO: get_by_user_id() y get_by_id_usuario() son el mismo metodo? resolver conflicto

class DatosDeposito(Datos):
    @classmethod
    def get_by_user_id(cls,uid,noClose=False):
        """
        Obtiene todos los Depositos de la BD correspondientes a un usuario segun su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idDeposito, \
                    codigo, \
                    idMaterial, \
                    cant, \
                    idPunto, \
                    fechaDep, \
                    idEcoPuntos, \
                    fechaReg, \
                    estado \
                    FROM depositos WHERE idUsuario=\"{}\"").format(uid)
            cls.cursor.execute(sql)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for d in depositos_:
                material = CantMaterial(d[3],d[2])
                ecopuntos = DatosEcoPuntos.get_by_id(d[6])
                ecopuntos.cantidad = int(ecopuntos.cantidad) 
                fecha_reg = None
                try:
                    fecha_reg = d[7].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None
                d_ = Deposito(d[0],d[1],material,d[4],d[5].strftime("%d/%m/%Y"),ecopuntos,fecha_reg,d[8])
                depositos.append(d_)
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.get_by_user_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los depositos desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    
    @classmethod
    def add(cls,id_mat, id_pd,cantidad,cant_ep,noClose=False):
        """
        Añade un depósito a la BD.
        """
        try:
            cls.abrir_conexion()
            #Obtengo ID EcoPuntos
            sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'ecoPuntos'")
            cls.cursor.execute(sql)
            id_ep = cls.cursor.fetchone()[0]

            #Guardo los EP
            DatosEcoPuntos.add(cant_ep)

            #Obtengo id Deposito para calcular el codigo
            sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'depositos'")
            cls.cursor.execute(sql)
            id_dep = cls.cursor.fetchone()[0]

            codigo = str(id_dep) + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + str(id_mat)
            codigo = Utils.encripta_codigo(codigo)

            today = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            #Guardo el deposito
            
            sql = ("INSERT into depositos (codigo, cant, fechaReg, fechaDep, idMaterial, idUsuario,idPunto,idEcoPuntos,estado) values ('{}',{},{},'{}',{},{},{},{},\"no acreditado\")").format(codigo, cantidad,"NULL",today,id_mat,"NULL",id_pd,id_ep)
            
            cls.cursor.execute(sql)
            
            cls.db.commit()

            return codigo
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando un deposito a la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    

    @classmethod
    def verificar_codigo(cls, cod,uid):
        """
        Verifica que el codigo corresponda a un deposito y le asigna el deposito al usuario correspondiente
        Devuelve la cantidad de EPS acreditados
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE depositos SET idUsuario = {}, fechaReg=\"{}\", estado = \"acreditado\" WHERE codigo=\"{}\"".format(uid,datetime.now(),cod))
            cls.cursor.execute(sql)
            cls.db.commit()
            rwcount = int(cls.cursor.rowcount)
            if rwcount > 0:
                sql = ("SELECT cantidad FROM depositos join ecoPuntos using (idEcoPuntos) where codigo = %s")
                values = (cod,)
                cls.cursor.execute(sql,values)
                cantEP = cls.cursor.fetchall()[0][0]
                return cantEP
            else:
                dep = cls.get_by_codigo(cod)
                if dep == False:
                    return 0
                else:
                    return -1
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.verificar_codigo()",
                                                    msj=str(e),
                                                    msj_adicional="Error verificando un código de depósito en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_by_id_usuario(cls,uid,limit=False,noClose=False):
        """
        Obtiene los depósitos correspondientes a un usuario por su ID.
        """
        try:
            cls.abrir_conexion()
            if limit == False:
                sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant, estado from depositos where idUsuario = %s order by fechaDep DESC")
                values = (uid,)
            else:
                sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant, estado from depositos where idUsuario = %s order by fechaDep DESC LIMIT %s")
                values = (uid,limit)
            cls.cursor.execute(sql, values)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for dep in depositos_:
                mat = CantMaterial(dep[8], dep[4])
                ep = DatosEcoPuntos.get_by_id(dep[7])
                ep.cantidad = int(ep.cantidad) 
                try:
                    fecha_reg = dep[2].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None
                depositos.append(Deposito(dep[0], dep[1],mat, dep[6], dep[3].strftime("%d/%m/%Y"), ep, fecha_reg,dep[9]))
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_id_usuario()",
                                                    msj=str(e),
                                                    msj_adicional="Obtiene los depósitos correspondientes a un usuario por su ID.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
        
    @classmethod
    def get_by_codigo(cls,cod,noClose=False):
        """
        Obtiene los depósitos correspondientes a un código.
        """
        try:
            cls.abrir_conexion()
            sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant, estado from depositos where codigo = %s")
            values = (cod,)
            cls.cursor.execute(sql, values)
            dep = cls.cursor.fetchone()
            if dep == None:
                return False
            else:
                mat = CantMaterial(dep[8], dep[4])
                ep = DatosEcoPuntos.get_by_id(dep[7])
                ep.cantidad = int(ep.cantidad) 
                try:
                    fecha_reg = dep[2].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None
                return Deposito(dep[0], dep[1],mat, dep[6], dep[3].strftime("%d/%m/%Y"), ep, fecha_reg,dep[9])
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_codigo()",
                                                    msj=str(e),
                                                    msj_adicional="Obtiene los depósitos correspondientes a un código.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()



    @classmethod
    def get_all(cls):
        """
        Obtiene todos los Depositos de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idDeposito, \
                    codigo, \
                    idMaterial, \
                    cant, \
                    idPunto, \
                    fechaDep, \
                    idEcoPuntos, \
                    fechaReg, \
                    estado \
                    FROM depositos")
            cls.cursor.execute(sql)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for d in depositos_:
                material = CantMaterial(d[3],d[2])
                ecopuntos = DatosEcoPuntos.get_by_id(d[6])
                ecopuntos.cantidad = int(ecopuntos.cantidad) 
                try:
                    fecha_reg = d[7].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None
                d_ = Deposito(d[0],d[1],material,d[4],d[5].strftime("%d/%m/%Y"),ecopuntos,fecha_reg,d[8])
                depositos.append(d_)
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los depositos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_by_id_PD(cls,id):
        """
        Obtiene todos los Depositos de la BD correspondientes a un PD segun su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idDeposito, \
                    codigo, \
                    idMaterial, \
                    cant, \
                    idPunto, \
                    fechaDep, \
                    idEcoPuntos, \
                    fechaReg, \
                    estado \
                    FROM depositos WHERE idPunto=\"{}\"").format(id)
            cls.cursor.execute(sql)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for d in depositos_:
                material = CantMaterial(d[3],d[2])
                ecopuntos = DatosEcoPuntos.get_by_id(d[6])
                ecopuntos.cantidad = int(ecopuntos.cantidad) 
                try:
                    fecha_reg = d[7].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None

                d_ = Deposito(d[0],d[1],material,d[4],d[5].strftime("%d/%m/%Y"),ecopuntos,fecha_reg,d[8])
                depositos.append(d_)
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.get_by_id_PD()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los depositos desde la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def update_estado(cls,id,estado):
        """
        Actualiza el estado de un deposito en la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE depositos SET estado = \"{}\" WHERE idDeposito={}".format(estado,id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.update_estado()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un deposito en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def get_by_id(cls,id):
        """
        Obtiene el depósito correspondiente a un ID.
        """
        try:
            cls.abrir_conexion()
            sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant, estado from depositos where idDeposito = {}").format(id)
            cls.cursor.execute(sql,)
            dep = cls.cursor.fetchone()
            if dep == None:
                return False
            else:
                mat = CantMaterial(dep[8], dep[4])
                ep = DatosEcoPuntos.get_by_id(dep[7])
                ep.cantidad = int(ep.cantidad) 
                try:
                    fecha_reg = dep[2].strftime("%d/%m/%Y")
                except:
                    fecha_reg = None
                return Deposito(dep[0], dep[1],mat, dep[6], dep[3].strftime("%d/%m/%Y"), ep, fecha_reg,dep[9])
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo el depósito correspondiente a un ID.")
        finally:
            cls.cerrar_conexion()


    
    @classmethod
    def get_user_id(cls,id):
        """
        Busca el id del usuario de un deposito segun su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("Select idUsuario from depositos where idDeposito = {}").format(id)
            cls.cursor.execute(sql,)
            dep = cls.cursor.fetchone()
            if dep == None:
                return False
            else:
                return dep[0]
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_user_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo el user correspondiente a un deposito.")
        finally:
            cls.cerrar_conexion()