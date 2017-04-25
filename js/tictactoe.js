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
var matrix = build();
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

// Build a new all-0 matrix
function build(){
	var temp = new Array(4);
	for (var i = 0; i < temp.length; i++){
		temp[i] = new Array(4);
	}
	return temp;
}

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

function search(state){

	// assign utility variable v to max_value function call
	var v = max_value(state, min_utility, max_utility);
	// return the action in actions(state) with value v

}

// Given current state, return a list of possible actions (matrix position)
function actions(state){
	var result = []
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state[0].length; j++){
			if (state[i][j] == 0){
				result.push([i,j]);
			}
		}
	}
	return result
}

// Test if game is done
function terminal_test(state){
	// Draw test
	if (move_count == 16){
		return 0
	}

	// Horizontal line test
	for (var i = 0; i < state.length; i++){
		if (state[i][0] == state[i][1] == state[i][2] == state[i][3] != 0){
			return state[i][0];
		}
	}

	// Vertical line test
	for (var j = 0; j < state[0].length; j++){
		if (state[0][j] == state[1][j] == state[2][j] == state[3][j] != 0){
			return state[0][j];
		}
	}

	// Diagonal line test
	if (state[3][0] == state[2][1] == state[1][2] == state[0][3] != 0){
		return state[3][0];
	}
	if (state[0][0] == state[1][1] == state[2][2] == state[3][3] != 0){
		return state[0][0];
	}
	
	// Unfinish game
	return -1;
}

// Utility
var utility = {
	0: 0,
	1: -1000,
	2: 1000
}

// Max search
function max_value(state, alpha, beta){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	var v = min_utility;
	actions(state).forEach(function(a){
		v = Math.max(v, min_value(result(state, a, 2), alpha, beta));
		if (v >= beta){return v;}
		alpha = Math.max(alpha, v);
	});
	return v;
}

// Min search
function min_value(state, alpha, beta){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	var v = max_utility;
	actions(state).forEach(function(a){
		v = Math.min(v, max_value(result(state, a, 1), alpha, beta));
		if (v <= alpha){return v;}
		beta = Math.min(beta, v);
	});
	return v;
}

// result function. Take current matrix and an action, return resulting matrix
function result(state, act, player){
	var temp = build();
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state[0].length; j++){
			temp[i][j] = state[i][j];
		}
	}
	temp[act[0]][act[1]] = player;
	return temp;
}
















