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
from classes import *
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
                if (number).is_integer():
                    number = str(int(number)).replace('.', ',')
                else:
                    number = str(round(float(number),decimals)).replace('.', ',') 
                return number
        except Exception as e:
           raise custom_exceptions.ErrorDeConexion(origen="negocio.replace_dots()",
                                                   msj=str(e),
                                                   msj_adicional="Error formateando los \
                                                       números.")
    @classmethod
    def round_float(cls, number, decimals):
        """
        Redondea la cantidad de decimales del número recibido como parámetro, y reemplaza el 
        punto por una coma para denotarlos.
        """
        try:
            if decimals == 0:
                number = float(str(number).replace(',', '.'))
                return number
            else:
                number = round(float(str(number).replace(',', '.')),decimals)
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
                nivel.descuento = cls.replace_dots(nivel.descuento, 1)
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
        Obtiene el mínimo y el máximo nivel de la BD. Devuelve una lista de la forma: [min, max]
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
    def get_tabla_demandas(cls,id):
        """
        Obtiene todos los tipos articulo de la BD.
        """
        try:
            dems = Datos.get_tabla_demandas(id)
            return dems

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_tabla_demandas()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo la tabla de demandas de \
                                                         la capa de Datos.")

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
    
    @classmethod
    def get_nivel_id(cls, id):
        """
        Obtiene un nivel en base a su ID de la BD.
        """
        try:
            nivel = Datos.get_nivel_id(id)
            return nivel

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_nivel_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un nivel en base su ID de \
                                                         la capa de Datos.")
    
    @classmethod
    def get_nivel_nombre(cls, nombre):
        """
        Obtiene un nivel en base a su nombre de la BD.
        """
        try:
            nivel = Datos.get_nivel_nombre(nombre)
            return nivel

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_nivel_nombre()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un nivel en base su nombre de \
                                                         la capa de Datos.")


    @classmethod
    def get_one_entidad_destino(cls, id):
        """
        Obtiene una entidad de destino de la BD a partir de su id.
        """
        try:
            entidad = Datos.get_one_entidad_destino(id)
            return entidad

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_one_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo una entidad destino de \
                                                         la capa de Datos.")

    @classmethod
    def alta_nivel(cls, numeroNivel, descuento, minEcoPuntos, maxEcoPuntos):
        """
        Realiza las validaciones de negocio de un nivel, y si no hay errores, instancia el 
        nuevo nivel y llama al método de la Capa de Datos que lo registra en la BD.
        """
        try:
            #Reestructuración de los datos:
            max_nivel = int(cls.get_min_max_niveles()[1])
            maxDescuento = cls.round_float(Datos.get_max_descuento(), 2)
            maxEP = cls.round_float(Datos.get_max_ecoPuntos(),1)
            minEcoPuntos = int(cls.round_float(minEcoPuntos,0))
            maxEcoPuntos = int(cls.round_float(maxEcoPuntos,0))
            descuento = cls.round_float(descuento,2)
            
            #Validación de Reglas de Negocio:
            if int(numeroNivel) != int(max_nivel + 1):
                #Valida regla RN01
                return "Error al añadir el nivel. El número de nivel no es correcto."
            elif cls.round_float(minEcoPuntos,2) >= cls.round_float(maxEcoPuntos,2):
                #Valida regla RN02
                return "Error al añadir el nivel. El mínimo de EcoPuntos no puede ser menor al\
                        máximo de EcoPuntos del máximo nivel."
            elif descuento < maxDescuento:
                #Valida regla RN03
                return "Error al añadir el nivel. El descuento no puede ser menor al máximo \
                        descuento asignado (" + str(maxDescuento) + "%)."
            elif descuento < 0 or descuento > 100:
                #Valida regla RN04
                return "Error al añadir el nivel. El descuento debe estar entre 0% y 100%."
            elif minEcoPuntos != (int(cls.round_float(maxEP,0)) + 1):
                #Valida regla RN05
                return "Error al añadir nivel. El mínimo de EcoPuntos debe ser\
                     " + str(int(cls.round_float(maxEP,0))) + " EcoPuntos."
            else:
                nivel = Nivel(None, numeroNivel, minEcoPuntos, maxEcoPuntos, descuento)
                if Datos.alta_nivel(nivel):
                    return True
                else:
                    "Error al añadir nivel a la Base de Datos. Intente nuevamente más tarde."
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         dando de alta un nuevo nivel.")

    @classmethod
    def get_max_ecoPuntos(cls):
        """
        Obtiene el máximo de EcoPuntos asignados a un nivel.
        """
        try:
            return int(cls.replace_dots(Datos.get_max_ecoPuntos(),0))
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_max_ecoPuntos()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          obtieniendo el máximo de EcoPuntos \
                                                          del último nivel la capa de Datos.")

    @classmethod
    def get_max_descuento(cls):
        """
        Obtiene el máximo descuento asignado a un nivel.
        """
        try:
            return cls.replace_dots(Datos.get_max_descuento(),1)
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.get_max_descuento()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          obtieniendo el máximo descuento de \
                                                          la capa de Datos.")

    @classmethod
    def baja_nivel(cls, id):
        try:
            min_max_niveles = cls.get_min_max_niveles()
            min_nivel = min_max_niveles[0]
            max_nivel = min_max_niveles[1]
            nivel = cls.get_nivel_id(id)
            if nivel == False:
                return "Error 1 eliminando nivel de la Base de Datos. Intente nuevamente más tarde."
            else:
                if int(nivel.nombre) == 1:
                    #Valida regla RN09.
                    if int(max_nivel) == int(nivel.nombre):
                        return "Error al eliminar nivel. No se puede eliminar el nivel 1 si no existen otros niveles."
                    else:
                        nuevo_min = 0
                        if Datos.baja_nivel(nuevo_min, None, None, None, nivel):
                            return True
                        else:
                            return "Error eliminando nivel de la Base de Datos. Intente nuevamente más tarde."
                elif int(nivel.nombre) == max_nivel:
                    pass
                else:
                    #Valida regla RN05 y RN10
                    factor_mod =  (nivel.maximoEcoPuntos - nivel.minimoEcoPuntos + 1)/2
                    nuevo_max = round(nivel.minimoEcoPuntos + factor_mod,0) - 1
                    nuevo_min = round(nivel.maximoEcoPuntos - factor_mod,0) + 1
                    if Datos.baja_nivel(nuevo_min, int(nivel.nombre) + 1, nuevo_max, int(nivel.nombre)-1, nivel):
                        return True
                    else:
                        return "Error eliminando nivel de la Base de Datos. Intente nuevamente más tarde."

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="negocio.baja_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          dando de baja un nivel.")


