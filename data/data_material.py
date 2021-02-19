from classes import Material
from data.data import Datos
import custom_exceptions

class DatosMaterial(Datos):
    
    @classmethod
    def get_all_byIdPuntoDep(cls, idPuntoDep, noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select materiales.nombre, materiales.unidadMedida, materiales.color, materiales.idMaterial, materiales.estado from puntosDeposito left join puntosDep_mat using(idPunto) left join materiales using (idMaterial) where idPunto = %s and puntosDep_mat.estado = 'disponible' and materiales.estado != 'eliminado' order by materiales.nombre ASC;")
            values = (idPuntoDep,)
            cls.cursor.execute(sql, values)
            materiales = cls.cursor.fetchall()
            materiales_ = []
            for material in materiales:
                materiales_.append(Material(material[3], material[0], material[1], None, None, material[2],material[4])) 
            return materiales_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all_byIdPunto()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales que acepta un punto de depósito desde la BD.")
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
