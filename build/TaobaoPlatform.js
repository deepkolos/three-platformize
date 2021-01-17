class Blob {

	constructor(parts, options) {

		this.parts = parts;
    this.options = options;

    // 目前仅适配如下
		// var blob = new Blob([bufferView], { type: source.mimeType });
    // sourceURI = URL.createObjectURL(blob);

		// var base64 = ArrayBufferToBase64(bufferView);
    // var url = `data:${options.type};base64,${base64}`;

  }

}

// Converts an ArrayBuffer directly to base64, without any intermediate 'convert to string then
// use window.btoa' step. According to my tests, this appears to be a faster approach:
// http://jsperf.com/encoding-xhr-image-data/5

/*
MIT LICENSE

Copyright 2011 Jon Leighton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function ArrayBufferToBase64(arrayBuffer) {
  var base64 = '';
  var encodings =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;

  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }

  return base64;
}

class URL {

	createObjectURL(obj) {

		if (obj instanceof Blob) {

			const base64 = ArrayBufferToBase64(obj.parts[0]);
			const url = `data:${obj.options.type};base64,${base64}`;

      return url;

		}

		return "";
  }

}

/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */
function atob(data) {
  // Web IDL requires DOMStrings to just be converted using ECMAScript
  // ToString, which in our case amounts to using a template literal.
  data = `${data}`;
  // "Remove all ASCII whitespace from data."
  data = data.replace(/[ \t\n\f\r]/g, "");
  // "If data's length divides by 4 leaving no remainder, then: if data ends
  // with one or two U+003D (=) code points, then remove them from data."
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, "");
  }
  // "If data's length divides by 4 leaving a remainder of 1, then return
  // failure."
  //
  // "If data contains a code point that is not one of
  //
  // U+002B (+)
  // U+002F (/)
  // ASCII alphanumeric
  //
  // then return failure."
  if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
    return null;
  }
  // "Let output be an empty byte sequence."
  let output = "";
  // "Let buffer be an empty buffer that can have bits appended to it."
  //
  // We append bits via left-shift and or.  accumulatedBits is used to track
  // when we've gotten to 24 bits.
  let buffer = 0;
  let accumulatedBits = 0;
  // "Let position be a position variable for data, initially pointing at the
  // start of data."
  //
  // "While position does not point past the end of data:"
  for (let i = 0; i < data.length; i++) {
    // "Find the code point pointed to by position in the second column of
    // Table 1: The Base 64 Alphabet of RFC 4648. Let n be the number given in
    // the first cell of the same row.
    //
    // "Append to buffer the six bits corresponding to n, most significant bit
    // first."
    //
    // atobLookup() implements the table from RFC 4648.
    buffer <<= 6;
    buffer |= atobLookup(data[i]);
    accumulatedBits += 6;
    // "If buffer has accumulated 24 bits, interpret them as three 8-bit
    // big-endian numbers. Append three bytes with values equal to those
    // numbers to output, in the same order, and then empty buffer."
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16);
      output += String.fromCharCode((buffer & 0xff00) >> 8);
      output += String.fromCharCode(buffer & 0xff);
      buffer = accumulatedBits = 0;
    }
    // "Advance position by 1."
  }
  // "If buffer is not empty, it contains either 12 or 18 bits. If it contains
  // 12 bits, then discard the last four and interpret the remaining eight as
  // an 8-bit big-endian number. If it contains 18 bits, then discard the last
  // two and interpret the remaining 16 as two 8-bit big-endian numbers. Append
  // the one or two bytes with values equal to those one or two numbers to
  // output, in the same order."
  if (accumulatedBits === 12) {
    buffer >>= 4;
    output += String.fromCharCode(buffer);
  } else if (accumulatedBits === 18) {
    buffer >>= 2;
    output += String.fromCharCode((buffer & 0xff00) >> 8);
    output += String.fromCharCode(buffer & 0xff);
  }
  // "Return output."
  return output;
}
/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */

const keystr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function atobLookup(chr) {
  const index = keystr.indexOf(chr);
  // Throw exception if character is not in the lookup string; should not be hit in tests
  return index < 0 ? undefined : index;
}

const _events = new WeakMap();

class Touch {
    constructor(touch) {
        // CanvasTouch{identifier, x, y}
        // Touch{identifier, pageX, pageY, clientX, clientY, force}
        this.identifier = touch.identifier;

        this.force = touch.force === undefined ? 1 : touch.force;
        this.pageX = touch.pageX === undefined ? touch.x : touch.pageX;
        this.pageY = touch.pageY  === undefined ? touch.y : touch.pageY;
        this.clientX = touch.clientX  === undefined ? touch.x : touch.clientX;
        this.clientY = touch.clientY  === undefined ? touch.y : touch.clientY;

        this.screenX = this.pageX;
        this.screenY = this.pageY;
    }
}

