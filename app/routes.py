from flask import Flask, render_template, request
import base64
import re
 
app = Flask(__name__)      
 
@app.route('/')
def home():
  return render_template('doodle.html')

@app.route('/save', methods=['POST'])
def save():
  dataURL = request.form['img']

  fh = open("doodle.png", "wb")
  fh.write(dataURL.decode('base64'))
  fh.close()

  return "stuff" #dont know what this is but ok

@app.route('/about')
def about():
  return render_template('about.html')

if __name__ == '__main__':
  app.run(debug=True)