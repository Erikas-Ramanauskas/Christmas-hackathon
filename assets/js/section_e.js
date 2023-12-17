const eSection = document.getElementById("team-section");

const etrack = document.getElementById("e-image-track");

const eTeamMembers = [
  {
    name: "Mia",
    gitHubLink: "https://github.com/MiaRasmussen05",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U03L4K3BVML-f9fa622e9538-512",
  },
  {
    name: "Erik",
    gitHubLink: "https://github.com/Erikas-Ramanauskas",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U048Q20JVA5-fbf362012505-512",
  },
  {
    name: "Efren",
    gitHubLink: "https://github.com/eandablo",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U057U6E1DQC-b2d5bdfeb6e3-512",
  },
  {
    name: "Zainab",
    gitHubLink: "https://github.com/zaicodes",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U04TPE06GH2-14fec3bb89d4-512",
  },
  {
    name: "Volodymyr",
    gitHubLink: "https://github.com/AppForceLab",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U05997UH1KJ-9e5646e347f0-512",
  },
  {
    name: "Frank",
    gitHubLink: "https://github.com/plexoio",
    imageUrl: "https://ca.slack-edge.com/T0L30B202-U04TM57B9U5-a2265c7e01da-512",
  },
];

function eCompareRandom() {
  return Math.random() - 0.5;
}

// Shuffle the array
eTeamMembers.sort(eCompareRandom);

function eCreateTeamMemberElement(teamMember) {
  const eTeamMemberImg = document.createElement("img");
  eTeamMemberImg.src = teamMember.imageUrl;
  eTeamMemberImg.classList.add("e-image");
  eTeamMemberImg.setAttribute("draggable", "false");

  const eTeamMemberName = document.createElement("a");
  eTeamMemberName.href = teamMember.gitHubLink;
  eTeamMemberName.classList.add("e-member-name");
  eTeamMemberName.innerHTML = teamMember.name;

  const eTeamMemberNameContainer = document.createElement("div");
  eTeamMemberNameContainer.classList.add("e-hero-name-container");
  eTeamMemberNameContainer.appendChild(eTeamMemberName);

  const eTeamMemberElement = document.createElement("div");
  eTeamMemberElement.classList.add("e-member");
  eTeamMemberElement.appendChild(eTeamMemberImg);
  eTeamMemberElement.appendChild(eTeamMemberNameContainer);
  return eTeamMemberElement;
}

function ePopulateTeamMembers() {
  for (const teamMember of eTeamMembers) {
    const eTeamMemberElement = eCreateTeamMemberElement(teamMember);
    etrack.appendChild(eTeamMemberElement);
  }
}

// Populate the team members
ePopulateTeamMembers();

/* -- Event Handlers -- */
let scrollPosition;

function ehandleOnDown(e) {
  etrack.dataset.mouseDownAt = e.clientX;
}

const ehandleOnUp = () => {
  etrack.dataset.mouseDownAt = "0";
  etrack.dataset.prevPercentage = etrack.dataset.percentage;
};

const eHanfleLeave = () => {
  etrack.dataset.mouseDownAt = "0";
};

const ehandleOnMove = (e) => {
  if (etrack.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(etrack.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;

  const nextPercentageUnconstrained = parseFloat(etrack.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  etrack.dataset.percentage = nextPercentage;

  etrack.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of etrack.getElementsByClassName("e-image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

function preventDefault(e) {
  e.preventDefault();
}

/* -- Event listener Trigers -- */

eSection.onmousedown = (e) => ehandleOnDown(e);

eSection.ontouchstart = (e) => ehandleOnDown(e.touches[0]);

eSection.onmouseup = (e) => ehandleOnUp(e);

eSection.onmouseleave = (e) => eHanfleLeave(e);

eSection.ontouchend = (e) => ehandleOnUp(e.touches[0]);

eSection.onmousemove = (e) => ehandleOnMove(e);

eSection.ontouchmove = (e) => ehandleOnMove(e.touches[0]);
