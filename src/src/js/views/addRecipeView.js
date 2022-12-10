import View from './view';

class addRecipeView extends View {
  _message = 'Upload successful! Your recipe has been added.';
  _parentElement = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _addRecipeButton = document.querySelector('.nav__btn--add-recipe');
  _closeButton = document.querySelector('.btn--close-modal');
  _parentEl = document.querySelector('html');
  _form = document.querySelector('form.upload');

  toggleUpload(e) {
    this._overlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
    console.log('shower');
  }

  addHandlerShowUpload() {
    this._addRecipeButton.addEventListener(
      'click',
      this.toggleUpload.bind(this)
    );
  }

  addHandlerHideUpload() {
    this._closeButton.addEventListener('click', this.toggleUpload.bind(this));
    this._overlay.addEventListener('click', this.toggleUpload.bind(this));
  }

  addHandlerUpload(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const uploadData = [...new FormData(this)];
      const data = Object.fromEntries(uploadData);
      handler(data);
    });
  }
}

export default new addRecipeView();
