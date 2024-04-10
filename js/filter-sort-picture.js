import { addPictures, clearPictureContainer } from './picture-render.js';
import { getRandomInteger, debounce } from './utils.js';
import { imgSortFilters } from './dom-constants.js';

const RENDER_DELAY = 500;
const MIN_INTEGER_VALUE = 0;
const MAX_INTEGER_VALUE = 100;
const RANDOM_FILTER_BEGIN_SLICE = 0;
const RANDOM_FILTER_SLICE_VALUE = 10;
const ButtonsId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const debounceWrapper = debounce((pictures) => {
  clearPictureContainer();
  addPictures(pictures);
}, RENDER_DELAY);

const getCommentsValue = (picture) => {
  const commentsValue = picture.comments.length;
  return commentsValue;
};

const compareComments = (commentsValueA, commentsValueB) => {
  const rankA = getCommentsValue(commentsValueA);
  const rankB = getCommentsValue(commentsValueB);
  return rankB - rankA;
};

const randomSorting = () => {
  const ARandom = getRandomInteger(MIN_INTEGER_VALUE, MAX_INTEGER_VALUE);
  const BRandom = getRandomInteger(MIN_INTEGER_VALUE, MAX_INTEGER_VALUE);
  if (ARandom > BRandom) {
    return 1;
  }
  if (ARandom < BRandom) {
    return -1;
  }
  return 0;
};

const toggleActiveButton = (currentButton) => {
  imgSortFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  currentButton.classList.add('img-filters__button--active');
};

const addFiltersButtons = () => {
  imgSortFilters.classList.remove('img-filters--inactive');
  imgSortFilters.classList.remove('visually-hidden');
};

const registerFilterEvent = (pictures) => {
  addPictures(pictures);
  imgSortFilters.querySelectorAll('.img-filters__button').forEach((item) => {
    item.addEventListener('click', () => {
      toggleActiveButton(item);
      switch (item.getAttribute('id')) {
        case ButtonsId.DEFAULT:
          debounceWrapper(pictures);
          break;

        case ButtonsId.RANDOM:
          debounceWrapper(pictures.slice().sort(randomSorting).slice(RANDOM_FILTER_BEGIN_SLICE, RANDOM_FILTER_SLICE_VALUE));
          break;

        case ButtonsId.DISCUSSED:
          debounceWrapper(pictures.slice().sort(compareComments));
          break;

        default:
          throw new Error('Такого фильтра не существует.');
      }
    });
  });
  addFiltersButtons();
};

export {registerFilterEvent};
