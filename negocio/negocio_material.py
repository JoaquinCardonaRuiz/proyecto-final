from negocio.negocio import Negocio
import custom_exceptions
from data.data_material import DatosMaterial


class NegocioMaterial(Negocio):
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los materiales de la BD.
        """
        try:
            materiales = DatosMaterial.get_all()
            return materiales

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_materiales.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obteniendo los materiales de la capa de Datos.")