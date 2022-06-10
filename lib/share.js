"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRef = exports.SORT_BY_DEEP_HEAP = exports.NODE_TYPE_KEY = exports.MyReactInternalType = exports.MyReactInternalInstance = exports.IS_UNIT_LESS_NUMBER = exports.IS_SINGLE_ELEMENT = exports.EMPTY_OBJECT = exports.EMPTY_ARRAY = exports.DEFAULT_NODE_TYPE = exports.COMPONENT_METHOD = void 0;

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
"__isObjectNode__", "__isMemo__", "__isPortal__", "__isForwardRef__", "__isContextProvider__", "__isContextConsumer__", // ==== dynamic node ==== //
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
};
exports.IS_SINGLE_ELEMENT = IS_SINGLE_ELEMENT;
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
      // 对象转换为节点   //
      __isObjectNode__: false,
      __isForwardRef__: false,
      __isPortal__: false,
      __isMemo__: false,
      __isContextProvider__: false,
      __isContextConsumer__: false,
      // 动态节点 //
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