"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootFiber = exports.rootContainer = exports.pendingUpdateFiberArray = exports.pendingUnmountFiberArray = exports.pendingSyncModifyFiberArray = exports.pendingPositionFiberArray = exports.pendingMountFiberArray = exports.pendingLayoutEffectArray = exports.pendingEffectArray = exports.pendingAsyncModifyTopLevelFiber = exports.pendingAsyncModifyFiberArray = exports.pendingAsyncModifyFiber = exports.nextTransformFiberArray = exports.isServerRender = exports.isMounted = exports.isHydrateRender = exports.globalLoop = exports.enableKeyDiff = exports.enableHighLight = exports.enableEventSystem = exports.enableDebugLog = exports.enableControlComponent = exports.enableAsyncUpdate = exports.enableAllCheck = exports.currentTransformFiberArray = exports.currentRunningFiber = exports.currentHookDeepIndex = exports.currentFunctionFiber = exports.asyncUpdateTimeStep = exports.asyncUpdateTimeLimit = void 0;

var _share = require("./share.js");

var asyncUpdateTimeLimit = 18;
exports.asyncUpdateTimeLimit = asyncUpdateTimeLimit;
var globalLoop = (0, _share.createRef)(false);
exports.globalLoop = globalLoop;
var rootFiber = (0, _share.createRef)(null);
exports.rootFiber = rootFiber;
var rootContainer = (0, _share.createRef)(null);
exports.rootContainer = rootContainer;
var currentRunningFiber = (0, _share.createRef)(null);
exports.currentRunningFiber = currentRunningFiber;
var currentFunctionFiber = (0, _share.createRef)(null);
exports.currentFunctionFiber = currentFunctionFiber;
var currentHookDeepIndex = (0, _share.createRef)(0);
exports.currentHookDeepIndex = currentHookDeepIndex;
var isMounted = (0, _share.createRef)(false);
exports.isMounted = isMounted;
var isServerRender = (0, _share.createRef)(false);
exports.isServerRender = isServerRender;
var isHydrateRender = (0, _share.createRef)(false); // ==== feature ==== //

exports.isHydrateRender = isHydrateRender;
var enableKeyDiff = (0, _share.createRef)(true);
exports.enableKeyDiff = enableKeyDiff;
var enableHighLight = (0, _share.createRef)(false);
exports.enableHighLight = enableHighLight;
var enableDebugLog = (0, _share.createRef)(false);
exports.enableDebugLog = enableDebugLog;
var enableAllCheck = (0, _share.createRef)(true);
exports.enableAllCheck = enableAllCheck;
var enableAsyncUpdate = (0, _share.createRef)(true);
exports.enableAsyncUpdate = enableAsyncUpdate;
var enableEventSystem = (0, _share.createRef)(true);
exports.enableEventSystem = enableEventSystem;
var enableControlComponent = (0, _share.createRef)(true); // ==== running ==== //

exports.enableControlComponent = enableControlComponent;
var asyncUpdateTimeStep = (0, _share.createRef)(null);
exports.asyncUpdateTimeStep = asyncUpdateTimeStep;
var nextTransformFiberArray = (0, _share.createRef)([]);
exports.nextTransformFiberArray = nextTransformFiberArray;
var currentTransformFiberArray = (0, _share.createRef)([]); // ==== update ==== //

exports.currentTransformFiberArray = currentTransformFiberArray;
var pendingEffectArray = (0, _share.createRef)([]);
exports.pendingEffectArray = pendingEffectArray;
var pendingLayoutEffectArray = (0, _share.createRef)([]);
exports.pendingLayoutEffectArray = pendingLayoutEffectArray;
var pendingSyncModifyFiberArray = (0, _share.createRef)([]);
exports.pendingSyncModifyFiberArray = pendingSyncModifyFiberArray;
var pendingAsyncModifyFiberArray = (0, _share.createRef)(_share.SORT_BY_DEEP_HEAP);
exports.pendingAsyncModifyFiberArray = pendingAsyncModifyFiberArray;
var pendingAsyncModifyTopLevelFiber = (0, _share.createRef)(null);
exports.pendingAsyncModifyTopLevelFiber = pendingAsyncModifyTopLevelFiber;
var pendingAsyncModifyFiber = (0, _share.createRef)(null);
exports.pendingAsyncModifyFiber = pendingAsyncModifyFiber;
var pendingMountFiberArray = (0, _share.createRef)([]);
exports.pendingMountFiberArray = pendingMountFiberArray;
var pendingUpdateFiberArray = (0, _share.createRef)([]);
exports.pendingUpdateFiberArray = pendingUpdateFiberArray;
var pendingUnmountFiberArray = (0, _share.createRef)([]);
exports.pendingUnmountFiberArray = pendingUnmountFiberArray;
var pendingPositionFiberArray = (0, _share.createRef)([]);
exports.pendingPositionFiberArray = pendingPositionFiberArray;