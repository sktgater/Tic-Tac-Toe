//Author: Li Wang
//Date: Apr 24 2017
//Title: Tic Tac Toe game with AI experiments
//Description:
//This game is for testing various AI algorithms in Tic Tac Toe.

// Select Page Elements
var squares = $(".square");
var messageDisaplay = document.querySelector("#message");
var h1 = $("h1");
var resetBtn = $("#reset");
var easybtn = $("#easybtn");
var mediumbtn = $("#mediumbtn");
var hardbtn = $("#hardbtn");
var humanfirst = $("#humanfirst");
var aifirst = $("#aifirst");

// Game Variables
var matrix = build();
var move_count;		// count how many moves so far
reset();
var mode = "hard";
var min_utility = -1000;
var max_utility = 1000;
var action;			// global variable "action" that saves the player 2's action

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
	if (aifirst.hasClass("selected")){
		player2plays();
	}
});

// Human First Button
humanfirst.on("click", function(){

	// Display change
	humanfirst.addClass("selected");
	aifirst.removeClass("selected");

	// reset all squares
	reset();
});

// AI First Button
aifirst.on("click", function(){
	aifirst.addClass("selected");
	humanfirst.removeClass("selected");

	//reset all squares
	reset();

	// AI plays
	var previous_mode;
	if (mode == "hard"){
		previous_mode = "hard";
		mode = "easy";
		console.log("Cutoff Occurs!");
	}
	player2plays();
	mode = previous_mode;

});

// Player 1 clicks on squares; mark player 1's move
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
	else {
		evalplay(matrix);
	}
	// Change matrix cell
	matrix[action[0]][action[1]] = 2;
	
	// Change display
	var id = "r" + action[0] + "c" + action[1];
	$("#" + id).addClass("player2");

	move_count++;
}

/********************* Alpha-Beta Search for Player 2 *********************/
var depth = 0,
	node_num = 0,
	max_prune = 0,
	min_prune = 0;

// Player 2 finds its next move by alpha-beta search
function search(state){

	// assign utility variable v to max_value function call
	node_num++;
	var v = max_value(state, min_utility, max_utility, 0);

	// Display Statistics
	console.log("No Cutoff Appears");
	console.log("Max Depth: " + depth);
	console.log("Number of Nodes Generated: " + node_num);
	console.log("Number of Pruning in MAX-VALUE: " + max_prune);
	console.log("Number of Pruning in MIN-VALUE: " + min_prune);
	depth = node_num = max_prune = min_prune = 0;

}

// Max search
function max_value(state, alpha, beta, previous_depth){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	if (depth < previous_depth + 1){depth++;}
	var v = min_utility;
	var max_actions = actions(state);
	node_num += max_actions.length;
	for (var i = 0; i < max_actions.length; i++){
		var search_res = min_value(result(state, max_actions[i], 2), alpha, beta, previous_depth+1);
		if (search_res >= v){
			action = max_actions[i];
			v = search_res;
		}
		if (v >= beta){
			max_prune++;
			node_num -= (max_actions.length - i - 1);
			return v;
		}
		alpha = Math.max(alpha, v);
	}
	return v;
}

// Min search
function min_value(state, alpha, beta, previous_depth){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};
	if (depth < previous_depth + 1){depth++;}
	var v = max_utility;
	var min_actions = actions(state);
	node_num += min_actions.length;
	for (var i = 0; i < min_actions.length; i++){
		var search_res = max_value(result(state, min_actions[i], 1), alpha, beta, previous_depth+1);
		v = Math.min(v, search_res);
		if (v <= alpha){
			min_prune++;
			node_num -= (min_actions.length - i - 1);
			return v;
		}
		beta = Math.min(beta, v);
	}
	return v;
}

/********************* Easy & Medium Mode for Player 2 *********************/
function evalplay(state){
	var test = terminal_test(state);
	if (test >= 0){return utility[test]};

	var possibleActions = actions(state);
	var v = min_utility;
	for (var i = 0; i < possibleActions.length; i++){
		var next_state = result(state, possibleActions[i], 2);

		// terminal winning state found. Take the action
		if (terminal_test(next_state) == 2){
			action = possibleActions[i];
			v = max_utility;
			break;
		}

		// non-terminal state. Calling evaluation function
		var u = eval(next_state);
		if (u >= v){
			action = possibleActions[i];
			v = u;
		}
	}
	return v;
}

