import {
  CompressedTexture,
  UnsignedByteType,
  LinearFilter,
  LinearMipmapLinearFilter,
  RGB_ETC2_Format,
  RGB_ETC1_Format,
  RGB_S3TC_DXT1_Format,
  RGB_PVRTC_4BPPV1_Format,
  RGBAFormat,
  RGBA_BPTC_Format,
  RGBA_ETC2_EAC_Format,
  RGBA_ASTC_4x4_Format,
  RGBA_S3TC_DXT5_Format,
  RGBA_PVRTC_4BPPV1_Format,
  sRGBEncoding,
  LinearEncoding
} from '../build/three.module.js';

const typeFormatMap = {
  astc: {
    0: RGBA_ASTC_4x4_Format,
    1: RGBA_ASTC_4x4_Format,
  },
  etc1: {
    0: RGB_ETC1_Format,
    1: RGB_ETC1_Format,
  },
  dxt: {
    0: RGB_S3TC_DXT1_Format,
    1: RGBA_S3TC_DXT5_Format,
  },
  bc7: {
    0: RGBA_BPTC_Format,
    1: RGBA_BPTC_Format,
  },
  pvrtc: {
    0: RGB_PVRTC_4BPPV1_Format,
    1: RGBA_PVRTC_4BPPV1_Format,
  },
};

export class GLTFGPUCompressedTexture {
  /**
   * @param {GLTFParser} parser
   */
  constructor(parser) {
    this.name = 'EXT_GPU_COMPRESSED_TEXTURE';
    this.parser = parser;
  }

  detectSupport(renderer) {
    this.supportInfo = {
      astc: renderer.extensions.has('WEBGL_compressed_texture_astc'),
      bc7: renderer.extensions.has('EXT_texture_compression_bptc'),
      dxt: renderer.extensions.has('WEBGL_compressed_texture_s3tc'),
      etc1: renderer.extensions.has('WEBGL_compressed_texture_etc1'),
      etc2: renderer.extensions.has('WEBGL_compressed_texture_etc'),
      pvrtc:
        renderer.extensions.has('WEBGL_compressed_texture_pvrtc') ||
        renderer.extensions.has('WEBKIT_WEBGL_compressed_texture_pvrtc'),
    };
    return this;
  }

  loadTexture(textureIndex) {
    const { parser, name } = this;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }

    if (!this.supportInfo)
      throw new Error(
        'GLTFGPUCompressedTexture: need run detectSupport(renderer) before load gtlf',
      );

    const extensionDef = textureDef.extensions[name];
    const { width, height, hasAlpha } = extensionDef;

    for (let name in this.supportInfo) {
      if (this.supportInfo[name] && extensionDef[name] !== undefined) {
        return parser
          .getDependency('buffer', extensionDef[name])
          .then(buffer => {
            // TODO: 支持带mipmap的压缩纹理
            // TODO: zstd压缩

            const mipmaps = [
              {
                data: new Uint8Array(buffer),
                width,
                height,
              },
            ];

            console.log('gpu texture type', name);
            console.log('buffer loaded', buffer);
            console.log('format', typeFormatMap[name][hasAlpha]);
            console.log(mipmaps);

            // 目前的buffer是直接可以传递到GPU的buffer
            const texture = new CompressedTexture(
              mipmaps,
              width,
              height,
              typeFormatMap[name][hasAlpha],
              UnsignedByteType,
            );
            texture.minFilter =
              mipmaps.length === 1 ? LinearFilter : LinearMipmapLinearFilter;
            texture.magFilter = LinearFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            // 压缩纹理不支持flipY, 所以fallback的纹理也需要是flipY为false,这个如何fallback呢
            // texture.flipY = false;
            // texture.encoding = LinearEncoding;
            return texture;
          });
      }
    }

    // Fall back to PNG or JPEG.
    return parser.loadTexture(textureIndex);

    // if (source.uri) {
    //   const handler = parser.options.manager.getHandler(source.uri);
    //   if (handler !== null) loader = handler;
    // }

    // // return parser.loadTextureImage(textureIndex, source, loader);

    // if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
    //   throw new Error(
    //     'THREE.GLTFLoader: WebP required by asset but unsupported.',
    //   );
    // } // Fall back to PNG or JPEG.

    // return parser.loadTexture(textureIndex);
  }
}
