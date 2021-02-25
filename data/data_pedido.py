from data.data import Datos
from data.data_cant_articulo import DatosCantArticulo
from classes import Pedido
import custom_exceptions

class DatosPedido(Datos):
    @classmethod
    def get_by_user_id(cls,uid,noClose=False):
        """
        Obtiene todos los pedidos de un usuario de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT \
                    idPedido, \
                    fechaEnc, \
                    fechaRet, \
                    valTotal, \
                    valPagoEP, \
                    idPunto, \
                    estado \
                    FROM pedidos WHERE idUsuario = {};").format(uid)
            cls.cursor.execute(sql)
            pedidos_ = cls.cursor.fetchall()
            pedidos = []
            for p in pedidos_:
                articulos = DatosCantArticulo.get_from_Pid(p[0],noClose=True)
                pedido_ =  Pedido(p[0],p[1],p[2],articulos,p[3],p[4],p[5],p[6])
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
    def add(cls,fechaEnc,fechaRet,valPagoEP,valTotal,idPR,uid):
        """
        Agrega un pedido a la BD
        """
        cls.abrir_conexion()
        try:
            sql= ("INSERT INTO pedidos (fechaEnc,fechaRet,valPagoEP,valTotal,idPunto,idUsuario,estado) \
                   VALUES ({},{},{},{},{},{},\"disponible\");".format(fechaEnc,fechaRet,valPagoEP,valTotal,idPR,uid))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_pedido.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un pedido en la BD.")
        finally:
            cls.cerrar_conexion()
