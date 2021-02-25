from data.data import Datos
from classes import Direccion
import custom_exceptions

class DatosDireccion(Datos):
    
    @classmethod
    def get_one_id(cls, idDireccion, noClose = False):
        """
        Obtiene una dirección por su ID de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("select * from direcciones where idDireccion = %s")
            values = (idDireccion,)
            cls.cursor.execute(sql, values)
            direccion = cls.cursor.fetchone()
            return Direccion(direccion[0], direccion[1], direccion[2], direccion[3], direccion[4], direccion[5])

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_direccion.get_one_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo una direccion por su ID desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def alta_direccion(cls, direccion, noClose = False):
        """
        Añade una direccion a la BD.
        """
        cls.abrir_conexion()
        try:
            #Obtengo el ID que se le va a asignar para poder guardarlo en el Punto de Depósito.
            sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'direcciones'")
            cls.cursor.execute(sql)
            id_asignado = cls.cursor.fetchone()[0]

            #Hago el alta.
            sql = ("INSERT into direcciones (calle, altura, ciudad, provincia, pais) values (%s, %s, %s, %s, %s)")
            values = (direccion.calle, direccion.altura, direccion.ciudad, direccion.provincia, direccion.pais)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            
            return id_asignado
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_direccion.alta_direccion()",
                                                    msj=str(e),
                                                    msj_adicional="Error añadiendo una direccion en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def mod_direccion(cls, direccion, noClose = False):
        """
        Modifica una direccion de la BD.
        """
        cls.abrir_conexion()
        try:
            #Obtengo el ID que se le va a asignar para poder guardarlo en el Punto de Depósito.
            sql = ("UPDATE direcciones SET calle = %s, altura = %s, ciudad = %s, provincia = %s, pais = %s where idDireccion = %s")
            values = (direccion.calle, direccion.altura, direccion.ciudad, direccion.provincia, direccion.pais, direccion.id)            
            cls.cursor.execute(sql, values)
            cls.db.commit()
                        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_direccion.mod_direccion()",
                                                    msj=str(e),
                                                    msj_adicional="Error modificando una direccion de la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()