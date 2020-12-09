from flask import Flask, render_template, request, url_for, redirect, flash, jsonify, redirect
from negocio.negocio import *
app = Flask(__name__)

#Session
app.secret_key = 'myscretkey'

@app.route('/', methods = ['GET','POST'])
def main():
    return render_template('main.html')

# -- Niveles -- 

@app.route('/gestion-niveles')
def gestion_niveles():
    niveles = NegocioNivel.get_niveles()
    min_max_nivel = NegocioNivel.get_min_max_niveles()
    maxEP = NegocioNivel.get_max_ecoPuntos()
    maxDescuento = NegocioNivel.get_max_descuento()
    return render_template('gestion-niveles.html', 
                            niveles = niveles, 
                            min_nivel = min_max_nivel[0],

    max_level = min_max_nivel[1], maxEP = maxEP, maxDescuento = maxDescuento)

@app.route('/gestion-niveles/alta', methods = ['GET','POST'])
def alta_nivel():
    if request.method == 'POST':
        numeroNivel = request.form['numeroNivel']
        descuento = request.form['descuento']
        minEcoPuntos = request.form['minEcoPuntos']
        maxEcoPuntos = request.form['maxEcoPuntos']
        NegocioNivel.alta_nivel(numeroNivel, descuento, minEcoPuntos, maxEcoPuntos)
    return redirect(url_for('gestion_niveles'))

@app.route('/gestion-niveles/baja/<int:id>')
def baja_nivel(id):
    id = int(id)
    print(Negocio.baja_nivel(id))
    return redirect(url_for('gestion_niveles'))

@app.route('/gestion-niveles/modificacion/<int:id>')
def mod_nivel(id):
    id = int(id)
    desc_ant_post = Negocio.getDescuentosAntPost(id)
    #desc_ant_post = {'anterior':5,'posterior':10}
    return jsonify(desc_ant_post)

# -- Entidades Destino -- 

@app.route('/gestion-ed', methods = ['GET','POST'])
def gestion_ed():
    entidades = Negocio.get_entidades_destino()
    return render_template('gestion-entidades-destino.html', entidades = entidades)
    

@app.route('/gestion-ed/demandas/<id>')
def devolver_demandas(id):
    #TODO: evitar esta vuelta a BD
    #TODO: revisar cómo verificar que sólo se cargue una demanda por TA
    e = Negocio.get_one_entidad_destino(id)
    a = Negocio.get_articulos([i.idTipoArticulo for i in e.demandas])

    demandas_present = [{"nombre":          d[1].nombre,
                         "cantidad":        d[0].cantidad, 
                         "unidadmedida":    d[1].unidadMedida}
                        for d in list(zip(e.demandas,a))]        

    return jsonify(demandas_present)

@app.route('/gestion-ed/salidas/<id>')
def devolver_salidas(id):
    #TODO: evitar esta vuelta a BD
    e = Negocio.get_one_entidad_destino(id)
    a = Negocio.get_articulos([i.idTipoArticulo for i in e.salidas])
    salidas_present =  [{"nombre": "todavia no desarrollado"} ]      
    return jsonify(salidas_present)

@app.route('/gestion-ed/alta', methods = ['GET','POST'])
def alta_entidad_destino():
    if request.method == 'POST':
        nombre = request.form['nombre']
        try:
            Negocio.alta_entidad_destino(nombre)
        except Exception as e:
            raise e
        return redirect(url_for('gestion_ed'))

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
