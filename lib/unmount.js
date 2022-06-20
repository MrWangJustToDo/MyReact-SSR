"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountFiberNode = exports.runUnmount = exports.pushUnmount = void 0;

var _tool = require("./tool.js");

var _env = require("./env.js");

var _index = require("./fiber/index.js");

/**
 *
 * @param {MyReactFiberNode | MyReactFiberNode[]} fiber
 */
var pushUnmount = function pushUnmount(fiber) {
  (0, _tool.mapFiber)(fiber, function (f) {
    if (!f.__pendingUnmount__) {
      f.__pendingUnmount__ = true;

      _env.pendingUnmountFiberArray.current.push(f);
    }
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.pushUnmount = pushUnmount;

var clearFiberNode = function clearFiberNode(fiber) {
  fiber.children.forEach(clearFiberNode);
  fiber.hookList.forEach(function (hook) {
    if (hook.hookType === "useEffect" || hook.hookType === "useLayoutEffect") {
      hook.effect = false;
      hook.cancel && hook.cancel();
    }

    if (hook.hookType === "useContext" && hook.__context__) {
      hook.__context__.removeDependence(hook);
    }
  });

  if (fiber.instance) {
    if (fiber.instance.componentWillUnmount) {
      fiber.instance.componentWillUnmount();
    }

    if (fiber.instance.__context__) {
      fiber.instance.__context__.removeDependence(fiber.instance);
    }
  }

  fiber.mount = false;
  fiber.initial = false;
  fiber.__needUpdate__ = false;
  fiber.__pendingMount__ = false;
  fiber.__pendingUpdate__ = false;
  fiber.__pendingUnmount__ = false;
  fiber.__pendingPosition__ = false;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var clearFiberDom = function clearFiberDom(fiber) {
  if (fiber.dom) {
    if (!fiber.__isPortal__) {
      var _fiber$dom$remove, _fiber$dom;

      (_fiber$dom$remove = (_fiber$dom = fiber.dom).remove) === null || _fiber$dom$remove === void 0 ? void 0 : _fiber$dom$remove.call(_fiber$dom);
    } else {
      fiber.children.forEach(clearFiberDom);
    }
  } else {
    fiber.children.forEach(clearFiberDom);
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var unmountFiberNode = function unmountFiberNode(fiber) {
  clearFiberNode(fiber);
  clearFiberDom(fiber);
};

exports.unmountFiberNode = unmountFiberNode;

var runUnmount = function runUnmount() {
  var allUnmountFiberArray = _env.pendingUnmountFiberArray.current.slice(0);

  allUnmountFiberArray.forEach(unmountFiberNode);
  _env.pendingUnmountFiberArray.current = [];
};

exports.runUnmount = runUnmount;