"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.Children = void 0;
Object.defineProperty(exports, "Consumer", {
  enumerable: true,
  get: function get() {
    return _tools.Consumer;
  }
});
Object.defineProperty(exports, "ForwardRef", {
  enumerable: true,
  get: function get() {
    return _tools.ForwardRef;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function get() {
    return _tools.Fragment;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _tools.Portal;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _tools.Provider;
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
    return _tools.createRef;
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
    return _dom.hydrate;
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
    return _dom.renderToString;
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

var _component = require("./component.js");

var _dom = require("./dom.js");

var _element = require("./element.js");

var _hook = require("./hook.js");

var _tools = require("./tools.js");

var _vdom = require("./vdom.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var unstable_batchedUpdates = _tools.safeCall;
exports.unstable_batchedUpdates = unstable_batchedUpdates;
var ReactDOM = {
  render: _dom.render,
  hydrate: _dom.hydrate,
  findDOMNode: _dom.findDOMNode,
  createPortal: _element.createPortal,
  renderToString: _dom.renderToString,
  unstable_batchedUpdates: unstable_batchedUpdates
};
var Children = {
  map: _tools.mapVDom,
  toArray: _tools.flattenChildren,
  count: _tools.childrenCount,
  forEach: _tools.mapVDom,
  only: _tools.only
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
  createRef: _tools.createRef,
  createContext: _element.createContext,
  createPortal: _element.createPortal,
  forwardRef: _element.forwardRef,
  // element type
  Fragment: _tools.Fragment,
  Portal: _tools.Portal,
  Provider: _tools.Provider,
  Consumer: _tools.Consumer,
  ForwardRef: _tools.ForwardRef,
  // hook
  useState: _hook.useState,
  useEffect: _hook.useEffect,
  useLayoutEffect: _hook.useLayoutEffect,
  useCallback: _hook.useCallback,
  useMemo: _hook.useMemo,
  useContext: _hook.useContext,
  useRef: _hook.useRef,
  useReducer: _hook.useReducer,
  useDebugValue: _hook.useDebugValue,
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