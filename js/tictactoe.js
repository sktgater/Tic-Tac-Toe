//Author: Li Wang
//Date: Apr 24 2017
//Title: Tic Tac Toe game with AI experiments
//Description:
//This game is for testing various AI algorithms in Tic Tac Toe.

// Select Elements
var squares = $(".square");
var messageDisaplay = document.querySelector("#message");
var h1 = $("h1");
var resetBtn = $("#reset");
var easybtn = $("#easybtn");
var mediumbtn = $("#mediumbtn");
var hardbtn = $("#hardbtn");

// Game Variables
var matrix = build();
var move_count;		// count how many moves so far
reset();
var mode = "hard";
var min_utility = -1000;
var max_utility = 1000;
var action;			// global variable "action" that saves the action in DFS

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
	// reset
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

	switch(terminal_test(matrix)){
		case 0:
			messageDisaplay.textContent = "Draw Game";
			break;
		case 1:
			messageDisaplay.textContent = "You Win!";
			break;
		case 2:
			messageDisaplay.textContent = "You Lose!";
			break;
		default:
			break;
	}
	// player 2 plays
	player2plays();
	switch(terminal_test(matrix)){
		case 0:
			messageDisaplay.textContent = "Draw Game";
			break;
		case 1:
			messageDisaplay.textContent = "You Win!";
			break;
		case 2:
			messageDisaplay.textContent = "You Lose!";
			break;
		default:
			break;
	}
});

// Player 2 Plays
function player2plays(){

	// Calculate right move
	if (mode == "hard"){
		search(matrix);
	}
	
	// Change matrix cell
	matrix[action[0]][action[1]] = 2;
	
	// Change display
	var id = "r" + action[0] + "c" + action[1];
	$("#" + id).addClass("player2");

	move_count++;
}

// Player 2 finds its next move by looking at the current state
function search(state){

	// assign utility variable v to max_value function call
	var v = max_value(state, min_utility, max_utility);

}

// Max search
function max_value(state, alpha, beta){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	var v = min_utility;
	var max_actions = actions(state);
	for (var i = 0; i < max_actions.length; i++){
		var search_res = min_value(result(state, max_actions[i], 2), alpha, beta);
		if (search_res >= v){
			action = max_actions[i];
			v = search_res;
		}
		if (v >= beta){return v;}
		alpha = Math.max(alpha, v);
	}
	return v;
}

// Min search
function min_value(state, alpha, beta){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	var v = max_utility;
	var min_actions = actions(state);
	for (var i = 0; i < min_actions.length; i++){
		var search_res = max_value(result(state, min_actions[i], 2), alpha, beta);
		v = Math.min(v, search_res);
		if (v <= alpha){return v;}
		beta = Math.min(beta, v);
	}
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

// Test if game is done. 
// Return 1 for player 1 wins; 2 for player 2 wins; 0 for draw; -1 for unfinished game
function terminal_test(state){
	var s = new Set();
	// Horizontal line test
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state[0].length; j++){
			s.add(state[i][j]);
		}
		if (s.size == 1 && !s.has(0)){
			return state[i][0];
		}
		s.clear();
	}
	s.clear();

	// Vertical line test
	for (var j = 0; j < state[0].length; j++){
		for (var i = 0; i < state.length; i++){
			s.add(state[i][j]);
		}
		if (s.size == 1 && !s.has(0)){
			return state[0][j];
		}
		s.clear();
	}
	s.clear();

	// Diagonal line test
	for (var i = 3, j = 0; i >= 0; i--, j++){
		s.add(state[i][j]);
	}
	if (s.size == 1 && !s.has(0)){
		return state[3][0];
	}
	s.clear();
	for (var i = 0, j = 0; i < 4; i++, j++){
		s.add(state[i][j]);
	}
	if (s.size == 1 && !s.has(0)){
		return state[0][0];
	}

	// Draw test
	if (move_count == 16){
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

	// shuffle an array. This is to randomize actions array
	function shuffle(array) {
  		var currentIndex = array.length, temporaryValue, randomIndex;

	  	// While there remain elements to shuffle...
	  	while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	 	}

  		return array;
	}

	// find all cells in matrix that has value 0. It is a possible action.
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state[0].length; j++){
			if (state[i][j] == 0){
				result.push([i,j]);
			}
		}
	}

	result = shuffle(result);
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
	move_count = 0;
	for (var i= 0; i < matrix.length; i++){
		for (var j = 0; j < matrix[0].length; j++){
			matrix[i][j] = 0;
		}
	}
	action = undefined;
}











