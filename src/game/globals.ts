import { Application, Ticker } from "pixi.js";
import { Ship } from "../ship";
import { Bullet } from "../bullet";

export const globals = {
  appRef: null as Application | null,
  currentShip: null as Ship | null,
  currentBullets: [] as Bullet[],
  gameLoop: null as ((ticker: Ticker) => void) | null,
};

export function resetGlobals() {
  globals.currentShip = null;
  globals.currentBullets = [];
  globals.gameLoop = null;
}
