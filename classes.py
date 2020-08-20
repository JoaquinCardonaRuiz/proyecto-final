""" Módulo de clases.

Este módulo contiene las declaraciones de las clases que utilizará el sistema. Los nombres de 
las clases seguirán la convención de PEP8. Comenzarán con mayúscula, y todas sus 
consecuentes palabras comenzarán también con mayúscula. Las funciones, métodos, atributos y 
variables se identificarán con nombres en minusculas, separando las palabras con guiones 
bajos, al menos que su nombre sea distinto según el MD. Al declarar los constructores de las
clases, tener en cuenta que estos no sólo se utilizarán al crear las instancias por primera
vez, sino también al instanciarlas tras recuperarlas de la base de datos. En consecuencia, se
deberá proveer la posibilidad de crear la instancia con aquellos datos que no deberían estar
presentes en la instanciación inicial de una clase.

Dependencias:
    MySQLdb

TODO:
    * DONE - Arreglar clase TipoUsuario
    * DONE - Terminar clase Estimacion
    * Recordar qué era el atributo "estado" en TipoDocumento
    * Crear clase EcoAsistente que guarde todos los globales. (stocks, etc.)
    * Recuperar valores de EcoPuntos al inicializar clase EcoAsistente
    * Programar consulta de datos en clase EcoPuntos
    * Completar descripcion de atributo "abierto" en clase Horario
"""

#Imports

import MySQLdb
import custom_exceptions
from custom_exceptions import *

#Clases almacenadas en BD
class Usuario:
    """ Representa a los usuarios del sistema, tanto los administradores como los ciudadanos.

    Atributos:
        id (string): Identificador de la entidad.
        nroDoc (string): Número de documento del usuario.
        tipoDoc (TipoDocumento): Tipo de documento del usuario.
        nombre (string): Nombre de pila del usuario.
        apellido (string): Apellido o nombre de familia del usuario.
        password (string): Contrasena del usuario.
        ecopuntos (EcoPuntos[]): Arreglo de los ecopuntos que el usuario posee.
        IDTipoUsuario (string): Identificador de la instancia de TipoUsuario que corresponde
            a la entidad.
        despositosActivos (Deposito[]): Arreglo de depositos que siguen vigentes.
        depositosVencidos (Deposito[]): Arreglo de depositos que se encuentran vencidos.
        mediosPago (MedioPago[]): Arreglo de medios de pago con los que cuenta el usuario.
        pedidos (Pedidos[]): Arreglo de los pedidos realizados por el usuario.
        totalEcopuntos (int): Sumatoria de la cantidad de ecopuntos que el usuario posee.
        idNivel (string): Identificador del nivel que le corresponde al usuario.
        recomendacionesPlantas (Recomendacion[]): Arreglo de recomendaciones de plantas
            recibidas por el usuario.
        estimacionesCO2 (Estimacion[]): Arreglo de estimaciones de emision de CO2 recibidas por
            el usuario.
        estimacionesEnergia (Estimacion[]): Arreglo de estimaciones de consumo de energía
            recibidas por el usuario.
    """

    def __init__(self, 
                id, 
                nroDoc, 
                tipoDoc, 
                nombre, 
                apellido, 
                password, 
                idTipoUsuario,
                ecoPuntos=[],
                depositosActivos=[],
                depositosVencidos=[],
                mediosPago=None,
                pedidos=None,
                totalEcopuntos=0,
                idNivel=None,
                recomendacionesPlantas=[],
                estimacionesCO2=[],
                estimacionesEnergia=[]):
        self.id = id
        self.nroDoc = nroDoc
        self.tipoDoc = tipoDoc
        self.nombre = nombre
        self.apellido = apellido
        self.password = password
        self.idTipoUsuario = idTipoUsuario
        self.ecoPuntos = ecoPuntos
        self.depositosActivos = depositosActivos
        self.depositosVencidos = depositosVencidos
        self.mediosPago = mediosPago
        self.pedidos = pedidos
        self.totalEcopuntos = totalEcopuntos
        self.idNivel = idNivel
        self.recomendacionesPlantas = recomendacionesPlantas
        self.estimacionesCO2 = estimacionesCO2
        self.estimacionesEnergia = estimacionesEnergia

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
        self.minimoEcoPuntos = minimoEcoPuntos
        self.maximoEcoPuntos = maximoEcoPuntos
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
    """ Representa uno de los tipos de plantas presentes para el sistema, y contiene 
    información sobre sus necesidades para el cálculo de los puntajes.

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre de la planta, para identificación por parte del usuario.
        sol (int): Valor óptimo de sol para la planta.
        riego (int): Valor óptimo de riego para la planta.
        temp (int): Valor óptimo de temperatura para la planta.
    """
    def __init__(self, id, nombre, sol, riego, temp):
        self.id = id
        self.nombre = nombre
        self.sol = sol
        self.riego = riego
        self.temp = temp

