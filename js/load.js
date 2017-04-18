'use strict';

(function () {
  window.load = function (url, onLoad, onError) {

    debugger;
    var xhr = new XMLHttpRequest();

    xhr.responseText = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.responseText);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {

    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
