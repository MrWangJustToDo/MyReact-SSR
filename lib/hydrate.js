"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateUpdate = hydrateUpdate;

var _debug = require("./debug.js");

var _dom = require("./dom.js");

var _fiber = require("./fiber.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */
function checkDomHydrate(fiber, dom) {
  if (!dom) {
    console.error("hydrate error, current dom not render by SSR", (0, _debug.logFiber)(fiber));
    return false;
  }

  if (fiber.__isTextNode__) {
    if (dom.nodeType !== Node.TEXT_NODE) {
      console.error("hydrate error, current dom type not match vdom type", (0, _debug.logFiber)(fiber));
      return false;
    }

    if (fiber.__vdom__.toString() !== dom.textContent) {
      console.warn("hydrate waring, current hydrate text not match template text", (0, _debug.logFiber)(fiber));
      return false;
    }
  }

  if (fiber.__isPlainNode__) {
    if (dom.nodeType !== Node.ELEMENT_NODE) {
      console.error("hydrate error, current dom type not a element type", (0, _debug.logFiber)(fiber));
      return false;
    }

    if (fiber.__vdom__.type.toLowerCase() !== dom.nodeName.toLowerCase()) {
      console.error("hydrate error, current dom type not match vdom type", (0, _debug.logFiber)(fiber));
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
/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */


function hydrateUpdate(currentFiber, parentDom) {
  if (currentFiber.__isPlainNode__ || currentFiber.__isTextNode__) {
    var dom = getHydrateDom(parentDom);
    var isHydrateMatch = checkDomHydrate(currentFiber, dom);

    if (isHydrateMatch) {
      currentFiber.dom = (0, _dom.hydrateDom)(currentFiber, dom);
    } else {
      currentFiber.dom = (0, _dom.createBrowserDom)(currentFiber);

      if (dom) {
        parentDom.replaceChild(currentFiber.dom, dom);
      } else {
        parentDom.append(currentFiber.dom);
      }
    }

    currentFiber._processRef();

    currentFiber.dom.__hydrate__ = true;
    (0, _debug.debuggerFiber)(currentFiber);
  }
}