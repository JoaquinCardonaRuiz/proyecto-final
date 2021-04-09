from data.data import Datos
from classes import ProduccionInsumo
from classes import ProduccionArticulo
from classes import CantInsumo
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
    def get_all_insumos(cls):
        """
        Obtiene todas las producciones de insumos de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT \
                    idProdInsumo, \
                    idInsumo, \
                    fecha, \
                    cantidad \
                    FROM prodInsumos WHERE estado != \"eliminado\";")
            cls.cursor.execute(sql)
            prods_ = cls.cursor.fetchall()
            producciones = []
            for p in prods_:
                ins = CantInsumo(p[3],p[1])
                prod = ProduccionInsumo(p[0],ins,p[2].strftime("%d/%m/%Y"))
                producciones.append(prod)
            return producciones
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.get_all_insumos()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las producciones desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def add(cls,id,fecha,cant,kind):
        """
        Da de alta una nueva producción  en el sistema.
        """
        try:
            cls.abrir_conexion()
            sql = ""
            if kind == "art":
                sql = ("INSERT INTO prodTipArt (idTipoArticulo, fecha, cantidad,estado) \
                        VALUES ({},\"{}\",{},'disponible');".format(id,fecha,cant))
            elif kind == "ins":
                sql = ("INSERT INTO prodInsumos (idInsumo, fecha, cantidad,estado) \
                        VALUES ({},\"{}\",{},'disponible');".format(id,fecha,cant))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta una produccion en la BD.")
        finally:
            cls.cerrar_conexion()