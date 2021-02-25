from data.data import Datos
from classes import CantInsumo
import custom_exceptions

from data.data import Datos
from classes import CantInsumo
import custom_exceptions

class DatosCantInsumo(Datos):
    @classmethod
    def get_from_TAid(cls, id, noClose=False):
        """
        Obtiene los insumos que componen un tipo articulo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT tiposArt_ins.cantidad,tiposArt_ins.idInsumo \
                    FROM tiposArt_ins \
                    INNER JOIN tiposArticulo \
                    USING(idTipoArticulo) \
                    WHERE idTipoArticulo = {};").format(id)
            cls.cursor.execute(sql)
            cantins_ = cls.cursor.fetchall()
            cantins = []
            for i in cantins_:
                cantIns = CantInsumo(i[0],i[1]) 
                cantins.append(cantIns)
            return cantins
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_insumo.get_from_TAid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()