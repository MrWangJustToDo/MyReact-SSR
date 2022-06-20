"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmountComponentAtNode = exports.renderToString = exports.render = exports.hydrate = exports.findDOMNode = void 0;

var _server = require("./server.js");

var _index = require("../vdom/index.js");

var _index2 = require("../render/index.js");

var _env = require("../env.js");

var _index3 = require("../fiber/index.js");

var _index4 = require("../component/index.js");

var _tool = require("./tool.js");

var _index5 = require("../update/index.js");

var _unmount = require("../unmount.js");

/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */
var render = function render(element, container) {
  var containerFiber = container.__fiber__;

  if (containerFiber) {
    // need update, just like React
    if (containerFiber.__vdom__.type === element.type) {
      containerFiber.__vdom__ = element;
      (0, _index5.pendingUpdate)(containerFiber);
    }
  } else {
    var _container$setAttribu;

    Array.from(container.children).forEach(function (n) {
      var _n$remove;

      return (_n$remove = n.remove) === null || _n$remove === void 0 ? void 0 : _n$remove.call(n);
    });
    var rootElement = element;
    var fiber = (0, _index3.createNewFiberNode)({
      deepIndex: 0,
      dom: container
    }, rootElement);
    fiber.__root__ = true;
    _env.rootFiber.current = fiber;
    _env.rootContainer.current = container;
    (_container$setAttribu = container.setAttribute) === null || _container$setAttribu === void 0 ? void 0 : _container$setAttribu.call(container, "render", "MyReact");
    container.__fiber__ = fiber;
    (0, _index2.startRender)(fiber);
  }
};

exports.render = render;

var hydrate = function hydrate(element, container) {
  var _container$setAttribu2;

  _env.isHydrateRender.current = true;
  var rootElement = element;
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  (_container$setAttribu2 = container.setAttribute) === null || _container$setAttribu2 === void 0 ? void 0 : _container$setAttribu2.call(container, "hydrate", "MyReact");
  container.__fiber__ = fiber;
  (0, _index2.startRender)(fiber);
  _env.isHydrateRender.current = false;
};
/**
 *
 * @param {MyReactVDom} element
 * @returns
 */


exports.hydrate = hydrate;

var renderToString = function renderToString(element) {
  var _container$children$, _container$children$$;

  _env.isServerRender.current = true;
  var rootElement = element;
  var container = new _server.Element("");
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  (0, _index2.startRender)(fiber);
  _env.isServerRender.current = false;
  (_container$children$ = container.children[0]) === null || _container$children$ === void 0 ? void 0 : (_container$children$$ = _container$children$.setAttribute) === null || _container$children$$ === void 0 ? void 0 : _container$children$$.call(_container$children$, "root", "MyReact");
  return container.toString();
};
/**
 *
 * @param {MyReactComponent} instance
 */


exports.renderToString = renderToString;

var findDOMNode = function findDOMNode(instance) {
  if (instance instanceof _index4.MyReactComponent) {
    return (0, _tool.findLatestDomFromComponentFiber)(instance.__fiber__);
  } else {
    return null;
  }
};

exports.findDOMNode = findDOMNode;

var unmountComponentAtNode = function unmountComponentAtNode(container) {
  var containerFiber = container.__fiber__;

  if (containerFiber !== null && containerFiber !== void 0 && containerFiber.mount) {
    (0, _unmount.unmountFiberNode)(containerFiber);
  }
};

exports.unmountComponentAtNode = unmountComponentAtNode;