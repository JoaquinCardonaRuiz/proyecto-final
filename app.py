from flask import Flask, render_template, request, url_for, redirect, flash

app = Flask(__name__)

#Session
app.secret_key = 'myscretkey'

@app.route('/', methods = ['GET','POST'])
def main():
    return render_template('main.html')

@app.route('/gestion-niveles', methods = ['GET','POST'])
def gestion_niveles():
    return render_template('gestion-niveles.html')

@app.route('/alta-nivel', methods = ['GET','POST'])
def alta_nivel():
    return render_template('alta-nivel.html')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
