document.getElementById("bnext").onclick = function () {
  let lists = document.querySelectorAll(".bitem");
  document.getElementById("bslide").appendChild(lists[0]);
};
document.getElementById("bprev").onclick = function () {
  let lists = document.querySelectorAll(".bitem");
  document.getElementById("bslide").prepend(lists[lists.length - 1]);
};
