import { PlayerShip } from './PlayerShip.js'
import { Asteroid } from './Asteroid.js'
import { UI } from './UI.js';
import { Enemy } from './Enemy.js';

export class AsteroidsGame {
  playerShip: PlayerShip;
  asteroids: Array<Asteroid> = [];
  enemies: Array<Enemy> = [];

  _p5: p5;
  ui: UI;
  gameStarted = false;
  constructor(_p5: p5) {
    this.playerShip = new PlayerShip(_p5)
    this.playerShip.x = _p5.windowWidth / 2;
    this.playerShip.y = _p5.windowHeight / 2;
    this.ui = new UI(_p5, this.playerShip);
    for (let i: number = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid(_p5))
    }

    let enemey = new Enemy(
      _p5,
      this.playerShip,
      _p5.random(_p5.width),
      _p5.random(_p5.height),
      2,
      50);

    this.enemies.push(enemey)
    this.ui.updateLives(this.playerShip.lives)
    this.ui.updateLives(this.playerShip.lives)

    this._p5 = _p5;
  }
  draw() {
    if (!this.gameStarted) {
      this.ui.drawMenu()
      this.gameStarted = this.ui.startGamePressed
      this.ui.startGamePressed = false
    } else {
      this.ui.drawScore()
      this.ui.drawLives()

      if (this.playerShip.living)
        this.playerShip.draw()

      this.enemies.forEach((enemy: Enemy) => {
        enemy.update();
        enemy.draw();
        if (enemy.checkCollision(this.playerShip)) {
          this.playerShip.destroyed()
          this.ui.updateLives(this.playerShip.lives)
          return
        }
      })

      let newAsteroids: Array<Asteroid> = [];
      this.asteroids.forEach(asteroid => {
        if (!asteroid || asteroid.living == false) {
          return;
        }
        asteroid.draw()
        let collided = asteroid.checkCollision(this.playerShip)
        if (collided) {
          this.playerShip.destroyed()
          this.ui.updateLives(this.playerShip.lives)
          newAsteroids = newAsteroids.concat(asteroid.destroyed())
        }
        this.playerShip.bullets.forEach(bullet => {
          if (bullet.checkCollision(asteroid)) {
            this.playerShip.score += 100
            this.ui.updateScore(this.playerShip.score)
            newAsteroids = newAsteroids.concat(asteroid.destroyed())
            this.playerShip.bullets.splice(this.playerShip.bullets.indexOf(bullet), 1)
          }
        })
      })
      this.asteroids = this.asteroids.filter(asteroid => asteroid?.living)
      this.asteroids = this.asteroids.concat(newAsteroids)

      if (!this.playerShip.living) {
        this._p5.fill("#000")
        this.ui.startGamePressed = false;
        this._p5.text("Game Over", this._p5.width / 2, this._p5.height / 2)
      }
    }


  }
}