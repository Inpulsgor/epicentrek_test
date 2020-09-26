// import Glide from '@glidejs/glide';
import Glide, {
  Controls,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm';

import items from '../../services/ITEMS.json';
import ratingMarkup from './templates/rating.hbs';
import imagesTemplate from './templates/images.hbs';
import colorsMarkup from './templates/colors.hbs'; //!
// import detailsMarkup from './templates/details.hbs';
import helpers from '../../services/helpers';

import '../../scss/glide/glide.core.scss';
import '../../scss/components/card.scss';
import '../../scss/components/sidebar.scss';

let quantity = 1;
// json data
const data = items.ITEMS[0];
const dataImages = items.ITEMS[0];
const dataColors = items.ITEMS[0].MODELS.COLORS;
const priceValue = Number(data.PRICE.slice(1));

console.log(dataColors);
console.log(data);
// ================= QUERY SELECTOR =================
// side bar
const slides = document.querySelector('.js-slides');
const brand = document.querySelector('.js-brand');
const cartIconMain = document.querySelector('.js-cart-icon');
const cartIconHeading = document.querySelector('.js-heading-cart');
const addToCartBtn = document.querySelector('.js-btn-add'); //! not used
const sidebarUl = document.querySelector('.sidebar__list'); //! not used
const sideBar = document.querySelector('.js-sidebar');
const overlay = document.querySelector('.js-overlay');
// quantity
const counter = document.querySelector('.js-number');
const amount = document.querySelector('.js-amount');
const amountSidebar = document.querySelector('.js-amount-sidebar');
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

function brandMarkup() {
  return `
      <img src="${data.BRAND.LOGO}" class="card-heading__logo">
  `;
}

function colorBtnsMarkup() {
  dataColors.map(color => console.log(color));
  return `<button class="price__button"></button>`;
}
colorBtnsMarkup();

// ----------------- render -----------------
// colors
// colors.innerHTML = colorsMarkup(dataColors);
// slide images
slides.innerHTML = imagesTemplate(dataImages);
// brandName
brand.innerHTML = brandMarkup();
// details
details.innerHTML = detailsMarkup();
// price
price.innerHTML = `₴ ${priceValue}`;
amountSidebar.innerHTML = `₴ ${priceValue}`;
// rating
rating.insertAdjacentHTML('beforeend', ratingMarkup(data));

// ================= SLIDER =================
new Glide('.glide', {
  type: 'carousel',
  perView: 1,
  autoplay: 3000,
  hoverpause: true,
}).mount({ Controls, Autoplay });

{
  /* <button class="price__button"></button>
<button class="price__button"></button> */
}
