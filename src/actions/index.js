import { GAME_CREATE, GAME_LOSE, GAME_SWEEP } from './types'

export function createGame (width = 9, height = 9, numMines = 10) {
  // turn the width and height into xMax yMax coords based off 0:
  const xMax = width - 1
  const yMax = height - 1
  const size = { width, height, xMax, yMax }
  // generate random mines:
  const mines = generateMines(xMax, yMax, numMines)
  // lay the mines on the board:
  const board = layMines(xMax, yMax, mines)
  // add the board helpers:
  const boardReady = addBoardHelpers(xMax, yMax, board)
  return {
    type: GAME_CREATE,
    payload: {
      size,
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
    if (!isMine(mines, { x, y })) {
      mines.push({ x, y })
    }
  } while (mines.length < numMines)
  return mines
}

function layMines (xMax, yMax, mines) {
  // create the board
  let board = []
  for (let x = 0; x <= xMax; x++) {
    // now create a fresh row:
    let column = []
    for (let y = 0; y <= yMax; y++) {
      column.push({
        isMine: isMine(mines, { x, y }),
        isSwept: false
      })
    }
    board.push(column)
  }
  return board
}

function addBoardHelpers (xMax, yMax, board) {
  // cycle through every piece on the board:
  for (let x = 0; x <= xMax; x++) {
    for (let y = 0; y <= yMax; y++) {
      // now find the nearby mines
      board[x][y].minesNearby = findNearbyMines(board, { x, y })
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
  if (mines.find(square => square.x === x && square.y === y)) {
    return true
  }
  return false
}

export function clickSquare (game, { x, y }) {
  const { board, mines, size } = game
  // check if it's a mine:
  if (board[x][y].isMine) {
    console.log('you lose')
    return {
      type: GAME_LOSE,
      payload: board
    }
  }
  // now check if it's a number:
  if (board[x][y].minesNearby > 0) {
    // just sweep that square:
    console.log('one sweep')
    board[x][y].isSwept = true
    return {
      type: GAME_SWEEP,
      payload: board
    }
  }
  // it's an empty square so let's recursively go through nearby squares:
  return {
    type: GAME_SWEEP,
    payload: squareCursion(board, size, { x, y })
  }
}

function squareCursion (board, size, { x, y }) {
  // console.log(board.length)
  board[x][y].isSwept = true
  if (board[x][y].minesNearby > 0) {
    return board
  }
  for (let xChk = x - 1; xChk <= x + 1; xChk++) {
    for (let yChk = y - 1; yChk <= y + 1; yChk++) {
      if (
        xChk <= size.xMax &&
        xChk >= 0 &&
        yChk <= size.yMax &&
        yChk >= 0 &&
        !board[xChk][yChk].isSwept
      ) {
        board = squareCursion(board, size, { x: xChk, y: yChk })
      }
    }
  }
  return board
}
