"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNativeEventName = exports.getDom = exports.findLatestDomFromComponentFiber = void 0;

var _fiber2 = require("./fiber.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {(f: MyReactFiberNode) => MyReactFiberNode} transfer
 * @returns
 */
var getDom = function getDom(fiber) {
  var transfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (fiber) {
    return fiber.parent;
  };

  if (fiber) {
    if (fiber.dom) {
      return fiber.dom;
    } else {
      return getDom(transfer(fiber), transfer);
    }
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.getDom = getDom;

var findLatestDomFromFiber = function findLatestDomFromFiber(fiber) {
  var currentLoopFiberArray = [fiber];

  while (currentLoopFiberArray.length) {
    var _fiber = currentLoopFiberArray.shift();

    if (_fiber.dom) return _fiber.dom;
    currentLoopFiberArray.push.apply(currentLoopFiberArray, _toConsumableArray(_fiber.children));
  }
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var findLatestDomFromComponentFiber = function findLatestDomFromComponentFiber(fiber) {
  if (fiber) {
    if (fiber.dom) return fiber.dom;

    for (var i = 0; i < fiber.children.length; i++) {
      var dom = findLatestDomFromFiber(fiber.children[i]);
      if (dom) return dom;
    }
  }
}; // in progress


exports.findLatestDomFromComponentFiber = findLatestDomFromComponentFiber;

var getNativeEventName = function getNativeEventName(eventName) {
  var isCapture = false;

  if (eventName.endsWith("Capture")) {
    isCapture = true;
    eventName = eventName.split("Capture")[0];
  }

  if (eventName === "DoubleClick") {
    eventName = "dblclick";
  } else {
    eventName = eventName.toLowerCase();
  }

  return {
    isCapture: isCapture,
    eventName: eventName
  };
};

exports.getNativeEventName = getNativeEventName;