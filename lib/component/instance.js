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