from negocio.negocio import Negocio
from data.data_pedido import DatosPedido
from data.data_punto_retiro import DatosPuntoRetiro
from datetime import datetime
import custom_exceptions

class NegocioPedido(Negocio):
    @classmethod
    def add(cls,carrito,usuario,idPR):
        puntoRetiro = DatosPuntoRetiro.get_by_id(idPR)
        fechaEnc = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        fechaRet = fechaEnc + puntoRetiro.demoraFija
        idPedido = DatosPedido.add(fechaEnc)