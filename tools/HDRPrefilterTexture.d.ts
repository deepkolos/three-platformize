import { Texture, Wrapping } from 'three';

export class HDRPrefilterTexture extends Texture {
  constructor(
    image: HTMLImageElement,
    wrapS?: Wrapping,
    wrapT?: Wrapping,
    anisotropy?: number,
  );
}
