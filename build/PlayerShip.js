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
import { Bullet } from './Bullet.js';
import { Rectangle } from './Rectangle.js';
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(p5Instance) {
        var _this = _super.call(this, p5Instance) || this;
        _this.thrustAmount = 0;
        _this.rotationAmount = 0;
        _this.bullets = [];
        _this.living = true;
        _this.lives = 3;
        _this.score = 0;
        _this.width = 10;
        _this.height = 30;
        _this.setupKeyHandlers();
        return _this;
    }
    PlayerShip.prototype.thrust = function (amount) {
        _super.prototype.thrust.call(this, amount);
        this.xVelocity = Math.min(this.xVelocity, 10);
        this.yVelocity = Math.min(this.yVelocity, 10);
        this.xVelocity = Math.max(this.xVelocity, -10);
        this.yVelocity = Math.max(this.yVelocity, -10);
    };
    PlayerShip.prototype.shootBullet = function () {
        var firedBullet = new Bullet(this.p5Instance);
        firedBullet.x = this.x;
        firedBullet.y = this.y;
        firedBullet.headingAngle = this.headingAngle;
        firedBullet.thrust(25);
        this.bullets.push(firedBullet);
    };
    PlayerShip.prototype.destroyed = function () {
        if (this.lives > 0) {
            this.lives--;
            this.x = this.p5Instance.windowWidth / 2;
            this.y = this.p5Instance.windowHeight / 2;
            this.xVelocity = 0;
            this.yVelocity = 0;
        }
        else {
            console.log('Player is dead');
            this.living = false;
        }
    };
    PlayerShip.prototype.setupKeyHandlers = function () {
        var _this = this;
        this.p5Instance.keyPressed = function (keyEvent) {
            console.log(keyEvent.key);
            switch (keyEvent.key) {
                case ' ':
                    _this.shootBullet();
                    break;
                case 'w':
                case 'W':
                    _this.thrustAmount = 1.2;
                    break;
                case 's':
                case 'S':
                    _this.thrustAmount = -1.2;
                    break;
                case 'a':
                case 'A':
                    _this.rotationAmount = -3;
                    break;
                case 'd':
                case 'D':
                    _this.rotationAmount = 3;
                    break;
            }
        };
        this.p5Instance.keyReleased = function (keyEvent) {
            console.log(keyEvent.key);
            switch (keyEvent.key) {
                case 'w':
                case 'W':
                    _this.thrustAmount = 0;
                    break;
                case 's':
                case 'S':
                    _this.thrustAmount = 0;
                    break;
                case 'a':
                case 'A':
                    _this.rotationAmount = 0;
                    break;
                case 'd':
                case 'D':
                    _this.rotationAmount = 0;
                    break;
            }
        };
    };
    PlayerShip.prototype.draw = function () {
        if (this.thrustAmount != 0) {
            this.thrust(this.thrustAmount);
        }
        if (this.rotationAmount) {
            this.turn(this.rotationAmount);
        }
        _super.prototype.draw.call(this);
        var canvas = this.p5Instance;
        canvas.push();
        canvas.stroke("#000");
        canvas.strokeWeight(2);
        canvas.translate(this.x, this.y);
        canvas.rotate(this.headingAngle + Math.PI);
        canvas.line(0, 0, this.height, -this.width);
        canvas.line(0, 0, this.height, this.width);
        canvas.line(this.height, -this.width, this.height, this.width);
        canvas.pop();
        this.bullets.forEach(function (bullet) { return bullet.draw(); });
        this.bullets = this.bullets.filter(function (bullet) { return bullet.lifetime > 0; });
    };
    return PlayerShip;
}(Rectangle));
export { PlayerShip };
//# sourceMappingURL=PlayerShip.js.map