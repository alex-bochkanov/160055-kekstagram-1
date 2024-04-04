import {sendData} from './get-post-api.js';
import {showSuccess, showAlert} from './utils.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
const pictureFilterModal = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload__form');
const submitButton = pictureUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error'
});

const registerPristineValidator = () => {
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValidTag = (tag) => hashtag.test(tag);

  const validateHashtag = (value) => {
    const arrayValue = value.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');
    const duplicates = arrayValue.filter((number, index, numbers) => numbers.indexOf(number) !== index);

    return value === '' || arrayValue.length <= 5 && duplicates.length === 0 && arrayValue.every(isValidTag);
  };
  const validateTextDescription = (value) => value.length <= 140;

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
