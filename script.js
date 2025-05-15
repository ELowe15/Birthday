const card = document.getElementById("card");
const bgMusic = document.getElementById("bg-music");
let cardOpened = false;

// Card flip on swipe or drag
let startX = 0;

function handleStart(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function handleMove(e) {
  if (cardOpened) return;
  let x = e.touches ? e.touches[0].clientX : e.clientX;
  if (startX - x > 100) {
    card.classList.add("open");
    cardOpened = true;
    bgMusic.play();
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

  Draggable.create(balloon);
}

// Spawn balloons every 800ms
setInterval(spawnBalloon, 800);