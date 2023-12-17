"use strict";

// Create snowflakes
const snowfall = document.getElementById("snowfall");
const snowfallRect = snowfall.getBoundingClientRect();
snowflakesInterval();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function snowflakeCreation() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = Math.random() * window.innerWidth + "px";

  const animationDuration = Math.random() * 80 + 50;
  snowflake.style.animationDuration = animationDuration + "s";
  snowflake.style.opacity = Math.random() * 0.7 + 0.3;

  const direction = ((Math.random() * 1001 - 500) * window.innerWidth) / 1000;
  snowflake.animate({ transform: `translateX(${direction}px)` }, { duration: animationDuration * 1000, iterations: 1 });

  function checkBoundaryCollision(snowflake) {
    const rect = snowflake.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check if element is touching or beyond any screen edge
    if (rect.left <= 1 || rect.right >= screenWidth - 1 || rect.bottom >= screenHeight - 1) {
      // delete snowflake
      snowflake.remove();
    }
  }

  snowfall.appendChild(snowflake);

  setInterval(() => {
    if (snowflake === null) return;
    checkBoundaryCollision(snowflake);
  }, 200);

  setTimeout(() => {
    snowflake.remove();
  }, animationDuration * 1000);
}

function snowflakesInterval() {
  const minWidth = 320; // Minimum screen width
  const maxWidth = 1920; // Maximum screen width
  const minSnowflakesPerSecond = 3; // Minimum snowflakes per second for the smallest screen
  const maxSnowflakesPerSecond = 5; // Maximum snowflakes per second for the largest screen

  const screenWidth = window.innerWidth;

  const snowflakesPerSecond =
    minSnowflakesPerSecond +
    ((maxSnowflakesPerSecond - minSnowflakesPerSecond) * (screenWidth - minWidth)) / (maxWidth - minWidth);

  const interval = (Math.random() * 10000) / snowflakesPerSecond;

  setInterval(snowflakeCreation, interval);
}
