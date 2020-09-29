import Glide, {
  Controls,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm';

import items from '../../services/ITEMS.json';
import ratingMarkup from './templates/rating.hbs';
import imagesTemplate from './templates/images.hbs';
import helpers from '../../services/helpers';
// styles
import '../../scss/glide/glide.core.scss';
import '../../scss/components/card.scss';
import '../../scss/components/sidebar.scss';

// ================= VARIABLES =================

const data = items.ITEMS[0]; // JSON data
const dataImages = items.ITEMS[0]; // JSON images array
const dataColors = items.ITEMS[0].MODELS.COLORS; // JSON colors array
const priceValue = Number(data.PRICE.slice(1)); // JSON price
const capitalizeWord =
  data.DESCRIPTION.charAt(0).toUpperCase() + data.DESCRIPTION.slice(1); // JSON description

let quantity = 1;
let cropped = data.NAME;
let lastIndex = cropped.lastIndexOf(' ');
cropped = cropped.substring(0, lastIndex);

// console.log(data);
console.log(dataImages);
// ================= REFERENCES =================

// side bar
const overlay = document.querySelector('.js-overlay');
const sidebarList = document.querySelector('.js-sidebar-list');
const sidebarPrice = document.querySelector('.js-sidebar-subtotal');
const sidebarTotal = document.querySelector('.js-sidebar-price');
const sidebar = document.querySelector('.js-sidebar');

// cart
const increment = document.querySelector("[data-action='increment']");
const decrement = document.querySelector("[data-action='decrement']");
const brand = document.querySelector('.js-brand');
const details = document.querySelector('.js-details');
const rating = document.querySelector('.js-rating'); // before end only!
const counter = document.querySelector('.js-number');
const price = document.querySelector('.js-amount');
const colors = document.querySelector('.js-colors');
const slides = document.querySelector('.js-slides');
const cartColorBtn = document.querySelector('.price__buttons');
const cartIconMain = document.querySelector('.js-cart-icon');
const cartIconHeading = document.querySelector('.js-heading-cart');
const cartAddToBtn = document.querySelector('.js-btn-add');

// ================= LISTENERS =================

addListener();
// add listener
function addListener() {
  // counter.addEventListener('input', getInputValue);
  colors.addEventListener('click', setColor);
  cartAddToBtn.addEventListener('click', pressAddBtn);
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
// add button
function pressAddBtn() {
  helpers.save('json', data);
  window.addEventListener('keydown', closeByPressEsc);

  sidebarHeaderMarkup();
  sidebar.classList.add('expanded');
  overlay.classList.add('overlay');
}

// ================= OPEN/CLOSE CART =================
// open cart
function headingCart(e) {
  e.stopPropagation();

  if (!e.currentTarget) return;
  if (e.currentTarget) {
    sidebar.classList.add('expanded');
    overlay.classList.add('overlay');
    window.addEventListener('keydown', closeByPressEsc);
  }
}
// open cart
function openCart(e) {
  e.stopPropagation();

  if (!e.currentTarget) return;
  if (e.currentTarget) {
    sidebar.classList.add('expanded');
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
    window.removeEventListener('keydown', closeByPressEsc);
  }
}
//! close on close button - temporary not in use!
function closeOnButtonClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    removeClass();
    removeListener();
  }
}
// remove active class
function removeClass() {
  sidebar.classList.remove('expanded');
  overlay.classList.remove('overlay');
}
// ================= QUANTITY/PRICE =================
// increase quantity +1
function increase() {
  if (quantity >= 99) {
    return;
  }
  quantity += 1;

  if (quantity < 10) {
    counter.setAttribute('value', `0${quantity}`);
  } else {
    counter.setAttribute('value', quantity);
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
    counter.setAttribute('value', `0${quantity}`);
  } else {
    counter.setAttribute('value', quantity);
  }
  quantityPrice();
}
// price per quantity
function quantityPrice() {
  const result = quantity * priceValue;
  // const rounded = result.toFixed(2);
  price.textContent = `₴${result}`;
  // counter.textContent = quantity;
}
//! counter input value - temporary not in use!
function getInputValue(e) {
  console.log('input event!');
  if (isNaN(e.currentTarget.value)) {
    return;
  }
  quantity = Number(e.currentTarget.value);
  counter.setAttribute('value', `0${quantity}`);
  quantityPrice();
}
// ================= MARKUP =================

// SIDEBAR header markup
function sidebarHeaderMarkup() {
  const result = quantity * priceValue;

  sidebarPrice.textContent = `₴${result}`;
  sidebarTotal.textContent =
    quantity > 1
      ? `Subtotal (${quantity} items):`
      : `Subtotal (${quantity} item):`;
  sidebarList.innerHTML = `  
          <li class="sidebar__body-item">
            <div class="sidebar__body-container">
              <button class="sidebar__body-button_delete"></button>
              <img  class="sidebar__body-img"/>
              <p class="sidebar__body-description"></p>
              <span class="sidebar__body-price"></span>
              <div class="sidebar__body-counter quantity__counter">
                <input readonly value="01" type="text" min="1" max="99" maxlength="2"
                    class="sidebar__body-input quantity__counter-number js-number">
              </div>
            </div>
          </li>`;
}
// CARD details (model, product name, product description) markup
function cardDetailsMarkup() {
  const template = `
  <span class="details__model">Model:${data.ID}</span>
  <h3 class="details__name">${cropped}</h3>
  <p class="details__about">${capitalizeWord}</p>`;
  return (details.innerHTML = template);
}
// CARD brand logo markup
function cardBrandMarkup() {
  const template = `
  <img src="${data.BRAND.LOGO}" class="card-heading__logo">
  `;
  return (brand.innerHTML = template);
}
// CARD color picker markup
function cardColorMarkup() {
  const res = dataColors.reduce((acc, color) => {
    return (acc += `<button style="background-color: ${color.COLOR}" class="price__button"></button>`);
  }, '');
  return colors.insertAdjacentHTML('beforeend', res);
}
// CARD rating & reviews markup
function cardRatingMarkup() {
  return rating.insertAdjacentHTML('beforeend', ratingMarkup(data));
}
// CARD price markup
function cardPriceMarkup() {
  return (price.textContent = `₴${priceValue}`);
}
// CARD slider images markup
function cardSliderImagesMarkup() {
  return (slides.innerHTML = imagesTemplate(dataImages));
}

cardDetailsMarkup();
cardBrandMarkup();
cardColorMarkup();
cardRatingMarkup();
cardPriceMarkup();
cardSliderImagesMarkup();

// ================= CARD IMAGES SLIDER =================

new Glide('.glide', {
  type: 'carousel',
  perView: 1,
  autoplay: 3000,
  hoverpause: true,
}).mount({ Controls, Autoplay });

// ================= CARD COLOR PICKER =================

const defaultSelected = cartColorBtn.childNodes[0].classList.add(
  'price__button_active',
);

function setColor(e) {
  if (e.currentTarget === e.target) return;
  const activeLink = e.currentTarget.querySelector('.price__button_active');

  if (activeLink) {
    activeLink.classList.remove('price__button_active');
  }

  e.target.classList.add('price__button_active');
}
