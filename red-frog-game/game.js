// RED FROG — Chicago Night Patrol
// TMNT-arcade-style side scroller prototype. The whole scene (background
// AND characters) is drawn into one low-res offscreen canvas, then
// upscaled with nearest-neighbor filtering — that's what gives everything
// a consistent chunky pixel-art look instead of just the sprites having it.
// Crisp UI text (labels, signs, hearts) is drawn in a second pass directly
// onto the real canvas so it stays readable.

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const CANVAS_W = canvas.width;
const CANVAS_H = canvas.height;

const WORLD_SCALE = 0.4;
const WORLD_W = Math.round(CANVAS_W * WORLD_SCALE);
const WORLD_H = Math.round(CANVAS_H * WORLD_SCALE);
const PX = 1 / WORLD_SCALE; // world-space size of one low-res pixel, for outline offsets

const world = document.createElement('canvas');
world.width = WORLD_W;
world.height = WORLD_H;
const wctx = world.getContext('2d');
wctx.imageSmoothingEnabled = false;

// Draws shapeFn(c, silhouette) four times offset by one low-res pixel in
// black (silhouette=true), then once normally, all directly in the current
// wctx transform — gives sprites a clean black outline at native pixel size.
function drawWithOutline(shapeFn) {
  const offsets = [[-PX, 0], [PX, 0], [0, -PX], [0, PX]];
  for (const [dx, dy] of offsets) {
    wctx.save();
    wctx.translate(dx, dy);
    shapeFn(wctx, true);
    wctx.restore();
  }
  shapeFn(wctx, false);
}

const LEVEL_W = 3600;
const GROUND_TOP = 350;
const GROUND_BOTTOM = 470;

const COLORS = {
  frogBody: '#c11f2a',
  frogBodyLight: '#e2402f',
  frogBelly: '#f0c199',
  camo: '#4b5320',
  camoDark: '#39400f',
  gearBlack: '#1c1c1c',
  brass: '#d4a017',
  gold: '#FACC15',
  frogBodyDark: '#8f1720',
  lurker: '#2c3b52',
  lurkerLight: '#44597a',
  sleeperBlanket: '#3b4a63',
  skyTop: '#0d0d24',
  skyBottom: '#2d1b4e',
  farBuilding: '#151530',
  midBuilding: '#1f2040',
  sidewalk: '#43434c',
  road: '#232228',
};

const SKIN_TONES = ['#e8b98a', '#c98a5b', '#8a5a3b', '#f0d0a0'];
const HAIR_COLORS = ['#2b2318', '#5a3a22', '#6b6b6b', '#7a4a1a'];
const BLANKET_COLORS = ['#3b4a63', '#4a3b5c', '#3b5c52', '#5c4a3b'];
const SHIRT_COLORS = ['#4a5c8f', '#7a4a4a', '#4a7a5c', '#8f7a4a'];

const state = {
  mode: 'TITLE', // TITLE | PLAYING | WIN
  cameraX: 0,
  keys: {},
  lastTime: 0,
  toastTimer: 0,
  shownTips: new Set(),
  particles: [],
  candies: [],
};

// ---------- Player ----------
const player = {
  x: 160, y: 420, w: 46, h: 60,
  facing: 1,
  speed: 200, // px/sec
  health: 5, maxHealth: 5,
  invulnTimer: 0,
  sprayTimer: 0, sprayCooldown: 0,
  candyCooldown: 0, throwTimer: 0,
  state: 'idle',
  animTimer: 0,
  hitFlash: 0,
};

function resetPlayer() {
  player.x = 160; player.y = 420; player.facing = 1;
  player.health = player.maxHealth;
  player.invulnTimer = 0; player.sprayTimer = 0; player.sprayCooldown = 0;
  player.candyCooldown = 0; player.throwTimer = 0; player.state = 'idle';
}

// ---------- Level entities ----------
let enemies = [];
let sleepers = [];

function buildLevel() {
  enemies = [
    { x: 900, y: 400, w: 42, h: 58, health: 3, maxHealth: 3, state: 'idle', speed: 90, hitCooldown: 0, contactCooldown: 0, fleeTimer: 0, facing: -1, animTimer: 0 },
    { x: 1850, y: 440, w: 42, h: 58, health: 3, maxHealth: 3, state: 'idle', speed: 95, hitCooldown: 0, contactCooldown: 0, fleeTimer: 0, facing: -1, animTimer: 0 },
    { x: 2650, y: 395, w: 42, h: 58, health: 3, maxHealth: 3, state: 'idle', speed: 100, hitCooldown: 0, contactCooldown: 0, fleeTimer: 0, facing: -1, animTimer: 0 },
  ];

  sleepers = [
    { x: 560, y: 455, w: 56, h: 26, stage: 0, meter: 0, walkOff: 0, palette: 0 },
    { x: 1320, y: 405, w: 56, h: 26, stage: 0, meter: 0, walkOff: 0, palette: 1 },
    { x: 2200, y: 460, w: 56, h: 26, stage: 0, meter: 0, walkOff: 0, palette: 2 },
    { x: 3150, y: 415, w: 56, h: 26, stage: 0, meter: 0, walkOff: 0, palette: 3 },
  ];
}

const goalX = LEVEL_W - 160;

// ---------- Background layers (generated once) ----------
const farBuildings = [];
const midBuildings = [];
const streetLights = [];

