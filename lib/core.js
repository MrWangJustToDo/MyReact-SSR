"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextWork = nextWork;
exports.nextWorkCommon = nextWorkCommon;

var _component = require("./component.js");

var _coreTool = require("./coreTool.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _vdom = require("./vdom.js");

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
  var assignPreviousRenderChildren = (0, _coreTool.getMatchedRenderChildren)(children, previousRenderChildren);
  parentFiber.reset();

  while (index < children.length || index < previousRenderChildren.length) {
    var newChild = children[index];
    var previousRenderChild = previousRenderChildren[index];
    var assignPreviousRenderChild = assignPreviousRenderChildren[index];
    var newFiber = isNewChildren ? (0, _coreTool.getNewFiberWithInitial)(newChild, parentFiber) : (0, _coreTool.getNewFiberWithUpdate)(newChild, parentFiber, previousRenderChild, assignPreviousRenderChild);

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
  // Provider 不存在needUpdate的状态
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
  } // improve, need unmount ...


  fiber.__vdom__.type.Context.__context__ = fiber;
  return nextWorkCommon(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function nextWorkConsumer(fiber) {
  fiber.instance = fiber.instance || new fiber.__vdom__.type.Internal();
  fiber.instance.updateDependence(fiber);
  var Component = fiber.__vdom__.type;

  if (!fiber.instance.__context__ || !fiber.instance.__context__.mount) {
    var providerFiber = fiber.instance.processContext(Component.Context);
    var context = (providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.__vdom__.props.value) || Component.Context.Provider.value;
    fiber.instance.context = context;
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
      throw new Error("not support memo(class) render, maybe need improve later, this error just a bug for MyReact");
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