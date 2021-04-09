from data.data import Datos
import custom_exceptions
from datetime import datetime

class DatosEntradaExterna(Datos):
    
    @classmethod
    def add_one(cls,idMaterial, cant, concepto, fecha):
        """Agrega una entrada de materiales externa, que no proviene de un depósito .
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
                                                    msj_adicional="Error creando una entrada externa la BD.")