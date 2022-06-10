"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextWorkCommon = exports.nextWork = void 0;

var _index = require("../component/index.js");

var _env = require("../env.js");

var _tool = require("./tool.js");

var _index2 = require("../fiber/index.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var nextWorkCommon = function nextWorkCommon(fiber) {
  if (fiber.__renderDynamic__) {
    return (0, _tool.transformChildrenFiber)(fiber, fiber.__vdom__.__dynamicChildren__);
  } else {
    return (0, _tool.transformChildrenFiber)(fiber, fiber.__vdom__.children);
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.nextWorkCommon = nextWorkCommon;

var nextWorkClassComponent = function nextWorkClassComponent(fiber) {
  if (!fiber.instance) {
    return (0, _index.classComponentMount)(fiber);
  } else {
    return (0, _index.classComponentUpdate)(fiber);
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkFunctionComponent = function nextWorkFunctionComponent(fiber) {
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = fiber;

  var children = fiber.__vdom__.type(fiber.__vdom__.props);

  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = null;
  fiber.__vdom__.__dynamicChildren__ = children;
  fiber.__renderDynamic__ = true;
  return nextWorkCommon(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkComponent = function nextWorkComponent(fiber) {
  if (fiber.initial || fiber.__needUpdate__) {
    if (fiber.__isFunctionComponent__) {
      return nextWorkFunctionComponent(fiber);
    } else {
      return nextWorkClassComponent(fiber);
    }
  }

  return [];
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkMemo = function nextWorkMemo(fiber) {
  if (fiber.initial || fiber.__needUpdate__) {
    var _render$prototype;

    var _fiber$__vdom__$type = fiber.__vdom__.type,
        _render = _fiber$__vdom__$type.render,
        isMyReactForwardRefRender = _fiber$__vdom__$type.isMyReactForwardRefRender;
    var render = isMyReactForwardRefRender ? _render.render : _render;
    var isClassComponent = (_render$prototype = render.prototype) === null || _render$prototype === void 0 ? void 0 : _render$prototype.isMyReactComponent;

    if (isClassComponent) {
      return nextWorkClassComponent(fiber);
    } else {
      _env.currentHookDeepIndex.current = 0;
      _env.currentFunctionFiber.current = fiber;
      var children = isMyReactForwardRefRender ? render(fiber.__vdom__.props, fiber.__vdom__.ref) : render(fiber.__vdom__.props);
      _env.currentHookDeepIndex.current = 0;
      _env.currentFunctionFiber.current = null;
      fiber.__vdom__.__dynamicChildren__ = children;
      fiber.__renderDynamic__ = true;
      return nextWorkCommon(fiber);
    }
  } else {
    return [];
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkForwardRef = function nextWorkForwardRef(fiber) {
  var render = fiber.__vdom__.type.render;
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = fiber;
  var children = render(fiber.__vdom__.props, fiber.__vdom__.ref);
  _env.currentHookDeepIndex.current = 0;
  _env.currentFunctionFiber.current = null;
  fiber.__vdom__.__dynamicChildren__ = children;
  fiber.__renderDynamic__ = true;
  return nextWorkCommon(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkProvider = function nextWorkProvider(fiber) {
  // maybe need other way to get provider state
  if (_env.isMounted.current && fiber.initial) {
    var listenerFibers = fiber.dependence.map(function (node) {
      return node.__fiber__;
    }); // update only alive fiber

    Promise.resolve().then(function () {
      return listenerFibers.filter(function (f) {
        return f.mount;
      }).forEach(function (f) {
        return f.update();
      });
    });
  } // fiber.__vdom__.type.Context.__context__ = fiber;


  return nextWorkCommon(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkConsumer = function nextWorkConsumer(fiber) {
  fiber.instance = fiber.instance || new fiber.__vdom__.type.Internal();
  fiber.instance.setFiber(fiber);
  var Component = fiber.__vdom__.type;

  if (!fiber.instance.__context__ || !fiber.instance.__context__.mount) {
    var providerFiber = (0, _index2.getContextFiber)(fiber, Component.Context);
    var context = (providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.__vdom__.props.value) || Component.Context.Provider.value;
    fiber.instance.context = context;
    fiber.instance.setContext(providerFiber);
  }

  fiber.__vdom__.__dynamicChildren__ = fiber.__vdom__.children(fiber.instance.context);
  fiber.__renderDynamic__ = true;
  return nextWorkCommon(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWorkObject = function nextWorkObject(fiber) {
  if (fiber.__isMemo__) return nextWorkMemo(fiber);
  if (fiber.__isPortal__) return nextWorkCommon(fiber);
  if (fiber.__isForwardRef__) return nextWorkForwardRef(fiber);
  if (fiber.__isContextProvider__) return nextWorkProvider(fiber);
  if (fiber.__isContextConsumer__) return nextWorkConsumer(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var nextWork = function nextWork(fiber) {
  if (!fiber.mount) return [];
  _env.currentRunningFiber.current = fiber;
  var children = [];
  if (fiber.__isDynamicNode__) children = nextWorkComponent(fiber);else if (fiber.__isObjectNode__) children = nextWorkObject(fiber);else if (!fiber.__isTextNode__) children = nextWorkCommon(fiber);
  fiber.afterTransform();
  _env.currentRunningFiber.current = null;
  return children;
};

exports.nextWork = nextWork;