from data.data import Datos
import custom_exceptions
from datetime import datetime
from data.data_material import DatosMaterial

class DatosEntradaExterna(Datos):
    
    @classmethod
    def add_one(cls,idMaterial, cant, concepto, fecha, noClose = False):
        """Obtiene todas las salidas de la municipalidad de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT into entradasMat (idMaterial, cant, fecha, concepto) values (%s,%s,%s,%s)")
            values = (idMaterial, cant, fecha ,concepto)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            DatosMaterial.addStock(idMaterial,float(cant))
            return True
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todas las salidas de la municipalidad de la BD.")

    
    #TODO: Hacer get_all() e incluír en listado.