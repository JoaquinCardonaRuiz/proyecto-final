from classes import Horario
from data.data import Datos
import custom_exceptions
import datetime

class DatosHorario(Datos):
    
    @classmethod
    def get_horariosPD_id(cls, idPunto, noClose = False):
        """
        Obtiene todos los horarios de un Punto de Depósito de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select * from horariosPD  where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)
            horarios = cls.cursor.fetchall()
            horarios_ = []
            for horario in horarios:
                if horario[2] != None and horario[3] != None:
                    horarios_.append(Horario(horario[0], str(horario[2]), str(horario[3]),horario[4]))
                elif horario[2] == None and horario[3] == None:
                    horarios_.append(Horario(horario[0], False, False, horario[4]))
                elif horario[2] == None:
                    horarios_.append(Horario(horario[0], False, str(horario[3]),horario[4]))
                elif horario[3] == None:
                    horarios_.append(Horario(horario[0], str(horario[2]), False,horario[4]))
            return horarios_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_horariosPD_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los horarios en base a un ID desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def alta_horario_PD(cls, horario, idPuntoDep, noClose = False):
        """
        Añade un horario de un Punto de Depósito a la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT into horariosPD (idPunto, horaDesde, horaHasta, dia) values (%s,%s,%s,%s)")
            values = (idPuntoDep,horario.horaDesde, horario.horaHasta, horario.dia)
            cls.cursor.execute(sql,values)
            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_horario_PD()",
                                                    msj=str(e),
                                                    msj_adicional="Error añadiendo un horario de un Punto de Depósito a la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def mod_horario_PD(cls, horario, idPuntoDep, noClose = False):
        """
        Modifica un horario de un Punto de Depósito a la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("UPDATE horariosPD SET horaDesde = %s, horaHasta = %s where idPunto = %s and dia = %s")
            values = (horario.horaDesde, horario.horaHasta,idPuntoDep, horario.dia)
            cls.cursor.execute(sql,values)
            cls.db.commit()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.mod_horario_PD()",
                                                    msj=str(e),
                                                    msj_adicional="Error modificando un horario de un Punto de Depósito en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def get_horariosPR_id(cls, idPunto, noClose = False):
        """
        Obtiene los horarios de un Punto de Retiro de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select * from horariosPR  where idPunto = %s")
            values = (idPunto,)
            cls.cursor.execute(sql, values)
            horarios = cls.cursor.fetchall()
            horarios_ = []
            for horario in horarios:
                if horario[2] != None and horario[3] != None:
                    horarios_.append(Horario(horario[0], str(horario[2]), str(horario[3]),horario[4]))
                elif horario[2] == None and horario[3] == None:
                    horarios_.append(Horario(horario[0], False, False, horario[4]))
                elif horario[2] == None:
                    horarios_.append(Horario(horario[0], False, str(horario[3]),horario[4]))
                elif horario[3] == None:
                    horarios_.append(Horario(horario[0], str(horario[2]), False,horario[4]))
            return horarios_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_horariosPR_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los horarios en base a un ID desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
        