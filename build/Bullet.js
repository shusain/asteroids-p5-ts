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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(p5Instance) {
        var _this = _super.call(this, p5Instance, 0.01) || this;
        _this.lifetime = 30;
        return _this;
    }
    Bullet.prototype.checkCollision = function (rect) {
        var distance = p5.Vector.dist(new p5.Vector(this.x, this.y), new p5.Vector(rect.x, rect.y));
        return distance <= this.width + rect.width;
    };
    Bullet.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.p5Instance.strokeWeight(2);
        this.p5Instance.fill("#000");
        this.p5Instance.push();
        this.p5Instance.translate(this.x, this.y);
        this.p5Instance.circle(0, 0, this.width);
        this.p5Instance.pop();
        this.lifetime--;
    };
    return Bullet;
}(Rectangle));
export { Bullet };
//# sourceMappingURL=Bullet.js.map