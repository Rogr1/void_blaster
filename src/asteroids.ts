import { Graphics } from "pixi.js";

export class Asteroid extends Graphics {
  public vx: number;
  public vy: number;
  public radius: number;

  constructor(W: number, H: number) {
    super();

    this.radius = Math.random() * 20 + 20;
    const points: [number, number][] = [];

    const vertexCount = Math.floor(Math.random() * 5) + 5;

    for (let i = 0; i < vertexCount; i++) {
      const angle = (i / vertexCount) * Math.PI * 2;
      const variation = (Math.random() * 0.4 + 0.8);
      const r = this.radius * variation;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push([x, y]);
    }

    // sketch
    this.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.lineTo(points[i][0], points[i][1]);
    }
    this.closePath();
    this.fill({ color: 0x888888 });

    // start position
    this.x = Math.random() * W;
    this.y = Math.random() * H;

    // Speed
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  public update(W: number, H: number): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  }
}
