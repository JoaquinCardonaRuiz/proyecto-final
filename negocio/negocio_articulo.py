from negocio.negocio import Negocio
import custom_exceptions
from data.data_articulo import DatosArticulo
from data.data_valor import DatosValor
from data.data_cant_insumo import DatosCantInsumo
from datetime import datetime

class NegocioArticulo(Negocio):
    """Clase que representa la capa de negocio para la entidad Articulo. Hereda de Negocio.""" 

    @classmethod
    def get_all(cls):
        """
        Obtiene todas los tipos de articulo de la BD.
        """
        try:
            articulos = DatosArticulo.get_all()
            return articulos

        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.get_all()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo los tipos de articulo de \
                                                         la capa de Datos.")

    @classmethod
    def get_by_id(cls, id):
        """
        Obtiene un TipoArticulo de la BD segun su ID
        """
        try:
            articulo = DatosArticulo.get_by_id(id)
            return articulo
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.get_by_id()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio\
                                                         obtieniendo un tipo de articulo de \
                                                         la capa de Datos.")

    @classmethod
    def get_by_id_array(cls, ids):
        """
            Obtiene TiposArticulos de la BD en base a una lista de IDs
        """
        print("entre a negocioarticulo")
        try:
            articulos = []
            for id in ids:
                print("getting art: "+str(id))
                articulos.append(cls.get_by_id(int(id)))
            return articulos
        except Exception as e:
            raise e

    @classmethod
    def get_by_not_in_id_array(cls, ids):
        """
        Obtiene TiposArticulos de la BD en base a los que no estan en una lista de IDs
        """
        try:
            articulos = DatosArticulo.get_by_not_in_id_array(ids)
            return articulos
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.get_by_not_in_id_array()",
                                                    msj=str(e),
                                                    msj_adicional="Error en la capa de Negocio obtieniendo tipos de articulo de la capa de Datos.")

    @classmethod
    def add(cls,nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,valor,cants):
        """
        Agrega un articulo a la BD
        """
        try:
            costoTotal = float(costoInsumos)+float(costoProduccion)+float(otrosCostos)
            margen=float(margen)/100
            idArt = DatosArticulo.add(nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,costoTotal)
            DatosValor.add(idArt,datetime.now().strftime('%Y-%m-%d %H:%M:%S'),valor)
            for c in cants:
                DatosCantInsumo.addComponente(c["idIns"],idArt,c["cantidad"])
            return idArt
        except Exception as e:
            raise(e)

    @classmethod
    def update(cls,idArt,nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,valor,ins):
        """
        Actualiza un articulo en la BD
        """
        try:
            insumos = cls.get_by_id(int(idArt)).insumos
            for i in ins:
                if i.idInsumo in [j.idInsumo for j in insumos]:
                    if i.cantidad == 0:
                        # delete
                        DatosCantInsumo.deleteComponente(i.idInsumo,idArt)
                        print("Delete ins: " + str(i.idInsumo))
                    elif i.cantidad != [j.cantidad for j in insumos if j.idInsumo == i.idInsumo ][0]:
                            # update
                            DatosCantInsumo.updateComponente(i.idInsumo,idArt,i.cantidad)
                            print("Update ins: " + str(i.idInsumo))
                elif i.cantidad > 0:
                        # add
                        DatosCantInsumo.addComponente(i.idInsumo,idArt,i.cantidad)
                        print("Add mat: " + str(i.idInsumo))
            

            costoTotal = float(costoInsumos)+float(costoProduccion)+float(otrosCostos)
            margen=float(margen)/100
            DatosArticulo.update(idArt, nombre,unidad,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,costoTotal)
            valor_anterior = DatosValor.get_from_TAid(idArt)
            if valor_anterior[2] != float(valor):
                DatosValor.add(idArt,datetime.now().strftime('%Y-%m-%d %H:%M:%S'),valor)
        except Exception as e:
            raise(e)

    
    @classmethod
    def delete(cls,id):
        """
        Elimina un artículo de la BD a partir de su id
        """
        try:
            DatosArticulo.delete(id)
        except Exception as e:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.delete()",
                                                   msj=str(e),
                                                   msj_adicional="Error en la capa de Negocio eliminando un artículo de la base de Datos")


    @classmethod
    def get_recommendations(cls,id_articulo,carrito):
        filtro = [id_articulo] + [i.idTipoArticulo for i in carrito]
        return DatosArticulo.get_by_not_in_id_array_user(filtro,4)


    @classmethod
    def disminuirStock(cls,idTA,cant):
        nueva_cant = DatosArticulo.get_by_id(idTA).stock - cant
        DatosArticulo.updateStock(idTA,nueva_cant)

    @classmethod
    def checkStock(cls,idTA,cant):
        articulo = DatosArticulo.get_by_id(idTA)
        nueva_cant = articulo.stock - cant
        if nueva_cant < 0:
            raise custom_exceptions.ErrorDeNegocio(origen="negocio_articulo.disminuirStock()",msj="error-stock",msj_adicional="Stock insuficiente para realizar pedido")


    @classmethod
    def get_nombres_by_idIns(cls,idIns):
        try:
            return DatosArticulo.get_nombres_by_idIns(idIns)
        except Exception as e:
            raise e


    @classmethod
    def update_img(cls,aid,img):
        try:
            DatosArticulo.update_img(aid,img)
        except Exception as e:
            raise e