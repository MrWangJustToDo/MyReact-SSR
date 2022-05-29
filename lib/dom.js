"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBrowserDom = createBrowserDom;
exports.createDom = createDom;
exports.findDOMNode = findDOMNode;
exports.hydrate = hydrate;
exports.hydrateDom = hydrateDom;
exports.render = render;
exports.renderToString = renderToString;
exports.updateDom = updateDom;

var _component = require("./component.js");

var _debug = require("./debug.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _render = require("./render.js");

var _tools = require("./tools.js");

var _vdom = require("./vdom.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HighLight = /*#__PURE__*/_createClass(
/**
 * @type HighLight
 */

/**
 *
 * @returns HighLight
 */

/**
 * @type MyReactFiberNode[]
 */
function HighLight() {
  var _this = this;

  _classCallCheck(this, HighLight);

  _defineProperty(this, "map", []);

  _defineProperty(this, "range", document.createRange());

  _defineProperty(this, "pendingUpdate", []);

  _defineProperty(this, "container", null);

  _defineProperty(this, "createHighLight", function () {
    var element = document.createElement("div");

    _this.container.append(element);

    return element;
  });

  _defineProperty(this, "getHighLight", function () {
    if (_this.map.length) {
      var element = _this.map.shift();

      return element;
    }

    return _this.createHighLight();
  });

  _defineProperty(this, "highLight", function (fiber) {
    if ((_env.enableHighLight.current || window.__highlight__) && fiber.dom) {
      if (!fiber.dom.__pendingHighLight__) {
        fiber.dom.__pendingHighLight__ = true;

        _this.startHighLight(fiber);
      }
    }
  });

  _defineProperty(this, "startHighLight", function (fiber) {
    _this.pendingUpdate.push(fiber);

    _this.flashPending();
  });

  _defineProperty(this, "flashPending", function (cb) {
    Promise.resolve().then(function () {
      var allFiber = _this.pendingUpdate.slice(0);

      _this.pendingUpdate = [];
      var allWrapper = [];
      allFiber.forEach(function (f) {
        var wrapperDom = _this.getHighLight();

        allWrapper.push(wrapperDom);
        f.__isTextNode__ ? _this.range.selectNodeContents(f.dom) : _this.range.selectNode(f.dom);

        var rect = _this.range.getBoundingClientRect();

        var left = parseInt(rect.left) + parseInt(document.scrollingElement.scrollLeft);
        var top = parseInt(rect.top) + parseInt(document.scrollingElement.scrollTop);
        var width = parseInt(rect.width) + 4;
        var height = parseInt(rect.height) + 4;
        var positionLeft = left - 2;
        var positionTop = top - 2;
        wrapperDom.style.cssText = "\n          position: absolute;\n          width: ".concat(width, "px;\n          height: ").concat(height, "px;\n          left: ").concat(positionLeft, "px;\n          top: ").concat(positionTop, "px;\n          pointer-events: none;\n          box-shadow: 0.0625rem 0.0625rem 0.0625rem red, -0.0625rem -0.0625rem 0.0625rem red;\n          ");
      });
      setTimeout(function () {
        allWrapper.forEach(function (wrapperDom) {
          wrapperDom.style.boxShadow = "none";

          _this.map.push(wrapperDom);
        });
        allFiber.forEach(function (f) {
          return f.dom.__pendingHighLight__ = false;
        });
      }, 100);
    });
  });

  this.container = document.createElement("div");
  this.container.style.cssText = "\n      position: absolute;\n      z-index: 999999;\n      width: 100%;\n      left: 0;\n      top: 0;\n      pointer-events: none;\n      ";
  document.body.append(this.container);
});

_defineProperty(HighLight, "instance", undefined);

_defineProperty(HighLight, "getHighLightInstance", function () {
  HighLight.instance = HighLight.instance || new HighLight();
  return HighLight.instance;
});

var Element = /*#__PURE__*/function () {
  function Element(type) {
    _classCallCheck(this, Element);

    _defineProperty(this, "style", {});

    _defineProperty(this, "attrs", {});

    _defineProperty(this, "children", []);

    this.type = type;
  }

  _createClass(Element, [{
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }, {
    key: "removeAttribute",
    value: function removeAttribute(key) {
      delete this.attrs[key];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      this.attrs[key] = value;
    }
    /**
     *
     * @param {Element} dom
     */

  }, {
    key: "append",
    value: function append() {
      var _this$children;

      (_this$children = this.children).push.apply(_this$children, arguments);
    }
  }, {
    key: "appendChild",
    value: function appendChild(dom) {
      if (dom instanceof Element || dom instanceof TextElement) {
        this.children.push(dom);
        return dom;
      } else {
        throw new Error("element instance error");
      }
    }
  }, {
    key: "serializeStyle",
    value: function serializeStyle() {
      var _this2 = this;

      var styleKeys = Object.keys(this.style);

      if (styleKeys.length) {
        return "style=\"".concat(styleKeys.map(function (key) {
          return "".concat(key, ": ").concat(_this2.style[key].toString(), ";");
        }).reduce(function (p, c) {
          return p + c;
        }, ""), "\"");
      }

      return "";
    }
  }, {
    key: "serializeAttrs",
    value: function serializeAttrs() {
      var _this3 = this;

      var attrsKeys = Object.keys(this.attrs);

      if (attrsKeys.length) {
        return attrsKeys.map(function (key) {
          return "".concat(key, "='").concat(_this3.attrs[key].toString(), "'");
        }).reduce(function (p, c) {
          return "".concat(p, " ").concat(c);
        }, "");
      } else {
        return "";
      }
    }
  }, {
    key: "serializeProps",
    value: function serializeProps() {
      if (this.className) {
        return "class=".concat(this.className);
      } else {
        return "";
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      if (singleElement[this.type]) {
        if (this.children.length) throw new Error("can not add child to ".concat(this.type, " element"));
        return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " />");
      } else {
        if (this.type) {
          return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " >").concat(this.children.reduce(function (p, c) {
            if (p.length && c instanceof TextElement && p[p.length - 1] instanceof TextElement) {
              p.push("<!-- -->");
            }

            p.push(c);
            return p;
          }, []).map(function (dom) {
            return dom.toString();
          }).reduce(function (p, c) {
            return p + c;
          }, ""), "</").concat(this.type, ">");
        } else {
          return this.children.map(function (dom) {
            return dom.toString();
          }).reduce(function (p, c) {
            return p + c;
          }, "");
        }
      }
    }
  }]);

  return Element;
}();

