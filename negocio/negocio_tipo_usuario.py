from negocio.negocio import Negocio
import custom_exceptions
from data.data_tipo_usuario import DatosTipoUsuario

class NegocioTipoUsuario(Negocio):
    
    @classmethod
    def get_by_id(cls,id):
        try:
            return DatosTipoUsuario.get_by_id(id)
        except Exception as e:
            raise e