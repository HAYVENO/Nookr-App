import icons from "url:../../img/icons.svg";

export default class View {
	_data;
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
		this._data = data;
		const markup = this._generateMarkup();
		this._clear();

		// this._parentElement.insertAdjacentHTML('afterbegin', markup);
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	checkImage() {
		//If image does not load, do not display it.
		// console.log(this._parentEl);
		if (this._parentEl) {
			const previewImages = document.querySelectorAll(".preview__fig.listX img");
			previewImages.forEach((image) => {
				image.onerror = function () {
					image.style.display = "none";
				};
			});
			return;
		}
		const recipeImage = document.querySelector(".recipe__img");
		// console.log(recipeImage);
		recipeImage &&
			(recipeImage.onerror = function () {
				recipeImage.style.display = "none";
			});
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}

	renderSpinner() {
		const html = `<div class="spinner"><div></div></div>`;
		return (this._parentElement.innerHTML = html);
	}

	renderError(errMessage = this._errorMessage) {
		const markup = `  
       <div class="error">
             <div>
               <svg>
                 <use href="${icons}#icon-${
			this._type === "bookmarksView" ? "smile" : "alert-triangle"
		}"></use>
               </svg>
             </div>
             <p>${errMessage}</p>
       </div> `;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderMessage(message = this._message) {
		const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
