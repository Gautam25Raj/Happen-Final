let screenSize = window.screen.availWidth;
window.addEventListener("resize", windowSizeUpdate);

////////////////////////////////////////////////////////////////
//////////// FIXED NAVIGATION BAR AND SOCIAL BAR TRIGGER
////////////////////////////////////////////////////////////////
const header = document.querySelector("header");
const footer = document.querySelector("footer");

function removeNav() {
  document.querySelector(".navigation").classList.remove("sticky");
  document.querySelector(".social").classList.remove("active");
}

const fixedNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.querySelector(".navigation").classList.add("sticky");
    document.querySelector(".social").classList.add("active");
  } else {
    removeNav();
  }
};

function remove(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    removeNav();
  } else {
    fixedNav();
  }
}

if (screenSize > 700) {
  const headerObserver = new IntersectionObserver(fixedNav, {
    root: null,
    threshold: 0.15,
  });

  headerObserver.observe(header);

  const footerObserver = new IntersectionObserver(remove, {
    root: null,
    threshold: 0.1,
  });

  footerObserver.observe(footer);
}

////////////////////////////////////////////////////////////////
//////////// HAMBURGER MENU CLICK
////////////////////////////////////////////////////////////////
function responsiveNav() {
  const hamburgerNav = document.querySelectorAll(".hamburger");
  hamburgerNav.forEach((item) => {
    item.classList.toggle("open");
  });
}

document
  .querySelector(".hamburger__menu")
  .addEventListener("click", responsiveNav);

document.querySelectorAll(".navigation__item").forEach((item) => {
  item.addEventListener("click", responsiveNav);
});

////////////////////////////////////////////////////////////////
//////////// SOCIAL BAR CLOSE OPEN BUTTON
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//////////// SECTION TRIGGER
////////////////////////////////////////////////////////////////
const sections = document.querySelectorAll(".section");
const sectionsM = document.querySelectorAll(".section-m");

const revealSection = function (entries, oberserver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden-bottom");
  oberserver.unobserve(entry.target);
};

const revealSectionM = function (entries1, oberserver1) {
  const [entry1] = entries1;

  if (!entry1.isIntersecting) return;

  if (entry1.target.classList.contains("section--hidden-right")) {
    entry1.target.classList.remove("section--hidden-right");
  } else {
    entry1.target.classList.remove("section--hidden-l");
  }
  oberserver1.unobserve(entry.target);
};

// if (screenSize > 700) {
//   const sectionObserver = new IntersectionObserver(revealSection, {
//     root: null,
//     threshold: 0.4,
//   });

//   sections.forEach((section) => {
//     sectionObserver.observe(section);
//     section.classList.add("section--hidden-bottom");
//   });
// };

if (screenSize < 700) {
  const sectionObserverM = new IntersectionObserver(revealSectionM, {
    root: null,
    threshold: 0.25,
  });
  sectionsM.forEach((sectionM, i) => {
    sectionObserverM.observe(sectionM);
    if (i % 2 == 0) {
      sectionM.classList.add("section--hidden-l");
    } else {
      sectionM.classList.add("section--hidden-right");
    }
  });
}

////////////////////////////////////////////////////////////////
//////////// SERVICES SLIDER BUTTON CLICK
////////////////////////////////////////////////////////////////
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const serviceGridContainer = document.querySelector(".grid-container");
let maxArrowClickable = null;
let arrowClicked = 0;
let rightClicked = null;

function windowSizeUpdate() {
  screenSize = window.screen.width;

  if (screenSize < 550) {
    maxArrowClickable = 3;
  } else {
    maxArrowClickable = 1;
  }

  serviceGridContainer.style.transform = `translateX(0%)`;
}
windowSizeUpdate();

arrowRight.addEventListener("click", () => {
  rightClicked = true;
  serviceSlider();
});

arrowLeft.addEventListener("click", () => {
  rightClicked = false;
  serviceSlider();
});

function serviceSlider() {
  if (rightClicked) {
    arrowClicked++;
    if (arrowClicked > maxArrowClickable) {
      arrowClicked = 0;
    }
  } else {
    arrowClicked--;
    if (arrowClicked < 0) {
      arrowClicked = maxArrowClickable;
    }
  }
  serviceGridContainer.style.transform = `translateX(${arrowClicked * -110}%)`;
}
////////////////////////////////////////////////////////////////
//////////// TESTIMONIAL SLIDER BUTTON CLICK
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//////////// READ MORE BUTTON CLICK
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//////////// POP-UP CLOCK JS
////////////////////////////////////////////////////////////////
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const readMoreBtns = document.querySelectorAll(".read-more");

function setTime() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    hours,
    0,
    12,
    0,
    360
  )}deg)`;

  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    60,
    0,
    360
  )}deg)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function comingSoon() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  });

  document.querySelector(".cross").addEventListener("click", () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  });

  setTime();
  setInterval(setTime, 60000);
}

readMoreBtns.forEach((readMore) => {
  readMore.addEventListener("click", comingSoon);
});
