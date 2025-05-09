'use strict';

var utils = require('../utils/writer.js');
var CryptoApi = require('../service/CryptoService.js');

module.exports.getCryptoQuotesById = function (req, res, next) {
  const cryptos = req.swagger.params.cryptos.value;
  CryptoApi.getCryptoQuotesById(cryptos)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error);
    });
}
