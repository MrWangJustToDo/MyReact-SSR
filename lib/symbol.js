"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Suspense = exports.Provider = exports.Portal = exports.Memo = exports.Lazy = exports.Fragment = exports.ForwardRef = exports.Context = exports.Consumer = void 0;
var Memo = Symbol["for"]("Memo");
exports.Memo = Memo;
var ForwardRef = Symbol["for"]("ForwardRef");
exports.ForwardRef = ForwardRef;
var Portal = Symbol["for"]("Portal");
exports.Portal = Portal;
var Fragment = Symbol["for"]("Fragment");
exports.Fragment = Fragment;
var Context = Symbol["for"]("Context");
exports.Context = Context;
var Provider = Symbol["for"]("Context.Provider");
exports.Provider = Provider;
var Consumer = Symbol["for"]("Context.Consumer");
exports.Consumer = Consumer;
var Lazy = Symbol["for"]("Dynamic.Lazy");
exports.Lazy = Lazy;
var Suspense = Symbol["for"]("Dynamic.Suspense");
exports.Suspense = Suspense;