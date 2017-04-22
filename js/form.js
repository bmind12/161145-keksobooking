'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var apartmentType = form.querySelector('#type');
  var pricePerNight = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var checkinTime = form.querySelector('#time');
  var checkoutTime = form.querySelector('#timeout');

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

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.syncFileds(
    checkinTime,
    checkoutTime,
    ['12', '13', '14'],
    ['12', '13', '14'],
    syncValues
  );

  window.syncFileds(
    checkoutTime,
    checkinTime,
    ['12', '13', '14'],
    ['12', '13', '14'],
    syncValues
  );

  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (pricePerNight.validity.valid && pricePerNight.classList.contains('invalid-input')) {
      pricePerNight.classList.remove('invalid-input');
    }
  };

  window.syncFileds(
    apartmentType,
    pricePerNight,
    ['apartment', 'shack', 'palace'],
    [1000, 0, 10000],
    syncValueWithMin
  );
})();
