import { Application, Graphics, Text, Container } from "pixi.js";
import { globals } from "./globals";
import { Score } from "../score";
import { SoundManager } from "./sound";
import { startGame } from "./game";

export function showGameOver(app: Application, score: Score) {
  SoundManager.playMenuMusic();

  if (globals.gameLoop) {
    app.ticker.remove(globals.gameLoop);
    globals.gameLoop = null;
  }

  const container = new Container();
  app.stage.addChild(container);

  const bg = new Graphics();
  container.addChild(bg);

  const title = new Text({
    text: "💀 GAME OVER 💀",
    style: { fill: 0xff0000, fontSize: 48, fontFamily: "monospace" },
  });
  container.addChild(title);

  const scoreText = new Text({
    text: `Score: ${score.getScore()}\nHighscore: ${score.getHighscore()}`,
    style: { fill: 0xffffff, fontSize: 24, fontFamily: "monospace" },
  });
  container.addChild(scoreText);

  const button = new Graphics();
  container.addChild(button);

  const btnText = new Text({
    text: "Restart",
    style: { fill: 0xffffff, fontSize: 24, fontFamily: "monospace" },
  });
  container.addChild(btnText);

  const layout = () => {
    const W = app.renderer.width;
    const H = app.renderer.height;

    bg.clear().rect(0, 0, W, H).fill({ color: 0x000000 });

    title.x = W / 2 - title.width / 2;
    title.y = H / 3;

    scoreText.x = W / 2 - scoreText.width / 2;
    scoreText.y = H / 3 + 80;

    const btnWidth = 200;
    const btnHeight = 60;
    button.clear().rect(0, 0, btnWidth, btnHeight).fill({ color: 0x44aa44 });
    button.x = W / 2 - btnWidth / 2;
    button.y = H / 2 + 100;

    btnText.x = button.x + btnWidth / 2 - btnText.width / 2;
    btnText.y = button.y + btnHeight / 2 - btnText.height / 2;
  };

  layout();
  window.addEventListener("resize", layout);

  button.eventMode = "static";
  button.cursor = "pointer";
  button.on("pointertap", () => {
    app.stage.removeChild(container);
    SoundManager.playGameMusic();
    startGame(app);
    window.removeEventListener("resize", layout);
  });
}
