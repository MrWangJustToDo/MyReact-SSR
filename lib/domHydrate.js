"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDomHydrate = checkDomHydrate;
exports.getHydrateDom = getHydrateDom;
exports.hydrateDom = hydrateDom;

var _debug = require("./debug.js");

var _domProps = require("./domProps.js");

var _domTool = require("./domTool.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _share = require("./share.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */
function domPropsHydrate(fiber, dom, props) {
  Object.keys(props).filter(_domProps.isProperty).forEach(function (key) {
    var _props$key;

    if (key === "className") {
      if (dom[key] !== props[key]) {
        console.warn("hydrate error, dom class not match form the template: ", "server: ".concat(dom[key], ", "), "client: ".concat(props[key], " \n"), (0, _debug.logFiber)(fiber));
        dom[key] = props[key];
      }

      return;
    }

    if (key === "value") {
      dom[key] !== props[key];
      return;
    }

    if (props[key] !== null && props[key] !== undefined && dom.getAttribute(key) !== ((_props$key = props[key]) === null || _props$key === void 0 ? void 0 : _props$key.toString())) {
      var _props$key2;

      console.warn("hydrate warning, dom attrs not match from template: ", "server: ".concat(dom.getAttribute(key), ", "), "client: ".concat((_props$key2 = props[key]) === null || _props$key2 === void 0 ? void 0 : _props$key2.toString(), " \n"), (0, _debug.logFiber)(fiber));
      dom.setAttribute(key, props[key]);
    }
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


function domEventHydrate(fiber, dom, props) {
  Object.keys(props).filter(_domProps.isEvent).forEach(function (key) {
    var _getNativeEventName = (0, _domTool.getNativeEventName)(key.slice(2)),
        eventName = _getNativeEventName.eventName,
        isCapture = _getNativeEventName.isCapture;

    fiber.__INTERNAL_EVENT_SYSTEM__.addEventListener(eventName, props[key], isCapture);
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


function domStyleHydrate(fiber, dom, props) {
  Object.keys(props).filter(_domProps.isStyle).forEach(function (styleKey) {
    Object.keys(props[styleKey] || _env.empty).forEach(function (styleName) {
      if (!_share.isUnitlessNumber[styleName]) {
        if (typeof props[styleKey][styleName] === "number") {
          dom.style[styleName] = "".concat(newProps[styleKey][styleName], "px");
          return;
        }
      }

      dom.style[styleName] = props[styleKey][styleName];
    });
  });
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


function hydrateDom(fiber, dom) {
  var _fiber$__vdom__, _fiber$__vdom__2, _fiber$__vdom__3;

  fiber.dom = dom;
  domPropsHydrate(fiber, dom, ((_fiber$__vdom__ = fiber.__vdom__) === null || _fiber$__vdom__ === void 0 ? void 0 : _fiber$__vdom__.props) || _env.empty);
  domEventHydrate(fiber, dom, ((_fiber$__vdom__2 = fiber.__vdom__) === null || _fiber$__vdom__2 === void 0 ? void 0 : _fiber$__vdom__2.props) || _env.empty);
  domStyleHydrate(fiber, dom, ((_fiber$__vdom__3 = fiber.__vdom__) === null || _fiber$__vdom__3 === void 0 ? void 0 : _fiber$__vdom__3.props) || _env.empty);
  return dom;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


function checkDomHydrate(fiber, dom) {
  if (!dom) {
    console.error("hydrate error, current dom not render by SSR", fiber.__vdom__, (0, _debug.logFiber)(fiber));
    return false;
  }

  if (fiber.__isTextNode__) {
    if (dom.nodeType !== Node.TEXT_NODE) {
      console.error("hydrate error, current dom type not match vdom type", fiber.__vdom__, dom, (0, _debug.logFiber)(fiber));
      return false;
    }

    if (fiber.__vdom__.toString() !== dom.textContent) {
      console.warn("hydrate waring, current hydrate text not match template text: ", "server: ".concat(dom.textContent, ", "), "client: ".concat(fiber.__vdom__.toString()), (0, _debug.logFiber)(fiber));
      return false;
    }
  }

  if (fiber.__isPlainNode__) {
    if (dom.nodeType !== Node.ELEMENT_NODE) {
      console.error("hydrate error, current dom type not a element type", fiber, dom, (0, _debug.logFiber)(fiber));
      return false;
    }

    if (fiber.__vdom__.type.toLowerCase() !== dom.nodeName.toLowerCase()) {
      console.error("hydrate error, current dom type not match vdom type", fiber, dom, (0, _debug.logFiber)(fiber));
      return false;
    }
  }

  return true;
}
/**
 *
 * @param {HTMLElement} parentDom
 */


function getHydrateDom(parentDom) {
  var children = Array.from(parentDom.childNodes);
  return children.find(function (dom) {
    return dom.nodeType !== document.COMMENT_NODE && !dom.__hydrate__;
  });
}