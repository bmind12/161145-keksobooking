'use strict';

(function () {
  window.syncFileds = function (field1, field2, values1, values2, callBack) {

    if (values1.length !== values2.length) {
      throw new Error('Length of values of arrays for sync fields should be' +
      ' the same!');
    }

    var hashMap = {};

    values1.forEach(function (it, i) {
      hashMap[it] = values2[i];
    });

    if (typeof callBack === 'function') {
      field1.addEventListener('change', function () {
        callBack(field2, hashMap[field1.value]);
      });
    }
  };
})();
