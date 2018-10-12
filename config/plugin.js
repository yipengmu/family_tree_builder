'use strict';

// had enabled by egg
// exports.static = true;

module.exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// config/plugin.js
module.exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};