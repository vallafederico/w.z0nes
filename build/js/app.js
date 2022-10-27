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
      this.position.x = -points.offset + 0.5;
      this.position.y = -points.offset + 0.5;
    }
  };

  // src/modules/gl/mat/grid_quads/vertex.vert
  var vertex_default2 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 uv;attribute vec2 a_offset;attribute float a_state;attribute float a_rand;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform mat3 normalMatrix;uniform float u_time;varying vec2 v_uv;varying float v_state;varying float v_rand;void main(){vec3 pos=position*1.;pos.x+=a_offset.x;pos.y+=a_offset.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=uv;v_state=a_state;v_rand=a_rand;}";

  // src/modules/gl/mat/grid_quads/fragment.frag
  var fragment_default2 = "precision highp float;uniform sampler2D u_t1;uniform sampler2D u_t2;uniform float u_a_inOut;varying vec2 v_uv;varying vec4 v_color;varying float v_state;varying float v_rand;void main(){vec2 state_uv=(v_uv*.5);state_uv.x+=1.-v_state;state_uv.y+=.5;vec4 tx=texture2D(u_t1,state_uv);vec2 rand_uv=(v_uv*.5);rand_uv.x+=.0;rand_uv.y+=.5;vec4 alt_tx=texture2D(u_t2,rand_uv);vec4 final_tx=mix(tx,alt_tx,u_a_inOut);gl_FragColor.rgb=final_tx.rgb;gl_FragColor.a=1.0;}";

  // src/modules/gl/mat/grid_quads/index.js
  var grid_quads_default = class extends Program {
    constructor(gl, { atlas_state }) {
      super(gl, {
        vertex: vertex_default2,
        fragment: fragment_default2
      });
      const { atlas_alt } = window.db.loaded;
      this.transparent = null;
      this.cullFace = null;
      this.uniforms = {
        u_time: { value: 0 },
        u_t1: { value: atlas_state },
        u_t2: { value: atlas_alt },
        u_a_inOut: { value: 1 }
      };
    }
    set time(t) {
      this.uniforms.u_time.value = t;
    }
    set inOut(val) {
      this.uniforms.u_a_inOut.value = val;
    }
  };

  // src/modules/gl/grid-quads.js
  var grid_quads_default2 = class extends Mesh {
    constructor(gl, { points, planes }, { atlas_state }) {
      super(gl);
      this.gl = gl;
      const ig = new Plane(this.gl, 1, 1, 1, 1);
      const random = getFloat32RandomValue(
        window.db.config.zones.length,
        2,
        true
      );
      this.geometry = new Geometry(this.gl, {
        index: ig.attributes.index,
        position: ig.attributes.position,
        uv: ig.attributes.uv,
        a_offset: { instanced: 1, size: 2, data: planes.array },
        a_state: { instanced: 1, size: 1, data: planes.state },
        a_rand: {
          instanced: 1,
          size: 1,
          data: random
        }
      });
      this.frustumCulled = false;
      this.program = new grid_quads_default(this.gl, { atlas_state });
      this.position.x = -points.offset;
      this.position.y = -points.offset;
    }
    render(t) {
      if (window.App.gl.camera.position.z < 30 && window.App.gl.camera.position.z > 5) {
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
      if (window.App.gl.camera.position.z < 5) {
        if (!this.isNearNear)
          return;
        this.animateNear(false);
        this.isNearNear = false;
      } else {
        if (this.isNearNear)
          return;
        this.animateNear(true);
        this.isNearNear = true;
      }
    }
    animateNear(isNear) {
      this.program.inOut = isNear ? 0 : 1;
    }
  };
  function getFloat32RandomValue(length4, size = 1, floored = false) {
    const array = new Float32Array(length4);
    for (let i = 0; i < length4; i++) {
      let val = Math.random() * size;
      if (floored)
        val = Math.floor(val);
      array[i] = val;
    }
    return array;
  }

  // src/modules/gl/mat/grid_is/vertex.vert
  var vertex_default3 = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\nattribute vec3 position;attribute vec2 uv;attribute vec2 a_pos;attribute vec2 a_rand;attribute vec4 a_id;varying vec4 v_id;uniform mat4 modelViewMatrix;uniform mat4 modelMatrix;uniform mat4 viewMatrix;uniform mat4 projectionMatrix;uniform float u_a_inOut;uniform float u_time;varying vec2 v_uv;varying float v_a_inOut;void main(){vec3 pos=vec3((position.x+a_pos.x+a_rand.x-.5),(position.y+a_pos.y+a_rand.y-.5),0.03);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=uv;v_id=a_id;v_a_inOut=u_a_inOut;}";

  // src/modules/gl/mat/grid_is/fragment.frag
  var fragment_default3 = "precision highp float;uniform bool u_id_toggle;uniform sampler2D u_tx;varying vec2 v_uv;varying vec4 v_color;varying vec4 v_id;varying float v_a_inOut;void main(){if(u_id_toggle){gl_FragColor=v_id;return;}vec4 img=texture2D(u_tx,v_uv);gl_FragColor.rgb=img.rgb;gl_FragColor.a=(1.-v_a_inOut);}";

  // src/modules/gl/mat/grid_is/index.js
  var grid_is_default = class extends Program {
    constructor(gl, options = {}) {
      super(gl, {
        vertex: vertex_default3,
        fragment: fragment_default3
      });
      const { sphere_tx } = window.db.loaded;
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
    render(t) {
      this.squares?.render(t);
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
        ex: 0,
        ey: 0,
        ez: 800,
        canMove: true,
        lerp: 0.1
      };
      this.a = {
        isNear: false,
        nearValue: 30,
        isInstanceNear: false,
        instanceNearValue: 25
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
      this.mvmt.ex = clamp(-50, 50, this.mvmt.ex);
      this.mvmt.ey = clamp(-50, 50, this.mvmt.ey);
      this.mvmt.ez = clamp(2, 100, this.mvmt.ez);
      this.mvmt.x = lerp4(this.mvmt.x, this.mvmt.ex, this.mvmt.lerp);
      this.mvmt.y = lerp4(this.mvmt.y, this.mvmt.ey, this.mvmt.lerp);
      this.mvmt.z = lerp4(this.mvmt.z, this.mvmt.ez, this.mvmt.lerp * 0.5);
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
      this.renderer = new Renderer({ dpr: 2, alpha: true });
      this.gl = this.renderer.gl;
      this.gl.clearColor(1, 1, 1, 1);
      this.wrapper.appendChild(this.gl.canvas);
      this.camera = new camera_default(this.gl, {});
      this.gl.camera = this.camera;
      this.camera.position.set(0, 0, 100);
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

  // src/assets/atlas_alt_tx.webp
  var atlas_alt_tx_default = "data:image/webp;base64,UklGRsQQAABXRUJQVlA4TLcQAAAvN8QNAeWwbdtIklbTf9V78214UURMAPdZBk413uR7juIDtgBUSwx6k6tb1iyjGuZYjSQXpWxKWYoWGZuP9hrbocn5ju8K598al7da2/M227atEDYIGwRDEIQwiBjYDBQGMYOYQcpggxAz2CAIwvr3/KicddV5ntcV0f8JAArE338UEUmt2t46kvRBMARBCARBCARBMIMxgzEDN4MMA0FIMxAEQ/Dcdrdyqc/Z/hXR/wmQVdtOGFiRgAQkICESKgEJSEACDloHDwdIqAQkRMLMPCD0+66sNqL/E4D/97///vvvv//++++//2/8RayG3j//fcb60e1nnnabDe3z3/uUajWc1+e//1qU8+e/rzclqyHGrxTHYTUwv24IVoP3XymI3jeIzdCJ+ruGRnSbDc1sqDbDSXS9a8hE+V1DJIrvGpiIzYZgM3gibzM4ImczEBGZDDKIxdCHbjG0oZkN1WI4h8tiyEO2GNKQLIY4RIuBB7YYwuAtBjc4i4GmBkOfdXuhzW57oc4ue6HMir2QZwnyjDtxFiHPucMzthfCzNsLtDQXZNURr1CnrW5roa4uayGvMuLdqBNXEfEqdXjF1oJfecR7UIeUYivcmg54B3OaptoKRVMAL5iTNNFWYE0AvGSO0zjA68QRUgvegbhN1+DOmFN0Be4W5iRdgrvCHNYFuLsxx+kc3G3EEdrsaPcgTtupaHcQJ+9ktAviHDsH2n2IE3Y82nXeCG0L2IG3ba9i3UKcslewrhDn2DuwrhLH7zmse/Cm04Md6n55U5+4oC54k55IUNd5w08EqANtOz0qQLfwxp+pQHfjTX4mAd3GG32GgW6nTcfDgnNBG39VxblOm/yqbZoz0HZ5lU9zhTaBl+cst9GmvW6f5Xba2Otus1zQRl5ns1xnjePAmOMMrM1HbHNcoc1yhM9xG2sCh4bGrA420fHLmnrMQ2MVgxU6PqzRY4rGcjABOkHawMGpsIrBVjoW1rSjHgrL0SgdlTV6VBFYxWA76NxJEzg89JWjaXx8SFOPe8irYrTGB0grx5m8cjiJjkKaHScMcVWM9gfo3EhjZ9i0ZTkc4+OXNHIG69JqGK7wkZxpOOWuLMdwHXQ6OKvnKMo6xmN83DgTOGnoyjHexMfOGTvLpqscTwOfwRk5i3VVVYx35cNA2YbTPkTlOZ4An4Uzch4X1YHxNkIelHGcOCS1YMBKSFBmPVORVA4oQCgYGzh1CKphwEYIU8bOVfTkGLEQsjMmcPKQU46ogdBgjJ2tqqlhxEqIgbCB06eWHCMOEHpjjJ2vSslySMbIQZjABVNJTwxZGEnC2BWKkCqG3ECog6+BS4aMPMckjFTC2DWKjBJDdjD6yxfHRUNEDWM2Sjpf5CquoYoxBxgtoGvDZXcFeR+UUXLQJeQ61vVjiTFHoiTpknHhTT9vDPo7GF3A1sClQz0NoxZKNrrItRbxrBh1A6XBloqLP6Sz9GEJJQ6yRrqapXA8MeoGSitbDJcvurHEsIWTIEvFDe6yOTHsBkoNXI10B5aieWHcwkkli+AWF800jLuB01+uFNzkppiGgQsnBqp+4jZDLw0Db+C0UiXkPjzV0jByIeWXKoobLWK5Y+QNnBqYWnCrm1TuGHkIKZUpG272EModQy8gNYgS6W7sI5M7hh4g1cHTENyup0juGLuxUomy4IaXLpGGsQdY/fDEcMtVIQ2DV1YcNC246Yc+GgbfwOpOk4LbfqjjhdELLcmSght/SMMCoy9gtYCj3XDrVRh+YvSRaDk4EgtufklVeGL4BlYdFP0U3L6nJkrH8DfQWinykfAG7a2IFRdQePkwJONNPvTwxAUsoHUBP0PxNktqwQMXMMDrwQ8XvFH/KGFJXEElJumR8WYfOlhxCRt4rSBnLHi7nhqwJy5hCDEfctSEN2y7AjxxDQ28LqBmKN50TfqtHdewgdiDGiXhbdvOPXvhIoYQ4yCmL3jrnsQriatoILbyome8/S1Z98RlbGA2aVETCPSDcsuJyxjCTAUpXUCiB99WXMgVzAYnXEFkTa4tJy5kBbMORoaCzJo8s4YrGaD2IEQYCK1JspK4lEKNg45uILUmweyJa1lAbWODK4itya6141pu4Da54Apyb8GsEriYIdxUELEXAcF+sMoPXE4Ft8kDzwkke01CWeu4nAXcVpCwVwXV5WBT7bieG8hNDnhOoNvrh0jlxAUNIaeAgF4SSPc9OVQCl1RAbnx9URTUlyPpUwLXNIPcBd+9F8UElj2ZUwIXtYLd45vzLJjGZQvSqA9WA+zKmPWoa8Jkej2SLuqD1hB6Pqasb1kwqcsWnScpxyB2AbsyprtvWTG5ZYvOkPStD2Yz6P2Yq2h5wSSX7R3Phm6D2wJ6ZUxz3+qaMNmyVu/PRMo+yN3A78cUxVZWwbQva/H+MGjtg91I/MiY3O41LwkPYNJcvT8D6ZsPfkPA78e09NiqLQkPY9JcfZ+6tPpguAv4lTGfsbdiKng0Ra1s3idMWx8cryDY5yH2VrOp4FFd1ErdPCZJax8sFxCsg/sevrWSTSXh4U2LWi7NPfqkJG198FzAcHDVI3bfWivFTBdJeKiTqJqV0pq7R8yAZO+D6QqGbTAoXXu36b9zzLmUbGar6iIiePBFRFVXM8ullNL+9H+Mf9spSVpjkP0BioOOttzT52/5b9vfdm40ex90fyaKbLAd4e6tlWKmKumpSrKoWSmtbb5H9EHhBZJm74PxSKA46PrvPdxbyaZLenqSqOXSNo8+OD2ZWN0H6yGguI2pDN9qMV2eFVHLte0x+D2PWPU+iA8Bxd7n4l9234qpPBuiVtoeg+gzyJrb3gf5IeD4wOTuXrOmpyEtVrfog+8jkqy5bjGmMAQcO77j7jVregLSkqv3Qft/E1Gz0ra9j4kMAcnvL+nv3cu6zJusZYtBfvmzttY294g+pjQEJFd8393rKrOV1rr18f9oCFjOL+yvsWWdpWV7xfj/NAQsN3zz3bPOTtneHVINAcueX92f3fMyK769O9QaApoPUDCayWzYbU8INgQ0O3joeZkH3wKaDQHPSYQxRlSdgdICqg0BzxV0jKbclZbQ7aeAZ08+jDGiCmvWAsr1BKIPsHI34cu2gHY/wHQBM5tyVfYO8RZQndQYI0xYsi0g3wKqG/jZhCFvHfo1UO2gqK/slICAu4Lr4MgYYcyUgIJDwHUFT8NYqQEJfwq49iTKGFGvSE1o+COB7ANkzXo1SkLEBWxX8DXrlSgBEXcD256EAcKvggdUHAvoPkDal18Be0LGnwK6K2ib2/jWDhlX8O3JGyB9bEtAxxmEH+Du08ZlDTqOBYRXsDfrqEpCx55AuCd9gKeNyJ4QcgHlBxicPp4loeOuoHwFidtoVgjZBZR7ZxE+PhIPCLmA9BM8zjKOktBxKEhvoHIbxQohbwmkO8j8thHYCzruGaxbsgnpf5+f0PGngPYDfM7lr1sSOi7gvYLS97/t3iHjUPDunVNof1mDjmsC8QlWt7+rQcahYL6B1+2vapBxTWC+gtn3e7pDxaGg3pNafbmjBSouCdwnuB1yP54icgH5T7B7T3djCQlLBvsr+N3u5g0JtwT2vRNs5HtpUHAo6LcExfVOCgTcCybwDY6H3IengJpgAhtY7vdxQr6umMEbeJ7vokG9PWMKPYk2lntwiLeXhCm0BNMj3YGleJpgEt/g+vc7eEK6rpjFBrbr9SqU64ppXEH3SFezFE6smEfvfBvlak/INgwT6QnGL9dyqLaXhIm0BOX9WimaXhKm8gXS5yutkGwvCXPZwPqeruOpmMgJk7mC99+vc0Cvu2E6C5gvV3HI1RXz6Z16fpVQiysm1BPc12tUSLXXBTNqCfL7NVIpvSTMaYD+eoUKnfqKWX2C/3GFVEmvimltUKCdr0KjURLmtUGCcb6UiCtmdoUI7WwV+txLwtTeoEI/W6qjV8XkLl0GQ89VoU23hNn1Dh36uVIZXhLm1xNK1DPdIMteFDPsCSn6mUIUvSrm2BNilPM4FNmrYpY9ocZynkMPURTzbCfk2NNZHGL0IphpOyHIfJaqhL5ZwlzbCUX6WVIGe1VMt53QpJ6jQIK9WcKE2wlR1nMc/OtbXjDndkKVPZ3Bwf2+ZcW02wld5jNU4kXLC2beTgjTz/DhXPe6Jky+nZBmOs5B975XW/AA2gltluN2qnWvtuAhtBPi9OOSZH1veRU8iJ6Qpx5VQO/Yal4FT6Mn9FmOOnjV963mVfBMekKgcVTSKfatFVsl4cn0hET1mAICR+zeWim2qiQ8oktCo+WYnS/291VVVUQSHtilQ6R+TPIFz++9Q6ZyxIL5ZoVQ8xHbfNOgVD8ippsGrabXOWabF8S6vq5ONnZCrfV1x1zjCbnG63Kq8YRg5VULZprSodj8qm2mWaHZH6+KiaZBtP1VfZqxF2Sr/5iCWcZP6Db/Y7ZZZkkI98c/JiaZe4dy+z+mzzEN4g1P8A/C2AvqTU8khPET8j2fqABTOvTbn+j4skLCbs//oIu9oOFj70AXPyHislfApXSouO41bGnQsewJslhAyX4n/ADLkpDysXMAywox550MK/aGmutOQ5UlIee+I6CyQtFO534gxQKSDjqGlJLQdNIlRHlC1UVX8MRPyLrpGpysHboWnYCJvSFtp3E/WFIS2g4ahhJ7Qt1Rk5CkJORdNAVInhB41TQYWU4ovGtuFGnQuGh+MGQ5oXK/8hBiDTrnFSNISQg9riJ+2BNSz6sMHyWh9XNVwcPeUPu9atixdsi9rwQ5PKD41Q9uWIPm/SzgRkmInmeMGh6QfZxFzLDWofs0y5BREsovswIYHtD+OatwYQ3qv2cNLdYO+fdZx4oSmAFnP0jhgTnQDQ4o7IlZ0A8BJqx1TIM8MErUxEQYh4gRJTAVpiEhRAlMhnnI+FAC0+E5XOjgBybEOjRs8ANTYoMHax1zYh86LljrmBVlEFSw1jExDj+YYK1janREDhL8wOzoiTwglAPzYyBiOCiBGZLxoATmyEgUoaAGZkkssNYxT2aijALWOmZKHChvTJavn59jBrgFpsspwFrHhPn78xPiK0fHlBnisy0wa36k561j3syfn1RdCUydsrPWMXn2nx/ozW6BCVRwZe+YQtVmW2AWdRealcBEKrSyd0ylKltax2y6FIFZC0yoRV62BeZUcdkWmFZvN13ZFphZaxWVb4HJVVOlfTC/6snK3jHFbpuUbIuOWfbx0FFpgZlWRVZfHZOtgqzsH0y48ilbdMy5r0M4y/bumHdls2zvjrlXMVa26Jh/1WK3PTrmYKFY2V6Jifg3JOJ1/2A2DnksdY+OGVkZVrbXp2Na1oQtdX8nJmc1pKXu78QUrQNZc91iTNT8S8ua6xbj6/WHdrJYrtvex5ftTK7Jslqp2x7j6zfBRHS1XFrz6OMrOY/8lFXVzHIprTX3iPF1nT+4///++xDT+39r+H//f/73///977///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv/0KAA==";

  // src/assets/sphere_tx.webp
  var sphere_tx_default = "data:image/webp;base64,UklGRmiBBABXRUJQVlA4TFyBBAAvN8QNARmHjeTGDUjxyOPB6r/gN0gFEf2fAPv/zMxgRMTbGJvcBsmIl/HAbcTVOOQdIy7G9lS1ARlxGKO7D8ViFZ0OJ8M3vR/DMotVRS5ssuOu27KqSLLK3bsboJuZn4CqImv1XoGmmfUWIAQJWLjrBt3MF4CEVqhKOHW7OZsgQOgICX0EFgIkIRwk9RYr3UluoEucuqGNROi6Dw1I7snUK3ZYN+sdGhe6yAtgYDS68ZSZkgADMHDWi6247mW68yQJMLuBdn4yMyvcH0K7UuJZ0vzcg7vMrDttF4/U+qTtHMPdPTbrIuhmHCIPkrDqOA4ekanEAkCX48IjJAl6HVceQT3P+eAe+TDnD9zN8jDn/L7v+8mvN3Br27aVzEFEARtQI/svz9js7PspQUHbNnLK9wAIhEJqJEmSnLSsmT2eDiH6PwEadjlOpzEG8Hi4++vxeCDGBjhw3Nmf4/EIEKAAuMARoTPGCITjBwBARAOMYdLBZAQiAII2v9xCn8EAQmegJnjTOAAEKgQIMSIABIArD8cAMIBA6IwR4akSAHAcA6R0GYAQAWzwARPsCxgIAEGIIQA8aIM2oLAUEACOY0QA2A4DQCAAVMDAMBnYGQYAAo01wyYDAG6ALQRgAEAgAFTAPyZrYKxgGEYFBCKAVQ1LAgQMkwcQQNinIWBUQAARALbTGcOCCCBssg1q/wAEAcAKAWCFEWbAbQEIq5/PdwWMsIEvRE6MMEboAZumGAgARlgvGKoxgACMYR3QA4gY2ARjhPtERCBcf4OrIbzZQbiD4xAOQsDVEFYh4HoAEELAvnogBgBSVVIkFUwBre72H/VpnxEigoHbto2kOG1vj1/8P7p57wFCwG3q3t22LUdICSizL9v+7rZtPucmAkAUmGT7IPqQc1apAICCYvpGDkG89yIUC4CpqqA+z0rOIfnskXJrkky7iqmG/5shiwpU9VmiiUoizJotq4Z9EbGSoPjgJQoKVQSMI3ceymERocYKVS1EIaIYCcD7zMxquDYosUCJVnNrscWWATxzncDyBxqUVqxqpUZqMmkrzOn4ESdsGDm2Vk20eLOwhvlwzhOgCVdgKaW1SibJjLEiM+P5Y6NkSShWgwZtmSQjmXS187jcJooWS2Ous7USwUyVhHgo1IkqmkEVi22mQTMVFBRSTMd1ucCdzSxZraWUBgBNu4qgjr90rjAzmiVYbK1pHyqoOjTV68dWb2VtkUYYvg/VMea4tFoRRTUZEWkYY4Q+pinJtcK1EmrvOefwS+prNJ3HymA0mW1Mfeg9LeMt+74HJiKTpZXex6rqLzf+h+l03Hzae2f7V32rv5EeM4uWx1mPvW2VW459kZLqsmXZtWy95XKruzvPpGmqKZ3yMLvck0c9F+eW4/qU3V3H6vXo7t7qg/urx/46+6Rz+/F59nIn516v57RG+z/fttxAtZjE1Gamzh8LWkxikpFaSC00oZaQh/9/715rnV21l8d+qjZTSIYnh1uNVh5/sNEOwchxKAgxV130ATcfB7CrDus0nMcPHC58U/Fw2I3BsXzS2MjDTUUpHLLBLwMFcNMQmhZv7FIoXeW5M/DQ2NE03qgzURoeYPObjNB0eGPHcnPoMjzJXOSpWTgSAABldDc3/39Sd7PpbmIC+FQDNW3bJqV//36aeYwwMM/zTM1zVfcX3M/7NfF8eOmFCITs8IxPC3thoq2wLg9XeKdn/ArAQQkgwwfrS78YC5eKdtAeqkoGg5hTFrOB9nBpYIYnxsOsAh/E20U7wANm3vi3cLroEB94wMIZl4/y0FaYKkPEpcFh20aOJN7d59B/t3arba+T/OH2mVE3cPQaZLVsvZfk2E2QSXJGiQnwU22bbNu27Zxzr3Lxp5on22h97is/fUiG+dtBoeJqHKo53d9e/MIdPALX4tHBVBSC13gsDOL3IW32IqAkCB4eos6wbSRFk+Pvv1eGMG0jSVI13lm+e/nn9vDmFRPgN/r/adsmSakaqMrsvXOC2oRV6I19X/z3iEBaU7juN9HqfSNmO9qFiTaAbRYTcOQnnhoRj0ysX2fGiWtsSPEmkE6ReFV2MAAdjSgf0LLE9oGdU0QvE0bCBDLwALnLgfGB4GcAWsvsXrRM4MGpXjagXtF+EO3GxOVHsv+cGBEVB9qf8oLlL44BbBbgwKy2bJcfrY1h+LBWxGkASwSBpI17/86HJABs2kYpyBhOJIcjtx3z/v+l7dijYwL8VgP2bNs2J/8v772L1H9V3nvvzRfc9/eH8mabFpQrVBEq5AjP+EwV7rEUjkLFghquAsie8El30qcGUkIW1bzpWwdnAYr4U1LXwkwLxGpCGeHVw0wxTIwp4+7ja4RFSDcUwFo7phZ6ICWlhxcTTQs7pipaoAO3Y6JRCSqClGq+PvYWIJC0me/f+W5t2zadHdu23eX/a3e2/RzcG+fGBGiV/v/9NkmZXXLOGRyc/xFszjl39+Tp7qd3ntRPP6lrnk6k//9uMjz/m/TSnMJUHwFpbCvyJLv9kV/9lSzuXTgsdjyxj+BHVvlPvld+yXAfAAq9dh3B5iNotzUaR638SXbOgKp2XXMQZGhH4VKr1uPQ7OcUqOYMHkVxBLciuCnc1P7tz64aNHetarnJzoH0fQorp1p+DgI9ikx7PKcAOkcX1cehJ2iOYFGjSDo9ciVVP73jCIexeQ+AakXOSSFzVFR9HbUSA2nbpPev+ZMkAGDaNmk7ZubtxLydt8/u1F6Zwxwz1pajmENmlFOMCeCT7b9t27aVc/wb5H7nXCG932ltLCy8MY4QUsJ/XC2UFEvVQw9nWuLtb6fTR9WFBRQVI8hqaU3RsNIjAiPDB+EvRRI6yFuMhaK0xChCzYowUTUICAr9Hw1NbSv59s9gAgPwnYXZTwoJ4E5MgJ/atkXbkiSonD9oE+79lgWhkzzilQ+Fhcs4mPjVJT9+W00eC1fyOGAuUuNhRCdSVysoLILFIykkZAJJm9m/8y8gKFHEBPjJ9nmybdt2ruq64s+vrivr1re1PtbSIwKvLXP7ghVm2NOV+ceVHI653LA3B5ERh+VODjLTF6PDLEimmzwWruQhM9BcDscWj8Ej+V0OSeYguv42D4fEYCBtm+z+Nb9MI9kO8mye/jaJTv8dgEXzC4Aa/pcXE+Cntm1n27bN0c8fkLwJFXnvvZR578153a8odAZCt9sfbZnoobBwXa0VhD+80xV80UNBGCpTXCye9OFx0KgmJsXjA7MpKKy4SIjImV401G4uP4ubxxcuHMVEZG4eC4OIKC4qMotERS8PGR6K31wQNgYDadtk96/5ZSLbdpPMW3x8QlM4NCwAH0vvvbheFZOZmAA/1bZZkmzb1lmLP+d98ahxKDwkTTS5KBgu5zDEUn958ks1eDiuwWOpi0eQLLV4TFydxxY/pClvCkbwUPjlA7J4GAYBQaH/owkIivwfLSaAT/b/t23bUqoA/37uHKK7gDtkd7I7cWtj7A3hjl4JFeGsh9+wnmXhZ4l0eDjhSn8x/iqdPlpIhhbEIOanByvEI/37WLqmjx3+lU4fTQESmxa0lI4TloduoBICSZv37/yp1LZtKPv/OM9N5g/Gpj6i6FXNignQW///el12s9YVMzMzMzMzM0vdKZRCZVJ2b6arSDIzMzP/f3sfrfXs/Z/ZW/QKjgtQaIZtChkyhgacPmN2yPRvwBXQidwExlPF5y4XMjWYGuAudAwlTPRL3YLoCRU7Zkgd3ugYCnAF2iXc5cwnNds51TCZI69bgulEWj7fEhwpNEPmFqaof7LNTic1Cbsw2w04ZgiZTgvmkCc0NaDl0KEqeKYE547Y8VRgvtOC6WlCa/4hRbItqpmZ598ErEEAewREQJwk78QE+Km2zZJk27baPPw539yz9wXhIeniLxeFH1dxmGJXP3nxm2ryMFybxwFjJFMNHh1X5zFFQ9p5OFJDOngYBgFBkf+jCUgS6f/nYgL8ZNt2SZJsW2vxB70P7tlzQ7hJmvjKScFwBYcSS/3lyW+rxSNwbR4bzE8yVOMxcCWPFl+kzsOQfjwmt+JhGAQEhf6PRiBpc9Y/840J8FNtmyXJtm2dyR/0uXhUzQXhIemiyZPCh6t4lPrLh8LGNdTB4yd5wBjJVJNH4uo8pmhIBw9Dajw2t8PDMAgICv0fjUDSZrd/58cEeMn+37dt23ae7V/URfeysARFQgz8zwa1jRkc9possOJh4SsoCrqHwEYLHhaurkGXj6Lr+thiqslGh48Oo2n6mPCndPn4KS0+tqC4OD6KBgJJm/n+na80kqRobvJPCXkShSUCMviJCfATybZt27ZtvXX5c36fNuZ+FJxkE6s8KSRck8MVp5rlw++oi0fBdZlVkkMdPAauxeOIGenkUZBmHpvb5pExTACBpM1u/86PCeCTbZsmiZKk6/AHPT+R1UPhJhliykXhwXV4pGpyUShcpTYPI7lgjGSqxSNwNY8SDenyMKTO4yA1DAKCQv9HG4GYAD/Ztk22bVtOzutKP1XxJ1bXpVXX0jJa63MfMbhJhtntQeHFIDiTgBB0N+xO4eDaMtNNDOEKlkAkmJ+LMHV38Qhcm8c0PwzCIFzJQeaLQZbQBY/BTSRk/RgEBIX+jwY5kiRFUqzbflF/3Zj5mM8sJsBP/m3Ttm2T0g14YCEas3kIyeaZsCNyrBNCOI/7fp73zVBvpT9HZYXpC+8UDVtMjqrRwX9ZEPQJ6LhtVIiHjcHap4d4N8nUw+vjVoG7J2PBFDECcICKtoCK9lTDJ6hMVIYEhIwVISDYRrat5L1XwXcHIteQAui/FyKXiQnwE8m2bdu2bdnlD/p8am1tzH0QBMkiDrlSSLgmhy12NckD5OZRaFeSU108JtGE9PLISBPtgmECRiAmwG/+bcu27Z8y7u64u7u7u0P/fTjbdhzn9Z/fMvbDPst0QExIAbRAI1MHdzw9Ybnl9m2G2NJfRhXE0wHh1gA1UIf7i/dCyrnQCHWQk2kDs/z7+JcxGdYR4T/GcvqhAKIpicxbcif7dUUFZDRBFw4lhANJkkxru59t29/W/Q/2IybAT61tmyRJ2tbFH/T8mEU1hU0yxJCTwkmwRVcN6fAwkg3GSLY6PJxkiSfSi0civZA6j8IgICj0fzQBSSL9/1xMAJ3+/x+9jdN7ojGNPwBlijZ5c6Z49GZt6WXr9Q7AbfkgecgYw390e14B8cX1IAiBW282LvMwjqymIF5ZzUOCfTyC68YvCk2XhiK4NH4JCUPKw+NAp/0xCAiK/B8NQdu2SbKfP+TGBHwOvvb/l/z/N/j/S4y/dflv3Bq/8v74X2+f/yr/q+3/D/g/1P7vRvk/tP4//dfwv9re/5L8l8h/gf996/++t572VP6L1Mus/+Xx/Bf9L2SO//E7/6Nn9+N/cZzL/5v/t//JPf/jZ/wv9uP//X9J9ysv+5f/3K++9Dcv/82b/19+9al//jdvv59Ev/LU0r6LyPBf0IjxH5gh7+NtFv0f0f5Qx0f7XMxrT8N/lBjHyDVd4//1P37W/3K/zz+Af4b/mdyf/5n8n/EHhN8f/zXQ/vSf+oX/5c//R795xT/3K2/91af953/6E8OE1scfGXUNMr5jKj/Gm3xYs86bmqxbLs+ew7k8zsg4c5yRq9Uqz5Gf4f5A4c//9v/ht/9A/Gf+/N/9238Nr9/iv5n/Av5Nza9mv1L1H/3qW//Uv4IKlAmj9ff4rFihD0/1I+8wZnktuNdE7Q816U8/l3lxxvHsz5Xx/3cN6/uHnw7a58Q50ckW6e91+e0/83f/6T8q/vYfjH/7r2H1O//N7/7C5Df4Lya/Sv+Fd4nuh5oMn769dUbUJ35S+1ne9W5i3OeNvKd1twd13hm39hTU8elPPxdzPxf/Ufi7/4Mw5uWoDplz7R1pon/KYQt5bj+T/574298r/unvkd/+9/01nn7nF8jv/Gu/mv4i+QuftNxTvSvWND61a6q3pt59iG580ijt6afVk0He5EPzVMZsio8MZfqvOuUa8wyX4x9vx/j/j/k0zyLLuUgTaUdHi+j43uLP3H0v+QPRHyU/y/2b/xpIv/sr2R/8wuQ3+c+0+t3jXZ/7fRodakzqraIb0/hEg/oc0/jUvNb5L5qnP2QUzFp5iLd87I/+yKi5pv70c/kHVzxXxvHsc47Tl4jqm3z/aQlpsU4hLaQz//U/gP7N/+afYf/q4r/7rxn0u//SH/zCwl/4heRXq+zP/dmyYgV9z5+gCQ3l3WRF16i30cOafvw0+g/Ta+XyKcj71Mhnf+inTg23H4s6n35qfy7/kHFxHlecIfrqWtJ1ndMh0odep4g+mrSYz86/+WfZf/PP9/oH0ffa/5o8v/O//qu//TPWvxOrvevdNdiTFcX7fEzUmF4rKic/fjLMa6ImNDLkw5qln4K5vh7qqHFv3vkI6tH1XKYzzjCPv8P3n3k/a541OR5p4XmjjyZtfW7pkD6arC6Z89/8b/r//H/+6vY/oP9r3PzOf/yLhd/+hfjPqmirvSuWuX2OmvXen43VvHvzTGgrvJ7GpzFRAurz9zr6E0NNy90PeZ/3pLxWRj5WniLvq+LTz57+4b+az/GPNUemlq6s6gnnqkX6aJ6Cp4iObM8QbdVyhvzp79n/nX955T8n37//L5D5texnbP7F3/6DP1vifO7R99SsUO+2otsT9dZQn4ZzdGheW37LqQ39XUH5bD90KBk1Vx790U9hrvtFyeD79FOo47PycZn7yd9yzVqqV83nnEtqzlWWtPAU0q4zvr1HdIin+bROltznT2P59/+iJ/7yKn9O3n//X9Dy3/6C8DNb/5k/+F193BUqKnrb0/7UfoLON9qa+9OeT/u0p9cyuebQQ3lz/tCNCRWo991XPf2RIfU0Hz3fMbj3Rz95y7j3R39Q59Mfe7o+l/2YqyblOT6tc0Q9R6Ql25NIC2mRvk7SR4t1ms+u7/Tbf/ovevIvKvF/+vf/o38Bym+Jv/3P/5mfsf3V6ca9JzR7ooLW0VZQYUXfJtS7Ilsf5jUZn20FtG4wGZ+aeuf55+ynn0LFs+5dD3nL0/WgZMhnTfqzPzftk7/P53JIq5gzxPN6RH1bC8kj0dk7TaTFqicy9RQdcmsn7s53nz+b7y8u8X/67/7llf4FJP/uz7T+2W1+ofBLwm/y0ChC3bZZsXs0H56jb592H7PebU2biYps5d0bl6lZzbvMkbNdkzGRwa19oIiPfvrJf1Gn1KOfIh/2p/ZHmVQ/+znPMaae71MmXRZPUr1E9NHSIn000SHrJD2f6/60StyiTtz69Ln37a+o/B/+FRX/T/+Nf+HHi17+r//jbX+Nxb7zJ9pp96C00EfX2D3sHtS7N/an9kzq3dZkm89UtHd9/lDzmuo9pvqhx4putE/KG3PdKBkZdd5Tf+inzJWPXY/KiM+uj1ODmmp/LuexSmeV8SQ6NZ++fE5IB+mj044WT6RDdHi6Tv3e+wh//Lvwo87e4i98/D/8Kyr9f/6jf+HGi47Cn3uC+KLgKObTpu2mQh1U1Nz36PuziN29KXN/aisU0Y2aaFZQn+2aGBNl+kFvPvwO8emnPXXe5IP2IW8Z8eknb+KzZs83ec9++tP/GOex1Dqt4ltHq2/9lEyt00RapIXn/iR5RHiSFp77U5/bviveQp97333qh9P/0X/4V1b9T/0P/4UXLzrR8U88BrtB/vtU4CehI4pm7ommRHFU9FH30z7tzz3VW288k32+afU5arrMCqjPH5yXqfmwrWlMZORtKvpR+f1UHqofVB7rtv498oZbe+q8K0M+zvC0hD66fPmcyvxkpFbXRJr/8PY8WrRIryLflvlsYZ19xB2I+kEc9+9Qv6LiTVT8R/+7/9ln8/lVX/rE3lHYmWn//7ocp09E8/neXTaCcu/53HvufkA5KkN97vZZYoViesw9PZOKevfGNamg3k6jv8eEMhk+2idDPvaHkiGfHrO8FrNo842oR6GcT7+nS4d4InMuUR0xPxnhSeImfXS0kJb51Bmf977FHz+hz92HfgdR79i3ivf6p+zJZ/Plc/nzGbx71Zf+sPfcY8PO0K8hhlVogRfNExXUsQ5UUI1JW0cFFau9C/OZfHurdx8n7EmFNbUXLSv0nwznNS+zYrU35w+r3hO+g4ya2pMy1KT2R94Z85//KBTnfe+Psj/hHR/y7f68R/p9Zs6rpVbXdc65JNtTiI48t5AWWSeeIu6g46tPn1sIdx/h7jj0G4Xp03v3h77DZ/PpS2c4xzkKPwZ/7o2hIWyuQxYjnBmY7Wk99iwHFYX7uW2z+bChb5P92Vaoz9H33J9qnN71bl1ztU8N9akZn2OugDbX9OdByXBrfHqOvJn92Z945+nP/ugPGTdtvjPyWbM/fko2ea3yV5xT4enq6qtDR2qee0daeGbv6FiVNvWcT+LeO85tb99vv0v9FfptfwXn7hMlULUE/z6fYW8/t39/7VVfOsLec48NPwq/LtchBui1WJ/CYiCsokS33VBRmqDCuf9IdLPPN/tTU97n9kmFFfXZ0FCiM6bXau/ybmsy5mreylT0fItBxVP97E9qmBUjb6bSD8UsFPuTz5r/t1N8S9RzKiNdyxlW9dWRdrS0SAtpkc77TAv9jjpxizpxB9H3T3ef/tp31Env1did2YdP2dPP6tPn2d+/9qUX/Afqf/rX/7rn//UfVK88nq7jWckh3zNmv4az1zpjbtykUVgn37mve6SG15KnP/TjazD/OdmZS51nzJuLvew/NMTbgULuz3wpJtd97r7I2Ky1/yLrsmy2kEXwENWrd6jvFaZpE5LaoaCkmwV5yHpZFVG1WdVy8m5memXPLO5Ytrlr/ZLv32r0R0v/8rL//X/5pwr878v/Xfm/+/d/J2OsbcL4vLzyMDHVzn9gcApOMffct+fec/9cd1ravZWn3QMVI+NrLrOGGHefr6XyD/Poo3B7nvmqykXV6EKWnOfv0xRMtNfAbXOdMyz2s/eHjXt/xT0liAn1Dr1qha71u1XpPNGrZGODxWL1TM/Glsl3KuMe6zsQewcPbVGTqf5us7+2/C+r89c1+Acd/0l/e2fpR+H/s+7/QnVdN9tNhuEoE/1cj0Ma4VxnWpzrPPa07z333IdqYdR5z57eyDuP5oO8ZTz/n1oSPM9h/vX2dP4204rIBUdf9oq5NSVY6Y12zGvNRsH+6A8qUau/12rdCBm0phehnb7m6evyPZnK2GmiKsmQhK/Frqpxc0R7iilK3xHiH+/+1yv/2uV/bcU/2PGfxLd3LPzkpKMRP5X9mjC7ixFPx9jM2ibujHHU46eRto9zjVtQ7bD5uW77Kecdn11PvKFyvfNhfxSSf2bObyuWGynsNXP9fbS3h+eer2oJZ73Nmbhwxep/sLqEDQf7CCPoKH90dalW32XoEpIdC2uptWS/pELqMX51mKmBNuwUJ3ZQq88p7LlG/KDqWnv+ovpvMf7Ldf8y3b/F5DfEfzLe3hNrHhtxJv2mcvAoBybyruu9vL1NvGc8h7G5qZYW7j0z5nbHdad922HPkt9P1kcG+dCP/sibPOvWczV58g9zkYvG2BL8/SxjyQ71Cb2XuxwNPdayvBaWnefa1zFra1Tc6761u7Remlq9uupW8AwuZNZCJ2pLy73wmfgiQvjSuVMz96RrRcZWsaI/8bW+O9BznHrx6/zvNv9rKv5Svf/jl9R/Wbf3TscQJ3ecwEAWwVgXvOl4jnxdd7mYQDjTYlJ7bhzjFucqeL6DfvLPJyPU82JEefSH2r2oxyiyW9Myl9fU+RsV4q/Wc42mnYLxetZ8cWL6vVHnfdZCwZf5SegidK3mqlj1D7XFHLGY8JmZ6i3883rT5xuZhV0tVp9hp5a96p4x6qhZHOLUclySMci4/qGOf039v0n/+8p/s/uXcnvv9F4nSRYG0RxiZUwMIddsZl11SwfPaSUaci6n9PMoT02UNHE69eTdD+U19ehHf5SMfHRfESdPWHMJNf8wi74f7X3d/TX/oCI96B/eYcOxLLhKMhcu7l3XRK0g3FVRTlToCeST7A9L18J1YpuLqzmwkMkmmuEw0w934BrUE+LQ4gyzC1r3n4N/LfNP/331///Lt70nah6L+DDNaw1k8xJjJVeKexv7GRPj5+3e5ngOG7d9DI5zOcks2IdzneQdni5zqPOO92yvH1LjqfnqYq/7DBW4+1vjl6fQTMxXX15rr3z1m4zz+Otg4ZB9ZIyyT5489V0g9BIq6NWMORbZO0tbC1YLFN6NLqwioSMag11peSgaVXOKNTeldzX+M/A3mf/v//qf9v6Sbe/lV2z/bMZF+jT77NDX1qcYU9fxOEaMjUGYmMDY4u1xPupoaVFaoDhaZYTxfdpn10PJIPXomiNWm/n27F85ubxNHOdvrazjzKHmH5z5nqHjI56bC7IWlxba76THdYYbmsgzZ9YltBPdVW4JvKFmI5yZWWQ2d9bNHcqKH85mjOGOaWYrU1pt+nBWSc8u2yW7EjX9f/5N9p/+e+pfqr38iVrHI/c8ms/4zM2+vNJKrDyeDs8h723i7W1CWpxxtH2vum7SUi+omdEf+zYqj/7Yt1H7I5+VR+nL+p60b69UntaLMfeg62PdvfhY9vI+OPZafWyuaK+HdS+U4857zacSeSDu9KqMWiF/aHJOETGMz4aqta3GXYqqUFWyStA47RrVj2o53N2aQthnR+/a0Fg9/Cfmv178m9x/OvjLs5cfizystQeoqFiABvp6i68xMQc5++W9vOlAmnhupMUZc3M/96OmEqjLvTztk5F3HuW1cO8Pf77adda/k8tcqPn22Kv+PnkYtX85d5su708XLGZPPxcaQq7fbvuK8M3a7jb+NcNZdLsVKqp8zvRg2VkfplPWv0671vTDj9CcHRjFEg7C4U7Jk1l6RHhNPcpVyvV//G9/c/e//tc7f0m2d6WDl58kQ0GtAhjRKrRKqzQtWXI/V/q5i8uEx+sdmnCKufkxJvsWPjL2RznvvM+HyjLfUNPMuqrk3Nqv2+DUfWb+kb/Yk/nnqH1zTyO0HuhL56Ahom+oSE/efSknryFvi7pv4URcRFVEBdK5pLcIa/jHpiyrWqvattrnHh2oU2OtlVZF1lNx2He15Kma6XVgLaz23wz/Xe2fP/33tH/wl2F7H37IwTVJzefKcpvxaNTmzLVVltYx1b6mlTErfT/juffRxLlOBNXLlHFnOLydGrP2/fvJO4Pv9Z7ts2+jZNDX0FZPtd2V1Nkv6jN73cMu+To3FnVuM30pzF8/5ywuP05b64uSx/WavtAOUd/rMmNmOEwPgrTqatoTTGZjsoRpMiNl2/Q4Hbc4MO9h8RBTl7td0FAXcw393w7/1fw//vf0v/z68B9ypPavg5EpxvVIkf/H/Rkqz94tNLEe17trqusY8XQ11UrXaaUf7+d+7m3G+EGrda6aafsW1FXG7E/PUfH7KXn0x66nTmZqvrtXLvKtPv6S6+w/YzblbzwEfe6h/yI8zt9+2Wtz6DFZL5fVj9Zbe076sJ3gLq1r/dBKCBzDw0ZBS6yDPqxakyKrHPo87e5CjJ1RtpVqP72Yt6gd6L1jipleGLVn+U+tf0f6x//PX3LtHa59HPlyVSxabbUBPoMFXziPB7o6v4ip9mOhnzn+7O59aCnN81P6/dz7ltEm7/9C6ukPfY+gUI+Mj/grfEZqnbOusqE+/e0rmeNt2cvzt/4WUjmZl+voZ7/9GKytkbH2WOfCbVy1GiaI/vzrlI5IbyBGMDFtwVo+9yjPLEsqzCqM+8NyLn12T+Sk0XsIciz9iTQcm+prFC6vq/hv4L9n/PPxf1f/B3+h9eG/58P3WCoKooAoiC2LKKIscqUfOwZ15OyneNr36srrnbannNHCuWpmtJv1RPGUfnp6xzue/qRX1E6PuvpUct3UR/Rzs8+lTnutD7c/mfu8UKyc3xasXtN+/DyZ0L4Mm5JuVBPa6rWZd67xsLkjFqTPpGwmqxRVXgaNTCIejnNtK3LNOCpQ/YCme6mZKbgMK5XG+of/auHfLv+n2395tXfI4Xuf4wKiiJurMq7ZOowv5FyQiKGry1kHxkyL6mf0e9+7u6n0Ql0f7ZPfT7xzlac/zee8ldkPaq5Q6jJfompUyZVn+EjcXbRdZlBej/zazYn5ZyJclyXk+MvClV63tifDLb0Y4iLEuDHGZz4+TzO1bAWfslmxy6Vd74qMu+OIbcUqIrh6JRe6nC59qcq9GeP//VcK/65xJn9b1Yd/6Mnki9xMFbUKRXzhbHSy8suv5iKJaUYdaNFiHNWrFz/XDfvO6Ek9Gf3ZPqmrPP3pR+17FD0tx9aV6+4KtUt3d8HfM2ouZ9t8scffUEXc7A9XHf03roOSXn5MMaqp2y8VzX1rvYiz1s1bJiYm5BM+FwdrFVLTZFHIMZ20Hz7lCmoHtTAwF1/nPZi2y5CprdSIeX3zvvAPX+tW38zBVcHtUnsfejzqLBMLtNXNVtlihDUwrvm5+oeElb6mXnCMH2MGxo9evbifO03qWp++r4+e69MPXyPc6yk/5o+a51v+u9eOtvbKnNQXkbn+5jOpT+oDH6lx+KD20pqrMmZ3K5ia7fVc2Jz84mJXfiFOCGbbuFo4mIi2UTvLqmQxsbtwMMrue9RBedzWdwcs8ZWIo6e5EGVbk65CU+27YkFTfo5Sp0c2eM1WLws7U7AN6sPf570vIoBxvUxlrBRBozaotMrWraK0Oq384ef8+F7eHzX6vQ/jUC2o/rN4sj7yPp/9kbd4IwrzPex8O20v8u1Lrlzk27rE9ffo/Suh52Xpy+iZENg6oo30ubiWny+yoHV+JRvRwm3ZeOMdnjAeQdcIx5lStariwQ0pKCN8oEavFUcUNahlt1wNpdQorMXQuUfKRc3MxbsJFC99zdbezP5Ltzm9zyFHH86WKghofCGqqAAqKirc/C5dTbWk2vd8eVu95p7bzzjaNuUMfPZHz/f2ibo+snwyoq7iI6Ty17lLrohnKWKv89O3IvVBCfdH9VzI/NXf/gem/+zsRxd097JTlKQ+8XQOaquNv55wi7zWOB54mDncs8Za/3ASZVWx6kFBlayq71h+Kukcyyxa5mwt51whepyvmrnQ03/Ui2JwXT3unwMDBi4Ne43W/vb2pb3/daiji+N6rAut0lhUEUVhW3wRTj825H76uXr18lqY+6c9dYzj5f3vhXry3rfXeuKdkXdGRj5de41K9zx99pCh2tsSS8/wkaXq04L8w/kfTvxa1+/WB7+zIcwex4/nz/Za6ud9h1rdKxJ1bfK+t+AQ+hBqgkQWNtNkmQrlZYThOsSyI1sW0v1k2EZZY/++dcNcE8t5sf7I/nkRMLvQVeCbdvi2tV66LenDj9Q5FnUj1CrQQEUF0vhCV1kQBRUVUUbOJX/4mitZiaacGN0P6gVFyzHufYwD5fXTT3iHct3LZ/soGUaqL6P46p8rl0Npa071XCX+mYGa035Zc27XMcTu7yPjcPsx6PlDlfvTiF6+ni91V/lpDr0OTKSvM3+HFcPCsi+mZdXDMktYnRLqnMuVo1xduQcO+95l7j4i+kBRY4rr8Ic3u1KvHgIERGtnBK/X+ps6ON5429FJ4Ak2PrzVBmGA2FpFFAGN2mqj0ie2DgOoVv2RX1b6Wi19Pyjv6+W1YO6fcazJco/4NE/KyDtPP0VGxXxpmR9cNbciNW2+ufYTfXfkmn/Y9TqoKoxWB791no3i91fb0sfrQB6mdlyY/Flru4wos3j2Ge8z1j8PNiEgvaf1PEyTWQ8PGadd/wl6v29nDxFmZjB19jRXXdfGfEOnaprh2/zE/IGMCsqdWrHLIl7f5mXh24n2Dikf1vmtLD7CEjdbtAqtsnRctwrjuqH1SKkjrEegoPcT1RPvhVzJfvqx4Bg/1w/joFxHoTD3D2uybjxNPSojfPpRXtM1X+W/F/FB7SXVKu3SdbFXruc5EHfDpxztPzn7017n0trr8s3yMLHVvT6MdIhhpXBGuDpi22JEPy+JZS35zGnVdnwmjTNqo1fI2kFcrJLrqLW6FHOKJ77XMGWjsEzN1UL5sI44A0CsD4Fv4vCy8OsqtgntXaV8qPKNMrRkUUXQKsBYUEFLCOOLwtT2048TudJr9fJ61PXjtfRC9TItPnqybvPdj74Z6rxDqbn2GG2TvXqq6SZfSOUyraf4GzvXzrdQ2T3Zy/WSydYha/ox1kyCYOpCr6+ksPvkyLrHQhh33OYevMcVs+xmval6FjV5CiWmsLWqiqnSXXXo1cRxeMranjpHq7++4nSqKL1GFVWgF6gQtaLwsb30TRy9ns3TBduATpkdrnNYWywKioBWYaRoPXLzVUBFBVREEUUUUFl5h/z284lqqqVejOOlvB6U60d5W5jrhjWV8e/lHkWo6x4m5myMvkhJF/mdXNMWxT1yJZkhf8310Q/9F2bh2tjNflwZ/P4wZM64U1utrw8+eS66YsN7bJEzfcFmmyBm2ozLuXiKj+uCRUFp0yRilasssTxhqWWGu+s8zx+vPHsox6VjKOoddDyjQ1pjsRIvvTT8TR293zafk+aXY0+aAYitmwjjZoqiJX0CyIFFFW7+vUG1CfLj59QYB0X/NhQc1QvK23IVNRfzHai5niLe6frQ3498p7rConSeC7qIX+/lyPwTTlBr2rsVkYt/bq+L7j1g3vdNcAxGPV++mXaXtota7vASsxli8JqWP7yLXTWpQmGVlzvU/W9XT8MKKkLaxBNPKONd1OFi1B/lKqF/ok4UfAJLzWCijujSiNezdSh1G8/HXY75OEDQKmPRwpbaYutxrVZZbBVodaHVhernkKu6TtV+zC+fuRnHOOT0y8JBMQ4KysOXNVHw6fk+xWW6WnY13zllLlHEWqeH2lGYv6g55qpzM+Tq/liua4/4NC3IXFMQJ2ftC/OcoVQ9d16qz3PidRo528xlECH+JdCP5WVN1PK6LN9FVjcrVc84vjuoB9FDOaS1sF9fXpbv10sY1eUHq2HAKGRtRAzVM6HjwOMSv96lkdt0Dje6HHdOiiCMhsIAVEQRy1W6L2mVBioLKmkUFRUgB2qDri5oyJVQTfqxevUfr+Vt4VDXD4rfW12KT5bJOyOffY8iVfmaeq7Ui5uRqy3zV64n357u6zPof0h8fcQ5hpTYU/cH6yw4pOhhSCo26p2w8WVchQM2Nvcdt3VPTNwjrBGB+b6sWibTKmiNiEA0o44iHCUIa6rD3GPf3s3z3mpGmfaHomoGqgERWQGBDRXEboNjxm+i/OTtNzd2chXpquQbnLJ0ZLnYeqS22qg0lQUEEAaE8YVxArlMkOssrVrup8/6f1r18rb0OlDXj9eCWV4L6vLpT881FT67HkxMf33miquv/17qs5f0GfbE6q+OnGJLriBXuash47f29mypyYWcPBsaZ05uyodTWl0MNp6H+4k7sNkEomZGxJwyPRcPyqKx4XGqDCVjYg21wl7wCPa31+t7MDOKwrXEqnkcY3RkNs1ABSpMVGpkf783qfzk7Zr/8ysOBW50Aq02lqeBigoiDBqogFgaYmC5CosqKgtayJUrsdKP6XurpnhT3taBtHqhMBf5UF6LqbyWkY+UuaJ0/bev3Up1GMt162vFubv0XlE6COVt2blO/KNQcfyYEWtu7FJ5sgxMDrTzJ/NTud/nOBC22cIdGBxBz41aysKEh/ksqywqM97104z0GscUYfVDcU8F9/1+8aLRxCql2vdBrBEgF8yzQChgHgfnTOGP/DS/cGtm7yqVqyr/pzWMLE3IljAgfTHVwcrFc3z5udpn9fy9n8P3idlwb76mlZq1144zXuM122u8RjEh2seqbojl3veef25R6/xl+cNu1/J3LfeRwdl6X0TRtmnb2GvLKM7aW/Y4Y61eUKx7ea2TZ+57cPIgNvfeN7U5lzhBCOFcoulVz7ppGhprf5DHZmOjm3yJybZVNkas6M6l7TX1ruuxHEQ+SMLTLvcen+cX1Tjxta47nS58kyqXRr3ftpi9dz9U5eLIUtGnZQOy5cuH2dJr/dDrufz4bnc4rZLLuTthN1d1tc9qE6RfDOdlbWsL4v0FgYSqhAhJYlYp0u9yvtb23nebrlM2y3P9dX7i1s/XZV22/bF29XNc97pxHce9vO6afjw5Vo2uck/WT695ktrKlhOqsQlxo38fUdm63rdW+DFoH28OOCCwpNjqsDsiyt41s2P/HkOMXCprImXdfHES0vhmVH/9c1TgHiYU3mESpwWXIJ/1ftte9u69qspFFsViDmIgfZwt7cnoqZGNN7owwue9cW9+ccK90UVnWaef00pf48xe/S+CHr4vXNCQoDTimfK/S6m5+d+ryl7+3pr3a+U/y7qOZ/q3c2HTIxtX6cPcj8g6vUWR37PbJdcvu5GR4+PyWihmVvfyPMe+a8cZc4lSz1uUH4TQ9fubuN0PsjfVj68Y5Tpl4kuiZQ9nD3SvBFPVR/h8sDODfJJ8PApRhdaqv6SKq0ild9BDl0Q+6/22tezd+8yLLApAQIPEGnEmQ/ea47z6UJENVmKlBbnkHR+5JAvpl7v6ufbT1zx7+HVsa+eMnPH2Ip7Jo5FAnH4XvLv+p79cYeGys31x3XWRS58OXDir/bhuPbgypnbOGbM/FCm0HwMztz6T68O83rW2OYMSe96Iihv1vr1blM6+1ia2dvsQ7XYJpNDYSpLepJncsH8ny3iWzFT1PEt4jS/isElj2pSb6ZkTMyermTySflr4rEuj32/byt69z7wICBiprTZRBLLJ0fHcJMP3TYygmmU29+avPSFX+uXT9zjzQtiI1/lv6OpKchHMdLV4Rq532bX+te5JPdY9X5fzZ1ffr/1Htjz7CX7RkYythU2Lit+Z0e8o7fUsuoUy6E9xBgO132xsyr3OzMNfn/6M7lziRIW2Qp2bEHkeNredwsbWpCxhjV+jBuMsWJFUjyozM8GT7L8Vj9dHpKTUjT5BGdWEY3Gwjg5DTHmq8C/88PfblrJ37zMvIpaKVhuCHJBesz33VeHDbPklvJeVvJdV7Ver61yzree647mwn9zbt7QSXVzex9vcx/9ePwJhybdfJ7vqO4Pk4fi7IJuMr5N3/V0+LwvXNg56XZf0yt84oXsQP8++taJ//Vw27TVPms+r7tsgioPAk4baeeZLOAShS4t6R5lLYGN7CJIdGvEEiSKkrT1zdsHwcdfivO1zjuDhCPE8Pg4T34aJGD5X3UPtNoXw3jhddEnUY5O2n+zd+8yLCOg+OyNhgAriwxy+mC/fM18+32s/y+fKe1typVbu7bbRmPAcifdiYgLpe3/8MmcQ9tpvgu5W7dctmiByotT7H3xZtS0puff83d5L/pbR7ZHhmnpHPDjy0DusedmOI5u9MZs0nCxUrS1hOwm7nTxQ0RCitFv63UvHLVOuDeJ268NmbcMRiKczvEyNUMatjuxUz7Cey7PWSg4Pwk5PZrRyIW5JUU25Z9tfAiCG7LhxSvhWuv9gm8mRupfbOscHUGNRLGr22WH0C+vIlhW++EQ3VPSReW8WzLY+/qojJPemSz8Odfo+IZxB7v+K18D82ATJQpuSR6jKQJCha/Y8EZfltd5VhrX+rIWEK+Mfm8QvbQ9rb+jfNXFZRTtvs/RTnHX89X2Pm6sqz0Z3nmuKzqKw2zbRu4XfU8yKXrpiecTLQYu1P/BK8bBgGeuos4KVrY99xBjxPlVdP4thyCDzsQVc3NaqtULmLClfL4NALgxN04zNZy56Y9V/sI3kFPDI/n+NtIIagCAHxNIxjGzp42wkRh9eUwWzXx8/3mJitl+6N98nIKF5oqvTaw/3ATsvxNuwkxCbNBIkVEIF8a6GjLisvaw4d/e7X7GHnyvOpfSzPzlmc5mwQ34vCs0q1Ox+CVIeG47AdmyzLupCke47+urqVXq1Cueo7VTW3gh3gRFxfxCSpUNh5jdSkCefFWtuVYwrLB+H7YohvgdmGasuVS0qN0egOgN1d0IewIe8cbVLoreJnKI8wdZpoI5r0VTSAAGNSksDSCpengmDrPDFbLBy5Xut5/j4/hy/UO05kpUrP77mSvQEsw/uw2vug+z70L/jbVVVtgi6S+0gQpCQxQwyyK13e5fJcU7G1nEcLvrt2nQG/dFJt02ckdp9HbK5bBfrGbPV2de8yBmvk4zX+jkufTBR/6BXEypqxbxZmLCJjfRGK75Fh3cbZMqqwy7ZI7JtdaarfFrHxVzihId4NjEqoZRwbNPHYbmhSZbQmAGrmnjojaseStsGcufPOwnAWBtiUcC4FjQgDSKMry0xsAQ890s26XtWl2bq+Kj+8hw+q1FtglxppR+T+2ft+HUPuLzmRWJyEwlUShDlN4Nq5F2HUy/7XutOv/LovSIt/SRCEfPSBlfrEZftERn372Yfax+XYOAWdT7iwG7ksb0+I07XCiGcuzhPtp8omw4CERF38lXLQvK1Ex/BGkkZO3r4ZK6ZYZGkv/jG8zZMVB/0vepMO6G5Ws9EGeQ8ZdiHXIJ+aJvHubzDdU9SiqAhgPFPGGg2AFEEIK/PsY70ug5Z4bUCo8u9zdqWifONCRMTfnG229b1R/zw/bm4N197sBFnvA2ymf+GoKrUQESGX1clSIh6l3rX9a6v67L+7PP22GTRjMOVHuLqSw/dMtDvjEPMbpi/+fR5c+2cn2Zf5zH2YNahopAjfrVq09fXzXq7v1vhRJf5h1quKRnLDxgHbDbYHxQGJZXQxe0st17pm0tq3hD8iWihqvBdwmXNJcx/lmnMQjBBTM0wullyyTE/9KFtHDeGjuhdHYNoIABBq4xhIJaq1QayZQVLVNjTx6MP6Z/A9/LXnPDzbO17Ncl90L9zir2uN8w+9O8dkmHLRdgySKoSxG8nS89VM9v1dc+S9aX0I/Pac4R0j95xvWef4XguxNQqo/R7Cqo1wkkmftXUoHFyY78cH36N8SnrjCAEIfzWSrtshSBuuyHS4l076qysNsaqwd6PLZOofW7Xfevyw6N6igeeJwwfpyioQ0o5x6FU8QEgB5c8M5w50Podot8h5qHtGkd037Hqf2qtIUCEMQKoIIhfvEZAg/SadSSUMGRLr+t4ubfFhFy5/Djxw0SuXNJKE+9lAlL75dwH4v5ZG4EecFHJQEIyrgSZBElXgkCIdxl8cbzL2nTO6PabX5h9zbHr0mOjcSV9dV9yTFsu6/fy80Hl5jATm5YBzWNmK3fZFP4ktNC0u9ewdzGQfesDNjqoxUZMgqQwviOrUZ3zadXkkvNOiIxERNJNVEuqbZ/De2OrM0rNk5KcGwzmnWpU9MMP0bZl3HlV1Q9uCAGMVFpdUBggaJWmIvqNqzNq2iFVQIXUkudgwo/vNbGfEyvd/7qZgOfwc6404cfsb2vnjOeHnNnLnh/IfejUJMFKdwUSuglBacTnPoRlvVlGOAPHZ48X7LHvoZ/+YNoN1U/Fm99bHe6le7NNpmnmT/Me5ctsVYox76u+fFjKuO7S9Z32OsfSxm3TOVqI7L6ysPpQtqHW4UnEEjpGlTNTNRKSfPCVTQXOHQJ9pRCDhRyG6kSZ5A6qTCIp8CvfqPolMdsurs36jud4oK1gBFQE3Vtt1LEg+gSkj0f63umLFSxp/yOe/nvXHDXRntBQbcp1bx91X36c7Qty9vr/b9YW73vY5sf634dQaaUSGEhCfAxEaSREzXoX2kVyXb0iV+WqtveL14x+dpK17o7Edn4dfXvNnhQiDxR+YCN9s/ILm+sOypk3f30TQrCu1FZV8j7UDg/ZmvjwBCv8Rj2d7cR2195Nl637iVxv6x8KTxJsMqekkXwlRrO/UXFVMOZZCGTSlPRkpq/NKoKHHnPyV9xW8cBhvTtbBwQwrtVAAJqduIMcxKIAKlwvVJAVSlQgW9oxwQQTVuKOdNuWZOLefH6jP9KPaSXqby5rr99/mx/3gey1xZkE7rRJiKpSPjbi45T2y4ql33Uc57q8c60tGeuiOGtWu8TkjCN6XC/0cJ4rLkxcr4NZGObWkC5aHUao5cOSv+6NTuF3l66XiaH7ZRrNFrdP6uAx6cT+/KkhN+oZt+JztfmURtcdgSc4Hg7xXfged2gVGnWMqSjkTkYXTDAwDRW59T+xgB4z6Y3WOC3aPnHvkXqjTPAIl6LBSA6C2CmiAQhAzD47sz9H+jChArmnARWwmGAEQ5jwdcLPyZKzbLp0teQ5fAb9W5yf/0JO0b9z9se6qCR02zwiQWs0worqMz8F671zvwu96jcX1jjHkmtL1tURB+lxxtVNjFaiK9rW230rDg+Ug1nKsYftSFNbVaZbtc68iRNaho+rZThWPX3l5rD1hv8QllW/7MImZLOJ0t06NyxTJU6KfPBUDH2k+ooShcxNn2txVuIeRAdBohlqYwEOTX/M5G0Sdx6pd5P8ES6BlGLcZQwDxc48CZqA2CkCWoVxPUZA1uhRIfcc+qDCCh9PTEzgvVgmyDWRrFzpvbwXE5hI9+Zr11xfnp86vO3f19r0b/PfEHayNzZq1JZFjBLE0gjic+L5d73LalfP9fuJevohiUau9NM9ZFPa8Rq3PtS8IO7ttepef6NmGRgqBcrsMYszB0oeU5FR37V5e79Zu3vV/jD7V8jRgu3EU3DQdmadzZhI1XsbK5a6yloLn/YRnomub8xvxDMUMkEonMEIwyBJHOhZd8cF56++5frvMGYbxLn8y21fx5fmxAKjjZhY7A5jEYCAVhmLWMwXnvvqtkBq6cMKFdZzUH/EhM9qvzx1mFCne+POMGGC2SZgr8uy3wRiP/l7i7f3FrRk65wm2aJLSKSKhNiiIaw+ZPDoqcdpyGU/3WLM/XB8oN80GdGPsJYfr0FTn8XUgmRTy2yFCoxO2GyvfXqJflfPT3rVq8VCWsQSD1imL2bBdyiV7Wb3Y9e9xDJ3Oq2p76ons64nJRqdVnKpopq4R1WAak7UKoNdC2LITlVFpQKO+IqHGLdvc3jgJ31kgA/CxKIAFTUURuwUzVilpQGIkuY1DX2HFSpQscbcZgUTE6qra2XXHbMtzj17d9rTOtXtDDwH0gT35jNhLxfPj/lv87fX2Pq3eNsSv57Xx3BLELspRBWEqBlc7P3kSD3ZtEE/8U6Tq2y95dCbth/5JfPlsJONc7mriq8Zt1WrS6m38Xq20QojPLSzlfexzW5Gn3H3Ydn6oLBgW2f1gjNGrG185NOnop23DqNmFpGQKFxFqI5541m+fFTMlbSRQlRyNIMpmajPFlvqZ//sbQ0/7Ei9iwYpGBkBAYJGGouiUWliURBYjjmQFb6cKnzxiQk/jmDCe67N/e8hfE5gAnLlHPioP7aV98b8Teh/9e910b/Fa9h+mXFZEknUN0uQMVORgeoZHxMfo6oxDvHertUObdo9XPJkJBnaj9e3zzD1KMKOtOcolzw+PvfNZh+zBsdGXWne+5Y4g78emsrU+fqsdjsskY5EUwuHXWXCqhYlexWi0PZT5U8T1ltAiCOkwpyjlJ7LNShSjltA+A5YRhfWmYBddSygLhMjvP3Ydxi7beG6/KtUr+MpSYNWGyBAtDQAwezEaCwKwsg2jXWQLb0+9zO91og+JFTASt5rTeStriVX3pHukNxs74UJ37OfYwL50b8Rr92H1+Zv/TvnZdnZRJU2LIPbjSBdEOSbIKqaeM5//3LwuzbjXFarrN/bJWfQ65I1+yTR60my+pFMvT+QXz5u84HxcaT5KoxxKV83BrvNW1SL6rmm1pi5pL4U2u1maywsE58nKdeO1UbU0W5UY0V6ZnHnjoDMB0VVR6qF4ZoFQQhBlZL9KVJ0HNo0GaoIECM4nBFdSb99W8IDh3U/UgzdGFFDCCSaisJyEEA3FkWrsQMNSKICktHxCCoqvK5jbcuEEbCfvGeY/aIaTwc8x0Tetm9MTGSXe9t6eN+jf3Nh/iteY3qGvXtWd0uCIBh+2IK+RDzbM+r6ZK3CxYj37OmSiT2SvnQtR94yrNmGPO2MTe3W3FQ+voN6Dxt15k1tNW8fxp9NVf+cN/2OO9Sr5kVR9ynFvkuL7KFdFy1j1SW/gmTmU7a/oXpmVde04iwLziFTJRnunp6h6lJVJzgZPs4RRlEbKpMgKyJZ5tVZrL/qV21DuJZ1tP5/AhzWIC30aA0ECFrIwtBCjJNg3vl9JpYmY93GOhIVVEgVFZiwfsdK+x8h3+OJnlATE39se3uu9ZzhPWNiCBPSewbkuqz9LpCzx9a/M/8l7kPrRzBq1nQZoRqJqMoHRikqzPEgnDXXdZn/nEPgbE7vjqBkiD22nA59oOW9GrHVz7wpyr75Naj8Slf5koPiMLbK/uku7hr1/fEi11KXNdWzas2iY4PND0tZBWfZia38sgvtxevCiHeqGbEyUVJUvNWiLmuGzMwNwiBkO9XBwTOAuc8BI0utIXLfxrfH/qptBg8//1+DBIwjBTLxBgK6A62OYbCsewPE8jQ6IymighW+uEJbao7CxJ3Bvd0b7m0lTNDFxDj/Rp2ew9e00vg799/Z81/r90H/lvvof83fF0Qeh8WW2mq2LEg8E4UgUyVEhUbh93cq62nidL93HzxtOC6O+AgZU8+3ueTtx/L67NNF/2Rsr/NzlteBM+Zs6uuy1XY28TvFw2hqidmr8BAHOZxadi1bCTMMnVVsE1RebbmKlZqp9SNj6kehFNOzsEkd9sFQRYTLp1g3FCR9GHui6qKuG8glTzgAP73oSsbt2wk+/iNBACMgGO6Ym6VAcqAhoDvQp17vgLQw0MKQPswmVZQg60jPwTqsXBMmJkyY8H0CE4yYQOJm80eoEyYQb+v4/Td6QGAL4lnKSQb77VmTE9SpEp8joXsafh0u1u3HK4gxtyfG1KI0rkDnnUb0hVzTx8f8ZlM/70A57ju0TIY2P83S5IE6GHFfy1KoqnHc9TnjKWg+k89DMNlWhbLGYkmh/aY/O6CN+htPjbUyS0So6kRgQPNeZlExazMyKphgyjqhyQDkAAUaDpR4DPDogW0Ddx7H/Cco0BpIJKqOjC2bgDQANSANyAFBq00lsII9WWFHzR3WsaJEhYmJe+Pe7o33MGJCWrkk7g0mTCBXrtn4Y/Nj/463uX8Qrz3cxw6SsKMmCVaRkGCqR1SJj1VBVHB5vYxcfH/72gNaKp2RwWSnXl7zkMXtdc1lq2RQy7xHUTnv+aWcMe+xVc6bS18DmXlC7typ9CzVr6XmYEeHx0rVLIVdrsuqkAorQ1Te6vpVtJlpj+KZKj+aisSsIUN0xIJK2wcQ1UWqi1w7MnZVM9IqgHwcYQMCcd2Ktxx2+7aAB47H3ElP0SQUcIdaa2LrbqAiwtCMpQF9EjAbOa6tQnp9bjlghS+vw5pgwsR7vRfuzUrcm5+fjgkT8t4YId2brjn0YPbf5D4ge9U+0OOUHYpgp8rnpGgGGjsIJ3aYVnwMLhfrt9e6roVENMTosXO6tUjrk0tfbSRb7+j3JjiXHWw3f8DBLOo5htKr32gnv2y12Wj21cO2bNM1pF7SZN+sYq1CQ7H6RCL0gqntJCtGF++lfLhCF1LDIDduG3sczxOHSu2zYOwBswd0IGEawMLE4uQQQSAsT4neYth1Fqu/a2kfD26JQgL4Ew2JBCnoI4BmhxGgO0Aas49hAGns6eqjxHJkxXOr5MgKeA54Y44njGCIEUyYmMgu/vFn+5yQ9+Z7Wnkfm8/fXnPnPPr39fwgXnMqPS2XZc+qE7KkIEHHM0NNgSpC/P41V414+m3rp7Yz0k/P3xH7ycg1pEbTjxjI8DVea37miNJ55m8zjNfii1GftdSgO79m0FwD532JqoqF06xq6GwIyyqd2KzBl+XakZbOu1Y1VzfXHY+o8VIQKTXku9Doi7mPGHEyw8fqwsK9J4N1uik8GZEjkDYyCN/E73rMwIpv7x1tXcdBMIxhNAzdweKQamEYKA0Yw1RQGKS18JYWlkP32SNSe/LIOtLrOlZUVKjgqoAJd4ZZ24Rb5L1ZiQk/TjDhj9KbCXIlI3pwH3aPtenfuQ/02PNfdTRRcrHvS0N8bBcJxUWCgkCj/FJcF9a8jtnP2Z9c9icrLhnfHpkcI73+zki0PVJbSp576XUeJ/ZVZ37OW8N4nTS1dNlH9afy4R5bCaaYnhFTbocEsywvWH7VxrtpssWWV1fr6xNrj+I9kSvF2iX0RQcdqSYWKYAKSnyfaZwn8NYnkpiSYHEKGiAGQGw0c7r4XW9f5V2tfxLPojBREVsb1cYxZAAji2l9yuY0QWAgFgUjUVz3GhOee3wdWMc6uMUEow7vBfdmYoiPCc/hOXLJ93JvTJww4TkSetyO/r3F/Bfp94/m700W2askCGtnkSCrZlzPRhC/DAasyeV1vmPEf/2Z7S02gT1ILL2GeKozTMrERn6p0lnttSTsNuhS7/TnFH2gKDNNcMnaXEpEHfWopOIrG/XQmMVm8nOzexml0WUpnyrnjuC7pKrQCr7JLKIwYWJWIXo4g1Go1QW9ThIJVCGAHVeHcB+B6Gx27IoZX39l9/CR9W4KSZBcmEgRREhbzi/hkAPJCq8XKrKCNJAtWPel3ifX6zDlw0wxMbFypfVwMKH+iOrnMEG663Jv3svEc4zttpnA9OZrTiBXahIm18acISmEPbuO+KvBPBkKSyuuqoqEdhLttik5LNb52cdSP5Cn4IzIkE87Q1KwfqHm2uKdWbrIWNNr3FphTXods9qP937qKPOapSnKRtVMXVaFBz/DLCnPGETXWV5rrVLddfBUNfH+KmlKWEIxO9JKlUtKqt24pUvxfumXVNDXrge+vgjsP2QKMRT/v/9D7X9X/f/8v+euxlybPQE8FYJ4EwjGcw7fy8aTFYkVyg9ZeVgCaSArJrWFqTnOnXV39X6amqP3LhPm7xOYcG/c271N4LZNmKMmGB3qvDdM+EyYOCcm5JptwsRcpGrpM01J04FDU1mbJTSaXFqWDL9b03AwXNvPGs8KZf+zPO9+Vx+LTuTRzeYrYwpyd8dFC5b92FKz6Rz0o6WmQrB1HTe5ivl4X5l6NlT9lnOCmiKIaNFwLb2tKvh65eR9o8/rbOn6Oc9ptqvTY4bzpCjDJUJ1fJ/AKBMbKdw6WNbf0Pnuvd3tuqbgoFyj/k+N/+X5f3z/f8M9fHzMRfFqSogjCPmEjcY7EFHHOzkrkMq/DakCuQMrrCOmOIxi3YN1X+7xPvfezWJbJjCBEbOf4k4BEyT35nMO1fXHNmHEczFhtvYcJgOJrrMav0PmM71ucz1I0HM/8bJmfB5i2+YjUO0Ptt5haW0fj39//v19KrRrlCZhEmgyfmcPtdQe5IYjB/0oc6UhEMUufbD3KFhCcC6cLjVTIU/4OVEoNpvyjLhYi3QJyTk/qssz6WAqpqrehRKjFHqWGxQppB84w51NSvS/y/T3eZ+/ZEj8MGaI2dD/5+b/vvY/Vf4/q7arx9wC1LEBTfbFl8OuahyBDiFreFNhibpMwwolssZ8n/sqxJR1v155V++TOxnFxAT3tvI9TDB1kHc8F/cGd/U2wYjZMKHlvTFhtnsb4fT59Ebem/tKSLJSqiE4qEYeL5PUI6F9TJVA3McYulx3/F7W47WeM6rPlf30itCLehlp3Xvk1rBQZ+ylET8G/aTIs2xi+nNRYn9KKjE1Wka1OeXch6N4+xipGIXcRVCPepcYoVQz56Deqaf2OCfOnIoU0qEaBmb75UTGm7Sfz+3aIXzdrB33NpEpwpkQuqj////8fPSUldrDx2MvitbWILyC06Kl5+s4J4gnUxxHMvpVkS2Rg0WsY0UFLlMEU67zrSZ34iuv6w4mHi2ertXb7GTXMfEcE57D53Okm80E5L3NYeR+BhIT2SbMhgmnnNCB5Yx0kUwLgonAsG3G3gNloR/kpmUWfdHTy2P95q2Wd+jnOy76yZXTPRKvJb9wzfaaz28/cC+oox/IWDSsdaqTfPaHjNjgHHPJimJEhqospiWFgXj+obANcrZSIUjdXap6VkncVP1Mr6kx9J2EK9WkqgXdzujv8HhfWPybW92ueQQeKo6Kmsb/vXP/ow1Pi1dnx8e8WwftjojFDcd1fjcUD+Fj0XYjJqw8yN2ve/1QKVQswfqhooJVU6v2UdZ9Ke8uYtjPEc+y3QQjGMKEEeMzpv/1P9fl7W3CRN6ReHrj3pr0dWwT53vVHDlrI7XPOKx7qjeKnvEyCwlxVWRImvuKOSI07RrU5edfKc7Ju5ant4vosZNcAg9BI9V12Gjxe+8XP5C5mqtHTeumIh/9Zn+2M4pNvXSlV02pSmL3HB8HBFVNxW7ZCl4VyUqa5ART8U5y1amyV1FS8a1ENZSYP3TF36WX3yJwY+/enTWsF3MpMZGqmxqVIo6aPWpgRfbwe16cGrWRkKO8LkTe78enK/Lox9dNhNfEI6yA3JNHIE2Rt7LUcLzI+8T1ckxhYmKCEUMY+ylGTJgwAkOMjud6Xc9hImHE2PpxSIOMidNzSO8ZyYRQus2JSm6UhCrPyKg5CEXNsCvafQ/NcL/IeJZPwnu7h8j1yCD0mPr4MZh93lLPzjpjlu0ik4Z1L4q03ojA8Vrq8YOTS7U+TwuKF50hKdEV8bNoxmG4WwqVlI3yU44o7zjnZ9OMXV94WzORGYTYrELeo1t+Pg33w6y/6pEMhfiLK9qYKUwSrtvJMc4p8Srs5MAtqLZnwwBW6eJ3qHD7GMFXJHG+qk95qZBU5FgEa8y67kvFEp4zy957prgelSlzvK77ohjqvSassd0x4euoYwiY7d7e3u7NCAwxtn4cmM3XZPR2b0ZdjAuz+UyYAquedA1iphErrWR4hrU9DMQIy0DR5k2LmK/52Jx6dsrxmpPaSjecbC+/GYSitDVTW622tUy6RYaChHbeswjXTgx/vJyfdPUfrpVTpJKFhloYsgc58cuAaHXVqbqp+HmuqkeWH7bOrawNXagLwy/vsYW/KyUVTIlr7ff786mqSGhTpB4bvSrRpzDwK5hXzlh53Rg6EXtRIIEgaIO8BJul8cQQ+H6cDSdQkTuWWIfEI8gK60i7FjXqcr7F4yhTU1NG7ms/noMRTLyn2M8Xrvd6Xe4/HZgw4TnGhhFGjMvX9F7MpstcSJ/ZnmvEnElUgqBTijkh6EkIy+dJbENKY7iW0K6PhVjjjDx6nPPOh4yKB3k0laez9ffJltFeYws552nCWmsWkkZI6TqstUJ4D/KMGq+jXPqprhAiXJ+rtuHZhG0hULaFpE/3diBqmN7ZVHm2ZIiOzAu/UEYbcdy8Df/htjPDyG+IRzARimKwjFT8hytZP2G19W5nWAnJcmsoEHjFQW45Gg+5h8BzX5bwmJ7+eyvWYcXjfoI1Wu5W2dtVTE1ZW+7x8fM3wxcI3NsI3BsTJgzXvXlPhAmJCcb1dBhszMYcs3naNmIuuiV9vGys42VCXLdhEVJX9kIjw6Zdy0ab7ue7Kc7od8buR+TZbSeetjNaydFGZUwl71kv8nsr1FQUJiLDROQ9cZRG5O7qjGmL+Y6vE1LlWwYiLBNXVtZYuxY9S067/FRVULxfx6OcLdZFiHDjtmFQxY3AkWEbMyZRO/m67Sh7wbRoO+jY6E1iFuxcwThivsJ64Bv86GHmp4EEYyNZHBk4/sRbdpyKuGUflGrxRAWp/m0qrLDG/USlqGCp9+lCGXV1TZm6qJvPCW62O34vYRAjJmbzHrPBCDhfFxMmw+fEiPPpkEyMbRw5YWzkTcF9HGoc1OI02lzIkMLA/lNGoB2bcYqGZVh0LoJosnLlk86iPVcP2U9/Eg4VT8ivzbV0aru33v6zk0beNJIxd7sqjBbeb4NzzjRZYtqrxlmrRG1K1I0UixgV27twdPR14mxUd7Nd4yFFVHloNfgu0ZXdh1pSwWS/TX+tZ/3+aVy7dnV9Lub0sqTuWRU+G7CMjeKpV85cWT18NbYIKotJxTDEO4MOn57yPck4JYLz07lUkBVjhRUq6m1UEhXP3Oc+n5ia42VRl9dhKOuOO4ww8Trj1Snergt3xhBMTGAy7m18v0yMMJsJI+Z6jokcQs7xuIbtztFE6zEdiJcTSs34mLpiG2axwmSg9M0bDfFlBv079fuIrX6firt9Y/7pmfF9+t3kgzz/3B+p2AO/9lNhapr1T93kEJ0aE+qMLZT2MZVq3bVFqj5dS0iKiF9e+xTb2dcgRl00Ls41wvk+RlswcdFBR8pkTB/TWEvX2dRh7Kzuv1hj2E08IohQ2A7IMMIY/9VTV1Pv/I3BGaGggaVi+SEzTziuP04QwX8QW1nCEvXescbcX4/cwhIVK3D5cFJTc2xxW+u+7qumrsdxhrfL8XTUsK6n63j8YpfDc911DfFenuP3SmGOP+/Le/E73BsmTkzGiHHle4Zko1HhRFUraz5wKNcK8k2ImhhUiT9bmGjaDI6nWxibbegeTj8Zca0Jk2T07B1nwOFeLrHXLWTuNeuQ2R8y9OoOHkvl/i41kbFOnksQBZn+ek5UDepQwbRXeUUFVaGnddluwdVNLyu76o02ZBZREB/zQmV8Pu77iAl+7v3eNnZhStYKybSDQ9gsZPhOmJ8qefsJK6iH35NkUUkZ1cSogK4S6HdRItKDw35zTpxDPvfFOlK2NGQFWWGsUGXdg3ctNcV8MuXDtXcdT0wMYRaRaxAmkgmfEyb+46mO5/Bcbx5Th9kmhpjsmDomBWPTkkFG53t21FnHiFPRrqEyK8f1vK5YrrK2pLp1tnl16zZoSzQCA8+/KPtBPnnHd6ApPUjNkLkQ2U+Gu1/ebpTE3BTr5vqTmholH8T8RrTor1zFRo/wskZ1qbUKVWHWlkmwT3tzt8hndMKDcV4lZ+tVFtaSu6WqVdUlJdqNK4W0kg5XiWkj5csYztDCzQ0t7vKoIAKwjSCNb/TUVdPfv4UGI8JQLQRrjDZg2HjnWQcnFcrXk6Js8ESF3OYaIfdkxZ4eBIvjUVeNmtzD+5xQ+5zvbPEZg5jAe00MMYKBmICBbTimDjkQE2nEXO9Zx9gmDFuTd0aaA3pQww5SR1NRsmAlpJzgTCPYvjH0N3VgQE/afWEPXF63Xntw0lrMk5xB65W5hXyK2o8WNr0zSpe+jokSrUTyQHmkC7k1cv3iNU52/VITjp+K9jGFXZfCnznEH/gG0W2w0VXtnQzqyptJmz8Vc3aolKIKtaEWRVzcr2C6u/fpKtbEwxSVKWYKSYxBegLU6anfaKX0wJ0XcbZuKQNoCCVnUrwJU10nwhE68OZCVpA7ZIVHjyFLsMLldSnWfR0vk/vxpd5qco+Pb+QKHxN4HA8dT3+I5zLh+5AxOKa6znjPGBkTzvdiMiakfnq7t4m8BQkL5To3Vag/W3wefp0Vw8d4dinKdVD6cvuz8A4y4rE5rrxJv/m+6PkolTyu46rKksyi4Lgoys+zt8417EY9Niz3+y2MduuaI2zp42NoWqw5qE3b3IAQyeuEivOL+H5q0TNlHmsVho+NTKqR9ocv6Z1LiXK57/f7NXwNlj9YUyommigClxsWA30H9NSjc1ZIN4XuZCS11QAIqqAYHE2s+v5dhJmn00t9D1SsIyseYhFZsVOgMmrMB8pSTK16q6WmDDW19nPEczyHZ6W/jZit67bdrj3vPLzX02GqVceQCBO/wziYzcTEJHFOmDoDs7nzmE3NeVA5tUxpSjvGaVaTbW0nrJDCENKeg9BHh/ZJeqFv7NEcdq649IuPS9MtOZD2mqKSuQfxemHuD8TSxNQoUz+qPcRu5D7oJIMzDsfnLdrwTIkU9wZDCGVbuLRcpdnq837UPVuq6EIFc2AWviWWbARf9xpon6sfR/cWfzWKmtIpGAi5pU0AejT41FXR8dG/mzVDSwGKZDHmBhKzbnH4ndg74WXe7/snHb5b+RxZkXZURkVirChXN+ZOwbrnfU4te01ZqHF0mZpi73e7Y2Ji/ByznxATE4MwG/c1MTFibBNGzGZi9DbBbEZkv9fYGC5y1WhOzlCjVjch93yWl6sYsAvW8txb1HT90dSgZSrEuND+evj2rLxjd58R10Pes+Wtibkl76tRLIrU/lzitb2u9umIPw+tFl/0zfrVGLWKLCjnrr8YiGKPamZ4B3GVLEVq3VW6itc45+LY833fr9mQ2krqtlSzO/5w4P8Mf3FF9iNqbxsvQsRRYi4wbESaIkTshIty199aCT1wy0UJGMqMsEHAbJ5QCKe56HD/RIRbpDiYr6erm0csgUceCxk1+iWoFLD8aAQ1Pt+6rk3qh39uasQIt+0mBjExPsNUI5d4zjC+bnc6pg6zvb2ZbSU9kRi5NpMcObBp6RHOp+mhvqjYaROxXgS2i5DL+YMfGZeXpnTpItATw3WuxUevONYvgTe5u5iC0HTJ5e6Pv9xkaoJkzKKY+k0/raKOQcvll3w6zlVUbKeyvt6lSCFNgrb8smH1fZXMc7Sz+sdiHcpeZ70lnhGfSyY08uoYIjhD7+5V+ZxTWJe51oQUfirYPpMMnMDCQbr/6Nz7Vz/f+MkqLKZTWCpnNBCWDYKXmigvTiRFOFlxDj1CVkijUqiQz31RYQXiXVZNTY3PwX4epqYmd2tb1cRgP7E7a+k62Tv309cw8dMgJo8JE2lgY/RmSkuu9wzpvcy2B4mznJEea1HhXrWoLCmyZJjxy5ph/9sHu/3hnlBDufudjJ1l+D6Vxa0/YkIg3D2HXD2Kpk5maZtlVUbE002O/OEKDPX4GN3PbnRV5UOlS4Z99rK6osWqeKZwWZHBgx5LT/Gq4ufZZlxzed9e+0W0Z0pECnnnSMEbuoh319fPf5cx959RpgnPn2ddiBlEwA4hN2EJosDlrLtWPScf3KRA0UZkQGuCDnMBAa+2EkBt+Om7E8GOiCMq7zhX1+mfjiWS+mFFEUld8pAlh7mlTLGUdx8+DvaG/dzPVa10PP6KHc/xdGmJwKhr1mZs6zQxpDDSYTZP1zUxzjr8XpueT7Wqu7/2x7UONC2Wxe6DFeWyPxiIMzRK0a1d4w9f1k3F71ywrY3OFtthKTH1CLeSNdt+660/Rya9lLxXPvjGE98xi8JmNM797evqn55XNV2EsZS1/Wa7hGpWxcf2lCOEr6MHVf3O8uPsc+/Za3vP6tJxhYkp9lD1G5W9FfKuUNplVCmpagsh9ETKchQ8yFIDEgmEnvp/Vzr/6Vr2jcsLpkIBiUUPLNk6sbe8ocQ7gjbnXr6f0wik9XtZsUSFHFiBZw4sau3n7OelRrZafsADK4mxcqnTqqaOqf623aQY6NLqRHX4Le4UObp6ey9mY3QGsxkXk2rkDFGpHjN01OlTXxQUjGVb4nxZr4+xjcxyHVoruZiavlN+vHz648e8sd9q+tM4Ou+0znA3+XRFiXdz1NIPh+QhFSVYCO7bx2vDXtetz6XlVsmKppFGDKOCST8SiZgRMqrPdnccVHq9f776zXs21KiGJq7hF8Fg/qLcMlTeL0VGfa8wZmBCiHb1sH26InYiNAqmBYcjnPtXNz/65BQEa0GwtZFGBqgiA+Z+FOeRWPHOpYnzk0B6jhV13bnzvsp7dyJ3OlZw6b1rXzXKKgbZPyjD8osFjer9/NhPqlVTzv2MO2nbLYlhM2Jcpo7fxGzM8ZwxbCP+VaRT6mxx7U0V3AIVsskmsFgnDzI0Xs3HYjU0A+oO8/eXC3s73Rmy9yfoa8qsfpj6KahYbLj9eFF8xYvIA2cyojPM2jAPQcmol3bc9fK+NCox2o5luyyiJ0TCoYooP53XEZq7LNdyDkJxbkxUE6wi2bh76IoIvETPfe9TvSaJk0J2bqI3cuYgTLGxODCTEIzOFey7VjWnBm6lQAJ3UNqSmWbIjKBBJ5uSE9wc/cX+OBGnw2o6dopy9bCTWMIac2d7qxS7HdTaiL0deodaNT6O+ViKLmiFLl106ZKNajFybYNWJ0Te251iLqSJ5xoOzyXvFGcPB/bOob/aGbvZR6XtLXe9exkcRMUz13KVP7i6LdWKz/JHr2t98tKpIT47GfcOafcy2uumj+zeo87014WaNqJ04Qwr8l5mVA1viztEouiugz+Lu5YXA5mMQjki6novRCnRZ6NU050ja5fs7a71JUmJzK8BN6lWFVQw7re5FCuxOUr36c8IExN6ogN8A5suE5ueZFQnwB1dt8WjwJXMf3rSvBuHAO4gqagCCCqUApoRk6wO8vnyO/AKzjCOfPXRyCgZFY+oDM+ZY+4UqyXiqSmTMhx6J9vRNW4PrfoJK1m5yAW5yCWX9L2rq1X2fqquRvq8hphtYJvjaUkM1+Mko3xcjx40uScqfrj+lP+8Brl+uZbnYNC0hVDUSGlfrxdKoz57XfF13i37NjLyodwi51N7kvcsV9F52W2ruXQTROJWWuWZ94izMgiTMbantzlTcmK/ZG3RqCJFKtSWB7EKjYtzqoKo8MKwXme1P6qprlR5Tnk/OuIt2kRFLtZsp3rkrkP+WDFdd2Ae0thsOCCgb0xIDQMhznVyeskK5iboPVicaILSEeCMBELGlgmCmN85Cyecx3F+kAInM8QSHlGxoq77EZawxtzziVJkcED2tjey9653Qi5fq1mpej/9pc/hM2Gd6rRnq05inOzXxG/BXBNTJ9I6t/cStQ6dIqdGty6LoqIOcV9i4WQ9/vVBSsN2+zdN16QIdnu9MH9Hlu2pxNP9nJERTI3dI+O7uxTTUROO4FQuXYTMfkit/o0QzKXsUhF9WSfjvKbUkcVaUIgIyZLLkftFwobYUpVbbU5fmrqxspulsSeSyRQfi81bqMDwcj2uvZ9zxqgaS8fKvD1r0UzN9wYjBBkWG+8B4Ih9AHuU0VNXLefm/WiUMHIAyMTWgpgNuhqzEakqT5RWEJ1PatGx2iGf2xNkedshWWMyVrBicHS9CXvvfTyyt2NDoDTLZ7UnmuqP6h/SZ7XvuZyl1YlywvGc1TbGNgeTSI7c1cpxKOW3mqQfHXp6rv0HwirWwuq2MXnRBkQ0QlsdXxdWRXmKeJS8Z/Vb2E9xdyUjnwxu/UZRCV0X1kRz66JmP0W5g+DZL6Gua+1kPVfuYXo7e6XuG426w8Co3gpZIZ7VrlIZou5ziuo2GKz1H/KGo3RnVqlq0pIKVRGHu0fGYXf5y7UHI/XzgemZQrxsEAYyRJgbvgHhC+Dvu1p554cJax0EEAVEa2CAGWIiMLDGefDEcbbwet/Vx4uv7+eovu7H1QUPVxeeuedVohJiJ1twPI5mly32Zu/sNKoVXb137met7P3cnfu5Z5eu9rVa7iekr9m+ps+zdMw2XCZyRJqOkRrOH6JEC3X2JOWyWbmFWAix5/BxY/eHd7lWK7MVNVHmL9TFcqktQ7dI7+fSaRFN3lOPsPfkuHafgUZMojLba/rxmuPTmyEaXxwhtecd2rvYVAXJlf0zaxCR8E2Vjw82qG0Y2z3+umevVZW1maNqdkx820c2nBkv+T5Drfj58+k+1K4imxXEghlSU1SFdklC7juU3BAIRIqspyRH5q5Q/tOpKWLAzSmgZixWljeAnEEgR4pvF48TYWvi6DhWiThfl0ohbe8SVthJWEZPg6PtWvbexcf5s3202+rdX3FJVvrF7Grfq9OPaWVXpz1b4kTkvZH9tIwJeyBd41Ch1r9KUz4Q18cxfcxkL7+ZCZUUerUut+3+sm64yvTa/Zua2d5mq76pwffpHlY/SnyipqLIdlG6/Njd5BoWoR4bOn16dSJDa1XlbuNsMWQS9sC/T6RCCSGcFMLVzi86jjj07LW/lsXL34kS0YaK1Ck5nkfen7HT/f4Wb8HkO+yMMTg15rxhriJMtBMCDAsjdkDMggUMNlaO5j51VXIT9K8Li40EKoKgiQCiInjELr22iA40P+G0dmK0nw6yJqFQUcl7x4LkCiWjuLqRx9qz5ZEd4sOrem8HW/zA6+M5Pqj2WZ1W+uWJbKrrrFad6HJWI9GpesNk73mGzjyHog5FeUop41SxqGuzK5ZNWd61d33Qlld7L6XsV7uffpyXRfFLjX35oO9xonvP67GDfjjmbhm3byw/3v0ojmn7mkXj1kHdQXQ/ubG2PUSWouOU4eRddVaUoNIId8EgVcW2jx1a2dTV3nrr3C3nWqsiQmZ1EN7kPiWGOj/rbztRkVnamYda56g2g5hwQjvoXWCEsNwYESaBEBKooT+7Ijn58k2QEDgYQAGMWjCCsQEoTGYORBOOxJujVb/P91YnztnnBHKHFXX1MT3wLhek16tky41s2fXehx94Uc1+7py7z645iuzqlapLy2+fuZzVkL5mV6fP5HhOIg0XyqjxtHprp3Srs/agEJZlwsodDLaPw6VhKfxfX5evxw/W4mL8u5BPz53Tn8RYd9+skmQ2qdmftNIjZlHHftSREc2ldT8nWn9EzezwO2fuwJ64zQhhvNj2imcE5UJU+/MIjeDOqqjomlW8yzlHljXf9/36oiuUojKH/Be8PE7EO6Kk/EQQ4nmeop97ynhcHo6GAD9A7G8UISBQTI7AHcAd7r/ceBXyNR6GAgVABYEAgQxHQLMWGUA3oIOXJg7HSVvHCfZo+x2InaEyeIjFpQ8Srr73ThDv89j6KrdHs7e97eeqc7fO0t6Nri4rV3bRpZUm7eeXXP9yMELeW5OQtFRNxuCMSWy7Q5vOqNzlv86ghtYq9rHerN0La6wQ1j1YTOtiaURf2m0Kq17KLMWV0ctF4Ln0OzdUqB5btdHUGTMLrk1mr3bU7KLMda35Hcq6ZxznDetjXfm71M/bVrNN8b7slZeqaFRFSFeQeKz1ErleJ1irQx/LrrX2XfExFYFAncg7AvEO5Yebd2wt+2D7jOw9QibkUsJl2CAwLJyUIS2IRXWku5668vh3/08sj898De/dD7ix2nKvm2XWHcvd2vaJclKTZTC89ll52d4T7wqP/PvnXf2dQnpN4zsY6fXqMHq2SzesaEjf+zp934qWrY9uoA/n0PedzWtDJ0eSqnS6ZPN1YuXdb3bJerdjtf1alv2u5b73XWl3+QtDUU293bu6IIworwWjv5jd64WCgo14+7K/PPuVQcizRT5iZdxk0qmpNete87yj6aatZJDZfi7th+ds7ia3l//n+w9fkTI341RhygxPMBX0jEZvh56VundVO3eV03zGe9xDjVhiYWZlrikk5VCC4LaIdbinNt5XVahGFaRABmGGaJWqHlq3Ly9XkHun6M9++9XGf6j/30jr/RL17wXdjhH75fZOlRTnPe5xXFlxv6ZGcl2llOOo+WTV/sb6a9XfJTX1LO+mZpTgOq8OF2RLXKhgHZbw/a/Tc8NV99U1yMZzo8nWDeq+Wjd6I605/wtJzZq6So66ZY8N613vzttzy3pX33fntdZ71fJbK1UhFClhs2GstRur6fQ1sNxvjDcG0TQRr40Xez84tlJTI3rkHd3bWv1xuvYnTBTOox9mbe/IgEu2Au35q5v/TMsNupAONcXzINNCRB08FGVIqT9OzV5j7NLy+ao+W/WR6gkPebh5RNeghbgHe06p5r25nKGP2WfXIwgfQpbQSuAYY+sRuoX0rdNlG+RHuGWV8X/u+w/1gitQd2Ox/27ZdBHi7cO8F2bv+qmngloWd9hdTFg1Wfxd732Xd+upCPerZklNYUiySbjQR7Zs6cOrt2di9NEZffSX5x7r9vHQjdN1YnQ0r709Rye0dHSipVRP4jnz7rHsI1jWKbblzymoZVVJBH9ChXipNsFmlNexoaYB/cX8C5TRg2H3a//E/ha+4ezq/iTSk+PuT0bOJzGuVuayi8y2H6I9KIeOed4Jb2/2fh9nv6n5x+Z8zV1V/8OJscxI3MwLRmKJKZV5VKQ4s/MMbeyT8UUPFDNMzBWxhEmpwH5FTotJlF9bHb7cL5+WTztgt+hZpSr7VH2ZrpPAmEG065y8ZHXxf//3q2TB0htLesTAbnuznyZ4V01Fv2d556hVdX+7vXrUpBz7nipv3He9ds0m7yqB0FPN0a+K1NLrpRvpw7SnD6/TyCZ934qaA3VznSNPnjb3bNl82NAZpD2bChKpbtWRsvzd6929sgn/85fsN3NZa+3Ou4oMNKJslKiVh1oyWZRZi6Uvr8P7+Lg1dF96f7+99+ux5UIhGfIhvk8jPhe3glUQK0VJ7RfnjaHDrK3/zPOXeOF/ffXQNWR0la7bwrQSYbXAVAIPJvF81K5q1bb6rpQtYhFLcovMK2EL5XJjW0U15kEHcaomdIgQkYJ2EZ1qZMTIz88Y3UIIMMcA9u86wltR/Bf/zvKm73vJWXH0XeXGanqfwnUaa3OUcm6mrGRPTU4HZabNbuS827tS8XWk/ChC/aA908jz0g3pNUffE6Mb/erDF9eRjWzPLW23bNlQAafL6bVdp49bF+IGqUmiYaanULHerNdhrwt3+c9aVzXvPgh2lWIQnap+rQp/YaRP61TUS+eha9ehL+Ea+N7Es2RvlbyDzfwzwu5KRj/IRyn94qYvPzayS0WqsnN7lp+5SLjKqHG/GJ1UCUMG/5HEbWEzkYol1Qc5zT5Y8TXG58Oh6j9jEy4vF545jJJO8VDFinDlpmPQW/1+bz01Pm/CE/A1lF7QnCJeLgIuOcLh/pXEv/v/VLrQkj+6RXpmsQ1ShbDxsthTD/VmidvFwVFWDp+7z3Mq8lp/l55FTz1V6G/Rnld3nXIgGd0T+tBdKlTAM+0JQ/d6nTv66OxpT69tHT6uIxvUbLhV6UIiuqukSFqFd6m2bCvIWKma1l9Wzwqtq7UbK9RzoOo+K3CJxSNpHrrOo/iTUl2gCaYFz+V107av7NH4KqTfUuQ9xZEd6NZYOmTSkvF9BO1/fvr6uXgcM9rOmvuOPmSXr99GbZVqdxaWKQ9ZLcJmDMGX9lExVSrnlO3YcerPkzHmXDEjodNx1ZGDYJuWucRxsbyek+s8rxNB+D1W7BjlJlUcFXMQjxMQESQu9O7ffhXRPlda/L1q8RwxpNI2YscyeVfVi2s5HVaNomaal5TXoWKy7Gzv+VGhZpMRoswmI1zd6Bced7IjfbgO2ZLRR+eqOI2vLUcfNUcf0Md5OT2357YnLRsV6r7Ubc+WJG12WgWSqtmUUukVxGLpY7H2Ovdde/GuV61Zdq1+M0q7YR+7ClunIH+kprf7t073Wn1QjdKUkN78fLLFR+RWu2XYqUsGPfJ2cxwl67CUqK5+yL2Q+9ayagzXKeyT7/hu3HHrGio7ZTYT9yQwD24mUpFNZ562j+VjpOb+W7U9rMNcqvp5JAuzMwxMQsR0iV3NmltRMba67dbGXpAeApqocI4aa5fVpXrFjBvJMRMpKOe2WDn8X/r/Qw1r8pVo7hUmLDbMQCmljLj81FPWfPmRqeVdo3gftpnLe9VUVa1a9yx/Dz1pgeC+RE2N9JqMPtJrNjm6jy81Rzf68GFqK5psyHPQR6ddp9c97Ts1tDxxW6TV7NmSLAmN+Ji/61+XG+vvtfe7vG7V3/VaemnTi0SQZos7j1LWEJ2S0gfVmQY8OsYVlpAJYbrGl/e32/j3UXkgun2H+WeY/VEmpVJbeW2U2VPl0b6+VW+gkdav1e0N/eAcZiqlVA2WJWLOyEOESWaVkuLXuCubqapkE5oSmZjCM0VItZTyuS91Ma9dDn3bc17aOXVDE58El2s+lWpr+ELcEFFIAZsDIH/T+64W/h//f50EFqeb9Pyd9Lazl6/e11ZQ5v5ZquZ+1VSWd2alnFWmMnMVGSmpYFa0WVMj+jtK4pl2dJePn4lHdHuOJVo26ftW+LgCWmpe++h7tpGn1+b1rJoPoqXaLyuioqrLete71Wsv5V2ylsz1rvuoUmZ5jdJey+4vH840MpCYAzrCTanC2/FS7bQXvffPfdeYOtKcmH+ektn/SBpb7z7QCOqoM/uB7gdRQwiWs298U1CR+ltqa3q8Z1cGL17OqSciyrsyF1XVHVVmr1Q/J+ZWsrvyzMiKCCbXj6jYR2RO23SCWBtmZogyq0r4mMhP9nQiuw4erc0QO5lDYiAFCbIntfjzq4T/kvK5ybTqEubAckzLiXyw3LNCrYV9UXmlqCL3kvcMaxxmjIO/S5SomZoaqf1OJXjuZCyB3CbXmQyykb5nGifZZMtR7qvv2bJlgz1p2dAN53VinM+t83O7IGgz5NIZNMGPd2dVrCzvKrff/ZpL1BeU+WBqKZuO8s3yvj/wHNZSOt2wiyDoigyhXATPu6vzzvaRGt9+yJtKPa24FXN5zc15u25/uiupF96OiUn5/DU+64ylap5To9mhMtTWpuuKByIK0Z5qcw3j75HGPQalnwq1himDOU1TfCxDlVefXedQLdXc9vHtPdrbbQnRKQihxLcunvGujhfW5YmyscldDCyPO2xl8F/8fxdL0mPJJh2a5G87hmEZzH1wx/hwH8s43TNIVDlUQpStfkpIzRLCfc2SmjL6yApcHa4zR/dEW4HnxnUmozPooz9Hnnii0Y2a7KnJ7fbc1OH1vM7rRJSpK6kIpVs10jVDovqS9zS2bBbLepfy9yrKXRNdlFpC+axodGzL61fHViteS5fy2cDFxXe2y3rIuVa/ZSvxCKerh/VtsprS1BGtpdATU48YyB0m15IW/Xvg7fvzpYpT1b9VhCArrCRzlinWxjQ6H0z1RSeO2jV37/r+7ApV8cysUCJ1yfy5qZp/1/zfs03PM77G6lRRrSarU6RPN9h0n/JVtSj33Byey0QCAch3BYl0JO/+1cC/+y+zJFQwFGumfOYsijt3VSvc3db1o1XWula5V11XUeFOZvfxbi2ihJ4VCClZ9dXfUZJnen2iG32sgJ1Ty9G9jv5E61dbgQoqCuHDc2Sjj07Dc79UfJujN1qiWtSEpBLEs4SKz0uv9a7lfHCcWeXjOErXChR6KTcw5UUUd/RiFNwq6EM0Ecc8u8XlIXU7ZifyVA/59PY1gxvRg/POQERr68D/4Uxtt+fnwaMduX0vUimH3ijetWtYiwnLy3ridRVSVS1V6ZwzCjIYw949EJhMKwIl4pjN4VUtUp6kRFhq/Djex8f1IBfxNUpGl5CW+mLBCsA+JPJuaTLwl5xzsgr4DzXtaw/BIiPa5xvJ2qeJ3U89bSys0oP7/mKu97vKMn5UKQ4fH25TRH9HI/fPbIIoU5Mtcekj68iKZ7Yc3ehGOi8VPnzudfDceG6ppZYNFT5s1o3hTA3K0bunK0FP0iEj1X11SUiImbaR1/JOa71720tHmeqqSrVq5b7Uvbb6zNvuwfcFXVDQFcpxYPQbVysxPV7b09ykZK2R0rOkn++QP2uwu2T23XXM2pRMxXfMBf2+/f1ShrB++JddWhRG5PfAqvYk5koKi0xqOeIt4v17aL9PVf+tq+1T1bvln8mag/91RcKolsyfm/JsV0XME4heqpMS7+cpuxsEAT8VooJSlapUtxAPSDnSjgIYCNiwCnzKf6gX60t4MGlRLHMI10899XFAk1LM3bXXfWa5auo8T6OEEK9P1i7EflDRk0ZoBG3SkLh0Q+K55eijew5JBXKbXkflPbqdt+egs03s2V5U0LLco8J5ndDmbQi6S9UlmINYWnmWKsl77kpWX9nveqeL9Rwfb/rE34r61LUaKp28FIWxO2YtNJecaL0wjt+bbJ+8pcnIO/abHnE3zD2L2Kqf33mk+pGjdkvRX2FLiDmLvmr6fq96ZFKn9IzUQcRyy4OpMxOC7KbMQ9HVv0bGSTHzGeNtKFQ57bmn5F4yURxCwcyJCufinRvn2wgGxTeffDpDTKKW7pFHapgGFtBABwobeSeNnDm3k5ec7zs7+4ah9JlwYFsSMykG12HDOPY1yFW8SFWdd8VcLOo9hvc1FWoPuvcD0d+NtPVKTTlvIKpf52UdEo9p9CFhhZZ72uaeo2OsiUFN2OZo2brrZKiJ5rVC3aMbJ6TNCpKw29TdbqpbhUdIagbLd3W9C9bbMlZVXdPFNO68BcemPLKa4e2V4JmGgmKk6INbIIT+1Qqt62lkj4pUMtK+Kf2xc+/nyyx5mxb9NlUvETSqBn6V+I6uv1Cvzx5f5VqqmiFWMiNP3MJEljFFfnK24muXqjbq1NFV7F2RMOfDg5SEUE1OS12WiP8luEs+VPfWebqdz0LEs5y0FLrGKHtWVdMlqCdiw2LHDmTIN9z17c/v/Sek0897ta8RvG6ceqM8+l7YinFizXuZNXUqRn2OpcrQy5b9yA6hEaT2i+C+hP7OQcIzRzeyAp6JPeExR4XXdbCOdazjZTkqvFbo+/a6J+XwYTkEJ6XubVyk1fr2saeQ6WNKw9/F5kVZ9Qk1719Lv3VtR1WXucUsipke5tZw+3U5jYmwlOMT/KaV2zdGE/ObLfYI0x5m6Tl+Q7AHbcvbTc93xiQ65b7iPWPc5mfa2T1D1ExldzHmoHrMeeM2Q1xjKtHMqOHENNQaiTFG1YfUt1N5bjKXtZbngEiJYBKNIjLgJs7L2Xq9VBf5wYTCSRn6VP88b9cppoQRjkC5gSS9GujC+bwbFaXAfEtnV3406to2n/uyDAsWq663TSlTVfZZruNNpY4l5Th2kSZEzUZEQ7iv/ed+oSF57qtjJJ47MfpjDhU+zA/sqUIF7LknVFQ0r8XULk7G6bXl1LlfEkiToLNFC7lCt/hc4rR3cZcOrVXXak3lWCHvUivPZo3H6zBYYz56GEr3dpxfipbDMbrHyOhfzFLpNfpt/vGVXRKUWV1eu8SKQlcPpnFpmB2vufmeGnh+/mqrNdpQ2S0nqp8VkqCFuQgmgp4GFZ29/13O6XHsWCMTEcEfdjUlZLrmkfNAEIggdFXMHr0e3HCRy4qbpccav0eV91wR9ikb3Ja4LwQYEL/hvN1/+tEQ9AanH9cDqy24Rbkr7rCbOyWmWl2GKq/Tclvuy+MU7Hs4qNBTKtD2C0FqlsDVR3dVIEf3hBIV65Atsc0Psj331Ucf5+N+3M+N52bPl5bNOnSaD9tz0zVJR0LNNLnhm4yLmn4ZJSXE7OVdiu21Fv9EUX77VJT5rAPlRiwlJ6WETSj0oUp8mInT6cW/+/mOmp3IZ1dO/sjIp8mzkFbULM1cU+3cm8ZZ0inh57eWL95XtF07E7OZRhnabbkuGibysKT6RJxihhPG12e88cVW7GJNryJiEi2GrVS4rLisstidPqcrpsoJPClEFuKhA1v1btKPq0ApOSBoYNiGOUlOlvym83O33QJ3NC3YLfSSByQ5CMzCtUaYih6Uyzx8WN5lBiPkzb7T6F3Uj/qp2e4/OV/uS7jvLPvVZ+7oI70mY90XFStaen1uyai5oxuy6SObdT+HdQ/6DjW150YFbTlQoo6aSBclrujSELfdWkK1oFsQvCv1tWxvX11Vg6qHrgXV/YbUxSqR/NZh86gxbkpu4VLELTKoPtOTvJGjkP2JwqBnfHtidtumH2sv8t7vuZ/i1+grNUFLmetUzbo3iyOUmkecqt1lklima0TYjM8NQ6Nr69a6+luqt1SP9xifmeW5xceWq0JDcyOLo2LkY/kKtd7xdU7MJuEJqGBmQ6oJlBlCDgyIDrgcwT7aH9Ls2991fg58/9l4S0NKkt+wYsE9sZFXlZmXxV7L8qYyjlmsXqVQaxTRz85OdgfRZokoIefr/hMV6ImR8Ewec7COrEDuObo9DR+n1xIqKqigjqyDdRtlatepYk/FUdMON650czKIkILQ5hW0xDNldOUajiq1vuxa6qpYrlplbq/aVJuStk62tEfBbf/W5+4YbyznrWoJGRTf3xF2Ku/YXfno4TAreTLkqZTyY+GErjNIcZzhr/aaEV0zinv75/rL18lTnFTqW2aPjDCWl5knFiYiVsWS3fqQ6oEaYx8Vjtj6bEwLSR460REV2QM3Mh8dPybKzvNkP7Ox3vft9zhDHFSvGspnLbrWhQkJedFGcrAMNkEMsvD3Oi8HFArXqSTK53MM0m+GmMDOlFV3Tnd3CnWMGn5kKq6ae+1rd7tvYddcaqYE/8U/2v2q2d8pOX+/Q0mk1xyQFfDEd2BPQ3qt8OVkux+3x53qqGBPNNnoo4+6nzZp2ejpfiVbSnXDVqEyNESY7dlqylDfOuJVNRVV7e31CxX93kqqz4imIk18vX3GFHiUD3dkRFBOA53i4wxRkS1qtiEfpbzmh3tR2PvZfnI1WfT/Ibz0aj+RK+7ZUlupXTWpbXVhzvDcIswIZUdZNexxkq9RtVtXEx8FXZ68Q6xKFBHM8qytsvfk1vq49Pv99Y7qd7EFcX/I43LNKFovf5PhtQA5ywVmkRYjhNB5t5sUt6kw7oOW9NnSeg5fOwYmFrOo7bjDzoxsxu3U7KOWvcaa3tnZO3J0H47Ts2aFVDxb1psR/R3uizS6J/oTLSv2dNXcc0dS4bkfbul7P/foz42nmT5sXiuoqGO1ObrGno3VPXFIzLrBzna3iFSJqEmjJEIrKtUh1LNqjaLulKrjqjj09ecoeJrO8WZ6zUOJOlQ3WhNy0kRPaB3/7jC737vaTNByWkGp/yoTcq+ZtxLxiPI4VTW4Z03xLY9+XnYmxpaZMeqUEUJc54xrsKWCVVVdZ5eVNlYxaIeuszFVmdDo+FiOEMJ7ro+xQfUQxe6QEUQKMkV7DqmUVNlaqhaBlJYIcIBkx8IOhDwv3HV+7eyb/vvAgdKqfVscKr6IKRGS+2vI64CWyryWKi/4lJq7VkVIi2O3977zYOe+MzTu1/0nRdD2C3GdaZDbJG15j4S67mfu6eOrZTdqjoqKmnZU1LRvo+9pzz3Zbh+fzz06zQ72uUi2dKZwDAbBrBpENSGziszyy72wlQrKz0rseffac5WpsxwEWZEx4CZ2OY1tG6Lg18TpzeWT9tbTSn+EWV0j+sENDSnBniLySDgj7b7v75l48Ua/Ejk7OLs91KaNzhysQOJhiQgiM3quOXw+o1yfIWyFbTjtbcljiecQTSri5ITwcu1wCV5jHb7e5U9IHz8QzN7CPFUjVT2G53mxvylAk0D7KMkhJ6CTBwOckp5Xu2mFgQql7+/7XiQMSsYl0/Ks/W6NsS6WpXaGo4opZPaxxO2BPugnhwOhpybuO0vO1+O+6HndF7Ki3u2ZDFmBx9yTkedjjooKH1ZQ4bVCBUroo+7rtKfX7VbhZM+QYN7mvEE7zUm5DanobjHTPhZq9ocQytxarYq6FvK33bvf0V22nAZfCGb5dYhgf8nYWNppex1he2/Td3x9ZHSq50j1J5nd4lbMxnFTMqTQ/RbrMD8pZ4Y+x6Mfkzyf4bSkq6VUV5CssFbMJRNr86Cev2VG27p2Wnc7dbZ3tTG6TPMyIzptYhEupKJL3W/hofRQzJbnCYT9NZUyTvh+hBqr9BwBhBK5F5AjhjQ/EJYbGGV3nZScP/saDq1oX5syt1PiTosWvG1Z/rjlHJj9Pnf3F/ftXr6lYGo+mDop913tesej92OXxgpRIWjB/aJCTv65X0XiMXceskLl8Uw7j/4IVFABqY4ssU3b3PSDbBW+53md7Dm69pyiUelIcl+pWRLc7Vn7w7CmmlAuuuYtCt8rt1Urf7PUqqhetSi9+lPnVMrruokaKoyXp4iCglK9vxzD3Zcoc2QVi7TkGts36JWRmVH+zDKRWiLld7cjeQiH8JQQpX/i7VnyMO3onlK34RRzeT3x0A+E6lqiZzcHzvly/RoYdtc/qCmCeE7UJTdQUsSeQoh8BP3ere73j8Mff7HSx0nFOe6qWRWdqlmcFuEOhoOQiyBBGXQiDhx04bxZg31aK/SNRsiTnGHSRUoRhLxvncos13ut2fxYLUxN7TblfZhxldX2RvYmpJVEZb2iZwl6vyPkfKlAkhhW8Mwa5ug5KlSo8Mz2mBX2NPpYtz1Htyd29D2homV7qcCJPbfbc6YU18f6CYUeqe7rvoJLN1rP4XNNaBOr1ap+spX6rMXVq9ji22Rlvfyyz+19mHhMSozj/Tp0IxZMUT79kKeXdz4V9fR8p2YP6Sc0XG55u/UHGUVQCGX8OKnJ1/ZyIo2/qd/villdn2SulVhEhURKxjC9jvt0/Xr0aV29T+rbMGkZC6J00jAJYv8IsRBpuGd9ehhVvVtEfIgZ4Q/hrKjbXDQTIAmJUQgaO2nmBWNjmGbAzpPtw++DfcpG7nCvwhYyPMNNSTwLd1eXeZ33qlDuTC1vtWb2TFXpCbEHDjj2HW/XS+ipgpT9Em15BVdnZIWKFcYKheC5n8meMNb9iD70QSFKlDlK9H37sMLuB1Qo7j3VK7HPm5CoiuMSkwGnr4+zcqgmhJYgd2Xq5cumFqXMVupW2pBTEPNFQUwiTpsQwopgPkFBz/hqs2JTqX4TpWb1OxmoWeLEdknJ0kK4bESdpbv/6oQ5OfuWSTsIjnvkuT30SkxunJbKbNnRTvF76kw9xudzW1scXb3JWgt66EhDF7NYIisnZIiNNx1UBU4Q4WPwvNgp9HNX1fE9OiBwCll20wHHCTLJEQWW84YkzofdRsHwJjEDstWBxeKIhNbeOaS4vd6KYea9WHNRci7SL9bY2X0YvIMknF58SI+Q+8997z/B/art3X9iWMFzJ9JQgmzPtLPNq6bngIp1LMc6ZHGkZo2bdVBMGzcVmj1LcI4uCPExcVJkb7eqmwQilOHQLU1NOM8JJ6i6FSqmKT8ryqdq4Wk9H4FOQpYKij4ExdtTVsMSDIWRVTy+zL4H36cje8r3sU1k5E57zft8KDHXfxpzRm6f8RDvMzrfvD4f05eDqC7NeKdOesoSJsEUXxotfVT9nBm6+LtUnXOi9qnUxm73c9NKQlTEvKmqE9fHuoN7fBwrzghuiE8yKYQI7zGiStUKQEIMGgylS4D5geyAEPsbwOI3nf/6Tyx3YgNeSv1BQsJrg3KFZDbuplYtVSdzr0fNeO33Yr9qVKER9j3O/dAb7MdB1GxCVLj/RC9vztf5ivNGRe7oj0CFhOe+ag7IEiqo0Q098NwV9qyo4INDBfqoG3tqKpS+Elf0PY0TlVbnD5nO9csMuhCzDFp5Jqs+y6ov1CoFhbgnZpShWEq0nlZkQEYwJSzi/I34MGv6sdIf3+TpjzyF6c8sjZB/xut5bza1Q2j880XMo1z+0szqKc6KnC7ja6PanP8umOHBFMtOEPhbZ43BQ2sZw9+Fj9pjDNZMVqiIgZkOhcyUEhGJ5yHskMddu/KB/IQknEvPQbXzrhpAhADkCoIEZDkkpBh2YSOhC+e9FsvoFNMM5P7mHyRtpQtSwxtbyHny3t/34SpMUfsaaFNmud2hG/1wBPHwYUr01Narp0bckS9qh/R6VUB6feZQUXksY6LCivZMe2Iz2XPPPVs2z9y3ChXlQInzOvekYX1p94tlkGCjd7C6LEE8+1ugpsCsDx6V96Ee1C6vd5XlXhhF6HKOTpS3BeM44rauD+LD9VKz4KMSD2fcIiqJRWiVp/qtZm1ltv5sE629Q7uLdB/lcviPYtqW9jUqs+Vk6GcFCZaIiPjXjIic+BqaPtW7VdX3zvG9k5RUnmdOSjxbKuhYgopU4wkRH5oNPZ5be4KwXrl5/DA9+DddXj44oQVMtjFIOABySHODJBjOb/2ns7PYBxwIHqQxwKTv6evcA8/VWPGo83UqXqMwJZAqLnZFOmR3e2Vzm0O4vs5f3He2/Sfo/SdIrb/rJbnOy4fPtN99C5bRR489n7lN28Sw4FjafBzLUdGNMrep+bBCQ9dGr9jbOg0dEqTJ3r4Ja5IhSkl0n0CRxw8ce1Ff1CqqLUVVrorCFImNVcQUTI9Nu6WV6PEOgbUxl9f1QoKoZLeup8d3JCVRqDVD7eL0p6ddYsIS/CUrX/H5rm29xMtJo91OjUGk/eVJ9YaKmzgyv8YYg4zp6OXUPRyZWZlFKlJEY/u8tdim79RQ3uh+j6PvIKTLRMwmsiv6nNOV4Q1iHwmcxRyXeE9LxGIaln543m86j0XBAbV9K7C/n9DqJpXPNrEF8sBIG9YbAzF4KO7ePEpb2Lcduz3OHUf2weHcZ7v/RIVwxev6cl/kfJEDWeG5PXOsQ+75cHv0MbewREWJigooiEIUx8I9VJT76Qe7R1PQVKDj2iJVR7PeuNfNVSQiUYNviNnQPCLz0YVC9YKq+lqILnbaasnJ+s1uHiXkxe4JRtT+30WVE4FSihE+PcRTLcx3/CF5z513Kl90qek1n37qvKuOTsMS86AHuVM7s9xzEqU0umo3u1iWKZZYIol/PrGEwlTqpHJUOLvYe4xFFW6zZbar/gtCDPbsa85i8X0gCDm79crdrpaIEDyCjo4YijBSdQLhowAtiAMHM0YszWLYF0BwIM53J6sj9Bc/Z+OuTgs2n0MVzG2e7GF7NiMKe4zxEGvEwi6969a7vUPvyqWPt4N/zCnG1Pf66zLfrwPV3xlRsT/33DN3ILHnQ1QsxxITfr6DKY6p4zlGXffx3BU+LIfvwJ6bm91p036/J3rV7LEQ0XcGZL2xr2+mDx8iRJ7H65N0ncNxEzO1jXkmBo9+UfcP1ePWL4S/UIsoJyZCFnnj2ykiwkJguV83Rln5Orlyo5TydqdpKWf/4r4+DxpW3/xkur/966e35qjTciKzR6RqrGqDHMTw5bAZOcM53VMNJV06b/1Ife/TsjKi0WLOTqoRKfO0nMBZylovcvunrCJSEz1niOn6qHT7o9pcxHS/CnKq6adQ9BulfIOVM4Zbj0CKtiQsGKNbjEDvETPr6MER5hpCN2KfZIe2H7TGoZsTJ+aZf4rin3MUTk9Z1VzXRdaYrgrrWLEnD/M5pA/vbX08x3Oofi/qvl7Xsy5vHpu5576fu6JC4ai54S7xbY59m3eo46kRsCaokFLsevIl5OMfDa5Mnn3G49X1D8ouZj4EM+sYt53SkCqXKJx+2ZZsxIbN6RRki/KMKOfetf5e92u9Uzz3eg5W4xl8GLbpEZNxtfmoqvDM7tZf5OwbTzEmaneVMkfaYG8GTXxKOfep2Jz33sZwVE4bjK039s7wcVcpGkr4ntIRFamInUucJVWHsWPqu3WQR8SzLs/UzF3NGO8xeC4ipS8d9xi69KZKDlbGeo71jdQ/+SfaOnT5ymy3+5mChOwknytQ0j1NnSU8XvF4TdwR99wVxigVz7YLxLHvPOzHQO/h9Qffh/I9jyrju9eV669SNUTa86qwjqwg4Spky6gxPcezXHbo8jlhYoLBnY2nTYpxU0Qdau6b/R2e5yYWbrOBjrEP7iE4BOK4tjiZXzf4knaf6xpTFWu8j5HeSVdThkA9TgyRhdh+fW4PjYlsdxCpCKn3/LX+geVa9yzr0rJdnB/lferDXujt94V21NXxjs79+fOvn+GZB5kTtkxjzK736NKpjG8lrxPz4jecfZ7zHB/p6Da1/v6FXUeeqnOyRkungqBalEtE8HLqeOq4etmvdXXiiSKYpvjh90hVnS5N0P5fTMlwBlHr0ae7eKn1X/vvfQPFcroCX4uvnyLraT+vINTZbFXy+lsTlytcLmEjOB4iTvpBI/AQufZWl+t4Lxz7Q7Vz85FvUblq9D9kr+KZwzP3JIc+FrF7LGPa5nO9woR7u7fbdm/rcYw6cla1TYUi1LFutqmhQh38NFRHhNpFVHk23lAvcREtvD5P+vDZXhPb8dnQt+GcEb/XhHlOAj32nEj7pcL9Z9pub7PKFoiyhL3ugw1FcK1tn71s/6z46+Y91XtBnMqgJteZ8dke/dd3oaMNtM9nyohzpPGcffJQLTUHRkZVar98GbQw4qH3fL/fwuDLA9OtjJweA2vWFmM2IWZuTNfqsyEVacfnJdvdNe535FBrhVYRM5FKjiG+dI2JmBGWjsxu3TVVndQoIcv924y7b6gjOKkvbrz7wFBmspF/IPQlVjJu74zXvOOZic3nLKrL7Y7dkc1+5uD06rq/afh8Tz2q/GdxLpeu+T2X65SuHfWuQO7oI1VYY9rzESVqZdxi6pgwwYTnMAFPE9ToR73bOioq6rZnjdkKcY6JgODeZb9XnW8jWjWxZct7hXKEiOcQPg71oezWXmr528TMunL4IyaU9vmpu1T/IJs8x7vt/UkQb7MuQUQgfvCv7e+qN/u9y2F3XZu751rmy/iM+/wNee6laheWEMJ6Mz4PhM/n7k6WLqnMrtqDlP82m2rKQGj3trCVOuU4p/U+8d7lS0UeFLok3Ua1QTPnbCKFczgVqULunVm3SshzuwYmQUkNJ6RWxLMagbiOgZFb6dNaW+ldSb6BSg9q0EJ/4WeeSht9b+HHB/HMjBw2xFziCkdwDwa6uhYarbewP/Dejz3rPI49TJ2N11szU99/vi5XfVudOpJ1pEeUsMKW9xMVz3nRYwhe18rlOXj8+k1+Gz0qaCsaarY999SeU3SYWCV6Tpk3Xc8Pm0Ezj8DXhUwoD9zrtRVaSs02j+FyMyZYcIl6eojeznmoRxrtG5HdG5dgnypIRVAtm5WMa713pa4rcT1378VHuZVMHrORPsSPX39YUJh73VNYO/qM0gyn6JWRikHxPfKaHOlpn2EX6f4QPl+MT1XXiFWnMic/IjMGOnNKt9QJ1azTXUfqWLULeVt/9weEzENK4Gytk6p0PcSMBAJrd3NOn+6qDirklPimOQwSw2gZjff3DGRiJt1Rh5THFts4Nu+zmZiXeZ4h44gVCF2L2LHboQ+czVZa43R/L0Odc5V/vu3pNaurrvy1QTISnmnn3MSKgtHfT8dzeMSwMu74vWLYuLdbrhZlqmG21QxzuytQGv2YR9bo71S4n9vEHPN8m4mo50Ko50u3aMHOL4Iv4Vn2XrAsxegKXhMjVLe2T+nRg5s0O3B5zSPeL6HmhEBQEcG7oov13jMN811Xl3GlzrDnaXLd5OLukPfVUafstSNQp8Zfut3ldVG3ht5D1V4joaKhMyYDizepnTZTnNNdZAyiZcQTXaiWzEIEMWFyhIYleqSvXX3L8YfxoHBS/TiqasIMTMiCTE++8IzxNZRrp0Y3Zkx/o3QM0hHDZuKn7wPjM4LN/Vg3t4V7uv9ZvHHORB+xYWYTTJXkzz2k03h4EAcRLrj01tdrmfKb6+N7zdfZp67RY0dSaZBzqKgcXTxzzz3LvXGHCSZGwNhP1UQh6qCi27Plt1A4FC3vaPq7OhN1KtaDiTkCF5sbE0TaVFI8Xp/MhfI1fV0xxnjSmKrChew0TMrUKdXa3xcugx3ERBAlAhF9jPK1luPrvPvrYL64DfeDG/YMG/N1W43P9x1/8a3ierv7ezHT7jbl99RzYVU7/M5jYwohO46ajm67tUlV6jO+Rgex1d7lnktUZEKoFhHVVyrHLEeQRej697v6u4FFhBAr1PhdXfX2MYwnU4jwEIhOyd5azTp7UcRSlfObozURA+O4fVk92wMZFUiN7epMrsl4nw1lrqkwYWb2qZgZ9Gp0Yz/2nQThIezc4eX6S6tzF98jg+r5Ptde38zXHKky2DMHUg1T7rnNh5g6vBe36sjX8XRMdR1mW497HeugoqJaanP3Mb9FjVmOir7qhOrvWRbVnlW0iRVdoVb+hk3wZYg4zx3oj/5i1UeZYmx/xMRwlNGWdnE3+z64CKJEvC0nttzeBlI+TsKp1+Ls92YJRmHPLeNRCLlk+LY346qzLrzhVuUn/HncEqEfqZZ6vEfqOLP3VF983bLJ97hP/v/Nb13zDFR3T6d6S+WT6u+HqUUqkCkoTL9cpzhV5S7rLtZUEBL05UHVL2Pws1LdFZIXWaQFUdRHb07cl9WxavH4puifG3m18zgGAvsni+eP9mO2Z4WvV08ggmMiZo6/xeWYCInTZ8GjxcZh47Dx2GXW5TiUr3M/cNeF37ku2dOeb38nyps9c5Nj8uhhR8WKCiZWrsfhOZ7jTcfL9cqV6/Iwdw8VNc4xvTY1sftRHDU2S5gKeT+BrhMqpk4WupxEeHDJE0jOVS3l+va5GlqYHjPWt9cePfTQU+zRtl6XXweyV8TqfXSv0BVCkcq7Il/Wu913vd+U0ns01eNK2qjUXNZlSKnR3l+QQMNInbXDfTZm+OiaUc8Mz2DktZIamOjzaz9zvJ/GUx0ZRmF8tLExV7SJUCLdBmL1kYojnOC3dLGtdnfszwmZQuYiJbrHb1LOaGNMLy/umejmv93l0O0cTmKEu+Lw++A3QyOIYoKfeJYv9WCOMPmRbo7xY8Rscc0M7glPujFjYYfVpGlit/DI8mHt5eF27hPqOLl6PbTrvkvXc/H08MxBViB31JsKVtjz4XiOx99MmDCBqRYmmFCH1Uzb3L1dt4pvPjyFPuq7ETG6GYEWxoN7lbgH2mN+ekyy+bLZ2Z/kTQVZfpxxY3+pUaW6A/NVP292qcCpnAIbFVaEiqCWZ+w/xnpdmz3zlece8pXLD2N9GiHc2tftWpY2IRqPz59GfI5C5jIcmccWRwwMTB1yJI9+/6On6pLQlH1Sy+G7WhCikQek05Yp2hm5JcrYrvm6/Vf/NneI8sIDMwyiyeZUzRDLNW4GWntOfCnVGUuFd7L4tn9f6pug3YgRgcC34zde6fcBs2zYmHeTcsgnBbbNFmweRFFnsUjlsEO720URkbOvC8osax+Xunx/XOW62m9J1vjcRBZymA+uM6xB3jvuGIQR1my3zxi21/G0H3uobFHubHsW8YeTEq3bc5vW9fTSypO1VFw5e24443XSh8+5LQ7CeQSnX1ywWn0Mo47PUbqVSiN6B82bVvEIEeH2NkKoQkVEStwT+9w+lr4SQ+bLmmvSJJcpm2s9tDfj68fNM3hTrn3s0ExJ1C/qodowa0tS0eB7TF8OGlOZGWPGPU9Jf4e2Od4S5RFdyi88V+PHmnGsU5lvxC3sfPuUkLn8MKVEH1TXSY181uWRF0k3qY5zVENnlRr308ndKuc3QGugIYIFPV/B2tteQ8ZvSDnb1RAbfQSTM4+eGYcwQmsS2mN3e0iagcbbq8Th+9d1ufwDX07v6KqCqnM9c0hYY451ZIllzD13EsrKVR1Px9PqGGJilFaHMTqORQsF99Om9rTutVkZuk4x0afCXRsVCjP6G99PvNRh+7htlr12PDvOx5JIGzO7r+qXNOOQ3gc0/9trlriE7MB2z60HLt4MmREC7yHivpvJtdfWZVwjjv7CZx3/9aEl3BroU6ySHap2nHIIh52t8lv17opZ6X7PMGQIaTElh6X8rBO68wxtuyHYFVp/mqIR0Yf5QxBxkBLZmTNq3JY6yPMgc0UTLyvFc+vedVmRJPA1xYDbyCodslRnCSsn8w3Pf51VkImtxnms5vB67esMpg7YCZ+jb6rMFstqVggmXBPlsyzsjc1m29k57DvO6+J99X4VxaDauK7v9W3//HbVddUgY89n7rkjS1hj4ioSo1HHWFBNTK3UqquLue/nFKhQhwp1e9pU48RR8Z7yqH3aUDFnTuk4Yf6BWjcDTwYhaR5x7QxVphOdlr2l7/cY56F+2vt4fqLmq/pIl7TOejtQvYT0EIhzl2iRInF+yjDZotf27b3+e8OHlB8y42PvUZW3DM/7ErwTHeOndPfPuYdhc+5zcFyHt65HF8dQ0d/SZurJkd3HuEt9OUfjtEXVEUSgmnQiKqaOe+TkB1vY+ld4WX6X69s/ICUeYoZAl8zqQvzlkNMoLXorK9yVTt8N2pV8B36j89/fahPIlxhiYNhpcUzRRjobXje5DffEzBXCY3zmPqZ9NpIK2Vva4e6hMV6nnK9339E9F0V9FcpMzDFc3sgtLOGZ+zsY/YoilqgxK2ZVFzErxS2XtHyPvDXyHH2c111RUS2boO5N1043+xvzbtymo+p71nxfRz2nopZzBfug1IWdszSeU9ZaPEv5XjuKsYbSL4UNv7/oH/q1I3eL7PoP9+12LZh+mWJIRb/nnj/bl/VHkd+nsObCwBgn47OjrFubRSMUra9vVVLmpG+fw1OVE9k1zPcw93l/ZMhAuJNJ+zgDY6Qzo/19lGXoLVKkmhKZMFAJmcor4v+6WY50kKps9/579697CaYQK66l9TkYH29jXIKVXLY8X3TrE71HGMsSIyXFa35R801OksiMiLhloScvo/bXfjfDxtBprtm2dw3XaXbvbEOKmY2TheUXk72PtUE49lCOfeF8h/p+L7Rvt5hxua758mXLng+xhGfa5hPqrYbu6sPryl37i2N8HV1Ugz5wP3fF7o51qDaxRzCBaBnYIzCPjvPMLLJmE9Jdaj2IWsXCcjdWl5QfnFb8x6N+s3HrUR/aGS1F7kMgXtd6eWj2HLIhGaKEEEw2OdyTtZqRaZzb+4hP+FvJrgfmEZ1BZy1/fd/3tT3PA4/7WEZs8a44Oj/2gySZprVJ9nvbFdl17mpt0xWniq7hNJM0Cukks6mGFgfiVKTWXTVfV9Mpn5muISHCSLc+1VUpLDNuluvUDP6GHo9ThfvTuxamL1ed39z8WwgaHr7iuLqI9fL6ScbzNCFn2WzjShu1OSNjYo7YbLECNiTq47QcD+6+shd57w/3t+uduejBMFfVheNkqenrOWe+aayoeObuIxEWsRiQL9WsjPdcVFfXyi5a0VpqGJ2WrQ9mU6FaVFSbPt0i7CyiJgzEPe+LnecKfOlAPl84WxAHWaQmpcSqD6S3l68efApbff1esj1fbe/wFHcjdsSlkDKP+HdkxIKIaM+v/+A9uUbn999Hpbqyp83J1fO4Z+bz/PzPhNzXuDB4aGkH5oFzTkg13a41yvhvmsIXRqbXdKvfKs8YMiAMu8g2ZE55IzMRkaCD7ebcw5ZjR/kc3Ol2Z81R35BHSns5M0OeL2IsowkkIiW6O9VNn6IqjaWmx6mWPr2078Jvav4pP+iJ+DlxDBNuyI55rpZm/H2GjpuDOVpM98fc7uf0xm5877Tsnc8ZXF/xLt5nDjmd571Ertjvd/gr+Nrv7+vbLvt1f+usqKgck6uIZPs69MHVjR6zqkvXOvfTfq7SSpeu007rGE5cJzT04Yyi+R5LKXG5Y0rL9V7quSdqrvlJl+cmnj7BSYZty2W3pMdzF5w/iDmjbh/qaFtaXwiu+VL9u1yLd7+MiZ2IDFqoghLdbBUX48rc01e+9nLPV9w+5vsZ5pDtp2KpQ1AVugrNFMaXYEnTUv203nf7xlQDxUA2fD/a1J15nD4qvsd7DDsdkXOhpNOZKgaZkC/bOvUmJc4hHNvfHsP2wYS8EnTTIzR2RaIlQhjr9h7K12Rxz18ZRfIjibvDnpTvht/QoKXltKHWBy+y75epQz1jCy24bcMIDClni4S55vRjFpzl4Hh40TfnY9gfcNnXvLxrLkdjr9TXXrr9vvy+fI8mnjvLNYenM3qOPqTXePpI2Xsuf/mSCxL6wDm69iJKm7uPU+y7p8TYqIoee8pRQWwUs0x7oHwZfEGeh+vkbuk/K33Nhiq0Mla/XD1ERLXHxq1zUz32R1qvCz4VQeTbrUk8IxXx8cq7anXnytZF7/Wgzp29MhOZlntfPKJ8vj7zQlxnI2aKvdVqzJOZyqbf/ykpE0eTZqYcHCn7jPLN+Jt2HPqTmpo5aWGiGiK6r1kik5px6mClL0Lcb59A5gq1IrmkbpVilurMwPQ6EqsPfbprraIpOLXbZ3v65jb92VDEIHEMYV5f4StzMshMtlNMSilsTIQ/zHa8MTRVkiYtePIQl2Dfy9lHM6+dIo/i9r0ux29nLvX9jmzM/HuqLlnhEVao8PQfKr1efeTp8vP6S369ZfPa28jWRx+tQ+vDOfpsyE6+U5H3nuoosfO+arPuZR0meIjy2EKyyfZKe/OyrDexJDuWHPUcd++2/HX0YMgcUWEHKn55/w39xhajErrilymF92zLPzauj9OuNU2Rcn/wuT++yoELV61Zxvgcn308G/I4cmjPv+09xj72ebwYGPShRSONmF3ySB36nE5xSvbRzhQp1dLBJFrqzm8V6hBZb5wKlm073O+UEA/yUNhSI6U6Ve+R+hkiSWQJfBs3X19jlDKJ+wrPN8tabRlW6puXf7I09FpoQSE1EW+bjFccxyYH0kg3c8uYYEwt5hoUfTZfJBxtUftGGpvHbuqYVRaXua4pW19OXbTiuo7vtzGVeIjKUCNJr1cf8ry8rlxfsJ8s5MJzLXmH5ovNh70ZuuY6WzbiFNr3OrNKzzuUNgicPLU6LxTmsScIX9moOnlOi5LS5wlZtqH6p1+ye0DKNLu976O3Lg0Xske4jOzG26QGJlQLeopd7/2zzKUGbs1dnMIZw7R+7MryxufrMx9z2+ExD4fjQxNJ13fFP9W/vA0kqWdoENp2/rtG5URFGX+PIobv+lRtT3WFTB8jUqlQya7alutRhVoUi7Xuty3XkBlCNGfLKJQxl5fr9lePps8cNesnPRTtpKjs91WW+SPlXct/e5GZsjkd1wyJg+PP9cJz7+25iSdmiBRbi22awcSR7prN11LsxfLzxoO57G1FpHQVuypO/8hly7L77SNFdV975dtnomLh6rFJJNd5ec0XueSq9vN++vU9GacvN/Rxjq4x7nJvEC/1G/Peg5k+6ruKma2+ZUq9vM5767ew3V4s5LLkPYr7Q/nsGpuj9eigReePW6SX6PY2EJUKIm+GlpSIX77Le7Ks6Bb8pz8l8mANgsrF8p/x6JpwzSmDOvj6z/BXy8Z9YQxdXefcXVN5jcUWOltV6/Cz9KhOO6ecnTqzWnbLfGjpUI0WCfzgOCUph8qOGttW661LYpFymS/y0aoq3amHBHI5Eq97PH1QqJUhbytoncJ5diz/+X+NUZISKYIRiDyIn1955bh4+oww2udMmOCMmGzVSJeN5uySfmxf66UPdx+/4XzPTL0dp+Tq/iv56/Ivxb9NydPfuuKaW+pD4tLl8Jo+XL7efz/tuvylXX3ozevomtcG5+Wk+d4pH6ej5rn37hL6NJQ37J63WhUv9RRkbsGX++a0pll5Qvbue3bWKV771Z8eerR1UfO4j6U+ebkQ8R/O7XGFiKG0aMRl8653YS+qczS6crVUrtO1f92zbh/Czfh8X6Gmgza3rldMWhTM8Hu833+6mwyZGGl84a2Kj1rQ4zb7Q3+UMsb4zFdVeWYiUzIRde04FU5xRKpa7Ejvrv1rhbiGaDLbtfUbo0pcl8iSbrOjU/OumV68iIl2uuNkDanrUTyLLuXfVspOnIa/tx+UEBnq1bEZ+97SGTNpU3I2W6RNTph4/54Xfwiv6aJoO81OKoTN5nZtnJkbyqn9lYtvuUofdfVQv+Oi5PlNXUjIqyUk2UhknfvHLy9pfaT99OWWJ4wzx/nSvJ5D+V7umKPZ+0x09WsSy6J6Cx9efL1UHLPrpIT3CfWmV7LkN8rbL3+pGunVHOH2dYkLuSNvcAv7xUUvw0LEcwqh3vVa670dG/lLyhJSX/07tT7LfzxfTNqvXh1TRsd3dHp63GFf5sbsyuyOVLrl+DJJPnCYxxnbezR9Wlo1tC1JSZ3aK/Pn1aKUVKICc5oomTiqDt5/Fdd37rfp2a+XU179uFK41ak2ETIjj/jyn8jWtNRt97K24nnJFavfUlnLOuKkQ/mvGRJnpqxF90iM02TNeLFfr68vI2hkj9DMmD3Y5pyYFMbZNF3F6fOE024zebfw3mAK11kr7+vN0SZXtQp8uXjq/jZ3cvWRkLiQXq/uZQdWrr+Aan9hI5vX02vLhvbB/Xgq4qd6VoX6icqj33bLUVeMddA+rMdc++gVZjF6P6W0jLWkHa2wxOv0q/GhdbilR59yS++L07NCL0hDIBGq0SIVQc/F7Tp/9hrmjOq5WHuli80/1vRaL4P1E96Y0O+L+xy7U2jyhECPu05lfD1HkhqQqQ6auB2b/nzJvKWlyU6Nob1nKEeqpZPMNqaSuLuYnLEifTgLdfZh59t3thArmIu2I2XR1UcGVsSM19WZdlHd/bbCfpVa6uXMdlpnzrW51zlH9VF2KF93aNyrhbijp7whvmQzJvf6Zwgmb6FdaSbiGhEoymc3UjZZOzWovS6bvSo3ty+zvessOfP9uvj6Xi7/9vmdeb59PVw8SCTj6yAhjc4F2Sy4N3vn3tUfP5aTbM/t4+a15QktG414QgadMNGWWpVL2PLzTgjUKpdexdZpG52W8xk8vqeuM2Fnf+P7qN8K7Q/81VsuSHoIcSFbp/n9N/ZLKTHFx3hGyXr/M9un/wl1m893hOSCj5LL/dOoc0waQRm4I9jzmCVrOxzbEW1rUvtwd36gREK79e2sQR11REmNHUW13lJVL6m2ZwSjmhbZ5SW8R/lhqNh735WOK1jw3MRjIVopBCWeSZiJScZNhhhfX3Wu4vlkKQkyXrtLQKIr/ad/ahLSOC0rhRUGQ5y+PK9f8V7XfyXGWyexZ9p8dqSXyfnSaFRSe6FPq6/29nDbjNvl7e3znDfv92f3FehU9Hdz/fP1Hde113N/ZdSlu8iWpA8vr4n6Ry6oLlj5sUhWrkQffZwvH7ZstG50TbYmeEin2VbZZ827xS+nWC3+5n0rRek8XmMQeeet9me8R6I9SaEaSqZ1sVM9enx+Ro8x7VFf+2la2AY+CtGXiFChZGihIvh5rZWatj6Dqz58yKPo6WKucWpF46GIVdC+DOqPPez5nFvd23aZS8aYNA+5j5pMGbgxOkdLRQ/RuqOr+cZnd8nZb/ysXWFGEkm3wDqZW0cd61Qmy6OeEWW/GJcQiMRyjXQ4rc1AAhHpRivJKAunolkoGWdZmltXx0fjMXQh//TfWZSUp2azC0N4SfpXvmKIZe+fvp245jpNOhs2phgHIumylaIs+pSWz51LFLtW73i5O1WN85w5z/d5Rc3MdVHOXwiya1xTRnYuJBLXi8R1kqrLSssvvpe/sElNZ98+bHBah3FGXJA/ckSQR6mgngn3deuzst92Rbo+3FV57qV/GpOzmVqsZ2/Osuu0aGwLR1xFv8RfelRj9eDy9EQE2ZGyctuL1CQyQkF51j2Jr7V96pO6UGfMheEWfel4e9FVuDyjnfowNavELqyDfhYNzz5VGWP6cxvf71UWJOV7n+Z+j9IVaqZzDnpEH3Gs4Z+vv3sLEw3Txw95A//qlkgdT0nUum3H7dvbjxKBX0rVqTbGLtcQc8rl4HfSUYc50E+SId8PCHm+T2N5Rht5h4+wA/lvLU6N0+cpWk4W1vc433u+XrTXvKcYthnbjTbb9cfE9WzM4azTdEpnw95LKpxlYeSLNyc7eR+jvPd8jvNa5J9/LuXq766pM4+Hh/7LKf1Cki1Hd3lNXH30IdNi4q4jv6xcJj5y5ZdsqGjZ9NHHmQ0NeuMhgrifG6/K36ijB5dq14qqn6qfX2d+vlzBl/lZW5g7NBpzJKqT2pE4V8RqzfFh2nu3UZ9DL43Ijrcnw/13us/ELFqkgjxmRMzGVWr6ajNNvP10tS5Bma/LfXOpSru8G273S5u7BuoPzEmke+YzfndlD93j3DEUeUHv7/Ut3eMhlSoGRzN2b7vKsc/Q0h2pSHWRQkTFwREcGbPsfLcdt3i6f/DXMzJS1TXSFax4vmFRonEb8s5ruV2b8nzXKhbnWjjr5mpcdl738d9gZ6WUnVI6+RHH8tYR4etFZNb+usi4nz9im7UxBv865j0Hb2iNhhOnRJ/pJemylR80ytvZ93dd75fj0kO69V+uf+CCr1o/ChJZkQP5wegG6Yvv4bO6uv7x5zr3ud4j740R0OQLGl1D89qIIHg8HqFm6es8hDJvpV1qf+eqsql6LtWnyLmZlNKHRiK1yMYOfqP7aOaI/plT/f1x4x7iEraKrS8/nhsbIuVjfRM16/rvrXP9TaVSGfON6rxMdn5x/VrDfQca4fuNzwxNnaN5smsGkSd6/8cxZtbH6yzoade9ZobdFMNDnotn6B6j2vJmFpNMYs7OnLZb1maXM4viLNm/znzvHVvJRDK1ylyRzCXxXTAqQ1pgSdJWuh066V5z3hO9u+4Zy6mGe1NVKY6kUnzSdfxb2hdkp3wvxxU/MzCx/Rib98uWZjvMyD9ytmcL0/IMm7xOKXwr2Av2nastiTjK5v3OeHuY8x1OznfJ9bV7ff/9Vl1b6rL3VXcXDx8kEjlISENW4Jnjj6BarVwT/poVTqgfOu25aXTGmU3LFokgcBPV38tTp8ezU7mYVbhmVc6byphZzsZ+m9WJ22vdBQWdtNfl8FlUG586LlS/+hP6g2v5ZVakWM6dDyiiK1IRkXeNqJPL3FfGzl992Yt2nRulL9/D4+zACoTRl7WpveHvv5E5jW40e8ub6ywmcyaaOgvDr18w6NNaTs+uKjk9BhlH1q6/r2qpDp0Q9lz2V5gDRyqIh9+7X2v5Ggu3a7z+pmqqJF1N14udiZvy5bm59df+oxJ3izPSBSVrvxZLwDb9I9Vt/OchfU801z0EocU2XoaX/LS/sFFXbDYcQ8AcxjzCbylx1inPU3LiIanT73q0eJ1b8brGnHbe59u8zPhcdJPT2Oua4/V2l2opMRKJq49s0mt67tvf/TUXuXLl0rJ5bV+b1wZNtk6jhYAgyOdBnbvUoS6xhLmrli9DLa9Zb5Xp4iG9D+dzSSeSHXv605Id1SM+x8f9++gX1fTLZw2XtOvqy9DfEOEiGvHL9uslf9ZXP+lvti4++y0fD1bZHD3uu3L9ysevej4YP3zs1PMewtxUuQ4a7SD7vLPU8jc7w9E4liPS/aGn6xj6HGVr/98TvvZaPxOzEqg0faUIsRP3Y2IHosz36p8JIZpMgSbaHFKFRSBEJFNL+uhejHbCK01YzmcX9xxVSinwrHUZ/+a/vhH6y4mUchusXRGZQpVQyOWeOHYdkVN0cQx2xvCuFumu0t3SLanyTKR7tFIsMdcYRhd51nNhfB5rrx8MP8uy/BgtLaNpQSaCWLfILVjuVLCOrFDxMrrRje77TqTvp685gdRSSHUR4vmud5+KtZekrcfj7bM/SZ8v7g1zf+TNWt/cinBOxYsUoZJKv3vfvfaKt8Ky7LzwS0+h98B8sGmZq01ECZUPpFqkWu11/GPb1Uxf3Vm6hL7gY2fB86WvFIQJrpIBM02JG/rGs2KeCjGeh3y2KJXFKpKNkE1Ez65Rp9ppdboyvj5fup36uwmToQo6SSlP46CNrYilUgq3atvdcWFDwqbzD7xs4WEuewzdcplLJJN4OvD3ik4k0c0MnUYpeL70GtZ34Y+/wfinkZ0SaeEm5aXgZjODtllLvlzH74r0kK2iuuu0zq5QQXRIE5WIFF08tot5MQ7DczlD2tjZO52f4eEfe3g8Zylm3DeZCGIKBJmw/qwjMTrknqMzdNh9hOrNSqjT9xN1Qt5bRwVpNolvO0vo4vUTlTNWlnzSnfbOyvPZeD66zH7d/XIIkfLDQyspaxXx/7Oxsu/d3LvTU5l9q4FybhGbp75kQRBEFKZfVlIwudSH+c5V6lDnns70XM3gssUx1Br5G9Gj9H2+aPdajnjEXfyJjnq/Mwxm1EnJNKsYqP9KsOnKOJtUDzEHoodNHjXC0CmRFHsJVU/VChUTZf2rirDiGosXymcJbDBhc2eJYY6LCFPinnZ3O61acW8GFKV9b9Ft7Zeqsupv/y78puKfpEg/ps4tqYj4ZRy/zMtae3YnzZlVXe/RljHeozjvSEfPBILokNsVscUHl1ry8dp54xopNYYf9svx43mtGZ2nW6tGvqfcwXqmILC8DDzu3PHyxawjtRUtm9c56lzpM61ENnUiV5XPMz63KqivpZdntOhyRvBtfX8o0ybE/jRhokXykqoIokXoFFnsfWJ57eV91xfa3YjInS6zRyxBERERFFJEtGdP5KGH9Ddkhfl8c/mDrSjlmCiZTTh5Cr/e10gLk1BcOkPkuWraiHT5mhKRmbbKh3tEG0eZaxh0f0r3EU2PKzzsCpUWjSazL2/UOU6JU4fa5XJNpe+9lYT94zN9jt+PyLurt1Z9+YbMg5yM8cW497pLi9KkCZkbNTr6lUHN/uNvJv7p36jRm3R2fiB9PBLsEBFZUfJ2ZZSp+zGY5Vq9W6tiKlWSiU5kcn2LXOKii8dwvzzY3saz5Izm4Z36eZ/nCebrM3Tr4e89hJjEZfbfmZD6/Vh/kgFZ8SUqfO9cCW3+K9FInyckom2JqggiNL7Oe2aTzyamaPGanWB/iDGE/im3oBaR5SBFN+J923pztr+e29bOsGYEEbeYcDYlKCgi3YiPhc/3k3zZ0pXriPzTJ+W2VnDuElLOd47XDKhllDBmuHeQGVghOiJE4pWx+TGtgoOL1vKQz1MtDEfQ22cnHg/lzPZjFZlYZeqI4ogIGjvj3rWV43vmlxp4RCyTNmMoQ2AReZ6SuCVN8k8HodtffL5pur6cydRM+vyj+e/CbyT+jaYmpfooUjdRkLacEspzsyg4aqbfJ3qnYoxiDyKSUH27LW4L/5VgB+o/wl5ef6GHfATPpfq5fjyCBfNpkqFLm53nNUj9FoR1BwIxpQgqUssmW2J0Hzae3tZskD7/iET6PJGICKEiDEVpx/3a0uyuZdvkseSje5vsN9fKHGucJVLB8CbqNlKpnNy2pRZ9/lLcU9/1VJuB2RGEp9WG/SAwIcL7RUxf2y2uEFLGVzI+zKj7ZvPUe1dnhuHkXCLhSuZNzntV3B6hNOU1SUgx8xPZKSvlo+Lomep93mHLjhaWyGxDSqqwS233fQRc61SoiC3tu8OOs0dcH9lIewfywHYEd+8T9d8yxXNhhZK49aFhZrZ39Wo6rLMh1YWa+uT9C9pvJOTmPOCE80QSZEcOgyCCxpWKw3CtMuzUmV19Yq1JFy3mnJ6bRm7LvWHMGY1oMhhx9Wdcc6fJTO+n1n7z0ibVSPH7YT0zNQgzpEZ/Wa6hwjpcNSsYndFHVmis2/rxmGobTJC6+s9mNszWAinab4bumSHmnj32pzAfjchqY2/d3rho/9WJOFKHE8JsEamsscpd/tqsdI60XZkwl+gBq8ScvNWyT0eKULGrlKx7i38ylwzWXoowe8kQ75vuFtQbTiJMHFHqBG3WLBdBuhCILiYGmySl9CdqH4zYRot+YowPZjqOVrvL2WLqCkdBcpas80wlJco6s1IVhX4j0t/9Xj+fnBnFKiyZxmCG55bGZxtOEyuXpYizpWv06YYUvP942Xn+0SlbW3mPrOYnf5T75uG/v5nHrX5Ln1k+VzatjUV0EAqxxCROxTphquwD8R5VeYz0jFTp7kp3kasw8aXcvcd59m1kMJDBI7Xu8Vg/+fnn8dcz/ZTHDD2a2RrrmYH1yCQQE+H8faYKRrZsK3zPCl+czTo/nkNOmI1+Ll90tSBVs4UiEZTnMHZL3wt7tiz3bsUslTbN90ifneVsxWudF95QLVGpKqVsOet9i7XvGrTyuCEeL+uUJp6EyXi/i/jNGWRS5rktV6Sv1YO6m7tVLvNWCPVMXE8nep1UCVswbv2Dq/EQtjOcYf6Ungl/onYkZyCkNulZVT3TLe5+Nv4ZQz4mvDwrfWadls+u9bjkEXkRccSRnfssrXaEcvqeEKKI8C9H8a5q1W4W8/KN5vlg6Pd7itg6bTay3VM3slbuGnV1/M+/afgfbP/X53/JbAcpT61OmUuikPZxU70jGqmNUSjnZNipaKoWtaqXQmJ/z5iSqIpbnbi19+Adv8gnMKJt17O6rf2zj3dpp71Gd/sUHdV6miHzyUTI9Ezxsn/TL68Vvn/uHs06Mn2OcEKaIGl1SnflERII1Qbx8V3+Oj5pmWPpdpyeD5mb1ebzk7j7vT+Fl6OOWnEcSd9RVZIWf9mrbPful20v1SqWIzOVnnJT3K6pVLRQESlShCrTlRNlLm6fXLcK2c5XC2HnHbW+2FQZu9KsEjOT5a7vqo1dZRHhJbQKMoIXSVJkWVnFQ6RqZryp4VAn2jqt7RqZ5JK+7klR8lDeVk6Jsxxry+cSfvchj0J+YJGQHE6KpULgG9YU3YlupkmXE2506SjZ0OsLW6ZqseX9t/5t3zD817LPf+kPzekjm1Q8az1k/RjLM+tYW1c7eP6UfNCz611VgVk6HN3tyuaKCMKbz51RkfEYiWcOj9f5OHPun2eVkxR8FJroJklYj0yE85lEDc5nfv8rKioPK7zWdX/w3NmwDqWO58K9TTjfC7mSvLdOCKOxjcKKTPGMrpQx08z9iZq7IZuMiYzJYnTFdZZ9iSPqjTW/SxJEzsp639jLu7WlqNmnzCeut2v97mIRKeKZupjtWYF3Q13xVabnilXRf6G/cu9uR81qXPUzYwT9FgrvEzm3ecF7xT0pUvTq2oZnMrbTQnZKdCVtRXKQp8VO9+PE1pWazBKbm/4z9JcTJ05puU6RWlQcqJD77LLjedbTy2cykmXwzDshdKW8iiWR54RB+apum+hn4yhvDf2gmr3vmbLq7NP5l75R+G+Lf+s60lH5JdP3Sml+C+XZOMJqvPKe/j22p0/OquwjpcbxX+mKhFYtBG1okZpQrvU74pOhuYZFEkO4WM9Z2j9TI0PTxtBo1/VYyItJEKbUgERFjflEN9BHH1DRh7rwXs+BNCFp5IRc2cmgBxlCFP4d8bG6P9Zse2XPfWaN+SAfT7Ml7fe8vfuTu494RQkOOUWl2scKWVn7XLHsJUqqfz8aMlusQyOuGS5aPKOhgshSXHNt6/WNPeR67rK0vP+MXTkLnvvmkYV+X6PWeaNcxAfXkj9GBQcTmyNmRqbCspQ/Bykp1Z3Z1Z42HHyj60ProdCPqo+kdqksWVKKyqQ4NVG77H7n9jfapvJLEZAiuUJMjAyj2spKxF/MIen3Jznae4YOK/qmbSf1vtd51lIUwt/+428Q/id3rueRzymRTTqlsxMaElEry8QutsY75WSOu27lo6tnqqYvZmDUpDIJYqLqit6R8n48Cm/mMtb6hKG4+qMfJxiZ7j+U2zbqsxDE7IH+/Vhens+entvl+1dQUQImYOI0Qd7b2GizTeRKISENKw2J4XPPkhp7ap5Pl+zfVj58TWR+9t/9XTxBhSiJWG+kTLTwpv7a3rnX+3ctTR2lJz0pL//AhDkPJjQiqIiC6Ou/dYvP7TWi+4qWk+d/yhxReuj05ao+UP5GryhR2EHtTpCGXiF0DDVUoK0iq7lIOEnWKMa4RSYc3Thi4zi3rL2lhKUV7YE70rfiFh2h4d3vtTVlNl+rTSqDvSxb7b+xpYzP7eYhsoT0St8KWxcNpYtEP78otXgnNSM91/Xm1x5+/I3BP92S9pl7yh/qzqSFgg5SkRuRTQrztBbHKtm8T+vxJjOipaulue6NiIh10sHKYeoWPJdaGMPTozw0n+k+oenR7cyfGeL8nUkQZqANnKjwxbTPty9XoKWcuDN8nnguSF1df2xSNQItjIpnR4SpG11v5LeED2m1/fIQbWVZs+OIH+apliRapPZyNnt5Ha+3U0PT3ERmxBLpLcczSblBMBDPhlc/nzOyPUnmybXXnStf861cdsXV9UnsktxFEPLkfHJD9P0b2vl6I8yj39UeIZki8CcpUVRayMe1slOdHHX+gxpj/OOU/Zhyc6WFrD2zkqy8nh4p+03hiCN56nBqh+s9j0D5zECGlG3GeUV1p7r0rkhZgkt70GZnn7zFhvb2cmUeVKXPbVRl1Hme8o3Bf99KfcXmkpza9zyvJbErQRDKL+9KYov/xFedfcS0xtDq1tU7ZlDiWRrvQERX/sZS4v1oz+ORT/64nhjpp2XYpR49hqZNmlcVP7T+CoseyMzdQ+6Yv77OoGK1jJYq8Nxky3Fmy3FWVAwxkV/wxwaJ1Mhk65BHIZ7D56gxDIh4GpGceSb2TqSG82a/S/wSESmecyddosszrO0la9trUSfD7XBgKnZB3JaDEA2dhAjCmnM/uKwLuUhlryEyfU0Zy/F6cn6SPgwf5uzUlYOuNVTmN7YPemIysgxJYThRsmqEVOSxx57k85FOpZYe+oiY2iIf0udp143dUTi1HOtUnOLKLoHaeNycX5bPsnx/OdZdtYw3ESuQiVBad+/654aQ9pefBDPXSo1wLSPzi9XfDPwPbv/TmfOvxpxI2WQlnInmDnvFc0UE8efgYO3Ok0K6VImUMQlyQ4vclhvpvuI56tr9wBOI4/HOEE+eC/6eVnxcSzc86X5bDmI9ZiBm6K84Rn1mjRoSrj7Oq+/ogwqo0Ee3DyQT+B0wl+cYG9myWZzr449nhfBvolzeTOT5nZi7We1W0qaVN9PHUCt1rAORuO0ZM1Jd+Veka99UVl49/Kva/EOJ9BSpqJJNecbwLWIYaM+wPnBtfNf6u9d6Hbhl2WczIZTX4pqSBE+W9+ny8aCL26dhxVNGkxHqlLX52uiwKqimpVp2VysK1d/vIxkCVaiTtHxegvQRmUgd6rHsuisPBJL88od0PwSGkbFGdYnX4ZFGaGO83/SlXE+c/HdbrpOV82UUysnynePf9o3AP1lCCluuJOkmfT2FrhfNUosqaKy54hljjK+qOs2ZzenUScxIEYmQ3KqYU2gR6KF7PdL9HjU8BgZdEkmbGdAtaNffzN9LiykIC3HNhB48d7Y0lHcjK1qiQoWWahtBVyee696YOCFxykGYKjZCfM42dCYtRvZS0Ww7Z+hpc6Uzv79M3G98hkgF0vJfaboa/8+yeG1/1j7Lvrp6VIlUqK/neJ15b1J2imhIRCMC/5rjdc0Rz170Gro4p01PCKm4LtomSiq0N9epGFd7xhGCIPouccTG5pmRvhdZSZIdOT2mIxXtPd6FWDJ25oRXeMhO6ZRVEqlqn1NJCYOWhavHM1YTz/K5PiqwXTaI3BVFWMS6JCc6XPoshBNH813cRn/TIc6XFCu9nuf4LD/+rvPXv7/p32y5Tcrxh1yyU5aPzqQRWIiIO6FETquzu/bpkUkZb9njNkwLM6JIMbBv+joi0rFHfFjf8ZBfe7Fb8GBOmAUFrTpo0k8TU/qr5wicj+VljxrOx45617HGVAHrqPDcvm+unDAx18SE9Hnem7w3XTPBrpChHIZqz6HTXYMw5ilN5MPTnnxbRCZ1O4t3lt1xKlIRJmOKPTvaW3etdfZ6xXjVMMlspmY+1BK3CLPZ9olgeZZfZn1bGf34zkWycYl8PzY/Qr1FUauVgbwoYZS6Z4RC8I2FJaNLzPyeW02sgpSk5EbRFf1TtZZ6d+vukm69U23hNNllVRfK19POKYpTmVRYnFoh47o8W65USB7t+5itHtF12nGNSMK6IYH3HzpK6UvMSvS/aGXdvywxpewvaun+o/yPv/b9IeuEgMxDqpT6TJlaSr+8p9aiPCN+NmJ7xshnVPseHFoq5xAE2vOKmRq+kbpS8DDvDGF81Izy+hhjrHUJrd2Xr9Nw9uhBzCCcUQOZD5lqZEsfphJGN/qeO89QUWM+hxyInDDHc5E+TyZykdJr/9mFUDPilxle57i2z/6EQyW2lG9Lvn078jU/xbk/xS9xRcpnpOJjpuwl8v7lX529Z6qP6t9Rk5jCnGKeKlcor88VQUsF6W+ufOWv5GTlCj1ndPWV7sEt3Z+KuwYHAtOrZIbqyhk8Pr9shJOd/h4Zm8kMClIWm88x6JnxPnjUF+Nr7PSo1sZxxkSx6pSt1Y4u5Mleq7ZShzqcinS4Z9y+1DFSNqTD911k6J6WMYYaM3mBrD5JWnXa4+yu8hy6y/TD6EI99/uaqbW6O6TIr8df975b//w9eVx0TcrWZDUS6RQp8TXzBkEJxd7yrt1tYm2iyzE8ghDxrJZ7i7ii9sG+IcM4ec9IPwYPVm8JZTKhNQ3tdW3+ed7h/B2zh2BBEFONHirW8UTffQTLsQ5JRcuWday77oup695MTOT03+cakRN0Pold0/CMZ4iYyWAYXRnuYU+JB/lAPpL77W9/J2r3QTpYhUvS3EjrE5WztDjWXv9jjIeyB0WkIhUe4tFcOCjxOT4He1LdZ51v5JoLf/fXbfN7/3HFLp/CqHXmqpzLqIdW6huvd91veFxkBrqIZX4H0kKj8EdCytBijMqT7iVyIroZFk9NDAFVcDZF1irmlfe4BJHBlrDoyCewyLKkyo8T44mInudUd4V4Lp75hbmybk2eDOZR3trRHZ3mXZOMM1VUEbd9+N98vfue55+ZeZqHrN46pex0OqU8v+QwBA1BBNkYFsa921gqRKiYsWbEyySR+kdE7yv7lfZH92hqGE+GbuF5534KJkvKbcEIftN4DQ8ye+gxezwToc1BD0Rdt6ulDyuwjnVkHRQxbHfM1pCQOJmNORLWquoI9TAQDAlTeR0TuxE9xt5MaXK/rvS3fe7I/pSDCjSlUVKE11/bW0kdKbqyxREvI4UaqC0rIiIVFFKep1DfuLD+Zs1XnmPzUSrvug7Cx+FQfI3NXbticn2agTtH1NGVIp4Ru5z0Z6Ve/B1v+oyINsvLdNHcpT+EbfLYZhPVlISGakhVVarSpzKp44f5SCeOnlsViyQxv1V5w2ZS7fkYXs8QSyIa7ThWQghv3wz6pqm6T1+MpPuDaP37wl/DX+v+CXfvTT+X04TP8nMlXiK4/oOu4K6IIdq5o+som2ZW1xZhwlzSzSDlvyCnvbqGIHf5CFvX/jxP6j+g2vj1ZIxnWdOkLoEJLRy/39WIGXqQSdRwhh7osT9cJVhH7mlPqFDhwwpj8zV1zZGQ+rnIO6OL/V57IlCRNlBacaEze4sxw22Tj8qWXuidv/cr63hTKj4DraWKzNAkayv2+vNy9HggBWVS/S9dmRGmX5aPHQSa4ly558p2zWUsGa8feRTbJqGeF9JdxJ0g09eq+karb/dsRbrJRz9hnk5PFuHzz0zIjZFS0N0O8yQ1ih0tpzlGPGNoqi1ZWSeyHhtxiUgdHM6ZZXcu85DhJBUWFcHpGrdAacWKFZGIl4+SKvHyoRNMHJbTQZQMd28Xa00f8R/9za9vf9N/rJ+VPYmU0tkppXQ2uZGCqC2ee72sqljkC+N5V39QxzC71IhvmXmERDeOEDlmbmu8azf59PP3J/4w+olbHprbL1rTEDQvPzx/uU7RYz5n0OP8fT6zBwKzR8kjK3x4nU+cuaehb+Jk9svTkT5Tk5B0vley4rlegkiNbVQiMnRuHfcg3qdaza37dpTt+Dn/6QMdERzp0510eUZLhHpf++7XlaJqXRxmjfSUO7OGHxY6bOdRxDNQ7tQhl3zsxXBHdj7ck0tPeM6L89FBmHWouO+gTgzsuk+FsPFDHBXCXN1Rz/ax/HjbaiU7yTkZO5W0bro7UqlZ8xQifO0/JQ2LvjBXrQOXtCyvaF/h2KzflM+Syo9hG6frXaXSz0DiddINXW+nXqxwY8XL7DkYzz6dU7XSZ3ooR/O9/I+/tv0b5ne/VG6u3J7zS370h6TPhs6GIMtrYUbEujui2KONat5Ub0uwInNoK4ctLUfKrJKEl+Uj4TLyGEYPTC6f9YuiiKnhN7Si+zRS+Y0gs0ZqyPnqr2Z0wDNtUYF1rEO2ClTAXCsnRkjM1mabkHQSy45Ymi3jkCEM9vK+cPkzNUcTdstSO/Yr6wj7tW7/7Yfx+ex1hhnRftlse7Fi17vg6Jp/6OGHP0c4t+gVQZQkBY1UxIcr7jzZi89++o4+xd+jzg/FGZUfuEK56fULyiAqk+VrcRGYbZd4bE+Uq2+tEimXzZI8Kh0UleohPaiWJ6MI8QxPyWpq95m+lng5dSgcpA5tx/b2DIsmaUs3OTVmJh5jhKjSJaaE1dxjCu/iXZpA85RKeJ5HiEWQ8qb2VJ+NXz19XftDtvr0heM1XX61SZ1GoYtz7A0LbUvhlvdrUHO0FEllqzZjYiEqZlIVH8dVRFDCpMvIxxkkebSsW9koaKagpLWxgso/1sj+nFEjOEOPGpmPGaTGnk9UWIcVRaACKipQYTaD6z3Dc02YPCbSxO+Y44hV9oVbA8pzw9AVdIWpbSL7I0Xqa2ml4nIsERFVkvcr+kJHdJC6C1nb4Oyqsb9KxDzKKRZis5RQbbMG1TEExbWeqEuYVp8nF7cIhOaedu6lEy3qMCquJnfMuMNwMy24NsT7pHERc3mkciqUzMq0YknVDa1/CilF1KaZ+Y30WSVPVKLK56lTWEecifSK/nvcyx5/bqTPnFRZVghbKLraPmSGeFy/JclzSU2tWzUlnKPR6zhGau3WKMYZntN7uPIf/3r2h+z/V+/39s6T7NMmVZPOb1uemXlOwz/qHVzWrUXZC6JIdzlln02VIcSSucxZSdqYKm5Bi4qIdepdHryNgoGPmgufyYUxdcymTW/5/A/LEN21GML5TD1qxAyVQb33KCL3VITUnrnnnvZUUWPWNsTEbBP9XO9ltnszW0uSmp412JZtY0b4FsOgw9DdgyjxIdhk9d9+u2P8sCpSIRnP+Cb5plA+5n1FtfZJ10j1PKTpZ6TMyb/HXssssidbIiZpmITb+fScuj5hrdSZq1I9lhm1Zt31dZVz1VLpww1xn/A2Y2pzOWqFK0Ngnrhne4aQfvk1RYv3512tZYRJSpDTWxxBb8GJbktKu5STju3XuVVxluzjflmuW/fmOQaFEdibWYX446hjzPNd1VxmLmvSzkpL9WWUf7ZN6X+0cD9I0eeZqpmMlTd1vhfOH/8R/uvY32Tzw+eXietUzkl5ZqavqdFI4goi/k6s1CtrseXUb1VDHqke0aZhMcnzxDMaIif7JkRK5s+lB6czSl0ZlW2MB3H7MWqeuP/deurHnC/y/RshUxAzkBrZBtbosRyPOSpKOqxD1j3WoaIxdQbyzpje3kviZLYJrstyPQdD1CB6D73P4e3w667W1x7nZLVtdb/XNmvXj8Mbuulqg/8CUhFof7zssVTqfGnaH8wI/4lI/+d9FQyM8psVu6COU1f8lb1n5B/DPfR150qi5OHE1Kf8up84QVRelHWNdjgvDE7OihbvszFbVJca3/PLXLazcES8dWW27hNWRH/GzPNb1PuIsJPS54k+lrKKtSilcA6xc0TkIUQ0wudJRmL8V4Lo/DRkWFIW/y3PifIH8e6FmL0laZNLeh6xDGPUp/M851zh85wVf+df+hr2c/3oz/fmd4dWp88mnRIpkaawLPv6GL1Y8de+Zasab9RyrbZ0zVuqWZODIm7ErT/Iply3cudjPZ9on3eMj3T7ufCp7n7UJV6k6eXxe/38XkS99xB6OLwve+hLxQqjb0lQ4bUEKooY18RzjRibOSQSc0aOmPefk7XehqhNfPy2u19eKNeAe/NsH/sf6vfSacP6Xs2j0irWkZjaJBWjRaqJuHvtTdcZtz+pL2daFEoo9ytSLhWbm0d8biUQti7+eymk/0EkFXdWneEaHwYStU4OlDVF+rhzKe6vajqPiQimThmpyCK5cVdUaM3p0YrxRT+lu3cQcR9Xx0yeCbWjil3aR2p8VuqMU2mV5bV/yTket2egeCkYBjaDUZU6gW+I15FUKyWlvX687OnpcF/nxZQgMtVztDL9a6ffvM71+/Rftumnz4ortyal7PyWhTlPthZRloO4cKD2O5c/43e1eUIGa8GMmEM8uC2yz52clh29CKw9np1P8uRph3Q8z3z5dfldutScKH+vx339z+B9nGWkfn9PqRhWDaF/60GNHjvbu4LVZLSn+zAqVKjD58RIHGnYhus5JsO/inlRrNWvycYsCENTGw+mgonZJHcrJr1fcme+vXWdHSnxw+IW6QrV0RWmlGVp46hRxdTaB5GZ4lB9iGd+YEMF8zEpHijH6SfpSa6w7r6w8RTyS1SPuUTeWkYJLmbSfbN8ey9uj+8ZIveRL8TB7seqbWNreol5qn1VV6X7OZUdGV/a5pEPk7GLKpxYLTNfdaw5ToUOEWHVjt11PCYdPrtcqROrRZiq05ok8mXFkkBIh9t70oK37tJn6fx3UbrwPPXywYR7+GxR5e+8rvVz/f4Pp2bbtsuYKgckEs5Om11KbOTvq7DYIhSLtfWgbkbpKpbAepKTGTWo1Jvqtee3j7tSol+pitEylR6PER5j3bjnmqj00vL4suHh5zHijIrRw6qRWs8c9Vby1fP5r5JHhVRjen1uTx/3cz/3cz/3+NwGcl0SSaexTZAtVjwrbKnpGfaCGgXltYY2k83YMtP5ZqLD+kl/Xxyp4K2225ESz1nCm9haqyM1j7gpQUMQ9cayHf79qCKejVS8L55/uD/m+rvtNWK+w9wZ52ruxReb7WtwHkbkeL/loyif5zXubvu1ea50yOe3M3HCab2pxK3l5xxOj/H79BDtZQ83Ex48Z01LPy/7xZmrzz4lLEecKnQ8sz2HKM9HVrPUIrc/MZHMF25PNwIJtE2nf610mnMYbz4Pt+QbZXm6VN1M/+RNqo/md2P+ix8O163+xn8iZ9X88MsP5/Ny9vk7ZemkTimlPE/pbAbLM5wFG1lU3jMp1dJlLjxkxvWeFpEWM146qHWUu1o81ygf79GGb8uIlpvCXErPenwZlsyFI55myf7EznA+ZBKEmRLq6vG4n6goQUWFyqNECacJU9d7En7H9DbYnBOzcSwrBFYxrE8Gq9GtvNxD16eSPTRTxC3V+tvo00Fuv3FLHB8vIoSisv5TWIb6FP2pmqeI3mgcc3oZz82N6WMQlI/inCt/b7aLVF9CaMKZf5BllJ/aJVqfMFF2lrpKKG5ThEEOnnik23rEg78hUn2QFyMl0d6dh/Y9zD6jdLcIAUeiWi3sxZlQ6XX4xXGoOINL1hmxPTlrQ0FKkgUZsyJdzlGZCFOYR2QGatzqLtX/KM06StS/Nhm8vTIwidPS+s2nzmvn4/G61N/4X/nhZj/Uto2v6ZTS+eX0ecKKVK/BiSW2FGlxMePUGmWP7oxYcxFZy0QytVOcwcW9lb8sL+ST0cgtczwf37Get8HlxyZN7iaPOR7MATvDefK7v9pbZezRozLMxmjiuZ85SqgkVBRECXUUKyGPEZNitibNRqdZct6Nw8p6l2djbM+6lJod11RqoJBUzszXuq4Wl7kdnMERfS2NFEJXhFRslbbX7rHf1d5wU2qqIU9qVy5diYrlailoZCr8lrjiINfZtt857FcZ1Kdd389VXjfpNe9QUZUmasxZSQR3rCA9aTvNVrfEbz+vIiadFo2SOo2hZdCl0jbbA00mebasXTqtOjW3HKeOwAnFaHFvsSoH/WFQIymfpYd4ylty+b58P72koWvmoLz3q+chwbdeatW3fWRqJnNuSBHnFXw0vB6uS/2XtC8/3L4YP7xS5ZHSKbXPxkOqM6lpRVvieTw3tltqVJEq8y7EmiiRoKNFZpzufc1cWk7EHZlYy9vPdwd3UW7FLD7jTmlF+432vz+zx/GZ0cP8nkK99wjNUP+24r1nGbMQ1uGZ7elHfkOY6m3CxMnImPAblxwXWawXy+ctjIqoi377dUXHQP/t2zap/Xmdud87607qayGCNUrmFSLV8axoYWM8bk2N0rS1U3GdvEsdJpRfxzNGUfQoc0U16+/2aV/Ru1SMOnpt++USpTHtvAV1UE5A4RKPa2JjzWH8TYyKR9o/0sh0S2LSM5VzuipDS2W2sJz3MXGrQFq9qPRjp/tyHEEdSTn2uG2n/8obxwo/Bjp8XWLoqnXofjIvgczQEpKGhGe2lHnKQR/uNepLVaM+nX7yhj7QVnsjuwevO/283/LDrd7vtnkfeXhQmnRKecoDeWo7Pq69uGiRMoQ1ObWq7WE8PcTLwFpoiKtlTu8/mtuurtwzFG4fr494jPjPVpr+BU0TLLfLlhrHm6hFhp5DGz1qnM9UibCiBubuI6i559PmxvH7b88J28TEXCSzzTGbiZxrvfa/zjr7PZf45fT8tlhvytsq98udyMfqdFz368UrZbnC1iszqkhgEqHjY1m1ddmpHm1m89QwI/VstjFh7LC4hbJRog7lhjnPX5lcsFe65GqhzvXcJTLu4rD5ylCfZhV910ypGXh8/IYmPUxOOq4J34uwzJZa5KQs8fcY7w850c/R1cb2xOR1PJHIyoJdKnhmy5nIVFKkKgNxvytIkySyGBijPWx2k6fDPn4QyyHmltTo4yDay++3a7/1ypQvtdZ7aq0hTtGa6BdvgFuvK8V/oQe3cc6stebHNUggy7XfRJGiYn0KXEeVo2k9sd4Xe+21llAiEIbPffk4u+EhfDP25utuWWv9Pddax3nfffaKDtHJ7a1xUNqAjpA8FUJVzhqZqaqUqUpKiniTKFcXO0pGRYlCUFGi1Xu6ZuK+O+vd7l3ZW3atbLYPPfrsSHsU4+U1BCV7VYdYooV/bX/X9Uuxp5zUs9UD33I9hDupQqM9owj8y17xSYv1Wy0fh4QpnvOQDkOXppmtXTP9yet9a6dqJ/DGXWSOMcRBO5rNr9aXXFCT7/fBGdR+SI8Vq52qbbHTjKYUlHLqckYXuc08VcQ0TziOEeMJL+Nr9UdrneWt31U8WSFWjO61uJlRI11Yy7VqoqZJZ1BjYnm9JD5ct5fD0Tg6TSOl6eDpPe7BzUE2Hswul/7u8X/z9ehPSvcPdvgnkGP1UutE0jfXOdGNRs22aUxFoZQmnyZZB/fd3rx/37sXUaEa0rnCCJ7ecE14yMeOXDGyOvdmJX/v3Xd5NqJR0taEx+vwWsxgCSiqLqtcn3uGeO9/7q2SYg1hRSGUPJbDOpaWxm1nxznnzk0yWO/iXRyrpY0naYmwOKxgdx2K0EqU6AgRq9jv6ROrwjPb8U7nyfCoYnkekmN7llRKtEHWLbJ1rqonoTqDuNvr9c1maBW3TWs0GYIkhMv1VnHepUt1w2mitKtLYfeRbXN8Z6pOraL6Hl1fGUtCnLUabbR2j6QwKAyMWll5nGFm8hPOJFzDTtptMEXGqgXFLrNYcsO9zC5pJj2VXzcYn8ldyqzCZF2KqTLJcYxMHCGC5LqihWaGS4eb7tKt2CY75t5CUq3NqlNYqtJvv45+82vRP4L/B6wNjDi/VHXPkdZajx7RQyGwCynmWZAFSxcanrprbc5a67x/qsMkUzoxCI+wvOJVzbLsO4cVdd8wv/Y658vrb0W3ICKTOVKZFnqyhcJoKV2L93VR49yNWSWZyuJaVx/elS1bPN3r5cxDyeZ1Z7H/7ryn+r32vu7f82723/MOItdYzfP3PY0imVBK7skeekYmlCHVRF+SXTWW28vsabGsU+kJ7jCWsbpCqNBTCmbeVqhwui7FZbeglschI8cHZmtHEV0t2sfwOIEyu69CiXm9fraV3XJI5nY52zPkvUqXbwbhrUJ9Id67LnEj+lm1mxyy52lGO6Cgczoj9ybXkYnGjs2c858ZbyzyyGfNZhO0zEIq1Yz5Yy/tMYUzcsX234/Ou0+f/QXzsqvKmilOzsUx3VMxfZf4XPcnB43+ZbdU2zjla+iBfpC7uue88DGHjj+zXHu93/yi+uvQn8759zatrg8fvz+nmG5bme220Y4WgvMlhBCeZDVXu6y33iOv911rB11UUyTt0ycf7jgW7h9oYfa8zuE9pb/uWWedSCCKnNb66dD64eNpCJbAvktOsqbWPpHPuo6aRFn1ozqQUeTo44M/0aYrybu8O6/9bl7r/O99Y9uW9LQbbm87T6shuo4qNLpaNEIEW6Rzdstq30PxDVYY7jrbDGuixIQIwV61VNsWJUR+EZTwGmgOOm5bzy5/MucXG9v1/lb1UIfQ5HieC32Ghg/EtB374Vw3LvdDyMvHtbjPhlbO9mWPyqB7W355Gjvyr9vrp6VWUn/nk7pwGU8OafVpod2l9cGIlRYJl8M5+PBOX1S5Tjbc49uoHDJcroQTLolskfjfJLrGbGRY0Tf9bFuMMbycVTBSHi0+v5/d6e/CP/n5688f/Fte+6d6n1NRa6bMTJNLLNcm3W5/+ZPjtauhBlewluPmhEmLEFWqGMJNWCGJeRJ321MiL5EX71/NiyQ68RwXZSjGy9MhvMZVBhtqZbIbxJB91irJdbogm/wTk5LE7ty8yT3/2tb21mL/We+INJ6QC1nZlOvvlNeEWBKZhISuRlH1vZrTBr8Q9SC0zSfS9HEiMxCKav4ubunns2O0W/SGXgRyar/+hbQOjV6hDURK4r5vvupCHfeusrqmM9KI7S/3bzeXq8WdgpikJTNdD6q+MR5SuEjP2Q6KGi+FaiS50rusX2QiwllcLlsc4kD2kk3apV3aWsNzmE9jzkY3aCl95kw1ZimvpxKzyjVjj3HQHz5ZNxKhTTdFtvY6pYtEzzbJLL0I9OmY5W8zuyreHr7H/aWvPf8w/p8Y7S5z7DuIbwqtjdCJaxdetP4gnheirrXQVlfcqpGsLP9ZEf9Sk1QgEIH0acml1c6T3ATWPnvl3HVP9N0thkaKfpahi6U33IpBvhR1nZWqzF3dz/lzRZG112dZIdZILX3x6prUsl2nbEhUV6envZao+8peWNlhNV1aOtmU6XXoPMOSLWfbKleqidn/jrzbd3G6lK7VQ5uthPsbEy2q3T1c1fSEcl52qc9epZbXfUUlkeni6LguarYi5T7tEsKVjzDTFbNlrnfFMOe7IU93svP2a7vIfMiCK/3aKGHG+3Vuwnlysv7joolKjMZojPI6KB3xeo5eT+VJ946IcDDPjOdR5L6qqBOKxjbf1me31vrGIY1wHrYxxxjl+jaZ5XoJVDO7M89EiASbHgytOvtkiAP9DBrJNFFMQffv3wNVv4st54t3u/wa+s2vOf+Yy9/72TlstV/mqjqPNibGhNk3GEq7XujWovY6rV3aap+w3nWsvGKvoE1XyAwyhDAPonE77x9CZPTE2l3v6/B+pTIRSUPl/8qImoY6fLgEXTVVP43gtSvLvsgcQ+Y47CszHDng6mmccvTRGX300Yc+9NEjIsLXIi/byoa+VlmDJ8EWo6fnTW5bJVKj1nvum1GTDKFHxBa1o85O139w1Ingx/u7SPLZqL6UNhltMIsKZtzVJXQWS8vWC011IVxfbdBCG1prNIEUOEKe83a6VpehzBO9n8sYlMK5uZi0somqGooz2jDUfXedrskZDZEz+kFUwSh5LllpztAvWXEc1NbxTInYRm+HcmZ3sVuy2UtH9YSZTEZP697Lr0m0VE3WA6vqRQmJXMfMdRxfEVxJyOnD1j12fW4IaRNuek4b77N32Ead2ULTZnhE8+X96+evN3/gH2ilXOOU7xVnHJ4KynXo0eE9tJ0LkT6LLCFLUbXT1qurrb+2dVGEoVHxMZAtbt2rxJNisifGx/f9Z+61Ze1VpDsI0TH0aM5+UIlj+zBFXKzKWXiX4jhLpk77J5/5aYfDTnpNRjbSn2hTH57J6e5eYee8d23P1SxrNJ60tOfzbZXh1yV0JBCMNBF5l1f7VdiJ+o2nNqZVRa4aIXzDt6uWLlGR+x0hut7/wd9DlIvoWRXVS6ilGBtBSbmfXjH8yazyvhVVh+u4F20cjxpsxxXU3iVrX1C3UPF+GypKuXdwySvjT7SwKdrRVFPn6N4nlhF+dTKjD7Vrlh6OOGKeu7JmfFa1TJld8jxnxJqjcEZypX6dax/VzRzKrAuC3TAm9MhM5yWcn1hSEdqXDFrLhj7R+W+eR9jzXTchTjU7rmt0CSa+Q/2C+uvMH/wv/pOjqSJQqtiy9mh0WvtQwfOBySsRQzjK9VrfXWLUqrUt7/v+gVQ1paGrRRI+fZ3MCqXqdoYgJjdHVxKR+CaUCLpkGezwesMOOAg77kOl1nr325pab+GaPJREthzZSEhNGifZsmEdSXd1VyDwrr3e9WLtvXoa2WMibTdFurfzUfsSk0FZ1UGTqJV/7cKGsuewZ0fVjRCE7MHKup7BaJ+nXURVlFnt9W9vam3fDPXLdenM1lq7tiqlhSc/3MJO1djDhKKWTtL7YommncsHc9I+bSdRyo253oi0YqVUO9vdWhvJ3mW7HBj1gvSivo7MlzmmLCJMvYY/LRWUX63TKpjpWoYkZ30Y+ba5Wz7f6jS8L7Oqcc+L2M/EPo5wvVxEIvpbSusTpJw4mg9u+jCxR59JxOdDRpXJjFoX1Fa/9Oof/hrzX/mH47/dzS/V1qkah5+fQrkOzMbQpKHCa3mE314eLhS13sXe++6uvIJMQ2JOrYWMig39VDdV3zfMTujNcs7f8P6hKB1JRCoyI1C3prggClstOa1aZUY991rHkV1cn+fusEIM6TW1q6bX0a8To0MgRiqN4L6rl10H/2m7ZaXFmc5q0G0TRpUle/Xpo2eHEiTM1K4cO/SYrh3iOcHWBCGsUsxBy6oue9AEYkuliqtqlU7hav66abShV+/t9lxK05DuD8/J+Hofp6Za0zlezhxjPMRp0ThWk7VwKeNSJVC3Txc6pRPPs/I8yY2D249BHTpJZEw8ezrs+iOy25xthgkcm2N8/Y+pUL7vk2VGMr+S2x39ofcj3t09lCpVOP4PoApxPX509theI5JwhUNcx1269VOk5ZgtDLbw+WzXVMEMhHy+aO/rfa33nzR/ffkz+f+LFVMlTtXo51H1OLu1bhJ0aB+0a2CEVF2mheIIaHdxDP/4srZnkUY1ZlDI7KlzLo69Mt5v5XyrPvb6M/dK/ZXWUEVX0Bor6F5eezTmcjg29vcq7LXq8XiL6vdkFxK7VEFC/pgqfLmEliQJkU4lEo4XmZee9lykz+eKQJRfTtG7Xv7njZ5ERBtSQry7vus6s443l5WcM0jWupPK8ZzkOygqUkKUqAcTSyHQi4SzWZNmtoEyaNegUgjf1DW11ZnnqtLbVVG3k9PlJNcmnNMmLi4UAzlbUYPwEFz3oImfs/3cp6eVwcZRDEVoRKY5jh9xbLKOY1aOmcm6tz7G106cNEtJ59KcmPNpTsRI1rL12b1ZcpefLCZVE4pJfk3lX4/DHGfy5vXqI9l0Uk9OteLQVW5cHsKuGllJJF5WFaRq1+/ry6NV//rp68of/Nu1y+/C0fOtzjHnfr+dWppIGZoB6x1taK8g0HJ9qiWkhphWbPt9c+5ayjOaKqbPcWt4C7FrPIYQs+f879e70rLujSJIAjvF1Y/SiKiT8rocsWqHMN2Hi20qVYz2lfuekHCdl4+TlppsPu5WV5KGFhK97l6unfwRNy3jU+GL5W2wNzUjFVE90BAfox19IupLsxv1FivQFT626a7ZR19KE4L3Yql1KtZRIRhhNISay3tKWQqNQi63NyGempAn1F1x3nVdr/dhd49xea3pOnhfWzvhjxCpFffXKe/kap92pg7tHDFQrnY0GMPbEkHo1+LaWxc9I2friONK9cR4N6iESmnBrP1vWXbr3wkHZ15Z5sjWbRe8C1P5cdQRXXtPu0Iswu2A5NwayWAeMtI5TkevNkmqGUNGFdq1Gplvo38Yaf/z/83XlH8Y97+yt2OWGnXVVolCz2aiLk8pQpkCQXVFRdsCGbzx4Ozl6023binEjNv0LfIJBC18FSFm0wrNWRvrnQMdCcPHSjRH0dS4VGjUYTliosxU3GuCFUccB5HsCQlGViAZ3Rez+Tjo0GoiowqDnl6Wq8Hui4SJNF0pGLYucrhGooi2pbqcs11UdeypcLtRSz2OjHC0oaYsR+rb59Q6QvWKedRF6joXNgGrqbF5dVNodLS+JFw34u0XMdRoPVQ88m3NGNSCh8vgQuFS3WM0BPnhum/VKqKx03ruDK8HeVnIGYQdWUtES/Vo8hkcE9d1Ryoo2vcynBHPXD2RWTf+vWQE40/HVxXrYr6oKjuYTE8/DntezrxcQhy06ZjIQ/i6H77whz3dU++OyMd1KT5Mut9G3debP2X+za8l/5TPf2nVhHxXiVLlm8+blPs0hoa3DeXDXFflFldTxWXUgnXXn+9Zw7MJ5jffk+WyUDVW5BB3s5TzF2ud3dHt2SIJQReLOvopGlZwF49V4amhB1fdp172JmK3EXiC9LqOxI4++tCNThNJ5EEQQkJqWW3PSJ7ZdluatYVvSvfaxE9dsv+1GeJ3p54Rtc7Jqc5lJ/TJQIQ7lshypS7f0J8KGfy9q376sG35m6i8xS3tOjWUtMZQ0zWWQKQ815C0ovo64fPh5wuXy9K4tpchlC+mLs8oehE5CmlH0o4WI+4wVDkV51CiicxMNtn0aAx1H3uIp7yzzdKtNIpEzzqr2/6wvOS1eW/ObWZ3+WYyX6xSJt9uGmHUIMKbm5dfiF/idbxskjKXs6Hqbsm7qrWZptj600XNFf1ef+rz15E/if6/hPRpe5Xz3eN5WqtB341J+7LQXgu7WrQv1b0qbulTy3293rWTrylSrmpxQ113iCyeFSh3dQ0zJXq3fa5u3p4i8ixCNE23YpWkHw8btyPUEaqoqvONS++J28TtcSCvM1uOPjy31JKWmmyyqkKTSAhCPIfI+mC1DN9UW8oSqy1FSuNM0gMtdom2hRacIKrr4Z4QM+XHdKGQuufvv31ugahItQ8r9WhCieqFQ+QXsmBoB63dtr64SJ/XHl2vSB9fpWZzkTM1s8uZ1eXn3GgH46StY/I2XfdlcY8a7aTx5z7raLbT65CuEGHQX9dhNUbLtDLDNfdIGY8sZKUssosi7uVqyl9yJOvX67Q/n3vsWYoXs6pQfrhnvl5SXyKBi2ihSxrlOdHBQuG774n8RhB0MrpOMaO/pPstPXz5n/9NXz9+/x+J+0+yVYVTtlo9b/e3CRUIRBs3DWuT3GrWbttT6zOpT0yFdVeWV/1nQQUZWCQMeYv18RH2u8cz8S6VbyoJtbb2LFREE4I46qAx3ISPa6jY7xjXWKZzuN2vSOI4CK5ukC333BOyXSeeG4Pq+GV3a9JCNKsZbJmNtJyJP/FV3t89dgmlKGhB6HkyYhzTyYncWuKYOR4M133XyIw9hSMz/Pi8KuqPUku5RWatxCO0aS86S61ntUp5L7IxhLg/CanGCXQti/cYeHv9dbHlOn4Ri/bpVnGdCXeO18GFDOxlOHPMtJGTqMGheZvkjEt6fkmi6R8c2sPZfm31Kg7xKCqtXjiREKP/2EtGSGtisp3Wf9+d7F3Lpdj+D+BcZrIdYuicHZwS0cghGNM15tr6Lr7poL3sbHPYqB7D5M+Esr/f3s0U+SXVb37t+E/+fa2qfYndDUpwfjuH0Ggjrcdy2xrtCFdbqzrulG6NuAPfm/flCrSPRa4ORdzCw7fS4yaqDt6eijOz8kV1vVUQzS5ai1K0Otw+LHqoR9E7fb5lXlJy7IIoYYfgQsJzu5ToDDrGma0l0ZVuSbbvSCjxHJa106I9Oy2imVY+EPGxbKkZKWi6iO6S9CMF6s4sb+E3MLXr+871Rh9Ll5aDlIh6Cn4r1avXEEdVjOpdn3j/2iy/vH9JtH4fNFO7D0EexDR3lSPqFyHsXHs7SfdJ1VY0CVupWI62O1dN3sgduAfzdNIGuRuDduio8YIVdGxOOg5x6EpmXNWM0b5X0TvVmFOnGLGu0Egdp/3pY6tnvO+akzczs1zrwjU6NVsIcfuzHUl6Zeuu/vVokUMXnbZtX2Mfnej2xkpbiC9fvu3W7DXc/1mXrxt/4L/MZfl6/zLquJSozoMyMCddmnxoIcp2uHLx8w1V3e1doSkXa61DzGjSohhCUufe7fl+jmd28lR4BC3O9+W+vr7WnlpaCQlEaLtHWcUuoZS4KzBi2Uot3ofbJAgchGTIPZF7GqlJLaFJbd13Bk2bmtKloLQEZ3yW2L9fXBK/nrDZJXS1mTBFRORJj7F1ztma8RaQ1uPQ30y+UWsyCUMVk0DnsyrvZ7lKaNpntHwUr/X+Ffqd/vhwW5kIVeLrrQxHqTC2ZeT76OHxHud3k3nIOCzktZC+3lGnd6J9ewchUSIrdmvPftxNqD+71zo1wh/J8fVjOnGIiJ7xF8+1bUdM/McUF40+S50oyVaevczTaHSrw9kfh/sx9tadXZQqqJro58X3tA6T6fByEUmiOTe3/qP0yPjaTlKKHiWY7HfdZ40BOa2NKtci3ubK+qKsv/Uf/HrxB/+R+P+aalzm1JbbNvGqRZvIUBrGoNIkLTLZc4qbxfb5+Uep36hW5hZUvKnKCqOoli7I686k8Djvu8KonVCN9fFEWpCLIRolN+GgzbtaHQ5tBxHliDnL1O58eGDb7G4TIoc9kDtY4YvPbDy312pV6eREqqdAT0RNarAYOy1tN9JKPkm9ZGapaisG29JINRrurqNLperbd0vlbvs0WE1LVTPdCxWCQq5e/aa+2hvGRqXNb14vyvUDKQY6vr4fOLxqShdqkIaLjO6c/CK5HV0urFJBGnXdY7h9vS82fRw20gbT26UMelWHW5yRIWd8HVsm3U8EwTvzDPWu2NSetK+NVfm+P8PnIfkeEcHpNn3mcJeBslCY6kWOg2ZysBKZm9TbeYTWPU9Db0o/08uZgu3M2cJn/ENmmAgTvjgeU+Udv6T+h79W/Cf+fivPUfRyfHxZ1W6NNPMDwQcmJsvReMr9TbWnIlRLtVL14fSbt/ZCQUcm51tUCmLcSrGrTJ63kSaqX38FDQWp0KIT1bS6VT0h1JK9fLFaRM15H45GyM1bgj5wnclYAc8cNRnd6+i0JEmlNcQeEiKYnpdTZUrLTDIlPa2UCrJ8F00IKjIlng9dmSGWia2zUe6vw4RwmZ7bjFtzPBCaTopd1WK5FXWJVCt8uJTWoUV7p+N+4vnglw87as453oH3NCT6OPmX97hteWD+ep1Xu3SgYsaMHELV/dlmytn23RTlcOpQehlE5Brrmkx0MiaOI+pJpUuw3a7HXX0qn8VezDjYT1pT5h8y2g1lfdro1lTnUpwXy1++x0kcp6+Zr/PyPkTIPEnS56uecSs9XBOCX6zm7dixU9VYO14m8/2g30SvYn3L/+7rxJ/O9Z+hOFVKtG3V8yVI11laLo1x2XReNAL1WZ1Q1euzWgw+LV/LuXSFiT1ohAgf90mher7UbHVXVCji3EV1+0bSoSI+DiF/INw/VeLWBt8I1TxeF+ywB46ykX130KNfXp/JE+d15p5D3+G8nCMliEE/qiKoQuphCsFqxEirDDJRLXrjWkx6o2IQIU6I4u6NuVRV9ax+4JmIfQyGMUW1wCyZD88S9b1khXG9m0fQL9qCVhryPnWXLgSZHu7wcW3ZWsqMYQ4Gl9/lNW3V7ovdtPoGxe4bOYXnQ+ZXM9oi2iOOsw1Dqa4Urpc1QtrJv3ays2szK3UfjLJxTh6FIn02vkWXqZF2SyutLqNnotKJ4eU052U6jC+NPYqrc3PljMi75+Hm7wSxQjf21rrZMxT7Thaf6s68uyjGqEq4tjjMbPf7d3/+k5++Pvz+v/mrvUcpb65xyUlXres896XTpHUr7aM1TIuERK2Fili7YqG0Zh/r65vvSZUQRVQwMvh2BytlxfsdTKrRdcJps3RCkUCJSI7Wn04dpQqzV6jerOF1fOUhBJJkR+fQFzzm6JcvL0dqPlxKX/fq1ohfTsG4dEOztLRvEufcuttqQ2ItphgiKoZAtIjnqeKEzSvfPXFOCNSj8zorF4tdJdXHLARFH6t0PSXg+MUu5xJEtpLL9lqBaOOimoRA5CXOulSqUI56N9LSKg5pBjzF7VJ+bd/vL0Hdp/n2wb1q5XS3yq0aWflhKPSj9EVEOueR2Qd7WNPswotlPBUehbQ0CbPMe+zk9ZA0Jk73bfaY46lzqcK68EYaeqnGx5dwojkirZtOe6r4Qj6uS0MVewzexRBezfiy3tqjxkOptf7X//DXhj/033zbUit6KV93e86XrczL7cTmZfij7bwc7k0f1gSq/KiqiXcvK6pL/FCIX25heGjOJU7tOOfWGSvGSmZ8TNMq0tlSCGdzhHnEsakWtKow+Va+57ZvOA5h04J2kF4vct9rzJfXPdkT+gftO2y5pEKifbzxOx7K6xclB5UUuVTbq1ARLao9w7cUShG6jtr5fk5U3VWezXAHGWNifekMVfT0bLV8KeuWW0tGdZb+k0J70Qve2KZr6+k+3Ik4mVXa9S7ep1aFE4ZwjpBxbfzq61j+fHhGqIKLGhc7QS/OwcDWgkI7GBQr0pdLevwt7mkdh/aYOUZWxoqc2I6eZbWvOyQarPXm8zK16Enno230sqtPoijzwXxVUzL/2cjR6qNE4k4iGp4E9qDvoodOzJQOP8UU5bSXn27oRqK/RMO1M1Or/N7XhX/77zMZ81UO51U7XeZS07g0ckHLqgxfB1Jxy9cJ171SkStq1vpe+CNdmRNdafExpBYEa6hFvt/V81DwfrcquiMGw+8mtFBVdhXNMb4DFRGOukUIYks8O+LBJt57XBcHkquC9PFVc/TRDWdqe7pS3T21a22nUWH4PDseq3yefHOnBWorNaWmbEgGIp5TNOKBx6p0HXOOKnzPPXwf+7CwhYnvMEWFJHLqXupolNff7NCrYelljVCT16udRVp/KAmXerNVMapGXVW6x2+fnEe/c/d2uv1YX9aFuk2pK61q/R5cb1xfcLOiNWkDhuDAcH6eQSY7pqw5Dv0t56E/Ect6pBhPSCfZ5JnYpbVus3uMwZh6koTr6Jn8/FT9TcEsskqHWiWOjPE2h0CQiGYeOipKp4/dfZPQmNjs9gmx29IYVQwF7SLdQ4358f/i68Hv/5v/pA+zGztTey4q3nFOJvlGmwyDCqYv24srRC4qt91rOyUqFF3q7rXXmhDFMN0zRLmmmMfHGnWs3tnMuoupGmtd4dvo6oSKEKnk0Mw46o7DXaW3ilJEVdWxBbmz7WwQWyqcdRyuxAVZI+8nirBCk002dLdnJHt1T88iQstG14fXXsq3RRDi3rhrV9af1ayRUKxLKq7P4fs9Ve3Ebm11MsOlXfs1afe9LgIppDjsY9XPWm3Vqqh4yepS9Xm5rr+mayulfPC3LiEgMTM+Xy8rHD2TvGlhe9Twuta2TVsBxxyuicOIcCeCJ3vJKaTFPrXpdfAg32+E5pjs3WnoRM5tcvLY7mPi9kTBwioSK3F4W8lHXuhMZ4uMv20a/tVZNdDzoodO7U4rZ/KOi8/+Ln1Xt5dfMiTYnY2OazGRu+p/9F+Ccl1zHd5+uGJYkaq/6R/+WjD/vcvyy/XlnNo4pya1+zi7bhvambRfaI3CP6Ecr131NzEVqlnpU34O7/sWVeVzeYVMNPcdIn3fp2Ju5+t93u/Np/Y48zCDZs6JWJTnquqtEY+FqKhovk1VIoKjDq+1ORoiI3u4dhsnu3UkntAHqYTvW9GKFtjuw55VMAyfZ0F1dktH8inl9X+8VKzKLkQgAl3Bk2qeRLucc95vUT9omGPlyMQwlKM1UWYI8imULBR5y7HdJU5tjtteb3jTr9tv1QHhgfu+u75OlLvClyuKMTzHm74yFbldzDm9/vaohIqaGdTNJX1+midGj8E5V9sor7f3uSLNOMPPcXz90ETXt4gwsz0xeR3TKSupbHYnpGPmpt3fKNb11o7RVvKuy1PYTBTKpRUc7A2RwBNuJGPYTlhpN2LcN08R5lskCeLlx+ut+4u2866pO8yf+vR14E9h/fta3u39Vu1WeWl5q5otrvcnKUXZGltb8dJeTRRca61mZVm72tH0u+7aXZlRTcGaUsrwTJL5hs2e3Wp3nVOtb+/7DiF0hYpU6EomlLr7oWaL0kX4Fkf0KrNU2KIRG2WzydkWJArPHP2qgD3t+dyuMht7SkQ/MvbbFfdti4vEpRgUTvnw1Uo2otTOOhGxdtWmbIRgEiKE9/fzm6y2VUM51fdCmJSzVejpl1Fkenwtt5aKJUUd4u5gqF6vShOYruUNhIv0MZDJmmNmKsS+EsHlUmfti3PF8bth91D1Ce+3j4PqTzKPYQclRyo5FTqlGESg61Oa6bNTkWOaJ1IeW/CE9yFopRVtl2Y3r8vTepmsHnEzdfLud41VJvMyq10OoXLIIxr/JJwhlFDiZSvfjk5bRdInJJReY4zwqUbaD+fzmjHr6f1ljHtqvvPz/+I3fr//3/uvJTMO+tH3ZXHdX9U1E1rPHg3lOl3Xco2wPdrhKlqVu/Y8Ktp+/3i/fZxTVKBK5PEYd6yPVemNGRVqZeWekMiCji0J2xAn6qjdm+rVYmuo0uJQk6qwYcPGsWJ3pcSxC64+LAIPJqMb9D3t+7nE3hUtY0llGOY9XxK/7jpXpUlMSx3kd+zX5+X8gQ3dFPGMG0rlPE+8M86uzraEi8pdJ+8KcemSYwgBoa0uSVRJbDi8lJ6libU1m6K19nu8RD7y3IqK9xn1y1U76BP6MsOZRUma3N7KCQNrKDHW+/nQ9zOrtdPdtNFaG0IZg0HhUrdN4tdMfm6f5xYxjLkZPEXFXYqidymtMnGPMR0kTSQc95DPZ5pVigu14I0Rnfn6kSlHXvIu2hJdBNoq1+dXlRRq3zhMLaqd1nfVZZsv/aWrFLpKrWX6l6r/4d/w/V/+9aqqm6oaX2a4ph17jrhdowQdTbD7KVlQXndV2CqURemCbcm+rcxEKQRToWVvnixiwzvvHeZdS5zaroVWI4PoCYu2pGQS9xbhiHZXVc3IUl6DtskOh+y6eLhzMYLYGYw+UolFoAS0de8v8dxXXcmaV+zUN7tKuV8m3EJaqZzJqaDcs7Kifwg0BoF+wpX5EMvtMn36fq97jmG9nHn+Oe/3eUdh2mZL+XhCrLLsilNdS7UmBO5Dv0uzzmTB9Jah3T6JW+CLVqr7S1OhPiP0e6Qlq7Ltix2fx/YrFsYWtxF1f7sxI7hM1l4eZ0gOWrQ6ykE/KpFcV2STS55o7h1b5uxt88Z96INrUnRYlKKlhTX9aX30zHJEmulM2z7du5d/NWaj0OmEPtM5aMV1eRsZQoZu1dG/bNInY2hoyLtzEPL5B9KXSbuutwtTM1OrTPuP/EbvT2H5LzvHSXV8V/v+KrteeqqK/ITWtOuLVtqEUVE6/t4WalMVWC3utMX7PVH+jU7QNAqZQRT1C/Xd+xQPMSWd7zXRhlCU6HhGoOqmtUWJOHZrIdThKKTN7cM49s0e4dyd4Yo92TONflHCOp7ZSM3HdaQ9e9Y94/ouDGHMsbuuM0ppaSSBfERsSPnlCURERSAgMtm6nVQ5PBQWcT1r0zJ8HOrDk3YtVc2if9VCSUx/vnG/+i90tHRBXcLl97j1Nlt1vqp+oV7qcqyO88iw+92x1Zi/RJmfS+WmQyqXHC63j21zztNNK639iSF0f2FYXNg5vn62eHxaakWQj6dJg8dInKjUvAxmY7I+Iws3cc4+9Tfz/ox6VOGpSxUEcuQYjnXE5OeSWCshLzThDDVUf1Xp+Lp50Y7Y62vM+aKqL+OY9Jwv0o/2EKXUqmnvH//eb+x+/x85978adN215pzLqq93hXOfyJMIrULJpVajcbTbtO2MRhPqKl/qy65VloqmxSiqdCN+WRd72qNGVKieOeJdNSpKEg0Jht6xmpvjoJW7Ku4qluasKBWio7cb5YHed1j2jdMeyFHvEvuzpT3x3LDN3dnJrdmOpZhZOsg8PpZSakKonCGlEiYtVsQR6i6xhVR8jLihup44ylU95eMz77rYdfRkWqMNfZChh31ElnqWGrWfxcVRvlliedCm0kubvoz7Kfl8uNUvvs4jne+1ukpzMlKtj8AqrLK93vANGoMfMzovqq5s2DISndgjB5RBEfSW5IpsUaa/E8He5q51pNomRNBk233d8W8a3b3WPjOHbotOvP/9cwyn2nuizKop07WKRJ7J9JrQp3AG2aIOHZ6tpQLBio4fz+Bg+9AtWGkrJbxN8i4jy8B//zd/Q/fH/v4v3cXLc2ZvZaqqVG2py94BoSerNIYFLyyNDK+13SpZ1i/hKd+rnb28qmYo407WzPRx7UfcEW4fT4weJ1UP4sSb+GXKUjsMgXU4HfYRTbTSgopvo0UdNRoiDltrTA9egfcOueeQPKbnfrSMvgktz+fe0/2LnHnjrJhx+HbhYuh+3eeoZIo7cpw5Xeuyy2Iv//f3cGcooRDhInCcL9O1gacnhDumy/SxXPNiyhwoWG5ZpWIsQo0YRPHa3tLM418bBd9dd1yCJE4Kq6pH+ZrLsSPPlSs7kkEFAvuCcENdZiZUegeSEyK5SeuppPV5t9EYXvtwSZzi9V56ZoSZHT0jtkkY4xnKrvLM/YRX0sl71NwDslWGo7pbfmJ8PcMPn7qoycg6ItU54u26hHUZegU1u5w2rBxoKGZdFJskVe03q6rmwJiL64tj5svb7l5pb/5Ff/iN3L/zX+bCtaen+uS6jLGNIXucrOFi2O6na3u1HddwTZa+yKcFy7KfNKX9gX1MQpMgfLqln21eLBqiyehfz0PSo9u7zMvQ0jRaO1b7H22Jhyb5lOOIVk2kHp9JasWROJWIhHBwnbiotZVVzH3V3KcG9tOX/piQPWyu3RjjR/003aQY9eN1dr2311tZUbUqERVm8eBJJE6QBCkUd6n3cNT+rnaNSnwRL5Hbk14nn+DoQxJCCo/w8Tao6Gp/9acwvXY6+rvgnBP2XJ+LvZzS90a1Et1DjMrHOXm2SzZSCGvTQx5BtHN6EoxwVQQCStn0S6PRjebDrkY5qmFGc1ixyogjI3qJVgunXtaodF6rCuVaPE4VVSY2PmbeVJIO6uIy1YK3zd0tUcOzqgpPFRt9lIuYZ2+Ns9Hm0aIr93G/2m+TdbvJfIjkmHPQJWrGO/7qcf/9f/r2J6X/R13+WCtS1buhzSiJldT4rtImIxhjIChl2mhdyRKVntE9KyGf31nPs+wfPdG0+6bs2iZbt+W0xXbFFcexjeFk/gZpBhrqJc06vuzKSfYxStqpc3q2uchM4ggVcZxyZPeckK0Q9qWW+9UFU7PrYiPXNax9Rtp+SG/eHhuH9IzIkIqUvby2f9baJ/a7erWSEEKGfVxNIAiRB4+oispyXUt2+fjevENyKE/wRBzoXKPTPJ1PW348Wf3xvPTVB/r8Q9XL0BnedldH4kFE0L50VT613z/RwkVGcmxdY91wb2dcSw/Jp8kVFwIl+ooz7aOiVCPUibszzosGj+RpqBA+LJWBasSkd6b+pI4jT2VVse0N01PrUs80zZ6qD01Vc7p2qj63YfhXCiqXx3Qyqsaj95ioVeYHMzOc7XwdXfSDEK3hSrflpnFqBjK1NW5U3aVUNBTN+73+UZ9/sMefkuaftv3ZIv8uLse1xh1kdgeX9+Xa2bku1wmfWZiuzer3ZRUUo3s7T/sJjzZ9Y0O7H9bLWDI5R4++ED9Odtu58RxnuSD+ZBiK/z/voGIU/FN9zL4NnzFbvhMrIiInSR358+yNl3ZSwnVmN5X3OY4uvJ1vvK5NoK9b73RHxzouXUYeBqUp8bHJua/r78rLrFLznaAmpzedgZsyFR7EqrPUo+uNr1JnfC9RMbNOHVfI4Nhe8wmGrte0Ujt9P/RU+4e3qmN3T8r7revosrp6UwoONrltVJj4xM2ZqufKkAcTc2UkF7LtxYEzfv11k9/NoVG7z7QPh1BceMah+84/r3y5jcedmuDZCCEoBMkrNmLioRp9Siy75fpGPdSB/55Vk/zX7Nyu7STvvKiHCUtB3kyxkqm+gwWnLIfQCETsunTVKY6wnFKCyxpuv/uinNhBUVNNV5nib5j0p9L807Xf//+ry6J75u/eMwM7ew8pxYe6KQOxjkYH8Ru6/vhlX7F7+5xZkX36Q/oid+UvUvqk/bC+2RexXfrkQW8OWdflV48erUN3Wjfv1K6b144+mqFmdY5zqsdav5m3OJVyqCKOL9lkVt0El7rOd17X+c4W1La2z41+n+9D753nossyRI0fxaFKpIkm1aF5112p+2chsqKiSMGZz5hghC8CkfAoecuubWjapd455nJzheQk90/Y2B7M8vdaa7qQ2ivd82gSC1me4bUznFy6y9vwCPLxmmmuz6ovn3XO0lxuOxbpGRnt9fugXIL5w265ptJiPxC5m76I5oijBW2WQWvtZTlPH+5yzAzYjlJDxdxxM7djjIlFZaEbireiTFXS2qlwjtIjW8/e766RUxc/J6sqPfWEjj2Se6IeeJvMgjmFnHnpbSnNtGqIWbGNw9HtesW4s08QyhgiOCeO9jZG/93o/+ifpvk/pxAem8eKVd7r800GRh+vae3+yS4EZtnL9Yu1sHmULGdr9GSN59EMzdD7w2z5MFyjvYbtHbIedPf1eI8PRTG1gqiVV49lf9axuowqPTO2ofQzJp9qnnBoxfkz/yqHZE/hbyfiKjIl9qlFTQ1lytTYmuehi/4QI6THwLP1ioMsEaPHu7J8GeufrHuuDyt4ivtuCHgE4ZvPfuJnrZhnCTVj1Zt01M+3qlsOD8rwPOJknHEZJEn/rwEznjSl5lpoZ8ip5sWG6TEn7jcP2+sXghNM86woc2vo+FUxN9njjNlaJn1Y9DC7Ec8etbr7IR/hdNMRzUOxYhPFKXUaQbRR7IjWtXrplhh3hNi4Ljwijm3S5WtlpWkes6osPxkTk7fPTNHj3TyW7x73i7fD5AtF8yWMYiwmU7m2yrREbls23XfTajZOsTq4g8t9UrNDmuWGW7xvGFbr94xj+u9B/hGff3r2b/+9JnfVfNg7Sofncu0LeSTGhUbtDya/jJeJPdoDK13PWVBufWm69GjNtCBxm+iDg6w35025tp3g6j5sV56/R3Z29qWjiTLwLurF4pxn5SeLtumna4eurtNYSxAHdbAn/HkzTh27e6byjpNLId7n7Of7hG1Kz8jsW3+oPM2anfJ0/JB7viK00N9x8yfHdvE/rxjqUXEEQaM3ngwZRAnYnbe8K8xy5hrVKVysnwvqsut47lFDjkm/dH9kS3brGcnanHZsdF1Xfl0ZG5elD8STCOxzFnyWN8zPpZ9WzVGitDW5TqNM3Q/9uMijiMfrhvJaXgPVS3ENjEteGuU1TmtvsakfHJZVazPbI9KxTT5Ty/RHYRdV3iWYVVShaj29zO6eUTVlfo1OXlRNVCF94PSZdOKeX1iXSbkuTZuN1HQQ82yC2jxx/zo/coz/g9SIzxRTJgJVVZ1jIf8G4p+T8Z+O/f4/2uWf8t2jFs8nufKwhcqItEt3uVLoPei02+Fl/ou4DWtZYvWFiIQlz2ph0jStCqvxmD8PVJ6hZ/p6bEEXn8EkE2ltvq/fXikN/yz6N3VS6D3FrmVhEjKPiDhX5ohzyiQ38qbnJ8Q7NcV1vk+u+7ovbG4fva+xu7SMCzkfO11+vJ85hBaR//izrS2v7d5fNBsZFcqHRdhnb39C8JUi413hYjwHYZ+7HdfrvfwcAZu9fNjHn2Oo9KZ/kmcO7dMj7Q+rI9iLvAxdnzB0fePrPD5O9cvPo2qq6t5b58nIlS1rQ3PslFhirzyabu1ofZlbrrhfzh6IcOMpIsThTI2uNQgOXBWzF01UE8d9HEd3h8OzELc4snxtmmz+q1afibIonZ5qMkatQNt9anihTFzGeAf37xz5zxC7i6kKqyS7p5SuuZSYa9u6OGid5nLHdbU5TNrFYdud4RBUlXPivt9mpH/C/28g/ff/adgf+/tbKvKedsEmJSf6MP4jsLiURiZtapQo7Tb9Iv6+bKpGFh5kb5rH0EKGGmg6kz05u3ItG1evvzFIcI6d9bsGg56Qp4SzmmB4hTOGWlVf1aPOmMZIVgL3I1I5+6cUxhXHIXO+ibzPfZVV3ucx1ChMvZuX7VkS8+n5I4fNOsfh/Q+Ki3iWYt23tn1e/rOqs6JENQoedkqRQZAPHviCqglRSg+5MZvAT64pEU6K82zTVbNPFmEb1Rr2WpRDbFZms3RLlPd/VYqQ9kvgyYiLt5Xsn+vbKyNIOK7zEVzsifIapu1eUwd7kP2SWU9Ve+x63KP5Q6pEc/Gj7APbh6c2jiC1UK2ylsOG98gYtoPVe32gTm3WY45atVTN/5maPcbsWaf5aUY78EdWmS/WZTIdZqq+plQFyvWNlHvcmSJVWmn6TglShIN0f8sS+pYsmanQp3bXqB4fS80M7y3P/+f/+k+//jypv986lO905erQ5NrjnTxfmjWvh2u4rzJWoQXFeY0l7yx2mOfXk8rV2kzku0zGbPPDh6PlQPjHqy9WM2dlraTHZWOP65knvmzdWrd/3DaLRU2jKpVRrXqYNbGykv/1EPy5Z+vPbBA7dZO6Ltf5/pyU90/2qSmrTJl66/18Pzx/fWZYf+y5L4bd0xxUQlypjgpdEKfnwnKy3mapdZFBXmQTwtniBF+C2ISpWT68qz5PFyVv6LzXQ7FsHtyN8adRdCGxNFnBGT2bNSl2J4OJePAnJkQSEA4blfdWrOjr2SNjtu/TPdz2D8h25Trzh6tV9kRb/ekiWsbjiHjuirhrz4gkLjjp2jgxFbrQl5oksWLHUQ+jiKn38cxknE2ReqdoZlXxX8WzzHp6uVs/dptncrd213peIIXl7ZpmLye5vX4ssx275oKerc4d8yhiZh9p+wOWe+FW/Y8hXat1Oe8xzinOCfUdMyLi/qvG/xnpR9cf+idGRilPru7LVn3p/yZj75PttVNX1U00hRfSTuo3k8fzxsr/oT97LawUfzRP6w98RzJc6zCLTtsmoQ/busxjHG1eyTcVpYe+GJZN6XY0jSGRtswzYwxV1SzuaZmwUc/+6SAVee8+M7kZZz4n+3mVKVfX+7zg3C4P5d29jYPet07Znrlb7K07lG2bR2xmokpkpJDz7j/owUQZnLv9QOKyE48tvkK4Z7W7qULY5eIL/UX5+PHhxmVCHxf7j0YkzVB5niyWBx7FwBidh+WvuvHiPPYLfxKqKfjKTXntv9etbBGtD4VYm8z/qrMzSm+Rp5+Lmz1yRH90sWoFVcc+qkcZ9MtrG3uFbWAcjK15HG6CO/RlwukWDLTPUzVvtaguZb6Rb/FfpLtS7Uzbqfh6zxfTVmEqkc0x2y2rXk1FmXU3Is4dpC2l9blday2Xuv2N7ttuhnhlbJzTOYxVlNb1xuyV/nP/pP/Y+jMF/q4PDr8DuJPnuX1DDEnmZ+i+sBaX20mjbWQyJwWV+OWwfzeltPRFkp3l92O6H5QpI0z0gf1E9eYighUu53ddaG0MgqE7lnj3Xu16KOP5SVljZEIkrnEe+dNYu7vXzvlm32jnWD65qLzPbBfKZKtR47Sl9YzLzpWM7ZmxJw4chVsKtaSaMIxYsdfcqqmlwnUq5D/hTwJBQ5xn2w/yKPUZLlSNUhMeV22+kCGO8Dw+vrhGuU8HTiLpxO82mkq9xCNHkp7B7W2RwRfkS0Taniz1tRQrrlz07GxHZHstdysqhTX1cO2nMijttSdZbofiR/NbqC5+LK/jtLzePzKr+eJN3Za1l8Z4HovoPIYqUtXay+esafpplolZlFm0z38X77a8y2xZ61JMVSzFGvf0zbsNqbo8y6QOREjNU7SSvYUpRVT3FU5jvzrISFXt3Efdt1uNplTVHWZm3p6QfzP5o2Jc/f5/AmtKjIT8zUxsl5bfp9uAy7UNVVqx6hVobb9I1ni6Qp6VridJ2Q3tWWcZ/D2JptJzUlmklihsdHPtJKzBHhNRUHCg2og3P8/C4rZH9ahUVNfIWIs1XaP8i9RZ5f6/9ebLe8U591/N3sTl03ziUpOb2c93l3E3OhbPtC//NbArEwlqPyyXKxWmICnr71nvam/oWrfi0675+yqiN0RtuV92fkUgyNU0s2rdRYh6K7bihnCShPPRoE+vSWUty6XleZyRiTX0UPH3V2vmZGCNp3OSx+Y82Ock3tFn1a9l7ljEyhA92KMHcvmd9uHYOfn1+u39i72fsPXgnA+7xnHM2lcRVTPoNI6XbrZV4RrKc/j4WL83D0ZgtiQWHMqCk+yy6innoWp56uChT486Gk4ktbJrFpTr03KJqkBHpiq8/bD2XBdN7yLnPkifGbrU1t6+6pDuvtjR0u98CfPEzB5RH53Z++39nrmlf9L/df2Pq//WP2j/O0A5sxN6J7TjM2pUj8ojMS9Io1Y3OovSzqZ5Cpo5BdpHsrTWdHMZB7RJ8M7y5Tnz2Kv3Ndliumav1MfYF5H04prQ+gTBLp/pN16te0edobc6J86uBCKWGR6MZKLHKWz75ve370pNdv35lmLKKu/X2l9cr9nas9dutsf+8eyFbefMxg8rX0hBqYzAX7JCpIJK+miP12pNZPh483gta+SpVXu6UFRl3832cNnw5YlEx9DpudZjJELqkyW1V1dTVo0eM973YN5Dnw1Bek0r/KzthtWGdJBkRJK3sm0SlNn1KPpl6hJumFsz3FvErCHcQYWh+XB4HZf8vZBn4S4PwTrWXiJgmdtMPhWebqk7oc7i52O+UY0qinGTd89O9T0to/jyL/075AhOwq6eYzBR8/IuHWem6Nlf6e6ei2PH2Qj3/QYX4v5zpt4QZtZn836vkOc4RDJDPJn5Qe32MfXnSf97p1qp37zPwBhxUS3bnjSsUQoLjS6m+2koY0KC8jzI2c4ve8SztfHoQdIRvnULI/7xWf1jHb/cXmOeXJJ25erxxjC0fPOZmJrWFo3NeGRU6B4YUvUnWcSSgyMczPnKjRz3ztT9fl+Hpa7zHfafzH5eL66XN+fYqi/GTBevlT+b3PvmGOrorgrkjug5UqSWfbyr6Vldd1Zd5cOpBwmnpPD4S+sS9Dq1Pz/q1T43fFEpPGRuhNsvg2odN2k757aChdMsa9SbTi5Gp46Pw2swm2FPRU39FAvzynngNF89mFuxjoOpN2tNjrmRZSb6vua39VSs/Y1qgdr8+HLmi5MOdwVRXutgHkjjqtiOiIhjZCWVVFuYNedUtfJ/qExpZkt1bKfC4W7Gd9e8vCzFeDP5Gtt1i3rw1AWD9CZm2rWLVnyrBHv3CbX3gzSLLe+26LpnZlUrVUrXcJtw43Xs42FE/ePoT30uhYfsWantgoH/KgmG3X4sFUbFMb4oHyytj7YMy+e2oJNjJTeZyfKYyHSttP2BA88Wr31laBi6o5PrmicLPbuNdAsU0ULrZbme4WbwkTXv9SDiPkkd5zQnLFLy/f6+kTmWctWqdQ+OcVtTw3aapKXrnsp8PJGpe/83XG9IMQIhyJJ3scq7xVutQ1LMwo4NqTeEODyaX6bcVTGr3apntlJ9hdeDL+JAuoZi6E1acw/r8ZhpK1sb2CI6ehhKFIruQbJjYx+qLsUz9V4tTws9vrbjbihF7eJ4/rg0JWbB+rZLbuJy7rf7WPfMGLIGMUUnZaOgDZq8YKpqFUvDGmPD/bwzbLGOv1nNkrJ3CrYu10/pcvzXF92fO9V9pM60WCjkxVSId89cGMO/uE+ZTEHO3Y5jHoi56DtufSdcuD5KbZOWalHvfeL9Ht8LqvX7PUw9Mvno7j3c8fRH/676c+Eu7h9n6Sta6H3sPjaxyuX67W49FVb5oF2j2c6eytsHu8eT3rR2zfQL/71cQ0Z4F4POYryKY9kt7XVnPY/jSt4LWg0FpTmafr3Yr9vUsbVqOcMf7hlubD/8kyyzjvhft6VMxNrPSxzn23nZO3vbz9kcvanh+sPrc6/hRxEpY3Nslq8QWiqCFP4s4wixxvo1gq6iy2sowsfhQbLsqTjLKPNuStRpr58bc70+AiIwcekVCY92tlSe8PlIUV7HVtl+OahApnDyiSBEZoYPywkzDlwi/VE4gmPpfcW7H1hrc20tzFZnrN1DzWu2gzaoigNRpa5LGzTxslDclH1HpGoVVVqVuPWQW4z32aQsldSqkyons2YV6oGaXcXN4fOZhJ7/eQpvmEWomciK1iWJmqjCmGXHIZi6EHNp0f+Kbq2Gy6kRozMVza3aoU3eN0FVESFmZmpT5n2rX/tROZZ+/x9H/WBnFYkkqst+VD78Vyk7mfMpSrkftPvS3lV78w8eBm6sxNm+JBmtbm8HDPND/aOhXp3JoP3DtC7XdPazdlgP2fxeMJeedPSZvHsV+ljr3VLz60bVqLOVRSIWgUhkfW5z6tvZO5njyo+WvT/f58XR7Nna8XA8yu/iD8Ky01aINUlC9p3CLvF5VRBuj79zeYZrlcpaAlegPzP3y05/YdV939ih3hXmczqXNTOGuMT9Ka848JAPru5WhKUCK5pssVhv1tTzsdBxWTocr1+2hH8gjqa+1qf7Vi967Pfc+BVT9LE9GcytmHB3+8v9Nv3YrVKxiEn0p3k9JZJEaGI0dR0FFSNUZOXRMd7NdrgnONbz0lrveItyV6GmZbaiE5Qt5aAcYuIpqCeo9YUKZp2bfCnT5YfrRc/zlb48QevjzLtG2MBvpLvjFZY3WO4dZfQ5uPpHecsTT5Ccva6/sfTH/sub/OY3Za3Sz5AzpXtuG7u57L78ZXRQlyVNHv3XdE3SSR5JETxe05pmeOZ0O3r0ULT6cFL20mgS7V3zU726uBbmzRAq2qTC8xf28o/fD4o2Fe0hxDUytbMY+s/Y+m5YKd/rut+8U5aD7Pp4HMjmw9fAtrvYUzR2zg3HN+dBXAv6qlDQzOG81ltdfi2hQsUYB2mH38kMf2mIw69UyyA41PGuE34dcnOO7cPcp8rw2mjZCBFNeCweeoi3WxdlIi8ZW0J+MOUzZ6rOU2Zz+iVd1mzmHraLikcxu/oyVzfN09h6et2M4QhBHTW2+vFGaNB8sSjScWbEVocPjzgyJuQbQ8RvPdkn1HKu9Bcef0upUqNwerZq7O5CUQhMoibxlpCzHV0sVcsqJue8qIOWeaYW1BTYbmxfadxidQcZjeeNiiilnZ8H75orP6nbbx9H/4O/z1L9CEVdWz8u3bKKMVv7zMq8PngUvzet5vSHM4tai6E1W1qjnc3KivgjO5YsP7YYF2p/tLc0PpgnrDSDk8ve5nHt8ebyWlYzldHG7NfS8K4mdFUqjntUl0GISdb05yORdWxbc0wqnVk7eX9O6qKWPX1s4is3PA6da7UejX2KOKSEpCyDFnP4mJFC9X/+Lvv4NMFootZ9SyNgEydfoj5I3PIPs8xbxfh4qmxBy3LdYEhyl9cuWw87W0+0ePgkFPQU4alF9IlVD84mEue8HKsq3ou9lFFpx+znUn1ZdysN924C0ROuaRPBoRW9b9rDD1RfkWQUWuu0MZoPQyftMnfkvrGxbD6DsR7uioK0JxdVVPG/6y9dqKYct9Ne3sxEKd4vqqqdglQ/kzHj28DEpFDMtqWmXGi0eYYuFq77/0C4XWPJlEkb9zysDVVK02dw7h/oOfYu48gfc83VMz9q3gYxaBlHxT5jZJO4Lv/M5aM7f9/0QTuNB4aYiwSiNbmT9lmiW+cVRJsbLZrxop0P5mhpRrrfq7XcOY/iol0DSwV6He1Z66VLivLv3catTphezttWsmWqEI/bMWbn77t/ZtVFhEO2cHjE3ltutmgPqb3hmcm1nbt2cuOgcodLn0eMyAzfPY7j+/0VWcFml6M91UQJ3C/CLsFzyJ8je9f71nI+KCxhUw5scyHC62DoJJ+mfxItoiRkdWsIbKO8LiMYChcHKbGfYQ+jXrbzyVtLpi7ZM/qzc/x1cx7dlPZgdlSwE8+Oze3oQhyoVpAGq3ftJctoZcyrBuKpI25Num0u8xzbODZpDlWtTrvyeOrQRaFh0qbuT9LloKEKj2v8rG91SAyLHk36gQceD8fWomdc+lRpVWcSqnLlqt2PllfZllHZ63epZ9qvTbTuKjNVIXNffDT7tWPoT+f+/xr4TSYuPEkiJ+4c/YkeLmNR/gMgg/Ktk1am+GCFYyXU0kRfrSRFIrJP34UWDCTlw0iVQ/nVFgbtbzPPSWSNbBcLUZputCXqoeR5bMZvxRhr6J0RlmSTJP68tPzZpLvjm1k37+W79ZU5OPoQxN57H49ja3vbKPsYvfWDZP+kHVXWhP31s+1aOMZsFc/hObL2u+dnf1aoiroqxnay5CbxFcJf3qtqa1udKqLcCYhU6K/ET9J2HubUJzRPcm6yku1JRqoNyeTpuniN0lHldfvLH6fqreLcKpSvxERvMm6uoOzm2I1qr1c/JZnVq9Eqbr2XVWoVVbfwYUscozEcWiCKOwpmLKt47m1uxPHcgdD7RDd0W/hpvv2XH7ach6Oic49d3TFOBh5UYakJkxGVmbSZDJPlzVQFmVbfkCo1iMaTqijbN4/r1dFftSPTkzLc4B1jSpVSRWC8zxPcdF7fzsbP7/83/4k9UHX5wVWLMGzv3dvXt5NQ6cnlFz0hmB+I+7UW0QILRtLRHyMjJCZjVpt8MAk+Ex8EG5dcM+nin5I+hsvltWmIav26bxpK6WrXkao7bm4L91mFP+OIIk77/ecttPTtT5ejHdmOPug9vvphR++QY4tpnylySolRY/GYUdMzpBC2NVBLWbW22oQ824nYhEQG+ZKRi6JNqFkq4b3rQVFy0seB3BiMS8OJRGutOdLavLov55Aqst6wFHQd8RIv6cNg1Fir7iT2SLYjnuvMjVyQq4lnc9kvsi6s33jEcoYxn4jniIoDEYoIQTPopI+7ap1v/VQaFVFiYzve4Sges+r0czrNqvKcaRbd9D2n+S5j1Fnic0dGw5xMmF6W6y7b6BxRBQ/LrPN0zIPMqdGzX+2Z7uL6rrSFNEI6MioDG+9xyvcqjop6v99GSajJ2Ru44+fPW/o/e+E3dkbH+UHGyOlnup/P0L/PGBoW5UaNi1YUWsl61+O1BWoFa57JkwctidY0VJQ/eIzFadfxInY33Ub/Hv+6xnicrdSv7iybdq2tvK930XPxqgzjd3cV+x4TWXLEvv88kVMI92tWVH0ze+/O31+5xP4f3iI4IB9s8PDaz7BJ821sZI/4muk2xS2EOCnP6v/8sf66qscKYVaLUs21AwKxKxBQU6vem6pYpdp0uc5QV9z8cq9+BA8Pl2GSFStt6bKTtGY5K1O6t9uZ503po1sUuZH75Zt7jbXeo+vnO8PcIx9/Mia1bseUPnmajaICMbt3DpPrFNGWW9ECsdVj+dEo6BJ6rZctwhAjHLIiyDIvT8ddzOaRXTVVH8WO/yrzPFYx6mh17D3N/Zkzsxvd5nPXeqjCqlr9o+/umxr3EJjeTHz+yM0RTiBTJqk+NU6pM4g7xdJ9ZwVZ0hQ5PsacororbY0KmRy/jfzaD2tj5/f/IVw1tt6/6boM2eYYuiPbflrievnPFsakOx1o8/mtLU8j1Ekkq7fZCpqQpKEYNIZy/WiDz6e3eJ5cUDMh2Z1RDKg5m6B4Efxe7KyXkHLfI7rTx/TyD6xM5v9m/8Sfkb6js/P3t85rkos4InsfHL333o6HvdncXlTGYFayL8n8m8pd4uf7NdzBJEZlyb/nB99vTq/6qlVvBr9RRH2yEdh3bLbXs4UVNV217iLGsK5KnPfUQf202WQ5FMafkHhMomkPtZ+eFTVDV3qmZVhq2mV1EYHziBMfpepSpvaaGtJ32f2EHdFvG8Ufp0ZpuDVpz59RXvvtJWNw3JbXWe4hfr/ueBnacyGOQmB0rCpt0HBHx61m43I7KK0l7E6qijnNqpbJSrnrmHVqJbBv1yooMVWTksMYTlIdGeVasMrCaaQ03bamb8TZ5Xu0zzPS7dvf+sEgI8IdNyWiKMK7xsnaJ929+6Q6rno9Gzu/8v3XXFwvKCNrlJ1qI9adYktqXH7nyzWbX0VFK8UuS+BxuzNW4By+/hYSj6xoip4tiI027WzFq+eMqSQvu1X3m0ebaTctpVpril6wLLLOYt+qy13Gly/j1WrLng8WO6PMQy9/NmZWz+fkyJY4ZAsO6J0HNi51la4g5/Hd7j0jcVQp1pES5TlCSmQt/yx/zy6NekpTS2nsIb4Q1N14OFOrcpkvLnvdqqKG5DN1faEEI5IOnXG1Nk6vzRKrZ8rZHkNWRheU6XXoKfbewoNMwXlgdV2r6sciT1Ozx1FhhWgHistuJ14DbXbLyKZonVRYqsTuhzFWvXSOpmk8sFWriiY8vXkcsT05GZd7ZiKPQYeyPlp5fZD/cso0TVs70tOYB6dPxHz1shxVY8rWRlLC1/Ni1mOWianJrLVpc15S8xTCsTfdgqul2XHNCkGihqmpUvUypni8Od47nvhg7u3j5n/wrx9G+LQsNjnPDFsONYaZUvArZDT9t3IdbytztXLfrtlC4nNmd13j82kD13hUmB8m+6MGv+b0HltF75ULe8q8mOeMbp/f5fJ7KaiPojV7clofnqcW1XyVE7v1aVlePlhC+OvNhL+/32/HN528sSdz9E87yJaD4/vg0DuCDb0dD/3nGj+dof2IY4+DkqPqKKZf7xGj2i/f/5Q31xH1B9Ta7koj7ibKb3iQwlfweGRk/7zbuVVU+7J+Fu9gNLO4GNgwuqld807myk5WJFFyWpS/42zGGxkvYysXETHbl9jY1tr4WXt9qjBlv9vlsvNGHCcf+m1xUeuOCo25OoM1Kdns6uwmDvuIGCEG5mGkD7/KgXtrY64gKy79toRVDhHDJoynYjELO50+n2mWs+r0rHqsetAmpKrE7Z0oWK/2NIPD34yZMVoyzRfrMymHdupy/oSUU1Wif3tVZZ9ctYTbVYLYiW3uDY6Oc55DeOb9PrNUpXTDdxk3f/AP0Sp/FDd1q7SP6KSyr0KS7RoWCuaHN1UMfD61WhatGCTD2qNl0WYJ8t1I1X8vg2SQFuqbveP5WNp47uCovsa4c70/iSlUmaUbHV5l46iy1oflr1WHo/HvUri5mbYdk1pUSOeKTV8dqu/b8zz6ONpBHAjZjsfxwMbDVVdBYQd/u1Pb145St6xd9jFyR3wTtBXvdkzNqi6hS23IKojEF3FsH56dfvp1t/A364t9eqgyqo9CsXc9SB/OYVS+FNEaTRorHjW2/FmYx5ul85g3bss3N19CVQl3millXamZSH/QuPud3XIFxaUX2ezGIpaGmxPXfubzFHcVSldq6e2D3ugwK7ujRMRqBofTET0Lb9zxVNASmepMxVI8ljn5eJ35ovdsduqwP0OtKijzoaCO7zmqRCSVlBfF5c2ZUtoUDT26S6394kbfuDf2+syIEcS+1MZMoUopJWpGvZ8HVft+zK/9wfdwx8wf+J83hbWDmh9ntC1txPrk2p1xLToealFQRfOB4+u3icemzb/TanS6RK4ukdUGH5pBoUn3nGQ6ZuKl7JnYEW92PC5rUdGupfHu0vJYmjI+xansMbwIkbBY+FPmpHeY/7tpX2tGvjPipx22HCIc4njEzvfB3ja2bJdyjEMdF1/Vak8xHZXKruX6WDEQiqBY55+S71rF2NvWm7Ik27Ol13gJHopf76p5l5j2emc5rMQdkvOV/sLSDRNyrcBOdrXczCSuPBnI8JrKhkepHSETgchYeGc5MP3WI/LIaUFTodguLdcFDQtOzxbBVdVi7lsoEW5EEU3DxYAUhGGh9WNSsailwtwu2xw9IWbB6rN85lSmqscs6DYbqu86ljvppPsYPmsyC4lFvB3ZlSNlGOkafrjKUZkL4ZQuU5NCdLg1FhnkR5Oedkvo8B6O5aCprvd7DEnCxLF/czZe/tSs/vHoVfXh9qacQRjjmdjXyWdObx9WmgtNIO5r3m1Vy5qphlLyiC3tyXlmtm/kmdJtUqZO9Hlrc4jKGNiWpEcau8/2GWlMV/v0umGb9Xs2LLcvE7fqyhhqYbruP/E8wvOn5/vrT5lzZ1vIm2pvfF052iFxcDR73G7NZkM3Dvq4Y0odxXdWkHu/y/thEhyZzRRZ3FU/VK/qVWK6PmPu+o0mfIUfuJuHLc9ypwLVKs+uS9W7GLtsX+/IjLgPSXzQ1bi61tredbaIaj5P4E+tuZ1tCsdDweflwBY4SOyz65efU2qoetuVXtLbyEO8hk21/cRTmDhoeZ81IUsnslrmMTIerdYO+4om842Tjt1I/NQx1RqFoMRR92zEC8ExsX1krV57+6xiph+XDFY9ptjeJn8+9xj3uKcuqyjTqHIhTGPyPpIhQRVmFfqJkjmjhswpNAetn+u7tIrFTf/cgkxlLmV9jIiqovs7s2b2TlUqcPZrx8sf/Vfnh5gxj7XKbtCh0e1NL5sLLmXBNJhf0JhqNYfGhEu7gyQ3bL21s9JRCS1Vs/hHlU9t05i10SZD/p4Tz2rb8tdV6AvpF163fdiarvEoVfMZPExp7EnJilPtz/7GHdO2bi/bOcQRjuwdDrI5esPWm36U8vYnZ/JttvpRqVLx+6OYpaZfvmtWUMZnrfDbp8qzbfbYHoYd22uwq7xv7FZJidrDOxVahJubsb8Izz4PinkbVtZsi7J7ssiKbkXXPbArqyMu3XiQews4iCc8jOVd5T3F1Gfk6Zp+PEycSX+UgoUy2esUXEy1VWp7/bTVLR29ap5mtbYxmkEL/IhgcNSlVLV4fBjbXI/wmKeesZclSbs+FGuwqhzaNFv+9syppU4fdI4ZxSpsNckptqrGdxuUf30yp1TfPfuOMDViFTZ1CA6CO9NBEKPLzrCoo3Df4z3eP5JwrHl3u9dY+SP/OHJxfufsPfvjKnkz718upQL5VJ8+SdJdLOUyL7fRYmiLPfQq7CfdXkSCNRGLpFhmYc5pm81sDUPE3qt6KaV7hk7MJ60fXIsy3Kdh7fVaLNRynvq3+ipb9WAXU3DP29PE/N9NX41f73fnb9NNr3Lk6EPk4Ahih7Y/eMA1up/qSsmZyk9ll+/tmzp7WpqQKcK/hyJjWK9ff7B/Ww2XPgLiCL9VyPDlmyfE2675rFVWTa33m0FSZ1N1nXIeGLdw6UZJKYqVSKvSNNlpq0S9zNaEDpX7KAj75cOduENfq3MO3fNttrM4lqZbHdbcOdMOIaz2hzE32dPrcZv3EeXDEIVIHT256LRVPnxC3BUVklpxhZlwTBKOw5Jdeoexox4UYXZNqhn/zfjZhNk8NVPDRCxTkZGi7Q/yS7L3qyorqmCdQvZptOlwyjxE38s299/3itZRltsfxBHvtxqhoFoaozczq7NHnH3KsfLnL/2fDVT/5tIuihV2NC2Jt/cz1FO4/OUQ5XaispgLh/pp4lNWNKTiteIP60mTRgoJSSnt1Av//JR5wuW1uFI7kgvWBYU4UWvw+7HUcsZa/lXFER6qhsfLh3QW6k9yO9/msNt//tn3fb/f8/3GyaH/Kod2iByIo+29e+y9sRVqlNcf/gHcKsX3TkX54WBWCkUGM8Lo/s9fFeg/0GWrlXB3wbadlN96ULecu5xRweAIPeFevL/KnhwXvgaX187SWxZakzyCNT+nhHgddjXKMLjgKOclbd4n8Va/9q/aVcN5skQJyj90rrmdd6Pce93Ej3n6yZtqpTdq4SHiqYoqAo9sNI1z5IDQXk6rRjwhMHiIMLPfz/GsZzpzad8vZ625pmlShSovq1ozM246cbbu8VjvUqhDlBNNpHuNeX+9uMbrGinBJWZ2SWnbtRbpe5DWfzfSUrPYxuB0l6oi0lrKfd/2vcMnFfd0bx8nf+QfR5q9z8VctWi/FM+5dmfGtaY+SC6vl9JO6xDHujdiG1tHsVhz5Vk0DV2i/YM7XrsU/hhmo8TOQVc2F6e7HY/Ue40nFdz3SzmuwfIYgbWL7d0kduwYPRodl1RtmzooR8w1b1lzd65s59Djqo200ToZiTFa62GpvRd7+Xo/S1le/dzq7nG6PeOZ4p+TRXzHJfNN78PJP9yabXxf97Fw4gn0vNxwjtaG2PH7zF7upa6fuP64t/uAjNfnLlUXAy1Nzo0l7V5tldQpwYlu74tTFopVH20tT34Yjgn9Suknw26zHWsTpc3dJftDXrp3hp8vDve6COmGiKPeQrvss7ULUp3MS/PU1NwhRXKPGRHvuudoY45nDO+pygP1FHE6saH0Fqxp5yBVxjDuRJ8b5eVsM+Vu3S2YThpLub5pmVozD8I8q/qOM3VzL9btf/+ruw354HoF1vr1+h4yFqK7O37u2ZsILj4MR8mfxvL3t7gu1zB+Bc61XBPo5B4w0kY1Y0zWjcukHR8f7i8e5bhN6aly7nG2+dWFR4wsS4xGXwRvdNTehf0eVbe2yjOl1+or4ufLX17OL6pxiVe4t4XZltbNuuJ9iWVMz58nZ651ObHxrw773dhTiTSGbqNbj/R9xtBG1Z6w954sU731+3vkGDNHDWvXFU6vpzPrOq3j9qdd3FP/Q8qC8XoP5ql73y+jRirI3p2VRTzpifmWhfXNufOSi9nL+4Q1E7d45Ozb0t6kgeEJpzty27Es6bN2mRQ9hNc8Z1y2o59+r/+AlHxK1lasXBeruWTNyrA0xx/t+J1E7S3XXhrxjVpnGV5zNAbF/DtNS4eKWQLpgu34jpz+mxgLZkENlSrX2CS7E7a9lcPPPpHqeww5rBdBlpI2B8Z/+hijlKk803pq0dshpdGlP5wUodV3q+GGC32sdXscVHKWveO1I/nT+G3XWiSlT5o/+PIY+c//nXVUzPq11zy8f7kvnxqRNfQgZqQX6xdlkVZxeonziIauXIuyNELqTuWjktBMapZcZNELJfg9bdh0/mZHMiNwFtYvRdkf/IbZnnGb8nzZI8lIngyqstHpoobBwn5k3fnzcIjeoaQNo9NtaCPdxhjd47/UYxht2ZWlzlVVUeOWa5gy8R8T50b45vTLnPuM//nYjR89dg1UxX6+bLJR1FAvhT69Jj4tz3brq4VdqPNyXljhZmAYmvyONLHFz4CHqHXWwiYnkdP7lL6uTsTbVom5n5PZ16Wr37n6OdlrSG+3L9ZNqenH2RCv/fSTdwIRUx2ThdAcoQsnraea1OP6oFComLV75UjSzZce8/eo0SlVUylIh9rZFTSKy/+eRHXV547kiDKZZVKFb4yI6/5M8WVaalrmpFPz1JGaVjVOFdpsApHLrSGaw6S/t2bCNcZd/RlHMML4G8/DmhYVk4UXDyPk9/8Qc0rHEtQNE8x094zuyHbO8Blr3rhMauKqoSxFHfDeB5ZZzBRL7eSJbidw/f7S0kg7v5/AG+PakSv021+meT8ur7nEUJTGW3l4d0zZaa1ma79bZfTu/aBDR4XTOey1tXduZs3v01Ha6JHWRo/OMMYcydA6g5VO9tKLf9Ssqa1mwpoxFp/FXm6U0zmwclqxDh6t9uD0eldYj7fP8HbQ0YYVNEnq42scx9fhdQ2eMDLenoNJTURENvlYaWURSMW5b1X1esMF7XP5XVimODy2P2LGud555PiU75hNfPwunHi9Nsrsh0wtO8OP4Wh9i6XVYREZyg+d60JTD9rjUfLqUCOr33V79xiQkhzJqaqa9XgXKiqN6USQyGBHOb7MrWWXa0Euqpi6I7oju56FOiZPTX3DKVMPzWwS5qkXpxEuGTqzE4Sly9qXdsVfx9OSXQV9IpgGl8fHnyfz91mUvu+quuxcZS41UxXM2ZjPjOqidxj+MhBEI/Gm+Il6grEU7MpqzeipfM42frf2s2/icA1Ne8lShnrv/sjbJNcYlD7DzmlMPEtp+hZD1t6w1MYr9JFIT5xDvwZ/pRh0JruoNl/b5zu976atc3IimZc0ow0Z3d1D66FzNU72slhzzLr/jJETzDP9m65TLrK+I8tic16HPu3FB0W54+3GWnfumTedwjfO9iRr0si9+2h0HnvjGtdmY5Nw0aHziBl5cvL4brqeMc6mB/NNx9vTtwfrI2nknc1j8NQKyRvFlZFyTHbm9vNJ3kuwXGfsfsSAko9SRtMOESVsagXBfTbjkmkrpX8Qn9m6xYhsyWg5p4d3l9v6Y32m9eCzSREqriv852wce9PnHDF6111WUQ2XnRMrQ2CImTlNZrEcWILMo2ji1N0Eqd7i4nB103EgLWz+lNcgnLwba6xxrbXiOKYF0wfFYXT8gX+8O5f5eov5ugOP8/7NQY+xvHaP7Id9ucbeqBfKduyS2+xH79sx3+zc0YOpJbmy9eyePCsw1bo1VVuHq3kefP9eEqXMqMdp6f5Yz8R9CTGkodr79bxnI9rtdfFIm1mzuaeqyYaicCYnzPzGyPx57iRKaD10ujP0mKPHGMN/aWTIsHzu+I+JqsTjGC9eq2nV5uTcOX3v82KRs/Wn/tajVXdXzw8dpwd22hhM3Jvp6saTe4wT5vbFYd/YhntP+mQsLMvkHgy0pJGGOzImExsVp7N2sN8RqExfa7HymCrP9s6zjpwZSNprfvvd0/Ze2WX+UupE05NSaT3OtOLYfQSfHrWkqqzmKFXlkfqpFNOb8zZ10h3BnXLGNKi+by084nkU5pv/XUUGCUnUhJ//XTnKg3HfU/ysW8rtx1WM8eZbFVT3SL7Geh7lWTLtH7TgaGeqJdVTSsj0xy1Et659otMzO4ql6WtL0kh39+6OOWfpU8PE9HF5Ojb+l//WXqVIl8W6dKlyzYgVmTmjOub9fN0TF4Xl/LclVW0/XvE4lkalVshyflq5MUs7oS/RSMvybiw7fx1P3jS1mq59ict7duuoay3Kedbh9Gfatu898p5ec4utnjB0o8x+eV2pbLU93ambrJn+uyuFHmLooY2hB535X+rW0RnF7sfyHxOMR7QbCvtUc/MUlnh7fJbjfKLHfbDFNgf3jxHOffNX7y/dGMWc/UnvJD253UrtL9Ks4Q/3nu9uThhMfLUkbYvXv9syqLi5dWGhnK6XvdDr2+os6Y7JY8iBp6NHxsuVSUqLm7NwuW4c2eTUpPP246yNVdwVh9sRdzyEcDm0lN5qFlXtWL6eMepkNLJ9d4vNQYeZNf+hatV6mA/EIcySFIHax8D+Se/TTlYlqBcvU4i+5KceOve/p5pzWmXqzHMTUwo17XMwDxch7Q534LZAXjska2mqjDHsGB6eZ1gWpuPGZDLl1sPI+AP/dXy4cSmXH/Vy+ZgQeyzf3pPVnaylsHx8O43ymnszJz0QsrRvvC9WdlVj0lVT2tAziqv2u2HzxHWm5C493p8Yj2EsNWfJB8X9wWl5bX792ouI9zd9qoFRtS3HWpxMrhyeyn4x1EnaCNFGG4MeYwyjaZqd1ZaC5XlL1nM+2zTW3cW9biMWEtinctS/uvo1vRdGnTLac8kqheG1ymw4T23Ym9KOCaL0PGt7m/W9Odn04W0nTZqkk9NyuP9+9PC6w/Y21osJCkXa25JTnlhzHzn39HJo0fGa33aPbFe5KVmLr2hyQXndWRbM8ayoVQNbh3JatEGhFp/2xpyMO1r219sY1cwy8zdPtOHkNilv1NFCkDQZZJD8b629pY4z7rvVmOVaFrMwX4UjX32SVDZKLZ5ynVqchTDPM+uU3OvFTnHdae5HEO6U44e7dQdC6Na9M6yXWMDkjk/E++eo+F/+fc2TMtanl50ptffltTtVnjGet2M+mFzKRF/oKISIwHDD2Fadkt3SJbHW2hwrcJFeeD+IZralyS+XJH/WWa2dXKZIKk+xqOtQsAlRbzY8Xi8VXx7RWl3UYCK9Q8K2Yv5cQ067tTtJBaPHHEYjpIehxzBkXBYU+oNm+8dzvAdm9GDUNdYJC9+s5RSdn3vt4/4pT2324HFcnOKX3Q0jIbIrc5ZHFM9j08A3w+mKFUFh0L5CzuNpKZL8aYhL7/3idvtlefje8CQNSdp9phnPNjtFMlYG5YpJnU/KtNpr2+YffQnt0ruzZCuO3e9jhbCX6ZgPBqfUeVhVnuKIByUpI6pFS/rs8TXqQvXxFLOKTxAVIXWs8vrGCU/wro7d2qpnuE5WHZZLVfKNzz3G+CqXBSEnTqpvBCkztJoiRd66/pudjqZP2ZlOz4RLDP0sujEcA8/oveZa6I3hxIfFo3BU+MfdS3D5ma7N9uWLc2kleZ6JjaiUv76sOK0pcSmnc3huYdWhdE2bUhq7WnGRYA19kW88ZTz53k5nl+E9g5NItORxOpcFa5TYhIIsx22Qlb3sO1lSt192s4pSdy2TKE567u1l34lKpASDQUcPrcegE93JTrHXl8iR5mLeTRv9kS3dQfYZV9gr/5y152u3+Lhwd223q5bXvpnLa9eh5/4knp6bbun108H28A87wml7ew3mJZDWc3IFJR/66KFEBDflFC4nckkorPhXFWPe4XXLOaRdyUyyZUzN3OOyeyKzH6zZT/mxMm6ccbtY087mKLNRa9/oIqF5uwaq6hQ6Q0Xb2Izl7lNuOvjtX3zX3Um0IFJoH7zY+2dNuqdbwlNeTuYL9Z+BdyNe1jQtx8Cq0V3TKhqNNv0Ht7DaDy+BmO9v0l9B/Af80cQTOiGeFpP5wpRFuXO6a0T8Gdz/gJ1vd7GMzG+uaotV+yLpFt/sbHIxxu/0OjFLIlhQPH34DoLptZBHbEv7tFLetvMLAgVzY5Nw0TWGUZnn1857Mbi4OoG3ujsHbMEbn2qfit5U9P6LFF2Khwr+3ZVlv+PbdzorjjNI98gcRo80g2bgb83OqXH6/ob38XlS88eOX/excvpG/LLj6Lj3hBAhaDZGMLgod/kY7dn4Vp7ouIvj0WclSzjZYmFSUykuLS12SJMlLbg40XM9MAdOGXxzJ6yPVszfniHyFTnpsCuPMuH2pT9OD8WN84Hyc9p2BMValDE0W/QdJY5YFUK1Fwo1u6r4/JyX0qmI/+HE35ZZPo7TGYnuW5lWFUophbp0eGNXdrzfm/tdtvvTO6csa746WLqRJ5HV6ewadXF4v6HlRqa4zMNpZhD33yGokG63thdRH8larbdcjTGc8zQ9xsIiy1UunYyHP5L/5Ij1bV25d39Rfa4pyFcxxrqm1/eoPkpOav2Acnorx457j5vGkzzPltokq9WO6ZtsrfXWOgYj4oKgIbTdI1e95aHvXPpdPjlrfTMVGadry2AO9j1+/e229wrylUdr9aZLp8xuKOXaWHoy79r6GqI8hmuHUII0hgwjdWpqR33E2zOOeR9ZjKfPuNfYix2/cXk97i/lSPVH1m9dDyd6eh8dqtylw04zJVunpd73Gn/8h/fAt3s8NenDMJvaTVpkpxUlXuuJ7qj+zdN4e4m//DmM504z+zZv3+ch6RaXox/bUzvmL6f27u0IkffsIpbGmYjep5yMztgcUYrrJT1lwod3eDV2p6dBVhspc//tORr+JKofVDljdxixUa4V+11T4eVnpx2jxl1rop6gXIdrFyZjzD4uZXGstC3SjvOi7/S80+cOqd7Zfa4r9/ZXNx8dFv/E8loRh/fq7ib1RrppmiyKT4zp/jka/ug/1JlZuH9O7Ll4l173RidPE5IQtlrj88MiLtUiLjF87e3X9pvtu7XP74kZrVV0GbSWryQpuRrtQQ6X47ub4jMjRJ/0juTYPXAxoYuCONY+vNL7wmuearG13/Ltb4pi2YWaPyvmXoeOnkvJyJGTHmII35o08Ulpg0nas8vnypwM5oG7n+SSS7Y7ZFjn8h1O3a1D70PqgR2GHnmC5XRj6EbHwLA2Jm5xKC213txEfjzuLW6G1/ZN1ocDd5pHpJ0a8blxetsDNk73X4HheCIfNXHCJuPf6Ly9pq8/S9+tFLcyt+KsPHKZHNJJtGdzlC1En+oRyUWDP1TRSp1Wkjq5v4ryOqnTBi71WCYs5qREBdmRIP56Yls2dcaYuvub8v/lpon8aTyS8B5QJl1zsBzaFB0muvVJadeXqIWr5WbQp2anSdD25cecGti9cqA4JoNpUsmHs5Ox8Efyn3Dn6xtifKw7ypTXNffVnpEuR0/sJ+mb5Pyg3j77G5r7H/V+6cZD1PLIYiXF53eENK0Rx6Xj9Fn0mJn3k9lXp5sv7/FQS+oJJmu9CNHU0ySHG68vKFQs1mzqzV+4bPYIheohJtPd5VESjNZDC/lEpvsYqlqqM0kSZvS6DNZsrRodzgpxISRHP3W096Evbv1DneEp45I+MSkTUxHtqTw7X1uMo+LGNijiio0xR/WSZp3YeFr8sP5+xVOWIO9sJ0Xl22lZ9REzmI1RMXqXyJhkNuLa9CMD23Uijm4kj4yilfnPWcHchE5Sy00LZ/OTkhztedhNFfNu1bhDnDodb4b8c0d3txqjDKsw8X+kJOL/FddD+kJEjk03uT+VH9WlmhnVOIfoQkbnMiFF9xR95wWO9Kz+mgdpmXG1vZJu+qdjyFu/NdaGP/WSLK/tGb//ZIneJwtL3DndNRL+6D/kzK5Lq7twzcW7TM18h0sry3NSarzXxPopzrs2P5xmZjNT6rcoO0rblExCrqyIYFHduubwpmj7MbR6xj+qJznxTaYwD4p5UU7T8ts4n3jPtjdd9tR+UjVSA1N/EzOGduQOWZ0Vdb/KfEdBhJJmQLltszuqK30tTvgtzklje+QMnuWSep+Tk5Nv/dHjN/pykx7e9vb52t+X2yjKBQOj3DuU/NbumdPGov7T5fF9WuhGL2eSc20kgRU5Sn/ibMlgXkagfll2KSH9gWZuMbfHfXo5unv05wdVAr8k7rV/i38efxlzX66zjgv39iyvRZBVinS2nvcbxdTWRwwpdjP9GctJKLJ9qoTqUEXVeoq+GBd2ip0tNjtkdO+cGlpZP1LiX2zMGgkmynVaurajY7ci9oIiJnWf37WDGgJn2JWxfpg/jU0Y4qRb775Y0PcwYUrCpZNx8EeeP6S+Lu1jdVhdEN5FdaI7hkbLGWWtj+J3bixqoDCU81/yKt2nrCF2ayU86v7IU8GLZIrujchmvAbXOKZjnai4XEvkW++xUCXP4Vbjsy3p7FeQtre6nvUcrU+v9aYo1PxpvjnX8kxfc2e5N5yP0MknHdeY6fKhRGbj9JkltBnpDf3Q2OGbYLOF2OFi9ehyZKQ+CPPiwrq46HT3y+uUaOeW4OMnDJvkJW+2uEJ5Ldfu1VJTRRPxZxQ89L9O58ZG/17ny+uJvbForNkeMfXu27wxjvaef/LO0/M7NiYxK8ym1JqFNYmaovjnlHc+G0bM+9hiURxcRLoxmqfM4ilKpxLFXaLL9C70We4x0kwvP0wmTQb2RogwL9cUMWrMOjvKteq5rEKx0pXEqKDHuhRWaT2mlHY2LcghNaOFOi/p4EJHwa199gdjsDk6jMDDY12LTJi0J0zu7HeNgj/6v1DEXC6ec1377Var6jWXK9czKs8Todq/zyjDY0M5th0Li3Z8gr43HZuaqdw8IskfxllZ2LepRhYavTxvZUVaKS0QH+/5fL1XePBLFjoe58VtKed72JPc1UpOymt15ZdRYTiyX+Zrbnc9PJWGMERmNE2mgYkuaedM0gy/uSeT51Fcxg57xHc43fE2qsfVO7+rPYxz96udEDbuonDVuw9spm/biZ+eHYrS5ezLr7uO7i4tbcZqkd+7ifeXHtQFi/69oYggOX2WPb1t1OV2zdazRrSmUJESmrLSMDVm68HGlZ6UrNmsfu7HXFod8dSKunkamu7DIkUbu4bLLqSSDEnMeQrVvVNFFWqqQtMenSCtM3SkCf44IXclr/yc6MmEOWaNEfE4OtPLQ5n6PqK9jpq0ZsZpiCus+0RzatfnVIaYu9mSIYm89X7aM/xlb02N4tLJGPgj/o1SQ1fzTavlXPNVPu2m20HEqkSSfAZ+12GEdt7EXZgvVGJ6/6zU8jSrMnv7/NZMd2MptY3SfEe8Mfb+pR/roVqQ/Tjdl4J2mr1PcomC4uY2SozUswudQgZqGof987Tqadiea/Lt73xbPdIMNQrGjC8LhlNyyoTeJp+J9vjMceb5+A/PdcmKlRBHjx5tZdM/82TrKhturxldwf0yVaxoWXv3ebS250lP9vO4YXmbl2+7atxwkYZ4feYyC+nWv++hT7EfWMGK11XSrnzmchbilm3m2R96Dq+Xf2D3m9OY9XK213WRnE/bjh+n/cG+9O6oOR4oxBm2hH6ozeHNLNQxu3szhupnaJzWXt8Uq9ZSZX8Xjk2pBJX/6kP5eFP67tananyZRXlQD6pk0609vmWXhSqTp06zGjIFcQ5O1cRlm+Bwu7X77iAvi/TS8E4bTsLTovdLOlPoaJBPzOn+OQL+LMF/2Hk5rvt1rstT13Wuufz6YN4eXXBinsHvJXJxzwPlXQplYe/wduxN9rJYfp+qUuQxvjKCUbm0PKFXaIVnOX7uSHtLnGSnozoodVMTZtQ/QrDY2TEkJNZ0fpI7Mubp9S7X3IYpS0GKni/TFHNJyUzphgRBh5khhpKNVbLdjjT59PbHDMn9teephxW57BvXdziq2eX7a3a5j4/KdlpuQjAxFB2j95G0vcOsIZ75w590/vnTK9gxur9fYl0MahbkSSspt288XtdzyMYFPV5+/Q1tOev8Iu0dU29NP691PGIiu0M1t8upD8drPnq3uFPUuvupMzaXBUXNocQzux4RrWJZEpJJFW+qki4yk8EsYn+m0froE2PwzhkU5lRDhVLE6J5FzCfHyfCow4fPnz9RtVxeTpZy/di8S9xfJvZTbPlDTyF9Dhqi5zAP4v4/6W3XaYJb1lAp4ch5WtMjMsbI0a+PHyvOMen14dyTEeC/rhGr8M2njS22Lm2H0PK2VeJTbx4WXEgSYUdNvKbIiZTfJZtNHuGWzCRHgkySEfPQNBmeaz/vznZnWTLi/Xh7Ri7jPXEtNPIWuP4QeaPIvu+tLaWe0A4kfXSvNb0tq2JN/1lS7ne2syM+h0GFoRiMafqgKImUTjr9CU3eIp+Brs9P/N+wH9vsQHCru/hzk/qosBqXGL0Rpd9QUDUb+bTSYlNST4/Weupaulmh67GLSTfGC1kZ3heF3MSYF8Iq1hn7xUs1SlpHPhPnbEhTZ5yG70fNqy+UmhvrF/bKx5WwcSpEUbFswaw+Yuk4NKmO8JoXzd7TLJYxhIKvrYVqUudzc+e04Xmianqf5/jQYWSkYv8nOREo5VtTB9V9IualLuV15im+2ZVh13gw/405D7JnuCGXKWjywuovfcuKdavm4ExVxpvqpm3tx7XG8+j8cy1C79OCaSpVfJrp/rn2/u3/j2qyfVyNurQv5uuO1m+dOLWTrj5k56QbFunmGqqhFW3TG3d6Ls5DIm1v0aA3f+90LHXRXMaT4VF7/z5rlN/RJhVHjqbmzMCbygxZMYoftA1vvEIVnO6v0pS6S1HEzJ4/WTFE9R30t+frMRSkXcccjCDupyZ9TVXpnPk9k5M1/ZiWqk33/FgsXOz4Kl89PocPD+1R9MDU/+7RcKOKW+c2DGVWSJ+J/OjmuPbRfR24C9/YLAU1ZlG+LedMJ5Innn1vrVO9LzZ2EGSd6ccln6fN6/Y8r+zH7zsdeU6fLuU36E9fZBURSvSU2b+ahIupwjSib8YTlbIEm46zKe7y8l3S8iIzq2S7Cfeke8xAJX/qwaeqilAm8aPWx7pkO3J20ye2T0VZrtPLzKpGdcjsZM8OSz2W9W9oR2nzZBMzaL3u1cFWC/ff267mvnYIolmw259oJBXd1rr8D54mEfiwPFl7H+nPH+Jc9r7R6u6g7vqFYqbUvLLGLPX5jHje/zXEB1PhxowEcSEikx0DQ+UQu85c8vuI2q12aiV5/B6tLUFcRmPlr9vWgTTOSdo3dyIr+ZAJFxQrnmGS/ZY8ZG9J7Eq7lmcxSvfLGOfvKOpSjP7uP6ze1qqVIiil5FNGua8oyZlSSk38DsnpvzLiuVISnT0+MSEeVnxzX9xoT/PH7uH2y0Xi5dLpXAYX7sSWzFbDqSozhXkgxzxcROzu7bzG59lmSItA5LfPP2KP/OIhnJx+2db0R0t0cUnmnCErnoienh1uTLrihpK2hWY/vR/n0alD78sxmhrz0O/SqkThcEC+qKVKtoyOfemYVWM6Nn2O+7c8zfj9rqc+mKYakaGTY5/W6S282NbPT/jcyZTb/qpZl0UVlgUp1zFGfGHCVM+LukQtNFOg50GQvdqNG61v2f+kO112Pla3hxWRcHp5PO71w6Q3pgki4U73z3X3AT25av0udmnG5brspP7k7XK5VXC5Eua4Gta8+P2lUPoPRKnmvSk8b5OxV9ZcEkk7mNJSpbeWzYrGgtB4ej/Lad/eXXqV9XyuEMKV/HrdaBTpcHstLLlfwjdzia/7G7eq+dJVjQl1989lkmlGz231v2r0/26iLgSDT/WleqpOcyYaZ8onpuU8/D6YN22zn/T4lns7d2JzRawjre0Tr5/+SXupc/wegVt5PQz9Poc+1IxPbfEwT7+FafYPj2b/ycZeKAYGR8n2WkhUGra76ze1biTOEfKE5Xt9sGhfZ+5jeF5VjxzNaOvY2M0Z7Gbqq++MlsOaf1yln4j9FDqW9EOJB0Upzwu1rIq1fVVTj2/4Yju2dzoZ4rQx6e6P8aCU16Ws7a9vpFSQqFVQfYaqThJ46oE6MC/ejYdkF5aaFuW0HlKtui7liNP0HWdTZqfvs+5AB/v92J9cTL3xd+I1pHUPLMIUYjqeFFKm6dLJmvuQP1/Q3OeCq+qyCXW7qLa3VG+nO6lu2d3eoYxV6r4lTQjGsXAjvmPw+ZytUto9m/zpNYn2Fbiq8cOxmIm5f2cYGr3D8LUkT6U/6aK4WLZjpBRxWmQ2n7bry+/k+pwnHZ3Sqcn831HB9Pd043/86vbnrhEG6a7MNKPafQ3KrDPXWSfnNrYx+Yw5npE4x4psesUVwUWcHNVo6tw+o4oHSb+8xhhqVoxRqhJay5bdI77pvtKiB6kLy2mx4Cq9cOM0K3ZWbHYa3OJte+iC7bW37/0mraJrZxXbQD5BZ4aW990fNUukI8/OMK37WAryKG79KMRx/zpqjce41Tqpm4yInBn3F8pkVxdFqBId0ZIe7MwgunuoSury4BM14H+32yDHsvcK7H9/kvg5HnetxTQn/G2pIvz/+2S/+9CNqZa5lT9YRwlCSqf0fXqFKIf7F7cQ+hTRffs9z5Wshu6SkDNM+mEsfiCmyTRNPYLu07h/rrcP6HHs8+VY33TPl4Tzi0u3J8YDz8f4PBxc3Q+XS3FBu72FITaKy8SGztpEnoemqWlYiIbJu4nmCcRx4RnPnTd5DzL6Gr2x4BKDi0wg95CBrQgV53dH+xRVbmoySpSnLmX+rDtzv9ekPf2oTqWpoKTKfUNLTuwt1fzpvvx2jdOzzcP5hM1NLFmy656FZPdLj7SOjNeudoftPvxyTp1yTzUNn5I5sXfmjp/Uz6HfA/G6J95n3dydqUh0JtJyTm//gVW2omeDeL2cWOksqpNs7uCeOeaZ53knYw+ynbWVPMeth7PYb1M3LITW+0C5SoujYs7HcQiWOBSlHhpMj5r+MElNLl8nyTsI99fodCfrt9dvzDdVhSbf7ES5llr/+5eb4h45ml0Tq7z8wBNS44P1uQ1frlUP2qb7PmRu7dyZ5z7k3KfQSF/hkKbtLqTIest4bA9Dx+CP7mjx82TCMcdUVcN7Pw7X2q/5gn7tpWsv+e16cSncbeal+5vypLTUlnSMeqBWwUKIhQg7stnZJPfLLTUjab9vdpIlhVbSi8day+mMvHk/ODOKPU/yle3Q+dyYShaeEIF92zuis/eWZyUT0X4nO82gKJg+QpluyrzVehrb00TDcO3oakox84nkxDpLnDPmmo3n0k/2c8xl+gcXJydysZdz0V2qO/Xb89UjI11CxnZSqeH9GN1+pHsyb0o7Rw8dnxa2dq/xdjldDK+dluz45ktZkemXF535m2vixPmG5D9LWIm0FMPvwMS0mJXskbxn4Vb0R51bP7H6ejDZGa0ptCtLPwf1uEvlE44osrrQL5KSd00lnstqvZzcA2PUHugzlhrjDTXKwqpaaiQJOszsE97QGfmqY7w9feaXySzrosmUpMsd1SL14ufPOSmNKdVlHoQZFKs4qk5HULmtNa9YmTKG7KZFD0PYbWGzFmIaME0TiZDc+eBca2/tX43VVdLxsRClzFzeN5crJz2xo+oa1Xltf92oIVBdGCV3hMaKPbzGTORpmkqjsHAhrj475mGN/mendzRjzIzqb3yC+oWymJtRu/mKxm14Rft9nojI05ovc/p1LcrOkXkPNNX1Tnq+7WupIFM0KjOYmSmKXJXyrFOayBlzyvQ7PEemf3b839RDiYT4vmR/9eujlWMhPueu7eyGExMe3b4YmGXeyd8U0Z5YG3F078N6LDnMPk0gu8oshmKddtOjLDfR013tTf/rl5fBt8D609ckLRlPjBnjwWnTPfLpd2gsrMl5X/sprnwkeunBIsfaj3JTKrPdhNArlujF78U3TrmpYz3nlFZodk93kzrRM5Mx+2bndNOpKoWaTDWLfJMx/4KdVj5sOakzTu9qP0fa67KqFrMwhs6GnUwGVa5lavtMUU/TdywIh3OHM2y7x/XDHWcJQqjyY0cQ40FbLnRTT2fimKgkJu57ssZ+5he0l+U63BfGY40bb1VG5jPG+O2+kGo3Y8H8YSLQnbsacR7HYqliruXZaQnaN0HuLqRpKDOHkhaTR7vnM3xmlaTla+rEpqpuAllCbIxfSjxkdrGytfbN+ZPUTpV6F3WfFFJBXWWrvzzFRPuPUnGt0Mh0X3yo09ecyemcJGkzl89u8+Wa/hni7YWv2vfRi7a19FOIeYm3o9TtLqUbjIak9h7upoY9sYV9FdYI7M3CGGYx2nflTCptqUjGUaj+Hf/hg4j4ZeKFJa2JodAzOa+KJ6F7pCemY6Kybhd304P05+RM1KwWrwemGpKhIJrfr/QamOYfs9CJYtjUSdxmHaRQbdxCVY2CDx7GOBrte0sOiY69zpmP3cj6TEZZnoLJZF0m4wlVk1OCHyH9J133ObYOc+0XThH8Ky6ZfbYbQesf9Mf67R9W8jLSvdoY1iKGBdM0lQgmOVtnH9TrD+FX8E2zbjqVq8yoyvvUFOVOfyRwUqKfh7F+aNtgSYxicsIvSJVIzKpbpbWQ1r6HZNco6WEWK87jNE570ZIuYWdcRlLjwy/hQm8WvwnbfjC828qh3V/mWmYzdSjUjX9TzcDEMn1vT7ee29nPIhoy49pUl2sqy5klHZPykU50ypFmxPxgviR7xfYaZb7q0K8tW+yUxVWcNjK9dqMrE2GezM/v2HLpYIYdb249X4Q9lGlAurZ8Vksj0iopKPOLb7GcTr9uOD/S50gHY+J2PZself0cshKU5TXUCfo5kUfGvUqs38mxV79PtHuLrnGj7J2Gj0+vT1EPNTitzrTcY7YjUzr0NlCB5FIs71AI2xvYlNr91/Ns7dZFwy6owqqCxlJ9J2FJKqx/Je2ExJQt5ZHLlCZ1X65uzf0iUw62ptZeZPpxGIlzjKR1j+k1Ju1jMsVUJlw8rK3v+dH/Tgz3ZS9JyW9cvu7rXGtfqmBUcBKyO6LFc72goJRY8eH2GDu6Ms/kb1Y78OCrjGiaqO6+0Mhhcc3WF4YZ1f07XNpT+fNJLccefl524SHPOHytIbJ2TmdF8q2q5sssRd0pr4vK/ukwKB6Fefadbs7zr29NE+3LWaMUZNpGPhnZyUiZz0wyR4j4iOUOEgl/6qtqqvN8uK378O9vu1/NxEpsKpQUNRTfGpIt09+Ez8887Y+iFz6XxAln6PMquJ1S9kmStk526xXx/BeRHWwRPBYJKS0LWVUxZkK+goqJ9Dt5vIZZ2sF+W1AJBD3MRd4xl1iD56msXTJU9sMt8uXjsNO0nndMhzpWzWjWOH3q25mUULwo0wcJ6WwfBOl0NjZdPiOnRbx4OZVDP14G3d98H9cXuxjshTbPRqZ2OdlFjzqIewcXF6HT/R4teu0ddpKRoyoP++n4OSSdySRE12WdfRBv34SaoEjq8rHL6Llu/f6CjlGxRmIQQtL1wy2N/Ea5HPfJ6TvRRWtTZS8V9oGICl4zkybGW7gkmHWjdHie4qP08OOoJIriIuOYKKE0lNnwpfVBSqvCLGNSt6rw9JNi/vw36q4x8yfzVpZ18G2GMWVmyhSZcT0Tc9bp9x//In8f/zLZnu2Uzme6cUlcY1HvB7v56Zf9IXLpbLqwyb5RFtyT6Wby1ymfT7J35xnjOr6GReLXscgqt4I+Wu60gltSYqoW/YHb++VkETs+12lJ6bPN8YR53hP2GhI129VikqC5qeS8MBFN04FAHH26DTFF2+EehfJ6vaS4x7QLpjLlM5Nz6N0zt3+ctqOXy7ooqjAvWTvH8uVa3w4qh1l3d2fNMnlKwbSYyDGEceIuTOVZZuHUo1v8mru1OeNc7iB9Bxcpt5tbtYP0iMuc92c1byN71DintWas9ZJpmlSZmJJSTB25eFhT//bD//oTHL/VqLtg9Yu7XhdKlG54kmKU+/mmljHG9DpREylxDBRE89VuCWpY7XepG+H5kAO/3d1bNx5RLKXDk8ATuqU68k12x0yUQmSJDq0ke69kLzFh1I511Pn5UTnCp6AoozzFYrWo9T9fXJpm1o7HknyiXLt0uS39p8rIfq5J25P9kJOGf3E+l6ypxbnXtRMX3WLn+J36HO18f/Vh9avKhQUJ1FSUGqMx2GELn5K9dbi3UtzdUmSzL8bQqVlsWVN5pK2w5W+3+7/S9ECxhe3XtySt9vPTIzvHPM/nqwezn7xpGk3MvRzjXt2opYfpNWhuHH08z3N/LaICe4ZFk9nPF80qZpWnt4N3G651d7KpWS3bHBjzxQ8zDHP+L0VC8MxDth7vdmDUGGUxmVQRtSXejOyqOawLZU6rLNY8g5z/7RvNQXOWivL3v3Mv6rh/BfLOshBjrb330xs9It7v/jE9/RgLp4mkxyRr7L5bobC4UvLUw8Xp/XSQ54kdT3FL0sN+pngrNIxk147lFkKUwSzkZl+1uMuhMqm3mcQMhCXkPcNyvx+mM26jxPzFthF/L0e3wXl1ePn2X+UwXgNndcLQXUdnir2WMIUIDvZrp/SB9LLXWsz3arcISOGbW2w+B3bTel1TZ0/h8Y0W4wzp8fB4DavNrc5S4z+hHuKYYWlNpuSIJXVCusPfbGcmbBtZX+GetQ8XfVz8X1rlViY1XcSBbaWK78nNJTJOpScENvUbS7IjIbUwkW5mm3Xsd7ym5VZ6FJPSH0rX6k8Kw2LYfwjPQg33ea8jMEzhe7aRkl06/bjOL8qmY7wTbazxdmqneDejTh4sD3UcUUmsyLbJiZEoX6Zx2i54WBbHt9JjqBNjsiRVw8JC7bIpFqfDtGsyme/GL/spc4ayF+yqD6bqB8vdcqHa2wpfupxzyNQcPN57jeLN3/kb0qfp/emG85wwo20nXxVsWHXOnyMdleatF3Yua8q3+ySNMiUuCC7Zl2PBZlPKzMdv/Zq0fPqbL0fQfwy2a8rT2InGfmURwZrl2jVf91uty1OuUb5btI44JbDdx578V+c9o1ceUyRnGdi0vLTU6s2eez2y9orpwkWkh5PE5qQvVaIz7dGf0t3pPU4L68ER6XJvCIR8xFSrVeupSsk86pRWsWabuXBQeIXK99qxX/1/pFwihYlNYLaNqtaeBcWZVqlPTtNr8sRTvU2dQ4jzhTPilrWn09ey/GnGcw9Dp+/BQd4uh0PhYmnsfTvvvZ6he2Do3d2No84dglVrrlqmlUJq0Jhl3CK1LJ1q1kCxiij/uH+XbIuPgneVZSrlemRMYvu4fc/e9tGV3X52XFfBLNcuu80hlM5DQlXVwmTSTP4MLPM85bqwmbR16J4zgmqS/MxE5XRBT4tg0a093o+n43cma3j4j27/Sv03ovtuxT2IH36Or8OzkbEMrc63urbfOaNnkipvW8bv/FSZLnRcFrqcLxERG7ZI+cFd975FHVNttVf/aOmV9DKDKQ+x8yhx7PzW+w6tM51e/a20tJbWg04fYXr3jNVZjq6TasmpfSrskpmYdz1xGyrYODPrbGvZHu47260Mq4JEnu11x+a4hqOdqT49BP7HQ5Fer7OH2E+KCJGqdVedml1dYjpznfimZxN5caQOcboL7bYdS+SslmoWR18tqltmq8YYDO6xPJstSZekOVoO5BIXLKe+y4ngpMoopEVMbxLK8/uenbduJ5VyKz9m/vbjNXyWjc9at948/TpXhq5MbI446sAqxyivvVFWsWtaNfNGULWlmLUzc1A9hupOm971oKiHjBDF936FnZDt+c263/UZY7775j/jYTbWKgVT0Y6kTbfHyw/esH06qDoh/Pl42ezJcg2fQ8hMzGN0abK5+9EoLSupq1uT5z6/CDOWXo7gf/A/+BvQZ+jXT50Lawh0noF7LYKyt2+PqhbJAznayXtv11izXIY0rGDBuBnHUAjTVvPpn3rdOHjt/V2j+6JbKB17sFDMK7J2cqX6/u/uup079xR6eBlairRDd7hQ3i36GO9nTDHidQix3/Uaeg2F/OvZD3tuYW4p34srtnV9XnwW/OwzW/ozm+aoez/uNXruh/1cDzKeeDaRIeF7pfo+Ri81VlWLLpmHaDOukTz84N8psf3dSYu188q5rrtKTLpskyYeJjdGnfPbMlt+p5RVymvcfQon5GURD5zQOKVFPHM9Y7zuoU4jT0aebUSLlsq6Gx58MFPtRjYHDI7DfMxVq5Y1joqhJl1CMotJZm0HhXQQpwc6J7sbv8eoWtZn8pmmt1YuWWs+/7mYm2kXCpKzD04X3pizcBxmPL6/h7Ky1ShTQVUxuyoW/heb2mLLi0U3QnX2Sqw1muHajDrnHnraCrk2+Wr6gcjnCWXq6P/6L2N/4/kErr3rz2eeCYzx94+IO3vX60dkR8i3k9GduFBdqc/t21ACF+p2OQ8amTpL4+fPcWQ7PLj4dIpt7x+tJhoXLNrWjsdum+F0cy7zNT+HeTCUvEIbuuNdg90M7FVvW9d5O43EaWslWeRSQnHoDfslrtGVXbqqDXZXlaL4BVGVpj3VR7TbWcu5bJKwbcLZAo/quuWqOrvr7HGqyinmccQRIsUt8Znq20f//a59tI5zv7bLrqtkc4+WKiH9Hgquae3GTnusRK2IPe4dn7/RXIqwg+tlZxp2C+fTK41+Lr9JNf+MvCXayNgPF64zf2eRLtj8HPoj6m09k9Oy97n28GFfsb+K4rhaoqG2qiNNsUuMx64KZe9RowaJlqxR9S711LI+UqIN49kjSCfssI7djr4HBBOPaxVTLVva2Hs3psRarzDx+WVPVnImPREuc3JfhK8xYYqXXedgzXR3fXs6Estpbb7japidyxjaXnjRf+b3P1g7n8b759CdGU62mPPZfXg2ngO+F7Myfj2p+UjdKplP5Nd/dhMkctaUgY41QaH05rdOOXwRHYb0mMXTguRxDIVjfha2/fO/IyXq2ohB0LlhIF5jkSWw1JhVY6ieYxg893In0po6dWSxZ/T+DWGt3a41P2bdUmHqt1VqfjP12+waHZ0HPrjRY0083k4THmTwJLHjueWZFUR/PdonJVK6+olJTZnzlfPxRup7v5eDWnPJ/re95C4PiqgjJdUD+mxxD21KfnMrU865Tgjqoftcsd3i1517knK1RHUyxjPj8ko/7SiVD/mQe0Ud5eK+N+1aXtcw5hm4fqDfM83bHaFT/QgR8ZwJCdPCLzPFLJimylYquidVnQ7dH6vKLOpxW6KWj95R7s/v2qgid/eRonjX5XWV2WPGuF2UZfphEXVm9mb+KqRo8sJiXxKrXDetu+EPjNt86W/J0XEVdNvE/+rxHjPO+o/tf7V27rsVOkSEf6h44J+Fa29czO8dj8pOjxj3KNnfrI9hDC7HHlLjPnkP2z4Mu6dPL0Lu/2+a9DjIs+9218eXYE0c30Pew5LVUVb1mttLtm8XkabjKJmhz8t+deiNPueImeU42a3OkYlJBWFa55PWviGQ5XcZenpOiVql7q+ez979qWrqY/efH9XdRzDO/egyJ2ujSvj2n2xZelePqgpnWwftZaSEvpAUKYedO7N92J50ZYbD5a4phLsy7zEjGuMyYuKOSGQ/lKVWxPurPVa8hoWNlM9lZSKxvBXjiZz3Odsnxt0i2+sea27nvbaSJKaHLdQesf/80L3mJDaHLR4CM4pa1WiJR9V2fR/qUKH0DlO7k3Gk/B7G4M9T7vVY5lIYIxROq7X3SvYJBmv7d5M9PrPXcF2w6hLXWklyxzCqoOqF59ixaszUZqM0M3YJcrfamJhhq/p8ENVl6aN6mE9pF+t0993twWJvY3QdtvT+E89/d93cfcOl0MuMgc14qHvYmIfRHkZKY6bYucZ6/h7pKXIpxDF5J8GzEee3bP523jyai7tanczXkR5MWmRBNCGxtjz3+5eaN3Mndoj5Wv0YUjJcU6+E8ap4bYyXqKzxeYvOcKruEb0gLAhZ8nm3LIiz22uvn7HqcisYkVX92Ysqakd9qp9P13zay3yVMTfDxjoHAskjTogMQo1CmbO6mltlViyxEjMtUhVD/uD9dn6ma4mr0psIR1alLtzao3XG9Kyazu1kx2whJ3Ju5X1V0Td6bow4vR+k7y1dz4SHuczI+V3ZD+cpotEfxZcz9qaHLo/uHU7z8Fh2aHN7zDTL61NRha/kj6kmh66YZzOlRBl3Fek2EovWpeur/khM76p5qfro0KrO+/z1tPlUODkeBSOO6rZQ5FGPUHFUf+Eg8cJzqfozjarOXmo2pE6zmfMSP9yPY2PitHWqfv6bWfqM1yWvKly5+nHOwc6HGY/3ZuI9+I/v6+ZT9+FHAtQIWN/e/uFr78CfwE8/U3o/4639WN2drHSS9YYpQUU5vuJ004Ioba5+4KvB8emGfsHS+lBmoDwtfG0FtW/6m+2V6bZt47z1GJcBTY0txfG+8erElKqu7OoaY2SXgUyCTnda+0DatVTYe/nuXg+Xcp3pX/WxOrWZ9afHR9rSxkU5p+dap7BdLiSCYKkWKUpqlPRMRXVd/qWysU4I8Vn8i51vpm9vO9P7/xauCyHVcx9htq6hPQsjUxKt+EalMCsL9RpxbhEIbKd0ej9+7Coe5mHiRdaHIE1QBCdPX+V1aGX8+g8fl7cjOZRSHS1EYND6FpiTQ267j1VoJDGGbRVjoPp3TkGp9bFYBGeoHb/NYiOU2kdpO93tc5f5ymSyHWbONKSYDGXxvmCR/evXpHQufiPUaTsUmnQ5XpbB/Pa65B6m8uK1pLubOvfL93mVkPhf/q718kk9+rydVOg0L5j9oTIK36uD6FrH+YNPi75z+OTM+3l7/z5jSAodbwsDS8kEEVtMRb+g7rrXbpRqdaMbMyJcG7H2sJ1sIdXPfHssE/1XPcZJa/k7La3j1bHs3+TVO+e0PYbaMU6l613njJjhpoVwBIa152CdxforQptz1d2hpp63+XnfW00VH21LfTXo45fZBvfKmHh5BI91S49yS89WXf8mZurt7CYyzw3LUYeUiJ93bP5q6Tcydl3upcXzkioXeoTBHFPBmVTazDIJKu6/b2oP4US9j7fplNg/qjme4906Z83JV6Xzkbyj2FGz/NxqPYPmh9acml3m9s2p6q7++xV+iBgDe9Xvo1+Y8LaZFH7LPMcu8TVsJ/HdJ9pBxntcPIp3KZ1BScuW3amcfTkZP6WPg49jf7leqAd5FyOi9bFGupg8l6ewTWdP9fwq6I2J34xLb+wbiZDyl95VFkdOTzf1KXFlN/FtdaWON/thPNl56569J9bLp+nDqYYtoM+NYM4tBp5x9ehjk32Ja0Y6tG+wVpzU95uMz3MpiyDVcQxNUFrZGxGl+Z30waGffRgvzOgWFllYQrNEau57MKuumNt1xe78n/ZNN7vHHFr6ckQL0j5Dzuqx6MLc5amWiFWilGvOLrH3HApBjKpmuorOLDNKFbu3/tH1Ie3ZcpW+mW/nYmD75kNXlYpqooLMHnWqMg8e2fB4OQnhONxOje4zjnubq64ldx2pSxMXgUCNm+slsP7MaUXtFZEeEf0bU06e7AjyshR0khSPnHkm0otJIBl9zArtNSvY9x/Y3D3W/IuBr5ZUDxGHXT9VC9ElwukrOrUpdLyrmaTR58yU7wy3052clgRVU1UpBqVSQUhpRbZaO9aonmO8nem7n/XiwISfbHVCdEO51mU6/Crea/l02Zv/FTZqtR2UgrdGQh0MaWQW93ObTonkSqG/7FXx2lwy6tWv2Y6NfRM7Wyf3/XIIotQKNOs2LP3j8XadPeebPiu9JLhSG1oyfn2T5lI2l2T5ZG1mx4KB3xxXD3NT5vLVqZ8QMQtyyeU4iDi+7hKvtuzPmv9MX9oKYUgJnWKok17tYEOUcpL4r2pPxnvFciPIsWcoDjbpZWdmLT1tyuW4hareiiq1a8w/h3aLF2Gthz2CrYmMlyRDpOqk7pApEw6Pts5thikWmTghRSpkv/rn9tK1/bd5Vw6zr/khY17ddImbPr0ftORc2Kx5lqLb6P8fLnXpYfl1wSzsLDqX9Tvuw8ykid1v3UxdSrn8dpGp4F/sRQ6coktxGKIgZg5xYIUDhYHBe1qXL2EKuTsx/jhuI9txjyp371H1DJ7n8SlVVa5j4N3N2WVgax9EyaljhTlfsNQTswrZXzkQWWpeJtZj2qkTM13Ty5pYYcbAsk32Y0zGJr1sc5RGxQOziOyV340We+XFjXmefW8R3nLH3bFOPp2vZ8+k8vtsniGwtjFzt088hB12cBnzeR55VNyqM0swxlAIevl4UxPlPGZHu9Sjx098XUzr+6f6G3Pp+2RtQbRjvUeoR8pkdaUnfbuY2/3togJZQg+8r3Uw8IrMCuXDUCqzynXl0qYtvd79qm2ixDVKLbTqUs9nV1Fft75gfmv0cx8TUvpId5zM6XtRSROexLaxekq9G5pT58hs6idNrB8Q5fOIdPe4czHb/TeR03Y5qqDcYo8IGmWYpd3RcsnvcFfOhJBF//7dVylx7l9tUksknLUye/n9oA0qyfi3WpW/7eY7yzHbj0M6jKb7ctqXGerXz1rPMZXptSKQXjsPs4hl1dKV+Hrss3IXxt+a7WMmY4bvZpqzoMSg4B8VtGjUPiyxhzj9rFpYl0mxXMY0ZsYFz0KxzImbwf6VDyY5BF2rLbyblcxqW+BjOlnatZrpzF8qRKyj2/Sk/bmZTi1pBWvlvhsvHRvCC1t3fv78+To8D4xFZpeZaavT/Qy1Pl6H/hDPpRAtuL3jw5wNcfbodcul6I3jaDPpF+mJLOlgPVnYZOy/a9mhnZ7h2i8VFtOWIa1lnNVKcNR+1YHZIn2OPnucynj3ji64Eczen1DOS+dFLIejhztVUJg3BmWXae6f1Ytonqi9IMLGCbJxQojwUEeX0oIj/q2yxdYW6UBbJE+kTqk63/55IRNuuZU7XKvrnl1HI8e4l/4wzDENZ7aWeZYtQRpmIPo3of2bU9abkZW+jpSyoSPnYHi2hx4yC1tzykFRghVuDBS18Ecvinjc4V5WdBleC01Paa1G0T0R3BbGu6O3TSfVz/OcXmNh+VQ9yjWQfSqDvbGyhX4KyqTPn5/3XRbzslAakqrs7K8vDG+XZXqWZauHqGJrvw4NhXidsYX5oqsYxCPUGY+YCnKNDd257DmH9gueh+d8ER8fb4L1cff1ZXUdtYDmCGEc5nGOP5+rbnaZR+l3KsPHj5uxZiedk3R5LVFkxeluf2Ig7rkiPdJ0/Pn0t2peonVM6S6XxR6efO2lvzlUzGVHZ1uPjmVcByY1IMqxDPk7bvcx/hafFFMZw1iYOUTorDmOiiUzvae9LK5y3Z9BiqpRRpUqtXtvaz58uGYHMqzTyTq9bun1kRu65pZb7RJKa1Jdp9TCFgtz7VPl89T3z+mzz530LRHuDFSY97V9mK6FHtGKoW6s0xeOpuI1ecKekymFEdvrGfZu5ZC+lkrxjMfDvxzvQZLhMP+MciNLWAvmPsm90doUy5z6TB70u9RRh6hdrWYJfJWJNnpWUYvQpM6WwLAqJjX4PT838WbMUsrrMMwf5jfPxVSbSp93e5Po03bBukwmijOihzFd45oq1rtqmszsiUdMik1cJwpC2QfiZy3H7P6rKaerhep0IkW7knGw3nxAstl8TP3U9fEZ+/0kUxoQvbjj9PYnc3kfsvkJmWDe0k7i46unseZTTK8VBF1YkrEROZnfIrcvN9rO9vEcx7S1d3uh9DJricuTZkYcF+cy/c2y73wzen5P2BJNtNBn4SCW460VGdVOO7tSp5rWJeKHpeQDUdAIdvEQNe44ht6lbRy2uaV2Vj3iNcZrsD0OHpvAk1aHfnRNc3abU88FcYsmQh4kIvQcmrVfK/MukbVFFYT/4o7WGaG1HoybqyW/V4ysjPi7prKpiYhL2MLGiogTmUirP+I/nqoxMVJqv/nzu0aU9D+ajZqaW5csmVYMh9e2e5ruPx419pM90lIxRXyLqEo/0jQ6NjXzv2ylKfkSjviaVnYn1UNK8j/rSVRhlVKdoZIYW9rxGjTe4/dvHsa4/R+d3C9clPUic7omdXbMohCTj2sOexblLOqBXdgEZwdd97ys7jM79vicFpXtwlQuyPV00881V7xdGGa82Nc8dOCD2e9aF/f9KJhbw4BGY1E8C+Pq0+fEbJ6fl+6M/vNGO/l28t7NWJNXhqtHTJxn4lgnqxDa9vn5+vb64Tq+6vv1tfdXT7objVXpidMp9Z71VAzzziPTekvXnTuIbkcTZVDiFWswDipQZQxDRu3ycl6idRwpe/bZzkxbWE8Jt2iKnvrwzGGPQegYYhtiB/bJOokSCJEhjqeq7PJa4aGf5me1pU1qLiYmgXiF720r77btCZms/TZ7H5qG9CjX0MMshc/fQmp8Kqfj9DfMKlPtb7oozpve7jid4mTpWrKQ82cXb802Y7zenJS0jLzDVyi4uALPOpyDdtYj5w+H1z+6+33Ho+JYilUXU/MVUqKmjRIV26RIJs5KGKt3dzLd5mB9+N/FU5TCDBnZapf/kLTf37DZye49jpdTRJXLkaW6M3buYtVTlsdantqO9/8a7F0mc9pycbGSoky2shPbWNZA+UMrd7VmEskule5vZM+7kXNI2EEQqS+0Lj51708djLkGycwcZehF/GPz4PhayQQVN6Z4ThIXhre6P9KlcsPScCsUTZCTY2gah+PrI/kM3fpsrX3bu9UMMSRKk2dKw3OnmKtn0ob+aqPr36SRmWZAXuPFYBDaoWtFqstRFXWsyDPooNBZ1MciM20XD2HKmd6l5Nu8fVjYuAwhM//69cVpL7bw4cZOe3WKCtWiLO1UZZ5R0DMQy3lRInO+17ozt2ukv7n/Xnf23esei2z1SB05pNG61z0p7MXPSD7JsipLrQs7Xntcoj/E5RZSddI763irXc/FxMRcci34PnlLVvJkZHotXTKx+Zfg2B/2Gm6ZoYuHYg2EsOqRGK6WPq6z1IlilqgYLdIZVh+L0ucsJ8u7Hgr1kLEljmsGRpY4Ts7RzVhjzKTqUpTX8XL9ltx9OvgDb3OaZbLgl7LYO56ZyynO/JV63HvZMwx8T54m9CHqjO6o1uTaLaHNNVc7F2EGScSikDfE2Xq47+7BYE0pzF7Ta/vMHjo8WzzOeu0WS7gfqVt1/h27t2JdXLEpJIIwMGgxu/Waf3pyO38z9ZU6HBed/JilrYfFGm8d+y0pHBTT7jeFw373TYtrpRlaqPQra8/eLfQ+BoMxeg/DyPjiJoq0V8hbhrD1bteJMjEwKL1j61/1QZ2pmWgvMiiCwDdSFAJBlCqmSAJVVD9atJSI10v54dudt9vPkf6b4/GGhn2EceQDdF11W+pPbn+6TkcTZ+X6oHKWtMrfIfpUN7UWWTeWBEv7zFzmz+Y1bsM8JrPlfOJMKkPl7VLQZPGk3eO1qClTfrBp+w5r3kLps8Ud0PPM5lEwcVOiikKRUbi97zkM4/eMwvqUpzxM7cMau5go2weJqvVPvXc1333O2GrhgV0FReQd138qlGtZi6pFHTlTn8lAHUzXQ0xnJnYxhdW+m9P1mVj0fGU+FiF1a3RveG7XXzzJjG+rPj7vgfVw93MIFsViWc/PsT1RYS1cO42yMtPPI51+x7gxknt+DOMpFCybcf7GbWMNcYgLO58m/Zr2C211o4TSaOidbhHP3x0TZ612lmm9famdS4sKOloFw3l9vywEE4OKGpUaT3X1Vk2IzidlzMjHlyUzLztkwzWI/Sgf1tf9YvgX/WNCa4/cvj26BGl7vuGhyu0Sorrc6tphp2qjZpjNmpJIOVLnqe9+70rfmXuHs0M+5uZKQaTcNbVZqjIL7agI39+R35XoZoeq7eZziI+wT3awsUk7iZWJ5JghxhxpfLLG6lFdJK5d2iW/+8H85xEHObE/ZeWc5mBO1n6yE2pZIna9rXpJr1M9S22p4rAi6cvZ2xtGb5E0QxVVk0ItAgspEmK7tusmGeaM5VpVXq+YWZwxJN3jX5qu04rNyi8bCeEsdWyLWm0NpoJE1ad730oXkmpMphtZz+nWXaeOc9hPZrDaju3C/o2xJm6FmRYszgU7S3h8jQ7uMbd70v5Uv0MGE37RjHQSLhHRiHfE2EEIAnFy11DCH7f2yJaXyFgiLeRtMSK3nzeizXuuX3054zuxPL393Xr0J/jW5EV1BUenqVSrlt6cU5wMEyPBN6SMWVtujnc5y4syx90+jDFnTp75zYfba2egX4IK7PgPw05CIKp0qVHUqFHFFAst5RbhbpwKre4dz0y49VdX+nmlPu656hIpLjSqekRg5E/KN/p+ECqjuDebuFCGLVTP/c0pONOSkpjierieMZhDhhw5I/agoj9k3Eh5Ngx3r3vNYpuf4/b9iJjttmiOOBZfVQ3I9tLxpiFmb2yj2O57Yst+pHupbhSfgnpTKkNLDgfndOTIZrBNdfOx7Vbwk+jHSfUyo8nwgVGr/Lgss2qQHNi/XPZkT4hqJqk6W7Ndh636p2u+08hvQpLNt/t+vuOc+xjsB+XV73d4H/Lev2sdfBAQUGsU5rlGsWpg87WvbfFz+dr7aDuU8tYpqE2si6QLpkTIlM/feCNbJbX/56hNNdIS+RLNUA4S3pAk6/SjiBGTnfvNvGP7dqWz8nuLNv5O67DCQIlrzJz8xld1fb7YbqNU14RoRzHdZs8qVaq2hkBWo7gz9p0tNhX2/PEa9Xav1Dof1sIXsU9gs3RZl6oKQYSiCBuLRiYRQiDadv8fnXF33FnMI1PuObqiLl3NJOW19DKpfJ03qVJRWS0VrCII3IeIuCCRvk6M47Xz7GJMPJWST6lJ5XYRJK252tub+maLZTTbp9htilARqwqDmC90DNdVk2ZxuoddpI7dx3TPmWFU9u/ER1V5lI9Co5ji+lTFYtrqHO9h5fRJZpkXgumeJJuCr0rEw+MpJxc2y/71q2oyo7BxdmxsLzf2YnxTIpM+mOX80HTlhX/Rp7scyDjneFPeOpMO9VPXwVOeEwt9rppVmhN7Q55VWDri7eEJeib9yUHy+TyVD8OiRMfbUIKITMQSf7v1W8JPtI2oVvah1FYmAitWXA8WZjzvRpT5Xcwzmh3tu1/q5l0y0wjH26RI27RVHGPvVDsZVV39qS56ubZvpSNySTlFp7FPCiVjTtbJroJSdvyqQ54ZI7gEgZDYQeTGtj30bD1/q4r6rlM7KnUQfYnVzPygIvVxO73ayG3Xd3lltSwd6y85OUSm0H788veSxKEliY+s35azZCE77EcRrtv75UwNrZBT67lSPtej81kT5LDpjlCuSUYexb2Zk+DIzDjtbzPW7C+sfCwLLRKCTWqGD4tZpHgXw5SWiHvM7Ogj3aWtqiqjvFwXI1pFBmuVTpOxZSu/Z2/jdhujPFRZoqBqmFGOpEfCW03UHSxmycncLJsXyBcmmr2h7imJKo/uJR9Yp400Rdirn+7m9hwc5uYQbMc9VH7X2eq77ylRCeZhbr/PYe6GZyn/wDOuvTynoMY9I9vQEh/d+qTqv+XtMy8sgmgft+34kMYp6Nc/Cp/1KT5N7XlFaKKjWERPnC9z7zg7Lz1hOmPcaZ7dQ1qnOfMbQxMtUCnxt9eVMeKgjdtCp31ZZ2PZTcWxibt1ISTTv85UnTl5xr7jtXsuM7gIp/H29KdvH2j8JiqpUmqSJ+wmlriJED8850l9u3GtNp1+ZXZgH85atTm00JpUhTmYOYOc+dLEUnKyol5PWVvcJT367iR9rpLSTnrNzWyP2dyNW+SRDM3dRLhiV0xkQ/mBmB/X5a5779vh0CurxypFT6SOTi16hZXNrF5G7Uqx+4xpa4vLLJ8nKapQj6ViZeA7nrSVilV6/aPX8UxJd+wyUUQuSwtixi8tGw+1Cg/s9muYqT3tTWOzK4jdmBdksDBdy9+IHEVkOpLdFVx9rffRZeaVYZ46SpHp7KeuvrtPpZQ5C7UGAbMX+Fzu2t36x0OarLOGZC9Wea3UJnyS9Zski1LIJdYfW07mPvswTgubPjv26XEd7d2XVS8MMgSWQIgSRooYre5jvr396L/nXUo+gZSWC30W4yVQddLsU0Yd//a3KlWDUBJEZ3qVt+hYiCELoTDuNm8x/ubDSivfVfotZJtlhzg+Dn+yelWJwiA0UZOYjSccschEBL8emc53zd+X/ZrvbCP3FH3HzjeZIrTo01QrpX1HtM2D9s2Zs1aQk429BsHlxv33uyuoJNvnGcOZzzZjPDWTn7D7La1H9qQ/ykHF7e2m2PukrImHHLpuFkEYIrBCdAwSNV0fRolwMJIYnO2Wvq2h/VJuCnVqetc0MTOWFwn7KLbNeqITw9OU59X1QSDFpjykSlGTUpdRm73V2czsQ+D0i1FeV9p1VtNNyi8ODOR3gv1kv/1tzC+M+9CbZ0fub1H7fKE1cCvLawC0qvjeXzzzKB7CTnNfjDvxzCkPfFSn2+9TwxizRNBL5EeULfJSJ8/QtdVfLVePuA+XKb6SvfNrv6TFRd5Dc8vwQGHtmzK/S6b1dr3ZYR6HCC0YLfO8bNS3NmWG27/J4CB1YFSJZjb5e6MMVVLYMzPFIKS2QxkorxubMIJAEZbX70HCjyfqV92So+rckggvi6Ld2hKaSCaR4rvfbuuf6e4zt/2tL35c6xhV0aRa6lxZRPShooXKp6JZJnybG5ZYO7SFIFwowZLSgklZt7HHHFJODzUjI31LUeFwN7L6kZZRXdIwSsfrHvIuK7Oil5pXNB/3hGV5ijYVqnxX9aovO9zTHhW/Z8w2nj6WKi8XIyTTUu47Wqu0ErXYnxlquTyogr6oNqi+EeVRj0WZMBnskWy/Ri2bGEKimx3OyA42zufSXp6jjrZ9aew1Wjr2nPO/8pJ2lWidEZd+16r75L1sc19DMDdudpZP//xcqXlgMKF4vk1Lnqj+qDGn6jnJ22kQ8dv9xMCIvfjrJdAeO3o31qfhS+musPeYVX5Y+ZFIrzzEbHHiKdRtp83P47Pnp2WvZzdSWqjge5U3vMNNYeZEqv5UG6oK1buUCgxF3A5jsunNw4U85siTPuwv5GGWkZOLmQeC7TWbfYLIzRpUVXWioMJcYmoLDYvGLZE6dLt2+uY733593m9G3YMQIcxmVtMo6mY2ubcS7ScnyZrK645fbkHrl8V3aDT5YcUfttHbRDLm6fyjh+SDWK4QfqdDnj84vs2o/W+HNXD9vFzTMTRiBVP3lSITPZXXbyvNsvExPbnrsFNdTp/RRzI/vK2HQiEa5UCs9WGPrROkxh1lJHfNi+n1Vk9bdIhkxJcfzguqdtnU8+sX2WeKFYX9S37hZvUeSFKlYSjMoBqpCGJO95XpwjHmiyq9x0NeRKnyU1fdU76C9wbMdQ0FaK1Qh0H9+Vx1M6qPlh6plnd3sJ1eI6o7yR7BEIXfXwgP7mhxbg1f8fqF60BL08BXIAnkQkOToERFZBimm+2687i29Wx0yEy7CC2ICOcYt2l4uY2rG4MIA4YiEy0zNBn0DtzNta8zZ+f2zYbLImQLhbD9cvNZXS/Ha7WYKMSDmphxi4YZye11bMd7vkbujOxMStieQaqkHA2zmZFJ+4pWVE6ixFkY6BP2EoOPiIjXyOmUlB9zyut45DDmUPopNTf5KDVpqstfdl/mR7bnOOxrvzw86u1csZuj0q6jFDQk3ig8ZTSp2WmSiHfgN+P3RI/1KI8/1ufCREWadn02/FuuTR/oM7ILVkGZJv+vTBkteuwkrcw8th+oaU8+s639a3jZ1DbxxmYWE2NiXrq0cCgxy0tsoulTjoNxHePBbpDvf9fZavtE7n5aH4AaBLQIos+Ek72NePsQrs3x4erQ805I4qOery8+yn9LiRaWD8txY/DBUxiyLs62dlNtG/v2itOQJUIYJijrLXPs6v5a81N/s3retewmenhDp7XQoU/amvzBKZVq1Zuu1jM8/6JULgQlBYGL+yX1vjA+Ltgve2r8MsgOXBA2gSo/Nbq6VCl1YZ7ioRDcZmTGPUWIg+9+ze3p77vmp3ZGd0Xdk2Krq5oWXTTaECk7VlqyWb7myqpjp3oQoT/e39vbQHw9f9K7bfxmoBN3t6jEb2NFmfu5yDSYmXBLYE1Ha6Lr5anoM2uFmiqaj4emqcKGZmf2GaPt8dVEdnbr3Z2cTs8qylKFmlaGTkhqvznEJm1tZy/Xqs/0jHF5ucpChZVD6JSlsLxheYWTOmRySmVTGuJpZO/iYCl1uiWafaluVFpCrv06Laf8yWDmldafyRkVEmffdLV9Gh9O3ZBCr8wQIJsCGmutjjXUXFfvPqeytzwm3YYPwek4EdcYvzOYKYEgOVkQeRZfvXDJ3afND4LrOI59+1p++dmGC224QoueYuHAvOda3Hmn5z3YveJZA4sQXuJ17Hmr44dTGNvwUcb25d7W7zW0FpqNtonrAzHyXB93bfELRSMQwl7fZAfiNc+2w6JWm7pV9t0qIWl/cBzpHNNBKlMQjuJviP7esuJy++IlcuRaFqvhIkdTRlHqk6+R9uPMaZ0jzqliue3FWU6bOdzOCjt+uSNlsU09vGM88s34Ma24xSxYN9yrXvjBtTwdY68v/kB2NjM8RhwFua4Ikq9Ii6fmxVMssmpm6eyqcY9pM8ZDPWN4USZnPeshGEg/G53NYj/yz7O6HbqT7jyoAxW2mmQUsmswX/B4lrfNcR3UwmQvvzLVg8Wax3UWk2RX//yDUV43RZtLW7vbdOfx4GDGx3q8NZB8LLw/W22f0e9bU8wQMXsQ9HUIc4d4+3j4kkwwSov7SmyVeO2PpJK8B0QQbMoSaaK4LqmlvuXLn6OkQ6PVX9uzX89v0cSy0gmkPXEoMRfNM20N++21xraefQQ6rmljlcpyZjLu0qKpKlvtKpw/Fe861piBFAzl61Ok4CbpPL6ecuZL+nq+nq/9C7FXDBviJJybcKb8MqWOVWFXi6KuEimn+B/7ds10jWWKU/6evtsy4d5qXelvr85kMXPrbCkhBd3MVGpMN6TJ3aJipnKc8VhnLjHl80NwH/875HIKlV/a18ajr+cyjDn8XPlEdEv/itdix4TPphZ8Kc4y0dszs1usbg0yHFYleuOivKyzOKgWhwxt244a6S78Tbwsz4N3TSjbdcs3Bvts27atxlar7i/TjxtTPUEJuu/yg/eaPGWZVV7WZC+nO2xKTNmfvFhiM9CwVdNHziltOhWve3XLOdc4Hi/O9ca5dnIuElHxQfm7Vtkn7fFNnfD7gjLHYFApQN0nP3u39+zehMf7yRPSK5T07RrJXUk6VzdJ0NwYj9niDRPHsNHqtU9GlJG2x6dfmL1fkTUR2mYRbtQ++xYOJp5pCv7BRXq5BqL5VoZ3zLE8cXtUHVUs/Kr3GFK3Vbd/164iHZ2LgTbmtvEkgrZjvCYjJ2GfNO69xMQdhItTiG0/n9W/ValdU/Vbq7vdcrBRP5EH0Z3GQlzztPvtL23i6UmHQB0yY63JmD62MMutyCw0meJQ89EqoynlLqbXi55PVFjfOHGu52+rkk75Uds8nR5vjifHI2qX/VzIU/s9q99mcdQZnNxmfDi5WU3vyzx8yYa6DzUnSnVOH+ZJHV3M92SGT1ShUDK9zfAbv8eAKqhqn3okWtk51poNu59/yIB/EGNU77aKoijYGrv7MOXga12qlqVcHw7bw2zDLzYmm1UTomO7RtWR5rSPJUr3V/aSsLkaLb/7wE4H7RPyg6WE/RdaZf63cm6aUN6uC+s5xPPnSlGCrXvL3/9tfvP3vx5ruWssGEb9a8L4HTqKnbdg8WjuvWCRg1iR/Zv0q+1x+EvrxJNlPx6Lj/p4FqXgYjE6y6q7Pdayc4UtR0hCCKRt2uVC6QbNQM70NIlBj+yRUaG8fKaJMuGjOvqY/JnAU9728ja6TYLRbcH1TZw73qZdX/Rbjx40fYr23CyBY72HElqTQVPu0GvdsTLba9OyvVSFZouU6JJbBBVSQWXreZeeJTVjRmbEQvavF8ubISJhRes0X+x+esEsNa23zr2MWtq/0ptZtXDvmx+Y/xMU9Ct5Zvcnd8tpUVGZEVV25Tbx8TyLrFRzSLRUOAnZ6/m9/fa93xWDRPdnJmb5FMXMNApqUsfrepox+3yWeibLy8sUVm6/vzN+DSyZl49pTibsQ0qzHd12OMramfVc7K8y50U+H0Ynv5cET7uOThxuQbfEtV8+jrTeriS2rLb8WHi+wv4d9v+txj5p3m/zYF89WuyRRxnraYfQf6esv+9/1ebvhf1vqVWwIxYdJBMsDC+CjX2pv3aqYic2szB7zHSkUA+Wno7isc57UBbm2nkf27R6KGZOVx/p8WkLjiQjY3WddCtlPcYKIwgyO5H3+LbKMvtTPByWsgy6q3RjesovS/XSb2sLNDYRNkKQ86UfWqWdYv/L6WHRpsNCOY1eHGi8ke7sut3r9kvPw/FANiG6QhebMXuoRFkzrOqqln2iOzWbXDr7djpOH/NkmztqGt8BDDSzRo25+XygWlVzuaK3nXJVLKeEkktnkLWMDfRX9F8O7mqN2aj7m2dbEWwITA4ks2NU4uV/huVNr5d3vfEkpScVZOg8qFWrqlU3dVBWFbY+sX/fdWPR5bHZbCdEZcS7hjGPZSnXKot6hkWdjkl+M0I9zF9otsAWosvLKhmUOTlxMGzS3X62VZcyl6V45c/K9T0M6+fPVVfYv5Pdp9zzOARHijpSgZNzNrl69ebK1xd0Bw1/JnWpXh3b5Zv8tWACoYkWhjwjy9vShSBk4mcLJSpRarHUej7FsSgccYK6X7q3+2v03G629u5ypsQjRDxIUviYcmFFc2nWbHgRiR4bbdanvCwWZjHpBmy4CsPcYe6YqucbsRte+IeQjW+Xpf1haKsHRhXtiTQ+eFPuU9qgXav6H7g/6Z070ulDy10XLbjWDCVFPCO/q62SSdH1L/JCm5vsE0+E6CX38wWJeD0VvcasqcQ2lmeIUlbEOwS3Ivo99K0lt85Hl+0EEm0it4Nwp4qZdntnC2m2olDoAUkPu8pyyGLZNj9jrU4/MTBQSnkZH/zGh6lNesln3O2tk/KyMDuT+A/sbmzIl2v187DP43pY/Payjuv+KDv24kyZb8dK/KsxJYrFYIzRSfy4veDXBb+cVU+X4ISQ/lnn6vqPvP/Q3XIt7/eeffferdhCRilHh62D+a/M8u8ZTdST8zxz5nH/i+zgaog4HcSxkQYRmzZolBwqh10jFgo1eaL+1Hqx7hBGnP6axn7nZ12PI58T0yJSePLnCoSPYyCr+/uwI8/2LpFc+k9tGW2EsuDNmtTyslcf8LDxjPK6vUb2qtzkxEXIFvLzSNXTT712ylYe/2m/2e3LpY23fNC55MTSE7d/tiv6nTgYdekjXVLudi7tmR5Vp7pOjd6dOuqccDmb3jYPEXjcpmATVzvtXt9PL7Ran62i5n7r++0wd2ycuoLkRHRY2nVIQXagj/V5BL6tNV2pYOfLHth8XM+LXUu1oZmR6Zvx5Hj2fpz9HXPslcFAxWBa9RT10Ef3w1KcJq3ZlTHc9S/4egJPY/6+tDgpTOvzhzUy2QXZrS9Rl1R5OZst9lPMgbRFOLUMqh60Dsa4fFp3nh/Np5E8Qse1oVEP5yvrP0j31O62n4HdjJp3Ga9LY1llfO+vYB9RX4Xu0J2Es7s7pP/2d2DNYTDj/LJ9NrZTJDR2e/3GX01WZ/QerZ5CsRRLoTz+DWvCXJzOmL7U7RnxvitlSC73HQhIIXRdizHxmdrvvWO3RLRWK7NF+x6isCZvLMzSq2ONOab3ew9Ur36PaeJtYMtJNgvzKd0NvRS7OvBxsm4Wyiy8bxtaz2JoaPEfzJ3LTKTXZM6QSZvYh9W0wVSkxCDCqK4eFVJjd9U8SgfChHEcSW8sx0ShoVFRaZeyt6Isu1khmnfuVtajWE2N2yLE4ulTE86K1Kwx/MidMV1r4Uct7cPgM2lBtuVX2/q0qiRrfuNQ2sgH30R0ipTpTx2mNaZf3hVaRtccbzbVYnv9sNS6fGiN6E7udLF0L3y8bn798iJ7T4GqFrTemLBd62mIQiKzYUQ6kd3dqLfx6tclvMKT3BMlG8mvXVn/krnHSmoSNY8SYRdzucvsllkL1nIS6QW3mv5Fl/tf/lVZkuQSx2jIcwh5DkNsb0Oxe4veqkebPR5n5lesWiiez+OhliJKPTW/Jh4pwz6mx3z7vGPHxPkuCeHTB7ERcvAYaq9teXbQEj5Eyko6cRLiMadrYaHXQPfa1TWHkGmYqG+IE9niFkROl/Al6rU13PspnTgFaRzX8uVAu+Zpt9Ov/e5AaxnvpKsI1xSz7hCZpLp0daVkyjk4Vc7uaqmqEqVVWI79bLOjZIuIYGkMr620WVHa+d7vc6u2rV7btRO7Wo3EIXtLxg/DsXG957VYxIsuRgp2de9YbMieoAqOZhRS8/j9ybbHEmexPe23EqaLdob2WKc+03mOfko+lt38ydoOkp0jVZeqsqmJUqSSJQwYMGrGu55F1WGr3uz9a9baXn6cfjFcC4mNP9UkFIN+cFyHGDd9qj7Pd1A+j3ovmV9Hck90Ynu4qv6H/6iauc/W3Wmn7Hm0apaQtbbb8++D7G7M3j4uzMhD8nf31784+TrGevh7IaIcU2PnGXyvCDSKqN93M0c8xxFtOKK3pLaqz2PRTNN5sA6OlGuEg6P1sTJkes8axXMjhJBLfTPmpGCMqfxui2iyRmv4hnTGbjHrs8qCMjE7Lq8dA2Net78w4vVa22vsnMLFoZ02+mj9nrZrcO9TejuJVtqbLAYOlGakT/9vnNFPiwzKrTPp2K6g7TIoSssUe6LLwm7lFDXMLT3iFDMizrf1vG5ZUgs1Pt/6EGsrXMUW9T4rzMibTr8zHWbc6EcK1yx7nTLuTgb9S2wLZeIcK5zG+Mrotg0sDxcXJU+X1NzEb++zX9byP2HkMnbB9uM//s7PNOsx8w91TN6OMUZ1hufiM00sS02vw5eVjD6XWViZhc+Myf8qGUnQ2yZ+z0vszW7WSLLjfNhD6bjOQrT0SGw+PqzH9fn0MYxrtGgj0fnwcEX9661tWqns+7Caa1i217NytD9/vsLjn1Ujq0a0KdF/x/Mv6lErXQkqUEzEYvemfXiL18ho+vWndy/+auRP6+qSslt8UDwsqziYdVWEomLebdPXg56v3XtLONVPQCAhon3so+u6NffQ8/huU/gbSVRIZTo/RzM9n7I8f5YHV3U8/uIuqF4v7HFBCMbb5YvPLvTqpx090t9PaJ0UW2mUv30ZbTRtrn9X37l9Wzp9a83auV5ottyCiNBoolqmCBldU3WJ7lSRWpXMo4zIRPRExkbbYWNovWmMrky0Mlp1FZ1KZ7dWZkXmbDKxEVkhPHSt/svMil1hK1CIjbo6TjRh7Ti3pyhToSU68XsMnXvmOKtWrKTXy1MJKi0ICiV1LGvP2sXWxT49KSpGLZQV6nGoYzsV7BaJ13UsTApObKzxq6SeKVXtuke5castw7i7G9/B6BcLtiDij9a6p7poPv3tUq260BNRLfET+RX1HxDlbBrDuedPjhPT+oynX/VAZnff8bQ6M6UMZqQbm+W5/s4r3xKnTbLiuOlbzMu+2TcsXyHHVbejo8mqKalFeaDUsyaPxfEoTCjrNNOXte/ypU4XKy8yPvzaIFHd62om2tQh2jE1OydCZ2QXJorpWt52b693XuK1vM/LuYnXy7e226favzyk0H9F/LrRrs2LtGsLDJ5VX/obPd1tYuk+dFa8Pl5XPJsKP6IiNXoc2tnjuKbOjaYfKXu/HTdux9LDEPr0xU56sHob5o4qyoX2Odz38dxiYhdJHVnRkbhfPw6p1QL3OcdszPLVd7fl+rZ/MGJUmliyxjdeW+S376zVc2DyB55l1UNDLSzz/HHcv1vvAzuwystp8jMSB5mFoV6sT8wui6rFsOfEVmd+CJ8uO2qxcJgNy5gYqgpHV10sSYbUobvVoC7j8yjv5dUl1yKCHw2vpv/tf/2rZ4s9xTpc95D+Lyy+tro2ZNbCn5/4UuhQEjPUw0r9t/p7/f2wb7gaGjURK7ETnksk6mLsUOZp2kiJdbJGxapan0d9TIqCisHCMNfMT4WnVRPZdZ6SPM8jPzwILgKjhBQ7tqjYSxjZKNm+VQbNEFOZmMYc3dtuzDfXvQrGRN5U7KwgcHwOLV1Hv6W9+6G22y1Pq9WTd10oWOgwNdLrXd0a29/+9mvajlfUU7Jo0Rx9U1JRKaSwq+3U4dRxam41tb2Zcc7+v/eXHeQ3OYkhgkX7oH22jdbq2+c2vK5GlY7dtXL7lHAOtDAs3C7Gqyw7o1uTNfR7leLpw/qICOqwQsmqHX3GKNRfYrD8nPVY7+i075QO1M3jreJPrdLt6LfW0VP1Oertifl1mWWioAa3ayxG4nUJk8aZcM6xibVcy8e1HDNU7Y3NpzQ7+XRrpLH3NEZiG90fn5+J17/o5nlKPZ9zcVO/dD9cSf8O/h23o+X2oPk+h3b/HFKW1bB269lX3eM//Ndkp/6uv78JRfTxtf8eHWStIePzawhupBGRu/Bn76S7DkNm4YymFOvBWZaHest5z6XCmjdMSq/t+V296pQvnRE3gqADRXvt+hBvQ5b1qURmm4kedtKxMzrJEB4/7Bi69710VFf08hrbL8Ml5VOp6DU3n31g1zROuVGLyh3v9Gqtw0sbjG96TIvIpKs6E6ztJntAWN/lokKfkEpFdZ2aXW1X9aOlW9Mnbhn2iyhhWvZCbXHeNO+9e9RpefsGu1rZzabjFeszFkcoP17hviGVHeFdXId51eK8uxxVKhVrZyLtq6thSbHGzCrZTm/2Ifs3CQYdyoHDqKmKevwtv9tsT7eqpw+//7ntOlPSD5Zn2WxSWErh7cSoV/NpnsLm2Mv47aImGw3zYgmzzQnvbsWtjIZ8NLcVZww2fdp4HqX86xGMjrVCFqXhx6Ir6R91BruNNO6bZJZV24YMZTxfj3g/O+zbnxRjncjle+qCf1Uiid/HaZQl+6Sgb5qwq26nfJVLM/fR1vRPr117O8S1pkJNlE45Svi/zqNx2nR/vZrimpiwc57kyryQLh/D0CHlIWMGmiSTbRO8M1IfvTM2dWEpOr10Ri/df8/qXF7zJtjQbtVqpdJqakRXnPWM13YuZGiFSqGVhp5HZ9KZ2GHycmv2+mGMEpdsRRNCSbXU29bQu0dlqKMd2F3K0UQGNptsQ4SypHSoPkZ9PqNZntE+NcWuErdWZOI6m9uqSZ2V6x16TFaqMjhr17XumLtY3U7vstlsHafbWC9Y6uCgjpwzuE1+/rVsliflG9pIJNE+lg8y7dKrDn6Tnd9xHCOGGIqU2WYh6oFD4unb3l9PoerjhynM2CaLo3Z2PAcru7TLZq9gjX6w9fnvFmkNewbh++fw6fZ/uKCUX1/EQuTLIkgzfzw7X0H///9i6TnOLJ6cre05TlP25qzq+Lc4zSVwG5crv6m+H+fv28j3eb5Jx87t2rtHRRMkz7CzMDkEgathK7v2J1/rd/9Ihb+JE6sWTz2fmtaD51D2WTyCwZAKhiBuNXu6bi/P7fMQG3598cQDi51q50ah2B2Rw44kPb6ZPK4dLmVgXvVmjjlMg4nFCq7v/+tnjkaj0cugO0WK7RErfeynsVjMdxloTdMY8exIv6N9Rlut8xIc4mNT7WPlESh7NaeytbPVprZ04xCGOF3eL43WDHF5vxkw+rt261esalG7nmJ/ljGs/r8uouYx3A15DbcI9y06vDasWe4QteBdZto8xdNXb+vu0Y7JxAyfZNzTJEu5fVfbzOeCRjsyiqfwyHGYtUtnDIe3a2WLz/Sognpcy5E3KzuOO/uPBybKCvWwZx37mNTx6xkSLL9e4ash+GiE5sRQGn1IIke6P22owsN8QtKv/HhJ1fnhCvrH3Dz7PR3t3O4ppnhdiOeqzM++KsYWkc6ujPwHJn+Tb685/442/vavMcZ6Rn5/CZZj3umOZkfsHcT7iybinzS9+/WlTcsZ2R5dVKE+pfzri9GOO06Psc/EmAqzdVTlyWoCoXFdH2qVrqvfpSjhY2F7bdczM+/+R2WwMwoz9LqgF/SC6sVVfp3zq/a1fvrlabtnUb3aqmrVg454287CrXXvcj0Y6tuXa63FmZXBzOra8e5krGbcpuvC1aKQ8l8R7/Gammj/GZEZcm7SZsgURKwWK1iIYAk0zanIMfWtTPvtVO8zomXUuLLufWfZUzHjpMJZB9Yfzvb9xt6l1tttZV+1jxPP0JF71MP7LBWpljZ2+ti1zV3nsFee/6zO/+xXconjW5kf7wqlDKZiHoM2pVjCPRwPy+tmMUlahrszUU+hXNuEiRXXLZ95nE1zJus0y7VdV/tML7t70P3g+K8wVozu8anm1E/l8cNBpdrRYsXKQiD82tXzn/v/iC//71Ye7m077eFgznm8zk9PKLMeHub2h0T/fcLz96NFZvQfkexsb+cRZA1xw/zudOyI+lCP7esQ9AgV/h6yPDzUqkzn8jCCY8n0w0Tm0gpOzWLfTpXjQfg0nkDXO4u1sF2+QkVm2dKRmf7dgSMRqz8dZi9cflmX/97B70/RT9tPfvohbac+pNX0d2lKz3sTLr8s94uUF63NoVnct3U6e3/e7n4zPLPSFTG5Y8oePuYhRtkrZ/Wu6knv6sKZU69zU1rmtm8fx7EEd9Ca5nVoplb2LGytq2bHFZG7NzX6qXrYTsXnyuqqWB2TpTz9xf1W4VRhujkPb7w3y2ZDJiaHlW1U3FZo139qnVhrPNbicVMKnTGsVY/Sq7rNOlTbpm2jc06LMplFWZlIrfNd45HY9WwZv//xrFerLNTDUoWdVLUMfk17L+YvhF2BSOl1Lr9dM5Tr3bRsd1q6+9/K6w5jvOL9yhNylkFtlKfzlfOP8nbmf54ed2K6rczj3sy/P5/Pi7nDCL+bucOfP16Tf8/h51LW7310z/y67f3q34OBBRMsPLztKJsR7Caie1cv3xRbdr4EFs/n8fwpz0URfxinbffX/KBXdLzfp6DzqZaZfu11XyivxamTx+s3iJ6MbDU5a0owm8S1725V99oN8+9DV139ws43cuBz7OmnPm3/VNvcv9NWv6S2Sr322/nyzbxE4VVaKSMY3vW4evjnxf1Jz9yGfIxkYRB90ESEVN4VGRpqxKEPN30iFc/+2r+dPA9KhBAi9CHRvda7Uzkfyh7UysbyklfniqSlzl5b9OiXpZZxyHbWsHhZ85pUMfMQccZdJNTyelHo7O22L9kNz/PgeUb26jQZOlI+mB8L02B9nHjMOj3VodbtoDzl9SxEGQOeZH4mqY6JOnYKmxkzbMbgo23qqTmx21nTTsUUZpeG6ik2e74gxhixdX98RhXq8vkXPDp9LJyQieSXrq9eOf93tMW9sbw2+5li5mf35YC4C0dvb8tjqCnpe0fzdI85y1j191N7/+1ADscgLrlnJWyRFbFFWjbRSeU4oY2OFQ9KfbSCQnGqw+DgwOhoM/ma1RuzJchHIDyQMIgBI5a6kT9movIktxPMmRK7RWVH7JZIS7Pg+maVMm7V4rpb1tfHl7afdvdTPuUvjWZLpfujRWCKa8lT4nXtV9qX3Waiebz07e07S1fEq4VWflxX6orZbXY5qPZijZKt6ug60n52ETVTMatf+ztPLEIox2mM86b7cLObVs+saOz3aSnmxqpzmjpEv2biXa5bdYjPe+GyQ86bS1n1HuWUekVYOfDATOXoIpeveypmxJi132ef197WS9QIk0oTca1qPKXaO2taWNn6VPZvJxk+VFlrrRcpliq38QxJ4kH5xO0StKWk2Yq4ztjT9jb3YrZesKhur89BnRerJQQfra1Shec2VMLv9x50POigQ1Lbu1fNf6T+OfVuYo6znZ4rVSZOP2aRZVdYYmZdPwlCC7r+1lXfJCGR3UVXeG+CiCX6xpJsZC2//kbE2DFfuLodK+PQCUUtyx9mQaV8/vtSzH2oOyvbbHu3fl/jt/WG2/3Np3sLoeu62l77LCePRI1eZNSesZrQCTv9867L9ZlbLIHqXgfJt6VWta30h0n1q4f+pdHPHupuCL8pOw+FEpKbWgrd0Qj8rIXRfuLXtstcE7MjDnvIDOpQ3xqphrvWdnX1rNSpGtzmrefpbgS/eJxG5iKrNwKhD017/+FLUaqUGlVbedy+I4rlXWFXnCqTqsyQV1r6YJz10N/g9zPrNOfujGXZZsF296B5LM/AIWTXHnpvdcLOYz3f2Fuhfcigsy9U4fM0f1yHWmfuZrTf/9SoE+O0azGnHAZMtChnWFUuDy0WPCsrKb8QJUzZsIy9mAnFDFv5YPt4+p850ZrMNiKiX+aP+uk6F4xH9SuU6wYTM206f6o6XzH/Z7utHPawQlWDGkF2w8w/rZnL7U9Z3pY9tRk1g+fvMstYz0zSEfm9YJzfs3LD88DeEfvlorlOmWh/t3qQZh4Zmof58CjPpyyFisNannnL/B/rqduGcJfac87sQeImkOvzVbjCMnoYKA6Bd0zZ6S1Gx9gRR+xIWFuiLZxpQUuTJN86P3sa1aZNf1dKzRCbEGjXCN/3m9MvP5xyO9AMHByX0b1cwzPoX5bX9eOLqaspkSmadtdVdDXps3XvU+zhoNaGOdn2bYtrQkQcf4TdNXM37bPepYn6bMU3/e21fYwMTf9iYYcilB/2MXAGt5ZyZ1eYF0qgj6TDHoWC2ZoR5GscRnZc567l59GkAoWp+ww8Vtcf6tBVK8Td6Dr48/WEWliNVaNRi+Wo0D3D8K/WmXS1TOpg08TKr1oHTsPwL36njmuXtCzXhhaSYXw+jJMaheXz/EreC+vtkWcZqJB+9Yr5tyLO8fT5Pe721Dx+kPnTsOyTn73xM09DxnZXdPc/ERH83XtmL0m0YcDzfEecXkn6SYLvRKAE8THWVR5fX8dXo5Gy9M7Rw7EUy8ODegvFPB5PUTzFZcYKZNep1m8C4YF2uVwvr51QNSvM22ux4JFBRxK8BenP7GRFxGp7bi2Ze6n1TZLP/oSvT5H709ddLdkNsdO22UrUoHELai9tUDj4pBVhr3XWx3Zfn/N4IwwpUlyHNmxiQtCE7m9xt8zDorKpD/WgbwgREbG/wm1Fxodx4XN7LbH2uzCqqRH1afJuE9fd7LK75N0IMdtLrrBnQr9Znxs3NPs5Lk5xuz9stklbtV81ChWc7N3QCEf2+/AQkSZjFywTlqUbZh18mswP6nzuxOsSilB/C52zZPQyUliqHhbsadrkM11zVh+So4jxxkr2wcZIzsOm6zfap71ckrZId9MlUahfH0yu68vcmwitevdq+d//Jz3+7oxJ7rVpMfRjKS7Krv4c8DDw3F/33ZVSifpXzD/G8yiVmfD3t9f8eheCTG17YGBugWiwxUzlUrO1f54svbWxHVHL8wO9rOM60nGWsq8114/nreapY99Vs+o48AgE/nwpXeWO908RQWzXClIZGXZ6S565wtVerIQkWUVl+MQ3UM3zafun64fUyu+RNnYqnGRwQfcDC7pQNEqhtDF49vCcTc/27Z2rhlsbY643eFl3eKYqjfhWZnz+UvVUO0rrkFp1/EulMnNsx0EQC9WHgXHSqhk5lUJz7j7eG6dmxM6ZUI9oLffUfNQSKfbjV3F74Vr22Lys6VGN2TyJIDXce0bFxrai2cocjKGdE/g7Vs7RQr612i2oxyzkw/4sMvsUxz7l2GWPUa9elhCb5KtmhO9sP/zMSVss2LPqlM2v9/x/yK/11pfrnmPchYYx/sxOT6qFLi97xoiI4dP9KYrC6pghZUldSAZaxQgP5yvln0vSVh0dTufB0fZUzg4e/Zjl5to39VxNqGzba9G32jVr/0vy9/qXxHvf8h2YOCaOwW1h47lohOtP6EXk+My6oL6lQ41QakGZnno4FtcxrGcu1pU5wl218jzvX7Sd4+Pl99yVbs03k04oOjh6y3aCDNG/gzzy3M+sS8hqsRFJ5OxJtdXLRZm02avzod3TBmlM7EdeIuy8nGjK/dDwKWst/Nov7/3S307f0e+wnj5FrB8H01CRqmgf42ytFa3qrhkRbdK4beSO47yhpUYsgdF4F02N9wvPZ42aFcZ2d+DFm5XrF8O7x+3OHwy5SO6XNA7SmVDqc2q5xJ0NCYXyslrezQpx202sNh3svaF8h55DmSi361JPayzrd2qZff/BTnNUTVSty2J7ufUR/PLd/WBhXyZVWIs/zEkdNp52qZPA6nKwYdWw5ONlHSHWEEkkmq6nyr88v1TJ3/4l70N0Wg2UfPVK+bejNbT+nJ5teRojh7cznSvY1/6EFWasffNn+7vcJBPdqaaq/0V9zcW3eLaU84WIWCQ0LvHs4Bbfu9XW1Lkr6U/v7LLyFSeqPiY11RIn5n3UWxyW3Z+O9u+r52bMwVZtF6qEzy/0l6Gjdjw9sMcNvX92CG8zaJHsaCaEJA/3TgQShHA9/ipmUulnt1HRGPQvKhqvF/R2q4mqrEajoBmeNdHWMv+4rta0kWHXCw8aBy1X3fKjVUt57Vdtpexjnso8Zc9i2W0F97JfOjK5Y/VCO41pNJuGquyD0476hDXpWMfuWZpTnjiGq9RwMZ46xuOYde99tuuSWWWN092LLNLYECyPg22VXbU5x13C1Ftsfs5Cj07LoEMFyqPU9qdX6a6jZ3FSB1OfhuXHNRMqjOn35OmOMX6zVGHPtnAQDs62aRN/vFBYMYNAtWuiu+3IpA+CMQZdo8/n58+frusH/OJ5y1IQNBCrmUb67lXyf/2LmEfqWP2eTnft8dPOGOVrH/+M2+vQ7rsVT7zu8jrUjPkvkp6SRHomodI/JGEiiNPLMU4P+YfIxcSXHOJPm+QZ6wx0nE/Fw6pFLzy2flWVg9IOXY9L2XduHQsVlJMX1xA8hHTp6KrGXGiqyqLujS6/0sKi2f1JxxBZil5EL3bScv3kuXvqyZ3n3kd0tB+oTVTqd9SHyIv97ZdDBNtwzlVaoW0YvO/WZ9vetfPoyW1ow3osaq0mCIY9exxDZnnv2ly9W59TUl39iIf0Qgn5zX7lHrjCNeX+LTkhGk5R564WNc5vq/lWtqpWqzJrez1M4HcFR2jH51ZchLhPQWM7Rt2nq6x3krLtOHCFLTm8Dx3oGeIee5Ucp5e1kf37kSD4hqMvqZrqMevxt+s3s6xTbrtaoO2CVQo24l/+PUZ0mHiwGttZJPaJwS4vC+HVRJf5gprNKL9xR6n+OK6x/SI/9XmoQq0wzDysyBOszERRGqfm4XyF/PN0almtjdtDL+bxZBFRP4SP77LMHwcspnHpvoNV6X7wp2ut4u/q+rs3Nf5aiGMwhyXuENdFU7XQtXWu1v5Ub9OufX4f0iPGX2pRJtN6RBGDguk4eDoWYcs45VbVb8hvPr1RoyxG1Ta9Vlj6jEARlc87zsiYJYv9TTyRkPSdWkMi3iYtn6rmTrd+VNv+nrapz2+InTZVS/xeqHUK8iqt3w+Uj2fVfNa/a7Osn8s7D5E7dIueyOszNLqCorVqe3nXXVk1quqrVFPTsVag2hHtEbUwvdmrs7+CJWpQ+lCuPtTnHjwebWrWZ9vaaP8KQteZbHfNuqwEMpO2UCu67brbkGKte7vPksZD+tzS2cz4TL5QJ6pDJak9GKa2Wu9XT6kbJCFH+9TyaSvT4qwqTGcnjhp+/yP3wEKs6oHCTomkTmTXU3jKsgIzcwY9OLDY7D7ptWPLtvBhR+wqSy/VR+8VvdJeHkHg489d/g9cp5y/KhuFLvdYBpriq1fIv40PV0s/Hv7mZ4WtneeeowmDuX2u3jorKHwx1Q9JMvP3Y6v1r9Tz5NVJifR+xHmPW5BnCZsYFH5fYlaOUl9eH1Hf2pbOyn6s4vk8rBoph6LeMu/EM3AYn2nQTJXzdtTt8wzXpXqfnT7igc4eRVQVYtWOPff5TmJxxBTtwc5KrUZCC/JLrdy7c92Ntr3Ml/rS7Ibaq6iLEvOyDaVcSwaarPVmrfUslrkHrsI/KtfiouAQXLOiyrMy0YvrmqdGTqt59Lbrj1PW2ShM2Es2vby/tWM5xiUbpLmn2ifz0Vq9tl3vXtmccZcb/RrufW00rtRot7C4i61eljqZcL9q2m0iNl95VAms3GRkRdGQ5hvLsxatJwKNdtRTs6qoR87sSW3aGH9iubaTB+86UHV5GKqdwXPi9odlwqwiq8+GOtORXe/m+LXGr86wyzWqDgKNhNGq2XwQopHoa0K9WMHwi172HZ9DEV0o9efyq+N//OflMd2kTXOW01PzPmLKAbFzZHxLj2vvMPaGnWz9kFapghmZz9/+fp76+/VXv798/5XIRKwwaLgn2MQlrOp1keXT7jg5SW/h2GXk7c7D6oVPfIbC6Rx3OK3STJsduvYUTu1MmZM8+aAKqVLULFVqptxTKTyuk7/T992/PZjBVKxELAkZ6YVV6SoNExGUj/58PmbSZo/QWjSwhAci3N620q1QBmo+q819lt0uuv3w9Y+280smVUsdqaarhOhqlSbrrrNej+PPJk+XyJx0/8FGtDiNkB9iERERWvYfaW139bkvb0p5q3f34aNEC9dZe/XSpGaIReqQ3HcgenRkzfC+ap1xe7L1lrBu2jWPZVq2I8dIuhPjHGdva+/8T5CMyyCOKJ/PQ/ApA4ocY2pENfEfE+szLx/EDzuRf8guSF0oGLfrx/Lyv4U4h7PkzdphfbbrwtNMH5OWopvsFmIlHz7DQxVl+jayCosoSZSIZfLT/fnK+EfF40G3dr482s1TTaitZtbGXBWT4ZmRmxmjyv57/P0NPFrzdyRI9rPde28fXoisCPK6drydtTX78umzc19/EB2pX6hkVjhkN0VtalbMW3GE8o/npWRfKfPq91uXUzWlnLegxvHt/iZwx2vngceFMLsUu7LhibCiP092iJyk9epBgtVEENl3940W8fo7NYJsgtgxH1yPaLa099Z4X2ll0pAmRzl7ednVMTK3I1ojivsLbxl7ssdEY5Ia8Gfltc9R55zGqTrVHMiJxJnLtt+OHYs7HafbXJo2+mhev9mzlR1N+UOn5tuZhagyosvDLyR1fN7OcmXHU8/Ocl8b0VWc/dKz1cJIZLPUIsrTdMVDqhm19m2NxQd+rDbXSjDplEYpnYe1n1J61alWxyiOfrqDs/sci8UihZ1my4lBZQxe/KvZyrU9XlYQRtWviSrzFzoOMdP1h97/Uxy/E/QHY5BgaJ9uY1b9rGKtD7OldnnE+twalCza83eujH8kjnaT2cz5R9zydLes03yY/nQQTzG2XNtk8/NnTjrhX1NYvv4Dk12RaPz1134RESEQp8vNnMxfXBRySEJ96necz4NjRYUn1Hr+lPeHpeApHJRQtv/BxLXFOMe+z7HVRakT1SSlcytdUV5HxqRzC8lXYuH8rKktvkv88JIkOkFCsnkSCbk/brqDULJJiTLob0I35PbadzMIpX3Us3zWa00b3jUzvFDCKdhGHJGSQKboQnuPvdjrJeX5spS5x61xCqvgcO+fe8tEIQyMY6IxJD0qtSrUWrPSVvx2ZbnC4zXh1DE4ey01A89iGR7Zf3Zdj/cnZdSaomRD+s4rbmO5FpTr3qaZrs678TzP05MnCWlER8rE/EOVaX6sD30e087vYVdXfapM3uXHQ8U0vgZ2J8FC1WU3T9R6UbPZ1ITwYdkWJ/b6jxMvP8QoTD3T1Rwvh/CN/tnt+TnKvzy/vLz354LK52IiLSOJhyvjX/B4elhdU8tPFU72vbo6Px74uihTEt8jLDw1IThJ/Gs4niquEn+787tjExEliC32Tg6cIkJbwp9jJqb+nNDbyRC9xozns2oVFDmiLuYHT593e1+l6Zq7qMmqfscxShfyeHS4XMrbSY2qYVd57sqSob1cFTrCk2AFnt/XHBLWN6HXKuXNHpdo5Vb9bEFT+iG1P4oQYZ0vkaeU9uUY1vurPZZtvc56/Rxmum9P0+9Vnm47Cw/GqqauZ4/ZZ0WcJbYuUXaXVOaM2gfzkGJ7kV0++VScR9Hbu6I+lfbNpprW97vpqsStEndjzdmPyLj0hPvW1eoQjtmr2K9dlXOsyWlkWKTZ9oR3xMaubXVIRZWp9t58qL3ftfcrw3rNMNIZyCBKirUbpxRHXNuOTbnrWbisckoogcMYNfz6qsJ+LG7LPclGLGSrY0s8mLGnY5r7YeZSZZE0izH2hmOFxM6oVvVxZkd5/pWpol8X1N4QoUMyq/7x+Yr4F/8LM9Po7aTr59k842k4XMc/x4wEZnvdZ59T9aRUdKlUkiqS9l3ZOXnMvV3u54SBkdsEC3GqS7hgH9hE/7DLdshX6J2d2jkmHxRy1PuU5znGg9NfP154v86gTtXx2/mFW7WDKlMpqG3MgsLuUQzesZtVLDyEnDmj14Ql2DN7OYYkc0dy7DuetJ0GGrvQxhaEvVaDLbAzyI6TUOpS/ZFIrLXOelfZCvqdvz1eV9cjpVV5sATxsc2mSKX8XVmeS1v7rp74hmfpFCyyY7OQEUZsIkN476LUu4xqqLLVqr3f3/q6vXt9hl8r3EV4hTO9Qkauw8jxSP+UslCuSr32+DDC5ji33rwLJmNnB5Ghxz2cw/PzPDwwVGgf5RszOlCL30/zx+Ueb2fvGzF+s485Wa7lQ3rJSjFpW2Y+LLOwarW96tyx9Elvv/h4XbLxPIbF7N6uWzVGVRVWbtf4S0aMvdPt9HnwE+YPfvFerUd6vIe9NcVMG+UL19MV8W+1F2bO+ZMn7JHFcZzB8Gz5CZvxjH9rrRwfUkFPx3bsv4f+Vxl/37NKGUnj92/53TpppHd4brwdI375kXWFEb3apuDgzIyK0W7HOB7PZ1U99UgROG+hekZlSe08GVZVeOsT7yru87L3zTOG7pd9D/oYHf6cSG3erqsiW86fhxlW4EmJeOpBSIM904S6G3eQPduSUsynTBEhXnNb38LphG9oBfENz/J89m+v7WWv1X17m34Xy+2JMw91+ZYeitZSvMfLeXNyu1QRZJ8tlb0pM2ibERHbs+0IAkHLVqLajmqf9rtaaP5PUT6/1dsM/b+pWI4amsy0sxNeiMJznYUtUvd2qVLjtFtNs0HvPJBA9dpluJvVK3sf7HGPnL08thWlIxUaQjsPHqo+1KFO7WDkMFq7x81atENKWeMgqu3Wmcn+epiUSb3LdZH8GvULar+Iyi9r76iz4ffww0+3DaeI6se/uOW++fj588+zRin/6qietw5tCAINFAbevSL+PYz/imapyhBpJb9Z1Wia8uNaQd1G+jZLm3dS7C551zV3Ra3YqJ14UnWe+fa2EV0+D8pVeChS7E+x7WrL3KHe4tg5tkrO53CSPKJojx5mEKQYrMGS9dY+PDNof4elfMnRkn+uZf1RXpe5ymR6vK6F6MeiF1kLbeEs7P3OXLlt2972O+5f+/2LvW227IVUbHvH3nsRWDi5t3jt1RNyCgZOuJwW3J0+Ov/W7bHWhgkD77SYi3drU+Rjix++Gbpu1TNRbdd3B/1BH3hN5yX+MJSNTWy/TBPdHftda2zu//RUpndjM2ek/b+1IrA1S+8Q/cKpiSErtI+WIeW/STq7Qlsey7Msy2I/h82AKxGi5YRXVVfZOT+Ptdmk3feQ1hkpi3D5NO4UvnnlLmcoCrtcy7XC9A72ZiSFkUwPrEM+1VM9sW+HvCj2yiY57vudzz3xDI2WztQEfRsX96AchUAyDNTNpmA2+4PxcaknSimhIaiJj6+G/9e/O/3/K+p7VtUtF9GxLkpLLZhTipY3vaRjoZdTSAGR6/L9/T28gw79vd/tnThSKlKIijg28mFJwV7XrrH2jdUmJVI3nW+jKz8LyyxFWhuaNMFAxfptSG/sXkFyRY/BzDBhen604/nUgudFfypLqHBxIYt9sFnbnSeFnuZmp6T2tv2qpecZecdxh9k/bnuzLTRcE5xbCHv5X//G1+/dfvoza/Q8+plM12Mv2z4+ermN9vFlPdvOh4cMxM+KOqWytTcdZLbvdSkdK7quaETYhmgiIiWPf7s2SIdMMvz4ZIx4XbFFuK90u880U8IlVpkJb3H7WnY7dc8YvwaRGrxNZhWrmEqhMvRgyqXyVem8zs/zZfc+3V5DPMkwpKRc20YiMTsqQ7SruMZUO6vnl8kq8/KwdIdZkrHqYJTrY6L8saXC4uDwKXoOJ1/PTFS79oXCL5V5n+OqmmvomjQFECUs1Ja3u7G56sNQ1Pi6h2SzWiTIq4cr4T82+z+dy6gRK6kXpQQNd0K1RMxAwrslziSa8FiRbW7CZKVwTk36TvLtKohCeaSu1P9CKrgtt0Sf92XJ33eKw3LwhCYZoVZNRZHpm9DCmN8Y3j13vzCemiEH+6GvHCIZLyZlYdaazJr25CFQm7gjhAtrW+53jrVuHqc3nnnmPWzPvXy4Y7Nz2Gs3slnvtnOLt83KI6SInZfrXXz1nnJ6mnbPMzZd9mHCgBw0zqEzsIk4zyYQTNW6FVWqrCi63/72fIRriIFaoS66UEHzeE5yDKkp2f+svua/jAylRG9pWby7bvslHe6xOiqi9qesR7LfkiZSvlPSzVibxyoU2jWycDmCn+h6K6taz9bL9L3lScZas8nQjJv7DPLhnFHwGiXDnvOz2XZ7UM+yKIk1jqSik20Ti2WWxiY+k6WeLns6Jnvb5WPBKVvJzCj6uBfCEco5eBMQARgRaN9atm98M96hvaQktJM0gq2kuRr+fcz/krxiWFW2kndMFtdNoUmifCh++JhJGfF+H+HDig+z8wgqHkbsn9Xn/Z/uv/tfSHNEHCicku2X8S32/8RdOZt7UKF3KDgjPbY7y0OlGYI4hAPRi3j3lsvVfJStOmlC94jh/8iXUFhmsZaKjYpr7kLQWGisjQXtWE733neC7Z3DO2zZ2HttHnFcCLJXQ+zl7S7OM6dwCqftaXrUlx5lxD3Te+611sm4OPS0TVptfPSVYc/eHjI9hC5VnU3hVqS22Za9xqXTR8TZMiEICUGJeL+btJLtdkrFy6nB5Ra7NY/hVBGaNDVcXaMdYzq1/2Mvdw0yxs6u3K7LusxiVRIb9QjJRjYbGFFOnO5Ya9tMktIyKgNB8uGCLN8mMme0ZW2paPUoLyffPgz+tiXGGON2JOVaZVFsXRDmT/ZS59i33BPz8hMh2lVK52QqVWnGjNwBCJIAiKdvsg5Xw/4my/6um4iGYVnINDT9xlXwf/53xP67O0r2vbPciXocIdzgN/gdY/TWC/p2ohtqQjApBDb73O+2bO94uneuO9HXU0Hqo0Qq/rA2GoJivSqeiyL/C0/2UXTGTvFYphRy0QwI3+u1lXpuQrSpS7uGlpQjcbK9oiyT6c1GsRS1l4vK4rKPBXnwHj2NGxubvfdm5z5svz2/BTtOfwti20PITZYQ8sgOp8tC8I+W3vfl1GpbCz+FCWfXKkeT0o4O5WxxPAjhdalbpUaX0Ze+ja7bCo72h4VbLkKl6SYzj6qr8siVb5nkm6wh6aFPbvdO31lYgndJv0Y7PlfexYFLY+m1CmVoUc+qYllWra2G6/JpVl2/0Odn2lVK/dYlD5uVgbT7by2bLjpDZJKP31a8ufLS46VmnM/teRSWpU5JLIxm8WQyyrRYJgcrTS6reyfxDxtVbGxacAuDct+BUxLvcr8+QWQBTApZpwKDt/g4VWIfohJME43UclIP5yvgP0/8Rzi1Rn3+trSVS/FcbNeI/t6pR895v5iVftqNvnMOEd0xTwrVrKqx3JTzDH9N8vwLJaiQI27BJRHCjvSW1eJaAidrq6X/j9SkFyqD75oLcTI0wXabsaDz0kLLcfXluFTvh/G3O6N/f5drwXz+1GKVyeJhs0cJovbIHttCW+yh2Nsbem/zYNtehz2eiW17iONe297btpqS0w7h8pq9vH5D+HYe3TMi/XidL7uLeSx7L2vu1raKLwsvD/lcEikju26t9l2pp6JdXPp1uaJFHHEOe0y/jLH5rqiCVLKmd6ZlayKne8TdJU3/1d/+tg2n6Ftzpm/tuHrF8Gbk2rJcx73Pv4pQe68WfYbPdH17OZ142GydT3nULxLTSb9VHOdpa/P9aKVEu87gwPArGFE8rol8ltc1K47D8WeiTJZURkyk0qHtZJeFpyzqSEZb2dOZnzFvDtZib3vvpDq2dNKBkmsoOZGqbd7AOQRgELiQNQYw25cwFK2z3JcIaZAiMXz1CvgPzPovEtlV01W159Z1odu9nkc8bapgt6JHhbUq+Lxp45guytvG7HnsCWXPzDtX17fLEVFi/ixkYQq1bMvgDJ/vhBs0iugVleQkOR6fh5RiGHPYc8xhBGKp9Nk2mrRJfJynjCTEqd+NsljL86dMVnn9Rkix7wiXRTgzBdtW7M21eMd7bZVrwd5sdtzBnvSWd7a9PELY0Zxe43244HSRto6O8dBpb8/09DOsuR+2he11HCbtYGRwto8+XHordYtru0ab7Xum+1pUc9sPQyX0PVQuXUQL4iS3T6pXLrWb/Y69VlnTycqN0d4N97Vavya6ZKTGGK6B97CRysb4zrH8zv5CWZ6HeqzPHQKXui9yT1tbeY6adWr28h+enmehtS8zdIblEfmkMlMby51bua6yOdtdY10O5I+z1HJ4xiCVMYZ64I+HpY2pCju1wr7EDP+JuwYZDqRyKaUYBd/SKfKxAoXbcCicZt9s2JdzXo99K7kWxLIpKbT03Svg3/70v2ayn+9/WOuP6N/Wp41oHJcIC8qnQt9G+TOnKCYh9invQ9isa0KX6vN9okIm/Ze4voPzf1ecgucQt4iI6kRsrWzVWxTT43yerLTsNtoveajp0QZx/UDIDIfX/qRqi+5ltJWkd762OUbbbJr6QzEnxTz+qIuGEAVbzbKxPZNq23Ys2+kmNzt3fHI5Pqnb3hkftvkWXC+iWbAQvsVxH307mbZHuUaOBzbL2ghMf7jNJKUQGUlkVc3EDeIa8majv4+3/1ZE7BARiIEpGUVM8etca6bG3ZKnpbTOyagILx5cTo3rrJ04DDGrYxFNsrboym1U+TVaOivNerze9dRZnuRnUSOEy+VyZFUFW95Zzjq+U0lc00k37BlXup5Lkemcy3WlO9ubcs0ju+PlstRjShHKtUXGb6gHpr0IbQ9VmBfErtq6aXpix4ZC5iLKolBcgIDAMKUt6wD2ZouPE8FAqCdRBE2tJtPT+Zn7R1v+32qi5lZHmrxXp5GfXBTMHPviONrUYp2EXXpHXjqo9twtqCNUj9Q9t7Vx3QoKqQiFJlHLxwVr3axjWsuTTaGcoe88kXTUshREZma03HWscmawhr45zyXdpjEeqG6+7s62aylmWWXxuBZrQS8uKdtz6+9eC5v33q7xYMNmH7C3D6eXY+6wxXQOYcPpNTjF63WuOLnWufpp+sX9o4VPn+nZLu5lvdb0RcZm5HKUEOcKAU/ysLq26tqC3nnc3sb0Xc0KteIIteN6RuhFpElZPSQGm5tcP10pkoxSh1uHkHfRhQjhFHRnIWc8njvrrszt5CRhjDF9Met5kT+YGB5z0qfVuar2xLmGM54lz1qd1hmEMpSBEPnQnck9MavCONKi/TVupS7W9CGUJETO7iQ6F3XZTNSOyYe2qFdW8w/eWDhcVdrtvoyL2VXFM4Pp5Tp/q0Dotp+9ER/n10q0cvbkLBQqWbRyfnrm/q6G/4u1ii+flbXPXlye2wFXaEb505TqraTUxPH6eos7mkeIHDGhZzPkPM23bmfZPn5YEUfikHzflCIEqcjLX2qFCip2LE+MnHHce0Rh4IO4po0FBy4mRLkzHr2TbhES2u/6NkeU+pTFomwshY22l+fZI5bQQzxTUHGtu5ment57T89jUr3gkTsQQxwzz0KeyBbEJtRrWHJ8oFoovfU8emTfjaP80WX2a/K6NpJtIxzOo6q6TFSV6P4Gv9oaj8KD6w+zAvs8qpoSqYLyvCJdSUbZrpTpsUZFxU2WdgTvBHVqLL22U8VVdoh3EKm9xnBtWdn4TI9a9ZgWnyIJQYqou/qcS1Wg0+1jPpj0GPoNvnM5XJxvtOUkSdQ+hD4cXdgPrOMFD80a9/ga7PJyXoq1jyOommJGbS//iOtjCz12E88QVYI3Dvc3AzJAyLD9lNXzbPAD6IORXHQpn4sirYxI6t1n7h/Z4r9SUzFVPeVW6A7JrUDc/E3oJE/1whPC3pSyKUFmXZQyfpe651fAUeW8766O1b596s8ccv4sqAflOViJo6A2a+HevJzsnB0OUXJXxmpezLTOTP42nHxCUFmOo11+nbW5iO7BeFQkVOhP6zwoystnutanhJwKefQsGbnDprJGnFcKPXfecbzjuDd5B/aOe3iC+DDIhpx2OLHenNB2Te/bVWpr9BJWyt4vR5+ex+tjF1QvxzU8IjIQKRNLdalQfnlbu+LUxUTKCrKHqHOhwixSXDNEU0ZFy+90Wz2Nu+M1F+0Rt1l9Fpd3cuUVeAe3/v1GZydzxX/fr1RW7+xewxfKUss0VVGiQsuhs+qVfUoGkVNz8TrOGnuRoDJ8clprUlIaZA6GfIy6sL/c07Keh1kX5XqOydOZosld4/Ksmr0Kd3IPVjaOxdObOA4rvGNPXunri3LlpEOZMUPuviH7/58kENS+9OU83H+xpepNH8jeRKARU9rkx/Nn7Zfp//bfv69krPzje21V/gU2jrqu354MH6PinqH6pe5aOZR2w+oKaytU2q2eiLCV1/Z0ZgkVz1Gk4pGKVCOIimDdvAWbqfQ/2vSQY+tk59hW/TruS4UR6PSZcdh2U2oGrnj+nU94nsR4HLYnIxRVn7rMqdaeWAWbFOJ5yci6w/Bsyna8Qx5s+9k7Ph2D8BD2PCHIJl5zEhcrwvW9YB/z1ZamM26dTu2nZzPb+ihSONmktekyrGQ7EgIhS4Uqf089wsCf+vZv8cPMap+ZNo0UkQpFP8oVrJnY76ykku3t2bFUrq3t6w9/DfTO4FBa7QhZac87+z0uu7KGrxo6kmE9Xu4sC9Vj/PrTPeVCn1/q+W5n14rnkYcpmBWziIogRD64cwqBc3a35zzzo43hWp5Xe5mkGXvHB1kdljeLqhXOactQj6xk//lyrdnWlL2PtSArVImboXjPvClfMz6qiwTmaUvotg1CfB5BrWvvkA2qgabVRvvzy+0z9idTFDW/0WnNLT3h+k4Mot2TIK1a4H5SrqjMbk9HxD7lGCc554Sr5PbT56u/uuIQ5IiKMz4nofy6vedUbpbluqzaHBk61PeY2uikpiGGliYzSDkLzuxHr+MSKDL2SqoNSc1I6HVLodb81GKZxUI0DLQ9suyhEZ/rMXTZNjZsn03tdRBuSE0Tcr+t02vODQnfhJNv/yx2aK8Z7t3Dpxc9tn+lzwwnBwNTmJCx4ZAej28eq+J2laaqGbelVyF25Uz0qx4Hq2ogUBtzRYp47tSMzZ3dZ6LyTamr5BpS6Nd+OSynzgiX3Hss6dcPfuE683Unvf681zUZFV8nJsr0hVLWh4mSqqa8/DTkqgoX3pe19zbXEZjDyMA0OshMDPncxy451Ov8fKqv82rbnC+I2r6pMqJ6cqq3pJaHIibhvn/HTNWnYhqum1piZRS62aSckuljyX2bDsvMJ+Hm0JcWBsD8SsUK0eZQERooMQo/kT1jf1dlX/S1TPn2wtzt9anCUlQ+NHcUPanqHZi9r7rmW/VaMXlqe5zoDf3tbaKMiBxFHKQit0U+VGxbfM0Y3teO2vQSJ7R9kh0n2zSONEIJZBiotH1qF3MG8RoqU45m9FbJ7n/UNsL4yyyvZ3ldQlCWX26K7VhPih6P6el7r77nRy2ePdjiuAme2MSHqdd4vXASF3x1rVaZ+swMpe0wd/tTy1qvCaHFgFmG7ctH5MMfXe1LrZmKeqj2MEuE8jQvajp+mBlRIoj2DCLvSX+yWSJ/90RLkclGyYhaApvrrbvSfWserQ7bx+c5QucWFSm2k7DyZMWjLE8txaqHssyHc36Cm1bDa7Z25PP8/NjIQFJK6VCctI834cLXcIvS5Toe4jtj+XEQ2HzG6PhI1vDyKaw6015VrMRiL3XZgj7sXdV+B6nL5wll0rlI7zeNuMtuoeSAYbN/C4aZ4TkHUU+UqIbGak3Eu8/Yz+5syvoXivmup2+uLmkeHUxeRwvBDq25qL6CuqblO4Ww54jqCnnOiYoQLf2d9N3u+E48OEWJeH77GJEFWddln2y0bdbUvx8rPY1emXlbtUMQZKADmQMft9Eb64ffHLrHaDM8fz6FViFPNk9hsSYPoR2Cu+hHsKtmLe6d7bxIYTt9UuLjHYxgpx4shLCF4CQSvi3a32hN6J4fzLTH/TyKsub+bWzaUTpuG6U1MpMjqkrdq6qWPpoM8cv1w9phG33qOkKXsh70HlqkiFirzPSVHlRa3U9ivM6IJtfHHh6n6pfRXuGUzzcjvB/9eN27trfv/9761VvGkK+aHi/XOa6rZj119Ciz5BYpXhVe56LtvdaAaJ0zOiOVQUxu5OPT2GXXpc1iZrO/OsWDs8vLB3napo4hbZp8vNxMnz4yGplUbSb1+G2b5sePD0V+1txmVmfOKDEhAM9ZQLv/R2wDFh9HaTPy4xHoWkJSPzOcn6k/+ZuiRxQi8Y8iy29tRYb+7bsW/bsqL7b+FN2oZt6h2BArV+RixUmCpc4xbPe3v8YdIkVE6VQiu8U+j0t0MeBdl6ktq+hNity9nU8NkcxA0L6J2ziHExNP4Qii9CMSQTpBVIbZn8k0ncmanj8FbdYeIU6G2CMUlIc7KmVj2z65IW7BCJsUzA/2dh6cXH55rRXx81nLcRlCTPmNz/409XjdfFBo1zZhZOgEJwTkY6kSFVU5RdDiM/jl+ox3MR8zIsVloBENDf9M26psP/04Z8w15yWREmpDv4T7rrmcGvrWkppD7g4W4Y7039K/M78EEWsVapn/kGosgyPEIaSqOkLNTs6O//VInkuYmLRKB8kQLlLwGl4XXt4V5cRrWBbqWW6lLUtjthsOvmqhWMRalE+Lgh22l3u2HcPTZNvJVYiZwV543vdQ99skoADYaimAVmF7/9bd26c8Bl2qVVEtRLBB+cL59Ez9/U29rpioZLr2/I25+7oPbm6ORIqCT+bt9c8uNo4gkHeJ+e2U9lgEtufNksmpP78TkQrUQ/2b9W/KGxg2M+uGtTk2xfkUHhyLg8421jD0nQFj3dmztN99bT/eoT3npM0YSZQ9VGwqJ+MYuhSm181CalZwJw0Zspz39PQ07tTO4c4dp9Mj8Ow4xjRBahPCFUK4YNmfqdRQHY1NdON2oezj5OgFa8J2naWmFiNkWPWVpbhVRYsywYRFbOPQ17heKM8tft1GlUhIrxYfQ/I/G3cnsUoMh04/rmJ2lV3hvsFruRr917tCauAuuf2/b1ZbnWyL6fUDH9eaLUNBUSfbx/veeH/J3m/br/ujxjAYKtEkHpFEQcauzm2iNqJhfeZEPc70LmTLjh4McS2mVTVZtcdGSe1barJPlPSY7A8GoX2o855A5OJUYeY95QBkiIAsygQDCLCzm5AOXZ5cY1gWMjs05N1n6k8iVaXqrvr8o+v3Cl9K7k389kQZNzSTw45vM48fw5ZIQpT6TXwvu2a6iD70/Fl9vy29f5bPilRCiYh4huAeL+VdamLVtC+7D6VTSepOMl0HgpCZi2/HcK3CjHZrqgzdSY3fKY4m6RjiJNxRy3UpmtAUoVHzWp7Fdn7NM7TxbMwzUY84jeP8GAikWCFYxC/zLV6/+uP13pQx92PROr0rNcvXoV0/2mvg2KSuzu9e9qCmmivaarh/ok0opFSkWjxTLSgJgvKun6yaJjeplt+p1ntPSykdhlM8sh4/jq4dg4MUP+hw9+uU2C+LGkPjWes8qEVRzXm/RCJpTf9UlPOYnODHU8IwRNQnqQzds48kOcjNi1Hpi6oX7X3V2eNS5YFZ1t6yrcoY0UjGuDweJstOpe1Ls6JwD84aLN44zn6PX5s+L0y/JG/zBl0gqLQHBgNCmNuJ0EQQWR01F5Fazqj0Z/pn6d/52Vh6kMUnNVb+QUzc+E3cdssJN4HyLZ9vRpSisqRXrQ4yK6jiUj+krnq3rertoighlVN//ttnfE4uqsTHs7L3WoVaG5Vpuk6rh5XHWEFc09ptGKuUXDj0ymZHbN/2QJf6y9a/Mjo7Y55/pOP5gzIRNIEUISOeJdux5PbxFXruaB+HjfwRbHH6GyHskJPYa3m7jmfpTMNncuMzIpBtXh7Wi32XsNwm25/MVFQrt7p6VTmF5rjUdds7qKMVl5f9SVCCwLutVX0it91nQmawHaNLqssz6UtWaCnbDnvTvS3649Za3Dm4HXvd6Y2ctRXLNF2mbVnYCaYqUtVcuhB201XI6gVJYowYjO4QgiEt98QMDWVcdc3KWXthelxXuN8ZMWXH7qA61jJZluIOBEskam3Y71l2eKqPzL3J/lDGoOZJp4JdO3MTAkwBEgEYEJ8KteRa+RwhDRRbjPrJ6vwM/Vzc8RmxblXdiUeZ1nLvv42AyzvaPEX3RHsC/0zxTh4RR4rwQ8/m9zFRkacievJl/9Qnb3+vE6iH/fOIZkeLVZ7xjOefchbKoha1wkl6SzwJ8uwZw7eSOQwDQzsL6/dWZKr2gc+48CTI58RJEp7vLe18TJZaCIHGPsgd4nnV9F4uny1b7BSEyomo+QUpEXfMDsJ1+nXIEv60n7pmebq1re11D/f6Z6queSytTBptGdoIEuMmzrPKo+vS9RvKFpfItl2NOW6vXf3iQgpaHrI2hIpzUmE+dOFWWX9nk3v70ySOZXDfp2apyXT6NTPua+N6h8b6fFdcl+u9qdPG3yTMN+phWatQ5/j0fFcjZOxrlSpfWW1Gr389eTDDh2QWpTIUj8Ylk9i5dq3zNdvK9ElNeJ7Jbgi9qK4Ro8gylqke6GJr7KnOFMOmsrFXnxESMoayrqIyLRwVkPka73dzAiSBP4XSNQaDBCa8fUpGklAUYtlRYjlr+Z1n6O9vIumE7yvX51rZdWqLMCFfbspffnRJLdOXmVkEQQlBRjpvVbbJiap81+1Vmu34TsTx+ZHJ0AsiwdJhRYtZy1Q2vcSJfG0c9fsMy16G0oYiEEQ5k/Nvvy7bivaL3spub7t6qqn/H2fMmQ4Z+lOYKEKgEaipMuK3K7oOn9w+zB/hPchBxJ4WDjaC4BvCntJ20maVdA9l8jTdhq7JBM2xmKVMmGEmDA+puo5PpfUqXbdUoV1C0x7aP368H0IQA1GPagT1rpeE7EEMHNNmKj3kWrFooo42W4OjBpUht8pegf/rasPtmu/NP7Y11GM9LGcp18g/IUSqUl5wJS3UMfOu3E+vd72ENhAtrbvY0pWh3cPXe+CS8c7y/X3Qph+OKrZnmeF3JgTdrvPCEn2mvXmO4MCkqn5nZi8IqSSKqMxrSiBHcxcUCCCM9111t7mgVcL4GIoDFSdNs5BM8vwZ+kdbI6gyVdPBiJomx5GNzSm750ELJ1pYq9lmN4XfY1hh34SdA/OV6b77Z5nxwyMoqIjvHWqwKrLqWhdrqQUFh/0f2+ydlJPeqweMn43hi0HmWMU6ht9JLPSaeL74/OmwOZF0graTkIs1aR+jSCG4I+qnsOy3KJ++U+nBezmPOI2anhYEGQQhm8D+6uq9/11HW3tGuwj3NpS2PfuwrCXfttbafUhaQ5702lXzS03U9lWNvpU+r+TP0z761hUKt5BCWpMKJqHKXnHtDHmUUkppK4rp5SUqRHutq/v1wyEmeFweqpb87ru57XZqJZUYqMc0raJr2/14skb2iZ8ekQ89Oy8zilG9ztPaTVJpQwlyTgeRSa5Opma6yX2R02wWqzx+/BbJk2yr7RO/61LrUuK63Mn+42VdVvjT9pL5m8meH9qnxYHJm9/WmsGghAR4NoU+CGyMuJ0p87IfcvYEo0WhmkWLfu/Z+WX2S2lKzx3a8lluLtZqGTORwf0PhHxqfZs5Jf+kKCfzVMT764YnH7GRbTWTE/l+FzPNvuuvPuR7i/wgVCi3Sw1aEKwpL7W26RAtbdGR87uNvon/qUWsJYj8LQpH/naOWUpR2zzM7ohr+vrHSJz+fcjIanGnfj8hD3NSaqaErIEmQ6AokfhspWBLeYjK4TRskzimYFghJxdB+KpoKqQT2mtUP9Bq1dUgak1KuQ/ZEMjw7VWiUF23FHapdtf1eOja+OO6CMPnsZdnKob4UTnXzedeUr0hYazculYuW+Gyhuw+8HtknKpwYe5FbkevVHSRinsM28pimVimxeH+wCkf78vlgne3wxOEfJZvRRuMVjLa7U/JtnUnLsacI1/G3bvlVPV/yusEy06whllkdsZIWS9Yl7KX7SzDwQrbNu2zmEZKW6gaF92FmKIKTma+oQ8QCGe3kHU29uON+DweMghdRJnWG6KSCLx3+8z8Iy3p7CPUHzFR7Tf76cEtod2roFdGRfEZXeZ9jiouejyruWGSKcTdZSLTR5r5Xl1x24nPIgfC97eN+4HFWjgrls6ye0OF2kO+RMXOWXQYgyHK0Pg4jlV9rYvWFKEfUWpFvnkyhCZOhozT2fSnfu+6CE08Qw7EM2jcqVD+xO00Jcw1vUocd7CgQ9hhOT4nV1U7M7j7G3e1d7NRm+jldT9asi170zno2fjYhggp8tF1aqlUPF5bV+lXS8V1X5gjcoWy0RW6mghKUK3ydZaatnOGUipa7yk+KYtsKzboImpHWl6aCh5ZdO7Pct3rXrEXaUN3mXjwsEwedoWYUjlbsU/3UT59McK2RhCo6J6hMTTyJSH6mgfvjUoS9vU0D6qeYZXpHo25z7Jll2R3sPw4ZplC12RH0dYyy3Xvqrjuj4+vF5NOq5PGtJpg5/wWgcyEp9CAwA+gD6O0a4VukhXLiNKg0kU+939m/pFWNtSoyWJW9USvP7bwmfc+5csMkjspaSvRVoXdbuJQEKIiq2KietbqktxtjYIR3wlS8SiokJRkorGuvxXqulYGBWdHSU52dAbH7/VsVSnEdeh81C4uFEytxGv8vEYptv40/TlJ6nf4ZOx+JiTjXY2MIGr2d9tD+3U5b1QqlZIK0wZCHHOwoFMhWEv4tK519FPXuOhl6uNivtwL6YyTZ81jT7De2XqiZkFK65RKkXDWrsdFl/pZ5Unk2OWzYOn4Ex6Pe7OYxdhTtIiI0MY99a6kSJSjItvb29Mj0+t4XHV8Pm98Xp87S5Ry1azwTNzi7leGu7K+hM/yWGpFoXaWhavqNN6Hb1617VWZysz6ebYH/g4HQ6Uy6ImlPYmUolSvuWT4dmq35lVHIR/WLAutmZ3RMTrG/eVaLJ6Src7RSWBE1WTi/YKFzlZFUHIqoe5cTtVhvLcRwPxNDoZ6i6stbmd+zct1fBkiq1VCo9os+vDs5NSFR6wuilw1pSOznbUVburhCaNFcI8qdftl2RVh8xH6mPc5x8esmP5Ln4513T7SrRLnz4qTSAJVGALtrS7HtS8H2bW2v7eVh9y9pJLleJe0obUoQjuuL67466rU/gjuCP3pWL0/cH5nx07vjG/Uf7/nXWtBI/QQKn5ZzqtD6fH5XOI8FbbUcgyiXN/ZWb760zh8tDM92s9Mpt34t9Khe23hIjjNbSkOZMBsRHs1npe6Cn0I11UNpWHuyyJaLVInHo8g4nerYZZgLzo22k5bqUsut3Bbjs9DRJn443bMlSHXr0FecSf9rb29q6cHFuayMLEwvNGnJdW507OcPB2MIi7uYyU9aBUqwjcJEuQih3T8nNt2puucVH2GiYJV2kotqIL4lejFUsvLNSz/xD1G12oTa3n5hIVZ7ZqTCuVdPmbeQx+7mStnABKi0tKX8QUQbPC70raLhLDrYwSKEqML7z4rP4d/OZPy8XotNUknmVubG78p1SbyuyJqGdK9b1q7q1y89bV733Cr2TY765x1rePKXCb8PSdwxGNgVMgkuoZtkTmFr1pZUUvUtxO2SnZap/GcxZiBQGrMwNB7r6JnBf2yXApRLRKKPTgxNUF0DBJ3LSEqEEgN+juj4rx8unZH085zwqR+DHQgyCJH09/zoWn/MvufNv0Jn2M6Hd3+pWuGXoYuoymHFcxyLdVTmIEkLUVVogq151LKTaizqIb34y0yIeVj0CKmSBXyz3nXm98+qYwYlY+ymankSTu9cr2ClRHvqX9Fd1u6TjF9CAeyrvu93zfuz969oxaFx3JYtXiOmMcQ5VdwzoGfXTpqu9/btbmZw3fQWmdgaLTV28dnfmARd/L1prrOObVZi2VBIcree3BGDD2sYk3lWqak5RC6iZpY8UkxOeuzN9v4KVCdMhAwfsvXdd+8z6TJCsrlNNkrX1z3b4/0GPcoohY0iNWaCOfbZ+RnE1q2DNKejPquzdS6QuFvbmA11fdNcc9vxudZono3zfpYX2lXRnoQ7/fbRn0X25e53Zy+/hrUnyrimTl87ml7ruNge0IUVAZt9xqpCLVWbbeRYKSRJvNb5fbjoReFE3pzMIlVfyrEOvrzfBr9/6S3DHtV5r9WMB71+OVCxeXjEhQC9eQEE01DIIVML/TT/fUcRLtMeuTumLZV+jHUnh39/lbuiRbFhy0xehrabYKZVcdU3ZdSVVNX/DZU4E8Xv1yvuOZpikvFZ6SI/2YL967sVnNIom0E+TQ32fvoh62lpxZV5zVuXoTXDweqttynY2/X9t0dylJeFbugen9kfR0mXErUToWurivTawZv1hB9SVxPkx0pKfGBES5rZmQ4ea5ZdX4yUSaLhXAPYmYficTNerEV1tgGcvy2cVZI6mAtqlX5V89lfDppYGYt3YuQEP60b1mcFGBvcT+D1Bb5HNSVZbqWkNTw5Wfkf7q8bkL4rZjCCqrlJXLXMe8QEuiBIsxPmdhlhJjH7qR4hxbzME9po9u8heX2dyLOnwcdUR3JxbhQLT72zwf7xazdijhjp+L5J2H9P+tZz6aFzFCiozXz5XVOQYozb86FEjjwNwSdcP7pjyf7Xe/Zqwikv6UQv3mHnmtd/ozTGT0uiNMT60dINyFTPm2vGtLumehPzMfXniHCUy64Fm0vOIVJSSADU+thdyqoIqotv0pVKxNeIziF0KSq5T44Bz5URYoI5Pz//bG+ymeicuXf7kxPyo/RjMeIUh3ui+iXXE/V0n32Y0v0vS8rwu03/XWPZ9yeHy0s5TNK5EMorVzn66g8TnUd3pnWrudxbWZrtyFD03hIH8PlHZecWeK9wZQXD9q1FlRb7jIY1dui6rG2xawjZLS4Vsf1jWC2f6Z4shVsYqawCG9DeV0nCxK8Ac5hwFxl9sW8hPGxW62gUYrhwjLH0zPyb/SeUrL+WCJbM6FKLbeuoKusSelnvkx3Odx8459rgzfh413n/f5hy63MXUh1n1/ntr29ZNJXCSWCCNogSjaTI/Ya8oTn81iKC8r5kOxtnXetdxme1yAzwTdZn1RbP8RfP+HNd1ZBbWZ/nuifOnbGySc53+hlbdiFYIT2zKOQSqFHz+G9UOGO86TiGKerCXzV/uox/eh1aNrs2dHeO+ajNYGHsIkLE9dyqnfTm2PGwEdQ1DfVapXWiQrBnY0iXjS8oqWCF2rxXDLj1/GcjXzdu84ZIWrJZb/oSXnGGK9zllaTWco00S/xPiNc3O/jELnIrLhoG+vyQXndxiiRVT3ZYkNp6tiWg2GdRScMCJUx26QS0q/NNGFExVvp2V/gBdNSWAqxRHYlsWHyMc03y4a9Yi+syBDiNFP2UjbeXz6rTPM+QWJlfp/F1E9CFmFKCRH3m4/TqYUOXZ4QFIET2igyP1c/G//z/++Ch5lqo/wR9tSKxOJmhssqLv4pBU3pHSsysWGXQNrK7KzYtvNUMPFMf+nvP92Wb6d8lmrtN0uYIad9fEO5ln3J7suJ1THS+ymi7fWvzJCJzHDSfiyIds9DBW03rWOnt/pkQK+J6Vt64+zFXkvPImQYJX6Z8ulCLnJJIaggZ1heO47x29OvqU+PthXFhOkRQrcQO4pMH0tufJOaRU1KiJ4GDOXvgQpFlSqFq04XrYrrjtIH7YcXnlflBroQIhWRQtzDu76yGZWcUvRm3dOkP8kZocn1x8vz8Xlr14QjkUJKp7L9jdT9GqIsy6qHVUeVl+vFOS8ff8ZcRfuZfh+m5PuhJjI0fVpFROPNSU+uYORD9ZWHl+wpLKtYJhuqoftEGInCYlk8z0PaOpEzG7YprjeOMScmtrMKbgmZLnXR9YYTXVyDKEm8fRHobjzXQRBEVqn1ipRBgzTv3T4T/0jrRpcIv0M11X2XutSD35oqr6GJghQxQmeXa+ZrMgjtCBhGldv1/e9bHb0jxu+5dYhzMH3MB0Ga+B+cXVuWx6ImjkktqAwVy17W2pYhBlowvHC/xFZ95xSr2LOiuAV/h8lS5PT8VHacTyGEHMvf1X92zRJKM/VDRUmd/TlTER9muv3aD4T+YZq2/WxN9bO17UennuoMYRGuEbFgj9f0JnYrtmIUSku5YFRVqWLXLtcMrt0PHX+Y3kaSKh4EEanhd0tkvnedk9ImWlbMVedjIyO8+bVa1BJ9xLSKad3TQqFNiNxe7lx3sukM5YfL/EzLUjaWUBOpFXpWlDdMpXOOs/oZBi1CSR85GKz7Nm5kYHal2dKSatfHtZ5psRBWjdGdjRoPVWXiz+Su5c5Uq63FeQLbUw7qhGXv2p8qIjJFKVKo4PXbZMekN6MCdEXcy3c2yf4aQa4VNBhCGpjYGNXx/rMhqlS2xyPpVJFrrW5L28wzvaZGXsZrnXvt+IttD5dwiCiZ29/Mz9U57/zu/9t/KUOe76F1uXQ593MfUWw60vXwsYhn1APh9QhtV9Utdav32p02hA9mp8bEDdvA0Dj/bK9BaXmV8xnIviVtvYfM/C7TX6Zvx07/e4+oZCDLX9Yyl/19WXv5T8845cy7H++X5X5nBOrJ4l7DpyrMp/XZol+3fn4fH+3l13bviU/WPNDdJ6M2nEvgOywne3E8buPufdTj6e1eUtuNG80RVh/XsRW/GuPu9QSRH2TkqpBdHf9QrkXdhWpkOuw9StCnIK8zeMe98tqZ9CvtFtetDpcMn5EVVoW29NpCi0ZLCt1U2SNKXhW5+EGdsXbyux0jloSqkKFFkUOOCAbGxv3+OnbfL+19DulBWVDLdN32R0KNon3ISqR94jhx0Txy0Q9a9W90xR4uLW12uAgXgpGEDkxaIEQYBOKqMWFZipWEIrPh/JLs4b/0F/5WuAZEFLiRSC1rSepv2i1x2znrwvFY+o5RusP3/uEi+4RYF1lYd56532dGPHcbI9fozbb6TCuoE2oinj8RoyyFRXktH4aovNOjVz5LQzslkWgJbegYfllplLRkRjmfFGWsKrYbMiJK+s7YdntEIdfQp8RJx9g8bQQjlpz4vr4vvu2cy/vLt+tXzWVZauRH5enuf+Kb18+Pf1Vac7dVjpYPtx15hCHk/bwxP3bsE7OEE9Y3ltPrcU/71d8q62laQbFKb9hrFXqp3PzSS6IbhRAyAyEEz9SuNzYEjrFu2s3KmNymcY1rjaFOedrObKRyJoKva63KNJ3JnnabrKoXhSJF6loV/IeVa5wiVOGnq1QlhTqmyVgLhriWa09tks0NKK6EumaVn2fnnONaWMtCip39n7pvfjOcIZq9zEdMZzt7OFvU7JSTchC06pY7WwYyZMjMR/S7GO5KYBChgbJtABmMfo/fVcogH0MQQbK2zX/nX6f8LfCfrqFVoGJDULfUpdZiVtTgYhlvUHxchT6HsO/uUm+JR4nlGnHn+ovzSd/VmXblaslzf07B8WwxECV2Y7tZF43nIwxnfRZ9qiofkoWV3pZrdPH6cr2QpakgGvpUK2mNw2W5el/7teY9fZqhz0hUT3vKgOyWIIdlff+DEO/XxsJaa32+fs73lLnm0tWPlOHuH6RNjz2hX+1nk2n3TPprj96M03s8gn7XLntwDq55ucS5fLNW29A141Z39W71rhvidG5aQxv6ZfGaeNGdEMdDes1N161b7RZjZs8nPEqdIv5uOZjtl9DE1W9Z7f70wDMQPuywHF3WtuuKZ9UVqcAQ5tg+btvxZugxfVbFRDk9Pcd0tczT0+ggrSU6w/GNtPbtvlKIfETuEN/PBh1Glsm6vF6Ke2S3nSPH7l97ykD0VRxDz27mlL7DUaQd5wtCP/koYeU90RNqZ826YSXDPAbCWWNuN0ZiNtTbyz1nBOdtZg//tb9p/1vgX0YHScKDP6y1upauO0q5qXGWGuPDeQ6pGlTflVQ/U5B9jozDzru9zN3v/HxSJugrl+3FuJaHUoJydQpBxsTCS3ThixAZCNW0zE/r/Gy/PFspc37fXH1Of7oUlU+0ij1lobZ3nT19c9l2zZu6zc5tnbG6hZ49jvzsN4kYsea1zLUX5LiPsl4W1sL6DkleCibWm6hE7u6Ozw13J6R1zYTsEuF5hA5FhILYqxd2cHndEOLcjg9u3Uq91nE/PU7jvp8J6xvOxaRYmlDvbtcHFyGEiOeR3oOZq01/FC2nh1O9ZlpNj1y1H32MjjojPCZGnUN0ErcbetAhctnzKdYbhRaNYlTTzq77DjjpcPk0yFe18+KOqVC0VpiGyXJyFuQhx+eFuaqu0m+mHxZsUeX6lJXxW4x3k/d59JI06Zwx99G+135rkkNrpBE62jJFEzuDMxPdKTIQZBawTQuHARuEuB+vB+PbvXV5GRqnCn+F6F90eF/NAAqBCFFcq1hL9Vz1jiVjiuJhuW/FaUWPXFTebRn7VsiwEJ7pTClDSlt7DblmXP/b20LEMHaoIaSChVv5ya2kBsJYQvkplJ3Ijqfvlb7HaC8KHmaaNO1giWup2hiIbcLSwXb3mp/zu1on6WldYVz0vBoZ22ij1/de9rTt0UPPIze+esYpfp5r1u87IyMqktzdySjls2cnTLtnptVt/DuhvwZ7s/fOQCbCgsyC7+VxPt9O50aW3uXoqbR1t6Wp+E3sB/vlY1yug9JvOxQa4eOE7fCUWTfeU7uSSs50pe5Wmvj74DYqsK1Y4YWcxeWltgefK1zWjVp/07KrJ7iL0ooUQQx4B1KL6rZ6x3R5W+hz8i2M50lIRpdBYM757Esn94PEm+A9WzXcrvSxTHj1QUrG3qsih0nbFInjNQ4nzN4i/a+FsMxzv+LCQUy8a74yZc1gs4CJXAph8AMg7kcqa0tCOvQiREIbvt9f+GP1P9U5vJNpOEKVkNR06TATrLXeGOP6sMiWVo3Jvagz2ZKCS0pQ7Hbf2U5v34feCEfw2PyTrDqlxLMI/yZQWB3PfE6wNOtFKejq/k2V1lYaKR9q/k6YMIbaxYBgeF33amfx2uay8x4t5nfd4VFo19weIuirTjhDVuZOxvk6cZSDOX+qnd1Oaev956i1MKh4Te4Wee/Ep3t8Wmn9q760w78Penk2lryDkNtbcfXzptvrXpEdEa+bOLVF7Qrutpym2kdr4jXWQmiyXkpjGFYCD0II4ePb5c6drm82blkP6mbNzJruzibQqeMzBL8KMbuCR0bJuUrh3kKs0D7jbWhDFNxosRdrYpySXiedY2acocZWUmtNmHqMwOiMHBnaZzwzwkMu0+n9Oiddp5Rg1YPAUsiu5u448fN8MSTji8Z5tM999tl3zBRBfoTg1BGkaqM74+A2mf3JjYYAykvLDMZ3BsSQF8aPhrxOZlGkf9FfIz+8I+OhAoIM/qD+RqOvO1nltMcpr3V9Xs5WhpF1cyEr2+pHqTB/Y36W3q7spZMy2Z7evtYoj9cuEUHKs6FQepnfMjeVVNEaTX4uK2s9e6YkZO+snvj1XBhGkYbMUWTGegyKcFiODqZl9tn73GZ/zrwWF4Umkd/op+M1redzzmg7VNde9sH8lInwzpWSn7+zFUniO2c+Wh87Q6q9RiqtefLee+Etnje3jogJps2pK/C9OL0u+Opx41bt3afRY1D0oP7DQ7tvbKc12ngRvp0PMWZV1YHOtae6xa4zsuTi7i/6EPQhata2Iz/oh24G4T0FUW+l7Zmqq9ZGoUPtxKDwL5TpyKDo2i2+v0+hz8rkvInWaeVDpDALKgPHugkfK+zqsWXT58vLUG3LatkKOUMvSVPEIed/4kQtNGZ0O/2v9aJTkl4uFW7Xx/51y/601x3NQJRSSjbmVtxPSrGlSwgbCQkJ+crX/Hf+dauD+2ooBYQHm7bWQy3q045T3+em20denlZtkOvbE1c7PxHzeshICQqrY/v6Gqn+90C7WNmu+jilfEzPJj4Wli0+r0dFBXz3ZNXW9kS1PVWZYaVH2ufTvvTGeKEQGoIqgyjkpZ1nJ0T9LvuE1MW+8263Tc8NSbKT4RjJ+TNHP/30c/9/e1DuL+7czUmn007lSEKQ+/rjoX2TNF90Vdv8TEZTDTGtXgjr8uwd44ewH/Z0OzZhP1hBvG5O99OPmU/vufvlcnJubnprz/v2TZ0FgRdaqFUM5tgk5COEA3du1ZpV6yLejo9ScBvDpHLXDPf1w/sSqs7SfWt81pMTSsbyKPicUv22/OItSaMGHLJUi9h1/VKGac7XUVLIUTX19mSlhy/jco22o+fWxZUJw0luXiO1zwurngUfDOm4fRnGMX0xv5mkoe0Y9xlbqimC1HDN1PSeDv3xLuIHYmr9MCBJZpm4HGwwiKvQr+1t2vF1FEnyOqQU/tH/3xzcL9hloAqTQuJ2jS7ZeoLLKfPPrUwRr+dIt+9fLNPLxCIWd1WYNPOz7urvfOjaj8kmHfzVxXOfEs/4RoiWBXHHKcLxl39qtIxSJ+DRmJI8Cd90RoepiOtAC6ulXUshI6Sk9LL6YpmrB/ogAy46Ronk6m7T3WfH05beWsWhh1Y++2bfLa/fJLyT2T6hXz22fytVlxma7jwmU++H/aotwvyY2N1wP3EavzzXWqxTiKO7R/nq3UfbuIspI2wovVyb8Ara8NLKx+H4dvBWfW5F36nsqS5OBdMUeclHD1pZHbbmwVu/DP0iOAgek8SE/iPWmrrx3FoLoyJolCWoe1hEqvYgu7vYqkac4jJUojPSrXWkdTAJTq6PkZm6WVXBuDI+sfD5hlok+T1+RSJ7/2tHEJnPF7X5B+fioNWUSiNISSEQdeASLf1WrLXdyYqUGCDrPGAAsbmO5K2zjVxzjRJthL584S88uKMJhBKEJAKfy6pakVW1qmtcT4wZhGEb2evLWYPvJdhm1e+6X9vsa11GG8fqZDle++LTxfG2hGoouIW2lszJ1P4oXioCg9oqnrO1oITW/IaumIVxQYWSmWYoKu1d29BPpN5DcJrMe965M9a4coqeVyfZyO+kxZFBncwwPzXt/vf+7NnfbS/Tzg6R/u7yWvKgv5JU2s6/ZCoWocWYm1482+ouRXhjQqZp+0LO6+XyuuPEoard9+P1Pm7KDXvu3vM4nUJrfzADxnotrUWGb0ZaRVCu65fjba+7qe5U9xi6pmweS8oZ10tICZejo/uZwB0iA7qS/iN/+UQVP5BAChP+YalDn3JVc16sl+/0+XmU56EnNacKZOCTtsfuJD5GhsuN5JdidsdznmAVVD2sYBuFKHvc83oZiTHjbLa2+92x7Rmk6gRhrh9MR7rdItNSVcEdwqz0F4bFpDQhP+VWXIV+jV5sfmJa8vU2sxV/rHFwv4BdBiqEsDPDTRXareUmq+tuzKW8TV2UCzX4MEcGFULR3xRrWWrVS/7P9/9kTPKfViPb1LkfJeKXQcS3hPteXFbFB0pom/LxXrIiTyys2Eng8sumtUEf1wOVWo9SYVkFa+kYma/b+4QOuWAPLyPY0wpHO0q54z7yQJf1Y3LmUS/JkNTJ90xd+5vXint+jBT9f7QRDTsj2l7y/mU/nghvshcemo60k3O8XS8ERduulTI+aqip1x73D3zrVTY09bq2D4wNlUgCUfWLi7K1uJHtCsOSy7oR/bH8PT63hp6sLGN9LqyvM4R3jCKGxUC3RaRFGVosUeth5X0ZujZOpaKy2jBCCz8TbQTj0ps0FuVvLIXIGDM551S/r1vXXsgLn2kpDBahwt5DMiIRU47NxWFG6aHLiaZ1iE3wI64mRFnMLBoS5qWrhxNfDAIBmtJ26dLRgby9oeHX1/eLf+ehXZtz1pwhEOBmhBBZbayyuhZRf67MDO4qynmUNkf1KTYz5h6RfeveJ45rFnf69x3TaeUMk4v8/5J8Wq7G7zz3I6VEPANDG3YNHwspwjervXY5Fc5+0n7T2MVouEq5XsYMhajKTBedhuN62rZjg+Vgwra+rUWfkBOxJckO+iSz5/xM78ZdVDtt9fx4qq/qRCUTur6aimHW1mbSSreG0Ghov7zmHhGWY2uMQI1gy0vg+7hZx22VcpSt3FUep9USU6ysXkt6kW4m9X7Tag4tTggBkZHx2HNr66o7e+TqZJhwj+hpNqXXjCUumgdicL2I+9zrihwig+ySLXTKqGApdFOhWBG9oiofzrkgqplTchR78Gj3zdAKI5hbi6icysdI+ggqfs4zdcnHx8dSlqm2UJ3FzmlzPO8jKl+d52Vzt3M00eF8xcvZaISUe01Jk7eCy4T5nSdAFzItocjYgLgKvfQwEEEQWj0UBAWF/9rtgZ2gBjKxuM+G7aiSdadQta46IcoHzhKGEm2dL0enh+WqEKLcqe4oazrX5Ak7oSbWqKzn+O2IUUiI596uCjQhKdZ+8amRHCsPktCztvet1ejIHMqYacRteilCoYSHg8ztbpajXfHjr4Se+vpEnIoV+h5je7qnrTq/znC37bXqqiRPJ13SSeSLJN9O93faXqvX+S9N91worgftPM8j7CYyHdJN2HBa6xtzwmqVeO2N24OmZbWxaW+vsf3hQp/Xgo5rQvr48dnepXMUl0rkqBl7OsRd3Ad7f7gf77hKDdwKd+qwV+1pQgyt9GKqq1bUeOjEs8P4UH65EFNdG+w6dC43HheCGBgkvvykF0S478Pl18+uZgkfV8Hy8riskRlVQvalYWKOl4ZojB5SM2g1RQcHqc6aztb6vsI6Y5GqOZh7TTNJkHOJMLd34K1apiBfJ84hfZG98IW3B/bVFNRIVQlJPiEynhbrvULkUhibMTXWsn5d3a7S81YMhdi3xM7Ffju20XJRxyeXZu6TunQ53udDIRFRH2a8bCrZpBCkJlPbwzWGVltay5Z2eoKehEK0isxhz/GJKANn6SPEwrzrh4vA6c5pffXscUiu6n5cpbmSrKM1NM54Nky7mZ8xdUd/4+e8hUydDw1fe0Z19IN/EXotqRix3ZbjUJim2ELYwxKs+Kqn8Gh+a7T0cTv3uD2GTOm93VpzhNdLYShfzg9CILeuc4c4ZpjovqblfODWBZtBf+acE9wKHJ/3NXS8ptt9vzOUvOYSlxBLdm1d0lA2k65IRdm6YpfFk5ef1XVdutTNlmC6uEhI4jqM7h5DJe3dbeVDWDJWud9f5/TjdY77+PigLZa/RYIlVLLL/IKkyHmO3O9D28wWzCBaih7k9FRft0yM2ypDeBctNEQ6faA9aOXiG4H4nXN/DXXZSwiy4STx/RVFDwf2C9yQGYv3ifDxXjlM1ah2q/3uurzv237aiPSo3/BVLuHcZxwuj2P6nWVXJndrjdHJ9n2MVjwzoomYfncPUZ4h3BA+LLcQp6vcYn4+yQpLi+C3RHntkKnJLOXaqtKc+fmwM5SMqGDrtm7pefeBxNWZ64h2qruf7aMH9PQ6RnmCdsYM0xJScYpMf3TjK6FiJi0f9r/k/uBilD0IPOIYPE1IX7adCdYp57bafvC70Y7erbPSsOJ9bU4ewV6r3Md16tahDSF8GALz61a7U9pbcRNHqalGzYfz6JW97WJM2qKdqsRjzKDkEOeM9Wexq0xZaUWu5UGh/e69nnutrPh6jqhqsUdrfqLGITzR6L9nSCulfKJneDZc24MwyEDXbEz/NIsyWYXFfwnVTjJ87mHU+8iIzjjfcUXOca52W/PcredBs5ii1ZoUt+owUiNalBhXNLISuUBXJpi9uQG06Wl36Fk/2sr2Onztn+8P7AUzUEGwz4bwZOhW18qYBb1HP+eIGieKm7rqnE+UMzGZXf/2wxLHsj7/J3GVx/bPScZcTK+llUsxjPJsDHlMlL0wbMbHvdEoqoTaSxOpmAl7x0kzvO3xCVrozNDjE0XnIBzCUffJ/jLvgTt6bhknbHpyed2R/Sez772q94fizEnu3Idq6P5mQDJV72pqfyMqD2UQdjBerxGkk2fCXoRFiOWNpdl6eRvnXke9bVvtj35Qbje+0TWc6xxcPTFpTd0dOWqV9mXkI5BW+15r1z41VXeqzaiunvY5pZwP6h7K2+37+myi9etZ1/rDQgqvN63wR7HUulNSPlSoR5avY1eovdYqYus500qlKbatdjwu2vdw3xk6IQMSnV6vREpROUs6w3XfPrleopoF99i7crKT4+UPy2saL8eYIacL4RdS+o6TrfMQdF6CsBAbn3d0k/CTtAUis2FL3Or3rmR+bYLQJXqC8zYz6M9816RdXy5FZCSfr1IIT4QHa1X9C4pWU+7FYW/G8Hh5Dtws3e/R8WBFrdY7coft/fmolLbMFfR+6I/N1dfmFom4AklKUII/7GzCfglJ+Ce29odlfSza/8zpfZMgZA7GjOKCgT2ltuNdWw1xR/0ubL0Wdu6v7W4Xey4RuNA5YqTQMN3Es0er2mpL2/pcPavnLtFKgjJ76qLS7vDMv9jzoTfZltfJ+wmLJlzCQpgeXEKkra9WZ2nhpiFeN2q7I0anU/aAozFdl9bQa8Rf+lTVDNUTZVXk1oXkxt0wVqbJ3qb747FEx6RFLbxGrlOCTtxpMqqO6gzhCEi1IEka7eN633rzr9ReR/zEBcczFzPHnJ+Ja+tA422c3u96N5sidz6hsVfVL7VbDxFlBVtYrqd7ZQ5PmaWXRaaRYzjn2GdzzjalLofSzFUITbue2o/bQ/Rl50d+PHm5thswIG6F8HKOL4Ogbi9D4zT59u1B/VEmzAYNZLawPYSuWLfCUkS09WmMc8rreD3uHdjoL4fbzmqpN3W/9n3I/B/bGtWxaj6Rv5pUh97wfovh49AYwvbcqm/c8wWPgvZajAMV6Vk8niwxq7XPR3AMBNL0yExrBqVqsa0gSMVnuVj7fUs01j8s4vUMjTMSHe7qmDHMZrbnMttsz6Whu1J2RZTZs7tIUnQHgv3PsoLc/Cs3z9tDrhbK0o4dVgeWk5Nvp0fZTmk1etx639F63N1udXr/0HlQQuvLB1qPUrPvQjiEt1DcS52n1VVZ3TUtBPncw+dUM7Jwuw5LFcQptKDIYP2BtqYiStGWlNg+VhnFqk+OZ6hcXWn1jnKf47xnrEgRoRlaaaGV53mwjLrfIgP9Vk68n+dcCZeC8rJefIbA51m/ys/OmHTGEInDZL/b5kG65uIgEJYf3VcQPoSUoWN0JrJpU8kfECBApFbL2u24FoREJLTh+/31Vd8/qKOEEBmaxB2ptydI/FEokd/FH36tjrYf7IdpouLnNF190zP1HsEEUYTd7uy023sfeiMfXSmOzHeEp3JOI6oQxMchGMf6RaZwz1HkByEoRE9ltxC/W4ktbJbQSCtSlVCUQW+GZt9Kk3LefTILx493BlewI6eukHXunv3sOmm1RW/EXa2ZtjMz/eYliVBzTfhGpMic/jOkyoyGaBNz23mWByOemDfFBel+C9vb76NxlZrcMVSqghDxGIHb+TRuU5a2mqCNd1FRpcX6AKuSeylTU6ry8+6aXt2LSUGpc2T3PNO96Qm0H8YPq/zwXfeKk0SFviqyrblidK94DJSwyY2gReouFK1Y6nWENVFZP6qmiHCpwBjhG6HXpNdtM2ekCD8Psz/7Uuenc6EsVj2IcpZmS2W4W+0tJuJlvrTPM5yz9/lVrv0NYeavxHZv1Ue67GrxZgZzm15M0r5d5z+RuRVXfaCRjyFnkNfJGhfJ84N6gZFmCOoPm9zpEW6RVJe5wrZ96LkV3xf6nFyi+/DNHMT0ewSHoDwo+rG5PFl6Y3r3St9zaZiJ5w8Uhi6kCRUlnVC2RH3w4ZZYm15J2E+W1FxBxOWaORDXMdOKTVMqPhcp5y3Dsj8I6x8r8XM1Tt6h7b5h7jhztqqlVA/vK5EoybQ6taubVEiqmYnioh9scw05d755fu1N2HSEEJhg8Y9Yabtpq7RbbzUtubXt3UvdWKFet/s6rkU5uhnt2uKD6RJ+XqJmJ3fd+lXHJ+s1rTyD28PH/eGDj1DzcStr2hlNlfmpbsZ4XTUhVamW+amTtDTWwOCI8nytImqcUtVqtjaH2vMSh0daj9YZaR+3LQ4DkvvHW4dLwbujtvRUIL2cXn9TncET2QlipWNIicMSMlbRzFWXlq2bnkVT3/QeTbBNqvbnx/3qNhEsoB0LMPrARZalkHwOG4SEhHC+1qeD+nbJhJir0iV8c0VXC/lH+FJuhpnyfs8Zyr23RH232FdGiEU4Pvdp2e41Kfo+ilP43/tfY2glPkYTqSImNgVnoxSk0HMUhmpt5TxE76Q+v9uX7iSf5OsernEbRdyGwzHis4LhkMa85Ypuc/9wkjZZkRO0eHKazdpms5zhjDt32vvj6cTs+6qr/FiRzL51t0Zp9sSNLEF1fRNieOzp5XhDpuPQTuxvsfgSJRtxl97OsojlbZ134+RZ3+0lGmltuX5CoQceBGx3psqpR9VV3zsm4jbcD+1v5TkfaKMm1dLNfYXHZ5qy9G7aqoxL67uU9n3FqvpRnTAHtoiP58rBYu26Va5SKUq8X+cqHEJNuAwU5kfFdSAqyekcm4afCWKFn53kBRGUpRbLYWOIdHP7gsb02sUcoTGurb0ruug7hBk0cegql87Hqv1KvMIY1w/zk7Z9K/my+cqhix8P5fMo0pHnh/TtrpcZvYIng43nEZL6m5BVujTq99L/hGdOGbcX7fhtNHZss6g0sW+JEuZv+nusMkJnt33nyqcj59s+BkMwJwJDyYqbITKfFwef8gUVJKJW5EzEk8iWSFjBkNYMBJ2mXQuHcDjI7K9znwtRt53a/AYZXLCnNVccMWOGR5wGZs9mNmZ/nS4akbryTWL27TWr4Fp7CVyzA7HXZfVua3eQboLVoZxfwmnFCe2tT3W0Wtqb+n27nc9LT+JU4re4XtAGrzRtUGQn5ON7eatlwjib3jOlR3edhqdhKB584q5Bv4yOGo37EjTEye1R1mioqVpp1U3RHbpUaOFrGCtSZM037Jbec+mp1lNRqysTIToyMro7dFxbM2tNrnkESWWO6pxV/Xy40g+DuD7EGHaSpjgcgxJXrOCwNikzW+PMLdqCbPKWIMUaKRU0tz9n8hbaxaxwu+8knuxeKLRfoGeWaJtf4Rte3B7QH63gkDTkybAhEPYialbXnbiff9TWrLq3LLNIF6WdG8GxI/vriLId+9a1r8323ge9Wc4Hn1ZmY/O8SvuYGtD0Q2oZ9sE+ZxcC9TgfHGsLpzVQOen5TVpt0drvVn+tSnv+FfSN4luHF8dB5OEgHKR3n32r4gQ9bRKk4erZfj6ZoaiaqaEdJkmgzjcxlR9LArnWmAbxPjQI/UMQ69JYjuk+LOch+6tHj0s/qtz9CD6qEyGwosTrreeppfSlfBkY4Z0tCF+q6k51o3popVe7vd7dJTcpNSk5UuvMnLkqZNxXiDe47VdZbt6RIVD5lLUy6rtacu85VE1qUGg77RlvWTjqKjhHyUIRfn3GNCFNRtptti1aujIE963xnnLN89A+rQXVJDixZBgsIp0zhSlnG4ftGPdnVWPRVfj2cqZP0FVT2z+oaBkyEO0L2IW3lAnAlvgobH7RdPjYFxr5eptZnZH3D+gIUVWRDHgtHE3gCZnRPbUUVtXw0RfHh0/8Q7mO9vZkn535TTwKst5q+y4rB3Uqe74nk7ETY/M5pcxaed9Pv2wMFysr4TVwMDu9ZglX62otJF+WFSUR9Kg8Wa1iwTAIAym3g9hfKRHKJRw87KAaV13o59fPu+J19xXKHXfc/Tr7+uWOv4w81a1p1YLkayMqNlKh6LBnzSK4COmOGPEDneZam2Oealenh47G3RND733Cxu1ET7ghKrzl63oljY9mxIeB9aV9WK5RDmZ6es/jtXHrfKRGf+zt8cMxzFi2jMHWWNt5TyiSOqrnlin9mycepCQismAUu1hucqg6MR01er1Pb845keKTNkkuDmbv3PytA7cJ47Ls2X42T/V9I8cihQV7WEgqQmGa0+skDe04HkeHILT+0u1wop1JV2lvvWkuoaNqlpmP7gYGCmHAXL/YBrF12WOdHevDG1p8v2afH9ALCIyaAbvtuciISCHWtlbXKi55T6E8lCpnDAZ6uqvd7xkTs6/D/NxBz1u9szE4rXov+O/1ouYf/yd/9T+sc4g8gm8fI769ThA8EIK6UOxKFz3nRylCGpHPKdqdx1rv/yypFIyiEclgWSvlIvU6ZF6ZpmHN5fWCfe+5BE66nx7zM/eey9PN7NGi6Ou9a17VdFNcRczaN2smt1a3QOxYhOv5Z+1gPBGYQONtcZFejvb350htaSl6Cd3aqBvVwu1trJbzl369pButzEKg5hAvKepOlZ5r1B24c0u+uTZppotHm8U0mZm1KjXhvn5YGdyXelq7Y0JU6GStHwjyOWSHbRQKLWJfYmPVIyKdy+HEwq3rgvAoQ09INCk6DHttOp+poaMzXPW66ktFuiAfFiwKqmWM3Ra7nhJmjsrLeZ89hvOwzz1bh3lIDxYu31rQNXZcpyaI1xma23xNRICQza0E+yJxfWt6rkU+R0hIQRBUxNNBWSS4IZK9sW0ftjtEdq2qeK/x/tiPuYWcPiku96HNZdkKwYEUj8foyZU9KWusvvWne7LZcylzxrPQGv3BVu7zO7ZEUZt1ouBqrMiDpecMIfFEJXG8zmdrA76nwFgUVe/xGSqIuW2fqPfgssvrKqFp2hEywqlmeMZYw2y/nB/YQm1ffzn7tnQUqtcINdmTbxNkWYZ68u6H5ZiaNKE7wuLTpY+2WhMfnmov05pM73Cr8JGXU/2yVFAaTZ9Xu0YQ6cPVVqHrTHcMpY4V85Ss4Xh7fxT+9uGqYnWRD0PMEum879t05XCj4i49OiKJM6LsIBUOy3pHWVj7j6uqsjbqGSWHCcg4MhnSQWtkELT/eB6N20kukiBm50jxIaAwIWx26IjhQ8bUMS8iRAhxEFsjiDKX05Cu/blN2nKNfRnXpbsJQwsMGAOI+2fzUKuQ78PGObd9kbXi+6WHdG3ObSkzEiLIJoRHiPAMjsZ3tT617JzSxqo+pfBzo4ttO9/7CmEJ2xfj0sHch/IQjTIpl7m8+UemrvEIonwcDhnbV/5ZxAsSyuuMxf7zXidSiZmEqZw7Ya3aljNTma2ROZT0NDjlfAznPc+FchH1ym9JY881dwkuf7lDq20RZzzkzN2Rc/KQVDl+nsu9y2sXUvbIA7m3sQyu772CxrokvFsox6BRXNr6Pj4NL1vvuhRT/L410PTkcauyWzrWqydeoS+FoN1uT64WNcq5xYzttY1um7Rf9pueQQya3+vHD1rgOix6k+pTi9qjRq9StYlMCaNuaB+7wgmldnaP4sJQt65R8vupCoiIRvDqjjDP6pythsiwPFa73+8iIe7rujysWJdudzKGa9VlzQRpHC/3bBxX+o7+VxAsfQfZv0OJZrgs7dYcHwkua+YtnENkbsX93pgyyT10I4iy4STxFSU53x7M92SIihkylt7w8Z+c6rVG3ayK6c766yqUCn3P2U+bbuu+T4eMlFj7RIYS+9p9TKRbxFB99ya5+qrpjXvWDTVFIAbEuTE8hDxn49QLupii3l+x11TpYi1lN3aK8OmNjfWsv1ZT0jCmooyChXAUwb6HC5vMyQXL1I4WJ9EP676cq95WoVClJUG419xFi4JyKjGhFSZMvK6EaXa046LEMazuYDqvX/a6yt3Xe+hRU0xuhFaDEvHatZwYRc5Q7uM6NR1aeFdVWVTbV1fX1XOrRE773CfeTm1Re38oeU4396qayLGka4roX8a2TqqiooppvXYZeNjUqJY5xLBazNibtbXhrrWhq8o+g7MeUz4GOgw3rRRDJw9+tpP0po9zkYrmkZHpwQcKm48s2s7e+QwahOS433EQh3voQxrRM0pj2VKqdcm0VC1ZXuvzzsDgvoUchL/TbwGZX0tHHdKRXPsOy2P4mq23B3MNvcpUEypICoRHeITn0bcqf68F9ddWoAnrtfhSVL+nO2Nvh4dDxnE5HvTKb0M+HKsvJiOOzf7nbX9QPhaJwNeA+vKa0T4MjoW1oSdN6amEkzFDyxNJxMrPXo5V0URTCVqF8OAQHC7L+NyKXb9wEfZkrgtx1aWZJ8/1tJe1z5fVvXRb1/fFzr1vm1CcCnXK7OSOkTtbPOL1IkbYIbUnVwe3dQlpiI69t6zUx4ccJb0GXaOtR5tV9f5czhv/43U7Mctt3Q0Jyn3d8tpcqvxacO7q6t+umjYyXXzgc8Yx1F3oeuY1nhFyXVzHTLsqTMKDPyjR8raDIJmUcGOhLH8q3mPZhTMcMfuGMs55akWmGCMSg+m2E0oH3va4Xt/gMa2fWZUpuW6bVmOpIqphlTGm2m0Zs+/j3uPL6JoOGdKlZopmLufFQVeNdmUI12eKsCPolnlooXuz+gvIvlgE69ucKXLeZgbBzy0HcyKtszRjl1lGSkL4+LMqxZKtB8fOKV1zqF+9DSOsR8k4Tru2333sY3vcj2Gs6ruLCfI5n/zVn3ftNdamRYgY6vExeLjh4/CaXNNR7dIq6TZNeU1RTdJabf+y/Gs18ayYaYjFWG8FqYPgeOvC6fw6fauw71+njp+v5S9DkcfbgSfj+XcPw0w31SV1SqSKTJTXws73N+5bL+9ji7fRuS6ZJk4Dc0EWR39Tx463xXbfhDg39ctdcQt1Vx8yNENjUkzXvnQmEXdcNV1VTVfbfpUkn5vhxipGTH/GZ+j+p8Nws7T2Mg/HZ0jfsyui+rqIqjqk1zCgLhMtbhFrO9delYcq4rxJQg3O8bi53EZnEN2mrdn2sd47qzN0G8FVLg+Jh9tSbD5bWCzSh4Hy+i/IGSOnPc526hhnNxw6xS+baEEQKrjMrg120PHZzXbfnr6cBsDiKiQwPbYPP7gHvshzaCsdeX4wv7cueJqQBx2C/FN4cIulLCrXX4a/bm8rUOhG9UwTYllNhaH8cL4TD2Uia6RyNduTTZ7s9VbHUF+G4WNMiy7Pi20Qcr9QeG9rp2r2hkRYS1is/bspztxrvWS18WtjoLFnCur6rFcRDuXi2MdroapYV7m87kzLSV5ey5NyJp7mjDM8f3b5MSk191yTQktU9DIzCXIh6EkeOSne0O10hBC+9rw2PqM+rdJqlX7i9L7stGpE423VMB18hHZtWiNw2Khf9lEsdu28E2pN13ZJPE003DVBQf++dQjdDqNCsGa5danGXp/wTC3TIUM8uaPkBn1JZZmWWuRreP0Uk1rN6rQlqitrXYSPnaCjc1RCB+/PlnAqOZqi39orBRKmZ5mqXNvrmfjiWUQ0chC6/vZ5n8uMLuY8Esw4qaLnyvT1qhepqt+mI8Pt70XPofScx4ABXYBnPxAWSuyn/HBJaBPuSx8O5sR0qyKxBMOTm4wSAYFYYVWkWlVJcIqaZZmjQp2of7YvMm8I4ZB6j/vR1+q7lyEfTalj7qtdyHvxinVEPhiamI/tw30UzgdRVFB4jPIEi6qCI+uMCO8T3iXKIq5BxzWhZKTqPfKYpQSe+PV6wUbgIuhPP9Pa37nj/7Ntpa57ZepJKT/WKTKVMTmRbQnCFgIRxPQSrHbesvevvdPeG3ePNxqin55yu6WwTq+/3Wq/1FqNMymMXghNLH8wMjiigltRV1Q4dziz70o3LBw4Pqqofki0of0a//UultfVa3VkiGpdC98XDwTNEAwWWqT+LrV21lVdb7T3KE45Tq30SEKY8EEbvdKkt+xNYgJR/fNsKcNuun4d04+z5bCHJauZZTRiXtEXIdpmz71bSdF4wiUOijxjv5yq6Lj9xg8vupsM5T3/LTBXARi8bVNrqHfRV4kefEmyRkHcnA/kBUBgJCbHEs+uIRpludu626bH0N2uX7eDwrBVM+93FcMUZD5IUS68S6a4VF+ZdNo8elzXo/I8PTp9ejvoXen6wLuuA+9i7xOBnPC4+2XatHoX/79D26tka5GchNEsns/j+WDVW/nhUhOzOT614ofDHzyftqGXtXj/9H54xrOnD9PjyjzT49gP3cHjmMpteq+G0DZ7LSEne4XAteab2WstoWERLkf96Ff72U37adtPO9XeRdxtyqbGh0EXxTzIWLrb6+zeX4yud7Qw9GJ1yZgbp78u2w7907Rfw25ISvm8b3jw4ZAeSonrNU8rmN1FVQ1GHTkKkimRkyXQk9oEeg732LVWut1mpmZuuXMrWDIfkUp1koIyaDR2PMcNe2mf3Cl+IogPVkF6scbbCDohxeKM1Kq05xWJk1JOiJ5B9IlLr01KyYTOMXvhGr29HiLDOfbR+zxPGUjUBXOaycMKIdRB/EBCQrjsuT2Qs3MILFMHMM+ykBQzRGhx3vBue1af44uwdtKuxZ6hbHBEEEcbAoHurWev3ndb5i2fI/O/RsfY8ezVfuadVBvf/ebSFT2ljiEW5Rbqxb1L31A9Sn/7avtz9DzYIbYeqiSpLYaDjBTKnFYVrKn+2wPP5/xxLWZ/ysKQmb7ruI4ZeJfHp9/rvRQR3s/T/Tx5Hhs7lZPxrCeNvH/BhZwxudnx/npGkB3vt5BtrdX2U21/lNpfD+L143VnvnQPO43aKOehpdRbKe/HgE4xB4W1c2V3Rk7I6e6DqyVNHyucwcM+1ymfj5m5emtWK0OI4VoudlTO+CLrPVvPhV2xJMU9uf2LtVLEG7V3dWmpScH+jBBs3qykOOyMKEO1ZGAS/y7+OXI7r6F9c13qD9JrwCprlOtJEgY2y+SC64TY+hnnKaTdtVt1Cs28NO1c6K2vPYa1Di1GvVwOade76tnb3Pt04G86l2QkQabY/PBxtuVlFKnh892BHJkoEwyEsdkEhIoISrzWWstirfa1/q4uB+V2I/Q254wxm+Yyj0/jrvqw+TrHN9VrtVhXepvO/HX/8g+Nr8VhRX/jUFB6uvetIBAJLyFuno06Zt/wW/Q5bvdtBdrQn0q23iEe18dEfbxd61Mwqc2eFlbpasZmT3ldG6LNwL1TO7V98oHtw71T4nRy/XCaClLXEMhpixFcSGj2PN5ea2EvIbbDrdNU9VHOn6KTuuv18Tohb29/YmEpXP0NOgMGuu79NU4yNnU+/jpXH5LpvTLcQnj1wtSLl48MWkt1oFxJG4UNu3hUDC9v0XH6Cc+UXRDj8x5jcozdMVGf+njNqJxH57QQIgKT2KJDVTFDHYx1yKFaqR43ugkiIco1j7MwxqAMFBbRR7Y0VhDdwRwCqXMfHTpFijXl7outEbO0134JDJL08pP8zEjiz06J7JNEaJFrx356sQepPj+QE3QC34Bqpoh0+d0yrBX97nVrt5m2jZziSB+szSj9wOVjjMzGI083vglF0SymLxSksL/q5pn6893PYAy6tx26IV7ogmSK0hQEJkU4mJAjkyT2zYcjsfM1XR9BQbGwPJjUfyuYzMKqMyvogg6hF3SxE5nXSg/tDvvM/cv5djp60fcPyAmZHk2onFue5e21TCBWCELIkqNfhaafrZrf0fj91U/ZTg1OvaDcjks+M4Lrye7m0DG7YqJzQR8M7q44c+fSnR3kMPtEHp7+xY+aHOw9QkygqZAu/8WHp6NzVM6qMvSm6tTbmCxMviZWc4+YIrqqRPke5epY4zMXlx+nyntB2rml2sdhkDmpIrNqrXk4JQQd6zPt2lkSmQ9VlOA7qrOSxU54ChXitU59s3QizhhiNrlj1SYIgp727w+rGyfL9UJDxnX8bNZJPdOfbMmcsdaZG3LNvfG+rU7IzYFcL0chBGaFDfx/bYJ6/F9Jea3FWjW5HdTAU4ZwE89jd81GaV133AR0va6xj8vsW+1KufXTjjv3Psxtpp3tu5N2HTfjuKB7e0GVjou4bdWwh1Ds/bFv5Z5PlcKuyhNEZYvVYjtk9GcVvH2KqSwvF89s1Odhzq3fj3bKfWdmRvty7Od5tHe61rXgWtVGY7n2Xn3H6TOpHeyM3o1A2EuY3OFCIHtdVri+rVjBqmqOxmc3betp25neGhOhyiNCnpNjzXPyKGRujEL8ugsUpQ/XNUiXCpOM4zWtsHv6ZrL+aT980P3LaNQOwwvNjLDQl+AWf4RmthhVu+WSqSATR1mYjDFh6qpS1TP3NiOvZao9LyGY51MKR8SlKv4epLzuntle77ojvB6lzmKlGKwhI8UYq/yGJ/kDOTdyyhsb1VPspiGcoVrJvlTJnP4DcJkur61xEIewsz2js1YE/dXHjKQmUTrW2bE/5YaWr8w+P4znnXg9zSBkiUhZ6oQSLWJgr9er3/fpk97pENaMY1vp4Gx53uOOkvIaHycVpm499vbgGLzB6Iwv+3Nf3TV7jKfDGP7CcnkdEiin1drGw+u4rRdfPwexSi3a7Ba5K0JnJlIr8LA86lOs8lF++Cnoz/OnmC2cddPQ257RN7x/ekc9HrRje/9APzzb8zxPDu/A6ulpj/AQ9tqzsiZeQ7xeYglZhNgrfLo/009b2n510pzHX0e8Ru0hGno73dmHPBv2OE7nrQiro3P5Zfc6lO4t196JpZP01pI+LonzrfX0tWifbbfoS187fQmr4g+zpEZH1DxtH4VWNQw8gvTSflgRNZXsg1Nf4xl4n/fner85eWvlIp8gH6qJRkeqWEpMcfvIe2oq35qr1SebkESsKaRdy5bdtqjEovqpn+vaipJTj2nojtJn7xd9ByFoaAWxt+4Xv368BK6vtWw1n+ZG3/QYSWK2HF9GEOogIQVB5ETcnA/immk5OWgT0dywhTGH344uUnu9e9W43WOMYuNR9MStHI4hn1J2ogRxe5VwZLzMz/e6jtV3ZHqufa1eZq+9DOFvW28cv1h0hauUu3CjhzAUa1Rs2qKVnapr+8JPtvTnZONEQp4BqQXPpyYWDyaWOnGm8nlcG+PTmaHdNjKPxfbhOyoVyB3Hio9zi1s/Td6BHbPW+ocRxCaIbRCvK7BlCZ/2S/9oNdtHte3dVgtVskNgv939HDTshlzeRIfytrwtg86l4znJO6PZMgjJPxqZG1rot+2tVYF3fb7/Zr5W+ZgaWadM0MtZp+t7VH2qWhvzrXfL3JiYp8yUSE1E4UMeOHqZud1TNTNv1XWXs4lDZpXqEiWwTeg6vqc+aS3h4111xeP1seUDYzlLYCAZamBrmVxCzh2Nk1BWyKca31vCWaWlYzrQBZ3Lu/cTx6IR6EDsvWVtd91uq9xnjwoF+cFOboOsFUS5OYjnDSKZu5mnM29XqsUVnXS//Ij4yzuc2bbqzJDZML3cBjaSwlv6mETvMBUodt6GML7Ddeevlu2Msli6trcx+ss1CuOAdORpwqWdbsHjteUgvtyn/10Z7tNtdkQq2XHnK47+HDvu7zK6PCzM+tRC8edT07840BK0QPtyM1zrijukfHZjk0rFHQaJd4eIWj15/2OL0/uJ1y0ErrWzCGsJex1Kx4fyCLU48ttNpeV2ltvz9ktmOy7YWimdwkNnvHs7egtF0RwqI3M7mYHs0O3HnsevGlLL4035cXpa7fis2tVeeG6/42npnyP3Jweb7Na1d3uLiAjPEKwT5hIilp5zy/FhyLV8F9rKLI/XR1QvvyzIUcqpOddpd9yrErfuuCtybX/hmSzVvmNd0m1kjwRWiZxn9HMJL0Fm9zNtWJMufYdEb0XTozi9TkxLIqtb214HnAebZ0jQ5eual8HQvtyj2Es6UZZ5klBE4vP9QTwfw9jgMtCGIjsINYy5NmWdY63qU60rhlQOfZeD6ubzVPdcCsLsJzHa622f0zP2fdx5F6v/ZrrbvMY/VfDsynPO+8gx+nG8OPSH64JrMN0Qc+iGvhisFD17y/j/1Vk+EeeW1Gf0sOw2M/AXe/TPWEPUmouFhYX61JqsOZL+DGhxypiZp2i35Xl4Btqenp6+Vw8e8+w9z9A77/AQgXkSn71Wd6DZ1iLotVYQO4QdUn9VnqY+bfXic/T3qN480QvOLTZ3P3VCMcR5YZTOg/5OEp0xJE/OztGJ1Tk5s/o6gtMdsTPruS/UrKD2aWh2xn3psZjc7zHBhQ5K273GwPhmbkyy6RmZCzd5mMLmeL5V7TLWO1fN9JhLH1WZ4bHt/a2TEhPlGXHlDe/dP6k7ZXktU0Gkh0hPJf6bX0p2Gx8n0uOx+IjOUi7SGmLrccoc2v3nkGoHR41lJ5RMO5asFX4xH40+kBzdD3sdZbr2Vz2QkfzjhByx7H8e5MtI9rwMma3nB/FLMsYQmyCNYD2MsaNERDdN/ay8KWOWaCk2u+O6BizndYxqG7xvwud7ob5h9ReZoTpdP8taq3PM2WTO1rJiaxfj5f1YS+EqTOF2+szAXNV+22fv4CcEWraayzE2Ld9E7WSPdLIxOpupvKzy3+WZzlRMdHVEuzbiNrqawDtveQsqVIJ3VN4/UXGMO04Xb3QqXLEIxLZCwrU2IXvtrBV7hWhqaFsNbT+VMWkvGkgb0bD2E+zDaWEKhk5X/vLeGRd8+Hp3i8w29KWDC3OLvPWrc21n+eUHn9Gvsj895tkvxXg4NWhrM3+P8RtjjHs3jFU/SSaERT20yDxlFg41V4mhq+8UconzqQlxkhShgm90hFBl8W9WOW5Qa63LGnesjPSXfp5fjojqcUf1GcboQFXhEtNzX8T5QpwlmTFlO4NFI1PfUdqx/3nGm/hxwWZUxBgi6+dnPPZwHUrQSIJpq1C+7xIU5G1mZPXFQVw7F/kmhAHdtbbso/32gPAu52gftW+lD1lB9lwP26ED3pcLUoy1WRux37TYd1sGmd9zv65f/cxjvnd49oq9aeN5RBX0d2hxWsSx2ycXDh+uA0LorjAECufTv2IxUyPb0Kw4fvfCg+XHE54/9XmW6zBlDtdzSRgW0xWSxMeP08dplNwC01Yb2HHMaS2B0LVCkLXE++VtHNGWT8XvQKtH3TvEinCpOtf5+HVshHb6RGyXcOsDF/pL4bOhtrXPmXHym0g6SQ4nZ5VsW9bj4fH5kGuMnmPoqDXXu8jV98Wzluu2VV3zVH6r3seY4X7Ey5uJCc/QGhUaQ/XyaY33m/WHqD8tMkPkY3sWDCiyWtYMy7nmUk1Vc49vpkB6zuQtmy1b9uc7Vp7nsj9P5BRYeZfRjP1QamYeXTRSehNKsXVcsXTQvdvrIcEYbMeacvnzU/b1kh8O8u15Dm1FyE/VB3E13YYUILfYiP063oho0aKF5N03/oyh5x5Z+GLfz008vSfOTF7kkxPMbHCV37r7XFjWzpdrgv05uE6n9/13nzTndqTHcWsJl9frnVJuKzu6Dgg5eRtKGZ0bcZE23SInwYlsGXoiQ4/MJMXCqk8tFnV5cCaindJuhy/PhtPPah/fOaDizpk9jXWtK3hIxeleiNew14Ugp70gBEIOQ7sbapeQLfTqebt7GXcfrxEt70PZuB1DKUVuNwOd2+ugYyeu3vOUFKmDMMmwVN52K3PPSIVcp3Yvj9XRPlvNu/tNVYZH/0cIxX8LDHqEehulQpZYK4LMrmxs7MI81E1mxi4x6o5urnxuc+BkRrboFqQ0pjMqwvlaMGvGWq5PzPooU1wH2oMyGGWEzz8sptbPiIToDNHPWkWM2c4ZLFvor4XA2uLnPZBnPAgJyXG0be/RwaD7pjEF00AiVrvHtWgkXAttEpW+OIQTjKFmwYD0ncDtLDjErxMpy7+tHA21KzJ7O1O5bRpOVXNX+fi+EDyytLF9myjU72pS8Vl6G8+TxR5J1k7SGejUeMOGxjPjDlNF6X1SyCgcP9TpO87DgxicTGg75zOabL3Dxt0WRZlYlc8fzIkhM6pdO5mj5nDb1fV4HkPfCz1yrerpSU+z3rp/jPOowDojGGxrhUDsJQjXt+PjtT56PQdNf/u0es0UHSFVuERjf3v9iL2xhXHcE7j0SfXCeJmXt2NQ+/EVLVeid7iSOC2XnJZVpvsOul80b/nxmrR7Zx6PP2w+flxpcrp+UdVV3dXT6yBW6FG1WkQPKg+9g70rqBsW6U6Vs61HCA7hc92mkKqTFA5rTTduvBlGlXbR6SCxWSa7LdnlRHeglrntvXFV6PkiztNWo0/tby5IE+KaORc63cS1ercQGJfI7G37+U7iGgQ6ERnjyLnysRtCIWvIGqXB+fYAbliq0YSTGGEmg1qIpSUtCvF3XalSaOOjMeznSZ/enz+l+eYE4i1KJOPjZnCZn0oYkVFYrh2FWNnutp7MidGarrWJ8r5c6OB2WnTiuBS7N0Vh3Yi9pU4klhSSk5ERq3NHf+hhJUbzjDxe11I+TxDRMqPdDqSp9mWlfLYdHx+HqByYXKI9Tw7nlzURr9ciEC7rSLvX9SLatHajX9AveqHtvrkbvZUQnN7bNj4uKQULYVLedwXdJ8Pr85AtaKyGuy9O4hIbz7s8HPNwzA/6Lej/QHThQg23dojIqdtvp+d7BEZexI1/TTJRu6Cm+Mvfg/7x3tUzxvvJ9WRUSxJhn0iJj1Ux4xmV87dS286BuL5XT/m4MAEHMYgxvHwei8fCEskpGueZ58UOpF9B1KWDtWlV8hAHj94wRpO4kCFWP7Z9cBN/+mOCIoTkcy55WSSEoCpvD+DEDA4w0i1CmxSrbRFlKYZgoJaymnJ6pzJLTmov05cxHUy662InbwxBDH0jprY/Di37a7FvkbmtGRzZOUee3bQ8UUm2rtOdLrgVdNhqnH/D48hLEa4N8ZqdccLqHb6HN2Ss3pGTdGIlloT6rPrUwsLz50GLrmGGdl+ZZHL5sHK4g8odlUPl7Xxdy5U3Os5jWNcKguv7soSwhfVp/3L4OPr53fnop9L21hf6qH6OZqQ38R9mi515npMtFIGqDmXpXDqlQ/UksFXk33HsjmO2ZHdHmY2NjmfITAldQi7jc2rW59Fci8tLp3JjrHet+hq7jmH0JhMWaa/fn2FVOqKX071tmUWNG+E9UXd2Fdaf6TXwKN+nTXL8UJ5tuOi6UX3uDc5VWEkQONdr9KZJdmcn258BZcpFyFNEiRiK6KodIYrWvrWg53RwxlrXI1fM0MPxmpGT1X5+fn7mnMTwZbeEhE2WS35icS35MCKE9w7gLAdlCJAxW8HxMTsiKEkL9pqLM7PHrK7GxmOGbS9N5WbH7vuehzDPUJA+PWTe0/oZq9vebvNzrd2r9dH+arVrZqFdrbV2QWGK7suxD7QijzpMYa16+yntY8Oik9kRUjsOTrLF6IVl9MjYI1axsJTrgjROjegaM29dGqO6OrQ75r2t9+JyPm0aK6xGt9a54jy1elrn2xIIAtms8FU7tHfbPSsags/henxaf3Wid6c+custd593y4l2mkfdtvM0RKC8DnS97W50pmXNLTH32Pv0ziWPdmmOLNuzta7bMUiN8bTyw9cT0WqsfVbI1jE5rlVqizXMrhrLQkRcc7qyF/OojXvOYchJndIxdpm5vE+IXFXxhCeJJMpUxak+FnZVCTZz1/rTz13uCJFVSK9Pej3Tkt3ZxnjGMEbtXFhcil6fqTht/cwIApmkZevLXKQuLiXS2Ky1YEMwZNp77zPi2v1FlTlEZCLpoKj9ZmZGDm2ERvX2AF5IuIWlGzwY2feJfZpRniEG5F9yj4zWMMaMnSaUly3cN5evy/i1ZWfSqo4hk577WtnuLw9H0I1vyrPXd28SkuD2vjvMLMII/CEYpz/h47oq6A+OI3ni9SorY6sEFRFKBlMvtvROsoxQUJ+loJ6SmTl8PWaYol1PVSoEnqZHT3s/P9p7dXejp4kK5DBauIJA7LWCsMRh2ga+9Gu3H8fHb0jbkeqlX+3n99pHbpsUOyhbxOAXfhN/anRdYo5B9z7Hdyht5yvPftDVJebA7o0pmGzex+evsvCGa3Yq424trr7NVVuD50XeuH1O+S7Vu2oPXVgLFiTGUA/9k6HJk7KPuz60z7nt9YaFanE2BMmgLSrmN1VZ/xGf17l3PHOjeo3ymeJbIadqxRKDMcjZyYZFEUEgWs6Q2nvoZ+c86Kqz6ehuCPJwymFsvSOZ/tPHGVbz81OThKrc6SSZ8FsXufjYV0Iee6EuSG4O4PrlaRaWAhFu0/vi7yIiWtjR4q7XDwd6DzvVHi+DrWljaRVEfbhv/X7fsuO5smJ9sfpr2zUTcyeduuhN7lub2xQhK/s50H3YrUooF9lOo7Js73t7LdFu6U0Fpz+92dTKWHESK5u6Ec8/JflF1lc8WMrrUc2pvnSV2zEzR3VVaacVXKlAr0Cu5YqPU3Gc7mjkwPWyIHttoZ92c/SrbTcfakub26VBRm495oviHthDtFsUwcZmB/vQm0K87QoKo8UlR1pS83tJuCRDJNPP4drCZN3YGrjKZ/+Edt8s2k8f/brr1iz/6nZaqz3FZ2SkWK6xsBqHmvidbSIOQqYyik/Lqdpz74pECvHAE1LhdJyqK9N5Q26RlddP56hZ+0wvBDoFnLVaHcgXsd0M18myuM76lTxBVBBzhPToyiGVr8NRQ7eTKs7coROH510Zfn8oROLb8thnwzT84QlhyBnK2dEl9KaR2ahvLe3zA3ihgRiKPMJAtlgdglvBv/1ybZN9qvtd3eZgxT57ccIfZvgV+Pz+JI2riELbZ74Xiotyv0p/me8za8qyn2d1FUK7G4fh7SjcJVQ7vbBlcLI4sY8Q/XA7sjgS++37ZrbkzByEqBixO2R20ktsyfg5AvWhaKIzoz/DtRMYkHnLmT9/KpXpadPrgDhf1l5rec0mkGN3hWjrj/nQtKFcpdV7h35sfdNU0NL49YbhtutWwkUdAoPSve92pM3dJGIbdncS3YfGtXYntIKZB6/PZyGa+XjKP1r/XDwojx9nv3J/Gz67SnUd3oiXgcQkO3Kqgp5TxS51gu6K6lxPtZ9VZ30X6TWEjSZzsOauXdVoY8ld75o3bsqsvvko18eBEhRVm22f0EbSWSwPk+wd4t28xJx5yDiV1qODEAikHtkMs7s52mv8GFx08/OMMIL+KpkJJF/4ED2fx0yd8lSSIDf7e+FBCFwGRoxuxDYmQzMl1dIRQWD4YgyRon242Y5wj0cxbH7g8WuLaQdB6XCELG1bZ/f29K5VnmztWduTot5pXL3jOCKEcEPZoR5bcSCsa981OfbcOZ+acusXi3eyBtq+vTwZbMlzeYolaKGrkZ5x2+IU2rqmp+/MlelPDF3B9IjTJifHTDeBFba18HX7nftz9EvV1X7a3BXStkR9NsrOLXTqwcTrXv/B8U3eMqJYl5Ap23lBp2Zvkb33w9pPknz/zciimBIyxSrbmR73YmW5fnxKfE50KwhVE/IWLtd2zMg8A7rWjCUWlhBUqDlNysuHHjddY/WsheCunFsIkuDBkOpUjolJ5qH4s/YxeMRan+ds1Wwi04gZr58PdrkHQzJWGfDmYGXEprGJ4IKwL93BIjjrRz0tu1jrzZawWrMTGeKfDXsfMQx/PIFk0qUs1vc5c3JeZq1QRt3u7QaZNrARomvHNom1nB0tDnpoMVTiFe8R3+301I6m8CTcTkYcIwXcjeWmawMdtn8QCgqPivGW4Ou760iatp/wbJp2vTQj1sxJG8fhJo1Y65QKorFLvDY7ZruulFg4ODESK9F7bszzbydsI9aHMSN/CzRGDWHUNNxXQTuGXOJaKtX9hLiiG1LxYeagxWtsVjia9vdq66P62f16jqa9PrSurhb9LSp7meLTpamLVJZfdimW0/ZxoVuYl951RR/2Jv1TSUXDGRKxD9sWc7vYXtvC4hGVRb/QfV90mPGZ1wOFiNwS7V2tHO3zEEsmJtwqU+XzKXuFmTIpM23Yk810MFXxtiTiYSdPdBeF8mwfIyfvP270mHEJT4rw7eW1EHHCdn6FSi4Lyz7DJsRpo4j2YaXWnWpCkB9lyh7I/Acuy55IBok4V/fjp3/MZM7Qf8QkJjqakXvoprr8cBCJU7zd29VvAAmgTSDwwCu2iMAkOrIve5f6H4xSKDnhzFId28dBI2SZ4BnOuXzsh3URxyXjdqo1Ynsmzd4tsaZW55yy5AVXK+W89UERF+LUs5R/ltt/PH/antMjq+O4bmplbBknGTGntmOuUGLDSudxTZuhoctAZubwh6ulQmtoxDHi49S6Fq2J07CXsPi0W/CF/kWnRLdq9NGvB5dqo0P47Nk394abLS875N7bZ3MSYZUPi9K7+oQksRYriRWRk41UF1GNaNnL9vBryZXXY3QVC+WzX8b1VoWuyrgn4n+JcijvUWW3EIiInOaxzanzVHlsmdHOlurPj+UZaayMmepAeCJCYK1rejSFdimsapZ1/WTc8pn+8khdHpI2VrSZrGGxlGexlnCRLUiV8yziFBpn7VyWJqXCDMKuhl6LNrQMnO8c3Y3KRLvvy4wMxnBmRZecfXj36ylaWmQtrRd7uy3TLVDCpkaCiFrU8kyhIp5lyMiI1FHR2svHbWzzGs3CzHD79CYg5cqk293HPNjWZFzrSfLssWL6SackFnrieIk1yEkKpQiUjcxOvO7dcHK9oc0l/Sk5qD3Jqj0luz8ednL+9O923f3ziJER9YdnDZlhmKHdt2tmplXK6fY/67p+jdZ0xzEVs8j3slbY4pBWL+YDaa9W6lq/q9pLVTRaurWp7W2313i/X01txhtuoZxfjW4YipHQ2RKZjyWP7MrT5MxNbI7b69zkWubB7vr87YfHjydG39rLlde2Dv9tXWdXra3OYIrlFsHBF0v0Exi9tm5K+Whjb/qssEcg7BQcdnp9v0Z13ZhucAvqIucujtvV5nO0D9NDeF3DXkaTC1JVsExLiebcIbMLgRB/ov1s3RykLtOxtV7r2lti0oFEGHt5ntib+LMjMTN8kkPjy9uXBwUHWYMKRZ7v7fmDgeElwAzLVXuxV2SlmxsJUoHes3XRepeaEPtMoeRyDc/U9X6HRLCpjNi3+j7z7rt/aSv9zJtBKhitaT9xZu392J6O7CyF9kK5nBfJQbi2G8tJ7K3xNoJgTCoDwjIVzDTkV6KNmZYTG2eIR2Ih73ZtozLMXNrXTRs9jaGn/+h1ZS6r5xLTTE9ruYjzmJ6eeP36nLEDk1avtimxaZv2eqYfrUvTxnbPyzU+ZPejIeTl7VmLEHJDFDHXIT7Zyc5wxkfC/lsk2XvnCNJJ6wW/+mBpGoPuXwiFtGcslxnzXP2X1WqMLKlIecZ4Pt2qIkRikoUIqjjs03VX+bJVQ3UcRvPdLa8BiUD44TkHzijhESW+v8q6bq41o6v/SER4nXxSVO5OrLIqSVaSLJYqWFykn9E5zjMf5KG6r0q1VnrobFpRQRCTj2tYu63ethEJ8ePMIIzRf+A+g7B6KB0/uGZmfjBFgvPefi0kApmQW9hb642KW5gxJsQzWp4HYYwxgshkPE82dLUtjxMtJuexF3Ubn5ZFYVvJPuXAdNpOPFqs1mafTWrv0o3BaHm2Yw7FchrYi2Cf4cRFqoWwSTiwg9oTWxGLRwb9Kdmp39KfgxB6xJoFLY/1LNd2jSbQ9UNX+g8616NpNA1RWhwbUjE9RGuk7V7BVw/t1UrbRqXVFl3abJO7UWnDVdGyiNp1P2Ij3hamCzZsI8JAvSn6R8jNNz1TzgVzfHFMuEw/V6y1KXfXts9lNPNwX+PzZYKXvcKKI9zbk+qdHmONCCYibmE2a75rIWPSg3Z6ONFun7uMZGr5kQ/peQJSYBMlVaEu6mIWwnp9fCfX/g12fsAp5RqDTxjjfw0Zgxs+ZW1FU42gripbbOlfy9ueEF0mB5mTVNpa2ybOw/MQiZEkNGfMuH7UF90zce0prI+R9pszKLjRG9RW+vlhbydmCquRbAgIxGa7xZibOqKD/fg8VR2zZfMfPIXYnCLD4Rj64re/ghsWqVSeuu2a97Q71OPziG13+px2bVkS353azzxWqk1a7ct5NcJ1iIl7Oy1OkoHyhRITNtaZM7b59nK3JaS2cD6HQYbOp/IrZOOdYXneZ63za+31rOeNXDpToHL7c7Y/axyHwGu3YPu6A19t+/ndabS+/J5oP+Wi5dhayu/QW27cYVLuGo3XDzQILpFbCFr57DR0JDvJw5LJg3t/KmxJcxHXzvHrkmv2dulf47OrBi1EK7SrsuNqNaaph/wmcn1vZ1Ba+02ITLKQRQsTmkzdrnWjOd09VK/2R/JydoqI5MmMiqkpNxMmqcgt16qxq9r5By5BEERB+YRKDrtsOXqjlmuJOkVNMQIl7Iyk+j62lN6IC7JJmbSW9uMliDFWNy3Dbae/qEAMgrBik1w7kuBIPg8xh/i5eV/P+08RYWbBriWjk2JZkyinJwpKtHRGnJ1hV6N9RrRsmV/KzHM3tpSY2cz2adI+FhkVZLvdZU1/M9/2tu/HV8u+GnOjiTtZ8/NwEcJjOS9fYb3JTu/75PEfn3ZxzLlqYceTLKgttpO5ZYZDBEsnK7ESJ8ta7/Is3mUv+Gs9axQts5meVlFRH6SkkM+Z6G7d+PVsmCg+tNf6zREa3SYatEzKRZ7id8idbELtMHddxtvl7fa6jVJMQ42oD246pfsLS3Zk88ST6A786eCPcgtZimO3LM/td2V7qiaEQ+PxufV60Dvucuvev+6EGVTpIxb+WO5Jntu1W05KwSpLZ0YPy9f4fE9ZZabP44kMkU9uAk9yGzOGLqkWWK5jbxW5ZBXpSdKHGSrMDXnGIGni5VJlsYjoyxxbdsu+goyzCDE7EN2lKvY8m1ZeL/FDugwxjiuPzjNnwhANAy4x3R9sPULIPZzn0EOSq5xwPu/pLNfYkZwdmltuRsO5J2sfgqkFCYJhV0a0Nqqp2hWZcWjoKwmnb7zfdUOwdxm2brMm+j7ED6O7F7ZhmbdkjeMnuvKI7XHZRgnXOL1OGrfTOOErs1wI1xbCfpLN+ZSVsac9+zKb+L77cxI7/eGRHdhpiGDP86z11utZa+lYay2vL/tKq2jj2NOYnp6enj5Z1+rRjsH0mMCh0R6fo21Tje48qUZ7lZT+Ga9pB+pcTUWplPVM3lz+Fx95glbiGC4KXd6Odzuwk3BvFVrL7qtZjex2KTbBnSfyqv/h8ZrXZxnjqjHLrYm+r88Q7pXvlWLP4Uawgu8VU/Tma6rb71EmX2rXTbXqoz3zfHcrTqQMJ3COSDgkilN0zeNjPabLn+NO8zwExzcDgjdLdGKxM5ZnwQdWWTpnhNTbEsTYtpSuqRVnI4hHNjFdjTzDz1e8HtFG95Mf4g93h0jGENdoKD+zokXQg5AEGa/29GtTQEawUYCH8c/kfTfdRHYqoUOLUHtQqywz4/3BxO0adlnu36rwsTHSr5332GdcXFvv6Tvvcb/zu8S2UrbWmgEb3witx35eTtOKWAcRPJbX08a2vP1GQ8gXMxQh7djBqlgxyVtk6593syPjfDp7xsC73/Us6/3X8bB43j2zHotyer022un1c7uC9nF/vflxYtBf+7Vf+0ur1/NXNWhjG/SDy0OqvUxTvXshuLzeew1Uup3E9r6EmObmYisdx0XEeC2Mlymy5tMi65H0gSRPyzE3JuWiKPxybzuL1uWzqfFZQeO+o5XVkXsn0t+VXVqqLTETk7MQGCdSqaYqO9X1GTK5jY+jGdKQyETKkJGRXidWhCPritNSsdjlvdr7y9Rk4CF8eLcn4OnnV+jcJ8MNtS7TNU9jc25F2GR8GAd9t0an0HOL0qzWspZ+6QMHp9fi2etdkdBfFcGcn4pB0JMvW/Th6yk65Dla2vl2T1fPYNHcIDaWeOydc+KKM4MaAj1ELCvRnSJVKp3ZIkRb3q9bwzMYBmYYwU6lyfz9a12fRb0Fm+7JFjtP5NyILM2DH9re4jji49LjuDkjayUN85fXJ9vb8+dgscrL/jPLElI72d8n+ZyRrKCwhaSxF2eutefuZS1rvc9ay1rn1/p3wGu/9v61f9+HVGrvTR++bqlg79nG9M93vPbLjo3dvzqtSdumu6JaFIm7l2ra5jcavVQqlmgqe0RjTwX19pwnjoswynl8sndtt8WlUalY6sli7qZ1tqQrW//uS7xeZC087/jsw9BHZSYa+tLor7VSEWmpSKdSjSGC+OF0eG52jNKjq7E1HV1nK/XbWxmWDPsQIfAgQzg6ntV4YaIOyzp3qv/RMGaFx4dBpChhm00+SbCJ3ixYPLaK0FhSMqcSUynRmxY95nFc8gjEPuRKXtIu7TV5/wfMJoMwUV+JRJLRbhNCKGc+nvxsSwkhL/b0wb4Jkp1QjoSxs3mHfLHU9kzFM4WUH/6tpQzTXdO1LdedNWpGlEBw6XqbLGHvr0NwPiaVtmSWmTgHjDaP4BmStrckT97O64CiDm+o+OWJfZ90DvV+y1CfWrFcz8Si7MZUMaCtjNjSn0qyxdid33v1Gr8Xr7VEs5brwrNe+/3b3s/03vM4/35e8/h+7L1HG7L3hr1tv/bet/zx7F+jhPZDd0Ol1b9oHpoZobVVKfIQ/1uoMlJz6jxUvI0JYTtG+3OWGUn83iKbJI/w3Vu2XONLUNzEj7mYy3P72sxcunw+h9t0Ldz+VX5cI1d6a8N/3/6OLqQOJqaYIpPkRKtElHXLaNW7yhofdg1Rurr6/XiefDJTeg0YZXAFshoVsQ/m+3VyrTdVYiMTIR9CPpaoulGS4XV5WSZ2x/7s3jwCQZ1Gg1MIHrMpzp4HvedDYF16UAhht+7siMTXoTth9pwll0RkqWGdHWu9h97coLR4uaf/Z5gs2CSTBKj2WmpLrRVNI8iM0RFTZGN2R7U8rXFurmpBOe+duf1ScLdoWj8xtW2fOL+GoBCaeWBPWcvee1lypHNHc7YXmp4PjiFCOebl9nqFL3zeGa/PpxaxzEKgBxuzssMWJxKOjD0KMc7sbb3/vpbVay3r/KvXsqznVe7t9LWf99/98bVVtm17P79Urng90K9f5Wu/Nuyvez1sv3b1yP1V/Hym9VH9i6Cy53dbTX/yIW02lHvQoLuIHZzc2wpOp2NIOQ3BpQahG7K/PNtK8kjlN2Xl86j4djB3Lrk01raVILctQ25fbsvLP+bSxqPPrhVlpCJ+S0unbg3vEbHEkhkRiOlmR00lQ6P6PcagZp1juiryWWY+7XPOkSFIRAakMFZ8XrBfWYV1e/QVBMLDdjaUIT7ZsQfJbmWpZeNYZK6hh2tPZfabHt0xetGdw5r6DuKRi3n6JbN7t96HCDGsZ6wxOpkh+vJHByMIOr6OhXzbmI1Dw5aQ3uzpDFfkEIaKGRMZM2P0pMrw8gmW3YSIUF011hiVOegZPUN2thcerd6uqUOk5IVvRaCui9WWFda2O1Lp2Z9FJhe7ymVt384Da62iXsrrhCLNQtorNE3WjQ4hq7KsIEceU8rKQV3tNio+g+0mOp5jfHbS09JER/DUCvHm6FmO5na0LXrUkfv43Hm5Vd9+9vyutqmjFW3/OqC5uTqkVKtSaUuFbm+zJYRlO93PG2GxYcTr5vQa2F6zcMK0oJ5gev0lO5RT/f1NB7cMTsXJN33ad6Gf/jm6qSo/fGn487f7aNNJpzjUbKnY2P6bVUMSakX4WFWyRYqSC+F9aq1lsjLP1hUm1KU8H2RMxOPzyED5uLXrzx+Ht8rnQUrcBZtnPat6Mtazlg+T7cNw1iii1WhtrswIwiV4XVpjoxSTGOXWqO7fN6xG9rrP0Hq256zRbS6Mz0GqB7KHaLRkZiazjfqFbU/XXx6Qpo6T9MQ4U5VqS8TCVMSwxIMhY/4OjSNtUvGytY9VEEdgBDEryiVVsU+GlOz2u22dFrV97dhOV3d2zbmdtm/6PXa9PPPxY/lPFhFvoWItb+agGXjRxV42NVuwttqIa9nN9rutid4PHZ/rj9f5CEsSYlVPAuvmyK1Vb+tQrfaGVl8/e+0D1VSpfto9vxutT1X/0ubW6rV20LAncms2Iiz4KJ4ge+9lB1pK5nH+vVZhcbLw7T9do3/ocLrzsv24FVvoHhMPZ73NaXvtbp+3yw/jTRO1K9Qi6Cd1uyVdlWo9elu1NxGNVOyIM0hFKOn741Zd61I1ukaVMFYfy6srlKqIWYn7IEwOKeJ5qOE/RtjNk2vl9ru3fnQJDl51fd6sMnSKFwTptc4mdEE8C82RfYRBoFJfEFUTU1ruGxumNdlEmLOt9dfSscZ9SHUkZCl6EVm7NkRxZnIhJDd7OsG0LpJ1CMMx+fMzRQ3VEzMi2iTCXLJPju9qqquKTqXNnH3SOXb2ER9ktY9Z6nqzZMbeJ3etU/cik45F5t1gt+1XtJ1XXa66e/c2SNK4MBWFCy041H7exZ5Z7Jl2e7+vzcqpCvbRRWBp3enWqm83Pe/S3aLpWpGV/bDCjqzqsQRPdsv0d+fn+YvZfZr7+tZez5/pNb+nv3vMPmqZtM+nR/XT7h6hR5doez1/SLXiN6GvO62TvRCvl+pNaDzM89q/2MvDW11yuK/v3WAt4h07hOyV5Boxf3fy75HIrOzgjyueOfWe4YbUvT1u92Lu8sjOPP6gr8LT7/xCs85W9Wfuo8XuMWJV1TSG+KMrIsn03CJMnO1qqp+Mc1zF+Q3n7H7vHt+tda673lmq+b9omvLsRd8q0uUbHU9eHjjUcc84ioSoSNSG/4G+dHVRxSDk49G4Ir7pag5inq2Io4doqVs1sxZd5w1BXcjv7PIyFyKrTpOYKsy4DuNsf23uOfQt4jiynhNtlDyGUvTFfm7zqGsndiwSqB+WacyIGUMEItLBTPIwUXq0bYxFlbqFT24f3+8qVfZ57vMZxHAI/tW7zXUQrFir3d6vCMfVqVi2r5Ya9weuN/90Uf4HN6FlhkOLLweVdRF35MwTBL2CWMvh0le5/rCupmU6XNETsaWffZOItznauuOujpkebdFCGY6m9YQqX/r/MD2aJ9W0PXBBA9ezVTWwhxQfIxp+o/Efxm+5YC8EcYzxNlzebsSv12JUkuXtuyqoTYSQb9FTJ/XtvGVOrW5EpepB9zuT5SmIgsX958M46maruBXGcFSOtTN9LkFsuMLXOWfFqZu2UVFNi/d4mfLG16vOxhQVo6AimVP4tOgcca5buCa4ZrZeX19nDf745fBcKmyfPpxB88ARQkCxCKdVa54gzKAJXpxWN4XXLUO5lNWWW3m73m7d3W3Yv/jDOufDqJC5BQnOcwjqiyL5uKzW+byXF887tgNGMpHYMJhTuqNKZqMxucX1tuQhtXfV+XR5qpIZFuzdLK+7Xny7JGKV0mMnLtaHcNptjqx5U67YlnFkdjpkcdemcuSVa5Yfl+uH8tpxH9cWTVsGUTNKECWE1bP2QMzV97ndMt3S8sS8p1trS2IgWYmE/XfZcySr5O7R6qGqVI9qVT2ftkdbrTa0P32NUo1qtmk1aPsgrZzdog3NpqG2IOQ32eTW+EWgiMlBZ73ZCNni19/8lJzkepLI3mFThERE9WOhpc47uLGccN/lEuMhr882Rl/VHBzZIsyuLipPaVnxb7QkyA0lNlZQghGtL10/qS4zgyyLvTwjTORDa0X4GDfcgRAs+sf7fThH9etu8ghCIFaW9hrVNQ8hH0WmwGw7dxMtLC9aK916ZKPl+PSZnEEYg8phMIp0wqPRbf8Q7Pg4SLujCCHZW5A1PxnOmhDyai/XQR4Zve6GmSqJKkR9MVMQWmbElDVluT74x1vmW84gQg5Xbi2TT2pyB67fauaFjF47JaySJRZSp4hUdGxf/U2lr+2+3fvkqB6/rmt5u+rFnPVivujQWlqXt96j0ARBI2vJ3RDkbIG2D24jxeU+aY7utsrTiKcROmkJevaxf1bbO70/7f25+6py55Y7zo8efb/nej7l+aKfUu2laJS2Vw9Ruas+D6XXanOLezcIrV9PnG7Ezn1DCMFped08p/MXtDq+5hI5mUWmJrrh5EV/nFXCheZe3javZ3qYKpqa/dCWYbDVtvc/cnJSGWtI9aachb8CoyQKQlV0XbGhI6uUwFYo7/d0EPXXfqVCKdW0ezuGQVwyMhIxSy1yYcbHrxuuUQzCpkTh8FzLWopPtteEgEa62zwkxeoiHJviRV3Vug+hoN8YpA8oREmuXJj+dufpOX/xR6wpYT6wyffpoWu8bCvulllL2Urf7uVsDm7mDUWGzCAXzdazhiPF9DLdPMESa2Y41ei9VWuxhbid3bnvb9XF7a5AEDrUmpuevCqErQ9St1O3yU5f1vQ11m32P3VJD9F7slbitaj1A0PT0q6hKKQx1qws4S6EgZMlnrWXe5/Mu5pLuyNPc7vVm0HECvIcdcn6WqlFNMWzp34YfpZqu6e7a89ev2dPf+Y6v/yyicL+zO9Ow9NW7qud3Eq3uUwTXKa52xsxorIJYjeyGdpxkGLaMf7DkL0sxPHpNFlvnXyV0PqITOncXvcy2Nz12ptvg1IY3feV7n5ZzXsOj2Zux13+apupMUTXlOyVdCINoWFuWf+Di6vqe9c2nOd1arWq09o5K0jKM/hnDlqqS3jgwRvnoowoh+i+97ArQXuWwNkLDqVzuio88RIf5IuEo3ujq8nWWBMpj7G032v59YNxmO5mJBFrW5/L8IdzeuUc8xTjY0vm+TQE5WUas4QZ8WIvZ/MyIrvPg8yokdjEl2t+NmbHjBbqtyKJhGf0MYbm/XlqcKrntzZSfd2Tz3NeV5GpfCwusUqwdbmwN8aqyL7VJj8r0xndl20R67Z3jGT+c6lpjJcf50+Ct0jrektcx1tNo2KzpAixlI3ooa7PcAduu3qguS3P7YnggXC5N9Z3pXpV26Od3l9V+vx5AkUPpVT70UL7l+evkjOl6msbudM2+jteU66FaB12aHAhBBM2sj25pRzr9mG2+Q+wEBx95vh4LWT3y+5KkgvZOvosyqIsD+zB8/RkDfo/M1DmIcZDLuajBh/0KnWCfSq7K+OfwRDuYEm0RAi8Wwj6py6uEpSo0I5BmiiGaukWInUx4b5s5ohMIh8rLLdZr2MMGAiWFAsvlpobqk6spc4mOBRuC9lp0X93ETShPKGR9IvXRUfRgR06R2Cdqa4vQyRhvd2/pt18HsRXCCq9aNkveUxoCWmp+rd7eR7mwzp9d4BItwxNXaZjTy+jiLglgbjJKbpSvelT7R5e72BfN0Ww9w1BDWvOtJB5l2schNT1eW56lWu/75GRCdfq3sIY73kPOnvhwu9SFENBZoj83+hSxDU127LPqp8SCCqIW+9cWN0cn815FelmCZ4kkVhCnp89LxGld7i/3G19boPSnG3u9tPen7alcl/1GmkLl+eaEdUjtkYJvbSEsEMVeeSs6hYE01I2v4lgEezllysvO952/tW7dCeZ/W9hVi7xVFAkUkVnyr0Cax4NteBeDNyCQeHRy1HpjSg97q2ez4gx1N6dCtERseagQovYTBGcc3461TVb6oxTbaJYf0VHTJlQjVlSSD5BxWwJ4aYC8pm36nLv2qVRBBWiQqy8f6mVqqpTwEPw+GQTunCImkJjBqmWpaPbg1KuMt5we2Yod/U3weoL9upu2tzqMB9Gektb+nAIo+1llK7t0zSB4cVe/mSLOW2E3ZQAjGakQp7oTGz07Di3mMwl5nD27yo6GJrojPKuZmP6/oTJYmS+ERyd2VqLdZqLVKw53LHvMVFxrYrbc41JTnL22hNqPn68p9dM4SV6UefzvfTSpLFpCHJk2UPObIRG3QeXPk/0feI+d9zHFXq2XOdKJMlTFkJk9tM/07buHJS2bxQ96NE/z17+qqrmblrFZ4+S+6PktgMT9ELuaO+ahUYvQsVuEPbaXGyTNze7HMPkJV7DN+fLRojJ2MKJnUrS2M7WZD9o9yxtT3reO1NkLUM/725Z268gxnD9Fz9TpY/WqRzVdVqPf4a3henzEc/tlzlNbW/3xhG/0SGoODcVtRezhE51kehUVwju8fH98nFCGxSDl0xeH0sIhWUdi6Ppukus50mBiyAIPfWwT2Y5zSVK0+Ll5RVKl1IylxIjv72xpx+6USIvd3/RqUO0w2KGXPfxReJUXI7qKckeCW2kJeaebvMdd6YEAktMOE5lpnfNRkQwCawZecKs8nRlZOmKVE+Exbm4vH/O9jFhduTEZVI3vf/kY++QIkRdFrd3JjNhpWeFfTeqt3p7PxrL+uYHTGgGWuZAdWbgLdJkoS1xR5TnRkPa/pOKbh2fB2lc9e4VCZ4Zyf6DSEKyoG31QPNcvT+eP097PW3/aq3fbXWWRe6Ptl4v1qbxtPq6p2jgQoPcPXaKD616DYKwF1JbfLzIjYaw/TIEP4PTD7Z8+0V3LhkTle8kYp7RomohxuPkvL3tqocHyvB4T2FvH0OZm8NuszrVZ4wxREpNRCSd5EYqlGhZKbTrvHypPr+tUOhTts0g5dnl49DDnMZF6kl9/yAmRPn1HaXx/lP2eSTVUIjKK/zoKmnXKvv48AkSIu1onng5tYuFPsWhQ3lmcooOtQvp82Ww2YkEe3Q3jNfm18h1CBn5mFnZz9pTZsjzi8ZQ/Nu9XBcieuyG9RlZahfYVTWUewQFEVq8fESm+GbIqPpSY2yk0oqxd9MECveN99d9k32yjr5fsb8OO7bujT1TZK4WMnHNaRFzXUuuh4TMalWWcaG8tmsaMvMujUHRmfFMqb1ksSkbqaWi24VycR/hPsd9rs9uZCWwTn3P7Ok5e4iIHuoxbavaqtce5Pzc89UnlFJ6tLmvKf1UtdFtXSkN3f9sNLRsRZD7IqXsIFjOA/dOGachhIv84v1MyTkqcT3VKj4qXiM6G6tQzxOu2X4dXMsyeMe4bAlawcMvn/U4aCkWc1TX0bV17y0qUhiGYBGpJW5zTlcMUZ5T7NjixY/znS+R8vlGSTUkMW9SCjtM2A9bV+nhcQvCMIcgDHVsGqs671VVXjNs39yp5c6ex0mKoCEEwtC8fzhFcb5mtJmM0UV160uRS8ScW3TncYLxcUTZ9X3jO0rILHujpVHQGJwsf3bZy5+j0dhJ33WwQg3xX1LRXbUjFraXsfwwYumeekR1RaNLCDMSxjcaUoUI2aFT1kWlDnni+GHq+tzu7Z0O+267pNCfO0k+z3ViNVwkVVws0Zpx0QzXd1W6GFOJPYLGXksOQbgjrYNet5/gMlI+g5VmZ1UPiV7dnmPa86oVVIseira0SmnRVpXc+d+pouJtYzNttR+4LALRnSLuyv2bD2IvXaKWJqjpkCLsW2qcL6+xQwiXt9VI9QlJ90brJKaCC+1ldK2hNyc3vsdpimMWz2uIKZ/9VknKVFP6swZ1l5bxUbRrxLMlgtCeMSbaYtfpP0H5eNZ05YzXaWblkwrmuaoNhUjD/SUws6GPe7yK8UUJUkIKtsmgfHz/rIqVDyEhnhSEW4TeiHnuvJih7zAzQQn7GrhIby5H4Krcis10kmAr3Y2oq8m47wesoo7sQ2aRl2OvyBqZ1vPtvdwQ2q2+O8cQBiAwuqrZ9td4D7SIkNOcJBFL8HH7rug9FtWdOawMRihGlI8rcTFCRoWQImQ4bsg2Mvnud/LWbct2LOvGRrZ695F8WAwPiupAJoE9jaVQodhUiEMvAs0eQXSlWc2DutCU22x/e/D8vqYBHas81ZMY03Ox7ubOTenxi3ptc2Z3dXvbBorc0T2/hfqalOu7RlpEt28ayu5MiG5BcLFhZ6TwNv0IRZ9tb08sr/sYX/dxjZBYw5FHYW6IPpJp962WOjfCxtDsMTAPujGP5r4fV53iUeFRuInUUWZXRqr9DilUuW6oJrIiXEvMnur+KpVT6O3COdV3ORfVSHdsksorc6AMQowl129OCiVG8IMjTfn1B7rsxV1FTlOOb4Z9EjEWB0+X3P9Nc1w2QfQF49cGAk0awnQhzz9zNXY/+/XSqnMw6JiBivE5uKUczusEOZyX2dPF4MU+/uR6VpgjEIllzzDQnWqITSpwf8RzY2KKs6NmqbeqGESgw9teLFIXc/k4U6SXEZdlhWCJrbdiVdxpK2bH2natNzWut+pQtbrHVZL05ceORhu6aNLeah1aSckiKEGQQiIMt/X1mX2k/fG/YVXnqVXPYUQsAqu8nZbiuazt+Wx3vPa5SoeGO0qRM/Zs8vyL3EF/RyV3q6ktRWi6O/F29x9EoXL4sHycgRxea/vlPqbVPtx3PzMrkrtbitrkUF4L+xxkPJ7TWsbNvfynAyMGlW3P9UKvSZ2kxJH6qDBiD6rFFHvG2NiTXYu6xMKbOBvV56ar36mWmMgTlRlUJAptqLqqO5nVEfmoyhBun5Zhmp3pl3rhCHHDLpNXeUPUWmvVPJ6QIUTmE0ivcXrQMQ+kWurFqgPddFCibuvT20AuRV9Ki1y2u7/d8yjHdWEY1Wtr6Mga6pfHQqNQB/k8KpUTud3DmVyB0T2McAe8OmWiRypmZE4SMleylorIiog4uqm3HJFq6+PcsTu4nWuQhXeoEBxiMu8i5uASlZ15U9a+cwkr3CG9Z0g+weDfcb2HUuUqxozG+YRiaLxkhtiOPSIOFYsgRSDY5xKfz2nyo2vMJ8hKIuGaI9PGKtIq5Y5nKpzNDY0z8Z+22tzpXpt+0AbaXhihBDsQ2nSr19AwQcMKYoQnLOyDfWC9FPlVp6p/SI9WJV9bc3Qj8WO3rkye4TRjcncjj+vBvGyZ4B22r9eDqxg8ZgyTzFTbRzvBqYgoobLM4UZsIpOUiNxWrgp7tk8MJyiI8jaZsEghQjaq4lK53wtyBZYMB94P79wbgTCICrGyrFKlqh22161/HCjo6K+g6d2E5SAtk+D1M9flY45RglwoCpMuXqSuoL/W2206HK/01hFLg5w9Is+5Xw0tvVlL0V8892C2yy41SayTYZCnWytqk3INayluJGU2TzOD7xqVXdx+GGI8w9c9s5JA+DhxomPOdt9hVdyYy3WtCTv2dmZOh8wSFuPxsuzMdzLH7+PsrF9/3dJKutp9Cs3AqGZWls2iLVI0WzcXFej4TLXbWut7HK5IC93rqlV9TMPrnTvOUvqKKhSl1eb+9NVuyh2t3KmqS8fMR8uFCTlTshEqtWURKt6nSPk4yAghCCxvYwXfvYy2ndkduVsSmS90RKJlfo+He4/Bgsez1vL+HQ8ZFndmSAghmsQpdSpV36VUdf0aTEvSEtLuXrV9PttzcR+IU6peGCVnuqI4uwalPUMjE98wS9y3qgxR97Dh0smqTlP31oASLB/bsVYd+63OCrHSayL6z7SRQtxtipby2N2FiLDQiGdo9ZEhTN6/HVobjV7pSOxNT1NxYHyektj0/GDVlpfBHdQIQkuSiKrzHl4czSNsqMAEijT7MkK1rGbtVGg3shIeeolJ1iOU1iP6VAvdNpk7n6rX+50+k6WNqLSM/j/ztbbs0+y7vw4h+8Qtp+07t2/LSEsnaDu54tP7GNVVqta853xpRFMYFDraW2jxjMIdQW2EntSl3WH7iXaxj9vlwqqVnRxXdSEv3evas5za1XJH64AzZ9C6c4c93Xr06/njydC86F4uGHIHudNpingNfCjnttb45UZQs7sIFu5bCMEQxIX49Vcf0rK/ZLH19k0kR9DkS6w2aT8zA8Wp7IX79jqjMfinf/ovt/tubiGRYYzTdUbGIhbxbEbl/cOSs7LzEiIZtO6uPbqaaPc7jqyoVn8rpSSM6uooIrKE9Dg+JvoiWB9r+pxBECpURzhsss5ay+qKqnwIGUJECqIfRHU22lw1h7BMIttRuBTFiWM/lCK0j8Uom0tEdXffJlm/3MswzpjkmkoyKy+zZmaeNS+rIeHlHr4uTlPIfBfhmIFTN2dwUx4cRPBI1owbMRGpnlVKao7RIo/qMCscK/e5XYNiCJOezNRh2xkbpCrVwbmurCXzM3X1vrZdQgJvNoLmGpb3cm1Eux20d1NuU+ShhX2gIRAlGtq8FfLEZ6groqF7f/l1xS/vxt2cpTobs3M2mqDufqbQ5q4i+zuUnKnKnW7xmiLb2hpoiDHycq0GOUN8MqhR9pvlNLAC29G12kuRHrSOTzRTJ283G2bDvefW82dtuBDs5TVYgp56pn0O87EfT03IU7rnKjP47FaqPeJfwkyEnQreYENsSswen0aY5RlVvzlbUpYpkiLTZKrcW1RIRpKP8Cxi1689DvVXkBIrpl+/i/fvu3qkT45vbvt4zT8RkOqk+gnaPNA4NETpVuVKs7TyIEL2A2MvEeTfk3P1cQ2HjI+DwiqWPG840nk5gqDzeWsrL/Zwm0VWF8wECRnKXtLR3ZlRLdkmLXDz3OK6grc4FQ3fqhHc4W2/aZf6lokRuO2UbRdWh1BCWDLE2rGtV6pvyzjutJmM+EBT78pJmzkkntU0QjMYFNpAL7TQRs3rGVQIOgy3W5jmNFw/HmF526uL6Dt5EVZzSuq1+oR6W6+t0n71C1W4vI87PMKtv82HCuryGjRswdohZ7w2bEHspYVUiKDJYb+8X6aBUXfnqTvpdDndyVu25If2c+qaeP3Grb6feQhdZvCaIF1nea6CKy+7cqLz9/NVUsweJTUIEmnkZi93yYnUXRrWavpW57RPg67qk+aIbLqo+Y1qrVr8M0XBEO6kS+fmF2K0jtmqPj5WClXERpZmeNdYVSsRMmjPROAoquYMDSnd6Et0oEqkTXWI8Xmm4KKUgdFtk52OHlcWDvY77DrzbUhckrWRGZdkbYtSYiY57yMxzUTWeR/SsRhC3XKGajGcEiEiFmu1iJCozfgeqa5UQdNig9ks1j53RTOUECoEh/SIvZId1kWsnXlT7sxv26zT3ydcdoiT+fnMuZXsobD+77PR6Lyuo1ozCAK9PIPKJzSE86T622nE1Hv8+Pq8ZoxVHQl6vO31eC3lDk9zx5M77n64o/7jnNf3RYs23KW5bdK0I2hdayEQ7AmPDy6GKJsQzJuwq0bKcTqI5X2sr7ZHdaaN7q/6yITK0w5365Lpx+11rYfb6wx042Q/C7oM63H718jqMmlW7XAdoktpqS70zEwWGQ9j/Vm7PNea70rZ1Kv8tLbYKN4X8lQthVmmSIfsukOK6mIiAvls+0ofu+xMU/XOE6c+GYSwaB/XDuWWKOHjoGziyZdFc+4ccvqrOYpWVtEH6evyeaIKOyqqbqNfqr9JXSr46vG7vR33Gbzjbw+59oYrhMbrO48hL9aibvbwk12J3NmppBmIVCp1dlUU4mViTszEIyKCiFTt6jG0qBZZqxSn4Jq60gWjg625XKNuC6KCqbMIqYvU6r+tEmvSdPvWu9qdN9ntjVFFsddwbeSlERQtSkaTw4auPTyDCqLUtm7xeX0en/G2V/fUquU1VnXVvX0u7sn/zrOXem0p7NGcce/5HaO08etodBMogV4GgZQ2XkNOawlks3Aj2jG3XII4hsmbnNsz/Wr7faTHvRvaVt6ppLslqITm+DHsEOoxJ64xsLKgU2bRrxoe7hIe/sfJpHX3OKeia4zZ1QKJTBGRry8i668LWWKL+hPqpLo4o7vfGkIk1QWDsCWQGVWeWVFxvyZNu/VpX07xpqpKkK749UGsLthTqOQhw2tqf+lBN7PRmKkWhFawuugYdhz4gjP5NFSRi2T56rA5OGw3RoopZ2hZ6xdltoRERw1BCyohGHt4caeMdZYQJPIqUo3x+Yx7RBqRwnmiIRtzQlhTxnuMSs23piucHr22ysd3PoXx3ErIiLZluT+YNPbdt1xsC3H6InPJdHAVx26SyrhnGNVeF8bPbtr4SKFDQ6Oh1UwR7qRHbCNUfAZRTXym1btPNF09jOtbXZ6ySvcXrtxeZ3jS9uV1Nnf8uuTOEzd9Sd177Yq3uRti6whF1I4HcTd7IciJILfJ5TQ1PpkDsYTTCtpe361mPBU6TphFZex2gitdBM1i4LH0kccvT6hW6KvGTOMXnqYWfrZMKKMLqcYi3JQIdvm8D3I2OQtnsLFNDa+xx6MhEi1FZIrvqiiiInpgQ8aRz1xjY5QdDunjRFQkKix7Xst+PUsvDyE9oYP9QRD1XOiyjq5iIdpMC8KvLZvQMkUp7vp5iTLxWrrl0g/Owdxm5pVk3w2hJfc1E5R5cB5zCG1IafVmD7ZGa/N5ANyJDLMyzml9drc1S2oSE9qB88hLM8kz1Em3nGqdJzrKiTx8HY2gCOY6I/3xrrZju4WwCJbbH6671oSjQ8aPnfIRnGT3PJEkHxfWG03RpNGEQimRERmXQCiIZ6W73Sn7lub6DIwL0ZPY9Oo7c1u1Urq3veNt4H5XcWrOxp2XqjZts5dNxGvjrnINQwphE4ibbMiJ0xYEQZAaCOtADgSxFzmPfq+D2hO03cLprU+Sf+eb0gW5sR3f3LTPmuhpxrh1/LrGfzHu8dmBzlxSp5GqsY/uNRIkS8SzY2m7XWy8ZL5JJKLLi35vdM+WLlWB+IGpmVXBRnWIW6a2+YsK+r41RpQ3XUHYKVlBWSzPA8tRqgYhfDg6ym2EnFItpmv4NV9UQkr1zzmiKHXPmi6fl8xAs4nEZhMa63g/GNhequUHZqIQZAaphPxwRyLJeQ9nz5cget0NEmSMNYU/ifE9tNZaiIgZmSHJvp9bXLvebNRgqJettXrXJ7hRxWpxZ1QQThPO1MW2irC/Uq6oy2W55CTRhKN31Bi634n3Lwye9WytMWgO0mhRArkViyAKckagLgLnVxQCeVLvQMcqdL/s7GnPp3BGW9WWvnttqZK7jbfb+r2CVSPueJtuNCjxusL4UIGcEJ14rYsdhE4JrtZvyuTwNuvocbfXjLba4noeH5JqJZ9eIzLb61qJfOci7NUNsYPgYVS8/6b7vntmmj6EJ55t+aVlOPUYqX/KUEUkVqhEIzdYkdpsqBN6u6JeVaHt9PE+1amFJ05WRSOFUX2S7I1CteIWMM/aklNYnMBg+FwYahNqrW2vN6oW4UHYbB9+3tC7rED3cXSXeea8WOwmou9SU5BvzvkQqtRNB5UrR8hV6ZZex9udnGOofb0p10UtSiTVJTPJflL05oZZ2r7aw3Vy1nUXxD4GJM7SLM1BUcx4GRRMU7KiRaSap5VKB6rgT3h97d7fFONjFilCjEvK/C5COFzW7+La6csd0SEqdH2GiEjl+UQq9+ffqaHTm+dda3UajZLCi0GhZwmBlI0eUdszf6BFIwriM7Gnp7rqJLqQ7W0vsy16hjvcjfND2cvd+PWePRfU23hb15PttZ8Wgh2I1+y1V+VG7HWdEP/5uGwsAnEMstda2vaPhtyNCZ5SU0bL1BWhkZgI9biZPAvue30b59MdTuQKWnnm5fYvmkvYG7R6j53uVpoRE/dz8x3i89prY5ESmfDNYUOXcZ+rLDRHVhMpofvKnIbvr2GuYBJilEfUNw4/HqERK0VIdYolVjSseF/rxer444F8RPM03QkRzoFUVtSI7oeWMsMp15XEOXSuj7/ITI7IpGmKXEm2Qvc56sob4/OKrE8pzzfejqyn8TwaIcvNIHu4PiQZqhYQomLR/ak+VTRPNSLQFgfpRGb85aErM44iNuI80ejyNZboSbd+wRLCarG1Wkaqbl9mpVxkROY9bpORpndSMZOk2x37LevB23zO0siMohnumwEhGvFsCFKzH8/6rGjix6eRhlwMmcNCvF1vttfnOvP9e22MPbssXZiNnHnBYzCk9KU+rBJn0OC3WItAbmshtM7fQgXXS7AIidMqQg7k6FeP9vbnmd6l1F1MWjqd+Gejz/TjpCmN3GUpmm0QxmvxGJiDbsbg3sJ/iyiBr3G6u/q0RLLECmpH8P9477tEFu7C5pyq7hGqd6ubErDFcUNF8j2lUkk1VYj2OSW7unwsP4/glQFrDoIlnsESDvyq2i/EJgif5mVXpmihJ7rGbC26FxqhfHqZXKyyTGCn2SkkLsvdvrmm4/1+mlKY/Mwg1Ya8jdJ4mRAxzbjZA8VyRLEzy+jh4PM5wxq6VM8ppCIQrHITHjKlrcQpnEr11Kier0NvDPLCufdJeoi5iHqXi5TZkXmXizPI2reuO5bLviue5zPCehvvcdducfqqnpH3ys9+VocWNHQ0MukQSpZFyn2MbFKzIY9tXWnIB6Gw/LLLmM93PsRf2HPn1A60rf/VKbRv5I5ftp+tFoJC060WlRO610a8vbyPXwbpJ86X7hCnIa/dp+2H5xlL2j716Tbonu4RZrekttcsCnPhZp9L0NuM0vH+JIvu/oV7e/3hq+Vf5b9bqO7oMlhuSErElCAHdbNiy7ZfLStbn3O+1BHHOWds1WhBVKXI9gy67rEJkbokl8jYbbPs1oZupoQLqWavEtdzU567pHx/i5dHhpahQwYRZDa6D7RqESFKSjdUIfgVDMV9M1Ny3silBNl7bq3b3N4+xsfhkTXo1hGyFKHlxi1XKRIiM2wh5LyzX4+S6tgsz6ggw/Mp9B6Y1YVmRkyciE3myvSdQKzfaUHu6qlyeqP7RAx0ufimNKRkxk6dbottYlLqEvNuJyyLzLstKPRuMbJnEnmS6T0cHRk4NKP+WkGjQzNo7BGb9gy7EB/ngzxBtfiMH8bAevHs6uJ1rLLeUJxxxt2vuw2ekRPNmRe0WlTFfUGJeg1nbFGEEhvy/dyavZa8hOyXECbON9nE9NKO+7f9D/nmz+yvh+5+NXfzmAppX9HttTvfHy5YCGs9c9LWS9jn8Gj28kyHLkx/e+ejm5JcF+J/Uz1SLcYSK0Sbfh0xrLJg2QcqxG6rc1XpGk6MIzkCpkhxM7/310q56rJmFZGizVe83nH066dzabazlIDZ8RKsCosQG4eZhxD5EMO2FaM4Up0ooY0+jVQTL64Ph2o1oUYlU+9DZzKUSNbpaf3FOOfFm2WMVHZ8Gef5kCKOI+tJX3ksPUhNtPpqZ6gCc41awWycQ2jvUxidqmOMM+ctikh1fkaC1RJuBL8oFSJPfHeaoJywT94vgoQMh0vYfzKdcd76EJt2TZ23RIvThOWapPg8E6U8nMrTLVQra7Hbda3hUtBxLTQhQ4+QETT5kPpTCQTOE2hBs4a3PYH06qmO8BTO3H7ZUrf/1b55vdb9l7K2nPG2mrrZ4m2KuDeaE5JNvAb7m8C5HYPl4w5y0vH+aav375mWjkY7yEmgSzIJU4nXRPWC1oOeOv8YaY3X5/rho/uXsTxCcuLOdHRXiiG0Mblhil2dpAMRkZPw3ti24usI8eOU1xmFLXRFCoUQSg2+y8cUMiF3Lo8Z3bPBcE6vjzkwCqGOUBZGrb2qSSgRdqboMFSrFGgEqf5ynGAFYT1aINyYtGUdwl03k5FNXOQ7h+62PC/nzTleyEq3oiVrkOcQFHQjjy1NUsQe/2Sl0nbZxZJd2PVI8vlEV04Zfkn1ExWhZDC5xcusJeR/ZVcqUrWqWrXiaOFbERhd5TL1u1wT09GBwyJUSDmGDOWuJdUrC9G+semVJE0iiTmPZf84NIb5jQ46GikNIVQgzlS4EMNt4ol6OX4cP+5GAsvboKuOZVu/PU05r+f6llvOy3evb3+tO+7L2rOHTvSMtyWwrR0sNNDtP81eW04qsP0yVhAs/cFAipi0DvufvZx6zRdVWx8qfUItHSezuklwvEaxQ27qazHFXgOnt0GbdmHg+szNvTf71kbGSfWwyzkiIsKcMIgrLqxlG7IuFaKUqRhd1d2zx5OQQaSHLqpF5dEHkbq0eHc0X+XrHVd5mUGKhEhyNmuJO7iEDWudH4SPg7CVsLZvxnG2xmykEGnVZShcYx53O5MZkOPxaRGxPWn6213H61E+VcpWqcOH0HDWroE4JPtZ2462gnhvZzA2AaOCSroBiUnUaDVPGWZqm5HMcCJnJh7hiXCTj4jIrnM6rejo6grPbOIa3rU+V6+d8h73CfuWDKkPYcu9wxJiS0fLYbcrScsc79/RQd5W28vS67HpZ2XMQBvVoZGaFULYNS4CzX4C+xZxg2B/VZ5A33jKNdkidG/j7Tc5MdsYxdrjdRnqfeqZQKFBbcs/fpkqH9trfrEaN82pey4mL7F9exsEQQ5EtfOvrq/qZ/pM83Q/0zTdp7ZMJUXLTm6v58Uly7Met3bzqHrf9N3lxb2sybanZsnv3Fy6oboqfSSeGRGEJTJFbI4lJ6+Q7V30bInus1XtPOf1DhUE95O6QptiMjSZc9n3+PUgidq1bXfepX0ahrG8eNdehHXZWStWXOkh2JSGpLR8aTGjzp12VIc6gR79LxuBihkzR9BQeAar8iJV9Ot3/PoXM39exf55rJ7rdnnfUF1jzdtyeS7LDq3d/0t/17RsrWpiVqvvxFtubW53jyM1oXiT12XrYo7k9TzvjcmsmCXpu+eYZ/JYWI6n7BinO8hsa7GjXGTeSrPsWxfr6h0y0r23u2X83Z3uVHfnO2+m/96n+u5ltNrPcn43RaEOQaj4PA/nCRYq0NCMVRxd7Xa4byw5xbHct+rLccPelbd4hxJF9jvsdzbbaUr2wcg7PoyNdWXgyfUglVnbN+I1EIQdCDUpFBOKGvH6PuaOULHeco7+02+kq32JIFbzNZYW5bXEYpD78Tyi5p293tye2Nyqpl1DP25aa3287XvOe+j97c1MY6QoZAqKSHmUdv6DhRI/7l4or2Otu9YKTZsI8TEtU5Tw/g3uEX4FPg3H7KnyrlB5nsCUuJaUwVFriHuOMRVFXK5NLoggCML+hA77eVncSOhiW1RyFzZrsHF+GhggkMW85YVm4+2LwKDJKzsoOuR9ooGDktedZJ4gC5O42dm/i2fH/twzObZV5Zypn96hWd/DmZxEqynqND8E3ysWzPlPfvZxB7qkd6VG74HiyXZddQ6ZtW66WYIwGWFSezVbq0Q3FdfOus+t/8z36jtvxm37VqyR6ts92g5lkpRk7qNQlBJIyUe4FJEnMHRXk1EwivOWA0teX3a1+66xltt1qai92Z7Hh9vn95M7t1+bvZnAdh77tpHtPIjcRkfJCRcEsVe+CVzURZlLUZB8X06y3kKfRKS420kyu7uYi9NJzA6mxtmtXeQyTk6beL299l6cFDecVm1PbiZ9IsSxfTuLvTtH8MEo36OELkdkYzmFz2inW70i73HtfN0t+kXLD6RLqptSSZGUIwbxFhm2nl36/b6ImS5RfSGYZMqMMWns09rW9PNcxApxEnJeU3Fe+uaR7aGQw3zyE3JRZO011c06p1CnDZjfkxDIlNIeI8DsuwybSCNYe+ukRmaSoGSWa8zMyiyJQWPnCTpPOc0Za3KdnbyNaUplasUsTEX3NyZmglQW9uPsf7RNibtH4j3RcZawz3kdFvWWINPBndnhIvsEwXGfrFW37U9Hu7ZJy2zvsPMumZ32HSaBwlCulFMoRHE5L44fHkrIEwzXJvRGym1Xb8Qc1W4ba6OLMaF9eId9cotdO+7cOYHRk6LjuD07B7bVoyF3bDvuQRyDy2vdDWdOOHFR16/Xgsvr9FpUpyJ5NJG7VUYG+ki3rrieohI0ZRaKuXYH9jKcuJjH63g7s3E3ZX+ayal09VGnj9H7h969f3yLXsU5+XKKCJHK6DRdjGTe17v38RrnlNS7dt7i39WRCUHE0A0RFVmZQpq4b6Wv1I7381KvhHCNa1Xi3OTzhdQZFjdx5hSul86CItDriqH615y0pl3T2Ter7qNQ7KCSmaZBlMsstxT29ooNd8yMl9rdKKG94DxfzmOyldFTcIRQJoyd/eMiu23vSTlbqt/NOGbQc+zcx+nUPGeW+D54jpM0JsO3xtDsrfd3+c5sKT1TZe9WqM+DhYMlpRerg8xPKWHnLSF23yGs7RYOk+lLCM2OjOvWz20ZeXKPmO4uNnFcXSjOk4nPcBCfUQJN5zPQrLde29/f3o2uXtiZm3btoqtZm+W6y7af2W3b9p4eenro6XUt3oH9dh4fpjIX7Zh3IdjT+wnEqftGvO5lh5zhggs1YSkKhXe8vs/2Pd0dSXYcSboo8iRSs7cgW29n9m519lQ990OeMd5+G8G9zENt7NKq7Ful9zkjIlbqXX/PpnP22YoaSP4kpsWEmd1zc3Ooo3hYixvr5+vrhRpW8zMHRYeSigRRMGFX0VG5z1LPTiiz26UJMi1MYSjdKXsXfYaXIXG9iYhTHplSEq3R1f/Lx3b6HQT963rDnJce7q5Q5F+vIiEQJlzeMGV7I/F55VxCIiFKuHx64nQnElIejxoE+nJnGk/PtveaKbX2s83hry30MGkzo6TUjPfR+cVEK7mx8u2e9+lnkIIeR925o6ZeztxH1Eea5Y6OcbXYVWLIXOzYJ7UzPCO37a9DzO+RkbWkR+q2MBXVqve/k2svg2tl+j4FIUoQOAiipBmKZri2a2NQvRjlhUx7Zg6OL1v19un3Ytvb6dbbpzvunZONuPfAhh3Hnenf9g5bSrjE+8ZtxS+DoPxnC7cROfnsh6jZT0WSp/gmd2tOfHXLadWduKUoXQL9S5dyC6UZw+Mi3q7j5R+0Vp/9927RtK6Zc8bB+z0zJkyNaESkRCpPig5dLSN0ncP7fn0dq53IOnFO0SUimES7xDNUXfE95SbP5eeqvt6ofpMVGUGQeQnM7eumn9F81SnDmIs5Q7gE2UFIULgRtfrdVxeltpeCEtVsdImVW3UTxoEUFDgv8TZg4NNMJVYQch9GmW152Zcqj4mSOzbawNzd7d579qcmmXuvhja+R+Jv8upufJ+IEYJIQghnz/E3fYb6jjLpsTIKizOIfWtlSLWsg9MtRWomLIf7RNn7l5B5i6hw2yLuTJqslHt7Zsmkh2K7+36SKOc5FKJEEaQ4EPZPFdcX0m4bRpGXt9p9QyDLqsbywr13uEk5fDIlxZY7Nmz2YfVd43RvUkFq9TT7C4Lp5X2I7W1oNpZvmAr18rqSYO/uJNG1+RoVEav/oGJ2V/L1z9bXQIuLzXHcuiNO22u593idNSd0JuiusDdutpSI0IP93jnvcTapBIMV6RLtZdz0HChljIe92j1rH7Gq9srPTJsi1RX6kMKsG9Vk/si61z5J9I/7+zkeZcP8nIcgyMcUZxKFMEtVr/FVp+c+Kt7lVEI1zlOn4dpddK5AOQg+KGFvXdhjvNZMeXu8QhY3pVQP9+ITgjZhodoyGtTRwl06yMtCiEvlhHRx3tk/fiT6aE2FR55QL6bM0e7oZVHk11vCZu5NGEkq+TI1vh+NVFAmpevUkSu2+oo5VNo+O06TMadl2LXaGucdV4uKbRaRcrvrt8XOZPTX7dsTv5n/6c2155p/qktxrSOI80QJXEV8nidCW2/RDDPO5doI9OUtp/pym2lUW0638+3TZW8V2NsxlbLeaz88ECo2dvawU0EqWBVv8ottCUFOCImpKKjLvX6tGvGRURkVjToJtbvI7Hz5LrbvyD90/gR9JLp2wvz9pQgy2rv7nwfFnih0DTfzcFM2ZEXrOl19Trt99k5aNAwNzoxmSFFH66dSaK1JqbM5Z77v11p29PvW+0oXzAlTfIu6c1jzSF28//AKXLb4Ydcr9x1VXRfivi9UqtBxWmVVG3bFXXVKiPQlgvRTl8tk8JgVVAU3yWjaHWx1U6HOGW2WQWSAkoR5evdT/Glf/KZswzc/GlFLXga3XEgeD61EkBc704+OPhKZM/J4n8bsMePuCM02K9PJN7PiOpqPdy3OgAGzDNToDD3EbFsas/RnlUU43a4xqfukRVVaUCFDap+QGc4lPeG0nW3tzr5Wd6Zvu8bpvgaDnb/2eJ1OHvXZ9KlrCEEUIfVSIg90Ztpte8sx85Zerh2T9Cq3y6va15m8V6NSVtf+YF25pVLItD0HNE0qKk7DneGJ03CTuhxzIudmBUE24u1exfKfriu5pStJpi9k/hGvs3WPyOyKSOkSOiXVbStH7e015hyaYz2DKr69P4t+5s2hPPts3Yi0sd/2vvvNFQS15Otv1/aWY4pucXC6ZHjXTts5ff1hrXXONmiqS4kmmAXBJCpnQ2TMi+QLZVOkg0xB/PlN/Et9VakxRrO6xvDcueLMGYLUFiPnKRQrZFylO1qIulBQaSP2PksUnvYqQsIix5T2DNnAlridscmyvxY5oxLuDQuh7HmZnhKMVlF7TEQ/kOlxnMlIf0qqDZE3nNz0CGmu+Pvn4Mai+UnI5xmRGvqfyojKrQdOHGftdp+w2g6xLlJuy5g35TIxF1atJm3tc69vXY05Jet+53L1vubaMGHZviehcs2Va+mZtwjhUH4cHE14q0lDl2vH9cVilMbu8rp/662u9od7tE+2/cx73n7roXmwH+KK871TO3uw4w6EQsZxxzGqQdALArEFhWIWI65xi69UnvSJ0HQS0a24G+pMTXPv7qhjUqR/aZucnQe6pww285gTF2LO3u4mc3+Ilp7do59T3S/n/Z9n08zHhOQ+OpVIZTa9MXa0E19mazu+1/33+fqy9oz8CD8imVM06qJIqkrEx9dtHzf0Mxul1/s4qv3a1ESqqIwOqe7nnqrnXISIol7TqgTiSaYHt35nCNH+1N6NKPcYPc5t3tzPPWPbAQKJaMmiE2MA+caMetTvEcrnBHlM9kQvTm1vI06UxO7/Jf/PoXEIPJ3r3W9Tf0eZcstXJP8J/uZJtB3pDhpkYo78zf9EzYeo0LLzn9AGjotgEVa52s5bwV1bWsxSt61511vEWmxPtGveI+3O63RfSwkzfxtZpr/z+U9TnU0U6u8uIT6jRBE40Lo63tLQ9dJl0PWqtuBA/L/JpRfL7Z2yc6ewT/aGdmyblLjjeDvNLQyeXLGxxem6BgK5s60tCMQSr7FXKD8+XUgitpKcUFLHLL7ipAuytvK6/LjJ1Siuy4mNc5K0McGMX0dHu0dpVXFwPwfp7tSTrqpoT7JJvo0wpOFX49tZJ+qh+iPddZSeBOfuP+/b9l5nrf+tl2q0j00pEa4Efo6DqIh5RIaLb/WeakfoHh+DcF0iJ4p7lvK1a1QlT4hHohAuobXHaKx+olxSojsqKuwrqMNAaY9UzrS3OUlWyE8CnHZjzA2wD1S9/TWsLxejuI207C3zJPttewXb5ryz9pCOTsex75lqX2ltjbw/lcE845g9+K5b36PN4FnHPn8/uvG9ll6puPNMomb3YvY2md2seg8yp1vaPqdbEBNkJm+RcSwXsc8h00fdR5irY2x39J26375MdK1hwkqqg82pf0Z9yuw/h/gMDoGoUhoNjdAMt2/JQhd6i3dZbDO66MufehHuFrjjs3sjd4rVxjGoTXAzz1KQO86HkCguCITtPyz59qJwd5AUvduRTmL7jnykJOeQPumiyL2kck0okVS/+KxgII8x7cx6TsKyiPLH64OTHvRpMbvE0R7tTJWZhte0xM9iiUw5X+Mh/pSYOV21r5e32j3uG/X3TVWkmnjOQg8fE4Er66ioJWysc/SYgiAyA07gyw8rqgmGeRH03Np26whkhL0RXMWa15Xd4uoSFLq6VZvSC0VQhAAMq5yXCsCfbseLZaVbzuAc9QIRJd042SNUt0XFae5BoOkdz1ZTe31zPi31aZJUZuoraVr/wU6Hcbz/v3/xXWJmDilD3DWbxl/O7x4ozqGCfe29T4wlWkrdZntnmmD7ftyplXGRutE7b6r7zuSti9jm2m7EdO6JNemovtYwBBVvkRCiEM4TpNHQ1dHV0CtwPq1yKY1AF82e28y8Qwm3FDbbJ3dQgXsbnnmkUjl42DbbdGA/QhGGjl9nI16z145f1xwZvRQjo31DntalJN+hk5JbE3frIzwbCVJJdW0umX33tHdqtQ3FoNzHloG9HnPznPnqOZNYW/qrQ0W6sa/8Iq9JMw3nQZ1e7WX3PjhH0/D+std7Tt7369y12GvPGYRUJylslWR29ijc+eP6Cr6z/GxZpk/Ix+8xz22qmlQ4pUamqoxdpjgvks+lhx6k4ZRtD89eZ5agsd+HYOflMPSGavMpdw/MoExm8kOg7WbFxiA+jvJoK3QQSWYROQ/yHMYNVeqrrUJqn1viOEJ3GkvONvSsTHdLJmfsoY18V/QRni2b51O1Kq8VKkFvozDLzKzgONNWmjWq+w4y7phVb8XkZ71HCzJXI8jc8TnCcuabFiNmTbrv3MpIrsrLJ665nTXpnn8GUeogSMF5iyAyDbc9jAlDuW2hMaDLe0G/pcuIjR709LTT6dEn955m2M53cHkaqcCeXhpCbUgMPMhL9jf5hiBeg+DbSWpE7hYjRWon58zSKpJ0Xu9uRUnpMLs5KS7asXprxSX+6LKZd9eMtx1G7q6NrmKb4ptIS4l+Tjn7s3OPGiqqM0RvUwy3NDFGutuHGy2Nd//4Wvf6qjdCQWYJZdBihvJv4qIc5x4xVNutqG6n9uUWHyowZ1QPi1T1qC62qJ4i3JDrVLpFmDJ0rqIzroUgBFfsYUu/5KruadgzpQeFsLIyeQCy/+eUe4HvXq/FPp9KqiCZCc5MF0I6e+d5SZDWPv+l7t20RI4mOhPe8a0pzTjeY249knF+duTIG46/Ocjge5l4u7gzO84sZ6yyeZvOvT7PSrHDviPc4pi5qn5XX1RYVuwpt5/0MbevO5ZO275P2NdpFZwUy4TNfKrvIYoJUYjvBEKRItCE1hpjKcuohl6Ia9fwR5c/WVE7lWuv9yqPT6b2jj8xlYoP13v/cOztNJW5Rq5A4LIW3xD2sgSC+3dkBEnplORMX1FRiGTkg2LpjsgkJYriMjstXxJqixNbutb45SzRF7PUSR53CLO0tR1yYnZlV2Q6UOR7iUVEokqYp/FzfI3ipJ0ybPaqc64/5+61PKsaCinxMcKNVB8R+IIU9PtwXm+hO0kiIWCgqjEtlU8hLDhziSANGWJ6acIpyJDR6LVY3AhsjkLKrToq9zi3rApNCD9uC30HwwbE/UwVrXWtINw8CNroa09eFhpES0vkdmf/hUA/mhZ6Z6SZ+t5j9p8y2xPH7PGdqpkxjuMo2SQnzZRaKEYPKHRMs8Os6fwqYTO2Oi5OERY734uJcpHi9BX762iurfuXFVLd1/4nI2PNbV3M3RVm/h423aZjxQzxvX9dZ7r97w6CPCnitjOjoGJ0HUK7bdW2a+djYKGL/uJPrDjeOz77kHdKyun0qh08mjgNxsdxerEEYq/rO0sg8K2Tb+Tffx7ppKS7dY6IJPlOW3JiUpTp56WhptbFVNpm12yVUNaoR8r5cLKfzc3+Jg37PuSJSDeV6ppvvXvbOxNTUwwY7JD3CfUMWoSo2j2i7N7JEvYXUi0xiRaZlStSjaqDKZtju2Q35R7b1Q/O64ggfFpCOAPjm6H2dsYwXeNMxEbYiHN/Rj9fYoRaBNFA2kBxHsYaQ9RRXluJ10TMAzRhuBpxPzD0LJQehN5q7N1wJQlFlrZPs56m9phORCASYWp9tIhHmBWdHtPUtJAO+wiaCyuoiafu/lQSncgXdo3YJ0sc3OUgxtGit2afi6gzWGPraJZtrpB6Dzvj9D5p2267432SimlZwSSuykhsbPFz3+mLb9v+dsgTpN5Cc2og7VqIdh2q3b/Va7vtfAzL9U6FdyrKPmSnopDauXKC23n+CAVbd3wc0yMVRLFlIBCs+F4C8Xr5yzXSlVGS3MP3VKJTga7ky011o2v7g2xF0S1iLVqR2muhxOWX9zZDbP96vYW9MedxRDp1arQnmqOznp285stCpMdtRSLV4ajZ1cPQKqaM5cf6OesVE1N0pUOhGrvERKoPcmIR72xYUwRlluPzEJGu1bayUGMMpZqQnCFeyx/sz7z0CsrSCjYfonYorrl/1tT6AwobCqWVRiaBLCK3peuMMVcZLGCQ2KJ1doNQZCaMhLJn1pJQ9oymyc6C4BDBIYLGN4euKahst952HY5waf+rnRlmO6m8URMtI7rQ9F1T7vJR18pwPph0u23f4n7gsN2k3uMSjibdjtXfYK/bMlyTYai+tykTI+wVk3uS7+3Zefarb3fv/51BkOLIjHbbjI/j2m4bRtEWulq16xi/qkv3aOe3DXX75Pbxek/k5MNcHcctDOKGAzKO8Rq2IDkR9nKhRsad5XuonNz7NyUjd6d28o4/3ZWhG12km5j97b1j9io/3nuz4eRLLjzMmxv/6m0t6H2vxy/7QU5affo0TftHavy8E5kUQTnH2XrjMBnQXcYoussYT9zt5Z73rkx/qQ6zajCJWeJZIua6OGjWXu9SuyfOqSkRovpDioeaRQyEWScqdMUcrmeEsEmlwordmlMuooSqmC11X8hQhxJ76fKG0W2fK1fChCFQODb3m8/zUrLPuYd8OmsQHbJWUgnhUBlXhehU7c468kAHSR55tTmaDvk7Os+ncmvH7VRoXcbRWYkjm4YcoZiK9EzJcSepSFnkX11ibpPhNMvxzoXY28iM0y1D1vYP9tciUHmutRUuTvdlk8HQ+wfttffvYUnlcrTqMe9+O7RbEOSBMYPGcD8sdDWjDIgujYO33C5//LK8U7Ha6FU/psIth6ucb6kcjqm4Y6ScB3YGYkOwc8brSdhiLSEJOpJkQo7M2kTeU20tanZBZgXSpT9Cl/y0daGu2Ugls5lQRlTuzRB4COUxSXb579mj7VPdoys140CvDDmjGG/e4rGrH6neupmNE4gxByveiai1ZKL9oFtUMM8jkC/HZSl5/0EdFo5W69Pw0M4fJywvt6JpDIdIXNhU7NiigeoZFAkZal75qYYmsP1mcxiM0wUpCMMoT1tagYENujEmvWgl68sQ4R7WRGM9CXkORV+Riv3uDoeEDo/OYzlbdN+ZqXE+qc4QJfpPSZZv0cbR43Ci5bi+LOVufGXI3TIU9Dxx2rKw1O8lw1G3WcrVgpQ7xlKXVfZXlqz1nrbPvP6Vi5QwBzOfwoT/9Py3WjWb+RSOrcHc/7f2Sfd89/0O8cPGmKGhq5GZdm1fNoQuLLenjqoU2vnt9I4P27EhVFCOqbhr9JBLkRywutCBwI5v5CXxM1l+eaSispP6D9BN5yulq5JYhepkEpJ0tzCbjprKX27tOrD6wkG3t3sV5TZvlJobprPliU5H+K4RIZWTkXy5ihWVcnbzZIx5ut5Dxtdwuts2qttJlddZcdNFiyaazInZJfrKRMpd6pL5I6vi4+5gylTMBEL6vT6T6MdQtRVq14R/hQglE1vZnzFSexD2A2Eh+pOLoOV0NSlvSqhmL9MvoLQvkDXY+MYXYRRrKcHermV7vDgzt1BnPdJGmaWL7O5f/D+tn+gj6eg43nlXvdFd9u2vOyGVm5PZ98nJTuNiUbd2Xie9CiqeoecplVKZ2xl7869yOfuEy+60a2aiApm3LrPItGBHXezYrSaIxdpt7nDeWUkxMujNp8doEynE+Ad99axvp1vP8u38ETpu3LbMaPftfkyEOar9wVscK1fEW5SocMU7V3x+E3MxdKDoxOWYQcQxt/1sb4MGnWdB+Jn+ByRIpYvOV3JvkVRmocIXIXlKUnRLyelldztmp7tLglnRRf/Rc9NvszCsF7fWNUPpfZOZSj+RKqmW0o5+3lOSQvNS3w/DOwv9jMk+RPsaWvf42sqKu91jLaRQVJOOpO5MyrypE5T3rnmk+iCEvr+gj37OuR/Iig/7hK6tqNpdiMoYMUNYV6KnEBt6nqqN6aF0CKrEFn1QI7nHUHuOajbpatOh8iYo0AORubW4lWZTYgirjbpkjRCuLY95mccyiyRC0v+ys70hoh8IOj/LSH3e9Ke+O6NtiTN2UvzmHGw6+4Tt60EKs1jOyExFRgt632ZF7CUq3RbHfULtcM1sqYswUt0xu8rlsr+2bbPGhbmNDCm1Cg/L3CT7KTKy9Jrbwu3v/rrDbe3rDuLabjsztOuRaXzS7k+1dEEjZr6IP+f2p+akojJokYIm4jQGqTgNplf+QRCvO1gCQSpSE+J7yd3dRUklJBKFfGfjK24K95pbRskq+kMy9+wttiQ7cmsXD+4WBrUIedj0c6rNLj06/a6m6xe9P5Ivw8KaaTm4qiu0j45fg/qF6mxVn31er5tS1dKFqMTQw2QQzEjm5a0+zCka+pr9YPp0lI/hY6CMIWSMNXSZNXYVi+BxCbJfpkJDP4NAxn2ZDlv9ruoQyHFKlNvTkd9u1VAbcp2n7UuzzgM2bHyD8Fo1JTkL1jWPcVBDW+pd8jZapc2rnYkwRDroOL/rZ6V+tut7192Y9Mwt/5tn+VPHYXtrxw6J1FJqmTXDaNv3V4YuTp+bu044ttlnOU2Y29z+LvUuZOoo0Yd9jyZWhot9S677JUPG3mcTy5BtqiVRJveJtP7btGh3TGh9u/vbf8/P3dXoC4Og3fchU9qf7XLtm55rtVqtcihRUaEQRpueHjoVHyfOU8t5nKZiiOOKt3u5vA0/86ftp5JESlSSm3YSU2++1Gw6anbpOnFDFIUgv9uP2VYXJUzpS2Mv/6oURty9vL0XnDgZ3Scdp6qdqvbWnbNrkSmaCIb2eaj8PrQOTlVn0lLPibOfvda2jpiYIjMGTQqpLgqqj7DkYG0SGfel+3HGL3OeRH7ivmBmVsqDoVUPYzzT9RByIkuRQUucMoQ+mu/qv5HhWhbt9JlGnWMOq6kQJi2ASt+SnWNuBeAPLTv2EeSan1kPjZa1EY2fHdTOn3tn5eywHyJHZ1Ludrdk6n23vnOSvs1jOs4u6Hj//cjELVfMMnkmlDv5Mu1CS26TZB3mKCGOVO+M7Xd6UZkJHTM7V5ChLoutt8jYJ/v0PlkH6f08d1f3MMmVCvM9KhttYnvsvMNtvfPTdneedI/eFbRrw6hmlK42KO0a00DXXWO4dqW6Vzl9BnrQ4zTVqaj4ONQWx9wZpzmwU2F0B3EGOcrXYx1dcbqeT/nQytO1OypJtZSMmv7siGR2t506dDudqbtOWDapmH3broPS1ewkN130NF6j+595vH+Gh03IOUPqH1K/hughjopgTCEsmTO6d/+4nfRDq0KPkereGHtv4zPHm7+q/J3yRkeqS9rHdEzu6siaU8yfg8iLs+ysdY2YPtM3giByQ8VU1FolxjyjdG+XPITrFK5zH1qnhJYd3tyf/RZEA4Eyr+RWQ+nzg+I8yMxeHWEvubRhnQd7e98JEK9XyyCRYl0LqSh7XkZ3jigVnRpHi3Aiu9PHFMdI6w57Qx36Z43sHg3HyEiR7n3OmyPjW3e002Y5OvF83sxaJiVGkxJRvpO6N8m5JvZqyypiduYrjahL3/k5P89bYsgHgoPLxlwt5t3umNHUfKr5OUnp6ahQJq1tzwhz59t23q/9dp6d/i4GNLS4jin+eLsfn1wWjCpd1Y6lovJOBRWUnJw3KVLxYZSMhvjwF4awiYI4dv/Vjtyfo/48Dv20snfXRiL18A1JN11It6+uROGb0bqRqWt3wdqk4Gj4kxGNoEW9f6YPnof74eF/HHmi8ys6PVp7ulLfu2JRSRP90ar/FXbr903PNmYKQ1pVYwjPJ2Xt3Wutr5/XqqxVniEkUm3sm/bOg4Iiu5rVqNXvMFc3TnVc6PTpXeXTirKpVuIaQmbIImKJPbNF+1faz5SOJzTD2p8a9pJAME3Zu0vW6NLUpySxMglAT7bN44cbc3H1eqaLkK8vhyNPjbaQrPWlECnUsnQP+iQ5GzlI9lDGX/VJ7THbNNWUO7WzDe8/H5x91GZDmHq+R8xaLOVRRp6WjDQ0iXMTpy375AfPuoGDbXdRaR0r067ZUIGY/XXuHftk3rrdou5b/hvK2ZEy/3tldf1dE+ZDb3d/3ele43bfv6z9tUT3MjyHGU0XXQ0t1qVdu2hfplX7k6lURNqHSSoV3PEnrlbLh3EFcjJ0nMZp+D2fWSx3q2U6H+Wn7R1Kcjd9jm9mF33IjU4y9aaYa3WT2po+J3RRG7m1n2drW6e6DZ67i1HsIK2yHtlH12ytxKlqqbO965twtKT1zfc4HNtu/b5/PHF6ngMjpA59HN0/nzevbd1qUkU8q4ngTxHORZLlLjYXN++bU+28Z7vqewoCUTplRZgH6uEM7Tqm69LBtUXnESVnkJidh3DtRxn1ISuh80GhtKKrWc7QYgOJVtqWrMgY9h0IhCfZqI5IR8jaQaWIEGS9MTuSuIqhBGN3sYcHSSOPZip65D51d+sk6Yg93nI7qj2832c4+m1npLuYrVoOlLfJl4zZAyVmx7/KXkkWqXa3B4tAymVkSriN8xaZkb2/jhvYt+zDsn/FHftkkjGfmk+YnD94Mvn8p/l0srL9Hb9H/93f3p7+3ma7e5+fg2eNvdazn+P/zVBu2/2YAu1+lL5cx2d8Rs2us/+Frh79m0bLGRHHERqpOIby87EgZ3Ax8nzRz89IrXwjyVbnq6TbVpK79ZcMXRRZ3bOpQ211lZTdiEQ3CRa6CCM0eL6NMAjNbU76Od3DoXULqdQn1bWsSFCRPnM7dPI6MOr5NKd9jTWJwRhfc8baWJmTzJlrzhKTZB6kOiWxxVjy3jUP7sHeThzrPk6XIPAQ/cSB732wndZtn6ouiOm+xSLkzGkfKEQ/tx2q059gfRkE8rmMXnUMVJvuxlyQC2blpaQWYPhGKJShx2JZ1K3ECaLLoVBeJ8LhzBDLYe4solvkIWkdT9YarUiJu93yDBl95wjPcRri2Hgq22ucMs2azGKZHZ3KNjsjZ+TKuf57c1hKf3fGakKd6o5ZmX4PLBbBqG3bjR0tmu2LOxws5j4pqvk/yaL/5RS9bHfb/vb507Sw9VfbX3XX8py111oZMkO7HUQYzNy0PziU262Ha7XRc602rsNySVl6uNbuQTum4k+eNrkc48OY/vn+dJbl/Z9RH2171QwdJbP0qE3JLEnwpVCJ6hbJ3Sliqr1dDnt11xalu0gQ2tZxpu9HsWUMusb5YK8VT050+aWjp5Dq2kcL8Smm45tqwLOPPW6iK1Wt/9vYHX+Twqn+plhn71QF1dIVdEN3Yk7PHZe4vHWPeOHP1MNslSYSCe3bZai5OSq+qr62GLGELdPi2kKWTAb1sBGk+qQUmRXUdJ1gsPqBdc493+62SZCZpOUc2OZeYK56XO2rRQmxLS7IEATldQhlCAqNnDqkZuw+no6FtO14Qn7W9F01m2ZoW/+pSJntW+29+/s+7HXU4jhHxmH2VGqhmMrYamTSw/kz0dlc+Vc3PWJxkeowbjfRQgk7ZlsLtrj2sZC6T/T+R7nuMBGFkdWtGKxWHdF35ierr7bzGmju1/y829I13HYa2m3DKFpmZu4ay9dXqmmf7fFxQ0OUOG7n+Wg62mmcBtOd/ewFOfGnyKOtPyZP2ki+O4r45j+g/1BCRZMwW6dwr3YkU6OCWXu6EGcW1DnuJiU1m2iHmaFu17MZc2PG+Rwtp7QelerW8k+1T0tW30rMGWT3/tFaHKIspdooieijZ+auVI+OYTZtYjaB6DkgqmJUk7pHzFfEjX15VbVz1Mn0eSAFoZ6P6GNnyDb2QYhF4MzIs0s/eyqqW7TYzCchmVcV25ce8uw1UKiODdUkhSQhgFa2+Cg+bz9h35LrIs81tDzeskfb2UNnz0xrqujuGvqVhJWHo6OnMvboVXin+1Pfmvce3znD9v1+v/V+c4xztkHeZDPVNtU0y7Vkjg5RyfCv0n2ddCwOjvtkOfdZ098g1Kp3tUW9p2WGffcJwu5wx7BvpV2YKD35g86S6b49No3pTp9nmfe0z97pd//ptL7N4jyr1V+L8T1rzDxLV7uvdt+I+66+++wVFaeVM1R8OhXnZXqID3M4RjE/aFpOgWjz3K36M/Ho+0e3vM7+E5UkNypR0qVbzE0Xpf3GhrKU17l3Q04mFLHXKu93kJvnGUGW4TnPlPZNOLpGRKWiWoKQPoj4SMOV3dZTiUGXcvTn9FDP2GWfP6RCJNJN9ixpEh24EsXyovswZS3/uNsn2ND3/XySgUqfZmCoUzxqP1/DyzYhSwSh0T0Ip1KeKuH20TrPDO7PPNVU7vMc9uLxmjLElTVc9TI2sIH9SfYru3JWtC/2+BhC9hahKBFnRvJpttj90S3XsXGk0EKpKTM1zfR2H0Wnt1Bpn3vCOBz721WOQ/cvqOlRLMVDGXkG2WXHiV2b/04OYirIkiVIvSUc6na3UA7WTOZeWszPuj7DcprBYC9dh8rVo01saBdtn9h/bvftZp/9aTr9deqwf9nPsjqejXV+xbUvDS0wqjMRt10UqcOfPZVCTjBtQgXtmMNpnC6vDVH484hOql/9dE+URv3ppjZfT/4IMrJ1dVIx/3QUumhKd+2kmItmi1qU1zNqv0ROZHu96/Wm13POo9xG/Z/nlBYdukJOdLQZIclHGr6M6bDk0JXP+y005qF6n8mwZbw/eyezSqrhm8yO0IZwzXkRImR/r5vrLjoob2srK+BJCIJoUZppUEsteorE/yCE6GfEljm3bqW2ak8ZMtxTYuRDX4hHoHru0cpRNEqC9ey8xJzhXnvzUY+dtLHHk4/dwlkz06HMMUNQkv2ILDq7hxZOKyYtkUlU/XxGRk+lTej0n74zppST/zn56zrw8x6Hg2wLj4KCWqaHuDu03Nh7E3s7J0uW2yynbl9my3CxRuiYcRBEvdtY9tdpXPtkbrf1+mSFx35KVhtXsvR2k2Z/9tek/LVt/7nz7j/XWt56nf8+y/L++z5WIn/nZ0P7ut0GXV0tk5722coHFZWz49BGr2tSHZfTFOI0h+nvJ9qz7f7afKf06FcfPvc26YOmPvczU0mqpv4jKnLTEYl0KDKLEqbeO+8dXS/XlszWmj/YkESenqXlbPMwZUPuh3vB/9k36RyhR+qc6uqqlohEDMfrLDlxzXvY2vvsQ9dO6/6mB0ov+4h6v4MfpiIdKYVOiXOimsx5ViBLvmz3j+Wc9Z7amYsuH8PTNA+hY3QppfQW1X4Y6OkySkdY2KVX0OPlYyG0M9anNaauz8mG0kkxmDIhZOekHJfKBozF/WabxzkU1o9UspY1a15nfSil7RqCkJ1t1/7kWfpkEdVm/fupGfKgXet7aHsEx/vd3WdbUs/xbpAn+3tYe54fTTUxC73E38Sam6RyEwfbXNdS4cIOYmy10GIW95+wlNtkcN5aF+otMqhGyeSeMJ/SFXER07fbTs/Q+hpnen7ab52Ftvaah7WWF86/e46Zn33TvmzVriG45Fp1lqLngJ6TXKua+OQFqZRjCGW8nvR+Nr72/WvvvcWMeOirmdK49dJDkENpiqR1f7WSu6Uwi9pRpxU55N46lMRWKDEXCu61WqMw5ba+cT+c9w7PeT6ndOnoVOtPvWkhEhGaSvn2N+/x3o7r/fMeqscnuzNuWrvW9o/exW6k/RAEJXuUmF+YZylpZkTlbn14N3UV74qKzPhACsYqkqJDUDWoXbnMeVzzGXkaDezZf8UQW8aZTxVBX7jnJVAj2MsoLOqlS4slv/O2Dzmbe//hswCKCYJcVz7XOM8Xh6RlFgVFTkF0FKU7y9liSyO1QsukPmV8d83R/B1NRf9ul2Yye5CeMZVMjSZLeUXxeKMuyuCMZOQrU+8MjnUOP2ud22nVRZTxm6kuPLcULPJ+miAqtMU+py9CzG3EdmuZZrjYfp2WCvN1FOZr/v/qZI9LMnTsSPbSxG8Sfuta1kj6rGk0XHXV5T95+XFZv/7yt/wP3f4H17WUvy4X5rp/17u7F5TI0z5EEokv8a9qWznySonP/dn/0mk1exojN3tGlLWkxBYjN9taM0EvazycWv/AkGUuoyi4c1PTvnHXnJucVMf7ts+123/nbImk5CREyB8kcso2JU/MJKcHR8rp02UY6qG3z6iUEgMycUo6uoWI3BSYyCepx2v8Clbofr/VyNzh63FNHgROw3mzHapIjUFcfz1aSAgXmVO/iJGi9OKkjtmT6EiLa5CjIgapcx5MZdGR2L1/4jx7PDtx7bvWIpfOy3GU5zJrCUcj9PR4ZL3gWicDkp21aGlHbH0+cDyeCe8RZfSHjm76n8NwzMrO7BFTORwsjYYn01TLVEy1UAw9kmgjv3psuUvyn206o2H1p+5HC/Zk1AnmjrlX1YN83rmX2f8Jlb5PjO1u0st6T5P5KcMsFukJ04Vq8yl6k030fLSonOw6iFzYoZfL66VOGmt1ev5Oo+cvV7l++Mvfuqqul1X+k+un17rqqr/66/qBuax3lk5QXJ6+d3W3VPJ3kq+T3ERHku+ptVJJf1XmkTpcM2ZI7ehALxi1ZcrNXo/37XoEDWLQOvGYQR92tVJ/4Lj7YTp50qHzbP9D3ufpvY5IpTQkLlElS+Zr2UrpfI/uQ+keA/2cONlmHZ0yu+luKREacUPX9YwR2n1n6BEeQiOqPD/VccYlLJgYmHWXoI016coIiVmaf1nIszOKeNiIkvYzesMMKSznRccWbO72aItp/WUSXtaz92Y7y327bY343t2plkbj0FHcQJTnvDyNIshjQs1Fu7PdkMajwyE6BVUrZbwz/vo7ZPQ8v1Nu80T5Hudn35GGwixIMR8LNfGGgiIZladmSc0OvTvDfgfn42HNlTwfmPuhIcboU406uFChrvtkJv+JaoFVaWQq3S1I9WV2OvckvTD6kms/wzCJVNKx07m+rogzZPSzP42Ry+toy/72L2suf32py/85r/KfvMp/vl7GbHP0rN/bIgnqKvikS+vatZN8z5d/978riS+Z/WgefP+WXB2flmum/bSxoR/arsn9tNmCiXtPHibotZgpboUU17IylO3gvhz77hKvsyIl/vQ+7d7uO08OUwyv85LfuUSYK9FnQmWE1Bi6Mygqm2Lrwd6V1CSZooJWsIdi4oeQD4Tw6Q2FHX3s43TV5WVCJuYiqkpXd4Ts8jJNLPcmqybj0UGcQkKFVhIOWkih2pQ6q7uHFFl0oryxl/XDPv135NJf6eqE+vV7f+U5UX2RNa/zWHSNZF8SjdAEYtj9d1hFX/K8uPRT7PUpqKnokdGL1hvtZZlbvqRSI0k08Ua5dvDelmd5POuFkY45zrCffLHHPEOMwnKCJfdBGJ66s6J2gifYVwyWZQgVdn4OZyB2n3Ob6871w4uM275X8wQqmbutZD479Ep5X5LB1dOuI+FIN33uzYicOlhrWWut+WuuyXraz5dy/VAXylEX6lJXudRfeNq/013JXv6yRrjgo1+/JIniX2qPrL+jErPQ/UQ5M0WnqjE+HFh5iNF+bW7ilzdrzEzOB4t/H4Qdww3D0IaJ1/VnkTPq7rkXyS/iaeXsfTzts50Hn5GzpNYqkoxIlEyI2F0i1Rlf+q6KfnT12aLPfpY531em8uuwM4MWk3UbkQ8qiIwRzuTeDuc/H4MpIVOcm0PzjarfgzG+hqJNP1whU3DJCOc22hmln8GGdE+05th9N/32CPI7X9Wt5PppNBtsbNh7/1hDMGjGpbu1BPdLtMz6hrMeLkLeji/O23AqzlraRc3s7mcz3Ylz2U59xt7Szx8FBbUzj3lx6wp297ZvLUMqQ6q+UZLON7uwPBPvZaqJ0VIjmOV70HPTYZ5oq1h2zf18WwT7bYfONw8WVu1bCDIsTaj39L3DmrdczKsu1kymv/fp+WxrlU5hck/+WkTf5p8mTkQOnZzE7i52ujN2QpKrrnKtNa1lwdrd3NfC03NNC+by+rSf54g1WffvrRN+yxph5KUk8dmfpjsskeI8dCetTklumv6Kmj27pHu+Wt3yoNmrw5ytdouHe0/MNCjP/JxwDYxgeQ1yz8rMoGbY6XLYNt313HuntdTpPlu019HbcY6UEZlJhIisiYnYVXJKW0tpHak4Z0Drz2dMeequFEwt6YjvIg3Vd67cH8E9QhH9sLrvdsqcu/Yg0497el1kdEhVpi5KlpgriIRmbyOjR6bnl72NhL2f3VKjC0E7QxRhn02hoHJ3aRhCqPQ2t92B6DR94e9Mcu68jLyuyHkTDjKPxJX9+lrzYb+2sz5grxU/3SHotPDirYy/9XnbtzL7dws1mbkrt/5T2ZSYCgo9MMs0C1PxNPOpXkZSg04GZc84w+5bHktZ2PkV7DuLwNJnyDarimDf6gyzY590S8+owG04LjJzu1sv9jUKpW8TsW06ubuCNS3XSpw6ZJerH6qixVUu+rE/ttcRV7n89TKa328y8qt+3X9/f/HZ3W5rksQawbIsoxfJVyIj+OxPGnUqv4WSzO7uP/k7ypFk6+6uSNKvZKC9BBPb/NtO015MPGSLobdqjanHa4zXsog229rwce+14ea5D27qb9Q7LbpGaPb7hyPnvJFZmWV91xKyw2VLJhrX7FAxnE7TDP6uin3YW8ucgZTuNKmLVKJvwvwSkYSw7tBVs63wKvpdGdXWTUKWOEvFRMq/yB5+6qHKcH24D26EqCDzJXoIgVtpjkuxkDpVzp79UT9o5RitmUMWKXfW2A5x29CXkevkF5FwjULZL+tBK1mzR0kndxpIMVb22Uj6Ja+9Vy5p01SzqCmqI2nJ0Hv8bTbOtnXFrdhWBUoo8cDzeZ8XprKmZ4qHbZdrD85tKzg/IOy1QQ9iCETe1rGNOQjsvJb7iH33rb5PjNPvPmn703bbJ2ZSYoXhbET1l9Gyg4Z9byKu5NTWOnJCYteV7t42/t3x4/WOC5IsSMIyEjEiLFhGjyQ/latylB+T5DuHpGt3JY06ZqSct1Z2ZPb3X9QZ9Hfqx36oiGuqSnWZLl9tPbiL21IErocJUs88KPa/hhtmLb9c/z5e+7nn3rZS00Q/SUe6dclxc/axb78Tltfy7YrcQmREmWcjO2LaF45u65yM90dUHjGeLNIIxJxu0UOmQY6ASNY+nDhvU2dQ3TNHZRKYrs8flHMKvVAOpTJPEytCtqBLphn7GoQdim7PiH4RNCeQPOZB+hgUDIbpwGbTvT1WR0LGHVqbRrhDni+Og4QQJ7ivLodCyHOcmS4EJ1lkZ0eS1tLSKSdHelGYyvXNbKG1Xr87ZpuVO+OMiTIzlVB7TLWYPbfZa25qKW94w1vu3D0SRTI6Zm3Lms/PihJizgr6EHmnYCbk/bhPZsxtpC3mdt8rav+dai72iQn3od7VF6LvB5bev4csYSKfSvb30vbtV4KryU7ST19IdmI46adHhgz5NTtwFa7iql+W7iSdV0YgyfcUvwqSeP3sTz8Z0kk56SQj3yldRXRSQfLt1kmQSqvudAfJYqLS7hhSO2uPlosEovaMkZJzW/Nn+LSWMfG6yfyi28wwj/1x4y7XSInvGknnaJ/tvCP3UGOo0BQukUyI0HXNbmKE6i6p1v38XWV6oLLreAhJZkt8rEhSnczUCSNKKN9M+JZep+/Rfa73+62G13OukLlCMCqqqqhsiAdhQmgl5858Cd+GsGSIHlGhw9G06ltKzH2+KXHOiNKPQmqPbNtrv/219zk6kdDtq5YIjqhGQqnDUwZ5jryPGi3cNyou2Z017fYgukU/Cs+noCg10vp+Nd16ZNMZGX3vaerJbntUmejJGUw12bUmaqF41Brb6oxE2UOZe7RJbRmsfVtoJsNU19B5Z7QY4/c0YZ/U9Zfua6psu096rCGwQ4bFOLLBBGelS/fX9t3XEXG1nq6OU9ky2N1krvOOSMapXRsidteFT5b/5Ahc5cfrm1Mu5fVpmG/7th5bo05XyE68j29mSyd2d1InmbXvnmrXJt9JaaT+9k1m56P93Np/jfkgzARZE4aoi8drnfcyHxSuBTc2YyibWXp4uzf0s+9DNOmu01UhvffZ6+0H+qe1inI4T3LF5BQhk1PUhEzDOEcM+/To7N3l7FPJXK5Ba+4l0+ehqmb4oU2oslYGYZdTntHVSMjzfRPPraMeUt5jasVJGUyIa5lbhEyDGuUUdDTneKN0sKAhj8OWWj8tC+VFIcJ5um3GkClJ1xetkYT7FRJlhuurB43Si7KGRpAZEYSiGntOWnS3OII8TPOZlGLSY2Y0tDHT5JaCWZLTI/z91DQVCmYtiwferFoTD7czQ8pWOreU9a2cw7JXI9hD+LiJmLeQLpOhpLiNZd/jc6m8dftqkyHPbbL2HQzG3et1mHhdHarPNyd2nbRdPa8VOJDfcjr//i0ngcjpTpd+MkIb+a3nJfu/GfujP2dBXVAfm+6+l9U6Qyup2EfI+9Snk9lP8kUk5fVu0WUn6jt16Y7aJbf+l9J8/KyWftp2P6ahufdgxG0/D+Km2QQNPGtNPWSM14+9LEjtf51jU27XpE+lpUaIyj/2/nnL2RJJH7TqHesiGnFlQskvseeod3mKqk++qur5vGnfyINousow/yHdkT3nxQ8W3EbkZulHRNWXWh3FWY54HWHFjaUwna5uR1XvGeIapkeLbv3MnBeEvR+VcQbFgtATUWTuRe1WVHJtcp7TNBXE2nyb83PchvYHWxPjVySPhSN71kpyG3JCiDJv2TMHYRTfj+7sD2kmmxDHYdMSvE2U69uIQlcS7VrfgSOH47hV4hTRgYq5a+pVmLXoz9vkjdxlUib5sjnBLJMlA0H+yK6r7cQtBcS0tFnscyAQ6uI+2X0sF/uIus8dq9TFSKsW26GSvidk0+TvftopAq3tEDmpnUB2ppXklFMxkh37G6d2R3e6tV67m00/9hxhPdn68WPhlLATqIoz0SpEuuvU+Ro3TSQ7yUhma6G83tBIdOSh96E/wWjTvWLITWWZPI/XJcZrXdTbvYjCyEPrMXDjtmeOlJN4unR1Sp/z7ux7HDVLI3EZkC2yRIhS+uwIoWToMY70yD5KW0Y+ItFFfqpTafFNiGQqUaFTbOtb1M0l7J5S92xXt5drWxVzus4QHb6MMTcjw+uFlkkLIWGVHaMLpaHarNKtZZ8+Lv04EM8ZodwKosJkKa+b9de+oBOtdf9NLm4L59O2cL+EzJQgtJDLc+ZhUibc78wp9m661wqSS0NdSkHf0TLQ4xu91r3NM2bimE5K+k9BXRpr1jYVU6PUwkPG6iQOyWhz959KrOJM7LbSV0wMvcc4z2CxXpVG2HfeEj2BCnsNHKzPULe3n5j3JAzm7lxLKExIVqfbpeMkOPTsuZOBOC927bIffeae7XhLBiJkbIWz7reTKrvz7e9Z7939TZHz3UIir++c79RT/1idJslbMtu309QuUkNmFyJ1cOtOQZnTDgn2BCHuzkD03gbjKdHtdT4vY0zQZeZBYcw0XseN0s99bun0iNND+4R4493Yx9fNuDM1Duc7IaLnjoxN85NdQuvs06oP3T7ODqp2ZawHMonpY0MqCGYmPOHlY2cSxHt7O73zMEcQmtuzEKqof5fqKo8qVTOEKTqPl1PU2LJJ9YtdekLwRLt+95dUkb2nw7F3nqb0GY215LmyqdPMPudsEbT7lgSDHmQ9tzXWksc8V1l7SHlbKAmExO5DOkeHs1yZzTlNhcL7MjOKjIq/OiNH37asNxnKyV1kaBItDuZjWqumtRQ8E7M8HGt4Zw/7i+3ZRhx43Bm0YNWJqXyLoZ4qdjhtBVLNZf9nqeA+l7XcRu+z81YjbAjb0XcdKkFhIsk1aFfPNVdOEBdh31sipw7dCVKSzkTn5OvkVSQikZCMDNEhI0KkTp0vGdNOdO3aJSNQTiH3/rObUY4k+ZqdorWCuzdddlL0ivpQXf8802jd3XkQ2pWHmVM591oeBO29vI9FTLGX97caUTz2meQJ0Yju6jy9nf2P3yKpsL5hdfUO2dJYUUJMdVTj+/Pg/XGM4eTpSqZvs8pcoZpRuaRCOnCbiI8p2tCdotbuiyIIVRMmRKbEzJDKIkYU1T5ePtzuSWuV6GfYHe9jf32GsqU9W381FuLS49lR2qOwRKGpIFF7t2b/nOk6Lrk0ZiLJCEHOY8Q9ECTutos8EEX2Brqgi9Lu7jvMO40h1873D312m1zOVDyfGjk6CT1S7U5RMfeYlT2myp1UMmgy1EaxZtlmLWZNZlmqR5vxNmPX0Hdnq39XFrPD1j332hS5KMLw3Ck+mCppxNS+paW/dljdu09GvalmG6va1bfhEVYyffd9Usx/rf6e8np1dulL4wqOaNnJvRNCDgm07O726NlXPfrc69T5uurUSb45xaHi5O7IRM/OTEs3nySR1MlXRHLv7KY/FeErj/bdOikRNVtXCd/h5La1z01jU1rbUHWry2sUXSYGN6615c0eE6W2fP+il8dQNc0/JLoS36W7mrdKnd4/z3krSTRFctJs95lxizeNudrDHrFVSjs559m9K3wNmXnjIYlOaEGyB6nCPtyoZzZMCKfYWF8b5JpqRpBnRXpCkS3GjcGkrTE7EjJFpmvPoiWfQeZNZXRQWpymnUsN1eYM9JxmKLn/VFLqr+luPU4ihpGvaCEz0xhBD1ni4qQbMwrLydsQbfkwhn3+3zVRR3t1ejkOLKVmfdTkXZPvssZMz9SnxqY60HqEEugR5Vq5UTEVU0EtqEnlGVsn4k3GHhVj9wgHdt8p+iXk/Wh23vYehNnG5YopR+s7MzIcjdg5z7mksU+U+23TjQf53VAdKjG67/5HJzJO4OpMKyfBTtZs++6TBHFq1xWB2N/kvNXVafQcnSlDP5HO00nSnZ5du7t2IcmQFu9TySHJTe+IVITkK7P9gUQi7safiHzzSgvdczEVFRNGUPXMiLfXCBqoxxTymGsg1sDkZj/LoL7MebY4KS30eKRSpyt25t7I344EmW5br7OjEiUySk1rjOqDP7UHPk91rbmq8r2COdDRmR1jdwTn5hXcd1zusNzWy6DDrXFOI9PLF0yUXlUpvU+MKjcsJIq0FPpFdlFz7qDIaDDDcW26IPUIHbXT3RXt6daUQGJ9W/eZkgGjfT0iiWFAhSPk4cp+5oUQsqe2mTnIqSU44QfpnfmJdOsmOi+PTpepyjr1uJbE6BkNQ8Xoz1t2Rr4ys06EsofU5JBsxVLL4s1SrLKw3jF62Si0EpybSyIzhBbst0jBZF8LQeZ1DMHqd74CZ0r6Y7ps6yawzxLmo8zfj7cFdVCiQo8Tsv+cFth5tCOMU642+mEnIonkpJwEIfs7eneR0PYfdvc7u7bPvodEpJNAnRQRkadq3y3dUvs7SMnsp3Z3dajkb3LrdAryzb/6XyVSaa2h7YdWC6F7XJigOS/vAzso5LTgqe7ZKLpXEGjP/kilJL+6dO2OVEhpH1ai4lPUIWfrIeJXpjk3IVvOfcTvFVKDrg7HOOZ75PNgLlMIRlF18M1l5muoYB4Rnozqx45GeF1WOlMmsV8J8YTwp0ZK+VThnHWZEUwhBKVHNNCh5hE283JKdYe4Ns7etDr6Von+6bAKFnu1lsubCc0f6BkzGdKXeWw4yWNoFKXsybzR8nH2qo7Y43DsyTstRDiKMstUf4pSqNRw/G54S25HDAfxjiXtG41ZmCpaQaELU00Uk9k47IxObs5cS6RBrMZe4ZlCmGNp6ZFRHZ3HmlmDQNgn3dcw73kLF/Yd91NsM3/XiWR1M0GRXDrTzhA4iK2nvuokcL6X1v+OzmOTJKcYnC9CRGsJZOgISVrSKZxvhESSe987laALR1Pn7tndhXR0JXzPnZb6W6Iyu7uivO4w6R16mcvb2vIYE7T2Q0Y/tDsLgdozTJNaMeQkD1OvD/+D/NTiDHo8XdUl3uXuNzOpYxaEk94a5Z6QFaMyTb9Hsmua75MxBmfU99Z677cRk8y06AghXTKcSyYyb4x7ivEuRwf9EHQ+CNKYpljHdQZVcZT25yEsQSzidTQxXoLSXc1ncRActE0F4YQnWldOP96ukNjs3WdaryaQDhqdTGTEIDoiDqnTw4xKnNdJUBwi6mHGCMmsubOfZUQ/46TFHtHTmZRS0yxVnzKfwlSBI6VtN+8kpceMMzD15mRuFM5FLaZSD8VIkeRLUtt0prHo4dpKH/LOrtIx1oEwwrTbiLlPXBcj1SFmqev6jM/T3J4hT0w+5qN6PgPrU5x7kizscnXOvV+cr4vuXRdWwpHIzqqLTp97++xPP2u2JHK+TkWcOpXgFHKSN+c7iCRjdpKbXQ2t7K/XpCTRuvYWiubuJF1EUkQXQcdc9Yy41bVWviFuZp4H4S43+XfUSf3j17UZOG+zoCe+n2cE7u3e+r+luz3RXSflXZ8zor6d4zOUL8eM5OuzxVxCTiH2HLE1Vkb0cZfUVnW2rpZT1c9DP3Qo+HEjLfFF3JayG3JF/EAJripmd/C+WJ4Vuh+BPwjZ1TXezKHNJeGxXFc1U3Sl//F+6MzLzoz+p0aDWx/pfhGlsycpYp69qbjVm0JysdXQvInb9mUTcR0oZXZI9pZC+uVt1GW941CDvD04lTbyhzv7DlPCJu8cLd0t+inXmqiHqYYoaT0zZquMyTtDoqbMglnQYzLLJZg1ObArzCqklsXoDL5rnz9nZDKrqK0YlhSWOX3nB+z0tZpV7whkpvYthDH3rWh2Bvtrr+sJTN9OyUajDtpq8085TkS4us0+Qbh028WemnARTgoJdNJh36g921wJmVZOMjvx9OzcxU6+k/3nge4n6YKQfIXcrqJpXSLzz9TNs4VUZs8i5CsUklubvdbwTHHvaW7Eqc3GDI33Y4JsyzAalGmDC31U9mILIZVUD08qIdVVXW9+iCQLH91yjvO/JiMi/dXQM8T3edQW0R/nP1jq0z3Go0eehxUzTCn2z5XpINMzUjUh76v0OD/niu6ZCrp/BZSuDky3MuYKMSnlmGPoWUfh4cZyk7iHdvCVdAnCKUPUZwguWhCXKvrhnKZLf8pC6Q4Vb1NX93g9U0bkzwwimnROhOwljymICinZyyzymDZEI9Q+nxmePT/haK5jifIpjwceU1XNiJpGxmGXHk56j8jQYlV26MkejVUrlgoHpjezsB4v39AGlGRUNmtFH1nB8rQ6Me/kaaEYv6eljYXTCFPbzbLjmPegXTi/nrrucz8+de7JlTDNCNnP6p7//bOCK7r/ES05iderLoQ+s6dOIkJkf2W38dJ2aDo97dsu8va6S9INMUinXkhGksqPD527N+k6JUnu36/W8s8pUZHZBSmvqe6Oh3Yvc0Fzs/K9mdxKb1aeaml3lpFSM89EiVs/apa23wjsBekn0elDitZV6ROf5ji3fJKWmPjGmyt6hpxCfsVLdKSTmX3akH1GdfQ2p+meMmUukaFV51oTIcx57X3ahCb0Lby8k+Kc+9ECYWULtxQrR6qVri52VcYKzNXSmX4YwrlfqhEEO+yh58t/EIsOKraXeTionFPels4bFd/ulk1kkiboGwkxhCKSzKypiAvZ85j0dClqnL0ujeqQdHd/WE2FI7RDzi6m+lOYBW/M+tTFkqeNvFff6T89Zuw1yx5ppqgV1Gb2jNkzMWuj1kLhbXnUYtiVLTrTPK6jLsxr66w9lp5fgedOtGG5bcZSC7d7+j7vQQyh3n1uu09QFp0H8XoqUJ11nySbq+F3Lo4f83c/elpHcr52t/T+Ov3ZZidBRgK7ZNep2t9Tu7a0btKJpJGs0Untyv6eIonI93xnJ5P2Zxet4ysRd/uxiKhTszO7NUJm55v8ew0SRiB37urlNTfqIg+EEsxAqz/jl/ufjaB/jNf2WWueLeeU7qdJ/exIfbpG6NFdvjVJHOcf6jSkpa1rS0aqpOkZ1a2dI5+p+vv5bNl6VD8zQyDPtyCSlKQuWRVu9VmvSbjfExDKrCbo053H57eXkTBPx9i7GmoM/LwRD/q+Ecopp8bamwxnTIoyRD+jhc507qadTbZkzhPKytNGjUUSsbq/3aNEoMWltRmEJiJKCUGpPI6Z0ovPs9Yo9w2FqfUD1M6YiK5Zut2GxQOHh/LygZqmumOk9kDLfeaq3JsKMz2ZnRu1oISaKNdaqGmqSeTLzFAZWbOg0ml7zLHZxbJrU3XDXOi4T6Xeiv72d3+u+l3YRmbq3m5NTOGghJ6GCVT3fB652Ei3PXv2qRMSG+vc1kkkXJUOtP10pp6dCN8TSA8/B7syIILsb0ZE8D2VYa5J6/JjVmtdOonk1nTXjiQlSSuaVGBV/6ufM1qx156B+3a3NchzkvNinUPnZpsH0lZ0i/K5sRjPjW8DFbdeEt80oZ33qehUt061oDaJ+JcjqzRGZDq6ZBq7YoX41r8iDNlOH3ZXmTM61pJJTC1M+CkhxPRuNyIfW0JUd9vWrUy9jkImUSFsnuerqn1Gxhh76+rewrKW6yI6qP4aCPVaY2ObJkM8QteDuMYWAgc2uQfZknitu/TpLykkRoe4NplGjCEJFGRZk773cI07KWteRgXdUCGIxOqw+zi7x7vPMzTp7sJ8OP1PmTVrXmpCjQy6Sn96Jwf7To5tzDOWMwp7FNSEB2qJMuuoaaplUSwp62RXcDZMRF0q+/G49yvD2vec9jGm71uk6aOGq0cY9i0tM/vOa30Q1v5aDLpNc+6z5lMfr9U4ml27Mzvi8nrppuf6xyJbOJIQ3fvPNvWkp2W2/HS+8D0lifPNyfdS8iqvs9F/otGtrjqdbxLxPt/ZqBaRElPtPxu+ISmhK1uZPfOEkafVK88y4vXejwkPac3Eosq1NlFytvKYmaheCNQ2nJ50p6TT9YtK9a6QXeFNKIuURJylfY5Nzp3RM9PaoY1RfTDsM3U/a0qeVcV6xFzuKUhLVAkhbs41ibs5HbYc73cWSRNdj48nNF2uR40hrv2I62JxE9dgMiJOmf0y5/Wg9LHnMxWPF3O+6gRnX8qyz6mU6rZSkQhnuu+WzONZxhjf2rXvZEY6022dGaEle4g6cTSQEw6lzOQ5KCLj5Ld29oeqk/dx5ieOXSTkyAPPn5rn92NSFqVUlbdoTUbN1Ggxpe7cHEJqM09Eb5qCIsq1lkXBaKLlPnqQuyuoP0wjLybI0J3zznvdawfbb/XFot71GewTMxYlA2l3nsVcmE9Fq8/T534Ihfk8keHUkbH/uScrLqLTuxE910mQjHRcdYygdzVbd+0kmZ3kJNPPPaEffe/PlTdkfzvRoztFJMi4W6bXP35Mvpk9W//RLZWQ3CuZhahpKYbctzt8M4RqryEzyND9L/wLeZZf3up6ILfuwElzm/mX89RSnUgZXR0p76qoSFf1Uc2pm5uvs/P+FbpKskQ6naafu42M3ZWPB3N8jMciEL7J7JK9sGcqdInpfBFUjLhnI6khq2+1p3sCERMV0yD2Ijp0Vf92yFgIFmTNKDW7C85+EvgeGnyPJroNUeSctOq7zxYudhDOaK+FJFn7nW6MXm47NxiBJEPEpX5RFDLzPOR+mWemhIJIkNkDJzpUJ/c7w9maXi1aexxmmWahJiZvSg3fSmSUKJ3R9MqWu8embzMZFZzh+obCA1tjVaDwpBiN8yeVpfdPdJ+HoibMe3cJBPtVOiwc3RdSU+Iz1DEIjFDv4d5tM/n7bLDibWmWpGDua3m9aO2C5dQZfry8duZ2b5IccerUFaRpGT0hQxHs/qM73bptpNOaGCn2OwmJ+/cbkVY5pXWnMCn7JhkObr+7+/aamovy46m41mbEa/YzM2bIXdu/a15ea4+8hG7/4awhXrvn4jz/54x4Up0aeqSq92iVqvgmJb6t8r0WqjTkzH1Mz408fquVOUr2X50uWzL3GmK3PkxZK3hC8j3FPy6V6TChjxQyEcnliDd7TqpTXsTj0+maSuRB+deGUUoN5fWTBA/E+RqEU5A6o6TdXwQupOiHdo3HizhTtlOSathqQ1xb5+y3u1PHl+3a9MwYro1hP2tlzYd5zHOVwuXFY08q07J2/4fULXJNxofPw3pUlWthlqc85VrJQzE6cmsro/Utsr9M/adD0nAItdEwvZkPzPoRHtfOHaMSZ6teDFfXWfP2cekwVqb3yRirvy5tX+rSTcY+FS20WsM2+xBj/q6zsvkUTN+9f5/CdNu7mYtTnN5/nO7JEsePJ9C96bmHSOBUQp8/G01EJB0ykBGEpOuU13gNctt3606dChKpU5ha/2mtSxKz77b1I6TOVDYdcetelwdKNfsZGUiVfx4zzUtaM97e7T/zIOjFzHPTcwvneTvPxAlRfaQ+Z2jdlVjEt/qnXPry0yZim2RWZrpakYyQyoQtVUXFJ1WsTM8fZC4SU/Rlz3ZjhlTIdOWcpnKhpS49Nmyf8HmIHQWhS5cM2aerutbKZblv6SnwCM2TkGB3Ez2CYm1K92k0JfPI3pdHlMbQPba9rpS7W86VxyGh3beRCaNHIkIXyekrsh6FHPTQuMhMSLWVHq5kWI+v7cyxxPnpONMrbF1hlqkeFDWtV4q7y4iWsdudkdE3OaNlo9ijJKFcKygo11rbc6EuNYlV2caBuY5t0/olfkuNZ6VAmDM+w0gjDal30lgzs1xIM3PYX6dd8vG2xVZ7O475lFyUHzdyOHXp5mIJJ6IT6eeCnmTf+97xY0gSCGQkiHjNq4iQupJ8J9LRlFPsSORLMjvVuyivEbfX2iWKQ0F0cevMswyh9F7yL9XADkZV2VYeNPTHr4uZqLiX19N9nnf5pbt1hqjsxK85mm+JFCUS3w4sOR9Ru3NEj4nNdBoyeeyDj+8Ih8yBNRf//XwTN7FJCks10aS0JT/8x9G7y+Q4+tgprypEpJePgnlmGWWJrnIP+IN4SNxQyUxQZj9GZ2S+vAm2sQvRY5KGeDifqpgzGxHT/aV/h5BsDvokzxW3g9y1JDJKu00eI17I4VTHDVFYzsskWQ+hL50rUbv/DtPfPyy3TV7imYYTKLNUeZj16rGVyyTDE5xsk1kSuwLVBrVZ6sVCLajcZs1lPZbFw5CSRSfMb7JOVVJdUmDO3Bm0effXacR092/FZYjp9zQyL+edvgQjZu4TDNVeH+xHyXzmUyf3UcHuxm/uHbLr8mPnJLMTueLHYKf93Jk9O8/vffVfBRFB6nKvKyPfc+9vkkx0I2p/CVJXSnJmJ3cL4us1s+vQCkkysZpQTugVZhNPi2uZk+kEe8IQiBs6GroXJffdHSbPzXlvr+f5/9D9f6vn2V0p/wmR6FROtWqfJiJaLrGZUMKMrB762M18P8SzyRz3s+k2NqolzznEN2aIGS9D56EwLTpkHVz3+wu3e7vVuG2vBxdCphCe54j83MqI0TVihJiEDscPu7vmYDJfVqCc2whkCCyOa08nlBCIR/VXx7ZOsIL+mic5GDdEa/fJcM3dLVeLCMp+5pU1JLPt8UYJQUii5AepnX2HhuhVa0ljz039qUus+jzmo5Sa9Xkz1Uj99AxTZyTazE6ayN0DRxZqylRCTRSOHqxazPLybgntpqFGnT7WKbECT1llsY7PMBxcbUgpaayp8z/hLgNh39WYT5lBGdh0ULSKZLjq6m3n3kSwZeh21dUxd3ElEvmx40q3RrdOpp6dqWdPevZc0TvJ1K0fnbTy162ufBHJbNVT6BJkttRGl9dCq98iUgfm4sHkplzPs0wgqmswYh6xjTD93LYwVHusxXo81ZgM5/85T+77f9Bm/oNCl64nxGmJb/E6FeUzo0cKp//FzkxWepQ9rRXCxeZ+dui5MD3kyRSIZInpMhF+KqlmK5X5lzCo3KnUYfs8l8/jEaRENaLC1F3yYXQ7x8vYQqJflDHGr0CGDaUxOmZf6GjhUIh5oD0OUnOPDvYKSULRRB5XTjAguElk6ohhIC83SR5DInRkzwmHbmnrrBHRwmb3/2VaSBU66XeXqdRUuU0KqijKSKnw1B3pESZvpoz/WYLCVLmz1UolBUV4M8tEefmGXcZ2DGEKRr3q6p9YV2J+zLwf5Zraxo1m1jvaakJJM7PvtPtWY3GfMO9+Kkw3g7kPe/n13Joj7Pba1/1LaK7QsHvNNVfE6wWxK4kfc5Z0JN1dpy7K7nLRX+x8d8prUFe+50vMnoXuFl0cP6b2nxmp841ECSndpI4jbj9OPM+jzTBhyM3O7GFyTms/GOgBCybq/5FnD/MQBs77f846z//j7MTPPhVPTz2E+BmRrFCSKZW7zyrRjnc0pLX3IaTCvbtHnp9UfT+fIYRv10dEpkQ63EuWFMKe280pIsOG7jhPqvvOqhOeQNyCmKsqnNCkUGbpuvmDmJFymzcyE/o2963EtX0gEDK2zriIUpn0qRIzODxKe4nkguompp+TnBv6cvt3mNCRIMIdIork9CDqlKxtNKLiXnw9p2mHkM8gezicIWcTOXAeivpT1pN/HstUmIVHiXJX7ra1oeK0IxsxUdlW+s5IamZQeCx49qYWcxdrWWU9vnJu31+c6p9EkUpP0i/bMPGWDTH3V4o72H/vO1pMYK4f7ovzFlzMLLX7Wbms9w/xWi+mLvb9K9m1a9flx50InKBn0P4BHZFTRLlI6MjoJsOPkQTdJGiJFHJM/VCu/tMI6lR3CMmN7iIoTqYiGxGRm72Qp15z7yXLa4p5HswYPfIsSxBF3sQND9px79nBebr/b93n/9nneXaRend160jrrpOErDuirM+txuH9A5lp0y674vt8mhE6Yh8a9pbSNYyYa8q01oKaWAzzrRszsidJKciJGbY4b+FEyqP6nETkgyptDOV2bSOIat5mXJc129Fe3ro7/Yhp6GdIvdnN6IN+kegjVfrZO2okc7qkptXNttI2wurGfNcVT6Ldth6ZCSPaV2uZHVpmS1nPpxXK6eu8zNuUk8r2GWwP/4nFc4bniG7RU9HPpyaKonAxHyhHUiMDHSadO5xhy+6b2YPcakG5FmuVGd6sWZOpmDTyyL5OTamKVchfQV7aKxfx2d0xS1ae9Xk012fMW301l5nT0DGwd9sQhsbkcz/rtbzu1j2Xqy7JKZfWzw4RYpfTGlrDNtfUU0sCJ+XURV2pS1115bVOnUJkELMnTX91pKd0ymswC7vp8holObMbTZ3y414ahdLusYYZDbr/Kfzr1mbPNgxa20BOXJ4xDcLMcJ7Pef/d+z6f8x46HZVRb0+qmm8ikYjOKWSFlAbaz24ftQ+xj1E7GjZ77EdZex/d1Xw/Qp5akucR35N073kWjnINFVlyqPAqZpQqtSumCuGPC94eRUlPzawyNMNoT0iEP64JIXxVcZBRUYXqEfrlhaqWUJmzBPHMQNee/W1zUX3FS+Wimbk63o47XS0TSYvbS3cKIXtkjxJRWwRJEREKPSFpovNxD/dYglun71cSCXUnUMMYxrKnaCUFGaHI6Nwd9BB9Z+2d//GEtx3UYqnJUSw1Q3v5rF3Lw6pPuZY9qIhRGXK3TY7ldaxSQp32cd9JMOaHRM+wY/u2HwaWbtJjH/ty+ocW1v5SrbFGw75z9f02ff8RPz7XN4rW3Dn15XWef0/mOtee2qy9YBvbbHPUnj3dWG2vU2YYr0XcUWqvPTmjQ+K1Qve6nnwgT2AbvbzOc9NeT58Rb0PtfwfzcVOfR878raoUJ2dflOLr2j/jk/ns9vh5cs+u+PVFTHOfOTHW2w/YDkm7iJ0X4Ra65OXoQGlumRwohRmli4jz90/evJljRFpakjEk7lMQm0hcJkS6H/6D9Z/onFZh/DRIvAxhIX2qTivGu/RUratM4uWSS0bDhpzkBRsdvUKCoB3OuZRGub0U492VVTIgKFclTwsw5TqmD6YTxueQ/ezJWhHX5cNCOYK7KkEOLSelNezzZ6QJVU+gmqgwUUIcRUVtUVpaEj/az6eN6Bnp382U3dKUbanotBWtFxTzESjTVKhaFquI3WOdsc7IqT16bP1Ph+zUHnj6XoiZtVmIecs19/TPv4GUd3RoO4bzFsSPo966X+0zszha+2Fo+6hXcZ/44c60ea6521Jvq6fqoMM8wcCTp2XymGEunPPvGMwPqlMVb6vozhPPv7OrKQ9tr2cjj/E6960q1nNZzZ37841Yy/WvIXfu6uU13m7YmOUXtpxhh3ITnzBr/5vXnP0iEm2nJlz7KmtvVIjQts1qKZGQ2kLtTKIhg5XF0QJ1qLQplI332/7H3GdmRSPTmBPrQ7jIaU/tPLKuR5yhXsc8/r9jy+aMbst1ejkhvr6GoQTVxbvqnjPES5TrM3JuQdjdo2P3eSqDF9j0r9DY8baYmqzTRlPchfyUAbKAIS2FDICBwTAzvF61o+iQzEraCOVlQi754b6yNkiowszjHvBMoWoeHQiEWhLXcDIQQaIyYzLV5NuoiB7pRy+SMSu3OLJbRepTgprwyJpnsAqWci3XhyFfzPRtZUiFnF9ORo/K0lvvPQphZR9YU2/PnD4CO+pG067PfectMu0z5rV6fWYG++u01vc+F9bOoOE29rnerj3723XOXkpfac94qDFTrQ7GfzjDDG2n0TN+We2OteHBxBPVup7Pz8jETJUGe/Y/t4UxN3o09iLPUG6qXkcRVS+ordT4sBr1leNJZ8zJ+dj9vS5N5WkP/ZpSZ/cW91afhgM7RKFE7UYiWxS3IL/EUaisKpY4IhBGVDdjx8+Y+aahMvtEmeTKlRBSmvNaai7Sn631z2ecUrYDuZEQokJIDqWPGKPqGCMfhPMSXKe9gyKzQ/VAUK8Vw/djGpPPmE+xto/XRRcKqg+ciFzJZD0Eggzm0zlUvebXRES3ZJ5NWr73cBkHmT3UQ6QbdItEEqG/tYd/ig+AAnNVdqgCmUHGW/YnSg1FZlyfkaeskZHe0OHu328ZoSLj3HLPVOQ+/29taI4Sz5wLNZk8WLUsykik7BEdyfoKGcrCGcgf9oqqFmbuR8G+Td4hW8bn6naRR8yQcRFj7BTKk7aIz/WWxn1uD/sLMS91n/jDe2aU59+Fc9XPoIqiXtvnU8/HE9Td8Hzuj3pbVVW9nstgBs1HW23OKAL1Gne0XeufZzDETWUzMl4nre74Rqao27Fdo5pjo8zG2RifzKf1+P/1kW8RvkNmyUAxxyoz0h7o3NhFJGKFLJt7185FtWLJpzlEIkr1p7LMHVFbnGefHe/GpDUwLF9H2M597sjTz6wt1iaQ4rjGPo5hhZiiUjMoR3XIQGePoWRWXtyCTKOfOUWDIjil3Q9n9km4ZvQzamMRhcco0+YlpwfOaMjKCuEnlKZsPsy6j/PVy7jmHhUuBHmMzJQ8BjnzpDwmz6m2GtnHPbCbYhZiFohaA6HYvxtBR5OB+dSU8nlnHOOdibOGVq4n9tAJWw/Z9WUSj9wK8zHZHqjJmgruzmKVZJyRkUHFtbJO7tZ2RtcpW4ZHKf1ac3sod1pv3Ya0zzXsW97Z5xrGBJtf29p94nOf9Wvf0t/VDw1niul3H7dSrw8GZljb93UyWlpVDm29FvVa3UvbXs/1XEy3NUZwx/twb0y81jRnbndfv+7e3TM5VTX39bCEmaa3ln8YQlW6F3OV2crA2PcqI7GNyXqcejQ70RHT0mr6ojwoH4b28cOGaJeMmI5rMkJKJo44zuSoXj6+o+VkMwnmwP6HRZDXhot1SUy7Os+lFfXYunaEmX1at6SqTy2vF3HtlO1dapGuu6qO6trL5YxIKLJ2iDllqlTJwF4UZ4dAWAmb81SnVUyh4q72OgSSRgwF6jWX6/gBNOO6Ry513yqFJKeBipTZQ2MmRxrRaGEIUb4P2cMncVNgyD1JJ0GzSCGclAqCSrUaWLNEKfqftKzuniO6JDvaCPOMKaNgKjyFzZHVUMqDx7VgF2ukM8KR1VaPfUIxsYc5P7KvYI25RdJ9fBpF2ud6Sz4IM5zh/iMzRiilrtb3kfGHS8P1iB/uY1l7bd+5jT5xh3v8h2s82c+19pP97frmwpP/GXp993p6PTPBg8HQuOO1lbMftrWticfMiDNQ9hyX2RhPi2zPEO9DsTMQr5e1Z8RQv6gy6ZulzNgun5yfHmlu2mOFWPahzp6kfP8wc3wkO4QQe+xDQ4lEiIlJHqm65FpxRBAvHHvPu6ii1jvNIcac4v5hEekRssSKfezrFKKnEP+JeEaV5/k5RnAjP13rpzj4RZWeG/J7pmoIhAhhIw9vFvtLcYZ8VnWzkX0QuJylL1H3fArF7Y1jaHJIAjDIBfr2rNxJt/k11B7VcT17kMqaDzPzYeEoelgTIVOp6G/t4WcAtWbiifAKDntRwvnE6T2kT4kmmBRz9BpSMuAIjpFhViTKtUWiMfWWFOZy6IJHiaUW1CJGZ6DdoV0P2Z6nsC37ftQhhkepY7Elo4klo7Sws4Zhotmmfe7Uu/3r0O4jM+OH+4577+UONDtxsrq5G//LT3N6HeP9GDPGbDOzZpgfYxjBEx6l4k5p9xI8UQhuai8N8zDhCZq91ph/DCqq+5/twYS+PDMmyi/qZNWXYtPl6w5bqW3tZyPyaKatdiQa37vuMzWc9WzEh+3DfiJiVCJLNDMZXbo7ySEs66hVgYu5c9iDaMY+LMWnJWP8fmPSQCzXjh0qS4nalx3n2WyBw1xCJqtkCzermOUp1641VsUTQnJ5kxG7rcwmRqa8lLMQ3AisUl73tPISU2kL060bsgghkwCHcGIwwPg4vFj2wRKEi1vQSIRDgkNoXInMuGi5uCAhI5THPXxSN1BHk/WGI8aKCAIpDkVF6eigWDxoMylD5jl9x2nvneKEEWVrjTwKj4JOrKmZygmFqaaH9WY4xk6UveJEjvqUa2XXIUb20YTpb48SVYOtdzS3kXnNW/HDGM7zWzUXAzuL03CRH7Hd37e4D/ZZf/zkMd3TM3txl5pST9xx5wm3yR3uBu4vZ3imwRPUlCZe9mzy3Xh4jDhJy73XxcKYSSil2dY0DO2E2vM9y4xQmgWB8roNY0fz5U7YFM7DJ8kKmeZARkw1rKovVZnZd0Hf7CGZbJIKbiWPrZaOnDJH5kat4eDQPSyVbcbRR1XOXymT5vRaZVxaEue1l6yQkYQ84d4y7cMx9j5d3X6OeBliIhGEtaWLz2fXSlkTLuQlaL8gc4qtrDNQPXe1OGNvam8qpDBIRRdZjsIu1CbArHldzqk2H/en8bt6tKtYn1P2CIKocCQue942EIcgB0F01r4/sRtQO6peUYRqr8jNzrCbErZAVKImVcWIwqCs76Fove84ZgkqtxxJRpRrzTSFVWE91nzlUcu1jKTEGvTIyFBxrcvZY9m3VXUQc7bqnftqPzz9VnN7qFPKe9ogYxAK7vjcZ4d9xGemGT8+/So/vPOcb96fOb1fe23rVtKBQpn2aVHvW+9bwd5LN9M9K16HKeM/3Hn+8cvJw/OSu58ixrQ556vYYbaJp0PYSzyGqDM+3qhCntFFkT6Rtto5btIupbMyzcgsaLK1236wbecWY+mWKFmN6ezS9YSgxHEXKjd1HnOcD0bSdu0YDGmQBeujhsTcj+xLYi4hNPvZso+HHiJfI7fVB5ni2kEp1+ehRvWsGIVHQohsUUGkRJDZZ4wEi/4VBIF7upFRty6s09Pdp3jK25wXApmp075kmxUbIcEwG6E3fjQRUS1Scd8xI67GniCNx85MEWqZ8LU9/NOKsZg+ywBVLJGSii0jyFBkBg/MMiuljKQ7ojvRv/smdxw5VLbcemxTbabew1FQXhZTLSbK4pFlNCNZJ2MPu0fY62hVJi74XeqXNhD2y1OnnzBwcP/K2LallLTtFkU5H0YYM2Rek+7WdNroMezUL5m34M6ds4x6+0yc1ixmr83sJ3fOXpY7aO7gzhl3P+5sy17b2mvErx/MYIS7Sl3P8jzWy+TR+yliP4eZf0+vRXWvGAR6+Oynxtvc7prtSeyAc2Fc9rn8zbT3Pkz5zjRzaCdZO3NkRiHtcBuyQ3aUXRBbSswXGT1FQ6h6vB7crD1jsuYtgmhomKwMEYZnIjahbmRt+uxTREU9mq5HSkwIIXE9hdkxs4VRqLbFdZ0JIZKRKt1X2EKMMmwVck3f9KKfQaqNGkq+zx+Idat+OUpOIFp56NNm5SfhaqFgvKQsUbekytpXZQ1Z8thXrg25fNpIWZLEaPnWHvik3YQK467kvosc1Y2EPUN1PiGz0uxBZllQRhQx2oAecnNEhg5Wk7HztSbKtnjLTTF3LahlUctaL5ZZIyMPWcNfJtKDuJI+9TT2UXc2Svj43MX2h23cJ80d1L2/TnONzIxKv+Vzfe4T9nlVWuv7uPNkzKuWHe/sVa938AzVx3/8sNa2rMVq7ele29rMhtUlnmUmlL6pNtzxvqW9rPE6Dbe30dpr1p5LhwabwIxgKsqsPPNy33tVXsN0o7bXfdlybJ4vLqNHMzrWzhyZJ9pqDZq2xYLOhcamhVwizkT7JNMQYkdEGCVi2Y84YlNCqTJQxITM1KqliayQdf7Bk5xbsq7Z0UWsEJpOjZX/hB/OwNmuR1FnqypdukYVhOcJcp62zqml+k8pHTb1WvhdeswOXBChDoWSniMp5xQGBAkwabug5BCuEsglkYycHXm8EFHkdVshQuMyEhWyn5dpa8a4t8/3EKaskJqpIehSVLS8CzlQQ8knWI/5eJSg0EbSu5GdtlkOY6b2sHd9mZxiJk544mHfhakuajLVYlpP0K5ZZSNfWVjiYmDup8x7fQxkKG5/sO+8dZ+0cZ+UnffodkkPS2ludzPYp2Cf6O7m7hNYMy/1vbpX9wPlDg/UvJRn8kyeNp48l2cmfv1Mnrl0YPy64Y6397uL72vNetPAA825WV1hGE29jfdpvaZ7mBjVsGYuZtSmyteFoqr7GFRGaOZ+rvbQbZq1q46VCRx2WrFwQkgLadPRX5seE5MhUvdo0UOtI+Y9Su+o2hFBLx9GLGlgEv+u25JTTlErtnMvuiJxiuLZpwpyCSF4nJipUsZnn4zu3xrmWq7JZ7glZPZFC1HllDc9N9JDQ6F5kGFXT3W3ypUfbeElcmgXCbOeFpooNWC43Kee3u4qcgYtDuIkn9YgONo4KAf3qiJU6/MP9/KpPahJWO9GOuNOFfxICymCM7/dxiAWb8q7LEUx9J8euft3ZWT0zYyUqX92TFHLtTIoGwoqLDVZj7XwmBbF1v+PChxb/+ph6WOrl2vCjHvfPLAGjs+MUalqLm32WZ91adbnPvtrW+dxYRCDeS0aDW2G2d9ZPJm2valfnjnjzOlttRiP/8V6HZUT2ihKYa+6vtvLGAPBc1PIfrZnZi6GqZS9XN9rDPE+3WORoVTrs73W1s58SWa3qs9mTxB/XYnUyhxK9vRrpoceszuBR54irHsfiB80S0h0xGQLiSBq3VHLsTCtPR4husKAiPRHpf8VWnLP8DCG7Hgu23k9MnPZEWF2trA8Y1S1QKbArKMQo6Pie6jx7J6qPYgZCZcLsYJyNujXNBmBmnamzo1AECg3802KrUa5T3lNBZJZ4dlO272yAYN0s8eQ7J+NcyPXSIco8pi2NZmZ6eQ5MpPSL3uWKfd7+dQ9xGVUqpPUALktZG+UDYO+3JbrU6ipqtD6CKdEH3tnL9Sm/n9fk1Dh6F+iTGhtneH6YJZpUcv1KyIdkTWbOJ8So/9wnVIh++xt2Q923uz+Oo07MO95FcGwDPuDGeNz7vN7m3YxMDtm6t1+pDXkId7P4+0UupfXG+7GbQR3nIQ7nHHnkTtnA3fuuL2xWb34vtZ6rsfA5MztfWPPZk3O1KioocyCGbQ0zCCDwJaHobZWO++9ZkO1M8ONPpGK9HfTztpzRK9UZu5jwhNb2Lgn7Stj94arZDVkTShSWY0efeShjk5dzLZFRRG9+zg1va6Hxoz3mn8oJNZFej9k7i07Nlb2ru5Nkbkg/4kJ4a0oNuWovbu3gUQWYiIiWs+mZe1zEIg3a++D0CKD2DZszulq1N1KFO3NXhOyMnDUoLeHMR/F/ZhXyCrXfAxJSMQNjXoI8jYiGncns+MiYaBJ9vMuUMGmDiZcICprERWykFIhJKdMVTVXKdf61KCHlP7UTv05I8NEJXFs+dLwV5HzqQUFszaPWiyKRbE4GFlfWfuJtkeG5BcVg65t8VvEvFOr56uHqvd8PBnGjvIZjFDe0l8NwRhv0RDTPpe6Xsfj+rx3wjmYh4fZz/WEZ5vuobof9f52p27lhkJvb7vXXvYqjbX8hyM8E9Rrs6djCDWQvu6KNZh0dJC96MTQ3H2Jt92+Oe99YTtmD0EHiT6HMDKNVUdqdSYCQchsG/lI54RtVBGyVfNbe3ZUfxxL5tjcZs1ZbKrGGC9dXlNzUou6c5V1I+elIXa7HxUv59ZTPbp1fv5CYlolBDGbuI7HF0KGhVhxjX2SZZNxCipOe/bLvpbdqHtUUVrDXrm7GnUYbfXpR1P2AgKM+/YtCeeT+DxJm9GDRXQgsykIEXkcketh5rmvPCZzTEba/uFePombSU9QlVc0kzWQmSLLMt7nMoPRhVmTqaAuqlxb0PuGd2LvUvml//TYA+XayQhv1rlQU1CuZVlmuZZfu2qPuA8t2K7v1KPi4pIYkXcKHzOl3m33Moxx0DqwQ6n3NOw+MQX7XN0+Q499MjXGW6+67f/P+l9ei8d1Rs7VPbWNPXvtsa1t2avtnh3f1vzjO14fGEY801Bvc7bNXcNMhrZIvV4WyyDexp6F+Wgp1QtGA1Vfkq2wu9mD8HuU7vSmNc1uOruaWcnka25i026/fxDosLWPGyGaPaHWNqkQhNRqirJHUWYE+oQhRbIWrTlNcRkPoqc4t1ghXDa5HxnFLOaCey4JJip+hlRllR6a1kdBIORCktPWGPt6iOgWXgQZzpBAEEzdKFLpo5rlHu8LORD40/aUkwHwV2MoHColSnRBXud941IcaWmglse7ZSYFs7jfyytNk+8SVuiV/dllloi+OGpz5rioNKXW8iilPrWMRkTLOHrQp9c2M5xInCXQNpRDLcxaWB7XWizrienBolbm86kMGc6wh7iMpja0WRmrCFkCl4EM97l+mOq36GjYmSpvxed9YjCvmA+hu5dhnzOF8p7nflM8wRPPzLwMHoNnLc8/Ft9r1j/PTJ7gyROvz7dva2Osl9c4W9wLJXfrtmdb4u0Q7pS21/d6FkYDzcbwr9eR6pZvGKHU58PUhe2wDfHXEzrC2kaP6T3NeaweE9POZCb+ZPqAabOydh/vJrEjs4TambZrE80fOI4jPQ+H78DrViEU8YIjGaoxl+nrtaIlup7bnkeU2EbIEM7Qft6X/BSE6JghNepxuqo2fJlCSiSRU0JO7Tx8f2ZoWAlKoqIim7a9UNQcBgvFlMzol652zczuW6CWL1fxyUZqi/VtZqJCI72KzEgegwiqh+cQGuuPe7mHxbRMucQ+1LDn4D/7E10hKp84dnA+xTQVlCkehM7ITSU1ib2kjLnHLJOt1rSoNVErfT6FqRbr+byXSU2Lx/WZFiNN+remJladXv6w0kKWsdfeq33uFDvvINrnqneaOz3WW632VdHuECic1nRLt8b2vJOxNfs+cef0y9vrE3ecJqe3M8xYpvf2/D/m7fj18nZmcubOOzcvKndOe932kPNfhg4Nt7vdq1/D2tNQ1dx7zBJm0H8Vy0ButL6mZwxqR7EZf/3riaD1E21m/h5fY3ZHZ0L+iESSfB/cbOSGum86iDlVlpgue2umQw8hvhFl3l6HnTlRUQOl90FrJvLNGiIO89JILvu5ZI4nYm86tm3r9RyKiFSmIISNKqpO1ZwSfUjVMsOcrrdrNNqvzHjI037WtrUpdXp7ZRPKEIOidNg9j06XfMtrK+/n91Do0Tqrv2TmJdZvQUTdcuG+Q5Cck8xCydtDI7lfREvKy4qQP9zLZ/IySWbfHYjea6boh7It12BHIUqmUJ/y1FF4PrUYjXr0kO6eW330vd36c7Jvu7OkKnLsQ0LNPabGoqg/HtajFktdeFzPssQqURjUYU/UEfVTMDz3PuIzfrg+44fHwG2fI6rqLdE9bZYZ1O1+FfeRbn/8P69hbU/b3DlbCje3t7fmMXHmkZOBGW+be3JPzjZ4cPt1X+K+nnvPthgxZpgR79vrn3liMDFeXKsw8TawZbyNt9cDMxu7DxlEhNvd0R2nGnx3H+HejtTfPRrHPSLsIceXjdRFFMMot9fWr0eoldFKpqWjsmwsM+ZhTyPKRBg6H1MRmcnqYQ+Lltg9bpuJzMoWXdFN1xaaIF6GeLlGxXhP4xlGGaprelnferJKdPYRdOjzRSDzZbiYtuqaLYNrS72mz+irq9wDFUd1h5TIkMO0L1mnmfJL82tTepuz2HwuRIg8hoe3vViDy8zbKh2FktHPYHu5x5IUc5oxwQD7+59gf3JXMqPpaBLUA6Uw1SQjXzH7d8Vo+5bTZJD6HmTomTF1RnLrKdRmZdTGsaGgvH5YlGXJrTf9J7bisKoQ0y5VR3Zg1rtPrH2W5TTuI3Zw3qK5fhwz7zZN47bPUfY1WtP50efwPVb3bE+v5SQnyk1xw+P2v1hnuB/3Q3nQUsr16LXYq9Za4jvowLRB2avtYDozYaAfa80iM1RU9/BgcEPr7VYUmRvRde7vK4rf0cOKphqT+s60fHcSWZp4/Cihz9jSh+J8xugJtXSUECPmSzOiPp42h62XvrF9OMaEleJbxlz3RjT09JhQs7ecm+gOHbV36yZenhCyiXMInlHRdh0GiRXi5YyQisqczdBwCmLIc2TUKkKyUEbGXY3K6XojCmIRExG9FDhbGDaw5buZEcIUbD101HLqEBSC4pDG4XDj8javLyLPNX1rP+8yjDhOpapLiLIt9lY7bR9klVSUzJpMaioeqlC6gmqy61OR+ii2/vcRyf7aw1FwjsU6TPSarFlTLeVa03NZy+KZxK4MOfUalOedRckWxCrDpJTV7GMH25AnPst2v9WCZhbzVrtNo+2YYfbfv6cb93EfYfz6NDym7Lmvp1ptzir1y6qi/vO20OC+nlhjscoIhqfGDNFD6f6HtednBkIpH3tts2Uo4VbrX2YwDVxeQ03tl0OJ/hGhRZ+u1stqpjNzm1b3mJBTuC9haw9bcAnN5P32Tt6YDD2UUFXNdDT6I2/s3avKrCDgq47UgzFh3eaGX0aeiKyLcBNrJ5uLHmM/P7v6nhYS19gQHi+zT6tqQ1XG9HIRhNA5WzrsZ8iwA0Ug7Ng62LW3qc7SFRZeVgwSL7mYxagt7flPfmIM6Lf4OK9is273fM7ekufIPBGFfFyvCktLRdLkfi98km6mWxfe0/ApKlQysw6CRBGI7JbH4qnjWq4Fow3azvgeetBHyXRaxll19yCKw1T4VtijVtCLonA+65kWNV0fL9uiOk8rpk50OFdqfTz1HZPyvuVizSznLVxtYFLK/ef64YipF/uExqwfT71ioNl/0vNS4+2KM+f49eMOe9nW3ZzXI3crd+XMmTu4g225t7XMXmYmT5wTr0MrFKo7a8avM/QlbTcmgxLFFoMxnbDXtYzxQJ08zFwRJ5SIv3YEHU47MrlLTNehSULkjySJSCzfB7sXDXG+nHdnjWZJyJqS4Q92x76aMXnuJXwHPSLCHth90IxhtD5Qa12MxEoUEXGRWXmksmes2J1RSn6J16GVEEydsnxuNd7jdI2un17GNSEi3/uLcO4vZCwZWt1BUznRAxkE8jzzQLlNvzHdTO+LEBh4gfZM4CKLq2TqWdrR+xD0iWgrSBvZQ648Ji3m1SDkbdXoDwn2+2k8IHJCuFdI1y5rzxy18r3Z+xNkxmG8T5nlZVGez5sqCymiPz04eh9NbYup5eZkobPvQ9lQrj2hCKuWa7nWC8pirdbq9JzoU3GyXkxvn7j0JdvUecIK99mf2HnWD2MwTmn0mvbDMPWqvjS3n/tkxtTUvLbf6usPT69jvJ15+ZbT7NmMWc9eN899b8x+bNONubsf1pq9csbC7PF2KATasi2fYbbXPBktpNv8MP+et9fQl2Cgub/YMwaBsnNk/lk/In67T3cEPxDtiNFOjmfa8X1OK4tE1vUZOhtFW0ZQxsdlyyNGz/01jfYP/i3W/ulndI+wjHhK8R1U6BI63ejnkAEtcgT74RCd25N5QuzYB3tvDkWTaUGmH8YJK669ty69N81cIa4RSJPnK9MM349JzZn90BNeAtk2xFS8Wc89WH3mq1V6/ilyjZIAGdYpLc9el6v4/LsUTOVa5J6UOb6UPPaUpS+usYdGkPLcSEhn7vf0qXrgToA6qkAgtv0besNXKiqO51Oo+hTmA+U68tXjfLxjV4+ZKM/3Q/YZuWP/j5dtKfsOjaMWzu+DpRd7qotaC1ZZKNaIqdPUmVKntnQoP10NwUkzs/PWHWSeUNu/Dvc+YUZ1X/3WfdyPhjVVb92PzyF6XmNqzG/VrZTixMyL8XYMhmd2LIs1k2cmk+888fzrTDwZ5uFGGS/V5t1rlRWM1zZVyBktay0TRYNt7QwzU2agYZkJ2jhZs81voSOG5sSIULrrK5N7epTvHg23K0nuSFIiiHvKNkPL3MTULBnprDS6Mrumj2b0sOsw3ZhzjIrhhGHguiSJVIxJ/BCTQ8Q6Y08J21n0pjFGID+lS1jcpIjq59E6HnSEhDW9TEI1hJ6iQ8/99+gR3amUufPIZ1pRheTxFCnJXSgyo3ukImzIv1D60p34buMbqUUwvXxwRvJY1ghtiAoFWRsFHZWGj9pAH/f0TxPfz2Tqc0/LnZkFddaxYzX2gu3MhKnKdLwoBWVSXXtI90q71cbdWXPskdq2jM4IJ+a2eiQZGrqHa3ldCwoPz6KsYhNZp2npMHeGPkWKILIJI1VvuZp97DtVr3IRY/IWUXDp3jGZfy/12m5NdzMLU6Pm5Ttn97pLuaNnzn9P1MBgvA7GMD885ygMM3SMmVJyTvPyy8241vZ9rWENDQxy77UtXeSJR1PYYnlbAr0eHnnyeHunzej/7QlExNFXdPXv0aLH6qHN31vLHSFLElk+7OPtNlVGIQw5tWR+Ep0lDWePaafdrddniL2/imUEeu8vp96yVcqElbJ6RHSEuiJ6kun1B6vHOPMorbqRORnC4kQrYTiVoWqsNVQ9uMkj6Z7u0iC7o7KfHpm6aRr9CTLsoTKHjcJkTqqpXIoUuZb+qhVJkE0Lp9nYH7T5OC9n694tZ3CLJU7y6YLE0caZ6Ze3UZckqpI/3NMryT4z9D5JBvjnq7Qf1+23fKQ4z0UUYSnWmh6lPsq1oD7vSJnQP9ugR+SOuwfsMpmV9e17lMUeyrUWZ7MtDx4UHjU9/02NUJZSzgj2tV9ztLBV3NxsriHqLbFc89rlcN1+wsDRWo9bDBbK3F9GGgPRfjys73zb0ypu71/OONVrTTEeGO/r/WhLzrwURbU7z8STWYMhT4anL8Jey5heHozmpna+11CjuXPj+vY6p6rc3WzjdpyMEqHvjdYlULG00R596DEJIQSRyM0pVsbkdClaTQ33SJfQow3Vjjr6QxT3rGW2Xo1FDqN3L7jMmNTIxFxP7qRV5Lw8mS47dG2bbjrtEYGf4sfFVFEdgxq2T1XGRCK6XROK0LHKkBIUZ2jgYrdKNnmpkVALFVnuMTDiNWFDe97aMoBBfFYU+7YQOrbjc4pwEi2NJC1rGJ2ZgrakhDzX/Z7uMatyKqrUapFQuxiri2x7q7ArtFImhTLLUo/JozyWZ8poW9IqQ+ibPZqymSc2DWt3yFDrkvXG9Eyen4XlWK6P6xOOyvecPltxMur0qRRT4sp2JalczKp694nPNMP2W3D9Yd3XNC3a5wiz2H/cRmvIxy9n4NlT6Btur0OVUuQMd1DMnSfet7dfXedcnsv7GSPPv4N6n732YE3O1CgpdJsF45fdy/OwTLxGt4mpiDpPtAh+UB1R8Q9VIuq3PkYPq7M7k1PCnYSE2HTc3pVimnhHrdpzEWejmTMjdSOjJFV7ycOGblyB7sOBuzAaF0bbaIhFBrLOS9RW1tZMs/YT+swK4ppMy/Un1JibLv3o8q4SCL83xV3iVGQ2meo4VeM1eJOZI1RLzJvThsoxosL45UKEKX3bPgh7/4o4q90XdfupaQnihryukceI7HmOjhAl6N2ePpMXSZvYHTwMJDNBnP0RiP1DNi3osyfzMRVlqj+FWfBWQ/J8OsaRQadt+0YlUCFLW0HBQVALdsEsNtRFXYydWqmnFGdKt4qT5Wj9OrmSnCSGZW8/YZ88YXB85rmGgdQ7yBM/3HmCehmk/fE8ORkMhtnP9Vzn6J4qVUVf3LTqP67XUnvt5fqu63uwvA4qmB/vo/YYr1FPIaiaeB0NfVnrH3vkibZxuq2gw4kgos6N6miOqNVd9Xwv6ZKdcIfIHcFNInNtkDaYzxrTzdT0u03WZJTVqaw9Wo3JTKsHqb+l4TzrgCtdV8dAZ+WjVZeF6NE1ySmkD+G6bI/SznTFNQhKijghJT9VyJAxYEm4+SMmcQ06XwTRJfopnKEbNopeRg2TWc82rBisHP7TdExBsvjjUv4X2bIfbuUvHD3W2fM5+uo8pzHzaUQaWZ9mIvvYy8j9nu4hPTuJYoIqos5O2E+ylj0QURLZ9D+1oBazoC7XYo2cPfyl9b9L6F/6Zm1LmXBi0/keobKZGmsprLZwPp4JtZa1PCwh9anvQwT9qBfFiH7hJO5N/KvYNsu6T7DuKLafcK9trQtTomj3n2Cw86yqd9znrdu62/jlkzMnjP9wbHNenp3n3Tb22muvbmtbLuf0eq51x3pirYGBYcLzKcbbnG331FiTlxZyB3qd8T5nvL2ebEaeeiq3e1sx7rv7ie4IfW91VKmO0P0WXTrt7gg5JQlXkCSa1SEeHNI/osIn5XTWlHNKrfZKe0ZjhE2WKcd3kIMjIauPy9n6iSabLHOkcX2ZY6NtDpGZuNkmy4brkXHsY4KQEJpuSlFm6areTlV1reU6F5F4WfZIzJU8VU7bkBl7j8IKG4J6G2ys25A3T2miiNc9hgOFjTFI4rMgbPtr5OOWEl3KbPvZxlGKZEZQ405kzZ4E0x/u6x5gQjmYOr2medMzGtkP3xZ75oUo8/nUsh5WKY75rFmUGhlHTU73CGVI9fmcLffm2FD2RC1B3yweTA1Rrm3bPCaTco081Wffi1Oy30+3NYeW5L83kcS5MUYUt9tnsK/t1lzPZRqTecc7fR/xuT6XUdNvvXXRNy039cgzM4zX8fqs2bPX/S/rmZVnsgxPxtvl/WC9iDN4YLy9ns+t28MSbwdy56btXp5FR3OjdjwPBA/NvVkxfZznFkLR5xFL/RZN96Ld6LrHJXGHPyL/KEJyBVlC9BGv5XaEmTW7UXS/iJ05ekxLp72fnVH2V5W7l9Jnajn6iaGTTtqduLU+ssftckpGS54Q25b20XlGZneOdiaIl0FBh0R3yRiDmsbbj79JQ+do2v0ZXOzgLJXhZkKdFx1TGfszM9N4BOtQbS3bmFkbhL0CkNoIwCC+fDZFjHNbsb7NzFGHQ0lP5TGSNXmOOpEZ5AQD34fe74lXAko8k8q6k01lWzjYaUQs22ZZs0z1R03Lozyf8vI5I7OspBDKz/P8vI9KBlGwVO7YOpHohUWx6vMIei0oy1KweIjgqdCv+RB1KlNdp2LvJfdG5e5N9vdJLpbiPtHuc5+dWj9syJgxzJlSb7X7SKNpduYdY96xl7vU+xo9hltOkxPDDDN7LdNtvB+/fqk8M58zd7xvFRXd36zaQ0wMHRXqbvf0y9uibt2z41nI86BCLQPn//mf/3Pe0VH6936e713qCSXq3I6KqriPJO6L/PtEEuKOiB23X95oTz5tplIa4rpHM/G0epvJhP2TmTw2BhEor+PyfXOY1MFUiVrfbnb2sUN6P7spZI52zUVdx0bmFA4OUaamhqNUtozqShAJxGwlPc+FjB36GV3Xw+589dy2Qh8Z4qJqjsn5EFs5ukxK8vvQLnMJRMUUOAiDvf3N3jyhWR1ysEQJctF9vUxyyOwQ5PmQRO6X+VQiaaf4U4J9f0YvSAPHyTF3CuZfyGvb6MzaELeBMlc5ZVGus/B4pigms8RzR2OXtrJjHQ7nU2tplcGhEI6Xj0SZrMNkHWu7rsfH+JkmzlSoE+Y7hdS5SY6Em9j4YepVBO788uOUH9+eNv3WPqK6r76P20z7w/hc7Glvrdd6f3twf87GmWcYr2XM1GtzTjyBh+eg3pbKmb3uPTUsRtQ8TAVFu/+ZxWDG5MVeE4yJ97ltEzjP83/O8yQ4nVardQQRURG6u9bvCHckf0QQcl9CboLvA3VS423GmcJpFUPoqJHpMdfROfLsbu3MdKbYPg69I1OjuVpPfQTzCsuTMfNY9/FDj9j7R+cnz0h7bDKyplA/hSAqxF+MClSMP17eiHxLOvx6VNBna3n2Mj3CCgRBZ7Y+iEGcti3Sz6Cyl/W6lcjrrsAhBwEb9oP8SZhif2065GzZnI2soeQxS57z0+XzKkVQ93v7Lv20Ftd16nKerYfJPGOqf5dZiphlQgrRMkMN4jaEAdGPNfSjt/Co89T7FKZdzVL2GlF1rKBKIiSEDB8zQv3ERQQV4c1Fv6klrP0v2d44RaFma47sFsfm7HqmRg3njsm6U6WbHq799TrfI5dckd/yDiXUGO/+Yn9V/kijfHumMD7uT/WiLkMxSpUqu/nK/nXypDzmnZvYKK9T9UkVzyx1Y9fe+0ajPLcz8XZu687c1/ef3tXvF9fJqi/lamW1h0bXbqUzrd1jNCaxQjRZSSSSyC2JhJDY1a9lkyEkCrXO8VnlnVa1aOeUU0qdnmlH733MhsyateYfnYYQ+Ud5ScgKmedaMnORZoi9n2uHDJnJzAUhJ3kEqZw7NCN7is6RmZAQInY/FfKBovSzRsbpJaibvcJezLu6UaHyPXe9yC6aykUuudTtHM67+l2ldQv6EQ/lfvm0QkGCUwehERSHBIfDiatt9u4iay0/2dt/cGs43a6Vd9dknX7S9EErE4WW1ZAS35yPQdkXIaSjlve3bTnyrIX91mJcI66dO5VC1hE/+xgyEJLSsqNJVxCe4MK/hbX+TYpdVqw313qt7M9WTo3sjkbqiJfhIOgvZHP+rD/ZQ412p7121//uH537xNt602Z8rhnFss/9Zd66/9z29I5SL2iUUlD+4qqyY/d2so4kJYbZA2MYg60/UYttPpyyB7dDU/4c9sN9Xm63de/dbOfbKeMnEHQ2qfW0Dpkf+xiZ1dgNV4hYEYkEIci3liw91Jk8MnY00++nyXphuJ/bPcu9c9+ZUxmL82N/mHdnomUSCZPIScYTO4+XiFgXsWJXWUc2fbrH/uWCuELSM7SekhkXQdh0HCWE1EWjtmiCViutayqQE7V7YK+sw5TYOs30pLQao3DXYI3AZpfz5ay1+xyf49eZVHKHRFo+LpkRkT37QSnk9X0WLIdY5n5v/45omTmvVO7lPJ/ZaD/fUHHthaI/sm68zZgpMjPo4RpNSWML6/vZSzvHs57XkuhzJdGkKBWmLcbHbOqEvBAZFxdJQmdAClb9/Muy1vmuFaV6zAr2555FN2WK4uz9mUqKU0cm5sPxev+qoKF5+j7uE4jqL/PBPuwTjBnMT8hq2xmOuzf9S1fZXTbO/UonzxzkmZRpJDP72i6Focr2cZ0525Rv32iKqvqDbbu9nDvNdr24zsUrU8L8xPtJMqM5tNVmtGObsnKRyIokK1fgTkJuO/Qm0iUjWWpq6UHWmiN3vlVs4nUR78u+88ZxiIiGaI3EjRAyyxYSIkm4HiGEm91p7n2dh0qQEMQKPajpHGpiGnubOqck5yXhJQ1CPzNk+pfM4ZpD6CUqpYJiEYXYUP2lnGkYVHtZPYlVf412We9K+djxOVK6ZschyttGD3uLgjTeh1QeGyHiaux537u9/XxhT6LM+eqxXPRZMXXJ0RmXQqmcT0qgo+QzoCKUNDKD8bOfs56N3ezfr/2P71fFpbf0JWrUCwNX/USJOutj+rj1gWwC6WNF0F6b9y7773qz3+qUeb433UP6tzKoHBLY65n9zCjD2c/eXp8/59lkNfKm14fqS3Kf7F/3cX/wOfbR2IEazJnDnHSZw/TBnHGM15kxSQ47dtgwKEp53V6rTh7zp+svLt2u9cf5e9tb3V7PfW3V+8P7FFPPUaya6lXEzE97TMt3nt3WTzNHxhWS5CaR65KdJEIifTR2QiSaOVMyI9LfZ6rvi3pbwtt5Xup86DNOu71zJxEREVkS65IgxH4k62IT4rpI7YceU/bPKJcXLwliwjVkxCglRiSEm721BHdtTWbvotGtu+8yldmWUVCMJUq3opZ7hIrjP01jciHXKu3g3PaL+M0URfqV5xpx4zllRlLymFqy7I09BKFTAzn9eUCSuN/b39t0r08T/bxrW/85y1L/LpN3Qv1s15rSAqFlfDIgBalhzBTDZnmzrNjb+3s9x/mt4Mp6UfG4WkhR+sg+VUd+kIE6GfDciQiNoAhyl7xL6oUV07Wya+gmvUaFGrGrA7s/s6u+mhr6S2wvz+V1P/Up77vPmX9GLs5d7Yf5R9CM//Lu8XoTkzLlfOhvkfvumC22mM3M0D6cb1RtHxfHZM7GeK1Sd99QVN3mZN+5vbw99mbzPt/PspxYNTVxsrAmmZ1aVx4T0kxbvUkSNNwkRJKIBFmERKk1mZElIVb2fZWec5nNmJmXee+XuZvrnDp3HzREFZFKlSvEKWTZMkSdoV1bQ9bW3Xj2zEsgCEJN+B6ia2tHnunM0Z/JJVwuyCnkklDEVLyGdEY9RwMV3iyjQspNodxjUOKUJirdSSLVmsuKD1X1Gwmq6s6vX94QZEYyo6z5yYSCZE9mRyU/2ra525u/l01P1VzHtVaMPp/1lj4/j+xWGbt/qmiF3O0FEWhpRuYoomUWx7Oe/bZn/9ivZes+1aplt3plu4pk5zDHpw8hBa6nUXggUgqaoLC96y07+1V2mjMO3G0PZ+i0ivnMbtfjMz3rDpzb2XvPva97Atn9jCTk6nzpK/p2Gs1t2m3P/S8pBuPb4/40b65RLkMNVYrxzan9gpPnZey7PV85f4GtoJ6bddfEppVyy3PYH25XrXoEVlmvTNSUkY6pta9jJj2+v0xDv6+8rlwJua5UknWd0psaIZEs2ROjc6SnSDqtMouNyukot33uFUePxYgioluj6MzICrFEcl4R546MEGcqFEYebFP5DDkJQuyMM0TPbJnpmqPkGYgg3Ehl99k61n6g09XrmX5mdFCjylaJ6rAS9vjFcYYUUYgyV19y2U139zlOpQo1Sf1CCjX59ctzZi8MnHWJk5aenOxxJHuZ/fI26lJk8In9/1whEr2uOj1wyxxmSf3RzFIxVZkQVHD8E3vMklBSZPqmMoPk2b1qBevZ+1nP8hhcyip12pSm0kU8pUv0cycRNUFcMrA8GKmQi3qgvJbNsUgyK/1VI+xQVeP0qKGPMCvVmOfBuYM6nL+zx60vt+dul6A+Bom3RRTv9Dvd98F9cB9p/+UqMxgD4+Pycakqds8uyselZsfMlmdyZsxh7Ni3tg+f23Lserg5ilt7TPvldtV6rcIqffTUQpmcIf36tUMTd55pSAjBhdyuh1hCkZBbQki0a7eXWDtkfmTEqeZT8fZ6Zzl594yt1Obc0VLUrO+OST7IzLnluULkeaI3JXaJZKzrsdMcz5O6cknIIpsQJiMEl2bYo5caIVwSzi2h/SuVcdoQ3fSg9K+YfoYzUKruHZsUZVRZpSkUd+nWUyU2kbrybV/nfMnyjKAeiQ/ljpZUQnCN55Q1QcNt6cVzdGYKGg0dcejk/gD+3g3RvcbneZIYTW3FPJH+WaIX2yONIIgyBEcMMYp2Ebs8bcOK+c0y7ylNJZfOPdUv/T2FQvp4TZS6yCYkVMggQwX5kBC1NpJauqvqDKXKSW2dDEyVu0u3WW8KwobUhca5G8Pfj0QWqy9a++Fg50l5q9/SLlrrXbi1S9uI3TXKr9hiF27tQmyU5oODOXm2D8eceauaHaqh+Hr+mNiou6qpunOrx55u3memPJmyamo5J1uFnpTVdFZjWnNnKG6SyLoShEyaJVu6iEnsDFkysnYPxM5oKunUVVNbrcV59f1+OquF/l20IxqiltSpZKJW5D5vklnXEpvMhDQhnDl3RteTzbYiuAjNeV6IFWp6zxQxPXSehHCfgltItErmCvpmh9ZU9KuhGRR7mL2gcj/GKDlTI0qP/gaFOCLr3Npa9676QEoT4lmzfv2yJlE3gg8IURANkZcptRCRPXtDDVnm7gD+1YHUqXoWIyNDO/vuPxQylObvz2f23BZjZskcgUhRQ5cYbtMMmr2knv3Xlnct+Llp5p6GPSxbPk0WK4iVF+T9YKgQSogSQv+UxJIz6EFvnVFDDxtKZ4og53P0mzjzPo/5WHcPL/dTreef+Yfn70cuzMd+GNOjx4wxFPvsO6/pfucqf2FVoahSyjePwsk6WUee8eXmvn/z7Ythi1m+/fW4xuvbKS9vre2bjUy162QVfFvW3aJ61VDhO9X0mL+r0x69QyI3Ibkl4hchLolmTZh8z840z/6rmqwYNUmbr9YhNs50rfXGbqOOmpgHWiY+ZrIya01qmeSULSqShhDCtRUho8+zMjMRQSSIFWTOiwybzsjojBJCROS68hlBNEGUmvxbEbKDUmdqd2xOz18rlNNG2OSetgoF2100nWt/d59033f9XeUZ8euoKqp+wSGzr9e9ynMaGs89iIe8TA/RYJnRxwP4Q6oOzPRStZ6j74w+Hz05xxG6klGqnCfLNTNnqkACXXGbdv2WT2asiJ/9OD++31PNasUsTb1kXOYrxdI8V1VcWT5OxGgymmcXhIZQ8bmIpWajapzPHulWJ6ZQQzMl9if7mV25a/50YEMItv8xmDZn/T2SC3a660n7HH84/jhPfsWfseMwajl5jHLymMOcTKZq3+3+mYn04cAwULW5Xouq+po5I+190+VluanHD5PoWHdWmfM6LTWqBavMmcz4mlm7s5toSSI3CVmnEFeyq76TUa7Q33OFWpKRdWboJAgrL4ax1eBttbDOYS9oyKyZMiJDNOTGiUwS2xJle9LeW6YNHTJnTuQSBJE4bTLuU2nNPgiToz0mRM5UGiuNICNeiw57s2uU6hjy7IV1Y1HcBsqtoFBInnthr0QRtL2X6lLE70wF/UsQnBknJRTK2sjHIYhSXvZCXCiN7FG5O4CfjwlCf172vfReuVVb9B9N9+cMHUXJ3JAoEXXU0AeClmIk6M4MYz6H9XvrUQc/Vx1cWdBS+Ji/mJ/IPpC6yPtnREvaiEbcWVspIon+OmSo/toVSM8aVaOwKydNn2cStDNa+q2GLZznVD4rXucf1V99m/ln/nmS+3h7H3nSPmcMY+bjv3r/fL7m5PM3siv3nZ2Gu8eH4+Pxl+8wmxgfnqmvZx8XF/v+rV3r7vs5z3mmPW/npNOPLlaNamHdV41zFZNaW07To5kjmYT8FKE3+S25JeE+70FvZZJfMpMsQZdGk9lp02NVGytBlVPelB6q2Kei39lLa0ZMIslMLRE7LyJO+wm3J/IQ+9/yELr2kX00Vy70lBBL6BAyymTIs792rQlBpGJTL0WqraYHWUOGfqZbaQPFQg0paUPbHH+ulb42IVtrozV3tI//jVSVj/cKlxmCyMyNw+FCtJQ1QeOc0Jg5kRmk0hi9P4C/97t0CxJfevrMuz9vOSp/KuZR0DPon+2ayztzxIE21M0h0aR1EwYPWes5c/u50vKoUnrpKtLVfRlRR1eW8sioI0x0I2T/gYpnBQmFwW60Gj125TT729Sp6jBruLZDt1Y1+gxhf9jmfI79iwq5zMd42/qef+bv+ZWC5j5WP/sQhv4Y5sUMM8eYKh+PwRgfF2OK2mLHbL0VVerM17MfNw9jRil9FdSf/bDdbijhSTp9j6k8wvX4NNXyPkdKv59F2lnNTEhaVyJ3JBES5GpEerqQdSZzZO2UhIzMsqfHWIlihyzxpsuoYzdzhtlOTz1BRGrN3Coy6srKKZlciqgVO62m2myJ3g+pPMcEcQnxCCGxQ5HR/fzE5JmjbyIjXEKcKhnn9Rn9DN9sSgWZ6V+1taCsamKvprB0YUpOYaYsif1U1X3SupuU8gyUEFOpon+NkoYlHVKCzHzcw3oIIh+G5JOgmO4OwH9CS3BIatrolhGHg/S/K1v9bNd8RQ5j9rduKlr6KNJdqKjx7Bmss1dbxj19zNfsPVjmlDisqFfsO2FOiiIYhPEyhbLCXQhKEClBe6ZWo98braptepD0bxKkTo9KocZtPSeUs5/Tt849n/0MQfZjGu3XFf3OO1dfn/chT559FlXKYBiDYsyU12HU7GDf7W5dPiwKvp76SsbroHbPdgvuvp95jrnnv2z6nPx3nnTTHfo6pwj0qqlJTbWYT8xPMk3IQsgtidx7CZIVtGsn0tveKCFZEs3oH8gMsTP+oYzdjjPXBCct5/vRlbz3P+t2r0dTVyNXZ+VmTWrNkOUiJOK5iA57CBt7m047o4glRIUaIcSoma8RMqcS6wVZUi5KRpuWju2xtz3shz0HGwKPs1bGxqmyyvEYgx2tv+yV50oum+7ovs/TKZoWNE0URUlZg4bMcZmNBlHpwVkaa348e2bmUTS5c4i/3JY0Dp2HFPN8lNyUglZm/1QXcQ3JJ9QgClESmorGwLNKkP/3870eF9nsu+bUiTHu8TJkaaQIFXmnKCQsgQyVXD21iJ71GNEiyCKrRmWXanPkpORUcZ5d0nrUyKE70akeR+L1fNHfcx8FC/tReVM+99n5Nb/OO2h/eG/t3oiNmNr0Dtvd6O21t6Y0rUoVxddT9fVsr+PD2T6uqlpbF888z943p+l4nk66hk7XI6OsYjxrSJlwXo+U9WozjWPuRPLvk5tQIZHcOyFZArcd0lsqIUHGdvSwGoqgMrzcl6YdnGU23XHb6DNqiskxp3DRcxFnJFbY3ERm7x7sZ2qa2WJjF1kSL0LGucmoR0fap3bHbOJM3tSVkZwyNla8/uZUhFNsoWIE9QMr7OXuYguKTeT7eL8Nkbru/qK/1t8F5YOWfGhUl0/zWIULTnA4e5GgOCR0dDhxWhohj2cv+ngQv4PuPJCelfQu6linf5Zj6Qqqgp21ibiG88mALbr5xjAuSiwteF77tcqQ1D76VFGZdIs25zJhVJGVfanY+wkf0+c1qOFCTnSyjTvbLxcc46SMtDIz1IDEKXEGMinUEByd0hrjZG5nEUHsX6yZD2N87q/T+lfmre7+UqWUj1uhVfmfu6ooddIXt3amxDCGHbMv133ZvTa1cM+bwxlJdKfpkf+O/pxY91VTU6trRJlzOR6V0T/6lmmY7z9CQv5Rl4TckUiWQnqlQ/5AjC6pxmpmT7KuHg2ytVOpNvF+Ldjf1Ot0UezstNsGqeZUWrLcodZETpuQR61th1uhPxP6z8yOzSnIaWISwsS6xC+uZ3qof8g1E4SwkS0EXTIE9ZAq2VvLuVFDRsVWN1VypWBoS6vpuujRJhRW5FrdYnpnLx/T9XjGVFVqNiKNRG58HpklInv2QyGEPB6cx5A1hzR3B/EfJIjbE8Y8lJia3VBZaLa5XbMOAjFzaFEM1xI0gzxbs7c5iGXgkj6cqqlTKuunLjV15jC3rFAusgmeT2iEWj6WERlqdgTWM9+qjMwqbShHdze7v8yC7jpPzUpa0WFSJTB/00w+3GeDsP/YeWA/BqbNPv7wVuHIQx6p6sxLlZPlzNdTXz6++24y5+QxY+yo2b25KMZG/zpz5ux7e5mE/EqITrofOd1dpnwpq1iKb5F7pubJ/hR+GhLJfUlIJCGLIFmC+1o6ctMRv2TmaAl9rJSYO63gpvaFVmP3SA0pkj07YiYrtKaZMSLjDjfrvB5x5hFnbFZsRtk48+jM10gQpyB2EC6ErPliOnKYrxFnCELItDkTknH2MwSrQQ962zuwH5TNd1dh131akdWtUG7T7bX8clfrNqiiKeI3qsqsri6NMkNkRuIe9qxRSD4MqTwWQlDlB6uH8XsrEy3IhCFOdyK0zcQZs0vl/Gw2xO1WVGwqUGMGIwwiMlfm/7NW5mNO1cuImmIaQZ+lHVlHnzaFCKkJ5tjBswm1bVGzAz17EdRNYsqsSqiejFCp/K5Rze70Up1i/AdnvifpQNc6qZ2iqf9t+APMXzafynTTH+QRMxozHwVzkPfPdHPfzZ39fOH+yd1wLxc5vjnbnc2llG9uuk8ew8zGlms/p7+RTlrrzn+w81bl+8Gh944yzoyaFL1qiOTuH5A/IpErSfONiJukkn/U1dBLmmlIRuaRudpj7RAao7PK9Lfe3Zm+O7syWeMY0o9396Yf/VHk5taYg6zIuugUKiGEjlBaI6ObXkdnCdyXSNMVGuc2zUyMkHPCZIR4uULlouxHhSHUOOtpYrhGZ16+aanuy0A5qI71B2cG5ZzSUIuJUN1XyDV+pzyroz5EPGuqINJ4rIc7aMtlRhoXQkrI68Z+OKVflN4k5P4g/rCylGAhDyUpvazh+syMkz63hdr/2HIRxcjM2SGuqWF8ogmNRA9D3mc9x2gn6vi5D/ueo6gTvy11tK24YELBnChkxSWosYj71chOERkKgiwv5/c0Kj3q3bOqUzUcz6zUUPQ4xTt3jf3taAlyVc3dpZS39ZnT/T3yde5frh+3z5YZjzx58sQYDMlMSu51J8dIY8aHw747tp4dGy5UwdZf2Q6X2Zg3RKcfnROt01WV/rW+6eH6bU0R1nauGmrVeCJubsjrchHBlSSNhLzSZAmyzuyZZtmhx9oZqVXasrv7ZfIQtepdw513G/b9uR/s+9F4zNQKWa4yLxrj84iLWCES0jNb6IFMlR7b/QhyuYIQZNwIHc1M1xyd6bi8CSFnEbOEwg6Cy3PMhhWCdj9ksF+j3uSYEpU+d3nDvNlPJZJsUkl0t85ch4b4ZWaZRdVsKGsPR5DHNiOfJ+uZtZT1GmtEZqNB6d1B/M7fC0lX7DLa2M9PtOjuDhmrP+WvFmTM2M5ySMf+0YIx5sBwOyiIkp+V11LyOlPHRJVO03X0UWfr5WNCkB0qJC163olQCe4/SjBoKiFFghWJZT2b0eN4n8+sqBph1rtrUD3qN/pNnU92d3Vt2b2qPrPr/6kd+qu/qr8NdZ+3bus2TdP+MLujtmtf9p1jEzBfYsxuY1/b3Zrm4sIUNpw8MJmz9/NnDDo6IuTphKOT8px/ospJK4+TKfM5+kd9nVMyNefVdb0yeEL+vSyE5CYhlmQ391mGrKvRZO+YrwwZDTKJNm3Gz96Ojt4003P4HHTXLs6+9yNaE0cTExkzcRa3NbunNUKWEOui1nWmdJ7dzNHuhmYEQUgIYoSY2Iptsn3NoYSgApEhCFumu0w/W2S6U5mhP2ffVGGRVNo0yx4vxaimy4rG5X7Ct7/mqU4pWtQvuqiHrsenmf3AeRsnPTyfMI4b2RuUPEddJD4r3h+E35PQljQVeg66GTJUmPoz28uggv17xs6s2NRQZA1FZrSYacZwPZkhnQkYxeTXEOqljhRU96KQZU/FUD4uJVGQOw8EFSRSIZgiNzF2SSnn2ZJBYtfodm12jQp92J9T2OuDal+NKHKJ1xSl3nr3eet2e7joRt/yYSnV+za39v2Fu3G38nFdVVQNdm8cWVUXw3b3xQ03Av0jOglJ0q2TXU26eLo7qlbRMTUV9HVOLbdPSOK+SMKNhGTpH1DndUNu0ck6V1SsJiOWlPg+6GiLaE679JFFrXOvOW39PhYciMbMnIgeWfNxM0RD0vMJccaTntfaNAub+iljTy4hpyDEiEkJaxNEM0fneUq8iZKEEE2g+1D6Iw8JfehnVBiKUOW1/qCP6k5xd5FFT0NVRFzZM2G6MxzKx/iYhKr5iM/VUw6ReeS53PYc0paffFLy3KIj0vrbDvMPKdttHi2wlJGcz4HpyLYc5xfHvrCRv+OaBeeT98hnaIxWVLqoXG5z6vSZruozDjbiPX2iCVlwyeijmZc276RUqAwMKw1RsLeSsGiJxAwRVmcpMarHNvqg3+p3pRtN71Fpugf9f09RtfZaVbW1o2prfjPGDxdj3vKWm+fqx22lFKZQFFSNUl4LQ9lho9VX1DEO5pAbd/u4u8WJ++P+0EGS7mf/Gp1COl2f/XQb1ckQjcrUpPcWeNaQmzuSkPyRS0LuU6JJ/1GBRDKaR2LSktGyM5IlQ0aPkU7H7klRU3Pqi8revaO37Db7g4dWbvVJ0XWp1NIjEjJCrOw+5Hk02p+nTL/PfAYhJiEoGZOZa5ORnnuMrjOEM7lCCPoI1LqizXDuQFSVqP2gGc5tvd3DVK5STj/akPyO0VQHiZRbq6ud8suOX4eoputRHhuzDoLseV8jQiKhcaQW0nl5DRpqNNwdyM8LacGnFi+LjD5/+mahbxyz2PuvmcOgbeGQmaJkPXZHkY8MRn+G9Pjq2RK/mOsoRjf183gpZ6pltwqLPWT0CyUjCCkEFQuVBNlt+DxvWI+FBMMhbfT6Z49KVJ13Zg9pXam3SRkVqNRZ2Wsvb3OVsyi7YfXYx1JG9TvvvGw/1V93n9Sb3ro2vbtq9xZbbBxOOtkn+8gcTO77t/HNK6Lj9fcVEe01dKeSX0mU7qRLPeluklR5ep+smvpyaFKjeiE3fSIkN1ciCYmIOyF3TIzOapClCT1Wou2yM0279kzSo9Y+hkzWHG5PM40+NN17BEkztETMIcJhXkWQrtgh9oH+KPJsncl5TIIsQehDuFBUM9Nfo2ZyPiGsS5BT5oWMxiMIrAuN0XnHPUhx22BtTp9qquIeLUX27tGUYK9Y9Le7v1PehvgcMVWlPlT59aHt68d7oIm8TELDQ142kGg8lg8O5PfmaAnRPpzKpidna6f+XbLvWuUdbLXF/N4/RMkbjhaFSrtGy0dEpkGeVclg2zB1finXvDP6aOfaPtVHJ/GLJUtV1JQqFWptEirYPUtgVBIJMyFiPsvL/1i4J6Ob/U9m6XcP1U7VSEVVBxNVa6/eb02Rra2F2e/c/Pe9d+MmGORhlmf9OMnkcKv0wdVHHvcwx8WMYdKfsSWKObiiI6Lxu/sjonXr7ujWJ+dnoZJA93d6j34nPH0yatXUnEuNwNPeguhcSSLrktIsGskdgdBEe9ulvXeKdBRNd6k5kh4x+rP3jN7IS4whdR77/siu7a0fYWdNFfc6zCXLRHpImaxrEzYZrd1Hu/aRufIzEwhBCMK6CGr0sI8do9N4OS85yRDyW3YjU/uEIFRMV56HVq8iMxKmk7Dc3nBMY93K20ogKXsOfR8pDkoaoQhVU6EpiJCZWZJLqIdZlI9DEFEQdGiLC+XDPB7IX9aaIeRiPW5JrfQcsu8+aDXL+r3Xz25IS8Tes7YuiGuQHjMY0pfAewaCueoEo48+c2dVvYhrFOYroeydfdjfyPqOzYGceVjvUWzWVmixHiuwyIrklmQpi5LMImXsZ31so99KJ0cSWXuZOD/13Ae7xVJP7t93f/8rktzkXjMzjP9qbLh/xr6VZkealGMy9509M5uXvzx0vP713PgR90dEhHK1CH24v0dUhpOEes6TcnR30b9yRjVldb27TNBHI3jund3rHUloonlFg9yToAf7mAZBa2Vr+jVUuWs3bfpsh+YxDadKVZl39wmH5jhIc+QyZ5TIEH1MaglbEImkisywn8lcx+zjJdkyEud+6LgyOnTsEtuYWELkPq+HIHDWpNJTqbBVZXrI89MGNxrUSeXKWn+gqtlID6acU96W18SVSpo+M57zRo/H51TNolTUJ9vLs4aDuCVHDhcXUlwKEiE4Oa+TyGwk0rsD+Z2/V9I+sbrrMtesLfXHMSKTTnL3zzPPb0SRM3NmHGhxbs6wx0xLShBxm8bcGc6Y9ypdWbp0zj2nGiHpPm01UXlntxr1U8VeL5VcqA3pWeJjpQhMDsK/RFw3QtGxpbVxzmf//K3fqVL7e+6+cmUrdZmYn/l5bHavtS75vM59bf47//13Ptn7ccd9cS9ztzF1YBijjOvDaNHRr3+Nv+rfRUSgWuvoiOgQv9+4N7pbd8Iz++kkJYn6OL8U/a6a+rYGIdtPBhJogdyRIFlJKCRDvolKRiq1djIaa3eaUc8hsTKKTn/2IjNjz8zbtbumtX2lHe222fDYxZpurSYxuhpjKo9IyLNTW1D0OdomezJMY8sSxArCCjFuI+Tc/1lMjkkIIQRRISNNK2io0NArQz9T10lo+xhbUOgyrP3OF8U9/TJdHaJ2v0O3porDQZAPmfXs6q5S1AeUNDRSSFnPzA+GrOexZW9piPQmyp1D/RWbD0Ndu4I1H6Sc+alk6L6XLEos7Jb5fdSZ/a0bwe5DibiOm0nIiPtk3/0YKo85Fc/LzquPaKx6NbJOq4xUr3resXcabMoim46P9UhyIILllSwkWN9j6qTKTHYJNSQ5qPfpq3PV7L9zRU7Nfcl89f7z3EN9Xtybzf1X9+79Xa/1+yTJf8dvEdHd4UZER5RLtLjRXREhbsSN/mtER/z1uH7c+Ie4P6IjXHR0dAR97unbqvUNFeGhpfMT3an+dbrb6HTTzlHLbRqCaEK4kSFZAumSqNyXHe1tN1Wz8wydZV9HdQUyK2nVVHbNZH6eiX79HqdH9mNnI20XG0KOltXlGpdyVlfOx7VGqZUtmsiw9m7tyjr2MToTCC/hQhC0LnbIeo6ar3lyPOIl3pUQgm8vRe2xh47H6NYuz/5M/RWbwDpmREbmgYU6xnxLkly5PINvh+dT55wDUR8iVTL11Kb2MYSgcdtx1uCQ2dLSeRHSsGfP68zMIx4P5udQljx7Jc4n5XUhULsmziQMachiz+hSsgpREugvsigkUMSpo07WnF/mvacy1q9gvHq/KqZbqX7N6auF7dOH556Oq3D+p633uizrpR4rehPcrNwEK5fDlJCgeyMZVZX3qeqkVY3z60DtJRefLYKq9brKqubm8+be7/1Gktz84f39d/e0fwQRfksdPyL+Gj+eiN/+x0hGxHnih8O5Jzo6ouP+o0FdGt0dHVHqXP0j4v41atHdqspx+np00qn+9S6DTqrydIxacC4IMqdDEy2SSEIi8rtJHsm9pyFryyCzArl1hwwZGhOkmp/9bz0k65mvcBsz9PbU7A970/Fht9uQdYk1r9OaD42Rp84YWReiO88hI669hy3hklMyifNCOcuEmylCTEaeEa68RJpIRslnus9k62h3oPQzNBB0Q1Gv9QeoqJXvqT+D7a5ckRALOVQ5t7fx68yaVbp1UY/Kw2OylnCNEy1BFFnbEDocolSQlkJwBd3uDubvVXB3W9R+8XBSHOe2jh5JBnusRWRBVjH2etiy3qYCadcaGmOm6Y6o06X2lH2PdvyS8qI6zYvqM6zv1eLKshTjMFGee9CItZq94syGNDMhyYxrWM9EXLOCjlFqnAzVGWXos3f7f6niP33MlrNQWyvZK7m5e//f6urrJrm5yb2X6+6tFREdEd0R0REdHa/d8WF3fLtxER3fLif797gR93fVRHR3qLcbPyIuhk6qHh1Fd6I7OamuoOM2iCYIzdGppHeSNrmJIUhotmSnue09e5pzB6nvdJro7q5qfx7J1vU8V2mefREfRtN+wOxuxxxqifYaTRlzEZGV51F5orVi7z+gP/Y6RgmSRYSlI2auZ2Rs5st0P5OZDiEEEdmfUWRKWPtBEZodem3smXazBb1oBqme42E/i9Fq0wzT598ilySq8tX6ksc53sYvk1KVIj39dokoqCN7HstjoRSNSIvMODP6clADIWuGeTi/R0hafFjzQrmFbmG2/4PSHF6ItXGeJmbQohivhmi6ZAxGu8+oJO/x6ag6NdWKZ95bSp+Q6kWFPdBDFAcNocJKaBaUJK7Ty9zMdOQWK7fERBbenZKif5d+K2TLddiyF6nK/N++j/hd1XFv57/zuf8r7Fu03CSR1+4OQfu4+3I7NDQ3dHyzIwL6dPT9Pe4PdRuiI6IoR0Sr0iudxHO+01GSVpX+KNVJPP/sT4a4Te8trKIFktsZhGU3I7lJSJaEQA/9yhqZNlZmjqi1SSNj79DbHKXf9KBbdrfZib3l0Jt3bj5k6gqRJXXW1GGT3ztIJQ+bFdtuvh3byynxIoSVIeQxoes8SklQQcglkc+wDzJtDwRlCNzoYY6VIU+J2Z8xbK50weYNli7vS5Kgcutueh6/CuQhnkUF/SgOlxkiMyVuexlE2fODlc+Dq3w4+eRg/vJ30oT2RT5QywNlZzjLjfNz1Gaf8smCYHOWPcWhBPIJIhYR15IeF4jkeapqh1N95hSTX8wpp1RHiqb2TtSJDTgJvZezqVhEZceS2G6R5ecihEx3JDczIYH5vVLEIdWTSlrwe2sisdnfxnNVGd+Oe2/yd+5FS26y9/eNupe3GkpEREdEd3eE6AgR3RHR8dpNR+v+ERH3R0eHhtaioxun6NsRdHy/3aH66Y4qp98p9f1OVXWSyLe9BUKLD9MyP2pCrlRFJYz7mSQkv6QmtZI9Yk6JbYg9ma72Sg7touhj73I/z5OZ7vSpNI2V3dakzy2yEGUebhxKuJwtnqhHKhfSNmGzxxTJElqueLN1Z6bLjulpd0adIbGSFCE0FVvnsNmNcZuhRoM92Bdsb3ZkWMnXoGCYrRzP6Zct5Mol2210Szlez/PumdSzi6AUVYg09mpzBy3lGoJ0LoRESAt1LxJOEfUQyf23DsbPYYRUy6UUCmrKvttOcuvc7J/dokOgwxbbfdqelzODZszsGhmZqV/zaV7Ofss7K0+f0Yg2HQfq2qrDvlWGXhed9S7Uem2xKlmE8nk9y8v4j3QjYQZWICuSwAwiaaOTYV9VtZfI8/P8EafYaz+T7LX7/MvoJvfe3Ljt6vuvknvvzWfHPXnuud3x+6O7z239e9/T7o/bv9/f47VFtKJa6eiIiI5WJx0d3R3hRneEam+R7pR0OrrrV6eqkxiV7yCQRnyYRiBzEiRZSUlyEZKbhsQSPVpWIrF2fk0T3aGmYbea+xk9pvv52R1ZpcbqHeKOwNuB1640Z0G0TdprpohMH0TX8zT0fB7RcNQLMeKRkcwVZI4gowehtYI4cwopQSroYccg5hRDEPSYyj9DQrKnn4mhcvUUVU6zpGSeP2hBEcFeq1uZfpzjcG7vQsaPmpSKKr9dmW3Ofh6DuAh5n6zJmsfbZEZ+sHcO9+fxs7EkVi4/1YTH6EVplsH5HBSZqe0sZ0jzPgZFHyFpuuwZBdEYEUh3EilDOZVxanLQ1As/U4h6VKiah35VtSKI++4M0lNtTqhQcsdKLuazJJwwAwnMhMD8zhyFdw+V8zN356qFnK2d3ZJSdZHr5oeX6ndu7s299+97c/O3qy4d3f9oiBuU6O8i4v7opTviNuPDFqU7ujuiu6u6OBARHajuDqX76Ke7le40z3l6pEkyyuf8CoRsoYNsoY/mOreYUzRyq0CWLZEsGk1naUks+1d1Zm8as2I0yBqx9fE00/zsFjkd7wqyi26N1qcHj6Oz1WrE4ipzcul5du4lbghhz9T92KW0SJyisYSwNjujTI3O7sx8jQshO6LIJKEkqMcb8tDsxn4I7F8jY/qZ50gx9g9QKLlnqlfFPWhim0jW+upv+7K8qCq/blVVqqQmVUXX43UEjU/P2zgJCQkJ0YWgoWHci8jFIf1cLC33obdhMZWXJXVHHZ/3HjbervXvg/6j8pdZmnks7AP57wExmmE0Jb8yv6MzBS16PG/o17Me+6Gai+pWKVTHUg+97oo2WgmVmsKcoGLviTTBFEQsL7PyrEDI+AzldZ6wnf0+jPLs9zmn0xvb+Ef/Ws+7c35IEyYmhm39VjrKBCMYwsTExMTY7rpuVMcQEyZMfIzPtQ1ro+dveQfep6kYaiC9d40atcoQ59RwPFKDPtrtX7lHkpvES5YE+UzW3kkkd0lpbiRSJKbWtnNRblV2y63Muu4tq9DhdJ2Ds5/g8p/bPvZByEyamsrIrZVNkCQms2WuTeJG5GHH2mQu3c99scvlfDklxLlzCmdGGdv+mjaEieco4SLR0SIPKUUg5RItvdf5EMizJ0H/RFM8eGCds8hANWbVSgdYI1zatydj2AYZ6HhL1OxU+dEetETLkRBKLyyRD6OIUhAizy3qq/rggH7FakI+TXqUyaKWRVG28lE7rbXNwrH0KtdKbs4tW37lVzBKaUNBFg1xHWkY8/mPZfzs9dtqTCtxf3K91trDZzNdK6oh9VFIUcfu2wSu5655K7KahMh6ZuL1rFLzG81SQfMz6Pjy9D5D+71r23jn3L1GTEyQ3BsTE+OzsvcM43hiAiYwMQLGh8AEd0ZXP+viVo6nwwQm9zDF6ONllXcfr6mM27zC1NRSg2h7HtlbbGkkIcktCUlyE0hc3YnmRlrJLA2J0WKrVG12WVWWVXZ343weovPLPeTuc2f3USOZUSOUGelUEAn7InSRyWitjdjIdubZeuiPfZ5qnRckixBWCCvPlpGyx5eZjnaWEoIQQtotmlj0QflOiFHfvOo6v3TQU5NSaWO81t6q5Td9nu7QVd0FA/wmAU7Z4rr5ui295rFeii49lb1OFMo6Xl6ceUKo7X1Qv7ZZ6KtB4vGA/vJ36ZonlM9VfljWZFLO6D/UGdB70HLu0IrTzqeh4i+7Eu38ktZ2/UrL+khBuqUrl7AbzjRezzHvbGq5/tQL0ytFMe+kEAZKNBmw636Iolb8cEri5YwQDERhrCEqaEL9nE37567386bO+7zp+S15Vx7P2kaMGGwjJp5jxKhWx2zueP7jsJ7rvd5r5Xu9jmTVXC9tWxMmRoxgVsZ6OiamDOn7dfI+GVGMmuePv62hJtTI9tw1QmhEEiQWQWKRJJJY8do1505U1k5jkkWCcqvk2iv7M0XZ7xaVi497T/u0H+e8d/m9U6wRlYnPWJPS+kNqzUsU4bwWWef90KxQZ7ZUSTTZP7LJPFkjD3lzSgguwhlk2kWGziGjx6OEFSJxBUH0szZ5UM1nyWcQiC5n7NbwfbRQMpnGVtqQ4g96775GUlEyBAYgevUY8C8MI3qtdYYleTy0ff2ZsGuIvG9JSR77JtyXvtEy7+8OyP9ulZBgqhePcl2r5Mk4et8RZwmTWvSHQiurIUWL22jXcGZHDwwFg5BnpT2LrN8WplZZ0+n21lrGbdW15vdE05H34/MU7WNldI9OsYIdzLoR69d88Yfm4n6HDnM1Kgrm58e1VceeOufZZzvv0znvY+I91SFX3n8eNcHExIjJFb8DJgyCQcDEe8F7MWGCt7d7c29riAnmqP94quqra9RQEzU11HLO3o4HQo28lg+DaHsHEsmN5A9IfJOQZkXyaHIPQXPvGNM4k9D6MVXY9QcTdrPPxlZi67pzn5+Fw+7XPrzU0FI0x4zUjJa5rugKKw/ZO49kicSKhJKH2tPMNPvY6C8JSZYglhAEJafJaK9pRufXbMIVQoZIa4eGnZQd/Y+7SYKNCLo4TffaOimd0KYT5fagyzk/RzfpAhaDJims1purnzsfZjybnn2X7yPJTHEprqc+yIySHm5oE9G5wejr6FvfF3cO+T9bM/1cLBzFKlNdzJFa88mkN9l3IwvzcEpHf1AXaddwjF/BKXEeNVwHja40vMTisd/1CObcKPmTpGJW1aesT5UrJPogu5ewiGYf3AicQg5WkPrKFK+RESlhiMR0N7O8d2nz056fLvYRIybX9p5i4jk8rru2CUz4nDABI/82Mu7NjcjbrwYjmGCO97rD0wKmFhT0+yfvc6hREx+eE7dxPBBNfJw7SCKSdeWV5FsTxCJN5R7xWr+a2abaYPf/uWvs7uWusKG22/E++3HPeZ+OfaPP8LPfJ0IrUVr0marz12oqXNuTLDFxJnRdOaUpoms/R4ac9NgaAiEIQqcrNGTO6cixZOjxJESCkLNKWDFUPylh6Tn9TKW2k9D9mx5V5CEKMqfnJmsUtuya1rDeBvLyllNeMAb23uJ+hkIxECIdxusjhHvIrBtBlNcFQVTyNn3J3jccyWH9/32GphY0QpSJdcqdkUePuXMftGudP3XurDPglEPn137tIYwQpAfK8CuQGQPRRKJbXvvnlIoxa9eq61Y31bH6nitqsa1gSR/jMlzqzJ9gaRJTKBJmEsJ5zOIkZhIzmH3zT/pOxuoh71Pneu/38+n0ftY2YUSudGe4/+wYYVQrl/d6s/cMY6XjiSHmw6zNcDzxR7zbP8cQT/s57u1WU0OZmryWvd3G3uia2BvxYTQEgpY0kSQ3hbyeCZp77GS0t53Q5vfI0GSNii33VO1Vufzf3dRW7N7zrT/M+eW88XkePfoM77PPMWb0ubNZqUFjzD8qZlzmH3VJ2CHkfNJzP4/f/efWHfb+kaFrT5+ZnpJTEkKD2EIQuiiZMZmpEYIQiVPILFWp78omZttDo25DFM+h7zQ9zQOpFNNaiZf6b8nMt72OdCCctC1F5ywDxr//G8AXBqtXo6QSEYI4EcE5a1nP2yA1KgmyVtYj0Tf0RTlEqB8c1K+0Uks9qSymspRH8TCtypPRWtZYtLfTcMwzvNnMMkWkbPl/J10ytPGL4ZpBs6WLHjTGjPLs9WxL1ao8d7V1f84qteqznrdbbqNSBI2h6T4jmjqJdQfBSWOu9TDTRGMNhGD0LaporolUhvmZ1vXa7ry3jfA73m1ixISRCxnvNQITEzxdHc+R62l1vV1dXcfEiBGeY+oYMRDe6yaMGGU96nJODWQLNeS1cDwQt9F7ZxO3QVsVSKxItkgkN1QWyZDvY1Iklp3QzNL8p7dWTDK12a2+2F3L1sb52K7tXKeuxugc8b8iMhdhzaVozQgheWRcj2TtUGv/bL//zaYottGxvx7JOkpksRGE1KmEPqbi66Hm6K/ra0TWJSGLqJw6L56jKYE8yHBmnFaSs/ukq1sjVarjmapRobopuTIHpuI1ZP280L76z3/mgDEPutwPSr1F7EusL5NIHs88b0NL5mWZ20myFmTom772+yLreDyov/xdeimu58LUtImpvHzen6L/6Awx+0MJPQ+ays1SjRPXEdd0Qf47NBW3Y4Z8MtOCtPX0WtNazHvedwemVqNjT38ml49D67Z39ok6+mn13aeVXUiY4pp1kIZoEhWjF7iSZkS+TJnpvU8dSZiA2d6MiYkJJpD35ma7NxMjnmNWioFwbxNM3NtK87e8iYkRtyT+2Le+6+18d02N3Nxmc66990Z8mLZ3fBz6uqd9mGTlFcktgTT31pTmNs0YseyNxrIzlHvUXsrev4Uquz9Us9m7Nh+uvWsxyVJKpqwh4hPRIFaQJcSZU+PJ3smTbKH92VK9n2ej7EJOgnCF8KsZGflF5Sjt0POaEYSQ85Shq5lqRmv05dwPCtsQ+l85g/QgLruJzQpVDkVK7vmXfvHLMO77QsvBAObrMQ/Biuw6O0pjBgkh71Nv6uS5vA5F0lcSfa31JTj5X3cH5Z8U3018/8nZLeQ88NTz/KzLmnrjtE/ZcVpt0Z/13jLqxNKz3rUgTfyKZv/3cB2ti85Nl4HOcPvYLD1vWVxmRV3UCOWzaFPdRUgVV/PcpqIqnVt2I8f8XkEy61lxLabrXyoj5yCaawovTcZJ/FMzr3OZbWxiyP2MoY4JY7vVuWeYmJUQE4yYmDAxwSAmBmLCiIk5Hsvx5+3AEINQo4bYuhbHQ3wc2m32li20bKt2N2ncNiS5uS6vtR4Jcj+SkrRLQhtrEkk2U/Wfnt1yz8zYshVqsB56tnO5+7zP/4rmzy6zzNw5lNGX1uTUirJEcgqx4hG9CEHIoKPsn8zOHBMnWRKSIV72l0nQmUo7Jue0gnCGIMtFcxJRMtCSFVPRW9BKzp4H3d2ahtTDgUpMkYpWWlRPaJlkEgrQcPFF30xynbB+YmkQ1CkUehCZJXdQ47zNjDzGoAZC1juH/QvomZosrh6uU9uYXrAU0Z/jZOT4eMj5cG70/DSWQAL5RaCztmSV20ETmQMyg373z6GsOw2N8Sm470HoXGEcSi+iqDVOH6rZI65hUuRgdiNhVN/4ZqKOjtdRnJAvZ9+hV6H5mbnSL+aqM0aMeDommDDbvb22P/az1mYcT5jlevC36dr6Fk/7Ehjf13b7PB7Z1KTZ2+0qH0YjG/FhNMfj0Agtr0gWGibua5qE3BeJIfoj3aMsyaT05zdK/N+ar92yd/XMxtZ+223ruLWdM/3s7VgTWkFrTGIVWeZz4yliXdF4giw5xQpNdR57U3ZiOjMx5CQIQjKC0n3s65gja/plcswKQSQ0ZBokiKXQg+9dTcJ5XUMLeZROf+lJh6owHaULTzfFTtGwBNb6WYuWFOvmug34MpStrB9Ml7vzvMi+POY5nSCWl6GlfN6XLvX13KH9svXdU8qcSoSlIEuxlDtlj5RuK0O3WTI0J/qjhBia/IrGsDVlPw3R5BPVQ7ukRUOWsWrBxXTVytbVed+Prv6k9kdW94HlCook1BE2TXPUilID2aM1yaBDtRlez1bF/AySMqJRpYKJaoU83vRjTDW2W8ZQh4mJiVHHxNPCxPiMITzHiNlP9kb+bb4Qo9Z9PN0eDwjEFnnsTdxmE703cRs08dqkXGmY5A4ZoyGJprlJM77aY02rHat/VWxFVq+12RnDpWzbY3e23/buY3R2+5zZoKYoIpqGY4rDikq2WPYjPXcesUPVCoL9yDMTIsjiQkjoWKEhy3whYzKT+SWEJPlMglBzbiTOnXnJ2Oe/PvsvLd8neiitCS3PEbSGgy2Zyde8GJpZQxKiPO5b/CJj9s1zuR0vPe2ShJB8GTJTChdUlNkiexARCT2Qe0hD8q2veuj7wYH9XHRKCJQfluukoPIwY3BMzNOPPZyPvu3HUhaEraUOFXTGeFcgrqO1gmgIjWcr1T0jFKumln58GjpWw7yzPonqDFH+42JEmZ1mJjdSdhLS5lNjlkMwCjtlFEJBQyjJ61xD/kmRVvqsrvxH2tPnSp8xMdsN273dpOVrtVxy5fKXroSVS/vlbEG2bOldyyY3CDRiijBdjobIfa4kQdMskkp6m+xBrJEwX5mlCZljSaNK7vltr13q9826djf7rbX7uOuc7TNGoY+RUVbRYiprukpzdnLuJVzEuUOs0GRl744ktNM0T01CEhJEE0LDGWTGZToz9UznKL7mHUmsl4pvmexhiRL68xkaXKcXCKJ0bwj0PvO4YL9ChXsYYrvjSsJv+ylt2L8NsJE22B+6v3VfaMvXg6ydtbPmuQZFpJOXyZohl7WhL+T1Jwf2R5T/aucX4zNCCYpyUGXB829fzmio4KyfT/SHJrdq2Edg2122oEihtSCzhAEDPejKYE6y9DKBGKo/W/dzLgR1wopVVEuBllXRQ2lTpdFiCnUa551vx40zFPJ4nSlUmGuW+EO9TobESj+mXy1n/aP0n8SdMR+fMb7G+Iwh5ksM1lkrVysatTqzyQe3abve26HtbdUmem/C+0T03gjC5N5JvCaLSEg7pNAMKcSabJPEaksr+YPapvbaa3fs2P22exfHo+x67zneu89Q1OpLcybGNOisiDUXkWi4EU+Iyv4ZY+/Rw3TZX+bwfUyInGeyZQjCKjv4HjFHjK9pnfYQcgouXNJu0c+wr40GkrEhSyXopo/rt3M6iv7MetZ+kVsRJV1ah73kEoxS2tc92oCB3wYeAGlenh5GhyC0t7yNKE61zDjvo0RCQkJ0GUhoIPfdGr//Wwfm9zL1/JwxcbycislSftz7zpAuRKonmYvjelz3+ZVGFvR4OS2/ohey2m2azmgieg40T1AwXeWeJH6tWrvW6Kroo/o1qo86uarC6j5zSsUIpiDKrKZHzvmU2betNkZBFYad1/Jl4zO/fTnyZdUlV8JK5MqVft5Pn9Wo0+5603LucN1KQ/W3r7VOyy+HLbQPY8rH6b1XbeLjVaxXPhBoOwaSG0ky0vmxkzbNjYZJbhqaafWgpWr7Uht+5jtbrB5XiZ/aTvbJPtknTCohpKz5odOa6XAn0kUmQda+TtGdPOPobevQ59GhfRpMrECcSsYZpJOMzEzH7jj6syMJ4U0kytqXNmOJIYMYgp6GzLA4X7kstGvmLoJAQcn30QilyWXDQyvgMbYBvMF8rFfByNlS5GPvNN6G7Be9KRz5MIoomaFtz1p/hcih/7J5Pk1/Fgv1wjrbDKReVWE7RqPP0D8Pa6pc+uNse0Yu7dfA/kjJMijGjO60uHboQVfmgDxraglDUMuo1aof49UUxCJa1WsitDjDGf2+q5ycIimS87Hih8+a5w3F+MdVh1FBM1LFPGPNypG+VOd+7qdqRVrpF3PJVZ1+rPbr1dV+XuRKy/eVWLn03r46N7fBlHhkbx+n90bcXl08t6MxpCFNSHKfTYKwZKdDuiTVRvOTTcMvhS3xMz3D7vp27VLTfY6zW+bPVsssoll19IdXpigzZa/QWXORWCE9g8iyPxs5PXpwPz960GMCybpy2nlLWCGZQ0zH0Wsr7TMXwXlJSARBIM5rmxIELe0/swnyDYEn+xyqSDk7VMoYzfoD07RUFZJIlctLyuI3PFz/mFuh36BHbT6n8dODOkcpsuflRVlCqO3z5G1RXzf4G9QH9/NRzSri9awL/afWRf+sFz/VLf1z9Job+zgjejGPheNxXHqR7cgv0t3Gr0AGCqJafEQTEURmPVFVas2i2ng/tZjrHT83AdPU6VPRXsuLaLbED6e0l7Ur3VUZa5Rjq+tPhhQlNH1Z+53XnhfyY646V2L/Ka30udJ+fvm/7kpYcuWCrq5ef64H8hXIFvSeh0A2RLvNzZYt6Ot8n9B13UggWZpg2q69GyS5aVuZWjWjZSUrVaiitPVF9ZXsbX/bu8/QvkJDtWbIklmqpA/ZRsjsIZYtmRWka9sNGfaeNo9d0+4eRThjxBIjPEHopujPTEaOEW9WCCFGkOlO+4sgYV8P9tCEBi5/IThqEM/5xKbdlC01+l9M12c1LAqKN6mEgc3+zSeE2Hr9diYFUbdGhaxlLWjTC9QN+bilOpWXCYe+aPnrNwf3n/1uumrlS0dMKFZ4F5tGeTnafn7Cekfu8/Em87QSVDSCxX4stG0XFd1kRvfZpDU9KMhJ8gdplehaLjqD7C75Xs8vqqJ9mnWCOczp0JlnFB10sAWd1DCx3U+YYvPUYYRIxKzyWjUFM3Llms0v1kk1Crq6IFlppSVXrmTlSiutb7rMAdWq99PK5Vezid6b40FcL1bBeiE3CBpH+zDd106TIemSzCA91gjSzEhCkx733tMjPTTFFvsz2MRiZiepf9lkv48xQ0uRZaJWTVlCyXhR1F6Xcl5bLDH795IpSRdB2XmGrqNFXII6ldSskLBCmJzsOTojJJFIyLykyBwZTlK7WPHQQ3MO+zMkFMGK01FF1zwONMdI10LBUBFZycoLLwcBGAz7gxFUPRnaoIfcezrPBx1KyY9mRkk0Glq+suYWo68j+i5/u/Xgfuv/P6scusWGw6T+/8XE+tGj953BqRLh9NoZ58+hNPZSEC8d7C0s9EEjKIMoVLQRT/o4T5ZahuxasZlVi7jMb1LRulZSTcVz75Hby0lKycFsyn43mkHHXeb58eWpu1yFk8wPZidfpjBo1ZWs/EI11LnSfsJKX6urq1XbT6X3E/vJSj/u58rl5yXDJmgfBo7eCNYLAtnCfM5L3AZzIpDkNho9knRp/iBDWFKaWhqaZOZ7s2Wtxe66anWWa6tiK+qc9w59ptBqpjouZegmS5ysibPXM92sq0uGEGd+CdyMaj2bMT2nkEVcCUIhiLlCZwu7xxQXQhByShRKPUogw/ag+EbTobROE7vHnRolPDtIWFNQmIJVE4mV31YL7VosgA0IMCAEhM24r2+zyY9e9nxaN7LnwyCInMZj+hJC3+J+8186OD+PgkYKG82mb2VhKss1vkhDJWPttxiulV20LEcL1KDXsxvdBMW5NEN0M9o1dgqEdC11zfyeyh23FGLf8yNVHQiSRu2vwK5EV2PXm6qRsLsHBI/Dts+fMDrHxVjO29iVQ1uH+16zymsFCaUV0sqVK/3F1bnkkhbkohq5/MVLrlyYoHcawRTEFvTV9+ucgmyhHY/4ykw1oUVj0YQmFu1DkhvNrppKx2SmPTIPzdj6ialcu5uv+U1WsdbPWfvmfT5mUVNKRJxCuRGSPC7HmEtjJ55IHqq96G5r75/OtFkJEacg2GObJSQjTJBflB4mCNKEcFFO0Q4kaIaa0sEeG32joU2dLlqeOde+1LZLRzlnvG0lEWQ3oeThnPQCiG9te5sdOoI6dvUKPYWCUa7e5W0PhQpB1spzom8eL/fl6K+S/WHK4f1Dak1F9BZTPxKcmTJdy4/bHnGOM7R5jEkr6zztmi6Ipb+X9ZBfoeQjkJ7RZPTM7jH3NFqGPA++X54u+SNPvq/yXeXppnSKRGu2a+t0x9Jj0l+q08bs9Cj7rKdm0k3nvPe7eez3Ka/j/IlHyrVGlLFHPetg6Es/18ldF55D+ZpLrrTy4+eVflzJSp8rLZLlsz2xzvey6nG0KbfZxG0jvvI6oRG3U6KPh/DOayQ32swkXc+a7B6mMUM6mujPbg/JHCs72CV7z9QmWaqnsvZfdtfWc67zs+3DRH+tUfOLUqxLtURZs0ftdVNrfB4ZK49kimZq2MSPvfM4usRrToJYV4zY2QhBkIfOdOa5XFdGIiQroZ9dzSOfHTroKNlH04MzvNELbZeenCpVuu1HVIm9glTcgx5Us5KkrrgAk4cv/YUeHspjUa69qBEREbLmMeTerC2Zd7KX4iShKGS4b1pwcPyNO4f/yy35UuXKHryFDCojUMS15mWWcW5Zs/UWnJAB3xACTcg7N0LQuo/bcSErFEa8PicFlY+E/PHgUoosdeosG/q0qDPxslx9SKbqzoCJ0IPzzGePY3vXsd/zOJT5WN2Da0syDnXekXKCoUt+/GruJyt9VlOtfunXu3yfg2qUxh2loRqyxZQPm+NLQTbZQu9NfLxqSsuUqXVfdUeSZkaykIQmmV/JTrWxmkY1/MruNO0hXUOxvytftUn9DFs52ftK1vZpCDGTlgZZiqxmZM0Qt+fmualG7FibxPzsn2f3jDy2Geqo13CF1CUmIUiIR4auZ+qo5XL9M4QgEEKomEb15VRDDWEX7WJrSNEDpeck7IpHvJbj8RoVQVz2Bg3gL8S9kI2ZF5NvIzvOzBBaSMjn0Zuc7I3XoXgg0belvtSXv838W+C3/rCivqx5yS0tI3uhXykLD7Vcn2pbepf33qOdaQfHfl9o4jYH+ZV2jF/SRUm3KNGGT1zzIQNBWooUVqUwVunvpt7r872tQofuDE0d+5cz6pKkZkn+raKZ6ymv58dYc4cU9h9KXnNmi/2vswuiG9VQH2mRMOGz2mx3HWnlL90b+4n3yB+wfK2m2vd7Ex/39SKYwqqpcdq/vcvNh5nTlKOZWjWqpRv6lfsUyaiYtb9SSXrM2qGvvpuig/6eyVZlK8lMkeruKan6kanKbg5NaplS06WMmeucGWoRte5n2C3zESshEoq9H/s85ugP+zBqJkTWKSasZutY1xDcCI0nMRniSpArqFNCTtdDokcG9mFdoQkaJxlcs5sgbc6uunTV3qHeMY+IWn8woxFLoiW73TQ+jfgswJerzQPrHlY29yDr2YM6hd6JzJI7KDhvMyO47zDQeOz+VX+q/VvA37Wqs0ZHRpE7urxcSlzLyzU9dYv59L7FmtrYzkSlyYjGCZuRV5cQzTCUcxDoMdMYj+SReKp4nIxa8/5Vy6MfYea9yjRi+lRF5Znj2iP9hdymhKrhID2aPgujbFsHzzkOCp71nHy9u5nWUHWCIFdy16VgQq5kyZX35q86gefwl982n+uHZm9cpX0cW+jrBeF9ug09P2pxu+7L+T6zBUPuc8mrmaSWjMoMS9BjDg3TtsdIf3b6mP2dW65NbH3n57dEPacK9Rmr0LlFlZQ1k9MSZSjyyFOPu2gLydq2aG/IjHraMS0u4SaRQEY45dlhtlHThTo653XJZ0gEQpDV0GDnoQ3nhVFKps1A0HH6bmil38/2yUaXR5Tl9G+6UdKH5GJp3feV+EsFPJgmEsrnDgR3Z/Yke7eFrJFO9uVlaIvyMkKlhb9y/EdpvxV+xWwdVNhcRgYlrsfLfn7WhccIMnp9ao+O41PJs145riWu2+357drbdXfm6KJlNZljphvS65M8XvNklPnOrX6p2veMPurEYmiKst+20to+5zmqaT0wK6XHLmM9zg/sOu8rZesVZjn2Gz2f4oY65Uqf1Z4jP+4N79ZPdJFLrtlWflvJSp935ErWRK5csy3fu24XVrK3r161ZQrNqr2nuF7IqN7HKUwRPYWw7klaY2+q/cr4lYSmupp0NGOJUiK5n21jv5qtyrX7ld+d1L81VVdUHUK1TLLmTc50KebUYYmyapdVjw7xxBVb6EnTHX2e6zANEuQiJ7GkdMgfzBEa0w6bhh7/kCBciGTbm2bnM814raphXR4VNOZrBiujGTU0pBRrPmdBK46zFbcxX/MiTez+dOvGOdgfpC8E2IYW1uFan/KyB1IKF1woM2v2oKQjoU1yWpIZfes74m/Y+q34y610OhD98yEjyepxMSu9NtQL9aT2jrP+tOyHo3+W9ZT90HR+pdtu3mP7Mpfb0BgzzTbcxiN8mAKxKoVV4XpvHfZt/HioXHW2dYsOcnrUyO0as7q/kLY/e+Tf+015vdjIYaxZFypjjY+pw36jjHPWXQNyTeSSfqzO9Rz5xolqVFd/KZ9dE9BKq/arK7kDnmPCZz6Y0rLJ3sx+ul3Ve+M6fbw4ydQo6x7r6U8lXmONJmhmVTpILMkfkPaYo12kdU1CtmJ/hpkNhb0yVfUHijopRRLd6WbNuQhFlqmzjfs4Z1ekQcIK/Yyu/TPHnh5dxwSCIM4rTA8rtLjZh2nQaWaEhBuJLIQsqXyG1YzKDIFEnSkxdQZ5YCFB6dp2EM8+x/koobrNshGxYvo77dsF3k8fBeLL6fg+55avBxE6a1nzWA2KoJOfDJG3IbOBv+X0W+KPKP4vpXVtO0N6wh4ui6KYTOrCHO1O/bz740zj/Ht0eR/nzLAg1Hqwf2PQaNF980KXaPIZFzznCSLIQJOiH1fwqDq13lPRhz7MqZc6011GzdbdVaF/14jGCdP5ae/9FDTLdql4SA51F3renR//xXxZrfQTzLYm0q9PmCDtp5VLWomVWHJvuXL9NOH7yoVRvdPrLlt8dTarmPN6/LmHmGJSvhTEbbboyyRJR9t00QxprL0TmnRmJ2ig92M3c2hKasI2W6Kq7G62uOspagm1zMyyUmIupzZRaxZtfexwSdwIrjx2Mq7Yu9Jeu0KyJCSskOiObU+FjlHTzCGPIMhOyqUiOcVo2GJvomRsQQJVuaAQp6UKUeYpYu5PJqVQXluJVITVWvp+/of0ZqMPtw9gs+v7jntot7yNKM7VCEU+vgRJQkK4g5DGY+67/e5vfkv4u6Z8Tv9sNJ649qdcc9TlWhaslL3UcbwdPThQzq/zPmjR9rZ1h+E+VDO6FKdGY8wOwZNHeg0ypFjzHp+1ykz9mFPhlKxjVXdlvbei+DqjVv7egyCiZqqjZ5/++3s4b5sOjF3hcDr2+Ix00Ek8v2rW3v7r1X82aoKJCXlv98ZKn/fml6eO26baX3yHtEyYYJ3WJrZVfuBVc+6NbMHUuovem6vLlFXmdL2uFps2FklCUmvveKbtWPplSJEWPabSn8ezFdn9skmq2KUKCqJUxkxhzofOuhFr1HX2ELVGz3W2DqfyEORhz9Bn6yksSRAEQUxG/hmEdqbHSEdnTzNHEetKoLETgiAq+6FJW1GKQoqsc1PVIKmB9ljf28XaBx19CtmsJSSbvaK/feXawAMbmy8lbNDjLX2T61LkY+803ibPFz2l4siHUURZhLY9/Bv/GO23xj+a4VOrEIrYybh8u5brg2fC5Ctz0J/ezvkpZ+ZF135KH8iyZ4t1qGiMGQ3fNLuz3P55ZMSWZHjNk8j7vnQUpKVYx0RVnHriPUIYTY3K+nWqoqskp4ZKDfU+3Hfnx97vXvfDPn0fqMtYYwe7fc47bKNTX9wbE77nklQrszYmTPiea7YlLbMtucy2/pKurq5es+1z+CuG9j5xfNnP62UpU+ZEmGLdY859OceHTWaN9PdT2rGyl2ly6Gry0KQdHd070/R+xiTJVfs1VVGlPFwpt+dBteZESyH1IXGftJcbxawben5PVs7NvdGpzO4+Zpr56T56WcTrjSDWFSPsbjvaw5MZE9NjfPk1RXJFECEq9i7NWPJQqFIZCqGV2WyITSjCcWpLPPvJ3ip4Gn2p8hqXyt2tp80W5vog8B08PM+z9/PfFomSj2n83AjqHDX0ELJe1NdC6CLPQd8Xfbeivs7ffPBb84+5Ss0QPeRGIwMn1oGyvCyWa2WOJON8et9eHrxFXut7p8WZm01tLRzE7ZnRjW96HE9Kr/F8kIGHPJ1H4kQn20fMo4ygnI14502PHj3wP0ZJvauL2Er6Te2xjMrF7qftPdr5sorxmaX9lnPqLpg+c81m/Q6/+hyklbht9pO6N//892zqvnD/az1/b9Xei5WsXBN+dRSyrdL7l/3E9QqMEqzHj9pSPlwKTaasLSVZoxokyXrudA7UdO0QrZkj9879ZWrieY7dzPzevbMV8W/f6rmSLfzn39TPM6OaszHVmgv1maIWPY8suexnRsfN82NdJJNm7b+EziKjXEchFwnpnGKEmCdG7PliepsvdEwQLvEgGhpLEDTQmdpBiiDbS8wkhiBxDXvGJvaW85+nRO1dmmX7JReb1tpXADYIBOA72+Dfmz3OkGs3RG2NClnLekGbvK4ze3jZViczjzfQF/c3bH6L/F9+xwpEyVikbC/foqFZF2pNLGrIoDXJgbCgzgMHtjO367C66LBhNMSYUvCcRNoyAg8egcw7Q9HGe9XRR505+lDX1vdprUcdWk+lDZxPrcHxmsNw3mLv/cM2VGwoDtdnEnuPqhPpa0H+CubvzYSfq1XDc2BiYsLXCd+fw/eVLGjsPcX1Eh+ue7ZMXozPUVPITZMtbtc9+EJ3f6fSoMlok6THd2OaZsxXb5Q50vihx0z6P5f9Ter/Tk79TlJ1H1WqfngoiyhGCKWMcaOWmbCiY+Vx3JDRYz3stivsjjq1kEVILAmJ3qQP98xXx3ydo6OZmSCsi5DoqLKDctqDzKGiBKtQuJ4TGeK1X01bilAzex+hnvJ+L4hQofvbE4/hARDfCh4Mj7kmZ1pf5t7TeT7oUEp+NDNK40ZDy1fI3sjM7I+3/hu/RfyxrlEZidPZI0KRdi25A+W6lAseS9JnHfcey3vYL43+Xs3Gep/9ZF22meUa+qDEdUgIgYwgpA/jec6zEc8pj6oTRq2qDEzFL1119lNMN3pQKbPVSFM5f/elYrePu4wj29vpHO7at9MJJ2XeNVOdn53/ajJBdX0ZMRtWmvj2iyOMmDCBe2Piy0p3OPcurbr69Yp/FUPvfW0nwRTZQpsSQ2Ep6CuBJKykhh5DV3psDZr7Gntno/fz82zpTP62zUp245rfSf08papUOfMUoSIpapnN27bmh84yJlnqlHNzT+eMS9T9bAlzbTtzjC6BxJUgTkEQ9hxc6EGWhskQEq5IRAmCoGbZB0rPnSnBWVNFY01ktGzdSiVsQRdP0CmPOu8KIcmu013TzjVfgy/oThJgbLzZd+TzfjizyY9e9nxajez5MAgip74PpC+H0PevVfyLfqv8jzR3RlDTNZ0MORzXoEwva71YU9vq531sVp46e24W9q9A/m/W7z2dmSYGbesxD+zR0T3sEWL7MHcQZARy53l4ZJ3yhBLMO6mKwPzmZ6WcY2uN7tD9ZVLdIZ7Fdc77vM9+Z78f5+ccPO/On9ljGRL77MO5y7PGGu3kyo8Jz0Fa0nO8232Zv3cx0U98pEVayWK2+4e8gy4T9HvhvVgex8SUj2N77hqOR0wxalHarglTELT5ZKraRNdOtE06lqSzm1BZ225Pu3I/nuy2fvbDrtj6wW6knqNKKeqHkiWUNAhTtnUn2sNNGSJW5Ky7nCprn52YtmOP0RKiTkJiJQjpKWbmfsaeEaZGzBWEmwwimYqtKNRrpr2hojbVeVnsZJOHikIexD7Nsw9bmCd+uYRcFvmO8p1Jg2ELcf/7t/RgYzAm5NqxUMeuXvk8GOXqXd420CEhyFqZ4UTfPB739Zf6rfrLpPNFwq65R8Px91E5jJsmUPmB13OpDccIdSC/JYGnG3PtCR9X/LDis0h4NgxlVlzdJZAoQZSfHvSlPLNf9+e+1tr3fJ290znPF/tzlDYcNTqnaxSOGsn5c4aU1vodPeazkxRKzQ/iP62qPha2Ss39/M8f3DtNUkLeNrs7SbbrH2W8TxLXnV+9c/1D9n2tc53ruRNvr1siSZOkU6WRpOncUZKkgSTNOmfNRZJAknTZya42Jd08U4UlrPuZFfurYxGr5py6Wk2tGs53p0YtzdHs8/vQz3bOh4qqD72aTWUpSv2hMBqPShTlD1RRzFB7T7HodS0J6keMFiG6uELGIzSsmDDHpjHNPDJtzVESK6cgsR9NrCsqM6dtNEWHaug92Ed1FUVDpbDqaANlzl2aEtOllFFurkM4v8XJNu5gfDn18tbsIi+zB3UiM4UWeQzpzdqSeSd7FCcJRYYZ6NVFtOMZdWT+1f9q6U45Yq6Q0M6kD7veLmUt13ph1egxM0yyfLr3wnI99LzXnV2c1mKUHx6fW8eD1Kwmg/OjJKhE0FOJz/XTa1m5jr3e5XXgy9Ht7I+VuxSU/TnPJjqazF+2QBNNbZLJQi314dxTWbuXDSUSuO7sJA1N1GuSNG93SrJDok130iZpmuZ3kuYV0jRvJ7FUNEkLSdMwXKtJGvJ6P2t3T8aETuVtiYol4PePJVhExWK6vFax1DiJ98nSdXUNp2e/d3trUVRroixKxezLI7NYQstUUcZQtXdRtVM9Kisztq368+jMdDkaSXK6LhJLMmK4iNGbjjk61HyNaYmcEYn1B/ZPKTGEVYEY1+dGZhSqwxklcA/RCfUHWkHdrUevSm4FSFBuQqSn7XteggC5dBvzSml/TSHJfZL7ZT4RWkjIY6/uXuSKtjWPIQgpRDTTcngcHhl/rGeCzEzmUfMwx1f4Mo9FYCk/rOVlfzrkMKe3fJ5cxHxL5n2lgafkH3II5sPjs3pgKKFQpFERJYUg73rXe6zXmWr+vZzd8cxuyP5s+zlD6dYVu5PfpWZKIb3Sumk1kmBSaslVa0fl0lex6xJJkyabZyFJziZpkjSp2YUkIUmaMNAZrxmSpEma3ns5FzTyoSJJazG7qzvpoBEWtvTIRNvfkkzqmiXWUfOZFSqJklHkvWqO19Q6311ztJro47GfMaSpE2VqkDVDGzOi1SBLIWaTGqr17K2KcldRcT9WsTs/JNPc8+w65mvbPRGLIE7BZl3RQp+t1TqmYzJ6jJA4E7l+2w/J7JxscbpCU9zZVKgTCc1GMi/x8lrnOCWyR9/VqGjVIIuBG0BAr4eNfWlnfJ56kTWqrFnCyXnM27MHdQp5H5kld1/UuGXPjKCXJWOYwRPq/nl0fkFArOlBj7U6RzrPY0y2tWEj2sSirMtUrD3actWxmEXsmm1qVp3gaKF+KY1QLKdIiOtj9yyGxJ0F6UyFnWP111lLv46Td73rdZ2uCeRkVGpIjzaYNVSgjJo96NHpQzpL5+7ai+SyZmrFuE9VpWFMPm6yb5Tnl2ft+7qTeyf31SRpkzZpm/59NUl6Jxmcv7xt0rwf2G2Se8+yf5FkEq9t4r6WqTSRNunR/L1/BhI66TVLVIruOS8T6/58n1NcXROnOc43z/pi79ne6jMo/NOcqM6cUazbVGZRbSuEqZWjWpUu7JoZtbuVr53MhOfYjmnXHIVwJiSWbA0ydEg0Icve/8EDkl/TGWHlTERO1z9DlkCCQChSbXB5DbXsiOruJoTN3R6k6DNHrFQPOIhDCUlQW8pbtjBYGJ+Hrmy9nkYQ5LmBxpXZk+zdu1mkk5+/rWXJIIMuyTPS0f1jniPiUCYeX8PXYdqaw5FTTExleVlm4Fmfx53s15RexbyvLOZLfpNh3jEw3mLJeSuwVIS0jxk1b6jZCFI9W2OoeIZ3t9eKw7HWW932ru+jTzl9sDtfROmho0+NSjddBueZqEElV9kHnq0qiJjfe+0l5syH9fEkyd5pXrWu2sTb8eFQpCXZ+bMNI6Tyus5lhp1eSRlTSXssdqX5HUkyB0sPqEVU9tjz0Y9FsJjIPSus6jfnsndZnJYaoYnXUFEfGVVrrkFRIVbIGqc4rTtTVaqqlfspqu75QWFjgsbDPkbXzJQRBIEg5oxHj1EmM3LuCTqPC0EIsiQhTmlt7c6jZFRCj6ErKtV+ZlQgvBn89FCUOpTuVOQ7UNBwzQL+FAr0Pb5cZ+iLJy+MCDLP217kZQ9EChdcqC0ze6OcLglpSAQhgrSaz8Ij9Du/QrKRPjqjtsyIn5/jLxKTYmEdrIuyLqv+POxT9i3m8muz1K5nq9bkW2LelD+uQCltlVkS0u3j6KCb0SIEHQhn9lrWzjl+rjKqxv7UiJsa1b0/9Tv6FYJJ6f5C1zjdz1Gd5Nr8vys1xdwnW1Xlba6tTZK9eOa+mjRJq9imJW+bP93uK2132yTRJD6O1yRpmzuYs7KTZtCK9iv3s+wmkfTQhLXXvpPOtE0b+tOjAul1YVakipLRpqyChXM+DaH3NHUqCrXMiyAcraBOlTLMoVp37ueEQhVFFc/p2bW7ZuJlRoMigSyyJUhImJDQDt2HzNLRHuMiQShy6pCcsvtXwxJIIVQVgaB9EG36bG2GraepgqUHivvU0RpEgISMdl+Xw0l+atsY48t5pHZ3a+ui8ZNXXo9Z6KxlzWMaFEHJT8ZYNlKQkJw8Ao+Qf6N4zfF1zLQ0dNtdM1Lnp/y4TGoVlpeFkt/MvEo1FdtHnYs5mDeHqHqVdNl5C3LguWsqH8usUKlvlRFSsz3TNSuhcif9dXj3u9Z7Msq7E3vvboX94TznczJUmu46v+KMGknrUUb1F7Oo/A6k6mNd53/G/0vtslcgSYTBXs98X02bpHlttCIhlIE5QmkkDUnatEnu5Owayd5J04QZIj2a9Fh7pzu7pdpkuq5mh6LH0PWYJSpDyZZ34rlTxTqW6X1e5yC63ud1MrXOt3O5zaImaim9rjt7tWaQFW6cJjLmQuqnms39lCo8uSsX93ytjPbH7KHlyklykxC6LwQrQ+jPUNpfe+eZHkYQREKyBLH2VoK95xxBxSOZsXaG1IhRMkc++yPjbWEghafJ2GOaWEB8jJ72KeVw+oBh2E8zkhdv9HB7Wa4XoXuhJRHFuRqhyMeXrElLCBcRRJAKUqQ8Ce7Go/THPJmEXL+mjuNkjpgj5Dk6DPUjZXlZUFhf9epDHXv82iuVZTowQ0OUH6ZkGUHQ5hWUElQu8cwogSizNel33bDem958H4Ue2N+rcdJzf2xdqVTcEHGU1klHJ+c7C1VYVarmYr75z2TLNoqkbdNED93f7MXgWUmu9L7yel9JmiZtmrRJ13lfdwyCnZ20TRnKpEma75yL5256eM1n0/4+rDSZ2aVJO7/Y3T1bPB1Rkd2eEutYmJvn3lTalFWMIN+XYm/p3QhqaRJrypSaDaolFVYeVR9X7VVCUUNRhRJTZrmmHvuLdiGQ0xWEJSRmJSQjaE2POdQcnV+CIDbqvILMudewwykQLEqHXvVM8xnEa0nzTGYMrYR6qbsVFMZjmo2USyaZ9qW87d4PBowZ18FWD3aiRNHTy6jksfGy8TZ5vugpFbe8jyJVKpYOIvHMdJT/F99hing92pl0TM2EfTOZQQliUq8oL5/649mvmqCyi15D1qmXeV/bYl4qyCGUequZ998w0P1dXBRpjJ4tKEX8svJnFYtKLMTYElSfsx9bNzX/87Qas/LVlO6mSpwQxu1l6dshVXvtsrJV9hJ65UqbpIfXpG0kadJdKdvrYG+vYxh2V+wVW5O2TdKEYUPz2lrnehbZSTPsNH2l6XfitX8lv/168rP3ziSIEkv0UUmP3VMoc88VRS29d/Yuky29p32YRkktpbKaTarVGCrmjMNSlBXKvjFVW0Wtu3pUsdvsZffv52eHKkmQLDLUIghnUOShxxxq2zPtz1xBSAS1hF2+HY2ShLTDToN6zRzajGykoWNt8Tb3MQV1zjFNKm7VdIuABMgSUGh5EBdvmW6YpxXanC1CQnoQ5+NGBDlHDT2ErBf1RU9dZM2akghpEaTmZ8CR+p3/6hMh4cgx84XOMe3Y6Eh5YPGcYr1QFkz8YYs9c7rqzLJhT7Pjr36gWuNRPuNI1G9nCZwmg9Ceqf4uoXoqQULbQbzH7DRif2oaqNHD/nAolXN+zjwmNWqkR3UhR1L/rbtrSVV57Vxq7bW7e/2n7e81+x/Fs84mbZL2gFHI2zZpkrZpmybNTtqmeW07/nSaJE1mZhamJAlaSU35dbC/D2ZUknQsaXq0SrCONe28yYoKa7KnFRWVW5zM59TUpHctEHSQWhWCqDS7K6kPFealELXX+KC4p1lVz141G/s1tay2J0YrxMtJJOFKZoRkRpBFh9SzY448W0gIIm6CWNuD6JKBQBCh9kMPiBca2J2ZkTxnFJSb539QeKbbfNeSAIGZpMARK8IXYCCMqaj0W5aQNXkfRG3luUVZL2tDXteZIT+YrqQsHcPk0fQQPFL+WE9HFgl5ljLZ85PieJ7CHijWxFQm1kOhRIRVxDAv5WKi+mUwP1WMfdW1sm9dOHgQiuDM8kyGCg0lVHoqCelvKsju+a7C2Ofb9k9OKdU2+7NSpeaTfNnPSWsqbVD2wzDVJSy2amufe4iKK3uQ300a4Vler/tKmreVabyt13qtYWO8TnpoNWnSNMEsbyuvv1M0kQxrt0n6+5jqV5KOrn0nmZFoGGnudK8xPWesKHNPz52KhNOqQdre2ZtAB6l/LhP1Gev2yprL7PbhIpZCrBlZo9xKqqi6H6hcfiqzzfoxlBZJSG8EcQoSVkhNbiPoorMlvyQEcYm6KGILGt07SgOFBsnZ1Guc9ptBPvcxCAyrHEaX5Zyf/poeigYCMNz26SBzu0Xu4/X0MIlFZkLiaCB7g7ThlkMpmT21ZEYPLY0GsmwfyEB/Vjraf9xTnxti9jzqGMfMgVridSmFRaSsjaniZV6JKpd5b0c1w9f22bWl7E+1Sh6YbxSPiqhWIlASoakEUZZn92wfu8ssz6z67KQGwZamRo4a9rM6GTUqKbbvTZeR7oGS9NpNpVK7VyxK7XXuIdSmaZoPmzbZvzCzu/a97500926SpmmbtE2bNk2S5t69k2udi0GTSNLs335XKk0Sv/ZS0nN52yNhuqLJaCeJqWkz96yQXpdQ87k9s8IKPx35us6pEfTe2ZvQZG9Cc6aiJiGZYcyiUOisO3PLmPe54X6YMoOq2GlG7D4z2WWyJF6DhMQSkunaoRB0KHoSI0NwISSuIJYQZQnEsG0aVPT5fBNapQfaYCbrMdMdK0dpCim6v7YqhGQgA22p0d6AvTfiy0GqbRSltJHnkT2Xlues9bVm5rm8z9sIgtDJgqQQSHhG54j9q//VVi5v49fE7JZ0jjo1G9O1eFiUieWMFzz32T5Vve/xQug864X7V53oQDXMecvFOVeOQ+EgPQtqds1CVW4i9IRKfE7PKu/ORqpqd6uxxTXBLp/Z6VFOOjg9oHRC2QP1ce5DVX3sbPaqKfPT1yrktWxmSNM0V2Snmb3ssdf5i/F25pxZ2Guwrya5mjS7SX53kt97t2mPVH5be1WPpG1pq83v+b3QnQSVxED6w84+9FDJ3PM5M7xmZ6deI/d1vvt4hL2lOWiij0cQS5BzupnQh8QqKkxi3c/ze1nzKTXuYarCXjclu3LbMm1c8Zo4Xcggds3xhMS4a/Sg80yPmXrkIrhPCYEQpwwy2o0WmgteZJ7IqNtoQi3oDHI6V0FxK6hs0mW+WBHun8PL4QZjjPhmRpU84x5usjbOaNxJmT0hCOXqXd621aEgrxNdR6SQGkgOuyPmj/f0/8JaCeKaOI7jYn2Z5Nf86rlFWIXpWl4+81MvXCpfdcwXsnux97xUPTHvv/0wh+tzYXia+7+SWk5QVKLUzyNBfV+BhBqhoumgZr7nM85no9/nw+nvSXXbz2QbrUYNOc5nf5/u0eh+dwQ1P1XmblV89i/IZefe7dqqaydt0gba9Hda0zQfNq/dTdI06U6yk/i4lPYraclhRv3aq03ThB5NSzNdutOGtkmaGXXvO3s09lcOa+5p+6xgtbdu9zyeribanlYj9N5Hk83z8MiOWrOSWmSSNT9UWbNHsWYpS/ZzGHdTVqFYP9htKt/JcvQYvAkSBMmosXqaGHtMSjPHzozMJCQmIcgi0Yg8NLr/dagwXcVOsHOq0IhH0c+tdujIPGwoOVSbwm28RuUtIfusQgtnczWPJPzB8OTcQpeQ15lBnchMoUUQQvJpS+adCGq5JQSpFnpFBE/Eu47af/O/1zE7CQnJ0pjp9tRMD0NhD/pTEEtZFpP6RDjTZxUrflZ2v9aPbJG177qYtwR5Svbv15nlOXqWE6oVcmdlKh8zWsSzZwXRZXbKfGTtp1eMU1LYTZFe34f9zB6KGrl1zY/stB6kZtdrSvnP3UfW1q7dvXJI0kb3Uo9q2mYcaRKpIFUoVKulW1vVNEmTpk2MNke7du7upKFo08bkqKU7+5iJivHarzaZmV47e8KKvunh6fGcYk1qzCwk2vFabqOJ2+eetjd1TKFalFmtOykWQdRQ23XlWELZKlTs/TCF3bR5Lttfz3UJkkWQWCItcj2E3kyYeiZGYh0lWPEmJ5cWybTK2l5DD9tryG3Q0c9sKl5DDISHMBs31Xgxp9usjSsLIAO50GyMDRsQn+eVxBooRYckh7y+X+YToYWEPPYid7aEPMb5tJPSWDo8Jx31/8V/uTmf5CRx5qmW0/MTVORB6N8VPyzWLAvPh6Skj/0y+qgXPJ324DRR775ljX2VB3cqBJZnelZQ0pmVoJn9SH+7ElRSkWA+YX5OmeScmp/T70qZozj256Spqk4ljv1xVOWC2ghtp2q+Z69cKlR1xjTZSfOWq+161mOa/M7v382fbpo0r217JEmLX8/ai/29174zea2PkyZQi6TN1DRfbTuQ3s+yZydfc81OMbe8l6ioyDI97asoUYkWxyNbaNmbII8QWJQKs642NwS3UMuELKWTeVN1V5vZQhWKtV9TwZ7ymSBIEHXlEqwYgiAPWWYjc+xdeUkkIUvyUL2YtNqgfeOikRmh9FAXWwJ35txeG8tzBQqnYGVU30ZRSYRkfpKHE9oVcd0Iic9TL9cZyefKmiWccx7z9rwvhaAejoSSC+qB0BKRQrdsDJ9NR+53/lvt/j/iEu/z82uEdrRk0ZcRynW5FotC+vTUmejVr11RvSd2N/2qFua1GuYtoWIEumfHraYkFMUIBuWXRSB6qvi4nvksRgnlfaKKLDgYNZJ/VxQ5GZ0a6vx9co5Ppopd+b0Xm8vG/GTLbLmSNElTY2aYNiV7N/s70XAte53r6dq+d7XfzrYse8nZO02TpIkkQ8002iT53bHO1X3bTcLokcT0QNJ2ebakBz2an+dnzwpZAWui4unIlj22fpyD0MjeRMveV2ltzlKsKdRR3NrbDKfcLhVFrGztowzFPcVOxe6emWZ3kSBZBMksQRhBMhK7RWZkRixFYl0nQkSQlc/okUG8JiyBZI5cNrS6gniNknnjeZ4+7JbTXY0SqiG91UcAQ1apG2fEZ/HtSLI7qSgqaARBnhtoXJmh5bmztoQQ+eEgKLF8EDwJ749Hzv/az//EK5Ezi4TO6eBwGV+H2FLLD4s1dSjxMu8noJ4686Li2tu8FHObg7kwxGcR6vgshvJMmeV5p+bStzZJ6CBBRlOC3NOUqGWtaT8jxyhTsz8nreiMY292Gwph/+10yU81ctWWrWLJc61L7dWzMyRpXvulpfbWkTZt9u/spEkaTSZp7O80SX43wzbGUG3Stl/SA7+cK0l7PM1UpU0z7UTu3fUkbdLM0KQ/M1QsyCNrPtpcQZH0MdfohHbc7C3kEbeRh2NdBZVkyZC9hg85+ECsQnuLe5xZamtjxrDYr/mfa2PdTyVIIFsCIcEEGYJA59gd0zFFuLJJImcTmvOUoV5jJIadvSsQWom68qgMzQz1Jgub53fkNo3i9kDn2hYXQ5gEIBvE1b74i6FERk8+LkHm+XTLj0ZEJxR6Ws/eiHPXWAtChBBBGk9PR/+/1Oy/9qqk5EJIlhiHOSYjJj3JppdiLZb69EyElB+EU2dLVeczup8atT8V/RUoIQfCs9YOUkSOfiQhDZcTsxiNO5WESGULEjPP/DUh49g1v0+MHmn7w3l7mfN9atSYnXQfqts13+75du3vWHYphb1i0yTdN7vrKSNt0zQ7batTTL3OmDHt9EOYVpPmfZsxqPa7mqbx9KhW2kQ79Ej7e6j9wzaV9n7WM/vSQixzz+KNknTZcnREQ9xGPIJsiUf2DtEpVMv9Q+Q1bmcpdJiXSrfHeZ/Pc6ew/qB6VbGru2Zq11PexiJBLAlBEjsdvZkM7THqUJRE5EpC7i0qlgShkqGmtkAMaxMZmkECF229pueznxglzkBhVLfXggiDQoFu9gYDGAuMmTHDUzDuRfeh8ZOnvO3hQiEqM+R9iDh5DJlBLB0pwysr4D9s+N/t6HXj9vbMM/3qJLUiQ8LjmsEhE56yfJ6XT1flUade+Bml/mOCzsMcbYd5xxOp6aygzMoIPcvHmqOQ/qmJiiANgYyeFcj6M83vlZipUfMZNaPryCj7s7u7qtSowXlqbKMaUWqvQaf2UvkrG5uqVFWGVt43sr9tRrugzWubpk2aNP1KAqNNm6RlOqpdu6uyv9PD3jXTQZtMOkdH/Z3d9TS5kmTPtNJ2fpBGekxUmvZcxizS3LNGj0WslvTeR5Mt2tF7E/qqR5BaTJeyRrmVdWcRo8ZWS3nk+DyczhmohJ+n5qmVrbuZK5e9US9xEojTZUbGN2QO3Y92RtbsZLTraUW4r5wQFcgjEAh06EqGVhHIoA9R0jyoQVn7K4ZAMS+tiqGrEgIiAgSyxqwYNojPw0tk10/cHiNFGqJ7oSWLWWfJ3pu9CCF5DlchiCAV5OTRuAL8T73+XxIkXhMkXsc2tcUelLAH6x3WYtWnNB48hE8TZW12d/n2zvddiM/SX7Jf1zpRhPtTBKIsF0HBSSsfy6zMStDfLcR8svLMx7+iJE2ZbRSdHjXQ/6UGnZ5HTUX31mXZaxfztdRc7LUiaZtCOzNNpGn33WxV7IVT17lOLCdV03b967Szisj7pjs76XSqaZOvpj2Mkn61eR6vmWNmT4/m6O2RaZNBm2Luz90h29eo0b2VKKkbaR+mEQjRyPsUV5PK0iUkD5011kRRVFY96qy5rsrlZ6AsP51skf1/nqqCiATJIqSRPLSjy0zm0DxzdKaZM4EghNQWIvamYugYxdoxI5AEQmVNJZAFwcQ8bLN1jGpUuVV7O4hYYZK3hfQcOwEMAtCNiWOZL1aUKNr2MCp5jLxMXidPRw/hsuTzUJx7+EV34yrw32pPvJ4JAhk1pjP6Djno4XUPTLxVHYqHx8fr7L1FHYzXPfqvfVlNrjncx2e1h0r53LMehCJ9q/sGoYKKkP5/dkW6Z2bEM2GuZ1pClTTMDsY+OdWbnC5VSBj7g94KIbt7zVxG52e+c22tHjNtk/QriVCvo23+YKdNdl6bJDtN0iSpr+67XzvJTpPpzIyqVq+vJnPMMZTqnWTPP8T+2957/27bo0n7A3P0Kx5GapaduigSffRLjyLb16EbX/ebZMsjexP0oWULWk2KVan2cptUa85Zihs3VnGiHid2q4cpstOXatnf/1MUpIsLCRLCCGTcyRwxMsvOHOKXIJErSZHTFYgVNJB5qJlToYM+iCArc1Ro74cmDDFnNvRwG6LwPOimKxEkUd6WHuA83H+6zoxYmIW9fHkICQnZz8c9zaai1JMXRT1Q6F4gjURIC+9jFf5//8stLoIgi8Caae0jI197IfQvCap/QbCkTxv5QVSE/2BL9TKX/uZh3OBBSsxK6TjzxKxAIxxBWS/8OzGiBBVBehbG47nnTFwT5rOSIIn5zCQ1yujRw35m+h2KlfNPZ3LEz5TX5FJrr5ma73z73mnypXRmmqRt0jQ9BoGWGjXaUTqbdlqvbUv+ZNvM1PT13vfVO8/MJjuVaA6h5efx0KQznba55zA6dKRZsbuEqOyjj55eQx7iNvSehhBzomIV8hrkPO7itPVB27oXbStum6WgZtlvzCZTSVUVlFOCqARBwjRcj5nOTIbSduhJWNdFkEVUbqIJboEMxLzAjYrXUKF/BfmM11pkntkZ5xmhOBSCDcnGXFEpPJQx2IAkAb4xzmIRio6llDV5XXCkFwgt9DUvaJP3/RoaHnuhQsrScXgKrgT/C+//+/5LEM7sSIjlaDe0W1zbj9vrLBouMiDjVVk8x8C/Yc1PQ8syv1cyNem/Qk01K9SkVsIJxwoqiGcHhSY9S1yzOs8Ki2SZjxmYSdYzP32k2EmPzeN0DNe9cr4a81NTWzZXVFwZr9vavZMr/YIxakjS322bJk2aNGm/0tev7Hzc9tDfremottqmd54fD5uM/ZW2M1oybRfPOjdJO8Wd/TPnyM6u15w7W8/RXSepj+7SkdBHIzcPRzsegrTbOKtQrFtSrJq3lvtBWc1FaXbl9f6ne2YK+6PZy/ojKQeqbgJBjETdY4v2ex7CZI3MqGOmyJBcDXKmQU47EHrFaOagMa0MDbbQXmEnSJDEJpnnFOMIi6JV8BC91pVcIbs/QFkpDPjhKjAfh9KTydkjxPqckDgSksyeglDoCil7HkMSoocbZzbOOfaBPIHuWg3/yX/PWYlIxD8REh0mktF7j0t9KrJoin02VyKKQIaPRTpq7NiPec3ylM/96Vkeal5ra0kRJOVjdZslXHNQCaR71oaaPZvEj7O8Dqx4OTPVzLMUdmc4bOkm0fVUjcnV+tZl91pbQtOm3cwz0+99/8G92yRpWz16tFNa1OhgMG2rmDKF9KvpHfvveH4e2957J21Sg0kyd/bw46nsOwnz5U76jH0diRnC3N8BSVCpG530mqRH9j4egTyOdjyCdvTl5C/OvNSxhgm1V80jhqisMdFfzocrzrn3d757ZXd/zFTVWhnltXBlSGbJEKwYMmSOnWr70Dmmx685SoKcQXKr1yBodH+Ghhk2/UugQwVC6VCDmjEyB3loZh5GZpepgVyKQPba7lLoPhlujRHmVpKXKlr3QqFKG3kOmUnpYc8sCOXTzuLpuchzhAgiKYSvaTX+X//LL7ze3iclCMToNaiJTS8ZttiF/4+HjOfOuiyPdH0QyK5Df/c/c69285fK0QYW4fSa92+GcmctcSgiys+x7Jwp0STULCUJCpPkYMl65g+yJjMRzH/afKYkXUjq7Gewv+ffJ1cuuQpy6crd10/vla2qQtL0+jubXfvXs/by6J197zS5d9O0aSNJmvZrnU3T9qtt7+x7z6zNY+8m6e7+2YvJlKb3/tszHjtpd3a2GdJ2e9iqnZn8vfNDXd3QyT50pNfUXfTegT4eRyNoDuvcQo8VZKHo/LXXDdJndslSjs5yOR3Huq5ae61jSHb3RnktFBVcQXBdRqK9kJl9dFHTL1sbwZUrqMc2iDNVGfMjisyxZB7doesaCLL2sEvtc79DxhJmyiLIbzflffX01YRFOYEgVgwbEJ/1+49eDDu6/fAibzMaci4kQmiJ5F5F1iAjHfI+XHRdbxVS5q+yIv6T/4mX/31/YkskhUWQrOPI2IqKyJD6VPywWVHqSsLnGeFj8AjVpY0/HvMWsTwWZ7ovHM6srJCaJdxZP+15kYJAehZJJFl5jhsy/1gSL1fmM0VQkvUp85nfS6rI2zmfpuvnsSW2pqiP/kJ/2WnLdGpokzYJslN7220Zr88i+YN2sdf2TNfY/9B43+y8dhcbm1bz98691+N5zPFojzkedI7m3l0mbZKWo7nzPNkjyUbqo7teSDpXx9Fk64NGyOPovQlW9fxDVeuqHqdFPSgrQ+csXXVyS2Gp2ylr17Lkqv9BFVT9gSoiIkjIPST0+EVDrdmpo+ZXLhLciMba+Qw7SyBeM0imZy/PVriktPMSdtCulmReMuuxjWSGvXUrGGhTXuN1r1tpD5FTDOgraVMi49qlQkLI26xBiMxI8oCTQ+7hObPlTvbQRpCSVAu94vH5gFwR/h//Y7dKEAQ5SXLK00BE2ZcRZ0R2NKUgJJSP+QlBYpgftMWYhfuXreX/xhGy/3LVLEh6LyijZyGoH0p00ZnFiDPrjyVJVmT9Wc96YQom34tR9LthRjJKtVFbRt/r/Ay5bJmtNaO7n1my7/11X21UZ0/9blvanWTOvHZnp+kWaXezd7J32rRp/yDJ6MyMHto27Z2n5Rkzjx5pmpg9Payde/88zE6PZ2ZG7t3lulbOr3J9B/RB9qGTLfvllKNfJyF6b4TeWxBIOx7KMRRkKI/63Mo5x1LI+fQ4PY57777/o13lp0sVu/83V9RB1U2JJOu8gqiV0SDDdKrDnqHjCQQhLbElInaosOhDS5fadynN3i/H6IV+Fq7rqcLIOgnKOs94UGZO+eWbyNq9u7t9IWzgBskf9PuPLWIgwbpG0aHlkJ7SCfUgby84C6GHjiJyRaOGNJI1pTkYPr2syv+o0X/r3YGEJLL5g9v7KxMJ4nkBhQweTZVSS/g8P5PIvvnuT/vTfpH9OT/Lxd3nne9+Xc9DEEr2wlDJ3lI1ixM1hRKo2bNEbpL5TLgRuWf+Vwkzaz2T9awOSrJMntkxWuIqe+XK1XZ/715Z2Ms+FdszDw/Pnd17f+W1R6eTmda2dxlv+8uYwxhM9bDpQVv96lfbtMzg8YMdadoYWpp77zybPklnj8rfzYkcTczE63cgR0e2pI8uR88myceh7X08Ah1kC33QIhaFSs3LyTVxcbvoLJcT9OG+zzk7O/2dmtkSSRXUjUJxKZMgMYqu0TDF5BiZ+RUkrFwREjqkIZvGOjWQMWdjrr+aaE62BG6jgt6zj9SD5MT2EOd28ahyn7u8pmpl2FybOho4VALDBoG4FdoGbS9bvgz5GBGZ26GSIzOvy2M96M1j0H09n7eZSUp0yz4XV8Z/8n//f6b1uv4ZEq5FsAp7jayMzhSLruVlfwzsET/7PDy35wMiKn8xsTNc7WHf8/jjQnBtC/rO8jEpDGr3VATVFNv9UT0XEuYTTIlrLJ4Z12RhPjNezmTUeqbv49+pSmJrr/nS+ZpS1yK0aa/U9sxbnpklu0m++pWmjUZTbarVttK2SZq7be99P3fyzJpjMMfQpm06/QOdg7b30zuYPUn69bvjaHvnmfM6mrQSyRrfAZfuJXXk6JDo0oeBDo5m3Vve51U91piz2MXSWDrUfGg7H9xyu+T1jIcOJV+pzmX/x6pC1c/RVVGVucVQvUOFuSHo0p2ZZrhcApGEFQlidmMiTr2g1dqPOWSGLq9BAy1cXjOI140d6+zaj73pUadbRAkie236pU22uRgkic/i+rD7oCOpI6oQbUF+tM4t4SFrl+e2lE4oGh/eeEwtit1DYWX4P///lyMSrgsiOSXBfAbfAr1cM3QuR/dPiAtPERAXGZ9dh4teP0daC8zNvVyXu7cgoyQ4bdaluVPtUPMqJFTSe1YGrMd0zbRYSMLyeiWuWetZ5Hsl0JnWsx45lMu69qpVG7naT55/p+pQTJskTQ4y7IdxTWeWZ9Yza/d+7uwlu/f+Pp47eX6e+TWYx8/z2B5jpLt7t+12jJhjDv26u/vzPM8yO2mSGa2kXaczV75ar1kJxlcfJn10V4eETkLQHDrbdZItDdc5tV7yoCwVZdVDp/3+cCRBG6tnuZedvadVyq7eKq91qELJd19BMvm82AkJszvTmu0YMUsQJFfQK9flQemoZmwyFFZQgZVnVIaehh4Qp6TQ8Zx7M+o8l/3z2DAPLFVyCWQvL/fiID6Lj/pU7K8R+djzsXf2zPOcIlH5MIgjHOWEEOVxrCXuKR8nInhWWZ3/xWb/tTaZSgVJC/Hhqp+dlWGd/tQmaIM4vysb2sckIMhPCOVe5jU/jSaMn+Mv3K+rDCip5Zc9Z2f4WBLkzkLgfGnJxUyYCZHMB1NyM7NiPZbXmc80PTMJrCfqccWpXbUipZ+qEuTqe7f3boqONmmSNsk+9t/72dVuGMbbZ2bmGXt7jpomz6TSNK/jGAeqR3vv7+7OPOfP6FeSYiTpt9PPIFeYIUlup+QK2bKlPK/z6mSTkC376Agte0MIDcGcjqDsutRZ7oUsxSn6oHN06qG9cX7v78zm2oXyWnVTqOKZNSKsBsENdUwOVI/OmkQSBCEQJCs9ECUJojTOSuZlz1ENdSMZ9B76Ga+xPH8/84h1ejLPI2zd6JYNQoJy01dTbz5u8Y0Ez35qeys/sSOJaLwMQfK68TJ71ryMEG6URa8SWTBMRZ5RK+S71K+YfL6WO0l3F1nxDAlM5Ra+h77JhiOWWqapT8Vz0l/6vLCDVCrv26xeZYKb9U6IueWMgCdOxkukpJvNCizKW+IzT737Tbh1mw/obqgkMBlrfqagzMVY4zPzOtY87z3W9LtHnbed/ezOuR3uDA+H5/Acns2aJEzMSnUY1OHpGIiJESYmMDHVMcQQJgYr484l5sButV7PH6kX28t+2RRUlml+Tj+nuag+02JUXtNf1ZwzemWpoO6LhLxarnUioUnCpFmubIRTbGnWdW2Elb03wcqDXSO9956eh9YKIZIlCcISaLjCNLg8GjMZk9Da8zWElYtEsriijW1PX2rlGSIQNNCr0aH6WVUI3dum4xp77lDanEecb+HpLtejBeE6aEJbin/0m+owhIHxqnzdGfVBnvPYU2hD3Qu9SRfnahxqexycIoQaxAeRIo/NR+QK8ceToYXlwp3C8+krl7IlWenPg0gyKi+QBOaQ4qObQuDZkYRahXk/XXTvPNO6is39fq72mkIz9+RJPzwPNw8JQ7IiOb+UpKYr8ZtBzZIwV2W2RkGm5lyGSnD6uct+P7/POvczhP3eW4xqMWyjoMPU8XDUYMNt83lvE4Ng4s4lV7Jy5dru7d7uo/o5PF3Hg+PN45nr5/2yeT3f99dGMT3aeO0SbKlYZrMmUp/5MbPmR8UyPxWq1pQdEpYrCSRYOWUnRS52kvWsHUTFQ8rec2hC9352E6rzsC+brkSCBIFEZ8dMOhq2IPdQ1axHx9TP6ETGFYh8ho58ZklIkko8aMfsDBmKXzWcLvo9oyJBfyYn6hL1OK559uMUnarZeQqFistAQHHf0pw/pnru48sRzTt+eU4vXFFKOC+TteTMSJ6jfJjHihZEcfl4zLRSms9Gq/Sf7qkmpZNyJt8+s4jN8xksPAwyZoaCzaiVUasvc7IEBFkvT2zpNU9scrVZ3deoVepTz3vOXRTM85UM8RBen5531ud5i0DOS5GhWs+CqKlnSUJLqCBf3jUMPjMII4zVqLCp02mO3z0+ZqdTkhjiOXiOvMPvwINWsK7HMeXwOJ7D43gcj+PRweN4OHi6jinNfj3He7nF8715ba9NhT/6e9ODos37GZSCpfJlWrPUXFLRYg7MyhqzAqHnFa9JljMJYZYrFwkrV0IbTchrb9WOrtg/4jX3k91M0v6+JIFAqECQaNc2ktHbTGP0eA6lXzOTkLBCE0kQ2m2P5DMjHURghS0z6KG1i+gjCuGIa6LniWv2ZBUVnv0vUBgUSAgJE1IK2UuKZfo0R2m7i8jLG33t3UJC9szkMbORvVJL1PZ8FCKJ0CFro90rrSsr5S/8Nz55ah/edSWSg5ms6VrWlr2ovbGf6IH6RMyikVL5OAkfBkYsbCUDcT+N+9nu6ou5RHi9BGa9SnKHlLcSOB8/PPPOO4ucQc0ogtBJTUOV12CsmS8b01zDWEPJe3t9nzM/DK1R+p6EQR0M4mnbvd2b9wymdDwt3rOOh2NiqvfLiOfwHGNVh1xMmGDEQH3dGNq8NvV1v57htVW2ihbzU0HVZ3xmGU2TWnONZoVaw+p+IGnIHUhinVcCma6dyylhXYHEEsh0XX2SZiJ7s5vZ3PuZw54ePX45GphknQSpJSHFSkmYPgjEkozpnC4ESQhZ7IQY8dJaShGTayOhWrs26bg2ydIEKnjENZ55FnTVcYADRITbgEigPVRdYMaXM168Hr8yR5uyZ2bPpz1FKM8tzl7WlsieBrIha/YMFu9uWSn+B9taQidWHFroiE+xLopvDFSCKdXVypXpL3xORrzw+AtTruqq6ruYbqrhLmoJ9z3nIog5VwSTMDD2tyKafJQEpX9q7ze500lqljwm4kJBs6aZKkg1jTV8dD8jow1Vo+liSqsuX1MYwoSpLseoYxAmTBhhEKYcU8cIhhg/xk0ujDb04JqentfmtSmY+RnLrJprUPrMhYK+NuadrUuVMdfMRaG5L0iiy3V7kLADqVnXBYm1E0ki1157Q3N7CHOMYDfIPOlGJE4SBAlEmwxB+mOamfame0xjCcK6JAlyEhrfySCjUiUJ/We80HayddLdrThJ6DucH7RrXJv5nI3UsANIKRNuZ2UIbwstFx98OeRs75KTt31pcZE9NBrldYa0yRGNE8me54pEaZzZuB/pX9Rq/Ttyv5Ng3eXRvnTgxeNf7LhGB7JT5w9FjBL5jdgPIojny0R/EKvIXavWL3eW3WoF857WRWwiP0Bsw/w0KW8lEPVWyCRZP4wzoTwvnSgijTLXXEMVjHyby6hiMOZHMdb4jE/+H+ua3emzdNF1PJAL0kpLiokJJsaPMVbWP5IY1nbb1u/10aWrq+vYXOsybXyyMGgzNPN1Zc01qjkxC2voky9L1vyUqco6s5y2xDq5YkuS5bq3kdIdJJFsiK69ni2jMs9zjphOu23Vkc59eZuwkiBZcp2kMTGdBr4R6DnqmAYJwnkhyIUgy6ZRCFoxsmMamR5rbbSXQYqWb3smXagoO5Rum/NBU44NXXNGEAjD/JCX8vat/pDYzLgP81K0xlc4oU1QRNWS10EauZSf3PL4qhDEeBlBqEEEkdQzOivmL/xKU4LWXaxrCYlkobAuamxDaEO0tdSD+ux1eQiIX5Lt4/wgtai5Udz7c870JzV33sa5q6CJ5+USZLL9rd9bb7mhknorefz4zIrkVie5kbgQKNI01lyZUEGNeVuM8mWUL0c+s+olxmd1DFK10sRU76mLLrqORxfp/+c5nq7r7YJjqosu6ILes/dz1WnR47xSKUYPrlVSai56/Uyr+SmvFcs1Pw2zry1dr8VScl6ShvNMQhOL63qQrnMFEosg/d21Y/+dqMRiJzVfWQ+7x9BfLh/GSh6SOIURuJkjYzS77Wj767FpWOKScCeukCxJUESkY531kmDVawIppHR3ojtocY2XXc+Zxws4E1HVQgkgvpzHPX0bDjK5j2+3F3o7yJqjjTz3tR2icTZcCO6DPDZ69z5LhYJ8mC56q3a3rBh/nLCQZSX3s0I3zBfLy6VikYUifKrUVWIjfTOfkuqDR4rw4So+e6nVj3k/3Viu91VhOsbYj4iNx6G/1LvnLQJR3Hxs1CzLmZ6jzMKlk56d47tgrrnGGpRiWOZc02eGoGb0bSxodiFXWunHGJ8Zs9Pb7GehfVajWq3UimY/1eo6+dtsd+nqGN9rVKgD06bnWpTTSuqTsW4qX1eWsZqFsq2x5qeZ0mnNTzM7OzEkuZGyzlyhzb0f+xKJSvJoLMkmsPKsx84MybJ3Y+boN/ImySIQiyAdVocErecI5JejUbUIwsopQblskpDoZxjy2BFEIBmSPF70qDuEoptDU7rbths69XCerTTPOZzSaAAGQlQ/AIWI+7Hj88xv9ZxNaOTTirKX55LZaG5JScsabOfTliwnexS3pC4lqQbf3qr9p3v8LZVQebWwKpdOeNZDvVLUSGI46R2juiyzvNb8IMX14Qg1ni+JQEavcnWtWbvWlJe+X3nfSGO7GR76msq/HvGHRSA5SKLcyXnXm1x1kqskPuf5tynyZb4ckdJcaR59GpXXMpuz5rBLXXT5TKysFndCjNLxtM9yru2mrombasXxHEN1Nfs1Mb6uXH6cRi1UrqHHsVD+WaYipNc1Wipyy9GY83K5iqmBhpHc14JknUtCE85kh+Q3K0FiJbG1tPaztw50ni2PmbTHzhVILDtBMiRUkB6mo+5zb9voPcdkps2cEhLOizxYlyYaTpmt1blciHgNKoMzj3ZC378ytWp6zE3imhrPXl1K2Esg0dazcWDISSABJaZQeoSNbfFhYRPb9psqstZ21r7qHMrhzCUzvpazhrZOyQ+fPYeWOI68DJHSjJtXzl/4hTq3WZLnSsQZ3SzX9bx4PqPJcD0ja6nVq9R1BYRko3hUQDxH2j4s5Oc17rqsr9QLQ0glYl9zHkSX7Gtugj2vEZd5U2/hqm7K8uukZkkImntNVKFm04DQty/ngqFX8nXqXHVWV5dWrXTJJZdc5EqfK/dTjB9jCOPrypUxrBS3r11dXV0M+o8o5xUU06Pn6t+NNCWlFlNPUXVUn5pnSWWpZiisswsjyUJihLVzPbbEkh0klevZsntMspIn/9Z9VO/tx472qJ8ZOZFYhNixJJBYStKDbPvfEtrTtOOoWVcughWEXMEmvs8riOnX2tEtod/8xo5KYmjVncw6AvFA16WZdg+0a1Ap5rLZjpQsCBAm62kPnD6b2312xn3YfT3nTu4p59OgL3LWvDjnZM3bg8a8iG4J4WiJVCjvW4KkEHi3B+HK8c/zsbDc4dVq82H2msxV3ljYq9g71p6HT9eGnb550aFWxE4Cc+D5AGndz14qxntu1+oK5s79ISkqpZOwP6OaoFKvih+GEqISKElQOs3+8Nr3XAOiGKUpa6pCas6FsTRVYj+h2md1riytaAVduvyYK9e3v2ZXV5cuDR/2c/XhkyVl9OhaChJJWmaqESm05r+ngVQWNcyqs5AEmliS5CG12CtP2nXuHSpp7lCBjMfO7kFrTt0zk3bNToLGcgkSi0BD05Fh3Oe2y2TW9Gsc6aw5SsK6rkv+PaJpiIcMgdhQb5shg2+vafSfdn0htB5oeRBo16BCeWI72ylJSCYQBSihbIxhG+PbUVSMxPk4SYtwLoKUmcwIhSoztMygQWZoEJKPg7ztNXhrq/dXjT971RRCtKwlly4TZ7LKv9i3xORoVd2lHt3VPkzKx1kiEJ7Eg0Bl1KU+Me8LrRYuvaK/9z2PJPmfsS9DMsISn4HKiKWbO8+S+NxmqWTSbA1rRiHPZ6y5TJSvq2aYLX9UJPbzy6/mKid2zoL/mKrVSl2tulq1atWqdyf7uZ+sOlcu36v9WB8MruUa6DlIOYu7alio8hlLquj1n8t1/3AiWGPqQpIu9hUkKUlip4b9k5EkKyeR4N7Djtfem2mYoxbibda+doJYp2sPCetiCHNn7G00M3NkH82YaSUQEuS+BGLtK9V6k7NVlOupd/sziOtKaWla/9yIa7d5suhqj3NSlJRKsD/bQEkWEClQ2jCyYXM79tPwjmcXtuyhxp7H3Hl53uY5yHPEPSjhoHHkfSJOd2MtMogUPfPzaAX9hT/Rnm+bZFus1V3FmTifB3M9pbAUUnsbWdyTFZauJdX6ICWC1A9sH2f49qqh6XtvyC6lH1fWuZ9Urc3NW9emK6H+22Mkz5LISFJLEJJCkTzCXWMNfTtem2sUJLmr0fxeTL0iugp9l/tZXT5zpSVX+rGa6qJRLe3nyv1cclFdXedO+9Vqv7ykOowrc2F6nJfTPqN1M0vm4hak5giKZZoVKtagekgs9hVomNxBY2Zl5yGptYOktIEwqmbsa9ByJUGSYJtJ4pyECCsX0sw080wdxDLpkFkEIWJfEBIkIiisHXq0M0j2Fw2aIPOS7dqaPNCuMe2wa8SehJIuT7D12ZR4AQPzv3IpfVYrPq9xnQ8lmoRTPXmFpOllfvCurGmbF4RUmYcga0vmyWMbKpIi8OTsK8jfgWZSlPh2ZLmtiTWhmPA8DHtkFX/0Z7GpR9EQ11+axMsDT7xEKNJnl/zp3npnY+l7hIdeNHXSN/Il6634PL8owSEO2eLQ3WsWCYlnfq41SnltrrGM1hSCGcxlqDD/bcYfSnWd7CeqVSvf00r/t7h+6KK5UpbL+BMLRo+ZSR+Yq7LGMj+idIszZzeuyl5Ds0iznlMCSVjXfaKhXwmS31aSTTNYedg7s2nvTfYPmn/odBRJWJcEwkogYQeK3OZQJv01WuhwBWElCbQIDUlIPmvZkKJLlATW9hr0E7qTJk112stv8zjbjmCF6qjniI3zLVmQcD24bQnZYMPm+gFvEe0OkveZLVmzNzIj9aJfX92wtBmZxZKfDIoQkuf0SFn4XLKK/+JvSawyKKri4+1ZXtazWAt3in0zllmqquEuhKIS0SozpA9TI30Y5FkXuj/vmf7sVRUKeR5c36yHtZxDctNOosh+qf7peV8rPgZKQnd5iimVL8uc0FFKNVfmMpeZ8q3vpJXVfixko7p6P6vro+sjVy5pkSsXcv0FXevcT7XOjz3XuTc9jj0VlTqbnp7q/d35uk7/xJqrbkNEWvMzLW6dslAhlee690bS5bwTJKG3k51Wd7ATtXZCM0NTj23PaPvrkdZrFhKSxJJzIlEraIwwk5qJ59RDtUuCBBdBQnJRvoWXOK96H67UJgZ7PzYZ+mQ70Eltk7hmQfam2+PMTQUSaKqrJCsBVAovhwhjbmbG512dsBfuocys0UON/YS8P2si8jqvcx4rPRwuS34w6Gnk8lNhJfmn91B8q1WyIlpXUJxPLxb6TzGxl4odFXXpWArzvopekNjCa4pAbGSE1whR+dmxuD/nPb3UujAnj9ufendry1v9zT8+6y3sW87vs/abrKRmT2Xt5NSVtPLLUE+OowrmGn2GL6O8zlWaLWONEtJ77To/3suP1dW5d+65OPfZej8pK9epuprS2M9a0jr3c+86F6qpZj9XKKGcTs+1cA30aPblGtIqee0p1jw3QxWs59Gdl17XcF9IEnNeOw8a1hUmif4kxA7a5GEXqutZ3ck+Wgs5vSYQEvy6kmdTJJeRIbeZI/TI/NJttI4nSHAlglgU8foHL2XJ0LZp8nk9WoHVL7YitWlVpSndUtXEnEtqVFJM2XqncDaU9LsGWRCiiSkHOrL5PBAzxmuesCMRCfeLzLR8GEkLISSp5flGT1Xa6unLbUWlQVH3ZpgapJ6I98/V9CdE1JlmakP6mFlr4/mjvCyKZbn+j0WoVcusX0rARFdlUXFbRexMT0sE4TXDh5F5rt13zg0MtQjuETu7fc3LrLfcjxyH+JxZrBXjIL2+lODQP8GgBxPGGmuivI5RZ43yWv6rs8yKs3zPlRYSK32+l199Dt+rn6CrC01Bq1a9n76uxPJzRVlc48Nroby2zNkH02sV1vw0FhX2omZB7TVUIRnrnDuQdCSBjHbn3DspmuWhPZj23ntfOY3WawJJlisJyopAMu6cSE075minkrlyGe3R2UGQm0RkndLRIglJrC3oF/q50kEKqYkE+YeGSjH0/U0qgaSeKYGwZ9ZGmHb8MFUnJTOZrFBeGrYfbrX3lusY6crkmtcb0kVKSJeZxnOEVGp7zAxCQZs8BoksHnslSHlBWs1/8VdNMPJtJEifZ4aw5uaNhaX88PlUqTVP3TNBVRT8WUuQWZ8aHskltvJEZBIvr8/xfKqlMBEo3Z/3ipikSWLfKMliX0Vivs5P/xSSe5HUpPf9XxyZw/K863x30ey/rXH06i6aaywmPrPq5ssY+rnwbq26/HKuXIn9XHJJf9X9tJ9YudLKJZe/uFILrvHZSjmdWa3ChF6Xu6owla/nvV6rz9jP/OQhibUv2ewk5ucKTyRt5gc1aBe22kN/njn0NFutkMtrLASTWGeaHQliEPQHrRztoucxk5lfCRKsJCGJixDrEgjOK5miM12CLbA2KqiMI+jIOYK61J5P9kZ7nMOWw+P8g9rowgIirYf2hXiNzWeZLo68HsaZSI4ELfS1xqH74oSkyEwy83mhZD17n2SGMhstIYtcfrcV5VcaY6n0/YVkkeWfIuy7anldq1gW625lUUutpBZKpUIjsoj75cMUXjfpL3lkd6BdZ36k6qU/3Rr/qdtM37/IvuXjp70vlaDkzsKAs6lZxPP5NBjreR9boZr/NsP9jTJqrszJGqhCJapVKycUi/TzhF/PlStXrm9/1S509X6yn0tPM3qc1gmV6XHNWIy4qbKYNeIiWYM1y2u1N+MTVGY578SjM+uZRGjS/jxrazKd9n6w2x7o7bk0D2lxJV4TJEGDK/OQsBJGYpQtRjMz9rHniBEIkuQzyOJKpR5C8rKUoZkvdtltUDE0WismkbqsGh2XkvqwXFPsTy5dZR8vizZqbHJJWyjHHT4axOeZ4RWaNuRa3j4RMpPzgyOzIn2QmRmuHmbUtg8PkZeDYbyQrOp/vo/JnXGwFtaaOqs+RUzUwvJ8ZmFNRQ1KRT2VHYhaKhKxi/mRvhnPg4B4yPN8wH7ItbsqY9/LDUW5vmPv1+3zRZXzlty/IFNv2VDuvLOyA0lTsxJf3qb7OxBcqOEs6HzndYi55hq1xlFBrtxPP1arVp3s53thd1bvZ620ToUuuuj60oWude5ks6Aa1Y6V98/y4Vwy1yrH6qWTzvuwzCqk1GGNZ1Wj3an2GqpQsSTJljTWmQRNrHieLUF/4nX3YDR9NntPI5ZLvM3t5IKEtYOZUHnYCXIbCTpz7GZGMyNCyIpLaE5ibBMy+pnOLwlEx7o29nlCrkDGfDkzSENXO3cUJc+chO6YczvKCXM+wYGo2kCY9QCkfcm+eIMtPo9fv4VifztkoRDH+TjyuhdnNOQUEjX2Qrj75ZMZtJTDeZ8ZXXRXVtZ34f+KrDLp1wt1L0x6Lr04Amtaq7y+j1W9atViVqG+I7uaUPN2C+F1S8LHT4oPiMgz/VmrJubnnfdEqxWe/Tk/p99z/+oOUYkShqT3epPcPU8qip1AEo4qr303rYF6+XLktmZU7iLuKszvZazyy7mfK630c3Vpqqtz5aJO9pOVuzlQWml/3b2T8nFluExPDyqoDrSmNWe+LGEvas6o2iyzLlSs7szzkGDlCpKwkgcprb0h2UxzP/ND8zg0i1whJC4RCIuMncSsBKFWBjHTLCYzyZdZCRLrShBiEYTvKyXpHFtPVIL9z2qPjMbKiXhbJNWkTZ127di1BamqrpWNQI4fpmqoQkYpBTjh7BVza/FxzGzKvky+zEGeDy11ZtTTp0HW7CWNrCchvVkzG90v2UObSk9p7m5ZWf553mXunHLoVWItll1rwppqYXIUltez1NUwqohCFkJhFAGPPCleIjYZ8YHX7FXrqthMvbPvFZbJ/KUjFrLv3LjBcOxV/zhIb7Mknul5z6HKk/GBZw29em2sfM81SSVfjkbNzv1cxVkfv/pcKxe50o/VPqurUe3XV2LJlStXrh++13r/xDU9enj/dCy4WcyPucRLZRlrtJp5rWMvdxYPlTXJsNNkXUk2I7H2nWAnptEb2x5MFo82trYi8TZZSIKkiysUVsIW2HlIhqxnpMccMb+uQDiDJNwnompRZFhbvCa0EvsQQ3fYgvretK6tc6Qo3difEy8+J42klee4boRSoypreKC0kHHCvcW386oXdhxJkedbJMiH6SGkZT9BI+TtBWch3JKOrLlf0ZLZw7db/Kut7r/4WyrL8v7Ca5FyO3PfZWFPu/x4FRbSEIVG9oIyIhW9VP4+SxGIzJO4eDzsCJLwnOyla1Vw3xmbbhmGk/tXu+KanzkRn8nd45UEzheFxPO+12CjA7dkeN1VxEhjMbzWkdC9vFd1tXLup/faz9LKX5qLEblySSy5kiXXx9cJP6+zes917ufFtHnqJ64FdeL+GurV9WUq1phmiVKtccwyyKk11qySBueehZ0kvYI0MW1msbXpUUk8uzuzzdF1rivibZwkg8SShAZrxyaZmTtI0DwkQztzhUgikQTZLldIZusmysmel4zXQOP1flTLaLy+tO9aTii4JK4xHaiGE2xIiqpqQG1L3xKEjdlGfBomSmR9GxJB5UcjRQRtJyfcKchsy8vsSZFPOy+3l/24SDh80RX2478Hcl9dWUcxw94FFcS+y2KtVRQEHmcqllrarKZErZmopahV61LaN1PEhtg8vhmekx21iuhPRLlpfe1Ov3O/tPuF6XevXM/cZYlnkppKsgOjDx7Ka2p+8MC5FDSru0zLH0odT/+9E96L56imOu1kV++5pN6Tlf7SlfdmpeUs69yz91yn/dxPe/v1CuX5Zr+Ynq6lnHepOlnD0vyMoNPWus1Pwa1aVF7rL4vsHyiyvMZA5ufZ9o6ptuvBPgza8xQJkWRdkiEJ5ERgX2zJzJELaqTW6MwoK5CQG4Ebglhyoc1M7aCNt6GNoe2YChrozpRee5CqS+KikGcfQb15ZsWPowpKjcJLT3oOGzD4fwVb3M/MqFRpXLvo4FBfbyMRNUQPfjp1MvOyiK48PqQ4QWl8eIYpPAG/1wrzJ0gvJVVUP75NimFe1IQ166O8rJRrYI1VraqTWRRNngcVPpzvcIkgCa+Pe5LwupG1lKoVl7lpwS1vYV103P0pz8X2Mb1m7ewbJKFQMG5xqZOvq7G4b3pECWUWV0o/pr/ic6DoJ87duTv3Oer0XuynvXNvaZX2+UTjvXxfuWTh+XY6PVzrMnr6j3j/VHaxRpqrpteq/TuWGw+qWG73QhWfko20WfIHsBPqTnh+5MG0fjzbDpP0GwlBspBAsJIgGVZmV2siY09LY22po80aORHEGRdyIVGxbaoHlowJMaXRHvWah37JaP+Zh3rtPE6La8W2z4JkmsJO2PsR53ISyst6Q4Bu6z/ZXuWjuBXG67mPr4MuWaMRjjxmzzxvQyJ5zhoRWY8eOArCjRnp3sxA8oKOVf4Xf82kMWFJPborYy7R1LLptajLXKyibPRzZm21bExDRdXoVprS+fIXJgr6856M/SLiiWXaUmXf5a2HvvX+xY66Xxdb/7FSe5b/2+aeeZ2vgg03PQc68CivQxU2Xebnei0uhEvmsnfuZ1lnYcJzkFjJSngveC+f1T6roRp258qVK71HWmnl+vI5L+b9df98v9ZlHK+lQsGGBdOHRlRnGae68agT626zB9VhzdPwSPLb2tkhSWjletiaTdv4Yf+dbuZr1oh4TYJcgUbXFWiYlTxHE0y/H/RA1kzC1DxzXUhwhwRZyJBaMqrDOhNaKUs3lcDKA+mQKyVTGrPJUXSlnk3QYp51bKQeO8frqKKKqq78r2gLb7KfxBch+e46aonG1qUPfTMjL7OHTiI1XoYg6UURhPJ4QVu2EE5ckrWRBDqHJ+ZK88faT01JMLlfaw/bde1jzc28rMWCeHyYPO/sVtW31B+a8rofagWEKd0vHZJ4+fARL9hPmffTVEX/tWFz4yvZX1/jzb81AveNHjsrw3n75wZ5UHKtoUqYM4w1VN3oruc3jHUtKurb5F6Xaiiy6950+YufizvM5j3kkqy00kqfK9dz+HFiBO44a7FQPF6Den6inE8P7tEfmsvrVfaiuXzZyRrr3vufesoJaxZ2Uuu6QrRmhpVrPbadPUaPMaV2SGdGEkgtrkAS/iHxmkEyZo8hdWz5g5m2zxyl8zWWQHBfiGpPV0qqBKqIgXq9vMaUndE3ZA30C1acBF01Ys+Zs6USD9nFiTktdOlqL0vpd6H0LY0ENoAQn8UUVGN67gfpaOS4Is95zmOpEdpQtwR5f3FquZH3gyuEkD10w09ltf8zPP5W0r1wp+Ts+5GRvcVU1tzWQrkuJMLrNksvhTn3s5Tuqk61StQl0jdLkCKQEcgIgtjmVGXoR8f/67e/8+2/unHv/qRu3NVJ9h8nrj/2is9tVuL5zJ3rte3LylzDGuje32ddvf73gkGU2tvK/Vz+K+MorZoi16lWdn0s6dcn/Dxxb7htVi5pnVTDomh4/+RaULBfjJ6eHm9FXnu1Rq3qWdwqllvjcE/KYua1SruvtZOkR+naCXZao9rR60pC29scTbyNReI1rCvJkAR3DJmaO0wTZH60NZpxJSQhIVeQhdCwzqSkBxJDBZcYWq+FSpDnQcrUDk1RSaoeqYFmEqSrPGehxqbVj/pum7YVGwHcIL4eXiVm0Y1cO3vWPCY3akTndfZw9shzlBksyAwtiH5RfjJCXFlxP/61BpayJBcURe4183D8y28/TAiIMkUtfd+zomuxa5levaq+71EhCa9JQkAgvYaICLieNtbX9M/93nvxxLyo67JecdT6cV8Jzp3tkqTzxv1tWg/nlAdpvqxhv0u+rG5zzTXW9V/P9Rz5Xv7S0rnTNVf1fu5O9nM/refaT7sT+2l3vmEO1d+qWYmS8unB+yfVA28c51TWXLP5IahYd81bbJ28Vt2rTlnl+Smbodqdx94NU01v9sqYmdaaaettEiSIZG221yArkDCtZ6sxzTKZwzQzK15DYsuQ5JQEGZcYVdYWWolaMpBB196kGWmX13i9bSmokXocce16prNcatR0XDd1qSpUp2yy+lI2mFt/EAjmVfPSjvzUikOyhvNhjkhISEPyFNzIPKSWKB8eQeRlhx4KeRqeX3H++d6pfD9ozLnw7unsjD33uq04NrnUYiuv6S9MOqpW3XfWp6rqpVb++Fut0ishiYAIUuxQhDwZ4eP9UGu+11d/r83+XP66XNnpFfuHbYs7uf+k9krCnRHKfh/BKAZUPGh2rp01Uvl6rHQbi3Ff3s3PE88h13P98F7v5bManoNq1XiiPQdKq2al9/LzyuXX53kx/cfznXL+/ok674+xxpp3Bw9VnCXxONVmPav5PFTHMoutKWZ6x0NlmB7pz/Ps3f0Ho0djOdSHYcmFLYHEaEpXgmTM2gca2gyTmU5MEkhYF0JinQgJK5kmzcypmap6TVCBJkZMK/8QJTFJQ0QpUpMdqhLTESRaZbmWaIqiaqRG7es566x8krgXSLFq1SiJPiVr5sje0Qgh8nktEUleZj17ZbZE9oQQysxjFzw3rfq/+EcVYU+nTSU5ZR03lolJuS7PpxZEhHvyowxy1aeqpcqlHlFLSdRSPDca3chHlvBhQEa8CPHouoKu9Z/en+PqZn5i0dtmycrNumf/mZdkQO5nWKNdXm/NNZah85PX57e+TayxZl+S18pz7XNVK7Tyl+ci32tNpJUrYaUlLSSva6XlL5zQtbJ1xf4repw+34dyvH8aa8yqueJ2qlh3pYtOh2PdeevZ1V+oG24StLk3djVhtPfDxHnMQbsumRaS5D5vCUZqkUBgJWjQZGbyB6Y9zOxkDv1azzoKIQkCQZI0XewHGZrEHCSUeE2Vb3MiI/KoJOhnTkVK0Z49z6q9VxQrqUsRcS6SLi9Ld8qzwZsVNRgwiI8C8b8qzYsdP5p75dR535esl5dtOZQ9yN6THGnJkewHjUTkqOPMxmk+jH72yvP34Jx67FVmG86IsZRYYp1ibRvnU15rE0kEhDWrNRWZq/VW3y+uQkB+JbVUI0gVBPEgP3jdzlu42rf1d/ys53711937l4vLfheGZ3qZV2JD07DGLsJTubFVnYHb+NzMYY01KPGIlb4/R5nLE63meI4y4euE7xP+qhMjJj7m+KG6Wv1D7e8ePb3ra7x/Kuejx7V05+fhIQWL6sl8/qPDGmfdORcUa5w+D7rB0OWBJkalHrsy9q52nZLEa1hIuCSBxEjKJDEaKjxS5su0js6QmTl2kbAubf4AuUsQnFJas+zPzq52IPEaxsozmhS6aD/jJevZpKFTcz7xMuzpQLsuikNcS9FKbTbnNFN8w1cgjFQxIToSOiLrFdpkhpRb8j5Koy6VH4wI4kUUgsbrOMjjX7L61xfuKtCj3IVeBM9n9kYZCU9IEknFH5Y/Pvulv3h62LmxP0eN8y4lzUzPGvQXhElyT2Rh5YXkznocbdHv47Pr23Ktob84n/19n9FVnfbyLI8ZwXxy4oySSFzXA1ORNPEgksTbs5NEIvKGc+X9FU4J5zqFda6Tda7TOrE418u5nAv2uta59nVdO9lJsrPxeBskSVmnxZUkO/E2bcxyrn0l8ZpXkuxci+w2snLdbBHMSHs/Y7cJqnfsH5LOlb+0i8T7ZJ3IHgjWlRjJYAWTGMltNIb6h877qxnauY4UCStBVHLaiUq5Uk1mnK7dAzFq6YMEvVJD0E1DJ5AHEq8pt67uporbM1DuRrtQmAzXcJ3XPLTyv/bHSrmOj8O8Sn59u0Me85x8H0h+POEQjYagPN4HeS7y6n1fpHqg76AiZbcGeMk+NAjA51cCLUk+t5GGSeKKkIgjP4jzFoHvPz39970rHFJVaijuSRVV5vdspBXNRLxezMTLYH32aF1qnF6fvStdepwaOa5HGz1ILh5nPpt0d/bHelaCquS4nqzvU2szSYOEJDsJ9uK6r9xXPvRh/uyVLEl27oS4slxyrVw7Sa6830m8fR6vkbdNkt7bOiV2cmV7n/e6kuvaCRFJwnrWDhtJm2gSr21S+pWMva/qMTOlZY80M5H23pF4m2QhCSRZJJAMvZMhQe8TMkiXJwPJLOmI6EpcSZBfBJL5bqb6mTksHVplmqZBIf8M+g7N99YRRCaSUthymEYXPKXD0ERPp2F+kgQSGNmh5dn/6B/5R6l3mfHlTD2Z90308L4yy+fdaLHslYKgUkJSaFkbZ+TThL5GfHsRQeTXvs1T0zo8wCUgNTATtNLZm54kVdn2vbFzqbfkdiwpBB31zvcfqoutDVUOOQ09QuWeqPNG4kAUuTHF8jL3fsr8agN6bM9ObqVqOjifrf8+HDnRSFY/R8Z90nE9PYIkbEjOrs1MEpLiQfZPkn3FdTXLSV6bVGzU+zwPz0Jy7iURAg+eRx9SFTuR92Od61xngyvZt4QHeT8dXa7E20SSWGfvvRMkzW/LPtply07+4FDpfU7Xjh+77dEj987sphkmX106SbxNOF2JQQL7ImlhhUmjujZ2O6Qzna8ZmpkrHSSIkFZusm1Je4hJkrHoMXsiQ/8ZaAMr0dPddLIQcQ1ab9eVPxiqv70l9xnmsuU4z+HgxVGysiDKKHkKZfX967/+50sU4/Mwnly6K4+JJFzWiofasoZyUQ4XBFk7jLOW567ys+nsOfStrzjuK2vfT/97elquBfauB0qAXhVJel35nTqZKI19JShVbz1CjgkEwv92v0pGDXt0Df1VasxfU43cx9Ym3F7OFw4S8zFzi9cxnyOtjnI+tko6Q/XM0ZzP+fKycJpZZ3xPHcomXCbPSk5g4srNtc51rjOvjQ+TnLJd97XOLtdy5d7589KmSUOSIC+N/ElJ7ivWFetc7HW5cl23JPFhkiYMiyQ78dokUsuWPBAJmp29sCXeNrfnWfa2jOavNvXcjjrMjM4kEu8TC/GahuUKxOhqLhrDNEWYo52fkc4xzcwSSFhJSEjEhYhF6GfU1gwkWOLthuaBKPRD69CRny9Sl8qtz1RT4lCw3N03l5dhuhJCWGSWW6Btf4+/+Gv38e2MVHBII46StQWlnE/znMvrcZL84I3GvIeE0KIlSF+c576E/Y/Y/9rLD2vr4TxeN8AUmqOHUeydizTid3AF2nkV5IGCQEzrGqXH3qMNqt+qarr2Vw2yIBRh+4sJ81m5CYnrHNX5enE8Y1OtR6nc9ofzvZ5JqdQQ54MwSeLlSRxMadPNPIl9y15wkrfCnJFcZ153kuyLU5bTrMvay7nOdSJZ5zp7XyI9ap2s09pZnLnt5Mzrzo73iTSvHRZnV7ITHmgSs5y5cyVB0iS1rq7TtiMNw0o89k9ljvGa+1z0SIom/b1IApFkndclgQQrCZLMJMlDwpB7TtqhXceer32Y1C8SkuCKqwkJ55XnJUualtDVoGSwhWkbdKNEke8NjeKXIh1VLGfuElF332q8Vk7/fgocQNxnAQMBDhDpr/8oyvh2OJAjNoK8TBzkbZJL6JOUmTyGRpUZGsFB1swRIfTN3oK+UPG8tB7XxwC9gArZzFdUEaekKiFXg1urLiSKwkP57luMGqVXymg9Ss5gNSSumUiomZjPTOLlYhO5vVwyi0FHG+W6+6tHqXQ4n9P7O/OZELkbM6f7md2SBI5EePRIsgthJ1eu3M61ye+8ivqzZ97vJLk0575yrevOZRJc2cu+XXHd1861JcmW2Cs8XhN5lcDMulbkLWxp0phRsj0ipNWsJPGaTGrG2vf+g8drEnTa3s/z7J38esbo8Q+RiLdJlk0SRFhJ2JJBljHE6/0YCVqHSbdpZ0aCYMlFvd40z5bETth/SWqJExH4TrRHIDennW7ac8zuNFqvDalS5IaCrT6nVevZ4lZexSiEJDAzk6evoSXoL/7Iwo77MB9W7pe+9LQ+BXUEoQYiM3JnBgf50fI6bokSTvZL3qeHrvFY2a0J9rkeA3ZgAqcmQXZwTtNoktOL+XVvffBQOUjQZZLuUXwxXcvtOlXRwf61ixKHLBPNQszHjMolrIel261Gv8859me3HtTQ2nV+r2c1WuiGmdwcJXHdJzv35zbmSJNK8CznbgjO9dxXXpvXViKIt3s9z4I9uO5TEiQnieeXP1/kbSO1nB29s+8rO1cC2dIm1mld/Xt37yA7ye+QW4IdScZr7+tyLmhqapr8sPN3zDBHej9zRhJEAkniNcmSMEOwznsgScedPNUa6scktsax5goESU4JksveNGIJKmGRQZNoWzapURlKva5l91dXNfIc0nFNpjNPYQv3VEFxH0WDgyABCPCH0raEaPevizS/Pp3jcv1F9lvKp6e2kJYZUsrLPIfGVYTTQ1z2UmUe8rYl83wa8i2sywO+Ag8F6EugO84SSlJOBvu5rqVc3L+iEgT16/gMMmryb2r0KbuhTmyViRp3qznMJnIXwiRehvlMueOaO6EmA8qo86mxaU2JTh+b89wT3c4QwV4n8zlIGs8PkVztOpcnJP0Kz48nrj9IcrmW7IVzOXPvJG3eNrF/NK9CoiSKEIm8Nu/723rMgiuu++rNhqQkicR6LEmuZU4/kaTWlTuJ95VspO39POt5pOkvQ92Zw949Z2bSafs9czSJ1yQL4m0apDBJyU5sSYwkg2TQeqTG1DGzAwlyIkoW8Zqss1Fo2anXMr7Pg02NWnu8xiAPM81ovjXxOnB+aEoy5kDFaY9fn4QkJNFp6dsXOHuFnvv4coaXlDtPeRlqJPSVNbMla/ZE0JHMpV9fzjqyP1G+S34yqPSiZdbzaW2wr/77sYF6NMmpbaMkF09TTIJysY8iyBL1g6CmqnQpX81O+/Fu12z7EVv7cZhEFQJTtCAT63s+h1Kj5qfH+difM7qlUF9e5nyvptMlGj2IrDxmJ23CXs9PklzLOeu0rrxlkOzuJDu5Erk2i3Od61zO4jcMkRIJmSZNMonXdS577UVIkp1I7OW1aUgKK1f2nb29z2s1udbGbtMkaOV+fjy2Xu2gkjt5bHOdris5+tVFMvU+sa5LkotIrHMlkARWBjIzk/xDYzSm7c2oofFrrhAJEiJIaWiSJTVUY52EVmAfz4NmvPZwkqj0Ly+DpB2i0NUKRVbJ11NN13Kb8v5IMRZh1vC4hUD6TI06dnw5Xq7FCRV6R9YOQWaei1BDcPIy61lzZh6jtj0HodLDoS+j7WX+nvV5iQeLlRDar+61o7uYbPYkQXoMHdre178DgYMHYpxRN6TU7xrdqlKQo9AZJP0f/0gchElClbXWekx/MbmJPlG1niP7nJyP7V3DKUk3Dptxu57RJxsHcr5XDzSSek2uRvZ6YsjH3fYO5A/Ix9d1X7GTzNpdnOvMutazbFlcN1xrr53ryk6y83p5PyZJm4RZ5+Ja+06cXiv7d3+nsa7e5+M1+0BJ9ei92d27sR2l7fJsY++vSf7S9B+auCIhJLGQeE1iXRInauidC9I5JvezL21nU4zUtPUzV06uBCtEIrKI1xh9jEq6rp2rXqN6MyOiL2EjQ/+ZortbJ3/WpgVqxLOpUFthpjtMhOnGvoTAIgxMm7fAoVsYesj4ckRaPfPL7Fs666GB6KvIncdE3qckHhpIKLOFG5lR5TZZw4vEKVyO6sHTaI2wewwjU6FAWiaxjQh2dk7SeL3f4kGeuPVB1EJc0/eWxChO4YYENVajRp+ymZAbEiYJCmFKXiBezn63fO3ts//GzmOiIX0E+znfyfE66RFx3ffuQSYa78N1y7XOdXXWOWgqSaQaf/ZZ4jVkJ4lIslW2JLmSndnjdSeQD5sMou29d956n7fNl7VXspduW1J0SObOXvPUPs+fgTa5sUlb02Pa7zGuxIeJhSQuSeLXeSXxmrDkRNoM7sdo5qCpoZ2ZsGbiNfhOkJD2Skoky75ml0af/c94m1B50LSjXQmSBE3QBn1b59Gddk1qsoKo0OWLYlE0qoZkQQhoXq6FzuY+a8aX45V6rFERkj3ndV63rF306jLzYYRUavuwvoQoLeQxM32t93vNtsuPa+vk1zV3+0W0pmYnbEnE+5NE8cS6QR7qB39csliwMHror1I7XaWq1dhF4VZIZiEUVpmI1wtmkguJGKV+lxac4zzs72Td3a711c2JvT+rgy6lzmXH/sm+XbPYeS025O2+2nUtz+LMv7QSyU7zJv4dbtmS9CtJE9o0M9YD60rTO3h+vDZvfydrd4V9BYl9NCm1zpWEB/ZXM8cM7f0YG0mfA+3d85i9xYdJrJNEqOAkTiTFTryGOdoM/WK0fp2Hxhz9GiQuSWKFRJCFII0tJkeTwWqN3WSMO+dT/Qz6b4IKNKfdQpF8z+l8haLjQQhVccw3mMh5arxmPgWEBGaYui1NK2NfNhkf54hexTjT4cX7IOfI2sPzcei+OCi5yJ7MrG3hgjwexPmw8Q2lL5mFL2qdro+vUji9qsaUOZtspoEmskn7FzL7n4IWqD8oqSCYWX/8rvy7avSb2jKgBxxdOu06A/EysZDmIMxnouIaq8Nm9I0SPU7YzxlFVY0zKl7u9uQ8S6ihY/IIu/ZOnGvHb5G84HmWnZ3sZF8reLyu0/QImTkQDWn+fJNIVH24zsWVdeV1x+uzR1NJgizOO3mSR0N3/EEpZe3s/dgbbTGj6e0ZLzsZo1LPZCoJTJIsLkkgaSxzXRkk6B2vSZje5qkObWax25lJDQkSrOvyEhIkCO5Ej+11SbzG68rjtZ3qtQOJ1xtDK/TmdFIvUvZJ9sbGH1CsKnF7dBOsOwLSA6XE7wWDwA6ag5HSwziLtLQ1Qouy3k9kz/nhzCpp+TSzuMhjUSP7kFlkfRKtFfbwbagVOSVJIZySKDvpVWKhS2nC4iQI5J7+4lSVUVT3KJNSQm3vGoW0LdokcZ25Z6OzIXFdr16vUWwZhzqqR7HZn/N9BtXjSB+h2HH+TNfhiZ3n37xmhzzrinadnSaJird53cm+c2WvxF54rGs965xlr9M6u04WtkWudd2JJLnyulfigT2RNF9/kMp9Ve/snVzxaLSSfdCUdbW54rVHko2WO89s+9CdmqHRu5AkJy4JXFyBJMyyU0gy1rnC2I09k3r0q4FYpI596Mw/dCYX4jVERpK1CWSsMCJvrstrgy7xDMk4qr84q0yti9GkStIfem7XTh5IDezFmUI2ljMEtipKgITBPfRt4QjzefLt1COtXTZr3sdBcFCIOLPPPm60tPieIKGHEEJ3ZstzcEu5L+f1L7Neb1/8KEwTnDoV6smOk6YMn+LE4zbPVa7PE+qBZGGSYMb+zApqUKNWugZqmM/uoVCKeYK6UMlt+WFJsMmP6Kysx9FaraHO+Tg5n1ndna/+aqWLtj/2SE43Go3ZScLG/gnhuj+v29kkaZImiSiBJBHZV5K9kn0nse9k/+R1/8FKkid5SL0+EEkl6VcSPUSb7JU8e/88diSVoKr9t91772X/Qwa72Mxo7zxP8siOGdehnTtPL0mckOQ+F5EEEqxT+phKUEmReM3NEKNpl1FDmzUEEpaEJsgiCdIuMaVhlv3PzEvQM/IcSA/WRslMj177RD8D/Wx9vlLqYk4c6OKYxhburjq6yYYkkERRntK2L81euZEwCB1jKOf4GCS3NBrPByHz3nRmhJbGDDKDIlTSyJp0pDeNrCG/vvZCo2fWmuFXkAjLZVeSVrVO/I5Kdjibmwd5bIvPZ9XvuniQmH6YVXuUoqqw6ws6BTs1qsTL2yQ5pQYxn0WCSVxnkrxgPm5MzXBq1Oj+4lTkI7spw0lFe7k/ySOf1cOYRNK/vI3tubJ7X0mb6kiS30mT7EQa9Rr2jvcPPD6MiCSRpmmSaGJtS5Ld3mEj+yckEm9bXVdl/zw8W+0keYbS3PuHLe7EzE6S+w+WZ3p9JlwJifdJvCZYJNAEuRNDgvGd57GbTqczPzNS02Rm5voqEtaZYCu5nQoNxNvgSrJVBb2TDBLTXmGLzIEVSEJ3Nj1EURXPRnbR/qDXfEm11+e0HLquiAuCJD2U+2onfB5fD4QykmhLynxoRB7vGgjyo0lLkPUKDvLpJWIQbomjQc7XjL6y/sa6vX1w9lVzlWtfpUZxJdfamgRJYn1eJjI6EDiQmKwgfrh1Ssn72J+Trhq1nF2jlhqkG8lxDZSE+UwhRRLmY8oLpkTWYzj9pYbSyY7c9hk1OkM5QyppTvYTXU+0B/XapOn+7F89srPZ61n7zpU7yV6brJMkRiRNKiad/Aub19/Jb+38Ll1X0txP7+x7Z3uwt723Vl5nvDZLkitse6NNY6oZufftediyKT2KZZBIEJKwTpIwkoSVnYaRYF33QBJjem9ztIYe/XloY9SMS2ZIkCSSkBYJhEVJ0mi+Z55SibE6bFWD78fe1XrNHkQhD3SqkLY5J4WYzENYWZ5b9wUFSWAgpbx9W4IM+EYs+jAE9XZK0DeSPCZvMyNUjbctkUoEUZwkdK6UtS0vU5Yo+TTa8rK/zbJ22FX6Pr16o7ttk9iInggd8tircXHrVR88FFe7xj0Rlhnrs0eaUa7bKCVqFEeVv7ieqaQDc62HKfE6MD0r8cPcoZTTb9QoNe4c1/2xQruW5M7+2eyuR++tijKOTDSju3vvYHvdSa4ku8md7KaxNmmPdVnXupZzXV17bVmuruzM3/sn+97XetbDYxOvO9HQjGmn1H3dOXOF7dnT/ZO2KHo/6e2Zbe+dneHQttY5M5Kc3uYzlre5vKYsrkClmS5749FQejNPe8wx0/Z5Jj1nppmxkpAEd50IiYVA4r6yU/mMWjXHPuw0Rqkhgro8SMa09/YayBMtnaqhu+u5pFQSNdt029oLZ7opKBrC/C0e9w1wiLRibgWSc5h5SVgTH8hdcA97ixJCvj68D75xL8jjITOVfBgRujw+pJK+UHkZv/9/v35+fY8F+qtOPb5OiNckTvJKoC754Lmqgw5UQ4KVIGHO3DWrRqOaMtM1tnpTQ86oIrGpZFFDqNlPMF0DiZdTkguRrIP583TrlOoafeCcepKZUANmjrH/DfvxI7JvuVKvM2Mcc0iTvIR4Gx8+Wdnuy7JzNmIneX6yV5I82Vsf2JVtSyJJmiRqqKL/dqb3bjynzab92oGdtKT38/zY7CM9jNFo17lcJLl8mCTLJckVtIlFEm8T9EyMkVDuyyBmJs3POBT6ZRaBIIK8dZ8kKdJFKYnRns9Ah/HtCiJF7u1hZ5B/xmgS1Ppv0rZrMzeJKinPfpTXSu7z/GBoPfE+ZNKm9AB0J3yWuA+jPFiGnEn5PV4bohEiM3JBSD5NnDy3RWZm90tbHHnO45HO+vc8W7/r4wIgZeR6SVRld3stMxL2C1dPHsoPE0pcl3BPuCGjJreqUacHW2qU6h5sPVw7RbFc08nNWtYzdcQ1STEfk/irGdvMk9812ugeldP9VcO2n51O6x5j072DvZmLcz0/uXLHWUq9Jk2T3ea10f1i/xvs1Y05vG6vrdDoEZonkSQkmKHQtPduu6/bs8Ogu8lmDkWRe888P+ykLWZa9/6GK0m8j9zXLCJxQoNFApGUNUnnQTq0d6ikUGvmaDIz7axHrkCwciGK+6psr8miQVrYpznQDCLxmgwpNB1T2cEeb9tNu9aLwilIMWcKat2nf5ppkSqI2DBvV+BAOf0DYEBIfDt4SruGfMyncbWEGzLjvMwadIKW1+EgpWj0IOT5foUGeRsS1zdZ8/v/ZsOfBXGBH0gBJCnNiTao15OGaLbexXC/1q13E0iYl9exkMDJUh2lBtTY6UHpouYz2zWwH45S4+Y8opmI14FzSfIjJWJs7a2/So2SPifsx/7s7yftX/TYM4nJzl/19hmy793eV5PQQr0Ok4QmjZ1kr8yRnSZNo0mPvMp7r1O0Ju2PvfadxPPz7Pzw7L1/tEmTOQzVJr03P9jnV7pjhhJdf9Ah1xXv8/b2NskOkVhnXAlEQp1XmGPSQBmSmpF0PSOdGUd5JvGakEQkQsMONGVfpTIHi3gbr98NbZoZ+s83ekxjxbQUsa6FlEKneciBxuxsKDmU6f7KbCoRQjKm0YHSo58azK24HwyKLOvegWgL+toHcRwucSKI/GgohDSkziyf5nDKvJG1N1x9CQ3+kj9a+7Oi9fmPo0J7yF5bJVFN4iSRRtfvPIv2eestHp+FFd0Skekvjn+bqkcNFTXtUV1laMgZFNWuJ/dUQ+LH85kquZAk+zE9U3JBIvcqWc9uPTq9hho1GqXWz/Pz3LsqKYxo0jQHbY0Hz73v3Xv33m1rnWuHFI05inqdMF5HoVqa0q5znUuuO+fae+94v38Y/ZojDYxR2vTHOcyxtf3KDDTSfrdcCCdCwoJIEthJY7nSeJsEva97S5vODLnnoTEaWTMjmWOOplYSIglLkCAJCRHxvQWSUadsLc3Qb/E+NPeO15iDK/QvjZfE0OVaeeazpaHj4VBti1BaMfVXbYREck0ocOg5vNP/lfkovphxBu34uSdZtK2hs2eWxzRSJMrrvM0evYgygwYyQ8uaX1/1hZZ/0MufJe9xRGlk85xNzu/NjteEU5r+wsxzWreIz30r12dgubnPDRMRKuYzR6pw1gemCtKF6oUaSRyyHhOtL0mUqZLARDAhuTCJZf2B2a49ahxJ0suzf7w+jmnag0mNOZp9KJv9bI9nj+012bmS7PuR5J+7f29rv9Q6qz+urv21dpfzfrr2rN37SXaSeJ4H+2fTjb3zSgda2vaOZ5ln7S3dmWP0KK3cgktend4mLK9JXEgCK1dsRFKs5GSIt73zzCGdefM9c/T6Um1nVnJyJcFKQiIS67pia5MsEiWDlQQTGbWaPC9phlWDJlor0B20YkrsF72ZO9CaLdhUOKrNF7JxIaRqKX3P275kjtmAEVt8PU9e2X6jsOhyIzjO+xaKU40Z8mGOaElID/fioFFwWy96QF9acl8zQflX/6f+rOkyX/0wrY22z0420zS1f0dyQl9/WOg8H6nCpVjmdIc41lyPSW4Itk5XmTlVR7//7dpeZmJ7vdM1Q494ed5MSLwO1mM+M/EXIzIKplQPVBX9svfu3jEM6X2Kwv4ZTXey790trb1t296czwlP15NzIU7tT677rOz17J8t2fuRPPbP3vZ+jNdWXvfRtmbsaVXlftL+8Hi7G8modtr0u15zSRII8rq4kKReU1jU+yQsSbymHdN+b89cSSG90WxjmrGu6/IaSP6gJBDf8hkImgRN8K3DSJNR3Z79iKARqMxorzxmqyK5TiSunTzM59ilk5pmoKvwBzWa7jCXJF7348elLaUcsPkovpyZSqumyRmkEZWsSa5lzeu2PXpKSvk4ShEn+fzsKXllTxT6IvMf+PBn0d+wDFxCkufLa074RKX2i8e9a+vupb9+WL8UGu7Vv6zbD2cykYWZsI1yrVHKTFM1Gqd2K0VaHertFCQHKrlMEtKkzx/XKdcLZvQKocwkOqMOw3kwx866fp617VuettqjqmOuY5JqPt7stTX2j5299rP3Zi9ve3ieH7tPc3RvpX+V7iZJ6w/CjKHHROmRtrmf8bBr9t7tPmZGj7ZHo4W4IvE+r8h12juJ1yTBupL8SrVJsa6E2ZJg3ObY81VjTGJmdmaOmX7NLNfymmAFEUgW0q3pdOWBBOvZMkb1GZbLa5PQ2qFNYuhCj8TQrHO5EruKVpOdUz1aqljZDkn8gaJj/rU7Sc4TCbujLU8O5dg3BiSu+8Z49Nbbt26EPJ+PIy3UOXUfhKyXl2055DEI8vqKhOREWQ+1iL7Stzriv/HHG39WdeVycXq6701NEn7/vq615Xe9JrGQ6/toqi86LmLfIsidez0nl3g9/fVZyaUXdo24JmVwRooayd1Kjyyo0XFN4igSt2s6MR+mZ+bFDxPGoeoUjbqm/MGSs197mf08P9g/573vnXvr63R3ZrNL3u9DdFtH5suczWeTVD6TfUcqPTTNTtI8hxlvh1Yr99Wv9vesh3/o6YVIknEwmqbl17POlcirjyP45VxIYPKKZSfeJjBWNvQrGUivhx6doZPMrznEHKNfM+sSrymS7JDgzkbSr4jl2oPKeN2FCGzbaz8DS5yUgVXTVgzxPiiEPR3otCqZaF0Xz8Boe3n/ksq39eXYnIwfbm/4dkZFViNfhhzJLER5bvN4WRvyOrfkffRQjfxsAyF76uvx5HX8PU7+LHv/NwDdwYiicZEGniSPhYbu+rUaV3D/Mr0OzpA4kjaznkkSJMZmqEFlsEsUpdNV49S7iqqgBvMxXRPXCtazSfww8cOVq3idhvV3kW5x6Bx2jkG/sMvshed5suvn+XvnSA9FvdagmMD0MHqYyYj9A/Vhp1NtVds0rd5Pb+zxY6PX12Q3ydBj95X5dd2SY0TiT+b19porSSAJ1rkk8Zq0xjpzJ5CMGZr+GppkSHIP0jJNjCsJkrASSINckCLNInOoJqYXGa8N1inbluyMunqhHaYkDzRoeB4SL+muZ0r2VhWeLV6m3Ke8NqzOK3vZaL8+GxtfQOLbgaeednwOFgpCX7K2ZB609JWgHyDhEI0KbRhCL5LMUl6974tUG3/hX6v8s64rBzqlyAVp7drJLkm8nah728O9fljwXPq75zF1IOxnenmnyfQXU2b0WxVp9uOMVrihnM9ESej9JOvZUKEh2cezSeRCssK0KHInl2sSbe24rPyBr5Y5zJhJaHokGwrP86yn927a++q9m5ai7YE2J28cavpXO2hr2hz9ag93rvvJLPvn+Xn2T82m3dnJNo/NUE2P9SyIi7SJP5tkeRZXkqCjBIsriY2kM0xcNcwkA2n/IftijxnNMtMmmHTm14i3Ia46IyGSFRK0s0g7JV6XxmgT2kuCynhdnaF/lR5JBtkZmvmlhwSjxGM+2TaJmlbmLhLllMagKu1cIWsr3TQnyRnb2EabLa6+0UCW+p2fmJflEnkdKqjyaY1aLHtFnoMbkezJY87MbGuEvkZ8Q/g77/xZ+O6fBZ7m0k7Sej3LpG9ape5f5N6/biLs9cP77XEzubupmGXiyE1bzwxxXdj0QI3uwYwe6lSa2p+V9jK5oZLzTCS3Ro39vZ5D04nXJ9GYzwwk4nV85vM6hsGZ9mhyDHPMwU7avXe7d9ibedZsHs+y72xt0bY/D3fytH9n33Z+9t/Zd56fq/l5WpO1mb3XMfZstiTN3pgZ+0C1925/mZnrikte/ckkd67lglwoerRJKTuQSM0xx+qVa0GTMSM3Y46m0Mwzc2TG0Mzxy5UQSSR3BKGSdZJoElzJ5GgbtARVb1c6ptFRsnugCeU22uLF2473sc92KKKeKV6GYrxuMWgd9srm7m+3rlkHP37ww1X4ci+85JwKfbVQ6H4ha6QtBPlW49ryshTlcEHQovAwa6x3yZ73cZ4P0Vec3/+//7Oyi3ovaBpkN0Wjk/TUSeN1XlFo7F9boZDkQcci7rCj57PkJnKzXOOa0abqhj3SVfbwOmpQ42hVhKqhRkxIvJ5P7vmY/l8MWQ/Ts+IvRzQJuX7G9ev8mZ2mqtUZDubSJrvp3tnsbcMc++fhZ68z4fnZzxye5/nxrONhs5/J2D/dsbctX2mzv5o/mJqZcYwelbRNv+1xqhJJ4sPIq+VtXr1PErJIEm+TMLNcmQeaeM13oW2h+Xb+yO4cpLFmEq8JqRN5JVmJBjKWQHsYzZIESdDliod+prRrL2+LphlbPoPKMojnpekHCVTYjmUj1JZGEjbkymWxl27ddMGxAbwBWXwpQcGyPXLtUrL3Sw9taZDH+sr5tGW/RPZxkrxuuNF4n9BWtGTti6z/H3+W/vK/9zrMeYSZJDTJhSRBtZl34UIL6uq+mso9n6297Mm6Q8U1JhKLntTvkkKVUTXmr6NU6bd29nOeWYqkL3QyC9JxrfMrmEgiAiHWA1OSyPInEyrntcy1eL7P++Gr+VJtGJ2ZOeZJ2jZJ26/af+/k+arPrbGPYG872272/dWvnd3j2bGbjDls432Ppm9//0PDVByTpE3iw8hby9u8wpBXskjSZyBJqaydYiSFdfU2Dzte28wc2oyQmjVNIAmyzhWCyDeSIMlyNU9VGIsdSD87o6cN1ZhavSBSryvQRJMU2gzMxERspDHPOcruICde+pK9IjaETfcXnaZn/BhzK4mrACGenmy2UQj5if36okE+TQmCtiRHI1HkMZ+GoGTmsXHQhRoeQsNZu37///7P2vbd33Zq65NkqxGvk+1t++Fgtb6hR8Lq791fEDmqLtkP1o0WzJiQG0JNlVSN0iu1x+4opVI4n1o9oKSHl8lyrST0qN3JekzPfBXXlpN4vcibeB+kcZnrmIH9a9+7laR61OuYowPDHMZcZh+Ts4w9aY/JPrJnjJnZutfMHD2GortJ0353xmnFRSJJG382JIn1LLbkSsJFSBJYSANNd+P1lh1I0jGjO5gj6cxLdI1mpo6kpjOX1ySs63biSlVuiNdYl0C3jLnb5JxNpEfpFVRreiSX/dKgWbmcCP3M/HpoPuNtwp7ncEpT9ZwPR78LT/Y23haErERFT8s5mBXzWRg29xK265qhNte+OTnBSWPtDTqSQjckMiN3ZiPoXTTyPlqihJP9Wt435O918WftF95kIhiJiKUyEoxE66zGtWGfdTfq9nJm/dkRfRTtNiWhshyJ3AjWYyKuyXpWiBqKlTKcjDJqJLXOsL9XqEGU1236i+vBbpieKblDvE6O5TqTxF9dXibaSkwYZ9YZq2elTb/61b/q/RSTzc5hH1RUj55MrvRoHJNDU02r33tZM/MsLkeJJJGczsvHeXufy8klyeXjSILFmVfvw2Dt7zSQBDP96rfX7Myg7c1omaTp/BpJIEESkuQPkAQSSBZCSTrsH/7OxzHwdFd0pzJDVuZ5VDLzJoRalr0EW5GJkj8wdTdU3H2qYcNStGukkEsWs+YPULV+T//5v/7Dl+PbMVAhvyJfbjwGQemQnl4HxeG87dCJrEW43kVmyOlCy5nDomjI8hEycPnZsOZ4E8InKQHSBiYkApAEYBjTJqfV/JweEHpz5zZd67zLdg5VftjmD7JEFiQJ5Da7erRi/t2jao70u4aS23FwalSrdF+KJBuVJLeXiRQHkdypeB2B+Zjy2su+QDgTibfHEDh7zzm6dvvdfedp7+1oSKZ9c/So3htqXRP9viwcQ8RJJFfavPrzeY/lfZJ4u5Uk0cW1kxivkRRW2mO8tjrMcWOmaWbmIFmeaXePqcyxnp/JFS5JkJwQr8lCklYSmgTSmj4rcUwHlySwd+aruuNZIlDfTlZtLFtB1cbrVrS509YWh9Fscc895aWHUQqQEBj1yhu3bGfZPoUx5klUd79+lRmu3EN+trY2Lp0bay2Pd5La9gRRIplZkxxp7AvObekiGaQYRLwQrfsLrw1XAxAJQCKBUgggzVMR/b7Pu1LviSotR+8+z7wML2/zmQg6+zyWwJ3bfEwvs5gyPTNVRumRGlVbhS6d2zlV858zVGpI4Gz7H6ZrOgn0fuf8jYl4FddcF8xn8azvlcTLsHyYK0maRC7kM64VOBnDXuevYOb0M7my5vy+1uBaPo4rUolL3voXJ5EkLM51ruvKe/aQSpL+xnq49vJhm9/BypWY00hSdO4msL8G2rRj7DgY7czs6ddAgrVvRCKSLKQPkkGgxFB9jWNr2j7dWSLjdcVrG7TdD1VlqSooS6za3E3pi13uo6YzrRKt9OQFpnyeUfL2hdLH+mMSlhnnGGamU86v3wcdzoeXx3vRmY3ZiJOWoo66Je8b5SLI2zhHA6G2clFCtxS9LOzR4fDEztqjfgKNCQEEsIgNGKVCgNmtUluz3/vXacSNes8nJjqXOmKT2/XGjCCuK8/0ej1LmCVphnrDGbq/1Kikvsqo+X1yj0J3ckOyHpMe6Djrc+aTJPMxFUkk8eME64+1nvksz/xenUjuN/EvTSJnRN7K5BK5XMlFihx1JYIrb68IIf5sPoi8JWFd6/SajPFhI5JhIUl2zCDaeL2Ty+tOkzFpmszMJM3MDGHyM20dU/2KWa5k5spryXWmItEEkkDC907mRat+rTK27ctpzAuC5k50ixqs69cXFInidsxWvK703FWwlQQKUxVMNdHBUQgBJkNCC4XawkizdoyPg/HiVdf3EkrJiTukUPKYGUVDSSdylZ9s6ZA9j+f5Gsh19qQFxyGREBJBj8VXHhDrb/Va8l3dAIYoeJwTmkUItphe9jhKjZ6oW6vAeiYlzQkclWC364YWiRmzlB+u9alpVFSNSo7z1O/qUAh6qLH6rXsg7WXH8roC7ZpEjf1Mgk5yQRIJ5Hadj0mSVMifuPw7jBCX9wlJVIgk/t3m3Yg0SaxrMQb52MeValjnEkmgkCb9Yp33jteh3vdY5695rkMY5qu5n1+2fR1zjbQz80sC8brOhH7mSsrtWhqvjUW8pgkekrH63deMR5MxjQTW5mHvlOpV7Eqkyk8WSyO73K2aUOjzVDUjOF3EWwUCCUcrP4QXaMp7uO+ZX9bXo1523v26X7/KzGMQ4ggijfM6L3PStxDRk4iCJFxLI5RDhYisS5wgZB/UIGoQXL5i/T8IzhjnWQSMaZ1DMwnYp1HlhnqnfgfJ3e/L/uM8s5EetmCWeNltimvuYMU18bKZRQyUVsOORHXt7txVo4rz96xqKmnYp777QCF5UUU6UpxSo0g6/mpiZcGaz1o4V85Ekgj5lD+XxP/J58/kXZJIkibJ7U9XkvjTSZoklnON5A+SmMtukzQzzEr3Zqik7ZgmtwfzlWRMtYOp3WMqrVpJggjiSriSQu6QhCKanaAttCuZgWSoO479Sai1Y5Bhi5vnIQlbqnKh4jV14dR4W/xB56e9lmhVAz2ZDaSEBDQJFLqyemy8YZlx7xivbG+3X7JlbYQueX6Yaang7lDWGK8jgjjrZS9kZtbXxyXP4aC6UkSQknTClQfACGD1OgheEggoApaB0CxxrelaadcpUymtGzuHqbiTfh/dHIT0l2a2RouQ6RoOEn6rpKuMi/NnPzv9pQxJo+zTo6IHlfjheuYz27U7tGsk2Z9YzyxFkkhwBJJE1j/j7bmcFpdEIpG3kk+RP5V3QYJo3ksk95X7tM51Lq+DiKR56+PsvHpdrrxnQxIfrnMl1+OYrUnq7R027BatpD/PjLSZrQnTJF6TxJbcEEhyI9fQvC5KiVEeuo5NHe9gNO0M9vU8aKCpPmwxWvnUsmtFRMnduqBmOecur1tym2ICuUoAsiCa8LYXDhH3A+vcwZpBafXul1pCcuXlkhSHIIJkPTN5mVQhhcxzitEgSpKQtN3yGL36NCUlEZevGIPb/ACLppIAxgKP89xibofJoajZunDH8Tooo9ev/yqpWw9mcpu5IangDNeZ25EsSG4LS+0MFZRuPQ5b68EhOUMNyewvKEmXa9LW9/SyU+3HMzPOY+GZpKRza1JeR5IrEri8ngviZLnWmZfkzpW3cl9pJJFEWKd1rriWE+fyYSJvr3gNNnkLybJXsuP0cTTM6DrXTpKHkSTjtUk6XpMeg0jWYyftHKPtMT9zrZxeE2Mlt83VQBCuYYrRJANBPVYwlOk8rdM6TW7nr2rG0M+1w5XUa9UPu39VNdSu26jqvER2p5qdIn3qdMOw028GyEC4tiHZgM39+HIM1UvW/hJZUw5xPSSKQvI6nBnRpRZ5W5I48nlwZodDDboSHQqZUQl6gxjGlc81Cli9PhKiuhBaEyqaRTO5u9gfS1Fvgd6rtKq7b+x3j55QuWAfs9JQQ2MKIQJZkLgmZpXR7x5lNN3U/N5NFfWiqshCKzpR7JGtzzOpgSRBudZIrAeml4mERvl4kyaSuNZO/NlruZZr+fhcznWt7de1OJcLNly5hGRfeZX483kPsxDJTn1YSZsElq0J4zUxBknWs+bQJmVoO2vshjnGyJhfowmSBK4gVyKapMuWqH7xfS2h1QSLSGaoMC+N09ao9p+FqinsPBC70juwVSFR5Jw2SG1F1FdrBbdx7m6ovSQkkMA8tLR9YdAqfkCXvSxmzOslxBqosRdOFEEuspbb9lo+LOd0i9DBebxID1EQCUnqS/IYynMViIWROlwxDrc+Q1RP46wWiSqHhUCr6nEQB6paM/c/bke9c9FeHtS7dUM4o6MHFSzJjdyu81n+atZjVkqPUnpsqDG7h1aS7lFj48TLIgkce5zvhKkhL6GZ9R+URZj1TNce6SRK1J/OxcifPSM0krRJXEk+XbeIRJNIGkTiw/0umvcw1osrOzyGMSJJvY3cO0mGNpqE0nvfbEiMgfRnr713BjOVZCxpkYTCDfU2M2tHUygLCbSmakszE41QT0yrZKB/NV5Tb3tT1YGYMWWRXCpJ/mBqvJbc8y2tWblHlSHYjQaBEYzbl/KWA9Pw5QyMDDNq3XfMcOe5hLpKgsvrUxKpZDaqIUibrCGU/dwiuCTZzyGRBOflQUhKbxFXvtVIYPU7qJaKnYQYNlDwPEMPyE3JfVKo7Vo7JiRal3TOZ3a9yU1xR58hNz04TNcWrCn/epHEQsSwdXoUOnqc54y0axn9RpX93adToxo5ani51+qHXRXXtNx+mEjWd4KajzOYSPRI0jQS/24jccbrSTAJIv7kJvFhIsnk7bD2ci5oXjcMJE2TYqxzJdcNQ7OPSWaQ3Hlg2qYzRpt+2+boYcY0SWdmXQlEvK4kSBDu52CLQrq2vmrjdTWJgUj0Ya/Pi26D9on3GW30ftiVQAObLS/UfrVCUyU9p9rrRh+j9ZvKldAv8/dIyUtpc5IZg2EbzMK6zrxCte04Q/KYe/B1yCJNeZ/ncEIXlJcpcjTelnUcmS0XMsuRtGUGvTrJosMVY3HrM4wIZSgbEEioUhehL27Om/hX0+96e7mbCT30KpQzUJVQO3oqFdcefR4zEZJAsqiQO4hsNYfqoVT1oEbVHN1qdJH0mwMzPRT0O0dQtaXPP86f6WV0JwrKyzorifM3TuscfzIkkWrQvFNvQ32cgQgmIVX5kDIqY0Gu7iSpt0PkdQYz+dUkO4GhmvE6ol1jI+lBD0nLemaksbX9GjPLlZyQJLiThCRIkn2tJDtokpIe+hcZWNmeB82BZ5NgZV6DSD59SQztN2oLrSzPZnUSVOnuKRIpkauKsMut53QjFDlEEmAIpaXrgMCAuY5vx9RLvWbeIkihkURFixDivmg7B73D0XdBPaALCVq6cZW1OpRIZuhQCg0iiWGUEL2eid9qNLD63QYF6q1ZEtiSQYt63eku2svb8uNjP++zFP1uqVTBeU69q27X8hVTXdhGYLqW63zWYyK36/xOqU13iqHTPdQ2+t1Go3Q7hRrr10o1Revjxz0Su+l2TacTJX5Y2UnC1Z9keFhOjBDSkPfyViIfdpJENAnJHIGWrHNhKh/zjD/ZNAkDXbKTwYNpmrYDTe8ks400G6NtZzE07Z6ZqWNqSeJtAkkgV5CEda6E0SSsvROlTbBaGfZOJZ2yLqdxzBMfW02Gpj+ZmSbJqPTxWnGhttyYFlS5ddbrFuaovgVLdV8tuwANYVEOJVvmaryNfJxjvPY5M0FR1nOUx+QyeyhrEXdCRX7wRkuiBOdOWfOFBiWP1RCE46mkCiIFES5fMR63PisAEQWPSBFYYgLrVm+pNNsxn3OJ17W/TVRuVMn5nM98ZuXSmcGsjte3M2UlQhLsZQYJYlZgbN41qBpSRtWw9ReKMnKpPfaT6XVJ0heKRDLvZ2vXriSVThPq4JEQciUJif6n61o4FyfWaaDK2v70jHUuzuW04FrXuu7P606S9vJ6jQ9jJ2kIwvduk+30tm3CYKp3GAxNTEvSn3MW2hYHScwvJE4kCdZ5Q1JCh1U7Q3RYW7xtMNaZ6WXkUxyfFaOyWdSTOI0W7tRrh+o6lx2JJC/SeG4vi3nqp8OuJHs/o73bhSDFPPspDxRaxr67Fd/PS6c1E/kyKS4k5VTkMS+3DxPncNte1syCvKyGazAOoYgqTtYKwkY0UzynjMnV60HAoACMeAMGhLlZWnF72THRlReYHPUuh35DMEvS/dVjapjJRSJMl2sWLdM1yQ1J1Ix6d2qUkj6jqKnTKTVKdb97OJ+9q7+Xv5iXyuuTljBF05CISgbb20FiwrXyeoVrbdd6EW9D51w517WSa9li3zuvAjEwIgb5k17Lfd1X7x77xxDSNnMYRvXe92BUv9IN03Y959hpihyqnfk1jiaQBNaZBGogWee6kg1JqCs1NkUtYlASzOPO+jgGzSO0CCR3HrXtGBJvG+JaVbkx5W0l59yDVZFrr5rba7LVlxARO2ebUvpSZcC2MWYjPo6ZmdzDuPaQ7DmOCIfkCG35KHnOWtt+co5lD/Ud+TCEOLmv7KUvhJwM2pm4/DwcFVt9QgjYtC4ICIJumD36TVo3dTO7R+l2vMy/KgRRpKz5c6kaRSEHR4vrfcxGe52b+W2mvQ4SzFLpUdSQ7h7YKrpHCZXWDPT5nqIVqiQJdRwVkvN9M5/jdUVIIo2pPz1eh8T+uVaSJpM0ifbYd588QSJ6+BdP2nxc1EC+2ffVhzFeE22ZMtJ7f2fDjKTNjEGbYzHTmjFJNK11OtqeSOI1V4LoH4hIlougEpadeI2UdiHGa4PWHdaS/DbNT4VK0yor0ApEUcmMllXhnClGbJE/MPSqCPVAT5gmEonlUkLd0tLFGD+AQYj7wUDqshPKvZOWrNnPyyhrZqOWcyNFo6TchrwOcuc5nLRFkZdddGYPCBJi+HWNy9X7oQAujgQwJsFIcVPzmbRGz6Zj3ai315X9OK65KSW73wcq4hrnz5T7Urkxnz3IhSD5V5AkAhnnYY7qd1SVmigHKT1qVFFDJ5xBd+U+Q5dUUUm8rE1J0i1W/OXf6JcmCWnHnxyvNbDHn5zDx2UikUjSpv3yWu/XufZ3XiXb+xFtqpkDpqt1zjH7qCY7DJWk/Zk99KtmjmmOaWcWX225SLy9ryWNJJDcXDRoa+VMDH3JWGfP3cRrW8O6EwZSRdtkCJQloXrktzc3k9YwX9S6DwqdLdye8VrCPREtFyqRXMmVvbaWp0DJJpljvAEjSRgfGK9iqV1iVcjLaFQE0XJIDdwlj5kJXV7mMdG7dILbZnnMPhrpa96Qp66ZQg5fdGRsn8TfbsAACjBMEJrl9eq3VnG3ektN1+oXc/9jNpp2rf0P03OK3N1Ntfd5Zlp6SLT+7Xt5GYklMv3l8yTr2VQlKKOT88SoYaY771JqkPybMuiZ7/3PrKEoJOn08LIGUvv73Nm3q/Qv5tCDkSDNn5Ye2UmiaaSRSJtEKolQ6s93us6VNqkx2GaINE3idaT3vvffyQzSNpmZQZPWL69tSpn0QNeZpOM1Cazk4qJJSO5gpwmS+WHr2LJJKRobjTAqYiCJofpiNTGOZwvdDSU9lTBeq5J2zDSpErep7peKeBSENtUXCSRL2svJ6kHcGsPm8zCsnhQNip6IthtrSDkO0eKQ/cUeJyRkreVCiKxZr0ZRCaet5Tk5L0MEnRi+n7G5ej1HKSYYLDBDSHjZx3XePVzbyyyN0tSb9JgUmqJLzmMqldvLWaNnj9i06C+No70Ox3rmi0hgPsFUuns0RVleb/V26apKpwc1VA1JVvRAqaFybeKg6oA4vyP7zl57eQ7rpOr9DII5vA6C+DDeDgwqWdpk30l26sOOyU6ykxrDoGnXPB7DThPvmyTtLLTJLqVH2pn5NSM5T+QVy5UISQK5T6hSEXOeyQ5tJEEle2x9iaFrN46tY/yKY3/ivKG2DC+xijJfZpLcmGe+UCSnqzFVK3LXYEzZ0cIIpNxKoDtBwrANG8T3M0PZpu13B+X7xC1ZKI8hTi/OPdRA1jyHZB9CQxEkz8nhiBFOSHDbmlSrefjVo4PV3wPuRQMrAUeb0CU3tv3H0k3qUvafVVpF+o1653RTqvvth202dYIu196Q+7AT1/yLxrqzHpIJFT9OwnyOcUbrUkMSzf6YnXR/KajuNLWqVFX1SJ/OxctKi+6cDJuB/YMeSdMm26252nUuXLqcOuvUd5XqOperWXHd2b33HXt+JU6vw2Y20iRhhqK9d9s73hY7fWbM0LTHzGLMFjNzdOw0HYsvTQiJ15UrF2kSksj3KE2CNLEkD9q/OkOtJmxoYrRZex/KNo7VYEsK1fe1bU1U6G3vNjUzCIdWTU8V61Z0WO7Z+k932tvSWNnE7lZ0/y9aoOwNF7bZiF956mmeZlHOohIlaCCUKyI4DCkuojweXGg7zgk9dIUrz3F0o8wiXI48htNFLZVhCPICjvG5g3tgG8CAi2Aa5/lf1Jt091t1th7tEoh/5VbcpOpdbpw3dLNV9bDqmUoaVfT8ZoZ23Tqs5A6CYD1MiMBkRVn12SP/jiqqUqcH9k97JD16eJn06NFDGahh/TqfXt1VzugqmK/2SDbZ/ywMnsOfzpWr18okjTSVSCIiV4MIc8D2OsNO2yRN0mQOZl5G1s56np/nZx4z2jQtauZIujDHVnkdc80c7Zhf50rSFnn1mkRciNfofZIklNQae2dsrfZQLXmwW6HoZ+J9Btq+zeh3Uy3J2zExXvP96EGM16n1nO55aCru/jJN7xR97jl3Xz06NiLBSq4S6HsIg8CwAfRLM0G9mOTb9LWHksKpDqdwoyDk8yKS1PKcNTIzQypkDTVCREpIMgvOGgvj8E4jhJ24M5hJMmADAoyVNFWj32di9pt+a5x9yinXpOvtvCucoSika5zh/GkTNeJa86NNFTSVO5jPusX1DlaSmRBJvExiltqRVCk1VCfOqPnskkqUa9GjO+/j5Tayn/lk9qih1tADxiTjSypp4+28KTPGE5iTHh7sZ4/u5W3LNmg0aRrjGMbAzFhXku/rTjMzx7C/0qSHGah+3dc9PNukbTMMk3yl1jyROCGJtyvX7ZLmVcgNEZQkWukBDWbTRTKGEoN+J16bhFJ/jc+/kUHpw+42M4jcz8nWeBnpPM6tf5u1hdNPFSpF7vPMjfma37WXBCIXP32fbk3O6UgYsC9b4qqbGRRWa/OjmWct8vbITAShvI+SM0OE61L24uS5or5Dy8sIwREhyJqffCUZo4fvqY7TsiCAYkMVYKIaudHwr0BJD/VmP5PG7Tojp9PKu2sOqB4cqqpbYA+YldyNcExONC3CWoQtkBDXyHqmqrw7GadG0dLpoc5nV6fTlBpqqNEt4ajh7DofOd+5v88Z78sMgpmk+XgqCdJIRKLSv5RskYZEXqmZo1Ebo03Sv7O7f+31HGY2qezMDIaqth22oenGmDZtY6bLlSQCCalkXXFGikST3DZNojQZC1vZ7aA/S6Xxtkd+l3XdPMNGIO1fzhun7/jQb0VFHq+Jt23nq9s2XjeYu7q7RxWmSjOYECK0rJrTtG6yyrbBBpDYfCkNLMv2dtGqY2lEZN64Ohzy8ih70RN5zMvoa97Ih3cpdWYPdZ31rIesiRRnLUQSkl92yyhhp90RFVuSTfECgT6P6W5FO9rmXAihaz5ZranO0VTM/+ybRQ3ayy11etQgN40cTHK7hmY+ZgjCWSY5t5fJLZD5ZBSzjGqBUqPGOYbzsT/b90r0ixq6nIjqrxqF2rX167qbM7HOUmOGKcPU62RoapQKESKdIzLHMKOGIWRMvpLv6w6eNTOOORjSJNqZOeagkubu+fMsU2k7c9jV9JjBOib5qrd59XpfK4FkoMk6l0sbSBIs2fkDqGMMeuXqoCRov7foHLql0XrCx1A1Sm+IJLRJMkrrMYxY7L19CeUPTnumfftbxa2LF9RHxYuw7smtX2/nZAsu3Iuv5SXlXC9BpFzzmIP6JoRCA1chdEQ3pJFE47ngRDmRtasvWaP69rUGeR8hr3t0dFIvKeP00NQqCuOoHgxGQu1n5+53qdwO5lOnUdxo2CnqTQ/9LtVM16ILUnzNpiqdakgwpWmth3BUSJN42esJS8iLhdmxQhmlu9Wosj86PbrHeWbVrOjuQVOuiX53Trcxh43n+Sbteee8cyWao1FMdY45qqjXaTHeDsxXqXU19773apFnnfbYj9dJm520mZl6jWja2zwzl0a6y4hOWjPryUq6c854TRHWlTjJlQSSLFSTZ4RCV7Kp1zC6dmbMYZN2UKfE2zaD59KPD01TVN6X+SwZp11oGsNLM54n3s9WGiUnakibp9svaysh6azUqe7ub3Ml3gLwBhCbze0GhKjy7GYGGpLYioNw5HGkxKFC8vKctQRnnpl7ImvEljxfykwcJeV1VCPSCCnDdL7f+ZHC6l6dptPRMIwixRgcJ0z0G8nt9b/QHN0D9b4npUrjuK6LGnpo193mM+G+nCKNKbkdHDl/Y6W+RIis+7AySWKJeBkiit+l0+82HOUY/VUZTp4aNf6DlWrdRZdSo0aN9Cs9Sr9m2w7m8Lp/nvW47Xtn5eydfXz/68olua87zjvZt33v3LnuzpFonjXPD/uAOdhHpUmbmBkft8nv5k4HnkN2YkcPJl9Nau0xvXLBSa7kj4SQO/GaeE2Sf9SJnWRDmkxXNHvsSpuwzmwxlCg0+oO+JGMUm20JA8/9dp5QuvbjxevotJb9d7wv+QOtxuuG+1BMM0vFay4G+5x8ad+mZWPYbBBbYsMGBBJ4PTknJSzWebQcRS2EDLIftCUhldny4XFaslfhvI3IzMvDjTwfjkNtidD38VKOsXryYHyaQFUdqINotRr6v9R8VqpdW/dhRlDv2HrCgXqX1qPIek70RZx2vRsHQX+lt+rGrvRXhP0szMfKTch+xDUy79xEEq8jYT+WUd7ojBo1Os75+zQKNY6R7qFHj4pmxtBQe31lstlex3TmMOcxhnkO4Vkzmxnz/GSYxzwHhh5zzIy2ifS9GToYRtZu72c961kz+5i2SWuM0bapmZlFkri8TyDkTrymiYjGelChg8Zo7BTtX8lAT/3c6WOTpt5+Xw+qyfaalZ2hUWgf4aNdQeLeYWtgSPo1z+PJ82ZL+phhmnJraryWkY1OkFhbuXW36LYE5oIBma/Fg6I0GyEodJQTgqBxOodkbUmcx0T2WlK3ISQz6FtJT424rCH7USqUENdhQYrOfzNeV78ZFpgX7FnYYL/7vO+FmjUaJXcP15P2MrcuzdRv6o0c7M/+NQdK3BdH+tCQirvVcFxnIzVIWFjJ7RpxmmD6YSKWa7Ky/jhUEkUNNdRIzXdHjxpOfs6fw3mOpFIaYybDHHOYL5ppkiayj+5j9jFHzTFDMQc97DWHHmMObTXSpAlmOoiYzPSraZJ7Nz2ZMdtO2q9hDDQtfs2MXJF4H0l+Y4mEkCQIknWe6E68NrGUhCoJ2qWyYx8qMVNpv2P0JUaLFquTQL83RfvSOPYeTglmzIRZzp2gkljroakq55ip7tYoW5dcHeu1cne3r9bfGWXfXCX5K/3BpleLQWjdc+Yxe/fgyCi6SNYUCqeHpBFtJ8/14DnkBnkulYaQyHqorzVEDA9XRsz20ThbsgCCiUUSqHe9vdzv7cftunvMRiEUgnk5pLSqsb9SUHccbQ/c89fURenhGqfPM7suB4lgVpIg4k5EEjNeRl6wHt7OQ+2q0enukRpq1CHSp7/SDs5nV308IUmIHqNzeD/MIXP0kEj20bydrzZJtEeaadLWMV+M12EzvnqMtMnXfc6ssc2xn2MqbbqPcXTMaNN2TCyuoyGByCssufLvgyRBaNNb2EmIRGNdJInX7gbtkqTYmsTbRTDSNt6uxkvVed+fj2OYIv0XWzLe9iss5GGTmrtdU4IK1nzb22b2SiRXYtnN0fVtGemqx9UXie8l2w/eXqMR64zkR7uWy+PJx1F5jJHspzzWKEKDvD4k9fUYTs4aRfJY0Ykbj0H+jjH7It6qDEPFqFIxjiiU6H4zm6bdF2bmMzWlvM6ZrpXcx+vcyzVSrS+SmzOqRqlo9FDzmc8U7WWF8zFJXKPOHYnle3mma+KH1TPJeijHqNQ7Ff1Vqo6xQ6q7daI8v55fmF33k0a0qRoTdA7FzIEyjAPDeG2POcb7NJFMk8xxX/1hzHhsuts0Sc3BTJomaY/5da7z1/PTrzQtQt56u64kl14i3jbJQkmhSX3nXCSbKom3ax82VFszkFbCpp9ba2i20U2Kkg6slP7jSB6nMWOMxMKO1wnF8wNVBXdN95uoKu1ll7WVb3d/m1yGOhjYIPGtLoAxwk4ISnJf0ng8bqRSSy3BKZHQ2UNBRD7sJI8twvnBq7aZUnHjK49tQcfldxo1rD6YfpoXWBBgmv0ur7vPfnZaK900U073oEo42O/nNP0m1Yez6bsPSjHuphphut7dX+yhRoIppLuV5KYXEnFNiZdZEdckQVBIYv1ZP1d9th6to3NDVTFq1Kj1te8cw1w/4+1e8Yz8upoeSY8KpW0zbdoc06RppXUkTdt7pzr6i2eZs0/Zu5o2SY+BYYp+ZZhjfp5fw5VjtzPjNa/eLrnuBBeS/JZIYp1cJJE3M2PXTtiqTY1Z57do0FaPQa09UlqRoN/n2l77VxOj5I12m5qp6lBJMgNtscnDHinOPUOHlbiNhibzKb+OjdK0bkxO1TnnYG73V4Aeg83DzLp+KKXbKiFCUOkLoUSeLzITkr0KlYiWClc4HNfmOg4REkSNt+F8UlU0P5Vxe/heOCoEUIWMqB79fpEeUP7lWu+WsNnvoN7k5jwzNY52vTvYNTBLqeFOobc4jUNUR9rL4zxm3OgiOV+uM3cnDilJXMNKXJMILIjIvUopk5QENXSOHjXGHJo2nyntnmM27MNez3rmZ/9k7LX7MwfjeH5Mr+OXeX6yfx6/nsUcDPZ6fsZ8bXo0raN7MDPGa5ukrZlfz6/ZM3nVIlxJ4n1yJzkhr38QSnqfltck2mgSvjfN1hEpw0IaHyahih5oezQJ0/5rsmFTtPrEsd/BvPCOVcF8GcQsiP2wM2Y576NRG/7g1OhvINQECZbdTU5352rGU365NyB/oasxgGl+DRQFRVZBOT98QlC0dR7j0KsvZD+Zx2DMiyRrUGayhg6FgyDryXOCd3u3kcNhweM32xjJMANopB2zWiivN+iVIXwYIzUmZ0oS2XtGsqOlDVubdu/lRBKpt08kOJF62UmbcN5X0nr9nSRI8iRBkAiSSLgEOXe8EVeOxrnM8dCk6THyyRjDOCZzNMxXY5o8ql/2z7bNcNhezjlmHIOtn+aYwzTapFteO0d7zMxBjxnTpPQrzZiu8fxyR47Oe0h8mSd7QZok3lZy5/SaV0IS1l52EuyQzEHXJpnxtgnK99XEeA2G/hBDSaPo73OmkiSFlsTrbCJSJcepKlPZIkyXBhiSp+eUj0IHCMmylsjy5Xydl2t1+/X+wvjGQHjkfh15PLJecMiN2loiIa8zI0Q43ca9Wg8Sst8Voji4Ued11n2+P5Z6XwzfBB+VRu9bg3QwsXSeDnLuwobyej/JH0NDutWZ/WKaYmdIrmZMmiQbkyTb2n6nrcDeO/Yup7RJmmmfJN3OX09SUiRpvSZXCjmtmyT3O3c8V5BzH5bkypFy/ppzjuFIkzTRYzD22Adz9GB6mNmrB81Xr0Szv5L2+kq/2taVNu3XHBmGw55hjHG0I02bY6SdWfvXs57ZriTuG/d9klNk4p1sIlziwzTJDWmSeE3T+7S6k14okWTGt4s0Xks6Xrv2DA/aZhR39pXttaElvc2H5E65dh4cOkHWVsndVEd/VeR2PCNrNAKO/1CAwnDUFAjv3ln2XjjOcda5rQrVxMz4frxLbL9+IY0iyGPyOvRUCJU0HGeGQuf5zO3I7ISWCCczM8hjnFSLit0uQWTR3rrXN+P3wlsNcgCgDcBG4f6ck0KjIC4qI7bumbbb+bivtkyLMpy3E4YqPBK2MWkTQXZcCc4a2hwYSaSuJCSQBE5ypQnid4IIcufOcz+XL5NEXN52JMlRcy2ezMwxR/WrafpXqRjDHOboMccMg2HMzBxj5jDBuI4xx4wcxjCJpvlKj6QDM37N9TPVtF9NvA0hR8fH/b7fifO8Ql5ZXhNMI1L1GsOoUpi/JW3DtpHU67pW44EdMV6q433itdZ6tibSaPLY6A6q125ynz5V04fsuk8z5a0geo4KMFyHrJAElrw2zrE4zruLr0VNz/GDMxBPO3uq7EuiEdTImXmMg4Mt5cMhLSEzFHSlblCj/HAjM0mNc//sY6I89FCy98FwrxHEG5N+2UxAsOggR6I/i1IV89OFRI85ZBfDRpMEe0hy1Wsa2YzuhhOVYlPnJBdOOkdRSPYl+/vKa4O8UifrSgg5F0v+zr1J7pO3ERHE2y1xHeUYw5zrMahmql9p04o2TTRjotFDe8wxLUe/Ms2XNF/TNF9pjmnmmFnzzC/HkCTXV5v+AWZwyXuJ0ydJeglukWSTJsLihCuhRJIu5yKJF1vbTC2XzHP4sMlAl508gyJBJXe20bYpfbl3oDtoLf2926GH1/mdrzP5Kf0VKhyqpl+k8L+CTYEDyZwBSNYs8rKzfB3OgbXaPIv2nHWfywwFtePPK2/DqThreY6gJ/KYmaSl8VhbnGvkMfNChOzX1haOdNmPsESXMy/sc07c8I2N4rc2QuAYiohxuD/GyZMoDSU2NYX4cKv0wp40CTzz3NfakFTLXJJgI03q7UjKpvIqbSvNg71Okyiat+LsO/u+kzTkeEecJsleznV6H3kXCCrXvpI0CVzL6RfPmoehUxxz9NB+TQ+VOtLmmPTA0GE9hl87a2DYkrRJYB64REgT4vRxvZOEmxs5lUo/s657LxppokgCZWvytNCkvlguFbb3ifdtMk8PmjapVm9jDtPzr0yNuNN5dkuPKkTy0xmkA1Ut5X2JsIVZ421tgjniWqZLMSFAgey9l3lY52utw43yy6SjbwaebXvN23EkruzX1xq8ebzoQop0I6GjZFYXkecga+f1ieDIfoWsKfplD5Z8Gfm6jsndaRw/weyapRtj0wB2jKWYN4zwWlNi2l0qLq+/E+xz/I5dWkm9Pk2dRZI22yZN9/cuJJUqs5u97DJtwietvG7YfaVIsp1fjysiEb+TJgc3kitJzuXESxK5kk//4uSrEpHrvpI41zFc6/x1zDW/mGN2Y23TxTDzjJ/BtW9x9FzXdeWtOP35JLnyinh93EkT3BU5Skh+EonXLRLaSoNlL5IYWk3HfLVry6t6bRJoF/FaW3y4MpzoIZlDyHWeKE25tNdn79KlR9pr1RRsrdy6qnqQguccFcJtJnAgIclE78JxTh2n79lFFakiI74c5kX1giV7lHRyp4HMe8pzzuusQV5H5P3d5XL0kHkSjdtwPaGcQ5qukbAdhXKfPrp905HEa+PAO+4RRC5GreBJRfsL+xP7PgtJUmzZLYy8QrZdWmh9/Hw7O6SJ97vJXtnLaTRpJeXJjss++N00tPKei+R+34dj8/tuktvbjSS5EvEn81YSEa+DFzidSZpcK8mOy7Gpv6oSSa4cTdIkQc70dC7En4186MMF1538fSfOE/lbhED0zbmSS3Z+Q/OZVi27SRpKJWHo4krNU5RklC7JzuVtpPOmK5nH1jQJKulitjbRmsTj0IkfdjxzjvG+wt1MN2wVDILSAz0IGm6zGGEvx/GFlaSLpiFpX44Z4bVZphDyHGemC4206Qm1HDrJYwgR5PmW5+DIY4zroIeZjg7y8rCQz4t9FhJ7v8tY/v5PnB+w0cxmE4ZejCtbVVAvVXZcJDtFSYKnZ1vxNm1our8vbyQvHSTZ7j3aJlTR132uU9FkyCZNEq87aeJ9juxNcieCCDJJIp/+ZFxhOX0c3iRB/NnA6TVcpFIqPq5/acQVkT8/8eF6Sa5cgVvupEkCQZImebuKhsRGEsnClh5eQyKls/ayrwT2V2kbRpdTvJa8zqH9dmV7DqjxPr+ghwx0kn42Rzfq0h32fB4VUVLc55waMq3gts8BGp/CDBBuJ8OAdc6585yz1rtLoUpVIur3ftcj9Nb2fB01WrhvVB+gJyqc7G0EeZVIoVHIHvJYXJ57KB+WdYnqSI9Si6N+471GE7/xgs0zs40zmxT3s8zbN0e8qKXpHc/alUBSr5OddTKQKn16rU1JP8SZnWtt5XcTFNuRtnaYatKqIkm6vWYnCpWkgbib951IfB3JyyXeJs2V+1qud+8jifzZz8i1Xv6dXxKRECERIf5sxToj67rz+kf+/UteIojQwn/lfrMPSSSJqrSawUJ3AhUVKdY+kTEPu6TxNsvODrZSr53MkcCuJGOUlaDNTsYbP7VrUK5Rnv04U1pSVRyM17a4z5QfKGfRk1mBJCSJNJPH6+ugvk6517PQSPx6zMykXFsDoRFkRgR52ZZoifta6+k2ynk8yXP2iI5TPs2emaiW0OMQej3lDOvpwz3NeL7wVkbAhs3+tJnzpG9OvJiTEYUqCnvs752kTKIYV3aFmggquRaXen2OwEOvvZyQNrEpJNmLa52dSdM0xoyktpJN0miR3EnieL2T3EmTxIYkEXnjw2SvfHLldnqNPx8h/6cUIiQi8WcTluu+3Ffen4j4DKe8pULyk7w3YamQKCI16dq6JA1qa5Imau1vyI7xtuq10trMGEi9XzHoVhlvc6fPo9TbEj/suBZJYe+Tjc3vTah5ahBVyz3zA4eCQOcnBAhhBQFt1vly3KX+LlShKfHbQ2GT9s0kIUSZt+yZR5y3eRlKNNZK5Adb9lAJUiFC9js4WfOceV+zJ/lYWHLP9zam/+L3FwJm9SBLt6LmXuZt7PZxql5Pnxhp7J6QnIq8eu3Ozm5fSGgZ3ZLtbSJeB01adhQjoVq/k2Rfss/VJKp1zJHE7fT0Gn8yaSQq3ifh3HeSayUJl6xzXfV+naj4sD6Mt+tknda5rtuVLCFJSHyc5Mrlio/TJGnf8kf9Vy7IOYNKE9O1T2kSqlWRQSmxs+s1pEkoS8nlfZpQurKrBpKg0hj7Fo1BtfMo3TrqVNNJPQ4CY4sbirBViZuCcitxTRiGAREA1zmn3tPvXeXXkfhv8fLE2gShhVyeM8/nQUQkL+PGQbR0S4QrIs5j3kdcY837cq4bexxh/WjHDd90VPFaOAsdABtsTC2YxVwMUZSqSYNqdpKq/H6SXSS7r0ajLVOe3mexkzTQJGrrOiVtfDiPnXAtZ5FXbYtJWkr+fv8tIY753SStpvDcVwV5owfkTZItbBIhV8m1IglJrtwizhXXzU7uc129k5xZkivNleS6r+Xf7+WPeHvl2jvyIYaGoJL5r0Ah1p1AnSbpmIVIxsdtmxi+91LJVq9FaPm1vzUDpW0Y+NY9h9dKRtXay1n9K3YZyO1lS1CDas/cZzrJVpVanD5d42U/lXJmCqbnnMMQSLJIiGYmD5yX8mW5e1NK/8qvx8zgkZyjyrWHlLeFkkZUXlbWlhOHhIu8zhqEjkilkdwSHddSd5dEoijCjQc959pbx/W/GNff//ACQB3mcp9xF+G18m3yzMmKXl6zkx0Yl6Bjqjac64Qm1PA8T1zfp3ZGWtSWJFxlZLd5YUyys5NdzGhjvJ0mTdpbuZOkiWO3SSDeT5LzvoLQd/n30EkkiCufCBclYq83SYTEucj+8Zo/wuU1IUikkoTPSHxYkaj7upP2/EexQbI5oiTZJO+LpZI0pTvSpj2UdS6V7GTGSyRpvK5eZ+J9EsxgRQJVTRS6633SA5qUlk6P8sN0scdzohwU9jY/haaq7pNUWhtvJSAAQ4hgPS1ty5d71lbaL0Oif2XwUu2mdurJB6LI3kCXT3sxkxCUl5kRkbSsEZGz35jZS0neBokTouoJsj5Gz36418jiA79hGBSYxQRzRlDURECqxRRGiMpVaafShM2zs1UraSnSK3ExTJpQSFNs5vAHjabtZvCZvexvzqFpmsZx2OTe+yl/+LnTJOLLTDZhw7kkOROZDEX8yQhJIioQRCRCQpDkM7KJfIqIRFJ+EYgkIlpJk1iu5ESIXGlCHaOSwWPLptkPI6gMDN+2Xj28zpdK2gxl7TvxcdTDUEuueFv5rbTWtbw2CUN1LKVFFaVI6jP3fhLXlmT/wDHeTpWck9p8NQyaIYSUZCZhKRT69qVrdRrqF0V8bMRA5bHsRGTl2xBt+TA39A6J8mmkEKFoi/IYOsiLqM4eR04tBNljBX3oEbHxb++M7QuvYBPwoOC+E7NUey3IOVkVndGXVmEnpJCkm/P5g/uikCSlm519XzAzSTZFk2Tf3Z1Kg0ewm6RJih0Yk7a+niQsXJOmSUT1mCOR2Mi2UebgCnkTUQhE5SX5Rd4QCYkkiDkSkfjttz9Z8SakTbJ+3ZwLoZvKK23PkqTvG+90K7lhi2iTFLXshIwxHa8J47U38Xi0ImlGYbl2UCWtih53rmew1UBZGb0kCce1kirIcW3pkm5TTdrCqh8alh5ID8BkRaxooLSlnLWkqoomKIlnQ1x6bKl+F3JPbTNzkFNL0kIjoUFQSIIgeTwzZLZEqdwoedlT6OA8RkeyJiyh57Z5/s6/Zxxd/MX/bt0INrfW1EUiFGouY6wmZoxpUm/3fSrqNbBz5yyMBMY2CReMJI3Xx5hDLhjSpGnZW3cEanttklSc5tzxfi6HILup1yREiLd7uRZX4j7vM0nkJRJIPpNAIJAQiYZERD7zLiTrunduybVwnsiFkEiSXwbihyZJH8S+Y17OG6k0M7S+9yI+0wxkkzTeL5LEaw9JvJ22TWHQxPuVh33QJMxE0wY7GahS1ckzMZ1JVUmrelpVInZL/AGqETREVkhCiBaah9JntYc2+XtMmigk6sMzMpSK7Ew+JueNlo/z+pI1lucjZBYpvCiV51DR8kUa2s6eTxvZc1rO5YaVnvN/aoS/Fn6kOFbhw1qPq6nw4UQgR1PjbWJjsu/rZSSJwqQuhTZBeZId3QwjTVS7NUGcGGYmZSNJdkL1rOcykzRUG1M5Fem59q9z7XpfxNtEkpDkU3xcnCs9WackIUiakUREJiFoqKxzxXXvO5E/8o+CvbwtJJXsJFGvjSaR9H31ud7sndR09SSIRocuWySxg6p+SmYoa6/d5Hl8mBhaa9+HgYokhqkkQUN93GWmms+iIFLPdBw5j5cHj7nVopXXY6q09jpbBRCAkIXmKW0X0NNna52vVUULSTwrv8iExFiTr5OgOETUw4yLsudHQ56jEm0vc2TPmpDnkJZrayQclBkRLdGz6GVfx7+5+Ks/xb7/X/T9TfOsiujrLpj3qJfyeu9dPIkPk7TYT3NRTJPglL27tmolQdFmlzNaNJXP4veVRHfWWRPyCpvpH+wIdin6O02kcZ5kk0/735zOKhIJ0vo4ZZLJqys5XeeKa3l7LVfXuTgXe0HOG87fXdSfvzZ2AknsvIdWVbdI5DdPa4tkN3wURXPsb3TtLOSVh3aXJOlQVrcGz9+QVwNdLrb9ognasuKcoZ9tTOelmcfzr/rZeK2W7me7nmyFdB7mOY1Gef0DpRuToAIJ1wyaCaXvOSmQdcA5Hkj7byZKpd7OaybXqM31jkMN8vYgMw0tdVuRohopfSVrcTl7GlnvkPeFW4zLcyXnbiGUXFsk9/yT/77Zn+SXsp60Expulr/w3rc5sm9/N2Pe48GVdAaDRPdx+oP7QpmnaRRJ9jqr5JXObL9Seo4iSVqFJKp7nQwzTVSrkaTZBraM06SqTlOZJMh/vLq/cSZh0rypPz2BSISE5hOX14Yg+1ra7BX1mt0kruQzSU/ySxBsSohoMvkty7nOZV/d16bR1yhE2tSX9b1FdjJ9UO1flcQYuLX/abYPq8b7Js1AaevD753tbcXbWNc3lCTet3hMJKcodNe0t/5sjSpJVI23/VxVU5BFTshKUCiF4w3lDFCqZytKficPs5AWLRVSL/cyizymDZEwKs85a17n87zN3h3lJGuFszbOjC6NNc5t6LVvRY/cS8+/c/An+mUsZoh535etYLhINu5bsk+4kg8ksSHJlaYH02Rja9IroaRJo5WmesJAUm2p7J0r2+uYvJKq4fNJ7mxtn+x/cRlNmjTtlsLWZlKHva8F5zrJ6yQ0jY+LIqTHlkReTTJJkPD8JHaSeJsSr0HeNCVN0iS/wyonTdIYZhhVQhMYbT172acr2+sYIokxhna5snmGltrJMNr29sDWaiamjax4nyS/oWkSb9Mww5BOT6Yc2HTCg+TAVnm9lX7HInlJWJD5mcE9tIUOUxmjUESnfodEVYkd2d+u+Zj06VLUOHtdBKcQ1fa2cRp7uGi5LYi8PLhlbyPP6UvH4UZmiDyR5Mw1f+ff1v6p9gTzX8rGr4dBu4y55CSiUZ5s23Y29WGaxlXO9WgwWrWjzHB5HRONXd3Zt7PBzLRFYCO51l67iiRpol4HSVLB3WJmzGsS4s+XEbHvfdv9dg7SA0lKQqAoDKpUi3otogeUJoiIfDYySZDEmrNZcWWVNInXUUqrTZMUeuSRJHa8rVaTwKBZiXpfiaRF28zX+DgSr/3LdxL27NrPMI3MctKUDAND6pmPs5Jtc3Sj5kqy0UbknvuZaq/B6kgCIQMMydO3fftSw/wE8KPoDupTJIGpYBmS0hc/nrVGuW9+sK+WxF10yEyIIAQhkUJLSMJx8jb0AIkg5DE9PVEv9FDqP7L6k/1S5oaAO+9EbK8TzyFPqsDz7GyXh/vqO0zqw6ep8jupbrbsZkdbkjYoT5LrvqJHjzmaJGIX9k7b2jBISJTpB+km2Pa5ng9MtJJo7e21UDEH8ela2cu58OiR+5RIEkkk7Zc/W/E2XttICJKIiIxYXrO/bXulVyo7KTMabUnaSIZx/ux/+t3vTbzuIrup1kAtr5Ey3dAnQVvuwTm0SWKqJXcKG20PyGe6YPRzJ8YMI8lMnPLDhHrmI1CkktzjqYZ4LaXl8jYKM3l6pSecN+ek4G0iHZRfR2bNmqVk7Q5Kr1zzZVTQDRWCqO3cmUGM5+y5peW58TIfVvLYqzyWHJkRJbqgoOe49nr/1vJfQn+6XbhsdvA670eepANmjjRJVWvozn7mPM82RYdJsvfL7rSpVpISNSb7/o+9zuyEbPowydbCSEVpt/JcKSdU0ySbaLWQpvHlei7jMKaOOurjYl6kT+ZIc+2Qz/N7r/3NXpzLaZ3Ix/c1kaQJ/W2OdRlZc9JZe7G/idj75dm7Tc2GQo9qenwmYaaOfa7Wu7LpJgxF6TCHUuu0aHY2tmi1geqRlcAgM4zmJfVxE+M17RoqO8kwo0NjPYtke53mYZ+ELbpbipnT3VRGq9oQ7AJmBlrgLY9JZj/G7IfbKL/OI6UKivQ7ilg6kBUOpczkOTPS5QfbakTWtnvxcUvoTl+kGgmX9W7cXUk9kHH2rLMnRPo7/67en/D/5u8ZQ05lm1ZTPgzmkBLbkMA5mjE6XtNgDuevy9tJEtqOM/ve1YY2acXGmb1wQZO02SfDQ5K99vf5fTKFJlWo4+Z436yy14kecyCvTTOt1/pwhkmk/urxqadNFLtrr91l3z6u13PZKz7ekWSOXRGaMAf1vpC0HVIzmnj2l7TurIR5+fJNMxgvi203gzaSRjPQrOvOjtewM4dBPptZ3iZNTQfR5fTaYXgzyf2MR2SjW6dLnU283AncZ6pvv9zdjTZ5iWRQuL4EKEFg21ybrkJ9SCKoiYKdUc0415kSCiJBZg+cODO9SCozj0VPKI1Q0nFe5jFvb8k1yGP2PBayyfxZUcjZ++/7k/6NJsUwmHfsPIn4wIRnckprQ7OzOefeiZrBSLRw3blKdf9BIl432flUb9t627zl9DpIUG+T7HavXXTQNEmgFCNJyiXO5dSjPhzjM0S8LRSdIiREKpNkjggJibh2pGnSHluSK80vjAf7mEEPtCKJNGn6uz6uR79ZQrbjtL7O63i7lLw1063IDEZJ/pkYSiqJ8T6xqm/E6AG5L6+pMJjpIXFy4TpsdPDMRxJIJ0qVWQ2rDZUrmCsJi//VDitvW3pIs7f5vEEoHwMxq0r5PNFzz+cqweXFY0/yNj0gHwah8j5CPj4kyo3kzHCEzDw2uhvrua9r5dr7h/9q+6fdhZ/yPyBnXgz3pKI6fBjzD3ets0m7eUhyOclOMoyRNhHMc2/1miaNrczuslXNkUYVtrRxVqFJUqmyyySJXn0uNTMk0uoBn2lmv0T2Yq/ddRbrJPMmidA2n9G/kEIpnQlK8TAVQZ5jHwzT0gPitX9RejSpJCEdo96WWjulu0nT/G1ehips0oYa69R15drJY9g9MkJqUP3et4SpVj4TM9UmucNGuyv1mmi8JpLMDPRIYmAne9lVlajHNnOofcFznpMSutsOVRWvQbNV+4Sn7hsKZ1Vc980WSRSFPBJVnq2qeiToQ8f25ExItZUernQPoYrGD1bG1/MRVYgQGjNnrcjbLImyl2Q9ItFGsnoi/J1/e+9P/G/17zXMmzJeA6Psl4K9z5khYxjCCWeTeh127Si57rNlQyKqciUnjSFp8qK2ZN+7LYU0aUOpR15h1WgazYqGvnw9YW95/o0ecDKH1pip9ED0kPSzWq/pX4nUx1Vv67Vpe+SzSsnbz6RHesAwoxTus132gpBmfFmKNCQximr3vrMDmxaVZrxd5zq/v8bY51BbUvQLK1B0/5VJvERyP3TrZzvMAWmWs2vb29t6JxQk2KNasBGtey/6igpJAknsX3U7wAmncTlnY8Pmoyi/m3hOlJr9Q6plD1GIrC+TZD2Evp5DWd+VVPS1wI2sfSHP0ZKZCo2e9sy4HFnDeU6ea8Tt/+dP/n8t7+8E1+twMUtE+DjZP+dM2uw3ycbJM8lLmSTddh9XrtAUSdOULbnu3dbrJA1aHnhuLm29baKt10qaCC6FaZqkSRRtYYywE5JLu+9z5Zyf5/B+UEXE5JXwkKTR0EMSIRFz6GR6NJNgCGYOr11n0a79vV33SZom4VFlBduW0GSgfewlHq+7m5Am6dRrnZp4v0naDCrRxO5GerQokmTN7CFp5vB+Yu3zWSTMS8LjzCnZFDrBYyXQl46dmgTe5LJb1f1QaKq9n3N4+EVRkA9JTDWrSkMXwTq3XENytj3eKCEIFaSQxzp7X29PfvDMxg/2VS754SOUynNL49nLlmv+8q/+9Pu7f2vR/4Wrrg/nHWlQgjKPvTkhlUESr4/7ajFmTNIvoUmuz9SoIRUf9lLUpEkCRbN3vs9oKUk+1VYs6SZxcndap00m7V/C7KM5hjF4VpgjyP7bXuhlrDlbMzBjYBhve0gG81JTHR/OYXy8zlpa7LW/M9EjF01gjG2jcgiaDKrP5slpMToqupPxvrr2urLR/aYJMy2s7HjMeYjMY0apLh5oAkORxnOu53x2noFpCvM86yzXTqIetsW2R4faKySJP1lx6wL15jHyg8GfpM21/DKqVJlVrUoKQiK05J4VDt3S1lkj9TVvkxC0HfcQKTVqi6yN0FbyHL0KhZToCy2Sc4982cXf+Qf+JvD/+s+I2PqzXuqZOc9JmPD6JGw6STAk2ed+eCReZwZNbEh6tmKMZu+ynY/sRlUNSUJp95rHXtmhaJJUpdKWTbJJ0vw7z3UwDJNK8xc0MBTPoRKeSLL/ij+511471gnr7DHrZNL6sOtcnHNYdnR+zoW9Xnb2on+5IjHPJAbb22pF0zTbJmWYeqr2/xvnpb2UxqAoK01jnC12koHmiNwJmx62xhTR3GEoGcZrScw6FxIYO53xIFEKqVP1THMltpdbVCK5vAZ1zyb0l5YsureMAfMFnxOSMKtQs/Ts+By1ItdudETFvfh6jjhRZmZkzTwzr3MvvHDlMesSZ29JkcdFyGMhYRfRU/TvGv1N4b+p4L+yr+j7edcdahHJg8Le7J142tEkbOw7sKf3lXo7M0nZJdf3vs/U22mIvbHv2mujSNokn2ySSLAx0ySt6rd1fjHZRK73/VyFOZhxNPVhd/8qDNTrEMnedrqxve1e6f63Hvv7Wv0L53IlGez+2EXPNCWyJQ8Sf/B7EuNtW0pLMk0yTqeO7cOmNg29Dm1C8vizXa72QbetRxpv89I73pekYVLV2/vupjCDJmFOJHvUlMxh4Rz2VvpQY7K+XTdmPnbREnnJqidfjSmEDlrBH7YBbb5NYtasnjW7SutQ9SjX9aMVyunrvMzbIHRJHouGkJk1UshalJQPwx2FXDLDWa+WtYfr1bWcLfJX/8b8bw7+7t+2+H+QRC3m7dtBVtEZG9k5Wc86mxhGdjzP4XwmiRivSVo2kquRduvvJE0VSa59X/V+aJXS2klsawfVtEmTRtFicrzhbLXej+Zt/6p8VqiiCjXIINk/adoeYv41ehB5lc88/5D0mOwfSQ+Y5EF5GMZB623/Isg0GW+Ltq/2oa9NQ8JQ52XGUNr0TtKYoEfTJkMp2sV4jSSZ0SK5MzMvyRwzDIxi1rMk23NgvpKY5ck5rpWkeOZjxcvepa6tuZAr3uxVNUe3bg3aSkrww723tPkyyQiUUp7VRU0fo0TULYKkiAiFnlDKXm2EICFB8jJSecyHRRJkbjOy15bHIuto9xV6xD/5Tyz+JvEf/+9vsUR84yJDvzlTu15nttBUFayqqmPWYydJCQoJ9ESvKO26xbUV5vf6dTo6ZtokPpykTewqhXamTaE2tknyB2n2jb12tUcxJJFXkRStxp9ui4X1T37kOK+ONePYKdTXdawMJWleGx+WdVb+WT2S5PF+FEnaJr9H0/G6roVhilZjDvSt3mHbqCa2KvTumB6N7PizVSV/cHTX+HUhaWpglMJ9TlVV/+LqdUi4hNsME15ouf6jP3ZG/uIPOTPza/zgjLDPtZ3nrIhz+bBQjuCuSpBDy0lwir7jxvtQ8r5CcNtzG5HHCnp4juhNPozOkxYdlPOXXRv/Q81+eh23mrGN4/np/T6xVcil6nGCqipokhzOM7ujFJR0t3Yt+3slulvlv5Oko0qpPf+c8bYmSbOr3ub1Wk7rhDlMEtKXUeNtkp3NtZx0nd52OmnTaZs0ISKUQun6eu2UGvV19WReiDQJcmySaNJkyhgo7bcKaZqgra0vjVaND/OpvpNsTz0+TOLPfv/rXa9X32SMt3HvbC6SNN7PtNncnZ5R42295j75UkMGVVW3OTNDiy4VqgglQBYwzAwxLZRSJvrjj811zI7vZ1ClwuxTyLcJueSH+8raIHmbxzzWUVRx3kYQnedzImmZaXnuVWYcFwQhGmI9OYnwruvj3/0X7S2r1HGeT3h740TM3GdTpWrClLdHbVW8jRzs79VJq+bU6KSTPq3nrO8smnbtdKPGfzDJtS4tZZiUUANpc+Vcp1LTJJEWpUY7ZmTv7N1c2cLu7az6cJA0SZM2bdKgEdVGIivqT7ZsI0krTfzkdBhfF6XW1lp7/bWTJn3GMF63bEk00zBHRdalvfOcHqqEpoH2TdZmdHtNG0rTtM0e9rZ3MS8zpObyWrVeVwmZk35qYKha6eOpnzNo76sqXZxAkgkzsyAvWeWfFtLwF3+EiDGxX4xxfdnXatOHtx8u4yCzh3qIdINukVSC3IWWkB89SguCU9ZDXnZcSy3PkecQmXFEtKUh2to0nm6vEf7xP7udtYry85aAUYN5NqpK0aqmRp+I2qK2pLOcvWeVJO2HhTs0vSsr3WiopAMjTa7b1iry2qL2CTs73fF+lLxvJEXNLoWkEUVwLt0tjPczBpMmaZImkqRJ2jRJmjZJ00mCpGiqxhdTVNbu99W67s8mEoz3pW2SPWJgKJa9NMFeU0Ui6aCaT+vq/cvvx4dNfVzW+Q+hupuMt4M0WeeCmp5BbRX3kfzMDy3YKnE/6tGYmJepDSSErKxhWCFv2/SfkobZ/PEHbFlmfD/G66Vqd+zvIB8jMyWPQc48KY/Jcx7TRdYgL+tuNGw4IW8Px40IyXNI0osGqjd7qEolMQ3OX3at/N+JouRa2ZafjLd8q/Lccx92B6Gevp3cR1UpqCTYD7OSSzlFOud0nzO6qpyWtFaOjsDT0Z3uBPU6aVJhttrOSSXZ0ap6m2aimh5NMZBGutPYqZyzxM46u5xaWCeMlina0hnHwTgvtMUgRZ/7cT2a0AQmkXo79kvttj2PmZmjRVV17SXJladjtl55rYTqS1a619g0laTRqkqS5TFU02MMBkmT9TwepgaLCgIzfl1biXvmeaq76R5UbfECYWBmhrdvgXpxDmcxyLdrfDtjZlQZ122UZHWgIll7aMzkSCMaLZwIfRMyQ20hCD28TNGhojKzzUad19mf5pLHGzGIrUlOTZ5cL//u/7isVdapeq+3ov5Be4+emhmHVFl01TAc99MdqkjCPOzndMcPCzVuDe38OrdrF0ni/fbauPzZNrGjpWNfFxJXWy0KSVJpPml8vKkkkmh2upPtkr3iWhdXEqXP9aznCnGMYz37dJ9tH656rnrsk7KRJPuRdJwvPFR3fZiGOZgDPdrC0p0r8XEJ409HvxObp3Q03qdtvh9LvSYpAwOJxWYn5W1qKrnPejzzhaKqyrpHaX96SyKEHGYGRIAC/aeFMzMDfRjGDNJeGK8nXh7NbD1nfjAzHxaOooc1EfIYB3kZLTOnCPL+CPnBSKcOwr24raWNRtdYx6x20pb+19trhv/TP2uzFouqoNauvLrpb7UmVVUGU1M1h1ZJH9fkxGEyv1cnHRS6k3OZ5HxnpTVNdpKmsMlO0gttlSZNKrtsr3tf6+kKOy/teNs0bSvdUFpvBzPIv7DnShJpKkT2vc/+UqG76br3P6rJ5rhJmiYNcwyN9416DU2aMGjpSz5X9p1kH0OxQ9MkNoqGtfudh6FUnmHetMxAX9Jdb2u07X11w06ex9stAud5yttSFfe5j3qm2vsYuxUhmwSGv5l/S9sCh1AqDPhFOWd8PWaosPtaJo+ORDgkOITGlciMi5aLC1q6rMlV3HnsAeXzxkyeo82lzERmSDRE2SOPRxCM1KD5ueVzlWvnf7CZpRQWfO+l18+D6a6qmvvcJ7XLep2qgVlJx7ElWcve5nkmglKFdHTSUPt7paO7sWkauzDsO5d1eh1IMrFJYc9OsnfO214XeUNnDkkmSZoib6parbd785hhrDSkSZo1Sbo53lyS3SbJB8Yu4zis17Jjp5+RJG3yBz6uknV1abJhHpS2n7EZQwtd2Xfiw02SKCWVZU+wt0jjz7Y91slDsvN4XxX5g2k9dUNv1VZynz5TNdBIja2qxJvLrgwzU+g//SflnLITcTEfl9U3s8bT62SfHREEUeFIXPa8bSAOQQ6CvL6sQfKcRm0dCTmCkARtewVBLvKYGcfJHs5eccK0eN/181/6/63SZJuaRa3wiR7vZx4nVNVLR3eVyXlmddJeJgl7kpXkQlNJV73Q9s/K6nF5HWnsbu+Ta6dQ9Zq33V6r5ZH31/eu7yve1odpkzRvUf/SzkYXCkN3dorL+azzFnU8tFqELdOYJPHh/Jm17+zYSWfmRdNW5mgSKD20vRPvt0IzPr7P1mu1f2Un3s+MJlmwSQLzqNqCg/nXLwv36d76qR5o2KqZdFpEBKKVFdy2cbPI3vqJjblfdkY+DswLvbxjNqqLVOw7ZvR1NfYEaTx2Zoo8F3nMcz38dEIHWXQqbzt7eV+ejyI/2xQh+l9vryH+f//lfZatzuc6KyyrBNlk8uJUPXcHVeW1Vc6Z04ZuTbGTsy1zPjud7iova+juTnBQsxPqbdMjtWu8zb53u87Un2ySVIvS83keD02n2d/2OtuXejuGkaZ520aShgqqVhYp1EIPbbMlEZLWMadN0ibpgakylFbWdWffTWfG2x7aNsEkxkAhaeZvYz+GIM3uoEQSvKQqMYxpVZrOeB6P7B1siAi5TY232Sr0uc0NESNDJXKJRd6MkgQKrJg2aCVcDTZmfTkYM6Uk1br2VK4hlzz2lWtDLp82UpZUjhGJGmdNRNpqCZnJcZD1RqO45UdDISgtUVuQoNy8dS39x0IJq2r5CWsELDTdVdW3psraYH/HdVYl3Sgk52DPZ5KkqyiKKml/MVcrosUkTdqXvXlWdvY626p6v/NaaODxeDBNdvbtqrUbpV4LHcY0Qd5qkpAk0jZakaBJfmSSaNKGJk3CmEF92Ei/uboi2vD4cLfspH9lhvFn095JtNiUNkl2aVSl7RpDJJ87MDBImjHO83mSnQcPe5LeZ92lBqbV/s66UVXQBKW2Kt2RQLAq/1AKlHYvOFIJYATIjO9nzCAU9LuK6CnydVshQuMyEhWyn5eZOUVxQhR5DAq68Zz3RXnM2ogeWtLiOQqZjVTbGsGD6+k//f+/qyM+laUo6l1T02xDo6rqWFVb5XUnyYFJJ100khPsZz6sDppWSq6vsL+vQJXNaErsos1O7OZd6UxpknpTj7370AfJ9Z3dT5KrK1uhFIUx0GTqd9NpUiNt87X5nf5mfifU10WdF2uzXOvcyTTZCTb0jR0yUmN8nKzwjLdVtvRrDLRHtPdePM9ph0wyM/NuJLnPMWu3vbMfr6k2WecRz9RAftciPM9UQ5jRY3eIvuQlbGprS/mnLf2HNjNA6pvrzPp2BgZPLawZHGIlP1qD4GjjoBzcq4qQB7pQ1uTlOYgGpE2nVCR6Q7ko3tCy9zQfMoPA7OB7rqv/Fe9/pW8syvJioaJ2R17QzVRpoqo42Ds5jv0wk+Q0myQOe+/zrHRUXV53p18h2ffOa19MulNvN8NeSbJTrYaB5rWhFBsDozvZpyRp2u52nRXiXz5mMOqfHMca5y1FafK+HzsrbbKzPcv7XeptabslpR2FSL+vb4kPq5KkMVSrR5LbQyn5TDNmjgkT0sTpWTwx2BhJmhnn8/NU0Tq924Tbc/tfra0EscklEu5HUmhFIXTLBgOGDYjJt/OLmd9Rel1GtY8o8jHd1mRmppPnyExKv+xbXp6XvZBW8sMJcn40C2qZD6FI8niR2RDBe7fXFv8JSy1lfV9YqygZYauKNgytnsKJqkTKtpNkm3O7xkZJcsJ2Zj1Z/W6Kdq3upKWY51znev55+XiSJqUpe+/z4bzTfZ9tVFFomzZaNI1/6WyvaZNk39d93Xtt69JKNVAUz3quUM2z9HE/2fc+d5+r7/stiY8kkjlqoGi8ppImScMYgx6l9A46Dy0lbcJ4H/TO8LBV9t7ZXqd0aGrZy5ln7+xhD5rGOiHxNntVIXGfZ7zGEDtVux0IAnE/U9V3l/5TvYScf7364VZIrt2YUa+nJEZIQiL20FEPQd5GROPuZHZcJBxUigtpeZ+1oIcbRTLz2FPLnuNoe5uEpYFsUj2Jj11j/xnlTUWH6lU+TJMq8b5J1fMcr0nSsE8S+zHppLu068nJwd67Kp28akWNJBItW3Z215WX15Ekn+ihPtypZK/tbet1kjRJUES7XzaeUsZjMLRpsu99N/vO/RabX9n3pnc27/u97+RukzvJyGkvm/jTG7qhn5LsaMd4HTXo6+p1Jw+2RvchkZihVCvJnUAhyBzGh02TzHq83TvBYCeJ5YHsvV+W2hD3mJ9G0y1MRcvl7SRWaueZ1hppRU5GJoEbXSTx/ZjBq7ZX2UNydgpCRF9vItfDzHNfeUzmwGWGMVvqRiiCzChIkv0kQSOo7fkHBB1kHiLUsh5cZ//uv9jBe961an1an5Yl04LdGtbbRs2tb7OqIu2arHPOc+rZ0q3pLuRkuc5nJi3xFydJdnWz2WmuRNVrJ2+V2Bv12tRu7otEq9QYeW3l04eh/p2OL8ffv+9k+GD8ydlfCte1XE4LpWiL5lNe2zGjh6nSlqT3ZZFAvY9IJqHRRumq1xqvbZJgoJUMy/mcj72vJDDVpMacTrJ3vK2qQm6PKn8ymPU2McEv4vbaqFgF2ZjPvuHrwfAqL/bZtaOCfJ3vG0dxpKWBWh7vlpmU5zRO1s6fGfOYQoS87NJ2GxoRCvJ4pUSJjBQ/v95ea/wXHf8HxjhKKe01iYitiry8rZp5OCSd6No2O5kw5fskKJt9jpWzsNO51othkDSp4uS8930llQad5j0URZN4JMmVtC2lDOS1eW2iQmnbl2IrNqzzpbt6qHW64zxV8WXasCWppDNK/dmy2KvMjPPcJ6pImiSGeu1nmt7J+VJo0gMz420+E2N5sIXHa5K2w6xzZCfxNlUI93iqmu7ul6iaK0giEZJ9e3drbRqS2Vt+ufoOJHE/HRjK2+ScmZyJCh3pq8iM5DGIoHp4DkEv6sjIc0toRNUIJ7Tsh0sjWW9D22PjFlSO8zadFbl53zX3X+bt/X7PW4Tl80WEpDO1FgmGrsTxbJWko+Akh91sSesqzucknMOqZz9bp1NeZzBjkkQDG7OT+d5NwzCSpGlJxImzHubh104jbTVVrTKQt00ST1KRepu07CbaRr+d1tcRSdqKRtIkjUliGIN6kVKr+86+k539e5z7KLSkabYa47XNutr8cjoNYUs6zMxopNIkzNoPksTro9FhRk/n3ttj27qz5D43z1O01yGqqr2PxO6uVLnyPVprgoC8sgL25lYSvz6/46XXEhtHNuw7BMlaySyUvD00kvtFtKS8ThQlXMlJPTxnnj2PxR0qsufjyusYoiGCiBqkg58ZXHf/6T/PMCPfJVpWRhJI1FSVty/k5GzbtROlNuckXs7upJrC5iQ2Zj1TOvHnRxJ/svDMOhP1Z9s23dFCu70+s9K95LrPdaq1vU5bZcpAk+Zt04wmMUlokrQ5bbrpJm0wSZokjmVQrUKapJnvZDc+bA/dS0mliYFCX7Ik3jbeJgkGOrzEOlkn9t7b89AH2mady+7K3rcPG4OjZ+ZuuhlsVyWQJOLtpraupFt3R3fG2es4aQE2sEG/xbdjxky9rord8bEeESIfw4e3vViDy8zbKh0FdZ7L68wqUQSRxyTIDMoap0MQenHbKXtmcXlsTvU9199/6X/j7T3ezrzfrKzsJe+EqdLa2yIrrMdUncTZhZy1svbpknR3H2zknMSZ5rNLmqRq2BhJk9iN93N67itZp6SjpYykDRRljGFO8uHOypZRWn92KINC1fk4HcepKUPRUoqq04qwrtzMnOu093NgnHQrdtsd+Q1TlGiT3owxbLKTNNjjw0l6n96ee9v7x8OgTZL7cXrY2Xl4Ql4R95l/TzQNVUURmrgSbLL25yTxbe1qfcmgA/jFlw1GW+BPw8x4pRf27e5DRwmrFkEhKA5pHA43Lm/z+iKCRWgkerNGonwYIUh+tJTZaDkkPxpcQSPEh7fXIP/4v92vYMzbnGfL7iaS9qZl1+tSric5x1FF0kOzYX3vz65nqiFNsSGdZU/ba9OkzGAGkkgiustwJvu+pnjTjiFNmza6Y++Szfb6kPfXvW873zvRatNq6aG+rBrUaZy2DSqHSiqeq977jvPeyTO22bB/DIV89mgTczCUhqjcO2ucTlultGHGn46263xOi4ct8TBmqgeznuech73j2UN2Uix78fx424wk7OgkkVzyEquqaHRad/fIVPqCtwH2f0CS+SxuB8pG2CfyOfcu+RyZJ6KQj+tVYWkhpei4g2hp2ePUSOcSGnlMerV3QYyQD+NyWvbMtr79Zdfif+VGvi9v7+GkarmQxGvkmt0adr1in2Q++zF1OlRBkiz7mUUn3Q3blpyQZ50WniTVGR+O0SQq2N1es3NnJygMpiSR5hMNSquF0dOZ5EHSJE65tZvnfrj4tfJstI02IprQ98/lcafvO3k3uX612eRebzcdokSVtHn1Wiql7SfpvW8GSpAnyXhmvryvpknW41zsZ0vCg5Kksc45eXonCQMpzLIfewrR3u5VVdV+nWyuoOpnWr/MPG3UPbt1APxyb8QvSmbm1dHrRZOgT0S3gnQje8iVx6TFvBqEfNjZM4MoteV1npPnWtzFtTXOY+ZTaDsKHoIG+tz1+J/+8z9/hu3NyFsnv3cle+1LEKGqNLv98JyTsFQlHYFt55xYz6zHHkmfbi+Tk70veJzrbPoVWuPDSdKkqeg+O94m2UEbpaNM0zRNWrqFxIfb9nbqbZKxSTbNJk3afZN9f97J/kqku/k7Sfa5fDnGaen2YVuJpE3m8LaqJdJ19ue69//tebw/mzavA2O+0GqSWM45nY/sq0nm8Yy3YSyeua6dPI+HZ2uaYcreSfzZMVVE+iWQa6mt7dZN98AYv/ccwHuzL5LEL2teObBlZlLknpTzeJR87ClLX1xjD40g5blRRIlGo+h8mB56kpAcUWcdBV1u5GWyRp4ra5E9Hs7XJP+bfzr35xzm/db6S9feJ0uQlybZWbYfbttcYjakO6W8TM7Z5pyKktTl5ZPs/TzO51knzWv7MgPzMDMqm/2yYdIr99k0gUJLjaZJ2lSalCa0qL5RxbAfLtfF7Jr5GAw7jh9llg/KKmm2MoQkPSaRMF5bVZLPrKud5DrPh+emiGCYmWEGimRmnet8nnU6u+UZhk1JmsXjOc9kr8fbHUmHric7OzyPZglbSzdaexurbCX56u6mZ3SP2dEcc90YZH5VEkLOzK4zZyQfyzVCN0SFgqyNgo5Kw0c0ZlCcJJRezBraEqI8X3QbZSbqo/QueTAj3Hzhcm3+F/+5H26kMaPpdmZmJWFhglwqyYtqL3OSU3mOZ0pHtJdnJQ797Gfn5YvXnXh91l728mgC9TrmJG/Jpt0152O87jZN2tJClUGSYTeZpElJI2kaUjRQ1NIXq0qULVvVlsIuGRJ5O+N9mVJEs67MfSU8J/Ztq5JXH473o0mznr+f8+S0r0S2J17zdqzn2c/5pNf22u7spB2mruQ5HwYialKJ5NIISTbxM7s/HWiiuzZ9745OA8M2SDL40xbvhtfkbPWsosgZ7MUlVvKjCxJHG2emX95GXZLMOseFwsPLQ0QIEoTMkAinQVyUVAQ3frgtc3zZNfpfifzy8/1+Hw3dLbbW7ksQEtlyOo7qg42dk5zDJC8dtdlJznMctmfqjjHG2Elyheva5/kYaZNQUxivaZo2Ixr2y+npMjz3lSYk9b4+nKkhTSQxJm+bJKqV1CZJxbFBkqZtIkmTJmkyY0qHHjNF0aPR5r7uM/G6tWxsTZMGM4wxxiBJMOf5nLM8W/B4CpVgdD3PMbmzLc9LdBjrsewrwXifirIraUEgl1Dj6Pba+kgez1NVx5+XNr/uDbajZV+7O3r0Yjs+pwgr0aUjScsaRmemoC0pIR6U5/PT1ZDnhcwWOciePWVfni9CEkLjGnhynf6n/+ISP8tIPUYn+TJVEpYQ4mXnHJu9X7hmsZ7tmTpJOzZOkhzONJ/ZqQSDZyTZK17PWR5pE2J8PMzDJGkiCt14HjNk5/tMkhfy0oFqYVBsx6Fp0mSSQJokTfK7qS/bZRjHUh+2R2mb5PtyhxMGtqidShoM43VUkCbpYD3L2+z/dzbPQDQJlrPs3nnweG2STC3Ptnd4PDAvKCQXIokk2No0fXe37u60PKq8nl9ZbD7a+0agf/Frbqvt7VMhPzVdgthDXtfIY1+RPc/RETKDDqWQfmKmIIQbIhF5bCPyWLe05G2J2l7/5vla5V/95+ro54bQur/6dB9btbJrQ+J1oxLJ+fjxlpNjMp9ZqhMvt+0ka03bfnI1SSQ8PDzdyXU+Ts71rPO+8laV8X68JgnZ28eF7fVK7t37ShppXlSVqtZQo6hi6ag/XcdS52mkEKFJJq/z4+Oy1ds0uyHBmJfXMWgSr+tZNnvvJHm8HSQJ1rP26ZHAC5GEmQVXkgceH89UkVySF7FXiP2203TTOd85nfWUcxzvC7D5dUk2GIgeO4Oez9FX63M6zvxoRBpZn2Yi+3h5eR7y3I3QIkEjD6HhKHmded4e8tww+32eI/wheOWa/S/+01ycrxNMa51Xd+9W3We9SaGqyMmdvpzeqmxOEs5+TDpJlB+uZDGd61xPkpRdT3k8eX08z3We9kCbjpqX8X5Mk2iSXTuJbZPW7FFvk+3Olfu6d+J9iobSNA1KoH9CqzRJSctzN3ln33dze2YWe3G+7F2tSvPa8Tpex8cRSbLO9Vjn2uydvf/2eLw+pkkyA3ufz1w7+8QDSZoO1nOe2TsPbMM8o7tpv9yLQLJV9VNaIt1fTfd4qqqO9+dFIbH9SSBJvBhfHLZFPm4p0aWc3X5u4yhFMiOocSeyZk/BKMEJpUsez2NejhC5RfZeuERoBEGEgvN4pUT/WPybXLv/zpm1MiYk3U2OdOvcz9PexilqunZOnz4cyg9PEo5DVSXpUFvZkhM8D05JmlS9fZ6dCFyzPFNzZyelxagyMz7cCWlS6UDF5qTbPIxNu3/f2Xdy3fu+31eaGlpJG62kntXI+07yzvVc+XW/NUl8uU8m3u/ulB15hfE6NjNFwzRNc1+z8DzLa/LweLxttwTrNMuepH/nYXgGO2OY6Tqv675ie3145EkSMxHyKpHY656kW3+hr8bM3M9PnYNzqIPDU+J7AeI1BgN+d9lxrxXr25xZarEo6VN5jGRNnqNOZAY5UefxzIyC0FJEjioyM5MILgpxy+t8PCy4Tpzn//Tfldevf/ovc6ZO7W4urfVBd+vzM7UlG4WqUooydMhhs4+NnJxzntPDNZ102bYj2WfwbOscpIl63ZKdnZ29zx15nM9y3VfTpjKZwCgGw7BbOzvVoFtKoGqOMjg3pPfzh/91PZ9/SfL5lzRJJM2p86GfHQaKHUVFNTI0kc0wY2B0RnMg0mTGrMfGcy6x/+CKBwYlNNbj8aznuZrlYbw2bYYxWVeufT948ExKp7bHY4J4m+SyNdV8NbrResbz/O7jcA7H26ryq5IEvhiwWTNJhxwsUYJsNM+XSRaZHYI8H5LI/TKfSiQzIbRcyUlQZE/InhlFQZE9H1e9qiU0ZHBEfzD+IfyTcf3yL/2r5HF4dic7bf7gmm9rDmd/ng1Fjyrlukt3+nC268benBXbM6sUadiws5ME53pYj7z680/vxJ88F8+0aZMGpjVlhhkf5k+23ekWbATbxv7D10KXdfy4aloulmUPln1Rp2VDkqZNJQzGvIzXeZnDkOa+ZsziWZwPsrOTePu8SxJYzgVXu3ycJJiZrmfWtQPPsz2blqeSxMdxSbJsVXL6293adDXTMz+H7ni8r8NTVd5u2DdCvLZfroZtGCkdcrZszo6eM5R8zCXP+enyeZUis05Zyw+W05nZz6GF4sxIZcZxy3Ff2uKsKQ2ZHZc/hn9f/jNdx284o5B3GnP8yu/hnU9Pb7x57U3f+Jfe8HdCwkQLApAFoYx+kwQoAThXwPPgSNII6DDU1JhzD2extWWyKBQnLxd7O9ssj+nuerUIESHv/mSEqJqq2nqrtlilqqjdwVKLuazXHVYNa+zULlNVtVuviD8Zr8kiQSqdJN1dBw72JGclmWbQYtVU1ZZ75DY9qqYIg1JFYvM9OaqKclsgEKKREq6BBWuLd/81z1fNc3xxrJr89esN/uKPCh0Yn3MO3ipipXpzko8rFCQ4dRAaQXFIcDicuNpm7y7yPiyJPkoJ90rIc4Xsfe1FZk4pDsparVrWsjM51XtvXdM/h2b7LzXDp7+//cuT0+t67V96g9evK2tWwkrIIukCCAsGAQFOKFnoSMc+OBAkjfI61DNTPehAvT8hKNdKThZbtjPn7OM+92ztVu1WJf5sJC8igRAhara3aqu2uqqKmqra2tqqqq0/PbNVVVvYqvLLEIEI+cXCVlV9r+/Mqmer8Tjs6chJGrbXMlTtVsLd7VCqqoz3qdeQ77m1Z2sO5drQQg+aEgIECGst67XevecphyMc51afvXdm5Y8/YDGWGT84M2YX3mH11ogEibR8XDIjInv2g1LI6/ssWA4tpegob1NDZDtHXJeZGzgkQdve5TkfByJEoC2eXNtvHwzrbc3Nm36avhGvvXn96RvlT+dHzCKELCBkBcjwfaFwZiQoAVBVrfdzq6mZ4dwHIVVJiubU9jJJThLoW3MS9wm2XrewLPJCEK+RIJfXBAKBRDp0vG1v4228BhKLeLMkUFRtbVUlN8z5TNhrnaTPSWLbF1TqfdxaunnqqaohaURtSYL7OFU13hcCNAvmR5MFkAC5eRf23s5Zxzkc57Dqa5EqBLnYRd3mMDOeSEmrnZD1KG8bPewtCtJ4H1J5bISIq7Fn35Q9s9GgQchMoa9Z0MjIXdzDLbJm9nCIwqZJ1YXx5Pp+9tGsY0pISTavP3pneqdev37T106v6epKMn8DZLgGzgIIGqHScg30LefoPH7wY7FbVQSCqqoxt3NjlqSTTqGPvb0+OTllZubcp4/O3Zubk6rdn2e3Vu2b17UEG695kV8sQRbiJV6TvIu38QZ5iVWlXnerfqpZbo45sZ0TiWKPsrfyurZ2cZ84Tt+nnqpq7ZepqiXCPfPMlLdtNCSnghkl5ORDQjJsdsL6Ol/nuGcdzj3rXbs7/uKv36clZvf50ZmBgp4ws+hoPNaIG88pM5KSx9SSZW/sIQidGsiJKkTpeig60TKTtcyGHo7QWUdm95DXIY1g0iJZRMfz22ucj2cfF3sD7Rp8evqX77yWT7157c0b7dvXTxcDEBggCUCywgjBkDZcC1QSt8d92N2lG0armqqa08zH7mdWdzqppC/lZVUVM1XK2zPdZ+/Wx+Fn6v1WbdWq9adXvG5hvWbz+qv1dpGE9Vprq2zt1i/3PremcfY+6LadXHdydrk2WuQl97l1d249VVWtsYitKrL3ScqodjfE23Cdala4zVWEZAHZWfPM43Ac7z3Ol7VW8J4/cjYYM0P11RiP9C7rnHQp7yPIjGRGWfOTCQXJnsyOSn48b4uT/Gjk9ckcsl6pp6yjetGD1GWLKKcXrve3n21mEE1oo2P7/X+JT197RxdQAAcNzLqBFa4B6UiQ1QEaDqFI0pHjOLe5tt5ahtbU697m5OSZJBFpuk6rJgMzU/PMTNXYRp/WaOQ+m/vknq3a+tNbtaUWirK1v+VSa2utWpVVu7VVW7/8f/HzrNu5zw3dZzj3M/Q8nnrthONlQdPpdBLqcRyH+U5VFZphpF5J7nOY+nmqzu116MzIDHMk0ZQmyQooQCaMZq1zznHu4Xzdyz17JynWEh2OcfaEuYyRUqGyzbDHD2f2wsBZlzhp6cnJHkeyl9kvb6MuRQdXUpFC0puLFPdK9LSmr3CSiKJED+7MunRKhX77G9c8F7cTZSukITD+Zefv8YZb6JUQhpm/GYDzIUB0NIcRUAJQrv/fVaW0/oP2WlWl2Jdukpycg3kebEnSnXRysN5OE0TNj5qhcOCco8d0j5u5z61vJ+5zH/V2t3arKraqaqtKVW1V/TxVe3dyn7sjt769duumh6O3Z2qqaqqqpv3po7dcOw3lMR2ompoavyxVtbUl4abvnuI0zIueS8tDCrcJZEEWsyBZSI/PdN51ztc57jmxluZd5b894+O4Dt6Os7ykt/t7yeeiJZUQXOM5ZU3QcFt68RydmYJGQ0ecl5fng3xaqoN79bYUcpA9zwWl8ZyQlTSJlPTGtf/BNjac0DYdbSq2d3jDw6IU4OlLmb9nogABwh0hmhnoTaAX2k5VlXbcLbFbr4RmbyQ5awW2Zz6zSpGuUvYljYyMqjFVNc9UlTLFDAfj6DNobfTtJHcLN3Qi4kbf554+zTnQZ+4z9HlpVRRVU1Pzb3U3uuFPtaTTXZ5dz3xmPfbEmpopCERP7Za3ufUxU/Wgb2/zkkxNlQRCgCZAhgwwmpmnDWc6Dvd8rZp0ylmFUlZoZny7l3NfbyvqoaU+5csk6kbwASEKoiHyMqUWIrJnb6ihJVTodGg5bSF7yCE5oSTPydt7mDmOlmgpAm0MmifX//N7NJYDakalzafbv+ynssMJqy+0ZSFgFIgutyEBRpKGToFcFqHmeZ5H3ye3Dqq2yi+3bT9ycpbtOp/NM1Vt1dbutd4HmkbrmdqpmZqaeh1j6O57xuDAuacbTefuuw/nHOjbuY3TMMVUzdSv/9Nor/1H/OmV/LjKdU577rXJSZIgaIWtWpKXux1VBa011qx4XfE+EEbrAjciLwV6zrkO937d2y1RSlFVtMUY127XmdktPT09q34jLOXzIbOv173Kcxoazz2Ih7xMD9FgmZHuO2YQIXVQ0pCg4uRlhSi9oeXs4SjPQ1Fqop8fbo8APnwBQ6j1otL+yjb+M34pdl8O0LckmXVZmQwkAUgaIJLQRdw2GqZqpnpw3IeaSoJmczb7nJwk9sScd9/n7rBbtVtbW9auxU5yiNf2vqb+V5+ninnm+6iqMVWlhhpVVTNTUzX1Z2loGjoYlGF37dZWVReqHia1cPJDPxxMqdqqjuzt7VM15e3SdibSa7eqEm9DSGAmTJjR/DlJKVB5nmVxfqSh/P6cvp5jjEeKdsVa3wZLEJwZJyUUytrIxyGIUl72QlwojeyhCOVEyuwSmXnMz6aveTIPbZdoewyOmKQYivjQcfD5Ga2POLHFxeX33+lYobwQyrk8lLes+WEW4RoOlCEk0jkaBvKm29vW6qkpnjEJVXnJ1jab4iTJcXbrM+c+BLlP1G5t1W4pr+t1CdOalvbna6pMVQ01w0xVTdVUvG3vG/GnB2kodus1VRXc/dgPHOdxcrKysbdSNLZ2q6qIvQ9TPFPTTfrlta+5htkKDS0dkgHmNzMakeUCtKUvznE5e98oqhSl6hfjJ871JfaVs5kZ9OnzG1xmCCIzNw6HC9FS1gSNc0Jj5kRmkErODBElymPmmSVSn4TsRSFuzOw9PTZoMDFS57dHAv/C6mbbbDltuSAhwW/cP+bQuEDfUgqzMk8JDAHCNRAIkg5FvB0MtJpRnBsTJX3SSdOuGzsv56fq6fvsrc9p3E4Sqa2tV7VqGDHeNnkZ2us0Gdp0vG9BtPehMyEvabZq1W5tbb0Gd9+9ImZsU46T5MTroqF1Va3Xe9wGNVUz5U9Gk5barSVekogr0YLJGq3fE5LkpS1PORzrLHareh01y8ciEku3ZYYxv4ZXqZBgidSnaClpWNIhJcjMxz2shyDyYUg+yRq0RNZKTmM/kqzZo6GjIzfWhORl6ilaCRHMhidHw1eDYRmnzfwoK1QeIOwH4ll9C6VUL4WHswdIIAkJSS8kMEdVNfrlbSOo16f8cirXpCM0yim76TY1NWNym2XmPnffx+2gqra2dmu3XlehbA02tQbLWGxVkg3FMDKqGOayW2+3aqn6OYG4z33inD69t+kiOUnOicKm9rbRneQ/CJE/8PYxVdX+v1g1tZWLRgQxhMUMYVZGyUOBw9tVGljvsrdS69yq9oxnUmlfzy9zDEW9NsvaHVj2qS/WGjRkjstsNIhKD87SWPPj2TMzj6KEOwdxIR/G6czs5ywJcUKkMuO45TjqxSltqoLK2fHw/I0Zc8G2ldRYiI/WhnX69oU+BtqXtvlzRhNgBiZAIIGQQLZq0drqIYPRauqs5MzzbOqZStLpdvzFhqZ+Oao0p53Duc9N3x1BsPXL7NZWqfezpbaqPvY3tqiyVVu1tVX/r3ZrQyDxes7d3DzttTw7M1U1ExxVOE0jSbqjlIfObVRNTU11k8FoRkdtRWgSRGIkl7eD9KdPyVuAA6QQJ7N3B0qZNSkUEs++m2EGTw89ZyYSa9OyUD7NYxUuOMHh7EWC4pDQ0eHEaWmEPJ6XQV4e5NOU0CuVvCzP58MgzqXjoKwWiuiDY+KHH6r1YjOTuWgvxhi2+qxyShblhRagD3tgkoEJSQqFEDRU1ZTaRmNC++VOkvNM03xmofKy0ylbwaxuDDU1VTXPFPP0HMdpfTu3uU/kPmGTi6S24vW2tdjarT8NSYjArV/uczPH6FOeMVVTU1UlEL9uTipJd5qi6GfS6u2gG40Ji3rthPbLIN4mm8zMAG1S4LQ0Z9F6g0r1Q00fmxIplF/P4e387iWFatmZQUU+1vExjURufB6ZJSJ79kMhhDwenMeQNYeEO4VDMkO6IfuRiOu+SG7hhNQnVOSxxmMEAufbowIvXBzYtJvBAOzHDxjYmv0CtO+hUK7tjKSJkoQsEiBJvIaoqi06nSZet9kbO0nO2cfEMxUF9bqwWGa8djBVsz8zVVVmqk4rOrpvv+wEt3NzbvTes+ueuE/cc+vb+7nbfc7T96lnpuZ4Zmp+qqaqmvbascK+yA/by3rsejjz5FV7H3Q6TVRVbRMXgSSRJGLJpWpWXhf69oHCOfWC6o+0RdWseuj+EJKk/O44Z3YpjZ3N8toR+bIbxKLMEJmRuIc9axSSD0Mqj4UQVPnZIERnBlFq6JCZ8lz5sHMXhTjysg3iVmq18sKx8Q/OF6nlsP09E4Mf86VNBs7DIaalhfI0/DkaFsMwYZLFIK8dol4FYqFwcOztZOV0NmY9mCWkdqtqS630vqFDTzdNVVFVNVNT9cygHsXcz+2Zc8yj0e3cGIxCT9VUeeapeqqmpqpDTVVr8evpl2VGVXWuSheeWY/j5Jycs76z0bo12vvAVojkEjISKraqX7bcz91PcWhbt7QUQWJhr1jVVI9fdgJVvzGGGV4F9XpYJmdLRz5GIdJ4rIc7aMtlRhoXQkrI68Z+OKVflN4kUgipHoquaDyWWU8ywxHKOs7saOQxClGCoue3Rwc3tgsIdLMBiVuDAfywgbNZZF2gFEqbuQeG24i3HZFuW7UzpZaJH/Zms5GcZOXAvA8ii/r1bFbVor/G+xCabtQvp6aqpup5auapp2qmZp6pqaemZqqqaFVzo9v7hqy3Yd+oVVVbVUUpPPtxnunstbISlJct3k6EHlE7U5XQueRN4lpWyK61Va1pQ98KXkLCOnP23vhpoKb2m0lQ5XfnMihU2qq1s1KuR87cD2Xt4Qjy2Gbk82Q9s5ayXmONyGw09jivT9n7yvsob2/JmtmJlsg6MrMPoRB4coR8z2lbCQ2MdNv4VQM2zIFdmqQFDoWysnjKn6MwwBAiwgiC0FVVXXHdXu6y/XjLOecss3fHzSR3k5DftVW2VlFB2rQOy/h10zSN7tuv+2a0aAZNaBr9MvPy61K7tfW6JRFvy8NxWMn6ZnNs+wciwhhsVS2NRLxGXMQVcu1Vtbn1K4W2L5x2de9zwA8GjPnN0p3y347xdubFOx52fts3kw4WOSN07B6fZvYD522c9PB8wjhuZG9Q8hx1UQqKKGIkz6UUcS8iIpSX4SRxyIzQuENrtY6XbzenbUNDYRYEBnQx+wE/q1z9UGMIaUsfmra0kmYGIt7GL4O82qmtwC5Vfrhf2If9rKmq+Smes0Pfzt6OEOrPb5V0oJFFeryNlehh2gQNTbyWbTP0tiLltXZ3qmqrSrKIu+GeW+dZcj0nh+1arhtbe9vqfZDXPyMkCmF3I7q/Wp83FEKffcL+b2HgYr5PCup3AjM7vfKS12r97W2mIPIxHeX76imHyDzyXG57DmnLTz4peW7REXl5WY8ln4YKQktnzZGiHASRxzTK+yTWn44U5xucTrahm0tLgv2be3s/BGPwDkBL/ZbSvn1b+jRZM1KS3SRhJUILFyROJ+konHOhLva20VBV8zM1ij49aCn3iLdBauvtVm1t1U5trS01S0UFdkfkxSpTVlWVsjVVW7X1uuV9vL1N1nHW1DNPvdyUv7i3otjo9L5WVYimhQsS2V/I7lb9zFfnbt3dvmhpaMxm/4xWsQHf7F/FfzdChERFJdhZvct1b9fesnTJY2PWQZA972tESCQ0jtRCOi+vQUMNPSSNdGg5bSFZI0dJGhmyJm9vW3McLWkL4fn5SOFDNhunuTld6rqBfffwrVGTAjS9paVteWiin2cv9lp5fQlJiPbL9Ely0E6pi/LjpnWbej+KuaHjNndHWAgRQSKprapKVW3VblVtZbe2/pfZqi0EIcl9EPfczE09/buqpqoKYvvxrhfFrn02Oqr2NxF5fQlJJEIE2a0STp/ub9O+rTuUrIbN3mpIgAvm2hXpxLN+I54Jil7Yp2X2VfITl2BdyudD29eP90ATeZmEhoe8bCDReB3pAUFm4+wHjcyOk4HokEpvno/gLOV5wytHy1evcIKTS/oGJP1GXG2MsfGjvfdMGggrbtJSXoCG7traWptrr6XpyUWIFDaKnT6nYreOv9qYYUK30VVVM/VU1ezMMPdx65uHu5e73Y4/fXciELkPFiHYiLvdh/tw923w5D7hTKmnpqoe3TptWmPvH1x3c44QSScFLUKu0PTkIqwstfdccXdeb926veaScCLtLWyw2RhgCwHppPz3g+RHeaI6ajVDL+ciwibyfRAhM7Mkl1APsygfhyCiIOjQFhfKh6EjlBP0cImWBgr5vBIk8xDhEnkfhJjywjHzfGbbfPG+fN7cGtiA/eCfEXNyoOus9hROKW3n1rFbWJENQUayFBRslZOcVnEUrUWySHr8sqG99renpl6nasZM960d53h7bs4959wd9tbmOLmbu/fu5HYEjodzD8+Zen1qqmqqyut42xjYnBfHYTs65yTnpFR1SCSwIglB1u5WrXrudrQr2ptbpxlnDtt+wI/NRwvYEkL5ZUg+mP1TVeVjDzZvZ4sc6VgVjh+92F6eNRzELTlyuLiQ4lKQCMHJeZ1EZiOJDimPQUNK5lGqyOehCEsap8L4dJSGnt8eNTwFtm2zsV109Y1A/yNgYwPGhiRzdEROAPrSplD6bbTY+plVm4tkBUJ5UYpSZVc6yUn6qDJK0wxDee1Oa6O9b4Z+pubfqnqqaqbqMVPz8Dw7j9mfZ8wWzHPPMzU1xvNTT9XUM6/PTE11+2W31i8aGd2SOMfLo0jnWlQpLxvxdkJykaxVte6Tuw8d/dXf7kzpI+dKT1psgcFg2CCuG4Rk5TcfIpnpKrOolI3MjrxSzkh6WV+mOqILShoaKaSsZ+YHQ9bz2LK3NER6E4aIuI0qSV4Op6+9pTR0dKTMSJLzMtWIoMiNI+d5a62eNqeF7j4LbZAf62FzayDNzNlzTk6TrpJCx2l9Q5/9mdpdW5bIellUUQrlWqicrpmyW2PtmLDD7EV73+jWevR4be+npuiZp/pWU9pUmap5rXPoqqlpmmG+OrchaLRoaGSK1sN423ROklOq1EVR1MC+iVjZ2KqtWulzQ9NNp780YXY99TzYYGPA+4I2bEn8cgiJ7jKrapZuH7u7bx89vRCpnDm6LPsU6xpC0LjtOGtwyGxp6bwIadiz53Vm5lGUQ7dFfckeSpzObOAcEiESIpWZ0XIcxVmD9OzoeT6JYttsbEK/YAS/9VubR8D2ZWMwNuytlQ3todDo9uY+rWOrdncTElVFVSlKVSmlyqlyTdVQtVvlbQYaYYnXprX3v9Ld2p9saK/99ecbmjajxws93lAK2xZld7KlujvdJ8W2iyoUtUsRJG+wNrVVeXvr1t1003HMzCSTOZ7nuAIXfnWLvzaRMGuqmj5u6TUzRL7MDwaRXS0d5eExWUu4xomWIIqsbQgdDlEqSEshuDKPIM8d5NNI9ieVvMzLfBhE7nQ0gubsCPo/C21h236DQKA7MEYGCRAfbQADPjNzenTIoaXpV93dcBJ+b5WlhzpFVZVCFZdrVUgnSDK7VVNFjdgMunoCI2ihJzTT/UWjX0Jrr93e5x0aA+XXwcYya6fQO2rUVlWt8rIKqtiFqrKpS8hmI7tb9eMk6tunNf3VQ/qco7+55qmq4wppG9gY2Jt92RK/nEfy3ZlFqVKU6vKwvylEuvRDCOsnloiCOrLnsTwWStGItMiMM6MvBzUQsuZwwp0rzjwzpBvOTFTE1RehEWnpI4Tzg3HjGHp+KZVkwW8B4nbfYK5b5rrvvjSA9XNI5nTSWo5vo7vR4T6ytdtND/RAV5UqpRQF8TbkImRmq2q3qqZqxvSLaQyE+JPTHYj3PcMM+cXQfrnejzAxmEaZj9qqqddJIn5EUShKUVBXuafq91ZVknN0vPZ75ov5SmZ6bueKzvG/LiEJ8Bf6UB+6Vc1SNYvyccxsBbnXsp9iyQ/vEYfLDJGZEre9DKLs+cHK58FVfjovLwiOUkPhzORlZWav457iyMc3YrQvz0cRH55JodR/LAGIv9CW0AaBzfYFAzTd2ns/HnrmTHdLa1rTndyavlanW3WPpquVUkWJEJtIErS3HYl071bNliplmNXU9stCrsJiNl7jtQej0M2IiaKkRs0WW7W1tVuvJIFcZqAoqvSmKErprq5y7f3MjCS5T+TWmu7pr6anOx0zeZ67Hk7HgcPBGMS29FsCMLcChCQhySyTKl2KrkJ20IOwB3LWDcVK3RKFSGOvNnfQUq4hSOdCSIS0UPci4RRRD5E0brRcyyG6ojHjEvT0GG4gszYUJ7UlypRXrxxJN9GUaI0BiW/3p6skDGDYBgPm1itS7ezcrly653yj07r1V3cbDzv/xE736KqmqhrK6xCZ5PI+6SReaGnsVm3Vbm3tTJlab9coqzfypHb0mGTFyu5uFRZdW7VTW1tL1VbSXiMJmiAbqFKUoqtUdXVXo0eknnlyuc99ujvf1mndcunJua9cOdbWczsc/98VssSXm1vxTGJWUR9KVdes6g4kJLFIK3qXlM8583Vltjn7eQziIuR9siZrHm+TGfnxOK9PHvuW91HkMSGJQzqRJeU5My8bx9PTh22ELfDjB7BuhPhlSQI23xo2ToOPc+0zMx39Hczpnkaj997Y9vas9Lt164GmdSKLIBN5JQQRf7J160jorU3V1k7V1u7UVtVUbVG1tXVVVe1WBVU1VVu7dOjuZOJ/NUlIEiKJgkIrqvSgh06nv1dH7k6/3v1tzOmexiAz2apn98Dx+PXz8hh0C7C/+DKzM0upWapUqza70pmKSNYiX+ZaT8/ZIULFdryOoPHpeRsnISEhIboQNDSMexG5KHuHFBGSlyllHlqO5BzyMmuRtSFCxcULx9RXm7TaU5EKtW22jdN2meHjzLCGOR56vUTmcm3vs55td/vZ9jk/eyMUKNSUV0dz1WgC8xsBCdf5vYCsSRZZhNtAKAmQlAAFGiAtZIUQElLpJI1mSqAQrkmalDQFyOI2UCCBQJOwSCDrQK4EkmHQXDWTUJq1jo+HheMkvs45965zzEyIfN6LsGb8xPk0szPVSyqqYIeCzpojHXGQiBako86nPWiJliMhlF5YIh9GEaUgRJ5bFJGX2S9L3oZQQ7ihs+ZIRxykSmVRhKHJaMsszkcVb8+jUppQaQQbJ9tpu8j8EMwvA7vPOvdlSkTi6X367dP/7J/9Yz17SdtzKYW27tt/aN6+R6NZMBBWkpm/A5DAgiSEIdzOgpCVFZImMbSE8GVIuKaEBCDACUBYkGASCEACXwSyGIZAZiADcEmWNDN5S57yNqV4nXOOcw7nHKvydZz5Lv2Trj6chXycnR3f1g/MDBJhkd7+3tndiJKWNTJL3t4TcoqWnspeJwplHS8vzjwh1PY+qNtmIRo0XnZpRGg5LQ4J0YiSljUyS2Ypw7LpREkIzu85tnYam2G0kbiwbE5OF33RM8Y5++sQ8fVaBFlZYzvbeMpLKW2B85bSunVNQpCIIrLm95oF0JUFzAJIQoaEhCQhWVlZCWHCEAgBQjhAL7chCYFASEgW5HJCGEgSGGAAEoDABJERyUj6c0SgpaUtQJnnfLGcr8c8p+Y66+bedFVN1yQsVpcZPzw+v50ZiEqrlF37a9NLqeOsITk0niNakhmO5PHQ9vVnwq4h8r4lJXlMwiHR8jbSgxaZjbNnJDfqOGtIDo3ncCIrkZqKDnLj6HprG3PmZCalsiLYtm1t++KuM+uMdg75YnDH+HuY7/ccjk4vWSc0OW1p3iZvX/pAyQ/KSBFMMkNWmPl7CEOyALIgC7JChhDuAyRcknAN5+YA4cKEwkASAgQSSFZCEjJhCMOEzGRGkkZ/TkJxePrWNNDbc3KOYzkud3YnSamiZlX2wrAsacz4mTMMs+uFl6ScDTszOxTy4yUzt9wLl8gPRpKZ4lJcT32QGSU93NAmonOLEUfKDxahnEiQyssFZXxeMnPL0WjUCLW+mPTsSLuNlrJR1baq2Gx2uQd+zYwdXydCICTmyMzUbyiUA3TFAG1LDy3l9C1JXicwyr87/GR+YOb3c1jJMIEwMEOGAJ/Cx0lWCANJA7mdSRIg4f4SmIRrOAPD7WiYmX91fv49AQjuC9AcgJa2BcGLxbbO2XelJ4pSyu9mEQw7g73tMYMxVxRPpV6txcyOUvJtT2cPFWmcCmMNkYbx+gjhHjLrRhDldUEQlbxNljXhSG50SHnM63LLcenkbU9nDxVpMZpkVqMrQYgjbWAgzIYhSRDYbJwwt/Ftg1FHELdxm8SE8ffPYScnLZzQdZrTf8o/lFLoW/qWt5D1NDS8/Uk0iyPyI2YBTC5ZE0iGzEA4yQQSzTAkIXDRYmBlhSEkYZLMZJIwTAgZXo9mNDMTzdCWlr7QUkoP10KgLxTUOu65rm5JlWeVz02WFGuu68v84Pj4eqWnhJgZUckZHUpDR0h9RyTJ2UsqESGIExGcs5b1vA1So5Iga2U9EimCchEhCBFHODMRIWtUMqOhNHSE1HdEeqIMCgkSUsfaM027jbRDms5USRfFtg3z6/Jz+61d+2aIiNsE6dH+GW2dc5LkZHEgtA3llJZSKImevlBwskLC6I81Gs1o0MCMEs0K1xBgZsIsmGTWkDUZQkICQ4YJkwyL+RlpaaKZd8/8u4/O25CVleSfQqHlFNoCpJTCaU/Tk83brLv7f/fuv+ddapZSPlb5/Z2dce0bw2BmxgwvTyXiwM7MBmWduSdU1jghs4hohDiJ8zKJ5PHM8za0ZF6WuZ0ka0GLJI8HWY9QTnUOoqxB6CCdmT2hssYJmdEUMxBtaiucjzY+LE34aMtMh6GkG0XQYAzzA124a398ICEJm6bY+OdI8pxzwgE4HMjivPS98FKu5QX6Up4W8oDJn5M1PzA/YvRnS/Ps0WhgmNEw0miimcVoEMM8+6HSzPzMv2c0yRrN6E91ztu6lCYvNP+00CuQ0Lc0OWlpp+9hZe/NmVFYR521ll8XUlMpRmaMn7nGOQwzPD3Y5VJmZ9aZcvYVkj3rQ/J55M5slMYMEkLep97UyXN5HYokksheCE7mEfT1eAeN15HZKyR71oeEUgollTk29aFjb0tsWzMrVE6bqGXMzC+YrzK3oEfr1pceroP40oAhqdEWf5+TmRYC7aY6R4EjHQqlLy3QFmg4hbZveZynSVITzjlJ8ufoz56gP2c9ZfTHMzPP1szM0ZGOnq48bQPJA05LCzQUumiBtofqn7alpy1kwVmcsIee083eApcqPf1meTbl48yOGagfuQ8zeKoVCYu1M0rIOjsq4gpCEC2Uz8P5wdIgqFMo9CAyS+6gxnmbGXmMQQ2ErIlOuOtE5nmOQ85sVMQVhCBaKJ+nbOZ09P0DYiStZvvIOBXVk1Yp8ezMwFxm/NQuacZNDX/YAAZszzlbks6cyemzElbfrpPVZ8XQQ7NKKaVQLrQDlK6nPH2gL31LS5sALYX2PKV1wktL27oP14bQtk+vnJZC4Q5KA3AOUIDSQ2a2dM5s/dkP2FB+v9AfOpCMHx10m2HMzHi95BXRtrC/d3KWs70g8sNtqNOLOPJxWu7O8yL78pjndIJYXoaW8nnoUl6Wx5w1lOfMMrsFkY/bUKcXYRCKafUPjjxn1GwDsc1GEikjaSuU12vGzw2BdLfWkBnjC99h7NcGG4zRXpRiZnP6ptrdcNALnL49lFNe2mfRQuGUQlvaFkrp25Ry2gdoC3lKoRQ6MadtoW3fpgDl2sJpA6VX4PRAenrOOTOj2dyaewOKomiF8jH/Tqfjl33BwDC/ZuZNL1UindZgFlFFh4jtoB9IcoMyC2denISQvAyZKYULKspskT2IiIQeyD2kIfUt6iGSzJB52yG6oiHiGvRBkhuUWegw6QhDBHE+8lwyJcXYPmJrG2yNvF68WGaY+WLa/8HWrWViXABfMFdzNcCZGWlrC8cc+WGRPpvTE9wDlLQvp32bS2lPeVteuGnp29KqtxJvSym90qdA30NjTrsKTdumbSimLVQvNNknM5L2gyEJ9o1tMBi38puliTwV9O2nzvzu7RS9nl55Pejt7uSm5+yLaH2bHnCS7vIY8nzQldeDrJ21s+a5BkWkk5fJmiGXtSEzP5vKc53z2NfsRXTepgecpLvsM8gsU3VQR+KgqArZamRscjo5I0+vJ8Y5zPgv49BtAFsb8AUwm3tza7PqB9D+Y4t9jgX7v/fvBeUApCUubVp6ePukQDmlpT05hb4F3mBa2tJCX0JoaFq6gXLOoax4cRbh2nPOcM45++fsLT56Ub432JhSiEAigfJ/fu4qekVRL7tpt32iSz4XHWfoKJJzCDKfImtDELotbyOKUy0zzvsokZCQEF0GEhrI2dtC2TtEREiei8YMjSI5hyDzCallMMV2HDondemm2dqP5tRNpXfUHC9mxhhouv+PXDPmEIAB391vbm0AO6xw6weB/3jr70HJJCFdhL49rKzSN130WaeQ9kDZqz2UInq89bYHSlpue07pPhTEISYdTssZkjMzs7G2gCQr2GBwkmyDbwwbG2g6npFE4jfr/8QwztdLUe0j6O2OmVV+YggdOdfsCHXQUUJB9syOSh57p/E2ZL/oTeHIh1FEyQxte9Yy8zL75QdDaGSe2RHqoKOEolKXHx86EumlgkYkYwzmLTl7SF68xdDltv+PXHXLl95gw758ffE22LBqYDB7b53Zk5Pk6OGkc5LddlPB6WoKkENIq5IFPRxa6Aptm7A6fdtsPU6ahJnzzpnR/AzGGGyvmjY2mHvz5d5gI4iWVJ7+D89XMzPwlJBzL+3us4sUQtYSNpJrR1yy97VmlszMvEy//HhQ5yhF9ry8KEsItX2exmNR3Pj8jkIKIecIF8naiEv2vtbMkrfRlU6vjkQXJkFUobQ95fcvci/lzIvHtjku/0cHcav7DWxzb/3CvR9u4wcM5taStvajOXtvNvsRnFGSnmQnTbrJHPbTCck56UMSThM/oMzhzNlIe0t77y2hLUhbgrl1EwM2gO+wPgGbDSiNxP/RSJxjMDPzxEu9EpKPQ3rOHpFrWNcNgnV2HA3kPhOyJgVRW6NC1rIWtOkF6oZ83FKdysuEG9CPyGOIrOGsFwRndhwN5D6qLNYjdVwe2qKG5UYT29hBK/deT0QJg6b/D3xpPkvaaEsGgX7N3NpsDGAAY2NgBcCgra29YW/db0lsbWnvvaWZ2dq67nNGW5L23vqZbWvL3BuMAUMTAAN4AzY25ip+cYNuq1B+v37xecz1d6/0VD37qhAyM1MUZQVBt897oEU+jHJmMpO9C4LsPZ3ngw6l5EczoyQaDS1fWXOLEUfkJ7OWEwRtzzfQIR9GOTOZsSwyUnV0ni6eRnSi1hdBLWySF5nB3+mv+g/03Udz3RIIbbFhgxG+bHM1v2o+NwAGG5uNWQVYNSs/IzBgvGpsDOAHewVWIA1fGhubv3Kbe/OrZoM+gvkr43Pk8Xa8PBXSC9U8S9Ya1aOXH83nLsumrHysB2cvpY2Wed7mkh+97Pm0bmTPh0EQOY3HZBFSHEmjkHya55bjUk4e68HZSwlNCXSW4SgdJHAqiZE1doz1bY/yQhDX1u3L9ifNt9JGktiIrd+wEX4w7OdmX2wM9o25NWA/BkiwSUKbBsCAkxiDMWDchCZgMPbFxrYBf9qAL1y22faN0EWgK4D5un7r1yFJr1eqF0q29mnJ2JmZkGJvHSW65RpKPmaWxhqSTVsjqHEnhZ5CwShX7/K2h0KFIGvlOZHGvByOEIQUtzVKtGUNJY+ZpbGGZBNdBE6O0lF0oVDT2xDGHLG1vWpGJjLDjJ6Dprv9+f0NGGBLEjIIkNgWMgYwIG6NYQPeAIbN1QDml20wBgz4AgZsbo3B3hgMGwwGzO3mKjAgtkDf8ouiHr8bQRJJZpnK66VXPfRY2JmZVZKypRUEOROhhVhn37wuEkKLUNZEnYiIkDWPIfdmbcm8k70UJwlFocVJC4uzHqFc6QRBZiJ0EGf25nWRENKoqEQdtxtB1KUjdtb01pN5PUkid1NmzNGYQ+s/8hdvboW0Qb/97N/c+uFb8a25+tNfa+MNNrBvNt8azBbXzdWgDVgIkBGwJSGQJD4bfzLC/B9NSGZVzdIrSqTD7rKL5IwguZefGjn79LOlKLSct5H7ZWaG0EJCPo/e5GRvvA7FA4m0FAonM4JkLz8amT39bCkKaeigJUep+3uKoDEE8sUZMaZRM78iDWNmZoaEuA5dIIT+qs2vSxshJIG2QBe22IC5N7cC4+1fMmCAbfO9gY3Z5t4A5nYDAm0BW1vb6JbvzUcjcY0QEYkknlWUqval17kpi92hcg3VcUUP+8WySEgXka6PQlB5H04ue5D17EGdQu9EZskdFJy3mRGcPbPx2GUN1VgR3IvjkJAWka6PQlBRTKufwf7JUWqZRS07tWRuIWcp6/c+emS6jSBmmOLajUB81K8AZn9hzK0QWAJ0BaG9uW6b+w2Xj/pkhAE2fvhWgM3njRAggK2N0C26mv9qCfGLsxP5KbOYyrPycu31LHZ39gUpm4/Z5wzl21DOyr0kn4fI6asXoTw3ENyd2ZPs3RayRjrZl5ehLcrLCJWWmctjzhrK21BmZS/J5yFy+srFcXK8TtFICEZgQzlzzTmzv4d0REZmJCSmEJj7363by730zfd+AMzV3NqArqAtrvuyhQUCCRnxrcXVoIt12QgQCO2NkISEbpG2xPcG9n/BRxH52G2WqlkFNZXSUlkxZmd65Qzp6ZKcOVdku0h0cNnkGnpF1ghazrDWU172QErhggtlZs0elHQktElOSzKjb5kh0ZLMzBu5FokGyyVr6BVZI8jK5rjdEGXT4rRAPqbLK0KNMcf0dSQzX00xmBe2pA/f7l+493MBvDEfzVXfsqW9hSSBLpIASZe92bpIEhIICd1aV2tLEn+x+EV9ErpIIISUYNZURc0qZqFUFZWPY42gDqzvU32g1j4fUj5Fy3Z8nqJcLRrvM6+8HkTorGXNYzUogk5+MkTbGjIbOO9TPVDnPJbyFB3X+DxFuRoVTMft+8/yKhU9hWGshSLf9lAZ5jCMKzLHZMgcJoyv+GXr3y1JSNLNvS66EexPv25uzbcSWNq6RVd0u/UR9LX5RZv/0o3QzV+pezDrqapQs9BKB6Ldnasz657ropyxtx704Txifc4ZNdoIgu19Yw/dlrcRxbkaocjHlyBJSAh3MNJ4zNmzHsqM2zJ7mCPOc2bUaCMIhlr+8v1R6+KUlmmSfN7oRoqZKeb4dPky0mFIYsAvBhswSAJJgG4A8f+6AWO+NN/bYP5Sc7s//eW+u170hUBCVx5znV2YNf1mqW66q3tnpifk6yC59pCzm3Lt0hFCLRKypjd1iih6k/Wo5LF3Gm+T54ueUnHkwyiiNqFtD5I1yGxT1pZGCHVIyJre1CmikMXx+++LajIMEnr6EHLdqIfLDCNjtDGC0Z+IKRhvfHPl879b9yDQjRCg/xfuL7776LvP/rWv938JCCEhISFdpGfrnscyN6XMUqqqi6oqmi4/USJH7kWxrh1yZrtFydntY67RhzODG/pmdgiJksf0y89GUOeooYeQ9aK+FkIXeQ7yIntRnLUhM9cWJbPtMWv0cGZwQ9/MDin5+0cw92p1mnSDbvJ1zSHIdN+ZYwRCC2BsbMDixTe2+fhnIxCIjwL2L+iv+ehv8N2+mP9C8dF/gS5C4ioh0GfzGLDxRQ8oD5SiZnXNJN1VypmP+wn28sNBsS/kHnXki89FkMo8EbKGrG2I2hoVspb1gjZ5XWf28LKtbpPHe4JbPg6KE7JHjbx4LoJU5olQ0XtH8rGyIRH5qTkjmbnkEiL+bj1mTPYFc8FgMLzg15cHA/6zkXi2dPmNdKe7X9Wd7v7CzUf/2v6APnytGwEC9IsAxhj84MewAdulurpKdVD0T3dQUyH3jpw58+ORj7W++tGcLfK+LwRJZjLTeZm9p/N80KGU/GhmlMaNhpavkL2RmZnPI491Xn2a2SHv+0KQZMbxfBrRieZHqyP3pj8eIZCWHn+PDWzA2GxgY2yw7Rc/Nrb9+PFjNiAJCUAgSd8JAUjiVr8kQIAAcatvAN3cCwl9py95/Rp4zIN5wGBsA2xj24/9ZiSdjpooSqt8mbAICaukI2d7IfnRLkG7IghthItS2sjzPcxc8qOXPZ9WI3s+DILIKS8TDiHhlDQyu4Xk05agOxGENsJFKaGO5/c4lcT4kXzbgQxEEIjbJKAtsdnG2IAxG2+/3lwe++F6AR7MRyFA4tlCAoEAIS5CIBAI3XyWAHRBugghBCBAkriVJCT9u//dejG3Nva7bQM2hsvVXP2AKdVKpxNVRflYVZ5hRTrOZbGEfNmGImdfxPqcncgZR1uek03WxkGNOymfB6NcvcvbBjokBFkrM5xIYx6HI+RlVxSZvYjznPsVmXG05TlZHo9oHgYzBWVqLqPIShTjZI/iJKFIZnZ3xtoSSlE5N0lBRXg5X2Z3dmbm987VjBlzYXw/F2PMW2OcrxkYM+PtMPN7dmaY36tK6XW8KqKo8jG2du3OXnd+/ToiJAlFZsM5yR6y3kjWgyCVpNFTLqiHDysSQl5mD+pEZgot8hjSm7Ul8072KE4SisyGc5I9ZL2RrAdBKkmjp1xQqNhTmoUkpFKG/8Fx/aFNEIVqLsEY6UrFSLSteQxBCXZ2Z4xQFNly5oyUvOqh5CkovGZ+9+z83vm9c/7ewduZYcacv3ebmTEzs7vz2e/dhSp4ydkpXlFSCQnZrekttvr1+37dr19kzWMIIkjWtscrM48pRXm9JFSWNWsaZy1FIcl9kvtlPhFaSMhjr+5e5Iq2NY8hiCBZ2x6vzDymFOX1klBZ3kegqyqNqMRngSOb01NdINCLwmkuksY2JmrcsmdGsD43O7vNCnNcS0l7OEpEKXqiF+mu4qXezu9Zr/m9b3/nbIY3Oy8v5+slPfHo6Sk9IaqnWq3q1cp92d92Zk/XUm7ZMyM4bzN78zpuCBq9uPEcGo0uHwZBZc0STs5j3p49qFPI+8gsufuixi17ZgTnbWZvXscNQaMXN55DIxXpUQr2hqlSqDo/O8LXXhXZXL4IYcNc/OhtLV+G+j2zs7s7plk2CUUhSUGS7lTyQvV65UVS0Qk1PKWi11MhSqoUbEE9uSbnrnuxZmZ3JK93+dHbWl6Gxql60SYkGgpC8jpbSdZGoyjq9NUIgjw30Lgye5K9ezeLdPLzt7W8DI1T9aJNSDQUhOR1tlKl9oVAIEhK0l0//yAW9Og0gmRBtNCpNMrpkpCGRIiE5HMzM7szWscS7LarF+mEeIiit/NKeaVEj568HqSiiJVepKh6LMlZ2SrRdmzD7JrdnVPO3BvldElIQyJEQtt6L7Q9Vk7fID+53Mka8jaPEWSet73Iyx6IFC64UFtm9kY5XRLSkAiR0LbeC22PldM3yE8ud0IRCwuqooqq/QPzerr56xdOlrOhXcR6EwIlPxnj2+QslRLZ3dnZGcvmy1VLFpuWqJVsbb2CcobUdo57JcgZCVvqKDbpsXvMo5ldM2aWnOlWBCU/GeNtMosiEWWP8jp5LHo44VTjJ4vqatH4ySuvxyx01rLmMQ2KoOQnY7xNZlEkouxRXiePRQ8nnAqFarSLhOSdT6+nM1/VjRVRCaG6oKWXrElLCBcJCQmh5/tgZ2Z2Z3btatm3vo5Wstq8WK9E2iQvHr0oRUXV2gRtye5qhUWsdnbsqd2RUCQ/eMmatIRwkZCQEPLhjczoHDU+HBEpZEZ9An2xvSzXi9C90JKI4lyNUOTjS9akJYSLhISEkA9vZEbnqPHhiEghMyTLUKg6zK6/n+3NNqJo2ULWiBS3vI8iSb4OKXWkfM61mdnZ2R27K0Nb26JXGythn3ORj1ntjNducu+xtC0ZS83+tjKzds7V7PhcOWCjT6m45X0USfI6pNRIec7LcBFaGiEUh5C1VxIlip5eRiWPjZeNt8nzRU+puOV9FEnyOqTUSHnOy3ARWhohFIcGVWS5yOx6/VlC6uKYjS5GkC966iJr1ijRjZCv+0SRQrSzb2Z2Z+zvmWFsPbOiXcU6i11RRc+u3mJF21pNrzRvZ3ZmzO7MTDMjEsmm6Mk95LpRX/TURdasUaKNkNc9USSIWmjbyxo9nNm4xUCHkJAexPm4EUHOUUMPIetFfdFTF1mzRok2Ql73RJEgaqFtL2sUFTpFBh1Kza7nv3rfLUplsVqrs8lmhvxgOvJ9zq7Iz66spNDM0s7M7u+ZmWYNY8zsstjY0ptmyQpjtx1jzH1nZpYqKJ/LWa6ba4d8XWuG/GA68j6zFfnpyhnZoxaz8VxkLxpHkTV5H0Rt5blFWS9rQ17XmSE/mI68z2xFfrpyRvaoxWzMYp+Qgr2EzCeu97/7LScCDVJkJbSih5ZGA/l2Dx329dyjT9EFFeRz7mFnZmd2ZhczMzvn/p6Z2VmzM7Nz7uzv2Z2d2ZGcuV9IN+xlUUrOPnXJGT20NBrI2xsa7tvXHj1FC+rw4tOsh7zPTBwyExJHA9kbpA23HErJ7KklM3poaTSQtzc03LevPXqKFtThxadZD1FFWVjU+dlmsNVA0YQuFONlBEHo9KEgKKhLlXTkGorLDyYUqqQXUUgKRSlBlM8h95Qun3Ot55ozn8v3eRtBEDo9FAQFtVRJI2soGh8mBHUhCG1qRClt5Hlkz6XlOWt9rZl5Lu/zNoIgdHooCApqqZJG1lA0PkwI6kIKQRolUddsBO9/GVKrobWetToU5HViLRLkWvnpbUU+9kWse5J7iiU/WpCQoGMdHbtSzj4hCGXru3zbrQ4FeZ04hwRZKz/eVeSxF3H2JC/jaHsbNlkbZzTupMyeEIRy9S5v2+pQkNeJc0iQtfLjXUUeexFnT/K+lwxUuXpqQ3j/SXCBIitR3ImglltCkC9WEjaKbnsk1/U5laSjD+hSkI9dKvSOkK9zBrUiZwpdBCEkP9ol550IarklBHlxknBRtN1I1vOcStLoAS31sLdUaAl5nRnUicwUWgQhJJ+2ZN6JoJZbQpAXJwkXRduNZD3PqSSNHtBSqNhTCJzMNoiNi2MMXRPkMc6nndy+zj3nljMfUzYkX16SVC7XXBOsaylaJFnk6x3nJ0IXEvKxL7LrlpDHOJ92sr3Onnll5jHlQvJySVJZ1qwJzlqKDkkOeX2/zCdCCwl57EXubAl5jPNpJ9vr7JlXZh5TLiQvlySV5X0039ZG8e5eLhh1mkFStqAeCC0Rwfo2Z998HXvItaQPe3xe9EWbH8znyjWXsNb6mG/X96UQ1IcloWSDeiC0RATnbWZvXscNWUt6uPF86EWXD/NcWbOEc85j3p73pRDUw5FQckE9EFoigvM2szev44asJT3ceD60VaRHKcwHG8a732qzkgkVpX40CGr7MnSsTgp1E4KiCkLy41GXa0dSUVTQEQT53IGOLWfo8rl17RJC5CcHQW0vQ+M0KdQmBEUVhOTzqGVtJBVFBY0gyHMDjSsztDx31pYQIj8cBLW9DI3TpFCbEBRVEJLPowa1LwTXHpk2j/fWUxQbhUacu8ZaEBKR0O26JKHbx7B6SH5iHbtyDfk2H5cg5/rRW35qRLRCoU/XdW/EuWusBSERCW3rkYS2x3D6IvnBGneyhrzN4xFknk+3/GhEdEKhp/XsjTh3jbUgJCKhbT2S0PYYTl8kP1jjTiiifWoT+fgBDRarM4g4eQyZQb5OrrGRiHKP8nXysegmyaqOn1l0P3T8zFW+7cOGQlTOkO9DxMljyAzyOlnjIhFlj/I6eSzaJDnV+MmifWj85Clve7hQiMoMeR8iTh5DZpDXyRoXiSh7lNfJY9EmyamgUNhtJrhHxWULRQjJc7ggJCSE9YN75Fyi27WO84gcObvVD3x7+xgp0iHaL3TJxVnrknvf3IsQkudwQUhICOfDG5lHtK015oiMzLb64O32GCnSEN0LLVnMOkv23uxFCMlzuCAkJITz4Y3MI9rWGnNERmY0E/NsU3l3j2zkguCy5PNQfjyKtGTJ51xDWIRbN3KwCLn23YoSRbd7OCr5GPky+Tr5tPQhXJZ8HsrnUaQjR56zhnAIWxsZHELW3p0oUbTtYVTyGHmZvE6ejh7CZcnnoXweRTpy5DlrCIewtZHBDYSqeWeDefdbpFO6klQ9UOheIJcS3e5BkO+L5F4Xut0P0pFinR17+XIREhJyXz/cp7NTUeqTL4p6oNC9QJYSbXsQ5H2R7LXQtg/SSHFm45aXh5CQkP183NNsKko9eVHUA4XuBbKUaNuDIO+LZK+Ftn2QkDT6tYemzeYP8VbXtPo1NDz2QpDvu9Ve8rMri6x71HdfF7kXHUsp1+TrgiV9gdCFnnODbvJ9v4aGx14I8r6tbslPVw45e9S710X2onGUsiavC470AqGFvuYFbfK+X0PDYy8Eed9Wt+SnK4ecPerdLFXsHxanNpyPdxRBRBA93DizcX5wD108n/sqdJy70Ifvc29Vvu8RYn1OSCwJSc4+BaHQFlLu+RiSED3cOLNxPryhxddzr0Jj3kEP77N3Ku9DiPOckDgSksyeglDoCil7HkMSoocbZzbOhze0+HruVWjMO+jhffa6JB4bs83nt+7JUFK94LnIc4SEFASRiqhIR66h6PjBhKA29CR0UyhU6UY+h5xJ6cM9Z0EoP9q6+PRc5DlCQgqCSEVUpJE1FI0PE4K60FdCm0KhSht5DplJ6WHPLAjl087i6bnIc4SEFASRiqhII2soGh8mBHVRaj7YiP76b9EpVIx0yPtwsdbeINfK557v2y7nsV/Euid6xxlLtx++yLc5OmRtSITQJZL9KnINMtIh78PFObdB1spzX++7ljnuRZw90XfMONo+XuRtRkPOhUQILZHcq8gaZKRD3oeLc26DrJXnvt53LXPcizh7ot+3nP97NqX/g1CS4k720EYQ5YuVhKKU6x7J9ROpkI4+XEOp496lQkLIt7kGIXJGkg9YWWQ/fM7Z5U720EYQ5cVJQlHKeiNZn0iFNHpYQ6mxt1RICHmbNQiRGUkecHLIPTxnttzJHtoIorw4SShKWW8k6xOpkEYPa0je9tTG9PFuaELaXNGoIY1kzf34mHvOzY8GGypfXpJUckCuCdY1ihZdFulTWqE+yLcbrAuhDy1F5IpGDWkka/bxmD3z8mlwofJySVLJgKwJzhpFh5ZDekon1IO8veAshB46isgVjRrSSNbs4zF75uXT4ELl5ZKkkrmbbVLvHmmjdF/P521miqxvc/bN17GXnC3pwx6fc0ZJmy9DPkZEztuikiVnvi4f64O++Rh0X8/nbWaKnLeZvXkdt2R2pIcbz5lR0uVlyGNEZG6HSo7MvC6P9aA3j0H39XzeZqbIeZvZm9dxS2ZHerjxnPk/29mw3pEwhKLx4Y3HfA7dSkuLuglBHYKQ/HgE69qR1BFViG5BfmqtvYQPubb53C2lFYrGhzce8xzaSkeH2oSghiAkn0dw1kZSI6oQbUF+tM4t4SFrl+e2lE4oGh/eeMxzaCsdHWoTghqCkHzen45/GG1cH7+u1TnWEveUj0tCN8lCzm4fwwryU+vYutzzsedjb91zrs8pEpUfDGIJS1khRPk41hL3lI9LQpvkILPtMZwgP1rjatnzmOe+Z888zykSlQ+DOMJRTghRHsda4p7ycUlokxxktj2GE+RHa/zT/378q4rNC4/3BDfKoleJPpxJrlGQs+iI8nW+LLo5sq868hM7koiOL0OQfN3xZe655ssI4UZZ9CrRw0yyRkFm0YjyOi+LNiP3rUZ+sJFENF6GIHndeJk9a15GCDfKoleJHmaSNQoyi0aU13lZtIn/7r/+787/7B+ETYwn5Xkp/PlvSNpUQ5OFhqZvEhLC9d0yDzKPRmOtMUdmir5qqQ/ynMeeQhvqXuhNujhX41Db4+AUIdQgPkhICJct8yDzaDTWGnNkpuirlvogz3nsKbSh7oXepItzNQ61PQ5OEUIN4oOEhHDZMg8yj0ajmQyGgxgeXoXdpnZ+HCghJ92iKNqFFKUtL6OgHqIt6whR2NrI2snr9MIVpYTzMllLzozkOcqHeaxoQRSXj8dsy8soUg/RlnWEKGxtZO3kdXrhilLCeZmsJWdG8hzlwzxWtCCKy8djtuVlFKmHaMs6+hIJWmkRnhb3s8GdL4RGyUSQgUDFJU8v5lf4Bnlf5Dki2l4GSUfk5Y08dgsJ2TOTx8xG9kotUdvzUYgkQoesjf30Yg+CvC/yHBFtL4OkI/LyRh67hYTsmcljZiN7pZao7fkoRBKhQ9bGfnqxB0HeF309hpCS1sL5pzyRbHb/3dcipagUnaEIXTTeZ1Zn5Kc7bskeNUKyZo42Zc/Mnk97ilCeW5y9rC2RPQ1kQ9bsjfdtdUt+uuOW7FEjJGvmaFP2zOz5tKcI5bnF2cvaEtnTQDZkzd5431a39P3gZccZpDRDMjj88W7Te/+nlaYhaRYDGhi1+u6Glu/Xnl6FBrnDix+sOjl5G1pcZA+NRnmdIW1yRONEsue5IlEaZzbuR25o+cqaXoUGucOLH6w6OXkbWlxkD41GeZ0hbXJE40Sy57kiURpnNu5Hbmj5yppehQa5CeJcf8z9bIDvP7lvSqvKiVBhJgsSUhBETkSvsiZFol4lNIqvcEKboChVS14HaeRSfnLL46tCEONlBKEGCSkIIieiV1mTIlGvEhrFVzihTVCUqiWvgzRyKT+55fFVIYjxMoJQg4QUBJETkbd9zSRESJbK/FPubTP8Z9TfSpMgQaNQtHRy2xdZK8hPdokY+z3lOQdZc7SR5762QzTOhgvBfZDHRu/eZ6lQkA87uQ2yVpCf7BIx9nvKcw6y5mgjz31th2icDReC+yCPjd69z1KhIB92chtkrSA/2SX6Lu2+KBdeXTbGj1/faNGGYFhGTl9lmSeJryi13UjWvE3qB2ho5NOKspfnktlobklJyxps59OWLCd7FLekE2WZJwlFqe1GsuZtUj9AQyOfVpS9PJfMRnNLSlrWYDuftmQ52aO4JZ0oyzxJKKK2G8matxHJgm9/s03y3WNKGDoUc6GQvoO8zB50Pk4RrvOYRsIVVJG1trNGnUM5nLlkxtdy1tDWKfnhs+fQEseRl5HseRlC0Pk4RbjOYxoJV1BF1trOGnUO5XDmkhlfy1lDW6fkh8+eQ0scR15GsudlCEHn475F6OmlHZlfQbfYLH/wKJTJpLKSlSBvM6MNbY0bz/eVFo7yeGNNOZ8GfZGz5sU5J2veHjTmRXRLCEdLpEJ53xIU5G1mtKGtceP5vtLCUR5vrCnn06Avcta8OOdkzduDxryIbgnhaIlUKO9bgoK8zYw2tDWOPPcSabB7Rdk4P37QumyUUPjiPIe2UnQIed+44il4wYnzcZIW4VwEKTOZEQpVZmiZQYPM0CAkHwd5e55DWyk6hLxvXPEUvODE+ThJi3AugpSZzAiFKjO0zKBBZmgQko+DvD3Poa0UHULeN/pxWPSi/Co20X/3DxkyxkKtCBKuhTYhIj94cdbc9r7gyh5q7HnMnZfnbZ6DPEfcgxIOGkfeJ+J0N9aikXAttEki8oMXZ81t7wuu7KHGnsfceXne5jnIc8Q9KOGgceR9Ik53Yy0aCddCm6SvvvKD19dZow8OryUb6sevM3VOsd4GhfAlZI2iQbRFeZm9pbRJONWTV0iaXuYH78qatnlBSJV5CLK2ZJ48tiEUsoasUTSItigvs7eUNgmnevIKSdPL/OBdWdM2LwipMg9B1pbMk8c2hELWkDWKBNEW5WW08+1fADbXH/whIromLn09FwkhX2vmkhlFS8jLUSJ5n9mSNXsjM1Iv+vXVDUubkVks+cmgCCF5ziUvi4SQx8wlM4qWkJejRPI+syVr9kZmpF7066sbljYjs1jyk0ERQvKcS14WCSGPmUtmFC1BDq/ovLNN9t1XUHVxw7WEr5cRkXqKvBwktLSRwT2UmTV6qLGfkPdnTURe53XOY6WHw2XJDxbXkg8jIvUUeTlIaGkjg3soM2v0UGM/Ie/Pmoi8zuucx0oPh8uSHyyuJR9GROqpr7wcRLzbt7Thfvz1P5SMS/Cl74gc2giyZ2b2sEY663lORMIdmWn5MJIWQkhSy/ONnqq01dOX24pKg6LuzcyMHNoIsmdm9rBGOut5TkTCHZlp+TCSFkJIUsvzjZ6qtNXTl9uKSoOi7s3MjBzaCLJnZvawplx7Sd7b5vuDr2inXDRDHnuhrijyo5WM5/Sw5vWGdJES0mWm8RwhldoeM4NQ0CaPQSKLx14JeeyFuqLIj1YyntPDmtcb0kVKSJeZxnOEVGp7zAxCQZs8BoksHnsl5LEX6kLRd/m0krL7vDbij5/ckxRBbxr5olFfX/M8Rz0RBz28TyRHghb6WuPQfXFCUmQmmfm8ULKevU8yQ5mNltCbRmajvn3N8xz1RBz08D6RHAla6GuNQ/fFCUmRmWTm80LJevY+yQxlNlpCbxqZjfr2Nc9z1BNx/vn5VWzK//dddKFrM3XKGoWElJC3oUhLLypkLW+fCJnJ+cGRWZE+yMwMVw8zatuHh8jLMVOnPJUkpIS8DUVaelEha3n7RMhMzg+OzIr0QWZmuHqYUds+PERejpk65akkoW8JeRti9/KODfrj1/+mZSxzcny/fJG9rGfPc0d5mec4ew4KcZyPI697cUZDTiFRYy+Eu18+mUFLOZz3mTk5L7NW1rPnuaO8zHOcPQeFOM7Hkde9OKMhp5CosRfC3S+fzKClHM77zJycl1kr632tee4o/M4L8KvYrP/vuwXp8sPx/Uap7RBZ85wc0ugBOcjzoaXOjHr6NMiavaSR9SSkN2tmo/sle2hTXX44iFLbIbLmOTmk0QNykOdDS50Z9fRpkDV7SSPrSUhv1sxG90v20Ka6/HAQpbZDZO3Lb/4iG/fHr/8h0l+/PEZLi+xB8mlwLUHmQ1Lk+RYJ8mF6CGnZT9AIeXvBWQi3pCNr7le0ZPbwvV9P0dIie5B8GlxLkPmQFHm+RYJ8mB5CWvYTNELeXnAWwi3pyJr7FS2ZPXzv11O0tMgeJJ/29Tt/99PfYrCJ/99fQe8v+FJwkDWo7KEtKY+RZEbyNiSCyo9GigjaTk64U5DZlpfZkyKfdl5uLw8KDrIGlT20JeUxksxI3oZEUPnRSBFB28kJdwoy2/Iye1Lk087L7eVBwUHWoLL3pS0p+M1f5M+jf/z1Pxx8yRf5yW8pOiQcoVGqMw/J3qLBobyORNQQPfjp1MnMyyK68viQ4gSl8eGZmfnBlKJDwhEapTrzkOwtGhzK60hEDdGDn06dzLwsoiuPDylOUBofnpmZH0wpOiQcfel3/gGPv0Hjz7v/4CuToOBGr+ZBDsnb5Pr6PRh0yRqNcOQxe+Z5GxLJc9aIyHr0wFEQbsxI92YGBTd6sx7kkLxNrq/fg0GXrNEIRx6zZ563IZE8Z42IrEcPHAXhxox0b2ZQcKM3632RQ/L4f/2Hvfx5+o8f/C4c5PMQJzO2EGTPLXG19JDMyMvsoZNIjZchSHpRBKE8XtCWLYQTl2RtJMGRfB7iZMYWguy5Ja6WHpIZeZk9dBKp8TIESS+KIJTHC9qyhXDikqyNJDiSz0OczNjy+/9Rvz/V9ef1/31v/+rzHHpIcqEHzsuIiqyFPA7S0chxRZ7znMdSI7Shbgny/uLUciPvB1cIIXs4z6GHJBd64LyMqMhayOMgHY0cV+Q5z3ksNUIb6pYg7y9OLTfyfnCFELKH8xx6SHJ96YGz/xf/Yn/e/7/ov/GP+v4uLYIeZFbqFr14zKhkbyNrZ8+ax+RGjei8zh7OHnmOMoMFmaEF0S/KT1a0CHoQUqlb9OIxo5K9jaydPWsekxs1ovM6ezh75DnKDBZkhhZEvyg/WdEi6EFIUbdo/Obvd/uX+W2Bv/M//B/+zhYd8hwELTMcbuz3xXF+tOKQrOF8mCMSEtKQPAU3Mg+pJcqHRxB52aGHr6fokOcgaJnhcGO/L47zoxWHZA3nwxyRkJCG5Cm4kXlILVE+PILIyw49fD1FhzwHQQt+5z/x5/ttg//Gf8s/e5lfjy2VIrQRZBZXEiTRU7JmjuwdjRAin9cSkeRl1rNXZktkTwihzDye/GxLpQhtBJnFlQRJ9JSsmSN7RyOEyOe1RCR5mfXsldkS2RNCKDOPJz/bUin60vjNX+S3E/7O36T/266/u+TlDV+ZEVoIDXK//Gz2yqnzPmS9vGzLoexB9p7kSEuOZD9oJCJHHWc2znoPvbmBzAgthAa5X342e+XUeR+yXl625VD2IHtPcqQlR7IfNBKRo44zG2e9h97cQGb05Xf/57/x2wz/wn/o6784ZuOQeUWoF1lzo5YQjYRGyXqFNpkh5Za8j9KoS+UHI4J4EYWg8ToO8rYxG4eWK0K9yJobtYRoJDRK1iu0yQwpt+R9lEZdKj8YEcSLKASN13GQt43ZOLRc0Zf6nb/99nfa+e2If/mXlzz0Z7wEQeJceyAwwnnMc/J9IPnxhEM0GoLyeB/kucir90GqB7KHaLRkZiYI5dMLghHOY56T7wPJjyccotEQlMf7IM9FXr3vi1QP9B2EkEEaqUEMIxAktft2sZ34T/9Tf6eD5ZHeIqlEaplodssmenhfmeXzbrRY9kpBUCkhKbSsjTPyaUKWoheRtWtDFGcmF6W8y3reJnp4X5nl8260WPZKQVApISm0rI0z8mlCXyO+vYismdJCSOiGET2EpA6vzJ3txb/1D189/Nn9GaZSYmGQQaDQncdEEi5rxUNtWUO5KIcLgqwdxlnLc1f52XT2HPoWcRxZz4k2Sh6zJ+ohNIJCdx4TSbisFQ+1ZQ3lohwuCLJ2GGctz13lZ9PZc+hbX3HcV9auHyMtomJhSjPyrs/Bm203/uW/pXjP8/FVy5tiLNv9kkYcJWsLSjmf5jmX1+Mk+cEbjXkPCaFFS5DgPIegviiSj2v7ybztfkkjjpK1BaWcT/Ocy+txkvzgjca8h4TQoiVIX5znvgRRg5SIc05au28X247/9F/9HYSFJxEkCNJamEVsBHmZOMjbJJfQJykzeQyNKjM0goOsmSNCSPYWZM1PhrOWohDaHlvERpCXiYO8TXIJfZIyk8fQqDJDIzjImjkihL7ZW9B3iDfNoGsmDr9gZxvyb/2P/w6PfrmmemHQzDIdR7+PntanoI4g1EBkRu7M4CA/Wl7HLVHCyX7J+/TQNV62FXfLrEUOyt6bw9GXntanoI4g1EBkRu7M4CA/Wl7HLVHCyX7J+/TQNV6mldB7Y5g0XHsOvJ9tyf//P+V8T0lKREqIZkhicfZbyqentpCWGVLKyzyHxlWE00Nc9lJlHvK2JfN8GoLyMo1ZiiQia1Ses99SPj21hbTMkFJe5jk0riKcHuKylyrzkLctmefTEEgsGRkME9/+frYo/+l/8H+EeLEwhikkkBLci7wMNRL6yprZkjV7IuhI5tKvL2cd2Z8o3yU/GVR60bJf8pjQEvJYPBREuBd5GWok9JU1syVr9kTQkcylX1/OOrI/Ub5LfjKo9KJl75FaECnSCLuX16ntyn/6XxP+Dl4kgy5KO5bPrNA7snYIMvNchBqCk5dZz5oz8xi17TkIlR4OYbS9jNK1fRo17mHmfWaF3pG1Q5CZ5yLUEJy8zHrWnJnHqG3PQaj0cOjLaHsZQnpa53h4Je1sX/6t//vfwQsEskQRIYM1pbMeGogocucxkfcpiYcGEsps4UZmVLlN1vAicSouR/WUZI+ENoLgg0RjTemshwYiitx5TOR9SuKhgYQyW7iRGVVukzW8SJzC5aieIpXSDBEE80/5vbYz/+ofQnTDpNI61yIke87rvG5Zu+jVZebDCKnU9mF9CVFayGNmZT9rT5khzy/kzNL2aRGSPed1XresXfTqMvNhhFRq+7C+hCgt5DEzfa33e80epCBIWRjzs+sFZGvzn/7L/56eSg2kSCOItEiHF++DnCNrD8/HofvioOQiezKztoUL8ngQ58PGd5SQWfZGS6OgcWkRWkLaSIcX74OcI2sPz8eh++Kg5CJ7MrO2hQvyeBDnw8Y3lL5klj2DEDJI6pe9sGKb85/+B1/qvVvpEgtj6SItbY3Qoqz3E9lzfjizSlo+zSwu8ljUyD5kFnk59oqsEQ+d8pjXRVraGqFFWe8nsuf8cGaVtHyaWVzksaiRfcgs8nLQjpDavThvse05X/uXN5YupZlBs4cea97HQXBQiDizzz5utLT4niChhxBCd2bLc3BLOZzXCXI4L7NnnOyN9eKy5n0cBAeFiDP77ONGS4vvCRJ6CCF0Z7Y8B7eU+3JeRyA6uubuc+5sgx5OPyxvTEW7F2ksGSS3NBrPByHz3nRmhJbGDDKDIlTSyJp0pDeNrKF+eSw0CnWQz4MotR1aXgbJLY3G80HIvDedGaGlMYPMoAiVNLImHelNI2vIr6+90AiSXojm5R+9sy16cnrfO1IyOMcIbUmZD43I410DQX40aQmyXsFBPr1EDMItcTTI2SPynPvV0NKbl4nGh4m2pMyHRuTxroEgP5q0BFmv4CCfXiIG4ZY4GuR8zegrz9GnY8Pg8gvqV9smPTm99Q7IohCBRJLH5G1mhKrxtiVSiSCKk4TOlbK25WXKEiWfVm15GdxBjSC0pJLnniJBIslj8jYzQtV42xKpRBDFSULnSlnb8jJliZJPoy0vg+64SMT812+2bXriI/F7IIJOQqohd8E97C1KCPX14X3wjXtBHg+ZqeTDiNDl8SGVZFZeZs3MPGvephR3SDjKk9wF97C3KCHU14f3wTfuBXk8ZKaSDyNCl8eHVNIXKi+zpiDF/K9vs436EHTxRsMYpiBSfo/XhmiEyIxcEJJPEyfPbZGZ2f3SFkeeNxzpvBxB0Pk0OEhmZmZSfo/XhmiEyIxcEJJPEyfPbZGZ2f3SFkee83ik8zII5r9+my3V+eDijeiFWJhP42oJN2TGeZk16AQtr8NBStHoQcjz/QoN8jYkLsnayIxLsrZFISoo3MhjPo2rJdyQGedl1qATtLwOBylFowchz/crNMjbkLi+ydqIYcx//TZbrPPBxe9hyQwQbUEeB3EcLnEiiPxoKIQ0pM4sn+ZwyryRtTdcITRe33kMeWGgbzLPywaiLcjjII7DJU4EkR8NhZCG1Jnl0xxOmTey9oarL6Hx+vyfvc2W63xw8eNh0TmeZGtbQ2fPLI9ppEiU13mbPXoRZQYNZIaWtX5RZktIdNQQtCBEqRp68eFJtrY1dPbM8phGikR5nbfZoxdRZtBAZmhZ8+urvtASIvNfv48t2Png4lnQkcaN4DjvWyhONWbIhzmiJSE93IuDRsFtvegBoSX3NROUeXAecwhtyPM2w6HlRnCc9y0Upxoz5MMc0ZKQHu7FQaPgtl70gL605L5mgjJ7zX/9Nluy8+HqrXcEIiMqWZNcy5rXbXv0lJTycZQiTvL52VPyyUwUgswglZCfvlIJkRmkEZWsSa5lzeu2PXpKSvk4ShEn+fzsKXllTxT6IjPMz6HbbNHOJ6e33hHE8/k40kKdU/dByHp52ZZDHoMgr69ISE6U9VCLEkl1yUyynxS9uYXMkh4IeT4fR1qoc+o+CFkvL9tyyGMQ5PUVCcmJsh5qEX2lb3Vk/s4/9zbbtient94R5EhmIcpzm8fL2pDXuSXvo4dq5GcbCNlTnm+8HVlP43k0Qss5Qt6HHMksRHlu83hZG/I6t+R99FCN/GwDIXvq6/Hk9fjd/8/f5WAb9+T04sciFISQtSXzoCUS9AMkHKJRoQ1D6EWSWcqr90GqDXkbpfEyIUEoL4ODghCytmQetESCfoCEQzQqtGEIvUgyS3n1vi9Sbfzm3/J/9tt1Tx4Bf+QjIS/LJfI6VFDl0xq1WPaKPAc3ItmTx5yZ2dYIWYrQcuOWqxQJkZlclHJvnvOyXCKvQwVVPq1Ri2WvyHNwI5I9ecyZmW2N0NeIb8hv/i2/8dt5D4/J/9i/jkJ3yBppC0F9q3FteVmKcrggaFF4mDXWu2TP+zjPhxRxHFlP+spj6UHIY41eHRS6Q9ZIWwjqW41ry8tSlMMFQYvCw6yx3iV73sd5PkRf+b/+nfe/8dt9//X/nP/YH4r/G7pfPbSlQR6LnE9b9ktkHyfJ64YbjfcJbUVL1iDPISjoRh5bVNBA1paSvfvVQ1sa5LHI+bRlv0T2cZK8brjReJ/QVrRk7Yt+55/7b/mD6bf//iH4N//H/+9/Y/HP+L/p1+9Dg3yaEgRtSY5GoshjPg1Bycxj46ALNTyEhrN2DcQh2c/adtYoCiE/2K8vGuTTlCBoS3I0EkUe82kISmYeGwddqOEhNBy//285/T3OfpvwH4Q/Hn89/t//hvzjxP8DJ421N+hICt2QyIzcmY2gd9HI+2iJEk72a3nfUF1jzdtyea7FWbusvTk5hZPG2ht0JIVuSGRG7sxG0Lto5H20RAkn+7W8/s2/5W/U+G3GTz/ifHf78x9pesGlU0SNyZgumQ3pQjQTgt6oBZEzZLWhy5nDomjI+0QDByWvO8k8QQuivtx4DMLokJ5eB8XhvO3Q6auvWYTrXfTFkNOFlm44qIYgA1FZ5tqT4mloG/nld37EvXFhdCVdYZyabQ7TenRxYe8VkRClHYEokZy5JlnS2Bec2zqpkZkkKJnlGjOz8lgOmeHKPeRna2vj0rmx1vJ4v/RNkef0RdQ3ktnXTHIllUG7gV69lWmfimL+9j/G1vLHPxp9riLbhNR6itSYabqIim2KrZGydAaJnhLIt7GWDoTaykUJ3YLzfDmPyVZGT8ERQmaH8+Hl8V50ZmM24qSlqKNu6et1o76HoK+XcY4IgqSV6CGRIn1g3+tueDvZffudreaXP6x9E1JRKUTTbDOVjhO1wzTSEe1YuD5vB7Kte9KC45BIiBIun5443YmElMcjUUMpOXGHFEoeM6NoKOlErvKTLR36Dvra7+vxGsi57yBSaaCXXkSIlLqbleMH1o95N9vPL9//YePGZVMXp2OmaZRUKl0ghBhGBD2NjlAWFSKyLnGCkH0YZbblZV+qPCZK7jhoyGMQ4ggijfM6L3PStxDRk4iCJFxLEPK9L9WXviLNRuj7QIpYfPIzng62pB8+/m4XoRhMopap1OVDCKR0zW5hIWfO+u2HS57DQXVlNKijhbt0kJeFEJcqZGZthC55fphpqeDuUNYYryOCvs562etLZl/I18chFgcdkvQ8kH7rT5htUb98/1dvkKaWY0KaujhNQ5ABMez7LiFFBkRJEpJuuzxGrz6NqCUvg1suJI9nrUJIrrxckuIQRJCsZyYvkyqkkHlOMRpfUZKEpO0aC0OWwslT6bfYun74+JukjAmpVLZTowupS0ZFKnRSzjlYZ4tFHXQlOhQyoxLuDQuh7HmZntI4sqYc4npIFIXkdTgzokst8jaSuN8rnwdndrgvNUhPhHQEYhjz4+kFeG9b2S/f/9Uby+jii4yOOWZ6Q4pM0C3sIfoQBZGQpL4kj6E8J8hjsid6cWp7G5FZYy+cKIJcZC237bV8WM7pFqH74jxepIcoiL4hSRSpWBgk2D2dbv4XtreffuM3b0JTSBEKKdJUQzSDINFeexFsktzXIpEE5+VhFLeRlr1lnmS/7TnceS6hrpLg8vqURCqZjWoI0iZrCGU/twgu6dvXet8rIkQEOsxPr2fmzrb3x998sJoyZkq2UxF1cSREL0lZulyPJWeXDZnlSNoyg3PUC0SUdONkj1DdFpLH3IOvQxZpyvs8hxO6oLzsW+TIh9nH/V59oeX+AsQwdCLC7rv8Z1vhL9//1ZsLMKY0C+QiZAoihTTSB1u5VosSyRk6lEKDSDKLyHmQ5zBuqFJfbaTQSKKiRQhxX7Sdg97h6LugHtD1JX3R0o2rrNUv1DfSF4JMRVJh92S839e3Pf70G7/5Xn3xY0alESEEut4r0cxv6KDkY3UIwvFUUgXJTHBmuhDS2TvPS1HWc5TH5DJ7KGsRd0JFfvBGS/oqfXHul7LmCw0ij2kIBN38DHyfnW3zh+9+59s15piMubKeaMYwgZTF1WE7OBahiCpO1grC5kHQRl978rLQIC+T4kJSTkUe83L7MHEOt+1lzSzo6zkN17AcQhGSpPT56/2sr2I7/ePvvQupZXSl3aW6TsrioH4f+cEQ4uS+spe+EHIaezdcSUKRpe3THpI9xxHhkByhLR8lz1lr20/Osewh35EPQ4gu1cu1P/Pf/vMDwfb6+d0fDb9RKaJp6C3E0oHo63NY6RZFXnbRmT0gFJkJI6HsmbUklL2TlqzZz8soa2ajlnMjRaOk3Ia+3ga5X1+P4aStr/pKwe6X3fyVbbu/fPjuT/5dnGpHyLmkC+ztLB9zH430NW/I01mD6JC1kkoIh8q4KuRlNCqCaDmkBu6Sx8yELi/zmOhdum9f3Dbra+9rDbun1X2+vu34lw/f/VuklkljShGEaKYMt46iEla3Ls/JeRki3MOaaKwnIc+h6Cui7cYaUo5DtDhkf7HHCQlZazkIkbWveX9BowjhZM3uP9/n69umf/n+Nx8giGinEGQgIUg+J4sljnBCgtvWsj1enJlbqLMeaaO8T9yShfIY4vTi3EMNZM1zSPYhNBRB8pwcjn/rXy74mwx/8de3fX/+8vf+6wtdF2RB+kBPLI6lPcpZhM2Rx3C6qCVrhHBteczLPJZZVKIEDYRyRQSHIcVFlMeDC23HuW9feuiEK89xX92oL5Tf+a//e/6lf7Ltt+0/fPzl/wiiGWIYwyAq5BrqCBEpIcksOGse46CGttS75G362kNJ4VSHU7hREPJ5EUlqec7aV1/IDCnI2pfi3/rn/63nv/QPl/32/n98cv7OjwXNpPSKxRHq96HLlxGCI0KQNT9ZD42WtRGNTzPPWuTtkZkIQnkfJWeGCNel7OHkuSLfoGX9zV+v+lf/+f5JAQ/v+4S8yY8S59h7RKV19qG2dV3XQ9ZEirMWUlH2vIzuHFEqOjWORkTmjavDIS+Pshc9kce8jL7mjXx41zfyy8z+b/3v/E2Hv/hf5p90cD55Su7y5c8kuhDNTPKbXKP63W/XIO8j5PXlcOSp0RaStb4UImXNYw7qmxAKDVyF0BHdkEYSjef64r5RTmTtV75kze/+C///f+l/yD/J4eEf/7ubzj6u/i4pqYjFm3ImlpLydVQj0ghZO6gUEYKsN2ZHEldxEI48jpQ4VEhenrOW4Mwzc09kjdiS50v9zl8u/Gf97Xe/8U+qOJ/8ssfA+Ts/tgm6ZSNy5svFjjwfjkNtJU4QXQ6F8joRDmeOlqOohZBB9oO2JKQyWz48Tmb21Jf7vtBv/jP//7/0P+SfxPHwvl9690++/I1SWdQRm2vIfSkVSojrsCBDEJTXIZQhKDTKCUHQOJ1DsrYkzmMiey2p2xCSGfStpO13/4V/7fLvsPsTjP+Nf5LI+Yf843930+mXPxNkD/K5VDqERNZDfa2h5fGWPdrOHjp7Zh6zdw+OjKKLZE2hcHpIGtF2+nqsB8/9zn/9n/2f/I3zT0o5n/zj3WPCnWdRv30MK+saRfJY0YkbjyFkbxGKEnFmJJ92LZfHk4+j8hgj2U95rFGEBn3H4+/+JX/N4t/w3/BPmvkQOPnD/+6m//r/7T8FfnCr25lSceMrj23hrJnpUOaYISjJfqTxeNxIpZZaglMiobOHgoh82Eke87t/yb/nP/mbP0z+g+iflHP+F/4n/wT+C/+n/87/S4QEUce34XxSyVrWrHmd9aGUtlNChKDSF0KJPF9kJiR7FSoRLeXLCfc7/4O/avrf+5f+d/77/klA/0X4f/mX4//qP4T/Yfp//p//pfB/+H+QXEOLwkGQ9eS5xnm+OCQtsygocgrK+eETgqKt8xiHXn0h+8m8r8x+9y/5v/z1q//zn2z/b/yTnL58enh6Oq+RWva95VP0vahF0UV0kTL+/CddlPSCC8eUWo5TMSbpmIiupItUmpKybApSUqSk6PtM+wZ9T6rV7Huk8q4nJ7sLV71Z1qeXD0/PX6ShC6F0xzWIIiWmPZn2osYkJRV1YeriMVNEpUitp6nLpsQFUVKESqWg7/U9pIgi097CvmdR30tBrn36k5seW1e92dinlw9Pnx9+8Yxa73sLUymhkDJMXTa1HpXtVKSp1SzSVIoUUaRjQmo9NSb6HmmkoiyfQio1SJGCFFHMJ4/KT//3rnqzti+fnv909/Jt0fdSUoNhVIq+NxyTcaqU1CVTKcZ0yZQxQ41pGXVhKkV6Aal2ClKpVGqQsmRUI6Xv+3Gl5PJvfRRdvXDVm+H9sLj4uy6dXbIwJWXZUOmYLpEyJlIYU5oaJ7U6TrWaIpe4cJwq26mkUalM+5RUikx7USkI03FJSVmYOnz6w8mnP8zeTPDZpbNLly5eoh9XShRRmuNUyzERy0otU6upaJptpsNMraYw5gWpC9MxXTZlmELKsikpKZjP7+abLhxmb/b40tmli5du/DDU9/oeqRQpqTFTjCnbqWMSJSV1YWpMSLOdSoo0XZFegOii78m0T6W0U6RISSF1+PSHtz1cuOrNOl86u++XunR26x/BgpQxSV2YSl06FU2lC8ZMhV4O6QWE0vcpzVSDFFLmw8l807ULV73Z6rMbzi59jxtuzk9pKppeFLVMSZEixSKVInVxupKm0kVqTKtRC/p+MJ9/28PhbecLp7M3232+Ob+8Od+cz7cfjrmCdMyUlFQUxlyspzCm1Jgumbo4JSolZT7/tm97fj7MF05nb/b89j3vfeE6n883Xr44k5IuSMepLkxhTF90ilQqla+5nw/7w3z+bedrV70Z+lvvOZ/dcGPc4Hxe3CBKNE3vf2vlByju78f8rXt/eNoefc33o/e+5P8v+f9L/v9rnAI=";

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
  window.App = new App();
})();
