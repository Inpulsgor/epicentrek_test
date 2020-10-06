import Glide, {
  Controls,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm';

import items from '../../services/ITEMS.json'; // JSON
import ratingMarkup from './templates/rating.hbs';
import imagesTemplate from './templates/images.hbs';
import helpers from '../../services/helpers';
// styles
import '../../scss/components/glide/glide.core.scss';
import '../../scss/components/card.scss';
import '../../scss/components/sidebar.scss';

// ================= VARIABLES =================

let quantity = 1;
const data = items.ITEMS[0]; // JSON data
const priceValue = Number(data.PRICE.slice(1)); // JSON data price
// console.log(data);
const localData = helpers.load('json');
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
const cartIconMainQuantity = document.querySelector('.js-cart-qt');
const cartIconHeading = document.querySelector('.js-heading-cart');
const cartIconHeadingQuantity = document.querySelector('.js-cart-quantity');
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

  cartQuantityMarkup();
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
//! close on button click - temporary not in use!
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

// CART quantity
function cartQuantityMarkup() {
  cartIconHeadingQuantity.classList.add('qt');
  cartIconHeadingQuantity.textContent = quantity;
  cartIconMainQuantity.classList.add('qt');
  cartIconMainQuantity.textContent = quantity;
}

// SIDEBAR header markup
function sidebarHeaderMarkup(localData) {
  console.log(localData);
  const priceValue = Number(data.PRICE.slice(1));
  const name = localData.NAME;
  const lastIndex = name.lastIndexOf(' ');
  const croppedName = name.substring(0, lastIndex);
  const result = quantity * priceValue;

  const template = `  
          <li class="sidebar__body-item">
            <div class="sidebar__body-container">
              <button class="sidebar__body-button_delete"></button>
              <img src=${localData.IMAGES[0]} class="sidebar__body-img"/>
              <p class="sidebar__body-description">${croppedName}</p>
              <span class="sidebar__body-price">₴${priceValue}</span>
              <div class="sidebar__body-counter quantity__counter">
                <input readonly value="01" type="text" min="1" max="99" maxlength="2"
                    class="sidebar__body-input quantity__counter-number js-number">
              </div>
            </div>
          </li>`;

  sidebarPrice.textContent = `₴${result}`;
  sidebarTotal.insertAdjacentText(
    'beforeend',
    quantity > 1
      ? `Subtotal (${quantity} items):`
      : `Subtotal (${quantity} item):`,
  );

  // sidebarList.insertAdjacentHTML('afterbegin', template);
  sidebarList.innerHTML = template;
}
// CARD basket quantity
function cartQuantity(localData) {
  if (localData) {
    cartQuantityMarkup();
    sidebarHeaderMarkup(localData);
  }
}
// CARD details (model, product name, product description) markup
function cardDetailsMarkup(data) {
  const name = data.NAME;
  const lastIndex = name.lastIndexOf(' ');
  const croppedName = name.substring(0, lastIndex);
  const capitalizeWord =
    data.DESCRIPTION.charAt(0).toUpperCase() + data.DESCRIPTION.slice(1);

  const template = `
  <span class="details__model">Model:${data.ID}</span>
  <h3 class="details__name">${croppedName}</h3>
  <p class="details__about">${capitalizeWord}</p>`;

  return details.insertAdjacentHTML('afterbegin', template);
}
// CARD brand logo markup
function cardBrandMarkup(data) {
  const template = `
  <img src="${data.BRAND.LOGO}" class="card-heading__logo">
  `;

  return brand.insertAdjacentHTML('afterbegin', template);
}
// CARD color picker markup
function cardColorMarkup(data) {
  const dataColors = data.MODELS.COLORS;
  const template = dataColors.reduce((acc, color) => {
    return (acc += `<button style="background-color: ${color.COLOR}" class="price__button"></button>`);
  }, '');

  return colors.insertAdjacentHTML('beforeend', template);
}
// CARD rating & reviews markup
function cardRatingMarkup(data) {
  return rating.insertAdjacentHTML('beforeend', ratingMarkup(data));
}
// CARD price markup
function cardPriceMarkup(priceValue) {
  return (price.textContent = `₴${priceValue}`);
}
// CARD slider images markup
function cardSliderImagesMarkup(data) {
  return slides.insertAdjacentHTML('afterbegin', imagesTemplate(data));
}

cartQuantity(localData);
cardDetailsMarkup(data);
cardBrandMarkup(data);
cardColorMarkup(data);
cardRatingMarkup(data);
cardPriceMarkup(priceValue);
cardSliderImagesMarkup(data);

// ================= CARD IMAGES SLIDER =================

new Glide('.glide', {
  type: 'carousel',
  perView: 1,
  autoplay: 3000,
  hoverpause: true,
}).mount({
  Controls,
  Autoplay,
});

// ================= CARD COLOR PICKER =================

// set firs color element selected by default
const defaultSelected = cartColorBtn.childNodes[0].classList.add(
  'price__button_active',
);
// set active color
function setColor(e) {
  if (e.currentTarget === e.target) return;
  const activeLink = e.currentTarget.querySelector('.price__button_active');

  if (activeLink) {
    activeLink.classList.remove('price__button_active');
  }

  e.target.classList.add('price__button_active');
}
