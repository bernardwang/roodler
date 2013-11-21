/*if(window.addEventListener) {

  window.addEventListener('load', function () {
	
	  var canvas, context;
	  var clearButton = document.getElementById["clear"];
	
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
		  if (paint){
			  var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x2 = w.innerWidth || e.clientWidth || g.clientWidth,
        y2 = w.innerHeight|| e.clientHeight|| g.clientHeight;

			  // Get the mouse position relative to the canvas element.
			  //JOE switched method from layer to client, fixing the annoying starting line
  		  if (ev.layerX || ev.layerX == 0) { 
    		  x = ev.clientX;
    		  y = ev.clientY;
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
  },false);

}
*/