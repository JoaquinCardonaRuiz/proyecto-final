from negocio.negocio import Negocio
import custom_exceptions
from classes import Horario
from datetime import datetime, time

class NegocioHorario(Negocio):
    
    @classmethod
    def valida_horaios(cls, horario_):
        """
        Valida las RN referidas a los horarios.
        """
        #Conexión con el motor de BD.
        try:
            horaDesde = horario_[0]
            horaHasta = horario_[1]
            dia = horario_[2]
            #Valida RN34
            if horaDesde == "" and horaHasta != "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                      msj_adicional = "Error al añadir el Horario. El horario de cierre no puede quedar vacío si el horario de apertura está asignado.")
            #Valida RN34
            elif  horaDesde != "" and horaHasta == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                        msj_adicional = "Error al añadir el Horario. El horario de apertura no puede quedar vacío si el horario de cierre está asignado.")
            
            horario = Horario(None,datetime.datetime.strptime(horaDesde, '%H:%M').time(),datetime.datetime.strptime(horaHasta, '%H:%M').time(),dia)
            #Valida RN33
            if horario.horaDesde >= horario.horaHasta:
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                        msj_adicional = "Error al añadir el Horario. La hora de apertura debe ser menor a la de cierre.")
            return horario
        
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los niveles de la capa de Datos.")