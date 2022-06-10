"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextFiber = void 0;

var _instance = require("./instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} providerObject
 * @returns {MyReactFiberNode | null}
 */
var getProviderFiber = function getProviderFiber(fiber, providerObject) {
  if (fiber && providerObject) {
    if (fiber.__isObjectNode__ && fiber.__isContextProvider__ && fiber.__vdom__.type === providerObject) {
      return fiber;
    } else {
      return getProviderFiber(fiber.fiberParent, providerObject);
    }
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} contextObject
 * @returns {MyReactFiberNode | null}
 */


var getContextFiber = function getContextFiber(fiber, contextObject) {
  return getProviderFiber(fiber, contextObject === null || contextObject === void 0 ? void 0 : contextObject.Provider);
};

exports.getContextFiber = getContextFiber;