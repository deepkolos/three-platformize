import path from 'path';
import copy from 'rollup-plugin-copy';
import * as fastGlob from 'fast-glob';
import {
  platformize,
  platformVariables,
  useRealOpentypeModule,
  importFromPlatfromizedThree,
} from './platfromize';

const ThreeOrigin = path.resolve(__dirname, '../three/build/three.module.js');

export default fastGlob.sync('three/examples/jsm/**/*.js').map(input => {
  return {
    input,
    output: {
      format: 'esm',
      file: input.replace('three/', ''),
    },
    external: () => true,
    plugins: [
      importFromPlatfromizedThree(),
      platformize(platformVariables, ThreeOrigin),
      useRealOpentypeModule(),
      copy({
        targets: [
          {
            src: input.replace('.js', '.d.ts'),
            dest: path.dirname(input.replace('three/', '')),
          },
        ],
      }),
    ],
  };
});

// export default [
//   {
//     // input: ['three/examples/jsm/cameras/**/*.js'],
//     // input: {
//     //   'examples/jsm/cameras/CinematicCamera':
//     //     'three/examples/jsm/cameras/CinematicCamera.js',
//     // },
//     input: 'three/examples/jsm/cameras/CinematicCamera.js',
//     output: {
//       format: 'esm',
//       // dir: './',
//       file: 'examples/jsm/cameras/CinematicCamera.js',
//       paths: {
//         // [ThreePlatformize]: ThreePlatformize,
//       },
//     },
//     // external: [ThreePlatformize],
//     external: () => true,
//     plugins: [
//       // importFromPlatfromizedThree(),
//       platformize(platformVariables, ThreeOrigin),
//       // dirInputOutput(),
//     ],
//   },

//   // {
//   //   input: 'three/examples/jsm/loaders/GLTFLoader.js',
//   //   output: {
//   //     format: 'esm',
//   //     dir: 'build',
//   //     paths: {
//   //       [ThreePlatformize]: './three.module.js',
//   //     },
//   //   },
//   //   external: [ThreePlatformize],
//   //   plugins: [
//   //     importFromPlatfromizedThree(),
//   //     platformize(platformVariables, ThreePlatformize),
//   //   ],
//   // },
// ];
