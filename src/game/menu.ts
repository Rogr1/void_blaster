import { Application, Graphics, Text, Container, Sprite, Texture } from "pixi.js";
import { startGame } from "./game";
import { SoundManager } from "./sound";

export function showMenu(app: Application) {
  SoundManager.load();
  SoundManager.playMenuMusic();

  const container = new Container();
  app.stage.addChild(container);

  // === Hintergrund ===
  const bg = new Graphics();
  container.addChild(bg);

  // === Sterne einmalig erzeugen ===
  const stars: { g: Graphics; speed: number }[] = [];
  const STAR_COUNT = 100;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = new Graphics();
    star.circle(0, 0, Math.random() * 2 + 1).fill({ color: 0xffffff });
    star.x = Math.random() * app.renderer.width;
    star.y = Math.random() * app.renderer.height;
    container.addChild(star);

    stars.push({
      g: star,
      speed: Math.random() * 1 + 0.5, 
    });
  }

  // Sterne bewegen
  app.ticker.add(() => {
    const H = app.renderer.height;
    const W = app.renderer.width;
    for (const star of stars) {
      star.g.y += star.speed;
      if (star.g.y > H) {
        star.g.y = 0;
        star.g.x = Math.random() * W;
      }
    }
  });

  // === Titel ===
  const title = new Text({
    text: "Void Blaster",
    style: { fill: 0xffffff, fontSize: 48, fontFamily: "monospace" },
  });
  container.addChild(title);

  // === Schiff unten mittig ===
  const shipImg = document.getElementById("ship-img") as HTMLImageElement;
  const ship = new Sprite(Texture.from(shipImg));
  ship.anchor.set(0.5);
  ship.scale.set(0.07); // etwas kleiner
  container.addChild(ship);

  // === Start-Button ===
  const button = new Graphics();
  container.addChild(button);

  const btnText = new Text({
    text: "Start Game",
    style: { fill: 0xffffff, fontSize: 24, fontFamily: "monospace" },
  });
  container.addChild(btnText);

  // === Layout-Funktion ===
  const layout = () => {
    const W = app.renderer.width;
    const H = app.renderer.height;

    bg.clear().rect(0, 0, W, H).fill({ color: 0x000000 });

    title.x = W / 2 - title.width / 2;
    title.y = H / 3;

    ship.x = W / 2;
    ship.y = H - 200; 

    const btnWidth = 200;
    const btnHeight = 60;
    button.clear().rect(0, 0, btnWidth, btnHeight).fill({ color: 0x4444ff });
    button.x = W / 2 - btnWidth / 2;
    button.y = H / 2;

    btnText.x = button.x + btnWidth / 2 - btnText.width / 2;
    btnText.y = button.y + btnHeight / 2 - btnText.height / 2;
  };

  layout();
  window.addEventListener("resize", layout);

  // === Button-Handler ===
  button.eventMode = "static";
  button.cursor = "pointer";
  button.on("pointertap", () => {
    app.stage.removeChild(container);
    SoundManager.playGameMusic();
    startGame(app);
    window.removeEventListener("resize", layout);
  });
}
