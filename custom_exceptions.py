""" Módulo de excepciones

Este módulo contiene las excepciones personalizadas delcaradas para este proyecto. Las mismas
heredan de una excepción personalizada base, identificada como CustomBaseException, la cual
a su vez hereda de la excepción base de python.

Los nombres de las excepciones mantendrán la convención para los nombres de clases de PEP8,
reiterada en el docstring de classes.py.
"""

class CustomBaseException(Exception):
    """ Excepción personalizada base. Hereda de la excepción base de Python, y contiene el
    comportamiento general para las excepciones personalizadas declaradas para este proyecto.
    
    Atributos:
        origen (string): nombre de la función donde ocurre la excepción.
        msj (string, optional): si esta excepción se elevó a partir de una excepción ajena, 
            este atributo contiene el mensaje de la excepción original. Si fue elevada
            manualmente, se debe dejar vacía para que tome su valor por defecto.
        msj_adicional (string, optional): detalles adicionales específicos de la excepción.
        nombre (string): nombre de la excepcion, para mostrar al usuario.
    """

    def __init__(self, 
                origen, 
                msj="Esta excepción fue elevada manualmente", 
                msj_adicional="No hay mensajes adicionales"):

        self.origen = origen
        self.msj = msj
        self.msj_adicional = msj_adicional
        self.nombre = "Excepción base personalizada"

    def __repr__(self):
        repr =  self.nombre \
                + "Origen: " + self.origen + "\n" \
                + "Mensaje: " + self.msj + "\n" \
                + "Mensaje Adicional: " + self.msj_adicional + "\n"
        return(repr)

    def __str__(self):
        return(self.__repr__())
    

class ErrorDeConexion(CustomBaseException):
    """ Excepción correspondiente a un error de conexión con una entidad externa"""

    def __init__(self, 
                origen, 
                msj="Esta excepción fue elevada manualmente", 
                msj_adicional="No hay mensajes adicionales"):

        super().__init__(origen,msj,msj_adicional)
        self.nombre = "Error de conexión."

class ErrorReglaDeNegocio(CustomBaseException):
    """ Excepción correspondiente a un error debido a un valor ingresado por el usuario"""

    def __init__(self, 
                origen, 
                msj="Esta excepción fue elevada manualmente", 
                msj_adicional="No hay mensajes adicionales"):

        super().__init__(origen,msj,msj_adicional)
        self.nombre = "Error de valor ingresado por el usuario."

class ErrorDeNegocio(CustomBaseException):
    """ Excepción correspondiente a un error durante el procesamiento de la capa de negocio"""

    def __init__(self, 
                origen, 
                msj="Esta excepción fue elevada manualmente", 
                msj_adicional="No hay mensajes adicionales"):

        super().__init__(origen,msj,msj_adicional)
        self.nombre = "Error de negocio."