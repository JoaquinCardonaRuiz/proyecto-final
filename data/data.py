""" Módulo de datos.

Este modulo constituye, en la arquitectura de 3 capas, la capa de Datos, encargada de gestionar
las interacciones con la base de datos. Este módulo contiene a la clase CapaDatos, que contiene
métodos para la conexión a la base de datos y aquellos que engloban las distintas consultas que
se utilizarán para obtener, modificar, y/o actualizar elementos en la base de datos.

El nombre de la clase CapaDatos seguirá la convención de PEP8. Comenzarán con mayúscula, y 
todas sus consecuentes palabras comenzarán también con mayúscula. Las funciones, métodos, 
atributos y variables se identificarán con nombres en minusculas, separando las palabras con 
guiones bajos.

Dependencias:
    MySQLdb

TODO:
    * Docstring dentro de la clase CapaDatos.
    * Docstring con descripción de los métodos.
"""

# Imports
# Esto se podría hacer directamente importando toda la carpeta, con una librería, pero esto me parece más claro

from data.data_articulo               import DatosArticulo
from data.data_cant_articulo          import DatosCantArticulo
from data.data_cant_material          import DatosCantMaterial
from data.data_demanda                import DatosDemanda
from data.data_deposito               import DatosDeposito
from data.data_ecopuntos              import DatosEcoPuntos
from data.data_entidad_destino        import DatosEntidadDestino
from data.data_estimacion             import DatosEstimacion
from data.data_horario                import DatosHorario
from data.data_material               import DatosMaterial
from data.data_modulo                 import DatosModulo
from data.data_nivel                  import DatosNivel
from data.data_pedido                 import DatosPedido
from data.data_planta_recomendada     import DatosPlantaRecomendada
from data.data_planta                 import DatosPlanta
from data.data_punto_deposito         import DatosPuntoDeposito
from data.data_punto_retiro           import DatosPuntoRetiro
from data.data_recomendacion          import DatosRecomendacion
from data.data_salida_stock           import DatosSalidaStock
from data.data_tipo_documento         import DatosTipoDocumento
from data.data_tipo_usuario           import DatosTipoUsuario
from data.data_usuario                import DatosUsuario
from data.data_valor                  import DatosValor


import mysql.connector
import custom_exceptions
from classes import *


class Datos():
    """ Clase que representa la capa de negocio.
        Los métodos declarados aquí serán heredados por todas las clases de negocio.
    """
    db = None
    cursor = None

    @classmethod
    def abrir_conexion(cls):
        """
        Abre la conexión con el motor de BD, y setea como variables de clase a la BD y el 
        Cursor.
        """
        
        try:
            cls.db = mysql.connector.connect(host="eco-asistente-pf.mysql.database.azure.com",  # Host de la BD.
                        user="EcoAdmin@eco-asistente-pf",                              # Usuario de la BD
                        passwd="PF-Caracini-Cardona",                             # Contraseña de la BD
                        db="ecoasistente")                                # Nombre de la DB
            cls.cursor = cls.db.cursor()
                
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data",
                                                    msj=str(e),
                                                    msj_adicional="Error conectando a la base \
                                                        de datos MySQL.")
    
    @classmethod
    def cerrar_conexion(cls):
        """
        Cierra la conexión con el motor de BD.
        """
        #Cerrando la conexión con el motor de BD:
        try:
            cls.db.close()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.cerrar_conexion()",
                                                    msj=str(e),
                                                    msj_adicional="Error cerrando la conexión \
                                                        a la base de datos MySQL.")