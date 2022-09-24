import {
  getApp as e,
  _getProvider as t,
  _registerComponent as n,
  registerVersion as i,
  SDK_VERSION as s,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
const r = !1,
  o = "${JSCORE_VERSION}",
  a = function (e, t) {
    if (!e) throw l(t);
  },
  l = function (e) {
    return new Error(
      "Firebase Database (" + o + ") INTERNAL ASSERT FAILED: " + e
    );
  },
  h = function (e) {
    const t = [];
    let n = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e.charCodeAt(i);
      s < 128
        ? (t[n++] = s)
        : s < 2048
        ? ((t[n++] = (s >> 6) | 192), (t[n++] = (63 & s) | 128))
        : 55296 == (64512 & s) &&
          i + 1 < e.length &&
          56320 == (64512 & e.charCodeAt(i + 1))
        ? ((s = 65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++i))),
          (t[n++] = (s >> 18) | 240),
          (t[n++] = ((s >> 12) & 63) | 128),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (63 & s) | 128))
        : ((t[n++] = (s >> 12) | 224),
          (t[n++] = ((s >> 6) & 63) | 128),
          (t[n++] = (63 & s) | 128));
    }
    return t;
  },
  c = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: "function" == typeof atob,
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        i = [];
      for (let t = 0; t < e.length; t += 3) {
        const s = e[t],
          r = t + 1 < e.length,
          o = r ? e[t + 1] : 0,
          a = t + 2 < e.length,
          l = a ? e[t + 2] : 0,
          h = s >> 2,
          c = ((3 & s) << 4) | (o >> 4);
        let u = ((15 & o) << 2) | (l >> 6),
          d = 63 & l;
        a || ((d = 64), r || (u = 64)), i.push(n[h], n[c], n[u], n[d]);
      }
      return i.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(h(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : (function (e) {
            const t = [];
            let n = 0,
              i = 0;
            for (; n < e.length; ) {
              const s = e[n++];
              if (s < 128) t[i++] = String.fromCharCode(s);
              else if (s > 191 && s < 224) {
                const r = e[n++];
                t[i++] = String.fromCharCode(((31 & s) << 6) | (63 & r));
              } else if (s > 239 && s < 365) {
                const r =
                  (((7 & s) << 18) |
                    ((63 & e[n++]) << 12) |
                    ((63 & e[n++]) << 6) |
                    (63 & e[n++])) -
                  65536;
                (t[i++] = String.fromCharCode(55296 + (r >> 10))),
                  (t[i++] = String.fromCharCode(56320 + (1023 & r)));
              } else {
                const r = e[n++],
                  o = e[n++];
                t[i++] = String.fromCharCode(
                  ((15 & s) << 12) | ((63 & r) << 6) | (63 & o)
                );
              }
            }
            return t.join("");
          })(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        i = [];
      for (let t = 0; t < e.length; ) {
        const s = n[e.charAt(t++)],
          r = t < e.length ? n[e.charAt(t)] : 0;
        ++t;
        const o = t < e.length ? n[e.charAt(t)] : 64;
        ++t;
        const a = t < e.length ? n[e.charAt(t)] : 64;
        if ((++t, null == s || null == r || null == o || null == a))
          throw Error();
        const l = (s << 2) | (r >> 4);
        if ((i.push(l), 64 !== o)) {
          const e = ((r << 4) & 240) | (o >> 2);
          if ((i.push(e), 64 !== a)) {
            const e = ((o << 6) & 192) | a;
            i.push(e);
          }
        }
      }
      return i;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  },
  u = function (e) {
    const t = h(e);
    return c.encodeByteArray(t, !0);
  },
  d = function (e) {
    return u(e).replace(/\./g, "");
  },
  _ = function (e) {
    try {
      return c.decodeString(e, !0);
    } catch (e) {
      console.error("base64Decode failed: ", e);
    }
    return null;
  };
function p(e) {
  return f(void 0, e);
}
function f(e, t) {
  if (!(t instanceof Object)) return t;
  switch (t.constructor) {
    case Date:
      return new Date(t.getTime());
    case Object:
      void 0 === e && (e = {});
      break;
    case Array:
      e = [];
      break;
    default:
      return t;
  }
  for (const n in t)
    t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = f(e[n], t[n]));
  return e;
}
class g {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      }));
  }
  wrapCallback(e) {
    return (t, n) => {
      t ? this.reject(t) : this.resolve(n),
        "function" == typeof e &&
          (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n));
    };
  }
}
function m() {
  return (
    "undefined" != typeof window &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
      "undefined" != typeof navigator && "string" == typeof navigator.userAgent
        ? navigator.userAgent
        : ""
    )
  );
}
function y() {
  return !0 === r;
}
function v(e) {
  return JSON.parse(e);
}
function C(e) {
  return JSON.stringify(e);
}
const w = function (e) {
  let t = {},
    n = {},
    i = {},
    s = "";
  try {
    const r = e.split(".");
    (t = v(_(r[0]) || "")),
      (n = v(_(r[1]) || "")),
      (s = r[2]),
      (i = n.d || {}),
      delete n.d;
  } catch (e) {}
  return { header: t, claims: n, data: i, signature: s };
};
function T(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function b(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function E(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
function I(e, t, n) {
  const i = {};
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) &&
      (i[s] = t.call(n, e[s], s, e));
  return i;
}
class S {
  constructor() {
    (this.chain_ = []),
      (this.buf_ = []),
      (this.W_ = []),
      (this.pad_ = []),
      (this.inbuf_ = 0),
      (this.total_ = 0),
      (this.blockSize = 64),
      (this.pad_[0] = 128);
    for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
    this.reset();
  }
  reset() {
    (this.chain_[0] = 1732584193),
      (this.chain_[1] = 4023233417),
      (this.chain_[2] = 2562383102),
      (this.chain_[3] = 271733878),
      (this.chain_[4] = 3285377520),
      (this.inbuf_ = 0),
      (this.total_ = 0);
  }
  compress_(e, t) {
    t || (t = 0);
    const n = this.W_;
    if ("string" == typeof e)
      for (let i = 0; i < 16; i++)
        (n[i] =
          (e.charCodeAt(t) << 24) |
          (e.charCodeAt(t + 1) << 16) |
          (e.charCodeAt(t + 2) << 8) |
          e.charCodeAt(t + 3)),
          (t += 4);
    else
      for (let i = 0; i < 16; i++)
        (n[i] = (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]),
          (t += 4);
    for (let e = 16; e < 80; e++) {
      const t = n[e - 3] ^ n[e - 8] ^ n[e - 14] ^ n[e - 16];
      n[e] = 4294967295 & ((t << 1) | (t >>> 31));
    }
    let i,
      s,
      r = this.chain_[0],
      o = this.chain_[1],
      a = this.chain_[2],
      l = this.chain_[3],
      h = this.chain_[4];
    for (let e = 0; e < 80; e++) {
      e < 40
        ? e < 20
          ? ((i = l ^ (o & (a ^ l))), (s = 1518500249))
          : ((i = o ^ a ^ l), (s = 1859775393))
        : e < 60
        ? ((i = (o & a) | (l & (o | a))), (s = 2400959708))
        : ((i = o ^ a ^ l), (s = 3395469782));
      const t = (((r << 5) | (r >>> 27)) + i + h + s + n[e]) & 4294967295;
      (h = l),
        (l = a),
        (a = 4294967295 & ((o << 30) | (o >>> 2))),
        (o = r),
        (r = t);
    }
    (this.chain_[0] = (this.chain_[0] + r) & 4294967295),
      (this.chain_[1] = (this.chain_[1] + o) & 4294967295),
      (this.chain_[2] = (this.chain_[2] + a) & 4294967295),
      (this.chain_[3] = (this.chain_[3] + l) & 4294967295),
      (this.chain_[4] = (this.chain_[4] + h) & 4294967295);
  }
  update(e, t) {
    if (null == e) return;
    void 0 === t && (t = e.length);
    const n = t - this.blockSize;
    let i = 0;
    const s = this.buf_;
    let r = this.inbuf_;
    for (; i < t; ) {
      if (0 === r) for (; i <= n; ) this.compress_(e, i), (i += this.blockSize);
      if ("string" == typeof e) {
        for (; i < t; )
          if (((s[r] = e.charCodeAt(i)), ++r, ++i, r === this.blockSize)) {
            this.compress_(s), (r = 0);
            break;
          }
      } else
        for (; i < t; )
          if (((s[r] = e[i]), ++r, ++i, r === this.blockSize)) {
            this.compress_(s), (r = 0);
            break;
          }
    }
    (this.inbuf_ = r), (this.total_ += t);
  }
  digest() {
    const e = [];
    let t = 8 * this.total_;
    this.inbuf_ < 56
      ? this.update(this.pad_, 56 - this.inbuf_)
      : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    for (let e = this.blockSize - 1; e >= 56; e--)
      (this.buf_[e] = 255 & t), (t /= 256);
    this.compress_(this.buf_);
    let n = 0;
    for (let t = 0; t < 5; t++)
      for (let i = 24; i >= 0; i -= 8)
        (e[n] = (this.chain_[t] >> i) & 255), ++n;
    return e;
  }
}
function k(e, t) {
  return `${e} failed: ${t} argument `;
}
const N = function (e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const i = e.charCodeAt(n);
    i < 128
      ? t++
      : i < 2048
      ? (t += 2)
      : i >= 55296 && i <= 56319
      ? ((t += 4), n++)
      : (t += 3);
  }
  return t;
};
function P(e) {
  return e && e._delegate ? e._delegate : e;
}
class x {
  constructor(e, t, n) {
    (this.name = e),
      (this.instanceFactory = t),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(e) {
    return (this.instantiationMode = e), this;
  }
  setMultipleInstances(e) {
    return (this.multipleInstances = e), this;
  }
  setServiceProps(e) {
    return (this.serviceProps = e), this;
  }
  setInstanceCreatedCallback(e) {
    return (this.onInstanceCreated = e), this;
  }
}
var R;
!(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(R || (R = {}));
const D = {
    debug: R.DEBUG,
    verbose: R.VERBOSE,
    info: R.INFO,
    warn: R.WARN,
    error: R.ERROR,
    silent: R.SILENT,
  },
  A = R.INFO,
  O = {
    [R.DEBUG]: "log",
    [R.VERBOSE]: "log",
    [R.INFO]: "info",
    [R.WARN]: "warn",
    [R.ERROR]: "error",
  },
  L = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const i = new Date().toISOString(),
      s = O[t];
    if (!s)
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
    console[s](`[${i}]  ${e.name}:`, ...n);
  };
const M = "@firebase/database";
let F = "";
function q(e) {
  F = e;
}
class W {
  constructor(e) {
    (this.domStorage_ = e), (this.prefix_ = "firebase:");
  }
  set(e, t) {
    null == t
      ? this.domStorage_.removeItem(this.prefixedName_(e))
      : this.domStorage_.setItem(this.prefixedName_(e), C(t));
  }
  get(e) {
    const t = this.domStorage_.getItem(this.prefixedName_(e));
    return null == t ? null : v(t);
  }
  remove(e) {
    this.domStorage_.removeItem(this.prefixedName_(e));
  }
  prefixedName_(e) {
    return this.prefix_ + e;
  }
  toString() {
    return this.domStorage_.toString();
  }
}
class U {
  constructor() {
    (this.cache_ = {}), (this.isInMemoryStorage = !0);
  }
  set(e, t) {
    null == t ? delete this.cache_[e] : (this.cache_[e] = t);
  }
  get(e) {
    return T(this.cache_, e) ? this.cache_[e] : null;
  }
  remove(e) {
    delete this.cache_[e];
  }
}
const B = function (e) {
    try {
      if ("undefined" != typeof window && void 0 !== window[e]) {
        const t = window[e];
        return (
          t.setItem("firebase:sentinel", "cache"),
          t.removeItem("firebase:sentinel"),
          new W(t)
        );
      }
    } catch (e) {}
    return new U();
  },
  j = B("localStorage"),
  H = B("sessionStorage"),
  V = new (class {
    constructor(e) {
      (this.name = e),
        (this._logLevel = A),
        (this._logHandler = L),
        (this._userLogHandler = null);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in R))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? D[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if ("function" != typeof e)
        throw new TypeError(
          "Value assigned to `logHandler` must be a function"
        );
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      this._userLogHandler && this._userLogHandler(this, R.DEBUG, ...e),
        this._logHandler(this, R.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, R.VERBOSE, ...e),
        this._logHandler(this, R.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, R.INFO, ...e),
        this._logHandler(this, R.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, R.WARN, ...e),
        this._logHandler(this, R.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, R.ERROR, ...e),
        this._logHandler(this, R.ERROR, ...e);
    }
  })("@firebase/database"),
  z = (function () {
    let e = 1;
    return function () {
      return e++;
    };
  })(),
  Y = function (e) {
    const t = (function (e) {
        const t = [];
        let n = 0;
        for (let i = 0; i < e.length; i++) {
          let s = e.charCodeAt(i);
          if (s >= 55296 && s <= 56319) {
            const t = s - 55296;
            i++,
              a(i < e.length, "Surrogate pair missing trail surrogate."),
              (s = 65536 + (t << 10) + (e.charCodeAt(i) - 56320));
          }
          s < 128
            ? (t[n++] = s)
            : s < 2048
            ? ((t[n++] = (s >> 6) | 192), (t[n++] = (63 & s) | 128))
            : s < 65536
            ? ((t[n++] = (s >> 12) | 224),
              (t[n++] = ((s >> 6) & 63) | 128),
              (t[n++] = (63 & s) | 128))
            : ((t[n++] = (s >> 18) | 240),
              (t[n++] = ((s >> 12) & 63) | 128),
              (t[n++] = ((s >> 6) & 63) | 128),
              (t[n++] = (63 & s) | 128));
        }
        return t;
      })(e),
      n = new S();
    n.update(t);
    const i = n.digest();
    return c.encodeByteArray(i);
  },
  K = function (...e) {
    let t = "";
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      Array.isArray(i) ||
      (i && "object" == typeof i && "number" == typeof i.length)
        ? (t += K.apply(null, i))
        : (t += "object" == typeof i ? C(i) : i),
        (t += " ");
    }
    return t;
  };
let Q = null,
  $ = !0;
const G = function (e, t) {
    a(!t || !0 === e || !1 === e, "Can't turn on custom loggers persistently."),
      !0 === e
        ? ((V.logLevel = R.VERBOSE),
          (Q = V.log.bind(V)),
          t && H.set("logging_enabled", !0))
        : "function" == typeof e
        ? (Q = e)
        : ((Q = null), H.remove("logging_enabled"));
  },
  J = function (...e) {
    if (
      (!0 === $ &&
        (($ = !1), null === Q && !0 === H.get("logging_enabled") && G(!0)),
      Q)
    ) {
      const t = K.apply(null, e);
      Q(t);
    }
  },
  X = function (e) {
    return function (...t) {
      J(e, ...t);
    };
  },
  Z = function (...e) {
    const t = "FIREBASE INTERNAL ERROR: " + K(...e);
    V.error(t);
  },
  ee = function (...e) {
    const t = `FIREBASE FATAL ERROR: ${K(...e)}`;
    throw (V.error(t), new Error(t));
  },
  te = function (...e) {
    const t = "FIREBASE WARNING: " + K(...e);
    V.warn(t);
  },
  ne = function (e) {
    return (
      "number" == typeof e &&
      (e != e ||
        e === Number.POSITIVE_INFINITY ||
        e === Number.NEGATIVE_INFINITY)
    );
  },
  ie = "[MIN_NAME]",
  se = "[MAX_NAME]",
  re = function (e, t) {
    if (e === t) return 0;
    if (e === ie || t === se) return -1;
    if (t === ie || e === se) return 1;
    {
      const n = _e(e),
        i = _e(t);
      return null !== n
        ? null !== i
          ? n - i == 0
            ? e.length - t.length
            : n - i
          : -1
        : null !== i
        ? 1
        : e < t
        ? -1
        : 1;
    }
  },
  oe = function (e, t) {
    return e === t ? 0 : e < t ? -1 : 1;
  },
  ae = function (e, t) {
    if (t && e in t) return t[e];
    throw new Error("Missing required key (" + e + ") in object: " + C(t));
  },
  le = function (e) {
    if ("object" != typeof e || null === e) return C(e);
    const t = [];
    for (const n in e) t.push(n);
    t.sort();
    let n = "{";
    for (let i = 0; i < t.length; i++)
      0 !== i && (n += ","), (n += C(t[i])), (n += ":"), (n += le(e[t[i]]));
    return (n += "}"), n;
  },
  he = function (e, t) {
    const n = e.length;
    if (n <= t) return [e];
    const i = [];
    for (let s = 0; s < n; s += t)
      s + t > n ? i.push(e.substring(s, n)) : i.push(e.substring(s, s + t));
    return i;
  };
function ce(e, t) {
  for (const n in e) e.hasOwnProperty(n) && t(n, e[n]);
}
const ue = function (e) {
  a(!ne(e), "Invalid JSON number");
  const t = 1023;
  let n, i, s, r, o;
  0 === e
    ? ((i = 0), (s = 0), (n = 1 / e == -1 / 0 ? 1 : 0))
    : ((n = e < 0),
      (e = Math.abs(e)) >= Math.pow(2, -1022)
        ? ((r = Math.min(Math.floor(Math.log(e) / Math.LN2), t)),
          (i = r + t),
          (s = Math.round(e * Math.pow(2, 52 - r) - Math.pow(2, 52))))
        : ((i = 0), (s = Math.round(e / Math.pow(2, -1074)))));
  const l = [];
  for (o = 52; o; o -= 1) l.push(s % 2 ? 1 : 0), (s = Math.floor(s / 2));
  for (o = 11; o; o -= 1) l.push(i % 2 ? 1 : 0), (i = Math.floor(i / 2));
  l.push(n ? 1 : 0), l.reverse();
  const h = l.join("");
  let c = "";
  for (o = 0; o < 64; o += 8) {
    let e = parseInt(h.substr(o, 8), 2).toString(16);
    1 === e.length && (e = "0" + e), (c += e);
  }
  return c.toLowerCase();
};
const de = new RegExp("^-?(0*)\\d{1,10}$"),
  _e = function (e) {
    if (de.test(e)) {
      const t = Number(e);
      if (t >= -2147483648 && t <= 2147483647) return t;
    }
    return null;
  },
  pe = function (e) {
    try {
      e();
    } catch (e) {
      setTimeout(() => {
        const t = e.stack || "";
        throw (te("Exception was thrown by user callback.", t), e);
      }, Math.floor(0));
    }
  },
  fe = function (e, t) {
    const n = setTimeout(e, t);
    return (
      "number" == typeof n && "undefined" != typeof Deno && Deno.unrefTimer
        ? Deno.unrefTimer(n)
        : "object" == typeof n && n.unref && n.unref(),
      n
    );
  };
