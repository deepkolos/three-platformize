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
  LinearEncoding,
  RepeatWrapping,
  RGBFormat,
  NearestFilter,
  NearestMipmapNearestFilter,
  LinearMipmapNearestFilter,
  NearestMipmapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from '../build/three.module.js';
import { ZSTDDecoder } from '../examples/jsm/libs/zstddec.module.js';
import { ZSTDDecoderWorker } from '../tools/ZSTDDecoderWorker.js';

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

const WEBGL_FILTERS = {
  9728: NearestFilter,
  9729: LinearFilter,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter,
};

const WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping,
};

export class GLTFGPUCompressedTexture {
  /**
   * @param {GLTFParser} parser
   */
  constructor(parser, renderer) {
    this.name = 'EXT_GPU_COMPRESSED_TEXTURE';
    this.parser = parser;
    this.detectSupport(renderer);
    // TODO: decode in web worker
    this.zstd = new ZSTDDecoder();
    this.zstdWorker = new ZSTDDecoderWorker();
  }

  static useWorker = true;

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
  }

  loadTexture(textureIndex) {
    const { parser, name } = this;
    const json = parser.json;
    const textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[name]) return null;

    if (!this.supportInfo)
      throw new Error(
        'GLTFGPUCompressedTexture: need run detectSupport(renderer) before load gtlf',
      );

    const extensionDef = textureDef.extensions[name];
    const { hasAlpha, compress } = extensionDef;

    for (let name in this.supportInfo) {
      if (this.supportInfo[name] && extensionDef[name] !== undefined) {
        return Promise.all([
          parser.getDependency('buffer', extensionDef[name]),
          compress === 1 ? this.zstd.init() : null,
          compress === 1 ? this.zstdWorker.init() : null,
        ]).then(([buffer]) => {
          // TODO: 支持带mipmap的压缩纹理 done
          // TODO: zstd压缩 done
          const header = new Uint32Array(buffer, 0, 4);
          const [width, height, levels, dataLen] = header;

          const offsets = new Uint32Array(buffer, header.byteLength, levels);
          const dataOffset = header.byteLength + offsets.byteLength;
          const totalLen = dataOffset + dataLen;

          let bufferData = new Uint8Array(buffer);

          if (compress === 1) {
            const t = performance.now();
            // const input = new Uint8Array(buffer, dataOffset); // zstdWorker会出错，需要复制一份
            const input = Uint8Array.from(new Uint8Array(buffer, dataOffset));
            // 可能worker需要十分多贴图的纹理才有优势
            if (!GLTFGPUCompressedTexture.useWorker) {
              const output = this.zstd.decode(input, dataLen);
              bufferData = new Uint8Array(totalLen);
              bufferData.set(output, dataOffset);
              // console.log(
              //   'zstd decode time on ui thread',
              //   performance.now() - t,
              // );
            } else {
              // console.log(performance.now(), Date.now())
              bufferData = this.zstdWorker
                .decode(input, dataLen)
                .then(workerOutput => {
                  const data = new Uint8Array(totalLen);
                  data.set(workerOutput, dataOffset);
                  // console.log(
                  //   'zstd decode time on worker thread',
                  //   performance.now() - t,
                  // );
                  return data;
                });
            }

            // bufferData = new Uint8Array(offsetPre + output.byteLength);
            // bufferData.set(output, offsetPre);
            // console.log('zstd decode time', Date.now() - t);
          }

          return Promise.resolve(bufferData).then(bufferData => {
            const mipmaps = [];
            let offsetPre = dataOffset;
            for (let i = 0; i < levels; i++) {
              mipmaps.push({
                data: new Uint8Array(
                  bufferData.buffer,
                  offsetPre,
                  offsets[i] - offsetPre,
                ),
                width: ~~(width / 2 ** i),
                height: ~~(height / 2 ** i),
              });
              offsetPre = offsets[i];
            }

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

            // basisTextureLoader的demo是手动翻转了使用了纹理的mesh的UV, 所以转basis之前需要翻转图片
            // https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_texture_basis.html#L92
            // 但是WebGPU就不需要翻转了，所以要想兼容WebGPU还得生成两份，翻转和不翻转的? 不过不确定压缩纹理
            // 后面发现，直接把glb转gltf的图片处理成basis即可，从three编辑器导出的图片已经是被翻转过的了

            // if (textureDef.name) texture.name = textureDef.name; // When there is definitely no alpha channel in the texture, set THREE.RGBFormat to save space.

            // if (!hasAlpha) texture.format = RGBFormat;
            const samplers = json.samplers || {};
            const sampler = samplers[textureDef.sampler] || {};
            // texture.magFilter =
            //   WEBGL_FILTERS[sampler.magFilter] || LinearFilter;
            // texture.minFilter =
            //   WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
            texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
            texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
            parser.associations.set(texture, {
              type: 'textures',
              index: textureIndex,
            });
            texture.needsUpdate = true;
            return texture;
          });
        });
      }
    }

    // 降级为 PNG/JPEG.
    return parser.loadTexture(textureIndex);
  }
}
