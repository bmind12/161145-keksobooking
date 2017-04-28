'use strict';

(function () {
  var adsData = [];
  var filter = document.querySelector('.tokyo__filters');
  var type = document.querySelector('#housing_type');
  var priceRange = document.querySelector('#housing_price');
  var roomNumber = document.querySelector('#housing_room-number');
  var guestNumber = document.querySelector('#housing_guests-number');
  var featuresCheckboxes = document.querySelectorAll('#housing_features' +
    ' .feature');
  var typeSelected;
  var priceRangeSelected;
  var roomsSelected;
  var guestsSelected;
  var featuresChecked;
  var PRICE_RANGES = {
    low: [0, 10000],
    middle: [10000, 50000],
    high: [50000, 1000000000]
  };

  var inPriceRange = function (price, range) {
    return (price >= PRICE_RANGES[range][0] && price < PRICE_RANGES[range][1]);
  };

  var hasFilteredFutures = function (features, filtered) {
    for (var i = 0; i < filtered.length; i++) {
      if (features.indexOf(filtered[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var getFeaturesArray = function (checkboxElements) {
    var checkedValues = [];
    checkboxElements.forEach(function (it) {
      if (it.control.checked) {
        checkedValues.push(it.control.value);
      }
    });
    return checkedValues;
  };

  var updateSelectedValues = function () {
    typeSelected = type.value;
    priceRangeSelected = priceRange.value;
    roomsSelected = roomNumber.value;
    guestsSelected = guestNumber.value;
    featuresChecked = getFeaturesArray(featuresCheckboxes);
  };

  var isAnyOrEqual = function (value, comparable) {
    if (isNaN(value)) {
      return (value === 'any' || value === comparable);
    }
    return (Number(value) === comparable);
  };

  var filterAds = function (it) {
    if (isAnyOrEqual(typeSelected, it.offer.type)) {
      return false;
    }
    if (inPriceRange(it.offer.price, priceRangeSelected)) {
      return false;
    }
    if (isAnyOrEqual(roomsSelected, it.offer.rooms)) {
      return false;
    }
    if (isAnyOrEqual(guestsSelected, it.offer.guests)) {
      return false;
    }
    if (featuresChecked.length !== 0) {
      if (hasFilteredFutures(it.offer.features, featuresChecked)) {
        return false;
      }
    }
    return true;
  };

  var updateFilters = function () {
    updateSelectedValues();
    window.pin.renderAds(adsData.filter(filterAds));
  };

  filter.addEventListener('change', function () {
    window.debounce(updateFilters);
  });

  var onLoadSuccess = function (data) {
    adsData = data;
  };

  window.load(window.pin.URL, onLoadSuccess, window.pin.onLoadError);
})();
