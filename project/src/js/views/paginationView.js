import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPage(handler) {
    this._parentElement.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      const toPage = +button.dataset.goto;
      handler(toPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    //compute number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //page 1 with other pages
    if (currentPage === 1 && numPages > 1)
      return `<button data-goto='${
        currentPage + 1
      }' class="btn--inline pagination__btn--next">
                     <span>Page ${currentPage + 1}</span>
                     <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                  </svg>
               </button>`;
    //page 1 with no other page
    if (currentPage === 1 && numPages === 1) return '';
    //last page
    if (currentPage === numPages)
      return `<button data-goto = '${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
         <span>Page ${currentPage - 1}</span>
         <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
         </svg>
     </button>`;

    //page x
    if (currentPage < numPages)
      return `
      <button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
        <span>Page ${currentPage - 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
     </button>
      
      <button data-goto='${
        currentPage + 1
      }' class="btn--inline pagination__btn--next">
               <span>Page ${currentPage + 1}</span>
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
               </svg>
              </button>`;
  }
}

export default new PaginationView();
