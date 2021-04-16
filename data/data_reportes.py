from data.data import Datos
import custom_exceptions
import datetime

class DatosReportes(Datos):

    @classmethod
    def get_cant_usuarios(cls):
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
            sql = ("SELECT count(*) from usuarios")
            cls.cursor.execute(sql)
            cant = cls.cursor.fetchone()[0]
            data = []
            sql = ("SELECT min(fechaReg) from usuarios")
            cls.cursor.execute(sql)
            res = cls.cursor.fetchone()
            if res == None:
                fecha_min = datetime.datetime.now()
            else:
                fecha_min = res[0]
            num_months = (d.year - fecha_min.year) * 12 + (d.month - fecha_min.month)
            #Le pongo +2 para que arranque en la gráfica desde 0 usuarios.
            for i in range(0,num_months+2):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(cant)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en cantidad.
                    #Usuarios
                    sql = ("select count(*) from usuarios where month(fechaReg)=%s and year(fechaReg)=%s")
                    if current_month == 12:
                        values = (1, current_year+1)
                    else:
                        values = (current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valCantMes = cls.cursor.fetchone()[0]

                    if valCantMes == None:
                        valCantMes = 0

                    #Aplico los movimientos del mes al stock
                    cant -= valCantMes
                    data.append(cant)

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_cant_usuarios()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    
    @classmethod
    def get_cant_depositos(cls,cant_meses):
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
            sql = ("SELECT count(*) from depositos where estado != 'cancelado'")
            cls.cursor.execute(sql)
            cant = cls.cursor.fetchone()[0]
            data = []
            for i in range(0,int(cant_meses)):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(cant)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en cantidad.
                    #Usuarios
                    sql = ("select count(*) from depositos where month(fechaDep)=%s and year(fechaDep)=%s and estado != 'cancelado'")
                    if current_month == 12:
                        values = (1, current_year+1)
                    else:
                        values = (current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valCantMes = cls.cursor.fetchone()[0]

                    if valCantMes == None:
                        valCantMes = 0

                    #Aplico los movimientos del mes al stock
                    cant -= valCantMes
                    data.append(cant)

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_cant_depositos()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_cant_pedidos(cls,cant_meses):
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
            sql = ("SELECT count(*) from pedidos where estado != 'cancelado' and estado != 'devuelto'")
            cls.cursor.execute(sql)
            cant = cls.cursor.fetchone()[0]
            data = []
            for i in range(0,int(cant_meses)):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(cant)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en cantidad.
                    #Usuarios
                    sql = ("select count(*) from pedidos where month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto'")
                    if current_month == 12:
                        values = (1, current_year+1)
                    else:
                        values = (current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valCantMes = cls.cursor.fetchone()[0]

                    if valCantMes == None:
                        valCantMes = 0

                    #Aplico los movimientos del mes al stock
                    cant -= valCantMes
                    data.append(cant)

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_cant_pedidos()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def ganancias_art_eco_tienda(cls,id,cant_meses):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            cant = 0
            data = []
            for i in range(0,int(cant_meses)):

                #Pedidos
                cls.abrir_conexion()
                cant = 0
                sql = ("select tiposArt_pedidos.cantidad, tiposArt_pedidos.margenGanancia, pedidos.fechaEnc from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                valCantMes = cls.cursor.fetchall()
                if len(valCantMes) == 0:
                    sum = 0
                else:
                    datos = []
                    for art in valCantMes:
                        sql = ("select valor from valoresTipArt where fecha <= %s order by fecha DESC")
                        values = (art[2],)
                        cls.cursor.execute(sql,values)
                        valor = cls.cursor.fetchone()[0]
                        datos.append({"cantidad":float(art[0]),"margenGanancia":float(art[1]),"valor":float(valor)})
                        sum = 0
                        for el in datos:
                            sum += (el["valor"] - ((el["valor"])/(1+el["margenGanancia"]))) * el["cantidad"]
                        
                #Aplico las ganancias del mes al stock
                cant += sum
                data.append(cant)
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
                cls.cerrar_conexion()
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.ganancias_art()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def ganancias_art_totales(cls,id,cant_meses):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            cant = 0
            data = []
            for i in range(0,int(cant_meses)):

                #Pedidos
                cls.abrir_conexion()
                cant = 0
                sql = ("select tiposArt_pedidos.cantidad, tiposArt_pedidos.margenGanancia, pedidos.fechaEnc from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                valCantMes = cls.cursor.fetchall()
                if len(valCantMes) == 0:
                    sum = 0
                else:
                    datos = []
                    for art in valCantMes:
                        sql = ("select valor from valoresTipArt where fecha <= %s order by fecha DESC")
                        values = (art[2],)
                        cls.cursor.execute(sql,values)
                        valor = cls.cursor.fetchone()[0]
                        datos.append({"cantidad":float(art[0]),"margenGanancia":float(art[1]),"valor":float(valor)})
                        sum = 0
                        for el in datos:
                            sum += (el["valor"] - ((el["valor"])/(1+el["margenGanancia"]))) * el["cantidad"]
                        
                cls.cerrar_conexion()

                #Salidas Stock
                cls.abrir_conexion()
                sql = ("select SUM((valorTotal - costo)) from salidasStock where idTipoArticulo = %s and month(fecha)=%s and year(fecha)=%s")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSS = cls.cursor.fetchone()[0]

                if sumSS == None:
                    sumSS = 0

                cls.cerrar_conexion()

                #Salidas Municipalidad
                cls.abrir_conexion()
                sql = ("select SUM((costoObtencionAlt - costo)) from salidasMun where idTipoArticulo = %s and month(fecha)=%s and year(fecha)=%s")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSM = cls.cursor.fetchone()[0]

                if sumSM == None:
                    sumSM = 0

                cls.cerrar_conexion()

                #Aplico las ganancias del mes al total del mes
                cant += sum
                cant += sumSS
                cant += sumSM

                data.append(cant)
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.ganancias_art()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    
    
