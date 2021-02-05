from negocio.negocio import Negocio
from data.data_insumo import DatosInsumo
import custom_exceptions

class NegocioInsumo(Negocio):

    @classmethod
    def get_all(cls):
        """
        Obtiene todos los insumos de la BD.
        """
        try:
            insumos = DatosInsumo.get_all()
            return insumos

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_insumos.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obteniendo los insumos de la capa de Datos.")
