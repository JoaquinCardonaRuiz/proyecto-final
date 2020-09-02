from flask import Flask, render_template, request, url_for, redirect, flash
from negocio import Negocio
app = Flask(__name__)

#Session
app.secret_key = 'myscretkey'

@app.route('/', methods = ['GET','POST'])
def main():
    return render_template('main.html')

@app.route('/gestion-niveles', methods = ['GET','POST'])
def gestion_niveles():
    niveles = Negocio.get_niveles()
    min_max_nivel = Negocio.get_min_max_niveles()
    maxEP = Negocio.get_max_ecoPuntos()
    if request.method == 'POST':
        numeroNivel = request.form['numeroNivel']
        descuento = request.form['descuento']
        minEcoPuntos = request.form['minEcoPuntos']
        maxEcoPuntos = request.form['maxEcoPuntos']
        print(Negocio.alta_nivel(numeroNivel, descuento, minEcoPuntos, maxEcoPuntos))
    return render_template('gestion-niveles.html', niveles = niveles, min_nivel = min_max_nivel[0], max_level = min_max_nivel[1], maxEP = maxEP)

@app.route('/gestion-ed', methods = ['GET','POST'])
def gestion_ed():
    entidades = Negocio.get_entidades_destino()
    return render_template('gestion-entidades-destino.html', entidades = entidades)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
