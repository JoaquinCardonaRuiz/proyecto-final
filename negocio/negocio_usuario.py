from negocio.negocio import Negocio
import custom_exceptions
from data.data_usuario import DatosUsuario

import re

class NegocioUsuario(Negocio):
    """Clase que representa la capa de negocio para la entidad Usuario. Hereda de Negocio."""                                           

    @classmethod
    def login(cls,email, password):
        """
            Gestiona el login del usuario.
        """
        try:
            cls.check_email(email)
            return DatosUsuario.login(email, password)
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.login()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de negocio realizando el login del usuario.")

    @classmethod
    def check_email(cls,email):
        """
            Valida la dirección de email con expresiones regulares.
        """
        try:
            #TODO: Levantar Flash en el catch.
            regex = '(<)?(\w+@\w+(?:\.\w+)+)(?(1)>|$)'
            if(re.search(regex,email)):  
                return True
          
            else:  
                return False 
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.actualiza_nivel_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de negocio actualizando el nivel de todos los usuarios.")

    @classmethod
    def actualiza_nivel_all(cls):
            """
            Actualiza el nivel de todos los usuarios en la BD en base a la cantidad de EcoPuntos.
            """
            try:
                #TODO: CODIFICAR METODO
                print('Se actualizaron los niveles de todos los usuarios.')
            except custom_exceptions.ErrorDeConexion as e:
                raise e
            except Exception as e:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio.actualiza_nivel_all()",
                                                        msj=str(e),
                                                        msj_adicional="Error en la capa de negocio actualizando el nivel de todos los usuarios.")