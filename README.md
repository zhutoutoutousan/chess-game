# chess-game
A simple chess game with basic AI
## Tech stack
- ES6
- Object Oriented Programming
- P5.js
- Express
- Node.js

## File structure
```
|--- server.js   // main entry node file to be executed by the server
|--- procfile // what to input on heroku dyno interface
|--- package.json
|--- package-lock.json
|--- view --- index.ejs // board view
|--- public ---|--- img
               |--- css // body and chessboard
               |--- js ---|--- libraries // p5.js
                          |--- script ---|- Pieces.js
                                         |- board.js
                                         |- chess-ai.js
                                         |- sketch.js
```

# Packages and dependencies
## Front-end
- p5.js
## Back-end
- DX
  - Framework
    - express
  - Template Engine
    - ejs
  - Resource management
    - serve-favicon
    - css-loader
  - Hot reload
    - nodemon
- ENV
  - Heroku
  - package.json ---> devDependencies
## Testing and automation
- jest
# Progress
- [x] Chessboard
- [ ] Game mechanics
  - [ ] When you win, the game is stuck 
  - [ ] Create save game
  - [ ] Create records of movements
- [ ] Chess Pieces
  - [x] Initial design
  - [x] ? The black bishop sometimes disappear
    - [x] ? ```diagsweep``` add logic 
  - [x] If you click the queen twice, it just disappear
    - [x] In QUEEN: ```canMove``` function, the ```basicCondition``` returns the wrong value
    - [x] Although it **cannot Move**, it still sees it as ```attacking``` and took itself.
    - [x] Source : <span style="color: red;">The execution order of boolean</div>
  - [x] Rook can move through pieces vertically(not horizontally)
    - [x] Source : <span style="color: red;">Still the execution order of boolean</div>
  - [x] Pawn can travel out of bounds
  - [ ] Pawn doesn't promote
  - [ ] Pawn doesn't en passant
    - [x] There is a ```firstTurn``` indicator, but it doesn't work
      - [x] When a pawn has been moved, there is no telling whether it is consecutive or not
    - [x] Develop the ```canEnPassant``` boolean logic
    - [ ] Use pawn class property ```canBeEnPassent```
      - [ ] The property switch back to ```false``` before the next move
        - [ ] It happened in the ```RunAI()``` function
          - [ ] Thinking over this question surpasses the current mental capacity, write it down
        - [ ] WORKAROUND: maybe you can add store Enpassant and store it back
    - [ ] <span style="color: red">Chrome devTool technique</span>(optional)
      - [ ] Gather as much information as you can
  - [x] Pawn can't march if it can attack
  - [x] Pawn can *march and attack*
- [ ] AI
  - [x] Algorithms
  - [ ] Enemy loves moving pawn
    - [ ] Check the canMove area
    - [ ] Check if AI function is working the right way
      - [x] Found an error in `canMove` in `Piece` class
- [ ] Decoration
  - [ ] Start the game
  - [ ] Restart the game
  - [ ] Initialize the CSS layout
- [ ] Multiplayer
  - [ ] Choose mode
  - [ ] Networking
- [ ] Serving
  - [x] Heroku note
  - [ ] Webpack
    - [x] Webpack course
    - [ ] Webpack packing
  - [x] Deploy
    - [ ] [Bulletproof node.js project architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/)
  - [ ] Class
    - [ ] [Frontend Master course](https://frontendmasters.com/courses/api-design-nodejs-v3/)
- Project architecture
  - [ ] Add 'sass-loader'
  - [ ] Add 'webpack' for better performance