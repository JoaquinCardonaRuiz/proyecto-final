from data.data import Datos
from data.data_cant_material import DatosCantMaterial
from classes import Insumo
import custom_exceptions

class DatosInsumo(Datos):
    
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los insumos de la BD.
        """
        
        cls.abrir_conexion()
        try:
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
        cls.abrir_conexion()
        try:
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
        cls.abrir_conexion()
        try:
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
        cls.abrir_conexion()
        try:
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
