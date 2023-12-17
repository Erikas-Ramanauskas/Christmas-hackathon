const galleryContainer = document.getElementById("bslide");

document.querySelector("#bnext").onclick = function () {
  let lists = document.querySelectorAll(".bitem");
  galleryContainer.appendChild(lists[0]);
};

document.querySelector("#bprev").onclick = function () {
  let lists = document.querySelectorAll(".bitem");
  galleryContainer.prepend(lists[lists.length - 1]);
};

// Fetch JSON data
async function bFetchJson() {
  try {
    const response = await fetch("assets/data/recipies_food.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON data: ", error);
  }
}

// Connection Slider & Calendar
function createImgList(arr) {
  let calendarContent = shuffleArray([...arr]);

  let htmlContent = calendarContent.map(({
    name,
    country,
    image_url
  }, index) => `
      <div class="bitem" style="background-image: url('${image_url}')">
        <div class="bholder">
          <h3 class="bcard-text">${country}</h3>
        </div>
        <div class="bcontent">
          <div class="bname">${country}</div>
          <div class="bdes">${name}</div>
          <p>December ${index + 1}</p>
          <div class="bBtnWrap">
            <div class="bToCalendar" type="button" data-bs-target="#staticBackdrop" data-bs-toggle="modal">SEE MORE</div>
          </div>
        </div>
      </div>
    `).join("");
  return {
    htmlContent,
    calendarContent
  };
}

// Fetch and Pass Data to the Slider and Calendar
bFetchJson().then((data) => {
  const {
    htmlContent,
    calendarContent
  } = createImgList(data);
  galleryContainer.innerHTML = htmlContent;
  hCalendarDoors(calendarContent);
  callCalendarCell(calendarContent);

}).catch(error => {
  console.error("Failed to fetch data:", error);
});

// Call Calendar Cells
function callCalendarCell(calendarContent) {
  let seeMore = document.querySelectorAll('.bToCalendar')

  seeMore.forEach((button, index) => {
    button.addEventListener('click', () => {
      const recipeId = `${index}`;
      displayCalendarContent(calendarContent, recipeId);
    });
  });

}

// Mix Recipe Arrays
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}