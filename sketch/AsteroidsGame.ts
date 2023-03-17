import {PlayerShip} from './PlayerShip.js'
import {Asteroid} from './Asteroid.js'
import { UI } from './UI.js';

export class AsteroidsGame {
  playerShip: PlayerShip;
  asteroids: Array<Asteroid> = [];
  p5instance: p5;
  ui: UI;
  gameStarted = false;
  constructor(p5instance:p5){
    this.playerShip = new PlayerShip(p5instance)
    this.playerShip.x = p5instance.windowWidth/2;
    this.playerShip.y = p5instance.windowHeight/2;
    this.ui = new UI(p5instance, this.playerShip);
    for(let i: number = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid(p5instance))
    }

    this.p5instance = p5instance;
  }
  draw(){
    if(!this.gameStarted) {
      this.ui.drawMenu()
      this.gameStarted = this.ui.startGamePressed
      this.ui.startGamePressed= false
    } else {
      this.ui.drawScore()
      if(this.playerShip.living)
        this.playerShip.draw()
      let newAsteroids:Array<Asteroid> = [];
      this.asteroids.forEach(asteroid => {
        asteroid.draw()
        let collided = asteroid.checkCollision(this.playerShip)
        if(collided){
          this.playerShip.destroyed()
          newAsteroids = newAsteroids.concat(asteroid.destroyed())
        }
        this.playerShip.bullets.forEach(bullet => {
          if(bullet.checkCollision(asteroid)) {
            this.playerShip.score += 100
            newAsteroids = newAsteroids.concat(asteroid.destroyed())
            this.playerShip.bullets.splice(this.playerShip.bullets.indexOf(bullet), 1)
          }
        })
      })
      this.asteroids = this.asteroids.filter(asteroid => asteroid.living)
      this.asteroids = this.asteroids.concat(newAsteroids)
  
      if(!this.playerShip.living) {
        this.p5instance.fill("#000")
        this.p5instance.text("Game Over", this.p5instance.width/2, this.p5instance.height/2)
      }
    }

    
  }
}