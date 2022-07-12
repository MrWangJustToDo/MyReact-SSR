"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidElement = exports.getTypeFromVDom = exports.checkSingleChildrenKey = exports.checkArrayChildrenKey = void 0;

var _debug = require("../debug.js");

var _env = require("../env.js");

var _share = require("../share.js");

var _symbol = require("../symbol.js");

var _tool = require("../tool.js");

var _instance = require("./instance.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 *
 * @param {MyReactVDom | any} element
 */
var isValidElement = function isValidElement(element) {
  // support not a VDom instance element
  if (_typeof(element) === "object" && (element === null || element === void 0 ? void 0 : element["$$typeof"]) === _symbol.MY_REACT_Element) {
    return true;
  }

  if (element instanceof _instance.MyReactVDom) {
    return true;
  } else {
    return false;
  }
};
/**
 *
 * @param {MyReactVDom[]} children
 */


exports.isValidElement = isValidElement;

var checkValidKey = function checkValidKey(children) {
  var obj = {};
  var needCheck = children.length > 1;
  var onceWarningDuplicate = (0, _tool.once)(_debug.warning);
  var onceWarningUndefined = (0, _tool.once)(_debug.warning);
  children.forEach(function (c) {
    if (isValidElement(c) && !c._store["validated"]) {
      if (needCheck) {
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
      }

      c._store["validated"] = true;
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
        child._store["validated"] = true;
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
      children._store["validated"] = true;
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
    case _symbol.MY_REACT_Fragment:
      nodeType.__isFragmentNode__ = true;
      break;

    case _symbol.MY_REACT_Provider:
      nodeType.__isContextProvider__ = true;
      break;

    case _symbol.MY_REACT_Consumer:
      nodeType.__isContextConsumer__ = true;
      break;

    case _symbol.MY_REACT_Portal:
      nodeType.__isPortal__ = true;
      break;

    case _symbol.MY_REACT_Memo:
      nodeType.__isMemo__ = true;
      break;

    case _symbol.MY_REACT_ForwardRef:
      nodeType.__isForwardRef__ = true;
      break;

    case _symbol.MY_REACT_Lazy:
      nodeType.__isLazy__ = true;
      break;

    case _symbol.MY_REACT_Suspense:
      nodeType.__isSuspense__ = true;
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