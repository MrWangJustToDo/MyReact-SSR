(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.only = exports.mapByJudgeFunction = exports.map = exports.forEach = exports.count = void 0;

var _tool = require("./tool.js");

var _index = require("./vdom/index.js");

var mapByJudgeFunction = function mapByJudgeFunction(arrayLike, judge, action) {
  var arrayChildren = (0, _tool.flattenChildren)(arrayLike);
  return arrayChildren.map(function (v, index, thisArgs) {
    if (judge(v)) {
      return action.call(thisArgs, v, index, arrayChildren);
    } else {
      return v;
    }
  });
}; // MyReact Children api, just like React


exports.mapByJudgeFunction = mapByJudgeFunction;

var map = function map(arrayLike, action) {
  return mapByJudgeFunction(arrayLike, function (v) {
    return v !== undefined;
  }, action);
};

exports.map = map;

var toArray = function toArray(arrayLike) {
  return map(arrayLike, function (vdom, index) {
    return (0, _index.cloneElement)(vdom, {
      key: vdom.key !== undefined ? ".$".concat(vdom.key) : ".".concat(index)
    });
  });
};

exports.toArray = toArray;

var forEach = function forEach(arrayLike, action) {
  mapByJudgeFunction(arrayLike, function (v) {
    return v !== undefined;
  }, action);
};

exports.forEach = forEach;

var count = function count(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p + count(c);
    }, 0);
  }

  return 1;
};

exports.count = count;

var only = function only(child) {
  if ((0, _index.isValidElement)(child)) return child;
  if (typeof child === "string" || typeof child === "number") return child;
  throw new Error("Children.only expected to receive a single MyReact element child.");
};

exports.only = only;
},{"./tool.js":39,"./vdom/index.js":45}],2:[function(require,module,exports){
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
},{"../core/index.js":6,"../debug.js":8,"../effect.js":17,"../fiber/index.js":21}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MyReactComponent", {
  enumerable: true,
  get: function get() {
    return _instance.MyReactComponent;
  }
});
Object.defineProperty(exports, "MyReactPureComponent", {
  enumerable: true,
  get: function get() {
    return _instance.MyReactPureComponent;
  }
});
Object.defineProperty(exports, "classComponentMount", {
  enumerable: true,
  get: function get() {
    return _feature.classComponentMount;
  }
});
Object.defineProperty(exports, "classComponentUpdate", {
  enumerable: true,
  get: function get() {
    return _feature.classComponentUpdate;
  }
});

var _instance = require("./instance.js");

var _feature = require("./feature.js");
},{"./feature.js":2,"./instance.js":4}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactPureComponent = exports.MyReactComponent = void 0;

var _tool = require("../tool.js");

var _share = require("../share.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactComponent = /*#__PURE__*/function (_MyReactInternalInsta) {
  _inherits(MyReactComponent, _MyReactInternalInsta);

  var _super = _createSuper(MyReactComponent);

  function MyReactComponent(props, context) {
    var _this;

    _classCallCheck(this, MyReactComponent);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "__isForce__", false);

    _defineProperty(_assertThisInitialized(_this), "__prevProps__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextProps__", null);

    _defineProperty(_assertThisInitialized(_this), "__prevContext__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextContext__", null);

    _defineProperty(_assertThisInitialized(_this), "__prevState__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextState__", null);

    _defineProperty(_assertThisInitialized(_this), "__pendingEffect__", false);

    _defineProperty(_assertThisInitialized(_this), "__pendingCallback__", []);

    _defineProperty(_assertThisInitialized(_this), "setState", function (newValue, callback) {
      var newState = newValue;

      if (typeof newValue === "function") {
        newState = newValue(_this.state, _this.props);
      }

      _this.__nextState__ = Object.assign({}, _this.__nextState__, newState);
      callback && _this.__pendingCallback__.push(callback);

      try {
        _this.updateTimeStep();
      } catch (e) {
        _this.error = true;
      }

      Promise.resolve().then(function () {
        if (!_this.error) {
          _this.__fiber__.update();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "forceUpdate", function () {
      _this.__isForce__ = true;
      Promise.resolve().then(function () {
        return _this.__fiber__.update();
      });
    });

    _this.props = props;
    _this.context = context;
    return _this;
  } // support fast refresh


  _createClass(MyReactComponent, [{
    key: "isReactComponent",
    get: function get() {
      return true;
    }
  }, {
    key: "isMyReactComponent",
    get: function get() {
      return true;
    }
  }, {
    key: "updateInstance",
    value: function updateInstance(newState, newProps, newContext) {
      if (newProps) {
        this.__prevProps__ = this.props;
        this.props = newProps;
      }

      if (newState) {
        this.__prevState__ = this.state;
        this.state = newState;
      }

      if (newContext) {
        this.__prevContext__ = this.context;
        this.context = newContext;
      }

      this.__fiber__.memoProps = this.props;
      this.__fiber__.memoState = this.state;
    }
  }, {
    key: "resetPrevInstanceState",
    value: function resetPrevInstanceState() {
      this.__prevState__ = null;
      this.__prevProps__ = null;
      this.__prevContext__ = null;
    }
  }, {
    key: "resetNextInstanceState",
    value: function resetNextInstanceState() {
      this.__nextProps__ = null;
      this.__nextState__ = null;
      this.__nextContext__ = null;
    }
  }]);

  return MyReactComponent;
}(_share.MyReactInternalInstance);

exports.MyReactComponent = MyReactComponent;

var MyReactPureComponent = /*#__PURE__*/function (_MyReactComponent) {
  _inherits(MyReactPureComponent, _MyReactComponent);

  var _super2 = _createSuper(MyReactPureComponent);

  function MyReactPureComponent() {
    _classCallCheck(this, MyReactPureComponent);

    return _super2.apply(this, arguments);
  }

  _createClass(MyReactPureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _tool.isNormalEqual)(this.props, nextProps) || !(0, _tool.isNormalEqual)(this.state, nextState) || !(0, _tool.isNormalEqual)(this.context, nextContext);
    }
  }]);

  return MyReactPureComponent;
}(MyReactComponent);

exports.MyReactPureComponent = MyReactPureComponent;
},{"../share.js":37,"../tool.js":39}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextWorkCommon = exports.nextWorkAsync = exports.nextWork = void 0;

var _index = require("../component/index.js");

var _env = require("../env.js");

var _tool = require("./tool.js");

var _index2 = require("../fiber/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
    var isClassComponent = render === null || render === void 0 ? void 0 : (_render$prototype = render.prototype) === null || _render$prototype === void 0 ? void 0 : _render$prototype.isMyReactComponent;

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


var nextWorkLazy = function nextWorkLazy(fiber) {
  var lazyObj = fiber.__vdom__.type; // lazy load done

  if (lazyObj._loaded === true) {
    var children = lazyObj._result;

    if (typeof lazyObj._result === "function") {
      _env.currentHookDeepIndex.current = 0;
      _env.currentFunctionFiber.current = fiber;
      children = lazyObj._result(fiber.__vdom__.props);
      _env.currentFunctionFiber.current = null;
      _env.currentHookDeepIndex.current = 0;
    }

    fiber.__vdom__.__dynamicChildren__ = children;
    fiber.__renderDynamic__ = true;
  } else {
    if (!_env.isServerRender.current) {
      Promise.resolve().then(function () {
        return lazyObj.loader();
      }).then(function (re) {
        var render = _typeof(re) === "object" && re !== null && re !== void 0 && re["default"] ? re["default"] : re;
        lazyObj._loaded = true;
        lazyObj._result = render;
        fiber.updateLazy();
      });
    }

    fiber.__vdom__.__dynamicChildren__ = fiber.__fallback__;
    fiber.__renderDynamic__ = true;
  }

  return nextWorkCommon(fiber);
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
    var listenerFibers = fiber.__dependence__.map(function (node) {
      return node.__fiber__;
    }); // update only alive fiber


    Promise.resolve().then(function () {
      var aliveListenerFibers = listenerFibers.filter(function (f) {
        return f.mount;
      });
      aliveListenerFibers.forEach(function (f) {
        return f.update();
      });
    });
  }

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
  if (fiber.__isLazy__) return nextWorkLazy(fiber);
  if (fiber.__isPortal__) return nextWorkCommon(fiber);
  if (fiber.__isSuspense__) return nextWorkCommon(fiber);
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
/**
 *
 * @param {MyReactFiberNode} fiber
 * @returns {MyReactFiberNode}
 */


exports.nextWork = nextWork;

var nextWorkAsync = function nextWorkAsync(fiber) {
  if (!fiber.mount) return null;
  _env.currentRunningFiber.current = fiber;
  var children = [];
  if (fiber.__isDynamicNode__) children = nextWorkComponent(fiber);else if (fiber.__isObjectNode__) children = nextWorkObject(fiber);else if (!fiber.__isTextNode__) children = nextWorkCommon(fiber);
  fiber.afterTransform();
  _env.currentRunningFiber.current = null; // https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7
  // https://github.com/facebook/react/issues/7942
  // for this part of logic, just like fiber tree for React, support yield on a loop and can continue later
  // get next working fiber

  if (children.length) {
    return fiber.child;
  }

  var nextFiber = fiber; // should not transform current loop top level fiber

  while (nextFiber && nextFiber !== _env.pendingAsyncModifyTopLevelFiber.current) {
    if (nextFiber.fiberSibling) {
      return nextFiber.fiberSibling;
    }

    nextFiber = nextFiber.fiberParent;
  }
};

exports.nextWorkAsync = nextWorkAsync;
},{"../component/index.js":3,"../env.js":19,"../fiber/index.js":21,"./tool.js":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "nextWork", {
  enumerable: true,
  get: function get() {
    return _feature.nextWork;
  }
});
Object.defineProperty(exports, "nextWorkAsync", {
  enumerable: true,
  get: function get() {
    return _feature.nextWorkAsync;
  }
});
Object.defineProperty(exports, "nextWorkCommon", {
  enumerable: true,
  get: function get() {
    return _feature.nextWorkCommon;
  }
});

