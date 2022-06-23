"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformChildrenFiber = void 0;

var _index = require("../vdom/index.js");

var _index2 = require("../fiber/index.js");

var _env = require("../env.js");

var _unmount = require("../unmount.js");

var _tool = require("../tool.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 */
var isSameTypeNode = function isSameTypeNode(newVDom, previousRenderChild) {
  if (!_env.isMounted.current) return false;
  var newVDomIsArray = Array.isArray(newVDom);
  var previousRenderChildIsArray = Array.isArray(previousRenderChild);
  if (newVDomIsArray && previousRenderChildIsArray) return true;
  if (newVDomIsArray) return false;
  if (previousRenderChildIsArray) return false;
  var previousRenderChildVDom = previousRenderChild === null || previousRenderChild === void 0 ? void 0 : previousRenderChild.__vdom__;
  var newVDomIsVDomInstance = newVDom instanceof _index.MyReactVDom;
  var previousRenderChildVDomIsVDomInstance = previousRenderChildVDom instanceof _index.MyReactVDom;

  if (newVDomIsVDomInstance && previousRenderChildVDomIsVDomInstance) {
    // key different
    if (_env.enableKeyDiff.current && newVDom.key !== previousRenderChildVDom.key) {
      return false;
    }

    return previousRenderChild.checkIsSameType(newVDom);
  }

  if (newVDomIsVDomInstance) return false;
  if (previousRenderChildVDomIsVDomInstance) return false; // fallback node

  if (newVDom === null || newVDom === false) return previousRenderChildVDom === ""; // text node

  if (_typeof(newVDom) !== "object") {
    return previousRenderChild && previousRenderChild.__isTextNode__;
  }

  return false;
};
/**
 *
 * @param {MyReactVDom[]} newChildren
 * @param {MyReactFiberNode[]} previousRenderChildren
 */


var getMatchedRenderChildren = function getMatchedRenderChildren(newChildren, previousRenderChildren) {
  if (!_env.isMounted.current) return previousRenderChildren;
  if (_env.isServerRender.current) return previousRenderChildren;
  if (_env.isHydrateRender.current) return previousRenderChildren;
  if (!_env.enableKeyDiff.current) return previousRenderChildren;
  if (!previousRenderChildren) return previousRenderChildren;
  if (previousRenderChildren.length === 0) return previousRenderChildren;
  var tempRenderChildren = previousRenderChildren.slice(0);
  var assignPreviousRenderChildren = Array(tempRenderChildren.length).fill(null);
  newChildren.forEach(function (vDom, index) {
    if (tempRenderChildren.length) {
      if (vDom instanceof _index.MyReactVDom && vDom.key !== undefined) {
        var targetIndex = tempRenderChildren.findIndex(function (fiber) {
          return fiber instanceof _index2.MyReactFiberNode && fiber.key === vDom.key;
        });

        if (targetIndex !== -1) {
          assignPreviousRenderChildren[index] = tempRenderChildren[targetIndex];
          tempRenderChildren.splice(targetIndex, 1);
        }
      }
    }
  });
  return assignPreviousRenderChildren.map(function (v) {
    if (v) return v;
    return tempRenderChildren.shift();
  });
};
/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode} parentFiber
 */


var getNewFiberWithInitial = function getNewFiberWithInitial(newVDom, parentFiber) {
  if (Array.isArray(newVDom)) {
    return newVDom.map(function (v) {
      return getNewFiberWithInitial(v, parentFiber);
    });
  }

  if (newVDom === undefined) return null;
  return (0, _index2.createNewFiberNodeWithMount)({
    fiberParent: parentFiber,
    deepIndex: parentFiber.deepIndex + 1,
    effect: "PLACEMENT"
  }, newVDom === false || newVDom === null ? "" : newVDom);
};
/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 * @param {MyReactFiberNode | MyReactFiberNode[]} matchedPreviousRenderChild
 * @returns
 */


