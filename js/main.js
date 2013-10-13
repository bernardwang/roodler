/*
code from
http://devfiles.myopera.com/articles/649/example1.js
*/

if(window.addEventListener) {
window.addEventListener('load', function () {
	
	var canvas, context;

	function init () {
  		// Find the canvas element.
    	canvas = document.getElementById('canvasApp');
    	if (!canvas) {
      		alert('Error: I cannot find the canvas element!');
      		return;
  	  	}

    	if (!canvas.getContext) {
      		alert('Error: no canvas.getContext!');
      		return;
    	}

    	// Get the 2D canvas context.
    	context = canvas.getContext('2d');
   	 	if (!context) {
      		alert('Error: failed to getContext!');
      		return;
    	}	

    	// Attach the mousemove event handler.
    	canvas.addEventListener('mousedown', ev_mousedown, false);
    	canvas.addEventListener('mouseup', ev_mouseup, false);
    	canvas.addEventListener('mousemove', ev_mousemove, false);
	}
	
	var x, y;
	var paint = false;
	var started = false;

	function ev_mousedown(ev){
 	 	paint = true;
	}
	function ev_mouseup(ev){
 	 	paint = false;
 	 	started = false;
	}


	function ev_mousemove (ev) {
		if (paint)
		{

			// Get the mouse position relative to the canvas element.
  			if (ev.layerX || ev.layerX == 0) { // Firefox
    			x = ev.layerX;
    			y = ev.layerY;
  			}

  			// The event handler works like a drawing pencil which tracks the mouse 
  			// movements. We start drawing a path made up of lines.
  			if (started==false) {
  				context.moveTo(x, y);
    			context.beginPath();
    			started = true;
  			} else {
    			context.lineTo(x, y);
  			  	context.stroke();
  			}
  		}
	}
	
	init();
},false); }