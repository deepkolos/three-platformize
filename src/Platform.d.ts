export class Platform {
  set(platform: any): void;

  dispose(): void;
}

export const PLATFORM: Platform;
export let $URL: URL;
export let $atob: Window['atob'];
export let $Blob: Blob;
export let $window: Window;
export let $document: Document;
export let $DOMParser: DOMParser;
export let $TextDecoder: TextDecoder;
export let $XMLHttpRequest: XMLHttpRequest;
export let $OffscreenCanvas: OffscreenCanvas;
export let $HTMLCanvasElement: HTMLCanvasElement;
export let $createImageBitmap: Window['createImageBitmap'];
export let $cancelAnimationFrame: Window['cancelAnimationFrame'];
export let $requestAnimationFrame: Window['requestAnimationFrame'];
export let $defaultWebGLExtensions: Object;
