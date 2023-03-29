import { Bullet } from './Bullet.js';
import { Rectangle } from './Rectangle.js'
export class PlayerShip extends Rectangle {
  thrustAmount = 0;
  rotationAmount = 0;
  bullets: Array<Bullet> = [];
  living = true;
  lives = 3;
  score = 0;

  constructor(p5Instance: p5) {
    super(p5Instance);
    this.width = 10
    this.height = 30
    this.setupKeyHandlers()
  }
  thrust(amount:number) {
    super.thrust(amount)
    this.xVelocity = Math.min(this.xVelocity, 10)
    this.yVelocity = Math.min(this.yVelocity, 10)
    this.xVelocity = Math.max(this.xVelocity, -10)
    this.yVelocity = Math.max(this.yVelocity, -10)
  }

  shootBullet() {
    let firedBullet = new Bullet(this.p5Instance);
    firedBullet.x = this.x;
    firedBullet.y = this.y;
    firedBullet.headingAngle = this.headingAngle;
    firedBullet.thrust(25)

    this.bullets.push(firedBullet);
  }

  destroyed() {
    if(this.lives > 0)
    {
      this.lives--;
      this.x = this.p5Instance.windowWidth/2
      this.y = this.p5Instance.windowHeight/2
      this.xVelocity = 0;
      this.yVelocity = 0;
    } else {
      console.log('Player is dead')
      this.living = false
    }
  }

  setupKeyHandlers() {
    this.p5Instance.keyPressed = (keyEvent: KeyboardEvent) => {
      console.log(keyEvent.key)
      switch (keyEvent.key) {
        case ' ':
          this.shootBullet();
          break;
        case 'w':
        case 'W':
          this.thrustAmount = 1.2;
          break;
        case 's':
        case 'S':
          this.thrustAmount = -1.2;
          break;
        case 'a':
        case 'A':
          this.rotationAmount = -3;
          break;
        case 'd':
        case 'D':
          this.rotationAmount = 3
          break;
      }
    }
    this.p5Instance.keyReleased = (keyEvent: KeyboardEvent) => {
      console.log(keyEvent.key)
      switch (keyEvent.key) {
        case 'w':
        case 'W':
          this.thrustAmount = 0;
          break;
        case 's':
        case 'S':
          this.thrustAmount = 0;
          break;
        case 'a':
        case 'A':
          this.rotationAmount = 0
          break;
        case 'd':
        case 'D':
          this.rotationAmount = 0
          break;
      }
    }
  }

  update() {
    if (this.thrustAmount != 0) {
      this.thrust(this.thrustAmount);
    }
    if (this.rotationAmount) {
      this.turn(this.rotationAmount);
    }
    super.update(); // Call the update method of the parent Rectangle class
  }
  draw() {
    this.update(); // Call the update method before drawing
    let canvas = this.p5Instance;
    canvas.push()
    canvas.stroke("#000")
    canvas.strokeWeight(2)
    canvas.translate(this.x, this.y)
    canvas.rotate(this.headingAngle+Math.PI)
    canvas.line(0, 0, this.height, -this.width)
    canvas.line(0, 0, this.height, this.width)
    canvas.line(this.height, -this.width, this.height, this.width)
    canvas.pop()

    this.bullets.forEach(bullet => bullet.draw())
    this.bullets = this.bullets.filter(bullet => bullet.lifetime > 0)
  }
}