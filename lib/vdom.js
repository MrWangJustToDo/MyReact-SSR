"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactVDom = void 0;
exports.cloneElement = cloneElement;
exports.createElement = createElement;
exports.isValidElement = isValidElement;

var _debug = require("./debug.js");

var _env = require("./env.js");

var _share = require("./share.js");

var _tools = require("./tools.js");

var _excluded = ["key", "ref", "dangerouslySetInnerHTML"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var MyReactVDomInternalInstance = /*#__PURE__*/function (_MyReactTypeInternalI) {
  _inherits(MyReactVDomInternalInstance, _MyReactTypeInternalI);

  var _super = _createSuper(MyReactVDomInternalInstance);

  function MyReactVDomInternalInstance() {
    var _this;

    _classCallCheck(this, MyReactVDomInternalInstance);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "__INTERNAL_STATE__", {
      __clonedNode__: null,
      __validKey__: false,
      __validType__: false,
      __dynamicChildren__: null
    });

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "key", void 0);

    _defineProperty(_assertThisInitialized(_this), "ref", void 0);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "children", void 0);

    return _this;
  }

  _createClass(MyReactVDomInternalInstance, [{
    key: "__clonedNode__",
    get: function get() {
      return this.__INTERNAL_STATE__.__clonedNode__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__clonedNode__ = v;
    }
  }, {
    key: "__validKey__",
    get: function get() {
      return this.__INTERNAL_STATE__.__validKey__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__validKey__ = v;
    }
  }, {
    key: "__validType__",
    get: function get() {
      return this.__INTERNAL_STATE__.__validType__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__validType__ = v;
    }
  }, {
    key: "__dynamicChildren__",
    get: function get() {
      return this.__INTERNAL_STATE__.__dynamicChildren__;
    },
    set: function set(v) {
      checkSingleChildrenKey(v);
      this.__INTERNAL_STATE__.__dynamicChildren__ = v;
    } // ============= valid check =====================

  }, {
    key: "_processType",
    value: function _processType() {
      var rawType = this.type;

      if (_typeof(this.type) === "object" && this.type !== null) {
        this.__INTERNAL_NODE_TYPE__.__isObjectNode__ = true;
        rawType = this.type.type;
      } // internal element


      switch (rawType) {
        case _tools.Fragment:
          this.__INTERNAL_NODE_TYPE__.__isFragmentNode__ = true;
          return;

        case _tools.Provider:
          this.__INTERNAL_NODE_TYPE__.__isContextProvider__ = true;
          return;

        case _tools.Consumer:
          this.__INTERNAL_NODE_TYPE__.__isContextConsumer__ = true;
          return;

        case _tools.Portal:
          this.__INTERNAL_NODE_TYPE__.__isPortal__ = true;
          return;

        case _tools.Memo:
          this.__INTERNAL_NODE_TYPE__.__isMemo__ = true;
          return;

        case _tools.ForwardRef:
          this.__INTERNAL_NODE_TYPE__.__isForwardRef__ = true;
          return;
      }

      if (typeof rawType === "function") {
        var _rawType$prototype;

        this.__INTERNAL_NODE_TYPE__.__isDynamicNode__ = true;

        if ((_rawType$prototype = rawType.prototype) !== null && _rawType$prototype !== void 0 && _rawType$prototype.isMyReactComponent) {
          this.__INTERNAL_NODE_TYPE__.__isClassComponent__ = true;
        } else {
          this.__INTERNAL_NODE_TYPE__.__isFunctionComponent__ = true;
        }

        return;
      }

      if (typeof rawType === "string") {
        this.__INTERNAL_NODE_TYPE__.__isPlainNode__ = true;
        return;
      }

      this.__INTERNAL_NODE_TYPE__.__isEmptyNode__ = true;
    }
  }, {
    key: "_checkValidVDom",
    value: function _checkValidVDom() {
      // in progress...
      if (_env.enableAllCheck.current && !this.__validType__) {
        if (this.__isContextConsumer__) {
          if (typeof this.children !== "function") {
            throw new Error("Consumer need function as children");
          }
        }

        if (this.__isPortal__) {
          if (!this.props.container) {
            throw new Error("createPortal() need a dom container");
          }
        }

        if (this.__isMemo__ || this.__isForwardRef__) {
          if (typeof this.type.render !== "function") {
            if (_typeof(this.type.render) !== "object" || !this.type.render.type) {
              throw new Error("render type must as a function");
            }
          }
        }

        if (this.__isForwardRef__) {
          var _this$type$render$pro;

          if (typeof this.type.render === "function" && (_this$type$render$pro = this.type.render.prototype) !== null && _this$type$render$pro !== void 0 && _this$type$render$pro.isMyReactComponent) {
            throw new Error("forwardRef need a function component, but get class component");
          }
        }

        if (this.ref) {
          if (_typeof(this.ref) !== "object" && typeof this.ref !== "function") {
            throw new Error("unSupport ref usage");
          }
        }

        if (_typeof(this.type) === "object") {
          var _this$type;

          if (!((_this$type = this.type) !== null && _this$type !== void 0 && _this$type.type)) {
            throw new Error("invalid element type");
          }
        }

        if (this.key && typeof this.key !== "string" && typeof this.key !== "number") {
          throw new Error("invalid key props");
        }

        this.__validType__ = true;
      }
    }
  }]);

  return MyReactVDomInternalInstance;
}(_share.MyReactTypeInternalInstance);

