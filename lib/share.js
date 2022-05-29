"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactTypeInternalInstance = exports.MyReactInstance = void 0;

var _debug = require("./debug.js");

var _fiber = require("./fiber.js");

var _tools = require("./tools.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyReactInstance = /*#__PURE__*/function () {
  function MyReactInstance() {
    _classCallCheck(this, MyReactInstance);

    _defineProperty(this, "__fiber__", null);

    _defineProperty(this, "__context__", null);
  }

  _createClass(MyReactInstance, [{
    key: "updateDependence",
    value:
    /**
     *
     * @param {MyReactFiberNode} newFiber
     * @param {MyReactFiberNode} newContext
     */
    function updateDependence(newFiber, newContext) {
      this.__fiber__ = newFiber || this.__fiber__;
      this.__context__ = newContext || this.__context__;
    }
  }, {
    key: "processContext",
    value: function processContext(ContextObject) {
      var _this$__context__;

      if (this.__context__) this.__context__.removeListener(this);
      var providerFiber = MyReactInstance.getContextFiber(this.__fiber__, ContextObject);
      this.updateDependence(null, providerFiber);
      (_this$__context__ = this.__context__) === null || _this$__context__ === void 0 ? void 0 : _this$__context__.addListener(this);
      return providerFiber;
    }
  }], [{
    key: "getProviderFiber",
    value:
    /**
     *
     * @param {MyReactFiberNode} fiber
     * @returns {MyReactFiberNode | null}
     */
    function getProviderFiber(fiber, providerObject) {
      if (fiber) {
        if (fiber.__isObjectNode__ && fiber.__isContextProvider__ && fiber.__vdom__.type === providerObject) {
          return fiber;
        } else {
          return MyReactInstance.getProviderFiber(fiber.fiberParent, providerObject);
        }
      }
    }
    /**
     *
     * @param {MyReactFiberNode} fiber
     * @param {any} ContextObject
     */

  }, {
    key: "getContextFiber",
    value: function getContextFiber(fiber, ContextObject) {
      if (!ContextObject) return;
      if (ContextObject.type !== _tools.Context) throw new Error("wrong usage");
      var providerFiber = MyReactInstance.getProviderFiber(fiber, ContextObject.Provider);
      if (!providerFiber) console.warn("can not get context", (0, _debug.logCurrentRunningFiber)());
      return providerFiber;
    }
    /**
     * @type MyReactFiberNode
     */

  }]);

  return MyReactInstance;
}();

exports.MyReactInstance = MyReactInstance;
var NODE_TYPE_KEY = ["__isTextNode__", "__isEmptyNode__", "__isPlainNode__", "__isFragmentNode__", "__isObjectNode__", "__isForwardRef__", "__isPortal__", "__isMemo__", "__isContextProvider__", "__isContextConsumer__", "__isDynamicNode__", "__isClassComponent__", "__isFunctionComponent__"];

var MyReactTypeInternalInstance = /*#__PURE__*/function () {
  function MyReactTypeInternalInstance() {
    _classCallCheck(this, MyReactTypeInternalInstance);

    _defineProperty(this, "__INTERNAL_NODE_TYPE__", {
      __isTextNode__: false,
      __isEmptyNode__: false,
      __isPlainNode__: false,
      __isFragmentNode__: false,
      // 对象转换为节点   //
      __isObjectNode__: false,
      __isForwardRef__: false,
      __isPortal__: false,
      __isMemo__: false,
      __isContextProvider__: false,
      __isContextConsumer__: false,
      // 动态节点 //
      __isDynamicNode__: false,
      __isClassComponent__: false,
      __isFunctionComponent__: false
    });
  }

  _createClass(MyReactTypeInternalInstance, [{
    key: "_processUpdateType",
    value:
    /**
     *
     * @param {{
     *  __isTextNode__: boolean,
     *  __isEmptyNode__: boolean,
     *  __isPlainNode__: boolean,
     *  __isFragmentNode__: boolean,
     *  __isObjectNode__: boolean,
     *  __isForwardRef__: boolean,
     *  __isPortal__: boolean,
     *  __isMemo__: boolean,
     *  __isContextProvider__: boolean,
     *  __isContextConsumer__: boolean,
     *  __isDynamicNode__: boolean,
     *  __isClassComponent__: boolean,
     *  __isFunctionComponent__: boolean,
     * }} props
     */
    function _processUpdateType(props) {
      var _this = this;

      Object.keys(props || {}).forEach(function (key) {
        _this.__INTERNAL_NODE_TYPE__[key] = props[key];
      });
    }
    /**
     *
     * @param {MyReactTypeInternalInstance} instance
     */

  }, {
    key: "_processSucceedType",
    value: function _processSucceedType(instance) {
      var _this2 = this;

      NODE_TYPE_KEY.forEach(function (key) {
        _this2.__INTERNAL_NODE_TYPE__[key] = instance.__INTERNAL_NODE_TYPE__[key];
      });
    }
  }, {
    key: "__isTextNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isTextNode__;
    }
  }, {
    key: "__isEmptyNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isEmptyNode__;
    }
  }, {
    key: "__isPlainNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isPlainNode__;
    }
  }, {
    key: "__isFragmentNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isFragmentNode__;
    }
  }, {
    key: "__isObjectNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isObjectNode__;
    }
  }, {
    key: "__isForwardRef__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isForwardRef__;
    }
  }, {
    key: "__isPortal__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isPortal__;
    }
  }, {
    key: "__isMemo__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isMemo__;
    }
  }, {
    key: "__isContextProvider__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isContextProvider__;
    }
  }, {
    key: "__isContextConsumer__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isContextConsumer__;
    }
  }, {
    key: "__isDynamicNode__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isDynamicNode__;
    }
  }, {
    key: "__isClassComponent__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isClassComponent__;
    }
  }, {
    key: "__isFunctionComponent__",
    get: function get() {
      return this.__INTERNAL_NODE_TYPE__.__isFunctionComponent__;
    }
  }]);

  return MyReactTypeInternalInstance;
}();

exports.MyReactTypeInternalInstance = MyReactTypeInternalInstance;