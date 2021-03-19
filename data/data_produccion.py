from data.data import Datos
from classes import ProduccionArticulo
from classes import CantArticulo
import custom_exceptions

class DatosProduccion(Datos):
    @classmethod
    def get_all_articulos(cls):
        """
        Obtiene todas las producciones de artículos de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT \
                    idProdTipArt, \
                    idTipoArticulo, \
                    fecha, \
                    cantidad \
                    FROM prodTipArt WHERE estado != \"eliminado\";")
            cls.cursor.execute(sql)
            prods_ = cls.cursor.fetchall()
            producciones = []
            for p in prods_:
                arts = CantArticulo(p[3],p[1])
                prod = ProduccionArticulo(p[0],arts,p[2].strftime("%d/%m/%Y"))
                producciones.append(prod)
            return producciones
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.get_all_articulos()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las producciones desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def add(cls,idArt,fecha,cant):
        """
        Da de alta una nueva producción de un articulo en el sistema.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT INTO prodTipArt (idTipoArticulo, fecha, cantidad,estado) \
                    VALUES ({},\"{}\",{},'disponible');".format(idArt,fecha,cant))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta una produccion en la BD.")
        finally:
            cls.cerrar_conexion()