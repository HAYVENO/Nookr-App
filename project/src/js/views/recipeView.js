import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./view";

class recipeView extends View {
	// _data;
	_parentElement = document.querySelector(".recipe");
	_errorMessage = "We are unable to find the recipe that you searched. Please try again!";

	addHandlerRender(handler) {
		["hashchange", "load"].forEach((ev) => {
			return window.addEventListener(ev, handler);
		});
	}

	addHandlerServings(handler) {
		this._parentElement.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn--increase-servings");
			if (!btn) return;
			// console.log(btn.dataset);
			const updateTo = +btn.dataset.updateTo;
			if (updateTo > 0) handler(updateTo);
		});
	}

	addHandlerAddBookmark(handler) {
		this._parentElement.addEventListener("click", (e) => {
			const btn = e.target.closest(".btn--bookmark");
			if (!btn) return;
			handler();
		});
	}

	_generateMarkup() {
		// console.log("my data", this._data);
		return `<figure class="recipe__fig">
      <img src='${this._data.imageUrl}' alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
      <span>${this._data.title}</span>
      </h1>
      </figure>
      
      <div class="recipe__details">
      <div class="recipe__info">
      <svg class="recipe__info-icon">
      <use href="${icons}#icon-stop-watch"></use>
      </svg>
      <span class="recipe__info-dat/* A link to the source of the recipe. */
      a recipe__info-data--minutes">${this._data.cookingTime}</span>
      <span class="recipe__info-text">mins</span>
      </div>
      <div class="recipe__info">
      <svg class="recipe__info-icon">
      <use href="${icons}#icon-group"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
      <span class="recipe__info-text">${this._data.servings > 1 ? "persons" : "person"}</span>
      
      <div class="recipe__info-buttons">
      <button title='Remove person' data-update-to="${
			+this._data.servings - 1
		}" class="btn--tiny btn--increase-servings">
      <svg>
      <use href="${icons}#icon-user-minus"></use>
      </svg>
      </button>
      <button title='Add person' data-update-to="${
			+this._data.servings + 1
		}" class="btn--tiny btn--increase-servings">
      <svg>
      <use href="${icons}#icon-user-plus"></use>
      </svg>
      </button>
      </div>
      </div>
      
      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
      <svg>
      <use href="${icons}#icon-user"></use>
      </svg>
      </div>
      <button title='Add to Favorites' class="btn--round btn--bookmark">
      <svg class="">
      <use href="${icons}${this._data.bookmarked ? "#icon-heart1" : "#icon-heart"}"></use>
      </svg>
      </button>
      </div>
      
      <div class="recipe__ingredients">
      <h2 class="heading--2">Meal ingredients</h2>
      <ul class="recipe__ingredient-list">

      ${this._data.ingredients
			.map((ingredient) => {
				return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-spoon"></use>
              </svg>
              <div class="recipe__quantity">${
						ingredient.quantity ? fracty(parseFloat(ingredient.quantity)) : ""
					}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
			})
			.join(" ")}
    
    
      </ul>
      </div>
      
      <div class="recipe__directions">
      <h2 class="heading--2">GET STEP-BY-STEP INSTRUCTIONS</h2>
      <p class="recipe__directions-text">The <span class="recipe__publisher">${
			this._data.publisher
		}</span> has designed and tested this recipe to ensure its success. To get full details on the recipes, visit their website.
      </p>
      <a
      class="btn--small recipe__btn"
      href=${this._data.sourceUrl}
      target="_blank"
      >
      <span>GET THE STEPS</span>
      <svg class="search__icon">
      <use href="${icons}#icon-in-alt"></use>
      </svg>
      </a>
      </div>`;
	}
}

export default new recipeView();
