from data.data import Datos
import custom_exceptions

class DatosMaterial(Datos):
    
    @classmethod
    def get_all_byIdPuntoDep(cls, idPuntoDep, noClose = False):
        """
        Obtiene todos los Puntos de Depósito de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select materiales.nombre, materiales.unidadMedida from puntosDeposito left join puntosDep_mat using(idPunto) left join materiales using (idMaterial) where idPunto = %s;")
            values = (idPuntoDep,)
            cls.cursor.execute(sql, values)
            materiales = cls.cursor.fetchall()
            for material in materiales:
                
            
            return 
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_all_byIdPunto()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los materiales que acepta un punto de depósito desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()