var _feature = require("./feature.js");
},{"./feature.js":5}],7:[function(require,module,exports){
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
  var newVDomIsVDomInstance = (0, _index.isValidElement)(newVDom);
  var previousRenderChildVDomIsVDomInstance = (0, _index.isValidElement)(previousRenderChildVDom);

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
      if ((0, _index.isValidElement)(vDom) && vDom.key !== undefined) {
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

    if (currentMatchedPreviousRenderChild.__isPlainNode__ && (0, _tool.isNormalEqual)(currentMatchedPreviousRenderChild.__vdom__.props, newVDom.props)) {
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
},{"../env.js":19,"../fiber/index.js":21,"../tool.js":39,"../unmount.js":40,"../vdom/index.js":45}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.safeCallWithFiber = exports.safeCall = exports.getHookTree = exports.getFiberTree = exports.error = exports.debugWithDom = void 0;

var _env = require("./env.js");

var _index = require("./fiber/index.js");

var _instance = require("./hook/instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var trackDevLog = function trackDevLog(fiber) {
  var _vdom$type;

  var showDisplayName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var vdom = fiber.__vdom__;
  var source = vdom === null || vdom === void 0 ? void 0 : vdom._source;
  var owner = vdom === null || vdom === void 0 ? void 0 : vdom._owner;
  var displayName = (vdom === null || vdom === void 0 ? void 0 : (_vdom$type = vdom.type) === null || _vdom$type === void 0 ? void 0 : _vdom$type.displayName) || "";
  var preString = showDisplayName && displayName ? " - ".concat(displayName, " ") : "";

  if (source) {
    var fileName = source.fileName,
        lineNumber = source.lineNumber;
    preString = "".concat(preString, " (").concat(fileName, ":").concat(lineNumber, ")");
  }

  if (!fiber.__isDynamicNode__ && owner && (owner.__vdom__.type.displayName || owner.__vdom__.type.name)) {
    preString = "".concat(preString, " (render by ").concat(owner.__vdom__.type.displayName || owner.__vdom__.type.name, ")");
  }

  return preString;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var getFiberNodeName = function getFiberNodeName(fiber) {
  if (fiber.__root__) return "<Root />".concat(trackDevLog(fiber));
  if (fiber.__isMemo__) return "<Memo />".concat(trackDevLog(fiber));
  if (fiber.__isLazy__) return "<Lazy />".concat(trackDevLog(fiber));
  if (fiber.__isPortal__) return "<Portal />".concat(trackDevLog(fiber));
  if (fiber.__isSuspense__) return "<Suspense />".concat(trackDevLog(fiber));
  if (fiber.__isEmptyNode__) return "<Empty />".concat(trackDevLog(fiber));
  if (fiber.__isForwardRef__) return "<ForwardRef />".concat(trackDevLog(fiber));
  if (fiber.__isFragmentNode__) return "<Fragment />".concat(trackDevLog(fiber));
  if (fiber.__isContextProvider__) return "<Provider />".concat(trackDevLog(fiber));
  if (fiber.__isContextConsumer__) return "<Consumer />".concat(trackDevLog(fiber));
  if (fiber.__isPlainNode__) return "<".concat(fiber.__vdom__.type, " />").concat(trackDevLog(fiber));
  if (fiber.__isTextNode__) return "<text - (".concat(fiber.__vdom__, ") />").concat(trackDevLog(fiber));
  if (fiber.__isDynamicNode__) return "<".concat(fiber.__vdom__.type.displayName || fiber.__vdom__.type.name || "Unknown", " */> ").concat(trackDevLog(fiber, false));
  return "<Undefined />".concat(trackDevLog(fiber));
};

var preString = "".padEnd(4) + "at".padEnd(4);
/**
 *
 * @param {MyReactFiberNode} fiber
 */

var getFiberTree = function getFiberTree(fiber) {
  if (fiber) {
    var parent = fiber.fiberParent;
    var res = preString + "".concat(getFiberNodeName(fiber));

    while (parent) {
      res = preString + "".concat(getFiberNodeName(parent), "\n") + res;
      parent = parent.fiberParent;
    }

    return "\n" + res;
  }

  return "";
};

exports.getFiberTree = getFiberTree;
var cache = {};
/**
 *
 * @param {{message: string, fiber: MyReactFiberNode}} param
 */

var warning = function warning(_ref) {
  var message = _ref.message,
      fiber = _ref.fiber,
      treeOnce = _ref.treeOnce;
  var tree = getFiberTree(fiber || _env.currentRunningFiber.current);

  if (treeOnce) {
    if (cache[tree]) return;
    cache[tree] = true;
  }

  console.warn("[warning]:", "\n-----------------------------------------\n", "".concat(message), "\n-----------------------------------------\n", "component tree:", tree);
};
/**
 *
 * @param {{message: string, fiber: MyReactFiberNode}} param
 */


exports.warning = warning;

var error = function error(_ref2) {
  var message = _ref2.message,
      fiber = _ref2.fiber;
  console.error("[error]:", "\n-----------------------------------------\n", "".concat(message), "\n-----------------------------------------\n", "component tree:", getFiberTree(fiber || _env.currentRunningFiber.current));
  throw new Error(message);
};
/**
 *
 * @param {MyReactHookNode} hookNode
 * @param {string} newHookType
 */


exports.error = error;

var getHookTree = function getHookTree(hookNode, newHookType) {
  var fiber = hookNode.__fiber__;
  var currentHook = fiber.hookHead;
  var re = "\n" + "".padEnd(6) + "Prev render:".padEnd(20) + "Next render:".padEnd(10) + "\n";

  while (currentHook !== hookNode) {
    if (currentHook) {
      re += (currentHook.hookIndex + 1).toString().padEnd(6) + currentHook.hookType.padEnd(20) + currentHook.hookType.padEnd(10) + "\n";
      currentHook = currentHook.hookNext;
    } else {
      break;
    }
  }

  re += (hookNode.hookIndex + 1).toString().padEnd(6) + hookNode.hookType.padEnd(20) + newHookType.padEnd(10) + "\n";
  re += "".padEnd(6) + "^".repeat(30) + "\n";
  return re;
};

exports.getHookTree = getHookTree;

var safeCall = function safeCall(action) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return action.call.apply(action, [null].concat(args));
  } catch (e) {
    error({
      message: e !== null && e !== void 0 && e.stack ? e.stack : e.message
    });
  }
};

exports.safeCall = safeCall;

var safeCallWithFiber = function safeCallWithFiber(_ref3) {
  var action = _ref3.action,
      fiber = _ref3.fiber;

  try {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return action.call.apply(action, [null].concat(args));
  } catch (e) {
    error({
      message: e !== null && e !== void 0 && e.stack ? e.message + "\n" + e.stack : e.message,
      fiber: fiber
    });
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.safeCallWithFiber = safeCallWithFiber;

var debugWithDom = function debugWithDom(fiber) {
  if (fiber !== null && fiber !== void 0 && fiber.dom) {
    fiber.dom.__fiber__ = fiber;
    fiber.dom.__vdom__ = fiber.__vdom__;
    fiber.dom.__children__ = fiber.children;
  }
};

exports.debugWithDom = debugWithDom;
},{"./env.js":19,"./fiber/index.js":21,"./hook/instance.js":28}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBrowserDom = exports.commitClient = void 0;

var _tool = require("./tool.js");

var _share = require("../share.js");

var _index = require("../fiber/index.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var createBrowserDom = function createBrowserDom(fiber) {
  var dom = fiber.__isTextNode__ ? document.createTextNode(fiber.__vdom__) : fiber.nameSpace ? document.createElementNS(fiber.nameSpace, fiber.__vdom__.type) : document.createElement(fiber.__vdom__.type);
  fiber.dom = dom;
  (0, _tool.updateDom)(dom, _share.EMPTY_OBJECT, fiber.__isTextNode__ ? _share.EMPTY_OBJECT : fiber.__vdom__.props, fiber);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


exports.createBrowserDom = createBrowserDom;

var commitClient = function commitClient(fiber, parentDom) {
  createBrowserDom(fiber);

  if (fiber.__pendingMount__) {
    parentDom.appendChild(fiber.dom);
  }

  fiber.applyRef();
  fiber.applyVDom();
};

exports.commitClient = commitClient;
},{"../fiber/index.js":21,"../share.js":37,"./tool.js":16}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountComponentAtNode = exports.renderToString = exports.render = exports.hydrate = exports.findDOMNode = void 0;

var _server = require("./server.js");

var _index = require("../vdom/index.js");

var _index2 = require("../render/index.js");

var _env = require("../env.js");

var _index3 = require("../fiber/index.js");

var _index4 = require("../component/index.js");

var _tool = require("./tool.js");

var _index5 = require("../update/index.js");

var _unmount = require("../unmount.js");

/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */
var render = function render(element, container) {
  var containerFiber = container.__fiber__;

  if (containerFiber) {
    // need update, just like React
    if (containerFiber.__vdom__.type === element.type) {
      containerFiber.__vdom__ = element;
      (0, _index5.pendingUpdate)(containerFiber);
    }
  } else {
    var _container$setAttribu;

    Array.from(container.children).forEach(function (n) {
      var _n$remove;

      return (_n$remove = n.remove) === null || _n$remove === void 0 ? void 0 : _n$remove.call(n);
    });
    var rootElement = element;
    var fiber = (0, _index3.createNewFiberNode)({
      deepIndex: 0,
      dom: container
    }, rootElement);
    fiber.__root__ = true;
    _env.rootFiber.current = fiber;
    _env.rootContainer.current = container;
    (_container$setAttribu = container.setAttribute) === null || _container$setAttribu === void 0 ? void 0 : _container$setAttribu.call(container, "render", "MyReact");
    container.__fiber__ = fiber;
    (0, _index2.startRender)(fiber);
  }
};

exports.render = render;

var hydrate = function hydrate(element, container) {
  var _container$setAttribu2;

  _env.isHydrateRender.current = true;
  var rootElement = element;
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  (_container$setAttribu2 = container.setAttribute) === null || _container$setAttribu2 === void 0 ? void 0 : _container$setAttribu2.call(container, "hydrate", "MyReact");
  container.__fiber__ = fiber;
  (0, _index2.startRender)(fiber);
  _env.isHydrateRender.current = false;
};
/**
 *
 * @param {MyReactVDom} element
 * @returns
 */


exports.hydrate = hydrate;

var renderToString = function renderToString(element) {
  var _container$children$, _container$children$$;

  _env.isServerRender.current = true;
  var rootElement = element;
  var container = new _server.Element("");
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  (0, _index2.startRender)(fiber);
  _env.isServerRender.current = false;
  (_container$children$ = container.children[0]) === null || _container$children$ === void 0 ? void 0 : (_container$children$$ = _container$children$.setAttribute) === null || _container$children$$ === void 0 ? void 0 : _container$children$$.call(_container$children$, "root", "MyReact");
  return container.toString();
};
/**
 *
 * @param {MyReactComponent} instance
 */


exports.renderToString = renderToString;

var findDOMNode = function findDOMNode(instance) {
  if (instance instanceof _index4.MyReactComponent) {
    return (0, _tool.findLatestDomFromComponentFiber)(instance.__fiber__);
  } else {
    return null;
  }
};

exports.findDOMNode = findDOMNode;

var unmountComponentAtNode = function unmountComponentAtNode(container) {
  var containerFiber = container.__fiber__;

  if (containerFiber !== null && containerFiber !== void 0 && containerFiber.mount) {
    (0, _unmount.unmountFiberNode)(containerFiber);
  }
};

exports.unmountComponentAtNode = unmountComponentAtNode;
},{"../component/index.js":3,"../env.js":19,"../fiber/index.js":21,"../render/index.js":35,"../unmount.js":40,"../update/index.js":42,"../vdom/index.js":45,"./server.js":15,"./tool.js":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighLight = void 0;

var _index = require("../fiber/index.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HighLight = /*#__PURE__*/_createClass(
/**
 * @type HighLight
 */

/**
 *
 * @returns HighLight
 */

/**
 * @type MyReactFiberNode[]
 */
function HighLight() {
  var _this = this;

  _classCallCheck(this, HighLight);

  _defineProperty(this, "map", []);

  _defineProperty(this, "container", null);

  _defineProperty(this, "range", document.createRange());

  _defineProperty(this, "__pendingUpdate__", []);

  _defineProperty(this, "createHighLight", function () {
    var element = document.createElement("div");

    _this.container.append(element);

    return element;
  });

  _defineProperty(this, "getHighLight", function () {
    if (_this.map.length) {
      var element = _this.map.shift();

      return element;
    }

    return _this.createHighLight();
  });

  _defineProperty(this, "highLight", function (fiber) {
    if (fiber.dom) {
      if (!fiber.dom.__pendingHighLight__) {
        fiber.dom.__pendingHighLight__ = true;

        _this.startHighLight(fiber);
      }
    }
  });

  _defineProperty(this, "startHighLight", function (fiber) {
    _this.__pendingUpdate__.push(fiber);

    _this.flashPending();
  });

  _defineProperty(this, "flashPending", function (cb) {
    Promise.resolve().then(function () {
      var allFiber = _this.__pendingUpdate__.slice(0);

      _this.__pendingUpdate__ = [];
      var allWrapper = [];
      allFiber.forEach(function (f) {
        var wrapperDom = _this.getHighLight();

        allWrapper.push(wrapperDom);
        f.__isTextNode__ ? _this.range.selectNodeContents(f.dom) : _this.range.selectNode(f.dom);

        var rect = _this.range.getBoundingClientRect();

        var left = parseInt(rect.left) + parseInt(document.scrollingElement.scrollLeft);
        var top = parseInt(rect.top) + parseInt(document.scrollingElement.scrollTop);
        var width = parseInt(rect.width) + 4;
        var height = parseInt(rect.height) + 4;
        var positionLeft = left - 2;
        var positionTop = top - 2;
        wrapperDom.style.cssText = "\n          position: absolute;\n          width: ".concat(width, "px;\n          height: ").concat(height, "px;\n          left: ").concat(positionLeft, "px;\n          top: ").concat(positionTop, "px;\n          pointer-events: none;\n          box-shadow: 0.0625rem 0.0625rem 0.0625rem red, -0.0625rem -0.0625rem 0.0625rem red;\n          ");
      });
      setTimeout(function () {
        allWrapper.forEach(function (wrapperDom) {
          wrapperDom.style.boxShadow = "none";

          _this.map.push(wrapperDom);
        });
        allFiber.forEach(function (f) {
          return f.dom.__pendingHighLight__ = false;
        });
      }, 100);
    });
  });

  this.container = document.createElement("div");
  this.container.style.cssText = "\n      position: absolute;\n      z-index: 999999;\n      width: 100%;\n      left: 0;\n      top: 0;\n      pointer-events: none;\n      ";
  document.body.append(this.container);
});

exports.HighLight = HighLight;

_defineProperty(HighLight, "instance", undefined);

_defineProperty(HighLight, "getHighLightInstance", function () {
  HighLight.instance = HighLight.instance || new HighLight();
  return HighLight.instance;
});
},{"../fiber/index.js":21}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitHydrate = void 0;

var _debug = require("../debug.js");

var _client = require("./client.js");

var _tool = require("./tool.js");

var _index = require("../fiber/index.js");

var _prop = require("./prop.js");

var _share = require("../share.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */
var domPropsHydrate = function domPropsHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isProperty).forEach(function (key) {
    if (props[key] === null || props[key] === undefined || props[key] === false) return;

    if (!fiber.nameSpace && key === "className") {
      if (dom[key] !== props[key]) {
        (0, _debug.warning)({
          message: "hydrate warning, dom class not match from server, server: ".concat(dom[key], ", client: ").concat(props[key]),
          fiber: fiber
        });
        dom[key] = props[key];
      }

      return;
    }

    if (fiber.nameSpace && key === "className") {
      if (dom.getAttribute("class") !== props[key].toString()) {
        (0, _debug.warning)({
          message: "hydrate warning, dom class not match from server, server: ".concat(dom.getAttribute("class"), ", client: ").concat(props[key]),
          fiber: fiber
        });
        dom.setAttribute("class", props[key]);
      }

      return;
    }

    if (key === "value") {
      if (dom[key] !== props[key]) dom[key] = props[key];
      return;
    }

    if (props[key] !== null && props[key] !== undefined && dom.getAttribute(key) !== props[key].toString()) {
      (0, _debug.warning)({
        message: "hydrate warning, dom attrs not match from server, server: ".concat(dom.getAttribute(key), ", client: ").concat(props[key]),
        fiber: fiber
      });
      dom.setAttribute(key, props[key]);
    }
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


var domEventHydrate = function domEventHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isEvent).forEach(function (key) {
    var _getNativeEventName = (0, _tool.getNativeEventName)(key.slice(2), fiber.__vdom__),
        eventName = _getNativeEventName.eventName,
        isCapture = _getNativeEventName.isCapture;

    fiber.addEventListener(eventName, props[key], isCapture);
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


var domStyleHydrate = function domStyleHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isStyle).forEach(function (styleKey) {
    Object.keys(props[styleKey] || _share.EMPTY_OBJECT).forEach(function (styleName) {
      if (!_share.IS_UNIT_LESS_NUMBER[styleName]) {
        if (typeof props[styleKey][styleName] === "number") {
          dom.style[styleName] = "".concat(props[styleKey][styleName], "px");
          return;
        }
      }

      dom.style[styleName] = props[styleKey][styleName];
    });
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


var hydrateDom = function hydrateDom(fiber, dom) {
  var _fiber$__vdom__, _fiber$__vdom__2, _fiber$__vdom__3;

  fiber.dom = dom;
  domPropsHydrate(fiber, dom, ((_fiber$__vdom__ = fiber.__vdom__) === null || _fiber$__vdom__ === void 0 ? void 0 : _fiber$__vdom__.props) || _share.EMPTY_OBJECT);
  domEventHydrate(fiber, dom, ((_fiber$__vdom__2 = fiber.__vdom__) === null || _fiber$__vdom__2 === void 0 ? void 0 : _fiber$__vdom__2.props) || _share.EMPTY_OBJECT);
  domStyleHydrate(fiber, dom, ((_fiber$__vdom__3 = fiber.__vdom__) === null || _fiber$__vdom__3 === void 0 ? void 0 : _fiber$__vdom__3.props) || _share.EMPTY_OBJECT);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


var checkHydrateDom = function checkHydrateDom(fiber, dom) {
  if (!dom) {
    (0, _debug.warning)({
      message: "hydrate warning, dom not render from server",
      fiber: fiber
    });
    return false;
  }

  if (fiber.__isTextNode__) {
    if (dom.nodeType !== Node.TEXT_NODE) {
      (0, _debug.warning)({
        message: "hydrate warning, dom type not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__),
        fiber: fiber
      });
      return false;
    }

    if (fiber.__vdom__.toString() !== dom.textContent) {
      if (fiber.__vdom__.toString() === "" && dom.textContent === " ") {
        dom.textContent = "";
        return true;
      } else {
        (0, _debug.warning)({
          message: "hydrate warning, dom content not match from server, server: ".concat(dom.textContent, ", client: ").concat(fiber.__vdom__),
          fiber: fiber
        });
        return false;
      }
    }
  }

  if (fiber.__isPlainNode__) {
    if (dom.nodeType !== Node.ELEMENT_NODE) {
      (0, _debug.warning)({
        message: "hydrate warning, dom type not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__.type),
        fiber: fiber
      });
      return false;
    }

    if (fiber.__vdom__.type.toLowerCase() !== dom.nodeName.toLowerCase()) {
      (0, _debug.warning)({
        message: "hydrate warning, dom name not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__.type),
        fiber: fiber
      });
      return false;
    }
  }

  return true;
};
/**
 *
 * @param {HTMLElement} parentDom
 */


var getHydrateDom = function getHydrateDom(parentDom) {
  var children = Array.from(parentDom.childNodes);
  return children.find(function (dom) {
    return dom.nodeType !== document.COMMENT_NODE && !dom.__hydrate__;
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


var commitHydrate = function commitHydrate(fiber, parentDom) {
  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    var dom = getHydrateDom(parentDom);
    var isHydrateMatch = checkHydrateDom(fiber, dom);

    if (isHydrateMatch) {
      hydrateDom(fiber, dom);
    } else {
      var newDom = (0, _client.createBrowserDom)(fiber);

      if (dom) {
        parentDom.replaceChild(newDom, dom);
      } else {
        parentDom.append(newDom);
      }
    }

    fiber.applyRef();
    fiber.applyVDom();
    fiber.dom.__hydrate__ = true;
  }
};

exports.commitHydrate = commitHydrate;
},{"../debug.js":8,"../fiber/index.js":21,"../share.js":37,"./client.js":9,"./prop.js":14,"./tool.js":16}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "commitClient", {
  enumerable: true,
  get: function get() {
    return _client.commitClient;
  }
});
Object.defineProperty(exports, "commitHydrate", {
  enumerable: true,
  get: function get() {
    return _hydrate.commitHydrate;
  }
});
Object.defineProperty(exports, "commitServer", {
  enumerable: true,
  get: function get() {
    return _server.commitServer;
  }
});
Object.defineProperty(exports, "findDOMNode", {
  enumerable: true,
  get: function get() {
    return _feature.findDOMNode;
  }
});
Object.defineProperty(exports, "getDom", {
  enumerable: true,
  get: function get() {
    return _tool.getDom;
  }
});
Object.defineProperty(exports, "hydrate", {
  enumerable: true,
  get: function get() {
    return _feature.hydrate;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _feature.render;
  }
});
Object.defineProperty(exports, "renderToString", {
  enumerable: true,
  get: function get() {
    return _feature.renderToString;
  }
});
Object.defineProperty(exports, "unmountComponentAtNode", {
  enumerable: true,
  get: function get() {
    return _feature.unmountComponentAtNode;
  }
});
Object.defineProperty(exports, "updateDom", {
  enumerable: true,
  get: function get() {
    return _tool.updateDom;
  }
});

var _client = require("./client.js");

var _server = require("./server.js");

var _hydrate = require("./hydrate.js");

var _tool = require("./tool.js");

var _feature = require("./feature.js");
},{"./client.js":9,"./feature.js":10,"./hydrate.js":12,"./server.js":15,"./tool.js":16}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStyle = exports.isProperty = exports.isNew = exports.isInternal = exports.isGone = exports.isEvent = exports.isChildren = void 0;

var isInternal = function isInternal(key) {
  return key.startsWith("__");
};

exports.isInternal = isInternal;

var isChildren = function isChildren(key) {
  return key === "children" || key === "dangerouslySetInnerHTML";
};

exports.isChildren = isChildren;

var isEvent = function isEvent(key) {
  return key.startsWith("on");
};

exports.isEvent = isEvent;

var isStyle = function isStyle(key) {
  return key === "style";
};

exports.isStyle = isStyle;

var isProperty = function isProperty(key) {
  return !isChildren(key) && !isEvent(key) && !isStyle(key) && !isInternal(key);
};

exports.isProperty = isProperty;

var isNew = function isNew(oldProps, newProps) {
  return function (key) {
    return oldProps[key] !== newProps[key];
  };
};

exports.isNew = isNew;

var isGone = function isGone(newProps) {
  return function (key) {
    return !(key in newProps);
  };
};

exports.isGone = isGone;
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitServer = exports.Element = void 0;

var _tool = require("./tool.js");

var _index = require("../fiber/index.js");

var _share = require("../share.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var TextElement = /*#__PURE__*/function () {
  function TextElement(content) {
    _classCallCheck(this, TextElement);

    this.content = content === "" ? " " : content;
  }

  _createClass(TextElement, [{
    key: "toString",
    value: function toString() {
      return this.content.toString();
    }
  }]);

  return TextElement;
}();

var Element = /*#__PURE__*/function () {
  function Element(type) {
    _classCallCheck(this, Element);

    _defineProperty(this, "style", {});

    _defineProperty(this, "attrs", {});

    _defineProperty(this, "children", []);

    this.type = type;
  }

  _createClass(Element, [{
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }, {
    key: "removeAttribute",
    value: function removeAttribute(key) {
      delete this.attrs[key];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (value !== false && value !== null && value !== undefined) {
        this.attrs[key] = value;
      }
    }
    /**
     *
     * @param {Element} dom
     */

  }, {
    key: "append",
    value: function append() {
      var _this$children;

      (_this$children = this.children).push.apply(_this$children, arguments);
    }
  }, {
    key: "appendChild",
    value: function appendChild(dom) {
      if (dom instanceof Element || dom instanceof TextElement) {
        this.children.push(dom);
        return dom;
      } else {
        throw new Error("element instance error");
      }
    }
  }, {
    key: "serializeStyle",
    value: function serializeStyle() {
      var _this = this;

      var styleKeys = Object.keys(this.style);

      if (styleKeys.length) {
        return "style=\"".concat(styleKeys.map(function (key) {
          return "".concat(key, ": ").concat(_this.style[key].toString(), ";");
        }).reduce(function (p, c) {
          return p + c;
        }, ""), "\"");
      }

      return "";
    }
  }, {
    key: "serializeAttrs",
    value: function serializeAttrs() {
      var _this2 = this;

      var attrsKeys = Object.keys(this.attrs);

      if (attrsKeys.length) {
        return attrsKeys.map(function (key) {
          if (_this2.attrs[key] === null || _this2.attrs[key] === undefined) {
            return "";
          } else {
            return "".concat(key, "='").concat(_this2.attrs[key].toString(), "'");
          }
        }).reduce(function (p, c) {
          return "".concat(p, " ").concat(c);
        }, "");
      } else {
        return "";
      }
    }
  }, {
    key: "serializeProps",
    value: function serializeProps() {
      if (this.className) {
        return "class=\"".concat(this.className, "\"");
      } else {
        return "";
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      if (_share.IS_SINGLE_ELEMENT[this.type]) {
        if (this.children.length) throw new Error("can not add child to ".concat(this.type, " element"));
        return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " />");
      } else {
        if (this.type) {
          return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " >").concat(this.children.reduce(function (p, c) {
            if (p.length && c instanceof TextElement && p[p.length - 1] instanceof TextElement) {
              p.push("<!-- -->");
              p.push(c);
            } else {
              p.push(c);
            }

            return p;
          }, []).map(function (dom) {
            return dom.toString();
          }).reduce(function (p, c) {
            return p + c;
          }, ""), "</").concat(this.type, ">");
        } else {
          return this.children.map(function (dom) {
            return dom.toString();
          }).reduce(function (p, c) {
            return p + c;
          }, "");
        }
      }
    }
  }]);

  return Element;
}();
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.Element = Element;

var createServerDom = function createServerDom(fiber) {
  var dom = fiber.__isTextNode__ ? new TextElement(fiber.__vdom__) : new Element(fiber.__vdom__.type);
  fiber.dom = dom;
  (0, _tool.updateDom)(dom, _share.EMPTY_OBJECT, fiber.__isTextNode__ ? _share.EMPTY_OBJECT : fiber.__vdom__.props, fiber);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


var commitServer = function commitServer(fiber, parentDom) {
  createServerDom(fiber);

  if (fiber.__pendingMount__) {
    parentDom.appendChild(fiber.dom);
  }

  fiber.applyRef();
};

exports.commitServer = commitServer;
},{"../fiber/index.js":21,"../share.js":37,"./tool.js":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDom = exports.getNativeEventName = exports.getDom = exports.findLatestDomFromComponentFiber = void 0;

var _env = require("../env.js");

var _highlight = require("./highlight.js");

var _index = require("../vdom/index.js");

var _share = require("../share.js");

var _index2 = require("../fiber/index.js");

var _prop = require("./prop.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var findLatestDomFromFiber = function findLatestDomFromFiber(fiber) {
  var currentLoopFiberArray = [fiber];

  while (currentLoopFiberArray.length) {
    var _fiber = currentLoopFiberArray.shift();

    if (_fiber.dom) return _fiber.dom;
    currentLoopFiberArray.push.apply(currentLoopFiberArray, _toConsumableArray(_fiber.children));
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var findLatestDomFromComponentFiber = function findLatestDomFromComponentFiber(fiber) {
  if (fiber) {
    if (fiber.dom) return fiber.dom;

    for (var i = 0; i < fiber.children.length; i++) {
      var dom = findLatestDomFromFiber(fiber.children[i]);
      if (dom) return dom;
    }
  }
};
/**
 *
 * @param {string} eventName
 * @param {MyReactVDom} vdom
 * @returns
 */


exports.findLatestDomFromComponentFiber = findLatestDomFromComponentFiber;

var getNativeEventName = function getNativeEventName(eventName, vdom) {
  var isCapture = false;

  if (eventName.endsWith("Capture")) {
    isCapture = true;
    eventName = eventName.split("Capture")[0];
  }

  if (eventName === "DoubleClick") {
    eventName = "dblclick";
  } else if (eventName === "Change") {
    if (vdom.type === "input") {
      var _vdom$props, _vdom$props2;

      if (((_vdom$props = vdom.props) === null || _vdom$props === void 0 ? void 0 : _vdom$props.type) === "radio" || ((_vdom$props2 = vdom.props) === null || _vdom$props2 === void 0 ? void 0 : _vdom$props2.type) === "checkbox") {
        eventName = "click";
      } else {
        eventName = "input";
      }
    } else {
      eventName = "change";
    }
  } else {
    eventName = eventName.toLowerCase();
  }

  return {
    isCapture: isCapture,
    eventName: eventName
  };
};
/**
 *
 * @param {HTMLElement} element
 * @param {{[k: string]: any}} oldProps
 * @param {{[k: string]: any}} newProps
 * @param {MyReactFiberNode} fiber
 * @returns
 */
// TODO need improve props & attrs


exports.getNativeEventName = getNativeEventName;

var updateDom = function updateDom(element, oldProps, newProps, fiber) {
  if (fiber.__isTextNode__) {
    element.textContent = fiber.__vdom__;
  } else if (fiber.__isPlainNode__) {
    Object.keys(oldProps).filter(_prop.isEvent).filter(function (key) {
      return (0, _prop.isGone)(newProps)(key) || (0, _prop.isNew)(oldProps, newProps)(key);
    }).forEach(function (key) {
      var _getNativeEventName = getNativeEventName(key.slice(2), fiber.__preRenderVdom__),
          isCapture = _getNativeEventName.isCapture,
          eventName = _getNativeEventName.eventName;

      fiber.removeEventListener(eventName, oldProps[key], isCapture);
    });
    Object.keys(oldProps).filter(_prop.isProperty).filter((0, _prop.isGone)(newProps)).forEach(function (key) {
      if (key === "className") {
        if (fiber.nameSpace) {
          element.removeAttribute("class");
        } else {
          element[key] = "";
        }
      } else if (key === "value") {
        element[key] = "";
      } else {
        element.removeAttribute(key);
      }
    });
    Object.keys(oldProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(oldProps[styleKey] || {}).filter((0, _prop.isGone)(newProps[styleKey] || {})).forEach(function (styleName) {
        element.style[styleName] = "";
      });
    });
    Object.keys(newProps).filter(_prop.isEvent).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      var _getNativeEventName2 = getNativeEventName(key.slice(2), fiber.__vdom__),
          eventName = _getNativeEventName2.eventName,
          isCapture = _getNativeEventName2.isCapture;

      fiber.addEventListener(eventName, newProps[key], isCapture);
    });
    Object.keys(newProps).filter(_prop.isProperty).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      if (key === "className") {
        if (fiber.nameSpace) {
          element.setAttribute("class", newProps[key] || "");
        } else {
          element[key] = newProps[key] || "";
        }
      } else if (key === "autofocus" || key === "autoFocus") {
        if (newProps[key]) {
          element[key.toLowerCase()] = newProps[key];
          Promise.resolve().then(function () {
            element.focus();
          });
        }
      } else if (key === "value") {
        element[key] = newProps[key];
      } else {
        if (newProps[key] !== null && newProps[key] !== undefined && newProps[key] !== false) {
          element.setAttribute(key, newProps[key]);
        } else {
          element.removeAttribute(key);
        }
      }
    });
    Object.keys(newProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(newProps[styleKey] || {}).filter((0, _prop.isNew)(oldProps[styleKey] || {}, newProps[styleKey])).forEach(function (styleName) {
        if (!_share.IS_UNIT_LESS_NUMBER[styleName] && typeof newProps[styleKey][styleName] === "number") {
          element[styleKey][styleName] = "".concat(newProps[styleKey][styleName], "px");
          return;
        }

        if (newProps[styleKey][styleName] !== null && newProps[styleKey][styleName] !== undefined) {
          element[styleKey][styleName] = newProps[styleKey][styleName];
        } else {
          element[styleKey][styleName] = "";
        }
      });
    });
  }

  if (_env.isMounted.current && !_env.isHydrateRender.current && !_env.isServerRender.current && (_env.enableHighLight.current || window.__highlight__)) {
    _highlight.HighLight.getHighLightInstance().highLight(fiber);
  }

  return element;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {(f: MyReactFiberNode) => MyReactFiberNode} transform
 */


exports.updateDom = updateDom;

var getDom = function getDom(fiber, transform) {
  if (fiber) {
    if (fiber.dom) return fiber.dom;
    return getDom(transform(fiber), transform);
  }
};

exports.getDom = getDom;
},{"../env.js":19,"../fiber/index.js":21,"../share.js":37,"../vdom/index.js":45,"./highlight.js":11,"./prop.js":14}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runLayoutEffect = exports.runEffect = exports.pushLayoutEffect = exports.pushEffect = void 0;

var _index = require("./fiber/index.js");

var _env = require("./env.js");

var prepareEffectArray = function prepareEffectArray(effectArray, index) {
  effectArray[index] = effectArray[index] || [];
  return effectArray[index];
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} effect
 */


var pushLayoutEffect = function pushLayoutEffect(fiber, effect) {
  if (_env.isServerRender.current) return;
  prepareEffectArray(_env.pendingLayoutEffectArray.current, fiber.deepIndex).push(effect);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} effect
 */


exports.pushLayoutEffect = pushLayoutEffect;

var pushEffect = function pushEffect(fiber, effect) {
  if (_env.isServerRender.current) return;
  prepareEffectArray(_env.pendingEffectArray.current, fiber.deepIndex).push(effect);
};

exports.pushEffect = pushEffect;

var runLayoutEffect = function runLayoutEffect() {
  var allLayoutEffectArray = _env.pendingLayoutEffectArray.current.slice(0);

  for (var i = allLayoutEffectArray.length - 1; i >= 0; i--) {
    var effectArray = allLayoutEffectArray[i];

    if (Array.isArray(effectArray) && effectArray.length) {
      effectArray.forEach(function (effect) {
        if (typeof effect === "function") {
          effect();
        } else {
          effect.effect = false;
          effect.__pendingEffect__ = false;
          effect.cancel && effect.cancel();
          effect.cancel = effect.value();
        }
      });
    }
  }

  _env.pendingLayoutEffectArray.current = [];
};

exports.runLayoutEffect = runLayoutEffect;

var runEffect = function runEffect() {
  var allEffectArray = _env.pendingEffectArray.current.slice(0);

  if (allEffectArray.length) {
    Promise.resolve().then(function () {
      for (var i = allEffectArray.length - 1; i >= 0; i--) {
        var effectArray = allEffectArray[i];

        if (Array.isArray(effectArray)) {
          effectArray.forEach(function (effect) {
            effect.effect = false;
            effect.__pendingEffect__ = false;
            effect.cancel && effect.cancel();
            if (effect.__fiber__.mount) effect.cancel = effect.value();
          });
        }
      }
    });
  }

  _env.pendingEffectArray.current = [];
};

exports.runEffect = runEffect;
},{"./env.js":19,"./fiber/index.js":21}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.createPortal = createPortal;
exports.forwardRef = forwardRef;
exports.lazy = lazy;
exports.memo = memo;

var _share = require("./share.js");

var _symbol = require("./symbol.js");

var _index = require("./vdom/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createPortal(element, container) {
  var _createElement;

  return (0, _index.createElement)((_createElement = {}, _defineProperty(_createElement, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_createElement, "type", _symbol.MY_REACT_Portal), _createElement), {
    container: container
  }, element);
}

var contextId = 0;

function createContext(value) {
  var _ContextObject, _ProviderObject, _ConsumerObject;

  var ContextObject = (_ContextObject = {}, _defineProperty(_ContextObject, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_ContextObject, "type", _symbol.MY_REACT_Context), _defineProperty(_ContextObject, "id", contextId++), _ContextObject);
  var ProviderObject = (_ProviderObject = {}, _defineProperty(_ProviderObject, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_ProviderObject, "type", _symbol.MY_REACT_Provider), _defineProperty(_ProviderObject, "value", value), _ProviderObject);
  var ConsumerObject = (_ConsumerObject = {}, _defineProperty(_ConsumerObject, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_ConsumerObject, "type", _symbol.MY_REACT_Consumer), _defineProperty(_ConsumerObject, "Internal", _share.MyReactInternalInstance), _ConsumerObject);
  Object.defineProperty(ConsumerObject, "Context", {
    get: function get() {
      return ContextObject;
    },
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(ProviderObject, "Context", {
    get: function get() {
      return ContextObject;
    },
    enumerable: false,
    configurable: false
  });
  ContextObject.Provider = ProviderObject;
  ContextObject.Consumer = ConsumerObject;
  return ContextObject;
}

function forwardRef(ForwardRefRender) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_ref, "type", _symbol.MY_REACT_ForwardRef), _defineProperty(_ref, "render", ForwardRefRender), _ref;
}

function memo(MemoRender) {
  var _MemoObject;

  var MemoObject = (_MemoObject = {}, _defineProperty(_MemoObject, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_MemoObject, "type", _symbol.MY_REACT_Memo), _defineProperty(_MemoObject, "render", MemoRender), _MemoObject);
  Object.defineProperty(MemoObject, "isMyReactMemoComponent", {
    get: function get() {
      return true;
    },
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(MemoObject, "isMyReactForwardRefRender", {
    get: function get() {
      return _typeof(MemoRender) === "object" && MemoRender.type === _symbol.MY_REACT_ForwardRef;
    },
    enumerable: false,
    configurable: false
  });
  return MemoObject;
}

function lazy(loader) {
  var _LazyObject;

  var LazyObject = (_LazyObject = {}, _defineProperty(_LazyObject, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_LazyObject, "type", _symbol.MY_REACT_Lazy), _defineProperty(_LazyObject, "loader", loader), _defineProperty(_LazyObject, "_initial", true), _defineProperty(_LazyObject, "_loaded", false), _defineProperty(_LazyObject, "_result", null), _LazyObject);
  Object.defineProperty(LazyObject, "isMyReactLazyComponent", {
    get: function get() {
      return true;
    },
    enumerable: false,
    configurable: false
  });
  return LazyObject;
}
},{"./share.js":37,"./symbol.js":38,"./vdom/index.js":45}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootFiber = exports.rootContainer = exports.pendingUpdateFiberArray = exports.pendingUnmountFiberArray = exports.pendingSyncModifyFiberArray = exports.pendingPositionFiberArray = exports.pendingMountFiberArray = exports.pendingLayoutEffectArray = exports.pendingEffectArray = exports.pendingAsyncModifyTopLevelFiber = exports.pendingAsyncModifyFiberArray = exports.pendingAsyncModifyFiber = exports.nextTransformFiberArray = exports.isServerRender = exports.isMounted = exports.isHydrateRender = exports.globalLoop = exports.enableKeyDiff = exports.enableHighLight = exports.enableEventSystem = exports.enableDebugLog = exports.enableControlComponent = exports.enableAsyncUpdate = exports.enableAllCheck = exports.currentTransformFiberArray = exports.currentRunningFiber = exports.currentHookDeepIndex = exports.currentFunctionFiber = exports.asyncUpdateTimeStep = exports.asyncUpdateTimeLimit = void 0;

var _share = require("./share.js");

var asyncUpdateTimeLimit = 18;
exports.asyncUpdateTimeLimit = asyncUpdateTimeLimit;
var globalLoop = (0, _share.createRef)(false);
exports.globalLoop = globalLoop;
var rootFiber = (0, _share.createRef)(null);
exports.rootFiber = rootFiber;
var rootContainer = (0, _share.createRef)(null);
exports.rootContainer = rootContainer;
var currentRunningFiber = (0, _share.createRef)(null);
exports.currentRunningFiber = currentRunningFiber;
var currentFunctionFiber = (0, _share.createRef)(null);
exports.currentFunctionFiber = currentFunctionFiber;
var currentHookDeepIndex = (0, _share.createRef)(0);
exports.currentHookDeepIndex = currentHookDeepIndex;
var isMounted = (0, _share.createRef)(false);
exports.isMounted = isMounted;
var isServerRender = (0, _share.createRef)(false);
exports.isServerRender = isServerRender;
var isHydrateRender = (0, _share.createRef)(false); // ==== feature ==== //

exports.isHydrateRender = isHydrateRender;
var enableKeyDiff = (0, _share.createRef)(true);
exports.enableKeyDiff = enableKeyDiff;
var enableHighLight = (0, _share.createRef)(false);
exports.enableHighLight = enableHighLight;
var enableDebugLog = (0, _share.createRef)(false);
exports.enableDebugLog = enableDebugLog;
var enableAllCheck = (0, _share.createRef)(true);
exports.enableAllCheck = enableAllCheck;
var enableAsyncUpdate = (0, _share.createRef)(true);
exports.enableAsyncUpdate = enableAsyncUpdate;
var enableEventSystem = (0, _share.createRef)(true);
exports.enableEventSystem = enableEventSystem;
var enableControlComponent = (0, _share.createRef)(true); // ==== running ==== //

exports.enableControlComponent = enableControlComponent;
var asyncUpdateTimeStep = (0, _share.createRef)(null);
exports.asyncUpdateTimeStep = asyncUpdateTimeStep;
var nextTransformFiberArray = (0, _share.createRef)([]);
exports.nextTransformFiberArray = nextTransformFiberArray;
var currentTransformFiberArray = (0, _share.createRef)([]); // ==== update ==== //

exports.currentTransformFiberArray = currentTransformFiberArray;
var pendingEffectArray = (0, _share.createRef)([]);
exports.pendingEffectArray = pendingEffectArray;
var pendingLayoutEffectArray = (0, _share.createRef)([]);
exports.pendingLayoutEffectArray = pendingLayoutEffectArray;
var pendingSyncModifyFiberArray = (0, _share.createRef)([]);
exports.pendingSyncModifyFiberArray = pendingSyncModifyFiberArray;
var pendingAsyncModifyFiberArray = (0, _share.createRef)(_share.SORT_BY_DEEP_HEAP);
exports.pendingAsyncModifyFiberArray = pendingAsyncModifyFiberArray;
var pendingAsyncModifyTopLevelFiber = (0, _share.createRef)(null);
exports.pendingAsyncModifyTopLevelFiber = pendingAsyncModifyTopLevelFiber;
var pendingAsyncModifyFiber = (0, _share.createRef)(null);
exports.pendingAsyncModifyFiber = pendingAsyncModifyFiber;
var pendingMountFiberArray = (0, _share.createRef)([]);
exports.pendingMountFiberArray = pendingMountFiberArray;
var pendingUpdateFiberArray = (0, _share.createRef)([]);
exports.pendingUpdateFiberArray = pendingUpdateFiberArray;
var pendingUnmountFiberArray = (0, _share.createRef)([]);
exports.pendingUnmountFiberArray = pendingUnmountFiberArray;
var pendingPositionFiberArray = (0, _share.createRef)([]);
exports.pendingPositionFiberArray = pendingPositionFiberArray;
},{"./share.js":37}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdatedFiberNodeWithUpdateAndPosition = exports.createUpdatedFiberNodeWithUpdate = exports.createUpdatedFiberNode = exports.createNewFiberNodeWithPosition = exports.createNewFiberNodeWithMount = exports.createNewFiberNode = void 0;

var _index = require("../mount/index.js");

var _position = require("../position.js");

var _index2 = require("../vdom/index.js");

var _index3 = require("../update/index.js");

var _instance = require("./instance.js");

/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 */
var createNewFiberNode = function createNewFiberNode(_ref, vdom) {
  var key = _ref.key,
      deepIndex = _ref.deepIndex,
      fiberParent = _ref.fiberParent,
      effect = _ref.effect,
      dom = _ref.dom;
  var newFiber = new _instance.MyReactFiberNode(key, deepIndex, fiberParent, null, effect);
  newFiber.dom = dom;
  newFiber.initialParent();
  newFiber.updateFromAlternate();
  newFiber.installVDom(vdom);
  newFiber.checkVDom(vdom);
  newFiber.initialType();
  newFiber.initialContext();
  newFiber.resetEffect();
  newFiber.resetPortal();
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 */


exports.createNewFiberNode = createNewFiberNode;

var createNewFiberNodeWithMount = function createNewFiberNodeWithMount(_ref2, vdom) {
  var key = _ref2.key,
      deepIndex = _ref2.deepIndex,
      fiberParent = _ref2.fiberParent,
      effect = _ref2.effect,
      dom = _ref2.dom;
  var newFiber = createNewFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    effect: effect,
    dom: dom
  }, vdom);
  (0, _index.pushMount)(newFiber);
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


exports.createNewFiberNodeWithMount = createNewFiberNodeWithMount;

var createNewFiberNodeWithPosition = function createNewFiberNodeWithPosition(_ref3, vdom, previousRenderFiber) {
  var key = _ref3.key,
      deepIndex = _ref3.deepIndex,
      fiberParent = _ref3.fiberParent,
      effect = _ref3.effect,
      dom = _ref3.dom;
  var newFiber = createNewFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    effect: effect,
    dom: dom
  }, vdom);
  (0, _position.pushPosition)(newFiber, previousRenderFiber);
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 */


