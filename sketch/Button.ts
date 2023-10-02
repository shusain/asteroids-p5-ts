import {Rectangle} from './Rectangle.js'

export class Button extends Rectangle {
  constructor(public _p5:p5, 
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public label: string,
    public graphics: p5.Graphics,
    public buttonClickHandler: Function) {

    super(_p5)
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.graphics = _p5.createGraphics(width, height);
    this.graphics.pixelDensity(2)
    this.buttonClickHandler = buttonClickHandler
    this.renderGraphics();
  }
  renderGraphics() {
      this.graphics.clear(0, 0, 0, 0);
      this.graphics.fill(200);
      this.graphics.rect(0, 0, this.width, this.height);
      this.graphics.fill(0);
      this.graphics.textAlign(this.graphics.CENTER, this.graphics.CENTER);
      this.graphics.text(this.label, this.width / 2, this.height / 2);
  }
  checkCollision(rect:Rectangle) {
    return (this.x < rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y < rect.y + rect.height &&
      this.y + this.height > rect.y);
  }
  draw() {
    let canvas = this._p5
    canvas.rect(this.x+this.width/2, this.y+this.height/2, this.width, this.height)
    if(canvas.mouseIsPressed && this.checkCollision(new Rectangle(canvas, 0, canvas.mouseX, canvas.mouseY))) {
      canvas.fill("#fff")
      this.buttonClickHandler()
    } else {
      canvas.fill("#ddd")
    }
    canvas.image(this.graphics, this.x, this.y)
  }
}