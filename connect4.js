/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = new Array(HEIGHT).fill(0).map(() => new Array(WIDTH).fill(0));
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  // creating top element (tr), w/ID of column-top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // creating top width of board
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creating board underneath top 
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(!document.getElementById(`${y}-${x}`).childElementCount > 0) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement('div');
  newDiv.classList.add('piece');
  newDiv.classList.add(`p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(newDiv);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  alert('Resetting Game')
  resetGame();
}

function resetGame() {
  let board = document.getElementById('board');
  board.remove();
  let newBoard = document.createElement('table');
  newBoard.setAttribute('id', 'board');
  let game = document.getElementById('game');
  game.append(newBoard);
  makeBoard();
  makeHtmlBoard();
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log(x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // taken from solution
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // if(checkForFilledBoard){
  //   endGame('Board is filled up!');
  // }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    console.log(cells)
    console.log(board[y][x])
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // Checks every individual cell to confirm a win condition
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // confirms that cell y - x has won horizontally by checking the 3 cells to the right
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // confirms that cell y - x has won vertically by checking the 3 cells below
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // confirms that cell y - x has won horizontally by checking the 3 cells to the lower right
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // confirms that cell y - x has won horizontally by checking the 3 cells to the lower left
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // checks if any win conditions are true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