class Deposito:
    """ Representa un deposito de materiales realizado por un usuario en uno de los puntos de
    depósito.

    Atributos:
        id (string): Identificador de la entidad.
        codigo (string): Código ingresado por el usuario para registrar el depósito a su nombre.
        material (CantidadMaterial): Entidad de CantidadMaterial que registra el tipo de material
            y la cantidad del mismo depositado.
        idPuntoDeposito (string): Identificador del punto de depósito en el que el depósito fue
            realizado.
        ecoPuntos (EcoPuntos, optional): Entidad de EcoPuntos que guarda los puntos que le son 
            asignados al usuario al registrar el depósito. 
        fechaRegistro (Date, optional): Fecha en la que el depósito fue registrado por el usuario.
        fechaDeposito (Date): Fecha en la que el depósito fue realizado.
    """
    def __init__(self, id, codigo, material, idPuntoDeposito, fechaDeposito, ecoPuntos=None, fechaRegistro=None):
        self.id = id
        self.codigo = codigo
        self.material = material
        self.idPuntoDeposito = idPuntoDeposito
        self.fechaDeposito = fechaDeposito
        self.ecoPuntos = ecoPuntos
        self.fechaRegistro = fechaRegistro

    def comprobarCodigo(self, codigo):
        return False

class DepositosSinRegistrar:
    """ Clase SINGLETON que guarda las instancias de depositos que fueron realizadas pero no 
    se registraron a ningún usuario.

    Atributos:
        id (string): Identificador de la entidad.
        depositos (Deposito[], opcional): Arreglo donde se guardan los depositos no 
            registrados.
    """

    def __init__(self, id, depositos=[]):
        self.id = id
        self.depositos = depositos

class EcoPuntos:
    """ Representa un conjunto de ecopuntos, correspondiente a un depósito, los mismos 
    comparten una fecha de vencimiento.

    Atributos:
        id (string): Identificador de la entidad.
        fechaVencimiento (Date): fecha en la cual los ecopuntos vencen.
        cantidad (float): cantidad de ecopuntos que este conjunto representa.
        cantidadRestante (float): cantidad de ecopuntos de este conjunto que no han sido
            utilizados.

    Atributos de Clase:
        valorMonetario (ValorEcopuntos): Valor monetario de cada ecopunto.
        tiempoVencimiento (Time): Tiempo de vida de cada ecopunto, antes de vencerse.
    """

    valorMonetario = None
    tiempoVencimiento = None

    @classmethod
    def getEPData(cls):
        """ Recupera los datos del valor monetario y tiempo de vencimiento de los ecopuntos
        de la base de datos.

        Esta función debe llamarse al inicializarse el sistema (en el init de la clase
        EcoAsistente). Por precaución, también sería prudente llamarla cada vez que se
        instancia un nuevo EcoPunto.
        """
        try:
            # Acá se deberían buscar los datos en la base de datos, con algo así como
            # capaDatos.getEPData()
            # Mientras tanto, devuelvo valores por defecto
            cls.valorMonetario = 1
            cls.tiempoVencimiento = 60
        except:
            # En caso de no poderse traer los valores de la base de datos, se debería
            # alzar un error, o pedir al usuario que ingrese nuevos valores.
            # Mientras tanto, devuelvo valores por defecto
            cls.valorMonetario = 1
            cls.tiempoVencimiento = 60

    @classmethod
    def setEPData(cls):
        """ Actualiza los datos del valor monetario y tiempo de vencimiento de los ecopuntos
        en la base de datos.

        Esta función debe llamarse cada vez que el usuario desee modificar dichos datos.
        """
        pass

    def __init__(self, cantidad, cantidadRestante):
        self.cantidad = cantidad
        self.cantidadRestante = cantidadRestante
        self.fechaVencimiento = self.calcularFechaVenc()
        # Sería conveniente (pero no necesario) ejecutar la siguiente linea:
        # EcoPuntos.getEPdata()
        # A fin de proteger contra inconsistencias.
        # Pero debe evaluarse el impacto a la performance.

    def calcularFechaVenc(self):
        """Esta función calcula la fecha de vencimiento, utilizando la fecha actual, y el
        atributo de clase tiempoVencimiento.
        """
        # Algo así como
        # return fecha_actual + EcoPuntos.tiempoVencimiento
        return 0
        # Devuelvo 0 porque devolver None hace que el linter piense que hay un error

