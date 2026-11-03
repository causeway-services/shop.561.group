var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/typeEncoderMap.js
var TypeEncoderMap, init_typeEncoderMap = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/typeEncoderMap.js"() {
    TypeEncoderMap = class {
      #types = /* @__PURE__ */ new Map();
      /**
       * Register an encoder for a given type.
       *
       * @param typ The class to encode.  This is the function for the constructor
       *   of objects of this type.  For example, Uint8Array the value of the
       *   constructor property of a Uint8Array instance.
       * @param encoder The function to use for encoding this type.
       * @returns Previous registration, or undefined if none.
       */
      registerEncoder(typ, encoder2) {
        let old = this.#types.get(typ);
        return this.#types.set(typ, encoder2), old;
      }
      /**
       * Get the encoder for a given class.
       *
       * @param typ Constructor function.
       * @returns Encoder, or undefined if none specified.
       */
      get(typ) {
        return this.#types.get(typ);
      }
      /**
       * Delete the encoder for a given class.
       *
       * @param typ Constructor function.
       * @returns True if class found and deleted, otherwise false.
       */
      delete(typ) {
        return this.#types.delete(typ);
      }
      /**
       * Remove all classes from the map.
       */
      clear() {
        this.#types.clear();
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/constants.js
var MT, TAG, NUMBYTES, SIMPLE, SYMS, DCBOR_INT, init_constants = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/constants.js"() {
    MT = {
      POS_INT: 0,
      NEG_INT: 1,
      BYTE_STRING: 2,
      UTF8_STRING: 3,
      ARRAY: 4,
      MAP: 5,
      TAG: 6,
      SIMPLE_FLOAT: 7
    }, TAG = {
      DATE_STRING: 0,
      DATE_EPOCH: 1,
      POS_BIGINT: 2,
      NEG_BIGINT: 3,
      DECIMAL_FRAC: 4,
      BIGFLOAT: 5,
      BASE64URL_EXPECTED: 21,
      BASE64_EXPECTED: 22,
      BASE16_EXPECTED: 23,
      CBOR: 24,
      URI: 32,
      BASE64URL: 33,
      BASE64: 34,
      MIME: 36,
      DATE_EPOCH_DAYS: 100,
      // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
      SET: 258,
      JSON: 262,
      WTF8: 273,
      // https://github.com/mishoo/cbor.lisp/blob/e1428a5/clext-spec.txt
      SYMBOL: 280,
      DATE_FULL: 1004,
      REGEXP: 21066,
      SELF_DESCRIBED: 55799,
      // Always invalid: https://www.ietf.org/archive/id/draft-bormann-cbor-notable-tags-10.html#name-invalid-tag
      INVALID_16: 65535,
      INVALID_32: 4294967295,
      INVALID_64: 0xffffffffffffffffn
    }, NUMBYTES = {
      ZERO: 0,
      ONE: 24,
      TWO: 25,
      FOUR: 26,
      EIGHT: 27,
      INDEFINITE: 31
    }, SIMPLE = {
      FALSE: 20,
      TRUE: 21,
      NULL: 22,
      UNDEFINED: 23
    }, SYMS = class {
      /**
       * A 0xFF byte as been found in the stream.  Used as a sentinal.
       */
      static BREAK = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/break");
      /**
       * Original CBOR encoding for round-tripping and crypto.
       */
      static ENCODED = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/cbor-encoded");
      /**
       * Pre-encoded version of length for arrays and maps.  Must include the
       * major type.
       */
      static LENGTH = /* @__PURE__ */ Symbol.for("github.com/hildjj/cbor2/length");
    }, DCBOR_INT = {
      MIN: -(2n ** 63n),
      MAX: 2n ** 64n - 1n
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/sorts.js
function sortCoreDeterministic(a, b) {
  let [_ka, _va, a8] = a, [_kb, _vb, b8] = b, len = Math.min(a8.length, b8.length);
  for (let i = 0; i < len; i++) {
    let diff = a8[i] - b8[i];
    if (diff !== 0)
      return diff;
  }
  return 0;
}
var init_sorts = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/sorts.js"() {
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/writer.js
var Writer, init_writer = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/writer.js"() {
    Writer = class _Writer {
      static defaultOptions = {
        chunkSize: 4096
      };
      #opts;
      #chunks = [];
      #dv = null;
      // View over last chunk.
      #offset = 0;
      #length = 0;
      constructor(opts = {}) {
        if (this.#opts = {
          ..._Writer.defaultOptions,
          ...opts
        }, this.#opts.chunkSize < 8)
          throw new RangeError(`Expected size >= 8, got ${this.#opts.chunkSize}`);
        this.#alloc();
      }
      get length() {
        return this.#length;
      }
      read() {
        this.#trim();
        let ret = new Uint8Array(this.#length), len = 0;
        for (let u8 of this.#chunks)
          ret.set(u8, len), len += u8.length;
        return this.#alloc(), ret;
      }
      write(buf) {
        let len = buf.length;
        len > this.#left() ? (this.#trim(), len > this.#opts.chunkSize ? (this.#chunks.push(buf), this.#alloc()) : (this.#alloc(), this.#chunks[this.#chunks.length - 1].set(buf), this.#offset = len)) : (this.#chunks[this.#chunks.length - 1].set(buf, this.#offset), this.#offset += len), this.#length += len;
      }
      writeUint8(n) {
        this.#makeSpace(1), this.#dv.setUint8(this.#offset, n), this.#advance(1);
      }
      writeUint16(n, littleEndian = !1) {
        this.#makeSpace(2), this.#dv.setUint16(this.#offset, n, littleEndian), this.#advance(2);
      }
      writeUint32(n, littleEndian = !1) {
        this.#makeSpace(4), this.#dv.setUint32(this.#offset, n, littleEndian), this.#advance(4);
      }
      writeBigUint64(n, littleEndian = !1) {
        this.#makeSpace(8), this.#dv.setBigUint64(this.#offset, n, littleEndian), this.#advance(8);
      }
      writeInt16(n, littleEndian = !1) {
        this.#makeSpace(2), this.#dv.setInt16(this.#offset, n, littleEndian), this.#advance(2);
      }
      writeInt32(n, littleEndian = !1) {
        this.#makeSpace(4), this.#dv.setInt32(this.#offset, n, littleEndian), this.#advance(4);
      }
      writeBigInt64(n, littleEndian = !1) {
        this.#makeSpace(8), this.#dv.setBigInt64(this.#offset, n, littleEndian), this.#advance(8);
      }
      writeFloat32(n, littleEndian = !1) {
        this.#makeSpace(4), this.#dv.setFloat32(this.#offset, n, littleEndian), this.#advance(4);
      }
      writeFloat64(n, littleEndian = !1) {
        this.#makeSpace(8), this.#dv.setFloat64(this.#offset, n, littleEndian), this.#advance(8);
      }
      clear() {
        this.#length = 0, this.#chunks = [], this.#alloc();
      }
      #alloc() {
        let buf = new Uint8Array(this.#opts.chunkSize);
        this.#chunks.push(buf), this.#offset = 0, this.#dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      }
      // Always push a new chunk right after trimming.
      #trim() {
        if (this.#offset === 0) {
          this.#chunks.pop();
          return;
        }
        let last = this.#chunks.length - 1;
        this.#chunks[last] = this.#chunks[last].subarray(0, this.#offset), this.#offset = 0, this.#dv = null;
      }
      #left() {
        let last = this.#chunks.length - 1;
        return this.#chunks[last].length - this.#offset;
      }
      #makeSpace(sz) {
        this.#left() < sz && (this.#trim(), this.#alloc());
      }
      #advance(sz) {
        this.#offset += sz, this.#length += sz;
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/tag.js
var Tag, init_tag = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/tag.js"() {
    Tag = class _Tag {
      static #tags = /* @__PURE__ */ new Map();
      tag;
      contents;
      /**
       * A tag wrapped around another value.
       *
       * @param tag The tag number.
       * @param contents The value that follows the tag number.
       */
      constructor(tag, contents = void 0) {
        this.tag = tag, this.contents = contents;
      }
      /**
       * When constructing the commented version of this tag, should the contents
       * be written as well?  If true, the comment function should output the
       * contents values itself (only used for tag 24 so far).
       *
       * @type {boolean}
       * @readonly
       */
      get noChildren() {
        return !!_Tag.#tags.get(this.tag)?.noChildren;
      }
      /**
       * Register a decoder for a give tag number.
       *
       * @param tag The tag number.
       * @param decoder Decoder function.
       * @param description If provided, use this when commenting to add a type
       *   name in parens after the tag number.
       * @returns Old decoder for this tag, if there was one.
       */
      static registerDecoder(tag, decoder, description) {
        let old = this.#tags.get(tag);
        return this.#tags.set(tag, decoder), old && ("comment" in decoder || (decoder.comment = old.comment), "noChildren" in decoder || (decoder.noChildren = old.noChildren)), description && !decoder.comment && (decoder.comment = () => `(${description})`), old;
      }
      /**
       * Remove the encoder for this tag number.
       *
       * @param tag Tag number.
       * @returns Old decoder, if there was one.
       */
      static clearDecoder(tag) {
        let old = this.#tags.get(tag);
        return this.#tags.delete(tag), old;
      }
      /**
       * Get the decoder for a given tag number.
       *
       * @param tag The tag number.
       * @returns The decoder function, if there is one.
       */
      static getDecoder(tag) {
        return this.#tags.get(tag);
      }
      /**
       * Get all registered decoders clone of the map.
       *
       * @returns Map containing current decoders, as a copy.
       */
      static getAllDecoders() {
        return new Map(this.#tags);
      }
      /**
       * Iterate over just the contents, so that the tag works more like an
       * array.
       *
       * @yields One time, the contained value.
       */
      *[Symbol.iterator]() {
        yield this.contents;
      }
      /**
       * Makes Tag act like an array, so that no special casing is needed when
       * the tag's contents are available.
       *
       * @param contents The value associated with the tag.
       * @returns Always returns 1.
       */
      push(contents) {
        return this.contents = contents, 1;
      }
      /**
       * Convert this tagged value to a useful data type, if possible.
       *
       * @param options Options for decoding.
       * @returns The converted value.
       */
      decode(options) {
        let decoder = options?.tags?.get(this.tag) ?? (options?.ignoreGlobalTags ? void 0 : _Tag.#tags.get(this.tag));
        return decoder ? decoder(this, options) : this;
      }
      comment(options, depth) {
        let decoder = options?.tags?.get(this.tag) ?? (options?.ignoreGlobalTags ? void 0 : _Tag.#tags.get(this.tag));
        if (decoder?.comment)
          return decoder.comment(this, options, depth);
      }
      toCBOR() {
        return [this.tag, this.contents];
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](_depth, inspectOptions, inspect) {
        return `${this.tag}(${inspect(this.contents, inspectOptions)})`;
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/box.js
function getEncoded(obj) {
  if (obj != null && typeof obj == "object")
    return obj[SYMS.ENCODED];
}
function getEncodedLength(obj) {
  if (obj != null && typeof obj == "object")
    return obj[SYMS.LENGTH];
}
function saveEncoded(obj, orig) {
  Object.defineProperty(obj, SYMS.ENCODED, {
    configurable: !0,
    enumerable: !1,
    value: orig
  });
}
function box(value, orig) {
  let o = Object(value);
  return saveEncoded(o, orig), o;
}
var init_box = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/box.js"() {
    init_constants();
    init_tag();
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/float.js
function formatNAN(nan, _depth, inspectOptions, inspect) {
  let ret = "nan'";
  return nan.quiet || (ret += "!"), nan.sign === -1 && (ret += "-"), ret += inspect(Math.abs(nan.payload), inspectOptions), ret += "'", ret += nan.encodingIndicator, ret;
}
function parseHalf(buf, offset = 0, rejectSubnormals = !1) {
  let sign = buf[offset] & 128 ? -1 : 1, exp = (buf[offset] & 124) >> 2, mant = (buf[offset] & 3) << 8 | buf[offset + 1];
  if (exp === 0) {
    if (rejectSubnormals && mant !== 0)
      throw new Error(`Unwanted subnormal: ${sign * 5960464477539063e-23 * mant}`);
    return sign * 5960464477539063e-23 * mant;
  } else if (exp === 31)
    return mant ? NaN : sign * (1 / 0);
  return sign * 2 ** (exp - 25) * (1024 + mant);
}
function halfToUint(half) {
  let dvu32 = new DataView(new ArrayBuffer(4));
  dvu32.setFloat32(0, half, !1);
  let u = dvu32.getUint32(0, !1);
  if ((u & 8191) !== 0)
    return null;
  let s16 = u >> 16 & 32768, exp = u >> 23 & 255, mant = u & 8388607;
  if (!(exp === 0 && mant === 0))
    if (exp >= 113 && exp <= 142)
      s16 += (exp - 112 << 10) + (mant >> 13);
    else if (exp >= 103 && exp < 113) {
      if (mant & (1 << 126 - exp) - 1)
        return null;
      s16 += mant + 8388608 >> 126 - exp;
    } else if (exp === 255)
      s16 |= 31744, s16 |= mant >> 13;
    else
      return null;
  return s16;
}
function flushToZero(n) {
  if (n !== 0) {
    let a = new ArrayBuffer(8), dv = new DataView(a);
    dv.setFloat64(0, n, !1);
    let b = dv.getBigUint64(0, !1);
    if ((b & 0x7ff0000000000000n) === 0n)
      return b & 0x8000000000000000n ? -0 : 0;
  }
  return n;
}
function checkSubnormal(buf) {
  switch (buf.length) {
    case 2:
      parseHalf(buf, 0, !0);
      break;
    case 4: {
      let dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), n = dv.getUint32(0, !1);
      if ((n & 2139095040) === 0 && n & 8388607)
        throw new Error(`Unwanted subnormal: ${dv.getFloat32(0, !1)}`);
      break;
    }
    case 8: {
      let dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), n = dv.getBigUint64(0, !1);
      if ((n & 0x7ff0000000000000n) === 0n && n & 0x000fffffffffffn)
        throw new Error(`Unwanted subnormal: ${dv.getFloat64(0, !1)}`);
      break;
    }
    default:
      throw new TypeError(`Bad input to isSubnormal: ${buf}`);
  }
}
var F16_SIGN, F16_EXPONENT, F16_QUIET, F16_PAYLOAD, F16_SIGNIFICAND, F32_SIGN, F32_EXPONENT, F32_QUIET, F32_PAYLOAD, F32_SIGNIFICAND, F64_SIGN, F64_EXPONENT, F64_QUIET, F64_PAYLOAD, F64_SIGNIFICAND, NOT_F16, NOT_F32, RADIX_PREFIX, NAN_SIZE, NAN, init_float = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/float.js"() {
    F16_SIGN = 1n << 15n, F16_EXPONENT = 31n << 10n, F16_QUIET = 1n << 9n, F16_PAYLOAD = F16_QUIET - 1n, F16_SIGNIFICAND = F16_QUIET | F16_PAYLOAD, F32_SIGN = 1n << 31n, F32_EXPONENT = 255n << 23n, F32_QUIET = 1n << 22n, F32_PAYLOAD = F32_QUIET - 1n, F32_SIGNIFICAND = F32_QUIET | F32_PAYLOAD, F64_SIGN = 1n << 63n, F64_EXPONENT = 2047n << 52n, F64_QUIET = 1n << 51n, F64_PAYLOAD = F64_QUIET - 1n, F64_SIGNIFICAND = F64_QUIET | F64_PAYLOAD, NOT_F16 = F64_PAYLOAD - (F16_PAYLOAD << 42n), NOT_F32 = F64_PAYLOAD - (F32_PAYLOAD << 29n), RADIX_PREFIX = {
      2: "0b",
      8: "0o",
      16: "0x"
    };
    (function(NAN_SIZE2) {
      NAN_SIZE2[NAN_SIZE2.NATURAL = -2] = "NATURAL", NAN_SIZE2[NAN_SIZE2.UNKNOWN = -1] = "UNKNOWN", NAN_SIZE2[NAN_SIZE2.F16 = 2] = "F16", NAN_SIZE2[NAN_SIZE2.F32 = 4] = "F32", NAN_SIZE2[NAN_SIZE2.F64 = 8] = "F64";
    })(NAN_SIZE || (NAN_SIZE = {}));
    NAN = class extends Number {
      // Full f64 as unsigned.
      #value;
      #size = NAN_SIZE.UNKNOWN;
      constructor(bytes, quiet = !0, size = NAN_SIZE.UNKNOWN) {
        super(NaN);
        let orig = bytes;
        if (typeof bytes == "number") {
          if (!Number.isSafeInteger(bytes))
            throw new Error(`Invalid NAN payload: ${bytes}`);
          bytes = BigInt(bytes);
          let s = 0n;
          if (bytes < 0 && (s = F64_SIGN, bytes = -bytes), bytes >= F64_QUIET)
            throw new Error(`Payload too large: ${orig}`);
          let q = quiet ? F64_QUIET : 0n;
          switch (this.#value = s | F64_EXPONENT | q | bytes, size) {
            case NAN_SIZE.NATURAL:
              throw new Error("NAN_SIZE.NATURAL only valid for bigint constructor");
            case NAN_SIZE.UNKNOWN:
              size = this.preferredSize;
              break;
            case NAN_SIZE.F16:
              if (this.#value & NOT_F16)
                throw new Error("Invalid size for payload");
              break;
            case NAN_SIZE.F32:
              if (this.#value & NOT_F32)
                throw new Error("Invalid size for payload");
              break;
            case NAN_SIZE.F64:
              break;
            default:
              throw new Error(`Invalid size: ${size}`);
          }
          this.#size = size;
        } else if (typeof bytes == "bigint") {
          let nat = NAN_SIZE.UNKNOWN;
          if ((bytes & F64_EXPONENT) === F64_EXPONENT)
            this.#value = bytes, nat = NAN_SIZE.F64;
          else if ((bytes & F32_EXPONENT) === F32_EXPONENT) {
            let s = (bytes & F32_SIGN) << 32n;
            this.#value = s | F64_EXPONENT | (bytes & F32_SIGNIFICAND) << 29n, nat = NAN_SIZE.F32;
          } else if ((bytes & F16_EXPONENT) === F16_EXPONENT) {
            let s = (bytes & F16_SIGN) << 48n;
            this.#value = s | F64_EXPONENT | (bytes & F16_SIGNIFICAND) << 42n, nat = NAN_SIZE.F16;
          } else
            throw new Error(`Invalid raw NaN value: ${bytes}`);
          if (size === NAN_SIZE.UNKNOWN)
            this.#size = this.preferredSize;
          else if (size === NAN_SIZE.NATURAL)
            this.#size = nat;
          else {
            if (size < nat)
              throw new Error("Invalid bigint NaN size");
            this.#size = size;
          }
        } else {
          let dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
          switch (bytes.length) {
            case 3: {
              if (bytes[0] !== 249)
                throw new Error("Invalid CBOR encoding for half float");
              let val = BigInt(dv.getUint16(1, !1));
              if ((val & F16_EXPONENT) !== F16_EXPONENT)
                throw new Error("Not a NaN");
              let s = (val & F16_SIGN) << 48n;
              this.#value = s | F64_EXPONENT | (val & F16_SIGNIFICAND) << 42n, this.#size = NAN_SIZE.F16;
              break;
            }
            case 5: {
              if (bytes[0] !== 250)
                throw new Error("Invalid CBOR encoding for single float");
              let val = BigInt(dv.getUint32(1, !1));
              if ((val & F32_EXPONENT) !== F32_EXPONENT)
                throw new Error("Not a NaN");
              let s = (val & F32_SIGN) << 32n;
              this.#value = s | F64_EXPONENT | (val & F32_SIGNIFICAND) << 29n, this.#size = NAN_SIZE.F32;
              break;
            }
            case 9: {
              if (bytes[0] !== 251)
                throw new Error("Invalid CBOR encoding for double float");
              if (this.#value = dv.getBigUint64(1, !1), (this.#value & F64_EXPONENT) !== F64_EXPONENT)
                throw new Error("Not a NaN (NaNaN)");
              this.#size = NAN_SIZE.F64;
              break;
            }
            default:
              throw new RangeError(`Invalid NAN size (should be 2, 4, or 8): ${bytes.length - 1}`);
          }
        }
        if (!this.payload && !this.quiet)
          throw new Error("Signalling NaN with zero payload");
      }
      /**
       * Get the CBOR bytes for this NaN.
       */
      get bytes() {
        let buf = new ArrayBuffer(this.#size + 1), dv = new DataView(buf);
        switch (this.#size) {
          case NAN_SIZE.F16: {
            dv.setUint8(0, 249);
            let val = (this.#value & F64_SIGN ? F16_SIGN : 0n) | F16_EXPONENT | (this.#value & F64_SIGNIFICAND) >> 42n;
            dv.setUint16(1, Number(val), !1);
            break;
          }
          case NAN_SIZE.F32: {
            dv.setUint8(0, 250);
            let val = (this.#value & F64_SIGN ? F32_SIGN : 0n) | F32_EXPONENT | (this.#value & F64_SIGNIFICAND) >> 29n;
            dv.setUint32(1, Number(val), !1);
            break;
          }
          case NAN_SIZE.F64:
            dv.setUint8(0, 251), dv.setBigUint64(1, this.#value);
            break;
        }
        return new Uint8Array(buf);
      }
      /**
       * Is the quiet bit set?
       */
      get quiet() {
        return !!(this.#value & F64_QUIET);
      }
      /**
       * If negative -1, otherwise 1.  Should never be 0, since you should use
       * a real NaN or Infinity for those.
       */
      get sign() {
        return this.#value & F64_SIGN ? -1 : 1;
      }
      /**
       * Payload, as in IEEE754-2019.
       */
      get payload() {
        return Number(this.#value & F64_PAYLOAD) * this.sign;
      }
      /**
       * Full 64-bit encoding, with sign and quiet bit intact.
       */
      get raw() {
        return this.#value;
      }
      /**
       * Encoding indicator, based on the preferred size.
       */
      get encodingIndicator() {
        switch (this.#size) {
          case NAN_SIZE.F16:
            return "_1";
          case NAN_SIZE.F32:
            return "_2";
        }
        return "_3";
      }
      /**
       * The desired encoding size (2, 4, or 8).
       */
      get size() {
        return this.#size;
      }
      /**
       * How many bytes should this NaN be encoded as in prefrerred encoding?
       */
      get preferredSize() {
        return (this.#value & NOT_F16) === 0n ? NAN_SIZE.F16 : (this.#value & NOT_F32) === 0n ? NAN_SIZE.F32 : NAN_SIZE.F64;
      }
      /**
       * Is this currrently configured for preferred encoding?
       */
      get isShortestEncoding() {
        return this.preferredSize === this.#size;
      }
      /**
       * Write to a CBOR stream.
       * @param w Writer.
       */
      toCBOR(w) {
        w.write(this.bytes);
      }
      /**
       * Convert to a string in the given radix.
       *
       * @param radix Base for output.  Valid values: 2, 8, 10, and 16.
       * @returns String in the selected radix, with the correct radix prefix if
       *   radix is not 10.
       */
      toString(radix = 10) {
        return formatNAN(this, 1, {}, (n) => (RADIX_PREFIX[radix] ?? "") + n.toString(radix));
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](depth, inspectOptions, inspect) {
        return formatNAN(this, depth, inspectOptions, inspect);
      }
    };
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/errors.js
var init_errors = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/errors.js"() {
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/const.js
var EMPTY, WTF8, init_const = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/const.js"() {
    EMPTY = new Uint8Array(0), WTF8 = "wtf-8";
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/decode.js
var init_decode = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/decode.js"() {
    init_const();
    init_errors();
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/encode.js
function utf8length(str) {
  let len = 0;
  for (let s of str) {
    let cp = s.codePointAt(0);
    cp < 128 ? len++ : cp < 2048 ? len += 2 : cp < 65536 ? len += 3 : len += 4;
  }
  return len;
}
var Wtf8Encoder, init_encode = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/encode.js"() {
    init_const();
    Wtf8Encoder = class {
      encoding = WTF8;
      encode(input) {
        if (!input)
          return EMPTY;
        let buf = new Uint8Array(utf8length(String(input)));
        return this.encodeInto(input, buf), buf;
      }
      encodeInto(source, destination) {
        let str = String(source), len = str.length, outLen = destination.length, written2 = 0, read = 0;
        for (read = 0; read < len; read++) {
          let c = str.codePointAt(read);
          if (c < 128) {
            if (written2 >= outLen)
              break;
            destination[written2++] = c;
          } else if (c < 2048) {
            if (written2 >= outLen - 1)
              break;
            destination[written2++] = 192 | c >> 6, destination[written2++] = 128 | c & 63;
          } else if (c < 65536) {
            if (written2 >= outLen - 2)
              break;
            destination[written2++] = 224 | c >> 12, destination[written2++] = 128 | c >> 6 & 63, destination[written2++] = 128 | c & 63;
          } else {
            if (written2 >= outLen - 3)
              break;
            destination[written2++] = 240 | c >> 18, destination[written2++] = 128 | c >> 12 & 63, destination[written2++] = 128 | c >> 6 & 63, destination[written2++] = 128 | c & 63, read++;
          }
        }
        return {
          read,
          written: written2
        };
      }
    };
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/decodeStream.js
var init_decodeStream = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/decodeStream.js"() {
    init_decode();
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/encodeStream.js
var init_encodeStream = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/encodeStream.js"() {
    init_const();
    init_encode();
  }
});

// node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/index.js
var init_lib = __esm({
  "node_modules/.pnpm/@cto.af+wtf8@0.0.6/node_modules/@cto.af/wtf8/lib/index.js"() {
    init_errors();
    init_decode();
    init_encode();
    init_decodeStream();
    init_encodeStream();
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/utils.js
function setRanges(u8, ranges) {
  Object.defineProperty(u8, CBOR_RANGES, {
    configurable: !1,
    enumerable: !1,
    writable: !1,
    value: ranges
  });
}
function getRanges(u8) {
  return u8[CBOR_RANGES];
}
function hasRanges(u8) {
  return getRanges(u8) !== void 0;
}
function subarrayRanges(u8, begin = 0, end = u8.length - 1) {
  let ret = u8.subarray(begin, end), ranges = getRanges(u8);
  if (ranges) {
    let rng = [];
    for (let r of ranges)
      if (r[0] >= begin && r[0] + r[1] <= end) {
        let s = [...r];
        s[0] -= begin, rng.push(s);
      }
    rng.length && setRanges(ret, rng);
  }
  return ret;
}
function hexToU8native(str) {
  return Uint8Array.fromHex(str);
}
function hexToU8fallback(str) {
  let len = Math.ceil(str.length / 2), res = new Uint8Array(len);
  len--;
  for (let end = str.length, start = end - 2; end >= 0; end = start, start -= 2, len--)
    res[len] = parseInt(str.substring(start, end), 16);
  return res;
}
function u8toHexNative(u8) {
  return u8.toHex();
}
function u8toHexFallback(u8) {
  return u8.reduce((t, v) => t + v.toString(16).padStart(2, "0"), "");
}
function u8concat(u8s) {
  let sz = u8s.reduce((t, v) => t + v.length, 0), ranged = u8s.some((v) => hasRanges(v)), ranges = [], ret = new Uint8Array(sz), len = 0;
  for (let u8 of u8s) {
    if (!(u8 instanceof Uint8Array))
      throw new TypeError(`Invalid array: ${u8}`);
    if (ret.set(u8, len), ranged) {
      let rgs = u8[CBOR_RANGES] ?? [[0, u8.length]];
      for (let r of rgs)
        r[0] += len;
      ranges.push(...rgs);
    }
    len += u8.length;
  }
  return ranged && setRanges(ret, ranges), ret;
}
function base64ToBytesNative(base64) {
  return Uint8Array.fromBase64(base64);
}
function base64ToBytesFallback(base64) {
  let binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
function stringToHex(str) {
  let res = "";
  for (let c of str) {
    let cp = c.codePointAt(0)?.toString(16).padStart(4, "0");
    res && (res += ", "), res += `U+${cp}`;
  }
  return res;
}
var CBOR_RANGES, hexToU8, u8toHex, base64ToBytes, init_utils = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/utils.js"() {
    CBOR_RANGES = /* @__PURE__ */ Symbol("CBOR_RANGES");
    hexToU8 = /* c8 ignore next */
    typeof Uint8Array.fromHex == "function" ? (
      /* c8 ignore next */
      hexToU8native
    ) : (
      /* c8 ignore next */
      hexToU8fallback
    );
    u8toHex = /* c8 ignore next */
    typeof Uint8Array.prototype.toHex == "function" ? (
      /* c8 ignore next */
      u8toHexNative
    ) : (
      /* c8 ignore next */
      u8toHexFallback
    );
    base64ToBytes = /* c8 ignore next */
    typeof Uint8Array.fromBase64 == "function" ? (
      /* c8 ignore next */
      base64ToBytesNative
    ) : (
      /* c8 ignore next */
      base64ToBytesFallback
    );
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/encoder.js
function cborAbs(value) {
  let neg = value < 0;
  return typeof value == "bigint" ? [neg ? -value - 1n : value, neg] : [neg ? -value - 1 : value, neg];
}
function writeFloat(val, w, opts) {
  if (opts.rejectFloats)
    throw new Error(`Attempt to encode an unwanted floating point number: ${val}`);
  if (isNaN(val))
    w.writeUint8(HALF), w.writeUint16(32256);
  else if (!opts.float64 && Math.fround(val) === val) {
    let half = halfToUint(val);
    half === null ? (w.writeUint8(FLOAT), w.writeFloat32(val)) : (w.writeUint8(HALF), w.writeUint16(half));
  } else
    w.writeUint8(DOUBLE), w.writeFloat64(val);
}
function writeInt(val, w, mt) {
  let [pos, neg] = cborAbs(val);
  if (neg && mt)
    throw new TypeError(`Negative size: ${val}`);
  mt ??= neg ? MT.NEG_INT : MT.POS_INT, mt <<= 5, pos < 24 ? w.writeUint8(mt | pos) : pos <= 255 ? (w.writeUint8(mt | NUMBYTES.ONE), w.writeUint8(pos)) : pos <= 65535 ? (w.writeUint8(mt | NUMBYTES.TWO), w.writeUint16(pos)) : pos <= 4294967295 ? (w.writeUint8(mt | NUMBYTES.FOUR), w.writeUint32(pos)) : (w.writeUint8(mt | NUMBYTES.EIGHT), w.writeBigUint64(BigInt(pos)));
}
function writeTag(tag, w, opts) {
  typeof tag == "number" ? writeInt(tag, w, MT.TAG) : typeof tag == "object" && !opts.ignoreOriginalEncoding && SYMS.ENCODED in tag ? w.write(tag[SYMS.ENCODED]) : tag <= Number.MAX_SAFE_INTEGER ? writeInt(Number(tag), w, MT.TAG) : (w.writeUint8(MT.TAG << 5 | NUMBYTES.EIGHT), w.writeBigUint64(BigInt(tag)));
}
function writeBigInt(val, w, opts) {
  let [pos, neg] = cborAbs(val);
  if (opts.collapseBigInts && (!opts.largeNegativeAsBigInt || val >= -0x8000000000000000n)) {
    if (pos <= 0xffffffffn) {
      writeInt(Number(val), w);
      return;
    }
    if (pos <= 0xffffffffffffffffn) {
      let mt = (neg ? MT.NEG_INT : MT.POS_INT) << 5;
      w.writeUint8(mt | NUMBYTES.EIGHT), w.writeBigUint64(pos);
      return;
    }
  }
  if (opts.rejectBigInts)
    throw new Error(`Attempt to encode unwanted bigint: ${val}`);
  let tag = neg ? TAG.NEG_BIGINT : TAG.POS_BIGINT, s = pos.toString(16), z = s.length % 2 ? "0" : "";
  writeTag(tag, w, opts);
  let buf = hexToU8(z + s);
  writeInt(buf.length, w, MT.BYTE_STRING), w.write(buf);
}
function writeNumber(val, w, opts) {
  opts.flushToZero && (val = flushToZero(val)), Object.is(val, -0) ? opts.simplifyNegativeZero ? opts.avoidInts ? writeFloat(0, w, opts) : writeInt(0, w) : writeFloat(val, w, opts) : !opts.avoidInts && Number.isSafeInteger(val) ? writeInt(val, w) : opts.reduceUnsafeNumbers && Math.floor(val) === val && val >= DCBOR_INT.MIN && val <= DCBOR_INT.MAX ? writeBigInt(BigInt(val), w, opts) : writeFloat(val, w, opts);
}
function writeString(val, w, opts) {
  let s = opts.stringNormalization ? val.normalize(opts.stringNormalization) : val;
  if (opts.wtf8 && !val.isWellFormed()) {
    let wtf8 = WE.encode(s);
    writeTag(TAG.WTF8, w, opts), writeInt(wtf8.length, w, MT.BYTE_STRING), w.write(wtf8);
  } else {
    let utf8 = TE.encode(s);
    writeInt(utf8.length, w, MT.UTF8_STRING), w.write(utf8);
  }
}
function writeArray(obj, w, opts) {
  let a = obj;
  writeLength(a, a.length, MT.ARRAY, w, opts);
  for (let i of a)
    writeUnknown(i, w, opts);
}
function writeUint8Array(u, w) {
  writeInt(u.length, w, MT.BYTE_STRING), w.write(u);
}
function writeLength(obj, len, mt, w, opts) {
  let enc = getEncodedLength(obj);
  enc && !opts.ignoreOriginalEncoding ? w.write(enc) : writeInt(len, w, mt);
}
function writeObject(obj, w, opts) {
  if (obj === null) {
    w.writeUint8(NULL);
    return;
  }
  if (!opts.ignoreOriginalEncoding && SYMS.ENCODED in obj) {
    w.write(obj[SYMS.ENCODED]);
    return;
  }
  let constructor = obj.constructor;
  if (constructor) {
    let encoder2 = opts.types?.get(constructor) ?? (opts.ignoreGlobalTags ? void 0 : TYPES.get(constructor));
    if (encoder2) {
      let res = encoder2(obj, w, opts);
      if (res !== void 0) {
        if (!Array.isArray(res) || res.length !== 2)
          throw new Error("Invalid encoder return value");
        (typeof res[0] == "bigint" || isFinite(Number(res[0]))) && writeTag(res[0], w, opts), writeUnknown(res[1], w, opts);
      }
      return;
    }
  }
  if (typeof obj.toCBOR == "function") {
    let res = obj.toCBOR(w, opts);
    res && ((typeof res[0] == "bigint" || isFinite(Number(res[0]))) && writeTag(res[0], w, opts), writeUnknown(res[1], w, opts));
    return;
  }
  if (typeof obj.toJSON == "function") {
    writeUnknown(obj.toJSON(), w, opts);
    return;
  }
  let entries = Object.entries(obj).map(
    // Circular
    (e) => [e[0], e[1], encode(e[0], opts)]
  );
  opts.sortKeys && entries.sort(opts.sortKeys), writeLength(obj, entries.length, MT.MAP, w, opts);
  for (let [_k, v, e] of entries)
    w.write(e), writeUnknown(v, w, opts);
}
function writeSymbol(sym, w, opts) {
  if (!sym.description || sym !== Symbol.for(sym.description))
    throw new TypeError(`Private or empty symbol: ${sym.toString()}`);
  writeTag(280, w, opts), writeString(sym.description, w, opts);
}
function writeUnknown(val, w, opts) {
  switch (typeof val) {
    case "number":
      writeNumber(val, w, opts);
      break;
    case "bigint":
      writeBigInt(val, w, opts);
      break;
    case "string":
      writeString(val, w, opts);
      break;
    case "boolean":
      w.writeUint8(val ? TRUE : FALSE);
      break;
    case "undefined":
      if (opts.rejectUndefined)
        throw new Error("Attempt to encode unwanted undefined.");
      w.writeUint8(UNDEFINED);
      break;
    case "object":
      writeObject(val, w, opts);
      break;
    case "symbol":
      writeSymbol(val, w, opts);
      break;
    default:
      throw new TypeError(`Unknown type: ${typeof val}, ${String(val)}`);
  }
}
function encode(val, options = {}) {
  let opts = { ...defaultEncodeOptions };
  options.dcbor ? Object.assign(opts, dcborEncodeOptions) : options.cde && Object.assign(opts, cdeEncodeOptions), Object.assign(opts, options);
  let w = new Writer(opts);
  return writeUnknown(val, w, opts), w.read();
}
var ENCODED, HALF, FLOAT, DOUBLE, TRUE, FALSE, UNDEFINED, NULL, TE, WE, defaultEncodeOptions, cdeEncodeOptions, dcborEncodeOptions, TYPES, init_encoder = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/encoder.js"() {
    init_typeEncoderMap();
    init_constants();
    init_sorts();
    init_writer();
    init_box();
    init_float();
    init_lib();
    init_utils();
    ({ ENCODED } = SYMS), HALF = MT.SIMPLE_FLOAT << 5 | NUMBYTES.TWO, FLOAT = MT.SIMPLE_FLOAT << 5 | NUMBYTES.FOUR, DOUBLE = MT.SIMPLE_FLOAT << 5 | NUMBYTES.EIGHT, TRUE = MT.SIMPLE_FLOAT << 5 | SIMPLE.TRUE, FALSE = MT.SIMPLE_FLOAT << 5 | SIMPLE.FALSE, UNDEFINED = MT.SIMPLE_FLOAT << 5 | SIMPLE.UNDEFINED, NULL = MT.SIMPLE_FLOAT << 5 | SIMPLE.NULL, TE = new TextEncoder(), WE = new Wtf8Encoder(), defaultEncodeOptions = {
      ...Writer.defaultOptions,
      avoidInts: !1,
      cde: !1,
      collapseBigInts: !0,
      dateTag: TAG.DATE_EPOCH,
      dcbor: !1,
      float64: !1,
      flushToZero: !1,
      forceEndian: null,
      ignoreOriginalEncoding: !1,
      largeNegativeAsBigInt: !1,
      reduceUnsafeNumbers: !1,
      rejectBigInts: !1,
      rejectCustomSimples: !1,
      rejectDuplicateKeys: !1,
      rejectFloats: !1,
      rejectUndefined: !1,
      simplifyNegativeZero: !1,
      sortKeys: null,
      stringNormalization: null,
      types: null,
      wtf8: !1,
      ignoreGlobalTags: !1
    }, cdeEncodeOptions = {
      cde: !0,
      ignoreOriginalEncoding: !0,
      sortKeys: sortCoreDeterministic
    }, dcborEncodeOptions = {
      ...cdeEncodeOptions,
      dcbor: !0,
      largeNegativeAsBigInt: !0,
      reduceUnsafeNumbers: !0,
      rejectCustomSimples: !0,
      rejectDuplicateKeys: !0,
      rejectUndefined: !0,
      simplifyNegativeZero: !0,
      stringNormalization: "NFC"
    };
    TYPES = new TypeEncoderMap();
    TYPES.registerEncoder(Array, writeArray);
    TYPES.registerEncoder(Uint8Array, writeUint8Array);
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/simple.js
var Simple, init_simple = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/simple.js"() {
    init_constants();
    init_encoder();
    Simple = class _Simple {
      static KnownSimple = /* @__PURE__ */ new Map([
        [SIMPLE.FALSE, !1],
        [SIMPLE.TRUE, !0],
        [SIMPLE.NULL, null],
        [SIMPLE.UNDEFINED, void 0]
      ]);
      value;
      constructor(value) {
        this.value = value;
      }
      static create(num) {
        return _Simple.KnownSimple.has(num) ? _Simple.KnownSimple.get(num) : new _Simple(num);
      }
      toCBOR(w, opts) {
        if (opts.rejectCustomSimples)
          throw new Error(`Cannot encode non-standard Simple value: ${this.value}`);
        writeInt(this.value, w, MT.SIMPLE_FLOAT);
      }
      toString() {
        return `simple(${this.value})`;
      }
      /**
       * Convert this simple value to a useful data type, if possible.
       *
       * @returns The converted value.
       */
      decode() {
        return _Simple.KnownSimple.has(this.value) ? _Simple.KnownSimple.get(this.value) : this;
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](_depth, inspectOptions, inspect) {
        return `simple(${inspect(this.value, inspectOptions)})`;
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/decodeStream.js
var TD, DecodeStream, init_decodeStream2 = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/decodeStream.js"() {
    init_constants();
    init_utils();
    init_simple();
    init_float();
    TD = new TextDecoder("utf8", { fatal: !0, ignoreBOM: !0 }), DecodeStream = class _DecodeStream {
      static defaultOptions = {
        maxDepth: 1024,
        encoding: "hex",
        requirePreferred: !1
      };
      #src;
      #view;
      #offset = 0;
      #opts;
      constructor(src, opts) {
        if (this.#opts = {
          ..._DecodeStream.defaultOptions,
          ...opts
        }, typeof src == "string")
          switch (this.#opts.encoding) {
            case "hex":
              this.#src = hexToU8(src);
              break;
            case "base64":
              this.#src = base64ToBytes(src);
              break;
            default:
              throw new TypeError(`Encoding not implemented: "${this.#opts.encoding}"`);
          }
        else
          this.#src = src;
        this.#view = new DataView(this.#src.buffer, this.#src.byteOffset, this.#src.byteLength);
      }
      /**
       * Get the chunk of this stream from the given position to the current offset.
       *
       * @param begin Position to read from.  Should be <= current offset.
       * @returns Subarray of input stream (not copy).
       */
      toHere(begin) {
        return subarrayRanges(this.#src, begin, this.#offset);
      }
      /**
       * Get the stream of events describing the CBOR item.  Yields Value tuples.
       *
       * @throws On invalid input or extra data in input.
       * @yields MtAiValue for each value in the stream.
       * @example
       * ```js
       * const s = new DecodeStream(buffer);
       * for (const [majorType, additionalInfo, value] of s) {
       *  ...
       * }
       * ```
       */
      *[Symbol.iterator]() {
        if (yield* this.#nextVal(0), this.#offset !== this.#src.length)
          throw new Error("Extra data in input");
      }
      /**
       * Get a stream of events describing all CBOR items in the input CBOR Sequence
       * consisting of multiple CBOR items. Yields Value tuples.
       *
       * Note that this includes items indicating the start of an array or map, and
       * the end of an indefinite-length item, and tag numbers separate from the tag
       * content. Does not guarantee that the input is valid.
       *
       * Will attempt to read all items in an array or map, even if indefinite.
       * Throws when there is insufficient data to do so. The same applies when
       * reading tagged items, byte strings and text strings.
       *
       * @throws On insufficient data.
       * @yields MtAiValue for each value in the sequence.
       * @example
       * ```js
       * const s = new DecodeStream(buffer);
       * for (const [majorType, additionalInfo, value] of s.seq()) {
       *  ...
       * }
       * ```
       */
      *seq() {
        for (; this.#offset < this.#src.length; )
          yield* this.#nextVal(0);
      }
      /**
       * Get the next CBOR value from the input stream.  Yields Value tuples.
       *
       * @param depth The current depth in the CBOR tree.
       * @throws Maximum depth exceeded, invalid input.
       * @yields Information about every sub-item found in the input.
       */
      *#nextVal(depth) {
        if (depth++ > this.#opts.maxDepth)
          throw new Error(`Maximum depth ${this.#opts.maxDepth} exceeded`);
        let prevOffset = this.#offset, octet = this.#view.getUint8(this.#offset++), mt = octet >> 5, ai = octet & 31, val = ai, simple = !1, len = 0;
        switch (ai) {
          case NUMBYTES.ONE:
            if (len = 1, val = this.#view.getUint8(this.#offset), mt === MT.SIMPLE_FLOAT) {
              if (val < 32)
                throw new Error(`Invalid simple encoding in extra byte: ${val}`);
              simple = !0;
            } else if (this.#opts.requirePreferred && val < 24)
              throw new Error(`Unexpectedly long integer encoding (1) for ${val}`);
            break;
          case NUMBYTES.TWO:
            if (len = 2, mt === MT.SIMPLE_FLOAT)
              val = parseHalf(this.#src, this.#offset);
            else if (val = this.#view.getUint16(this.#offset, !1), this.#opts.requirePreferred && val <= 255)
              throw new Error(`Unexpectedly long integer encoding (2) for ${val}`);
            break;
          case NUMBYTES.FOUR:
            if (len = 4, mt === MT.SIMPLE_FLOAT)
              val = this.#view.getFloat32(this.#offset, !1);
            else if (val = this.#view.getUint32(this.#offset, !1), this.#opts.requirePreferred && val <= 65535)
              throw new Error(`Unexpectedly long integer encoding (4) for ${val}`);
            break;
          case NUMBYTES.EIGHT: {
            if (len = 8, mt === MT.SIMPLE_FLOAT)
              val = this.#view.getFloat64(this.#offset, !1);
            else if (val = this.#view.getBigUint64(this.#offset, !1), val <= Number.MAX_SAFE_INTEGER && (val = Number(val)), this.#opts.requirePreferred && val <= 4294967295)
              throw new Error(`Unexpectedly long integer encoding (8) for ${val}`);
            break;
          }
          case 28:
          case 29:
          case 30:
            throw new Error(`Additional info not implemented: ${ai}`);
          case NUMBYTES.INDEFINITE:
            switch (mt) {
              case MT.POS_INT:
              case MT.NEG_INT:
              case MT.TAG:
                throw new Error(`Invalid indefinite encoding for MT ${mt}`);
              case MT.SIMPLE_FLOAT:
                yield [mt, ai, SYMS.BREAK, prevOffset, 0];
                return;
            }
            val = 1 / 0;
            break;
          default:
            simple = !0;
        }
        switch (this.#offset += len, mt) {
          case MT.POS_INT:
            yield [mt, ai, val, prevOffset, len];
            break;
          case MT.NEG_INT:
            yield [mt, ai, typeof val == "bigint" ? -1n - val : -1 - Number(val), prevOffset, len];
            break;
          case MT.BYTE_STRING:
            val === 1 / 0 ? yield* this.#stream(mt, depth, prevOffset) : yield [mt, ai, this.#read(val), prevOffset, val];
            break;
          case MT.UTF8_STRING:
            val === 1 / 0 ? yield* this.#stream(mt, depth, prevOffset) : yield [mt, ai, TD.decode(this.#read(val)), prevOffset, val];
            break;
          case MT.ARRAY:
            if (val === 1 / 0)
              yield* this.#stream(mt, depth, prevOffset, !1);
            else {
              let nval = Number(val);
              yield [mt, ai, nval, prevOffset, len];
              for (let i = 0; i < nval; i++)
                yield* this.#nextVal(depth + 1);
            }
            break;
          case MT.MAP:
            if (val === 1 / 0)
              yield* this.#stream(mt, depth, prevOffset, !1);
            else {
              let nval = Number(val);
              yield [mt, ai, nval, prevOffset, len];
              for (let i = 0; i < nval; i++)
                yield* this.#nextVal(depth), yield* this.#nextVal(depth);
            }
            break;
          case MT.TAG:
            yield [mt, ai, val, prevOffset, len], yield* this.#nextVal(depth);
            break;
          case MT.SIMPLE_FLOAT: {
            let oval = val;
            simple && (val = Simple.create(Number(val))), yield [mt, ai, val, prevOffset, oval];
            break;
          }
        }
      }
      #read(size) {
        let a = subarrayRanges(this.#src, this.#offset, this.#offset += size);
        if (a.length !== size)
          throw new Error(`Unexpected end of stream reading ${size} bytes, got ${a.length}`);
        return a;
      }
      *#stream(mt, depth, prevOffset, check = !0) {
        for (yield [mt, NUMBYTES.INDEFINITE, 1 / 0, prevOffset, 1 / 0]; ; ) {
          let child = this.#nextVal(depth), first2 = child.next(), [nmt, ai, val] = first2.value;
          if (val === SYMS.BREAK) {
            yield first2.value, child.next();
            return;
          }
          if (check) {
            if (nmt !== mt)
              throw new Error(`Unmatched major type.  Expected ${mt}, got ${nmt}.`);
            if (ai === NUMBYTES.INDEFINITE)
              throw new Error("New stream started in typed stream");
          }
          yield first2.value, yield* child;
        }
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/options.js
var DiagnosticSizes, init_options = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/options.js"() {
    (function(DiagnosticSizes2) {
      DiagnosticSizes2[DiagnosticSizes2.NEVER = -1] = "NEVER", DiagnosticSizes2[DiagnosticSizes2.PREFERRED = 0] = "PREFERRED", DiagnosticSizes2[DiagnosticSizes2.ALWAYS = 1] = "ALWAYS";
    })(DiagnosticSizes || (DiagnosticSizes = {}));
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/container.js
function createObject(kve, opts) {
  return !opts.boxed && !opts.preferMap && kve.every(([k]) => typeof k == "string") ? Object.fromEntries(kve) : new Map(kve);
}
var LENGTH_FOR_AI, EMPTY_BUF, CBORcontainer, init_container = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/container.js"() {
    init_constants();
    init_options();
    init_sorts();
    init_float();
    init_box();
    init_encoder();
    init_utils();
    init_decodeStream2();
    init_simple();
    init_tag();
    LENGTH_FOR_AI = /* @__PURE__ */ new Map([
      [NUMBYTES.ZERO, 1],
      [NUMBYTES.ONE, 2],
      [NUMBYTES.TWO, 3],
      [NUMBYTES.FOUR, 5],
      [NUMBYTES.EIGHT, 9]
    ]), EMPTY_BUF = new Uint8Array(0);
    CBORcontainer = class _CBORcontainer {
      static defaultDecodeOptions = {
        ...DecodeStream.defaultOptions,
        ParentType: _CBORcontainer,
        boxed: !1,
        cde: !1,
        dcbor: !1,
        diagnosticSizes: DiagnosticSizes.PREFERRED,
        collapseBigInts: !1,
        convertUnsafeIntsToFloat: !1,
        createObject,
        keepNanPayloads: !1,
        maxBigIntBytes: 1e4,
        pretty: !1,
        preferBigInt: !1,
        preferMap: !1,
        rejectLargeNegatives: !1,
        rejectBigInts: !1,
        rejectDuplicateKeys: !1,
        rejectFloats: !1,
        rejectInts: !1,
        rejectLongLoundNaN: !1,
        rejectLongFloats: !1,
        rejectNegativeZero: !1,
        rejectSimple: !1,
        rejectStreaming: !1,
        rejectStringsNotNormalizedAs: null,
        rejectSubnormals: !1,
        rejectUndefined: !1,
        rejectUnsafeFloatInts: !1,
        saveOriginal: !1,
        sortKeys: null,
        tags: null,
        ignoreGlobalTags: !1
      };
      /**
       * Throw errors when decoding for bytes that were not encoded with {@link
       * https://www.ietf.org/archive/id/draft-ietf-cbor-cde-05.html CBOR Common
       * Deterministic Encoding Profile}.
       *
       * CDE does not mandate this checking, so it is up to the application
       * whether it wants to ensure that inputs were not encoded incompetetently
       * or maliciously.  To turn all of these on at once, set the cbor option to
       * true.
       */
      static cdeDecodeOptions = {
        cde: !0,
        rejectStreaming: !0,
        requirePreferred: !0,
        sortKeys: sortCoreDeterministic
      };
      /**
       * Throw errors when decoding for bytes that were not encoded with {@link
       * https://www.ietf.org/archive/id/draft-mcnally-deterministic-cbor-11.html
       * dCBOR: A Deterministic CBOR Application Profile}.
       *
       * The dCBOR spec mandates that these errors be thrown when decoding dCBOR.
       * Turn this on by setting the `dcbor` option to true, which also enables
       * `cde` mode.
       */
      static dcborDecodeOptions = {
        ...this.cdeDecodeOptions,
        dcbor: !0,
        convertUnsafeIntsToFloat: !0,
        rejectDuplicateKeys: !0,
        rejectLargeNegatives: !0,
        rejectLongLoundNaN: !0,
        rejectLongFloats: !0,
        rejectNegativeZero: !0,
        rejectSimple: !0,
        rejectUndefined: !0,
        rejectUnsafeFloatInts: !0,
        rejectStringsNotNormalizedAs: "NFC"
      };
      parent;
      mt;
      ai;
      left;
      offset;
      count = 0;
      children = [];
      depth = 0;
      #opts;
      #encodedChildren = null;
      // Only call new from create() and super().
      constructor(mav, left, parent, opts) {
        if ([this.mt, this.ai, , this.offset] = mav, this.left = left, this.parent = parent, this.#opts = opts, parent && (this.depth = parent.depth + 1), this.mt === MT.MAP && (this.#opts.sortKeys || this.#opts.rejectDuplicateKeys) && (this.#encodedChildren = []), this.#opts.rejectStreaming && this.ai === NUMBYTES.INDEFINITE)
          throw new Error("Streaming not supported");
      }
      get isStreaming() {
        return this.left === 1 / 0;
      }
      get done() {
        return this.left === 0;
      }
      /**
       * Factory method that returns the given ParentType if the mt/ai dictate
       * that is necessary, otherwise returns the given value.
       *
       * @param mav Major Type, Additional Information, and Associated value from
       *   token.
       * @param parent If this item is inside another item, the direct parent.
       * @param opts Options controlling creation.
       * @param stream The stream being decoded from.
       * @returns ParentType instance or value.
       * @throws Invalid major type, which should only occur from tests.
       */
      static create(mav, parent, opts, stream) {
        let [mt, ai, value, offset] = mav;
        switch (mt) {
          case MT.POS_INT:
          case MT.NEG_INT: {
            if (opts.rejectInts)
              throw new Error(`Unexpected integer: ${value}`);
            if (opts.rejectLargeNegatives && value < -0x8000000000000000n)
              throw new Error(`Invalid 65bit negative number: ${value}`);
            let val = value;
            return opts.preferBigInt ? val = BigInt(val) : opts.convertUnsafeIntsToFloat && val >= DCBOR_INT.MIN && val <= DCBOR_INT.MAX && (val = Number(value)), opts.boxed ? box(val, stream.toHere(offset)) : val;
          }
          case MT.SIMPLE_FLOAT:
            if (ai > NUMBYTES.ONE) {
              if (typeof value == "symbol")
                return value;
              if (opts.rejectFloats)
                throw new Error(`Decoding unwanted floating point number: ${value}`);
              if (opts.rejectNegativeZero && Object.is(value, -0))
                throw new Error("Decoding negative zero");
              if (isNaN(value)) {
                let buf = stream.toHere(offset), val = new NAN(buf);
                if (opts.rejectLongLoundNaN) {
                  if (val.payload || buf.length > 3)
                    throw new Error(`Invalid NaN encoding: "${u8toHex(buf)}"`);
                } else if (opts.keepNanPayloads && (val.payload || val.sign === -1)) {
                  if (opts.rejectLongFloats && !val.isShortestEncoding)
                    throw new Error(`NaN should have been encoded shorter: ${value}`);
                  return val;
                }
              }
              if (opts.rejectSubnormals && checkSubnormal(stream.toHere(offset + 1)), opts.rejectLongFloats) {
                let buf = encode(value, {
                  chunkSize: 9,
                  reduceUnsafeNumbers: opts.rejectUnsafeFloatInts
                });
                if (buf[0] >> 5 !== mt)
                  throw new Error(`Should have been encoded as int, not float: ${value}`);
                if (buf.length < LENGTH_FOR_AI.get(ai))
                  throw new Error(`Number should have been encoded shorter: ${value}`);
              }
              if (typeof value == "number" && opts.boxed)
                return box(value, stream.toHere(offset));
            } else {
              if (opts.rejectSimple && value instanceof Simple)
                throw new Error(`Invalid simple value: ${value}`);
              if (opts.rejectUndefined && value === void 0)
                throw new Error("Unexpected undefined");
            }
            return value;
          case MT.BYTE_STRING:
          case MT.UTF8_STRING:
            if (value === 1 / 0)
              return new opts.ParentType(mav, 1 / 0, parent, opts);
            if (opts.rejectStringsNotNormalizedAs && typeof value == "string") {
              let n = value.normalize(opts.rejectStringsNotNormalizedAs);
              if (value !== n)
                throw new Error(`String not normalized as "${opts.rejectStringsNotNormalizedAs}", got [${stringToHex(value)}] instead of [${stringToHex(n)}]`);
            }
            return opts.boxed ? box(value, stream.toHere(offset)) : value;
          case MT.ARRAY:
            return new opts.ParentType(mav, value, parent, opts);
          case MT.MAP:
            return new opts.ParentType(mav, value * 2, parent, opts);
          case MT.TAG: {
            let ret = new opts.ParentType(mav, 1, parent, opts);
            return ret.children = new Tag(value), ret;
          }
        }
        throw new TypeError(`Invalid major type: ${mt}`);
      }
      static decodeToEncodeOpts(decode3) {
        return {
          ...defaultEncodeOptions,
          avoidInts: decode3.rejectInts,
          float64: !decode3.rejectLongFloats,
          flushToZero: decode3.rejectSubnormals,
          largeNegativeAsBigInt: decode3.rejectLargeNegatives,
          sortKeys: decode3.sortKeys
        };
      }
      /**
       * Add the given child to the list of children, and update how many are
       * still needed.
       *
       * @param child Any child item.
       * @param stream Stream being read from.
       * @param offset Offset of start of child in stream.
       * @returns The number of items still needed.
       */
      push(child, stream, offset) {
        if (this.children.push(child), this.#encodedChildren) {
          let buf = getEncoded(child) || stream.toHere(offset);
          this.#encodedChildren.push(buf);
        }
        return --this.left;
      }
      /**
       * Replace the last child with this one.  Usually after having called
       * convert on the most recent child.
       *
       * @param child New child value.
       * @param item The key or value container.  Used to check for dups.
       * @param stream The stream being read from.
       * @returns Previous child value.
       * @throws Duplicate key.
       */
      replaceLast(child, item, stream) {
        let ret, last = -1 / 0;
        if (this.children instanceof Tag ? (last = 0, ret = this.children.contents, this.children.contents = child) : (last = this.children.length - 1, ret = this.children[last], this.children[last] = child), this.#encodedChildren) {
          let buf = getEncoded(child) || stream.toHere(item.offset);
          this.#encodedChildren[last] = buf;
        }
        return ret;
      }
      /**
       * Converts the childen to the most appropriate form known.
       *
       * @param stream Stream that we are reading from.
       * @returns Anything BUT a CBORcontainer.
       * @throws Invalid major type.  Only possible in testing.
       */
      convert(stream) {
        let ret;
        switch (this.mt) {
          case MT.ARRAY:
            ret = this.children;
            break;
          case MT.MAP: {
            let pu = this.#pairs();
            if (this.#opts.sortKeys) {
              let lastKey;
              for (let kve of pu) {
                if (lastKey && this.#opts.sortKeys(lastKey, kve) >= 0)
                  throw new Error(`Duplicate or out of order key: "0x${kve[2]}"`);
                lastKey = kve;
              }
            } else if (this.#opts.rejectDuplicateKeys) {
              let ks = /* @__PURE__ */ new Set();
              for (let [_k, _v, e] of pu) {
                let hex2 = u8toHex(e);
                if (ks.has(hex2))
                  throw new Error(`Duplicate key: "0x${hex2}"`);
                ks.add(hex2);
              }
            }
            ret = this.#opts.createObject(pu, this.#opts);
            break;
          }
          case MT.BYTE_STRING:
            return u8concat(this.children);
          case MT.UTF8_STRING: {
            let str = this.children.join("");
            ret = this.#opts.boxed ? box(str, stream.toHere(this.offset)) : str;
            break;
          }
          case MT.TAG:
            ret = this.children.decode(this.#opts);
            break;
          default:
            throw new TypeError(`Invalid mt on convert: ${this.mt}`);
        }
        return this.#opts.saveOriginal && ret && typeof ret == "object" && saveEncoded(ret, stream.toHere(this.offset)), ret;
      }
      #pairs() {
        let ary = this.children, len = ary.length;
        if (len % 2)
          throw new Error("Missing map value");
        let ret = new Array(len / 2);
        if (this.#encodedChildren)
          for (let i = 0; i < len; i += 2)
            ret[i >> 1] = [ary[i], ary[i + 1], this.#encodedChildren[i]];
        else
          for (let i = 0; i < len; i += 2)
            ret[i >> 1] = [ary[i], ary[i + 1], EMPTY_BUF];
        return ret;
      }
    };
  }
});

// node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/decoder.js
var init_decoder = __esm({
  "node_modules/.pnpm/cbor2@2.4.0/node_modules/cbor2/lib/decoder.js"() {
    init_decodeStream2();
    init_container();
    init_constants();
  }
});

// node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/portable-sha256.mjs
function rotr(x, n) {
  return x >>> n | x << 32 - n;
}
function sha256Bytes(bytes) {
  return nativeCrypto !== void 0 ? nativeCrypto.createHash("sha256").update(bytes).digest("hex") : portableSha256Bytes(bytes);
}
function portableSha256Bytes(bytes) {
  let bitLen = bytes.length * 8, padLen = (bytes.length + 8 >> 6) + 1 << 6, buf = new Uint8Array(padLen);
  buf.set(bytes), buf[bytes.length] = 128;
  let view = new DataView(buf.buffer);
  view.setUint32(padLen - 8, Math.floor(bitLen / 4294967296), !1), view.setUint32(padLen - 4, bitLen >>> 0, !1);
  let h = H0.slice(), w = new Uint32Array(64);
  for (let offset = 0; offset < padLen; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, !1);
    for (let i = 16; i < 64; i++) {
      let s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3, s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10;
      w[i] = w[i - 16] + s0 + w[i - 7] + s1 | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      let S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25), ch = e & f ^ ~e & g, t1 = hh + S1 + ch + K[i] + w[i] | 0, S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22), maj = a & b ^ a & c ^ b & c, t2 = S0 + maj | 0;
      hh = g, g = f, f = e, e = d + t1 | 0, d = c, c = b, b = a, a = t1 + t2 | 0;
    }
    h[0] = h[0] + a | 0, h[1] = h[1] + b | 0, h[2] = h[2] + c | 0, h[3] = h[3] + d | 0, h[4] = h[4] + e | 0, h[5] = h[5] + f | 0, h[6] = h[6] + g | 0, h[7] = h[7] + hh | 0;
  }
  let hex2 = "";
  for (let word of h) hex2 += (word >>> 0).toString(16).padStart(8, "0");
  return hex2;
}
var K, H0, nativeCrypto, init_portable_sha256 = __esm({
  "node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/portable-sha256.mjs"() {
    K = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]), H0 = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    nativeCrypto = globalThis.process?.getBuiltinModule?.("node:crypto");
  }
});

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/src/json-byte-carrier.mjs
var init_json_byte_carrier = __esm({
  "node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/src/json-byte-carrier.mjs"() {
  }
});

// node_modules/.pnpm/@red-cup-engineering+uri-services-section@0.1.1/node_modules/@red-cup-engineering/uri-services-section/src/ni-uri.mjs
function base64url(bytes) {
  let text2 = "";
  for (let byte of bytes) text2 += String.fromCharCode(byte);
  return btoa(text2).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function fromBase64url(value) {
  let text2 = atob(value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4));
  return Uint8Array.from(text2, (character) => character.charCodeAt(0));
}
function sha256(bytes) {
  let hex2 = sha256Bytes(bytes);
  return Uint8Array.from(hex2.match(/../g), (pair) => Number.parseInt(pair, 16));
}
function byteString(value) {
  if (!(value instanceof Uint8Array))
    throw new TypeError("ni URI input must be a Uint8Array");
  return value;
}
function digestBytes(value) {
  if (typeof value != "string" || !NI_URI_PATTERN.test(value)) return null;
  let encoded = value.slice(NI_PREFIX.length), digest2 = fromBase64url(encoded);
  return digest2.length === 32 && base64url(digest2) === encoded ? digest2 : null;
}
function makeNiUri(bytes) {
  let digest2 = base64url(sha256(byteString(bytes)));
  return `${NI_PREFIX}${digest2}`;
}
function isNiUri(value) {
  return digestBytes(value) !== null;
}
var NI_PREFIX, NI_URI_PATTERN, init_ni_uri = __esm({
  "node_modules/.pnpm/@red-cup-engineering+uri-services-section@0.1.1/node_modules/@red-cup-engineering/uri-services-section/src/ni-uri.mjs"() {
    init_portable_sha256();
    init_json_byte_carrier();
    NI_PREFIX = "ni:///sha-256;", NI_URI_PATTERN = /^ni:\/\/\/sha-256;[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048]$/u;
  }
});

// node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/portable-bytes.mjs
function bytesToHex(bytes) {
  let text2 = "";
  for (let index2 = 0; index2 < bytes.length; index2 += 1) text2 += HEX[bytes[index2]];
  return text2;
}
function bytesEqual(left, right) {
  if (left.length !== right.length) return !1;
  for (let index2 = 0; index2 < left.length; index2 += 1) if (left[index2] !== right[index2]) return !1;
  return !0;
}
function bytesCompare(left, right) {
  let shared = Math.min(left.length, right.length);
  for (let index2 = 0; index2 < shared; index2 += 1) if (left[index2] !== right[index2]) return left[index2] < right[index2] ? -1 : 1;
  return left.length === right.length ? 0 : left.length < right.length ? -1 : 1;
}
var HEX, ownedBytes, init_portable_bytes = __esm({
  "node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/portable-bytes.mjs"() {
    HEX = Array.from({ length: 256 }, (_, byte) => byte.toString(16).padStart(2, "0")), ownedBytes = (bytes) => globalThis.Buffer ? globalThis.Buffer.from(bytes) : Uint8Array.from(bytes);
  }
});

// node_modules/.pnpm/@red-cup-engineering+cbor-services-section@0.1.1/node_modules/@red-cup-engineering/cbor-services-section/src/cbor.mjs
function fail(code, message2) {
  let error = new Error(message2);
  throw error.code = code, error;
}
function unsigned(value) {
  let integer = typeof value == "bigint" ? value : BigInt(value);
  return (integer < 0n || integer > 0xffffffffffffffffn) && fail("non-canonical-cbor", "CBOR argument is outside the CBOR uint64 profile"), integer;
}
function encode2(value) {
  let writer = new Writer(), ancestors = /* @__PURE__ */ new Set(), stack = [{ value }];
  for (; stack.length; ) {
    let item = stack.pop();
    if (item.exit) {
      ancestors.delete(item.value);
      continue;
    }
    if (item.bytes) {
      writer.write(item.bytes);
      continue;
    }
    let member = item.value;
    if (member instanceof Tag && fail("non-canonical-cbor", "CBOR tags are outside the supported CBOR codec profile"), member instanceof Uint8Array) {
      writeUint8Array(member, writer);
      continue;
    }
    if (Array.isArray(member) || member && Object.getPrototypeOf(member) === Object.prototype) {
      if (ancestors.has(member) && fail("non-canonical-cbor", "cyclic CBOR carrier"), ancestors.add(member), stack.push({ exit: !0, value: member }), Array.isArray(member)) {
        writeInt(member.length, writer, 4);
        for (let index2 = member.length - 1; index2 >= 0; index2--) stack.push({ value: member[index2] });
      } else {
        let entries = Object.entries(member).filter(([, entry]) => entry !== void 0).map(([key, entry]) => ({ bytes: encode2(key), value: entry })).sort((left, right) => bytesCompare(left.bytes, right.bytes));
        writeInt(entries.length, writer, 5);
        for (let index2 = entries.length - 1; index2 >= 0; index2--)
          stack.push({ value: entries[index2].value }), stack.push({ bytes: entries[index2].bytes });
      }
      continue;
    }
    typeof member == "number" && !Number.isFinite(member) && fail("non-canonical-cbor", "CBOR codec numbers must be finite"), typeof member == "bigint" && unsigned(member < 0n ? -1n - member : member), typeof member == "string" && !member.isWellFormed() && fail("non-canonical-cbor", "CBOR text string contains an unpaired Unicode surrogate"), member !== null && !["boolean", "number", "bigint", "string"].includes(typeof member) && fail("non-canonical-cbor", `unsupported CBOR codec carrier value ${Object.prototype.toString.call(member)}`), writeUnknown(member, writer, OPTIONS);
  }
  return ownedBytes(writer.read());
}
function encodeCanonical(value) {
  return encode2(value);
}
var OPTIONS, init_cbor = __esm({
  "node_modules/.pnpm/@red-cup-engineering+cbor-services-section@0.1.1/node_modules/@red-cup-engineering/cbor-services-section/src/cbor.mjs"() {
    init_encoder();
    init_decoder();
    init_writer();
    init_tag();
    init_ni_uri();
    init_portable_bytes();
    OPTIONS = Object.freeze({ ...defaultEncodeOptions, simplifyNegativeZero: !0, ignoreOriginalEncoding: !0, ignoreGlobalTags: !0 });
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-content-address-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-content-address-engineering-services-section/src/semiotic-content-address.mjs
function canonicalizeSemioticJson(value) {
  return copyCarrier(value, !0);
}
function copyCarrier(value, normalizeText) {
  let canonical, pending = [{ source: value, place: (result) => {
    canonical = result;
  } }], open2 = /* @__PURE__ */ new Set();
  for (; pending.length > 0; ) {
    let item = pending.pop();
    if (item.close) {
      open2.delete(item.close);
      continue;
    }
    let { source, place } = item;
    if (typeof source == "string") {
      place(normalizeText ? source.normalize("NFC") : source);
      continue;
    }
    if (source !== null && typeof source == "object" && (canonicalSnapshots.has(source) || !normalizeText && retainedSnapshots.has(source))) {
      place(source);
      continue;
    }
    if (source instanceof Uint8Array) {
      place(copyBytes(source));
      continue;
    }
    if (source === null || typeof source == "boolean" || typeof source == "bigint") {
      place(source);
      continue;
    }
    if (typeof source == "number") {
      if (!Number.isFinite(source)) throw new TypeError("semiotic JSON numbers must be finite");
      place(source);
      continue;
    }
    if ((Array.isArray(source) || source && typeof source == "object") && open2.has(source)) throw new TypeError("semiotic JSON must not be cyclic");
    if (Array.isArray(source)) {
      open2.add(source), pending.push({ close: source });
      let result = new Array(source.length);
      place(result);
      for (let index2 = source.length - 1; index2 >= 0; index2 -= 1)
        pending.push({ source: source[index2], place: (member) => {
          result[index2] = member;
        } });
      continue;
    }
    if (source && Object.getPrototypeOf(source) === Object.prototype) {
      open2.add(source), pending.push({ close: source });
      let result = {}, members = [], normalizedKeys = /* @__PURE__ */ new Set();
      for (let [key, member] of Object.entries(source)) {
        if (member === void 0) continue;
        let canonicalKey = key.normalize("NFC");
        if (normalizedKeys.has(canonicalKey)) throw new TypeError(`semiotic JSON map keys collide after NFC normalization: ${canonicalKey}`);
        normalizedKeys.add(canonicalKey);
        let retainedKey = normalizeText ? canonicalKey : key;
        Object.defineProperty(result, retainedKey, { value: void 0, enumerable: !0, writable: !0, configurable: !0 }), members.push([retainedKey, member]);
      }
      place(result);
      for (let index2 = members.length - 1; index2 >= 0; index2 -= 1) {
        let [key, member] = members[index2];
        pending.push({ source: member, place: (canonicalMember) => {
          result[key] = canonicalMember;
        } });
      }
      continue;
    }
    throw new TypeError(`unsupported semiotic JSON value ${Object.prototype.toString.call(source)}`);
  }
  return canonical;
}
function canonicalCarrier(value) {
  return ownSnapshot(canonicalizeSemioticJson(value), canonicalSnapshots);
}
function retainedCarrier(value) {
  return ownSnapshot(copyCarrier(value, !1), retainedSnapshots);
}
function ownSnapshot(canonical, snapshots) {
  let pending = [canonical];
  for (; pending.length > 0; ) {
    let item = pending.pop();
    if (!(item === null || typeof item != "object" || ArrayBuffer.isView(item) || canonicalSnapshots.has(item) || retainedSnapshots.has(item))) {
      for (let key of Object.keys(item)) {
        let member = item[key];
        member instanceof Uint8Array ? Object.defineProperty(item, key, { enumerable: !0, configurable: !1, get: () => copyBytes(member) }) : pending.push(member);
      }
      Object.freeze(item), snapshots.add(item);
    }
  }
  return canonical;
}
function semanticBytes(value) {
  let memo = value !== null && typeof value == "object" && canonicalSnapshots.has(value);
  if (memo) {
    let cached = frozenBytes.get(value);
    if (cached !== void 0) return ownedBytes(cached);
  }
  let bytes = encodeCanonical(canonicalizeSemioticJson(value));
  return memo && frozenBytes.set(value, bytes), ownedBytes(bytes);
}
function semanticAddress(value) {
  let bytes = semanticBytes(value);
  return Object.freeze({ id: makeNiUri(bytes), bytes });
}
function semanticId(value) {
  return semanticAddress(value).id;
}
function semanticHex(value) {
  return sha256Bytes(semanticBytes(value));
}
function coincides(left, right) {
  return typeof left == "string" && typeof right == "string" ? left === right || left.normalize("NFC") === right.normalize("NFC") : isScalar(left) && isScalar(right) && typeof left != "string" && typeof right != "string" ? (typeof left == "number" && !Number.isFinite(left) && semanticBytes(left), typeof right == "number" && !Number.isFinite(right) && semanticBytes(right), left === right) : bytesEqual(semanticBytes(left), semanticBytes(right));
}
var canonicalSnapshots, retainedSnapshots, copyBytes, frozenBytes, isScalar, init_semiotic_content_address = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-content-address-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-content-address-engineering-services-section/src/semiotic-content-address.mjs"() {
    init_cbor();
    init_ni_uri();
    init_portable_sha256();
    init_portable_bytes();
    init_portable_bytes();
    canonicalSnapshots = /* @__PURE__ */ new WeakSet(), retainedSnapshots = /* @__PURE__ */ new WeakSet(), copyBytes = (value) => value.constructor === Uint8Array ? Uint8Array.from(value) : ownedBytes(value);
    frozenBytes = /* @__PURE__ */ new WeakMap();
    isScalar = (value) => value === null || ["string", "number", "boolean"].includes(typeof value);
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/four.mjs
function familyOf(name) {
  let family = familyByName.get(name);
  if (family === void 0) throw new TypeError(`four: unknown reading ${String(name)}`);
  return family;
}
function readingOfSides(family, forTold, againstTold) {
  let names = readingFamilies[family];
  if (names === void 0) throw new TypeError(`four: unknown reading family ${String(family)}`);
  return names[(forTold ? 1 : 0) + (againstTold ? 2 : 0)];
}
function sidesOfReading(name) {
  let index2 = readingFamilies[familyOf(name)].indexOf(name);
  return Object.freeze([(index2 & 1) === 1, (index2 & 2) === 2]);
}
function sharedFamily(left, right) {
  let family = familyOf(left);
  if (familyOf(right) !== family) throw new TypeError(`four: ${left} (${family}) and ${right} (${familyOf(right)}) are named in different families`);
  return family;
}
function twistProduct({ bottom, top, one, leq, meet, join: join5, fuse, imply }) {
  let value = (positive, negative) => Object.freeze([positive, negative]), lift = (positive, negative) => ({ left: a, right: b }) => value(positive(a[0], b[0]), negative(a[1], b[1]));
  return Object.freeze({
    value,
    knowledgeBottom: value(bottom, bottom),
    knowledgeTop: value(top, top),
    truthBottom: value(bottom, top),
    truthTop: value(top, bottom),
    one: value(one, one),
    meetKnowledge: lift(meet, meet),
    joinKnowledge: lift(join5, join5),
    meetTruth: lift(meet, join5),
    joinTruth: lift(join5, meet),
    leqKnowledge: ({ left: a, right: b }) => leq(a[0], b[0]) && leq(a[1], b[1]),
    leqTruth: ({ left: a, right: b }) => leq(a[0], b[0]) && leq(b[1], a[1]),
    negate: (a) => value(a[1], a[0]),
    fuse: ({ left: a, right: b }) => value(fuse(a[0], b[0]), meet(imply(a[0], b[1]), imply(b[0], a[1]))),
    imply: ({ left: a, right: b }) => value(meet(imply(a[0], b[0]), imply(b[1], a[1])), fuse(a[0], b[1]))
  });
}
function gauge(element, name) {
  if (element === "negation") return negateReading(name);
  if (element === "conflation") return conflateReading(name);
  if (element === "double") return negateReading(conflateReading(name));
  if (element === "id") return name;
  throw new TypeError(`four: unknown gauge element ${String(element)}`);
}
function fail2(code, message2) {
  let error = new Error(message2);
  throw error.code = code, error;
}
function four(positiveEvidence, negativeEvidence) {
  return (typeof positiveEvidence != "boolean" || typeof negativeEvidence != "boolean") && fail2("malformed-four", "FOUR requires explicit Boolean positiveEvidence and negativeEvidence bits"), Object.freeze({ positiveEvidence, negativeEvidence });
}
var readingFamilies, familyByName, readingAs, samePoint, isReading, readingSchema, onReadings, knowledgeJoinReading, knowledgeMeetReading, knowledgeLeqReading, truthJoinReading, truthMeetReading, truthLeqReading, knowledgeImplyReading, truthImplyReading, symmetricEvidenceDifferenceReading, negateReading, conflateReading, two, viaTwo, fusionReading, residuumReading, linearUnit, knowledgeBottom, knowledgeTop, truthTop, truthBottom, familyOfList, knowledgeJoinAll, tally, record, recordJoinK, recordMeetK, recordJoinT, recordMeetT, recordAdd, recordLeqK, recordLeqT, readingOfRecord, topMass, attestationRecord, gaugeElementNames, points, wireOfReading, FOUR, obsmetrologiaRealization, init_four = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/four.mjs"() {
    readingFamilies = Object.freeze({
      /** Relational: the knowledge order's reading, by what has been told. */
      knowledge: Object.freeze(["absurd", "potential", "active", "stable"]),
      /** Told (Dunn 1976): each point named by which of true and false it has been told. */
      told: Object.freeze(["told none", "told true", "told false", "told both"]),
      /** Logical (Belnap): the truth order's reading. */
      truth: Object.freeze(["neither", "true", "false", "both"]),
      /** Extremal: each point named by the order it is an extreme of — unknown and contested the
       *  knowledge bottom and top, denied and held the truth bottom and top. SEN's reading marks
       *  and claim sessions use these. */
      extremal: Object.freeze(["unknown", "held", "denied", "contested"])
    }), familyByName = new Map(Object.entries(readingFamilies).flatMap(([family, names]) => names.map((name) => [name, family])));
    readingAs = (family, name) => readingOfSides(family, ...sidesOfReading(name)), samePoint = (left, right) => sidesOfReading(left).join() === sidesOfReading(right).join(), isReading = (name, family) => familyByName.has(name) && (family === void 0 || familyByName.get(name) === family), readingSchema = (family) => Object.freeze({ enum: readingFamilies[family] });
    onReadings = (combine) => (left, right) => readingOfSides(sharedFamily(left, right), ...combine(...sidesOfReading(left), ...sidesOfReading(right))), knowledgeJoinReading = onReadings((lf, la, rf, ra) => [lf || rf, la || ra]), knowledgeMeetReading = onReadings((lf, la, rf, ra) => [lf && rf, la && ra]), knowledgeLeqReading = (left, right) => samePoint(knowledgeJoinReading(left, right), right), truthJoinReading = onReadings((lf, la, rf, ra) => [lf || rf, la && ra]), truthMeetReading = onReadings((lf, la, rf, ra) => [lf && rf, la || ra]), truthLeqReading = (left, right) => samePoint(truthJoinReading(left, right), right), knowledgeImplyReading = onReadings((lf, la, rf, ra) => [!lf || rf, !la || ra]), truthImplyReading = onReadings((lf, la, rf, ra) => [!lf || rf, !la && ra]), symmetricEvidenceDifferenceReading = onReadings(
      (lf, la, rf, ra) => [lf !== rf, la !== ra]
    ), negateReading = (name) => {
      let [f, a] = sidesOfReading(name);
      return readingOfSides(familyOf(name), a, f);
    }, conflateReading = (name) => {
      let [f, a] = sidesOfReading(name);
      return readingOfSides(familyOf(name), !a, !f);
    };
    two = twistProduct({ bottom: !1, top: !0, one: !0, leq: (a, b) => !a || b, meet: (a, b) => a && b, join: (a, b) => a || b, fuse: (a, b) => a && b, imply: (a, b) => !a || b }), viaTwo = (operation) => (left, right) => readingOfSides(sharedFamily(left, right), ...operation({ left: sidesOfReading(left), right: sidesOfReading(right) })), fusionReading = viaTwo(two.fuse), residuumReading = viaTwo(two.imply), linearUnit = (family = "knowledge") => readingOfSides(family, !0, !0), knowledgeBottom = (family = "knowledge") => readingOfSides(family, !1, !1), knowledgeTop = (family = "knowledge") => readingOfSides(family, !0, !0), truthTop = (family = "knowledge") => readingOfSides(family, !0, !1), truthBottom = (family = "knowledge") => readingOfSides(family, !1, !0), familyOfList = (names) => names.length > 0 ? familyOf(names[0]) : "knowledge", knowledgeJoinAll = (names, family = familyOfList(names)) => names.reduce(knowledgeJoinReading, knowledgeBottom(family)), tally = (count) => {
      if (!Number.isSafeInteger(count) || count < 0)
        throw new TypeError(`four: a tally must be an exactly representable natural number, not ${String(count)}`);
      return count;
    }, record = (pos = 0, neg = 0) => Object.freeze({ pos: tally(pos), neg: tally(neg) }), recordJoinK = (a, b) => record(Math.max(a.pos, b.pos), Math.max(a.neg, b.neg)), recordMeetK = (a, b) => record(Math.min(a.pos, b.pos), Math.min(a.neg, b.neg)), recordJoinT = (a, b) => record(Math.max(a.pos, b.pos), Math.min(a.neg, b.neg)), recordMeetT = (a, b) => record(Math.min(a.pos, b.pos), Math.max(a.neg, b.neg)), recordAdd = (a, b) => record(a.pos + b.pos, a.neg + b.neg), recordLeqK = (a, b) => a.pos <= b.pos && a.neg <= b.neg, recordLeqT = (a, b) => a.pos <= b.pos && b.neg <= a.neg, readingOfRecord = (r, family = "knowledge") => readingOfSides(family, r.pos > 0, r.neg > 0), topMass = (r) => Math.min(r.pos, r.neg), attestationRecord = (counts) => {
      if (counts.some((count) => !Number.isSafeInteger(count) || count < 1)) throw new TypeError("four: a distinct state is attested at least once");
      let total = counts.reduce((sum, count) => tally(sum + count), 0);
      return record(total - counts.length, Math.max(0, counts.length - 1));
    }, gaugeElementNames = Object.freeze(["id", "negation", "conflation", "double"]);
    points = readingFamilies.knowledge;
    wireOfReading = (name) => four(...sidesOfReading(name)), FOUR = Object.freeze(Object.fromEntries(readingFamilies.truth.map((name) => [name, wireOfReading(name)]))), obsmetrologiaRealization = Object.freeze({
      "Obsmetrologia.Articulating.Corner.toStatus": sidesOfReading,
      "Obsmetrologia.Reading.kBot": () => knowledgeBottom(),
      "Obsmetrologia.Reading.kTop": () => knowledgeTop(),
      "Obsmetrologia.Reading.tTop": () => truthTop(),
      "Obsmetrologia.Reading.tBot": () => truthBottom(),
      "Obsmetrologia.Reading.joinK": knowledgeJoinReading,
      "Obsmetrologia.Reading.meetK": knowledgeMeetReading,
      "Obsmetrologia.Reading.joinT": truthJoinReading,
      "Obsmetrologia.Reading.meetT": truthMeetReading,
      "Obsmetrologia.Reading.leK": knowledgeLeqReading,
      "Obsmetrologia.Reading.leT": truthLeqReading,
      "Obsmetrologia.Reading.negate": negateReading,
      "Obsmetrologia.Reading.conflate": conflateReading,
      "Obsmetrologia.Reading.negConf": (name) => gauge("double", name),
      "Obsmetrologia.Reading.impK": knowledgeImplyReading,
      "Obsmetrologia.Positing.FiberAlgebra.Reading.impT": truthImplyReading,
      "Obsmetrologia.Order.TwistProduct.fuse": fusionReading,
      "Obsmetrologia.Order.TwistProduct.imp": residuumReading,
      "Obsmetrologia.Order.TwistProduct.one": () => linearUnit(),
      "Obsmetrologia.Record.joinK": recordJoinK,
      "Obsmetrologia.Record.meetK": recordMeetK,
      "Obsmetrologia.Record.joinT": recordJoinT,
      "Obsmetrologia.Record.meetT": recordMeetT,
      "Obsmetrologia.Record.add": recordAdd,
      "Obsmetrologia.Record.reading": (r) => readingOfRecord(r),
      "Obsmetrologia.Record.topMass": topMass,
      "Obsmetrologia.Record.leK": recordLeqK,
      "Obsmetrologia.Record.leT": recordLeqT,
      "ObsmetrologiaComputing.attestationRecord": attestationRecord
    });
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/header-value.mjs
function firstHeader(value) {
  return Array.isArray(value) ? value[0] : value;
}
function splitHeaderList(value, separator = ",") {
  let out = [], current = "", quoted = !1, escaped = !1;
  for (let char of value) {
    if (escaped) {
      current += char, escaped = !1;
      continue;
    }
    if (char === "\\" && quoted) {
      current += char, escaped = !0;
      continue;
    }
    if (char === '"' && (quoted = !quoted), char === separator && !quoted) {
      out.push(current), current = "";
      continue;
    }
    current += char;
  }
  return out.push(current), out.map((part) => part.trim()).filter(Boolean);
}
function unquoteHeaderValue(value) {
  return value.length >= 2 && value.startsWith('"') && value.endsWith('"') ? value.slice(1, -1).replace(/\\(["\\])/g, "$1") : value;
}
function quoteHeaderValue(value) {
  return `"${value.replace(/([\\"])/g, "\\$1")}"`;
}
function splitHeaderParameters(value) {
  return splitHeaderList(value, ";");
}
var init_header_value = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/header-value.mjs"() {
  }
});

// node_modules/.pnpm/@red-cup-engineering+json-schema-services-section@0.5.0/node_modules/@red-cup-engineering/json-schema-services-section/src/validation.mjs
function isObject2(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function isSchema(value) {
  return typeof value == "boolean" || isObject2(value);
}
function issue(kind, path, keyword, message2) {
  return Object.freeze({ kind, path, keyword, message: message2 });
}
function schemaIssue(error) {
  return issue("schema", "", "schema", error instanceof Error ? error.message : String(error));
}
function refused2(issues) {
  return Object.freeze({ valid: !1, issues: orderIssues(issues) });
}
function orderIssues(issues) {
  return Object.freeze([...issues].sort((left, right) => {
    for (let [a, b] of [[left.kind, right.kind], [left.path, right.path], [left.keyword, right.keyword], [left.message, right.message]]) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
    }
    return 0;
  }));
}
function schemaDialect(schema) {
  if (typeof schema == "boolean")
    return "2020-12";
  let declared = schema.$schema;
  if (declared === void 0)
    return "2020-12";
  if (declared === DRAFT_07 || declared === DRAFT_07_HTTPS)
    return "draft-07";
  if (declared === DRAFT_2020_12)
    return "2020-12";
  throw new TypeError(`unsupported JSON Schema dialect ${String(declared)}`);
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function date(text2) {
  let matches = DATE.exec(text2);
  if (!matches)
    return !1;
  let year = +matches[1], month = +matches[2], day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
function timeOf(strictTimeZone) {
  return (text2) => {
    let matches = TIME.exec(text2);
    if (!matches)
      return !1;
    let hour = +matches[1], minute = +matches[2], second = +matches[3], zone = matches[4], zoneSign = matches[5] === "-" ? -1 : 1, zoneHour = +(matches[6] || 0), zoneMinute = +(matches[7] || 0);
    if (zoneHour > 23 || zoneMinute > 59 || strictTimeZone && !zone)
      return !1;
    if (hour <= 23 && minute <= 59 && second < 60)
      return !0;
    let utcMinute = minute - zoneMinute * zoneSign, utcHour = hour - zoneHour * zoneSign - (utcMinute < 0 ? 1 : 0);
    return (utcHour === 23 || utcHour === -1) && (utcMinute === 59 || utcMinute === -1) && second < 61;
  };
}
function dateTimeOf(strictTimeZone) {
  let time = timeOf(strictTimeZone);
  return (text2) => {
    let parts = text2.split(DATE_TIME_SEPARATOR);
    return parts.length === 2 && date(parts[0]) && time(parts[1]);
  };
}
function regex(text2) {
  if (Z_ANCHOR.test(text2))
    return !1;
  try {
    return new RegExp(text2), !0;
  } catch {
    return !1;
  }
}
function satisfiesFormat(name, value) {
  let format = JSON_SCHEMA_FORMATS[name];
  return format === void 0 ? !0 : format.type === "string" ? typeof value != "string" || format.validate(value) : typeof value != "number" || format.validate(value);
}
function deepEqual(left, right) {
  if (left === right)
    return !0;
  if (typeof left != "object" || typeof right != "object" || left === null || right === null || Array.isArray(left) !== Array.isArray(right))
    return !1;
  if (Array.isArray(left)) {
    let other = right;
    return left.length === other.length && left.every((item, index2) => deepEqual(item, other[index2]));
  }
  let leftKeys = Object.keys(left), rightRecord = right;
  return leftKeys.length !== Object.keys(rightRecord).length ? !1 : leftKeys.every((key) => Object.hasOwn(rightRecord, key) && deepEqual(left[key], rightRecord[key]));
}
function hasType(value, type) {
  switch (type) {
    case "null":
      return value === null;
    case "boolean":
      return typeof value == "boolean";
    case "string":
      return typeof value == "string";
    case "number":
      return typeof value == "number";
    case "integer":
      return typeof value == "number" && Number.isInteger(value);
    case "array":
      return Array.isArray(value);
    case "object":
      return isObject2(value);
    default:
      return !1;
  }
}
function codePointLength(text2) {
  let length = 0;
  for (let _ of text2)
    length += 1;
  return length;
}
function* schemaChildren(schema, dialect) {
  for (let [key, value] of Object.entries(schema))
    if (SCHEMA_KEYWORDS.includes(key))
      if (key === "items" && Array.isArray(value) && dialect === "draft-07")
        for (let child of value) isSchema(child) && (yield child);
      else isSchema(value) && (yield value);
    else if (SCHEMA_MAP_KEYWORDS.includes(key) || key === "dependencies" && dialect === "draft-07") {
      if (isObject2(value))
        for (let child of Object.values(value)) isSchema(child) && (yield child);
    } else if (SCHEMA_LIST_KEYWORDS.includes(key) && Array.isArray(value))
      for (let child of value) isSchema(child) && (yield child);
}
function documentIssues(schema, path, dialect, issues) {
  if (typeof schema == "boolean")
    return;
  if (!isObject2(schema)) {
    issues.push(issue("schema", path, "type", "must be object,boolean"));
    return;
  }
  let at = (key) => `${path}/${key.replace(/~/gu, "~0").replace(/\//gu, "~1")}`;
  for (let [key, value] of Object.entries(schema))
    if (key === "type")
      (typeof value == "string" ? TYPE_NAMES.includes(value) : Array.isArray(value) && value.every((item) => typeof item == "string" && TYPE_NAMES.includes(item))) || (issues.push(issue("schema", at(key), "enum", "must be equal to one of the allowed values")), issues.push(issue("schema", at(key), "type", "must be array")), issues.push(issue("schema", at(key), "anyOf", "must match a schema in anyOf")));
    else if (SCHEMA_KEYWORDS.includes(key))
      key === "items" && Array.isArray(value) ? dialect === "2020-12" ? issues.push(issue("schema", at(key), "type", "must be object,boolean")) : value.forEach((item, index2) => documentIssues(item, `${at(key)}/${index2}`, dialect, issues)) : documentIssues(value, at(key), dialect, issues);
    else if (SCHEMA_MAP_KEYWORDS.includes(key))
      if (!isObject2(value))
        issues.push(issue("schema", at(key), "type", "must be object"));
      else
        for (let [name, subschema] of Object.entries(value))
          documentIssues(subschema, `${at(key)}/${name.replace(/~/gu, "~0").replace(/\//gu, "~1")}`, dialect, issues);
    else if (SCHEMA_LIST_KEYWORDS.includes(key))
      Array.isArray(value) ? value.forEach((item, index2) => documentIssues(item, `${at(key)}/${index2}`, dialect, issues)) : issues.push(issue("schema", at(key), "type", "must be array"));
    else if (NON_NEGATIVE_KEYWORDS.includes(key))
      typeof value != "number" || !Number.isInteger(value) ? issues.push(issue("schema", at(key), "type", "must be integer")) : value < 0 && issues.push(issue("schema", at(key), "minimum", "must be >= 0"));
    else if (NUMBER_KEYWORDS.includes(key))
      typeof value != "number" && issues.push(issue("schema", at(key), "type", "must be number"));
    else if (key === "multipleOf")
      typeof value != "number" ? issues.push(issue("schema", at(key), "type", "must be number")) : value <= 0 && issues.push(issue("schema", at(key), "exclusiveMinimum", "must be > 0"));
    else if (STRING_KEYWORDS.includes(key))
      typeof value != "string" && issues.push(issue("schema", at(key), "type", "must be string"));
    else if (STRING_LIST_KEYWORDS.includes(key))
      Array.isArray(value) ? value.forEach((item, index2) => {
        typeof item != "string" && issues.push(issue("schema", `${at(key)}/${index2}`, "type", "must be string"));
      }) : issues.push(issue("schema", at(key), "type", "must be array"));
    else if (key === "enum")
      Array.isArray(value) || issues.push(issue("schema", at(key), "type", "must be array"));
    else if (key === "uniqueItems")
      typeof value != "boolean" && issues.push(issue("schema", at(key), "type", "must be boolean"));
    else if (key === "dependentRequired" || key === "dependencies" && dialect === "draft-07")
      if (!isObject2(value))
        issues.push(issue("schema", at(key), "type", "must be object"));
      else
        for (let [name, entry] of Object.entries(value))
          Array.isArray(entry) ? entry.forEach((item, index2) => {
            typeof item != "string" && issues.push(issue("schema", `${at(key)}/${name}/${index2}`, "type", "must be string"));
          }) : key === "dependentRequired" ? issues.push(issue("schema", `${at(key)}/${name}`, "type", "must be array")) : documentIssues(entry, `${at(key)}/${name}`, dialect, issues);
}
function isAbsoluteUri(text2) {
  return /^[a-z][a-z0-9+\-.]*:/iu.test(text2);
}
function splitFragment(uri) {
  let hash = uri.indexOf("#");
  return hash === -1 ? [uri, void 0] : [uri.slice(0, hash), uri.slice(hash + 1)];
}
function resolveSchemaUri(base, reference) {
  if (isAbsoluteUri(reference))
    return reference;
  if (reference.startsWith("#"))
    return splitFragment(base)[0] + reference;
  if (base === "")
    return reference;
  try {
    return new URL(reference, base).href;
  } catch {
    return reference;
  }
}
function unescapePointer(segment) {
  let decoded = decodeURIComponent(segment);
  if (/~(?:[^01]|$)/u.test(decoded))
    throw new TypeError("invalid JSON Pointer escape");
  return decoded.replace(/~1/gu, "/").replace(/~0/gu, "~");
}
function annotations() {
  return { properties: /* @__PURE__ */ new Set(), items: /* @__PURE__ */ new Set() };
}
function absorb(into, from) {
  for (let name of from.properties)
    into.properties.add(name);
  for (let index2 of from.items)
    into.items.add(index2);
}
function escapePath(name) {
  return name.replace(/~/gu, "~0").replace(/\//gu, "~1");
}
function findDuplicate(items, itemType) {
  if (typeof itemType == "string" ? SCALAR_TYPES.includes(itemType) : Array.isArray(itemType) && itemType.length > 0 && itemType.every((type) => SCALAR_TYPES.includes(type))) {
    let seen = /* @__PURE__ */ new Map();
    for (let index2 = items.length - 1; index2 >= 0; index2 -= 1) {
      let key = `${typeof items[index2]}:${String(items[index2])}`, previous = seen.get(key);
      if (previous !== void 0)
        return [previous, index2];
      seen.set(key, index2);
    }
    return;
  }
  for (let index2 = items.length - 1; index2 >= 0; index2 -= 1)
    for (let other = index2 - 1; other >= 0; other -= 1)
      if (deepEqual(items[index2], items[other]))
        return [other, index2];
}
function compileJsonSchema(schema, options = {}) {
  try {
    let references = structuredClone(options.references ?? []);
    schema = structuredClone(schema);
    let dialect = schemaDialect(schema), documentProblems = [];
    if (documentIssues(schema, "", dialect, documentProblems), documentProblems.length > 0) {
      let order = { enum: 0, type: 1, anyOf: 2 }, described = [...documentProblems].sort((a, b) => (order[a.keyword] ?? 9) - (order[b.keyword] ?? 9)).map((problem) => `data${problem.path} ${problem.message}`);
      throw new TypeError(`schema is invalid: ${described.join(", ")}`);
    }
    let graph = new SchemaGraph(schema, references);
    return graph.checkReferences(schema, /* @__PURE__ */ new Set()), Object.freeze({ validate(value) {
      try {
        let issues = [];
        return new Evaluator(graph).evaluate(schema, value, "", issues, annotations()), issues.length === 0 ? VALID : refused2(issues);
      } catch (error) {
        return refused2([schemaIssue(error)]);
      }
    } });
  } catch (error) {
    let result = refused2([schemaIssue(error)]);
    return Object.freeze({ validate: () => result });
  }
}
var SUPPORTED_DIALECTS, DRAFT_07, DRAFT_07_HTTPS, DRAFT_2020_12, MAX_DEPTH, VALID, TYPE_NAMES, regexFormat, stringFormat, numberFormat, DATE, DAYS, TIME, DATE_TIME_SEPARATOR, NOT_URI_FRAGMENT, URI, BYTE, Z_ANCHOR, MIN_INT32, MAX_INT32, JSON_SCHEMA_FORMATS, SCHEMA_KEYWORDS, SCHEMA_MAP_KEYWORDS, SCHEMA_LIST_KEYWORDS, NON_NEGATIVE_KEYWORDS, NUMBER_KEYWORDS, STRING_KEYWORDS, STRING_LIST_KEYWORDS, SchemaGraph, Evaluator, SCALAR_TYPES, init_validation = __esm({
  "node_modules/.pnpm/@red-cup-engineering+json-schema-services-section@0.5.0/node_modules/@red-cup-engineering/json-schema-services-section/src/validation.mjs"() {
    SUPPORTED_DIALECTS = Object.freeze([
      "https://json-schema.org/draft/2020-12/schema",
      "http://json-schema.org/draft-07/schema#"
    ]), DRAFT_07 = "http://json-schema.org/draft-07/schema#", DRAFT_07_HTTPS = "https://json-schema.org/draft-07/schema#", DRAFT_2020_12 = "https://json-schema.org/draft/2020-12/schema", MAX_DEPTH = 512, VALID = Object.freeze({ valid: !0, issues: Object.freeze([]) }), TYPE_NAMES = Object.freeze(["array", "boolean", "integer", "null", "number", "object", "string"]);
    regexFormat = (pattern) => Object.freeze({ type: "string", validate: (value) => pattern.test(value) }), stringFormat = (validate) => Object.freeze({ type: "string", validate }), numberFormat = (validate) => Object.freeze({ type: "number", validate });
    DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    DATE_TIME_SEPARATOR = /t|\s/i;
    NOT_URI_FRAGMENT = /\/|:/, URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, Z_ANCHOR = /[^\\]\\Z/, MIN_INT32 = -(2 ** 31), MAX_INT32 = 2 ** 31 - 1;
    JSON_SCHEMA_FORMATS = Object.freeze({
      date: stringFormat(date),
      time: stringFormat(timeOf(!0)),
      "date-time": stringFormat(dateTimeOf(!0)),
      "iso-time": stringFormat(timeOf(!1)),
      "iso-date-time": stringFormat(dateTimeOf(!1)),
      duration: regexFormat(/^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/),
      uri: stringFormat((text2) => NOT_URI_FRAGMENT.test(text2) && URI.test(text2)),
      "uri-reference": regexFormat(/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i),
      "uri-template": regexFormat(/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i),
      url: regexFormat(/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu),
      email: regexFormat(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i),
      hostname: regexFormat(/^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i),
      ipv4: regexFormat(/^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/),
      ipv6: regexFormat(/^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i),
      regex: stringFormat(regex),
      uuid: regexFormat(/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i),
      "json-pointer": regexFormat(/^(?:\/(?:[^~/]|~0|~1)*)*$/),
      "json-pointer-uri-fragment": regexFormat(/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i),
      "relative-json-pointer": regexFormat(/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/),
      byte: stringFormat((text2) => BYTE.test(text2)),
      int32: numberFormat((value) => Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32),
      int64: numberFormat((value) => Number.isInteger(value)),
      float: numberFormat(() => !0),
      double: numberFormat(() => !0),
      password: stringFormat(() => !0),
      binary: stringFormat(() => !0)
    });
    SCHEMA_KEYWORDS = Object.freeze(["additionalProperties", "additionalItems", "propertyNames", "contains", "not", "if", "then", "else", "unevaluatedProperties", "unevaluatedItems", "items"]), SCHEMA_MAP_KEYWORDS = Object.freeze(["properties", "patternProperties", "$defs", "definitions", "dependentSchemas"]), SCHEMA_LIST_KEYWORDS = Object.freeze(["allOf", "anyOf", "oneOf", "prefixItems"]);
    NON_NEGATIVE_KEYWORDS = Object.freeze(["minLength", "maxLength", "minItems", "maxItems", "minProperties", "maxProperties", "minContains", "maxContains"]), NUMBER_KEYWORDS = Object.freeze(["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum"]), STRING_KEYWORDS = Object.freeze(["$ref", "$id", "$anchor", "$dynamicRef", "$dynamicAnchor", "$comment", "format", "pattern", "title", "description", "$schema", "contentMediaType", "contentEncoding"]), STRING_LIST_KEYWORDS = Object.freeze(["required"]);
    SchemaGraph = class {
      documents = /* @__PURE__ */ new Map();
      anchors = /* @__PURE__ */ new Map();
      bases = /* @__PURE__ */ new WeakMap();
      dialect;
      constructor(root, references) {
        this.dialect = schemaDialect(root);
        for (let reference of references) {
          if (schemaDialect(reference) !== this.dialect)
            throw new TypeError("cross-schema references must use the root schema dialect");
          if (typeof reference == "boolean" || typeof reference.$id != "string")
            throw new TypeError("reference schemas must declare $id");
        }
        this.index(root, ""), this.documents.set("", { schema: root, base: this.baseOf(root) });
        for (let reference of references)
          this.index(reference, "");
      }
      register(uri, resolved) {
        let [document2, fragment] = splitFragment(uri), table = fragment === void 0 || fragment === "" ? this.documents : this.anchors, address = table === this.documents ? document2 : uri, prior = table.get(address);
        if (prior !== void 0) {
          if (prior.base !== resolved.base || !deepEqual(prior.schema, resolved.schema))
            throw new TypeError(`different schemas share reference address ${address}`);
          return;
        }
        table.set(address, resolved);
      }
      index(schema, parentBase) {
        if (typeof schema == "boolean")
          return;
        let base = parentBase, id = schema.$id;
        if (typeof id == "string" && id !== "") {
          let [document2, fragment] = splitFragment(resolveSchemaUri(parentBase, id));
          document2 !== "" && (fragment === void 0 || fragment === "") ? (base = document2, this.register(document2, { schema, base })) : fragment !== void 0 && fragment !== "" && !fragment.startsWith("/") && this.register(`${splitFragment(parentBase)[0]}#${fragment}`, { schema, base: parentBase });
        }
        this.bases.set(schema, base);
        for (let key of ["$anchor", "$dynamicAnchor"]) {
          let anchor = schema[key];
          typeof anchor == "string" && this.register(`${base}#${anchor}`, { schema, base });
        }
        for (let child of schemaChildren(schema, this.dialect))
          this.index(child, base);
      }
      baseOf(schema) {
        return typeof schema == "boolean" ? "" : this.bases.get(schema) ?? "";
      }
      resolve(reference, from) {
        let base = this.baseOf(from), target = resolveSchemaUri(base, reference), [document2, fragment] = splitFragment(target), anchored = this.anchors.get(target);
        if (anchored !== void 0)
          return anchored;
        let root = this.documents.get(document2);
        if (root === void 0)
          throw new TypeError(`can't resolve reference ${reference} from id ${base === "" ? "#" : base}`);
        if (fragment === void 0 || fragment === "")
          return root;
        if (!fragment.startsWith("/"))
          throw new TypeError(`can't resolve reference ${reference} from id ${base === "" ? "#" : base}`);
        let current = root.schema, currentBase = root.base;
        for (let segment of fragment.slice(1).split("/")) {
          let key = unescapePointer(segment);
          if (Array.isArray(current) ? current = /^(?:0|[1-9][0-9]*)$/u.test(key) && Object.hasOwn(current, key) ? current[key] : void 0 : isObject2(current) ? current = Object.hasOwn(current, key) ? current[key] : void 0 : current = void 0, current === void 0)
            throw new TypeError(`can't resolve reference ${reference} from id ${base === "" ? "#" : base}`);
          isObject2(current) && (currentBase = this.bases.get(current) ?? currentBase);
        }
        if (!isSchema(current))
          throw new TypeError(`can't resolve reference ${reference} from id ${base === "" ? "#" : base}`);
        return { schema: current, base: currentBase };
      }
      /** Resolve every $ref in the graph eagerly so an unresolvable reference is a compile-time schema issue. */
      checkReferences(schema, seen) {
        if (!(typeof schema == "boolean" || seen.has(schema))) {
          seen.add(schema);
          for (let keyword of ["$ref", "$dynamicRef"]) {
            let reference = schema[keyword];
            typeof reference == "string" && this.checkReferences(this.resolve(reference, schema).schema, seen);
          }
          for (let child of schemaChildren(schema, this.dialect))
            this.checkReferences(child, seen);
        }
      }
    };
    Evaluator = class {
      graph;
      constructor(graph) {
        this.graph = graph;
      }
      /** Evaluate `value` against `schema`; issues are appended to `issues`, evaluated members reported through `evaluated`. */
      evaluate(schema, value, path, issues, evaluated, depth = 0) {
        if (depth > MAX_DEPTH)
          throw new TypeError("schema reference recursion exceeds the evaluator's depth");
        if (schema === !0)
          return !0;
        if (schema === !1)
          return issues.push(issue("instance", path, "false schema", "boolean schema is false")), !1;
        let before = issues.length, dialect = this.graph.dialect, local = annotations(), sub = (subschema, subvalue, subpath, into, collected) => this.evaluate(subschema, subvalue, subpath, into, collected, depth + 1);
        for (let key of ["$ref", "$dynamicRef"]) {
          let reference = schema[key];
          if (typeof reference != "string")
            continue;
          let target = this.graph.resolve(reference, schema), collected = annotations();
          sub(target.schema, value, path, issues, collected) && absorb(local, collected);
        }
        let type = schema.type;
        if (type !== void 0) {
          let types = Array.isArray(type) ? type : [type];
          types.some((candidate) => hasType(value, candidate)) || issues.push(issue("instance", path, "type", `must be ${types.join(",")}`));
        }
        Object.hasOwn(schema, "const") && !deepEqual(value, schema.const) && issues.push(issue("instance", path, "const", "must be equal to constant"));
        let enumeration = schema.enum;
        if (Array.isArray(enumeration) && !enumeration.some((candidate) => deepEqual(candidate, value)) && issues.push(issue("instance", path, "enum", "must be equal to one of the allowed values")), typeof value == "string") {
          let minLength = schema.minLength, maxLength = schema.maxLength, pattern = schema.pattern, format = schema.format;
          typeof minLength == "number" && codePointLength(value) < minLength && issues.push(issue("instance", path, "minLength", `must NOT have fewer than ${minLength} characters`)), typeof maxLength == "number" && codePointLength(value) > maxLength && issues.push(issue("instance", path, "maxLength", `must NOT have more than ${maxLength} characters`)), typeof pattern == "string" && !new RegExp(pattern, "u").test(value) && issues.push(issue("instance", path, "pattern", `must match pattern "${pattern}"`)), typeof format == "string" && !satisfiesFormat(format, value) && issues.push(issue("instance", path, "format", `must match format "${format}"`));
        }
        if (typeof value == "number") {
          let format = schema.format, minimum = schema.minimum, maximum = schema.maximum, exclusiveMinimum = schema.exclusiveMinimum, exclusiveMaximum = schema.exclusiveMaximum, multipleOf = schema.multipleOf;
          typeof minimum == "number" && !(value >= minimum) && issues.push(issue("instance", path, "minimum", `must be >= ${minimum}`)), typeof maximum == "number" && !(value <= maximum) && issues.push(issue("instance", path, "maximum", `must be <= ${maximum}`)), typeof exclusiveMinimum == "number" && !(value > exclusiveMinimum) && issues.push(issue("instance", path, "exclusiveMinimum", `must be > ${exclusiveMinimum}`)), typeof exclusiveMaximum == "number" && !(value < exclusiveMaximum) && issues.push(issue("instance", path, "exclusiveMaximum", `must be < ${exclusiveMaximum}`)), typeof multipleOf == "number" && !Number.isInteger(value / multipleOf) && issues.push(issue("instance", path, "multipleOf", `must be multiple of ${multipleOf}`)), typeof format == "string" && !satisfiesFormat(format, value) && issues.push(issue("instance", path, "format", `must match format "${format}"`));
        }
        Array.isArray(value) && this.evaluateArray(schema, value, path, issues, local, dialect, sub), isObject2(value) && this.evaluateObject(schema, value, path, issues, local, dialect, sub);
        let allOf = schema.allOf;
        if (Array.isArray(allOf)) {
          let collected = annotations(), valid2 = !0;
          for (let branch of allOf)
            isSchema(branch) && !sub(branch, value, path, issues, collected) && (valid2 = !1);
          valid2 && absorb(local, collected);
        }
        let anyOf = schema.anyOf;
        if (Array.isArray(anyOf)) {
          let branchIssues = [], valid2 = !1;
          for (let branch of anyOf) {
            if (!isSchema(branch))
              continue;
            let prefix = typeof branch == "object" ? branch.prefixItems : void 0, tag = Array.isArray(prefix) ? prefix[0] : void 0;
            if (Array.isArray(value) && value.length > 0 && isObject2(tag) && Object.hasOwn(tag, "const") && !deepEqual(value[0], tag.const))
              continue;
            let collected = annotations();
            sub(branch, value, path, branchIssues, collected) && (valid2 = !0, absorb(local, collected));
          }
          if (!valid2) {
            for (let branch of anyOf)
              isSchema(branch) && sub(branch, value, path, issues, annotations());
            issues.push(issue("instance", path, "anyOf", "must match a schema in anyOf"));
          }
        }
        let oneOf = schema.oneOf;
        if (Array.isArray(oneOf)) {
          let branchIssues = [], matches = 0, matched;
          for (let branch of oneOf) {
            if (!isSchema(branch))
              continue;
            let collected = annotations();
            sub(branch, value, path, branchIssues, collected) && (matches += 1, matched = collected);
          }
          matches === 1 && matched ? absorb(local, matched) : issues.push(...matches === 0 ? branchIssues : [], issue("instance", path, "oneOf", "must match exactly one schema in oneOf"));
        }
        let not = schema.not;
        isSchema(not) && sub(not, value, path, [], annotations()) && issues.push(issue("instance", path, "not", "must NOT be valid"));
        let condition = schema.if;
        if (isSchema(condition)) {
          let collected = annotations(), branchKey = sub(condition, value, path, [], collected) ? "then" : "else";
          branchKey === "then" && absorb(local, collected);
          let branch = schema[branchKey];
          if (isSchema(branch)) {
            let branchIssues = [], branchCollected = annotations();
            sub(branch, value, path, branchIssues, branchCollected) ? absorb(local, branchCollected) : issues.push(...branchIssues, issue("instance", path, "if", `must match "${branchKey}" schema`));
          }
        }
        if (isObject2(value)) {
          let unevaluatedProperties = schema.unevaluatedProperties;
          if (isSchema(unevaluatedProperties))
            for (let name of Object.keys(value))
              local.properties.has(name) || (unevaluatedProperties === !1 ? issues.push(issue("instance", path, "unevaluatedProperties", "must NOT have unevaluated properties")) : sub(unevaluatedProperties, value[name], `${path}/${escapePath(name)}`, issues, annotations()), local.properties.add(name));
        }
        if (Array.isArray(value)) {
          let unevaluatedItems = schema.unevaluatedItems;
          if (isSchema(unevaluatedItems)) {
            for (let index2 = 0; index2 < value.length; index2 += 1)
              if (!local.items.has(index2)) {
                if (unevaluatedItems === !1) {
                  issues.push(issue("instance", path, "unevaluatedItems", `must NOT have more than ${index2} items`));
                  break;
                }
                sub(unevaluatedItems, value[index2], `${path}/${index2}`, issues, annotations()), local.items.add(index2);
              }
          }
        }
        let valid = issues.length === before;
        return valid && absorb(evaluated, local), valid;
      }
      evaluateArray(schema, value, path, issues, local, dialect, sub) {
        let prefixItems = schema.prefixItems, items = schema.items, additionalItems = schema.additionalItems, prefixed = 0, tuple2 = Array.isArray(prefixItems) ? prefixItems : dialect === "draft-07" && Array.isArray(items) ? items : void 0, tail = Array.isArray(prefixItems) || dialect === "draft-07" && Array.isArray(items) ? Array.isArray(prefixItems) ? items : additionalItems : items, tailKeyword = Array.isArray(prefixItems) ? "items" : dialect === "draft-07" && Array.isArray(items) ? "additionalItems" : "items";
        if (tuple2 !== void 0) {
          prefixed = Math.min(tuple2.length, value.length);
          for (let index2 = 0; index2 < prefixed; index2 += 1) {
            let item = tuple2[index2];
            isSchema(item) && sub(item, value[index2], `${path}/${index2}`, issues, annotations()), local.items.add(index2);
          }
        }
        if (tail === !1)
          value.length > prefixed && issues.push(issue("instance", path, tailKeyword, `must NOT have more than ${prefixed} items`));
        else if (isSchema(tail))
          for (let index2 = prefixed; index2 < value.length; index2 += 1)
            sub(tail, value[index2], `${path}/${index2}`, issues, annotations()), local.items.add(index2);
        let contains = schema.contains;
        if (isSchema(contains)) {
          let minContains = typeof schema.minContains == "number" ? schema.minContains : 1, maxContains = schema.maxContains, itemIssues = [], count = 0;
          for (let index2 = 0; index2 < value.length; index2 += 1)
            sub(contains, value[index2], `${path}/${index2}`, itemIssues, annotations()) && (count += 1, local.items.add(index2));
          let bound = typeof maxContains == "number" ? `must contain at least ${minContains} and no more than ${maxContains} valid item(s)` : `must contain at least ${minContains} valid item(s)`;
          count < minContains ? issues.push(...minContains === 1 ? itemIssues : [], issue("instance", path, "contains", bound)) : typeof maxContains == "number" && count > maxContains && issues.push(issue("instance", path, "contains", bound));
        }
        let minItems = schema.minItems, maxItems = schema.maxItems;
        if (typeof minItems == "number" && value.length < minItems && issues.push(issue("instance", path, "minItems", `must NOT have fewer than ${minItems} items`)), typeof maxItems == "number" && value.length > maxItems && issues.push(issue("instance", path, "maxItems", `must NOT have more than ${maxItems} items`)), schema.uniqueItems === !0) {
          let duplicate = findDuplicate(value, isObject2(items) ? items.type : void 0);
          duplicate && issues.push(issue("instance", path, "uniqueItems", `must NOT have duplicate items (items ## ${duplicate[0]} and ${duplicate[1]} are identical)`));
        }
      }
      evaluateObject(schema, value, path, issues, local, dialect, sub) {
        let required2 = schema.required;
        if (Array.isArray(required2))
          for (let name of required2)
            typeof name == "string" && (!Object.hasOwn(value, name) || value[name] === void 0) && issues.push(issue("instance", path, "required", `must have required property '${name}'`));
        let minProperties = schema.minProperties, maxProperties = schema.maxProperties, count = Object.keys(value).length;
        typeof minProperties == "number" && count < minProperties && issues.push(issue("instance", path, "minProperties", `must NOT have fewer than ${minProperties} properties`)), typeof maxProperties == "number" && count > maxProperties && issues.push(issue("instance", path, "maxProperties", `must NOT have more than ${maxProperties} properties`));
        let dependencyKeyword = dialect === "draft-07" && isObject2(schema.dependencies) ? "dependencies" : "dependentRequired", dependentRequired = schema[dependencyKeyword];
        if (isObject2(dependentRequired)) {
          for (let [name, dependents] of Object.entries(dependentRequired))
            if (!(!Object.hasOwn(value, name) || value[name] === void 0)) {
              if (Array.isArray(dependents))
                for (let dependent of dependents)
                  typeof dependent == "string" && (!Object.hasOwn(value, dependent) || value[dependent] === void 0) && issues.push(issue("instance", path, dependencyKeyword, `must have property ${dependent} when property ${name} is present`));
              else if (isSchema(dependents)) {
                let collected = annotations();
                sub(dependents, value, path, issues, collected) && absorb(local, collected);
              }
            }
        }
        let dependentSchemas = schema.dependentSchemas;
        if (isObject2(dependentSchemas))
          for (let [name, dependent] of Object.entries(dependentSchemas)) {
            if (!Object.hasOwn(value, name) || value[name] === void 0 || !isSchema(dependent))
              continue;
            let collected = annotations();
            sub(dependent, value, path, issues, collected) && absorb(local, collected);
          }
        let propertyNames = schema.propertyNames;
        if (isSchema(propertyNames))
          for (let name of Object.keys(value))
            sub(propertyNames, name, path, issues, annotations()) || issues.push(issue("instance", path, "propertyNames", "property name must be valid"));
        let properties = schema.properties, patternProperties = schema.patternProperties, additionalProperties = schema.additionalProperties, patterns = isObject2(patternProperties) ? Object.entries(patternProperties).map(([pattern, subschema]) => [new RegExp(pattern, "u"), subschema]) : [];
        for (let [name, member] of Object.entries(value)) {
          let memberPath = `${path}/${escapePath(name)}`, evaluatedHere = !1;
          if (isObject2(properties) && Object.hasOwn(properties, name)) {
            let subschema = properties[name];
            isSchema(subschema) && member !== void 0 && sub(subschema, member, memberPath, issues, annotations()), evaluatedHere = !0;
          }
          for (let [pattern, subschema] of patterns)
            pattern.test(name) && (isSchema(subschema) && sub(subschema, member, memberPath, issues, annotations()), evaluatedHere = !0);
          !evaluatedHere && additionalProperties !== void 0 && (additionalProperties === !1 ? issues.push(issue("instance", path, "additionalProperties", "must NOT have additional properties")) : isSchema(additionalProperties) && sub(additionalProperties, member, memberPath, issues, annotations()), evaluatedHere = !0), evaluatedHere && local.properties.add(name);
        }
      }
    };
    SCALAR_TYPES = Object.freeze(["string", "number", "integer", "boolean", "null"]);
  }
});

// node_modules/.pnpm/@red-cup-engineering+signcell@0.2.0/node_modules/@red-cup-engineering/signcell/src/type-system/type-system.mjs
function dataRecord(value) {
  return value === null || typeof value != "object" || Array.isArray(value) || !Object.isFrozen(value) ? !1 : Object.values(Object.getOwnPropertyDescriptors(value)).every((descriptor) => "value" in descriptor);
}
function compiledFor(type) {
  if (!dataRecord(type) || !Object.hasOwn(type, "schema") || !Object.hasOwn(type, "references"))
    return;
  let cached = compiledSchemas.get(type);
  if (cached !== void 0)
    return cached;
  let references = type.references;
  if (!Array.isArray(references) || !Object.isFrozen(references))
    return;
  let compiled = compileJsonSchema(type.schema, { references });
  return compiled.validate(void 0).issues.some((issue2) => issue2.kind === "schema") ? void 0 : compiled;
}
function freeze(value) {
  return Object.freeze(value);
}
function immutableCopy2(value) {
  if (Array.isArray(value))
    return freeze(value.map(immutableCopy2));
  if (value !== null && typeof value == "object") {
    let entries = Object.entries(value).map(([key, entry]) => [key, immutableCopy2(entry)]);
    return freeze(Object.fromEntries(entries));
  }
  return value;
}
function definitionRefusal(kind, message2, issues = []) {
  return freeze({ ok: !1, refusal: freeze({ kind, message: message2, issues: freeze([...issues]) }) });
}
function validDefinition(definition2) {
  if (definition2.id.trim() === "")
    return "type id must be non-empty";
  if (definition2.name.trim() === "")
    return "type name must be non-empty";
  if (definition2.description.trim() === "")
    return "type description must be non-empty";
  if (definition2.parents.some((parent) => compiledFor(parent) === void 0))
    return "parents must be established type declarations";
  let ids = definition2.parents.map((parent) => parent.id);
  if (ids.includes(definition2.id))
    return "a type cannot specialize its own identifier";
  if (new Set(ids).size !== ids.length)
    return "a type may name each parent once";
}
function defineType(definition2) {
  let malformed = validDefinition(definition2);
  if (malformed !== void 0)
    return definitionRefusal("invalid-definition", malformed);
  let copiedSchema = immutableCopy2(definition2.schema), references = immutableCopy2(definition2.references ?? []), compiled = compileJsonSchema(copiedSchema, { references }), schemaIssues = compiled.validate(void 0).issues.filter((issue2) => issue2.kind === "schema");
  if (schemaIssues.length > 0)
    return definitionRefusal("invalid-schema", "type schema is not a valid supported JSON Schema document", schemaIssues);
  let parents = freeze([...definition2.parents]), type = freeze({
    id: definition2.id,
    name: definition2.name,
    description: definition2.description,
    schema: copiedSchema,
    references,
    parentIds: freeze(parents.map((parent) => parent.id)),
    parents
  });
  return compiledSchemas.set(type, compiled), freeze({
    ok: !0,
    value: type
  });
}
function refused3(typeId, issues) {
  return freeze({ ok: !1, refusal: freeze({ kind: "not-admitted", typeId, issues: freeze([...issues]) }) });
}
function admit(type, value) {
  let compiled = compiledFor(type);
  if (compiled === void 0)
    return refused3(type.id, [freeze({ kind: "schema", path: "", keyword: "declaration", message: "type was not established by defineType" })]);
  for (let parent of type.parents) {
    let parentResult = admit(parent, value);
    if (!parentResult.ok)
      return parentResult;
  }
  let result = compiled.validate(value);
  return result.valid ? freeze({ ok: !0, value }) : refused3(type.id, result.issues);
}
var compiledSchemas, instantiate, init_type_system = __esm({
  "node_modules/.pnpm/@red-cup-engineering+signcell@0.2.0/node_modules/@red-cup-engineering/signcell/src/type-system/type-system.mjs"() {
    init_validation();
    init_semiotic_content_address();
    compiledSchemas = /* @__PURE__ */ new WeakMap();
    instantiate = admit;
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/utils.js"(exports) {
    "use strict";
    exports.removeLeadingAndTrailingHTTPWhitespace = (string) => string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
    exports.removeTrailingHTTPWhitespace = (string) => string.replace(/[ \t\n\r]+$/u, "");
    exports.isHTTPWhitespaceChar = (char) => char === " " || char === "	" || char === `
` || char === "\r";
    exports.solelyContainsHTTPTokenCodePoints = (string) => /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
    exports.soleyContainsHTTPQuotedStringTokenCodePoints = (string) => /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
    exports.asciiLowercase = (string) => string.replace(/[A-Z]/ug, (l) => l.toLowerCase());
    exports.collectAnHTTPQuotedString = (input, position) => {
      let value = "";
      for (position++; ; ) {
        for (; position < input.length && input[position] !== '"' && input[position] !== "\\"; )
          value += input[position], ++position;
        if (position >= input.length)
          break;
        let quoteOrBackslash = input[position];
        if (++position, quoteOrBackslash === "\\") {
          if (position >= input.length) {
            value += "\\";
            break;
          }
          value += input[position], ++position;
        } else
          break;
      }
      return [value, position];
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/mime-type-parameters.js
var require_mime_type_parameters = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/mime-type-parameters.js"(exports, module) {
    "use strict";
    var {
      asciiLowercase,
      solelyContainsHTTPTokenCodePoints,
      soleyContainsHTTPQuotedStringTokenCodePoints
    } = require_utils();
    module.exports = class {
      constructor(map) {
        this._map = map;
      }
      get size() {
        return this._map.size;
      }
      get(name) {
        return name = asciiLowercase(String(name)), this._map.get(name);
      }
      has(name) {
        return name = asciiLowercase(String(name)), this._map.has(name);
      }
      set(name, value) {
        if (name = asciiLowercase(String(name)), value = String(value), !solelyContainsHTTPTokenCodePoints(name))
          throw new Error(`Invalid MIME type parameter name "${name}": only HTTP token code points are valid.`);
        if (!soleyContainsHTTPQuotedStringTokenCodePoints(value))
          throw new Error(`Invalid MIME type parameter value "${value}": only HTTP quoted-string token code points are valid.`);
        return this._map.set(name, value);
      }
      clear() {
        this._map.clear();
      }
      delete(name) {
        return name = asciiLowercase(String(name)), this._map.delete(name);
      }
      forEach(callbackFn, thisArg) {
        this._map.forEach(callbackFn, thisArg);
      }
      keys() {
        return this._map.keys();
      }
      values() {
        return this._map.values();
      }
      entries() {
        return this._map.entries();
      }
      [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
      }
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/parser.js"(exports, module) {
    "use strict";
    var {
      removeLeadingAndTrailingHTTPWhitespace,
      removeTrailingHTTPWhitespace,
      isHTTPWhitespaceChar,
      solelyContainsHTTPTokenCodePoints,
      soleyContainsHTTPQuotedStringTokenCodePoints,
      asciiLowercase,
      collectAnHTTPQuotedString
    } = require_utils();
    module.exports = (input) => {
      input = removeLeadingAndTrailingHTTPWhitespace(input);
      let position = 0, type = "";
      for (; position < input.length && input[position] !== "/"; )
        type += input[position], ++position;
      if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type) || position >= input.length)
        return null;
      ++position;
      let subtype = "";
      for (; position < input.length && input[position] !== ";"; )
        subtype += input[position], ++position;
      if (subtype = removeTrailingHTTPWhitespace(subtype), subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype))
        return null;
      let mimeType = {
        type: asciiLowercase(type),
        subtype: asciiLowercase(subtype),
        parameters: /* @__PURE__ */ new Map()
      };
      for (; position < input.length; ) {
        for (++position; isHTTPWhitespaceChar(input[position]); )
          ++position;
        let parameterName = "";
        for (; position < input.length && input[position] !== ";" && input[position] !== "="; )
          parameterName += input[position], ++position;
        if (parameterName = asciiLowercase(parameterName), position < input.length) {
          if (input[position] === ";")
            continue;
          ++position;
        }
        let parameterValue = null;
        if (input[position] === '"')
          for ([parameterValue, position] = collectAnHTTPQuotedString(input, position); position < input.length && input[position] !== ";"; )
            ++position;
        else {
          for (parameterValue = ""; position < input.length && input[position] !== ";"; )
            parameterValue += input[position], ++position;
          if (parameterValue = removeTrailingHTTPWhitespace(parameterValue), parameterValue === "")
            continue;
        }
        parameterName.length > 0 && solelyContainsHTTPTokenCodePoints(parameterName) && soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) && !mimeType.parameters.has(parameterName) && mimeType.parameters.set(parameterName, parameterValue);
      }
      return mimeType;
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/serializer.js
var require_serializer = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/serializer.js"(exports, module) {
    "use strict";
    var { solelyContainsHTTPTokenCodePoints } = require_utils();
    module.exports = (mimeType) => {
      let serialization = `${mimeType.type}/${mimeType.subtype}`;
      if (mimeType.parameters.size === 0)
        return serialization;
      for (let [name, value] of mimeType.parameters)
        serialization += ";", serialization += name, serialization += "=", (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) && (value = value.replace(/(["\\])/ug, "\\$1"), value = `"${value}"`), serialization += value;
      return serialization;
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/mime-type.js
var require_mime_type = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/mime-type.js"(exports, module) {
    "use strict";
    var MIMETypeParameters = require_mime_type_parameters(), parse = require_parser(), serialize2 = require_serializer(), {
      asciiLowercase,
      solelyContainsHTTPTokenCodePoints
    } = require_utils();
    module.exports = class {
      constructor(string) {
        string = String(string);
        let result = parse(string);
        if (result === null)
          throw new Error(`Could not parse MIME type string "${string}"`);
        this._type = result.type, this._subtype = result.subtype, this._parameters = new MIMETypeParameters(result.parameters);
      }
      static parse(string) {
        try {
          return new this(string);
        } catch {
          return null;
        }
      }
      get essence() {
        return `${this.type}/${this.subtype}`;
      }
      get type() {
        return this._type;
      }
      set type(value) {
        if (value = asciiLowercase(String(value)), value.length === 0)
          throw new Error("Invalid type: must be a non-empty string");
        if (!solelyContainsHTTPTokenCodePoints(value))
          throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);
        this._type = value;
      }
      get subtype() {
        return this._subtype;
      }
      set subtype(value) {
        if (value = asciiLowercase(String(value)), value.length === 0)
          throw new Error("Invalid subtype: must be a non-empty string");
        if (!solelyContainsHTTPTokenCodePoints(value))
          throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);
        this._subtype = value;
      }
      get parameters() {
        return this._parameters;
      }
      toString() {
        return serialize2(this);
      }
      isJavaScript({ prohibitParameters = !1 } = {}) {
        switch (this._type) {
          case "text":
            switch (this._subtype) {
              case "ecmascript":
              case "javascript":
              case "javascript1.0":
              case "javascript1.1":
              case "javascript1.2":
              case "javascript1.3":
              case "javascript1.4":
              case "javascript1.5":
              case "jscript":
              case "livescript":
              case "x-ecmascript":
              case "x-javascript":
                return !prohibitParameters || this._parameters.size === 0;
              default:
                return !1;
            }
          case "application":
            switch (this._subtype) {
              case "ecmascript":
              case "javascript":
              case "x-ecmascript":
              case "x-javascript":
                return !prohibitParameters || this._parameters.size === 0;
              default:
                return !1;
            }
          default:
            return !1;
        }
      }
      isXML() {
        return this._subtype === "xml" && (this._type === "text" || this._type === "application") || this._subtype.endsWith("+xml");
      }
      isHTML() {
        return this._subtype === "html" && this._type === "text";
      }
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/sniff.js
var require_sniff = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/sniff.js"(exports, module) {
    "use strict";
    var MIMEType2 = require_mime_type();
    function normalizeMIMEType(input) {
      return MIMEType2.parse(`${input}`);
    }
    function isXMLMIMEType(mimeType) {
      return mimeType.subtype.endsWith("+xml") || mimeType.type === "text" && mimeType.subtype === "xml" || mimeType.type === "application" && mimeType.subtype === "xml";
    }
    function isHTMLMIMEType(mimeType) {
      return mimeType.type === "text" && mimeType.subtype === "html";
    }
    var RESOURCE_HEADER_LENGTH = 1445;
    function getResourceHeader(resource) {
      return resource.length <= RESOURCE_HEADER_LENGTH ? resource : resource.subarray(0, RESOURCE_HEADER_LENGTH);
    }
    function isImageMIMEType(mimeType) {
      return mimeType.type === "image";
    }
    function isAudioOrVideoMIMEType(mimeType) {
      return mimeType.type === "audio" || mimeType.type === "video" || mimeType.type === "application" && mimeType.subtype === "ogg";
    }
    function isWhitespaceByte(byte) {
      return byte === 9 || byte === 10 || byte === 12 || byte === 13 || byte === 32;
    }
    function isBinaryDataByte(byte) {
      return byte >= 0 && byte <= 8 || byte === 11 || byte >= 14 && byte <= 26 || byte >= 28 && byte <= 31;
    }
    function matchesSignature(resource, signature) {
      let { pattern, mask, ignoredLeadingBytes, mimeType } = signature, s = 0;
      if (ignoredLeadingBytes)
        for (; s < resource.length && ignoredLeadingBytes(resource[s]); )
          s++;
      if (resource.length < s + pattern.length)
        return null;
      for (let i = 0; i < pattern.length; i++)
        if ((resource[s + i] & mask[i]) !== (pattern[i] & mask[i]))
          return null;
      return mimeType;
    }
    var step1Table = [
      // <!DOCTYPE HTML TT
      {
        pattern: [60, 33, 68, 79, 67, 84, 89, 80, 69, 32, 72, 84, 77, 76, 32],
        mask: [255, 255, 223, 223, 223, 223, 223, 223, 223, 255, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <HTML TT
      {
        pattern: [60, 72, 84, 77, 76, 32],
        mask: [255, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <HEAD TT
      {
        pattern: [60, 72, 69, 65, 68, 32],
        mask: [255, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <SCRIPT TT
      {
        pattern: [60, 83, 67, 82, 73, 80, 84, 32],
        mask: [255, 223, 223, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <IFRAME TT
      {
        pattern: [60, 73, 70, 82, 65, 77, 69, 32],
        mask: [255, 223, 223, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <H1 TT
      {
        pattern: [60, 72, 49, 32],
        mask: [255, 223, 255, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <DIV TT
      {
        pattern: [60, 68, 73, 86, 32],
        mask: [255, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <FONT TT
      {
        pattern: [60, 70, 79, 78, 84, 32],
        mask: [255, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <TABLE TT
      {
        pattern: [60, 84, 65, 66, 76, 69, 32],
        mask: [255, 223, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <A TT
      {
        pattern: [60, 65, 32],
        mask: [255, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <STYLE TT
      {
        pattern: [60, 83, 84, 89, 76, 69, 32],
        mask: [255, 223, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <TITLE TT
      {
        pattern: [60, 84, 73, 84, 76, 69, 32],
        mask: [255, 223, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <B TT
      {
        pattern: [60, 66, 32],
        mask: [255, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <BODY TT
      {
        pattern: [60, 66, 79, 68, 89, 32],
        mask: [255, 223, 223, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <BR TT
      {
        pattern: [60, 66, 82, 32],
        mask: [255, 223, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <P TT
      {
        pattern: [60, 80, 32],
        mask: [255, 223, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <!-- TT
      {
        pattern: [60, 33, 45, 45, 32],
        mask: [255, 255, 255, 255, 225],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/html"
      },
      // <?xml
      {
        pattern: [60, 63, 120, 109, 108],
        mask: [255, 255, 255, 255, 255],
        ignoredLeadingBytes: isWhitespaceByte,
        mimeType: "text/xml"
      },
      // %PDF-
      {
        pattern: [37, 80, 68, 70, 45],
        mask: [255, 255, 255, 255, 255],
        mimeType: "application/pdf"
      }
    ], step2Table = [
      // %!PS-Adobe-
      {
        pattern: [37, 33, 80, 83, 45, 65, 100, 111, 98, 101, 45],
        mask: [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
        mimeType: "application/postscript"
      },
      // UTF-16BE BOM
      {
        pattern: [254, 255, 0, 0],
        mask: [255, 255, 0, 0],
        mimeType: "text/plain"
      },
      // UTF-16LE BOM
      {
        pattern: [255, 254, 0, 0],
        mask: [255, 255, 0, 0],
        mimeType: "text/plain"
      },
      // UTF-8 BOM
      {
        pattern: [239, 187, 191, 0],
        mask: [255, 255, 255, 0],
        mimeType: "text/plain"
      }
    ], imageSignatures = [
      { pattern: [0, 0, 1, 0], mask: [255, 255, 255, 255], mimeType: "image/x-icon" },
      { pattern: [0, 0, 2, 0], mask: [255, 255, 255, 255], mimeType: "image/x-icon" },
      { pattern: [66, 77], mask: [255, 255], mimeType: "image/bmp" },
      {
        pattern: [71, 73, 70, 56, 55, 97],
        mask: [255, 255, 255, 255, 255, 255],
        mimeType: "image/gif"
      },
      {
        pattern: [71, 73, 70, 56, 57, 97],
        mask: [255, 255, 255, 255, 255, 255],
        mimeType: "image/gif"
      },
      {
        pattern: [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80, 86, 80],
        mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255],
        mimeType: "image/webp"
      },
      {
        pattern: [137, 80, 78, 71, 13, 10, 26, 10],
        mask: [255, 255, 255, 255, 255, 255, 255, 255],
        mimeType: "image/png"
      },
      { pattern: [255, 216, 255], mask: [255, 255, 255], mimeType: "image/jpeg" }
    ], audioVideoSignatures = [
      {
        pattern: [70, 79, 82, 77, 0, 0, 0, 0, 65, 73, 70, 70],
        mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255],
        mimeType: "audio/aiff"
      },
      { pattern: [73, 68, 51], mask: [255, 255, 255], mimeType: "audio/mpeg" },
      {
        pattern: [79, 103, 103, 83, 0],
        mask: [255, 255, 255, 255, 255],
        mimeType: "application/ogg"
      },
      {
        pattern: [77, 84, 104, 100, 0, 0, 0, 6],
        mask: [255, 255, 255, 255, 255, 255, 255, 255],
        mimeType: "audio/midi"
      },
      {
        pattern: [82, 73, 70, 70, 0, 0, 0, 0, 65, 86, 73, 32],
        mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255],
        mimeType: "video/avi"
      },
      {
        pattern: [82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69],
        mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255],
        mimeType: "audio/wave"
      }
    ];
    function matchMP4(resource) {
      if (resource.length < 12 || resource[4] !== 102 || resource[5] !== 116 || resource[6] !== 121 || resource[7] !== 112)
        return null;
      let length = resource[0] << 24 | resource[1] << 16 | resource[2] << 8 | resource[3];
      if (length < 12 || length > resource.length)
        return null;
      let brand = String.fromCharCode(resource[8], resource[9], resource[10], resource[11]), mp4Brands = ["mp41", "mp42", "isom", "iso2", "mmp4", "M4V ", "M4A ", "M4P ", "avc1"];
      if (mp4Brands.includes(brand))
        return "video/mp4";
      for (let i = 16; i + 4 <= length && i + 4 <= resource.length; i += 4) {
        let compat = String.fromCharCode(resource[i], resource[i + 1], resource[i + 2], resource[i + 3]);
        if (mp4Brands.includes(compat))
          return "video/mp4";
      }
      return null;
    }
    function parseVint(sequence, iter) {
      let mask = 128, maxVintLength = 8, numberSize = 1;
      for (; numberSize < maxVintLength && numberSize < sequence.length && (sequence[iter] & mask) === 0; )
        mask >>= 1, ++numberSize;
      return numberSize;
    }
    function matchPaddedSequence(sequence, offset, pattern) {
      for (; offset < sequence.length && sequence[offset] === 0; )
        offset++;
      if (sequence.length < offset + pattern.length)
        return !1;
      for (let i = 0; i < pattern.length; i++)
        if (sequence[offset + i] !== pattern[i])
          return !1;
      return !0;
    }
    function matchWebM(resource) {
      let { length } = resource;
      if (length < 4 || resource[0] !== 26 || resource[1] !== 69 || resource[2] !== 223 || resource[3] !== 163)
        return null;
      let iter = 4;
      for (; iter < length && iter < 38; ) {
        if (iter + 1 < length && resource[iter] === 66 && resource[iter + 1] === 130) {
          if (iter += 2, iter >= length)
            break;
          let numberSize = parseVint(resource, iter);
          if (iter += numberSize, iter >= length - 4)
            break;
          if (matchPaddedSequence(resource, iter, [119, 101, 98, 109]))
            return "video/webm";
        }
        iter++;
      }
      return null;
    }
    var mp3Rates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0], mp25Rates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0], sampleRates = [44100, 48e3, 32e3, 0];
    function matchMP3Header(sequence, s) {
      let { length } = sequence;
      if (length < s + 4 || sequence[s] !== 255 || (sequence[s + 1] & 224) !== 224)
        return !1;
      let layer = (sequence[s + 1] & 6) >> 1;
      return !(layer === 0 || (sequence[s + 2] & 240) >> 4 === 15 || (sequence[s + 2] & 12) >> 2 === 3 || (4 - layer & 3) !== 3);
    }
    function parseMP3Frame(sequence, s) {
      let version = (sequence[s + 1] & 24) >> 3, bitrateIndex = (sequence[s + 2] & 240) >> 4, bitrate = (version & 1) !== 0 ? mp3Rates[bitrateIndex] : mp25Rates[bitrateIndex], samplerateIndex = (sequence[s + 2] & 12) >> 2, samplerate = sampleRates[samplerateIndex], pad = (sequence[s + 2] & 2) >> 1;
      return { version, bitrate, samplerate, pad };
    }
    function computeMP3FrameSize(version, bitrate, samplerate, pad) {
      let scale = version === 1 ? 72 : 144, size = Math.floor(bitrate * 1e3 * scale / samplerate);
      return pad !== 0 && (size += 1), size;
    }
    function matchMP3WithoutID3(resource) {
      let { length } = resource, s = 0;
      if (!matchMP3Header(resource, s))
        return null;
      let { version, bitrate, samplerate, pad } = parseMP3Frame(resource, s), skippedBytes = computeMP3FrameSize(version, bitrate, samplerate, pad);
      return skippedBytes < 4 || skippedBytes > length - s || (s += skippedBytes, !matchMP3Header(resource, s)) ? null : "audio/mpeg";
    }
    var archiveSignatures = [
      { pattern: [31, 139, 8], mask: [255, 255, 255], mimeType: "application/x-gzip" },
      { pattern: [80, 75, 3, 4], mask: [255, 255, 255, 255], mimeType: "application/zip" },
      {
        pattern: [82, 97, 114, 33, 26, 7, 0],
        mask: [255, 255, 255, 255, 255, 255, 255],
        mimeType: "application/x-rar-compressed"
      }
    ];
    function matchImageType(resource) {
      for (let sig of imageSignatures) {
        let result = matchesSignature(resource, sig);
        if (result)
          return result;
      }
      return null;
    }
    function matchAudioOrVideoType(resource) {
      for (let sig of audioVideoSignatures) {
        let result = matchesSignature(resource, sig);
        if (result)
          return result;
      }
      let mp4Result = matchMP4(resource);
      if (mp4Result)
        return mp4Result;
      let webmResult = matchWebM(resource);
      if (webmResult)
        return webmResult;
      let mp3Result = matchMP3WithoutID3(resource);
      return mp3Result || null;
    }
    function distinguishTextOrBinary(resourceHeader) {
      let { length } = resourceHeader;
      if (length >= 2 && (resourceHeader[0] === 254 && resourceHeader[1] === 255 || resourceHeader[0] === 255 && resourceHeader[1] === 254) || length >= 3 && resourceHeader[0] === 239 && resourceHeader[1] === 187 && resourceHeader[2] === 191)
        return "text/plain";
      for (let i = 0; i < length; i++)
        if (isBinaryDataByte(resourceHeader[i]))
          return "application/octet-stream";
      return "text/plain";
    }
    function identifyAnUnknownMIMEType(resourceHeader, { sniffScriptable = !1 } = {}) {
      if (sniffScriptable)
        for (let sig of step1Table) {
          let result = matchesSignature(resourceHeader, sig);
          if (result)
            return result;
        }
      for (let sig of step2Table) {
        let result = matchesSignature(resourceHeader, sig);
        if (result)
          return result;
      }
      for (let sig of imageSignatures) {
        let result = matchesSignature(resourceHeader, sig);
        if (result)
          return result;
      }
      for (let sig of audioVideoSignatures) {
        let result = matchesSignature(resourceHeader, sig);
        if (result)
          return result;
      }
      let mp4Result = matchMP4(resourceHeader);
      if (mp4Result)
        return mp4Result;
      let webmResult = matchWebM(resourceHeader);
      if (webmResult)
        return webmResult;
      let mp3Result = matchMP3WithoutID3(resourceHeader);
      if (mp3Result)
        return mp3Result;
      for (let sig of archiveSignatures) {
        let result = matchesSignature(resourceHeader, sig);
        if (result)
          return result;
      }
      for (let i = 0; i < resourceHeader.length; i++)
        if (isBinaryDataByte(resourceHeader[i]))
          return "application/octet-stream";
      return "text/plain";
    }
    var apacheBugValues = /* @__PURE__ */ new Set([
      "text/plain",
      "text/plain; charset=ISO-8859-1",
      "text/plain; charset=iso-8859-1",
      "text/plain; charset=UTF-8"
    ]);
    function detectSuppliedMIMEType({ contentTypeHeader, providedType }) {
      let suppliedMIMEType = null, checkForApacheBug = !1;
      return contentTypeHeader !== void 0 ? (suppliedMIMEType = normalizeMIMEType(contentTypeHeader), suppliedMIMEType !== null && typeof contentTypeHeader == "string" && (checkForApacheBug = apacheBugValues.has(contentTypeHeader))) : providedType !== void 0 && (suppliedMIMEType = normalizeMIMEType(providedType)), { suppliedMIMEType, checkForApacheBug };
    }
    module.exports = function(resource, { contentTypeHeader, providedType, noSniff = !1, isSupported = () => !0 } = {}) {
      let resourceHeader = getResourceHeader(resource), { suppliedMIMEType, checkForApacheBug } = detectSuppliedMIMEType({ contentTypeHeader, providedType });
      if (suppliedMIMEType !== null && (isXMLMIMEType(suppliedMIMEType) || isHTMLMIMEType(suppliedMIMEType)))
        return suppliedMIMEType;
      if (suppliedMIMEType === null || suppliedMIMEType.essence === "unknown/unknown" || suppliedMIMEType.essence === "application/unknown" || suppliedMIMEType.essence === "*/*")
        return new MIMEType2(identifyAnUnknownMIMEType(resourceHeader, { sniffScriptable: !noSniff }));
      if (noSniff)
        return suppliedMIMEType;
      if (checkForApacheBug)
        return new MIMEType2(distinguishTextOrBinary(resourceHeader));
      if (isImageMIMEType(suppliedMIMEType) && isSupported(suppliedMIMEType)) {
        let imageResult = matchImageType(resourceHeader);
        if (imageResult !== null)
          return new MIMEType2(imageResult);
      }
      if (isAudioOrVideoMIMEType(suppliedMIMEType) && isSupported(suppliedMIMEType)) {
        let avResult = matchAudioOrVideoType(resourceHeader);
        if (avResult !== null)
          return new MIMEType2(avResult);
      }
      return suppliedMIMEType;
    };
  }
});

// node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/whatwg-mimetype@5.0.0/node_modules/whatwg-mimetype/lib/index.js"(exports) {
    "use strict";
    exports.MIMEType = require_mime_type();
    exports.computedMIMEType = require_sniff();
  }
});

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-browser.mjs
function admitTufteUrl(value) {
  if (typeof value != "string" || /[\u0000-\u0020\u007f\\]/.test(value)) throw new TypeError("Unsupported link target");
  let url = new URL(value, "https://tufte.invalid/");
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new TypeError("Unsupported link target");
  return value;
}
function normalizeTufteMetadata(value = {}) {
  let input = record2(value), result = {};
  for (let name of ["title", "description", "language", "themeColor", "robots", "siteName"])
    typeof input[name] == "string" && (result[name] = input[name]);
  if (input.canonical !== void 0 && (result.canonical = admitTufteUrl(input.canonical)), input.image !== void 0 && (result.image = admitTufteUrl(input.image)), typeof input.type == "string" && OPEN_GRAPH_TYPE.test(input.type) && (result.type = input.type), input.structuredData !== void 0) {
    let data = JSON.parse(JSON.stringify(input.structuredData));
    if (data === null || typeof data != "object") throw new TypeError("Structured data must be a JSON object or array");
    result.structuredData = data;
  }
  return Object.freeze(result);
}
function renderTufteMetadata(value = {}) {
  let metadata = normalizeTufteMetadata(value), openGraph = metadata.type === void 0 ? [] : [
    ["og:type", metadata.type],
    ["og:title", metadata.title],
    ["og:description", metadata.description],
    ["og:url", metadata.canonical],
    ["og:image", metadata.image],
    ["og:site_name", metadata.siteName]
  ].filter(([, content]) => content !== void 0), card = metadata.type === void 0 ? [] : [["twitter:card", metadata.image === void 0 ? "summary" : "summary_large_image"]];
  return ["description", "themeColor", "robots"].filter((key) => metadata[key] !== void 0).map((key) => `<meta data-tufte-meta="${key}" name="${key === "themeColor" ? "theme-color" : key}" content="${escapeHtml(metadata[key])}">`).join("") + (metadata.canonical === void 0 ? "" : `<link data-tufte-meta="canonical" rel="canonical" href="${escapeHtml(metadata.canonical)}">`) + openGraph.map(([property, content]) => `<meta data-tufte-meta="${property}" property="${property}" content="${escapeHtml(content)}">`).join("") + card.map(([name, content]) => `<meta data-tufte-meta="${name}" name="${name}" content="${content}">`).join("") + (metadata.structuredData === void 0 ? "" : `<script data-tufte-meta="structuredData" type="application/ld+json">${JSON.stringify(metadata.structuredData).replace(/</gu, "\\u003c")}</script>`);
}
function renderTufteNavigation(links = []) {
  return links.length ? `<nav data-tufte-navigation aria-label="Primary">${links.map((link2) => `<a href="${escapeHtml(admitTufteUrl(link2.href))}"${link2.current ? ' aria-current="page"' : ""}>${escapeHtml(link2.label ?? link2.href)}</a>`).join("")}</nav>` : "";
}
function normalizeTufteTable(value) {
  let table = record2(value);
  if (!Array.isArray(table.columns) || !Array.isArray(table.rows)) throw new TypeError("TUFTE tables require columns and rows arrays");
  if (table.columns.filter((column) => record2(column).rowHeader === !0).length > 1) throw new TypeError("A TUFTE table has at most one row-header column");
  let columns = Object.freeze(table.columns.map((candidate, index2) => {
    let column = typeof candidate == "string" ? { label: candidate } : record2(candidate);
    if (typeof column.label != "string") throw new TypeError("TUFTE table columns require text labels");
    return Object.freeze({ id: token2(column.id, `column-${index2 + 1}`), label: column.label, ...column.rowHeader === !0 ? { rowHeader: !0 } : {}, ...CELL_ALIGNS.has(column.align) ? { align: column.align } : {} });
  })), normalizeCell = (candidate) => {
    if (typeof candidate == "string") return Object.freeze({ text: candidate });
    let cell2 = record2(candidate), cellText = typeof cell2.text == "string" ? cell2.text : typeof cell2.label == "string" ? cell2.label : void 0;
    if (cellText === void 0) throw new TypeError("TUFTE table cells require text");
    return cell2.href !== void 0 && admitTufteUrl(cell2.href), Object.freeze({ text: cellText, ...typeof cell2.href == "string" ? { href: cell2.href } : {}, ...CELL_ALIGNS.has(cell2.align) ? { align: cell2.align } : {} });
  }, rows = Object.freeze(table.rows.map((candidate) => {
    if (!Array.isArray(candidate) || candidate.length !== columns.length) throw new TypeError("Each TUFTE table row must match its columns");
    return Object.freeze(candidate.map(normalizeCell));
  }));
  if (!columns.length && rows.length) throw new TypeError("A TUFTE table with rows requires columns");
  return Object.freeze({ ...typeof table.caption == "string" ? { caption: table.caption } : {}, columns, rows, ...typeof table.empty == "string" ? { empty: table.empty } : {} });
}
function renderTufteTable(value) {
  let table = normalizeTufteTable(value), renderCell = (cell2) => cell2.href ? `<a data-tufte-nav href="${escapeHtml(cell2.href)}">${escapeHtml(cell2.text)}</a>` : escapeHtml(cell2.text), headers = table.columns.map((column) => `<th scope="col"${column.align ? ` class="tufte-align-${column.align}"` : ""}>${escapeHtml(column.label)}</th>`).join(""), rows = table.rows.length ? table.rows.map((row) => `<tr>${row.map((cell2, index2) => {
    let column = table.columns[index2], align = cell2.align ?? column.align;
    return `<${column.rowHeader ? 'th scope="row"' : "td"}${align ? ` class="tufte-align-${align}"` : ""}>${renderCell(cell2)}</${column.rowHeader ? "th" : "td"}>`;
  }).join("")}</tr>`).join("") : table.empty ? `<tr><td colspan="${Math.max(1, table.columns.length)}" class="tufte-table-empty">${escapeHtml(table.empty)}</td></tr>` : "";
  return `<div class="tufte-table-scroll"><table>${table.caption ? `<caption>${escapeHtml(table.caption)}</caption>` : ""}${table.columns.length ? `<thead><tr>${headers}</tr></thead>` : ""}<tbody>${rows}</tbody></table></div>`;
}
function normalizeTufteForm(value) {
  let form = record2(value), fields = Object.freeze((Array.isArray(form.fields) ? form.fields : []).map((candidate, index2) => {
    let field = record2(candidate), kind = FIELD_KINDS.has(field.kind) ? field.kind : "text", name = text(field.name, `field-${index2 + 1}`);
    return Object.freeze({
      id: token2(field.id, `${token2(form.id, "form")}-field-${index2 + 1}`),
      name,
      kind,
      multiple: field.multiple === !0,
      accept: text(field.accept),
      autocomplete: text(field.autocomplete),
      label: text(field.label, name),
      value: text(field.value),
      description: text(field.description),
      ...typeof field.min == "string" ? { min: field.min } : {},
      ...typeof field.max == "string" ? { max: field.max } : {},
      ...typeof field.step == "string" ? { step: field.step } : {},
      ...typeof field.pattern == "string" ? { pattern: field.pattern } : {},
      ...wholeNumber(field.minLength) !== void 0 ? { minLength: wholeNumber(field.minLength) } : {},
      ...wholeNumber(field.maxLength) !== void 0 ? { maxLength: wholeNumber(field.maxLength) } : {},
      ...typeof field.placeholder == "string" ? { placeholder: field.placeholder } : {},
      ...field.required === !0 ? { required: !0 } : {},
      ...field.disabled === !0 ? { disabled: !0 } : {},
      ...field.checked === !0 ? { checked: !0 } : {},
      options: Object.freeze((Array.isArray(field.options) ? field.options : []).map((option) => {
        let item = record2(option);
        return Object.freeze({ value: text(item.value), label: text(item.label, text(item.value)), ...item.selected === !0 ? { selected: !0 } : {} });
      }))
    });
  })), submitters = Object.freeze((Array.isArray(form.submitters) ? form.submitters : []).map((candidate, index2) => {
    let submitter = record2(candidate);
    return Object.freeze({ id: token2(submitter.id, `submit-${index2 + 1}`), label: text(submitter.label, "Submit"), kind: SUBMITTER_KINDS.has(submitter.kind) ? submitter.kind : "submit", action: text(submitter.action), name: text(submitter.name), value: text(submitter.value), formAction: submitter.formAction === void 0 ? void 0 : admitTufteUrl(submitter.formAction), formMethod: ["get", "post", "dialog"].includes(submitter.formMethod) ? submitter.formMethod : void 0, formEnctype: formEncoding(submitter.formEnctype), formTarget: text(submitter.formTarget), formNoValidate: submitter.formNoValidate === !0 });
  }));
  return Object.freeze({ id: token2(form.id, "form"), action: admitTufteUrl(text(form.action)), enhance: typeof form.enhance == "boolean" ? form.enhance : void 0, enctype: formEncoding(form.enctype), target: text(form.target), errors: Object.freeze(Object.fromEntries(Object.entries(record2(form.errors)).filter(([, value2]) => typeof value2 == "string"))), noValidate: form.noValidate === !0, method: form.method === "get" ? "get" : "post", revision: text(form.revision), fields, submitters });
}
function renderTufteForm(form) {
  let fields = form.fields.map((field) => {
    let required2 = field.required ? " required" : "", disabled = field.disabled ? " disabled" : "", error = Object.hasOwn(form.errors ?? {}, field.name) ? form.errors[field.name] : void 0, descriptions = [field.description ? `${field.id}-description` : null, error ? `${field.id}-error` : null].filter(Boolean), described = `${error ? ' aria-invalid="true"' : ""}${descriptions.length ? ` aria-describedby="${escapeHtml(descriptions.join(" "))}"` : ""}`, constraints = `${field.min !== void 0 ? ` min="${escapeHtml(field.min)}"` : ""}${field.max !== void 0 ? ` max="${escapeHtml(field.max)}"` : ""}${field.step !== void 0 ? ` step="${escapeHtml(field.step)}"` : ""}${field.pattern !== void 0 ? ` pattern="${escapeHtml(field.pattern)}"` : ""}${field.minLength !== void 0 ? ` minlength="${field.minLength}"` : ""}${field.maxLength !== void 0 ? ` maxlength="${field.maxLength}"` : ""}${field.placeholder !== void 0 ? ` placeholder="${escapeHtml(field.placeholder)}"` : ""}`, attrs = `${field.multiple ? "multiple " : ""}${field.accept ? `accept="${escapeHtml(field.accept)}" ` : ""}${field.autocomplete ? `autocomplete="${escapeHtml(field.autocomplete)}" ` : ""}id="${escapeHtml(field.id)}" name="${escapeHtml(field.name)}"${required2}${disabled}${described}${constraints}`, control = field.kind === "textarea" ? `<textarea ${attrs}>${escapeHtml(field.value)}</textarea>` : field.kind === "select" ? `<select ${attrs}>${field.options.map((option) => `<option value="${escapeHtml(option.value)}"${option.selected || option.value === field.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}</select>` : `<input type="${escapeHtml(field.kind)}" ${attrs} ${field.kind === "file" ? "" : `value="${escapeHtml(field.value)}"`}${field.checked ? " checked" : ""}>`;
    return field.kind === "hidden" ? control : `<div class="tufte-form-field"><label for="${escapeHtml(field.id)}">${escapeHtml(field.label)}</label>${control}${error ? `<p id="${escapeHtml(field.id)}-error" class="tufte-field-error" role="alert">${escapeHtml(error)}</p>` : ""}${field.description ? `<p id="${escapeHtml(field.id)}-description" class="tufte-field-description">${escapeHtml(field.description)}</p>` : ""}</div>`;
  }).join(""), submitters = form.submitters.map((submitter) => `<button type="${escapeHtml(submitter.kind)}" data-tufte-submitter="${escapeHtml(submitter.id)}"${submitter.formAction !== void 0 ? ` formaction="${escapeHtml(submitter.formAction)}"` : ""}${submitter.formMethod ? ` formmethod="${submitter.formMethod}"` : ""}${submitter.formEnctype ? ` formenctype="${submitter.formEnctype}"` : ""}${submitter.formTarget ? ` formtarget="${escapeHtml(submitter.formTarget)}"` : ""}${submitter.formNoValidate ? " formnovalidate" : ""}${submitter.action ? ` data-tufte-action="${escapeHtml(submitter.action)}"` : ""}${submitter.name ? ` name="${escapeHtml(submitter.name)}"` : ""}${submitter.value ? ` value="${escapeHtml(submitter.value)}"` : ""}>${escapeHtml(submitter.label)}</button>`).join("");
  return `<form id="${escapeHtml(form.id)}" data-tufte-action="${escapeHtml(form.action)}" action="${escapeHtml(form.action)}" ${typeof form.enhance == "boolean" ? `data-tufte-enhance="${form.enhance}" ` : ""}${form.enctype ? `enctype="${form.enctype}" ` : ""}${form.target ? `target="${escapeHtml(form.target)}" ` : ""}${form.noValidate ? "novalidate " : ""}method="${escapeHtml(form.method)}"${form.revision ? ` data-tufte-revision="${escapeHtml(form.revision)}"` : ""}>${fields}${submitters}</form>`;
}
function renderTufteValue(value) {
  return value && typeof value == "object" && typeof value.href == "string" ? (admitTufteUrl(value.href), `<a data-tufte-nav href="${escapeHtml(value.href)}">${escapeHtml(value.label ?? value.href)}</a>`) : escapeHtml(value && typeof value == "object" ? JSON.stringify(value) : value);
}
function renderTufteTileBody(tile) {
  let parts = [];
  if (tile.content !== void 0 && parts.push(`<p>${escapeHtml(tile.content)}</p>`), tile.component) {
    let name = token2(tile.component.name, null);
    if (!name) throw new TypeError("Invalid component name");
    parts.push(`<div id="${escapeHtml(tile.id ?? name)}-component" data-tufte-component="${name}" data-tufte-props="${escapeHtml(JSON.stringify(tile.component.props ?? null))}">${text(tile.component.html)}</div>`);
  }
  return tile.form && parts.push(renderTufteForm(normalizeTufteForm({ ...tile.form, id: tile.form.id ?? (tile.id ? `${tile.id}-form` : void 0) }))), typeof tile.html == "string" && parts.push(tile.html), tile.table && parts.push(renderTufteTable(tile.table)), tile.links && parts.push(`<nav aria-label="${escapeHtml(tile.title ?? "Navigation")}"><ul>${tile.links.map((link2) => `<li>${renderTufteValue(link2)}</li>`).join("")}</ul></nav>`), tile.data !== void 0 && parts.push(`<pre>${escapeHtml(JSON.stringify(tile.data, null, 2))}</pre>`), parts.join("");
}
function normalizeTufteModel(value = {}) {
  let model = record2(value), ids = /* @__PURE__ */ new Set(), tiles = Object.freeze((Array.isArray(model.tiles) ? model.tiles : []).map((candidate, index2) => {
    let tile = candidate && typeof candidate == "object" && !Array.isArray(candidate) ? candidate : {}, id = token2(tile.id, `tile-${index2 + 1}`);
    for (; ids.has(id); ) id = `${id}-${index2 + 1}`;
    ids.add(id);
    let optionalText = {};
    for (let field of ["eyebrow", "html", "content"])
      Object.hasOwn(tile, field) && (optionalText[field] = text(tile[field]));
    let live = liveToken(tile.live), { live: rawLive, ...withoutLive } = tile;
    return Object.freeze({
      ...withoutLive,
      ...optionalText,
      id,
      role: token2(tile.role, "standard"),
      lifecycle: token2(tile.lifecycle, "present"),
      confidence: token2(tile.confidence, "high"),
      side: token2(tile.side, "center"),
      span: span(tile.span),
      title: text(tile.title, "Untitled"),
      ...tile.form && typeof tile.form == "object" && !Array.isArray(tile.form) ? { form: normalizeTufteForm({ ...tile.form, id: tile.form.id ?? `${id}-form` }) } : {},
      ...live ? { live } : {}
    });
  })), tick = Number.isFinite(model.tick) ? model.tick : void 0;
  return Object.freeze({
    kind: "tufte.projection",
    metadata: normalizeTufteMetadata(model.metadata),
    ...typeof model.shell == "string" ? { shell: model.shell } : {},
    title: text(model.title, "TUFTE"),
    subtitle: text(model.subtitle),
    eyebrow: text(model.eyebrow),
    ...Array.isArray(model.navigation) ? { navigation: Object.freeze(model.navigation.map((link2) => Object.freeze({ href: admitTufteUrl(link2.href), label: text(link2.label, link2.href), ...link2.current ? { current: !0 } : {} }))) } : {},
    revision: text(model.revision, "unversioned"),
    ...tick !== void 0 ? { tick } : {},
    tiles
  });
}
var TOKEN, token2, text, record2, escapeHtml, span, LIVE_TOKENS, liveToken, formEncoding, OPEN_GRAPH_TYPE, FIELD_KINDS, SUBMITTER_KINDS, CELL_ALIGNS, wholeNumber, init_tufte_browser = __esm({
  "node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-browser.mjs"() {
    TOKEN = /^[a-z][a-z0-9-]*$/i, token2 = (value, fallback) => TOKEN.test(String(value ?? "")) ? String(value) : fallback, text = (value, fallback = "") => typeof value == "string" ? value : fallback, record2 = (value) => value && typeof value == "object" && !Array.isArray(value) ? value : {}, escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]), span = (value) => {
      let number;
      try {
        number = Number(value);
      } catch {
        return 4;
      }
      return Math.max(2, Math.min(12, Number.isFinite(number) && Math.trunc(number) || 4));
    }, LIVE_TOKENS = /* @__PURE__ */ new Set(["polite", "assertive"]), liveToken = (value) => LIVE_TOKENS.has(value) ? value : void 0;
    formEncoding = (value) => ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"].includes(value) ? value : void 0, OPEN_GRAPH_TYPE = /^[a-z][a-z0-9._:-]*$/u;
    FIELD_KINDS = /* @__PURE__ */ new Set(["hidden", "text", "search", "email", "url", "password", "number", "checkbox", "radio", "textarea", "select", "file", "date", "time", "datetime-local", "range", "color", "tel"]), SUBMITTER_KINDS = /* @__PURE__ */ new Set(["submit", "button"]), CELL_ALIGNS = /* @__PURE__ */ new Set(["start", "end"]), wholeNumber = (value) => Number.isInteger(value) && value >= 0 ? value : void 0;
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/closure-regime.mjs
var closureRegimeNames, scottCost, closureRegimeSchema, init_closure_regime = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/closure-regime.mjs"() {
    closureRegimeNames = Object.freeze(["strict", "scott", "transfinite-bounded", "aperiodic"]), scottCost = closureRegimeNames.indexOf("scott"), closureRegimeSchema = Object.freeze({ enum: closureRegimeNames });
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-content-engineering-services-section/src/typed-resource-classification.mjs
function define(spec) {
  return {
    type: spec.type,
    parent: null,
    recognize: spec.recognize,
    read: spec.read,
    write: spec.write,
    corner: spec.corner,
    rung: spec.rung
  };
}
var CORNER_READING, CORNER_BITS, init_typed_resource_classification = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-content-engineering-services-section/src/typed-resource-classification.mjs"() {
    init_closure_regime();
    init_four();
    CORNER_READING = Object.freeze({
      bottom: readingOfSides("knowledge", !1, !1),
      data: readingOfSides("knowledge", !0, !1),
      prose: readingOfSides("knowledge", !1, !0),
      assertion: readingOfSides("knowledge", !0, !0)
    }), CORNER_BITS = Object.freeze(Object.fromEntries(
      Object.entries(CORNER_READING).map(([corner, point]) => [corner, Object.freeze(sidesOfReading(point).map(Number))])
    ));
  }
});

// node_modules/.pnpm/@rgrove+parse-xml@5.0.0/node_modules/@rgrove/parse-xml/dist/browser.js
function isNameChar(char) {
  let cp = char.codePointAt(0);
  return cp >= 97 && cp <= 122 || cp >= 65 && cp <= 90 || cp >= 48 && cp <= 57 || cp === 45 || cp === 46 || cp === 183 || cp >= 768 && cp <= 879 || cp === 8255 || cp === 8256 || isNameStartChar(char, cp);
}
function isNameStartChar(char, cp = char.codePointAt(0)) {
  return cp >= 97 && cp <= 122 || cp >= 65 && cp <= 90 || cp === 58 || cp === 95 || cp >= 192 && cp <= 214 || cp >= 216 && cp <= 246 || cp >= 248 && cp <= 767 || cp >= 880 && cp <= 893 || cp >= 895 && cp <= 8191 || cp === 8204 || cp === 8205 || cp >= 8304 && cp <= 8591 || cp >= 11264 && cp <= 12271 || cp >= 12289 && cp <= 55295 || cp >= 63744 && cp <= 64975 || cp >= 65008 && cp <= 65533 || cp >= 65536 && cp <= 983039;
}
function isReferenceChar(char) {
  return char === "#" || isNameChar(char);
}
function isWhitespace(char) {
  let cp = char.codePointAt(0);
  return cp === 32 || cp === 9 || cp === 10 || cp === 13;
}
function isXmlCodePoint(cp) {
  return cp >= 32 && cp <= 55295 || cp === 10 || cp === 9 || cp === 13 || cp >= 57344 && cp <= 65533 || cp >= 65536 && cp <= 1114111;
}
function normalizeLineBreaks(text2) {
  let i = 0;
  for (; (i = text2.indexOf("\r", i)) !== -1; )
    text2 = text2[i + 1] === `
` ? text2.slice(0, i) + text2.slice(i + 1) : text2.slice(0, i) + `
` + text2.slice(i + 1);
  return text2;
}
function parseXml(xml, options) {
  return new Parser(xml, options).document;
}
var emptyString, surrogatePair, StringScanner, attValueCharDoubleQuote, attValueCharSingleQuote, attValueNormalizedWhitespace, endCharData, predefinedEntities, _XmlNode, XmlNode, XmlText, XmlCdata, XmlComment, XmlDeclaration, XmlElement, XmlDocument, XmlDocumentType, XmlError, XmlProcessingInstruction, emptyString2, Parser, init_browser = __esm({
  "node_modules/.pnpm/@rgrove+parse-xml@5.0.0/node_modules/@rgrove/parse-xml/dist/browser.js"() {
    emptyString = "", surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, StringScanner = class {
      constructor(string) {
        if (this.m = this.u(string, !0), this.d = 0, this.length = string.length, this.n = this.m !== this.length, this.h = string, this.n) {
          let charsToBytes = [];
          for (let byteIndex = 0, charIndex = 0; charIndex < this.m; ++charIndex)
            charsToBytes[charIndex] = byteIndex, byteIndex += string.codePointAt(byteIndex) > 65535 ? 2 : 1;
          this.A = charsToBytes;
        }
      }
      /**
       * Whether the current character index is at the end of the input string.
       */
      get B() {
        return this.d >= this.m;
      }
      // -- Protected Methods ------------------------------------------------------
      /**
       * Returns the number of characters in the given string, which may differ from
       * the byte length if the string contains multibyte characters.
       */
      u(string, multiByteSafe = this.n) {
        return multiByteSafe ? string.replace(surrogatePair, "_").length : string.length;
      }
      // -- Public Methods ---------------------------------------------------------
      /**
       * Advances the scanner by the given number of characters, stopping if the end
       * of the string is reached.
       */
      p(count = 1) {
        this.d = Math.min(this.m, this.d + count);
      }
      /**
       * Returns the byte index of the given character index in the string. The two
       * may differ in strings that contain multibyte characters.
       */
      f(charIndex = this.d) {
        var _a;
        return this.n ? (_a = this.A[charIndex]) != null ? _a : 1 / 0 : charIndex;
      }
      /**
       * Consumes and returns the given number of characters if possible, advancing
       * the scanner and stopping if the end of the string is reached.
       *
       * If no characters could be consumed, an empty string will be returned.
       */
      G(charCount = 1) {
        let chars = this.j(charCount);
        return this.p(charCount), chars;
      }
      /**
       * Consumes and returns the given number of bytes if possible, advancing the
       * scanner and stopping if the end of the string is reached.
       *
       * It's up to the caller to ensure that the given byte count doesn't split a
       * multibyte character.
       *
       * If no bytes could be consumed, an empty string will be returned.
       */
      v(byteCount) {
        let byteIndex = this.f(), result = this.h.slice(byteIndex, byteIndex + byteCount);
        return this.p(this.u(result)), result;
      }
      /**
       * Consumes and returns all characters for which the given function returns
       * `true`, stopping when `false` is returned or the end of the input is
       * reached.
       */
      w(fn) {
        let { length, n: multiByteMode, h: string } = this, startByteIndex = this.f(), endByteIndex = startByteIndex;
        if (multiByteMode)
          for (; endByteIndex < length; ) {
            let char = string[endByteIndex], isSurrogatePair = char >= "\uD800" && char <= "\uDBFF";
            if (isSurrogatePair && (char += string[endByteIndex + 1]), !fn(char))
              break;
            endByteIndex += isSurrogatePair ? 2 : 1;
          }
        else
          for (; endByteIndex < length && fn(string[endByteIndex]); )
            ++endByteIndex;
        return this.v(endByteIndex - startByteIndex);
      }
      /**
       * Consumes the given string if it exists at the current character index, and
       * advances the scanner.
       *
       * If the given string doesn't exist at the current character index, an empty
       * string will be returned and the scanner will not be advanced.
       */
      b(stringToConsume) {
        let { length } = stringToConsume, byteIndex = this.f();
        return stringToConsume === this.h.slice(byteIndex, byteIndex + length) ? (this.p(length === 1 ? 1 : this.u(stringToConsume)), stringToConsume) : emptyString;
      }
      /**
       * Consumes characters until the given global regex is matched, advancing the
       * scanner up to (but not beyond) the beginning of the match. If the regex
       * doesn't match, nothing will be consumed.
       *
       * Returns the consumed string, or an empty string if nothing was consumed.
       */
      x(regex2) {
        let matchByteIndex = this.h.slice(this.f()).search(regex2);
        return matchByteIndex > 0 ? this.v(matchByteIndex) : emptyString;
      }
      /**
       * Consumes characters until the given string is found, advancing the scanner
       * up to (but not beyond) that point. If the string is never found, nothing
       * will be consumed.
       *
       * Returns the consumed string, or an empty string if nothing was consumed.
       */
      s(searchString) {
        let byteIndex = this.f(), matchByteIndex = this.h.indexOf(searchString, byteIndex);
        return matchByteIndex > 0 ? this.v(matchByteIndex - byteIndex) : emptyString;
      }
      /**
       * Returns the given number of characters starting at the current character
       * index, without advancing the scanner and without exceeding the end of the
       * input string.
       */
      j(count = 1) {
        let { d: charIndex, h: string } = this;
        return this.n ? string.slice(this.f(charIndex), this.f(charIndex + count)) : string.slice(charIndex, charIndex + count);
      }
      /**
       * Resets the scanner position to the given character _index_, or to the start
       * of the input string if no index is given.
       *
       * If _index_ is negative, the scanner position will be moved backward by that
       * many characters, stopping if the beginning of the string is reached.
       */
      k(index2 = 0) {
        this.d = index2 >= 0 ? Math.min(this.m, index2) : Math.max(0, this.d + index2);
      }
    }, attValueCharDoubleQuote = /["&<]/, attValueCharSingleQuote = /['&<]/, attValueNormalizedWhitespace = /\r\n|[\n\r\t]/g, endCharData = /<|&|]]>/, predefinedEntities = Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), {
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    }));
    _XmlNode = class _XmlNode2 {
      constructor() {
        this.parent = null, this.start = -1, this.end = -1;
      }
      /**
       * Document that contains this node, or `null` if this node is not associated
       * with a document.
       */
      get document() {
        var _a, _b;
        return (_b = (_a = this.parent) == null ? void 0 : _a.document) != null ? _b : null;
      }
      /**
       * Whether this node is the root node of the document (also known as the
       * document element).
       */
      get isRootNode() {
        return this.parent !== null && this.parent === this.document && this.type === _XmlNode2.TYPE_ELEMENT;
      }
      /**
       * Whether whitespace should be preserved in the content of this element and
       * its children.
       *
       * This is influenced by the value of the special `xml:space` attribute, and
       * will be `true` for any node whose `xml:space` attribute is set to
       * "preserve". If a node has no such attribute, it will inherit the value of
       * the nearest ancestor that does (if any).
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-white-space
       */
      get preserveWhitespace() {
        var _a;
        return !!((_a = this.parent) != null && _a.preserveWhitespace);
      }
      /**
       * Type of this node.
       *
       * The value of this property is a string that matches one of the static
       * `TYPE_*` properties on the `XmlNode` class (e.g. `TYPE_ELEMENT`,
       * `TYPE_TEXT`, etc.).
       *
       * The `XmlNode` class itself is a base class and doesn't have its own type
       * name.
       */
      get type() {
        return "";
      }
      /**
       * Returns a JSON-serializable object representing this node, minus properties
       * that could result in circular references.
       */
      toJSON() {
        let json4 = {
          type: this.type
        };
        return this.isRootNode && (json4.isRootNode = !0), this.preserveWhitespace && (json4.preserveWhitespace = !0), this.start !== -1 && (json4.start = this.start, json4.end = this.end), json4;
      }
    };
    _XmlNode.TYPE_CDATA = "cdata";
    _XmlNode.TYPE_COMMENT = "comment";
    _XmlNode.TYPE_DOCUMENT = "document";
    _XmlNode.TYPE_DOCUMENT_TYPE = "doctype";
    _XmlNode.TYPE_ELEMENT = "element";
    _XmlNode.TYPE_PROCESSING_INSTRUCTION = "pi";
    _XmlNode.TYPE_TEXT = "text";
    _XmlNode.TYPE_XML_DECLARATION = "xmldecl";
    XmlNode = _XmlNode, XmlText = class extends XmlNode {
      constructor(text2 = "") {
        super(), this.text = text2;
      }
      get type() {
        return XmlNode.TYPE_TEXT;
      }
      toJSON() {
        return Object.assign(XmlNode.prototype.toJSON.call(this), {
          text: this.text
        });
      }
    }, XmlCdata = class extends XmlText {
      get type() {
        return XmlNode.TYPE_CDATA;
      }
    }, XmlComment = class extends XmlNode {
      constructor(content = "") {
        super(), this.content = content;
      }
      get type() {
        return XmlNode.TYPE_COMMENT;
      }
      toJSON() {
        return Object.assign(XmlNode.prototype.toJSON.call(this), {
          content: this.content
        });
      }
    }, XmlDeclaration = class extends XmlNode {
      constructor(version, encoding, standalone) {
        super(), this.version = version, this.encoding = encoding ?? null, this.standalone = standalone ?? null;
      }
      get type() {
        return XmlNode.TYPE_XML_DECLARATION;
      }
      toJSON() {
        let json4 = XmlNode.prototype.toJSON.call(this);
        json4.version = this.version;
        for (let key of ["encoding", "standalone"])
          this[key] !== null && (json4[key] = this[key]);
        return json4;
      }
    }, XmlElement = class _XmlElement extends XmlNode {
      constructor(name, attributes2 = /* @__PURE__ */ Object.create(null), children = []) {
        super(), this.name = name, this.attributes = attributes2, this.children = children;
      }
      /**
       * Whether this element is empty (meaning it has no children).
       */
      get isEmpty() {
        return this.children.length === 0;
      }
      get preserveWhitespace() {
        let node = this;
        for (; node instanceof _XmlElement; ) {
          if ("xml:space" in node.attributes)
            return node.attributes["xml:space"] === "preserve";
          node = node.parent;
        }
        return !1;
      }
      /**
       * Text content of this element and all its descendants.
       */
      get text() {
        return this.children.map((child) => "text" in child ? child.text : "").join("");
      }
      get type() {
        return XmlNode.TYPE_ELEMENT;
      }
      toJSON() {
        return Object.assign(XmlNode.prototype.toJSON.call(this), {
          name: this.name,
          attributes: this.attributes,
          children: this.children.map((child) => child.toJSON())
        });
      }
    }, XmlDocument = class extends XmlNode {
      constructor(children = []) {
        super(), this.children = children;
      }
      get document() {
        return this;
      }
      /**
       * Root element of this document, or `null` if this document is empty.
       */
      get root() {
        for (let child of this.children)
          if (child instanceof XmlElement)
            return child;
        return null;
      }
      /**
       * Text content of this document and all its descendants.
       */
      get text() {
        return this.children.map((child) => "text" in child ? child.text : "").join("");
      }
      get type() {
        return XmlNode.TYPE_DOCUMENT;
      }
      toJSON() {
        return Object.assign(XmlNode.prototype.toJSON.call(this), {
          children: this.children.map((child) => child.toJSON())
        });
      }
    }, XmlDocumentType = class extends XmlNode {
      constructor(name, publicId, systemId, internalSubset) {
        super(), this.name = name, this.publicId = publicId ?? null, this.systemId = systemId ?? null, this.internalSubset = internalSubset ?? null;
      }
      get type() {
        return XmlNode.TYPE_DOCUMENT_TYPE;
      }
      toJSON() {
        let json4 = XmlNode.prototype.toJSON.call(this);
        json4.name = this.name;
        for (let key of ["publicId", "systemId", "internalSubset"])
          this[key] !== null && (json4[key] = this[key]);
        return json4;
      }
    }, XmlError = class extends Error {
      constructor(message2, charIndex, xml) {
        let column = 1, excerpt = "", line = 1;
        for (let i = 0; i < charIndex; ++i) {
          let char = xml[i];
          char === `
` ? (column = 1, excerpt = "", line += 1) : (column += 1, excerpt += char);
        }
        let eol = xml.indexOf(`
`, charIndex);
        excerpt += eol === -1 ? xml.slice(charIndex) : xml.slice(charIndex, eol);
        let excerptStart = 0;
        excerpt.length > 50 && (column < 40 ? excerpt = excerpt.slice(0, 50) : (excerptStart = column - 20, excerpt = excerpt.slice(excerptStart, column + 30))), super(
          `${message2} (line ${line}, column ${column})
  ${excerpt}
` + " ".repeat(column - excerptStart + 1) + `^
`
        ), this.column = column, this.excerpt = excerpt, this.line = line, this.name = "XmlError", this.pos = charIndex;
      }
    }, XmlProcessingInstruction = class extends XmlNode {
      constructor(name, content = "") {
        super(), this.name = name, this.content = content;
      }
      get type() {
        return XmlNode.TYPE_PROCESSING_INSTRUCTION;
      }
      toJSON() {
        return Object.assign(XmlNode.prototype.toJSON.call(this), {
          name: this.name,
          content: this.content
        });
      }
    }, emptyString2 = "", Parser = class {
      /**
       * @param xml XML string to parse.
       * @param options Parser options.
       */
      constructor(xml, options = {}) {
        let doc = this.document = new XmlDocument();
        this.l = doc, this.g = options, this.c = new StringScanner(xml), this.g.includeOffsets && (doc.start = 0, doc.end = xml.length), this.parse();
      }
      /**
       * Adds the given `XmlNode` as a child of `this.currentNode`.
       */
      i(node, charIndex) {
        return node.parent = this.l, this.g.includeOffsets && (node.start = this.c.f(charIndex), node.end = this.c.f()), this.l.children.push(node), !0;
      }
      /**
       * Adds the given _text_ to the document, either by appending it to a
       * preceding `XmlText` node (if possible) or by creating a new `XmlText` node.
       *
       * When _normalize_ is `true` (the default), line breaks in _text_ are
       * normalized per section 2.11 of the XML spec. This must be `false` for text
       * that comes from a character or entity reference, since references aren't
       * subject to line break normalization.
       */
      y(text2, charIndex, normalize = !0) {
        let { children } = this.l, { length } = children;
        if (normalize && (text2 = normalizeLineBreaks(text2)), length > 0) {
          let prevNode = children[length - 1];
          if (prevNode?.type === XmlNode.TYPE_TEXT) {
            let textNode = prevNode;
            return textNode.text += text2, this.g.includeOffsets && (textNode.end = this.c.f()), !0;
          }
        }
        return this.i(new XmlText(text2), charIndex);
      }
      /**
       * Consumes element attributes.
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-starttags
       */
      H() {
        let attributes2 = /* @__PURE__ */ Object.create(null);
        for (; this.e(); ) {
          let attrName = this.q();
          if (!attrName)
            break;
          let attrValue = this.t() && this.I();
          if (attrValue === !1)
            throw this.a("Attribute value expected");
          if (attrName in attributes2)
            throw this.a(`Duplicate attribute: ${attrName}`);
          if (attrName === "xml:space" && attrValue !== "default" && attrValue !== "preserve")
            throw this.a('Value of the `xml:space` attribute must be "default" or "preserve"');
          attributes2[attrName] = attrValue;
        }
        if (this.g.sortAttributes) {
          let attrNames = Object.keys(attributes2).sort(), sortedAttributes = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < attrNames.length; ++i) {
            let attrName = attrNames[i];
            sortedAttributes[attrName] = attributes2[attrName];
          }
          attributes2 = sortedAttributes;
        }
        return attributes2;
      }
      /**
       * Consumes an `AttValue` (attribute value) if possible.
       *
       * @returns
       *   Contents of the `AttValue` minus quotes, or `false` if nothing was
       *   consumed. An empty string indicates that an `AttValue` was consumed but
       *   was empty.
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-AttValue
       */
      I() {
        let { c: scanner } = this, quote = scanner.j();
        if (quote !== '"' && quote !== "'")
          return !1;
        scanner.p();
        let chars, isClosed = !1, value = emptyString2, regex2 = quote === '"' ? attValueCharDoubleQuote : attValueCharSingleQuote;
        matchLoop: for (; !scanner.B; )
          switch (chars = scanner.x(regex2), chars && (this.o(chars), value += chars.replace(attValueNormalizedWhitespace, " ")), scanner.j()) {
            case quote:
              isClosed = !0;
              break matchLoop;
            case "&":
              value += this.C();
              continue;
            case "<":
              throw this.a("Unescaped `<` is not allowed in an attribute value");
            default:
              break matchLoop;
          }
        if (!isClosed)
          throw this.a("Unclosed attribute");
        return scanner.p(), value;
      }
      /**
       * Consumes a CDATA section if possible.
       *
       * @returns Whether a CDATA section was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-cdata-sect
       */
      J() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<![CDATA["))
          return !1;
        let text2 = scanner.s("]]>");
        if (this.o(text2), !scanner.b("]]>"))
          throw this.a("Unclosed CDATA section");
        return this.g.preserveCdata ? this.i(new XmlCdata(normalizeLineBreaks(text2)), startIndex) : this.y(text2, startIndex);
      }
      /**
       * Consumes character data if possible.
       *
       * @returns Whether character data was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#dt-chardata
       */
      K() {
        let { c: scanner } = this, startIndex = scanner.d, charData = scanner.x(endCharData);
        if (!charData)
          return !1;
        if (this.o(charData), scanner.j(3) === "]]>")
          throw this.a("Element content may not contain the CDATA section close delimiter `]]>`");
        return this.y(charData, startIndex);
      }
      /**
       * Consumes a comment if possible.
       *
       * @returns Whether a comment was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Comment
       */
      D() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<!--"))
          return !1;
        let content = scanner.s("--");
        if (this.o(content), !scanner.b("-->"))
          throw scanner.j(2) === "--" ? this.a("The string `--` isn't allowed inside a comment") : this.a("Unclosed comment");
        return this.g.preserveComments ? this.i(new XmlComment(normalizeLineBreaks(content)), startIndex) : !0;
      }
      /**
       * Consumes a reference in a content context if possible.
       *
       * This differs from `consumeReference()` in that a consumed reference will be
       * added to the document as a text node instead of returned.
       *
       * @returns Whether a reference was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#entproc
       */
      L() {
        let startIndex = this.c.d, ref = this.C();
        return ref ? this.y(ref, startIndex, !1) : !1;
      }
      /**
       * Consumes a doctype declaration if possible.
       *
       * This is a loose implementation since doctype declarations are currently
       * discarded without further parsing.
       *
       * @returns Whether a doctype declaration was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#dtd
       */
      M() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<!DOCTYPE"))
          return !1;
        let name = this.e() && this.q();
        if (!name)
          throw this.a("Expected a name");
        let publicId, systemId;
        if (this.e()) {
          if (scanner.b("PUBLIC")) {
            if (publicId = this.e() && this.N(), publicId === !1)
              throw this.a("Expected a public identifier");
            this.e();
          }
          if (publicId !== void 0 || scanner.b("SYSTEM")) {
            if (this.e(), systemId = this.r(), systemId === !1)
              throw this.a("Expected a system identifier");
            this.e();
          }
        }
        let internalSubset;
        if (scanner.b("[")) {
          if (internalSubset = scanner.x(/\][\x20\t\r\n]*>/), !scanner.b("]"))
            throw this.a("Unclosed internal subset");
          this.e();
        }
        if (!scanner.b(">"))
          throw this.a("Unclosed doctype declaration");
        return this.g.preserveDocumentType ? this.i(new XmlDocumentType(name, publicId, systemId, internalSubset), startIndex) : !0;
      }
      /**
       * Consumes an element if possible.
       *
       * @returns Whether an element was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-element
       */
      E() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<"))
          return !1;
        let name = this.q();
        if (!name)
          return scanner.k(startIndex), !1;
        let attributes2 = this.H(), isEmpty = !!scanner.b("/>"), element = new XmlElement(name, attributes2);
        if (element.parent = this.l, !isEmpty) {
          if (!scanner.b(">"))
            throw this.a(`Unclosed start tag for element \`${name}\``);
          this.l = element;
          do
            this.K();
          while (this.E() || this.L() || this.J() || this.F() || this.D());
          let endTagMark = scanner.d, endTagName;
          if (!scanner.b("</") || !(endTagName = this.q()) || endTagName !== name)
            throw scanner.k(endTagMark), this.a(`Missing end tag for element ${name}`);
          if (this.e(), !scanner.b(">"))
            throw this.a(`Unclosed end tag for element ${name}`);
          this.l = element.parent;
        }
        return this.i(element, startIndex);
      }
      /**
       * Consumes an `Eq` production if possible.
       *
       * @returns Whether an `Eq` production was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Eq
       */
      t() {
        return this.e(), this.c.b("=") ? (this.e(), !0) : !1;
      }
      /**
       * Consumes `Misc` content if possible.
       *
       * @returns Whether anything was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Misc
       */
      z() {
        return this.D() || this.F() || this.e();
      }
      /**
       * Consumes one or more `Name` characters if possible.
       *
       * @returns `Name` characters, or an empty string if none were consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Name
       */
      q() {
        return isNameStartChar(this.c.j()) ? this.c.w(isNameChar) : emptyString2;
      }
      /**
       * Consumes a processing instruction if possible.
       *
       * @returns Whether a processing instruction was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-pi
       */
      F() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<?"))
          return !1;
        let name = this.q();
        if (name) {
          if (name.toLowerCase() === "xml")
            throw scanner.k(startIndex), this.a("XML declaration isn't allowed here");
        } else
          throw this.a("Invalid processing instruction");
        if (!this.e()) {
          if (scanner.b("?>"))
            return this.i(new XmlProcessingInstruction(name), startIndex);
          throw this.a("Whitespace is required after a processing instruction name");
        }
        let content = scanner.s("?>");
        if (this.o(content), !scanner.b("?>"))
          throw this.a("Unterminated processing instruction");
        return this.i(new XmlProcessingInstruction(name, normalizeLineBreaks(content)), startIndex);
      }
      /**
       * Consumes a prolog if possible.
       *
       * @returns Whether a prolog was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-prolog-dtd
       */
      O() {
        let { c: scanner } = this, startIndex = scanner.d;
        for (this.P(); this.z(); )
          ;
        if (this.M())
          for (; this.z(); )
            ;
        return startIndex < scanner.d;
      }
      /**
       * Consumes a public identifier literal if possible.
       *
       * @returns
       *   Value of the public identifier literal minus quotes, or `false` if
       *   nothing was consumed. An empty string indicates that a public id literal
       *   was consumed but was empty.
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-PubidLiteral
       */
      N() {
        let startIndex = this.c.d, value = this.r();
        if (value !== !1 && !/^[-\x20\r\na-zA-Z0-9'()+,./:=?;!*#@$_%]*$/.test(value))
          throw this.c.k(startIndex), this.a("Invalid character in public identifier");
        return value;
      }
      /**
       * Consumes a reference if possible.
       *
       * This differs from `consumeContentReference()` in that a consumed reference
       * will be returned rather than added to the document.
       *
       * @returns
       *   Parsed reference value, or `false` if nothing was consumed (to
       *   distinguish from a reference that resolves to an empty string).
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Reference
       */
      C() {
        let { c: scanner } = this;
        if (!scanner.b("&"))
          return !1;
        let ref = scanner.w(isReferenceChar);
        if (scanner.G() !== ";")
          throw this.a("Unterminated reference (a reference must end with `;`)");
        let parsedValue;
        if (ref[0] === "#") {
          let codePoint = ref[1] === "x" ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
          if (isNaN(codePoint) || !/^#(?:x[0-9A-Fa-f]+|[0-9]+)$/.test(ref))
            throw this.a("Invalid character reference");
          if (!isXmlCodePoint(codePoint))
            throw this.a("Character reference resolves to an invalid character");
          parsedValue = String.fromCodePoint(codePoint);
        } else if (parsedValue = predefinedEntities[ref], parsedValue === void 0) {
          let {
            ignoreUndefinedEntities,
            resolveUndefinedEntity
          } = this.g, wrappedRef = `&${ref};`;
          if (resolveUndefinedEntity) {
            let resolvedValue = resolveUndefinedEntity(wrappedRef);
            if (resolvedValue != null) {
              let type = typeof resolvedValue;
              if (type !== "string")
                throw new TypeError(`\`resolveUndefinedEntity()\` must return a string, \`null\`, or \`undefined\`, but returned a value of type ${type}`);
              return resolvedValue;
            }
          }
          if (ignoreUndefinedEntities)
            return wrappedRef;
          throw scanner.k(-wrappedRef.length), this.a(`Named entity isn't defined: ${wrappedRef}`);
        }
        return parsedValue;
      }
      /**
       * Consumes a `SystemLiteral` if possible.
       *
       * A `SystemLiteral` is similar to an attribute value, but allows the
       * characters `<` and `&` and doesn't replace references.
       *
       * @returns
       *   Value of the `SystemLiteral` minus quotes, or `false` if nothing was
       *   consumed. An empty string indicates that a `SystemLiteral` was consumed
       *   but was empty.
       *
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-SystemLiteral
       */
      r() {
        let { c: scanner } = this, quote = scanner.b('"') || scanner.b("'");
        if (!quote)
          return !1;
        let value = scanner.s(quote);
        if (this.o(value), !scanner.b(quote))
          throw this.a("Missing end quote");
        return value;
      }
      /**
       * Consumes one or more whitespace characters if possible.
       *
       * @returns Whether any whitespace characters were consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#white
       */
      e() {
        return !!this.c.w(isWhitespace);
      }
      /**
       * Consumes an XML declaration if possible.
       *
       * @returns Whether an XML declaration was consumed.
       * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-XMLDecl
       */
      P() {
        let { c: scanner } = this, startIndex = scanner.d;
        if (!scanner.b("<?xml"))
          return !1;
        if (isNameChar(scanner.j()))
          return scanner.k(startIndex), !1;
        if (!this.e())
          throw this.a("Invalid XML declaration");
        let version = !!scanner.b("version") && this.t() && this.r();
        if (version === !1)
          throw this.a("XML version is missing or invalid");
        if (!/^1\.[0-9]+$/.test(version))
          throw this.a("Invalid character in version number");
        let encoding, standalone;
        if (this.e()) {
          if (encoding = !!scanner.b("encoding") && this.t() && this.r(), encoding) {
            if (!/^[A-Za-z][\w.-]*$/.test(encoding))
              throw this.a("Invalid character in encoding name");
            this.e();
          }
          if (standalone = !!scanner.b("standalone") && this.t() && this.r(), standalone) {
            if (standalone !== "yes" && standalone !== "no")
              throw this.a('Only "yes" and "no" are permitted as values of `standalone`');
            this.e();
          }
        }
        if (!scanner.b("?>"))
          throw this.a("Invalid or unclosed XML declaration");
        return this.g.preserveXmlDeclaration ? this.i(new XmlDeclaration(
          version,
          encoding || void 0,
          standalone || void 0
        ), startIndex) : !0;
      }
      /**
       * Returns an `XmlError` for the current scanner position.
       */
      a(message2) {
        let { c: scanner } = this;
        return new XmlError(message2, scanner.d, scanner.h);
      }
      /**
       * Parses the XML input.
       */
      parse() {
        if (this.c.b("\uFEFF"), this.O(), !this.E())
          throw this.a("Root element is missing or invalid");
        for (; this.z(); )
          ;
        if (!this.c.B)
          throw this.a("Extra content at the end of the document");
      }
      /**
       * Throws an invalid character error if any character in the given _string_
       * isn't a valid XML character.
       */
      o(string) {
        let { length } = string;
        for (let i = 0; i < length; ++i) {
          let cp = string.codePointAt(i);
          if (!isXmlCodePoint(cp))
            throw this.c.k(-([...string].length - i)), this.a("Invalid character");
          cp > 65535 && (i += 1);
        }
      }
    };
  }
});

// node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js
var require_xml_name_validator = __commonJS({
  "node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js"(exports) {
    "use strict";
    exports.name = (potentialName) => /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/u.test(potentialName);
    exports.qname = (potentialQname) => /(?:^[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$)|(?:^[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$)/u.test(potentialQname);
  }
});

// node_modules/.pnpm/@red-cup-engineering+xml-document-rendering-service@0.1.7/node_modules/@red-cup-engineering/xml-document-rendering-service/src/xml/core.mjs
function escapeXmlText(value) {
  return value.replace(/[&<>]/g, (character) => character === "&" ? "&amp;" : character === "<" ? "&lt;" : "&gt;");
}
function escapeXmlAttr(value) {
  return escapeXmlText(value).replace(/["']/g, (character) => character === '"' ? "&quot;" : "&#39;");
}
function isXmlName(name) {
  return (0, import_xml_name_validator.name)(name);
}
function requireXmlName(name) {
  if (!isXmlName(name)) throw new TypeError(`xml: ${JSON.stringify(name)} is not a well-formed XML name`);
  return name;
}
function requireXmlCharacters(value) {
  if (typeof value != "string" || /[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\u{10000}-\u{10ffff}]/u.test(value)) throw new TypeError("xml: text contains a character outside XML 1.0");
  return value;
}
function comment(value) {
  if (requireXmlCharacters(value), value.includes("\r")) throw new TypeError("xml: comments cannot retain carriage return");
  if (value.includes("--") || value.endsWith("-")) throw new TypeError("xml: a comment may not contain '--' or end with '-'");
  return { kind: "comment", value };
}
function attributes(values) {
  let result = "";
  for (let [name, value] of Object.entries(values)) {
    if (value == null) continue;
    let escaped = escapeXmlAttr(requireXmlCharacters(String(value))).replace(/[\t\n\r]/g, (ch) => `&#${ch.charCodeAt(0)};`);
    result += ` ${requireXmlName(name)}="${escaped}"`;
  }
  return result;
}
function serialize(node) {
  let out = [], ancestors = /* @__PURE__ */ new Set(), stack = [{ node }];
  for (; stack.length; ) {
    let item = stack.pop();
    if (item.exit) {
      ancestors.delete(item.node);
      continue;
    }
    if (item.literal !== void 0) {
      out.push(item.literal);
      continue;
    }
    let current = item.node;
    if (!current || typeof current != "object") throw new TypeError("xml: a node must be an object");
    if (ancestors.has(current)) throw new TypeError("xml: cyclic node carrier");
    switch (current.kind) {
      case "text":
        out.push(escapeXmlText(requireXmlCharacters(current.value)).replaceAll("\r", "&#13;"));
        break;
      case "comment":
        out.push(`<!--${comment(current.value).value}-->`);
        break;
      case "cdata": {
        let value = requireXmlCharacters(current.value);
        if (value.includes("]]>") || value.includes("\r")) throw new TypeError("xml: CDATA cannot contain ']]>' or carriage return; use text nodes");
        out.push(`<![CDATA[${value}]]>`);
        break;
      }
      case "pi": {
        let target = requireXmlName(current.name), value = requireXmlCharacters(current.value);
        if (String(target).toLowerCase() === "xml" || value.includes("?>")) throw new TypeError("xml: invalid processing instruction");
        if (value.includes("\r")) throw new TypeError("xml: processing instructions cannot retain carriage return");
        out.push(`<?${target}${value ? " " + value : ""}?>`);
        break;
      }
      case "xmldecl": {
        if (current.version !== "1.0" || ![void 0, null, "yes", "no"].includes(current.standalone)) throw new TypeError("xml: declaration requires XML 1.0 and optional yes/no standalone");
        out.push(`<?xml version="1.0" encoding="UTF-8"${current.standalone ? ` standalone="${current.standalone}"` : ""}?>`);
        break;
      }
      case "document":
      case "element": {
        if (!Array.isArray(current.children)) throw new TypeError("xml: node children must be an array");
        if (ancestors.add(current), stack.push({ node: current, exit: !0 }), current.kind === "element") {
          let name = requireXmlName(current.name), attrs = attributes(current.attributes);
          if (!current.children.length) {
            out.push(`<${name}${attrs}/>`);
            break;
          }
          out.push(`<${name}${attrs}>`), stack.push({ literal: `</${name}>` });
        }
        for (let i = current.children.length - 1; i >= 0; i--) stack.push({ node: current.children[i] });
        break;
      }
      default:
        throw new TypeError(`xml: unsupported node kind ${current.kind}`);
    }
  }
  return out.join("");
}
var import_xml_name_validator, xmlProjector, init_core = __esm({
  "node_modules/.pnpm/@red-cup-engineering+xml-document-rendering-service@0.1.7/node_modules/@red-cup-engineering/xml-document-rendering-service/src/xml/core.mjs"() {
    init_typed_resource_classification();
    init_browser();
    import_xml_name_validator = __toESM(require_xml_name_validator(), 1);
    xmlProjector = define({
      type: "xml",
      corner: "data",
      rung: "strict",
      recognize: (resource) => {
        try {
          let unresolved = !1, parsed = parseXml(resource.content, { preserveDocumentType: !0, resolveUndefinedEntity: () => (unresolved = !0, "") });
          return unresolved && !parsed.children.some((node) => node.type === "doctype") && parseXml(resource.content), !0;
        } catch {
          return !1;
        }
      },
      write: (nodes) => nodes.map(serialize).join("")
    });
  }
});

// node_modules/.pnpm/@red-cup-engineering+html-structural-projection-service@0.3.2/node_modules/@red-cup-engineering/html-structural-projection-service/src/html/lexical.mjs
var htmlDisplayText, escapeHtmlTextValue, escapeHtmlAttributeValue, init_lexical = __esm({
  "node_modules/.pnpm/@red-cup-engineering+html-structural-projection-service@0.3.2/node_modules/@red-cup-engineering/html-structural-projection-service/src/html/lexical.mjs"() {
    init_core();
    htmlDisplayText = (value) => String(value).replaceAll("\0", "\uFFFD"), escapeHtmlTextValue = (value) => escapeXmlText(htmlDisplayText(value)).replaceAll("\r", "&#13;"), escapeHtmlAttributeValue = (value) => escapeXmlAttr(htmlDisplayText(value)).replaceAll("\r", "&#13;");
  }
});

// node_modules/.pnpm/@red-cup-engineering+html-structural-projection-service@0.3.2/node_modules/@red-cup-engineering/html-structural-projection-service/src/html/document-nodes.mjs
function requireHtmlName(name) {
  if (!HTML_NAME.test(name))
    throw new TypeError(`html: ${JSON.stringify(name)} is not a valid HTML name`);
  return name;
}
function htmlText(value) {
  return Object.freeze({ kind: "text", value });
}
function htmlFragment(html) {
  return Object.freeze({ kind: "fragment", html });
}
function htmlElement(name, attributes2 = {}, children = []) {
  let renderedChildren = [];
  for (let child of children)
    child == null || child === !1 || renderedChildren.push(typeof child == "string" ? htmlText(child) : child);
  return Object.freeze({
    kind: "element",
    name: requireHtmlName(name),
    attributes: Object.freeze({ ...attributes2 }),
    children: Object.freeze(renderedChildren)
  });
}
function renderAttributes(attributes2) {
  let rendered = "";
  for (let [name, value] of Object.entries(attributes2))
    value == null || value === !1 || (requireHtmlName(name), rendered += value === !0 ? ` ${name}` : ` ${name}="${escapeHtmlAttributeValue(String(value))}"`);
  return rendered;
}
function renderHtmlNode(node) {
  if (node.kind === "text")
    return escapeHtmlTextValue(node.value);
  if (node.kind === "fragment")
    return node.html;
  let name = node.name.toLowerCase();
  if (VOID_ELEMENTS.has(name)) {
    if (node.children.length > 0)
      throw new TypeError(`html: void element <${node.name}> cannot have children`);
    return `<${node.name}${renderAttributes(node.attributes)}>`;
  }
  return `<${node.name}${renderAttributes(node.attributes)}>${node.children.map(renderHtmlNode).join("")}</${node.name}>`;
}
var HTML_NAME, VOID_ELEMENTS, init_document_nodes = __esm({
  "node_modules/.pnpm/@red-cup-engineering+html-structural-projection-service@0.3.2/node_modules/@red-cup-engineering/html-structural-projection-service/src/html/document-nodes.mjs"() {
    init_lexical();
    HTML_NAME = /^[A-Za-z][A-Za-z0-9:-]*$/u, VOID_ELEMENTS = /* @__PURE__ */ new Set([
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ]);
  }
});

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-composition.mjs
function composeTufteTile(nodes, tile = {}) {
  return { ...tile, html: nodes.map(renderHtmlNode).join("") };
}
var init_tufte_composition = __esm({
  "node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-composition.mjs"() {
    init_document_nodes();
    init_document_nodes();
  }
});

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-storefront.mjs
function admitTufteStorefront(catalog) {
  if (!catalog || typeof catalog.title != "string" || !Array.isArray(catalog.items)) throw new TypeError("Storefront requires a title and items");
  let ids = /* @__PURE__ */ new Set();
  for (let item of catalog.items) {
    if (!item || typeof item.id != "string" || !item.id || ids.has(item.id) || item.id.startsWith("storefront-") || typeof item.title != "string") throw new TypeError("Storefront items require unique IDs and titles outside the storefront- namespace");
    ids.add(item.id), item.image && admitTufteUrl(item.image.src);
    for (let action of item.actions ?? [])
      if (action.kind === "link") admitTufteUrl(action.href);
      else if (action.kind === "form") normalizeTufteForm(action.form);
      else if (action.kind !== "unavailable") throw new TypeError("Unsupported storefront action");
  }
  let facets = /* @__PURE__ */ new Set();
  for (let facet of catalog.facets ?? []) {
    if (!/^[a-z][a-z0-9_-]*$/u.test(facet.key) || facet.key === "q" || facets.has(facet.key)) throw new TypeError("Storefront facets require unique query keys");
    facets.add(facet.key);
  }
  return catalog;
}
function storefrontFacetValues(catalog, key) {
  return [...new Set(catalog.items.flatMap((item) => item.facets?.[key] ?? []))];
}
function storefrontQuery(catalog, parameters = new URLSearchParams()) {
  admitTufteStorefront(catalog);
  let facets = {};
  for (let { key } of catalog.facets ?? []) {
    let value = parameters.get(key);
    value && storefrontFacetValues(catalog, key).includes(value) && (facets[key] = value);
  }
  return { term: (parameters.get("q") ?? "").trim(), facets };
}
function filterStorefrontItems(catalog, query = { term: "", facets: {} }) {
  let term = query.term.toLocaleLowerCase("en-US");
  return catalog.items.filter((item) => [item.id, item.title, item.summary ?? "", ...item.keywords ?? []].join(" ").toLocaleLowerCase("en-US").includes(term) && Object.entries(query.facets).every(([key, value]) => (item.facets?.[key] ?? []).includes(value)));
}
function itemNodes(item, detail) {
  let nodes = [];
  if (item.image && nodes.push(htmlElement("img", { src: admitTufteUrl(item.image.src), alt: item.image.alt ?? "", loading: "lazy", decoding: "async" })), item.illustration && nodes.push(htmlElement("div", { class: "tufte-storefront-illustration" }, item.illustration)), item.summary) {
    let summary = !detail && item.summary.length > 240 ? `${item.summary.slice(0, 240).replace(/\s+\S*$/u, "")}\u2026` : item.summary;
    nodes.push(htmlElement("p", {}, [summary]));
  }
  item.status && nodes.push(htmlElement("p", {}, [htmlElement("strong", {}, [item.status.label]), ...detail && item.status.note ? [` \u2014 ${item.status.note}`] : []]));
  let facts2 = item.facts?.filter((fact) => detail || !fact.detailOnly) ?? [];
  return facts2.length && nodes.push(htmlElement("dl", {}, facts2.flatMap((fact) => [htmlElement("dt", {}, [fact.label]), htmlElement("dd", {}, [fact.value])]))), item.keywords?.length && nodes.push(htmlElement("ul", { class: "tufte-storefront-keywords", "aria-label": "Keywords" }, (detail ? item.keywords : item.keywords.slice(0, 6)).map((word) => htmlElement("li", {}, [word])))), detail && item.detail && nodes.push(...item.detail), nodes;
}
function actionNodes(actions, itemId) {
  return actions.map((action, index2) => action.kind === "link" ? htmlElement("p", {}, [htmlElement("a", { href: admitTufteUrl(action.href), ...action.download ? { download: action.download === !0 ? "" : action.download } : {} }, [action.label])]) : action.kind === "form" ? htmlFragment(renderTufteForm(normalizeTufteForm({ ...action.form, id: action.form.id ?? `${itemId}-action-${index2 + 1}` }))) : htmlElement("p", { "aria-disabled": "true" }, [action.label, ...action.reason ? [` \u2014 ${action.reason}`] : []]));
}
function storefrontItemTile(item, { detail = !1, href } = {}) {
  let nodes = itemNodes(item, detail);
  return !detail && href && nodes.push(htmlElement("p", {}, [htmlElement("a", { href: admitTufteUrl(href) }, [`View ${item.title}`])])), nodes.push(htmlElement("div", { class: "tufte-storefront-actions" }, actionNodes(item.actions ?? [], item.id))), composeTufteTile([htmlElement("div", { class: "tufte-storefront-item" }, nodes)], { id: item.id, title: item.title, eyebrow: item.eyebrow, span: detail ? 12 : 4 });
}
function storefrontCatalogModel(catalog, { path = "/", itemHref, parameters = new URLSearchParams(), search = !0 } = {}) {
  admitTufteStorefront(catalog), admitTufteUrl(path);
  let query = storefrontQuery(catalog, parameters), items = filterStorefrontItems(catalog, query), tiles = [];
  return search && tiles.push({ id: "storefront-search", title: "Find an item", span: 12, form: {
    action: path,
    method: "get",
    fields: [
      { name: "q", label: "Search", kind: "search", value: query.term },
      ...(catalog.facets ?? []).map((facet) => ({ name: facet.key, label: facet.label, kind: "select", value: query.facets[facet.key] ?? "", options: [
        { value: "", label: `All ${facet.label.toLocaleLowerCase("en-US")}` },
        ...storefrontFacetValues(catalog, facet.key).map((value) => ({ value, label: facet.labels?.[value] ?? value }))
      ] }))
    ],
    submitters: [{ label: "Search" }]
  } }), tiles.push({ id: "storefront-results", title: `${items.length} ${items.length === 1 ? "item" : "items"}`, span: 12, content: items.length ? void 0 : "No items match these filters.", live: "polite" }), tiles.push(...items.map((item) => storefrontItemTile(item, { href: itemHref?.(item.id) }))), { title: catalog.title, subtitle: catalog.description, eyebrow: catalog.eyebrow, metadata: catalog.metadata, navigation: catalog.navigation, footerHtml: catalog.footerHtml, tiles };
}
function storefrontDetailModel(catalog, id, { catalogHref = "/" } = {}) {
  admitTufteStorefront(catalog), admitTufteUrl(catalogHref);
  let item = catalog.items.find((candidate) => candidate.id === id);
  return item ? { title: item.title, eyebrow: catalog.title, navigation: catalog.navigation, metadata: { description: item.summary, ...item.metadata }, footerHtml: catalog.footerHtml, tiles: [
    { id: "storefront-navigation", title: "Browse", span: 12, links: [{ href: catalogHref, label: `All ${catalog.title}` }] },
    storefrontItemTile(item, { detail: !0 })
  ] } : null;
}
var STOREFRONT_STYLES, init_tufte_storefront = __esm({
  "node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-storefront.mjs"() {
    init_tufte_browser();
    init_tufte_composition();
    STOREFRONT_STYLES = ".tufte-tile:has(.tufte-storefront-item)>header h2{font-size:1.05rem;letter-spacing:normal;text-transform:none;color:var(--tufte-ink)}#storefront-results .tufte-tile-body:empty{display:none}.tufte-storefront-item{display:grid;gap:1rem;min-width:0}.tufte-storefront-item :is(p,dd,li,code){overflow-wrap:anywhere}.tufte-storefront-item>p{margin:0}.tufte-storefront-item img{display:block;width:100%;max-height:20rem;object-fit:contain;border-radius:.35rem}.tufte-storefront-illustration{display:flex;align-items:center;justify-content:center;min-height:6rem}.tufte-storefront-illustration svg{width:5rem;height:5rem}.tufte-storefront-item dl{display:grid;grid-template-columns:auto 1fr;gap:.4rem 1rem;margin:0}.tufte-storefront-item dd{margin:0}.tufte-storefront-keywords{display:flex;gap:.5rem;flex-wrap:wrap;list-style:none;padding:0;margin:0}.tufte-storefront-keywords li{border:1px solid currentColor;border-radius:1rem;padding:.15rem .65rem;font-size:.8rem}.tufte-storefront-actions{display:flex;flex-wrap:wrap;gap:1rem;align-items:center}.tufte-storefront-actions p{margin:0}.tufte-storefront-actions a{display:inline-block;padding:.45rem .7rem;border:1px solid currentColor;border-radius:.3rem;text-decoration:none}.tufte-storefront-actions [aria-disabled=true]{opacity:.7}@media(min-width:800px){#storefront-search form{display:flex;gap:1rem;align-items:end;flex-wrap:wrap}}";
  }
});

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/bearer-authentication.mjs
function first(value) {
  return typeof value == "string" ? value : value?.[0];
}
function bearerToken(authorization) {
  let raw = first(authorization);
  return /^Bearer\s+(.+)$/i.exec(raw ?? "")?.[1]?.trim() || void 0;
}
function bearerChallenge(options = {}) {
  let parts = [];
  return options.realm !== void 0 && parts.push(`realm=${quoteHeaderValue(options.realm)}`), options.error !== void 0 && parts.push(`error=${quoteHeaderValue(options.error)}`), options.errorDescription !== void 0 && parts.push(`error_description=${quoteHeaderValue(options.errorDescription)}`), options.errorUri !== void 0 && parts.push(`error_uri=${quoteHeaderValue(options.errorUri)}`), options.resourceMetadata !== void 0 && parts.push(`resource_metadata=${quoteHeaderValue(options.resourceMetadata)}`), parts.length === 0 ? "Bearer" : `Bearer ${parts.join(", ")}`;
}
var init_bearer_authentication = __esm({
  "node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/bearer-authentication.mjs"() {
    init_header_value();
  }
});

// node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/protocol-versions.mjs
var MCP_PROTOCOL_VERSIONS, LATEST_MCP_PROTOCOL_VERSION, init_protocol_versions = __esm({
  "node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/protocol-versions.mjs"() {
    MCP_PROTOCOL_VERSIONS = Object.freeze([
      "2025-11-25",
      "2025-06-18",
      "2025-03-26",
      "2024-11-05"
    ]), LATEST_MCP_PROTOCOL_VERSION = MCP_PROTOCOL_VERSIONS[0];
  }
});

// node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/server.mjs
function mcpOk(id, result) {
  return Object.freeze({ jsonrpc: "2.0", id: rpcId(id), result });
}
function mcpRpcError(id, code, text2, data) {
  return Object.freeze({ jsonrpc: "2.0", id: rpcId(id), error: Object.freeze({ code, message: text2, ...data === void 0 ? {} : { data } }) });
}
function mcpToolResult(value) {
  if (isObject3(value) && Array.isArray(value.content)) return value;
  let text2 = typeof value == "string" ? value : JSON.stringify(value ?? null, null, 2);
  return Object.freeze({ content: Object.freeze([{ type: "text", text: text2 }]), ...isObject3(value) ? { structuredContent: value } : {} });
}
function mcpToolError(error) {
  let text2 = isObject3(error) && typeof error.code == "string" && typeof error.message == "string" && !(error instanceof Error) ? `${error.code}: ${error.message}` : message(error);
  return Object.freeze({ isError: !0, content: Object.freeze([{ type: "text", text: text2 }]) });
}
function inputTypeOf(tool) {
  if (tool.inputSchema === void 0 || tool.admitArguments === !1) return;
  let declared = defineType({ id: `mcp:${tool.name}:input`, name: tool.name, description: tool.description ?? tool.name, schema: tool.inputSchema, parents: [] });
  if (!declared.ok) throw new TypeError(`tool ${tool.name} declares an invalid inputSchema: ${declared.refusal.message}`);
  return declared.value;
}
function admitMcpToolArguments(tool, args = {}, inputType = inputTypeOf(tool)) {
  if (!tool || typeof tool.name != "string" || !tool.name)
    throw Object.assign(new TypeError("MCP tool admission requires a named tool"), { rpcCode: INVALID_PARAMS });
  if (inputType === void 0) return args;
  let admitted3 = admit(inputType, args);
  if (!admitted3.ok) {
    let issues = admitted3.refusal.issues.map((issue2) => `${issue2.path || "/"} ${issue2.message}`).join("; ");
    throw Object.assign(new TypeError(`tool ${tool.name} arguments outside inputSchema: ${issues}`), { rpcCode: INVALID_PARAMS });
  }
  return args;
}
function templateMatcher(uriTemplate) {
  let names = [], pattern = uriTemplate.replace(/[.*+?^$()|[\]\\]/gu, "\\$&").replace(/\\?\{([^}]+)\\?\}/gu, (_whole, name) => (names.push(name), "([^/?#]+)")), expression = new RegExp(`^${pattern}$`, "u");
  return (uri) => {
    let found = expression.exec(uri);
    return found ? Object.fromEntries(names.map((name, index2) => [name, decodeURIComponent(found[index2 + 1])])) : void 0;
  };
}
function page(items, cursor, size) {
  if (size === void 0) return { items, next: void 0 };
  let start = cursor === void 0 ? 0 : Number.parseInt(Buffer.from(String(cursor), "base64url").toString("utf8"), 10);
  if (!Number.isSafeInteger(start) || start < 0 || start > items.length) throw Object.assign(new Error("invalid cursor"), { rpcCode: INVALID_PARAMS });
  let end = start + size;
  return { items: items.slice(start, end), next: end < items.length ? Buffer.from(String(end)).toString("base64url") : void 0 };
}
function createMcpServer({ name, version, title, instructions, tools = [], toolSources = [], resources = [], resourceTemplates = [], prompts = [], pageSize, observe }) {
  if (typeof name != "string" || typeof version != "string") throw new TypeError("an MCP server needs a name and a version");
  let catalogTools, toolsByName, inputTypes, refreshToolCatalog = () => {
    catalogTools = [...toolSources.flatMap((source) => [...source]), ...tools];
    let nextTools = new Map(catalogTools.map((tool) => [tool.name, tool]));
    if (nextTools.size !== catalogTools.length) throw new TypeError("tool names must be unique");
    toolsByName = nextTools, inputTypes = new Map(catalogTools.map((tool) => [tool.name, inputTypeOf(tool)]));
  };
  refreshToolCatalog();
  let notificationListeners = /* @__PURE__ */ new Set(), toolsCanChange = toolSources.some((source) => typeof source.subscribe == "function"), changed = (notification = { jsonrpc: "2.0", method: "notifications/tools/list_changed" }) => {
    refreshToolCatalog();
    for (let listener of notificationListeners)
      try {
        listener(notification)?.catch?.(() => {
        });
      } catch {
      }
  };
  for (let source of toolSources) source.subscribe?.(changed);
  let templates = resourceTemplates.map((template) => ({ template, match: templateMatcher(template.uriTemplate) })), promptsByName = new Map(prompts.map((prompt) => [prompt.name, prompt])), shown = (entry, context) => entry.visible === void 0 || entry.visible(context) === !0, capabilities = Object.freeze({
    ...catalogTools.length > 0 || toolSources.length > 0 ? { tools: { listChanged: toolsCanChange } } : {},
    ...resources.length + resourceTemplates.length > 0 ? { resources: { subscribe: !1, listChanged: !1 } } : {},
    ...prompts.length > 0 ? { prompts: { listChanged: !1 } } : {},
    logging: {},
    completions: {}
  }), methods = {
    initialize: (params) => ({
      protocolVersion: MCP_PROTOCOL_VERSIONS.includes(params?.protocolVersion) ? params.protocolVersion : LATEST_MCP_PROTOCOL_VERSION,
      capabilities,
      serverInfo: { name, version, ...title === void 0 ? {} : { title } },
      ...instructions === void 0 ? {} : { instructions }
    }),
    ping: () => ({}),
    "logging/setLevel": () => ({}),
    "completion/complete": () => ({ completion: { values: [], hasMore: !1 } }),
    "tools/list": async (params, context) => {
      await Promise.all(toolSources.map((source) => source.refresh?.())), refreshToolCatalog();
      let { items, next } = page(catalogTools.filter((tool) => shown(tool, context)), params?.cursor, pageSize);
      return { tools: items.map(toolView), ...next === void 0 ? {} : { nextCursor: next } };
    },
    "tools/call": async (params, context) => {
      refreshToolCatalog();
      let tool = toolsByName.get(params?.name);
      if (tool === void 0 || !shown(tool, context)) throw Object.assign(new Error(`unknown tool: ${params?.name}`), { rpcCode: INVALID_PARAMS });
      let args = admitMcpToolArguments(tool, params?.arguments ?? {}, inputTypes.get(tool.name));
      try {
        return mcpToolResult(await tool.handler(args, context));
      } catch (error) {
        return mcpToolError(error);
      }
    },
    "resources/list": (params, context) => {
      let { items, next } = page(resources.filter((resource) => shown(resource, context)), params?.cursor, pageSize);
      return { resources: items.map(resourceView), ...next === void 0 ? {} : { nextCursor: next } };
    },
    "resources/templates/list": (params, context) => {
      let { items, next } = page(resourceTemplates.filter((template) => shown(template, context)), params?.cursor, pageSize);
      return { resourceTemplates: items.map(templateView), ...next === void 0 ? {} : { nextCursor: next } };
    },
    "resources/read": async (params, context) => {
      let uri = params?.uri, direct = resources.find((resource) => resource.uri === uri && shown(resource, context)), read = direct !== void 0 ? () => direct.read(uri, context) : (() => {
        for (let { template, match } of templates) {
          let variables = shown(template, context) ? match(uri) : void 0;
          if (variables !== void 0) return () => template.read(uri, variables, context);
        }
      })();
      if (read === void 0) throw Object.assign(new Error(`resource not found: ${uri}`), { rpcCode: RESOURCE_NOT_FOUND });
      let value = await read();
      if (value == null) throw Object.assign(new Error(`resource not found: ${uri}`), { rpcCode: RESOURCE_NOT_FOUND });
      return { contents: (Array.isArray(value?.contents) ? value.contents : [value]).map((content) => ({ uri, ...content })) };
    },
    "prompts/list": (params, context) => {
      let { items, next } = page(prompts.filter((prompt) => shown(prompt, context)), params?.cursor, pageSize);
      return { prompts: items.map(promptView), ...next === void 0 ? {} : { nextCursor: next } };
    },
    "prompts/get": async (params, context) => {
      let prompt = promptsByName.get(params?.name);
      if (prompt === void 0 || !shown(prompt, context)) throw Object.assign(new Error(`unknown prompt: ${params?.name}`), { rpcCode: INVALID_PARAMS });
      let got = await prompt.get(params?.arguments ?? {}, context);
      return Array.isArray(got) ? { messages: got } : got;
    }
  };
  async function handleOne(request, context) {
    if (!isObject3(request) || request.jsonrpc !== "2.0" || typeof request.method != "string") return mcpRpcError(request?.id, INVALID_REQUEST, "invalid request");
    let notification = !("id" in request);
    if (request.method.startsWith("notifications/") || notification) return null;
    let method = methods[request.method];
    if (method === void 0) return mcpRpcError(request.id, METHOD_NOT_FOUND, `method not found: ${request.method}`);
    try {
      return mcpOk(request.id, await method(request.params, context));
    } catch (error) {
      return mcpRpcError(request.id, error?.rpcCode ?? INTERNAL_ERROR, message(error));
    }
  }
  async function handleMessage(incoming, context = {}) {
    observe?.({ direction: "in", message: incoming, context });
    let response;
    if (Array.isArray(incoming)) {
      let answers = (await Promise.all(incoming.map((one) => handleOne(one, context)))).filter((answer) => answer !== null);
      response = incoming.length === 0 ? mcpRpcError(null, INVALID_REQUEST, "empty batch") : answers.length === 0 ? null : answers;
    } else
      response = await handleOne(incoming, context);
    return response !== null && observe?.({ direction: "out", message: response, context }), response;
  }
  let subscribeNotifications = (listener) => (notificationListeners.add(listener), () => notificationListeners.delete(listener));
  return Object.freeze({
    name,
    version,
    handleMessage,
    onNotification: subscribeNotifications,
    serveStdio: (options) => serveMcpStdio(handleMessage, { ...options, subscribeNotifications })
  });
}
function serveMcpStdio(handleMessage, { input = process.stdin, output = process.stdout, context = {}, subscribeNotifications } = {}) {
  let buffer = Buffer.alloc(0), chain = Promise.resolve(), closed = !1, write = (text2) => new Promise((resolve3) => {
    output.write(text2) ? resolve3() : output.once("drain", resolve3);
  }), respond = (framed, value) => {
    let text2 = JSON.stringify(value);
    return write(framed ? `Content-Length: ${Buffer.byteLength(text2)}\r
\r
${text2}` : `${text2}
`);
  }, dispatch = (text2, framed) => {
    chain = chain.then(async () => {
      if (text2.trim() === "") return;
      let parsed;
      try {
        parsed = JSON.parse(text2);
      } catch (error) {
        await respond(framed, mcpRpcError(null, PARSE_ERROR, message(error)));
        return;
      }
      let answer = await handleMessage(parsed, context);
      answer !== null && await respond(framed, answer);
    });
  }, unsubscribeNotifications = subscribeNotifications?.((notification) => (chain = chain.then(() => respond(!1, notification)), chain)), drain = () => {
    for (; ; )
      if (/^\s*Content-Length:/iu.test(buffer.subarray(0, 32).toString("latin1"))) {
        let end = buffer.indexOf(`\r
\r
`);
        if (end < 0) return;
        let length = Number(/Content-Length:\s*(\d+)/iu.exec(buffer.subarray(0, end).toString("latin1"))?.[1]);
        if (!Number.isSafeInteger(length)) {
          buffer = buffer.subarray(end + 4);
          continue;
        }
        if (buffer.length < end + 4 + length) return;
        dispatch(buffer.subarray(end + 4, end + 4 + length).toString("utf8"), !0), buffer = buffer.subarray(end + 4 + length);
      } else {
        let newline = buffer.indexOf(10);
        if (newline < 0) return;
        dispatch(buffer.subarray(0, newline).toString("utf8"), !1), buffer = buffer.subarray(newline + 1);
      }
  }, onData = (chunk) => {
    buffer = Buffer.concat([buffer, Buffer.from(chunk)]), drain();
  }, onEnd = () => {
    buffer.length > 0 && (dispatch(buffer.toString("utf8"), !1), buffer = Buffer.alloc(0));
  };
  return input.on("data", onData), input.on("end", onEnd), Object.freeze({
    done: () => chain,
    close: async () => {
      closed || (closed = !0, unsubscribeNotifications?.(), input.off("data", onData), input.off("end", onEnd), await chain);
    }
  });
}
var PARSE_ERROR, INVALID_REQUEST, METHOD_NOT_FOUND, INVALID_PARAMS, INTERNAL_ERROR, RESOURCE_NOT_FOUND, rpcId, message, isObject3, toolView, resourceView, templateView, promptView, init_server = __esm({
  "node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/server.mjs"() {
    init_type_system();
    init_protocol_versions();
    init_protocol_versions();
    PARSE_ERROR = -32700, INVALID_REQUEST = -32600, METHOD_NOT_FOUND = -32601, INVALID_PARAMS = -32602, INTERNAL_ERROR = -32603, RESOURCE_NOT_FOUND = -32002, rpcId = (id) => typeof id == "string" || typeof id == "number" ? id : null, message = (error) => error instanceof Error ? error.message : String(error), isObject3 = (value) => value !== null && typeof value == "object" && !Array.isArray(value);
    toolView = ({ handler: _handler, visible: _visible, admitArguments: _admit, ...view }) => ({ inputSchema: { type: "object" }, ...view }), resourceView = ({ read: _read, visible: _visible, ...view }) => view, templateView = ({ read: _read, match: _match, visible: _visible, ...view }) => view, promptView = ({ get: _get, visible: _visible, ...view }) => view;
  }
});

// node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/modern.mjs
function mcpProtocolEra(version) {
  return version === MCP_MODERN_PROTOCOL_VERSION ? "modern-stateless" : MCP_PROTOCOL_VERSIONS.includes(version) ? "legacy-session" : "unknown";
}
function headerValue(headers, wanted) {
  if (headers && typeof headers.get == "function" && !(headers instanceof Map)) {
    let value = headers.get(wanted);
    return value === null ? void 0 : value;
  }
  let target = wanted.toLowerCase(), entries = headers instanceof Map ? headers.entries() : Object.entries(headers ?? {});
  for (let [key, value] of entries) if (key.toLowerCase() === target) return value;
}
function asRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value) ? value : void 0;
}
function nonemptyString(value) {
  return typeof value == "string" && value.trim().length > 0 ? value : void 0;
}
function expectedName(method, params) {
  return method === "tools/call" || method === "prompts/get" ? { required: !0, value: nonemptyString(params?.name) } : method === "resources/read" ? { required: !0, value: nonemptyString(params?.uri) } : { required: !1 };
}
function assayMcpModernRequest({ request, headers }) {
  let reasons = [];
  request?.jsonrpc !== "2.0" && reasons.push("jsonrpc-version-invalid"), (request?.id === void 0 || request?.id === null) && reasons.push("request-id-missing");
  let method = nonemptyString(request?.method);
  method === void 0 && reasons.push("method-missing");
  let params = asRecord(request?.params);
  params === void 0 && reasons.push("params-missing");
  let meta = asRecord(params?._meta);
  meta === void 0 && reasons.push("meta-missing");
  let bodyProtocol = nonemptyString(meta?.["io.modelcontextprotocol/protocolVersion"]);
  bodyProtocol === void 0 ? reasons.push("body-protocol-version-missing") : bodyProtocol !== MCP_MODERN_PROTOCOL_VERSION && reasons.push("body-protocol-version-mismatch"), asRecord(meta?.["io.modelcontextprotocol/clientCapabilities"]) === void 0 && reasons.push("client-capabilities-missing");
  let clientInfo = meta?.["io.modelcontextprotocol/clientInfo"];
  clientInfo !== void 0 && (asRecord(clientInfo) === void 0 || nonemptyString(clientInfo.name) === void 0 || nonemptyString(clientInfo.version) === void 0) && reasons.push("client-info-invalid");
  let seen = Object.freeze({
    protocolVersion: headerValue(headers, "MCP-Protocol-Version"),
    method: headerValue(headers, "Mcp-Method"),
    name: headerValue(headers, "Mcp-Name"),
    sessionId: headerValue(headers, "Mcp-Session-Id")
  });
  seen.protocolVersion === void 0 ? reasons.push("protocol-header-missing") : (seen.protocolVersion !== MCP_MODERN_PROTOCOL_VERSION || bodyProtocol !== void 0 && seen.protocolVersion !== bodyProtocol) && reasons.push("protocol-header-mismatch"), seen.method === void 0 ? reasons.push("method-header-missing") : method !== void 0 && seen.method !== method && reasons.push("method-header-mismatch");
  let name = expectedName(method, params);
  name.required ? (name.value === void 0 && reasons.push("name-body-missing"), seen.name === void 0 ? reasons.push("name-header-missing") : name.value !== void 0 && seen.name !== name.value && reasons.push("name-header-mismatch")) : seen.name !== void 0 && reasons.push("name-header-unexpected"), seen.sessionId !== void 0 && reasons.push("session-id-present");
  let unique = Object.freeze([...new Set(reasons)]);
  return Object.freeze({
    kind: unique.length === 0 ? "metroplat.mcp.modern-request:witness" : "metroplat.mcp.modern-request-obstruction",
    ok: unique.length === 0,
    protocolVersion: MCP_MODERN_PROTOCOL_VERSION,
    ...method === void 0 ? {} : { method },
    ...name.value === void 0 ? {} : { name: name.value },
    headers: seen,
    reasons: unique,
    evidence: Object.freeze([
      "protocol-era:modern-stateless",
      `protocol-version:${MCP_MODERN_PROTOCOL_VERSION}`,
      ...method === void 0 ? [] : [`method:${method}`],
      ...name.value === void 0 ? [] : [`name:${name.value}`],
      `header-mismatch-error-code:${MCP_MODERN_HEADER_MISMATCH_ERROR_CODE}`
    ])
  });
}
function mcpModernDiscovery({
  serverName,
  serverVersion,
  supportedVersions = [MCP_MODERN_PROTOCOL_VERSION],
  capabilities = { tools: {} },
  ttlMs = 6e4,
  cacheScope = "public"
} = {}) {
  if (nonemptyString(serverName) === void 0 || nonemptyString(serverVersion) === void 0 || !Array.isArray(supportedVersions) || !supportedVersions.length || new Set(supportedVersions).size !== supportedVersions.length || !supportedVersions.includes(MCP_MODERN_PROTOCOL_VERSION) || supportedVersions.some((version) => typeof version != "string" || mcpProtocolEra(version) === "unknown"))
    throw new TypeError("modern discovery must name its server and actual supported versions");
  if (asRecord(capabilities) === void 0 || Object.values(capabilities).some((value) => asRecord(value) === void 0))
    throw new TypeError("modern discovery capabilities must be finite object maps");
  if (!Number.isSafeInteger(ttlMs) || ttlMs < 0 || ttlMs > 864e5 || !["public", "private"].includes(cacheScope))
    throw new TypeError("modern discovery caching policy must be bounded and scoped");
  return Object.freeze({
    resultType: "complete",
    supportedVersions: Object.freeze([...supportedVersions]),
    capabilities: Object.freeze(Object.fromEntries(Object.entries(capabilities).map(([name, value]) => [name, Object.freeze({ ...value })]))),
    _meta: Object.freeze({
      "io.modelcontextprotocol/serverInfo": Object.freeze({
        name: serverName,
        version: serverVersion
      })
    }),
    ttlMs,
    cacheScope
  });
}
var MCP_MODERN_PROTOCOL_VERSION, MCP_MODERN_HEADER_MISMATCH_ERROR_CODE, MCP_PROTOCOL_MIGRATION_PROFILE, MCP_MODERN_PROFILE, init_modern = __esm({
  "node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/modern.mjs"() {
    init_protocol_versions();
    MCP_MODERN_PROTOCOL_VERSION = "2026-07-28", MCP_MODERN_HEADER_MISMATCH_ERROR_CODE = -32020;
    MCP_PROTOCOL_MIGRATION_PROFILE = Object.freeze({
      kind: "metroplat.mcp.protocol-migration-profile",
      currentDefault: LATEST_MCP_PROTOCOL_VERSION,
      currentEra: "legacy-session",
      target: MCP_MODERN_PROTOCOL_VERSION,
      targetEra: "modern-stateless",
      ready: !1,
      blockers: Object.freeze([
        "remove initialize/initialized as the modern request bootstrap",
        "implement server/discover capability discovery",
        "carry client identity/capabilities per request in _meta",
        "implement Mcp-Method/Mcp-Name header routing",
        "implement deterministic cacheable list-result hints",
        "model Tasks as the io.modelcontextprotocol/tasks extension",
        "receive modern authorization hardening and conformance tests"
      ])
    }), MCP_MODERN_PROFILE = Object.freeze({
      kind: "metroplat.mcp.modern-profile",
      protocolVersion: MCP_MODERN_PROTOCOL_VERSION,
      era: "modern-stateless",
      wireConformant: !1,
      coverage: Object.freeze([
        "per-request protocol-version metadata",
        "per-request client-capabilities metadata",
        "optional named and versioned client identity metadata",
        "MCP-Protocol-Version header mirror",
        "Mcp-Method header mirror",
        "Mcp-Name header mirror for core named methods",
        "modern session-id absence"
      ]),
      missing: Object.freeze([
        "server/discover result/cache semantics",
        "authorization profile",
        "Mcp-Param-* schema mirroring",
        "subscriptions/listen",
        "multi-round-trip inputRequired/requestState",
        "extension negotiation including tasks",
        "SDK/TCK conformance receiving"
      ])
    });
  }
});

// node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/http.mjs
function carrier(ctx) {
  let request = ctx.request, header = request !== void 0 ? (name) => request.headers.get(name) ?? void 0 : (name) => {
    let value = ctx.req?.headers?.[name];
    return Array.isArray(value) ? value.join(", ") : value;
  }, url = ctx.url ?? new URL(request?.url ?? `http://${header("host") ?? "localhost"}${ctx.req?.url ?? "/"}`);
  return {
    method: request?.method ?? ctx.req?.method ?? "GET",
    header,
    url,
    remoteAddress: ctx.remoteAddress ?? ctx.req?.socket?.remoteAddress,
    async body(maxBytes) {
      let decoder = new TextDecoder("utf-8", { fatal: !0 });
      if (ctx.input?.bytes !== void 0) {
        let bytes = await ctx.input.bytes();
        if (bytes.byteLength > maxBytes) throw new RangeError("body too large");
        return decoder.decode(bytes);
      }
      if (request !== void 0) {
        let reader = request.body?.getReader();
        if (!reader) return "";
        let size2 = 0, text3 = "";
        try {
          for (; ; ) {
            let { done, value } = await reader.read();
            if (done) break;
            if (size2 += value.byteLength, size2 > maxBytes) throw new RangeError("body too large");
            text3 += decoder.decode(value, { stream: !0 });
          }
          return text3 + decoder.decode();
        } catch (error) {
          try {
            await reader.cancel();
          } catch {
          }
          throw error;
        } finally {
          reader.releaseLock();
        }
      }
      let size = 0, text2 = "";
      for await (let chunk of ctx.req) {
        let bytes = typeof chunk == "string" ? new TextEncoder().encode(chunk) : chunk;
        if (size += bytes.byteLength, size > maxBytes) throw new RangeError("body too large");
        text2 += decoder.decode(bytes, { stream: !0 });
      }
      return text2 + decoder.decode();
    }
  };
}
function originAdmitted(origin, url, allowed = [], exact = !1) {
  if (origin === void 0) return !0;
  let parsed;
  try {
    parsed = new URL(origin);
  } catch {
    return !1;
  }
  return (exact ? parsed.origin === url.origin : parsed.host === url.host) || allowed.includes(parsed.origin);
}
function mcpResource(options) {
  let server = options.server ?? createMcpServer(options), path = options.path ?? "/mcp", maxBytes = options.maxBodyBytes ?? DEFAULT_MAX_BODY_BYTES, modern = options.modern;
  if (modern !== void 0 && (!modern || !Array.isArray(modern.supportedVersions) || !modern.supportedVersions.includes(MCP_MODERN_PROTOCOL_VERSION) || modern.supportedVersions.some((version) => version !== MCP_MODERN_PROTOCOL_VERSION && !MCP_PROTOCOL_VERSIONS.includes(version)) || new Set(modern.supportedVersions).size !== modern.supportedVersions.length || options.sessions === !0))
    throw new TypeError("stateless modern MCP needs real supported versions and no legacy session store");
  let allowedVersions = modern?.supportedVersions ?? MCP_PROTOCOL_VERSIONS, sessions = options.sessions === !0 ? /* @__PURE__ */ new Set() : void 0, allow = sessions === void 0 ? "POST" : "POST, DELETE", challenge = (url, error) => {
    let metadata = typeof options.resourceMetadataUrl == "function" ? options.resourceMetadataUrl(url) : options.resourceMetadataUrl;
    return bearerChallenge({ ...options.realm === void 0 ? {} : { realm: options.realm }, ...error === void 0 ? {} : { error }, ...metadata === void 0 ? {} : { resourceMetadata: metadata } });
  };
  async function handler(ctx) {
    let http = carrier(ctx);
    if (http.method === "GET" || http.method === "HEAD") return plain(http.method === "HEAD" ? null : "Method Not Allowed", 405, { allow });
    let version = http.header("mcp-protocol-version");
    if (version !== void 0 && !allowedVersions.includes(version))
      return json2(modern ? mcpRpcError(
        null,
        -32022,
        "Unsupported protocol version",
        { supported: [...allowedVersions], requested: version }
      ) : mcpRpcError(null, INVALID_REQUEST, `unsupported MCP-Protocol-Version: ${version}`), 400);
    if (!originAdmitted(http.header("origin"), http.url, options.allowedOrigins, modern?.exactOrigin === !0))
      return json2(mcpRpcError(null, INVALID_REQUEST, "origin not allowed"), 403);
    let bearer = bearerToken(http.header("authorization")), principal;
    if (options.verifyToken !== void 0) {
      try {
        principal = bearer === void 0 ? void 0 : await options.verifyToken(bearer, ctx) ?? void 0;
      } catch {
        principal = void 0;
      }
      let bypass = options.loopbackBypass === !0 && LOOPBACK.has(http.remoteAddress) && http.header("x-forwarded-for") === void 0;
      if (principal === void 0 && !bypass)
        return json2(
          { error: "invalid_token", error_description: bearer === void 0 ? "a bearer token is required" : "the bearer token is not valid" },
          401,
          { "www-authenticate": challenge(http.url, bearer === void 0 ? void 0 : "invalid_token") }
        );
    }
    let sessionId = http.header("mcp-session-id");
    if (sessions !== void 0 && sessionId !== void 0 && !sessions.has(sessionId)) return json2(mcpRpcError(null, INVALID_REQUEST, "unknown session"), 404);
    if (http.method === "DELETE")
      return sessions === void 0 ? plain("Method Not Allowed", 405, { allow }) : (sessionId !== void 0 && sessions.delete(sessionId), new Response(null, { status: 204 }));
    if (http.method !== "POST") return plain("Method Not Allowed", 405, { allow });
    let length = http.header("content-length");
    if (length !== void 0 && (!/^\d+$/u.test(length) || Number(length) > maxBytes))
      return json2(mcpRpcError(null, INVALID_REQUEST, "request body too large"), 413);
    let incoming;
    try {
      incoming = JSON.parse(await http.body(maxBytes));
    } catch (error) {
      return json2(mcpRpcError(null, PARSE_ERROR, error instanceof RangeError ? "request body too large" : "request body is not JSON"), error instanceof RangeError ? 413 : 400);
    }
    let isModern = version === MCP_MODERN_PROTOCOL_VERSION && modern !== void 0;
    if (isModern) {
      let witness = assayMcpModernRequest({
        request: incoming,
        headers: { get: (name) => http.header(name) ?? null }
      });
      if (!witness.ok) {
        let mismatch = witness.reasons.some((reason) => reason.includes("header") || reason === "session-id-present");
        return json2(mcpRpcError(
          typeof incoming?.id == "number" || typeof incoming?.id == "string" ? incoming.id : null,
          mismatch ? MCP_MODERN_HEADER_MISMATCH_ERROR_CODE : INVALID_PARAMS,
          (mismatch ? "HeaderMismatch" : "InvalidRequest") + ": " + witness.reasons.join(", ")
        ), 400);
      }
      if (incoming.method === "server/discover")
        return json2(mcpOk(incoming.id, mcpModernDiscovery({
          serverName: options.name ?? server.name,
          serverVersion: options.version ?? server.version,
          supportedVersions: allowedVersions,
          capabilities: { tools: { listChanged: !1 } },
          ttlMs: modern.ttlMs ?? 6e4,
          cacheScope: modern.cacheScope ?? "public"
        })));
      if (incoming.method === "initialize" || incoming.method === "notifications/initialized" || incoming.method === "ping")
        return json2(mcpRpcError(incoming.id, METHOD_NOT_FOUND, "Method not found"), 404);
    }
    let harnessSession = http.header("x-harness-session"), meta = {
      ...bearer === void 0 ? {} : { bearer },
      ...principal === void 0 ? {} : { principal },
      ...sessionId === void 0 ? {} : { session: sessionId },
      ...typeof harnessSession == "string" && /^[A-Za-z0-9._:-]{1,200}$/u.test(harnessSession) ? { harnessSession } : {},
      ctx
    }, bound = await options.bind?.(meta) ?? {}, answer;
    try {
      answer = await server.handleMessage(incoming, { ...meta, ...bound });
    } finally {
      await bound.close?.();
    }
    if (answer === null) return new Response(null, { status: 202 });
    if (isModern) {
      if (answer.error) {
        let status = answer.error.code === METHOD_NOT_FOUND ? 404 : answer.error.code === INVALID_PARAMS ? 400 : 500;
        return json2(answer, status);
      }
      return json2(mcpOk(incoming.id, {
        ...answer.result,
        resultType: "complete",
        ...incoming.method === "tools/list" ? {
          ttlMs: modern.ttlMs ?? 6e4,
          cacheScope: modern.cacheScope ?? "public"
        } : {}
      }));
    }
    let headers = {}, initializing = !Array.isArray(incoming) && incoming?.method === "initialize" && answer.result !== void 0;
    if (sessions !== void 0 && initializing) {
      let id = crypto.randomUUID();
      sessions.add(id), headers["mcp-session-id"] = id;
    }
    return wantsEventStream(http.header("accept")) ? new Response(`event: message
data: ${JSON.stringify(answer)}

`, { status: 200, headers: { "content-type": "text/event-stream", "cache-control": "no-store", ...headers } }) : json2(answer, 200, headers);
  }
  return Object.freeze({ id: "mcp.endpoint", name: "MCP Endpoint", route: path, match: path, methods: Object.freeze(["GET", "HEAD", "POST", "DELETE"]), handler });
}
var DEFAULT_MAX_BODY_BYTES, LOOPBACK, json2, plain, wantsEventStream, init_http = __esm({
  "node_modules/.pnpm/@red-cup-engineering+mcp-engineering-services-section@0.1.6/node_modules/@red-cup-engineering/mcp-engineering-services-section/src/http.mjs"() {
    init_bearer_authentication();
    init_server();
    init_modern();
    DEFAULT_MAX_BODY_BYTES = 4 * 1024 * 1024, LOOPBACK = /* @__PURE__ */ new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
    json2 = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...headers } }), plain = (text2, status, headers = {}) => new Response(text2, { status, headers: { "content-type": "text/plain; charset=utf-8", ...headers } });
    wantsEventStream = (accept = "") => /text\/event-stream/iu.test(accept) && !/application\/json|\*\/\*/iu.test(accept);
  }
});

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/shop-mcp.mjs
var shop_mcp_exports = {};
__export(shop_mcp_exports, {
  createShopMcpEndpoint: () => createShopMcpEndpoint,
  selectShopProducts: () => selectShopProducts
});
function selectShopProducts(publicCatalog2, {
  mode = "list",
  id,
  query = "",
  status,
  purchasableOnly = !1,
  offset = 0,
  limit: limit2 = 20,
  origin,
  goodsPath = "/goods/"
} = {}) {
  if (!publicCatalog2 || typeof publicCatalog2.merchant?.name != "string" || !Array.isArray(publicCatalog2.offerings))
    throw new TypeError("Shop discovery requires a seller-authored public catalog");
  if (typeof origin != "string") throw new TypeError("Shop origin must be HTTPS");
  let base = new URL(origin);
  if (base.origin !== origin || base.protocol !== "https:" || base.username || base.password)
    throw new TypeError("Shop origin must be a canonical HTTPS origin");
  if (typeof goodsPath != "string" || !/^\/(?:[a-zA-Z0-9_-]+\/)*$/u.test(goodsPath))
    throw new TypeError("Shop products need an absolute canonical goods prefix");
  if (!["list", "search", "get"].includes(mode)) throw new TypeError("unknown Shop discovery operation");
  if (!Number.isSafeInteger(offset) || offset < 0 || offset > MAX_OFFSET || !Number.isSafeInteger(limit2) || limit2 < 1 || limit2 > MAX_RESULTS)
    throw new RangeError("Shop discovery needs bounded offset and limit");
  if (typeof query != "string" || query.length > 160 || mode === "search" && query.trim().length === 0)
    throw new TypeError("Shop search needs a bounded nonempty query");
  if (status !== void 0 && !STATUSES.has(status)) throw new TypeError("invalid Shop status filter");
  if (typeof purchasableOnly != "boolean") throw new TypeError("purchasableOnly must be Boolean");
  if (mode === "get" && (typeof id != "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(id)))
    throw new TypeError("get_product requires an exact Shop product id");
  let original = publicCatalog2.offerings, productUrl = (product) => new URL(goodsPath + encodeURIComponent(product.id), origin).href, present2 = (product) => Object.freeze({ ...product, url: productUrl(product) });
  if (mode === "get") {
    let product = original.find((product2) => product2.id === id);
    return product ? present2(product) : null;
  }
  let indexed = original.map((product) => ({
    id: product.id,
    title: product.title ?? product.id,
    summary: product.blurb ?? product.subtitle ?? "",
    keywords: product.keywords ?? []
  })), matches = filterStorefrontItems({ items: indexed }, {
    term: mode === "search" ? query.trim() : "",
    facets: {}
  }), matched = new Set(matches.map((product) => product.id)), filtered = original.filter((product) => matched.has(product.id) && (status === void 0 || product.status === status) && (!purchasableOnly || product.buyable === !0));
  return Object.freeze({
    merchant: publicCatalog2.merchant,
    sourceUrl: new URL("/catalog.json", origin).href,
    total: filtered.length,
    offset,
    limit: limit2,
    products: Object.freeze(filtered.slice(offset, offset + limit2).map(present2)),
    nextOffset: offset + limit2 < filtered.length ? offset + limit2 : null,
    paymentAuthorization: "not granted by read-only discovery"
  });
}
function createShopMcpEndpoint({
  origin,
  goodsPath = "/goods/",
  sellerName,
  readPublicCatalog,
  path = "/mcp"
} = {}) {
  if (typeof sellerName != "string" || !sellerName || typeof readPublicCatalog != "function")
    throw new TypeError("Shop MCP needs seller identity and source readout");
  let tools = [
    {
      name: "list_products",
      title: "List Shop products",
      description: "Browse seller-authored products and present card checkout availability. Listing is not permission to purchase.",
      inputSchema: { type: "object", additionalProperties: !1, properties: {
        status: { type: "string", enum: [...STATUSES] },
        purchasableOnly: { type: "boolean" },
        offset: { type: "integer", minimum: 0, maximum: MAX_OFFSET },
        limit: { type: "integer", minimum: 1, maximum: MAX_RESULTS }
      } },
      annotations: readonly,
      handler: (args, context) => selectShopProducts(context.shopCatalog(), {
        ...args,
        mode: "list",
        origin,
        goodsPath
      })
    },
    {
      name: "search_products",
      title: "Search Shop products",
      description: "Match public products using the human Shop text search. No payment or merchant authority.",
      inputSchema: { type: "object", additionalProperties: !1, properties: {
        query: { type: "string", minLength: 1, maxLength: 160 },
        status: { type: "string", enum: [...STATUSES] },
        purchasableOnly: { type: "boolean" },
        offset: { type: "integer", minimum: 0, maximum: MAX_OFFSET },
        limit: { type: "integer", minimum: 1, maximum: MAX_RESULTS }
      }, required: ["query"] },
      annotations: readonly,
      handler: (args, context) => selectShopProducts(context.shopCatalog(), {
        ...args,
        mode: "search",
        origin,
        goodsPath
      })
    },
    {
      name: "get_product",
      title: "Inspect a Shop product",
      description: "Read one public product, accepted edition hashes, seller URL and purchase availability. Does not initiate checkout.",
      inputSchema: { type: "object", additionalProperties: !1, properties: {
        id: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }
      }, required: ["id"] },
      annotations: readonly,
      handler: (args, context) => selectShopProducts(context.shopCatalog(), {
        ...args,
        mode: "get",
        origin,
        goodsPath
      }) ?? { isError: !0, content: [{ type: "text", text: "No public product has that exact ID" }] }
    }
  ];
  return mcpResource({
    name: sellerName + " Shop",
    version: "1.0.0",
    path,
    tools,
    maxBodyBytes: 32768,
    modern: {
      supportedVersions: ["2026-07-28", "2025-06-18"],
      exactOrigin: !0,
      ttlMs: 6e4,
      cacheScope: "public"
    },
    bind: ({ ctx }) => ({ shopCatalog: () => readPublicCatalog(ctx) })
  });
}
var MAX_RESULTS, MAX_OFFSET, STATUSES, readonly, init_shop_mcp = __esm({
  "node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/shop-mcp.mjs"() {
    init_http();
    init_tufte_storefront();
    MAX_RESULTS = 40, MAX_OFFSET = 1e4, STATUSES = /* @__PURE__ */ new Set(["live", "test-only", "coming-soon", "external"]), readonly = Object.freeze({ readOnlyHint: !0, destructiveHint: !1, openWorldHint: !1 });
  }
});

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/digital-goods-storefront.mjs
var OFFERING_STATUSES = /* @__PURE__ */ new Set(["live", "test-only", "coming-soon", "external"]), PAID_STATUSES = /* @__PURE__ */ new Set(["live", "test-only"]), KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
function bookLanguageTag(book) {
  let value = book?.language ?? "en";
  if (typeof value != "string" || !value.trim()) throw new TypeError("book.language must be a BCP 47 language tag");
  try {
    let [tag] = Intl.getCanonicalLocales(value);
    if (!tag) throw new RangeError("empty language tag");
    return tag;
  } catch {
    throw new TypeError("book.language must be a BCP 47 language tag");
  }
}
var SHA256_HEX = /^[a-f0-9]{64}$/iu;
function isNonEmptyString(value) {
  return typeof value == "string" && value.length > 0;
}
function hasGoods(offering) {
  return Array.isArray(offering.goods) && offering.goods.length > 0;
}
function hasExternalUrl(offering) {
  return isNonEmptyString(offering.externalUrl);
}
function hasRelease(offering) {
  return isNonEmptyString(offering.release);
}
function validateGood(good, path, errors) {
  if (!good || typeof good != "object") {
    errors.push({ path, message: "good must be an object" });
    return;
  }
  isNonEmptyString(good.name) || errors.push({ path: `${path}.name`, message: "name is required" }), isNonEmptyString(good.key) || errors.push({ path: `${path}.key`, message: "key is required" }), isNonEmptyString(good.contentType) || errors.push({ path: `${path}.contentType`, message: "contentType is required" }), (!Number.isInteger(good.byteLength) || good.byteLength <= 0) && errors.push({ path: `${path}.byteLength`, message: "byteLength must be a positive integer" }), (!isNonEmptyString(good.sha256) || !SHA256_HEX.test(good.sha256)) && errors.push({ path: `${path}.sha256`, message: "sha256 must be a 64-character hex digest" });
}
function validateOffering(offering, index2, seenIds, errors) {
  let path = offering && typeof offering.id == "string" ? `offerings[${offering.id}]` : `offerings[${index2}]`;
  if (!offering || typeof offering != "object") {
    errors.push({ path, message: "offering must be an object" });
    return;
  }
  if (!isNonEmptyString(offering.id) || !KEBAB_CASE.test(offering.id) ? errors.push({ path, message: "id is required and must be kebab-case" }) : seenIds.has(offering.id) ? errors.push({ path, message: `duplicate offering id "${offering.id}"` }) : seenIds.add(offering.id), isNonEmptyString(offering.title) || errors.push({ path, message: "title is required" }), isNonEmptyString(offering.line) || errors.push({ path, message: "line is required" }), !OFFERING_STATUSES.has(offering.status)) {
    errors.push({ path, message: `status must be one of ${[...OFFERING_STATUSES].join(", ")}` });
    return;
  }
  if (PAID_STATUSES.has(offering.status) ? ((!Number.isInteger(offering.priceCents) || offering.priceCents <= 0) && errors.push({ path, message: "priceCents must be a positive integer" }), isNonEmptyString(offering.currency) || errors.push({ path, message: "currency is required" }), !hasGoods(offering) && !hasExternalUrl(offering) && !hasRelease(offering) && errors.push({ path, message: "goods, release or externalUrl is required" }), hasGoods(offering) && offering.goods.forEach((good, goodIndex) => validateGood(good, `${path}.goods[${goodIndex}]`, errors))) : offering.status === "external" && (hasExternalUrl(offering) || errors.push({ path, message: "externalUrl is required" })), offering.release !== void 0 && (!isNonEmptyString(offering.release) || !KEBAB_CASE.test(offering.release)) && errors.push({ path, message: "release must name a kebab-case paid-release id" }), offering.book !== void 0 && (!offering.book || typeof offering.book != "object" || Array.isArray(offering.book)))
    errors.push({ path, message: "book must be an object" });
  else if (offering.book)
    try {
      bookLanguageTag(offering.book);
    } catch {
      errors.push({ path: path + ".book.language", message: "book.language must be a BCP 47 language tag" });
    }
}
function validateCatalog(catalog) {
  let errors = [];
  if (!catalog || typeof catalog != "object")
    return { valid: !1, errors: [{ path: "$", message: "catalog must be an object" }] };
  if ((!catalog.merchant || typeof catalog.merchant != "object") && errors.push({ path: "merchant", message: "merchant is required" }), !Array.isArray(catalog.offerings))
    return errors.push({ path: "offerings", message: "offerings must be an array" }), { valid: errors.length === 0, errors };
  let seenIds = /* @__PURE__ */ new Set();
  return catalog.offerings.forEach((offering, index2) => validateOffering(offering, index2, seenIds, errors)), { valid: errors.length === 0, errors };
}
function publicCatalog(catalog) {
  let validity = validateCatalog(catalog);
  if (!validity.valid) throw new TypeError(`invalid catalog: ${validity.errors.map((e) => e.message).join("; ")}`);
  let pick = (record5, keys) => Object.fromEntries(keys.filter((key) => Object.hasOwn(record5, key)).map((key) => [key, record5[key]])), file = (source) => pick(source, ["format", "bytes", "sha256", "contentType", "byteLength"]), offerings = catalog.offerings.map((source) => {
    let offering = pick(source, [
      "id",
      "title",
      "subtitle",
      "blurb",
      "keywords",
      "cover",
      "status",
      "priceCents",
      "currency",
      "release",
      "agentOfferUrl",
      "externalUrl"
    ]);
    if (source.goods && (offering.goods = source.goods.map((good) => pick(
      good,
      ["name", "contentType", "byteLength", "sha256"]
    ))), source.book) {
      let book = pick(source.book, [
        "author",
        "authorship",
        "publisher",
        "subjects",
        "marks",
        "contents",
        "series",
        "profile",
        "textProvenance",
        "coverIllustration",
        "coverArt",
        "generatedIllustrations",
        "print",
        "language"
      ]);
      if (source.book.edition) {
        let e = source.book.edition;
        book.edition = {
          ...pick(e, ["digest", "acceptedAt", "pages", "proof"]),
          files: (e.files ?? []).map(file)
        };
      }
      if (source.book.printEdition) {
        let p = source.book.printEdition;
        book.printEdition = {
          ...pick(p, ["profile", "pages", "acceptedAt"]),
          ...p.interior ? { interior: file(p.interior) } : {},
          ...p.cover ? { cover: file(p.cover) } : {}
        };
      }
      offering.book = book;
    }
    return offering;
  });
  return { merchant: pick(catalog.merchant, ["name", "legalBody", "website"]), offerings };
}
function hostnameOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
function stateFor(offering, checkoutArmed) {
  return offering.status === "coming-soon" ? "coming soon" : offering.status === "external" ? `sold at ${hostnameOf(offering.externalUrl)}` : checkoutArmed ? "buy" : "checkout not yet armed";
}
function offeringModel(offering, { checkoutArmed }) {
  let buyable = PAID_STATUSES.has(offering.status) && checkoutArmed;
  return {
    id: offering.id,
    title: offering.title,
    blurb: offering.blurb ?? null,
    line: offering.line,
    status: offering.status,
    priceCents: offering.priceCents ?? null,
    currency: offering.currency ?? null,
    cover: offering.cover ?? null,
    externalUrl: offering.externalUrl ?? null,
    goods: (offering.goods ?? []).map((good) => ({ name: good.name, key: good.key, contentType: good.contentType, byteLength: good.byteLength, sha256: good.sha256 })),
    release: offering.release ?? null,
    book: offering.book ?? null,
    subtitle: offering.subtitle ?? null,
    keywords: offering.keywords ?? [],
    agentOfferUrl: offering.agentOfferUrl ?? null,
    buyable,
    state: stateFor(offering, checkoutArmed)
  };
}
function catalogModel(catalog, { checkoutArmed = !1 } = {}) {
  return {
    merchant: catalog.merchant,
    offerings: catalog.offerings.map((offering) => offeringModel(offering, { checkoutArmed }))
  };
}
function prioritizeStorefrontOfferings(offerings) {
  let priority = (item) => item.status === "live" && item.buyable === !0 ? 0 : item.status === "external" && typeof item.externalUrl == "string" && item.externalUrl.length > 0 ? 1 : item.status === "live" ? 2 : item.status === "test-only" && item.buyable === !0 ? 3 : item.status === "test-only" ? 4 : 5;
  return offerings.map((offering, position) => ({ offering, position })).sort((left, right) => priority(left.offering) - priority(right.offering) || left.position - right.position).map(({ offering }) => offering);
}
function stripeOfferingFor(offering) {
  return {
    id: offering.id,
    status: offering.status === "live" ? "live" : "test-only",
    mode: "payment",
    currency: offering.currency,
    unitAmount: offering.priceCents,
    name: offering.title,
    description: offering.blurb ?? offering.title,
    quantity: { minimum: 1, maximum: 1 },
    beneficiarySettlement: offering.line,
    // Preserve the product owner\'s existing policy evidence through the single
    // catalog-to-Stripe projection. Missing policies remain missing and are
    // refused by Stripe live admission; never invent default customer terms.
    ...typeof offering.terms == "string" ? { terms: offering.terms } : {},
    ...typeof offering.taxPolicy == "string" ? { taxPolicy: offering.taxPolicy } : {},
    ...typeof offering.refundPolicy == "string" ? { refundPolicy: offering.refundPolicy } : {}
  };
}
async function hmacKey(secret) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"]);
}
function base64urlEncode(bytes) {
  let binary = "";
  for (let byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/=+$/u, "");
}
function base64urlDecode(value) {
  let normalized = value.replace(/-/gu, "+").replace(/_/gu, "/"), padded = normalized + "=".repeat((4 - normalized.length % 4) % 4), binary = atob(padded), bytes = new Uint8Array(binary.length);
  for (let index2 = 0; index2 < binary.length; index2 += 1) bytes[index2] = binary.charCodeAt(index2);
  return bytes;
}
async function issueDownloadToken({ secret, offeringId, sessionId, expiresAt }) {
  if (!isNonEmptyString(secret)) throw new Error("secret is required");
  let payloadBytes = new TextEncoder().encode(JSON.stringify({ offeringId, sessionId, expiresAt })), key = await hmacKey(secret), signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${base64urlEncode(payloadBytes)}.${base64urlEncode(new Uint8Array(signature))}`;
}
async function verifyDownloadToken({ secret, token: token4, now = Date.now() }) {
  if (!isNonEmptyString(secret) || typeof token4 != "string") return { valid: !1, reason: "missing-token-or-secret" };
  let parts = token4.split(".");
  if (parts.length !== 2) return { valid: !1, reason: "malformed-token" };
  let payloadBytes, signatureBytes;
  try {
    [payloadBytes, signatureBytes] = parts.map((part) => base64urlDecode(part));
  } catch {
    return { valid: !1, reason: "malformed-token" };
  }
  let key = await hmacKey(secret);
  if (!await crypto.subtle.verify("HMAC", key, signatureBytes, payloadBytes)) return { valid: !1, reason: "invalid-signature" };
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch {
    return { valid: !1, reason: "malformed-token" };
  }
  return typeof payload.expiresAt != "number" || now > payload.expiresAt ? { valid: !1, reason: "expired" } : { valid: !0, offeringId: payload.offeringId, sessionId: payload.sessionId, expiresAt: payload.expiresAt };
}

// node_modules/.pnpm/@red-cup-engineering+stripe-services-section@0.1.11/node_modules/@red-cup-engineering/stripe-services-section/src/checkout-events.mjs
var CHECKOUT_EVENTS = Object.freeze([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded"
]);

// node_modules/.pnpm/@red-cup-engineering+stripe-services-section@0.1.11/node_modules/@red-cup-engineering/stripe-services-section/src/service.mjs
import { createHmac, timingSafeEqual } from "node:crypto";
import { createRequire } from "node:module";
import { dirname as dirname3, join as join2, resolve as resolve2 } from "node:path";
import { fileURLToPath } from "node:url";

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/semantic-content-identity.mjs
init_semiotic_content_address();
init_ni_uri();

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/notation/forms.mjs
var SEN_FORMS = Object.freeze({
  var: { atoms: { 1: "natural" } },
  star: {},
  mark: { atoms: { 1: "text" } },
  lam: { terms: [1], binders: [1] },
  app: { terms: [1, 2] },
  pair: { terms: [1, 2] },
  fst: { terms: [1] },
  snd: { terms: [1] },
  coincide: { terms: [1, 2] },
  cond: { terms: [1, 2, 3] },
  fold: { terms: [1, 2, 3] },
  prim: { atoms: { 1: "text" }, terms: [2] },
  inl: { terms: [1], types: [2] },
  inr: { types: [1], terms: [2] },
  case: { terms: [1, 2, 3], binders: [2, 3] },
  abort: { terms: [1], types: [2] }
}), SEN_TYPE_FORMS = Object.freeze({
  base: {},
  unit: {},
  arrow: { types: [1, 2] },
  prod: { types: [1, 2] },
  list: { types: [1] },
  empty: {},
  sum: { types: [1, 2] }
});

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/notation/schema.mjs
var atomSchemas = {
  natural: { type: "integer", minimum: 0 },
  text: { type: "string" }
};
function tuple(tag, form, references) {
  let width = 1 + Object.keys(form.atoms ?? {}).length + (form.terms?.length ?? 0) + (form.types?.length ?? 0), items = Array.from({ length: width }, () => ({}));
  items[0] = { const: tag };
  for (let index2 of form.terms ?? [])
    items[index2] = { $ref: references.term };
  for (let index2 of form.types ?? [])
    items[index2] = { $ref: references.type };
  for (let [index2, constraint] of Object.entries(form.atoms ?? {}))
    items[index2] = atomSchemas[constraint];
  return {
    type: "array",
    prefixItems: items,
    minItems: width,
    maxItems: width,
    items: !1
  };
}
var TySchema = {
  $id: "semiotic-expression-notation/term/ty",
  title: "SEN Ty",
  anyOf: Object.entries(SEN_TYPE_FORMS).map(
    ([tag, form]) => tuple(tag, form, { term: "#", type: "#" })
  )
}, TmSchema = {
  $id: "semiotic-expression-notation/term/tm",
  title: "SEN Tm",
  anyOf: Object.entries(SEN_FORMS).map(
    ([tag, form]) => tuple(tag, form, { term: "#", type: "semiotic-expression-notation/term/ty" })
  )
};

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/notation.mjs
init_four();
var readingNames = readingFamilies.extremal, isReadingName = (value) => isReading(value, "extremal");
function readingCase(subject, branch) {
  function go(remaining) {
    let [name, ...rest] = remaining;
    if (name === void 0)
      throw new TypeError("readingCase: no reading names to dispatch over");
    return rest.length === 0 ? branch(name) : tm.cond(
      tm.coincide(subject, tm.reading(name)),
      branch(name),
      go(rest)
    );
  }
  return go(readingNames);
}
var onReadings2 = (left, right, branch) => readingCase(left, (l) => readingCase(right, (r) => branch(l, r)));
var tm = {
  var: (index2) => {
    if (!Number.isInteger(index2) || index2 < 0)
      throw new TypeError(
        `tm.var: de-Bruijn index must be a natural number: ${index2}`
      );
    return Object.freeze(["var", index2]);
  },
  lam: (body) => Object.freeze(["lam", body]),
  app: (fn, arg) => Object.freeze(["app", fn, arg]),
  pair: (left, right) => Object.freeze(["pair", left, right]),
  fst: (value) => Object.freeze(["fst", value]),
  snd: (value) => Object.freeze(["snd", value]),
  star: () => Object.freeze(["star"]),
  mark: (surface) => Object.freeze(["mark", surface]),
  /** Construct exactly one of the four readings: a distinguished mark, type base. */
  reading: (name) => {
    if (!isReadingName(name))
      throw new TypeError(`tm.reading: unknown reading ${String(name)}`);
    return Object.freeze(["mark", name]);
  },
  /** `true`/`false` are the truth-axis readings, held and denied. */
  bool: (value) => {
    if (typeof value != "boolean")
      throw new TypeError(`tm.bool: expected boolean, got ${typeof value}`);
    return tm.reading(value ? "held" : "denied");
  },
  /** Whether a reading is told for: its for-side as a truth-axis boolean, total over all four
   *  readings (unlike `boolOfTerm`, which recognizes only held and denied). */
  toldFor: (value) => readingCase(value, (name) => tm.bool(sidesOfReading(name)[0])),
  /** One of the four predication-site generator morphisms (converse/subjectProjection/
   *  objectProjection/specialization) — a bare distinguishable atom with no algebra
   *  defined over it in this grammar, so a mark. */
  generator: (name) => tm.mark(name),
  /** Negation: FOUR's side swap. */
  negate: (value) => readingCase(value, (name) => tm.reading(negateReading(name))),
  /** Conflation: FOUR's complemented swap. */
  conflate: (value) => readingCase(value, (name) => tm.reading(conflateReading(name))),
  /** Complement only (negation after conflation). */
  negConf: (value) => readingCase(value, (name) => tm.reading(negateReading(conflateReading(name)))),
  joinK: (left, right) => onReadings2(left, right, (l, r) => tm.reading(knowledgeJoinReading(l, r))),
  meetK: (left, right) => onReadings2(left, right, (l, r) => tm.reading(knowledgeMeetReading(l, r))),
  joinT: (left, right) => onReadings2(left, right, (l, r) => tm.reading(truthJoinReading(l, r))),
  meetT: (left, right) => onReadings2(left, right, (l, r) => tm.reading(truthMeetReading(l, r))),
  leK: (left, right) => onReadings2(left, right, (l, r) => tm.bool(knowledgeLeqReading(l, r))),
  leT: (left, right) => onReadings2(left, right, (l, r) => tm.bool(truthLeqReading(l, r))),
  /**
   * An assoc-list search over `fold` — the object's entries are `pair(mark(key), value)`
   * spine elements; `coincide` compares keys, `cond` picks. A missing key folds to
   * `mark("null")`, not a stuck redex.
   */
  field: (key, object) => tm.fold(
    tm.lam(
      tm.lam(
        tm.cond(
          tm.coincide(tm.fst(tm.var(0)), tm.mark(JSON.stringify(key))),
          tm.snd(tm.var(0)),
          tm.var(1)
        )
      )
    ),
    tm.mark(JSON.stringify(null)),
    object
  ),
  /** Prepend one element to an array term's spine — O(1), no `fold`: just a `pair` in
   *  front of the existing spine, reusing `array`'s OWN tag (`fst`) rather than a
   *  freshly hardcoded mark. This and `reverseArray` are the two array-combination
   *  primitives this kernel has; `append` (below) is not a third — there is no general
   *  two-arbitrary-list concatenation law in Obsmetrologia's proven math for it to
   *  answer to, so it is only ever the call-site composition of these two. */
  consArray: (elem, array) => tm.pair(tm.fst(array), tm.pair(elem, tm.snd(array))),
  /** Reverse an array term — the one real `fold` either of these needs. */
  reverseArray: (array) => tm.pair(
    tm.fst(array),
    tm.fold(tm.lam(tm.lam(tm.pair(tm.var(0), tm.var(1)))), tm.star(), array)
  ),
  /**
   * Concatenate two array terms, `left` then `right` in order — not a third kernel
   * primitive with its own `fold` shape (metroplat's own kernel comment: no
   * `Cell`/`Valuation`/bilattice/`Articulating` law anywhere concatenates two lists,
   * so there is nothing for a dedicated opcode to be sound against), but exactly the
   * call-site composition its comment prescribes: `reverseArray(left)` once, then a
   * single `fold` that `consArray`s each of its elements onto `right`. Reversed-left
   * yields left's elements last-to-first, so consing them onto `right` in that order
   * rebuilds left's original order in front of right; the result carries `right`'s
   * tag, since `right` is the accumulator being grown.
   */
  append: (left, right) => tm.fold(
    tm.lam(tm.lam(tm.consArray(tm.var(0), tm.var(1)))),
    right,
    tm.reverseArray(left)
  ),
  coincide: (left, right) => Object.freeze(["coincide", left, right]),
  /** The `eq`/`cond` elementary pair (McCarthy): dispatch by comparing an opaque mark. */
  cond: (test, then, otherwise) => Object.freeze(["cond", test, then, otherwise]),
  /** Left fold over an array-encoded list: `fold f init [x₀..xₙ] = f (… (f init x₀) …) xₙ`,
   *  with `f` a curried `λacc.λelem.…`. The one structural recursion. */
  fold: (combine, init, list) => Object.freeze(["fold", combine, init, list]),
  /** A δ-rule: the named host primitive applied to `arg` (JSON in, JSON out) once `arg` is a value. */
  prim: (name, arg) => {
    if (typeof name != "string" || name === "") throw new TypeError("tm.prim: a primitive needs a name");
    return Object.freeze(["prim", name, arg]);
  },
  /** Left injection into a finite sum; the right summand remains explicit. */
  inl: (value, rightType) => Object.freeze(["inl", value, rightType]),
  /** Right injection into a finite sum; the left summand remains explicit. */
  inr: (leftType, value) => Object.freeze(["inr", leftType, value]),
  /** Eliminate a sum. Each branch is under one de Bruijn binder for its injection value. */
  case: (subject, whenLeft, whenRight) => Object.freeze(["case", subject, whenLeft, whenRight]),
  /** Eliminate an impossible empty value into the explicit target type. */
  abort: (subject, targetType) => Object.freeze(["abort", subject, targetType])
};
function senFail(code, message2) {
  let error = new Error(message2);
  throw error.code = code, error;
}
function senTagged(value, kind) {
  return (!Array.isArray(value) || typeof value[0] != "string") && senFail("malformed-sen", `${kind} must be a tagged SEN sequence`), value;
}
function validateAtom(constraint, value) {
  constraint === "natural" && Number.isInteger(value) && value >= 0 || constraint === "text" && typeof value == "string" || senFail("malformed-sen", `invalid SEN ${constraint} atom`);
}
function validateSenType(type) {
  let pending = [{ value: type }], open2 = /* @__PURE__ */ new Set();
  for (; pending.length; ) {
    let task = pending.pop();
    if (task.close) {
      open2.delete(task.close);
      continue;
    }
    let current = task.value;
    senTagged(current, "type"), open2.has(current) && senFail("malformed-sen", "cyclic SEN type"), open2.add(current), pending.push({ close: current });
    let form = SEN_TYPE_FORMS[current[0]];
    (!form || current.length !== 1 + (form.types?.length ?? 0)) && senFail("malformed-sen", `unknown or malformed SEN type tag ${current[0]}`);
    for (let index2 of [...form.types ?? []].reverse()) pending.push({ value: current[index2] });
  }
  return type;
}
function validateSenTerm(term) {
  let pending = [{ value: term }], open2 = /* @__PURE__ */ new Set();
  for (; pending.length > 0; ) {
    let task = pending.pop();
    if (task.close) {
      open2.delete(task.close);
      continue;
    }
    let current = task.value;
    senTagged(current, "term"), open2.has(current) && senFail("malformed-sen", "cyclic SEN term"), open2.add(current), pending.push({ close: current });
    let form = SEN_FORMS[current[0]];
    form || senFail("malformed-sen", `unknown or malformed SEN term tag ${current[0]}`);
    let expected = 1 + Object.keys(form.atoms ?? {}).length + (form.terms?.length ?? 0) + (form.types?.length ?? 0);
    current.length !== expected && senFail("malformed-sen", `malformed SEN ${current[0]}`);
    for (let [index2, constraint] of Object.entries(form.atoms ?? {})) validateAtom(constraint, current[index2]);
    for (let index2 of form.types ?? []) validateSenType(current[index2]);
    for (let index2 of [...form.terms ?? []].reverse()) pending.push({ value: current[index2] });
  }
  return term;
}

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/json-codec.mjs
init_cbor();
function canonicalBytes(value) {
  return JSON.stringify(value);
}
var arrayTag = "sen.json.array", objectTag = "sen.json.object", nullTag = "sen.json.null", booleanTag = "sen.json.boolean", stringTag = "sen.json.string", numberTag = "sen.json.number";
function listTerm(items) {
  return items.reduceRight((tail, item) => tm.pair(item, tail), tm.star());
}
var nullDescriptor = Object.freeze({ kind: "null" }), booleanDescriptor = Object.freeze({ kind: "boolean" }), numberDescriptor = Object.freeze({ kind: "number" }), stringDescriptor = Object.freeze({ kind: "string" });
function jsonToTerm(value) {
  let frames = [], result, emit = (term) => {
    let frame = frames.at(-1);
    if (frame === void 0) {
      result = term;
      return;
    }
    if (frame.kind === "array") {
      frame.items.push(term);
      return;
    }
    frame.entries.push([frame.key, term]), frame.key = void 0;
  };
  return traverseJson(value, {
    scalar(kind, payload) {
      emit(kind === "null" ? tm.pair(tm.mark(canonicalBytes(nullTag)), tm.star()) : kind === "boolean" ? tm.pair(tm.mark(canonicalBytes(booleanTag)), tm.mark(payload ? "true" : "false")) : kind === "string" ? tm.pair(tm.mark(canonicalBytes(stringTag)), tm.mark(canonicalBytes(payload))) : tm.pair(tm.mark(canonicalBytes(numberTag)), tm.mark(canonicalBytes(payload))));
    },
    startArray() {
      frames.push({ kind: "array", items: [] });
    },
    endArray() {
      emit(tm.pair(tm.mark(canonicalBytes(arrayTag)), listTerm(frames.pop().items)));
    },
    startObject() {
      frames.push({ kind: "object", entries: [], key: void 0 });
    },
    key(key) {
      frames.at(-1).key = key;
    },
    endObject() {
      emit(tm.pair(tm.mark(canonicalBytes(objectTag)), listTerm(frames.pop().entries.map(([key, item]) => tm.pair(tm.mark(canonicalBytes(key)), item)))));
    }
  }), result;
}
function traverseJson(value, visitor, ancestors = /* @__PURE__ */ new Set(), path = "$") {
  let pending = [{ kind: "value", value, path }], result;
  for (; pending.length; ) {
    let task = pending.pop();
    if (task.kind === "end") {
      result = task.array ? visitor.endArray() : visitor.endObject(), ancestors.delete(task.value);
      continue;
    }
    if (task.kind === "key") {
      visitor.key(task.key);
      continue;
    }
    if (task.kind === "item") {
      visitor.arrayItem?.(task.index);
      continue;
    }
    let value2 = task.value, path2 = task.path;
    if (value2 === null) {
      result = visitor.scalar("null");
      continue;
    }
    if (typeof value2 == "boolean" || typeof value2 == "string") {
      result = visitor.scalar(typeof value2, value2);
      continue;
    }
    if (typeof value2 == "number") {
      if (!Number.isFinite(value2) || Object.is(value2, -0)) throw new TypeError(`jsonToTerm: ${path2} must be one finite, non-negative-zero JSON number`);
      result = visitor.scalar("number", value2);
      continue;
    }
    if (typeof value2 != "object") throw new TypeError(`jsonToTerm: ${path2} is not a JSON value`);
    if (ancestors.has(value2)) throw new TypeError(`jsonToTerm: ${path2} contains a cycle`);
    let array = Array.isArray(value2), names = Object.getOwnPropertyNames(value2);
    if (array) {
      if (Object.getOwnPropertySymbols(value2).length || names.length !== value2.length + 1 || !names.includes("length")) throw new TypeError(`jsonToTerm: ${path2} must be a dense JSON array with no extra properties`);
    } else {
      let prototype = Object.getPrototypeOf(value2);
      if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`jsonToTerm: ${path2} must be a plain JSON record`);
      if (Object.getOwnPropertySymbols(value2).length) throw new TypeError(`jsonToTerm: ${path2} must not have symbol-keyed properties`);
    }
    let keys = array ? Array.from({ length: value2.length }, (_, i) => String(i)) : names.sort();
    for (let key of keys) {
      let descriptor = Object.getOwnPropertyDescriptor(value2, key);
      if (!descriptor || !descriptor.enumerable || !("value" in descriptor)) throw new TypeError(`jsonToTerm: ${path2}.${key} must be one enumerable data property`);
    }
    ancestors.add(value2), array ? visitor.startArray(value2.length) : visitor.startObject(keys.length), pending.push({ kind: "end", value: value2, array });
    for (let i = keys.length - 1; i >= 0; i--) {
      let key = keys[i];
      pending.push({ kind: "value", value: Object.getOwnPropertyDescriptor(value2, key).value, path: array ? `${path2}[${key}]` : `${path2}.${key}` }), pending.push(array ? { kind: "item", index: i } : { kind: "key", key });
    }
  }
  return result;
}

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/typing.mjs
init_semiotic_content_address();
function tyEqual(left, right) {
  let pending = [[left, right]];
  for (; pending.length; ) {
    let [a, b] = pending.pop();
    if (a !== b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return !1;
        for (let i = a.length - 1; i >= 0; i--) pending.push([a[i], b[i]]);
      } else if (JSON.stringify(a) !== JSON.stringify(b)) return !1;
    }
  }
  return !0;
}
function judgeSen(ctx, source, expected = void 0) {
  let checkedContext = ctx.map(validateSenType), term = validateSenTerm(source), want = expected === void 0 ? void 0 : validateSenType(expected), valueType = inferClosedValueType(term);
  if (valueType !== void 0) {
    if (want === void 0) return valueType;
    if (tyEqual(valueType, want)) return !0;
  }
  return judge(checkedContext, term, want);
}
function inferClosedValueType(term) {
  let pending = [{ term, next: 0 }], results = [];
  for (; pending.length; ) {
    let frame = pending.at(-1), value = frame.term;
    if (value[0] === "mark" || value[0] === "star")
      results.push([value[0] === "mark" ? "base" : "unit"]), pending.pop();
    else if (value[0] === "pair") {
      if (frame.next < 2) {
        pending.push({ term: value[++frame.next], next: 0 });
        continue;
      }
      let right = results.pop(), left = results.pop();
      results.push(["prod", left, right]), pending.pop();
    } else return;
  }
  return results[0];
}
function judge(ctx, term, want = void 0) {
  let infer = () => {
    switch (term[0]) {
      case "var":
        return ctx[term[1]] ?? null;
      case "star":
        return ["unit"];
      case "mark":
        return ["base"];
      case "app": {
        let fn = judge(ctx, term[1]);
        if (fn?.[0] === "arrow" && judge(ctx, term[2], fn[1])) return fn[2];
        let arg = judge(ctx, term[2]);
        if (want && arg && judge(ctx, term[1], ["arrow", arg, want]))
          return want;
        if (arg && term[1][0] === "lam") return judge([arg, ...ctx], term[1][1]);
        let args = [], head = term;
        for (; head[0] === "app"; )
          args.unshift(head[2]), head = head[1];
        let scope = ctx;
        for (let argument of args) {
          if (head[0] !== "lam") return null;
          let argType = judge(ctx, argument);
          if (!argType) return null;
          scope = [argType, ...scope], head = head[1];
        }
        return judge(scope, head);
      }
      case "pair": {
        let cons = consOfArray(ctx, term);
        if (cons !== void 0) return cons;
        let leftTypes = [], cursor = term;
        for (; cursor[0] === "pair"; ) {
          let left = judge(ctx, cursor[1]);
          if (!left) return null;
          leftTypes.push(left), cursor = cursor[2];
        }
        let result = judge(ctx, cursor);
        if (!result) return null;
        for (let index2 = leftTypes.length - 1; index2 >= 0; index2 -= 1)
          result = ["prod", leftTypes[index2], result];
        return result;
      }
      case "fst":
      case "snd": {
        let pair = judge(ctx, term[1]);
        return pair?.[0] === "prod" ? pair[term[0] === "fst" ? 1 : 2] : null;
      }
      case "coincide": {
        let left = judge(ctx, term[1]), right = judge(ctx, term[2]);
        return left && right && tyEqual(left, right) ? ["base"] : null;
      }
      case "cond": {
        let yes = judge(ctx, term[2]), no = judge(ctx, term[3]);
        return judge(ctx, term[1], ["base"]) && yes && no ? joinBranchTypes(yes, no) : null;
      }
      case "inl": {
        let left = judge(ctx, term[1]);
        return left ? ["sum", left, term[2]] : null;
      }
      case "inr": {
        let right = judge(ctx, term[2]);
        return right ? ["sum", term[1], right] : null;
      }
      case "case": {
        let subject = judge(ctx, term[1]);
        if (subject?.[0] !== "sum") return null;
        let left = judge([subject[1], ...ctx], term[2]), right = judge([subject[2], ...ctx], term[3]);
        return left && right ? joinBranchTypes(left, right) : null;
      }
      case "abort":
        return judge(ctx, term[1], ["empty"]) ? term[2] : null;
      case "fold": {
        let element = listElementOf(judge(ctx, term[3])), initType = judge(ctx, term[2]);
        if (element === void 0 || !initType) return null;
        let initElement = listElementOf(initType), accumulator = want && judge(ctx, term[2], want) ? want : initElement ? ["list", initElement] : initType;
        if (element === null) return term[1][0] === "lam" && term[1][1][0] === "lam" ? accumulator : null;
        let combines = (acc) => judge(ctx, term[1], ["arrow", acc, ["arrow", element, acc]]);
        if (combines(accumulator)) return accumulator;
        if (initElement === null && term[1][0] === "lam" && term[1][1][0] === "lam") {
          let built = judge([element, accumulator, ...ctx], term[1][1][1]);
          if (built && listElementOf(built) && combines(built)) return built;
        }
        return null;
      }
      default:
        return null;
    }
  };
  if (term[0] === "lam" && want)
    return want[0] === "arrow" && judge([want[1], ...ctx], term[1], want[2]);
  if (term[0] === "pair" && want?.[0] === "prod") {
    let value = term, expected = want;
    for (; value[0] === "pair" && expected[0] === "prod"; ) {
      if (!judge(ctx, value[1], expected[1])) return !1;
      value = value[2], expected = expected[2];
    }
    return judge(ctx, value, expected);
  }
  if (term[0] === "inl" && want?.[0] === "sum")
    return tyEqual(term[2], want[2]) && judge(ctx, term[1], want[1]);
  if (term[0] === "inr" && want?.[0] === "sum")
    return tyEqual(term[1], want[1]) && judge(ctx, term[2], want[2]);
  if (term[0] === "case" && want) {
    let subject = judge(ctx, term[1]);
    return subject?.[0] === "sum" && judge([subject[1], ...ctx], term[2], want) && judge([subject[2], ...ctx], term[3], want);
  }
  if (want?.[0] === "list" && term[0] === "pair" && term[1][0] === "mark") {
    let spine = term[2];
    for (; spine[0] === "pair"; ) {
      if (!judge(ctx, spine[1], want[1])) return !1;
      spine = spine[2];
    }
    if (spine[0] === "star") return !0;
  }
  let got = infer();
  if (want === void 0) return got;
  if (got === null) return !1;
  if (want[0] === "list") {
    let element = listElementOf(got);
    return element === null || element !== void 0 && tyEqual(element, want[1]);
  }
  return tyEqual(got, want);
}
function joinBranchTypes(left, right) {
  if (tyEqual(left, right)) return left;
  let leftElement = listElementOf(left), rightElement = listElementOf(right);
  return leftElement === void 0 || rightElement === void 0 ? null : leftElement === null ? rightElement === null ? left : ["list", rightElement] : rightElement === null || tyEqual(leftElement, rightElement) ? ["list", leftElement] : null;
}
function consOfArray(ctx, term) {
  let [, tag, rest] = term;
  if (tag[0] !== "fst" || rest[0] !== "pair" || rest[2][0] !== "snd" || JSON.stringify(tag[1]) !== JSON.stringify(rest[2][1])) return;
  let element = listElementOf(judge(ctx, tag[1]));
  if (element === void 0) return;
  let head = judge(ctx, rest[1]);
  return !head || element !== null && !tyEqual(head, element) ? null : ["list", head];
}
function listElementOf(type) {
  if (type?.[0] === "list") return type[1];
  if (type?.[0] !== "prod" || type[1]?.[0] !== "base") return;
  let element = null;
  for (let spine = type[2]; ; spine = spine[2]) {
    if (spine?.[0] === "unit") return element;
    if (spine?.[0] !== "prod" || element !== null && !tyEqual(element, spine[1])) return;
    element = spine[1];
  }
}
function illTyped(message2) {
  let error = new Error(message2);
  throw error.code = "ill-typed-term", error;
}
function validateType(source) {
  return validateSenType(canonicalizeSemioticJson(source));
}
function validateTerm(source) {
  return validateSenTerm(canonicalizeSemioticJson(source));
}
function inferTerm(source, context = []) {
  return judgeSen(context.map(validateType), validateTerm(source)) ?? illTyped("term has no SEN type");
}
function checkTerm(source, expectedSource, context = []) {
  return judgeSen(context.map(validateType), validateTerm(source), validateType(expectedSource)) || illTyped("term does not have expected SEN type");
}

// node_modules/.pnpm/@red-cup-engineering+computer-data-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-data-engineering-services-section/src/semiotic-expression-notation/semantic-content-identity.mjs
init_json_byte_carrier();
var SEN_NORMALIZATION_PROFILE = "urn:rce:sen:normalize:0.1.0", IDENTITY_SETTLEMENT_PROFILE = "urn:rce:settlement:identity:0.0.1", SEMANTIC_ENVELOPE_KIND = "semiotic-expression-notation.normalized-semantic-content", SEMANTIC_ENVELOPE_VERSION = 3, V2_KIND = SEMANTIC_ENVELOPE_KIND, ENVELOPE_VERSION = SEMANTIC_ENVELOPE_VERSION, V2_KEYS = Object.freeze([
  "kind",
  "version",
  "objectKind",
  "semanticType",
  "normalizationProfile",
  "settlementProfile",
  "settledBody",
  "witnessRoot"
]), V2_SORTED_KEYS = Object.freeze([...V2_KEYS].sort()), EMPTY_WITNESS_ROOT = semanticId({ kind: "semantic-content.empty-witness-bundle", version: 1 });
function semanticContentRefusal(code, message2) {
  let error = new TypeError(message2);
  return error.code = code, error;
}
function inhabitsDeclaredType(term, semanticType) {
  try {
    return checkTerm(term, semanticType), !0;
  } catch {
    return !1;
  }
}
function commitmentOf(value) {
  let { id, bytes } = semanticAddress(value);
  return Object.freeze({ id, token: id, algorithm: "sha-256", mediaType: "application/sen+cbor", bytes });
}
function immutableCopy(value) {
  let copyOf = (node) => node === null || typeof node != "object" ? node : Array.isArray(node) ? new Array(node.length) : {}, root = copyOf(value), pending = root === value ? [] : [[value, root]], finished = [];
  for (; pending.length > 0; ) {
    let [source, target] = pending.pop();
    finished.push(target);
    for (let [key, member] of Object.entries(source)) {
      let copy = copyOf(member);
      Object.defineProperty(target, key, { value: copy, enumerable: !0, writable: !0, configurable: !0 }), copy !== member && pending.push([member, copy]);
    }
  }
  for (let node of finished) Object.freeze(node);
  return root;
}
function canonicalNi(value, field) {
  if (!isNiUri(value))
    throw semanticContentRefusal("malformed-content-address", `${field} must be one canonical RFC 6920 SHA-256 ni URI`);
  return value;
}
function canonicalString(value, field) {
  if (typeof value != "string") throw semanticContentRefusal("malformed-normalized-content", `${field} must be a finite string`);
  return value.normalize("NFC");
}
function admitSemanticEnvelope(envelope, { normalForm = void 0, typeChecked = !1 } = {}) {
  if (envelope === null || typeof envelope != "object" || Array.isArray(envelope))
    throw semanticContentRefusal("malformed-normalized-content", "normalized semantic content must be one envelope object");
  let keys = Object.keys(envelope).sort();
  if (keys.length !== V2_KEYS.length || !keys.every((key, index2) => key === V2_SORTED_KEYS[index2]) || envelope.kind !== V2_KIND || envelope.version !== ENVELOPE_VERSION)
    throw semanticContentRefusal("malformed-normalized-content", "normalized semantic content has unknown fields, kind, or version");
  let objectKind = canonicalString(envelope.objectKind, "objectKind");
  if (objectKind.length === 0) throw semanticContentRefusal("malformed-normalized-content", "objectKind must not be empty");
  if (envelope.normalizationProfile !== SEN_NORMALIZATION_PROFILE)
    throw semanticContentRefusal("unsupported-normalization-profile", `unsupported normalization profile ${String(envelope.normalizationProfile)}`);
  if (envelope.settlementProfile !== IDENTITY_SETTLEMENT_PROFILE)
    throw semanticContentRefusal("unsupported-settlement-profile", `unsupported settlement profile ${String(envelope.settlementProfile)}`);
  let witnessRoot = canonicalNi(envelope.witnessRoot, "witnessRoot");
  if (!typeChecked && !inhabitsDeclaredType(envelope.settledBody, envelope.semanticType))
    throw semanticContentRefusal("non-relational-content", "settledBody must be a closed SEN term inhabiting semanticType");
  if (normalForm !== void 0) {
    let normalized;
    try {
      normalized = normalForm(envelope.settledBody);
    } catch {
      throw semanticContentRefusal("normalization-failure", "settledBody could not be checked under the declared normalization profile");
    }
    if (!coincides(normalized, envelope.settledBody))
      throw semanticContentRefusal("non-normal-content", "settledBody is not normal under the declared normalization profile");
  }
  return immutableCopy({
    kind: V2_KIND,
    version: ENVELOPE_VERSION,
    objectKind,
    semanticType: envelope.semanticType,
    normalizationProfile: SEN_NORMALIZATION_PROFILE,
    settlementProfile: envelope.settlementProfile,
    settledBody: envelope.settledBody,
    witnessRoot
  });
}
function commitSemanticEnvelope(envelope, options = {}) {
  let admitted3 = admitSemanticEnvelope(envelope, options);
  return Object.freeze({ ...commitmentOf(admitted3), envelope: admitted3 });
}
function identifyJsonSemanticContent({ objectKind, value, witnessRoot } = {}) {
  let term;
  try {
    term = jsonToTerm(value);
  } catch {
    throw semanticContentRefusal("non-relational-content", "value must cross the admitted JSON-to-SEN boundary");
  }
  let semanticType;
  try {
    semanticType = inferTerm(term);
  } catch {
    throw semanticContentRefusal("non-relational-content", "admitted JSON did not derive an SEN type");
  }
  return commitSemanticEnvelope({
    kind: V2_KIND,
    version: ENVELOPE_VERSION,
    objectKind,
    semanticType,
    normalizationProfile: SEN_NORMALIZATION_PROFILE,
    settlementProfile: IDENTITY_SETTLEMENT_PROFILE,
    settledBody: term,
    witnessRoot
  }, { typeChecked: !0 });
}

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/store-core.mjs
import { closeSync as closeSync2, constants as constants2, fstatSync as fstatSync2, fsyncSync as fsyncSync2, mkdirSync as mkdirSync2, openSync as openSync2, opendirSync, readFileSync as readFileSync7, readSync, renameSync as renameSync2, statSync as statSync2, unlinkSync as unlinkSync2, writeSync } from "node:fs";
import { dirname as dirname2 } from "node:path";

// node_modules/.pnpm/@red-cup-engineering+computer-file-engineering-services-section@0.4.0/node_modules/@red-cup-engineering/computer-file-engineering-services-section/scripts/write-file.mjs
import { randomUUID } from "node:crypto";
import { chmod, link, lstat, mkdir, open, rename, stat, unlink } from "node:fs/promises";
import { chmodSync, closeSync, constants, fchmodSync, fstatSync, fsyncSync, linkSync, lstatSync, mkdirSync, openSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, isAbsolute, relative, resolve, sep } from "node:path";
var UNSYNCABLE_DIRECTORY = /* @__PURE__ */ new Set(["EISDIR", "EINVAL", "EPERM", "EACCES", "EBADF", "ENOTSUP"]);
async function syncDirectory(directory) {
  let handle;
  try {
    handle = await open(directory, "r"), await handle.sync();
  } catch (error) {
    if (!UNSYNCABLE_DIRECTORY.has(error?.code)) throw error;
  } finally {
    await handle?.close();
  }
}
async function writeAtomically(path, data, encoding, { flag, mode, durableRoot } = {}) {
  if (durableRoot !== void 0) return writeStrict(path, data, encoding, { flag, mode, durableRoot });
  let directory = dirname(path), temporary = `${directory}/.${basename(path)}.${process.pid}.${randomUUID()}.tmp`, existingMode = null;
  if (mode === void 0)
    try {
      existingMode = (await stat(path)).mode;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  let finalMode = mode ?? existingMode;
  await mkdir(directory, { recursive: !0 });
  let created = !1;
  try {
    let handle = await open(temporary, "wx", finalMode ?? void 0);
    created = !0;
    try {
      await handle.writeFile(data, encoding ? { encoding } : {}), await handle.sync();
    } finally {
      await handle.close();
    }
    finalMode !== null && await chmod(temporary, finalMode), flag === "wx" ? (await link(temporary, path), await unlink(temporary)) : await rename(temporary, path), await syncDirectory(directory);
  } catch (error) {
    throw created && await unlink(temporary).catch(() => {
    }), error;
  }
  return Object.freeze({ path, bytes: Buffer.byteLength(data) });
}
async function writeFileText(path, text2, options) {
  if (typeof path != "string" || path.length === 0) throw new TypeError("path must be a nonempty string");
  if (typeof text2 != "string") throw new TypeError("text must be a string");
  return writeAtomically(path, text2, "utf8", options);
}
async function runWriteFile(argv, io) {
  if (argv.length !== 1) throw new TypeError("usage: write-file PATH");
  io.stdin.setEncoding("utf8");
  let text2 = "";
  for await (let chunk of io.stdin) text2 += chunk;
  let receipt = await writeFileText(argv[0], text2);
  return io.stdout.write(`${JSON.stringify(receipt)}
`), receipt;
}
var command = Object.freeze({
  run: ({ argv, stdin, stdout, stderr }) => runWriteFile(argv, { stdin, stdout, stderr }),
  formatError: (error) => `write-file: ${error.message}
`,
  exitCode: 64
});
function durablePaths(path, durableRoot) {
  if (typeof path != "string" || path.length === 0 || typeof durableRoot != "string" || !isAbsolute(durableRoot))
    throw new TypeError("strict durability requires a file path and an absolute durableRoot");
  let file = resolve(path), root = resolve(durableRoot), parent = dirname(file), within = relative(root, parent);
  if (isAbsolute(within) || within === ".." || within.startsWith(".." + sep))
    throw new TypeError("strict durable path must be below durableRoot");
  for (let flag of ["O_NOFOLLOW", "O_NONBLOCK", "O_DIRECTORY"])
    if (!Number.isInteger(constants[flag])) throw new Error("strict durable file opens are unsupported");
  let directories = [];
  for (let directory = parent; directories.push(directory), directory !== root; directory = dirname(directory))
    ;
  return { path: file, durableRoot: root, directories };
}
var strictReadFlags = () => constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK, assertDirectoryStat = (stat2, device) => {
  if (!stat2.isDirectory() || stat2.isSymbolicLink?.() || device !== void 0 && stat2.dev !== device)
    throw new TypeError("strict durability requires non-redirected directories on the anchor filesystem");
}, assertFileStat = (stat2, device) => {
  if (!stat2.isFile() || stat2.isSymbolicLink?.() || stat2.dev !== device)
    throw new TypeError("strict durability requires a regular file on the anchor filesystem");
};
function directoryStatSync(directory, device) {
  assertDirectoryStat(lstatSync(directory), device);
  let fd = openSync(directory, strictReadFlags() | constants.O_DIRECTORY);
  try {
    let held = fstatSync(fd);
    return assertDirectoryStat(held, device), held;
  } finally {
    closeSync(fd);
  }
}
async function directoryStat(directory, device) {
  assertDirectoryStat(await lstat(directory), device);
  let handle = await open(directory, strictReadFlags() | constants.O_DIRECTORY);
  try {
    let held = await handle.stat();
    return assertDirectoryStat(held, device), held;
  } finally {
    await handle.close();
  }
}
function assertDurableFilePathSync(path, { durableRoot } = {}) {
  let admitted3 = durablePaths(path, durableRoot), device = directoryStatSync(admitted3.durableRoot).dev;
  for (let directory of [...admitted3.directories].reverse().slice(1))
    try {
      directoryStatSync(directory, device);
    } catch (error) {
      if (error.code === "ENOENT") break;
      throw error;
    }
  try {
    assertFileStat(lstatSync(admitted3.path), device);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return Object.freeze({ ...admitted3, directories: Object.freeze(admitted3.directories), device });
}
async function assertDurableFilePath(path, { durableRoot } = {}) {
  let admitted3 = durablePaths(path, durableRoot), device = (await directoryStat(admitted3.durableRoot)).dev;
  for (let directory of [...admitted3.directories].reverse().slice(1))
    try {
      await directoryStat(directory, device);
    } catch (error) {
      if (error.code === "ENOENT") break;
      throw error;
    }
  try {
    assertFileStat(await lstat(admitted3.path), device);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return Object.freeze({ ...admitted3, directories: Object.freeze(admitted3.directories), device });
}
function openDurableFileSync(path, flags, { durableRoot, mode = 438, createParents = !1 } = {}) {
  if (!Number.isInteger(flags) || flags < 0 || (flags & constants.O_TRUNC) !== 0)
    throw new TypeError("strict file flags must be nonnegative and must not truncate before descriptor validation");
  let admitted3 = assertDurableFilePathSync(path, { durableRoot });
  createParents && (mkdirSync(dirname(admitted3.path), { recursive: !0 }), admitted3 = assertDurableFilePathSync(path, { durableRoot }));
  let fd = openSync(admitted3.path, flags | constants.O_NOFOLLOW | constants.O_NONBLOCK, mode);
  try {
    return assertFileStat(fstatSync(fd), admitted3.device), fd;
  } catch (error) {
    throw closeSync(fd), error;
  }
}
async function openDurableFile(path, flags, { durableRoot, mode = 438, createParents = !1 } = {}) {
  let admitted3 = await assertDurableFilePath(path, { durableRoot });
  createParents && (await mkdir(dirname(admitted3.path), { recursive: !0 }), admitted3 = await assertDurableFilePath(path, { durableRoot }));
  let handle = await open(admitted3.path, flags | constants.O_NOFOLLOW | constants.O_NONBLOCK, mode);
  try {
    return assertFileStat(await handle.stat(), admitted3.device), handle;
  } catch (error) {
    throw await handle.close(), error;
  }
}
function syncDurableDirectoriesSync(path, durableRoot) {
  let admitted3 = assertDurableFilePathSync(path, { durableRoot });
  for (let directory of admitted3.directories) {
    let fd = openSync(directory, strictReadFlags() | constants.O_DIRECTORY);
    try {
      assertDirectoryStat(fstatSync(fd), admitted3.device), fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
  }
}
async function syncDurableDirectories(path, durableRoot) {
  let admitted3 = await assertDurableFilePath(path, { durableRoot });
  for (let directory of admitted3.directories) {
    let handle = await open(directory, strictReadFlags() | constants.O_DIRECTORY);
    try {
      assertDirectoryStat(await handle.stat(), admitted3.device), await handle.sync();
    } finally {
      await handle.close();
    }
  }
}
function syncFileDurablySync(path, { durableRoot } = {}) {
  let fd = openDurableFileSync(path, constants.O_RDONLY, { durableRoot });
  try {
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  syncDurableDirectoriesSync(path, durableRoot);
}
async function writeStrict(path, data, encoding, { flag, mode, durableRoot }) {
  let admitted3 = await assertDurableFilePath(path, { durableRoot }), existingMode = null;
  if (mode === void 0)
    try {
      existingMode = (await stat(admitted3.path)).mode;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  let finalMode = mode ?? existingMode, temporary = dirname(admitted3.path) + "/." + basename(admitted3.path) + "." + process.pid + "." + randomUUID() + ".tmp", created = !1, publicationAttempted = !1;
  try {
    let handle = await openDurableFile(
      temporary,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL,
      { durableRoot, mode: finalMode ?? 438, createParents: !0 }
    );
    created = !0;
    try {
      await handle.writeFile(data, encoding ? { encoding } : {}), finalMode !== null && await handle.chmod(finalMode), await handle.sync();
    } finally {
      await handle.close();
    }
    publicationAttempted = !0, flag === "wx" ? await link(temporary, admitted3.path) : await rename(temporary, admitted3.path), await syncDurableDirectories(admitted3.path, durableRoot), flag === "wx" && (await unlink(temporary), await syncDurableDirectories(admitted3.path, durableRoot));
  } catch (error) {
    throw created && !publicationAttempted && await unlink(temporary).catch(() => {
    }), error;
  }
  return Object.freeze({ path, bytes: Buffer.byteLength(data) });
}

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/canonical-json.mjs
var UNBOUNDED_JSON_ENVELOPE = Object.freeze({
  maxSourceBytes: 1 / 0,
  maxCanonicalBytes: 1 / 0,
  maxDepth: 1 / 0,
  maxNodes: 1 / 0,
  maxObjectMembers: 1 / 0,
  maxArrayLength: 1 / 0,
  maxStringBytes: 1 / 0,
  maxKeyBytes: 1 / 0
}), JSON_RESOURCE_ENVELOPE = Object.freeze({
  maxSourceBytes: 1048576,
  maxCanonicalBytes: 1048576,
  maxDepth: 64,
  maxNodes: 1e5,
  maxObjectMembers: 4096,
  maxArrayLength: 65536,
  maxStringBytes: 262144,
  maxKeyBytes: 1024
}), utf8Encoder = new TextEncoder();
function byteLength(value) {
  return utf8Encoder.encode(value).byteLength;
}
function pathText(path) {
  let parts = [], base = "$";
  for (let node = path; node !== null && typeof node == "object"; node = node.parent)
    parts.push(node);
  typeof path == "string" && (base = path);
  let text2 = base;
  for (let index2 = parts.length - 1; index2 >= 0; index2 -= 1) {
    let part = parts[index2];
    text2 += part.kind === "index" ? `[${part.value}]` : `.${part.value}`;
  }
  return text2;
}
function continuesSpine(container, index2, child) {
  return index2 === 2 && Array.isArray(container) && container[0] === "pair" && Array.isArray(child) && child[0] === "pair";
}
function spineLimit(spine, envelope, path) {
  spine > envelope.maxArrayLength && fail3("array-length-limit", path, `list spine exceeds ${envelope.maxArrayLength} links`);
}
function propertyPath(path, key) {
  return { parent: path, kind: "property", value: key };
}
function indexPath(path, index2) {
  return { parent: path, kind: "index", value: index2 };
}
function fail3(code, path, message2) {
  let renderedPath = pathText(path), error = new TypeError(`${code} at ${renderedPath}: ${message2}`);
  throw error.code = code, error.path = renderedPath, error;
}
function assertUnicodeScalars(value, path) {
  for (let index2 = 0; index2 < value.length; index2 += 1) {
    let unit = value.charCodeAt(index2);
    if (unit >= 55296 && unit <= 56319) {
      let next = value.charCodeAt(index2 + 1);
      next >= 56320 && next <= 57343 || fail3("unicode-scalar", path, "must not contain a lone Unicode surrogate (high)"), index2 += 1;
    } else unit >= 56320 && unit <= 57343 && fail3("unicode-scalar", path, "must not contain a lone Unicode surrogate (low)");
  }
}
function stringText(value, path, limit2, code) {
  return assertUnicodeScalars(value, path), byteLength(value) > limit2 && fail3(code, path, `UTF-8 string exceeds ${limit2} bytes`), JSON.stringify(value);
}
function chargeCanonical(state, amount, path) {
  state.canonicalBytes += amount, state.canonicalBytes > state.envelope.maxCanonicalBytes && fail3("canonical-limit", path, `canonical JSON exceeds ${state.envelope.maxCanonicalBytes} bytes`);
}
function projectValue(value, path, depth, state) {
  let tokens = [], frames = [{ source: value, path, depth, spine: 0, entered: !1 }], result;
  for (; frames.length > 0; ) {
    let frame = frames[frames.length - 1];
    if (!frame.entered) {
      frame.entered = !0, state.nodes += 1, state.nodes > state.envelope.maxNodes && fail3("node-limit", frame.path, `JSON value exceeds ${state.envelope.maxNodes} nodes`);
      let item = frame.source;
      if (item === null) {
        chargeCanonical(state, 4, frame.path), tokens.push("null"), result = null, frames.pop();
        continue;
      }
      if (typeof item == "boolean") {
        let text2 = item ? "true" : "false";
        chargeCanonical(state, text2.length, frame.path), tokens.push(text2), result = item, frames.pop();
        continue;
      }
      if (typeof item == "string") {
        let text2 = stringText(item, frame.path, state.envelope.maxStringBytes, "string-limit");
        chargeCanonical(state, byteLength(text2), frame.path), tokens.push(text2), result = item, frames.pop();
        continue;
      }
      if (typeof item == "number") {
        Number.isFinite(item) || fail3("invalid-json-value", frame.path, "JCS admits only finite IEEE-754 numbers");
        let text2 = JSON.stringify(item);
        chargeCanonical(state, byteLength(text2), frame.path), tokens.push(text2), result = Object.is(item, -0) ? 0 : item, frames.pop();
        continue;
      }
      if (typeof item != "object" && fail3("invalid-json-value", frame.path, `unsupported JSON value type: ${typeof item}`), frame.depth >= state.envelope.maxDepth && fail3("depth-limit", frame.path, `JSON nesting exceeds depth ${state.envelope.maxDepth}`), state.active.has(item) && fail3("invalid-json-value", frame.path, "must not contain a cycle"), state.active.add(item), frame.container = item, frame.index = 0, Array.isArray(item))
        item.length > state.envelope.maxArrayLength && fail3("array-length-limit", frame.path, `array exceeds ${state.envelope.maxArrayLength} elements`), Reflect.ownKeys(item).some((key) => key !== "length" && (typeof key != "string" || !/^(?:0|[1-9][0-9]*)$/u.test(key) || Number(key) >= item.length)) && fail3("invalid-json-value", frame.path, "arrays may not carry symbol or non-index properties"), chargeCanonical(state, 2 + Math.max(0, item.length - 1), frame.path), tokens.push("["), frame.array = !0, frame.carried = [], frame.length = item.length;
      else {
        Object.getPrototypeOf(item) !== Object.prototype && fail3("invalid-json-value", frame.path, "only ordinary JSON objects with Object.prototype are admitted");
        let keys = Reflect.ownKeys(item);
        keys.some((key) => typeof key != "string") && fail3("invalid-json-value", frame.path, "symbol properties are outside the JSON data model"), keys.length > state.envelope.maxObjectMembers && fail3("object-member-limit", frame.path, `object exceeds ${state.envelope.maxObjectMembers} members`), frame.keys = keys.sort(), chargeCanonical(state, 2 + Math.max(0, frame.keys.length - 1) + frame.keys.length, frame.path), tokens.push("{"), frame.carried = {}, frame.array = !1;
      }
      continue;
    }
    let count = frame.array ? frame.length : frame.keys.length;
    if (frame.awaitingChild && (frame.array ? frame.carried.push(result) : Object.defineProperty(frame.carried, frame.key, {
      value: result,
      enumerable: !0,
      configurable: !1,
      writable: !1
    }), frame.awaitingChild = !1, frame.index += 1), frame.index === count) {
      tokens.push(frame.array ? "]" : "}");
      let carried = Object.freeze(frame.carried);
      state.active.delete(frame.container), result = carried, frames.pop();
      continue;
    }
    frame.index > 0 && tokens.push(",");
    let child, childPath;
    if (frame.array) {
      let index2 = frame.index, descriptor = Object.getOwnPropertyDescriptor(frame.container, String(index2));
      childPath = indexPath(frame.path, index2), descriptor === void 0 && fail3("invalid-json-value", childPath, "sparse arrays are outside the admitted JSON value model"), (!("value" in descriptor) || !descriptor.enumerable) && fail3("invalid-json-value", childPath, "array accessors and non-enumerable elements are outside the JSON data model"), child = descriptor.value;
    } else {
      let key = frame.keys[frame.index], descriptor = Object.getOwnPropertyDescriptor(frame.container, key);
      childPath = propertyPath(frame.path, key), (descriptor === void 0 || !("value" in descriptor) || !descriptor.enumerable) && fail3("invalid-json-value", childPath, "accessor and non-enumerable properties are outside the JSON data model");
      let keyText = stringText(key, childPath, state.envelope.maxKeyBytes, "key-limit");
      chargeCanonical(state, byteLength(keyText), childPath), tokens.push(keyText, ":"), frame.key = key, child = descriptor.value;
    }
    frame.awaitingChild = !0;
    let onSpine = frame.array && continuesSpine(frame.container, frame.index, child), spine = onSpine ? frame.spine + 1 : 0;
    spineLimit(spine, state.envelope, childPath), frames.push({ source: child, path: childPath, depth: onSpine ? frame.depth : frame.depth + 1, spine, entered: !1 });
  }
  return { value: result, text: tokens.join("") };
}
function canonicalizeJson(value, envelope = UNBOUNDED_JSON_ENVELOPE) {
  let state = { nodes: 0, canonicalBytes: 0, active: /* @__PURE__ */ new WeakSet(), envelope }, projected = projectValue(value, "$", 0, state);
  return Object.freeze({ value: projected.value, text: projected.text, byteLength: state.canonicalBytes });
}
function canonicalJson(value, envelope = UNBOUNDED_JSON_ENVELOPE) {
  return canonicalizeJson(value, envelope).text;
}

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/assert-canonical-json.json
var assert_canonical_json_default = {
  input: {},
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/assert-canonical-json.mjs
var { readFileSync: readInput } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema = assert_canonical_json_default.input, outputSchema = assert_canonical_json_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/is-canonical-json.json
var is_canonical_json_default = {
  input: {},
  output: {
    type: "boolean"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/is-canonical-json.mjs
var { readFileSync: readInput2 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema2 = is_canonical_json_default.input, outputSchema2 = is_canonical_json_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/parse-json-value.json
var parse_json_value_default = {
  input: {
    type: "string"
  },
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/require-json-value.json
var require_json_value_default = {
  input: {},
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/is-json-value.json
var is_json_value_default = {
  input: {},
  output: {
    type: "boolean"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/is-json-value.mjs
var inputSchema3 = is_json_value_default.input, outputSchema3 = is_json_value_default.output;
function isJsonValue(value) {
  let ancestors = /* @__PURE__ */ new Set(), frames = [{ item: value, entered: !1 }], result = !0;
  for (; frames.length > 0; ) {
    let frame = frames[frames.length - 1];
    if (!frame.entered) {
      let item = frame.item;
      if (item === null || typeof item == "boolean" || typeof item == "string") {
        result = !0, frames.pop();
        continue;
      }
      if (typeof item == "number") {
        result = Number.isFinite(item), frames.pop();
        continue;
      }
      if (Array.isArray(item)) {
        if (ancestors.has(item)) {
          result = !1, frames.pop();
          continue;
        }
        ancestors.add(item), frame.entered = !0, frame.array = !0, frame.index = 0;
        continue;
      }
      if (typeof item != "object" || Object.getPrototypeOf(item) !== Object.prototype || ancestors.has(item)) {
        result = !1, frames.pop();
        continue;
      }
      ancestors.add(item), frame.entered = !0, frame.array = !1, frame.children = Object.values(item), frame.index = 0;
      continue;
    }
    if (frame.awaitingChild) {
      if (!result) {
        ancestors.delete(frame.item), frames.pop();
        continue;
      }
      frame.awaitingChild = !1, frame.index += 1;
    }
    let count = frame.array ? frame.item.length : frame.children.length;
    if (frame.index >= count) {
      ancestors.delete(frame.item), result = !0, frames.pop();
      continue;
    }
    let child;
    if (frame.array) {
      let index2 = frame.index;
      if (!Object.hasOwn(frame.item, index2)) {
        ancestors.delete(frame.item), result = !1, frames.pop();
        continue;
      }
      child = frame.item[index2];
    } else
      child = frame.children[frame.index];
    frame.awaitingChild = !0, frames.push({ item: child, entered: !1 });
  }
  return result;
}

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/require-json-value.mjs
var { readFileSync: readInput3 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema4 = require_json_value_default.input, outputSchema4 = require_json_value_default.output;
function jsonDefectOf(value) {
  let ancestors = /* @__PURE__ */ new Set(), stack = [{ item: value, path: "$" }];
  for (; stack.length > 0; ) {
    let { item, path, leave } = stack.pop();
    if (leave) {
      ancestors.delete(item);
      continue;
    }
    if (item === null || typeof item == "boolean" || typeof item == "string") continue;
    if (typeof item == "number") {
      if (Number.isFinite(item)) continue;
      return { path, found: String(item) };
    }
    let array = Array.isArray(item);
    if (typeof item != "object" || !array && Object.getPrototypeOf(item) !== Object.prototype)
      return { path, found: item === void 0 ? "undefined" : typeof item == "object" ? item.constructor?.name ?? "object" : typeof item };
    if (ancestors.has(item)) return { path, found: "a cycle" };
    if (ancestors.add(item), stack.push({ item, leave: !0 }), array)
      for (let index2 = item.length - 1; index2 >= 0; index2 -= 1) {
        if (!Object.hasOwn(item, index2)) return { path: `${path}[${index2}]`, found: "a hole" };
        stack.push({ item: item[index2], path: `${path}[${index2}]` });
      }
    else for (let [key, child] of Object.entries(item).reverse()) stack.push({ item: child, path: `${path}.${key}` });
  }
  return { path: "$", found: "a non-JSON value" };
}
function requireJsonValue(value, context = "value") {
  if (isJsonValue(value)) return value;
  let { path, found } = jsonDefectOf(value);
  throw new TypeError(`${context}: not a JSON value (${found} at ${path})`);
}

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/parse-json-value.mjs
var { readFileSync: readInput4 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema5 = parse_json_value_default.input, outputSchema5 = parse_json_value_default.output;
function parseJsonValue(text2) {
  return requireJsonValue(JSON.parse(text2));
}

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/assert-nonempty-string.mjs
var { readFileSync: readInput5 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema6 = Object.freeze({
  type: "object",
  required: ["value", "label"],
  properties: { value: {}, label: { type: "string" }, expectation: { type: "string" } }
}), outputSchema6 = Object.freeze({ type: "string", minLength: 1 });

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/is-json-record.json
var is_json_record_default = {
  input: {},
  output: {
    type: "boolean"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/is-json-record.mjs
var { readFileSync: readInput6 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema7 = is_json_record_default.input, outputSchema7 = is_json_record_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/project-json-record-keys.json
var project_json_record_keys_default = {
  input: {
    type: "object",
    required: ["record", "keys"],
    properties: {
      record: {
        type: "object"
      },
      keys: {
        type: "array",
        minItems: 1,
        items: {
          type: "string",
          minLength: 1
        }
      }
    }
  },
  output: {
    type: "object"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/freeze-json.json
var freeze_json_default = {
  input: {},
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/freeze-json.mjs
var { readFileSync: readInput7 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema8 = freeze_json_default.input, outputSchema8 = freeze_json_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/project-json-record-keys.mjs
var { readFileSync: readInput8 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema9 = project_json_record_keys_default.input, outputSchema9 = project_json_record_keys_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/is-json-text.json
var is_json_text_default = { input: { type: "string" }, output: { type: "boolean" } };

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/is-json-text.mjs
var { readFileSync } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema10 = is_json_text_default.input, outputSchema10 = is_json_text_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/json-values-of-text.json
var json_values_of_text_default = {
  input: {
    type: "string"
  },
  output: {
    type: "array"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/json-values-of-text.mjs
var { readFileSync: readFileSync2 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema11 = json_values_of_text_default.input, outputSchema11 = json_values_of_text_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/write-json-text.json
var write_json_text_default = { input: { type: "array" }, output: { type: "string" } };

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/write-json-text.mjs
var { readFileSync: readFileSync3 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema12 = write_json_text_default.input, outputSchema12 = write_json_text_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/json-byte-carrier.json
var json_byte_carrier_default = {
  encodeJsonByteCarrier: {
    input: {
      type: "object",
      properties: {
        bytes: {
          type: "array",
          items: { type: "integer", minimum: 0, maximum: 255 }
        },
        mediaType: { type: "string", minLength: 1 }
      },
      required: ["bytes", "mediaType"],
      additionalProperties: !1
    },
    output: {
      type: "object",
      properties: {
        mediaType: { type: "string", minLength: 1 },
        contentBase64: { type: "string" }
      },
      required: ["mediaType", "contentBase64"],
      additionalProperties: !1
    }
  },
  decodeJsonByteCarrier: {
    input: {
      type: "object",
      properties: {
        carrier: { type: "object" },
        expectedMediaType: { type: "string" },
        maximumBytes: { type: "integer", minimum: 0 }
      },
      required: ["carrier"],
      additionalProperties: !1
    },
    output: {
      type: "object",
      properties: {
        mediaType: { type: "string", minLength: 1 },
        bytes: {
          type: "array",
          items: { type: "integer", minimum: 0, maximum: 255 }
        }
      },
      required: ["mediaType", "bytes"],
      additionalProperties: !1
    }
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/encode-json-byte-carrier.mjs
init_json_byte_carrier();
var inputSchema13 = json_byte_carrier_default.encodeJsonByteCarrier.input, outputSchema13 = json_byte_carrier_default.encodeJsonByteCarrier.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/decode-json-byte-carrier.mjs
init_json_byte_carrier();
var inputSchema14 = json_byte_carrier_default.decodeJsonByteCarrier.input, outputSchema14 = json_byte_carrier_default.decodeJsonByteCarrier.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/parse-json.json
var parse_json_default = {
  input: {
    type: "object",
    required: ["text"],
    properties: {
      text: {
        type: "string"
      }
    }
  },
  output: {
    type: "object",
    required: ["ok"],
    properties: {
      ok: {
        type: "boolean"
      },
      value: {},
      error: {
        type: "object"
      }
    }
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/parse-json.mjs
var { readFileSync: readInput9 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema15 = parse_json_default.input, outputSchema15 = parse_json_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/form-cloudevent.json
var form_cloudevent_default = {
  input: {
    type: "object",
    required: ["id", "source", "type"]
  },
  output: {
    type: "object"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/form-cloudevent.mjs
var { readFileSync: readInput10 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema16 = form_cloudevent_default.input, outputSchema16 = form_cloudevent_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/validate-cloudevent.json
var validate_cloudevent_default = {
  input: {
    type: "object",
    required: ["event"],
    properties: {
      event: {}
    }
  },
  output: {
    type: "object",
    required: ["ok"]
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/validate-cloudevent.mjs
var { readFileSync: readInput11 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema17 = validate_cloudevent_default.input, outputSchema17 = validate_cloudevent_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/admit-json-type.json
var admit_json_type_default = {
  input: {
    type: "object",
    required: ["value", "type"],
    properties: {
      value: {},
      type: {
        enum: ["object", "array", "string", "number", "boolean", "null"]
      },
      name: {
        type: "string"
      },
      source: {
        type: "string"
      }
    }
  },
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/admit-json-type.mjs
var { readFileSync: readFileSync4 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema18 = admit_json_type_default.input, outputSchema18 = admit_json_type_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/read-json-field.json
var read_json_field_default = {
  input: {
    type: "object",
    required: ["record", "key"],
    properties: {
      record: {
        type: "object"
      },
      key: {
        type: "string"
      },
      name: {
        type: "string"
      },
      source: {
        type: "string"
      }
    }
  },
  output: {}
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/read-json-field.mjs
var { readFileSync: readFileSync5 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema19 = read_json_field_default.input, outputSchema19 = read_json_field_default.output;

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/schemas/is-object-record.json
var is_object_record_default = {
  input: {},
  output: {
    type: "boolean"
  }
};

// node_modules/.pnpm/@red-cup-engineering+json-services-section@0.4.0/node_modules/@red-cup-engineering/json-services-section/scripts/is-object-record.mjs
var { readFileSync: readFileSync6 } = globalThis.process?.getBuiltinModule?.("node:fs") ?? {}, inputSchema20 = is_object_record_default.input, outputSchema20 = is_object_record_default.output;

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/store-core.mjs
init_semiotic_content_address();

// node_modules/.pnpm/@red-cup-engineering+computer-content-address-engineering-services-section@0.2.0/node_modules/@red-cup-engineering/computer-content-address-engineering-services-section/src/ni-path.mjs
init_ni_uri();
var PREFIX = "ni:///sha-256;", ALPHABET = /^[A-Za-z0-9_-]+$/u, NI_PATH_FORMULAS = Object.freeze({
  "ni-path-v1": Object.freeze({ widths: Object.freeze([2]), suffix: ".jsonl" })
});
function widthsOf(widths) {
  if (!Array.isArray(widths) || widths.length === 0) throw new TypeError("ni path widths must be a nonempty array");
  let total = 0;
  for (let width of widths) {
    if (!Number.isSafeInteger(width) || width < 1) throw new TypeError("ni path widths must be positive integers");
    total += width;
  }
  if (total > 43) throw new TypeError("ni path widths exceed the digest");
  return widths;
}
function niPathSegments(ni, widths = NI_PATH_FORMULAS["ni-path-v1"].widths) {
  if (!isNiUri(ni)) throw new TypeError(`not a canonical sha-256 NI address: ${String(ni)}`);
  let digest2 = ni.slice(PREFIX.length);
  if (!ALPHABET.test(digest2)) throw new TypeError("NI digest is not base64url");
  let segments = ["sha-256"], at = 0;
  for (let width of widthsOf(widths))
    segments.push(digest2.slice(at, at + width)), at += width;
  return Object.freeze(segments);
}
function niBucketPath(ni, version = "ni-path-v1") {
  let formula = NI_PATH_FORMULAS[version];
  if (formula === void 0) throw new TypeError(`unknown ni path formula: ${String(version)}`);
  return `${niPathSegments(ni, formula.widths).join("/")}${formula.suffix}`;
}

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/store-core.mjs
init_ni_uri();

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/layout.mjs
import { existsSync } from "node:fs";
import { join } from "node:path";

// node_modules/.pnpm/@red-cup-engineering+eavt-services-section@0.11.0/node_modules/@red-cup-engineering/eavt-services-section/src/statement.mjs
init_four();
var artifactTierTable = Object.freeze({
  log: Object.freeze({
    kind: "witness.tier",
    name: "log",
    role: "source",
    rank: 3,
    pathSegment: "data/logs",
    kindSuffix: "logs",
    queryClass: "all admitted statement rows, including coordinates and duplicate attempts",
    preserves: Object.freeze(["E", "A", "V", "T", "contract exposure", "append order", "content identity"]),
    mayForget: Object.freeze([])
  }),
  state: Object.freeze({
    kind: "witness.tier",
    name: "state",
    role: "sufficient-statistic",
    rank: 2,
    pathSegment: "data/state",
    kindSuffix: "state",
    queryClass: "current value of declared functional/accumulating cells",
    preserves: Object.freeze(["current functional facts", "accumulated non-functional evidence", "cell identity"]),
    mayForget: Object.freeze(["superseded statement history", "append attempt duplicates"])
  }),
  record: Object.freeze({
    kind: "witness.tier",
    name: "record",
    role: "rate-distortion-code",
    rank: 1,
    pathSegment: "data/records",
    kindSuffix: "records",
    queryClass: "settled datom invariants and kept live-log rows",
    preserves: Object.freeze(["settled datoms", "reading slot", "kept source rows"]),
    mayForget: Object.freeze(["rows made redundant by a settled reading", "projection-local ordering detail"])
  }),
  content: Object.freeze({
    kind: "witness.tier",
    name: "content",
    role: "lossy-cut",
    rank: 0,
    pathSegment: "content",
    kindSuffix: "content",
    queryClass: "browsable term-addressed document cuts",
    preserves: Object.freeze(["entity address", "selected presentation fields", "document content"]),
    mayForget: Object.freeze(["unselected cells", "statement coordinate", "record compaction proof", "raw row identity"])
  })
}), artifactTiers = Object.freeze([
  artifactTierTable.log,
  artifactTierTable.state,
  artifactTierTable.record,
  artifactTierTable.content
]);
function artifactTier(name) {
  return artifactTierTable[name];
}

// node_modules/.pnpm/@red-cup-engineering+eavt-services-section@0.11.0/node_modules/@red-cup-engineering/eavt-services-section/src/data-artifact-address.mjs
function dataTierPathSegment(tier) {
  return artifactTier(tier).pathSegment;
}
var KIND_NAME = /^[a-z]+(?:-[a-z]+)*$/u;
function dataKindDirectoryName(tier, subject) {
  if (typeof subject != "string" || !KIND_NAME.test(subject)) throw new TypeError(`dataKindDirectoryName: ${JSON.stringify(subject)} is not a type name (letters and hyphens only)`);
  return `${subject}-${artifactTier(tier).kindSuffix}`;
}

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/layout.mjs
init_ni_uri();
var RECORD_BYTES_MAX = 65536;
var NI_PATH_VERSION = "ni-path-v1", LEGACY_STORE_PATHS = Object.freeze(["data/state/log-state", "data/journals"]), StoreError = class extends Error {
  constructor(code, message2) {
    super(message2), this.name = new.target.name, this.code = code;
  }
}, StoreCorruption = class extends StoreError {
  constructor(message2) {
    super("store-corruption", message2);
  }
};
var LegacyStoreRefused = class extends StoreError {
  constructor(message2) {
    super("legacy-store", message2);
  }
}, TYPE_NAME = /^[a-z]+(?:-[a-z]+)*$/u;
function checkTypeName(type) {
  if (!(typeof type == "string" && type.length <= 64 && TYPE_NAME.test(type) && type.split("-").every((word) => word.length <= 24))) throw new StoreError("type-name", `not a plain lowercase hyphenated type name of at most 64 characters: ${JSON.stringify(type)}`);
  return type;
}
function checkRoot(root) {
  if (typeof root != "string" || root.length === 0) throw new StoreError("root", "the settlement root must be a path");
  for (let legacy of LEGACY_STORE_PATHS)
    if (existsSync(join(root, legacy))) throw new LegacyStoreRefused(`${root} holds ${legacy}, the earlier store layout; convert it first (store-conversion.md)`);
  return root;
}
var recordsDirectory = (root, type) => join(root, dataTierPathSegment("record"), dataKindDirectoryName("record", checkTypeName(type)));
function recordFile(root, type, address) {
  if (!isNiUri(address)) throw new StoreError("address", `not a canonical sha-256 NI address: ${String(address)}`);
  return join(recordsDirectory(root, type), niBucketPath(address, NI_PATH_VERSION));
}

// node_modules/.pnpm/@red-cup-engineering+semiotic-eavt-services-section@0.1.0/node_modules/@red-cup-engineering/semiotic-eavt-services-section/src/store-core.mjs
var CHUNK_BYTES = 64 * 1024, LINE_BYTES_MAX = RECORD_BYTES_MAX + 1024, NEWLINE = 10;
var pause = new Int32Array(new SharedArrayBuffer(4)), isObject = (value) => value !== null && typeof value == "object" && !Array.isArray(value);
function openStrictRegular(file) {
  if (!Number.isInteger(constants2.O_NOFOLLOW) || !Number.isInteger(constants2.O_NONBLOCK))
    throw new StoreError("strict-file-open", "strict discovery requires no-follow nonblocking file opens");
  let fd;
  try {
    fd = openSync2(file, constants2.O_RDONLY | constants2.O_NOFOLLOW | constants2.O_NONBLOCK);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  try {
    if (!fstatSync2(fd).isFile()) throw new StoreCorruption(`${file} is not a regular record or head file`);
    return fd;
  } catch (error) {
    throw closeSync2(fd), error;
  }
}
function* scanLines(file, { from = 0, prefix = null, strict = !1, durableRoot } = {}) {
  let fd;
  try {
    fd = durableRoot !== void 0 ? openDurableFileSync(file, constants2.O_RDONLY, { durableRoot }) : strict ? openStrictRegular(file) : openSync2(file, "r");
  } catch (error) {
    if (error.code === "ENOENT" || !strict && durableRoot === void 0 && error.code === "ENOTDIR") return;
    throw error;
  }
  if (fd !== void 0)
    try {
      let chunk = Buffer.allocUnsafe(CHUNK_BYTES), want = prefix === null ? null : Buffer.from(prefix, "utf8"), position = from, parts = [], held = 0, skipping = !1, checked = want === null;
      for (; ; ) {
        let read = readSync(fd, chunk, 0, CHUNK_BYTES, position);
        if (read === 0) {
          if (strict && (held > 0 || skipping)) throw new StoreCorruption(`${file} has an unterminated record line`);
          return;
        }
        let start = 0;
        for (; start < read; ) {
          let found = chunk.indexOf(NEWLINE, start), end = found < 0 || found >= read ? read : found;
          if (!skipping)
            if (held + (end - start) > LINE_BYTES_MAX) {
              if (strict) throw new StoreCorruption(`${file} has an overlong record line`);
              skipping = !0, parts = [], held = 0;
            } else
              parts.push(Buffer.from(chunk.subarray(start, end))), held += end - start, !checked && held >= want.length && (Buffer.concat(parts, held).subarray(0, want.length).equals(want) ? checked = !0 : (skipping = !0, parts = [], held = 0));
          if (end === read && (found < 0 || found >= read)) break;
          !skipping && checked && (yield { text: Buffer.concat(parts, held).toString("utf8"), next: position + end + 1 }), parts = [], held = 0, skipping = !1, checked = want === null, start = end + 1;
        }
        position += read;
      }
    } finally {
      closeSync2(fd);
    }
}
function appendText(file, data, { durable, durableRoot }) {
  let strict = durableRoot !== void 0;
  strict || mkdirSync2(dirname2(file), { recursive: !0 });
  let flags = constants2.O_APPEND | constants2.O_CREAT | constants2.O_RDWR, fd = strict ? openDurableFileSync(file, flags, { durableRoot, mode: 420, createParents: !0 }) : openSync2(file, flags, 420);
  try {
    let size = fstatSync2(fd).size, cut = !1;
    if (size > 0) {
      let last = Buffer.alloc(1);
      readSync(fd, last, 0, 1, size - 1), cut = last[0] !== NEWLINE;
    }
    let bytes = Buffer.from(cut ? `
${data}` : data, "utf8");
    if (writeSync(fd, bytes) !== bytes.length) throw new StoreError("short-write", `short write to ${file}`);
    durable && fsyncSync2(fd);
  } finally {
    closeSync2(fd);
  }
  strict && syncFileDurablySync(file, { durableRoot });
}
function verifiedRecord(text2, address) {
  let line;
  try {
    line = parseJsonValue(text2);
  } catch {
    return;
  }
  if (!(!isObject(line) || line.id !== address || !isObject(line.record)))
    try {
      return semanticId(line.record) === address ? line.record : void 0;
    } catch {
      return;
    }
}
function find(root, type, address, strict, durableRoot) {
  let file = recordFile(checkRoot(root), type, address), corrupt = !1;
  for (let { text: text2 } of scanLines(file, { prefix: `{"id":"${address}"`, durableRoot })) {
    let record5 = verifiedRecord(text2, address);
    if (record5 !== void 0) return record5;
    corrupt = !0;
  }
  if (corrupt && strict) throw new StoreCorruption(`${file} holds lines for ${address} and none hashes to it`);
}
function put(root, type, record5, { durableRoot } = {}) {
  if (checkRoot(root), checkTypeName(type), !isObject(record5)) throw new StoreError("record", "a record is a JSON object");
  let text2 = canonicalJson(record5), size = Buffer.byteLength(text2, "utf8");
  if (size > RECORD_BYTES_MAX) throw new StoreError("record-size", `a record is at most ${RECORD_BYTES_MAX} bytes of canonical JSON; this is ${size}`);
  let address = semanticId(record5), file = recordFile(root, type, address);
  return durableRoot !== void 0 && assertDurableFilePathSync(file, { durableRoot }), find(root, type, address, !1, durableRoot) !== void 0 ? (durableRoot !== void 0 && syncFileDurablySync(file, { durableRoot }), address) : (appendText(file, `{"id":"${address}","record":${text2}}
`, { durable: !0, durableRoot }), address);
}
var NAME_ALPHABET = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
function* bucketPaths(directory, { strict }) {
  let algorithm = dirname2(niBucketPath(`ni:///sha-256;${"A".repeat(43)}`, NI_PATH_VERSION)), present2 = new Uint32Array(128);
  for (let name of directoryNames(`${directory}/${algorithm}`, { strict })) {
    let first2 = NAME_ALPHABET.indexOf(name[0]), second = NAME_ALPHABET.indexOf(name[1]);
    if (first2 < 0 || second < 0 || niBucketPath(`ni:///sha-256;${name.slice(0, 2)}${"A".repeat(41)}`, NI_PATH_VERSION) !== `${algorithm}/${name}`) continue;
    let index2 = first2 * 64 + second;
    present2[index2 >>> 5] |= 1 << (index2 & 31);
  }
  for (let index2 = 0; index2 < 4096; index2 += 1)
    (present2[index2 >>> 5] & 1 << (index2 & 31)) !== 0 && (yield niBucketPath(`ni:///sha-256;${NAME_ALPHABET[index2 >>> 6]}${NAME_ALPHABET[index2 & 63]}${"A".repeat(41)}`, NI_PATH_VERSION));
}
function* each(root, type, { strict = !1 } = {}) {
  checkRoot(root);
  let directory = recordsDirectory(root, type);
  for (let bucket2 of bucketPaths(directory, { strict })) {
    let file = `${directory}/${bucket2}`;
    for (let { text: text2 } of scanLines(file, { strict })) {
      let line;
      try {
        line = parseJsonValue(text2);
      } catch {
        if (strict) throw new StoreCorruption(`${file} contains malformed record JSON`);
        continue;
      }
      let record5 = isObject(line) && typeof line.id == "string" && isObject(line.record) && isNiUri(line.id) && bucketOf(line.id, bucket2) ? verifiedRecord(text2, line.id) : void 0;
      if (record5 !== void 0) yield { address: line.id, record: record5 };
      else if (strict) throw new StoreCorruption(`${file} contains an invalid or unverifiable record`);
    }
  }
}
var bucketOf = (address, bucket2) => niBucketPath(address, NI_PATH_VERSION) === bucket2;
function* directoryNames(directory, { strict = !1 } = {}) {
  let dir;
  try {
    dir = opendirSync(directory);
  } catch (error) {
    if (error.code === "ENOENT" || !strict && error.code === "ENOTDIR") return;
    throw error;
  }
  try {
    for (let entry = dir.readSync(); entry !== null; entry = dir.readSync()) yield entry.name;
  } finally {
    dir.closeSync();
  }
}

// node_modules/.pnpm/@red-cup-engineering+stripe-services-section@0.1.11/node_modules/@red-cup-engineering/stripe-services-section/src/service.mjs
var cachedRoot;
function packageRoot() {
  return cachedRoot === void 0 && (cachedRoot = resolve2(dirname3(fileURLToPath(import.meta.url)), "..")), cachedRoot;
}
var ACTOR = "urn:ame:stripe-services-section", SUPPORTED_EVENTS = /* @__PURE__ */ new Set([
  ...CHECKOUT_EVENTS,
  "checkout.session.expired",
  "payment_intent.payment_failed",
  "charge.refunded",
  "invoice.paid",
  "invoice.payment_failed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted"
]), RECURRING_INTERVALS = /* @__PURE__ */ new Set(["day", "week", "month", "year"]);
function digest(value) {
  return identifyJsonSemanticContent({ objectKind: "stripe.payment-service-record", value, witnessRoot: EMPTY_WITNESS_ROOT }).id;
}
function reply(type, activity, object) {
  return { "@context": "https://www.w3.org/ns/activitystreams", id: `${activity?.id ?? `urn:request:${Date.now()}`}:${type.toLowerCase()}`, type, actor: ACTOR, target: activity?.actor, inReplyTo: activity?.id, object };
}
function reject(activity, reason, detail = void 0) {
  return reply("Reject", activity, { type: "ServiceRefusal", reason, ...detail === void 0 ? {} : { detail } });
}
function credentialMode(key) {
  return typeof key != "string" || key.length === 0 ? "absent" : /^(sk|rk)_test_/u.test(key) ? "test" : /^(sk|rk)_live_/u.test(key) ? "live" : "unknown";
}
function loadCatalog(path = join2(packageRoot(), "content/config/offerings.json")) {
  let { readFileSync: readFileSync8 } = createRequire(import.meta.url)("node:fs");
  return JSON.parse(readFileSync8(path, "utf8"));
}
function stripeKey(env) {
  return env.API_KEY_STRIPE || env.STRIPE_SECRET_KEY || "";
}
function readiness({ env = process.env, catalog = loadCatalog() } = {}) {
  let mode = credentialMode(stripeKey(env)), liveQualifications = catalog.offerings.filter((offering) => offering.status === "live").map((offering) => ({ id: offering.id, ...validateLiveOffering(offering) }));
  return {
    type: "StripePaymentAcceptanceReadiness",
    actor: ACTOR,
    legalMerchant: catalog.merchant.legalBody,
    credential: { present: mode !== "absent", recognizedMode: mode, sourceName: env.API_KEY_STRIPE ? "API_KEY_STRIPE" : env.STRIPE_SECRET_KEY ? "STRIPE_SECRET_KEY" : null },
    webhookSecretPresent: !!env.STRIPE_WEBHOOK_SECRET,
    customerContractTokenPresent: !!env.STRIPE_CUSTOMER_CONTRACT_TOKEN,
    offerings: catalog.offerings.map(({ id, status, mode: offeringMode, currency, unitAmount, recurring, customerChosenAmount }) => ({ id, status, mode: offeringMode, currency, unitAmount, ...recurring ? { recurring } : {}, ...customerChosenAmount ? { customerChosenAmount } : {} })),
    liveReadinessBasis: "local-policy-only; provider account, payout and webhook delivery still require independent receiving",
    liveQualifications,
    liveReady: mode === "live" && !!env.STRIPE_WEBHOOK_SECRET && !!env.STRIPE_CUSTOMER_CONTRACT_TOKEN && typeof catalog.merchant?.legalBody == "string" && catalog.merchant.legalBody.trim() !== "" && liveQualifications.some((qualification) => qualification.valid),
    secretsDisclosed: !1
  };
}
function validUrl(value) {
  try {
    let url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  } catch {
    return !1;
  }
}
function requestFrom(activity) {
  return activity?.object?.type === "ServiceSolicitation" ? activity.object.request : void 0;
}
function validateOfferingShape(offering) {
  let hasRecurring = offering?.recurring !== void 0 && offering?.recurring !== null;
  if (offering?.mode === "subscription" && !hasRecurring) return { valid: !1, reason: "subscription-offering-missing-recurring" };
  if (offering?.mode === "payment" && hasRecurring) return { valid: !1, reason: "payment-offering-must-not-declare-recurring" };
  if (hasRecurring) {
    let { interval, intervalCount } = offering.recurring;
    if (!RECURRING_INTERVALS.has(interval)) return { valid: !1, reason: "invalid-recurring-interval" };
    if (intervalCount !== void 0 && (!Number.isInteger(intervalCount) || intervalCount < 1)) return { valid: !1, reason: "invalid-recurring-interval-count" };
  }
  if (offering?.customerChosenAmount !== void 0 && offering?.customerChosenAmount !== null) {
    if (offering.mode !== "payment") return { valid: !1, reason: "customer-chosen-amount-offering-must-be-payment-mode" };
    if (offering.quantity?.minimum !== 1 || offering.quantity?.maximum !== 1) return { valid: !1, reason: "customer-chosen-amount-offering-must-be-single-quantity" };
    let { minimum, maximum, preset } = offering.customerChosenAmount;
    if (!Number.isInteger(minimum) || minimum < 100) return { valid: !1, reason: "invalid-customer-chosen-amount-minimum" };
    if (maximum !== void 0 && (!Number.isInteger(maximum) || maximum < minimum)) return { valid: !1, reason: "invalid-customer-chosen-amount-maximum" };
    if (preset !== void 0 && (!Number.isInteger(preset) || preset < minimum || maximum !== void 0 && preset > maximum)) return { valid: !1, reason: "invalid-customer-chosen-amount-preset" };
  }
  return { valid: !0 };
}
function validateLiveOffering(offering) {
  let shape = validateOfferingShape(offering);
  if (!shape.valid) return shape;
  if (offering?.status !== "live") return { valid: !1, reason: "offering-is-not-live" };
  if (!["payment", "subscription"].includes(offering.mode)) return { valid: !1, reason: "invalid-live-offering-mode" };
  if (typeof offering.currency != "string" || !/^[a-z]{3}$/u.test(offering.currency)) return { valid: !1, reason: "invalid-live-offering-currency" };
  if (offering.customerChosenAmount === void 0 && (!Number.isSafeInteger(offering.unitAmount) || offering.unitAmount < 1))
    return { valid: !1, reason: "invalid-live-offering-price" };
  if (!Number.isSafeInteger(offering.quantity?.minimum) || !Number.isSafeInteger(offering.quantity?.maximum) || offering.quantity.minimum < 1 || offering.quantity.maximum < offering.quantity.minimum)
    return { valid: !1, reason: "invalid-live-offering-quantity" };
  for (let field of ["beneficiarySettlement", "terms", "taxPolicy", "refundPolicy"])
    if (typeof offering[field] != "string" || offering[field].trim() === "")
      return { valid: !1, reason: "missing-live-offering-" + field };
  return { valid: !0 };
}
function validateRequest(request, catalog, mode) {
  if (!request || typeof request != "object") return { reason: "invalid-checkout-request" };
  let offering = catalog.offerings.find((candidate) => candidate.id === request.offeringId);
  if (!offering) return { reason: "unknown-offering" };
  let shape = validateOfferingShape(offering);
  if (!shape.valid) return { reason: shape.reason };
  if (offering.status !== "live" && !(offering.status === "test-only" && mode === "test")) return { reason: "offering-not-active-for-credential-mode" };
  if (mode === "live" && offering.status !== "live") return { reason: "live-credential-refused-for-non-live-offering" };
  if (mode === "live") {
    let qualified = validateLiveOffering(offering);
    if (!qualified.valid) return { reason: qualified.reason };
  }
  if (!validUrl(request.successUrl) || !validUrl(request.cancelUrl)) return { reason: "invalid-redirect-url" };
  if (typeof request.customerReference != "string" || request.customerReference.length < 1 || request.customerReference.length > 200) return { reason: "invalid-customer-reference" };
  let quantity = request.quantity ?? 1;
  return !Number.isInteger(quantity) || quantity < offering.quantity.minimum || quantity > offering.quantity.maximum ? { reason: "quantity-out-of-bounds" } : { offering, quantity };
}
function solicitCheckout(activity, options = {}) {
  let catalog = options.catalog ?? loadCatalog(options.catalogPath), mode = credentialMode(stripeKey(options.env ?? process.env));
  if (activity?.type !== "Offer" || activity?.target !== ACTOR) return reject(activity, "invalid-checkout-solicitation-envelope");
  if (mode === "absent" || mode === "unknown") return reject(activity, "stripe-credential-unavailable-or-unrecognized");
  let request = requestFrom(activity), admitted3 = validateRequest(request, catalog, mode);
  if (!admitted3.offering) return reject(activity, admitted3.reason);
  if (mode === "live" && !readiness({ env: options.env ?? process.env, catalog }).liveReady) return reject(activity, "stripe-live-activation-not-ready");
  let requestDigest = digest({ actor: activity.actor, request, offering: admitted3.offering });
  return reply("Offer", activity, { type: "ExecutableServiceOffer", request, requestDigest, offering: admitted3.offering, idempotencyKey: requestDigest.replace("ni:///sha-256;", "checkout-"), credentialMode: mode });
}
function evidenceStore(options) {
  if (options.store) return options.store;
  let root = options.root ?? packageRoot(), typeOf = (name) => name.replace(".", "-");
  return {
    record: ({ category: name, record: record5 }) => ({ id: put(root, typeOf(name), record5) }),
    query: ({ category: name }) => [...each(root, typeOf(name))].map(({ address, record: record5 }) => ({ id: address, record: record5 }))
  };
}
var category = (law, kind) => `${law}.${kind}`;
async function appendRecord(options, _env, now, record5, law, kind) {
  return evidenceStore(options).record({ category: category(law, kind), recordedAt: now.toISOString(), record: record5, told: { for: !0, against: !1 } });
}
function buildCheckoutSessionForm(offering, request, quantity, digestValue) {
  let form = new URLSearchParams();
  return form.set("mode", offering.mode), form.set("success_url", request.successUrl), form.set("cancel_url", request.cancelUrl), form.set("client_reference_id", request.customerReference), form.set("line_items[0][quantity]", String(quantity)), form.set("line_items[0][price_data][currency]", offering.currency), offering.customerChosenAmount ? (form.set("line_items[0][price_data][custom_unit_amount][enabled]", "true"), form.set("line_items[0][price_data][custom_unit_amount][minimum]", String(offering.customerChosenAmount.minimum)), offering.customerChosenAmount.maximum !== void 0 && form.set("line_items[0][price_data][custom_unit_amount][maximum]", String(offering.customerChosenAmount.maximum)), offering.customerChosenAmount.preset !== void 0 && form.set("line_items[0][price_data][custom_unit_amount][preset]", String(offering.customerChosenAmount.preset))) : form.set("line_items[0][price_data][unit_amount]", String(offering.unitAmount)), form.set("line_items[0][price_data][product_data][name]", offering.name), form.set("line_items[0][price_data][product_data][description]", offering.description), offering.mode === "subscription" && offering.recurring && (form.set("line_items[0][price_data][recurring][interval]", offering.recurring.interval), offering.recurring.intervalCount !== void 0 && form.set("line_items[0][price_data][recurring][interval_count]", String(offering.recurring.intervalCount))), form.set("metadata[request_digest]", digestValue), form.set("metadata[offering_id]", offering.id), form;
}
async function invokeCheckout(activity, options = {}) {
  let env = options.env ?? process.env, catalog = options.catalog ?? loadCatalog(options.catalogPath), key = stripeKey(env), mode = credentialMode(key), offered = activity?.object?.offer;
  if (activity?.type !== "Accept" || activity?.target !== ACTOR || offered?.type !== "Offer" || offered?.actor !== ACTOR || offered?.target !== activity.actor) return reject(activity, "invalid-checkout-acceptance-envelope");
  let admitted3 = validateRequest(offered.object.request, catalog, mode);
  if (!admitted3.offering) return reject(activity, admitted3.reason);
  if (mode === "live" && !readiness({ env, catalog }).liveReady) return reject(activity, "stripe-live-activation-not-ready");
  let expectedDigest = digest({ actor: activity.actor, request: offered.object.request, offering: admitted3.offering });
  if (offered.object.requestDigest !== expectedDigest || offered.object.idempotencyKey !== expectedDigest.replace("ni:///sha-256;", "checkout-")) return reject(activity, "provider-offer-digest-mismatch");
  let request = offered.object.request, form = buildCheckoutSessionForm(admitted3.offering, request, admitted3.quantity, expectedDigest);
  form.set("metadata[customer_settlement]", activity.actor);
  let fetchImpl = options.fetchImpl ?? fetch, response;
  try {
    response = await fetchImpl("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": offered.object.idempotencyKey }, body: form });
  } catch {
    return reject(activity, "stripe-api-unavailable");
  }
  let body;
  try {
    body = await response.json();
  } catch {
    return reject(activity, "stripe-api-invalid-response");
  }
  if (!response.ok) return reject(activity, "stripe-api-refusal", { status: response.status, code: body?.error?.code ?? null, type: body?.error?.type ?? null });
  if (typeof body?.id != "string" || typeof body?.url != "string") return reject(activity, "stripe-api-incomplete-session");
  let now = options.now ?? /* @__PURE__ */ new Date(), receipt = { id: `urn:stripe-checkout-receipt:${body.id}`, type: "StripeCheckoutSessionReceipt", recordedAt: now.toISOString(), legalMerchant: catalog.merchant.legalBody, customerSettlement: activity.actor, offeringId: admitted3.offering.id, requestDigest: expectedDigest, stripeSessionId: body.id, stripeMode: mode, amountTotal: body.amount_total ?? (admitted3.offering.unitAmount !== void 0 ? admitted3.offering.unitAmount * admitted3.quantity : null), currency: body.currency ?? admitted3.offering.currency, paymentStatus: body.payment_status ?? "unpaid", status: body.status ?? "open", expiresAt: body.expires_at ?? null, secretRecorded: !1, buyerPaymentDataRecorded: !1 };
  return await appendRecord(options, env, now, receipt, "stripe-checkout-session-creation", "receipts"), reply("Accept", activity, { ...receipt, checkoutUrl: body.url });
}
function verifyStripeSignature({ rawBody, signatureHeader, secret, toleranceSeconds = 300, now = Math.floor(Date.now() / 1e3) }) {
  if (typeof rawBody != "string" || typeof signatureHeader != "string" || typeof secret != "string" || !secret) return !1;
  let fields = signatureHeader.split(",").map((part) => part.split("=", 2)), timestamp = Number(fields.find(([key]) => key === "t")?.[1]), signatures = fields.filter(([key, value]) => key === "v1" && /^[a-f0-9]{64}$/iu.test(value ?? "")).map(([, value]) => value);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > toleranceSeconds || signatures.length === 0) return !1;
  let expected = Buffer.from(createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex"), "hex");
  return signatures.some((signature) => {
    let actual = Buffer.from(signature, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
}
function projectEvent(event) {
  let object = event?.data?.object ?? {}, metadata = object.metadata ?? {}, isSubscriptionEvent = typeof event?.type == "string" && event.type.startsWith("customer.subscription."), isInvoiceEvent = typeof event?.type == "string" && event.type.startsWith("invoice.");
  return {
    stripeEventId: event.id,
    eventType: event.type,
    created: event.created ?? null,
    livemode: event.livemode ?? null,
    stripeObjectId: typeof object.id == "string" ? object.id : null,
    paymentStatus: object.payment_status ?? null,
    status: object.status ?? null,
    amountTotal: object.amount_total ?? object.amount ?? null,
    currency: object.currency ?? null,
    paymentIntentId: typeof object.payment_intent == "string" ? object.payment_intent : null,
    subscriptionId: typeof object.subscription == "string" ? object.subscription : isSubscriptionEvent && typeof object.id == "string" ? object.id : null,
    invoiceId: isInvoiceEvent && typeof object.id == "string" ? object.id : null,
    currentPeriodStart: typeof object.current_period_start == "number" ? object.current_period_start : null,
    currentPeriodEnd: typeof object.current_period_end == "number" ? object.current_period_end : null,
    cancelAtPeriodEnd: typeof object.cancel_at_period_end == "boolean" ? object.cancel_at_period_end : null,
    requestDigest: metadata.request_digest ?? null,
    offeringId: metadata.offering_id ?? null,
    customerSettlement: metadata.customer_settlement ?? null
  };
}

// node_modules/.pnpm/@red-cup-engineering+oauth-services-section@0.1.2/node_modules/@red-cup-engineering/oauth-services-section/src/oauth-error.mjs
var OAuthError = class extends Error {
  code;
  description;
  constructor(code, description = "") {
    super(`${code}: ${description}`), this.code = code, this.description = description;
  }
};

// node_modules/.pnpm/@red-cup-engineering+oauth-services-section@0.1.2/node_modules/@red-cup-engineering/oauth-services-section/src/json-web-token.mjs
import { createPrivateKey, sign as cryptoSign } from "node:crypto";
var ALGORITHMS = Object.freeze({
  RS256: { digest: "sha256", options: {}, verify: { members: ["kty", "n", "e"], importAs: { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, verifyAs: { name: "RSASSA-PKCS1-v1_5" } } },
  ES256: { digest: "sha256", options: { dsaEncoding: "ieee-p1363" }, verify: { members: ["kty", "crv", "x", "y"], importAs: { name: "ECDSA", namedCurve: "P-256" }, verifyAs: { name: "ECDSA", hash: "SHA-256" } } },
  EdDSA: { digest: null, options: {}, verify: { members: ["kty", "crv", "x"], importAs: { name: "Ed25519" }, verifyAs: { name: "Ed25519" } } }
});
function decodePart(text2, label) {
  try {
    let value = JSON.parse(Buffer.from(text2, "base64url").toString("utf8"));
    if (value === null || typeof value != "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch {
    throw new TypeError(`JWT ${label} is not a base64url JSON object`);
  }
}
function decodeJsonWebToken(token4) {
  if (typeof token4 != "string") throw new TypeError("JWT must be a string");
  let parts = token4.split(".");
  if (parts.length !== 3 || parts.some((part) => !/^[A-Za-z0-9_-]*$/u.test(part))) throw new TypeError("JWT must be three base64url segments");
  return {
    header: decodePart(parts[0], "header"),
    claims: decodePart(parts[1], "claims"),
    signingInput: Buffer.from(`${parts[0]}.${parts[1]}`, "ascii"),
    signature: Buffer.from(parts[2], "base64url")
  };
}
function remoteJsonWebKeySet(url, { fetchImpl = fetch, cooldownDuration = 3e4 } = {}) {
  let keys = null, fetchedAt = -1 / 0, refresh = async () => {
    let response = await fetchImpl(String(url));
    if (!response.ok && response.ok !== void 0) throw new Error(`JWKS fetch failed with status ${response.status}`);
    let body = await response.json();
    if (!Array.isArray(body?.keys)) throw new TypeError("JWKS response has no keys array");
    keys = body.keys, fetchedAt = Date.now();
  };
  return async (header) => {
    let find2 = () => keys?.find((key) => (header.kid === void 0 || key.kid === header.kid) && (key.alg === void 0 || key.alg === header.alg));
    keys === null && await refresh();
    let found = find2();
    if (!found && Date.now() - fetchedAt >= cooldownDuration && (await refresh(), found = find2()), !found) throw new Error(`no JWKS key matches kid ${String(header.kid)}`);
    return found;
  };
}
async function verifyJsonWebToken(token4, keySet, options = {}) {
  let { header, claims, signingInput, signature } = decodeJsonWebToken(token4), allowed = options.algorithms ?? Object.keys(ALGORITHMS), algorithm = ALGORITHMS[header.alg];
  if (!algorithm || !allowed.includes(header.alg)) throw new Error(`JWT algorithm ${String(header.alg)} is not accepted`);
  let jwk = typeof keySet == "function" ? await keySet(header) : keySet?.keys?.find((key) => header.kid === void 0 || key.kid === header.kid);
  if (!jwk) throw new Error(`no key matches kid ${String(header.kid)}`);
  let { members, importAs, verifyAs } = algorithm.verify, publicJwk = Object.fromEntries(members.filter((name) => jwk[name] !== void 0).map((name) => [name, jwk[name]])), publicKey = await crypto.subtle.importKey("jwk", publicJwk, importAs, !1, ["verify"]);
  if (!await crypto.subtle.verify(verifyAs, publicKey, signature, signingInput)) throw new Error("JWT signature verification failed");
  let now = Math.floor((options.now?.() ?? Date.now()) / 1e3);
  for (let name of options.requiredClaims ?? []) if (claims[name] === void 0) throw new Error(`JWT claim ${name} is required`);
  if (claims.exp !== void 0 && (typeof claims.exp != "number" || claims.exp <= now)) throw new Error("JWT is expired");
  if (claims.nbf !== void 0 && (typeof claims.nbf != "number" || claims.nbf > now)) throw new Error("JWT is not yet valid");
  if (options.issuer !== void 0 && ![options.issuer].flat().includes(claims.iss)) throw new Error("JWT issuer is not accepted");
  if (options.audience !== void 0) {
    let audiences = [claims.aud].flat();
    if (![options.audience].flat().some((audience) => audiences.includes(audience))) throw new Error("JWT audience is not accepted");
  }
  return { header, payload: claims };
}

// node_modules/.pnpm/@red-cup-engineering+google-oauth-services-section@0.1.2/node_modules/@red-cup-engineering/google-oauth-services-section/scripts/exchange-google-callback-service.mjs
var GOOGLE_ISSUERS = Object.freeze(["https://accounts.google.com", "accounts.google.com"]), GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
function createGoogleIdTokenVerifier(options = {}) {
  let remoteJwkSet = remoteJsonWebKeySet(options.jwksUrl ?? GOOGLE_JWKS_URL, {
    ...options.fetchImpl === void 0 ? {} : { fetchImpl: options.fetchImpl },
    ...options.cooldownDuration === void 0 ? {} : { cooldownDuration: options.cooldownDuration }
  });
  return async (idToken, googleClientId) => {
    let { payload } = await verifyJsonWebToken(idToken, remoteJwkSet, {
      issuer: GOOGLE_ISSUERS,
      audience: googleClientId,
      requiredClaims: ["exp", "iat", "sub"]
    });
    return payload;
  };
}
var verifyGoogleIdToken = createGoogleIdTokenVerifier();
function refused(description) {
  throw new OAuthError("access_denied", description);
}
function assertRegisteredClaims(claims, googleClientId, expectedNonce, now) {
  (claims === null || typeof claims != "object") && refused("Google id_token validation failed"), GOOGLE_ISSUERS.includes(claims.iss) || refused("id_token issuer mismatch"), (typeof claims.exp != "number" || !Number.isFinite(claims.exp) || claims.exp <= now() / 1e3) && refused("id_token expired"), (typeof claims.iat != "number" || !Number.isFinite(claims.iat)) && refused("id_token issued-at missing"), (typeof claims.sub != "string" || claims.sub.length === 0) && refused("id_token subject missing");
  let audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  (!audiences.includes(googleClientId) || audiences.some((audience) => typeof audience != "string")) && refused("id_token audience mismatch"), (audiences.length > 1 || claims.azp !== void 0) && claims.azp !== googleClientId && refused("id_token authorized party mismatch"), expectedNonce !== void 0 && claims.nonce !== expectedNonce && refused("id_token nonce mismatch");
}
function identityFrom(claims) {
  return (typeof claims.email != "string" || claims.email.length === 0) && refused("id_token email missing"), claims.email_verified !== !0 && refused("id_token email is not verified"), { issuer: "https://accounts.google.com", subject: claims.sub, email: claims.email, emailVerified: !0, claims };
}
async function exchangeGoogleCallback(googleCode, config) {
  let {
    googleClientId,
    googleClientSecret,
    publicBaseUrl: publicBaseUrl2,
    redirectPath = "/oauth/google/callback",
    codeVerifier,
    expectedNonce,
    verifyIdToken = verifyGoogleIdToken,
    fetchImpl = fetch,
    now = Date.now
  } = config, body = new URLSearchParams({
    code: googleCode,
    client_id: googleClientId,
    client_secret: googleClientSecret,
    redirect_uri: `${publicBaseUrl2}${redirectPath}`,
    grant_type: "authorization_code"
  });
  codeVerifier !== void 0 && body.set("code_verifier", codeVerifier);
  let tokenResponse = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  if (!tokenResponse.ok) throw new OAuthError("server_error", "Google token exchange failed");
  let { id_token: idToken } = await tokenResponse.json();
  if (typeof idToken != "string" || idToken.length === 0) throw new OAuthError("server_error", "Google token response missing id_token");
  let claims;
  try {
    claims = await verifyIdToken(idToken, googleClientId);
  } catch (error) {
    throw error instanceof OAuthError ? error : new OAuthError("access_denied", "Google id_token validation failed");
  }
  return assertRegisteredClaims(claims, googleClientId, expectedNonce, now), { ...identityFrom(claims), idToken };
}

// node_modules/.pnpm/@red-cup-engineering+oauth-services-section@0.1.2/node_modules/@red-cup-engineering/oauth-services-section/scripts/judge-principal-admission-service.mjs
function parseAllowedEmails(value) {
  if (value === void 0) return [];
  let raw = typeof value == "string" ? value.split(",") : value, seen = /* @__PURE__ */ new Set();
  for (let entry of raw) {
    let normalized = entry.trim().toLowerCase();
    normalized !== "" && seen.add(normalized);
  }
  return [...seen];
}
function resolveAdmissionPolicy(config) {
  if (config.admitEmail) return config.admitEmail;
  if (config.allowedEmails !== void 0) {
    let allowed = new Set(parseAllowedEmails(config.allowedEmails));
    return (email) => allowed.has(email.toLowerCase());
  }
  let allowedEmail = config.allowedEmail;
  return allowedEmail !== void 0 ? (email) => email.toLowerCase() === allowedEmail.toLowerCase() : () => !0;
}
function judgePrincipalAdmission(identity, admit2) {
  return identity.emailVerified ? admit2(identity.email) ? { admitted: !0, email: identity.email } : { admitted: !1, reason: "account not authorized" } : { admitted: !1, reason: "email not verified" };
}

// node_modules/.pnpm/@red-cup-engineering+google-oauth-services-section@0.1.2/node_modules/@red-cup-engineering/google-oauth-services-section/scripts/relay-to-google-consent-service.mjs
function relayToGoogleConsent(params) {
  let {
    state,
    googleClientId,
    publicBaseUrl: publicBaseUrl2,
    scopes,
    redirectPath = "/oauth/google/callback",
    codeChallenge,
    nonce: nonce2,
    accessType = "online",
    prompt,
    loginHint
  } = params, scope = scopes === void 0 ? "openid email" : Array.isArray(scopes) ? scopes.join(" ") : scopes, url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  return url.searchParams.set("client_id", googleClientId), url.searchParams.set("redirect_uri", `${publicBaseUrl2}${redirectPath}`), url.searchParams.set("response_type", "code"), url.searchParams.set("scope", scope), url.searchParams.set("state", state), url.searchParams.set("access_type", accessType), codeChallenge !== void 0 && (url.searchParams.set("code_challenge", codeChallenge), url.searchParams.set("code_challenge_method", "S256")), nonce2 !== void 0 && url.searchParams.set("nonce", nonce2), prompt !== void 0 && url.searchParams.set("prompt", prompt), loginHint !== void 0 && url.searchParams.set("login_hint", loginHint), url.toString();
}

// node_modules/.pnpm/@red-cup-engineering+computer-web-server@0.6.2_@types+node@26.6.5_bufferutil@4.1.0_debu_45bea7e10684ff64f2642c3e96beb984/node_modules/@red-cup-engineering/computer-web-server/src/admission/session.mjs
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/hash.mjs
import crypto2 from "node:crypto";
function sha2562(buf) {
  return crypto2.createHash("sha256").update(buf).digest();
}
var NATIVE_RIPEMD160 = (() => {
  try {
    return crypto2.getHashes().includes("ripemd160") ? (crypto2.createHash("ripemd160").update(Buffer.alloc(0)).digest(), !0) : !1;
  } catch {
    return !1;
  }
})();

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/cookie.mjs
var NAME_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, FIELD_VALUE_RE = /^[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*$/, isCookieName = (name) => NAME_RE.test(name);
function assertCookieName(name) {
  if (!isCookieName(name)) throw new TypeError(`invalid cookie name: ${JSON.stringify(name)}`);
}
var isFieldValue = (value) => FIELD_VALUE_RE.test(value);
function decodeCookieValue(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function parseCookieHeader(header) {
  if (!header) return Object.freeze({});
  let raw = typeof header == "string" ? header : header.join("; "), cookies = {};
  for (let part of raw.split(";")) {
    let trimmed = part.trim();
    if (!trimmed) continue;
    let equals = trimmed.indexOf("=");
    if (equals <= 0) continue;
    let name = trimmed.slice(0, equals).trim();
    !isCookieName(name) || Object.hasOwn(cookies, name) || (cookies[name] = decodeCookieValue(trimmed.slice(equals + 1).trim()));
  }
  return Object.freeze(cookies);
}
function serializeSetCookie(name, value, options = {}) {
  assertCookieName(name);
  let encoded = (options.encode ?? encodeURIComponent)(value);
  if (!isFieldValue(encoded)) throw new TypeError(`serializeSetCookie: encoded value for ${name} contains invalid characters`);
  let parts = [
    `${name}=${encoded}`
  ];
  if (options.maxAge !== void 0) {
    if (!Number.isFinite(options.maxAge)) throw new TypeError("serializeSetCookie: maxAge must be finite");
    parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }
  if (options.domain !== void 0 && parts.push(`Domain=${validAttributeValue("domain", options.domain)}`), options.path !== void 0 && parts.push(`Path=${validAttributeValue("path", options.path)}`), options.expires !== void 0) {
    if (!Number.isFinite(options.expires.getTime())) throw new TypeError("serializeSetCookie: expires must be a valid Date");
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }
  return options.httpOnly && parts.push("HttpOnly"), options.secure && parts.push("Secure"), options.sameSite !== void 0 && options.sameSite !== !1 && parts.push(`SameSite=${sameSiteValue(options.sameSite)}`), options.priority !== void 0 && parts.push(`Priority=${priorityValue(options.priority)}`), options.partitioned && parts.push("Partitioned"), parts.join("; ");
}
function validAttributeValue(name, value) {
  if (!isFieldValue(value)) throw new TypeError(`serializeSetCookie: ${name} contains invalid characters`);
  return value;
}
function sameSiteValue(value) {
  if (value === !0) return "Strict";
  let normalized = value.toLowerCase();
  if (normalized === "strict") return "Strict";
  if (normalized === "lax") return "Lax";
  if (normalized === "none") return "None";
  throw new TypeError("serializeSetCookie: sameSite must be Strict, Lax, or None");
}
function priorityValue(value) {
  let normalized = value.toLowerCase();
  if (normalized === "low") return "Low";
  if (normalized === "medium") return "Medium";
  if (normalized === "high") return "High";
  throw new TypeError("serializeSetCookie: priority must be Low, Medium, or High");
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/signed-cookie.mjs
import { createHmac as createHmac2, timingSafeEqual as timingSafeEqual2 } from "node:crypto";
function signCookieValue(value, secret, salt = "cookie") {
  if (!secret) throw new TypeError("signCookieValue: secret is required");
  let signature = createHmac2("sha256", secret).update(salt).update("\0").update(value).digest("base64url");
  return `${value}.${signature}`;
}
function unsignCookieValue(signedValue, secret, salt = "cookie") {
  let marker = signedValue.lastIndexOf(".");
  if (marker <= 0) return null;
  let value = signedValue.slice(0, marker), signature = signedValue.slice(marker + 1), expected = signCookieValue(value, secret, salt).slice(value.length + 1);
  return safeEqual(signature, expected) ? value : null;
}
function safeEqual(left, right) {
  let a = Buffer.from(left), b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual2(a, b);
}

// node_modules/.pnpm/@red-cup-engineering+computer-web-server@0.6.2_@types+node@26.6.5_bufferutil@4.1.0_debu_45bea7e10684ff64f2642c3e96beb984/node_modules/@red-cup-engineering/computer-web-server/src/admission/session.mjs
var DEFAULT_SESSION_TTL_SECONDS = 1209600, DEFAULT_TRANSACTION_TTL_SECONDS = 600, COOKIE_ATTRIBUTES = Object.freeze({ httpOnly: !0, secure: !0, sameSite: "lax", path: "/" });
function required(value, label) {
  if (value == null || value === "")
    throw new TypeError(`session: ${label} is required`);
}
function base64UrlEncode(bytes) {
  return Buffer.from(bytes).toString("base64url");
}
function base64UrlDecode(value) {
  return new Uint8Array(Buffer.from(value, "base64url"));
}
function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}
function opaqueCookie(name, value, ttlSeconds) {
  return required(name, "cookie name"), required(value, "cookie value"), serializeSetCookie(name, value, { ...COOKIE_ATTRIBUTES, maxAge: Math.floor(ttlSeconds) });
}
function clearedCookie(name) {
  return serializeSetCookie(name, "", { ...COOKIE_ATTRIBUTES, maxAge: 0, expires: /* @__PURE__ */ new Date(0) });
}
function cookieValue(request, name) {
  let header = request.headers.get("cookie");
  if (header === null || header === "")
    return null;
  let value = parseCookieHeader(header)[name];
  return typeof value == "string" ? value : null;
}
function signedPayload(value, secret, salt) {
  return required(secret, "secret"), signCookieValue(base64UrlEncode(new TextEncoder().encode(JSON.stringify(value))), secret, salt);
}
function unsignedPayload(raw, secret, salt, now) {
  if (typeof raw != "string" || raw.length === 0)
    return null;
  let payload;
  try {
    payload = unsignCookieValue(raw, secret, salt);
  } catch {
    return null;
  }
  if (payload === null)
    return null;
  let parsed;
  try {
    parsed = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed != "object" || Array.isArray(parsed))
    return null;
  let expiresAt = parsed.expiresAt;
  return typeof expiresAt != "number" || Math.floor(now() / 1e3) > expiresAt ? null : parsed;
}
function encryptionKey(secret) {
  return sha2562(`web-admission confidential cookie\0${secret}`);
}
function sealConfidential(value, secret) {
  required(secret, "secret");
  let iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", encryptionKey(secret), iv), ciphertext = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]), tag = cipher.getAuthTag();
  return `v1.${iv.toString("base64url")}.${Buffer.concat([ciphertext, tag]).toString("base64url")}`;
}
function unsealConfidential(raw, secret) {
  if (typeof raw != "string" || !raw.startsWith("v1."))
    return null;
  let parts = raw.split(".");
  if (parts.length !== 3)
    return null;
  try {
    let iv = Buffer.from(parts[1], "base64url"), body = Buffer.from(parts[2], "base64url");
    if (body.length < 16)
      return null;
    let decipher = createDecipheriv("aes-256-gcm", encryptionKey(secret), iv);
    decipher.setAuthTag(body.subarray(body.length - 16));
    let plaintext = Buffer.concat([decipher.update(body.subarray(0, body.length - 16)), decipher.final()]);
    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    return null;
  }
}
function createSessionCookie(options) {
  let { name, subject, subjectHash, email, secret, now, ttlSeconds = DEFAULT_SESSION_TTL_SECONDS } = options;
  if (required(name, "name"), required(subject, "subject"), required(subjectHash, "subjectHash"), required(email, "email"), required(secret, "secret"), typeof now != "function")
    throw new TypeError("session: now must be a function");
  let issuedAt = Math.floor(now() / 1e3), value = signedPayload({ subject, subjectHash, email, issuedAt, expiresAt: issuedAt + Math.floor(ttlSeconds) }, secret, name);
  return opaqueCookie(name, value, ttlSeconds);
}
function readSession(request, name, secret, now) {
  let parsed = unsignedPayload(cookieValue(request, name), secret, name, now);
  if (parsed === null)
    return null;
  let { subject, subjectHash, email } = parsed;
  return typeof subject != "string" || typeof subjectHash != "string" || typeof email != "string" ? null : Object.freeze({ subject, subjectHash, email });
}
function createTransactionCookie(options) {
  let { name, state, nonce: nonce2, codeVerifier, returnTo, secret, now, ttlSeconds = DEFAULT_TRANSACTION_TTL_SECONDS } = options;
  required(name, "name"), required(state, "state"), required(nonce2, "nonce"), required(codeVerifier, "codeVerifier"), required(secret, "secret");
  let issuedAt = Math.floor(now() / 1e3), value = sealConfidential({ state, nonce: nonce2, codeVerifier, returnTo, issuedAt, expiresAt: issuedAt + Math.floor(ttlSeconds) }, secret);
  return opaqueCookie(name, value, ttlSeconds);
}
function readTransaction(request, name, secret, now) {
  let value = unsealConfidential(cookieValue(request, name), secret);
  if (!value || typeof value != "object" || Array.isArray(value))
    return null;
  let record5 = value;
  return typeof record5.expiresAt != "number" || Math.floor(now() / 1e3) > record5.expiresAt || typeof record5.state != "string" || typeof record5.nonce != "string" || typeof record5.codeVerifier != "string" ? null : Object.freeze({
    state: record5.state,
    nonce: record5.nonce,
    codeVerifier: record5.codeVerifier,
    returnTo: safeReturnTo(record5.returnTo)
  });
}
function safeReturnTo(offered) {
  return typeof offered != "string" || offered.length === 0 || !offered.startsWith("/") || offered.startsWith("//") || offered.includes("\\") ? "/" : offered;
}
function publicBaseUrl(configured, url) {
  let trimmed = typeof configured == "string" ? configured.trim() : "";
  return trimmed === "" ? url.origin : trimmed.replace(/\/$/u, "");
}

// node_modules/.pnpm/@red-cup-engineering+cryptographic-computer-data-engineering-services-section@0.3.1/node_modules/@red-cup-engineering/cryptographic-computer-data-engineering-services-section/src/integrity.mjs
import { createHash, createHmac as createHmac3, randomBytes as randomBytes2, timingSafeEqual as timingSafeEqual3 } from "node:crypto";
function sha256Hex(value) {
  return sha2562(Buffer.from(value, "utf8")).toString("hex");
}
function sha256Base64Url(value) {
  return sha2562(Buffer.from(value, "utf8")).toString("base64url");
}

// node_modules/.pnpm/@red-cup-engineering+computer-web-server@0.6.2_@types+node@26.6.5_bufferutil@4.1.0_debu_45bea7e10684ff64f2642c3e96beb984/node_modules/@red-cup-engineering/computer-web-server/src/admission/google.mjs
var GOOGLE_CALLBACK_PATH = "/oauth/callback";
var defaultGoogleCalls = Object.freeze({
  exchange: (code, config) => exchangeGoogleCallback(code, config)
});
function resolveGoogleSettings(settings) {
  let missing = [];
  for (let name of ["clientId", "clientSecret", "sessionSecret"])
    (typeof settings[name] != "string" || settings[name].length === 0) && missing.push(name);
  let allowed = typeof settings.allowedEmails == "string" ? settings.allowedEmails : "", predicate = typeof settings.admitEmail == "function" ? settings.admitEmail : void 0;
  return Object.freeze({
    configured: missing.length === 0,
    missing: Object.freeze(missing),
    admits: predicate !== void 0 || allowed.trim().length > 0,
    admit: predicate ?? resolveAdmissionPolicy({ allowedEmails: allowed }),
    sessionCookie: settings.sessionCookie ?? "web_session",
    transactionCookie: settings.transactionCookie ?? "web_oauth",
    sessionTtlSeconds: settings.sessionTtlSeconds ?? 1209600,
    settings
  });
}
function subjectHashOf(subject) {
  return sha256Hex(subject);
}
function beginGoogleLogin(settings, url, now = Date.now) {
  let resolved = resolveGoogleSettings(settings);
  if (!resolved.configured)
    return { status: 503, error: "login-unconfigured", missing: resolved.missing };
  let state = randomToken(), nonce2 = randomToken(), codeVerifier = randomToken(48), returnTo = safeReturnTo(url.searchParams.get("return_to"));
  return {
    status: 302,
    redirect: relayToGoogleConsent({
      state,
      nonce: nonce2,
      googleClientId: settings.clientId,
      publicBaseUrl: publicBaseUrl(settings.publicBaseUrl, url),
      redirectPath: settings.callbackPath ?? GOOGLE_CALLBACK_PATH,
      scopes: ["openid", "email", "profile"],
      codeChallenge: sha256Base64Url(codeVerifier),
      prompt: "select_account"
    }),
    cookies: [createTransactionCookie({ name: resolved.transactionCookie, state, nonce: nonce2, codeVerifier, returnTo, secret: settings.sessionSecret, now })]
  };
}
async function completeGoogleLogin(settings, request, url, now = Date.now, calls = defaultGoogleCalls) {
  let resolved = resolveGoogleSettings(settings);
  if (!resolved.configured)
    return { status: 503, error: "login-unconfigured", missing: resolved.missing };
  if (!resolved.admits)
    return { status: 503, error: "no-allowlist-configured" };
  let transaction = readTransaction(request, resolved.transactionCookie, settings.sessionSecret, now);
  if (transaction === null)
    return { status: 400, error: "login-expired" };
  let offeredState = url.searchParams.get("state");
  if (typeof offeredState != "string" || offeredState !== transaction.state)
    return { status: 400, error: "state-mismatch" };
  let code = url.searchParams.get("code");
  if (typeof code != "string" || code.length === 0)
    return { status: 400, error: url.searchParams.get("error") ?? "no-authorization-code" };
  let identity;
  try {
    identity = await calls.exchange(code, {
      googleClientId: settings.clientId,
      googleClientSecret: settings.clientSecret,
      // Byte-identical to the value sent at login: Google compares the two, and
      // so does the authorization-code binding.
      publicBaseUrl: publicBaseUrl(settings.publicBaseUrl, url),
      redirectPath: settings.callbackPath ?? GOOGLE_CALLBACK_PATH,
      codeVerifier: transaction.codeVerifier,
      expectedNonce: transaction.nonce
    });
  } catch (error) {
    let code2 = error instanceof OAuthError ? error.code : "server_error";
    return console.warn("Google callback refused", code2), { status: 502, error: "google-exchange-failed" };
  }
  let admission = judgePrincipalAdmission({ email: identity.email, emailVerified: identity.emailVerified }, resolved.admit);
  return admission.admitted ? typeof identity.subject != "string" || identity.subject.length === 0 ? { status: 502, error: "google-subject-missing" } : {
    status: 302,
    redirect: safeReturnTo(transaction.returnTo),
    cookies: [
      createSessionCookie({
        name: resolved.sessionCookie,
        subject: identity.subject,
        subjectHash: subjectHashOf(identity.subject),
        email: identity.email,
        secret: settings.sessionSecret,
        now,
        ttlSeconds: resolved.sessionTtlSeconds
      }),
      clearedCookie(resolved.transactionCookie)
    ]
  } : { status: 403, error: "not-authorized", reason: admission.reason, email: identity.email };
}
function googleLogout(settings) {
  let resolved = resolveGoogleSettings(settings);
  return { status: 302, redirect: "/", cookies: [clearedCookie(resolved.sessionCookie), clearedCookie(resolved.transactionCookie)] };
}
function identifyGoogle(settings, request, now = Date.now) {
  let resolved = resolveGoogleSettings(settings);
  if (!resolved.configured || !resolved.admits)
    return null;
  let session = readSession(request, resolved.sessionCookie, settings.sessionSecret, now);
  return session === null ? null : judgePrincipalAdmission({ email: session.email, emailVerified: !0 }, resolved.admit).admitted ? Object.freeze({ provider: "google", subject: session.subject, subjectHash: session.subjectHash, email: session.email, label: session.email }) : null;
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/content-type.mjs
init_header_value();
function parseContentType(value) {
  let raw = firstHeader(value)?.trim();
  if (!raw) return null;
  let parts = splitHeaderParameters(raw), type = (parts.shift() ?? "").trim().toLowerCase();
  if (!type) return null;
  let params = {};
  for (let part of parts) {
    let eq = part.indexOf("=");
    if (eq <= 0) continue;
    let key = part.slice(0, eq).trim().toLowerCase();
    key && (params[key] = unquoteHeaderValue(part.slice(eq + 1).trim()));
  }
  return Object.freeze({
    type,
    params: Object.freeze(params)
  });
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/body/body.mjs
var BodyReadError = class extends Error {
  status;
  code;
  constructor(status, code, message2, options) {
    super(message2, options), this.name = "BodyReadError", this.status = status, this.code = code;
  }
};
function limit(value, fallback, name) {
  let selected = value ?? fallback;
  if (Number.isNaN(selected) || selected < 0) throw new RangeError(`${name} must be a non-negative number`);
  return selected;
}
function cancel(reader, reason) {
  reader.cancel(reason).catch(() => {
  });
}
async function collectBody(stream, maximum, label, signal) {
  if (!stream)
    return signal?.throwIfAborted(), new Uint8Array(0);
  let reader = stream.getReader(), rejectAbort, aborted = new Promise((_resolve, reject2) => {
    rejectAbort = reject2;
  }), abort = () => {
    cancel(reader, signal?.reason), rejectAbort(signal?.reason);
  };
  signal?.addEventListener("abort", abort, {
    once: !0
  });
  let chunks = [], size = 0;
  try {
    for (signal?.aborted && (cancel(reader, signal.reason), signal.throwIfAborted()); ; ) {
      let result = await Promise.race([
        reader.read(),
        aborted
      ]);
      if (signal?.throwIfAborted(), result.done) break;
      if (size += result.value.byteLength, size > maximum) throw new BodyReadError(413, "body-too-large", `${label} exceeded ${maximum} bytes`);
      chunks.push(result.value.slice());
    }
    let bytes = new Uint8Array(size), offset = 0;
    for (let chunk of chunks)
      bytes.set(chunk, offset), offset += chunk.byteLength;
    return bytes;
  } catch (error) {
    throw cancel(reader, error), error instanceof BodyReadError ? error : signal?.aborted ? signal.reason : new BodyReadError(400, "invalid-body", "could not read request body", {
      cause: error
    });
  } finally {
    signal?.removeEventListener("abort", abort), reader.releaseLock();
  }
}
function contentCodings(value) {
  let codings = ((typeof value == "string" ? value : value?.join(",")) ?? "").split(",").map((part) => part.trim().toLowerCase()).filter((part) => part && part !== "identity");
  for (let coding of codings) if (![
    "br",
    "gzip",
    "deflate",
    "zstd"
  ].includes(coding)) throw new BodyReadError(415, "unsupported-content-coding", `unsupported request content-encoding: ${coding}`);
  return codings;
}
async function readBodyStream(stream, options, decoder, defaultLimit, signal) {
  let maxBytes = limit(options.maxBytes, defaultLimit, "maxBytes"), maxEncodedBytes = limit(options.maxEncodedBytes, maxBytes, "maxEncodedBytes"), codings = options.decodeContentEncoding === !1 ? [] : contentCodings(options.contentEncoding), bytes = await collectBody(stream, maxEncodedBytes, "request body", signal);
  for (let coding of [
    ...codings
  ].reverse()) bytes = await collectBody(decoder(bytes, coding), maxBytes, "decoded request body", signal);
  if (bytes.byteLength > maxBytes) throw new BodyReadError(413, "body-too-large", `decoded request body exceeded ${maxBytes} bytes`);
  return bytes;
}
function decodeBody(bytes, contentType) {
  let charset = (parseContentType(contentType)?.params.charset ?? "utf-8").toLowerCase();
  if (![
    "utf-8",
    "utf8",
    "us-ascii",
    "ascii",
    "iso-8859-1",
    "latin1"
  ].includes(charset)) throw new BodyReadError(415, "unsupported-charset", `unsupported request charset: ${charset}`);
  if ([
    "iso-8859-1",
    "latin1",
    "us-ascii",
    "ascii"
  ].includes(charset)) {
    if ((charset === "ascii" || charset === "us-ascii") && bytes.some((byte) => byte > 127)) throw new BodyReadError(400, "invalid-body", "US-ASCII request body contains a non-ASCII octet");
    return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  }
  try {
    return new TextDecoder("utf-8", {
      fatal: !0
    }).decode(bytes);
  } catch (cause) {
    throw new BodyReadError(400, "invalid-body", "request body must contain valid UTF-8", {
      cause
    });
  }
}
function mediaType(value, expected, required2 = !0) {
  let parsed = parseContentType(value);
  if (!parsed && !required2) return;
  let type = parsed?.type, admitted3 = expected === "json" ? type === "application/json" || /^application\/[!#$%&'*+.^_`|~0-9a-z-]+\+json$/.test(type ?? "") : expected === "urlencoded" ? type === "application/x-www-form-urlencoded" : expected === "multipart" ? type === "multipart/form-data" : type === "multipart/form-data" || type === "application/x-www-form-urlencoded", label = expected === "urlencoded" ? "application/x-www-form-urlencoded" : expected === "multipart" ? "multipart/form-data" : expected === "json" ? "application/json" : "form";
  if (!admitted3) throw new BodyReadError(415, "unsupported-media-type", `expected ${label} body, got ${type ?? "missing content-type"}`);
  if (type === "multipart/form-data" && !parsed?.params.boundary) throw new BodyReadError(400, "invalid-form", "multipart/form-data boundary is required");
}
function parseJson2(text2, options) {
  if (!text2.trim() && "empty" in options) return options.empty;
  try {
    return JSON.parse(text2);
  } catch (cause) {
    throw new BodyReadError(400, "invalid-json", "request body must be valid JSON", {
      cause
    });
  }
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/body/web.mjs
var DEFAULT_BODY_LIMIT = 1024 * 1024, decode2 = (bytes, coding) => {
  let decoder;
  try {
    decoder = new DecompressionStream(coding);
  } catch (cause) {
    throw new BodyReadError(415, "unsupported-content-coding", `unsupported request content-encoding: ${coding}`, {
      cause
    });
  }
  return new Blob([
    bytes
  ]).stream().pipeThrough(decoder);
};
function optionsFor(request, options) {
  return {
    ...options,
    contentType: options.contentType ?? request.headers.get("content-type") ?? void 0,
    contentEncoding: options.contentEncoding ?? request.headers.get("content-encoding") ?? void 0
  };
}
async function readBody(request, options = {}) {
  return readBodyStream(request.body, optionsFor(request, options), decode2, DEFAULT_BODY_LIMIT, request.signal);
}
async function readTextBody(request, options = {}) {
  let selected = optionsFor(request, options);
  return decodeBody(await readBody(request, selected), selected.contentType);
}
async function readJsonBody(request, options = {}) {
  return mediaType(optionsFor(request, options).contentType, "json"), parseJson2(decodeBody(await readBody(request, options)), options);
}
async function readFormDataBody(request, options = {}) {
  let selected = optionsFor(request, options);
  mediaType(selected.contentType, "form");
  let bytes = await readBody(request, selected);
  try {
    return await new Response(bytes, {
      headers: {
        "content-type": selected.contentType
      }
    }).formData();
  } catch (cause) {
    throw new BodyReadError(400, "invalid-form", "request body must be valid form data", {
      cause
    });
  }
}

// node_modules/.pnpm/@red-cup-engineering+signcell@0.2.0/node_modules/@red-cup-engineering/signcell/src/mark.mjs
init_type_system();
init_semiotic_content_address();
var MarkSchema = {
  type: "object",
  required: ["kind", "value"],
  properties: { kind: { const: "utterance.mark" }, value: {} },
  additionalProperties: !1
}, definition = defineType({
  id: "Mark",
  name: "Mark",
  description: "An opaque present datum whose interpretation belongs to its consumer.",
  schema: MarkSchema,
  parents: []
});
if (!definition.ok)
  throw new TypeError(definition.refusal.message);
var MarkType = definition.value;
function Mark(value) {
  let carrier2 = canonicalCarrier({ kind: "utterance.mark", value });
  if (!instantiate(MarkType, carrier2).ok)
    throw new TypeError("Mark: value must be present");
  return carrier2;
}
function mark(value) {
  return Mark(value);
}
function isMark(value) {
  return instantiate(MarkType, value).ok;
}

// node_modules/.pnpm/@red-cup-engineering+signcell@0.2.0/node_modules/@red-cup-engineering/signcell/src/utterance.mjs
init_semiotic_content_address();
function Token(mark2) {
  return canonicalCarrier({ kind: "utterance.token", hand: "left", mark: mark2 });
}
function Claim(mark2) {
  return canonicalCarrier({ kind: "utterance.claim", hand: "right", mark: mark2 });
}
var markKinds = Object.freeze(["token", "claim"]);
function token(markCarrier) {
  return Token(markCarrier);
}
function claim(markCarrier) {
  return Claim(markCarrier);
}
var marked = (datum) => isMark(datum) ? canonicalCarrier(datum) : mark(datum);
function utterance(left, right) {
  return canonicalCarrier({ kind: "utterance.carrier", token: token(marked(left)), claim: claim(marked(right)) });
}
var markBoundarySchema = {
  $id: "metroplat/articulation/mark-boundary",
  ...MarkSchema,
  title: "MarkBoundary",
  description: "The opaque raw mark boundary admitted before token/claim pairing."
};

// node_modules/.pnpm/@red-cup-engineering+signcell@0.2.0/node_modules/@red-cup-engineering/signcell/src/cell.mjs
init_semiotic_content_address();
init_four();
var present = (value, role) => {
  if (value === void 0) throw new TypeError(`signcell: ${role} must be present`);
  return typeof value == "string" || typeof value == "boolean" || value === null || Number.isFinite(value) || semanticBytes(value), value;
};
function side(witnesses) {
  let byBytes = /* @__PURE__ */ new Map();
  for (let witness of witnesses) byBytes.set(bytesToHex(semanticBytes(present(witness, "witness"))), witness);
  return retainedCarrier([...byBytes.keys()].sort().map((key) => byBytes.get(key)));
}
var presenceOfSides = (told, denied) => readingOfSides("knowledge", told.length > 0, denied.length > 0);
function written(value, told, denied) {
  if (value === void 0) return {};
  if (!isReading(value)) throw new TypeError(`signcell: a value is a reading of FOUR, not ${JSON.stringify(value)}`);
  let name = readingAs("knowledge", value);
  return name === presenceOfSides(told, denied) ? {} : { value: name };
}
var evidence = ({ for: told = [], against: denied = [], value } = {}) => {
  let [forSide, againstSide] = [side(told), side(denied)];
  return retainedCarrier({ for: forSide, against: againstSide, ...written(value, forSide, againstSide) });
};
var admitted = /* @__PURE__ */ new WeakSet();
function made(subject, predicate, object, told, denied, reading) {
  let [forSide, againstSide] = [side(told), side(denied)], value = retainedCarrier({
    subject: present(subject, "subject"),
    predicate: present(predicate, "predicate"),
    object: present(object, "object"),
    for: forSide,
    against: againstSide,
    ...written(reading, forSide, againstSide)
  });
  return admitted.add(value), value;
}
function cell(subject, predicate, object, evidence2 = {}) {
  return made(subject, predicate, object, evidence2.for ?? [], evidence2.against ?? [], evidence2.value);
}
var triple = (value) => retainedCarrier({ subject: value.subject, predicate: value.predicate, object: value.object }), tripleBytesOf = /* @__PURE__ */ new WeakMap();
var tripleBytes = (value) => {
  let bytes = tripleBytesOf.get(value);
  return bytes === void 0 && (bytes = semanticBytes(triple(value)), admitted.has(value) && tripleBytesOf.set(value, bytes)), bytes;
};
var sameCell = (left, right) => left === right || bytesEqual(tripleBytes(left), tripleBytes(right));
var presence = (value) => presenceOfSides(value.for, value.against), valueOf = (value) => value.value ?? presence(value);
var hasTriple = (value) => value !== null && typeof value == "object" && "subject" in value && "predicate" in value && "object" in value;
var converse = (value) => cell(value.object, value.predicate, value.subject), subjectProjection = (value) => cell(value.subject, value.predicate, value.subject), objectProjection = (value) => cell(value.object, value.predicate, value.object);
var moves = Object.freeze({ converse, "subject-projection": subjectProjection, "object-projection": objectProjection });
var cellSchema = Object.freeze({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schemas.561.group/signcell/cell.schema.json",
  title: "SignCell",
  description: "An ordered (subject, predicate, object) triple with the witnesses told for and against it, and its value when that is not what the witnesses show.",
  type: "object",
  required: ["subject", "predicate", "object", "for", "against"],
  properties: {
    subject: {},
    predicate: {},
    object: {},
    for: { type: "array", uniqueItems: !0 },
    against: { type: "array", uniqueItems: !0 },
    value: readingSchema("knowledge")
  },
  additionalProperties: !1
}), tripleSchema = Object.freeze({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schemas.561.group/signcell/triple.schema.json",
  title: "Triple",
  description: "An ordered (subject, predicate, object).",
  type: "object",
  required: ["subject", "predicate", "object"],
  properties: { subject: {}, predicate: {}, object: {} },
  additionalProperties: !1
}), KEYS = ["against", "for", "object", "predicate", "subject"].join(), VALUED_KEYS = ["against", "for", "object", "predicate", "subject", "value"].join();

// node_modules/.pnpm/@red-cup-engineering+signchain@0.1.0/node_modules/@red-cup-engineering/signchain/src/bilattice.mjs
init_four();
init_semiotic_content_address();
var sameShape = (left, right) => {
  if (hasTriple(left) !== hasTriple(right)) throw new TypeError("signchain: a cell combines only with a cell, a bare evidence pair only with a pair");
  if (hasTriple(left) && !sameCell(left, right)) throw new TypeError("signchain: evidence of different cells does not combine");
}, shaped = (like, sides) => hasTriple(like) ? cell(like.subject, like.predicate, like.object, sides) : evidence(sides), combined = (operation) => (left, right) => (sameShape(left, right), shaped(left, { for: [...left.for, ...right.for], against: [...left.against, ...right.against], value: operation(valueOf(left), valueOf(right)) })), knowledgeJoin = combined(knowledgeJoinReading), knowledgeMeet = combined(knowledgeMeetReading), truthJoin = combined(truthJoinReading), truthMeet = combined(truthMeetReading);
var noEvidence = evidence();
var evidenceSchema = Object.freeze({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://schemas.561.group/signchain/evidence.schema.json",
  title: "Evidence",
  description: "The witnesses told for and against, each side a set, and the value when it is not what the witnesses show.",
  type: "object",
  required: ["for", "against"],
  properties: { for: { type: "array", uniqueItems: !0 }, against: { type: "array", uniqueItems: !0 }, value: readingSchema("knowledge") },
  additionalProperties: !1
});
function settleJudgments(judgments) {
  let records = Object.freeze([...judgments]);
  return Object.freeze({
    kind: "signchain.judgment-settlement",
    value: knowledgeJoinAll(records.map((judgment) => judgment.value)),
    judgments: records,
    stableJudgments: Object.freeze(records.filter((judgment) => samePoint(judgment.value, knowledgeTop())))
  });
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/request-trace.mjs
function claimOf(trace, claim2) {
  for (let i = trace.entries.length - 1; i >= 0; i--) {
    let entry = trace.entries[i];
    if (String(entry.e) === trace.id && entry.a === claim2)
      return String(entry.v);
  }
  return null;
}
function appendEntries(trace, entries) {
  return Object.freeze({
    ...trace,
    entries: Object.freeze([
      ...trace.entries,
      ...entries
    ])
  });
}
function traceEntryOf(entry) {
  return {
    subject: mark(String(entry.e)),
    predicate: mark(entry.a),
    object: mark(String(entry.v)),
    provenance: entry.t
  };
}
function judgmentEntry(trace, judgment) {
  return {
    subject: mark(trace.id),
    predicate: mark(`judgment:${judgment.name}`),
    object: mark(judgment.path),
    provenance: judgment.reason
  };
}
function utterTrace(entries) {
  return Object.freeze(entries.map((entry) => utterance(mark(Object.freeze({
    subject: entry.subject.value,
    object: entry.object.value
  })), entry.predicate)));
}
function settleRequestTrace(trace, judgments) {
  let settlement = settleJudgments(judgments), utterances = utterTrace([
    ...trace.entries.map(traceEntryOf),
    ...judgments.map((judgment) => judgmentEntry(trace, judgment))
  ]);
  return Object.freeze({
    kind: "web-server.request-settlement",
    trace,
    value: settlement.value,
    ready: settlement.value === "potential",
    denied: settlement.value === "active",
    contradicted: settlement.value === "stable",
    unsettled: settlement.value === "absurd",
    judgments,
    settlement,
    utterances,
    section: Object.freeze({
      contradicted: settlement.stableJudgments
    })
  });
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/src/mime-type.mjs
var import_whatwg_mimetype = __toESM(require_lib(), 1);
var encoder = new TextEncoder();
function mimeTypeEssence(value) {
  return typeof value == "string" ? import_whatwg_mimetype.MIMEType.parse(value)?.essence ?? null : null;
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/preferences.mjs
init_header_value();
function parseWeightedField(header) {
  return splitHeaderList(header).map((part, order) => {
    let [value = "", ...parameters] = splitHeaderParameters(part), weights = parameters.filter((parameter) => /^q\s*=/i.test(parameter)), weight = weights.length === 1 ? /^q=(0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/i.exec(weights[0]) : null;
    return { value: value.toLowerCase(), q: weights.length === 0 ? 1 : weight ? Number(weight[1]) : 0, order, parameters };
  });
}
var rank = (a, b) => b.q - a.q || b.specificity - a.specificity || a.order - b.order;
function parseAccept(header) {
  return parseWeightedField(header).map(({ value, q, order }) => {
    let [type = "*", subtype = "*"] = value.split("/");
    return { type, subtype, q, specificity: type === "*" ? 0 : subtype === "*" ? 1 : 2, order };
  }).sort(rank);
}
function parseAcceptLanguage(header) {
  return parseWeightedField(header).map(({ value: range, q, order }) => ({
    range,
    q,
    specificity: range === "*" ? 0 : range.split("-").filter(Boolean).length,
    order
  })).sort(rank);
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/negotiation.mjs
function selectRepresentation(entries, offered, matches, qualityTie = !1) {
  let best = null, bestQ = 0, bestSpecificity = -1;
  for (let value of offered) {
    let preference = null;
    for (let entry of entries)
      matches(entry, value) && (!preference || entry.specificity > preference.specificity || entry.specificity === preference.specificity && (qualityTie && entry.q !== preference.q ? entry.q > preference.q : entry.order < preference.order)) && (preference = entry);
    preference && preference.q > 0 && (preference.q > bestQ || preference.q === bestQ && preference.specificity > bestSpecificity) && (best = value, bestQ = preference.q, bestSpecificity = preference.specificity);
  }
  return best;
}
function negotiateType(header, offered) {
  let representations2 = offered.filter((value) => mimeTypeEssence(value) !== null);
  return header ? selectRepresentation(parseAccept(header), representations2, (entry, candidate) => {
    let [type, subtype] = mimeTypeEssence(candidate).split("/");
    return entry.type === "*" || entry.type === type && (entry.subtype === "*" || entry.subtype === subtype);
  }, !0) : representations2[0] ?? null;
}
function negotiateLanguage(header, offered) {
  return header ? selectRepresentation(parseAcceptLanguage(header), offered, (entry, candidate) => {
    let tag = candidate.toLowerCase();
    return entry.range === "*" || tag === entry.range || tag.startsWith(`${entry.range}-`);
  }) : offered[0] ?? null;
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/route-admission.mjs
function routeAllowedMethods(resource) {
  if (!resource?.methods) return null;
  let allowed = new Set(resource.methods.map((method) => method.toUpperCase()));
  return allowed.has("GET") && allowed.add("HEAD"), allowed.add("OPTIONS"), Object.freeze([
    ...allowed
  ]);
}
function routeAllowHeader(resource) {
  let allowed = routeAllowedMethods(resource);
  return allowed ? allowed.join(", ") : null;
}
function routeMethodAllowed(resource, method) {
  let allowed = routeAllowedMethods(resource);
  return !allowed || allowed.includes(method.toUpperCase());
}
function routeAdmissionJudgments(input) {
  let routePath = input.trace.id;
  if (!input.resource)
    return {
      judgments: Object.freeze([
        {
          name: "route",
          value: "absurd",
          reason: "no resource matched path",
          path: routePath
        }
      ]),
      denial: "route",
      allow: null
    };
  let allow = routeAllowHeader(input.resource), method = input.method.toUpperCase();
  if (!routeMethodAllowed(input.resource, method))
    return {
      judgments: Object.freeze([
        {
          name: "method",
          value: "active",
          reason: `method ${method} not admitted by [${allow ?? "all"}]`,
          path: routePath
        }
      ]),
      denial: "method",
      allow
    };
  let offered = input.resource.produces ?? [], negotiatedType = offered.length ? negotiateType(input.accept, offered) : null;
  if (offered.length && !negotiatedType)
    return {
      judgments: Object.freeze([
        {
          name: "accept",
          value: "active",
          reason: `no admitted representation in [${offered.join(",")}]`,
          path: routePath
        }
      ]),
      denial: "accept",
      allow
    };
  let languages = input.resource.languages ?? [], negotiatedLanguage = languages.length ? negotiateLanguage(input.acceptLanguage, languages) : null;
  return languages.length && !negotiatedLanguage ? {
    judgments: Object.freeze([
      {
        name: "accept-language",
        value: "active",
        reason: `no admitted language in [${languages.join(",")}]`,
        path: routePath
      }
    ]),
    denial: "accept-language",
    allow,
    ...negotiatedType !== null ? {
      negotiatedType
    } : {}
  } : {
    judgments: Object.freeze([
      {
        name: "route",
        value: "potential",
        reason: "resource admitted for handling",
        path: routePath
      }
    ]),
    denial: null,
    allow,
    ...negotiatedType !== null ? {
      negotiatedType
    } : {},
    ...negotiatedLanguage !== null ? {
      negotiatedLanguage
    } : {}
  };
}
function routeAdmissionReport(input) {
  let projection = routeAdmissionJudgments(input), settled = settleRequestTrace(input.trace, projection.judgments);
  return Object.freeze({
    trace: input.trace,
    settled,
    judgments: projection.judgments,
    denial: projection.denial,
    allow: projection.allow,
    ...projection.negotiatedType !== void 0 ? {
      negotiatedType: projection.negotiatedType
    } : {},
    ...projection.negotiatedLanguage !== void 0 ? {
      negotiatedLanguage: projection.negotiatedLanguage
    } : {}
  });
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/web-application-dispatch.mjs
function matchResource(resource, path, context) {
  let match = resource.match;
  if (typeof match == "function") {
    let result = match(path, context);
    return result ? typeof result == "object" ? result : {} : !1;
  }
  if (match instanceof RegExp) {
    let result = new RegExp(match.source, match.flags.replace(/[gy]/g, "")).exec(path);
    return result ? {
      ...result.groups
    } : !1;
  }
  if (!match.includes(":")) return match === path ? {} : !1;
  let parts = match.split("/"), actual = path.split("/");
  if (parts.length !== actual.length) return !1;
  let params = {};
  for (let index2 = 0; index2 < parts.length; index2++) {
    let part = parts[index2], value = actual[index2];
    if (part.startsWith(":")) params[part.slice(1)] = decodeURIComponent(value);
    else if (part !== value) return !1;
  }
  return params;
}
async function dispatchApplication(application, context, request, effects) {
  async function stages(stages2) {
    for (let stage of stages2) {
      let result = await stage(context);
      if (Array.isArray(result))
        context.trace = appendEntries(context.trace, result);
      else if (result === !0 || await effects.accept(result, context)) return !0;
    }
    return !1;
  }
  if (application.onRequest && await stages([
    application.onRequest
  ]) || await effects.preflight?.(context) || await stages(application.middlewares ?? [])) return;
  let method = claimOf(context.trace, "method") ?? request.method, selected = null, firstMatch = null, matchingMethods = /* @__PURE__ */ new Set(), unrestricted = !1;
  try {
    decodeURI(context.url.pathname);
    for (let resource of application.resources ?? []) {
      let params = matchResource(resource, context.url.pathname, context);
      if (params !== !1) {
        if (firstMatch ??= {
          resource,
          params
        }, resource.methods) for (let allowed of resource.methods) matchingMethods.add(allowed);
        else unrestricted = !0;
        if (!selected && routeMethodAllowed(resource, method) && (selected = {
          resource,
          params
        }), selected && method.toUpperCase() !== "OPTIONS") break;
      }
    }
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    await effects.refuse({
      status: 400,
      title: "Bad Request"
    }, context);
    return;
  }
  selected ??= firstMatch;
  let found = selected?.resource ?? null, allow = firstMatch && !unrestricted ? routeAllowHeader({
    methods: [
      ...matchingMethods
    ]
  }) : null;
  if (selected) {
    let resource = selected.resource, route = resource.route ?? (typeof resource.match == "string" ? resource.match : resource.match instanceof RegExp ? resource.match.toString() : "function");
    context.params = Object.freeze(selected.params), context.route = context.routeTemplate = context.matchedRoute = route, resource.id !== void 0 && (context.routeId = resource.id), resource.name !== void 0 && (context.routeName = resource.name), effects.matched?.(resource, context);
  }
  if (found && method.toUpperCase() === "OPTIONS" && found.methods) {
    await effects.refuse({
      status: 204,
      title: "",
      ...allow ? {
        headers: {
          Allow: allow
        }
      } : {}
    }, context);
    return;
  }
  let admission = routeAdmissionReport({
    trace: context.trace,
    resource: found,
    method,
    ...request.accept !== void 0 ? {
      accept: request.accept
    } : {},
    ...request.acceptLanguage !== void 0 ? {
      acceptLanguage: request.acceptLanguage
    } : {}
  });
  admission.negotiatedType !== void 0 && (context.negotiatedType = admission.negotiatedType), admission.negotiatedLanguage !== void 0 && (context.negotiatedLanguage = admission.negotiatedLanguage), effects.admitted?.(context);
  let settled = admission.settled;
  if (settled.value !== "potential") {
    let status = settled.value === "absurd" ? 404 : settled.value === "stable" ? 500 : admission.denial === "method" ? 405 : admission.denial === "accept" || admission.denial === "accept-language" ? 406 : 403, title = {
      404: "Not Found",
      500: "Contradicted Request Evidence",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      403: "Forbidden"
    }[status];
    await effects.refuse({
      status,
      title,
      ...allow && status === 405 ? {
        headers: {
          Allow: allow
        }
      } : {},
      ...status === 500 ? {
        evidence: settled.section.contradicted
      } : {}
    }, context);
    return;
  }
  context.trace = settled.trace, !await stages(found.middlewares ?? []) && await effects.accept(await found.handler(context), context);
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/cache-control.mjs
init_header_value();
function seconds(name, value) {
  if (value === void 0) return null;
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative integer`);
  return String(value);
}
function cacheControl(policy) {
  if (typeof policy == "string") return policy;
  let directives = [];
  policy.noStore && directives.push("no-store"), policy.noCache && directives.push("no-cache"), policy.visibility && directives.push(policy.visibility);
  let maxAge = seconds("maxAge", policy.maxAge);
  maxAge !== null && directives.push(`max-age=${maxAge}`);
  let sMaxage = seconds("sMaxage", policy.sMaxage);
  sMaxage !== null && directives.push(`s-maxage=${sMaxage}`), policy.mustRevalidate && directives.push("must-revalidate"), policy.proxyRevalidate && directives.push("proxy-revalidate"), policy.immutable && directives.push("immutable");
  let staleWhileRevalidate = seconds("staleWhileRevalidate", policy.staleWhileRevalidate);
  staleWhileRevalidate !== null && directives.push(`stale-while-revalidate=${staleWhileRevalidate}`);
  let staleIfError = seconds("staleIfError", policy.staleIfError);
  return staleIfError !== null && directives.push(`stale-if-error=${staleIfError}`), directives.join(", ");
}

// node_modules/.pnpm/@red-cup-engineering+computer-serialized-content-engineering-services-section@0.1.0/node_modules/@red-cup-engineering/computer-serialized-content-engineering-services-section/services/http-data-services-section/src/date.mjs
var imf = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT$/u, rfc850 = /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{2}):(\d{2}):(\d{2}) GMT$/u, asctime = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}| \d) (\d{2}):(\d{2}):(\d{2}) (\d{4})$/u, insensitive = (pattern) => new RegExp(pattern.source, "iu"), imfInsensitive = insensitive(imf), rfc850Insensitive = insensitive(rfc850), asctimeInsensitive = insensitive(asctime);

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/response-policy.mjs
function wildcardPattern(pattern) {
  if (!pattern.includes("*")) return null;
  let escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}
function originPatternAllowed(origin, pattern) {
  if (pattern instanceof RegExp) return pattern.test(origin);
  if (pattern === "*") return !0;
  let wildcard = wildcardPattern(pattern);
  return wildcard ? wildcard.test(origin) : pattern === origin;
}
function corsOriginAllowed(req, opts) {
  let origin = String(req.headers.origin ?? "");
  if (!origin) return !1;
  let { origins } = opts;
  return origins ? typeof origins == "function" ? origins(origin, {
    req
  }) : origins.some((pattern) => originPatternAllowed(origin, pattern)) : !0;
}
function corsAllowedOrigin(req, opts) {
  let origin = String(req.headers.origin ?? "");
  if (!origin || !corsOriginAllowed(req, opts)) return null;
  let origins = opts.origins;
  return Array.isArray(origins) && origins.includes("*") && !opts.credentials ? "*" : origin;
}
function headerTokens(value) {
  return (Array.isArray(value) ? value.join(",") : value ?? "").split(",").map((part) => part.trim()).filter(Boolean);
}
function requestedMethodAllowed(req, opts) {
  let method = String(req.headers["access-control-request-method"] ?? "").trim().toUpperCase();
  return !method || !opts.methods?.length ? !0 : opts.methods.map((item) => item.toUpperCase()).includes(method);
}
function requestedHeadersAllowed(req, opts) {
  if (!opts.headers?.length) return !0;
  let allowed = new Set(opts.headers.map((item) => item.toLowerCase()));
  return headerTokens(req.headers["access-control-request-headers"]).every((item) => allowed.has(item.toLowerCase()));
}
function privateNetworkAllowed(req, opts) {
  return String(req.headers["access-control-request-private-network"] ?? "").toLowerCase() !== "true" || opts.allowPrivateNetwork === !0;
}
function corsPreflightDecision(req, opts) {
  let denyStatus = opts.preflightDenyStatus ?? 403;
  return corsOriginAllowed(req, opts) ? requestedMethodAllowed(req, opts) ? requestedHeadersAllowed(req, opts) ? privateNetworkAllowed(req, opts) ? {
    ok: !0,
    status: 204
  } : {
    ok: !1,
    status: denyStatus,
    reason: "private-network"
  } : {
    ok: !1,
    status: denyStatus,
    reason: "headers"
  } : {
    ok: !1,
    status: 405,
    reason: "method"
  } : {
    ok: !1,
    status: denyStatus,
    reason: "origin"
  };
}
function applyCors(res, req, opts) {
  let origin = corsAllowedOrigin(req, opts);
  origin && (res.setHeader("Access-Control-Allow-Origin", origin), opts.credentials && res.setHeader("Access-Control-Allow-Credentials", "true"), opts.expose?.length && res.setHeader("Access-Control-Expose-Headers", opts.expose.join(", ")), appendVary(res, "Origin"));
}
function corsPreflight(req, res, opts, status = 204) {
  if (appendVary(res, "Access-Control-Request-Method"), appendVary(res, "Access-Control-Request-Headers"), appendVary(res, "Access-Control-Request-Private-Network"), opts.strictPreflight) {
    let decision = corsPreflightDecision(req, opts);
    if (!decision.ok) {
      res.writeHead(decision.status, {
        "content-type": "text/plain; charset=utf-8"
      }).end(decision.reason ? `CORS preflight denied: ${decision.reason}` : "CORS preflight denied");
      return;
    }
  }
  applyCors(res, req, opts);
  let reqMethod = req.headers["access-control-request-method"], reqHeaders = req.headers["access-control-request-headers"];
  reqMethod && res.setHeader("Access-Control-Allow-Methods", opts.methods?.join(", ") ?? reqMethod), reqHeaders && res.setHeader("Access-Control-Allow-Headers", opts.headers?.join(", ") ?? reqHeaders), opts.allowPrivateNetwork && String(req.headers["access-control-request-private-network"] ?? "").toLowerCase() === "true" && res.setHeader("Access-Control-Allow-Private-Network", "true"), opts.maxAge && res.setHeader("Access-Control-Max-Age", String(opts.maxAge)), res.writeHead(status).end();
}
function appendVary(res, field) {
  let existing = res.getHeader("Vary"), cur = existing ? String(existing) : "", fields = cur ? cur.split(",").map((s) => s.trim()) : [];
  fields.some((existingField) => existingField.toLowerCase() === field.toLowerCase()) || res.setHeader("Vary", [
    ...fields,
    field
  ].join(", "));
}
function seconds2(name, value) {
  if (value === void 0) return null;
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative integer`);
  return String(value);
}
function applyCacheControl(res, policy) {
  if (!policy || res.hasHeader("Cache-Control")) return;
  let value = cacheControl(policy);
  value && res.setHeader("Cache-Control", value);
}
var DEFAULT_SECURITY_HEADERS = {
  contentSecurityPolicy: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
  contentSecurityPolicyReportOnly: !1,
  strictTransportSecurity: {
    maxAge: 31536e3,
    includeSubDomains: !0
  },
  contentTypeOptions: "nosniff",
  referrerPolicy: "no-referrer",
  frameOptions: "DENY",
  permissionsPolicy: "geolocation=(), microphone=(), camera=()",
  reportingEndpoints: !1,
  crossOriginOpenerPolicy: "same-origin",
  crossOriginResourcePolicy: "same-origin",
  crossOriginEmbedderPolicy: !1,
  originAgentCluster: "?1",
  dnsPrefetchControl: "off",
  downloadOptions: "noopen",
  permittedCrossDomainPolicies: "none"
};
function hsts(value) {
  let hstsValue = value === void 0 ? DEFAULT_SECURITY_HEADERS.strictTransportSecurity : value;
  if (typeof hstsValue == "string" || hstsValue === !1) return hstsValue;
  let parts = [
    `max-age=${seconds2("strictTransportSecurity.maxAge", hstsValue.maxAge ?? 31536e3)}`
  ];
  return hstsValue.includeSubDomains && parts.push("includeSubDomains"), hstsValue.preload && parts.push("preload"), parts.join("; ");
}
function securityValue(headers, key) {
  return headers[key] === void 0 ? DEFAULT_SECURITY_HEADERS[key] : headers[key];
}
function setHeaderUnlessDisabled(res, name, value) {
  value === !1 || value === void 0 || res.hasHeader(name) || res.setHeader(name, value);
}
function reportingEndpoints(value) {
  return value === !1 || value === void 0 || typeof value == "string" ? value : Object.entries(value).map(([name, url]) => `${name}="${String(url).replace(/"/g, '\\"')}"`).join(", ");
}
function applySecurityHeaders(res, policy, nonce2) {
  if (!policy) return;
  let headers = policy === !0 ? DEFAULT_SECURITY_HEADERS : policy, csp = policy === !0 && nonce2 ? `default-src 'self'; script-src 'self' 'nonce-${nonce2}'; style-src 'nonce-${nonce2}'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'` : securityValue(headers, "contentSecurityPolicy");
  setHeaderUnlessDisabled(res, "Content-Security-Policy", csp), setHeaderUnlessDisabled(res, "Content-Security-Policy-Report-Only", securityValue(headers, "contentSecurityPolicyReportOnly")), setHeaderUnlessDisabled(res, "Strict-Transport-Security", hsts(headers.strictTransportSecurity)), setHeaderUnlessDisabled(res, "X-Content-Type-Options", securityValue(headers, "contentTypeOptions")), setHeaderUnlessDisabled(res, "Referrer-Policy", securityValue(headers, "referrerPolicy")), setHeaderUnlessDisabled(res, "X-Frame-Options", securityValue(headers, "frameOptions")), setHeaderUnlessDisabled(res, "Permissions-Policy", securityValue(headers, "permissionsPolicy")), setHeaderUnlessDisabled(res, "Reporting-Endpoints", reportingEndpoints(securityValue(headers, "reportingEndpoints"))), setHeaderUnlessDisabled(res, "Cross-Origin-Opener-Policy", securityValue(headers, "crossOriginOpenerPolicy")), setHeaderUnlessDisabled(res, "Cross-Origin-Resource-Policy", securityValue(headers, "crossOriginResourcePolicy")), setHeaderUnlessDisabled(res, "Cross-Origin-Embedder-Policy", securityValue(headers, "crossOriginEmbedderPolicy")), setHeaderUnlessDisabled(res, "Origin-Agent-Cluster", securityValue(headers, "originAgentCluster")), setHeaderUnlessDisabled(res, "X-DNS-Prefetch-Control", securityValue(headers, "dnsPrefetchControl")), setHeaderUnlessDisabled(res, "X-Download-Options", securityValue(headers, "downloadOptions")), setHeaderUnlessDisabled(res, "X-Permitted-Cross-Domain-Policies", securityValue(headers, "permittedCrossDomainPolicies"));
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/web-application.mjs
function headerSink(headers, terminate) {
  return {
    hasHeader: (name) => headers.has(name),
    getHeader: (name) => headers.get(name),
    setHeader(name, value) {
      headers.delete(name);
      for (let item of Array.isArray(value) ? value : [
        value
      ]) headers.append(name, String(item));
    },
    writeHead(status, values) {
      for (let [name, value] of Object.entries(values ?? {})) headers.set(name, value);
      return {
        end: (body) => terminate(status, body)
      };
    }
  };
}
function nonce() {
  let bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function bodyForbidden(status) {
  return status === 204 || status === 205 || status === 304 || status < 200;
}
function abortableBody(body, signal, complete) {
  if (!body) return null;
  let reader = body.getReader(), terminal = !1, abort, cleanup = () => {
    terminal = !0, signal.removeEventListener("abort", abort);
  };
  return new ReadableStream({
    start(controller) {
      abort = () => {
        terminal || (cleanup(), (async () => {
          let reason = signal.reason ?? new DOMException("Aborted", "AbortError");
          try {
            await reader.cancel(reason);
          } catch {
          } finally {
            reader.releaseLock();
            try {
              complete();
            } finally {
              controller.error(reason);
            }
          }
        })().catch(() => {
        }));
      }, signal.aborted ? abort() : signal.addEventListener("abort", abort, {
        once: !0
      });
    },
    async pull(controller) {
      if (!terminal)
        try {
          let next = await reader.read();
          if (terminal) return;
          if (next.done) {
            cleanup(), reader.releaseLock();
            try {
              complete(), controller.close();
            } catch (error) {
              controller.error(error);
            }
          } else controller.enqueue(next.value);
        } catch (error) {
          if (!terminal) {
            cleanup(), reader.releaseLock();
            try {
              complete();
            } finally {
              controller.error(error);
            }
          }
        }
    },
    async cancel(reason) {
      cleanup();
      try {
        await reader.cancel(reason);
      } finally {
        reader.releaseLock(), complete();
      }
    }
  }, {
    highWaterMark: 0
  });
}
function createFetchHandler(application) {
  return async (request, execution = {}) => {
    request.signal.throwIfAborted();
    let startedAt = (execution.now ?? Date.now)(), requestNonce = (execution.nonce ?? nonce)(), id = requestNonce, entries = [
      {
        e: id,
        a: "method",
        v: request.method,
        t: startedAt
      },
      {
        e: id,
        a: "url",
        v: request.url,
        t: startedAt
      },
      ...Array.from(request.headers, ([name, value]) => ({
        e: id,
        a: `header.${name}`,
        v: value,
        t: startedAt
      })),
      ...execution.remoteAddress !== void 0 ? [
        {
          e: id,
          a: "remote-addr",
          v: execution.remoteAddress,
          t: startedAt
        }
      ] : [],
      ...execution.httpVersion !== void 0 ? [
        {
          e: id,
          a: "http-version",
          v: execution.httpVersion,
          t: startedAt
        }
      ] : []
    ], context = {
      request,
      url: new URL(request.url),
      params: Object.freeze({}),
      locals: {
        ...application.locals
      },
      capabilities: execution.capabilities ?? Object.freeze({}),
      ...execution.remoteAddress !== void 0 ? {
        remoteAddress: execution.remoteAddress
      } : {},
      ...execution.httpVersion !== void 0 ? {
        httpVersion: execution.httpVersion
      } : {},
      nonce: requestNonce,
      signal: request.signal,
      startedAt,
      trace: Object.freeze({
        kind: "web-server.request-trace",
        id,
        entries: Object.freeze(entries)
      }),
      responseHeaders: new Headers({
        date: new Date(startedAt).toUTCString()
      })
    }, completed = !1, complete = () => {
      completed || (completed = !0, application.onComplete?.(context));
    }, response, sink = headerSink(context.responseHeaders, (status, body) => {
      response = new Response(bodyForbidden(status) ? null : body, {
        status
      });
    });
    try {
      if (applyCacheControl(sink, application.cacheControl), applySecurityHeaders(sink, application.security, context.nonce), await dispatchApplication(application, context, {
        method: request.method,
        ...request.headers.has("accept") ? {
          accept: request.headers.get("accept")
        } : {},
        ...request.headers.has("accept-language") ? {
          acceptLanguage: request.headers.get("accept-language")
        } : {}
      }, {
        async accept(value) {
          if (value == null || value === !1) return !1;
          if (!(value instanceof Response)) throw new TypeError("portable HTTP handlers must return a Response");
          return response = value, !0;
        },
        async preflight() {
          let cors = application.cors;
          if (!cors) return !1;
          let origins = cors.origins, options = {
            ...cors,
            ...typeof origins == "function" ? {
              origins: (origin) => origins(origin, request)
            } : {}
          }, source = {
            headers: Object.fromEntries(request.headers)
          };
          return request.method === "OPTIONS" ? (corsPreflight(source, sink, options), !0) : (applyCors(sink, source, options), !1);
        },
        matched(resource) {
          let vary = [
            context.responseHeaders.get("vary"),
            ...resource.produces?.length ? [
              "Accept"
            ] : [],
            ...resource.languages?.length ? [
              "Accept-Language"
            ] : []
          ].filter(Boolean);
          vary.length && context.responseHeaders.set("vary", vary.join(", "));
        },
        async refuse({ status, title, headers: headers2, evidence: evidence2 }) {
          response = application.problems && status >= 400 ? Response.json({
            type: "about:blank",
            title,
            status,
            instance: context.url.pathname,
            ...evidence2 !== void 0 ? {
              evidence: evidence2
            } : {}
          }, {
            status,
            headers: {
              ...headers2,
              "content-type": "application/problem+json"
            }
          }) : new Response(bodyForbidden(status) ? null : title, {
            status,
            ...headers2 ? {
              headers: headers2
            } : {}
          });
        }
      }), !response) throw new TypeError("HTTP handler completed without a Response");
    } catch (error) {
      if (request.signal.aborted)
        throw complete(), request.signal.reason ?? error;
      try {
        response = await application.onError?.(error, context) || void 0;
      } catch {
        response = void 0;
      }
      response ??= application.problems ? Response.json({
        type: "about:blank",
        title: "Internal Server Error",
        status: 500
      }, {
        status: 500,
        headers: {
          "content-type": "application/problem+json"
        }
      }) : new Response("Internal Server Error", {
        status: 500
      });
    }
    let headers = new Headers(context.responseHeaders);
    for (let [name, value] of response.headers) name !== "set-cookie" && headers.set(name, value);
    for (let cookie of response.headers.getSetCookie()) headers.append("set-cookie", cookie);
    context.negotiatedLanguage && headers.set("content-language", context.negotiatedLanguage);
    let suppress = request.method === "HEAD" || bodyForbidden(response.status), finalResponse;
    try {
      return suppress && response.body && await response.body.cancel(), finalResponse = new Response(suppress ? null : abortableBody(response.body, request.signal, complete), {
        status: response.status,
        statusText: response.statusText,
        headers
      }), await application.onResponse?.(finalResponse, context), finalResponse.body || complete(), finalResponse;
    } catch (error) {
      try {
        await (finalResponse?.body ?? response.body)?.cancel(error);
      } finally {
        complete();
      }
      throw error;
    }
  };
}
function createWebServer(specification = {}) {
  if (specification.platform !== void 0) throw new TypeError("Use createWebPlatform to compose provider lifetime with a web server");
  return Object.freeze({ specification, fetch: createFetchHandler(specification) });
}

// node_modules/.pnpm/@red-cup-engineering+http-services-section@0.6.2/node_modules/@red-cup-engineering/http-services-section/src/create-application.mjs
function intakeFor(context, options = {}) {
  let encoded, maximum = options.maxEncodedBytes ?? options.maxBytes, intake = {
    read: !1,
    inputs: /* @__PURE__ */ new Map(),
    encoded: () => (intake.read = !0, encoded ??= readBody(context.request, {
      decodeContentEncoding: !1,
      ...maximum !== void 0 ? { maxBytes: maximum, maxEncodedBytes: maximum } : {}
    }))
  };
  return intake;
}
function inputFor(context, intake, options = {}) {
  let key = JSON.stringify([options.maxBytes ?? null, options.maxEncodedBytes ?? null, options.contentType ?? null, options.contentEncoding ?? null, options.decodeContentEncoding ?? !0]), existing = intake.inputs.get(key);
  if (existing) return existing;
  let bytes, requestFor = (body, decoded = !1) => {
    let headers = new Headers(context.request.headers);
    return headers.delete("content-length"), decoded && headers.delete("content-encoding"), new Request(context.request.url, { method: "POST", headers, body, signal: context.signal });
  }, collect = () => bytes ??= intake.encoded().then((encoded) => readBody(requestFor(encoded), options)), projections = /* @__PURE__ */ new Map();
  async function project(name, read) {
    let value = projections.get(name);
    return value || (value = collect().then((body) => read(requestFor(body, !0), { ...options, contentEncoding: "identity", decodeContentEncoding: !1, maxEncodedBytes: options.maxBytes ?? DEFAULT_BODY_LIMIT })), projections.set(name, value)), value;
  }
  let input = Object.freeze({
    bytes: async () => (await collect()).slice(),
    text: () => project("text", readTextBody),
    json: () => project("json", readJsonBody),
    formData: () => project("formData", readFormDataBody)
  });
  return intake.inputs.set(key, input), input;
}
function compose(spec) {
  let parts = (spec.applications ?? []).map(compose);
  if (!parts.length) return spec;
  let inherited = {};
  for (let key of ["cors", "cacheControl", "security", "problems", "onError", "body"]) {
    if (spec[key] !== void 0) continue;
    let values = parts.map((part) => part[key]).filter((value) => value !== void 0);
    if (values.some((value) => value !== values[0])) throw new TypeError(`application composition requires an explicit ${key} policy`);
    values.length && (inherited[key] = values[0]);
  }
  let requests = [spec.onRequest, ...parts.map((part) => part.onRequest)].filter((hook) => !!hook), completions = [...parts.map((part) => part.onComplete), spec.onComplete].filter(Boolean), responses = [...parts.map((part) => part.onResponse), spec.onResponse].filter(Boolean), { applications: _applications, ...own } = spec;
  return {
    ...inherited,
    ...own,
    resources: [...parts.flatMap((part) => part.resources ?? []), ...spec.resources ?? []],
    middlewares: [...spec.middlewares ?? [], ...parts.flatMap((part) => part.middlewares ?? [])],
    locals: Object.assign({}, ...parts.map((part) => part.locals), spec.locals),
    onRequest: async (ctx) => {
      for (let hook of requests) {
        let value = await hook(ctx);
        if (value instanceof Response) return value;
        Array.isArray(value) && (ctx.trace = appendEntries(ctx.trace, value));
      }
    },
    onComplete: (ctx) => {
      let failures = [];
      for (let hook of completions)
        try {
          hook(ctx);
        } catch (error) {
          failures.push(error);
        }
      if (failures.length) throw new AggregateError(failures, "application completion failed");
    },
    onResponse: async (response, ctx) => {
      for (let hook of responses) await hook(response, ctx);
    }
  };
}
function composeWebApplicationSpec(specification, { validate } = {}) {
  if (specification.platform !== void 0) throw new TypeError("This composition has no provider lifetime; compose platform lifetime at a layer that provides one");
  let spec = compose(specification), intakes = /* @__PURE__ */ new WeakMap(), bind = (context, options, replace = !1) => {
    let intake = intakes.get(context);
    return intake || (intake = intakeFor(context, spec.body), intakes.set(context, intake)), (replace || !("input" in context)) && Object.assign(context, { input: inputFor(context, intake, options) }), context;
  }, stage = (middleware) => (ctx) => middleware(bind(ctx, spec.body)), resources = (spec.resources ?? []).map((resource) => ({
    ...resource,
    middlewares: [
      async (ctx) => {
        let bound = bind(ctx, { ...spec.body, ...resource.validation?.maxBytes !== void 0 ? { maxBytes: resource.validation.maxBytes } : {}, ...resource.body }, !0);
        intakes.get(ctx)?.read && await bound.input.bytes();
      },
      ...resource.validation && validate ? [stage(validate(resource.validation))] : [],
      ...(resource.middlewares ?? []).map(stage)
    ],
    handler: (ctx) => resource.handler(bind(ctx, spec.body))
  })), { onRequest: _request, onResponse: _response, onError: _error, onComplete: _complete, ...base } = spec;
  return { server: {
    ...base,
    resources,
    middlewares: (spec.middlewares ?? []).map(stage),
    ...spec.onRequest ? { onRequest: stage(spec.onRequest) } : {},
    ...spec.onResponse ? { onResponse: (response, ctx) => spec.onResponse(response, bind(ctx, spec.body)) } : {},
    ...spec.onComplete ? { onComplete: (ctx) => spec.onComplete(bind(ctx, spec.body)) } : {},
    onError: async (error, ctx) => {
      let response = await spec.onError?.(error, bind(ctx, spec.body));
      if (response) return response;
      if (error instanceof BodyReadError) return Response.json({ type: "about:blank", status: error.status, title: error.message, code: error.code }, { status: error.status, headers: { "content-type": "application/problem+json" } });
    }
  }, spec };
}
function createWebApplication(specification, options) {
  let { server } = composeWebApplicationSpec(specification, options);
  return Object.freeze({ ...createWebServer(server) });
}

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-application.mjs
init_tufte_browser();

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-rendering.mjs
init_tufte_browser();

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-topology.mjs
init_tufte_browser();
var record3 = (value) => value && typeof value == "object" && !Array.isArray(value) ? value : {};
var TUFTE_WORKSPACE_MIN_SHARE = 0.05, EPS = 1e-6, round6 = (value) => Math.round(value * 1e6) / 1e6;
function normalizeSizes(sizes, count) {
  let raw = Array.isArray(sizes) ? sizes : [], values = [];
  for (let index2 = 0; index2 < count; index2 += 1) {
    let candidate = Number(raw[index2]);
    values.push(Number.isFinite(candidate) && candidate > 0 ? candidate : NaN);
  }
  values.some(Number.isNaN) && (values = values.map(() => 1));
  let total = values.reduce((sum, value) => sum + value, 0);
  values = values.map((value) => value / total);
  let floor = Math.min(TUFTE_WORKSPACE_MIN_SHARE, 1 / count), clamped = values.map((value) => Math.max(floor, value));
  return total = clamped.reduce((sum, value) => sum + value, 0), clamped.map((value) => round6(value / total));
}
function normalizeNode(candidate, known, placed) {
  let node = typeof candidate == "string" ? { tile: candidate } : record3(candidate);
  if (typeof node.tile == "string")
    return !known.has(node.tile) || placed.has(node.tile) ? null : (placed.add(node.tile), { kind: "pane", tile: node.tile });
  let direction = (node.direction ?? node.split) === "column" ? "column" : "row", rawChildren = Array.isArray(node.children) ? node.children : [], rawSizes = Array.isArray(node.sizes) ? node.sizes : [], children = [], sizes = [];
  for (let [index2, childCandidate] of rawChildren.entries()) {
    let child = normalizeNode(childCandidate, known, placed);
    child !== null && (children.push(child), sizes.push(rawSizes[index2]));
  }
  return children.length === 0 ? null : children.length === 1 ? children[0] : { kind: "split", direction, children, sizes: normalizeSizes(sizes, children.length) };
}
function freezeNode(node) {
  return node.kind === "pane" ? Object.freeze({ ...node }) : Object.freeze({
    kind: "split",
    direction: node.direction,
    children: Object.freeze(node.children.map(freezeNode)),
    sizes: Object.freeze([...node.sizes])
  });
}
function adoptPanes(root, panes) {
  if (!panes.length) return root;
  if (root === null)
    return panes.length === 1 ? panes[0] : { kind: "split", direction: "column", children: panes, sizes: normalizeSizes([], panes.length) };
  let children = root.kind === "split" && root.direction === "column" ? [...root.children, ...panes] : [root, ...panes], priorSizes = root.kind === "split" && root.direction === "column" ? [...root.sizes] : [1], share = 1 / children.length, priorTotal = 1 - share * panes.length, sizes = [...priorSizes.map((size) => size * priorTotal), ...panes.map(() => share)];
  return { kind: "split", direction: "column", children, sizes: normalizeSizes(sizes, children.length) };
}
function normalizeTufteWorkspace(workspace = {}, model = {}) {
  let projection = normalizeTufteModel(model), known = new Set(projection.tiles.map((tile) => tile.id)), placed = /* @__PURE__ */ new Set(), input = record3(workspace), root = normalizeNode(input.root ?? input, known, placed), unplaced = projection.tiles.map((tile) => tile.id).filter((id) => !placed.has(id));
  unplaced.length && (root = adoptPanes(root, unplaced.map((tile) => ({ kind: "pane", tile }))));
  let fullscreen = typeof input.fullscreen == "string" && root !== null && known.has(input.fullscreen) ? input.fullscreen : null;
  return Object.freeze({
    kind: "tufte.workspace",
    root: root === null ? null : freezeNode(root),
    ...fullscreen ? { fullscreen } : {}
  });
}
function walkGeometry(node, rect, path, panes, splitters) {
  if (node.kind === "pane") {
    panes.push({ tile: node.tile, path, rect });
    return;
  }
  let horizontal = node.direction === "row", offset = 0;
  for (let [index2, child] of node.children.entries()) {
    let size = node.sizes[index2], childRect = horizontal ? { x: round6(rect.x + offset * rect.width), y: rect.y, width: round6(size * rect.width), height: rect.height } : { x: rect.x, y: round6(rect.y + offset * rect.height), width: rect.width, height: round6(size * rect.height) };
    if (walkGeometry(child, childRect, [...path, index2], panes, splitters), offset += size, index2 < node.children.length - 1) {
      let before = round6(offset - size);
      splitters.push({
        id: `${path.length ? path.join(".") : "root"}:${index2}`,
        path,
        index: index2,
        axis: node.direction,
        boundary: round6(offset),
        min: round6(before + TUFTE_WORKSPACE_MIN_SHARE),
        max: round6(offset + node.sizes[index2 + 1] - TUFTE_WORKSPACE_MIN_SHARE),
        parentRect: rect,
        rect: horizontal ? { x: round6(rect.x + offset * rect.width), y: rect.y, width: 0, height: rect.height } : { x: rect.x, y: round6(rect.y + offset * rect.height), width: rect.width, height: 0 }
      });
    }
  }
}
function trackIndex(cuts, value) {
  for (let [index2, cut] of cuts.entries()) if (Math.abs(cut - value) < EPS) return index2;
  return -1;
}
function computeTufteWorkspaceGeometry(workspace = {}, model = {}) {
  let normalized = normalizeTufteWorkspace(workspace, model), panes = [], splitters = [], hidden = [];
  if (normalized.root && walkGeometry(normalized.root, { x: 0, y: 0, width: 1, height: 1 }, [], panes, splitters), normalized.fullscreen) {
    let kept = panes.find((pane) => pane.tile === normalized.fullscreen);
    for (let pane of panes) pane !== kept && hidden.push(pane.tile);
    panes.length = 0, splitters.length = 0, panes.push({ tile: kept.tile, path: kept.path, rect: { x: 0, y: 0, width: 1, height: 1 } });
  }
  let xCuts = [0, 1], yCuts = [0, 1];
  for (let pane of panes) {
    for (let cut of [pane.rect.x, round6(pane.rect.x + pane.rect.width)])
      trackIndex(xCuts, cut) === -1 && xCuts.push(cut);
    for (let cut of [pane.rect.y, round6(pane.rect.y + pane.rect.height)])
      trackIndex(yCuts, cut) === -1 && yCuts.push(cut);
  }
  xCuts.sort((a, b) => a - b), yCuts.sort((a, b) => a - b);
  let columns = xCuts.slice(1).map((cut, index2) => round6(cut - xCuts[index2])), rows = yCuts.slice(1).map((cut, index2) => round6(cut - yCuts[index2])), placedPanes = panes.map((pane) => Object.freeze({
    tile: pane.tile,
    path: Object.freeze([...pane.path]),
    rect: Object.freeze({ ...pane.rect }),
    area: Object.freeze({
      column: Object.freeze([trackIndex(xCuts, pane.rect.x) + 1, trackIndex(xCuts, round6(pane.rect.x + pane.rect.width)) + 1]),
      row: Object.freeze([trackIndex(yCuts, pane.rect.y) + 1, trackIndex(yCuts, round6(pane.rect.y + pane.rect.height)) + 1])
    })
  }));
  return Object.freeze({
    kind: "tufte.workspace.geometry",
    workspace: normalized,
    ...normalized.fullscreen ? { fullscreen: normalized.fullscreen } : {},
    columns: Object.freeze(columns),
    rows: Object.freeze(rows),
    panes: Object.freeze(placedPanes),
    hidden: Object.freeze(hidden),
    splitters: Object.freeze(splitters.map((splitter) => Object.freeze({
      ...splitter,
      path: Object.freeze([...splitter.path]),
      parentRect: Object.freeze({ ...splitter.parentRect }),
      rect: Object.freeze({ ...splitter.rect })
    })))
  });
}

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-theme.mjs
var EARLY_MAC_THEME_STYLES = String.raw`
body[data-tufte-theme=early-mac]{color-scheme:light;min-height:100vh;min-height:100dvh;--tufte-bg:#c8c8c4;--tufte-surface:#f5f3ed;--tufte-ink:#151515;--tufte-muted:#4b4b47;--tufte-line:#151515;--tufte-accent:#151515;--tufte-warn:#565647;--tufte-danger:#49211c;--tufte-radius:0;--tufte-gap:.75rem;background-color:var(--tufte-bg);background-image:repeating-conic-gradient(#c8c8c4 0 25%,#b8b8b5 0 50%);background-size:4px 4px;font-family:Chicago,Charcoal,Geneva,"Lucida Grande","Noto Sans","Arial Unicode MS",sans-serif;font-size:17px;line-height:1.5;letter-spacing:.01em}
body[data-tufte-theme=early-mac] .tufte-shell{width:min(1080px,100%);padding:clamp(.7rem,2.5vw,1.5rem);}
body[data-tufte-theme=early-mac] .tufte-masthead{display:block;margin-bottom:.75rem;padding:.55rem .75rem .65rem;border:1px solid var(--tufte-line);background-color:#c8c8c4;background-image:repeating-linear-gradient(0deg,#151515 0 1px,transparent 1px 4px);box-shadow:2px 2px 0 rgba(21,21,21,.7)}
body[data-tufte-theme=early-mac] .tufte-masthead>div{padding:.35rem .5rem;background:var(--tufte-surface);border:1px solid var(--tufte-line)}
body[data-tufte-theme=early-mac] .tufte-masthead h1{margin:.1rem auto;padding:.2rem .75rem;width:fit-content;max-width:100%;background:var(--tufte-surface);font-family:Chicago,Charcoal,Geneva,"Lucida Grande","Noto Sans","Arial Unicode MS",sans-serif;font-size:clamp(1.35rem,3vw,2rem);font-weight:700;letter-spacing:.015em;text-align:center}
body[data-tufte-theme=early-mac] .tufte-subtitle{max-width:62ch;font-size:1rem;color:var(--tufte-muted)}
body[data-tufte-theme=early-mac] .tufte-eyebrow,body[data-tufte-theme=early-mac] .tufte-tile h2{color:var(--tufte-ink);font-family:Chicago,Charcoal,Geneva,"Lucida Grande","Noto Sans","Arial Unicode MS",sans-serif;font-weight:700;letter-spacing:.08em}
body[data-tufte-theme=early-mac] .tufte-grid{gap:.75rem}
body[data-tufte-theme=early-mac] .tufte-tile{padding:.75rem 1rem;border:1px solid var(--tufte-line);border-radius:0;background:var(--tufte-surface);box-shadow:2px 2px 0 rgba(23,20,12,.55)}
body[data-tufte-theme=early-mac] .tufte-tile header{padding:.25rem .35rem .4rem;margin:0 0 .65rem;border:1px solid var(--tufte-line);background:#deded9;background-image:repeating-linear-gradient(0deg,rgba(21,21,21,.5) 0 1px,transparent 1px 4px)}
body[data-tufte-theme=early-mac] .tufte-tile h2{display:table;margin:.05rem auto;padding:.08rem .45rem;max-width:100%;background:var(--tufte-surface);font-size:.8rem;line-height:1.35;text-align:center}
body[data-tufte-theme=early-mac] .tufte-tile-body{font-size:1rem;line-height:1.6;overflow-wrap:anywhere}
body[data-tufte-theme=early-mac] a{color:var(--tufte-ink);text-decoration-thickness:2px;text-underline-offset:.13em}
body[data-tufte-theme=early-mac] button,body[data-tufte-theme=early-mac] input,body[data-tufte-theme=early-mac] select,body[data-tufte-theme=early-mac] textarea{border:1px solid #151515;border-radius:0;background:#fffefa;box-shadow:inset 1px 1px #fff,inset -1px -1px #777773;font:inherit}
body[data-tufte-theme=early-mac] button{min-height:2.35rem;padding:.35rem .8rem;box-shadow:inset 1px 1px #fff,inset -1px -1px #777773,1px 1px 0 #151515;font-weight:700}
body[data-tufte-theme=early-mac] button:active{transform:translate(1px,1px);box-shadow:inset 1px 1px #777773,inset -1px -1px #fff}
body[data-tufte-theme=early-mac] input,body[data-tufte-theme=early-mac] select,body[data-tufte-theme=early-mac] textarea{min-height:2.35rem;padding:.42rem .55rem}
body[data-tufte-theme=early-mac] input:focus-visible,body[data-tufte-theme=early-mac] select:focus-visible,body[data-tufte-theme=early-mac] textarea:focus-visible,body[data-tufte-theme=early-mac] button:focus-visible,body[data-tufte-theme=early-mac] a:focus-visible{outline:3px double #17140c;outline-offset:3px}
body[data-tufte-theme=early-mac] .tufte-skip{border-color:#151515;border-radius:0;background:#fffefa;box-shadow:2px 2px 0 #151515}
body[data-tufte-theme=early-mac] .tufte-footer{padding:.55rem .7rem;border-top:1px solid var(--tufte-line);color:var(--tufte-ink)}
body[data-tufte-theme=early-mac] .tufte-splitter:hover::after,body[data-tufte-theme=early-mac] .tufte-splitter:focus-visible::after{background:#17140c}
@media(max-width:760px){body[data-tufte-theme=early-mac]{font-size:16px}body[data-tufte-theme=early-mac] .tufte-shell{padding:.65rem}body[data-tufte-theme=early-mac] .tufte-tile{box-shadow:1px 1px 0 rgba(23,20,12,.55)}body[data-tufte-theme=early-mac] .tufte-masthead{box-shadow:1px 1px 0 rgba(23,20,12,.55)}}
@media(prefers-reduced-motion:reduce){body[data-tufte-theme=early-mac] button:active{transform:none}}
`, EARLY_MAC_THEME = Object.freeze({
  name: "early-mac",
  styles: EARLY_MAC_THEME_STYLES,
  themeColor: "#c8c8c4"
});
function resolveTufteTheme(theme) {
  if (theme === EARLY_MAC_THEME.name) return EARLY_MAC_THEME;
  if (!theme || typeof theme != "object") return null;
  let { name, styles, themeColor } = theme;
  return typeof name != "string" || !/^[a-z][a-z0-9-]*$/iu.test(name) || typeof styles != "string" ? null : Object.freeze({ name, styles, ...typeof themeColor == "string" ? { themeColor } : {} });
}

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-rendering.mjs
var token3 = (value, fallback) => /^[a-z][a-z0-9-]*$/i.test(String(value ?? "")) ? String(value) : fallback, record4 = (value) => value && typeof value == "object" && !Array.isArray(value) ? value : {}, trustedText = (value) => typeof value == "string" ? value : "";
var BASE_STYLES = String.raw`
:root{color-scheme:light dark;--tufte-bg:#f0efeb;--tufte-surface:#fbfaf7;--tufte-ink:#24292a;--tufte-muted:#626a68;--tufte-line:#d6d3ca;--tufte-accent:#3e6377;--tufte-warn:#96731f;--tufte-danger:#a04b32;--tufte-radius:.25rem;--tufte-gap:.5rem;--accent:var(--tufte-accent);--ink:var(--tufte-ink);--ink-dim:var(--tufte-muted);--border:var(--tufte-line);--bg:var(--tufte-bg);--surface:var(--tufte-surface);font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:15px;background:var(--tufte-bg);color:var(--tufte-ink)}
@media(prefers-color-scheme:dark){:root{--tufte-bg:#15181a;--tufte-surface:#1e2224;--tufte-ink:#dfdfd7;--tufte-muted:#949c98;--tufte-line:#363c3e;--tufte-accent:#86aec2;--tufte-warn:#cfa64e;--tufte-danger:#cf7d5f}}
*{box-sizing:border-box}html{min-height:100%;background:var(--tufte-bg)}body{margin:0;min-height:100%;background:var(--tufte-bg);color:var(--tufte-ink);line-height:1.55}
a{color:var(--tufte-accent)}button,input,select,textarea{font:inherit;color:inherit}
input,select,textarea{padding:.4rem .55rem;border:1px solid var(--tufte-line);border-radius:var(--tufte-radius);background:var(--tufte-surface)}
input:focus-visible,select:focus-visible,textarea:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid var(--tufte-accent);outline-offset:1px}
button{padding:.4rem .8rem;border:1px solid var(--tufte-line);border-radius:var(--tufte-radius);background:var(--tufte-surface);cursor:pointer}
button:hover{border-color:var(--tufte-accent)}
.tufte-shell{width:min(1280px,100%);margin:auto;padding:max(.75rem,env(safe-area-inset-top)) max(.75rem,env(safe-area-inset-right)) max(1.25rem,env(safe-area-inset-bottom)) max(.75rem,env(safe-area-inset-left))}
.tufte-masthead{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;padding:.35rem 0 .6rem;margin-bottom:var(--tufte-gap);border-bottom:1px solid var(--tufte-line)}
.tufte-eyebrow{margin:0 0 .15rem;color:var(--tufte-muted);font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.tufte-masthead h1{margin:0;font-family:ui-serif,Georgia,serif;font-size:1.35rem;font-weight:600;line-height:1.2;letter-spacing:.01em}
.tufte-subtitle{max-width:45rem;margin:.2rem 0 0;color:var(--tufte-muted);font-size:.85rem;line-height:1.45}
[data-tufte-navigation]{display:flex;flex-wrap:wrap;gap:1rem}[data-tufte-navigation] a{padding:.4rem 0}[data-tufte-navigation] [aria-current=page]{font-weight:700}
.tufte-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-flow:dense;gap:var(--tufte-gap);align-items:start}
.tufte-tile{grid-column:span var(--tile-span,4);min-width:0;padding:.7rem .85rem;border:1px solid var(--tufte-line);border-radius:var(--tufte-radius);background:var(--tufte-surface)}
.tufte-tile[data-role=now]{grid-column:span 8}.tufte-tile[data-role=rail]{grid-column:span 12}.tufte-tile[data-role=aside]{grid-column:span 4}
.tufte-tile[data-side=lake]{border-right:2px solid var(--tufte-accent)}.tufte-tile[data-side=land]{border-left:2px solid var(--tufte-accent)}
.tufte-tile[data-lifecycle=imminent]{border-color:var(--tufte-warn)}
.tufte-tile[data-confidence=low],.tufte-tile[data-lifecycle=pending]{opacity:.75;border-style:dashed}
.tufte-tile header{margin-bottom:.45rem;padding-bottom:.35rem;border-bottom:1px solid var(--tufte-line)}
.tufte-tile h2{margin:0;color:var(--tufte-muted);font-size:.7rem;font-weight:650;line-height:1.3;letter-spacing:.1em;text-transform:uppercase}
.tufte-tile-body{line-height:1.5;overflow-wrap:anywhere}.tufte-tile-body :is(img,svg,video,canvas,iframe){max-width:100%;height:auto}.tufte-tile-body>:first-child{margin-top:0}.tufte-tile-body>:last-child{margin-bottom:0}
.tufte-form-field{margin-bottom:.6rem}.tufte-form-field label{display:block;margin-bottom:.2rem;font-size:.8rem;font-weight:600}
.tufte-field-description{margin:.2rem 0 0;color:var(--tufte-muted);font-size:.78rem}
.tufte-field-error{margin:.2rem 0 0;color:var(--tufte-danger);font-size:.78rem}
.tufte-table-scroll{overflow-x:auto}.tufte-table-scroll table{width:100%;border-collapse:collapse}.tufte-table-scroll caption{text-align:left;font-weight:600;margin-bottom:.35rem}.tufte-table-scroll th,.tufte-table-scroll td{padding:.35rem .45rem;border-bottom:1px solid var(--tufte-line);vertical-align:top}.tufte-align-end{text-align:end}.tufte-align-start{text-align:start}.tufte-table-empty{color:var(--tufte-muted)}
.tufte-skip{position:fixed;left:.5rem;top:.5rem;z-index:99;padding:.6rem;background:var(--tufte-surface);color:var(--tufte-ink);border:1px solid var(--tufte-line);transform:translateY(-180%)}.tufte-skip:focus{transform:none}
.tufte-footer{margin-top:.75rem;color:var(--tufte-muted);font-size:.78rem;line-height:1.5;overflow-wrap:anywhere}
.tufte-workspace{position:relative;grid-auto-flow:row}
.tufte-workspace>.tufte-tile{display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden}
.tufte-workspace>.tufte-tile[hidden]{display:none}
.tufte-workspace>.tufte-tile>.tufte-tile-body{flex:1 1 auto;min-height:0;overflow:auto}
.tufte-splitter{position:absolute;z-index:5;touch-action:none;background:transparent}
.tufte-splitter[aria-orientation=vertical]{cursor:col-resize;width:11px;transform:translateX(-50%)}
.tufte-splitter[aria-orientation=horizontal]{cursor:row-resize;height:11px;transform:translateY(-50%)}
.tufte-splitter::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:2px;background:transparent}
.tufte-splitter[aria-orientation=vertical]::after{width:3px;height:2.5rem}
.tufte-splitter[aria-orientation=horizontal]::after{width:2.5rem;height:3px}
.tufte-splitter:hover::after,.tufte-splitter:focus-visible::after{background:var(--tufte-accent)}
.tufte-splitter:focus-visible{outline:2px solid var(--tufte-accent);outline-offset:-1px}
@media(max-width:760px){.tufte-grid{grid-template-columns:repeat(6,minmax(0,1fr))}.tufte-tile,.tufte-tile[data-role=now],.tufte-tile[data-role=aside]{grid-column:span 6}.tufte-tile[data-role=rail]{grid-column:span 6}.tufte-masthead{display:block}.tufte-workspace{display:flex;flex-direction:column}.tufte-workspace>.tufte-tile{min-height:0}.tufte-splitter{display:none}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}`;
function renderTufteFragment(model = {}) {
  let input = record4(model), projection = normalizeTufteModel(input), geometry = input.workspace ? computeTufteWorkspaceGeometry(input.workspace, projection) : null, areaFor = geometry ? new Map(geometry.panes.map((pane) => [pane.tile, pane.area])) : null, hiddenTiles = geometry ? new Set(geometry.hidden) : null, renderedTiles = projection.tiles.map((tile, index2) => {
    let id = token3(tile?.id, `tile-${index2 + 1}`), role = token3(tile?.role, "standard"), lifecycle = token3(tile?.lifecycle, "present"), confidence = token3(tile?.confidence, "high"), side2 = token3(tile?.side, "center"), span2 = Math.max(2, Math.min(12, Number(tile?.span) || 4)), live = liveToken(tile?.live), area = areaFor?.get(id), areaStyle = area ? `;grid-area:${area.row[0]} / ${area.column[0]} / ${area.row[1]} / ${area.column[1]}` : "", body = renderTufteTileBody(tile);
    return `<section class="tufte-tile" id="${id}"${hiddenTiles?.has(id) ? " hidden" : ""} data-role="${role}" data-lifecycle="${lifecycle}" data-confidence="${confidence}" data-side="${side2}" style="--tile-span:${span2}${areaStyle}" aria-labelledby="${id}-title"><header>${tile?.eyebrow ? `<p class="tufte-eyebrow">${escapeHtml(tile.eyebrow)}</p>` : ""}<h2 id="${id}-title">${escapeHtml(tile?.title || "Untitled")}</h2></header><div class="tufte-tile-body"${live ? ` aria-live="${live}" aria-atomic="true"` : ""}>${body}</div></section>`;
  }).join("");
  if (!geometry) return `<div class="tufte-grid">${renderedTiles}</div>`;
  let pct = (value) => `${Math.round(value * 1e4) / 100}%`, splitters = geometry.splitters.map((splitter) => {
    let vertical = splitter.axis === "row", position = vertical ? `left:${pct(splitter.rect.x)};top:${pct(splitter.rect.y)};height:${pct(splitter.rect.height)}` : `top:${pct(splitter.rect.y)};left:${pct(splitter.rect.x)};width:${pct(splitter.rect.width)}`;
    return `<div class="tufte-splitter" role="separator" tabindex="0" aria-orientation="${vertical ? "vertical" : "horizontal"}" aria-label="Resize panes" aria-valuemin="${Math.round(splitter.min * 100)}" aria-valuemax="${Math.round(splitter.max * 100)}" aria-valuenow="${Math.round(splitter.boundary * 100)}" data-tufte-splitter="${escapeHtml(splitter.id)}" style="${position}"></div>`;
  }).join(""), template = `grid-template-columns:${geometry.columns.map((size) => `${Math.round(size * 1e4) / 1e4}fr`).join(" ")};grid-template-rows:${geometry.rows.map((size) => `${Math.round(size * 1e4) / 1e4}fr`).join(" ")}`;
  return `<div class="tufte-grid tufte-workspace"${geometry.fullscreen ? ` data-tufte-fullscreen="${escapeHtml(geometry.fullscreen)}"` : ""} data-tufte-workspace="${escapeHtml(JSON.stringify(geometry.workspace))}" style="${template}">${renderedTiles}${splitters}</div>`;
}
function renderTufteStyles(options = {}) {
  return `${BASE_STYLES}${resolveTufteTheme(options.theme)?.styles ?? ""}${trustedText(options.styles)}`;
}
function renderTufteDocument(model = {}, options = {}) {
  let input = record4(model), settings = record4(options), projection = normalizeTufteModel(input), theme = resolveTufteTheme(settings.theme), metadata = normalizeTufteMetadata({ ...projection.metadata, ...settings.documentTitle ? { title: settings.documentTitle } : {}, ...settings.language ? { language: settings.language } : {}, themeColor: settings.themeColor ?? projection.metadata.themeColor ?? theme?.themeColor ?? "#071513" }), documentTitle = escapeHtml(metadata.title ?? projection.title), nonce2 = settings.nonce ? ` nonce="${escapeHtml(settings.nonce)}"` : "", layoutRules = [], fragment = renderTufteFragment(input), grid = settings.nonce ? fragment.replace(/ style="([^"]*)"/g, (_, style) => {
    let id = `layout-${layoutRules.length}`;
    return layoutRules.push(`[data-tufte-layout="${id}"]{${style}}`), ` data-tufte-layout="${id}"`;
  }) : fragment, styles = `${renderTufteStyles(settings)}${layoutRules.join("")}`;
  if (/<\/style/i.test(styles) || /<\/script/i.test(settings.clientScript ?? "")) throw new TypeError("Raw text assets must not contain closing HTML tags");
  let assets = (settings.importMap ? `<script type="importmap"${nonce2}>${JSON.stringify({ imports: Object.fromEntries(Object.entries(settings.importMap.imports ?? {}).map(([specifier, href]) => [specifier, admitTufteUrl(href)])) }).replace(/</gu, "\\u003c")}</script>` : "") + (settings.stylesheets ?? []).map((asset) => `<link rel="stylesheet" href="${escapeHtml(admitTufteUrl(asset.href))}"${asset.integrity ? ` integrity="${escapeHtml(asset.integrity)}" crossorigin="anonymous"` : ""}>`).join("") + (settings.scripts ?? []).map((asset) => `<script type="module" src="${escapeHtml(admitTufteUrl(asset.src))}"${nonce2}${asset.integrity ? ` integrity="${escapeHtml(asset.integrity)}" crossorigin="anonymous"` : ""}></script>`).join("");
  return `<!doctype html><html lang="${escapeHtml(metadata.language ?? "en")}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">${renderTufteMetadata({ ...metadata, title: metadata.title ?? projection.title })}<title>${documentTitle}</title><style${nonce2}>${styles}</style>${assets}${trustedText(settings.headHtml)}</head><body${theme ? ` data-tufte-theme="${theme.name}"` : ""}><a class="tufte-skip" href="#tufte-content">Skip to content</a><main class="tufte-shell" tabindex="-1" id="tufte-content" data-tufte${theme ? ` data-tufte-theme="${theme.name}"` : ""} ${settings.bootstrapData ? `data-tufte-bootstrap="${escapeHtml(JSON.stringify(settings.bootstrapData))}" ` : ""}data-revision="${escapeHtml(projection.revision)}" data-source="${escapeHtml(settings.source || "")}" data-action-endpoint="${escapeHtml(settings.actionEndpoint || "")}"><header class="tufte-masthead"><div>${projection.eyebrow ? `<p class="tufte-eyebrow">${escapeHtml(projection.eyebrow)}</p>` : ""}<h1>${escapeHtml(projection.title)}</h1>${projection.subtitle ? `<p class="tufte-subtitle">${escapeHtml(projection.subtitle)}</p>` : ""}</div>${renderTufteNavigation(projection.navigation)}${trustedText(input.mastheadHtml)}</header>${grid}${typeof input.footerHtml == "string" && input.footerHtml ? `<footer class="tufte-footer">${input.footerHtml}</footer>` : ""}</main>${typeof settings.clientScript == "string" && settings.clientScript ? `<script type="module"${nonce2}>${settings.clientScript}</script>` : ""}</body></html>`;
}

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-runtime.mjs
import { dirname as dirname5, join as join4 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/browser-modules.mjs
init_semiotic_content_address();
import { readFile, realpath } from "node:fs/promises";
import { dirname as dirname4, join as join3, relative as relative2, sep as sep2 } from "node:path";
var IMPORTED = /(?:^|[\n;])\s*(?:import|export)\s*(?:[^'"]*?\sfrom\s*)?["']([^"']+)["']/gu;
async function packageOf(file) {
  for (let directory = dirname4(file); directory !== dirname4(directory); directory = dirname4(directory))
    try {
      let manifest = JSON.parse(await readFile(join3(directory, "package.json"), "utf8"));
      if (typeof manifest.name == "string") return { root: directory, name: manifest.name };
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  throw new TypeError(`No package owns ${file}`);
}
async function resolvePackageImport(specifier, importer) {
  let parts = specifier.split("/"), name = specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0], subpath = [".", ...parts.slice(specifier.startsWith("@") ? 2 : 1)].join("/");
  for (let directory = dirname4(importer); directory !== dirname4(directory); directory = dirname4(directory)) {
    let root = join3(directory, "node_modules", name), manifest;
    try {
      manifest = JSON.parse(await readFile(join3(root, "package.json"), "utf8"));
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    let exports = manifest.exports, target;
    if (typeof exports == "object" && !Array.isArray(exports) && Object.keys(exports).every((key) => key.startsWith("."))) {
      if (target = exports[subpath], target === void 0)
        for (let [pattern, value] of Object.entries(exports)) {
          let star = pattern.indexOf("*");
          if (star < 0 || !subpath.startsWith(pattern.slice(0, star)) || !subpath.endsWith(pattern.slice(star + 1))) continue;
          let matched = subpath.slice(star, subpath.length - (pattern.length - star - 1)), chosen = value;
          for (; chosen && typeof chosen == "object"; ) chosen = chosen.browser ?? chosen.import ?? chosen.default;
          if (typeof chosen == "string") {
            target = chosen.replace("*", matched);
            break;
          }
        }
    } else
      target = subpath === "." ? exports ?? manifest.module ?? manifest.main : void 0;
    for (; target && typeof target == "object"; ) target = target.browser ?? target.import ?? target.default;
    if (typeof target != "string") throw new TypeError(`${name} exports no browser module at ${subpath}`);
    return realpath(join3(root, target));
  }
  throw new TypeError(`No package ${name} is installed where ${importer} can import it`);
}
async function readBrowserModuleClosure({ directory, entries }) {
  directory = await realpath(directory);
  let sources = {}, imports = {}, named = /* @__PURE__ */ new Set(), pending = entries.map((entry) => typeof entry == "string" ? { file: join3(directory, entry), name: entry } : { ...entry, alias: !0 }), served2 = /* @__PURE__ */ new Map();
  for (; pending.length; ) {
    let { file: requestedFile, name, alias } = pending.shift(), file = await realpath(requestedFile);
    if (served2.has(file) && !alias || named.has(name)) continue;
    served2.set(file, name), named.add(name);
    let source = await readFile(file, "utf8");
    sources[name] = source;
    for (let [, specifier] of source.matchAll(IMPORTED)) {
      if (specifier.startsWith(".")) {
        let target2 = await realpath(join3(dirname4(file), specifier)), targetName2 = relative2(directory, target2).startsWith("..") ? join3(dirname4(name), specifier).split(sep2).join("/") : relative2(directory, target2).split(sep2).join("/");
        served2.has(target2) || pending.push({ file: target2, name: targetName2 });
        continue;
      }
      if (specifier.startsWith("node:")) throw new TypeError(`Browser module ${name} imports ${specifier}`);
      let target = await resolvePackageImport(specifier, file), owner = await packageOf(target), targetName = `packages/${owner.name}/${relative2(owner.root, target).split(sep2).join("/")}`;
      if (imports[specifier] !== void 0 && imports[specifier] !== targetName) throw new TypeError(`${specifier} resolves to two different browser modules`);
      imports[specifier] = targetName, served2.has(target) || pending.push({ file: target, name: targetName });
    }
  }
  return { sources, imports };
}
function servedBrowserModules(prefix, { sources, imports }) {
  let ordered = Object.freeze(Object.fromEntries(Object.entries(sources).sort(([left], [right]) => left.localeCompare(right)))), path = `${prefix}/${semanticHex(ordered).slice(0, 20)}`;
  return Object.freeze({
    address: semanticId(ordered),
    path,
    assets: Object.freeze(Object.entries(ordered).map(([name, source]) => Object.freeze({ name, path: `${path}/${name}`, source, contentType: "text/javascript; charset=utf-8" }))),
    importMap: Object.freeze({ imports: Object.freeze(Object.fromEntries(Object.entries(imports).map(([specifier, name]) => [specifier, `${path}/${name}`]))) })
  });
}

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-runtime.mjs
var RUNTIME_MODULES = [
  "tufte-browser.mjs",
  "tufte-topology.mjs",
  "tufte-bootstrap.mjs",
  "tufte-theme.mjs",
  "tufte-rendering.mjs",
  "tufte-storefront.mjs",
  "tufte-composition.mjs"
], STOREFRONT_ENTRY_SOURCE = "tufte-storefront-browser.mjs", STOREFRONT_ENTRY_NAME = "storefront.mjs", SOURCE_DIRECTORY = () => dirname5(fileURLToPath2(import.meta.url));
function readRuntimeClosure() {
  let directory = SOURCE_DIRECTORY();
  return readBrowserModuleClosure({
    directory,
    entries: [...RUNTIME_MODULES, { file: join4(directory, STOREFRONT_ENTRY_SOURCE), name: STOREFRONT_ENTRY_NAME }]
  });
}
async function readRuntime() {
  try {
    return await readRuntimeClosure();
  } catch (error) {
    if (typeof import.meta.url == "string" && import.meta.url.startsWith("file:")) throw error;
    return null;
  }
}
var runtime = await readRuntime(), served = runtime && servedBrowserModules("/_tufte", runtime), TUFTE_RUNTIME_PATH = served?.path ?? null, TUFTE_STOREFRONT_MODULE_URL = "/_tufte/storefront.mjs", TUFTE_RUNTIME_ASSETS = served?.assets ?? Object.freeze([]), TUFTE_RUNTIME_IMPORT_MAP = served?.importMap ?? null;

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-application.mjs
var representations = Object.freeze(["text/html", "application/json"]);
function projectRedirect(response, context) {
  if (!(response instanceof Response) || context.request.headers.get("x-tufte-projection") !== "1" || ![301, 302, 303, 307, 308].includes(response.status) || !response.headers.has("location") || [307, 308].includes(response.status) && !["GET", "HEAD"].includes(context.request.method)) return response;
  let location = new URL(admitTufteUrl(response.headers.get("location")), context.url).href, headers = new Headers(response.headers);
  for (let name of ["location", "content-length", "content-encoding", "content-type"]) headers.delete(name);
  return headers.set("cache-control", "no-store"), headers.set("vary", [.../* @__PURE__ */ new Set([...(headers.get("vary") ?? "").split(",").map((value) => value.trim()).filter(Boolean), "Accept", "X-Tufte-Projection"])].join(", ")), Response.json({ kind: "tufte.redirect", location, status: response.status }, { headers });
}
function tuftePage(model, options = {}) {
  if (!model || typeof model != "object" || Array.isArray(model)) throw new TypeError("A TUFTE page requires a model");
  let status = options.status ?? 200;
  if (!Number.isInteger(status) || status < 200 || status > 599 || [204, 205, 304].includes(status)) throw new TypeError("A TUFTE page status must allow a representation body");
  return Object.freeze({ ...options, kind: "tufte.page", model, status });
}
function tufteRedirect(location, status = 303) {
  if (admitTufteUrl(location), ![301, 302, 303, 307, 308].includes(status)) throw new TypeError("Unsupported redirect status");
  return new Response(null, { status, headers: { location, "cache-control": "no-store" } });
}
async function renderPage(page2, context, defaults) {
  if (page2 instanceof Response) return projectRedirect(page2, context);
  if (page2?.kind !== "tufte.page") throw new TypeError("A TUFTE page handler must return tuftePage(...) or Response");
  let documentOptions = { ...defaults.document, ...page2.document }, model = { ...page2.model, metadata: {
    ...page2.model.metadata,
    ...documentOptions.documentTitle ? { title: documentOptions.documentTitle } : {},
    ...documentOptions.language ? { language: documentOptions.language } : {},
    ...documentOptions.themeColor ? { themeColor: documentOptions.themeColor } : {}
  } }, enhance = page2.enhance ?? defaults.enhance, shellBytes = new TextEncoder().encode(JSON.stringify([documentOptions, enhance, model.mastheadHtml, model.footerHtml, model.workspace])), shell = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", shellBytes)), (byte) => byte.toString(16).padStart(2, "0")).join(""), projection = normalizeTufteModel({ ...model, shell }), headers = new Headers(page2.headers);
  if (headers.set("cache-control", headers.get("cache-control") ?? "no-store"), headers.set("vary", [.../* @__PURE__ */ new Set([...(headers.get("vary") ?? "").split(",").map((value) => value.trim()).filter(Boolean), "Accept"])].join(", ")), context.negotiatedType === "application/json")
    return headers.set("content-type", "application/json; charset=utf-8"), new Response(JSON.stringify(projection), { status: page2.status, headers });
  headers.set("content-type", "text/html; charset=utf-8");
  let settings = { ...documentOptions, nonce: context.nonce };
  if (enhance) {
    if (TUFTE_RUNTIME_PATH === null) throw new TypeError("Enhancement needs TUFTE's browser runtime, which this platform has no source directory to serve it from");
    let options = enhance === !0 ? {} : enhance, components = Object.fromEntries(Object.entries(options.components ?? {}).map(([name, src]) => {
      admitTufteUrl(src);
      let url = new URL(src, context.url);
      if (url.origin !== context.url.origin) throw new TypeError("Component modules must be same-origin");
      return [name, url.href];
    }));
    settings.bootstrapData = { projection, navigation: options.navigation !== !1, forms: options.forms !== !1, components, workspace: model.workspace }, settings.importMap = TUFTE_RUNTIME_IMPORT_MAP, settings.scripts = [...settings.scripts ?? [], { src: `${TUFTE_RUNTIME_PATH}/tufte-bootstrap.mjs` }];
  }
  return new Response(renderTufteDocument(model, settings), { status: page2.status, headers });
}
function sameOriginTufteAction(context) {
  let origin = context.request.headers.get("origin");
  if (origin && origin !== "null")
    try {
      return new URL(origin).origin === context.url.origin;
    } catch {
      return !1;
    }
  return context.request.headers.get("sec-fetch-site") === "same-origin";
}
function compileTufteDescriptor(descriptor, action, defaults) {
  let { load, run, ...resource } = descriptor, handler = action ? run : load;
  if (typeof handler != "function") throw new TypeError(action ? "Action requires run(context)" : "Page requires load(context)");
  return { ...resource, methods: action ? descriptor.methods ?? ["POST"] : ["GET"], produces: representations, handler: async (context) => renderPage(await handler(context), context, defaults) };
}
function createTufteApplication(options = {}) {
  let { pages = [], actions = [], resources = [], enhance = !1, document: documentOptions = {}, body: bodyOptions = {}, csrf = sameOriginTufteAction, authorize, ...http } = options;
  if (typeof csrf != "function") throw new TypeError("csrf must be an explicit verification capability");
  let defaults = { enhance, document: documentOptions }, compile = (descriptor, action) => compileTufteDescriptor(descriptor, action, defaults), assetResources = TUFTE_RUNTIME_ASSETS.map(({ path, source, contentType }) => ({
    match: path,
    methods: ["GET"],
    produces: ["text/javascript"],
    handler: () => new Response(source, { headers: { "content-type": contentType, "cache-control": "public, max-age=31536000, immutable" } })
  }));
  TUFTE_RUNTIME_PATH !== null && assetResources.push({ match: TUFTE_STOREFRONT_MODULE_URL, methods: ["GET"], handler: () => tufteRedirect(`${TUFTE_RUNTIME_PATH}/storefront.mjs`, 307) });
  let guard = async (context) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(context.request.method)) {
      let verdict = await csrf(context);
      if (verdict instanceof Response) return projectRedirect(verdict, context);
      if (verdict !== !0) return new Response("Forbidden origin", { status: 403, headers: { "cache-control": "no-store" } });
    }
    return projectRedirect(await authorize?.(context), context);
  };
  return createWebApplication({
    ...http,
    body: bodyOptions,
    onError: async (error, context) => error instanceof BodyReadError ? context.negotiatedType === "application/json" ? Response.json({ message: error.message, code: error.code, status: error.status }, { status: error.status, headers: { "cache-control": "no-store", vary: "Accept" } }) : renderPage(tuftePage({ title: "Request refused", tiles: [{ id: "request-error", title: "Request input", content: error.message, live: "assertive" }] }, { status: error.status, enhance: !1 }), context, defaults) : http.onError?.(error, context),
    security: http.security ?? !0,
    cacheControl: http.cacheControl ?? "no-store",
    middlewares: [guard, ...http.middlewares ?? []],
    resources: [...assetResources, ...pages.map((page2) => compile(page2, !1)), ...actions.map((action) => compile(action, !0)), ...resources]
  });
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/worker-runtime.mjs
init_tufte_storefront();

// node_modules/.pnpm/@red-cup-engineering+web-page-tiling-engine@0.14.2_@types+node@26.6.5_bufferutil@4.1.0__e1a5eb06708e33e33e9aaf718238b7f0/node_modules/@red-cup-engineering/web-page-tiling-engine/src/tufte-storefront-application.mjs
init_tufte_storefront();
init_tufte_browser();
function createTufteStorefront({ catalog, path = "/", itemPath = "/items/:id", pages = [], document: documentOptions = {}, ...application } = {}) {
  if (!catalog) throw new TypeError("Storefront requires a catalog capability or display model");
  if (admitTufteUrl(path), admitTufteUrl(itemPath), ![path, itemPath].every((value) => value.startsWith("/") && !/[?#]/u.test(value)) || (itemPath.match(/:[A-Za-z0-9_]+/gu) ?? []).join() !== ":id") throw new TypeError("Storefront itemPath requires one :id parameter");
  let load = typeof catalog == "function" ? catalog : () => catalog;
  return createTufteApplication({ ...application, document: { ...documentOptions, styles: `${STOREFRONT_STYLES}
${documentOptions.styles ?? ""}` }, pages: [
    { match: path, load: async (context) => tuftePage(storefrontCatalogModel(await load(context), {
      path,
      itemHref: (id) => itemPath.replace(":id", encodeURIComponent(id)),
      parameters: context.url.searchParams
    })) },
    { match: itemPath, load: async (context) => {
      let model = storefrontDetailModel(await load(context), context.params.id, { catalogHref: path });
      return model ? tuftePage(model) : tuftePage({ title: "Item not found", tiles: [{ id: "storefront-navigation", title: "Browse", links: [{ href: path, label: "Back to catalog" }] }] }, { status: 404 });
    } },
    ...pages
  ] });
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/review-copy.mjs
var REVIEW_COPY_ID = /^review-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u, REVIEW_COPY_RENDITION = "advance-reader-v1", OFFERING_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u, HEX_SHA256 = /^[0-9a-f]{64}$/u, FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*\.epub$/u, EDITION = /^ni:\/\/\/sha-256;[A-Za-z0-9_-]{43}$/u, unavailable = (reason) => new TypeError(`review-copy-unavailable: ${reason}`), hex = (bytes) => [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
function reviewCopyPointerKey(offeringId, grant) {
  if (!OFFERING_ID.test(offeringId ?? "")) throw new TypeError("offering id must be a lowercase kebab-case slug");
  if (!REVIEW_COPY_ID.test(grant ?? "")) throw new TypeError("a review-copy id is review-<uuid>");
  return `goods/${offeringId}/review-copies/${grant}/pointer.json`;
}
function admitReviewCopyPointer(pointer, offeringId, grant) {
  let bundle = pointer?.bundle, prefix = `goods/${offeringId}/review-copies/${grant}/`;
  if (pointer?.type !== "ReviewCopyRelease" || pointer.version !== 1 || pointer.offeringId !== offeringId || pointer.grant !== grant) throw unavailable("the pointer does not name this offering and grant");
  if (pointer.rendition !== REVIEW_COPY_RENDITION || !EDITION.test(pointer.release ?? "")) throw unavailable("the pointer names no advance-reader rendition of an edition");
  if (typeof bundle?.key != "string" || !bundle.key.startsWith(prefix) || bundle.key.endsWith("pointer.json")) throw unavailable("the copy is outside this grant's goods");
  if (!HEX_SHA256.test(bundle.sha256 ?? "") || !Number.isInteger(bundle.bytes) || bundle.bytes < 1) throw unavailable("the copy carries no digest or size");
  if (bundle.contentType !== "application/epub+zip" || !FILENAME.test(bundle.filename ?? "")) throw unavailable("the copy is not a named EPUB");
  return Object.freeze({ ...pointer, bundle: Object.freeze({ ...bundle }) });
}
function reviewCopyEntitlement(body, accountOf2) {
  let recipient = accountOf2(body?.recipientEmail), giver = accountOf2(body?.grantedBy);
  return !REVIEW_COPY_ID.test(body?.id ?? "") || !recipient || !giver || !OFFERING_ID.test(body?.offeringId ?? "") || !EDITION.test(body.release ?? "") || !HEX_SHA256.test(body.artifactSha256 ?? "") || Number.isNaN(Date.parse(body.expiresAt ?? "")) ? null : {
    id: body.id,
    kind: "review-copy",
    offeringId: body.offeringId,
    release: body.release,
    rendition: REVIEW_COPY_RENDITION,
    artifactSha256: body.artifactSha256,
    expiresAt: new Date(body.expiresAt).toISOString(),
    account: recipient,
    recipientEmail: recipient,
    grantedBy: giver,
    note: typeof body.note == "string" ? body.note.slice(0, 1e3) : "",
    status: "active",
    createdAt: body.createdAt ?? null
  };
}
function reviewCopyStanding(entitlement, now = /* @__PURE__ */ new Date()) {
  return entitlement?.kind !== "review-copy" ? Object.freeze({ deliverable: !1, reason: "not-a-review-copy" }) : entitlement.status !== "active" ? Object.freeze({ deliverable: !1, reason: "withdrawn" }) : Date.parse(entitlement.expiresAt) <= now.getTime() ? Object.freeze({ deliverable: !1, reason: "expired" }) : Object.freeze({ deliverable: !0, reason: null });
}
async function readReviewCopy(entitlement, env, now = /* @__PURE__ */ new Date()) {
  let standing = reviewCopyStanding(entitlement, now);
  if (!standing.deliverable) throw unavailable(standing.reason);
  let store = env?.SHOP_GOODS ?? env?.goods;
  if (!store || typeof store.get != "function") throw unavailable("no goods bucket is bound");
  let object = await store.get(reviewCopyPointerKey(entitlement.offeringId, entitlement.id));
  if (!object) throw unavailable("no copy is staged for this grant");
  let pointer = admitReviewCopyPointer(JSON.parse(await object.text()), entitlement.offeringId, entitlement.id);
  if (pointer.release !== entitlement.release || pointer.bundle.sha256 !== entitlement.artifactSha256) throw unavailable("the staged copy is not the one this grant names");
  let copy = await store.get(pointer.bundle.key);
  if (!copy) throw unavailable("the staged copy is missing");
  let bytes = new Uint8Array(await copy.arrayBuffer());
  if (bytes.byteLength !== pointer.bundle.bytes || hex(await crypto.subtle.digest("SHA-256", bytes)) !== pointer.bundle.sha256) throw unavailable("the staged copy does not match its digest");
  return new Response(bytes, {
    headers: {
      "content-type": pointer.bundle.contentType,
      "content-disposition": `attachment; filename="${pointer.bundle.filename}"`,
      "content-length": String(bytes.byteLength),
      "x-release": pointer.release,
      "cache-control": "private, no-store"
    }
  });
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/durable-fulfillment.mjs
function reply2(value, status = 200) {
  return Response.json(value ?? null, { status });
}
function sameCheckout(left, right) {
  return left && left.sessionId === right.sessionId && left.offeringId === right.offeringId && left.requestDigest === right.requestDigest && left.amountTotal === right.amountTotal && left.currency === right.currency && left.stripeMode === right.stripeMode && JSON.stringify(left.goods) === JSON.stringify(right.goods) && left.release === right.release && JSON.stringify(left.admittedRelease ?? null) === JSON.stringify(right.admittedRelease ?? null);
}
var EMAIL = /^[^\s@]+@[^\s@]+$/u, GIFT_ID = /^gift-[0-9a-f-]{36}$/u;
function accountOf(email) {
  return typeof email == "string" && EMAIL.test(email.trim()) ? email.trim().toLowerCase() : null;
}
async function index(transaction, key, id) {
  let ids = await transaction.get(key) ?? [];
  ids.includes(id) || await transaction.put(key, [...ids, id]);
}
var DigitalGoodsFulfillment = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  async fetch(request) {
    let url = new URL(request.url), body = request.method === "POST" ? await request.json() : null;
    if (request.method === "GET" && url.pathname.startsWith("/checkout/")) return reply2(await this.ctx.storage.get(`checkout:${decodeURIComponent(url.pathname.slice(10))}`));
    if (request.method === "GET" && url.pathname.startsWith("/entitlement/")) return reply2(await this.ctx.storage.get(`entitlement:${decodeURIComponent(url.pathname.slice(13))}`));
    if (request.method === "GET" && (url.pathname.startsWith("/account/") || url.pathname.startsWith("/grants/"))) {
      let [, kind, email] = url.pathname.split("/"), ids = await this.ctx.storage.get(`${kind === "account" ? "account" : "grants"}:${accountOf(decodeURIComponent(email))}`) ?? [];
      return reply2((await Promise.all(ids.map((id) => this.ctx.storage.get(`entitlement:${id}`)))).filter(Boolean));
    }
    if (request.method === "POST" && url.pathname === "/checkout") return this.ctx.storage.transaction(async (transaction) => {
      let key = `checkout:${body.sessionId}`, existing = await transaction.get(key);
      return existing && !sameCheckout(existing, body) ? reply2({ disposition: "conflict" }, 409) : (existing || await transaction.put(key, body), reply2({ disposition: existing ? "duplicate" : "registered" }));
    });
    if (request.method === "POST" && url.pathname === "/claim") return this.ctx.storage.transaction(async (transaction) => {
      let eventType = body.eventType ?? "checkout.session.completed";
      if (!CHECKOUT_EVENTS.includes(eventType)) return reply2({ disposition: "rejected" }, 409);
      if (await transaction.get(`event:${body.eventId}`)) return reply2({ disposition: "duplicate" });
      let checkout = await transaction.get(`checkout:${body.sessionId}`);
      if (!(checkout && body.status === "complete" && checkout.offeringId === body.offeringId && checkout.requestDigest === body.requestDigest && checkout.amountTotal === body.amountTotal && checkout.currency === body.currency && checkout.stripeMode === body.stripeMode)) return reply2({ disposition: "rejected" }, 409);
      if (eventType === "checkout.session.completed" && body.paymentStatus === "unpaid")
        return await transaction.put(`event:${body.eventId}`, { sessionId: body.sessionId, type: eventType, pending: !0 }), reply2({ disposition: "pending" });
      if (body.paymentStatus !== "paid") return reply2({ disposition: "rejected" }, 409);
      await transaction.put(`event:${body.eventId}`, { sessionId: body.sessionId, type: eventType });
      let entitlementKey = `entitlement:${body.sessionId}`;
      if (await transaction.get(entitlementKey)) return reply2({ disposition: "duplicate-session" });
      let account = accountOf(checkout.account);
      return await transaction.put(entitlementKey, { id: body.sessionId, kind: "purchase", sessionId: body.sessionId, offeringId: checkout.offeringId, goods: checkout.goods, release: checkout.release ?? null, admittedRelease: checkout.admittedRelease ?? null, account, status: "active", paymentIntentId: body.paymentIntentId ?? null, createdAt: body.createdAt ?? null }), account && await index(transaction, `account:${account}`, body.sessionId), reply2({ disposition: "claimed" });
    });
    if (request.method === "POST" && url.pathname === "/grant") return this.ctx.storage.transaction(async (transaction) => {
      let recipient = accountOf(body?.recipientEmail), gifter = accountOf(body?.grantedBy), record5 = body?.kind === "review-copy" ? reviewCopyEntitlement(body, accountOf) : GIFT_ID.test(body?.id ?? "") && recipient && gifter && typeof body.offeringId == "string" && typeof body.release == "string" ? { id: body.id, kind: "gift", offeringId: body.offeringId, release: body.release, account: recipient, recipientEmail: recipient, grantedBy: gifter, note: typeof body.note == "string" ? body.note.slice(0, 1e3) : "", status: "active", createdAt: body.createdAt ?? null } : null;
      if (!record5) return reply2({ disposition: "rejected" }, 400);
      let key = `entitlement:${record5.id}`;
      return await transaction.get(key) ? reply2({ disposition: "duplicate" }) : (await transaction.put(key, record5), await index(transaction, `account:${record5.account}`, record5.id), await index(transaction, `grants:${record5.grantedBy}`, record5.id), reply2({ disposition: "granted" }));
    });
    if (request.method === "POST" && url.pathname === "/bind") return this.ctx.storage.transaction(async (transaction) => {
      let account = accountOf(body?.account), key = `entitlement:${body?.id}`, existing = await transaction.get(key);
      return !account || !existing || existing.status !== "active" ? reply2({ disposition: "unknown" }, 404) : existing.account && existing.account !== account ? reply2({ disposition: "held-by-another-account" }, 409) : (existing.account || await transaction.put(key, { ...existing, account }), await index(transaction, `account:${account}`, existing.id ?? body.id), reply2({ disposition: existing.account ? "duplicate" : "bound" }));
    });
    if (request.method === "POST" && url.pathname === "/revoke") return this.ctx.storage.transaction(async (transaction) => {
      let id = body.id ?? body.sessionId, existing = await transaction.get(`entitlement:${id}`);
      return !existing || body.paymentIntentId && existing.paymentIntentId !== body.paymentIntentId || body.grantedBy && existing.grantedBy !== accountOf(body.grantedBy) ? reply2({ disposition: "unknown" }, 404) : (await transaction.put(`entitlement:${id}`, { ...existing, status: "revoked", revokedAt: body.revokedAt ?? null, revocationReason: body.reason ?? "withdrawn" }), reply2({ disposition: "revoked" }));
    });
    if (request.method === "POST" && url.pathname === "/audit") {
      let id = body?.record?.id;
      return typeof id != "string" || !id ? reply2({ error: "receipt-id-required" }, 400) : (await this.ctx.storage.put(`audit:${id}`, body), reply2({ ok: !0 }));
    }
    return reply2({ error: "not-found" }, 404);
  }
};
function createDurableFulfillment(namespace, name) {
  if (!namespace || !name) return null;
  let stub = namespace.get(namespace.idFromName(name)), call = async (path, value) => {
    try {
      let response = await stub.fetch(`https://fulfillment${path}`, { method: "POST", body: JSON.stringify(value) }), body = await response.json();
      return !body || typeof body != "object" ? { failed: !0 } : response.ok ? body : { ...body, failed: !0 };
    } catch {
      return { failed: !0 };
    }
  }, get2 = async (kind, id) => (await stub.fetch(`https://fulfillment/${kind}/${encodeURIComponent(id)}`)).json();
  return {
    async recordCheckout(value) {
      return call("/checkout", value);
    },
    async getCheckout(id) {
      return get2("checkout", id);
    },
    async claimPayment(value) {
      return call("/claim", value);
    },
    async getEntitlement(id) {
      return get2("entitlement", id);
    },
    async revokeEntitlement(value) {
      return call("/revoke", value);
    },
    async grantEntitlement(value) {
      return call("/grant", value);
    },
    async bindEntitlement(value) {
      return call("/bind", value);
    },
    async listAccount(email) {
      return await get2("account", email) ?? [];
    },
    async listGrants(email) {
      return await get2("grants", email) ?? [];
    },
    audit: { async record(entry) {
      if ((await call("/audit", entry)).failed) throw new Error("could not record checkout receipt");
      return entry;
    } }
  };
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/stripe-checkout-fulfillment.mjs
var MAX_STRIPE_WEBHOOK_BYTES = 1024 * 1024;
function json(value, status = 200) {
  return Response.json(value, { status, headers: { "cache-control": "no-store" } });
}
function supportsStore(store) {
  return store && ["recordCheckout", "getCheckout", "claimPayment", "getEntitlement"].every((name) => typeof store[name] == "function");
}
async function boundedStripeWebhookText(request) {
  let reader = request.body?.getReader();
  if (!reader) return { text: "" };
  let decoder = new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 }), totalBytes = 0, text2 = "";
  try {
    for (; ; ) {
      let { done, value } = await reader.read();
      if (done) break;
      if (totalBytes += value.byteLength, totalBytes > MAX_STRIPE_WEBHOOK_BYTES)
        return await reader.cancel(), { error: "stripe-webhook-body-too-large", status: 413 };
      text2 += decoder.decode(value, { stream: !0 });
    }
    return { text: text2 + decoder.decode() };
  } catch (cause) {
    try {
      await reader.cancel();
    } catch {
    }
    return cause instanceof TypeError ? { error: "invalid-json", status: 400 } : { error: "stripe-webhook-body-unavailable", status: 503 };
  } finally {
    reader.releaseLock();
  }
}
async function fulfillStripeCheckoutWebhook(request, env) {
  if (!supportsStore(env.fulfillment)) return json({ error: "fulfillment-store-unavailable" }, 503);
  let received = await boundedStripeWebhookText(request);
  if (received.error) return json({ error: received.error }, received.status);
  let rawBody = received.text;
  if (!verifyStripeSignature({ rawBody, signatureHeader: request.headers.get("stripe-signature") ?? "", secret: env.STRIPE_WEBHOOK_SECRET })) return json({ error: "invalid-or-stale-stripe-signature" }, 400);
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "invalid-json" }, 400);
  }
  if (!CHECKOUT_EVENTS.includes(event?.type)) return json({ accepted: !0 });
  let projection = projectEvent(event);
  if (!projection.stripeEventId || !projection.stripeObjectId || typeof projection.livemode != "boolean") return json({ error: "payment-does-not-match-checkout-intent" }, 409);
  let result = await env.fulfillment.claimPayment({ eventId: projection.stripeEventId, eventType: projection.eventType, sessionId: projection.stripeObjectId, offeringId: projection.offeringId, requestDigest: projection.requestDigest, amountTotal: projection.amountTotal, currency: projection.currency, paymentStatus: projection.paymentStatus, status: projection.status, stripeMode: projection.livemode ? "live" : "test", paymentIntentId: projection.paymentIntentId, createdAt: projection.created }), claimed = typeof result == "string" ? result : result?.disposition;
  return claimed === "rejected" ? json({ error: "payment-does-not-match-checkout-intent" }, 409) : claimed === "pending" ? json({ accepted: !0, pending: !0 }) : ["claimed", "duplicate", "duplicate-session"].includes(claimed) ? json({ accepted: !0, duplicate: claimed === "duplicate" || claimed === "duplicate-session" }) : json({ error: "fulfillment-store-unavailable" }, 503);
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/paid-release.mjs
var OFFERING_ID2 = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u, HEX_SHA2562 = /^[0-9a-f]{64}$/u, FILENAME2 = /^[A-Za-z0-9][A-Za-z0-9._-]*$/u, unavailable2 = (reason) => new TypeError(`paid-release-unavailable: ${reason}`);
function bucket(env) {
  let store = env?.SHOP_GOODS ?? env?.goods;
  if (!store || typeof store.get != "function" || typeof store.head != "function") throw unavailable2("no goods bucket is bound");
  return store;
}
function releasePointerKey(offeringId) {
  if (typeof offeringId != "string" || !OFFERING_ID2.test(offeringId)) throw new TypeError("offering id must be a lowercase kebab-case slug");
  return `goods/${offeringId}/release.json`;
}
function admitReleasePointer(pointer, offeringId) {
  let bundle = pointer?.bundle;
  if (pointer?.type !== "PaidRelease" || pointer.version !== 1 || pointer.offeringId !== offeringId) throw unavailable2("the release pointer does not name this offering");
  if (typeof pointer.release != "string" || pointer.release === "") throw unavailable2("the release pointer names no release");
  if (typeof bundle?.key != "string" || !bundle.key.startsWith(`goods/${offeringId}/`)) throw unavailable2("the bundle is outside this offering's goods");
  if (!HEX_SHA2562.test(bundle.sha256 ?? "") || !Number.isInteger(bundle.bytes) || bundle.bytes < 1) throw unavailable2("the bundle carries no digest or size");
  if (typeof bundle.contentType != "string" || !FILENAME2.test(bundle.filename ?? "")) throw unavailable2("the bundle carries no content type or file name");
  return Object.freeze({ ...pointer, bundle: Object.freeze({ ...bundle }) });
}
function releaseExpectationFor(offering) {
  if (!offering?.book) return;
  let edition = offering.book.edition;
  if (!edition?.record || !/^ni:\/\/\/sha-256;[A-Za-z0-9_-]{43}$/u.test(edition.digest ?? "")) throw unavailable2("the book names no accepted edition");
  let artifacts = Object.fromEntries((edition.files ?? []).map((file) => [file.format === "EPUB" ? "epub" : file.format === "PDF" ? "screenPdf" : file.format, file.sha256]));
  if (!HEX_SHA2562.test(artifacts.epub ?? "") || !HEX_SHA2562.test(artifacts.screenPdf ?? "")) throw unavailable2("the book names no accepted EPUB and PDF");
  return { release: edition.digest, artifacts };
}
function requireExpectedRelease(pointer, expected) {
  if (expected === void 0) return pointer;
  if (expected?.available === !1) throw unavailable2("this publication is not released for sale");
  if (typeof expected?.release != "string" || !expected.release) throw unavailable2("the offer names no intended release");
  if (pointer.release !== expected.release) throw unavailable2("the staged release differs from the offer's intended edition");
  for (let [format, digest2] of Object.entries(expected.artifacts ?? {}))
    if (!HEX_SHA2562.test(digest2) || pointer.artifacts?.[format] !== digest2) throw unavailable2(`the staged ${format} differs from the intended artifact`);
  return pointer;
}
async function readPointer(store, offeringId, expected) {
  let object = await store.get(releasePointerKey(offeringId));
  if (!object) throw unavailable2("no release is staged");
  return requireExpectedRelease(admitReleasePointer(JSON.parse(await object.text()), offeringId), expected);
}
async function admitPaidRelease(offeringId, env, expected) {
  let store = bucket(env), pointer = await readPointer(store, offeringId, expected), head = await store.head(pointer.bundle.key);
  if (!head || head.size !== pointer.bundle.bytes) throw unavailable2("the staged bundle is missing or not the size its pointer states");
  return Object.freeze({ offeringId, release: pointer.release, byteLength: head.size, bundle: pointer.bundle });
}
async function readPaidRelease(offeringId, env, expected) {
  let store = bucket(env), pointer = await readPointer(store, offeringId, expected), object = await store.get(pointer.bundle.key);
  if (!object) throw unavailable2("the staged bundle is missing");
  let bytes = new Uint8Array(await object.arrayBuffer()), digest2 = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  if (bytes.byteLength !== pointer.bundle.bytes || digest2 !== pointer.bundle.sha256) throw unavailable2("the staged bundle does not match its pointer's digest");
  return new Response(bytes, {
    headers: {
      "content-type": pointer.bundle.contentType,
      "content-disposition": `attachment; filename="${pointer.bundle.filename}"`,
      "content-length": String(bytes.byteLength),
      "x-release": pointer.release,
      "cache-control": "private, no-store"
    }
  });
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/storefront-presentation.mjs
init_tufte_composition();

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/retail-listings.mjs
var RETAIL_CHANNELS = Object.freeze(["kdp", "kdp-paperback", "kobo", "google-play-books", "apple-books", "barnes-noble-press", "leanpub"]), AUDIOBOOK_RETAIL_CHANNELS = Object.freeze([
  Object.freeze({ id: "google-play-books", name: "Google Play Books Partner Center", disposition: "accepts", disclosure: { field: "narrator", value: "Synthesized voice" }, formats: ["mp3", "aac", "flac", "wav", "zip", "lpf"], source: "https://support.google.com/books/partner/answer/9261664?hl=en" }),
  Object.freeze({ id: "kobo", name: "Kobo Writing Life", disposition: "accepts", disclosure: { field: "narrator-contributor", values: ["Synthesised voice - male", "Synthesised voice - female", "Synthesised voice - unspecified"] }, limitation: "Only for a book whose text is not AI-generated: Kobo rejects books wholly or partly generated by AI.", source: "https://kobowritinglife.zendesk.com/hc/en-us/articles/10563450280475-AI-Narration-and-Audiobooks" }),
  Object.freeze({ id: "spotify", name: "Spotify for Authors", disposition: "accepts", disclosure: { field: "digital-voice-narration", value: !0, storeLabel: "digital voice narration" }, limitation: "Spotify does not send digital-voice titles to referral partners.", source: "https://support.spotify.com/us/authors/article/digital-voice-narration/" }),
  Object.freeze({ id: "inaudio", name: "Voices by INaudio", disposition: "accepts-with-restrictions", disclosure: { submissionType: "Digital Voice Narration", automaticDescriptionDisclosure: !0 }, packaging: "Unmodified LPF from an approved digital-voice provider", distribution: "Limited to partners accepting digital narration", source: "https://voicessupport.inaudio.com/en/articles/3219456" }),
  Object.freeze({ id: "apple-books", name: "Apple Books", disposition: "program-only", program: "Apple Books digital narration", delivery: "Nominate an eligible English ebook through an Apple preferred partner; the store credit is Narrated by Apple Books.", source: "https://authors.apple.com/support/4973-get-started-digital-narration" }),
  Object.freeze({ id: "acx", name: "ACX", disposition: "refuses-house-synthesis", limitation: "Submissions must be human narrated unless ACX separately authorizes them; unauthorized text-to-speech and AI recordings are prohibited.", source: "https://help.acx.com/s/article/what-are-the-acx-audio-submission-requirements" })
]), CHANNEL_NAMES = Object.freeze({
  kdp: "Amazon Kindle Direct Publishing",
  "kdp-paperback": "Amazon KDP Paperback",
  kobo: "Kobo Writing Life",
  "google-play-books": "Google Play Books Partner Center",
  "apple-books": "Apple Books for Authors",
  "barnes-noble-press": "Barnes & Noble Press",
  leanpub: "Leanpub"
});
function aiDisclosureFor(offering) {
  let proofread = !!offering.book?.edition?.proof, generated = offering.book?.generatedIllustrations ?? [], illustration = offering.book?.coverIllustration, cover = offering.cover ?? offering.book?.coverFile ? illustration ? `The cover illustration was generated by an AI image model (${illustration.modelName ?? illustration.model}${illustration.provider ? ` on ${illustration.provider}` : ""}) from a prompt written by an AI agent${illustration.references ? `, using ${illustration.references} as reference` : ""}; its title, byline and subtitle were set by code.` : offering.book?.coverArt ? "The cover's drawing was written as code (TikZ) by an AI agent and rendered by the typesetter; no image model was used. Its type is set by code from the book's title and design tokens." : "None AI-generated: the cover is typeset by code from the book's title and design tokens." : "No cover image yet.", illustrations = generated.length === 0 ? "" : ` Interior illustrations were generated by image model${generated.length === 1 ? "" : "s"}: ${[...new Set(generated.map((asset) => asset.model))].join(", ")}.`;
  return Object.freeze({
    text: `AI-generated: the text was drafted by AI agents working for the 561 Group${proofread ? ", then proofread by a separate AI agent" : ""}.`,
    images: `${cover}${illustrations}`,
    translations: "None."
  });
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/storefront-presentation.mjs
var KIND_LABELS = Object.freeze({ book: "Books", merch: "Merch" }), HOUSE_BYLINES = /* @__PURE__ */ new Set(["561 Group", "Causeway Services"]);
function displayPrice(priceCents, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: String(currency).toUpperCase() }).format(priceCents / 100);
}
function kilobytes(bytes) {
  return `${Math.max(1, Math.round(bytes / 1024)).toLocaleString("en-US")} KB`;
}
var counted = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;
function formatsOf(book) {
  return (book?.edition?.files ?? []).map((file) => file.format);
}
function facts(offering) {
  let book = offering.book, rows = [];
  return offering.priceCents != null && rows.push({ label: "Price", value: displayPrice(offering.priceCents, offering.currency) }), formatsOf(book).length && rows.push({ label: "Formats", value: formatsOf(book).join(" and ") }), book?.contents?.length && rows.push({ label: "Length", value: `${book.contents.length} parts${book.edition?.pages ? `, ${book.edition.pages} pages` : ""}` }), book?.series && rows.push({ label: "Series", value: `${book.series.name}, number ${book.series.number}`, detailOnly: !0 }), book?.author && rows.push({ label: "Author", value: book.author, detailOnly: !0 }), book?.edition?.acceptedAt && rows.push({ label: "Edition accepted", value: book.edition.acceptedAt.slice(0, 10), detailOnly: !0 }), rows;
}
function detailNodes(offering) {
  let book = offering.book;
  if (!book) return [];
  let nodes = [], files = book.edition?.files ?? [];
  files.length && (nodes.push(htmlElement("h3", {}, ["What you receive"])), nodes.push(htmlElement("p", {}, [`One download holding the ${files.map((file) => `${file.format} (${kilobytes(file.bytes)})`).join(" and ")} of the accepted edition. Your library always serves the newest accepted edition, so a corrected edition reaches you at no charge.`]))), book.contents?.length && (nodes.push(htmlElement("h3", {}, ["Contents"])), nodes.push(htmlElement("ol", {}, book.contents.map((title) => htmlElement("li", {}, [title]))))), nodes.push(htmlElement("h3", {}, ["How it was made"])), nodes.push(htmlElement("p", {}, [aiDisclosureFor(offering).text.replace(/^AI-generated: t/u, "T")]));
  let edition = book.edition;
  if (edition?.digest) {
    nodes.push(htmlElement("h3", {}, ["Verification record"]));
    let proof = edition.proof;
    nodes.push(htmlElement("p", {}, [proof ? `An independent proofreading agent, not the one that wrote it, read ${proof.carried ? "this text" : "this edition"} and reported ${counted(proof.errors, "error")}, ${counted(proof.corrections, "correction")} and ${counted(proof.notes, "note")}; each was fixed, or answered with a reason, and checked against the final files before the edition was accepted.${proof.carried ? " This edition was rebuilt so that anyone can reproduce its files from the manuscript; its text was checked, mechanically, to be the one the proofreading agent read." : ""}` : "This edition predates the house's acceptance records; its download names the release it delivers."])), nodes.push(htmlElement("dl", {}, [
      htmlElement("dt", {}, ["Edition digest"]),
      htmlElement("dd", {}, [htmlElement("code", {}, [edition.digest])]),
      ...files.flatMap((file) => [htmlElement("dt", {}, [`${file.format} SHA-256`]), htmlElement("dd", {}, [htmlElement("code", {}, [file.sha256])])])
    ])), files.length && nodes.push(htmlElement("p", {}, ["Check your copy: the SHA-256 of each file you download (for example with ", htmlElement("code", {}, ["sha256sum"]), ") is the value above, the same bytes the proofreading agent read."]));
  }
  return nodes;
}
function structuredDataFor(offering, { origin, href, image }) {
  let offer = offering.priceCents != null && offering.buyable ? {
    "@type": "Offer",
    price: (offering.priceCents / 100).toFixed(2),
    priceCurrency: String(offering.currency).toUpperCase(),
    url: `${origin}${href}`,
    availability: "https://schema.org/InStock"
  } : void 0, book = offering.book, author = book?.author && !HOUSE_BYLINES.has(book.author) ? { "@type": "Person", name: book.author } : { "@type": "Organization", name: book?.author ?? "561 Group" };
  return {
    "@context": "https://schema.org",
    "@type": book ? "Book" : "Product",
    name: offering.title,
    ...offering.subtitle ? { alternativeHeadline: offering.subtitle } : {},
    ...offering.blurb ? { description: offering.blurb } : {},
    url: `${origin}${href}`,
    ...image ? { image: `${origin}${image}` } : {},
    ...book ? { bookFormat: "https://schema.org/EBook", author, ...book.publisher ? { publisher: { "@type": "Organization", name: book.publisher } } : {}, inLanguage: bookLanguageTag(book) } : {},
    ...book?.series ? { isPartOf: { "@type": "BookSeries", name: book.series.name }, position: book.series.number } : {},
    ...offer ? { offers: offer } : {}
  };
}
function storefrontItemFor(offering, { actions = [], cover, status } = {}) {
  let book = offering.book;
  return {
    id: offering.id,
    title: offering.title,
    eyebrow: book?.series ? `${book.series.name} \xB7 ${book.series.number}` : void 0,
    summary: offering.blurb ?? offering.subtitle ?? void 0,
    ...cover ? { image: { src: cover, alt: `Cover of ${offering.title}` } } : {},
    ...status ? { status } : {},
    facts: facts(offering),
    keywords: offering.keywords,
    facets: { kind: [book ? "book" : offering.line === "merch" ? "merch" : "other"], ...book?.series ? { series: [book.series.name] } : {} },
    detail: detailNodes(offering),
    actions
  };
}
function storefrontFacets(items) {
  let facets = [{ key: "kind", label: "Kinds", labels: KIND_LABELS }];
  return items.some((item) => item.facets.series) && facets.push({ key: "series", label: "Series" }), facets;
}

// node_modules/.pnpm/@red-cup-engineering+digital-goods-storefront-services-section@0.4.4_@types+node@26.6.5_e6ed1b776893307d5c9a924ac4aff885/node_modules/@red-cup-engineering/digital-goods-storefront-services-section/src/worker-runtime.mjs
function createPublicShopCatalog(catalog, { checkoutArmed = !1 } = {}) {
  if (typeof checkoutArmed != "boolean") throw new TypeError("checkoutArmed must be Boolean");
  let original = publicCatalog(catalog), ranked = prioritizeStorefrontOfferings(catalogModel(catalog, { checkoutArmed }).offerings), sourcePublicOfferings = new Map(original.offerings.map((offering) => [offering.id, offering])), readout = {
    ...original,
    offerings: ranked.map(({ id, buyable }) => ({
      ...sourcePublicOfferings.get(id),
      buyable
    }))
  }, body = JSON.stringify(readout), headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=60",
    "access-control-allow-origin": "*",
    "x-content-type-options": "nosniff"
  };
  return Object.freeze({
    readout,
    fetch(request) {
      if (!request || typeof request.method != "string") throw new TypeError("public Shop catalog requires an HTTP request");
      return request.method === "GET" ? new Response(body, { status: 200, headers }) : request.method === "HEAD" ? new Response(null, { status: 200, headers }) : request.method === "OPTIONS" ? new Response(null, { status: 204, headers: {
        ...headers,
        "access-control-allow-methods": "GET, HEAD, OPTIONS"
      } }) : new Response(null, { status: 405, headers: { ...headers, allow: "GET, HEAD, OPTIONS" } });
    }
  });
}
var PAID = /* @__PURE__ */ new Set(["live", "test-only"]), GIFT_ID2 = /^gift-[0-9a-f-]{36}$/u, MAX_API_BYTES = 16 * 1024, REFERENCE = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,199}$/u, RELEASE_KEY = "release", REVIEW_COPY_KEY = "review-copy";
function json3(value, status = 200) {
  return Response.json(value, { status, headers: { "cache-control": "no-store" } });
}
function stripeCatalog(catalog) {
  return { merchant: catalog.merchant, offerings: catalog.offerings.filter((offering) => PAID.has(offering.status)).map(stripeOfferingFor) };
}
function supportsStore2(store) {
  return store && ["recordCheckout", "getCheckout", "claimPayment", "getEntitlement"].every((name) => typeof store[name] == "function");
}
function supportsAccounts(store) {
  return supportsStore2(store) && ["grantEntitlement", "bindEntitlement", "listAccount", "listGrants", "revokeEntitlement"].every((name) => typeof store[name] == "function");
}
function validOrigin(value) {
  try {
    return new URL(value).origin === value && new URL(value).protocol === "https:";
  } catch {
    return !1;
  }
}
function safeName(value) {
  return typeof value == "string" && /^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(value);
}
async function sameSecret(given, expected) {
  if (typeof given != "string" || typeof expected != "string" || !expected) return !1;
  let encoder2 = new TextEncoder(), [a, b] = (await Promise.all([given, expected].map((value) => crypto.subtle.digest("SHA-256", encoder2.encode(value))))).map((digest2) => new Uint8Array(digest2)), difference = 0;
  for (let index2 = 0; index2 < a.length; index2 += 1) difference |= a[index2] ^ b[index2];
  return difference === 0;
}
async function referencedGiftId(grantedBy, reference) {
  let hex2 = [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${grantedBy}
${reference}`)))].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `gift-${hex2.slice(0, 8)}-${hex2.slice(8, 12)}-${hex2.slice(12, 16)}-${hex2.slice(16, 20)}-${hex2.slice(20, 32)}`;
}
function dated(value) {
  return typeof value == "string" ? value.slice(0, 10) : typeof value == "number" ? new Date(value * 1e3).toISOString().slice(0, 10) : null;
}
function admitted2(result) {
  if (result.status !== 302) return null;
  let headers = new Headers({ location: result.redirect, "cache-control": "no-store" });
  for (let cookie of result.cookies ?? []) headers.append("set-cookie", cookie);
  return new Response(null, { status: 302, headers });
}
function createDigitalGoodsStorefrontWorker({ catalog, origin, buyerActor, routes = {}, tokenTtlSeconds = 3600, storefront = {} }) {
  let publicBuyerCatalogs = /* @__PURE__ */ new Map();
  if (!validOrigin(origin)) throw new TypeError("origin must be a canonical https origin");
  if (typeof buyerActor != "string" || buyerActor.length === 0) throw new TypeError("buyerActor is required");
  let path = { catalog: "/", goods: "/goods/", checkout: "/checkout/", webhook: "/webhooks/stripe", thanks: "/thanks", download: "/download/", library: "/library", gifts: "/gifts", giftApi: "/api/gifts", reviewCopies: "/review-copies", reviewCopyApi: "/api/review-copies", mcp: "/mcp", signIn: "/oauth/login", callback: "/oauth/callback", signOut: "/oauth/logout", ...routes }, railCatalog = stripeCatalog(catalog), offering = (id) => catalog.offerings.find((candidate) => candidate.id === id), title = storefront.title ?? catalog.merchant?.name ?? "Storefront", armed = (env) => {
    let state = readiness({ env, catalog: railCatalog });
    return !!(supportsStore2(env.fulfillment) && env.goods && typeof env.goods.get == "function" && env.audit && typeof env.audit.record == "function" && typeof env.tokenSecret == "string" && env.tokenSecret.length > 0 && state.credential.present && state.webhookSecretPresent && state.customerContractTokenPresent);
  }, publicBuyerCatalogFor = (env) => {
    let checkoutArmed = armed(env ?? {});
    return publicBuyerCatalogs.has(checkoutArmed) || publicBuyerCatalogs.set(checkoutArmed, createPublicShopCatalog(catalog, { checkoutArmed })), publicBuyerCatalogs.get(checkoutArmed);
  }, shopMcp, shopMcpWhenRequested = () => shopMcp ??= Promise.resolve().then(() => (init_shop_mcp(), shop_mcp_exports)).then(
    ({ createShopMcpEndpoint: createShopMcpEndpoint2 }) => createShopMcpEndpoint2({
      origin,
      goodsPath: path.goods,
      sellerName: catalog.merchant.name,
      path: path.mcp,
      readPublicCatalog: ({ env }) => publicBuyerCatalogFor(env).readout
    })
  ), signIn = (env) => ({ ...env.accounts ?? {}, publicBaseUrl: origin, callbackPath: path.callback, admitEmail: () => !0, sessionCookie: "storefront_session", transactionCookie: "storefront_sign_in" }), signInOpen = (env) => resolveGoogleSettings(signIn(env)).configured && supportsAccounts(env.fulfillment), readerOf = (request, env) => signInOpen(env) ? identifyGoogle(signIn(env), request) : null, giftersOf = (env) => new Set((env.gifters ?? []).map(accountOf).filter(Boolean)), gifter = (reader, env) => !!reader && giftersOf(env).has(accountOf(reader.email));
  function navigation(context, current) {
    let { env, reader } = context.capabilities, here = `${context.url.pathname}${context.url.search}`;
    return [
      { href: path.catalog, label: "Books", current: current === "catalog" },
      ...reader ? [{ href: path.library, label: "Your library", current: current === "library" }] : signInOpen(env) ? [{ href: `${path.signIn}?return_to=${encodeURIComponent(here)}`, label: "Sign in" }] : [],
      ...gifter(reader, env) ? [{ href: path.gifts, label: "Gifts", current: current === "gifts" }] : [],
      ...reader ? [{ href: path.signOut, label: `Sign out (${reader.email})` }] : []
    ];
  }
  let footerHtml = storefront.footerHtml, page2 = (context, current, model, options) => tuftePage({ navigation: navigation(context, current), footerHtml, eyebrow: title, ...model }, options), message2 = (context, heading, text2, status = 200) => page2(context, null, { title: heading, tiles: [{ id: "message", title: heading, span: 12, content: text2 }] }, { status });
  async function downloadHref(entitlement, env) {
    let item = offering(entitlement.offeringId), expiresAt = Date.now() + tokenTtlSeconds * 1e3;
    return entitlement.kind === "review-copy" ? [{ label: "Download the review copy (EPUB)", href: `${path.download}${await issueDownloadToken({ secret: env.tokenSecret, offeringId: `${entitlement.offeringId}/${REVIEW_COPY_KEY}`, sessionId: entitlement.id, expiresAt })}` }] : item?.release ? [{ label: "Download EPUB and PDF", href: `${path.download}${await issueDownloadToken({ secret: env.tokenSecret, offeringId: `${item.id}/${RELEASE_KEY}`, sessionId: entitlement.id ?? entitlement.sessionId, expiresAt })}` }] : Promise.all((entitlement.goods ?? []).map(async (good) => ({ label: `Download ${good.name}`, href: `${path.download}${await issueDownloadToken({ secret: env.tokenSecret, offeringId: `${entitlement.offeringId}/${good.key}`, sessionId: entitlement.id ?? entitlement.sessionId, expiresAt })}` })));
  }
  function actionsFor(item, { env, owned, giving }) {
    let actions = [];
    return owned.has(item.id) && actions.push({ kind: "link", label: "In your library", href: path.library }), PAID.has(item.status) ? (item.buyable ? actions.push({ kind: "form", form: { action: `${path.checkout}${item.id}`, method: "post", submitters: [{ label: `Buy \u2014 ${displayPrice(item.priceCents, item.currency)}` }] } }) : actions.push({ kind: "unavailable", label: "Card checkout opens soon", reason: "card payments are not connected yet" }), item.agentOfferUrl && actions.push({ kind: "link", label: "Explore x402 offer", href: item.agentOfferUrl })) : item.status === "external" ? actions.push({ kind: "link", label: item.state[0].toUpperCase() + item.state.slice(1), href: item.externalUrl }) : item.status === "coming-soon" && actions.push({ kind: "unavailable", label: "Coming soon" }), giving && item.release && actions.push({ kind: "link", label: "Give this book", href: `${path.gifts}?offering=${encodeURIComponent(item.id)}` }), actions;
  }
  async function storefrontCatalog(context) {
    let { env, reader } = context.capabilities, owned = new Set(reader && supportsAccounts(env.fulfillment) ? (await env.fulfillment.listAccount(reader.email)).filter((entry) => entry.status === "active").map((entry) => entry.offeringId) : []), giving = gifter(reader, env), items = prioritizeStorefrontOfferings(catalogModel(catalog, { checkoutArmed: armed(env) }).offerings).map((item) => {
      let href = `${path.goods}${item.id}`;
      return { ...storefrontItemFor(item, { actions: actionsFor(item, { env, owned, giving }), cover: item.cover ?? void 0 }), metadata: {
        canonical: `${origin}${href}`,
        type: item.book ? "book" : "product",
        siteName: title,
        ...item.cover ? { image: `${origin}${item.cover}` } : {},
        structuredData: structuredDataFor(item, { origin, href, image: item.cover })
      } };
    });
    return {
      title,
      description: storefront.description,
      navigation: navigation(context, "catalog"),
      footerHtml,
      facets: storefrontFacets(items),
      items,
      metadata: { description: storefront.description, canonical: `${origin}${path.catalog}`, type: "website", siteName: title }
    };
  }
  async function checkout(context) {
    let { env, reader } = context.capabilities, id = context.params.id, item = offering(id);
    if (!item || !PAID.has(item.status)) return message2(context, "Not found", "No such offering.", 404);
    if (!armed(env)) return message2(context, "Not available yet", "Card checkout for this book opens once the shop's card payments are connected.", 409);
    let admittedRelease;
    if (item.release)
      try {
        admittedRelease = await admitPaidRelease(item.release, { goods: env.goods }, releaseExpectationFor(item));
      } catch {
        return message2(context, "Checkout unavailable", "The current edition is unavailable. Please try again later.", 503);
      }
    let customerReference = crypto.randomUUID(), solicitation = { "@context": "https://www.w3.org/ns/activitystreams", id: `${buyerActor}:checkout:${customerReference}`, type: "Offer", actor: buyerActor, target: ACTOR, object: { type: "ServiceSolicitation", request: { offeringId: id, quantity: 1, successUrl: `${origin}${path.thanks}?session_id={CHECKOUT_SESSION_ID}`, cancelUrl: `${origin}${path.goods}${id}`, customerReference } } }, offered = solicitCheckout(solicitation, { env, catalog: railCatalog });
    if (offered.type !== "Offer") return message2(context, "Checkout unavailable", "This book isn't available to buy yet.", 409);
    let accepted = await invokeCheckout({ "@context": solicitation["@context"], id: `${solicitation.id}:accept`, type: "Accept", actor: buyerActor, target: solicitation.target, object: { offer: offered } }, { env, catalog: railCatalog, store: env.audit });
    if (accepted.type !== "Accept") return message2(context, "Checkout unavailable", "We couldn't start checkout. Please try again later.", 502);
    let registration = await env.fulfillment.recordCheckout({ sessionId: accepted.object.stripeSessionId, offeringId: id, requestDigest: accepted.object.requestDigest, amountTotal: item.priceCents, currency: item.currency, stripeMode: accepted.object.stripeMode, goods: item.goods, release: item.release ?? null, admittedRelease: admittedRelease ?? null, account: reader ? accountOf(reader.email) : null, status: "open" });
    return !registration || registration.failed || !["registered", "duplicate"].includes(registration.disposition) ? message2(context, "Checkout unavailable", "We couldn't start checkout. Please try again later.", 503) : Response.redirect(accepted.object.checkoutUrl, 303);
  }
  async function entitlementTile(entitlement, env, { extraActions = [], note } = {}) {
    let item = offering(entitlement.offeringId), provenance = entitlement.kind === "review-copy" ? `A review copy${entitlement.createdAt ? ` given on ${dated(entitlement.createdAt)}` : ""}, readable until ${dated(entitlement.expiresAt)}` : entitlement.kind === "gift" ? `A gift${entitlement.createdAt ? ` on ${dated(entitlement.createdAt)}` : ""}${entitlement.note ? `: \u201C${entitlement.note}\u201D` : ""}` : `Bought${entitlement.createdAt ? ` on ${dated(entitlement.createdAt)}` : ""}`, standing = entitlement.kind === "review-copy" ? reviewCopyStanding(entitlement) : { deliverable: entitlement.status === "active", reason: "withdrawn" }, downloads = standing.deliverable ? (await downloadHref(entitlement, env)).map((link2) => ({ kind: "link", ...link2 })) : [{ kind: "unavailable", label: standing.reason === "expired" ? "Expired" : "Withdrawn" }];
    return storefrontItemTile({ id: `entitlement-${entitlement.id ?? entitlement.sessionId}`, title: item?.title ?? entitlement.offeringId, summary: note ?? provenance, ...item?.cover ? { image: { src: item.cover, alt: `Cover of ${item.title}` } } : {}, actions: [...downloads, ...item ? [{ kind: "link", label: "About this book", href: `${path.goods}${item.id}` }] : [], ...extraActions] });
  }
  async function thanks(context) {
    let { env, reader } = context.capabilities, sessionId = context.url.searchParams.get("session_id"), entitlement = sessionId && supportsStore2(env.fulfillment) ? await env.fulfillment.getEntitlement(sessionId) : null;
    if (!entitlement || entitlement.status !== "active") return message2(context, "Purchase not found", "We can't find a completed purchase for this link.", 404);
    if (!env.tokenSecret) return message2(context, "Unavailable", "Delivery is unavailable.", 503);
    let keep2 = entitlement.account ? [] : reader ? [{ kind: "form", form: { action: `${path.library}/keep`, method: "post", fields: [{ name: "session_id", kind: "hidden", value: sessionId }], submitters: [{ label: "Keep it in your library" }] } }] : signInOpen(env) ? [{ kind: "link", label: "Sign in to keep it in your library", href: `${path.signIn}?return_to=${encodeURIComponent(`${path.thanks}?session_id=${sessionId}`)}` }] : [];
    return page2(context, null, { title: "Thank you", tiles: [await entitlementTile(entitlement, env, { extraActions: keep2, note: "Your purchase is complete. These links last an hour; your library keeps the book for good." })] });
  }
  async function download(token4, env) {
    let verified = await verifyDownloadToken({ secret: env.tokenSecret ?? "", token: token4 });
    if (!verified.valid) return new Response("This download is no longer available", { status: 403 });
    let entitlement = supportsStore2(env.fulfillment) ? await env.fulfillment.getEntitlement(verified.sessionId) : null, [offeringId, key] = String(verified.offeringId).split(/\/(.*)/su);
    if (!entitlement || entitlement.status !== "active" || entitlement.offeringId !== offeringId) return new Response("This download is no longer available", { status: 403 });
    if (key === REVIEW_COPY_KEY && entitlement.kind === "review-copy")
      try {
        return await readReviewCopy(entitlement, { goods: env.goods });
      } catch {
        return new Response("This review copy is unavailable", { status: 403 });
      }
    let item = offering(offeringId);
    if (key === RELEASE_KEY && item?.release)
      try {
        return await readPaidRelease(item.release, { goods: env.goods }, releaseExpectationFor(item));
      } catch {
        return new Response("The download file is unavailable", { status: 503 });
      }
    let good = entitlement.goods?.find((candidate) => candidate.key === key);
    if (!good || !safeName(good.key)) return new Response("This download is no longer available", { status: 403 });
    let object = await env.goods.get(`goods/${offeringId}/${good.key}`);
    if (!object) return new Response("Not Found", { status: 404 });
    let bytes = new Uint8Array(await object.arrayBuffer());
    return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((byte) => byte.toString(16).padStart(2, "0")).join("") !== good.sha256 ? new Response("The download file is unavailable", { status: 503 }) : new Response(bytes, { headers: { "content-type": good.contentType, "content-length": String(bytes.byteLength), "content-disposition": `attachment; filename="${good.key}"`, "cache-control": "no-store" } });
  }
  let signInFirst = (context) => signInOpen(context.capabilities.env) ? tufteRedirect(`${path.signIn}?return_to=${encodeURIComponent(`${context.url.pathname}${context.url.search}`)}`) : message2(context, "Sign-in isn't open yet", "Reader accounts open once the shop's sign-in is connected. A gift link works without an account.", 503);
  async function library(context) {
    let { env, reader } = context.capabilities;
    if (!reader) return signInFirst(context);
    let entries = (await env.fulfillment.listAccount(reader.email)).filter((entry) => entry.status === "active"), tiles = await Promise.all(entries.map((entry) => entitlementTile(entry, env)));
    return page2(context, "library", { title: "Your library", subtitle: `Books kept for ${reader.email}. Each download is the newest accepted edition.`, tiles: tiles.length ? tiles : [{ id: "empty", title: "Nothing here yet", span: 12, content: "Books you buy while signed in, or keep from a receipt, and books given to this address appear here." }] });
  }
  async function keep(context) {
    let { env, reader } = context.capabilities;
    if (!reader) return signInFirst(context);
    let sessionId = (await context.input.formData()).get("session_id"), entitlement = typeof sessionId == "string" ? await env.fulfillment.getEntitlement(sessionId) : null;
    return !entitlement || entitlement.status !== "active" || ["gift", "review-copy"].includes(entitlement.kind) ? message2(context, "Purchase not found", "We can't find a completed purchase to keep.", 404) : (await env.fulfillment.bindEntitlement({ id: sessionId, account: reader.email })).failed ? message2(context, "Already kept", "This purchase is already in another account's library.", 409) : tufteRedirect(path.library);
  }
  let giftable = () => catalog.offerings.filter((item) => item.release && item.status !== "coming-soon");
  async function gifts(context) {
    let { env, reader } = context.capabilities;
    if (!reader) return signInFirst(context);
    if (!gifter(reader, env)) return message2(context, "Not a gifter", "This account can't give books.", 403);
    let chosen = context.url.searchParams.get("offering"), form = { id: "give", title: "Give a book", span: 12, form: { action: path.gifts, method: "post", fields: [
      { name: "offering", label: "Book", kind: "select", value: giftable().some((item) => item.id === chosen) ? chosen : "", options: giftable().map((item) => ({ value: item.id, label: item.title })) },
      { name: "email", label: "Recipient's email", kind: "email", description: "They keep the book by signing in with the Google account for this address. The gift link works for them straight away." },
      { name: "note", label: "Note", kind: "textarea", description: "Shown to them with the book." }
    ], submitters: [{ label: "Give this book" }] } }, given = (await env.fulfillment.listGrants(reader.email)).sort((left, right) => String(right.createdAt).localeCompare(String(left.createdAt))), tiles = await Promise.all(given.map((entry) => entitlementTile(entry, env, { note: `To ${entry.recipientEmail}${entry.createdAt ? ` on ${dated(entry.createdAt)}` : ""}${entry.status === "active" ? "" : " (withdrawn)"}`, extraActions: [
      { kind: "link", label: "Gift link", href: `${path.gifts}/${entry.id}` },
      ...entry.status === "active" ? [{ kind: "form", form: { action: `${path.gifts}/${entry.id}/revoke`, method: "post", submitters: [{ label: "Withdraw" }] } }] : []
    ] })));
    return page2(context, "gifts", { title: "Gifts", tiles: [form, ...tiles] });
  }
  async function give(context) {
    let { env, reader } = context.capabilities;
    if (!reader) return signInFirst(context);
    if (!gifter(reader, env)) return message2(context, "Not a gifter", "This account can't give books.", 403);
    let fields = await context.input.formData(), item = giftable().find((candidate) => candidate.id === fields.get("offering")), recipient = accountOf(fields.get("email"));
    if (!item || !recipient) return message2(context, "Gift not given", "Choose a book and give a valid email address.", 400);
    let id = `gift-${crypto.randomUUID()}`;
    return (await env.fulfillment.grantEntitlement({ id, offeringId: item.id, release: item.release, recipientEmail: recipient, grantedBy: reader.email, note: String(fields.get("note") ?? "").trim(), createdAt: (/* @__PURE__ */ new Date()).toISOString() })).failed ? message2(context, "Gift not given", "The gift couldn't be recorded. Please try again.", 503) : tufteRedirect(`${path.gifts}/${id}`);
  }
  async function withdraw(context) {
    let { env, reader } = context.capabilities;
    return reader ? !gifter(reader, env) || !GIFT_ID2.test(context.params.id) || (await env.fulfillment.revokeEntitlement({ id: context.params.id, grantedBy: reader.email, reason: "withdrawn by the giver", revokedAt: (/* @__PURE__ */ new Date()).toISOString() })).failed ? message2(context, "Not found", "No such gift.", 404) : tufteRedirect(path.gifts) : signInFirst(context);
  }
  async function gift(context) {
    let { env, reader } = context.capabilities, id = context.params.id, entitlement = GIFT_ID2.test(id) && supportsAccounts(env.fulfillment) ? await env.fulfillment.getEntitlement(id) : null;
    if (!entitlement || entitlement.kind !== "gift") return message2(context, "Gift not found", "This gift link doesn't name a gift.", 404);
    if (entitlement.status !== "active") return message2(context, "Gift withdrawn", "This gift link has been withdrawn.", 410);
    let signedInAs = accountOf(reader?.email), hint = signedInAs === entitlement.recipientEmail ? "It's in your library." : `It's addressed to ${entitlement.recipientEmail}. ${signInOpen(env) ? "Sign in with that Google account to keep it in your library." : "Keep this link to download it again."}`, tiles = [await entitlementTile(entitlement, env, { note: `${entitlement.note ? `\u201C${entitlement.note}\u201D ` : ""}${hint}`, extraActions: signedInAs || !signInOpen(env) ? [] : [{ kind: "link", label: "Sign in", href: `${path.signIn}?return_to=${encodeURIComponent(path.library)}` }] })];
    return gifter(reader, env) && entitlement.grantedBy === signedInAs && tiles.unshift({ id: "share", title: "Send this link", span: 12, content: `Send ${origin}${path.gifts}/${id} to ${entitlement.recipientEmail}. Anyone holding the link can download the book, so send it only to them.` }), page2(context, null, { title: `A gift: ${offering(entitlement.offeringId)?.title ?? "a book"}`, metadata: { robots: "noindex" }, tiles });
  }
  async function reviewCopy(context) {
    let { env, reader } = context.capabilities, id = context.params.id, entitlement = REVIEW_COPY_ID.test(id) && supportsAccounts(env.fulfillment) ? await env.fulfillment.getEntitlement(id) : null;
    if (!entitlement || entitlement.kind !== "review-copy") return message2(context, "Review copy not found", "This link doesn't name a review copy.", 404);
    let standing = reviewCopyStanding(entitlement);
    if (!standing.deliverable) return message2(context, standing.reason === "expired" ? "Review copy expired" : "Review copy withdrawn", standing.reason === "expired" ? `This review copy could be downloaded until ${dated(entitlement.expiresAt)}.` : "This review copy has been withdrawn.", 410);
    let signedInAs = accountOf(reader?.email), terms = "A review is welcome and never required. If you post one, please say you received a free copy. This copy is marked for you; please don't share it.", hint = signedInAs === entitlement.recipientEmail ? "It's in your library." : `It's addressed to ${entitlement.recipientEmail}. ${signInOpen(env) ? "Sign in with that Google account to keep it in your library." : "Keep this link to download it again."}`, tiles = [await entitlementTile(entitlement, env, { note: `${terms} ${hint}`, extraActions: signedInAs || !signInOpen(env) ? [] : [{ kind: "link", label: "Sign in", href: `${path.signIn}?return_to=${encodeURIComponent(path.library)}` }] })];
    return page2(context, null, { title: `A review copy: ${offering(entitlement.offeringId)?.title ?? "a book"}`, metadata: { robots: "noindex" }, tiles });
  }
  async function authorizedAgent(request, env, api) {
    let agent = env.giftAgent, as = accountOf(agent?.as);
    return !agent?.key || !as || !supportsAccounts(env.fulfillment) ? { refusal: json3({ error: `the ${api} API is not configured` }, 503) } : await sameSecret((request.headers.get("authorization") ?? "").replace(/^Bearer\s+/iu, ""), agent.key) ? { as } : { refusal: json3({ error: "unauthorized" }, 401) };
  }
  async function agentBody(request) {
    let text2 = await request.text();
    if (new TextEncoder().encode(text2).length > MAX_API_BYTES) return null;
    try {
      return text2 ? JSON.parse(text2) : {};
    } catch {
      return null;
    }
  }
  async function giftApi(request, env, rest) {
    let { as, refusal } = await authorizedAgent(request, env, "gift");
    if (refusal) return refusal;
    let body = () => agentBody(request);
    if (rest === "" && request.method === "GET") return json3({ giftable: giftable().map((item) => ({ id: item.id, title: item.title })) });
    if (rest === "" && request.method === "POST") {
      let input = await body(), item = giftable().find((candidate) => candidate.id === input?.offering), recipient = accountOf(input?.email);
      if (!item || !recipient) return json3({ error: "a gift needs a giftable offering and a valid email" }, 400);
      if (input.reference !== void 0 && !REFERENCE.test(String(input.reference))) return json3({ error: "a reference is up to 200 letters, digits and ._:/-" }, 400);
      let id2 = input.reference ? await referencedGiftId(as, input.reference) : `gift-${crypto.randomUUID()}`, granted = await env.fulfillment.grantEntitlement({ id: id2, offeringId: item.id, release: item.release, recipientEmail: recipient, grantedBy: as, note: String(input.note ?? "").trim(), createdAt: (/* @__PURE__ */ new Date()).toISOString() });
      if (granted.failed && granted.disposition !== "duplicate") return json3({ error: "the gift could not be recorded" }, 503);
      if (granted.disposition === "duplicate") {
        let existing = await env.fulfillment.getEntitlement(id2);
        if (!existing || existing.kind !== "gift" || existing.grantedBy !== as || existing.offeringId !== item.id || existing.recipientEmail !== recipient)
          return json3({ error: "the reference already belongs to another gift" }, 409);
        if (existing.status !== "active") return json3({ error: "the referenced gift was withdrawn" }, 410);
      }
      return json3({ id: id2, url: `${origin}${path.gifts}/${id2}`, offering: item.id, disposition: granted.disposition ?? "granted" }, granted.disposition === "duplicate" ? 200 : 201);
    }
    let [id, action] = rest.slice(1).split("/");
    if (!GIFT_ID2.test(id ?? "")) return json3({ error: "not found" }, 404);
    let entitlement = await env.fulfillment.getEntitlement(id);
    if (!entitlement || entitlement.kind !== "gift" || entitlement.grantedBy !== as) return json3({ error: "not found" }, 404);
    if (!action && request.method === "GET") return json3({ id, offering: entitlement.offeringId, status: entitlement.status, createdAt: entitlement.createdAt, revokedAt: entitlement.revokedAt ?? null });
    if (action === "revoke" && request.method === "POST") {
      let input = await body(), revoked = await env.fulfillment.revokeEntitlement({ id, grantedBy: as, reason: String(input?.reason ?? "withdrawn by the giver").slice(0, 200), revokedAt: (/* @__PURE__ */ new Date()).toISOString() });
      return json3({ id, disposition: revoked.failed ? "unknown" : "revoked" }, revoked.failed ? 404 : 200);
    }
    return json3({ error: "not found" }, 404);
  }
  async function reviewCopyApi(request, env, rest) {
    let { as, refusal } = await authorizedAgent(request, env, "review-copy");
    if (refusal) return refusal;
    if (rest === "" && request.method === "POST") {
      let input = await agentBody(request), item = offering(input?.offering), recipient = accountOf(input?.email);
      if (!item || !recipient || !REVIEW_COPY_ID.test(input?.id ?? "")) return json3({ error: "a review copy needs an offering, a valid email and a review-<uuid> id" }, 400);
      let edition = item.book?.edition?.digest;
      if (edition && input.release !== edition) return json3({ error: "a review copy is a rendition of the offering's accepted edition" }, 400);
      let pointer;
      try {
        let object = await env.goods?.get(reviewCopyPointerKey(item.id, input.id));
        pointer = object ? admitReviewCopyPointer(JSON.parse(await object.text()), item.id, input.id) : null;
      } catch {
        pointer = null;
      }
      if (!pointer || pointer.release !== input.release || pointer.bundle.sha256 !== input.artifactSha256) return json3({ error: "stage the stamped copy under this grant before recording it" }, 409);
      let granted = await env.fulfillment.grantEntitlement({ kind: "review-copy", id: input.id, offeringId: item.id, release: input.release, artifactSha256: input.artifactSha256, expiresAt: input.expiresAt, recipientEmail: recipient, grantedBy: as, note: String(input.note ?? "").trim(), createdAt: (/* @__PURE__ */ new Date()).toISOString() });
      return granted.failed && granted.disposition !== "duplicate" ? json3({ error: granted.disposition === "rejected" ? "the review copy is malformed" : "the review copy could not be recorded" }, granted.disposition === "rejected" ? 400 : 503) : json3({ id: input.id, url: `${origin}${path.reviewCopies}/${input.id}`, offering: item.id, disposition: granted.disposition ?? "granted" }, granted.disposition === "duplicate" ? 200 : 201);
    }
    let [id, action] = rest.slice(1).split("/");
    if (!REVIEW_COPY_ID.test(id ?? "")) return json3({ error: "not found" }, 404);
    let entitlement = await env.fulfillment.getEntitlement(id);
    if (!entitlement || entitlement.kind !== "review-copy" || entitlement.grantedBy !== as) return json3({ error: "not found" }, 404);
    if (!action && request.method === "GET") return json3({ id, offering: entitlement.offeringId, status: entitlement.status, expiresAt: entitlement.expiresAt, createdAt: entitlement.createdAt, revokedAt: entitlement.revokedAt ?? null });
    if (action === "revoke" && request.method === "POST") {
      let input = await agentBody(request), revoked = await env.fulfillment.revokeEntitlement({ id, grantedBy: as, reason: String(input?.reason ?? "withdrawn by the publisher").slice(0, 200), revokedAt: (/* @__PURE__ */ new Date()).toISOString() });
      return json3({ id, disposition: revoked.failed ? "unknown" : "revoked" }, revoked.failed ? 404 : 200);
    }
    return json3({ error: "not found" }, 404);
  }
  function beginSignIn(context) {
    let { env } = context.capabilities;
    return signInOpen(env) ? admitted2(beginGoogleLogin(signIn(env), context.url)) ?? message2(context, "Sign-in unavailable", "Sign-in couldn't start. Please try again later.", 503) : signInFirst(context);
  }
  async function finishSignIn(context) {
    let { env } = context.capabilities, result = await completeGoogleLogin(signIn(env), context.request, context.url);
    return admitted2(result) ?? message2(context, "Sign-in didn't finish", result.error === "login-expired" ? "The sign-in took too long. Please try again." : "Google didn't confirm a verified email address. Please try again.", result.status >= 500 ? 502 : 400);
  }
  let signOut = (context) => admitted2(googleLogout(signIn(context.capabilities.env))), application = createTufteStorefront({
    catalog: storefrontCatalog,
    path: path.catalog,
    itemPath: `${path.goods}:id`,
    document: { language: "en" },
    pages: [
      { match: path.thanks, load: thanks },
      { match: path.library, load: library },
      { match: path.gifts, load: gifts },
      { match: `${path.gifts}/:id`, load: gift },
      { match: `${path.reviewCopies}/:id`, load: reviewCopy },
      { match: path.signIn, load: beginSignIn },
      { match: path.callback, load: finishSignIn },
      { match: path.signOut, load: signOut }
    ],
    actions: [
      { match: `${path.checkout}:id`, run: checkout },
      { match: `${path.library}/keep`, run: keep },
      { match: path.gifts, run: give },
      { match: `${path.gifts}/:id/revoke`, run: withdraw }
    ]
  });
  return { catalog, async fetch(request, env) {
    let url = new URL(request.url);
    return url.pathname === "/catalog.json" ? publicBuyerCatalogFor(env).fetch(request) : url.pathname === path.mcp ? (await shopMcpWhenRequested()).handler({ request, env }) : request.method === "POST" && url.pathname === path.webhook ? fulfillStripeCheckoutWebhook(request, env) : request.method === "GET" && url.pathname.startsWith(path.download) ? download(url.pathname.slice(path.download.length), env) : url.pathname === path.giftApi || url.pathname.startsWith(`${path.giftApi}/`) ? giftApi(request, env, url.pathname.slice(path.giftApi.length)) : url.pathname === path.reviewCopyApi || url.pathname.startsWith(`${path.reviewCopyApi}/`) ? reviewCopyApi(request, env, url.pathname.slice(path.reviewCopyApi.length)) : application.fetch(request, { capabilities: { env, reader: readerOf(request, env) } });
  } };
}

// src/compiled-catalog.mjs
var compiled_catalog_default = {
  merchant: {
    name: "561 Group",
    legalBody: "561 Group"
  },
  offerings: [
    {
      id: "understanding-infection-associated-chronic-illness",
      line: "@561-group/health-education-curriculum-services-section",
      status: "coming-soon",
      priceCents: 900,
      currency: "usd",
      release: "understanding-infection-associated-chronic-illness",
      title: "Understanding Infection-Associated Chronic Illness",
      subtitle: "A Public Guide to Long COVID, Post-Exertional Malaise, and the Science Behind the Diagnosis",
      blurb: "A public guide to Long COVID, post-exertional malaise, and infection-associated chronic illness: what is established, what is a well-supported hypothesis, and what remains contested. This is educational material, not medical advice.",
      keywords: [
        "Long COVID",
        "post-exertional malaise",
        "ME/CFS",
        "pacing",
        "chronic fatigue",
        "post-viral illness",
        "infection-associated chronic illness"
      ],
      cover: "/covers/understanding-infection-associated-chronic-illness.png",
      book: {
        author: "Culvert Health",
        publisher: "Causeway Services",
        authorship: "This book was written by AI agents working for the 561 Group and proofread by a separate AI agent. Culvert Health, whose name it bears, is the health division of Causeway Services.",
        subjects: [
          "HEA000000",
          "MED000000",
          "SCI000000"
        ],
        coverFile: "science-services-section/services/natural-science-services-section/services/biological-science-services-section/services/medical-science-services-section/data/state/editions/understanding-infection-associated-chronic-illness/understanding-infection-associated-chronic-illness-cover.png",
        marks: [],
        contents: [
          "About this book",
          "Chapter 1: What Infection-Associated Chronic Illness Is",
          "Chapter 2: Long COVID \u2014 Definitions and Why They Disagree",
          "Chapter 3: What Researchers Think Is Happening",
          "Chapter 4: Post-Exertional Malaise and Pacing",
          "Chapter 5: How to Read Research About Your Own Illness"
        ],
        edition: {
          digest: "ni:///sha-256;DrndM4sDovHlmwFMjionFoRpNaOxesWMfrg_IlQ5wn4",
          acceptedAt: "2026-09-30T02:11:25.444Z",
          pages: 57,
          proof: {
            errors: 6,
            corrections: 17,
            notes: 7,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 167912,
              sha256: "a6ffcdc9f457e828ea07a20bf444e1c4456b7131c88343c194f965471b24ec81",
              path: "science-services-section/services/natural-science-services-section/services/biological-science-services-section/services/medical-science-services-section/data/state/editions/understanding-infection-associated-chronic-illness/understanding-infection-associated-chronic-illness.epub"
            },
            {
              format: "PDF",
              bytes: 219403,
              sha256: "f4ac5ab05eac49f6b007112d65db94d960050e412bfb2403c1357eb90c3e649e",
              path: "science-services-section/services/natural-science-services-section/services/biological-science-services-section/services/medical-science-services-section/data/state/editions/understanding-infection-associated-chronic-illness/understanding-infection-associated-chronic-illness.pdf"
            }
          ],
          record: "science-services-section/services/natural-science-services-section/services/biological-science-services-section/services/medical-science-services-section/data/records/editions/2026-09-30-understanding-infection-associated-chronic-illness-first-edition-acceptance.json"
        },
        manuscript: "science-services-section/services/natural-science-services-section/services/biological-science-services-section/services/medical-science-services-section/content/books/understanding-infection-associated-chronic-illness"
      }
    },
    {
      id: "the-agent-operators-handbook",
      line: "@561-group/artificial-intelligence-curriculum-enterprise",
      status: "coming-soon",
      priceCents: 1200,
      currency: "usd",
      release: "agent-operators-handbook",
      title: "The Agent Operator's Handbook",
      subtitle: "A Field Guide to Dispatching, Steering, and Recovering Multiple AI Coding Agents at Once",
      blurb: "A field guide to operating several AI coding agents at once: writing the complete brief, when to split work and when not to, steering a running agent, recovering an interrupted one, and reading its report.",
      keywords: [
        "AI coding agents",
        "agentic coding",
        "AI pair programming",
        "multi-agent workflow",
        "prompt engineering",
        "software engineering workflow",
        "developer productivity"
      ],
      cover: "/covers/the-agent-operators-handbook.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        authorship: "This book was written by AI agents working for the 561 Group and proofread by a separate AI agent.",
        subjects: [
          "COM004000",
          "COM051230",
          "COM100000"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/services/artificial-intelligence-education-services-section/services/artificial-intelligence-curriculum-enterprise/data/state/editions/the-agent-operators-handbook/the-agent-operators-handbook-cover.png",
        marks: [
          "Claude Code",
          "Codex",
          "Claude",
          "OpenAI",
          "Anthropic"
        ],
        contents: [
          "About this book",
          "Chapter 1: The Complete Brief",
          "Chapter 2: The Fan-Out Anti-Pattern",
          "Chapter 3: Steering a Running Agent",
          "Chapter 4: Recovering an Interrupted Commission",
          "Chapter 5: Receiving a Report",
          "Chapter 6: Receipts as Inter-Session Memory",
          "Chapter 7: Case Study \u2014 From Collision to Coordination",
          "Chapter 8: Building Your Own Operating Discipline",
          "Chapter 9: Field Diagnoses \u2014 Common Situations, Quickly Placed",
          "Chapter 10: Scaling This Discipline to a Team",
          "Glossary",
          "Appendix: Five Templates"
        ],
        edition: {
          digest: "ni:///sha-256;d7xgAJVknJhrMOSoQmdKG3xQjmyEsdZ7T7fB1PuBku8",
          acceptedAt: "2026-09-30T01:49:14.677Z",
          pages: 62,
          proof: {
            errors: 0,
            corrections: 6,
            notes: 9,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 152222,
              sha256: "bf04217cc5ab2906f2eb00a6938bddc6285f3695cfc2794f607fa20911069283",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/services/artificial-intelligence-education-services-section/services/artificial-intelligence-curriculum-enterprise/data/state/editions/the-agent-operators-handbook/the-agent-operators-handbook.epub"
            },
            {
              format: "PDF",
              bytes: 202099,
              sha256: "65fcffdb30f6cbd3d451ce37598a61dcca250b69adbbd0b5beffefa87f8ea525",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/services/artificial-intelligence-education-services-section/services/artificial-intelligence-curriculum-enterprise/data/state/editions/the-agent-operators-handbook/the-agent-operators-handbook.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/services/artificial-intelligence-education-services-section/services/artificial-intelligence-curriculum-enterprise/data/records/editions/2026-09-30-the-agent-operators-handbook-first-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/services/artificial-intelligence-education-services-section/services/artificial-intelligence-curriculum-enterprise/content/books/the-agent-operators-handbook"
      }
    },
    {
      id: "the-x402-economy",
      line: "561-group-services-section",
      status: "live",
      priceCents: 900,
      currency: "usd",
      release: "the-x402-economy",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3B-2a0jEZ7cWENXeYPs3xdboD6wd_xuNqgL1wVbZqQDK4",
      title: "The x402 Economy",
      subtitle: "How the Web's Unused Payment Code Became a Way for Software to Pay, and What It Has Earned So Far",
      blurb: "How the web\u2019s unused payment code became a way for software to pay, and what it has earned so far: HTTP 402\u2019s history, one paid request step by step, who governs x402, its rivals, the market measurements, security and US law.",
      keywords: [
        "x402",
        "stablecoins",
        "agent payments",
        "HTTP 402",
        "machine payments",
        "API monetization",
        "crypto payments"
      ],
      cover: "/covers/the-x402-economy.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        subjects: [
          "BUS090000",
          "BUS114000",
          "COM060180"
        ],
        coverFile: "public-services-section/services/public-economic-services-section/data/state/editions/the-x402-economy/the-x402-economy-cover.png",
        marks: [],
        contents: [
          "About this book",
          "Payment Required",
          "One Request, One Payment",
          "Why Now",
          "Who Built It, and Who Governs It",
          "The Other Rails",
          "Counting the Market",
          "Selling to Machines",
          "Buying as a Machine",
          "What Can Go Wrong",
          "The Law",
          "What Would Have to Be True",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;VrNUMIDVQk7pxREEVzFa9I0ge1pOaGfFS8sx8vJRjbw",
          acceptedAt: "2026-09-30T01:19:00.849Z",
          pages: 63,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 2,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 132833,
              sha256: "a9fc32125cadb4baacf0f87c48edae1f9645cc50bdb9b6b7518d976c9ee209d6",
              path: "public-services-section/services/public-economic-services-section/data/state/editions/the-x402-economy/the-x402-economy.epub"
            },
            {
              format: "PDF",
              bytes: 192790,
              sha256: "84a155521a1f9070fac32f868b7b22fd2f854f7c2ae856c02f0aa29ecd3d2a2e",
              path: "public-services-section/services/public-economic-services-section/data/state/editions/the-x402-economy/the-x402-economy.pdf"
            }
          ],
          record: "public-services-section/services/public-economic-services-section/data/records/editions/2026-09-30-the-x402-economy-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-economic-services-section/content/books/the-x402-economy"
      }
    },
    {
      id: "project-management-course-by-course",
      line: "561-group-services-section",
      status: "live",
      priceCents: 900,
      currency: "usd",
      release: "project-management-course-by-course",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3BCZy4itE60Trpyf_oX_6e2Bd_zgspAi6YFT8zXuYruNA",
      title: "Project Management, Course by Course",
      subtitle: "An Independent Study Companion for Entry-Level Project Management Certificate Courses",
      blurb: "A study companion to Google\u2019s Project Management Certificate: one chapter per course, self-checks with answers, and a guide to the capstone. Independent of Google and Coursera.",
      keywords: [
        "project management",
        "Google certificate",
        "Coursera",
        "study guide",
        "project management certificate",
        "agile and scrum",
        "project planning",
        "exam prep",
        "career change"
      ],
      cover: "/covers/project-management-course-by-course.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 1
        },
        profile: "study-guide",
        subjects: [
          "BUS101000",
          "STU021000",
          "BUS012030"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/project-management-course-by-course/project-management-course-by-course-cover.png",
        marks: [
          "Google",
          "Coursera"
        ],
        contents: [
          "About this book",
          "Foundations: what a project is and what its manager does",
          "Initiation: goals, scope, stakeholders and the charter",
          "Planning I: from scope to schedule",
          "Planning II: budget, procurement, risk and communication",
          "Execution I: tracking, change and quality",
          "Execution II: leading the team, communicating and closing",
          "Agile I: values, principles and the Scrum team",
          "Agile II: backlog, sprints, Kanban and Agile in the organization",
          "The capstone: building a portfolio of project artifacts",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;Yrt5q6LR8iyK2uQkqhn0aNtc_hXkTY54Jxokubl7kLw",
          acceptedAt: "2026-09-30T01:19:16.597Z",
          pages: 82,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 3,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 171410,
              sha256: "65f69909eefc9d3fb0778a56f105f8f02cfa8ecedf0ba2ee7f0a83ff445115c8",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/project-management-course-by-course/project-management-course-by-course.epub"
            },
            {
              format: "PDF",
              bytes: 256149,
              sha256: "f726e598198aebc4a45b2a28e748b624744432a35df150db88cab82805e2276f",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/project-management-course-by-course/project-management-course-by-course.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/records/editions/2026-09-30-project-management-course-by-course-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/content/books/project-management-course-by-course"
      }
    },
    {
      id: "the-capm-domain-by-domain",
      line: "561-group-services-section",
      status: "live",
      priceCents: 1200,
      currency: "usd",
      release: "the-capm-domain-by-domain",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3BCvLp1ukgCv1h9JS1ZTh1RJ1yDdwrNvIJf_WO9Iq-iEk",
      title: "Project Management Fundamentals, Domain by Domain",
      subtitle: "An Independent Study Companion for the Entry-Level Project Management Certification Exam",
      blurb: "A study companion to PMI\u2019s CAPM exam that follows the 2023 outline task by task and ends with a 40-question practice exam. Independent of PMI.",
      keywords: [
        "CAPM",
        "PMI",
        "project management",
        "exam prep",
        "project management certification",
        "agile and scrum",
        "practice questions",
        "study guide",
        "entry-level project manager"
      ],
      cover: "/covers/the-capm-domain-by-domain.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 2
        },
        profile: "study-guide",
        subjects: [
          "BUS101000",
          "STU021000",
          "BUS012030"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/the-capm-domain-by-domain/the-capm-domain-by-domain-cover.png",
        marks: [
          "PMI",
          "CAPM",
          "Certified Associate in Project Management",
          "Project Management Institute"
        ],
        contents: [
          "About this book",
          "Domain 1, part 1: projects, life cycles and processes",
          "Domain 1, part 2: planning, roles, following the plan and solving problems",
          "Domain 2: predictive, plan-based methods",
          "Domain 3: Agile frameworks and methods",
          "Domain 4, part 1: business analysis roles, communication and requirements",
          "Domain 4, part 2: roadmaps, methods and validating requirements",
          "A practice exam",
          "Formulas and lists to know",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;KTLeetKYqd2HBOwRiTO1EX0qlvfSmlIKKls0mafVoYA",
          acceptedAt: "2026-09-30T01:19:27.065Z",
          pages: 82,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 4,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 190538,
              sha256: "31bba37acad286c5c5dffc272b364da4597c3383d3f0993c6a1e80580d71983f",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/the-capm-domain-by-domain/the-capm-domain-by-domain.epub"
            },
            {
              format: "PDF",
              bytes: 241218,
              sha256: "335d2e733bb2feffde741c861688639c4bede9e4b1cccc0be916c219bfba4090",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/the-capm-domain-by-domain/the-capm-domain-by-domain.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/records/editions/2026-09-30-the-capm-domain-by-domain-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/content/books/the-capm-domain-by-domain"
      }
    },
    {
      id: "data-analytics-course-by-course",
      line: "561-group-services-section",
      status: "live",
      priceCents: 900,
      currency: "usd",
      release: "data-analytics-course-by-course",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3BItsDC1opfeUaN0K63RZXgjPxI0HV8RteGTIh_y2vqoo",
      title: "Data Analytics, Course by Course",
      subtitle: "An Independent Study Companion for Entry-Level Data Analytics Certificate Courses",
      blurb: "A study companion to Google\u2019s Data Analytics Certificate: spreadsheets, SQL, Tableau and Python, with tested code and answered self-checks. Independent of Google and Coursera.",
      keywords: [
        "data analytics",
        "SQL",
        "Python",
        "Google certificate",
        "study guide",
        "data analyst certificate",
        "spreadsheets",
        "Tableau",
        "career change"
      ],
      cover: "/covers/data-analytics-course-by-course.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 3
        },
        profile: "study-guide",
        subjects: [
          "COM021030",
          "STU021000",
          "BUS012030"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/data-analytics-course-by-course/data-analytics-course-by-course-cover.png",
        marks: [
          "Google",
          "Coursera"
        ],
        contents: [
          "About this book",
          "Foundations: data, analysis and the analyst's work",
          "Ask: questions, decisions, spreadsheets and stakeholders",
          "Prepare: collecting, judging and organizing data",
          "Process: integrity, sampling and cleaning",
          "Analyze: organizing, combining, aggregating and calculating",
          "Share: visualizations, dashboards and data stories",
          "Python: the analysis as a program",
          "The case study: a portfolio piece from start to finish",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;QqXkBzuCLPCC2vy1uaAkwaZ5805sz8MQOYJFNU7pKQA",
          acceptedAt: "2026-09-30T01:19:36.084Z",
          pages: 62,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 2,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 151111,
              sha256: "5380536ca3786b4b83fe24c6db90edf45fb1febf7184ab816a5352860b079d47",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/data-analytics-course-by-course/data-analytics-course-by-course.epub"
            },
            {
              format: "PDF",
              bytes: 243253,
              sha256: "408838b00e20f503818a50af6d4d87f3d2808d1e90e28fc75671cf52c44bf37e",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/data-analytics-course-by-course/data-analytics-course-by-course.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/records/editions/2026-09-30-data-analytics-course-by-course-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/content/books/data-analytics-course-by-course"
      }
    },
    {
      id: "ux-design-course-by-course",
      line: "561-group-services-section",
      status: "live",
      priceCents: 900,
      currency: "usd",
      release: "ux-design-course-by-course",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3BY_8aL-DaA1gWTjRBL08tgal_Eet-hUN4N9Ohvm4fuR8",
      title: "UX Design, Course by Course",
      subtitle: "An Independent Study Companion for Entry-Level UX Design Certificate Courses",
      blurb: "A study companion to Google\u2019s UX Design Certificate: the design process from its sources, accessibility throughout, and a portfolio guide. Independent of Google and Coursera.",
      keywords: [
        "UX design",
        "accessibility",
        "Google certificate",
        "study guide",
        "UX design certificate",
        "user research",
        "wireframes and prototypes",
        "career change"
      ],
      cover: "/covers/ux-design-course-by-course.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 4
        },
        profile: "study-guide",
        subjects: [
          "COM079010",
          "COM070000",
          "STU021000"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/ux-design-course-by-course/ux-design-course-by-course-cover.png",
        marks: [
          "Google",
          "Coursera"
        ],
        contents: [
          "About this book",
          "Foundations: users, the design process and design sprints",
          "Empathize and define: understanding users and their problems",
          "Ideate: competitive audits and generating solutions",
          "Wireframes and low-fidelity prototypes",
          "Research and testing: usability studies and insights",
          "High fidelity: visual design, design systems and handoff",
          "Responsive websites: layouts, breakpoints and structure",
          "Designing for social good across devices, and the portfolio",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;Tz4Lq8ElAOA_7Xe3SA7mJgXz_nrskT32PbL7-CwJY38",
          acceptedAt: "2026-09-30T01:19:45.661Z",
          pages: 66,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 2,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 143017,
              sha256: "d854af788ed428b5f9e5d9f382a82724aa1f296cec30bdd164e6283cbd081722",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/ux-design-course-by-course/ux-design-course-by-course.epub"
            },
            {
              format: "PDF",
              bytes: 201306,
              sha256: "7d13baf16273cc68137c6492278ecd133d4abe97f695a4daad550b7c34897c16",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/state/editions/ux-design-course-by-course/ux-design-course-by-course.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/data/records/editions/2026-09-30-ux-design-course-by-course-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-computer-education-services-section/content/books/ux-design-course-by-course"
      }
    },
    {
      id: "business-management-course-by-course",
      line: "561-group-services-section",
      status: "live",
      priceCents: 1200,
      currency: "usd",
      release: "business-management-course-by-course",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3BymPydIkNHFvvHMYwhPnhZNml1PjGdapWpD7jo4CsPtY",
      title: "Business Management, Course by Course",
      subtitle: "An Independent Study Companion for Online Business Management Certificate Courses",
      blurb: "A study companion to Cornell\u2019s Business Management Essentials certificate: finance, marketing, strategy, organizing and leading. Independent of Cornell.",
      keywords: [
        "business management",
        "eCornell",
        "study guide",
        "management certificate",
        "leadership",
        "business fundamentals",
        "career development"
      ],
      cover: "/covers/business-management-course-by-course.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 5
        },
        profile: "study-guide",
        subjects: [
          "BUS041000",
          "STU021000",
          "BUS071000"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-management-course-by-course/business-management-course-by-course-cover.png",
        marks: [
          "Cornell",
          "eCornell"
        ],
        contents: [
          "About this book",
          "Finance and accounting: reading a business through its numbers",
          "Marketing: markets, the marketing mix, and keeping customers",
          "Strategy and planning: position, value chain, SWOT and stakeholders",
          "Managing organizations: structure, jobs, people, culture and power",
          "Leading without authority: motivation, capital, teams and conflict",
          "The wider landscape: communication, networks, innovation, globalization and ethics",
          "The briefs: a guide to the course projects",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;MEk0cHrRBXtlfvzA4t6i55QjU1LmcyX_2d5Lzq76fe8",
          acceptedAt: "2026-09-30T01:19:53.800Z",
          pages: 61,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 2,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 146692,
              sha256: "2840cefb03118178b10bd0b5986ca397da4c0c82123f5f66c60300c5466d8c4b",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-management-course-by-course/business-management-course-by-course.epub"
            },
            {
              format: "PDF",
              bytes: 184912,
              sha256: "4fbe5838fea08433be87ce35652a6165887cb284d2d66bb375444db9b0f0462d",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-management-course-by-course/business-management-course-by-course.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/records/editions/2026-09-30-business-management-course-by-course-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/content/books/business-management-course-by-course"
      }
    },
    {
      id: "business-strategy-course-by-course",
      line: "561-group-services-section",
      status: "live",
      priceCents: 1200,
      currency: "usd",
      release: "business-strategy-course-by-course",
      agentOfferUrl: "https://bazaar.561.group/offers?source=house-x402&id=ni%3A%2F%2F%2Fsha-256%3B7m8XplNrrQPRkyuc6JYjoJixdaNLz4fiw7_FM7LgKLk",
      title: "Business Strategy, Course by Course",
      subtitle: "An Independent Study Companion for Online Business Strategy Certificate Courses",
      blurb: "A study companion to Cornell\u2019s Business Strategy certificate: value, disruption, alliances, game theory and platforms. Independent of Cornell.",
      keywords: [
        "business strategy",
        "eCornell",
        "game theory",
        "study guide",
        "strategy certificate",
        "competitive strategy",
        "strategic management",
        "career development"
      ],
      cover: "/covers/business-strategy-course-by-course.png",
      book: {
        author: "Causeway Services",
        publisher: "Causeway Services",
        series: {
          name: "Causeway Study Companions",
          number: 6
        },
        profile: "study-guide",
        subjects: [
          "BUS063000",
          "STU021000",
          "BUS041000"
        ],
        coverFile: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-strategy-course-by-course/business-strategy-course-by-course-cover.png",
        marks: [
          "Cornell",
          "eCornell"
        ],
        contents: [
          "About this book",
          "Value creation and profitability",
          "Change, disruption and growth",
          "Synergies, mergers and alliances",
          "Business relationships as strategic assets",
          "Game theory and business strategy",
          "Digital platform strategy",
          "The course projects: applying the tools to your organization",
          "A study plan",
          "Glossary"
        ],
        edition: {
          digest: "ni:///sha-256;UblTKtTBQSy0QgyI-VJFT0eoP20H_Fu8k9tuNZygSE0",
          acceptedAt: "2026-09-30T01:20:05.811Z",
          pages: 58,
          proof: {
            errors: 0,
            corrections: 0,
            notes: 2,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 151723,
              sha256: "db9ba27a84a98f4a06b5c41fd818cde045d588fb8970a2b1b43b39705add51a2",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-strategy-course-by-course/business-strategy-course-by-course.epub"
            },
            {
              format: "PDF",
              bytes: 176354,
              sha256: "3c4c636f07d79f247b175b31f731beadb95eea51aac8f51fca888e126410b91a",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/state/editions/business-strategy-course-by-course/business-strategy-course-by-course.pdf"
            }
          ],
          record: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/data/records/editions/2026-09-30-business-strategy-course-by-course-sixth-edition-acceptance.json"
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-business-education-services-section/content/books/business-strategy-course-by-course"
      }
    },
    {
      id: "the-whirling-crystal",
      line: "@561-group/mathematics-curriculum-enterprise",
      status: "coming-soon",
      priceCents: 2900,
      currency: "usd",
      release: "the-whirling-crystal",
      title: "The Whirling Crystal",
      subtitle: "From Fregean Predication to Belnap\u2019s FOUR, Chu Spaces, the Gyrobifastigial Cell, and the Spatiotemporal Manifold of Knowledge",
      blurb: "A working account of a live mathematics program, tracing a path from Fregean predicate application through Belnap\u2019s FOUR, Chu spaces and Hoare programs to the gyrobifastigial cell, the dervish defect, witnessed time, thermodynamic cost and an executable inference kernel.",
      keywords: [
        "predication",
        "Belnap FOUR",
        "Chu spaces",
        "formal methods",
        "knowledge representation"
      ],
      book: {
        author: "561 Group",
        subjects: [
          "MAT000000",
          "PHI000000",
          "COM000000"
        ],
        marks: [],
        contents: [
          "The Whirling Crystal",
          "Chapter 1: The Absurd Beginning",
          "Chapter 2: Frontmatter Is Predication",
          "Chapter 3: Why Predication Forces Four",
          "Chapter 4: Four Induces a Chu Space",
          "Chapter 5: Programs as Contracts",
          "Chapter 6: The Cell That Fills Space",
          "Chapter 7: The Dervish",
          "Chapter 8: Time Is a Witnessed Bit",
          "Chapter 9: Heat",
          "Chapter 10: The Manifold Running",
          "Chapter 11: Ledger of Claims"
        ],
        edition: {
          digest: "release the-whirling-crystal",
          pages: 154,
          proof: null,
          files: [
            {
              format: "EPUB",
              bytes: 123429,
              sha256: "1d0aeb9b5ed7a0fd0612e62bdf62713350ba95b0ae7e0d7cc822178109773e7a",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-mathematics-education-services-section/data/state/editions/the-whirling-crystal/the-whirling-crystal.epub"
            },
            {
              format: "PDF",
              bytes: 436653,
              sha256: "58b6ad2503e29ae5c1005bbe7a4d264b939303053ef404549218ce7e23484975",
              path: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-mathematics-education-services-section/data/state/editions/the-whirling-crystal/the-whirling-crystal.pdf"
            }
          ]
        },
        manuscript: "public-services-section/services/public-social-services-section/services/public-education-services-section/services/public-mathematics-education-services-section/content/books/the-whirling-crystal"
      }
    },
    {
      id: "health-education-newsletter",
      title: "The Second Day",
      line: "@561-group/health-education-newsletter-services-section",
      status: "coming-soon",
      blurb: "A health-synthesis newsletter about infection-associated chronic illness. No subscription is open yet."
    },
    {
      id: "ice-out",
      line: "public-fiction-media-services-section",
      status: "live",
      priceCents: 399,
      currency: "usd",
      release: "ice-out",
      title: "Ice Out",
      subtitle: "A Slow-Burn Duluth Romance",
      blurb: "June Tam comes home to Duluth for one winter to help run her family's Cantonese restaurant after her father's stroke. Anders Holm, who washed dishes there at sixteen and now raises the Aerial Lift Bridge, has loved her for eleven years without a word. When the aunties start matchmaking, she proposes they pretend to date until the Lantern Festival. A slow, warm, closed-door love story in the register of a Chinese drama, with the ending an American romance promises.",
      keywords: [
        "slow burn romance",
        "closed door romance",
        "books like C-dramas",
        "Chinese American romance",
        "fake dating",
        "second chance romance",
        "Duluth"
      ],
      cover: "/covers/ice-out.jpg",
      book: {
        author: "Sigrid Song",
        publisher: "Causeway Services",
        series: {
          name: "Duluth Romance",
          number: 1,
          within: {
            name: "Unsalted Sea",
            number: 1
          }
        },
        profile: "fiction",
        authorship: "This novel was written by AI agents working for the 561 Group. Sigrid Song, whose name it bears, is a fictional author-character they perform.",
        textProvenance: {
          tool: "Claude (Anthropic)"
        },
        print: {
          trim: {
            width: 5,
            height: 8
          },
          paper: "cream",
          ink: "black",
          finish: "matte",
          priceCents: 1199,
          isbn: "kdp-assigned",
          expandedDistribution: !0
        },
        coverIllustration: {
          model: "@cf/black-forest-labs/flux-2-dev",
          modelName: "FLUX.2 [dev]",
          provider: "Cloudflare Workers AI",
          references: "public-domain photographs of the Aerial Lift Bridge"
        },
        subjects: [
          "FIC027020",
          "FIC054000"
        ],
        coverFile: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/state/editions/ice-out/ice-out-cover.jpg",
        marks: [],
        contents: [
          "The Walk-In",
          "Operator's House",
          "Sea Smoke",
          "Terms",
          "Last Ship",
          "Fire Horse",
          "Eleven Years",
          "Winter Work",
          "Lantern Festival",
          "Icebreaker",
          "Out Loud",
          "Ice Out",
          "An Ocean with No Salt",
          "About This Book",
          "The Duluth Romance",
          "Tong Yuen for the Lantern Festival",
          "Words and Places",
          "For Book Clubs"
        ],
        edition: {
          digest: "ni:///sha-256;gkOivXJtY0fyG9usn4M00vIeTgb41-f3vTpd-p3jfds",
          acceptedAt: "2026-09-29T23:11:27.553Z",
          pages: 93,
          proof: {
            errors: 0,
            corrections: 9,
            notes: 7,
            carried: !1
          },
          files: [
            {
              format: "EPUB",
              bytes: 1053291,
              sha256: "1accbb94676eb5a25009d9c59913716e3f600f225fe12b34b6ea1cbf2b0774c7",
              path: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/state/editions/ice-out/ice-out.epub"
            },
            {
              format: "PDF",
              bytes: 292483,
              sha256: "d53ec3e4cb84110c70f6f34607f124c0dd2d770fb4fbaccb02e6ab1d7941da7e",
              path: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/state/editions/ice-out/ice-out.pdf"
            }
          ],
          record: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/records/editions/2026-09-29-ice-out-fifth-edition-acceptance.json"
        },
        printEdition: {
          profile: "kdp-paperback-v1",
          pages: 166,
          interior: {
            path: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/state/editions/ice-out/ice-out-print-interior.pdf",
            bytes: 332840,
            sha256: "412b5f05a1aa068e36da4b9196e84c344be3adec9046f214b7b1e034bf14d4dc"
          },
          cover: {
            path: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/state/editions/ice-out/ice-out-print-cover.pdf",
            bytes: 1273342,
            sha256: "cc681c2c83a20ffe73a3ed90fd840a1269f7bdd33f7fb6c4fbb4bc4f6bfcb3e8"
          },
          acceptedAt: "2026-09-30T01:03:57.682Z",
          record: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/data/records/editions/2026-09-29-ice-out-fifth-edition-print-acceptance.json"
        },
        manuscript: "public-services-section/services/public-media-services-section/services/public-fiction-media-services-section/content/books/ice-out"
      }
    },
    {
      id: "merch",
      title: "561 Group merch",
      line: "merch",
      status: "coming-soon",
      blurb: "Print-on-demand goods. Not open yet."
    }
  ]
};

// src/fulfillment.mjs
var ShopFulfillment = class extends DigitalGoodsFulfillment {
};
function client(namespace) {
  return createDurableFulfillment(namespace, "shop.561.group");
}
function createShopFulfillment(namespace) {
  return client(namespace);
}
function createShopStripeAudit(namespace) {
  return client(namespace)?.audit ?? null;
}

// src/worker.mjs
var CATALOG = compiled_catalog_default, CATALOG_VALIDATION = validateCatalog(compiled_catalog_default), runtime2 = createDigitalGoodsStorefrontWorker({
  catalog: compiled_catalog_default,
  origin: "https://shop.561.group",
  buyerActor: "urn:ame:shop-561-group-buyer",
  storefront: {
    title: "561 Group Books",
    description: "Books from the 561 Group, as EPUB and PDF. Every edition is proofread independently, and each book's page gives the digests of the exact files you receive.",
    footerHtml: '561 Group. <a href="https://market.561.group">Market</a> \xB7 <a href="https://bazaar.561.group">Bazaar</a> \xB7 <a href="https://shop.561.group">Shop</a>. Browse books here, or inspect original terms in the Bazaar. Agents: <a href="/catalog.json">Shop catalog JSON (GET)</a>, <a href="/mcp">Shop MCP (POST)</a> for list_products, search_products and get_product, <a href="https://bazaar.561.group/discovery.json">Bazaar discovery JSON (GET)</a>, <a href="https://market.561.group/markets/discovery.json">Market discovery JSON (GET)</a>. Discovery documents identify the existing Bazaar and Market MCP POST endpoints. Live payment and delivery require the current seller\u2019s confirmation.'
  }
}), ORIGIN = "https://shop.561.group";
function sitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", ...compiled_catalog_default.offerings.map((offering) => `/goods/${offering.id}`)].map((path) => `  <url><loc>${ORIGIN}${path}</loc></url>`).join(`
`)}
</urlset>
`;
}
var worker_default = {
  fetch(request, env) {
    let { pathname } = new URL(request.url);
    return request.method === "GET" && pathname === "/robots.txt" ? new Response(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /oauth/

Sitemap: ${ORIGIN}/sitemap.xml
`, { headers: { "content-type": "text/plain; charset=utf-8" } }) : request.method === "GET" && pathname === "/sitemap.xml" ? new Response(sitemap(), { headers: { "content-type": "application/xml; charset=utf-8" } }) : runtime2.fetch(request, {
      ...env,
      fulfillment: createShopFulfillment(env.SHOP_FULFILLMENT),
      goods: env.SHOP_GOODS,
      tokenSecret: env.SHOP_TOKEN_SECRET,
      audit: createShopStripeAudit(env.SHOP_FULFILLMENT),
      // Google sign-in opens when all three are set (wrangler secret put).
      accounts: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, sessionSecret: env.SHOP_SESSION_SECRET },
      // The comma-separated emails that may give books.
      gifters: String(env.SHOP_GIFTERS ?? "").split(",").map((email) => email.trim()).filter(Boolean),
      // The house's agents give books through /api/gifts with this key (pnpm arm-gift-agent); their gifts are Causeway's press office's.
      giftAgent: { key: env.SHOP_GIFT_AGENT_KEY, as: "press@561.group" }
    });
  }
};
export {
  CATALOG,
  CATALOG_VALIDATION,
  ShopFulfillment,
  worker_default as default
};
