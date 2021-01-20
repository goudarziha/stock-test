import * as React from 'react';
import * as _ from 'lodash';
import {getStockFundamentals, getStockQuote} from '../services/stock'

interface ICardProps {
    stock: any;
}

interface Stock {
    name?: string;
    eps?: string;
    high: string;
    percentChange: string;
    low: string;
    price: string;
    ticker: string;
}

export const Card = ({stock}: ICardProps) => {

    const [quote, setQuote] = React.useState<Stock>();

    React.useEffect(() => {
        if (!_.isEmpty(stock) && !_.isUndefined(stock)) {

            // call is throttled
            // getStockFundamentals(stock).then(res=> {
            //     console.log(res)
            //     setName(_.get(res, ['data', 'name']))
            //     setEps(_.get(res, ['data', 'EPS']))
            // })

            getStockQuote(stock).then(res => {
                const quote = _.get(res, ['data', 'Global Quote'])
                if (quote && !_.isUndefined(quote)) {
                   setQuote({
                       ticker: quote[0],
                       high: quote[3],
                       low: quote[4],
                       price: quote[5],
                       percentChange: quote[9]
                   })

                   console.log(quote)
                }
            })
        }
    }, [stock])

    const [stockInfo, setStockInfo] = React.useState();

    const removeStockButton = (stock: string) => {
        return (
            <div style={{display:'flex', flexDirection: 'column', color: 'red'}} onClick={() => handleRemoveCard()}>
                <span>X</span>
                <span>Remove</span>
            </div>
        )
    }

    const handleRemoveCard = () => {
        console.log('remove')
    }

    const emptyCard = () => {
        return (
            <div>
                <span>
                    Pick an additional stock symbol in the serach box above to display stock information
                </span>
            </div>
        )
    }

    const stockCard = () => {
        if (!_.isUndefined(quote)) {
            
            return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex'}}>
                        {removeStockButton(stock.ticker)}
                    </div>
                    <div>
                        <h3>{quote.ticker}</h3>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div>UP</div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h4>Price</h4>
                            <span>{quote.price}</span>
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h3>Stats</h3>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <span>High</span>
                            <span>{quote.high}</span>
                        </div>
                        
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <span>Low</span>
                            <span>{quote.low}</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div style={{borderRight: '1px solid black', borderLeft: '1px solid black'}} data-testid="card-test">
            <div style={{padding: 20}}>
                {_.isEmpty(stock) || _.isUndefined(stock) ? emptyCard() : stockCard()}
            </div>
        </div>
    )
}

export default Card;

