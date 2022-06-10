"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pendingUpdate = void 0;

var _debug = require("../debug.js");

var _tool = require("../tool.js");

var _unmount = require("../unmount.js");

var _position = require("../position.js");

var _index = require("../mount/index.js");

var _index2 = require("../fiber/index.js");

var _index3 = require("../render/index.js");

var _tool2 = require("./tool.js");

var _env = require("../env.js");

var _effect = require("../effect.js");

var updateAllAsync = function updateAllAsync() {
  _env.globalLoop.current = true;
  (0, _index3.renderLoopAsync)(_tool2.getPendingModifyFiberNext, function () {
    (0, _position.runPosition)();
    (0, _index.runMount)();
    (0, _tool2.runUpdate)();
    (0, _unmount.runUnmount)();
    (0, _effect.runLayoutEffect)();
    (0, _effect.runEffect)();
  }, function () {
    _env.globalLoop.current = false;
  });
};

var updateAllSync = function updateAllSync() {
  _env.globalLoop.current = true;
  var allPendingUpdate = (0, _tool2.getPendingModifyFiberArray)();

  if (allPendingUpdate.length) {
    (0, _debug.safeCall)(function () {
      return allPendingUpdate.forEach(_index3.renderLoopSync);
    });
    (0, _position.runPosition)();
    (0, _index.runMount)();
    (0, _tool2.runUpdate)();
    (0, _unmount.runUnmount)();
    (0, _effect.runLayoutEffect)();
    (0, _effect.runEffect)();
  }

  _env.globalLoop.current = false;
};

var updateEntry = function updateEntry() {
  if (_env.globalLoop.current) return;

  if (_env.enableAsyncUpdate.current) {
    updateAllAsync();
  } else {
    updateAllSync();
  }
};

var asyncUpdate = function asyncUpdate() {
  return Promise.resolve().then(updateEntry);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


var pendingUpdate = function pendingUpdate(fiber) {
  (0, _tool.cannotUpdate)();

  if (!fiber.__needUpdate__) {
    fiber.__needUpdate__ = true;
    fiber.fiberAlternate = fiber;

    if (_env.enableAsyncUpdate.current) {
      _env.pendingAsyncModifyFiberArray.current.pushValue(fiber);
    } else {
      _env.pendingSyncModifyFiberArray.current.push(fiber);
    }
  }

  asyncUpdate();
};

exports.pendingUpdate = pendingUpdate;