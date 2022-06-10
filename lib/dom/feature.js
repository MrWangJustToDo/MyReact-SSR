"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderToString = exports.render = exports.hydrate = exports.findDOMNode = void 0;

var _server = require("./server.js");

var _index = require("../vdom/index.js");

var _index2 = require("../render/index.js");

var _env = require("../env.js");

var _index3 = require("../fiber/index.js");

var _index4 = require("../component/index.js");

var _tool = require("./tool.js");

/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */
var render = function render(element, container) {
  Array.from(container.children).forEach(function (n) {
    return n.remove();
  });
  var rootElement = element;
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  container.setAttribute("render", "MyReact");
  (0, _index2.startRender)(fiber);
};

exports.render = render;

var hydrate = function hydrate(element, container) {
  _env.isHydrateRender.current = true;
  var rootElement = element;
  var fiber = (0, _index3.createNewFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);
  fiber.__root__ = true;
  _env.rootFiber.current = fiber;
  _env.rootContainer.current = container;
  container.setAttribute("hydrate", "MyReact");
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