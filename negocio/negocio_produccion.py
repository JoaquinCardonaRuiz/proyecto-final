from negocio.negocio import Negocio
from datetime import datetime
from data.data_produccion import DatosProduccion

class NegocioProduccion(Negocio):
    @classmethod
    def get_all_articulos(cls):
        try:
            return DatosProduccion.get_all_articulos()
        except Exception as e:
            raise e

    @classmethod
    def confirmar_produccion(cls,idArt,cant):
        try:
            fecha = datetime.now()
            DatosProduccion.add(idArt,fecha,cant)
        except Exception as e:
            raise e