from negocio.negocio import Negocio
import custom_exceptions

class NegocioUsuario(Negocio):
    """Clase que representa la capa de negocio para la entidad Usuario. Hereda de Negocio."""                                           

    @classmethod
    def actualiza_nivel_all(cls):
            """
            Actualiza el nivel de todos los usuarios en la BD en base a la cantidad de EcoPuntos.
            """
            try:
                #TODO: CODIFICAR METODO
                return True
            except Exception as e:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio.actualiza_nivel_all()",
                                                        msj=str(e),
                                                        msj_adicional="Error en la capa de negocio actualizando el nivel de todos los usuarios.")