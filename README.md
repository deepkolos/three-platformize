# three-platformize

一个让 THREE 平台化的项目

1. 目前已适配微信小程序(真机+模拟器)，淘宝小程序(模拟器+真机)，字节小程序（真机）
2. 支持 tree shaking（需用 webpack，rollup 等构建工具）
3. VSCode types 正常，能正常访问各个类的定义
4. 适配 examples/jsm/\*\*/\*.js，types 正常
5. 可升级、降级版本或使用自定义 THREE
6. 微信小程序 IOS 内存优化，更少切页面导致的崩溃
7. 支持自定义新平台适配，参考 WechatPlatform 编写适配器即可
8. [three-platformize-plugin-wechat](https://github.com/deepkolos/three-platformize-plugin-wechat) 支持微信插件跨插件复用

## DEMO

> 注：运行 DEMO 时记得开启调试模式，取消域名验证，使用**最新版本**微信开发工具打开

<table>
  <tbody>
    <tr>
      <th>
        <a href="https://github.com/deepkolos/three-platformize-demo-wechat"
          >微信小程序 DEMO</a
        ><br /><a
          href="https://github.com/deepkolos/three-platformize-demo-wechat-simple"
          >微信小程序基础版 DEMO</a
        >
      </th>
      <th>
        <a href="https://github.com/deepkolos/three-platformize-demo-taobao"
          >淘宝小程序 DEMO</a
        >
      </th>
      <th>
        <a href="https://github.com/deepkolos/three-platformize-demo-byte"
          >字节小程序 DEMO</a
        >
      </th>
    </tr>
    <tr>
      <td>
        <img
          src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-wechat/master/demo.gif"
          width="250"
          alt=""
        />
        <div>
          <img
            src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-wechat/master/qrcode.jpg"
            width="150"
            alt=""
          />
        </div>
      </td>
      <td>
        <img
          src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-taobao/master/demo.gif"
          width="250"
          alt=""
        />
      </td>
      <td>
        <img
          src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-byte/master/demo.gif"
          width="250"
          alt=""
        />
      </td>
    </tr>
  </tbody>
</table>

### 已测试模块

#### Loader

1. GLTFLoader (支持带纹理的 GLB) && (EXT_meshopt_compression 安卓可用 WASM，ios 可用 ASM 版，见 tools) && (KHR_mesh_quantization，小程序可用) [【网格压缩测评】MeshQuan、MeshOpt、Draco ](https://juejin.cn/post/6931954784018628621) (微信 8.0 后 WebAssembly API 已无法使用需要使用 WXWebAssembly, 且只支持包内 wasm, 已新增 meshopt_decoder.wasm.module, [使用见](https://github.com/deepkolos/three-platformize-demo/blob/main/src/MeshOpt.ts#L8))
2. TextureLoader
3. RGBELoader & PMREMGenerator (小程序部分机型可能偶现[生成 envMap 错误](https://juejin.cn/post/6922829073920032775)，可用[HDRPrefilter](https://github.com/deepkolos/hdr-prefilter-texture)避免 )
4. SVGLoader
5. OBJLoader
6. EXRLoader (需支持 OES_texture_float_linear 扩展，部分移动端 GPU 不支持)
7. MTLLoader (小程序使用 JPG 纹理即可)
8. DDSLoader (需支持 WEBGL_compressed_texture_s3tc 扩展，移动端 GPU 不支持)
9. LWOLoader (需支持 EXT_blend_minmax 扩展，小程序一半效果绘制出错)
10. FBXLoader
11. BVHLoader
12. ColladaLoader (DOMParser querySelector 未适配)
13. TTFLoader
14. STLLoader
15. PDBLoader
16. TGALoader (改用 DataTextureLoader PR 已合并，r127 可用)

#### Controls

0. OrbitControls & MapControls
1. DeviceOrientationControls (微信、淘宝小程序下 onDeviceMotionChange，安卓下返回数据质量极其低下，基本不可用，社区 bug 反馈 3 年多了，官方无修复意愿)

### 不支持模块

0. ImageBitmapLoader(微信小程序未开放 ImageBitmap)

### 有支持可能，但需要单独适配

0. BasisTextureLoader(微信小程序的 Worker 不好转发，经测试安卓可在 worker 内使用 WASM)

## 使用

```js
import * as THREE from 'three-platformize';
import WechatPlatform from 'three-platformize/src/WechatPlatform';

const platform = new WechatPlatform(canvas); // webgl canvas

platform.enableDeviceOrientation('game'); // 开启DeviceOrientation
THREE.PLATFORM.set(platform);

// 使用完毕后释放资源
THREE.PLATFORM.dispose();

// 正常使用three即可
// DEMO 代码示例见 https://github.com/deepkolos/three-platformize-demo
// 基础的使用DEMO见 https://github.com/deepkolos/three-platformize-demo-wechat-simple
```

### 经验

0. 淘宝小程序显示 RGB 格式纹理 (JPG) 有问题，通过 TextureLoader 加载纹理后，把 texture.format 设置为 RGBAFromat 即可(淘宝版本 9.20.0)
1. r126 不能设置全 pixelRatio，可以设置为一半，或者 2，不能是 3
2. 虽然支持加载 GLB，但图片是使用 js 版的 ArrayBuffer 转 base64，耗时且占用内存，虽可用 wasm 的 encoder 缓解 (https://github.com/marcosc90/encoding-wasm)
3. IOS 前后进入退出页面崩可以降低 pixelRatio 缓解
4. IOS 微信 readPixels 不支持抗锯齿，如果直接 canvas 的 buffer 需要关闭抗锯齿（antialias: false）, 另一种方式是 WebglRenderTarget，同时也可以开启抗锯齿，但是纹理大小受限（小米 8 下纹理宽/高不能超过 4096，需要注意先 setSize，再 setPixelRatio）（截图 Demo 见[微信小程序 DEMO](https://github.com/deepkolos/three-platformize-demo-wechat)）
5. 淘宝小程序有严格的域名验证，可使用云存储放模型，但是如果模型和纹理分开则需要手动关联，推荐 GLB

## 实现

构建时替换平台相关的 api 调用，转发到 PLATFORM 的引用，通过 PLATFORM.set 更新

## 维护

### 如何更新/降级 Three 的版本？

```shell
# 拉取源码
> git clone https://github.com/deepkolos/three-platformize

# 安装依赖
> npm i

# 更新到最新的three版本
> npm i -S three@latest
# 或者指定three版本
> npm i -S three@0.122.0

# 建立软链接
> npm run link

# 构建
> npm run build

# 使用
> npm link

# 到使用的项目目录，并链接
> cd your-project
> npm link three-platformize

# 或者自行发NPM包
```

### 如何平台化自定义的 Three？

```shell
# 把自定义Three link 到./three
> npx symlink-dir yourthree ./three

# 不使用软链接直接复制或者git submodule也可以
> cp yourthree ./three

# 构建
> npm run build
```

### 如何编写自定义平台？

可参考`src/WechatPlatform`或者`src/TaobaoPlatform`

```js
class CustomPlatform {
  getGlobals() {
    // 自定义的polyfill
    return {
      atob,
      Blob,
      window,
      document,
      XMLHttpRequest,
      OffscreenCanvas,
      HTMLCanvasElement,
      createImageBitmap,
    };
  }

  setWebGLExtensions() {
    return {
      // 可覆盖gl返回值，比如淘宝小程序IOS返回值不为null，但是扩展不可用的bug
      EXT_blend_minmax: null,
    };
  }

  dispose() {
    // 释放资源
  }
}
```

## TODO

0. 更彻底 dispose，减少内存泄漏，Web 测试用例已增加，微信小程序已增加，IOS 仍有内存问题，多次切页面仍会崩溃，3mb 模型 iphone7 打开 30 次
1. 适配头条小程序 done
2. 生成微信插件，通过插件实现 three 的代码跨小程序、跨小程序插件复用 done [three-platformize-plugin-wechat](https://github.com/deepkolos/three-platformize-plugin-wechat)

## 讨论

<img width="250" src="https://raw.githubusercontent.com/deepkolos/three-platformize/master/qq-group.jpg" />

### [CHANGELOG](https://github.com/deepkolos/three-platformize/blob/master/CHANGELOG.md)

# 赞助

如果项目对您有帮助或者有适配需求，欢迎打赏

<img src="https://upload-images.jianshu.io/upload_images/252050-d3d6bfdb1bb06ddd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="赞赏码" width="300">
