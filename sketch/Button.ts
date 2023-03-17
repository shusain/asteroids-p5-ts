import {Rectangle} from './Rectangle.js'

export class Button extends Rectangle {
  buttonClickHandler: Function;

  constructor(p5Instance:p5, public text: String, buttonClickHandler:Function) {
    super(p5Instance)
    this.buttonClickHandler = buttonClickHandler;
    this.height = 25;
    this.width = this.text.length * 20;
    this.x = this.p5Instance.windowWidth/2;
    this.y = this.p5Instance.windowHeight/2;
  }
  checkCollision(rect:Rectangle) {
    return (this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y);
  }
  draw() {
    let canvas = this.p5Instance
    if(canvas.mouseIsPressed && this.checkCollision(new Rectangle(this.p5Instance, 0, canvas.mouseX+this.width/2, canvas.mouseY))) {
      canvas.fill("#fff")
      this.buttonClickHandler()
    } else {
      canvas.fill("#ddd")
    }
    canvas.push()
    canvas.translate(this.x, this.y)
    canvas.rectMode(canvas.CORNER)
    canvas.rect(-this.width/2,-this.height/2,this.width,this.height)
    canvas.fill("#000")
    canvas.textSize(20)
    canvas.text(this.text, -this.width/4, this.height/2 - 6)
    canvas.pop()
  }
}