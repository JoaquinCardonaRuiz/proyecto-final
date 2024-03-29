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
    * Calcular el vencimiento de los depósitos.
"""

#Imports

import custom_exceptions
from custom_exceptions import *

''' 
USUARIOS
'''

class Usuario:
    """ Representa a los usuarios del sistema, tanto los administradores como los ciudadanos.

    Atributos:
        id (string): Identificador de la entidad.
        nroDoc (string): Número de documento del usuario.
        tipoDoc (TipoDocumento): Tipo de documento del usuario.
        nombre (string): Nombre de pila del usuario.
        apellido (string): Apellido o nombre de familia del usuario.
        password (string): Contrasena del usuario.
        IDTipoUsuario (string): Identificador de la instancia de TipoUsuario que corresponde
            a la entidad.
        direccion (Direccion): Dirección física del domicilio del usuario
        despositos (Deposito[]): Arreglo de depositos realizados por el usuario.
        pedidos (Pedidos[]): Arreglo de los pedidos realizados por el usuario.
        totalEcopuntos (int): Sumatoria de la cantidad de ecopuntos que el usuario posee.
        idNivel (string): Identificador del nivel que le corresponde al usuario.
        recomendacionesPlantas (Recomendacion[]): Arreglo de recomendaciones de plantas
            recibidas por el usuario.
        estimacionesCO2 (Estimacion[]): Arreglo de estimaciones de emision de CO2 recibidas por
            el usuario.
        estimacionesEnergia (Estimacion[]): Arreglo de estimaciones de consumo de energía
            recibidas por el usuario.
        img (String): ruta a imagen de perfil
        estado(String): representa el estado de un usuario respecto a su registro, o bien, a su estado en la BD.
    """

    def __init__(self, 
                id, 
                nroDoc, 
                tipoDoc, 
                nombre, 
                apellido, 
                password, 
                idTipoUsuario,
                direccion,
                depositos=[],
                pedidos=None,
                idNivel=None,
                recomendacionesPlantas=[],
                estimacionesCO2=[],
                estimacionesEnergia=[],
                email=None,
                img = "/static/img/avatar.png",
                estado = None):
        self.id = id
        self.nroDoc = nroDoc
        self.tipoDoc = tipoDoc
        self.nombre = nombre
        self.apellido = apellido
        self.password = password
        self.idTipoUsuario = idTipoUsuario
        self.direccion = direccion
        self.depositos = depositos
        self.pedidos = pedidos
        self.totalEcopuntos = 0
        self.idNivel = idNivel
        self.recomendacionesPlantas = recomendacionesPlantas
        self.estimacionesCO2 = estimacionesCO2
        self.estimacionesEnergia = estimacionesEnergia
        self.email = email
        self.img = img
        self.estado = estado

    def comprobarVencimientoDepositos(self,):
        """ """
    
    def calcularTotalEcopuntos(self):
        """ 
        Calcula los EcoPuntos del Usuario en base a sus depositos
        """
        self.totalEcopuntos = 0
        for dep in self.depositos:
            ep = dep.ecoPuntos
            self.totalEcopuntos += ep.cantidadRestante


    def calcularNivel(self,):
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
        nombre(string): Identifica el número del nivel.
        minimoEcoPuntos (float): Mínima cantidad de ecopuntos necesaria para alcanzar el nivel.
        maximoEcoPuntos (float): Máxima cantidad de ecopuntos que el nivel comprende.
        descuento (float): Descuento aplicado a los pedidos para los usuarios que alcanzaron el
            nivel. Expresado como número entre 0 y 1.
        multiplicador (float, calculated): equivalente a 1-descuento, utilizado para
            multiplicar el precio del pedido.
    """

    def __init__(self,id,nombre,minimoEcoPuntos,maximoEcoPuntos,descuento):
        self.id = id
        self.nombre = nombre
        self.minimoEcoPuntos = minimoEcoPuntos
        self.maximoEcoPuntos = maximoEcoPuntos
        self.set_descuento(descuento)

    def set_descuento(self,descuento):
        """Actualiza el valor de descuento del nivel"""
        self.descuento = descuento
        self.multiplicador = 1-descuento

    def set_ecopuntos(self,minimoEcoPuntos,maximoEcoPuntos):
        if minimoEcoPuntos > maximoEcoPuntos: 
            raise ErrorReglaDeNegocio(origen="Nivel.set_ecopuntos",msj_adicional="El valor de\
                la cantidad máxima de ecopuntos debe ser mayor al valor de la cantidad mínima\
                de ecopuntos.")

        elif minimoEcoPuntos < 0 or maximoEcoPuntos < 0:
            raise ErrorReglaDeNegocio(origen="Nivel.set_ecopuntos",msj_adicional="El valor de\
                las cantidades mínimas y máximas de ecopuntos debe ser mayor o igual a 0.")

        else:
            self.minimoEcoPuntos = minimoEcoPuntos
            self.maximoEcoPuntos = maximoEcoPuntos

