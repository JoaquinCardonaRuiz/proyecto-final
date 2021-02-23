from data.data import Datos
from data.data_direccion import DatosDireccion
from data.data_horario import DatosHorario
from data.data_cant_articulo import DatosCantArticulo
from classes import PuntoRetiro
import custom_exceptions

class DatosPuntoRetiro(Datos):
    @classmethod
    def get_by_id(cls,id):
        """
        Obtiene un punto de retiro de la BD a partir de su id.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT idPunto, \
                           estado, \
                           demoraFija, \
                           nombre, \
                           idDireccion \
                        FROM puntosRetiro WHERE idPunto = {} AND estado != \"eliminado\";".format(id))
            cls.cursor.execute(sql)
            pr = cls.cursor.fetchall()[0]
            direccion = DatosDireccion.get_one_id(pr[4],noClose=True)
            horarios = DatosHorario.get_horariosPD_id(pr[0],noClose=True)
            stock = DatosCantArticulo.get_PR_stock(pr[0],noClose=True)
            puntoRetiro = PuntoRetiro(direccion,pr[3],pr[1],horarios,pr[2],stock)
            return puntoRetiro
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_punto_retiro.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo un punto de retiro desde la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_demora_promedio(cls):
        """
        Obtiene el promedio de espera de los punto retiros.
        """
        cls.abrir_conexion()
        try:
            sql = "SELECT CEIL(AVG(demoraFija)) FROM puntosRetiro WHERE estado != \"eliminado\";"
            cls.cursor.execute(sql)
            demora = cls.cursor.fetchone()
            return demora[0]
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_punto_retiro.get_demora_promedio()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo la demora promedio de la BD.")
        finally:
            cls.cerrar_conexion()