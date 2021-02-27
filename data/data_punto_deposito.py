from data.data_material import DatosMaterial
from data.data_horario import DatosHorario
from data.data_direccion import DatosDireccion
from werkzeug import utils
from classes import PuntoDeposito
from data.data import Datos
import custom_exceptions

class DatosPuntoDeposito(Datos):

    @classmethod
    def get_all(cls, noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("select * from puntosDeposito where estadoEliminacion = 'disponible' order by nombre ASC")
            cls.cursor.execute(sql)
            puntosDeposito = cls.cursor.fetchall()
            puntosDeposito_ = []
            for punto in puntosDeposito:
                #Se instancia sin los horarios ya que no se muestran, para no generar tráfico de datos innecesario.
                direccion = DatosDireccion.get_one_id(punto[4])
                materiales_ = DatosMaterial.get_all_byIdPuntoDep(punto[0],True)
                materiales = []
                for mat in materiales_:
                    materiales.append(mat.id)
                puntosDeposito_.append(PuntoDeposito(punto[0],direccion,punto[1],punto[2], materiales, None)) 
            return puntosDeposito_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error otodos los Puntos de Depósito desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    
    @classmethod
    def get_all_names(cls, noClose = False):
        """
        Obtiene todos los nombres de los Puntos de Depósito de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("select nombre from puntosDeposito where estadoEliminacion = 'disponible'")
            cls.cursor.execute(sql)
            puntosDeposito = cls.cursor.fetchall()
            puntosDeposito_ = []
            for punto in puntosDeposito:
                puntosDeposito_.append(punto[0])
            return puntosDeposito_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all_names()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo todos los nombres de los Puntos de Depósito de la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    
    @classmethod
    def alta_pd(cls, puntoDep, idDireccion, noClose = False):
        """
        Añade un Punto de Depósito a la BD.
        """
        try:
            cls.abrir_conexion()
            #Obtengo el ID que se le va a asignar para poder guardarlo en el Horario.
            sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'puntosDeposito'")
            cls.cursor.execute(sql)
            id_asignado = cls.cursor.fetchone()[0]

            #Hago el alta del PD en la BD.
            sql = ("INSERT into puntosDeposito (estado,nombre,estadoEliminacion,idDireccion) values (%s, %s, %s, %s)")
            values =  (puntoDep.estado, puntoDep.nombre, 'disponible', idDireccion)
            cls.cursor.execute(sql, values)
            cls.db.commit()

            return id_asignado
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error añadiendo un Punto de Depósito a la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def alta_materialPD(cls, materiales, idPunto, noClose = False):
        """
        Añade un los materiales aceptados por un Punto de Depósito a la BD.
        """
        try:
            cls.abrir_conexion()
            if len(materiales) > 0:
                for material in materiales:
                    print(str(material))
                    sql = ("INSERT into puntosDep_mat (idMaterial, idPunto, estado) values (%s,%s,%s)")
                    values = (str(material), idPunto, "disponible")
                    cls.cursor.execute(sql,values)
                cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_materialPD()",
                                                    msj=str(e),
                                                    msj_adicional="Error añadiendo los materiales aceptados por un Punto de Depósito a la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def mod_pd(cls, puntoDep, noClose = False):
        """
        Modifica un Punto de Depósito en la BD.
        """
        try:
            cls.abrir_conexion()
            #Hago el alta del PD en la BD.
            sql = ("UPDATE puntosDeposito SET nombre = %s, estado = %s where idPunto = %s")
            values =  (puntoDep.nombre, puntoDep.estado, puntoDep.id)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.mod_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error modificando un Punto de Depósito en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def baja_materialPD(cls, materiales, idPunto, noClose = False):
        """
        Hace un borrado lógico de los materiales aceptados por un Punto de Depósito a la BD.
        """
        try:
            cls.abrir_conexion()
            if len(materiales) > 0:
                for material in materiales:
                    print(str(material))
                    sql = ("UPDATE puntosDep_mat SET estado = %s where idPunto = %s and idMaterial = %s")
                    values = ("eliminado", idPunto, str(material))
                    cls.cursor.execute(sql,values)
                cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.baja_materialPD()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando los materiales aceptados por un Punto de Depósito a la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def baja_pd(cls,idPunto, noClose = False):
        """
        Realiza el borrado lógico un Punto de Depósito en base al ID que recibe como parámetro.
        """
        try:
            cls.abrir_conexion()
            #Elimina horarios del Punto
            sql = ("DELETE from horariosPD where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql,values)

            #Obtengo el ID de la dirección del Punto
            sql = ("SELECT idDireccion from puntosDeposito where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql,values)
            idDireccion = cls.cursor.fetchone()[0]

            #Elimino Horarios
            sql = ("DELETE from horariosPD where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)

            #Elimino logicamente relacion con materiales
            sql = ("UPDATE puntosDep_mat SET estado = 'eliminado' where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)

            #Elimino logicamente el Punto de Depósito
            sql = ("UPDATE puntosDeposito SET estadoEliminacion ='eliminado', idDireccion = NULL where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)

            #Elimino la dirección del Punto.
            sql = ("DELETE from direcciones where idDireccion = %s")
            values = (idDireccion,)
            cls.cursor.execute(sql, values)

            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.baja_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error realizando la baja de un Punto de Depósito en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()