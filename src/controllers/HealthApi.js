'use strict';

var utils = require('../utils/writer.js');
var HealthApi = require('../service/HealthService.js');

module.exports.getHealth = function (req, res, next) {
  const status = HealthApi.getHealth();
  utils.writeJson(res, status);
};