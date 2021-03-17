let $URL = undefined;
let $atob = undefined;
let $Blob = undefined;
let $window = undefined;
let $document = undefined;
let $DOMParser = undefined;
let $TextDecoder = undefined;
let $XMLHttpRequest = undefined;
let $OffscreenCanvas = undefined;
let $HTMLCanvasElement = undefined;
let $createImageBitmap = undefined;
let $requestAnimationFrame = undefined;
let $cancelAnimationFrame = undefined;
let $defaultWebGLExtensions = {};

class Platform {
  set(platform) {
    this.platform = platform;

    const globals = platform.getGlobals();

    $atob = globals.atob;
    $Blob = globals.Blob;
    $window = globals.window;
    $document = globals.document;
    $XMLHttpRequest = globals.XMLHttpRequest;
    $OffscreenCanvas = globals.OffscreenCanvas;
    $HTMLCanvasElement = globals.HTMLCanvasElement;
    $createImageBitmap = globals.createImageBitmap;

    $URL = $window.URL;
    $DOMParser = $window.DOMParser;
    $TextDecoder = $window.TextDecoder;
    $requestAnimationFrame = $window.requestAnimationFrame;
    $cancelAnimationFrame = $window.cancelAnimationFrame;

    if (platform.setWebGLExtensions) $defaultWebGLExtensions = platform.setWebGLExtensions();
  }

  dispose() {
    this.platform && this.platform.dispose();
    this.platform = null;

    $URL = null;
    $Blob = null;
    $atob = null;
    $window = null;
    $document = null;
    $DOMParser = null;
    $TextDecoder = null;
    $XMLHttpRequest = null;
    $OffscreenCanvas = null;
    $HTMLCanvasElement = null;
    $createImageBitmap = null;
    $requestAnimationFrame = null;
    $defaultWebGLExtensions = null;
  }
}

const PLATFORM = new Platform();

export {
  $URL,
  $atob,
  $Blob,
  $window,
  PLATFORM,
  $document,
  $DOMParser,
  $TextDecoder,
  $XMLHttpRequest,
  $OffscreenCanvas,
  $HTMLCanvasElement,
  $createImageBitmap,
  $cancelAnimationFrame,
  $requestAnimationFrame,
  $defaultWebGLExtensions,
};
