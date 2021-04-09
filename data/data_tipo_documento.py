from data.data import Datos
import custom_exceptions
from classes import TipoDocumento

class DatosTipoDocumento(Datos):
    
    @classmethod
    def get_by_id(cls, id, noClose = False):
        """
        Busca un tipo de dodcumento en la BD segun su id.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT tiposDocumento.idTipoDoc, \
                tiposDocumento.nombre, \
                tiposDocumento.estado \
                from tiposDocumento where tiposDocumento.idTipoDoc = {}").format(id)
            cls.cursor.execute(sql)
            tipoDoc = cls.cursor.fetchall()[0]
            if len(tipoDoc) > 0:
                return TipoDocumento(tipoDoc[0],tipoDoc[1],tipoDoc[2])
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_tipo_documento.get_by_id()",
                                                        msj_adicional = "Tipo de documento inexistente")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_documento.get_by_id()",
                                                    msj=str(e),
           
                                                    msj_adicional="Error buscando tipo de documento en la BD.")
    @classmethod
    def get_all(cls, noClose = False):
        """
        Busca todos los tipos de dodcumento en la BD.
        """
        try:
            cls.abrir_conexion()
            sql = ("SELECT tiposDocumento.idTipoDoc, \
                tiposDocumento.nombre, \
                tiposDocumento.estado \
                from tiposDocumento")
            cls.cursor.execute(sql)
            tipoDocs_ = cls.cursor.fetchall()
            tipoDocs = []
            if len(tipoDocs_) > 0:
                for td in tipoDocs_:
                    tipoDocs.append(TipoDocumento(td[0],td[1],td[2]))
                return tipoDocs
            else:
                raise custom_exceptions.ErrorDeConexion(origen="data_tipo_documento.get_all()",
                                                        msj_adicional = "No hay Tipos de Documento cargados en la BD.")

        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_tipo_documento.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error buscando todos los tipos de documento en la BD.")