class TipoDocumento:
    """ Contiene la información de los distintos posibles tipos de documento que un usuario
    puede poseer.

    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del tipo de documento, para identificación por parte del
            usuario.
        estado (bool): Vale True si está habilitado para registrar nuevos usuarios
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


'''
RECOMENDACIONES
'''

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


'''
MATERIALES
'''

class Material:
    """ Representa una material que puede ingresar a través de un depósito de usuarios, y ser
    tornado en artículos para su salida.
    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del material para identificación por parte del usuario.
        unidadMedida (string): Unidad en la que se mide la cantidad del material.
        costoRecoleccion (float): Costo asociado a la recoleccion del material.
        stock (float): Cantidad del material presente en inventario.
        color(string): Código hexadecimal del color con que se muestra un material.
        estado(string): Indica si los depositos del material estan habilitados
        desc(string): Descripción del material.
    """
    def __init__(self,id,nombre,unidadMedida,costoRecoleccion,stock, color,estado="habilitado",desc=""):
        self.id = id
        self.nombre = nombre
        self.unidadMedida = unidadMedida
        self.costoRecoleccion = costoRecoleccion
        self.stock = stock
        self.color = color
        self.estado = estado
        self.desc = desc

class CantMaterial:
    """ Representa una cantidad de material mismo tipo. Almacena el material y la cantidad.
    
    Atributos:
        cantidad (float): Cantidad del material que se representa, en la unidad de medida 
            especificada por el mismo.
        idMaterial (string): Identificador del material correspondiente.
        estado (String, opcional): en el caso de una producción, puede tomar el valor 'deshabilitado' para
            indicar que el material fue eliminado
    """
    def __init__(self,cantidad,idMaterial,estado="disponible"):
        self.cantidad = cantidad
        self.idMaterial = idMaterial
        self.estado=estado

class EntradaStock:
    """
    Representa una entrada de materiales por otro medio que no sea un deposito

    Atributos:
        id (string): identificador de la entidad
        material (CantMaterial): material involucrado en la entrada
        fecha (Date): fecha de la entrada
        concepto (string): motivo por el que se produce la entrada
    """
    def __init__(self,id,material,fecha,concepto):
        self.id = id
        self.material = material
        self.fecha = fecha
        self.concepto = concepto

'''
ARTICULOS
'''

class TipoArticulo:
    """ Representa un tipo de artículo comprendido por el sistema. Los artículos son objetos
    generados a partir de materiales, con un costo de producción. 
    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre del tipo artículo para identificación por parte del usuario.
        insumos (CantInsumos[]): Arreglo de los materiales empleados en la producción del
            artículo.
        costoProducción (float): Costo de producción del artículo, separado de los costos de
            materiales.
        costoInsumos (float): Costo de los materiales empleados en la producción del 
            artículo.
        costoTotal (float): Costo total de manufactura del artículo. Resultado de la suma de
            costoProduccion y costoMateriales.
        valor (Valor): Valor de venta del articulo.
        margenGanancia (float): Valor que indica el porcentaje por sobre el costo total que
            compondrá el precio final.
        unidadMedida (float): Unidad en la que se mide la cantidad presente del artículo.
        stock (float): Cantidad del artículo presente en inventario.
        costoObtencionAlternativa (float): Costo estimado de obtención del artículo por medios
            alternativos a la producción a partir de depósitos de ciudadanos.
        otrosCostos (float): costos miscelaneos adicionales
        imagen (string): url de imagen del articulo
        ventaUsuario (bool): verdadero si el articulo se vende a usuarios, falso si no
        desc (string): descripción del tipo de artículo.
    """
    def __init__(self,
                id,
                nombre,
                insumos,
                costoProduccion,
                costoInsumos,
                costoTotal,
                valor,
                margenGanancia,
                unidadMedida,
                costoObtencionAlternativa,
                stock,
                otrosCostos,
                imagen,
                ventaUsuario,
                desc):
        self.id = id
        self.nombre = nombre
        self.insumos = insumos
        self.costoProduccion = costoProduccion
        self.costoInsumos = costoInsumos
        self.costoTotal = costoTotal
        self.valor = valor
        self.margenGanancia = margenGanancia
        self.unidadMedida = unidadMedida
        self.costoObtencionAlternativa = costoObtencionAlternativa
        self.stock = stock
        self.otrosCostos = otrosCostos
        self.imagen = imagen
        self.ventaUsuario = ventaUsuario
        self.desc = desc

class CantArticulo:
    """ Representa un conjunto de artículos del mismo tipo. Almacena el tipo y la cantidad.
    
    Atributos:
        cantidad (float): Cantidad del tipo de artículo presente en el conjunto, en la unidad
            de medida especificada por el mismo.
        idTipoArticulo (string): Identificador del tipo de artículo correspondiente.
        precioVenta (Currency): Precio de venta de los artículos al momento de ser empleados.
    """
    def __init__(self,cantidad,idTipoArticulo,precioVenta=0.0):
        self.cantidad = cantidad
        self.idTipoArticulo = idTipoArticulo
        self.precioVenta = precioVenta

class ProduccionArticulo:
    """
    Representa la produccion de un lote de articulos
    Atributos:
        id (string): identificador de la entidad
        articulos (CantArticulos): articulos involucrados
        fecha (Date): fecha de produccion
    """
    def __init__(self,id,articulos,fecha,receta=None):
        self.id = id
        self.articulos = articulos
        self.fecha = fecha
        self.receta = receta

class SalidaStockMunicipalidad:
    """
    Representa una salida de stock de articulos para uso de la municipalidad
    Atributos:
        id (string): Identificador de la entidad
        articulos (CantArticulo): Articulos involucrados
        fecha (Date): fecha y hora de salida
    """
    def __init__(self,id,articulos,fecha):
        self.id = id
        self.articulos=articulos
        self.fecha=fecha

'''
INSUMOS
'''

class Insumo:
    """
    Representa un Insumo utilizado en la producción de articulos
    Atributos:
        id (String): identificador de la entidad
        nombre (String): nombre del insumo
        unidadMedida (String): unidad de medida para el insumo
        costoMateriales (float): costo de los materiales asociados a la produccion
        costoProduccion (float): costo asociado a la produccion
        costoTotal (float): costo total del insumo
        materiales (CantMaterial []): materiales necesarios para su produccion
        stock (float): existencias del insumo
        color (string): color que representa al insumo
        otrosCostos (float): costos miscelaneos adicionales
        desc (string): descripción del insumo
    """
    def __init__(self,
                 id,
                 nombre,
                 unidadMedida,
                 costoMateriales,
                 costoProduccion,
                 costoTotal,
                 materiales,
                 stock,
                 otrosCostos,
                 color,
                 desc):
        self.id = id
        self.nombre = nombre
        self.unidadMedida = unidadMedida
        self.costoMateriales = costoMateriales
        self.costoProduccion = costoProduccion
        self.costoTotal = costoTotal
        self.materiales = materiales
        self.stock = stock
        self.otrosCostos = otrosCostos
        self.color = color
        self.desc = desc

class CantInsumo:
    """
    Representa una cantidad de insumos
    Atributos:
        cantidad(float): cantidad del insumo asociado
        idInsumo (string): identificador del insumo asociado
    """
    def __init__(self,cantidad,idInsumo):
        self.cantidad = cantidad
        self.idInsumo = idInsumo

class ProduccionInsumo:
    """
    Representa la produccion de un lote de insumos
    Atributos:
        id (string): identificador de la entidad
        insumos (CantInsumo): insumos involucrados
        fecha (Date): fecha de produccion
    """
    def __init__(self,id,insumos,fecha,receta=None):
        self.id = id
        self.insumos = insumos
        self.fecha = fecha
        self.receta = receta


'''
DEPOSITOS Y VENTA
'''

class Deposito:
    """ Representa un deposito de materiales realizado por un usuario en uno de los puntos de
    depósito.
    Atributos:
        id (string): Identificador de la entidad.
        codigo (string): Código ingresado por el usuario para registrar el depósito a su nombre.
        material (CantMaterial): Entidad de CantMaterial que registra el tipo de material
            y la cantidad del mismo depositado.
        idPuntoDeposito (string): Identificador del punto de depósito en el que el depósito fue
            realizado.
        ecoPuntos (EcoPuntos, optional): Entidad de EcoPuntos que guarda los puntos que le son 
            asignados al usuario al registrar el depósito. 
        fechaRegistro (Date, optional): Fecha en la que el depósito fue registrado por el usuario.
        fechaDeposito (Date): Fecha en la que el depósito fue realizado.
        estado (String): Estado de la entidad
    """
    def __init__(self, id, codigo, material, idPuntoDeposito, fechaDeposito, ecoPuntos=None, fechaRegistro=None, estado=""):
        self.id = id
        self.codigo = codigo
        self.material = material
        self.idPuntoDeposito = idPuntoDeposito
        self.fechaDeposito = fechaDeposito
        self.ecoPuntos = ecoPuntos
        self.fechaRegistro = fechaRegistro
        self.estado = estado

    def isAcreditado(self):
        return bool(self.fechaRegistro)

class EcoPuntos:
    """ Representa un conjunto de ecopuntos, correspondiente a un depósito, los mismos 
    comparten una fecha de vencimiento.
    Atributos:
        id (string): Identificador de la entidad.
        cantidad (float): cantidad de ecopuntos que este conjunto representa.
        cantidadRestante (float): cantidad de ecopuntos de este conjunto que no han sido
            utilizados.
    Atributos de Clase:
        valorMonetario (ValorEcopuntos): Valor monetario de cada ecopunto.
        tiempoVencimiento (Time): Tiempo de vida de cada ecopunto, antes de vencerse.
    """

    valorMonetario = None

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

    def __init__(self, id,cantidad, cantidadRestante):
        self.id = id
        self.cantidad = cantidad
        self.cantidadRestante = cantidadRestante
        # Sería conveniente (pero no necesario) ejecutar la siguiente linea:
        # EcoPuntos.getEPdata()
        # A fin de proteger contra inconsistencias.


'''
PUNTOS DEPOSITO Y RETIRO
'''

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
    """
    def __init__(self,id,direccion,estado,nombre,iDsMaterial=[],horarios=[]):
        self.id = id
        self.direccion = direccion
        self.estado = estado
        self.nombre = nombre
        self.iDsMaterial = iDsMaterial
        self.horarios = horarios