var TextElement = /*#__PURE__*/function () {
  function TextElement(content) {
    _classCallCheck(this, TextElement);

    this.content = content;
  }

  _createClass(TextElement, [{
    key: "toString",
    value: function toString() {
      return this.content.toString();
    }
  }]);

  return TextElement;
}(); // source from react code


var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var singleElement = {
  br: true,
  hr: true,
  img: true,
  input: true,
  param: true,
  meta: true,
  link: true
};
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
    Object.keys(oldProps).filter(_tools.isEvent).filter(function (key) {
      return (0, _tools.isGone)(newProps)(key) || (0, _tools.isNew)(oldProps, newProps)(key);
    }).forEach(function (key) {
      var _getNativeEventName = (0, _tools.getNativeEventName)(key.slice(2)),
          isCapture = _getNativeEventName.isCapture,
          eventName = _getNativeEventName.eventName;

      fiber.__INTERNAL_EVENT_SYSTEM__.removeEventListener(eventName, oldProps[key], isCapture);
    });
    Object.keys(oldProps).filter(_tools.isProperty).filter((0, _tools.isGone)(newProps)).forEach(function (key) {
      if (key === "className" || key === "value") {
        element[key] = "";
      } else {
        element.removeAttribute(key);
      }
    });
    Object.keys(oldProps).filter(_tools.isStyle).forEach(function (styleKey) {
      Object.keys(oldProps[styleKey] || _env.empty).filter((0, _tools.isGone)(newProps[styleKey] || _env.empty)).forEach(function (styleName) {
        element.style[styleName] = "";
      });
    });
    Object.keys(newProps).filter(_tools.isEvent).filter((0, _tools.isNew)(oldProps, newProps)).forEach(function (key) {
      var _getNativeEventName2 = (0, _tools.getNativeEventName)(key.slice(2)),
          eventName = _getNativeEventName2.eventName,
          isCapture = _getNativeEventName2.isCapture;

      fiber.__INTERNAL_EVENT_SYSTEM__.addEventListener(eventName, newProps[key], isCapture);
    });
    Object.keys(newProps).filter(_tools.isProperty).filter((0, _tools.isNew)(oldProps, newProps)).forEach(function (key) {
      if (key === "className" || key === "value") {
        element[key] = newProps[key];
      } else {
        element.setAttribute(key, newProps[key]);
      }
    });
    Object.keys(newProps).filter(_tools.isStyle).forEach(function (styleKey) {
      Object.keys(newProps[styleKey] || {}).filter((0, _tools.isNew)(oldProps[styleKey] || _env.empty, newProps[styleKey])).forEach(function (styleName) {
        if (!isUnitlessNumber[styleName]) {
          if (typeof newProps[styleKey][styleName] === "number") {
            element.style[styleName] = "".concat(newProps[styleKey][styleName], "px");
            return;
          }
        }

        element.style[styleName] = newProps[styleKey][styleName];
      });
    });
  }

  if (_env.isMounted.current && !_env.isHydrate.current && !_env.isServerRender.current && (_env.enableHighLight.current || window.__highlight__)) {
    HighLight.getHighLightInstance().highLight(fiber);
  }

  return element;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} dom
 * @param {{[k: string]: any}} props
 * @returns
 */


