from data.data import Datos
from data.data_cant_material import DatosCantMaterial
from classes import Insumo
import custom_exceptions

class DatosInsumo(Datos):
    
    @classmethod
    def get_by_id(cls,id):
        """
        Obtiene un insumo de la BD en base a su id.
        """
        
        try:
            cls.abrir_conexion()
            sql = ("SELECT idInsumo, \
                           nombre, \
                           unidadMedida, \
                           cMateriales, \
                           cProduccion, \
                           cTotal, \
                           stock, \
                           otrosCostos, \
                           color \
                           FROM insumos WHERE estado!=\"eliminado\" and idInsumo={};").format(id)
            cls.cursor.execute(sql)
            i = cls.cursor.fetchone()
            materiales = DatosCantMaterial.get_from_Insid(i[0],noClose=True)
            insumo = Insumo(i[0],i[1],i[2],i[3],i[4],i[5],materiales,i[6],i[7],i[8])
            return insumo
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo un insumo desde la BD.")
        finally:
            cls.cerrar_conexion()





    @classmethod
    def get_all(cls,noFilter):
        """
        Obtiene todos los insumos de la BD.
        """
        try:
            cls.abrir_conexion()
            if noFilter == False:
                sql = ("SELECT idInsumo, \
                            nombre, \
                            unidadMedida, \
                            cMateriales, \
                            cProduccion, \
                            cTotal, \
                            stock, \
                            otrosCostos, \
                            color \
                            FROM insumos WHERE estado!=\"eliminado\";")
            else:
                sql = ("SELECT idInsumo, \
                            nombre, \
                            unidadMedida, \
                            cMateriales, \
                            cProduccion, \
                            cTotal, \
                            stock, \
                            otrosCostos, \
                            color \
                            FROM insumos;")
            cls.cursor.execute(sql)
            insumos_ = cls.cursor.fetchall()
            insumos = []
            for i in insumos_:
                materiales = DatosCantMaterial.get_from_Insid(i[0],noClose=True)
                insumo_ = Insumo(i[0],i[1],i[2],i[3],i[4],i[5],materiales,i[6],i[7],i[8])
                insumos.append(insumo_)
            return insumos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def add(cls,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color):
        """
        Agrega un articulo a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO insumos (nombre,unidadMedida,cMateriales,cProduccion,otrosCostos,cTotal,color,stock,estado) \
                   VALUES (\"{}\",\"{}\",{},{},{},{},\"{}\",0,\"disponible\");".format(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un insumo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def update(cls,idIns,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color):
        """
        Actualiza un insumo en la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE insumos SET nombre=\"{}\",unidadMedida=\"{}\",cMateriales={},cProduccion={},otrosCostos={},cTotal={},color=\"{}\",stock=0,estado=\"disponible\" WHERE idInsumo={};").format(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color,idIns)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.update()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un insumo en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def delete(cls, id):
        """
        Elimina un insumo de la BD a partir de su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE insumos SET estado = \"eliminado\" WHERE idInsumo={}".format(id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un insumo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_nombres_by_idMat(cls, idMat):
        """
        Obtiene los insumos de la BD con un idMat en su receta
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT nombre FROM insumos JOIN mat_ins USING(idInsumo) WHERE insumos.estado!=\"eliminado\" AND idMaterial={};").format(idMat)
            cls.cursor.execute(sql)
            nombres = cls.cursor.fetchall()
            if len(nombres) == 0:
                return []
            else:
                return list(nombres[0])
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_nombres_by_idMat()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            cls.cerrar_conexion()




    @classmethod
    def addStock(cls,idIns,cant):
        """
        Suma la cantidad especificada al stock de un insumo
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE insumos SET stock=stock+{} WHERE idInsumo={};").format(cant,idIns)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.addStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def removeStock(cls,idIns,cant):
        """
        Resta la cantidad especificada al stock de un insumo
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE insumos SET stock=stock-{} WHERE idInsumo={};").format(cant,idIns)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.removeStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()