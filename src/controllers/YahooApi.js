'use strict';

var utils = require('../utils/writer.js');
var YahooApi = require('../service/YahooApiService');

module.exports.getYahooPriceTicker = function (req, res, next) {
  YahooApi.getYahooPriceTicker(req.swagger.params.ticker.value)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getYahooPriceTickerArray = function (req, res, next) {
  YahooApi.getYahooPriceTicker(req.swagger.params.ticker.value)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMonthlyHistoricalData = function (req, res, next) {
  const tickers = req.swagger.params.ticker.value;
  const startDate = req.swagger.params.startDate.value;
  const endDate = req.swagger.params.endDate.value;

  YahooApi.getMonthlyHistoricalData(tickers, startDate, endDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}


