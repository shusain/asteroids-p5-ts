var Enemy = (function () {
    function Enemy(p5instance, player, x, y, speed, size) {
        this.p5instance = p5instance;
        this.player = player;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
    }
    Enemy.prototype.draw = function () {
        this.p5instance.fill(0, 255, 0);
        this.p5instance.noStroke();
        this.p5instance.ellipse(this.x, this.y, this.size, this.size);
        this.p5instance.fill(255, 0, 0);
        this.p5instance.ellipse(this.x, this.y, this.size / 2, this.size / 2);
    };
    Enemy.prototype.update = function () {
        var dx = this.player.x - this.x;
        var dy = this.player.y - this.y;
        var angle = this.p5instance.atan2(dy, dx);
        var vx = this.speed * this.p5instance.cos(angle);
        var vy = this.speed * this.p5instance.sin(angle);
        this.x += vx;
        this.y += vy;
    };
    Enemy.prototype.checkCollision = function (rect) {
        var distance = this.p5instance.dist(this.x, this.y, rect.x, rect.y);
        return distance < (this.size / 2) + (rect.width / 2);
    };
    return Enemy;
}());
export { Enemy };
//# sourceMappingURL=Enemy.js.map