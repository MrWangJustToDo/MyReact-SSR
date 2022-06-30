"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactFiberNode = void 0;

var _index = require("../hook/index.js");

var _index2 = require("../component/index.js");

var _debug = require("../debug.js");

var _index3 = require("../update/index.js");

var _env = require("../env.js");

var _index4 = require("../vdom/index.js");

var _share = require("../share.js");

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

var MyReactFiberInternal = /*#__PURE__*/function (_MyReactInternalType) {
  _inherits(MyReactFiberInternal, _MyReactInternalType);

  var _super = _createSuper(MyReactFiberInternal);

  function MyReactFiberInternal() {
    var _this;

    _classCallCheck(this, MyReactFiberInternal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "__internal_node_diff__", {
      // for diff
      __diffMount__: false,

      /**
       * @type MyReactFiberNode
       */
      __diffPrevRender__: null,

      /**
       * @type MyReactFiberNode[]
       */
      __renderedChildren__: [],
      // for log
      __renderedCount__: 1,
      // for render
      __renderDynamic__: false,
      // for diff core
      __updateRender__: false,
      __updateTimeStep__: Date.now(),
      __lastUpdateTimeStep__: null,
      __newestFiber__: (0, _share.createRef)(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "__internal_node_state__", {
      __pendingMount__: false,
      __pendingUpdate__: false,
      __pendingUnmount__: false,
      __pendingPosition__: false
    });

    _defineProperty(_assertThisInitialized(_this), "nameSpace", void 0);

    _defineProperty(_assertThisInitialized(_this), "dom", void 0);

    _defineProperty(_assertThisInitialized(_this), "__internal_event_state__", {});

    _defineProperty(_assertThisInitialized(_this), "__internal_context_map__", {
      /**
       * @type MyReactInstance[]
       */
      __dependence__: [],
      __contextMap__: {}
    });

    _defineProperty(_assertThisInitialized(_this), "__internal_suspense_state__", {
      __fallback__: null
    });

    return _this;
  }

  _createClass(MyReactFiberInternal, [{
    key: "__diffMount__",
    get: function get() {
      return this.__internal_node_diff__.__diffMount__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__diffMount__ = v;
    }
  }, {
    key: "__diffPrevRender__",
    get: function get() {
      return this.__internal_node_diff__.__diffPrevRender__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__diffPrevRender__ = v;
    }
  }, {
    key: "__updateRender__",
    get: function get() {
      return this.__internal_node_diff__.__updateRender__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__updateRender__ = v;
    }
  }, {
    key: "__renderedCount__",
    get: function get() {
      return this.__internal_node_diff__.__renderedCount__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderedCount__ = v;
    }
  }, {
    key: "__renderedChildren__",
    get: function get() {
      return this.__internal_node_diff__.__renderedChildren__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderedChildren__ = v;
    }
  }, {
    key: "__renderDynamic__",
    get: function get() {
      return this.__internal_node_diff__.__renderDynamic__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__renderDynamic__ = v;
    }
  }, {
    key: "__newestFiber__",
    get: function get() {
      return this.__internal_node_diff__.__newestFiber__;
    },
    set: function set(v) {
      this.__internal_node_diff__.__newestFiber__ = v;
    }
  }, {
    key: "__pendingMount__",
    get: function get() {
      return this.__internal_node_state__.__pendingMount__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingMount__ = v;
    }
  }, {
    key: "__pendingUpdate__",
    get: function get() {
      return this.__internal_node_state__.__pendingUpdate__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingUpdate__ = v;
    }
  }, {
    key: "__pendingPosition__",
    get: function get() {
      return this.__internal_node_state__.__pendingPosition__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingPosition__ = v;
    }
  }, {
    key: "__pendingUnmount__",
    get: function get() {
      return this.__internal_node_state__.__pendingUnmount__;
    },
    set: function set(v) {
      this.__internal_node_state__.__pendingUnmount__ = v;
    }
    /**
     * @type string
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(event, cb, isCapture) {
      var _this2 = this;

      if (_env.enableEventSystem.current) {
        var eventName = "".concat(event, "_").concat(isCapture);

        if (this.__internal_event_state__[eventName]) {
          this.__internal_event_state__[eventName].cb.push(cb);
        } else {
          var handler = function handler() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var e = args[0];
            e.nativeEvent = e;
            (0, _debug.safeCallWithFiber)({
              action: function action() {
                return handler.cb.forEach(function (cb) {
                  return typeof cb === "function" && cb.call.apply(cb, [null].concat(args));
                });
              },
              fiber: _this2
            });

            if (_env.enableControlComponent.current) {
              // TODO more
              if (_this2.__vdom__.type === "input" && event === "input") {
                var _this2$memoProps;

                if (((_this2$memoProps = _this2.memoProps) === null || _this2$memoProps === void 0 ? void 0 : _this2$memoProps.value) !== undefined) {
                  _this2.dom["value"] = _this2.memoProps.value;
                }
              }
            }
          };

          handler.cb = [cb];
          this.__internal_event_state__[eventName] = handler;
          this.dom.addEventListener(event, handler, isCapture);
        }
      } else {
        this.dom.addEventListener(event, cb, isCapture);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, cb, isCapture) {
      if (_env.enableEventSystem.current) {
        var eventName = "".concat(event, "_").concat(isCapture);
        if (!this.__internal_event_state__[eventName]) return;
        this.__internal_event_state__[eventName].cb = this.__internal_event_state__[eventName].cb.filter(function (_cb) {
          return _cb !== cb || typeof _cb !== "function";
        });
      } else {
        this.dom.removeEventListener(event, cb, isCapture);
      }
    }
  }, {
    key: "__dependence__",
    get: function get() {
      return this.__internal_context_map__.__dependence__;
    },
    set: function set(v) {
      this.__internal_context_map__.__dependence__ = v;
    }
  }, {
    key: "__contextMap__",
    get: function get() {
      return this.__internal_context_map__.__contextMap__;
    },
    set: function set(v) {
      this.__internal_context_map__.__contextMap__ = v;
    }
    /**
     *
     * @param {MyReactInstance} node
     */

  }, {
    key: "addDependence",
    value: function addDependence(node) {
      var dependence = this.__dependence__;

      if (dependence.every(function (n) {
        return n !== node;
      })) {
        dependence.push(node);
      }
    }
    /**
     *
     * @param {MyReactInstance} node
     */

  }, {
    key: "removeDependence",
    value: function removeDependence(node) {
      var dependence = this.__dependence__;
      this.__dependence__ = dependence.filter(function (n) {
        return n !== node;
      });
    }
  }, {
    key: "__fallback__",
    get: function get() {
      return this.__internal_suspense_state__.__fallback__;
    },
    set: function set(v) {
      this.__internal_suspense_state__.__fallback__ = v;
    }
  }]);

  return MyReactFiberInternal;
}(_share.MyReactInternalType);

var MyReactFiberNode = /*#__PURE__*/function (_MyReactFiberInternal) {
  _inherits(MyReactFiberNode, _MyReactFiberInternal);

  var _super2 = _createSuper(MyReactFiberNode);

  /**
   * @type number
   */

  /**
   * @type 'PLACEMENT' | 'UPDATE' | 'POSITION'
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
   * @type MyReactVDom
   */

  /**
   * @type MyReactVDom
   */
  // used for update dom
  function MyReactFiberNode(key, deepIndex, fiberParent, fiberAlternate, effect) {
    var _this3;

    _classCallCheck(this, MyReactFiberNode);

    _this3 = _super2.call(this);

    _defineProperty(_assertThisInitialized(_this3), "key", void 0);

    _defineProperty(_assertThisInitialized(_this3), "deepIndex", void 0);

    _defineProperty(_assertThisInitialized(_this3), "effect", void 0);

    _defineProperty(_assertThisInitialized(_this3), "mount", true);

    _defineProperty(_assertThisInitialized(_this3), "initial", true);

    _defineProperty(_assertThisInitialized(_this3), "memoProps", null);

    _defineProperty(_assertThisInitialized(_this3), "memoState", null);

    _defineProperty(_assertThisInitialized(_this3), "children", []);

    _defineProperty(_assertThisInitialized(_this3), "child", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberChildHead", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberChildFoot", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberParent", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberSibling", null);

    _defineProperty(_assertThisInitialized(_this3), "fiberAlternate", null);

    _defineProperty(_assertThisInitialized(_this3), "hookHead", void 0);

    _defineProperty(_assertThisInitialized(_this3), "hookFoot", void 0);

    _defineProperty(_assertThisInitialized(_this3), "hookList", []);

    _defineProperty(_assertThisInitialized(_this3), "instance", null);

    _defineProperty(_assertThisInitialized(_this3), "__vdom__", null);

    _defineProperty(_assertThisInitialized(_this3), "__preRenderVdom__", null);

    _defineProperty(_assertThisInitialized(_this3), "__needUpdate__", false);

    _this3.key = key;
    _this3.deepIndex = deepIndex;
    _this3.fiberParent = fiberParent;
    _this3.fiberAlternate = fiberAlternate;
    _this3.effect = effect;
    return _this3;
  }
  /**
   *
   * @param {MyReactFiberNode} childFiber
   */


  _createClass(MyReactFiberNode, [{
    key: "addChild",
    value: function addChild(childFiber) {
      if (_env.enableAllCheck.current) {
        if (this.children.some(function (f) {
          return f === childFiber;
        })) {
          throw new Error("already add child");
        }
      }

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
  }, {
    key: "initialParent",
    value: function initialParent() {
      if (this.fiberParent) {
        this.fiberParent.addChild(this);

        if (this.fiberParent.nameSpace) {
          this.nameSpace = this.fiberParent.nameSpace;
        } // inherit suspense fallback


        if (this.fiberParent.__isSuspense__) {
          this.__fallback__ = this.fiberParent.memoProps.fallback;
        } else {
          this.__fallback__ = this.fiberParent.__fallback__;
        }
      }
    }
  }, {
    key: "initialContext",
    value: function initialContext() {
      if (this.fiberParent) {
        // get ContextMap from parent fiber
        var contextMap = Object.assign({}, this.fiberParent.__contextMap__, this.__contextMap__); // after vdom install

        if (this.__isContextProvider__) {
          // get context id;
          var contextObject = this.__vdom__.type.Context;
          var contextId = contextObject.id;
          contextMap[contextId] = this; // if (contextMap[contextId]) {
          //   contextMap[contextId].current = this;
          // } else {
          //   contextMap[contextId] = createRef(this);
          // }
        }

        this.__contextMap__ = contextMap;
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
      this.initialParent();
    }
  }, {
    key: "updateFromAlternate",
    value: function updateFromAlternate() {
      if (this.fiberAlternate) {
        var fiberAlternate = this.fiberAlternate;

        if (fiberAlternate !== this) {
          // inherit
          this.dom = fiberAlternate.dom;
          this.hookHead = fiberAlternate.hookHead;
          this.hookFoot = fiberAlternate.hookFoot;
          this.instance = fiberAlternate.instance;
          this.hookList = fiberAlternate.hookList.slice(0);
          this.__preRenderVdom__ = fiberAlternate.__preRenderVdom__;
          this.__dependence__ = fiberAlternate.__dependence__.slice(0);
          this.__newestFiber__ = fiberAlternate.__newestFiber__;
          this.__renderedChildren__ = fiberAlternate.__renderedChildren__.slice(0);
          this.__internal_node_type__ = Object.assign({}, fiberAlternate.__internal_node_type__);
          this.__internal_event_state__ = Object.assign({}, fiberAlternate.__internal_event_state__);
          this.__internal_suspense_state__ = Object.assign({}, fiberAlternate.__internal_suspense_state__); // update
          // fiberAlternate.dom = null;
          // fiberAlternate.hookList = [];
          // fiberAlternate.hookHead = null;
          // fiberAlternate.hookFoot = null;
          // fiberAlternate.instance = null;

          fiberAlternate.mount = false;
          fiberAlternate.effect = null;
          fiberAlternate.fiberAlternate = null;
          fiberAlternate.__needUpdate__ = false; // fiberAlternate.__internal_node_type__ = null;
          // fiberAlternate.__internal_node_diff__ = null;
          // fiberAlternate.__internal_event_state__ = null;
        }

        this.__updateRender__ = true;
        this.__newestFiber__.current = this;
        this.__renderedCount__ = fiberAlternate.__renderedCount__ + 1;
      }
    }
  }, {
    key: "beforeTransform",
    value: function beforeTransform() {
      this.child = null;
      this.children = [];
      this.fiberChildHead = null;
      this.fiberChildFoot = null;
      this.__renderedChildren__ = [];
    }
  }, {
    key: "afterTransform",
    value: function afterTransform() {
      this.initial = false;
      this.fiberAlternate = null;
      this.__needUpdate__ = false;
      this.__ignoreHook__ = false;
    }
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "addHook",
    value: function addHook(hookNode) {
      if (_env.enableAllCheck.current) {
        if (this.hookList.some(function (h) {
          return h === hookNode;
        })) {
          throw new Error("already add hook");
        }
      }

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
    /**
     *
     * @param {MyReactHookNode} hookNode
     */

  }, {
    key: "checkHook",
    value: function checkHook(hookNode) {
      if (_env.enableAllCheck.current) {
        if (hookNode.hookType === "useMemo" || hookNode.hookType === "useEffect" || hookNode.hookType === "useCallback" || hookNode.hookType === "useLayoutEffect") {
          if (typeof hookNode.value !== "function") {
            throw new Error("".concat(this.hookType, " initial error"));
          }
        }

        if (hookNode.hookType === "useContext") {
          if (_typeof(hookNode.value) !== "object" || hookNode.value === null) {
            throw new Error("".concat(this.hookType, " initial error"));
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.mount) {
        (0, _index3.pendingUpdate)(this);
      } else {
        (0, _debug.warning)({
          message: "can not update unmount fiber",
          fiber: this
        });
      }
    }
  }, {
    key: "updateLazy",
    value: function updateLazy() {
      if (this.mount) {
        // TODO need improve
        this.__ignoreHook__ = true;
        (0, _index3.pendingUpdate)(this);
      }
    }
  }, {
    key: "prepareUpdate",
    value: function prepareUpdate() {
      this.__needUpdate__ = true;
      this.__updateRender__ = true;
      this.fiberAlternate = this;
    }
  }, {
    key: "memoChildren",
    value: function memoChildren() {
      var _this4 = this;

      var fiberAlternate = this.fiberAlternate;

      if (fiberAlternate !== this) {
        this.child = fiberAlternate.child;
        this.children = fiberAlternate.children;
        this.fiberChildHead = fiberAlternate.fiberChildHead;
        this.fiberChildFoot = fiberAlternate.fiberChildFoot;
        this.__renderedChildren__ = fiberAlternate.__renderedChildren__;
        this.children.forEach(function (child) {
          return child.fiberParent = _this4;
        });
      }
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "installVDom",
    value: function installVDom(vdom) {
      this.__vdom__ = vdom;
      this.key = vdom === null || vdom === void 0 ? void 0 : vdom.key;
      this.memoProps = vdom === null || vdom === void 0 ? void 0 : vdom.props; // TODO need improve

      if ((vdom === null || vdom === void 0 ? void 0 : vdom.type) === "svg") this.nameSpace = "http://www.w3.org/2000/svg";
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "checkVDom",
    value: function checkVDom(vdom) {
      if (_env.enableAllCheck.current) {
        if ((0, _index4.isValidElement)(vdom)) {
          // TODO
          if (!vdom.__validType__) {
            if (this.__isContextConsumer__) {
              if (typeof vdom.children !== "function") {
                throw new Error("Consumer's children must as a function, got ".concat(vdom.children));
              }
            }

            if (this.__isPortal__) {
              if (!vdom.props.container) {
                throw new Error("createPortal() need a dom container");
              }
            }

            if (this.__isMemo__ || this.__isForwardRef__) {
              if (typeof vdom.type.render !== "function") {
                if (_typeof(vdom.type.render) !== "object" || !vdom.type.render.type) {
                  throw new Error("invalid render type, ".concat(vdom.type));
                }
              }
            }

            if (this.__isForwardRef__) {
              var _vdom$type$render$pro;

              if (typeof vdom.type.render === "function" && (_vdom$type$render$pro = vdom.type.render.prototype) !== null && _vdom$type$render$pro !== void 0 && _vdom$type$render$pro.isMyReactComponent) {
                throw new Error("forwardRef need a function component, but get a class component");
              }
            }

            if (this.__isSuspense__) {
              if (this.__vdom__.children === undefined || this.__vdom__.children === null) {
                throw new Error("Suspense component need a children to render");
              }
            }

            if (vdom.ref) {
              if (_typeof(vdom.ref) !== "object" && typeof vdom.ref !== "function") {
                throw new Error("unSupport ref usage");
              }
            }

            if (_typeof(vdom.type) === "object") {
              var _vdom$type;

              if (!((_vdom$type = vdom.type) !== null && _vdom$type !== void 0 && _vdom$type.type)) {
                throw new Error("invalid element type");
              }
            }

            if (vdom.key && typeof vdom.key !== "string" && typeof vdom.key !== "number") {
              throw new Error("invalid key props");
            }

            vdom.__validType__ = true;
          }
        }
      }
    }
  }, {
    key: "initialType",
    value: function initialType() {
      var vdom = this.__vdom__;

      if ((0, _index4.isValidElement)(vdom)) {
        var nodeType = (0, _index4.getTypeFromVDom)(vdom);
        this.setNodeType(nodeType);
        return;
      }

      if (_typeof(vdom) === "object") {
        this.setNodeType({
          __isEmptyNode__: true
        });
        return;
      }

      this.setNodeType({
        __isTextNode__: true
      });
    }
  }, {
    key: "resetEffect",
    value: function resetEffect() {
      if (!this.__isPlainNode__ && !this.__isTextNode__) {
        this.effect = null;
      }
    }
  }, {
    key: "resetPortal",
    value: function resetPortal() {
      if (this.__isPortal__) {
        this.dom = this.__vdom__.props.container;
      }
    }
    /**
     *
     * @param {MyReactVDom} vdom
     */

  }, {
    key: "checkIsSameType",
    value: function checkIsSameType(vdom) {
      if ((0, _index4.isValidElement)(vdom)) {
        var nodeType = (0, _index4.getTypeFromVDom)(vdom);
        var result = this.isSameType(nodeType);

        if (result) {
          if (this.__isDynamicNode__ || this.__isPlainNode__) {
            return this.__vdom__.type === vdom.type;
          }

          if (this.__isObjectNode__) {
            return this.__vdom__.type.type === vdom.type.type;
          }

          return true;
        } else {
          return false;
        }
      }

      if (_typeof(vdom) === "object") return this.__isEmptyNode__;
      return this.__isTextNode__;
    }
  }, {
    key: "applyRef",
    value: function applyRef() {
      if (this.__isPlainNode__) {
        if (this.dom) {
          var ref = this.__vdom__.ref;

          if (_typeof(ref) === "object" && ref !== null) {
            ref.current = this.dom;
          } else if (typeof ref === "function") {
            ref.call(null, this.dom);
          }
        } else {
          throw new Error("not have a dom for plainNode");
        }
      }
    } // after dom update

  }, {
    key: "applyVDom",
    value: function applyVDom() {
      this.__preRenderVdom__ = this.__isTextNode__ ? this.__vdom__ : Object.assign({}, this.__vdom__);
    }
    /**
     *
     * @param {MyReactInstance & MyReactComponent} instance
     */

  }, {
    key: "installInstance",
    value: function installInstance(instance) {
      this.instance = instance;
    }
    /**
     *
     * @param {MyReactInstance & MyReactComponent} instance
     */

  }, {
    key: "checkInstance",
    value: function checkInstance(instance) {
      if (_env.enableAllCheck.current) {
        // todo
        _share.COMPONENT_METHOD.forEach(function (key) {
          if (instance[key] && typeof instance[key] !== "function") {
            throw new Error("current component method ".concat(key, " has wrong type"));
          }
        });
      }
    }
  }]);

  return MyReactFiberNode;
}(MyReactFiberInternal);

exports.MyReactFiberNode = MyReactFiberNode;