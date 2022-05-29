"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactHookNode = void 0;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;

var _debug = require("./debug.js");

var _effect = require("./effect.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _share = require("./share.js");

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

// from react source code
function defaultReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}

var MyReactHookNode = /*#__PURE__*/function (_MyReactInstance) {
  _inherits(MyReactHookNode, _MyReactInstance);

  var _super = _createSuper(MyReactHookNode);

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
  function MyReactHookNode(hookIndex, value, reducer, depArray, hookType) {
    var _this;

    _classCallCheck(this, MyReactHookNode);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "hookNext", null);

    _defineProperty(_assertThisInitialized(_this), "hookPrev", null);

    _defineProperty(_assertThisInitialized(_this), "cancel", null);

    _defineProperty(_assertThisInitialized(_this), "effect", false);

    _defineProperty(_assertThisInitialized(_this), "__pendingEffect__", false);

    _defineProperty(_assertThisInitialized(_this), "dispatch", function (action) {
      _this.prevResult = _this.result;
      _this.result = _this.reducer(_this.result, action);

      if (!Object.is(_this.result, _this.prevResult)) {
        Promise.resolve().then(function () {
          return _this.__fiber__.update();
        });
      }
    });

    _this.hookIndex = hookIndex;
    _this.value = value;
    _this.reducer = reducer;
    _this.depArray = depArray;
    _this.hookType = hookType;

    _this._checkValidHook();

    _this._initialResult();

    return _this;
  }

  _createClass(MyReactHookNode, [{
    key: "_initialResult",
    value: function _initialResult() {
      this.result = null;
      this.prevResult = null;
    }
  }, {
    key: "_checkValidHook",
    value: function _checkValidHook() {
      if (this.hookType === "useMemo" || this.hookType === "seEffect" || this.hookType === "useCallback" || this.hookType === "useLayoutEffect") {
        if (typeof this.value !== "function") {
          throw new Error("".concat(this.hookType, " \u521D\u59CB\u5316\u9519\u8BEF"));
        }
      }

      if (this.hookType === "useContext") {
        if (_typeof(this.value) !== "object" || this.value === null) {
          throw new Error("".concat(this.hookType, " \u521D\u59CB\u5316\u9519\u8BEF"));
        }
      }
    }
  }, {
    key: "_getContextValue",
    value: function _getContextValue() {
      var providerFiber = this.processContext(this.value);
      return (providerFiber === null || providerFiber === void 0 ? void 0 : providerFiber.__vdom__.props.value) || this.value.Provider.value;
    }
  }, {
    key: "initialResult",
    value: function initialResult() {
      if (this.hookType === "useState" || this.hookType === "useMemo" || this.hookType === "useReducer") {
        this.result = this.value.call(null);
        return;
      }

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect") {
        this.effect = true;
        return;
      }

      if (this.hookType === "useCallback" || this.hookType === "useRef") {
        this.result = this.value;
        return;
      }

      if (this.hookType === "useContext") {
        this.result = this._getContextValue();
        return;
      }

      throw new Error("无效的hook");
    }
  }, {
    key: "update",
    value: function update(newAction, newReducer, newDepArray, newHookType, newFiber) {
      this.updateDependence(newFiber);

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect" || this.hookType === "useMemo" || this.hookType === "useCallback") {
        if (newDepArray && !this.depArray) {
          throw new Error("依赖状态变更");
        }

        if (!newDepArray && this.depArray) {
          throw new Error("依赖状态变更");
        }
      }

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect") {
        if (!newDepArray) {
          this.value = newAction;
          this.effect = true;
        } else if (!(0, _tools.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newAction;
          this.depArray = newDepArray;
          this.effect = true;
        }
      }

      if (this.hookType === "useCallback") {
        if (!(0, _tools.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newAction;
          this.prevResult = this.result;
          this.result = newAction;
          this.depArray = newDepArray;
        }
      }

      if (this.hookType === "useMemo") {
        if (!(0, _tools.isNormalEqual)(this.depArray, newDepArray)) {
          this.value = newAction;
          this.prevResult = this.result;
          this.result = newAction.call(null);
          this.depArray = newDepArray;
        }
      }

      if (this.hookType === "useContext") {
        if (!this.__context__ || !this.__context__.mount || !Object.is(this.value, newAction)) {
          this.value = newAction;
          this.prevResult = this.result;
          this.result = this._getContextValue();
        }
      }

      if (this.hookType === "useReducer") {
        this.value = newAction;
        this.reducer = newReducer;
      }
    }
  }]);

  return MyReactHookNode;
}(_share.MyReactInstance);
/**
 *
 * @param {{hookIndex: number, value: any, reducer: Function, depArray: any[], hookType: string}} param
 * @param {MyReactFiberNode} fiber
 */


