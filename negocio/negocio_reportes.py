from negocio.negocio import Negocio
from data.data_reportes import DatosReportes
import custom_exceptions

class NegocioReportes():
    @classmethod
    def get_cant_usuarios(cls):
        try:
            return DatosReportes.get_cant_usuarios()
        except Exception as e:
            raise e
    
    @classmethod
    def get_cant_depositos(cls,cant_meses):
        try:
            return DatosReportes.get_cant_depositos(cant_meses)
        except Exception as e:
            raise e

    @classmethod
    def get_cant_pedidos(cls,cant_meses):
        try:
            return DatosReportes.get_cant_pedidos(cant_meses)
        except Exception as e:
            raise e
    
    @classmethod
    def ganancias_art_eco_tienda(cls,id,cant_meses):
        try:
            return DatosReportes.ganancias_art_eco_tienda(id,cant_meses)
        except Exception as e:
            raise e
    
    @classmethod
    def ganancias_art_totales(cls,id,cant_meses):
        try:
            return DatosReportes.ganancias_art_totales(id,cant_meses)
        except Exception as e:
            raise e
    
    @classmethod
    def get_movimientos_stock_materiales(cls,id,stock,cant_meses):
        try:
            return DatosReportes.get_movimientos_stock_materiales(id,stock,cant_meses)
        except Exception as e:
            raise e

    @classmethod
    def porcentaje_dep_acreditados(cls):
        try:
            return DatosReportes.porcentaje_dep_acreditados()
        except Exception as e:
            raise e
    
    @classmethod
    def porcentaje_dep_por_pd(cls):
        try:
            return DatosReportes.porcentaje_dep_por_pd()
        except Exception as e:
            raise e
    
    @classmethod
    def porcentaje_ped_por_pr(cls):
        try:
            return DatosReportes.porcentaje_ped_por_pr()
        except Exception as e:
            raise e