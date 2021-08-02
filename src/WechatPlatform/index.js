import URL from '../libs/URL';
import Blob from '../libs/Blob';
import atob from '../libs/atob';
import EventTarget, { Touch } from '../libs/EventTarget';
import XMLHttpRequest from './XMLHttpRequest';
import copyProperties from '../libs/copyProperties';
import { $DOMParser as DOMParser } from '../libs/DOMParser';
import { $TextDecoder as TextDecoder } from '../libs/TextDecoder';

function OffscreenCanvas() {
  return wx.createOffscreenCanvas();
}

export class WechatPlatform {
  constructor(canvas, width, height) {
    const systemInfo = wx.getSystemInfoSync();
    const isAndroid = systemInfo.platform === 'android';

    this.canvas = canvas;
    this.canvasW = width === undefined ? canvas.width : width;
    this.canvasH = height === undefined ? canvas.height : height;

    this.document = {
      createElementNS(_, type) {
        if (type === 'canvas') return canvas;
        if (type === 'img') return canvas.createImage();
      },
    };

    this.window = {
      innerWidth: systemInfo.windowWidth,
      innerHeight: systemInfo.windowHeight,
      devicePixelRatio: systemInfo.pixelRatio,

      URL: new URL(),
      AudioContext: function () {},
      requestAnimationFrame: this.canvas.requestAnimationFrame,
      cancelAnimationFrame: this.canvas.cancelAnimationFrame,
      DeviceOrientationEvent: {
        requestPermission() {
          return Promise.resolve('granted');
        },
      },
      DOMParser,
      TextDecoder,
    };

    [this.canvas, this.document, this.window].forEach(i => {
      const old = i.__proto__;
      i.__proto__ = {};
      i.__proto__.__proto__ = old;
      copyProperties(i.__proto__, EventTarget.prototype);
    });

    this.patchCanvas();

    this.onDeviceMotionChange = e => {
      e.type = 'deviceorientation';
      if (isAndroid) {
        e.alpha *= -1;
        e.beta *= -1;
        e.gamma *= -1;
      }
      this.window.dispatchEvent(e);
    };
  }

  patchCanvas() {
    const { canvasH, canvasW } = this;

    Object.defineProperty(this.canvas, 'style', {
      get() {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
        };
      },
    });

    Object.defineProperty(this.canvas, 'clientHeight', {
      get() {
        return canvasH || this.height;
      },
    });

    Object.defineProperty(this.canvas, 'clientWidth', {
      get() {
        return canvasW || this.width;
      },
    });

    this.canvas.ownerDocument = this.document;
  }

  // 某些情况下IOS会不success不触发。。。
  patchXHR() {
    XMLHttpRequest.useFetchPatch = true;
    return this;
  }

  getGlobals() {
    return {
      atob: atob,
      Blob: Blob,
      window: this.window,
      document: this.document,
      HTMLCanvasElement: undefined,
      XMLHttpRequest: XMLHttpRequest,
      OffscreenCanvas: OffscreenCanvas,
      createImageBitmap: undefined,
    };
  }

  enableDeviceOrientation(interval) {
    return new Promise((resolve, reject) => {
      wx.onDeviceMotionChange(this.onDeviceMotionChange);
      wx.startDeviceMotionListening({
        interval,
        success: e => {
          resolve(e);
          this.enabledDeviceMotion = true;
        },
        fail: reject,
      });
    });
  }

  disableDeviceOrientation() {
    return new Promise((resolve, reject) => {
      wx.offDeviceMotionChange(this.onDeviceMotionChange);

      this.enabledDeviceMotion &&
        wx.stopDeviceMotionListening({
          success: () => {
            resolve();
            this.enabledDeviceMotion = false;
          },
          fail: reject,
        });
    });
  }

  dispatchTouchEvent(e = {}) {
    const target = { ...this };
    const changedTouches = e.changedTouches.map(touch => new Touch(touch));

    const event = {
      changedTouches: changedTouches,
      touches: e.touches.map(touch => new Touch(touch)),
      targetTouches: Array.prototype.slice.call(
        e.touches.map(touch => new Touch(touch)),
      ),
      timeStamp: e.timeStamp,
      target: target,
      currentTarget: target,
      type: e.type,
      cancelBubble: false,
      cancelable: false,
    };

    this.canvas.dispatchEvent(event);

    if (changedTouches.length) {
      const touch = changedTouches[0];
      const pointerEvent = {
        pageX: touch.pageX,
        pageY: touch.pageY,
        pointerId: touch.identifier,
        type: {
          touchstart: 'pointerdown',
          touchmove: 'pointermove',
          touchend: 'pointerup',
        }[e.type],
        pointerType: 'touch',
      };

      this.canvas.dispatchEvent(pointerEvent);
    }
  }

  dispose() {
    this.disableDeviceOrientation();
    // 缓解ios内存泄漏, 前后进出页面多几次，降低pixelRatio也可行
    this.canvas.width = 0;
    this.canvas.height = 0;
    if (this.canvas) this.canvas.ownerDocument = null;
    this.onDeviceMotionChange = null;
    this.document = null;
    this.window = null;
    this.canvas = null;
  }
}