var MyReactVDom = /*#__PURE__*/function (_MyReactVDomInternalI) {
  _inherits(MyReactVDom, _MyReactVDomInternalI);

  var _super2 = _createSuper(MyReactVDom);

  function MyReactVDom(type, props, children) {
    var _this2;

    _classCallCheck(this, MyReactVDom);

    _this2 = _super2.call(this);

    var _ref = props || {},
        key = _ref.key,
        ref = _ref.ref,
        dangerouslySetInnerHTML = _ref.dangerouslySetInnerHTML,
        resProps = _objectWithoutProperties(_ref, _excluded);

    _this2.type = type;
    _this2.key = key;
    _this2.ref = ref;
    _this2.props = resProps;
    _this2.children = (dangerouslySetInnerHTML === null || dangerouslySetInnerHTML === void 0 ? void 0 : dangerouslySetInnerHTML.__html) || children;

    _this2._processType();

    _this2._checkValidVDom();

    return _this2;
  }

  return _createClass(MyReactVDom);
}(MyReactVDomInternalInstance);

exports.MyReactVDom = MyReactVDom;

function createVDom(_ref2) {
  var type = _ref2.type,
      props = _ref2.props,
      children = _ref2.children;
  return new MyReactVDom(type, props, children || props.children);
}

var keyError = {};
/**
 *
 * @param {MyReactVDom[]} children
 */

function checkValidKey(children) {
  var obj = {};
  var hasLog = false;
  children.forEach(function (c) {
    if (isValidElement(c) && !c.__validKey__) {
      if (obj[c.key]) {
        if (!hasLog) {
          console.error("array child have duplicate key", (0, _debug.logCurrentRunningFiber)());
        }

        hasLog = true;
      }

      if (c.key === undefined) {
        if (!hasLog) {
          var key = (0, _debug.logCurrentRunningFiber)();

          if (!keyError[key]) {
            keyError[key] = true;
            console.error("each array child must have a unique key props", (0, _debug.logCurrentRunningFiber)());
          }
        }

        hasLog = true;
      } else {
        obj[c.key] = true;
      }

      c.__validKey__ = true;
    }
  });
}
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
        child.__validKey__ = true;
      }
    });
  }
};
/**
 *
 * @param {MyReactVDom[] | MyReactVDom} children
 */


var checkSingleChildrenKey = function checkSingleChildrenKey(children) {
  if (_env.enableAllCheck.current) {
    if (Array.isArray(children)) {
      checkValidKey(children);
    } else if (isValidElement(children)) {
      children.__validKey__ = true;
    }
  }
};

function createElement(type, props, children) {
  var childrenLength = arguments.length - 2;
  props = props || {};

  if (type !== null && type !== void 0 && type.defaultProps) {
    Object.keys(type.defaultProps).forEach(function (propKey) {
      props[propKey] = props[propKey] || type.defaultProps[propKey];
    });
  }

  if (childrenLength > 1) {
    children = Array.from(arguments).slice(2);
    checkArrayChildrenKey(children);
  } else {
    checkSingleChildrenKey(children);
  } // 将children参数自动添加到props中


  if (Array.isArray(children) && children.length || children !== null && children !== undefined) {
    props.children = children;
  }

  return createVDom({
    type: type,
    props: props,
    children: children
  });
}

function cloneElement(element, props, children) {
  if (element instanceof MyReactVDom) {
    var clonedElement = createElement.apply(void 0, [element.type, Object.assign({}, element.props, {
      key: element.key
    }, {
      ref: element.ref
    }, props), children].concat(_toConsumableArray(Array.from(arguments).slice(3))));
    clonedElement.__validKey__ = true;
    clonedElement.__validType__ = true;
    clonedElement.__clonedNode__ = true;
    return clonedElement;
  } else {
    return element;
  }
}
/**
 *
 * @param {MyReactVDom | any} element
 * @returns
 */


function isValidElement(element) {
  if (element instanceof MyReactVDom) {
    return true;
  } else {
    return false;
  }
}