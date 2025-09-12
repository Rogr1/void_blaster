export function waitForImages(imgs: HTMLImageElement[]): Promise<void> {
  return new Promise((resolve) => {
    let left = imgs.length;
    const done = () => (--left === 0 ? resolve() : undefined);
    for (const img of imgs) {
      if (img.complete && img.naturalWidth > 0) done();
      else img.addEventListener("load", done, { once: true });
    }
  });
}
