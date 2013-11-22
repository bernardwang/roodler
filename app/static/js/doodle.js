
//*************************************************************************************

var canvas, context, paint = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var color = "black",
    width = 2;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousedown", function (e) {
        paint = true;
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        paint = false;
    }, false);
    canvas.addEventListener("mousemove", function (e) {
        getCoords(e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        getCoords(e)
    }, false);
}

function getCoords(e){
  prevX = currX; 
  prevY = currY;
  currX = e.pageX - canvas.offsetLeft; //gets coords and fixes offset
  currY = e.pageY - canvas.offsetTop; 
  draw(); 
}

function draw() {
  if(paint){
    context.beginPath(); //starts drawing
    context.moveTo(prevX, prevY);  //draws from prev coord to curr
    context.lineTo(currX, currY);
    context.strokeStyle = color; //sets color
    context.lineWidth = width; //sets draw width
    context.stroke(); //draws
    context.closePath(); //stops drawing
  }
}

//*************************************************************************************
function drawButton(){
  $('.doodle').css("display","none");
  $('#canvas').css("display","block");
}
