import {SETTING_FILTER_CHROME, SETTING_FILTER_SEPIA, SETTING_FILTER_MARVIN, SETTING_FILTER_PHOBOS, SETTING_FILTER_HEAT} from './filter-settings.js';

const wrapper = document.querySelector('.img-upload__overlay');

const scaleElement = wrapper.querySelector('.img-upload__preview img');
const valueElement = wrapper.querySelector('.scale__control--value');
const buttonMinus = wrapper.querySelector('.scale__control--smaller');
const buttonPlus = wrapper.querySelector('.scale__control--bigger');

const sliderBlockClass = wrapper.querySelector('.img-upload__effect-level');
const sliderElement = wrapper.querySelector('.effect-level__slider');
const sliderEffectLevel = wrapper.querySelector('.effect-level__value');
const filterChrome = wrapper.querySelector('.effects__preview--chrome');
const filterSepia = wrapper.querySelector('.effects__preview--sepia');
const filterMarvin = wrapper.querySelector('.effects__preview--marvin');
const filterPhobos = wrapper.querySelector('.effects__preview--phobos');
const filterHeat = wrapper.querySelector('.effects__preview--heat');
const filterNone = wrapper.querySelector('.effects__preview--none');

let procentScaleValue = 100;
let procentHalf = 0;

const onHandlerButtonPlus = () => {
  if (procentScaleValue === 100) {
    buttonPlus.classList.add('disabled');
  } else {
    procentScaleValue = procentScaleValue + 25;
    procentHalf = procentScaleValue / 100;
    valueElement.value = `${procentScaleValue}%`;
    scaleElement.style.transform = `scale(${procentHalf})`;
    buttonPlus.classList.remove('disabled');
    buttonMinus.classList.remove('disabled');
  }
};

const onHandlerButtonMinus = () => {
  if (procentScaleValue === 25) {
    buttonMinus.classList.add('disabled');
  } else {
    procentScaleValue = procentScaleValue - 25;
    procentHalf = procentScaleValue / 100;
    valueElement.value = `${procentScaleValue}%`;
    scaleElement.style.transform = `scale(${procentHalf})`;
    buttonMinus.classList.remove('disabled');
    buttonPlus.classList.remove('disabled');
  }
};

const registerButtonsEventsScale = () => {
  buttonPlus.classList.add('disabled');
  valueElement.value = `${procentScaleValue}%`;
  scaleElement.style.transform = 'scale(1)';

  buttonMinus.addEventListener('click', onHandlerButtonMinus);

  buttonPlus.addEventListener('click', onHandlerButtonPlus);
};

const removeButtonsScaleEvents = () => {
  buttonMinus.removeEventListener('click', onHandlerButtonMinus);
  buttonPlus.removeEventListener('click', onHandlerButtonPlus);
};

const destroyNoUiSlider = () => {
  sliderElement.noUiSlider.destroy();
};

const createNoUiSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const filterInputHide = () => {
  sliderBlockClass.classList.add('hidden');
};

const filterInputAdd = () => {
  sliderBlockClass.classList.remove('hidden');
};

const onHandlerFilterNone = () => {
  scaleElement.className = 'effects__preview--none';
  filterInputHide();
  scaleElement.style.removeProperty('filter');
};

const onHandlerFilterChrome = () => {
  scaleElement.className = 'effects__preview--chrome';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_CHROME);
};

const onHandlerFilterSepia = () => {
  scaleElement.className = 'effects__preview--sepia';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_SEPIA);
};

const onHandlerFilterMarvin = () => {
  scaleElement.className = 'effects__preview--marvin';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_MARVIN);
};

const onHandlerFilterPhobos = () => {
  scaleElement.className = 'effects__preview--phobos';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_PHOBOS);
};

const onHandlerFilterHeat = () => {
  scaleElement.className = 'effects__preview--heat';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_HEAT);
};

const removeFiltersEvents = () => {

  filterNone.removeEventListener('click', onHandlerFilterNone);

  filterChrome.removeEventListener('click', onHandlerFilterChrome);

  filterSepia.removeEventListener('click', onHandlerFilterSepia);

  filterMarvin.removeEventListener('click', onHandlerFilterMarvin);

  filterPhobos.removeEventListener('click', onHandlerFilterPhobos);

  filterHeat.removeEventListener('click', onHandlerFilterHeat);
};

const registerFilters = () => {
  createNoUiSlider();
  registerButtonsEventsScale();
  filterInputHide();
  scaleElement.classList.add('effects__preview--none');
  sliderElement.noUiSlider.on('update', () => {
    sliderEffectLevel.value = sliderElement.noUiSlider.get();
    if (scaleElement.className === filterChrome.classList[1]) {

      scaleElement.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;

    } else if (scaleElement.className === filterSepia.classList[1]) {

      scaleElement.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;

    } else if (scaleElement.className === filterMarvin.classList[1]) {

      scaleElement.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;

    } else if (scaleElement.className === filterPhobos.classList[1]) {

      scaleElement.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;

    } else if (scaleElement.className === filterHeat.classList[1]) {

      scaleElement.style.filter = `brightness(${sliderElement.noUiSlider.get()})`;

    }
  });

  filterNone.addEventListener('click', onHandlerFilterNone);

  filterChrome.addEventListener('click', onHandlerFilterChrome);

  filterSepia.addEventListener('click', onHandlerFilterSepia);

  filterMarvin.addEventListener('click', onHandlerFilterMarvin);

  filterPhobos.addEventListener('click', onHandlerFilterPhobos);

  filterHeat.addEventListener('click', onHandlerFilterHeat);
};

export {registerFilters, onHandlerFilterNone, removeFiltersEvents, removeButtonsScaleEvents, createNoUiSlider, destroyNoUiSlider};
