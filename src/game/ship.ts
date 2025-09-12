import { Sprite, Texture } from "pixi.js";

export class Ship extends Sprite {
  private speed = 2.5;
  private keys: Record<string, boolean> = {};

  constructor(imgEl: HTMLImageElement, startX: number, startY: number) {
    const tex = Texture.from(imgEl);
    super(tex);

    this.anchor.set(0.5);
    this.scale.set(0.05);
    this.x = startX;
    this.y = startY;
    this.rotation = 0;
    this.alpha = 1.0;

    // Keyboard control
    window.addEventListener("keydown", (e) => (this.keys[e.code] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.code] = false));
  }

  update(W: number, H: number) {
    // Rotation
    if (this.keys["ArrowLeft"]) this.rotation -= 0.05;
    if (this.keys["ArrowRight"]) this.rotation += 0.05;
    // Forward movement
    if (this.keys["ArrowUp"]) {
      this.x += Math.cos(this.rotation - Math.PI / 2) * this.speed;
      this.y += Math.sin(this.rotation - Math.PI / 2) * this.speed;
    }

    // Wrap-around
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  }
}
