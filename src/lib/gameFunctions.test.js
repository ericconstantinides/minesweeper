import * as gameFn from './gameFunctions'

describe('game functions', () => {
  it('should generate 10 mines', () => {
    const NUM_MINES = 10
    const mines = gameFn.generateMines(9, 9, NUM_MINES)
    expect(mines.length).toBe(NUM_MINES)
  })

  it('should generate unique mines', () => {
    const NUM_MINES = 15
    const mines = gameFn.generateMines(5, 5, NUM_MINES)
    const isUnique = mines.every(otr => {
      return mines.filter(inr => otr.x === inr.x && otr.y === inr.y).length === 1
    })
    expect(isUnique).toBe(true)
  })

  describe('when laying mines', () => {
    let board
    const xMax = 9
    const yMax = 9
    const TEST_MINES = [
      { x: 1, y: 7 },
      { x: 9, y: 9 },
      { x: 5, y: 7 },
      { x: 2, y: 2 },
      { x: 5, y: 5 },
      { x: 9, y: 8 },
      { x: 1, y: 4 },
      { x: 3, y: 1 },
      { x: 4, y: 7 },
      { x: 2, y: 8 }
    ]

    beforeEach(() => {
      board = gameFn.layMines(xMax, yMax, TEST_MINES)
    })

    it('should have the correct x length', () => {
      expect(board.length).toBe(xMax + 1)
    })

    it('should have the correct y length', () => {
      expect(board[0].length).toBe(yMax + 1)
    })

    it('should have laid mines on the board', () => {
      let mines = 0
      for (let x = 0; x <= xMax; x++) {
        for (let y = 0; y <= yMax; y++) {
          // now see if it's swept:
          if (board[x][y].isMine) mines++
        }
      }
      expect(mines).toEqual(TEST_MINES.length)
    })
  })
})
