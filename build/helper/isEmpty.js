"use strict";

/* eslint-disable no-nested-ternary */
module.exports = function (val) {
  return !val ? true : val.constructor.name === 'Object' ? !Object.keys(val).length > 0 : val.constructor.name === 'Array' ? !val.length > 0 : val.constructor.name === 'Boolean' ? false : val.constructor.name === 'Number' ? false : !val.trim().length > 0;
};