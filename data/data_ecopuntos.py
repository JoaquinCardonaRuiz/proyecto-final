from data.data import Datos
from classes import EcoPuntos
import custom_exceptions

class DatosEcoPuntos(Datos):

    @classmethod
    def add(cls, cantidad):
        """
        Agrega un nuevo EP a la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT into ecoPuntos (cantidad, cantidadRestante) values ({},{})").format(cantidad, cantidad)
            cls.cursor.execute(sql)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando un EP a la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_valor_EP(cls):
        """
        Obtiene valor actual de los EP.
        """
        try:
            cls.abrir_conexion()
            sql = "SELECT fecha,valor FROM datosEcoPuntos;"
            cls.cursor.execute(sql)
            valores = cls.cursor.fetchall()
            max_date = valores[0]
            for v in valores:
                if v[0] > max_date[0]:
                    max_date = v
            return max_date[1]
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.get_valor_EP()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo el valor de los EP de la BD.")
        finally:
            cls.cerrar_conexion()
        
    @classmethod
    def get_porcentaje_rec_EP(cls):
        """
        Obtiene el factor de recompensa actual de los EP.
        """
        try:
            cls.abrir_conexion()
            sql = "SELECT fecha,valor, porc_rec_EP FROM datosEcoPuntos;"
            cls.cursor.execute(sql)
            valores = cls.cursor.fetchall()
            max_date = valores[0]
            for v in valores:
                if v[0] > max_date[0]:
                    max_date = v
            return max_date[2]
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.get_porcentaje_rec_EP()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo el factor de recompensa de EP de la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def get_by_id(cls, id, noClose = False):
        """Obtiene los EcoPuntos de un deposito según su ID.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idEcoPuntos, \
                           cantidad, \
                           cantidadRestante \
                           FROM ecoPuntos WHERE idEcoPuntos = {};").format(id)
            cls.cursor.execute(sql)
            ep = cls.cursor.fetchone()
            if ep == None:
                return False
            else:
                ecopunto = EcoPuntos(ep[0],ep[1],ep[2])
                return ecopunto
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un conjunto de ecopuntos en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def updateEps(cls,idEP,cant):
        """
        Actualiza la cantidad de ecopuntos restantes de un lote en la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE ecoPuntos SET cantidadRestante = {} WHERE idEcoPuntos={}").format(cant,idEP)
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_ecopuntos.updateEps()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un ecopunto en la BD.")
        finally:
            cls.cerrar_conexion()