from data.data import Datos
import custom_exceptions
from classes import EntidadDestino
from classes import CantDemanda
from classes import SalidaStock

class DatosEntidadDestino(Datos):
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