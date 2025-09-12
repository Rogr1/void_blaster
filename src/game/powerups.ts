import { Application, Sprite, Texture } from "pixi.js";
import { HUD } from "./hud";
import { Ship } from "./ship";
import { SoundManager } from "./sound";

type PowerUpObj = {
  sprite: Sprite;
  ptype: "life" | "rapid";
  vx: number;
  vy: number;
};

let powerUps: PowerUpObj[] = [];

export function spawnPowerUpAt(app: Application, x: number, y: number, puHeartImg: HTMLImageElement, puRapidImg: HTMLImageElement) {
  const isLife = Math.random() < 0.5;
  const tex = Texture.from(isLife ? puHeartImg : puRapidImg);

  const puSprite = new Sprite(tex);
  puSprite.anchor.set(0.5);
  puSprite.width = 28;
  puSprite.height = 28;
  puSprite.x = x;
  puSprite.y = y;

  const obj: PowerUpObj = {
    sprite: puSprite,
    ptype: isLife ? "life" : "rapid",
    vx: 0,
    vy: 1.5,
  };

  powerUps.push(obj);
  app.stage.addChild(puSprite);
}

export function updatePowerUps(app: Application, H: number, ship: Ship, hud: HUD, activateRapid: () => void) {
  for (let i = powerUps.length - 1; i >= 0; i--) {
    const pu = powerUps[i];
    pu.sprite.y += pu.vy;

    if (pu.sprite.y > H + 40) {
      app.stage.removeChild(pu.sprite);
      powerUps.splice(i, 1);
      continue;
    }

    const dx = pu.sprite.x - ship.x;
    const dy = pu.sprite.y - ship.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 28) {
      SoundManager.playPowerUp();
      if (pu.ptype === "life") {
        hud.setLives(Math.min(hud.getLives() + 1, 3));
      } else {
        activateRapid();
      }
      app.stage.removeChild(pu.sprite);
      powerUps.splice(i, 1);
    }
  }
}
