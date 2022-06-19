"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classComponentUpdate = exports.classComponentMount = void 0;

var _effect = require("../effect.js");

var _debug = require("../debug.js");

var _index = require("../core/index.js");

var _index2 = require("../fiber/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var processComponentStateFromProps = function processComponentStateFromProps(fiber) {
  var Component = fiber.__isDynamicNode__ ? fiber.__vdom__.type : fiber.__vdom__.type.render;
  var newState = null;

  if (typeof Component.getDerivedStateFromProps === "function") {
    newState = Component.getDerivedStateFromProps(fiber.__vdom__.props, fiber.instance.state);
  }

  return newState;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentStateFromPropsOnMountAndUpdate = function processComponentStateFromPropsOnMountAndUpdate(fiber) {
  var newState = processComponentStateFromProps(fiber);
  fiber.instance.__nextState__ = Object.assign({}, fiber.instance.state, fiber.instance.__nextState__, newState);
  return fiber.instance.__nextState__;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentInstanceRefOnMountAndUpdate = function processComponentInstanceRefOnMountAndUpdate(fiber) {
  if (fiber.__vdom__.ref) {
    if (typeof fiber.__vdom__.ref === "function") {
      fiber.__vdom__.ref(fiber.instance);
    } else if (_typeof(fiber.__vdom__.ref) === "object") {
      fiber.__vdom__.ref.current = fiber.instance;
    }
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentInstanceOnMount = function processComponentInstanceOnMount(fiber) {
  var _Component$contextTyp;

  var Component = fiber.__isDynamicNode__ ? fiber.__vdom__.type : fiber.__vdom__.type.render;
  var providerFiber = (0, _index2.getContextFiber)(fiber, Component.contextType);
  var context = providerFiber ? providerFiber.__vdom__.props.value : (_Component$contextTyp = Component.contextType) === null || _Component$contextTyp === void 0 ? void 0 : _Component$contextTyp.Provider.value;
  var contextValue = _typeof(context) === "object" && context !== null ? Object.assign({}, context) : context;
  var instance = new Component(fiber.__vdom__.props, contextValue);
  instance.props = Object.assign({}, fiber.__vdom__.props); // fix context value

  instance.context = contextValue;
  fiber.installInstance(instance);
  fiber.checkInstance(instance);
  fiber.instance.setFiber(fiber);
  fiber.instance.setContext(providerFiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentRenderOnMountAndUpdate = function processComponentRenderOnMountAndUpdate(fiber) {
  var children = fiber.instance.render();
  fiber.__vdom__.__dynamicChildren__ = children;
  fiber.__renderDynamic__ = true;
  return (0, _index.nextWorkCommon)(fiber);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentDidMountOnMount = function processComponentDidMountOnMount(fiber) {
  if (!fiber.instance.__pendingEffect__ && fiber.instance.componentDidMount) {
    fiber.instance.__pendingEffect__ = true;
    (0, _effect.pushLayoutEffect)(fiber, function () {
      (0, _debug.safeCallWithFiber)({
        action: function action() {
          return fiber.instance.componentDidMount();
        },
        fiber: fiber
      });
      fiber.instance.__pendingEffect__ = false;
    });
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var classComponentMount = function classComponentMount(fiber) {
  processComponentInstanceOnMount(fiber);
  processComponentInstanceRefOnMountAndUpdate(fiber);
  processComponentStateFromPropsOnMountAndUpdate(fiber);
  fiber.instance.updateInstance(fiber.instance.__nextState__);
  fiber.instance.resetPrevInstanceState();
  fiber.instance.resetNextInstanceState();
  var children = processComponentRenderOnMountAndUpdate(fiber);
  processComponentDidMountOnMount(fiber);
  return children;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.classComponentMount = classComponentMount;

var processComponentContextOnUpdate = function processComponentContextOnUpdate(fiber) {
  var Component = fiber.__isDynamicNode__ ? fiber.__vdom__.type : fiber.__vdom__.type.render;

  if (!fiber.instance.__context__ || !fiber.instance.__context__.mount) {
    var _Component$contextTyp2;

    var providerFiber = (0, _index2.getContextFiber)(fiber, Component.contextType);
    var context = providerFiber ? providerFiber.__vdom__.props.value : (_Component$contextTyp2 = Component.contextType) === null || _Component$contextTyp2 === void 0 ? void 0 : _Component$contextTyp2.Provider.value;
    fiber.instance.setContext(providerFiber);
    return _typeof(context) === "object" && context !== null ? Object.assign({}, context) : context;
  }

  return fiber.instance.context;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentShouldUpdateOnUpdate = function processComponentShouldUpdateOnUpdate(fiber) {
  if (fiber.instance.__isForce__) {
    fiber.instance.__isForce__ = false;
    return true;
  }

  if (fiber.instance.shouldComponentUpdate) {
    return fiber.instance.shouldComponentUpdate(fiber.instance.__nextProps__, fiber.instance.__nextState__, fiber.instance.__nextContext__);
  }

  return true;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var processComponentDidUpdateOnUpdate = function processComponentDidUpdateOnUpdate(fiber) {
  var hasEffect = fiber.instance.__pendingCallback__.length || fiber.instance.componentDidUpdate;

  if (!fiber.instance.__pendingEffect__ && hasEffect) {
    fiber.instance.__pendingEffect__ = true;
    (0, _effect.pushLayoutEffect)(fiber, function () {
      (0, _debug.safeCallWithFiber)({
        action: function action() {
          var allCallback = fiber.instance.__pendingCallback__.slice(0);

          fiber.instance.__pendingCallback__ = [];
          allCallback.forEach(function (c) {
            return typeof c === "function" && c();
          });

          if (fiber.instance.componentDidUpdate) {
            fiber.instance.componentDidUpdate(fiber.instance.__prevProps__, fiber.instance.__prevState__, fiber.instance.__prevContext__);
          }
        },
        fiber: fiber
      });
      fiber.instance.resetPrevInstanceState();
      fiber.instance.__pendingEffect__ = false;
    });
  } else {
    fiber.instance.resetPrevInstanceState();
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var classComponentUpdate = function classComponentUpdate(fiber) {
  fiber.instance.setFiber(fiber);
  var nextState = processComponentStateFromPropsOnMountAndUpdate(fiber);
  var nextProps = Object.assign({}, fiber.__vdom__.props);
  var nextContext = processComponentContextOnUpdate(fiber);
  fiber.instance.__nextState__ = nextState;
  fiber.instance.__nextProps__ = nextProps;
  fiber.instance.__nextContext__ = nextContext;
  var shouldComponentUpdate = processComponentShouldUpdateOnUpdate(fiber);
  fiber.instance.updateInstance(nextState, nextProps, nextContext);

  if (shouldComponentUpdate) {
    fiber.instance.resetNextInstanceState();
    var children = processComponentRenderOnMountAndUpdate(fiber);
    processComponentDidUpdateOnUpdate(fiber);
    return children;
  } else {
    fiber.instance.resetPrevInstanceState();
    fiber.instance.resetNextInstanceState();
    fiber.memoChildren();
    return [];
  }
};

exports.classComponentUpdate = classComponentUpdate;