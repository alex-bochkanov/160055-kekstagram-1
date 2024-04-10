import {successTemplate, errorTemplate} from './DOM-consts.js';

const ERROR_TIMEOUT_VALUE = 5000;

const successContainer = successTemplate.cloneNode(true);
const errorContainer = errorTemplate.cloneNode(true);

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeSuccessContainer = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', closeSuccessClick);
  document.body.removeChild(successContainer);
};

function closeSuccessClick(e) {
  const container = document.querySelector('.success__inner');
  if (!container.contains(e.target)) {
    closeSuccessContainer();
  }
}

const showSuccess = () => {
  document.body.append(successContainer);
  const successButton = successContainer.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessContainer);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', closeSuccessClick);
};

const onCloseErrorContainer = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onCloseAlertClick);
  document.body.removeChild(errorContainer);
};

function onCloseAlertClick(e) {
  const container = document.querySelector('.error__inner');
  if (!container.contains(e.target)) {
    onCloseErrorContainer();
  }
}

const showAlert = () => {
  document.body.append(errorContainer);
  const errorButton = errorContainer.querySelector('.error__button');
  errorButton.addEventListener('click', onCloseErrorContainer);
  document.addEventListener('click', onCloseAlertClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const picturesDownloadAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('data-error');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#fd4d4c';

  alertContainer.textContent = 'Ошибка загрузки изображений';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_TIMEOUT_VALUE);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && document.body.querySelector('.success')) {
    evt.preventDefault();
    closeSuccessContainer();
  } else if (isEscapeKey(evt) && document.body.querySelector('.error')) {
    evt.preventDefault();
    onCloseErrorContainer();
  }
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, showSuccess, showAlert, picturesDownloadAlert, debounce};
