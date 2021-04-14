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

    @classmethod
    def get_all(cls):
        try:
            return DatosTipoUsuario.get_all()
        except Exception as e:
            raise e
    
    @classmethod
    def add_permiso(cls,idTipoUsuario,idModulo):
        try:
            return DatosTipoUsuario.add_permiso(idTipoUsuario,idModulo)
        except Exception as e:
            raise e

    @classmethod
    def remove_permiso(cls,idTipoUsuario,idModulo):
        try:
            return DatosTipoUsuario.remove_permiso(idTipoUsuario,idModulo)
        except Exception as e:
            raise e
    
    @classmethod
    def add_one(cls,nombre):
        try:
            #Valida que el nombre no sea vacío.
            if nombre == "":
                raise custom_exceptions.ErrorDeNegocio(origen="negocio_tipo_usuario.add_one()",
                                                        msj_adicional = "Error al añadir el Tipo de Usuario. El nombre no puede quedar vacío.")
            #Valida que el nombre no exista.
            for tu in cls.get_all():
                if tu.nombre == nombre:
                    raise custom_exceptions.ErrorDeNegocio(origen="negocio_tipo_usuario.add_one()",
                                                        msj_adicional = "Error al añadir el Tipo de Usuario. El nombre ya se encuentra utilizado.")
            DatosTipoUsuario.add_one(nombre)
        except Exception as e:
            raise e