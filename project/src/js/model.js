import "regenerator-runtime/runtime"; //Polyfills async functions
import { API_URL, RES_PER_PAGE, DEFAULT_MEAL } from "./config";
import { getJSON, sendJSON } from "./helper";
import { KEY } from "../env";

export const state = {
	bookmarks: [],
	recipe: {},
	search: {
		query: DEFAULT_MEAL,
		page: 1,
		results: [],
		resultsPerPage: RES_PER_PAGE,
	},
};

export const loadRecipe = async function (id) {
	try {
		await getJSON(`${API_URL}${id}`);
		const { recipe } = data.data;

		state.recipe = {
			cookingTime: recipe.cooking_time,
			id: recipe.id,
			imageUrl: recipe.image_url,
			ingredients: recipe.ingredients,
			publisher: recipe.publisher,
			servings: recipe.servings,
			sourceUrl: recipe.source_url,
			title: recipe.title,
			...(recipe.key && { key: recipe.key }),
		};
		console.log(state.recipe);
	} catch (err) {
		throw err;
	}
};

export const loadSearchResult = async function (query) {
	console.log("the page", state.search.page);
	console.log("the query", state.search.query);
	state.search.query = query;
	//restore page number to page one
	state.search.page = 1;

	// Get JSON Data and map it into results array
	await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
	state.search.results = data.data.recipes.map((rec) => {
		return {
			id: rec.id,
			title: rec.title,
			image: rec.image_url,
			publisher: rec.publisher,
			...(rec.key && { key: rec.key }),
		};
	});
};

//pagination function
export const getPageResult = function (page = state.search.page) {
	state.search.page = page;
	const start = (page - 1) * state.search.resultsPerPage;
	const end = page * state.search.resultsPerPage;
	return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach((ingredient) => {
		ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
	});
	state.recipe.servings = newServings;

	console.log(state.recipe.ingredients);
};

const localStoreBookmarks = function () {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
	//push to bookmarks
	state.bookmarks.push(recipe);
	//Add bookmarked attribute
	state.recipe.bookmarked = true;

	localStoreBookmarks();
};

export const deleteBookmark = function (id) {
	const deleteIndex = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
	state.bookmarks.splice(deleteIndex, 1);
	state.recipe.bookmarked = false;
	localStoreBookmarks();
};

export const loadBookmarkStorage = function () {
	const storage = localStorage.getItem("bookmarks");
	if (!storage) return;
	state.bookmarks = JSON.parse(storage);
};

export const uploadRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter((value) => value[0].includes("ingredient") && value[1] !== "")
			.map((ingredient) => {
				const ingArray = ingredient[1].replaceAll(" ", "").split(",");
				if (ingArray.length !== 3)
					// check if every parameter is filled || ingArray.some(ing => ing === '')
					throw new Error(
						"Wrong ingredient format! Check that you fill every required field.  :)"
					);
				const [quantity, unit, description] = ingArray;

				return { quantity: quantity ? +quantity : null, unit, description };
			});
		console.log(newRecipe);
		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		};

		const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
		const sentRecipe = data.data.recipe;
		state.recipe = {
			cookingTime: sentRecipe.cooking_time,
			id: sentRecipe.id,
			imageUrl: sentRecipe.image_url,
			ingredients: sentRecipe.ingredients,
			publisher: sentRecipe.publisher,
			servings: sentRecipe.servings,
			sourceUrl: sentRecipe.source_url,
			title: sentRecipe.title,
			...(recipe.key && { key: recipe.key }),
		};
		console.log("models recipe", state.recipe);
	} catch (err) {
		console.error(err);
		throw err;
	}
};
