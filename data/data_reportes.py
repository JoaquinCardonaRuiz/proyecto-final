from data.data import Datos
from data.data_punto_deposito import DatosPuntoDeposito
from data.data_punto_retiro import DatosPuntoRetiro

import custom_exceptions
import datetime

class DatosReportes(Datos):

    @classmethod
    def get_cant_usuarios(cls,cant_meses):
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
            '''Si se quisiera hacer historico, usar num_months.
            num_months = (d.year - fecha_min.year) * 12 + (d.month - fecha_min.month)
            num_months += abs(fecha_min.month - d.month + 1)'''
            for i in range(0,int(cant_meses)):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(round(float(cant),2))
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
                    cant -= round(float(valCantMes),2)
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
            data = []
            for i in range(0,int(cant_meses)):

                cant = 0
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
                cant = valCantMes
                data.append(round(float(cant),2))
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
            data = []
            for i in range(0,int(cant_meses)):                

                cant = 0
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
                cant = valCantMes
                data.append(round(float(cant),2))
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
                sql = ("select tiposArt_pedidos.cantidad, tiposArt_pedidos.margenGanancia, pedidos.fechaEnc, idTipoArticulo from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                valCantMes = cls.cursor.fetchall()
                if len(valCantMes) == 0:
                    sum = 0
                else:
                    datos = []
                    for art in valCantMes:
                        sql = ("select valor from valoresTipArt where fecha <= %s and idTipoArticulo = %s order by fecha DESC")
                        values = (art[2],art[3])
                        cls.cursor.execute(sql,values)
                        valor = cls.cursor.fetchone()[0]
                        datos.append({"cantidad":float(art[0]),"margenGanancia":float(art[1]),"valor":float(valor)})
                        sum = 0
                        for el in datos:
                            sum += (el["valor"] - ((el["valor"])/(1+el["margenGanancia"]))) * el["cantidad"]
                        
                #Aplico las ganancias del mes al stock
                cant += sum
                data.append(round(float(cant),2))
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
                sql = ("select tiposArt_pedidos.cantidad, tiposArt_pedidos.margenGanancia, pedidos.fechaEnc, idTipoArticulo from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (id, current_month, current_year)
                cls.cursor.execute(sql,values)
                valCantMes = cls.cursor.fetchall()
                if len(valCantMes) == 0:
                    sum = 0
                else:
                    datos = []
                    for art in valCantMes:
                        sql = ("select valor from valoresTipArt where fecha <= %s and idTipoArticulo = %s order by fecha DESC")
                        values = (art[2],art[3])
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

                data.append(round(float(cant),2))
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

    @classmethod
    def ganancias_art_totales_generales(cls,cant_meses):
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
                sql = ("select tiposArt_pedidos.cantidad, tiposArt_pedidos.margenGanancia, pedidos.fechaEnc, idTipoArticulo from pedidos right join tiposArt_pedidos using(idPedido) where month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                valCantMes = cls.cursor.fetchall()
                if len(valCantMes) == 0:
                    sum = 0
                else:
                    datos = []
                    for art in valCantMes:
                        sql = ("select valor from valoresTipArt where fecha <= %s and idTipoArticulo = %s order by fecha DESC")
                        values = (art[2],art[3])
                        cls.cursor.execute(sql,values)
                        valor = cls.cursor.fetchone()[0]
                        datos.append({"cantidad":float(art[0]),"margenGanancia":float(art[1]),"valor":float(valor)})
                        sum = 0
                        for el in datos:
                            sum += (el["valor"] - ((el["valor"])/(1+el["margenGanancia"]))) * el["cantidad"]
                        
               

                #Salidas Stock
                sql = ("select SUM((valorTotal - costo)) from salidasStock where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSS = cls.cursor.fetchone()[0]

                if sumSS == None:
                    sumSS = 0


                #Salidas Municipalidad
                sql = ("select SUM((costoObtencionAlt - costo)) from salidasMun where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSM = cls.cursor.fetchone()[0]

                if sumSM == None:
                    sumSM = 0

                cls.cerrar_conexion()

                #Aplico las ganancias del mes al total del mes
                cant += sum
                cant += sumSS
                cant += sumSM

                data.append(round(float(cant),2))
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

    @classmethod
    def ingresos_egresos_globales(cls,cant_meses):
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
                sql = ("select sum(totalARS) from pedidos where month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                sum = cls.cursor.fetchone()[0]
                if sum == None:
                    sum = 0
                        
                cls.cerrar_conexion()

                #Salidas Stock
                cls.abrir_conexion()
                sql = ("select SUM((valorTotal - costo)) from salidasStock where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSS = cls.cursor.fetchone()[0]

                if sumSS == None:
                    sumSS = 0

                cls.cerrar_conexion()

                #Salidas Municipalidad
                cls.abrir_conexion()
                sql = ("select SUM((costoObtencionAlt - costo)) from salidasMun where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSM = cls.cursor.fetchone()[0]

                if sumSM == None:
                    sumSM = 0

                cls.cerrar_conexion()

                #Costos Producción Insumos
                cls.abrir_conexion()
                sql = ("SELECT sum((cProduccion + otrosCostos)*cantidad) FROM prodInsumos left join insumos using(idInsumo) where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPI = cls.cursor.fetchone()[0]

                if sumPI == None:
                    sumPI = 0

                cls.cerrar_conexion()

                #Costos Producción Articulos
                cls.abrir_conexion()
                sql = ("SELECT sum((cProduccion + otrosCostos)*cantidad) FROM prodTipArt left join tiposArticulo using(idTipoArticulo) where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPA = cls.cursor.fetchone()[0]

                if sumPA == None:
                    sumPA = 0

                cls.cerrar_conexion()

                #Aplico las ganancias del mes al total del mes
                cant += sum
                cant += sumSS
                cant += sumSM
                cant -= sumPA
                cant -= sumPI

                data.append(round(float(cant),2))
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.ingresos_egresos_globales()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def ingresos_globales(cls,cant_meses):
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
                sql = ("select sum(totalARS) from pedidos where month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto';")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                sum = cls.cursor.fetchone()[0]
                if sum == None:
                    sum = 0
                        
                cls.cerrar_conexion()

                #Salidas Stock
                cls.abrir_conexion()
                sql = ("select SUM((valorTotal - costo)) from salidasStock where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSS = cls.cursor.fetchone()[0]

                if sumSS == None:
                    sumSS = 0

                cls.cerrar_conexion()

                #Salidas Municipalidad
                cls.abrir_conexion()
                sql = ("select SUM((costoObtencionAlt - costo)) from salidasMun where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumSM = cls.cursor.fetchone()[0]

                if sumSM == None:
                    sumSM = 0

                cls.cerrar_conexion()

                #Aplico las ganancias del mes al total del mes
                cant += sum
                cant += sumSS
                cant += sumSM

                data.append(round(float(cant),2))
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.ingresos_globales()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def egresos_globales(cls,cant_meses):
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

                #Costos Producción Insumos
                cls.abrir_conexion()
                cant = 0
                sql = ("SELECT sum((cProduccion + otrosCostos)*cantidad) FROM prodInsumos left join insumos using(idInsumo) where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPI = cls.cursor.fetchone()[0]

                if sumPI == None:
                    sumPI = 0

                cls.cerrar_conexion()

                #Costos Producción Articulos
                cls.abrir_conexion()
                sql = ("SELECT sum((cProduccion + otrosCostos)*cantidad) FROM prodTipArt left join tiposArticulo using(idTipoArticulo) where month(fecha)=%s and year(fecha)=%s")
                values = (current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPA = cls.cursor.fetchone()[0]

                if sumPA == None:
                    sumPA = 0

                cls.cerrar_conexion()

                #Aplico las ganancias del mes al total del mes
                cant += sumPA
                cant += sumPI

                data.append(round(float(cant),2))
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.egresos_globales()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def porcentaje_dep_acreditados(cls):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            cls.abrir_conexion()

            #Fecha del primer pedido
            sql = ("select min(fechaDep) from depositos where estado !='eliminado'")
            cls.cursor.execute(sql)
            fecha = cls.cursor.fetchone()[0].strftime("%d/%m/%Y")

            #Todos los depósitos
            sql = ("SELECT count(*) from depositos")
            cls.cursor.execute(sql)
            total_depositos = cls.cursor.fetchone()[0]
            if total_depositos == None:
                total_depositos = 0
            
            #Depósitos NO acreditados
            sql = ("select count(*) from depositos where idUsuario is Null;")
            cls.cursor.execute(sql)
            dep_no_acreditados = cls.cursor.fetchone()[0]
            if dep_no_acreditados == None:
                dep_no_acreditados = 0
            
            #Depósitos NO acreditados
            sql = ("select count(*) from depositos where idUsuario is not Null;")
            cls.cursor.execute(sql)
            dep_acreditados = cls.cursor.fetchone()[0]
            if dep_acreditados == None:
                dep_acreditados = 0
            
            
            porcentaje_acreditados = round(float(dep_acreditados) * 100/float(total_depositos),1)
            porcentaje_no_acreditados = round(float(dep_no_acreditados) * 100/float(total_depositos),1)
            data = [[dep_acreditados,dep_no_acreditados],[porcentaje_acreditados,porcentaje_no_acreditados]]
            
            dic = {"data":data,"fecha":fecha}
            return dic

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.ganancias_art()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def porcentaje_dep_por_pd(cls):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            cls.abrir_conexion()
            data = []
            #Fecha del primer pedido
            sql = ("select min(fechaDep) from depositos where estado !='eliminado'")
            cls.cursor.execute(sql)
            fecha = cls.cursor.fetchone()[0].strftime("%d/%m/%Y")
            #Todos los depósitos
            sql = ("SELECT count(*) from depositos where estado !='eliminado'")
            cls.cursor.execute(sql)
            total_depositos = cls.cursor.fetchone()[0]
            if total_depositos == None:
                total_depositos = 0
            
            #Depósitos por PD
            pds = DatosPuntoDeposito.get_all_sin_filtro()
            for pd in pds:
                sql = ("select count(*) from depositos where idPunto = %s and estado !='eliminado'")
                values = (pd.id,)
                cls.cursor.execute(sql,values)
                cant_dep_pd = cls.cursor.fetchone()[0]
                if cant_dep_pd == None:
                    cant_dep_pd = 0
                porcentaje_dep_pd = round(float(cant_dep_pd) * 100/ float(total_depositos),1)
                data.append([pd.nombre,cant_dep_pd,porcentaje_dep_pd])
            
            dic = {"data":data,"fecha":fecha}
            return dic

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.porcentaje_dep_por_pd()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def porcentaje_ped_por_pr(cls):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            cls.abrir_conexion()
            data = []
            #Fecha del primer pedido
            sql = ("select min(fechaEnc) from pedidos where estado !='eliminado'")
            cls.cursor.execute(sql)
            fecha = cls.cursor.fetchone()[0].strftime("%d/%m/%Y")
            #Todos los depósitos
            sql = ("SELECT count(*) from pedidos where estado != 'eliminado'")
            cls.cursor.execute(sql)
            total_pedidos = cls.cursor.fetchone()[0]
            if total_pedidos == None:
                total_pedidos = 0
            
            #Pedidos por PR
            prs = DatosPuntoRetiro.get_all(True,False)
            for pr in prs:
                sql = ("select count(*) from pedidos where idPunto = %s and estado !='eliminado'")
                values = (pr.id,)
                cls.cursor.execute(sql,values)
                cant_ped_pr = cls.cursor.fetchone()[0]
                if cant_ped_pr == None:
                    cant_ped_pr = 0
                porcentaje_ped_pr = round(float(cant_ped_pr) * 100/ float(total_pedidos),1)
                data.append([pr.nombre,cant_ped_pr,porcentaje_ped_pr])
            
            dic = {"data":data,"fecha":fecha}
            return dic

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.porcentaje_ped_por_pr()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    
    @classmethod
    def get_movimientos_stock_materiales(cls,id,stock,cant_meses):
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
            for i in range(1,int(cant_meses)+1):
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
                    sql = ("select sum(mu.cantidad) from prodInsumos right join materialesUtilizados as mu on mu.idProd = prodInsumos.idprodInsumo where idMaterial = %s and month(fecha)=%s and year(fecha)=%s;")
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
                    data.append(round(float(stock),2))

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
    def get_movimientos_stock_insumos(cls,id,stock,cant_meses):
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
            for i in range(1,int(cant_meses)+1):
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
                    data.append(round(float(stock),2))

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
    def get_movimientos_stock_articulos(cls,id,stock,cant_meses):
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
            for i in range(1,int(cant_meses)):
                #valido si es el mes actual, en cuyo caso, aplica el stock actual.
                if current_month == start_month and current_year == start_year:
                    data.append(stock)
                    current_month -= 1
                else:
                    #Si no lo es, busco en la BD los movimientos del mes siguiente para restarselos al valor guardado en stock.
                    
                    #Salidas ED
                    sql = ("select SUM(cantidadSalida) from salidasStock where idTipoArticulo = %s and month(fecha)=%s and year(fecha)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockSED = cls.cursor.fetchone()[0]

                    if valStockSED == None:
                        valStockSED = 0

                    #Salidas Municipio
                    sql = ("select SUM(cantSalida) from salidasMun where idTipoArticulo = %s and month(fecha)=%s and year(fecha)=%s")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockSM = cls.cursor.fetchone()[0]

                    if valStockSM == None:
                        valStockSM = 0

                    #Pedidos
                    sql = ("select SUM(cantidad) from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaEnc)=%s and year(fechaEnc)=%s and estado != 'cancelado' and estado != 'devuelto'")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockPed = cls.cursor.fetchone()[0]

                    if valStockPed == None:
                        valStockPed = 0
                    
                    #Producción Articulos
                    sql = ("select sum(cantidad) from prodTipArt where idTipoArticulo = %s and month(fecha)=%s and year(fecha)=%s and estado != 'deshabilitado'")
                    if current_month == 12:
                        values = (id, 1, current_year+1)
                    else:
                        values = (id, current_month+1, current_year)
                    cls.cursor.execute(sql,values)
                    valStockProdArt = cls.cursor.fetchone()[0]

                    if valStockProdArt == None:
                        valStockProdArt = 0

                    #Aplico los movimientos del mes al stock
                    stock += valStockSM
                    stock += valStockSED
                    stock += valStockPed
                    stock -= valStockProdArt

                    data.append(round(float(stock),2))

                    if current_month != 1:
                        current_month -= 1
                    else:
                        current_month = 12
                        current_year -= 1
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_articulo.get_movimientos_stock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un articulo en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def cantidad_depositada_por_material(cls,id,cant_meses):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            data = []
            for i in range(0,int(cant_meses)):

                #Depositos por material
                cls.abrir_conexion()
                cant = 0
                sql = ("SELECT sum(cant) from depositos where idMaterial = %s and month(fechaDep)=%s and year(fechaDep)=%s")
                values = (id,current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPI = cls.cursor.fetchone()[0]

                if sumPI == None:
                    sumPI = 0

                cls.cerrar_conexion()

                #Aplico las cantidades depositadas al dataset
                cant += sumPI

                data.append(round(float(cant),2))
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.cantidad_depositada_por_material()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def cantidad_pedida_por_articulo(cls,id,cant_meses):
        """
        Obtiene los movimientos de un material en base a su id, el tipo y el mes.
        """
        try:
            d = datetime.datetime.now()
            start_month = int(d.strftime("%m"))
            start_year = int(d.year)
            current_month = start_month
            current_year = start_year
            data = []
            for i in range(0,int(cant_meses)):

                #Depositos por material
                cls.abrir_conexion()
                cant = 0
                sql = ("select sum(cantidad) from pedidos right join tiposArt_pedidos using(idPedido) where idTipoArticulo = %s and month(fechaReg)=%s and year(fechaReg)=%s")
                values = (id,current_month, current_year)
                cls.cursor.execute(sql,values)
                
                sumPI = cls.cursor.fetchone()[0]

                if sumPI == None:
                    sumPI = 0

                cls.cerrar_conexion()

                #Aplico las cantidades depositadas al dataset
                cant += sumPI

                data.append(round(float(cant),2))
                if current_month != 1:
                    current_month -= 1
                else:
                    current_month = 12
                    current_year -= 1
               
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.cantidad_pedida_por_articulo()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
