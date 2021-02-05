from data.data import Datos
from data.data_cant_material import DatosCantMaterial
from classes import Insumo
import custom_exceptions

class DatosInsumo(Datos):
    
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los insumos de la BD.
        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT idInsumo, \
                           nombre, \
                           unidadMedida, \
                           cMateriales, \
                           cProduccion, \
                           cTotal, \
                           stock, \
                           otrosCostos \
                           FROM insumos WHERE estado!=\"eliminado\";")
            cls.cursor.execute(sql)
            insumos_ = cls.cursor.fetchall()
            insumos = []
            for i in insumos_:
                materiales = DatosCantMaterial.get_from_Insid(i[0],noClose=True)
                insumo_ = Insumo(i[0],i[1],i[2],i[3],i[4],i[5],materiales,i[6],i[7])
                insumos.append(insumo_)
            return insumos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            cls.cerrar_conexion()