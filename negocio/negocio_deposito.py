from negocio.negocio import Negocio
from data.data_material import DatosMaterial
import custom_exceptions
from datetime import datetime
from data.data_deposito import DatosDeposito
from negocio.negocio_usuario import NegocioUsuario
from data.data_entrada_externa import DatosEntradaExterna

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
    def cancelar(cls,id):
        """
        Cancela un depósito. Si el depósito ha sido acreditado, los EP se le restan al
        usuario. Si el usuario no tiene suficientes EP para restar, se lo deja en 0 EP.
        Se descuenta, asimismo, el stock de materiales generado por el deposito. Si no
        hay suficiente stock para restar, se genera una entrada correspondiente al
        stock faltante
        """
        try:
            dep = DatosDeposito.get_by_id(id)
            DatosDeposito.update_estado(id,"cancelar")
            if dep.isAcreditado():
                user_id = cls.get_user_id(id)
                NegocioUsuario.descontarEPDeposito(user_id,dep.ecoPuntos.cantidad)
            
            material = DatosMaterial.get_by_id(dep.material.idMaterial)
            if material.stock >= dep.material.cantidad:
                DatosMaterial.updateStock(material.id,material.stock - dep.material.cantidad)
            else:
                DatosMaterial.updateStock(material.id,0)
                restante = dep.material.cantidad-material.stock
                DatosEntradaExterna.add_one(material.id,restante,"Compensación por cancelación de depósito número "+str(id)+".",datetime.now())         
        except Exception as e:
            raise e


    @classmethod
    def get_info_cancelar(cls, id):
        errores = {"EP":-1,"Stock":0}
        dep = DatosDeposito.get_by_id(id)
        if dep.isAcreditado():
            errores["EP"] = 0
            user_id = cls.get_user_id(id)
            user = NegocioUsuario.get_by_id(user_id)
            if user.totalEcopuntos < dep.ecoPuntos.cantidad:
                errores["EP"] = dep.ecoPuntos.cantidad-user.totalEcopuntos 
        
        material = DatosMaterial.get_by_id(dep.material.idMaterial)
        if material.stock < dep.material.cantidad:
            errores["Stock"] = dep.material.cantidad-material.stock
        return errores

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