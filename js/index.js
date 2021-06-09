////////////////////////////////////////////////////////////////
//////////// FIXED NAVIGATION BAR AND SOCIAL BAR
////////////////////////////////////////////////////////////////

// const hamburgerMenu = document.querySelector(".hamburger__menu");
// const navigationItem = document.querySelectorAll(".navigation__item");

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
//////////// START YOUR JOURNEY BUTTON CLICK
////////////////////////////////////////////////////////////////

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
  if (window.screen.width < 550) {
    maxArrowClickable = 3;
  } else {
    maxArrowClickable = 1;
  }
  serviceGridContainer.style.transform = `translateX(0%)`;
}

window.addEventListener("resize", windowSizeUpdate);
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
