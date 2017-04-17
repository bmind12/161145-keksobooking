'use strict';

(function () {
  window.syncFileds = function (field1, field2, values1, values2, callBack) {

    if (values1.length !== values2.length) {
      throw new Error('Length of values of arrays for sync fields should be' +
      ' the same!');
    }

    var hashMap = {};

    for (var i = 0; i < values1.length; i++) {
      hashMap[values1[i]] = values2[i];
    }

    if (typeof callBack === 'function') {
      field1.addEventListener('change', function () {
        callBack(field2, hashMap[field1.value]);
      });
    }
  };
})();
