"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNativeEventName = exports.getDom = exports.flattenChildren = exports.findLatestDomFromComponentFiber = exports.createRef = exports.childrenCount = exports.Provider = exports.PriorityQueueByArrayAboutJudge = exports.Portal = exports.Memo = exports.Fragment = exports.ForwardRef = exports.Context = exports.Consumer = void 0;
exports.isEqual = isEqual;
exports.isNew = exports.isGone = exports.isEvent = void 0;
exports.isNormalEqual = isNormalEqual;
exports.updateAsyncTimeStep = exports.shouldYieldAsyncUpdateOrNot = exports.safeCall = exports.only = exports.mapVDom = exports.mapFiber = exports.map = exports.isStyle = exports.isProperty = void 0;

var _debug = require("./debug.js");

var _env = require("./env.js");

var _fiber2 = require("./fiber.js");

var _hook = require("./hook.js");

var _vdom = require("./vdom.js");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isEvent = function isEvent(key) {
  return key.startsWith("on");
};

exports.isEvent = isEvent;

var isProperty = function isProperty(key) {
  return key !== "children" && !isEvent(key) && !isStyle(key) && key !== "__self" && key !== "__source" && key !== "dangerouslySetInnerHTML";
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

var isStyle = function isStyle(key) {
  return key === "style";
};

exports.isStyle = isStyle;
var Memo = Symbol["for"]("Memo");
exports.Memo = Memo;
var ForwardRef = Symbol["for"]("ForwardRef");
exports.ForwardRef = ForwardRef;
var Portal = Symbol["for"]("Portal");
exports.Portal = Portal;
var Fragment = Symbol["for"]("Fragment");
exports.Fragment = Fragment;
var Context = Symbol["for"]("Context");
exports.Context = Context;
var Provider = Symbol["for"]("Context.Provider");
exports.Provider = Provider;
var Consumer = Symbol["for"]("Context.Consumer");
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {(f: MyReactFiberNode) => MyReactFiberNode} transfer
 * @returns
 */

exports.Consumer = Consumer;

var getDom = function getDom(fiber) {
  var transfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (fiber) {
    return fiber.parent;
  };

  if (fiber) {
    if (fiber.dom) {
      return fiber.dom;
    } else {
      return getDom(transfer(fiber), transfer);
    }
  }
};

exports.getDom = getDom;

var createRef = function createRef(val) {
  return {
    current: val
  };
};
/**
 *
 * @param {Function} action
 * @returns
 */


exports.createRef = createRef;

var safeCall = function safeCall(action) {
  try {
    return action();
  } catch (e) {
    console.warn("component tree:", (0, _debug.logCurrentRunningFiber)(), "\n", "-----------------------------------", "\n", e);
    throw e;
  }
};

exports.safeCall = safeCall;

function isNormalEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (!key.startsWith("__")) {
        flag = flag && Object.is(src[key], target[key]);

        if (!flag) {
          return flag;
        }
      }
    }

    return flag;
  }

  return Object.is(src, target);
}

function isEqual(src, target) {
  if (_typeof(src) === "object" && _typeof(target) === "object" && src !== null && target !== null) {
    var flag = true;
    flag = flag && Object.keys(src).length === Object.keys(target).length;

    for (var key in src) {
      if (key !== "children" && !key.startsWith("__")) {
        flag = flag && isEqual(src[key], target[key]);
      }
    }

    return flag;
  }

  return Object.is(src, target);
}

var flattenChildren = function flattenChildren(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p.concat(flattenChildren(c));
    }, []);
  }

  return [arrayLike];
};

exports.flattenChildren = flattenChildren;

var map = function map(arrayLike, judge, action) {
  var arrayChildren = flattenChildren(arrayLike);
  return arrayChildren.map(function (v, index, thisArgs) {
    if (judge(v)) {
      return action.apply(thisArgs, [v, index]);
    } else {
      return v;
    }
  });
};

exports.map = map;

var childrenCount = function childrenCount(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike.reduce(function (p, c) {
      return p + childrenCount(c);
    }, 0);
  }

  return 1;
};

exports.childrenCount = childrenCount;

var mapVDom = function mapVDom(arrayLike, action) {
  return map(arrayLike, function (v) {
    return v instanceof _vdom.MyReactVDom;
  }, action);
};

exports.mapVDom = mapVDom;

var mapFiber = function mapFiber(arrayLike, action) {
  return map(arrayLike, function (f) {
    return f instanceof _fiber2.MyReactFiberNode;
  }, action);
};

exports.mapFiber = mapFiber;

var only = function only(child) {
  if (child instanceof _vdom.MyReactVDom) {
    return child;
  }

  throw new Error("multiply child found!");
}; // in progress


exports.only = only;

var getNativeEventName = function getNativeEventName(eventName) {
  var isCapture = false;

  if (eventName.endsWith("Capture")) {
    isCapture = true;
    eventName = eventName.split("Capture")[0];
  }

  if (eventName === "DoubleClick") {
    eventName = "dblclick";
  } else {
    eventName = eventName.toLowerCase();
  }

  return {
    isCapture: isCapture,
    eventName: eventName
  };
};

exports.getNativeEventName = getNativeEventName;

var updateAsyncTimeStep = function updateAsyncTimeStep() {
  _env.asyncUpdateTimeStep.current = new Date().getTime();
};

exports.updateAsyncTimeStep = updateAsyncTimeStep;

var shouldYieldAsyncUpdateOrNot = function shouldYieldAsyncUpdateOrNot() {
  return new Date().getTime() - _env.asyncUpdateTimeStep.current > _env.asyncUpdateTimeLimit;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.shouldYieldAsyncUpdateOrNot = shouldYieldAsyncUpdateOrNot;

var findLatestDomFromFiber = function findLatestDomFromFiber(fiber) {
  var currentLoopFiberArray = [fiber];

  while (currentLoopFiberArray.length) {
    var _fiber = currentLoopFiberArray.shift();

    if (_fiber.dom) return _fiber.dom;
    if (_fiber.children.length) currentLoopFiberArray.push.apply(currentLoopFiberArray, _toConsumableArray(_fiber.children));
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var findLatestDomFromComponentFiber = function findLatestDomFromComponentFiber(fiber) {
  if (fiber) {
    if (fiber.dom) return fiber.dom;
    var re = null;

    for (var i = 0; i < fiber.children.length; i++) {
      re = findLatestDomFromFiber(fiber.children[i]);
      if (re) break;
    }

    return re;
  }
};

exports.findLatestDomFromComponentFiber = findLatestDomFromComponentFiber;

var PriorityQueueByArrayAboutJudge = /*#__PURE__*/function (_Array) {
  _inherits(PriorityQueueByArrayAboutJudge, _Array);

  var _super = _createSuper(PriorityQueueByArrayAboutJudge);

  function PriorityQueueByArrayAboutJudge() {
    var _this;

    var judgeFun = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (o1, o2) {
      return o1 < o2;
    };
    var transferFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (it) {
      return it;
    };

    _classCallCheck(this, PriorityQueueByArrayAboutJudge);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.judgeFun = judgeFun;
    _this.transferFun = transferFun;

    _this._init();

    return _this;
  }

  _createClass(PriorityQueueByArrayAboutJudge, [{
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

  return PriorityQueueByArrayAboutJudge;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.PriorityQueueByArrayAboutJudge = PriorityQueueByArrayAboutJudge;