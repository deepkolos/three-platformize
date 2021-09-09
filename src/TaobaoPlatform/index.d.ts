export class TaobaoPlatform {
  constructor(canvas: any);

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
  /**
   * 作为LoadingManager.setURLModifier的补充，增加支持async支持，可用于URL到云存储的映射
   * @param urlModifier 
   */
  setURLModifier(urlModifier: (url: string) => Promise<string> | string): void;
}
