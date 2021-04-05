from negocio.negocio import Negocio
from data.data_material import DatosMaterial
import custom_exceptions
from data.data_deposito import DatosDeposito

class NegocioDeposito(Negocio):
    
    @classmethod
    def alta(cls, id_mat,id_pd,cantidad,cant_ep):
        """
        Añade un nuevo depósito.
        """
        try:
            DatosMaterial.addStock(id_mat,cantidad)
            return DatosDeposito.add(int(id_mat),int(id_pd),float(cantidad),float(cant_ep))
        except Exception as e:
            raise e


    @classmethod
    def verificar_codigo(cls,cod,user):
        """
        Verifica que el codigo corresponda a un deposito y le asigna el deposito al usuario correspondiente
        Devuelve la cantidad de EP acreditados
        """
        try:
            return DatosDeposito.verificar_codigo(cod,user.id)

        except Exception as e:
            raise e
    
    @classmethod
    def get_by_id_usuario(cls,uid, limit=False):
        """
        Busca los depósitos que correspondan a un usuario en base a su ID.
        """
        try:
            return DatosDeposito.get_by_id_usuario(uid, limit)
        except Exception as e:
            raise e


    @classmethod
    def get_all(cls):
        """
        Busca todos depósitos de la BD.
        """
        try:
            return DatosDeposito.get_all()
        except Exception as e:
            raise e


    @classmethod
    def get_by_id_PD(cls,id):
        """
        Busca todos depósitos realizados en un PD de la BD.
        """
        try:
            return DatosDeposito.get_by_id_PD(id)
        except Exception as e:
            raise e


    @classmethod
    def update_estado(cls,id,estado):
        try:
            DatosDeposito.update_estado(id,estado)
        except Exception as e:
            raise e


    @classmethod
    def get_by_id(cls,id):
        """
        Busca un depósito según su ID de la BD.
        """
        try:
            return DatosDeposito.get_by_id(id)
        except Exception as e:
            raise e


    @classmethod
    def get_user_id(cls,id):
        """
        Busca el id del usuario de un deposito segun su id.
        """
        try:
            return DatosDeposito.get_user_id(id)
        except Exception as e:
            raise e