class ge {
  constructor(e, t) {
    (this.appName_ = e),
      (this.appCheckProvider = t),
      (this.appCheck = null == t ? void 0 : t.getImmediate({ optional: !0 })),
      this.appCheck || null == t || t.get().then((e) => (this.appCheck = e));
  }
  getToken(e) {
    return this.appCheck
      ? this.appCheck.getToken(e)
      : new Promise((t, n) => {
          setTimeout(() => {
            this.appCheck ? this.getToken(e).then(t, n) : t(null);
          }, 0);
        });
  }
  addTokenChangeListener(e) {
    var t;
    null === (t = this.appCheckProvider) ||
      void 0 === t ||
      t.get().then((t) => t.addTokenListener(e));
  }
  notifyForInvalidToken() {
    te(
      `Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`
    );
  }
}
class me {
  constructor(e, t, n) {
    (this.appName_ = e),
      (this.firebaseOptions_ = t),
      (this.authProvider_ = n),
      (this.auth_ = null),
      (this.auth_ = n.getImmediate({ optional: !0 })),
      this.auth_ || n.onInit((e) => (this.auth_ = e));
  }
  getToken(e) {
    return this.auth_
      ? this.auth_
          .getToken(e)
          .catch((e) =>
            e && "auth/token-not-initialized" === e.code
              ? (J(
                  "Got auth/token-not-initialized error.  Treating as null token."
                ),
                null)
              : Promise.reject(e)
          )
      : new Promise((t, n) => {
          setTimeout(() => {
            this.auth_ ? this.getToken(e).then(t, n) : t(null);
          }, 0);
        });
  }
  addTokenChangeListener(e) {
    this.auth_
      ? this.auth_.addAuthTokenListener(e)
      : this.authProvider_.get().then((t) => t.addAuthTokenListener(e));
  }
  removeTokenChangeListener(e) {
    this.authProvider_.get().then((t) => t.removeAuthTokenListener(e));
  }
  notifyForInvalidToken() {
    let e =
      'Provided authentication credentials for the app named "' +
      this.appName_ +
      '" are invalid. This usually indicates your app was not initialized correctly. ';
    "credential" in this.firebaseOptions_
      ? (e +=
          'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
      : "serviceAccount" in this.firebaseOptions_
      ? (e +=
          'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
      : (e +=
          'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
      te(e);
  }
}
class ye {
  constructor(e) {
    this.accessToken = e;
  }
  getToken(e) {
    return Promise.resolve({ accessToken: this.accessToken });
  }
  addTokenChangeListener(e) {
    e(this.accessToken);
  }
  removeTokenChangeListener(e) {}
  notifyForInvalidToken() {}
}
ye.OWNER = "owner";
const ve =
  /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
class Ce {
  constructor(e, t, n, i, s = !1, r = "", o = !1) {
    (this.secure = t),
      (this.namespace = n),
      (this.webSocketOnly = i),
      (this.nodeAdmin = s),
      (this.persistenceKey = r),
      (this.includeNamespaceInQueryParams = o),
      (this._host = e.toLowerCase()),
      (this._domain = this._host.substr(this._host.indexOf(".") + 1)),
      (this.internalHost = j.get("host:" + e) || this._host);
  }
  isCacheableHost() {
    return "s-" === this.internalHost.substr(0, 2);
  }
  isCustomHost() {
    return (
      "firebaseio.com" !== this._domain &&
      "firebaseio-demo.com" !== this._domain
    );
  }
  get host() {
    return this._host;
  }
  set host(e) {
    e !== this.internalHost &&
      ((this.internalHost = e),
      this.isCacheableHost() && j.set("host:" + this._host, this.internalHost));
  }
  toString() {
    let e = this.toURLString();
    return this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e;
  }
  toURLString() {
    const e = this.secure ? "https://" : "http://",
      t = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
    return `${e}${this.host}/${t}`;
  }
}
function we(e, t, n) {
  let i;
  if (
    (a("string" == typeof t, "typeof type must == string"),
    a("object" == typeof n, "typeof params must == object"),
    "websocket" === t)
  )
    i = (e.secure ? "wss://" : "ws://") + e.internalHost + "/.ws?";
  else {
    if ("long_polling" !== t) throw new Error("Unknown connection type: " + t);
    i = (e.secure ? "https://" : "http://") + e.internalHost + "/.lp?";
  }
  (function (e) {
    return (
      e.host !== e.internalHost ||
      e.isCustomHost() ||
      e.includeNamespaceInQueryParams
    );
  })(e) && (n.ns = e.namespace);
  const s = [];
  return (
    ce(n, (e, t) => {
      s.push(e + "=" + t);
    }),
    i + s.join("&")
  );
}
class Te {
  constructor() {
    this.counters_ = {};
  }
  incrementCounter(e, t = 1) {
    T(this.counters_, e) || (this.counters_[e] = 0), (this.counters_[e] += t);
  }
  get() {
    return p(this.counters_);
  }
}
const be = {},
  Ee = {};
function Ie(e) {
  const t = e.toString();
  return be[t] || (be[t] = new Te()), be[t];
}
class Se {
  constructor(e) {
    (this.onMessage_ = e),
      (this.pendingResponses = []),
      (this.currentResponseNum = 0),
      (this.closeAfterResponse = -1),
      (this.onClose = null);
  }
  closeAfter(e, t) {
    (this.closeAfterResponse = e),
      (this.onClose = t),
      this.closeAfterResponse < this.currentResponseNum &&
        (this.onClose(), (this.onClose = null));
  }
  handleResponse(e, t) {
    for (
      this.pendingResponses[e] = t;
      this.pendingResponses[this.currentResponseNum];

    ) {
      const e = this.pendingResponses[this.currentResponseNum];
      delete this.pendingResponses[this.currentResponseNum];
      for (let t = 0; t < e.length; ++t)
        e[t] &&
          pe(() => {
            this.onMessage_(e[t]);
          });
      if (this.currentResponseNum === this.closeAfterResponse) {
        this.onClose && (this.onClose(), (this.onClose = null));
        break;
      }
      this.currentResponseNum++;
    }
  }
}
class ke {
  constructor(e, t, n, i, s, r, o) {
    (this.connId = e),
      (this.repoInfo = t),
      (this.applicationId = n),
      (this.appCheckToken = i),
      (this.authToken = s),
      (this.transportSessionId = r),
      (this.lastSessionId = o),
      (this.bytesSent = 0),
      (this.bytesReceived = 0),
      (this.everConnected_ = !1),
      (this.log_ = X(e)),
      (this.stats_ = Ie(t)),
      (this.urlFn = (e) => (
        this.appCheckToken && (e.ac = this.appCheckToken),
        we(t, "long_polling", e)
      ));
  }
  open(e, t) {
    (this.curSegmentNum = 0),
      (this.onDisconnect_ = t),
      (this.myPacketOrderer = new Se(e)),
      (this.isClosed_ = !1),
      (this.connectTimeoutTimer_ = setTimeout(() => {
        this.log_("Timed out trying to connect."),
          this.onClosed_(),
          (this.connectTimeoutTimer_ = null);
      }, Math.floor(3e4))),
      (function (e) {
        if ("complete" === document.readyState) e();
        else {
          let t = !1;
          const n = function () {
            document.body
              ? t || ((t = !0), e())
              : setTimeout(n, Math.floor(10));
          };
          document.addEventListener
            ? (document.addEventListener("DOMContentLoaded", n, !1),
              window.addEventListener("load", n, !1))
            : document.attachEvent &&
              (document.attachEvent("onreadystatechange", () => {
                "complete" === document.readyState && n();
              }),
              window.attachEvent("onload", n));
        }
      })(() => {
        if (this.isClosed_) return;
        this.scriptTagHolder = new Ne(
          (...e) => {
            const [t, n, i, s, r] = e;
            if ((this.incrementIncomingBytes_(e), this.scriptTagHolder))
              if (
                (this.connectTimeoutTimer_ &&
                  (clearTimeout(this.connectTimeoutTimer_),
                  (this.connectTimeoutTimer_ = null)),
                (this.everConnected_ = !0),
                "start" === t)
              )
                (this.id = n), (this.password = i);
              else {
                if ("close" !== t)
                  throw new Error("Unrecognized command received: " + t);
                n
                  ? ((this.scriptTagHolder.sendNewPolls = !1),
                    this.myPacketOrderer.closeAfter(n, () => {
                      this.onClosed_();
                    }))
                  : this.onClosed_();
              }
          },
          (...e) => {
            const [t, n] = e;
            this.incrementIncomingBytes_(e),
              this.myPacketOrderer.handleResponse(t, n);
          },
          () => {
            this.onClosed_();
          },
          this.urlFn
        );
        const e = { start: "t" };
        (e.ser = Math.floor(1e8 * Math.random())),
          this.scriptTagHolder.uniqueCallbackIdentifier &&
            (e.cb = this.scriptTagHolder.uniqueCallbackIdentifier),
          (e.v = "5"),
          this.transportSessionId && (e.s = this.transportSessionId),
          this.lastSessionId && (e.ls = this.lastSessionId),
          this.applicationId && (e.p = this.applicationId),
          this.appCheckToken && (e.ac = this.appCheckToken),
          "undefined" != typeof location &&
            location.hostname &&
            ve.test(location.hostname) &&
            (e.r = "f");
        const t = this.urlFn(e);
        this.log_("Connecting via long-poll to " + t),
          this.scriptTagHolder.addTag(t, () => {});
      });
  }
  start() {
    this.scriptTagHolder.startLongPoll(this.id, this.password),
      this.addDisconnectPingFrame(this.id, this.password);
  }
  static forceAllow() {
    ke.forceAllow_ = !0;
  }
  static forceDisallow() {
    ke.forceDisallow_ = !0;
  }
  static isAvailable() {
    return (
      !!ke.forceAllow_ ||
      !(
        ke.forceDisallow_ ||
        "undefined" == typeof document ||
        null == document.createElement ||
        ("object" == typeof window &&
          window.chrome &&
          window.chrome.extension &&
          !/^chrome/.test(window.location.href)) ||
        ("object" == typeof Windows && "object" == typeof Windows.UI)
      )
    );
  }
  markConnectionHealthy() {}
  shutdown_() {
    (this.isClosed_ = !0),
      this.scriptTagHolder &&
        (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
      this.myDisconnFrame &&
        (document.body.removeChild(this.myDisconnFrame),
        (this.myDisconnFrame = null)),
      this.connectTimeoutTimer_ &&
        (clearTimeout(this.connectTimeoutTimer_),
        (this.connectTimeoutTimer_ = null));
  }
  onClosed_() {
    this.isClosed_ ||
      (this.log_("Longpoll is closing itself"),
      this.shutdown_(),
      this.onDisconnect_ &&
        (this.onDisconnect_(this.everConnected_), (this.onDisconnect_ = null)));
  }
  close() {
    this.isClosed_ ||
      (this.log_("Longpoll is being closed."), this.shutdown_());
  }
  send(e) {
    const t = C(e);
    (this.bytesSent += t.length),
      this.stats_.incrementCounter("bytes_sent", t.length);
    const n = u(t),
      i = he(n, 1840);
    for (let e = 0; e < i.length; e++)
      this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[e]),
        this.curSegmentNum++;
  }
  addDisconnectPingFrame(e, t) {
    this.myDisconnFrame = document.createElement("iframe");
    const n = { dframe: "t" };
    (n.id = e),
      (n.pw = t),
      (this.myDisconnFrame.src = this.urlFn(n)),
      (this.myDisconnFrame.style.display = "none"),
      document.body.appendChild(this.myDisconnFrame);
  }
  incrementIncomingBytes_(e) {
    const t = C(e).length;
    (this.bytesReceived += t),
      this.stats_.incrementCounter("bytes_received", t);
  }
}
class Ne {
  constructor(e, t, n, i) {
    (this.onDisconnect = n),
      (this.urlFn = i),
      (this.outstandingRequests = new Set()),
      (this.pendingSegs = []),
      (this.currentSerial = Math.floor(1e8 * Math.random())),
      (this.sendNewPolls = !0);
    {
      (this.uniqueCallbackIdentifier = z()),
        (window["pLPCommand" + this.uniqueCallbackIdentifier] = e),
        (window["pRTLPCB" + this.uniqueCallbackIdentifier] = t),
        (this.myIFrame = Ne.createIFrame_());
      let n = "";
      if (
        this.myIFrame.src &&
        "javascript:" === this.myIFrame.src.substr(0, "javascript:".length)
      ) {
        n = '<script>document.domain="' + document.domain + '";</script>';
      }
      const i = "<html><body>" + n + "</body></html>";
      try {
        this.myIFrame.doc.open(),
          this.myIFrame.doc.write(i),
          this.myIFrame.doc.close();
      } catch (e) {
        J("frame writing exception"), e.stack && J(e.stack), J(e);
      }
    }
  }
  static createIFrame_() {
    const e = document.createElement("iframe");
    if (((e.style.display = "none"), !document.body))
      throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
    document.body.appendChild(e);
    try {
      e.contentWindow.document || J("No IE domain setting required");
    } catch (t) {
      const n = document.domain;
      e.src =
        "javascript:void((function(){document.open();document.domain='" +
        n +
        "';document.close();})())";
    }
    return (
      e.contentDocument
        ? (e.doc = e.contentDocument)
        : e.contentWindow
        ? (e.doc = e.contentWindow.document)
        : e.document && (e.doc = e.document),
      e
    );
  }
  close() {
    (this.alive = !1),
      this.myIFrame &&
        ((this.myIFrame.doc.body.innerHTML = ""),
        setTimeout(() => {
          null !== this.myIFrame &&
            (document.body.removeChild(this.myIFrame), (this.myIFrame = null));
        }, Math.floor(0)));
    const e = this.onDisconnect;
    e && ((this.onDisconnect = null), e());
  }
  startLongPoll(e, t) {
    for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_(); );
  }
  newRequest_() {
    if (
      this.alive &&
      this.sendNewPolls &&
      this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)
    ) {
      this.currentSerial++;
      const e = {};
      (e.id = this.myID), (e.pw = this.myPW), (e.ser = this.currentSerial);
      let t = this.urlFn(e),
        n = "",
        i = 0;
      for (; this.pendingSegs.length > 0; ) {
        if (!(this.pendingSegs[0].d.length + 30 + n.length <= 1870)) break;
        {
          const e = this.pendingSegs.shift();
          (n =
            n +
            "&seg" +
            i +
            "=" +
            e.seg +
            "&ts" +
            i +
            "=" +
            e.ts +
            "&d" +
            i +
            "=" +
            e.d),
            i++;
        }
      }
      return (t += n), this.addLongPollTag_(t, this.currentSerial), !0;
    }
    return !1;
  }
  enqueueSegment(e, t, n) {
    this.pendingSegs.push({ seg: e, ts: t, d: n }),
      this.alive && this.newRequest_();
  }
  addLongPollTag_(e, t) {
    this.outstandingRequests.add(t);
    const n = () => {
        this.outstandingRequests.delete(t), this.newRequest_();
      },
      i = setTimeout(n, Math.floor(25e3));
    this.addTag(e, () => {
      clearTimeout(i), n();
    });
  }
  addTag(e, t) {
    setTimeout(() => {
      try {
        if (!this.sendNewPolls) return;
        const n = this.myIFrame.doc.createElement("script");
        (n.type = "text/javascript"),
          (n.async = !0),
          (n.src = e),
          (n.onload = n.onreadystatechange =
            function () {
              const e = n.readyState;
              (e && "loaded" !== e && "complete" !== e) ||
                ((n.onload = n.onreadystatechange = null),
                n.parentNode && n.parentNode.removeChild(n),
                t());
            }),
          (n.onerror = () => {
            J("Long-poll script failed to load: " + e),
              (this.sendNewPolls = !1),
              this.close();
          }),
          this.myIFrame.doc.body.appendChild(n);
      } catch (e) {}
    }, Math.floor(1));
  }
}
let Pe = null;
"undefined" != typeof MozWebSocket
  ? (Pe = MozWebSocket)
  : "undefined" != typeof WebSocket && (Pe = WebSocket);
class xe {
  constructor(e, t, n, i, s, r, o) {
    (this.connId = e),
      (this.applicationId = n),
      (this.appCheckToken = i),
      (this.authToken = s),
      (this.keepaliveTimer = null),
      (this.frames = null),
      (this.totalFrames = 0),
      (this.bytesSent = 0),
      (this.bytesReceived = 0),
      (this.log_ = X(this.connId)),
      (this.stats_ = Ie(t)),
      (this.connURL = xe.connectionURL_(t, r, o, i, n)),
      (this.nodeAdmin = t.nodeAdmin);
  }
  static connectionURL_(e, t, n, i, s) {
    const r = { v: "5" };
    return (
      "undefined" != typeof location &&
        location.hostname &&
        ve.test(location.hostname) &&
        (r.r = "f"),
      t && (r.s = t),
      n && (r.ls = n),
      i && (r.ac = i),
      s && (r.p = s),
      we(e, "websocket", r)
    );
  }
  open(e, t) {
    (this.onDisconnect = t),
      (this.onMessage = e),
      this.log_("Websocket connecting to " + this.connURL),
      (this.everConnected_ = !1),
      j.set("previous_websocket_failure", !0);
    try {
      let e;
      y(), (this.mySock = new Pe(this.connURL, [], e));
    } catch (e) {
      this.log_("Error instantiating WebSocket.");
      const t = e.message || e.data;
      return t && this.log_(t), void this.onClosed_();
    }
    (this.mySock.onopen = () => {
      this.log_("Websocket connected."), (this.everConnected_ = !0);
    }),
      (this.mySock.onclose = () => {
        this.log_("Websocket connection was disconnected."),
          (this.mySock = null),
          this.onClosed_();
      }),
      (this.mySock.onmessage = (e) => {
        this.handleIncomingFrame(e);
      }),
      (this.mySock.onerror = (e) => {
        this.log_("WebSocket error.  Closing connection.");
        const t = e.message || e.data;
        t && this.log_(t), this.onClosed_();
      });
  }
  start() {}
  static forceDisallow() {
    xe.forceDisallow_ = !0;
  }
  static isAvailable() {
    let e = !1;
    if ("undefined" != typeof navigator && navigator.userAgent) {
      const t = /Android ([0-9]{0,}\.[0-9]{0,})/,
        n = navigator.userAgent.match(t);
      n && n.length > 1 && parseFloat(n[1]) < 4.4 && (e = !0);
    }
    return !e && null !== Pe && !xe.forceDisallow_;
  }
  static previouslyFailed() {
    return j.isInMemoryStorage || !0 === j.get("previous_websocket_failure");
  }
  markConnectionHealthy() {
    j.remove("previous_websocket_failure");
  }
  appendFrame_(e) {
    if ((this.frames.push(e), this.frames.length === this.totalFrames)) {
      const e = this.frames.join("");
      this.frames = null;
      const t = v(e);
      this.onMessage(t);
    }
  }
  handleNewFrameCount_(e) {
    (this.totalFrames = e), (this.frames = []);
  }
  extractFrameCount_(e) {
    if (
      (a(null === this.frames, "We already have a frame buffer"), e.length <= 6)
    ) {
      const t = Number(e);
      if (!isNaN(t)) return this.handleNewFrameCount_(t), null;
    }
    return this.handleNewFrameCount_(1), e;
  }
  handleIncomingFrame(e) {
    if (null === this.mySock) return;
    const t = e.data;
    if (
      ((this.bytesReceived += t.length),
      this.stats_.incrementCounter("bytes_received", t.length),
      this.resetKeepAlive(),
      null !== this.frames)
    )
      this.appendFrame_(t);
    else {
      const e = this.extractFrameCount_(t);
      null !== e && this.appendFrame_(e);
    }
  }
  send(e) {
    this.resetKeepAlive();
    const t = C(e);
    (this.bytesSent += t.length),
      this.stats_.incrementCounter("bytes_sent", t.length);
    const n = he(t, 16384);
    n.length > 1 && this.sendString_(String(n.length));
    for (let e = 0; e < n.length; e++) this.sendString_(n[e]);
  }
  shutdown_() {
    (this.isClosed_ = !0),
      this.keepaliveTimer &&
        (clearInterval(this.keepaliveTimer), (this.keepaliveTimer = null)),
      this.mySock && (this.mySock.close(), (this.mySock = null));
  }
  onClosed_() {
    this.isClosed_ ||
      (this.log_("WebSocket is closing itself"),
      this.shutdown_(),
      this.onDisconnect &&
        (this.onDisconnect(this.everConnected_), (this.onDisconnect = null)));
  }
  close() {
    this.isClosed_ ||
      (this.log_("WebSocket is being closed"), this.shutdown_());
  }
  resetKeepAlive() {
    clearInterval(this.keepaliveTimer),
      (this.keepaliveTimer = setInterval(() => {
        this.mySock && this.sendString_("0"), this.resetKeepAlive();
      }, Math.floor(45e3)));
  }
  sendString_(e) {
    try {
      this.mySock.send(e);
    } catch (e) {
      this.log_(
        "Exception thrown from WebSocket.send():",
        e.message || e.data,
        "Closing connection."
      ),
        setTimeout(this.onClosed_.bind(this), 0);
    }
  }
}
(xe.responsesRequiredToBeHealthy = 2), (xe.healthyTimeout = 3e4);
class Re {
  constructor(e) {
    this.initTransports_(e);
  }
  static get ALL_TRANSPORTS() {
    return [ke, xe];
  }
  static get IS_TRANSPORT_INITIALIZED() {
    return this.globalTransportInitialized_;
  }
  initTransports_(e) {
    const t = xe && xe.isAvailable();
    let n = t && !xe.previouslyFailed();
    if (
      (e.webSocketOnly &&
        (t ||
          te(
            "wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
          ),
        (n = !0)),
      n)
    )
      this.transports_ = [xe];
    else {
      const e = (this.transports_ = []);
      for (const t of Re.ALL_TRANSPORTS) t && t.isAvailable() && e.push(t);
      Re.globalTransportInitialized_ = !0;
    }
  }
  initialTransport() {
    if (this.transports_.length > 0) return this.transports_[0];
    throw new Error("No transports available");
  }
  upgradeTransport() {
    return this.transports_.length > 1 ? this.transports_[1] : null;
  }
}
Re.globalTransportInitialized_ = !1;
class De {
  constructor(e, t, n, i, s, r, o, a, l, h) {
    (this.id = e),
      (this.repoInfo_ = t),
      (this.applicationId_ = n),
      (this.appCheckToken_ = i),
      (this.authToken_ = s),
      (this.onMessage_ = r),
      (this.onReady_ = o),
      (this.onDisconnect_ = a),
      (this.onKill_ = l),
      (this.lastSessionId = h),
      (this.connectionCount = 0),
      (this.pendingDataMessages = []),
      (this.state_ = 0),
      (this.log_ = X("c:" + this.id + ":")),
      (this.transportManager_ = new Re(t)),
      this.log_("Connection created"),
      this.start_();
  }
  start_() {
    const e = this.transportManager_.initialTransport();
    (this.conn_ = new e(
      this.nextTransportId_(),
      this.repoInfo_,
      this.applicationId_,
      this.appCheckToken_,
      this.authToken_,
      null,
      this.lastSessionId
    )),
      (this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
    const t = this.connReceiver_(this.conn_),
      n = this.disconnReceiver_(this.conn_);
    (this.tx_ = this.conn_),
      (this.rx_ = this.conn_),
      (this.secondaryConn_ = null),
      (this.isHealthy_ = !1),
      setTimeout(() => {
        this.conn_ && this.conn_.open(t, n);
      }, Math.floor(0));
    const i = e.healthyTimeout || 0;
    i > 0 &&
      (this.healthyTimeout_ = fe(() => {
        (this.healthyTimeout_ = null),
          this.isHealthy_ ||
            (this.conn_ && this.conn_.bytesReceived > 102400
              ? (this.log_(
                  "Connection exceeded healthy timeout but has received " +
                    this.conn_.bytesReceived +
                    " bytes.  Marking connection healthy."
                ),
                (this.isHealthy_ = !0),
                this.conn_.markConnectionHealthy())
              : this.conn_ && this.conn_.bytesSent > 10240
              ? this.log_(
                  "Connection exceeded healthy timeout but has sent " +
                    this.conn_.bytesSent +
                    " bytes.  Leaving connection alive."
                )
              : (this.log_("Closing unhealthy connection after timeout."),
                this.close()));
      }, Math.floor(i)));
  }
  nextTransportId_() {
    return "c:" + this.id + ":" + this.connectionCount++;
  }
  disconnReceiver_(e) {
    return (t) => {
      e === this.conn_
        ? this.onConnectionLost_(t)
        : e === this.secondaryConn_
        ? (this.log_("Secondary connection lost."),
          this.onSecondaryConnectionLost_())
        : this.log_("closing an old connection");
    };
  }
  connReceiver_(e) {
    return (t) => {
      2 !== this.state_ &&
        (e === this.rx_
          ? this.onPrimaryMessageReceived_(t)
          : e === this.secondaryConn_
          ? this.onSecondaryMessageReceived_(t)
          : this.log_("message on old connection"));
    };
  }
  sendRequest(e) {
    const t = { t: "d", d: e };
    this.sendData_(t);
  }
  tryCleanupConnection() {
    this.tx_ === this.secondaryConn_ &&
      this.rx_ === this.secondaryConn_ &&
      (this.log_(
        "cleaning up and promoting a connection: " + this.secondaryConn_.connId
      ),
      (this.conn_ = this.secondaryConn_),
      (this.secondaryConn_ = null));
  }
  onSecondaryControl_(e) {
    if ("t" in e) {
      const t = e.t;
      "a" === t
        ? this.upgradeIfSecondaryHealthy_()
        : "r" === t
        ? (this.log_("Got a reset on secondary, closing it"),
          this.secondaryConn_.close(),
          (this.tx_ !== this.secondaryConn_ &&
            this.rx_ !== this.secondaryConn_) ||
            this.close())
        : "o" === t &&
          (this.log_("got pong on secondary."),
          this.secondaryResponsesRequired_--,
          this.upgradeIfSecondaryHealthy_());
    }
  }
  onSecondaryMessageReceived_(e) {
    const t = ae("t", e),
      n = ae("d", e);
    if ("c" === t) this.onSecondaryControl_(n);
    else {
      if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
      this.pendingDataMessages.push(n);
    }
  }
  upgradeIfSecondaryHealthy_() {
    this.secondaryResponsesRequired_ <= 0
      ? (this.log_("Secondary connection is healthy."),
        (this.isHealthy_ = !0),
        this.secondaryConn_.markConnectionHealthy(),
        this.proceedWithUpgrade_())
      : (this.log_("sending ping on secondary."),
        this.secondaryConn_.send({ t: "c", d: { t: "p", d: {} } }));
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start(),
      this.log_("sending client ack on secondary"),
      this.secondaryConn_.send({ t: "c", d: { t: "a", d: {} } }),
      this.log_("Ending transmission on primary"),
      this.conn_.send({ t: "c", d: { t: "n", d: {} } }),
      (this.tx_ = this.secondaryConn_),
      this.tryCleanupConnection();
  }
  onPrimaryMessageReceived_(e) {
    const t = ae("t", e),
      n = ae("d", e);
    "c" === t ? this.onControl_(n) : "d" === t && this.onDataMessage_(n);
  }
  onDataMessage_(e) {
    this.onPrimaryResponse_(), this.onMessage_(e);
  }
  onPrimaryResponse_() {
    this.isHealthy_ ||
      (this.primaryResponsesRequired_--,
      this.primaryResponsesRequired_ <= 0 &&
        (this.log_("Primary connection is healthy."),
        (this.isHealthy_ = !0),
        this.conn_.markConnectionHealthy()));
  }
  onControl_(e) {
    const t = ae("t", e);
    if ("d" in e) {
      const n = e.d;
      if ("h" === t) this.onHandshake_(n);
      else if ("n" === t) {
        this.log_("recvd end transmission on primary"),
          (this.rx_ = this.secondaryConn_);
        for (let e = 0; e < this.pendingDataMessages.length; ++e)
          this.onDataMessage_(this.pendingDataMessages[e]);
        (this.pendingDataMessages = []), this.tryCleanupConnection();
      } else
        "s" === t
          ? this.onConnectionShutdown_(n)
          : "r" === t
          ? this.onReset_(n)
          : "e" === t
          ? Z("Server Error: " + n)
          : "o" === t
          ? (this.log_("got pong on primary."),
            this.onPrimaryResponse_(),
            this.sendPingOnPrimaryIfNecessary_())
          : Z("Unknown control packet command: " + t);
    }
  }
  onHandshake_(e) {
    const t = e.ts,
      n = e.v,
      i = e.h;
    (this.sessionId = e.s),
      (this.repoInfo_.host = i),
      0 === this.state_ &&
        (this.conn_.start(),
        this.onConnectionEstablished_(this.conn_, t),
        "5" !== n && te("Protocol version mismatch detected"),
        this.tryStartUpgrade_());
  }
  tryStartUpgrade_() {
    const e = this.transportManager_.upgradeTransport();
    e && this.startUpgrade_(e);
  }
  startUpgrade_(e) {
    (this.secondaryConn_ = new e(
      this.nextTransportId_(),
      this.repoInfo_,
      this.applicationId_,
      this.appCheckToken_,
      this.authToken_,
      this.sessionId
    )),
      (this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
    const t = this.connReceiver_(this.secondaryConn_),
      n = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(t, n),
      fe(() => {
        this.secondaryConn_ &&
          (this.log_("Timed out trying to upgrade."),
          this.secondaryConn_.close());
      }, Math.floor(6e4));
  }
  onReset_(e) {
    this.log_("Reset packet received.  New host: " + e),
      (this.repoInfo_.host = e),
      1 === this.state_
        ? this.close()
        : (this.closeConnections_(), this.start_());
  }
  onConnectionEstablished_(e, t) {
    this.log_("Realtime connection established."),
      (this.conn_ = e),
      (this.state_ = 1),
      this.onReady_ &&
        (this.onReady_(t, this.sessionId), (this.onReady_ = null)),
      0 === this.primaryResponsesRequired_
        ? (this.log_("Primary connection is healthy."), (this.isHealthy_ = !0))
        : fe(() => {
            this.sendPingOnPrimaryIfNecessary_();
          }, Math.floor(5e3));
  }
  sendPingOnPrimaryIfNecessary_() {
    this.isHealthy_ ||
      1 !== this.state_ ||
      (this.log_("sending ping on primary."),
      this.sendData_({ t: "c", d: { t: "p", d: {} } }));
  }
  onSecondaryConnectionLost_() {
    const e = this.secondaryConn_;
    (this.secondaryConn_ = null),
      (this.tx_ !== e && this.rx_ !== e) || this.close();
  }
  onConnectionLost_(e) {
    (this.conn_ = null),
      e || 0 !== this.state_
        ? 1 === this.state_ && this.log_("Realtime connection lost.")
        : (this.log_("Realtime connection failed."),
          this.repoInfo_.isCacheableHost() &&
            (j.remove("host:" + this.repoInfo_.host),
            (this.repoInfo_.internalHost = this.repoInfo_.host))),
      this.close();
  }
  onConnectionShutdown_(e) {
    this.log_("Connection shutdown command received. Shutting down..."),
      this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
      (this.onDisconnect_ = null),
      this.close();
  }
  sendData_(e) {
    if (1 !== this.state_) throw "Connection is not connected";
    this.tx_.send(e);
  }
  close() {
    2 !== this.state_ &&
      (this.log_("Closing realtime connection."),
      (this.state_ = 2),
      this.closeConnections_(),
      this.onDisconnect_ &&
        (this.onDisconnect_(), (this.onDisconnect_ = null)));
  }
  closeConnections_() {
    this.log_("Shutting down all connections"),
      this.conn_ && (this.conn_.close(), (this.conn_ = null)),
      this.secondaryConn_ &&
        (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
      this.healthyTimeout_ &&
        (clearTimeout(this.healthyTimeout_), (this.healthyTimeout_ = null));
  }
}
class Ae {
  put(e, t, n, i) {}
  merge(e, t, n, i) {}
  refreshAuthToken(e) {}
  refreshAppCheckToken(e) {}
  onDisconnectPut(e, t, n) {}
  onDisconnectMerge(e, t, n) {}
  onDisconnectCancel(e, t) {}
  reportStats(e) {}
}
class Oe {
  constructor(e) {
    (this.allowedEvents_ = e),
      (this.listeners_ = {}),
      a(Array.isArray(e) && e.length > 0, "Requires a non-empty array");
  }
  trigger(e, ...t) {
    if (Array.isArray(this.listeners_[e])) {
      const n = [...this.listeners_[e]];
      for (let e = 0; e < n.length; e++) n[e].callback.apply(n[e].context, t);
    }
  }
  on(e, t, n) {
    this.validateEventType_(e),
      (this.listeners_[e] = this.listeners_[e] || []),
      this.listeners_[e].push({ callback: t, context: n });
    const i = this.getInitialEvent(e);
    i && t.apply(n, i);
  }
  off(e, t, n) {
    this.validateEventType_(e);
    const i = this.listeners_[e] || [];
    for (let e = 0; e < i.length; e++)
      if (i[e].callback === t && (!n || n === i[e].context))
        return void i.splice(e, 1);
  }
  validateEventType_(e) {
    a(
      this.allowedEvents_.find((t) => t === e),
      "Unknown event: " + e
    );
  }
}
class Le extends Oe {
  constructor() {
    super(["online"]),
      (this.online_ = !0),
      "undefined" == typeof window ||
        void 0 === window.addEventListener ||
        m() ||
        (window.addEventListener(
          "online",
          () => {
            this.online_ || ((this.online_ = !0), this.trigger("online", !0));
          },
          !1
        ),
        window.addEventListener(
          "offline",
          () => {
            this.online_ && ((this.online_ = !1), this.trigger("online", !1));
          },
          !1
        ));
  }
  static getInstance() {
    return new Le();
  }
  getInitialEvent(e) {
    return a("online" === e, "Unknown event type: " + e), [this.online_];
  }
  currentlyOnline() {
    return this.online_;
  }
}
class Me {
  constructor(e, t) {
    if (void 0 === t) {
      this.pieces_ = e.split("/");
      let t = 0;
      for (let e = 0; e < this.pieces_.length; e++)
        this.pieces_[e].length > 0 &&
          ((this.pieces_[t] = this.pieces_[e]), t++);
      (this.pieces_.length = t), (this.pieceNum_ = 0);
    } else (this.pieces_ = e), (this.pieceNum_ = t);
  }
  toString() {
    let e = "";
    for (let t = this.pieceNum_; t < this.pieces_.length; t++)
      "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
    return e || "/";
  }
}
function Fe() {
  return new Me("");
}
function qe(e) {
  return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_];
}
function We(e) {
  return e.pieces_.length - e.pieceNum_;
}
function Ue(e) {
  let t = e.pieceNum_;
  return t < e.pieces_.length && t++, new Me(e.pieces_, t);
}
function Be(e) {
  return e.pieceNum_ < e.pieces_.length
    ? e.pieces_[e.pieces_.length - 1]
    : null;
}
function je(e, t = 0) {
  return e.pieces_.slice(e.pieceNum_ + t);
}
function He(e) {
  if (e.pieceNum_ >= e.pieces_.length) return null;
  const t = [];
  for (let n = e.pieceNum_; n < e.pieces_.length - 1; n++) t.push(e.pieces_[n]);
  return new Me(t, 0);
}
function Ve(e, t) {
  const n = [];
  for (let t = e.pieceNum_; t < e.pieces_.length; t++) n.push(e.pieces_[t]);
  if (t instanceof Me)
    for (let e = t.pieceNum_; e < t.pieces_.length; e++) n.push(t.pieces_[e]);
  else {
    const e = t.split("/");
    for (let t = 0; t < e.length; t++) e[t].length > 0 && n.push(e[t]);
  }
  return new Me(n, 0);
}
function ze(e) {
  return e.pieceNum_ >= e.pieces_.length;
}
function Ye(e, t) {
  const n = qe(e),
    i = qe(t);
  if (null === n) return t;
  if (n === i) return Ye(Ue(e), Ue(t));
  throw new Error(
    "INTERNAL ERROR: innerPath (" + t + ") is not within outerPath (" + e + ")"
  );
}
function Ke(e, t) {
  const n = je(e, 0),
    i = je(t, 0);
  for (let e = 0; e < n.length && e < i.length; e++) {
    const t = re(n[e], i[e]);
    if (0 !== t) return t;
  }
  return n.length === i.length ? 0 : n.length < i.length ? -1 : 1;
}
function Qe(e, t) {
  if (We(e) !== We(t)) return !1;
  for (let n = e.pieceNum_, i = t.pieceNum_; n <= e.pieces_.length; n++, i++)
    if (e.pieces_[n] !== t.pieces_[i]) return !1;
  return !0;
}
function $e(e, t) {
  let n = e.pieceNum_,
    i = t.pieceNum_;
  if (We(e) > We(t)) return !1;
  for (; n < e.pieces_.length; ) {
    if (e.pieces_[n] !== t.pieces_[i]) return !1;
    ++n, ++i;
  }
  return !0;
}
class Ge {
  constructor(e, t) {
    (this.errorPrefix_ = t),
      (this.parts_ = je(e, 0)),
      (this.byteLength_ = Math.max(1, this.parts_.length));
    for (let e = 0; e < this.parts_.length; e++)
      this.byteLength_ += N(this.parts_[e]);
    Je(this);
  }
}
function Je(e) {
  if (e.byteLength_ > 768)
    throw new Error(
      e.errorPrefix_ +
        "has a key path longer than 768 bytes (" +
        e.byteLength_ +
        ")."
    );
  if (e.parts_.length > 32)
    throw new Error(
      e.errorPrefix_ +
        "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " +
        Xe(e)
    );
}
function Xe(e) {
  return 0 === e.parts_.length
    ? ""
    : "in property '" + e.parts_.join(".") + "'";
}
class Ze extends Oe {
  constructor() {
    let e, t;
    super(["visible"]),
      "undefined" != typeof document &&
        void 0 !== document.addEventListener &&
        (void 0 !== document.hidden
          ? ((t = "visibilitychange"), (e = "hidden"))
          : void 0 !== document.mozHidden
          ? ((t = "mozvisibilitychange"), (e = "mozHidden"))
          : void 0 !== document.msHidden
          ? ((t = "msvisibilitychange"), (e = "msHidden"))
          : void 0 !== document.webkitHidden &&
            ((t = "webkitvisibilitychange"), (e = "webkitHidden"))),
      (this.visible_ = !0),
      t &&
        document.addEventListener(
          t,
          () => {
            const t = !document[e];
            t !== this.visible_ &&
              ((this.visible_ = t), this.trigger("visible", t));
          },
          !1
        );
  }
  static getInstance() {
    return new Ze();
  }
  getInitialEvent(e) {
    return a("visible" === e, "Unknown event type: " + e), [this.visible_];
  }
}
class et extends Ae {
  constructor(e, t, n, i, s, r, o, a) {
    if (
      (super(),
      (this.repoInfo_ = e),
      (this.applicationId_ = t),
      (this.onDataUpdate_ = n),
      (this.onConnectStatus_ = i),
      (this.onServerInfoUpdate_ = s),
      (this.authTokenProvider_ = r),
      (this.appCheckTokenProvider_ = o),
      (this.authOverride_ = a),
      (this.id = et.nextPersistentConnectionId_++),
      (this.log_ = X("p:" + this.id + ":")),
      (this.interruptReasons_ = {}),
      (this.listens = new Map()),
      (this.outstandingPuts_ = []),
      (this.outstandingGets_ = []),
      (this.outstandingPutCount_ = 0),
      (this.outstandingGetCount_ = 0),
      (this.onDisconnectRequestQueue_ = []),
      (this.connected_ = !1),
      (this.reconnectDelay_ = 1e3),
      (this.maxReconnectDelay_ = 3e5),
      (this.securityDebugCallback_ = null),
      (this.lastSessionId = null),
      (this.establishConnectionTimer_ = null),
      (this.visible_ = !1),
      (this.requestCBHash_ = {}),
      (this.requestNumber_ = 0),
      (this.realtime_ = null),
      (this.authToken_ = null),
      (this.appCheckToken_ = null),
      (this.forceTokenRefresh_ = !1),
      (this.invalidAuthTokenCount_ = 0),
      (this.invalidAppCheckTokenCount_ = 0),
      (this.firstConnection_ = !0),
      (this.lastConnectionAttemptTime_ = null),
      (this.lastConnectionEstablishedTime_ = null),
      a && !y())
    )
      throw new Error(
        "Auth override specified in options, but not supported on non Node.js platforms"
      );
    Ze.getInstance().on("visible", this.onVisible_, this),
      -1 === e.host.indexOf("fblocal") &&
        Le.getInstance().on("online", this.onOnline_, this);
  }
  sendRequest(e, t, n) {
    const i = ++this.requestNumber_,
      s = { r: i, a: e, b: t };
    this.log_(C(s)),
      a(
        this.connected_,
        "sendRequest call when we're not connected not allowed."
      ),
      this.realtime_.sendRequest(s),
      n && (this.requestCBHash_[i] = n);
  }
  get(e) {
    this.initConnection_();
    const t = new g(),
      n = {
        action: "g",
        request: { p: e._path.toString(), q: e._queryObject },
        onComplete: (e) => {
          const n = e.d;
          "ok" === e.s ? t.resolve(n) : t.reject(n);
        },
      };
    this.outstandingGets_.push(n), this.outstandingGetCount_++;
    const i = this.outstandingGets_.length - 1;
    return this.connected_ && this.sendGet_(i), t.promise;
  }
  listen(e, t, n, i) {
    this.initConnection_();
    const s = e._queryIdentifier,
      r = e._path.toString();
    this.log_("Listen called for " + r + " " + s),
      this.listens.has(r) || this.listens.set(r, new Map()),
      a(
        e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
        "listen() called for non-default but complete query"
      ),
      a(
        !this.listens.get(r).has(s),
        "listen() called twice for same path/queryId."
      );
    const o = { onComplete: i, hashFn: t, query: e, tag: n };
    this.listens.get(r).set(s, o), this.connected_ && this.sendListen_(o);
  }
  sendGet_(e) {
    const t = this.outstandingGets_[e];
    this.sendRequest("g", t.request, (n) => {
      delete this.outstandingGets_[e],
        this.outstandingGetCount_--,
        0 === this.outstandingGetCount_ && (this.outstandingGets_ = []),
        t.onComplete && t.onComplete(n);
    });
  }
  sendListen_(e) {
    const t = e.query,
      n = t._path.toString(),
      i = t._queryIdentifier;
    this.log_("Listen on " + n + " for " + i);
    const s = { p: n };
    e.tag && ((s.q = t._queryObject), (s.t = e.tag)),
      (s.h = e.hashFn()),
      this.sendRequest("q", s, (s) => {
        const r = s.d,
          o = s.s;
        et.warnOnListenWarnings_(r, t);
        (this.listens.get(n) && this.listens.get(n).get(i)) === e &&
          (this.log_("listen response", s),
          "ok" !== o && this.removeListen_(n, i),
          e.onComplete && e.onComplete(o, r));
      });
  }
  static warnOnListenWarnings_(e, t) {
    if (e && "object" == typeof e && T(e, "w")) {
      const n = b(e, "w");
      if (Array.isArray(n) && ~n.indexOf("no_index")) {
        const e = '".indexOn": "' + t._queryParams.getIndex().toString() + '"',
          n = t._path.toString();
        te(
          `Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`
        );
      }
    }
  }
  refreshAuthToken(e) {
    (this.authToken_ = e),
      this.log_("Auth token refreshed"),
      this.authToken_
        ? this.tryAuth()
        : this.connected_ && this.sendRequest("unauth", {}, () => {}),
      this.reduceReconnectDelayIfAdminCredential_(e);
  }
  reduceReconnectDelayIfAdminCredential_(e) {
    ((e && 40 === e.length) ||
      (function (e) {
        const t = w(e).claims;
        return "object" == typeof t && !0 === t.admin;
      })(e)) &&
      (this.log_(
        "Admin auth credential detected.  Reducing max reconnect time."
      ),
      (this.maxReconnectDelay_ = 3e4));
  }
  refreshAppCheckToken(e) {
    (this.appCheckToken_ = e),
      this.log_("App check token refreshed"),
      this.appCheckToken_
        ? this.tryAppCheck()
        : this.connected_ && this.sendRequest("unappeck", {}, () => {});
  }
  tryAuth() {
    if (this.connected_ && this.authToken_) {
      const e = this.authToken_,
        t = (function (e) {
          const t = w(e).claims;
          return !!t && "object" == typeof t && t.hasOwnProperty("iat");
        })(e)
          ? "auth"
          : "gauth",
        n = { cred: e };
      null === this.authOverride_
        ? (n.noauth = !0)
        : "object" == typeof this.authOverride_ &&
          (n.authvar = this.authOverride_),
        this.sendRequest(t, n, (t) => {
          const n = t.s,
            i = t.d || "error";
          this.authToken_ === e &&
            ("ok" === n
              ? (this.invalidAuthTokenCount_ = 0)
              : this.onAuthRevoked_(n, i));
        });
    }
  }
  tryAppCheck() {
    this.connected_ &&
      this.appCheckToken_ &&
      this.sendRequest("appcheck", { token: this.appCheckToken_ }, (e) => {
        const t = e.s,
          n = e.d || "error";
        "ok" === t
          ? (this.invalidAppCheckTokenCount_ = 0)
          : this.onAppCheckRevoked_(t, n);
      });
  }
  unlisten(e, t) {
    const n = e._path.toString(),
      i = e._queryIdentifier;
    this.log_("Unlisten called for " + n + " " + i),
      a(
        e._queryParams.isDefault() || !e._queryParams.loadsAllData(),
        "unlisten() called for non-default but complete query"
      );
    this.removeListen_(n, i) &&
      this.connected_ &&
      this.sendUnlisten_(n, i, e._queryObject, t);
  }
  sendUnlisten_(e, t, n, i) {
    this.log_("Unlisten on " + e + " for " + t);
    const s = { p: e };
    i && ((s.q = n), (s.t = i)), this.sendRequest("n", s);
  }
  onDisconnectPut(e, t, n) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_("o", e, t, n)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: "o",
            data: t,
            onComplete: n,
          });
  }
  onDisconnectMerge(e, t, n) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_("om", e, t, n)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: "om",
            data: t,
            onComplete: n,
          });
  }
  onDisconnectCancel(e, t) {
    this.initConnection_(),
      this.connected_
        ? this.sendOnDisconnect_("oc", e, null, t)
        : this.onDisconnectRequestQueue_.push({
            pathString: e,
            action: "oc",
            data: null,
            onComplete: t,
          });
  }
  sendOnDisconnect_(e, t, n, i) {
    const s = { p: t, d: n };
    this.log_("onDisconnect " + e, s),
      this.sendRequest(e, s, (e) => {
        i &&
          setTimeout(() => {
            i(e.s, e.d);
          }, Math.floor(0));
      });
  }
  put(e, t, n, i) {
    this.putInternal("p", e, t, n, i);
  }
  merge(e, t, n, i) {
    this.putInternal("m", e, t, n, i);
  }
  putInternal(e, t, n, i, s) {
    this.initConnection_();
    const r = { p: t, d: n };
    void 0 !== s && (r.h = s),
      this.outstandingPuts_.push({ action: e, request: r, onComplete: i }),
      this.outstandingPutCount_++;
    const o = this.outstandingPuts_.length - 1;
    this.connected_ ? this.sendPut_(o) : this.log_("Buffering put: " + t);
  }
  sendPut_(e) {
    const t = this.outstandingPuts_[e].action,
      n = this.outstandingPuts_[e].request,
      i = this.outstandingPuts_[e].onComplete;
    (this.outstandingPuts_[e].queued = this.connected_),
      this.sendRequest(t, n, (n) => {
        this.log_(t + " response", n),
          delete this.outstandingPuts_[e],
          this.outstandingPutCount_--,
          0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []),
          i && i(n.s, n.d);
      });
  }
  reportStats(e) {
    if (this.connected_) {
      const t = { c: e };
      this.log_("reportStats", t),
        this.sendRequest("s", t, (e) => {
          if ("ok" !== e.s) {
            const t = e.d;
            this.log_("reportStats", "Error sending stats: " + t);
          }
        });
    }
  }
  onDataMessage_(e) {
    if ("r" in e) {
      this.log_("from server: " + C(e));
      const t = e.r,
        n = this.requestCBHash_[t];
      n && (delete this.requestCBHash_[t], n(e.b));
    } else {
      if ("error" in e) throw "A server-side error has occurred: " + e.error;
      "a" in e && this.onDataPush_(e.a, e.b);
    }
  }
  onDataPush_(e, t) {
    this.log_("handleServerMessage", e, t),
      "d" === e
        ? this.onDataUpdate_(t.p, t.d, !1, t.t)
        : "m" === e
        ? this.onDataUpdate_(t.p, t.d, !0, t.t)
        : "c" === e
        ? this.onListenRevoked_(t.p, t.q)
        : "ac" === e
        ? this.onAuthRevoked_(t.s, t.d)
        : "apc" === e
        ? this.onAppCheckRevoked_(t.s, t.d)
        : "sd" === e
        ? this.onSecurityDebugPacket_(t)
        : Z(
            "Unrecognized action received from server: " +
              C(e) +
              "\nAre you using the latest client?"
          );
  }
  onReady_(e, t) {
    this.log_("connection ready"),
      (this.connected_ = !0),
      (this.lastConnectionEstablishedTime_ = new Date().getTime()),
      this.handleTimestamp_(e),
      (this.lastSessionId = t),
      this.firstConnection_ && this.sendConnectStats_(),
      this.restoreState_(),
      (this.firstConnection_ = !1),
      this.onConnectStatus_(!0);
  }
  scheduleConnect_(e) {
    a(
      !this.realtime_,
      "Scheduling a connect when we're already connected/ing?"
    ),
      this.establishConnectionTimer_ &&
        clearTimeout(this.establishConnectionTimer_),
      (this.establishConnectionTimer_ = setTimeout(() => {
        (this.establishConnectionTimer_ = null), this.establishConnection_();
      }, Math.floor(e)));
  }
  initConnection_() {
    !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
  }
  onVisible_(e) {
    e &&
      !this.visible_ &&
      this.reconnectDelay_ === this.maxReconnectDelay_ &&
      (this.log_("Window became visible.  Reducing delay."),
      (this.reconnectDelay_ = 1e3),
      this.realtime_ || this.scheduleConnect_(0)),
      (this.visible_ = e);
  }
  onOnline_(e) {
    e
      ? (this.log_("Browser went online."),
        (this.reconnectDelay_ = 1e3),
        this.realtime_ || this.scheduleConnect_(0))
      : (this.log_("Browser went offline.  Killing connection."),
        this.realtime_ && this.realtime_.close());
  }
  onRealtimeDisconnect_() {
    if (
      (this.log_("data client disconnected"),
      (this.connected_ = !1),
      (this.realtime_ = null),
      this.cancelSentTransactions_(),
      (this.requestCBHash_ = {}),
      this.shouldReconnect_())
    ) {
      if (this.visible_) {
        if (this.lastConnectionEstablishedTime_) {
          new Date().getTime() - this.lastConnectionEstablishedTime_ > 3e4 &&
            (this.reconnectDelay_ = 1e3),
            (this.lastConnectionEstablishedTime_ = null);
        }
      } else
        this.log_("Window isn't visible.  Delaying reconnect."),
          (this.reconnectDelay_ = this.maxReconnectDelay_),
          (this.lastConnectionAttemptTime_ = new Date().getTime());
      const e = new Date().getTime() - this.lastConnectionAttemptTime_;
      let t = Math.max(0, this.reconnectDelay_ - e);
      (t = Math.random() * t),
        this.log_("Trying to reconnect in " + t + "ms"),
        this.scheduleConnect_(t),
        (this.reconnectDelay_ = Math.min(
          this.maxReconnectDelay_,
          1.3 * this.reconnectDelay_
        ));
    }
    this.onConnectStatus_(!1);
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_("Making a connection attempt"),
        (this.lastConnectionAttemptTime_ = new Date().getTime()),
        (this.lastConnectionEstablishedTime_ = null);
      const e = this.onDataMessage_.bind(this),
        t = this.onReady_.bind(this),
        n = this.onRealtimeDisconnect_.bind(this),
        i = this.id + ":" + et.nextConnectionId_++,
        s = this.lastSessionId;
      let r = !1,
        o = null;
      const l = function () {
          o ? o.close() : ((r = !0), n());
        },
        h = function (e) {
          a(o, "sendRequest call when we're not connected not allowed."),
            o.sendRequest(e);
        };
      this.realtime_ = { close: l, sendRequest: h };
      const c = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = !1;
      try {
        const [a, l] = await Promise.all([
          this.authTokenProvider_.getToken(c),
          this.appCheckTokenProvider_.getToken(c),
        ]);
        r
          ? J("getToken() completed but was canceled")
          : (J("getToken() completed. Creating connection."),
            (this.authToken_ = a && a.accessToken),
            (this.appCheckToken_ = l && l.token),
            (o = new De(
              i,
              this.repoInfo_,
              this.applicationId_,
              this.appCheckToken_,
              this.authToken_,
              e,
              t,
              n,
              (e) => {
                te(e + " (" + this.repoInfo_.toString() + ")"),
                  this.interrupt("server_kill");
              },
              s
            )));
      } catch (e) {
        this.log_("Failed to get token: " + e),
          r || (this.repoInfo_.nodeAdmin && te(e), l());
      }
    }
  }
  interrupt(e) {
    J("Interrupting connection for reason: " + e),
      (this.interruptReasons_[e] = !0),
      this.realtime_
        ? this.realtime_.close()
        : (this.establishConnectionTimer_ &&
            (clearTimeout(this.establishConnectionTimer_),
            (this.establishConnectionTimer_ = null)),
          this.connected_ && this.onRealtimeDisconnect_());
  }
  resume(e) {
    J("Resuming connection for reason: " + e),
      delete this.interruptReasons_[e],
      E(this.interruptReasons_) &&
        ((this.reconnectDelay_ = 1e3),
        this.realtime_ || this.scheduleConnect_(0));
  }
  handleTimestamp_(e) {
    const t = e - new Date().getTime();
    this.onServerInfoUpdate_({ serverTimeOffset: t });
  }
  cancelSentTransactions_() {
    for (let e = 0; e < this.outstandingPuts_.length; e++) {
      const t = this.outstandingPuts_[e];
      t &&
        "h" in t.request &&
        t.queued &&
        (t.onComplete && t.onComplete("disconnect"),
        delete this.outstandingPuts_[e],
        this.outstandingPutCount_--);
    }
    0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
  }
  onListenRevoked_(e, t) {
    let n;
    n = t ? t.map((e) => le(e)).join("$") : "default";
    const i = this.removeListen_(e, n);
    i && i.onComplete && i.onComplete("permission_denied");
  }
  removeListen_(e, t) {
    const n = new Me(e).toString();
    let i;
    if (this.listens.has(n)) {
      const e = this.listens.get(n);
      (i = e.get(t)), e.delete(t), 0 === e.size && this.listens.delete(n);
    } else i = void 0;
    return i;
  }
  onAuthRevoked_(e, t) {
    J("Auth token revoked: " + e + "/" + t),
      (this.authToken_ = null),
      (this.forceTokenRefresh_ = !0),
      this.realtime_.close(),
      ("invalid_token" !== e && "permission_denied" !== e) ||
        (this.invalidAuthTokenCount_++,
        this.invalidAuthTokenCount_ >= 3 &&
          ((this.reconnectDelay_ = 3e4),
          this.authTokenProvider_.notifyForInvalidToken()));
  }
  onAppCheckRevoked_(e, t) {
    J("App check token revoked: " + e + "/" + t),
      (this.appCheckToken_ = null),
      (this.forceTokenRefresh_ = !0),
      ("invalid_token" !== e && "permission_denied" !== e) ||
        (this.invalidAppCheckTokenCount_++,
        this.invalidAppCheckTokenCount_ >= 3 &&
          this.appCheckTokenProvider_.notifyForInvalidToken());
  }
  onSecurityDebugPacket_(e) {
    this.securityDebugCallback_
      ? this.securityDebugCallback_(e)
      : "msg" in e &&
        console.log("FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: "));
  }
  restoreState_() {
    this.tryAuth(), this.tryAppCheck();
    for (const e of this.listens.values())
      for (const t of e.values()) this.sendListen_(t);
    for (let e = 0; e < this.outstandingPuts_.length; e++)
      this.outstandingPuts_[e] && this.sendPut_(e);
    for (; this.onDisconnectRequestQueue_.length; ) {
      const e = this.onDisconnectRequestQueue_.shift();
      this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete);
    }
    for (let e = 0; e < this.outstandingGets_.length; e++)
      this.outstandingGets_[e] && this.sendGet_(e);
  }
  sendConnectStats_() {
    const e = {};
    (e["sdk.js." + F.replace(/\./g, "-")] = 1),
      m()
        ? (e["framework.cordova"] = 1)
        : "object" == typeof navigator &&
          "ReactNative" === navigator.product &&
          (e["framework.reactnative"] = 1),
      this.reportStats(e);
  }
  shouldReconnect_() {
    const e = Le.getInstance().currentlyOnline();
    return E(this.interruptReasons_) && e;
  }
}
(et.nextPersistentConnectionId_ = 0), (et.nextConnectionId_ = 0);
class tt {
  constructor(e, t) {
    (this.name = e), (this.node = t);
  }
  static Wrap(e, t) {
    return new tt(e, t);
  }
}
class nt {
  getCompare() {
    return this.compare.bind(this);
  }
  indexedValueChanged(e, t) {
    const n = new tt(ie, e),
      i = new tt(ie, t);
    return 0 !== this.compare(n, i);
  }
  minPost() {
    return tt.MIN;
  }
}
let it;
class st extends nt {
  static get __EMPTY_NODE() {
    return it;
  }
  static set __EMPTY_NODE(e) {
    it = e;
  }
  compare(e, t) {
    return re(e.name, t.name);
  }
  isDefinedOn(e) {
    throw l("KeyIndex.isDefinedOn not expected to be called.");
  }
  indexedValueChanged(e, t) {
    return !1;
  }
  minPost() {
    return tt.MIN;
  }
  maxPost() {
    return new tt(se, it);
  }
  makePost(e, t) {
    return (
      a("string" == typeof e, "KeyIndex indexValue must always be a string."),
      new tt(e, it)
    );
  }
  toString() {
    return ".key";
  }
}
const rt = new st();
class ot {
  constructor(e, t, n, i, s = null) {
    (this.isReverse_ = i), (this.resultGenerator_ = s), (this.nodeStack_ = []);
    let r = 1;
    for (; !e.isEmpty(); )
      if (((e = e), (r = t ? n(e.key, t) : 1), i && (r *= -1), r < 0))
        e = this.isReverse_ ? e.left : e.right;
      else {
        if (0 === r) {
          this.nodeStack_.push(e);
          break;
        }
        this.nodeStack_.push(e), (e = this.isReverse_ ? e.right : e.left);
      }
  }
  getNext() {
    if (0 === this.nodeStack_.length) return null;
    let e,
      t = this.nodeStack_.pop();
    if (
      ((e = this.resultGenerator_
        ? this.resultGenerator_(t.key, t.value)
        : { key: t.key, value: t.value }),
      this.isReverse_)
    )
      for (t = t.left; !t.isEmpty(); ) this.nodeStack_.push(t), (t = t.right);
    else
      for (t = t.right; !t.isEmpty(); ) this.nodeStack_.push(t), (t = t.left);
    return e;
  }
  hasNext() {
    return this.nodeStack_.length > 0;
  }
  peek() {
    if (0 === this.nodeStack_.length) return null;
    const e = this.nodeStack_[this.nodeStack_.length - 1];
    return this.resultGenerator_
      ? this.resultGenerator_(e.key, e.value)
      : { key: e.key, value: e.value };
  }
}
class at {
  constructor(e, t, n, i, s) {
    (this.key = e),
      (this.value = t),
      (this.color = null != n ? n : at.RED),
      (this.left = null != i ? i : lt.EMPTY_NODE),
      (this.right = null != s ? s : lt.EMPTY_NODE);
  }
  copy(e, t, n, i, s) {
    return new at(
      null != e ? e : this.key,
      null != t ? t : this.value,
      null != n ? n : this.color,
      null != i ? i : this.left,
      null != s ? s : this.right
    );
  }
  count() {
    return this.left.count() + 1 + this.right.count();
  }
  isEmpty() {
    return !1;
  }
  inorderTraversal(e) {
    return (
      this.left.inorderTraversal(e) ||
      !!e(this.key, this.value) ||
      this.right.inorderTraversal(e)
    );
  }
  reverseTraversal(e) {
    return (
      this.right.reverseTraversal(e) ||
      e(this.key, this.value) ||
      this.left.reverseTraversal(e)
    );
  }
  min_() {
    return this.left.isEmpty() ? this : this.left.min_();
  }
  minKey() {
    return this.min_().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(e, t, n) {
    let i = this;
    const s = n(e, i.key);
    return (
      (i =
        s < 0
          ? i.copy(null, null, null, i.left.insert(e, t, n), null)
          : 0 === s
          ? i.copy(null, t, null, null, null)
          : i.copy(null, null, null, null, i.right.insert(e, t, n))),
      i.fixUp_()
    );
  }
  removeMin_() {
    if (this.left.isEmpty()) return lt.EMPTY_NODE;
    let e = this;
    return (
      e.left.isRed_() || e.left.left.isRed_() || (e = e.moveRedLeft_()),
      (e = e.copy(null, null, null, e.left.removeMin_(), null)),
      e.fixUp_()
    );
  }
  remove(e, t) {
    let n, i;
    if (((n = this), t(e, n.key) < 0))
      n.left.isEmpty() ||
        n.left.isRed_() ||
        n.left.left.isRed_() ||
        (n = n.moveRedLeft_()),
        (n = n.copy(null, null, null, n.left.remove(e, t), null));
    else {
      if (
        (n.left.isRed_() && (n = n.rotateRight_()),
        n.right.isEmpty() ||
          n.right.isRed_() ||
          n.right.left.isRed_() ||
          (n = n.moveRedRight_()),
        0 === t(e, n.key))
      ) {
        if (n.right.isEmpty()) return lt.EMPTY_NODE;
        (i = n.right.min_()),
          (n = n.copy(i.key, i.value, null, null, n.right.removeMin_()));
      }
      n = n.copy(null, null, null, null, n.right.remove(e, t));
    }
    return n.fixUp_();
  }
  isRed_() {
    return this.color;
  }
  fixUp_() {
    let e = this;
    return (
      e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()),
      e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()),
      e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
      e
    );
  }
  moveRedLeft_() {
    let e = this.colorFlip_();
    return (
      e.right.left.isRed_() &&
        ((e = e.copy(null, null, null, null, e.right.rotateRight_())),
        (e = e.rotateLeft_()),
        (e = e.colorFlip_())),
      e
    );
  }
  moveRedRight_() {
    let e = this.colorFlip_();
    return (
      e.left.left.isRed_() && ((e = e.rotateRight_()), (e = e.colorFlip_())), e
    );
  }
  rotateLeft_() {
    const e = this.copy(null, null, at.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight_() {
    const e = this.copy(null, null, at.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip_() {
    const e = this.left.copy(null, null, !this.left.color, null, null),
      t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  checkMaxDepth_() {
    const e = this.check_();
    return Math.pow(2, e) <= this.count() + 1;
  }
  check_() {
    if (this.isRed_() && this.left.isRed_())
      throw new Error(
        "Red node has red child(" + this.key + "," + this.value + ")"
      );
    if (this.right.isRed_())
      throw new Error(
        "Right child of (" + this.key + "," + this.value + ") is red"
      );
    const e = this.left.check_();
    if (e !== this.right.check_()) throw new Error("Black depths differ");
    return e + (this.isRed_() ? 0 : 1);
  }
}
(at.RED = !0), (at.BLACK = !1);
class lt {
  constructor(e, t = lt.EMPTY_NODE) {
    (this.comparator_ = e), (this.root_ = t);
  }
  insert(e, t) {
    return new lt(
      this.comparator_,
      this.root_
        .insert(e, t, this.comparator_)
        .copy(null, null, at.BLACK, null, null)
    );
  }
  remove(e) {
    return new lt(
      this.comparator_,
      this.root_
        .remove(e, this.comparator_)
        .copy(null, null, at.BLACK, null, null)
    );
  }
  get(e) {
    let t,
      n = this.root_;
    for (; !n.isEmpty(); ) {
      if (((t = this.comparator_(e, n.key)), 0 === t)) return n.value;
      t < 0 ? (n = n.left) : t > 0 && (n = n.right);
    }
    return null;
  }
  getPredecessorKey(e) {
    let t,
      n = this.root_,
      i = null;
    for (; !n.isEmpty(); ) {
      if (((t = this.comparator_(e, n.key)), 0 === t)) {
        if (n.left.isEmpty()) return i ? i.key : null;
        for (n = n.left; !n.right.isEmpty(); ) n = n.right;
        return n.key;
      }
      t < 0 ? (n = n.left) : t > 0 && ((i = n), (n = n.right));
    }
    throw new Error(
      "Attempted to find predecessor key for a nonexistent key.  What gives?"
    );
  }
  isEmpty() {
    return this.root_.isEmpty();
  }
  count() {
    return this.root_.count();
  }
  minKey() {
    return this.root_.minKey();
  }
  maxKey() {
    return this.root_.maxKey();
  }
  inorderTraversal(e) {
    return this.root_.inorderTraversal(e);
  }
  reverseTraversal(e) {
    return this.root_.reverseTraversal(e);
  }
  getIterator(e) {
    return new ot(this.root_, null, this.comparator_, !1, e);
  }
  getIteratorFrom(e, t) {
    return new ot(this.root_, e, this.comparator_, !1, t);
  }
  getReverseIteratorFrom(e, t) {
    return new ot(this.root_, e, this.comparator_, !0, t);
  }
  getReverseIterator(e) {
    return new ot(this.root_, null, this.comparator_, !0, e);
  }
}
function ht(e, t) {
  return re(e.name, t.name);
}
function ct(e, t) {
  return re(e, t);
}
let ut;
lt.EMPTY_NODE = new (class {
  copy(e, t, n, i, s) {
    return this;
  }
  insert(e, t, n) {
    return new at(e, t, null);
  }
  remove(e, t) {
    return this;
  }
  count() {
    return 0;
  }
  isEmpty() {
    return !0;
  }
  inorderTraversal(e) {
    return !1;
  }
  reverseTraversal(e) {
    return !1;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  check_() {
    return 0;
  }
  isRed_() {
    return !1;
  }
})();
const dt = function (e) {
    return "number" == typeof e ? "number:" + ue(e) : "string:" + e;
  },
  _t = function (e) {
    if (e.isLeafNode()) {
      const t = e.val();
      a(
        "string" == typeof t ||
          "number" == typeof t ||
          ("object" == typeof t && T(t, ".sv")),
        "Priority must be a string or number."
      );
    } else a(e === ut || e.isEmpty(), "priority of unexpected type.");
    a(
      e === ut || e.getPriority().isEmpty(),
      "Priority nodes can't have a priority of their own."
    );
  };
let pt, ft, gt;
class mt {
  constructor(e, t = mt.__childrenNodeConstructor.EMPTY_NODE) {
    (this.value_ = e),
      (this.priorityNode_ = t),
      (this.lazyHash_ = null),
      a(
        void 0 !== this.value_ && null !== this.value_,
        "LeafNode shouldn't be created with null/undefined value."
      ),
      _t(this.priorityNode_);
  }
  static set __childrenNodeConstructor(e) {
    pt = e;
  }
  static get __childrenNodeConstructor() {
    return pt;
  }
  isLeafNode() {
    return !0;
  }
  getPriority() {
    return this.priorityNode_;
  }
  updatePriority(e) {
    return new mt(this.value_, e);
  }
  getImmediateChild(e) {
    return ".priority" === e
      ? this.priorityNode_
      : mt.__childrenNodeConstructor.EMPTY_NODE;
  }
  getChild(e) {
    return ze(e)
      ? this
      : ".priority" === qe(e)
      ? this.priorityNode_
      : mt.__childrenNodeConstructor.EMPTY_NODE;
  }
  hasChild() {
    return !1;
  }
  getPredecessorChildName(e, t) {
    return null;
  }
  updateImmediateChild(e, t) {
    return ".priority" === e
      ? this.updatePriority(t)
      : t.isEmpty() && ".priority" !== e
      ? this
      : mt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
          e,
          t
        ).updatePriority(this.priorityNode_);
  }
  updateChild(e, t) {
    const n = qe(e);
    return null === n
      ? t
      : t.isEmpty() && ".priority" !== n
      ? this
      : (a(
          ".priority" !== n || 1 === We(e),
          ".priority must be the last token in a path"
        ),
        this.updateImmediateChild(
          n,
          mt.__childrenNodeConstructor.EMPTY_NODE.updateChild(Ue(e), t)
        ));
  }
  isEmpty() {
    return !1;
  }
  numChildren() {
    return 0;
  }
  forEachChild(e, t) {
    return !1;
  }
  val(e) {
    return e && !this.getPriority().isEmpty()
      ? { ".value": this.getValue(), ".priority": this.getPriority().val() }
      : this.getValue();
  }
  hash() {
    if (null === this.lazyHash_) {
      let e = "";
      this.priorityNode_.isEmpty() ||
        (e += "priority:" + dt(this.priorityNode_.val()) + ":");
      const t = typeof this.value_;
      (e += t + ":"),
        (e += "number" === t ? ue(this.value_) : this.value_),
        (this.lazyHash_ = Y(e));
    }
    return this.lazyHash_;
  }
  getValue() {
    return this.value_;
  }
  compareTo(e) {
    return e === mt.__childrenNodeConstructor.EMPTY_NODE
      ? 1
      : e instanceof mt.__childrenNodeConstructor
      ? -1
      : (a(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e));
  }
  compareToLeafNode_(e) {
    const t = typeof e.value_,
      n = typeof this.value_,
      i = mt.VALUE_TYPE_ORDER.indexOf(t),
      s = mt.VALUE_TYPE_ORDER.indexOf(n);
    return (
      a(i >= 0, "Unknown leaf type: " + t),
      a(s >= 0, "Unknown leaf type: " + n),
      i === s
        ? "object" === n
          ? 0
          : this.value_ < e.value_
          ? -1
          : this.value_ === e.value_
          ? 0
          : 1
        : s - i
    );
  }
  withIndex() {
    return this;
  }
  isIndexed() {
    return !0;
  }
  equals(e) {
    if (e === this) return !0;
    if (e.isLeafNode()) {
      const t = e;
      return (
        this.value_ === t.value_ && this.priorityNode_.equals(t.priorityNode_)
      );
    }
    return !1;
  }
}
mt.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
const yt = new (class extends nt {
    compare(e, t) {
      const n = e.node.getPriority(),
        i = t.node.getPriority(),
        s = n.compareTo(i);
      return 0 === s ? re(e.name, t.name) : s;
    }
    isDefinedOn(e) {
      return !e.getPriority().isEmpty();
    }
    indexedValueChanged(e, t) {
      return !e.getPriority().equals(t.getPriority());
    }
    minPost() {
      return tt.MIN;
    }
    maxPost() {
      return new tt(se, new mt("[PRIORITY-POST]", gt));
    }
    makePost(e, t) {
      const n = ft(e);
      return new tt(t, new mt("[PRIORITY-POST]", n));
    }
    toString() {
      return ".priority";
    }
  })(),
  vt = Math.log(2);
class Ct {
  constructor(e) {
    var t;
    (this.count = ((t = e + 1), parseInt(Math.log(t) / vt, 10))),
      (this.current_ = this.count - 1);
    const n = ((i = this.count), parseInt(Array(i + 1).join("1"), 2));
    var i;
    this.bits_ = (e + 1) & n;
  }
  nextBitIsOne() {
    const e = !(this.bits_ & (1 << this.current_));
    return this.current_--, e;
  }
}
const wt = function (e, t, n, i) {
  e.sort(t);
  const s = function (t, i) {
      const r = i - t;
      let o, a;
      if (0 === r) return null;
      if (1 === r)
        return (
          (o = e[t]),
          (a = n ? n(o) : o),
          new at(a, o.node, at.BLACK, null, null)
        );
      {
        const l = parseInt(r / 2, 10) + t,
          h = s(t, l),
          c = s(l + 1, i);
        return (
          (o = e[l]), (a = n ? n(o) : o), new at(a, o.node, at.BLACK, h, c)
        );
      }
    },
    r = (function (t) {
      let i = null,
        r = null,
        o = e.length;
      const a = function (t, i) {
          const r = o - t,
            a = o;
          o -= t;
          const h = s(r + 1, a),
            c = e[r],
            u = n ? n(c) : c;
          l(new at(u, c.node, i, null, h));
        },
        l = function (e) {
          i ? ((i.left = e), (i = e)) : ((r = e), (i = e));
        };
      for (let e = 0; e < t.count; ++e) {
        const n = t.nextBitIsOne(),
          i = Math.pow(2, t.count - (e + 1));
        n ? a(i, at.BLACK) : (a(i, at.BLACK), a(i, at.RED));
      }
      return r;
    })(new Ct(e.length));
  return new lt(i || t, r);
};
let Tt;
const bt = {};
class Et {
  constructor(e, t) {
    (this.indexes_ = e), (this.indexSet_ = t);
  }
  static get Default() {
    return (
      a(bt && yt, "ChildrenNode.ts has not been loaded"),
      (Tt = Tt || new Et({ ".priority": bt }, { ".priority": yt })),
      Tt
    );
  }
  get(e) {
    const t = b(this.indexes_, e);
    if (!t) throw new Error("No index defined for " + e);
    return t instanceof lt ? t : null;
  }
  hasIndex(e) {
    return T(this.indexSet_, e.toString());
  }
  addIndex(e, t) {
    a(
      e !== rt,
      "KeyIndex always exists and isn't meant to be added to the IndexMap."
    );
    const n = [];
    let i = !1;
    const s = t.getIterator(tt.Wrap);
    let r,
      o = s.getNext();
    for (; o; ) (i = i || e.isDefinedOn(o.node)), n.push(o), (o = s.getNext());
    r = i ? wt(n, e.getCompare()) : bt;
    const l = e.toString(),
      h = Object.assign({}, this.indexSet_);
    h[l] = e;
    const c = Object.assign({}, this.indexes_);
    return (c[l] = r), new Et(c, h);
  }
  addToIndexes(e, t) {
    const n = I(this.indexes_, (n, i) => {
      const s = b(this.indexSet_, i);
      if ((a(s, "Missing index implementation for " + i), n === bt)) {
        if (s.isDefinedOn(e.node)) {
          const n = [],
            i = t.getIterator(tt.Wrap);
          let r = i.getNext();
          for (; r; ) r.name !== e.name && n.push(r), (r = i.getNext());
          return n.push(e), wt(n, s.getCompare());
        }
        return bt;
      }
      {
        const i = t.get(e.name);
        let s = n;
        return i && (s = s.remove(new tt(e.name, i))), s.insert(e, e.node);
      }
    });
    return new Et(n, this.indexSet_);
  }
  removeFromIndexes(e, t) {
    const n = I(this.indexes_, (n) => {
      if (n === bt) return n;
      {
        const i = t.get(e.name);
        return i ? n.remove(new tt(e.name, i)) : n;
      }
    });
    return new Et(n, this.indexSet_);
  }
}
let It;
class St {
  constructor(e, t, n) {
    (this.children_ = e),
      (this.priorityNode_ = t),
      (this.indexMap_ = n),
      (this.lazyHash_ = null),
      this.priorityNode_ && _t(this.priorityNode_),
      this.children_.isEmpty() &&
        a(
          !this.priorityNode_ || this.priorityNode_.isEmpty(),
          "An empty node cannot have a priority"
        );
  }
  static get EMPTY_NODE() {
    return It || (It = new St(new lt(ct), null, Et.Default));
  }
  isLeafNode() {
    return !1;
  }
  getPriority() {
    return this.priorityNode_ || It;
  }
  updatePriority(e) {
    return this.children_.isEmpty()
      ? this
      : new St(this.children_, e, this.indexMap_);
  }
  getImmediateChild(e) {
    if (".priority" === e) return this.getPriority();
    {
      const t = this.children_.get(e);
      return null === t ? It : t;
    }
  }
  getChild(e) {
    const t = qe(e);
    return null === t ? this : this.getImmediateChild(t).getChild(Ue(e));
  }
  hasChild(e) {
    return null !== this.children_.get(e);
  }
  updateImmediateChild(e, t) {
    if ((a(t, "We should always be passing snapshot nodes"), ".priority" === e))
      return this.updatePriority(t);
    {
      const n = new tt(e, t);
      let i, s;
      t.isEmpty()
        ? ((i = this.children_.remove(e)),
          (s = this.indexMap_.removeFromIndexes(n, this.children_)))
        : ((i = this.children_.insert(e, t)),
          (s = this.indexMap_.addToIndexes(n, this.children_)));
      const r = i.isEmpty() ? It : this.priorityNode_;
      return new St(i, r, s);
    }
  }
  updateChild(e, t) {
    const n = qe(e);
    if (null === n) return t;
    {
      a(
        ".priority" !== qe(e) || 1 === We(e),
        ".priority must be the last token in a path"
      );
      const i = this.getImmediateChild(n).updateChild(Ue(e), t);
      return this.updateImmediateChild(n, i);
    }
  }
  isEmpty() {
    return this.children_.isEmpty();
  }
  numChildren() {
    return this.children_.count();
  }
  val(e) {
    if (this.isEmpty()) return null;
    const t = {};
    let n = 0,
      i = 0,
      s = !0;
    if (
      (this.forEachChild(yt, (r, o) => {
        (t[r] = o.val(e)),
          n++,
          s && St.INTEGER_REGEXP_.test(r)
            ? (i = Math.max(i, Number(r)))
            : (s = !1);
      }),
      !e && s && i < 2 * n)
    ) {
      const e = [];
      for (const n in t) e[n] = t[n];
      return e;
    }
    return (
      e &&
        !this.getPriority().isEmpty() &&
        (t[".priority"] = this.getPriority().val()),
      t
    );
  }
  hash() {
    if (null === this.lazyHash_) {
      let e = "";
      this.getPriority().isEmpty() ||
        (e += "priority:" + dt(this.getPriority().val()) + ":"),
        this.forEachChild(yt, (t, n) => {
          const i = n.hash();
          "" !== i && (e += ":" + t + ":" + i);
        }),
        (this.lazyHash_ = "" === e ? "" : Y(e));
    }
    return this.lazyHash_;
  }
  getPredecessorChildName(e, t, n) {
    const i = this.resolveIndex_(n);
    if (i) {
      const n = i.getPredecessorKey(new tt(e, t));
      return n ? n.name : null;
    }
    return this.children_.getPredecessorKey(e);
  }
  getFirstChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const e = t.minKey();
      return e && e.name;
    }
    return this.children_.minKey();
  }
  getFirstChild(e) {
    const t = this.getFirstChildName(e);
    return t ? new tt(t, this.children_.get(t)) : null;
  }
  getLastChildName(e) {
    const t = this.resolveIndex_(e);
    if (t) {
      const e = t.maxKey();
      return e && e.name;
    }
    return this.children_.maxKey();
  }
  getLastChild(e) {
    const t = this.getLastChildName(e);
    return t ? new tt(t, this.children_.get(t)) : null;
  }
  forEachChild(e, t) {
    const n = this.resolveIndex_(e);
    return n
      ? n.inorderTraversal((e) => t(e.name, e.node))
      : this.children_.inorderTraversal(t);
  }
  getIterator(e) {
    return this.getIteratorFrom(e.minPost(), e);
  }
  getIteratorFrom(e, t) {
    const n = this.resolveIndex_(t);
    if (n) return n.getIteratorFrom(e, (e) => e);
    {
      const n = this.children_.getIteratorFrom(e.name, tt.Wrap);
      let i = n.peek();
      for (; null != i && t.compare(i, e) < 0; ) n.getNext(), (i = n.peek());
      return n;
    }
  }
  getReverseIterator(e) {
    return this.getReverseIteratorFrom(e.maxPost(), e);
  }
  getReverseIteratorFrom(e, t) {
    const n = this.resolveIndex_(t);
    if (n) return n.getReverseIteratorFrom(e, (e) => e);
    {
      const n = this.children_.getReverseIteratorFrom(e.name, tt.Wrap);
      let i = n.peek();
      for (; null != i && t.compare(i, e) > 0; ) n.getNext(), (i = n.peek());
      return n;
    }
  }
  compareTo(e) {
    return this.isEmpty()
      ? e.isEmpty()
        ? 0
        : -1
      : e.isLeafNode() || e.isEmpty()
      ? 1
      : e === kt
      ? -1
      : 0;
  }
  withIndex(e) {
    if (e === rt || this.indexMap_.hasIndex(e)) return this;
    {
      const t = this.indexMap_.addIndex(e, this.children_);
      return new St(this.children_, this.priorityNode_, t);
    }
  }
  isIndexed(e) {
    return e === rt || this.indexMap_.hasIndex(e);
  }
  equals(e) {
    if (e === this) return !0;
    if (e.isLeafNode()) return !1;
    {
      const t = e;
      if (this.getPriority().equals(t.getPriority())) {
        if (this.children_.count() === t.children_.count()) {
          const e = this.getIterator(yt),
            n = t.getIterator(yt);
          let i = e.getNext(),
            s = n.getNext();
          for (; i && s; ) {
            if (i.name !== s.name || !i.node.equals(s.node)) return !1;
            (i = e.getNext()), (s = n.getNext());
          }
          return null === i && null === s;
        }
        return !1;
      }
      return !1;
    }
  }
  resolveIndex_(e) {
    return e === rt ? null : this.indexMap_.get(e.toString());
  }
}
St.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
const kt = new (class extends St {
  constructor() {
    super(new lt(ct), St.EMPTY_NODE, Et.Default);
  }
  compareTo(e) {
    return e === this ? 0 : 1;
  }
  equals(e) {
    return e === this;
  }
  getPriority() {
    return this;
  }
  getImmediateChild(e) {
    return St.EMPTY_NODE;
  }
  isEmpty() {
    return !1;
  }
})();
Object.defineProperties(tt, {
  MIN: { value: new tt(ie, St.EMPTY_NODE) },
  MAX: { value: new tt(se, kt) },
}),
  (st.__EMPTY_NODE = St.EMPTY_NODE),
  (mt.__childrenNodeConstructor = St),
  (ut = kt),
  (function (e) {
    gt = e;
  })(kt);
function Nt(e, t = null) {
  if (null === e) return St.EMPTY_NODE;
  if (
    ("object" == typeof e && ".priority" in e && (t = e[".priority"]),
    a(
      null === t ||
        "string" == typeof t ||
        "number" == typeof t ||
        ("object" == typeof t && ".sv" in t),
      "Invalid priority type found: " + typeof t
    ),
    "object" == typeof e &&
      ".value" in e &&
      null !== e[".value"] &&
      (e = e[".value"]),
    "object" != typeof e || ".sv" in e)
  ) {
    return new mt(e, Nt(t));
  }
  if (e instanceof Array) {
    let n = St.EMPTY_NODE;
    return (
      ce(e, (t, i) => {
        if (T(e, t) && "." !== t.substring(0, 1)) {
          const e = Nt(i);
          (!e.isLeafNode() && e.isEmpty()) ||
            (n = n.updateImmediateChild(t, e));
        }
      }),
      n.updatePriority(Nt(t))
    );
  }
  {
    const n = [];
    let i = !1;
    if (
      (ce(e, (e, t) => {
        if ("." !== e.substring(0, 1)) {
          const s = Nt(t);
          s.isEmpty() ||
            ((i = i || !s.getPriority().isEmpty()), n.push(new tt(e, s)));
        }
      }),
      0 === n.length)
    )
      return St.EMPTY_NODE;
    const s = wt(n, ht, (e) => e.name, ct);
    if (i) {
      const e = wt(n, yt.getCompare());
      return new St(s, Nt(t), new Et({ ".priority": e }, { ".priority": yt }));
    }
    return new St(s, Nt(t), Et.Default);
  }
}
!(function (e) {
  ft = e;
})(Nt);
class Pt extends nt {
  constructor(e) {
    super(),
      (this.indexPath_ = e),
      a(
        !ze(e) && ".priority" !== qe(e),
        "Can't create PathIndex with empty path or .priority key"
      );
  }
  extractChild(e) {
    return e.getChild(this.indexPath_);
  }
  isDefinedOn(e) {
    return !e.getChild(this.indexPath_).isEmpty();
  }
  compare(e, t) {
    const n = this.extractChild(e.node),
      i = this.extractChild(t.node),
      s = n.compareTo(i);
    return 0 === s ? re(e.name, t.name) : s;
  }
  makePost(e, t) {
    const n = Nt(e),
      i = St.EMPTY_NODE.updateChild(this.indexPath_, n);
    return new tt(t, i);
  }
  maxPost() {
    const e = St.EMPTY_NODE.updateChild(this.indexPath_, kt);
    return new tt(se, e);
  }
  toString() {
    return je(this.indexPath_, 0).join("/");
  }
}
const xt = new (class extends nt {
    compare(e, t) {
      const n = e.node.compareTo(t.node);
      return 0 === n ? re(e.name, t.name) : n;
    }
    isDefinedOn(e) {
      return !0;
    }
    indexedValueChanged(e, t) {
      return !e.equals(t);
    }
    minPost() {
      return tt.MIN;
    }
    maxPost() {
      return tt.MAX;
    }
    makePost(e, t) {
      const n = Nt(e);
      return new tt(t, n);
    }
    toString() {
      return ".value";
    }
  })(),
  Rt = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
  Dt = (function () {
    let e = 0;
    const t = [];
    return function (n) {
      const i = n === e;
      let s;
      e = n;
      const r = new Array(8);
      for (s = 7; s >= 0; s--)
        (r[s] = Rt.charAt(n % 64)), (n = Math.floor(n / 64));
      a(0 === n, "Cannot push at time == 0");
      let o = r.join("");
      if (i) {
        for (s = 11; s >= 0 && 63 === t[s]; s--) t[s] = 0;
        t[s]++;
      } else for (s = 0; s < 12; s++) t[s] = Math.floor(64 * Math.random());
      for (s = 0; s < 12; s++) o += Rt.charAt(t[s]);
      return a(20 === o.length, "nextPushId: Length should be 20."), o;
    };
  })(),
  At = function (e) {
    if ("2147483647" === e) return "-";
    const t = _e(e);
    if (null != t) return "" + (t + 1);
    const n = new Array(e.length);
    for (let t = 0; t < n.length; t++) n[t] = e.charAt(t);
    if (n.length < 786) return n.push("-"), n.join("");
    let i = n.length - 1;
    for (; i >= 0 && "z" === n[i]; ) i--;
    if (-1 === i) return se;
    const s = n[i],
      r = Rt.charAt(Rt.indexOf(s) + 1);
    return (n[i] = r), n.slice(0, i + 1).join("");
  },
  Ot = function (e) {
    if ("-2147483648" === e) return ie;
    const t = _e(e);
    if (null != t) return "" + (t - 1);
    const n = new Array(e.length);
    for (let t = 0; t < n.length; t++) n[t] = e.charAt(t);
    return "-" === n[n.length - 1]
      ? 1 === n.length
        ? "2147483647"
        : (delete n[n.length - 1], n.join(""))
      : ((n[n.length - 1] = Rt.charAt(Rt.indexOf(n[n.length - 1]) - 1)),
        n.join("") + "z".repeat(786 - n.length));
  };
function Lt(e) {
  return { type: "value", snapshotNode: e };
}
function Mt(e, t) {
  return { type: "child_added", snapshotNode: t, childName: e };
}
function Ft(e, t) {
  return { type: "child_removed", snapshotNode: t, childName: e };
}
function qt(e, t, n) {
  return { type: "child_changed", snapshotNode: t, childName: e, oldSnap: n };
}
class Wt {
  constructor(e) {
    this.index_ = e;
  }
  updateChild(e, t, n, i, s, r) {
    a(
      e.isIndexed(this.index_),
      "A node must be indexed if only a child is updated"
    );
    const o = e.getImmediateChild(t);
    return o.getChild(i).equals(n.getChild(i)) && o.isEmpty() === n.isEmpty()
      ? e
      : (null != r &&
          (n.isEmpty()
            ? e.hasChild(t)
              ? r.trackChildChange(Ft(t, o))
              : a(
                  e.isLeafNode(),
                  "A child remove without an old child only makes sense on a leaf node"
                )
            : o.isEmpty()
            ? r.trackChildChange(Mt(t, n))
            : r.trackChildChange(qt(t, n, o))),
        e.isLeafNode() && n.isEmpty()
          ? e
          : e.updateImmediateChild(t, n).withIndex(this.index_));
  }
  updateFullNode(e, t, n) {
    return (
      null != n &&
        (e.isLeafNode() ||
          e.forEachChild(yt, (e, i) => {
            t.hasChild(e) || n.trackChildChange(Ft(e, i));
          }),
        t.isLeafNode() ||
          t.forEachChild(yt, (t, i) => {
            if (e.hasChild(t)) {
              const s = e.getImmediateChild(t);
              s.equals(i) || n.trackChildChange(qt(t, i, s));
            } else n.trackChildChange(Mt(t, i));
          })),
      t.withIndex(this.index_)
    );
  }
  updatePriority(e, t) {
    return e.isEmpty() ? St.EMPTY_NODE : e.updatePriority(t);
  }
  filtersNodes() {
    return !1;
  }
  getIndexedFilter() {
    return this;
  }
  getIndex() {
    return this.index_;
  }
}
class Ut {
  constructor(e) {
    (this.indexedFilter_ = new Wt(e.getIndex())),
      (this.index_ = e.getIndex()),
      (this.startPost_ = Ut.getStartPost_(e)),
      (this.endPost_ = Ut.getEndPost_(e));
  }
  getStartPost() {
    return this.startPost_;
  }
  getEndPost() {
    return this.endPost_;
  }
  matches(e) {
    return (
      this.index_.compare(this.getStartPost(), e) <= 0 &&
      this.index_.compare(e, this.getEndPost()) <= 0
    );
  }
  updateChild(e, t, n, i, s, r) {
    return (
      this.matches(new tt(t, n)) || (n = St.EMPTY_NODE),
      this.indexedFilter_.updateChild(e, t, n, i, s, r)
    );
  }
  updateFullNode(e, t, n) {
    t.isLeafNode() && (t = St.EMPTY_NODE);
    let i = t.withIndex(this.index_);
    i = i.updatePriority(St.EMPTY_NODE);
    const s = this;
    return (
      t.forEachChild(yt, (e, t) => {
        s.matches(new tt(e, t)) ||
          (i = i.updateImmediateChild(e, St.EMPTY_NODE));
      }),
      this.indexedFilter_.updateFullNode(e, i, n)
    );
  }
  updatePriority(e, t) {
    return e;
  }
  filtersNodes() {
    return !0;
  }
  getIndexedFilter() {
    return this.indexedFilter_;
  }
  getIndex() {
    return this.index_;
  }
  static getStartPost_(e) {
    if (e.hasStart()) {
      const t = e.getIndexStartName();
      return e.getIndex().makePost(e.getIndexStartValue(), t);
    }
    return e.getIndex().minPost();
  }
  static getEndPost_(e) {
    if (e.hasEnd()) {
      const t = e.getIndexEndName();
      return e.getIndex().makePost(e.getIndexEndValue(), t);
    }
    return e.getIndex().maxPost();
  }
}
class Bt {
  constructor(e) {
    (this.rangedFilter_ = new Ut(e)),
      (this.index_ = e.getIndex()),
      (this.limit_ = e.getLimit()),
      (this.reverse_ = !e.isViewFromLeft());
  }
  updateChild(e, t, n, i, s, r) {
    return (
      this.rangedFilter_.matches(new tt(t, n)) || (n = St.EMPTY_NODE),
      e.getImmediateChild(t).equals(n)
        ? e
        : e.numChildren() < this.limit_
        ? this.rangedFilter_.getIndexedFilter().updateChild(e, t, n, i, s, r)
        : this.fullLimitUpdateChild_(e, t, n, s, r)
    );
  }
  updateFullNode(e, t, n) {
    let i;
    if (t.isLeafNode() || t.isEmpty()) i = St.EMPTY_NODE.withIndex(this.index_);
    else if (2 * this.limit_ < t.numChildren() && t.isIndexed(this.index_)) {
      let e;
      (i = St.EMPTY_NODE.withIndex(this.index_)),
        (e = this.reverse_
          ? t.getReverseIteratorFrom(
              this.rangedFilter_.getEndPost(),
              this.index_
            )
          : t.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_));
      let n = 0;
      for (; e.hasNext() && n < this.limit_; ) {
        const t = e.getNext();
        let s;
        if (
          ((s = this.reverse_
            ? this.index_.compare(this.rangedFilter_.getStartPost(), t) <= 0
            : this.index_.compare(t, this.rangedFilter_.getEndPost()) <= 0),
          !s)
        )
          break;
        (i = i.updateImmediateChild(t.name, t.node)), n++;
      }
    } else {
      let e, n, s, r;
      if (
        ((i = t.withIndex(this.index_)),
        (i = i.updatePriority(St.EMPTY_NODE)),
        this.reverse_)
      ) {
        (r = i.getReverseIterator(this.index_)),
          (e = this.rangedFilter_.getEndPost()),
          (n = this.rangedFilter_.getStartPost());
        const t = this.index_.getCompare();
        s = (e, n) => t(n, e);
      } else
        (r = i.getIterator(this.index_)),
          (e = this.rangedFilter_.getStartPost()),
          (n = this.rangedFilter_.getEndPost()),
          (s = this.index_.getCompare());
      let o = 0,
        a = !1;
      for (; r.hasNext(); ) {
        const t = r.getNext();
        !a && s(e, t) <= 0 && (a = !0);
        a && o < this.limit_ && s(t, n) <= 0
          ? o++
          : (i = i.updateImmediateChild(t.name, St.EMPTY_NODE));
      }
    }
    return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, n);
  }
  updatePriority(e, t) {
    return e;
  }
  filtersNodes() {
    return !0;
  }
  getIndexedFilter() {
    return this.rangedFilter_.getIndexedFilter();
  }
  getIndex() {
    return this.index_;
  }
  fullLimitUpdateChild_(e, t, n, i, s) {
    let r;
    if (this.reverse_) {
      const e = this.index_.getCompare();
      r = (t, n) => e(n, t);
    } else r = this.index_.getCompare();
    const o = e;
    a(o.numChildren() === this.limit_, "");
    const l = new tt(t, n),
      h = this.reverse_
        ? o.getFirstChild(this.index_)
        : o.getLastChild(this.index_),
      c = this.rangedFilter_.matches(l);
    if (o.hasChild(t)) {
      const e = o.getImmediateChild(t);
      let a = i.getChildAfterChild(this.index_, h, this.reverse_);
      for (; null != a && (a.name === t || o.hasChild(a.name)); )
        a = i.getChildAfterChild(this.index_, a, this.reverse_);
      const u = null == a ? 1 : r(a, l);
      if (c && !n.isEmpty() && u >= 0)
        return (
          null != s && s.trackChildChange(qt(t, n, e)),
          o.updateImmediateChild(t, n)
        );
      {
        null != s && s.trackChildChange(Ft(t, e));
        const n = o.updateImmediateChild(t, St.EMPTY_NODE);
        return null != a && this.rangedFilter_.matches(a)
          ? (null != s && s.trackChildChange(Mt(a.name, a.node)),
            n.updateImmediateChild(a.name, a.node))
          : n;
      }
    }
    return n.isEmpty()
      ? e
      : c && r(h, l) >= 0
      ? (null != s &&
          (s.trackChildChange(Ft(h.name, h.node)),
          s.trackChildChange(Mt(t, n))),
        o
          .updateImmediateChild(t, n)
          .updateImmediateChild(h.name, St.EMPTY_NODE))
      : e;
  }
}
class jt {
  constructor() {
    (this.limitSet_ = !1),
      (this.startSet_ = !1),
      (this.startNameSet_ = !1),
      (this.startAfterSet_ = !1),
      (this.endSet_ = !1),
      (this.endNameSet_ = !1),
      (this.endBeforeSet_ = !1),
      (this.limit_ = 0),
      (this.viewFrom_ = ""),
      (this.indexStartValue_ = null),
      (this.indexStartName_ = ""),
      (this.indexEndValue_ = null),
      (this.indexEndName_ = ""),
      (this.index_ = yt);
  }
  hasStart() {
    return this.startSet_;
  }
  hasStartAfter() {
    return this.startAfterSet_;
  }
  hasEndBefore() {
    return this.endBeforeSet_;
  }
  isViewFromLeft() {
    return "" === this.viewFrom_ ? this.startSet_ : "l" === this.viewFrom_;
  }
  getIndexStartValue() {
    return (
      a(this.startSet_, "Only valid if start has been set"),
      this.indexStartValue_
    );
  }
  getIndexStartName() {
    return (
      a(this.startSet_, "Only valid if start has been set"),
      this.startNameSet_ ? this.indexStartName_ : ie
    );
  }
  hasEnd() {
    return this.endSet_;
  }
  getIndexEndValue() {
    return (
      a(this.endSet_, "Only valid if end has been set"), this.indexEndValue_
    );
  }
  getIndexEndName() {
    return (
      a(this.endSet_, "Only valid if end has been set"),
      this.endNameSet_ ? this.indexEndName_ : se
    );
  }
  hasLimit() {
    return this.limitSet_;
  }
  hasAnchoredLimit() {
    return this.limitSet_ && "" !== this.viewFrom_;
  }
  getLimit() {
    return a(this.limitSet_, "Only valid if limit has been set"), this.limit_;
  }
  getIndex() {
    return this.index_;
  }
  loadsAllData() {
    return !(this.startSet_ || this.endSet_ || this.limitSet_);
  }
  isDefault() {
    return this.loadsAllData() && this.index_ === yt;
  }
  copy() {
    const e = new jt();
    return (
      (e.limitSet_ = this.limitSet_),
      (e.limit_ = this.limit_),
      (e.startSet_ = this.startSet_),
      (e.indexStartValue_ = this.indexStartValue_),
      (e.startNameSet_ = this.startNameSet_),
      (e.indexStartName_ = this.indexStartName_),
      (e.endSet_ = this.endSet_),
      (e.indexEndValue_ = this.indexEndValue_),
      (e.endNameSet_ = this.endNameSet_),
      (e.indexEndName_ = this.indexEndName_),
      (e.index_ = this.index_),
      (e.viewFrom_ = this.viewFrom_),
      e
    );
  }
}
function Ht(e, t, n) {
  const i = e.copy();
  return (
    (i.startSet_ = !0),
    void 0 === t && (t = null),
    (i.indexStartValue_ = t),
    null != n
      ? ((i.startNameSet_ = !0), (i.indexStartName_ = n))
      : ((i.startNameSet_ = !1), (i.indexStartName_ = "")),
    i
  );
}
function Vt(e, t, n) {
  const i = e.copy();
  return (
    (i.endSet_ = !0),
    void 0 === t && (t = null),
    (i.indexEndValue_ = t),
    void 0 !== n
      ? ((i.endNameSet_ = !0), (i.indexEndName_ = n))
      : ((i.endNameSet_ = !1), (i.indexEndName_ = "")),
    i
  );
}
function zt(e, t) {
  const n = e.copy();
  return (n.index_ = t), n;
}
function Yt(e) {
  const t = {};
  if (e.isDefault()) return t;
  let n;
  return (
    e.index_ === yt
      ? (n = "$priority")
      : e.index_ === xt
      ? (n = "$value")
      : e.index_ === rt
      ? (n = "$key")
      : (a(e.index_ instanceof Pt, "Unrecognized index type!"),
        (n = e.index_.toString())),
    (t.orderBy = C(n)),
    e.startSet_ &&
      ((t.startAt = C(e.indexStartValue_)),
      e.startNameSet_ && (t.startAt += "," + C(e.indexStartName_))),
    e.endSet_ &&
      ((t.endAt = C(e.indexEndValue_)),
      e.endNameSet_ && (t.endAt += "," + C(e.indexEndName_))),
    e.limitSet_ &&
      (e.isViewFromLeft()
        ? (t.limitToFirst = e.limit_)
        : (t.limitToLast = e.limit_)),
    t
  );
}
function Kt(e) {
  const t = {};
  if (
    (e.startSet_ &&
      ((t.sp = e.indexStartValue_),
      e.startNameSet_ && (t.sn = e.indexStartName_)),
    e.endSet_ &&
      ((t.ep = e.indexEndValue_), e.endNameSet_ && (t.en = e.indexEndName_)),
    e.limitSet_)
  ) {
    t.l = e.limit_;
    let n = e.viewFrom_;
    "" === n && (n = e.isViewFromLeft() ? "l" : "r"), (t.vf = n);
  }
  return e.index_ !== yt && (t.i = e.index_.toString()), t;
}
class Qt extends Ae {
  constructor(e, t, n, i) {
    super(),
      (this.repoInfo_ = e),
      (this.onDataUpdate_ = t),
      (this.authTokenProvider_ = n),
      (this.appCheckTokenProvider_ = i),
      (this.log_ = X("p:rest:")),
      (this.listens_ = {});
  }
  reportStats(e) {
    throw new Error("Method not implemented.");
  }
  static getListenId_(e, t) {
    return void 0 !== t
      ? "tag$" + t
      : (a(
          e._queryParams.isDefault(),
          "should have a tag if it's not a default query."
        ),
        e._path.toString());
  }
  listen(e, t, n, i) {
    const s = e._path.toString();
    this.log_("Listen called for " + s + " " + e._queryIdentifier);
    const r = Qt.getListenId_(e, n),
      o = {};
    this.listens_[r] = o;
    const a = Yt(e._queryParams);
    this.restRequest_(s + ".json", a, (e, t) => {
      let a = t;
      if (
        (404 === e && ((a = null), (e = null)),
        null === e && this.onDataUpdate_(s, a, !1, n),
        b(this.listens_, r) === o)
      ) {
        let t;
        (t = e ? (401 === e ? "permission_denied" : "rest_error:" + e) : "ok"),
          i(t, null);
      }
    });
  }
  unlisten(e, t) {
    const n = Qt.getListenId_(e, t);
    delete this.listens_[n];
  }
  get(e) {
    const t = Yt(e._queryParams),
      n = e._path.toString(),
      i = new g();
    return (
      this.restRequest_(n + ".json", t, (e, t) => {
        let s = t;
        404 === e && ((s = null), (e = null)),
          null === e
            ? (this.onDataUpdate_(n, s, !1, null), i.resolve(s))
            : i.reject(new Error(s));
      }),
      i.promise
    );
  }
  refreshAuthToken(e) {}
  restRequest_(e, t = {}, n) {
    return (
      (t.format = "export"),
      Promise.all([
        this.authTokenProvider_.getToken(!1),
        this.appCheckTokenProvider_.getToken(!1),
      ]).then(([i, s]) => {
        i && i.accessToken && (t.auth = i.accessToken),
          s && s.token && (t.ac = s.token);
        const r =
          (this.repoInfo_.secure ? "https://" : "http://") +
          this.repoInfo_.host +
          e +
          "?ns=" +
          this.repoInfo_.namespace +
          (function (e) {
            const t = [];
            for (const [n, i] of Object.entries(e))
              Array.isArray(i)
                ? i.forEach((e) => {
                    t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
                  })
                : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
            return t.length ? "&" + t.join("&") : "";
          })(t);
        this.log_("Sending REST request for " + r);
        const o = new XMLHttpRequest();
        (o.onreadystatechange = () => {
          if (n && 4 === o.readyState) {
            this.log_(
              "REST Response for " + r + " received. status:",
              o.status,
              "response:",
              o.responseText
            );
            let e = null;
            if (o.status >= 200 && o.status < 300) {
              try {
                e = v(o.responseText);
              } catch (e) {
                te(
                  "Failed to parse JSON response for " +
                    r +
                    ": " +
                    o.responseText
                );
              }
              n(null, e);
            } else
              401 !== o.status &&
                404 !== o.status &&
                te(
                  "Got unsuccessful REST response for " +
                    r +
                    " Status: " +
                    o.status
                ),
                n(o.status);
            n = null;
          }
        }),
          o.open("GET", r, !0),
          o.send();
      })
    );
  }
}
class $t {
  constructor() {
    this.rootNode_ = St.EMPTY_NODE;
  }
  getNode(e) {
    return this.rootNode_.getChild(e);
  }
  updateSnapshot(e, t) {
    this.rootNode_ = this.rootNode_.updateChild(e, t);
  }
}
function Gt() {
  return { value: null, children: new Map() };
}
function Jt(e, t, n) {
  if (ze(t)) (e.value = n), e.children.clear();
  else if (null !== e.value) e.value = e.value.updateChild(t, n);
  else {
    const i = qe(t);
    e.children.has(i) || e.children.set(i, Gt());
    Jt(e.children.get(i), (t = Ue(t)), n);
  }
}
function Xt(e, t) {
  if (ze(t)) return (e.value = null), e.children.clear(), !0;
  if (null !== e.value) {
    if (e.value.isLeafNode()) return !1;
    {
      const n = e.value;
      return (
        (e.value = null),
        n.forEachChild(yt, (t, n) => {
          Jt(e, new Me(t), n);
        }),
        Xt(e, t)
      );
    }
  }
  if (e.children.size > 0) {
    const n = qe(t);
    if (((t = Ue(t)), e.children.has(n))) {
      Xt(e.children.get(n), t) && e.children.delete(n);
    }
    return 0 === e.children.size;
  }
  return !0;
}
function Zt(e, t, n) {
  null !== e.value
    ? n(t, e.value)
    : (function (e, t) {
        e.children.forEach((e, n) => {
          t(n, e);
        });
      })(e, (e, i) => {
        Zt(i, new Me(t.toString() + "/" + e), n);
      });
}
class en {
  constructor(e) {
    (this.collection_ = e), (this.last_ = null);
  }
  get() {
    const e = this.collection_.get(),
      t = Object.assign({}, e);
    return (
      this.last_ &&
        ce(this.last_, (e, n) => {
          t[e] = t[e] - n;
        }),
      (this.last_ = e),
      t
    );
  }
}
class tn {
  constructor(e, t) {
    (this.server_ = t),
      (this.statsToReport_ = {}),
      (this.statsListener_ = new en(e));
    const n = 1e4 + 2e4 * Math.random();
    fe(this.reportStats_.bind(this), Math.floor(n));
  }
  reportStats_() {
    const e = this.statsListener_.get(),
      t = {};
    let n = !1;
    ce(e, (e, i) => {
      i > 0 && T(this.statsToReport_, e) && ((t[e] = i), (n = !0));
    }),
      n && this.server_.reportStats(t),
      fe(this.reportStats_.bind(this), Math.floor(2 * Math.random() * 3e5));
  }
}
var nn;
function sn(e) {
  return { fromUser: !1, fromServer: !0, queryId: e, tagged: !0 };
}
!(function (e) {
  (e[(e.OVERWRITE = 0)] = "OVERWRITE"),
    (e[(e.MERGE = 1)] = "MERGE"),
    (e[(e.ACK_USER_WRITE = 2)] = "ACK_USER_WRITE"),
    (e[(e.LISTEN_COMPLETE = 3)] = "LISTEN_COMPLETE");
})(nn || (nn = {}));
class rn {
  constructor(e, t, n) {
    (this.path = e),
      (this.affectedTree = t),
      (this.revert = n),
      (this.type = nn.ACK_USER_WRITE),
      (this.source = {
        fromUser: !0,
        fromServer: !1,
        queryId: null,
        tagged: !1,
      });
  }
  operationForChild(e) {
    if (ze(this.path)) {
      if (null != this.affectedTree.value)
        return (
          a(
            this.affectedTree.children.isEmpty(),
            "affectedTree should not have overlapping affected paths."
          ),
          this
        );
      {
        const t = this.affectedTree.subtree(new Me(e));
        return new rn(Fe(), t, this.revert);
      }
    }
    return (
      a(qe(this.path) === e, "operationForChild called for unrelated child."),
      new rn(Ue(this.path), this.affectedTree, this.revert)
    );
  }
}
class on {
  constructor(e, t) {
    (this.source = e), (this.path = t), (this.type = nn.LISTEN_COMPLETE);
  }
  operationForChild(e) {
    return ze(this.path)
      ? new on(this.source, Fe())
      : new on(this.source, Ue(this.path));
  }
}
class an {
  constructor(e, t, n) {
    (this.source = e),
      (this.path = t),
      (this.snap = n),
      (this.type = nn.OVERWRITE);
  }
  operationForChild(e) {
    return ze(this.path)
      ? new an(this.source, Fe(), this.snap.getImmediateChild(e))
      : new an(this.source, Ue(this.path), this.snap);
  }
}
class ln {
  constructor(e, t, n) {
    (this.source = e),
      (this.path = t),
      (this.children = n),
      (this.type = nn.MERGE);
  }
  operationForChild(e) {
    if (ze(this.path)) {
      const t = this.children.subtree(new Me(e));
      return t.isEmpty()
        ? null
        : t.value
        ? new an(this.source, Fe(), t.value)
        : new ln(this.source, Fe(), t);
    }
    return (
      a(
        qe(this.path) === e,
        "Can't get a merge for a child not on the path of the operation"
      ),
      new ln(this.source, Ue(this.path), this.children)
    );
  }
  toString() {
    return (
      "Operation(" +
      this.path +
      ": " +
      this.source.toString() +
      " merge: " +
      this.children.toString() +
      ")"
    );
  }
}
class hn {
  constructor(e, t, n) {
    (this.node_ = e), (this.fullyInitialized_ = t), (this.filtered_ = n);
  }
  isFullyInitialized() {
    return this.fullyInitialized_;
  }
  isFiltered() {
    return this.filtered_;
  }
  isCompleteForPath(e) {
    if (ze(e)) return this.isFullyInitialized() && !this.filtered_;
    const t = qe(e);
    return this.isCompleteForChild(t);
  }
  isCompleteForChild(e) {
    return (
      (this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(e)
    );
  }
  getNode() {
    return this.node_;
  }
}
class cn {
  constructor(e) {
    (this.query_ = e), (this.index_ = this.query_._queryParams.getIndex());
  }
}
function un(e, t, n, i, s, r) {
  const o = i.filter((e) => e.type === n);
  o.sort((t, n) =>
    (function (e, t, n) {
      if (null == t.childName || null == n.childName)
        throw l("Should only compare child_ events.");
      const i = new tt(t.childName, t.snapshotNode),
        s = new tt(n.childName, n.snapshotNode);
      return e.index_.compare(i, s);
    })(e, t, n)
  ),
    o.forEach((n) => {
      const i = (function (e, t, n) {
        return (
          "value" === t.type ||
            "child_removed" === t.type ||
            (t.prevName = n.getPredecessorChildName(
              t.childName,
              t.snapshotNode,
              e.index_
            )),
          t
        );
      })(e, n, r);
      s.forEach((s) => {
        s.respondsTo(n.type) && t.push(s.createEvent(i, e.query_));
      });
    });
}
function dn(e, t) {
  return { eventCache: e, serverCache: t };
}
function _n(e, t, n, i) {
  return dn(new hn(t, n, i), e.serverCache);
}
function pn(e, t, n, i) {
  return dn(e.eventCache, new hn(t, n, i));
}
function fn(e) {
  return e.eventCache.isFullyInitialized() ? e.eventCache.getNode() : null;
}
function gn(e) {
  return e.serverCache.isFullyInitialized() ? e.serverCache.getNode() : null;
}
let mn;
class yn {
  constructor(e, t = (() => (mn || (mn = new lt(oe)), mn))()) {
    (this.value = e), (this.children = t);
  }
  static fromObject(e) {
    let t = new yn(null);
    return (
      ce(e, (e, n) => {
        t = t.set(new Me(e), n);
      }),
      t
    );
  }
  isEmpty() {
    return null === this.value && this.children.isEmpty();
  }
  findRootMostMatchingPathAndValue(e, t) {
    if (null != this.value && t(this.value))
      return { path: Fe(), value: this.value };
    if (ze(e)) return null;
    {
      const n = qe(e),
        i = this.children.get(n);
      if (null !== i) {
        const s = i.findRootMostMatchingPathAndValue(Ue(e), t);
        if (null != s) {
          return { path: Ve(new Me(n), s.path), value: s.value };
        }
        return null;
      }
      return null;
    }
  }
  findRootMostValueAndPath(e) {
    return this.findRootMostMatchingPathAndValue(e, () => !0);
  }
  subtree(e) {
    if (ze(e)) return this;
    {
      const t = qe(e),
        n = this.children.get(t);
      return null !== n ? n.subtree(Ue(e)) : new yn(null);
    }
  }
  set(e, t) {
    if (ze(e)) return new yn(t, this.children);
    {
      const n = qe(e),
        i = (this.children.get(n) || new yn(null)).set(Ue(e), t),
        s = this.children.insert(n, i);
      return new yn(this.value, s);
    }
  }
  remove(e) {
    if (ze(e))
      return this.children.isEmpty()
        ? new yn(null)
        : new yn(null, this.children);
    {
      const t = qe(e),
        n = this.children.get(t);
      if (n) {
        const i = n.remove(Ue(e));
        let s;
        return (
          (s = i.isEmpty()
            ? this.children.remove(t)
            : this.children.insert(t, i)),
          null === this.value && s.isEmpty()
            ? new yn(null)
            : new yn(this.value, s)
        );
      }
      return this;
    }
  }
  get(e) {
    if (ze(e)) return this.value;
    {
      const t = qe(e),
        n = this.children.get(t);
      return n ? n.get(Ue(e)) : null;
    }
  }
  setTree(e, t) {
    if (ze(e)) return t;
    {
      const n = qe(e),
        i = (this.children.get(n) || new yn(null)).setTree(Ue(e), t);
      let s;
      return (
        (s = i.isEmpty()
          ? this.children.remove(n)
          : this.children.insert(n, i)),
        new yn(this.value, s)
      );
    }
  }
  fold(e) {
    return this.fold_(Fe(), e);
  }
  fold_(e, t) {
    const n = {};
    return (
      this.children.inorderTraversal((i, s) => {
        n[i] = s.fold_(Ve(e, i), t);
      }),
      t(e, this.value, n)
    );
  }
  findOnPath(e, t) {
    return this.findOnPath_(e, Fe(), t);
  }
  findOnPath_(e, t, n) {
    const i = !!this.value && n(t, this.value);
    if (i) return i;
    if (ze(e)) return null;
    {
      const i = qe(e),
        s = this.children.get(i);
      return s ? s.findOnPath_(Ue(e), Ve(t, i), n) : null;
    }
  }
  foreachOnPath(e, t) {
    return this.foreachOnPath_(e, Fe(), t);
  }
  foreachOnPath_(e, t, n) {
    if (ze(e)) return this;
    {
      this.value && n(t, this.value);
      const i = qe(e),
        s = this.children.get(i);
      return s ? s.foreachOnPath_(Ue(e), Ve(t, i), n) : new yn(null);
    }
  }
  foreach(e) {
    this.foreach_(Fe(), e);
  }
  foreach_(e, t) {
    this.children.inorderTraversal((n, i) => {
      i.foreach_(Ve(e, n), t);
    }),
      this.value && t(e, this.value);
  }
  foreachChild(e) {
    this.children.inorderTraversal((t, n) => {
      n.value && e(t, n.value);
    });
  }
}
class vn {
  constructor(e) {
    this.writeTree_ = e;
  }
  static empty() {
    return new vn(new yn(null));
  }
}
function Cn(e, t, n) {
  if (ze(t)) return new vn(new yn(n));
  {
    const i = e.writeTree_.findRootMostValueAndPath(t);
    if (null != i) {
      const s = i.path;
      let r = i.value;
      const o = Ye(s, t);
      return (r = r.updateChild(o, n)), new vn(e.writeTree_.set(s, r));
    }
    {
      const i = new yn(n),
        s = e.writeTree_.setTree(t, i);
      return new vn(s);
    }
  }
}
function wn(e, t, n) {
  let i = e;
  return (
    ce(n, (e, n) => {
      i = Cn(i, Ve(t, e), n);
    }),
    i
  );
}
function Tn(e, t) {
  if (ze(t)) return vn.empty();
  {
    const n = e.writeTree_.setTree(t, new yn(null));
    return new vn(n);
  }
}
function bn(e, t) {
  return null != En(e, t);
}
function En(e, t) {
  const n = e.writeTree_.findRootMostValueAndPath(t);
  return null != n ? e.writeTree_.get(n.path).getChild(Ye(n.path, t)) : null;
}
function In(e) {
  const t = [],
    n = e.writeTree_.value;
  return (
    null != n
      ? n.isLeafNode() ||
        n.forEachChild(yt, (e, n) => {
          t.push(new tt(e, n));
        })
      : e.writeTree_.children.inorderTraversal((e, n) => {
          null != n.value && t.push(new tt(e, n.value));
        }),
    t
  );
}
function Sn(e, t) {
  if (ze(t)) return e;
  {
    const n = En(e, t);
    return new vn(null != n ? new yn(n) : e.writeTree_.subtree(t));
  }
}
function kn(e) {
  return e.writeTree_.isEmpty();
}
function Nn(e, t) {
  return Pn(Fe(), e.writeTree_, t);
}
function Pn(e, t, n) {
  if (null != t.value) return n.updateChild(e, t.value);
  {
    let i = null;
    return (
      t.children.inorderTraversal((t, s) => {
        ".priority" === t
          ? (a(null !== s.value, "Priority writes must always be leaf nodes"),
            (i = s.value))
          : (n = Pn(Ve(e, t), s, n));
      }),
      n.getChild(e).isEmpty() ||
        null === i ||
        (n = n.updateChild(Ve(e, ".priority"), i)),
      n
    );
  }
}
function xn(e, t) {
  return Hn(t, e);
}
function Rn(e, t) {
  const n = e.allWrites.findIndex((e) => e.writeId === t);
  a(n >= 0, "removeWrite called with nonexistent writeId.");
  const i = e.allWrites[n];
  e.allWrites.splice(n, 1);
  let s = i.visible,
    r = !1,
    o = e.allWrites.length - 1;
  for (; s && o >= 0; ) {
    const t = e.allWrites[o];
    t.visible &&
      (o >= n && Dn(t, i.path) ? (s = !1) : $e(i.path, t.path) && (r = !0)),
      o--;
  }
  if (s) {
    if (r)
      return (
        (function (e) {
          (e.visibleWrites = On(e.allWrites, An, Fe())),
            e.allWrites.length > 0
              ? (e.lastWriteId = e.allWrites[e.allWrites.length - 1].writeId)
              : (e.lastWriteId = -1);
        })(e),
        !0
      );
    if (i.snap) e.visibleWrites = Tn(e.visibleWrites, i.path);
    else {
      ce(i.children, (t) => {
        e.visibleWrites = Tn(e.visibleWrites, Ve(i.path, t));
      });
    }
    return !0;
  }
  return !1;
}
function Dn(e, t) {
  if (e.snap) return $e(e.path, t);
  for (const n in e.children)
    if (e.children.hasOwnProperty(n) && $e(Ve(e.path, n), t)) return !0;
  return !1;
}
function An(e) {
  return e.visible;
}
function On(e, t, n) {
  let i = vn.empty();
  for (let s = 0; s < e.length; ++s) {
    const r = e[s];
    if (t(r)) {
      const e = r.path;
      let t;
      if (r.snap)
        $e(n, e)
          ? ((t = Ye(n, e)), (i = Cn(i, t, r.snap)))
          : $e(e, n) && ((t = Ye(e, n)), (i = Cn(i, Fe(), r.snap.getChild(t))));
      else {
        if (!r.children) throw l("WriteRecord should have .snap or .children");
        if ($e(n, e)) (t = Ye(n, e)), (i = wn(i, t, r.children));
        else if ($e(e, n))
          if (((t = Ye(e, n)), ze(t))) i = wn(i, Fe(), r.children);
          else {
            const e = b(r.children, qe(t));
            if (e) {
              const n = e.getChild(Ue(t));
              i = Cn(i, Fe(), n);
            }
          }
      }
    }
  }
  return i;
}
function Ln(e, t, n, i, s) {
  if (i || s) {
    const r = Sn(e.visibleWrites, t);
    if (!s && kn(r)) return n;
    if (s || null != n || bn(r, Fe())) {
      const r = function (e) {
        return (
          (e.visible || s) &&
          (!i || !~i.indexOf(e.writeId)) &&
          ($e(e.path, t) || $e(t, e.path))
        );
      };
      return Nn(On(e.allWrites, r, t), n || St.EMPTY_NODE);
    }
    return null;
  }
  {
    const i = En(e.visibleWrites, t);
    if (null != i) return i;
    {
      const i = Sn(e.visibleWrites, t);
      if (kn(i)) return n;
      if (null != n || bn(i, Fe())) {
        return Nn(i, n || St.EMPTY_NODE);
      }
      return null;
    }
  }
}
function Mn(e, t, n, i) {
  return Ln(e.writeTree, e.treePath, t, n, i);
}
function Fn(e, t) {
  return (function (e, t, n) {
    let i = St.EMPTY_NODE;
    const s = En(e.visibleWrites, t);
    if (s)
      return (
        s.isLeafNode() ||
          s.forEachChild(yt, (e, t) => {
            i = i.updateImmediateChild(e, t);
          }),
        i
      );
    if (n) {
      const s = Sn(e.visibleWrites, t);
      return (
        n.forEachChild(yt, (e, t) => {
          const n = Nn(Sn(s, new Me(e)), t);
          i = i.updateImmediateChild(e, n);
        }),
        In(s).forEach((e) => {
          i = i.updateImmediateChild(e.name, e.node);
        }),
        i
      );
    }
    return (
      In(Sn(e.visibleWrites, t)).forEach((e) => {
        i = i.updateImmediateChild(e.name, e.node);
      }),
      i
    );
  })(e.writeTree, e.treePath, t);
}
function qn(e, t, n, i) {
  return (function (e, t, n, i, s) {
    a(i || s, "Either existingEventSnap or existingServerSnap must exist");
    const r = Ve(t, n);
    if (bn(e.visibleWrites, r)) return null;
    {
      const t = Sn(e.visibleWrites, r);
      return kn(t) ? s.getChild(n) : Nn(t, s.getChild(n));
    }
  })(e.writeTree, e.treePath, t, n, i);
}
function Wn(e, t) {
  return (function (e, t) {
    return En(e.visibleWrites, t);
  })(e.writeTree, Ve(e.treePath, t));
}
function Un(e, t, n, i, s, r) {
  return (function (e, t, n, i, s, r, o) {
    let a;
    const l = Sn(e.visibleWrites, t),
      h = En(l, Fe());
    if (null != h) a = h;
    else {
      if (null == n) return [];
      a = Nn(l, n);
    }
    if (((a = a.withIndex(o)), a.isEmpty() || a.isLeafNode())) return [];
    {
      const e = [],
        t = o.getCompare(),
        n = r ? a.getReverseIteratorFrom(i, o) : a.getIteratorFrom(i, o);
      let l = n.getNext();
      for (; l && e.length < s; ) 0 !== t(l, i) && e.push(l), (l = n.getNext());
      return e;
    }
  })(e.writeTree, e.treePath, t, n, i, s, r);
}
function Bn(e, t, n) {
  return (function (e, t, n, i) {
    const s = Ve(t, n),
      r = En(e.visibleWrites, s);
    if (null != r) return r;
    if (i.isCompleteForChild(n))
      return Nn(Sn(e.visibleWrites, s), i.getNode().getImmediateChild(n));
    return null;
  })(e.writeTree, e.treePath, t, n);
}
function jn(e, t) {
  return Hn(Ve(e.treePath, t), e.writeTree);
}
function Hn(e, t) {
  return { treePath: e, writeTree: t };
}
class Vn {
  constructor() {
    this.changeMap = new Map();
  }
  trackChildChange(e) {
    const t = e.type,
      n = e.childName;
    a(
      "child_added" === t || "child_changed" === t || "child_removed" === t,
      "Only child changes supported for tracking"
    ),
      a(".priority" !== n, "Only non-priority child changes can be tracked.");
    const i = this.changeMap.get(n);
    if (i) {
      const s = i.type;
      if ("child_added" === t && "child_removed" === s)
        this.changeMap.set(n, qt(n, e.snapshotNode, i.snapshotNode));
      else if ("child_removed" === t && "child_added" === s)
        this.changeMap.delete(n);
      else if ("child_removed" === t && "child_changed" === s)
        this.changeMap.set(n, Ft(n, i.oldSnap));
      else if ("child_changed" === t && "child_added" === s)
        this.changeMap.set(n, Mt(n, e.snapshotNode));
      else {
        if ("child_changed" !== t || "child_changed" !== s)
          throw l(
            "Illegal combination of changes: " + e + " occurred after " + i
          );
        this.changeMap.set(n, qt(n, e.snapshotNode, i.oldSnap));
      }
    } else this.changeMap.set(n, e);
  }
  getChanges() {
    return Array.from(this.changeMap.values());
  }
}
const zn = new (class {
  getCompleteChild(e) {
    return null;
  }
  getChildAfterChild(e, t, n) {
    return null;
  }
})();
class Yn {
  constructor(e, t, n = null) {
    (this.writes_ = e),
      (this.viewCache_ = t),
      (this.optCompleteServerCache_ = n);
  }
  getCompleteChild(e) {
    const t = this.viewCache_.eventCache;
    if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
    {
      const t =
        null != this.optCompleteServerCache_
          ? new hn(this.optCompleteServerCache_, !0, !1)
          : this.viewCache_.serverCache;
      return Bn(this.writes_, e, t);
    }
  }
  getChildAfterChild(e, t, n) {
    const i =
        null != this.optCompleteServerCache_
          ? this.optCompleteServerCache_
          : gn(this.viewCache_),
      s = Un(this.writes_, i, t, 1, n, e);
    return 0 === s.length ? null : s[0];
  }
}
function Kn(e, t, n, i, s) {
  const r = new Vn();
  let o, h;
  if (n.type === nn.OVERWRITE) {
    const l = n;
    l.source.fromUser
      ? (o = Gn(e, t, l.path, l.snap, i, s, r))
      : (a(l.source.fromServer, "Unknown source."),
        (h = l.source.tagged || (t.serverCache.isFiltered() && !ze(l.path))),
        (o = $n(e, t, l.path, l.snap, i, s, h, r)));
  } else if (n.type === nn.MERGE) {
    const l = n;
    l.source.fromUser
      ? (o = (function (e, t, n, i, s, r, o) {
          let a = t;
          return (
            i.foreach((i, l) => {
              const h = Ve(n, i);
              Jn(t, qe(h)) && (a = Gn(e, a, h, l, s, r, o));
            }),
            i.foreach((i, l) => {
              const h = Ve(n, i);
              Jn(t, qe(h)) || (a = Gn(e, a, h, l, s, r, o));
            }),
            a
          );
        })(e, t, l.path, l.children, i, s, r))
      : (a(l.source.fromServer, "Unknown source."),
        (h = l.source.tagged || t.serverCache.isFiltered()),
        (o = Zn(e, t, l.path, l.children, i, s, h, r)));
  } else if (n.type === nn.ACK_USER_WRITE) {
    const l = n;
    o = l.revert
      ? (function (e, t, n, i, s, r) {
          let o;
          if (null != Wn(i, n)) return t;
          {
            const l = new Yn(i, t, s),
              h = t.eventCache.getNode();
            let c;
            if (ze(n) || ".priority" === qe(n)) {
              let n;
              if (t.serverCache.isFullyInitialized()) n = Mn(i, gn(t));
              else {
                const e = t.serverCache.getNode();
                a(
                  e instanceof St,
                  "serverChildren would be complete if leaf node"
                ),
                  (n = Fn(i, e));
              }
              (n = n), (c = e.filter.updateFullNode(h, n, r));
            } else {
              const s = qe(n);
              let a = Bn(i, s, t.serverCache);
              null == a &&
                t.serverCache.isCompleteForChild(s) &&
                (a = h.getImmediateChild(s)),
                (c =
                  null != a
                    ? e.filter.updateChild(h, s, a, Ue(n), l, r)
                    : t.eventCache.getNode().hasChild(s)
                    ? e.filter.updateChild(h, s, St.EMPTY_NODE, Ue(n), l, r)
                    : h),
                c.isEmpty() &&
                  t.serverCache.isFullyInitialized() &&
                  ((o = Mn(i, gn(t))),
                  o.isLeafNode() && (c = e.filter.updateFullNode(c, o, r)));
            }
            return (
              (o = t.serverCache.isFullyInitialized() || null != Wn(i, Fe())),
              _n(t, c, o, e.filter.filtersNodes())
            );
          }
        })(e, t, l.path, i, s, r)
      : (function (e, t, n, i, s, r, o) {
          if (null != Wn(s, n)) return t;
          const a = t.serverCache.isFiltered(),
            l = t.serverCache;
          if (null != i.value) {
            if ((ze(n) && l.isFullyInitialized()) || l.isCompleteForPath(n))
              return $n(e, t, n, l.getNode().getChild(n), s, r, a, o);
            if (ze(n)) {
              let i = new yn(null);
              return (
                l.getNode().forEachChild(rt, (e, t) => {
                  i = i.set(new Me(e), t);
                }),
                Zn(e, t, n, i, s, r, a, o)
              );
            }
            return t;
          }
          {
            let h = new yn(null);
            return (
              i.foreach((e, t) => {
                const i = Ve(n, e);
                l.isCompleteForPath(i) &&
                  (h = h.set(e, l.getNode().getChild(i)));
              }),
              Zn(e, t, n, h, s, r, a, o)
            );
          }
        })(e, t, l.path, l.affectedTree, i, s, r);
  } else {
    if (n.type !== nn.LISTEN_COMPLETE)
      throw l("Unknown operation type: " + n.type);
    o = (function (e, t, n, i, s) {
      const r = t.serverCache,
        o = pn(t, r.getNode(), r.isFullyInitialized() || ze(n), r.isFiltered());
      return Qn(e, o, n, i, zn, s);
    })(e, t, n.path, i, r);
  }
  const c = r.getChanges();
  return (
    (function (e, t, n) {
      const i = t.eventCache;
      if (i.isFullyInitialized()) {
        const s = i.getNode().isLeafNode() || i.getNode().isEmpty(),
          r = fn(e);
        (n.length > 0 ||
          !e.eventCache.isFullyInitialized() ||
          (s && !i.getNode().equals(r)) ||
          !i.getNode().getPriority().equals(r.getPriority())) &&
          n.push(Lt(fn(t)));
      }
    })(t, o, c),
    { viewCache: o, changes: c }
  );
}
function Qn(e, t, n, i, s, r) {
  const o = t.eventCache;
  if (null != Wn(i, n)) return t;
  {
    let l, h;
    if (ze(n))
      if (
        (a(
          t.serverCache.isFullyInitialized(),
          "If change path is empty, we must have complete server data"
        ),
        t.serverCache.isFiltered())
      ) {
        const n = gn(t),
          s = Fn(i, n instanceof St ? n : St.EMPTY_NODE);
        l = e.filter.updateFullNode(t.eventCache.getNode(), s, r);
      } else {
        const n = Mn(i, gn(t));
        l = e.filter.updateFullNode(t.eventCache.getNode(), n, r);
      }
    else {
      const c = qe(n);
      if (".priority" === c) {
        a(1 === We(n), "Can't have a priority with additional path components");
        const s = o.getNode();
        h = t.serverCache.getNode();
        const r = qn(i, n, s, h);
        l = null != r ? e.filter.updatePriority(s, r) : o.getNode();
      } else {
        const a = Ue(n);
        let u;
        if (o.isCompleteForChild(c)) {
          h = t.serverCache.getNode();
          const e = qn(i, n, o.getNode(), h);
          u =
            null != e
              ? o.getNode().getImmediateChild(c).updateChild(a, e)
              : o.getNode().getImmediateChild(c);
        } else u = Bn(i, c, t.serverCache);
        l =
          null != u
            ? e.filter.updateChild(o.getNode(), c, u, a, s, r)
            : o.getNode();
      }
    }
    return _n(t, l, o.isFullyInitialized() || ze(n), e.filter.filtersNodes());
  }
}
function $n(e, t, n, i, s, r, o, a) {
  const l = t.serverCache;
  let h;
  const c = o ? e.filter : e.filter.getIndexedFilter();
  if (ze(n)) h = c.updateFullNode(l.getNode(), i, null);
  else if (c.filtersNodes() && !l.isFiltered()) {
    const e = l.getNode().updateChild(n, i);
    h = c.updateFullNode(l.getNode(), e, null);
  } else {
    const e = qe(n);
    if (!l.isCompleteForPath(n) && We(n) > 1) return t;
    const s = Ue(n),
      r = l.getNode().getImmediateChild(e).updateChild(s, i);
    h =
      ".priority" === e
        ? c.updatePriority(l.getNode(), r)
        : c.updateChild(l.getNode(), e, r, s, zn, null);
  }
  const u = pn(t, h, l.isFullyInitialized() || ze(n), c.filtersNodes());
  return Qn(e, u, n, s, new Yn(s, u, r), a);
}
function Gn(e, t, n, i, s, r, o) {
  const a = t.eventCache;
  let l, h;
  const c = new Yn(s, t, r);
  if (ze(n))
    (h = e.filter.updateFullNode(t.eventCache.getNode(), i, o)),
      (l = _n(t, h, !0, e.filter.filtersNodes()));
  else {
    const s = qe(n);
    if (".priority" === s)
      (h = e.filter.updatePriority(t.eventCache.getNode(), i)),
        (l = _n(t, h, a.isFullyInitialized(), a.isFiltered()));
    else {
      const r = Ue(n),
        h = a.getNode().getImmediateChild(s);
      let u;
      if (ze(r)) u = i;
      else {
        const e = c.getCompleteChild(s);
        u =
          null != e
            ? ".priority" === Be(r) && e.getChild(He(r)).isEmpty()
              ? e
              : e.updateChild(r, i)
            : St.EMPTY_NODE;
      }
      if (h.equals(u)) l = t;
      else {
        l = _n(
          t,
          e.filter.updateChild(a.getNode(), s, u, r, c, o),
          a.isFullyInitialized(),
          e.filter.filtersNodes()
        );
      }
    }
  }
  return l;
}
function Jn(e, t) {
  return e.eventCache.isCompleteForChild(t);
}
function Xn(e, t, n) {
  return (
    n.foreach((e, n) => {
      t = t.updateChild(e, n);
    }),
    t
  );
}
function Zn(e, t, n, i, s, r, o, a) {
  if (t.serverCache.getNode().isEmpty() && !t.serverCache.isFullyInitialized())
    return t;
  let l,
    h = t;
  l = ze(n) ? i : new yn(null).setTree(n, i);
  const c = t.serverCache.getNode();
  return (
    l.children.inorderTraversal((n, i) => {
      if (c.hasChild(n)) {
        const l = Xn(0, t.serverCache.getNode().getImmediateChild(n), i);
        h = $n(e, h, new Me(n), l, s, r, o, a);
      }
    }),
    l.children.inorderTraversal((n, i) => {
      const l = !t.serverCache.isCompleteForChild(n) && null === i.value;
      if (!c.hasChild(n) && !l) {
        const l = Xn(0, t.serverCache.getNode().getImmediateChild(n), i);
        h = $n(e, h, new Me(n), l, s, r, o, a);
      }
    }),
    h
  );
}
class ei {
  constructor(e, t) {
    (this.query_ = e), (this.eventRegistrations_ = []);
    const n = this.query_._queryParams,
      i = new Wt(n.getIndex()),
      s = (r = n).loadsAllData()
        ? new Wt(r.getIndex())
        : r.hasLimit()
        ? new Bt(r)
        : new Ut(r);
    var r;
    this.processor_ = (function (e) {
      return { filter: e };
    })(s);
    const o = t.serverCache,
      a = t.eventCache,
      l = i.updateFullNode(St.EMPTY_NODE, o.getNode(), null),
      h = s.updateFullNode(St.EMPTY_NODE, a.getNode(), null),
      c = new hn(l, o.isFullyInitialized(), i.filtersNodes()),
      u = new hn(h, a.isFullyInitialized(), s.filtersNodes());
    (this.viewCache_ = dn(u, c)), (this.eventGenerator_ = new cn(this.query_));
  }
  get query() {
    return this.query_;
  }
}
function ti(e, t) {
  const n = gn(e.viewCache_);
  return n &&
    (e.query._queryParams.loadsAllData() ||
      (!ze(t) && !n.getImmediateChild(qe(t)).isEmpty()))
    ? n.getChild(t)
    : null;
}
function ni(e) {
  return 0 === e.eventRegistrations_.length;
}
function ii(e, t, n) {
  const i = [];
  if (n) {
    a(null == t, "A cancel should cancel all event registrations.");
    const s = e.query._path;
    e.eventRegistrations_.forEach((e) => {
      const t = e.createCancelEvent(n, s);
      t && i.push(t);
    });
  }
  if (t) {
    let n = [];
    for (let i = 0; i < e.eventRegistrations_.length; ++i) {
      const s = e.eventRegistrations_[i];
      if (s.matches(t)) {
        if (t.hasAnyCallback()) {
          n = n.concat(e.eventRegistrations_.slice(i + 1));
          break;
        }
      } else n.push(s);
    }
    e.eventRegistrations_ = n;
  } else e.eventRegistrations_ = [];
  return i;
}
function si(e, t, n, i) {
  t.type === nn.MERGE &&
    null !== t.source.queryId &&
    (a(
      gn(e.viewCache_),
      "We should always have a full cache before handling merges"
    ),
    a(
      fn(e.viewCache_),
      "Missing event cache, even though we have a server cache"
    ));
  const s = e.viewCache_,
    r = Kn(e.processor_, s, t, n, i);
  var o, l;
  return (
    (o = e.processor_),
    (l = r.viewCache),
    a(
      l.eventCache.getNode().isIndexed(o.filter.getIndex()),
      "Event snap not indexed"
    ),
    a(
      l.serverCache.getNode().isIndexed(o.filter.getIndex()),
      "Server snap not indexed"
    ),
    a(
      r.viewCache.serverCache.isFullyInitialized() ||
        !s.serverCache.isFullyInitialized(),
      "Once a server snap is complete, it should never go back"
    ),
    (e.viewCache_ = r.viewCache),
    ri(e, r.changes, r.viewCache.eventCache.getNode(), null)
  );
}
function ri(e, t, n, i) {
  const s = i ? [i] : e.eventRegistrations_;
  return (function (e, t, n, i) {
    const s = [],
      r = [];
    return (
      t.forEach((t) => {
        var n;
        "child_changed" === t.type &&
          e.index_.indexedValueChanged(t.oldSnap, t.snapshotNode) &&
          r.push(
            ((n = t.childName),
            { type: "child_moved", snapshotNode: t.snapshotNode, childName: n })
          );
      }),
      un(e, s, "child_removed", t, i, n),
      un(e, s, "child_added", t, i, n),
      un(e, s, "child_moved", r, i, n),
      un(e, s, "child_changed", t, i, n),
      un(e, s, "value", t, i, n),
      s
    );
  })(e.eventGenerator_, t, n, s);
}
let oi, ai;
class li {
  constructor() {
    this.views = new Map();
  }
}
function hi(e, t, n, i) {
  const s = t.source.queryId;
  if (null !== s) {
    const r = e.views.get(s);
    return (
      a(null != r, "SyncTree gave us an op for an invalid query."),
      si(r, t, n, i)
    );
  }
  {
    let s = [];
    for (const r of e.views.values()) s = s.concat(si(r, t, n, i));
    return s;
  }
}
function ci(e, t, n, i, s) {
  const r = t._queryIdentifier,
    o = e.views.get(r);
  if (!o) {
    let e = Mn(n, s ? i : null),
      r = !1;
    e
      ? (r = !0)
      : i instanceof St
      ? ((e = Fn(n, i)), (r = !1))
      : ((e = St.EMPTY_NODE), (r = !1));
    const o = dn(new hn(e, r, !1), new hn(i, s, !1));
    return new ei(t, o);
  }
  return o;
}
function ui(e, t, n, i, s, r) {
  const o = ci(e, t, i, s, r);
  return (
    e.views.has(t._queryIdentifier) || e.views.set(t._queryIdentifier, o),
    (function (e, t) {
      e.eventRegistrations_.push(t);
    })(o, n),
    (function (e, t) {
      const n = e.viewCache_.eventCache,
        i = [];
      n.getNode().isLeafNode() ||
        n.getNode().forEachChild(yt, (e, t) => {
          i.push(Mt(e, t));
        });
      return (
        n.isFullyInitialized() && i.push(Lt(n.getNode())),
        ri(e, i, n.getNode(), t)
      );
    })(o, n)
  );
}
function di(e, t, n, i) {
  const s = t._queryIdentifier,
    r = [];
  let o = [];
  const l = mi(e);
  if ("default" === s)
    for (const [t, s] of e.views.entries())
      (o = o.concat(ii(s, n, i))),
        ni(s) &&
          (e.views.delete(t),
          s.query._queryParams.loadsAllData() || r.push(s.query));
  else {
    const t = e.views.get(s);
    t &&
      ((o = o.concat(ii(t, n, i))),
      ni(t) &&
        (e.views.delete(s),
        t.query._queryParams.loadsAllData() || r.push(t.query)));
  }
  return (
    l &&
      !mi(e) &&
      r.push(
        new (a(oi, "Reference.ts has not been loaded"), oi)(t._repo, t._path)
      ),
    { removed: r, events: o }
  );
}
function _i(e) {
  const t = [];
  for (const n of e.views.values())
    n.query._queryParams.loadsAllData() || t.push(n);
  return t;
}
function pi(e, t) {
  let n = null;
  for (const i of e.views.values()) n = n || ti(i, t);
  return n;
}
function fi(e, t) {
  if (t._queryParams.loadsAllData()) return yi(e);
  {
    const n = t._queryIdentifier;
    return e.views.get(n);
  }
}
function gi(e, t) {
  return null != fi(e, t);
}
function mi(e) {
  return null != yi(e);
}
function yi(e) {
  for (const t of e.views.values())
    if (t.query._queryParams.loadsAllData()) return t;
  return null;
}
let vi = 1;
class Ci {
  constructor(e) {
    (this.listenProvider_ = e),
      (this.syncPointTree_ = new yn(null)),
      (this.pendingWriteTree_ = {
        visibleWrites: vn.empty(),
        allWrites: [],
        lastWriteId: -1,
      }),
      (this.tagToQueryMap = new Map()),
      (this.queryToTagMap = new Map());
  }
}
function wi(e, t, n, i, s) {
  return (
    (function (e, t, n, i, s) {
      a(i > e.lastWriteId, "Stacking an older write on top of newer ones"),
        void 0 === s && (s = !0),
        e.allWrites.push({ path: t, snap: n, writeId: i, visible: s }),
        s && (e.visibleWrites = Cn(e.visibleWrites, t, n)),
        (e.lastWriteId = i);
    })(e.pendingWriteTree_, t, n, i, s),
    s
      ? xi(
          e,
          new an(
            { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 },
            t,
            n
          )
        )
      : []
  );
}
function Ti(e, t, n, i) {
  !(function (e, t, n, i) {
    a(i > e.lastWriteId, "Stacking an older merge on top of newer ones"),
      e.allWrites.push({ path: t, children: n, writeId: i, visible: !0 }),
      (e.visibleWrites = wn(e.visibleWrites, t, n)),
      (e.lastWriteId = i);
  })(e.pendingWriteTree_, t, n, i);
  const s = yn.fromObject(n);
  return xi(
    e,
    new ln({ fromUser: !0, fromServer: !1, queryId: null, tagged: !1 }, t, s)
  );
}
function bi(e, t, n = !1) {
  const i = (function (e, t) {
    for (let n = 0; n < e.allWrites.length; n++) {
      const i = e.allWrites[n];
      if (i.writeId === t) return i;
    }
    return null;
  })(e.pendingWriteTree_, t);
  if (Rn(e.pendingWriteTree_, t)) {
    let t = new yn(null);
    return (
      null != i.snap
        ? (t = t.set(Fe(), !0))
        : ce(i.children, (e) => {
            t = t.set(new Me(e), !0);
          }),
      xi(e, new rn(i.path, t, n))
    );
  }
  return [];
}
function Ei(e, t, n) {
  return xi(
    e,
    new an({ fromUser: !1, fromServer: !0, queryId: null, tagged: !1 }, t, n)
  );
}
function Ii(e, t, n, i, s = !1) {
  const r = t._path,
    o = e.syncPointTree_.get(r);
  let a = [];
  if (o && ("default" === t._queryIdentifier || gi(o, t))) {
    const l = di(o, t, n, i);
    0 === o.views.size && (e.syncPointTree_ = e.syncPointTree_.remove(r));
    const h = l.removed;
    if (((a = l.events), !s)) {
      const n = -1 !== h.findIndex((e) => e._queryParams.loadsAllData()),
        s = e.syncPointTree_.findOnPath(r, (e, t) => mi(t));
      if (n && !s) {
        const t = e.syncPointTree_.subtree(r);
        if (!t.isEmpty()) {
          const n = (function (e) {
            return e.fold((e, t, n) => {
              if (t && mi(t)) {
                return [yi(t)];
              }
              {
                let e = [];
                return (
                  t && (e = _i(t)),
                  ce(n, (t, n) => {
                    e = e.concat(n);
                  }),
                  e
                );
              }
            });
          })(t);
          for (let t = 0; t < n.length; ++t) {
            const i = n[t],
              s = i.query,
              r = Ai(e, i);
            e.listenProvider_.startListening(
              Wi(s),
              Oi(e, s),
              r.hashFn,
              r.onComplete
            );
          }
        }
      }
      if (!s && h.length > 0 && !i)
        if (n) {
          const n = null;
          e.listenProvider_.stopListening(Wi(t), n);
        } else
          h.forEach((t) => {
            const n = e.queryToTagMap.get(Li(t));
            e.listenProvider_.stopListening(Wi(t), n);
          });
    }
    !(function (e, t) {
      for (let n = 0; n < t.length; ++n) {
        const i = t[n];
        if (!i._queryParams.loadsAllData()) {
          const t = Li(i),
            n = e.queryToTagMap.get(t);
          e.queryToTagMap.delete(t), e.tagToQueryMap.delete(n);
        }
      }
    })(e, h);
  }
  return a;
}
function Si(e, t, n, i) {
  const s = Mi(e, i);
  if (null != s) {
    const i = Fi(s),
      r = i.path,
      o = i.queryId,
      a = Ye(r, t);
    return qi(e, r, new an(sn(o), a, n));
  }
  return [];
}
function ki(e, t, n, i = !1) {
  const s = t._path;
  let r = null,
    o = !1;
  e.syncPointTree_.foreachOnPath(s, (e, t) => {
    const n = Ye(e, s);
    (r = r || pi(t, n)), (o = o || mi(t));
  });
  let l,
    h = e.syncPointTree_.get(s);
  if (
    (h
      ? ((o = o || mi(h)), (r = r || pi(h, Fe())))
      : ((h = new li()), (e.syncPointTree_ = e.syncPointTree_.set(s, h))),
    null != r)
  )
    l = !0;
  else {
    (l = !1), (r = St.EMPTY_NODE);
    e.syncPointTree_.subtree(s).foreachChild((e, t) => {
      const n = pi(t, Fe());
      n && (r = r.updateImmediateChild(e, n));
    });
  }
  const c = gi(h, t);
  if (!c && !t._queryParams.loadsAllData()) {
    const n = Li(t);
    a(!e.queryToTagMap.has(n), "View does not exist, but we have a tag");
    const i = vi++;
    e.queryToTagMap.set(n, i), e.tagToQueryMap.set(i, n);
  }
  let u = ui(h, t, n, xn(e.pendingWriteTree_, s), r, l);
  if (!c && !o && !i) {
    const n = fi(h, t);
    u = u.concat(
      (function (e, t, n) {
        const i = t._path,
          s = Oi(e, t),
          r = Ai(e, n),
          o = e.listenProvider_.startListening(
            Wi(t),
            s,
            r.hashFn,
            r.onComplete
          ),
          l = e.syncPointTree_.subtree(i);
        if (s)
          a(!mi(l.value), "If we're adding a query, it shouldn't be shadowed");
        else {
          const t = l.fold((e, t, n) => {
            if (!ze(e) && t && mi(t)) return [yi(t).query];
            {
              let e = [];
              return (
                t && (e = e.concat(_i(t).map((e) => e.query))),
                ce(n, (t, n) => {
                  e = e.concat(n);
                }),
                e
              );
            }
          });
          for (let n = 0; n < t.length; ++n) {
            const i = t[n];
            e.listenProvider_.stopListening(Wi(i), Oi(e, i));
          }
        }
        return o;
      })(e, t, n)
    );
  }
  return u;
}
function Ni(e, t, n) {
  const i = e.pendingWriteTree_,
    s = e.syncPointTree_.findOnPath(t, (e, n) => {
      const i = pi(n, Ye(e, t));
      if (i) return i;
    });
  return Ln(i, t, s, n, !0);
}
function Pi(e, t) {
  const n = t._path;
  let i = null;
  e.syncPointTree_.foreachOnPath(n, (e, t) => {
    const s = Ye(e, n);
    i = i || pi(t, s);
  });
  let s = e.syncPointTree_.get(n);
  s
    ? (i = i || pi(s, Fe()))
    : ((s = new li()), (e.syncPointTree_ = e.syncPointTree_.set(n, s)));
  const r = null != i,
    o = r ? new hn(i, !0, !1) : null;
  return (function (e) {
    return fn(e.viewCache_);
  })(
    ci(
      s,
      t,
      xn(e.pendingWriteTree_, t._path),
      r ? o.getNode() : St.EMPTY_NODE,
      r
    )
  );
}
function xi(e, t) {
  return Ri(t, e.syncPointTree_, null, xn(e.pendingWriteTree_, Fe()));
}
function Ri(e, t, n, i) {
  if (ze(e.path)) return Di(e, t, n, i);
  {
    const s = t.get(Fe());
    null == n && null != s && (n = pi(s, Fe()));
    let r = [];
    const o = qe(e.path),
      a = e.operationForChild(o),
      l = t.children.get(o);
    if (l && a) {
      const e = n ? n.getImmediateChild(o) : null,
        t = jn(i, o);
      r = r.concat(Ri(a, l, e, t));
    }
    return s && (r = r.concat(hi(s, e, i, n))), r;
  }
}
function Di(e, t, n, i) {
  const s = t.get(Fe());
  null == n && null != s && (n = pi(s, Fe()));
  let r = [];
  return (
    t.children.inorderTraversal((t, s) => {
      const o = n ? n.getImmediateChild(t) : null,
        a = jn(i, t),
        l = e.operationForChild(t);
      l && (r = r.concat(Di(l, s, o, a)));
    }),
    s && (r = r.concat(hi(s, e, i, n))),
    r
  );
}
function Ai(e, t) {
  const n = t.query,
    i = Oi(e, n);
  return {
    hashFn: () => {
      const e =
        (function (e) {
          return e.viewCache_.serverCache.getNode();
        })(t) || St.EMPTY_NODE;
      return e.hash();
    },
    onComplete: (t) => {
      if ("ok" === t)
        return i
          ? (function (e, t, n) {
              const i = Mi(e, n);
              if (i) {
                const n = Fi(i),
                  s = n.path,
                  r = n.queryId,
                  o = Ye(s, t);
                return qi(e, s, new on(sn(r), o));
              }
              return [];
            })(e, n._path, i)
          : (function (e, t) {
              return xi(
                e,
                new on(
                  { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 },
                  t
                )
              );
            })(e, n._path);
      {
        const i = (function (e, t) {
          let n = "Unknown Error";
          "too_big" === e
            ? (n =
                "The data requested exceeds the maximum size that can be accessed with a single request.")
            : "permission_denied" === e
            ? (n = "Client doesn't have permission to access the desired data.")
            : "unavailable" === e && (n = "The service is unavailable");
          const i = new Error(e + " at " + t._path.toString() + ": " + n);
          return (i.code = e.toUpperCase()), i;
        })(t, n);
        return Ii(e, n, null, i);
      }
    },
  };
}
function Oi(e, t) {
  const n = Li(t);
  return e.queryToTagMap.get(n);
}
function Li(e) {
  return e._path.toString() + "$" + e._queryIdentifier;
}
function Mi(e, t) {
  return e.tagToQueryMap.get(t);
}
function Fi(e) {
  const t = e.indexOf("$");
  return (
    a(-1 !== t && t < e.length - 1, "Bad queryKey."),
    { queryId: e.substr(t + 1), path: new Me(e.substr(0, t)) }
  );
}
function qi(e, t, n) {
  const i = e.syncPointTree_.get(t);
  a(i, "Missing sync point for query tag that we're tracking");
  return hi(i, n, xn(e.pendingWriteTree_, t), null);
}
function Wi(e) {
  return e._queryParams.loadsAllData() && !e._queryParams.isDefault()
    ? new (a(ai, "Reference.ts has not been loaded"), ai)(e._repo, e._path)
    : e;
}
class Ui {
  constructor(e) {
    this.node_ = e;
  }
  getImmediateChild(e) {
    const t = this.node_.getImmediateChild(e);
    return new Ui(t);
  }
  node() {
    return this.node_;
  }
}
class Bi {
  constructor(e, t) {
    (this.syncTree_ = e), (this.path_ = t);
  }
  getImmediateChild(e) {
    const t = Ve(this.path_, e);
    return new Bi(this.syncTree_, t);
  }
  node() {
    return Ni(this.syncTree_, this.path_);
  }
}
const ji = function (e, t, n) {
    return e && "object" == typeof e
      ? (a(".sv" in e, "Unexpected leaf node or priority contents"),
        "string" == typeof e[".sv"]
          ? Hi(e[".sv"], t, n)
          : "object" == typeof e[".sv"]
          ? Vi(e[".sv"], t)
          : void a(
              !1,
              "Unexpected server value: " + JSON.stringify(e, null, 2)
            ))
      : e;
  },
  Hi = function (e, t, n) {
    if ("timestamp" === e) return n.timestamp;
    a(!1, "Unexpected server value: " + e);
  },
  Vi = function (e, t, n) {
    e.hasOwnProperty("increment") ||
      a(!1, "Unexpected server value: " + JSON.stringify(e, null, 2));
    const i = e.increment;
    "number" != typeof i && a(!1, "Unexpected increment value: " + i);
    const s = t.node();
    if (
      (a(null != s, "Expected ChildrenNode.EMPTY_NODE for nulls"),
      !s.isLeafNode())
    )
      return i;
    const r = s.getValue();
    return "number" != typeof r ? i : r + i;
  },
  zi = function (e, t, n, i) {
    return Ki(t, new Bi(n, e), i);
  },
  Yi = function (e, t, n) {
    return Ki(e, new Ui(t), n);
  };
function Ki(e, t, n) {
  const i = e.getPriority().val(),
    s = ji(i, t.getImmediateChild(".priority"), n);
  let r;
  if (e.isLeafNode()) {
    const i = e,
      r = ji(i.getValue(), t, n);
    return r !== i.getValue() || s !== i.getPriority().val()
      ? new mt(r, Nt(s))
      : e;
  }
  {
    const i = e;
    return (
      (r = i),
      s !== i.getPriority().val() && (r = r.updatePriority(new mt(s))),
      i.forEachChild(yt, (e, i) => {
        const s = Ki(i, t.getImmediateChild(e), n);
        s !== i && (r = r.updateImmediateChild(e, s));
      }),
      r
    );
  }
}
class Qi {
  constructor(e = "", t = null, n = { children: {}, childCount: 0 }) {
    (this.name = e), (this.parent = t), (this.node = n);
  }
}
function $i(e, t) {
  let n = t instanceof Me ? t : new Me(t),
    i = e,
    s = qe(n);
  for (; null !== s; ) {
    const e = b(i.node.children, s) || { children: {}, childCount: 0 };
    (i = new Qi(s, i, e)), (n = Ue(n)), (s = qe(n));
  }
  return i;
}
function Gi(e) {
  return e.node.value;
}
function Ji(e, t) {
  (e.node.value = t), ns(e);
}
function Xi(e) {
  return e.node.childCount > 0;
}
function Zi(e, t) {
  ce(e.node.children, (n, i) => {
    t(new Qi(n, e, i));
  });
}
function es(e, t, n, i) {
  n && !i && t(e),
    Zi(e, (e) => {
      es(e, t, !0, i);
    }),
    n && i && t(e);
}
function ts(e) {
  return new Me(null === e.parent ? e.name : ts(e.parent) + "/" + e.name);
}
function ns(e) {
  null !== e.parent &&
    (function (e, t, n) {
      const i = (function (e) {
          return void 0 === Gi(e) && !Xi(e);
        })(n),
        s = T(e.node.children, t);
      i && s
        ? (delete e.node.children[t], e.node.childCount--, ns(e))
        : i || s || ((e.node.children[t] = n.node), e.node.childCount++, ns(e));
    })(e.parent, e.name, e);
}
const is = /[\[\].#$\/\u0000-\u001F\u007F]/,
  ss = /[\[\].#$\u0000-\u001F\u007F]/,
  rs = function (e) {
    return "string" == typeof e && 0 !== e.length && !is.test(e);
  },
  os = function (e) {
    return "string" == typeof e && 0 !== e.length && !ss.test(e);
  },
  as = function (e) {
    return (
      null === e ||
      "string" == typeof e ||
      ("number" == typeof e && !ne(e)) ||
      (e && "object" == typeof e && T(e, ".sv"))
    );
  },
  ls = function (e, t, n, i) {
    (i && void 0 === t) || hs(k(e, "value"), t, n);
  },
  hs = function (e, t, n) {
    const i = n instanceof Me ? new Ge(n, e) : n;
    if (void 0 === t) throw new Error(e + "contains undefined " + Xe(i));
    if ("function" == typeof t)
      throw new Error(
        e + "contains a function " + Xe(i) + " with contents = " + t.toString()
      );
    if (ne(t)) throw new Error(e + "contains " + t.toString() + " " + Xe(i));
    if ("string" == typeof t && t.length > 10485760 / 3 && N(t) > 10485760)
      throw new Error(
        e +
          "contains a string greater than 10485760 utf8 bytes " +
          Xe(i) +
          " ('" +
          t.substring(0, 50) +
          "...')"
      );
    if (t && "object" == typeof t) {
      let n = !1,
        s = !1;
      if (
        (ce(t, (t, r) => {
          if (".value" === t) n = !0;
          else if (".priority" !== t && ".sv" !== t && ((s = !0), !rs(t)))
            throw new Error(
              e +
                " contains an invalid key (" +
                t +
                ") " +
                Xe(i) +
                '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
            );
          !(function (e, t) {
            e.parts_.length > 0 && (e.byteLength_ += 1),
              e.parts_.push(t),
              (e.byteLength_ += N(t)),
              Je(e);
          })(i, t),
            hs(e, r, i),
            (function (e) {
              const t = e.parts_.pop();
              (e.byteLength_ -= N(t)),
                e.parts_.length > 0 && (e.byteLength_ -= 1);
            })(i);
        }),
        n && s)
      )
        throw new Error(
          e +
            ' contains ".value" child ' +
            Xe(i) +
            " in addition to actual children."
        );
    }
  },
  cs = function (e, t, n, i) {
    if (i && void 0 === t) return;
    const s = k(e, "values");
    if (!t || "object" != typeof t || Array.isArray(t))
      throw new Error(
        s + " must be an object containing the children to replace."
      );
    const r = [];
    ce(t, (e, t) => {
      const i = new Me(e);
      if ((hs(s, t, Ve(n, i)), ".priority" === Be(i) && !as(t)))
        throw new Error(
          s +
            "contains an invalid value for '" +
            i.toString() +
            "', which must be a valid Firebase priority (a string, finite number, server value, or null)."
        );
      r.push(i);
    }),
      (function (e, t) {
        let n, i;
        for (n = 0; n < t.length; n++) {
          i = t[n];
          const s = je(i);
          for (let t = 0; t < s.length; t++)
            if (".priority" === s[t] && t === s.length - 1);
            else if (!rs(s[t]))
              throw new Error(
                e +
                  "contains an invalid key (" +
                  s[t] +
                  ") in path " +
                  i.toString() +
                  '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'
              );
        }
        t.sort(Ke);
        let s = null;
        for (n = 0; n < t.length; n++) {
          if (((i = t[n]), null !== s && $e(s, i)))
            throw new Error(
              e +
                "contains a path " +
                s.toString() +
                " that is ancestor of another path " +
                i.toString()
            );
          s = i;
        }
      })(s, r);
  },
  us = function (e, t, n) {
    if (!n || void 0 !== t) {
      if (ne(t))
        throw new Error(
          k(e, "priority") +
            "is " +
            t.toString() +
            ", but must be a valid Firebase priority (a string, finite number, server value, or null)."
        );
      if (!as(t))
        throw new Error(
          k(e, "priority") +
            "must be a valid Firebase priority (a string, finite number, server value, or null)."
        );
    }
  },
  ds = function (e, t, n, i) {
    if (!((i && void 0 === n) || rs(n)))
      throw new Error(
        k(e, t) +
          'was an invalid key = "' +
          n +
          '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").'
      );
  },
  _s = function (e, t, n, i) {
    if (!((i && void 0 === n) || os(n)))
      throw new Error(
        k(e, t) +
          'was an invalid path = "' +
          n +
          '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"'
      );
  },
  ps = function (e, t) {
    if (".info" === qe(t))
      throw new Error(e + " failed = Can't modify data under /.info/");
  },
  fs = function (e, t) {
    const n = t.path.toString();
    if (
      "string" != typeof t.repoInfo.host ||
      0 === t.repoInfo.host.length ||
      (!rs(t.repoInfo.namespace) &&
        "localhost" !== t.repoInfo.host.split(":")[0]) ||
      (0 !== n.length &&
        !(function (e) {
          return e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), os(e);
        })(n))
    )
      throw new Error(
        k(e, "url") +
          'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'
      );
  };
class gs {
  constructor() {
    (this.eventLists_ = []), (this.recursionDepth_ = 0);
  }
}
function ms(e, t) {
  let n = null;
  for (let i = 0; i < t.length; i++) {
    const s = t[i],
      r = s.getPath();
    null === n || Qe(r, n.path) || (e.eventLists_.push(n), (n = null)),
      null === n && (n = { events: [], path: r }),
      n.events.push(s);
  }
  n && e.eventLists_.push(n);
}
function ys(e, t, n) {
  ms(e, n), Cs(e, (e) => Qe(e, t));
}
function vs(e, t, n) {
  ms(e, n), Cs(e, (e) => $e(e, t) || $e(t, e));
}
function Cs(e, t) {
  e.recursionDepth_++;
  let n = !0;
  for (let i = 0; i < e.eventLists_.length; i++) {
    const s = e.eventLists_[i];
    if (s) {
      t(s.path) ? (ws(e.eventLists_[i]), (e.eventLists_[i] = null)) : (n = !1);
    }
  }
  n && (e.eventLists_ = []), e.recursionDepth_--;
}
function ws(e) {
  for (let t = 0; t < e.events.length; t++) {
    const n = e.events[t];
    if (null !== n) {
      e.events[t] = null;
      const i = n.getEventRunner();
      Q && J("event: " + n.toString()), pe(i);
    }
  }
}
class Ts {
  constructor(e, t, n, i) {
    (this.repoInfo_ = e),
      (this.forceRestClient_ = t),
      (this.authTokenProvider_ = n),
      (this.appCheckProvider_ = i),
      (this.dataUpdateCount = 0),
      (this.statsListener_ = null),
      (this.eventQueue_ = new gs()),
      (this.nextWriteId_ = 1),
      (this.interceptServerDataCallback_ = null),
      (this.onDisconnect_ = Gt()),
      (this.transactionQueueTree_ = new Qi()),
      (this.persistentConnection_ = null),
      (this.key = this.repoInfo_.toURLString());
  }
  toString() {
    return (
      (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host
    );
  }
}
function bs(e, t, n) {
  if (
    ((e.stats_ = Ie(e.repoInfo_)),
    e.forceRestClient_ ||
      (
        ("object" == typeof window &&
          window.navigator &&
          window.navigator.userAgent) ||
        ""
      ).search(
        /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
      ) >= 0)
  )
    (e.server_ = new Qt(
      e.repoInfo_,
      (t, n, i, s) => {
        Ss(e, t, n, i, s);
      },
      e.authTokenProvider_,
      e.appCheckProvider_
    )),
      setTimeout(() => ks(e, !0), 0);
  else {
    if (null != n) {
      if ("object" != typeof n)
        throw new Error(
          "Only objects are supported for option databaseAuthVariableOverride"
        );
      try {
        C(n);
      } catch (e) {
        throw new Error("Invalid authOverride provided: " + e);
      }
    }
    (e.persistentConnection_ = new et(
      e.repoInfo_,
      t,
      (t, n, i, s) => {
        Ss(e, t, n, i, s);
      },
      (t) => {
        ks(e, t);
      },
      (t) => {
        !(function (e, t) {
          ce(t, (t, n) => {
            Ns(e, t, n);
          });
        })(e, t);
      },
      e.authTokenProvider_,
      e.appCheckProvider_,
      n
    )),
      (e.server_ = e.persistentConnection_);
  }
  e.authTokenProvider_.addTokenChangeListener((t) => {
    e.server_.refreshAuthToken(t);
  }),
    e.appCheckProvider_.addTokenChangeListener((t) => {
      e.server_.refreshAppCheckToken(t.token);
    }),
    (e.statsReporter_ = (function (e, t) {
      const n = e.toString();
      return Ee[n] || (Ee[n] = t()), Ee[n];
    })(e.repoInfo_, () => new tn(e.stats_, e.server_))),
    (e.infoData_ = new $t()),
    (e.infoSyncTree_ = new Ci({
      startListening: (t, n, i, s) => {
        let r = [];
        const o = e.infoData_.getNode(t._path);
        return (
          o.isEmpty() ||
            ((r = Ei(e.infoSyncTree_, t._path, o)),
            setTimeout(() => {
              s("ok");
            }, 0)),
          r
        );
      },
      stopListening: () => {},
    })),
    Ns(e, "connected", !1),
    (e.serverSyncTree_ = new Ci({
      startListening: (t, n, i, s) => (
        e.server_.listen(t, i, n, (n, i) => {
          const r = s(n, i);
          vs(e.eventQueue_, t._path, r);
        }),
        []
      ),
      stopListening: (t, n) => {
        e.server_.unlisten(t, n);
      },
    }));
}
function Es(e) {
  const t = e.infoData_.getNode(new Me(".info/serverTimeOffset")).val() || 0;
  return new Date().getTime() + t;
}
function Is(e) {
  return (
    ((t = (t = { timestamp: Es(e) }) || {}).timestamp =
      t.timestamp || new Date().getTime()),
    t
  );
  var t;
}
function Ss(e, t, n, i, s) {
  e.dataUpdateCount++;
  const r = new Me(t);
  n = e.interceptServerDataCallback_ ? e.interceptServerDataCallback_(t, n) : n;
  let o = [];
  if (s)
    if (i) {
      const t = I(n, (e) => Nt(e));
      o = (function (e, t, n, i) {
        const s = Mi(e, i);
        if (s) {
          const i = Fi(s),
            r = i.path,
            o = i.queryId,
            a = Ye(r, t),
            l = yn.fromObject(n);
          return qi(e, r, new ln(sn(o), a, l));
        }
        return [];
      })(e.serverSyncTree_, r, t, s);
    } else {
      const t = Nt(n);
      o = Si(e.serverSyncTree_, r, t, s);
    }
  else if (i) {
    const t = I(n, (e) => Nt(e));
    o = (function (e, t, n) {
      const i = yn.fromObject(n);
      return xi(
        e,
        new ln(
          { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 },
          t,
          i
        )
      );
    })(e.serverSyncTree_, r, t);
  } else {
    const t = Nt(n);
    o = Ei(e.serverSyncTree_, r, t);
  }
  let a = r;
  o.length > 0 && (a = Ws(e, r)), vs(e.eventQueue_, a, o);
}
function ks(e, t) {
  Ns(e, "connected", t),
    !1 === t &&
      (function (e) {
        Ls(e, "onDisconnectEvents");
        const t = Is(e),
          n = Gt();
        Zt(e.onDisconnect_, Fe(), (i, s) => {
          const r = zi(i, s, e.serverSyncTree_, t);
          Jt(n, i, r);
        });
        let i = [];
        Zt(n, Fe(), (t, n) => {
          i = i.concat(Ei(e.serverSyncTree_, t, n));
          const s = Vs(e, t);
          Ws(e, s);
        }),
          (e.onDisconnect_ = Gt()),
          vs(e.eventQueue_, Fe(), i);
      })(e);
}
function Ns(e, t, n) {
  const i = new Me("/.info/" + t),
    s = Nt(n);
  e.infoData_.updateSnapshot(i, s);
  const r = Ei(e.infoSyncTree_, i, s);
  vs(e.eventQueue_, i, r);
}
function Ps(e) {
  return e.nextWriteId_++;
}
function xs(e, t, n, i, s) {
  Ls(e, "set", { path: t.toString(), value: n, priority: i });
  const r = Is(e),
    o = Nt(n, i),
    a = Ni(e.serverSyncTree_, t),
    l = Yi(o, a, r),
    h = Ps(e),
    c = wi(e.serverSyncTree_, t, l, h, !0);
  ms(e.eventQueue_, c),
    e.server_.put(t.toString(), o.val(!0), (n, i) => {
      const r = "ok" === n;
      r || te("set at " + t + " failed: " + n);
      const o = bi(e.serverSyncTree_, h, !r);
      vs(e.eventQueue_, t, o), Ms(e, s, n, i);
    });
  const u = Vs(e, t);
  Ws(e, u), vs(e.eventQueue_, u, []);
}
function Rs(e, t, n) {
  e.server_.onDisconnectCancel(t.toString(), (i, s) => {
    "ok" === i && Xt(e.onDisconnect_, t), Ms(e, n, i, s);
  });
}
function Ds(e, t, n, i) {
  const s = Nt(n);
  e.server_.onDisconnectPut(t.toString(), s.val(!0), (n, r) => {
    "ok" === n && Jt(e.onDisconnect_, t, s), Ms(e, i, n, r);
  });
}
function As(e, t, n) {
  let i;
  (i =
    ".info" === qe(t._path)
      ? Ii(e.infoSyncTree_, t, n)
      : Ii(e.serverSyncTree_, t, n)),
    ys(e.eventQueue_, t._path, i);
}
function Os(e) {
  e.persistentConnection_ &&
    e.persistentConnection_.interrupt("repo_interrupt");
}
function Ls(e, ...t) {
  let n = "";
  e.persistentConnection_ && (n = e.persistentConnection_.id + ":"), J(n, ...t);
}
function Ms(e, t, n, i) {
  t &&
    pe(() => {
      if ("ok" === n) t(null);
      else {
        const e = (n || "error").toUpperCase();
        let s = e;
        i && (s += ": " + i);
        const r = new Error(s);
        (r.code = e), t(r);
      }
    });
}
function Fs(e, t, n) {
  return Ni(e.serverSyncTree_, t, n) || St.EMPTY_NODE;
}
function qs(e, t = e.transactionQueueTree_) {
  if ((t || Hs(e, t), Gi(t))) {
    const n = Bs(e, t);
    a(n.length > 0, "Sending zero length transaction queue");
    n.every((e) => 0 === e.status) &&
      (function (e, t, n) {
        const i = n.map((e) => e.currentWriteId),
          s = Fs(e, t, i);
        let r = s;
        const o = s.hash();
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          a(
            0 === i.status,
            "tryToSendTransactionQueue_: items in queue should all be run."
          ),
            (i.status = 1),
            i.retryCount++;
          const s = Ye(t, i.path);
          r = r.updateChild(s, i.currentOutputSnapshotRaw);
        }
        const l = r.val(!0),
          h = t;
        e.server_.put(
          h.toString(),
          l,
          (i) => {
            Ls(e, "transaction put response", {
              path: h.toString(),
              status: i,
            });
            let s = [];
            if ("ok" === i) {
              const i = [];
              for (let t = 0; t < n.length; t++)
                (n[t].status = 2),
                  (s = s.concat(bi(e.serverSyncTree_, n[t].currentWriteId))),
                  n[t].onComplete &&
                    i.push(() =>
                      n[t].onComplete(
                        null,
                        !0,
                        n[t].currentOutputSnapshotResolved
                      )
                    ),
                  n[t].unwatcher();
              Hs(e, $i(e.transactionQueueTree_, t)),
                qs(e, e.transactionQueueTree_),
                vs(e.eventQueue_, t, s);
              for (let e = 0; e < i.length; e++) pe(i[e]);
            } else {
              if ("datastale" === i)
                for (let e = 0; e < n.length; e++)
                  3 === n[e].status ? (n[e].status = 4) : (n[e].status = 0);
              else {
                te("transaction at " + h.toString() + " failed: " + i);
                for (let e = 0; e < n.length; e++)
                  (n[e].status = 4), (n[e].abortReason = i);
              }
              Ws(e, t);
            }
          },
          o
        );
      })(e, ts(t), n);
  } else
    Xi(t) &&
      Zi(t, (t) => {
        qs(e, t);
      });
}
function Ws(e, t) {
  const n = Us(e, t),
    i = ts(n);
  return (
    (function (e, t, n) {
      if (0 === t.length) return;
      const i = [];
      let s = [];
      const r = t.filter((e) => 0 === e.status).map((e) => e.currentWriteId);
      for (let l = 0; l < t.length; l++) {
        const h = t[l],
          c = Ye(n, h.path);
        let u,
          d = !1;
        if (
          (a(
            null !== c,
            "rerunTransactionsUnderNode_: relativePath should not be null."
          ),
          4 === h.status)
        )
          (d = !0),
            (u = h.abortReason),
            (s = s.concat(bi(e.serverSyncTree_, h.currentWriteId, !0)));
        else if (0 === h.status)
          if (h.retryCount >= 25)
            (d = !0),
              (u = "maxretry"),
              (s = s.concat(bi(e.serverSyncTree_, h.currentWriteId, !0)));
          else {
            const n = Fs(e, h.path, r);
            h.currentInputSnapshot = n;
            const i = t[l].update(n.val());
            if (void 0 !== i) {
              hs("transaction failed: Data returned ", i, h.path);
              let t = Nt(i);
              ("object" == typeof i && null != i && T(i, ".priority")) ||
                (t = t.updatePriority(n.getPriority()));
              const o = h.currentWriteId,
                a = Is(e),
                l = Yi(t, n, a);
              (h.currentOutputSnapshotRaw = t),
                (h.currentOutputSnapshotResolved = l),
                (h.currentWriteId = Ps(e)),
                r.splice(r.indexOf(o), 1),
                (s = s.concat(
                  wi(
                    e.serverSyncTree_,
                    h.path,
                    l,
                    h.currentWriteId,
                    h.applyLocally
                  )
                )),
                (s = s.concat(bi(e.serverSyncTree_, o, !0)));
            } else
              (d = !0),
                (u = "nodata"),
                (s = s.concat(bi(e.serverSyncTree_, h.currentWriteId, !0)));
          }
        vs(e.eventQueue_, n, s),
          (s = []),
          d &&
            ((t[l].status = 2),
            (o = t[l].unwatcher),
            setTimeout(o, Math.floor(0)),
            t[l].onComplete &&
              ("nodata" === u
                ? i.push(() =>
                    t[l].onComplete(null, !1, t[l].currentInputSnapshot)
                  )
                : i.push(() => t[l].onComplete(new Error(u), !1, null))));
      }
      var o;
      Hs(e, e.transactionQueueTree_);
      for (let e = 0; e < i.length; e++) pe(i[e]);
      qs(e, e.transactionQueueTree_);
    })(e, Bs(e, n), i),
    i
  );
}
function Us(e, t) {
  let n,
    i = e.transactionQueueTree_;
  for (n = qe(t); null !== n && void 0 === Gi(i); )
    (i = $i(i, n)), (n = qe((t = Ue(t))));
  return i;
}
function Bs(e, t) {
  const n = [];
  return js(e, t, n), n.sort((e, t) => e.order - t.order), n;
}
function js(e, t, n) {
  const i = Gi(t);
  if (i) for (let e = 0; e < i.length; e++) n.push(i[e]);
  Zi(t, (t) => {
    js(e, t, n);
  });
}
function Hs(e, t) {
  const n = Gi(t);
  if (n) {
    let e = 0;
    for (let t = 0; t < n.length; t++)
      2 !== n[t].status && ((n[e] = n[t]), e++);
    (n.length = e), Ji(t, n.length > 0 ? n : void 0);
  }
  Zi(t, (t) => {
    Hs(e, t);
  });
}
function Vs(e, t) {
  const n = ts(Us(e, t)),
    i = $i(e.transactionQueueTree_, t);
  return (
    (function (e, t, n) {
      let i = n ? e : e.parent;
      for (; null !== i; ) {
        if (t(i)) return !0;
        i = i.parent;
      }
    })(i, (t) => {
      zs(e, t);
    }),
    zs(e, i),
    es(i, (t) => {
      zs(e, t);
    }),
    n
  );
}
function zs(e, t) {
  const n = Gi(t);
  if (n) {
    const i = [];
    let s = [],
      r = -1;
    for (let t = 0; t < n.length; t++)
      3 === n[t].status ||
        (1 === n[t].status
          ? (a(r === t - 1, "All SENT items should be at beginning of queue."),
            (r = t),
            (n[t].status = 3),
            (n[t].abortReason = "set"))
          : (a(0 === n[t].status, "Unexpected transaction status in abort"),
            n[t].unwatcher(),
            (s = s.concat(bi(e.serverSyncTree_, n[t].currentWriteId, !0))),
            n[t].onComplete &&
              i.push(n[t].onComplete.bind(null, new Error("set"), !1, null))));
    -1 === r ? Ji(t, void 0) : (n.length = r + 1), vs(e.eventQueue_, ts(t), s);
    for (let e = 0; e < i.length; e++) pe(i[e]);
  }
}
const Ys = function (e, t) {
    const n = Ks(e),
      i = n.namespace;
    "firebase.com" === n.domain &&
      ee(
        n.host +
          " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"
      ),
      (i && "undefined" !== i) ||
        "localhost" === n.domain ||
        ee(
          "Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"
        ),
      n.secure ||
        ("undefined" != typeof window &&
          window.location &&
          window.location.protocol &&
          -1 !== window.location.protocol.indexOf("https:") &&
          te(
            "Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."
          ));
    const s = "ws" === n.scheme || "wss" === n.scheme;
    return {
      repoInfo: new Ce(n.host, n.secure, i, s, t, "", i !== n.subdomain),
      path: new Me(n.pathString),
    };
  },
  Ks = function (e) {
    let t = "",
      n = "",
      i = "",
      s = "",
      r = "",
      o = !0,
      a = "https",
      l = 443;
    if ("string" == typeof e) {
      let h = e.indexOf("//");
      h >= 0 && ((a = e.substring(0, h - 1)), (e = e.substring(h + 2)));
      let c = e.indexOf("/");
      -1 === c && (c = e.length);
      let u = e.indexOf("?");
      -1 === u && (u = e.length),
        (t = e.substring(0, Math.min(c, u))),
        c < u &&
          (s = (function (e) {
            let t = "";
            const n = e.split("/");
            for (let e = 0; e < n.length; e++)
              if (n[e].length > 0) {
                let i = n[e];
                try {
                  i = decodeURIComponent(i.replace(/\+/g, " "));
                } catch (e) {}
                t += "/" + i;
              }
            return t;
          })(e.substring(c, u)));
      const d = (function (e) {
        const t = {};
        "?" === e.charAt(0) && (e = e.substring(1));
        for (const n of e.split("&")) {
          if (0 === n.length) continue;
          const i = n.split("=");
          2 === i.length
            ? (t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]))
            : te(`Invalid query segment '${n}' in query '${e}'`);
        }
        return t;
      })(e.substring(Math.min(e.length, u)));
      (h = t.indexOf(":")),
        h >= 0
          ? ((o = "https" === a || "wss" === a),
            (l = parseInt(t.substring(h + 1), 10)))
          : (h = t.length);
      const _ = t.slice(0, h);
      if ("localhost" === _.toLowerCase()) n = "localhost";
      else if (_.split(".").length <= 2) n = _;
      else {
        const e = t.indexOf(".");
        (i = t.substring(0, e).toLowerCase()),
          (n = t.substring(e + 1)),
          (r = i);
      }
      "ns" in d && (r = d.ns);
    }
    return {
      host: t,
      port: l,
      domain: n,
      subdomain: i,
      secure: o,
      scheme: a,
      pathString: s,
      namespace: r,
    };
  };
