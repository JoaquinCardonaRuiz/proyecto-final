from negocio.negocio import Negocio
from data.data_material import DatosMaterial
import custom_exceptions

class NegocioMaterial(Negocio):
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