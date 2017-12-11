# Eric's MineSweeper
Welcome to Eric's minesweeper. To get started, run the following:
```
yarn install
yarn start
```

*or if using npm:*
```
npm install
npm run start
```

## About the Minesweeper App
Programmatically,  the game came down to 2 distinct areas: Building the board and sweeping the board.

## Building the Board
The board is built in coordinates, so every square on the board can be accessed by `{x, y}` coordinates. Building the board comes down to: 1) generating random coordinates for mines, 2) creating a board with the mines with each square having unique properties (`isMine, isSwept, isFlag, sweepDelay`), and 3) traversing the board to add `minesNearby` properties.

## Sweeping the board (aka Playing the game)
To start the game, you click on a square. If the square is a mine, you lose. Otherwise, the game executes `sweepSquare()` which checks if the square has any nearbyMines. If not, it recursively checks the surrounding squares (up to 8 depending on your positioning on the board) and recursively calls `sweepSquare` if the swept square has zero `minesNearby`.

After all the possible squares are swept, the game checks if you've won: (`squaresSwept + number of mines === width * height`). If you've won or lost, the game ends with a fun background. Otherwise, you keep on playing.

To animate the unveiling of the squares, `sweepSquare` adds a `sweepDelay` depending on how far each square is away from the clicked square. The delay is determined by the larger of either the x distance or the y distance from the clicked square. When React updates the board after the sweep is over, a CSS delay-class is added to generate this delay.

The game's timer starts when the game starts and stops when the game wins or loses. The `Timer` state is not saved in Redux.

The `FlagCounter` is used as a helper for the user. Once a flag is placed, the square cannot be swept.

The `FlagCounter` and the `Timer` use a `padString` function which pads the string with zeros (while also moving the negative sign if necessary).

## Architecture
The app is built using React and Redux. Most of the "game" is played in the `gameActions` action creator file and its library, the `gameFunctions.js` file. The UI action is only used to toggle the `Modal`. There is also a `config.js` file which handles all the default game values. In addition, webstorage is used to save game settings.

## UI/UX
I chose to mostly copy the original design using pure CSS while using Emojis for the extra artwork. My UX has an animated reveal of squares which the original game does not. The fonts are a nod to the original game as well.