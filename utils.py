import custom_exceptions

class Utils():
    """Clase con funciones de utilidad para el programa."""

    @classmethod
    def replace_dots(cls, number, decimals):
        """
        Redondea la cantidad de decimales del número recibido como parámetro, y reemplaza el 
        punto por una coma para denotarlos.
        """
        try:
            if decimals == 0:
                number = str(int(round(float(number),decimals))).replace('.', ',')
                return number
            else:
                if (number).is_integer():
                    number = str(int(number)).replace('.', ',')
                else:
                    number = str(round(float(number),decimals)).replace('.', ',') 
                return number
        except Exception as e:
           raise custom_exceptions.ErrorDeNegocio(origen="negocio.replace_dots()",
                                                   msj=str(e),
                                                   msj_adicional="Error formateando los \
                                                       números.")
    
    @classmethod
    def round_float(cls, number, decimals):
        """
        Redondea la cantidad de decimales del número recibido como parámetro, y reemplaza el 
        punto por una coma para denotarlos.
        """
        try:
            if decimals == 0:
                number = float(str(number).replace(',', '.'))
                return number
            else:
                number = round(float(str(number).replace(',', '.')),decimals)
                return number
        except Exception as e:
           raise custom_exceptions.ErrorDeNegocio(origen="negocio.replace_dots()",
                                                   msj=str(e),
                                                   msj_adicional="Error formateando los \
                                                       números.") 
    @classmethod
    def difference_between_lists(cls, lista1, lista2):
        """
        Obtiene la diferencia de la lista 1 con repsecto de la lista 2 listas, y devuelve el resultado.
        """
        try:
           return list(set(lista1).difference(lista2))
        except Exception as e:
           raise custom_exceptions.ErrorDeNegocio(origen="utils.difference_between_lists()",
                                                   msj=str(e),
                                                   msj_adicional="Error obteniendo la diferencia entre dos listas.")
    @classmethod
    def lower_higher_elements_than(cls, lista, valor):
        """
        Filtra de una lista, aquellos elementos que son menores que el valor pasado como parametro, y aquellos que son mayores. Devuelve una lista para cada caso de la forma [[menores], [mayores]]
        """
        try:
            mayores = sorted(i for i in lista if i > valor)
            menores = sorted(i for i in lista if i < valor)
            return [menores, mayores]
        except Exception as e:
           raise custom_exceptions.ErrorDeNegocio(origen="utils.difference_between_lists()",
                                                   msj=str(e),
                                                   msj_adicional="Error obteniendo elementos menores y mayores.")
    
    @classmethod
    def nearest_element(cls, lista, valor):
        """
        Encuentra el valor más cercano al que recibe como parámetro dentro de una lista.
        """
        try:
            if len(lista) > 0:
                absolute_difference_function = lambda list_value : abs(list_value - valor)
                return min(lista, key=absolute_difference_function)
            else:
                return False
        except Exception as e:
           raise custom_exceptions.ErrorDeNegocio(origen="utils.nearest_element()",
                                                   msj=str(e),
                                                   msj_adicional="Error obteniendo el elemento más cercano.")
    
    