"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactFiberNode = void 0;
exports.createFiberNode = createFiberNode;
exports.createFiberNodeWithPosition = createFiberNodeWithPosition;
exports.createFiberNodeWithUpdate = createFiberNodeWithUpdate;
exports.createFiberNodeWithUpdateAndPosition = createFiberNodeWithUpdateAndPosition;
exports.updateFiberNode = updateFiberNode;
exports.updateFiberNodeWithPosition = updateFiberNodeWithPosition;

var _component = require("./component.js");

var _dom = require("./dom.js");

var _env = require("./env.js");

var _hook = require("./hook.js");

var _position = require("./position.js");

var _share = require("./share.js");

var _update = require("./update.js");

var _vdom = require("./vdom.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {MyReactFiberNode} fiber
 */
function pushFiber(fiber) {
  if (!fiber.__needUpdate__) {
    fiber.__needUpdate__ = true;
    fiber.fiberAlternate = fiber;

    if (_env.enableAsyncUpdate.current) {
      _env.pendingAsyncModifyFiberArray.current.pushValue(fiber);
    } else {
      _env.pendingSyncModifyFiberArray.current.push(fiber);
    }
  }

  (0, _update.asyncUpdate)();
}

var MyReactFiberInternalInstance = /*#__PURE__*/function (_MyReactTypeInternalI) {
  _inherits(MyReactFiberInternalInstance, _MyReactTypeInternalI);

  var _super = _createSuper(MyReactFiberInternalInstance);

  function MyReactFiberInternalInstance() {
    var _this;

    _classCallCheck(this, MyReactFiberInternalInstance);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _defineProperty(_assertThisInitialized(_this), "__INTERNAL_DIFF__", {
      __diffMount__: false,

      /**
       * @type MyReactFiberNode
       */
      __diffPrevRender__: null,

      /**
       * @type MyReactFiberNode[]
       */
      __renderedChildren__: [],
      __renderedCount__: 1,
      __updateTimeStep__: Date.now(),
      __lastUpdateTimeStep__: null
    });

    _defineProperty(_assertThisInitialized(_this), "__INTERNAL_STATE__", {
      __pendingUpdate__: false,
      __pendingUnmount__: false,
      __pendingPosition__: false
    });

    _defineProperty(_assertThisInitialized(_this), "__INTERNAL_EVENT_STATE__", {});

    _defineProperty(_assertThisInitialized(_this), "__INTERNAL_EVENT_SYSTEM__", {
      addEventListener: function addEventListener(event, cb, isCapture) {
        if (_env.enableEventSystem.current) {
          if (_typeof(isCapture) === "object" && isCapture !== null) {
            throw new Error("event system not support object options, pls use dom.addEventListener(), will improve this later");
          }

          var cacheEventName = "".concat(event, "_").concat(isCapture ? "true" : "false");

          if (_this.__INTERNAL_EVENT_STATE__[cacheEventName]) {
            _this.__INTERNAL_EVENT_STATE__[cacheEventName].cb = cb;
          } else {
            var handler = function handler() {
              if (handler.cb) {
                var _handler$cb;

                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                (_handler$cb = handler.cb).call.apply(_handler$cb, [null].concat(args));
              } // support control component


              if (_env.enableControlComponent.current) {
                if (_this.__isPlainNode__ && _this.__vdom__.type === "input" && // todo more event, like change
                event === "input" && "value" in _this.memoProps) {
                  _this.dom["value"] = _this.memoProps["value"];
                }
              }
            };

            handler.cb = cb;
            _this.__INTERNAL_EVENT_STATE__[cacheEventName] = handler;

            _this.dom.addEventListener(event, handler, isCapture);
          }
        } else {
          if (_env.enableControlComponent.current) {
            throw new Error("must enable eventSystem first!");
          }

          _this.dom.addEventListener(event, cb, isCapture);
        }
      },
      removeEventListener: function removeEventListener(event, cb, isCapture) {
        if (_env.enableEventSystem.current) {
          var cacheEventName = "".concat(event, "_").concat(isCapture ? "true" : "false");

          if (!_this.__INTERNAL_EVENT_STATE__[cacheEventName]) {
            throw new Error("can not remove event listener");
          }

          _this.__INTERNAL_EVENT_STATE__[cacheEventName].cb = null;
        } else {
          _this.dom.removeEventListener(event, cb, isCapture);
        }
      }
    });

    return _this;
  }

  _createClass(MyReactFiberInternalInstance, [{
    key: "__diffMount__",
    get: function get() {
      return this.__INTERNAL_DIFF__.__diffMount__;
    },
    set: function set(v) {
      this.__INTERNAL_DIFF__.__diffMount__ = v;
    }
  }, {
    key: "__diffPrevRender__",
    get: function get() {
      return this.__INTERNAL_DIFF__.__diffPrevRender__;
    },
    set: function set(v) {
      this.__INTERNAL_DIFF__.__diffPrevRender__ = v;
    }
  }, {
    key: "__renderedChildren__",
    get: function get() {
      return this.__INTERNAL_DIFF__.__renderedChildren__;
    },
    set: function set(v) {
      this.__INTERNAL_DIFF__.__renderedChildren__ = v;
    }
  }, {
    key: "__pendingUpdate__",
    get: function get() {
      return this.__INTERNAL_STATE__.__pendingUpdate__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__pendingUpdate__ = v;
    }
  }, {
    key: "__pendingPosition__",
    get: function get() {
      return this.__INTERNAL_STATE__.__pendingPosition__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__pendingPosition__ = v;
    }
  }, {
    key: "__pendingUnmount__",
    get: function get() {
      return this.__INTERNAL_STATE__.__pendingUnmount__;
    },
    set: function set(v) {
      this.__INTERNAL_STATE__.__pendingUnmount__ = v;
    }
  }, {
    key: "__renderedCount__",
    get: function get() {
      return this.__INTERNAL_DIFF__.__renderedCount__;
    },
    set: function set(v) {
      this.__INTERNAL_DIFF__.__renderedCount__ = v;
    } // =========== event system ===============

  }]);

  return MyReactFiberInternalInstance;
}(_share.MyReactTypeInternalInstance);

var MyReactFiberNode = /*#__PURE__*/function (_MyReactFiberInternal) {
  _inherits(MyReactFiberNode, _MyReactFiberInternal);

  var _super2 = _createSuper(MyReactFiberNode);

  /**
   * @type number
   */

  /**
   * @type string
   */

  /**
   * @type MyReactFiberNode[]
   */

  /**
   * @type MyReactFiberNode[]
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactFiberNode
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type MyReactHookNode
   */

  /**
   * @type MyReactHookNode[]
   */

  /**
   * @type MyReactInstance & MyReactComponent
   */

  /**
   * @type Function[]
   */

  /**
   * @type MyReactVDom
   */
  function MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect, dom, hookHead, hookFoot, hookList, listeners, instance) {
    var _this2;

    _classCallCheck(this, MyReactFiberNode);

    _this2 = _super2.call(this);

    _defineProperty(_assertThisInitialized(_this2), "key", void 0);

    _defineProperty(_assertThisInitialized(_this2), "deepIndex", void 0);

    _defineProperty(_assertThisInitialized(_this2), "effect", void 0);

    _defineProperty(_assertThisInitialized(_this2), "dom", void 0);

    _defineProperty(_assertThisInitialized(_this2), "mount", true);

    _defineProperty(_assertThisInitialized(_this2), "initial", true);

    _defineProperty(_assertThisInitialized(_this2), "memoProps", null);

    _defineProperty(_assertThisInitialized(_this2), "memoState", null);

    _defineProperty(_assertThisInitialized(_this2), "children", []);

    _defineProperty(_assertThisInitialized(_this2), "child", null);

    _defineProperty(_assertThisInitialized(_this2), "fiberChildHead", null);

    _defineProperty(_assertThisInitialized(_this2), "fiberChildFoot", null);

    _defineProperty(_assertThisInitialized(_this2), "fiberParent", null);

    _defineProperty(_assertThisInitialized(_this2), "fiberSibling", null);

    _defineProperty(_assertThisInitialized(_this2), "fiberAlternate", null);

    _defineProperty(_assertThisInitialized(_this2), "hookHead", void 0);

    _defineProperty(_assertThisInitialized(_this2), "hookFoot", void 0);

    _defineProperty(_assertThisInitialized(_this2), "hookList", void 0);

    _defineProperty(_assertThisInitialized(_this2), "instance", void 0);

    _defineProperty(_assertThisInitialized(_this2), "listeners", void 0);

    _defineProperty(_assertThisInitialized(_this2), "__vdom__", null);

    _defineProperty(_assertThisInitialized(_this2), "__needUpdate__", false);

    _this2.key = key;
    _this2.deepIndex = deepIndex;
    _this2.fiberParent = fiberParent;
    _this2.fiberAlternate = fiberAlternate;
    _this2.effect = effect;
    _this2.dom = dom;
    _this2.hookHead = hookHead;
    _this2.hookFoot = hookFoot;
    _this2.hookList = hookList;
    _this2.listeners = listeners;
    _this2.instance = instance;

    _this2._initialUpdate();

    _this2._initialParent();

    return _this2;
  }

  _createClass(MyReactFiberNode, [{
    key: "_initialUpdate",
    value: function _initialUpdate() {
      if (this.fiberAlternate) {
        var fiberAlternate = this.fiberAlternate;
        fiberAlternate.mount = false;
        fiberAlternate.fiberAlternate = null;
        fiberAlternate.__needUpdate__ = false;
        this.__renderedCount__ = fiberAlternate.__renderedCount__ + 1;
        this.__INTERNAL_EVENT_STATE__ = fiberAlternate.__INTERNAL_EVENT_STATE__;
      }
    }
  }, {
    key: "_initialParent",
    value: function _initialParent() {
      if (this.fiberParent) {
        this.fiberParent.addChild(this);
      }
    }
    /**
     *
     * @param {MyReactVDom} newVDom
     */

  }, {
    key: "installVDom",
    value: function installVDom(newVDom) {
      this.__vdom__ = newVDom;
      this.key = newVDom === null || newVDom === void 0 ? void 0 : newVDom.key;

      this._processType();

      this._processDom();

      this._processRef();

      this._processMemoProps();
    }
  }, {
    key: "_processType",
    value: function _processType() {
      var VDom = this.__vdom__;

      if ((0, _vdom.isValidElement)(VDom)) {
        this._processSucceedType(VDom);

        return;
      }

      if (_typeof(VDom) === "object") {
        this.__INTERNAL_NODE_TYPE__.__isEmptyNode__ = true;
        return;
      }

      this.__INTERNAL_NODE_TYPE__.__isTextNode__ = true;
    }
  }, {
    key: "_processDom",
    value: function _processDom() {
      if (this.__isTextNode__ || this.__isPlainNode__) {
        this.dom = this.dom || (0, _dom.createDom)(this);
      }

      if (this.__isPortal__) {
        this.dom = this.__vdom__.props.container;
      }
    }
  }, {
    key: "_processRef",
    value: function _processRef() {
      if (this.__isPlainNode__ && this.dom) {
        var ref = this.__vdom__.ref;

        if (_typeof(ref) === "object") {
          ref.current = this.dom;
        } else if (typeof ref === "function") {
          ref.call(null, this.dom);
        }
      }
    }
  }, {
    key: "_processMemoProps",
    value: function _processMemoProps() {
      this.memoProps = this.__isTextNode__ ? null : this.__vdom__.props;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.fiberChildHead = null;
      this.fiberChildFoot = null;
      this.child = null;
      this.children = [];
      this.__renderedChildren__ = [];
    }
  }, {
    key: "updated",
    value: function updated() {
      this.initial = false;
      this.__needUpdate__ = false;
      if (!this.effect) this.fiberAlternate = null;
    }
  }, {
    key: "updateDiffState",
    value: function updateDiffState() {
      if (this.fiberAlternate) {
        this.__renderedCount__ = this.fiberAlternate.__renderedCount__ + 1;
      } else {
        this.__renderedCount__ = this.__renderedCount__ + 1;
      } // only need update dom node


      if (!this.__isPlainNode__ && !this.__isTextNode__) {
        this.effect = null;
      }
    }
  }, {
    key: "stopUpdate",
    value: function stopUpdate() {
      var _this3 = this;

      var alternate = this.fiberAlternate;

      if (alternate !== this) {
        this.child = alternate.child;
        this.children = alternate.children;
        this.fiberChildHead = alternate.fiberChildHead;
        this.fiberChildFoot = alternate.fiberChildFoot;
        this.__renderedChildren__ = alternate.__renderedChildren__;
        this.children.forEach(function (child) {
          return child.fiberParent = _this3;
        });
      }
    }
    /**
     *
     * @param {MyReactFiberNode} parentFiber
     */

  }, {
    key: "installParent",
    value: function installParent(parentFiber) {
      this.fiberParent = parentFiber;
      this.fiberSibling = null;

      this._initialParent();
    }
    /**
     *
     * @param {MyReactComponent & MyReactInstance} instance
     */

  }, {
    key: "installInstance",
    value: function installInstance(instance) {
      this.instance = instance;
    }
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "installHook",
    value: function installHook(hookNode) {
      this.addHook(hookNode);
    }
  }, {
    key: "addListener",
    value: function addListener(node) {
      if (this.listeners.every(function (_node) {
        return _node !== node;
      })) {
        this.listeners.push(node);
      }
    }
  }, {
    key: "removeListener",
    value: function removeListener(node) {
      this.listeners = this.listeners.filter(function (_node) {
        return _node !== node;
      });
    }
    /**
     *
     * @param {MyReactFiberNode} childFiber
     */

  }, {
    key: "addChild",
    value: function addChild(childFiber) {
      this.children.push(childFiber);

      if (!this.child) {
        this.child = childFiber;
        this.fiberChildHead = childFiber;
        this.fiberChildFoot = childFiber;
      } else {
        this.fiberChildFoot.fiberSibling = childFiber;
        this.fiberChildFoot = childFiber;
      }
    }
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "addHook",
    value: function addHook(hookNode) {
      this.hookList.push(hookNode);

      if (!this.hookHead) {
        this.hookHead = hookNode;
        this.hookFoot = hookNode;
      } else {
        this.hookFoot.hookNext = hookNode;
        hookNode.hookPrev = this.hookFoot;
        this.hookFoot = hookNode;
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.mount) {
        pushFiber(this);
      } else {
        console.error("update a unmount fiber");
      }
    }
  }]);

  return MyReactFiberNode;
}(MyReactFiberInternalInstance);
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: string, dom: HTMLElement, hookHead: MyReactHookNode, hookFoot: MyReactHookNode, hookList: MyReactHookNode[], listeners: MyReactInstance[], instance: MyReactInstance }} param
 * @param {MyReactVDom} newVDom
 * @returns
 */


