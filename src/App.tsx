import React from 'react';
import * as _ from 'lodash';
import {Card, Search} from './components'

function App() {
  const defaultStocks = {
    0: '',
    1: '',
    2: ''
  }

  const [stocks, setStocks] = React.useState(defaultStocks);

  React.useEffect(() => {
      console.log(stocks)
  }, [stocks])

  const handleUpdateStock = (s: any) => {
    setStocks(s)
  }
  
  return (
    <div className="App" style={{padding: 10}}>

      <div style={{display:'flex', flexDirection: 'column', marginTop: 20, marginBottom: 20}}>
        <h2>Stock Comparison</h2>
        <small>Enter up to 3 stock to comapre the current stock prices.</small>
      </div>
      
      <div style={{marginTop: 20}}>
        <Search handleUpdateStock={handleUpdateStock} stocks={stocks}/>
      </div>

      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Card stock={_.get(stocks, [0])} />
        <Card stock={_.get(stocks, [1])} />
        <Card stock={_.get(stocks, [2])} />
      </div>
    </div>
  );
}

export default App;
