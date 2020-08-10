""" Módulo de clases.

Este módulo contiene las declaraciones de las clases que utilizará el sistema.  El mismo está 
divido en aquellas clases que se almacenarán en la base de datos con SQLAlchemy, y aquellas 
que no.  Las primeras heredan de la clase base de Alchemy, identificada como "AlchemyBase". 
Sus atributos son declarados de acuerdo a los tipos de datos de SQLAlchemy.

Las clases auxiliares que no son almacenadas en la base de datos son declaradas de acuerdo a
las convenciones de PEP8.

Los nombres de las clases seguirán la convención de PEP8. Comenzarán con mayúscula, y todas
sus consecuentes palabras comenzarán también con mayúscula. Las funciones, métodos, atributos
y variables se identificarán con nombres en minusculas, separando las palabras con guiones
bajos.

Dependencias:
    MySQLdb
    sqlalchemy

TODO:
    * Quitar la conexión a la DB de este módulo.
"""

#Imports

import MySQLdb
import custom_exceptions
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, Date, DateTime
from sqlalchemy import create_engine


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


#Clases almacenadas en BD
class Usuario:
    """ Representa a los usuarios del sistema, tanto los administradores como los ciudadanos.

    Atributos:
        id (string): Identificador de la entidad
        nroDoc (string): Número de documento del usuario
        tipoDoc (TipoDocumento): Tipo de documento del usuario
        nombre (string): Nombre de pila del usuario
        apellido (string): Apellido o nombre de familia del usuario
        ecopuntos (EcoPuntos[]): Arreglo de los ecopuntos que el usuario posee
        IDTipoUsuario (string): Identificador de la instancia de TipoUsuario que corresponde
            a la entidad
        despositosActivos (Deposito[]): Arreglo de depositos que siguen vigentes  
        depositosVencidos (Deposito[]): Arreglo de depositos que se encuentran vencidos
        mediosPago (MedioPago[]): Arreglo de medios de pago con los que cuenta el usuario
        pedidos (Pedidos[]): Arreglo de los pedidos realizados por el usuario
        totalEcopuntos (int): Sumatoria de la cantidad de ecopuntos que el usuario posee
        idNivel (string): Identificador del nivel que le corresponde al usuario
        recomendacionesPlantas (Recomendacion[]): Arreglo de recomendaciones de plantas
            recibidas por el usuario
        estimacionesCO2 (Estimacion[]): Arreglo de estimaciones de emision de CO2 recibidas por
            el usuario.
        estimacionesEnergia (Estimacion[]): Arreglo de estimaciones de consumo de energía
            recibidas por el usuario.
    """

    def __init__(self, id, nroDoc, tipoDoc, nombre, apellido, password, idTipoUsuario):
        self.id = id
        self.nroDoc = nroDoc
        self.tipoDoc = tipoDoc
        self.nombre = nombre
        self.apellido = apellido
        self.password = password
        self.idTipoUsuario = idTipoUsuario
        self.ecopuntos = []
        self.depositosActivos = []
        self.depositosVencidos = []
        self.mediosPago = None
        self.pedidos = []
        self.totalEcopuntos = 0
        self.idNivel = None
        self.recomendacionesPlantas = []
        self.estimacionesCO2 = []
        self.estimacionesEnergia = []

    def cargarEcopunto(self,):
        """ """

    def cargarDeposito(self,):
        """ """

    def comprobarVencimientoDepositos(self,):
        """ """

    def cargarMedioPago(self,):
        """ """
    
    def crearPedido(self,):
        """ """

    def calcularTotalEcopuntos(self,):
        """ """

    def calcularNivel(self,):
        """ """

    def crearRecomendacionPlanta(self,):
        """ """

    def crearEstimacionCO2(self,):
        """ """

    def crearEstimacionEnergia(self,):
        """ """

class TipoUsuario:
    """ Representa los distintos tipos de usuario con los que cuenta el sistema, y guarda los
    módulos a los que tienen acceso.
        
    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre que identifica al tipo de usuario.
        modulosAcceso (Modulos[]): Arreglo de los módulos a los que el usuario puede acceder.
    """

    def __init__(self, id, nombre, modulosAcceso=[]):
        self.id = id
        self.nombre = nombre
        self.modulosAcceso = modulosAcceso

    def cambiarModulosAcceso():
        """ """

class Modulo:
    """ """

class Nivel:
    """ """

class Estimacion:
    """ """

class TipoDocumento:
    """ """

class Recomendacion:
    """ """

class PlantaRecomendada:
    """ """

class Planta:
    """ """

class Deposito:
    """ """

class DepositosSinRegistrar:
    """ """

class Ecopuntos:
    """ """

class ValorEcopuntos:
    """ """

class PuntoDeposito:
    """ """

class Horario:
    """ """

class Pedido:
    """ """

class PuntoRetiro:
    """ """

class CantArticulo:
    """ """

class TipoArticulo:
    """ """

class Valor:
    """ """

class CantDemanda:
    """ """

class EntidadDestino:
    """ """

class SalidaStock:
    """ """

class StockArticulos:
    """ """

class Nivel:
    """ """

class Material:
    """ """

class StockMaterial:
    """ """

class CantidadMaterial:
    """ """

#Create all tables on the DB.
def CreateTables():
    AlchemyBase.metadata.create_all(engine)

ConexionDB(password='3936107', host='localhost')