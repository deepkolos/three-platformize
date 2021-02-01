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
 * @param {Boolean} hdr 源文件是否是HDR, LDR设置false
 */
export function toEnvMap(texture, hdr = true) {
  if (hdr) {
    texture.format = RGBEFormat;
    texture.encoding = RGBEEncoding;
  }
  texture.generateMipmaps = false;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.type = UnsignedByteType;
  texture.mapping = CubeUVReflectionMapping;
  texture.name = 'PMREM.cubeUv';
  return texture;
}
