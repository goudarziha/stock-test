import * as React from "react";
import * as _ from "lodash";
import { searchStock } from "../services/stock";

interface ISearchProps {
	handleUpdateStock: any;
	stocks: any;
	testId?: string;
}

interface SearchResults {
	symbol: string;
	name: string;
	matchScore: string;
}

export const Search = ({ handleUpdateStock, stocks, testId }: ISearchProps) => {
	const [results, setResults] = React.useState<Array<SearchResults>>();

	const handleSearchChange = (search: string) => {
		searchStock(search)
			.then((res) => {
				const matches = _.get(res, ["data", "bestMatches"]);
				if (!_.isEmpty(matches)) {
					setResults(matches);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSelectResult = (selected: string) => {
		let tmpStocks = _.clone(stocks);
		for (let stock in tmpStocks) {
			if (_.isEmpty(tmpStocks[stock])) {
				_.set(tmpStocks, stock, selected);
				break;
			}
		}
		handleUpdateStock(tmpStocks);
	};

	return (
		<div data-testid={!_.isEmpty(testId) ? testId : "search-test"}>
			<input
				name="search"
				onChange={(e) =>
					handleSearchChange(_.get(e, ["target", "value"]))
				}
				aria-labelledby="search-input"
				placeholder="Search ticker"
				data-testid="search-input"
			/>
			{!_.isEmpty(results) && !_.isUndefined(results) && (
				<select
					onChange={(e) =>
						handleSelectResult(_.get(e, ["target", "value"]))
					}
					data-testid="select-stock-test"
				>
					{_.map(results, (r) => {
						return (
							<option
								key={Object.values(r)[0]}
								data-testid="option-test"
							>
								{Object.values(r)[0]}
							</option>
						);
					})}
				</select>
			)}
		</div>
	);
};

export default Search;
