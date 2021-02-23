from negocio.negocio import Negocio
from data.data_pedido import DatosPedido
from data.data_punto_retiro import DatosPuntoRetiro
from data.data_cant_articulo import DatosCantArticulo
from datetime import datetime, timedelta
import custom_exceptions

class NegocioPedido(Negocio):
    @classmethod
    def add(cls,carrito,usuario,idPR,valTotal,proporcion):
        puntoRetiro = DatosPuntoRetiro.get_by_id(idPR)
        fechaEnc = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        fechaRet = fechaEnc + timedelta(days=puntoRetiro.demoraFija)
        valPagoEP = valTotal * proporcion
        idPedido = DatosPedido.add(fechaEnc,fechaRet,valPagoEP,valTotal,idPR,usuario.id)
        for art in carrito:
            DatosCantArticulo.addArticuloPedido(art.idTipoArticulo,idPedido,art.cantidad)