"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushUnmount = pushUnmount;
exports.runUnmount = runUnmount;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _tools = require("./tools.js");

/**
 *
 * @param {MyReactFiberNode | MyReactFiberNode[]} fiber
 */
function pushUnmount(fiber) {
  (0, _tools.mapFiber)(fiber, function (f) {
    if (!f.__pendingUnmount__) {
      f.__pendingUnmount__ = true;

      _env.pendingUnmountFiberArray.current.push(f);
    }
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function clearFiberNode(fiber) {
  fiber.children.forEach(clearFiberNode);
  fiber.hookList.forEach(function (hook) {
    if (hook.hookType === "useEffect" || hook.hookType === "useLayoutEffect") {
      hook.effect = false;
      hook.cancel && hook.cancel();
    }

    if (hook.hookType === "useContext") {
      var _hook$__context__;

      (_hook$__context__ = hook.__context__) === null || _hook$__context__ === void 0 ? void 0 : _hook$__context__.removeListener(hook);
    }
  });

  if (fiber.instance) {
    if (typeof fiber.instance.componentWillUnmount === "function") {
      fiber.instance.componentWillUnmount();
    }

    if (fiber.instance.__context__) {
      fiber.instance.__context__.removeListener(fiber.instance);
    }
  }

  fiber.mount = false;
  fiber.initial = false;
  fiber.__pendingUpdate__ = false;
  fiber.__pendingUnmount__ = false;
  fiber.__pendingPosition__ = false;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function clearFiberDom(fiber) {
  if (fiber.dom) {
    if (!fiber.__isPortal__) {
      fiber.dom.remove();
    } else {
      fiber.children.forEach(clearFiberDom);
    }
  } else {
    fiber.children.forEach(clearFiberDom);
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function runUnmount(fiber) {
  var allUnmountFiberArray = _env.pendingUnmountFiberArray.current.slice(0);

  allUnmountFiberArray.forEach(function (fiber) {
    fiber.__pendingUnmount__ = false;
    clearFiberNode(fiber);
    clearFiberDom(fiber);
  });
  _env.pendingUnmountFiberArray.current = [];
}