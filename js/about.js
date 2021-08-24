////////////////////////////////////////////////////////////////
//////////// Increment Counter
////////////////////////////////////////////////////////////////
const counters = document.querySelectorAll('.counter-count');
const counterContainer = document.querySelector('.counters');
let counterObserver, counterObserverC;

const increment = function (entries) {
  const [entry] = entries;
  let num = entry.target.innerText;
  if (entry.isIntersecting) {
    entry.target.innerText = '0';

    const updateCounter = () => {
      const target = +entry.target.getAttribute('data-target');
      const c = +entry.target.innerText;

      const increment = target / 100;

      if (c < target) {
        entry.target.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 20);
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
      counter.innerHTML = '0';

      const updateCounterC = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;

        const increment = target / 100;

        if (c < target) {
          counter.innerText = `${Math.ceil(c + increment)}`;
          setTimeout(updateCounterC, 15);
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
      counter.innerHTML = '0';
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
