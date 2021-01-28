from classes import Horario
from data.data import Datos
import custom_exceptions
import datetime

class DatosHorario(Datos):
    
    @classmethod
    def get_horariosPD_id(cls, idPunto, noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select * from horariosPD  where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)
            horarios = cls.cursor.fetchall()
            horarios_ = []
            for horario in horarios:
                horarios_.append(Horario(horario[0], str(horario[2]), str(horario[3]),horario[4]))
            return horarios_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_horariosPD_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los horarios en base a un ID desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()