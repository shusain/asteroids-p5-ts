import { PlayerShip } from './PlayerShip.js';
import { Asteroid } from './Asteroid.js';
import { UI } from './UI.js';
import { Enemy } from './Enemy.js';
var AsteroidsGame = (function () {
    function AsteroidsGame(_p5) {
        this.asteroids = [];
        this.enemies = [];
        this.gameStarted = false;
        this.playerShip = new PlayerShip(_p5);
        this.playerShip.x = _p5.windowWidth / 2;
        this.playerShip.y = _p5.windowHeight / 2;
        this.ui = new UI(_p5, this.playerShip);
        for (var i = 0; i < 10; i++) {
            this.asteroids.push(new Asteroid(_p5));
        }
        var enemey = new Enemy(_p5, this.playerShip, _p5.random(_p5.width), _p5.random(_p5.height), 2, 50);
        this.enemies.push(enemey);
        this.ui.updateLives(this.playerShip.lives);
        this.ui.updateLives(this.playerShip.lives);
        this._p5 = _p5;
    }
    AsteroidsGame.prototype.draw = function () {
        var _this = this;
        if (!this.gameStarted) {
            this.ui.drawMenu();
            this.gameStarted = this.ui.startGamePressed;
            this.ui.startGamePressed = false;
        }
        else {
            this.ui.drawScore();
            this.ui.drawLives();
            if (this.playerShip.living)
                this.playerShip.draw();
            this.enemies.forEach(function (enemy) {
                enemy.update();
                enemy.draw();
                if (enemy.checkCollision(_this.playerShip)) {
                    _this.playerShip.destroyed();
                    _this.ui.updateLives(_this.playerShip.lives);
                    return;
                }
            });
            var newAsteroids_1 = [];
            this.asteroids.forEach(function (asteroid) {
                if (!asteroid || asteroid.living == false) {
                    return;
                }
                asteroid.draw();
                var collided = asteroid.checkCollision(_this.playerShip);
                if (collided) {
                    _this.playerShip.destroyed();
                    _this.ui.updateLives(_this.playerShip.lives);
                    newAsteroids_1 = newAsteroids_1.concat(asteroid.destroyed());
                }
                _this.playerShip.bullets.forEach(function (bullet) {
                    if (bullet.checkCollision(asteroid)) {
                        _this.playerShip.score += 100;
                        _this.ui.updateScore(_this.playerShip.score);
                        newAsteroids_1 = newAsteroids_1.concat(asteroid.destroyed());
                        _this.playerShip.bullets.splice(_this.playerShip.bullets.indexOf(bullet), 1);
                    }
                });
            });
            this.asteroids = this.asteroids.filter(function (asteroid) { return asteroid === null || asteroid === void 0 ? void 0 : asteroid.living; });
            this.asteroids = this.asteroids.concat(newAsteroids_1);
            if (!this.playerShip.living) {
                this._p5.fill("#000");
                this.ui.startGamePressed = false;
                this._p5.text("Game Over", this._p5.width / 2, this._p5.height / 2);
            }
        }
    };
    return AsteroidsGame;
}());
export { AsteroidsGame };
//# sourceMappingURL=AsteroidsGame.js.map