import { Button } from './Button.js';
var UI = (function () {
    function UI(_p5, player) {
        this._p5 = _p5;
        this.player = player;
        this.buttons = [];
        this.startGamePressed = false;
        this.startButtonCreated = false;
        this.score = 0;
        this.lives = 3;
        this.scoreGraphics = this._p5.createGraphics(200, 50);
        this.scoreGraphics.pixelDensity(2);
        this.livesGraphics = this._p5.createGraphics(200, 50);
        this.livesGraphics.pixelDensity(2);
        this.renderScoreGraphics();
    }
    UI.prototype.addStartButton = function () {
        var _this = this;
        var startButton = new Button(this._p5, this._p5.width / 2 - 100, this._p5.height / 2 - 100, 200, 50, "Start", this._p5.createGraphics(200, 50), function () {
            _this.startGamePressed = true;
            console.log('start game button pressed');
        });
        this.buttons.push(startButton);
    };
    UI.prototype.renderScoreGraphics = function () {
        this.scoreGraphics.push();
        this.scoreGraphics.clear(0, 0, 0, 0);
        this.scoreGraphics.fill(0, 100);
        this.scoreGraphics.rect(this.scoreGraphics.width - 120, 10, 100, 40);
        this.scoreGraphics.textSize(32);
        this.scoreGraphics.textAlign(this.scoreGraphics.RIGHT, this.scoreGraphics.TOP);
        this.scoreGraphics.fill(255);
        this.scoreGraphics.text(this.score, this.scoreGraphics.width - 20, 20);
        this.scoreGraphics.pop();
    };
    UI.prototype.updateLives = function (newLives) {
        this.lives = newLives;
        this.renderLivesGraphics();
    };
    UI.prototype.updateScore = function (updatedScore) {
        this.score = updatedScore;
        this.renderScoreGraphics();
    };
    UI.prototype.renderLivesGraphics = function () {
        this.livesGraphics.clear(0, 0, 0, 0);
        for (var i = 0; i < this.player.lives; i++) {
            this.renderSingleShip(20 + i * 30, 20);
        }
    };
    UI.prototype.drawScore = function () {
        this._p5.image(this.scoreGraphics, 0, 50);
    };
    UI.prototype.renderSingleShip = function (x, y) {
        this.livesGraphics.push();
        this.livesGraphics.noFill();
        this.livesGraphics.translate(x, y);
        this.livesGraphics.beginShape();
        this.livesGraphics.vertex(0, -10);
        this.livesGraphics.vertex(-10, 10);
        this.livesGraphics.vertex(10, 10);
        this.livesGraphics.endShape(this.livesGraphics.CLOSE);
        this.livesGraphics.pop();
    };
    UI.prototype.drawLives = function () {
        this._p5.image(this.livesGraphics, 0, 0);
    };
    UI.prototype.drawMenu = function () {
        if (!this.startButtonCreated) {
            this.addStartButton();
            this.startButtonCreated = true;
        }
        this.buttons.forEach(function (button) { return button.draw(); });
    };
    return UI;
}());
export { UI };
//# sourceMappingURL=UI.js.map