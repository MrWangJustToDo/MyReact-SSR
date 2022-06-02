"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.createPortal = createPortal;
exports.forwardRef = forwardRef;
exports.memo = memo;

var _instance = require("./instance.js");

var _symbol = require("./symbol.js");

var _vdom = require("./vdom.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function createPortal(element, container) {
  return (0, _vdom.createElement)({
    type: _symbol.Portal
  }, {
    container: container
  }, element);
}

function createContext(value) {
  var ContextObject = {
    type: _symbol.Context,
    // no need get Provider from tree
    __context__: null
  };
  var ProviderObject = {
    type: _symbol.Provider,
    value: value
  };
  var ConsumerObject = {
    type: _symbol.Consumer,
    Internal: _instance.MyReactInstance
  };
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
  return {
    type: _symbol.ForwardRef,
    render: ForwardRefRender
  };
}

function memo(MemoRender) {
  var _MemoRender$prototype;

  var MemoObject = {
    type: _symbol.Memo,
    render: (_MemoRender$prototype = MemoRender.prototype) !== null && _MemoRender$prototype !== void 0 && _MemoRender$prototype.isMyReactComponent ? function (props) {
      return (0, _vdom.createElement)(MemoRender, props);
    } : MemoRender
  };
  Object.defineProperty(MemoObject, "isMyReactMemoComponent", {
    get: function get() {
      return true;
    },
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(MemoObject, "isMyReactForwardRefRender", {
    get: function get() {
      return _typeof(MemoRender) === "object" && MemoRender.type === _symbol.ForwardRef;
    },
    enumerable: false,
    configurable: false
  });
  return MemoObject;
}