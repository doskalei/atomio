atomio.index = function(){

	"use strict";

	//PRIVATE VARS
	var _$html;
	var _$body;
	var _instantCounter = 0;
	var _$login;
	var _$loginform;
	var _$name;
	var _$password;
	var _$check;
	var _$checkform;
	var _$cname;
	var _$checksubmit;
	var _$join;
	var _$joinform;
	var _$joinsubmit;
	var _$jemail;
	var _$jpassword;

	var _$console;
	var _$consoleContent;
	var _$consoleModal;

	var _$input;
	var _$article;

	var _$response;
	
	// PUBLIC VARS
	this.stars = [];

	//PRIVATE METHODS
	var _initVariables = function _initVariables(){

		$(document).ready(function(){

			_$html = $("html");
			_$body = $("body");
			_$response = $("#response");
			_$login = $("#login a");
			_$loginform = $("#login form");
			_$name = $("#login .name");
			_$password = $("#login .password");
			_$check = $("#check a");
			_$checkform = $("#check form");
			_$cname = $("#check .name");
			_$checksubmit = $("#checksubmit");
			_$join = $("#join a");
			_$joinform = $("#join form");
			_$joinsubmit = $("#joinsubmit");
			_$jemail = $("#join .email");
			_$jpassword = $("#join .password");

			_$console = $("#console");
			_$consoleModal = $("#console #modal");
			_$consoleContent = $("#console #modal_content");

			_$input = $("#input");
			_$article = $("article");
		});

	};
	
	var _initEvents = function _initEvents(){


		$(document).ready(function(){


			if( $("#input")&&$("#input").css("display") == "block" ){
				_$input.focus();
			}

			$("body").on("click","#login a",function(e){
				e.preventDefault();
				if(_$checkform.css("display")=="block")
					_$checkform.fadeOut(200,function(){_$loginform.fadeIn(50);});
			});
			$("body").on("click","#check a",function(e){
				e.preventDefault();
				if(_$loginform.css("display")=="block")
					_$loginform.fadeOut(200,function(){_$checkform.fadeIn(50);});
			});
			$("body").on("keyup","#login .password",function(e){
				e.preventDefault();
				if( _instantCounter == -101 ){
					_instantCounter = 0;
				}else{
					var letterCount = $(this).val().length;
					_instantCounter++;
					setTimeout(function(){  atomio.index.instantLogin( _$password, letterCount) }, 1600);					
				}
			});
			$("body").on("keydown","#login .password",function(e){
			    if(e.keyCode == 13){
			    	_instantCounter = -101;
			    	atomio.index.login();
			    }
			});
			$("body").on("click","#checksubmit",function(e){
				e.preventDefault();
				if( _$cname.val() )
			    	atomio.index.check();
			});
			$("body").on("click","#joinsubmit",function(e){
				e.preventDefault();
				if( _$cname.val()&&_$jemail.val()&&_$jpassword.val() )
			    	atomio.index.join();
			});
			_$consoleModal.on("click",function(e){
				e.preventDefault();
				_$consoleModal.addClass( "slideOutUp" ).removeClass( "slideInRight" );
				/*_$body.off('click keydown mousenter');*/
				_$console.fadeOut();
				$("#input").fadeIn(function(){$(this).focus()});
			});
			_$consoleModal.on("keydown",function(e){
			    if(e.keyCode == 13){
			    	$(this).click();
			    }
			});
			$("body").on("keydown","#input",function(e){
				_$input.val(_$input.val().charAt(0).toUpperCase() + _$input.val().slice(1));
			    if(_$input.val()!=""&&e.keyCode == 13){
			    	atomio.index.inputSend(_$input.val());
			    }
			});
			$("body").on("click","#close",function(e){
			    $("#main > section").fadeOut(function(){
			    	$(this).remove();
			    	$("#input").fadeIn(function(){$(this).focus()});
			    });
			    if(e.keyCode == 13){
			    	_instantCounter = -101;
			    	atomio.index.login();
			    }
			});

			if($("#editor").length){
				CKEDITOR.replace( 'editor', {
					fullPage: true,
					allowedContent: true
				});
			}
		});



	};

	this.instantLogin = function instantLogin(o,count){
		--_instantCounter;
		if( _$name.val().length>0){
			if( o.val().length <= count){
				if(_instantCounter === 0){
					_$name.blur();
					_$password.blur();
					atomio.index.login();
				}
			}
		}else{
			_$name.focus();
		}
	};

	this.login = function login(){

		var n = _$name.val();
		var p = _$password.val();
		_$response.css({width:"0",background:"white"}).animate({width:"100%"});
		$.ajax({
			type:'POST',
			url:'/auth',
			dataType:'json',
			data:{method:'GET',name:n,password:p},
			success:function(data){
				if(data){
					if(data.success){
						window.location.href="/";
					}else{
						$("#input").fadeOut();
						atomio.index.ouText(data.message);
						_$response.css({background:"red"});
					}
				}
			}
		});

	};

	this.check = function check(){

		var n = _$cname.val();
		$.ajax({
			type:'POST',
			url:'/auth',
			dataType:'json',
			data:{method:'POST',check:n},
			success:function(data){
				if(data){
					if(data.success){
						$("#join h2").text( $("#join h2").text() + data.success );
						$("#login, #check").css({display:"none"});
						$("#join").fadeIn(600);
						/*window.location.href=window.location.href;*/
					}else{
						$("#input").fadeOut();
						atomio.index.ouText(data.message);
						_$response.css({background:"red"});
					}
				}
			}
		});

	};

	this.join = function join(){

		var n = _$cname.val();
		var e = _$jemail.val();
		var p = _$jpassword.val();
		$.ajax({
			type:'POST',
			url:'/auth',
			dataType:'json',
			data:{method:'POST',name:n,email:e,password:p},
			success:function(data){
				if(data){
					if(data.success){
						window.location.href="/";
					}else{
						$("#input").fadeOut();
						atomio.index.ouText(data.message);
						_$response.css({background:"red"});
					}
				}
			}
		});

	};

	this.inputSend = function inputSend(text){

		$("#input").val("").blur().css({display:"none"});
		$.ajax({
			type:'POST',
			url:'/input',
			data:{method:'POST',input:text},
			success:function(data){
				if(typeof data == 'object'){
					if(data.success){
						switch(data.success){
							default:
								atomio.index.ouText(data.message);
								break;
						}
					}else if(data.redirect){
						window.location.href=data.redirect;
					}else{
						atomio.index.ouText(data.message);
					}
				}else{
					_$article.children("section").remove();
					_$article.append(data);
					_initVariables();
				}
			}
		});

	};

	this.showOutput = function showOutput(type, animation){
		_$consoleContent.addClass( type );
		_$consoleModal.addClass( animation );
/*		_$body.on('mouseover',function(e){
			_$body.off('mouseover');
			setTimeout(function(){atomio.index.fadeOutput();},200);
		});*/
		_$body.one('click keydown mouseover',function(e){
			atomio.index.fadeOutput();
		});

	};


	this.fadeOutput = function fadeOutput(){
		_$console.addClass("fading");
		/*_$body.off('click keydown mousenter');*/
		_$body.one('mouseover',function(e){
			/*_$body.off('mouseover');*/
			setTimeout(function(){atomio.index.hideOutput();},2000);
		});
		_$body.one('click keydown',function(e){
			atomio.index.hideOutput();
		});

	};

	this.hideOutput = function hideOutput(){
		/*_$body.off('click mouseover keydown');*/
		_$console.fadeOut(function(){
			_$console.removeClass();
			_$consoleContent.removeClass();
			_$consoleModal.removeClass();
			$("#input").fadeIn(function(){$(this).focus()});
		});

	};

	this.ouText = function ouText(text){

		var content = "<span class='fullwidth'>" + text + "</span>";
		_$console .fadeIn(20,function(){
			_$consoleContent.html(content);
			atomio.index.showOutput("text","slideInRight");
		});

	};

	this.init = function(){

		_initVariables();
		_initEvents();
		
	};

}
atomio.index = new atomio.index(); atomio.index.init();