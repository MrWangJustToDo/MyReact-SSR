"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runPosition = exports.pushPosition = void 0;

var _index = require("./fiber/index.js");

var _env = require("./env.js");

var _debug = require("./debug.js");

var _client = require("./dom/client.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var prepareFiberDom = function prepareFiberDom(fiber) {
  fiber.dom = fiber.dom || (0, _client.createBrowserDom)(fiber);
  fiber.applyRef();
  fiber.applyVDom();
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} beforeDom
 * @param {HTMLElement} parentDom
 */


var insertBefore = function insertBefore(fiber, beforeDom, parentDom) {
  if (!fiber) throw new Error("not a valid position action");
  fiber.effect = null;
  fiber.__pendingMount__ = false;
  if (fiber.__isPortal__) return;

  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    prepareFiberDom(fiber);
    (0, _debug.debugWithDom)(fiber);
    return parentDom.insertBefore(fiber.dom, beforeDom);
  }

  fiber.children.forEach(function (f) {
    return insertBefore(f, beforeDom, parentDom);
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


var append = function append(fiber, parentDom) {
  if (!fiber) throw new Error("not a valid position action");
  fiber.effect = null;
  fiber.__pendingMount__ = false;
  if (fiber.__isPortal__) return;

  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    prepareFiberDom(fiber);
    (0, _debug.debugWithDom)(fiber);
    return parentDom.append(fiber.dom);
  }

  fiber.children.forEach(function (f) {
    return append(f, parentDom);
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var getPlainNodeDom = function getPlainNodeDom(fiber) {
  if (fiber) {
    if (fiber.__isPortal__) return null;
    if (fiber.__isPlainNode__ || fiber.__isTextNode__) return fiber.dom;
    return getPlainNodeDom(fiber.child);
  } else {
    return null;
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var getInsertBeforeDomFromSibling = function getInsertBeforeDomFromSibling(fiber) {
  if (!fiber) return null;
  var sibling = fiber.fiberSibling;

  if (sibling) {
    return getPlainNodeDom(sibling) || getInsertBeforeDomFromSibling(sibling.fiberSibling);
  } else {
    return null;
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} parentFiberWithDom
 */


var getInsertBeforeDomFromSiblingAndParent = function getInsertBeforeDomFromSiblingAndParent(fiber, parentFiberWithDom) {
  if (!fiber) return null;
  if (fiber === parentFiberWithDom) return null;
  var beforeDom = getInsertBeforeDomFromSibling(fiber);
  if (beforeDom) return beforeDom;
  return getInsertBeforeDomFromSiblingAndParent(fiber.fiberParent, parentFiberWithDom);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @returns {MyReactFiberNode}
 */


var getParentFiberWithDom = function getParentFiberWithDom(fiber) {
  if (!fiber) return _env.rootFiber.current;
  if (fiber.__isPortal__ || fiber.__isPlainNode__ || fiber.__isTextNode__) return fiber;
  return getParentFiberWithDom(fiber.fiberParent);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var commitPosition = function commitPosition(fiber) {
  var children = fiber.children;

  if (children.some(function (child) {
    return child.__diffMount__;
  })) {
    var parentFiberWithDom = getParentFiberWithDom(fiber);

    for (var i = children.length - 1; i >= 0; i--) {
      var childFiber = children[i];

      if (childFiber.__diffMount__) {
        // can not create before dom
        var beforeDom = getInsertBeforeDomFromSiblingAndParent(childFiber, parentFiberWithDom);

        if (beforeDom) {
          insertBefore(childFiber, beforeDom, parentFiberWithDom.dom);
        } else {
          append(childFiber, parentFiberWithDom.dom);
        }

        childFiber.__diffMount__ = false;
        childFiber.__diffPrevRender__ = null;
      }
    }
  }
};

var runPosition = function runPosition() {
  var allPositionArray = _env.pendingPositionFiberArray.current.slice(0);

  allPositionArray.forEach(function (fiber) {
    if (fiber.mount && fiber.__pendingPosition__) {
      fiber.__pendingPosition__ = false;
      (0, _debug.safeCallWithFiber)({
        action: function action() {
          return commitPosition(fiber);
        },
        fiber: fiber
      });
    } else {
      console.error("position error");
    }
  });
  _env.pendingPositionFiberArray.current = [];
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} previousRenderChild
 */


exports.runPosition = runPosition;

var pushPosition = function pushPosition(fiber, previousRenderChild) {
  if (!fiber.__diffMount__) {
    fiber.__diffMount__ = true;
    fiber.__diffPrevRender__ = previousRenderChild;
    var parentFiber = fiber.fiberParent;

    if (!parentFiber.__pendingPosition__) {
      parentFiber.__pendingPosition__ = true;

      _env.pendingPositionFiberArray.current.push(parentFiber);
    }
  }
};

exports.pushPosition = pushPosition;