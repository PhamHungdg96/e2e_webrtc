var Olm = (function () {
  var olm_exports = {};
  var onInitSuccess;
  var onInitFail;


  var Module = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
      function (Module) {
        Module = Module || {};


        var a;
        a || (a = typeof Module !== 'undefined' ? Module : {});
        var aa;
        a.ready = new Promise(function (b) {
          aa = b
        });
        var g;
        if ("undefined" !== typeof window) g = function (b) {
          window.crypto.getRandomValues(b)
        };
        else if (module.exports) {
          var ba = require("crypto");
          g = function (b) {
            var c = ba.randomBytes(b.length);
            b.set(c)
          };
          process = global.process
        } else throw Error("Cannot find global to attach library to");
        if ("undefined" !== typeof OLM_OPTIONS)
          for (var ca in OLM_OPTIONS) OLM_OPTIONS.hasOwnProperty(ca) && (a[ca] = OLM_OPTIONS[ca]);
        a.onRuntimeInitialized = function () {
          h = a._olm_error();
          olm_exports.PRIVATE_KEY_LENGTH = a._olm_pk_private_key_length();
          onInitSuccess && onInitSuccess()
        };
        a.onAbort = function (b) {
          onInitFail && onInitFail(b)
        };
        var da = {},
          l;
        for (l in a) a.hasOwnProperty(l) && (da[l] = a[l]);
        var ea = !1,
          m = !1,
          fa = !1,
          ia = !1;
        ea = "object" === typeof window;
        m = "function" === typeof importScripts;
        fa = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
        ia = !ea && !fa && !m;
        var n = "",
          ja, ka, la, ma;
        if (fa) n = m ? require("path").dirname(n) + "/" : __dirname + "/", ja = function (b, c) {
          la || (la = require("fs"));
          ma || (ma = require("path"));
          b = ma.normalize(b);
          return la.readFileSync(b, c ? null : "utf8")
        }, ka = function (b) {
          b = ja(b, !0);
          b.buffer || (b = new Uint8Array(b));
          b.buffer || q("Assertion failed: undefined");
          return b
        }, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function (b) {
          throw b;
        }), process.on("unhandledRejection", q), a.inspect = function () {
          return "[Emscripten Module object]"
        };
        else if (ia) "undefined" != typeof read && (ja = function (b) {
          return read(b)
        }), ka = function (b) {
          if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(b));
          b = read(b, "binary");
          "object" === typeof b || q("Assertion failed: undefined");
          return b
        }, "undefined" !== typeof print && ("undefined" === typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
        else if (ea || m) m ? n = self.location.href : document.currentScript && (n = document.currentScript.src), _scriptDir &&
          (n = _scriptDir), 0 !== n.indexOf("blob:") ? n = n.substr(0, n.lastIndexOf("/") + 1) : n = "", ja = function (b) {
            var c = new XMLHttpRequest;
            c.open("GET", b, !1);
            c.send(null);
            return c.responseText
          }, m && (ka = function (b) {
            var c = new XMLHttpRequest;
            c.open("GET", b, !1);
            c.responseType = "arraybuffer";
            c.send(null);
            return new Uint8Array(c.response)
          });
        var na = a.print || console.log.bind(console),
          oa = a.printErr || console.warn.bind(console);
        for (l in da) da.hasOwnProperty(l) && (a[l] = da[l]);
        da = null;
        var pa;
        a.wasmBinary && (pa = a.wasmBinary);
        var noExitRuntime;
        a.noExitRuntime && (noExitRuntime = a.noExitRuntime);
        "object" !== typeof WebAssembly && q("no native wasm support detected");

        function r(b) {
          var c = "i8";
          "*" === c.charAt(c.length - 1) && (c = "i32");
          switch (c) {
            case "i1":
              t[b >> 0] = 0;
              break;
            case "i8":
              t[b >> 0] = 0;
              break;
            case "i16":
              qa[b >> 1] = 0;
              break;
            case "i32":
              u[b >> 2] = 0;
              break;
            case "i64":
              ra = [0, (w = 0, 1 <= +sa(w) ? 0 < w ? (ta(+ua(w / 4294967296), 4294967295) | 0) >>> 0 : ~~+va((w - +(~~w >>> 0)) / 4294967296) >>> 0 : 0)];
              u[b >> 2] = ra[0];
              u[b + 4 >> 2] = ra[1];
              break;
            case "float":
              wa[b >> 2] = 0;
              break;
            case "double":
              xa[b >> 3] = 0;
              break;
            default:
              q("invalid type for setValue: " + c)
          }
        }

        function ya(b, c) {
          c = c || "i8";
          "*" === c.charAt(c.length - 1) && (c = "i32");
          switch (c) {
            case "i1":
              return t[b >> 0];
            case "i8":
              return t[b >> 0];
            case "i16":
              return qa[b >> 1];
            case "i32":
              return u[b >> 2];
            case "i64":
              return u[b >> 2];
            case "float":
              return wa[b >> 2];
            case "double":
              return xa[b >> 3];
            default:
              q("invalid type for getValue: " + c)
          }
          return null
        }
        var za, Aa = new WebAssembly.Table({
            initial: 9,
            maximum: 9,
            element: "anyfunc"
          }),
          Ba = !1,
          Ca = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

        function x(b, c) {
          if (b) {
            var d = y,
              e = b + c;
            for (c = b; d[c] && !(c >= e);) ++c;
            if (16 < c - b && d.subarray && Ca) b = Ca.decode(d.subarray(b, c));
            else {
              for (e = ""; b < c;) {
                var f = d[b++];
                if (f & 128) {
                  var k = d[b++] & 63;
                  if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | k);
                  else {
                    var p = d[b++] & 63;
                    f = 224 == (f & 240) ? (f & 15) << 12 | k << 6 | p : (f & 7) << 18 | k << 12 | p << 6 | d[b++] & 63;
                    65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                  }
                } else e += String.fromCharCode(f)
              }
              b = e
            }
          } else b = "";
          return b
        }

        function z(b, c, d, e) {
          if (!(0 < e)) return 0;
          var f = d;
          e = d + e - 1;
          for (var k = 0; k < b.length; ++k) {
            var p = b.charCodeAt(k);
            if (55296 <= p && 57343 >= p) {
              var v = b.charCodeAt(++k);
              p = 65536 + ((p & 1023) << 10) | v & 1023
            }
            if (127 >= p) {
              if (d >= e) break;
              c[d++] = p
            } else {
              if (2047 >= p) {
                if (d + 1 >= e) break;
                c[d++] = 192 | p >> 6
              } else {
                if (65535 >= p) {
                  if (d + 2 >= e) break;
                  c[d++] = 224 | p >> 12
                } else {
                  if (d + 3 >= e) break;
                  c[d++] = 240 | p >> 18;
                  c[d++] = 128 | p >> 12 & 63
                }
                c[d++] = 128 | p >> 6 & 63
              }
              c[d++] = 128 | p & 63
            }
          }
          c[d] = 0;
          return d - f
        }

        function A(b) {
          for (var c = 0, d = 0; d < b.length; ++d) {
            var e = b.charCodeAt(d);
            55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | b.charCodeAt(++d) & 1023);
            127 >= e ? ++c : c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4
          }
          return c
        }

        function Da(b, c) {
          for (var d = 0; d < b.length; ++d) t[c++ >> 0] = b.charCodeAt(d)
        }
        var Ea, t, y, qa, u, wa, xa, Ga = a.INITIAL_MEMORY || 262144;
        a.wasmMemory ? za = a.wasmMemory : za = new WebAssembly.Memory({
          initial: Ga / 65536,
          maximum: Ga / 65536
        });
        za && (Ea = za.buffer);
        Ga = Ea.byteLength;
        var B = Ea;
        Ea = B;
        a.HEAP8 = t = new Int8Array(B);
        a.HEAP16 = qa = new Int16Array(B);
        a.HEAP32 = u = new Int32Array(B);
        a.HEAPU8 = y = new Uint8Array(B);
        a.HEAPU16 = new Uint16Array(B);
        a.HEAPU32 = new Uint32Array(B);
        a.HEAPF32 = wa = new Float32Array(B);
        a.HEAPF64 = xa = new Float64Array(B);
        u[9584] = 104032;

        function Ha(b) {
          for (; 0 < b.length;) {
            var c = b.shift();
            if ("function" == typeof c) c(a);
            else {
              var d = c.Nb;
              "number" === typeof d ? void 0 === c.Mb ? a.dynCall_v(d) : a.dynCall_vi(d, c.Mb) : d(void 0 === c.Mb ? null : c.Mb)
            }
          }
        }
        var Ia = [],
          Ja = [],
          Ka = [],
          La = [];

        function Ma() {
          var b = a.preRun.shift();
          Ia.unshift(b)
        }
        var sa = Math.abs,
          va = Math.ceil,
          ua = Math.floor,
          ta = Math.min,
          C = 0,
          Na = null,
          Oa = null;
        a.preloadedImages = {};
        a.preloadedAudios = {};

        function q(b) {
          if (a.onAbort) a.onAbort(b);
          na(b);
          oa(b);
          Ba = !0;
          throw new WebAssembly.RuntimeError("abort(" + b + "). Build with -s ASSERTIONS=1 for more info.");
        }

        function Pa(b) {
          var c = D;
          return String.prototype.startsWith ? c.startsWith(b) : 0 === c.indexOf(b)
        }

        function Qa() {
          return Pa("data:application/octet-stream;base64,")
        }
        var D = "olm.wasm";
        if (!Qa()) {
          var Ra = D;
          D = a.locateFile ? a.locateFile(Ra, n) : n + Ra
        }

        function Sa() {
          try {
            if (pa) return new Uint8Array(pa);
            if (ka) return ka(D);
            throw "both async and sync fetching of the wasm failed";
          } catch (b) {
            q(b)
          }
        }

        function Ta() {
          return pa || !ea && !m || "function" !== typeof fetch || Pa("file://") ? new Promise(function (b) {
            b(Sa())
          }) : fetch(D, {
            credentials: "same-origin"
          }).then(function (b) {
            if (!b.ok) throw "failed to load wasm binary file at '" + D + "'";
            return b.arrayBuffer()
          }).catch(function () {
            return Sa()
          })
        }
        var w, ra;
        Ja.push({
          Nb: function () {
            Ua()
          }
        });
        var Va = {
          a: function (b, c, d) {
            y.copyWithin(b, c, c + d)
          },
          b: function () {
            q("OOM")
          },
          memory: za,
          table: Aa
        };
        (function () {
          function b(f) {
            a.asm = f.exports;
            C--;
            a.monitorRunDependencies && a.monitorRunDependencies(C);
            0 == C && (null !== Na && (clearInterval(Na), Na = null), Oa && (f = Oa, Oa = null, f()))
          }

          function c(f) {
            b(f.instance)
          }

          function d(f) {
            return Ta().then(function (k) {
              return WebAssembly.instantiate(k, e)
            }).then(f, function (k) {
              oa("failed to asynchronously prepare wasm: " + k);
              q(k)
            })
          }
          var e = {
            a: Va
          };
          C++;
          a.monitorRunDependencies && a.monitorRunDependencies(C);
          if (a.instantiateWasm) try {
            return a.instantiateWasm(e, b)
          } catch (f) {
            return oa("Module.instantiateWasm callback failed with error: " +
              f), !1
          }(function () {
            if (pa || "function" !== typeof WebAssembly.instantiateStreaming || Qa() || Pa("file://") || "function" !== typeof fetch) return d(c);
            fetch(D, {
              credentials: "same-origin"
            }).then(function (f) {
              return WebAssembly.instantiateStreaming(f, e).then(c, function (k) {
                oa("wasm streaming compile failed: " + k);
                oa("falling back to ArrayBuffer instantiation");
                return d(c)
              })
            })
          })();
          return {}
        })();
        var Ua = a.___wasm_call_ctors = function () {
          return (Ua = a.___wasm_call_ctors = a.asm.c).apply(null, arguments)
        };
        a._olm_pk_encryption_last_error = function () {
          return (a._olm_pk_encryption_last_error = a.asm.d).apply(null, arguments)
        };
        a._olm_pk_encryption_size = function () {
          return (a._olm_pk_encryption_size = a.asm.e).apply(null, arguments)
        };
        a._olm_pk_encryption = function () {
          return (a._olm_pk_encryption = a.asm.f).apply(null, arguments)
        };
        a._olm_clear_pk_encryption = function () {
          return (a._olm_clear_pk_encryption = a.asm.g).apply(null, arguments)
        };
        a._olm_pk_encryption_set_recipient_key = function () {
          return (a._olm_pk_encryption_set_recipient_key = a.asm.h).apply(null, arguments)
        };
        a._olm_pk_key_length = function () {
          return (a._olm_pk_key_length = a.asm.i).apply(null, arguments)
        };
        a._olm_pk_ciphertext_length = function () {
          return (a._olm_pk_ciphertext_length = a.asm.j).apply(null, arguments)
        };
        a._olm_pk_mac_length = function () {
          return (a._olm_pk_mac_length = a.asm.k).apply(null, arguments)
        };
        a._olm_pk_encrypt_random_length = function () {
          return (a._olm_pk_encrypt_random_length = a.asm.l).apply(null, arguments)
        };
        a._olm_pk_encrypt = function () {
          return (a._olm_pk_encrypt = a.asm.m).apply(null, arguments)
        };
        a._olm_pk_decryption_last_error = function () {
          return (a._olm_pk_decryption_last_error = a.asm.n).apply(null, arguments)
        };
        a._olm_pk_decryption_size = function () {
          return (a._olm_pk_decryption_size = a.asm.o).apply(null, arguments)
        };
        a._olm_pk_decryption = function () {
          return (a._olm_pk_decryption = a.asm.p).apply(null, arguments)
        };
        a._olm_clear_pk_decryption = function () {
          return (a._olm_clear_pk_decryption = a.asm.q).apply(null, arguments)
        };
        a._olm_pk_private_key_length = function () {
          return (a._olm_pk_private_key_length = a.asm.r).apply(null, arguments)
        };
        a._olm_pk_generate_key_random_length = function () {
          return (a._olm_pk_generate_key_random_length = a.asm.s).apply(null, arguments)
        };
        a._olm_pk_key_from_private = function () {
          return (a._olm_pk_key_from_private = a.asm.t).apply(null, arguments)
        };
        a._olm_pk_generate_key = function () {
          return (a._olm_pk_generate_key = a.asm.u).apply(null, arguments)
        };
        a._olm_pickle_pk_decryption_length = function () {
          return (a._olm_pickle_pk_decryption_length = a.asm.v).apply(null, arguments)
        };
        a._olm_pickle_pk_decryption = function () {
          return (a._olm_pickle_pk_decryption = a.asm.w).apply(null, arguments)
        };
        a._olm_unpickle_pk_decryption = function () {
          return (a._olm_unpickle_pk_decryption = a.asm.x).apply(null, arguments)
        };
        a._olm_pk_max_plaintext_length = function () {
          return (a._olm_pk_max_plaintext_length = a.asm.y).apply(null, arguments)
        };
        a._olm_pk_decrypt = function () {
          return (a._olm_pk_decrypt = a.asm.z).apply(null, arguments)
        };
        a._olm_pk_get_private_key = function () {
          return (a._olm_pk_get_private_key = a.asm.A).apply(null, arguments)
        };
        a._olm_pk_signing_size = function () {
          return (a._olm_pk_signing_size = a.asm.B).apply(null, arguments)
        };
        a._olm_pk_signing = function () {
          return (a._olm_pk_signing = a.asm.C).apply(null, arguments)
        };
        a._olm_pk_signing_last_error = function () {
          return (a._olm_pk_signing_last_error = a.asm.D).apply(null, arguments)
        };
        a._olm_clear_pk_signing = function () {
          return (a._olm_clear_pk_signing = a.asm.E).apply(null, arguments)
        };
        a._olm_pk_signing_seed_length = function () {
          return (a._olm_pk_signing_seed_length = a.asm.F).apply(null, arguments)
        };
        a._olm_pk_signing_public_key_length = function () {
          return (a._olm_pk_signing_public_key_length = a.asm.G).apply(null, arguments)
        };
        a._olm_pk_signing_key_from_seed = function () {
          return (a._olm_pk_signing_key_from_seed = a.asm.H).apply(null, arguments)
        };
        a._olm_pk_signature_length = function () {
          return (a._olm_pk_signature_length = a.asm.I).apply(null, arguments)
        };
        a._olm_pk_sign = function () {
          return (a._olm_pk_sign = a.asm.J).apply(null, arguments)
        };
        a._olm_get_library_version = function () {
          return (a._olm_get_library_version = a.asm.K).apply(null, arguments)
        };
        a._olm_error = function () {
          return (a._olm_error = a.asm.L).apply(null, arguments)
        };
        a._olm_account_last_error = function () {
          return (a._olm_account_last_error = a.asm.M).apply(null, arguments)
        };
        a._olm_session_last_error = function () {
          return (a._olm_session_last_error = a.asm.N).apply(null, arguments)
        };
        a._olm_utility_last_error = function () {
          return (a._olm_utility_last_error = a.asm.O).apply(null, arguments)
        };
        a._olm_account_size = function () {
          return (a._olm_account_size = a.asm.P).apply(null, arguments)
        };
        a._olm_session_size = function () {
          return (a._olm_session_size = a.asm.Q).apply(null, arguments)
        };
        a._olm_utility_size = function () {
          return (a._olm_utility_size = a.asm.R).apply(null, arguments)
        };
        a._olm_account = function () {
          return (a._olm_account = a.asm.S).apply(null, arguments)
        };
        a._olm_session = function () {
          return (a._olm_session = a.asm.T).apply(null, arguments)
        };
        a._olm_utility = function () {
          return (a._olm_utility = a.asm.U).apply(null, arguments)
        };
        a._olm_clear_account = function () {
          return (a._olm_clear_account = a.asm.V).apply(null, arguments)
        };
        a._olm_clear_session = function () {
          return (a._olm_clear_session = a.asm.W).apply(null, arguments)
        };
        a._olm_clear_utility = function () {
          return (a._olm_clear_utility = a.asm.X).apply(null, arguments)
        };
        a._olm_pickle_account_length = function () {
          return (a._olm_pickle_account_length = a.asm.Y).apply(null, arguments)
        };
        a._olm_pickle_session_length = function () {
          return (a._olm_pickle_session_length = a.asm.Z).apply(null, arguments)
        };
        a._olm_pickle_account = function () {
          return (a._olm_pickle_account = a.asm._).apply(null, arguments)
        };
        a._olm_pickle_session = function () {
          return (a._olm_pickle_session = a.asm.$).apply(null, arguments)
        };
        a._olm_unpickle_account = function () {
          return (a._olm_unpickle_account = a.asm.aa).apply(null, arguments)
        };
        a._olm_unpickle_session = function () {
          return (a._olm_unpickle_session = a.asm.ba).apply(null, arguments)
        };
        a._olm_create_account_random_length = function () {
          return (a._olm_create_account_random_length = a.asm.ca).apply(null, arguments)
        };
        a._olm_create_account = function () {
          return (a._olm_create_account = a.asm.da).apply(null, arguments)
        };
        a._olm_account_identity_keys_length = function () {
          return (a._olm_account_identity_keys_length = a.asm.ea).apply(null, arguments)
        };
        a._olm_account_identity_keys = function () {
          return (a._olm_account_identity_keys = a.asm.fa).apply(null, arguments)
        };
        a._olm_account_signature_length = function () {
          return (a._olm_account_signature_length = a.asm.ga).apply(null, arguments)
        };
        a._olm_account_sign = function () {
          return (a._olm_account_sign = a.asm.ha).apply(null, arguments)
        };
        a._olm_account_one_time_keys_length = function () {
          return (a._olm_account_one_time_keys_length = a.asm.ia).apply(null, arguments)
        };
        a._olm_account_one_time_keys = function () {
          return (a._olm_account_one_time_keys = a.asm.ja).apply(null, arguments)
        };
        a._olm_account_mark_keys_as_published = function () {
          return (a._olm_account_mark_keys_as_published = a.asm.ka).apply(null, arguments)
        };
        a._olm_account_max_number_of_one_time_keys = function () {
          return (a._olm_account_max_number_of_one_time_keys = a.asm.la).apply(null, arguments)
        };
        a._olm_account_generate_one_time_keys_random_length = function () {
          return (a._olm_account_generate_one_time_keys_random_length = a.asm.ma).apply(null, arguments)
        };
        a._olm_account_generate_one_time_keys = function () {
          return (a._olm_account_generate_one_time_keys = a.asm.na).apply(null, arguments)
        };
        a._olm_account_generate_fallback_key_random_length = function () {
          return (a._olm_account_generate_fallback_key_random_length = a.asm.oa).apply(null, arguments)
        };
        a._olm_account_generate_fallback_key = function () {
          return (a._olm_account_generate_fallback_key = a.asm.pa).apply(null, arguments)
        };
        a._olm_account_fallback_key_length = function () {
          return (a._olm_account_fallback_key_length = a.asm.qa).apply(null, arguments)
        };
        a._olm_account_fallback_key = function () {
          return (a._olm_account_fallback_key = a.asm.ra).apply(null, arguments)
        };
        a._olm_create_outbound_session_random_length = function () {
          return (a._olm_create_outbound_session_random_length = a.asm.sa).apply(null, arguments)
        };
        a._olm_create_outbound_session = function () {
          return (a._olm_create_outbound_session = a.asm.ta).apply(null, arguments)
        };
        a._olm_create_inbound_session = function () {
          return (a._olm_create_inbound_session = a.asm.ua).apply(null, arguments)
        };
        a._olm_create_inbound_session_from = function () {
          return (a._olm_create_inbound_session_from = a.asm.va).apply(null, arguments)
        };
        a._olm_session_id_length = function () {
          return (a._olm_session_id_length = a.asm.wa).apply(null, arguments)
        };
        a._olm_session_id = function () {
          return (a._olm_session_id = a.asm.xa).apply(null, arguments)
        };
        a._olm_session_has_received_message = function () {
          return (a._olm_session_has_received_message = a.asm.ya).apply(null, arguments)
        };
        a._olm_session_describe = function () {
          return (a._olm_session_describe = a.asm.za).apply(null, arguments)
        };
        a._olm_matches_inbound_session = function () {
          return (a._olm_matches_inbound_session = a.asm.Aa).apply(null, arguments)
        };
        a._olm_matches_inbound_session_from = function () {
          return (a._olm_matches_inbound_session_from = a.asm.Ba).apply(null, arguments)
        };
        a._olm_remove_one_time_keys = function () {
          return (a._olm_remove_one_time_keys = a.asm.Ca).apply(null, arguments)
        };
        a._olm_encrypt_message_type = function () {
          return (a._olm_encrypt_message_type = a.asm.Da).apply(null, arguments)
        };
        a._olm_encrypt_random_length = function () {
          return (a._olm_encrypt_random_length = a.asm.Ea).apply(null, arguments)
        };
        a._olm_encrypt_message_length = function () {
          return (a._olm_encrypt_message_length = a.asm.Fa).apply(null, arguments)
        };
        a._olm_encrypt = function () {
          return (a._olm_encrypt = a.asm.Ga).apply(null, arguments)
        };
        a._olm_decrypt_max_plaintext_length = function () {
          return (a._olm_decrypt_max_plaintext_length = a.asm.Ha).apply(null, arguments)
        };
        a._olm_decrypt = function () {
          return (a._olm_decrypt = a.asm.Ia).apply(null, arguments)
        };
        a._olm_sha256_length = function () {
          return (a._olm_sha256_length = a.asm.Ja).apply(null, arguments)
        };
        a._olm_sha256 = function () {
          return (a._olm_sha256 = a.asm.Ka).apply(null, arguments)
        };
        a._olm_ed25519_verify = function () {
          return (a._olm_ed25519_verify = a.asm.La).apply(null, arguments)
        };
        a._olm_inbound_group_session_size = function () {
          return (a._olm_inbound_group_session_size = a.asm.Ma).apply(null, arguments)
        };
        a._olm_inbound_group_session = function () {
          return (a._olm_inbound_group_session = a.asm.Na).apply(null, arguments)
        };
        a._olm_clear_inbound_group_session = function () {
          return (a._olm_clear_inbound_group_session = a.asm.Oa).apply(null, arguments)
        };
        a._olm_inbound_group_session_last_error = function () {
          return (a._olm_inbound_group_session_last_error = a.asm.Pa).apply(null, arguments)
        };
        a._olm_init_inbound_group_session = function () {
          return (a._olm_init_inbound_group_session = a.asm.Qa).apply(null, arguments)
        };
        a._olm_import_inbound_group_session = function () {
          return (a._olm_import_inbound_group_session = a.asm.Ra).apply(null, arguments)
        };
        a._olm_pickle_inbound_group_session_length = function () {
          return (a._olm_pickle_inbound_group_session_length = a.asm.Sa).apply(null, arguments)
        };
        a._olm_pickle_inbound_group_session = function () {
          return (a._olm_pickle_inbound_group_session = a.asm.Ta).apply(null, arguments)
        };
        a._olm_unpickle_inbound_group_session = function () {
          return (a._olm_unpickle_inbound_group_session = a.asm.Ua).apply(null, arguments)
        };
        a._olm_group_decrypt_max_plaintext_length = function () {
          return (a._olm_group_decrypt_max_plaintext_length = a.asm.Va).apply(null, arguments)
        };
        a._olm_group_decrypt = function () {
          return (a._olm_group_decrypt = a.asm.Wa).apply(null, arguments)
        };
        a._olm_inbound_group_session_id_length = function () {
          return (a._olm_inbound_group_session_id_length = a.asm.Xa).apply(null, arguments)
        };
        a._olm_inbound_group_session_id = function () {
          return (a._olm_inbound_group_session_id = a.asm.Ya).apply(null, arguments)
        };
        a._olm_inbound_group_session_first_known_index = function () {
          return (a._olm_inbound_group_session_first_known_index = a.asm.Za).apply(null, arguments)
        };
        a._olm_inbound_group_session_is_verified = function () {
          return (a._olm_inbound_group_session_is_verified = a.asm._a).apply(null, arguments)
        };
        a._olm_export_inbound_group_session_length = function () {
          return (a._olm_export_inbound_group_session_length = a.asm.$a).apply(null, arguments)
        };
        a._olm_export_inbound_group_session = function () {
          return (a._olm_export_inbound_group_session = a.asm.ab).apply(null, arguments)
        };
        a._olm_sas_last_error = function () {
          return (a._olm_sas_last_error = a.asm.bb).apply(null, arguments)
        };
        a._olm_sas_size = function () {
          return (a._olm_sas_size = a.asm.cb).apply(null, arguments)
        };
        a._olm_sas = function () {
          return (a._olm_sas = a.asm.db).apply(null, arguments)
        };
        a._olm_clear_sas = function () {
          return (a._olm_clear_sas = a.asm.eb).apply(null, arguments)
        };
        a._olm_create_sas_random_length = function () {
          return (a._olm_create_sas_random_length = a.asm.fb).apply(null, arguments)
        };
        a._olm_create_sas = function () {
          return (a._olm_create_sas = a.asm.gb).apply(null, arguments)
        };
        a._olm_sas_pubkey_length = function () {
          return (a._olm_sas_pubkey_length = a.asm.hb).apply(null, arguments)
        };
        a._olm_sas_get_pubkey = function () {
          return (a._olm_sas_get_pubkey = a.asm.ib).apply(null, arguments)
        };
        a._olm_sas_set_their_key = function () {
          return (a._olm_sas_set_their_key = a.asm.jb).apply(null, arguments)
        };
        a._olm_sas_is_their_key_set = function () {
          return (a._olm_sas_is_their_key_set = a.asm.kb).apply(null, arguments)
        };
        a._olm_sas_generate_bytes = function () {
          return (a._olm_sas_generate_bytes = a.asm.lb).apply(null, arguments)
        };
        a._olm_sas_mac_length = function () {
          return (a._olm_sas_mac_length = a.asm.mb).apply(null, arguments)
        };
        a._olm_sas_calculate_mac = function () {
          return (a._olm_sas_calculate_mac = a.asm.nb).apply(null, arguments)
        };
        a._olm_sas_calculate_mac_long_kdf = function () {
          return (a._olm_sas_calculate_mac_long_kdf = a.asm.ob).apply(null, arguments)
        };
        a._olm_outbound_group_session_size = function () {
          return (a._olm_outbound_group_session_size = a.asm.pb).apply(null, arguments)
        };
        a._olm_outbound_group_session = function () {
          return (a._olm_outbound_group_session = a.asm.qb).apply(null, arguments)
        };
        a._olm_clear_outbound_group_session = function () {
          return (a._olm_clear_outbound_group_session = a.asm.rb).apply(null, arguments)
        };
        a._olm_outbound_group_session_last_error = function () {
          return (a._olm_outbound_group_session_last_error = a.asm.sb).apply(null, arguments)
        };
        a._olm_pickle_outbound_group_session_length = function () {
          return (a._olm_pickle_outbound_group_session_length = a.asm.tb).apply(null, arguments)
        };
        a._olm_pickle_outbound_group_session = function () {
          return (a._olm_pickle_outbound_group_session = a.asm.ub).apply(null, arguments)
        };
        a._olm_unpickle_outbound_group_session = function () {
          return (a._olm_unpickle_outbound_group_session = a.asm.vb).apply(null, arguments)
        };
        a._olm_init_outbound_group_session_random_length = function () {
          return (a._olm_init_outbound_group_session_random_length = a.asm.wb).apply(null, arguments)
        };
        a._olm_init_outbound_group_session = function () {
          return (a._olm_init_outbound_group_session = a.asm.xb).apply(null, arguments)
        };
        a._olm_group_encrypt_message_length = function () {
          return (a._olm_group_encrypt_message_length = a.asm.yb).apply(null, arguments)
        };
        a._olm_group_encrypt = function () {
          return (a._olm_group_encrypt = a.asm.zb).apply(null, arguments)
        };
        a._olm_outbound_group_session_id_length = function () {
          return (a._olm_outbound_group_session_id_length = a.asm.Ab).apply(null, arguments)
        };
        a._olm_outbound_group_session_id = function () {
          return (a._olm_outbound_group_session_id = a.asm.Bb).apply(null, arguments)
        };
        a._olm_outbound_group_session_message_index = function () {
          return (a._olm_outbound_group_session_message_index = a.asm.Cb).apply(null, arguments)
        };
        a._olm_outbound_group_session_key_length = function () {
          return (a._olm_outbound_group_session_key_length = a.asm.Db).apply(null, arguments)
        };
        a._olm_outbound_group_session_key = function () {
          return (a._olm_outbound_group_session_key = a.asm.Eb).apply(null, arguments)
        };
        a._malloc = function () {
          return (a._malloc = a.asm.Fb).apply(null, arguments)
        };
        a._free = function () {
          return (a._free = a.asm.Gb).apply(null, arguments)
        };
        var Wa = a.stackSave = function () {
            return (Wa = a.stackSave = a.asm.Hb).apply(null, arguments)
          },
          Xa = a.stackRestore = function () {
            return (Xa = a.stackRestore = a.asm.Ib).apply(null, arguments)
          },
          Ya = a.stackAlloc = function () {
            return (Ya = a.stackAlloc = a.asm.Jb).apply(null, arguments)
          };
        a.ALLOC_STACK = 1;
        var Za;
        Oa = function $a() {
          Za || ab();
          Za || (Oa = $a)
        };

        function ab() {
          function b() {
            if (!Za && (Za = !0, a.calledRun = !0, !Ba)) {
              Ha(Ja);
              Ha(Ka);
              aa(a);
              if (a.onRuntimeInitialized) a.onRuntimeInitialized();
              if (a.postRun)
                for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) {
                  var c = a.postRun.shift();
                  La.unshift(c)
                }
              Ha(La)
            }
          }
          if (!(0 < C)) {
            if (a.preRun)
              for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) Ma();
            Ha(Ia);
            0 < C || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () {
              setTimeout(function () {
                a.setStatus("")
              }, 1);
              b()
            }, 1)) : b())
          }
        }
        a.run = ab;
        if (a.preInit)
          for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); 0 < a.preInit.length;) a.preInit.pop()();
        noExitRuntime = !0;
        ab();

        function E() {
          var b = a._olm_outbound_group_session_size();
          this.Lb = F(b);
          this.Kb = a._olm_outbound_group_session(this.Lb)
        }

        function H(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_outbound_group_session_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        E.prototype.free = function () {
          a._olm_clear_outbound_group_session(this.Kb);
          I(this.Kb)
        };
        E.prototype.pickle = J(function (b) {
          b = K(b);
          var c = H(a._olm_pickle_outbound_group_session_length)(this.Kb),
            d = L(b),
            e = L(c + 1);
          try {
            H(a._olm_pickle_outbound_group_session)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        E.prototype.unpickle = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c);
          try {
            H(a._olm_unpickle_outbound_group_session)(this.Kb, d, b.length, e, c.length)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
        });
        E.prototype.create = J(function () {
          var b = H(a._olm_init_outbound_group_session_random_length)(this.Kb),
            c = N(b, g);
          H(a._olm_init_outbound_group_session)(this.Kb, c, b)
        });
        E.prototype.encrypt = function (b) {
          try {
            var c = A(b);
            var d = H(a._olm_group_encrypt_message_length)(this.Kb, c);
            var e = F(c + 1);
            z(b, y, e, c + 1);
            var f = F(d + 1);
            H(a._olm_group_encrypt)(this.Kb, e, c, f, d);
            r(f + d);
            return x(f, d)
          } finally {
            void 0 !== e && (M(e, c + 1), I(e)), void 0 !== f && I(f)
          }
        };
        E.prototype.session_id = J(function () {
          var b = H(a._olm_outbound_group_session_id_length)(this.Kb),
            c = L(b + 1);
          H(a._olm_outbound_group_session_id)(this.Kb, c, b);
          return x(c, b)
        });
        E.prototype.session_key = J(function () {
          var b = H(a._olm_outbound_group_session_key_length)(this.Kb),
            c = L(b + 1);
          H(a._olm_outbound_group_session_key)(this.Kb, c, b);
          var d = x(c, b);
          M(c, b);
          return d
        });
        E.prototype.message_index = function () {
          return H(a._olm_outbound_group_session_message_index)(this.Kb)
        };
        olm_exports.OutboundGroupSession = E;

        function O() {
          var b = a._olm_inbound_group_session_size();
          this.Lb = F(b);
          this.Kb = a._olm_inbound_group_session(this.Lb)
        }

        function P(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_inbound_group_session_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        O.prototype.free = function () {
          a._olm_clear_inbound_group_session(this.Kb);
          I(this.Kb)
        };
        O.prototype.pickle = J(function (b) {
          b = K(b);
          var c = P(a._olm_pickle_inbound_group_session_length)(this.Kb),
            d = L(b),
            e = L(c + 1);
          try {
            P(a._olm_pickle_inbound_group_session)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        O.prototype.unpickle = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c);
          try {
            P(a._olm_unpickle_inbound_group_session)(this.Kb, d, b.length, e, c.length)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
        });
        O.prototype.create = J(function (b) {
          b = K(b);
          var c = L(b);
          try {
            P(a._olm_init_inbound_group_session)(this.Kb, c, b.length)
          } finally {
            for (M(c, b.length), c = 0; c < b.length; c++) b[c] = 0
          }
        });
        O.prototype.import_session = J(function (b) {
          b = K(b);
          var c = L(b);
          try {
            P(a._olm_import_inbound_group_session)(this.Kb, c, b.length)
          } finally {
            for (M(c, b.length), c = 0; c < b.length; c++) b[c] = 0
          }
        });
        O.prototype.decrypt = J(function (b) {
          try {
            var c = F(b.length);
            Da(b, c);
            var d = P(a._olm_group_decrypt_max_plaintext_length)(this.Kb, c, b.length);
            Da(b, c);
            var e = F(d + 1);
            var f = L(4);
            var k = P(a._olm_group_decrypt)(this.Kb, c, b.length, e, d, f);
            r(e + k);
            return {
              plaintext: x(e, k),
              message_index: ya(f, "i32")
            }
          } finally {
            void 0 !== c && I(c), void 0 !== e && (M(e, k), I(e))
          }
        });
        O.prototype.session_id = J(function () {
          var b = P(a._olm_inbound_group_session_id_length)(this.Kb),
            c = L(b + 1);
          P(a._olm_inbound_group_session_id)(this.Kb, c, b);
          return x(c, b)
        });
        O.prototype.first_known_index = J(function () {
          return P(a._olm_inbound_group_session_first_known_index)(this.Kb)
        });
        O.prototype.export_session = J(function (b) {
          var c = P(a._olm_export_inbound_group_session_length)(this.Kb),
            d = L(c + 1);
          H(a._olm_export_inbound_group_session)(this.Kb, d, c, b);
          b = x(d, c);
          M(d, c);
          return b
        });
        olm_exports.InboundGroupSession = O;

        function bb() {
          var b = a._olm_pk_encryption_size();
          this.Lb = F(b);
          this.Kb = a._olm_pk_encryption(this.Lb)
        }

        function Q(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_pk_encryption_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        bb.prototype.free = function () {
          a._olm_clear_pk_encryption(this.Kb);
          I(this.Kb)
        };
        bb.prototype.set_recipient_key = J(function (b) {
          b = K(b);
          var c = L(b);
          Q(a._olm_pk_encryption_set_recipient_key)(this.Kb, c, b.length)
        });
        bb.prototype.encrypt = J(function (b) {
          try {
            var c = A(b);
            var d = F(c + 1);
            z(b, y, d, c + 1);
            var e = Q(a._olm_pk_encrypt_random_length)();
            var f = N(e, g);
            var k = Q(a._olm_pk_ciphertext_length)(this.Kb, c);
            var p = F(k + 1);
            var v = Q(a._olm_pk_mac_length)(this.Kb),
              ha = L(v + 1);
            r(ha + v);
            var V = Q(a._olm_pk_key_length)(),
              G = L(V + 1);
            r(G + V);
            Q(a._olm_pk_encrypt)(this.Kb, d, c, p, k, ha, v, G, V, f, e);
            r(p + k);
            return {
              ciphertext: x(p, k),
              mac: x(ha, v),
              ephemeral: x(G, V)
            }
          } finally {
            void 0 !== f && M(f, e), void 0 !== d && (M(d, c + 1), I(d)), void 0 !== p && I(p)
          }
        });

        function R() {
          var b = a._olm_pk_decryption_size();
          this.Lb = F(b);
          this.Kb = a._olm_pk_decryption(this.Lb)
        }

        function S(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_pk_decryption_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        R.prototype.free = function () {
          a._olm_clear_pk_decryption(this.Kb);
          I(this.Kb)
        };
        R.prototype.init_with_private_key = J(function (b) {
          var c = L(b.length);
          a.HEAPU8.set(b, c);
          var d = S(a._olm_pk_key_length)(),
            e = L(d + 1);
          try {
            S(a._olm_pk_key_from_private)(this.Kb, e, d, c, b.length)
          } finally {
            M(c, b.length)
          }
          return x(e, d)
        });
        R.prototype.generate_key = J(function () {
          var b = S(a._olm_pk_private_key_length)(),
            c = N(b, g),
            d = S(a._olm_pk_key_length)(),
            e = L(d + 1);
          try {
            S(a._olm_pk_key_from_private)(this.Kb, e, d, c, b)
          } finally {
            M(c, b)
          }
          return x(e, d)
        });
        R.prototype.get_private_key = J(function () {
          var b = Q(a._olm_pk_private_key_length)(),
            c = L(b);
          S(a._olm_pk_get_private_key)(this.Kb, c, b);
          var d = new Uint8Array(new Uint8Array(a.HEAPU8.buffer, c, b));
          M(c, b);
          return d
        });
        R.prototype.pickle = J(function (b) {
          b = K(b);
          var c = S(a._olm_pickle_pk_decryption_length)(this.Kb),
            d = L(b),
            e = L(c + 1);
          try {
            S(a._olm_pickle_pk_decryption)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        R.prototype.unpickle = J(function (b, c) {
          b = K(b);
          var d = L(b),
            e = K(c),
            f = L(e);
          c = S(a._olm_pk_key_length)();
          var k = L(c + 1);
          try {
            S(a._olm_unpickle_pk_decryption)(this.Kb, d, b.length, f, e.length, k, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(k, c)
        });
        R.prototype.decrypt = J(function (b, c, d) {
          try {
            var e = A(d);
            var f = F(e + 1);
            z(d, y, f, e + 1);
            var k = K(b),
              p = L(k),
              v = K(c),
              ha = L(v);
            var V = S(a._olm_pk_max_plaintext_length)(this.Kb, e);
            var G = F(V + 1);
            var Fa = S(a._olm_pk_decrypt)(this.Kb, p, k.length, ha, v.length, f, e, G, V);
            r(G + Fa);
            return x(G, Fa)
          } finally {
            void 0 !== G && (M(G, Fa + 1), I(G)), void 0 !== f && I(f)
          }
        });

        function cb() {
          var b = a._olm_pk_signing_size();
          this.Lb = F(b);
          this.Kb = a._olm_pk_signing(this.Lb)
        }

        function db(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_pk_signing_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        cb.prototype.free = function () {
          a._olm_clear_pk_signing(this.Kb);
          I(this.Kb)
        };
        cb.prototype.init_with_seed = J(function (b) {
          var c = L(b.length);
          a.HEAPU8.set(b, c);
          var d = db(a._olm_pk_signing_public_key_length)(),
            e = L(d + 1);
          try {
            db(a._olm_pk_signing_key_from_seed)(this.Kb, e, d, c, b.length)
          } finally {
            M(c, b.length)
          }
          return x(e, d)
        });
        cb.prototype.generate_seed = J(function () {
          var b = db(a._olm_pk_signing_seed_length)(),
            c = N(b, g),
            d = new Uint8Array(new Uint8Array(a.HEAPU8.buffer, c, b));
          M(c, b);
          return d
        });
        cb.prototype.sign = J(function (b) {
          try {
            var c = A(b);
            var d = F(c + 1);
            z(b, y, d, c + 1);
            var e = db(a._olm_pk_signature_length)(),
              f = L(e + 1);
            db(a._olm_pk_sign)(this.Kb, d, c, f, e);
            return x(f, e)
          } finally {
            void 0 !== d && (M(d, c + 1), I(d))
          }
        });

        function T() {
          var b = a._olm_sas_size(),
            c = a._olm_create_sas_random_length(),
            d = N(c, g);
          this.Lb = F(b);
          this.Kb = a._olm_sas(this.Lb);
          a._olm_create_sas(this.Kb, d, c);
          M(d, c)
        }

        function U(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_sas_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        T.prototype.free = function () {
          a._olm_clear_sas(this.Kb);
          I(this.Kb)
        };
        T.prototype.get_pubkey = J(function () {
          var b = U(a._olm_sas_pubkey_length)(this.Kb),
            c = L(b + 1);
          U(a._olm_sas_get_pubkey)(this.Kb, c, b);
          return x(c, b)
        });
        T.prototype.set_their_key = J(function (b) {
          b = K(b);
          var c = L(b);
          U(a._olm_sas_set_their_key)(this.Kb, c, b.length)
        });
        T.prototype.is_their_key_set = J(function () {
          return U(a._olm_sas_is_their_key_set)(this.Kb) ? !0 : !1
        });
        T.prototype.generate_bytes = J(function (b, c) {
          b = K(b);
          var d = L(b),
            e = L(c);
          U(a._olm_sas_generate_bytes)(this.Kb, d, b.length, e, c);
          return new Uint8Array(new Uint8Array(a.HEAPU8.buffer, e, c))
        });
        T.prototype.calculate_mac = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c),
            f = U(a._olm_sas_mac_length)(this.Kb),
            k = L(f + 1);
          U(a._olm_sas_calculate_mac)(this.Kb, d, b.length, e, c.length, k, f);
          return x(k, f)
        });
        T.prototype.calculate_mac_long_kdf = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c),
            f = U(a._olm_sas_mac_length)(this.Kb),
            k = L(f + 1);
          U(a._olm_sas_calculate_mac_long_kdf)(this.Kb, d, b.length, e, c.length, k, f);
          return x(k, f)
        });
        var F = a._malloc,
          I = a._free,
          h;

        function N(b, c) {
          var d = Ya(b);
          c(new Uint8Array(a.HEAPU8.buffer, d, b));
          return d
        }

        function L(b) {
          return "number" == typeof b ? N(b, function (c) {
            c.fill(0)
          }) : N(b.length, function (c) {
            c.set(b)
          })
        }

        function K(b) {
          if (b instanceof Uint8Array) var c = b;
          else c = Array(A(b) + 1), b = z(b, c, 0, c.length), c.length = b;
          return c
        }

        function J(b) {
          return function () {
            var c = Wa();
            try {
              return b.apply(this, arguments)
            } finally {
              Xa(c)
            }
          }
        }

        function M(b, c) {
          for (; 0 < c--;) a.HEAP8[b++] = 0
        }

        function W() {
          var b = a._olm_account_size();
          this.Lb = F(b);
          this.Kb = a._olm_account(this.Lb)
        }

        function X(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_account_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        W.prototype.free = function () {
          a._olm_clear_account(this.Kb);
          I(this.Kb)
        };
        W.prototype.create = J(function () {
          var b = X(a._olm_create_account_random_length)(this.Kb),
            c = N(b, g);
          X(a._olm_create_account)(this.Kb, c, b)
        });
        W.prototype.identity_keys = J(function () {
          var b = X(a._olm_account_identity_keys_length)(this.Kb),
            c = L(b + 1);
          X(a._olm_account_identity_keys)(this.Kb, c, b);
          return x(c, b)
        });
        W.prototype.sign = J(function (b) {
          var c = X(a._olm_account_signature_length)(this.Kb);
          b = K(b);
          var d = L(b),
            e = L(c + 1);
          try {
            X(a._olm_account_sign)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        W.prototype.one_time_keys = J(function () {
          var b = X(a._olm_account_one_time_keys_length)(this.Kb),
            c = L(b + 1);
          X(a._olm_account_one_time_keys)(this.Kb, c, b);
          return x(c, b)
        });
        W.prototype.mark_keys_as_published = J(function () {
          X(a._olm_account_mark_keys_as_published)(this.Kb)
        });
        W.prototype.max_number_of_one_time_keys = J(function () {
          return X(a._olm_account_max_number_of_one_time_keys)(this.Kb)
        });
        W.prototype.generate_one_time_keys = J(function (b) {
          var c = X(a._olm_account_generate_one_time_keys_random_length)(this.Kb, b),
            d = N(c, g);
          X(a._olm_account_generate_one_time_keys)(this.Kb, b, d, c)
        });
        W.prototype.remove_one_time_keys = J(function (b) {
          X(a._olm_remove_one_time_keys)(this.Kb, b.Kb)
        });
        W.prototype.generate_fallback_key = J(function () {
          var b = X(a._olm_account_generate_fallback_key_random_length)(this.Kb),
            c = N(b, g);
          X(a._olm_account_generate_fallback_key)(this.Kb, c, b)
        });
        W.prototype.fallback_key = J(function () {
          var b = X(a._olm_account_fallback_key_length)(this.Kb),
            c = L(b + 1);
          X(a._olm_account_fallback_key)(this.Kb, c, b);
          return x(c, b)
        });
        W.prototype.pickle = J(function (b) {
          b = K(b);
          var c = X(a._olm_pickle_account_length)(this.Kb),
            d = L(b),
            e = L(c + 1);
          try {
            X(a._olm_pickle_account)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        W.prototype.unpickle = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c);
          try {
            X(a._olm_unpickle_account)(this.Kb, d, b.length, e, c.length)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
        });

        function Y() {
          var b = a._olm_session_size();
          this.Lb = F(b);
          this.Kb = a._olm_session(this.Lb)
        }

        function Z(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_session_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        Y.prototype.free = function () {
          a._olm_clear_session(this.Kb);
          I(this.Kb)
        };
        Y.prototype.pickle = J(function (b) {
          b = K(b);
          var c = Z(a._olm_pickle_session_length)(this.Kb),
            d = L(b),
            e = L(c + 1);
          try {
            Z(a._olm_pickle_session)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        Y.prototype.unpickle = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c);
          try {
            Z(a._olm_unpickle_session)(this.Kb, d, b.length, e, c.length)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
        });
        Y.prototype.create_outbound = J(function (b, c, d) {
          var e = Z(a._olm_create_outbound_session_random_length)(this.Kb),
            f = N(e, g);
          c = K(c);
          d = K(d);
          var k = L(c),
            p = L(d);
          try {
            Z(a._olm_create_outbound_session)(this.Kb, b.Kb, k, c.length, p, d.length, f, e)
          } finally {
            M(f, e)
          }
        });
        Y.prototype.create_inbound = J(function (b, c) {
          c = K(c);
          var d = L(c);
          try {
            Z(a._olm_create_inbound_session)(this.Kb, b.Kb, d, c.length)
          } finally {
            for (M(d, c.length), b = 0; b < c.length; b++) c[b] = 0
          }
        });
        Y.prototype.create_inbound_from = J(function (b, c, d) {
          c = K(c);
          var e = L(c);
          d = K(d);
          var f = L(d);
          try {
            Z(a._olm_create_inbound_session_from)(this.Kb, b.Kb, e, c.length, f, d.length)
          } finally {
            for (M(f, d.length), b = 0; b < d.length; b++) d[b] = 0
          }
        });
        Y.prototype.session_id = J(function () {
          var b = Z(a._olm_session_id_length)(this.Kb),
            c = L(b + 1);
          Z(a._olm_session_id)(this.Kb, c, b);
          return x(c, b)
        });
        Y.prototype.has_received_message = function () {
          return Z(a._olm_session_has_received_message)(this.Kb) ? !0 : !1
        };
        Y.prototype.matches_inbound = J(function (b) {
          b = K(b);
          var c = L(b);
          return Z(a._olm_matches_inbound_session)(this.Kb, c, b.length) ? !0 : !1
        });
        Y.prototype.matches_inbound_from = J(function (b, c) {
          b = K(b);
          var d = L(b);
          c = K(c);
          var e = L(c);
          return Z(a._olm_matches_inbound_session_from)(this.Kb, d, b.length, e, c.length) ? !0 : !1
        });
        Y.prototype.encrypt = J(function (b) {
          try {
            var c = Z(a._olm_encrypt_random_length)(this.Kb);
            var d = Z(a._olm_encrypt_message_type)(this.Kb);
            var e = A(b);
            var f = Z(a._olm_encrypt_message_length)(this.Kb, e);
            var k = N(c, g);
            var p = F(e + 1);
            z(b, y, p, e + 1);
            var v = F(f + 1);
            Z(a._olm_encrypt)(this.Kb, p, e, k, c, v, f);
            r(v + f);
            return {
              type: d,
              body: x(v, f)
            }
          } finally {
            void 0 !== k && M(k, c), void 0 !== p && (M(p, e + 1), I(p)), void 0 !== v && I(v)
          }
        });
        Y.prototype.decrypt = J(function (b, c) {
          try {
            var d = F(c.length);
            Da(c, d);
            var e = Z(a._olm_decrypt_max_plaintext_length)(this.Kb, b, d, c.length);
            Da(c, d);
            var f = F(e + 1);
            var k = Z(a._olm_decrypt)(this.Kb, b, d, c.length, f, e);
            r(f + k);
            return x(f, k)
          } finally {
            void 0 !== d && I(d), void 0 !== f && (M(f, e), I(f))
          }
        });
        Y.prototype.describe = J(function () {
          try {
            var b = F(256);
            Z(a._olm_session_describe)(this.Kb, b, 256);
            return x(b)
          } finally {
            void 0 !== b && I(b)
          }
        });

        function eb() {
          var b = a._olm_utility_size();
          this.Lb = F(b);
          this.Kb = a._olm_utility(this.Lb)
        }

        function fb(b) {
          return function () {
            var c = b.apply(this, arguments);
            if (c === h) throw c = x(a._olm_utility_last_error(arguments[0])), Error("OLM." + c);
            return c
          }
        }
        eb.prototype.free = function () {
          a._olm_clear_utility(this.Kb);
          I(this.Kb)
        };
        eb.prototype.sha256 = J(function (b) {
          var c = fb(a._olm_sha256_length)(this.Kb);
          b = K(b);
          var d = L(b),
            e = L(c + 1);
          try {
            fb(a._olm_sha256)(this.Kb, d, b.length, e, c)
          } finally {
            for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0
          }
          return x(e, c)
        });
        eb.prototype.ed25519_verify = J(function (b, c, d) {
          b = K(b);
          var e = L(b);
          c = K(c);
          var f = L(c);
          d = K(d);
          var k = L(d);
          try {
            fb(a._olm_ed25519_verify)(this.Kb, e, b.length, f, c.length, k, d.length)
          } finally {
            for (M(f, c.length), b = 0; b < c.length; b++) c[b] = 0
          }
        });
        olm_exports.Account = W;
        olm_exports.Session = Y;
        olm_exports.Utility = eb;
        olm_exports.PkEncryption = bb;
        olm_exports.PkDecryption = R;
        olm_exports.PkSigning = cb;
        olm_exports.SAS = T;
        olm_exports.get_library_version = J(function () {
          var b = L(3);
          a._olm_get_library_version(b, b + 1, b + 2);
          return [ya(b, "i8"), ya(b + 1, "i8"), ya(b + 2, "i8")]
        });


        return Module.ready
      }
    );
  })();
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = Module;
  else if (typeof define === 'function' && define['amd'])
    define([], function () {
      return Module;
    });
  else if (typeof exports === 'object')
    exports["Module"] = Module;
  var olmInitPromise;

  olm_exports['init'] = function (opts) {
    if (olmInitPromise) return olmInitPromise;

    if (opts) OLM_OPTIONS = opts;

    olmInitPromise = new Promise(function (resolve, reject) {
      onInitSuccess = function () {
        resolve();
      };
      onInitFail = function (err) {
        reject(err);
      };
      Module();
    });
    return olmInitPromise;
  };

  return olm_exports;

})();

if (typeof (window) !== 'undefined') {
  // We've been imported directly into a browser. Define the global 'Olm' object.
  // (we do this even if module.exports was defined, because it's useful to have
  // Olm in the global scope for browserified and webpacked apps.)
  window["Olm"] = Olm;
}

if (typeof module === 'object') {
  // Emscripten sets the module exports to be its module
  // with wrapped c functions. Clobber it with our higher
  // level wrapper class.
  module.exports = Olm;
}