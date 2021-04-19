from negocio.negocio import Negocio
from data.data_articulo import DatosArticulo
from data.data_ecopuntos import DatosEcoPuntos
from datetime import datetime
import custom_exceptions

class NegocioEcoPuntos(Negocio):
    @classmethod
    def get_valor_EP(cls):
        try:
            return DatosEcoPuntos.get_valor_EP()
        except Exception as e:
            raise e

    @classmethod
    def get_factor_recompensa_EP(cls):
        try:
            return DatosEcoPuntos.get_porcentaje_rec_EP()
        except Exception as e:
            raise e


    @classmethod
    def get_valores_EP(cls):
        try:
            return DatosEcoPuntos.get_valores_EP()
        except Exception as e:
            raise e

    @classmethod
    def get_factores_recompensa(cls):
        try:
            return DatosEcoPuntos.get_factores_recompensa()
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


    @classmethod
    def updateConfig(cls,config,value):
        date = datetime.now()
        if config=="EPs":
            p = DatosEcoPuntos.get_porcentaje_rec_EP()
            DatosEcoPuntos.updateValorEp(value,p,date)
            DatosArticulo.update_all_EP_values(value)

        elif config=="Recs":
            e = DatosEcoPuntos.get_valor_EP()
            DatosEcoPuntos.updatePorcentajeRec(value,e,date)