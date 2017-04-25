//Author: Li Wang
//Date: Apr 24 2017
//Title: Tic Tac Toe game with AI experiments
//Description:
//This game is for testing various AI algorithms for Tic Tac Game.


// Select Elements
var squares = $(".square");
var messageDisaplay = $("#message");
var h1 = $("h1");
var resetBtn = $("#reset");
var easybtn = $("#easybtn");
var mediumbtn = $("#mediumbtn");
var hardbtn = $("#hardbtn");

// Game Variables
var matrix = [];
var row = [0,0,0,0];
for (var i = 0; i < 4; i++){
	matrix.push(row);
};
var mode = "hard";


// Easy Button
easybtn.on("click", function(){

	// Game Mode Display chosen color
	easybtn.addClass("selected");
	mediumbtn.removeClass("selected");
	hardbtn.removeClass("selected");

	reset();

	// Change game to EASY setting
	mode = "easy";
});

// Medium Button
mediumbtn.on("click", function(){

	// Game Mode Display chosen color
	mediumbtn.addClass("selected");
	easybtn.removeClass("selected");
	hardbtn.removeClass("selected");
	// reset all squares
	reset();
	// Change game to MEDIUM setting
	mode = "medium";
});


// Hard Button
hardbtn.on("click", function(){

	// Display chosen color
	hardbtn.addClass("selected");
	easybtn.removeClass("selected");
	mediumbtn.removeClass("selected");
	// reset all squares
	reset();
	// Change game to HARD setting
	mode = "hard";
});

// Reset button
resetBtn.on("click", function () {
	// reset all squares
	reset();
});

// Player 1 Clicks on squares. Change color to blue to mark player 1's move
squares.on("click", function(){
	$(this).addClass("player1");
	// Change cell value in matrix
});

// Reset all squares to be empty
function reset(){
	squares.removeClass("player1 player2");
	messageDisaplay.textContent = "";
}















