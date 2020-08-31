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
    return render_template('gestion-niveles.html', niveles = niveles)

@app.route('/alta-nivel', methods = ['GET','POST'])
def alta_nivel():
    min_max_nivel = Negocio.get_min_max_niveles()
    return render_template('alta-nivel.html', min_nivel = min_max_nivel[0], max_level = min_max_nivel[1])

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