class EventTarget {
    constructor() {
        _events.set(this, {});
    }

    addEventListener(type, listener, options = {}) {
        let events = _events.get(this);

        if (!events) {
            events = {};
            _events.set(this, events);
        }
        if (!events[type]) {
            events[type] = [];
        }
        events[type].push(listener);

        if (options.capture) ;
        if (options.once) ;
        if (options.passive) ;
    }

    removeEventListener(type, listener) {
        const events = _events.get(this);

        if (events) {
            const listeners = events[type];

            if (listeners && listeners.length > 0) {
                for (let i = listeners.length; i--; i > 0) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                        break
                    }
                }
            }
        }
    }

    dispatchEvent(event = {}) {
        if (typeof event.preventDefault !== 'function') {
            event.preventDefault = () => {};
        }
        if (typeof event.stopPropagation !== 'function') {
            event.stopPropagation = () => {};
        }
        const listeners = _events.get(this)[event.type];

        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        }
    }

    dispatchTouchEvent(e = {}) {
        const target = {
            ...this
        };

        const event = {
            changedTouches: e.changedTouches.map(touch => new Touch(touch)),
            touches: e.touches.map(touch => new Touch(touch)),
            targetTouches: Array.prototype.slice.call(e.touches.map(touch => new Touch(touch))),
            timeStamp: e.timeStamp,
            target: target,
            currentTarget: target,
            type: e.type,
            cancelBubble: false,
            cancelable: false
        };

        this.dispatchEvent(event);
    }
}

const _requestHeader = new WeakMap();
const _responseHeader = new WeakMap();
const _requestTask = new WeakMap();

function _triggerEvent(type, event = {}) {
  event.target = event.target || this;

  if (typeof this[`on${type}`] === "function") {
    this[`on${type}`].call(this, event);
  }
}

function _changeReadyState(readyState, event = {}) {
  this.readyState = readyState;

  event.readyState = readyState;

  _triggerEvent.call(this, "readystatechange", event);
}

function _isRelativePath(url) {
  console.log("url:", url);
  return !/^(http|https|ftp|myfile):\/\/.*/i.test(url);
}

class XMLHttpRequest extends EventTarget {
  constructor() {
    super();

    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */
    this.onabort = null;
    this.onerror = null;
    this.onload = null;
    this.onloadstart = null;
    this.onprogress = null;
    this.ontimeout = null;
    this.onloadend = null;

    this.onreadystatechange = null;
    this.readyState = 0;
    this.response = null;
    this.responseText = null;
    this.responseType = "text";
    this.dataType = "arraybuffer";
    this.responseXML = null;
    this.status = 0;
    this.statusText = "";
    this.upload = {};
    this.withCredentials = false;

    _requestHeader.set(this, {
      "content-type": "application/x-www-form-urlencoded",
    });
    _responseHeader.set(this, {});
  }

  abort() {
    const myRequestTask = _requestTask.get(this);

    if (myRequestTask) {
      myRequestTask.abort();
    }
  }

  getAllResponseHeaders() {
    const responseHeader = _responseHeader.get(this);

    return Object.keys(responseHeader)
      .map((header) => {
        return `${header}: ${responseHeader[header]}`;
      })
      .join("\n");
  }

  getResponseHeader(header) {
    return _responseHeader.get(this)[header];
  }

  open(method, url ) {
    this._method = method;
    this._url = url;
    _changeReadyState.call(this, XMLHttpRequest.OPENED);
  }

  overrideMimeType() {}

