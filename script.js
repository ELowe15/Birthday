document.addEventListener("DOMContentLoaded", () => {
  const popupModal = document.getElementById("popup-modal");
  const cardWrapper = document.getElementById("card-wrapper");
  const submitBtn = document.getElementById("submit-answer");
  const answerInput = document.getElementById("riddle-answer");
  const feedback = document.getElementById("feedback");

  // Hide main card initially
  cardWrapper.style.display = "none";

  const correctAnswer = "peanut"; // Hardcoded answer

  let wrongAttempts = 0;


  // Focus input automatically
  answerInput.focus();

  submitBtn.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      // Correct - hide popup, show card
      popupModal.style.display = "none";
      cardWrapper.style.display = "flex";
      bgMusic.play();
      for (let i = 0; i < 100; i++) {
        spawnBalloon();
      }

      // Spawn balloons every 800ms
      setInterval(spawnBalloon, 700);
    } else {
      // Incorrect
      wrongAttempts++;
      if (wrongAttempts === 1) {
        feedback.textContent = "You can do better than that. Try again for a hint.";
      } else if (wrongAttempts === 2) {
        feedback.textContent = "Hint: Her aroma is always in the air!";
      } else {
        feedback.textContent = "Hint: Her smell in the morning.";
      }
      answerInput.value = "";
      answerInput.focus();
    }
  });

  // Optional: Allow pressing Enter to submit
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });
});


const card = document.getElementById("card");
const bgMusic = document.getElementById("bg-music");
let cardOpen = false;
let cardOpened = false;

// Card flip on swipe or drag
let startX = 0;

function handleStart(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function handleMove(e) {
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const diffX = currentX - startX;
  if (!cardOpen && diffX < -50) {
    card.classList.add("open");
    cardOpen = true;
    for (let i = 0; i < 20; i++) {
        spawnBalloon(true);
      }
    if (!cardOpened) {
      cardOpened = true;
      setInterval(() => spawnBalloon(true), 1500);
      setInterval(spawnFallingFlower, 1000);
    }
  } else if (cardOpen && diffX > 50) {
    card.classList.remove("open");
    cardOpen = false;
    for (let i = 0; i < 40; i++) {
        spawnFallingFlower();
      }
  }
}

document.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", handleMove);
document.addEventListener("touchstart", handleStart);
document.addEventListener("touchmove", handleMove);

// Pastel colors for balloons
const pastelColors = [
  "#FFB6C1", // Light Pink
  "#FFDAB9", // Peach Puff
  "#FFFACD", // Lemon Chiffon
  "#E0BBE4", // Lavender
  "#FF69B4", // Hot Pink
  "#FFCCCB", // Soft Coral
  "#FADADD", // Misty Rose
  "#B5EAD7", // Mint
  "#C5C6FF", // Periwinkle
  "#FFF5BA"  // Soft Yellow
];


function spawnBalloon(useImage = false) {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * window.innerWidth + 'px';

  if (useImage) {
    const imageSources = [
      'IMG_2559.jpeg',
      'IMG_2932.jpeg',
      'IMG_3022.jpeg',
      'IMG_3096.jpeg',
      'IMG_3148.jpeg',
      'IMG_7159.jpeg'
    ];    
    const selectedImage = imageSources[Math.floor(Math.random() * imageSources.length)];
    
    // Use the image as a background
    balloon.style.minWidth = '80px';
    balloon.style.minHeight = '110px';
    balloon.style.maxWidth = '120px';
    balloon.style.maxHeight = '160px';
    balloon.style.backgroundImage = `url(${selectedImage})`;
    balloon.style.backgroundSize = 'cover';      // Fill the entire balloon shape
    balloon.style.backgroundPosition = 'center'; // Center it
    balloon.style.backgroundRepeat = 'no-repeat';
    balloon.style.backgroundColor = 'transparent'; // Just in case

  } else {
    // Normal pastel colored balloon
    balloon.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }

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
    const pop = new Audio('bubble-pop-epic-stock-media-1-00-00.mp3');
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