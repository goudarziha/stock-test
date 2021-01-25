import * as React from "react";
import ReactDOM from "react-dom";
import { Card } from "../Card";
import { EMPTY_CARD_STRING } from "../../utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { remove } from "lodash";

describe("card test", () => {
	const sampleStock = {
		name: "Tesla",
		eps: "3.19",
		high: "420.00",
		low: "410.00",
		percentChange: "1.2069%",
		price: "414.00",
		ticker: "tsla",
	};
	const noData = {};

	const div = document.createElement("div");
	const handleRemoveStock = jest.fn();
	let emptyCardEl;
	let cardEl;

	beforeAll(() => {
		emptyCardEl = ReactDOM.render(
			<Card stock={noData} handleRemoveStock={() => handleRemoveStock} />,
			div
		);
		cardEl = ReactDOM.render(
			<Card
				stock={sampleStock}
				handleRemoveStock={() => handleRemoveStock}
			/>,
			div
		);
	});

	// initialize
	test("initialize", async () => {
		const card = screen.findByTestId("card-test");
		expect(card).toBeDefined();
	});

	// empty card /w test
	test("empty card", async () => {
		const emptyCard = screen.findByTestId("empty-card-test");
		expect(emptyCard).toBeDefined();
		const emptyText = screen.findByText(EMPTY_CARD_STRING);
		expect(emptyText).toBeDefined();
	});

	// card full
	test("full data card", async () => {
		const card = screen.findByTestId("card-test");
		expect(card).toBeDefined();
		const removeEl = screen.findByTestId("remove-stock-test");
		expect(removeEl).toBeDefined();
		const percentChangeEl = screen.findByTestId("percent-change-test");
		expect(percentChangeEl).toBeDefined();
	});

	// precent change colors
	test("percent change color", async () => {
		const card = screen.findByTestId("card-test");
		expect(card).toBeDefined();
		const percentChangeEl = screen.findByTestId(
			"percent-change-color-test"
		);
		expect(percentChangeEl).toBeDefined();
		// expect(percentChangeEl).toHaveStyle("color: green");
	});

	// remove card
	test("remove card", async () => {
		const card = screen.findByTestId("card-test");
		expect(card).toBeDefined();
		const removeEl = screen.findByTestId("remove-stock-test");
		expect(removeEl).toBeDefined();

		// fireEvent.click(await screen.findByText("Remove"));
		// expect(screen.findByText(EMPTY_CARD_STRING)).toBeVisible
	});

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(div);
	});
});
