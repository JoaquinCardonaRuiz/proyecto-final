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


    @classmethod
    def add(cls,nombre,unidad,costoMateriales,costoProduccion,otrosCostos):
        """
        Agrega un insumo a la BD
        """
        try:
            costoTotal = float(costoMateriales)+float(costoProduccion)+float(otrosCostos)
            DatosInsumo.add(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal)
        except Exception as e:
            raise(e)


    @classmethod
    def update(cls,idIns,nombre,unidad,costoMateriales,costoProduccion,otrosCostos):
        """
        Actualiza un insumo en la BD
        """
        try:
            costoTotal = float(costoMateriales)+float(costoProduccion)+float(otrosCostos)
            DatosInsumo.update(idIns,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal)
        except Exception as e:
            raise(e)