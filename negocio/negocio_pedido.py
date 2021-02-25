from negocio.negocio import Negocio
from data.data_pedido import DatosPedido
from data.data_usuario import DatosUsuario
from data.data_punto_retiro import DatosPuntoRetiro
from data.data_cant_articulo import DatosCantArticulo
from negocio.negocio_articulo import NegocioArticulo
from datetime import datetime, timedelta
import custom_exceptions

class NegocioPedido(Negocio):
    @classmethod
    def add(cls,carrito,usuario,idPR,totalEP,totalARS):
        #Pedido
        puntoRetiro = DatosPuntoRetiro.get_by_id(idPR)
        fechaEnc = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        fechaRet = fechaEnc + timedelta(days=puntoRetiro.demoraFija)
        idPedido = DatosPedido.add(fechaEnc,fechaRet,totalEP,totalARS,idPR,usuario.id)
        
        #EcoPuntos
        user = DatosUsuario.get_by_id(usuario.id)
        nueva_cant_ep = user.totalEcopuntos - totalEP
        if nueva_cant_ep < 0:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_pedido.add()",msj="EP insuficientes para realizar pedido")
        #DatosUsuario.updateStock(user.id,nueva_cant_ep)
        
        #Articulos y Stock
        for art in carrito:
            NegocioArticulo.disminuirStock(art.idTipoArticulo,art.cantidad)
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
