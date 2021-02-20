from data.data import Datos
from data.data_cant_articulo import DatosCantArticulo
from classes import Pedido
import custom_exceptions

class DatosPedido(Datos):
    @classmethod
    def get_by_user_id(cls,uid):
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
            cls.cerrar_conexion()