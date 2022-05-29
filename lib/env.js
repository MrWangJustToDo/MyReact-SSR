"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootFiber = exports.rootContainer = exports.pendingUpdateFiberArray = exports.pendingUnmountFiberArray = exports.pendingSyncModifyFiberArray = exports.pendingPositionFiberArray = exports.pendingLayoutEffectArray = exports.pendingEffectArray = exports.pendingAsyncModifyFiberArray = exports.nextTransformFiberArray = exports.needLoop = exports.isServerRender = exports.isMounted = exports.isHydrate = exports.enableKeyDiff = exports.enableHighLight = exports.enableEventSystem = exports.enableDebugLog = exports.enableControlComponent = exports.enableAsyncUpdate = exports.enableAllCheck = exports.empty = exports.currentTransformFiberArray = exports.currentRunningFiber = exports.currentHookDeepIndex = exports.currentFunctionFiber = exports.asyncUpdateTimeStep = exports.asyncUpdateTimeLimit = void 0;

var _tools = require("./tools.js");

var empty = {};
exports.empty = empty;
var asyncUpdateTimeLimit = 14;
exports.asyncUpdateTimeLimit = asyncUpdateTimeLimit;
var needLoop = (0, _tools.createRef)(false);
exports.needLoop = needLoop;
var rootFiber = (0, _tools.createRef)(null);
exports.rootFiber = rootFiber;
var rootContainer = (0, _tools.createRef)(null);
exports.rootContainer = rootContainer;
var currentRunningFiber = (0, _tools.createRef)(null);
exports.currentRunningFiber = currentRunningFiber;
var isMounted = (0, _tools.createRef)(false);
exports.isMounted = isMounted;
var isHydrate = (0, _tools.createRef)(false);
exports.isHydrate = isHydrate;
var isServerRender = (0, _tools.createRef)(false);
exports.isServerRender = isServerRender;
var enableKeyDiff = (0, _tools.createRef)(true);
exports.enableKeyDiff = enableKeyDiff;
var enableHighLight = (0, _tools.createRef)(false);
exports.enableHighLight = enableHighLight;
var enableDebugLog = (0, _tools.createRef)(false);
exports.enableDebugLog = enableDebugLog;
var enableAllCheck = (0, _tools.createRef)(true);
exports.enableAllCheck = enableAllCheck;
var enableAsyncUpdate = (0, _tools.createRef)(true);
exports.enableAsyncUpdate = enableAsyncUpdate;
var enableEventSystem = (0, _tools.createRef)(true);
exports.enableEventSystem = enableEventSystem;
var enableControlComponent = (0, _tools.createRef)(true);
exports.enableControlComponent = enableControlComponent;
var asyncUpdateTimeStep = (0, _tools.createRef)(null);
exports.asyncUpdateTimeStep = asyncUpdateTimeStep;
var currentHookDeepIndex = (0, _tools.createRef)(0);
exports.currentHookDeepIndex = currentHookDeepIndex;
var currentFunctionFiber = (0, _tools.createRef)(null);
exports.currentFunctionFiber = currentFunctionFiber;
var nextTransformFiberArray = (0, _tools.createRef)([]);
exports.nextTransformFiberArray = nextTransformFiberArray;
var currentTransformFiberArray = (0, _tools.createRef)([]);
exports.currentTransformFiberArray = currentTransformFiberArray;
var pendingLayoutEffectArray = (0, _tools.createRef)([]);
exports.pendingLayoutEffectArray = pendingLayoutEffectArray;
var pendingEffectArray = (0, _tools.createRef)([]);
exports.pendingEffectArray = pendingEffectArray;
var pendingSyncModifyFiberArray = (0, _tools.createRef)([]);
exports.pendingSyncModifyFiberArray = pendingSyncModifyFiberArray;
var pendingAsyncModifyFiberArray = (0, _tools.createRef)(new _tools.PriorityQueueByArrayAboutJudge(function (o1, o2) {
  return o1 > o2;
}, function (fiber) {
  return fiber.deepIndex;
}));
exports.pendingAsyncModifyFiberArray = pendingAsyncModifyFiberArray;
var pendingUpdateFiberArray = (0, _tools.createRef)([]);
exports.pendingUpdateFiberArray = pendingUpdateFiberArray;
var pendingUnmountFiberArray = (0, _tools.createRef)([]);
exports.pendingUnmountFiberArray = pendingUnmountFiberArray;
var pendingPositionFiberArray = (0, _tools.createRef)([]);
exports.pendingPositionFiberArray = pendingPositionFiberArray;