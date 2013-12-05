from flask import Flask, render_template, request
import base64
import re
 
app = Flask(__name__)      
 
@app.route('/')
def home():
  return render_template('doodle.html')

@app.route('/about')
def about():
  return render_template('about.html')

@app.route('/submitImg', methods=['POST'])
def submitImg():
  dataURL = request.form['img']

  #f = open("doodle.txt", "r+")
  #f.write(dataURL)
  #f.close()
  f = open("static/img/doodle.png", "w")
  f.write(dataURL.decode('base64'))
  f.close()
  return "stuff" #dont know what this is but ok

if __name__ == '__main__':
  app.run(debug=True)