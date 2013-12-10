from flask import Flask, render_template, request
import base64
import re

from time import gmtime, strftime

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

  time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
  with open("/home/roodler/Dropbox/roodler/olddoodles/"+time+".png", "w") as file:
    file.write(dataURL.decode('base64'))
  file.close()
  return "stuff"

if __name__ == '__main__':
  app.run(debug=True)