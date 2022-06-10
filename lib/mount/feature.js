"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runMount = exports.pushMount = void 0;

var _loop = require("./loop.js");

var _tool = require("../dom/tool.js");

var _index = require("../fiber/index.js");

var _env = require("../env.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var pushMount = function pushMount(fiber) {
  if (!fiber.__pendingMount__) {
    fiber.__pendingMount__ = true;

    _env.pendingMountFiberArray.current.push(fiber);
  }
};

exports.pushMount = pushMount;

var runMount = function runMount() {
  var allMountArray = _env.pendingMountFiberArray.current.slice(0);

  allMountArray.forEach(function (fiber) {
    if (fiber.mount && fiber.__pendingMount__) {
      (0, _loop.mountLoop)(fiber, (0, _tool.getDom)(fiber.fiberParent, function (f) {
        return f.fiberParent;
      }) || _env.rootContainer.current);
    }
  });
  _env.pendingMountFiberArray.current = [];
};

exports.runMount = runMount;