// eval function. Takes in current state and returns expected utility
function eval(state){
	var dic = {
		x3: 0,
		x2: 0,
		x1: 0,
		o3: 0,
		o2: 0,
		o1: 0
	}
	var xcnt = 0,
		ocnt = 0;

	// Horizontal lines test
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state[0].length; j++){
			if (state[i][j] == 1){ocnt++;}
			else if (state[i][j] == 2){xcnt++;}
		}
		// this line has both X and O. Not interested.
		if (xcnt != 0 && ocnt != 0){
			xcnt = 0;
			ocnt = 0;
			continue;
		}
		// has only X or only O. Record.
		switch(xcnt){
			case 1:
				dic.x1++;
				break;
			case 2:
				dic.x2++;
				break;
			case 3:
				dic.x3++;
				break;
		}
		switch(ocnt){
			case 1:
				dic.o1++;
				break;
			case 2:
				dic.o2++;
				break;
			case 3:
				dic.o3++;
				break;
		}
		// reset for next row
		xcnt = ocnt = 0;

	}
	// Vertical lines test
	for (var j = 0; j < state[0].length; j++){
		for (var i = 0; i < state.length; i++){
			if (state[i][j] == 1){ocnt++;}
			else if (state[i][j] == 2){xcnt++;}
		}
		// this line has both X and O. Not interested.
		if (xcnt != 0 && ocnt != 0){
			xcnt = 0;
			ocnt = 0;
			continue;
		}
		// has only X or only O. Record.
		switch(xcnt){
			case 1:
				dic.x1++;
				break;
			case 2:
				dic.x2++;
				break;
			case 3:
				dic.x3++;
				break;
		}
		switch(ocnt){
			case 1:
				dic.o1++;
				break;
			case 2:
				dic.o2++;
				break;
			case 3:
				dic.o3++;
				break;
		}
		// reset for next column
		xcnt = ocnt = 0;

	}

	// Diagonal line test
	// 45 degrees line
	for (var i = 3, j = 0; i >= 0, j <= 3; i--, j++){
		if (state[i][j] == 1){ocnt++;}
		else if (state[i][j] == 2){xcnt++;}
	}
	if (!(xcnt != 0 && ocnt != 0)){
		switch(xcnt){
			case 1:
				dic.x1++;
				break;
			case 2:
				dic.x2++;
				break;
			case 3:
				dic.x3++;
				break;
		}
		switch(ocnt){
			case 1:
				dic.o1++;
				break;
			case 2:
				dic.o2++;
				break;
			case 3:
				dic.o3++;
				break;
		}
	}
	xcnt = ocnt = 0;

	// 135 degrees line
	for (var i = 0, j = 0; i <= 3, j <= 3; i++, j++){
		if (state[i][j] == 1){ocnt++;}
		else if (state[i][j] == 2){xcnt++;}
	}
	if (!(xcnt != 0 && ocnt != 0)){
		switch(xcnt){
			case 1:
				dic.x1++;
				break;
			case 2:
				dic.x2++;
				break;
			case 3:
				dic.x3++;
				break;
		}
		switch(ocnt){
			case 1:
				dic.o1++;
				break;
			case 2:
				dic.o2++;
				break;
			case 3:
				dic.o3++;
				break;
		}
	}
	xcnt = ocnt = 0;

	// Calculate utility using evaluation function based on difficulty mode
	var res;
	if (mode == "easy"){
		res = 6 * dic.x3 + 3 * dic.x2 + dic.x1 - (6 * dic.o3 + 3 * dic.o2 + dic.o1);
	}
	else if (mode == "medium"){
		res = 100 * dic.x3 + 10 * dic.x2 + dic.x1 - (100 * dic.o3 + 10 * dic.o2 + dic.o1);
	} 
	return res;
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
	console.clear();

	// Game Data Reset
	move_count = 0;
	for (var i= 0; i < matrix.length; i++){
		for (var j = 0; j < matrix[0].length; j++){
			matrix[i][j] = 0;
		}
	}
	action = undefined;
}