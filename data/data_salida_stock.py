from data.data import Datos
from data.data_articulo import DatosArticulo
import custom_exceptions
from classes import SalidaStock, CantArticulo

class DatosSalidaStock(Datos):
    
    @classmethod
    def get_salidas_by_entidad(cls,id,noClose = False):
        try:
            cls.abrir_conexion()
            sql = ("SELECT idSalida, \
                           idTipoArticulo, \
                           fecha, \
                           cantidadSalida, \
                           valorTotal, \
                           concepto \
                           FROM salidasStock WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            salidas = cls.cursor.fetchall()
            salidasStock = []
            for s in salidas:
                articulos = CantArticulo(s[3],s[1])
                salida = SalidaStock(s[0],articulos,s[2],s[4],s[5])
                salidasStock.append(salida)
            return salidasStock

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_salidas()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        salidas de stock desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    
    @classmethod
    def get_all(cls, noClose = False):
        """Obtiene todas las salidas de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idSalida, \
                           idTipoArticulo, \
                           idEntidad, \
                           fecha, \
                           cantidadSalida, \
                           valorTotal, \
                           concepto \
                           from salidasStock")
            cls.cursor.execute(sql)
            salidasStock = []
            salidasStock_ = cls.cursor.fetchall()
            if len(salidasStock_) > 0:
                for salida in salidasStock_:
                    cant_art = CantArticulo(salida[4],salida[1],float(salida[5])/float(salida[4]))
                    salidasStock.append(SalidaStock(salida[0],cant_art,salida[3].strftime("%d/%m/%Y"),float(salida[4]),salida[6]))
            return salidasStock
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_salida_stock_get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo todas las salidas de la BD.")

    @classmethod
    def add_one(cls,idArt, cant, concepto, fecha, idEntidad, valorTotal, costoTotal, noClose = False):
        """Registra una salida de stock en la BD en base a los parámetros recibidos.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT into salidasStock (idEntidad, idTipoArticulo, cantidadSalida, fecha, concepto, valorTotal, costo) values (%s,%s,%s,%s,%s,%s,%s)")
            values = (idEntidad,idArt, cant, fecha ,concepto, valorTotal,costoTotal)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            return True
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_salidas_stock.add_one()",
                                                    msj=str(e),
                                                    msj_adicional="Error registrando una salida de stock en la BD.")