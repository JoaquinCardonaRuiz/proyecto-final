from data.data import Datos
from data.data_cant_insumo import DatosCantInsumo
from data.data_valor import DatosValor
import custom_exceptions
from classes import TipoArticulo

class DatosArticulo(Datos):
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los articulos de la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           cProduccion, \
                           cInsumos, \
                           cTotal, \
                           margenGanancia, \
                           unidadMedida, \
                           cObtencionAlt, \
                           stock, \
                           otrosCostos, \
                           img, \
                           vUsuario, \
                           descripcion \
                           FROM tiposArticulo WHERE estado!=\"eliminado\";")
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                insumos = DatosCantInsumo.get_from_TAid(a[0])
                valor = DatosValor.get_from_TAid(a[0])[2]
                articulo_ = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],valor,a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los articulos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_by_id(cls, id, noClose = False):
        """Obtiene un articulo de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           cProduccion, \
                           cInsumos, \
                           cTotal, \
                           margenGanancia, \
                           unidadMedida, \
                           cObtencionAlt, \
                           stock, \
                           otrosCostos, \
                           img, \
                           vUsuario, \
                           descripcion \
                           FROM tiposArticulo WHERE idTipoArticulo = {} and estado!=\"eliminado\";").format(id)
            cls.cursor.execute(sql)
            a = cls.cursor.fetchone()
            if a == None:
                return False
            else:
                insumos = DatosCantInsumo.get_from_TAid(a[0])
                valor = DatosValor.get_from_TAid(a[0])[2]
                articulo = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],valor,a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12])
                return articulo
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un articulo en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_by_not_in_id_array(cls,ids):
        """
        Obtiene todos los articulos de la BD que no están en la lista de ids.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           cProduccion, \
                           cInsumos, \
                           cTotal, \
                           margenGanancia, \
                           unidadMedida, \
                           cObtencionAlt, \
                           stock, \
                           otrosCostos, \
                           img, \
                           vUsuario, \
                           descripcion \
                           FROM tiposArticulo WHERE estado!=\"eliminado\"")
            if ids != []:
                sql += " AND idTipoArticulo!={}"
                for _ in ids[1:]:
                    sql += " AND idTipoArticulo!={}"
            sql += ";"
            sql = sql.format(*ids)
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                insumos = DatosCantInsumo.get_from_TAid(a[0])
                valor = DatosValor.get_from_TAid(a[0])[2]
                articulo_ = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],valor,a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_not_in_id_array()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo articulos desde la BD.")
        finally:
            cls.cerrar_conexion()

    


    @classmethod
    def get_by_not_in_id_array_user(cls,ids,limit=0):
        """
        Obtiene todos los articulos de la BD que no están en la lista de ids.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idTipoArticulo, \
                           nombre, \
                           cProduccion, \
                           cInsumos, \
                           cTotal, \
                           margenGanancia, \
                           unidadMedida, \
                           cObtencionAlt, \
                           stock, \
                           otrosCostos, \
                           img, \
                           vUsuario, \
                           descripcion \
                           FROM tiposArticulo WHERE estado!=\"eliminado\" AND vUsuario=1 and stock>0")
            if ids != []:
                sql += " AND idTipoArticulo!={}"
                for _ in ids[1:]:
                    sql += " AND idTipoArticulo!={}"
            sql += " ORDER BY RAND()"
            if limit > 0:
                sql += " LIMIT {}".format(limit)
            sql += ";"
            sql = sql.format(*ids)
            print(sql)
            cls.cursor.execute(sql)
            articulos_ = cls.cursor.fetchall()
            articulos = []
            for a in articulos_:
                insumos = DatosCantInsumo.get_from_TAid(a[0])
                valor = DatosValor.get_from_TAid(a[0])[2]
                articulo_ = TipoArticulo(a[0],a[1],insumos,a[2],a[3],a[4],valor,a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12])
                articulos.append(articulo_)
            return articulos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_by_not_in_id_array()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo articulos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def add(cls,nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,costoTotal,desc):
        """
        Agrega un articulo a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO tiposArticulo (nombre,unidadMedida,img,vUsuario,cInsumos,cProduccion,otrosCostos,cObtencionAlt,cTotal,margenGanancia,stock,estado,descripcion) \
                   VALUES (\"{}\",\"{}\",\"\",{},{},{},{},{},{},{},0,\"disponible\",\"{}\");".format(nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,costoTotal,margen,desc))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un articulo en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def delete(cls, id):
        """
        Elimina un artículo de la BD a partir de su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE tiposArticulo SET estado = \"eliminado\" WHERE idTipoArticulo={}".format(id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un articulo en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def update(cls,idArt,nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,costoTotal):
        """
        Actualiza un articulo en la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE tiposArticulo SET nombre=\"{}\",unidadMedida=\"{}\",vUsuario={},cInsumos={},cProduccion={},otrosCostos={},cObtencionAlt={},cTotal={},margenGanancia={} WHERE idTipoArticulo={};").format(nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,costoTotal,margen,idArt)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.update()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un articulo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def updateStock(cls,idTA,cant):
        """
        Actualiza el stock de un tipo articulo a la cantidad especificada
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE tiposArticulo SET stock={} WHERE idTipoArticulo={};").format(cant,idTA)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.updateStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_nombres_by_idIns(cls, idIns):
        """
        Obtiene los articulos de la BD con un idArt en su receta
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT nombre FROM tiposArticulo JOIN tiposArt_ins USING(idTipoArticulo) WHERE tiposArticulo.estado!=\"eliminado\" AND idInsumo={};").format(idIns)
            cls.cursor.execute(sql)
            nombres = cls.cursor.fetchall()
            if len(nombres) == 0:
                return []
            else:
                return list(nombres[0])
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_nombres_by_idIns()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los articulos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def update_img(cls,aid,img):
        """
        Asigna una nueva imagen a un articulo
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE tiposArticulo SET img=\"{}\" WHERE idTipoArticulo={}").format(img,aid)
            cls.cursor.execute(sql)
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.update_img()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando la imagen de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()