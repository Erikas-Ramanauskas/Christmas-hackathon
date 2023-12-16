// Number of snowflakes you want to add
const numberOfSnowflakes = 100;

// Function to create a snowflake element
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.innerHTML = "❄";
  document.querySelector(".snowflakes").appendChild(snowflake);
}

// Create the specified number of snowflakes
for (let i = 0; i < numberOfSnowflakes; i++) {
  createSnowflake();
}
