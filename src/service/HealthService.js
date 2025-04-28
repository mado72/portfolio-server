'use strict';

exports.getHealth = function () {

  return {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Service is running',
  };
}