"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushEffect = pushEffect;
exports.pushLayoutEffect = pushLayoutEffect;
exports.runEffect = runEffect;
exports.runLayoutEffect = runLayoutEffect;

var _env = require("./env.js");

var _fiber = require("./fiber.js");

function prepareEffectArray(effectArray, index) {
  effectArray[index] = effectArray[index] || [];
  return effectArray[index];
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {Function} effect
 */


function pushLayoutEffect(fiber, effect) {
  prepareEffectArray(_env.pendingLayoutEffectArray.current, fiber.deepIndex).push(effect);
}

function runLayoutEffect() {
  var allLayoutEffectArray = _env.pendingLayoutEffectArray.current.slice(0);

  for (var i = allLayoutEffectArray.length - 1; i >= 0; i--) {
    var effectArray = allLayoutEffectArray[i];

    if (Array.isArray(effectArray) && effectArray.length) {
      effectArray.forEach(function (effect) {
        if (typeof effect === "function") {
          effect();
        } else {
          effect.__pendingEffect__ = false;
          effect.effect = false;
          effect.cancel && effect.cancel();
          effect.cancel = effect.value();
        }
      });
    }
  }

  _env.pendingLayoutEffectArray.current = [];
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {Function} effect
 */


function pushEffect(fiber, effect) {
  prepareEffectArray(_env.pendingEffectArray.current, fiber.deepIndex).push(effect);
}

function runEffect() {
  var allEffectArray = _env.pendingEffectArray.current.slice(0);

  if (allEffectArray.length) {
    setTimeout(function () {
      for (var i = allEffectArray.length - 1; i >= 0; i--) {
        var effectArray = allEffectArray[i];

        if (Array.isArray(effectArray)) {
          effectArray.forEach(function (effect) {
            effect.__pendingEffect__ = false;
            effect.effect = false;
            effect.cancel && effect.cancel();
            effect.cancel = effect.value();
          });
        }
      }
    });
  }

  _env.pendingEffectArray.current = [];
}