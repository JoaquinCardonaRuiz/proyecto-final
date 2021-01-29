from utils import Utils
from negocio.capa_negocio import *
import time
from datetime import datetime, timedelta
import pytz
import math



today = datetime.today()

current_time = datetime.combine(today,current_time.time())
hora_hasta = datetime.combine(today,hora_hasta.time())

diff = (hora_hasta - current_time).total_seconds()/3600


frac, whole = math.modf(diff)
print("Cierra en", whole, "horas y", int(round(60*frac,0)),"minutos." )
