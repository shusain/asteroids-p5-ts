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
import { Rectangle } from './Rectangle.js';
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(p5Instance, text, buttonClickHandler) {
        var _this = _super.call(this, p5Instance) || this;
        _this.text = text;
        _this.buttonClickHandler = buttonClickHandler;
        _this.height = 25;
        _this.width = _this.text.length * 20;
        _this.x = _this.p5Instance.windowWidth / 2;
        _this.y = _this.p5Instance.windowHeight / 2;
        return _this;
    }
    Button.prototype.checkCollision = function (rect) {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
    };
    Button.prototype.draw = function () {
        var canvas = this.p5Instance;
        if (canvas.mouseIsPressed && this.checkCollision(new Rectangle(this.p5Instance, 0, canvas.mouseX + this.width / 2, canvas.mouseY))) {
            canvas.fill("#fff");
            this.buttonClickHandler();
        }
        else {
            canvas.fill("#ddd");
        }
        canvas.push();
        canvas.translate(this.x, this.y);
        canvas.rectMode(canvas.CORNER);
        canvas.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        canvas.fill("#000");
        canvas.textSize(20);
        canvas.text(this.text, -this.width / 4, this.height / 2 - 6);
        canvas.pop();
    };
    return Button;
}(Rectangle));
export { Button };
//# sourceMappingURL=Button.js.map