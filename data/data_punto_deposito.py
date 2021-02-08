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
        cls.abrir_conexion()
        try:
            sql = ("select * from puntosDeposito where estadoEliminacion = 'disponible'")
            cls.cursor.execute(sql)
            puntosDeposito = cls.cursor.fetchall()
            puntosDeposito_ = []
            for punto in puntosDeposito:
                #Se instancia sin los materiales y sin los horarios ya que no se muestran, para no generar tráfico de datos innecesario.
                direccion = DatosDireccion.get_one_id(punto[4])
                puntosDeposito_.append(PuntoDeposito(punto[0],direccion,punto[1],punto[2], None, None)) 
            return puntosDeposito_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los niveles desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    
    @classmethod
    def get_all_names(cls, noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select nombre from puntosDeposito where estadoEliminacion = 'disponible'")
            cls.cursor.execute(sql)
            puntosDeposito = cls.cursor.fetchall()
            puntosDeposito_ = []
            for punto in puntosDeposito:
                #Se instancia sin los materiales y sin los horarios ya que no se muestran, para no generar tráfico de datos innecesario.
                puntosDeposito_.append(punto[0])
            return puntosDeposito_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los niveles desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    
    @classmethod
    def alta_pd(cls, puntoDep, idDireccion, noClose = False):
        """
        Añade un Punto de Depósito a la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT into puntosDeposito (estado,nombre,estadoEliminacion,idDireccion) values (%s, %s, %s, %s)")
            values =  (puntoDep.estado, puntoDep.nombre, 'disponible', idDireccion)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los niveles desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()