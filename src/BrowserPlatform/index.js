
export class BrowserPlatform {

	getGlobals() {

    return {

      atob,
      Blob,
      window,
      document,
      DOMParser,
      EventTarget,
      XMLHttpRequest,
      HTMLCanvasElement,
      requestAnimationFrame

    };

  }

  dispose() {}

}
