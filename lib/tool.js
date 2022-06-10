"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAsyncTimeStep = exports.shouldYieldAsyncUpdate = exports.once = exports.mapFiber = exports.isNormalEqual = exports.isEqual = exports.flattenChildren = exports.cannotUpdate = void 0;

var _env = require("./env.js");

var _children = require("./children.js");

var _index = require("./fiber/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {Function} action
 * @returns
 */
var once = function once(action) {
  var run = false;
  return function () {
    if (run) return;
    run = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    action.call.apply(action, [null].concat(args));
  };
};

exports.once = once;

var flattenChildren = function flattenChildren(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p.concat(flattenChildren(c));
    }, []);
  }

  return [arrayLike];
};

exports.flattenChildren = flattenChildren;

var mapFiber = function mapFiber(arrayLike, action) {
  return (0, _children.mapByJudgeFunction)(arrayLike, function (f) {
    return f instanceof _index.MyReactFiberNode;
  }, action);
};

exports.mapFiber = mapFiber;

var isEqual = function isEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (key !== "children" && !key.startsWith("__")) {
        flag = flag && isEqual(src[key], target[key]);
      }
    }

    return flag;
  }

  return Object.is(src, target);
};

exports.isEqual = isEqual;

var isNormalEqual = function isNormalEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (!key.startsWith("__")) {
        flag = flag && Object.is(src[key], target[key]);

        if (!flag) {
          return flag;
        }
      }
    }

    return flag;
  }

  return Object.is(src, target);
};

exports.isNormalEqual = isNormalEqual;

var updateAsyncTimeStep = function updateAsyncTimeStep() {
  _env.asyncUpdateTimeStep.current = new Date().getTime();
};

exports.updateAsyncTimeStep = updateAsyncTimeStep;

var shouldYieldAsyncUpdate = function shouldYieldAsyncUpdate() {
  if (!_env.asyncUpdateTimeStep.current) {
    updateAsyncTimeStep();
    return false;
  } else {
    var result = new Date().getTime() - _env.asyncUpdateTimeStep.current > _env.asyncUpdateTimeLimit.current;

    if (result) _env.asyncUpdateTimeStep.current = null;
    return result;
  }
};

exports.shouldYieldAsyncUpdate = shouldYieldAsyncUpdate;

var cannotUpdate = function cannotUpdate() {
  if (_env.isServerRender.current) throw new Error("can not update component during SSR");
  if (_env.isHydrateRender.current) throw new Error("can not update component during hydrate");
};

exports.cannotUpdate = cannotUpdate;