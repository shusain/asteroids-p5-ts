var Rectangle = (function () {
    function Rectangle(p5Instance, drag, x, y) {
        if (drag === void 0) { drag = 0.03; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.p5Instance = p5Instance;
        this.drag = drag;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.headingAngle = Math.PI;
    }
    Rectangle.prototype.thrust = function (amountN) {
        this.xVelocity += amountN * this.p5Instance.cos(this.headingAngle);
        this.yVelocity += amountN * this.p5Instance.sin(this.headingAngle);
    };
    Rectangle.prototype.turn = function (direction) {
        this.headingAngle += direction * Math.PI / 180;
    };
    Rectangle.prototype.checkCollision = function (rect) {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
    };
    Rectangle.prototype.update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.xVelocity *= 1 - this.drag;
        this.yVelocity *= 1 - this.drag;
        if (Math.abs(this.xVelocity) < 0.01) {
            this.xVelocity = 0;
        }
        if (Math.abs(this.yVelocity) < 0.01) {
            this.yVelocity = 0;
        }
        var canvas = this.p5Instance;
        if (this.x > canvas.windowWidth) {
            this.x = 0;
        }
        if (this.y > canvas.windowHeight) {
            this.y = 0;
        }
        if (this.y < 0) {
            this.y = canvas.windowHeight;
        }
        if (this.x < 0) {
            this.x = canvas.windowWidth;
        }
    };
    Rectangle.prototype.draw = function () {
        this.update();
    };
    return Rectangle;
}());
export { Rectangle };
//# sourceMappingURL=Rectangle.js.map