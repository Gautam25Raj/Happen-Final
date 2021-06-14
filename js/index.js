let screenSize = window.screen.width;
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
    headerObserver = new IntersectionObserver(fixedNav, {
      root: null,
      threshold: 0.15,
    });

    headerObserver.observe(header);
  }
}

if (screenSize > 700) {
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
const socialBtn = document.querySelector(".social-btn");
const social = document.querySelector(".social__nav");

socialBtn.addEventListener("click", () => {
  social.classList.toggle("social-hidden");
});

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

if (screenSize > 550) {
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.4,
  });

  sections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden-bottom");
  });
}

if (screenSize < 550) {
  const sectionObserverM = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.3,
  });

  sectionsM.forEach((sectionM) => {
    sectionObserverM.observe(sectionM);
    sectionM.classList.add("section--hidden-bottom");
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
//////////// FORM LABEL WAVE ANIMATION
////////////////////////////////////////////////////////////////
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, i) =>
        `<span style="transition-delay:${i * 80}ms">${letter}</span>`
    )
    .join("");
});

////////////////////////////////////////////////////////////////
//////////// Increment Counter
////////////////////////////////////////////////////////////////
const counters = document.querySelectorAll(".counter-count");
const counterContainer = document.querySelector(".counters");
let counterObserver, counterObserverC;

const increment = function (entries) {
  const [entry] = entries;
  let num = entry.target.innerText;
  if (entry.isIntersecting) {
    entry.target.innerText = "0";

    const updateCounter = () => {
      const target = +entry.target.getAttribute("data-target");
      const c = +entry.target.innerText;

      const increment = target / 100;

      if (c < target) {
        entry.target.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 50);
      } else {
        entry.target.innerText = target;
      }
    };
    counterObserver.unobserve(entry.target);
    updateCounter();
  }
};

const incrementC = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    counters.forEach((counter) => {
      counter.innerHTML = "0";

      const updateCounterC = () => {
        const target = +counter.getAttribute("data-target");
        const c = +counter.innerText;

        const increment = target / 100;

        if (c < target) {
          counter.innerText = `${Math.ceil(c + increment)}`;
          setTimeout(updateCounterC, 30);
        } else {
          counter.innerText = target;
        }
      };
      counterObserverC.unobserve(entry.target);
      updateCounterC();
    });
    // entry.target.innerText = "0";
  } else {
    counters.forEach((counter) => {
      counter.innerHTML = "0";
    });
  }
};

if (screenSize < 550) {
  counterObserver = new IntersectionObserver(increment, {
    root: null,
    threshold: 0.2,
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
} else {
  counterObserverC = new IntersectionObserver(incrementC, {
    root: null,
    threshold: 0.2,
  });

  counterObserverC.observe(counterContainer);
}

////////////////////////////////////////////////////////////////
//////////// POP-UP CLOCK JS
////////////////////////////////////////////////////////////////
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");

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

////////////////////////////////////////////////////////////////
//////////// READ MORE BUTTON CLICK
////////////////////////////////////////////////////////////////
const readMoreBtns = document.querySelectorAll(".read-more");

readMoreBtns.forEach((readMore) => {
  readMore.addEventListener("click", comingSoon);
});
