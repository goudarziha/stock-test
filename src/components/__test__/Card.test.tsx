import * as React from 'react'
import ReactDOM from 'react-dom'
import {Card} from '../Card'

it('render', () => {
    const div = document.createElement('div')
    const sampleStock = {
        name: 'Tesla',
        eps: '3.19',
        high: '420.00',
        low: '410.00',
        percentChange: '0.23',
        price: '414.00',
        ticker: 'tsla'
    }
    ReactDOM.render(<Card stock={sampleStock}/>, div);
})