var Ln = Object.defineProperty;
var $n = (t, e, r) => e in t ? Ln(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var _t = (t, e, r) => $n(t, typeof e != "symbol" ? e + "" : e, r);
import zn from "axios";
import * as J from "react";
import H, { createContext as Un, useState as vs, useEffect as Wn, useContext as Bn } from "react";
import "react-dom";
const ot = class ot {
  constructor(e) {
    _t(this, "user", null);
    _t(this, "isLoggedIn", !1);
    _t(this, "listeners", []);
    _t(this, "apiEndpoint");
    this.apiEndpoint = e, console.log(`AuthManager initialized with endpoint: ${e}`);
  }
  static getInstance(e) {
    if (!ot.instance) {
      if (!e)
        throw new Error(
          "AuthManager nie został zainicjalizowany. Przekaż apiEndpoint przy pierwszym wywołaniu."
        );
      ot.instance = new ot(e), console.log("AuthManager instance created.");
    }
    return ot.instance;
  }
  async login(e, r) {
    console.log(`Attempting to log in with username: ${e}`);
    try {
      const s = await zn.post(`${this.apiEndpoint}/login`, {
        username: e,
        password: r
      });
      this.user = s.data.user, this.isLoggedIn = !0, this.notifyListeners(), console.log(`Login successful for user: ${e}`);
    } catch (s) {
      throw console.error(`Login failed for user: ${e}`, s), s;
    }
  }
  logout() {
    console.log(`Logging out user: ${this.user}`), this.user = null, this.isLoggedIn = !1, this.notifyListeners(), console.log("Logout successful.");
  }
  getUser() {
    return console.log(`Getting user: ${this.user}`), this.user;
  }
  isUserLoggedIn() {
    return console.log(`Is user logged in: ${this.isLoggedIn}`), this.isLoggedIn;
  }
  subscribe(e) {
    this.listeners.push(e), console.log("Listener subscribed.");
  }
  unsubscribe(e) {
    this.listeners = this.listeners.filter((r) => r !== e), console.log("Listener unsubscribed.");
  }
  notifyListeners() {
    console.log("Notifying listeners."), this.listeners.forEach((e) => e(this.isLoggedIn, this.user));
  }
};
_t(ot, "instance");
let Ke = ot;
var Wr = { exports: {} }, Nt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bs;
function Gn() {
  if (bs) return Nt;
  bs = 1;
  var t = H, e = Symbol.for("react.element"), r = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(o, d, f) {
    var h, y = {}, j = null, G = null;
    f !== void 0 && (j = "" + f), d.key !== void 0 && (j = "" + d.key), d.ref !== void 0 && (G = d.ref);
    for (h in d) s.call(d, h) && !a.hasOwnProperty(h) && (y[h] = d[h]);
    if (o && o.defaultProps) for (h in d = o.defaultProps, d) y[h] === void 0 && (y[h] = d[h]);
    return { $$typeof: e, type: o, key: j, ref: G, props: y, _owner: n.current };
  }
  return Nt.Fragment = r, Nt.jsx = i, Nt.jsxs = i, Nt;
}
var Vt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _s;
function qn() {
  return _s || (_s = 1, process.env.NODE_ENV !== "production" && function() {
    var t = H, e = Symbol.for("react.element"), r = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), o = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), G = Symbol.for("react.offscreen"), U = Symbol.iterator, X = "@@iterator";
    function M(l) {
      if (l === null || typeof l != "object")
        return null;
      var m = U && l[U] || l[X];
      return typeof m == "function" ? m : null;
    }
    var W = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(l) {
      {
        for (var m = arguments.length, k = new Array(m > 1 ? m - 1 : 0), N = 1; N < m; N++)
          k[N - 1] = arguments[N];
        pe("error", l, k);
      }
    }
    function pe(l, m, k) {
      {
        var N = W.ReactDebugCurrentFrame, q = N.getStackAddendum();
        q !== "" && (m += "%s", k = k.concat([q]));
        var K = k.map(function($) {
          return String($);
        });
        K.unshift("Warning: " + m), Function.prototype.apply.call(console[l], console, K);
      }
    }
    var ce = !1, Q = !1, Oe = !1, ze = !1, Te = !1, Ee;
    Ee = Symbol.for("react.module.reference");
    function fe(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === s || l === a || Te || l === n || l === f || l === h || ze || l === G || ce || Q || Oe || typeof l == "object" && l !== null && (l.$$typeof === j || l.$$typeof === y || l.$$typeof === i || l.$$typeof === o || l.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === Ee || l.getModuleId !== void 0));
    }
    function Fe(l, m, k) {
      var N = l.displayName;
      if (N)
        return N;
      var q = m.displayName || m.name || "";
      return q !== "" ? k + "(" + q + ")" : k;
    }
    function C(l) {
      return l.displayName || "Context";
    }
    function V(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case s:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case n:
          return "StrictMode";
        case f:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case o:
            var m = l;
            return C(m) + ".Consumer";
          case i:
            var k = l;
            return C(k._context) + ".Provider";
          case d:
            return Fe(l, l.render, "ForwardRef");
          case y:
            var N = l.displayName || null;
            return N !== null ? N : V(l.type) || "Memo";
          case j: {
            var q = l, K = q._payload, $ = q._init;
            try {
              return V($(K));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var B = Object.assign, ee = 0, ue, he, Se, _e, je, ge, Ot;
    function nr() {
    }
    nr.__reactDisabledLog = !0;
    function ar() {
      {
        if (ee === 0) {
          ue = console.log, he = console.info, Se = console.warn, _e = console.error, je = console.group, ge = console.groupCollapsed, Ot = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: nr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: l,
            log: l,
            warn: l,
            error: l,
            group: l,
            groupCollapsed: l,
            groupEnd: l
          });
        }
        ee++;
      }
    }
    function Or() {
      {
        if (ee--, ee === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: B({}, l, {
              value: ue
            }),
            info: B({}, l, {
              value: he
            }),
            warn: B({}, l, {
              value: Se
            }),
            error: B({}, l, {
              value: _e
            }),
            group: B({}, l, {
              value: je
            }),
            groupCollapsed: B({}, l, {
              value: ge
            }),
            groupEnd: B({}, l, {
              value: Ot
            })
          });
        }
        ee < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var nt = W.ReactCurrentDispatcher, ht;
    function Ye(l, m, k) {
      {
        if (ht === void 0)
          try {
            throw Error();
          } catch (q) {
            var N = q.stack.trim().match(/\n( *(at )?)/);
            ht = N && N[1] || "";
          }
        return `
` + ht + l;
      }
    }
    var pt = !1, mt;
    {
      var ir = typeof WeakMap == "function" ? WeakMap : Map;
      mt = new ir();
    }
    function or(l, m) {
      if (!l || pt)
        return "";
      {
        var k = mt.get(l);
        if (k !== void 0)
          return k;
      }
      var N;
      pt = !0;
      var q = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var K;
      K = nt.current, nt.current = null, ar();
      try {
        if (m) {
          var $ = function() {
            throw Error();
          };
          if (Object.defineProperty($.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct($, []);
            } catch (xe) {
              N = xe;
            }
            Reflect.construct(l, [], $);
          } else {
            try {
              $.call();
            } catch (xe) {
              N = xe;
            }
            l.call($.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (xe) {
            N = xe;
          }
          l();
        }
      } catch (xe) {
        if (xe && N && typeof xe.stack == "string") {
          for (var L = xe.stack.split(`
`), ye = N.stack.split(`
`), ie = L.length - 1, le = ye.length - 1; ie >= 1 && le >= 0 && L[ie] !== ye[le]; )
            le--;
          for (; ie >= 1 && le >= 0; ie--, le--)
            if (L[ie] !== ye[le]) {
              if (ie !== 1 || le !== 1)
                do
                  if (ie--, le--, le < 0 || L[ie] !== ye[le]) {
                    var Re = `
` + L[ie].replace(" at new ", " at ");
                    return l.displayName && Re.includes("<anonymous>") && (Re = Re.replace("<anonymous>", l.displayName)), typeof l == "function" && mt.set(l, Re), Re;
                  }
                while (ie >= 1 && le >= 0);
              break;
            }
        }
      } finally {
        pt = !1, nt.current = K, Or(), Error.prepareStackTrace = q;
      }
      var bt = l ? l.displayName || l.name : "", it = bt ? Ye(bt) : "";
      return typeof l == "function" && mt.set(l, it), it;
    }
    function lr(l, m, k) {
      return or(l, !1);
    }
    function cr(l) {
      var m = l.prototype;
      return !!(m && m.isReactComponent);
    }
    function jt(l, m, k) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return or(l, cr(l));
      if (typeof l == "string")
        return Ye(l);
      switch (l) {
        case f:
          return Ye("Suspense");
        case h:
          return Ye("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case d:
            return lr(l.render);
          case y:
            return jt(l.type, m, k);
          case j: {
            var N = l, q = N._payload, K = N._init;
            try {
              return jt(K(q), m, k);
            } catch {
            }
          }
        }
      return "";
    }
    var gt = Object.prototype.hasOwnProperty, jr = {}, c = W.ReactDebugCurrentFrame;
    function u(l) {
      if (l) {
        var m = l._owner, k = jt(l.type, l._source, m ? m.type : null);
        c.setExtraStackFrame(k);
      } else
        c.setExtraStackFrame(null);
    }
    function p(l, m, k, N, q) {
      {
        var K = Function.call.bind(gt);
        for (var $ in l)
          if (K(l, $)) {
            var L = void 0;
            try {
              if (typeof l[$] != "function") {
                var ye = Error((N || "React class") + ": " + k + " type `" + $ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[$] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ye.name = "Invariant Violation", ye;
              }
              L = l[$](m, $, N, k, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ie) {
              L = ie;
            }
            L && !(L instanceof Error) && (u(q), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", N || "React class", k, $, typeof L), u(null)), L instanceof Error && !(L.message in jr) && (jr[L.message] = !0, u(q), T("Failed %s type: %s", k, L.message), u(null));
          }
      }
    }
    var x = Array.isArray;
    function b(l) {
      return x(l);
    }
    function v(l) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, k = m && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return k;
      }
    }
    function R(l) {
      try {
        return P(l), !1;
      } catch {
        return !0;
      }
    }
    function P(l) {
      return "" + l;
    }
    function ae(l) {
      if (R(l))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", v(l)), P(l);
    }
    var re = W.ReactCurrentOwner, Ue = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ur, yt, at;
    at = {};
    function Nr(l) {
      if (gt.call(l, "ref")) {
        var m = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function dr(l) {
      if (gt.call(l, "key")) {
        var m = Object.getOwnPropertyDescriptor(l, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function Vr(l, m) {
      if (typeof l.ref == "string" && re.current && m && re.current.stateNode !== m) {
        var k = V(re.current.type);
        at[k] || (T('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', V(re.current.type), l.ref), at[k] = !0);
      }
    }
    function fr(l, m) {
      {
        var k = function() {
          ur || (ur = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        k.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: k,
          configurable: !0
        });
      }
    }
    function Sn(l, m) {
      {
        var k = function() {
          yt || (yt = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
        };
        k.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: k,
          configurable: !0
        });
      }
    }
    var Rn = function(l, m, k, N, q, K, $) {
      var L = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: l,
        key: m,
        ref: k,
        props: $,
        // Record the component responsible for creating this element.
        _owner: K
      };
      return L._store = {}, Object.defineProperty(L._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(L, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: N
      }), Object.defineProperty(L, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: q
      }), Object.freeze && (Object.freeze(L.props), Object.freeze(L)), L;
    };
    function An(l, m, k, N, q) {
      {
        var K, $ = {}, L = null, ye = null;
        k !== void 0 && (ae(k), L = "" + k), dr(m) && (ae(m.key), L = "" + m.key), Nr(m) && (ye = m.ref, Vr(m, q));
        for (K in m)
          gt.call(m, K) && !Ue.hasOwnProperty(K) && ($[K] = m[K]);
        if (l && l.defaultProps) {
          var ie = l.defaultProps;
          for (K in ie)
            $[K] === void 0 && ($[K] = ie[K]);
        }
        if (L || ye) {
          var le = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          L && fr($, le), ye && Sn($, le);
        }
        return Rn(l, L, ye, q, N, re.current, $);
      }
    }
    var Ir = W.ReactCurrentOwner, ds = W.ReactDebugCurrentFrame;
    function vt(l) {
      if (l) {
        var m = l._owner, k = jt(l.type, l._source, m ? m.type : null);
        ds.setExtraStackFrame(k);
      } else
        ds.setExtraStackFrame(null);
    }
    var Pr;
    Pr = !1;
    function Fr(l) {
      return typeof l == "object" && l !== null && l.$$typeof === e;
    }
    function fs() {
      {
        if (Ir.current) {
          var l = V(Ir.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function On(l) {
      return "";
    }
    var hs = {};
    function jn(l) {
      {
        var m = fs();
        if (!m) {
          var k = typeof l == "string" ? l : l.displayName || l.name;
          k && (m = `

Check the top-level render call using <` + k + ">.");
        }
        return m;
      }
    }
    function ps(l, m) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var k = jn(m);
        if (hs[k])
          return;
        hs[k] = !0;
        var N = "";
        l && l._owner && l._owner !== Ir.current && (N = " It was passed a child from " + V(l._owner.type) + "."), vt(l), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', k, N), vt(null);
      }
    }
    function ms(l, m) {
      {
        if (typeof l != "object")
          return;
        if (b(l))
          for (var k = 0; k < l.length; k++) {
            var N = l[k];
            Fr(N) && ps(N, m);
          }
        else if (Fr(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var q = M(l);
          if (typeof q == "function" && q !== l.entries)
            for (var K = q.call(l), $; !($ = K.next()).done; )
              Fr($.value) && ps($.value, m);
        }
      }
    }
    function Nn(l) {
      {
        var m = l.type;
        if (m == null || typeof m == "string")
          return;
        var k;
        if (typeof m == "function")
          k = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === y))
          k = m.propTypes;
        else
          return;
        if (k) {
          var N = V(m);
          p(k, l.props, "prop", N, l);
        } else if (m.PropTypes !== void 0 && !Pr) {
          Pr = !0;
          var q = V(m);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", q || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Vn(l) {
      {
        for (var m = Object.keys(l.props), k = 0; k < m.length; k++) {
          var N = m[k];
          if (N !== "children" && N !== "key") {
            vt(l), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", N), vt(null);
            break;
          }
        }
        l.ref !== null && (vt(l), T("Invalid attribute `ref` supplied to `React.Fragment`."), vt(null));
      }
    }
    var gs = {};
    function ys(l, m, k, N, q, K) {
      {
        var $ = fe(l);
        if (!$) {
          var L = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (L += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ye = On();
          ye ? L += ye : L += fs();
          var ie;
          l === null ? ie = "null" : b(l) ? ie = "array" : l !== void 0 && l.$$typeof === e ? (ie = "<" + (V(l.type) || "Unknown") + " />", L = " Did you accidentally export a JSX literal instead of a component?") : ie = typeof l, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ie, L);
        }
        var le = An(l, m, k, q, K);
        if (le == null)
          return le;
        if ($) {
          var Re = m.children;
          if (Re !== void 0)
            if (N)
              if (b(Re)) {
                for (var bt = 0; bt < Re.length; bt++)
                  ms(Re[bt], l);
                Object.freeze && Object.freeze(Re);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ms(Re, l);
        }
        if (gt.call(m, "key")) {
          var it = V(l), xe = Object.keys(m).filter(function(Mn) {
            return Mn !== "key";
          }), Dr = xe.length > 0 ? "{key: someKey, " + xe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!gs[it + Dr]) {
            var Zn = xe.length > 0 ? "{" + xe.join(": ..., ") + ": ...}" : "{}";
            T(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Dr, it, Zn, it), gs[it + Dr] = !0;
          }
        }
        return l === s ? Vn(le) : Nn(le), le;
      }
    }
    function In(l, m, k) {
      return ys(l, m, k, !0);
    }
    function Pn(l, m, k) {
      return ys(l, m, k, !1);
    }
    var Fn = Pn, Dn = In;
    Vt.Fragment = s, Vt.jsx = Fn, Vt.jsxs = Dn;
  }()), Vt;
}
process.env.NODE_ENV === "production" ? Wr.exports = Gn() : Wr.exports = qn();
var Z = Wr.exports;
const Zs = Un(null), vo = ({
  children: t,
  apiEndpoint: e,
  onLoginSuccess: r,
  onLoginError: s
}) => {
  const [n, a] = vs(null), [i, o] = vs(!1);
  Wn(() => {
    Ke.getInstance(e);
    const h = (y, j) => {
      o(y), a(j);
    };
    return Ke.getInstance().subscribe(h), () => {
      Ke.getInstance().unsubscribe(h);
    };
  }, [e]);
  const d = async (h, y) => {
    try {
      await Ke.getInstance().login(h, y), r && r(Ke.getInstance().getUser());
    } catch (j) {
      throw s && s(j), j;
    }
  }, f = () => {
    Ke.getInstance().logout();
  };
  return /* @__PURE__ */ Z.jsx(Zs.Provider, { value: { user: n, isLoggedIn: i, login: d, logout: f }, children: t });
}, Ms = () => {
  const t = Bn(Zs);
  if (!t)
    throw new Error("useAuth musi być użyty wewnątrz AuthProvider");
  return t;
};
var rr = (t) => t.type === "checkbox", lt = (t) => t instanceof Date, ve = (t) => t == null;
const Ls = (t) => typeof t == "object";
var oe = (t) => !ve(t) && !Array.isArray(t) && Ls(t) && !lt(t), $s = (t) => oe(t) && t.target ? rr(t.target) ? t.target.checked : t.target.value : t, Yn = (t) => t.substring(0, t.search(/\.\d+(\.|$)/)) || t, zs = (t, e) => t.has(Yn(e)), Hn = (t) => {
  const e = t.constructor && t.constructor.prototype;
  return oe(e) && e.hasOwnProperty("isPrototypeOf");
}, ss = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function we(t) {
  let e;
  const r = Array.isArray(t);
  if (t instanceof Date)
    e = new Date(t);
  else if (t instanceof Set)
    e = new Set(t);
  else if (!(ss && (t instanceof Blob || t instanceof FileList)) && (r || oe(t)))
    if (e = r ? [] : {}, !r && !Hn(t))
      e = t;
    else
      for (const s in t)
        t.hasOwnProperty(s) && (e[s] = we(t[s]));
  else
    return t;
  return e;
}
var Cr = (t) => Array.isArray(t) ? t.filter(Boolean) : [], ne = (t) => t === void 0, _ = (t, e, r) => {
  if (!e || !oe(t))
    return r;
  const s = Cr(e.split(/[,[\].]+?/)).reduce((n, a) => ve(n) ? n : n[a], t);
  return ne(s) || s === t ? ne(t[e]) ? r : t[e] : s;
}, Ae = (t) => typeof t == "boolean", ns = (t) => /^\w*$/.test(t), Us = (t) => Cr(t.replace(/["|']|\]/g, "").split(/\.|\[/)), Y = (t, e, r) => {
  let s = -1;
  const n = ns(e) ? [e] : Us(e), a = n.length, i = a - 1;
  for (; ++s < a; ) {
    const o = n[s];
    let d = r;
    if (s !== i) {
      const f = t[o];
      d = oe(f) || Array.isArray(f) ? f : isNaN(+n[s + 1]) ? {} : [];
    }
    if (o === "__proto__")
      return;
    t[o] = d, t = t[o];
  }
  return t;
};
const pr = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, Ne = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, We = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, Ws = H.createContext(null), Tr = () => H.useContext(Ws), Jn = (t) => {
  const { children: e, ...r } = t;
  return H.createElement(Ws.Provider, { value: r }, e);
};
var Bs = (t, e, r, s = !0) => {
  const n = {
    defaultValues: e._defaultValues
  };
  for (const a in t)
    Object.defineProperty(n, a, {
      get: () => {
        const i = a;
        return e._proxyFormState[i] !== Ne.all && (e._proxyFormState[i] = !s || Ne.all), r && (r[i] = !0), t[i];
      }
    });
  return n;
}, ke = (t) => oe(t) && !Object.keys(t).length, Gs = (t, e, r, s) => {
  r(t);
  const { name: n, ...a } = t;
  return ke(a) || Object.keys(a).length >= Object.keys(e).length || Object.keys(a).find((i) => e[i] === (!s || Ne.all));
}, Lt = (t) => Array.isArray(t) ? t : [t], qs = (t, e, r) => !t || !e || t === e || Lt(t).some((s) => s && (r ? s === e : s.startsWith(e) || e.startsWith(s)));
function as(t) {
  const e = H.useRef(t);
  e.current = t, H.useEffect(() => {
    const r = !t.disabled && e.current.subject && e.current.subject.subscribe({
      next: e.current.next
    });
    return () => {
      r && r.unsubscribe();
    };
  }, [t.disabled]);
}
function Kn(t) {
  const e = Tr(), { control: r = e.control, disabled: s, name: n, exact: a } = t || {}, [i, o] = H.useState(r._formState), d = H.useRef(!0), f = H.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }), h = H.useRef(n);
  return h.current = n, as({
    disabled: s,
    next: (y) => d.current && qs(h.current, y.name, a) && Gs(y, f.current, r._updateFormState) && o({
      ...r._formState,
      ...y
    }),
    subject: r._subjects.state
  }), H.useEffect(() => (d.current = !0, f.current.isValid && r._updateValid(!0), () => {
    d.current = !1;
  }), [r]), Bs(i, r, f.current, !1);
}
var Ze = (t) => typeof t == "string", Ys = (t, e, r, s, n) => Ze(t) ? (s && e.watch.add(t), _(r, t, n)) : Array.isArray(t) ? t.map((a) => (s && e.watch.add(a), _(r, a))) : (s && (e.watchAll = !0), r);
function Xn(t) {
  const e = Tr(), { control: r = e.control, name: s, defaultValue: n, disabled: a, exact: i } = t || {}, o = H.useRef(s);
  o.current = s, as({
    disabled: a,
    subject: r._subjects.values,
    next: (h) => {
      qs(o.current, h.name, i) && f(we(Ys(o.current, r._names, h.values || r._formValues, !1, n)));
    }
  });
  const [d, f] = H.useState(r._getWatch(s, n));
  return H.useEffect(() => r._removeUnmounted()), d;
}
function Qn(t) {
  const e = Tr(), { name: r, disabled: s, control: n = e.control, shouldUnregister: a } = t, i = zs(n._names.array, r), o = Xn({
    control: n,
    name: r,
    defaultValue: _(n._formValues, r, _(n._defaultValues, r, t.defaultValue)),
    exact: !0
  }), d = Kn({
    control: n,
    name: r,
    exact: !0
  }), f = H.useRef(n.register(r, {
    ...t.rules,
    value: o,
    ...Ae(t.disabled) ? { disabled: t.disabled } : {}
  }));
  return H.useEffect(() => {
    const h = n._options.shouldUnregister || a, y = (j, G) => {
      const U = _(n._fields, j);
      U && U._f && (U._f.mount = G);
    };
    if (y(r, !0), h) {
      const j = we(_(n._options.defaultValues, r));
      Y(n._defaultValues, r, j), ne(_(n._formValues, r)) && Y(n._formValues, r, j);
    }
    return () => {
      (i ? h && !n._state.action : h) ? n.unregister(r) : y(r, !1);
    };
  }, [r, n, i, a]), H.useEffect(() => {
    _(n._fields, r) && n._updateDisabledField({
      disabled: s,
      fields: n._fields,
      name: r,
      value: _(n._fields, r)._f.value
    });
  }, [s, r, n]), {
    field: {
      name: r,
      value: o,
      ...Ae(s) || d.disabled ? { disabled: d.disabled || s } : {},
      onChange: H.useCallback((h) => f.current.onChange({
        target: {
          value: $s(h),
          name: r
        },
        type: pr.CHANGE
      }), [r]),
      onBlur: H.useCallback(() => f.current.onBlur({
        target: {
          value: _(n._formValues, r),
          name: r
        },
        type: pr.BLUR
      }), [r, n]),
      ref: H.useCallback((h) => {
        const y = _(n._fields, r);
        y && h && (y._f.ref = {
          focus: () => h.focus(),
          select: () => h.select(),
          setCustomValidity: (j) => h.setCustomValidity(j),
          reportValidity: () => h.reportValidity()
        });
      }, [n._fields, r])
    },
    formState: d,
    fieldState: Object.defineProperties({}, {
      invalid: {
        enumerable: !0,
        get: () => !!_(d.errors, r)
      },
      isDirty: {
        enumerable: !0,
        get: () => !!_(d.dirtyFields, r)
      },
      isTouched: {
        enumerable: !0,
        get: () => !!_(d.touchedFields, r)
      },
      isValidating: {
        enumerable: !0,
        get: () => !!_(d.validatingFields, r)
      },
      error: {
        enumerable: !0,
        get: () => _(d.errors, r)
      }
    })
  };
}
const ea = (t) => t.render(Qn(t));
var Hs = (t, e, r, s, n) => e ? {
  ...r[t],
  types: {
    ...r[t] && r[t].types ? r[t].types : {},
    [s]: n || !0
  }
} : {}, xs = (t) => ({
  isOnSubmit: !t || t === Ne.onSubmit,
  isOnBlur: t === Ne.onBlur,
  isOnChange: t === Ne.onChange,
  isOnAll: t === Ne.all,
  isOnTouch: t === Ne.onTouched
}), ws = (t, e, r) => !r && (e.watchAll || e.watch.has(t) || [...e.watch].some((s) => t.startsWith(s) && /^\.\w+/.test(t.slice(s.length))));
const $t = (t, e, r, s) => {
  for (const n of r || Object.keys(t)) {
    const a = _(t, n);
    if (a) {
      const { _f: i, ...o } = a;
      if (i) {
        if (i.refs && i.refs[0] && e(i.refs[0], n) && !s)
          return !0;
        if (i.ref && e(i.ref, i.name) && !s)
          return !0;
        if ($t(o, e))
          break;
      } else if (oe(o) && $t(o, e))
        break;
    }
  }
};
var ta = (t, e, r) => {
  const s = Lt(_(t, r));
  return Y(s, "root", e[r]), Y(t, r, s), t;
}, is = (t) => t.type === "file", De = (t) => typeof t == "function", mr = (t) => {
  if (!ss)
    return !1;
  const e = t ? t.ownerDocument : 0;
  return t instanceof (e && e.defaultView ? e.defaultView.HTMLElement : HTMLElement);
}, hr = (t) => Ze(t), os = (t) => t.type === "radio", gr = (t) => t instanceof RegExp;
const ks = {
  value: !1,
  isValid: !1
}, Es = { value: !0, isValid: !0 };
var Js = (t) => {
  if (Array.isArray(t)) {
    if (t.length > 1) {
      const e = t.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
      return { value: e, isValid: !!e.length };
    }
    return t[0].checked && !t[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      t[0].attributes && !ne(t[0].attributes.value) ? ne(t[0].value) || t[0].value === "" ? Es : { value: t[0].value, isValid: !0 } : Es
    ) : ks;
  }
  return ks;
};
const Cs = {
  isValid: !1,
  value: null
};
var Ks = (t) => Array.isArray(t) ? t.reduce((e, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : e, Cs) : Cs;
function Ts(t, e, r = "validate") {
  if (hr(t) || Array.isArray(t) && t.every(hr) || Ae(t) && !t)
    return {
      type: r,
      message: hr(t) ? t : "",
      ref: e
    };
}
var xt = (t) => oe(t) && !gr(t) ? t : {
  value: t,
  message: ""
}, Ss = async (t, e, r, s, n) => {
  const { ref: a, refs: i, required: o, maxLength: d, minLength: f, min: h, max: y, pattern: j, validate: G, name: U, valueAsNumber: X, mount: M, disabled: W } = t._f, T = _(e, U);
  if (!M || W)
    return {};
  const pe = i ? i[0] : a, ce = (C) => {
    s && pe.reportValidity && (pe.setCustomValidity(Ae(C) ? "" : C || ""), pe.reportValidity());
  }, Q = {}, Oe = os(a), ze = rr(a), Te = Oe || ze, Ee = (X || is(a)) && ne(a.value) && ne(T) || mr(a) && a.value === "" || T === "" || Array.isArray(T) && !T.length, fe = Hs.bind(null, U, r, Q), Fe = (C, V, B, ee = We.maxLength, ue = We.minLength) => {
    const he = C ? V : B;
    Q[U] = {
      type: C ? ee : ue,
      message: he,
      ref: a,
      ...fe(C ? ee : ue, he)
    };
  };
  if (n ? !Array.isArray(T) || !T.length : o && (!Te && (Ee || ve(T)) || Ae(T) && !T || ze && !Js(i).isValid || Oe && !Ks(i).isValid)) {
    const { value: C, message: V } = hr(o) ? { value: !!o, message: o } : xt(o);
    if (C && (Q[U] = {
      type: We.required,
      message: V,
      ref: pe,
      ...fe(We.required, V)
    }, !r))
      return ce(V), Q;
  }
  if (!Ee && (!ve(h) || !ve(y))) {
    let C, V;
    const B = xt(y), ee = xt(h);
    if (!ve(T) && !isNaN(T)) {
      const ue = a.valueAsNumber || T && +T;
      ve(B.value) || (C = ue > B.value), ve(ee.value) || (V = ue < ee.value);
    } else {
      const ue = a.valueAsDate || new Date(T), he = (je) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + je), Se = a.type == "time", _e = a.type == "week";
      Ze(B.value) && T && (C = Se ? he(T) > he(B.value) : _e ? T > B.value : ue > new Date(B.value)), Ze(ee.value) && T && (V = Se ? he(T) < he(ee.value) : _e ? T < ee.value : ue < new Date(ee.value));
    }
    if ((C || V) && (Fe(!!C, B.message, ee.message, We.max, We.min), !r))
      return ce(Q[U].message), Q;
  }
  if ((d || f) && !Ee && (Ze(T) || n && Array.isArray(T))) {
    const C = xt(d), V = xt(f), B = !ve(C.value) && T.length > +C.value, ee = !ve(V.value) && T.length < +V.value;
    if ((B || ee) && (Fe(B, C.message, V.message), !r))
      return ce(Q[U].message), Q;
  }
  if (j && !Ee && Ze(T)) {
    const { value: C, message: V } = xt(j);
    if (gr(C) && !T.match(C) && (Q[U] = {
      type: We.pattern,
      message: V,
      ref: a,
      ...fe(We.pattern, V)
    }, !r))
      return ce(V), Q;
  }
  if (G) {
    if (De(G)) {
      const C = await G(T, e), V = Ts(C, pe);
      if (V && (Q[U] = {
        ...V,
        ...fe(We.validate, V.message)
      }, !r))
        return ce(V.message), Q;
    } else if (oe(G)) {
      let C = {};
      for (const V in G) {
        if (!ke(C) && !r)
          break;
        const B = Ts(await G[V](T, e), pe, V);
        B && (C = {
          ...B,
          ...fe(V, B.message)
        }, ce(B.message), r && (Q[U] = C));
      }
      if (!ke(C) && (Q[U] = {
        ref: pe,
        ...C
      }, !r))
        return Q;
    }
  }
  return ce(!0), Q;
};
function ra(t, e) {
  const r = e.slice(0, -1).length;
  let s = 0;
  for (; s < r; )
    t = ne(t) ? s++ : t[e[s++]];
  return t;
}
function sa(t) {
  for (const e in t)
    if (t.hasOwnProperty(e) && !ne(t[e]))
      return !1;
  return !0;
}
function de(t, e) {
  const r = Array.isArray(e) ? e : ns(e) ? [e] : Us(e), s = r.length === 1 ? t : ra(t, r), n = r.length - 1, a = r[n];
  return s && delete s[a], n !== 0 && (oe(s) && ke(s) || Array.isArray(s) && sa(s)) && de(t, r.slice(0, -1)), t;
}
var Zr = () => {
  let t = [];
  return {
    get observers() {
      return t;
    },
    next: (n) => {
      for (const a of t)
        a.next && a.next(n);
    },
    subscribe: (n) => (t.push(n), {
      unsubscribe: () => {
        t = t.filter((a) => a !== n);
      }
    }),
    unsubscribe: () => {
      t = [];
    }
  };
}, Br = (t) => ve(t) || !Ls(t);
function Xe(t, e) {
  if (Br(t) || Br(e))
    return t === e;
  if (lt(t) && lt(e))
    return t.getTime() === e.getTime();
  const r = Object.keys(t), s = Object.keys(e);
  if (r.length !== s.length)
    return !1;
  for (const n of r) {
    const a = t[n];
    if (!s.includes(n))
      return !1;
    if (n !== "ref") {
      const i = e[n];
      if (lt(a) && lt(i) || oe(a) && oe(i) || Array.isArray(a) && Array.isArray(i) ? !Xe(a, i) : a !== i)
        return !1;
    }
  }
  return !0;
}
var Xs = (t) => t.type === "select-multiple", na = (t) => os(t) || rr(t), Mr = (t) => mr(t) && t.isConnected, Qs = (t) => {
  for (const e in t)
    if (De(t[e]))
      return !0;
  return !1;
};
function yr(t, e = {}) {
  const r = Array.isArray(t);
  if (oe(t) || r)
    for (const s in t)
      Array.isArray(t[s]) || oe(t[s]) && !Qs(t[s]) ? (e[s] = Array.isArray(t[s]) ? [] : {}, yr(t[s], e[s])) : ve(t[s]) || (e[s] = !0);
  return e;
}
function en(t, e, r) {
  const s = Array.isArray(t);
  if (oe(t) || s)
    for (const n in t)
      Array.isArray(t[n]) || oe(t[n]) && !Qs(t[n]) ? ne(e) || Br(r[n]) ? r[n] = Array.isArray(t[n]) ? yr(t[n], []) : { ...yr(t[n]) } : en(t[n], ve(e) ? {} : e[n], r[n]) : r[n] = !Xe(t[n], e[n]);
  return r;
}
var It = (t, e) => en(t, e, yr(e)), tn = (t, { valueAsNumber: e, valueAsDate: r, setValueAs: s }) => ne(t) ? t : e ? t === "" ? NaN : t && +t : r && Ze(t) ? new Date(t) : s ? s(t) : t;
function Lr(t) {
  const e = t.ref;
  if (!(t.refs ? t.refs.every((r) => r.disabled) : e.disabled))
    return is(e) ? e.files : os(e) ? Ks(t.refs).value : Xs(e) ? [...e.selectedOptions].map(({ value: r }) => r) : rr(e) ? Js(t.refs).value : tn(ne(e.value) ? t.ref.value : e.value, t);
}
var aa = (t, e, r, s) => {
  const n = {};
  for (const a of t) {
    const i = _(e, a);
    i && Y(n, a, i._f);
  }
  return {
    criteriaMode: r,
    names: [...t],
    fields: n,
    shouldUseNativeValidation: s
  };
}, Pt = (t) => ne(t) ? t : gr(t) ? t.source : oe(t) ? gr(t.value) ? t.value.source : t.value : t;
const Rs = "AsyncFunction";
var ia = (t) => (!t || !t.validate) && !!(De(t.validate) && t.validate.constructor.name === Rs || oe(t.validate) && Object.values(t.validate).find((e) => e.constructor.name === Rs)), oa = (t) => t.mount && (t.required || t.min || t.max || t.maxLength || t.minLength || t.pattern || t.validate);
function As(t, e, r) {
  const s = _(t, r);
  if (s || ns(r))
    return {
      error: s,
      name: r
    };
  const n = r.split(".");
  for (; n.length; ) {
    const a = n.join("."), i = _(e, a), o = _(t, a);
    if (i && !Array.isArray(i) && r !== a)
      return { name: r };
    if (o && o.type)
      return {
        name: a,
        error: o
      };
    n.pop();
  }
  return {
    name: r
  };
}
var la = (t, e, r, s, n) => n.isOnAll ? !1 : !r && n.isOnTouch ? !(e || t) : (r ? s.isOnBlur : n.isOnBlur) ? !t : (r ? s.isOnChange : n.isOnChange) ? t : !0, ca = (t, e) => !Cr(_(t, e)).length && de(t, e);
const ua = {
  mode: Ne.onSubmit,
  reValidateMode: Ne.onChange,
  shouldFocusError: !0
};
function da(t = {}) {
  let e = {
    ...ua,
    ...t
  }, r = {
    submitCount: 0,
    isDirty: !1,
    isLoading: De(e.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1
  }, s = {}, n = oe(e.defaultValues) || oe(e.values) ? we(e.defaultValues || e.values) || {} : {}, a = e.shouldUnregister ? {} : we(n), i = {
    action: !1,
    mount: !1,
    watch: !1
  }, o = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, d, f = 0;
  const h = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, y = {
    values: Zr(),
    array: Zr(),
    state: Zr()
  }, j = xs(e.mode), G = xs(e.reValidateMode), U = e.criteriaMode === Ne.all, X = (c) => (u) => {
    clearTimeout(f), f = setTimeout(c, u);
  }, M = async (c) => {
    if (!e.disabled && (h.isValid || c)) {
      const u = e.resolver ? ke((await Te()).errors) : await fe(s, !0);
      u !== r.isValid && y.state.next({
        isValid: u
      });
    }
  }, W = (c, u) => {
    !e.disabled && (h.isValidating || h.validatingFields) && ((c || Array.from(o.mount)).forEach((p) => {
      p && (u ? Y(r.validatingFields, p, u) : de(r.validatingFields, p));
    }), y.state.next({
      validatingFields: r.validatingFields,
      isValidating: !ke(r.validatingFields)
    }));
  }, T = (c, u = [], p, x, b = !0, v = !0) => {
    if (x && p && !e.disabled) {
      if (i.action = !0, v && Array.isArray(_(s, c))) {
        const R = p(_(s, c), x.argA, x.argB);
        b && Y(s, c, R);
      }
      if (v && Array.isArray(_(r.errors, c))) {
        const R = p(_(r.errors, c), x.argA, x.argB);
        b && Y(r.errors, c, R), ca(r.errors, c);
      }
      if (h.touchedFields && v && Array.isArray(_(r.touchedFields, c))) {
        const R = p(_(r.touchedFields, c), x.argA, x.argB);
        b && Y(r.touchedFields, c, R);
      }
      h.dirtyFields && (r.dirtyFields = It(n, a)), y.state.next({
        name: c,
        isDirty: C(c, u),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      Y(a, c, u);
  }, pe = (c, u) => {
    Y(r.errors, c, u), y.state.next({
      errors: r.errors
    });
  }, ce = (c) => {
    r.errors = c, y.state.next({
      errors: r.errors,
      isValid: !1
    });
  }, Q = (c, u, p, x) => {
    const b = _(s, c);
    if (b) {
      const v = _(a, c, ne(p) ? _(n, c) : p);
      ne(v) || x && x.defaultChecked || u ? Y(a, c, u ? v : Lr(b._f)) : ee(c, v), i.mount && M();
    }
  }, Oe = (c, u, p, x, b) => {
    let v = !1, R = !1;
    const P = {
      name: c
    };
    if (!e.disabled) {
      const ae = !!(_(s, c) && _(s, c)._f && _(s, c)._f.disabled);
      if (!p || x) {
        h.isDirty && (R = r.isDirty, r.isDirty = P.isDirty = C(), v = R !== P.isDirty);
        const re = ae || Xe(_(n, c), u);
        R = !!(!ae && _(r.dirtyFields, c)), re || ae ? de(r.dirtyFields, c) : Y(r.dirtyFields, c, !0), P.dirtyFields = r.dirtyFields, v = v || h.dirtyFields && R !== !re;
      }
      if (p) {
        const re = _(r.touchedFields, c);
        re || (Y(r.touchedFields, c, p), P.touchedFields = r.touchedFields, v = v || h.touchedFields && re !== p);
      }
      v && b && y.state.next(P);
    }
    return v ? P : {};
  }, ze = (c, u, p, x) => {
    const b = _(r.errors, c), v = h.isValid && Ae(u) && r.isValid !== u;
    if (t.delayError && p ? (d = X(() => pe(c, p)), d(t.delayError)) : (clearTimeout(f), d = null, p ? Y(r.errors, c, p) : de(r.errors, c)), (p ? !Xe(b, p) : b) || !ke(x) || v) {
      const R = {
        ...x,
        ...v && Ae(u) ? { isValid: u } : {},
        errors: r.errors,
        name: c
      };
      r = {
        ...r,
        ...R
      }, y.state.next(R);
    }
  }, Te = async (c) => {
    W(c, !0);
    const u = await e.resolver(a, e.context, aa(c || o.mount, s, e.criteriaMode, e.shouldUseNativeValidation));
    return W(c), u;
  }, Ee = async (c) => {
    const { errors: u } = await Te(c);
    if (c)
      for (const p of c) {
        const x = _(u, p);
        x ? Y(r.errors, p, x) : de(r.errors, p);
      }
    else
      r.errors = u;
    return u;
  }, fe = async (c, u, p = {
    valid: !0
  }) => {
    for (const x in c) {
      const b = c[x];
      if (b) {
        const { _f: v, ...R } = b;
        if (v) {
          const P = o.array.has(v.name), ae = b._f && ia(b._f);
          ae && h.validatingFields && W([x], !0);
          const re = await Ss(b, a, U, e.shouldUseNativeValidation && !u, P);
          if (ae && h.validatingFields && W([x]), re[v.name] && (p.valid = !1, u))
            break;
          !u && (_(re, v.name) ? P ? ta(r.errors, re, v.name) : Y(r.errors, v.name, re[v.name]) : de(r.errors, v.name));
        }
        !ke(R) && await fe(R, u, p);
      }
    }
    return p.valid;
  }, Fe = () => {
    for (const c of o.unMount) {
      const u = _(s, c);
      u && (u._f.refs ? u._f.refs.every((p) => !Mr(p)) : !Mr(u._f.ref)) && nt(c);
    }
    o.unMount = /* @__PURE__ */ new Set();
  }, C = (c, u) => !e.disabled && (c && u && Y(a, c, u), !Xe(ge(), n)), V = (c, u, p) => Ys(c, o, {
    ...i.mount ? a : ne(u) ? n : Ze(c) ? { [c]: u } : u
  }, p, u), B = (c) => Cr(_(i.mount ? a : n, c, t.shouldUnregister ? _(n, c, []) : [])), ee = (c, u, p = {}) => {
    const x = _(s, c);
    let b = u;
    if (x) {
      const v = x._f;
      v && (!v.disabled && Y(a, c, tn(u, v)), b = mr(v.ref) && ve(u) ? "" : u, Xs(v.ref) ? [...v.ref.options].forEach((R) => R.selected = b.includes(R.value)) : v.refs ? rr(v.ref) ? v.refs.length > 1 ? v.refs.forEach((R) => (!R.defaultChecked || !R.disabled) && (R.checked = Array.isArray(b) ? !!b.find((P) => P === R.value) : b === R.value)) : v.refs[0] && (v.refs[0].checked = !!b) : v.refs.forEach((R) => R.checked = R.value === b) : is(v.ref) ? v.ref.value = "" : (v.ref.value = b, v.ref.type || y.values.next({
        name: c,
        values: { ...a }
      })));
    }
    (p.shouldDirty || p.shouldTouch) && Oe(c, b, p.shouldTouch, p.shouldDirty, !0), p.shouldValidate && je(c);
  }, ue = (c, u, p) => {
    for (const x in u) {
      const b = u[x], v = `${c}.${x}`, R = _(s, v);
      (o.array.has(c) || oe(b) || R && !R._f) && !lt(b) ? ue(v, b, p) : ee(v, b, p);
    }
  }, he = (c, u, p = {}) => {
    const x = _(s, c), b = o.array.has(c), v = we(u);
    Y(a, c, v), b ? (y.array.next({
      name: c,
      values: { ...a }
    }), (h.isDirty || h.dirtyFields) && p.shouldDirty && y.state.next({
      name: c,
      dirtyFields: It(n, a),
      isDirty: C(c, v)
    })) : x && !x._f && !ve(v) ? ue(c, v, p) : ee(c, v, p), ws(c, o) && y.state.next({ ...r }), y.values.next({
      name: i.mount ? c : void 0,
      values: { ...a }
    });
  }, Se = async (c) => {
    i.mount = !0;
    const u = c.target;
    let p = u.name, x = !0;
    const b = _(s, p), v = () => u.type ? Lr(b._f) : $s(c), R = (P) => {
      x = Number.isNaN(P) || lt(P) && isNaN(P.getTime()) || Xe(P, _(a, p, P));
    };
    if (b) {
      let P, ae;
      const re = v(), Ue = c.type === pr.BLUR || c.type === pr.FOCUS_OUT, ur = !oa(b._f) && !e.resolver && !_(r.errors, p) && !b._f.deps || la(Ue, _(r.touchedFields, p), r.isSubmitted, G, j), yt = ws(p, o, Ue);
      Y(a, p, re), Ue ? (b._f.onBlur && b._f.onBlur(c), d && d(0)) : b._f.onChange && b._f.onChange(c);
      const at = Oe(p, re, Ue, !1), Nr = !ke(at) || yt;
      if (!Ue && y.values.next({
        name: p,
        type: c.type,
        values: { ...a }
      }), ur)
        return h.isValid && (t.mode === "onBlur" ? Ue && M() : M()), Nr && y.state.next({ name: p, ...yt ? {} : at });
      if (!Ue && yt && y.state.next({ ...r }), e.resolver) {
        const { errors: dr } = await Te([p]);
        if (R(re), x) {
          const Vr = As(r.errors, s, p), fr = As(dr, s, Vr.name || p);
          P = fr.error, p = fr.name, ae = ke(dr);
        }
      } else
        W([p], !0), P = (await Ss(b, a, U, e.shouldUseNativeValidation))[p], W([p]), R(re), x && (P ? ae = !1 : h.isValid && (ae = await fe(s, !0)));
      x && (b._f.deps && je(b._f.deps), ze(p, ae, P, at));
    }
  }, _e = (c, u) => {
    if (_(r.errors, u) && c.focus)
      return c.focus(), 1;
  }, je = async (c, u = {}) => {
    let p, x;
    const b = Lt(c);
    if (e.resolver) {
      const v = await Ee(ne(c) ? c : b);
      p = ke(v), x = c ? !b.some((R) => _(v, R)) : p;
    } else c ? (x = (await Promise.all(b.map(async (v) => {
      const R = _(s, v);
      return await fe(R && R._f ? { [v]: R } : R);
    }))).every(Boolean), !(!x && !r.isValid) && M()) : x = p = await fe(s);
    return y.state.next({
      ...!Ze(c) || h.isValid && p !== r.isValid ? {} : { name: c },
      ...e.resolver || !c ? { isValid: p } : {},
      errors: r.errors
    }), u.shouldFocus && !x && $t(s, _e, c ? b : o.mount), x;
  }, ge = (c) => {
    const u = {
      ...i.mount ? a : n
    };
    return ne(c) ? u : Ze(c) ? _(u, c) : c.map((p) => _(u, p));
  }, Ot = (c, u) => ({
    invalid: !!_((u || r).errors, c),
    isDirty: !!_((u || r).dirtyFields, c),
    error: _((u || r).errors, c),
    isValidating: !!_(r.validatingFields, c),
    isTouched: !!_((u || r).touchedFields, c)
  }), nr = (c) => {
    c && Lt(c).forEach((u) => de(r.errors, u)), y.state.next({
      errors: c ? r.errors : {}
    });
  }, ar = (c, u, p) => {
    const x = (_(s, c, { _f: {} })._f || {}).ref, b = _(r.errors, c) || {}, { ref: v, message: R, type: P, ...ae } = b;
    Y(r.errors, c, {
      ...ae,
      ...u,
      ref: x
    }), y.state.next({
      name: c,
      errors: r.errors,
      isValid: !1
    }), p && p.shouldFocus && x && x.focus && x.focus();
  }, Or = (c, u) => De(c) ? y.values.subscribe({
    next: (p) => c(V(void 0, u), p)
  }) : V(c, u, !0), nt = (c, u = {}) => {
    for (const p of c ? Lt(c) : o.mount)
      o.mount.delete(p), o.array.delete(p), u.keepValue || (de(s, p), de(a, p)), !u.keepError && de(r.errors, p), !u.keepDirty && de(r.dirtyFields, p), !u.keepTouched && de(r.touchedFields, p), !u.keepIsValidating && de(r.validatingFields, p), !e.shouldUnregister && !u.keepDefaultValue && de(n, p);
    y.values.next({
      values: { ...a }
    }), y.state.next({
      ...r,
      ...u.keepDirty ? { isDirty: C() } : {}
    }), !u.keepIsValid && M();
  }, ht = ({ disabled: c, name: u, field: p, fields: x, value: b }) => {
    if (Ae(c) && i.mount || c) {
      const v = c ? void 0 : ne(b) ? Lr(p ? p._f : _(x, u)._f) : b;
      Y(a, u, v), Oe(u, v, !1, !1, !0);
    }
  }, Ye = (c, u = {}) => {
    let p = _(s, c);
    const x = Ae(u.disabled) || Ae(e.disabled);
    return Y(s, c, {
      ...p || {},
      _f: {
        ...p && p._f ? p._f : { ref: { name: c } },
        name: c,
        mount: !0,
        ...u
      }
    }), o.mount.add(c), p ? ht({
      field: p,
      disabled: Ae(u.disabled) ? u.disabled : e.disabled,
      name: c,
      value: u.value
    }) : Q(c, !0, u.value), {
      ...x ? { disabled: u.disabled || e.disabled } : {},
      ...e.progressive ? {
        required: !!u.required,
        min: Pt(u.min),
        max: Pt(u.max),
        minLength: Pt(u.minLength),
        maxLength: Pt(u.maxLength),
        pattern: Pt(u.pattern)
      } : {},
      name: c,
      onChange: Se,
      onBlur: Se,
      ref: (b) => {
        if (b) {
          Ye(c, u), p = _(s, c);
          const v = ne(b.value) && b.querySelectorAll && b.querySelectorAll("input,select,textarea")[0] || b, R = na(v), P = p._f.refs || [];
          if (R ? P.find((ae) => ae === v) : v === p._f.ref)
            return;
          Y(s, c, {
            _f: {
              ...p._f,
              ...R ? {
                refs: [
                  ...P.filter(Mr),
                  v,
                  ...Array.isArray(_(n, c)) ? [{}] : []
                ],
                ref: { type: v.type, name: c }
              } : { ref: v }
            }
          }), Q(c, !1, void 0, v);
        } else
          p = _(s, c, {}), p._f && (p._f.mount = !1), (e.shouldUnregister || u.shouldUnregister) && !(zs(o.array, c) && i.action) && o.unMount.add(c);
      }
    };
  }, pt = () => e.shouldFocusError && $t(s, _e, o.mount), mt = (c) => {
    Ae(c) && (y.state.next({ disabled: c }), $t(s, (u, p) => {
      const x = _(s, p);
      x && (u.disabled = x._f.disabled || c, Array.isArray(x._f.refs) && x._f.refs.forEach((b) => {
        b.disabled = x._f.disabled || c;
      }));
    }, 0, !1));
  }, ir = (c, u) => async (p) => {
    let x;
    if (p && (p.preventDefault && p.preventDefault(), p.persist && p.persist()), e.disabled) {
      u && await u({ ...r.errors }, p);
      return;
    }
    let b = we(a);
    if (y.state.next({
      isSubmitting: !0
    }), e.resolver) {
      const { errors: v, values: R } = await Te();
      r.errors = v, b = R;
    } else
      await fe(s);
    if (de(r.errors, "root"), ke(r.errors)) {
      y.state.next({
        errors: {}
      });
      try {
        await c(b, p);
      } catch (v) {
        x = v;
      }
    } else
      u && await u({ ...r.errors }, p), pt(), setTimeout(pt);
    if (y.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: ke(r.errors) && !x,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), x)
      throw x;
  }, or = (c, u = {}) => {
    _(s, c) && (ne(u.defaultValue) ? he(c, we(_(n, c))) : (he(c, u.defaultValue), Y(n, c, we(u.defaultValue))), u.keepTouched || de(r.touchedFields, c), u.keepDirty || (de(r.dirtyFields, c), r.isDirty = u.defaultValue ? C(c, we(_(n, c))) : C()), u.keepError || (de(r.errors, c), h.isValid && M()), y.state.next({ ...r }));
  }, lr = (c, u = {}) => {
    const p = c ? we(c) : n, x = we(p), b = ke(c), v = b ? n : x;
    if (u.keepDefaultValues || (n = p), !u.keepValues) {
      if (u.keepDirtyValues) {
        const R = /* @__PURE__ */ new Set([
          ...o.mount,
          ...Object.keys(It(n, a))
        ]);
        for (const P of Array.from(R))
          _(r.dirtyFields, P) ? Y(v, P, _(a, P)) : he(P, _(v, P));
      } else {
        if (ss && ne(c))
          for (const R of o.mount) {
            const P = _(s, R);
            if (P && P._f) {
              const ae = Array.isArray(P._f.refs) ? P._f.refs[0] : P._f.ref;
              if (mr(ae)) {
                const re = ae.closest("form");
                if (re) {
                  re.reset();
                  break;
                }
              }
            }
          }
        s = {};
      }
      a = t.shouldUnregister ? u.keepDefaultValues ? we(n) : {} : we(v), y.array.next({
        values: { ...v }
      }), y.values.next({
        values: { ...v }
      });
    }
    o = {
      mount: u.keepDirtyValues ? o.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, i.mount = !h.isValid || !!u.keepIsValid || !!u.keepDirtyValues, i.watch = !!t.shouldUnregister, y.state.next({
      submitCount: u.keepSubmitCount ? r.submitCount : 0,
      isDirty: b ? !1 : u.keepDirty ? r.isDirty : !!(u.keepDefaultValues && !Xe(c, n)),
      isSubmitted: u.keepIsSubmitted ? r.isSubmitted : !1,
      dirtyFields: b ? {} : u.keepDirtyValues ? u.keepDefaultValues && a ? It(n, a) : r.dirtyFields : u.keepDefaultValues && c ? It(n, c) : u.keepDirty ? r.dirtyFields : {},
      touchedFields: u.keepTouched ? r.touchedFields : {},
      errors: u.keepErrors ? r.errors : {},
      isSubmitSuccessful: u.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, cr = (c, u) => lr(De(c) ? c(a) : c, u);
  return {
    control: {
      register: Ye,
      unregister: nt,
      getFieldState: Ot,
      handleSubmit: ir,
      setError: ar,
      _executeSchema: Te,
      _getWatch: V,
      _getDirty: C,
      _updateValid: M,
      _removeUnmounted: Fe,
      _updateFieldArray: T,
      _updateDisabledField: ht,
      _getFieldArray: B,
      _reset: lr,
      _resetDefaultValues: () => De(e.defaultValues) && e.defaultValues().then((c) => {
        cr(c, e.resetOptions), y.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (c) => {
        r = {
          ...r,
          ...c
        };
      },
      _disableForm: mt,
      _subjects: y,
      _proxyFormState: h,
      _setErrors: ce,
      get _fields() {
        return s;
      },
      get _formValues() {
        return a;
      },
      get _state() {
        return i;
      },
      set _state(c) {
        i = c;
      },
      get _defaultValues() {
        return n;
      },
      get _names() {
        return o;
      },
      set _names(c) {
        o = c;
      },
      get _formState() {
        return r;
      },
      set _formState(c) {
        r = c;
      },
      get _options() {
        return e;
      },
      set _options(c) {
        e = {
          ...e,
          ...c
        };
      }
    },
    trigger: je,
    register: Ye,
    handleSubmit: ir,
    watch: Or,
    setValue: he,
    getValues: ge,
    reset: cr,
    resetField: or,
    clearErrors: nr,
    unregister: nt,
    setError: ar,
    setFocus: (c, u = {}) => {
      const p = _(s, c), x = p && p._f;
      if (x) {
        const b = x.refs ? x.refs[0] : x.ref;
        b.focus && (b.focus(), u.shouldSelect && De(b.select) && b.select());
      }
    },
    getFieldState: Ot
  };
}
function fa(t = {}) {
  const e = H.useRef(), r = H.useRef(), [s, n] = H.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: De(t.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: t.errors || {},
    disabled: t.disabled || !1,
    defaultValues: De(t.defaultValues) ? void 0 : t.defaultValues
  });
  e.current || (e.current = {
    ...da(t),
    formState: s
  });
  const a = e.current.control;
  return a._options = t, as({
    subject: a._subjects.state,
    next: (i) => {
      Gs(i, a._proxyFormState, a._updateFormState, !0) && n({ ...a._formState });
    }
  }), H.useEffect(() => a._disableForm(t.disabled), [a, t.disabled]), H.useEffect(() => {
    if (a._proxyFormState.isDirty) {
      const i = a._getDirty();
      i !== s.isDirty && a._subjects.state.next({
        isDirty: i
      });
    }
  }, [a, s.isDirty]), H.useEffect(() => {
    t.values && !Xe(t.values, r.current) ? (a._reset(t.values, a._options.resetOptions), r.current = t.values, n((i) => ({ ...i }))) : a._resetDefaultValues();
  }, [t.values, a]), H.useEffect(() => {
    t.errors && a._setErrors(t.errors);
  }, [t.errors, a]), H.useEffect(() => {
    a._state.mount || (a._updateValid(), a._state.mount = !0), a._state.watch && (a._state.watch = !1, a._subjects.state.next({ ...a._formState })), a._removeUnmounted();
  }), H.useEffect(() => {
    t.shouldUnregister && a._subjects.values.next({
      values: a._getWatch()
    });
  }, [t.shouldUnregister, a]), e.current.formState = Bs(s, a), e.current;
}
const Os = (t, e, r) => {
  if (t && "reportValidity" in t) {
    const s = _(r, e);
    t.setCustomValidity(s && s.message || ""), t.reportValidity();
  }
}, rn = (t, e) => {
  for (const r in e.fields) {
    const s = e.fields[r];
    s && s.ref && "reportValidity" in s.ref ? Os(s.ref, r, t) : s.refs && s.refs.forEach((n) => Os(n, r, t));
  }
}, ha = (t, e) => {
  e.shouldUseNativeValidation && rn(t, e);
  const r = {};
  for (const s in t) {
    const n = _(e.fields, s), a = Object.assign(t[s] || {}, { ref: n && n.ref });
    if (pa(e.names || Object.keys(t), s)) {
      const i = Object.assign({}, _(r, s));
      Y(i, "root", a), Y(r, s, i);
    } else Y(r, s, a);
  }
  return r;
}, pa = (t, e) => t.some((r) => r.startsWith(e + "."));
var ma = function(t, e) {
  for (var r = {}; t.length; ) {
    var s = t[0], n = s.code, a = s.message, i = s.path.join(".");
    if (!r[i]) if ("unionErrors" in s) {
      var o = s.unionErrors[0].errors[0];
      r[i] = { message: o.message, type: o.code };
    } else r[i] = { message: a, type: n };
    if ("unionErrors" in s && s.unionErrors.forEach(function(h) {
      return h.errors.forEach(function(y) {
        return t.push(y);
      });
    }), e) {
      var d = r[i].types, f = d && d[s.code];
      r[i] = Hs(i, e, r, n, f ? [].concat(f, s.message) : s.message);
    }
    t.shift();
  }
  return r;
}, ga = function(t, e, r) {
  return r === void 0 && (r = {}), function(s, n, a) {
    try {
      return Promise.resolve(function(i, o) {
        try {
          var d = Promise.resolve(t[r.mode === "sync" ? "parse" : "parseAsync"](s, e)).then(function(f) {
            return a.shouldUseNativeValidation && rn({}, a), { errors: {}, values: r.raw ? s : f };
          });
        } catch (f) {
          return o(f);
        }
        return d && d.then ? d.then(void 0, o) : d;
      }(0, function(i) {
        if (function(o) {
          return Array.isArray(o == null ? void 0 : o.errors);
        }(i)) return { values: {}, errors: ha(ma(i.errors, !a.shouldUseNativeValidation && a.criteriaMode === "all"), a) };
        throw i;
      }));
    } catch (i) {
      return Promise.reject(i);
    }
  };
}, z;
(function(t) {
  t.assertEqual = (n) => n;
  function e(n) {
  }
  t.assertIs = e;
  function r(n) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (n) => {
    const a = {};
    for (const i of n)
      a[i] = i;
    return a;
  }, t.getValidEnumValues = (n) => {
    const a = t.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of a)
      i[o] = n[o];
    return t.objectValues(i);
  }, t.objectValues = (n) => t.objectKeys(n).map(function(a) {
    return n[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const a = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
    return a;
  }, t.find = (n, a) => {
    for (const i of n)
      if (a(i))
        return i;
  }, t.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  t.joinValues = s, t.jsonStringifyReplacer = (n, a) => typeof a == "bigint" ? a.toString() : a;
})(z || (z = {}));
var Gr;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(Gr || (Gr = {}));
const E = z.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Qe = (t) => {
  switch (typeof t) {
    case "undefined":
      return E.undefined;
    case "string":
      return E.string;
    case "number":
      return isNaN(t) ? E.nan : E.number;
    case "boolean":
      return E.boolean;
    case "function":
      return E.function;
    case "bigint":
      return E.bigint;
    case "symbol":
      return E.symbol;
    case "object":
      return Array.isArray(t) ? E.array : t === null ? E.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? E.promise : typeof Map < "u" && t instanceof Map ? E.map : typeof Set < "u" && t instanceof Set ? E.set : typeof Date < "u" && t instanceof Date ? E.date : E.object;
    default:
      return E.unknown;
  }
}, g = z.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), ya = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ce extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r = e || function(a) {
      return a.message;
    }, s = { _errors: [] }, n = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(r(i));
        else {
          let o = s, d = 0;
          for (; d < i.path.length; ) {
            const f = i.path[d];
            d === i.path.length - 1 ? (o[f] = o[f] || { _errors: [] }, o[f]._errors.push(r(i))) : o[f] = o[f] || { _errors: [] }, o = o[f], d++;
          }
        }
    };
    return n(this), s;
  }
  static assert(e) {
    if (!(e instanceof Ce))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, z.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ce.create = (t) => new Ce(t);
const Tt = (t, e) => {
  let r;
  switch (t.code) {
    case g.invalid_type:
      t.received === E.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case g.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, z.jsonStringifyReplacer)}`;
      break;
    case g.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${z.joinValues(t.keys, ", ")}`;
      break;
    case g.invalid_union:
      r = "Invalid input";
      break;
    case g.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${z.joinValues(t.options)}`;
      break;
    case g.invalid_enum_value:
      r = `Invalid enum value. Expected ${z.joinValues(t.options)}, received '${t.received}'`;
      break;
    case g.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case g.invalid_return_type:
      r = "Invalid function return type";
      break;
    case g.invalid_date:
      r = "Invalid date";
      break;
    case g.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : z.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case g.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case g.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case g.custom:
      r = "Invalid input";
      break;
    case g.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case g.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case g.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, z.assertNever(t);
  }
  return { message: r };
};
let sn = Tt;
function va(t) {
  sn = t;
}
function vr() {
  return sn;
}
const br = (t) => {
  const { data: e, path: r, errorMaps: s, issueData: n } = t, a = [...r, ...n.path || []], i = {
    ...n,
    path: a
  };
  if (n.message !== void 0)
    return {
      ...n,
      path: a,
      message: n.message
    };
  let o = "";
  const d = s.filter((f) => !!f).slice().reverse();
  for (const f of d)
    o = f(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: a,
    message: o
  };
}, ba = [];
function w(t, e) {
  const r = vr(), s = br({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      r,
      r === Tt ? void 0 : Tt
      // then global default map
    ].filter((n) => !!n)
  });
  t.common.issues.push(s);
}
class me {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const s = [];
    for (const n of r) {
      if (n.status === "aborted")
        return O;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, r) {
    const s = [];
    for (const n of r) {
      const a = await n.key, i = await n.value;
      s.push({
        key: a,
        value: i
      });
    }
    return me.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, r) {
    const s = {};
    for (const n of r) {
      const { key: a, value: i } = n;
      if (a.status === "aborted" || i.status === "aborted")
        return O;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) && (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const O = Object.freeze({
  status: "aborted"
}), kt = (t) => ({ status: "dirty", value: t }), be = (t) => ({ status: "valid", value: t }), qr = (t) => t.status === "aborted", Yr = (t) => t.status === "dirty", zt = (t) => t.status === "valid", Ut = (t) => typeof Promise < "u" && t instanceof Promise;
function _r(t, e, r, s) {
  if (typeof e == "function" ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(t);
}
function nn(t, e, r, s, n) {
  if (typeof e == "function" ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, r), r;
}
var S;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(S || (S = {}));
var Zt, Mt;
class Le {
  constructor(e, r, s, n) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = s, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const js = (t, e) => {
  if (zt(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Ce(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function I(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: s, description: n } = t;
  if (e && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => {
    var d, f;
    const { message: h } = t;
    return i.code === "invalid_enum_value" ? { message: h ?? o.defaultError } : typeof o.data > "u" ? { message: (d = h ?? s) !== null && d !== void 0 ? d : o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: (f = h ?? r) !== null && f !== void 0 ? f : o.defaultError };
  }, description: n };
}
class D {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Qe(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: Qe(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new me(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Qe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (Ut(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const s = this.safeParse(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, r) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = r == null ? void 0 : r.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Qe(e)
    }, a = this._parseSync({ data: e, path: n.path, parent: n });
    return js(n, a);
  }
  async parseAsync(e, r) {
    const s = await this.safeParseAsync(e, r);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, r) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Qe(e)
    }, n = this._parse({ data: e, path: s.path, parent: s }), a = await (Ut(n) ? n : Promise.resolve(n));
    return js(s, a);
  }
  refine(e, r) {
    const s = (n) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(n) : r;
    return this._refinement((n, a) => {
      const i = e(n), o = () => a.addIssue({
        code: g.custom,
        ...s(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((d) => d ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof r == "function" ? r(s, n) : r), !1));
  }
  _refinement(e) {
    return new Pe({
      schema: this,
      typeName: A.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return Me.create(this, this._def);
  }
  nullable() {
    return st.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ie.create(this, this._def);
  }
  promise() {
    return Rt.create(this, this._def);
  }
  or(e) {
    return qt.create([this, e], this._def);
  }
  and(e) {
    return Yt.create(this, e, this._def);
  }
  transform(e) {
    return new Pe({
      ...I(this._def),
      schema: this,
      typeName: A.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new Qt({
      ...I(this._def),
      innerType: this,
      defaultValue: r,
      typeName: A.ZodDefault
    });
  }
  brand() {
    return new ls({
      typeName: A.ZodBranded,
      type: this,
      ...I(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new er({
      ...I(this._def),
      innerType: this,
      catchValue: r,
      typeName: A.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return sr.create(this, e);
  }
  readonly() {
    return tr.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const _a = /^c[^\s-]{8,}$/i, xa = /^[0-9a-z]+$/, wa = /^[0-9A-HJKMNP-TV-Z]{26}$/, ka = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Ea = /^[a-z0-9_-]{21}$/i, Ca = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ta = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Sa = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let $r;
const Ra = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Aa = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Oa = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, an = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", ja = new RegExp(`^${an}$`);
function on(t) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Na(t) {
  return new RegExp(`^${on(t)}$`);
}
function ln(t) {
  let e = `${an}T${on(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function Va(t, e) {
  return !!((e === "v4" || !e) && Ra.test(t) || (e === "v6" || !e) && Aa.test(t));
}
class Ve extends D {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== E.string) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: g.invalid_type,
        expected: E.string,
        received: a.parsedType
      }), O;
    }
    const s = new me();
    let n;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (n = this._getOrReturnCtx(e, n), w(n, {
          code: g.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (n = this._getOrReturnCtx(e, n), w(n, {
          code: g.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (n = this._getOrReturnCtx(e, n), i ? w(n, {
          code: g.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && w(n, {
          code: g.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        Ta.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "email",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        $r || ($r = new RegExp(Sa, "u")), $r.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "emoji",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        ka.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "uuid",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "nanoid")
        Ea.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "nanoid",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        _a.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "cuid",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        xa.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "cuid2",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        wa.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
          validation: "ulid",
          code: g.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), w(n, {
            validation: "url",
            code: g.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        validation: "regex",
        code: g.invalid_string,
        message: a.message
      }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), s.dirty()) : a.kind === "datetime" ? ln(a).test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: "datetime",
        message: a.message
      }), s.dirty()) : a.kind === "date" ? ja.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: "date",
        message: a.message
      }), s.dirty()) : a.kind === "time" ? Na(a).test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.invalid_string,
        validation: "time",
        message: a.message
      }), s.dirty()) : a.kind === "duration" ? Ca.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        validation: "duration",
        code: g.invalid_string,
        message: a.message
      }), s.dirty()) : a.kind === "ip" ? Va(e.data, a.version) || (n = this._getOrReturnCtx(e, n), w(n, {
        validation: "ip",
        code: g.invalid_string,
        message: a.message
      }), s.dirty()) : a.kind === "base64" ? Oa.test(e.data) || (n = this._getOrReturnCtx(e, n), w(n, {
        validation: "base64",
        code: g.invalid_string,
        message: a.message
      }), s.dirty()) : z.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _regex(e, r, s) {
    return this.refinement((n) => e.test(n), {
      validation: r,
      code: g.invalid_string,
      ...S.errToObj(s)
    });
  }
  _addCheck(e) {
    return new Ve({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...S.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...S.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...S.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...S.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...S.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...S.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...S.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...S.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...S.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...S.errToObj(e) });
  }
  datetime(e) {
    var r, s;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : !1,
      local: (s = e == null ? void 0 : e.local) !== null && s !== void 0 ? s : !1,
      ...S.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...S.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...S.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...S.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...S.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...S.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...S.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...S.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...S.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...S.errToObj(r)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, S.errToObj(e));
  }
  trim() {
    return new Ve({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ve({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ve({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
Ve.create = (t) => {
  var e;
  return new Ve({
    checks: [],
    typeName: A.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...I(t)
  });
};
function Ia(t, e) {
  const r = (t.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = r > s ? r : s, a = parseInt(t.toFixed(n).replace(".", "")), i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
class et extends D {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== E.number) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: g.invalid_type,
        expected: E.number,
        received: a.parsedType
      }), O;
    }
    let s;
    const n = new me();
    for (const a of this._def.checks)
      a.kind === "int" ? z.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), n.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? Ia(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.not_finite,
        message: a.message
      }), n.dirty()) : z.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, S.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, S.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, S.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, S.toString(r));
  }
  setLimit(e, r, s, n) {
    return new et({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: S.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new et({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: S.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: S.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: S.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: S.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: S.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: S.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: S.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: S.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && z.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
et.create = (t) => new et({
  checks: [],
  typeName: A.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...I(t)
});
class tt extends D {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== E.bigint) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: g.invalid_type,
        expected: E.bigint,
        received: a.parsedType
      }), O;
    }
    let s;
    const n = new me();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), w(s, {
        code: g.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : z.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, S.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, S.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, S.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, S.toString(r));
  }
  setLimit(e, r, s, n) {
    return new tt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: s,
          message: S.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
tt.create = (t) => {
  var e;
  return new tt({
    checks: [],
    typeName: A.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...I(t)
  });
};
class Wt extends D {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== E.boolean) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.boolean,
        received: s.parsedType
      }), O;
    }
    return be(e.data);
  }
}
Wt.create = (t) => new Wt({
  typeName: A.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...I(t)
});
class ut extends D {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== E.date) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: g.invalid_type,
        expected: E.date,
        received: a.parsedType
      }), O;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return w(a, {
        code: g.invalid_date
      }), O;
    }
    const s = new me();
    let n;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (n = this._getOrReturnCtx(e, n), w(n, {
        code: g.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : z.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ut({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: S.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: S.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
ut.create = (t) => new ut({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: A.ZodDate,
  ...I(t)
});
class xr extends D {
  _parse(e) {
    if (this._getType(e) !== E.symbol) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.symbol,
        received: s.parsedType
      }), O;
    }
    return be(e.data);
  }
}
xr.create = (t) => new xr({
  typeName: A.ZodSymbol,
  ...I(t)
});
class Bt extends D {
  _parse(e) {
    if (this._getType(e) !== E.undefined) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.undefined,
        received: s.parsedType
      }), O;
    }
    return be(e.data);
  }
}
Bt.create = (t) => new Bt({
  typeName: A.ZodUndefined,
  ...I(t)
});
class Gt extends D {
  _parse(e) {
    if (this._getType(e) !== E.null) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.null,
        received: s.parsedType
      }), O;
    }
    return be(e.data);
  }
}
Gt.create = (t) => new Gt({
  typeName: A.ZodNull,
  ...I(t)
});
class St extends D {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return be(e.data);
  }
}
St.create = (t) => new St({
  typeName: A.ZodAny,
  ...I(t)
});
class ct extends D {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return be(e.data);
  }
}
ct.create = (t) => new ct({
  typeName: A.ZodUnknown,
  ...I(t)
});
class qe extends D {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return w(r, {
      code: g.invalid_type,
      expected: E.never,
      received: r.parsedType
    }), O;
  }
}
qe.create = (t) => new qe({
  typeName: A.ZodNever,
  ...I(t)
});
class wr extends D {
  _parse(e) {
    if (this._getType(e) !== E.undefined) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.void,
        received: s.parsedType
      }), O;
    }
    return be(e.data);
  }
}
wr.create = (t) => new wr({
  typeName: A.ZodVoid,
  ...I(t)
});
class Ie extends D {
  _parse(e) {
    const { ctx: r, status: s } = this._processInputParams(e), n = this._def;
    if (r.parsedType !== E.array)
      return w(r, {
        code: g.invalid_type,
        expected: E.array,
        received: r.parsedType
      }), O;
    if (n.exactLength !== null) {
      const i = r.data.length > n.exactLength.value, o = r.data.length < n.exactLength.value;
      (i || o) && (w(r, {
        code: i ? g.too_big : g.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), s.dirty());
    }
    if (n.minLength !== null && r.data.length < n.minLength.value && (w(r, {
      code: g.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (w(r, {
      code: g.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), s.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, o) => n.type._parseAsync(new Le(r, i, r.path, o)))).then((i) => me.mergeArray(s, i));
    const a = [...r.data].map((i, o) => n.type._parseSync(new Le(r, i, r.path, o)));
    return me.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new Ie({
      ...this._def,
      minLength: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new Ie({
      ...this._def,
      maxLength: { value: e, message: S.toString(r) }
    });
  }
  length(e, r) {
    return new Ie({
      ...this._def,
      exactLength: { value: e, message: S.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ie.create = (t, e) => new Ie({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: A.ZodArray,
  ...I(e)
});
function wt(t) {
  if (t instanceof se) {
    const e = {};
    for (const r in t.shape) {
      const s = t.shape[r];
      e[r] = Me.create(wt(s));
    }
    return new se({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Ie ? new Ie({
    ...t._def,
    type: wt(t.element)
  }) : t instanceof Me ? Me.create(wt(t.unwrap())) : t instanceof st ? st.create(wt(t.unwrap())) : t instanceof $e ? $e.create(t.items.map((e) => wt(e))) : t;
}
class se extends D {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = z.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== E.object) {
      const f = this._getOrReturnCtx(e);
      return w(f, {
        code: g.invalid_type,
        expected: E.object,
        received: f.parsedType
      }), O;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof qe && this._def.unknownKeys === "strip"))
      for (const f in n.data)
        i.includes(f) || o.push(f);
    const d = [];
    for (const f of i) {
      const h = a[f], y = n.data[f];
      d.push({
        key: { status: "valid", value: f },
        value: h._parse(new Le(n, y, n.path, f)),
        alwaysSet: f in n.data
      });
    }
    if (this._def.catchall instanceof qe) {
      const f = this._def.unknownKeys;
      if (f === "passthrough")
        for (const h of o)
          d.push({
            key: { status: "valid", value: h },
            value: { status: "valid", value: n.data[h] }
          });
      else if (f === "strict")
        o.length > 0 && (w(n, {
          code: g.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (f !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const f = this._def.catchall;
      for (const h of o) {
        const y = n.data[h];
        d.push({
          key: { status: "valid", value: h },
          value: f._parse(
            new Le(n, y, n.path, h)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: h in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const f = [];
      for (const h of d) {
        const y = await h.key, j = await h.value;
        f.push({
          key: y,
          value: j,
          alwaysSet: h.alwaysSet
        });
      }
      return f;
    }).then((f) => me.mergeObjectSync(s, f)) : me.mergeObjectSync(s, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return S.errToObj, new se({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, s) => {
          var n, a, i, o;
          const d = (i = (a = (n = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(n, r, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (o = S.errToObj(e).message) !== null && o !== void 0 ? o : d
          } : {
            message: d
          };
        }
      } : {}
    });
  }
  strip() {
    return new se({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new se({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new se({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new se({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: A.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new se({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return z.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (r[s] = this.shape[s]);
    }), new se({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return z.objectKeys(this.shape).forEach((s) => {
      e[s] || (r[s] = this.shape[s]);
    }), new se({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return wt(this);
  }
  partial(e) {
    const r = {};
    return z.objectKeys(this.shape).forEach((s) => {
      const n = this.shape[s];
      e && !e[s] ? r[s] = n : r[s] = n.optional();
    }), new se({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return z.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        r[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof Me; )
          a = a._def.innerType;
        r[s] = a;
      }
    }), new se({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return cn(z.objectKeys(this.shape));
  }
}
se.create = (t, e) => new se({
  shape: () => t,
  unknownKeys: "strip",
  catchall: qe.create(),
  typeName: A.ZodObject,
  ...I(e)
});
se.strictCreate = (t, e) => new se({
  shape: () => t,
  unknownKeys: "strict",
  catchall: qe.create(),
  typeName: A.ZodObject,
  ...I(e)
});
se.lazycreate = (t, e) => new se({
  shape: t,
  unknownKeys: "strip",
  catchall: qe.create(),
  typeName: A.ZodObject,
  ...I(e)
});
class qt extends D {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return r.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new Ce(o.ctx.common.issues));
      return w(r, {
        code: g.invalid_union,
        unionErrors: i
      }), O;
    }
    if (r.common.async)
      return Promise.all(s.map(async (a) => {
        const i = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: r.data,
            path: r.path,
            parent: i
          }),
          ctx: i
        };
      })).then(n);
    {
      let a;
      const i = [];
      for (const d of s) {
        const f = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, h = d._parseSync({
          data: r.data,
          path: r.path,
          parent: f
        });
        if (h.status === "valid")
          return h;
        h.status === "dirty" && !a && (a = { result: h, ctx: f }), f.common.issues.length && i.push(f.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((d) => new Ce(d));
      return w(r, {
        code: g.invalid_union,
        unionErrors: o
      }), O;
    }
  }
  get options() {
    return this._def.options;
  }
}
qt.create = (t, e) => new qt({
  options: t,
  typeName: A.ZodUnion,
  ...I(e)
});
const Ge = (t) => t instanceof Jt ? Ge(t.schema) : t instanceof Pe ? Ge(t.innerType()) : t instanceof Kt ? [t.value] : t instanceof rt ? t.options : t instanceof Xt ? z.objectValues(t.enum) : t instanceof Qt ? Ge(t._def.innerType) : t instanceof Bt ? [void 0] : t instanceof Gt ? [null] : t instanceof Me ? [void 0, ...Ge(t.unwrap())] : t instanceof st ? [null, ...Ge(t.unwrap())] : t instanceof ls || t instanceof tr ? Ge(t.unwrap()) : t instanceof er ? Ge(t._def.innerType) : [];
class Sr extends D {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== E.object)
      return w(r, {
        code: g.invalid_type,
        expected: E.object,
        received: r.parsedType
      }), O;
    const s = this.discriminator, n = r.data[s], a = this.optionsMap.get(n);
    return a ? r.common.async ? a._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : a._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (w(r, {
      code: g.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), O);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, r, s) {
    const n = /* @__PURE__ */ new Map();
    for (const a of r) {
      const i = Ge(a.shape[e]);
      if (!i.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (n.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        n.set(o, a);
      }
    }
    return new Sr({
      typeName: A.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: n,
      ...I(s)
    });
  }
}
function Hr(t, e) {
  const r = Qe(t), s = Qe(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === E.object && s === E.object) {
    const n = z.objectKeys(e), a = z.objectKeys(t).filter((o) => n.indexOf(o) !== -1), i = { ...t, ...e };
    for (const o of a) {
      const d = Hr(t[o], e[o]);
      if (!d.valid)
        return { valid: !1 };
      i[o] = d.data;
    }
    return { valid: !0, data: i };
  } else if (r === E.array && s === E.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = e[a], d = Hr(i, o);
      if (!d.valid)
        return { valid: !1 };
      n.push(d.data);
    }
    return { valid: !0, data: n };
  } else return r === E.date && s === E.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Yt extends D {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = (a, i) => {
      if (qr(a) || qr(i))
        return O;
      const o = Hr(a.value, i.value);
      return o.valid ? ((Yr(a) || Yr(i)) && r.dirty(), { status: r.value, value: o.data }) : (w(s, {
        code: g.invalid_intersection_types
      }), O);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([a, i]) => n(a, i)) : n(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
Yt.create = (t, e, r) => new Yt({
  left: t,
  right: e,
  typeName: A.ZodIntersection,
  ...I(r)
});
class $e extends D {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== E.array)
      return w(s, {
        code: g.invalid_type,
        expected: E.array,
        received: s.parsedType
      }), O;
    if (s.data.length < this._def.items.length)
      return w(s, {
        code: g.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), O;
    !this._def.rest && s.data.length > this._def.items.length && (w(s, {
      code: g.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...s.data].map((i, o) => {
      const d = this._def.items[o] || this._def.rest;
      return d ? d._parse(new Le(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => me.mergeArray(r, i)) : me.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new $e({
      ...this._def,
      rest: e
    });
  }
}
$e.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new $e({
    items: t,
    typeName: A.ZodTuple,
    rest: null,
    ...I(e)
  });
};
class Ht extends D {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== E.object)
      return w(s, {
        code: g.invalid_type,
        expected: E.object,
        received: s.parsedType
      }), O;
    const n = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in s.data)
      n.push({
        key: a._parse(new Le(s, o, s.path, o)),
        value: i._parse(new Le(s, s.data[o], s.path, o)),
        alwaysSet: o in s.data
      });
    return s.common.async ? me.mergeObjectAsync(r, n) : me.mergeObjectSync(r, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, s) {
    return r instanceof D ? new Ht({
      keyType: e,
      valueType: r,
      typeName: A.ZodRecord,
      ...I(s)
    }) : new Ht({
      keyType: Ve.create(),
      valueType: e,
      typeName: A.ZodRecord,
      ...I(r)
    });
  }
}
class kr extends D {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== E.map)
      return w(s, {
        code: g.invalid_type,
        expected: E.map,
        received: s.parsedType
      }), O;
    const n = this._def.keyType, a = this._def.valueType, i = [...s.data.entries()].map(([o, d], f) => ({
      key: n._parse(new Le(s, o, s.path, [f, "key"])),
      value: a._parse(new Le(s, d, s.path, [f, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of i) {
          const f = await d.key, h = await d.value;
          if (f.status === "aborted" || h.status === "aborted")
            return O;
          (f.status === "dirty" || h.status === "dirty") && r.dirty(), o.set(f.value, h.value);
        }
        return { status: r.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const d of i) {
        const f = d.key, h = d.value;
        if (f.status === "aborted" || h.status === "aborted")
          return O;
        (f.status === "dirty" || h.status === "dirty") && r.dirty(), o.set(f.value, h.value);
      }
      return { status: r.value, value: o };
    }
  }
}
kr.create = (t, e, r) => new kr({
  valueType: e,
  keyType: t,
  typeName: A.ZodMap,
  ...I(r)
});
class dt extends D {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== E.set)
      return w(s, {
        code: g.invalid_type,
        expected: E.set,
        received: s.parsedType
      }), O;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (w(s, {
      code: g.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (w(s, {
      code: g.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function i(d) {
      const f = /* @__PURE__ */ new Set();
      for (const h of d) {
        if (h.status === "aborted")
          return O;
        h.status === "dirty" && r.dirty(), f.add(h.value);
      }
      return { status: r.value, value: f };
    }
    const o = [...s.data.values()].map((d, f) => a._parse(new Le(s, d, s.path, f)));
    return s.common.async ? Promise.all(o).then((d) => i(d)) : i(o);
  }
  min(e, r) {
    return new dt({
      ...this._def,
      minSize: { value: e, message: S.toString(r) }
    });
  }
  max(e, r) {
    return new dt({
      ...this._def,
      maxSize: { value: e, message: S.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
dt.create = (t, e) => new dt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: A.ZodSet,
  ...I(e)
});
class Et extends D {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== E.function)
      return w(r, {
        code: g.invalid_type,
        expected: E.function,
        received: r.parsedType
      }), O;
    function s(o, d) {
      return br({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          vr(),
          Tt
        ].filter((f) => !!f),
        issueData: {
          code: g.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function n(o, d) {
      return br({
        data: o,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          vr(),
          Tt
        ].filter((f) => !!f),
        issueData: {
          code: g.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const a = { errorMap: r.common.contextualErrorMap }, i = r.data;
    if (this._def.returns instanceof Rt) {
      const o = this;
      return be(async function(...d) {
        const f = new Ce([]), h = await o._def.args.parseAsync(d, a).catch((G) => {
          throw f.addIssue(s(d, G)), f;
        }), y = await Reflect.apply(i, this, h);
        return await o._def.returns._def.type.parseAsync(y, a).catch((G) => {
          throw f.addIssue(n(y, G)), f;
        });
      });
    } else {
      const o = this;
      return be(function(...d) {
        const f = o._def.args.safeParse(d, a);
        if (!f.success)
          throw new Ce([s(d, f.error)]);
        const h = Reflect.apply(i, this, f.data), y = o._def.returns.safeParse(h, a);
        if (!y.success)
          throw new Ce([n(h, y.error)]);
        return y.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Et({
      ...this._def,
      args: $e.create(e).rest(ct.create())
    });
  }
  returns(e) {
    return new Et({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, s) {
    return new Et({
      args: e || $e.create([]).rest(ct.create()),
      returns: r || ct.create(),
      typeName: A.ZodFunction,
      ...I(s)
    });
  }
}
class Jt extends D {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Jt.create = (t, e) => new Jt({
  getter: t,
  typeName: A.ZodLazy,
  ...I(e)
});
class Kt extends D {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return w(r, {
        received: r.data,
        code: g.invalid_literal,
        expected: this._def.value
      }), O;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Kt.create = (t, e) => new Kt({
  value: t,
  typeName: A.ZodLiteral,
  ...I(e)
});
function cn(t, e) {
  return new rt({
    values: t,
    typeName: A.ZodEnum,
    ...I(e)
  });
}
class rt extends D {
  constructor() {
    super(...arguments), Zt.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return w(r, {
        expected: z.joinValues(s),
        received: r.parsedType,
        code: g.invalid_type
      }), O;
    }
    if (_r(this, Zt) || nn(this, Zt, new Set(this._def.values)), !_r(this, Zt).has(e.data)) {
      const r = this._getOrReturnCtx(e), s = this._def.values;
      return w(r, {
        received: r.data,
        code: g.invalid_enum_value,
        options: s
      }), O;
    }
    return be(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return rt.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return rt.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...r
    });
  }
}
Zt = /* @__PURE__ */ new WeakMap();
rt.create = cn;
class Xt extends D {
  constructor() {
    super(...arguments), Mt.set(this, void 0);
  }
  _parse(e) {
    const r = z.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== E.string && s.parsedType !== E.number) {
      const n = z.objectValues(r);
      return w(s, {
        expected: z.joinValues(n),
        received: s.parsedType,
        code: g.invalid_type
      }), O;
    }
    if (_r(this, Mt) || nn(this, Mt, new Set(z.getValidEnumValues(this._def.values))), !_r(this, Mt).has(e.data)) {
      const n = z.objectValues(r);
      return w(s, {
        received: s.data,
        code: g.invalid_enum_value,
        options: n
      }), O;
    }
    return be(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Mt = /* @__PURE__ */ new WeakMap();
Xt.create = (t, e) => new Xt({
  values: t,
  typeName: A.ZodNativeEnum,
  ...I(e)
});
class Rt extends D {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== E.promise && r.common.async === !1)
      return w(r, {
        code: g.invalid_type,
        expected: E.promise,
        received: r.parsedType
      }), O;
    const s = r.parsedType === E.promise ? r.data : Promise.resolve(r.data);
    return be(s.then((n) => this._def.type.parseAsync(n, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
Rt.create = (t, e) => new Rt({
  type: t,
  typeName: A.ZodPromise,
  ...I(e)
});
class Pe extends D {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === A.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e), n = this._def.effect || null, a = {
      addIssue: (i) => {
        w(s, i), i.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
      const i = n.transform(s.data, a);
      if (s.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (r.value === "aborted")
            return O;
          const d = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s
          });
          return d.status === "aborted" ? O : d.status === "dirty" || r.value === "dirty" ? kt(d.value) : d;
        });
      {
        if (r.value === "aborted")
          return O;
        const o = this._def.schema._parseSync({
          data: i,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? O : o.status === "dirty" || r.value === "dirty" ? kt(o.value) : o;
      }
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const d = n.refinement(o, a);
        if (s.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? O : (o.status === "dirty" && r.dirty(), i(o.value), { status: r.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? O : (o.status === "dirty" && r.dirty(), i(o.value).then(() => ({ status: r.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!zt(i))
          return i;
        const o = n.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => zt(i) ? Promise.resolve(n.transform(i.value, a)).then((o) => ({ status: r.value, value: o })) : i);
    z.assertNever(n);
  }
}
Pe.create = (t, e, r) => new Pe({
  schema: t,
  typeName: A.ZodEffects,
  effect: e,
  ...I(r)
});
Pe.createWithPreprocess = (t, e, r) => new Pe({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: A.ZodEffects,
  ...I(r)
});
class Me extends D {
  _parse(e) {
    return this._getType(e) === E.undefined ? be(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Me.create = (t, e) => new Me({
  innerType: t,
  typeName: A.ZodOptional,
  ...I(e)
});
class st extends D {
  _parse(e) {
    return this._getType(e) === E.null ? be(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
st.create = (t, e) => new st({
  innerType: t,
  typeName: A.ZodNullable,
  ...I(e)
});
class Qt extends D {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let s = r.data;
    return r.parsedType === E.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Qt.create = (t, e) => new Qt({
  innerType: t,
  typeName: A.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...I(e)
});
class er extends D {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return Ut(n) ? n.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Ce(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new Ce(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
er.create = (t, e) => new er({
  innerType: t,
  typeName: A.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...I(e)
});
class Er extends D {
  _parse(e) {
    if (this._getType(e) !== E.nan) {
      const s = this._getOrReturnCtx(e);
      return w(s, {
        code: g.invalid_type,
        expected: E.nan,
        received: s.parsedType
      }), O;
    }
    return { status: "valid", value: e.data };
  }
}
Er.create = (t) => new Er({
  typeName: A.ZodNaN,
  ...I(t)
});
const Pa = Symbol("zod_brand");
class ls extends D {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), s = r.data;
    return this._def.type._parse({
      data: s,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class sr extends D {
  _parse(e) {
    const { status: r, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? O : a.status === "dirty" ? (r.dirty(), kt(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return n.status === "aborted" ? O : n.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, r) {
    return new sr({
      in: e,
      out: r,
      typeName: A.ZodPipeline
    });
  }
}
class tr extends D {
  _parse(e) {
    const r = this._def.innerType._parse(e), s = (n) => (zt(n) && (n.value = Object.freeze(n.value)), n);
    return Ut(r) ? r.then((n) => s(n)) : s(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
tr.create = (t, e) => new tr({
  innerType: t,
  typeName: A.ZodReadonly,
  ...I(e)
});
function un(t, e = {}, r) {
  return t ? St.create().superRefine((s, n) => {
    var a, i;
    if (!t(s)) {
      const o = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, d = (i = (a = o.fatal) !== null && a !== void 0 ? a : r) !== null && i !== void 0 ? i : !0, f = typeof o == "string" ? { message: o } : o;
      n.addIssue({ code: "custom", ...f, fatal: d });
    }
  }) : St.create();
}
const Fa = {
  object: se.lazycreate
};
var A;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(A || (A = {}));
const Da = (t, e = {
  message: `Input not instance of ${t.name}`
}) => un((r) => r instanceof t, e), dn = Ve.create, fn = et.create, Za = Er.create, Ma = tt.create, hn = Wt.create, La = ut.create, $a = xr.create, za = Bt.create, Ua = Gt.create, Wa = St.create, Ba = ct.create, Ga = qe.create, qa = wr.create, Ya = Ie.create, Ha = se.create, Ja = se.strictCreate, Ka = qt.create, Xa = Sr.create, Qa = Yt.create, ei = $e.create, ti = Ht.create, ri = kr.create, si = dt.create, ni = Et.create, ai = Jt.create, ii = Kt.create, oi = rt.create, li = Xt.create, ci = Rt.create, Ns = Pe.create, ui = Me.create, di = st.create, fi = Pe.createWithPreprocess, hi = sr.create, pi = () => dn().optional(), mi = () => fn().optional(), gi = () => hn().optional(), yi = {
  string: (t) => Ve.create({ ...t, coerce: !0 }),
  number: (t) => et.create({ ...t, coerce: !0 }),
  boolean: (t) => Wt.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => tt.create({ ...t, coerce: !0 }),
  date: (t) => ut.create({ ...t, coerce: !0 })
}, vi = O;
var zr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Tt,
  setErrorMap: va,
  getErrorMap: vr,
  makeIssue: br,
  EMPTY_PATH: ba,
  addIssueToContext: w,
  ParseStatus: me,
  INVALID: O,
  DIRTY: kt,
  OK: be,
  isAborted: qr,
  isDirty: Yr,
  isValid: zt,
  isAsync: Ut,
  get util() {
    return z;
  },
  get objectUtil() {
    return Gr;
  },
  ZodParsedType: E,
  getParsedType: Qe,
  ZodType: D,
  datetimeRegex: ln,
  ZodString: Ve,
  ZodNumber: et,
  ZodBigInt: tt,
  ZodBoolean: Wt,
  ZodDate: ut,
  ZodSymbol: xr,
  ZodUndefined: Bt,
  ZodNull: Gt,
  ZodAny: St,
  ZodUnknown: ct,
  ZodNever: qe,
  ZodVoid: wr,
  ZodArray: Ie,
  ZodObject: se,
  ZodUnion: qt,
  ZodDiscriminatedUnion: Sr,
  ZodIntersection: Yt,
  ZodTuple: $e,
  ZodRecord: Ht,
  ZodMap: kr,
  ZodSet: dt,
  ZodFunction: Et,
  ZodLazy: Jt,
  ZodLiteral: Kt,
  ZodEnum: rt,
  ZodNativeEnum: Xt,
  ZodPromise: Rt,
  ZodEffects: Pe,
  ZodTransformer: Pe,
  ZodOptional: Me,
  ZodNullable: st,
  ZodDefault: Qt,
  ZodCatch: er,
  ZodNaN: Er,
  BRAND: Pa,
  ZodBranded: ls,
  ZodPipeline: sr,
  ZodReadonly: tr,
  custom: un,
  Schema: D,
  ZodSchema: D,
  late: Fa,
  get ZodFirstPartyTypeKind() {
    return A;
  },
  coerce: yi,
  any: Wa,
  array: Ya,
  bigint: Ma,
  boolean: hn,
  date: La,
  discriminatedUnion: Xa,
  effect: Ns,
  enum: oi,
  function: ni,
  instanceof: Da,
  intersection: Qa,
  lazy: ai,
  literal: ii,
  map: ri,
  nan: Za,
  nativeEnum: li,
  never: Ga,
  null: Ua,
  nullable: di,
  number: fn,
  object: Ha,
  oboolean: gi,
  onumber: mi,
  optional: ui,
  ostring: pi,
  pipeline: hi,
  preprocess: fi,
  promise: ci,
  record: ti,
  set: si,
  strictObject: Ja,
  string: dn,
  symbol: $a,
  transformer: Ns,
  tuple: ei,
  undefined: za,
  union: Ka,
  unknown: Ba,
  void: qa,
  NEVER: vi,
  ZodIssueCode: g,
  quotelessJson: ya,
  ZodError: Ce
});
const bi = zr.object({
  username: zr.string().min(1, "Nazwa użytkownika jest wymagana"),
  password: zr.string().min(6, "Hasło musi mieć co najmniej 6 znaków")
});
function _i(t, e) {
  typeof t == "function" ? t(e) : t != null && (t.current = e);
}
function xi(...t) {
  return (e) => t.forEach((r) => _i(r, e));
}
var Rr = J.forwardRef((t, e) => {
  const { children: r, ...s } = t, n = J.Children.toArray(r), a = n.find(ki);
  if (a) {
    const i = a.props.children, o = n.map((d) => d === a ? J.Children.count(i) > 1 ? J.Children.only(null) : J.isValidElement(i) ? i.props.children : null : d);
    return /* @__PURE__ */ Z.jsx(Jr, { ...s, ref: e, children: J.isValidElement(i) ? J.cloneElement(i, void 0, o) : null });
  }
  return /* @__PURE__ */ Z.jsx(Jr, { ...s, ref: e, children: r });
});
Rr.displayName = "Slot";
var Jr = J.forwardRef((t, e) => {
  const { children: r, ...s } = t;
  if (J.isValidElement(r)) {
    const n = Ci(r);
    return J.cloneElement(r, {
      ...Ei(s, r.props),
      // @ts-ignore
      ref: e ? xi(e, n) : n
    });
  }
  return J.Children.count(r) > 1 ? J.Children.only(null) : null;
});
Jr.displayName = "SlotClone";
var wi = ({ children: t }) => /* @__PURE__ */ Z.jsx(Z.Fragment, { children: t });
function ki(t) {
  return J.isValidElement(t) && t.type === wi;
}
function Ei(t, e) {
  const r = { ...e };
  for (const s in e) {
    const n = t[s], a = e[s];
    /^on[A-Z]/.test(s) ? n && a ? r[s] = (...o) => {
      a(...o), n(...o);
    } : n && (r[s] = n) : s === "style" ? r[s] = { ...n, ...a } : s === "className" && (r[s] = [n, a].filter(Boolean).join(" "));
  }
  return { ...t, ...r };
}
function Ci(t) {
  var s, n;
  let e = (s = Object.getOwnPropertyDescriptor(t.props, "ref")) == null ? void 0 : s.get, r = e && "isReactWarning" in e && e.isReactWarning;
  return r ? t.ref : (e = (n = Object.getOwnPropertyDescriptor(t, "ref")) == null ? void 0 : n.get, r = e && "isReactWarning" in e && e.isReactWarning, r ? t.props.ref : t.props.ref || t.ref);
}
function pn(t) {
  var e, r, s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var n = t.length;
    for (e = 0; e < n; e++) t[e] && (r = pn(t[e])) && (s && (s += " "), s += r);
  } else for (r in t) t[r] && (s && (s += " "), s += r);
  return s;
}
function Ti() {
  for (var t, e, r = 0, s = "", n = arguments.length; r < n; r++) (t = arguments[r]) && (e = pn(t)) && (s && (s += " "), s += e);
  return s;
}
const cs = "-", Si = (t) => {
  const e = Ai(t), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: s
  } = t;
  return {
    getClassGroupId: (i) => {
      const o = i.split(cs);
      return o[0] === "" && o.length !== 1 && o.shift(), mn(o, e) || Ri(i);
    },
    getConflictingClassGroupIds: (i, o) => {
      const d = r[i] || [];
      return o && s[i] ? [...d, ...s[i]] : d;
    }
  };
}, mn = (t, e) => {
  var i;
  if (t.length === 0)
    return e.classGroupId;
  const r = t[0], s = e.nextPart.get(r), n = s ? mn(t.slice(1), s) : void 0;
  if (n)
    return n;
  if (e.validators.length === 0)
    return;
  const a = t.join(cs);
  return (i = e.validators.find(({
    validator: o
  }) => o(a))) == null ? void 0 : i.classGroupId;
}, Vs = /^\[(.+)\]$/, Ri = (t) => {
  if (Vs.test(t)) {
    const e = Vs.exec(t)[1], r = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Ai = (t) => {
  const {
    theme: e,
    prefix: r
  } = t, s = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ji(Object.entries(t.classGroups), r).forEach(([a, i]) => {
    Kr(i, s, a, e);
  }), s;
}, Kr = (t, e, r, s) => {
  t.forEach((n) => {
    if (typeof n == "string") {
      const a = n === "" ? e : Is(e, n);
      a.classGroupId = r;
      return;
    }
    if (typeof n == "function") {
      if (Oi(n)) {
        Kr(n(s), e, r, s);
        return;
      }
      e.validators.push({
        validator: n,
        classGroupId: r
      });
      return;
    }
    Object.entries(n).forEach(([a, i]) => {
      Kr(i, Is(e, a), r, s);
    });
  });
}, Is = (t, e) => {
  let r = t;
  return e.split(cs).forEach((s) => {
    r.nextPart.has(s) || r.nextPart.set(s, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(s);
  }), r;
}, Oi = (t) => t.isThemeGetter, ji = (t, e) => e ? t.map(([r, s]) => {
  const n = s.map((a) => typeof a == "string" ? e + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([i, o]) => [e + i, o])) : a);
  return [r, n];
}) : t, Ni = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  const n = (a, i) => {
    r.set(a, i), e++, e > t && (e = 0, s = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let i = r.get(a);
      if (i !== void 0)
        return i;
      if ((i = s.get(a)) !== void 0)
        return n(a, i), i;
    },
    set(a, i) {
      r.has(a) ? r.set(a, i) : n(a, i);
    }
  };
}, gn = "!", Vi = (t) => {
  const {
    separator: e,
    experimentalParseClassName: r
  } = t, s = e.length === 1, n = e[0], a = e.length, i = (o) => {
    const d = [];
    let f = 0, h = 0, y;
    for (let M = 0; M < o.length; M++) {
      let W = o[M];
      if (f === 0) {
        if (W === n && (s || o.slice(M, M + a) === e)) {
          d.push(o.slice(h, M)), h = M + a;
          continue;
        }
        if (W === "/") {
          y = M;
          continue;
        }
      }
      W === "[" ? f++ : W === "]" && f--;
    }
    const j = d.length === 0 ? o : o.substring(h), G = j.startsWith(gn), U = G ? j.substring(1) : j, X = y && y > h ? y - h : void 0;
    return {
      modifiers: d,
      hasImportantModifier: G,
      baseClassName: U,
      maybePostfixModifierPosition: X
    };
  };
  return r ? (o) => r({
    className: o,
    parseClassName: i
  }) : i;
}, Ii = (t) => {
  if (t.length <= 1)
    return t;
  const e = [];
  let r = [];
  return t.forEach((s) => {
    s[0] === "[" ? (e.push(...r.sort(), s), r = []) : r.push(s);
  }), e.push(...r.sort()), e;
}, Pi = (t) => ({
  cache: Ni(t.cacheSize),
  parseClassName: Vi(t),
  ...Si(t)
}), Fi = /\s+/, Di = (t, e) => {
  const {
    parseClassName: r,
    getClassGroupId: s,
    getConflictingClassGroupIds: n
  } = e, a = [], i = t.trim().split(Fi);
  let o = "";
  for (let d = i.length - 1; d >= 0; d -= 1) {
    const f = i[d], {
      modifiers: h,
      hasImportantModifier: y,
      baseClassName: j,
      maybePostfixModifierPosition: G
    } = r(f);
    let U = !!G, X = s(U ? j.substring(0, G) : j);
    if (!X) {
      if (!U) {
        o = f + (o.length > 0 ? " " + o : o);
        continue;
      }
      if (X = s(j), !X) {
        o = f + (o.length > 0 ? " " + o : o);
        continue;
      }
      U = !1;
    }
    const M = Ii(h).join(":"), W = y ? M + gn : M, T = W + X;
    if (a.includes(T))
      continue;
    a.push(T);
    const pe = n(X, U);
    for (let ce = 0; ce < pe.length; ++ce) {
      const Q = pe[ce];
      a.push(W + Q);
    }
    o = f + (o.length > 0 ? " " + o : o);
  }
  return o;
};
function Zi() {
  let t = 0, e, r, s = "";
  for (; t < arguments.length; )
    (e = arguments[t++]) && (r = yn(e)) && (s && (s += " "), s += r);
  return s;
}
const yn = (t) => {
  if (typeof t == "string")
    return t;
  let e, r = "";
  for (let s = 0; s < t.length; s++)
    t[s] && (e = yn(t[s])) && (r && (r += " "), r += e);
  return r;
};
function Mi(t, ...e) {
  let r, s, n, a = i;
  function i(d) {
    const f = e.reduce((h, y) => y(h), t());
    return r = Pi(f), s = r.cache.get, n = r.cache.set, a = o, o(d);
  }
  function o(d) {
    const f = s(d);
    if (f)
      return f;
    const h = Di(d, r);
    return n(d, h), h;
  }
  return function() {
    return a(Zi.apply(null, arguments));
  };
}
const te = (t) => {
  const e = (r) => r[t] || [];
  return e.isThemeGetter = !0, e;
}, vn = /^\[(?:([a-z-]+):)?(.+)\]$/i, Li = /^\d+\/\d+$/, $i = /* @__PURE__ */ new Set(["px", "full", "screen"]), zi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ui = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Wi = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Bi = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Gi = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Be = (t) => Ct(t) || $i.has(t) || Li.test(t), He = (t) => At(t, "length", eo), Ct = (t) => !!t && !Number.isNaN(Number(t)), Ur = (t) => At(t, "number", Ct), Ft = (t) => !!t && Number.isInteger(Number(t)), qi = (t) => t.endsWith("%") && Ct(t.slice(0, -1)), F = (t) => vn.test(t), Je = (t) => zi.test(t), Yi = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Hi = (t) => At(t, Yi, bn), Ji = (t) => At(t, "position", bn), Ki = /* @__PURE__ */ new Set(["image", "url"]), Xi = (t) => At(t, Ki, ro), Qi = (t) => At(t, "", to), Dt = () => !0, At = (t, e, r) => {
  const s = vn.exec(t);
  return s ? s[1] ? typeof e == "string" ? s[1] === e : e.has(s[1]) : r(s[2]) : !1;
}, eo = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ui.test(t) && !Wi.test(t)
), bn = () => !1, to = (t) => Bi.test(t), ro = (t) => Gi.test(t), so = () => {
  const t = te("colors"), e = te("spacing"), r = te("blur"), s = te("brightness"), n = te("borderColor"), a = te("borderRadius"), i = te("borderSpacing"), o = te("borderWidth"), d = te("contrast"), f = te("grayscale"), h = te("hueRotate"), y = te("invert"), j = te("gap"), G = te("gradientColorStops"), U = te("gradientColorStopPositions"), X = te("inset"), M = te("margin"), W = te("opacity"), T = te("padding"), pe = te("saturate"), ce = te("scale"), Q = te("sepia"), Oe = te("skew"), ze = te("space"), Te = te("translate"), Ee = () => ["auto", "contain", "none"], fe = () => ["auto", "hidden", "clip", "visible", "scroll"], Fe = () => ["auto", F, e], C = () => [F, e], V = () => ["", Be, He], B = () => ["auto", Ct, F], ee = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], ue = () => ["solid", "dashed", "dotted", "double", "none"], he = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Se = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], _e = () => ["", "0", F], je = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], ge = () => [Ct, F];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Dt],
      spacing: [Be, He],
      blur: ["none", "", Je, F],
      brightness: ge(),
      borderColor: [t],
      borderRadius: ["none", "", "full", Je, F],
      borderSpacing: C(),
      borderWidth: V(),
      contrast: ge(),
      grayscale: _e(),
      hueRotate: ge(),
      invert: _e(),
      gap: C(),
      gradientColorStops: [t],
      gradientColorStopPositions: [qi, He],
      inset: Fe(),
      margin: Fe(),
      opacity: ge(),
      padding: C(),
      saturate: ge(),
      scale: ge(),
      sepia: _e(),
      skew: ge(),
      space: C(),
      translate: C()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", F]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Je]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": je()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": je()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...ee(), F]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: fe()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": fe()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": fe()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Ee()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Ee()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Ee()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [X]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [X]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [X]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [X]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [X]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [X]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [X]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [X]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [X]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ft, F]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: Fe()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", F]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: _e()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: _e()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ft, F]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Dt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ft, F]
        }, F]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": B()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": B()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Dt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ft, F]
        }, F]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": B()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": B()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", F]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", F]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [j]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [j]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [j]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...Se()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Se(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...Se(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [T]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [T]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [T]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [T]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [T]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [T]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [T]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [T]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [T]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [M]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [M]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [M]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [M]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [M]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [M]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [M]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [M]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [M]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [ze]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [ze]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", F, e]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [F, e, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [F, e, "none", "full", "min", "max", "fit", "prose", {
          screen: [Je]
        }, Je]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [F, e, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [F, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [F, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [F, e, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Je, He]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ur]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Dt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", F]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ct, Ur]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Be, F]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", F]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", F]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [W]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [W]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ue(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Be, He]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Be, F]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: C()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", F]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", F]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [W]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...ee(), Ji]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Hi]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Xi]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [U]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [U]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [U]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [G]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [G]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [G]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [o]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [o]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [o]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [o]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [o]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [o]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [o]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [o]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [o]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [W]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ue(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [o]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [o]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [W]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: ue()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [n]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [n]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [n]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [n]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [n]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [n]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [n]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [n]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [n]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [n]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...ue()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Be, F]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Be, He]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: V()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [W]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Be, He]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Je, Qi]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Dt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [W]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...he(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": he()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [r]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [s]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Je, F]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [f]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [h]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [y]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [pe]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [Q]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [s]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [f]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [h]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [y]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [W]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [pe]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [Q]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", F]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: ge()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", F]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: ge()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", F]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [ce]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [ce]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [ce]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ft, F]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [Te]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [Te]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [Oe]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [Oe]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", F]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", t]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", F]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [t]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": C()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": C()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": C()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": C()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": C()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": C()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": C()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": C()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": C()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": C()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": C()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": C()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": C()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": C()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": C()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": C()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": C()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": C()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", F]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Be, He, Ur]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, no = /* @__PURE__ */ Mi(so);
function ft(...t) {
  return no(Ti(t));
}
var ao = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], io = ao.reduce((t, e) => {
  const r = J.forwardRef((s, n) => {
    const { asChild: a, ...i } = s, o = a ? Rr : e;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ Z.jsx(o, { ...i, ref: n });
  });
  return r.displayName = `Primitive.${e}`, { ...t, [e]: r };
}, {}), oo = "Label", _n = J.forwardRef((t, e) => /* @__PURE__ */ Z.jsx(
  io.label,
  {
    ...t,
    ref: e,
    onMouseDown: (r) => {
      var n;
      r.target.closest("button, input, select, textarea") || ((n = t.onMouseDown) == null || n.call(t, r), !r.defaultPrevented && r.detail > 1 && r.preventDefault());
    }
  }
));
_n.displayName = oo;
var xn = _n;
function wn(t) {
  var e, r, s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object") if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (r = wn(t[e])) && (s && (s += " "), s += r);
  else for (e in t) t[e] && (s && (s += " "), s += e);
  return s;
}
function lo() {
  for (var t, e, r = 0, s = ""; r < arguments.length; ) (t = arguments[r++]) && (e = wn(t)) && (s && (s += " "), s += e);
  return s;
}
const Ps = (t) => typeof t == "boolean" ? "".concat(t) : t === 0 ? "0" : t, Fs = lo, kn = (t, e) => (r) => {
  var s;
  if ((e == null ? void 0 : e.variants) == null) return Fs(t, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: n, defaultVariants: a } = e, i = Object.keys(n).map((f) => {
    const h = r == null ? void 0 : r[f], y = a == null ? void 0 : a[f];
    if (h === null) return null;
    const j = Ps(h) || Ps(y);
    return n[f][j];
  }), o = r && Object.entries(r).reduce((f, h) => {
    let [y, j] = h;
    return j === void 0 || (f[y] = j), f;
  }, {}), d = e == null || (s = e.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((f, h) => {
    let { class: y, className: j, ...G } = h;
    return Object.entries(G).every((U) => {
      let [X, M] = U;
      return Array.isArray(M) ? M.includes({
        ...a,
        ...o
      }[X]) : {
        ...a,
        ...o
      }[X] === M;
    }) ? [
      ...f,
      y,
      j
    ] : f;
  }, []);
  return Fs(t, i, d, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
}, co = kn(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), En = J.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ Z.jsx(
  xn,
  {
    ref: r,
    className: ft(co(), t),
    ...e
  }
));
En.displayName = xn.displayName;
const uo = Jn, Cn = J.createContext(
  {}
), Ds = ({
  ...t
}) => /* @__PURE__ */ Z.jsx(Cn.Provider, { value: { name: t.name }, children: /* @__PURE__ */ Z.jsx(ea, { ...t }) }), Ar = () => {
  const t = J.useContext(Cn), e = J.useContext(Tn), { getFieldState: r, formState: s } = Tr(), n = r(t.name, s);
  if (!t)
    throw new Error("useFormField should be used within <FormField>");
  const { id: a } = e;
  return {
    id: a,
    name: t.name,
    formItemId: `${a}-form-item`,
    formDescriptionId: `${a}-form-item-description`,
    formMessageId: `${a}-form-item-message`,
    ...n
  };
}, Tn = J.createContext(
  {}
), Xr = J.forwardRef(({ className: t, ...e }, r) => {
  const s = J.useId();
  return /* @__PURE__ */ Z.jsx(Tn.Provider, { value: { id: s }, children: /* @__PURE__ */ Z.jsx("div", { ref: r, className: ft("space-y-2", t), ...e }) });
});
Xr.displayName = "FormItem";
const Qr = J.forwardRef(({ className: t, ...e }, r) => {
  const { error: s, formItemId: n } = Ar();
  return /* @__PURE__ */ Z.jsx(
    En,
    {
      ref: r,
      className: ft(s && "text-destructive", t),
      htmlFor: n,
      ...e
    }
  );
});
Qr.displayName = "FormLabel";
const es = J.forwardRef(({ ...t }, e) => {
  const { error: r, formItemId: s, formDescriptionId: n, formMessageId: a } = Ar();
  return /* @__PURE__ */ Z.jsx(
    Rr,
    {
      ref: e,
      id: s,
      "aria-describedby": r ? `${n} ${a}` : `${n}`,
      "aria-invalid": !!r,
      ...t
    }
  );
});
es.displayName = "FormControl";
const fo = J.forwardRef(({ className: t, ...e }, r) => {
  const { formDescriptionId: s } = Ar();
  return /* @__PURE__ */ Z.jsx(
    "p",
    {
      ref: r,
      id: s,
      className: ft("text-[0.8rem] text-muted-foreground", t),
      ...e
    }
  );
});
fo.displayName = "FormDescription";
const ts = J.forwardRef(({ className: t, children: e, ...r }, s) => {
  const { error: n, formMessageId: a } = Ar(), i = n ? String(n == null ? void 0 : n.message) : e;
  return i ? /* @__PURE__ */ Z.jsx(
    "p",
    {
      ref: s,
      id: a,
      className: ft("text-[0.8rem] font-medium text-destructive", t),
      ...r,
      children: i
    }
  ) : null;
});
ts.displayName = "FormMessage";
const ho = kn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), us = J.forwardRef(
  ({ className: t, variant: e, size: r, asChild: s = !1, ...n }, a) => {
    const i = s ? Rr : "button";
    return /* @__PURE__ */ Z.jsx(
      i,
      {
        className: ft(ho({ variant: e, size: r, className: t })),
        ref: a,
        ...n
      }
    );
  }
);
us.displayName = "Button";
const rs = J.forwardRef(
  ({ className: t, type: e, ...r }, s) => /* @__PURE__ */ Z.jsx(
    "input",
    {
      type: e,
      className: ft(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        t
      ),
      ref: s,
      ...r
    }
  )
);
rs.displayName = "Input";
const bo = () => {
  const { login: t } = Ms(), e = fa({
    resolver: ga(bi)
  }), r = async (s) => {
    try {
      await t(s.username, s.password);
    } catch (n) {
      console.log(n), e.setError("root", {
        message: "Nie udało się zalogować. Sprawdź swoje dane."
      });
    }
  };
  return /* @__PURE__ */ Z.jsx(uo, { ...e, children: /* @__PURE__ */ Z.jsxs("form", { onSubmit: e.handleSubmit(r), className: "space-y-4", children: [
    e.formState.errors.root && /* @__PURE__ */ Z.jsx("div", { className: "text-red-500", children: e.formState.errors.root.message }),
    /* @__PURE__ */ Z.jsx(
      Ds,
      {
        name: "username",
        control: e.control,
        render: ({ field: s }) => /* @__PURE__ */ Z.jsxs(Xr, { children: [
          /* @__PURE__ */ Z.jsx(Qr, { children: "Nazwa użytkownika" }),
          /* @__PURE__ */ Z.jsx(es, { children: /* @__PURE__ */ Z.jsx(rs, { placeholder: "Wprowadź nazwę użytkownika", ...s }) }),
          /* @__PURE__ */ Z.jsx(ts, {})
        ] })
      }
    ),
    /* @__PURE__ */ Z.jsx(
      Ds,
      {
        name: "password",
        control: e.control,
        render: ({ field: s }) => /* @__PURE__ */ Z.jsxs(Xr, { children: [
          /* @__PURE__ */ Z.jsx(Qr, { children: "Hasło" }),
          /* @__PURE__ */ Z.jsx(es, { children: /* @__PURE__ */ Z.jsx(
            rs,
            {
              type: "password",
              placeholder: "Wprowadź hasło",
              ...s
            }
          ) }),
          /* @__PURE__ */ Z.jsx(ts, {})
        ] })
      }
    ),
    /* @__PURE__ */ Z.jsx(us, { type: "submit", className: "w-full", children: "Zaloguj się" })
  ] }) });
}, _o = () => {
  const { isLoggedIn: t, user: e, logout: r } = Ms();
  return t ? /* @__PURE__ */ Z.jsxs("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ Z.jsxs("p", { className: "text-gray-700", children: [
      "Zalogowany jako ",
      e == null ? void 0 : e.name
    ] }),
    /* @__PURE__ */ Z.jsx(us, { variant: "outline", onClick: r, children: "Wyloguj" })
  ] }) : /* @__PURE__ */ Z.jsx("p", { className: "text-gray-500", children: "Nie jesteś zalogowany" });
};
export {
  Ke as AuthManager,
  vo as AuthProvider,
  bo as LoginPage,
  _o as LoginStatus,
  Ms as useAuth
};
