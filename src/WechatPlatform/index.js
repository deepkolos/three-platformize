import URL from '../libs/URL';
import Blob from '../libs/Blob';
import atob from '../libs/atob';
import EventTarget, { Touch } from '../libs/EventTarget';
import XMLHttpRequest from './XMLHttpRequest';
import copyProperties from '../libs/copyProperties';
// import { DOMParser } from 'xmldom';
import { $DOMParser as DOMParser } from '../libs/DOMParser';

function OffscreenCanvas() {
  return wx.createOffscreenCanvas();
}

export class WechatPlatform {
  constructor(canvas, width, height) {
    const systemInfo = wx.getSystemInfoSync();

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
    };

    [this.canvas, this.document, this.window].forEach(i => {
      copyProperties(i.constructor.prototype, EventTarget.prototype);
    });

    this.patchCanvas();

    this.onDeviceMotionChange = e => {
      e.type = 'deviceorientation';
      e.alpha *= -1;
      e.beta *= -1;
      e.gamma *= -1;
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
        success: resolve,
        fail: reject,
      });
    });
  }

  disableDeviceOrientation() {
    return new Promise((resolve, reject) => {
      wx.offDeviceMotionChange(this.onDeviceMotionChange);

      wx.stopDeviceMotionListening({
        success: resolve,
        fail: reject,
      });
    });
  }

  dispatchTouchEvent(e = {}) {
    const target = {
      ...this,
    };

    const event = {
      changedTouches: e.changedTouches.map(touch => new Touch(touch)),
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
  }

  dispose() {
    this.disableDeviceOrientation();
    this.canvas.ownerDocument = null;
    this.onGyroscopeChange = null;
    this.document = null;
    this.window = null;
    this.canvas = null;
  }
}
