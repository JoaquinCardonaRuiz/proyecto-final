from negocio.negocio import Negocio
from data.data_material import DatosMaterial
import custom_exceptions

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

    
    @classmethod
    def add(cls,nombre,unidad,costoRecoleccion,color):
        """
        Agrega un material a la BD
        """
        try:
            DatosMaterial.add(nombre,unidad,costoRecoleccion,color)
        except Exception as e:
            raise(e)

    
    @classmethod
    def update(cls,idMat,nombre,unidad,costoRecoleccion,color):
        """
        Actualiza un material en la BD
        """
        try:
            DatosMaterial.update(idMat,nombre,unidad,costoRecoleccion,color)
        except Exception as e:
            raise(e)