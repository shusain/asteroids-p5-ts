export class Rectangle {
  public width: number = 10;
  public height: number = 10;

  xVelocity: number=0;
  yVelocity: number=0;

  headingAngle: number = Math.PI;
  
  constructor(public p5Instance: p5, private drag: number = 0.03, public x: number = 0, public y: number = 0) {
  }

  thrust(amountN: number) {
    this.xVelocity += amountN*this.p5Instance.cos(this.headingAngle);
    this.yVelocity += amountN*this.p5Instance.sin(this.headingAngle);
    console.log('thrusting', amountN, this.xVelocity, this.yVelocity, this.headingAngle)
  }
  turn(direction: number){
    this.headingAngle += direction * Math.PI/180
  }
  checkCollision(rect:Rectangle) {
    return (this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y);
  }
  draw() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if(this.xVelocity > 0) {
      this.xVelocity -= this.drag;
    } else {
      this.xVelocity += this.drag;
    }
    if(this.yVelocity > 0) {
      this.yVelocity -= this.drag;
    } else {
      this.yVelocity += this.drag;
    }
    if(Math.abs(this.xVelocity) < 1) {
      this.xVelocity = 0
    }
    if(Math.abs(this.yVelocity) < 1) {
      this.yVelocity = 0
    }
    
    let canvas = this.p5Instance;
    if(this.x > canvas.windowWidth) {
      this.x = 0;
    }
    if(this.y > canvas.windowHeight) {
      this.y = 0;
    }
    if(this.y < 0) {
      this.y = canvas.windowHeight;
    }
    if(this.x < 0) {
      this.x = canvas.windowWidth;
    }
  }
}