from data.data_cant_articulo import DatosCantArticulo
from classes import Pedido,Usuario
from data.data import Datos
import custom_exceptions

class DatosPedido(Datos):
    @classmethod
    def get_by_user_id(cls,uid,limit=False,noClose=False):
        """
        Obtiene todos los pedidos de un usuario de la BD.
        """
        try:
            cls.abrir_conexion()
            if limit == False:
                sql = ("SELECT \
                        idPedido, \
                        fechaEnc, \
                        fechaRet, \
                        totalARS, \
                        totalEP, \
                        idPunto, \
                        estado \
                        FROM pedidos WHERE idUsuario = {} ORDER BY fechaEnc DESC;").format(uid)
            else:
                sql = ("SELECT \
                        idPedido, \
                        fechaEnc, \
                        fechaRet, \
                        totalARS, \
                        totalEP, \
                        idPunto, \
                        estado \
                        FROM pedidos WHERE idUsuario = {} ORDER BY fechaEnc LIMIT {} DESC;").format(uid, limit)
            cls.cursor.execute(sql)
            pedidos_ = cls.cursor.fetchall()
            pedidos = []
            for p in pedidos_:
                articulos = DatosCantArticulo.get_from_Pid(p[0],noClose=True)
                pedido_ =  Pedido(p[0],p[1].strftime("%d/%m/%Y"),p[2].strftime("%d/%m/%Y"),articulos,p[3],p[4],p[5],p[6])
                pedido_.totalEP = int(pedido_.totalEP)
                pedidos.append(pedido_)
            return pedidos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_user_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los pedidos de un usuario desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    
    
    
    @classmethod
    def get_all(cls,filtrar_cancelados=False,noClose=False):
        """
        Obtiene todos los pedidos de la BD.
        """
        try:
            cls.abrir_conexion()
            if filtrar_cancelados == False:
                sql = ("SELECT \
                        idPedido, \
                        fechaEnc, \
                        fechaRet, \
                        totalARS, \
                        totalEP, \
                        idPunto, \
                        estado \
                        FROM pedidos WHERE estado != \"eliminado\";")
            else:
                sql = ("SELECT \
                        idPedido, \
                        fechaEnc, \
                        fechaRet, \
                        totalARS, \
                        totalEP, \
                        idPunto, \
                        estado \
                        FROM pedidos WHERE estado != \"eliminado\" and estado!= 'cancelado' and estado != 'devuelto';")
            cls.cursor.execute(sql)
            pedidos_ = cls.cursor.fetchall()
            pedidos = []
            for p in pedidos_:
                articulos = DatosCantArticulo.get_from_Pid(p[0])
                pedido_ =  Pedido(p[0],p[1].strftime("%d/%m/%Y"),p[2].strftime("%d/%m/%Y"),articulos,p[3],p[4],p[5],p[6])
                pedidos.append(pedido_)
            return pedidos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los pedidos desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_by_idPR(cls,idPR,limit=False,noClose=False):
        """
        Obtiene todos los pedidos de la BD.
        """
        try:
            cls.abrir_conexion()
            if limit == False:
                sql = ("SELECT \
                        idPedido, \
                        fechaEnc, \
                        fechaRet, \
                        totalARS, \
                        totalEP, \
                        idPunto, \
                        estado \
                        FROM pedidos WHERE estado != \"eliminado\" AND idPunto={};").format(idPR)
            else:
                sql = ("SELECT \
                    idPedido, \
                    fechaEnc, \
                    fechaRet, \
                    totalARS, \
                    totalEP, \
                    idPunto, \
                    estado \
                    FROM pedidos WHERE estado != \"eliminado\" AND idPunto={} LIMIT {};").format(idPR,limit)
            cls.cursor.execute(sql)
            pedidos_ = cls.cursor.fetchall()
            pedidos = []
            for p in pedidos_:
                articulos = DatosCantArticulo.get_from_Pid(p[0],noClose=True)
                pedido_ =  Pedido(p[0],p[1].strftime("%d/%m/%Y"),p[2].strftime("%d/%m/%Y"),articulos,p[3],p[4],p[5],p[6])
                pedidos.append(pedido_)
            return pedidos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_by_idPR()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los pedidos de un PRdesde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    
    @classmethod
    def get_one(cls,id,noClose=False):
        """
        Obtiene un pedido de la BD en base a su ID.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT \
                idPedido, \
                fechaEnc, \
                fechaRet, \
                totalARS, \
                totalEP, \
                idPunto, \
                estado, \
                idUsuario \
                FROM pedidos WHERE estado != \"eliminado\" AND idPedido={}").format(id)
            cls.cursor.execute(sql)
            pedidos_ = cls.cursor.fetchall()
            pedidos = []
            for p in pedidos_:
                articulos = DatosCantArticulo.get_from_Pid(p[0],noClose=True)
                pedido_ =  Pedido(p[0],p[1].strftime("%d/%m/%Y"),p[2].strftime("%d/%m/%Y"),articulos,p[3],p[4],p[5],p[6])
                pedidos.append(pedido_)
            return [pedidos[0],p[7]]
           
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.get_one()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo un pedidos de desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def add(cls,fechaEnc,fechaRet,totalEP,totalARS,idPR,uid):
        """
        Agrega un pedido a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO pedidos (fechaEnc,fechaRet,totalEP,totalARS,idPunto,idUsuario,estado) \
                   VALUES (\"{}\",\"{}\",{},{},{},{},\"pendiente\");".format(fechaEnc,fechaRet,totalEP,totalARS,idPR,uid))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un pedido en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def update_estado(cls,id,estado):
        """
        Actualiza el estado de un pedido en la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE pedidos SET estado = \"{}\" WHERE idPedido={}".format(estado,id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.update_estado()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un pedido en la BD.")
        finally:
            cls.cerrar_conexion()
