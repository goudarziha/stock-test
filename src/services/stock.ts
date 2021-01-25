import axios from "axios";
import {
  encodeQueryParam,
  SYMBOL_SEARCH,
  GLOBAL_QUOTE,
  OVERVIEW,
} from "../utils";

export interface Quote {
  symbol: string;
  price: string;
  high: string;
  low: string;
}

export const searchStock = async (search: string) =>
  new Promise((resolve, reject) => {
    const url = encodeQueryParam(SYMBOL_SEARCH, search);
    try {
      axios.get(url).then((res) => {
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });

export const getStockQuote = async (ticker: string) =>
  new Promise((resolve, reject) => {
    const url = encodeQueryParam(GLOBAL_QUOTE, ticker);
    try {
      axios.get(url).then((res) => {
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });

// This call is throttled
export const getStockFundamentals = async (ticker: string) =>
  new Promise((resolve, reject) => {
    const url = encodeQueryParam(OVERVIEW, ticker);
    try {
      axios.get(url).then((res) => {
        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });
