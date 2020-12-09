from classes import Nivel
from negocio.negocio import *

nivel = NegocioNivel.obtiene_nivel(9000)
print('Este usuario pertenece al nivel ' + nivel.nombre)