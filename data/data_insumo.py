from data.data import Datos
from data.data_cant_material import DatosCantMaterial
from classes import Insumo
import custom_exceptions
import datetime

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
                           color, \
                           descripcion \
                           FROM insumos WHERE estado!=\"eliminado\" and idInsumo={};").format(id)
            cls.cursor.execute(sql)
            i = cls.cursor.fetchone()
            materiales = DatosCantMaterial.get_from_Insid(i[0],noClose=True)
            insumo = Insumo(i[0],i[1],i[2],i[3],i[4],i[5],materiales,i[6],i[7],i[8],i[9])
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
                            color, \
                            descripcion \
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
                            color, \
                            descripcion \
                            FROM insumos;")
            cls.cursor.execute(sql)
            insumos_ = cls.cursor.fetchall()
            insumos = []
            for i in insumos_:
                materiales = DatosCantMaterial.get_from_Insid(i[0],noClose=True)
                insumo_ = Insumo(i[0],i[1],i[2],i[3],i[4],i[5],materiales,i[6],i[7],i[8],i[9])
                insumos.append(insumo_)
            return insumos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los insumos desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def add(cls,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color,desc):
        """
        Agrega un articulo a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO insumos (nombre,unidadMedida,cMateriales,cProduccion,otrosCostos,cTotal,color,stock,estado,descripcion) \
                   VALUES (\"{}\",\"{}\",{},{},{},{},\"{}\",0,\"disponible\",\"{}\");".format(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color,desc))
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
            sql= ("UPDATE insumos SET nombre=\"{}\",unidadMedida=\"{}\",cMateriales={},cProduccion={},otrosCostos={},cTotal={},color=\"{}\",estado=\"disponible\" WHERE idInsumo={};").format(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color,idIns)
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
    def update_desc(cls,idIns,desc):
        """
        Actualiza la desc de un insumo en la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE insumos SET descripcion=\"{}\" WHERE idInsumo={};").format(desc,idIns)
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.update_desc()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando la desc de un insumo en la BD.")
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

    @classmethod
    def get_movimientos_stock(cls,id,stock):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            cls.abrir_conexion()
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            data = []
            for i in range(1,13):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(stock)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en stock.
                    
                    #Producción Insumos
                    sql = ("select SUM(cantidad) from prodInsumos where idInsumo = %s and month(fecha)=%s and year(fecha)=%s and estado != 'deshabilitado'")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockProdIns = cls.cursor.fetchone()[0]

                    if valStockProdIns == None:
                        valStockProdIns = 0
                    
                    #Producción Articulos
                    sql = ("select sum(iu.cantidad) from prodTipArt right join insumosUtilizados as iu on iu.idProd = prodTipArt.idProdTipArt where idInsumo = %s and month(fecha)=%s and year(fecha)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    
                    valStockProdArt = cls.cursor.fetchone()[0]
                    
                    if valStockProdArt == None:
                        valStockProdArt = 0

                    #Aplico los movimientos del mes al stock
                    stock -= valStockProdIns
                    stock += valStockProdArt
                    data.append(stock)

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_movimientos_stock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def get_costo_total(cls,id):
        """
        Obtiene el costo total de un insumo de la BD en base a su id.
        """
        
        try:
            cls.abrir_conexion()
            sql = ("SELECT cTotal FROM insumos WHERE estado!=\"eliminado\" and idInsumo={};").format(id)
            cls.cursor.execute(sql)
            ct = cls.cursor.fetchone()[0]
            return ct
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_costo_total()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo el costo total de un insumo desde la BD.")
        finally:
            cls.cerrar_conexion()





    @classmethod
    def get_ins_afectados(cls,idMat):
        """
        Devuelve los IDs de los insumos que tienen en su receta un material
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idInsumo FROM mat_ins WHERE idMaterial = {} GROUP BY idInsumo").format(idMat)
            cls.cursor.execute(sql)
            res = cls.cursor.fetchall()
            return [i[0] for i in res]
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.get_ins_afectados()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo insumos afectados por un material.")
        finally:
            cls.cerrar_conexion()




    @classmethod
    def updateCostos(cls,idIns,cMat,cTot):
        """
        Actualiza los costos de un insumo a la cantidad especificada
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE insumos SET cMateriales={}, cTotal={} WHERE idInsumo={};").format(cMat,cTot,idIns)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_insumo.updateCostos()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando los costos de un insumo en la BD.")
        finally:
            cls.cerrar_conexion()