import { GAME_CREATE } from './types'

export function createGame (length = 9, height = 9, numMines = 10) {
  // turn the length and height into x y coords:
  const xMax = length - 1
  const yMax = height - 1
  // generate random mines:
  const mines = generateMines(xMax, yMax, numMines)
  // lay the mines on the board:
  const board = layMines(xMax, yMax, mines)
  // add the board helpers:
  const boardReady = addBoardHelpers(board)
  return {
    type: GAME_CREATE,
    payload: {
      mines,
      board: boardReady
    }
  }
}

function generateMines (xMax, yMax, numMines) {
  const mines = []
  do {
    // get randomized mine coords:
    let x = Math.floor(Math.random() * (xMax + 1))
    let y = Math.floor(Math.random() * (yMax + 1))
    // verify that the mine isn't already generated:
    if (!isMine(mines, {x, y})) {
      mines.push({x, y})
    }
  } while (mines.length < numMines)
  return mines
}

function layMines (xMax, yMax, mines) {
  // create the board
  let board = []
  for (let x = 0; x <= xMax; x++) {
    // now create a fresh row:
    let row = []
    for (let y = 0; y <= yMax; y++) {
      row.push({
        isMine: isMine(mines, {x, y}),
        isSwept: false
      })
    }
    board.push(row)
  }
  return board
}

function addBoardHelpers (board) {
  // cycle through every piece on the board:
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      console.log(x, y, board[x][y].isMine)
      // now find the nearby mines
      board[x][y].minesNearby = findNearbyMines(board, {x, y})
    }
  }
  return board
}

function findNearbyMines (board, { x, y }) {
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

function isMine (mines, { x, y }) {
  if (mines.find(square => (square.x === x && square.y === y))) {
    return true
  }
  return false
}
