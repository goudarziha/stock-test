import { getBaseUrl, encodeQueryParam } from "../strings";
import { SYMBOL_SEARCH } from "../const";

describe("string tests", () => {
	const baseUrl = getBaseUrl();

	test("build base url", async () => {
		const apiKey = process.env.REACT_APP_API_KEY;
		const url = process.env.REACT_APP_API_URL;
		const fullStr = `${url}/query/?apikey=${apiKey}`;
		expect(baseUrl).toEqual(fullStr);
	});

	test("search url param", async () => {
		const ibmTicker = "ibm";
		const url = encodeQueryParam(SYMBOL_SEARCH, ibmTicker);
		const fullStr = `${baseUrl}&function=${SYMBOL_SEARCH}&keywords=${ibmTicker}`;
		expect(url).toEqual(fullStr);
	});
});
