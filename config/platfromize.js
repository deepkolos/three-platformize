import path from 'path';
import inject from '@rollup/plugin-inject';
import { REVISION } from '../three/src/constants.js';

export const platformVariables = [
  'URL',
  'atob',
  'Blob',
  'window',
  'document',
  'DOMParser',
  'TextDecoder',
  'XMLHttpRequest',
  'OffscreenCanvas',
  'HTMLCanvasElement',
  'createImageBitmap',
  'requestAnimationFrame',
];

export function platformize(
  list = platformVariables,
  platformPath = path
    .resolve(__dirname, '../src/Platform')
    .replaceAll('\\', '\\\\'),
) {
  return inject({
    exclude: /src\/platforms/,

    'self.URL': [platformPath, '$URL'],
    ...list.reduce((acc, curr) => {
      acc[curr] = [platformPath, `$${curr}`];
      return acc;
    }, {}),
  });
}

export function injectPlatformCode() {
  return {
    transform(code, filePath) {
      if (filePath.endsWith('Three.js')) {
        code += "\nexport * from '../../src/Platform.js';\n";
      }

      if (filePath.endsWith('WebGLExtensions.js')) {
        code =
          `import { $defaultWebGLExtensions } from "../../../../src/Platform.js"\n` +
          code;
        code = code.replace(
          'const extensions = {};',
          `const extensions = Object.assign( {}, $defaultWebGLExtensions || {});`,
        );
        code = code.replace(
          'var extensions = {};',
          `var extensions = Object.assign( {}, $defaultWebGLExtensions || {});`,
        );
        // 淘宝小程序ios下对于不支持的扩展返回undefined
        code = code.replace(
          `const extension = getExtension( name );`,
          `const extension = getExtension( name ) || null;`,
        );
      }

      return {
        code: code,
        map: null,
      };
    },
  };
}

export function importFromPlatfromizedThree() {
  return {
    transform(code, filePath) {
      // code = code.replaceAll(
      //   /from.*('|").*three.module.js('|")/g,
      //   `from '${path
      //     .resolve(__dirname, '../build/three.module.js')
      //     .replaceAll('\\', '\\\\')}'`,
      // );
      if (REVISION >= 129) {
        code = code.replaceAll(
          `from 'three'`,
          `from '${path
            .relative(
              path
                .dirname(filePath)
                .replace(path.sep + 'three' + path.sep, path.sep),
              path.resolve(__dirname, '../build/three.module.js'),
            )
            .replaceAll(path.sep, '/')}'`,
        );
      }

      return {
        code: code,
        map: null,
      };
    },
  };
}

export function useRealOpentypeModule() {
  return {
    transform(code) {
      code = code.replace(
        `import { opentype } from '../libs/opentype.module.min.js'`,
        `import opentype from '../libs/opentype.module.js'`,
      );

      return {
        code: code,
        map: null,
      };
    },
  };
}
