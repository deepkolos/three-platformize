import flip from './flip';

export function screenshot(renderer, scene, camera, WebGLRenderTarget) {
  const { width, height } = renderer.domElement;
  // const { x: width, y: height } = renderer.getDrawingBufferSize();
  const renderTarget = new WebGLRenderTarget(width, height);
  const buffer = new Uint8Array(width * height * 4);

  renderTarget.texture.encoding = renderer.outputEncoding;
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, buffer);
  renderer.setRenderTarget(null);
  renderTarget.dispose();

  flip(buffer, width, height, 4);
  return [buffer, width, height];
}
