function GameIndex(gameinfo, playGround, canvas, context) {

	// --> Validate CANVAS already exist, append canvas to playground
	if (playGround.children.length < 1) 
		playGround.append(canvas);

	const index = {
		Breakout: function() {

			canvas.width = 330;
      		canvas.height = 350;

			this.name = gameinfo.name;
			this.description = gameinfo.description;

			this.game = new Breakout(canvas, context);

		},
		Pong: function() {

			this.name = gameinfo.name;

			canvas.width = 10;
      		canvas.height = 10;

		},
		Snake: function() {
			this.name = gameinfo.name;
		},
		Pacman: function() {
			this.name = gameinfo.name;
		},
		Asteroids: function() {
			this.name = gameinfo.name;
		}
	}

	return index[gameinfo.name];

}