

var websocket;
var lastUpdate;

function appendArticles(data){
	if($("#timeline").length){
		if( !($("#selectCountry").val()=="0")){
			if( $("#selectCountry").val()== data.countryCode ){
				if( !($("#selectUniversity").val()=="0")){
					if( !($("#selectUniversity").val()== data.university)){
						return false;
					}
				}
			}else{
				return false;
			}
		}
		if(data == 'NULL'){
			return;
		}else{
			if( $("#items-list:first li").length == 200){
				$("#items-list li:last-child").remove();
			}
			//item = Math.floor(Math.random()*3)+1;
			item = 1;
			width = Math.floor(Math.random()*180);
			width = parseInt(250) + width;

			//ARTICULOS DE UNIVERSIDAD
			if(data.cat == "College"){
				//$("#items-list:not(:nth-child("+item+"))").prepend("<div class='empty' ></div").children("li:first-child").animate({height:"180px"},600);
				content = "<div i-id='"+data.id+"' class='item itemelement' >";
					content+="<img src='"+data.pic1_thumb+"'>";
					content+="<a href='/items/"+data.id+"'>";
						content+="<h3>"+data.title+"</h3>";
						content+="<div class='features'>";
							if(data.subcat=="books"){
							content+="<h4>Libros y apuntes</h4>";
							}else if(data.subcat=="class"){
							content+="<h4>Clases</h4>";
							}else if(data.subcat=="tandem"){
							content+="<h4>Tándem de idiomas</h4>";
							}
							if(data.level!=""){
								if(data.level=="basic"){
								content+="<h4><img src='/images/basic.png' />Nivel básico</h4>";
								}else if(data.level=="medium"){
								content+="<h4><img src='/images/medium.png' />Nivel medio</h4>";
								}else if(data.level=="advanced"){
								content+="<h4><img src='/images/advanced.png' />Nivel avanzado</h4>";
								}
							}else{
								if(data.online=="1"){
								content+="<h4><img src='/images/online.png' />Online</h4>";
								}else{
								content+="<h4><img src='/images/facetoface.png' />Presencial</h4>";
								}						
							}
						content+="</div>";
						content+="<div class='user-info'>";
							content+="<span>";
								content+="<img src='"+data.picSmall+"' />";
							content+="</span>";
							content+="<span>";
								content+="<h5>"+data.userName+"</h5>";
								content+="<h6>"+data.uniName+"</h6>";
							content+="</span>";
						content+="</div>";
					content+="</a>";						
				content+="</div";
				$("#items-list:nth-child("+item+")").prepend(content).children("li:first-child").animate({minHeight:"180px",height:"auto"},600).fadeIn(600);
			//ARTÇICULOS DE MERCADO
			}else if(data.cat=="Market"){
				//$("#items-list:not(:nth-child("+item+"))").prepend("<div class='empty' ></div").children("li:first-child").animate({height:"180px"},600);
				content = "<div i-id='"+data.id+"' class='item itemelement' >";
					content+="<img src='"+data.pic1_thumb+"'>";
					content+="<a href='/items/"+data.id+"'>";
						content+="<h3>"+data.title+"</h3>";
						content+="<div class='features'>";
							if(data.subcat=="audio"){
							content+="<h4>Audio</h4>";
							}else if(data.subcat=="camera"){
							content+="<h4>Cámaras</h4>";
							}else if(data.subcat=="collect"){
							content+="<h4>Coleccionismo</h4>";
							}else if(data.subcat=="videogames"){
							content+="<h4>Consolas/Jugeos</h4>";
							}else if(data.subcat=="sports"){
							content+="<h4>Deporte</h4>";
							}else if(data.subcat=="machines"){
							content+="<h4>Electrodomésticos</h4>";
							}else if(data.subcat=="electronics"){
							content+="<h4>Electrónica</h4>";
							}else if(data.subcat=="tools"){
							content+="<h4>Herramientas de trabajo</h4>";
							}else if(data.subcat=="home"){
							content+="<h4>Hogar</h4>";
							}else if(data.subcat=="informatic"){
							content+="<h4>Informática</h4>";
							}else if(data.subcat=="instruments"){
							content+="<h4>Instrumentos musicales</h4>";
							}else if(data.subcat=="books"){
							content+="<h4>Libros</h4>";
							}else if(data.subcat=="vehicles"){
							content+="<h4>Motor</h4>";
							}else if(data.subcat=="music"){
							content+="<h4>Música</h4>";
							}else if(data.subcat=="clothes"){
							content+="<h4>Ropa y complementos</h4>";
							}else if(data.subcat=="phones"){
							content+="<h4>Telefonía</h4>";
							}else if(data.subcat=="others"){
							content+="<h4>Otros</h4>";
							}
							if(data.give=="1"){
							content+="<h4><img src='/images/yes.png' />Artículo gratuito</h4>";
							}
							if(data.exchange=="1"){
							content+="<h4><img src='/images/yes.png' />Artículo de intercambio</h4>";
							}
							if(data.rent=="1"){
							content+="<h4><img src='/images/yes.png' />Artículo en alquiler</h4>";
							}
							if(data.sell=="1"){
							content+="<h4><img src='/images/yes.png' />Artículo en venta</h4>";
							}
						content+="</div>";
						content+="<div class='user-info'>";
							content+="<span>";
								content+="<img src='"+data.picSmall+"' />";
							content+="</span>";
							content+="<span>";
								content+="<h5>"+data.userName+"</h5>";
								content+="<h6>"+data.uniName+"</h6>";								
							content+="</span>";
						content+="</div>";
					content+="</a>";
				content+="</div";
				$("#items-list:nth-child("+item+")").prepend(content).children("li:first-child").animate({minHeight:"180px",height:"auto"},600).fadeIn(600);

			//ARTICULOS DE COCHE COMPARTIDO
			}else if(data.cat=="Carpooling"){

				$("#items-list:not(:nth-child("+item+"))").prepend("<div class='empty' ></div").children("li:first-child").animate({height:"380px"},600);
				content = "<div i-id='"+data.id+"' class='item itemelement carpooling-item' >";
					content+="<img class='itemMap' src='"+data.map+"'>";
					content+="<a href='/items/"+data.id+"'>";
						content+="<h3>"+data.title+"</h3>";
						content+="<h4>"+data.uniName+"</h4>";
						if(data.subcat=="morning"){
						content+="<h4>Horario de mañana</h4>";
						}else if(data.subcat=="afternoon"){
						content+="<h4>Horario de tarde</h4>";
						}else{
						content+="<h4>Día completo</h4>";
						}
						content+="<div class='user-info'>";
							content+="<span>";
								content+="<img src='"+data.picSmall+"' />";
							content+="</span>";
							content+="<span>";
								content+="<h5>"+data.userName+"</h5>";
								content+="<h6>"+data.uniName+"</h6>";								
							content+="</span>";
						content+="</div>";
					content+="</a>";
				content+="</div";
				$("#items-list:nth-child("+item+")").prepend(content).children("li:first-child").animate({minHeight:"380px",height:"auto"},600).fadeIn(600);

			//ARTICULOS DE HOUSESHARING
			}else if(data.cat=="Housesharing"){
				//$("#items-list:not(:nth-child("+item+"))").prepend("<div class='empty' ></div").children("li:first-child").animate({height:"180px"},600);
				content = "<div i-id='"+data.id+"' class='item itemelement' >";
					content+="<img src='"+data.pic1_thumb+"'>";
					content+="<a href='/items/"+data.id+"'>";
						content+="<h3>"+data.title+"</h3>";
						content+="<div class='features'>";
							if(data.subcat=="room"){
							content+="<h4>Habitación</h4>";
							}else if(data.subcat=="fullhouse"){
							content+="<h4>Vivienda</h4>";
							}
						content+="</div>";
						content+="<div class='user-info'>";
							content+="<span>";
								content+="<img src='"+data.picSmall+"' />";
							content+="</span>";
							content+="<span>";
								content+="<h5>"+data.userName+"</h5>";
								content+="<h6>"+data.uniName+"</h6>";								
							content+="</span>";
						content+="</div>";
					content+="</a>";
				content+="</div";
				$("#items-list:nth-child("+item+")").prepend(content).children("li:first-child").animate({minHeight:"180px",height:"auto"},600).fadeIn(600);

			//ARTICULOS DE EVENTOS
			}else if(data.cat=="Events"){
				//$("#items-list:not(:nth-child("+item+"))").prepend("<div class='empty' ></div").children("li:first-child").animate({height:"180px"},600);
				content = "<div i-id='"+data.id+"' class='item itemelement' >";
					content+="<img src='"+data.pic1_thumb+"'>";
					content+="<a href='/items/"+data.id+"'>";
						content+="<h3>"+data.title+"</h3>";
						content+="<div class='features'>";
							if(data.subcat=="cultural"){
							content+="<h4>Evento cultural</h4>";
							}else if(data.subcat=="sports"){
							content+="<h4>Evento deportivo</h4>";
							}else{
							content+="<h4>Fiesta</h4>";
							}
						content+="</div>";
						content+="<div class='user-info'>";
							content+="<span>";
								content+="<img src='"+data.picSmall+"' />";
							content+="</span>";
							content+="<span>";
								content+="<h5>"+data.userName+"</h5>";
								content+="<h6>"+data.uniName+"</h6>";								
							content+="</span>";
						content+="</div>";
					content+="</a>";						
				content+="</div";
				$("#items-list:nth-child("+item+")").prepend(content).children("li:first-child").animate({minHeight:"180px",height:"auto"},600).fadeIn(600);
			}
			$("article").getNiceScroll().resize();
		}
	}
	return false;
}

$(document).ready(function(){
//	websocket = io.connect("http://freekampus.com:8888",{secure: true}); // TIP: .connect with no args does auto-discovery

/*
	websocket = io.connect("http://freekampus.com:8844"); // TIP: .connect with no args does auto-discovery
	websocket.on('connect', function () {});

	websocket.on("updateEvent", function(data){
		if($("#timeline").length>0){
			websocket.emit("reloadTimeline",$("#selectCountry").val(),$("#selectUniversity").val(), $(".item:first-child").attr("i-id"));
		}
		return false;
	});
	websocket.on("receiveTimecollege", function(data){
		appendArticles(data);
		return false;
	});
*/
});








