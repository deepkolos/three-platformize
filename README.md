# three-platformize

一个让 THREE 平台化的项目

0. 目前已适配微信小程序，淘宝小程序
1. 支持 tree shaking（需用 webpack，rollup 等构建工具）
2. VSCode types 正常，能正常访问各个类的定义
3. 适配 examples/jsm/\*\*/\*.js，types 正常（未完全测试）

## 使用

```js
import { PLATFORM } from 'three-platformize';
import WechatPlatform from 'three-platformize/src/WechatPlatform';

const platform = new WechatPlatform(canvas);

platform.enableDeviceOrientation('game'); // 开启DeviceOrientation
PLATFORM.set(platform); // webgl canvas

// 使用完毕后释放资源
PLATFORM.dispose();
```

## DEMO

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-wechat/master/demo.gif" width="250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/three-platformize-demo-taobao/master/demo.gif" width="250" alt="" style="display:inline-block;"/>
</div>

[微信小程序 DEMO](https://github.com/deepkolos/three-platformize-demo-wechat)

[淘宝小程序 DEMO](https://github.com/deepkolos/three-platformize-demo-taobao)

## 已测试模块

#### Loader

0. GLTFLoader
1. TextureLoader
2. RGBELoader & PMREMGenerator
3. SVGLoader
4. OBJLoader

#### Controls

0. OrbitControls & MapControls
1. DeviceOrientationControls

## 不支持模块

0. ImageBitmapLoader(微信小程序无 ImageBitmap)

## 有支持可能，但需要单独适配

0. BasisTextureLoader(微信小程序的Worker不好转发，经测试安卓可在worker内使用WASM)

## 实现

构建时替换平台相关的 api 调用，转发到 PLATFORM 的引用，通过 PLATFORM.set 更新

## 维护

### 如何更新 Three 的版本？

```shell
# 更新依赖three的版本
> npm i -S three@latest

# 建立软链接
> npm run link

# 构建
> npm run build
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

1. 适配头条小程序

### [CHANGELOG](https://github.com/deepkolos/three-platformize/blob/master/CHANGELOG.md)
