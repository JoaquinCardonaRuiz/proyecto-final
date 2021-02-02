from data.data_horario import DatosHorario
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
                puntosDeposito_.append(PuntoDeposito(punto[0],punto[1],punto[2],punto[3],None,None,punto[4]))
            return puntosDeposito_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los niveles desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()