import {sendData} from './get-post-api.js';
import {showSuccess, showAlert} from './utils.js';
import {pictureFilterModal, pictureUploadForm, submitButton} from './dom-constants.js';

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MIN_HASHTAG_VALUE = 0;
const MAX_HASHTAG_VALUE = 5;
const MAX_LENGTH_DESCRIPTION_VALUE = 140;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
});

const registerPristineValidator = () => {
  const isValidTag = (tag) => HASHTAG_REG_EXP.test(tag);

  const validateHashtag = (value) => {
    const arrayValue = value.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');
    const duplicates = arrayValue.filter((number, index, numbers) => numbers.indexOf(number) !== index);

    return value === '' || arrayValue.length <= MAX_HASHTAG_VALUE && duplicates.length === MIN_HASHTAG_VALUE && arrayValue.every(isValidTag);
  };
  const validateTextDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION_VALUE;

  pristine.addValidator(pictureFilterModal.querySelector('.text__hashtags'), validateHashtag, 'Хештег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Также не должно быть более 5 хештегов.');
  pristine.addValidator(pictureFilterModal.querySelector('.text__description'), validateTextDescription, 'Длина до 140 символов');
};

const resetPristineValidator = () => {
  pristine.reset();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUploadFormSubmit = (onSuccess) => {
  pictureUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccess)
        .catch(showAlert)
        .finally(unblockSubmitButton);
    }
  });
};

export {registerPristineValidator, setUploadFormSubmit, resetPristineValidator};
