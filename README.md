# Void Blaster

Void Blaster is a small space shooter built with PixiJS.  
I created this project as a demo to show how I work with modern web technologies, game loops, and clean TypeScript architecture.

## Gameplay
- Control the spaceship with the arrow keys:
  - Left and right arrows rotate the ship
  - Up arrow moves forward
- Use the spacebar to shoot asteroids
- Collect power-ups:
  - Heart box restores one life (max 3)
  - Rapid fire box increases shooting speed for 5 seconds
- If all lives are lost the game ends, but it can be restarted instantly

## Features
- Responsive canvas that works on desktop and mobile
- Pixel-art sprites in retro style
- Collision detection, knockback and temporary invincibility
- Sound effects and background music
- Asteroid spawning that scales with screen size
- Clean modular code separated into game, loop, powerups, hud and other files

## Tech Stack
- TypeScript  
- PixiJS v8  
- Vite  

## Run locally
```bash
npm install
npm run dev