exports.createNewFiberNodeWithPosition = createNewFiberNodeWithPosition;

var createUpdatedFiberNode = function createUpdatedFiberNode(_ref4, vdom) {
  var key = _ref4.key,
      deepIndex = _ref4.deepIndex,
      fiberParent = _ref4.fiberParent,
      fiberAlternate = _ref4.fiberAlternate,
      effect = _ref4.effect;
  var newFiber = new _instance.MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect);
  newFiber.initialParent();
  newFiber.updateFromAlternate();
  newFiber.installVDom(vdom);
  newFiber.checkVDom(vdom);
  newFiber.initialContext();
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 */


exports.createUpdatedFiberNode = createUpdatedFiberNode;

var createUpdatedFiberNodeWithUpdate = function createUpdatedFiberNodeWithUpdate(_ref5, vdom) {
  var key = _ref5.key,
      deepIndex = _ref5.deepIndex,
      fiberParent = _ref5.fiberParent,
      fiberAlternate = _ref5.fiberAlternate,
      effect = _ref5.effect;
  var newFiber = createUpdatedFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect
  }, vdom);

  if (newFiber.__isTextNode__ || newFiber.__isPlainNode__) {
    if (newFiber.dom) {
      (0, _index3.pushUpdate)(newFiber);
    } else {
      console.error("error");
    }
  }

  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


exports.createUpdatedFiberNodeWithUpdate = createUpdatedFiberNodeWithUpdate;

