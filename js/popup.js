import {bodyElement, pictureModal, closeModalButton, commentLoaderButton, commentsCount, bigPictureCommentsBlock, bigPictureSrc, bigPictureLikes, bigPictureDescription} from './dom-constants.js';
import {isEscapeKey} from './utils.js';


const COMMENT_PER_PORTION = 5;
const COMMENT_AVATAR_WIDTH = 25;
const COMMENT_AVATAR_HEIGHT = 25;
const MIN_COMMENTS_RENDER_VALUE = 1;
const COMMENTS_BUTTON_UPLOAD_VALUE = 5;

let comments = [];
let countComments = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

closeModalButton.addEventListener('click', () => {
  closePictureModal();
});

function closePictureModal() {
  pictureModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeModalButton.removeEventListener('keydown', closePictureModal);
  commentLoaderButton.removeEventListener('click', onLoaderClick);
  countComments = 5;
}

const renderComment = (comment) => {
  const commentElement = document.createElement('li');
  const commentElementImage = document.createElement('img');
  const commentElementDescription = document.createElement('p');

  commentElement.className = 'social__comment';
  commentElementImage.className = 'social__picture';
  commentElementImage.src = comment.avatar;
  commentElementImage.alt = comment.name;
  commentElementImage.width = COMMENT_AVATAR_WIDTH;
  commentElementImage.heigth = COMMENT_AVATAR_HEIGHT;
  commentElementDescription.className = 'social__text';
  commentElementDescription.textContent = comment.message;
  commentElement.appendChild(commentElementImage);
  commentElement.appendChild(commentElementDescription);
  bigPictureCommentsBlock.appendChild(commentElement);
};

const renderCommentsBlock = () => {
  bigPictureCommentsBlock.innerHTML = '';
  comments.forEach((comment, index) => {
    if (index < countComments) {
      renderComment(comment);
    }
  });

  if (countComments <= comments.length) {
    commentsCount.innerHTML = `<span class="social__comment-shown-count">${countComments}</span> из <span class="comments-count social__comment-total-count">${comments.length}</span> комментариев`;
  } else {
    commentsCount.innerHTML = `<span class="social__comment-shown-count">${comments.length}</span> из <span class="comments-count social__comment-total-count">${comments.length}</span> комментариев`;
  }

  if (countComments >= comments.length) {
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
};

function onLoaderClick() {
  const currentCountValue = countComments;
  countComments += COMMENT_PER_PORTION;
  renderCommentsBlock(comments.slice(currentCountValue, countComments));
}

function registerEventButton() {
  commentLoaderButton.addEventListener('click', onLoaderClick);
}

const renderPopup = (picture) => {
  bigPictureSrc.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
};

const openPictureModal = (picture) => {
  pictureModal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  if (picture.comments.length >= MIN_COMMENTS_RENDER_VALUE) {
    comments = [...picture.comments];
    renderCommentsBlock();
    if (picture.comments.length > COMMENTS_BUTTON_UPLOAD_VALUE) {
      registerEventButton();
    }
  } else {
    comments = [];
    renderCommentsBlock();
  }
  renderPopup(picture);

  document.addEventListener('keydown', onDocumentKeydown);
};

export {openPictureModal, isEscapeKey};
