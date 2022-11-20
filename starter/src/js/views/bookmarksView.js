import { state } from '../model';
import View from './view';

class bookmarksView extends View {
  _type = 'bookmarksView';
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'You have removed all your bookmarked recipes. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.onload = function () {
      handler();
    };
  }

  _generateMarkup(results) {
    return this._data
      .map(result => this._generateMarkupPreview(result))
      .join(' ');
  }

  _generateMarkupPreview(result) {
    return `    
         <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
              <img src="${result.imageUrl}" alt="Bookmark image for ${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
  
  `;
  }
}

export default new bookmarksView();
