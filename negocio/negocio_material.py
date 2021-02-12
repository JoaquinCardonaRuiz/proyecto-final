from negocio.negocio import Negocio
from data.data_material import DatosMaterial
from data.data_cant_material import DatosCantMaterial
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
    def add(cls,nombre,unidad,costoRecoleccion,color,estado):
        """
        Agrega un material a la BD
        """
        try:
            DatosMaterial.add(nombre,unidad,costoRecoleccion,color,estado)
        except Exception as e:
            raise(e)

    
    @classmethod
    def update(cls,idMat,nombre,unidad,costoRecoleccion,color,estado):
        """
        Actualiza un material en la BD
        """
        try:
            DatosMaterial.update(idMat,nombre,unidad,costoRecoleccion,color,estado)
        except Exception as e:
            raise(e)


    @classmethod
    def delete(cls,id):
        """
        Elimina un material de la BD a partir de su id
        """
        try:
            DatosMaterial.delete(id)
            DatosCantMaterial.deshabilitar(id,True)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_material.delete()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de Negocio eliminando un material de la base de Datos")