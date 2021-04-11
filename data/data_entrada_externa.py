from data.data import Datos
import custom_exceptions
from datetime import datetime
from classes import EntradaStock, CantMaterial

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

    
    @classmethod
    def get_all(cls, noClose = False):
        """Obtiene todas las entradas externas de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idEntradaMat, \
                           idMaterial, \
                           cant, \
                           fecha, \
                           concepto \
                           FROM entradasMat")
            cls.cursor.execute(sql)
            entradas_ = cls.cursor.fetchall()
            entradas = []
            for ent in entradas_:
                cantMat = CantMaterial(float(ent[2]),ent[1])
                entradas.append(EntradaStock(ent[0],cantMat,ent[3].strftime("%d/%m/%Y"),ent[4]))
            return entradas
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_entrada_externa.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todas las entradas externas de la BD.")