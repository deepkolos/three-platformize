# three-platformize

一个让 THREE 平台化的项目

0. 目前已适配微信小程序，淘宝小程序
1. 支持 tree shaking（sideEffects: false）
2. VSCode types 正常，能正常访问各个类的定义
3. 适配 examples/jsm，types 正常（未完全测试，仅仅测试了 GLTFLoader）

# 使用

```js
import { PLATFORM } from 'three-platformize';
import WechatPlatform from 'three-platformize/build/WechatPlatform';

PLATFORM.set(new WechatPlatform(canvas)); // webgl canvas

// 使用使用完毕后释放资源
PLATFORM.dispose();
```

# DEMO

[微信小程序DEMO]()

[淘宝小程序DEMO]()

# 实现

构建时替换平台相关的 api 调用，转发到 PLATFORM 的引用，通过PLATFORM.set更新

# 维护

### 如何更新Three的版本？

```shell
# 更新依赖three的版本
> npm i -S three@latest

# 建立软链接
> npm run link

# 构建
> npm run build
```

### 如何平台化自定义的Three？

```shell
# 把自定义Three link 到./three
> npx symlink-dir yourthree ./three

# 不适用软链接直接复制也行
> cp yourthree ./three

# 构建
> npm run build
```

# TODO

0. 适配头条小程序
1. 编写微信小程序DEMO
2. 编写淘宝小程序DEMO

# Bug

Blob 未完全适配，目前 gltf-loader 可加载 glb 文件(taobao 由于 API 没抄全，加载 glb 有问题)
