$(document).ready(function(){

	var hit = 'X',
	counter = 0,
	i=0,j=0;
	playerOne= new Array(),
	playerTwo= new Array();

	winCom = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	$('section#game > div').click(function(){

		if(($(this).children().html()==''))
		{
			$(this).children().html(hit); //Writing the X or O and changin for next hit
			(hit=='X')?hit='O':hit='X';
			$('section#players > div').toggleClass('inactive'); //For showing the player
			counter++;

			outcome = ($(this).index());
			(counter%2==0)?playerTwo[i++]=outcome:playerOne[j++]=outcome;
			if(counter>=5) 
			{
				(counter%2==0)?player=playerTwo:player=playerOne;
				len = player.length;
				for(k=0;k<winCom.length;k++)
				{
					if(isSubset(winCom[k],player))
					{
						(counter%2==0)?alert("Player 2 Wins"):alert("Player 1 Wins");
						playerOne = new Array();
						playerTwo = new Array();
						reset();
						counter = 0;
						break;
					}
				}
			}
		}
	$('#clear').click(function(){
		reset();
		hit = 'X';
		counter = 0;
		playerOne = new Array();
		playerTwo = new Array();
	})

	});

});

function reset() {
	$('section#game > div > span').empty();
	if($('.playerOne').hasClass('inactive')) 
	{
		$('section#players > div').toggleClass('inactive');
	}
}

$(document).ready(init);

var currentSection = null;
var currentGameID;

function init() {
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
	$('#btn-historial').click(onClickBtnHistorial);
	$('#btn-comentar').click(onClickBtnComentar);

	$('#lista-juegos').on('click', 'button', onClickBtnItemJuego);


	TweenMax.from($('#saludo h1'), 1, {marginBottom: '0px', ease: Elastic.easeOut});
}

function onClickBtnItemJuego()
{
	var idGame = $(this).parent().data('idgame');
	console.log(idGame);
	gotoSection('historial-detalle');
	getComentarios(idGame);
	currentGameID = idGame;
	//getSingleGame(idGame);
}

function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function onClickBtnHistorial(evt) {
	evt.preventDefault();
	gotoSection('historial');
	getHistorial();
}
function onClickBtnComentar()
{
	enviarComentario(currentGameID, $('#name').val(), $('#content').val());
}




function enviarComentario(_idGame, _name, _content)
{
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
		console.log(_data);
		getComentarios(_idGame);
	});
}

function gotoSection(_identificadorDeSeccion) {
	currentSection.removeClass('visible');
	var nextSection = $('#' + _identificadorDeSeccion);

	nextSection.addClass('visible');

	TweenMax.from(nextSection, 1.5, {scale: 0.2, opacity: 0, ease: Elastic.easeOut});
	currentSection = nextSection;
}

function getHistorial() {
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).success(function (_data) {
		dibujarHistorial(_data);
	});
}

function getSingleGame(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}

function getComentarios(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).success(function(_data){
		console.log(_data);
		dibujarComentarios(_data);
	});
}

function dibujarComentarios(_datos)
{
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
		lista.append(html);
	}
}

function dibujarHistorial(_datos) {
	//console.log(_datos);
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);

		var html = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item">' + _datos[i].winner_player + ' le gano a '+ _datos[i].loser_player +' en ' + _datos[i].number_of_turns_to_win + ' movimientos <button class="btn">Comentar</button></li>';
		lista.append(html);
	}
}