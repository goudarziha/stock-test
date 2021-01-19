import * as React from 'react';
import * as _ from 'lodash';
import {getStockFundamentals, getStockQuote} from '../services/stock'

interface ICardProps {
    stock: any;
}

export const Card = ({stock}: ICardProps) => {

    const [name, setName] = React.useState<string>('')
    const [eps, setEps] = React.useState<string>('')
    const [high, setHigh] = React.useState<string>('')
    const [percentChange, setPercentChange] = React.useState<string>('')
    const [low, setLow] = React.useState<string>('')
    const [price, setPrice] = React.useState<string>('')
    let ticker = ''

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
                    console.log(quote[0])
                    ticker = quote[0]
                    setHigh(quote[2])
                    setLow(quote[3])
                    setPrice(quote[4])
                    setPercentChange(quote[9])
                    console.log(_.get(res, ['data', 'Global Quote']))
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
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                    {removeStockButton(stock.ticker)}
                </div>
                <div>
                    <h3>{ticker}</h3>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>UP</div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h4>Price</h4>
                        <span>{price}</span>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3>Stats</h3>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>High</span>
                        <span>{high}</span>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <span>Low</span>
                        <span>{low}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{borderRight: '1px solid black', borderLeft: '1px solid black'}}>
            <div style={{padding: 20}}>
                {_.isEmpty(stock) || _.isUndefined(stock) ? emptyCard() : stockCard()}
            </div>
        </div>
    )
}

export default Card;