var createUpdatedFiberNodeWithUpdateAndPosition = function createUpdatedFiberNodeWithUpdateAndPosition(_ref6, vdom, previousRenderFiber) {
  var key = _ref6.key,
      deepIndex = _ref6.deepIndex,
      fiberParent = _ref6.fiberParent,
      fiberAlternate = _ref6.fiberAlternate,
      effect = _ref6.effect;
  var newFiber = createUpdatedFiberNodeWithUpdate({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect
  }, vdom);

  if (fiberAlternate !== previousRenderFiber) {
    (0, _position.pushPosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
};

exports.createUpdatedFiberNodeWithUpdateAndPosition = createUpdatedFiberNodeWithUpdateAndPosition;
},{"../mount/index.js":30,"../position.js":32,"../update/index.js":42,"../vdom/index.js":45,"./instance.js":22}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MyReactFiberNode", {
  enumerable: true,
  get: function get() {
    return _instance.MyReactFiberNode;
  }
});
Object.defineProperty(exports, "createNewFiberNode", {
  enumerable: true,
  get: function get() {
    return _create.createNewFiberNode;
  }
});
Object.defineProperty(exports, "createNewFiberNodeWithMount", {
  enumerable: true,
  get: function get() {
    return _create.createNewFiberNodeWithMount;
  }
});
Object.defineProperty(exports, "createNewFiberNodeWithPosition", {
  enumerable: true,
  get: function get() {
    return _create.createNewFiberNodeWithPosition;
  }
});
Object.defineProperty(exports, "createUpdatedFiberNodeWithUpdate", {
  enumerable: true,
  get: function get() {
    return _create.createUpdatedFiberNodeWithUpdate;
  }
});
Object.defineProperty(exports, "createUpdatedFiberNodeWithUpdateAndPosition", {
  enumerable: true,
  get: function get() {
    return _create.createUpdatedFiberNodeWithUpdateAndPosition;
  }
});
Object.defineProperty(exports, "getContextFiber", {
  enumerable: true,
  get: function get() {
    return _tool.getContextFiber;
  }
});
Object.defineProperty(exports, "updateFiberNodeWithPosition", {
  enumerable: true,
  get: function get() {
    return _update.updateFiberNodeWithPosition;
  }
});

var _tool = require("./tool.js");

var _instance = require("./instance.js");

var _update = require("./update.js");

var _create = require("./create.js");
},{"./create.js":20,"./instance.js":22,"./tool.js":23,"./update.js":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactFiberNode = void 0;

var _index = require("../hook/index.js");

var _index2 = require("../component/index.js");

var _debug = require("../debug.js");

var _index3 = require("../update/index.js");

var _env = require("../env.js");

var _index4 = require("../vdom/index.js");

var _share = require("../share.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactFiberInternal = /*#__PURE__*/function (_MyReactInternalType) {
  _inherits(MyReactFiberInternal, _MyReactInternalType);

  var _super = _createSuper(MyReactFiberInternal);

  function MyReactFiberInternal() {
    var _this;

    _classCallCheck(this, MyReactFiberInternal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "__internal_node_diff__", {
      // for diff
      __diffMount__: false,

      /**
       * @type MyReactFiberNode
       */
      __diffPrevRender__: null,

      /**
       * @type MyReactFiberNode[]
       */
      __renderedChildren__: [],
      // for log
      __renderedCount__: 1,
      // for render
      __renderDynamic__: false,
      // for diff core
      __updateRender__: false,
      __ignoreHook__: false,
      __updateTimeStep__: Date.now(),
      __lastUpdateTimeStep__: null,
      __newestFiber__: (0, _share.createRef)(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "__internal_node_state__", {
      __pendingMount__: false,
      __pendingUpdate__: false,
      __pendingUnmount__: false,
      __pendingPosition__: false
    });

    _defineProperty(_assertThisInitialized(_this), "nameSpace", void 0);

    _defineProperty(_assertThisInitialized(_this), "dom", void 0);

    _defineProperty(_assertThisInitialized(_this), "__internal_event_state__", {});

    _defineProperty(_assertThisInitialized(_this), "__internal_context_map__", {
      /**
       * @type MyReactInstance[]
       */
      __dependence__: [],
      __contextMap__: {}
    });

    _defineProperty(_assertThisInitialized(_this), "__internal_suspense_state__", {
      __fallback__: null
    });

    _defineProperty(_assertThisInitialized(_this), "alternate", null);

    return _this;
  }

  _createClass(MyReactFiberInternal, [{
    key: "__diffMount__",
    get: function get() {
      return this.__internal_node_diff__.__diffMount__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__diffMount__ = v;
    }
  }, {
    key: "__diffPrevRender__",
    get: function get() {
      return this.__internal_node_diff__.__diffPrevRender__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__diffPrevRender__ = v;
    }
  }, {
    key: "__updateRender__",
    get: function get() {
      return this.__internal_node_diff__.__updateRender__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__updateRender__ = v;
    }
  }, {
    key: "__ignoreHook__",
    get: function get() {
      return this.__internal_node_diff__.__ignoreHook__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__ignoreHook__ = v;
    }
  }, {
    key: "__renderedCount__",
    get: function get() {
      return this.__internal_node_diff__.__renderedCount__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderedCount__ = v;
    }
  }, {
    key: "__renderedChildren__",
    get: function get() {
      return this.__internal_node_diff__.__renderedChildren__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderedChildren__ = v;
    }
  }, {
    key: "__renderDynamic__",
    get: function get() {
      return this.__internal_node_diff__.__renderDynamic__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderDynamic__ = v;
    }
  }, {
    key: "__newestFiber__",
    get: function get() {
      return this.__internal_node_diff__.__newestFiber__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__newestFiber__ = v;
    }
  }, {
    key: "__pendingMount__",
    get: function get() {
      return this.__internal_node_state__.__pendingMount__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingMount__ = v;
    }
  }, {
    key: "__pendingUpdate__",
    get: function get() {
      return this.__internal_node_state__.__pendingUpdate__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingUpdate__ = v;
    }
  }, {
    key: "__pendingPosition__",
    get: function get() {
      return this.__internal_node_state__.__pendingPosition__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingPosition__ = v;
    }
  }, {
    key: "__pendingUnmount__",
    get: function get() {
      return this.__internal_node_state__.__pendingUnmount__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingUnmount__ = v;
    }
    /**
     * @type string
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(event, cb, isCapture) {
      var _this2 = this;

      if (_env.enableEventSystem.current) {
        var eventName = "".concat(event, "_").concat(isCapture);

        if (this.__internal_event_state__[eventName]) {
          this.__internal_event_state__[eventName].cb.push(cb);
        } else {
          var handler = function handler() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var e = args[0];
            e.nativeEvent = e;
            (0, _debug.safeCallWithFiber)({
              action: function action() {
                return handler.cb.forEach(function (cb) {
                  return typeof cb === "function" && cb.call.apply(cb, [null].concat(args));
                });
              },
              fiber: _this2
            });

            if (_env.enableControlComponent.current) {
              // TODO more
              if (_this2.__vdom__.type === "input" && event === "input") {
                var _this2$memoProps;

                if (((_this2$memoProps = _this2.memoProps) === null || _this2$memoProps === void 0 ? void 0 : _this2$memoProps.value) !== undefined) {
                  _this2.dom["value"] = _this2.memoProps.value;
                }
              }
            }
          };

          handler.cb = [cb];
          this.__internal_event_state__[eventName] = handler;
          this.dom.addEventListener(event, handler, isCapture);
        }
      } else {
        this.dom.addEventListener(event, cb, isCapture);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, cb, isCapture) {
      if (_env.enableEventSystem.current) {
        var eventName = "".concat(event, "_").concat(isCapture);
        if (!this.__internal_event_state__[eventName]) return;
        this.__internal_event_state__[eventName].cb = this.__internal_event_state__[eventName].cb.filter(function (_cb) {
          return _cb !== cb || typeof _cb !== "function";
        });
      } else {
        this.dom.removeEventListener(event, cb, isCapture);
      }
    }
  }, {
    key: "__dependence__",
    get: function get() {
      return this.__internal_context_map__.__dependence__;
    },
    set: function set(v) {
      this.__internal_context_map__.__dependence__ = v;
    }
  }, {
    key: "__contextMap__",
    get: function get() {
      return this.__internal_context_map__.__contextMap__;
    },
    set: function set(v) {
      this.__internal_context_map__.__contextMap__ = v;
    }
    /**
     *
     * @param {MyReactInstance} node
     */

  }, {
    key: "addDependence",
    value: function addDependence(node) {
      var dependence = this.__dependence__;

      if (dependence.every(function (n) {
        return n !== node;
      })) {
        dependence.push(node);
      }
    }
    /**
     *
     * @param {MyReactInstance} node
     */

  }, {
    key: "removeDependence",
    value: function removeDependence(node) {
      var dependence = this.__dependence__;
      this.__dependence__ = dependence.filter(function (n) {
        return n !== node;
      });
    }
  }, {
    key: "__fallback__",
    get: function get() {
      return this.__internal_suspense_state__.__fallback__;
    },
    set: function set(v) {
      this.__internal_suspense_state__.__fallback__ = v;
    } // TODO for fast refresh SEE https://github.com/facebook/react/blob/main/packages/react-refresh/src/ReactFreshRuntime.js

  }]);

  return MyReactFiberInternal;
}(_share.MyReactInternalType);

var MyReactFiberNode = /*#__PURE__*/function (_MyReactFiberInternal) {
  _inherits(MyReactFiberNode, _MyReactFiberInternal);

  var _super2 = _createSuper(MyReactFiberNode);

  /**
   * @type number
   */

  /**
   * @type 'PLACEMENT' | 'UPDATE' | 'POSITION'
   */

  /**
   * @type MyReactFiberNode[]
   */

  /**
   * @type MyReactFiberNode[]
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type MyReactHookNode[]
   */

  /**
   * @type MyReactInstance & MyReactComponent
   */

  /**
   * @type MyReactVDom
   */

  /**
   * @type MyReactVDom
   */
  // used for update dom
  function MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect) {
    var _this3;

    _classCallCheck(this, MyReactFiberNode);

    _this3 = _super2.call(this);

    _defineProperty(_assertThisInitialized(_this3), "key", void 0);

    _defineProperty(_assertThisInitialized(_this3), "deepIndex", void 0);

    _defineProperty(_assertThisInitialized(_this3), "effect", void 0);

    _defineProperty(_assertThisInitialized(_this3), "mount", true);

    _defineProperty(_assertThisInitialized(_this3), "initial", true);

    _defineProperty(_assertThisInitialized(_this3), "memoProps", null);

    _defineProperty(_assertThisInitialized(_this3), "memoState", null);

    _defineProperty(_assertThisInitialized(_this3), "children", []);

    _defineProperty(_assertThisInitialized(_this3), "child", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberChildHead", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberChildFoot", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberParent", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberSibling", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberAlternate", null);

    _defineProperty(_assertThisInitialized(_this3), "hookHead", void 0);

    _defineProperty(_assertThisInitialized(_this3), "hookFoot", void 0);

    _defineProperty(_assertThisInitialized(_this3), "hookList", []);

    _defineProperty(_assertThisInitialized(_this3), "instance", null);

    _defineProperty(_assertThisInitialized(_this3), "__vdom__", null);

    _defineProperty(_assertThisInitialized(_this3), "__preRenderVdom__", null);

    _defineProperty(_assertThisInitialized(_this3), "__needUpdate__", false);

    _this3.key = key;
    _this3.deepIndex = deepIndex;
    _this3.fiberParent = fiberParent;
    _this3.fiberAlternate = fiberAlternate; // this.alternate = fiberAlternate;

    _this3.effect = effect;
    return _this3;
  }
  /**
   *
   * @param {MyReactFiberNode} childFiber
   */


  _createClass(MyReactFiberNode, [{
    key: "addChild",
    value: function addChild(childFiber) {
      if (_env.enableAllCheck.current) {
        if (this.children.some(function (f) {
          return f === childFiber;
        })) {
          throw new Error("already add child");
        }
      }

      this.children.push(childFiber);

      if (!this.child) {
        this.child = childFiber;
        this.fiberChildHead = childFiber;
        this.fiberChildFoot = childFiber;
      } else {
        this.fiberChildFoot.fiberSibling = childFiber;
        this.fiberChildFoot = childFiber;
      }
    }
  }, {
    key: "initialParent",
    value: function initialParent() {
      if (this.fiberParent) {
        this.fiberParent.addChild(this);

        if (this.fiberParent.nameSpace) {
          this.nameSpace = this.fiberParent.nameSpace;
        } // inherit suspense fallback


        if (this.fiberParent.__isSuspense__) {
          this.__fallback__ = this.fiberParent.memoProps.fallback;
        } else {
          this.__fallback__ = this.fiberParent.__fallback__;
        }
      }
    }
  }, {
    key: "initialContext",
    value: function initialContext() {
      if (this.fiberParent) {
        // get ContextMap from parent fiber
        var contextMap = Object.assign({}, this.fiberParent.__contextMap__, this.__contextMap__); // after vdom install

        if (this.__isContextProvider__) {
          // get context id;
          var contextObject = this.__vdom__.type.Context;
          var contextId = contextObject.id;
          contextMap[contextId] = this; // if (contextMap[contextId]) {
          //   contextMap[contextId].current = this;
          // } else {
          //   contextMap[contextId] = createRef(this);
          // }
        }

        this.__contextMap__ = contextMap;
      }
    }
    /**
     *
     * @param {MyReactFiberNode} parentFiber
     */

  }, {
    key: "installParent",
    value: function installParent(parentFiber) {
      this.fiberParent = parentFiber;
      this.fiberSibling = null;
      this.initialParent();
    }
  }, {
    key: "updateFromAlternate",
    value: function updateFromAlternate() {
      if (this.fiberAlternate) {
        var fiberAlternate = this.fiberAlternate;

        if (fiberAlternate !== this) {
          // inherit
          this.dom = fiberAlternate.dom;
          this.hookHead = fiberAlternate.hookHead;
          this.hookFoot = fiberAlternate.hookFoot;
          this.instance = fiberAlternate.instance;
          this.hookList = fiberAlternate.hookList.slice(0);
          this.__preRenderVdom__ = fiberAlternate.__preRenderVdom__;
          this.__dependence__ = fiberAlternate.__dependence__.slice(0);
          this.__newestFiber__ = fiberAlternate.__newestFiber__;
          this.__renderedChildren__ = fiberAlternate.__renderedChildren__.slice(0);
          this.__internal_node_type__ = Object.assign({}, fiberAlternate.__internal_node_type__);
          this.__internal_event_state__ = Object.assign({}, fiberAlternate.__internal_event_state__);
          this.__internal_suspense_state__ = Object.assign({}, fiberAlternate.__internal_suspense_state__); // update
          // fiberAlternate.dom = null;
          // fiberAlternate.hookList = [];
          // fiberAlternate.hookHead = null;
          // fiberAlternate.hookFoot = null;
          // fiberAlternate.instance = null;

          fiberAlternate.mount = false;
          fiberAlternate.effect = null;
          fiberAlternate.fiberAlternate = null;
          fiberAlternate.__needUpdate__ = false; // fiberAlternate.__internal_node_type__ = null;
          // fiberAlternate.__internal_node_diff__ = null;
          // fiberAlternate.__internal_event_state__ = null;
        }

        this.__updateRender__ = true;
        this.__newestFiber__.current = this;
        this.__renderedCount__ = fiberAlternate.__renderedCount__ + 1;
      }
    }
  }, {
    key: "beforeTransform",
    value: function beforeTransform() {
      this.child = null;
      this.children = [];
      this.fiberChildHead = null;
      this.fiberChildFoot = null;
      this.__renderedChildren__ = [];
    }
  }, {
    key: "afterTransform",
    value: function afterTransform() {
      this.initial = false;
      this.fiberAlternate = null;
      this.__needUpdate__ = false;
      this.__ignoreHook__ = false;
    }
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "addHook",
    value: function addHook(hookNode) {
      if (_env.enableAllCheck.current) {
        if (this.hookList.some(function (h) {
          return h === hookNode;
        })) {
          throw new Error("already add hook");
        }
      }

      this.hookList.push(hookNode);

      if (!this.hookHead) {
        this.hookHead = hookNode;
        this.hookFoot = hookNode;
      } else {
        this.hookFoot.hookNext = hookNode;
        hookNode.hookPrev = this.hookFoot;
        this.hookFoot = hookNode;
      }
    }
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "checkHook",
    value: function checkHook(hookNode) {
      if (_env.enableAllCheck.current) {
        if (hookNode.hookType === "useMemo" || hookNode.hookType === "useEffect" || hookNode.hookType === "useCallback" || hookNode.hookType === "useLayoutEffect") {
          if (typeof hookNode.value !== "function") {
            throw new Error("".concat(this.hookType, " initial error"));
          }
        }

        if (hookNode.hookType === "useContext") {
          if (_typeof(hookNode.value) !== "object" || hookNode.value === null) {
            throw new Error("".concat(this.hookType, " initial error"));
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.mount) {
        (0, _index3.pendingUpdate)(this);
      } else {
        (0, _debug.warning)({
          message: "can not update unmount fiber",
          fiber: this
        });
      }
    }
  }, {
    key: "updateLazy",
    value: function updateLazy() {
      if (this.mount) {
        // TODO need improve
        this.__ignoreHook__ = true;
        (0, _index3.pendingUpdate)(this);
      }
    }
  }, {
    key: "prepareUpdate",
    value: function prepareUpdate() {
      this.__needUpdate__ = true;
      this.__updateRender__ = true;
      this.fiberAlternate = this;
    }
  }, {
    key: "memoChildren",
    value: function memoChildren() {
      var _this4 = this;

      var fiberAlternate = this.fiberAlternate;

      if (fiberAlternate !== this) {
        this.child = fiberAlternate.child;
        this.children = fiberAlternate.children;
        this.fiberChildHead = fiberAlternate.fiberChildHead;
        this.fiberChildFoot = fiberAlternate.fiberChildFoot;
        this.__renderedChildren__ = fiberAlternate.__renderedChildren__;
        this.children.forEach(function (child) {
          return child.fiberParent = _this4;
        });
      }
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "installVDom",
    value: function installVDom(vdom) {
      this.__vdom__ = vdom;
      this.key = vdom === null || vdom === void 0 ? void 0 : vdom.key;
      this.memoProps = vdom === null || vdom === void 0 ? void 0 : vdom.props; // TODO need improve

      if ((vdom === null || vdom === void 0 ? void 0 : vdom.type) === "svg") this.nameSpace = "http://www.w3.org/2000/svg";
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "checkVDom",
    value: function checkVDom(vdom) {
      if (_env.enableAllCheck.current) {
        if ((0, _index4.isValidElement)(vdom)) {
          // TODO
          if (!vdom._store["validType"]) {
            if (this.__isContextConsumer__) {
              if (typeof vdom.children !== "function") {
                throw new Error("Consumer's children must as a function, got ".concat(vdom.children));
              }
            }

            if (this.__isPortal__) {
              if (!vdom.props.container) {
                throw new Error("createPortal() need a dom container");
              }
            }

            if (this.__isMemo__ || this.__isForwardRef__) {
              if (typeof vdom.type.render !== "function") {
                if (_typeof(vdom.type.render) !== "object" || !vdom.type.render.type) {
                  throw new Error("invalid render type, ".concat(vdom.type));
                }
              }
            }

            if (this.__isForwardRef__) {
              var _vdom$type$render$pro;

              if (typeof vdom.type.render === "function" && (_vdom$type$render$pro = vdom.type.render.prototype) !== null && _vdom$type$render$pro !== void 0 && _vdom$type$render$pro.isMyReactComponent) {
                throw new Error("forwardRef need a function component, but get a class component");
              }
            }

            if (this.__isSuspense__) {
              if (this.__vdom__.children === undefined || this.__vdom__.children === null) {
                throw new Error("Suspense component need a children to render");
              }
            }

            if (vdom.ref) {
              if (_typeof(vdom.ref) !== "object" && typeof vdom.ref !== "function") {
                throw new Error("unSupport ref usage");
              }
            }

            if (_typeof(vdom.type) === "object") {
              var _vdom$type;

              if (!((_vdom$type = vdom.type) !== null && _vdom$type !== void 0 && _vdom$type.type)) {
                throw new Error("invalid element type");
              }
            }

            if (vdom.key && typeof vdom.key !== "string" && typeof vdom.key !== "number") {
              throw new Error("invalid key props");
            }

            vdom._store["validType"] = true;
          }
        }
      }
    }
  }, {
    key: "initialType",
    value: function initialType() {
      var vdom = this.__vdom__;

      if ((0, _index4.isValidElement)(vdom)) {
        var nodeType = (0, _index4.getTypeFromVDom)(vdom);
        this.setNodeType(nodeType);
        return;
      }

      if (_typeof(vdom) === "object") {
        this.setNodeType({
          __isEmptyNode__: true
        });
        return;
      }

      this.setNodeType({
        __isTextNode__: true
      });
    }
  }, {
    key: "resetEffect",
    value: function resetEffect() {
      if (!this.__isPlainNode__ && !this.__isTextNode__) {
        this.effect = null;
      }
    }
  }, {
    key: "resetPortal",
    value: function resetPortal() {
      if (this.__isPortal__) {
        this.dom = this.__vdom__.props.container;
      }
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "checkIsSameType",
    value: function checkIsSameType(vdom) {
      if ((0, _index4.isValidElement)(vdom)) {
        var nodeType = (0, _index4.getTypeFromVDom)(vdom);
        var result = this.isSameType(nodeType);

        if (result) {
          if (this.__isDynamicNode__ || this.__isPlainNode__) {
            return this.__vdom__.type === vdom.type;
          }

          if (this.__isObjectNode__) {
            return this.__vdom__.type.type === vdom.type.type;
          }

          return true;
        } else {
          return false;
        }
      }

      if (_typeof(vdom) === "object") return this.__isEmptyNode__;
      return this.__isTextNode__;
    }
  }, {
    key: "applyRef",
    value: function applyRef() {
      if (this.__isPlainNode__) {
        if (this.dom) {
          var ref = this.__vdom__.ref;

          if (_typeof(ref) === "object" && ref !== null) {
            ref.current = this.dom;
          } else if (typeof ref === "function") {
            ref.call(null, this.dom);
          }
        } else {
          throw new Error("not have a dom for plainNode");
        }
      }
    } // after dom update

  }, {
    key: "applyVDom",
    value: function applyVDom() {
      this.__preRenderVdom__ = this.__isTextNode__ ? this.__vdom__ : Object.assign({}, this.__vdom__);
    }
    /**
     *
     * @param {MyReactInstance & MyReactComponent} instance
     */

  }, {
    key: "installInstance",
    value: function installInstance(instance) {
      this.instance = instance;
    }
    /**
     *
     * @param {MyReactInstance & MyReactComponent} instance
     */

  }, {
    key: "checkInstance",
    value: function checkInstance(instance) {
      if (_env.enableAllCheck.current) {
        // todo
        _share.COMPONENT_METHOD.forEach(function (key) {
          if (instance[key] && typeof instance[key] !== "function") {
            throw new Error("current component method ".concat(key, " has wrong type"));
          }
        });
      }
    }
  }]);

  return MyReactFiberNode;
}(MyReactFiberInternal);

exports.MyReactFiberNode = MyReactFiberNode;
},{"../component/index.js":3,"../debug.js":8,"../env.js":19,"../hook/index.js":27,"../share.js":37,"../update/index.js":42,"../vdom/index.js":45}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextFiber = void 0;

var _instance = require("./instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} providerObject
 * @returns {MyReactFiberNode | null}
 */
var getProviderFiber = function getProviderFiber(fiber, providerObject) {
  if (fiber && providerObject) {
    if (fiber.__isObjectNode__ && fiber.__isContextProvider__ && fiber.__vdom__.type === providerObject) {
      return fiber;
    } else {
      return getProviderFiber(fiber.fiberParent, providerObject);
    }
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} contextObject
 * @returns {MyReactFiberNode | null}
 */


var getContextFiber = function getContextFiber(fiber, contextObject) {
  if (contextObject) {
    var id = contextObject.id;
    var providerFiber = fiber.__contextMap__[id];
    var newestProvider = providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.__newestFiber__.current;

    if (newestProvider) {
      fiber.__contextMap__[id] = newestProvider;
    }

    return newestProvider;
  } // return getProviderFiber(fiber, contextObject?.Provider);

};

exports.getContextFiber = getContextFiber;
},{"./instance.js":22}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFiberNodeWithPosition = void 0;

var _position = require("../position.js");

var _index = require("../vdom/index.js");

var _instance = require("./instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} fiberParent
 * @param {MyReactVDom} vdom
 */
var updateFiberNode = function updateFiberNode(fiber, fiberParent, vdom) {
  fiber.fiberAlternate = fiber;
  fiber.installParent(fiberParent);
  fiber.updateFromAlternate();
  fiber.installVDom(vdom);
  fiber.checkVDom(vdom);
  fiber.initialContext();
  return fiber;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} fiberParent
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


var updateFiberNodeWithPosition = function updateFiberNodeWithPosition(fiber, fiberParent, vdom, previousRenderFiber) {
  var newFiber = updateFiberNode(fiber, fiberParent, vdom);

  if (newFiber !== previousRenderFiber) {
    (0, _position.pushPosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
};

exports.updateFiberNodeWithPosition = updateFiberNodeWithPosition;
},{"../position.js":32,"../vdom/index.js":45,"./instance.js":22}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHookNode = void 0;

var _debug = require("../debug.js");

var _index = require("../fiber/index.js");

var _feature = require("./feature.js");

var _instance = require("./instance.js");

// from react source code
var defaultReducer = function defaultReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
};
/**
 *
 * @param {{hookIndex: number, value: any, reducer: Function, depArray: any[], hookType: string}} param
 * @param {MyReactFiberNode} fiber
 */


var createHookNode = function createHookNode(_ref, fiber) {
  var hookIndex = _ref.hookIndex,
      value = _ref.value,
      reducer = _ref.reducer,
      depArray = _ref.depArray,
      hookType = _ref.hookType;
  var newHookNode = new _instance.MyReactHookNode(hookIndex, value, reducer || defaultReducer, depArray, hookType);
  newHookNode.setFiber(fiber);
  fiber.addHook(newHookNode);
  fiber.checkHook(newHookNode);
  newHookNode.initialResult();
  return newHookNode;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {number} hookIndex
 * @param {any} value
 * @param {any[]} depArray
 * @param {string} hookType
 */


var getHookNode = function getHookNode(fiber, hookIndex, value, reducer, depArray, hookType) {
  if (!fiber) throw new Error("can not use hook out of component");
  var currentHook = null;

  if (fiber.hookList.length > hookIndex) {
    currentHook = fiber.hookList[hookIndex];

    if (currentHook.hookType !== hookType) {
      throw new Error((0, _debug.getHookTree)(currentHook, hookType));
    }

    currentHook.setFiber(fiber);
    currentHook.updateResult(value, reducer, depArray);
  } else if (!fiber.__updateRender__ || fiber.__ignoreHook__) {
    currentHook = createHookNode({
      hookIndex: hookIndex,
      hookType: hookType,
      depArray: depArray,
      reducer: reducer,
      value: value
    }, fiber);
  } else {
    var temp = {
      hookType: "undefined",
      hookIndex: hookIndex
    };
    temp.__fiber__ = fiber;
    fiber.hookFoot && (fiber.hookFoot.hookNext = temp);
    throw new Error((0, _debug.getHookTree)(temp, hookType));
  }

  if (currentHook.effect) {
    (0, _feature.pushHookEffect)(currentHook);
  }

  return currentHook;
};

exports.getHookNode = getHookNode;
},{"../debug.js":8,"../fiber/index.js":21,"./feature.js":26,"./instance.js":28}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushHookEffect = void 0;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;

var _share = require("../share.js");

var _create = require("./create.js");

var _debug = require("../debug.js");

var _instance = require("./instance.js");

var _effect = require("../effect.js");

var _env = require("../env.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function useState(initialValue) {
  var currentHookNode = (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof initialValue === "function" ? initialValue : function () {
    return initialValue;
  }, null, null, "useState");
  return [currentHookNode.result, currentHookNode.dispatch];
}

function useEffect(action, depArray) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useEffect");
}

function useLayoutEffect(action, depArray) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useLayoutEffect");
}

function useCallback(action, depArray) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useCallback").result;
}

function useMemo(action, depArray) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useMemo").result;
}

function useRef(value) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, (0, _share.createRef)(value), null, null, "useRef").result;
}

function useContext(Context) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, Context, null, null, "useContext").result;
}

function useReducer(reducer, initialArg, init) {
  var currentHook = (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof init === "function" ? function () {
    return init(initialArg);
  } : function () {
    return initialArg;
  }, reducer, null, "useReducer");
  return [currentHook.result, currentHook.dispatch];
}

function useImperativeHandle(ref, createHandle, deps) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, ref, createHandle, deps, "useImperativeHandle");
}

