from negocio.negocio import Negocio
import custom_exceptions
from data.data_articulo import DatosArticulo

class NegocioArticulo(Negocio):
    """Clase que representa la capa de negocio para la entidad Articulo. Hereda de Negocio.""" 

    @classmethod
    def get_all(cls,ids=[]):
        """
        Obtiene todas los tipos de articulo de la BD.
        """
        try:
            articulos = DatosArticulo.get_articulos()
            return articulos

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo los tipos de articulo de \
                                                         la capa de Datos.")

    @classmethod
    def get_by_id(cls, id):
        """
        Obtiene un TipoArticulo de la BD segun su ID
        """
        try:
            articulo = DatosArticulo.get_by_id(id)
            return articulo
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un tipo de articulo de \
                                                         la capa de Datos.")

    @classmethod
    def get_by_id_array(cls, ids):
        """
            Obtiene TiposArticulos de la BD en base a una lista de IDs
        """
        articulos = []
        for id in ids:
            articulos.append(cls.get_by_id(id))
        return articulos