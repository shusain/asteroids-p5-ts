import { Button } from './Button.js'
import { Rectangle } from './Rectangle.js'
import { PlayerShip } from './PlayerShip.js';
export class UI {
  buttons: Array<Rectangle> = []
  score: number;
  lives: number;

  public startGamePressed = false;
  private startButtonCreated = false;
  scoreGraphics: p5.Graphics;
  livesGraphics: p5.Graphics;

  constructor(private _p5: p5, private player: PlayerShip) {
    this.score = 0;
    this.lives = 3;
    this.scoreGraphics = this._p5.createGraphics(200, 50);
    this.scoreGraphics.pixelDensity(2)
    this.livesGraphics = this._p5.createGraphics(200, 50);
    this.livesGraphics.pixelDensity(2)
    this.renderScoreGraphics()
  }

  addStartButton() {
    // Assuming p5Instance is your p5 instance
    let startButton = new Button(
      this._p5,    // your p5 instance
      this._p5.width/2 - 100,           // x position
      this._p5.height/2 - 100,           // y position
      200,           // width
      50,            // height
      "Start",       // label
      this._p5.createGraphics(200, 50),  // graphics
      () => {
        this.startGamePressed = true
        console.log('start game button pressed')
      }
    );
    this.buttons.push(startButton)
  }

  renderScoreGraphics() {
    this.scoreGraphics.push();
    this.scoreGraphics.clear(0,0,0,0);
    this.scoreGraphics.fill(0, 100);  // Semi-transparent background
    this.scoreGraphics.rect(this.scoreGraphics.width - 120, 10, 100, 40);
    this.scoreGraphics.textSize(32);
    this.scoreGraphics.textAlign(this.scoreGraphics.RIGHT, this.scoreGraphics.TOP);
    this.scoreGraphics.fill(255);  // White text
    this.scoreGraphics.text(this.score, this.scoreGraphics.width - 20, 20);
    this.scoreGraphics.pop();
  }

  updateLives(newLives:number) {
    this.lives = newLives;
    this.renderLivesGraphics();
  }
  
  updateScore(updatedScore:number) {
    this.score = updatedScore;
    this.renderScoreGraphics();
  }

  renderLivesGraphics() {
    this.livesGraphics.clear(0,0,0,0);
    for (let i = 0; i < this.player.lives; i++) {
      this.renderSingleShip(20 + i * 30, 20);  // Assuming renderSingleShip is a global function
    }
  }

  drawScore() {
    this._p5.image(this.scoreGraphics, 0, 50)
  }

  renderSingleShip(x: number, y: number) {
    this.livesGraphics.push();
    this.livesGraphics.noFill();
    this.livesGraphics.translate(x, y);
    this.livesGraphics.beginShape();
    this.livesGraphics.vertex(0, -10);
    this.livesGraphics.vertex(-10, 10);
    this.livesGraphics.vertex(10, 10);
    this.livesGraphics.endShape(this.livesGraphics.CLOSE);
    this.livesGraphics.pop();
  }

  drawLives() {
    this._p5.image(this.livesGraphics, 0, 0)
  }
  
  drawMenu() {
    // adding start button once here after app runnign so the
    // canvas width/height are known for positioning
    if(!this.startButtonCreated) {
      this.addStartButton()
      this.startButtonCreated = true
    }
    this.buttons.forEach(button => button.draw())
  }
}