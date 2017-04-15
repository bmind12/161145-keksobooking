'use strict';

var TYPE_MIN_PRICE = {
  flat: 1000,
  bungalo: 0,
  house: 10000,
};

var form = document.querySelector('.notice__form');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var timeIn = form.querySelector('#time');
var timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
});

timeOut.addEventListener('change', function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
});

type.addEventListener('change', function () {
  var minPrice = TYPE_MIN_PRICE[type.value];
  price.setAttribute('min', minPrice);
});

roomNumber.addEventListener('change', function () {
  var rooms = Number(roomNumber.options[roomNumber.selectedIndex].value);
  var noGuestsIndex = 1;
  var forGuestsIndex = 0;
  if (rooms === 1) {
    capacity.options.selectedIndex = noGuestsIndex;
  } else {
    capacity.options.selectedIndex = forGuestsIndex;
  }
});

form.addEventListener('invalid', function (evt) {
  evt.target.classList.add('invalid-input');
}, true);

form.addEventListener('change', function (evt) {
  var element = evt.target;
  if (element.validity.valid && element.classList.contains('invalid-input')) {
    element.classList.remove('invalid-input');
  }
});
