"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.only = exports.mapByJudgeFunction = exports.map = exports.forEach = exports.count = void 0;

var _tool = require("./tool.js");

var _index = require("./vdom/index.js");

var mapByJudgeFunction = function mapByJudgeFunction(arrayLike, judge, action) {
  var arrayChildren = (0, _tool.flattenChildren)(arrayLike);
  return arrayChildren.map(function (v, index, thisArgs) {
    if (judge(v)) {
      return action.call(thisArgs, v, index, arrayChildren);
    } else {
      return v;
    }
  });
}; // MyReact Children api, just like React


exports.mapByJudgeFunction = mapByJudgeFunction;

var map = function map(arrayLike, action) {
  return mapByJudgeFunction(arrayLike, function (v) {
    return v !== undefined;
  }, action);
};

exports.map = map;

var toArray = function toArray(arrayLike) {
  return map(arrayLike, function (vdom, index) {
    return (0, _index.cloneElement)(vdom, {
      key: vdom.key !== undefined ? ".$".concat(vdom.key) : ".".concat(index)
    });
  });
};

exports.toArray = toArray;

var forEach = function forEach(arrayLike, action) {
  mapByJudgeFunction(arrayLike, function (v) {
    return v !== undefined;
  }, action);
};

exports.forEach = forEach;

var count = function count(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p + count(c);
    }, 0);
  }

  return 1;
};

exports.count = count;

var only = function only(child) {
  if ((0, _index.isValidElement)(child)) return child;
  if (typeof child === "string" || typeof child === "number") return child;
  throw new Error("Children.only expected to receive a single MyReact element child.");
};

exports.only = only;