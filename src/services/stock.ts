import axios from "axios"

export interface Quote {
    symbol: string;
    price: string;
    high: string;
    low: string;
}

export const searchStock = async (search: string) => new Promise((resolve, reject) => {
    const url = encodeQueryParam('SYMBOL_SEARCH', search)
    try {
        axios.get(url).then(res => {
            resolve(res)
        })
    } catch(err) {
        reject(err)
    }
})

export const getStockQuote = async (ticker: string) => new Promise((resolve, reject) => {
    const url = encodeQueryParam('GLOBAL_QUOTE', ticker)
    try {
        axios.get(url).then(res => {
            resolve(res)
        })
    } catch(err) {
        reject(err)
    }
})

// This call is throttled
export const getStockFundamentals = async (ticker: string) => new Promise((resolve, reject) => {
    const url = encodeQueryParam('OVERVIEW', ticker)
    try {
        axios.get(url).then(res => {
            resolve(res)
        })
    } catch(err) {
        reject(err)
    }
})

const getBaseUrl = () => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_BASE_URL = process.env.REACT_APP_API_URL
    return `${API_BASE_URL}/query/?apikey=${API_KEY}`
}

const encodeQueryParam = (func: string, ticker: string) => {
    const baseUrl = getBaseUrl();
    let searchParam = ''
    if (func === 'SYMBOL_SEARCH') {
        searchParam = 'keywords'
    } 

    if (func === 'GLOBAL_QUOTE' || func === 'OVERVIEW') {
        searchParam = 'symbol'
    }
    return `${baseUrl}&function=${func}&${searchParam}=${ticker}`
}