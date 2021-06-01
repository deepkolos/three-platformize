import cfgs from './rollup.config.three-origin.js';
import { injectPlatformCode, platformize } from './platfromize';
import { REVISION } from '../three/src/constants.js';

function polyfills() {
  return {
    transform(code, filePath) {
      if (filePath.endsWith('src/Three.js')) {
        code = "import './polyfills';\n" + code;

        code += "\nexport * from '../../src/Platform.js';\n";
      }

      return {
        code: code,
        map: null,
      };
    },
  };
}

cfgs.forEach((cfg, i) => {
  if (i < 2 && ~~REVISION < 126) cfg.plugins.unshift(polyfills());
  cfg.plugins.unshift(platformize(), injectPlatformCode());
  cfg.input = 'three/' + cfg.input;
});

export default cfgs;
