import { Graphics } from "pixi.js";

export class Bullet extends Graphics {
  speed = 8;
  alive = true;    // Flag indicating whether the ball is still active
  lifetime = 120;  // Frames (e.g., 2 seconds at 60 FPS)
  constructor(x: number, y: number, rotation: number) {
    super();

    // Simple circle as a projectile
    this.circle(0, 0, 4).fill({ color: 0xffff00 });

    // Start position
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  // Update using delta time
  update(W: number, H: number, delta: number) {
    this.x += Math.cos(this.rotation - Math.PI / 2) * this.speed * delta;
    this.y += Math.sin(this.rotation - Math.PI / 2) * this.speed * delta;

    // Countdown the lifetime
    this.lifetime -= delta;
    if (this.lifetime <= 0) this.alive = false;

    // Has it left the screen?
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.alive = false;
    }
  }
}
