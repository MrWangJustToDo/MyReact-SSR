"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.Children = void 0;
Object.defineProperty(exports, "Consumer", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Consumer;
  }
});
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Element;
  }
});
Object.defineProperty(exports, "ForwardRef", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_ForwardRef;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Fragment;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Portal;
  }
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Provider;
  }
});
exports.PureComponent = void 0;
Object.defineProperty(exports, "Suspense", {
  enumerable: true,
  get: function get() {
    return _symbol.MY_REACT_Suspense;
  }
});
Object.defineProperty(exports, "cloneElement", {
  enumerable: true,
  get: function get() {
    return _index.cloneElement;
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
    return _index.createElement;
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
    return _index3.findDOMNode;
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
    return _index3.hydrate;
  }
});
Object.defineProperty(exports, "isValidElement", {
  enumerable: true,
  get: function get() {
    return _index.isValidElement;
  }
});
Object.defineProperty(exports, "lazy", {
  enumerable: true,
  get: function get() {
    return _element.lazy;
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
    return _index3.render;
  }
});
Object.defineProperty(exports, "renderToString", {
  enumerable: true,
  get: function get() {
    return _index3.renderToString;
  }
});
exports.unstable_batchedUpdates = void 0;
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function get() {
    return _index4.useCallback;
  }
});
Object.defineProperty(exports, "useContext", {
  enumerable: true,
  get: function get() {
    return _index4.useContext;
  }
});
Object.defineProperty(exports, "useDebugValue", {
  enumerable: true,
  get: function get() {
    return _index4.useDebugValue;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function get() {
    return _index4.useEffect;
  }
});
Object.defineProperty(exports, "useImperativeHandle", {
  enumerable: true,
  get: function get() {
    return _index4.useImperativeHandle;
  }
});
Object.defineProperty(exports, "useLayoutEffect", {
  enumerable: true,
  get: function get() {
    return _index4.useLayoutEffect;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function get() {
    return _index4.useMemo;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function get() {
    return _index4.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function get() {
    return _index4.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function get() {
    return _index4.useState;
  }
});

var _debug = require("./debug.js");

var _share = require("./share.js");

var _children = require("./children.js");

var _element = require("./element.js");

var _index = require("./vdom/index.js");

var _index2 = require("./component/index.js");

var _index3 = require("./dom/index.js");

var _symbol = require("./symbol.js");

var _index4 = require("./hook/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var unstable_batchedUpdates = _debug.safeCall;
exports.unstable_batchedUpdates = unstable_batchedUpdates;
var ReactDOM = {
  render: _index3.render,
  hydrate: _index3.hydrate,
  findDOMNode: _index3.findDOMNode,
  createPortal: _element.createPortal,
  renderToString: _index3.renderToString,
  unmountComponentAtNode: _index3.unmountComponentAtNode,
  unstable_batchedUpdates: unstable_batchedUpdates
};
var Children = {
  map: _children.map,
  only: _children.only,
  count: _children.count,
  toArray: _children.toArray,
  forEach: _children.forEach
};
exports.Children = Children;
var Component = _index2.MyReactComponent;
exports.Component = Component;
var PureComponent = _index2.MyReactPureComponent;
exports.PureComponent = PureComponent;
var React = {
  // core
  Component: Component,
  PureComponent: PureComponent,
  createElement: _index.createElement,
  // feature
  memo: _element.memo,
  createRef: _share.createRef,
  forwardRef: _element.forwardRef,
  cloneElement: _index.cloneElement,
  createContext: _element.createContext,
  isValidElement: _index.isValidElement,
  // element type
  Element: _symbol.MY_REACT_Element,
  Portal: _symbol.MY_REACT_Portal,
  Provider: _symbol.MY_REACT_Provider,
  Consumer: _symbol.MY_REACT_Consumer,
  Fragment: _symbol.MY_REACT_Fragment,
  ForwardRef: _symbol.MY_REACT_ForwardRef,
  // hook
  useRef: _index4.useRef,
  useMemo: _index4.useMemo,
  useState: _index4.useState,
  useEffect: _index4.useEffect,
  useReducer: _index4.useReducer,
  useContext: _index4.useContext,
  useCallback: _index4.useCallback,
  useDebugValue: _index4.useDebugValue,
  useLayoutEffect: _index4.useLayoutEffect,
  useImperativeHandle: _index4.useImperativeHandle,
  // children api
  Children: Children,
  // split chunk
  lazy: _element.lazy,
  Suspense: _symbol.MY_REACT_Suspense
};
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
Object.keys(React).forEach(function (key) {
  if (key.startsWith("use")) {
    globalThis[key] = React[key];
  }
});

var mixIn = _objectSpread(_objectSpread({}, React), ReactDOM);

var _default = mixIn;
exports["default"] = _default;