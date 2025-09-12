import { sound } from "@pixi/sound";

export class SoundManager {
  static load(): void {
    sound.add("shoot", "assets/sounds/shoot.mp3");
    sound.add("explosion", "assets/sounds/explosion.mp3");
    sound.add("hit", "assets/sounds/hit.mp3");
    sound.add("music_menu", "assets/sounds/music_menu.mp3");
    sound.add("music_game", "assets/sounds/music_game.mp3");
    sound.add("power_up", "assets/sounds/power_up_collect.mp3" )
  }

  static playShoot(): void {
    sound.play("shoot", {volume: 0.1});
  }

  static playExplosion(): void {
    sound.play("explosion", {volume: 1});
  }

  static playHit(): void {
    sound.play("hit", {volume: 0.2});
  }

  static playPowerUp(): void {
    sound.play("power_up", {volume: 0.2});
  }

  static playMenuMusic(): void {
    sound.stopAll();
    sound.play("music_menu", { loop: true, volume: 0.2 });
  }

  static playGameMusic(): void {
    sound.stopAll();
    sound.play("music_game", { loop: true, volume: 0.02 });
  }
}
