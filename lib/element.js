"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.createPortal = createPortal;
exports.forwardRef = forwardRef;
exports.memo = memo;

var _share = require("./share.js");

var _symbol = require("./symbol.js");

var _index = require("./vdom/index.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function createPortal(element, container) {
  return (0, _index.createElement)({
    type: _symbol.Portal
  }, {
    container: container
  }, element);
}

function createContext(value) {
  var ContextObject = {
    type: _symbol.Context,
    __context__: null
  };
  var ProviderObject = {
    type: _symbol.Provider,
    value: value
  };
  var ConsumerObject = {
    type: _symbol.Consumer,
    Internal: _share.MyReactInternalInstance
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
  var MemoObject = {
    type: _symbol.Memo,
    render: MemoRender
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