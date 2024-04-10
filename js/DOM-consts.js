//all
const bodyElement = document.querySelector('body');
const pictureUploadForm = bodyElement.querySelector('.img-upload__form');
const pictureFilterModal = pictureUploadForm.querySelector('.img-upload__overlay');
const scaleElement = pictureFilterModal.querySelector('.img-upload__preview img');

//filter-sort-picture.js
const imgSortFilters = bodyElement.querySelector('.img-filters');

//filters.js
const valueElement = pictureFilterModal.querySelector('.scale__control--value');
const buttonMinus = pictureFilterModal.querySelector('.scale__control--smaller');
const buttonPlus = pictureFilterModal.querySelector('.scale__control--bigger');

const sliderBlock = pictureFilterModal.querySelector('.img-upload__effect-level');
const sliderElement = pictureFilterModal.querySelector('.effect-level__slider');
const sliderEffectLevel = pictureFilterModal.querySelector('.effect-level__value');
const filterChrome = pictureFilterModal.querySelector('#effect-chrome');
const filterSepia = pictureFilterModal.querySelector('#effect-sepia');
const filterMarvin = pictureFilterModal.querySelector('#effect-marvin');
const filterPhobos = pictureFilterModal.querySelector('#effect-phobos');
const filterHeat = pictureFilterModal.querySelector('#effect-heat');
const filterNone = pictureFilterModal.querySelector('#effect-none');

//form-upload-modal.js
const hashtagInput = pictureFilterModal.querySelector('.text__hashtags');
const descriptionInput = pictureFilterModal.querySelector('.text__description');
const uploadFileButton = pictureUploadForm.querySelector('#upload-file');
const closeFilterButton = pictureFilterModal.querySelector('#upload-cancel');
const effectsPreviewPicture = pictureFilterModal.querySelectorAll('.effects__preview');

//form-validator.js
const submitButton = pictureFilterModal.querySelector('.img-upload__submit');

//picture-render.js
const picturesRoot = bodyElement.querySelector('.pictures');
const pictureTemplate = bodyElement.querySelector('#picture').content.querySelector('.picture');

//popup.js
const pictureModal = bodyElement.querySelector('.big-picture');
const closeModalButton = pictureModal.querySelector('.big-picture__cancel');
const commentLoaderButton = pictureModal.querySelector('.comments-loader');
const commentsCount = pictureModal.querySelector('.social__comment-count');
const bigPictureCommentsBlock = pictureModal.querySelector('.social__comments');

const bigPictureSrc = pictureModal.querySelector('.big-picture__img img');
const bigPictureLikes = pictureModal.querySelector('.likes-count');
const bigPictureDescription = pictureModal.querySelector('.social__caption');

//utils.js
const successTemplate = bodyElement.querySelector('#success').content.querySelector('.success');
const errorTemplate = bodyElement.querySelector('#error').content.querySelector('.error');

export {imgSortFilters};

export {scaleElement, valueElement, buttonMinus, buttonPlus, sliderBlock, sliderElement, sliderEffectLevel, filterChrome, filterSepia, filterMarvin, filterPhobos, filterHeat, filterNone};

export {bodyElement, pictureFilterModal, hashtagInput, descriptionInput, uploadFileButton, closeFilterButton, effectsPreviewPicture};

export {pictureUploadForm, submitButton};

export {picturesRoot, pictureTemplate};

export {pictureModal, closeModalButton, commentLoaderButton, commentsCount, bigPictureCommentsBlock, bigPictureSrc, bigPictureLikes, bigPictureDescription};

export {successTemplate, errorTemplate};
