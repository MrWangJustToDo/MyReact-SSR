"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountStart = mountStart;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

var _hydrate = require("./hydrate.js");

var _tools = require("./tools.js");

var _update = require("./update.js");

/**
 *
 * @param {MyReactFiberNode} currentFiber
 * @param {HTMLElement} parentDom
 */
function mountLoop(currentFiber, parentDom) {
  if (currentFiber && currentFiber.mount) {
    if (_env.isHydrate.current) {
      (0, _hydrate.hydrateUpdate)(currentFiber, parentDom);
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
    mountLoop(_env.rootFiber.current, (0, _tools.getDom)(_env.rootFiber.current.fiberParent, function (fiber) {
      return fiber.fiberParent;
    }) || _env.rootContainer.current);
  } catch (e) {
    console.log(e);
  }
}