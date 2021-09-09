import URL from '../libs/URL';
import Blob from '../libs/Blob';
import atob from '../libs/atob';
import EventTarget, { Touch } from '../libs/EventTarget';
import $XMLHttpRequest from './XMLHttpRequest';
import copyProperties from '../libs/copyProperties';
import { $DOMParser as DOMParser } from '../libs/DOMParser';
import { $TextDecoder as TextDecoder } from '../libs/TextDecoder';

function OffscreenCanvas() {
  return my.createOffscreenCanvas();
}

const radianToDegree = 180 / Math.PI;

export class TaobaoPlatform {
  constructor(canvas, width, height) {
    const systemInfo = my.getSystemInfoSync();

    this.canvas = canvas;
    this.canvasW = width === undefined ? canvas.width : width;
    this.canvasH = height === undefined ? canvas.height : height;

    this.document = {
      createElementNS(_, type) {
        if (type === 'canvas') return canvas;
        if (type === 'img') {
          const img = canvas.createImage();
          img.addEventListener = (name, cb) =>
            (img[`on${name}`] = cb.bind(img));
          img.removeEventListener = (name, cb) => (img[`on${name}`] = null);
          return img;
        }
      },
    };

    this.window = {
      innerWidth: systemInfo.windowWidth,
      innerHeight: systemInfo.windowHeight,
      devicePixelRatio: systemInfo.pixelRatio,

      DOMParser,
      TextDecoder,
      URL: new URL(),
      AudioContext: function () {},
      requestAnimationFrame: cb => this.canvas.requestAnimationFrame(cb),
      cancelAnimationFrame: cb => this.canvas.cancelAnimationFrame(cb),

      DeviceOrientationEvent: {
        requestPermission() {
          return Promise.resolve('granted');
        },
      },
    };

    [this.document, this.window, this.canvas].forEach(i => {
      const old = i.__proto__;
      i.__proto__ = {};
      i.__proto__.__proto__ = old;
      copyProperties(i.__proto__, EventTarget.prototype);
    });

    this.patchCanvas();

    this.onDeviceMotionChange = e => {
      this.window.dispatchEvent({
        type: 'deviceorientation',
        alpha: e.alpha * radianToDegree,
        beta: -e.beta * radianToDegree,
        gamma: e.gamma * radianToDegree,
      });
    };

    // this.canvas.ownerDocument = this.document;
  }

  patchCanvas() {
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
        return this.canvasH || this.height;
      },
    });

    Object.defineProperty(this.canvas, 'clientWidth', {
      get() {
        return this.canvasW || this.width;
      },
    });
  }

  setWebGLExtensions() {
    return {
      EXT_blend_minmax: null,
    };
  }

  getGlobals() {
    return {
      atob: atob,
      Blob: Blob,
      window: this.window,
      document: this.document,
      HTMLCanvasElement: undefined,
      XMLHttpRequest: $XMLHttpRequest,
      OffscreenCanvas: OffscreenCanvas,
      createImageBitmap: undefined,
    };
  }

  enableDeviceOrientation() {
    my.onDeviceMotionChange(this.onDeviceMotionChange);
  }

  disableDeviceOrientation() {
    my.offDeviceMotionChange(this.onDeviceMotionChange);
  }

  dispatchTouchEvent(e = {}) {
    const target = Object.assign({}, this);

    const event = {
      changedTouches: e.changedTouches.map(touch => new Touch(touch)),
      touches: e.touches.map(touch => new Touch(touch)),
      targetTouches: Array.prototype.slice.call(
        e.touches.map(touch => new Touch(touch)),
      ),
      timeStamp: e.timeStamp,
      target: target,
      currentTarget: target,
      type: e.type.toLowerCase(),
      cancelBubble: false,
      cancelable: false,
    };

    this.canvas.dispatchEvent(event);

    if (changedTouches.length) {
      const touch = changedTouches[0];
      const pointerEvent = {
        pageX: touch.x,
        pageY: touch.y,
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

  setURLModifier(fn) {
    $XMLHttpRequest.URLModifier = fn;
  }

  dispose() {
    this.disableDeviceOrientation();
    this.onDeviceMotionChange = null;
    this.document = null;
    this.window = null;
    this.canvas = null;
  }
}
