"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextFiber = void 0;
exports.pushFiber = pushFiber;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _symbol = require("./symbol.js");

var _tools = require("./tools.js");

var _update = require("./update.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
function pushFiber(fiber) {
  (0, _tools.canNotUpdate)();

  if (!fiber.__needUpdate__) {
    fiber.__needUpdate__ = true;
    fiber.fiberAlternate = fiber;

    if (_env.enableAsyncUpdate.current) {
      _env.pendingAsyncModifyFiberArray.current.pushValue(fiber);
    } else {
      _env.pendingSyncModifyFiberArray.current.push(fiber);
    }
  }

  (0, _update.asyncUpdate)();
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} providerObject
 * @returns {MyReactFiberNode | null}
 */


var getProviderFiber = function getProviderFiber(fiber, providerObject) {
  if (fiber) {
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
  if (!contextObject) return null;
  if (contextObject.type !== _symbol.Context) throw new Error("wrong context usage"); // 需要更多考虑
  // return contextObject.__context__ &&
  //   contextObject.__context__.mount &&
  //   fiber.deepIndex > contextObject.__context__.deepIndex
  //   ? contextObject.__context__
  //   : null;

  return getProviderFiber(fiber, contextObject.Provider);
};

exports.getContextFiber = getContextFiber;