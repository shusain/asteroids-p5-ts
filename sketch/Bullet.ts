import {Rectangle} from './Rectangle.js'

export class Bullet extends Rectangle{
  lifetime: number = 30;
  constructor(p5Instance: p5) {
    super(p5Instance, 0.01)
  }
  checkCollision(rect: Rectangle): boolean {
    var distance = p5.Vector.dist(new p5.Vector(this.x, this.y), new p5.Vector(rect.x, rect.y));
    return distance <= this.width + rect.width
    
  }
  draw() {
    super.draw()
    this.p5Instance.strokeWeight(2)
    this.p5Instance.fill("#000")
    this.p5Instance.push()
    this.p5Instance.translate(this.x, this.y)
    this.p5Instance.circle(0,0,this.width)
    this.p5Instance.pop()
    this.lifetime--;
  }
}