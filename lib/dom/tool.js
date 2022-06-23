"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDom = exports.getNativeEventName = exports.getDom = exports.findLatestDomFromComponentFiber = void 0;

var _env = require("../env.js");

var _highlight = require("./highlight.js");

var _index = require("../vdom/index.js");

var _share = require("../share.js");

var _index2 = require("../fiber/index.js");

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
 * @param {MyReactVDom} vdom
 * @returns
 */


exports.findLatestDomFromComponentFiber = findLatestDomFromComponentFiber;

var getNativeEventName = function getNativeEventName(eventName, vdom) {
  var isCapture = false;

  if (eventName.endsWith("Capture")) {
    isCapture = true;
    eventName = eventName.split("Capture")[0];
  }

  if (eventName === "DoubleClick") {
    eventName = "dblclick";
  } else if (eventName === "Change") {
    if (vdom.type === "input") {
      var _vdom$props, _vdom$props2;

      if (((_vdom$props = vdom.props) === null || _vdom$props === void 0 ? void 0 : _vdom$props.type) === "radio" || ((_vdom$props2 = vdom.props) === null || _vdom$props2 === void 0 ? void 0 : _vdom$props2.type) === "checkbox") {
        eventName = "click";
      } else {
        eventName = "input";
      }
    } else {
      eventName = "change";
    }
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
// TODO need improve props & attrs


exports.getNativeEventName = getNativeEventName;

var updateDom = function updateDom(element, oldProps, newProps, fiber) {
  if (fiber.__isTextNode__) {
    element.textContent = fiber.__vdom__;
  } else if (fiber.__isPlainNode__) {
    Object.keys(oldProps).filter(_prop.isEvent).filter(function (key) {
      return (0, _prop.isGone)(newProps)(key) || (0, _prop.isNew)(oldProps, newProps)(key);
    }).forEach(function (key) {
      var _getNativeEventName = getNativeEventName(key.slice(2), fiber.__preRenderVdom__),
          isCapture = _getNativeEventName.isCapture,
          eventName = _getNativeEventName.eventName;

      fiber.removeEventListener(eventName, oldProps[key], isCapture);
    });
    Object.keys(oldProps).filter(_prop.isProperty).filter((0, _prop.isGone)(newProps)).forEach(function (key) {
      if (key === "className") {
        if (fiber.nameSpace) {
          element.removeAttribute("class");
        } else {
          element[key] = "";
        }
      } else if (key === "value") {
        element[key] = "";
      } else {
        element.removeAttribute(key);
      }
    });
    Object.keys(oldProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(oldProps[styleKey] || {}).filter((0, _prop.isGone)(newProps[styleKey] || {})).forEach(function (styleName) {
        element.style[styleName] = "";
      });
    });
    Object.keys(newProps).filter(_prop.isEvent).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      var _getNativeEventName2 = getNativeEventName(key.slice(2), fiber.__vdom__),
          eventName = _getNativeEventName2.eventName,
          isCapture = _getNativeEventName2.isCapture;

      fiber.addEventListener(eventName, newProps[key], isCapture);
    });
    Object.keys(newProps).filter(_prop.isProperty).filter((0, _prop.isNew)(oldProps, newProps)).forEach(function (key) {
      if (key === "className") {
        if (fiber.nameSpace) {
          element.setAttribute("class", newProps[key] || "");
        } else {
          element[key] = newProps[key] || "";
        }
      } else if (key === "autofocus" || key === "autoFocus") {
        if (newProps[key]) {
          element[key.toLowerCase()] = newProps[key];
          Promise.resolve().then(function () {
            element.focus();
          });
        }
      } else if (key === "value") {
        element[key] = newProps[key];
      } else {
        if (newProps[key] !== null && newProps[key] !== undefined && newProps[key] !== false) {
          element.setAttribute(key, newProps[key]);
        } else {
          element.removeAttribute(key);
        }
      }
    });
    Object.keys(newProps).filter(_prop.isStyle).forEach(function (styleKey) {
      Object.keys(newProps[styleKey] || {}).filter((0, _prop.isNew)(oldProps[styleKey] || {}, newProps[styleKey])).forEach(function (styleName) {
        if (!_share.IS_UNIT_LESS_NUMBER[styleName] && typeof newProps[styleKey][styleName] === "number") {
          element[styleKey][styleName] = "".concat(newProps[styleKey][styleName], "px");
          return;
        }

        if (newProps[styleKey][styleName] !== null && newProps[styleKey][styleName] !== undefined) {
          element[styleKey][styleName] = newProps[styleKey][styleName];
        } else {
          element[styleKey][styleName] = "";
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