/**
 * Creates a randomized array of objects in {x,y} coords
 *
 * @export
 * @param {number} xMax - the maximum x value (based off of zero)
 * @param {number} yMax - the maximum y value (based off of zero)
 * @param {number} numMines - the number of mines to generate
 * @returns {array} an array of randomly generated mines
 */
export function generateMines (xMax, yMax, numMines) {
  const mines = []
  do {
    // get randomized mine coords:
    let x = Math.floor(Math.random() * (xMax + 1))
    let y = Math.floor(Math.random() * (yMax + 1))
    // verify that the mine isn't already generated:
    if (!isMine(mines, { x, y })) {
      mines.push({ x, y })
    }
  } while (mines.length < numMines)
  return mines
}
/**
 * Creates a "board" with nested rows and column arrays with an object at each
 * square.
 *
 * @export
 * @param {number} xMax - the maximum x value (based off of zero)
 * @param {number} yMax - the maximum y value (based off of zero)
 * @param {array} random coordinates of mines
 * @returns {array} returns the created board
 */
export function layMines (xMax, yMax, mines) {
  // create the board
  let board = []
  for (let x = 0; x <= xMax; x++) {
    // now create a fresh column:
    let column = []
    for (let y = 0; y <= yMax; y++) {
      column.push({
        isMine: isMine(mines, { x, y }),
        isSwept: false,
        isFlag: false
      })
    }
    board.push(column)
  }
  return board
}
/**
 * Adds "minesNearby" value to each square on the board
 *
 * @export
 * @param {number} xMax - the x size of the board
 * @param {number} yMax - the y size of the board
 * @param {array} the board
 * @returns {array} updates the board with "minesNearby" set
 */
export function addBoardHelpers (xMax, yMax, board) {
  // cycle through every piece on the board:
  for (let x = 0; x <= xMax; x++) {
    for (let y = 0; y <= yMax; y++) {
      // now find the nearby mines
      board[x][y].minesNearby = findNearbyMines(board, { x, y })
    }
  }
  return board
}
/**
 * Checks all the 8 nearby squares, adding up the number of mines
 * 
 * @export
 * @param {array} board
 * @param {object} coords - x and y coords of the square to check
 * @returns {number} -1 if it's a mine; 0-8 for the number of mines nearby
 */
export function findNearbyMines (board, { x, y }) {
  // if the square is a mine, return -1
  if (board[x][y].isMine) return -1
  let minesNearby = 0
  // go through all of the closeby squares:
  for (let xChk = x - 1; xChk <= x + 1; xChk++) {
    for (let yChk = y - 1; yChk <= y + 1; yChk++) {
      if (board[xChk] && board[xChk][yChk] && board[xChk][yChk].isMine) {
        minesNearby++
      }
    }
  }
  return minesNearby
}

/**
 * Determines whether a square is a mine
 *
 * @export
 * @param {array} mines - the array of mine coords
 * @param {object} coords - x and y coords of the square to check
 * @returns {boolean} - a mine, true, or not a mine, false
 */
export function isMine (mines, { x, y }) {
  if (mines.find(square => square.x === x && square.y === y)) {
    return true
  }
  return false
}
/**
 * Recursively check the surrounding squares for mines
 *
 * @export
 * @param {array} board
 * @param {object} settings - contains the size of the board
 * @param {object} coords - x and y coords of the square to check
 * @returns {array} board
 */
export function sweepSquare (board, settings, { x, y }) {
  // sweep the square:
  board[x][y].isSwept = true
  if (board[x][y].minesNearby > 0) {
    return board
  }
  for (let xChk = x - 1; xChk <= x + 1; xChk++) {
    for (let yChk = y - 1; yChk <= y + 1; yChk++) {
      // verify that this square is on the board isn't swept or flagged:
      if (
        xChk <= settings.xMax &&
        xChk >= 0 &&
        yChk <= settings.yMax &&
        yChk >= 0 &&
        !board[xChk][yChk].isSwept &&
        !board[xChk][yChk].isFlag
      ) {
        // call sweepSquare again
        board = sweepSquare(board, settings, { x: xChk, y: yChk })
      }
    }
  }
  return board
}
/**
 * Counts the number squares that have "isSwept"
 *
 * @export
 * @param {array} board
 * @param {object} coords - xMax and yMax coords of the size of the board
 * @returns {number}
 */
export function countSwept (board, { xMax, yMax }) {
  let swept = 0
  // cycle through every piece on the board:
  for (let x = 0; x <= xMax; x++) {
    for (let y = 0; y <= yMax; y++) {
      // now see if it's swept:
      if (board[x][y].isSwept) swept++
    }
  }
  return swept
}
/**
 * Update mines as either flags or swept upon winning
 *
 * @export
 * @param {array} board
 * @param {array} mines
 * @param {string} status
 * @returns {array} the updated board
 */
export function updateMines (board, mines, status) {
  Object.keys(mines).forEach(i => {
    if (status === 'win') {
      board[mines[i].x][mines[i].y].isFlag = true
    } else {
      board[mines[i].x][mines[i].y].isSwept = true
    }
  })
  return board
}