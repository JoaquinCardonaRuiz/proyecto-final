from negocio.negocio import Negocio
from data.data_ecopuntos import DatosEcoPuntos
import custom_exceptions

class NegocioEcoPuntos(Negocio):
    @classmethod
    def get_valor_EP(cls):
        try:
            return DatosEcoPuntos.get_valor_EP()
        except Exception as e:
            raise e


    @classmethod
    def updateEps(cls,idEP,cant):
        try:
            if cant < 0:
                print("Advertencia: cant de ecopuntos a actualizar menor a 0: ",str(cant))
                cant = 0
            return DatosEcoPuntos.updateEps(idEP,cant)
        except Exception as e:
            raise e