const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".work");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const choice = button.dataset.filter;

    buttons.forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");

    cards.forEach(function (card) {
      if (choice === "all" || card.dataset.cat === choice) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const slider = document.getElementById("slider");
const compare = document.getElementById("compare");

slider.addEventListener("input", function () {
  compare.style.setProperty("--pos", slider.value + "%");
});

const packageSelect = document.getElementById("package");
const videosInput = document.getElementById("videos");
const addons = document.querySelectorAll(".addon");
const totalText = document.getElementById("total");

function updateTotal() {
  let price = Number(packageSelect.value);

  addons.forEach(function (addon) {
    if (addon.checked) {
      price = price + Number(addon.value);
    }
  });

  let videos = Number(videosInput.value);
  if (videos < 1) {
    videos = 1;
  }

  totalText.textContent = "$" + price * videos;
}

packageSelect.addEventListener("change", updateTotal);
videosInput.addEventListener("input", updateTotal);
addons.forEach(function (addon) {
  addon.addEventListener("change", updateTotal);
});

const contactForm = document.getElementById("contact-form");
const successText = document.getElementById("success");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successText.hidden = false;
  contactForm.reset();
});

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  menu.classList.toggle("open");
});

menu.addEventListener("click", function () {
  menu.classList.remove("open");
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

sections.forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

const statNumbers = document.querySelectorAll(".stats h3");

const countObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const goal = parseInt(el.textContent); 
      const suffix = el.textContent.replace(String(goal), ""); 
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / 1400, 1); 
        el.textContent = Math.round(goal * progress) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);

      countObserver.unobserve(el); 
    });
  },
  { threshold: 0.5 },
);

statNumbers.forEach(function (el) {
  countObserver.observe(el);
});

const cookieBanner = document.getElementById("cookie-banner");
const acceptButton = document.getElementById("cookie-accept");
const necessaryButton = document.getElementById("cookie-necessary");

function loadAnalytics() {
  console.log("Analytics yahan load hoga (abhi placeholder hai)");
}

const savedChoice = localStorage.getItem("cookieChoice");

if (savedChoice === null) {
  cookieBanner.hidden = false; 
} else if (savedChoice === "all") {
  loadAnalytics(); 
}

acceptButton.addEventListener("click", function () {
  localStorage.setItem("cookieChoice", "all"); 
  cookieBanner.hidden = true;
  loadAnalytics();
});

necessaryButton.addEventListener("click", function () {
  localStorage.setItem("cookieChoice", "necessary");
  cookieBanner.hidden = true; 
});

const lightbox = document.getElementById("lightbox");
const lightboxFrame = document.getElementById("lightbox-frame");
const lightboxClose = document.getElementById("lightbox-close");
const videoCards = document.querySelectorAll(".work[data-video]");


function openLightbox(videoId) {
  lightboxFrame.src =
    "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxFrame.src = "";
}

videoCards.forEach(function (card) {
  card.addEventListener("click", function () {
    openLightbox(card.dataset.video);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

const barMenuButton = document.getElementById("bar-menu");

barMenuButton.addEventListener("click", function () {
  menu.classList.toggle("open");
});