function useDebugValue() {
  if (_env.enableDebugLog.current) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["[debug value]: \n"].concat(args, ["\ncomponent tree:", (0, _debug.getFiberTree)(_env.currentFunctionFiber.current)]));
  }
}
/**
 *
 * @param {MyReactHookNode} hookNode
 */


var pushHookEffect = function pushHookEffect(hookNode) {
  if (!hookNode.__pendingEffect__) {
    hookNode.__pendingEffect__ = true;

    if (hookNode.hookType === "useEffect") {
      (0, _effect.pushEffect)(hookNode.__fiber__, hookNode);
    } else if (hookNode.hookType === "useLayoutEffect") {
      (0, _effect.pushLayoutEffect)(hookNode.__fiber__, hookNode);
    } else {
      (0, _effect.pushLayoutEffect)(hookNode.__fiber__, function () {
        if (hookNode.value && _typeof(hookNode.value) === "object") {
          hookNode.value.current = hookNode.reducer.call(null);
        }

        hookNode.effect = false;
        hookNode.__pendingEffect = false;
      });
    }
  }
};

exports.pushHookEffect = pushHookEffect;
},{"../debug.js":8,"../effect.js":17,"../env.js":19,"../share.js":37,"./create.js":25,"./instance.js":28}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MyReactHookNode", {
  enumerable: true,
  get: function get() {
    return _instance.MyReactHookNode;
  }
});
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function get() {
    return _feature.useCallback;
  }
});
Object.defineProperty(exports, "useContext", {
  enumerable: true,
  get: function get() {
    return _feature.useContext;
  }
});
Object.defineProperty(exports, "useDebugValue", {
  enumerable: true,
  get: function get() {
    return _feature.useDebugValue;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function get() {
    return _feature.useEffect;
  }
});
Object.defineProperty(exports, "useImperativeHandle", {
  enumerable: true,
  get: function get() {
    return _feature.useImperativeHandle;
  }
});
Object.defineProperty(exports, "useLayoutEffect", {
  enumerable: true,
  get: function get() {
    return _feature.useLayoutEffect;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function get() {
    return _feature.useMemo;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function get() {
    return _feature.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function get() {
    return _feature.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return _feature.useState;
  }
});

var _instance = require("./instance.js");

var _feature = require("./feature.js");
},{"./feature.js":26,"./instance.js":28}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactHookNode = void 0;

var _tool = require("../tool.js");

var _index = require("../fiber/index.js");

var _share = require("../share.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactHookNode = /*#__PURE__*/function (_MyReactInternalInsta) {
  _inherits(MyReactHookNode, _MyReactInternalInsta);

  var _super = _createSuper(MyReactHookNode);

  /**
   * @type number
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type Function
   */

  /**
   * @type boolean
   */

  /**
   * @type any
   */

  /**
   * @type Function
   */

  /**
   * @type any[]
   */
  function MyReactHookNode(hookIndex, value, reducer, depArray, hookType) {
    var _this;

    _classCallCheck(this, MyReactHookNode);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "hookIndex", void 0);

    _defineProperty(_assertThisInitialized(_this), "hookNext", null);

    _defineProperty(_assertThisInitialized(_this), "hookPrev", null);

    _defineProperty(_assertThisInitialized(_this), "cancel", null);

    _defineProperty(_assertThisInitialized(_this), "effect", false);

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _defineProperty(_assertThisInitialized(_this), "reducer", void 0);

    _defineProperty(_assertThisInitialized(_this), "depArray", void 0);

    _defineProperty(_assertThisInitialized(_this), "hookType", void 0);

    _defineProperty(_assertThisInitialized(_this), "result", null);

    _defineProperty(_assertThisInitialized(_this), "prevResult", null);

    _defineProperty(_assertThisInitialized(_this), "__pendingEffect", false);

    _defineProperty(_assertThisInitialized(_this), "dispatch", function (action) {
      try {
        _this.updateTimeStep();
      } catch (e) {
        _this.error = true;
      }

      _this.prevResult = _this.result;
      _this.result = _this.reducer(_this.result, action);

      if (!Object.is(_this.result, _this.prevResult)) {
        Promise.resolve().then(function () {
          if (!_this.error) {
            _this.__fiber__.update();
          } else {
            _this.cancel && _this.cancel();
          }
        });
      }
    });

    _this.hookIndex = hookIndex;
    _this.value = value;
    _this.reducer = reducer;
    _this.depArray = depArray;
    _this.hookType = hookType;
    return _this;
  }

  _createClass(MyReactHookNode, [{
    key: "contextValue",
    value: function contextValue() {
      var ProviderFiber = (0, _index.getContextFiber)(this.__fiber__, this.value);

      if (ProviderFiber) {
        this.setContext(ProviderFiber);
      }

      return (ProviderFiber === null || ProviderFiber === void 0 ? void 0 : ProviderFiber.__vdom__.props.value) || this.value.Provider.value;
    }
  }, {
    key: "initialResult",
    value: function initialResult() {
      if (this.hookType === "useState" || this.hookType === "useMemo" || this.hookType === "useReducer") {
        this.result = this.value.call(null);
        return;
      }

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect" || this.hookType === "useImperativeHandle") {
        this.effect = true;
        return;
      }

      if (this.hookType === "useCallback" || this.hookType === "useRef") {
        this.result = this.value;
        return;
      }

      if (this.hookType === "useContext") {
        this.result = this.contextValue();
        return;
      }
    }
  }, {
    key: "updateResult",
    value: function updateResult(newValue, newReducer, newDepArray) {
      if (this.hookType === "useMemo" || this.hookType === "useEffect" || this.hookType === "useCallback" || this.hookType === "useLayoutEffect" || this.hookType === "useImperativeHandle") {
        if (newDepArray && !this.depArray) {
          throw new Error("??????????????????");
        }

        if (!newDepArray && this.depArray) {
          throw new Error("??????????????????");
        }
      }

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect" || this.hookType === "useImperativeHandle") {
        if (!newDepArray) {
          this.value = newValue;
          this.reducer = newReducer || this.reducer;
          this.depArray = newDepArray;
          this.effect = true;
        } else if (!(0, _tool.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newValue;
          this.reducer = newReducer || this.reducer;
          this.depArray = newDepArray;
          this.effect = true;
        }
      }

      if (this.hookType === "useCallback") {
        if (!(0, _tool.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newValue;
          this.prevResult = this.result;
          this.result = newValue;
          this.depArray = newDepArray;
        }
      }

      if (this.hookType === "useMemo") {
        if (!(0, _tool.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newValue;
          this.prevResult = this.result;
          this.result = newValue.call(null);
          this.depArray = newDepArray;
        }
      }

      if (this.hookType === "useContext") {
        if (!this.__context__ || !this.__context__.mount || !Object.is(this.value, newValue)) {
          this.value = newValue;
          this.prevResult = this.result;
          this.result = this.contextValue();
        }
      }

      if (this.hookType === "useReducer") {
        this.value = newValue;
        this.reducer = newReducer;
      }
    }
  }]);

  return MyReactHookNode;
}(_share.MyReactInternalInstance);

exports.MyReactHookNode = MyReactHookNode;
},{"../fiber/index.js":21,"../share.js":37,"../tool.js":39}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runMount = exports.pushMount = void 0;

var _loop = require("./loop.js");

var _tool = require("../dom/tool.js");

var _index = require("../fiber/index.js");

var _env = require("../env.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var pushMount = function pushMount(fiber) {
  if (!fiber.__pendingMount__) {
    fiber.__pendingMount__ = true;

    _env.pendingMountFiberArray.current.push(fiber);
  }
};

exports.pushMount = pushMount;

var runMount = function runMount() {
  var allMountArray = _env.pendingMountFiberArray.current.slice(0);

  allMountArray.forEach(function (fiber) {
    if (fiber.mount && fiber.__pendingMount__) {
      (0, _loop.mountLoop)(fiber, (0, _tool.getDom)(fiber.fiberParent, function (f) {
        return f.fiberParent;
      }) || _env.rootContainer.current);
    }
  });
  _env.pendingMountFiberArray.current = [];
};

exports.runMount = runMount;
},{"../dom/tool.js":16,"../env.js":19,"../fiber/index.js":21,"./loop.js":31}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pushMount", {
  enumerable: true,
  get: function get() {
    return _feature.pushMount;
  }
});
Object.defineProperty(exports, "runMount", {
  enumerable: true,
  get: function get() {
    return _feature.runMount;
  }
});

var _feature = require("./feature.js");
},{"./feature.js":29}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountLoop = void 0;

var _index = require("../fiber/index.js");

var _env = require("../env.js");

var _debug = require("../debug.js");

