"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitUpdate = void 0;

var _debug = require("../debug.js");

var _index = require("../dom/index.js");

var _index2 = require("../fiber/index.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 */
var commitUpdate = function commitUpdate(currentFiber) {
  if (currentFiber.dom && currentFiber.__pendingUpdate__) {
    (0, _index.updateDom)(currentFiber.dom, currentFiber.__isTextNode__ ? {} : currentFiber.fiberAlternate.__vdom__.props, currentFiber.__isTextNode__ ? {} : currentFiber.__vdom__.props, currentFiber);
    (0, _debug.debugWithDom)(currentFiber);
  }

  currentFiber.effect = null;
  currentFiber.fiberAlternate = null;
  currentFiber.__pendingUpdate__ = false;
};

exports.commitUpdate = commitUpdate;