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
    * DONE - Arreglar clase TipoUsuario
    * DONE - Terminar clase Estimacion
    * Recordar qué era el atributo "estado" en TipoDocumento
    * Crear clase EcoAsistente que guarde todos los globales. (stocks, etc.)
"""

#Imports

import MySQLdb
import custom_exceptions
from custom_exceptions import *
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
        global engine
        engine = create_engine('mysql://root:'+ password + '@' + host + '/ecoasistente')

        #Exceptuamos a AlchemyBase de la convención de nombres por representar una clase
        global AlchemyBase
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
        modulosAcceso (string[]): Arreglo de los ID de los módulos a los que el usuario puede 
            acceder.
    """

    def __init__(self, id, nombre, modulosAcceso=[]):
        self.id = id
        self.nombre = nombre
        self.modulosAcceso = modulosAcceso

    def cambiarModulosAcceso(self,):
        """ """

class Modulo:
    """ Representa los distintos módulos de funcionalidad con los que cuenta el sistema, a
    los que distintos tipos de usuarios tendrán acceso.

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del módulo para identificación por parte del usuario.
    """

    def __init__(self,id,nombre):
        self.id = id
        self.nombre = nombre

class Nivel:
    """ Representa los niveles que pueden ser alcanzados por los usuarios mediante la obtención
    de ecopuntos. Registran los ecopuntos necesarios para ser alcanzados.

    Atributos:
        id (string): Identificador de la entidad.
        minimoEcoPuntos (float): Mínima cantidad de ecopuntos necesaria para alcanzar el nivel.
        maximoEcoPuntos (float): Máxima cantidad de ecopuntos que el nivel comprende.
        descuento (float): Descuento aplicado a los pedidos para los usuarios que alcanzaron el
            nivel. Expresado como número entre 0 y 1.
        multiplicador (float, calculated): equivalente a 1-descuento, utilizado para
            multiplicar el precio del pedido.
    """

    def __init__(self,id,minimoEcoPuntos,maximoEcoPuntos,descuento):
        self.id = id
        self.set_ecopuntos(minimoEcoPuntos,maximoEcoPuntos)
        self.set_descuento(descuento)

    def set_descuento(self,descuento):
        """Actualiza el valor de descuento del nivel"""
        self.descuento = descuento
        self.multiplicador = 1-descuento

    def set_ecopuntos(self,minimoEcoPuntos,maximoEcoPuntos):
        if minimoEcoPuntos > maximoEcoPuntos: 
            raise ErrorDeValorIngresado(origen="Nivel.set_ecopuntos",msj_adicional="El valor de\
                la cantidad máxima de ecopuntos debe ser mayor al valor de la cantidad mínima\
                de ecopuntos.")

        elif minimoEcoPuntos < 0 or maximoEcoPuntos < 0:
            raise ErrorDeValorIngresado(origen="Nivel.set_ecopuntos",msj_adicional="El valor de\
                las cantidades mínimas y máximas de ecopuntos debe ser mayor o igual a 0.")

        else:
            self.minimoEcoPuntos = minimoEcoPuntos
            self.maximoEcoPuntos = maximoEcoPuntos


class Estimacion:
    """ Representa una estimación de CO2 o consumo de energía provista al usuario por el
    sistema.

    Atributos:
        id (string): Identificador de la entidad.
        tipo (string): Toma valor "co2" si la estimación es de emisión de CO2, y "energia" si
            es de consumo de energía eléctrica" (sin tilde ni mayusculas).
    """

    def __init__(self,id,tipo):
        self.id = id
        self.tipo = tipo

class TipoDocumento:
    """ Contiene la información de los distintos posibles tipos de documento que un usuario
    puede poseer.

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del tipo de documento, para identificación por parte del
            usuario.
        estado (bool): VERIFICAR. Vale True si está habilitado para registrar nuevos usuarios
            con este tipo de documento, False si no.
    """

    def __init__(self, id, nombre, estado):
        self.id = id
        self.nombre = nombre
        self.estado = estado

    def habilitar(self):
        self.estado = True

    def deshabilitar(self):
        self.estado = False

class Recomendacion:
    """ Representa una recomendación de plantas dada al usuario por el sistema. Guarda
    información sobre las plantas recomendadas, y los valores provistos por el usuario.

    Atributos:
        id (string): Identificador de la entidad.
        plantas (PlantaRecomendada[]): Arreglo de instancias de PlantaRecomendada, que guardan
            información sobre la recomendación y respuestas del usuario.
    """

    def __init__(self, id, plantas=[]):
        self.id = id
        self.plantas = plantas

    def agregar_planta(self,p):
        self.plantas.append(p)

class PlantaRecomendada:
    """ Representa la recomendación de una planta en particular dentro de una recomendación
    provista al usuario por el sistema, junto con los puntajes de agua sol y temperatura que
    la llevaron a ser recomendada.

    Atributos:
        id (string): Identificador de la entidad.
        idPlanta (string): Identificador de la entidad de Planta recomendada.
        puntajeSol (int): Puntaje de sol en base a las respuestas del usuario y necesidades de
            la planta.
        puntajeRiego (int): Puntaje de riego en base a las respuestas del usuario y necesidades 
            de la planta.
        puntajeTemp (int): Puntaje de temperatura en base a las respuestas del usuario y 
            necesidades de la planta.
    """

    def __init__(self, id, idPlanta,puntajeSol,puntajeRiego,puntajeTemp):
        self.id = id
        self.idPlanta = idPlanta
        self.puntajeSol = puntajeSol
        self.puntajeRiego = puntajeRiego
        self.puntajeTemp = puntajeTemp

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
