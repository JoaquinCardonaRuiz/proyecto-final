from data.data import Datos
from classes import CantMaterial
import custom_exceptions

class DatosCantMaterial(Datos):
    @classmethod
    def get_from_Insid(cls, id, noClose=False):
        """
        Obtiene los materiales que componen un insumo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT mat_ins.cantidad,mat_ins.idMaterial \
                    FROM mat_ins \
                    WHERE idInsumo = {};").format(id)
            cls.cursor.execute(sql)
            cantmats_ = cls.cursor.fetchall()
            cantmats = []
            for m in cantmats_:
                cantmat =  CantMaterial(m[0],m[1])
                cantmats.append(cantmat)
            return cantmats
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.get_from_Insid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def addComponente(cls,idMat,idIns,cant):
        """
        Registra una cantidad de un material requerido para la produccion de un insumo.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO mat_ins (idMaterial, idInsumo, cantidad, estado) \
                    VALUES ({},{},{},\"{}\");".format(idMat,idIns,cant,"disponible"))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.addComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando un material componente de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def updateComponente(cls,idMat,idIns,cant):
        """
        Actualiza una cantidad de un material requerido para la produccion de un insumo.
        """
        cls.abrir_conexion()
        try:
            sql = ("UPDATE mat_ins SET cantidad={} WHERE idMaterial={} AND idInsumo={};".format(cant,idMat,idIns))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.updateComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un material componente de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def deleteComponente(cls,idMat,idIns):
        """
        Actualiza una cantidad de un material requerido para la produccion de un insumo.
        """
        cls.abrir_conexion()
        try:
            sql = ("DELETE FROM mat_ins WHERE idMaterial={} AND idInsumo={};".format(idMat,idIns))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.deleteComponente()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un material componente de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()

            
    @classmethod
    def deshabilitar(cls,idMat,noClose=False):
        """
        Deshabilita todos los elementos de la receta de un insumo que correspondan a un id material.
        Se llama cuando se elimina un material.
        """
        cls.abrir_conexion()
        try:
            sql= ("UPDATE mat_ins SET estado=\"deshabilitado\" WHERE idMaterial={};").format(idMat)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_cant_material.deshabilitar()",
                                                    msj=str(e),
                                                    msj_adicional="Error deshabilitando un componente de un insumo en la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
