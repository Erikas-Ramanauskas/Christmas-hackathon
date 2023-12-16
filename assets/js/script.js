"use strict";

// Create snowflakes
const snowfall = document.getElementById("snowfall");
snowflakesInterval();

function snowflakeCreation() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  const animationDuration = Math.random() * 40 + 20;
  snowflake.style.animationDuration = animationDuration + "s";
  snowflake.style.opacity = Math.random() * 0.7 + 0.3;

  const direction = Math.random() * 2001 - 1000;
  snowflake.animate(
    {
      transform: `translateX(${direction}px)`,
    },
    { duration: animationDuration * 1000, iterations: Infinity }
  );

  function checkBoundaryCollision(snowflake) {
    const rect = snowflake.getBoundingClientRect(); // Get element's position and size
    const screenWidth = window.innerWidth; // Width of the window
    const screenHeight = window.innerHeight; // Height of the window

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
  const maxSnowflakesPerSecond = 4; // Maximum snowflakes per second for the largest screen

  const screenWidth = window.innerWidth;

  const snowflakesPerSecond =
    minSnowflakesPerSecond +
    ((maxSnowflakesPerSecond - minSnowflakesPerSecond) * (screenWidth - minWidth)) / (maxWidth - minWidth);

  const interval = (Math.random() * 10000) / snowflakesPerSecond;

  setInterval(snowflakeCreation, interval);
  console.log(interval);
}
