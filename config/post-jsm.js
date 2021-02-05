const fs = require('fs');
const path = require('path');

const p = s => path.resolve(__dirname, s);

fs.copyFileSync(
  p('../tools/opentype.module.js'),
  p('../examples/jsm/libs/opentype.module.js'),
);
