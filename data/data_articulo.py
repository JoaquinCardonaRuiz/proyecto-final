from data.data import Datos
from data.data_cant_material import DatosCantMaterial
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
            sql = ("SELECT * FROM tiposArticulo;")
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                materiales = DatosCantMaterial.get_from_TAid(a[0],noClose=True)
                articulo_ = TipoArticulo(a[0],a[4],materiales,a[5],a[6],a[7],a[2],a[3],a[1])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        entidades destino desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_by_id(cls, id, noClose = False):
        cls.abrir_conexion()
        """Obtiene un articulo de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("SELECT * FROM tiposArticulo WHERE idTipoArticulo = %s")
            values = (id,)
            cls.cursor.execute(sql, values)
            a = cls.cursor.fetchone()
            if a == None:
                return False
            else:
                materiales = DatosCantMaterial.get_from_TAid(a[0],noClose=True)
                articulo = TipoArticulo(a[0],a[4],materiales,a[5],a[6],a[7],a[2],a[3],a[1])
                return articulo
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_id",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un articulo \
                                                        en base al id recibido como \
                                                        parámetro.")
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
            sql = ("SELECT * FROM tiposArticulo")
            if ids != []:
                sql += " WHERE idTipoArticulo!={}"
                for id in ids[1:]:
                    sql += " AND idTipoArticulo!={}"
            sql += ";"
            sql = sql.format(*ids)
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                materiales = DatosCantMaterial.get_from_TAid(a[0],noClose=True)
                articulo_ = TipoArticulo(a[0],a[4],materiales,a[5],a[6],a[7],a[2],a[3],a[1])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_not_in_id_array()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo articulos desde la BD.")
        finally:
            cls.cerrar_conexion()