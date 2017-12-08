import {
  GAME_SET_SETTINGS,
  GAME_CREATE,
  GAME_START,
  GAME_UPDATE_FLAGS,
  GAME_WIN,
  GAME_LOSE,
  GAME_SWEEP
} from './types'
import * as gameFn from '../lib/gameFunctions'

export function setGameSettings (width, height, numMines) {
  return {
    type: GAME_SET_SETTINGS,
    payload: {
      width: width * 1,
      height: height * 1,
      xMax: width - 1,
      yMax: height - 1,
      numMines: numMines * 1
    }
  }
}

export function createGame (width, height, numMines) {
  const gameStorageSize = window.localStorage.getItem('gameSize')
  let size = {}
  if (!(width && height && numMines) && gameStorageSize) {
    size = JSON.parse(gameStorageSize)
  } else if (width && height && numMines) {
    // turn the width and height into xMax yMax coords based off 0:
    size = {
      width: width * 1,
      height: height * 1,
      xMax: width - 1,
      yMax: height - 1,
      numMines: numMines * 1
    }
  } else {
    size = {
      width: 9,
      height: 9,
      xMax: 8,
      yMax: 8,
      numMines: 10
    }
  }
  // generate random mines:
  const mines = gameFn.generateMines(size.xMax, size.yMax, size.numMines)
  // lay the mines on the board:
  const board = gameFn.layMines(size.xMax, size.yMax, mines)
  // add the board helpers:
  const boardReady = gameFn.addBoardHelpers(size.xMax, size.yMax, board)

  // save the settings to webstorage:
  window.localStorage.setItem('gameSize', JSON.stringify(size))
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
        explosionCoords: { x, y }
      }
    }
  }
  // square is not a mines so let's investigate nearby squares:
  const sweptBoard = gameFn.sweepSquare(board, size, { x, y })
  const squaresSwept = gameFn.countSwept(sweptBoard, size)

  // now let's check the status of our game:
  // if the squaresSwept + number of mines = all the squares:
  if (squaresSwept + size.numMines === size.width * size.height) {
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
