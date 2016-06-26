window.onload = function(){
	function Player() {
		this.name = "";
		this.marker = "";
		this.selectionArray = [];
		this.winsCount = 0;
		this.playerID="";
		this.color="";
	}

	Player.prototype = {
		assignPlayerName: function(nameInput) {
			this.name = document.querySelector(nameInput).value;
		},

		assignPlayerID: function(gamePlayObj) {
			this.playerID = gamePlayObj.playerCount + 1;

			if(this.playerID % 2 === 0) {
				this.marker = "O";
				this.color = "red";
			} else {
				this.marker = "X";
				this.color = "green";
			}
		},
		incrementWinsCount: function() {
			this.winsCount += 1;
		}
	};

	function Board() {
		this.boxesSelected = 0;
		this.boxesTotal = 9;
		this.box1="";
		this.box2="";
		this.box3="";
		this.box4="";
		this.box5="";
		this.box6="";
		this.box7="";
		this.box8="";
		this.box9="";
	}

	Board.prototype = {
		selectBox: function (boxNum, currPlayer) {
			this["box"+boxNum] = currPlayer;
			this.boxesSelected += 1;
		},
		checkBoxesLeft: function () {
			return this.boxesSelected === this.boxesTotal;
		},
	};

	function GamePlay() {
		this.turnCounter = 0;
		this.currPlayer = "";
		this.currPlayerObj = {};
		this.player1 = "";
		this.player2 = "";
		this.currColor = "";
		this.currMarker = "";
		this.keepPlaying = true;
		this.playerCount = 0;
		this.boxClicked = "";
	}

	GamePlay.prototype = {
		incrementTurn: function() {
			this.turnCounter+=1;
			this.currPlayer = this.turnCounter % 2 === 1 ? player1.name : player2.name;
			this.currPlayerObj = this.turnCounter % 2 === 1 ? player1 : player2;
			this.currColor = this.currPlayerObj.color;
			this.currMarker = this.currPlayerObj.marker;
		},
		incrementPlayerCount: function() {
			this.playerCount += 1;
		},
		assignBoxClicked: function(boxNum) {
			this.boxClicked = boxNum;
		},
		checkWinner: function(boardObj) {
			for (i = 0; i<winningPossibilities.length; i++) {
				if(boardObj["box"+winningPossibilities[i][0]]===this.currPlayer && boardObj["box"+winningPossibilities[i][1]]===this.currPlayer && boardObj["box"+winningPossibilities[i][2]]===this.currPlayer) {
					this.currPlayerObj.incrementWinsCount();
					this.flipKeepPlaying();
					return this.currPlayer;
				}
			}
		},
		flipKeepPlaying: function() {
			var temp;
			temp = !this.keepPlaying;
			this.keepPlaying = temp;
		},
		resetKeepPlaying: function() {
			this.keepPlaying = true;
		},
		startGame: function() {
			document.querySelector("#box1").addEventListener("click",this.makeMove);
			document.querySelector("#box2").addEventListener("click",this.makeMove);
			document.querySelector("#box3").addEventListener("click",this.makeMove);
			document.querySelector("#box4").addEventListener("click",this.makeMove);
			document.querySelector("#box5").addEventListener("click",this.makeMove);
			document.querySelector("#box6").addEventListener("click",this.makeMove);
			document.querySelector("#box7").addEventListener("click",this.makeMove);
			document.querySelector("#box8").addEventListener("click",this.makeMove);
			document.querySelector("#box9").addEventListener("click",this.makeMove);
			document.querySelector("#resetGame").addEventListener("click",this.resetGame);
			document.querySelector("#submitButton1").addEventListener("click",submitButton1);
			document.querySelector("#submitButton2").addEventListener("click",submitButton2);
			player1 = new Player();
			player1.assignPlayerID(thisGame);
			thisGame.incrementPlayerCount();
			player2 = new Player();
			player2.assignPlayerID(thisGame);
			thisGame.incrementPlayerCount();
		},

		resetGame: function() {
			thisGame.resetKeepPlaying();
			thisBoard = new Board();
			thisHTMLBoard.resetHTMLBoard();
			thisHTMLBoard.addResetGameMessage();
		},

		makeMove: function() {
			thisGame.assignBoxClicked(this.getAttribute("data-id"));
			if(thisBoard["box"+thisGame.boxClicked]==="" && thisGame.keepPlaying) {
				this.textContent += thisGame.currMarker;
				thisHTMLBoard.addClass("#box"+thisGame.boxClicked,thisGame.currColor);
				thisBoard.selectBox(thisGame.boxClicked,thisGame.currPlayer);
				thisHTMLBoard.addMoveMessage(thisGame.boxClicked);
				if(thisGame.checkWinner(thisBoard) === thisGame.currPlayer) {
					thisHTMLBoard.addText(thisGame.player1+": "+player1.winsCount,"#player1Score");
					thisHTMLBoard.addText(thisGame.player2+": "+player2.winsCount,"#player2Score");
					thisHTMLBoard.addWinnerMessage();
				} else if (thisBoard.checkBoxesLeft()) {
					thisHTMLBoard.addGameOverMessage();
				}

			thisGame.incrementTurn();
			thisHTMLBoard.addText("Who's Up: "+thisGame.currPlayer,"#currPlayer");}
		}

	};

	function HTML() {
		this.HTMLBoard = document.querySelectorAll(".box");
		this.messageBoard = document.querySelector('#messageBoard');
	};

	HTML.prototype = {
		resetHTMLBoard: function() {
			var str;
			for(var i=1; i<=this.HTMLBoard.length; i++) {
				str = "#box"+i;
				thisHTMLBoard.addText("",str);
				thisHTMLBoard.removeClass(str,"green");
				thisHTMLBoard.removeClass(str,"red");
			}
		},

		addClass: function(queryStr,classToAdd) {
			document.querySelector(queryStr).className += " "+classToAdd;
		},

		removeClass: function(queryStr,className) {
			var classes = document.querySelector(queryStr).className;
			classes = classes.replace(className,"");
			document.querySelector(queryStr).className = classes;
		},

		addAutoFocus: function(queryStr) {
			document.querySelector(queryStr).focus();
		},

		addText: function(textToAdd,queryStr) {
			document.querySelector(queryStr).textContent = textToAdd;
		},

		addMoveMessage: function(boxSelected) {
			var newDiv = document.createElement('div');
			newDiv.textContent = thisGame.currPlayer+" just selected Box " + boxSelected;
			this.messageBoard.insertBefore(newDiv,this.messageBoard.firstChild);
		},

		addWinnerMessage: function() {
			var newDiv=document.createElement('div');
			newDiv.textContent = thisGame.currPlayer+" just won! The overall game score is "+thisGame.player1+": "+player1.winsCount+" to "+thisGame.player2+" "+player2.winsCount;
			this.messageBoard.insertBefore(newDiv,this.messageBoard.firstChild);
		},

		addResetGameMessage: function() {
			var newDiv = document.createElement('div');
			newDiv.textContent = "The game has been reset!  Start again!";
			this.messageBoard.insertBefore(newDiv,this.messageBoard.firstChild);
		},

		addGameOverMessage: function() {
			var newDiv = document.createElement('div');
			newDiv.textContent = "There is no winner! Reset the game to play again.";
			this.messageBoard.insertBefore(newDiv,this.messageBoard.firstChild);
		}
	}

	var winningPossibilities = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ];

	var player1;
	var player2;
	var thisGame = new GamePlay();
	thisGame.startGame();
	var thisBoard = new Board();
	var thisHTMLBoard = new HTML();
	thisHTMLBoard.addAutoFocus("#player1Input");	


	function submitButton1() {
		event.preventDefault();
		thisHTMLBoard.addClass("#player1Form","hidden");
		thisHTMLBoard.removeClass("#player2Form","hidden");
		player1.assignPlayerName("#player1Input");
		thisHTMLBoard.addAutoFocus("#player2Input");	
	}

	function submitButton2() {
		event.preventDefault();
		thisHTMLBoard.addClass("#player2Form","hidden");
		thisHTMLBoard.removeClass("#leftContainer","hidden");
		thisHTMLBoard.removeClass("#gamePlay","hidden");
		player2.assignPlayerName("#player2Input");
		thisGame.player1=player1.name;
		thisGame.player2=player2.name;
		thisGame.incrementTurn();
		thisHTMLBoard.addText(player1.name+": "+player1.winsCount,"#player1Score");
		thisHTMLBoard.addText(player2.name+": "+player2.winsCount,"#player2Score");
		thisHTMLBoard.addText("Who's Up: "+thisGame.currPlayer,"#currPlayer");
	}

}