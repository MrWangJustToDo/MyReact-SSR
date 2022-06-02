"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStyle = exports.isProperty = exports.isNew = exports.isInternal = exports.isGone = exports.isEvent = exports.isChildren = void 0;

// 编译之后加上的props
var isInternal = function isInternal(key) {
  return key.startsWith("__");
};

exports.isInternal = isInternal;

var isChildren = function isChildren(key) {
  return key === "children" || key === "dangerouslySetInnerHTML";
};

exports.isChildren = isChildren;

var isEvent = function isEvent(key) {
  return key.startsWith("on");
};

exports.isEvent = isEvent;

var isProperty = function isProperty(key) {
  return !isChildren(key) && !isEvent(key) && !isStyle(key) && !isInternal(key);
};

exports.isProperty = isProperty;

var isNew = function isNew(oldProps, newProps) {
  return function (key) {
    return oldProps[key] !== newProps[key];
  };
};

exports.isNew = isNew;

var isGone = function isGone(newProps) {
  return function (key) {
    return !(key in newProps);
  };
};

exports.isGone = isGone;

var isStyle = function isStyle(key) {
  return key === "style";
};

exports.isStyle = isStyle;