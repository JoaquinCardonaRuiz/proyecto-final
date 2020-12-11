from data.data import Datos
import custom_exceptions
from classes import Nivel
from utils import Utils


class DatosNivel(Datos):
    @classmethod
    def get_niveles(cls):
        """
        Obtiene todos los niveles de la BD.
        """
        cls.abrir_conexion()
        try:
            sql = ("select * from niveles")
            cls.cursor.execute(sql)
            niveles_ = cls.cursor.fetchall()
            niveles = []
            for nivel in niveles_:
                nivel_ = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                niveles.append(nivel_)
            return niveles
            
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error obtieniendo los \
                                                        niveles desde la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def alta_nivel(cls, nivel):
        """Añade el nivel que recibe como parametro a la BD."""
        cls.abrir_conexion()
        try:
            sql = ("INSERT INTO niveles (nombre, minEcoPuntos, maxEcoPuntos, descuento) \
                    VALUES (%s, %s, %s, %s);")
            values = (nivel.nombre, nivel.minimoEcoPuntos, nivel.maximoEcoPuntos, nivel.descuento)
            cls.cursor.execute(sql, values)
            cls.db.commit()
            return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.alta_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de alta un \
                                                        nivel en la BD.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_nivel_id(cls, id):
        cls.abrir_conexion()
        """Obtiene un nivel de la BD en base a un ID. Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("select * from niveles where idNivel = %s")
            values = (id,)
            cls.cursor.execute(sql, values)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                return False
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_id",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un nivel \
                                                        en base al id recibido como \
                                                        parámetro.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_nivel_nombre(cls, nombre):
        cls.abrir_conexion()
        """Obtiene un nivel de la BD en base a un Numero de nivel (Nombre). Devuelve False si no encuentra 
        ninguno.
        """
        try:
            sql = ("select * from niveles where nombre = %s")
            values = (str(nombre),)
            cls.cursor.execute(sql, values)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                return False
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_nombre",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo un nivel \
                                                        en base al nombre recibido como \
                                                        parámetro.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def baja_nivel(cls, nuevo_min, nombre_min, nuevo_max, nombre_max, nivel):
        cls.abrir_conexion()
        """Elimina un nivel, y modifica el máximo de EcoPuntos del nivel anterior, y el máximo 
        de EcoPuntos del nivel siguiente.
        """
        try:
            if int(nivel.nombre) == 1:
                #Actualiza el mínimo del nivel siguiente, ya que no existe nivel anterior.
                sql = ("UPDATE niveles SET minEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_min, str(int(nivel.nombre) + 1))
                cls.cursor.execute(sql, values)
                
                #Elimina el nivel en base al ID recibido.
                sql = ("DELETE FROM niveles WHERE idNivel = %s")
                values = (str(nivel.id),)
                cls.cursor.execute(sql, values)

                #Disminuye en una unidad los nombres de los niveles posteriores.
                sql = ("UPDATE niveles SET nombre = nombre-1 WHERE nombre > %s;")
                values = (str(nivel.nombre))
                cls.cursor.execute(sql, values)

                cls.db.commit()


                return True

            else:
                #Actualiza mínimo del nivel siguiente.
                sql = ("UPDATE niveles SET minEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_min, str(nombre_min))
                cls.cursor.execute(sql, values)
                
                #Actualia máximo del nivel anterior.
                sql = ("UPDATE niveles SET maxEcoPuntos = %s WHERE nombre = %s")
                values = (nuevo_max, str(nombre_max))
                cls.cursor.execute(sql, values)

                #Elimina el nivel en base al ID recibido.
                sql = ("DELETE FROM niveles WHERE idNivel = %s")
                values = (str(nivel.id),)
                cls.cursor.execute(sql, values)

                #Disminuye en una unidad los nombres de los niveles posteriores.
                sql = ("UPDATE niveles SET nombre = nombre-1 WHERE nombre > %s;")
                values = (str(nivel.nombre),)
                cls.cursor.execute(sql, values)
                
                cls.db.commit()

                return True
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.baja_nivel",
                                                    msj=str(e),
                                                    msj_adicional="Error dando de baja un \
                                                    nivel de la BD.")
        finally:
            cls.cerrar_conexion()
    
        
    @classmethod
    def get_max_nivel(cls):
        cls.abrir_conexion()
        """Obtiene el nivel mas grande registrado en la BD. Si no hay niveles registrados, devuelve False.
        """
        try:
            sql = ("select * from Niveles where nombre = (select max(nombre) from niveles);")
            cls.cursor.execute(sql)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                return False
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_max_nivel",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo el maximo nivel de la BD.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def baja_nivel_nombre(cls, nombre):
        cls.abrir_conexion()
        """Elimina un nivel de la BD en base al nombre recibido.
        """
        try:
            sql = ("DELETE FROM niveles WHERE nombre = %s")
            values = (nombre,)
            cls.cursor.execute(sql, values)    
            cls.db.commit()
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_nivel.baja_nivel_nombre",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un nivel de la BD en base al nombre.")
        finally:
            cls.cerrar_conexion()
    
    @classmethod
    def baja_nivel_mod(cls, niveles_baja, nivel_mod, desc, minEP, maxEP, inf, sup, nuevos_niveles):
        cls.abrir_conexion()
        """Elimina un nivel de la BD en base al nombre recibido.
        """
        try:
            #Elimina niveles en la lista de niveles a eliminar
            for nivel in niveles_baja:
                sql = ("DELETE FROM niveles WHERE nombre = %s")
                values = (nivel,)
                cls.cursor.execute(sql, values) 

            #Actualiza los valores del nivel modificado
            sql = ("UPDATE niveles SET maxEcoPuntos = %s, minEcoPuntos = %s, descuento = %s WHERE nombre = %s")
            values = (maxEP, minEP, desc, nivel_mod)
            cls.cursor.execute(sql, values)

            #Actualiza los valores de los niveles contiguos:
            if inf != False:
                sql = ("UPDATE niveles SET maxEcoPuntos = %s WHERE nombre = %s")
                values = (int(minEP)-1, inf)
                cls.cursor.execute(sql, values)
            
            if sup != False:
                sql = ("UPDATE niveles SET minEcoPuntos = %s WHERE nombre = %s")
                values = (int(maxEP)+1, sup)
                cls.cursor.execute(sql, values)

            #TODO: terminar numeracion

            
            cls.db.commit() 
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data_nivel.baja_nivel_nombre",
                                                    msj=str(e),
                                                    msj_adicional="Error eliminando un nivel de la BD en base al nombre.")
        finally:
            cls.cerrar_conexion()


    @classmethod
    def get_max_descuento(cls):
        """Devuelve el mayor descuento registrado en la BD."""
        cls.abrir_conexion()
        try:
            sql = ("select max(descuento) from niveles;")
            cls.cursor.execute(sql)
            maxDescuento = cls.cursor.fetchall()[0][0]
            return maxDescuento
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo descuento \
                                                         de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_max_ecoPuntos(cls):
        cls.abrir_conexion()
        """Devuelve la mayor cantidad EcoPuntos solicitada para un nivel registrado en la 
        BD.
        """
        try:
            sql = ("select max(maxEcoPuntos) from niveles;")
            cls.cursor.execute(sql)
            maxEP = cls.cursor.fetchall()[0][0]
            return maxEP
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_entidades_destino()",
                                                    msj=str(e),
                                                    msj_adicional="Error el máximo de \
                                                        EcoPuntos de un nivel desde la BD.")
        finally:
            cls.cerrar_conexion()

    @classmethod
    def get_nivel_EP(cls, ecoPuntos):
        cls.abrir_conexion()
        """Obtiene el nivel al que corresponde una determinada cantidad de ecoPuntos.
        """
        try:
            sql = ("select * from Niveles where minEcoPuntos <= %s and maxEcoPuntos >= %s")
            values = (str(ecoPuntos), str(ecoPuntos),)
            cls.cursor.execute(sql, values)
            nivel = cls.cursor.fetchone()
            if nivel == None:
                sql = ("select * from niveles where nombre = (select max(nombre) from niveles where minEcoPuntos <= %s);")
                values = (str(ecoPuntos),)
                cls.cursor.execute(sql, values)
                nivel = cls.cursor.fetchone()
                if nivel == None:
                    return False
                else:
                    nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                    return nivel
            else:
                nivel = Nivel(nivel[0], nivel[1], nivel[2], nivel[3], nivel[4])
                return nivel
        except Exception as e:
            raise custom_exceptions.ErrorDeConexion(origen="data.get_nivel_EP",
                                                    msj=str(e),
                                                    msj_adicional="Error obteniendo el nivel en base a los EcoPuntos de la BD.")
        finally:
            cls.cerrar_conexion()