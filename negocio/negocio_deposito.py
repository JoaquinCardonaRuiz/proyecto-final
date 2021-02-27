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
            return DatosDeposito.add(int(id_mat),int(id_pd),float(cantidad),float(cant_ep))

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise e


    @classmethod
    def verificar_codigo(cls,cod,uid):
        """
        Verifica que el codigo corresponda a un deposito y le asigna el deposito al usuario correspondiente
        Devuelve la cantidad de filas afecatadas
        """
        try:
            return DatosDeposito.verificar_codigo(cod,uid)
        except Exception as e:
            raise e