class PuntoDeposito:
    """ Representa uno de los puntos donde un ciudadano puede realizar un depósito de
    materiales.

    Atributos:
        id (string): Identificador de la entidad.
        direccion (string): Dirección física donde se encuentra el punto de depósito.
        estado (bool): Verdadero si el punto se encuentra activo y habilitado para su
            utilización, falso si se encuentra inactivo.
        nombre (string): Nombre del punto de depósito para identificación por parte del
            usuario.
        iDsMaterial (string[]): Arreglo con los identificadores de los materiales que el
            punto de deposito acepta.
        horarios (Horario[7]): Arreglo con los horarios en los que el punto de depósito está
            habilitado.
        fechaComienzoActividad (Date): Fecha en el que el punto de depósito fue puesto en
            funcionamiento por primera vez.
    """
    def __init__(self,id,direccion,estado,nombre,iDsMaterial=[],horarios=[],fechaComienzoActividad=None):
        self.id = id
        self.direccion = direccion
        self.estado = estado
        self.nombre = nombre
        self.iDsMaterial = iDsMaterial
        self.horarios = horarios
        self.fechaComienzoActividad = fechaComienzoActividad

class Horario:
    """ Representa una ventana de tiempo dentro de un día en la que un punto de depósito
    o retiro permanece abierto.

    Atributos:
        id (string): Identificador de la entidad.
        horaDesde (Time): Tiempo inicial de apertura.
        horaHasta (Time): Tiempo final de cierre.
        abierto (bool): ?
    """
    def __init__(self,id,horaDesde,horaHasta,abierto):
        self.id = id
        self.horaDesde = horaDesde
        self.horaHasta = horaHasta
        self.abierto = abierto

class Pedido:
    """ Representa un pedido de artículos realizado por un cliente.
    
    Atributos:
        id (string): Identificador de la entidad.
        fechaEncargo (Date): Fecha en la que el pedido fue realizado.
        fechaRetiro (Date): Fecha en la que el pedido puede ser retirado.
        articulos (CantArticulo[]): Conjunto de Articulos que posee el pedido.
        valorTotal (Float): Valor total del pedido, en pesos.
        valorPagoEcoPuntos (Float): Valor del pedido que fue abonado en forma de EcoPuntos.
        idPuntoRetiro (string): Identificador del punto de retiro donde podrá ser retirado el 
            pedido.
        estado (int): numero que identifica el estado en el que se encuentra el pedido.
    """
    def __init__(self,
                id, 
                fechaEncargo,
                fechaRetiro,
                articulos,
                valorTotal,
                valorPagoEcoPuntos,
                idPuntoRetiro,
                estado):
        self.id = id
        self.fechaEncargo = fechaEncargo
        self.fechaRetiro = fechaRetiro
        self.articulos = articulos
        self.valorTotal = valorTotal
        self.valorPagoEcoPuntos = valorPagoEcoPuntos
        self.idPuntoRetiro = idPuntoRetiro
        self.estado = estado


class PuntoRetiro:
    """ Representa una de las ubicaciones físicas donde los usuarios podrán retirar sus 
    pedidos.
    
    Atributos:
        id (string): Identificador de la entidad.
        direccion (string): Direccion física de la ubicación.
        nombre (string): Nombre de la ubicación para identificación por parte del usuario.
        estado (bool): Verdadero si el punto esta habilitado, falso sino.
        horarios (Horario[7]): Arreglo de horarios en los que permanece abierto el punto.
        stock (CantArticulo[]): Arreglo de articulos que se poseen en stock.
        demoraFija (Time): Cantidad de tiempo que tarda en prepararse un pedido.
    """
    def __init__(self,direccion,nombre,estado,horarios,demoraFija,stock=[]):
        self.id = id
        self.direccion = direccion
        self.nombre = nombre 
        self.estado = estado 
        self.horarios = horarios 
        self.demoraFija = demoraFija


class CantArticulo:
    """ Representa un conjunto de artículos del mismo tipo. Almacena el tipo y la cantidad.
    
    Atributos:
        id (string): Identificador de la entidad.
        cantidad (float): Cantidad del tipo de artículo presente en el conjunto, en la unidad
            de medida especificada por el mismo.
        idTipoArticulo (string): Identificador del tipo de artículo correspondiente.
        precioVenta (Currency): Precio de venta de los artículos al momento de ser empleados.
    """
    def __init__(self,id,cantidad,idTipoArticulo,precioVenta=0.0):
        self.id = id
        self.cantidad = cantidad
        self.idTipoArticulo = idTipoArticulo
        self.precioVenta = precioVenta

