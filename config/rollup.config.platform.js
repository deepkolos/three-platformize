export default ['BrowserPlatform', 'TaobaoPlatform', 'WechatPlatform'].map(
  platform => ({
    input: `src/${platform}/index.js`,
    output: {
      format: 'esm',
      file: `build/${platform}.js`
    },
  }),
);
