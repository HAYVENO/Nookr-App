("use strict");
import View from "./view";
import icons from "url:../../img/icons.svg";
import { async } from "regenerator-runtime";

class searchView extends View {
	_data;
	_parentEl = document.querySelector(".search");
	_parentElement = document.querySelector(".results");
	_errorMessage = "There were no results for your search";
	_searchField = this._parentEl.querySelector(".search__field");

	getQuery() {
		return this._searchField.value;
	}

	addSearchHandler(handler) {
		// on page load, use default value
		window.addEventListener("load", async () => {
			await handler();
		});

		//on search submit, use query
		this._parentEl.addEventListener("submit", async (e) => {
			e.preventDefault();
			this._searchField.blur();
			await handler();
		});
	}

	_generateMarkup(results) {
		return this._data
			.map((result) => this._generateMarkupPreview(result))
			.slice(-12)
			.join(" ");
	}

	_generateMarkupPreview(result) {
		const recipeId = window.location.hash.slice(1);

		return `


    <li class="preview">
       <a class="preview__link ${
				recipeId === result.id ? "preview__link--active" : undefined
			}" href="#${result.id}">
     <figure class="preview__fig listX">
     <img src="${result.image}" alt="image of ${result.title}" />
     </figure>
     <div class="preview__data">
       <h4 class="preview__title">${result.title}</h4>
       <p class="preview__publisher">${result.publisher}</p>
        ${
				result.key
					? `<div class="preview__user-generated"><svg>
                         <use href="${icons}#icon-user"></use></svg>
                       </div>`
					: ""
			}
    </div>
     </a>
   </li>`;
	}
}

export default new searchView();
