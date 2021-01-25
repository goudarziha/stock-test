import { doesNotReject } from "assert";
import axios from "axios";
import AxiosResponse from "axios";
import { shallow } from "enzyme";
import * as React from "react";
import ReactDOM from "react-dom";
import { getStockFundamentals, getStockQuote, searchStock } from "../stock";

describe("search stocks", () => {
	jest.mock("axios");
	const mockedAxios = axios as jest.Mocked<typeof axios>;
	// should return stock quotes
	it("should return list of tickers", () => {
		axios.get = jest.fn();
		mockedAxios.get.mockResolvedValue({ data: {} } as any);
	});

	// should return data for stocks
	it("should return data for ticker", () => {});
});
