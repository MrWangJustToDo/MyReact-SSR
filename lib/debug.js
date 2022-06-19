"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.safeCallWithFiber = exports.safeCall = exports.getHookTree = exports.getFiberTree = exports.error = exports.debugWithDom = void 0;

var _env = require("./env.js");

var _index = require("./fiber/index.js");

var _instance = require("./hook/instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var trackDevLog = function trackDevLog(fiber) {
  var _vdom$props, _vdom$type;

  var showDisplayName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var vdom = fiber.__vdom__;
  var source = vdom === null || vdom === void 0 ? void 0 : (_vdom$props = vdom.props) === null || _vdom$props === void 0 ? void 0 : _vdom$props.__source;
  var displayName = (vdom === null || vdom === void 0 ? void 0 : (_vdom$type = vdom.type) === null || _vdom$type === void 0 ? void 0 : _vdom$type.displayName) || "";
  var preString = showDisplayName && displayName ? " - ".concat(displayName, " ") : "";

  if (source) {
    var fileName = source.fileName,
        lineNumber = source.lineNumber;
    return "".concat(preString, " (").concat(fileName, ":").concat(lineNumber, ")");
  } else {
    return "".concat(preString);
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var getFiberNodeName = function getFiberNodeName(fiber) {
  if (fiber.__root__) return "<Root />".concat(trackDevLog(fiber));
  if (fiber.__isMemo__) return "<Memo />".concat(trackDevLog(fiber));
  if (fiber.__isPortal__) return "<Portal />".concat(trackDevLog(fiber));
  if (fiber.__isEmptyNode__) return "<Empty />".concat(trackDevLog(fiber));
  if (fiber.__isForwardRef__) return "<ForwardRef />".concat(trackDevLog(fiber));
  if (fiber.__isFragmentNode__) return "<Fragment />".concat(trackDevLog(fiber));
  if (fiber.__isContextProvider__) return "<Provider />".concat(trackDevLog(fiber));
  if (fiber.__isContextConsumer__) return "<Consumer />".concat(trackDevLog(fiber));
  if (fiber.__isPlainNode__) return "<".concat(fiber.__vdom__.type, " />").concat(trackDevLog(fiber));
  if (fiber.__isTextNode__) return "<text - (".concat(fiber.__vdom__, ") />").concat(trackDevLog(fiber));
  if (fiber.__isDynamicNode__) return "<".concat(fiber.__vdom__.type.displayName || fiber.__vdom__.type.name || "Unknown", " */> ").concat(trackDevLog(fiber, false));
  return "<Undefined />".concat(trackDevLog(fiber));
};

var preString = "".padEnd(4) + "at".padEnd(4);
/**
 *
 * @param {MyReactFiberNode} fiber
 */

var getFiberTree = function getFiberTree(fiber) {
  if (fiber) {
    var parent = fiber.fiberParent;
    var res = preString + "".concat(getFiberNodeName(fiber));

    while (parent) {
      res = preString + "".concat(getFiberNodeName(parent), "\n") + res;
      parent = parent.fiberParent;
    }

    return "\n" + res;
  }

  return "";
};

exports.getFiberTree = getFiberTree;
var cache = {};
/**
 *
 * @param {{message: string, fiber: MyReactFiberNode}} param
 */

var warning = function warning(_ref) {
  var message = _ref.message,
      fiber = _ref.fiber,
      treeOnce = _ref.treeOnce;
  var tree = getFiberTree(fiber || _env.currentRunningFiber.current);

  if (treeOnce) {
    if (cache[tree]) return;
    cache[tree] = true;
  }

  console.warn("[warning]:", "\n-----------------------------------------\n", "".concat(message), "\n-----------------------------------------\n", "component tree:", tree);
};
/**
 *
 * @param {{message: string, fiber: MyReactFiberNode}} param
 */


exports.warning = warning;

var error = function error(_ref2) {
  var message = _ref2.message,
      fiber = _ref2.fiber;
  console.error("[error]:", "\n-----------------------------------------\n", "".concat(message), "\n-----------------------------------------\n", "component tree:", getFiberTree(fiber || _env.currentRunningFiber.current));
  throw new Error(message);
};
/**
 *
 * @param {MyReactHookNode} hookNode
 * @param {string} newHookType
 */


exports.error = error;

var getHookTree = function getHookTree(hookNode, newHookType) {
  var fiber = hookNode.__fiber__;
  var currentHook = fiber.hookHead;
  var re = "\n" + "".padEnd(6) + "Prev render:".padEnd(20) + "Next render:".padEnd(10) + "\n";

  while (currentHook !== hookNode) {
    if (currentHook) {
      re += (currentHook.hookIndex + 1).toString().padEnd(6) + currentHook.hookType.padEnd(20) + currentHook.hookType.padEnd(10) + "\n";
      currentHook = currentHook.hookNext;
    } else {
      break;
    }
  }

  re += (hookNode.hookIndex + 1).toString().padEnd(6) + hookNode.hookType.padEnd(20) + newHookType.padEnd(10) + "\n";
  re += "".padEnd(6) + "^".repeat(30) + "\n";
  return re;
};

exports.getHookTree = getHookTree;

var safeCall = function safeCall(action) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return action.call.apply(action, [null].concat(args));
  } catch (e) {
    error({
      message: e !== null && e !== void 0 && e.stack ? e.stack : e.message
    });
  }
};

exports.safeCall = safeCall;

var safeCallWithFiber = function safeCallWithFiber(_ref3) {
  var action = _ref3.action,
      fiber = _ref3.fiber;

  try {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return action.call.apply(action, [null].concat(args));
  } catch (e) {
    error({
      message: e !== null && e !== void 0 && e.stack ? e.message + "\n" + e.stack : e.message,
      fiber: fiber
    });
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.safeCallWithFiber = safeCallWithFiber;

var debugWithDom = function debugWithDom(fiber) {
  if (fiber !== null && fiber !== void 0 && fiber.dom) {
    fiber.dom.__fiber__ = fiber;
    fiber.dom.__vdom__ = fiber.__vdom__;
    fiber.dom.__children = fiber.children;
  }
};

exports.debugWithDom = debugWithDom;