class PuntoRetiro:
    """ Representa una de las ubicaciones físicas donde los usuarios podrán retirar sus 
    pedidos.
    
    Atributos:
        id (string): Identificador de la entidad.
        direccion (string): Direccion física de la ubicación.
        nombre (string): Nombre de la ubicación para identificación por parte del usuario.
        estado (bool): Verdadero si el punto esta habilitado, falso sino.
        horarios (Horario[7]): Arreglo de horarios en los que permanece abierto el punto.
        demoraFija (Time): Cantidad de tiempo que tarda en prepararse un pedido.
    """

    def __init__(self,id,direccion,nombre,estadoEliminacion,horarios,demoraFija,estado):
        self.id = id
        self.direccion = direccion
        self.nombre = nombre 
        self.estado = estado 
        self.horarios = horarios 
        self.demoraFija = demoraFija
        self.estado = estado

class Pedido:
    """ Representa un pedido de artículos realizado por un cliente.
    
    Atributos:
        id (string): Identificador de la entidad.
        fechaEncargo (Date): Fecha en la que el pedido fue realizado.
        fechaRetiro (Date): Fecha en la que el pedido puede ser retirado.
        articulos (CantArticulo []): Conjunto de Articulos que posee el pedido.
        totalARS (Float): Valor del pedido que fue pagado en pesos.
        totalEP (Float): Valor del pedido que fue abonado en forma de EcoPuntos.
        idPuntoRetiro (string): Identificador del punto de retiro donde podrá ser retirado el 
            pedido.
        estado (int): numero que identifica el estado en el que se encuentra el pedido.
    """
    def __init__(self,
                id, 
                fechaEncargo,
                fechaRetiro,
                articulos,
                totalARS,
                totalEP,
                idPuntoRetiro,
                estado):
        self.id = id
        self.fechaEncargo = fechaEncargo
        self.fechaRetiro = fechaRetiro
        self.articulos = articulos
        self.totalARS = totalARS
        self.totalEP = totalEP
        self.idPuntoRetiro = idPuntoRetiro
        self.estado = estado


