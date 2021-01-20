from data.data import Datos
import custom_exceptions
from classes import CantDemanda

class DatosDemanda(Datos):
    
    @classmethod
    def get_demandas_by_entidad(cls,id,noClose = False):
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
    def delete(cls,idEnt,idArt):
        """
        Elimina una demanda de la BD a partir de un idEntidad y un idArticulo
        """
        cls.abrir_conexion()
        try:
            sql = ("DELETE FROM demanda WHERE idEntidad={} AND idTipoArticulo={}".format(idEnt,idArt))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_demanda.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando una demanda en la BD.")
        finally:
            cls.cerrar_conexion()
        
    @classmethod
    def add(cls, idEnt, idArt, cantidad):
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO demanda (idEntidad, idTipoArticulo,cantidad) VALUES ({},{},{})".format(idEnt,idArt,cantidad))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_demanda.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando una demanda en la BD.")

    @classmethod
    def check_repeat(cls,idEnt,idArt):
        """
        Comprueba si no existe ninguna demanda de la misma ED al mismo articulo
        """

        cls.abrir_conexion()
        try:
            sql = ("SELECT COUNT(idEntidad) FROM demanda WHERE idEntidad={} AND idTipoArticulo={};".format(idEnt,idArt))
            cls.cursor.execute(sql)
            count = cls.cursor.fetchall()[0][0]
            print(count)
            if count == 0:
                return True
            else:
                return False
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_demanda.check_repeats()",
                                                    msj=str(e),
                                                    msj_adicional="Error comprobando repeticiones de demandas en la BD.")
        finally:
            cls.cerrar_conexion()