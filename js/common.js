////////////////////////////////////////////////////////////////
//////////// Pre Loader
////////////////////////////////////////////////////////////////
window.addEventListener('load', () => {
  const preload = document.querySelector('.preload');
  preload.classList.add('preload-finish');
});
let screenSize = window.screen.width;
window.addEventListener('resize', windowSizeUpdate);

////////////////////////////////////////////////////////////////
//////////// HAMBURGER MENU
////////////////////////////////////////////////////////////////
const menu = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
const hamburgerMenu = () => {
  const nav = document.querySelector('.navigation__nav');
  nav.classList.toggle('open');
  if (nav.classList.contains('open')) {
    document.querySelector('.overlay').style.display = 'block';
  } else {
    document.querySelector('.overlay').style.display = 'none';
  }
};
menu.addEventListener('click', hamburgerMenu);
overlay.addEventListener('click', hamburgerMenu);

function windowSizeUpdate() {
  screenSize = window.screen.width;
}
