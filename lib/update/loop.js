"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitUpdate = void 0;

var _share = require("../share.js");

var _debug = require("../debug.js");

var _index = require("../dom/index.js");

var _index2 = require("../fiber/index.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 */
var commitUpdate = function commitUpdate(currentFiber) {
  if (currentFiber.dom && currentFiber.__pendingUpdate__) {
    var _currentFiber$__preRe;

    (0, _index.updateDom)(currentFiber.dom, currentFiber.__isTextNode__ ? _share.EMPTY_OBJECT : ((_currentFiber$__preRe = currentFiber.__preRenderVdom__) === null || _currentFiber$__preRe === void 0 ? void 0 : _currentFiber$__preRe.props) || _share.EMPTY_OBJECT, currentFiber.__isTextNode__ ? _share.EMPTY_OBJECT : currentFiber.__vdom__.props, currentFiber);
    (0, _debug.debugWithDom)(currentFiber);
    currentFiber.applyVDom();
  }

  currentFiber.effect = null;
  currentFiber.__pendingUpdate__ = false;
};

exports.commitUpdate = commitUpdate;