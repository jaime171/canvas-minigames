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
	const infoContainer = document.getElementById('gameInfo')

	// --> Fade In animation
	fadeIn(infoContainer, 'hidden');

	gameTitle.innerText = game.name;
	gameDescription.innerText = game.description;
}

(function() {

	const gameListContainer = document.getElementById('l-games');
	const playGround = document.getElementById('playground');
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	// --> Private 
	let canvasDisplayed = false;

	// --> TODO: Create start and restart buttons

	// --> Create fake API on json file and make Async call to get all this data
	// --> All games 
	const listOfGames = [
		{
			name: 'Breakout',
			description: 'orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since tut also the leap into electronic typesetting, remaining essentially unchanged. It w'
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

	for (var i = 0; i < listOfGames.length; i++)
		listOfGames.appendTo(gameListContainer, listOfGames[i].name, 'li', i);

	function showPlayground(id, callback) {

		const gameSelected = GameIndex(listOfGames[id], playGround, canvas, context);
		const newGameSelected = new gameSelected();

		// --> Set Title and Description
		setGameInfo(listOfGames[id]);

		// --> Init the game Selected
		// newGameSelected.game.startGame();

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
})();


	