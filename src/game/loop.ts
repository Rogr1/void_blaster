import { Application, Ticker } from "pixi.js";
import { Ship } from "../ship";
import { HUD } from "../hud";
import { Asteroid } from "../asteroids";
import { Bullet } from "../bullet";
import { Score } from "../score";
import { CollisionManager } from "../collision";
import { SoundManager } from "./sound";
import { globals } from "./globals";

type LoopConfig = {
  app: Application;
  ship: Ship;
  hud: HUD;
  score: Score;
  asteroids: Asteroid[];
  collision: CollisionManager;
  keys: Record<string, boolean>;
  canShootRef: () => boolean;
  setCanShoot: (v: boolean) => void;
  fireRateRef: () => number;
  setFireRate: (v: number) => void;
  rapidFireUntilRef: () => number;
  setRapidFireUntil: (v: number) => void;
  spawnAsteroid: (app: Application, asteroids: Asteroid[], ship: Ship) => void;
  spawnPowerUpAt: (x: number, y: number) => void;
  updatePowerUps: () => void;
  gameOver: () => void;
};

export function createGameLoop(cfg: LoopConfig) {
  return (ticker: Ticker) => {
    const delta = ticker.deltaTime;
    const W = cfg.app.renderer.width;
    const H = cfg.app.renderer.height;

    cfg.ship.update(W, H);

    // Shooting
    if (cfg.keys["Space"] && globals.currentShip && globals.appRef && cfg.canShootRef()) {
      SoundManager.playShoot();

      const b = new Bullet(
        globals.currentShip.x,
        globals.currentShip.y,
        globals.currentShip.rotation
      );
      globals.currentBullets.push(b);
      globals.appRef.stage.addChild(b);

      cfg.setCanShoot(false);
      setTimeout(() => cfg.setCanShoot(true), cfg.fireRateRef());
    }

    if (cfg.rapidFireUntilRef() > 0 && Date.now() > cfg.rapidFireUntilRef()) {
      cfg.setRapidFireUntil(0);
      cfg.setFireRate(300);
    }

    // Update
    cfg.asteroids.forEach((a) => a.update(W, H));
    globals.currentBullets.forEach((b) => b.update(W, H, delta));

    for (let i = globals.currentBullets.length - 1; i >= 0; i--) {
      if (!globals.currentBullets[i].alive) {
        cfg.app.stage.removeChild(globals.currentBullets[i]);
        globals.currentBullets.splice(i, 1);
      }
    }

    // Bullet hit Asteroid
    for (let i = cfg.asteroids.length - 1; i >= 0; i--) {
      const a = cfg.asteroids[i];
      for (let j = globals.currentBullets.length - 1; j >= 0; j--) {
        const b = globals.currentBullets[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < a.radius) {
          SoundManager.playExplosion();
          cfg.score.addPoints(50);

          cfg.app.stage.removeChild(a);
          cfg.asteroids.splice(i, 1);

          cfg.app.stage.removeChild(b);
          globals.currentBullets.splice(j, 1);

          cfg.spawnAsteroid(cfg.app, cfg.asteroids, cfg.ship);
          if (Math.random() < 0.15) cfg.spawnPowerUpAt(a.x, a.y);
          break;
        }
      }
    }

    cfg.updatePowerUps();
    cfg.collision.update();

    if (cfg.hud.getLives() <= 0) {
      setTimeout(cfg.gameOver, 300);
    }
  };
}
