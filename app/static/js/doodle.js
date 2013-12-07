
//*************************************************************************************

//drawing variables
var canvas, context, paint = false, cursor = false, erase = false,
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

  //default draw settings
  update(color);
  pencilButton();
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
  $('.canvas_wrapper').css("margin-top","30px");
  //switches buttons
  $('.top_buttons button').css("display","block");
  $('.download_button').css("display","block");
  $('.radius_display').css("display","block");
  $('.color_select').css("display","block");
  $('.draw_button').css("display","none");
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
function pencilButton(){
  erase=false;
  color="black";
  radius=10;
  $('.pencil_button').css("outline","black solid thick");
  $('.eraser_button').css("outline","white solid thick");
  update(color);
}
function eraserButton(){
  erase=true;
  color="white";
  radius=60;
  $('.pencil_button').css("outline","white solid thick");
  $('.eraser_button').css("outline","black solid thick");
  update("white"); 
}
function plusButton(){
  if(radius+2<1000){
    radius+=2;

    if(color=="#964B00") update("brown");
    else update(color);
  }
} 
function minusButton(){
  if(radius-2>0){
    radius-=2;
    if(color=="#964B00") update("brown");
    else update(color);
  }
}

function undoButton(){
  
}

function update(c){
  //updates color palette
  $('.color_select li button').css("outline","none");
  if(!erase) {
    //brown diff hex
    if(c=="brown") color="#964B00";
    else color=c;

    //sets select
    $('.'+c).css("outline","#a6d4f3 solid thick");
  }

  //brown diff hex
  if(color=="brown") $('.cursor').css("color","#964B00");
  else $('.cursor').css("color",color);

  if(color=="white") $('.cursor').css("border",(radius/2)+"px solid #eee");
  else $('.cursor').css("border",(radius/2)+"px solid");
  
  $('.cursor').css("margin-top",-radius+"px");
  $('.radius_display').text(radius.toString());
}