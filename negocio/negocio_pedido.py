from negocio.negocio import Negocio
from data.data_pedido import DatosPedido
from data.data_articulo import DatosArticulo
from data.data_punto_retiro import DatosPuntoRetiro
from data.data_cant_articulo import DatosCantArticulo
from datetime import datetime, timedelta
import custom_exceptions

class NegocioPedido(Negocio):
    @classmethod
    def add(cls,carrito,usuario,idPR,totalEP,totalARS):
        puntoRetiro = DatosPuntoRetiro.get_by_id(idPR)
        fechaEnc = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        fechaRet = fechaEnc + timedelta(days=puntoRetiro.demoraFija)
        idPedido = DatosPedido.add(fechaEnc,fechaRet,totalEP,totalARS,idPR,usuario.id)
        for art in carrito:
            articulo = DatosArticulo.get_by_id(art.idTipoArticulo)
            nueva_cant = articulo.stock - art.cantidad
            if nueva_cant < 0:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio_pedido.add()",msj="Stock insuficiente para realizar pedido")
            DatosArticulo.updateStock(art.idTipoArticulo,nueva_cant)
            DatosCantArticulo.addArticuloPedido(art.idTipoArticulo,idPedido,art.cantidad)
            
    @classmethod
    def get_all(cls):
        try:
            return DatosPedido.get_all()
        except Exception as e:
            raise e

    @classmethod
    def get_by_idPR(cls,id):
        try:
            return DatosPedido.get_by_idPR(id)
        except Exception as e:
            raise e

    @classmethod
    def update_estado(cls,id,estado):
        try:
            DatosPedido.update_estado(id,estado)
        except Exception as e:
            raise e
