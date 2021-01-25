import * as React from "react";
import ReactDOM from "react-dom";
import {
	render,
	fireEvent,
	waitFor,
	screen,
	getByLabelText,
	getByRole,
	cleanup,
	getByPlaceholderText,
	getByTestId,
} from "@testing-library/react";
import ReactTestUtils from "react-dom/test-utils";
import { Search } from "../Search";

describe("search tests", () => {
	const div = document.createElement("div");
	let searchEl;

	const handleInputChange = (evt: any) => {};

	const setup = () => {
		const utils = render(
			<Search handleUpdateStock={jest.fn()} stocks={[]} />
		);
		const input = utils.findByTestId("search-test");
		return {
			input,
			...utils,
		};
	};

	beforeAll(() => {
		searchEl = render(<Search handleUpdateStock={jest.fn()} stocks={[]} />);
	});

	test("initialize", async () => {
		const search = screen.findByTestId("search-test");
		expect(search).toBeDefined();
	});

	// test search
	// test("search test", async () => {
	// 	const test = screen.findByTestId("search-input");
	// 	expect(test).toBeDefined();
	// });

	// test add item
	// test("add stock item", async () => {});

	afterEach(() => {
		cleanup();
	});
});
