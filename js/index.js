const hourEl = document.querySelector(".hour");
console.log("1");
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
setTime();

setInterval(setTime, 60000);
