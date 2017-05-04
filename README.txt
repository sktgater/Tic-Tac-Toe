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

The Core Rules Designing the Game Strategy:
Rule 1: If the AI player has a winning move, take it.
Rule 2: If the human player has a winning move, block it.
Rule 3: If the AI player can create a fork (two winning ways) after this move, do it.
Rule 4: Do not let the human player creating a fork after my move. 
Rule 5: Place in the position such as AI may win in the most number of possible ways.

This game also outputs the following statistics each time alpha-beta search algorithm is used
in JavaScript Console:
- whether cutoff occurs
- maximum depth reached while searching
- total number of nodes generated
- number of times pruning occurred within the MAX-VALUE function 
- number of times pruning occurred within the MIN-VALUE function


Complete game source code is also available on the github at:

https://github.com/sktgater/Tic-Tac-Toe