function domPropsHydrate(fiber, dom, props) {
  Object.keys(props).filter(_tools.isProperty).forEach(function (key) {
    if (key === "className") {
      if (dom[key] !== props[key]) {
        console.warn("hydrate error, dom class not match form the template", (0, _debug.logFiber)(fiber));
        dom[key] = props[key];
      }

      return;
    }

    if (key === "value") {
      dom[key] !== props[key];
      return;
    }

    if (dom.getAttribute(key) !== props[key]) {
      console.warn("hydrate warning, dom attrs not match from template", (0, _debug.logFiber)(fiber));
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
  Object.keys(props).filter(_tools.isEvent).forEach(function (key) {
    var _getNativeEventName3 = (0, _tools.getNativeEventName)(key.slice(2)),
        eventName = _getNativeEventName3.eventName,
        isCapture = _getNativeEventName3.isCapture;

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
  Object.keys(props).filter(_tools.isStyle).forEach(function (styleKey) {
    Object.keys(props[styleKey]).forEach(function (styleName) {
      if (!isUnitlessNumber[styleName]) {
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
 * @returns
 */


function createBrowserDom(fiber) {
  var dom = fiber.__isTextNode__ ? document.createTextNode(fiber.__vdom__) : document.createElement(fiber.__vdom__.type);
  fiber.dom = dom;
  updateDom(dom, _env.empty, fiber.__isTextNode__ ? _env.empty : fiber.__vdom__.props, fiber);
  return dom;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 */


function createServerDom(fiber) {
  var dom = fiber.__isTextNode__ ? new TextElement(fiber.__vdom__) : new Element(fiber.__vdom__.type);
  fiber.dom = dom;
  updateDom(dom, _env.empty, fiber.__isTextNode__ ? _env.empty : fiber.__vdom__.props, fiber);
  return dom;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @returns
 */


function createDom(fiber) {
  if (_env.isServerRender.current) {
    return createServerDom(fiber);
  } else if (_env.isHydrate.current) {
    return null;
  } else {
    return createBrowserDom(fiber);
  }
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
 * @param {MyReactVDom} element
 * @returns
 */


function renderToString(element) {
  _env.isServerRender.current = true;
  var container = new Element("");
  var rootElement = element;
  _env.rootContainer.current = container;

  var _rootFiber = (0, _fiber.createFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);

  _rootFiber.__root__ = true;
  _env.rootFiber.current = _rootFiber;
  (0, _render.startRender)(_rootFiber);
  _env.isServerRender.current = false;
  return _rootFiber.dom.toString();
}
/**
 *
 * @param {MyReactVDom} element
 * @param {HTMLElement} container
 */


function hydrate(element, container) {
  _env.isHydrate.current = true;
  _env.rootContainer.current = container;
  var rootElement = element;

  var _rootFiber = (0, _fiber.createFiberNode)({
    deepIndex: 0,
    dom: container
  }, rootElement);

  _rootFiber.__root__ = true;
  _env.rootFiber.current = _rootFiber;
  container.setAttribute("hydrate", "MyReact");
  container.__vdom__ = rootElement;
  container.__fiber__ = _rootFiber;
  (0, _render.startRender)(_rootFiber);
  _env.isHydrate.current = false;
}
/**
 *
 * @param {MyReactComponent} internalInstance
 * @returns
 */


function findDOMNode(internalInstance) {
  if (internalInstance instanceof _component.MyReactComponent) {
    return (0, _tools.findLatestDomFromComponentFiber)(internalInstance.__fiber__);
  }

  return null;
}