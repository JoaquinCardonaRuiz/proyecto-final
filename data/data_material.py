from classes import Material
from data.data import Datos
from classes import Material
import custom_exceptions

class DatosMaterial(Datos):
    @classmethod
    def get_by_id(cls, id, noClose = False):
        """Obtiene un material de la BD en base a un ID.
        """
        try:
            cls.abrir_conexion()
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
    def get_all_byIdPuntoDep(cls, idPuntoDep, noSuspendidos =False,noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        try:
            cls.abrir_conexion()
            if noSuspendidos:
                sql = ("select materiales.nombre, materiales.unidadMedida, materiales.color, materiales.idMaterial, materiales.estado from puntosDeposito left join puntosDep_mat using(idPunto) left join materiales using (idMaterial) where idPunto = %s and puntosDep_mat.estado = 'disponible' and materiales.estado = 'habilitado' order by materiales.nombre ASC;")
            else:
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
        try:
            cls.abrir_conexion()
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

    
    @classmethod
    def add(cls,nombre,unidad,costoRecoleccion,color,estado):
        """
        Agrega un material a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO materiales (nombre,unidadMedida,costoRecoleccion,color,stock,estado) \
                   VALUES (\"{}\",\"{}\",{},\"{}\",0,\"{}\");".format(nombre,unidad,costoRecoleccion,color,estado))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un material en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def update(cls,idMat,nombre,unidad,costoRecoleccion,color,estado):
        """
        Actualiza un material en la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE materiales SET nombre=\"{}\",unidadMedida=\"{}\",costoRecoleccion={},color=\"{}\",estado=\"{}\" WHERE idMaterial={};").format(nombre,unidad,costoRecoleccion,color,estado,idMat)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.update()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un material en la BD.")
        finally:
            cls.cerrar_conexion()

    
    @classmethod
    def delete(cls, id):
        """
        Elimina un material de la BD a partir de su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE materiales SET estado = \"eliminado\" WHERE idMaterial={}".format(id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un material en la BD.")
        finally:
            cls.cerrar_conexion()
