"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runLayoutEffect = exports.runEffect = exports.pushLayoutEffect = exports.pushEffect = void 0;

var _index = require("./fiber/index.js");

var _env = require("./env.js");

var prepareEffectArray = function prepareEffectArray(effectArray, index) {
  effectArray[index] = effectArray[index] || [];
  return effectArray[index];
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} effect
 */


var pushLayoutEffect = function pushLayoutEffect(fiber, effect) {
  if (_env.isServerRender.current) return;
  prepareEffectArray(_env.pendingLayoutEffectArray.current, fiber.deepIndex).push(effect);
};
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {any} effect
 */


exports.pushLayoutEffect = pushLayoutEffect;

var pushEffect = function pushEffect(fiber, effect) {
  if (_env.isServerRender.current) return;
  prepareEffectArray(_env.pendingEffectArray.current, fiber.deepIndex).push(effect);
};

exports.pushEffect = pushEffect;

var runLayoutEffect = function runLayoutEffect() {
  var allLayoutEffectArray = _env.pendingLayoutEffectArray.current.slice(0);

  for (var i = allLayoutEffectArray.length - 1; i >= 0; i--) {
    var effectArray = allLayoutEffectArray[i];

    if (Array.isArray(effectArray) && effectArray.length) {
      effectArray.forEach(function (effect) {
        if (typeof effect === "function") {
          effect();
        } else {
          effect.effect = false;
          effect.__pendingEffect__ = false;
          effect.cancel && effect.cancel();
          effect.cancel = effect.value();
        }
      });
    }
  }

  _env.pendingLayoutEffectArray.current = [];
};

exports.runLayoutEffect = runLayoutEffect;

var runEffect = function runEffect() {
  var allEffectArray = _env.pendingEffectArray.current.slice(0);

  if (allEffectArray.length) {
    setTimeout(function () {
      for (var i = allEffectArray.length - 1; i >= 0; i--) {
        var effectArray = allEffectArray[i];

        if (Array.isArray(effectArray)) {
          effectArray.forEach(function (effect) {
            effect.effect = false;
            effect.__pendingEffect__ = false;
            effect.cancel && effect.cancel();
            if (effect.__fiber__.mount) effect.cancel = effect.value();
          });
        }
      }
    });
  }

  _env.pendingEffectArray.current = [];
};

exports.runEffect = runEffect;