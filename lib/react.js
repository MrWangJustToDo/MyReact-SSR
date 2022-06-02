"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.Children = void 0;
Object.defineProperty(exports, "Consumer", {
  enumerable: true,
  get: function get() {
    return _symbol.Consumer;
  }
});
Object.defineProperty(exports, "ForwardRef", {
  enumerable: true,
  get: function get() {
    return _symbol.ForwardRef;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function get() {
    return _symbol.Fragment;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _symbol.Portal;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _symbol.Provider;
  }
});
exports.PureComponent = void 0;
Object.defineProperty(exports, "cloneElement", {
  enumerable: true,
  get: function get() {
    return _vdom.cloneElement;
  }
});
Object.defineProperty(exports, "createContext", {
  enumerable: true,
  get: function get() {
    return _element.createContext;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _vdom.createElement;
  }
});
Object.defineProperty(exports, "createPortal", {
  enumerable: true,
  get: function get() {
    return _element.createPortal;
  }
});
Object.defineProperty(exports, "createRef", {
  enumerable: true,
  get: function get() {
    return _share.createRef;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "findDOMNode", {
  enumerable: true,
  get: function get() {
    return _dom.findDOMNode;
  }
});
Object.defineProperty(exports, "forwardRef", {
  enumerable: true,
  get: function get() {
    return _element.forwardRef;
  }
});
Object.defineProperty(exports, "hydrate", {
  enumerable: true,
  get: function get() {
    return _hydrate.hydrate;
  }
});
Object.defineProperty(exports, "isValidElement", {
  enumerable: true,
  get: function get() {
    return _vdom.isValidElement;
  }
});
Object.defineProperty(exports, "memo", {
  enumerable: true,
  get: function get() {
    return _element.memo;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _dom.render;
  }
});
Object.defineProperty(exports, "renderToString", {
  enumerable: true,
  get: function get() {
    return _server.renderToString;
  }
});
exports.unstable_batchedUpdates = void 0;
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function get() {
    return _hook.useCallback;
  }
});
Object.defineProperty(exports, "useContext", {
  enumerable: true,
  get: function get() {
    return _hook.useContext;
  }
});
Object.defineProperty(exports, "useDebugValue", {
  enumerable: true,
  get: function get() {
    return _hook.useDebugValue;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function get() {
    return _hook.useEffect;
  }
});
Object.defineProperty(exports, "useImperativeHandle", {
  enumerable: true,
  get: function get() {
    return _hook.useImperativeHandle;
  }
});
Object.defineProperty(exports, "useLayoutEffect", {
  enumerable: true,
  get: function get() {
    return _hook.useLayoutEffect;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function get() {
    return _hook.useMemo;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function get() {
    return _hook.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function get() {
    return _hook.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return _hook.useState;
  }
});

var _children = require("./children.js");

var _component = require("./component.js");

var _debug = require("./debug.js");

var _dom = require("./dom.js");

var _element = require("./element.js");

var _hook = require("./hook.js");

var _hydrate = require("./hydrate.js");

var _server = require("./server.js");

var _share = require("./share.js");

var _symbol = require("./symbol.js");

var _vdom = require("./vdom.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var unstable_batchedUpdates = _debug.safeCall;
exports.unstable_batchedUpdates = unstable_batchedUpdates;
var ReactDOM = {
  render: _dom.render,
  hydrate: _hydrate.hydrate,
  findDOMNode: _dom.findDOMNode,
  createPortal: _element.createPortal,
  renderToString: _server.renderToString,
  unstable_batchedUpdates: unstable_batchedUpdates
};
var Children = {
  map: _children.map,
  toArray: _children.toArray,
  count: _children.count,
  forEach: _children.forEach,
  only: _children.only
};
exports.Children = Children;
var Component = _component.MyReactComponent;
exports.Component = Component;
var PureComponent = _component.MyReactPureComponent;
exports.PureComponent = PureComponent;
var React = {
  // core
  createElement: _vdom.createElement,
  Component: Component,
  PureComponent: PureComponent,
  // feature
  memo: _element.memo,
  cloneElement: _vdom.cloneElement,
  isValidElement: _vdom.isValidElement,
  createRef: _share.createRef,
  createContext: _element.createContext,
  forwardRef: _element.forwardRef,
  // element type
  Fragment: _symbol.Fragment,
  Portal: _symbol.Portal,
  Provider: _symbol.Provider,
  Consumer: _symbol.Consumer,
  ForwardRef: _symbol.ForwardRef,
  // hook
  useRef: _hook.useRef,
  useMemo: _hook.useMemo,
  useState: _hook.useState,
  useEffect: _hook.useEffect,
  useReducer: _hook.useReducer,
  useContext: _hook.useContext,
  useCallback: _hook.useCallback,
  useDebugValue: _hook.useDebugValue,
  useLayoutEffect: _hook.useLayoutEffect,
  useImperativeHandle: _hook.useImperativeHandle,
  // children api
  Children: Children
};
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
Object.keys(React).forEach(function (key) {
  globalThis[key] = React[key];
});

var mixIn = _objectSpread(_objectSpread({}, React), ReactDOM);

var _default = mixIn;
exports["default"] = _default;