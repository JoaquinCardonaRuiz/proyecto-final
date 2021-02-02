from data.data import Datos
import custom_exceptions

class DatosValor(Datos):
    @classmethod
    def get_from_TAid(cls, id, noClose=False):
        """
        Obtiene el valor de un tipo articulo de la BD
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT idValor, fecha, valor \
                    FROM valoresTipArt \
                    WHERE idTipoArticulo = {};").format(id)
            cls.cursor.execute(sql)
            valores = cls.cursor.fetchall()
            max_date = valores[0]
            for v in valores:
                if v[1] > max_date[1]:
                    max_date = v
            return max_date
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_valor.get_from_TAid()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo lso valores desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()


    @classmethod
    def add(cls,idArt,fecha,valor):
        """
        Da de alta un nuevo valor de un articulo en el sistema.
        """
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO valoresTipArt (idTipoArticulo, fecha, valor) \
                    VALUES ({},\"{}\",{});".format(idArt,fecha,valor))
            cls.cursor.execute(sql)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_valor.add()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un valor en la BD.")
        finally:
            cls.cerrar_conexion()