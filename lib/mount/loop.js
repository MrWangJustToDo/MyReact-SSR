"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountLoop = void 0;

var _index = require("../fiber/index.js");

var _env = require("../env.js");

var _debug = require("../debug.js");

var _index2 = require("../dom/index.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */
var commitMount = function commitMount(currentFiber, parentDom) {
  if (currentFiber.__isTextNode__ || currentFiber.__isPlainNode__) {
    if (_env.isServerRender.current) {
      (0, _index2.commitServer)(currentFiber, parentDom);
    } else if (_env.isHydrateRender.current) {
      (0, _index2.commitHydrate)(currentFiber, parentDom);
    } else {
      (0, _index2.commitClient)(currentFiber, parentDom);
    }

    (0, _debug.debugWithDom)(currentFiber);
  }

  currentFiber.effect = null;
  currentFiber.fiberAlternate = null;
  currentFiber.__pendingMount__ = false;
};
/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */


var mountLoop = function mountLoop(currentFiber, parentDom) {
  if (currentFiber && currentFiber.mount) {
    (0, _debug.safeCallWithFiber)({
      action: function action() {
        return commitMount(currentFiber, parentDom);
      },
      fiber: currentFiber
    });
  }

  currentFiber.children.forEach(function (f) {
    return mountLoop(f, currentFiber.dom || parentDom);
  });
};

exports.mountLoop = mountLoop;