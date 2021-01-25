import { SYMBOL_SEARCH, GLOBAL_QUOTE, OVERVIEW } from "../utils";

export const getBaseUrl = () => {
	const API_KEY = process.env.REACT_APP_API_KEY;
	const API_BASE_URL = process.env.REACT_APP_API_URL;
	return `${API_BASE_URL}/query/?apikey=${API_KEY}`;
};

export const encodeQueryParam = (func: string, ticker: string) => {
	const baseUrl = getBaseUrl();
	let searchParam = "";
	if (func === SYMBOL_SEARCH) {
		searchParam = "keywords";
	}

	if (func === GLOBAL_QUOTE || func === OVERVIEW) {
		searchParam = "symbol";
	}
	return `${baseUrl}&function=${func}&${searchParam}=${ticker}`;
};
