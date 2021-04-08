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
            cls.db = mysql.connector.connect(host="sql10.freemysqlhosting.net", # Host de la BD.
                        user="sql10404333", # Usuario de la BD
                        passwd="nBUhZ1gSar", # Contraseña de la BD
                        db="sql10404333")  # Nombre de la DB
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