'''
ENTIDADES DESTINO
'''

class EntidadDestino:
    """ Representa una organización o sujeto que demanda artículos del sistema. Debe almacenar
    su demanda.
    
    Atributos:
        id (string): Identificador de la entidad.
        nombre (string): Nombre para identificación por parte del usuario.
        salidas (SalidaStock[]): Arreglo de las salidas de stock destinadas a la entidad.
    """
    def __init__(self,id,nombre,estado,salidas=[],desc=""):
        self.id = id
        self.nombre = nombre
        self.estado = estado
        self.salidas = salidas
        self.desc = desc

class SalidaStock:
    """ Representa un artículo que se saca del stock para entregar a una entidad de destino. 

    Atributos:
        id (string): Identificador de la entidad.
        articulos (CantArticulo): Lote de articulos que representa.
        fecha (Date): Fecha de la transacción.
        valorTotal (float): Valor al que se realizó la salida
        concepto (string): Motivo por el cual se produce la salida.
    """
    def __init__(self,id,articulos,fecha,valorTotal,concepto):
        self.id = id
        self.articulos = articulos
        self.fecha = fecha
        self.valorTotal = valorTotal
        self.concepto = concepto


'''
OTROS
'''

class Horario:
    """ Representa una ventana de tiempo dentro de un día en la que un punto de depósito
    o retiro permanece abierto.

    Atributos:
        id (string): Identificador de la entidad.
        horaDesde (Time): Tiempo inicial de apertura.
        horaHasta (Time): Tiempo final de cierre.
        dia (string): Día al que corresponde el horario.
    """
    def __init__(self,id,horaDesde,horaHasta,dia):
        self.id = id
        self.horaDesde = horaDesde
        self.horaHasta = horaHasta
        self.dia = dia
    
    def formato_horaDesde(self):
        if self.horaDesde == False:
            return False
        else:
            return self.horaDesde[:-3]

    def formato_horaHasta(self):
        if self.horaHasta == False:
            return False
        else:
            return self.horaHasta[:-3]


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


class Direccion:
    """
    Representa una dirección geográfica para localizar un punto de deposito, retiro, o una entidad de destino

    Atributos:
        id (string): Identificador de la entidad
        calle (string): Nombre de la calle
        altura (string): Numero de la dirección
        ciudad (string): Ciudad donde se encuentra la dirección
        provincia (string): Provincia '' ''        '' ''
        pais (string): Pais           '' ''        '' ''
    """
    def __init__(self,id,calle,altura,ciudad,provincia,pais):
        self.id = id
        self.calle = calle
        self.altura = altura
        self.ciudad = ciudad
        self.provincia = provincia
        self.pais = pais