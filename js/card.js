'use strict';

window.card = (function () {

  var dialog = document.querySelector('#offer-dialog');
  var dialogClose = document.querySelector('.dialog__close');

  var addDialogListeners = function () {
    document.addEventListener('keydown', onDialogKeydown);
    dialogClose.addEventListener('click', onDialogCloseClick);
    dialogClose.addEventListener('keydown', onDialogCloseKeydown);
  };

  var onDialogCloseClick = function () {
    hideDialog();
  };

  var onDialogCloseKeydown = function (evt) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      hideDialog();
    }
  };

  var onDialogKeydown = function (evt) {
    if (evt.keyCode === window.ESC_KEY_CODE) {
      hideDialog();
    }
  };

  var hideDialog = function () {
    window.pin.diactivateActiveAd();
    document.removeEventListener('keydown', onDialogKeydown);
    dialogClose.removeEventListener('click', onDialogCloseClick);
    dialogClose.removeEventListener('keydown', onDialogCloseKeydown);
    dialog.style.display = 'none';
  };

  var showDialog = function () {
    dialog.style.display = 'block';
  };

  return {
    showDialog: showDialog,
    addDialogListeners: addDialogListeners,
  };
})();
