import {
  GAME_CREATE,
  GAME_START,
  GAME_UPDATE_FLAGS,
  GAME_WIN,
  GAME_LOSE,
  GAME_SWEEP
} from './types'
import * as gameFn from '../lib/gameFunctions'

export function createGame (width, height, numMines) {
  const gameSettings = window.localStorage.getItem('gameSettings')
  let settings = {}
  if (!(width && height && numMines) && gameSettings) {
    settings = JSON.parse(gameSettings)
  } else if (width && height && numMines) {
    // turn the width and height into xMax yMax coords based off 0:
    settings = {
      width: width * 1,
      height: height * 1,
      xMax: width - 1,
      yMax: height - 1,
      numMines: numMines * 1
    }
  } else {
    settings = {
      width: 9,
      height: 9,
      xMax: 8,
      yMax: 8,
      numMines: 10
    }
  }
  // generate random mines:
  const mines = gameFn.generateMines(settings.xMax, settings.yMax, settings.numMines)
  // lay the mines on the board:
  const board = gameFn.layMines(settings.xMax, settings.yMax, mines)
  // add the board helpers:
  const boardReady = gameFn.addBoardHelpers(settings.xMax, settings.yMax, board)

  // save the settings to webstorage:
  window.localStorage.setItem('gameSettings', JSON.stringify(settings))
  return {
    type: GAME_CREATE,
    payload: {
      settings,
      mines,
      board: boardReady
    }
  }
}

export function clickSquare (game, { x, y }) {
  const { board, mines, settings } = game
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
  const sweptBoard = gameFn.sweepSquare(board, settings, { x, y })
  const squaresSwept = gameFn.countSwept(sweptBoard, settings)

  // now let's check the status of our game:
  // if the squaresSwept + number of mines = all the squares:
  if (squaresSwept + settings.numMines === settings.width * settings.height) {
    // now let's cover all the mines with flags

    return {
      type: GAME_WIN,
      payload: {
        board: gameFn.updateMines(sweptBoard, mines, 'win'),
        squaresSwept,
        flagsRaised: settings.numMines
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
