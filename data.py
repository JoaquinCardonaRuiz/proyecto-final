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
from classes import *

#Clase que representa la capa de datos.
class Datos():
    """
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
            cls.db = MySQLdb.connect(host="sql10.freemysqlhosting.net",  # Host de la BD.
                        user="sql10359552",                              # Usuario de la BD
                        passwd="vyqs1VbikX",                             # Contraseña de la BD
                        db="sql10359552")                                # Nombre de la DB
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
    def get_articulos(cls,ids=[]):
        """
        Obtiene todos los articulos de la BD. Si se provee una lista de IDs, devuelve sólo 
        los tipos artículos que corresponden a los ids.

        Argumentos:
            ids (string[]): Listado de IDs para filtrar resultados.

        """
        
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM tiposArticulo;")
            
            #Si el parametro de ids no es vacío, se agrega el WHERE IN con el listado de ids
            if ids:
                sql = sql.replace(";"," ") + \
                "WHERE idTipoArticulo IN ({});".format(', '.join([str(i) for i in ids]))
            cls.cursor.execute(sql.format(*ids))
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                materiales = cls.get_cantmat(a[0],noClose=True)
                articulo_ = TipoArticulo(a[0],a[4],materiales,a[5],a[6],a[7],a[2],a[3],a[1])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        entidades destino desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_cantmat(cls, id, noClose=False):
        """
        Obtiene los materiales que componen un tipo articulo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT tiposArt_mat.cantidad,tiposArt_mat.idMaterial \
                    FROM tiposArt_mat \
                    INNER JOIN tiposArticulo \
                    USING(idTipoArticulo) \
                    WHERE idTipoArticulo = {};").format(id)
            cls.cursor.execute(sql)
            cantmats_ = cls.cursor.fetchall()
            cantmats = []
            for m in cantmats_:
                cantMat = CantMaterial(m[0],m[1])
                cantmats.append(cantMat)
            return cantmats
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        entidades destino desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def get_tabla_salidas(cls,id):
        """
        Obtiene la tabla de salidas a partir de un id de entidad de destino de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT idEntidad, idTipoArticulo, tiposArticulo.nombre, cantidadSalida,\
                    unidadMedida, fecha\
                    FROM salidasStock \
                    right join tiposArticulo using(idTipoArticulo) \
                    left join entidadesDestino using(idEntidad) \
                    WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            demandas_ = cls.cursor.fetchall()
            demandas = []
            for d in demandas_:
                demanda_ = {"nombre": d[2],
                            "cantidad": d[3], 
                            "unidadmedida": d[4], 
                            "fecha": str(d[5])} #TODO: formatear fecha bien
                demandas.append(demanda_)
            return demandas
        
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_tabla_salidas()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo la \
                                                        tabla de salidas desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_entidades_destino(cls):
        """
        Obtiene todas las entidades de destino de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM entidadesDestino;")
            cls.cursor.execute(sql)
            entidades_ = cls.cursor.fetchall()
            entidades = []
            for e in entidades_:
                demandas = cls.get_demandas(e[0],noClose = True)
                salidas = cls.get_salidas(e[0],noClose = True)
                entidad_ = EntidadDestino(e[0],e[1],demandas,salidas)
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
    def alta_entidad_destino(cls,nombre):
        """
        Da de alta una nueva entidad destino en el sistema.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO entidadesDestino (nombre) \
                    VALUES (\"{}\");".format(nombre))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta una \
                                                        entidad destino en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_one_entidad_destino(cls,id):
        """
        Obtiene una entidad de destino de la BD a partir de su id.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM entidadesDestino WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            e = cls.cursor.fetchall()[0]
            demandas = cls.get_demandas(e[0],noClose = True)
            salidas = cls.get_salidas(e[0],noClose = True)
            entidad = EntidadDestino(e[0],e[1],demandas,salidas)
            return entidad
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_one_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo una \
                                                        entidad destino desde la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def get_demandas(cls,id,noClose = False):
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM demanda WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            demandas = cls.cursor.fetchall()
            cantDemandas = []
            for d in demandas:
                demanda = CantDemanda(d[2],d[1])
                cantDemandas.append(demanda)
            return cantDemandas

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_demandas()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        demandas desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()

    @classmethod
    def get_salidas(cls,id,noClose = False):
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM salidasStock WHERE idEntidad = {};".format(id))
            cls.cursor.execute(sql)
            salidas = cls.cursor.fetchall()
            salidasStock = []
            for s in salidas:
                salida = SalidaStock(s[0],s[1],s[2],s[3],s[4])
                salidasStock.append(salida)
            return salidasStock

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_salidas()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo las \
                                                        salidas de stock desde la BD.")
        finally:
            if not(noClose):
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
        """Devuelve la mayor cantidad EcoPuntos solicitada para un nivel registrado en la 
        BD.
        """
        try:
            sql = ("select max(maxEcoPuntos) from niveles;")
            cls.cursor.execute(sql)
            maxEP = cls.cursor.fetchall()[0][0]
            return maxEP
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo de \
                                                        EcoPuntos de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def alta_nivel(cls, nivel):
        """Añade el nivel que recibe como parametro a la BD."""
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO niveles (nombre, minEcoPuntos, maxEcoPuntos, descuento) \
                    VALUES (%s, %s, %s, %s);")
            values = (nivel.nombre, nivel.minimoEcoPuntos, nivel.maximoEcoPuntos, nivel.descuento)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un \
                                                        nivel en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_nivel_id(cls, id):
        cls.abrir_conexion()
        """Obtiene un nivel de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("select * from niveles where idNivel = %s")
            values = (id,)
            cls.cursor.execute(sql, values)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                return False
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_id",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un nivel \
                                                        en base al id recibido como \
                                                        parámetro.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_nivel_nombre(cls, nombre):
        cls.abrir_conexion()
        """Obtiene un nivel de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("select * from niveles where nombre = %s")
            values = (str(nombre),)
            cls.cursor.execute(sql, values)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                return False
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_nombre",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un nivel \
                                                        en base al nombre recibido como \
                                                        parámetro.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def baja_nivel(cls, nuevo_min, nombre_min, nuevo_max, nombre_max, nivel):
        cls.abrir_conexion()
        """Elimina un nivel, y modifica el máximo de EcoPuntos del nivel anterior, y el máximo 
        de EcoPuntos del nivel siguiente.
        """
        try:
            if int(nivel.nombre) == 1:
                #Actualiza el mínimo del nivel siguiente, ya que no existe nivel anterior.
                sql = ("UPDATE niveles SET minEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_min, str(int(nivel.nombre) + 1))
                cls.cursor.execute(sql, values)
                
                #Elimina el nivel en base al ID recibido.
                sql = ("DELETE FROM niveles WHERE idNivel = %s")
                values = (str(nivel.id),)
                cls.cursor.execute(sql, values)

                #Disminuye en una unidad los nombres de los niveles posteriores.
                sql = ("UPDATE niveles SET nombre = nombre-1 WHERE nombre > %s;")
                values = (str(nivel.nombre))
                cls.cursor.execute(sql, values)

                cls.db.commit()


                return True

            else:
                #Actualiza mínimo del nivel siguiente.
                sql = ("UPDATE niveles SET minEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_min, str(nombre_min))
                cls.cursor.execute(sql, values)
                
                #Actualia máximo del nivel anterior.
                sql = ("UPDATE niveles SET maxEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_max, str(nombre_max))
                cls.cursor.execute(sql, values)

                #Elimina el nivel en base al ID recibido.
                sql = ("DELETE FROM niveles WHERE idNivel = %s")
                values = (str(nivel.id),)
                cls.cursor.execute(sql, values)

                #Disminuye en una unidad los nombres de los niveles posteriores.
                sql = ("UPDATE niveles SET nombre = nombre-1 WHERE nombre > %s;")
                values = (str(nivel.nombre))
                cls.cursor.execute(sql, values)
                
                cls.db.commit()

                return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.baja_nivel",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de baja un \
                                                    nivel de la BD.")
        finally:
            cls.cerrar_conexion()