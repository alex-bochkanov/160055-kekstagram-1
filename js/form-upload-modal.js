import {isEscapeKey} from './popup.js';
import {registerPristineValidator} from './form-validator.js';
import {registerFilters, onHandlerFilterNone, removeFiltersEvents, removeButtonsScaleEvents, destroyNoUiSlider} from './filters.js';
import {setUploadFormSubmit, resetPristineValidator} from './form-validator.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyClassPopup = document.querySelector('body');
const pictureFilterModal = document.querySelector('.img-upload__overlay');
const pictureForm = document.querySelector('.img-upload__form');

const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const uploadFileButton = document.getElementById('upload-file');
const closeFilterButton = document.getElementById('upload-cancel');
const previewPicture = document.querySelector('.img-upload__preview img');
const effectsPreviewPicture = document.querySelectorAll('.effects__preview');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.body.querySelector('.error')) {
    evt.preventDefault();
    closePictureFilterModal();
  }
};

const focusInput = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const blurInput = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('focus', focusInput);
};

const openPictureFilterModal = () => {
  pictureFilterModal.classList.remove('hidden');
  bodyClassPopup.classList.add('modal-open');
  hashtagInput.addEventListener('focus', focusInput);
  hashtagInput.addEventListener('blur', blurInput);

  descriptionInput.addEventListener('focus', focusInput);
  descriptionInput.addEventListener('blur', blurInput);

  registerPristineValidator();
  registerFilters();
  document.addEventListener('keydown', onDocumentKeydown);
};

const registerUploadFileButton = () => {
  uploadFileButton.addEventListener('change', () => {
    const file = uploadFileButton.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewPicture.src = URL.createObjectURL(file);
      effectsPreviewPicture.forEach((item) => {
        item.style.backgroundImage = `url(${previewPicture.src})`;
      });
    }
    openPictureFilterModal();
  });
  setUploadFormSubmit(closePictureFilterModal);
};

function closePictureFilterModal() {
  pictureFilterModal.classList.add('hidden');
  bodyClassPopup.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFilterButton.removeEventListener('keydown', closePictureFilterModal);
  hashtagInput.removeEventListener('focus', focusInput);
  hashtagInput.removeEventListener('blur', blurInput);
  descriptionInput.removeEventListener('focus', focusInput);
  descriptionInput.removeEventListener('blur', blurInput);
  pictureForm.reset();
  resetPristineValidator();
  removeButtonsScaleEvents();
  onHandlerFilterNone();
  destroyNoUiSlider();
  removeFiltersEvents();
}

closeFilterButton.addEventListener('click', () => {
  closePictureFilterModal();
});

export {registerUploadFileButton, closePictureFilterModal};
