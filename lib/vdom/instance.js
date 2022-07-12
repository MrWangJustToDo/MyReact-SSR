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