from negocio.negocio import Negocio
import custom_exceptions
from data.data_deposito import DatosDeposito

class NegocioDeposito(Negocio):
    
    @classmethod
    def alta(cls, id_mat,id_pd,cantidad,cant_ep):
        """
        Añade un nuevo depósito.
        """
        #Conexión con el motor de BD.
        try:
            return DatosDeposito.add(int(id_mat),int(id_pd),int(cantidad),int(cant_ep))

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_direccion.alta()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio dando de alta los un depósito.")
