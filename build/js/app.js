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
  var import_tiny_emitter = __toESM(require_tiny_emitter(), 1);

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
    getViewSize(ratio) {
      const height = Math.abs(this.position.z * Math.tan(this.fovInRad / 2) * 2);
      return { w: height * ratio, h: height };
    }
  };

  // src/modules/gl/mat/grid_points/vertex.vert
  var vertex_default = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec2 position;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float u_time;varying vec2 v_uv;void main(){vec3 pos=vec3(position.x,position.y,0.);vec4 mPos=modelMatrix*vec4(pos,1.0);vec4 mvPos=viewMatrix*mPos;gl_PointSize=4.;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=vec2(0.,0.);}";

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
      this.position.x = -points.offset + 0.5;
      this.position.y = -points.offset + 0.5;
    }
  };

  // src/modules/gl/mat/grid_quads/vertex.vert
  var vertex_default2 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 uv;attribute vec2 a_offset;attribute float a_state;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;uniform float u_time;varying vec2 v_uv;varying float v_state;void main(){vec3 pos=position*1.;pos.x+=a_offset.x;pos.y+=a_offset.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=uv;v_state=a_state;}";

  // src/modules/gl/mat/grid_quads/fragment.frag
  var fragment_default2 = "precision highp float;uniform sampler2D u_t1;varying vec2 v_uv;varying vec4 v_color;varying float v_state;void main(){vec2 state_uv=(v_uv*.5);state_uv.x+=1.-v_state;state_uv.y+=.5;vec4 img=texture2D(u_t1,state_uv);gl_FragColor.rgb=img.rgb;gl_FragColor.a=1.0;}";

  // src/modules/gl/mat/grid_quads/index.js
  var grid_quads_default = class extends Program {
    constructor(gl, { atlas_state }) {
      super(gl, {
        vertex: vertex_default2,
        fragment: fragment_default2
      });
      console.log(atlas_state);
      this.transparent = null;
      this.cullFace = null;
      this.uniforms = {
        u_time: { value: 0 },
        u_t1: { value: atlas_state }
      };
    }
    set time(t) {
      this.uniforms.u_time.value = t;
    }
  };

  // src/modules/gl/grid-quads.js
  var grid_quads_default2 = class extends Mesh {
    constructor(gl, { points, planes }, { atlas_state }) {
      super(gl);
      this.gl = gl;
      const ig = new Plane(this.gl, 1, 1, 1, 1);
      this.geometry = new Geometry(this.gl, {
        index: ig.attributes.index,
        position: ig.attributes.position,
        uv: ig.attributes.uv,
        a_offset: { instanced: 1, size: 2, data: planes.array },
        a_state: { instanced: 1, size: 1, data: planes.state }
      });
      this.frustumCulled = false;
      this.program = new grid_quads_default(this.gl, { atlas_state });
      this.position.x = -points.offset;
      this.position.y = -points.offset;
    }
  };

  // src/modules/gl/mat/grid_is/vertex.vert
  var vertex_default3 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec2 position;attribute vec2 a_rand;attribute vec4 a_id;varying vec4 v_id;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float u_time;varying vec2 v_uv;void main(){vec3 pos=vec3((position.x+a_rand.x-.5),(position.y+a_rand.y-.5),0.03);vec4 mPos=modelMatrix*vec4(pos,1.0);vec4 mvPos=viewMatrix*mPos;gl_PointSize=22.;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=vec2(0.,0.);v_id=a_id;}";

  // src/modules/gl/mat/grid_is/fragment.frag
  var fragment_default3 = "precision highp float;uniform bool u_id_toggle;varying vec2 v_uv;varying vec4 v_color;varying vec4 v_id;void main(){if(u_id_toggle){gl_FragColor=v_id;return;}gl_FragColor.rgb=vec3(.9,.2,.3);gl_FragColor.a=1.;}";

  // src/modules/gl/mat/grid_is/index.js
  var grid_is_default = class extends Program {
    constructor(gl, options = {}) {
      super(gl, {
        vertex: vertex_default3,
        fragment: fragment_default3
      });
      this.transparent = null;
      this.cullFace = null;
      this.uniforms = {
        u_time: { value: 0 },
        u_id_toggle: { value: 0 }
      };
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
      this.mode = this.gl.POINTS;
      const idArray = this.setupPick(number);
      this.geometry = new Geometry(this.gl, {
        position: { size: 2, data: instances.array },
        a_rand: { size: 2, data: instances.rand },
        a_id: { size: 4, data: idArray }
      });
      this.program = new grid_is_default(this.gl, {});
      this.position.x = -points.offset + 0.5;
      this.position.y = -points.offset + 0.5;
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
      this.squares = new grid_quads_default2(this.gl, { points, planes }, this.loaded);
      this.squares.setParent(this);
      this.is = new grid_is_default2(this.gl, {
        points,
        planes,
        instances,
        number: this.config.grid.inNum
      });
      this.is.setParent(this);
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
        ex: -0,
        ey: 0,
        ez: 800,
        canMove: true,
        lerp: 0.1
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
      this.renderMovement();
    }
    toggleMovement() {
      this.mvmt.canMove = !this.mvmt.canMove;
      console.log("toggle movement", this.mvmt.canMove);
    }
    renderMovement() {
      if (!this.mvmt.canMove)
        return;
      this.mvmt.ex = clamp(-50, 50, this.mvmt.ex);
      this.mvmt.ey = clamp(-50, 50, this.mvmt.ey);
      this.mvmt.ez = clamp(3, 70, this.mvmt.ez);
      this.mvmt.x = lerp4(this.mvmt.x, this.mvmt.ex, this.mvmt.lerp);
      this.mvmt.y = lerp4(this.mvmt.y, this.mvmt.ey, this.mvmt.lerp);
      this.mvmt.z = lerp4(this.mvmt.z, this.mvmt.ez, this.mvmt.lerp);
      if (this.gl.camera && this.mvmt) {
        this.gl.camera.position.x = this.mvmt.x;
        this.gl.camera.position.y = this.mvmt.y;
        this.gl.camera.position.z = this.mvmt.z;
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
    }
    onWheel(e) {
      if (!this.mvmt.canMove)
        return;
      this.mvmt.ez += e.deltaY * 0.02;
    }
    onMouseMove(e) {
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
      this.renderer = new Renderer({ dpr: 2 });
      this.gl = this.renderer.gl;
      this.gl.clearColor(1, 1, 1, 1);
      this.wrapper.appendChild(this.gl.canvas);
      this.camera = new camera_default(this.gl, {});
      this.gl.camera = this.camera;
      this.camera.position.set(0, 0, 100);
      this.resize();
      this.events = new import_tiny_emitter.default();
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

  // src/assets/lib.js
  var LIB = {
    atlas_state: atlas_state_default
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
      const [atlas_state] = await Promise.all([
        await loadTexture(this.gl, LIB.atlas_state)
      ]);
      const loaded = {
        atlas_state
      };
      this.db.loaded = loaded;
      return this.db;
    }
    animateOut() {
      this.emit("out");
      if (this.el)
        this.el.remove();
    }
  };

  // src/modules/router.js
  var import_tiny_emitter2 = __toESM(require_tiny_emitter(), 1);
  var PARSER = new window.DOMParser();
  var R = class extends import_tiny_emitter2.default {
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

  // src/app.js
  var App = class {
    constructor() {
      this.body = document.querySelector("body");
      this.load();
    }
    async load() {
      this.gl = new gl_default();
      this.router = new Router();
      this.router.on("T_START", (data) => this.initTransition(data));
      this.gl.events.on("clicked", (data) => this.initTransitionGl(data));
      this.loader = new Preloader(this.gl.gl);
      const loaded = await this.loader.load();
      this.init(loaded);
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
  new App();
})();
