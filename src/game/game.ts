import { Application } from "pixi.js";
import { Ship } from "./ship";
import { Asteroid } from "./asteroids";
import { HUD } from "./hud";
import { CollisionManager } from "./collision";
import { Score } from "./score";
import { waitForImages } from "./helpers";
import { spawnAsteroid } from "./spawner";
import { globals, resetGlobals } from "./globals";
import { initInput } from "./input";
import { createGameLoop } from "./loop";
import { showGameOver } from "./gameOver";
import { spawnPowerUpAt, updatePowerUps } from "./powerups";

export async function startGame(app: Application) {
  resetGlobals();
  globals.appRef = app;
  app.stage.removeChildren();

  // === Assets load
  const shipImg = document.getElementById("ship-img") as HTMLImageElement;
  const heartFull = document.getElementById("heart-full") as HTMLImageElement;
  const heartEmpty = document.getElementById("heart-empty") as HTMLImageElement;
  const puHeartImg = document.getElementById("pu-heart") as HTMLImageElement;
  const puRapidImg = document.getElementById("pu-rapid") as HTMLImageElement;

  await waitForImages([shipImg, heartFull, heartEmpty, puHeartImg, puRapidImg]);

  // === Ship ===
  const ship = new Ship(shipImg, app.renderer.width / 2, app.renderer.height / 2);
  app.stage.addChild(ship);
  globals.currentShip = ship;

  // === HUD ===
  const hud = new HUD(app.stage, heartFull, heartEmpty, 3);

  // === Score ===
  const score = new Score(app.renderer.width);
  app.stage.addChild(score);

  // === Asteroids ===
  const W = app.renderer.width;
  const H = app.renderer.height;
  const area = W * H;
  const BASE_ASTEROIDS = 6;
  const EXTRA_ASTEROIDS = Math.floor(area / 300000);
  const ASTEROID_COUNT = Math.max(BASE_ASTEROIDS, BASE_ASTEROIDS + EXTRA_ASTEROIDS);
  const SAFE_RADIUS = 150;

  const asteroids: Asteroid[] = [];
  for (let i = 0; i < ASTEROID_COUNT; i++) {
    let a: Asteroid;
    let dx: number, dy: number, dist: number;
    do {
      a = new Asteroid(W, H);
      dx = a.x - ship.x;
      dy = a.y - ship.y;
      dist = Math.sqrt(dx * dx + dy * dy);
    } while (dist < SAFE_RADIUS);

    asteroids.push(a);
    app.stage.addChild(a);
  }

  const collision = new CollisionManager(ship, asteroids, hud);

  globals.currentBullets = [];
  const keys = initInput();

  // === Shooting Settings ===
  let canShoot = true;
  let fireRate = 300;
  let rapidFireUntil = 0;

  // === Game Loop ===
  globals.gameLoop = createGameLoop({
    app,
    ship,
    hud,
    score,
    asteroids,
    collision,
    keys,
    canShootRef: () => canShoot,
    setCanShoot: (v) => (canShoot = v),
    fireRateRef: () => fireRate,
    setFireRate: (v) => (fireRate = v),
    rapidFireUntilRef: () => rapidFireUntil,
    setRapidFireUntil: (v) => (rapidFireUntil = v),
    spawnAsteroid,
    spawnPowerUpAt: (x, y) => spawnPowerUpAt(app, x, y, puHeartImg, puRapidImg),
    updatePowerUps: () => updatePowerUps(app, H, ship, hud, () => {
      fireRate = 80;
      rapidFireUntil = Date.now() + 5000;
    }),
    gameOver: () => showGameOver(app, score),
  });

  app.ticker.add(globals.gameLoop);
}
