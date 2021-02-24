from negocio.negocio import Negocio
from data.data_insumo import DatosInsumo
from data.data_cant_material import DatosCantMaterial
import custom_exceptions

class NegocioInsumo(Negocio):

    @classmethod
    def get_by_id(cls,id):
        """
        Obtiene todos un insumos de la BD a partir de su id.
        """
        try:
            insumo = DatosInsumo.get_by_id(id)
            return insumo

        except Exception as e:
            raise e
    
    
    @classmethod
    def get_all(cls):
        """
        Obtiene todos los insumos de la BD.
        """
        try:
            insumos = DatosInsumo.get_all()
            return insumos

        except Exception as e:
            raise e


    @classmethod
    def add(cls,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,color,cants):
        """
        Agrega un insumo a la BD
        """
        try:
            costoTotal = float(costoMateriales)+float(costoProduccion)+float(otrosCostos)
            idIns = DatosInsumo.add(nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color)
            for c in cants:
                DatosCantMaterial.addComponente(c["idMat"],idIns,c["cantidad"])
        except Exception as e:
            raise(e)


    @classmethod
    def update(cls,idIns,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,color,mats):
        """
        Actualiza un insumo en la BD
        """
        try:
            materiales = cls.get_by_id(int(idIns)).materiales
            print("Materiales originales:", str([m.idMaterial for m in materiales]))
            print("Materiales nuevos:", str([m.idMaterial for m in mats]))
            for m in mats:
                if m.idMaterial in [i.idMaterial for i in materiales]:
                    if m.cantidad == 0:
                        # delete
                        DatosCantMaterial.deleteComponente(m.idMaterial,idIns)
                        print("Delete mat: " + str(m.idMaterial))
                    elif m.cantidad != [i.cantidad for i in materiales if i.idMaterial == m.idMaterial ][0]:
                            # update
                            DatosCantMaterial.updateComponente(m.idMaterial,idIns,m.cantidad)
                            print("Update mat: " + str(m.idMaterial))
                elif m.cantidad > 0:
                        # add
                        DatosCantMaterial.addComponente(m.idMaterial,idIns,m.cantidad)
                        print("Add mat: " + str(m.idMaterial))




            costoTotal = float(costoMateriales)+float(costoProduccion)+float(otrosCostos)
            DatosInsumo.update(idIns,nombre,unidad,costoMateriales,costoProduccion,otrosCostos,costoTotal,color)
        except Exception as e:
            raise(e)


    @classmethod
    def delete(cls,id):
        """
        Elimina un insumo de la BD a partir de su id
        """
        try:
            DatosInsumo.delete(id)
        except Exception as e:
            raise e