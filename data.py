""" Módulo de datos.

Este modulo constituye, en la arquitectura de 3 capas, a la capa de Datos, encargada de gestionar las interacciones
con la base de datos. Este módulo contiene a la clase CapaDatos, que contiene métodos para la conexión a la base de 
datos y aquellos que engloban las distintas consultas que se utilizarán para obtener, modificar, y/o actualizar 
elementos en la base de datos.

El nombre de la clase CapaDatos seguirá la convención de PEP8. Comenzarán con mayúscula, y todas sus consecuentes 
palabras comenzarán también con mayúscula. Las funciones, métodos, atributos y variables se identificarán con nombres 
en minusculas, separando las palabras con guiones bajos.

Dependencias:
    flask_mysqldb

"""

#Imports

from flask_mysqldb import MySQL

class CapaDatos():

    def ConexionDB(password, host):
    """Crea la conexión con la base de datos MySQL. Devuelve un booleano.

    Args:
        password (string): Contraseña de la conexión.
        host (string): Nombre del host de MySQL.

    Returns:
        bool: Verdadero si la conexión tuvo éxito, falso si no.

    Raises:
        ErrorDeConexion: si ocurre un error conectando a la base de datos.
    """

    #Creación del motor de la Base de datos
    try:
        engine = create_engine('mysql://root:'+ password + '@' + host + '/ecoasistente')

        #Exceptuamos a AlchemyBase de la convención de nombres por representar una clase
        AlchemyBase = declarative_base()   
        AlchemyBase.metadata.bind = engine
    except Exception as e:
        raise custom_exceptions.ErrorDeConexion(origen="classes.ConexionDB()",
                                                msj=str(e),
                                                msj_adicional="Error conectando a la base de datos MySQL.")