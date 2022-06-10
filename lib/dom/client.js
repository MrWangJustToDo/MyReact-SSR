"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBrowserDom = exports.commitClient = void 0;

var _tool = require("./tool.js");

var _share = require("../share.js");

var _index = require("../fiber/index.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var createBrowserDom = function createBrowserDom(fiber) {
  var dom = fiber.__isTextNode__ ? document.createTextNode(fiber.__vdom__) : document.createElement(fiber.__vdom__.type);
  fiber.dom = dom;
  (0, _tool.updateDom)(dom, _share.EMPTY_OBJECT, fiber.__isTextNode__ ? _share.EMPTY_OBJECT : fiber.__vdom__.props, fiber);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


exports.createBrowserDom = createBrowserDom;

var commitClient = function commitClient(fiber, parentDom) {
  createBrowserDom(fiber);

  if (fiber.__pendingMount__) {
    parentDom.appendChild(fiber.dom);
  }

  fiber.applyRef();
};

exports.commitClient = commitClient;