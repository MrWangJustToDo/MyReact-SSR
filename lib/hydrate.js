"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrate = hydrate;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _render = require("./render.js");

var _vdom = require("./vdom.js");

/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */
function hydrate(element, container) {
  _env.isHydrateRender.current = true;
  _env.rootContainer.current = container;
  var rootElement = element;

  var _rootFiber = (0, _fiber.createFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);

  _rootFiber.__root__ = true;
  _env.rootFiber.current = _rootFiber;
  container.setAttribute("hydrate", "MyReact");
  container.__vdom__ = rootElement;
  container.__fiber__ = _rootFiber;
  (0, _render.startRender)(_rootFiber);
  _env.isHydrateRender.current = false;
}