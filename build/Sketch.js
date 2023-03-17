import { AsteroidsGame } from './AsteroidsGame.js';
var game;
var s = function (sketch) {
    sketch.setup = function () {
        console.log("🚀 - Setup initialized - P5 is running");
        game = new AsteroidsGame(sketch);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.rectMode(sketch.CENTER).noFill().frameRate(60);
    };
    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };
    sketch.draw = function () {
        sketch.background("#0055ff");
        game.draw();
    };
};
var myp5 = new p5(s);
//# sourceMappingURL=Sketch.js.map