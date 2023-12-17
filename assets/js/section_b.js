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

function createImgList(arr) {
  return arr
    .map(
      ({ id, name, country, image_url }) =>
        `
                    <div
              class="bitem"
              style="background-image: url('${image_url}')"
            >
              <div class="bholder">
                <h3 class="bcard-text">${country}</h3>
              </div>
              <div class="bcontent">
                <div class="bname">${country}</div>
                <div class="bdes">${name}</div>
                 <a class="bToCalendar" data-id="${id}" href="#section-h">SEE MORE</a>
              </div>
            </div>
      `
    )
    .join("");
}

bFetchJson().then((data) => {
  galleryContainer.insertAdjacentHTML("afterbegin", createImgList(data));
  galleryContainer.innerHTML(createImgList(data));
});