exports.MyReactHookNode = MyReactHookNode;

function createHookNode(_ref, fiber) {
  var hookIndex = _ref.hookIndex,
      value = _ref.value,
      reducer = _ref.reducer,
      depArray = _ref.depArray,
      hookType = _ref.hookType;
  var newHookNode = new MyReactHookNode(hookIndex, value, reducer || defaultReducer, depArray, hookType);
  newHookNode.updateDependence(fiber);
  newHookNode.initialResult();
  fiber.installHook(newHookNode);
  return newHookNode;
}
/**
 *
 * @param {MyReactHookNode} hookNode
 */


function pushHookEffect(hookNode) {
  if (!hookNode.__pendingEffect__) {
    hookNode.__pendingEffect__ = true;

    if (hookNode.hookType === "useEffect") {
      (0, _effect.pushEffect)(hookNode.__fiber__, hookNode);
    } else {
      (0, _effect.pushLayoutEffect)(hookNode.__fiber__, hookNode);
    }
  }
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {number} hookIndex
 * @param {any} value
 * @param {any[]} depArray
 * @param {string} hookType
 */


function getHookNode(fiber, hookIndex, value, reducer, depArray, hookType) {
  if (!fiber) throw new Error("hook使用必须在函数组件中");
  var currentHookNode = null;

  if (fiber.hookList.length > hookIndex) {
    currentHookNode = fiber.hookList[hookIndex];

    if (currentHookNode.hookType !== hookType) {
      throw new Error("\n" + (0, _debug.logHook)(currentHookNode, hookType));
    }

    currentHookNode.update(value, reducer, depArray, hookType, fiber);
  } else if (!fiber.fiberAlternate) {
    // new create
    currentHookNode = createHookNode({
      hookIndex: hookIndex,
      hookType: hookType,
      value: value,
      depArray: depArray,
      reducer: reducer
    }, fiber);
  } else {
    var temp = {
      hookType: "undefined"
    };
    temp.hookPrev = fiber.hookFoot;
    throw new Error("\n" + (0, _debug.logHook)(temp, hookType));
  }

  if (!_env.isServerRender.current && currentHookNode.effect) {
    pushHookEffect(currentHookNode);
  }

  return currentHookNode;
}

function useState(initialValue) {
  var currentHookNode = getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof initialValue === "function" ? initialValue : function () {
    return initialValue;
  }, null, null, "useState");
  return [currentHookNode.result, currentHookNode.dispatch];
}

function useEffect(action, depArray) {
  getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useEffect");
}

function useLayoutEffect(action, depArray) {
  getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useLayoutEffect");
}

function useCallback(action, depArray) {
  return getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useCallback").result;
}

function useMemo(action, depArray) {
  return getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useMemo").result;
}

function useRef(value) {
  return getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, (0, _tools.createRef)(value), null, null, "useRef").result;
}

function useContext(Context) {
  return getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, Context, null, null, "useContext").result;
}

function useReducer(reducer, initialArg, init) {
  var currentHook = getHookNode(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof init === "function" ? function () {
    return init(initialArg);
  } : function () {
    return initialArg;
  }, reducer, null, "useReducer");
  return [currentHook.result, currentHook.dispatch];
}

function useDebugValue() {
  if (_env.enableDebugLog.current) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["[debug] --> ", "value"].concat(args, ["\n", "tree:", (0, _debug.logCurrentRunningFiber)()]));
  }
}