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

export function isMine (mines, { x, y }) {
  if (mines.find(square => square.x === x && square.y === y)) {
    return true
  }
  return false
}

export function sweepSquare (board, settings, { x, y }) {
  // sweep the square:
  board[x][y].isSwept = true
  if (board[x][y].minesNearby > 0) {
    return board
  }
  for (let xChk = x - 1; xChk <= x + 1; xChk++) {
    for (let yChk = y - 1; yChk <= y + 1; yChk++) {
      if (
        xChk <= settings.xMax &&
        xChk >= 0 &&
        yChk <= settings.yMax &&
        yChk >= 0 &&
        !board[xChk][yChk].isSwept &&
        !board[xChk][yChk].isFlag
      ) {
        board = sweepSquare(board, settings, { x: xChk, y: yChk })
      }
    }
  }
  return board
}

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