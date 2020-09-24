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
