Title: 4 x 4 Tic Tac Toe Game 

Author: Li Wang

Description:

This web-based 4 x 4 tic-tac-toe game implements AI for human-computer competition.

Used Technology:

HTML, CSS (front-end)
JavaScript (core algorithms)
jQuery (back-end)

Usage:

Use web browser to open tictactoe.html. No other program needed.

Design:

This game has three modes for player to choose: easy, medium, hard. 
Easy and medium modes implement AI with different evaluation functions to determine its best move.
Medium mode has a different evaluation function that performs better than the one in easy mode.
Hard mode implements alpha-beta search algorithm for determinating next move.
If time spent calculating next best action is longer than ten (10) seconds, alpha-beta search algorithm is cut off and use the evaluation function in "easy" mode to compute expected utility.

This game also outputs the following statistics each time alpha-beta search algorithm is used
in JavaScript Console:
- whether cutoff occurs
- maximum depth reached while searching
- total number of nodes generated
- number of times number of times pruning occurred within the MAX-VALUE function 
- number of times pruning occurred within the MIN-VALUE function