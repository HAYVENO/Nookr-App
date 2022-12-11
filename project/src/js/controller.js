import "core-js/stable"; //Polyfills

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

const recipeContainer = document.querySelector(".recipe");
// let id = '5ed6604591c37cdc054bc886';

// RECIPE CONTROLLER CONTROLLER
const controlRecipe = async function () {
	try {
		//Get Hashchange
		const id = window.location.hash.slice(1);
		if (!id) return;

		//Re-Render search results - per page (for active class)
		searchView.render(model.getPageResult());

		//Placeholder Spinner
		recipeView.renderSpinner();

		//load recipe
		await model.loadRecipe(id);
		const { recipe } = model.state;

		//Check for Bookmarks and activate Bookmark UI
		if (model.state.bookmarks.some((bookmark) => bookmark.id === id))
			model.state.recipe.bookmarked = true;
		//render recipe
		recipeView.render(recipe);
	} catch (err) {
		recipeView.renderError();
		console.error(err);
	}
};

//SEARCH QUERY RESULTS CONTROL
const controlSearch = async function () {
	try {
		//placeholder spinner
		searchView.renderSpinner();

		// load search results - ON WINDOW LOAD, USE DEFAULT QUERY
		if (!searchView.getQuery()) await model.loadSearchResult(model.state.search.query);
		else await model.loadSearchResult(searchView.getQuery());

		const resultsPerPage = model.getPageResult();

		//restore page number to page one
		// model.state.search.page = 1;

		//Render search results - per page
		searchView.render(resultsPerPage);

		//render pagination
		paginationView.render(model.state.search);
	} catch (err) {
		console.error(err);
	}
};

/**
 * It renders the new page's list and pagination
 * @param goToPage - the page number that we want to go to
 */
const controlPagination = function (goToPage) {
	//render new the page's list
	searchView.render(model.getPageResult(goToPage));
	//render the new page's pagination
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	//update servings
	model.updateServings(newServings);

	//render with new quantity changes
	recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
	//Check if recipe has NOT been Bookmarked
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);
	recipeView.render(model.state.recipe);
	bookmarksView.render(model.state.bookmarks);
	console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.addHandlerRender(model.loadBookmarkStorage());
	bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
	try {
		//render the spinner
		addRecipeView.renderSpinner();

		//uploadRecipe data (promise)
		await model.uploadRecipe(newRecipe);

		//render success message
		addRecipeView.renderMessage();

		//change the url to the current ID
		window.history.pushState(null, "", `#${model.state.recipe.id}`);

		//Load up recipe on recipe view
		recipeView.render(model.state.recipe);

		//set timeout to hide upload window
		setTimeout(function () {
			addRecipeView.toggleUpload();
		}, 2000);
		window.location.reload();
	} catch (err) {
		console.log(err);
		addRecipeView.renderError(err.message);
		setTimeout(function () {
			window.location.reload();
		}, 4000);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipe);
	searchView.addSearchHandler(controlSearch);
	paginationView.addHandlerPage(controlPagination);
	recipeView.addHandlerServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	addRecipeView.addHandlerShowUpload();
	addRecipeView.addHandlerHideUpload();
	addRecipeView.addHandlerUpload(controlUploadRecipe);
	bookmarksView.addHandlerRender(controlBookmarks);
};
init();
///////////////////////////////////////
console.log("Wiz");
