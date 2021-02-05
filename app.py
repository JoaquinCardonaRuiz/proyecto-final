from flask import Flask, render_template, request, url_for, redirect, flash, jsonify, redirect
from negocio.capa_negocio import *
from utils import Utils
app = Flask(__name__)

#Session
app.secret_key = 'myscretkey'

@app.route('/', methods = ['GET','POST'])
def start():
    return render_template('start-page.html')

@app.route('/main', methods = ['GET','POST'])
def main():
    return render_template('main.html')

''' 
    -------
    Niveles
    -------
'''


@app.route('/gestion-niveles')
def gestion_niveles():
    try:
        niveles = NegocioNivel.get_niveles()
        min_max_nivel = NegocioNivel.get_min_max_niveles()
        maxEP = NegocioNivel.get_max_ecoPuntos()
        maxDescuento = NegocioNivel.get_max_descuento()
    except Exception as e:
        return error(e, "gestion_niveles")
    return render_template('gestion-niveles.html', 
                            niveles = niveles, 
                            min_nivel = min_max_nivel[0],

    max_level = min_max_nivel[1], maxEP = maxEP, maxDescuento = maxDescuento)

@app.route('/gestion-niveles/alta', methods = ['GET','POST'])
def alta_nivel():
    if request.method == 'POST':
        try:
            numeroNivel = request.form['numeroNivel']
            descuento = request.form['descuento']
            minEcoPuntos = request.form['minEcoPuntos']
            maxEcoPuntos = request.form['maxEcoPuntos']
            NegocioNivel.alta_nivel(numeroNivel, descuento, minEcoPuntos, maxEcoPuntos)
        except Exception as e:
            return error(e,"gestion_niveles")
    return redirect(url_for('gestion_niveles'))

@app.route('/gestion-niveles/mod/<id>/<desc>/<min>/<max>')
def mod_nivel(id, desc, min, max):
    try:
        numero = int(id)
        desc = float(desc)
        minEP = float(min)
        maxEP = float(max)
        NegocioNivel.modifica_nivel(numero,desc,minEP,maxEP)
    except Exception as e:
        return error(e,"gestion_niveles")
    return redirect(url_for('gestion_niveles'))
  
@app.route('/gestion-niveles/baja/<int:id>')
def baja_nivel(id):
    try:
        id = int(id)
        NegocioNivel.baja_nivel(id)
    except Exception as e:
        return error(e,"gestion_niveles")
    return redirect(url_for('gestion_niveles'))

@app.route('/gestion-niveles/modificacion/<int:id>')
def mod_nivel_request(id):
    try:
        id = int(id)
        desc_ant_post = NegocioNivel.getDescuentosAntPost(id)
        return jsonify(desc_ant_post)
    except Exception as e:
        return error(e,"gestion_niveles")




''' 
    -----------------
    Entidades Destino
    -----------------
'''

@app.route('/gestion-ed', methods = ['GET','POST'])
def gestion_ed():
    try:
        entidades = NegocioEntidadDestino.get_all()
    except Exception as e:
        return error(e,"gestion_ed")
    return render_template('gestion-entidades-destino.html', entidades = entidades)


@app.route('/gestion-ed/articulos', methods = ['GET','POST'])
def get_articulos():
    try:
        articulos = NegocioArticulo.get_all()
        arts_json = [{"nombre":         a.nombre,
                      "unidadmedida":   a.unidadMedida,
                      "id":             a.id,
                      "stock":          a.stock,
                      "valor":          a.valor.valor}
                      for a in articulos]
        return arts_json
    except Exception as e:
        return error(e,"gestion_ed")

@app.route('/gestion-ed/salidas/<id>')
def devolver_salidas(id):
    try:
        e = NegocioEntidadDestino.get_one(id)
        a = NegocioArticulo.get_by_id_array([i.articulos.idTipoArticulo for i in e.salidas])
        salidas_present =  [{"nombre":         s[1].nombre,
                            "cantidad":        s[0].articulos.cantidad, 
                            "unidadmedida":    s[1].unidadMedida,
                            "fecha":           s[0].fecha.strftime("%d/%m/%Y")}
                            for s in list(zip(e.salidas,a))]
        return jsonify(salidas_present)
    except Exception as e:
        return error(e,"gestion_ed")   


