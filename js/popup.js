const COMMENT_PER_PORTION = 5;
const bodyClassPopup = document.querySelector('body');
const pictureModal = document.querySelector('.big-picture');
const closeModalClass = pictureModal.querySelector('.big-picture__cancel');
const commentLoaderButton = document.querySelector('.comments-loader');
const commentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsBlock = document.querySelector('.social__comments');
const isEscapeKey = (evt) => evt.key === 'Escape';

let comments = [];
let countComments = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

closeModalClass.addEventListener('click', () => {
  closePictureModal();
});

function closePictureModal() {
  pictureModal.classList.add('hidden');
  bodyClassPopup.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeModalClass.removeEventListener('keydown', closePictureModal);
  commentLoaderButton.removeEventListener('click', clickOnLoader);
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
  commentElementImage.width = 25;
  commentElementImage.heigth = 25;
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

function clickOnLoader() {
  const currentCountValue = countComments;
  countComments += COMMENT_PER_PORTION;
  renderCommentsBlock(comments.slice(currentCountValue, countComments));
}

function registerEventButton() {
  commentLoaderButton.addEventListener('click', clickOnLoader);
}

const renderPopup = (picture) => {
  const bigPictureSrc = document.querySelector('.big-picture__img img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureDescription = document.querySelector('.social__caption');

  bigPictureSrc.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureDescription.textContent = picture.description;
};

const openPictureModal = (picture) => {
  pictureModal.classList.remove('hidden');
  bodyClassPopup.classList.add('modal-open');
  if (picture.comments.length >= 1) {
    comments = [...picture.comments];
    renderCommentsBlock();
    if (picture.comments.length > 5) {
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
