""" Módulo de Negocio.

Este modulo constituye, en la arquitectura de 3 capas, la capa de Negocio, encargada de 
implementar la lógica de negocio de la aplicación. Este módulo contiene la clase Negocio, que
contiene métodos para hacer de intermediario entre la capa de presentación y de datos, 
aplicando la lógica necesaria para cumplir con la funcionalidad del sistema.
El nombre de los miembros de este módulo seguirán la convención de PEP8. Comenzarán con 
mayúscula, y todas sus consecuentes  palabras comenzarán también con mayúscula. Las funciones, 
métodos, atributos y variables se identificarán con nombres  en minusculas, separando las 
palabras con guiones bajos.

Dependencias:
    operator

TODO:
    * Docstring dentro de la clase Negocio.
    * Docstring con descripción de los métodos.
"""

# Imports
# Esto se podría hacer directamente importando toda la carpeta, con una librería, pero esto me parece más claro

from negocio.negocio_articulo               import NegocioArticulo
from negocio.negocio_cant_articulo          import NegocioCantArticulo
from negocio.negocio_cant_material          import NegocioCantMaterial
from negocio.negocio_demanda                import NegocioDemanda
from negocio.negocio_deposito               import NegocioDeposito
from negocio.negocio_ecopuntos              import NegocioEcoPuntos
from negocio.negocio_entidad_destino        import NegocioEntidadDestino
from negocio.negocio_estimacion             import NegocioEstimacion
from negocio.negocio_horario                import NegocioHorario
from negocio.negocio_material               import NegocioMaterial
from negocio.negocio_modulo                 import NegocioModulo
from negocio.negocio_nivel                  import NegocioNivel
from negocio.negocio_pedido                 import NegocioPedido
from negocio.negocio_planta_recomendada     import NegocioPlantaRecomendada
from negocio.negocio_planta                 import NegocioPlanta
from negocio.negocio_punto_deposito         import NegocioPuntoDeposito
from negocio.negocio_punto_retiro           import NegocioPuntoRetiro
from negocio.negocio_recomendacion          import NegocioRecomendacion
from negocio.negocio_salida_stock           import NegocioSalidaStock
from negocio.negocio_tipo_documento         import NegocioTipoDocumento
from negocio.negocio_tipo_usuario           import NegocioTipoUsuario
from negocio.negocio_usuario                import NegocioUsuario
from negocio.negocio_valor                  import NegocioValor


class Negocio():
    """ Clase que representa la capa de negocio.
        Los métodos declarados aquí serán heredados por todas las clases de negocio.
    """