exports.MyReactFiberNode = MyReactFiberNode;

function createFiberNode(_ref, newVDom) {
  var key = _ref.key,
      deepIndex = _ref.deepIndex,
      fiberParent = _ref.fiberParent,
      fiberAlternate = _ref.fiberAlternate,
      effect = _ref.effect,
      dom = _ref.dom,
      hookHead = _ref.hookHead,
      hookFoot = _ref.hookFoot,
      _ref$hookList = _ref.hookList,
      hookList = _ref$hookList === void 0 ? [] : _ref$hookList,
      _ref$listeners = _ref.listeners,
      listeners = _ref$listeners === void 0 ? [] : _ref$listeners,
      instance = _ref.instance;
  var newFiberNode = new MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect, dom, hookHead, hookFoot, hookList, listeners, instance);
  newFiberNode.installVDom(newVDom);
  newFiberNode.updateDiffState();
  return newFiberNode;
}
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: string, dom: HTMLElement, hookHead: MyReactHookNode, hookFoot: MyReactHookNode, hookList: MyReactHookNode[], listeners: MyReactInstance[], instance: MyReactInstance }} param
 * @param {MyReactVDom} newVDom
 * @returns
 */


function createFiberNodeWithUpdate(_ref2, newVDom) {
  var key = _ref2.key,
      deepIndex = _ref2.deepIndex,
      fiberParent = _ref2.fiberParent,
      fiberAlternate = _ref2.fiberAlternate,
      effect = _ref2.effect,
      dom = _ref2.dom,
      hookHead = _ref2.hookHead,
      hookFoot = _ref2.hookFoot,
      _ref2$hookList = _ref2.hookList,
      hookList = _ref2$hookList === void 0 ? [] : _ref2$hookList,
      _ref2$listeners = _ref2.listeners,
      listeners = _ref2$listeners === void 0 ? [] : _ref2$listeners,
      instance = _ref2.instance;
  var newFiber = createFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect,
    dom: dom,
    hookHead: hookHead,
    hookFoot: hookFoot,
    hookList: hookList,
    listeners: listeners,
    instance: instance
  }, newVDom);

  if (_env.isMounted.current && newFiber.dom && newFiber.effect) {
    (0, _update.pushUpdate)(newFiber);
  }

  return newFiber;
}
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: string, dom: HTMLElement, hookHead: MyReactHookNode, hookFoot: MyReactHookNode, hookList: MyReactHookNode[], listeners: MyReactInstance[], instance: MyReactInstance }} param
 * @param {{newVDom: MyReactVDom, previousRenderFiber: MyReactFiberNode}} param
 * @returns
 */


