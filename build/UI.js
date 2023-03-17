import { Button } from './Button.js';
var UI = (function () {
    function UI(p5Instance, player) {
        var _this = this;
        this.p5Instance = p5Instance;
        this.player = player;
        this.buttons = [];
        this.startGamePressed = false;
        var startButton = new Button(p5Instance, "Start Game", function () {
            _this.startGamePressed = true;
            console.log('start game button pressed');
        });
        this.buttons.push(startButton);
    }
    UI.prototype.drawMenu = function () {
        this.buttons.forEach(function (button) { return button.draw(); });
    };
    UI.prototype.drawScore = function () {
        this.p5Instance.fill("#000");
        this.p5Instance.textSize(20);
        this.p5Instance.text("Score: " + this.player.score, this.p5Instance.windowWidth - 200, 60);
        this.p5Instance.text("Lives: " + this.player.lives, this.p5Instance.windowWidth - 200, 20);
    };
    return UI;
}());
export { UI };
//# sourceMappingURL=UI.js.map