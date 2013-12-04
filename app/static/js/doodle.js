
//*************************************************************************************

var canvas, context, paint = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var color = "black",
    radius = 10;

var dataURL;

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  context.shadowColor = color;
  context.shadowBlur = 0;
  context.lineCap = 'round';

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
    context.lineWidth = radius; //sets stroke radius
    context.stroke(); //draws
    context.closePath(); //stops drawing

    if(prevX==currX&&prevY==currY){
      context.beginPath();
      context.arc(currX,currY,radius/2,0,2*Math.PI);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  }

}

//*************************************************************************************
function drawButton(){
  $('.doodle').css("display","none");
  $('#canvas').css("display","block");
  $('.draw_button').css("display","none");
  $('.submit_button').css("display","block");
}


function submitButton() {
  var canvasData = canvas.toDataURL('image/png')
  var canvasPNG = Canvas2Image.saveAsPNG(canvas, true);   
  alert(canvasPNG); 
  document.body.replaceChild(canvasPNG, canvas);
  
  /*params = { img : canvasData };
  $.post('/save', params, function (data) {
    alert("Saved!");
  });*/
}
