const card = document.getElementById("card");
const bgMusic = document.getElementById("bg-music");
let cardOpened = false;

// Card flip on swipe or drag
let startX = 0;

function handleStart(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function handleMove(e) {
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const diffX = currentX - startX;
  if (!cardOpened && diffX < -50) {
    card.classList.add("open");
    cardOpened = true;
    bgMusic.play();
  } else if (cardOpened && diffX > 50) {
    card.classList.remove("open");
    cardOpened = false;
  }
}

document.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", handleMove);
document.addEventListener("touchstart", handleStart);
document.addEventListener("touchmove", handleMove);

// Pastel colors for balloons
const pastelColors = [
  "#FFB6C1", "#FFDAB9", "#E6E6FA",
  "#D1C0FF", "#FFDFD3", "#FFC0CB",
  "#FFE4E1", "#FFF0F5"
];

function spawnBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * window.innerWidth + 'px';
  balloon.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  document.body.appendChild(balloon);

  gsap.to(balloon, {
    y: window.innerHeight + 100,
    duration: 5 + Math.random() * 3,
    ease: 'power1.in',
    onComplete: () => {
      balloon.remove();
    }
  });

  balloon.addEventListener('click', () => {
    const pop = new Audio('pop.mp3');
    pop.play();
    gsap.to(balloon, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => balloon.remove() });
  });
}

function spawnFallingFlower() {
  const flower = document.createElement("div");
  flower.textContent = [
  "🌸", "🌼", "🌻", "🌹", "🌷", "🌺", "💐", "🏵️",
  "🪷", "🪻", "💮"
][Math.floor(Math.random() * 6)];
  flower.style.position = "fixed";
  flower.style.top = "-50px";
  flower.style.fontSize = Math.random() * 20 + 20 + "px";
  flower.style.opacity = 0.8;
  flower.style.zIndex = "5";

  // Set starting left in pixels based on viewport width
  const startLeft = Math.random() * window.innerWidth;
  flower.style.left = `${startLeft}px`;

  document.body.appendChild(flower);

  let y = -50;
  const fallSpeed = Math.random() * 1.5 + 0.5;
  const swayAmount = Math.random() * 2 - 1;

  const fallInterval = setInterval(() => {
    y += fallSpeed;
    const sway = Math.sin(y / 20) * swayAmount * 5;
    flower.style.top = `${y}px`;
    flower.style.left = `${startLeft + sway}px`;

    if (y > window.innerHeight + 50) {
      clearInterval(fallInterval);
      flower.remove();
    }
  }, 16);
}

for (let i = 0; i < 100; i++) {
  spawnBalloon();
}

// Spawn balloons every 800ms
setInterval(spawnBalloon, 500);
setInterval(spawnFallingFlower, 1000);