function buildBackground() {
  farBuildings.length = 0;
  midBuildings.length = 0;
  streetLights.length = 0;

  let x = -100;
  while (x < LEVEL_W * 0.35 + CANVAS_W) {
    const w = 90 + Math.random() * 120;
    const h = 120 + Math.random() * 160;
    farBuildings.push({ x, w, h });
    x += w + 6;
  }

  x = -100;
  while (x < LEVEL_W * 0.6 + CANVAS_W) {
    const w = 70 + Math.random() * 90;
    const h = 90 + Math.random() * 130;
    const windows = [];
    const cols = Math.floor(w / 16);
    const rows = Math.floor(h / 20);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() < 0.35) windows.push({ c, r });
      }
    }
    midBuildings.push({ x, w, h, cols, rows, windows });
    x += w + 10;
  }

  for (let lx = 200; lx < LEVEL_W - 100; lx += 300) {
    streetLights.push({ x: lx });
  }
}

// ---------- Input ----------
window.addEventListener('keydown', (e) => {
  state.keys[e.code] = true;
  if (e.code === 'Enter') {
    if (state.mode === 'TITLE') startGame();
    else if (state.mode === 'WIN') startGame();
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { state.keys[e.code] = false; });

function startGame() {
  buildLevel();
  resetPlayer();
  state.particles = [];
  state.candies = [];
  state.cameraX = 0;
  state.shownTips = new Set();
  state.mode = 'PLAYING';
  document.getElementById('titleScreen').classList.add('hidden');
  document.getElementById('winScreen').classList.add('hidden');
}

function showToast(msg, key) {
  if (key && state.shownTips.has(key)) return;
  if (key) state.shownTips.add(key);
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  state.toastTimer = 2600;
}

// ---------- Update ----------
function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function update(dt) {
  if (state.mode !== 'PLAYING') return;

  updatePlayer(dt);
  updateEnemies(dt);
  updateSleepers(dt);
  updateCandies(dt);
  updateParticles(dt);

  state.cameraX = Math.max(0, Math.min(player.x - CANVAS_W / 2, LEVEL_W - CANVAS_W));

  if (state.toastTimer > 0) {
    state.toastTimer -= dt * 1000;
    if (state.toastTimer <= 0) document.getElementById('toast').classList.remove('show');
  }

  const allRescued = sleepers.every((s) => s.stage >= 2);
  if (allRescued && player.x > goalX - 40) {
    winGame();
  } else if (player.x > goalX - 40 && !allRescued) {
    player.x = goalX - 40;
    showToast('Someone back there still needs help before you head in.', 'goalBlocked');
  }

  updateHud();
}

function updatePlayer(dt) {
  const k = state.keys;
  let dx = 0, dy = 0;
  if (k['ArrowLeft'] || k['KeyA']) dx -= 1;
  if (k['ArrowRight'] || k['KeyD']) dx += 1;
  if (k['ArrowUp'] || k['KeyW']) dy -= 1;
  if (k['ArrowDown'] || k['KeyS']) dy += 1;

  const moving = dx !== 0 || dy !== 0;
  if (dx !== 0) player.facing = dx > 0 ? 1 : -1;

  if (moving) {
    const len = Math.hypot(dx, dy) || 1;
    player.x += (dx / len) * player.speed * dt;
    player.y += (dy / len) * player.speed * dt;
  }
  player.x = Math.max(30, Math.min(LEVEL_W - 30, player.x));
  player.y = Math.max(GROUND_TOP, Math.min(GROUND_BOTTOM, player.y));

  player.sprayCooldown = Math.max(0, player.sprayCooldown - dt * 1000);
  player.candyCooldown = Math.max(0, player.candyCooldown - dt * 1000);
  player.sprayTimer = Math.max(0, player.sprayTimer - dt * 1000);
  player.throwTimer = Math.max(0, player.throwTimer - dt * 1000);
  player.invulnTimer = Math.max(0, player.invulnTimer - dt * 1000);
  player.hitFlash = Math.max(0, player.hitFlash - dt * 1000);

  if (k['KeyZ'] && player.sprayCooldown <= 0) {
    player.sprayCooldown = 220;
    player.sprayTimer = 260;
  }

  if (player.sprayTimer > 0) {
    const nozzleX = player.x + player.facing * 46;
    const nozzleY = player.y - 34;
    const spawnCount = 3;
    for (let i = 0; i < spawnCount; i++) {
      const spread = (Math.random() - 0.5) * 26;
      const speed = 220 + Math.random() * 140;
      state.particles.push({
        x: nozzleX + player.facing * 10,
        y: nozzleY + spread * 0.3,
        vx: player.facing * speed,
        vy: spread + (Math.random() - 0.5) * 30,
        life: 260 + Math.random() * 180,
        maxLife: 440,
        size: 2 + Math.random() * 2.4,
        color: 'water',
        gravity: true,
      });
    }
  }

  if (k['KeyX'] && player.candyCooldown <= 0) {
    player.candyCooldown = 650;
    player.throwTimer = 260;
    const targetX = player.x + player.facing * 80;
    state.candies.push({
      startX: player.x + player.facing * 10,
      startY: player.y - 20,
      x: player.x + player.facing * 10,
      y: player.y - 20,
      targetX,
      t: 0,
      duration: 380,
      landed: false,
    });
  }

  player.state = player.sprayTimer > 0 ? 'spray' : moving ? 'walk' : 'idle';
  player.animTimer += dt * 1000;
}

function updateEnemies(dt) {
  const sprayActive = player.sprayTimer > 0;
  const sprayBox = {
    x: player.facing > 0 ? player.x : player.x - 90,
    y: player.y - 34,
    w: 90,
    h: 68,
  };

  for (const en of enemies) {
    en.animTimer += dt * 1000;
    en.hitCooldown = Math.max(0, en.hitCooldown - dt * 1000);
    en.contactCooldown = Math.max(0, en.contactCooldown - dt * 1000);

    if (en.state === 'defeated') continue;

    if (en.state === 'fleeing') {
      en.x += en.facing * en.speed * 1.6 * dt;
      en.fleeTimer -= dt * 1000;
      if (en.fleeTimer <= 0) en.state = 'defeated';
      continue;
    }

    const distToPlayer = Math.abs(player.x - en.x);
    if (en.state === 'idle' && distToPlayer < 260) en.state = 'chase';

    if (en.state === 'chase') {
      const dir = player.x > en.x ? 1 : -1;
      en.facing = dir;
      en.x += dir * en.speed * dt;
      en.y += Math.sign(player.y - en.y) * Math.min(Math.abs(player.y - en.y), en.speed * 0.6 * dt);

      if (rectsOverlap(en.x - en.w / 2, en.y - en.h, en.w, en.h, player.x - player.w / 2, player.y - player.h, player.w, player.h)) {
        if (en.contactCooldown <= 0 && player.invulnTimer <= 0) {
          player.health = Math.max(0, player.health - 1);
          player.invulnTimer = 1000;
          player.hitFlash = 1000;
          en.contactCooldown = 900;
          player.x += dir * -24;
          showToast('Watch out — they push back.', 'firstHit');
        }
      }
    }

    if (sprayActive && en.hitCooldown <= 0 &&
        rectsOverlap(sprayBox.x, sprayBox.y, sprayBox.w, sprayBox.h, en.x - en.w / 2, en.y - en.h, en.w, en.h)) {
      en.health -= 1;
      en.hitCooldown = 260;
      en.x += player.facing * 30;
      if (en.health <= 0) {
        en.state = 'fleeing';
        en.fleeTimer = 900;
        en.facing = -player.facing;
        showToast('They took off. Keep going.', 'firstEnemyDown');
      } else {
        showToast('Spray pushes them back!', 'firstSprayHit');
      }
    }
  }
}

function updateSleepers(dt) {
  const sprayActive = player.sprayTimer > 0;
  const sprayBox = {
    x: player.facing > 0 ? player.x : player.x - 90,
    y: player.y - 34,
    w: 90,
    h: 68,
  };

  for (const s of sleepers) {
    if (s.stage === 0) {
      const overlap = rectsOverlap(sprayBox.x, sprayBox.y, sprayBox.w, sprayBox.h, s.x - s.w / 2, s.y - s.h, s.w, s.h);
      if (sprayActive && overlap) {
        s.meter = Math.min(100, s.meter + dt * 90);
        if (s.meter >= 100) {
          s.stage = 1;
          showToast('They woke up — toss candy to comfort them.', 'firstWake');
        }
      }
    } else if (s.stage === 1) {
      // waiting for candy
    } else if (s.stage === 2 && s.walkOff < 1) {
      s.walkOff += dt * 0.6;
    }
  }
}

function updateCandies(dt) {
  for (const c of state.candies) {
    if (c.landed) continue;
    c.t += dt * 1000;
    const p = Math.min(1, c.t / c.duration);
    c.x = c.startX + (c.targetX - c.startX) * p;
    c.y = c.startY - Math.sin(p * Math.PI) * 60;
    if (p >= 1) {
      c.landed = true;
      let hit = false;
      for (const s of sleepers) {
        if (s.stage === 1 && Math.abs(s.x - c.targetX) < 70) {
          s.stage = 2;
          hit = true;
          for (let i = 0; i < 10; i++) {
            state.particles.push({
              x: s.x, y: s.y - 20,
              vx: (Math.random() - 0.5) * 120,
              vy: -80 - Math.random() * 60,
              life: 500,
              color: i % 2 ? '#FACC15' : '#ff8fa3',
              gravity: true,
            });
          }
          showToast('Rescued! One more block to cover.', 'firstRescue');
        }
      }
      if (!hit) {
        for (let i = 0; i < 5; i++) {
          state.particles.push({ x: c.targetX, y: c.y, vx: (Math.random() - 0.5) * 60, vy: -20, life: 250, color: '#FACC15' });
        }
      }
    }
  }
  state.candies = state.candies.filter((c) => !c.landed || performance.now());
}

function updateParticles(dt) {
  for (const p of state.particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.gravity) p.vy += 400 * dt;
    p.life -= dt * 1000;
  }
  state.particles = state.particles.filter((p) => p.life > 0);
}

function winGame() {
  state.mode = 'WIN';
  document.getElementById('winStats').textContent =
    `${sleepers.length} people helped off the streets tonight.`;
  document.getElementById('winScreen').classList.remove('hidden');
}

function updateHud() {
  const pct = Math.max(0, (player.health / player.maxHealth) * 100);
  document.getElementById('healthBar').innerHTML = `<div class="bar-fill" style="width:${pct}%"></div>`;
  const rescued = sleepers.filter((s) => s.stage >= 2).length;
  document.getElementById('rescueCount').textContent = `${rescued} / ${sleepers.length}`;
}

// ---------- Draw ----------
// Everything visual is drawn twice: once into the low-res `world` canvas
// (pixelated, upscaled), then a second crisp pass on `ctx` for text/labels
// that would turn to mush if downsampled.
function draw() {
  wctx.setTransform(1, 0, 0, 1, 0, 0);
  wctx.clearRect(0, 0, WORLD_W, WORLD_H);
  wctx.save();
  wctx.scale(WORLD_SCALE, WORLD_SCALE);

  drawSky();
  drawFarBuildings();
  drawMidBuildings();
  drawStreet();
  drawStreetLights();
  drawGoalMarker();

  const crispCallbacks = [];

  if (state.mode === 'PLAYING') {
    const drawables = [
      ...sleepers.map((s) => ({ y: s.y, draw: () => crispCallbacks.push(drawSleeper(s)) })),
      ...enemies.filter((e) => e.state !== 'defeated').map((e) => ({ y: e.y, draw: () => crispCallbacks.push(drawEnemy(e)) })),
      { y: player.y, draw: () => drawPlayer() },
    ];
    drawables.sort((a, b) => a.y - b.y);
    for (const d of drawables) d.draw();

    drawCandies();
    drawParticles();
  }

  wctx.restore();

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.drawImage(world, 0, 0, WORLD_W, WORLD_H, 0, 0, CANVAS_W, CANVAS_H);

  drawGoalLabel();
  for (const cb of crispCallbacks) if (cb) cb();
}

function worldToScreen(x) { return x - state.cameraX; }

function drawSky() {
  const g = wctx.createLinearGradient(0, 0, 0, CANVAS_H);
  g.addColorStop(0, COLORS.skyTop);
  g.addColorStop(1, COLORS.skyBottom);
  wctx.fillStyle = g;
  wctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // moon
  wctx.fillStyle = '#f4f0d8';
  wctx.beginPath();
  wctx.arc(CANVAS_W - 120 - state.cameraX * 0.05, 80, 30, 0, Math.PI * 2);
  wctx.fill();
}

function drawFarBuildings() {
  wctx.fillStyle = COLORS.farBuilding;
  for (const b of farBuildings) {
    const sx = b.x - state.cameraX * 0.3;
    if (sx + b.w < 0 || sx > CANVAS_W) continue;
    wctx.fillRect(sx, 260 - b.h + 200, b.w, b.h);
  }
}

function drawMidBuildings() {
  for (const b of midBuildings) {
    const sx = b.x - state.cameraX * 0.55;
    if (sx + b.w < 0 || sx > CANVAS_W) continue;
    const top = GROUND_TOP - b.h + 40;
    wctx.fillStyle = COLORS.midBuilding;
    wctx.fillRect(sx, top, b.w, b.h + 60);
    wctx.fillStyle = 'rgba(250, 204, 21, 0.55)';
    for (const win of b.windows) {
      wctx.fillRect(sx + win.c * 16 + 4, top + win.r * 20 + 6, 8, 10);
    }
  }
}

function drawStreet() {
  wctx.fillStyle = COLORS.sidewalk;
  wctx.fillRect(0, GROUND_TOP - 10, CANVAS_W, (GROUND_BOTTOM - GROUND_TOP) + 60);
  wctx.strokeStyle = 'rgba(0,0,0,0.25)';
  wctx.lineWidth = 2;
  for (let i = 0; i < CANVAS_W; i += 46) {
    wctx.beginPath();
    wctx.moveTo(i, GROUND_TOP - 10);
    wctx.lineTo(i - 10, GROUND_BOTTOM + 50);
    wctx.stroke();
  }
  wctx.fillStyle = COLORS.road;
  wctx.fillRect(0, GROUND_BOTTOM + 50, CANVAS_W, CANVAS_H - (GROUND_BOTTOM + 50));
}

function drawStreetLights() {
  for (const l of streetLights) {
    const sx = worldToScreen(l.x);
    if (sx < -40 || sx > CANVAS_W + 40) continue;
    wctx.fillStyle = '#111';
    wctx.fillRect(sx - 3, 150, 6, GROUND_TOP - 150 + 20);
    wctx.fillStyle = '#222';
    wctx.fillRect(sx - 3, 150, 40, 6);
    const glow = wctx.createRadialGradient(sx + 30, 156, 4, sx + 30, 156, 70);
    glow.addColorStop(0, 'rgba(250, 204, 21, 0.35)');
    glow.addColorStop(1, 'rgba(250, 204, 21, 0)');
    wctx.fillStyle = glow;
    wctx.beginPath();
    wctx.arc(sx + 30, 156, 70, 0, Math.PI * 2);
    wctx.fill();
    wctx.fillStyle = COLORS.gold;
    wctx.beginPath();
    wctx.arc(sx + 30, 156, 5, 0, Math.PI * 2);
    wctx.fill();
  }
}

function drawGoalMarker() {
  const sx = worldToScreen(goalX);
  if (sx < -80 || sx > CANVAS_W + 80) return;
  const allRescued = sleepers.every((s) => s.stage >= 2);
  wctx.fillStyle = allRescued ? '#2fbf71' : '#555';
  wctx.fillRect(sx - 4, GROUND_TOP - 120, 8, 190);
  wctx.fillStyle = allRescued ? '#2fbf71' : '#3a3a3a';
  wctx.fillRect(sx - 50, GROUND_TOP - 130, 100, 30);
}

function drawGoalLabel() {
  const sx = worldToScreen(goalX);
  if (sx < -80 || sx > CANVAS_W + 80) return;
  ctx.fillStyle = '#0a0a12';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SHELTER', sx, GROUND_TOP - 110);
}

function playerShape(c, silhouette, flash, sprayExtended, throwing) {
  const col = (normal) => (silhouette ? '#0a0a0a' : normal);
  const skin = flash ? '#ffffff' : COLORS.frogBody;
  const skinDark = flash ? '#eeeeee' : COLORS.frogBodyDark;
  const belly = flash ? '#fff6e8' : COLORS.frogBelly;
  const hx = sprayExtended ? 48 : 36; // cannon tip position, matches drawWaterStream's nozzle

  // tank backpack (behind everything, peeks over the shoulder)
  c.fillStyle = col(COLORS.gearBlack);
  c.beginPath(); c.roundRect(-15, -86, 12, 24, 3); c.fill();
  if (!silhouette) {
    c.fillStyle = COLORS.brass;
    c.fillRect(-13, -88, 8, 4);
  }

  // bent froggy legs, wide crouched stance
  c.fillStyle = col(skin);
  c.beginPath(); c.roundRect(-20, -36, 15, 20, 6); c.fill(); // L thigh
  c.beginPath(); c.roundRect(-22, -18, 13, 18, 5); c.fill(); // L shin
  c.beginPath(); c.roundRect(5, -36, 15, 20, 6); c.fill(); // R thigh
  c.beginPath(); c.roundRect(9, -18, 13, 18, 5); c.fill(); // R shin

  // webbed feet
  c.beginPath(); c.roundRect(-26, -3, 20, 7, 3); c.fill();
  c.beginPath(); c.roundRect(6, -3, 20, 7, 3); c.fill();
  if (!silhouette) {
    c.fillStyle = skinDark;
    c.fillRect(-24, -2, 2, 6); c.fillRect(-19, -2, 2, 6); c.fillRect(-14, -2, 2, 6);
    c.fillRect(8, -2, 2, 6); c.fillRect(13, -2, 2, 6); c.fillRect(18, -2, 2, 6);
  }

  // patchwork camo shorts, jagged hem
  c.fillStyle = col(COLORS.camo);
  c.beginPath();
  c.moveTo(-23, -42); c.lineTo(23, -42); c.lineTo(22, -20);
  c.lineTo(14, -26); c.lineTo(7, -16); c.lineTo(0, -24);
  c.lineTo(-7, -16); c.lineTo(-14, -26); c.lineTo(-22, -20);
  c.closePath(); c.fill();
  if (!silhouette) {
    c.fillStyle = COLORS.camoDark;
    c.beginPath(); c.ellipse(-10, -34, 6, 5, 0.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(9, -30, 5, 4, -0.4, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(196,180,120,0.55)';
    c.beginPath(); c.ellipse(1, -38, 6, 3, 0.2, 0, Math.PI * 2); c.fill();
    c.fillStyle = COLORS.gearBlack;
    c.fillRect(-23, -43, 46, 4);
  }

  // back arm, relaxed at side — only when not mid-throw (throw pose drawn later, on top)
  if (!throwing) {
    c.fillStyle = col(skin);
    c.beginPath(); c.roundRect(-28, -66, 11, 18, 5); c.fill();
    c.beginPath(); c.roundRect(-30, -48, 10, 14, 4); c.fill();
  }

  // muscular torso, broad shoulders
  c.fillStyle = col(skin);
  c.beginPath(); c.roundRect(-19, -70, 38, 32, 10); c.fill();
  c.beginPath(); c.arc(-18, -66, 8, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(18, -66, 8, 0, Math.PI * 2); c.fill();

  if (!silhouette) {
    c.strokeStyle = skinDark;
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(0, -66); c.lineTo(0, -42); c.stroke();
    c.beginPath(); c.moveTo(-11, -50); c.lineTo(11, -50); c.stroke();
    // mottled amphibian skin texture
    c.fillStyle = 'rgba(143,23,32,0.35)';
    c.beginPath(); c.ellipse(-14, -60, 4, 3, 0.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(13, -56, 3.5, 2.5, -0.3, 0, Math.PI * 2); c.fill();
  }

  // belly patch
  c.fillStyle = col(belly);
  c.beginPath(); c.roundRect(-10, -58, 20, 22, 7); c.fill();

  // front arm + hand gripping the water cannon
  c.fillStyle = col(skin);
  c.beginPath(); c.roundRect(14, -66, 12, 16, 5); c.fill(); // bicep
  c.beginPath(); c.roundRect(19, -52, 11, 11, 4); c.fill(); // gripping hand

  // cannon barrel: thick tube from the grip out to the tip
  const gx = 25, gy = -46;
  const dx = hx - gx, dy = -34 - gy;
  const barrelLen = Math.hypot(dx, dy);
  const barrelAng = Math.atan2(dy, dx);
  c.save();
  c.translate(gx, gy);
  c.rotate(barrelAng);
  c.fillStyle = col(flash ? '#ffffff' : '#33363b');
  c.beginPath(); c.roundRect(0, -5, barrelLen, 10, 3); c.fill();
  if (!silhouette) {
    c.fillStyle = 'rgba(255,255,255,0.18)';
    c.fillRect(2, -4, barrelLen - 4, 2.5); // metal highlight
    c.fillStyle = COLORS.gearBlack;
    c.fillRect(barrelLen * 0.35, -5, 2.5, 10); // support band
    c.fillRect(barrelLen * 0.7, -5, 2.5, 10);
  }
  c.restore();

  if (!silhouette) {
    // brass muzzle
    c.fillStyle = COLORS.brass;
    c.beginPath(); c.arc(hx, -34, 5.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#8a6a10';
    c.beginPath(); c.arc(hx, -34, 2.5, 0, Math.PI * 2); c.fill();
    // hose feeding the cannon from the tank
    c.strokeStyle = COLORS.gearBlack;
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-8, -80);
    c.quadraticCurveTo(6, -58, 20, -48);
    c.stroke();
  }

  // wide, flat frog head — eyes bulge clearly above the skull
  c.fillStyle = col(skin);
  c.beginPath(); c.roundRect(-18, -88, 36, 22, 13); c.fill();
  c.beginPath(); c.arc(-9, -92, 9, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(9, -92, 9, 0, Math.PI * 2); c.fill();

  if (!silhouette) {
    c.fillStyle = COLORS.gold;
    c.beginPath(); c.arc(-9, -92, 4.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(9, -92, 4.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1a1a1a';
    c.beginPath(); c.arc(-8, -92, 2.2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(10, -92, 2.2, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.85)';
    c.beginPath(); c.arc(-11.5, -95, 1.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(6.5, -95, 1.4, 0, Math.PI * 2); c.fill();

    // battle-paint eye stripes
    c.fillStyle = COLORS.gearBlack;
    c.beginPath(); c.moveTo(-16, -76); c.lineTo(-4, -74); c.lineTo(-16, -72); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(16, -76); c.lineTo(4, -74); c.lineTo(16, -72); c.closePath(); c.fill();

    c.fillStyle = '#5a0f14';
    c.beginPath(); c.arc(-3, -70, 1.3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(3, -70, 1.3, 0, Math.PI * 2); c.fill();
  }

  // wide frog mouth, spans nearly the full head
  c.strokeStyle = col(COLORS.gearBlack);
  c.lineWidth = 2.2;
  c.beginPath();
  c.moveTo(-16, -68); c.quadraticCurveTo(0, -63, 16, -68);
  c.stroke();

  // bandana across the forehead, between the eyes and mouth, tails trailing
  c.fillStyle = col(COLORS.camoDark);
  c.beginPath(); c.roundRect(-19, -81, 38, 7, 3); c.fill();
  if (!silhouette) {
    const t = performance.now() / 150;
    c.beginPath();
    c.moveTo(-19, -80); c.lineTo(-32, -85 + Math.sin(t) * 2); c.lineTo(-28, -77);
    c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(-19, -77); c.lineTo(-30, -71 + Math.sin(t + 1) * 2); c.lineTo(-26, -73);
    c.closePath(); c.fill();
  }

  // throwing arm — cocked up and across, drawn last so it reads in front
  if (throwing) {
    c.fillStyle = col(skin);
    c.beginPath(); c.roundRect(-22, -78, 10, 16, 5); c.fill(); // cocked bicep
    c.beginPath();
    c.moveTo(-18, -76); c.lineTo(0, -89); c.lineTo(5, -84); c.lineTo(-13, -70);
    c.closePath(); c.fill(); // forearm reaching up-forward

    if (!silhouette) {
      c.fillStyle = COLORS.gold;
      c.beginPath(); c.arc(2, -88, 3.2, 0, Math.PI * 2); c.fill();
      c.strokeStyle = '#c11f2a';
      c.lineWidth = 1;
      c.stroke();
    }
  }
}

function drawPlayer() {
  const sx = worldToScreen(player.x);
  const sy = player.y;
  const bob = player.state === 'walk' ? Math.sin(player.animTimer / 80) * 3 : 0;
  const flash = player.hitFlash > 0 && Math.floor(player.hitFlash / 100) % 2 === 0;
  const sprayExtended = player.state === 'spray';
  const throwing = player.throwTimer > 0;

  wctx.fillStyle = 'rgba(0,0,0,0.35)';
  wctx.beginPath();
  wctx.ellipse(sx, sy + bob + 4, 22, 7, 0, 0, Math.PI * 2);
  wctx.fill();

  wctx.save();
  wctx.translate(sx, sy + bob);
  wctx.scale(player.facing, 1);
  drawWithOutline((c, silhouette) => playerShape(c, silhouette, flash, sprayExtended, throwing));
  wctx.restore();

  if (player.state === 'spray') {
    drawWaterStream(sx, sy + bob, player.facing);
  }
}

function drawWaterStream(sx, sy, dir) {
  const t = performance.now() / 1000;
  const nozzleX = sx + dir * 48;
  const nozzleY = sy - 34;
  const len = 74;
  const endX = nozzleX + dir * len;
  const wiggle = Math.sin(t * 22) * 5;
  const droop = 16 + Math.sin(t * 9) * 3;
  const midX = nozzleX + dir * len * 0.5;
  const midY = nozzleY - 4 + wiggle;
  const endY = nozzleY + droop;

  wctx.save();
  wctx.lineCap = 'round';

  wctx.strokeStyle = 'rgba(160, 216, 240, 0.28)';
  wctx.lineWidth = 15;
  wctx.beginPath();
  wctx.moveTo(nozzleX, nozzleY);
  wctx.quadraticCurveTo(midX, midY, endX, endY);
  wctx.stroke();

  wctx.strokeStyle = 'rgba(196, 232, 248, 0.55)';
  wctx.lineWidth = 8;
  wctx.beginPath();
  wctx.moveTo(nozzleX, nozzleY);
  wctx.quadraticCurveTo(midX, midY, endX, endY);
  wctx.stroke();

  wctx.strokeStyle = 'rgba(235, 250, 255, 0.9)';
  wctx.lineWidth = 3.5;
  wctx.beginPath();
  wctx.moveTo(nozzleX, nozzleY);
  wctx.quadraticCurveTo(midX, midY, endX, endY);
  wctx.stroke();

  const flare = wctx.createRadialGradient(nozzleX, nozzleY, 0, nozzleX, nozzleY, 11);
  flare.addColorStop(0, 'rgba(255,255,255,0.95)');
  flare.addColorStop(1, 'rgba(255,255,255,0)');
  wctx.fillStyle = flare;
  wctx.beginPath();
  wctx.arc(nozzleX, nozzleY, 11, 0, Math.PI * 2);
  wctx.fill();

  wctx.restore();
}

function enemyShape(c, silhouette, flash) {
  const col = (normal) => (silhouette ? '#0a0a0a' : normal);
  const cloth = flash ? '#ffffff' : COLORS.lurker;
  const clothLight = flash ? '#ffffff' : COLORS.lurkerLight;
  const skin = flash ? '#ffffff' : '#c9926a';

  // legs
  c.fillStyle = col(cloth);
  c.beginPath(); c.roundRect(-13, -30, 11, 20, 4); c.fill();
  c.beginPath(); c.roundRect(2, -30, 11, 20, 4); c.fill();
  c.beginPath(); c.roundRect(-14, -12, 12, 12, 3); c.fill();
  c.beginPath(); c.roundRect(2, -12, 12, 12, 3); c.fill();

  // torso, jacket
  c.fillStyle = col(clothLight);
  c.beginPath(); c.roundRect(-15, -54, 30, 28, 7); c.fill();

  // arms
  c.fillStyle = col(cloth);
  c.beginPath(); c.roundRect(-21, -50, 9, 22, 4); c.fill();
  c.beginPath(); c.roundRect(12, -50, 9, 22, 4); c.fill();
  c.fillStyle = col(skin);
  c.beginPath(); c.arc(-17, -27, 4.5, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(17, -27, 4.5, 0, Math.PI * 2); c.fill();

  // head + hood
  c.fillStyle = col(skin);
  c.beginPath(); c.arc(0, -62, 10, 0, Math.PI * 2); c.fill();
  c.fillStyle = col(cloth);
  c.beginPath();
  c.moveTo(-12, -66); c.quadraticCurveTo(0, -80, 12, -66);
  c.quadraticCurveTo(10, -58, 0, -56); c.quadraticCurveTo(-10, -58, -12, -66);
  c.closePath(); c.fill();

  if (!silhouette) {
    c.fillStyle = '#e2402f';
    c.beginPath();
    c.arc(-4, -62, 2.2, 0, Math.PI * 2);
    c.arc(4, -62, 2.2, 0, Math.PI * 2);
    c.fill();
  }
}

function drawEnemy(en) {
  const sx = worldToScreen(en.x);
  const sy = en.y;
  const bob = en.state === 'chase' ? Math.sin(en.animTimer / 100) * 3 : 0;
  const flash = en.hitCooldown > 0 && en.state !== 'fleeing';

  wctx.fillStyle = 'rgba(0,0,0,0.3)';
  wctx.beginPath();
  wctx.ellipse(sx, sy + bob + 4, 20, 6, 0, 0, Math.PI * 2);
  wctx.fill();

  wctx.save();
  wctx.translate(sx, sy + bob);
  wctx.scale(en.facing, 1);
  drawWithOutline((c, silhouette) => enemyShape(c, silhouette, flash));
  wctx.restore();

  return () => {
    const hpx = sx - 15;
    for (let i = 0; i < en.maxHealth; i++) {
      ctx.fillStyle = i < en.health ? '#e2402f' : 'rgba(255,255,255,0.2)';
      ctx.fillRect(hpx + i * 10, sy - 78, 7, 5);
    }
  };
}

function sleeperShape(c, silhouette, skinTone, hairColor, blanketColor) {
  const col = (normal) => (silhouette ? '#0a0a0a' : normal);

  // blanket-covered body, lying down (head end to the left)
  c.fillStyle = col(blanketColor);
  c.beginPath(); c.roundRect(-22, -20, 44, 18, 9); c.fill();

  // feet peeking out the far end
  c.fillStyle = col(skinTone);
  c.beginPath(); c.roundRect(18, -12, 10, 7, 3); c.fill();

  // arm resting on top of the blanket
  c.fillStyle = col(skinTone);
  c.beginPath(); c.roundRect(-15, -18, 17, 6, 3); c.fill();

  // head, resting on the ground
  c.fillStyle = col(skinTone);
  c.beginPath(); c.arc(-26, -12, 10, 0, Math.PI * 2); c.fill();

  // hair
  c.fillStyle = col(hairColor);
  c.beginPath(); c.arc(-27, -19, 8, 0, Math.PI * 2); c.fill();

  if (!silhouette) {
    // closed, sleepy eye
    c.strokeStyle = '#2b2318';
    c.lineWidth = 1.3;
    c.beginPath(); c.moveTo(-31, -11); c.quadraticCurveTo(-27, -8.5, -23, -11); c.stroke();

    // open mouth + drool drip
    c.fillStyle = '#5a3a2e';
    c.beginPath(); c.ellipse(-21, -6.5, 2, 1.4, 0, 0, Math.PI * 2); c.fill();
    const drip = 3 + Math.sin(performance.now() / 400) * 1.5;
    c.fillStyle = 'rgba(180, 222, 242, 0.85)';
    c.beginPath();
    c.moveTo(-21.5, -5.5);
    c.quadraticCurveTo(-20.5, -5.5 + drip * 0.6, -21.5, -5.5 + drip);
    c.quadraticCurveTo(-22.5, -5.5 + drip * 0.6, -21.5, -5.5);
    c.closePath(); c.fill();
  }
}

function rescuedShape(c, silhouette, skinTone, hairColor, shirtColor) {
  const col = (normal) => (silhouette ? '#0a0a0a' : normal);

  c.fillStyle = col('#33333a');
  c.beginPath(); c.roundRect(-8, -22, 7, 22, 3); c.fill();
  c.beginPath(); c.roundRect(1, -22, 7, 22, 3); c.fill();

  c.fillStyle = col(shirtColor);
  c.beginPath(); c.roundRect(-9, -46, 18, 26, 6); c.fill();

  c.fillStyle = col(skinTone);
  c.beginPath(); c.roundRect(-13, -44, 6, 18, 3); c.fill(); // arm at side
  c.beginPath(); c.roundRect(8, -50, 6, 16, 3); c.fill(); // raised arm
  c.beginPath(); c.arc(13, -54, 4, 0, Math.PI * 2); c.fill(); // waving hand

  c.fillStyle = col(skinTone);
  c.beginPath(); c.arc(0, -54, 9, 0, Math.PI * 2); c.fill();

  c.fillStyle = col(hairColor);
  c.beginPath(); c.arc(0, -59, 8, Math.PI, Math.PI * 2); c.fill();

  if (!silhouette) {
    c.strokeStyle = '#2b2318';
    c.lineWidth = 1.3;
    c.beginPath(); c.moveTo(-4, -56); c.quadraticCurveTo(0, -51, 4, -56); c.stroke();
  }
}

function drawSleeper(s) {
  const sx = worldToScreen(s.x);
  const sy = s.y;
  const skinTone = SKIN_TONES[s.palette];
  const hairColor = HAIR_COLORS[s.palette];
  const blanketColor = BLANKET_COLORS[s.palette];
  const shirtColor = SHIRT_COLORS[s.palette];

  if (s.stage < 2) {
    wctx.fillStyle = 'rgba(0,0,0,0.3)';
    wctx.beginPath();
    wctx.ellipse(sx, sy + 4, 34, 8, 0, 0, Math.PI * 2);
    wctx.fill();

    wctx.save();
    wctx.translate(sx, sy);
    drawWithOutline((c, silhouette) => sleeperShape(c, silhouette, skinTone, hairColor, blanketColor));
    wctx.restore();

    if (s.stage === 0) {
      return () => {
        ctx.fillStyle = '#cfd8ea';
        ctx.font = '11px sans-serif';
        const z = Math.sin(performance.now() / 300) * 3;
        ctx.fillText('z z z', sx - 42, sy - 26 + z);
        if (s.meter > 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.4)';
          ctx.fillRect(sx - 24, sy - 34, 48, 6);
          ctx.fillStyle = '#8ecbe8';
          ctx.fillRect(sx - 24, sy - 34, 48 * (s.meter / 100), 6);
        }
      };
    } else if (s.stage === 1) {
      return () => {
        ctx.fillStyle = COLORS.gold;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('?', sx - 26, sy - 32);
      };
    }
  } else {
    const wob = Math.min(1, s.walkOff);
    wctx.save();
    wctx.globalAlpha = 1 - wob * 0.9;
    wctx.translate(sx, sy - wob * 20);
    drawWithOutline((c, silhouette) => rescuedShape(c, silhouette, skinTone, hairColor, shirtColor));
    wctx.restore();

    return () => {
      ctx.save();
      ctx.globalAlpha = 1 - wob * 0.9;
      ctx.fillStyle = COLORS.gold;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('thank you', sx, sy - wob * 20 - 70);
      ctx.restore();
    };
  }
}

function drawCandies() {
  for (const c of state.candies) {
    if (c.landed) continue;
    const sx = worldToScreen(c.x);
    wctx.fillStyle = COLORS.gold;
    wctx.beginPath();
    wctx.arc(sx, c.y, 5, 0, Math.PI * 2);
    wctx.fill();
    wctx.strokeStyle = '#c11f2a';
    wctx.lineWidth = 1.5;
    wctx.stroke();
  }
}

function drawParticles() {
  for (const p of state.particles) {
    const sx = worldToScreen(p.x);
    const alpha = Math.max(0, p.life / (p.maxLife || 400));

    if (p.color === 'water') {
      const speed = Math.hypot(p.vx, p.vy) || 1;
      const angle = Math.atan2(p.vy, p.vx);
      const stretch = Math.min(2.6, 1 + speed / 220);
      wctx.save();
      wctx.translate(sx, p.y);
      wctx.rotate(angle);
      wctx.globalAlpha = alpha * 0.85;
      wctx.fillStyle = 'rgba(190, 228, 245, 0.9)';
      wctx.beginPath();
      wctx.ellipse(0, 0, p.size * stretch, p.size * 0.6, 0, 0, Math.PI * 2);
      wctx.fill();
      wctx.globalAlpha = alpha;
      wctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      wctx.beginPath();
      wctx.ellipse(-p.size * 0.3, -p.size * 0.15, p.size * 0.35, p.size * 0.2, 0, 0, Math.PI * 2);
      wctx.fill();
      wctx.restore();
      wctx.globalAlpha = 1;
    } else {
      wctx.fillStyle = p.color;
      wctx.globalAlpha = alpha;
      wctx.beginPath();
      wctx.arc(sx, p.y, 3, 0, Math.PI * 2);
      wctx.fill();
      wctx.globalAlpha = 1;
    }
  }
}

// ---------- Loop ----------
function loop(ts) {
  if (!state.lastTime) state.lastTime = ts;
  const dt = Math.min(0.05, (ts - state.lastTime) / 1000);
  state.lastTime = ts;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

buildBackground();
requestAnimationFrame(loop);
