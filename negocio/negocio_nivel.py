from negocio.negocio import Negocio
from negocio.negocio_usuario import NegocioUsuario
import custom_exceptions
from utils import Utils
from data.data_nivel import DatosNivel
from classes import Nivel
import operator

class NegocioNivel(Negocio):
    """Clase que representa la capa de negocio para la entidad Nivel. Hereda de Negocio."""                                           

    @classmethod
    def get_niveles(cls):
        """
        Obtiene todos los niveles de la BD.
        """
        #Conexión con el motor de BD.
        try:
            niveles = DatosNivel.get_niveles()
            for nivel in niveles:
                nivel.descuento = Utils.replace_dots(nivel.descuento, 1)
                nivel.minimoEcoPuntos = Utils.replace_dots(nivel.minimoEcoPuntos,0)
                nivel.maximoEcoPuntos = Utils.replace_dots(nivel.maximoEcoPuntos,0)
            return niveles

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo los niveles de la capa de\
                                                         Datos.")
    
    @classmethod    
    def get_min_max_niveles(cls):
        """
        Obtiene el mínimo y el máximo nivel de la BD. Devuelve una lista de la
        forma: [min, max]
        """
        try:
            niveles = DatosNivel.get_niveles()
            max_nivel = (max(niveles, key= operator.attrgetter('nombre')).nombre)
            min_nivel = (min(niveles, key= operator.attrgetter('nombre')).nombre)
            return [min_nivel, max_nivel]

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_niveles()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         calculando el máximo/mínimo nivel.")

    @classmethod
    def get_nivel_id(cls, id):
        """
        Obtiene un nivel en base a su ID de la BD.
        """
        try:
            nivel = DatosNivel.get_nivel_id(id)
            return nivel

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_nivel_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un nivel en base su ID de\
                                                         la capa de Datos.")
    
    @classmethod
    def get_nivel_nombre(cls, nombre):
        """
        Obtiene un nivel en base a su nombre de la BD.
        """
        try:
            nivel = DatosNivel.get_nivel_nombre(nombre)
            return nivel

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_nivel_nombre()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un nivel en base su \
                                                         nombre de la capa de Datos.")
    
    @classmethod
    def alta_nivel(cls, numeroNivel, descuento, minEcoPuntos, maxEcoPuntos):
        """
        Realiza las validaciones de negocio de un nivel, y si no hay errores, instancia el 
        nuevo nivel y llama al método de la Capa de Datos que lo registra en la BD.
        """
        try:
            #Reestructuración de los datos:
            max_nivel = int(cls.get_min_max_niveles()[1])
            max_level = DatosNivel.get_nivel_nombre(max_nivel)
            maxDescuento = Utils.round_float(DatosNivel.get_max_descuento(), 2)
            maxEP = Utils.round_float(DatosNivel.get_max_ecoPuntos(),1)
            minEcoPuntos = int(Utils.round_float(minEcoPuntos,0))
            maxEcoPuntos = int(Utils.round_float(maxEcoPuntos,0))
            descuento = Utils.round_float(descuento,2)
            
            #Validación de Reglas de Negocio:
            if max_level.descuento == 100:
                #Valida regla RN06
                return "Error al añadir el nivel. No se pueden añadir más niveles ya que hay uno con un descuento del 100%. Para añadir otro nivel, modifique primero el descuento del último nivel existente."
            elif int(numeroNivel) != int(max_nivel + 1):
                #Valida regla RN01
                return "Error al añadir el nivel. El número de nivel no es correcto."
            elif Utils.round_float(minEcoPuntos,2) >= Utils.round_float(maxEcoPuntos,2):
                #Valida regla RN02
                return "Error al añadir el nivel. El mínimo de EcoPuntos no puede ser menor al\
                        máximo de EcoPuntos del máximo nivel."
            elif descuento < maxDescuento:
                #Valida regla RN03
                return "Error al añadir el nivel. El descuento no puede ser menor al máximo \
                        descuento asignado (" + str(maxDescuento) + "%)."
            elif descuento < 0 or descuento > 100:
                #Valida regla RN04
                return "Error al añadir el nivel. El descuento debe estar entre 0% y 100%."
            elif minEcoPuntos != (int(Utils.round_float(maxEP,0)) + 1):
                #Valida regla RN05
                return "Error al añadir nivel. El mínimo de EcoPuntos debe ser\
                     " + str(int(Utils.round_float(maxEP,0))) + " EcoPuntos."
            else:
                nivel = Nivel(None, numeroNivel, minEcoPuntos, maxEcoPuntos, descuento)
                if DatosNivel.alta_nivel(nivel):
                    res = NegocioUsuario.actualiza_nivel_all()
                    if res == True:
                        return True
                    else:
                        return "Error actualizando el nivel de los usuarios en la Base de Datos. Las modificaciones en los niveles se han realizado con éxito. Intente actualizar los niveles de los usuarios manualmente más tarde."
                else:
                    return "Error al añadir nivel a la Base de Datos. Intente nuevamente más tarde."
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.alta_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         dando de alta un nuevo nivel.")

    @classmethod
    def obtiene_nivel(cls, ecoPuntos):
        """
        Esta función devuelve el nivel al que pertenece una determinada cantidad de EcoPuntos, 
        recibida como parametro.
        """
        try:
            niveles = DatosNivel.get_niveles()
            for nivel in niveles:
                if int(nivel.nombre) == len(niveles):
                    if int(ecoPuntos) >= int(nivel.minimoEcoPuntos):
                        return nivel
                    else:
                        return False
                else:
                    if (int(ecoPuntos) >= int(nivel.minimoEcoPuntos) and 
                        int(ecoPuntos) <= int(nivel.maximoEcoPuntos)):
                        return nivel
                    else:
                        return False
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.obtiene_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          calculando el nivel para una \
                                                          cantidad de EcoPuntos recibida como \
                                                          parámetro.")

    @classmethod
    def get_max_ecoPuntos(cls):
        """
        Obtiene el máximo de EcoPuntos asignados a un nivel.
        """
        try:
            return int(Utils.replace_dots(DatosNivel.get_max_ecoPuntos(),0))
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_max_ecoPuntos()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          obtieniendo el máximo de EcoPuntos \
                                                          del último nivel la capa de Datos.")

    @classmethod
    def get_max_descuento(cls):
        """
        Obtiene el máximo descuento asignado a un nivel.
        """
        try:
            return Utils.replace_dots(DatosNivel.get_max_descuento(),1)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.get_max_descuento()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          obtieniendo el máximo descuento de \
                                                          la capa de Datos.")

    @classmethod
    def baja_nivel(cls, id):
        """
        Da de baja un nivel en base a su nombre, validando primero las reglas de negocio pertinentes.
        """
        try:
            min_max_niveles = cls.get_min_max_niveles()
            min_nivel = min_max_niveles[0]
            max_nivel = min_max_niveles[1]
            nivel = cls.get_nivel_id(id)
            if nivel == False:
                return "Error 1 eliminando nivel de la Base de Datos. Intente nuevamente más \
                    tarde."
            else:
                if int(nivel.nombre) == 1:
                    #Valida regla RN09.
                    if int(max_nivel) == int(nivel.nombre):
                        return "Error al eliminar nivel. No se puede eliminar el nivel 1 si no\
                            existen otros niveles."
                    else:
                        nuevo_min = 0
                        if DatosNivel.baja_nivel(nuevo_min, None, None, None, nivel):
                            res = NegocioUsuario.actualiza_nivel_all()
                            if res == True:
                                return True
                            else:
                                return "Error actualizando el nivel de los usuarios en la Base de Datos. Las modificaciones en los niveles se han realizado con éxito. Intente actualizar los niveles de los usuarios manualmente más tarde."
                        else:
                            return "Error eliminando nivel de la Base de Datos. Intente \
                                nuevamente más tarde."
                elif int(nivel.nombre) == int(max_nivel):
                    factor_mod =  (nivel.maximoEcoPuntos - nivel.minimoEcoPuntos + 1)/2
                    nuevo_max = round(nivel.minimoEcoPuntos) - 1
                    nuevo_min = round(nivel.maximoEcoPuntos - factor_mod,0) + 1
                    if DatosNivel.baja_nivel(nuevo_min, 
                                        int(nivel.nombre) + 1, 
                                        nuevo_max, 
                                        int(nivel.nombre)-1, 
                                        nivel):
                        res = NegocioUsuario.actualiza_nivel_all()
                        if res == True:
                            return True
                        else:
                            return "Error actualizando el nivel de los usuarios en la Base de Datos. Las modificaciones en los niveles se han realizado con éxito. Intente actualizar los niveles de los usuarios manualmente más tarde."
                    else:
                        return "Error eliminando nivel de la Base de Datos. Intente nuevamente\
                             más tarde."
                else:
                    #Valida regla RN05 y RN10
                    factor_mod =  (nivel.maximoEcoPuntos - nivel.minimoEcoPuntos + 1)/2
                    nuevo_max = round(nivel.minimoEcoPuntos + factor_mod,0) - 1
                    nuevo_min = round(nivel.maximoEcoPuntos - factor_mod,0) + 1
                    if DatosNivel.baja_nivel(nuevo_min, 
                                        int(nivel.nombre) + 1, 
                                        nuevo_max, 
                                        int(nivel.nombre)-1, 
                                        nivel):
                        res = NegocioUsuario.actualiza_nivel_all()
                        if res == True:
                            return True
                        else:
                            return "Error actualizando el nivel de los usuarios en la Base de Datos. Las modificaciones en los niveles se han realizado con éxito. Intente actualizar los niveles de los usuarios manualmente más tarde."
                    else:
                        return "Error eliminando nivel de la Base de Datos. Intente nuevamente\
                             más tarde."

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.baja_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                          dando de baja un nivel.")
    

    
    @classmethod
    def getDescuentosAntPost(cls, numero):
        """
        Obtiene el descuento anterior y posterior en base a un determinado numero de nivel, y los devuelve en un diccionario.
        """
        try:
            maxLevel = int(DatosNivel.get_max_nivel().nombre)
            if numero == 1 and numero == maxLevel:
                anterior = 0           
                posterior = 100
            elif numero == 1:
                anterior = 0
                posterior = DatosNivel.get_nivel_nombre(int(numero)+1).descuento
            elif numero == maxLevel:
                anterior = DatosNivel.get_nivel_nombre(int(numero)-1).descuento
                posterior = 100.01
            else:
                anterior = DatosNivel.get_nivel_nombre(int(numero-1)).descuento
                posterior = DatosNivel.get_nivel_nombre(int(numero)+1).descuento
            result = {'anterior':anterior, 'posterior':posterior}
            return result
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio.getDescuentosAntPost()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo los descuentos de los niveles anteriores y posteriores a un nivel por numero.")


    
    @classmethod
    def nivel_validaciones_rn(cls, numero, descuento, minEP, maxEP):
        #TODO: validar que el descuento no sea mayor que 100.
        """
        Valida las Reglas de Negocio para un nivel, en base a los parametros recibidos. En caso de no cumplirse alguna, devuelve un string con el error de validación. Si pasa las validaciones, lo modifica en la BD.
        """
        try:

            sig_nivel = DatosNivel.get_nivel_nombre(int(numero)+1)
            ant_nivel = DatosNivel.get_nivel_nombre(int(numero)-1)

            if DatosNivel.get_nivel_nombre(numero) == False:
                return "Error, el nivel que se intenta modificar no existe en la Base de Datos."
            #Valida RN02
            elif maxEP <= minEP:
                return "Error, el máximo de EcoPuntos debe ser mayor al mínimo de EcoPuntos."
            #Valida RN14
            elif minEP < 0:
                return "Error, el mínimo de EcoPuntos no puede ser menor a 0."
            #Valida RN13
            elif maxEP == 0:
                return "Error, el máximo de EcoPuntos no puede ser igual a 0."
            #Valida RN04
            elif float(descuento) > 100:
                return "Error, el descuento no puede ser maayor al 100%."
            #Valida RN03
            elif sig_nivel != False:
                if int(NegocioNivel.get_min_max_niveles()[1]) == numero:
                    return True
                elif sig_nivel.descuento <= descuento:
                    return "Error, el descuento del nivel no puede ser mayor o igual al del nivel siguiente. Debe ser menor."
                elif ant_nivel != False:
                    if Nivel == 1:
                        return True
                    elif ant_nivel.descuento >= descuento:
                        return "Error, el descuento del nivel no puede ser menor o igual al del nivel anterior. Debe ser mayor."
                    else:
                        return True
                else:
                    return True
                
            #Valida RN03
            elif ant_nivel != False:
                if Nivel == 1:
                    return True
                elif ant_nivel.descuento >= descuento:
                    return "Error, el descuento del nivel no puede ser menor o igual al del nivel anterior. Debe ser mayor."
                elif sig_nivel != False:
                    if int(NegocioNivel.get_min_max_niveles()[1]) == numero:
                        return True
                    elif sig_nivel.descuento <= descuento:
                        return "Error, el descuento del nivel no puede ser mayor o igual al del nivel siguiente. Debe ser menor."
                    else:
                         return True
                else:
                    return True
            else:
                return True
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocioNivel.modifica_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio modificando un nivel.")



    @classmethod
    def modifica_nivel(cls, nivel, nuevo_des, nuevo_minEP, nuevo_maxEP):
        """
        Modifica un nivel en la BD, y valida las Reglas de Negocio pertinentes. En caso de no cumplirse alguna, devuelve un string con el error de validación.
        """
        try:
            max_level = int(cls.get_min_max_niveles()[1])
            nivel_mod = nivel
            validaciones = NegocioNivel.nivel_validaciones_rn(nivel,nuevo_des,nuevo_minEP,nuevo_maxEP)
            if validaciones == True:
                niveles_baja = []
                nuevo_nivel = DatosNivel.get_nivel_EP(nuevo_minEP)
                dif = int(nivel) - int(nuevo_nivel.nombre)
                #Movimiento de niveles en base al nuevo mínimo EcoPuntos.
                if dif > 0:
                    if int(nuevo_nivel.minimoEcoPuntos) == int(nuevo_minEP):
                        print(1)
                        #Eliminar nivel actual, y todos los que estan en el medio.
                        for i in range(int(nivel)-1,int(nuevo_nivel.nombre)-1,-1):
                            niveles_baja.append(i)
                    else:
                        #Modifico nivel actual
                        #Elimino SOLO los que estan en el medio.
                        print(2)
                        for i in range(int(nivel)-1,int(nuevo_nivel.nombre),-1):
                            niveles_baja.append(i)
                elif dif<0:
                    if int(nuevo_nivel.maximoEcoPuntos) == int(nuevo_minEP):
                        print(3)
                        #Eliminar nivel actual, y todos los que estan en el medio.
                        for i in range(int(nivel)+1,int(nuevo_nivel.nombre)+1):
                            niveles_baja.append(i)
                    else:
                        #Modifico nivl actual, y elimino SOLO los que estan en el medio.
                        print(4)
                        for i in range(int(nivel)+1,int(nuevo_nivel.nombre)):
                            niveles_baja.append(i)
                #Movimiento de niveles en base al nuevo máximo EcoPuntos.
                nuevo_nivel = DatosNivel.get_nivel_EP(nuevo_maxEP)
                dif = int(nivel) - int(nuevo_nivel.nombre)
                if dif < 0:
                    if int(nuevo_nivel.maximoEcoPuntos) == int(nuevo_maxEP) or int(nuevo_nivel.nombre) == max_level:
                        #Eliminar nivel actual, y todos los que estan en el medio.
                        print(5)
                        for i in range(int(nivel)+1,int(nuevo_nivel.nombre)+1):
                            niveles_baja.append(i)
                    else:
                        #Modifico nivel actual
                        #Elimino SOLO los que estan en el medio.
                        print(6)
                        for i in range(int(nivel)+1,int(nuevo_nivel.nombre)):
                            niveles_baja.append(i)
                
                elif dif>0:
                    if int(nuevo_nivel.minimoEcoPuntos) == int(nuevo_maxEP):
                        #Eliminar nivel actual, y todos los que estan en el medio.
                        print(7)
                        for i in range(int(nivel)-1,int(nuevo_nivel.nombre)-1):
                            niveles_baja.append(i)
                    else:
                        #Modifico nivel actual, y elimino SOLO los que estan en el medio.
                        print(8)
                        for i in range(int(nivel)-1,int(nuevo_nivel.nombre)):
                            niveles_baja.append(i)
                
                niveles_baja = list(dict.fromkeys(niveles_baja))
                return cls.modifica_nivel_logic(niveles_baja,nivel_mod,nuevo_des,nuevo_minEP,nuevo_maxEP)
                
            else:
                return validaciones

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocioNivel.modifica_nivel()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio modificando un nivel.")


    @classmethod
    def modifica_nivel_logic(cls,niveles_baja,nivel_mod,nuevo_des,nuevo_minEP,nuevo_maxEP):
        """
        Maneja la logica para el borrado de elementos en base a las modificaciones realizadas, y llama a la capa de datos para guardar estos cambios.
        """
        try:
            niveles = DatosNivel.get_niveles()
            niv = []
            for nivel in niveles:
                niv.append(int(nivel.nombre))
            nuevos_niveles = Utils.difference_between_lists(niv,niveles_baja)
            mas_cercano_inf = Utils.nearest_element(Utils.lower_higher_elements_than(nuevos_niveles,nivel_mod)[0],nivel_mod)
            mas_cercano_sup = Utils.nearest_element(Utils.lower_higher_elements_than(nuevos_niveles,nivel_mod)[1],nivel_mod)
            print('Más cercano inf:',mas_cercano_inf)
            print('Más cercano sup:',mas_cercano_sup)
            print('Los niveles que quedan son:', nuevos_niveles)
            print('Los niveles que se eliminan son:',niveles_baja)
            if DatosNivel.baja_nivel_mod(niveles_baja,nivel_mod,nuevo_des,nuevo_minEP,nuevo_maxEP,mas_cercano_inf,mas_cercano_sup,nuevos_niveles):
                res = NegocioUsuario.actualiza_nivel_all()
                if res == True:
                    return True
                else:
                    return "Error actualizando el nivel de los usuarios en la Base de Datos. Las modificaciones en los niveles se han realizado con éxito. Intente actualizar los niveles de los usuarios manualmente más tarde."
            else:
                return "Error modificando los niveles en la Base de Datos. Por favor, intente nuevamene más tarde."
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocioNivel.modifica_nivel_logic()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio en el manejo de la lógica de la modifiacion del nivel.")