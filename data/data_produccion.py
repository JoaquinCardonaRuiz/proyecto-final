from data.data import Datos
from classes import ProduccionInsumo
from classes import ProduccionArticulo
from classes import CantInsumo
from classes import CantArticulo
from classes import CantMaterial


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
                    FROM prodTipArt WHERE estado != \"eliminado\" order by fecha DESC;")
            cls.cursor.execute(sql)
            prods_ = cls.cursor.fetchall()
            producciones = []
            for p in prods_:
                arts = CantArticulo(p[3],p[1])
                receta = cls.get_receta_art(p[0])
                print(receta)
                prod = ProduccionArticulo(p[0],arts,p[2].strftime("%d/%m/%Y"),receta)
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
                    FROM prodInsumos WHERE estado != \"eliminado\" order by fecha DESC;")
            cls.cursor.execute(sql)
            prods_ = cls.cursor.fetchall()
            producciones = []
            for p in prods_:
                ins = CantInsumo(p[3],p[1])
                receta = cls.get_receta_ins(p[0])
                prod = ProduccionInsumo(p[0],ins,p[2].strftime("%d/%m/%Y"),receta)
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
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta una produccion en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_receta_ins(cls,idProd):
        """
        Devuelve un arreglo de los CantMaterial que se utilizan para producir un insumo.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idMaterial, mu.cantidad from materialesUtilizados as mu left join prodInsumos on mu.idProd = prodInsumos.idprodInsumo where idProd = %s and estado = 'disponible'")
            values = (idProd,)
            cls.cursor.execute(sql,values)
            receta_ = cls.cursor.fetchall()
            receta = []
            for elemento in receta_:
                receta.append(CantMaterial(elemento[1],elemento[0]))
            return receta
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.get_receta_ins()",
                                                    msj=str(e),
                                                    msj_adicional="Error oteniendo la receta de un insumo de la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_receta_art(cls,idProd):
        """
        Devuelve un arreglo de los CantMaterial que se utilizan para producir un insumo.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idInsumo, iu.cantidad from insumosUtilizados as iu left join prodTipArt on iu.idProd = prodTipArt.idProdTipArt where idProd = %s and estado = 'disponible'")
            values = (idProd,)
            cls.cursor.execute(sql,values)
            receta_ = cls.cursor.fetchall()
            receta = []
            for elemento in receta_:
                receta.append(CantInsumo(elemento[1],elemento[0]))
            return receta
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_produccion.get_receta_art()",
                                                    msj=str(e),
                                                    msj_adicional="Error oteniendo la receta de un artículo de la BD.")
        finally:
            cls.cerrar_conexion()
