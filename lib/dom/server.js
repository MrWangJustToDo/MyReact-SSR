"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitServer = exports.Element = void 0;

var _tool = require("./tool.js");

var _index = require("../fiber/index.js");

var _share = require("../share.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var TextElement = /*#__PURE__*/function () {
  function TextElement(content) {
    _classCallCheck(this, TextElement);

    this.content = content || " ";
  }

  _createClass(TextElement, [{
    key: "toString",
    value: function toString() {
      return this.content.toString();
    }
  }]);

  return TextElement;
}();

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
      if (value !== false && value !== null && value !== undefined) {
        this.attrs[key] = value;
      }
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
      var _this = this;

      var styleKeys = Object.keys(this.style);

      if (styleKeys.length) {
        return "style=\"".concat(styleKeys.map(function (key) {
          return "".concat(key, ": ").concat(_this.style[key].toString(), ";");
        }).reduce(function (p, c) {
          return p + c;
        }, ""), "\"");
      }

      return "";
    }
  }, {
    key: "serializeAttrs",
    value: function serializeAttrs() {
      var _this2 = this;

      var attrsKeys = Object.keys(this.attrs);

      if (attrsKeys.length) {
        return attrsKeys.map(function (key) {
          if (_this2.attrs[key] === null || _this2.attrs[key] === undefined) {
            return "";
          } else {
            return "".concat(key, "='").concat(_this2.attrs[key].toString(), "'");
          }
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
        return "class=\"".concat(this.className, "\"");
      } else {
        return "";
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      if (_share.IS_SINGLE_ELEMENT[this.type]) {
        if (this.children.length) throw new Error("can not add child to ".concat(this.type, " element"));
        return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " />");
      } else {
        if (this.type) {
          return "<".concat(this.type, " ").concat(this.serializeProps(), " ").concat(this.serializeStyle(), " ").concat(this.serializeAttrs(), " >").concat(this.children.reduce(function (p, c) {
            if (p.length && c instanceof TextElement && p[p.length - 1] instanceof TextElement) {
              p.push("<!-- -->");
              p.push(c);
            } else {
              p.push(c);
            }

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
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.Element = Element;

var createServerDom = function createServerDom(fiber) {
  var dom = fiber.__isTextNode__ ? new TextElement(fiber.__vdom__) : new Element(fiber.__vdom__.type);
  fiber.dom = dom;
  (0, _tool.updateDom)(dom, _share.EMPTY_OBJECT, fiber.__isTextNode__ ? _share.EMPTY_OBJECT : fiber.__vdom__.props, fiber);
  return dom;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {HTMLElement} parentDom
 */


var commitServer = function commitServer(fiber, parentDom) {
  createServerDom(fiber);

  if (fiber.__pendingMount__) {
    parentDom.appendChild(fiber.dom);
  }

  fiber.applyRef();
};

exports.commitServer = commitServer;