var getNewFiberWithUpdate = function getNewFiberWithUpdate(newVDom, parentFiber, previousRenderChild, matchedPreviousRenderChild) {
  var isSameType = isSameTypeNode(newVDom, matchedPreviousRenderChild);

  if (isSameType) {
    if (Array.isArray(newVDom)) {
      matchedPreviousRenderChild = getMatchedRenderChildren(newVDom, matchedPreviousRenderChild);

      if (newVDom.length < matchedPreviousRenderChild.length) {
        // console.log(newVDom, matchedPreviousRenderChild);
        (0, _unmount.pushUnmount)(matchedPreviousRenderChild.slice(newVDom.length));
      }

      return newVDom.map(function (v, index) {
        return getNewFiberWithUpdate(v, parentFiber, previousRenderChild[index], matchedPreviousRenderChild[index]);
      });
    }

    if (matchedPreviousRenderChild === null) return null;
    var currentMatchedPreviousRenderChild = matchedPreviousRenderChild;

    if (Object.is(currentMatchedPreviousRenderChild.__vdom__, newVDom)) {
      return (0, _index2.updateFiberNodeWithPosition)(currentMatchedPreviousRenderChild, parentFiber, newVDom, previousRenderChild);
    }

    if (currentMatchedPreviousRenderChild.__isPlainNode__ && (0, _tool.isEqual)(currentMatchedPreviousRenderChild.__vdom__.props, newVDom.props)) {
      return (0, _index2.updateFiberNodeWithPosition)(currentMatchedPreviousRenderChild, parentFiber, newVDom, previousRenderChild);
    }

    if (currentMatchedPreviousRenderChild.__isMemo__ && (0, _tool.isNormalEqual)(currentMatchedPreviousRenderChild.__vdom__.props, newVDom.props)) {
      return (0, _index2.updateFiberNodeWithPosition)(currentMatchedPreviousRenderChild, parentFiber, newVDom, previousRenderChild);
    }

    if (currentMatchedPreviousRenderChild.__isContextProvider__ && (0, _tool.isNormalEqual)(currentMatchedPreviousRenderChild.__vdom__.props.value, newVDom.props.value)) {
      return (0, _index2.updateFiberNodeWithPosition)(currentMatchedPreviousRenderChild, parentFiber, newVDom, previousRenderChild);
    }

    return (0, _index2.createUpdatedFiberNodeWithUpdateAndPosition)({
      deepIndex: parentFiber.deepIndex + 1,
      fiberParent: parentFiber,
      fiberAlternate: currentMatchedPreviousRenderChild,
      effect: currentMatchedPreviousRenderChild.__isTextNode__ || currentMatchedPreviousRenderChild.__isPlainNode__ ? "UPDATE" : null
    }, newVDom === false || newVDom === null ? "" : newVDom, previousRenderChild);
  }

  if (matchedPreviousRenderChild) {
    (0, _unmount.pushUnmount)(matchedPreviousRenderChild);
  }

  if (newVDom === undefined) return null;

  if (Array.isArray(newVDom)) {
    return newVDom.map(function (v) {
      return getNewFiberWithUpdate(v, parentFiber);
    });
  }

  return (0, _index2.createNewFiberNodeWithPosition)({
    deepIndex: parentFiber.deepIndex + 1,
    fiberParent: parentFiber,
    effect: "POSITION"
  }, newVDom === false || newVDom === null ? "" : newVDom, previousRenderChild);
};
/**
 *
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactVDom | MyReactVDom[]} children
 */


var transformChildrenFiber = function transformChildrenFiber(parentFiber, children) {
  var index = 0;
  var isNewChildren = Boolean(!parentFiber.__updateRender__);
  var vdomChildren = Array.isArray(children) ? children : [children];
  var previousRenderChildren = isNewChildren ? [] : parentFiber.__renderedChildren__;
  var assignPreviousRenderChildren = getMatchedRenderChildren(vdomChildren, previousRenderChildren);
  parentFiber.beforeTransform();

  while (index < vdomChildren.length || index < previousRenderChildren.length) {
    var newChild = vdomChildren[index];
    var previousRenderChild = previousRenderChildren[index];
    var assignPreviousRenderChild = assignPreviousRenderChildren[index];
    var newFiber = isNewChildren ? getNewFiberWithInitial(newChild, parentFiber) : getNewFiberWithUpdate(newChild, parentFiber, previousRenderChild, assignPreviousRenderChild);

    parentFiber.__renderedChildren__.push(newFiber);

    index++;
  }

  return parentFiber.children;
};

exports.transformChildrenFiber = transformChildrenFiber;