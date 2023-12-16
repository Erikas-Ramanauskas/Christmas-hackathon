"use strict";

// Create snowflakes
const section = document.getElementById("snowfall");
for (let i = 0; i < 75; i++) {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = Math.random() * 60 + 60 + "s";
  section.appendChild(snowflake);
}