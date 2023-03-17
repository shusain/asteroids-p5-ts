import { PlayerShip } from './PlayerShip.js';
import { Asteroid } from './Asteroid.js';
import { UI } from './UI.js';
var AsteroidsGame = (function () {
    function AsteroidsGame(p5instance) {
        this.asteroids = [];
        this.gameStarted = false;
        this.playerShip = new PlayerShip(p5instance);
        this.playerShip.x = p5instance.windowWidth / 2;
        this.playerShip.y = p5instance.windowHeight / 2;
        this.ui = new UI(p5instance, this.playerShip);
        for (var i = 0; i < 10; i++) {
            this.asteroids.push(new Asteroid(p5instance));
        }
        this.p5instance = p5instance;
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
            if (this.playerShip.living)
                this.playerShip.draw();
            var newAsteroids_1 = [];
            this.asteroids.forEach(function (asteroid) {
                if (!asteroid || asteroid.living == false) {
                    return;
                }
                asteroid.draw();
                var collided = asteroid.checkCollision(_this.playerShip);
                if (collided) {
                    _this.playerShip.destroyed();
                    newAsteroids_1 = newAsteroids_1.concat(asteroid.destroyed());
                }
                _this.playerShip.bullets.forEach(function (bullet) {
                    if (bullet.checkCollision(asteroid)) {
                        _this.playerShip.score += 100;
                        newAsteroids_1 = newAsteroids_1.concat(asteroid.destroyed());
                        _this.playerShip.bullets.splice(_this.playerShip.bullets.indexOf(bullet), 1);
                    }
                });
            });
            this.asteroids = this.asteroids.filter(function (asteroid) { return asteroid === null || asteroid === void 0 ? void 0 : asteroid.living; });
            this.asteroids = this.asteroids.concat(newAsteroids_1);
            if (!this.playerShip.living) {
                this.p5instance.fill("#000");
                this.p5instance.text("Game Over", this.p5instance.width / 2, this.p5instance.height / 2);
            }
        }
    };
    return AsteroidsGame;
}());
export { AsteroidsGame };
//# sourceMappingURL=AsteroidsGame.js.map