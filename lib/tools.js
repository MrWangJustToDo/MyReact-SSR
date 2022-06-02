"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenChildren = exports.canNotUpdate = void 0;
exports.isEqual = isEqual;
exports.isNormalEqual = isNormalEqual;
exports.updateAsyncTimeStep = exports.shouldYieldAsyncUpdateOrNot = exports.mapFiber = void 0;

var _children = require("./children.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function isNormalEqual(src, target) {
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
}

function isEqual(src, target) {
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
}

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
    return f instanceof _fiber.MyReactFiberNode;
  }, action);
};

exports.mapFiber = mapFiber;

var updateAsyncTimeStep = function updateAsyncTimeStep() {
  _env.asyncUpdateTimeStep.current = new Date().getTime();
};

exports.updateAsyncTimeStep = updateAsyncTimeStep;

var shouldYieldAsyncUpdateOrNot = function shouldYieldAsyncUpdateOrNot() {
  return new Date().getTime() - _env.asyncUpdateTimeStep.current > _env.asyncUpdateTimeLimit;
};

exports.shouldYieldAsyncUpdateOrNot = shouldYieldAsyncUpdateOrNot;

var canNotUpdate = function canNotUpdate() {
  if (_env.isServerRender.current) throw new Error("can not update component during SSR");
  if (_env.isHydrateRender.current) throw new Error("can not update component during hydrate");
};

exports.canNotUpdate = canNotUpdate;