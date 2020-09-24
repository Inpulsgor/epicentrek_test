import Glide from '@glidejs/glide';
import '../../scss/components/card.scss';
import '../../scss/components/sideBar.scss';

const addButton = document.querySelector('.add-button');
const sideBar = document.querySelector('.side-bar');

addButton.addEventListener('click', toggleBurger);

function toggleBurger(e) {
  e.preventDefault();
  e.stopPropagation();
  if (!e.currentTarget) return;
  if (e.currentTarget) {
    addButton.classList.toggle('is-active');
    sideBar.classList.toggle('expanded');
  }
}

function getSlider() {
  const sliders = document.querySelectorAll('.glide');

  for (let i = 0; i < sliders.length; i += 1) {
    const glide = new Glide(sliders[i], {
      type: 'carousel',
      perView: 4,
      dots: '#dots',
      autoplay: 6000,
      breakpoints: {
        1279: {
          gap: 26,
          perView: 2,
        },
        767: {
          gap: 30,
          perView: 1,
        },
      },
    });
    glide.mount();
  }
}
