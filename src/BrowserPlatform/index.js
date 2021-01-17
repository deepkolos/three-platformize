
export class BrowserPlatform {

	getGlobals() {

    return {

      atob,
      Blob,
      window,
      document,
      EventTarget,
      XMLHttpRequest,
      HTMLCanvasElement,
      requestAnimationFrame

    };

  }

  dispose() {}

}
