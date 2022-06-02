"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighLight = void 0;
exports.createBrowserDom = createBrowserDom;

var _dom = require("./dom.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ========= dev ============
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
    if (fiber.dom) {
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
/**
 *
 * @param {MyReactFiberNode} fiber
 * @returns
 */


exports.HighLight = HighLight;

_defineProperty(HighLight, "instance", undefined);

_defineProperty(HighLight, "getHighLightInstance", function () {
  HighLight.instance = HighLight.instance || new HighLight();
  return HighLight.instance;
});

function createBrowserDom(fiber) {
  var dom = fiber.__isTextNode__ ? document.createTextNode(fiber.__vdom__) : document.createElement(fiber.__vdom__.type);
  fiber.dom = dom;
  (0, _dom.updateDom)(dom, _env.empty, fiber.__isTextNode__ ? _env.empty : fiber.__vdom__.props, fiber);
  return dom;
}