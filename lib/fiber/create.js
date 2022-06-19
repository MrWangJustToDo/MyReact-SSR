"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdatedFiberNodeWithUpdateAndPosition = exports.createUpdatedFiberNodeWithUpdate = exports.createUpdatedFiberNode = exports.createNewFiberNodeWithPosition = exports.createNewFiberNodeWithMount = exports.createNewFiberNode = void 0;

var _index = require("../mount/index.js");

var _position = require("../position.js");

var _index2 = require("../vdom/index.js");

var _index3 = require("../update/index.js");

var _instance = require("./instance.js");

/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 */
var createNewFiberNode = function createNewFiberNode(_ref, vdom) {
  var key = _ref.key,
      deepIndex = _ref.deepIndex,
      fiberParent = _ref.fiberParent,
      effect = _ref.effect,
      dom = _ref.dom;
  var newFiber = new _instance.MyReactFiberNode(key, deepIndex, fiberParent, null, effect);
  newFiber.dom = dom;
  newFiber.initialParent();
  newFiber.updateFromAlternate();
  newFiber.installVDom(vdom);
  newFiber.checkVDom(vdom);
  newFiber.initialType();
  newFiber.initialContext();
  newFiber.resetEffect();
  newFiber.resetPortal();
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 */


exports.createNewFiberNode = createNewFiberNode;

var createNewFiberNodeWithMount = function createNewFiberNodeWithMount(_ref2, vdom) {
  var key = _ref2.key,
      deepIndex = _ref2.deepIndex,
      fiberParent = _ref2.fiberParent,
      effect = _ref2.effect,
      dom = _ref2.dom;
  var newFiber = createNewFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    effect: effect,
    dom: dom
  }, vdom);
  (0, _index.pushMount)(newFiber);
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION', dom: HTMLElement}} param
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


exports.createNewFiberNodeWithMount = createNewFiberNodeWithMount;

var createNewFiberNodeWithPosition = function createNewFiberNodeWithPosition(_ref3, vdom, previousRenderFiber) {
  var key = _ref3.key,
      deepIndex = _ref3.deepIndex,
      fiberParent = _ref3.fiberParent,
      effect = _ref3.effect,
      dom = _ref3.dom;
  var newFiber = createNewFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    effect: effect,
    dom: dom
  }, vdom);
  (0, _position.pushPosition)(newFiber, previousRenderFiber);
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 */


exports.createNewFiberNodeWithPosition = createNewFiberNodeWithPosition;

var createUpdatedFiberNode = function createUpdatedFiberNode(_ref4, vdom) {
  var key = _ref4.key,
      deepIndex = _ref4.deepIndex,
      fiberParent = _ref4.fiberParent,
      fiberAlternate = _ref4.fiberAlternate,
      effect = _ref4.effect;
  var newFiber = new _instance.MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect);
  newFiber.initialParent();
  newFiber.updateFromAlternate();
  newFiber.installVDom(vdom);
  newFiber.checkVDom(vdom);
  newFiber.initialContext();
  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 */


exports.createUpdatedFiberNode = createUpdatedFiberNode;

var createUpdatedFiberNodeWithUpdate = function createUpdatedFiberNodeWithUpdate(_ref5, vdom) {
  var key = _ref5.key,
      deepIndex = _ref5.deepIndex,
      fiberParent = _ref5.fiberParent,
      fiberAlternate = _ref5.fiberAlternate,
      effect = _ref5.effect;
  var newFiber = createUpdatedFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect
  }, vdom);

  if (newFiber.__isTextNode__ || newFiber.__isPlainNode__) {
    if (newFiber.dom) {
      (0, _index3.pushUpdate)(newFiber);
    } else {
      console.error("error");
    }
  }

  return newFiber;
};
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: 'PLACEMENT' | 'UPDATE' | 'POSITION'}} param
 * @param {MyReactVDom} vdom
 * @param {MyReactFiberNode} previousRenderFiber
 */


exports.createUpdatedFiberNodeWithUpdate = createUpdatedFiberNodeWithUpdate;

var createUpdatedFiberNodeWithUpdateAndPosition = function createUpdatedFiberNodeWithUpdateAndPosition(_ref6, vdom, previousRenderFiber) {
  var key = _ref6.key,
      deepIndex = _ref6.deepIndex,
      fiberParent = _ref6.fiberParent,
      fiberAlternate = _ref6.fiberAlternate,
      effect = _ref6.effect;
  var newFiber = createUpdatedFiberNodeWithUpdate({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect
  }, vdom);

  if (fiberAlternate !== previousRenderFiber) {
    (0, _position.pushPosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
};

exports.createUpdatedFiberNodeWithUpdateAndPosition = createUpdatedFiberNodeWithUpdateAndPosition;