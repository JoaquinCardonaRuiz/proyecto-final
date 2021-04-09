from data.data import Datos
from data.data_material import DatosMaterial
from data.data_cant_material import DatosCantMaterial
from data.data_ecopuntos import DatosEcoPuntos
from classes import Deposito, CantMaterial, EcoPuntos
import custom_exceptions
from datetime import datetime, timedelta
from utils import Utils

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
                    fechaReg \
                    FROM depositos WHERE idUsuario=\"{}\"").format(uid)
            cls.cursor.execute(sql)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for d in depositos_:
                material = CantMaterial(d[3],d[2])
                ecopuntos = DatosEcoPuntos.get_by_id(d[6])
                d_ = Deposito(d[0],d[1],material,d[4],d[5],ecopuntos,d[7])
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
            
            sql = ("INSERT into depositos (codigo, cant, fechaReg, fechaDep, idMaterial, idUsuario,idPunto,idEcoPuntos) values ('{}',{},{},'{}',{},{},{},{})").format(codigo, cantidad,"NULL",today,id_mat,"NULL",id_pd,id_ep)
            
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
            sql = ("UPDATE depositos SET idUsuario = {} WHERE codigo=\"{}\"".format(uid,cod))
            cls.cursor.execute(sql)
            cls.db.commit()
            rwcount = int(cls.cursor.rowcount)
            print("El rwcount es: " + str(rwcount))
            if rwcount > 0:
                sql = ("SELECT cantidad FROM depositos join ecoPuntos using (idEcoPuntos) where codigo = %s")
                values = (cod,)
                cls.cursor.execute(sql,values)
                cantEP = cls.cursor.fetchall()[0][0]
                return cantEP
            else:
                return -1
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.update_estado()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un pedido en la BD.")
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
                sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant from depositos where idUsuario = %s")
                values = (uid,)
            else:
                sql = ("Select idDeposito, codigo, fechaReg, fechaDep, idMaterial, idUsuario, idPunto, idEcoPuntos, cant from depositos where idUsuario = %s LIMIT %s")
                values = (uid,limit)
            cls.cursor.execute(sql, values)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for dep in depositos_:
                mat = CantMaterial(dep[8], dep[4])
                ep = DatosEcoPuntos.get_by_id(dep[7])
                ep.cantidad = int(ep.cantidad) 
                depositos.append(Deposito(dep[0], dep[1],mat, dep[6], dep[3].strftime("%d/%m/%Y"), ep, dep[2]))
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_id_usuario()",
                                                    msj=str(e),
                                                    msj_adicional="Obtiene los depósitos correspondientes a un usuario por su ID.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
