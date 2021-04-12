from classes import Material
from data.data import Datos
from classes import Material
import custom_exceptions
import datetime

class DatosMaterial(Datos):
    @classmethod
    def get_by_id(cls, id, noClose = False):
        """Obtiene un material de la BD en base a un ID.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT idMaterial, \
                           nombre, \
                           unidadMedida, \
                           costoRecoleccion, \
                           stock, \
                           color, \
                           estado \
                           FROM materiales WHERE idMaterial = {};").format(id)
            cls.cursor.execute(sql)
            m = cls.cursor.fetchone()
            if m == None:
                return False
            else:
                material = Material(m[0],m[1],m[2],m[3],m[4],m[5],m[6])
                return material
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un material en base al id recibido como parámetro.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def get_all_byIdPuntoDep(cls, idPuntoDep, noSuspendidos =False,noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        try:
            cls.abrir_conexion()
            if noSuspendidos:
                sql = ("select materiales.nombre, materiales.unidadMedida, materiales.color, materiales.idMaterial, materiales.estado from puntosDeposito left join puntosDep_mat using(idPunto) left join materiales using (idMaterial) where idPunto = %s and puntosDep_mat.estado = 'disponible' and materiales.estado = 'habilitado' order by materiales.nombre ASC;")
            else:
                sql = ("select materiales.nombre, materiales.unidadMedida, materiales.color, materiales.idMaterial, materiales.estado from puntosDeposito left join puntosDep_mat using(idPunto) left join materiales using (idMaterial) where idPunto = %s and puntosDep_mat.estado = 'disponible' and materiales.estado != 'eliminado' order by materiales.nombre ASC;")
            values = (idPuntoDep,)
            cls.cursor.execute(sql, values)
            materiales = cls.cursor.fetchall()
            materiales_ = []
            for material in materiales:
                materiales_.append(Material(material[3], material[0], material[1], None, None, material[2],material[4])) 
            return materiales_
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all_byIdPunto()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales que acepta un punto de depósito desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()
    

    @classmethod
    def get_all(cls,noFilter):
        """
        Obtiene todos los materiales de la BD.
        """
        try:
            cls.abrir_conexion()
            if noFilter == False:
                sql = ("SELECT idMaterial, \
                            nombre, \
                            unidadMedida, \
                            costoRecoleccion, \
                            stock, \
                            color, \
                            estado \
                            FROM materiales WHERE estado!=\"eliminado\" order by nombre ASC;")
            else:
                sql = ("SELECT idMaterial, \
                           nombre, \
                           unidadMedida, \
                           costoRecoleccion, \
                           stock, \
                           color, \
                           estado \
                           FROM materiales order by nombre ASC;")
            cls.cursor.execute(sql)
            materiales_ = cls.cursor.fetchall()
            materiales = []
            for m in materiales_:
                material_ = Material(m[0],m[1],m[2],m[3],m[4],m[5],m[6])
                materiales.append(material_)
            return materiales
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales desde la BD.")
        finally:
            cls.cerrar_conexion()

    
    @classmethod
    def add(cls,nombre,unidad,costoRecoleccion,color,estado):
        """
        Agrega un material a la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("INSERT INTO materiales (nombre,unidadMedida,costoRecoleccion,color,stock,estado) \
                   VALUES (\"{}\",\"{}\",{},\"{}\",0,\"{}\");".format(nombre,unidad,costoRecoleccion,color,estado))
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un material en la BD.")
        finally:
            cls.cerrar_conexion()



    @classmethod
    def update(cls,idMat,nombre,unidad,costoRecoleccion,color,estado):
        """
        Actualiza un material en la BD
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE materiales SET nombre=\"{}\",unidadMedida=\"{}\",costoRecoleccion={},color=\"{}\",estado=\"{}\" WHERE idMaterial={};").format(nombre,unidad,costoRecoleccion,color,estado,idMat)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.update()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando un material en la BD.")
        finally:
            cls.cerrar_conexion()

    
    @classmethod
    def delete(cls, id):
        """
        Elimina un material de la BD a partir de su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE materiales SET estado = \"eliminado\" WHERE idMaterial={}".format(id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.delete()",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un material en la BD.")
        finally:
            cls.cerrar_conexion()




    @classmethod
    def removeStock(cls,idMat,cant):
        """
        Resta la cantidad especificada al stock de un material
        """
        try:
            cls.abrir_conexion()
            sql= ("UPDATE materiales SET stock=stock-{} WHERE idMaterial={};").format(cant,idMat)
            cls.cursor.execute(sql)
            cls.db.commit()
            return cls.cursor.lastrowid
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.removeStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def addStock(cls, id,cant):
        """
        Agrega stock a un material.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE materiales SET stock = stock + {} WHERE idMaterial={}".format(cant,id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.addStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error agregando stock a un material en la BD.")
        finally:
            cls.cerrar_conexion()




    @classmethod
    def updateStock(cls,id,cant):
        """
        Actualiza el stock de un material.
        """
        try:
            cls.abrir_conexion()
            sql = ("UPDATE materiales SET stock = {} WHERE idMaterial={}".format(cant,id))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.updateStock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
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
                    #Depositos
                    sql = ("select SUM(cant) from depositos where idMaterial = %s and month(fechaDep)=%s and year(fechaDep)=%s and estado != 'cancelado'")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockDep = cls.cursor.fetchone()[0]

                    if valStockDep == None:
                        valStockDep = 0
                    
                    #Entradas
                    sql = ("select SUM(cant) from entradasMat where idMaterial = %s and month(fecha)=%s and year(fecha)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockEnt = cls.cursor.fetchone()[0]

                    if valStockEnt == None:
                        valStockEnt = 0
                    
                    #Producciones insumos
                    sql = ("select sum(mat_ins.cantidad * prodInsumos.cantidad) from prodInsumos left join mat_ins using(idInsumo) where idMaterial = %s and month(fecha)=%s and year(fecha)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockProd = cls.cursor.fetchone()[0]

                    if valStockProd == None:
                        valStockProd = 0

                    #Aplico los movimientos del mes al stock
                    stock -= valStockDep
                    stock -= valStockEnt
                    stock += valStockProd
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

