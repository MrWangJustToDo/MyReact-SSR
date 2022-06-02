"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactPureComponent = exports.MyReactComponent = void 0;
exports.classComponentMount = classComponentMount;
exports.classComponentUpdate = classComponentUpdate;

var _core = require("./core.js");

var _effect = require("./effect.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _fiberTool = require("./fiberTool.js");

var _instance = require("./instance.js");

var _tools = require("./tools.js");

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

// TODO more function need defined and improve update class component logic
var COMPONENT_LIFE_CIRCLE_KEY = ["shouldComponentUpdate", "componentDidMount", "componentDidUpdate", "componentWillUnmount"];

var MyReactComponentInternalInstance = /*#__PURE__*/function (_MyReactInstance) {
  _inherits(MyReactComponentInternalInstance, _MyReactInstance);

  var _super = _createSuper(MyReactComponentInternalInstance);

  function MyReactComponentInternalInstance() {
    var _this;

    _classCallCheck(this, MyReactComponentInternalInstance);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "context", void 0);

    _defineProperty(_assertThisInitialized(_this), "__prevProps__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextProps__", null);

    _defineProperty(_assertThisInitialized(_this), "__prevContext__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextContext__", null);

    _defineProperty(_assertThisInitialized(_this), "__prevState__", null);

    _defineProperty(_assertThisInitialized(_this), "__nextState__", null);

    _defineProperty(_assertThisInitialized(_this), "__pendingCallback__", []);

    _defineProperty(_assertThisInitialized(_this), "__pendingEffect__", false);

    return _this;
  }

  _createClass(MyReactComponentInternalInstance, [{
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
      this.resetNextInstanceState();
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

  return MyReactComponentInternalInstance;
}(_instance.MyReactInstance);

var MyReactComponent = /*#__PURE__*/function (_MyReactComponentInte) {
  _inherits(MyReactComponent, _MyReactComponentInte);

  var _super2 = _createSuper(MyReactComponent);

  function MyReactComponent(props, context) {
    var _this2;

    _classCallCheck(this, MyReactComponent);

    _this2 = _super2.call(this);

    _defineProperty(_assertThisInitialized(_this2), "setState", function (newValue, callback) {
      var newState = newValue;
      if (typeof newValue === "function") newState = newValue(_this2.state, _this2.props); // if there are more than once call setState function

      _this2.__nextState__ = Object.assign({}, _this2.__nextState__, newState);
      if (callback) _this2.__pendingCallback__.push(callback);

      _this2.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this2), "forceUpdate", function () {
      Promise.resolve().then(function () {
        return _this2.__fiber__.update();
      });
    });

    _this2.props = props;
    _this2.context = context;
    return _this2;
  }

  _createClass(MyReactComponent, [{
    key: "isMyReactComponent",
    get: function get() {
      return true;
    }
  }]);

  return MyReactComponent;
}(MyReactComponentInternalInstance);

exports.MyReactComponent = MyReactComponent;

var MyReactPureComponent = /*#__PURE__*/function (_MyReactComponent) {
  _inherits(MyReactPureComponent, _MyReactComponent);

  var _super3 = _createSuper(MyReactPureComponent);

  function MyReactPureComponent() {
    _classCallCheck(this, MyReactPureComponent);

    return _super3.apply(this, arguments);
  }

  _createClass(MyReactPureComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !(0, _tools.isNormalEqual)(this.props, nextProps) || !(0, _tools.isNormalEqual)(this.state, nextState) || !(0, _tools.isNormalEqual)(this.context, nextContext);
    }
  }]);

  return MyReactPureComponent;
}(MyReactComponent);
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.MyReactPureComponent = MyReactPureComponent;

