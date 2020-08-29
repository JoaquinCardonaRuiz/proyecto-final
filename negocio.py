""" Módulo de datos.

Este modulo constituye, en la arquitectura de 3 capas, la capa de Datos, encargada de gestionar las interacciones
con la base de datos. Este módulo contiene a la clase CapaDatos, que contiene métodos para la conexión a la base de 
datos y aquellos que engloban las distintas consultas que se utilizarán para obtener, modificar, y/o actualizar 
elementos en la base de datos.

El nombre de la clase CapaDatos seguirá la convención de PEP8. Comenzarán con mayúscula, y todas sus consecuentes 
palabras comenzarán también con mayúscula. Las funciones, métodos, atributos y variables se identificarán con nombres 
en minusculas, separando las palabras con guiones bajos.

Dependencias:
    MySQLdb

TODO:
    * Docstring dentro de la clase CapaDatos.
    * Docstring con descripción de los métodos.
"""

#Imports

import MySQLdb
import custom_exceptions
from custom_exceptions import *
from classes import Nivel
from data import CapaDatos

#Clase que representa la capa de datos.
class Negocio():
    """
    """
    def __init__(self):
        
        self.datos=CapaDatos()       

    def replace_dots(self, number, decimals):
        """
        Redondea la cantidad de decimales del número recibido como parámetro, y reemplaza el punto por una coma para denotarlos.
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
                                                   msj_adicional="Error formateando los números.")


    def get_niveles(self):
        """
        Obtiene todos los niveles de la BD.
        """
        #Conexión con el motor de BD.
        try:
            niveles = self.datos.get_niveles()
            for nivel in niveles:
                nivel.descuento = self.replace_dots(nivel.descuento, 0)
                nivel.minimoEcoPuntos = self.replace_dots(nivel.minimoEcoPuntos,0)
                nivel.maximoEcoPuntos = self.replace_dots(nivel.maximoEcoPuntos,0)
            return niveles

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los niveles la capa de Datos.")


    
