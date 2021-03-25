from negocio.negocio import Negocio
from data.data_material import DatosMaterial
from data.data_cant_material import DatosCantMaterial
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
                                                    
    @classmethod
    def get_by_id(cls, id):
        """
        Obtiene un Material de la BD segun su ID
        """
        try:
            material = DatosMaterial.get_by_id(id)
            return material
        except Exception as e:
            raise e
    
    
    @classmethod
    def get_by_id_array(cls, ids):
        """
            Obtiene Materiales de la BD en base a una lista de IDs
        """
        try:
            materiales = []
            for id in ids:
                materiales.append(cls.get_by_id(id))
            return materiales
        except Exception as e:
            raise e


    
    @classmethod
    def add(cls,nombre,unidad,costoRecoleccion,color,estado,desc):
        """
        Agrega un material a la BD
        """
        try:
            DatosMaterial.add(nombre,unidad,costoRecoleccion,color,estado,desc)
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


    @classmethod
    def update_desc(cls,idMat,desc):
        """
        Actualiza la desc de un material en la BD
        """
        try:
            DatosMaterial.update_desc(idMat,desc)
        except Exception as e:
            raise(e)