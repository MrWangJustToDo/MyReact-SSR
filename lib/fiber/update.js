"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFiberNodeWithPosition = void 0;

var _position = require("../position.js");

var _index = require("../vdom/index.js");

var _instance = require("./instance.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} fiberParent
 * @param {MyReactVDom} vdom
 */
var updateFiberNode = function updateFiberNode(fiber, fiberParent, vdom) {
  fiber.fiberAlternate = fiber;
  fiber.installParent(fiberParent);
  fiber.updateFromAlternate();
  fiber.installVDom(vdom);
  fiber.checkVDom(vdom);
  fiber.initialContext();
  return fiber;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} fiberParent
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


var updateFiberNodeWithPosition = function updateFiberNodeWithPosition(fiber, fiberParent, vdom, previousRenderFiber) {
  var newFiber = updateFiberNode(fiber, fiberParent, vdom);

  if (newFiber !== previousRenderFiber) {
    (0, _position.pushPosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
};

exports.updateFiberNodeWithPosition = updateFiberNodeWithPosition;