'use strict';

var utils = require('../utils/writer.js');
var YahooApi = require('../service/YahooApiService');

module.exports.getYahooPriceTicker = function getYahooPriceTicker (req, res, next) {
  YahooApi.getYahooPriceTicker(req.swagger.params.ticker.value)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getYahooPriceTickerArray = function getYahooPriceTicker (req, res, next) {
  YahooApi.getYahooPriceTicker(req.swagger.params.ticker.value)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


