import Glide from '@glidejs/glide';

import '../../scss/components/card.scss';
import '../../scss/components/sidebar.scss';

// ================= QUERY SELECTOR =================
// side bar
const addToCartBtn = document.querySelector('.js-btn-add');
const sideBar = document.querySelector('.js-cart');
const overlay = document.querySelector('.js-overlay');
// quantity
const counter = document.querySelector('.js-number');
const price = document.querySelector('.js-amount');
const increment = document.querySelector("[data-action='increment']");
const decrement = document.querySelector("[data-action='decrement']");

// ================= ADD/REMOVE LISTENER =================
// add listener
function addListener() {
  addToCartBtn.addEventListener('click', openCart);
  overlay.addEventListener('click', closeCart);
  increment.addEventListener('click', increase);
  decrement.addEventListener('click', decrease);
}
addListener();
// remove listener
function removeListener() {
  addToCartBtn.removeEventListener('click', openCart);
  overlay.removeEventListener('click', closeCart);
  window.removeEventListener('keydown', closeByPressEsc);
}
// ================= OPEN/CLOSE CART =================
// open cart
function openCart(e) {
  e.preventDefault();
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
// close on close button
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
let quantity = 1;
let amount = 499.95;

// increase quantity +1
function increase() {
  quantity += 1;
  counter.textContent = quantity;
  quantityPrice();
}
// decrease quantity -1
function decrease() {
  if (quantity <= 1) {
    return;
  }
  quantity -= 1;
  counter.textContent = quantity;
  quantityPrice();
}
// price per quantity
function quantityPrice() {
  const result = quantity * amount;
  price.innerHTML = `$${result}`;
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
