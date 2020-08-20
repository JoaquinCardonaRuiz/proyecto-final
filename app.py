from flask import Flask, render_template, request, url_for, redirect, flash

app = Flask(__name__)

#Session
app.secret_key = 'myscretkey'

@app.route('/', methods = ['GET','POST'])
def main():
    pass
    return render_template('main.html')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
