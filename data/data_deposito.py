from data.data import Datos
from data.data_cant_material import DatosCantMaterial
from data.data_ecopuntos import DatosEcoPuntos
from classes import Deposito, CantMaterial, EcoPuntos
import custom_exceptions

class DatosDeposito(Datos):
    @classmethod
    def get_by_user_id(cls,uid,noClose=False):
        """
        Obtiene todos los Depositos de la BD correspondientes a un usuario segun su id.
        """
        cls.abrir_conexion()
        try:
            sql = ("SELECT idDeposito, \
                    codigo, \
                    idMaterial, \
                    cant, \
                    idPuntoDeposito, \
                    fechaDep, \
                    idEcoPuntos, \
                    fechaReg \
                    FROM depositos WHERE idUsuario=\"{}\"").format(uid)
            cls.cursor.execute(sql)
            depositos_ = cls.cursor.fetchall()
            depositos = []
            for d in depositos_:
                material = CantMaterial(d[3],d[2])
                ecopuntos = DatosEcoPuntos.get_by_id(d[6])
                d_ = Deposito(d[0],d[1],material,d[4],d[5],ecopuntos,d[7])
                depositos.append(d_)
            return depositos
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_deposito.get_by_user_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los depositos desde la BD.")
        finally:
            if not(noClose):
                cls.cerrar_conexion()