atomio.atomio = function(){

	"use strict";

	//PRIVATE VARS
	var _body = $("body");
	var _instantCounter = 0;
	var fps = 77;
	var canvas;
	var ctx;
    var canvasWidth;
    var canvasHeight;
    var stars = [];
	var ball = {
	  x: 0,
	  y: 0,
	  vx: 2,
	  vy: 3,
	  r: 80
	}
	var status = false;
	var starstop = 0;
	
	var breathInc = 0.05;
	var breathDir = 1;
	var breathAmt = 0;
	var breathMax = 1;

	var floatInc = 0.2;
	var floatDir = 1;
	var floatAmt = 0;
	var floatMax = 120;
	
	var _$response;
	
	// PUBLIC VARS
	this.stars = [];

	//PRIVATE METHODS
	var _initVariables = function _initVariables(){

		_$response = $("#response");

	};
	var _initEvents = function _initEvents(){

		/*---------------------
		-----------------------
		REQUEST ANIMATION FRAME
		-----------------------
		---------------------*/
		(function() {
		    var lastTime = 0;
		    var vendors = ['ms', 'moz', 'webkit', 'o'];
		    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
		                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
		    }
		 
		    if (!window.requestAnimationFrame)
		        window.requestAnimationFrame = function(callback, element) {
		            var currTime = new Date().getTime();
		            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
		              timeToCall);
		            lastTime = currTime + timeToCall;
		            return id;
		        };
		 
		    if (!window.cancelAnimationFrame)
		        window.cancelAnimationFrame = function(id) {
		            clearTimeout(id);
		        };
		}());

		/*setInterval(function(){
			console.log(status);
			var authHost = "http://atomio.es";
			var data = "";
			var url = authHost + '/' + data;
			var xhr_access = createCORSRequest('GET', url);
			if (!xhr_access) {alert('CORS not supported');return;}
			xhr_access.setRequestHeader('Accept', 'application/json');
			xhr_access.onload = function() {
				status = true;
			};
			xhr_access.onerror = function(){
				status = false;
			};
			xhr_access.send();

		},5000);*/

		/*-----------------------
		Generate background stars
		-----------------------*/
		generateStars();

		$(document).ready(function(){

			atomio.atomio.activate();

		});



	};


	this.activate = function activate(){

		canvas = document.getElementById("canvas");
		ctx = canvas.getContext('2d');
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		generateStars();
		atomio.atomio.animate();
		
	}

	this.animate = function animate(){

		requestAnimationFrame( animate );
		atomio.atomio.draw();

	}
	this.draw = function draw() {
		
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext('2d');

		// Clear display
		ctx.save();
		/*ctx.fillStyle = "#1a1a1a";*/
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		atomio.atomio.updateBreath();
		atomio.atomio.updateFloating();

		
/*		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > WIDTH || this.x < 0) this.dx *= -1;
		if(this.y > HEIGHT || this.y < 0) this.dy *= -1;*/

		canvas.width =  $(window).width();
		canvas.height = $(window).height();

		var oldCanvasWidth = canvasWidth;
		var oldCanvasHeight = canvasHeight;

		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		var xRatio = canvasWidth / oldCanvasWidth;
		var yRatio = canvasHeight / oldCanvasHeight;

		for (var i in stars) {    
			stars[i].x *= xRatio;
			stars[i].y *= yRatio;
			stars[i].draw(ctx);
		}


		// Update ball
		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.x = canvas.height - ball.r;
		ball.vx = Math.abs(ball.vx);
		ball.y = canvas.height - ball.r;
		ball.vy = Math.abs(ball.vy);

		// Draw ball
		ctx.save();
		ctx.translate(canvas.width/2, 380-Math.abs(floatAmt));
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.beginPath();
		ctx.arc(0, -40, ball.r- breathAmt, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();

	}

	this.updateBreath = function updateBreath() {
		
		var breathMaxRandom = Math.floor(Math.random() * breathMax) + 1;
		if (breathDir === 1) {  // breath in
			breathAmt -= breathInc;
			if (breathAmt < -breathMaxRandom) {
				breathDir = -1;
			}
		} else {  // breath out
			breathAmt += breathInc;
			if(breathAmt > breathMaxRandom) {
				breathDir = 1;
			}
		}
	}

	this.updateFloating = function updateFloating() {
		
		var floatMaxRandom = Math.floor(Math.random() * floatMax) + 15;
		if (floatDir === 1) {  // float in
			floatAmt -= floatInc;
			if (floatAmt < -floatMaxRandom) {
				floatDir = -1;
			}
		} else {  // float out
			floatAmt += floatInc;
			if(floatAmt > floatMaxRandom) {
				floatDir = 1;
			}
		}

	}

    function Star() {
      this.x;
      this.y;
      this.radius;
      this.opacity;

      this.draw = function(ctx) {

        //ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillStyle = "rgba(255,255,255,"+this.opacity+")";
        ctx.beginPath();
        if(starstop==50){
        	starstop = 0;
        	var rpn = randPosNeg(2);
        }else{
        	starstop++;
        	var rpn = 0;
        }
        ctx.arc(this.x+rpn, this.y+rpn, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
      }
    };

    function generateStars() {
      for (var i = 0; i < 100; i++) {
        var s = new Star();
        s.x = Math.random() * canvasWidth;
        s.y = Math.random() * canvasHeight;
        s.radius = Math.random() * 1.5;
        s.opacity = 1/(Math.floor(Math.random()*10) + 1)*0.50
        stars.push(s);
      }
    }

	function randPosNeg(_limit){
		var num = Math.floor(Math.random()*_limit) + 1; // this will get a number between 1 and 99;
		num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
		return num;
	}





















































    // Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    function base64_encode (data) {
        // http://kevin.vanzonneveld.net
        // +   original by: Tyler Akins (http://rumkin.com)
        // +   improved by: Bayron Guevara
        // +   improved by: Thunder.m
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   bugfixed by: Pellentesque Malesuada
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Rafał Kukawski (http://kukawski.pl)
        // *     example 1: base64_encode('Kevin van Zonneveld');
        // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
        // mozilla has this native
        // - but breaks in 2.0.0.12!
        //if (typeof this.window['btoa'] == 'function') {
        //    return btoa(data);
        //}
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
        if (!data) {
            return data;
        }
        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }










































	_initEvents();
	_initVariables();
}