var _index2 = require("../dom/index.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */
var commitMount = function commitMount(currentFiber, parentDom) {
  if (currentFiber.__isTextNode__ || currentFiber.__isPlainNode__) {
    if (_env.isServerRender.current) {
      (0, _index2.commitServer)(currentFiber, parentDom);
    } else if (_env.isHydrateRender.current) {
      (0, _index2.commitHydrate)(currentFiber, parentDom);
    } else {
      (0, _index2.commitClient)(currentFiber, parentDom);
    }

    (0, _debug.debugWithDom)(currentFiber);
  }

  currentFiber.effect = null;
  currentFiber.__pendingMount__ = false;
};
/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */


var mountLoop = function mountLoop(currentFiber, parentDom) {
  if (currentFiber && currentFiber.mount) {
    (0, _debug.safeCallWithFiber)({
      action: function action() {
        return commitMount(currentFiber, parentDom);
      },
      fiber: currentFiber
    });
  }

  currentFiber.children.forEach(function (f) {
    return mountLoop(f, currentFiber.dom || parentDom);
  });
};

exports.mountLoop = mountLoop;
},{"../debug.js":8,"../dom/index.js":13,"../env.js":19,"../fiber/index.js":21}],32:[function(require,module,exports){
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
  if (!fiber) throw new Error("can not update position for root fiber");
  if (fiber.__isPortal__ || fiber.__isPlainNode__ || fiber.__isTextNode__ || fiber.__root__) return fiber;
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
},{"./debug.js":8,"./dom/client.js":9,"./env.js":19,"./fiber/index.js":21}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.Children = void 0;
Object.defineProperty(exports, "Consumer", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Consumer;
  }
});
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Element;
  }
});
Object.defineProperty(exports, "ForwardRef", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_ForwardRef;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Fragment;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Portal;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Provider;
  }
});
exports.PureComponent = void 0;
Object.defineProperty(exports, "Suspense", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Suspense;
  }
});
Object.defineProperty(exports, "cloneElement", {
  enumerable: true,
  get: function get() {
    return _index.cloneElement;
  }
});
Object.defineProperty(exports, "createContext", {
  enumerable: true,
  get: function get() {
    return _element.createContext;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _index.createElement;
  }
});
Object.defineProperty(exports, "createPortal", {
  enumerable: true,
  get: function get() {
    return _element.createPortal;
  }
});
Object.defineProperty(exports, "createRef", {
  enumerable: true,
  get: function get() {
    return _share.createRef;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "findDOMNode", {
  enumerable: true,
  get: function get() {
    return _index3.findDOMNode;
  }
});
Object.defineProperty(exports, "forwardRef", {
  enumerable: true,
  get: function get() {
    return _element.forwardRef;
  }
});
Object.defineProperty(exports, "hydrate", {
  enumerable: true,
  get: function get() {
    return _index3.hydrate;
  }
});
Object.defineProperty(exports, "isValidElement", {
  enumerable: true,
  get: function get() {
    return _index.isValidElement;
  }
});
Object.defineProperty(exports, "lazy", {
  enumerable: true,
  get: function get() {
    return _element.lazy;
  }
});
Object.defineProperty(exports, "memo", {
  enumerable: true,
  get: function get() {
    return _element.memo;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _index3.render;
  }
});
Object.defineProperty(exports, "renderToString", {
  enumerable: true,
  get: function get() {
    return _index3.renderToString;
  }
});
exports.unstable_batchedUpdates = void 0;
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function get() {
    return _index4.useCallback;
  }
});
Object.defineProperty(exports, "useContext", {
  enumerable: true,
  get: function get() {
    return _index4.useContext;
  }
});
Object.defineProperty(exports, "useDebugValue", {
  enumerable: true,
  get: function get() {
    return _index4.useDebugValue;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function get() {
    return _index4.useEffect;
  }
});
Object.defineProperty(exports, "useImperativeHandle", {
  enumerable: true,
  get: function get() {
    return _index4.useImperativeHandle;
  }
});
Object.defineProperty(exports, "useLayoutEffect", {
  enumerable: true,
  get: function get() {
    return _index4.useLayoutEffect;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function get() {
    return _index4.useMemo;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function get() {
    return _index4.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function get() {
    return _index4.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return _index4.useState;
  }
});

var _debug = require("./debug.js");

var _share = require("./share.js");

var _children = require("./children.js");

var _element = require("./element.js");

var _index = require("./vdom/index.js");

var _index2 = require("./component/index.js");

var _index3 = require("./dom/index.js");

var _symbol = require("./symbol.js");

var _index4 = require("./hook/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var unstable_batchedUpdates = _debug.safeCall;
exports.unstable_batchedUpdates = unstable_batchedUpdates;
var ReactDOM = {
  render: _index3.render,
  hydrate: _index3.hydrate,
  findDOMNode: _index3.findDOMNode,
  createPortal: _element.createPortal,
  renderToString: _index3.renderToString,
  unmountComponentAtNode: _index3.unmountComponentAtNode,
  unstable_batchedUpdates: unstable_batchedUpdates
};
var Children = {
  map: _children.map,
  only: _children.only,
  count: _children.count,
  toArray: _children.toArray,
  forEach: _children.forEach
};
exports.Children = Children;
var Component = _index2.MyReactComponent;
exports.Component = Component;
var PureComponent = _index2.MyReactPureComponent;
exports.PureComponent = PureComponent;
var React = {
  // core
  Component: Component,
  PureComponent: PureComponent,
  createElement: _index.createElement,
  // feature
  memo: _element.memo,
  createRef: _share.createRef,
  forwardRef: _element.forwardRef,
  cloneElement: _index.cloneElement,
  createContext: _element.createContext,
  isValidElement: _index.isValidElement,
  // element type
  Element: _symbol.MY_REACT_Element,
  Portal: _symbol.MY_REACT_Portal,
  Provider: _symbol.MY_REACT_Provider,
  Consumer: _symbol.MY_REACT_Consumer,
  Fragment: _symbol.MY_REACT_Fragment,
  ForwardRef: _symbol.MY_REACT_ForwardRef,
  // hook
  useRef: _index4.useRef,
  useMemo: _index4.useMemo,
  useState: _index4.useState,
  useEffect: _index4.useEffect,
  useReducer: _index4.useReducer,
  useContext: _index4.useContext,
  useCallback: _index4.useCallback,
  useDebugValue: _index4.useDebugValue,
  useLayoutEffect: _index4.useLayoutEffect,
  useImperativeHandle: _index4.useImperativeHandle,
  // children api
  Children: Children,
  // split chunk
  lazy: _element.lazy,
  Suspense: _symbol.MY_REACT_Suspense
};
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
Object.keys(React).forEach(function (key) {
  if (key.startsWith("use")) {
    globalThis[key] = React[key];
  }
});

var mixIn = _objectSpread(_objectSpread({}, React), ReactDOM);

var _default = mixIn;
exports["default"] = _default;
},{"./children.js":1,"./component/index.js":3,"./debug.js":8,"./dom/index.js":13,"./element.js":18,"./hook/index.js":27,"./share.js":37,"./symbol.js":38,"./vdom/index.js":45}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRender = void 0;

var _debug = require("../debug.js");

var _loop = require("./loop.js");

var _feature = require("../mount/feature.js");

var _env = require("../env.js");

var _index = require("../fiber/index.js");

var _effect = require("../effect.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var startRender = function startRender(fiber) {
  _env.globalLoop.current = true;
  (0, _debug.safeCall)(function () {
    return (0, _loop.renderLoopSync)(fiber);
  });
  (0, _feature.runMount)();
  (0, _effect.runLayoutEffect)();
  (0, _effect.runEffect)();
  _env.isMounted.current = true;
  _env.globalLoop.current = false;
};

exports.startRender = startRender;
},{"../debug.js":8,"../effect.js":17,"../env.js":19,"../fiber/index.js":21,"../mount/feature.js":29,"./loop.js":36}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "renderLoopAsync", {
  enumerable: true,
  get: function get() {
    return _loop.renderLoopAsync;
  }
});
Object.defineProperty(exports, "renderLoopSync", {
  enumerable: true,
  get: function get() {
    return _loop.renderLoopSync;
  }
});
Object.defineProperty(exports, "startRender", {
  enumerable: true,
  get: function get() {
    return _feature.startRender;
  }
});

var _feature = require("./feature.js");

var _loop = require("./loop.js");
},{"./feature.js":34,"./loop.js":36}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoopSync = exports.renderLoopAsync = void 0;

var _debug = require("../debug.js");

var _index = require("../fiber/index.js");

var _index2 = require("../core/index.js");

var _env = require("../env.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var transformStart = function transformStart(fiber) {
  var _currentTransformFibe;

  (_currentTransformFibe = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe, _toConsumableArray((0, _index2.nextWork)(fiber)));
};

var transformCurrent = function transformCurrent() {
  while (_env.currentTransformFiberArray.current.length) {
    var _nextTransformFiberAr;

    var fiber = _env.currentTransformFiberArray.current.shift();

    (_nextTransformFiberAr = _env.nextTransformFiberArray.current).push.apply(_nextTransformFiberAr, _toConsumableArray((0, _index2.nextWork)(fiber)));
  }
};

var transformNext = function transformNext() {
  while (_env.nextTransformFiberArray.current.length) {
    var _currentTransformFibe2;

    var fiber = _env.nextTransformFiberArray.current.shift();

    (_currentTransformFibe2 = _env.currentTransformFiberArray.current).push.apply(_currentTransformFibe2, _toConsumableArray((0, _index2.nextWork)(fiber)));
  }
};

var transformAll = function transformAll() {
  transformCurrent();
  transformNext();

  if (_env.currentTransformFiberArray.current.length) {
    transformAll();
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var renderLoopSync = function renderLoopSync(fiber) {
  transformStart(fiber);
  transformAll();
};
/**
 *
 * @param {{get: () => MyReactFiberNode, set: (nextFiber) => void}} pendingNext
 * @param {() => boolean} shouldYield
 * @param {(fiber: MyReactFiberNode) => void} pendingNext
 * @param {() => void} cb
 * @param {() => void} final
 */


exports.renderLoopSync = renderLoopSync;

var renderLoopAsync = function renderLoopAsync(pendingNext, shouldYield, cb, _final) {
  var count = 0;
  var fiber = pendingNext.get();

  while (fiber && !shouldYield()) {
    count++;
    fiber = (0, _debug.safeCall)(function () {
      return (0, _index2.nextWorkAsync)(fiber);
    });
    pendingNext.set(fiber);
  }

  if (count) {
    cb();
  }

  _final();
};

exports.renderLoopAsync = renderLoopAsync;
},{"../core/index.js":6,"../debug.js":8,"../env.js":19,"../fiber/index.js":21}],37:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRef = exports.SORT_BY_DEEP_HEAP = exports.NODE_TYPE_KEY = exports.MyReactInternalType = exports.MyReactInternalInstance = exports.IS_UNIT_LESS_NUMBER = exports.IS_SINGLE_ELEMENT = exports.EMPTY_OBJECT = exports.EMPTY_ARRAY = exports.DEFAULT_NODE_TYPE = exports.COMPONENT_METHOD = void 0;

var _debug = require("./debug.js");

var _env = require("./env.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NODE_TYPE_KEY = ["__isTextNode__", "__isEmptyNode__", "__isPlainNode__", "__isFragmentNode__", // ====  object node ==== //
"__isObjectNode__", "__isMemo__", "__isPortal__", "__isForwardRef__", "__isContextProvider__", "__isContextConsumer__", "__isLazy__", "__isSuspense__", // ==== dynamic node ==== //
"__isDynamicNode__", "__isClassComponent__", "__isFunctionComponent__"];
exports.NODE_TYPE_KEY = NODE_TYPE_KEY;
var COMPONENT_METHOD = ["shouldComponentUpdate", "componentDidMount", "componentDidUpdate", "componentWillUnmount"];
exports.COMPONENT_METHOD = COMPONENT_METHOD;
var DEFAULT_NODE_TYPE = {
  __isTextNode__: false,
  __isEmptyNode__: false,
  __isPlainNode__: false,
  __isFragmentNode__: false,
  // ====  object node ==== //
  __isObjectNode__: false,
  __isMemo__: false,
  __isPortal__: false,
  __isForwardRef__: false,
  __isContextProvider__: false,
  __isContextConsumer__: false,
  __isLazy__: false,
  __isSuspense__: false,
  // ==== dynamic node ==== //
  __isDynamicNode__: false,
  __isClassComponent__: false,
  __isFunctionComponent__: false
}; // number props

exports.DEFAULT_NODE_TYPE = DEFAULT_NODE_TYPE;
var IS_UNIT_LESS_NUMBER = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
exports.IS_UNIT_LESS_NUMBER = IS_UNIT_LESS_NUMBER;
var IS_SINGLE_ELEMENT = {
  br: true,
  hr: true,
  img: true,
  input: true,
  param: true,
  meta: true,
  link: true
}; // from ReactDOM  TODO

exports.IS_SINGLE_ELEMENT = IS_SINGLE_ELEMENT;
var possibleStandardNames = {
  // HTML
  accept: "accept",
  acceptcharset: "acceptCharset",
  "accept-charset": "acceptCharset",
  accesskey: "accessKey",
  action: "action",
  allowfullscreen: "allowFullScreen",
  alt: "alt",
  as: "as",
  async: "async",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  capture: "capture",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  challenge: "challenge",
  charset: "charSet",
  checked: "checked",
  children: "children",
  cite: "cite",
  "class": "className",
  classid: "classID",
  classname: "className",
  cols: "cols",
  colspan: "colSpan",
  content: "content",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controls: "controls",
  controlslist: "controlsList",
  coords: "coords",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  data: "data",
  datetime: "dateTime",
  "default": "default",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  defer: "defer",
  dir: "dir",
  disabled: "disabled",
  disablepictureinpicture: "disablePictureInPicture",
  download: "download",
  draggable: "draggable",
  enctype: "encType",
  "for": "htmlFor",
  form: "form",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  headers: "headers",
  height: "height",
  hidden: "hidden",
  high: "high",
  href: "href",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  icon: "icon",
  id: "id",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  integrity: "integrity",
  is: "is",
  itemid: "itemID",
  itemprop: "itemProp",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyParams",
  keytype: "keyType",
  kind: "kind",
  label: "label",
  lang: "lang",
  list: "list",
  loop: "loop",
  low: "low",
  manifest: "manifest",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  max: "max",
  maxlength: "maxLength",
  media: "media",
  mediagroup: "mediaGroup",
  method: "method",
  min: "min",
  minlength: "minLength",
  multiple: "multiple",
  muted: "muted",
  name: "name",
  nomodule: "noModule",
  nonce: "nonce",
  novalidate: "noValidate",
  open: "open",
  optimum: "optimum",
  pattern: "pattern",
  placeholder: "placeholder",
  playsinline: "playsInline",
  poster: "poster",
  preload: "preload",
  profile: "profile",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rel: "rel",
  required: "required",
  reversed: "reversed",
  role: "role",
  rows: "rows",
  rowspan: "rowSpan",
  sandbox: "sandbox",
  scope: "scope",
  scoped: "scoped",
  scrolling: "scrolling",
  seamless: "seamless",
  selected: "selected",
  shape: "shape",
  size: "size",
  sizes: "sizes",
  span: "span",
  spellcheck: "spellCheck",
  src: "src",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  start: "start",
  step: "step",
  style: "style",
  summary: "summary",
  tabindex: "tabIndex",
  target: "target",
  title: "title",
  type: "type",
  usemap: "useMap",
  value: "value",
  width: "width",
  wmode: "wmode",
  wrap: "wrap",
  // SVG
  about: "about",
  accentheight: "accentHeight",
  "accent-height": "accentHeight",
  accumulate: "accumulate",
  additive: "additive",
  alignmentbaseline: "alignmentBaseline",
  "alignment-baseline": "alignmentBaseline",
  allowreorder: "allowReorder",
  alphabetic: "alphabetic",
  amplitude: "amplitude",
  arabicform: "arabicForm",
  "arabic-form": "arabicForm",
  ascent: "ascent",
  attributename: "attributeName",
  attributetype: "attributeType",
  autoreverse: "autoReverse",
  azimuth: "azimuth",
  basefrequency: "baseFrequency",
  baselineshift: "baselineShift",
  "baseline-shift": "baselineShift",
  baseprofile: "baseProfile",
  bbox: "bbox",
  begin: "begin",
  bias: "bias",
  by: "by",
  calcmode: "calcMode",
  capheight: "capHeight",
  "cap-height": "capHeight",
  clip: "clip",
  clippath: "clipPath",
  "clip-path": "clipPath",
  clippathunits: "clipPathUnits",
  cliprule: "clipRule",
  "clip-rule": "clipRule",
  color: "color",
  colorinterpolation: "colorInterpolation",
  "color-interpolation": "colorInterpolation",
  colorinterpolationfilters: "colorInterpolationFilters",
  "color-interpolation-filters": "colorInterpolationFilters",
  colorprofile: "colorProfile",
  "color-profile": "colorProfile",
  colorrendering: "colorRendering",
  "color-rendering": "colorRendering",
  contentscripttype: "contentScriptType",
  contentstyletype: "contentStyleType",
  cursor: "cursor",
  cx: "cx",
  cy: "cy",
  d: "d",
  datatype: "datatype",
  decelerate: "decelerate",
  descent: "descent",
  diffuseconstant: "diffuseConstant",
  direction: "direction",
  display: "display",
  divisor: "divisor",
  dominantbaseline: "dominantBaseline",
  "dominant-baseline": "dominantBaseline",
  dur: "dur",
  dx: "dx",
  dy: "dy",
  edgemode: "edgeMode",
  elevation: "elevation",
  enablebackground: "enableBackground",
  "enable-background": "enableBackground",
  end: "end",
  exponent: "exponent",
  externalresourcesrequired: "externalResourcesRequired",
  fill: "fill",
  fillopacity: "fillOpacity",
  "fill-opacity": "fillOpacity",
  fillrule: "fillRule",
  "fill-rule": "fillRule",
  filter: "filter",
  filterres: "filterRes",
  filterunits: "filterUnits",
  floodopacity: "floodOpacity",
  "flood-opacity": "floodOpacity",
  floodcolor: "floodColor",
  "flood-color": "floodColor",
  focusable: "focusable",
  fontfamily: "fontFamily",
  "font-family": "fontFamily",
  fontsize: "fontSize",
  "font-size": "fontSize",
  fontsizeadjust: "fontSizeAdjust",
  "font-size-adjust": "fontSizeAdjust",
  fontstretch: "fontStretch",
  "font-stretch": "fontStretch",
  fontstyle: "fontStyle",
  "font-style": "fontStyle",
  fontvariant: "fontVariant",
  "font-variant": "fontVariant",
  fontweight: "fontWeight",
  "font-weight": "fontWeight",
  format: "format",
  from: "from",
  fx: "fx",
  fy: "fy",
  g1: "g1",
  g2: "g2",
  glyphname: "glyphName",
  "glyph-name": "glyphName",
  glyphorientationhorizontal: "glyphOrientationHorizontal",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphorientationvertical: "glyphOrientationVertical",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  hanging: "hanging",
  horizadvx: "horizAdvX",
  "horiz-adv-x": "horizAdvX",
  horizoriginx: "horizOriginX",
  "horiz-origin-x": "horizOriginX",
  ideographic: "ideographic",
  imagerendering: "imageRendering",
  "image-rendering": "imageRendering",
  in2: "in2",
  "in": "in",
  inlist: "inlist",
  intercept: "intercept",
  k1: "k1",
  k2: "k2",
  k3: "k3",
  k4: "k4",
  k: "k",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  kerning: "kerning",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  letterspacing: "letterSpacing",
  "letter-spacing": "letterSpacing",
  lightingcolor: "lightingColor",
  "lighting-color": "lightingColor",
  limitingconeangle: "limitingConeAngle",
  local: "local",
  markerend: "markerEnd",
  "marker-end": "markerEnd",
  markerheight: "markerHeight",
  markermid: "markerMid",
  "marker-mid": "markerMid",
  markerstart: "markerStart",
  "marker-start": "markerStart",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  mask: "mask",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  mathematical: "mathematical",
  mode: "mode",
  numoctaves: "numOctaves",
  offset: "offset",
  opacity: "opacity",
  operator: "operator",
  order: "order",
  orient: "orient",
  orientation: "orientation",
  origin: "origin",
  overflow: "overflow",
  overlineposition: "overlinePosition",
  "overline-position": "overlinePosition",
  overlinethickness: "overlineThickness",
  "overline-thickness": "overlineThickness",
  paintorder: "paintOrder",
  "paint-order": "paintOrder",
  panose1: "panose1",
  "panose-1": "panose1",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointerevents: "pointerEvents",
  "pointer-events": "pointerEvents",
  points: "points",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  prefix: "prefix",
  preservealpha: "preserveAlpha",
  preserveaspectratio: "preserveAspectRatio",
  primitiveunits: "primitiveUnits",
  property: "property",
  r: "r",
  radius: "radius",
  refx: "refX",
  refy: "refY",
  renderingintent: "renderingIntent",
  "rendering-intent": "renderingIntent",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  requiredfeatures: "requiredFeatures",
  resource: "resource",
  restart: "restart",
  result: "result",
  results: "results",
  rotate: "rotate",
  rx: "rx",
  ry: "ry",
  scale: "scale",
  security: "security",
  seed: "seed",
  shaperendering: "shapeRendering",
  "shape-rendering": "shapeRendering",
  slope: "slope",
  spacing: "spacing",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  speed: "speed",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stemh: "stemh",
  stemv: "stemv",
  stitchtiles: "stitchTiles",
  stopcolor: "stopColor",
  "stop-color": "stopColor",
  stopopacity: "stopOpacity",
  "stop-opacity": "stopOpacity",
  strikethroughposition: "strikethroughPosition",
  "strikethrough-position": "strikethroughPosition",
  strikethroughthickness: "strikethroughThickness",
  "strikethrough-thickness": "strikethroughThickness",
  string: "string",
  stroke: "stroke",
  strokedasharray: "strokeDasharray",
  "stroke-dasharray": "strokeDasharray",
  strokedashoffset: "strokeDashoffset",
  "stroke-dashoffset": "strokeDashoffset",
  strokelinecap: "strokeLinecap",
  "stroke-linecap": "strokeLinecap",
  strokelinejoin: "strokeLinejoin",
  "stroke-linejoin": "strokeLinejoin",
  strokemiterlimit: "strokeMiterlimit",
  "stroke-miterlimit": "strokeMiterlimit",
  strokewidth: "strokeWidth",
  "stroke-width": "strokeWidth",
  strokeopacity: "strokeOpacity",
  "stroke-opacity": "strokeOpacity",
  suppresscontenteditablewarning: "suppressContentEditableWarning",
  suppresshydrationwarning: "suppressHydrationWarning",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textanchor: "textAnchor",
  "text-anchor": "textAnchor",
  textdecoration: "textDecoration",
  "text-decoration": "textDecoration",
  textlength: "textLength",
  textrendering: "textRendering",
  "text-rendering": "textRendering",
  to: "to",
  transform: "transform",
  "typeof": "typeof",
  u1: "u1",
  u2: "u2",
  underlineposition: "underlinePosition",
  "underline-position": "underlinePosition",
  underlinethickness: "underlineThickness",
  "underline-thickness": "underlineThickness",
  unicode: "unicode",
  unicodebidi: "unicodeBidi",
  "unicode-bidi": "unicodeBidi",
  unicoderange: "unicodeRange",
  "unicode-range": "unicodeRange",
  unitsperem: "unitsPerEm",
  "units-per-em": "unitsPerEm",
  unselectable: "unselectable",
  valphabetic: "vAlphabetic",
  "v-alphabetic": "vAlphabetic",
  values: "values",
  vectoreffect: "vectorEffect",
  "vector-effect": "vectorEffect",
  version: "version",
  vertadvy: "vertAdvY",
  "vert-adv-y": "vertAdvY",
  vertoriginx: "vertOriginX",
  "vert-origin-x": "vertOriginX",
  vertoriginy: "vertOriginY",
  "vert-origin-y": "vertOriginY",
  vhanging: "vHanging",
  "v-hanging": "vHanging",
  videographic: "vIdeographic",
  "v-ideographic": "vIdeographic",
  viewbox: "viewBox",
  viewtarget: "viewTarget",
  visibility: "visibility",
  vmathematical: "vMathematical",
  "v-mathematical": "vMathematical",
  vocab: "vocab",
  widths: "widths",
  wordspacing: "wordSpacing",
  "word-spacing": "wordSpacing",
  writingmode: "writingMode",
  "writing-mode": "writingMode",
  x1: "x1",
  x2: "x2",
  x: "x",
  xchannelselector: "xChannelSelector",
  xheight: "xHeight",
  "x-height": "xHeight",
  xlinkactuate: "xlinkActuate",
  "xlink:actuate": "xlinkActuate",
  xlinkarcrole: "xlinkArcrole",
  "xlink:arcrole": "xlinkArcrole",
  xlinkhref: "xlinkHref",
  "xlink:href": "xlinkHref",
  xlinkrole: "xlinkRole",
  "xlink:role": "xlinkRole",
  xlinkshow: "xlinkShow",
  "xlink:show": "xlinkShow",
  xlinktitle: "xlinkTitle",
  "xlink:title": "xlinkTitle",
  xlinktype: "xlinkType",
  "xlink:type": "xlinkType",
  xmlbase: "xmlBase",
  "xml:base": "xmlBase",
  xmllang: "xmlLang",
  "xml:lang": "xmlLang",
  xmlns: "xmlns",
  "xml:space": "xmlSpace",
  xmlnsxlink: "xmlnsXlink",
  "xmlns:xlink": "xmlnsXlink",
  xmlspace: "xmlSpace",
  y1: "y1",
  y2: "y2",
  y: "y",
  ychannelselector: "yChannelSelector",
  z: "z",
  zoomandpan: "zoomAndPan"
};
var EMPTY_ARRAY = [];
exports.EMPTY_ARRAY = EMPTY_ARRAY;
var EMPTY_OBJECT = {};
exports.EMPTY_OBJECT = EMPTY_OBJECT;

var CustomHeap = /*#__PURE__*/function (_Array) {
  _inherits(CustomHeap, _Array);

  var _super = _createSuper(CustomHeap);

  function CustomHeap() {
    var _this;

    var judgeFun = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (o1, o2) {
      return o1 < o2;
    };
    var transferFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (it) {
      return it;
    };

    _classCallCheck(this, CustomHeap);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.judgeFun = judgeFun;
    _this.transferFun = transferFun;

    _this._init();

    return _this;
  }

  _createClass(CustomHeap, [{
    key: "length",
    get: function get() {
      return this.length;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this[0];
    }
  }, {
    key: "pushValue",
    value: function pushValue(val) {
      this.push(val);
      var current = this.length - 1;
      var pre = (current - 1) / 2 | 0;

      while (pre >= 0 && this.judgeFun(this.transferFun(this[pre]), this.transferFun(this[current]))) {
        this._swap(pre, current);

        current = pre;
        pre = (current - 1) / 2 | 0;
      }
    }
  }, {
    key: "popTop",
    value: function popTop() {
      var re = this[0];
      this[0] = this[this.length - 1];
      this.pop();

      this._heapDown(0);

      return re;
    }
  }, {
    key: "_swap",
    value: function _swap(i, j) {
      var temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  }, {
    key: "_heapDown",
    value: function _heapDown(current) {
      var max = current;
      var left = current * 2 + 1;
      var right = current * 2 + 2;

      if (left < this.length && this.judgeFun(this.transferFun(this[max]), this.transferFun(this[left]))) {
        max = left;
      }

      if (right < this.length && this.judgeFun(this.transferFun(this[max]), this.transferFun(this[right]))) {
        max = right;
      }

      if (max !== current) {
        this._swap(max, current);

        this._heapDown(max);
      }
    }
  }, {
    key: "_init",
    value: function _init() {
      var start = (this.length - 1) / 2 | 0;

      for (var i = start; i >= 0; i--) {
        this._heapDown(i);
      }
    }
  }]);

  return CustomHeap;
}( /*#__PURE__*/_wrapNativeSuper(Array));

var SORT_BY_DEEP_HEAP = new CustomHeap(function (o1, o2) {
  return o1 > o2;
}, function (fiber) {
  return fiber.deepIndex;
});
exports.SORT_BY_DEEP_HEAP = SORT_BY_DEEP_HEAP;

var MyReactInternalType = /*#__PURE__*/function () {
  function MyReactInternalType() {
    _classCallCheck(this, MyReactInternalType);

    _defineProperty(this, "__internal_node_type__", {
      __isTextNode__: false,
      __isEmptyNode__: false,
      __isPlainNode__: false,
      __isFragmentNode__: false,
      // ?????????????????????   //
      __isObjectNode__: false,
      __isForwardRef__: false,
      __isPortal__: false,
      __isMemo__: false,
      __isContextProvider__: false,
      __isContextConsumer__: false,
      __isLazy__: false,
      __isSuspense__: false,
      // ???????????? //
      __isDynamicNode__: false,
      __isClassComponent__: false,
      __isFunctionComponent__: false
    });
  }

  _createClass(MyReactInternalType, [{
    key: "__isTextNode__",
    get: function get() {
      return this.__internal_node_type__.__isTextNode__;
    }
  }, {
    key: "__isEmptyNode__",
    get: function get() {
      return this.__internal_node_type__.__isEmptyNode__;
    }
  }, {
    key: "__isPlainNode__",
    get: function get() {
      return this.__internal_node_type__.__isPlainNode__;
    }
  }, {
    key: "__isFragmentNode__",
    get: function get() {
      return this.__internal_node_type__.__isFragmentNode__;
    }
  }, {
    key: "__isObjectNode__",
    get: function get() {
      return this.__internal_node_type__.__isObjectNode__;
    }
  }, {
    key: "__isForwardRef__",
    get: function get() {
      return this.__internal_node_type__.__isForwardRef__;
    }
  }, {
    key: "__isPortal__",
    get: function get() {
      return this.__internal_node_type__.__isPortal__;
    }
  }, {
    key: "__isMemo__",
    get: function get() {
      return this.__internal_node_type__.__isMemo__;
    }
  }, {
    key: "__isContextProvider__",
    get: function get() {
      return this.__internal_node_type__.__isContextProvider__;
    }
  }, {
    key: "__isContextConsumer__",
    get: function get() {
      return this.__internal_node_type__.__isContextConsumer__;
    }
  }, {
    key: "__isLazy__",
    get: function get() {
      return this.__internal_node_type__.__isLazy__;
    }
  }, {
    key: "__isSuspense__",
    get: function get() {
      return this.__internal_node_type__.__isSuspense__;
    }
  }, {
    key: "__isDynamicNode__",
    get: function get() {
      return this.__internal_node_type__.__isDynamicNode__;
    }
  }, {
    key: "__isClassComponent__",
    get: function get() {
      return this.__internal_node_type__.__isClassComponent__;
    }
  }, {
    key: "__isFunctionComponent__",
    get: function get() {
      return this.__internal_node_type__.__isFunctionComponent__;
    }
    /**
     *
     * @param {{__isTextNode__: boolean,
     *  __isEmptyNode__: boolean,
     *  __isPlainNode__: boolean,
     *  __isFragmentNode__: boolean,
     *  __isObjectNode__: boolean,
     *  __isMemo__: boolean,
     *  __isPortal__: boolean,
     *  __isForwardRef__: boolean,
     *  __isContextProvider__: boolean,
     *  __isContextConsumer__: boolean,
     *  __isLazy__: boolean,
     *  __isSuspense__: boolean,
     *  __isDynamicNode__: boolean,
     *  __isClassComponent__: boolean,
     *  __isFunctionComponent__: boolean}} props
     */

  }, {
    key: "setNodeType",
    value: function setNodeType(props) {
      var _this2 = this;

      Object.keys(props || EMPTY_OBJECT).forEach(function (key) {
        _this2.__internal_node_type__[key] = props[key];
      });
    }
    /**
     *
     * @param {{__isTextNode__: boolean,
     *  __isEmptyNode__: boolean,
     *  __isPlainNode__: boolean,
     *  __isFragmentNode__: boolean,
     *  __isObjectNode__: boolean,
     *  __isMemo__: boolean,
     *  __isPortal__: boolean,
     *  __isForwardRef__: boolean,
     *  __isContextProvider__: boolean,
     *  __isContextConsumer__: boolean,
     *  __isLazy__: boolean,
     *  __isSuspense__: boolean,
     *  __isDynamicNode__: boolean,
     *  __isClassComponent__: boolean,
     *  __isFunctionComponent__: boolean}} props
     */

  }, {
    key: "isSameType",
    value: function isSameType(props) {
      var _this3 = this;

      return NODE_TYPE_KEY.every(function (key) {
        return _this3.__internal_node_type__[key] === props[key];
      });
    }
  }]);

  return MyReactInternalType;
}();

exports.MyReactInternalType = MyReactInternalType;

var MyReactInternalInstance = /*#__PURE__*/function () {
  function MyReactInternalInstance() {
    _classCallCheck(this, MyReactInternalInstance);

    _defineProperty(this, "__fiber__", null);

    _defineProperty(this, "__context__", null);

    _defineProperty(this, "__hecticCount__", 0);

    _defineProperty(this, "__updateTimeStep__", null);
  }

  _createClass(MyReactInternalInstance, [{
    key: "setContext",
    value:
    /**
     *
     * @param {MyReactFiberNode} context
     */
    function setContext(context) {
      var _this$__context__;

      if (this.__context__) this.__context__.removeDependence(this);
      this.__context__ = context;
      (_this$__context__ = this.__context__) === null || _this$__context__ === void 0 ? void 0 : _this$__context__.addDependence(this);
    }
    /**
     *
     * @param {MyReactFiberNode} fiber
     */

  }, {
    key: "setFiber",
    value: function setFiber(fiber) {
      this.__fiber__ = fiber;
    }
  }, {
    key: "updateTimeStep",
    value: function updateTimeStep() {
      if (_env.enableAllCheck.current) {
        var now = new Date().getTime();

        if (now - this.__updateTimeStep__ <= 2) {
          this.__hecticCount__ += 1;
        } else {
          this.__hecticCount__ = 0;
        }

        if (this.__hecticCount__ > 40) {
          (0, _debug.error)({
            message: "look like have a infinity loop on current component",
            fiber: this.__fiber__
          });
        }

        this.__updateTimeStep__ = now;
      }
    }
  }]);

  return MyReactInternalInstance;
}();
/**
 *
 * @param {any} val
 * @returns
 */


exports.MyReactInternalInstance = MyReactInternalInstance;

var createRef = function createRef(val) {
  return {
    current: val
  };
};

exports.createRef = createRef;
},{"./debug.js":8,"./env.js":19}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MY_REACT_Suspense = exports.MY_REACT_Provider = exports.MY_REACT_Portal = exports.MY_REACT_Memo = exports.MY_REACT_Lazy = exports.MY_REACT_Fragment = exports.MY_REACT_ForwardRef = exports.MY_REACT_Element = exports.MY_REACT_Context = exports.MY_REACT_Consumer = void 0;
var MY_REACT_Element = Symbol["for"]("react.element");
exports.MY_REACT_Element = MY_REACT_Element;
var MY_REACT_Memo = Symbol["for"]("react.memo");
exports.MY_REACT_Memo = MY_REACT_Memo;
var MY_REACT_ForwardRef = Symbol["for"]("react.forward_ref");
exports.MY_REACT_ForwardRef = MY_REACT_ForwardRef;
var MY_REACT_Portal = Symbol["for"]("react.portal");
exports.MY_REACT_Portal = MY_REACT_Portal;
var MY_REACT_Fragment = Symbol["for"]("react.fragment");
exports.MY_REACT_Fragment = MY_REACT_Fragment;
var MY_REACT_Context = Symbol["for"]("react.context");
exports.MY_REACT_Context = MY_REACT_Context;
var MY_REACT_Provider = Symbol["for"]("react.provider");
exports.MY_REACT_Provider = MY_REACT_Provider;
var MY_REACT_Consumer = Symbol["for"]("react.consumer");
exports.MY_REACT_Consumer = MY_REACT_Consumer;
var MY_REACT_Lazy = Symbol["for"]("react.lazy");
exports.MY_REACT_Lazy = MY_REACT_Lazy;
var MY_REACT_Suspense = Symbol["for"]("react.suspense");
exports.MY_REACT_Suspense = MY_REACT_Suspense;
},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAsyncTimeStep = exports.shouldYieldAsyncUpdate = exports.once = exports.mapFiber = exports.isNormalEqual = exports.isEqual = exports.flattenChildren = exports.cannotUpdate = void 0;

