"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoopSync = exports.renderLoopAsync = void 0;

var _index = require("../core/index.js");

var _index2 = require("../fiber/index.js");

var _env = require("../env.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var transformStart = function transformStart(fiber) {
  var _currentTransformFibe;

  (_currentTransformFibe = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe, _toConsumableArray((0, _index.nextWork)(fiber)));
};

var transformCurrent = function transformCurrent() {
  while (_env.currentTransformFiberArray.current.length) {
    var _nextTransformFiberAr;

    var fiber = _env.currentTransformFiberArray.current.shift();

    (_nextTransformFiberAr = _env.nextTransformFiberArray.current).push.apply(_nextTransformFiberAr, _toConsumableArray((0, _index.nextWork)(fiber)));
  }
};

var transformNext = function transformNext() {
  while (_env.nextTransformFiberArray.current.length) {
    var _currentTransformFibe2;

    var fiber = _env.nextTransformFiberArray.current.shift();

    (_currentTransformFibe2 = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe2, _toConsumableArray((0, _index.nextWork)(fiber)));
  }
};

var transformAll = function transformAll() {
  transformCurrent();
  transformNext();

  if (_env.currentTransformFiberArray.current.length) {
    transformAll();
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var renderLoopSync = function renderLoopSync(fiber) {
  transformStart(fiber);
  transformAll();
};
/**
 *
 * @param {() => MyReactFiberNode} getNextFiber
 * @param {() => void} cb
 * @param {() => void} final
 */


exports.renderLoopSync = renderLoopSync;

var renderLoopAsync = function renderLoopAsync(getNextFiber, cb, _final) {
  var count = 0;
  var fiber = null;

  while (fiber = getNextFiber()) {
    count++;
    renderLoopSync(fiber);
  }

  if (count) {
    cb();
  }

  _final();
};

exports.renderLoopAsync = renderLoopAsync;