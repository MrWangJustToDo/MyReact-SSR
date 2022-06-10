"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSingleChildrenKey = exports.checkArrayChildrenKey = void 0;
exports.cloneElement = cloneElement;
exports.isValidElement = exports.getTypeFromVDom = void 0;

var _debug = require("../debug.js");

var _env = require("../env.js");

var _share = require("../share.js");

var _symbol = require("../symbol.js");

var _tool = require("../tool.js");

var _instance = require("./instance.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {MyReactVDom | any} element
 */
var isValidElement = function isValidElement(element) {
  if (element instanceof _instance.MyReactVDom) {
    return true;
  } else {
    return false;
  }
};
/**
 *
 * @param {MyReactVDom | any} element
 * @param {any} props
 * @param {MyReactVDom[] | any[]} children
 * @returns
 */


exports.isValidElement = isValidElement;

function cloneElement(element, props, children) {
  if (element instanceof _instance.MyReactVDom) {
    var clonedElement = _instance.createElement.apply(void 0, [element.type, Object.assign({}, element.props, {
      key: element.key
    }, {
      ref: element.ref
    }, props), children].concat(_toConsumableArray(Array.from(arguments).slice(3))));

    if (_env.enableAllCheck.current) {
      clonedElement.__validKey__ = true;
      clonedElement.__validType__ = true;
      clonedElement.__clonedNode__ = true;
    }

    return clonedElement;
  } else {
    return element;
  }
}
/**
 *
 * @param {MyReactVDom[]} children
 */


var checkValidKey = function checkValidKey(children) {
  var obj = {};
  var onceWarningDuplicate = (0, _tool.once)(_debug.warning);
  var onceWarningUndefined = (0, _tool.once)(_debug.warning);
  children.forEach(function (c) {
    if (isValidElement(c) && !c.__validKey__) {
      if (obj[c.key]) {
        onceWarningDuplicate({
          message: "array child have duplicate key"
        });
      }

      if (c.key === undefined) {
        onceWarningUndefined({
          message: "each array child must have a unique key props",
          treeOnce: true
        });
      } else {
        obj[c.key] = true;
      }

      c.__validKey__ = true;
    }
  });
};
/**
 *
 * @param {MyReactVDom[]} children
 */


var checkArrayChildrenKey = function checkArrayChildrenKey(children) {
  if (_env.enableAllCheck.current) {
    children.forEach(function (child) {
      if (Array.isArray(child)) {
        checkValidKey(child);
      } else if (isValidElement(child)) {
        child.__validKey__ = true;
      }
    });
  }
};
/**
 *
 * @param {MyReactVDom[] | MyReactVDom} children
 */


exports.checkArrayChildrenKey = checkArrayChildrenKey;

var checkSingleChildrenKey = function checkSingleChildrenKey(children) {
  if (_env.enableAllCheck.current) {
    if (Array.isArray(children)) {
      checkValidKey(children);
    } else if (isValidElement(children)) {
      children.__validKey__ = true;
    }
  }
};
/**
 *
 * @param {MyReactVDom} vdom
 */


exports.checkSingleChildrenKey = checkSingleChildrenKey;

var getTypeFromVDom = function getTypeFromVDom(vdom) {
  var nodeType = Object.assign({}, _share.DEFAULT_NODE_TYPE);
  var rawType = vdom.type;

  if (_typeof(rawType) === "object" && rawType !== null) {
    nodeType.__isObjectNode__ = true;
    rawType = rawType.type;
  }

  switch (rawType) {
    case _symbol.Fragment:
      nodeType.__isFragmentNode__ = true;
      break;

    case _symbol.Provider:
      nodeType.__isContextProvider__ = true;
      break;

    case _symbol.Consumer:
      nodeType.__isContextConsumer__ = true;
      break;

    case _symbol.Portal:
      nodeType.__isPortal__ = true;
      break;

    case _symbol.Memo:
      nodeType.__isMemo__ = true;
      break;

    case _symbol.ForwardRef:
      nodeType.__isForwardRef__ = true;
      break;
  }

  if (typeof rawType === "function") {
    var _rawType$prototype;

    nodeType.__isDynamicNode__ = true;

    if ((_rawType$prototype = rawType.prototype) !== null && _rawType$prototype !== void 0 && _rawType$prototype.isMyReactComponent) {
      nodeType.__isClassComponent__ = true;
    } else {
      nodeType.__isFunctionComponent__ = true;
    }
  }

  if (typeof rawType === "string") {
    nodeType.__isPlainNode__ = true;
  }

  return nodeType;
};

exports.getTypeFromVDom = getTypeFromVDom;