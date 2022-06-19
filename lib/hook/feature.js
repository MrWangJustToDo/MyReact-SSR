"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushHookEffect = void 0;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;

var _share = require("../share.js");

var _create = require("./create.js");

var _debug = require("../debug.js");

var _instance = require("./instance.js");

var _effect = require("../effect.js");

var _env = require("../env.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function useState(initialValue) {
  var currentHookNode = (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof initialValue === "function" ? initialValue : function () {
    return initialValue;
  }, null, null, "useState");
  return [currentHookNode.result, currentHookNode.dispatch];
}

function useEffect(action, depArray) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useEffect");
}

function useLayoutEffect(action, depArray) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useLayoutEffect");
}

function useCallback(action, depArray) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useCallback").result;
}

function useMemo(action, depArray) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, action, null, depArray, "useMemo").result;
}

function useRef(value) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, (0, _share.createRef)(value), null, null, "useRef").result;
}

function useContext(Context) {
  return (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, Context, null, null, "useContext").result;
}

function useReducer(reducer, initialArg, init) {
  var currentHook = (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, typeof init === "function" ? function () {
    return init(initialArg);
  } : function () {
    return initialArg;
  }, reducer, null, "useReducer");
  return [currentHook.result, currentHook.dispatch];
}

function useImperativeHandle(ref, createHandle, deps) {
  (0, _create.getHookNode)(_env.currentFunctionFiber.current, _env.currentHookDeepIndex.current++, ref, createHandle, deps, "useImperativeHandle");
}

function useDebugValue() {
  if (_env.enableDebugLog.current) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ["[debug value]: \n"].concat(args, ["\ncomponent tree:", (0, _debug.getFiberTree)(_env.currentFunctionFiber.current)]));
  }
}
/**
 *
 * @param {MyReactHookNode} hookNode
 */


var pushHookEffect = function pushHookEffect(hookNode) {
  if (!hookNode.__pendingEffect__) {
    hookNode.__pendingEffect__ = true;

    if (hookNode.hookType === "useEffect") {
      (0, _effect.pushEffect)(hookNode.__fiber__, hookNode);
    } else if (hookNode.hookType === "useLayoutEffect") {
      (0, _effect.pushLayoutEffect)(hookNode.__fiber__, hookNode);
    } else {
      (0, _effect.pushLayoutEffect)(hookNode.__fiber__, function () {
        if (hookNode.value && _typeof(hookNode.value) === "object") {
          hookNode.value.current = hookNode.reducer.call(null);
        }

        hookNode.effect = false;
        hookNode.__pendingEffect = false;
      });
    }
  }
};

exports.pushHookEffect = pushHookEffect;