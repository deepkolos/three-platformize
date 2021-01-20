export class WechatPlatform {
  constructor(canvas: any, width?: number, height?: number);

  getGlobals(): {
    atob: Function;
    Blob: Function;
    window: Object;
    document: Object;
    HTMLCanvasElement: undefined;
    XMLHttpRequest: Function;
    requestAnimationFrame: Function;
    OffscreenCanvas: Function;
  };

  dispose(): void;

  enableDeviceOrientation(interval?: 'normal' | 'game' | 'ui'): void;
  disableDeviceOrientation(): void;
  dispatchTouchEvent(e: any): void;
}
