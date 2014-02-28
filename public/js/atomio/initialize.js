
atomio = {};
main = null;
article = null;
section = null;


var path = location.pathname.substr(1).split("/");

$(document).ready(function(){

	if (window.location.hash == '#_=_')window.location.hash = '';

    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    if(jQuery.browser.mobile||jQuery.browser.isiDevice){}

	if( path[0]=="messages"){
		//section = new atomio.messages();
	}else{
		if(path[1] != "" && typeof path[1] != 'undefined'){
			atomio.atomio = new atomio.atomio();
		}else{
			atomio.atomio = new atomio.atomio();
		}
	}
	(function(window,undefined){
		History = window.History;
		var actualState = History.getState();
		if( History.getBaseUrl().length === (History.getPageUrl().length +1) ){
			console.log( "History.getBaseUrl().length === (History.getPageUrl().length +1)" );
		}else{
			console.log( "History.getBaseUrl().length !== (History.getPageUrl().length +1)" );
		}
		History.Adapter.bind(window,'statechange',function(){

			if( (actualState.data.t < History.getState().data.t) || (typeof(actualState.data.t) === 'undefined') ){
				actualState = window.History.getState();
			}else{
				if( (typeof(History.getState().data.state) === 'undefined') || (History.getState().data.state === '/') ){
					$("#main").fadeOut(50).html(main._loader).fadeIn().load("/",{POST:"1"});
				}else{
/*					var url = History.getState().data.state;
					if( History.getState().data.state[0] == "/" ) url = url.substr("1");
					var c = url.split("/");
					if( (c[0] === "items")){
						if( (typeof( c[1] ) === 'undefined') ){
							$("#items-button").click();
						}else{
							var item = c[1];
							section = null;
							$("#items-menu li").removeClass("selected");
							$("#main").fadeOut(50).html(main._loader).fadeIn().load("/items/"+item,{POST:"1"},function(){
								section = new freekampus.itemview();
								$(".swipebox").swipebox();
							});
						}
					}*/
				}
			}
			return false;
		});

	})(window);



});

