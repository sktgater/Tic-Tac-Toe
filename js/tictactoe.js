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
var gameDone;
var move_count;		// count how many moves so far
reset();
var mode = "hard";
var min_utility = -1000;
var max_utility = 1000;

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
	player2plays();
});

// Player 2 Plays
function player2plays(){
	// Calculate right move
	var move = search(matrix);
	// Change matrix cell
	matrix[move[0]][move[1]] = 2;
	// Change display
	var id = "r" + move[0] + "c" + move[1];
	$("#" + id).addClass("player2");
}

// Player 2 finds its next move by looking at the current state
function search(state){

	// 
	// assign utility variable v to max_value function call
	var v = max_value(state, min_utility, max_utility, previous_action);
	
	// return the action in actions(state) with value v
	
}

// Max search
function max_value(state, alpha, beta){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	var v = min_utility;
	actions(state).forEach(function(a){
		var search_res = min_value(result(state, a, 2), alpha, beta);
		v = Math.max(v, search_res)
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
		var search_res = max_value(result(state, a, 1), alpha, beta);
		v = Math.min(v, search_res)
		if (v <= alpha){return v;}
		beta = Math.min(beta, v);
	});
	return v;
}

/********************* Helper functions below *********************/

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

// Test if game is done
function terminal_test(state){

	// Horizontal line test
	for (var i = 0; i < state.length; i++){
		if (state[i][0] == state[i][1] == state[i][2] == state[i][3] != 0){
			gameDone = true;
			return state[i][0];
		}
	}

	// Vertical line test
	for (var j = 0; j < state[0].length; j++){
		if (state[0][j] == state[1][j] == state[2][j] == state[3][j] != 0){
			gameDone = true;
			return state[0][j];
		}
	}

	// Diagonal line test
	if (state[3][0] == state[2][1] == state[1][2] == state[0][3] != 0){
		gameDone = true;
		return state[3][0];
	}
	if (state[0][0] == state[1][1] == state[2][2] == state[3][3] != 0){
		gameDone = true;
		return state[0][0];
	}

	// Draw test
	if (move_count == 16){
		gameDone = true;
		return 0
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

// Build a new empty 4*4 matrix
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











