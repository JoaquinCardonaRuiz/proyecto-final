from negocio.negocio import Negocio
import custom_exceptions
from negocio.negocio_ecopuntos import NegocioEcoPuntos
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



    @classmethod
    def useEP(cls,id, totalEP):
        user = DatosUsuario.get_by_id(id)
        nueva_cant_ep = user.totalEcopuntos - totalEP
        if nueva_cant_ep < 0:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.useEP()",msj="EP insuficientes para realizar pedido")
        ep_restantes = totalEP
        deps_ordenados = sorted(user.depositosActivos, key=lambda x: x.fechaDeposito)
        
        #para cada deposito
        for dep in deps_ordenados:

            #agarro los EP que le corresponden y su cantidad restante
            ep = dep.ecoPuntos
            cant_rest = ep.cantidadRestante

            #si la cantidad restante es 0, entonces sigo de largo
            if cant_rest == 0:
                continue

            #si la cantidad restante alcanza para cubrir los EP que gasto el usuario, termino el loop y actualizo ese deposito
            elif cant_rest >= ep_restantes:
                NegocioEcoPuntos.updateEps(ep.id, cant = cant_rest-ep_restantes)
                break

            #sino alcanza, actualizo ese deposito y sigo con el siguiente
            else:
                NegocioEcoPuntos.updateEps(ep.id, cant = 0)
                ep_restantes -= cant_rest
            

    @classmethod
    def get_by_id(cls,uid):
        try:
            return DatosUsuario.get_by_id(uid)
        except Exception as e:
            raise e