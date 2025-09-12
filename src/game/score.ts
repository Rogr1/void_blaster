import { Container, Text } from "pixi.js";

export class Score extends Container {
  private scoreText: Text;
  private recordText: Text;
  private score = 0;
  private highscore: number;

  constructor(stageWidth: number) {
    super();

    // Load high score from localStorage, default to 0
    const saved = localStorage.getItem("highscore");
    this.highscore = saved ? parseInt(saved, 10) : 0;

    this.scoreText = new Text({
      text: `Score: 0`,
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
        fill: 0xffd700, // Gold
        fontSize: 18,
        fontFamily: "monospace",
      },
    });
    this.recordText.y = 28;
    this.addChild(this.recordText);

    this.x = stageWidth - 220;
    this.y = 16;
  }

  public addPoints(amount: number) {
    this.score += amount;
    this.scoreText.text = `Score: ${this.score}`;

    // Check high score
    if (this.score > this.highscore) {
      if (this.highscore > 0) {
        this.recordText.text = "✨ NEW RECORD!";
      }
      this.highscore = this.score;
      localStorage.setItem("highscore", this.highscore.toString());
    }
  }

  public reset() {
    this.score = 0;
    this.scoreText.text = "Score: 0";
    this.recordText.text =
      this.highscore > 0 ? `Highscore: ${this.highscore}` : "";
  }

  public getScore(): number {
    return this.score;
  }

  public getHighscore(): number {
    return this.highscore;
  }
}
