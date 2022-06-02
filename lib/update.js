"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncUpdate = void 0;
exports.commitUpdate = commitUpdate;
exports.hydrateUpdate = hydrateUpdate;
exports.pushUpdate = pushUpdate;
exports.runUpdate = runUpdate;

var _debug = require("./debug.js");

var _dom = require("./dom.js");

var _domClient = require("./domClient.js");

var _domHydrate = require("./domHydrate.js");

var _domTool = require("./domTool.js");

var _effect = require("./effect.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _position = require("./position.js");

var _render = require("./render.js");

var _unmount = require("./unmount.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */
function hydrateUpdate(currentFiber, parentDom) {
  if (currentFiber.__isPlainNode__ || currentFiber.__isTextNode__ && currentFiber.__vdom__ !== "") {
    var dom = (0, _domHydrate.getHydrateDom)(parentDom);
    var isHydrateMatch = (0, _domHydrate.checkDomHydrate)(currentFiber, dom);

    if (isHydrateMatch) {
      currentFiber.dom = (0, _domHydrate.hydrateDom)(currentFiber, dom);
    } else {
      currentFiber.dom = (0, _domClient.createBrowserDom)(currentFiber);

      if (dom) {
        parentDom.replaceChild(currentFiber.dom, dom);
      } else {
        parentDom.append(currentFiber.dom);
      }
    }

    currentFiber._processRef();

    currentFiber.dom.__hydrate__ = true;
    (0, _debug.debuggerFiber)(currentFiber);
  }

  currentFiber.fiberAlternate = null;
  currentFiber.effect = null;
}
/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */


function commitUpdate(currentFiber, parentDom) {
  if (currentFiber.dom) {
    // 新增
    if (currentFiber.effect === "PLACEMENT") {
      parentDom.appendChild(currentFiber.dom); // 更新
    } else if (currentFiber.effect === "UPDATE") {
      (0, _dom.updateDom)(currentFiber.dom, currentFiber.__isTextNode__ ? _env.empty : currentFiber.fiberAlternate.__vdom__.props, currentFiber.__isTextNode__ ? _env.empty : currentFiber.__vdom__.props, currentFiber);
    }

    (0, _debug.debuggerFiber)(currentFiber);
  }

  currentFiber.fiberAlternate = null;
  currentFiber.effect = null;
}

function updateEntry() {
  _env.enableAsyncUpdate.current ? updateAllAsync() : updateAllSync();
}

function getSyncPendingModifyFiberArray() {
  var pendingUpdate = _env.pendingSyncModifyFiberArray.current.slice(0).filter(function (f) {
    return f.__needUpdate__ && f.mount;
  });

  pendingUpdate.sort(function (f1, f2) {
    return f1.deepIndex - f2.deepIndex > 0 ? 1 : -1;
  });
  _env.pendingSyncModifyFiberArray.current = [];
  return pendingUpdate;
}

function updateAllSync() {
  _env.needLoop.current = true;
  var pendingUpdate = getSyncPendingModifyFiberArray();
  (0, _debug.safeCall)(function () {
    return pendingUpdate.forEach(_render.renderLoopSync);
  });
  (0, _position.runPosition)();
  runUpdate();
  (0, _unmount.runUnmount)();
  (0, _effect.runLayoutEffect)();
  (0, _effect.runEffect)();
  _env.needLoop.current = false;
}

function getAsyncPendingModifyNextFiber() {
  while (_env.pendingAsyncModifyFiberArray.current.length) {
    var nextFiber = _env.pendingAsyncModifyFiberArray.current.popTop();

    if (nextFiber.mount && nextFiber.__needUpdate__) {
      return nextFiber;
    }
  }

  return null;
}

function updateAllAsync() {
  _env.needLoop.current = true;
  (0, _render.renderLoopAsync)(getAsyncPendingModifyNextFiber, function () {
    (0, _position.runPosition)();
    runUpdate();
    (0, _unmount.runUnmount)();
    (0, _effect.runLayoutEffect)();
    (0, _effect.runEffect)();
    _env.needLoop.current = false;
  });
}

function updateStart() {
  if (!_env.needLoop.current) {
    updateEntry();
  }
}

var asyncUpdate = function asyncUpdate() {
  return Promise.resolve().then(updateStart);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 */


exports.asyncUpdate = asyncUpdate;

function pushUpdate(fiber) {
  if (!fiber.__pendingUpdate__) {
    fiber.__pendingUpdate__ = true;

    _env.pendingUpdateFiberArray.current.push(fiber);
  }
}

function runUpdate() {
  var allUpdateArray = _env.pendingUpdateFiberArray.current.slice(0);

  allUpdateArray.forEach(function (fiber) {
    fiber.__pendingUpdate__ = false;

    if (fiber.mount) {
      commitUpdate(fiber, (0, _domTool.getDom)(fiber.fiberParent, function (fiber) {
        return fiber.fiberParent;
      }) || _env.rootContainer.current);
    }
  });
  _env.pendingUpdateFiberArray.current = [];
}