var _env = require("./env.js");

var _children = require("./children.js");

var _index = require("./fiber/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {Function} action
 * @returns
 */
var once = function once(action) {
  var run = false;
  return function () {
    if (run) return;
    run = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    action.call.apply(action, [null].concat(args));
  };
};

exports.once = once;

var flattenChildren = function flattenChildren(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p.concat(flattenChildren(c));
    }, []);
  }

  return [arrayLike];
};

exports.flattenChildren = flattenChildren;

var mapFiber = function mapFiber(arrayLike, action) {
  return (0, _children.mapByJudgeFunction)(arrayLike, function (f) {
    return f instanceof _index.MyReactFiberNode;
  }, action);
};

exports.mapFiber = mapFiber;

var isEqual = function isEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (key !== "children" && !key.startsWith("_") && key !== "owner") {
        flag = flag && isEqual(src[key], target[key]);
      }
    }

    return flag;
  }

  return Object.is(src, target);
};

exports.isEqual = isEqual;

var isNormalEqual = function isNormalEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (!key.startsWith("_")) {
        flag = flag && Object.is(src[key], target[key]);

        if (!flag) {
          return flag;
        }
      }
    }

    return flag;
  }

  return Object.is(src, target);
};

exports.isNormalEqual = isNormalEqual;

var updateAsyncTimeStep = function updateAsyncTimeStep() {
  _env.asyncUpdateTimeStep.current = new Date().getTime();
};

exports.updateAsyncTimeStep = updateAsyncTimeStep;

var shouldYieldAsyncUpdate = function shouldYieldAsyncUpdate() {
  if (!_env.asyncUpdateTimeStep.current) {
    updateAsyncTimeStep();
    return false;
  } else {
    var result = new Date().getTime() - _env.asyncUpdateTimeStep.current > _env.asyncUpdateTimeLimit.current;

    if (result) _env.asyncUpdateTimeStep.current = null;
    return result;
  }
};

exports.shouldYieldAsyncUpdate = shouldYieldAsyncUpdate;

var cannotUpdate = function cannotUpdate() {
  if (_env.isServerRender.current) throw new Error("can not update component during SSR");
  if (_env.isHydrateRender.current) throw new Error("can not update component during hydrate");
  if (typeof window === "undefined") return false;
  return true;
};

