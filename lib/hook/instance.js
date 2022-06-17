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
          throw new Error("依赖状态变更");
        }

        if (!newDepArray && this.depArray) {
          throw new Error("依赖状态变更");
        }
      }

      if (this.hookType === "useEffect" || this.hookType === "useLayoutEffect" || this.hookType === "useImperativeHandle") {
        if (!newDepArray) {
          this.value = newValue;
          this.reducer = newReducer || this.reducer;
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