from flask import Flask, render_template, request
import base64
import re

app = Flask(__name__)

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/submitImg', methods=['POST'])
def submitImg():
  dataURL = request.form['img']
  with open("/home/roodler/Dropbox/roodler/doodle.png", "w") as file:
    file.write(dataURL.decode('base64'))
  file.close()

  with open("/home/roodler/Dropbox/roodler/doodle2.png", "w") as file:
    file.write(dataURL.decode('base64'))
  file.close()
  return "stuff"

if __name__ == '__main__':
  app.run(debug=True)