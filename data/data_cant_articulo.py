from data.data import Datos
from classes import CantArticulo
import custom_exceptions

class DatosCantArticulo(Datos):
    @classmethod
    def get_from_Pid(cls, id, noClose=False):
        """
        Obtiene los articulos de un pedido de la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT \
                    cantidad, \
                    idTipoArticulo \
                    FROM tiposArt_pedidos \
                    WHERE idPedido = {};").format(id)
            cls.cursor.execute(sql)
            cantarts_ = cls.cursor.fetchall()
            cantarts = []
            for a in cantarts_:
                #TODO: agregar precio venta
                cantart =  CantArticulo(a[0],a[1])
                cantarts.append(cantart)
            return cantarts
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_articulo.get_from_Pid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los articulos de un pedido desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_PR_stock(cls, id, noClose=False):
        """
        Obtiene los articulos del stock de un punto de retiro la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT \
                    cantidad, \
                    idTipoArticulo \
                    FROM stockPuntosRetiro \
                    WHERE idPunto = {};").format(id)
            cls.cursor.execute(sql)
            cantarts_ = cls.cursor.fetchall()
            cantarts = []
            for a in cantarts_:
                #TODO: agregar precio venta
                cantart =  CantArticulo(a[0],a[1])
                cantarts.append(cantart)
            return cantarts
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_articulo.get_PR_Stock()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los articulos de un Punto Retiro desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def addArticuloPedido(cls,idArt,idPed,cant,mg):
        """
        Registra una cantidad de un articulo de un pedido en la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT INTO tiposArt_pedidos (idTipoArticulo, idPedido, cantidad, margenGanancia) \
                    VALUES ({},{},{},{});".format(idArt,idPed,cant,mg))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_articulo.addArticuloPedido()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un articulo de un pedido en la BD.")
        finally:
            cls.cerrar_conexion()
