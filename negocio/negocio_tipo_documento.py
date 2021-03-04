from negocio.negocio import Negocio
import custom_exceptions
from data.data_tipo_documento import DatosTipoDocumento

class NegocioTipoDocumento(Negocio):
    
    @classmethod
    def get_by_id(cls,id):
        try:
            return DatosTipoDocumento.get_by_id(id)
        except Exception as e:
            raise e
    
    @classmethod
    def get_all(cls):
        try:
            return DatosTipoDocumento.get_all()
        except Exception as e:
            raise e