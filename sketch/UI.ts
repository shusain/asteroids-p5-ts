import { Button } from './Button.js'
import {Rectangle} from './Rectangle.js'
import { PlayerShip } from './PlayerShip.js';
export class UI {
  buttons: Array<Rectangle> = []

  public startGamePressed = false;
  
  constructor(private p5Instance:p5, private player:PlayerShip) {
    let startButton = new Button(p5Instance, "Start Game", () =>{
      this.startGamePressed = true
      console.log('start game button pressed')
    });

    this.buttons.push(startButton)
  }
  drawMenu() {
    this.buttons.forEach(button => button.draw())
  }
  drawScore() {
    this.p5Instance.fill("#000")
    this.p5Instance.textSize(20)
    this.p5Instance.text("Score: " + this.player.score, this.p5Instance.windowWidth-200, 60)
    this.p5Instance.text("Lives: " + this.player.lives, this.p5Instance.windowWidth-200, 20)
  }
}