import * as gameFn from './gameFunctions'

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

  it('should lay mines', () => {
    const board = gameFn.layMines(8, 8, TEST_MINES)
    expect(board[8].length).toBe(9)
  })
})
