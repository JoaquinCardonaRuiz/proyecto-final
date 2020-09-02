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

#Imports

import MySQLdb
import custom_exceptions
from classes import Nivel,\
                    EntidadDestino

#Clase que representa la capa de datos.
class Datos():
    """
    """
    db = None
    cursor = None

    @classmethod
    def abrir_conexion(cls):
        #Conexión con el motor de BD.
        
        try:
            cls.db = MySQLdb.connect(host="sql10.freemysqlhosting.net",    # Host de la BD.
                        user="sql10359552",                            # Usuario de la BD
                        passwd="vyqs1VbikX",                           # Contraseña de la BD
                        db="sql10359552")                              # Nombre de la DB
            cls.cursor = cls.db.cursor()
                
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data",
                                                    msj=str(e),
                                                    msj_adicional="Error conectando a la base de \
                                                        datos MySQL.")
    
    @classmethod
    def cerrar_conexion(cls):
        """
        """
        #Cerrando la conexión con el motor de BD:
        try:
            cls.db.close()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.cerrar_conexion()",
                                                    msj=str(e),
                                                    msj_adicional="Error cerrando la conexión \
                                                        a la base de datos MySQL.")
    
    @classmethod
    def get_niveles(cls):
        """
        Obtiene todos los niveles de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select * from niveles")
            cls.cursor.execute(sql)
            niveles_ = cls.cursor.fetchall()
            niveles = []
            for nivel in niveles_:
                nivel_ = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                niveles.append(nivel_)
            return niveles
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los \
                                                        niveles desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_entidades_destino(cls):
        """
        Obtiene todos los niveles de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM entidadesDestino;")
            cls.cursor.execute(sql)
            entidades_ = cls.cursor.fetchall()
            entidades = []
            for e in entidades_:
                entidad_ = EntidadDestino(e[0],e[1])
                entidades.append(entidad_)
            return entidades
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        entidades destino desde la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_max_descuento(cls):
        """Devuelve el mayor descuento registrado en la BD."""
        cls.abrir_conexion()
        try:
            sql = ("select max(descuento) from niveles;")
            cls.cursor.execute(sql)
            maxDescuento = cls.cursor.fetchall()[0][0]
            return maxDescuento
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo descuento \
                                                         de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_max_ecoPuntos(cls):
        cls.abrir_conexion()
        """Devuelve la mayor cantidad EcoPuntos solicitada para un nivel registrado en la BD."""
        try:
            sql = ("select max(maxEcoPuntos) from niveles;")
            cls.cursor.execute(sql)
            maxEP = cls.cursor.fetchall()[0][0]
            return maxEP
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo de EcoPuntos \
                                                         de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def alta_nivel(cls, nivel):
        cls.abrir_conexion()
        """Añade el nivel que recibe como parametro a la BD."""
        try:
            sql = ("insert into niveles (nombre, minEcoPuntos, maxEcoPuntos, descuento) values (%s, %s, %s, %s);")
            values = (nivel.nombre, nivel.minimoEcoPuntos, nivel.maximoEcoPuntos, nivel.descuento)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo de EcoPuntos \
                                                         de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()