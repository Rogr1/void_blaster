import { Application } from "pixi.js";
import { Asteroid } from "./asteroids";
import { Ship } from "./ship";

export function spawnAsteroid(app: Application, asteroids: Asteroid[], ship: Ship): void {
  const W = app.renderer.width;
  const H = app.renderer.height;

  const SAFE_RADIUS = 150;

  const side = Math.floor(Math.random() * 4);
  let x = 0, y = 0;

  if (side === 0) { x = -50; y = Math.random() * H; }
  else if (side === 1) { x = W + 50; y = Math.random() * H; }
  else if (side === 2) { x = Math.random() * W; y = -50; }
  else { x = Math.random() * W; y = H + 50; }

  const a = new Asteroid(W, H);
  a.x = x;
  a.y = y;

  const targetX = W / 2;
  const targetY = H / 2;
  const dx = targetX - a.x;
  const dy = targetY - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  a.vx = (dx / dist) * (0.5 + Math.random() * 1.5);
  a.vy = (dy / dist) * (0.5 + Math.random() * 1.5);

  const dxShip = a.x - ship.x;
  const dyShip = a.y - ship.y;
  const distShip = Math.sqrt(dxShip * dxShip + dyShip * dyShip);
  if (distShip < SAFE_RADIUS) {
    spawnAsteroid(app, asteroids, ship);
    return;
  }

  asteroids.push(a);
  app.stage.addChild(a);
}
