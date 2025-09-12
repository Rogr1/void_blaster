export function initInput() {
  const keys: Record<string, boolean> = {};
  window.addEventListener("keydown", (e) => (keys[e.code] = true));
  window.addEventListener("keyup", (e) => (keys[e.code] = false));
  return keys;
}
