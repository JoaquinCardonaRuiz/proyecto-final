from data.data import Datos
from classes import Material
import custom_exceptions

class DatosMaterial(Datos):
    @classmethod
    def get_by_id(cls, id, noClose = False):
        cls.abrir_conexion()
        """Obtiene un material de la BD en base a un ID.
        """
        try:
            sql = ("SELECT idMaterial, \
                           nombre, \
                           unidadMedida, \
                           costoRecoleccion, \
                           stock, \
                           color, \
                           estado \
                           FROM materiales WHERE idMaterial = {};").format(id)
            cls.cursor.execute(sql)
            m = cls.cursor.fetchone()
            if m == None:
                return False
            else:
                material = Material(m[0],m[1],m[2],m[3],m[4],m[5],m[6])
                return material
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un material en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()



    @classmethod
    def get_all(cls):
        """
        Obtiene todos los materiales de la BD.
        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT idMaterial, \
                           nombre, \
                           unidadMedida, \
                           costoRecoleccion, \
                           stock, \
                           color, \
                           estado \
                           FROM materiales WHERE estado!=\"eliminado\" order by nombre ASC;")
            cls.cursor.execute(sql)
            materiales_ = cls.cursor.fetchall()
            materiales = []
            for m in materiales_:
                material_ = Material(m[0],m[1],m[2],m[3],m[4],m[5],m[6])
                materiales.append(material_)
            return materiales
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales desde la BD.")
        finally:
            cls.cerrar_conexion()