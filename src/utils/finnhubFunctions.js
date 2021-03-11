const finnhub = require('finnhub')

// Finnhub Api-Key and Finnhub client
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c0g00d748v6rp6j6ei0g"
const finnhubClient = new finnhub.DefaultApi()

// Stock candles
const stockCandles = (ticker, callback) => {
    finnhubClient.stockCandles(ticker, "D", 1590988249, 1591852249, {}, (error, data, response) => {
        callback(undefined, data);
    });
}
    

module.exports = {
    stockCandles: stockCandles
}