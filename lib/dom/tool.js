"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDom = exports.getNativeEventName = exports.getDom = exports.findLatestDomFromComponentFiber = void 0;

var _env = require("../env.js");

var _highlight = require("./highlight.js");

var _share = require("../share.js");

var _index = require("../fiber/index.js");

var _prop = require("./prop.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
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
};
/**
 *
 * @param {string} eventName
 * @returns
 */


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
/**
 *
 * @param {HTMLElement} element
 * @param {{[k: string]: any}} oldProps
 * @param {{[k: string]: any}} newProps
 * @param {MyReactFiberNode} fiber
 * @returns
 */


exports.getNativeEventName = getNativeEventName;

var updateDom = function updateDom(element, oldProps, newProps, fiber) {
  if (fiber.__isTextNode__) {
    element.textContent = fiber.__vdom__;
  } else if (fiber.__isPlainNode__) {
    Object.keys(oldProps).filter(_prop.isEvent).filter(function (key) {
      return (0, _prop.isGone)(newProps)(key) || (0, _prop.isNew)(oldProps, newProps)(key);
    }).forEach(function (key) {
      var _getNativeEventName = getNativeEventName(key.slice(2)),
          isCapture = _getNativeEventName.isCapture,
          eventName = _getNativeEventName.eventName;

      fiber.removeEventListener(eventName, oldProps[key], isCapture);
    });
    Object.keys(oldProps).filter(_prop.isProperty).filter((0, _prop.isGone)(newProps)).forEach(function (key) {
      if (fiber.nameSpace && (key === "className" || key === "value")) {
        element[key] = "";
      } else {
        element.removeAttribute(key === "className" ? "class" : key);
      }
    });
    Object.keys(oldProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(oldProps[styleKey] || {}).filter((0, _prop.isGone)(newProps[styleKey] || {})).forEach(function (styleName) {
        element.style[styleName] = "";
      });
    });
    Object.keys(newProps).filter(_prop.isEvent).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      var _getNativeEventName2 = getNativeEventName(key.slice(2)),
          eventName = _getNativeEventName2.eventName,
          isCapture = _getNativeEventName2.isCapture;

      fiber.addEventListener(eventName, newProps[key], isCapture);
    });
    Object.keys(newProps).filter(_prop.isProperty).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      if (!fiber.nameSpace && (key === "className" || key === "value")) {
        element[key] = newProps[key];
      } else {
        element.setAttribute(key === "className" ? "class" : key, newProps[key]);
      }
    });
    Object.keys(newProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(newProps[styleKey] || {}).filter((0, _prop.isNew)(oldProps[styleKey] || {}, newProps[styleKey])).forEach(function (styleName) {
        if (!_share.IS_UNIT_LESS_NUMBER[styleName]) {
          if (typeof newProps[styleKey][styleName] === "number") {
            element.style[styleName] = "".concat(newProps[styleKey][styleName], "px");
            return;
          } else {
            element.style[styleName] = newProps[styleKey][styleName];
            return;
          }
        }

        if (newProps[styleKey][styleName] !== null && newProps[styleKey][styleName] !== undefined) {
          element.style[styleName] = newProps[styleKey][styleName];
        } else {
          element.style[styleName] = null;
        }
      });
    });
  }

  if (_env.isMounted.current && !_env.isHydrateRender.current && !_env.isServerRender.current && (_env.enableHighLight.current || window.__highlight__)) {
    _highlight.HighLight.getHighLightInstance().highLight(fiber);
  }

  return element;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {(f: MyReactFiberNode) => MyReactFiberNode} transform
 */


exports.updateDom = updateDom;

var getDom = function getDom(fiber, transform) {
  if (fiber) {
    if (fiber.dom) return fiber.dom;
    return getDom(transform(fiber), transform);
  }
};

exports.getDom = getDom;