@app.route('/gestion-ed/alta', methods = ['GET','POST'])
def alta_entidad_destino():
    if request.method == 'POST':
        nombre = request.form['nombre']
        try:
            NegocioEntidadDestino.add(nombre)
        except Exception as e:
            return error(e,"gestion_ed")
        return redirect(url_for('gestion_ed'))


@app.route('/gestion-ed/edit', methods = ['GET','POST'])
def edit_entidad_destino():
    if request.method == 'POST':
        nombre = request.form['nombre']
        idEnt = request.form['id']
        try:
            NegocioEntidadDestino.update(idEnt,nombre)
        except Exception as e:
            return error(e,"gestion_ed")
        return redirect(url_for('gestion_ed'))


@app.route('/gestion-ed/baja/<id>')
def baja_entidad_destino(id):
    id = int(id)
    try:
        NegocioEntidadDestino.delete(id)
    except Exception as e:
        return error(e,"gestion_ed")
    return redirect(url_for('gestion_ed'))

''' 
    -----------------
    Error Page
    -----------------
'''


@app.route('/error', methods = ['GET','POST'])
def error(err="", url_redirect="/main"):
    if err=="":
        err = "Ha habido un error inesperado. Por favor vuelva a intentarlo. \nSi el problema persiste, contacte a un administrador."
    return render_template('error.html', err = err, url_redirect=url_redirect)


''' 
    ---------------------------
    Puntos de Deposito y Retiro
    ---------------------------
'''

@app.route('/elegir-tipo-punto', methods = ['GET','POST'])
def selection():
    return render_template('elegir-tipo-punto.html')


@app.route('/gestion-puntos-deposito', methods = ['GET','POST'])
def gestion_pd():
    try:
        puntos_deposito = NegocioPuntoDeposito.get_all()
    except Exception as e:
        return error(e,"gestion_pd") 
    return render_template('gestion-puntos-deposito.html', puntos_deposito = puntos_deposito)


''' 
    -----------------
    Articulos
    -----------------
'''

@app.route('/articulos', methods = ['GET','POST'])
def gestion_articulos():
    try:
        articulos = NegocioArticulo.get_all()
        return render_template('gestion-articulos.html',articulos=articulos)
    except Exception as e:
        return error(e,"articulos")

@app.route('/articulos/alta', methods = ['GET','POST'])
def alta_articulo():
    if request.method == 'POST':
        nombre =                request.form['nombre']
        unidad =                request.form['unidad']
        imagen =                request.form['imagen']
        ventaUsuario = None
        try: 
            request.form['ventaUsuario']
            ventaUsuario = 1
        except:
            ventaUsuario = 0
        costoInsumos =          request.form['costoInsumos']
        costoProduccion =       request.form['costoProduccion']
        otrosCostos =           request.form['otrosCostos']
        costoObtencionAlt =     request.form['costoObtencionAlt']
        margen =                request.form['margen']
        valor =                 request.form['valor']

        try:
            NegocioArticulo.add(nombre,unidad,imagen,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,valor)
        except Exception as e:
            return error(e,"articulos")
        return redirect(url_for('gestion_articulos'))


@app.route('/articulos/edit', methods = ['GET','POST'])
def edit_articulo():
    if request.method == 'POST':
        idArt =                 request.form['idArticulo']
        nombre =                request.form['nombre']
        unidad =                request.form['unidad']
        imagen =                request.form['imagen']
        ventaUsuario = None
        try: 
            request.form['ventaUsuario']
            ventaUsuario = 1
        except:
            ventaUsuario = 0
        costoInsumos =          request.form['costoInsumos']
        costoProduccion =       request.form['costoProduccion']
        otrosCostos =           request.form['otrosCostos']
        costoObtencionAlt =     request.form['costoObtencionAlt']
        margen =                request.form['margen']
        valor =                 request.form['valor']

        try:
            NegocioArticulo.update(idArt,nombre,unidad,imagen,ventaUsuario,costoInsumos,costoProduccion,otrosCostos,costoObtencionAlt,margen,valor)
        except Exception as e:
            return error(e,"articulos")
        return redirect(url_for('gestion_articulos'))


@app.route('/articulos/baja/<id>')
def baja_articulo(id):
    id = int(id)
    try:
        NegocioArticulo.delete(id)
    except Exception as e:
        return error(e,"articulos")
    return redirect(url_for('gestion_articulos'))


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
