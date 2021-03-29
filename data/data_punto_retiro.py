from data.data_horario import DatosHorario
from data.data_direccion import DatosDireccion
from werkzeug import utils
from classes import PuntoRetiro
from data.data import Datos
import custom_exceptions

class DatosPuntoRetiro(Datos):
    @classmethod
    def get_by_id(cls,id):
        """
        Obtiene un punto de retiro de la BD a partir de su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idPunto, \
                           estadoEliminacion, \
                           demoraFija, \
                           nombre, \
                           idDireccion, \
                           estado \
                        FROM puntosRetiro WHERE idPunto = {} AND estadoEliminacion != \"eliminado\";".format(id))
            cls.cursor.execute(sql)
            pr = cls.cursor.fetchall()[0]
            direccion = DatosDireccion.get_one_id(pr[4])
            horarios = DatosHorario.get_horariosPR_id(pr[0])
            puntoRetiro = PuntoRetiro(pr[0],direccion,pr[3],pr[1],horarios,pr[2],bool(pr[5]))
            return puntoRetiro
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_punto_retiro.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo un punto de retiro desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_all(cls,noFilter=False):
        """
        Obtiene todos los puntos de retiro de la BD.
        """
        try:
            cls.abrir_conexion()
            if noFilter:
                sql = ("SELECT idPunto, \
                            estadoEliminacion, \
                            demoraFija, \
                            nombre, \
                            idDireccion, \
                            estado \
                            FROM puntosRetiro order by nombre ASC;")
            else:
                sql = ("SELECT idPunto, \
                            estadoEliminacion, \
                            demoraFija, \
                            nombre, \
                            idDireccion, \
                            estado \
                            FROM puntosRetiro WHERE estadoEliminacion != \"eliminado\" order by nombre ASC;")
            cls.cursor.execute(sql)
            puntos = cls.cursor.fetchall()
            puntosRetiro = []
            for pr in puntos:
                if pr[4] == None:
                    direccion = None
                else:
                    direccion = DatosDireccion.get_one_id(pr[4])
                horarios = DatosHorario.get_horariosPR_id(pr[0])
                puntoRetiro = PuntoRetiro(pr[0],direccion,pr[3],pr[1],horarios,pr[2],bool(pr[5]))
                puntosRetiro.append(puntoRetiro)
            return puntosRetiro
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_punto_retiro.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los puntos de retiro desde la BD.")
        finally:
            cls.cerrar_conexion()
            
            
    @classmethod
    def get_demora_promedio(cls):
        """
        Obtiene el promedio de espera de los punto retiros.
        """        
        try:
            cls.abrir_conexion()
            sql = "SELECT CEIL(AVG(demoraFija)) FROM puntosRetiro WHERE estadoEliminacion != \"eliminado\";"
            cls.cursor.execute(sql)
            demora = cls.cursor.fetchone()
            return demora[0]
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_punto_retiro.get_demora_promedio()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo la demora promedio de la BD.")

    @classmethod
    def get_all_names(cls, noClose = False):
        """
        Obtiene todos los nombres de los Puntos de Retiro de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("select nombre from puntosRetiro where estadoEliminacion = 'disponible'")
            cls.cursor.execute(sql)
            puntosRetiro = cls.cursor.fetchall()
            puntosRetiro_ = []
            for punto in puntosRetiro:
                puntosRetiro_.append(punto[0])
            return puntosRetiro_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all_names()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo todos los nombres de los Puntos de Retiro de la BD.")


    @classmethod
    def alta_pr(cls, puntoRetiro, idDireccion, noClose = False):
        """
        Añade un Punto de Retiro a la BD.
        """
        try:
            cls.abrir_conexion()
            #Obtengo el ID que se le va a asignar para poder guardarlo en el Horario.
            sql = ("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME   = 'puntosRetiro'")
            cls.cursor.execute(sql)
            id_asignado = cls.cursor.fetchone()[0]

            #Hago el alta del PD en la BD.
            sql = ("INSERT into puntosRetiro (estado,nombre,estadoEliminacion,idDireccion,demoraFija) values (%s, %s, %s, %s,%s)")
            values =  (puntoRetiro.estado, puntoRetiro.nombre, 'disponible', idDireccion, puntoRetiro.demoraFija)
            cls.cursor.execute(sql, values)
            cls.db.commit()

            return id_asignado
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error añadiendo un Punto de Retiro a la BD.")
    
    @classmethod
    def mod_pr(cls, puntoRetiro, noClose = False):
        """
        Modifica un Punto de Retiro en la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE puntosRetiro SET nombre = %s, estado = %s, demoraFija = %s where idPunto = %s")
            values =  (puntoRetiro.nombre, puntoRetiro.estado,puntoRetiro.demoraFija, puntoRetiro.id)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.mod_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error modificando un Punto de Retiro en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def baja_pr(cls,idPunto, noClose = False):
        """
        Realiza el borrado lógico un Punto de Retiro en base al ID que recibe como parámetro.
        """
        try:
            cls.abrir_conexion()
            #Elimina horarios del Punto
            sql = ("DELETE from horariosPR where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql,values)

            #Obtengo el ID de la dirección del Punto
            sql = ("SELECT idDireccion from puntosRetiro where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql,values)
            idDireccion = cls.cursor.fetchone()[0]

            #Elimino Horarios
            sql = ("DELETE from horariosPR where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)

            #Elimino logicamente el Punto de Retiro
            sql = ("UPDATE puntosRetiro SET estadoEliminacion ='eliminado', idDireccion = NULL where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)

            #Elimino la dirección del Punto.
            sql = ("DELETE from direcciones where idDireccion = %s")
            values = (idDireccion,)
            cls.cursor.execute(sql, values)

            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.baja_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error realizando la baja de un Punto de Retiro en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
