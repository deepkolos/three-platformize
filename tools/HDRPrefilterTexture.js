import {
  NearestFilter,
  UnsignedByteType,
  RGBEFormat,
  RGBEEncoding,
  CubeUVReflectionMapping,
  Texture,
} from '../build/three.module';

export class HDRPrefilterTexture extends Texture {
  constructor(image, wrapS, wrapT, anisotropy) {
    super(
      image,
      CubeUVReflectionMapping,
      wrapS,
      wrapT,
      NearestFilter,
      NearestFilter,
      RGBEFormat,
      UnsignedByteType,
      anisotropy,
      RGBEEncoding,
    );
    this.generateMipmaps = false;
    this.name = 'PMREM.cubeUv';
  }
}
