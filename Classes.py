import MySQLdb
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, Date, DateTime
from sqlalchemy import create_engine


#Conection to DataBase

#Parameters of the conections
password = '3936107'
host = 'localhost'

#Engine creation
engine = create_engine('mysql://root:'+ password + '@' + host + '/ecoasistente')
Base = declarative_base()
Base.metadata.bind = engine


#Tables/Classes

#Este es un ejemplo, borralo y cambialo por clases que vayan. Googlea la sintaxis, esta lleno de documentación de como usar Alchemy. 
#La conexión ya está hecha, te dejo la BD, reemplazá por tus parámetros, en cuanto pueda actualizo y pongo la BD remota.

class Persona(Base):
    __tablename__ = 'persona'
    id_persona = Column(Integer, primary_key=True)
    nombre = Column(String(30), nullable=False)
    fecha_nac = Column(DateTime, nullable=False)
    dni = Column(Integer, nullable=False)
    altura = Column(Integer, nullable=False)

#Create all tables on the DB.
def CreateTables():
    Base.metadata.create_all(engine)

