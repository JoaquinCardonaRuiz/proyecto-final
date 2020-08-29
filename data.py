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

#Clase que representa la capa de datos.
class CapaDatos():
    """
    """
    def __init__(self):
        
        self.db = None
        self.cursor = None
        self.abrir_conexion()

    def abrir_conexion(self):
        """
        """
        #Conexión con el motor de BD.
        try:
            self.db = MySQLdb.connect(host="sql10.freemysqlhosting.net",    # Host de la BD.
                        user="sql10359552",      # Usuario de la BD
                        passwd="vyqs1VbikX",     # Contraseña de la BD
                        db="sql10359552")        # Nombre de la DB
            self.cursor = self.db.cursor()
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="classes.ConexionDB()",
                                                    msj=str(e),
                                                    msj_adicional="Error conectando a la base de datos MySQL.")
    
    def cerrar_conexion(self):
        """
        """
        #Cerrando la conexión con el motor de BD:
        try:
            self.db.close()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="classes.ConexionDB()",
                                                    msj=str(e),
                                                    msj_adicional="Error cerrando la conexión a la base de datos MySQL.")
    
    def get_niveles(self):
        """
        Obtiene todos los niveles de la BD.
        """
        #Conexión con el motor de BD.
        try:
            self.abrir_conexion()
            sql = ("select * from niveles")
            self.cursor.execute(sql)
            niveles_ = self.cursor.fetchall()
            niveles = []
            for nivel in niveles_:
                nivel_ = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                niveles.append(nivel_)
            return niveles
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los niveles desde la BD.")

