import { Container, Text } from "pixi.js";

export class Score extends Container {
  private scoreText: Text;
  private recordText: Text;
  private score = 0;
  private highscore: number;

  constructor(stageWidth: number) {
    super();

    // Highscore laden
    const saved = localStorage.getItem("highscore");
    this.highscore = saved ? parseInt(saved, 10) : 0;

    this.scoreText = new Text({
      text: "Score: 0",
      style: {
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: "monospace",
      },
    });
    this.addChild(this.scoreText);

    this.recordText = new Text({
      text: this.highscore > 0 ? `Highscore: ${this.highscore}` : "",
      style: {
        fill: 0xffd700,
        fontSize: 18,
        fontFamily: "monospace",
      },
    });
    this.recordText.y = 28;
    this.addChild(this.recordText);

    this.layout(stageWidth);
    this.y = 16;

    // Fenster-Resize -> neu layouten
    window.addEventListener("resize", () => {
      this.layout(window.innerWidth);
    });
  }

  public addPoints(amount: number) {
    this.score += amount;
    this.scoreText.text = `Score: ${this.score}`;

    if (this.score > this.highscore) {
      if (this.highscore > 0) {
        this.recordText.text = "NEW RECORD!";
      }
      this.highscore = this.score;
      localStorage.setItem("highscore", this.highscore.toString());
    }

    this.layout(window.innerWidth);
  }

  public reset() {
    this.score = 0;
    this.scoreText.text = "Score: 0";
    this.recordText.text =
      this.highscore > 0 ? `Highscore: ${this.highscore}` : "";
    this.layout(window.innerWidth);
  }

  public getScore(): number {
    return this.score;
  }

  public getHighscore(): number {
    return this.highscore;
  }

  private layout(stageWidth: number) {
    this.x = stageWidth - this.width - 16; // rechts oben mit Padding
  }
}
