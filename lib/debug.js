"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logHook = exports.logFiber = exports.logCurrentRunningFiber = exports.getFiberNodeName = exports.debuggerFiber = void 0;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _hook = require("./hook.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var getFiberNodeName = function getFiberNodeName(fiber) {
  if (fiber.__root__) return "<Root />";
  if (fiber.__isTextNode__) return "<text - (".concat(fiber.__vdom__, ") />");
  if (fiber.__isPlainNode__) return "<".concat(fiber.__vdom__.type, " />");
  if (fiber.__isDynamicNode__) return "<".concat(fiber.__vdom__.type.name || "Unknown", " * />");
  if (fiber.__isFragmentNode__) return "<Fragment />";

  if (fiber.__isObjectNode__) {
    if (fiber.__isForwardRef__) return "<ForwardRef />";
    if (fiber.__isPortal__) return "<Portal />";
    if (fiber.__isContextProvider__) return "<Provider />";
    if (fiber.__isContextConsumer__) return "<Consumer />";
    if (fiber.__isMemo__) return "<Memo />";
  }

  if (fiber.__isEmptyNode__) return "<Empty />";
  throw new Error("unknow fiber type");
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.getFiberNodeName = getFiberNodeName;

var logFiber = function logFiber(fiber) {
  if (fiber) {
    var parent = fiber.fiberParent;
    var res = "fond in --> ".concat(getFiberNodeName(fiber));

    while (parent) {
      res = "".padStart(12) + "".concat(getFiberNodeName(parent), "\n").concat(res);
      parent = parent.fiberParent;
    }

    return "\n" + res;
  } else {
    return "";
  }
};

exports.logFiber = logFiber;

var logCurrentRunningFiber = function logCurrentRunningFiber() {
  return logFiber(_env.currentRunningFiber.current);
};
/**
 *
 * @param {MyReactHookNode} hookNode
 * @param {string} newHookType
 */


exports.logCurrentRunningFiber = logCurrentRunningFiber;

var logHook = function logHook(hookNode, newHookType) {
  var re = "";
  var prevHook = hookNode.hookPrev;

  while (prevHook) {
    re = (prevHook.hookIndex + 1).toString().padEnd(6) + prevHook.hookType.padEnd(20) + prevHook.hookType.padEnd(10) + "\n" + re;
    prevHook = prevHook.hookPrev;
  }

  re = "".padEnd(6) + "-".padEnd(30, "-") + "\n" + re;
  re = "".padEnd(6) + "Previous render".padEnd(20) + "Next render".padEnd(10) + "\n" + re;
  re = re + "--->".padEnd(6) + hookNode.hookType.padEnd(20) + newHookType.padEnd(10);
  return re;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.logHook = logHook;

var debuggerFiber = function debuggerFiber(fiber) {
  if (fiber !== null && fiber !== void 0 && fiber.dom) {
    fiber.dom.__fiber__ = fiber;
    fiber.dom.__vdom__ = fiber.__vdom__;
    fiber.dom.__children__ = fiber.children;
  }
};

exports.debuggerFiber = debuggerFiber;