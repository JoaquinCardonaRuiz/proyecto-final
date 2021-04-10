from data.data import Datos
import custom_exceptions
from datetime import datetime

class DatosEntradaExterna(Datos):
    
    @classmethod
    def add_one(cls,idMaterial, cant, concepto, fecha, noClose = False):
        """Registra una entrada externa de stock en la BD en base a los parámetros recibidos.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT into entradasMat (idMaterial, cant, fecha, concepto) values (%s,%s,%s,%s)")
            values = (idMaterial, cant, fecha ,concepto)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            return True
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_entrada_externa.add_one()",
                                                    msj=str(e),
                                                    msj_adicional="Error registrando una entrada externa de stock en la BD.")

    
    #TODO: Hacer get_all() e incluír en listado.