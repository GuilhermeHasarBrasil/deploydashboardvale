var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function (b, h, c) {
  if (null == b) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  if (h instanceof RegExp)
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  return b + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (b, h, c) {
        b != Array.prototype && b != Object.prototype && (b[h] = c.value);
      };
$jscomp.getGlobal = function (b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (b, h, c, e) {
  if (h) {
    c = $jscomp.global;
    b = b.split(".");
    for (e = 0; e < b.length - 1; e++) {
      var k = b[e];
      k in c || (c[k] = {});
      c = c[k];
    }
    b = b[b.length - 1];
    e = c[b];
    h = h(e);
    h != e && null != h && $jscomp.defineProperty(c, b, { configurable: !0, writable: !0, value: h });
  }
};
$jscomp.polyfill(
  "String.prototype.startsWith",
  function (b) {
    return b
      ? b
      : function (b, c) {
          var e = $jscomp.checkStringArgs(this, b, "startsWith");
          b += "";
          var h = e.length,
            p = b.length;
          c = Math.max(0, Math.min(c | 0, e.length));
          for (var l = 0; l < p && c < h; ) if (e[c++] != b[l++]) return !1;
          return l >= p;
        };
  },
  "es6",
  "es3"
);
var BrowserPrint = (function () {
  function b(a, b) {
    var d = new XMLHttpRequest();
    "withCredentials" in d
      ? d.open(a, b, !0)
      : "undefined" != typeof XDomainRequest
      ? ((d = new XDomainRequest()), d.open(a, b))
      : (d = null);
    return d;
  }
  function h(a, b, d) {
    void 0 === b && (b = e.defaultSuccessCallback);
    void 0 === d && (d = e.defaultErrorCallback);
    return c(a, b, d);
  }
  function c(a, b, d) {
    a.onreadystatechange = function () {
      a.readyState === XMLHttpRequest.DONE && 200 === a.status
        ? "" === a.responseType
          ? b(a.responseText)
          : b(a.response)
        : a.readyState === XMLHttpRequest.DONE &&
          (d ? d(a.response) : console.log("error occurred with no errorCallback set."));
    };
    return a;
  }
  var e = {},
    k = {},
    p = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  navigator.userAgent.indexOf("Trident/7.0");
  var l = "http://127.0.0.1:9100/";
  p && "https:" === location.protocol && (l = "https://127.0.0.1:9101/");
  e.Device = function (a) {
    var m = this;
    this.name = a.name;
    this.deviceType = a.deviceType;
    this.connection = a.connection;
    this.uid = a.uid;
    this.version = 2;
    this.provider = a.provider;
    this.manufacturer = a.manufacturer;
    this.readRetries = "bluetooth" === this.connection ? 1 : 0;
    this.sendErrorCallback = function (d) {};
    this.sendFinishedCallback = function (d) {};
    this.readErrorCallback = function (d) {};
    this.readFinishedCallback = function (d) {};
    this.send = function (d, a, f) {
      var g = b("POST", l + "write");
      g &&
        (void 0 !== m && (void 0 === a && (a = m.sendFinishedCallback), void 0 === f && (f = m.sendErrorCallback)),
        c(g, a, f),
        g.send(
          JSON.stringify({
            device: {
              name: this.name,
              uid: this.uid,
              connection: this.connection,
              deviceType: this.deviceType,
              version: this.version,
              provider: this.provider,
              manufacturer: this.manufacturer,
            },
            data: d,
          })
        ));
    };
    this.sendUrl = function (d, a, f, e) {
      var g = b("POST", l + "write");
      g &&
        (c(m, g, a, f),
        (d = {
          device: {
            name: this.name,
            uid: this.uid,
            connection: this.connection,
            deviceType: this.deviceType,
            version: this.version,
            provider: this.provider,
            manufacturer: this.manufacturer,
          },
          url: d,
        }),
        null != e && void 0 != e && (d.options = e),
        g.send(JSON.stringify(d)));
    };
    this.sendFile = function (d, a, f) {
      if ("string" === typeof d)
        e.loadFileFromUrl(
          d,
          function (d) {
            m.sendFile(d, a, f);
          },
          f
        );
      else {
        var g = b("POST", l + "write");
        if (g) {
          g.responseType = "text";
          h(g, a, f);
          var c = new FormData(),
            n = {};
          n.device = m;
          c.append("json", JSON.stringify(n));
          c.append("blob", d);
          g.send(c);
        }
      }
    };
    this.convertAndSendFile = function (d, a, b, c) {
      c || (c = {});
      c.action || (c.action = "print");
      e.convert(d, this, c, a, b);
    };
    this.read = function (d, a) {
      var f = b("POST", l + "read");
      f &&
        (void 0 !== m && (void 0 === d && (d = m.readFinishedCallback), void 0 === a && (a = m.readErrorCallback)),
        c(f, d, a),
        f.send(
          JSON.stringify({
            device: {
              name: this.name,
              uid: this.uid,
              connection: this.connection,
              deviceType: this.deviceType,
              version: this.version,
              provider: this.provider,
              manufacturer: this.manufacturer,
            },
          })
        ));
    };
    this.readUntilStringReceived = function (d, a, b, e, c) {
      c || (c = "");
      void 0 === e && (e = this.readRetries);
      a = (function (a, b, e, f, g) {
        return function (c) {
          if (c && 0 !== c.length) f = 0;
          else if (0 >= f) {
            b(g);
            return;
          }
          c = g + c;
          "" !== d && -1 < c.indexOf(d) ? b(c) : a.readUntilStringReceived(d, b, e, f - 1, c);
        };
      })(this, a, b, e, c);
      this.read(a, b);
    };
    this.readAllAvailable = function (a, b, f) {
      this.readUntilStringReceived("", a, b, f);
    };
    this.sendThenRead = function (a, b, f) {
      this.send(
        a,
        (function (a) {
          return function () {
            a.read(b, f);
          };
        })(this),
        f
      );
    };
    this.sendThenReadUntilStringReceived = function (a, b, f, e, c) {
      this.send(
        a,
        (function (a) {
          return function () {
            a.readUntilStringReceived(b, f, e, c);
          };
        })(this),
        e
      );
    };
    this.sendThenReadAllAvailable = function (a, b, e, c) {
      this.send(
        a,
        (function (a) {
          return function () {
            a.readUntilStringReceived("", b, e, c);
          };
        })(this),
        e
      );
    };
  };
  e.defaultSuccessCallback = function () {};
  e.defaultErrorCallback = function () {};
  e.ApplicationConfiguration = function () {
    this.application = { version: "1.2.0.3", build_number: 3, api_level: 2, platform: "", supportedConversions: {} };
  };
  e.getLocalDevices = function (a, c, d) {
    var g = b("GET", l + "available");
    g &&
      ((finishedFunction = function (b) {
        response = b;
        response = JSON.parse(response);
        for (var c in response)
          if (response.hasOwnProperty(c) && response[c].constructor === Array)
            for (arr = response[c], b = 0; b < arr.length; ++b) arr[b] = new e.Device(arr[b]);
        void 0 === d ? a(response) : (response.hasOwnProperty(d) || (response[d] = []), a(response[d]));
      }),
      h(g, finishedFunction, c),
      g.send());
  };
  e.getDefaultDevice = function (a, c, d) {
    var g = "default";
    void 0 !== a && null != a && (g = g + "?type=" + a);
    if ((a = b("GET", l + g)))
      (finishedFunction = function (a) {
        response = a;
        "" === response ? c(null) : ((response = JSON.parse(response)), (a = new e.Device(response)), c(a));
      }),
        (a = h(a, finishedFunction, d)),
        a.send();
  };
  e.getApplicationConfiguration = function (a, c) {
    var d = b("GET", l + "config");
    d &&
      ((finishedFunction = function (b) {
        response = b;
        "" === response ? a(null) : ((response = JSON.parse(response)), a(response));
      }),
      h(d, finishedFunction, c),
      d.send());
  };
  e.readOnInterval = function (a, b, d) {
    if (void 0 === d || 0 === d) d = 1;
    readFunc = function () {
      a.read(
        function (c) {
          b(c);
          k[a] = setTimeout(readFunc, d);
        },
        function (b) {
          k[a] = setTimeout(readFunc, d);
        }
      );
    };
    k[a] = setTimeout(readFunc, d);
  };
  e.stopReadOnInterval = function (a) {
    k[a] && clearTimeout(k[a]);
  };
  e.bindFieldToReadData = function (a, b, d, c) {
    e.readOnInterval(
      a,
      function (a) {
        "" !== a && ((b.value = a), void 0 !== c && null != c && c());
      },
      d
    );
  };
  e.loadFileFromUrl = function (a, c, d) {
    request = b("get", a);
    console.log("ResponseType: " + request.responseType);
    request.responseType = "blob";
    h(request, c, d);
    request.send();
  };
  e.convert = function (a, c, d, g, f) {
    if (a)
      if ("string" === typeof a)
        e.loadFileFromUrl(
          a,
          function (b) {
            d.fromFormat || (d.fromFormat = a.substring(a.length - 3));
            e.convert(b, c, d, g, f);
          },
          f
        );
      else {
        var k = b("POST", l + "convert");
        a.type &&
          (a.type.startsWith("image/") || a.type.startsWith("application/")) &&
          (d.fromFormat = a.type.toLowerCase().replace("image/", "").replace("application/", "").replace("x-ms-", ""));
        if (k) {
          k.responseType = "text";
          h(
            k,
            function (a) {
              g(JSON.parse(a));
            },
            f
          );
          var m = new FormData(),
            n = {};
          null != d && void 0 !== d && (n.options = d);
          c && (n.device = c);
          m.append("json", JSON.stringify(n));
          m.append("blob", a);
          k.send(m);
        }
      }
    else f ? f("Resource not specified") : e.defaultErrorCallback("Resource not specified");
  };
  return e;
})();
