"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyReactInstance = void 0;

var _fiber = require("./fiber.js");

var _fiberTool = require("./fiberTool.js");

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
      var providerFiber = (0, _fiberTool.getContextFiber)(this.__fiber__, ContextObject);
      this.updateDependence(null, providerFiber);
      (_this$__context__ = this.__context__) === null || _this$__context__ === void 0 ? void 0 : _this$__context__.addListener(this);
      return providerFiber;
    }
  }]);

  return MyReactInstance;
}();

exports.MyReactInstance = MyReactInstance;