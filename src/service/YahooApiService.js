'use strict';
const yahooFinance = require('yahoo-finance2').default;

yahooFinance.suppressNotices(['yahooSurvey']);

/**
 * Get price for a asset ticker
 * It gets from yahoo finance the actual price of a ticker defined at path variable
 *
 * ticker String 
 * returns YahooQuoteResponse
 **/
exports.getYahooPriceTicker = async function(ticker) {
  var response = await yahooFinance.quote(ticker);
  if (Array.isArray(response)) {
    response = response.reduce((acc, item) => {
      acc[item.symbol] = item;
      return acc;
    }, {})
  }
  return response;
  // return 'foi';
}
