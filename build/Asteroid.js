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
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(p5Instance, chosenX, chosenY, chosenWidth) {
        var _this = _super.call(this, p5Instance, 0) || this;
        _this.sides = 0;
        _this.living = true;
        _this.angularVelocity = .05 + Math.random() * .05;
        _this.x = chosenX || p5Instance.windowWidth * Math.random();
        _this.y = chosenY || p5Instance.windowHeight * Math.random();
        _this.xVelocity = Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1);
        _this.yVelocity = Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1);
        var maxWidth = chosenWidth || 40;
        console.log("Asteroid has xVelocity: ".concat(_this.xVelocity, ", yVelocity: ").concat(_this.yVelocity));
        _this.width = Math.random() * maxWidth + 20;
        _this.sides = _this.p5Instance.random(2) + 5;
        return _this;
    }
    Asteroid.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.headingAngle += this.angularVelocity;
        var canvas = this.p5Instance;
        canvas.strokeWeight(1);
        canvas.push();
        canvas.translate(this.x, this.y);
        canvas.rotate(this.headingAngle);
        canvas.fill("#555");
        this.polygon(0, 0, this.width, this.sides);
        canvas.pop();
    };
    Asteroid.prototype.destroyed = function () {
        if (this.living) {
            console.log('Asteroid destroyed');
            this.living = false;
            if (this.width > 30) {
                return [new Asteroid(this.p5Instance, this.x, this.y, this.width / 2), new Asteroid(this.p5Instance, this.x, this.y, this.width / 2)];
            }
            else {
                return [];
            }
        }
    };
    Asteroid.prototype.polygon = function (x, y, radius, npoints) {
        var angle = this.p5Instance.TWO_PI / npoints;
        this.p5Instance.beginShape();
        for (var a = 0; a < this.p5Instance.TWO_PI; a += angle) {
            var sx = x + this.p5Instance.cos(a) * radius;
            var sy = y + this.p5Instance.sin(a) * radius;
            this.p5Instance.vertex(sx, sy);
        }
        this.p5Instance.endShape(this.p5Instance.CLOSE);
    };
    return Asteroid;
}(Rectangle));
export { Asteroid };
//# sourceMappingURL=Asteroid.js.map