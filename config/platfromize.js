import path from 'path';
import inject from '@rollup/plugin-inject';

export const platformVariables = [
  'URL',
  'atob',
  'Blob',
  'window',
  'document',
  'XMLHttpRequest',
  'OffscreenCanvas',
  'HTMLCanvasElement',
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
      code = code.replaceAll(
        /from.*('|").*three.module.js('|")/g,
        `from '${path
          .resolve(__dirname, '../build/three.module.js')
          .replaceAll('\\', '\\\\')}'`,
      );

      return {
        code: code,
        map: null,
      };
    },
  };
}
