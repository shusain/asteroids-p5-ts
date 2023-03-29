import { PlayerShip } from './PlayerShip';
import { Rectangle } from './Rectangle';

export class Enemy {
  private p5instance: p5;
  private player: PlayerShip;
  private x: number;
  private y: number;
  private speed: number;
  private size: number;

  constructor(p5instance: p5, player: PlayerShip, x: number, y: number, speed: number, size: number) {
    this.p5instance = p5instance;
    this.player = player;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
  }

  public draw() {
    // Draw the enemy as a red circle
    this.p5instance.fill(0, 255, 0);
    this.p5instance.noStroke();
    this.p5instance.ellipse(this.x, this.y, this.size, this.size);

    this.p5instance.fill(255, 0, 0);
    this.p5instance.ellipse(this.x, this.y, this.size/2, this.size/2)
  }

  public update() {
    // Move towards the player
    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;
    const angle = this.p5instance.atan2(dy, dx);
    const vx = this.speed * this.p5instance.cos(angle);
    const vy = this.speed * this.p5instance.sin(angle);
    this.x += vx;
    this.y += vy;
  }

  public checkCollision(rect: Rectangle): boolean {
    // Check if the enemy collides with a rectangle
    const distance = this.p5instance.dist(this.x, this.y, rect.x, rect.y);
    return distance < (this.size / 2) + (rect.width / 2);
  }
}
