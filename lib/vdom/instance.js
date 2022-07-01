"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactVDom = void 0;
exports.createElement = createElement;

var _tool = require("./tool.js");

var _excluded = ["key", "ref", "dangerouslySetInnerHTML"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactVDom = /*#__PURE__*/_createClass(function MyReactVDom(type, props, children) {
  _classCallCheck(this, MyReactVDom);

  _defineProperty(this, "__dynamicChildren__", void 0);

  var _ref = props || {},
      key = _ref.key,
      ref = _ref.ref,
      dangerouslySetInnerHTML = _ref.dangerouslySetInnerHTML,
      resProps = _objectWithoutProperties(_ref, _excluded); // for fast refresh


  this['$$typeof'] = type;
  this.type = type;
  this.key = key;
  this.ref = ref;
  this.props = resProps;
  this.children = (dangerouslySetInnerHTML === null || dangerouslySetInnerHTML === void 0 ? void 0 : dangerouslySetInnerHTML.__html) || children;
});

exports.MyReactVDom = MyReactVDom;

function createVDom(_ref2) {
  var type = _ref2.type,
      props = _ref2.props,
      children = _ref2.children;
  return new MyReactVDom(type, props, children || props.children);
}

function createElement(type, props, children) {
  var childrenLength = arguments.length - 2;
  props = props || {};
  props = Object.assign({}, props);

  if (type !== null && type !== void 0 && type.defaultProps) {
    Object.keys(type.defaultProps).forEach(function (propKey) {
      props[propKey] = props[propKey] === undefined ? type.defaultProps[propKey] : props[propKey];
    });
  }

  if (childrenLength > 1) {
    children = Array.from(arguments).slice(2);
    (0, _tool.checkArrayChildrenKey)(children);
  } else {
    (0, _tool.checkSingleChildrenKey)(children);
  }

  if (Array.isArray(children) && children.length || children !== null && children !== undefined) {
    props.children = children;
  }

  return createVDom({
    type: type,
    props: props,
    children: children
  });
}