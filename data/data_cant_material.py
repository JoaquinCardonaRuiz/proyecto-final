from data.data import Datos
from classes import CantMaterial
import custom_exceptions

class DatosCantMaterial(Datos):
    @classmethod
    def get_from_Insid(cls, id, noClose=False):
        """
        Obtiene los materiales que componen un insumo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT mat_ins.cantidad,mat_ins.idMaterial \
                    FROM mat_ins \
                    WHERE idInsumo = {};").format(id)
            cls.cursor.execute(sql)
            cantmats_ = cls.cursor.fetchall()
            cantmats = []
            for m in cantmats_:
                cantmat =  CantMaterial(m[0],m[1])
                cantmats.append(cantmat)
            return cantmats
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.get_from_Insid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()