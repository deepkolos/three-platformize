export class BytePlatform {
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

  injectPolyfill(polyfill: { DOMParser?: any }): void;

  dispatchTouchEvent(e: any): void;
}
