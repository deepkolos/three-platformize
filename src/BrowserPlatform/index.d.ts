
export class BrowserPlatform {
  getGlobals(): {
    atob: Function;
    Blob: Function;
    window: Window;
    document: Document;
    HTMLCanvasElement: HTMLCanvasElement;
    XMLHttpRequest: XMLHttpRequest;
    requestAnimationFrame: requestAnimationFrame;
    OffscreenCanvas: OffscreenCanvas;
  };

  dispose(): void;
}
