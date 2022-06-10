"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHookNode = void 0;

var _debug = require("../debug.js");

var _index = require("../fiber/index.js");

var _feature = require("./feature.js");

var _instance = require("./instance.js");

// from react source code
var defaultReducer = function defaultReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
};
/**
 *
 * @param {{hookIndex: number, value: any, reducer: Function, depArray: any[], hookType: string}} param
 * @param {MyReactFiberNode} fiber
 */


var createHookNode = function createHookNode(_ref, fiber) {
  var hookIndex = _ref.hookIndex,
      value = _ref.value,
      reducer = _ref.reducer,
      depArray = _ref.depArray,
      hookType = _ref.hookType;
  var newHookNode = new _instance.MyReactHookNode(hookIndex, value, reducer || defaultReducer, depArray, hookType);
  newHookNode.setFiber(fiber);
  fiber.addHook(newHookNode);
  fiber.checkHook(newHookNode);
  newHookNode.initialResult();
  return newHookNode;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {number} hookIndex
 * @param {any} value
 * @param {any[]} depArray
 * @param {string} hookType
 */


var getHookNode = function getHookNode(fiber, hookIndex, value, reducer, depArray, hookType) {
  if (!fiber) throw new Error("can not use hook out of component");
  var currentHook = null;

  if (fiber.hookList.length > hookIndex) {
    currentHook = fiber.hookList[hookIndex];

    if (currentHook.hookType !== hookType) {
      throw new Error((0, _debug.getHookTree)(currentHook, hookType));
    }

    currentHook.setFiber(fiber);
    currentHook.updateResult(value, reducer, depArray);
  } else if (!fiber.fiberAlternate) {
    currentHook = createHookNode({
      hookIndex: hookIndex,
      hookType: hookType,
      depArray: depArray,
      reducer: reducer,
      value: value
    }, fiber);
  } else {
    var temp = {
      hookType: "undefined",
      hookIndex: hookIndex
    };
    temp.__fiber__ = fiber;
    fiber.hookFoot.hookNext = temp;
    throw new Error((0, _debug.getHookTree)(temp, hookType));
  }

  if (currentHook.effect) {
    (0, _feature.pushHookEffect)(currentHook);
  }

  return currentHook;
};

exports.getHookNode = getHookNode;