from negocio.negocio import Negocio
import custom_exceptions
from negocio.negocio_ecopuntos import NegocioEcoPuntos
from negocio.negocio_direccion import NegocioDireccion
from negocio.negocio_nivel import NegocioNivel
from negocio.negocio_tipo_documento import NegocioTipoDocumento
from data.data_usuario import DatosUsuario
from utils import Utils
import re

class NegocioUsuario(Negocio):
    """Clase que representa la capa de negocio para la entidad Usuario. Hereda de Negocio."""                                           
    
    @classmethod
    def alta(cls,email,password):
        try:
            if str(email) not in DatosUsuario.get_all_emails():
                return DatosUsuario.alta(email,password)
            else:
                return False
        except Exception as e:
            raise e
    
    @classmethod
    def activacion(cls,email,nombre,apellido,calle,altura,ciudad,provincia,pais,documento,tipo_doc):
        try:
            #Valida las RN de una direccion
            if NegocioDireccion.valida_direccion(calle,altura,ciudad,provincia,pais):
                print("1")
                #Valida que el nombre, el apellido y el documento no sean vacios:
                if nombre != "" and apellido != "" and documento != "":
                    print("2")
                    #Valida que el tipo de documento esté entre los tipos de docuemtno existentes.
                    if [x for x in NegocioTipoDocumento.get_all() if str(x.id) == str(tipo_doc)]:
                        #Hago el alta:
                        idNivel = NegocioNivel.get_nivel_nombre(NegocioNivel.get_min_max_niveles()[0]).id
                        idDireccion = NegocioDireccion.alta_direccion(calle,altura,ciudad,provincia,pais)
                        if DatosUsuario.alta(email,None,documento,tipo_doc,nombre,apellido,1,idDireccion,idNivel,"/static/img/avatar.png","habilitado",True):
                            return True
            return False
        except Exception as e:
            raise e
        
    @classmethod
    def verificacion(cls,code):
        try:
            if len(code) > 0:
                return DatosUsuario.verificacion(code)
            else:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.verificacion()",
                                                            msj_adicional = "Error al verificar el codigo") 
        except Exception as e:
            raise e

    @classmethod
    def login(cls,email, password):
        """
            Gestiona el login del usuario.
        """
        try:
            cls.check_email(email)
            return DatosUsuario.login(email, password)
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.login()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de negocio realizando el login del usuario.")

    @classmethod
    def check_email(cls,email):
        """
            Valida la dirección de email con expresiones regulares.
        """
        try:
            #Valida RN 29
            regex = '(<)?(\w+@\w+(?:\.\w+)+)(?(1)>|$)'
            if(re.search(regex,email)):  
                return True
          
            else:  
                return False 
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.check_email()",
                                                    msj=str(e),
                                                    msj_adicional="Formato email inválido.")
    
    @classmethod
    def check_password(cls,password):
        """
            Valida la contraseña de un usuario con expresiones regulares.
        """
        try:
            #Valida RN26, RN27 y RN28.
            rgx = re.compile(r'\d.*?[A-Z].*?[a-z]')
            if rgx.match(''.join(sorted(password))) and len(password) >= 8 and len(password) <=20:
                return True
            else:  
                return False 
        except custom_exceptions.ErrorDeConexion as e:
            raise e
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.check_password()",
                                                    msj=str(e),
                                                    msj_adicional="Formato contraseña inválido.")


    @classmethod
    def checkEP(cls,id,totalEP):
        """Comprueba que se puede gastar cierta cantidad de EP. Si no es así, levanta una excepción de negocio"""
        user = DatosUsuario.get_by_id(id)
        nueva_cant_ep = user.totalEcopuntos - totalEP
        if nueva_cant_ep < 0:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.useEP()",msj="error-ep",msj_adicional="EP insuficientes para realizar pedido")


    @classmethod
    def descontarEPDeposito(cls,id,cant):
        """Descuenta EcoPuntos del usuario al cancelar un depósito. Si el user tiene suficientes EP para restar,
        se devuelve 0. Si no es así, se descuentan todos los que tiene y se devuelve el nro de EP que no se pudo
        descontar."""
        user = DatosUsuario.get_by_id(id)
        if user.totalEcopuntos >= cant:
            cls.useEP(user.id,cant)
            return 0
        else:
            cls.useEP(user.id,user.totalEcopuntos)
            return cant-user.totalEcopuntos


    @classmethod
    def useEP(cls,id, totalEP):
        user = DatosUsuario.get_by_id(id)
        nueva_cant_ep = user.totalEcopuntos - totalEP
        ep_restantes = totalEP
        deps_ordenados = sorted(user.depositos, key=lambda x: x.fechaDeposito)
        
        #para cada deposito
        for dep in deps_ordenados:

            #agarro los EP que le corresponden y su cantidad restante
            ep = dep.ecoPuntos
            cant_rest = ep.cantidadRestante

            #si la cantidad restante es 0, entonces sigo de largo
            if cant_rest == 0:
                continue

            #si la cantidad restante alcanza para cubrir los EP que gasto el usuario, termino el loop y actualizo ese deposito
            elif cant_rest >= ep_restantes:
                NegocioEcoPuntos.updateEps(ep.id, cant = cant_rest-ep_restantes)
                break

            #si no alcanza, actualizo ese deposito y sigo con el siguiente
            else:
                NegocioEcoPuntos.updateEps(ep.id, cant = 0)
                ep_restantes -= cant_rest
        return nueva_cant_ep
            


    @classmethod
    def addEP(cls,id, totalEP):
        """
        Agrega EPs al usuario tras cancelar un pedido
        """
        user = DatosUsuario.get_by_id(id)
        nueva_cant_ep = user.totalEcopuntos + totalEP
        ep_restantes = totalEP
        deps_ordenados = sorted(user.depositos, key=lambda x: x.fechaDeposito,reverse=True)
        
        #para cada deposito
        for dep in deps_ordenados:

            #agarro los EP que le corresponden y su cantidad utilizada
            ep = dep.ecoPuntos
            cant_total = ep.cantidad
            cant_rest = ep.cantidadRestante
            cant_utilizada = cant_total-ep.cantidadRestante

            #si la cantidad utilizada es 0, sigo de largo
            if cant_utilizada < 1:
                continue

            #si la cantidad utilizada alcanza para cubrir los EP que le agrego el usuario, termino el loop y actualizo ese deposito
            elif cant_utilizada >= ep_restantes:
                NegocioEcoPuntos.updateEps(ep.id, cant = cant_rest+ep_restantes)
                break

            #si no alcanza, actualizo ese deposito y sigo con el siguiente
            else:
                NegocioEcoPuntos.updateEps(ep.id, cant = cant_total)
                ep_restantes -= cant_utilizada
        return nueva_cant_ep


    @classmethod
    def get_by_id(cls,uid):
        try:
            return DatosUsuario.get_by_id(uid)
        except Exception as e:
            raise e


    @classmethod
    def update_nivel(cls,uid,eps):
        nuevo_nivel = NegocioNivel.obtiene_nivel(eps)
        DatosUsuario.update_nivel(uid,nuevo_nivel.id)

    @classmethod
    def update_email(cls,email,uid):
        try:
            #Valida RN18
            if cls.check_email(email):
                if email not in cls.get_all_emails(uid):
                    DatosUsuario.update_email(email,uid)
                else:
                    raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.update_email()",
                                                        msj="El email no puede estar repetido.")
            else:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.update_email()",
                                                        msj="El email tiene un formato incorrecto.") 
        except Exception as e:
            raise e
    
    @classmethod
    def update_documento(cls,nro,tipo,uid):
        try:
            #Valida RN30
            if str(nro).isalnum():
                #Valida RN20
                if str(nro) not in cls.get_all_documentos(uid):
                    DatosUsuario.update_documento(nro,tipo,uid)
                else:
                    raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.update_documento()",
                                                        msj="El número de documento no puede estar repetido.")
            else:
                raise custom_exceptions.ErrorDeNegocio(origen="negocio_usuario.update_documento()",
                                                        msj="El número de documento solo puede ser alfanumérico.")
 
        except Exception as e:
            raise e
    
    
    
    @classmethod
    def update_password(cls,psswd1,psswd2,uid):
        try:
            #Valida RN26, RN27 y RN28.
            if psswd1 == psswd2:
                if cls.check_password(psswd1):
                    DatosUsuario.update_password(psswd1,uid)
        except Exception as e:
            raise e


    @classmethod
    def update_img(cls,uid,img):
        try:
            DatosUsuario.update_img(uid,img)
        except Exception as e:
            raise e
    
    @classmethod
    def get_all_emails(cls,uid=None):
        try:
            if uid == None:
                return DatosUsuario.get_all_emails()
            else:
                return DatosUsuario.get_all_emails(uid)
        except Exception as e:
            raise e
            
    @classmethod
    def get_cant_usuarios(cls):
        try:
            return DatosUsuario.get_cant_usuarios()
        except Exception as e:
            raise e

    @classmethod
    def get_all_documentos(cls,uid=False):
        try:
            return DatosUsuario.get_all_documentos(uid)
        except Exception as e:
            raise e


    @classmethod
    def buscar_info_user(cls,busqueda):
        try:
            return DatosUsuario.buscar_info_user(busqueda)
        except Exception as e:
            raise e
    
    @classmethod
    def get_all(cls):
        try:
            return DatosUsuario.get_all()
        except Exception as e:
            raise e
