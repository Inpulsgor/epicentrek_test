// import Glide from '@glidejs/glide';

import items from '../../services/ITEMS.json';
import ratingMarkup from './templates/rating.hbs';
import colorsMarkup from './templates/colors.hbs'; //!
// import detailsMarkup from './templates/details.hbs';
// import helpers from '../../services/helpers';

import '../../scss/components/card.scss';
import '../../scss/components/sidebar.scss';
import helpers from '../../services/helpers';

// json data
const data = items.ITEMS[0];
console.log(data);

let quantity = 1;
let priceValue = Number(data.PRICE.slice(1));
// ================= QUERY SELECTOR =================
// side bar
const cartIconMain = document.querySelector('.js-cart-icon');
const cartIconHeading = document.querySelector('.js-heading-cart');
const addToCartBtn = document.querySelector('.js-btn-add'); //! not used
const sidebarUl = document.querySelector('.sidebar__list'); //! not used
const sideBar = document.querySelector('.js-sidebar');
const overlay = document.querySelector('.js-overlay');
// quantity
const counter = document.querySelector('.js-number');
const amount = document.querySelector('.js-amount');
const increment = document.querySelector("[data-action='increment']");
const decrement = document.querySelector("[data-action='decrement']");
// markup
const details = document.querySelector('.js-details');
const rating = document.querySelector('.js-rating'); // before end
const colors = document.querySelector('.js-colors'); //! not used
const price = document.querySelector('.js-amount');

// ================= ADD/REMOVE LISTENER =================
// add listener
addListener();
function addListener() {
  addToCartBtn.addEventListener('click', pressAddBtn);
  cartIconHeading.addEventListener('click', headingCart);
  cartIconMain.addEventListener('click', openCart);
  overlay.addEventListener('click', closeCart);
  increment.addEventListener('click', increase);
  decrement.addEventListener('click', decrease);
}
// remove listener
function removeListener() {
  cartIconMain.removeEventListener('click', openCart);
  overlay.removeEventListener('click', closeCart);
  window.removeEventListener('keydown', closeByPressEsc);
}
// ================= ADD TO CART BUTTON =================
//! add button
function pressAddBtn() {
  helpers.save('json', data);
}

// ================= OPEN/CLOSE CART =================
// open cart
function headingCart(e) {
  e.stopPropagation();

  if (!e.currentTarget) return;
  if (e.currentTarget) {
    sideBar.classList.add('expanded');
    overlay.classList.add('overlay');
    window.addEventListener('keydown', closeByPressEsc);
  }
}
// open cart
function openCart(e) {
  e.stopPropagation();

  if (!e.currentTarget) return;
  if (e.currentTarget) {
    sideBar.classList.add('expanded');
    overlay.classList.add('overlay');
    window.addEventListener('keydown', closeByPressEsc);
  }
}
// close on clicking overlay
function closeCart(e) {
  if (e.target === e.currentTarget) {
    removeClass();
  }
}
// close on press Escape
function closeByPressEsc(e) {
  if (e.code === 'Escape') {
    removeClass();
  }
}
//! close on close button
function closeOnButtonClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    removeClass();
    removeListener();
  }
}
// remove active class
function removeClass() {
  sideBar.classList.remove('expanded');
  overlay.classList.remove('overlay');
}

// ================= QUANTITY/PRICE =================
// increase quantity +1
function increase() {
  quantity += 1;
  if (quantity < 10) {
    counter.innerHTML = `0${quantity}`;
  } else {
    counter.innerHTML = quantity;
  }
  quantityPrice();
}
// decrease quantity -1
function decrease() {
  if (quantity <= 1) {
    return;
  }

  quantity -= 1;
  if (quantity < 10) {
    counter.innerHTML = `0${quantity}`;
  } else {
    counter.innerHTML = quantity;
  }
  quantityPrice();
}
// price per quantity
function quantityPrice() {
  const result = quantity * priceValue;
  // const rounded = result.toFixed(2);
  amount.innerHTML = `₴${result}`;
}

// ================= SLIDER =================
// function getSlider() {
//   const sliders = document.querySelectorAll('.glide');

//   for (let i = 0; i < sliders.length; i += 1) {
//     const glide = new Glide(sliders[i], {
//       type: 'carousel',
//       perView: 4,
//       dots: '#dots',
//       autoplay: 6000,
//       breakpoints: {
//         1279: {
//           gap: 26,
//           perView: 2,
//         },
//         767: {
//           gap: 30,
//           perView: 1,
//         },
//       },
//     });
//     glide.mount();
//   }
// }

// ================= MARKUP =================

const capitalizeWord =
  data.DESCRIPTION.charAt(0).toUpperCase() + data.DESCRIPTION.slice(1);

let cropped = data.NAME;
let lastIndex = cropped.lastIndexOf(' ');
cropped = cropped.substring(0, lastIndex);

function detailsMarkup() {
  return `
    <span class="details__model">Model:${data.ID}</span>
    <h3 class="details__name">${cropped}</h3>
    <p class="details__about">${capitalizeWord}</p>`;
}
// details
details.innerHTML = detailsMarkup();
// price
price.innerHTML = `₴ ${priceValue}`;
// rating
rating.insertAdjacentHTML('beforeend', ratingMarkup(data));