class TipoArticulo:
    """ Representa un tipo de artículo comprendido por el sistema. Los artículos son objetos
    generados a partir de materiales, con un costo de producción. 

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del tipo artículo para identificación por parte del usuario.
        materiales (CantMateriales[]): Arreglo de los materiales empleados en la producción del
            artículo.
        costoProducción (float): Costo de producción del artículo, separado de los costos de
            materiales.
        costoMateriales (float): Costo de los materiales empleados en la producción del 
            artículo.
        costoTotal (float): Costo total de manufactura del artículo. Resultado de la suma de
            costoProduccion y costoMateriales.
        margenGanancia (float): Valor que indica el porcentaje por sobre el costo total que
            compondrá el precio final.
        unidadMedida (float): Unidad en la que se mide la cantidad presente del artículo.
        stock (float): Cantidad del artículo presente en inventario.
    """
    def __init__(self,
                id,
                nombre,
                materiales,
                costoProduccion,
                costoMateriales,
                costoTotal,
                margenGanancia,
                unidadMedida):
        self.id = id
        self.nombre = nombre
        self.materiales = materiales
        self.costoProduccion = costoProduccion
        self.costoMateriales = costoMateriales
        self.costoTotal = costoTotal
        self.margenGanancia = margenGanancia
        self.unidadMedida = unidadMedida

class Valor:
    """ Representa un valor monetario de una entidad en un momento en particular. El objetivo
    de esta clase es registrar el historial de valores que una entidad adquiere a través del
    tiempo.

    Atributos:
        id (string): Identificador de la entidad.
        precio (float): Valor representado.
        fecha (Date): fecha asignada al valor.
    """
    def __init__(self,id,precio,fecha):
        self.id = id
        self.precio = precio
        self.fecha = fecha

class CantDemanda:
    """ Representa un conjunto de artículos del mismo tipo demandado por una entidad de
    destino. Almacena el tipo y la cantidad.
    
    Atributos:
        id (string): Identificador de la entidad.
        cantidad (float): Cantidad del tipo de artículo presente en el conjunto, en la unidad
            de medida especificada por el mismo.
        idTipoArticulo (string): Identificador del tipo de artículo correspondiente.
    """
    def __init__(self,id,cantidad,idTipoArticulo,precioVenta=0.0):
        self.id = id
        self.cantidad = cantidad
        self.idTipoArticulo = idTipoArticulo

class EntidadDestino:
    """ Representa una organización o sujeto que demanda artículos del sistema. Debe almacenar
    su demanda.
    
    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre para identificación por parte del usuario.
        demanda (CantDemanda[]): Arreglo de los artículos demandados por la entidad.
        salidas (SalidaStock[]): Arreglo de las salidas de stock destinadas a la entidad.
    """
    def __init__(self,id,nombre,demanda=[],salidas=[]):
        self.id = id
        self.nombre = nombre
        self.demanda = demanda
        self.salidas = salidas

class SalidaStock:
    """ Representa un conjunto de artículos que se saca del stock para entregar a una entidad
    de destino. 

    Atributos:
        id (string): Identificador de la entidad.
        concepto (string): Descripción de la transacción.
        articulos (CantArticulo): Artículos restados del stock en la transacción.
        fecha (Date): Fecha de la transacción.
    """
    def __init__(self,id,concepto,articulo,fecha):
        self.id = id
        self.concepto = concepto
        self.articulo = articulo
        self.fecha = fecha

class Material:
    """ Representa una material que puede ingresar a través de un depósito de usuarios, y ser
    tornado en artículos para su salida.

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del material para identificación por parte del usuario.
        unidadMedida (string): Unidad en la que se mide la cantidad del material.
        valor (Valor): Valor monetario asignado al material.
        costoObtencionAlternativa (Valor): Costo estimado de obtenciónd el material por medios
            alternativos a la recolección a partir de depósitos de ciudadanos.
        stock (float): Cantidad del material presente en inventario.
    """
    def __init__(self,id,nombre,unidadMedida,valor,costoObtencionAlternativa,stock):
        self.id = id
        self.nombre = nombre
        self.unidadMedida = unidadMedida
        self.valor = valor
        self.costoObtencionAlternativa = costoObtencionAlternativa
        self.stock = stock


class CantidadMaterial:
    """ Representa una cantidad de material mismo tipo. Almacena el material y la cantidad.
    
    Atributos:
        id (string): Identificador de la entidad.
        cantidad (float): Cantidad del material que se representa, en la unidad de medida 
            especificada por el mismo.
        idMaterial (string): Identificador del material correspondiente.
    """
    def __init__(self,id,cantidad,idMaterial):
        self.id = id
        self.cantidad = cantidad
        self.idMaterial = idMaterial
