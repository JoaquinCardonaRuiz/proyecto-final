from data.data import Datos
from classes import CantInsumo
import custom_exceptions

from data.data import Datos
from classes import CantInsumo
import custom_exceptions

class DatosCantInsumo(Datos):
    @classmethod
    def get_from_TAid(cls, id, noClose=False):
        """
        Obtiene los insumos que componen un tipo articulo de la BD
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT tiposArt_ins.cantidad,tiposArt_ins.idInsumo \
                    FROM tiposArt_ins \
                    INNER JOIN tiposArticulo \
                    USING(idTipoArticulo) \
                    WHERE idTipoArticulo = {};").format(id)
            cls.cursor.execute(sql)
            cantins_ = cls.cursor.fetchall()
            cantins = []
            for i in cantins_:
                cantIns = CantInsumo(i[0],i[1]) 
                cantins.append(cantIns)
            return cantins
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_insumo.get_from_TAid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def addComponente(cls,idIns,idArt,cant):
        """
        Registra una cantidad de un insumo requerido para la produccion de un tipo articulo.
        """
        try:
            cls.abrir_conexion()
            sql = ("INSERT INTO tiposArt_ins (idInsumo, idTipoArticulo, cantidad, estado) \
                    VALUES ({},{},{},\"{}\");".format(idIns,idArt,cant,"disponible"))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_insumo.addComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando un insumo componente de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def updateComponente(cls,idIns,idArt,cant):
        """
        Actualiza una cantidad de un insumo requerido para la produccion de un tipo articulo.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE tiposArt_ins SET cantidad={} WHERE idInsumo={} AND idTipoArticulo={};".format(cant,idIns,idArt))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_insumo.updateComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un insumo componente de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def deleteComponente(cls,idIns,idArt):
        """
        Elimina una cantidad de un insumo requerido para la produccion de un articulo.
        """
        try:
            cls.abrir_conexion()
            sql = ("DELETE FROM tiposArt_ins WHERE idInsumo={} AND idTipoArticulo={};".format(idIns,idArt))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_insumo.deleteComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un insumo componente de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()