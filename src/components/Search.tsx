import * as React from 'react';
import * as _ from 'lodash';
import {searchStock} from '../services/stock'

interface ISearchProps {
    handleUpdateStock: any;
    stocks: any;
}

interface SearchResults {
    symbol: string;
    name: string;
    matchScore: string;
}

export const Search = ({handleUpdateStock, stocks}: ISearchProps) => {
    const [results, setResults] = React.useState<Array<SearchResults>>();

    const handleSearchChange = (search: string) => {
        searchStock(search)
            .then(res => {
                const matches = _.get(res, ['data', 'bestMatches'])
                if (!_.isEmpty(matches)) {
                    setResults(matches)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleSelectResult = (selected: string) =>  {
        let tmpStocks = _.clone(stocks);
        for (let stock in tmpStocks) {
            if (_.isEmpty(tmpStocks[stock])) {
                _.set(tmpStocks, stock, selected)
                break;
            }
        }
        handleUpdateStock(tmpStocks)
    }

    return (
        <div>
            <input name="search" onChange={(e) => handleSearchChange(_.get(e, ['target', 'value']))}/>
            {!_.isEmpty(results)&& !_.isUndefined(results) && <div>
                <select onChange={(e) => handleSelectResult(_.get(e, ['target', 'value']))}>
                    {_.map(results, (r) => {
                        return (
                            <option key={Object.values(r)[0]}>{Object.values(r)[0]}</option>
                        )
                    })}
                </select>
                </div>}
        </div>
    )
}

export default Search;

