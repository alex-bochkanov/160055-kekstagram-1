import {isEscapeKey} from './popup.js';
import {registerPristineValidator} from './form-validator.js';
import {registerFilters, onHandlerFilterNone, removeFiltersEvents, removeButtonsScaleEvents, destroyNoUiSlider} from './filters.js';
import {setUploadFormSubmit, resetPristineValidator} from './form-validator.js';
import {bodyElement, pictureFilterModal, pictureUploadForm, hashtagInput, descriptionInput, uploadFileButton, closeFilterButton, scaleElement, effectsPreviewPicture} from './dom-consts.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.body.querySelector('.error')) {
    evt.preventDefault();
    closePictureFilterModal();
  }
};

const onInputFocus = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onInputBlur = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('focus', onInputFocus);
};

const openPictureFilterModal = () => {
  pictureFilterModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  hashtagInput.addEventListener('focus', onInputFocus);
  hashtagInput.addEventListener('blur', onInputBlur);

  descriptionInput.addEventListener('focus', onInputFocus);
  descriptionInput.addEventListener('blur', onInputBlur);

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
      scaleElement.src = URL.createObjectURL(file);
      effectsPreviewPicture.forEach((item) => {
        item.style.backgroundImage = `url(${scaleElement.src})`;
      });
    }
    openPictureFilterModal();
  });
  setUploadFormSubmit(closePictureFilterModal);
};

function closePictureFilterModal() {
  pictureFilterModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFilterButton.removeEventListener('keydown', closePictureFilterModal);
  hashtagInput.removeEventListener('focus', onInputFocus);
  hashtagInput.removeEventListener('blur', onInputBlur);
  descriptionInput.removeEventListener('focus', onInputFocus);
  descriptionInput.removeEventListener('blur', onInputBlur);
  pictureUploadForm.reset();
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
