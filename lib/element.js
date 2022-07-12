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