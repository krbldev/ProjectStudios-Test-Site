const images = [
  {
    src: "../Images/minimalist-city-sunset-buildings-uhdpaper.com-4K-8.1390-wp.thumbnail.jpg",
    title: "Project CT",
    description: "Still being worked on. Only scenery has been finished so far and nothing much more. If you want to see what's currently being worked on for this game please check TheSandbox.",
    link: "https://www.roblox.com/games/112654210711727/Project-CT"
  },
  {
    src: "../Images/TheSandboxBanner.png",
    title: "TheSandbox",
    description: "Hello! Welcome to TheSandbox where us ProjectStudios Developers experiment with some new things for upcoming games.",
    link: "https://www.roblox.com/games/14540051033/TheSandbox"
  },
//  {
//    src: "../Images/SecretPlaceholderThingy.png",
//    title: "Placeholder",
//    description: "Placeholder",
//    link: "#"
//  },
//  {
//    src: "../Images/SecretPlaceholderThingy.png",
//    title: "Placeholder",
//    description: "Placeholder",
//    link: "#"
//  }
];

let currentIndex = 0;
const previewStrip = document.getElementById("previewStrip");
const body = document.body;
const titleEl = document.getElementById("imageTitle");
const descEl = document.getElementById("imageDescription");

const playNowBtn = document.getElementById("playNowBtn");

function updateBackground() {
  const { src, title, description, link } = images[currentIndex];
  body.style.backgroundImage = `url(${src})`;
  titleEl.textContent = title;
  descEl.textContent = description;
  playNowBtn.href = link;
}


function updatePreview() {
  previewStrip.innerHTML = '';
  images.forEach((img, i) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.classList.add('thumb');
    if (i === currentIndex) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      currentIndex = i;
      updateBackground();
      updatePreview();
    });
    previewStrip.appendChild(thumb);
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateBackground();
  updatePreview();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateBackground();
  updatePreview();
});

updateBackground();
updatePreview();
