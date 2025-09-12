import { Container, ContainerChild, Sprite, Texture } from "pixi.js";

export class HUD {
  private hearts: Sprite[] = [];
  private texFull: Texture;
  private texEmpty: Texture;
  private lives: number;

  constructor(stage: Container<ContainerChild>, heartFullImg: HTMLImageElement, heartEmptyImg: HTMLImageElement, startLives = 3) {
    this.texFull = Texture.from(heartFullImg);
    this.texEmpty = Texture.from(heartEmptyImg);
    this.lives = startLives;

    for (let i = 0; i < startLives; i++) {
      const h = new Sprite(this.texFull);
      h.width = 28;
      h.height = 28;
      h.x = 16 + i * 36;
      h.y = 16;
      this.hearts.push(h);
      stage.addChild(h);
    }

    this.setLives(startLives);
  }

  public setLives(n: number) {
    this.lives = Math.max(0, Math.min(this.hearts.length, n));
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].texture = i < this.lives ? this.texFull : this.texEmpty;
    }
  }

  public getLives(): number {
    return this.lives;
  }
}
