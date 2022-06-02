"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatchedRenderChildren = getMatchedRenderChildren;
exports.getNewFiberWithInitial = getNewFiberWithInitial;
exports.getNewFiberWithUpdate = getNewFiberWithUpdate;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _tools = require("./tools.js");

var _unmount = require("./unmount.js");

var _vdom = require("./vdom.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 */
function isSameTypeNode(newVDom, previousRenderChild) {
  if (!_env.isMounted.current) return false;
  var newVDomIsArray = Array.isArray(newVDom);
  var previousRenderChildIsArray = Array.isArray(previousRenderChild);
  if (newVDomIsArray && previousRenderChildIsArray) return true;
  if (newVDomIsArray) return false;
  if (previousRenderChildIsArray) return false;
  var previousRenderChildVDom = previousRenderChild === null || previousRenderChild === void 0 ? void 0 : previousRenderChild.__vdom__;
  var newVDomIsVDomInstance = newVDom instanceof _vdom.MyReactVDom;
  var previousRenderChildVDomIsVDomInstance = previousRenderChildVDom instanceof _vdom.MyReactVDom;

  if (newVDomIsVDomInstance && previousRenderChildVDomIsVDomInstance) {
    // key different
    if (_env.enableKeyDiff.current && newVDom.key !== previousRenderChildVDom.key) {
      return false;
    }

    var result = newVDom.isSameTypeNode(previousRenderChildVDom);

    if (result) {
      if (newVDom.__isDynamicNode__ || newVDom.__isPlainNode__) {
        return newVDom.type === previousRenderChildVDom.type;
      }

      if (newVDom.__isObjectNode__) {
        return newVDom.type.type === previousRenderChildVDom.type.type;
      }

      return result;
    } else {
      return false;
    }
  }

  if (newVDomIsVDomInstance) return false;
  if (previousRenderChildVDomIsVDomInstance) return false; // text node

  if (_typeof(newVDom) !== "object") {
    return previousRenderChild && previousRenderChild.__isTextNode__;
  }

  if (newVDom === null) return previousRenderChild === null;
  return false;
}
/**
 *
 * @param {MyReactVDom[]} newChildren
 * @param {MyReactFiberNode[]} previousRenderChildren
 */


function getMatchedRenderChildren(newChildren, previousRenderChildren) {
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
      if (vDom instanceof _vdom.MyReactVDom && vDom.key !== undefined) {
        var targetIndex = tempRenderChildren.findIndex(function (fiber) {
          return fiber instanceof _fiber.MyReactFiberNode && fiber.key === vDom.key;
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
}
/**
 *
 * @param {MyReactVDom} newVDom
 * @param {MyReactFiberNode} parentFiber
 */


function getNewFiberWithInitial(newVDom, parentFiber) {
  if (Array.isArray(newVDom)) {
    return newVDom.map(function (v) {
      return getNewFiberWithInitial(v, parentFiber);
    });
  }

  if (newVDom === undefined) return null;
  return (0, _fiber.createFiberNodeWithUpdate)({
    fiberParent: parentFiber,
    deepIndex: parentFiber.deepIndex + 1,
    effect: "PLACEMENT"
  }, newVDom === false || newVDom === null ? "" : newVDom);
}
/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 * @param {MyReactFiberNode | MyReactFiberNode[]} matchedPreviousRenderChild
 * @returns
 */


function getNewFiberWithUpdate(newVDom, parentFiber, previousRenderChild, matchedPreviousRenderChild) {
  var isSameType = isSameTypeNode(newVDom, matchedPreviousRenderChild);

  if (isSameType) {
    if (Array.isArray(newVDom)) {
      matchedPreviousRenderChild = getMatchedRenderChildren(newVDom, matchedPreviousRenderChild);

      if (newVDom.length < matchedPreviousRenderChild.length) {
        (0, _unmount.pushUnmount)(matchedPreviousRenderChild.slice(newVDom.length));
      }

      return newVDom.map(function (v, index) {
        return getNewFiberWithUpdate(v, parentFiber, previousRenderChild[index], matchedPreviousRenderChild[index]);
      });
    }

    if (matchedPreviousRenderChild === null) return null; // 相同的引用  不会重新运行

    if (Object.is(matchedPreviousRenderChild.__vdom__, newVDom)) {
      return (0, _fiber.updateFiberNodeWithPosition)(matchedPreviousRenderChild, parentFiber, previousRenderChild, newVDom);
    } // 更新dom节点


    if (matchedPreviousRenderChild.__isPlainNode__ && (0, _tools.isEqual)(matchedPreviousRenderChild.__vdom__.props, newVDom.props)) {
      return (0, _fiber.updateFiberNodeWithPosition)(matchedPreviousRenderChild, parentFiber, previousRenderChild, newVDom);
    }

    if (matchedPreviousRenderChild.__isMemo__ && (0, _tools.isNormalEqual)(matchedPreviousRenderChild.__vdom__.props, newVDom.props)) {
      return (0, _fiber.updateFiberNodeWithPosition)(matchedPreviousRenderChild, parentFiber, previousRenderChild, newVDom);
    } // 优化Provider更新，方法之一


    if (matchedPreviousRenderChild.__isContextProvider__ && (0, _tools.isNormalEqual)(matchedPreviousRenderChild.__vdom__.props.value, newVDom.props.value)) {
      return (0, _fiber.updateFiberNodeWithPosition)(matchedPreviousRenderChild, parentFiber, previousRenderChild, newVDom);
    }

    return (0, _fiber.createFiberNodeWithUpdateAndPosition)({
      fiberParent: parentFiber,
      deepIndex: parentFiber.deepIndex + 1,
      // skip commit
      fiberAlternate: matchedPreviousRenderChild.__pendingUpdate__ ? matchedPreviousRenderChild.fiberAlternate : matchedPreviousRenderChild,
      dom: matchedPreviousRenderChild.dom,
      hookHead: matchedPreviousRenderChild.hookHead,
      hookFoot: matchedPreviousRenderChild.hookFoot,
      hookList: matchedPreviousRenderChild.hookList,
      listeners: matchedPreviousRenderChild.listeners,
      instance: matchedPreviousRenderChild.instance,
      effect: matchedPreviousRenderChild.__isTextNode__ || matchedPreviousRenderChild.__isPlainNode__ ? "UPDATE" : null
    }, {
      newVDom: newVDom === false || newVDom === null ? "" : newVDom,
      previousRenderFiber: previousRenderChild
    });
  }

  if (matchedPreviousRenderChild) {
    (0, _unmount.pushUnmount)(matchedPreviousRenderChild);
  }

  if (Array.isArray(newVDom)) {
    return newVDom.map(function (v) {
      return getNewFiberWithUpdate(v, parentFiber, null, null, false);
    });
  }

  if (newVDom === undefined) return null;
  return (0, _fiber.createFiberNodeWithPosition)({
    fiberParent: parentFiber,
    deepIndex: parentFiber.deepIndex + 1,
    effect: "PLACEMENT"
  }, {
    newVDom: newVDom === false || newVDom === null ? "" : newVDom,
    previousRenderFiber: previousRenderChild
  });
}