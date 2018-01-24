'use stric';

// --> Unnecessary use of prototype, just for practice purposes
Array.prototype.appendTo = function(el, str, type, id) {

	const element = document.createElement(type);

	element.innerHTML = str;
	element.id = id;

	el.appendChild(element);
};

// --> Helpers
function scrollTo(element, time, offset, callback) {

	const body = document.getElementsByTagName('HTML')[0];
	const offsetTop = element.offsetTop - offset;
	const totalTime = time / offsetTop;
	const id = setInterval(frame, totalTime);

	let top = 0;

	function frame() {
		if (top === offsetTop)
			clearInterval(id);
		
		top++;
		body.scrollTop = top;
	}

	if (callback && typeof callback === 'function')
		callback();

	return;
}

function fadeIn(element, removedClass) {
	element.classList.remove(removedClass);
}

function setGameInfo(game) {
	const gameTitle = document.getElementById('gameTitle');
	const gameDescription = document.getElementById('gameDescription');
	const infoContainer = document.getElementById('gameInfo');

	// --> Fade In animation
	fadeIn(infoContainer, 'hidden');

	gameTitle.innerText = game.name;
	gameDescription.innerText = game.description;
}

function validation(validation) {
	return validation;
}

// function loadGames(callback) {
// 	const xObj = new XMLHttpRequest();

// 	xObj.overrideMimeType("application/json");
// 	xObj.open('GET', './scripts/game.json', true);

// 	xObj.onreadystatechange = function () {
// 		if (xObj.readyState === 4 && xObj.status === "200") 
//         	callback(xObj.responseText);
// 	}

// 	xObj.send(null);
// }

(function() {

	const gameListContainer = document.getElementById('l-games');
	const playGround = document.getElementById('playground');
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	// --> Buttons
	const startBtn = document.createElement('button');
	const restartBtn = document.createElement('button');
	startBtn.innerText = 'Start';

	// --> Game
	let newGameSelected;

	// --> Private 
	let canvasDisplayed = false;

	// --> List of games 
	const listOfGames = [
		{
			name: 'Breakout',
			description: 'tandard dummy text ever since tut also the leap into electronic typesetting, remaining essentially unchanged.'
		},
		{
			name: 'Pong',
			description: 'lorem	ipsum sadsd'
		},
		{
			name: 'Snake',
			description: 'lorem	ipsum sadsd'
		},
		{
			name: 'Pacman',
			description: 'lorem	ipsum sadsd'
		},
		{
			name: 'Asteroids',
			description: 'lorem	ipsum sadsd'
		}
	];

	// --> Load games
	// loadGames(function(res) {
	// 	console.log(res);
	// });

	// --> Display list of games on the DOM
	for (var i = 0; i < listOfGames.length; i++)
		listOfGames.appendTo(gameListContainer, listOfGames[i].name, 'li', i);

	function showPlayground(id, callback) {

		const gameSelected = GameIndex(listOfGames[id], playGround, canvas, context);
		newGameSelected = new gameSelected();

		// --> Set Title and Description
		setGameInfo(listOfGames[id]);

		// --> Init the game Selected
		newGameSelected.game.startGame();

		// --> Display Start button
		playGround.appendChild(startBtn)

		if (callback && typeof callback === 'function')
			callback(newGameSelected);

	}

  // --> Events 
	gameListContainer.onclick = function(e) {
		// --> Run game index
		showPlayground(e.target.id, function() {
			// --> Scroll viewport to playground;
			if (!canvasDisplayed) {
				scrollTo(playGround, 1000, 150, function() {
					canvasDisplayed = true;
				});
			}
				
		});
	}

	startBtn.onclick = function(e) {

		this.className = 'hide';

		newGameSelected.game.gameStart = true;

		console.log(newGameSelected);

	}

})();


	