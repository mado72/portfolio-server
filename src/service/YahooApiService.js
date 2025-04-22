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
exports.getYahooPriceTicker = async function (ticker) {
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

/**
 * Fetch monthly historical data for a set of assets.
 * 
 * @param {string[]} tickers - List of asset tickers.
 * @param {Date} startDate - Start date for the query.
 * @param {Date} endDate - End date for the query.
 * @returns {Promise<Record<string, any>>} - Historical data grouped by ticker.
 */
exports.getMonthlyHistoricalData = async function (tickers, startDate, endDate) {
  const options = {
    period1: startDate, // Período mensal Formato YYYY-MM-DD
    period2: endDate, // Período mensal Formato YYYY-MM-DD
    interval: '1mo' // Intervalo mensal
  };

  const results = {};

  for (const ticker of tickers) {
    try {
      const data = await yahooFinance.chart(ticker, options);
      results[ticker] = data;
    } catch (error) {
      console.error(`Erro ao buscar dados para o ticker ${ticker}:`, error);
      results[ticker] = { error: error.message };
    }
  }

  return results;
}

