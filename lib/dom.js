"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDom = createDom;
exports.findDOMNode = findDOMNode;
exports.render = render;
exports.updateDom = updateDom;

var _component = require("./component.js");

var _domClient = require("./domClient.js");

var _domProps = require("./domProps.js");

var _domServer = require("./domServer.js");

var _domTool = require("./domTool.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _render = require("./render.js");

var _share = require("./share.js");

var _vdom = require("./vdom.js");

/**
 *
 * @param {HTMLElement} element
 * @param {{[k: string]: any}} oldProps
 * @param {{[k: string]: any}} newProps
 * @param {MyReactFiberNode} fiber
 * @returns
 */
function updateDom(element, oldProps, newProps, fiber) {
  if (fiber.__isTextNode__) {
    element.textContent = fiber.__vdom__;
  } else if (fiber.__isPlainNode__) {
    Object.keys(oldProps).filter(_domProps.isEvent).filter(function (key) {
      return (0, _domProps.isGone)(newProps)(key) || (0, _domProps.isNew)(oldProps, newProps)(key);
    }).forEach(function (key) {
      var _getNativeEventName = (0, _domTool.getNativeEventName)(key.slice(2)),
          isCapture = _getNativeEventName.isCapture,
          eventName = _getNativeEventName.eventName;

      fiber.__INTERNAL_EVENT_SYSTEM__.removeEventListener(eventName, oldProps[key], isCapture);
    });
    Object.keys(oldProps).filter(_domProps.isProperty).filter((0, _domProps.isGone)(newProps)).forEach(function (key) {
      if (key === "className" || key === "value") {
        element[key] = "";
      } else {
        element.removeAttribute(key);
      }
    });
    Object.keys(oldProps).filter(_domProps.isStyle).forEach(function (styleKey) {
      Object.keys(oldProps[styleKey] || _env.empty).filter((0, _domProps.isGone)(newProps[styleKey] || _env.empty)).forEach(function (styleName) {
        element.style[styleName] = "";
      });
    });
    Object.keys(newProps).filter(_domProps.isEvent).filter((0, _domProps.isNew)(oldProps, newProps)).forEach(function (key) {
      var _getNativeEventName2 = (0, _domTool.getNativeEventName)(key.slice(2)),
          eventName = _getNativeEventName2.eventName,
          isCapture = _getNativeEventName2.isCapture;

      fiber.__INTERNAL_EVENT_SYSTEM__.addEventListener(eventName, newProps[key], isCapture);
    });
    Object.keys(newProps).filter(_domProps.isProperty).filter((0, _domProps.isNew)(oldProps, newProps)).forEach(function (key) {
      if (key === "className" || key === "value") {
        element[key] = newProps[key];
      } else {
        element.setAttribute(key, newProps[key]);
      }
    });
    Object.keys(newProps).filter(_domProps.isStyle).forEach(function (styleKey) {
      Object.keys(newProps[styleKey] || _env.empty).filter((0, _domProps.isNew)(oldProps[styleKey] || _env.empty, newProps[styleKey])).forEach(function (styleName) {
        if (!_share.isUnitlessNumber[styleName]) {
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
    _domClient.HighLight.getHighLightInstance().highLight(fiber);
  }

  return element;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @returns
 */


function createDom(fiber) {
  if (_env.isServerRender.current) {
    return (0, _domServer.createServerDom)(fiber);
  } else if (_env.isHydrateRender.current) {
    return null;
  } else {
    return (0, _domClient.createBrowserDom)(fiber);
  }
}
/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */


function render(element, container) {
  _env.rootContainer.current = container;
  Array.from(container.children).forEach(function (n) {
    return n.remove();
  });
  var rootElement = element;

  var _rootFiber = (0, _fiber.createFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);

  _rootFiber.__root__ = true;
  _env.rootFiber.current = _rootFiber;
  container.setAttribute("render", "MyReact");
  container.__vdom__ = rootElement;
  container.__fiber__ = _rootFiber;
  (0, _render.startRender)(_rootFiber);
}
/**
 *
 * @param {MyReactComponent} internalInstance
 * @returns
 */


function findDOMNode(internalInstance) {
  if (internalInstance instanceof _component.MyReactComponent) {
    return (0, _domTool.findLatestDomFromComponentFiber)(internalInstance.__fiber__);
  }

  return null;
}