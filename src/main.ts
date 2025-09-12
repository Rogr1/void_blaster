import { Application} from "pixi.js";
import { showMenu } from "./game/menu";
import { globals } from "./game/globals";



async function main(): Promise<void> {
  const app = new Application();
  await app.init({ resizeTo: window, background: "#000000" });
  document.getElementById("pixi")!.appendChild(app.canvas);
  globals.appRef = app;
  showMenu(app);
}


main().catch(console.error);
