import {
  GAME_CREATE,
  GAME_START,
  GAME_UPDATE_FLAGS,
  GAME_WIN,
  GAME_LOSE,
  GAME_SWEEP
} from './types'
import * as gameFn from '../lib/gameFunctions'

export function createGame (width = 25, height = 25, numMines = 25) {
  // turn the width and height into xMax yMax coords based off 0:
  const xMax = width - 1
  const yMax = height - 1
  const size = { width, height, xMax, yMax, numMines }
  // generate random mines:
  const mines = gameFn.generateMines(xMax, yMax, numMines)
  // lay the mines on the board:
  const board = gameFn.layMines(xMax, yMax, mines)
  // add the board helpers:
  const boardReady = gameFn.addBoardHelpers(xMax, yMax, board)
  return {
    type: GAME_CREATE,
    payload: {
      size,
      mines,
      board: boardReady
    }
  }
}

export function clickSquare (game, { x, y }) {
  const { board, mines, size } = game
  // check if it's a mine:
  if (board[x][y].isMine) {
    // you lost so reveal all the mines:
    return {
      type: GAME_LOSE,
      payload: {
        board: gameFn.updateMines(board, mines, 'lose'),
        explosionCoords: {x, y}
      }
    }
  }
  // square is not a mines so let's investigate nearby squares:
  const sweptBoard = gameFn.sweepSquare(board, size, { x, y })
  const squaresSwept = gameFn.countSwept(sweptBoard, size)

  // now let's check the status of our game:
  // if the squaresSwept + number of mines = all the squares:
  if (squaresSwept + size.numMines === (size.width * size.height)) {
    console.log('YOU WIN!')
    // now let's cover all the mines with flags

    return {
      type: GAME_WIN,
      payload: {
        board: gameFn.updateMines(sweptBoard, mines, 'win'),
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
