export class BrowserPlatform {
  getGlobals() {
    return {
      atob,
      Blob,
      window,
      document,
      XMLHttpRequest,
      OffscreenCanvas,
      HTMLCanvasElement,
      createImageBitmap,
    };
  }

  dispose() {}
}
