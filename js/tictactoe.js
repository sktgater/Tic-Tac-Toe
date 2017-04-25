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
var move_count = 0; 		// count how many moves so far

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
	 move_count++;
	// Player 2 plays
	player2plays(matrix);
});

// Reset all squares to be empty
function reset(){
	// Display Reset
	squares.removeClass("player1 player2");
	messageDisaplay.textContent = "";

	// Game Data Reset
	gameDone = false;
	move_count = 0;
	for (var i= 0; i < matrix.length; i++){
		for (var j = 0; j < matrix[0].length; j++){
			matrix[i][j] = 0;
		}
	}
}

// Player 2 Plays
function player2plays(matrix){
	// Calculate right move
	var move = search(matrix);
	// Change matrix cell

	// Change display

}

// Player 2 finds its next move by looking at the current state
var min_utility = -1000;
var max_utility = 1000;

function search(matrix){

	// assign utility variable v to max_value function call
	var v = max_value(matrix, min_utility, max_utility);
	// return the action in actions(matrix) with value v

}

// Given current state, return a list of possible actions (matrix position)
function actions(matrix){
	var result = []
	for (var i = 0; i < matrix.length; i++){
		for (var j = 0; j < matrix[0].length; j++){
			if (matrix[i][j] == 0){
				result.push([i,j]);
			}
		}
	}
	return result
}

// Test if game is done
function terminal_test(matrix){
	// Draw test
	if (move_count == 16){
		return 0
	}

	// Horizontal line test
	for (var i = 0; i < matrix.length; i++){
		if (matrix[i][0] == matrix[i][1] == matrix[i][2] == matrix[i][3] != 0){
			return matrix[i][0];
		}
	}

	// Vertical line test
	for (var j = 0; j < matrix[0].length; j++){
		if (matrix[0][j] == matrix[1][j] == matrix[2][j] == matrix[3][j] != 0){
			return matrix[0][j];
		}
	}

	// Diagonal line test
	if (matrix[3][0] == matrix[2][1] == matrix[1][2] == matrix[0][3] != 0){
		return matrix[3][0];
	}
	if (matrix[0][0] == matrix[1][1] == matrix[2][2] == matrix[3][3] != 0){
		return matrix[0][0];
	}
	
	// Unfinish test
	return -1;
}

// Max search
function max_value(matrix, alpha, beta){
	if (terminal_test(matrix)){return }


}

















