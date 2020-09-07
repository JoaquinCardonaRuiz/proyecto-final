from classes import Nivel
from negocio import Negocio

nivel = Negocio.obtiene_nivel(9000)
print('Este usuario pertenece al nivel ' + nivel.nombre)