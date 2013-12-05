
//*************************************************************************************

//drawing variables
var canvas, context, paint = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

//drawing settings
var color = "black",
    radius = 10;

//inital call
function init() {
  //initialize canvas variables
  canvas = document.getElementById('canvas');
  context = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  //fills canvas with background color
  context.fillStyle = "white"
  context.fillRect(0,0,w,h);

  //other line settings
  context.shadowColor = color;
  context.shadowBlur = 0;
  context.lineCap = 'round';

  //mouse listeners
  canvas.addEventListener("mousedown", function (e) {
    paint = true;
    getCoords(e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    paint = false;
    getCoords(e)
  }, false);
  canvas.addEventListener("mousemove", function (e) {
    getCoords(e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    getCoords(e)
  }, false);
}

function getCoords(e){
  //gets coordinates for drawing, calls drawing function
  prevX = currX; 
  prevY = currY;
  currX = e.pageX - canvas.offsetLeft; //gets coords and fixes offset
  currY = e.pageY - canvas.offsetTop; 
  draw(); 
}

function draw() {
  if(paint){
    //drawing settings
    context.fillStyle = color;
    context.strokeStyle = color; //sets color
    context.lineWidth = radius; //sets stroke radius

    //drawing
    context.beginPath(); //starts drawing
    context.moveTo(prevX, prevY);  //draws from prev coord to curr
    context.lineTo(currX, currY);
    context.stroke(); //draws
    context.closePath(); //stops drawing

    //if short click
    if(prevX==currX&&prevY==currY){
      context.beginPath();
      context.arc(currX,currY,radius/2,0,2*Math.PI);
      context.fill();
      context.closePath();
    }
  }

}

//*************************************************************************************

function drawButton(){
  //switches display to canvas
  $('.canvasImg').css("display","none");
  $('#canvas').css("display","block");
  //switches buttons
  $('.draw_button').css("display","none");
  $('.submit_button').css("display","block");
  $('.download_button').css("display","block");
  $('.color_select').css("display","block");
}

function submitButton() {
  //gets dataurl and cuts out part of string
  var dataURL = canvas.toDataURL('image/png');
  dataURL = dataURL.replace("data:image/png;base64,", ""); 

  //calls python
  params = {img : dataURL };
  $.post('/submitImg', params, function (data) {
    alert("Doodle Submited!");
  });

}

function downloadButton(){
  Canvas2Image.saveAsPNG(canvas);
}

//*************************************************************************************

function black(){
  color="black";
}
function white(){
  color="white";
}
function red(){
  color="red";
}
function orange(){
  color="orange";
}
function yellow(){
  color="yellow";
}
function green(){
  color="green";
}
function blue(){
  color="blue";
}
function cyan(){
  color="cyan";
}
function purple(){
  color="purple";
}
function magenta(){
  color="magenta";
}