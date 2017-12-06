import {
  GAME_CREATE,
  GAME_START,
  GAME_UPDATE_FLAGS,
  GAME_WIN,
  GAME_LOSE,
  GAME_SWEEP
} from './types'

export function createGame (width = 9, height = 9, numMines = 4) {
  // turn the width and height into xMax yMax coords based off 0:
  const xMax = width - 1
  const yMax = height - 1
  const size = { width, height, xMax, yMax, numMines }
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
    console.log('YOU LOSE!')
    // reveal all the mines:
    return {
      type: GAME_LOSE,
      payload: {
        board: updateMines(board, mines, 'lose'),
        explosionCoords: {x, y}
      }
    }
  }
  // square is not a mines so let's investigate nearby squares:
  const sweptBoard = squareCursion(board, size, { x, y })
  const squaresSwept = countSwept(sweptBoard, size)

  // now let's check the status of our game:
  // if the squaresSwept + number of mines = all the squares:
  if (squaresSwept + size.numMines === (size.width * size.height)) {
    console.log('YOU WIN!')
    // now let's cover all the mines with flags

    return {
      type: GAME_WIN,
      payload: {
        board: updateMines(sweptBoard, mines, 'win'),
        squaresSwept,
        flagsRaised: size.numMines
      }
    }
  }
  return {
    type: GAME_SWEEP,
    payload: {
      sweptBoard,
      squaresSwept
    }
  }
}

function squareCursion (board, size, { x, y }) {
  // sweep the square:
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
        !board[xChk][yChk].isSwept &&
        !board[xChk][yChk].isFlag
      ) {
        board = squareCursion(board, size, { x: xChk, y: yChk })
      }
    }
  }
  return board
}

function countSwept (board, { xMax, yMax }) {
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

function updateMines (board, mines, status) {
  Object.keys(mines).forEach(i => {
    if (status === 'win') {
      board[mines[i].x][mines[i].y].isFlag = true
    } else {
      board[mines[i].x][mines[i].y].isSwept = true
    }
  })
  return board
}
export function startGame () {
  return {
    type: GAME_START,
    action: null
  }
}

export function toggleFlag ({ board, flagsRaised }, { x, y }) {
  // toggle the flag:
  board[x][y].isFlag = !board[x][y].isFlag
  // update the flagsRaised:
  const flagsRaisedUpdated = board[x][y].isFlag
    ? flagsRaised + 1
    : flagsRaised - 1
  return {
    type: GAME_UPDATE_FLAGS,
    payload: {
      board,
      flagsRaised: flagsRaisedUpdated
    }
  }
}
