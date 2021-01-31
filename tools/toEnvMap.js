import {
  NearestFilter,
  UnsignedByteType,
  RGBEFormat,
  RGBEEncoding,
  CubeUVReflectionMapping,
} from '../build/three.module';

/**
 * 设置通过TextureLoad加载从PMREMGenerator生成纹理导出成PNG
 * @param {Texture} texture
 */
export function toEnvMap(texture) {
  texture.generateMipmaps = false;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.type = UnsignedByteType;
  texture.format = RGBEFormat;
  texture.encoding = RGBEEncoding;
  texture.mapping = CubeUVReflectionMapping;
  texture.name = 'PMREM.cubeUv';
  return texture;
}
