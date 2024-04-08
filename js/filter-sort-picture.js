import { addPictures, clearPictureContainer } from './picture-render.js';
import { getRandomInteger, debounce } from './utils.js';

const RENDER_DELAY = 500;

const BUTTONS_ID = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const imgSortFilters = document.querySelector('.img-filters');

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
  const ARandom = getRandomInteger(0, 100);
  const BRandom = getRandomInteger(0, 100);
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

const debounceWrapper = debounce(addPictures, RENDER_DELAY);

const registerFilterEvent = (pictures) => {
  addPictures(pictures);
  imgSortFilters.querySelectorAll('.img-filters__button').forEach((item) => {
    item.addEventListener('click', () => {
      toggleActiveButton(item);
      clearPictureContainer();
      switch (item.getAttribute('id')) {
        case BUTTONS_ID.default:
          debounceWrapper(pictures);
          break;

        case BUTTONS_ID.random:
          debounceWrapper(pictures.slice().sort(randomSorting).slice(0, 10));
          break;

        case BUTTONS_ID.discussed:
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
