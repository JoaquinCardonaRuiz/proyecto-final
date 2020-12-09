from data.data import Datos
import custom_exceptions
from classes import TipoArticulo
from classes import CantMaterial

class DatosArticulo(Datos):
    @classmethod
    def get_articulos(cls,ids=[]):
        """
        Obtiene todos los articulos de la BD. Si se provee una lista de IDs, devuelve sólo 
        los tipos artículos que corresponden a los ids.

        Argumentos:
            ids (string[]): Listado de IDs para filtrar resultados.

        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM tiposArticulo;")
            
            #Si el parametro de ids no es vacío, se agrega el WHERE IN con el listado de ids
            if ids:
                sql = sql.replace(";"," ") + \
                "WHERE idTipoArticulo IN ({});".format(', '.join([str(i) for i in ids]))
            cls.cursor.execute(sql.format(*ids))
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                materiales = cls.get_cantmat(a[0],noClose=True)
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
    def get_cantmat(cls, id, noClose=False):
        """
        Obtiene los materiales que componen un tipo articulo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT tiposArt_mat.cantidad,tiposArt_mat.idMaterial \
                    FROM tiposArt_mat \
                    INNER JOIN tiposArticulo \
                    USING(idTipoArticulo) \
                    WHERE idTipoArticulo = {};").format(id)
            cls.cursor.execute(sql)
            cantmats_ = cls.cursor.fetchall()
            cantmats = []
            for m in cantmats_:
                cantMat = CantMaterial(m[0],m[1])
                cantmats.append(cantMat)
            return cantmats
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        entidades destino desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()