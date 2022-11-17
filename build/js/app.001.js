(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/tiny-emitter/index.js
  var require_tiny_emitter = __commonJS({
    "node_modules/tiny-emitter/index.js"(exports, module) {
      function E() {
      }
      E.prototype = {
        on: function(name, callback, ctx) {
          var e = this.e || (this.e = {});
          (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx
          });
          return this;
        },
        once: function(name, callback, ctx) {
          var self = this;
          function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
          }
          ;
          listener._ = callback;
          return this.on(name, listener, ctx);
        },
        emit: function(name) {
          var data = [].slice.call(arguments, 1);
          var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
          var i = 0;
          var len = evtArr.length;
          for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
          }
          return this;
        },
        off: function(name, callback) {
          var e = this.e || (this.e = {});
          var evts = e[name];
          var liveEvents = [];
          if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
              if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                liveEvents.push(evts[i]);
            }
          }
          liveEvents.length ? e[name] = liveEvents : delete e[name];
          return this;
        }
      };
      module.exports = E;
      module.exports.TinyEmitter = E;
    }
  });

  // ../../../../../../../node_modules/events/events.js
  var require_events = __commonJS({
    "../../../../../../../node_modules/events/events.js"(exports, module) {
      "use strict";
      var R2 = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R2 && typeof R2.ownKeys === "function") {
        ReflectOwnKeys = R2.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy7 = new Array(n);
        for (var i = 0; i < n; ++i)
          copy7[i] = arr[i];
        return copy7;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/ogl/src/math/functions/Vec3Func.js
  function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2];
    let bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  function transformMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function scaleRotateMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    let x = a[0], y = a[1], z = a[2];
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    let uvx = qy * z - qz * y;
    let uvy = qz * x - qx * z;
    let uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy;
    let uuvy = qz * uvx - qx * uvz;
    let uuvz = qx * uvy - qy * uvx;
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  var angle = function() {
    const tempA = [0, 0, 0];
    const tempB = [0, 0, 0];
    return function(a, b) {
      copy(tempA, a);
      copy(tempB, b);
      normalize(tempA, tempA);
      normalize(tempB, tempB);
      let cosine = dot(tempA, tempB);
      if (cosine > 1) {
        return 0;
      } else if (cosine < -1) {
        return Math.PI;
      } else {
        return Math.acos(cosine);
      }
    };
  }();
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  // node_modules/ogl/src/math/Vec3.js
  var Vec3 = class extends Array {
    constructor(x = 0, y = x, z = x) {
      super(x, y, z);
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(v) {
      this[0] = v;
    }
    set y(v) {
      this[1] = v;
    }
    set z(v) {
      this[2] = v;
    }
    set(x, y = x, z = x) {
      if (x.length)
        return this.copy(x);
      set(this, x, y, z);
      return this;
    }
    copy(v) {
      copy(this, v);
      return this;
    }
    add(va, vb) {
      if (vb)
        add(this, va, vb);
      else
        add(this, this, va);
      return this;
    }
    sub(va, vb) {
      if (vb)
        subtract(this, va, vb);
      else
        subtract(this, this, va);
      return this;
    }
    multiply(v) {
      if (v.length)
        multiply(this, this, v);
      else
        scale(this, this, v);
      return this;
    }
    divide(v) {
      if (v.length)
        divide(this, this, v);
      else
        scale(this, this, 1 / v);
      return this;
    }
    inverse(v = this) {
      inverse(this, v);
      return this;
    }
    len() {
      return length(this);
    }
    distance(v) {
      if (v)
        return distance(this, v);
      else
        return length(this);
    }
    squaredLen() {
      return squaredLength(this);
    }
    squaredDistance(v) {
      if (v)
        return squaredDistance(this, v);
      else
        return squaredLength(this);
    }
    negate(v = this) {
      negate(this, v);
      return this;
    }
    cross(va, vb) {
      if (vb)
        cross(this, va, vb);
      else
        cross(this, this, va);
      return this;
    }
    scale(v) {
      scale(this, this, v);
      return this;
    }
    normalize() {
      normalize(this, this);
      return this;
    }
    dot(v) {
      return dot(this, v);
    }
    equals(v) {
      return exactEquals(this, v);
    }
    applyMatrix3(mat3) {
      transformMat3(this, this, mat3);
      return this;
    }
    applyMatrix4(mat4) {
      transformMat4(this, this, mat4);
      return this;
    }
    scaleRotateMatrix4(mat4) {
      scaleRotateMat4(this, this, mat4);
      return this;
    }
    applyQuaternion(q) {
      transformQuat(this, this, q);
      return this;
    }
    angle(v) {
      return angle(this, v);
    }
    lerp(v, t) {
      lerp(this, this, v, t);
      return this;
    }
    clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
    fromArray(a, o = 0) {
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      return this;
    }
    toArray(a = [], o = 0) {
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
    transformDirection(mat4) {
      const x = this[0];
      const y = this[1];
      const z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  };

  // node_modules/ogl/src/core/Geometry.js
  var tempVec3 = new Vec3();
  var ID = 1;
  var ATTR_ID = 1;
  var isBoundsWarned = false;
  var Geometry = class {
    constructor(gl, attributes = {}) {
      if (!gl.canvas)
        console.error("gl not passed as first argument to Geometry");
      this.gl = gl;
      this.attributes = attributes;
      this.id = ID++;
      this.VAOs = {};
      this.drawRange = { start: 0, count: 0 };
      this.instancedCount = 0;
      this.gl.renderer.bindVertexArray(null);
      this.gl.renderer.currentGeometry = null;
      this.glState = this.gl.renderer.state;
      for (let key in attributes) {
        this.addAttribute(key, attributes[key]);
      }
    }
    addAttribute(key, attr) {
      this.attributes[key] = attr;
      attr.id = ATTR_ID++;
      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT);
      attr.target = key === "index" ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;
      attr.usage = attr.usage || this.gl.STATIC_DRAW;
      if (!attr.buffer) {
        this.updateAttribute(attr);
      }
      if (attr.divisor) {
        this.isInstanced = true;
        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn("geometry has multiple instanced buffers of different length");
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }
        this.instancedCount = attr.count * attr.divisor;
      } else if (key === "index") {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
    updateAttribute(attr) {
      const isNewBuffer = !attr.buffer;
      if (isNewBuffer)
        attr.buffer = this.gl.createBuffer();
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }
      if (isNewBuffer) {
        this.gl.bufferData(attr.target, attr.data, attr.usage);
      } else {
        this.gl.bufferSubData(attr.target, 0, attr.data);
      }
      attr.needsUpdate = false;
    }
    setIndex(value) {
      this.addAttribute("index", value);
    }
    setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
    setInstancedCount(value) {
      this.instancedCount = value;
    }
    createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
    bindAttributes(program) {
      program.attributeLocations.forEach((location, { name, type }) => {
        if (!this.attributes[name]) {
          console.warn(`active attribute ${name} not being supplied`);
          return;
        }
        const attr = this.attributes[name];
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
        let numLoc = 1;
        if (type === 35674)
          numLoc = 2;
        if (type === 35675)
          numLoc = 3;
        if (type === 35676)
          numLoc = 4;
        const size = attr.size / numLoc;
        const stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
        const offset = numLoc === 1 ? 0 : numLoc * numLoc;
        for (let i = 0; i < numLoc; i++) {
          this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
          this.gl.enableVertexAttribArray(location + i);
          this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
        }
      });
      if (this.attributes.index)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
    draw({ program, mode = this.gl.TRIANGLES }) {
      if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
        if (!this.VAOs[program.attributeOrder])
          this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
      }
      program.attributeLocations.forEach((location, { name }) => {
        const attr = this.attributes[name];
        if (attr.needsUpdate)
          this.updateAttribute(attr);
      });
      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(
            mode,
            this.drawRange.count,
            this.attributes.index.type,
            this.attributes.index.offset + this.drawRange.start * 2,
            this.instancedCount
          );
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
    getPosition() {
      const attr = this.attributes.position;
      if (attr.data)
        return attr;
      if (isBoundsWarned)
        return;
      console.warn("No position buffer data found to compute bounds");
      return isBoundsWarned = true;
    }
    computeBoundingBox(attr) {
      if (!attr)
        attr = this.getPosition();
      const array = attr.data;
      const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;
      if (!this.bounds) {
        this.bounds = {
          min: new Vec3(),
          max: new Vec3(),
          center: new Vec3(),
          scale: new Vec3(),
          radius: Infinity
        };
      }
      const min = this.bounds.min;
      const max = this.bounds.max;
      const center = this.bounds.center;
      const scale6 = this.bounds.scale;
      min.set(Infinity);
      max.set(-Infinity);
      for (let i = 0, l = array.length; i < l; i += stride) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }
      scale6.sub(max, min);
      center.add(min, max).divide(2);
    }
    computeBoundingSphere(attr) {
      if (!attr)
        attr = this.getPosition();
      const array = attr.data;
      const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;
      if (!this.bounds)
        this.computeBoundingBox(attr);
      let maxRadiusSq = 0;
      for (let i = 0, l = array.length; i < l; i += stride) {
        tempVec3.fromArray(array, i);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }
      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
    remove() {
      for (let key in this.VAOs) {
        this.gl.renderer.deleteVertexArray(this.VAOs[key]);
        delete this.VAOs[key];
      }
      for (let key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  };

  // node_modules/ogl/src/core/Program.js
  var ID2 = 1;
  var arrayCacheF32 = {};
  var Program = class {
    constructor(gl, {
      vertex,
      fragment,
      uniforms = {},
      transparent = false,
      cullFace = gl.BACK,
      frontFace = gl.CCW,
      depthTest = true,
      depthWrite = true,
      depthFunc = gl.LESS
    } = {}) {
      if (!gl.canvas)
        console.error("gl not passed as fist argument to Program");
      this.gl = gl;
      this.uniforms = uniforms;
      this.id = ID2++;
      if (!vertex)
        console.warn("vertex shader not supplied");
      if (!fragment)
        console.warn("fragment shader not supplied");
      this.transparent = transparent;
      this.cullFace = cullFace;
      this.frontFace = frontFace;
      this.depthTest = depthTest;
      this.depthWrite = depthWrite;
      this.depthFunc = depthFunc;
      this.blendFunc = {};
      this.blendEquation = {};
      if (this.transparent && !this.blendFunc.src) {
        if (this.gl.renderer.premultipliedAlpha)
          this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        else
          this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      }
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertex);
      gl.compileShader(vertexShader);
      if (gl.getShaderInfoLog(vertexShader) !== "") {
        console.warn(`${gl.getShaderInfoLog(vertexShader)}
Vertex Shader
${addLineNumbers(vertex)}`);
      }
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragment);
      gl.compileShader(fragmentShader);
      if (gl.getShaderInfoLog(fragmentShader) !== "") {
        console.warn(`${gl.getShaderInfoLog(fragmentShader)}
Fragment Shader
${addLineNumbers(fragment)}`);
      }
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        return console.warn(gl.getProgramInfoLog(this.program));
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      this.uniformLocations = /* @__PURE__ */ new Map();
      let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
      for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
        let uniform = gl.getActiveUniform(this.program, uIndex);
        this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));
        const split = uniform.name.match(/(\w+)/g);
        uniform.uniformName = split[0];
        if (split.length === 3) {
          uniform.isStructArray = true;
          uniform.structIndex = Number(split[1]);
          uniform.structProperty = split[2];
        } else if (split.length === 2 && isNaN(Number(split[1]))) {
          uniform.isStruct = true;
          uniform.structProperty = split[1];
        }
      }
      this.attributeLocations = /* @__PURE__ */ new Map();
      const locations = [];
      const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
      for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
        const attribute = gl.getActiveAttrib(this.program, aIndex);
        const location = gl.getAttribLocation(this.program, attribute.name);
        if (location === -1)
          continue;
        locations[location] = attribute.name;
        this.attributeLocations.set(attribute, location);
      }
      this.attributeOrder = locations.join("");
    }
    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src)
        this.transparent = true;
    }
    setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
    applyState() {
      if (this.depthTest)
        this.gl.renderer.enable(this.gl.DEPTH_TEST);
      else
        this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace)
        this.gl.renderer.enable(this.gl.CULL_FACE);
      else
        this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src)
        this.gl.renderer.enable(this.gl.BLEND);
      else
        this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace)
        this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src)
        this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
    use({ flipFaces = false } = {}) {
      let textureUnit = -1;
      const programActive = this.gl.renderer.state.currentProgram === this.id;
      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.state.currentProgram = this.id;
      }
      this.uniformLocations.forEach((location, activeUniform) => {
        let name = activeUniform.uniformName;
        let uniform = this.uniforms[name];
        if (activeUniform.isStruct) {
          uniform = uniform[activeUniform.structProperty];
          name += `.${activeUniform.structProperty}`;
        }
        if (activeUniform.isStructArray) {
          uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
          name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
        }
        if (!uniform) {
          return warn(`Active uniform ${name} has not been supplied`);
        }
        if (uniform && uniform.value === void 0) {
          return warn(`${name} uniform is missing a value parameter`);
        }
        if (uniform.value.texture) {
          textureUnit = textureUnit + 1;
          uniform.value.update(textureUnit);
          return setUniform(this.gl, activeUniform.type, location, textureUnit);
        }
        if (uniform.value.length && uniform.value[0].texture) {
          const textureUnits = [];
          uniform.value.forEach((value) => {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(this.gl, activeUniform.type, location, textureUnits);
        }
        setUniform(this.gl, activeUniform.type, location, uniform.value);
      });
      this.applyState();
      if (flipFaces)
        this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
    remove() {
      this.gl.deleteProgram(this.program);
    }
  };
  function setUniform(gl, type, location, value) {
    value = value.length ? flatten(value) : value;
    const setValue = gl.renderer.state.uniformLocations.get(location);
    if (value.length) {
      if (setValue === void 0 || setValue.length !== value.length) {
        gl.renderer.state.uniformLocations.set(location, value.slice(0));
      } else {
        if (arraysEqual(setValue, value))
          return;
        setValue.set ? setValue.set(value) : setArray(setValue, value);
        gl.renderer.state.uniformLocations.set(location, setValue);
      }
    } else {
      if (setValue === value)
        return;
      gl.renderer.state.uniformLocations.set(location, value);
    }
    switch (type) {
      case 5126:
        return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
      case 35664:
        return gl.uniform2fv(location, value);
      case 35665:
        return gl.uniform3fv(location, value);
      case 35666:
        return gl.uniform4fv(location, value);
      case 35670:
      case 5124:
      case 35678:
      case 35680:
        return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
      case 35671:
      case 35667:
        return gl.uniform2iv(location, value);
      case 35672:
      case 35668:
        return gl.uniform3iv(location, value);
      case 35673:
      case 35669:
        return gl.uniform4iv(location, value);
      case 35674:
        return gl.uniformMatrix2fv(location, false, value);
      case 35675:
        return gl.uniformMatrix3fv(location, false, value);
      case 35676:
        return gl.uniformMatrix4fv(location, false, value);
    }
  }
  function addLineNumbers(string) {
    let lines = string.split("\n");
    for (let i = 0; i < lines.length; i++) {
      lines[i] = i + 1 + ": " + lines[i];
    }
    return lines.join("\n");
  }
  function flatten(a) {
    const arrayLen = a.length;
    const valueLen = a[0].length;
    if (valueLen === void 0)
      return a;
    const length4 = arrayLen * valueLen;
    let value = arrayCacheF32[length4];
    if (!value)
      arrayCacheF32[length4] = value = new Float32Array(length4);
    for (let i = 0; i < arrayLen; i++)
      value.set(a[i], i * valueLen);
    return value;
  }
  function arraysEqual(a, b) {
    if (a.length !== b.length)
      return false;
    for (let i = 0, l = a.length; i < l; i++) {
      if (a[i] !== b[i])
        return false;
    }
    return true;
  }
  function setArray(a, b) {
    for (let i = 0, l = a.length; i < l; i++) {
      a[i] = b[i];
    }
  }
  var warnCount = 0;
  function warn(message) {
    if (warnCount > 100)
      return;
    console.warn(message);
    warnCount++;
    if (warnCount > 100)
      console.warn("More than 100 program warnings - stopping logs.");
  }

  // node_modules/ogl/src/core/Renderer.js
  var tempVec32 = new Vec3();
  var ID3 = 1;
  var Renderer = class {
    constructor({
      canvas = document.createElement("canvas"),
      width = 300,
      height = 150,
      dpr = 1,
      alpha = false,
      depth = true,
      stencil = false,
      antialias = false,
      premultipliedAlpha = false,
      preserveDrawingBuffer = false,
      powerPreference = "default",
      autoClear = true,
      webgl = 2
    } = {}) {
      const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
      this.dpr = dpr;
      this.alpha = alpha;
      this.color = true;
      this.depth = depth;
      this.stencil = stencil;
      this.premultipliedAlpha = premultipliedAlpha;
      this.autoClear = autoClear;
      this.id = ID3++;
      if (webgl === 2)
        this.gl = canvas.getContext("webgl2", attributes);
      this.isWebgl2 = !!this.gl;
      if (!this.gl)
        this.gl = canvas.getContext("webgl", attributes);
      if (!this.gl)
        console.error("unable to create webgl context");
      this.gl.renderer = this;
      this.setSize(width, height);
      this.state = {};
      this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
      this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
      this.state.cullFace = null;
      this.state.frontFace = this.gl.CCW;
      this.state.depthMask = true;
      this.state.depthFunc = this.gl.LESS;
      this.state.premultiplyAlpha = false;
      this.state.flipY = false;
      this.state.unpackAlignment = 4;
      this.state.framebuffer = null;
      this.state.viewport = { x: 0, y: 0, width: null, height: null };
      this.state.textureUnits = [];
      this.state.activeTextureUnit = 0;
      this.state.boundBuffer = null;
      this.state.uniformLocations = /* @__PURE__ */ new Map();
      this.state.currentProgram = null;
      this.extensions = {};
      if (this.isWebgl2) {
        this.getExtension("EXT_color_buffer_float");
        this.getExtension("OES_texture_float_linear");
      } else {
        this.getExtension("OES_texture_float");
        this.getExtension("OES_texture_float_linear");
        this.getExtension("OES_texture_half_float");
        this.getExtension("OES_texture_half_float_linear");
        this.getExtension("OES_element_index_uint");
        this.getExtension("OES_standard_derivatives");
        this.getExtension("EXT_sRGB");
        this.getExtension("WEBGL_depth_texture");
        this.getExtension("WEBGL_draw_buffers");
      }
      this.getExtension("WEBGL_compressed_texture_astc");
      this.getExtension("EXT_texture_compression_bptc");
      this.getExtension("WEBGL_compressed_texture_s3tc");
      this.getExtension("WEBGL_compressed_texture_etc1");
      this.getExtension("WEBGL_compressed_texture_pvrtc");
      this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
      this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE");
      this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE");
      this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE");
      this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES");
      this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES");
      this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES");
      this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL");
      this.parameters = {};
      this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      this.gl.canvas.width = width * this.dpr;
      this.gl.canvas.height = height * this.dpr;
      Object.assign(this.gl.canvas.style, {
        width: width + "px",
        height: height + "px"
      });
    }
    setViewport(width, height, x = 0, y = 0) {
      if (this.state.viewport.width === width && this.state.viewport.height === height)
        return;
      this.state.viewport.width = width;
      this.state.viewport.height = height;
      this.state.viewport.x = x;
      this.state.viewport.y = y;
      this.gl.viewport(x, y, width, height);
    }
    setScissor(width, height, x = 0, y = 0) {
      this.gl.scissor(x, y, width, height);
    }
    enable(id) {
      if (this.state[id] === true)
        return;
      this.gl.enable(id);
      this.state[id] = true;
    }
    disable(id) {
      if (this.state[id] === false)
        return;
      this.gl.disable(id);
      this.state[id] = false;
    }
    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha)
        return;
      this.state.blendFunc.src = src;
      this.state.blendFunc.dst = dst;
      this.state.blendFunc.srcAlpha = srcAlpha;
      this.state.blendFunc.dstAlpha = dstAlpha;
      if (srcAlpha !== void 0)
        this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
      else
        this.gl.blendFunc(src, dst);
    }
    setBlendEquation(modeRGB, modeAlpha) {
      modeRGB = modeRGB || this.gl.FUNC_ADD;
      if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha)
        return;
      this.state.blendEquation.modeRGB = modeRGB;
      this.state.blendEquation.modeAlpha = modeAlpha;
      if (modeAlpha !== void 0)
        this.gl.blendEquationSeparate(modeRGB, modeAlpha);
      else
        this.gl.blendEquation(modeRGB);
    }
    setCullFace(value) {
      if (this.state.cullFace === value)
        return;
      this.state.cullFace = value;
      this.gl.cullFace(value);
    }
    setFrontFace(value) {
      if (this.state.frontFace === value)
        return;
      this.state.frontFace = value;
      this.gl.frontFace(value);
    }
    setDepthMask(value) {
      if (this.state.depthMask === value)
        return;
      this.state.depthMask = value;
      this.gl.depthMask(value);
    }
    setDepthFunc(value) {
      if (this.state.depthFunc === value)
        return;
      this.state.depthFunc = value;
      this.gl.depthFunc(value);
    }
    activeTexture(value) {
      if (this.state.activeTextureUnit === value)
        return;
      this.state.activeTextureUnit = value;
      this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }
    bindFramebuffer({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
      if (this.state.framebuffer === buffer)
        return;
      this.state.framebuffer = buffer;
      this.gl.bindFramebuffer(target, buffer);
    }
    getExtension(extension, webgl2Func, extFunc) {
      if (webgl2Func && this.gl[webgl2Func])
        return this.gl[webgl2Func].bind(this.gl);
      if (!this.extensions[extension]) {
        this.extensions[extension] = this.gl.getExtension(extension);
      }
      if (!webgl2Func)
        return this.extensions[extension];
      if (!this.extensions[extension])
        return null;
      return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }
    sortOpaque(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else if (a.zDepth !== b.zDepth) {
        return a.zDepth - b.zDepth;
      } else {
        return b.id - a.id;
      }
    }
    sortTransparent(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      }
      if (a.zDepth !== b.zDepth) {
        return b.zDepth - a.zDepth;
      } else {
        return b.id - a.id;
      }
    }
    sortUI(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else {
        return b.id - a.id;
      }
    }
    getRenderList({ scene, camera, frustumCull, sort }) {
      let renderList = [];
      if (camera && frustumCull)
        camera.updateFrustum();
      scene.traverse((node) => {
        if (!node.visible)
          return true;
        if (!node.draw)
          return;
        if (frustumCull && node.frustumCulled && camera) {
          if (!camera.frustumIntersectsMesh(node))
            return;
        }
        renderList.push(node);
      });
      if (sort) {
        const opaque = [];
        const transparent = [];
        const ui = [];
        renderList.forEach((node) => {
          if (!node.program.transparent) {
            opaque.push(node);
          } else if (node.program.depthTest) {
            transparent.push(node);
          } else {
            ui.push(node);
          }
          node.zDepth = 0;
          if (node.renderOrder !== 0 || !node.program.depthTest || !camera)
            return;
          node.worldMatrix.getTranslation(tempVec32);
          tempVec32.applyMatrix4(camera.projectionViewMatrix);
          node.zDepth = tempVec32.z;
        });
        opaque.sort(this.sortOpaque);
        transparent.sort(this.sortTransparent);
        ui.sort(this.sortUI);
        renderList = opaque.concat(transparent, ui);
      }
      return renderList;
    }
    render({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
      if (target === null) {
        this.bindFramebuffer();
        this.setViewport(this.width * this.dpr, this.height * this.dpr);
      } else {
        this.bindFramebuffer(target);
        this.setViewport(target.width, target.height);
      }
      if (clear || this.autoClear && clear !== false) {
        if (this.depth && (!target || target.depth)) {
          this.enable(this.gl.DEPTH_TEST);
          this.setDepthMask(true);
        }
        this.gl.clear(
          (this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
        );
      }
      if (update)
        scene.updateMatrixWorld();
      if (camera)
        camera.updateMatrixWorld();
      const renderList = this.getRenderList({ scene, camera, frustumCull, sort });
      renderList.forEach((node) => {
        node.draw({ camera });
      });
    }
  };

  // node_modules/ogl/src/math/functions/Vec4Func.js
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function set2(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function normalize2(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  function dot2(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  // node_modules/ogl/src/math/functions/QuatFunc.js
  function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function multiply2(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function rotateX(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  function rotateY(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  function rotateZ(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  function slerp(out, a, b, t) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    let omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > 1e-6) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function invert(out, a) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let dot5 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot5 ? 1 / dot5 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  function fromMat3(out, m) {
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      let i = 0;
      if (m[4] > m[0])
        i = 1;
      if (m[8] > m[i * 3 + i])
        i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, euler, order = "YXZ") {
    let sx = Math.sin(euler[0] * 0.5);
    let cx = Math.cos(euler[0] * 0.5);
    let sy = Math.sin(euler[1] * 0.5);
    let cy = Math.cos(euler[1] * 0.5);
    let sz = Math.sin(euler[2] * 0.5);
    let cz = Math.cos(euler[2] * 0.5);
    if (order === "XYZ") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "YXZ") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === "ZXY") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "ZYX") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === "YZX") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "XZY") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    }
    return out;
  }
  var copy3 = copy2;
  var set3 = set2;
  var dot3 = dot2;
  var normalize3 = normalize2;

  // node_modules/ogl/src/math/Quat.js
  var Quat = class extends Array {
    constructor(x = 0, y = 0, z = 0, w = 1) {
      super(x, y, z, w);
      this.onChange = () => {
      };
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    get w() {
      return this[3];
    }
    set x(v) {
      this[0] = v;
      this.onChange();
    }
    set y(v) {
      this[1] = v;
      this.onChange();
    }
    set z(v) {
      this[2] = v;
      this.onChange();
    }
    set w(v) {
      this[3] = v;
      this.onChange();
    }
    identity() {
      identity(this);
      this.onChange();
      return this;
    }
    set(x, y, z, w) {
      if (x.length)
        return this.copy(x);
      set3(this, x, y, z, w);
      this.onChange();
      return this;
    }
    rotateX(a) {
      rotateX(this, this, a);
      this.onChange();
      return this;
    }
    rotateY(a) {
      rotateY(this, this, a);
      this.onChange();
      return this;
    }
    rotateZ(a) {
      rotateZ(this, this, a);
      this.onChange();
      return this;
    }
    inverse(q = this) {
      invert(this, q);
      this.onChange();
      return this;
    }
    conjugate(q = this) {
      conjugate(this, q);
      this.onChange();
      return this;
    }
    copy(q) {
      copy3(this, q);
      this.onChange();
      return this;
    }
    normalize(q = this) {
      normalize3(this, q);
      this.onChange();
      return this;
    }
    multiply(qA, qB) {
      if (qB) {
        multiply2(this, qA, qB);
      } else {
        multiply2(this, this, qA);
      }
      this.onChange();
      return this;
    }
    dot(v) {
      return dot3(this, v);
    }
    fromMatrix3(matrix3) {
      fromMat3(this, matrix3);
      this.onChange();
      return this;
    }
    fromEuler(euler) {
      fromEuler(this, euler, euler.order);
      return this;
    }
    fromAxisAngle(axis, a) {
      setAxisAngle(this, axis, a);
      return this;
    }
    slerp(q, t) {
      slerp(this, this, q, t);
      return this;
    }
    fromArray(a, o = 0) {
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      return this;
    }
    toArray(a = [], o = 0) {
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      return a;
    }
  };

  // node_modules/ogl/src/math/functions/Mat4Func.js
  var EPSILON = 1e-6;
  function copy4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function set4(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function invert2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function determinant(a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply3(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale3(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate(out, a, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;
    if (Math.abs(len) < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getMaxScaleOnAxis(mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];
    const x = m11 * m11 + m12 * m12 + m13 * m13;
    const y = m21 * m21 + m22 * m22 + m23 * m23;
    const z = m31 * m31 + m32 * m32 + m33 * m33;
    return Math.sqrt(Math.max(x, y, z));
  }
  var getRotation = function() {
    const temp = [0, 0, 0];
    return function(out, mat) {
      let scaling = temp;
      getScaling(scaling, mat);
      let is1 = 1 / scaling[0];
      let is2 = 1 / scaling[1];
      let is3 = 1 / scaling[2];
      let sm11 = mat[0] * is1;
      let sm12 = mat[1] * is2;
      let sm13 = mat[2] * is3;
      let sm21 = mat[4] * is1;
      let sm22 = mat[5] * is2;
      let sm23 = mat[6] * is3;
      let sm31 = mat[8] * is1;
      let sm32 = mat[9] * is2;
      let sm33 = mat[10] * is3;
      let trace = sm11 + sm22 + sm33;
      let S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    };
  }();
  function fromRotationTranslationScale(out, q, v, s) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    let f = 1 / Math.tan(fovy / 2);
    let nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
  }
  function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len === 0) {
      z2 = 1;
    } else {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }
    let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len === 0) {
      if (upz) {
        upx += 1e-6;
      } else if (upy) {
        upz += 1e-6;
      } else {
        upy += 1e-6;
      }
      x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
    }
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }

  // node_modules/ogl/src/math/Mat4.js
  var Mat4 = class extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
      super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
    get x() {
      return this[12];
    }
    get y() {
      return this[13];
    }
    get z() {
      return this[14];
    }
    get w() {
      return this[15];
    }
    set x(v) {
      this[12] = v;
    }
    set y(v) {
      this[13] = v;
    }
    set z(v) {
      this[14] = v;
    }
    set w(v) {
      this[15] = v;
    }
    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      if (m00.length)
        return this.copy(m00);
      set4(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
    translate(v, m = this) {
      translate(this, m, v);
      return this;
    }
    rotate(v, axis, m = this) {
      rotate(this, m, v, axis);
      return this;
    }
    scale(v, m = this) {
      scale3(this, m, typeof v === "number" ? [v, v, v] : v);
      return this;
    }
    multiply(ma, mb) {
      if (mb) {
        multiply3(this, ma, mb);
      } else {
        multiply3(this, this, ma);
      }
      return this;
    }
    identity() {
      identity2(this);
      return this;
    }
    copy(m) {
      copy4(this, m);
      return this;
    }
    fromPerspective({ fov, aspect, near, far } = {}) {
      perspective(this, fov, aspect, near, far);
      return this;
    }
    fromOrthogonal({ left, right, bottom, top, near, far }) {
      ortho(this, left, right, bottom, top, near, far);
      return this;
    }
    fromQuaternion(q) {
      fromQuat(this, q);
      return this;
    }
    setPosition(v) {
      this.x = v[0];
      this.y = v[1];
      this.z = v[2];
      return this;
    }
    inverse(m = this) {
      invert2(this, m);
      return this;
    }
    compose(q, pos, scale6) {
      fromRotationTranslationScale(this, q, pos, scale6);
      return this;
    }
    getRotation(q) {
      getRotation(q, this);
      return this;
    }
    getTranslation(pos) {
      getTranslation(pos, this);
      return this;
    }
    getScaling(scale6) {
      getScaling(scale6, this);
      return this;
    }
    getMaxScaleOnAxis() {
      return getMaxScaleOnAxis(this);
    }
    lookAt(eye, target, up) {
      targetTo(this, eye, target, up);
      return this;
    }
    determinant() {
      return determinant(this);
    }
    fromArray(a, o = 0) {
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      this[4] = a[o + 4];
      this[5] = a[o + 5];
      this[6] = a[o + 6];
      this[7] = a[o + 7];
      this[8] = a[o + 8];
      this[9] = a[o + 9];
      this[10] = a[o + 10];
      this[11] = a[o + 11];
      this[12] = a[o + 12];
      this[13] = a[o + 13];
      this[14] = a[o + 14];
      this[15] = a[o + 15];
      return this;
    }
    toArray(a = [], o = 0) {
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      a[o + 4] = this[4];
      a[o + 5] = this[5];
      a[o + 6] = this[6];
      a[o + 7] = this[7];
      a[o + 8] = this[8];
      a[o + 9] = this[9];
      a[o + 10] = this[10];
      a[o + 11] = this[11];
      a[o + 12] = this[12];
      a[o + 13] = this[13];
      a[o + 14] = this[14];
      a[o + 15] = this[15];
      return a;
    }
  };

  // node_modules/ogl/src/math/functions/EulerFunc.js
  function fromRotationMatrix(out, m, order = "YXZ") {
    if (order === "XYZ") {
      out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
      if (Math.abs(m[8]) < 0.99999) {
        out[0] = Math.atan2(-m[9], m[10]);
        out[2] = Math.atan2(-m[4], m[0]);
      } else {
        out[0] = Math.atan2(m[6], m[5]);
        out[2] = 0;
      }
    } else if (order === "YXZ") {
      out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
      if (Math.abs(m[9]) < 0.99999) {
        out[1] = Math.atan2(m[8], m[10]);
        out[2] = Math.atan2(m[1], m[5]);
      } else {
        out[1] = Math.atan2(-m[2], m[0]);
        out[2] = 0;
      }
    } else if (order === "ZXY") {
      out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
      if (Math.abs(m[6]) < 0.99999) {
        out[1] = Math.atan2(-m[2], m[10]);
        out[2] = Math.atan2(-m[4], m[5]);
      } else {
        out[1] = 0;
        out[2] = Math.atan2(m[1], m[0]);
      }
    } else if (order === "ZYX") {
      out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
      if (Math.abs(m[2]) < 0.99999) {
        out[0] = Math.atan2(m[6], m[10]);
        out[2] = Math.atan2(m[1], m[0]);
      } else {
        out[0] = 0;
        out[2] = Math.atan2(-m[4], m[5]);
      }
    } else if (order === "YZX") {
      out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
      if (Math.abs(m[1]) < 0.99999) {
        out[0] = Math.atan2(-m[9], m[5]);
        out[1] = Math.atan2(-m[2], m[0]);
      } else {
        out[0] = 0;
        out[1] = Math.atan2(m[8], m[10]);
      }
    } else if (order === "XZY") {
      out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
      if (Math.abs(m[4]) < 0.99999) {
        out[0] = Math.atan2(m[6], m[5]);
        out[1] = Math.atan2(m[8], m[0]);
      } else {
        out[0] = Math.atan2(-m[9], m[10]);
        out[1] = 0;
      }
    }
    return out;
  }

  // node_modules/ogl/src/math/Euler.js
  var tmpMat4 = new Mat4();
  var Euler = class extends Array {
    constructor(x = 0, y = x, z = x, order = "YXZ") {
      super(x, y, z);
      this.order = order;
      this.onChange = () => {
      };
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(v) {
      this[0] = v;
      this.onChange();
    }
    set y(v) {
      this[1] = v;
      this.onChange();
    }
    set z(v) {
      this[2] = v;
      this.onChange();
    }
    set(x, y = x, z = x) {
      if (x.length)
        return this.copy(x);
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this.onChange();
      return this;
    }
    copy(v) {
      this[0] = v[0];
      this[1] = v[1];
      this[2] = v[2];
      this.onChange();
      return this;
    }
    reorder(order) {
      this.order = order;
      this.onChange();
      return this;
    }
    fromRotationMatrix(m, order = this.order) {
      fromRotationMatrix(this, m, order);
      return this;
    }
    fromQuaternion(q, order = this.order) {
      tmpMat4.fromQuaternion(q);
      return this.fromRotationMatrix(tmpMat4, order);
    }
    toArray(a = [], o = 0) {
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
  };

  // node_modules/ogl/src/core/Transform.js
  var Transform = class {
    constructor() {
      this.parent = null;
      this.children = [];
      this.visible = true;
      this.matrix = new Mat4();
      this.worldMatrix = new Mat4();
      this.matrixAutoUpdate = true;
      this.position = new Vec3();
      this.quaternion = new Quat();
      this.scale = new Vec3(1);
      this.rotation = new Euler();
      this.up = new Vec3(0, 1, 0);
      this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
      this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
    }
    setParent(parent, notifyParent = true) {
      if (this.parent && parent !== this.parent)
        this.parent.removeChild(this, false);
      this.parent = parent;
      if (notifyParent && parent)
        parent.addChild(this, false);
    }
    addChild(child, notifyChild = true) {
      if (!~this.children.indexOf(child))
        this.children.push(child);
      if (notifyChild)
        child.setParent(this, false);
    }
    removeChild(child, notifyChild = true) {
      if (!!~this.children.indexOf(child))
        this.children.splice(this.children.indexOf(child), 1);
      if (notifyChild)
        child.setParent(null, false);
    }
    updateMatrixWorld(force) {
      if (this.matrixAutoUpdate)
        this.updateMatrix();
      if (this.worldMatrixNeedsUpdate || force) {
        if (this.parent === null)
          this.worldMatrix.copy(this.matrix);
        else
          this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
        this.worldMatrixNeedsUpdate = false;
        force = true;
      }
      for (let i = 0, l = this.children.length; i < l; i++) {
        this.children[i].updateMatrixWorld(force);
      }
    }
    updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale);
      this.worldMatrixNeedsUpdate = true;
    }
    traverse(callback) {
      if (callback(this))
        return;
      for (let i = 0, l = this.children.length; i < l; i++) {
        this.children[i].traverse(callback);
      }
    }
    decompose() {
      this.matrix.getTranslation(this.position);
      this.matrix.getRotation(this.quaternion);
      this.matrix.getScaling(this.scale);
      this.rotation.fromQuaternion(this.quaternion);
    }
    lookAt(target, invert4 = false) {
      if (invert4)
        this.matrix.lookAt(this.position, target, this.up);
      else
        this.matrix.lookAt(target, this.position, this.up);
      this.matrix.getRotation(this.quaternion);
      this.rotation.fromQuaternion(this.quaternion);
    }
  };

  // node_modules/ogl/src/core/Camera.js
  var tempMat4 = new Mat4();
  var tempVec3a = new Vec3();
  var tempVec3b = new Vec3();
  var Camera = class extends Transform {
    constructor(gl, { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {}) {
      super();
      Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });
      this.projectionMatrix = new Mat4();
      this.viewMatrix = new Mat4();
      this.projectionViewMatrix = new Mat4();
      this.worldPosition = new Vec3();
      this.type = left || right ? "orthographic" : "perspective";
      if (this.type === "orthographic")
        this.orthographic();
      else
        this.perspective();
    }
    perspective({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
      Object.assign(this, { near, far, fov, aspect });
      this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
      this.type = "perspective";
      return this;
    }
    orthographic({
      near = this.near,
      far = this.far,
      left = this.left,
      right = this.right,
      bottom = this.bottom,
      top = this.top,
      zoom = this.zoom
    } = {}) {
      Object.assign(this, { near, far, left, right, bottom, top, zoom });
      left /= zoom;
      right /= zoom;
      bottom /= zoom;
      top /= zoom;
      this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
      this.type = "orthographic";
      return this;
    }
    updateMatrixWorld() {
      super.updateMatrixWorld();
      this.viewMatrix.inverse(this.worldMatrix);
      this.worldMatrix.getTranslation(this.worldPosition);
      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
      return this;
    }
    lookAt(target) {
      super.lookAt(target, true);
      return this;
    }
    project(v) {
      v.applyMatrix4(this.viewMatrix);
      v.applyMatrix4(this.projectionMatrix);
      return this;
    }
    unproject(v) {
      v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
      v.applyMatrix4(this.worldMatrix);
      return this;
    }
    updateFrustum() {
      if (!this.frustum) {
        this.frustum = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
      }
      const m = this.projectionViewMatrix;
      this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12];
      this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12];
      this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13];
      this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13];
      this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14];
      this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14];
      for (let i = 0; i < 6; i++) {
        const invLen = 1 / this.frustum[i].distance();
        this.frustum[i].multiply(invLen);
        this.frustum[i].constant *= invLen;
      }
    }
    frustumIntersectsMesh(node) {
      if (!node.geometry.attributes.position)
        return true;
      if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity)
        node.geometry.computeBoundingSphere();
      if (!node.geometry.bounds)
        return true;
      const center = tempVec3a;
      center.copy(node.geometry.bounds.center);
      center.applyMatrix4(node.worldMatrix);
      const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(center, radius);
    }
    frustumIntersectsSphere(center, radius) {
      const normal = tempVec3b;
      for (let i = 0; i < 6; i++) {
        const plane = this.frustum[i];
        const distance3 = normal.copy(plane).dot(center) + plane.constant;
        if (distance3 < -radius)
          return false;
      }
      return true;
    }
  };

  // node_modules/ogl/src/math/functions/Mat3Func.js
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  function fromQuat2(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  function copy5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function set5(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function identity3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function invert3(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];
    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function multiply4(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];
    let b00 = b[0], b01 = b[1], b02 = b[2];
    let b10 = b[3], b11 = b[4], b12 = b[5];
    let b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate2(out, a, v) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate2(out, a, rad) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale4(out, a, v) {
    let x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function normalFromMat4(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }

  // node_modules/ogl/src/math/Mat3.js
  var Mat3 = class extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
      super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      if (m00.length)
        return this.copy(m00);
      set5(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
    translate(v, m = this) {
      translate2(this, m, v);
      return this;
    }
    rotate(v, m = this) {
      rotate2(this, m, v);
      return this;
    }
    scale(v, m = this) {
      scale4(this, m, v);
      return this;
    }
    multiply(ma, mb) {
      if (mb) {
        multiply4(this, ma, mb);
      } else {
        multiply4(this, this, ma);
      }
      return this;
    }
    identity() {
      identity3(this);
      return this;
    }
    copy(m) {
      copy5(this, m);
      return this;
    }
    fromMatrix4(m) {
      fromMat4(this, m);
      return this;
    }
    fromQuaternion(q) {
      fromQuat2(this, q);
      return this;
    }
    fromBasis(vec3a, vec3b, vec3c) {
      this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
      return this;
    }
    inverse(m = this) {
      invert3(this, m);
      return this;
    }
    getNormalMatrix(m) {
      normalFromMat4(this, m);
      return this;
    }
  };

  // node_modules/ogl/src/core/Mesh.js
  var ID4 = 0;
  var Mesh = class extends Transform {
    constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
      super();
      if (!gl.canvas)
        console.error("gl not passed as first argument to Mesh");
      this.gl = gl;
      this.id = ID4++;
      this.geometry = geometry;
      this.program = program;
      this.mode = mode;
      this.frustumCulled = frustumCulled;
      this.renderOrder = renderOrder;
      this.modelViewMatrix = new Mat4();
      this.normalMatrix = new Mat3();
      this.beforeRenderCallbacks = [];
      this.afterRenderCallbacks = [];
    }
    onBeforeRender(f) {
      this.beforeRenderCallbacks.push(f);
      return this;
    }
    onAfterRender(f) {
      this.afterRenderCallbacks.push(f);
      return this;
    }
    draw({ camera } = {}) {
      this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
      if (camera) {
        if (!this.program.uniforms.modelMatrix) {
          Object.assign(this.program.uniforms, {
            modelMatrix: { value: null },
            viewMatrix: { value: null },
            modelViewMatrix: { value: null },
            normalMatrix: { value: null },
            projectionMatrix: { value: null },
            cameraPosition: { value: null }
          });
        }
        this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
        this.program.uniforms.cameraPosition.value = camera.worldPosition;
        this.program.uniforms.viewMatrix.value = camera.viewMatrix;
        this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
        this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
        this.program.uniforms.modelMatrix.value = this.worldMatrix;
        this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
        this.program.uniforms.normalMatrix.value = this.normalMatrix;
      }
      let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({ flipFaces });
      this.geometry.draw({ mode: this.mode, program: this.program });
      this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
  };

  // node_modules/ogl/src/core/Texture.js
  var emptyPixel = new Uint8Array(4);
  function isPowerOf2(value) {
    return (value & value - 1) === 0;
  }
  var ID5 = 1;
  var Texture = class {
    constructor(gl, {
      image,
      target = gl.TEXTURE_2D,
      type = gl.UNSIGNED_BYTE,
      format = gl.RGBA,
      internalFormat = format,
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      generateMipmaps = true,
      minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
      magFilter = gl.LINEAR,
      premultiplyAlpha = false,
      unpackAlignment = 4,
      flipY = target == gl.TEXTURE_2D ? true : false,
      anisotropy = 0,
      level = 0,
      width,
      height = width
    } = {}) {
      this.gl = gl;
      this.id = ID5++;
      this.image = image;
      this.target = target;
      this.type = type;
      this.format = format;
      this.internalFormat = internalFormat;
      this.minFilter = minFilter;
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmaps = generateMipmaps;
      this.premultiplyAlpha = premultiplyAlpha;
      this.unpackAlignment = unpackAlignment;
      this.flipY = flipY;
      this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
      this.level = level;
      this.width = width;
      this.height = height;
      this.texture = this.gl.createTexture();
      this.store = {
        image: null
      };
      this.glState = this.gl.renderer.state;
      this.state = {};
      this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
      this.state.magFilter = this.gl.LINEAR;
      this.state.wrapS = this.gl.REPEAT;
      this.state.wrapT = this.gl.REPEAT;
      this.state.anisotropy = 0;
    }
    bind() {
      if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id)
        return;
      this.gl.bindTexture(this.target, this.texture);
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }
    update(textureUnit = 0) {
      const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);
      if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
        this.gl.renderer.activeTexture(textureUnit);
        this.bind();
      }
      if (!needsUpdate)
        return;
      this.needsUpdate = false;
      if (this.flipY !== this.glState.flipY) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.glState.flipY = this.flipY;
      }
      if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.glState.premultiplyAlpha = this.premultiplyAlpha;
      }
      if (this.unpackAlignment !== this.glState.unpackAlignment) {
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        this.glState.unpackAlignment = this.unpackAlignment;
      }
      if (this.minFilter !== this.state.minFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.state.minFilter = this.minFilter;
      }
      if (this.magFilter !== this.state.magFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.state.magFilter = this.magFilter;
      }
      if (this.wrapS !== this.state.wrapS) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.state.wrapS = this.wrapS;
      }
      if (this.wrapT !== this.state.wrapT) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.state.wrapT = this.wrapT;
      }
      if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
        this.gl.texParameterf(
          this.target,
          this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,
          this.anisotropy
        );
        this.state.anisotropy = this.anisotropy;
      }
      if (this.image) {
        if (this.image.width) {
          this.width = this.image.width;
          this.height = this.image.height;
        }
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          for (let i = 0; i < 6; i++) {
            this.gl.texImage2D(
              this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
              this.level,
              this.internalFormat,
              this.format,
              this.type,
              this.image[i]
            );
          }
        } else if (ArrayBuffer.isView(this.image)) {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        } else if (this.image.isCompressedTexture) {
          for (let level = 0; level < this.image.length; level++) {
            this.gl.compressedTexImage2D(
              this.target,
              level,
              this.internalFormat,
              this.image[level].width,
              this.image[level].height,
              0,
              this.image[level].data
            );
          }
        } else {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        }
        if (this.generateMipmaps) {
          if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
            this.generateMipmaps = false;
            this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
            this.minFilter = this.gl.LINEAR;
          } else {
            this.gl.generateMipmap(this.target);
          }
        }
        this.onUpdate && this.onUpdate();
      } else {
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          for (let i = 0; i < 6; i++) {
            this.gl.texImage2D(
              this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
              0,
              this.gl.RGBA,
              1,
              1,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              emptyPixel
            );
          }
        } else if (this.width) {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
        } else {
          this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      }
      this.store.image = this.image;
    }
  };

  // node_modules/ogl/src/core/RenderTarget.js
  var RenderTarget = class {
    constructor(gl, {
      width = gl.canvas.width,
      height = gl.canvas.height,
      target = gl.FRAMEBUFFER,
      color = 1,
      depth = true,
      stencil = false,
      depthTexture = false,
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      minFilter = gl.LINEAR,
      magFilter = minFilter,
      type = gl.UNSIGNED_BYTE,
      format = gl.RGBA,
      internalFormat = format,
      unpackAlignment,
      premultiplyAlpha
    } = {}) {
      this.gl = gl;
      this.width = width;
      this.height = height;
      this.depth = depth;
      this.buffer = this.gl.createFramebuffer();
      this.target = target;
      this.gl.renderer.bindFramebuffer(this);
      this.textures = [];
      const drawBuffers = [];
      for (let i = 0; i < color; i++) {
        this.textures.push(
          new Texture(gl, {
            width,
            height,
            wrapS,
            wrapT,
            minFilter,
            magFilter,
            type,
            format,
            internalFormat,
            unpackAlignment,
            premultiplyAlpha,
            flipY: false,
            generateMipmaps: false
          })
        );
        this.textures[i].update();
        this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0);
        drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
      }
      if (drawBuffers.length > 1)
        this.gl.renderer.drawBuffers(drawBuffers);
      this.texture = this.textures[0];
      if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension("WEBGL_depth_texture"))) {
        this.depthTexture = new Texture(gl, {
          width,
          height,
          minFilter: this.gl.NEAREST,
          magFilter: this.gl.NEAREST,
          format: this.gl.DEPTH_COMPONENT,
          internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
          type: this.gl.UNSIGNED_INT
        });
        this.depthTexture.update();
        this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);
      } else {
        if (depth && !stencil) {
          this.depthBuffer = this.gl.createRenderbuffer();
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
          this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
        }
        if (stencil && !depth) {
          this.stencilBuffer = this.gl.createRenderbuffer();
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
          this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
        }
        if (depth && stencil) {
          this.depthStencilBuffer = this.gl.createRenderbuffer();
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
          this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
        }
      }
      this.gl.renderer.bindFramebuffer({ target: this.target });
    }
    setSize(width, height) {
      if (this.width === width && this.height === height)
        return;
      this.width = width;
      this.height = height;
      this.gl.renderer.bindFramebuffer(this);
      for (let i = 0; i < this.textures.length; i++) {
        this.textures[i].width = width;
        this.textures[i].height = height;
        this.textures[i].needsUpdate = true;
        this.textures[i].update();
        this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0);
      }
      if (this.depthTexture) {
        this.depthTexture.width = width;
        this.depthTexture.height = height;
        this.depthTexture.needsUpdate = true;
        this.depthTexture.update();
        this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);
      } else {
        if (this.depthBuffer) {
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
        }
        if (this.stencilBuffer) {
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
        }
        if (this.depthStencilBuffer) {
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
          this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
        }
      }
      this.gl.renderer.bindFramebuffer({ target: this.target });
    }
  };

  // node_modules/ogl/src/math/functions/Vec2Func.js
  function copy6(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  function set6(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  function add3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  function multiply5(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }
  function divide2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }
  function scale5(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  function distance2(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
  }
  function squaredDistance2(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
  }
  function length3(a) {
    var x = a[0], y = a[1];
    return Math.sqrt(x * x + y * y);
  }
  function squaredLength2(a) {
    var x = a[0], y = a[1];
    return x * x + y * y;
  }
  function negate2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }
  function inverse2(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    return out;
  }
  function normalize4(out, a) {
    var x = a[0], y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  function dot4(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function cross2(a, b) {
    return a[0] * b[1] - a[1] * b[0];
  }
  function lerp3(out, a, b, t) {
    var ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }
  function transformMat32(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  function transformMat42(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }
  function exactEquals2(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }

  // node_modules/ogl/src/math/Vec2.js
  var Vec2 = class extends Array {
    constructor(x = 0, y = x) {
      super(x, y);
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    set x(v) {
      this[0] = v;
    }
    set y(v) {
      this[1] = v;
    }
    set(x, y = x) {
      if (x.length)
        return this.copy(x);
      set6(this, x, y);
      return this;
    }
    copy(v) {
      copy6(this, v);
      return this;
    }
    add(va, vb) {
      if (vb)
        add3(this, va, vb);
      else
        add3(this, this, va);
      return this;
    }
    sub(va, vb) {
      if (vb)
        subtract2(this, va, vb);
      else
        subtract2(this, this, va);
      return this;
    }
    multiply(v) {
      if (v.length)
        multiply5(this, this, v);
      else
        scale5(this, this, v);
      return this;
    }
    divide(v) {
      if (v.length)
        divide2(this, this, v);
      else
        scale5(this, this, 1 / v);
      return this;
    }
    inverse(v = this) {
      inverse2(this, v);
      return this;
    }
    len() {
      return length3(this);
    }
    distance(v) {
      if (v)
        return distance2(this, v);
      else
        return length3(this);
    }
    squaredLen() {
      return this.squaredDistance();
    }
    squaredDistance(v) {
      if (v)
        return squaredDistance2(this, v);
      else
        return squaredLength2(this);
    }
    negate(v = this) {
      negate2(this, v);
      return this;
    }
    cross(va, vb) {
      if (vb)
        return cross2(va, vb);
      return cross2(this, va);
    }
    scale(v) {
      scale5(this, this, v);
      return this;
    }
    normalize() {
      normalize4(this, this);
      return this;
    }
    dot(v) {
      return dot4(this, v);
    }
    equals(v) {
      return exactEquals2(this, v);
    }
    applyMatrix3(mat3) {
      transformMat32(this, this, mat3);
      return this;
    }
    applyMatrix4(mat4) {
      transformMat42(this, this, mat4);
      return this;
    }
    lerp(v, a) {
      lerp3(this, this, v, a);
      return this;
    }
    clone() {
      return new Vec2(this[0], this[1]);
    }
    fromArray(a, o = 0) {
      this[0] = a[o];
      this[1] = a[o + 1];
      return this;
    }
    toArray(a = [], o = 0) {
      a[o] = this[0];
      a[o + 1] = this[1];
      return a;
    }
  };

  // node_modules/ogl/src/extras/Plane.js
  var Plane = class extends Geometry {
    constructor(gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {
      const wSegs = widthSegments;
      const hSegs = heightSegments;
      const num = (wSegs + 1) * (hSegs + 1);
      const numIndices = wSegs * hSegs * 6;
      const position = new Float32Array(num * 3);
      const normal = new Float32Array(num * 3);
      const uv = new Float32Array(num * 2);
      const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
      Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
      Object.assign(attributes, {
        position: { size: 3, data: position },
        normal: { size: 3, data: normal },
        uv: { size: 2, data: uv },
        index: { data: index }
      });
      super(gl, attributes);
    }
    static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
      const io = i;
      const segW = width / wSegs;
      const segH = height / hSegs;
      for (let iy = 0; iy <= hSegs; iy++) {
        let y = iy * segH - height / 2;
        for (let ix = 0; ix <= wSegs; ix++, i++) {
          let x = ix * segW - width / 2;
          position[i * 3 + u] = x * uDir;
          position[i * 3 + v] = y * vDir;
          position[i * 3 + w] = depth / 2;
          normal[i * 3 + u] = 0;
          normal[i * 3 + v] = 0;
          normal[i * 3 + w] = depth >= 0 ? 1 : -1;
          uv[i * 2] = ix / wSegs;
          uv[i * 2 + 1] = 1 - iy / hSegs;
          if (iy === hSegs || ix === wSegs)
            continue;
          let a = io + ix + iy * (wSegs + 1);
          let b = io + ix + (iy + 1) * (wSegs + 1);
          let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
          let d = io + ix + iy * (wSegs + 1) + 1;
          index[ii * 6] = a;
          index[ii * 6 + 1] = b;
          index[ii * 6 + 2] = d;
          index[ii * 6 + 3] = b;
          index[ii * 6 + 4] = c;
          index[ii * 6 + 5] = d;
          ii++;
        }
      }
    }
  };

  // src/modules/gl/gl.js
  var import_tiny_emitter2 = __toESM(require_tiny_emitter(), 1);

  // src/modules/gl/_camera.js
  var camera_default = class extends Camera {
    constructor(gl, { fov = 25 }) {
      super();
      this.gl = gl;
      this.fov = fov;
      this.far = 500;
    }
    get fovInRad() {
      return this.fov * Math.PI / 180;
    }
    set ratio(ratio) {
      this._ratio = ratio || this.gl.vp.ratio;
    }
    getViewSize(ratio = void 0) {
      if (ratio === void 0)
        ratio = this._ratio;
      const height = Math.abs(this.position.z * Math.tan(this.fovInRad / 2) * 2);
      return { w: height * ratio, h: height };
    }
    get pixelSize() {
      const { h } = this.getViewSize();
      return h / window.innerHeight;
    }
  };

  // src/modules/gl/mat/grid_points/vertex.vert
  var vertex_default = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec2 position;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float u_time;varying vec2 v_uv;void main(){vec3 pos=vec3(position.x,position.y,0.);vec4 mPos=modelMatrix*vec4(pos,1.0);vec4 mvPos=viewMatrix*mPos;gl_PointSize=3.;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=vec2(0.,0.);}";

  // src/modules/gl/mat/grid_points/fragment.frag
  var fragment_default = "precision highp float;varying vec2 v_uv;varying vec4 v_color;void main(){gl_FragColor.rgb=vec3(0.,0.,0.);gl_FragColor.a=1.0;}";

  // src/modules/gl/mat/grid_points/index.js
  var grid_points_default = class extends Program {
    constructor(gl, options = {}) {
      super(gl, {
        vertex: vertex_default,
        fragment: fragment_default
      });
      this.transparent = null;
      this.cullFace = null;
      this.uniforms = {
        u_time: { value: 0 }
      };
    }
    set time(t) {
      this.uniforms.u_time.value = t;
    }
  };

  // src/modules/gl/grid-points.js
  var grid_points_default2 = class extends Mesh {
    constructor(gl, { points }) {
      super(gl);
      this.gl = gl;
      this.mode = this.gl.POINTS;
      this.geometry = new Geometry(this.gl, {
        position: { size: 2, data: points.array }
      });
      this.program = new grid_points_default(this.gl, {});
      this.position.x = -points.offset;
      this.position.y = -points.offset;
    }
  };

  // src/modules/gl/mat/grid_quads/vertex.vert
  var vertex_default2 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 uv;attribute vec2 a_offset;attribute float a_state;attribute float a_rand;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;uniform float u_time;uniform float u_a_visible;varying vec2 v_uv;varying float v_state;varying float v_rand;uniform vec3 u_data;void main(){vec3 pos=position*u_a_visible;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=uv;}";

  // src/modules/gl/mat/grid_quads/fragment.frag
  var fragment_default2 = "precision highp float;uniform sampler2D u_t1;uniform sampler2D u_t2;uniform float u_a_inOut;uniform float u_state;varying vec2 v_uv;varying vec4 v_color;varying float v_state;varying float v_rand;void main(){vec2 state_uv=(v_uv*.5);state_uv.x+=1.-u_state;state_uv.y+=.5;vec4 tx=texture2D(u_t1,state_uv);vec2 rand_uv=(v_uv*.5);rand_uv.x+=.0;rand_uv.y+=.5;vec4 alt_tx=texture2D(u_t2,rand_uv);vec4 final_tx=mix(tx,alt_tx,u_a_inOut);gl_FragColor.rgb=final_tx.rgb;gl_FragColor.a=final_tx.a;}";

  // src/modules/gl/mat/grid_quads/index.js
  var grid_quads_default = class extends Program {
    constructor(gl) {
      super(gl, {
        vertex: vertex_default2,
        fragment: fragment_default2
      });
      const { atlas_alt, atlas_state } = window.db.loaded;
      this.cullFace = null;
      this.uniforms = {
        u_state: { value: 0 },
        u_time: { value: 0 },
        u_t1: { value: atlas_state },
        u_t2: { value: atlas_alt },
        u_a_inOut: { value: 1 },
        u_a_visible: { value: 1 }
      };
    }
    set time(t) {
      this.uniforms.u_time.value = t;
    }
    set inOut(val) {
      this.uniforms.u_a_inOut.value = val;
    }
    set visible(val) {
      this.uniforms.u_a_visible.value = val;
    }
  };

  // src/modules/gl/mat/grid_quads_alias/vertex.vert
  var vertex_default3 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 a_offset;attribute vec4 a_id;varying vec4 v_id;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;void main(){vec3 pos=position*1.;pos.x+=a_offset.x;pos.y+=a_offset.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_id=a_id;}";

  // src/modules/gl/mat/grid_quads_alias/fragment.frag
  var fragment_default3 = "precision highp float;uniform bool u_id_toggle;varying vec4 v_id;void main(){if(u_id_toggle){gl_FragColor=v_id;return;}return;}";

  // src/modules/gl/mat/grid_quads_alias/index.js
  var grid_quads_alias_default = class extends Program {
    constructor(gl) {
      super(gl, {
        vertex: vertex_default3,
        fragment: fragment_default3
      });
      this.cullFace = null;
      this.uniforms = {
        u_id_toggle: { value: 0 }
      };
    }
  };

  // src/modules/gl/grid-quads-alias.js
  var grid_quads_alias_default2 = class extends Mesh {
    constructor(gl, { planes, idArray }) {
      super(gl);
      this.gl = gl;
      const { index, position } = new Plane(this.gl, 1, 1, 1, 1).attributes;
      this.geometry = new Geometry(this.gl, {
        index,
        position,
        a_offset: { instanced: 1, size: 2, data: planes.array },
        a_id: { instanced: 1, size: 4, data: idArray }
      });
      this.frustumCulled = false;
      this.program = new grid_quads_alias_default(this.gl);
    }
    render(t) {
    }
  };

  // src/modules/gl/util/picker.js
  var import_tiny_emitter = __toESM(require_tiny_emitter(), 1);
  var picker_default = class extends RenderTarget {
    constructor(gl) {
      super(gl);
      this.gl = gl;
      this.shouldPick = true;
      this.point = new Vec2();
      this.centerPoint();
      this.i = {
        intersecting: false,
        id: null
      };
      this.e = new import_tiny_emitter.default();
    }
    render(t = 0) {
      if (t % 6 !== 0)
        return;
      if (!this.shouldPick || !this.group)
        return;
      this.group.program.uniforms.u_id_toggle.value = 1;
      this.gl.clearColor(0, 0, 0, 0);
      window.App.gl.renderer.render({
        scene: this.group,
        camera: window.App.gl.camera,
        target: this
      });
      const data = new Uint8Array(4);
      this.gl.readPixels(
        this.point.x,
        this.point.y,
        1,
        1,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        data
      );
      const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
      if (id) {
        this.isIntersecting(id);
      } else {
        this.stopIntersecting();
      }
      this.group.program.uniforms.u_id_toggle.value = 0;
      this.gl.clearColor(1, 1, 1, 1);
    }
    isIntersecting(id) {
      if (this.i.id === id)
        return;
      if (this.i.id !== null && this.i.id !== id) {
        this.i.id = id;
        this.i.intersecting = true;
        this.e.emit("INTERSECTING", id);
      } else {
        this.i.id = id;
        this.i.intersecting = true;
        this.e.emit("INTERSECTING", id);
      }
    }
    stopIntersecting() {
      if (!this.i.intersecting)
        return;
      this.i.id = null;
      this.i.intersecting = false;
      this.e.emit("INTERSECTING", null);
    }
    set _group(group) {
      this.group = group;
    }
    set _point({ x, y }) {
      this.point.set(x, y);
    }
    centerPoint() {
      const x = this.gl.canvas.width / 2;
      const y = this.gl.canvas.height / 2;
      this.point.set(x, y);
    }
    getPickingValues(number) {
      const array = new Float32Array(number * 4);
      for (let i = 0; i < number; i++) {
        let id = i + 1;
        array.set(
          [
            (id >> 0 & 255) / 255,
            (id >> 8 & 255) / 255,
            (id >> 16 & 255) / 255,
            (id >> 24 & 255) / 255
          ],
          i * 4
        );
      }
      return array;
    }
  };

  // src/modules/gl/grid-quads.js
  var grid_quads_default2 = class extends Transform {
    constructor(gl, { points, planes }) {
      super();
      this.gl = gl;
      this.position.x = -points.offset;
      this.position.y = -points.offset;
      this.frustumCulled = false;
      this.create(planes, points);
    }
    create(planes, points) {
      const { state, array } = planes;
      this.quads = [];
      for (let i = 0; i < state.length; i++) {
        const quad = new Quad(this.gl);
        quad.program.uniforms.u_state.value = state[i];
        quad.position.set(array[i * 2], array[i * 2 + 1], 0);
        quad.setParent(this);
        this.quads.push(quad);
      }
      this.picker = new picker_default(this.gl);
      this.picker.e.on("INTERSECTING", (id) => this.intersecting(id));
      const values = this.picker.getPickingValues(state.length);
      this.alias = new grid_quads_alias_default2(this.gl, { planes, idArray: values });
      this.alias.setParent(this);
      this.picker._group = this.alias;
    }
    render(t) {
      if (window.App.gl.camera.position.z < 20) {
        this.picker.render(t);
      } else
        this.picker.stopIntersecting();
      if (window.App.gl.camera.position.z < 5) {
        this.quads.forEach((quad) => quad.render(t, 0));
      } else
        this.quads.forEach((quad) => quad.render(t));
    }
    intersecting(id) {
      this.quads.forEach((quad, i) => {
        if (i === id - 1) {
          quad.program.inOut = 0;
        } else {
          quad.program.inOut = 1;
        }
      });
    }
  };
  var Quad = class extends Mesh {
    constructor(gl) {
      super(gl);
      this.gl = gl;
      this.geometry = new Plane(this.gl, 1, 1, 1, 1);
      this.program = new grid_quads_default(this.gl);
      this.frustumCulled = false;
    }
    render(t, visible = 1) {
      this.visible = visible;
    }
  };

  // src/modules/gl/mat/grid_is/vertex.vert
  var vertex_default4 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 uv;attribute vec2 a_pos;attribute vec2 a_rand;attribute vec4 a_id;varying vec4 v_id;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float u_a_inOut;uniform float u_time;varying vec2 v_uv;varying float v_a_inOut;void main(){vec3 pos=vec3((position.x+a_pos.x+a_rand.x-.5),(position.y+a_pos.y+a_rand.y-.5),0.03);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=uv;v_id=a_id;v_a_inOut=u_a_inOut;}";

  // src/modules/gl/mat/grid_is/fragment.frag
  var fragment_default4 = "precision highp float;uniform bool u_id_toggle;uniform sampler2D u_tx;varying vec2 v_uv;varying vec4 v_color;varying vec4 v_id;varying float v_a_inOut;void main(){if(u_id_toggle){gl_FragColor=v_id;return;}vec4 img=texture2D(u_tx,v_uv);gl_FragColor.rgb=img.rgb;gl_FragColor.a=(1.-v_a_inOut)*img.a;}";

  // src/modules/gl/mat/grid_is/index.js
  var grid_is_default = class extends Program {
    constructor(gl, options = {}) {
      super(gl, {
        vertex: vertex_default4,
        fragment: fragment_default4
      });
      const { sphere_tx } = window.db.loaded;
      this.transparent = true;
      this.cullFace = null;
      this.uniforms = {
        u_time: { value: 0 },
        u_id_toggle: { value: 0 },
        u_tx: { value: sphere_tx },
        u_a_inOut: { value: 1 }
      };
    }
    set inOut(val) {
      this.uniforms.u_a_inOut.value = val;
    }
    set time(t) {
      this.uniforms.u_time.value = t;
    }
  };

  // src/modules/gl/grid-is.js
  var grid_is_default2 = class extends Mesh {
    constructor(gl, { points, planes, instances, number }) {
      super(gl);
      this.gl = gl;
      const idArray = this.setupPick(number);
      this.geometry = new Plane(this.gl, {
        width: 0.1,
        height: 0.1,
        attributes: {
          a_pos: { instanced: 1, size: 2, data: instances.array },
          a_rand: { instanced: 1, size: 2, data: instances.rand },
          a_id: { instanced: 1, size: 4, data: idArray }
        }
      });
      this.frustumCulled = false;
      this.program = new grid_is_default(this.gl, {});
      this.position.x = -points.offset + 0.5;
      this.position.y = -points.offset + 0.5;
    }
    render(t) {
      if (window.App.gl.camera.position.z < 5) {
        if (this.isNear)
          return;
        this.animateNear(true);
        this.isNear = true;
      } else {
        if (!this.isNear)
          return;
        this.animateNear(false);
        this.isNear = false;
      }
    }
    animateNear(isNear) {
      this.program.inOut = isNear ? 0 : 1;
    }
    setupPick(number) {
      const array = new Float32Array(number * 4);
      for (let i = 0; i < number; i++) {
        let id = i + 1;
        array.set(
          [
            (id >> 0 & 255) / 255,
            (id >> 8 & 255) / 255,
            (id >> 16 & 255) / 255,
            (id >> 24 & 255) / 255
          ],
          i * 4
        );
      }
      return array;
    }
  };

  // src/modules/gl/grid.js
  var grid_default = class extends Transform {
    constructor(gl, { loaded, config }) {
      super();
      this.gl = gl;
      this.loaded = loaded;
      this.config = config;
      this.create();
    }
    create() {
      const { points, planes, instances } = this.compute();
      this.points = new grid_points_default2(this.gl, { points });
      this.points.setParent(this);
      this.quads = new grid_quads_default2(this.gl, { points, planes });
      this.quads.setParent(this);
      this.is = new grid_is_default2(this.gl, {
        points,
        planes,
        instances,
        number: this.config.grid.inNum
      });
      this.is.setParent(this);
    }
    render(t) {
      this.quads?.render(t);
      this.is?.render(t);
    }
    compute() {
      const pointNum = this.config.grid.num;
      const points = calcGrid(pointNum);
      const filledSquares = this.config.zones.length;
      const planesOffsetArray = new Float32Array(filledSquares * 2);
      const planesState = new Float32Array(filledSquares * 1);
      const insPos = new Float32Array(this.config.grid.inNum * 2);
      const insRand = new Float32Array(this.config.grid.inNum * 2);
      let insIndex = 0;
      this.config.zones.forEach((item, i) => {
        const x = points.array[item.id * 2];
        const y = points.array[item.id * 2 + 1];
        planesOffsetArray.set([x, y], i * 2);
        planesState.set([item.state], i);
        if (item.in.length > 0) {
          item.in.forEach((inst) => {
            insPos.set([x, y], insIndex);
            insRand.set(
              [(Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9],
              insIndex
            );
            insIndex += 2;
          });
        }
      });
      const planes = {
        array: planesOffsetArray,
        state: planesState
      };
      const instances = {
        array: insPos,
        rand: insRand
      };
      return { points, planes, instances };
    }
    animateNear(isNear) {
      this.squares.animateNear(isNear);
    }
  };
  function calcGrid(num) {
    const array = new Float32Array(num * 2);
    const sqnum = Math.sqrt(num);
    let counter = 0;
    for (let i = sqnum; i > 0; i--) {
      for (let j = 0; j < sqnum; j++) {
        array.set([j, i], counter * 2);
        counter += 1;
      }
    }
    const offset = sqnum / 2;
    return { array, offset };
  }

  // src/modules/utils/math.js
  function lerp4(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  }
  function clamp(min, max, num) {
    return Math.min(Math.max(num, min), max);
  }

  // src/modules/controls.js
  var CTRLS = {
    limitXY: 50,
    limitZ: 10,
    limitZfar: 200
  };

  // src/modules/gl/_scene.js
  var scene_default = class extends Transform {
    constructor(gl, { loaded, config }) {
      super();
      this.gl = gl;
      this.loaded = loaded;
      this.config = config;
      this.mvmt = {
        x: -0,
        y: 0,
        z: 800,
        ex: -48,
        ey: 50,
        ez: 20,
        canMove: true,
        lerp: 0.1
      };
      this.a = {
        isNear: false,
        nearValue: 30,
        isInstanceNear: false,
        instanceNearValue: 25,
        isInstanceView: false,
        instanceViewValue: 0
      };
      this.create();
    }
    create() {
      this.grid = new grid_default(this.gl, {
        data: this.data,
        loaded: this.loaded,
        config: this.config
      });
      this.grid.setParent(this);
      this.isOn = true;
      this.intiEvents();
    }
    render(t) {
      if (!this.isOn)
        return;
      this.grid?.render(t);
      this.renderMovement();
    }
    toggleMovement() {
      this.mvmt.canMove = !this.mvmt.canMove;
      if (this.mvmt.canMove)
        this.mvmt.ez += 50;
    }
    renderMovement() {
      if (!this.mvmt.canMove)
        return;
      this.mvmt.ex = clamp(-CTRLS.limitXY, CTRLS.limitXY, this.mvmt.ex);
      this.mvmt.ey = clamp(-CTRLS.limitXY, CTRLS.limitXY, this.mvmt.ey);
      this.mvmt.ez = clamp(
        CTRLS.limitZ - this.a.instanceViewValue,
        CTRLS.limitZfar,
        this.mvmt.ez
      );
      this.mvmt.x = lerp4(this.mvmt.x, this.mvmt.ex, this.mvmt.lerp);
      this.mvmt.y = lerp4(this.mvmt.y, this.mvmt.ey, this.mvmt.lerp);
      this.mvmt.z = lerp4(this.mvmt.z, this.mvmt.ez, this.mvmt.lerp * 0.5);
      if (this.gl.camera && this.mvmt) {
        this.gl.camera.position.x = this.mvmt.x;
        this.gl.camera.position.y = this.mvmt.y;
        this.gl.camera.position.z = this.mvmt.z;
      }
    }
    toInstanceView(flag) {
      if (!this.a.isInstanceView) {
        this.a.instanceViewValue = 10;
        this.mvmt.ez = 3;
        this.a.isInstanceView = true;
        window.App.state.s.free = false;
      } else {
        this.a.instanceViewValue = 0;
        this.a.isInstanceView = false;
        window.App.state.s.free = true;
      }
    }
    resize(vp) {
      this.vp = vp;
      if (this.quad)
        this.quad.resize(vp);
    }
    intiEvents() {
      this.mouse = {
        x: 0,
        y: 0,
        down: false
      };
      document.onwheel = (e) => this.onWheel(e);
      document.onmousedown = () => this.mouse.down = true;
      document.onmouseup = () => this.mouse.down = false;
      document.onmousemove = (e) => this.onMouseMove(e);
      document.onkeyup = (e) => this.onKeyUp(e);
    }
    onKeyUp(e) {
      if (e.key === " ") {
        this.toInstanceView(true);
      }
    }
    onWheel(e) {
      if (!this.mvmt.canMove)
        return;
      this.mvmt.ez += e.deltaY * 0.02;
      if (this.gl.camera.position.z > 3) {
        if (this.a.isInstanceView)
          this.toInstanceView();
      }
    }
    onMouseMove(e) {
      if (!window.App.state.s.free)
        return;
      if (!this.mvmt.canMove)
        return;
      if (!this.mouse.down)
        return;
      this.mvmt.ex -= e.movementX * 0.03 * (this.mvmt.z * 8e-3);
      this.mvmt.ey += e.movementY * 0.03 * (this.mvmt.z * 8e-3);
    }
    onPick(e) {
      if (!this.mvmt.canMove)
        return;
      this.grid.is.program.uniforms.u_id_toggle = 1;
    }
  };

  // src/modules/gl/gl.js
  var gl_default = class {
    constructor() {
      this.wrapper = document.getElementById("c");
      this.vp = {
        dpr: Math.min(window.devicePixelRatio, 2)
      };
      this.renderer = new Renderer({
        dpr: 2,
        alpha: true
      });
      this.gl = this.renderer.gl;
      this.gl.clearColor(1, 1, 1, 1);
      this.wrapper.appendChild(this.gl.canvas);
      this.camera = new camera_default(this.gl, {});
      this.gl.camera = this.camera;
      this.camera.position.set(0, 0, 100);
      this.events = new import_tiny_emitter2.default();
    }
    init(loaded) {
      this.db = loaded;
      this.time = 0;
      this.scene = new scene_default(this.gl, loaded);
      this.pickingTarget = new RenderTarget(this.gl);
      this.initEvents();
      this.render();
    }
    initEvents() {
      new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
        this.wrapper
      );
      this.mouse = { x: 0, y: 0 };
      this.picker = new Vec2();
      document.onclick = (e) => this.onPickClick(e);
    }
    onPickClick(e) {
      this.picker.set(
        e.x * this.gl.canvas.width / this.gl.canvas.clientWidth,
        this.gl.canvas.height - e.y * this.gl.canvas.height / this.gl.canvas.clientHeight - 1
      );
      this.scene.grid.is.program.uniforms.u_id_toggle.value = 1;
      this.shouldPick = true;
    }
    instanceClicked(id) {
      this.events.emit("clicked", id - 1);
    }
    render(scroll = 0) {
      this.time += 0.5;
      if (this.controls)
        this.controls.update();
      if (this.scene)
        this.scene.render(this.time);
      if (this.shouldPick)
        this.renderPick();
      this.renderer.render({
        scene: this.scene,
        camera: this.camera
      });
      window.requestAnimationFrame(this.render.bind(this));
    }
    renderPick() {
      this.gl.clearColor(0, 0, 0, 0);
      this.renderer.render({
        scene: this.scene.grid.is,
        camera: this.camera,
        target: this.pickingTarget
      });
      const data = new Uint8Array(4);
      this.gl.readPixels(
        this.picker.x,
        this.picker.y,
        1,
        1,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        data
      );
      const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
      if (id)
        this.instanceClicked(id);
      this.scene.grid.is.program.uniforms.u_id_toggle.value = 0;
      this.gl.clearColor(1, 1, 1, 1);
      this.shouldPick = false;
    }
    resize(entry) {
      const cw = entry ? entry.width : this.wrapper.clientWidth;
      const ch = entry ? entry.height : this.wrapper.clientHeight;
      this.vp.w = cw;
      this.vp.h = ch;
      this.vp.ratio = cw / ch;
      this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
      this.vp.viewRatio = this.vp.viewSize.w / this.vp.w;
      this.renderer.setSize(this.vp.w, this.vp.h);
      this.camera.perspective({
        aspect: this.vp.ratio
      });
      this.scene?.resize(this.vp);
      this.pickingTarget = new RenderTarget(this.gl);
    }
  };

  // src/modules/gl/util/load.js
  async function loadTexture(gl, path) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        const texture = new Texture(gl, { image: img });
        resolve(texture);
      };
    });
  }

  // src/modules/classes/emitter.js
  var import_events = __toESM(require_events(), 1);
  var emitter_default = class extends import_events.default {
    constructor() {
      super();
    }
  };

  // src/modules/db.js
  var db_default = class {
    constructor() {
      this.info = {};
      this.init();
    }
    init() {
      this.config = {
        grid: {
          num: 1e4,
          inNum: 0
        }
      };
      let last;
      this.config.zones = [];
      this.config.instances = [];
      this.config.instancesLink = [];
      const dbElements = [...document.querySelectorAll('[data-project="meta"]')];
      dbElements.forEach((item, i) => {
        const childItem = item.children[0].children[0];
        let linkItem = item.querySelector("a");
        const content = JSON.parse(childItem.textContent);
        if (last === content.id) {
          this.config.zones[this.config.zones.length - 1].in.push(content.in[0]);
          if (content.state !== "WIP")
            this.config.instancesLink.push(linkItem);
        } else {
          last = content.id;
          if (content.state === "FULL") {
            content.state = 1;
            this.config.instancesLink.push(linkItem);
          } else if (content.state === "WIP") {
            content.state = 0;
            content.in = [];
          }
          this.config.zones.push(content);
        }
        this.config.instances.push(...content.in);
        this.config.grid.inNum += content.in.length;
      });
    }
  };

  // src/assets/atlas_state.webp
  var atlas_state_default = "data:image/webp;base64,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";

  // src/assets/atlas_alt_tx.webp
  var atlas_alt_tx_default = "data:image/webp;base64,UklGRoYHAABXRUJQVlA4THkHAAAvN8QNAeWobduGkf8/20nGOkXEBOBqMiPXY4eCtGx7s8iKhEqIBCREAg5OHWwdTB0MDooDcBAJrINIqIT8mE8Cu9emV68zEf2fAKBA/P1HEZH68b///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv/+liHz89zEMb90G/phi7TWU+VOKnD+liPF/G2jsNlCvYcBeA3YbIHQboNMgANJn2AC2PgMDrH2GAjD3GTLA1GdIAKnPMALEPgMBDH0GBMA+AwBAl0FupMfAN2uPodzMPYZ8k3oM483YYxhusMcAd90KfoNutd2T/sJ6b+4v5Hupv0D3xv4C3gvdBYGH0ltYH629hfQo9RboEfUW4HGofQV+ArivkJ/JfQV6hroKFZ6uPYX1ubmnEJ+LPQV8LnQUGF7kfkJ8JfUT8JVQewkrvMxNSvCo+Bo1KehQAm+sfYTyjtyikEPhO0IXYYW3coMS/YneQw1KcqcN3sztyeRO8V3UnqzeJPB2bk7Ym8b3UXNSnWmBHbkxCerMuAc2JuRME+ya25LoS4L7BGlKJl+KsDO5X5TdoyV2pQK7T94nujtaqp4kuF8Q34u6u4DhQT15AIPkekH2myxFT8pgMnneRfdHS7MjFTA6+x3q/htY3vxIgpWwuR0biJZQ3VgQzKI43UUNoqXoRoJgGMXlUA0WsDx70TeCaRSHC2IBTYkTzQGMh9nfFjXIYJnUhxMcMHvbRS2SqcmFhOCQg7jal1pkMC0eNAU4KM6O9k9NkqlB/VcIDhzFy/6pyQVMT/6TAxwaJx/7pzbRlngPIxweVwf7UpsFTJP6LhOc4ijedVGbgrZm12GC04ybZ4WiRiOYDtVxmOBUaXErFDXKYDuq19Yc4HRxFpf6qmq0ojHxmcoEJx0Xd0JWswlsk3ospwAnjpFd6auq2QLGZ3epJQY4fYxLdSJitStoDNVVK2eCH5My+w+yWh7A+OwnsiQK8NNSWsRxaFbTGYyjuqiUNAb4sZHysnkMsdqewPrsHLKUNCL8CocxFxY/CZdNjX+DdVSXlG0pU4oDwi8UaUy58CauESKreUFz81+e3N+YeSml5JxjHAkxwG8ZB6IYc86lFL6V+399lFgPKAjWUR2Abx8RDQi/5YBI46OFmbe/PxwvXPWQgmB+/tPbUzYuOY2EvxEcYprKsom6ISISxTSVrephK4J5UvcULnkcfgc4prKIunQdwL74x8NtyYQ/VxhTEXVsQbAf1VdlSfTjBEqLqHMLgn0UZ7nLmX4OunBV/xaEA87qtHWJeH4hlqouzgEOOKrncsQzC4nVyyc4YhDXUdUlnhVxVTdPcMir+q8UPJ9wqernMsAhSX14oXMhVk9fAhwSxYlUt3gexOrpNcFBZ3VkGc+BWF2dEQ76pb684PGQ1dVrgqOiuvMVjxUu6uuMcNQg/qQSj0Siri4Ex53VpQseJVzV1WsOcNyLOrUMxyBRT685wIFH9evLEb7U02tBODJWx9ISrIWijl5zgEOjqGsL2sJv9fOaAxw7iDq3oCUUdXMmOPy3uregHRR18poDHL+og2/BShB18ToRnOFVXbxYmdXBZSI4x4s6ebJxUe+uS0I4y4u6OVkY1LWlJIQTvaifS9gPxatkmeIQ4Fyv6unX/Wb1YxER5lJyioRwxkV9nfaK6shw8mFRZ5ewD0ozgd/q7nmfq7YSKOrwuAdqKzFU9XjeY2klvtTp6X2jNhJX9Xp+n7QRyOr39K6oTQSJOj6/a2sivtT36T2kDQSyOj+/Z20gSNT9wztQm4dw1QYwv2NuHki0BazvkMYhXLURpNeitg2jaCvIr3HTgKztYA2voDYM4VK1JUyvxIYhiraF/Ao3C8TaHIbnUBsFYm0Q43OxTSDWJrE8t7YIxNoo1udqe0Cs7SI9Q9oajKwtY34mtwXhUrVt5Ge4JaClautYwxPaDISLaAtJj6gRCIm1kUyPUgsQIldtJtdHq/uFxFVbSnkkrhdo2rS5DPdQ/Y4SV20xx3vkc2GcuGqrme5ld8M4LaJNZ7m3+hlSnIpUbT/l3uZZARFpjCmXZRNtSO9phxFvhh7DeDP2GNJN7jGUm7nHsN5wj0FupMegN9plRADsMwwA1GeIAGOfIQGkPsMEkPsMBWDuM6wA3GfYALY+gwBIn0EBtNMYug2I3Yah10DUaxi7DTH+b0POn1KU+VOKlXsN/DHF1m0Q+fjvY5iP/z/+999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///3333///ffff//9999///92AQA=";

  // src/assets/sphere_tx.webp
  var sphere_tx_default = "data:image/webp;base64,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";

  // src/assets/lib.js
  var LIB = {
    atlas_state: atlas_state_default,
    sphere_tx: sphere_tx_default,
    atlas_alt: atlas_alt_tx_default
  };

  // src/modules/loader.js
  var Preloader = class extends emitter_default {
    constructor(gl) {
      super();
      this.gl = gl;
      this.percentage = 0;
    }
    async load() {
      this.db = new db_default();
      const [atlas_state, sphere_tx, atlas_alt] = await Promise.all([
        await loadTexture(this.gl, LIB.atlas_state),
        await loadTexture(this.gl, LIB.sphere_tx),
        await loadTexture(this.gl, LIB.atlas_alt)
      ]);
      const loaded = {
        atlas_state,
        sphere_tx,
        atlas_alt
      };
      this.db.loaded = loaded;
      window.db = this.db;
      return this.db;
    }
    animateOut() {
      this.emit("out");
      if (this.el)
        this.el.remove();
    }
  };

  // src/modules/router.js
  var import_tiny_emitter3 = __toESM(require_tiny_emitter(), 1);
  var PARSER = new window.DOMParser();
  var R = class extends import_tiny_emitter3.default {
    constructor() {
      super();
      this.host = window.location.host;
      this.wrapper = document.querySelector("[data-route]").parentElement;
      this.cache = /* @__PURE__ */ new Map();
      this.pending = /* @__PURE__ */ new Map();
      this.setup();
      window.onpopstate = (e) => this.onPop(window.location);
    }
    setup() {
      const dom = this.wrapper.querySelector("[data-route]").cloneNode(true);
      if (!this.current) {
        this.current = {
          path: window.location.pathname,
          links: [],
          route: dom.dataset.route,
          dom,
          data: {
            title: document.title,
            meta: {},
            href: window.location.href
          }
        };
      } else {
        this.current.path = window.location.pathname;
        this.current.dom = dom;
      }
      this.current.links = getPageLinks(this.host, this.current.path);
      this.current.links.forEach((link) => {
        link.addEventListener("mouseover", this.onHover.bind(this, link));
        link.onclick = (e) => this.onClick(e, link);
      });
      this.cache.set(this.current.path, this.current);
    }
    onPop(target) {
      const data = getCache(this.cache, target.pathname);
      this.initTransition(data);
    }
    async onHover(link) {
      const cacheCheck = checkCache(this.cache, link.pathname);
      if (cacheCheck)
        return;
      this.pending.set(link.pathname, fetchAndParse(link));
      const page = await this.pending.get(link.pathname);
      this.pending.delete(link.pathname);
      this.cache.set(page.path, page);
    }
    onClick(e, link) {
      if (e)
        e.preventDefault();
      if (link.pathname === window.location.pathname)
        return;
      this.onLinkClicked();
      this.current = document.querySelector("[data-route]").style.pointerEvents = "none";
      const data = getCache(this.cache, link.pathname);
      if (data === null) {
        this.pending.get(link.pathname).then((data2) => {
          console.log("no data, waited");
          this.initTransition(data2);
        });
        return;
      } else {
        this.initTransition(data);
      }
    }
    onLinkClicked() {
      this.emit("T_CLICK");
    }
    initTransition(next) {
      this.emit("T_START", this.current, this.next);
      this.wrapper.querySelector("[data-route]").remove();
      this.wrapper.appendChild(next.dom);
      this.current = next;
      this.emit("T_END", this.next);
      updateDom(this.current.data);
      this.setup();
      this.emit("T_DONE", this.next);
    }
  };
  function updateDom({ title, href }) {
    document.title = title;
    window.history.pushState({}, "", href);
  }
  async function fetchAndParse({ href, pathname }) {
    const page = await fetchPage(href);
    const parsed = PARSER.parseFromString(page, "text/html");
    const parsedDom = parsed.querySelector("[data-route]");
    const pageData = {
      path: pathname,
      links: [],
      route: parsedDom.dataset.route,
      dom: parsedDom,
      data: {
        title: parsed.title,
        meta: {},
        href
      }
    };
    return pageData;
  }
  async function fetchPage(href) {
    const response = await fetch(href, {
      mode: "same-origin",
      method: "GET",
      headers: { "X-Requested-With": "Router" },
      credentials: "same-origin"
    });
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    }
    window.location.href = this.location.href;
  }
  function getPageLinks(host, currentPath, domelem = document) {
    const selector = `a:not([target]):not([data-router-disabled])`;
    const pageLinks = document.querySelectorAll(selector);
    const links = [];
    for (const link of pageLinks) {
      if (link.pathname !== currentPath && link.host === host) {
        links.push(link);
      }
    }
    return links;
  }
  function checkCache(cache, route) {
    if (cache.has(route)) {
      return true;
    } else
      return false;
  }
  function getCache(cache, route) {
    if (cache.has(route))
      return cache.get(route);
    return null;
  }
  var Router = class extends R {
    constructor() {
      super();
    }
    initTransition(next) {
      this.next = next;
      this.emit("T_START", {
        current: this.current.route,
        next: this.next.route
      });
    }
    removeCurrent() {
      this.wrapper.querySelector("[data-route]").remove();
    }
    addNext() {
      this.wrapper.appendChild(this.next.dom);
      this.current = this.next;
    }
    swap() {
      return new Promise((resolve) => {
        this.removeCurrent();
        this.addNext();
        this.finishAndReset();
        resolve();
      });
    }
    finishAndReset() {
      updateDom(this.current.data);
      this.setup();
    }
  };

  // src/modules/state.js
  var state_default = class {
    constructor() {
      this.s = {
        free: true,
        trigger: false,
        instance: false
      };
    }
    set free(value = true) {
      this.s.trigger = false;
      this.s.instance = false;
      this.s.free = value;
    }
    set trigger(value = true) {
      this.s.free = false;
      this.s.instance = false;
      this.s.trigger = value;
    }
    set instance(value = true) {
      this.s.free = false;
      this.s.trigger = false;
      this.s.instance = value;
    }
  };

  // src/app.js
  var App = class {
    constructor() {
      this.body = document.querySelector("body");
      this.load();
      this.state = new state_default();
    }
    async load() {
      this.gl = new gl_default();
      this.router = new Router();
      this.router.on("T_START", (data) => this.initTransition(data));
      this.gl.events.on("clicked", (data) => this.initTransitionGl(data));
      this.loader = new Preloader(this.gl.gl);
      const loaded = await this.loader.load();
      this.init(loaded);
      console.log(window.App.state);
    }
    init(loaded) {
      this.instancesLinks = loaded.config.instancesLink;
      this.gl.init(loaded);
    }
    update() {
      window.requestAnimationFrame(this.update.bind(this));
    }
    onResize() {
    }
    initTransition({ next }) {
      this.gl.scene.toggleMovement();
      this.router.swap();
    }
    initTransitionGl(id) {
      const link = this.instancesLinks[id];
      this.router?.onHover(link);
      this.router?.onClick(null, link);
    }
  };
  window.App = new App();
})();
