const fs = require('fs');
const path = require('path');

const p = s => path.resolve(__dirname, s);

fs.copyFileSync(
  p('../tools/opentype.module.js'),
  p('../examples/jsm/libs/opentype.module.js'),
);

fs.copyFileSync(
  p('../tools/TGALoader.js'),
  p('../examples/jsm/loaders/TGALoader.js'),
);

// 增加export wasm base64
fs.copyFileSync(
  p('../tools/zstddec.module.js'),
  p('../examples/jsm/libs/zstddec.module.js'),
);