  send(data = "") {
    if (this.readyState !== XMLHttpRequest.OPENED) {
      throw new Error(
        "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
      );
    } else {
      const url = this._url;
      const header = _requestHeader.get(this);
      const responseType = this.responseType;
      const dataType = this.dataType;

      const relative = _isRelativePath(url);

      delete this.response;
      this.response = null;

      const onSuccess = ({ data, statusCode, header }) => {
        // console.log('onSuccess', data)
        const enc = new TextEncoder();
        data = enc.encode(data).buffer;
        // data = Uint8Array.from(data, function(c){return c.codePointAt(0);}).buffer
        statusCode = statusCode === undefined ? 200 : statusCode;
        if (typeof data !== "string" && !(data instanceof ArrayBuffer)) {
          try {
            data = JSON.stringify(data);
          } catch (e) {}
        }

        this.status = statusCode;
        if (header) {
          _responseHeader.set(this, header);
        }
        _triggerEvent.call(this, "loadstart");
        _changeReadyState.call(this, XMLHttpRequest.HEADERS_RECEIVED);
        _changeReadyState.call(this, XMLHttpRequest.LOADING);

        this.response = data;

        if (data instanceof ArrayBuffer) {
          Object.defineProperty(this, "responseText", {
            enumerable: true,
            configurable: true,
            get: function () {
              throw "InvalidStateError : responseType is " + this.responseType;
            },
          });
        } else {
          this.responseText = data;
        }
        _changeReadyState.call(this, XMLHttpRequest.DONE);
        _triggerEvent.call(this, "load");
        _triggerEvent.call(this, "loadend");
      };

      const onFail = ({ errorMessage }) => {
        // TODO 规范错误

        if (errorMessage.indexOf("abort") !== -1) {
          _triggerEvent.call(this, "abort");
        } else {
          _triggerEvent.call(this, "error", {
            message: errorMessage,
          });
        }
        _triggerEvent.call(this, "loadend");

        if (relative) {
          // 用户即使没监听error事件, 也给出相应的警告
          console.warn(errorMessage);
        }
      };

      if (relative) {
        const fs = my.getFileSystemManager();

        var options = {
          filePath: url,
          success: onSuccess,
          fail: onFail,
        };
        // if (encoding) {
        // options["encoding"] = encoding;
        // }
        fs.access({
          path: url,
          success: (res) => {
            console.log("文件存在", res);
          },
          fail: (err) => {
            console.log("err:", err);
          },
        });
        fs.readFile(options);
        return;
      }

      my.downloadFile({
        url,
        data,
        success: ({ apFilePath }) => {
          const fs = my.getFileSystemManager();
          fs.readFile({
            filePath: apFilePath,
            // encoding: 'binary',
            // encoding: 'arraybuffer', // 不写encoding默认ArrayBuffer
            success: onSuccess,
          });
        },
        fail: onFail,
      });

      // my.request({
      //   data,
      //   url: url,
      //   method: this._method,
      //   header: header,
      //   dataType: dataType,
      //   responseType: responseType,
      //   success: onSuccess,
      //   fail: onFail,
      // });
    }
  }

  setRequestHeader(header, value) {
    const myHeader = _requestHeader.get(this);

    myHeader[header] = value;
    _requestHeader.set(this, myHeader);
  }

  addEventListener(type, listener) {
    if (typeof listener !== "function") {
      return;
    }

    this["on" + type] = (event = {}) => {
      event.target = event.target || this;
      listener.call(this, event);
    };
  }

  removeEventListener(type, listener) {
    if (this["on" + type] === listener) {
      this["on" + type] = null;
    }
  }
}

// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
XMLHttpRequest.UNSEND = 0;
XMLHttpRequest.OPENED = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

function copyProperties(target, source) {
    for (let key of Object.getOwnPropertyNames(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

function OffscreenCanvas() {
  return my.createOffscreenCanvas()
}

class TaobaoPlatform {

  constructor( canvas ) {

    this.canvas = canvas;

    this.document = {

      createElementNS( _, type ) {

        if (type === 'canvas') return canvas;

        if (type === 'img') return canvas.createImage();

      }

    };

    this.window = {

      AudioContext: function() {},
      URL: new URL(),
      requestAnimationFrame: this.canvas.requestAnimationFrame,

    };

    [this.canvas, this.document, this.window].forEach(i => {

      copyProperties(i.constructor.prototype, EventTarget.prototype);

    });

  }

  patchCanvas() {

    Object.defineProperty(this.canvas, 'style', {

      get() {

        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }

      }

    });
  
    Object.defineProperty(this.canvas, 'clientHeight', {

      get() { return this.height }

    });
  
    Object.defineProperty(this.canvas, 'clientWidth', {

      get() { return this.width }

    });

  }

  getGlobals() {

    return {

      atob: atob,
      Blob: Blob,
      window: this.window,
      document: this.document,
      HTMLCanvasElement: undefined,
      XMLHttpRequest: XMLHttpRequest,
      requestAnimationFrame: this.canvas.requestAnimationFrame,
      OffscreenCanvas: OffscreenCanvas

    }

  }

  dispose() {

    this.document = null;
    this.window = null;
    this.canvas = null;

  }

}

export { TaobaoPlatform };
