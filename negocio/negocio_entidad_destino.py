from negocio.negocio import Negocio
import custom_exceptions
from data.data_entidad_destino import DatosEntidadDestino

class NegocioEntidadDestino(Negocio):
    """Clase que representa la capa de negocio para la entidad EntidadDestino. Hereda de Negocio.""" 

    @classmethod
    def add(cls,nombre):
        """
        Da de alta una nueva entidad destino en el sistema.
        """
        try:
            if nombre in [i.nombre for i in cls.get_entidades_destino()]:
                #Valida regla RN11
                raise custom_exceptions.ErrorReglaDeNegocio(origen = "negocio.alta_entidad_destino()",
                                                              msj="Error en la capa de negocio al validar regla RN11: Todas las entidades de destino deben tener nombres distintos.") 
            elif nombre == "":
                #Valida regla RN12
                raise custom_exceptions.ErrorReglaDeNegocio(origen = "negocio.alta_entidad_destino()",
                                                              msj="Error en la capa de negocio al validar regla RN11: Todas las entidades de destino deben tener nombres distintos.") 
            else:
                DatosEntidadDestino.add(nombre)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.alta_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta una nueva entidad de destino.")
        
    @classmethod
    def get_all(cls):
        """
        Obtiene todas las entidades de destino de la BD.
        """
        try:
            entidades = DatosEntidadDestino.get_all()
            return entidades

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo las entidades destino de la capa de Datos.")
    
    

    @classmethod
    def get_one(cls, id):
        """
        Obtiene una entidad de destino de la BD a partir de su id.
        """
        try:
            entidad = DatosEntidadDestino.get_one(id)
            return entidad

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_one_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo una entidad destino de la base de Datos.")

    @classmethod
    def delete(cls,id):
        """
        Elimina una entidad de destino de la BD a partir de su id
        """
        try:
            DatosEntidadDestino.delete(id)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_entidad_destino.delete()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de Negocio eliminando una Entidad destino de la base de Datos")