function createFiberNodeWithPosition(_ref3, _ref4) {
  var key = _ref3.key,
      deepIndex = _ref3.deepIndex,
      fiberParent = _ref3.fiberParent,
      fiberAlternate = _ref3.fiberAlternate,
      effect = _ref3.effect,
      dom = _ref3.dom,
      hookHead = _ref3.hookHead,
      hookFoot = _ref3.hookFoot,
      _ref3$hookList = _ref3.hookList,
      hookList = _ref3$hookList === void 0 ? [] : _ref3$hookList,
      _ref3$listeners = _ref3.listeners,
      listeners = _ref3$listeners === void 0 ? [] : _ref3$listeners,
      instance = _ref3.instance;
  var newVDom = _ref4.newVDom,
      previousRenderFiber = _ref4.previousRenderFiber;
  var newFiber = createFiberNode({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect,
    dom: dom,
    hookHead: hookHead,
    hookFoot: hookFoot,
    hookList: hookList,
    listeners: listeners,
    instance: instance
  }, newVDom);

  if (newFiber.fiberAlternate ? newFiber.fiberAlternate !== previousRenderFiber : newFiber !== previousRenderFiber) {
    (0, _position.processUpdatePosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
}
/**
 *
 * @param {{key: string, deepIndex: number, fiberParent: MyReactFiberNode, fiberAlternate: MyReactFiberNode, effect: string, dom: HTMLElement, hookHead: MyReactHookNode, hookFoot: MyReactHookNode, hookList: MyReactHookNode[], listeners: MyReactInstance[], instance: MyReactInstance }} param
 * @param {{newVDom: MyReactVDom, previousRenderFiber: MyReactFiberNode}} param
 * @returns
 */


function createFiberNodeWithUpdateAndPosition(_ref5, _ref6) {
  var key = _ref5.key,
      deepIndex = _ref5.deepIndex,
      fiberParent = _ref5.fiberParent,
      fiberAlternate = _ref5.fiberAlternate,
      effect = _ref5.effect,
      dom = _ref5.dom,
      hookHead = _ref5.hookHead,
      hookFoot = _ref5.hookFoot,
      _ref5$hookList = _ref5.hookList,
      hookList = _ref5$hookList === void 0 ? [] : _ref5$hookList,
      _ref5$listeners = _ref5.listeners,
      listeners = _ref5$listeners === void 0 ? [] : _ref5$listeners,
      instance = _ref5.instance;
  var newVDom = _ref6.newVDom,
      previousRenderFiber = _ref6.previousRenderFiber;
  var newFiber = createFiberNodeWithUpdate({
    key: key,
    deepIndex: deepIndex,
    fiberParent: fiberParent,
    fiberAlternate: fiberAlternate,
    effect: effect,
    dom: dom,
    hookHead: hookHead,
    hookFoot: hookFoot,
    hookList: hookList,
    listeners: listeners,
    instance: instance
  }, newVDom);

  if (newFiber.fiberAlternate ? newFiber.fiberAlternate !== previousRenderFiber : newFiber !== previousRenderFiber) {
    (0, _position.processUpdatePosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactVDom} vdom
 */


function updateFiberNode(fiber, parentFiber, vdom) {
  fiber.fiberAlternate = fiber;
  fiber.updateDiffState();
  fiber.installVDom(vdom);
  fiber.installParent(parentFiber);
  return fiber;
}
/**
 *
 * @param {MyReactFiberNode} fiber
 * @param {MyReactFiberNode} parentFiber
 * @param {MyReactFiberNode} previousRenderFiber
 * @param {MyReactVDom} vdom
 * @returns
 */


function updateFiberNodeWithPosition(fiber, parentFiber, previousRenderFiber, vdom) {
  var newFiber = updateFiberNode(fiber, parentFiber, vdom);

  if (newFiber !== previousRenderFiber) {
    (0, _position.processUpdatePosition)(newFiber, previousRenderFiber);
  }

  return newFiber;
}