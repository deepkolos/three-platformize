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
