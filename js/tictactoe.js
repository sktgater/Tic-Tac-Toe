//Author: Li Wang
//Date: Apr 24 2017
//Title: Tic Tac Toe game with AI experiments
//Description:
//This game is for testing various AI algorithms in Tic Tac Toe.


// Select Elements
var squares = $(".square");
var messageDisaplay = $("#message");
var h1 = $("h1");
var resetBtn = $("#reset");
var easybtn = $("#easybtn");
var mediumbtn = $("#mediumbtn");
var hardbtn = $("#hardbtn");

// Game Variables
var matrix = new Array(4);
for (var i = 0; i < matrix.length; i++){
	matrix[i] = new Array(4);
};
reset();
var mode = "hard";
var gameDone = false;

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
// Update matrix for player 1. Then player 2 plays
squares.on("click", function(){
	$(this).addClass("player1");
	// Change cell value in matrix
	var position = $(this).attr('id');
	var row = position.charAt(1);
	var col = position.charAt(3);
	matrix[row][col] = 1;

	// Player 2 plays
	player2plays();
});

// Reset all squares to be empty
function reset(){
	// Display Reset
	squares.removeClass("player1 player2");
	messageDisaplay.textContent = "";

	// Game Data Reset
	gameDone = false;
	for (var i= 0; i < matrix.length; i++){
		for (var j = 0; j < matrix[0].length; j++){
			matrix[i][j] = 0;
		}
	}
}

// Player 2 Plays
function player2plays(){

}













