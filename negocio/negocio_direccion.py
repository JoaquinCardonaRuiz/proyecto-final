from negocio.negocio import Negocio
import custom_exceptions
from classes import Direccion
from data.data_direccion import DatosDireccion

class NegocioDireccion(Negocio):
    
    @classmethod
    def valida_direccion(cls, calle, altura, ciudad, provincia, pais):
        """
        Realiza las validaciones de negocio de una direccion.
        """
        #Conexión con el motor de BD.
        try:
            print(altura)
            #Valida RN27
            if altura == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. La altura no puede quedar vacía.")
            #Valida RN32
            elif not(isinstance(int(altura), int)):
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. La altura debe ser numérica.")
            #Valida RN26
            elif calle == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. La calle no puede quedar vacía.")
            #Valida RN28
            elif ciudad == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. La ciudad no puede quedar vacía.")
            #Valida RN29
            elif provincia == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. La provincia no puede quedar vacía.")
            #Valida RN30
            elif pais == "":
                raise custom_exceptions.ErrorDeNegocio(origen="neogocio_direccion.alta_pd()",
                                                        msj_adicional = "Error al añadir el Punto de Depósito. El país no puede quedar vacío.")
            return True

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_direccion.valida_direccion()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio validando las Reglas de Negocio de una direccion.")


    @classmethod
    def alta_direccion(cls, calle, altura, ciudad, provincia, pais):
        """
        Añade una dirección a la BD.
        """
        #Conexión con el motor de BD.
        try:
            if NegocioDireccion.valida_direccion(calle, altura, ciudad, provincia, pais):
                id_direccion = DatosDireccion.alta_direccion(Direccion(None,calle, altura, ciudad, provincia, pais))

            return id_direccion

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_direccion.alta_direccion()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta una direccion.")