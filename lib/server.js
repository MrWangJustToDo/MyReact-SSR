"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderToString = renderToString;

var _domServer = require("./domServer.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _render = require("./render.js");

var _vdom = require("./vdom.js");

/**
 *
 * @param {MyReactVDom} element
 * @returns
 */
function renderToString(element) {
  _env.isServerRender.current = true;
  var rootElement = element;
  var container = new _domServer.Element("");
  _env.rootContainer.current = container;

  var _rootFiber = (0, _fiber.createFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);

  _rootFiber.__root__ = true;
  _env.rootFiber.current = _rootFiber;
  (0, _render.startRender)(_rootFiber);
  _env.isServerRender.current = false;
  return _rootFiber.dom.toString();
}