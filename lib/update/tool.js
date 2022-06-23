"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runUpdate = exports.pushUpdate = exports.getPendingModifyFiberNext = exports.getPendingModifyFiberArray = void 0;

var _env = require("../env.js");

var _index = require("../fiber/index.js");

var _loop = require("./loop.js");

var _debug = require("../debug.js");

var getPendingModifyFiberArray = function getPendingModifyFiberArray() {
  var pendingUpdate = _env.pendingSyncModifyFiberArray.current.slice(0).filter(function (f) {
    return f.__needUpdate__ && f.mount;
  });

  pendingUpdate.sort(function (f1, f2) {
    return f1.deepIndex - f2.deepIndex > 0 ? 1 : -1;
  });
  _env.pendingSyncModifyFiberArray.current = [];
  return pendingUpdate;
};

exports.getPendingModifyFiberArray = getPendingModifyFiberArray;

var getPendingModifyFiberNext = function getPendingModifyFiberNext() {
  // when yield on pending
  var fiber = _env.pendingAsyncModifyFiber.current;
  _env.pendingAsyncModifyFiber.current = null;

  if (fiber !== null && fiber !== void 0 && fiber.mount) {
    return fiber;
  } // update done, get next update


  while (_env.pendingAsyncModifyFiberArray.current.length) {
    var nextFiber = _env.pendingAsyncModifyFiberArray.current.popTop();

    if (nextFiber.mount && nextFiber.__needUpdate__) {
      // should not update topLevel parent
      _env.pendingAsyncModifyTopLevelFiber.current = nextFiber;
      return nextFiber;
    }
  }

  _env.pendingAsyncModifyTopLevelFiber.current = null;
  return null;
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.getPendingModifyFiberNext = getPendingModifyFiberNext;

var pushUpdate = function pushUpdate(fiber) {
  if (!fiber.__pendingUpdate__) {
    fiber.__pendingUpdate__ = true;

    _env.pendingUpdateFiberArray.current.push(fiber);
  }
};

exports.pushUpdate = pushUpdate;

var runUpdate = function runUpdate() {
  var allUpdateFiberArray = _env.pendingUpdateFiberArray.current.slice(0);

  allUpdateFiberArray.forEach(function (f) {
    if (f.mount && f.__pendingUpdate__) {
      (0, _debug.safeCallWithFiber)({
        action: function action() {
          return (0, _loop.commitUpdate)(f);
        },
        fiber: f
      });
    } else {
      console.error("update error");
    }
  });
  _env.pendingUpdateFiberArray.current = [];
};

exports.runUpdate = runUpdate;