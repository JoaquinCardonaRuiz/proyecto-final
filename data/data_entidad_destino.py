from data.data import Datos
from data.data_demanda import DatosDemanda
from data.data_salida_stock import DatosSalidaStock
import custom_exceptions
from classes import EntidadDestino, CantDemanda, SalidaStock


class DatosEntidadDestino(Datos):

    @classmethod
    def get_all(cls):
        """
        Obtiene todas las entidades de destino de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM entidadesDestino WHERE entidadesDestino.estado != \"eliminado\";")
            cls.cursor.execute(sql)
            entidades_ = cls.cursor.fetchall()
            entidades = []
            for e in entidades_:
                demandas =  DatosDemanda.get_demandas_by_entidad(e[0],noClose = True)
                salidas =   DatosSalidaStock.get_salidas_by_entidad(e[0],noClose = True)
                entidad_ =  EntidadDestino(e[0],e[1],e[2],demandas,salidas)
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
    def add(cls,nombre):
        """
        Da de alta una nueva entidad destino en el sistema.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO entidadesDestino (nombre, estado) \
                    VALUES (\"{}\",\"{}\");".format(nombre,"disponible"))
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
    def get_one(cls,id):
        """
        Obtiene una entidad de destino de la BD a partir de su id.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT * FROM entidadesDestino WHERE idEntidad = {} AND estado != \"eliminado\";".format(id))
            cls.cursor.execute(sql)
            e = cls.cursor.fetchall()[0]
            demandas =  DatosDemanda.get_demandas_by_entidad(e[0],noClose = True)
            salidas =   DatosSalidaStock.get_salidas_by_entidad(e[0],noClose = True)
            entidad = EntidadDestino(e[0],e[1],e[2],demandas,salidas)
            return entidad
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_one_entidad_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo una entidad destino desde la BD.")
        finally:
            cls.cerrar_conexion()

    
    @classmethod
    def delete(cls, id):
        """
        Elimina una entidad de destino de la BD a partir de su id.
        """

        cls.abrir_conexion()
        try:
            sql = ("UPDATE entidadesDestino SET estado = \"eliminado\" WHERE idEntidad={}".format(id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_entidad_destino.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando una entidad destino en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def update(cls,id,nombre):
        """
        Actualiza el nombre de una entidad de destino en la BD
        """

        cls.abrir_conexion()
        try:
            sql = ("UPDATE entidadesDestino SET nombre = \"{}\" WHERE idEntidad={}".format(nombre,id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_entidad_destino.update()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando una entidad destino en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def check_name_repeats(cls,nombre):
        """
        Comprueba si no existe ninguna entidad destino con un nombre dado
        """

        cls.abrir_conexion()
        try:
            sql = ("SELECT COUNT(idEntidad) FROM entidadesDestino WHERE nombre=\"{}\" And estado!=\"eliminado\";".format(nombre))
            cls.cursor.execute(sql)
            count = cls.cursor.fetchall()[0][0]
            if count == 0:
                return True
            else:
                return False
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_entidad_destino.check_name_repeats()",
                                                    msj=str(e),
                                                    msj_adicional="Error comprobando repeticiones de nombres de entidad destino en la BD.")
        finally:
            cls.cerrar_conexion()
