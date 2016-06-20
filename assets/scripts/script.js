window.onload = function(){
	var player1Name;
	var player2Name;
	var turnCounter=0;
	var currPlayer;
	var boardObject = {
		1 : "",
		2 : "",
		3 : "",
		4 : "",
		5 : "",
		6 : "",
		7 : "",
		8 : "",
		9 : ""
	}
	var player1Wins=0;
	var player2Wins=0;
	var keepPlaying = true;

	var winningPossibilities = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ];

	addAutoFocus("#player1Input");	
	document.querySelector("#submitButton1").addEventListener("click",submitButton1);
	document.querySelector("#submitButton2").addEventListener("click",submitButton2);
	//while(keepPlaying) {
		document.querySelector("#box1").addEventListener("click",makeMove);
		document.querySelector("#box2").addEventListener("click",makeMove);
		document.querySelector("#box3").addEventListener("click",makeMove);
		document.querySelector("#box4").addEventListener("click",makeMove);
		document.querySelector("#box5").addEventListener("click",makeMove);
		document.querySelector("#box6").addEventListener("click",makeMove);
		document.querySelector("#box7").addEventListener("click",makeMove);
		document.querySelector("#box8").addEventListener("click",makeMove);
		document.querySelector("#box9").addEventListener("click",makeMove);

	document.querySelector("#resetGame").addEventListener("click",resetGame);
	//}

	function submitButton1() {
		event.preventDefault();
		addClass("#player1Form","hidden");
		removeClass("#player2Form","hidden");
		player1Name = assignPlayerName("#player1Input");
		document.querySelector("#player2Input").click();
		addAutoFocus("#player2Input");	


		// document.querySelector("#newDiv").textContent = assignPlayerName("#player1Input");
	}

	function submitButton2() {
		event.preventDefault();
		addClass("#player2Form","hidden");
		removeClass("#leftContainer","hidden");
		removeClass("#gamePlay","hidden");
		//removeClass("#ticTacToe","hidden");
		player2Name = assignPlayerName("#player2Input");
		incrementTurn();
		addText(player1Name+": "+player1Wins,"#player1Score");
		addText(player2Name+": "+player2Wins,"#player2Score");
		addText("Who's Up: "+currPlayer,"#currPlayer");
	}

	function makeMove() {
		console.log("turnCounter "+turnCounter);
		console.log("currPlayer: "+currPlayer);
		var boxClicked = this.getAttribute("data-id");
		if(boardObject[boxClicked]==="" && keepPlaying) {
			this.textContent += whichSymbol();
			addClass("#box"+boxClicked,whichColor());
			boardObject[boxClicked] = currPlayer;
			addMoveMessage(boxClicked);
			if(checkWinner(currPlayer) === currPlayer) {
				addText(player1Name+": "+player1Wins,"#player1Score");
				addText(player2Name+": "+player2Wins,"#player2Score");
				addWinnerMessage();
			} else if (!checkBoxesLeft()) {
				addGameOverMessage();
			}

		incrementTurn();
		addText("Who's Up: "+currPlayer,"#currPlayer");	
		} //else {
			//console.log("already clicked");
		//}
	}

	function assignPlayerName(nameInput) {
		return document.querySelector(nameInput).value;
	}

	function addClass(queryStr,classToAdd) {
		document.querySelector(queryStr).className += " "+classToAdd;
	}

	function removeClass(queryStr,className) {
		var classes = document.querySelector(queryStr).className;
		classes = classes.replace(className,"");
		document.querySelector(queryStr).className = classes;
	}

	function incrementTurn() {
		turnCounter++;
		currPlayer = turnCounter % 2 === 1 ? player1Name : player2Name;
	}

	function whichSymbol() {
		return turnCounter % 2 === 1 ? "X" : "O";
	}

	function whichColor() {
		return turnCounter % 2 === 1 ? "green" : "red";
	}

	function checkWinner(player) {
		for (i = 0; i<winningPossibilities.length; i++) {
			if(boardObject[winningPossibilities[i][0]]===player && boardObject[winningPossibilities[i][1]]===player && boardObject[winningPossibilities[i][2]]===player) {
				if(player===player1Name) {
					player1Wins++;
				} else {
					player2Wins++;
				}
				flipKeepPlaying();
				return player;
				break;
			}
		}
	}

	function checkBoxesLeft() {
		var i=1;
		var someGuessesLeft=false;
		while (i<=Object.keys(boardObject).length && !someGuessesLeft) {
			if(boardObject[i]==="") {
				someGuessesLeft = true;
			}
			i++;
		}
		return someGuessesLeft;
	}

	function addAutoFocus(queryStr) {
		document.querySelector(queryStr).focus();
	}

	function addText(textToAdd,queryStr) {
		document.querySelector(queryStr).textContent = textToAdd;
	}

	function flipKeepPlaying() {
		keepPlaying = !keepPlaying;
	}

	function addMoveMessage(boxSelected) {
		var newDiv = document.createElement('div');
		newDiv.textContent = currPlayer+" just selected Box " + boxSelected;
		// document.querySelector("#messageBoard").appendChild(newDiv);
		document.querySelector("#messageBoard").insertBefore(newDiv,document.querySelector("#messageBoard").firstChild);
	}

	function addWinnerMessage() {
		var newDiv=document.createElement('div');
		newDiv.textContent = currPlayer+" just won! The overall game score is "+player1Name+": "+player1Wins+" to "+player2Name+" "+player2Wins;
		// document.querySelector("#messageBoard").appendChild(newDiv);
		document.querySelector("#messageBoard").insertBefore(newDiv,document.querySelector("#messageBoard").firstChild);
	}

	function addResetGameMessage() {
		var newDiv = document.createElement('div');
		newDiv.textContent = "The game has been reset!  Start again!"
		// document.querySelector("#messageBoard").appendChild(newDiv);
		document.querySelector("#messageBoard").insertBefore(newDiv,document.querySelector("#messageBoard").firstChild);
	}

	function addGameOverMessage() {
		var newDiv = document.createElement('div');
		newDiv.textContent = "There is no winner! Reset the game to play again."
		// document.querySelector("#messageBoard").appendChild(newDiv);
		document.querySelector("#messageBoard").insertBefore(newDiv,document.querySelector("#messageBoard").firstChild);
	}


	function resetGame() {
		for (var i=1; i<=9; i++) {
			boardObject[i] = "";
			var str = "#box"+i;
			addText("",str);
			removeClass(str,"green");
			removeClass(str,"red");
		}
		keepPlaying = true;
		//incrementTurn();
		addResetGameMessage();
	}
}