function processStateFromProps(fiber) {
  var Component = fiber.__vdom__.type;
  var newState = null;

  if (typeof Component.getDerivedStateFromProps === "function") {
    newState = Component.getDerivedStateFromProps(fiber.__vdom__.props, fiber.instance.state);
  }

  return newState;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processStateFromPropsMountLifeCircle(fiber) {
  var newState = processStateFromProps(fiber);
  fiber.instance.updateInstance(Object.assign({}, fiber.instance.state, newState, fiber.instance.__nextState__));
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processStateFromPropsUpdateLiftCircle(fiber) {
  var newState = processStateFromProps(fiber);
  return Object.assign({}, fiber.instance.state, newState, fiber.instance.__nextState__);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentInstanceRef(fiber) {
  if (fiber.__vdom__.ref) {
    if (typeof fiber.__vdom__.ref === "function") {
      fiber.__vdom__.ref(fiber.instance);
    } else if (_typeof(fiber.__vdom__.ref) === "object") {
      fiber.__vdom__.ref.current = fiber.instance;
    }
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentInstanceLifeCircle(fiber) {
  var _Component$contextTyp;

  var Component = fiber.__vdom__.type;
  var providerFiber = (0, _fiberTool.getContextFiber)(fiber, Component.contextType);
  var context = providerFiber ? providerFiber.__vdom__.props.value : (_Component$contextTyp = Component.contextType) === null || _Component$contextTyp === void 0 ? void 0 : _Component$contextTyp.Provider.value;
  var instance = new Component(fiber.__vdom__.props, context); // still inject instance state here once the constructor not set it

  instance.props = fiber.__vdom__.props;
  instance.context = context;
  fiber.installInstance(instance);
  instance.updateDependence(fiber, providerFiber); // once there are not have a Provider

  providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.addListener(instance);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentRenderLifeCircle(fiber) {
  var children = fiber.instance.render();
  fiber.__vdom__.__dynamicChildren__ = children;
  return (0, _core.nextWorkCommon)(fiber);
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentDidMountLiftCircle(fiber) {
  // disable DidMount during SSR
  if (_env.isServerRender.current) return;

  if (!fiber.instance.__pendingEffect__ && fiber.instance.componentDidMount && typeof fiber.instance.componentDidMount === "function") {
    fiber.instance.__pendingEffect__ = true;
    (0, _effect.pushLayoutEffect)(fiber, function () {
      fiber.instance.componentDidMount();
      fiber.instance.__pendingEffect__ = false;
    });
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function classComponentMount(fiber) {
  processComponentInstanceLifeCircle(fiber);
  processComponentInstanceRef(fiber);
  processStateFromPropsMountLifeCircle(fiber);
  fiber.instance.resetPrevInstanceState();
  var children = processComponentRenderLifeCircle(fiber);
  processComponentDidMountLiftCircle(fiber);
  return children;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentContextUpdate(fiber) {
  var Component = fiber.__vdom__.type; // context 更新过

  if (!fiber.instance.__context__ || !fiber.instance.__context__.mount) {
    var _Component$contextTyp2;

    var providerFiber = fiber.instance.processContext(Component.contextType);
    return providerFiber ? providerFiber.__vdom__.props.value : (_Component$contextTyp2 = Component.contextType) === null || _Component$contextTyp2 === void 0 ? void 0 : _Component$contextTyp2.Provider.value;
  }

  return fiber.instance.context;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processShouldComponentUpdateLifeCircle(fiber) {
  if (fiber.instance.shouldComponentUpdate && typeof fiber.instance.shouldComponentUpdate === "function") {
    return fiber.instance.shouldComponentUpdate(fiber.instance.__nextProps__, fiber.instance.__nextState__, fiber.instance.__nextContext__);
  }

  return true;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function processComponentDidUpdateLiftCircle(fiber) {
  var hasUpdateLifeCircle = fiber.instance.__pendingCallback__.length || fiber.instance.componentDidUpdate && typeof fiber.instance.componentDidUpdate === "function";

  if (!fiber.instance.__pendingEffect__ && hasUpdateLifeCircle) {
    fiber.instance.__pendingEffect__ = true;
    (0, _effect.pushLayoutEffect)(fiber, function () {
      var allCallback = fiber.instance.__pendingCallback__.slice(0);

      fiber.instance.__pendingCallback__ = [];
      allCallback.forEach(function (c) {
        return c();
      });

      if (fiber.instance.componentDidUpdate) {
        fiber.instance.componentDidUpdate(fiber.instance.__prevProps__, fiber.instance.__prevState__, fiber.instance.__prevContext__);
      }

      fiber.instance.resetPrevInstanceState();
      fiber.instance.__pendingEffect__ = false;
    });
  } else {
    fiber.instance.resetPrevInstanceState();
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function classComponentUpdate(fiber) {
  fiber.instance.updateDependence(fiber);
  var newState = processStateFromPropsUpdateLiftCircle(fiber);
  var newProps = fiber.__vdom__.props;
  var newContext = processComponentContextUpdate(fiber);
  fiber.instance.__nextState__ = newState;
  fiber.instance.__nextProps__ = newProps;
  fiber.instance.__nextContext__ = newContext;
  var shouldUpdate = processShouldComponentUpdateLifeCircle(fiber);
  fiber.instance.updateInstance(newState, newProps, newContext);

  if (shouldUpdate) {
    var children = processComponentRenderLifeCircle(fiber);
    processComponentDidUpdateLiftCircle(fiber);
    return children;
  } else {
    fiber.instance.resetPrevInstanceState();
    fiber.stopUpdate();
    return [];
  }
}