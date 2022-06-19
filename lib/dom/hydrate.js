"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitHydrate = void 0;

var _debug = require("../debug.js");

var _client = require("./client.js");

var _tool = require("./tool.js");

var _index = require("../fiber/index.js");

var _prop = require("./prop.js");

var _share = require("../share.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */
var domPropsHydrate = function domPropsHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isProperty).forEach(function (key) {
    if (props[key] === null || props[key] === undefined || props[key] === false) return;

    if (!fiber.nameSpace && key === "className") {
      if (dom[key] !== props[key]) {
        (0, _debug.warning)({
          message: "hydrate warning, dom class not match from server, server: ".concat(dom[key], ", client: ").concat(props[key]),
          fiber: fiber
        });
        dom[key] = props[key];
      }

      return;
    }

    if (fiber.nameSpace && key === "className") {
      if (dom.getAttribute("class") !== props[key].toString()) {
        (0, _debug.warning)({
          message: "hydrate warning, dom class not match from server, server: ".concat(dom.getAttribute("class"), ", client: ").concat(props[key]),
          fiber: fiber
        });
        dom.setAttribute("class", props[key]);
      }

      return;
    }

    if (key === "value") {
      if (dom[key] !== props[key]) dom[key] = props[key];
      return;
    }

    if (props[key] !== null && props[key] !== undefined && dom.getAttribute(key) !== props[key].toString()) {
      (0, _debug.warning)({
        message: "hydrate warning, dom attrs not match from server, server: ".concat(dom.getAttribute(key), ", client: ").concat(props[key]),
        fiber: fiber
      });
      dom.setAttribute(key, props[key]);
    }
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


var domEventHydrate = function domEventHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isEvent).forEach(function (key) {
    var _getNativeEventName = (0, _tool.getNativeEventName)(key.slice(2), fiber.__vdom__),
        eventName = _getNativeEventName.eventName,
        isCapture = _getNativeEventName.isCapture;

    fiber.addEventListener(eventName, props[key], isCapture);
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


var domStyleHydrate = function domStyleHydrate(fiber, dom, props) {
  Object.keys(props).filter(_prop.isStyle).forEach(function (styleKey) {
    Object.keys(props[styleKey] || _share.EMPTY_OBJECT).forEach(function (styleName) {
      if (!_share.IS_UNIT_LESS_NUMBER[styleName]) {
        if (typeof props[styleKey][styleName] === "number") {
          dom.style[styleName] = "".concat(props[styleKey][styleName], "px");
          return;
        }
      }

      dom.style[styleName] = props[styleKey][styleName];
    });
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


var hydrateDom = function hydrateDom(fiber, dom) {
  var _fiber$__vdom__, _fiber$__vdom__2, _fiber$__vdom__3;

  fiber.dom = dom;
  domPropsHydrate(fiber, dom, ((_fiber$__vdom__ = fiber.__vdom__) === null || _fiber$__vdom__ === void 0 ? void 0 : _fiber$__vdom__.props) || _share.EMPTY_OBJECT);
  domEventHydrate(fiber, dom, ((_fiber$__vdom__2 = fiber.__vdom__) === null || _fiber$__vdom__2 === void 0 ? void 0 : _fiber$__vdom__2.props) || _share.EMPTY_OBJECT);
  domStyleHydrate(fiber, dom, ((_fiber$__vdom__3 = fiber.__vdom__) === null || _fiber$__vdom__3 === void 0 ? void 0 : _fiber$__vdom__3.props) || _share.EMPTY_OBJECT);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 */


var checkHydrateDom = function checkHydrateDom(fiber, dom) {
  if (!dom) {
    (0, _debug.warning)({
      message: "hydrate warning, dom not render from server",
      fiber: fiber
    });
    return false;
  }

  if (fiber.__isTextNode__) {
    if (dom.nodeType !== Node.TEXT_NODE) {
      (0, _debug.warning)({
        message: "hydrate warning, dom type not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__),
        fiber: fiber
      });
      return false;
    }

    if (fiber.__vdom__.toString() !== dom.textContent) {
      if (fiber.__vdom__.toString() === "" && dom.textContent === " ") {
        dom.textContent = "";
        return true;
      } else {
        (0, _debug.warning)({
          message: "hydrate warning, dom content not match from server, server: ".concat(dom.textContent, ", client: ").concat(fiber.__vdom__),
          fiber: fiber
        });
        return false;
      }
    }
  }

  if (fiber.__isPlainNode__) {
    if (dom.nodeType !== Node.ELEMENT_NODE) {
      (0, _debug.warning)({
        message: "hydrate warning, dom type not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__.type),
        fiber: fiber
      });
      return false;
    }

    if (fiber.__vdom__.type.toLowerCase() !== dom.nodeName.toLowerCase()) {
      (0, _debug.warning)({
        message: "hydrate warning, dom name not match from server, server: ".concat(dom.nodeName.toString().toLowerCase(), ", client: ").concat(fiber.__vdom__.type),
        fiber: fiber
      });
      return false;
    }
  }

  return true;
};
/**
 *
 * @param {HTMLElement} parentDom
 */


var getHydrateDom = function getHydrateDom(parentDom) {
  var children = Array.from(parentDom.childNodes);
  return children.find(function (dom) {
    return dom.nodeType !== document.COMMENT_NODE && !dom.__hydrate__;
  });
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


var commitHydrate = function commitHydrate(fiber, parentDom) {
  if (fiber.__isPlainNode__ || fiber.__isTextNode__) {
    var dom = getHydrateDom(parentDom);
    var isHydrateMatch = checkHydrateDom(fiber, dom);

    if (isHydrateMatch) {
      hydrateDom(fiber, dom);
    } else {
      var newDom = (0, _client.createBrowserDom)(fiber);

      if (dom) {
        parentDom.replaceChild(newDom, dom);
      } else {
        parentDom.append(newDom);
      }
    }

    fiber.applyRef();
    fiber.applyVDom();
    fiber.dom.__hydrate__ = true;
  }
};

exports.commitHydrate = commitHydrate;