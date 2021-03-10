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
    def get_all(cls):
        """
        Obtiene todos los puntos de retiro de la BD.
        """
        try:
            cls.abrir_conexion()
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