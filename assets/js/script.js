"use strict";

// Create snowflakes
const section = document.getElementById("snowfall");

function snowflakeCreation() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  const animationDuration = Math.random() * 40 + 20;
  snowflake.style.animationDuration = animationDuration + "s";
  snowflake.style.opacity = Math.random();

  // const direction = Math.random() * 2001 - 1000;
  // snowflake.animate(
  //   {
  //     transform: `translateX(${direction}px)`,
  //   },
  //   { duration: animationDuration * 1000, iterations: Infinity }
  // );

  section.appendChild(snowflake);
  setTimeout(() => {
    snowflake.remove();
  }, animationDuration * 1000);
}

console.log(window.innerWidth);

setInterval(snowflakeCreation, (Math.random() * window.innerWidth) / 5);
