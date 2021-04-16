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
            cls.cursor.execute()
            cant_actual = cls.cursor.fetchone[0]
            data = []
            sql = ("SELECT min(fechaReg) from usuarios")
            cls.cursor.execute()
            res = cls.cursor.fetchone()
            if res != None:
                res = datetime.datetime.now()
            else:
                fecha_min = res[0]
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
                    sql = ("select sum(mu.cantidad * prodInsumos.cantidad) from prodInsumos right join materialesUtilizados as mu on mu.idProd = prodInsumos.idprodInsumo where idMaterial = %s and month(fecha)=%s and year(fecha)=%s;")
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
            print(data)
            return data

        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_material.get_movimientos_stock()",
                                                    msj=str(e),
                                                    msj_adicional="Error actualizando el stock de un material en la BD.")
        finally:
            cls.cerrar_conexion()
