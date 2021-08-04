window.addEventListener('load', () => {
    document.querySelector('.preload').classList.add('preload-finish');
});
let screenSize = window.screen.width;
window.addEventListener('resize', windowSizeUpdate);
const header = document.querySelector('header'),
    footer = document.querySelector('footer');
function removeNav() {
    document.querySelector('.navigation').classList.remove('sticky'),
        document.querySelector('.social').classList.remove('active');
}
const fixedNav = function (e) {
    const [t] = e;
    t.isIntersecting
        ? removeNav()
        : (document.querySelector('.navigation').classList.add('sticky'),
          document.querySelector('.social').classList.add('active'));
};
function remove(e) {
    const [t] = e;
    t.isIntersecting
        ? removeNav()
        : ((headerObserver = new IntersectionObserver(fixedNav, {
              root: null,
              threshold: 0.15,
          })),
          headerObserver.observe(header));
}
function responsiveNav() {
    document.querySelectorAll('.hamburger').forEach((e) => {
        e.classList.toggle('open');
    });
}
screenSize > 700 &&
    new IntersectionObserver(remove, { root: null, threshold: 0.1 }).observe(
        footer
    ),
    document
        .querySelector('.hamburger__menu')
        .addEventListener('click', responsiveNav),
    document.querySelectorAll('.navigation__item').forEach((e) => {
        e.addEventListener('click', responsiveNav);
    });
const socialBtn = document.querySelector('.social-btn'),
    social = document.querySelector('.social__nav');
socialBtn.addEventListener('click', () => {
    social.classList.toggle('social-hidden');
});
const sections = document.querySelectorAll('.section'),
    sectionsM = document.querySelectorAll('.section-m'),
    revealSection = function (e, t) {
        const [r] = e;
        r.isIntersecting &&
            (r.target.classList.remove('section--hidden-bottom'),
            t.unobserve(r.target));
    };
if (screenSize > 550) {
    const e = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.4,
    });
    sections.forEach((t) => {
        e.observe(t), t.classList.add('section--hidden-bottom');
    });
}
if (screenSize < 550) {
    const e = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.3,
    });
    sectionsM.forEach((t) => {
        e.observe(t), t.classList.add('section--hidden-bottom');
    });
}
const arrowLeft = document.querySelector('.arrow-left'),
    arrowRight = document.querySelector('.arrow-right'),
    serviceGridContainer = document.querySelector('.grid-container');
let maxArrowClickable = null,
    arrowClicked = 0,
    rightClicked = null;
function windowSizeUpdate() {
    (screenSize = window.screen.width),
        (maxArrowClickable = screenSize < 550 ? 3 : 1),
        (serviceGridContainer.style.transform = 'translateX(0%)');
}
function serviceSlider() {
    rightClicked
        ? ++arrowClicked > maxArrowClickable && (arrowClicked = 0)
        : --arrowClicked < 0 && (arrowClicked = maxArrowClickable),
        (serviceGridContainer.style.transform = `translateX(${
            -110 * arrowClicked
        }%)`);
}
windowSizeUpdate(),
    arrowRight.addEventListener('click', () => {
        (rightClicked = !0), serviceSlider();
    }),
    arrowLeft.addEventListener('click', () => {
        (rightClicked = !1), serviceSlider();
    });
const labels = document.querySelectorAll('.form-control label');
labels.forEach((e) => {
    e.innerHTML = e.innerText
        .split('')
        .map((e, t) => `<span style="transition-delay:${80 * t}ms">${e}</span>`)
        .join('');
});
const counters = document.querySelectorAll('.counter-count'),
    counterContainer = document.querySelector('.counters');
let counterObserver, counterObserverC;
const increment = function (e) {
        const [t] = e;
        if ((t.target.innerText, t.isIntersecting)) {
            t.target.innerText = '0';
            const e = () => {
                const r = +t.target.getAttribute('data-target'),
                    n = +t.target.innerText,
                    o = r / 100;
                n < r
                    ? ((t.target.innerText = `${Math.ceil(n + o)}`),
                      setTimeout(e, 20))
                    : (t.target.innerText = r);
            };
            counterObserver.unobserve(t.target), e();
        }
    },
    incrementC = function (e) {
        const [t] = e;
        t.isIntersecting
            ? counters.forEach((e) => {
                  e.innerHTML = '0';
                  const r = () => {
                      const t = +e.getAttribute('data-target'),
                          n = +e.innerText,
                          o = t / 100;
                      n < t
                          ? ((e.innerText = `${Math.ceil(n + o)}`),
                            setTimeout(r, 15))
                          : (e.innerText = t);
                  };
                  counterObserverC.unobserve(t.target), r();
              })
            : counters.forEach((e) => {
                  e.innerHTML = '0';
              });
    };
screenSize < 550
    ? ((counterObserver = new IntersectionObserver(increment, {
          root: null,
          threshold: 0.2,
      })),
      counters.forEach((e) => {
          counterObserver.observe(e);
      }))
    : (counterObserverC = new IntersectionObserver(incrementC, {
          root: null,
          threshold: 0.2,
      })).observe(counterContainer);
const hourEl = document.querySelector('.hour'),
    minuteEl = document.querySelector('.minute');
function setTime() {
    const e = new Date(),
        t = e.getHours(),
        r = e.getMinutes();
    (hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
        t,
        0,
        12,
        0,
        360
    )}deg)`),
        (minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
            r,
            0,
            60,
            0,
            360
        )}deg)`);
}
const scale = (e, t, r, n, o) => ((e - t) * (o - n)) / (r - t) + n;
function comingSoon() {
    const e = document.querySelector('.modal'),
        t = document.querySelector('.overlay');
    e.classList.remove('hidden'),
        t.classList.remove('hidden'),
        t.addEventListener('click', () => {
            t.classList.add('hidden'), e.classList.add('hidden');
        }),
        document.querySelector('.cross').addEventListener('click', () => {
            t.classList.add('hidden'), e.classList.add('hidden');
        }),
        setTime(),
        setInterval(setTime, 6e4);
}
const readMoreBtns = document.querySelectorAll('.read-more');
readMoreBtns.forEach((e) => {
    e.addEventListener('click', comingSoon);
});
