from utils import Utils
from negocio.capa_negocio import *
import time
from datetime import datetime, timedelta
import pytz
import math
import random
import re

regex = '(<)?(\w+@\w+(?:\.\w+)+)(?(1)>|$)'
if(re.search(regex,'jajaja@gmail.')):  
    print('yes')
else:  
    print('no')