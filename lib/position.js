"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUpdatePosition = processUpdatePosition;
exports.runPosition = runPosition;

var _debug = require("./debug.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _tools = require("./tools.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} beforeDom
 * @param {HTMLElement} parentDom
 */
function insertBefore(fiber, beforeDom, parentDom) {
  if (!fiber) throw new Error("意料之外的错误");
  fiber.effect = null;
  if (fiber.__isPortal__) return;

  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    (0, _debug.debuggerFiber)(fiber);
    return parentDom.insertBefore(fiber.dom, beforeDom);
  }

  fiber.children.forEach(function (f) {
    return insertBefore(f, beforeDom, parentDom);
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


function append(fiber, parentDom) {
  if (!fiber) throw new Error("意料之外的错误");
  fiber.effect = null;
  if (fiber.__isPortal__) return;

  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    (0, _debug.debuggerFiber)(fiber);
    return parentDom.append(fiber.dom);
  }

  fiber.children.forEach(function (f) {
    return append(f, parentDom);
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function pushPosition(fiber) {
  if (!fiber.__pendingPosition__) {
    fiber.__pendingPosition__ = true;

    _env.pendingPositionFiberArray.current.push(fiber);
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function getPlainNodeDom(fiber) {
  if (fiber.__isPortal__) return null;
  if (fiber.__isPlainNode__ || fiber.__isTextNode__) return fiber.dom;
  return getPlainNodeDom(fiber.child);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function getInsertBeforeDomFromSibling(fiber) {
  var sibling = fiber.fiberSibling;

  if (sibling) {
    return getPlainNodeDom(sibling) || getInsertBeforeDomFromSibling(sibling.fiberSibling);
  } else {
    return null;
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function getInsertBeforeDomFromSiblingAndParent(fiber) {
  var beforeDom = getInsertBeforeDomFromSibling(fiber);
  if (beforeDom) return beforeDom;
  var parentSibling = fiber.fiberParent.fiberSibling;

  if (parentSibling) {
    if (parentSibling.__isPlainNode__ || parentSibling.__isTextNode__) {
      return parentSibling.dom;
    } else if (parentSibling.child) {
      return getInsertBeforeDomFromSiblingAndParent(parentSibling.child);
    } else {
      return null;
    }
  }

  return null;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function commitPosition(fiber) {
  var children = fiber.children;

  for (var i = children.length - 1; i >= 0; i--) {
    var childFiber = children[i];

    if (childFiber.__diffMount__) {
      if (fiber.__isPlainNode__ || fiber.__isPortal__) {
        var beforeDom = getInsertBeforeDomFromSibling(childFiber);

        if (beforeDom) {
          insertBefore(childFiber, beforeDom, fiber.dom);
        } else {
          append(childFiber, fiber.dom);
        }
      } else {
        var _beforeDom = getInsertBeforeDomFromSiblingAndParent(childFiber);

        if (_beforeDom) {
          insertBefore(childFiber, _beforeDom, (0, _tools.getDom)(fiber, function (f) {
            return f.fiberParent;
          }) || _env.rootContainer.current);
        } else {
          append(childFiber, (0, _tools.getDom)(fiber, function (f) {
            return f.fiberParent;
          }) || _env.rootContainer.current);
        }
      }

      childFiber.__diffMount__ = false;
      childFiber.__diffPrevRender__ = null;
    }
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function runPosition(fiber) {
  var allPositionArray = _env.pendingPositionFiberArray.current.slice(0);

  allPositionArray.forEach(function (fiber) {
    fiber.__pendingPosition__ = false;
    commitPosition(fiber);
  });
  _env.pendingPositionFiberArray.current = [];
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} previousRenderChild
 */


function processUpdatePosition(fiber, previousRenderChild) {
  if (!fiber.__diffMount__) {
    fiber.__diffMount__ = true;
    fiber.__diffPrevRender__ = previousRenderChild;
    pushPosition(fiber.fiberParent);
  }
}