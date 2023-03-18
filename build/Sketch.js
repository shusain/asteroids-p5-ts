import { AsteroidsGame } from './AsteroidsGame.js';
var game;
var s = function (sketch) {
    sketch.setup = function () {
        console.log("🚀 - Setup initialized - P5 is running");
        game = new AsteroidsGame(sketch);
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        sketch.rectMode(sketch.CENTER).noFill().frameRate(50);
        sketch.pixelDensity(1);
    };
    sketch.windowResized = function () {
        sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    };
    sketch.draw = function () {
        sketch.background("#0055ff");
        game.draw();
    };
};
var myp5 = new p5(s);
//# sourceMappingURL=Sketch.js.map