class Qs {
  constructor(e, t, n, i) {
    (this.eventType = e),
      (this.eventRegistration = t),
      (this.snapshot = n),
      (this.prevName = i);
  }
  getPath() {
    const e = this.snapshot.ref;
    return "value" === this.eventType ? e._path : e.parent._path;
  }
  getEventType() {
    return this.eventType;
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return (
      this.getPath().toString() +
      ":" +
      this.eventType +
      ":" +
      C(this.snapshot.exportVal())
    );
  }
}
class $s {
  constructor(e, t, n) {
    (this.eventRegistration = e), (this.error = t), (this.path = n);
  }
  getPath() {
    return this.path;
  }
  getEventType() {
    return "cancel";
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this);
  }
  toString() {
    return this.path.toString() + ":cancel";
  }
}
class Gs {
  constructor(e, t) {
    (this.snapshotCallback = e), (this.cancelCallback = t);
  }
  onValue(e, t) {
    this.snapshotCallback.call(null, e, t);
  }
  onCancel(e) {
    return (
      a(
        this.hasCancelCallback,
        "Raising a cancel event on a listener with no cancel callback"
      ),
      this.cancelCallback.call(null, e)
    );
  }
  get hasCancelCallback() {
    return !!this.cancelCallback;
  }
  matches(e) {
    return (
      this.snapshotCallback === e.snapshotCallback ||
      (void 0 !== this.snapshotCallback.userCallback &&
        this.snapshotCallback.userCallback ===
          e.snapshotCallback.userCallback &&
        this.snapshotCallback.context === e.snapshotCallback.context)
    );
  }
}
class Js {
  constructor(e, t) {
    (this._repo = e), (this._path = t);
  }
  cancel() {
    const e = new g();
    return (
      Rs(
        this._repo,
        this._path,
        e.wrapCallback(() => {})
      ),
      e.promise
    );
  }
  remove() {
    ps("OnDisconnect.remove", this._path);
    const e = new g();
    return (
      Ds(
        this._repo,
        this._path,
        null,
        e.wrapCallback(() => {})
      ),
      e.promise
    );
  }
  set(e) {
    ps("OnDisconnect.set", this._path),
      ls("OnDisconnect.set", e, this._path, !1);
    const t = new g();
    return (
      Ds(
        this._repo,
        this._path,
        e,
        t.wrapCallback(() => {})
      ),
      t.promise
    );
  }
  setWithPriority(e, t) {
    ps("OnDisconnect.setWithPriority", this._path),
      ls("OnDisconnect.setWithPriority", e, this._path, !1),
      us("OnDisconnect.setWithPriority", t, !1);
    const n = new g();
    return (
      (function (e, t, n, i, s) {
        const r = Nt(n, i);
        e.server_.onDisconnectPut(t.toString(), r.val(!0), (n, i) => {
          "ok" === n && Jt(e.onDisconnect_, t, r), Ms(0, s, n, i);
        });
      })(
        this._repo,
        this._path,
        e,
        t,
        n.wrapCallback(() => {})
      ),
      n.promise
    );
  }
  update(e) {
    ps("OnDisconnect.update", this._path),
      cs("OnDisconnect.update", e, this._path, !1);
    const t = new g();
    return (
      (function (e, t, n, i) {
        if (E(n))
          return (
            J(
              "onDisconnect().update() called with empty data.  Don't do anything."
            ),
            void Ms(0, i, "ok", void 0)
          );
        e.server_.onDisconnectMerge(t.toString(), n, (s, r) => {
          "ok" === s &&
            ce(n, (n, i) => {
              const s = Nt(i);
              Jt(e.onDisconnect_, Ve(t, n), s);
            }),
            Ms(0, i, s, r);
        });
      })(
        this._repo,
        this._path,
        e,
        t.wrapCallback(() => {})
      ),
      t.promise
    );
  }
}
class Xs {
  constructor(e, t, n, i) {
    (this._repo = e),
      (this._path = t),
      (this._queryParams = n),
      (this._orderByCalled = i);
  }
  get key() {
    return ze(this._path) ? null : Be(this._path);
  }
  get ref() {
    return new nr(this._repo, this._path);
  }
  get _queryIdentifier() {
    const e = Kt(this._queryParams),
      t = le(e);
    return "{}" === t ? "default" : t;
  }
  get _queryObject() {
    return Kt(this._queryParams);
  }
  isEqual(e) {
    if (!((e = P(e)) instanceof Xs)) return !1;
    const t = this._repo === e._repo,
      n = Qe(this._path, e._path),
      i = this._queryIdentifier === e._queryIdentifier;
    return t && n && i;
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (
      this._repo.toString() +
      (function (e) {
        let t = "";
        for (let n = e.pieceNum_; n < e.pieces_.length; n++)
          "" !== e.pieces_[n] &&
            (t += "/" + encodeURIComponent(String(e.pieces_[n])));
        return t || "/";
      })(this._path)
    );
  }
}
function Zs(e, t) {
  if (!0 === e._orderByCalled)
    throw new Error(t + ": You can't combine multiple orderBy calls.");
}
function er(e) {
  let t = null,
    n = null;
  if (
    (e.hasStart() && (t = e.getIndexStartValue()),
    e.hasEnd() && (n = e.getIndexEndValue()),
    e.getIndex() === rt)
  ) {
    const i =
        "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
      s =
        "Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";
    if (e.hasStart()) {
      if (e.getIndexStartName() !== ie) throw new Error(i);
      if ("string" != typeof t) throw new Error(s);
    }
    if (e.hasEnd()) {
      if (e.getIndexEndName() !== se) throw new Error(i);
      if ("string" != typeof n) throw new Error(s);
    }
  } else if (e.getIndex() === yt) {
    if ((null != t && !as(t)) || (null != n && !as(n)))
      throw new Error(
        "Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string)."
      );
  } else if (
    (a(
      e.getIndex() instanceof Pt || e.getIndex() === xt,
      "unknown index type."
    ),
    (null != t && "object" == typeof t) || (null != n && "object" == typeof n))
  )
    throw new Error(
      "Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object."
    );
}
function tr(e) {
  if (e.hasStart() && e.hasEnd() && e.hasLimit() && !e.hasAnchoredLimit())
    throw new Error(
      "Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead."
    );
}
class nr extends Xs {
  constructor(e, t) {
    super(e, t, new jt(), !1);
  }
  get parent() {
    const e = He(this._path);
    return null === e ? null : new nr(this._repo, e);
  }
  get root() {
    let e = this;
    for (; null !== e.parent; ) e = e.parent;
    return e;
  }
}
class ir {
  constructor(e, t, n) {
    (this._node = e), (this.ref = t), (this._index = n);
  }
  get priority() {
    return this._node.getPriority().val();
  }
  get key() {
    return this.ref.key;
  }
  get size() {
    return this._node.numChildren();
  }
  child(e) {
    const t = new Me(e),
      n = or(this.ref, e);
    return new ir(this._node.getChild(t), n, yt);
  }
  exists() {
    return !this._node.isEmpty();
  }
  exportVal() {
    return this._node.val(!0);
  }
  forEach(e) {
    if (this._node.isLeafNode()) return !1;
    return !!this._node.forEachChild(this._index, (t, n) =>
      e(new ir(n, or(this.ref, t), yt))
    );
  }
  hasChild(e) {
    const t = new Me(e);
    return !this._node.getChild(t).isEmpty();
  }
  hasChildren() {
    return !this._node.isLeafNode() && !this._node.isEmpty();
  }
  toJSON() {
    return this.exportVal();
  }
  val() {
    return this._node.val();
  }
}
function sr(e, t) {
  return (
    (e = P(e))._checkNotDeleted("ref"), void 0 !== t ? or(e._root, t) : e._root
  );
}
function rr(e, t) {
  (e = P(e))._checkNotDeleted("refFromURL");
  const n = Ys(t, e._repo.repoInfo_.nodeAdmin);
  fs("refFromURL", n);
  const i = n.repoInfo;
  return (
    e._repo.repoInfo_.isCustomHost() ||
      i.host === e._repo.repoInfo_.host ||
      ee(
        "refFromURL: Host name does not match the current database: (found " +
          i.host +
          " but expected " +
          e._repo.repoInfo_.host +
          ")"
      ),
    sr(e, n.path.toString())
  );
}
function or(e, t) {
  var n, i, s, r;
  return (
    null === qe((e = P(e))._path)
      ? ((n = "child"),
        (i = "path"),
        (r = !1),
        (s = t) && (s = s.replace(/^\/*\.info(\/|$)/, "/")),
        _s(n, i, s, r))
      : _s("child", "path", t, !1),
    new nr(e._repo, Ve(e._path, t))
  );
}
function ar(e) {
  return (e = P(e)), new Js(e._repo, e._path);
}
function lr(e, t) {
  (e = P(e)), ps("push", e._path), ls("push", t, e._path, !0);
  const n = Es(e._repo),
    i = Dt(n),
    s = or(e, i),
    r = or(e, i);
  let o;
  return (
    (o = null != t ? cr(r, t).then(() => r) : Promise.resolve(r)),
    (s.then = o.then.bind(o)),
    (s.catch = o.then.bind(o, void 0)),
    s
  );
}
function hr(e) {
  return ps("remove", e._path), cr(e, null);
}
function cr(e, t) {
  (e = P(e)), ps("set", e._path), ls("set", t, e._path, !1);
  const n = new g();
  return (
    xs(
      e._repo,
      e._path,
      t,
      null,
      n.wrapCallback(() => {})
    ),
    n.promise
  );
}
function ur(e, t) {
  (e = P(e)), ps("setPriority", e._path), us("setPriority", t, !1);
  const n = new g();
  return (
    xs(
      e._repo,
      Ve(e._path, ".priority"),
      t,
      null,
      n.wrapCallback(() => {})
    ),
    n.promise
  );
}
function dr(e, t, n) {
  if (
    (ps("setWithPriority", e._path),
    ls("setWithPriority", t, e._path, !1),
    us("setWithPriority", n, !1),
    ".length" === e.key || ".keys" === e.key)
  )
    throw "setWithPriority failed: " + e.key + " is a read-only object.";
  const i = new g();
  return (
    xs(
      e._repo,
      e._path,
      t,
      n,
      i.wrapCallback(() => {})
    ),
    i.promise
  );
}
function _r(e, t) {
  cs("update", t, e._path, !1);
  const n = new g();
  return (
    (function (e, t, n, i) {
      Ls(e, "update", { path: t.toString(), value: n });
      let s = !0;
      const r = Is(e),
        o = {};
      if (
        (ce(n, (n, i) => {
          (s = !1), (o[n] = zi(Ve(t, n), Nt(i), e.serverSyncTree_, r));
        }),
        s)
      )
        J("update() called with empty data.  Don't do anything."),
          Ms(0, i, "ok", void 0);
      else {
        const s = Ps(e),
          r = Ti(e.serverSyncTree_, t, o, s);
        ms(e.eventQueue_, r),
          e.server_.merge(t.toString(), n, (n, r) => {
            const o = "ok" === n;
            o || te("update at " + t + " failed: " + n);
            const a = bi(e.serverSyncTree_, s, !o),
              l = a.length > 0 ? Ws(e, t) : t;
            vs(e.eventQueue_, l, a), Ms(0, i, n, r);
          }),
          ce(n, (n) => {
            const i = Vs(e, Ve(t, n));
            Ws(e, i);
          }),
          vs(e.eventQueue_, t, []);
      }
    })(
      e._repo,
      e._path,
      t,
      n.wrapCallback(() => {})
    ),
    n.promise
  );
}
function pr(e) {
  e = P(e);
  const t = new Gs(() => {}),
    n = new fr(t);
  return (function (e, t, n) {
    const i = Pi(e.serverSyncTree_, t);
    return null != i
      ? Promise.resolve(i)
      : e.server_.get(t).then(
          (i) => {
            const s = Nt(i).withIndex(t._queryParams.getIndex());
            let r;
            if (
              (ki(e.serverSyncTree_, t, n, !0), t._queryParams.loadsAllData())
            )
              r = Ei(e.serverSyncTree_, t._path, s);
            else {
              const n = Oi(e.serverSyncTree_, t);
              r = Si(e.serverSyncTree_, t._path, s, n);
            }
            return (
              vs(e.eventQueue_, t._path, r),
              Ii(e.serverSyncTree_, t, n, null, !0),
              s
            );
          },
          (n) => (
            Ls(e, "get for query " + C(t) + " failed: " + n),
            Promise.reject(new Error(n))
          )
        );
  })(e._repo, e, n).then(
    (t) => new ir(t, new nr(e._repo, e._path), e._queryParams.getIndex())
  );
}
class fr {
  constructor(e) {
    this.callbackContext = e;
  }
  respondsTo(e) {
    return "value" === e;
  }
  createEvent(e, t) {
    const n = t._queryParams.getIndex();
    return new Qs(
      "value",
      this,
      new ir(e.snapshotNode, new nr(t._repo, t._path), n)
    );
  }
  getEventRunner(e) {
    return "cancel" === e.getEventType()
      ? () => this.callbackContext.onCancel(e.error)
      : () => this.callbackContext.onValue(e.snapshot, null);
  }
  createCancelEvent(e, t) {
    return this.callbackContext.hasCancelCallback ? new $s(this, e, t) : null;
  }
  matches(e) {
    return (
      e instanceof fr &&
      (!e.callbackContext ||
        !this.callbackContext ||
        e.callbackContext.matches(this.callbackContext))
    );
  }
  hasAnyCallback() {
    return null !== this.callbackContext;
  }
}
class gr {
  constructor(e, t) {
    (this.eventType = e), (this.callbackContext = t);
  }
  respondsTo(e) {
    let t = "children_added" === e ? "child_added" : e;
    return (
      (t = "children_removed" === t ? "child_removed" : t), this.eventType === t
    );
  }
  createCancelEvent(e, t) {
    return this.callbackContext.hasCancelCallback ? new $s(this, e, t) : null;
  }
  createEvent(e, t) {
    a(null != e.childName, "Child events should have a childName.");
    const n = or(new nr(t._repo, t._path), e.childName),
      i = t._queryParams.getIndex();
    return new Qs(e.type, this, new ir(e.snapshotNode, n, i), e.prevName);
  }
  getEventRunner(e) {
    return "cancel" === e.getEventType()
      ? () => this.callbackContext.onCancel(e.error)
      : () => this.callbackContext.onValue(e.snapshot, e.prevName);
  }
  matches(e) {
    return (
      e instanceof gr &&
      this.eventType === e.eventType &&
      (!this.callbackContext ||
        !e.callbackContext ||
        this.callbackContext.matches(e.callbackContext))
    );
  }
  hasAnyCallback() {
    return !!this.callbackContext;
  }
}
function mr(e, t, n, i, s) {
  let r;
  if (
    ("object" == typeof i && ((r = void 0), (s = i)),
    "function" == typeof i && (r = i),
    s && s.onlyOnce)
  ) {
    const t = n,
      i = (n, i) => {
        As(e._repo, e, a), t(n, i);
      };
    (i.userCallback = n.userCallback), (i.context = n.context), (n = i);
  }
  const o = new Gs(n, r || void 0),
    a = "value" === t ? new fr(o) : new gr(t, o);
  return (
    (function (e, t, n) {
      let i;
      (i =
        ".info" === qe(t._path)
          ? ki(e.infoSyncTree_, t, n)
          : ki(e.serverSyncTree_, t, n)),
        ys(e.eventQueue_, t._path, i);
    })(e._repo, e, a),
    () => As(e._repo, e, a)
  );
}
function yr(e, t, n, i) {
  return mr(e, "value", t, n, i);
}
function vr(e, t, n, i) {
  return mr(e, "child_added", t, n, i);
}
function Cr(e, t, n, i) {
  return mr(e, "child_changed", t, n, i);
}
function wr(e, t, n, i) {
  return mr(e, "child_moved", t, n, i);
}
function Tr(e, t, n, i) {
  return mr(e, "child_removed", t, n, i);
}
function br(e, t, n) {
  let i = null;
  const s = n ? new Gs(n) : null;
  "value" === t ? (i = new fr(s)) : t && (i = new gr(t, s)), As(e._repo, e, i);
}
class Er {}
class Ir extends Er {
  constructor(e, t) {
    super(), (this._value = e), (this._key = t);
  }
  _apply(e) {
    ls("endAt", this._value, e._path, !0);
    const t = Vt(e._queryParams, this._value, this._key);
    if ((tr(t), er(t), e._queryParams.hasEnd()))
      throw new Error(
        "endAt: Starting point was already set (by another call to endAt, endBefore or equalTo)."
      );
    return new Xs(e._repo, e._path, t, e._orderByCalled);
  }
}
function Sr(e, t) {
  return ds("endAt", "key", t, !0), new Ir(e, t);
}
class kr extends Er {
  constructor(e, t) {
    super(), (this._value = e), (this._key = t);
  }
  _apply(e) {
    ls("endBefore", this._value, e._path, !1);
    const t = (function (e, t, n) {
      let i, s;
      return (
        e.index_ === rt
          ? ("string" == typeof t && (t = Ot(t)), (s = Vt(e, t, n)))
          : ((i = null == n ? ie : Ot(n)), (s = Vt(e, t, i))),
        (s.endBeforeSet_ = !0),
        s
      );
    })(e._queryParams, this._value, this._key);
    if ((tr(t), er(t), e._queryParams.hasEnd()))
      throw new Error(
        "endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo)."
      );
    return new Xs(e._repo, e._path, t, e._orderByCalled);
  }
}
function Nr(e, t) {
  return ds("endBefore", "key", t, !0), new kr(e, t);
}
class Pr extends Er {
  constructor(e, t) {
    super(), (this._value = e), (this._key = t);
  }
  _apply(e) {
    ls("startAt", this._value, e._path, !0);
    const t = Ht(e._queryParams, this._value, this._key);
    if ((tr(t), er(t), e._queryParams.hasStart()))
      throw new Error(
        "startAt: Starting point was already set (by another call to startAt, startBefore or equalTo)."
      );
    return new Xs(e._repo, e._path, t, e._orderByCalled);
  }
}
function xr(e = null, t) {
  return ds("startAt", "key", t, !0), new Pr(e, t);
}
class Rr extends Er {
  constructor(e, t) {
    super(), (this._value = e), (this._key = t);
  }
  _apply(e) {
    ls("startAfter", this._value, e._path, !1);
    const t = (function (e, t, n) {
      let i;
      if (e.index_ === rt)
        "string" == typeof t && (t = At(t)), (i = Ht(e, t, n));
      else {
        let s;
        (s = null == n ? se : At(n)), (i = Ht(e, t, s));
      }
      return (i.startAfterSet_ = !0), i;
    })(e._queryParams, this._value, this._key);
    if ((tr(t), er(t), e._queryParams.hasStart()))
      throw new Error(
        "startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo)."
      );
    return new Xs(e._repo, e._path, t, e._orderByCalled);
  }
}
function Dr(e, t) {
  return ds("startAfter", "key", t, !0), new Rr(e, t);
}
class Ar extends Er {
  constructor(e) {
    super(), (this._limit = e);
  }
  _apply(e) {
    if (e._queryParams.hasLimit())
      throw new Error(
        "limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast)."
      );
    return new Xs(
      e._repo,
      e._path,
      (function (e, t) {
        const n = e.copy();
        return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "l"), n;
      })(e._queryParams, this._limit),
      e._orderByCalled
    );
  }
}
function Or(e) {
  if ("number" != typeof e || Math.floor(e) !== e || e <= 0)
    throw new Error("limitToFirst: First argument must be a positive integer.");
  return new Ar(e);
}
class Lr extends Er {
  constructor(e) {
    super(), (this._limit = e);
  }
  _apply(e) {
    if (e._queryParams.hasLimit())
      throw new Error(
        "limitToLast: Limit was already set (by another call to limitToFirst or limitToLast)."
      );
    return new Xs(
      e._repo,
      e._path,
      (function (e, t) {
        const n = e.copy();
        return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "r"), n;
      })(e._queryParams, this._limit),
      e._orderByCalled
    );
  }
}
function Mr(e) {
  if ("number" != typeof e || Math.floor(e) !== e || e <= 0)
    throw new Error("limitToLast: First argument must be a positive integer.");
  return new Lr(e);
}
class Fr extends Er {
  constructor(e) {
    super(), (this._path = e);
  }
  _apply(e) {
    Zs(e, "orderByChild");
    const t = new Me(this._path);
    if (ze(t))
      throw new Error(
        "orderByChild: cannot pass in empty path. Use orderByValue() instead."
      );
    const n = new Pt(t),
      i = zt(e._queryParams, n);
    return er(i), new Xs(e._repo, e._path, i, !0);
  }
}
function qr(e) {
  if ("$key" === e)
    throw new Error(
      'orderByChild: "$key" is invalid.  Use orderByKey() instead.'
    );
  if ("$priority" === e)
    throw new Error(
      'orderByChild: "$priority" is invalid.  Use orderByPriority() instead.'
    );
  if ("$value" === e)
    throw new Error(
      'orderByChild: "$value" is invalid.  Use orderByValue() instead.'
    );
  return _s("orderByChild", "path", e, !1), new Fr(e);
}
class Wr extends Er {
  _apply(e) {
    Zs(e, "orderByKey");
    const t = zt(e._queryParams, rt);
    return er(t), new Xs(e._repo, e._path, t, !0);
  }
}
function Ur() {
  return new Wr();
}
class Br extends Er {
  _apply(e) {
    Zs(e, "orderByPriority");
    const t = zt(e._queryParams, yt);
    return er(t), new Xs(e._repo, e._path, t, !0);
  }
}
function jr() {
  return new Br();
}
class Hr extends Er {
  _apply(e) {
    Zs(e, "orderByValue");
    const t = zt(e._queryParams, xt);
    return er(t), new Xs(e._repo, e._path, t, !0);
  }
}
function Vr() {
  return new Hr();
}
class zr extends Er {
  constructor(e, t) {
    super(), (this._value = e), (this._key = t);
  }
  _apply(e) {
    if ((ls("equalTo", this._value, e._path, !1), e._queryParams.hasStart()))
      throw new Error(
        "equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo)."
      );
    if (e._queryParams.hasEnd())
      throw new Error(
        "equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo)."
      );
    return new Ir(this._value, this._key)._apply(
      new Pr(this._value, this._key)._apply(e)
    );
  }
}
function Yr(e, t) {
  return ds("equalTo", "key", t, !0), new zr(e, t);
}
function Kr(e, ...t) {
  let n = P(e);
  for (const e of t) n = e._apply(n);
  return n;
}
!(function (e) {
  a(!oi, "__referenceConstructor has already been defined"), (oi = e);
})(nr),
  (function (e) {
    a(!ai, "__referenceConstructor has already been defined"), (ai = e);
  })(nr);
const Qr = {};
let $r = !1;
function Gr(e, t, n, i, s) {
  let r = i || e.options.databaseURL;
  void 0 === r &&
    (e.options.projectId ||
      ee(
        "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
      ),
    J("Using default host for project ", e.options.projectId),
    (r = `${e.options.projectId}-default-rtdb.firebaseio.com`));
  let o,
    a,
    l = Ys(r, s),
    h = l.repoInfo;
  "undefined" != typeof process &&
    process.env &&
    (a = process.env.FIREBASE_DATABASE_EMULATOR_HOST),
    a
      ? ((o = !0),
        (r = `http://${a}?ns=${h.namespace}`),
        (l = Ys(r, s)),
        (h = l.repoInfo))
      : (o = !l.repoInfo.secure);
  const c = s && o ? new ye(ye.OWNER) : new me(e.name, e.options, t);
  fs("Invalid Firebase Database URL", l),
    ze(l.path) ||
      ee(
        "Database URL must point to the root of a Firebase Database (not including a child path)."
      );
  const u = (function (e, t, n, i) {
    let s = Qr[t.name];
    s || ((s = {}), (Qr[t.name] = s));
    let r = s[e.toURLString()];
    r &&
      ee(
        "Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."
      );
    return (r = new Ts(e, $r, n, i)), (s[e.toURLString()] = r), r;
  })(h, e, c, new ge(e.name, n));
  return new Jr(u, e);
}
class Jr {
  constructor(e, t) {
    (this._repoInternal = e),
      (this.app = t),
      (this.type = "database"),
      (this._instanceStarted = !1);
  }
  get _repo() {
    return (
      this._instanceStarted ||
        (bs(
          this._repoInternal,
          this.app.options.appId,
          this.app.options.databaseAuthVariableOverride
        ),
        (this._instanceStarted = !0)),
      this._repoInternal
    );
  }
  get _root() {
    return (
      this._rootInternal || (this._rootInternal = new nr(this._repo, Fe())),
      this._rootInternal
    );
  }
  _delete() {
    return (
      null !== this._rootInternal &&
        (!(function (e, t) {
          const n = Qr[t];
          (n && n[e.key] === e) ||
            ee(`Database ${t}(${e.repoInfo_}) has already been deleted.`),
            Os(e),
            delete n[e.key];
        })(this._repo, this.app.name),
        (this._repoInternal = null),
        (this._rootInternal = null)),
      Promise.resolve()
    );
  }
  _checkNotDeleted(e) {
    null === this._rootInternal &&
      ee("Cannot call " + e + " on a deleted database.");
  }
}
function Xr() {
  Re.IS_TRANSPORT_INITIALIZED &&
    te(
      "Transport has already been initialized. Please call this function before calling ref or setting up a listener"
    );
}
function Zr() {
  Xr(), ke.forceDisallow();
}
function eo() {
  Xr(), xe.forceDisallow(), ke.forceAllow();
}
function to(n = e(), i) {
  return t(n, "database").getImmediate({ identifier: i });
}
function no(e, t, n, i = {}) {
  (e = P(e))._checkNotDeleted("useEmulator"),
    e._instanceStarted &&
      ee(
        "Cannot call useEmulator() after instance has already been initialized."
      );
  const s = e._repoInternal;
  let r;
  if (s.repoInfo_.nodeAdmin)
    i.mockUserToken &&
      ee(
        'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'
      ),
      (r = new ye(ye.OWNER));
  else if (i.mockUserToken) {
    const t =
      "string" == typeof i.mockUserToken
        ? i.mockUserToken
        : (function (e, t) {
            if (e.uid)
              throw new Error(
                'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
              );
            const n = t || "demo-project",
              i = e.iat || 0,
              s = e.sub || e.user_id;
            if (!s)
              throw new Error(
                "mockUserToken must contain 'sub' or 'user_id' field!"
              );
            const r = Object.assign(
              {
                iss: `https://securetoken.google.com/${n}`,
                aud: n,
                iat: i,
                exp: i + 3600,
                auth_time: i,
                sub: s,
                user_id: s,
                firebase: { sign_in_provider: "custom", identities: {} },
              },
              e
            );
            return [
              d(JSON.stringify({ alg: "none", type: "JWT" })),
              d(JSON.stringify(r)),
              "",
            ].join(".");
          })(i.mockUserToken, e.app.options.projectId);
    r = new ye(t);
  }
  !(function (e, t, n, i) {
    (e.repoInfo_ = new Ce(
      `${t}:${n}`,
      !1,
      e.repoInfo_.namespace,
      e.repoInfo_.webSocketOnly,
      e.repoInfo_.nodeAdmin,
      e.repoInfo_.persistenceKey,
      e.repoInfo_.includeNamespaceInQueryParams
    )),
      i && (e.authTokenProvider_ = i);
  })(s, t, n, r);
}
function io(e) {
  (e = P(e))._checkNotDeleted("goOffline"), Os(e._repo);
}
function so(e) {
  var t;
  (e = P(e))._checkNotDeleted("goOnline"),
    (t = e._repo).persistentConnection_ &&
      t.persistentConnection_.resume("repo_interrupt");
}
function ro(e, t) {
  G(e, t);
}
const oo = { ".sv": "timestamp" };
function ao() {
  return oo;
}
function lo(e) {
  return { ".sv": { increment: e } };
}
class ho {
  constructor(e, t) {
    (this.committed = e), (this.snapshot = t);
  }
  toJSON() {
    return { committed: this.committed, snapshot: this.snapshot.toJSON() };
  }
}
function co(e, t, n) {
  var i;
  if (
    ((e = P(e)),
    ps("Reference.transaction", e._path),
    ".length" === e.key || ".keys" === e.key)
  )
    throw "Reference.transaction failed: " + e.key + " is a read-only object.";
  const s =
      null === (i = null == n ? void 0 : n.applyLocally) || void 0 === i || i,
    r = new g(),
    o = yr(e, () => {});
  return (
    (function (e, t, n, i, s, r) {
      Ls(e, "transaction on " + t);
      const o = {
          path: t,
          update: n,
          onComplete: i,
          status: null,
          order: z(),
          applyLocally: r,
          retryCount: 0,
          unwatcher: s,
          abortReason: null,
          currentWriteId: null,
          currentInputSnapshot: null,
          currentOutputSnapshotRaw: null,
          currentOutputSnapshotResolved: null,
        },
        l = Fs(e, t, void 0);
      o.currentInputSnapshot = l;
      const h = o.update(l.val());
      if (void 0 === h)
        o.unwatcher(),
          (o.currentOutputSnapshotRaw = null),
          (o.currentOutputSnapshotResolved = null),
          o.onComplete && o.onComplete(null, !1, o.currentInputSnapshot);
      else {
        hs("transaction failed: Data returned ", h, o.path), (o.status = 0);
        const n = $i(e.transactionQueueTree_, t),
          i = Gi(n) || [];
        let s;
        i.push(o),
          Ji(n, i),
          "object" == typeof h && null !== h && T(h, ".priority")
            ? ((s = b(h, ".priority")),
              a(
                as(s),
                "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null."
              ))
            : (s = (Ni(e.serverSyncTree_, t) || St.EMPTY_NODE)
                .getPriority()
                .val());
        const r = Is(e),
          c = Nt(h, s),
          u = Yi(c, l, r);
        (o.currentOutputSnapshotRaw = c),
          (o.currentOutputSnapshotResolved = u),
          (o.currentWriteId = Ps(e));
        const d = wi(e.serverSyncTree_, t, u, o.currentWriteId, o.applyLocally);
        vs(e.eventQueue_, t, d), qs(e, e.transactionQueueTree_);
      }
    })(
      e._repo,
      e._path,
      t,
      (t, n, i) => {
        let s = null;
        t
          ? r.reject(t)
          : ((s = new ir(i, new nr(e._repo, e._path), yt)),
            r.resolve(new ho(n, s)));
      },
      o,
      s
    ),
    r.promise
  );
}
(et.prototype.simpleListen = function (e, t) {
  this.sendRequest("q", { p: e }, t);
}),
  (et.prototype.echo = function (e, t) {
    this.sendRequest("echo", { d: e }, t);
  });
const uo = function (e) {
    const t = et.prototype.put;
    return (
      (et.prototype.put = function (n, i, s, r) {
        void 0 !== r && (r = e()), t.call(this, n, i, s, r);
      }),
      function () {
        et.prototype.put = t;
      }
    );
  },
  _o = function (e) {
    !(function (e) {
      $r = e;
    })(e);
  };
var po;
q(s),
  n(
    new x(
      "database",
      (e, { instanceIdentifier: t }) =>
        Gr(
          e.getProvider("app").getImmediate(),
          e.getProvider("auth-internal"),
          e.getProvider("app-check-internal"),
          t
        ),
      "PUBLIC"
    ).setMultipleInstances(!0)
  ),
  i(M, "0.13.6", po),
  i(M, "0.13.6", "esm2017");
export {
  ir as DataSnapshot,
  Jr as Database,
  Js as OnDisconnect,
  Er as QueryConstraint,
  ho as TransactionResult,
  Xs as _QueryImpl,
  jt as _QueryParams,
  nr as _ReferenceImpl,
  _o as _TEST_ACCESS_forceRestClient,
  uo as _TEST_ACCESS_hijackHash,
  Gr as _repoManagerDatabaseFromApp,
  q as _setSDKVersion,
  _s as _validatePathString,
  ps as _validateWritablePath,
  or as child,
  no as connectDatabaseEmulator,
  ro as enableLogging,
  Sr as endAt,
  Nr as endBefore,
  Yr as equalTo,
  eo as forceLongPolling,
  Zr as forceWebSockets,
  pr as get,
  to as getDatabase,
  io as goOffline,
  so as goOnline,
  lo as increment,
  Or as limitToFirst,
  Mr as limitToLast,
  br as off,
  vr as onChildAdded,
  Cr as onChildChanged,
  wr as onChildMoved,
  Tr as onChildRemoved,
  ar as onDisconnect,
  yr as onValue,
  qr as orderByChild,
  Ur as orderByKey,
  jr as orderByPriority,
  Vr as orderByValue,
  lr as push,
  Kr as query,
  sr as ref,
  rr as refFromURL,
  hr as remove,
  co as runTransaction,
  ao as serverTimestamp,
  cr as set,
  ur as setPriority,
  dr as setWithPriority,
  Dr as startAfter,
  xr as startAt,
  _r as update,
};
