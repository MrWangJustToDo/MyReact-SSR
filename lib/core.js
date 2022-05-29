"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextWork = nextWork;
exports.nextWorkCommon = nextWorkCommon;

var _component = require("./component.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _tools = require("./tools.js");

var _unmount = require("./unmount.js");

var _vdom = require("./vdom.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactVDom | MyReactVDom[]} newVDom
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 * @param {MyReactFiberNode | MyReactFiberNode[]} matchedPreviousRenderChild
 * @param {boolean} isSameType
 * @returns
 */
function getNewFiberWithUpdate(newVDom, parentFiber, previousRenderChild, matchedPreviousRenderChild, isSameType) {
  if (isSameType) {
    if (Array.isArray(newVDom)) {
      matchedPreviousRenderChild = getMatchedRenderChildren(newVDom, matchedPreviousRenderChild);

      if (newVDom.length < matchedPreviousRenderChild.length) {
        (0, _unmount.pushUnmount)(matchedPreviousRenderChild.slice(newVDom.length));
      }

      return newVDom.map(function (v, index) {
        return getNewFiberWithUpdate(v, parentFiber, previousRenderChild[index], matchedPreviousRenderChild[index], isSameTypeNode(v, matchedPreviousRenderChild[index]));
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
 * @param {MyReactFiberNode | MyReactFiberNode[]} previousRenderChild
 */


function isSameTypeNode(newVDom, previousRenderChild) {
  if (Array.isArray(newVDom) && Array.isArray(previousRenderChild)) return true;
  var previousRenderChildVDom = previousRenderChild === null || previousRenderChild === void 0 ? void 0 : previousRenderChild.__vdom__;

  if (newVDom instanceof _vdom.MyReactVDom && previousRenderChildVDom instanceof _vdom.MyReactVDom) {
    if (_env.enableKeyDiff.current && newVDom.key !== previousRenderChildVDom.key) return false;
    if (newVDom.__isDynamicNode__ || newVDom.__isPlainNode__) return newVDom.type === previousRenderChildVDom.type;
    if (newVDom.__isObjectNode__) // cause hook error
      return previousRenderChildVDom.__isObjectNode__ && newVDom.type.type === previousRenderChildVDom.type.type;
    if (newVDom.__isEmptyNode__) return previousRenderChildVDom.__isEmptyNode__;
    if (newVDom.__isFragmentNode__) return previousRenderChildVDom.__isFragmentNode__;
  }

  if (newVDom instanceof _vdom.MyReactVDom) return false;
  if (previousRenderChildVDom instanceof _vdom.MyReactVDom) return false;
  if (_typeof(newVDom) !== "object") return previousRenderChild && previousRenderChild.__isTextNode__;
  if (newVDom === null) return previousRenderChild === null;
  return false;
}
/**
 *
 * @param {MyReactVDom[]} newChildren
 * @param {MyReactFiberNode[]} previousRenderChildren
 */


function getMatchedRenderChildren(newChildren, previousRenderChildren) {
  if (_env.isHydrate.current) return previousRenderChildren;
  if (!_env.isMounted.current) return previousRenderChildren;
  if (_env.isServerRender.current) return previousRenderChildren;
  if (!_env.enableKeyDiff.current) return previousRenderChildren;
  if (previousRenderChildren.length === 0) return previousRenderChildren;
  var tempRenderChildren = previousRenderChildren.slice(0);
  var assignPreviousRenderChildren = Array(tempRenderChildren.length).fill(null);
  newChildren.forEach(function (vdom, index) {
    if (tempRenderChildren.length) {
      if (vdom instanceof _vdom.MyReactVDom && vdom.key !== undefined) {
        var targetIndex = tempRenderChildren.findIndex(function (fiber) {
          return fiber instanceof _fiber.MyReactFiberNode && fiber.key === vdom.key;
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
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactVDom[]} children
 */


function transformChildrenFiber(parentFiber, _children) {
  var _parentFiber$fiberAlt;

  var index = 0;
  var isNewChildren = !Boolean(parentFiber.fiberAlternate);
  var children = Array.isArray(_children) ? _children : [_children];
  var previousRenderChildren = ((_parentFiber$fiberAlt = parentFiber.fiberAlternate) === null || _parentFiber$fiberAlt === void 0 ? void 0 : _parentFiber$fiberAlt.__renderedChildren__) || [];
  var assignPreviousRenderChildren = getMatchedRenderChildren(children, previousRenderChildren);
  parentFiber.reset();

  while (index < children.length || index < previousRenderChildren.length) {
    var newChild = children[index];
    var previousRenderChild = previousRenderChildren[index];
    var assignPreviousRenderChild = assignPreviousRenderChildren[index];
    var isSameType = _env.isMounted.current && isSameTypeNode(newChild, assignPreviousRenderChild);
    var newFiber = isNewChildren ? getNewFiberWithInitial(newChild, parentFiber) : getNewFiberWithUpdate(newChild, parentFiber, previousRenderChild, assignPreviousRenderChild, isSameType);

    parentFiber.__renderedChildren__.push(newFiber);

    index++;
  }

  return parentFiber.children;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkFunctionComponent(fiber) {
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = fiber;

  var children = fiber.__vdom__.type(fiber.__vdom__.props);

  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = null;
  fiber.__vdom__.__dynamicChildren__ = children;
  return nextWorkCommon(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkClassComponent(fiber) {
  if (!fiber.instance) {
    return (0, _component.classComponentMount)(fiber);
  } else {
    return (0, _component.classComponentUpdate)(fiber);
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkComponent(fiber) {
  if (fiber.initial || fiber.__needUpdate__) {
    if (fiber.__isFunctionComponent__) {
      return nextWorkFunctionComponent(fiber);
    } else {
      return nextWorkClassComponent(fiber);
    }
  }

  return [];
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkCommon(fiber) {
  if (fiber.__vdom__.__dynamicChildren__ !== null) {
    return transformChildrenFiber(fiber, fiber.__vdom__.__dynamicChildren__);
  }

  if (fiber.__vdom__.children !== undefined) {
    return transformChildrenFiber(fiber, fiber.__vdom__.children);
  }

  return [];
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkForwardRef(fiber) {
  var render = fiber.__vdom__.type.render;
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = fiber;
  var children = render(fiber.__vdom__.props, fiber.__vdom__.ref);
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = null;
  fiber.__vdom__.__dynamicChildren__ = children;
  return nextWorkCommon(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkProvider(fiber) {
  // maybe need other way to get provider state
  if (_env.isMounted.current && fiber.initial) {
    var listenerFibers = fiber.listeners.map(function (it) {
      return it.__fiber__;
    }); // update only alive fiber

    Promise.resolve().then(function () {
      return listenerFibers.filter(function (f) {
        return f.mount;
      }).forEach(function (f) {
        return f.update();
      });
    });
  }

  return nextWorkCommon(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkConsumer(fiber) {
  if (!fiber.instance) {
    fiber.instance = new fiber.__vdom__.type.Internal();
  }

  fiber.instance.updateDependence(fiber);
  var Component = fiber.__vdom__.type;

  if (!fiber.instance.__context__ || !fiber.instance.__context__.mount) {
    var providerFiber = fiber.instance.processContext(Component.Context);
    fiber.instance.context = (providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.__vdom__.props.value) || Component.Context.Provider.value;
  }

  fiber.__vdom__.__dynamicChildren__ = fiber.__vdom__.children(fiber.instance.context);
  return nextWorkCommon(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkMemo(fiber) {
  // 对于memo组件，只有当前fiber需要运行时才运行
  if (fiber.initial || fiber.__needUpdate__) {
    var _render$prototype;

    var _fiber$__vdom__$type = fiber.__vdom__.type,
        _render = _fiber$__vdom__$type.render,
        isMyReactForwardRefRender = _fiber$__vdom__$type.isMyReactForwardRefRender;
    var render = isMyReactForwardRefRender ? _render.render : _render;
    var isClassComponent = (_render$prototype = render.prototype) === null || _render$prototype === void 0 ? void 0 : _render$prototype.isMyReactComponent;

    if (isClassComponent) {
      console.error("can not support memo(class) render");
      return [];
    } else {
      _env.currentHookDeepIndex.current = 0;
      _env.currentFunctionFiber.current = fiber;
      var children = isMyReactForwardRefRender ? render(fiber.__vdom__.props, fiber.__vdom__.ref) : render(fiber.__vdom__.props);
      _env.currentHookDeepIndex.current = 0;
      _env.currentFunctionFiber.current = null;
      fiber.__vdom__.__dynamicChildren__ = children;
      return nextWorkCommon(fiber);
    }
  } else {
    return [];
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkObject(fiber) {
  if (fiber.__isMemo__) return nextWorkMemo(fiber);
  if (fiber.__isPortal__) return nextWorkCommon(fiber);
  if (fiber.__isForwardRef__) return nextWorkForwardRef(fiber);
  if (fiber.__isContextProvider__) return nextWorkProvider(fiber);
  if (fiber.__isContextConsumer__) return nextWorkConsumer(fiber);
  throw new Error("unknown element");
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWork(fiber) {
  // maybe need warning for this
  if (!fiber.mount) return [];
  _env.currentRunningFiber.current = fiber;
  var children = [];
  if (fiber.__isDynamicNode__) children = nextWorkComponent(fiber);else if (fiber.__isObjectNode__) children = nextWorkObject(fiber);else if (!fiber.__isTextNode__) children = nextWorkCommon(fiber);
  _env.currentRunningFiber.current = null;
  fiber.updated();
  return children;
}