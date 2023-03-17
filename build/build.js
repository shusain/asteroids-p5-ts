var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Asteroid.prototype.draw = function () {
        push();
        stroke("#000");
        strokeWeight(2);
        translate(this.x, this.y);
        line(0, 0, this.height, -this.width);
        line(0, 0, this.height, this.width);
        line(this.height, -this.width, this.height, this.width);
        pop();
    };
    return Asteroid;
}(Rectangle));
var AsteroidsGame = (function () {
    function AsteroidsGame() {
    }
    AsteroidsGame.prototype.draw = function () {
        console.log('drawing game');
        this.playerShip.draw();
    };
    return AsteroidsGame;
}());
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerShip.prototype.draw = function () {
        console.log('drawing ship');
        push();
        stroke("#000");
        strokeWeight(2);
        translate(this.x, this.y);
        line(0, 0, this.height, -this.width);
        line(0, 0, this.height, this.width);
        line(this.height, -this.width, this.height, this.width);
        pop();
    };
    return PlayerShip;
}(Rectangle));
var Rectangle = (function () {
    function Rectangle() {
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 20;
    }
    return Rectangle;
}());
var game;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    game = new AsteroidsGame();
    createCanvas(windowWidth, windowHeight);
    rectMode(CORNER).noFill().frameRate(30);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background("#0055ff");
    game.draw();
}
//# sourceMappingURL=build.js.map