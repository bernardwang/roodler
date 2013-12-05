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
  dataUrlPattern = re.compile('data:image/(png|jpeg);base64,(.*)$')
  imgb64 = dataUrlPattern.match(dataURL).group(2)
  if imgb64 is not None and len(imgb64) > 0:
  	f = open('image.jpg', 'w')
  	f.write(imgb64) #Results in corrupt file :(
  	f.close()
  return "hippie"

@app.route('/about')
def about():
  return render_template('about.html')

if __name__ == '__main__':
  app.run(debug=True)