'use strict';

(function () {
  window.load = function (url, onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(JSON.parse(xhr.responseText));
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел обработаться.');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };
})();
