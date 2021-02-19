# three-platformize

一个让 THREE 平台化的项目

0. 目前已适配微信小程序，淘宝小程序
1. 支持 tree shaking（需用 webpack，rollup 等构建工具）
2. VSCode types 正常，能正常访问各个类的定义
3. 适配 examples/jsm/\*\*/\*.js，types 正常
4. 可升级、降级版本或使用自定义 THREE

## DEMO

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-wechat/master/demo.gif" width="250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-taobao/master/demo.gif" width="250" alt="" style="display:inline-block;"/>
</div>

[微信小程序 DEMO](https://github.com/deepkolos/three-platformize-demo-wechat)

[淘宝小程序 DEMO](https://github.com/deepkolos/three-platformize-demo-taobao)

> 注：运行 DEMO 时记得开启调试模式，取消域名验证，淘宝小程序由于缺少真机调试账号，所以仅仅测试模拟器的情况，真机尚未测试

### 已测试模块

#### Loader

0. GLTFLoader (支持带纹理的 GLB) && (EXT_meshopt_compression 安卓可用WASM，ios可用ASM版，见tools) && (KHR_mesh_quantization，小程序可用)
1. TextureLoader
2. RGBELoader & PMREMGenerator (小程序部分机型可能偶现[生成 envMap 错误](https://juejin.cn/post/6922829073920032775)，可用[HDRPrefilter](https://github.com/deepkolos/hdr-prefilter-texture)避免 )
3. SVGLoader
4. OBJLoader
5. EXRLoader (需支持 OES_texture_float_linear 扩展，部分移动端 GPU 不支持)
6. MTLLoader (小程序使用 JPG 纹理即可)
7. DDSLoader (需支持 WEBGL_compressed_texture_s3tc 扩展，移动端 GPU 不支持)
8. LWOLoader (需支持 EXT_blend_minmax 扩展，小程序一半效果绘制出错)
9. FBXLoader
10. BVHLoader
11. ColladaLoader (TGALoader 尚未适配)
12. TTFLoader
13. STLLoader

#### Controls

0. OrbitControls & MapControls
1. DeviceOrientationControls

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
```

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

## TODO

0. 更彻底 dispose，减少内存泄漏
1. 适配头条小程序

### [CHANGELOG](https://github.com/deepkolos/three-platformize/blob/master/CHANGELOG.md)
