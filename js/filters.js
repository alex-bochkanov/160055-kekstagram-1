import {SETTING_FILTER_CHROME, SETTING_FILTER_SEPIA, SETTING_FILTER_MARVIN, SETTING_FILTER_PHOBOS, SETTING_FILTER_HEAT} from './filter-settings.js';
import {scaleElement, valueElement, buttonMinus, buttonPlus, sliderBlock, sliderElement, sliderEffectLevel, filterChrome, filterSepia, filterMarvin, filterPhobos, filterHeat, filterNone} from './DOM-consts.js';

const SCALE_STEP_VALUE = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const FULL_PERCENT = 100;

const NoUiSliderParameters = {
  RANGE: {
    MIN: 0,
    MAX: 100,
  },
  START_DEFAULT: 100,
  STEP_DEFAULT: 1,
  CONNECT: 'lower',
};

let procentScaleValue = MAX_SCALE_VALUE;
let procentHalf = 0;

const onHandlerButtonPlus = () => {
  if (procentScaleValue === MAX_SCALE_VALUE) {
    buttonPlus.classList.add('disabled');
  } else {
    procentScaleValue = procentScaleValue + SCALE_STEP_VALUE;
    procentHalf = procentScaleValue / FULL_PERCENT;
    valueElement.value = `${procentScaleValue}%`;
    scaleElement.style.transform = `scale(${procentHalf})`;
    buttonPlus.classList.remove('disabled');
    buttonMinus.classList.remove('disabled');
  }
};

const onHandlerButtonMinus = () => {
  if (procentScaleValue === MIN_SCALE_VALUE) {
    buttonMinus.classList.add('disabled');
  } else {
    procentScaleValue = procentScaleValue - SCALE_STEP_VALUE;
    procentHalf = procentScaleValue / FULL_PERCENT;
    valueElement.value = `${procentScaleValue}%`;
    scaleElement.style.transform = `scale(${procentHalf})`;
    buttonMinus.classList.remove('disabled');
    buttonPlus.classList.remove('disabled');
  }
};

const registerButtonsEventsScale = () => {
  buttonPlus.classList.add('disabled');
  procentScaleValue = MAX_SCALE_VALUE;
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
      min: NoUiSliderParameters.RANGE.MIN,
      max: NoUiSliderParameters.RANGE.MAX,
    },
    start: NoUiSliderParameters.START_DEFAULT,
    step: NoUiSliderParameters.STEP_DEFAULT,
    connect: NoUiSliderParameters.CONNECT,
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
  sliderBlock.classList.add('hidden');
};

const filterInputAdd = () => {
  sliderBlock.classList.remove('hidden');
};

const onHandlerFilterNone = () => {
  scaleElement.className = 'effect-none';
  filterInputHide();
  scaleElement.style.removeProperty('filter');
};

const onHandlerFilterChrome = () => {
  scaleElement.className = 'effect-chrome';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_CHROME);
};

const onHandlerFilterSepia = () => {
  scaleElement.className = 'effect-sepia';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_SEPIA);
};

const onHandlerFilterMarvin = () => {
  scaleElement.className = 'effect-marvin';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_MARVIN);
};

const onHandlerFilterPhobos = () => {
  scaleElement.className = 'effect-phobos';
  filterInputAdd();
  sliderElement.noUiSlider.updateOptions(SETTING_FILTER_PHOBOS);
};

const onHandlerFilterHeat = () => {
  scaleElement.className = 'effect-heat';
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
    if (scaleElement.className === filterChrome.id) {

      scaleElement.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;

    } else if (scaleElement.className === filterSepia.id) {

      scaleElement.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;

    } else if (scaleElement.className === filterMarvin.id) {

      scaleElement.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;

    } else if (scaleElement.className === filterPhobos.id) {

      scaleElement.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;

    } else if (scaleElement.className === filterHeat.id) {

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
