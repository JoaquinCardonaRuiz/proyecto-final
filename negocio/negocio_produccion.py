from negocio.negocio import Negocio
from datetime import datetime
from data.data_produccion import DatosProduccion
from data.data_articulo import DatosArticulo
from data.data_insumo import DatosInsumo
from data.data_material import DatosMaterial
from data.data_cant_insumo import DatosCantInsumo
from data.data_cant_material import DatosCantMaterial

class NegocioProduccion(Negocio):
    @classmethod
    def get_all_articulos(cls):
        try:
            return DatosProduccion.get_all_articulos()
        except Exception as e:
            raise e


    @classmethod
    def get_all_insumos(cls):
        try:
            return DatosProduccion.get_all_insumos()
        except Exception as e:
            raise e

    @classmethod
    def confirmar_produccion(cls,id,cant,kind):
        try:
            fecha = datetime.now()
            DatosProduccion.add(id,fecha,cant,kind)
            if kind == "art":
                #sumar stock art
                DatosArticulo.addStock(id,cant)

                #restar stock ins
                insumos = DatosCantInsumo.get_from_TAid(id)
                for i in insumos:
                    DatosInsumo.removeStock(i.idInsumo,i.cantidad*cant)

            elif kind == "ins":
                #sumar stock ins
                DatosInsumo.addStock(id,cant)

                #restar stock mat
                materiales = DatosCantMaterial.get_from_Insid(id)
                for m in materiales:
                    DatosMaterial.removeStock(m.idMaterial,m.cantidad*cant)
        except Exception as e:
            raise e