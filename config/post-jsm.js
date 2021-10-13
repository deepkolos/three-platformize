const fs = require('fs');
const path = require('path');
const fastGlob = require('fast-glob');

const p = s => path.resolve(__dirname, s);
const constants = fs.readFileSync(p('../three/src/constants.js'), {
  encoding: 'utf8',
});
const REVISION = constants.match(/REVISION = '(\d+)';/)[1] | 0;

fs.copyFileSync(
  p('../tools/opentype.module.js'),
  p('../examples/jsm/libs/opentype.module.js'),
);

if (REVISION <= 127) {
  fs.copyFileSync(
    p('../tools/TGALoader.js'),
    p('../examples/jsm/loaders/TGALoader.js'),
  );
}

// 增加export wasm base64
fs.copyFileSync(
  p('../tools/zstddec.module.js'),
  p('../examples/jsm/libs/zstddec.module.js'),
);

// 把的examples.d.ts复制到examples目录下
fastGlob
  .sync('./node_modules/@types/three/examples/jsm/**/*.d.ts')
  .forEach(file => {
    fs.copyFileSync(
      p('.' + file),
      p(file.replace('./node_modules/@types/three/', '../')),
    );
  });
