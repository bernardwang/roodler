
//*************************************************************************************

//drawing variables
var canvas, context, paint = false, cursor = false,
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
  context.fillStyle = "white";
  context.fillRect(0,0,w,h);

  //other line settings
  context.shadowColor = color;
  context.shadowBlur = 0;
  context.lineCap = 'round';

  //mouse listeners
  canvas.addEventListener("mousedown", function (e) {
    paint = true;
    getCoords(e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    paint = false;
    getCoords(e)
  }, false);
  canvas.addEventListener("mousemove", function (e) {
    getCoords(e);
    $('.cursor').css("display","block");
    moveCursor();
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    paint = false;
    getCoords(e);
    $('.cursor').css("display","none");
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

function moveCursor(){
  var x = currX-(radius/2); //cursor offset
  var y = currY+(radius/2);
  $('.cursor').css({left:x, top:y});
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
function warning(){
  //removes warning shows doodle
  $('.warning').css("display","none");
  $('.canvasImg').css("display","block");
}
function drawButton(){
  //switches display to canvas
  $('.canvasImg').css("display","none");
  $('.warning').css("display","none");
  $('#canvas').css("display","block");
  //switches buttons
  $('.draw_button').css("display","none");
  $('.submit_button').css("display","block");
  $('.download_button').css("display","block");
  $('.plus_button').css("display","block");
  $('.minus_button').css("display","block");
  $('.radius_display').css("display","block");
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

function plusButton(){
  if(radius+1<1000){
    radius+=2;
    updateCursor();
  }
} 
function minusButton(){
  if(radius-1>0){
    radius-=2;
    updateCursor();
  }
}

function black(){
  color="black";
  updateCursor();
}
function white(){
  color="white";
  updateCursor();
}
function red(){
  color="red";
  updateCursor();
}
function brown(){
  color="brown";
  updateCursor();
}
function orange(){
  color="orange";
  updateCursor();
}
function yellow(){
  color="yellow";
  updateCursor();
}
function green(){
  color="green";
  updateCursor();
}
function cyan(){
  color="cyan";
  updateCursor();
}
function blue(){
  color="blue";
  updateCursor();
}
function purple(){
  color="purple";
  updateCursor();
}
function magenta(){
  color="magenta";
  updateCursor();
}

function updateCursor(){
  $('.cursor').css("color",color);
  $('.cursor').css("border",(radius/2)+"px solid");
  $('.cursor').css("margin-top",-radius+"px");
  if(radius==0){
    $('.radius_display').text("1");
  }
  else{
    $('.radius_display').text(radius.toString());
  }
}