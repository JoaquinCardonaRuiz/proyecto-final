from negocio.negocio import Negocio
import custom_exceptions
from classes import Horario
from datetime import datetime, time
from data.data_horario import DatosHorario

class NegocioHorario(Negocio):
    
    @classmethod
    def valida_horarios(cls, horario_):
        """
        Valida las RN referidas a los horarios.
        """
        #Conexión con el motor de BD.
        try:
            horaDesde = horario_[0]
            horaHasta = horario_[1]
            dia = horario_[2]
            #Valida RN33
            if horaDesde == "" and horaHasta != "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                      msj_adicional = "Error al añadir el Horario. El horario de cierre no puede quedar vacío si el horario de apertura está asignado.")
            #Valida RN33
            elif  horaDesde != "" and horaHasta == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_horarios.valida_horarios()",
                                                        msj_adicional = "Error al añadir el Horario. El horario de apertura no puede quedar vacío si el horario de cierre está asignado.")
            
            if horaDesde == "" and horaHasta =="":
                horario = Horario(None,None,None,dia)
            else:
                horario = Horario(None,datetime.strptime(horaDesde, '%H:%M').time(),datetime.strptime(horaHasta, '%H:%M').time(),dia)
                #Valida RN32
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

    @classmethod
    def alta_horarios(cls, horarios, idPuntoDep, validar=False):
        """
        Añade los horarios de un PD o un PR a la BD.
        """
        #Conexión con el motor de BD.
        try:
            
                for horario in horarios:
                    if validar:
                        horario = cls.valida_horarios(horario)
                        DatosHorario.alta_horario_PD(horario, idPuntoDep)
                    else:
                
                        horaDesde = horario[0]
                        horaHasta = horario[1]
                        dia = horario[2]
                        if horaDesde == "" and horaHasta =="":
                            horario = Horario(None,None,None,dia)
                        else:
                            horario = Horario(None,datetime.strptime(horaDesde, '%H:%M').time(),datetime.strptime(horaHasta, '%H:%M').time(),dia)

                    DatosHorario.alta_horario_PD(horario, idPuntoDep)

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_direccion.alta_horarios()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta los horarios de un Punto de Depósito.")

    @classmethod
    def mod_horarios(cls, horarios, idPuntoDep, validar=False):
        """
        Modifica los horarios de un PD o un PR a la BD.
        """
        #Conexión con el motor de BD.
        try:
            
                for horario in horarios:
                    if validar:
                        horario = cls.valida_horarios(horario)
                        DatosHorario.alta_horario_PD(horario, idPuntoDep)
                    else:
                
                        horaDesde = horario[0]
                        horaHasta = horario[1]
                        dia = horario[2]
                        if horaDesde == "" and horaHasta =="":
                            horario = Horario(None,None,None,dia)
                        else:
                            horario = Horario(None,datetime.strptime(horaDesde, '%H:%M').time(),datetime.strptime(horaHasta, '%H:%M').time(),dia)

                    DatosHorario.mod_horario_PD(horario, idPuntoDep)

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_direccion.alta_horarios()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio modificando los horarios de un Punto de Depósito.")