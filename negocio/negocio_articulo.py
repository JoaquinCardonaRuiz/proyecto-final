from negocio.negocio import Negocio
import custom_exceptions
from data.data_articulo import DatosArticulo

class NegocioArticulo(Negocio):
    """Clase que representa la capa de negocio para la entidad Articulo. Hereda de Negocio.""" 

    @classmethod
    def get_articulos(cls,ids=[]):
        """
        Obtiene todas los tipos de articulo de la BD.
        """
        try:
            articulos = DatosArticulo.get_articulos()
            return articulos

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_articulos()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo los tipos de articulo de \
                                                         la capa de Datos.")