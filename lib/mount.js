"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountStart = mountStart;

var _domTool = require("./domTool.js");

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _update = require("./update.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */
function mountLoop(currentFiber, parentDom) {
  if (currentFiber && currentFiber.mount) {
    if (_env.isHydrateRender.current) {
      (0, _update.hydrateUpdate)(currentFiber, parentDom);
    } else {
      (0, _update.commitUpdate)(currentFiber, parentDom);
    }

    currentFiber.children.forEach(function (f) {
      mountLoop(f, currentFiber.dom || parentDom);
    }); // no need use this logic
    // mountLoop(currentFiber.fiberChildHead, currentFiber.dom || parentDom);
    // mountLoop(currentFiber.fiberSibling, parentDom);
  }
}

function mountStart() {
  try {
    mountLoop(_env.rootFiber.current, (0, _domTool.getDom)(_env.rootFiber.current.fiberParent, function (fiber) {
      return fiber.fiberParent;
    }) || _env.rootContainer.current);
  } catch (e) {
    console.log(e);
  }
}