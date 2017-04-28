'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var housingType = form.querySelector('#type');
  var pricePerNight = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var checkinTime = form.querySelector('#time');
  var checkoutTime = form.querySelector('#timeout');
  var CHECKIN_TIMES = ['12', '13', '14'];
  var CHECKOUT_TIMES = ['12', '13', '14'];
  var HOUSING_TYPRES = ['flat', 'bungalo', 'house'];
  var HOUSING_PRICES = [1000, 0, 10000];

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
    if (element.validity.valid === true &&
      element.classList.contains('invalid-input') === true) {
      element.classList.remove('invalid-input');
    }
  });

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.syncFileds(
      checkinTime,
      checkoutTime,
      CHECKIN_TIMES,
      CHECKOUT_TIMES,
      syncValues
  );

  window.syncFileds(
      checkoutTime,
      checkinTime,
      CHECKOUT_TIMES,
      CHECKIN_TIMES,
      syncValues
  );

  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (pricePerNight.validity.valid === true &&
      pricePerNight.classList.contains('invalid-input') === true) {
      pricePerNight.classList.remove('invalid-input');
    }
  };

  window.syncFileds(
      housingType,
      pricePerNight,
      HOUSING_TYPRES,
      HOUSING_PRICES,
      syncValueWithMin
  );
})();
