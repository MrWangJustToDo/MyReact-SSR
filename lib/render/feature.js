"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRender = void 0;

var _debug = require("../debug.js");

var _loop = require("./loop.js");

var _feature = require("../mount/feature.js");

var _env = require("../env.js");

var _index = require("../fiber/index.js");

var _effect = require("../effect.js");

/**
 *
 * @param {MyReactFiberNode} fiber
 */
var startRender = function startRender(fiber) {
  _env.globalLoop.current = true;
  (0, _debug.safeCall)(function () {
    return (0, _loop.renderLoopSync)(fiber);
  });
  (0, _feature.runMount)();
  (0, _effect.runLayoutEffect)();
  (0, _effect.runEffect)();
  _env.isMounted.current = true;
  _env.globalLoop.current = false;
};

exports.startRender = startRender;