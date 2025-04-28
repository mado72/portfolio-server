'use strict';

var utils = require('../utils/writer.js');
var ThreasureApi = require('../service/ThreasuryService.js');

module.exports.getAllBonds = function (req, res, next) {
  ThreasureApi.getAllBonds()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.getBondsByType = function (req, res, next) {
  const bondTypes = req.swagger.params.bondType.value.split(',');
  ThreasureApi.getBondsByType(bondTypes)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}

module.exports.getBondsById = function (req, res, next) {
  const bonds = req.swagger.params.bonds.value;
  ThreasureApi.getBondsById(bonds)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}
