"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoopAsync = renderLoopAsync;
exports.renderLoopSync = renderLoopSync;
exports.startRender = startRender;

var _core = require("./core.js");

var _debug = require("./debug.js");

var _effect = require("./effect.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _mount = require("./mount.js");

var _tools = require("./tools.js");

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
function transformStart(fiber) {
  var _currentTransformFibe;

  (_currentTransformFibe = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe, _toConsumableArray((0, _core.nextWork)(fiber)));
}

function transformCurrent() {
  while (_env.currentTransformFiberArray.current.length) {
    var _nextTransformFiberAr;

    var fiber = _env.currentTransformFiberArray.current.shift();

    (_nextTransformFiberAr = _env.nextTransformFiberArray.current).push.apply(_nextTransformFiberAr, _toConsumableArray((0, _core.nextWork)(fiber)));
  }
}

function transformNext() {
  while (_env.nextTransformFiberArray.current.length) {
    var _currentTransformFibe2;

    var fiber = _env.nextTransformFiberArray.current.shift();

    (_currentTransformFibe2 = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe2, _toConsumableArray((0, _core.nextWork)(fiber)));
  }
}

function transformAll() {
  transformCurrent();
  transformNext();

  if (_env.currentTransformFiberArray.current.length) {
    transformAll();
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function renderLoopSync(fiber) {
  transformStart(fiber);
  transformAll();
}
/**
 *
 * @param {() => MyReactFiberNode} getNextFiber
 * @param {() => void} cb
 */


function renderLoopAsync(getNextFiber, cb) {
  (0, _tools.updateAsyncTimeStep)();
  loopAllAsync(getNextFiber, cb);
}
/**
 *
 * @param {() => MyReactFiberNode} getNextFiber
 * @param {() => void} cb
 */


function loopAllAsync(getNextFiber, cb) {
  var shouldYield = false;

  while (!shouldYield) {
    if (_env.currentTransformFiberArray.length || _env.nextTransformFiberArray.current) {
      (0, _debug.safeCall)(transformAll);
    }

    shouldYield = (0, _tools.shouldYieldAsyncUpdateOrNot)();

    if (!shouldYield) {
      (function () {
        var nextStartUpdateFiber = getNextFiber();

        if (nextStartUpdateFiber) {
          (0, _debug.safeCall)(function () {
            return transformStart(nextStartUpdateFiber);
          });
        } else {
          shouldYield = true;
        }
      })();
    }

    var hasNext = _env.currentTransformFiberArray.current.length || _env.nextTransformFiberArray.current.length;
    shouldYield = shouldYield || !hasNext;
  }

  if (shouldYield) {
    cb();
    (0, _tools.updateAsyncTimeStep)();
  } else {
    loopAllAsync(getNextFiber, cb);
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function startRender(fiber) {
  _env.needLoop.current = true;
  (0, _debug.safeCall)(function () {
    return renderLoopSync(fiber);
  });
  (0, _debug.safeCall)(function () {
    return (0, _mount.mountStart)();
  });
  (0, _effect.runLayoutEffect)();
  (0, _effect.runEffect)();
  _env.isMounted.current = true;
  _env.needLoop.current = false;
}