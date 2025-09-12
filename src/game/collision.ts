import { Ship } from "./ship";
import { Asteroid } from "./asteroids";
import { HUD } from "./hud";
import { SoundManager } from "./sound";

export class CollisionManager {
  private invincible = false;
  private kbx = 0;
  private kby = 0;
  private readonly INVINCIBLE_TIME = 2000;
  private readonly KNOCKBACK = 6;

  constructor(
    private ship: Ship,
    private asteroids: Asteroid[],
    private hud: HUD
  ) {}

  public update() {
    // Apply knockback smoothly
    if (Math.abs(this.kbx) > 0.1 || Math.abs(this.kby) > 0.1) {
      this.ship.x += this.kbx;
      this.ship.y += this.kby;
      this.kbx *= 0.9;
      this.kby *= 0.9;
    }
  
    for (const a of this.asteroids) {
      const dx = this.ship.x - a.x;
      const dy = this.ship.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      if (dist < a.radius + 20) {
        if (!this.invincible) {
          // Normal collision subtract life
          SoundManager.playHit();
          this.hitShip(a);
          break;
        } else {
          // If invincible push ship back 
          const overlap = (a.radius + 20) - dist;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
      
          this.ship.x += nx * overlap;
          this.ship.y += ny * overlap;
        }
      }
    }
  }
  
  private hitShip(asteroid: Asteroid) {
    if (this.invincible || this.hud.getLives() <= 0) return;
   
    this.hud.setLives(this.hud.getLives() - 1);
    this.invincible = true;

    // Direction of the knockback
    const dx = this.ship.x - asteroid.x;
    const dy = this.ship.y - asteroid.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;

    this.kbx = nx * this.KNOCKBACK;
    this.kby = ny * this.KNOCKBACK;

    // Start blinking
    let blink = true;
    const blinkInterval = setInterval(() => {
      this.ship.alpha = blink ? 0.2 : 1.0;
      blink = !blink;
    }, 150);
    
    setTimeout(() => {
      clearInterval(blinkInterval);
      this.ship.alpha = 1.0;
      this.invincible = false;
    }, this.INVINCIBLE_TIME);
  }
}
