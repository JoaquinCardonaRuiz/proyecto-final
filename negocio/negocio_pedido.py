from negocio.negocio import Negocio
from data.data_pedido import DatosPedido
import custom_exceptions

class NegocioPedido(Negocio):
    @classmethod
    def get_all(cls):
        try:
            return DatosPedido.get_all()
        except Exception as e:
            raise e

    @classmethod
    def update_estado(cls,id,estado):
        try:
            DatosPedido.update_estado(id,estado)
        except Exception as e:
            raise e