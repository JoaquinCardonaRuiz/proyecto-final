from data.data import Datos
from data.data_cant_insumo import DatosCantInsumo
from data.data_valor import DatosValor
import custom_exceptions
from classes import TipoArticulo

class DatosArticulo(Datos):
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los articulos de la BD.
        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           costoProduccion, \
                           costoInsumos, \
                           costoTotal, \
                           margenGanancia, \
                           stock FROM tiposArticulo;")
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                insumos = DatosCantInsumo.get_from_TAid(a[0],noClose=True)
                valor = DatosValor.get_from_TAid(a[0],noClose=True)
                articulo_ = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],a[5],valor,a[6],a[7])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los articulos desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_by_id(cls, id, noClose = False):
        cls.abrir_conexion()
        """Obtiene un articulo de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           costoProduccion, \
                           costoInsumos, \
                           costoTotal, \
                           margenGanancia, \
                           stock FROM tiposArticulo WHERE idTipoArticulo = {};").format(id)
            values = (id,)
            cls.cursor.execute(sql, values)
            a = cls.cursor.fetchone()
            if a == None:
                return False
            else:
                insumos = DatosCantInsumo.get_from_TAid(a[0],noClose=True)
                valor = DatosValor.get_from_TAid(a[0],noClose=True)
                articulo = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],a[5],valor,a[6],a[7])
                return articulo
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un articulo en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_by_not_in_id_array(cls,ids):
        """
        Obtiene todos los articulos de la BD que no están en la lista de ids.
        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           costoProduccion, \
                           costoInsumos, \
                           costoTotal, \
                           margenGanancia, \
                           stock FROM tiposArticulo")
            if ids != []:
                sql += " WHERE idTipoArticulo!={}"
                for _ in ids[1:]:
                    sql += " AND idTipoArticulo!={}"
            sql += ";"
            sql = sql.format(*ids)
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                insumos = DatosCantInsumo.get_from_TAid(a[0],noClose=True)
                valor = DatosValor.get_from_TAid(a[0],noClose=True)
                articulo_ = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],a[5],valor,a[6],a[7])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_not_in_id_array()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo articulos desde la BD.")
        finally:
            cls.cerrar_conexion()