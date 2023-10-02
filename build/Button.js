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
    function Button(_p5, x, y, width, height, label, graphics, buttonClickHandler) {
        var _this = _super.call(this, _p5) || this;
        _this._p5 = _p5;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.label = label;
        _this.graphics = graphics;
        _this.buttonClickHandler = buttonClickHandler;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.label = label;
        _this.graphics = _p5.createGraphics(width, height);
        _this.graphics.pixelDensity(2);
        _this.buttonClickHandler = buttonClickHandler;
        _this.renderGraphics();
        return _this;
    }
    Button.prototype.renderGraphics = function () {
        this.graphics.clear(0, 0, 0, 0);
        this.graphics.fill(200);
        this.graphics.rect(0, 0, this.width, this.height);
        this.graphics.fill(0);
        this.graphics.textAlign(this.graphics.CENTER, this.graphics.CENTER);
        this.graphics.text(this.label, this.width / 2, this.height / 2);
    };
    Button.prototype.checkCollision = function (rect) {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
    };
    Button.prototype.draw = function () {
        var canvas = this._p5;
        canvas.rect(this.x + this.width / 2, this.y + this.height / 2, this.width, this.height);
        if (canvas.mouseIsPressed && this.checkCollision(new Rectangle(canvas, 0, canvas.mouseX, canvas.mouseY))) {
            canvas.fill("#fff");
            this.buttonClickHandler();
        }
        else {
            canvas.fill("#ddd");
        }
        canvas.image(this.graphics, this.x, this.y);
    };
    return Button;
}(Rectangle));
export { Button };
//# sourceMappingURL=Button.js.map