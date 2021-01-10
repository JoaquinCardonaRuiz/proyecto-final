from data.data import Datos
from classes import CantMaterial
import custom_exceptions

class DatosCantMaterial(Datos):
    @classmethod
    def get_from_TAid(cls, id, noClose=False):
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