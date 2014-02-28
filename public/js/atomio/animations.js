atomio.animations = function(){

	"use strict";

	//PRIVATE VARS
	var _body = $("body");

	//PRIVATE METHODS
	var _initVariables = function _initVariables(){};
	var _initEvents = function _initEvents(){};


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
	_initEvents();
	_initVariables();
}
