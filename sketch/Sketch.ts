import {AsteroidsGame} from './AsteroidsGame.js'

let game: AsteroidsGame;

const s = ( sketch:p5 ) => {
  sketch.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");
    game = new AsteroidsGame(sketch);
    sketch.createCanvas(window.innerWidth, window.innerHeight)
    sketch.rectMode(sketch.CENTER).noFill().frameRate(60);
  };
  sketch.windowResized = () => {
    sketch.resizeCanvas(window.innerWidth, window.innerHeight);
  }
  sketch.draw = () => {
    // CLEAR BACKGROUND
    sketch.background("#0055ff");
    game.draw()
  };
};

let myp5 = new p5(s);