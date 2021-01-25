import * as React from "react";
import * as _ from "lodash";
import { EMPTY_CARD_STRING } from "../utils";
import { getStockFundamentals, getStockQuote } from "../services/stock";
import down from "../assets/down.png";
import up from "../assets/up.png";

interface ICardProps {
	stock: any;
	handleRemoveStock: (s: string) => void;
	testId?: string;
}

interface Stock {
	name?: string | undefined;
	eps?: string;
	high: string | any;
	percentChange: string | any;
	low: string | any;
	price: string | any;
	ticker: string | any;
}

export const Card = ({ stock, handleRemoveStock, testId }: ICardProps) => {
	const [quote, setQuote] = React.useState<Stock>();

	React.useEffect(() => {
		if (!_.isEmpty(stock) && !_.isUndefined(stock)) {
			// call is throttled because of free tier use / cant use this to get stock name
			//
			// getStockFundamentals(stock).then(res=> {
			//     console.log(res)
			//     setName(_.get(res, ['data', 'name']))
			//     setEps(_.get(res, ['data', 'EPS']))
			// })

			getStockQuote(stock).then((res) => {
				const quote = _.get(res, ["data", "Global Quote"]);
				if (quote && !_.isUndefined(quote)) {
					const quoteObj = Object.values(quote);
					setQuote({
						ticker: quoteObj[0],
						high: quoteObj[3],
						low: quoteObj[4],
						price: quoteObj[4],
						percentChange: quoteObj[9],
					});
				}
			});
		}
	}, [stock]);

	const formatNumber = (num: string) => {
		return parseFloat(num).toFixed(2);
	};

	const handlePercentChange = (percentChange: string) => {
		const cleanPercent = parseFloat(percentChange) * 100.0;
		const isNegative = Math.sign(cleanPercent) === -1;
		return (
			<span
				style={{ color: isNegative ? "red" : "green" }}
				data-testid="percent-change-color-test"
			>
				{`${cleanPercent.toFixed(2).toString()}%`}
			</span>
		);
	};

	const removeStockButton = (stock: string) => {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					color: "red",
					alignItems: "center",
				}}
				onClick={() => handleRemoveStock(stock)}
			>
				<span style={{ fontSize: 30 }}>X</span>
				<span>Remove</span>
			</div>
		);
	};

	const emptyCard = () => {
		return (
			<div data-testid="empty-card-test">
				<span>{EMPTY_CARD_STRING}</span>
			</div>
		);
	};

	const showArrow = (percentChange: string) => {
		if (parseFloat(percentChange) > 0) {
			return <img src={up} width={30} data-testid="up-arrow-test" />;
		} else {
			return <img src={down} width={30} data-testid="down-arrow-test" />;
		}
	};

	const stockCard = () => {
		if (!_.isUndefined(quote)) {
			return (
				<div style={{ flexGrow: 1, padding: 30 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
						data-testid="data-card-test"
					>
						<div
							style={{
								display: "flex",
								justifyContent: "end",
							}}
						>
							<div
								style={{ display: "flex", cursor: "pointer" }}
								data-testid="remove-stock-test"
							>
								{removeStockButton(stock.ticker)}
							</div>
						</div>
						<div>
							<h3>{quote.ticker}</h3>
						</div>

						<div style={{ display: "flex", flexDirection: "row" }}>
							<div>{showArrow(quote.percentChange)}</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginLeft: 10,
								}}
							>
								<span>{formatNumber(quote.price)}</span>
								<span>
									{handlePercentChange(quote.percentChange)}
								</span>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								marginTop: 20,
							}}
						>
							<h3>Stats</h3>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<span style={{ color: "gray" }}>High</span>
								<span>{formatNumber(quote.high)}</span>
							</div>

							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<span style={{ color: "gray" }}>Low</span>
								<span>{formatNumber(quote.low)}</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<div
			style={{
				borderRight: "1px solid black",
				borderLeft: "1px solid black",
				flexGrow: 1,
			}}
			data-testid="card-test"
		>
			<div style={{ padding: 20 }}>
				{_.isEmpty(stock) || _.isUndefined(stock)
					? emptyCard()
					: stockCard()}
			</div>
		</div>
	);
};

export default Card;
