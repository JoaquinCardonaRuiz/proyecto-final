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

#Imports

import custom_exceptions
from classes import Nivel
from data import Datos
import operator
from operator import attrgetter


#Clase que representa la capa de datos.
class Negocio():

    @classmethod
    def replace_dots(cls, number, decimals):
        """
        Redondea la cantidad de decimales del número recibido como parámetro, y reemplaza el 
        punto por una coma para denotarlos.
        """
        try:
            if decimals == 0:
                number = str(int(round(float(number),decimals))).replace('.', ',')
                return number
            else:
                number = str(round(float(number),decimals)).replace('.', ',')
                return number
        except Exception as e:
           raise custom_exceptions.ErrorDeConexion(origen="negocio.replace_dots()",
                                                   msj=str(e),
                                                   msj_adicional="Error formateando los \
                                                       números.")

    @classmethod
    def get_niveles(cls):
        """
        Obtiene todos los niveles de la BD.
        """
        #Conexión con el motor de BD.
        try:
            niveles = Datos.get_niveles()
            for nivel in niveles:
                nivel.descuento = cls.replace_dots(nivel.descuento, 0)
                nivel.minimoEcoPuntos = cls.replace_dots(nivel.minimoEcoPuntos,0)
                nivel.maximoEcoPuntos = cls.replace_dots(nivel.maximoEcoPuntos,0)
            return niveles

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo los niveles de la capa de\
                                                         Datos.")
    
    @classmethod    
    def get_min_max_niveles(cls):
        """
        Obtiene el mínimo y el máximo nivel de la BD.
        """
        try:
            niveles = Datos.get_niveles()
            max_nivel = (max(niveles, key= operator.attrgetter('nombre')).nombre)
            min_nivel = (min(niveles, key= operator.attrgetter('nombre')).nombre)
            return [min_nivel, max_nivel]

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         calculando el máximo/mínimo nivel.")

    @classmethod
    def get_entidades_destino(cls):
        """
        Obtiene todas las entidades de destino de la BD.
        """
        try:
            entidades = Datos.get_entidades_destino()
            return entidades

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo las entidades destino de \
                                                         la capa de Datos.")
    