exports.cannotUpdate = cannotUpdate;
},{"./children.js":1,"./env.js":19,"./fiber/index.js":21}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountFiberNode = exports.runUnmount = exports.pushUnmount = void 0;

var _tool = require("./tool.js");

var _env = require("./env.js");

var _index = require("./fiber/index.js");

/**
 *
 * @param {MyReactFiberNode | MyReactFiberNode[]} fiber
 */
var pushUnmount = function pushUnmount(fiber) {
  (0, _tool.mapFiber)(fiber, function (f) {
    if (!f.__pendingUnmount__) {
      f.__pendingUnmount__ = true;

      _env.pendingUnmountFiberArray.current.push(f);
    }
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.pushUnmount = pushUnmount;

var clearFiberNode = function clearFiberNode(fiber) {
  fiber.children.forEach(clearFiberNode);
  fiber.hookList.forEach(function (hook) {
    if (hook.hookType === "useEffect" || hook.hookType === "useLayoutEffect") {
      hook.effect = false;
      hook.cancel && hook.cancel();
    }

    if (hook.hookType === "useContext" && hook.__context__) {
      hook.__context__.removeDependence(hook);
    }
  });

  if (fiber.instance) {
    if (fiber.instance.componentWillUnmount) {
      fiber.instance.componentWillUnmount();
    }

    if (fiber.instance.__context__) {
      fiber.instance.__context__.removeDependence(fiber.instance);
    }
  }

  fiber.mount = false;
  fiber.initial = false;
  fiber.__needUpdate__ = false;
  fiber.__pendingMount__ = false;
  fiber.__pendingUpdate__ = false;
  fiber.__pendingUnmount__ = false;
  fiber.__pendingPosition__ = false;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var clearFiberDom = function clearFiberDom(fiber) {
  if (fiber.dom) {
    if (!fiber.__isPortal__) {
      var _fiber$dom$remove, _fiber$dom;

      (_fiber$dom$remove = (_fiber$dom = fiber.dom).remove) === null || _fiber$dom$remove === void 0 ? void 0 : _fiber$dom$remove.call(_fiber$dom);
    } else {
      fiber.children.forEach(clearFiberDom);
    }
  } else {
    fiber.children.forEach(clearFiberDom);
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var unmountFiberNode = function unmountFiberNode(fiber) {
  clearFiberNode(fiber);
  clearFiberDom(fiber);
};

exports.unmountFiberNode = unmountFiberNode;

var runUnmount = function runUnmount() {
  var allUnmountFiberArray = _env.pendingUnmountFiberArray.current.slice(0);

  allUnmountFiberArray.forEach(unmountFiberNode);
  _env.pendingUnmountFiberArray.current = [];
};

exports.runUnmount = runUnmount;
},{"./env.js":19,"./fiber/index.js":21,"./tool.js":39}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pendingUpdate = void 0;

var _debug = require("../debug.js");

var _unmount = require("../unmount.js");

var _position = require("../position.js");

var _index = require("../mount/index.js");

var _index2 = require("../fiber/index.js");

var _tool = require("../tool.js");

var _index3 = require("../render/index.js");

var _tool2 = require("./tool.js");

var _env = require("../env.js");

var _effect = require("../effect.js");

var updateAllAsync = function updateAllAsync() {
  _env.globalLoop.current = true;
  (0, _index3.renderLoopAsync)({
    get: _tool2.getPendingModifyFiberNext,
    set: function set(nextFiber) {
      return _env.pendingAsyncModifyFiber.current = nextFiber;
    }
  }, _tool.shouldYieldAsyncUpdate, function () {
    (0, _position.runPosition)();
    (0, _index.runMount)();
    (0, _tool2.runUpdate)();
    (0, _unmount.runUnmount)();
    (0, _effect.runLayoutEffect)();
    (0, _effect.runEffect)();
  }, function () {
    _env.globalLoop.current = false;
  });
};

var updateAllSync = function updateAllSync() {
  _env.globalLoop.current = true;
  var allPendingUpdate = (0, _tool2.getPendingModifyFiberArray)();

  if (allPendingUpdate.length) {
    (0, _debug.safeCall)(function () {
      return allPendingUpdate.forEach(_index3.renderLoopSync);
    });
    (0, _position.runPosition)();
    (0, _index.runMount)();
    (0, _tool2.runUpdate)();
    (0, _unmount.runUnmount)();
    (0, _effect.runLayoutEffect)();
    (0, _effect.runEffect)();
  }

  _env.globalLoop.current = false;
};

var updateEntry = function updateEntry() {
  if (_env.globalLoop.current) return;

  if (_env.enableAsyncUpdate.current) {
    updateAllAsync();
  } else {
    updateAllSync();
  }
};

var asyncUpdate = function asyncUpdate() {
  return Promise.resolve().then(updateEntry);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var pendingUpdate = function pendingUpdate(fiber) {
  var canUpdate = (0, _tool.cannotUpdate)();

  if (canUpdate) {
    if (!fiber.__needUpdate__) {
      fiber.prepareUpdate();

      if (_env.enableAsyncUpdate.current) {
        _env.pendingAsyncModifyFiberArray.current.pushValue(fiber);
      } else {
        _env.pendingSyncModifyFiberArray.current.push(fiber);
      }
    }

    asyncUpdate();
  }
};

exports.pendingUpdate = pendingUpdate;
},{"../debug.js":8,"../effect.js":17,"../env.js":19,"../fiber/index.js":21,"../mount/index.js":30,"../position.js":32,"../render/index.js":35,"../tool.js":39,"../unmount.js":40,"./tool.js":44}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pendingUpdate", {
  enumerable: true,
  get: function get() {
    return _feature.pendingUpdate;
  }
});
Object.defineProperty(exports, "pushUpdate", {
  enumerable: true,
  get: function get() {
    return _tool.pushUpdate;
  }
});

var _tool = require("./tool.js");

var _feature = require("./feature.js");
},{"./feature.js":41,"./tool.js":44}],43:[function(require,module,exports){
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
},{"../debug.js":8,"../dom/index.js":13,"../fiber/index.js":21,"../share.js":37}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runUpdate = exports.pushUpdate = exports.getPendingModifyFiberNext = exports.getPendingModifyFiberArray = void 0;

var _env = require("../env.js");

var _index = require("../fiber/index.js");

var _loop = require("./loop.js");

var _debug = require("../debug.js");

var getPendingModifyFiberArray = function getPendingModifyFiberArray() {
  var pendingUpdate = _env.pendingSyncModifyFiberArray.current.slice(0).filter(function (f) {
    return f.__needUpdate__ && f.mount;
  });

  pendingUpdate.sort(function (f1, f2) {
    return f1.deepIndex - f2.deepIndex > 0 ? 1 : -1;
  });
  _env.pendingSyncModifyFiberArray.current = [];
  return pendingUpdate;
};

exports.getPendingModifyFiberArray = getPendingModifyFiberArray;

var getPendingModifyFiberNext = function getPendingModifyFiberNext() {
  // when yield on pending
  var fiber = _env.pendingAsyncModifyFiber.current;
  _env.pendingAsyncModifyFiber.current = null;

  if (fiber !== null && fiber !== void 0 && fiber.mount) {
    return fiber;
  } // update done, get next update


  while (_env.pendingAsyncModifyFiberArray.current.length) {
    var nextFiber = _env.pendingAsyncModifyFiberArray.current.popTop();

    if (nextFiber.mount && nextFiber.__needUpdate__) {
      // should not update topLevel parent
      _env.pendingAsyncModifyTopLevelFiber.current = nextFiber;
      return nextFiber;
    }
  }

  _env.pendingAsyncModifyTopLevelFiber.current = null;
  return null;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.getPendingModifyFiberNext = getPendingModifyFiberNext;

var pushUpdate = function pushUpdate(fiber) {
  if (!fiber.__pendingUpdate__) {
    fiber.__pendingUpdate__ = true;

    _env.pendingUpdateFiberArray.current.push(fiber);
  }
};

exports.pushUpdate = pushUpdate;

var runUpdate = function runUpdate() {
  var allUpdateFiberArray = _env.pendingUpdateFiberArray.current.slice(0);

  allUpdateFiberArray.forEach(function (f) {
    if (f.mount && f.__pendingUpdate__) {
      (0, _debug.safeCallWithFiber)({
        action: function action() {
          return (0, _loop.commitUpdate)(f);
        },
        fiber: f
      });
    } else {
      console.error("update error");
    }
  });
  _env.pendingUpdateFiberArray.current = [];
};

exports.runUpdate = runUpdate;
},{"../debug.js":8,"../env.js":19,"../fiber/index.js":21,"./loop.js":43}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MyReactVDom", {
  enumerable: true,
  get: function get() {
    return _instance.MyReactVDom;
  }
});
Object.defineProperty(exports, "cloneElement", {
  enumerable: true,
  get: function get() {
    return _instance.cloneElement;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _instance.createElement;
  }
});
Object.defineProperty(exports, "getTypeFromVDom", {
  enumerable: true,
  get: function get() {
    return _tool.getTypeFromVDom;
  }
});
Object.defineProperty(exports, "isValidElement", {
  enumerable: true,
  get: function get() {
    return _tool.isValidElement;
  }
});

var _instance = require("./instance.js");

var _tool = require("./tool.js");
},{"./instance.js":46,"./tool.js":47}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactVDom = void 0;
exports.cloneElement = cloneElement;
exports.createElement = createElement;

var _symbol = require("../symbol.js");

var _env = require("../env.js");

var _tool = require("./tool.js");

var _excluded = ["ref", "key", "__self", "__source"],
    _excluded2 = ["ref", "key", "__self", "__source"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactVDom = /*#__PURE__*/_createClass( // TODO change this to fiber instance
function MyReactVDom(type, key, ref, self, source, owner, props) {
  _classCallCheck(this, MyReactVDom);

  _defineProperty(this, "_owner", void 0);

  _defineProperty(this, "_store", void 0);

  _defineProperty(this, "_self", void 0);

  _defineProperty(this, "_source", void 0);

  _defineProperty(this, "__dynamicChildren__", void 0);

  this["$$typeof"] = _symbol.MY_REACT_Element;
  this.type = type;
  this.key = key;
  this.ref = ref;
  this.props = props;
  this._owner = owner;
  this._self = self;
  this._source = source;
  this._store = {};
});

exports.MyReactVDom = MyReactVDom;

function createVDom(_ref2) {
  var _props$dangerouslySet, _ref3;

  var type = _ref2.type,
      key = _ref2.key,
      ref = _ref2.ref,
      self = _ref2.self,
      source = _ref2.source,
      owner = _ref2.owner,
      props = _ref2.props;
  return _ref3 = {}, _defineProperty(_ref3, "$$typeof", _symbol.MY_REACT_Element), _defineProperty(_ref3, "type", type), _defineProperty(_ref3, "key", key), _defineProperty(_ref3, "ref", ref), _defineProperty(_ref3, "props", props), _defineProperty(_ref3, "children", ((_props$dangerouslySet = props["dangerouslySetInnerHTML"]) === null || _props$dangerouslySet === void 0 ? void 0 : _props$dangerouslySet.__html) || props.children), _defineProperty(_ref3, "_owner", owner), _defineProperty(_ref3, "_self", self), _defineProperty(_ref3, "_source", source), _defineProperty(_ref3, "_store", {}), _ref3; // return new MyReactVDom(type, props, children || props.children);
} // try to support fast refresh

/**
 *
 * @param {MyReactVDom} element
 * @param {any} config
 * @param {MyReactVDom | MyReactVDom[]} children
 * @returns
 */


function createElement(type, config, children) {
  var childrenLength = arguments.length - 2;
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  var props = {};

  if (config !== null && config !== undefined) {
    var _ref = config.ref,
        _key = config.key,
        __self = config.__self,
        __source = config.__source,
        resConfig = _objectWithoutProperties(config, _excluded);

    if (_ref !== undefined) {
      ref = _ref;
    }

    if (_key !== undefined) {
      key = "" + _key;
    }

    self = __self === undefined ? null : __self;
    source = __source === undefined ? null : __source;

    for (var _key2 in resConfig) {
      if (Object.prototype.hasOwnProperty.call(resConfig, _key2)) {
        props[_key2] = resConfig[_key2];
      }
    }
  }

  if (type !== null && type !== void 0 && type.defaultProps) {
    Object.keys(type.defaultProps).forEach(function (propKey) {
      props[propKey] = props[propKey] === undefined ? type.defaultProps[propKey] : props[propKey];
    });
  }

  if (childrenLength > 1) {
    children = Array.from(arguments).slice(2);
    (0, _tool.checkArrayChildrenKey)(children);
    props.children = children;
  } else if (childrenLength === 1) {
    (0, _tool.checkSingleChildrenKey)(children);
    props.children = children;
  }

  return createVDom({
    type: type,
    key: key,
    ref: ref,
    self: self,
    source: source,
    owner: _env.currentFunctionFiber.current,
    props: props
  });
}
/**
 *
 * @param {MyReactVDom} element
 * @param {any} config
 * @param {MyReactVDom | MyReactVDom[]} children
 * @returns
 */


function cloneElement(element, config, children) {
  if (_typeof(element) === "object") {
    if ((0, _tool.isValidElement)(element)) {
      // copy from react source
      var props = Object.assign({}, element.props);
      var type = element.type;
      var key = element.key;
      var ref = element.ref;
      var self = element._self;
      var source = element._source;
      var owner = element._owner;

      if (config !== null && config !== undefined) {
        var _ref = config.ref,
            _key = config.key,
            __self = config.__self,
            __source = config.__source,
            resConfig = _objectWithoutProperties(config, _excluded2);

        if (_ref !== undefined) {
          ref = _ref;
          owner = _env.currentFunctionFiber.current;
        }

        if (_key !== undefined) {
          key = "" + _key;
        }

        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (var _key3 in resConfig) {
          if (Object.prototype.hasOwnProperty.call(resConfig, _key3)) {
            if (resConfig[_key3] === undefined && defaultProps !== undefined) {
              props[_key3] = defaultProps[_key3];
            } else {
              props[_key3] = resConfig[_key3];
            }
          }
        }
      }

      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        (0, _tool.checkSingleChildrenKey)(children);
        props.children = children;
      } else if (childrenLength > 1) {
        children = Array.from(arguments).slice(2);
        (0, _tool.checkArrayChildrenKey)(children);
        props.children = children;
      }

      var clonedElement = createVDom({
        type: type,
        key: key,
        ref: ref,
        self: self,
        source: source,
        owner: owner,
        props: props
      });
      clonedElement._store["cloned"] = true;
      return clonedElement;
    } else {
      throw new Error("cloneElement() must support a valid element, but get ".concat(element));
    }
  } else {
    return element;
  }
}
},{"../env.js":19,"../symbol.js":38,"./tool.js":47}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidElement = exports.getTypeFromVDom = exports.checkSingleChildrenKey = exports.checkArrayChildrenKey = void 0;

var _debug = require("../debug.js");

var _env = require("../env.js");

var _share = require("../share.js");

var _symbol = require("../symbol.js");

var _tool = require("../tool.js");

var _instance = require("./instance.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactVDom | any} element
 */
var isValidElement = function isValidElement(element) {
  // support not a VDom instance element
  if (_typeof(element) === "object" && (element === null || element === void 0 ? void 0 : element["$$typeof"]) === _symbol.MY_REACT_Element) {
    return true;
  }

  if (element instanceof _instance.MyReactVDom) {
    return true;
  } else {
    return false;
  }
};
/**
 *
 * @param {MyReactVDom[]} children
 */


exports.isValidElement = isValidElement;

var checkValidKey = function checkValidKey(children) {
  var obj = {};
  var needCheck = children.length > 1;
  var onceWarningDuplicate = (0, _tool.once)(_debug.warning);
  var onceWarningUndefined = (0, _tool.once)(_debug.warning);
  children.forEach(function (c) {
    if (isValidElement(c) && !c._store["validated"]) {
      if (needCheck) {
        if (obj[c.key]) {
          onceWarningDuplicate({
            message: "array child have duplicate key"
          });
        }

        if (c.key === undefined) {
          onceWarningUndefined({
            message: "each array child must have a unique key props",
            treeOnce: true
          });
        } else {
          obj[c.key] = true;
        }
      }

      c._store["validated"] = true;
    }
  });
};
/**
 *
 * @param {MyReactVDom[]} children
 */


var checkArrayChildrenKey = function checkArrayChildrenKey(children) {
  if (_env.enableAllCheck.current) {
    children.forEach(function (child) {
      if (Array.isArray(child)) {
        checkValidKey(child);
      } else if (isValidElement(child)) {
        child._store["validated"] = true;
      }
    });
  }
};
/**
 *
 * @param {MyReactVDom[] | MyReactVDom} children
 */


exports.checkArrayChildrenKey = checkArrayChildrenKey;

var checkSingleChildrenKey = function checkSingleChildrenKey(children) {
  if (_env.enableAllCheck.current) {
    if (Array.isArray(children)) {
      checkValidKey(children);
    } else if (isValidElement(children)) {
      children._store["validated"] = true;
    }
  }
};
/**
 *
 * @param {MyReactVDom} vdom
 */


exports.checkSingleChildrenKey = checkSingleChildrenKey;

var getTypeFromVDom = function getTypeFromVDom(vdom) {
  var nodeType = Object.assign({}, _share.DEFAULT_NODE_TYPE);
  var rawType = vdom.type;

  if (_typeof(rawType) === "object" && rawType !== null) {
    nodeType.__isObjectNode__ = true;
    rawType = rawType.type;
  }

  switch (rawType) {
    case _symbol.MY_REACT_Fragment:
      nodeType.__isFragmentNode__ = true;
      break;

    case _symbol.MY_REACT_Provider:
      nodeType.__isContextProvider__ = true;
      break;

    case _symbol.MY_REACT_Consumer:
      nodeType.__isContextConsumer__ = true;
      break;

    case _symbol.MY_REACT_Portal:
      nodeType.__isPortal__ = true;
      break;

    case _symbol.MY_REACT_Memo:
      nodeType.__isMemo__ = true;
      break;

    case _symbol.MY_REACT_ForwardRef:
      nodeType.__isForwardRef__ = true;
      break;

    case _symbol.MY_REACT_Lazy:
      nodeType.__isLazy__ = true;
      break;

    case _symbol.MY_REACT_Suspense:
      nodeType.__isSuspense__ = true;
      break;
  }

  if (typeof rawType === "function") {
    var _rawType$prototype;

    nodeType.__isDynamicNode__ = true;

    if ((_rawType$prototype = rawType.prototype) !== null && _rawType$prototype !== void 0 && _rawType$prototype.isMyReactComponent) {
      nodeType.__isClassComponent__ = true;
    } else {
      nodeType.__isFunctionComponent__ = true;
    }
  }

  if (typeof rawType === "string") {
    nodeType.__isPlainNode__ = true;
  }

  return nodeType;
};

exports.getTypeFromVDom = getTypeFromVDom;
},{"../debug.js":8,"../env.js":19,"../share.js":37,"../symbol.js":38,"../tool.js":39,"./instance.js":46}]},{},[33]);
