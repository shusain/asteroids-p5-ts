import {Rectangle} from './Rectangle.js'
export class Asteroid extends Rectangle {
  sides: number = 0;
  living = true;
  angularVelocity = .05 + Math.random() * .05

  cachedGraphics: p5.Graphics;

  constructor(p5Instance: p5, chosenX?: number, chosenY?: number, chosenWidth?: number) {
    super(p5Instance, 0);
    this.x = chosenX || p5Instance.windowWidth*Math.random()
    this.y = chosenY || p5Instance.windowHeight*Math.random()
    this.xVelocity = Math.random()*5*(Math.random()>0.5?1:-1);
    this.yVelocity = Math.random()*5*(Math.random()>0.5?1:-1);
    const maxWidth = chosenWidth || 40;

    console.log(`Asteroid has xVelocity: ${this.xVelocity}, yVelocity: ${this.yVelocity}`)

    this.width = Math.random()*maxWidth + 20
    this.height = this.width
    this.sides = this.p5Instance.random(2)+5
    this.prerender()
  }
  
  draw() {
    super.draw()
    this.headingAngle+=this.angularVelocity
    
    let canvas: p5 = this.p5Instance;
    canvas.push()
    canvas.translate(this.x,this.y)
    canvas.rotate(this.headingAngle)
    // canvas.rect(0,0,this.width,this.height)
    canvas.image(this.cachedGraphics,-this.width/2,-this.width/2, this.width*2, this.width*2)
    canvas.pop()
  }

  destroyed() {
    if(this.living)
    {
      console.log('Asteroid destroyed')
      this.living = false
      if(this.width > 30) {
        return [new Asteroid(this.p5Instance, this.x, this.y, this.width/2), new Asteroid(this.p5Instance, this.x, this.y, this.width/2)]
      } else {
        return []
      }
    }
  }

  prerender() {
    let canvas: p5 = this.p5Instance;
    this.cachedGraphics = canvas.createGraphics(this.width*2, this.width*2);
    let cg = this.cachedGraphics;
    
    cg.strokeWeight(1)
    cg.fill("#555")
    this.polygon(this.width/2, this.width/2, this.width/2, this.sides, cg)

  }

  polygon(x: number, y:number, radius:number, npoints:number, cg:p5.Graphics) {
    let angle = this.p5Instance.TWO_PI / npoints;
    cg.beginShape();
    for (let a = 0; a < this.p5Instance.TWO_PI; a += angle) {
      let sx = x + this.p5Instance.cos(a) * radius;
      let sy = y + this.p5Instance.sin(a) * radius;
      cg.vertex(sx, sy);
    }
    cg.endShape(this.p5Instance.CLOSE);
  }
  
}