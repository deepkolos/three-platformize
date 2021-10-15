## [1.133.2](https://github.com/deepkolos/three-platformize/compare/v1.133.1...v1.133.2) (2021-10-15)


### Features

* support VTKLoader ([87fa081](https://github.com/deepkolos/three-platformize/commit/87fa081c5cf8757e6534aa4375edba0e1d415679))



## [1.133.1](https://github.com/deepkolos/three-platformize/compare/v1.0.23...v1.133.1) (2021-10-13)


### Bug Fixes

* buffer.slice ([7b7ea0a](https://github.com/deepkolos/three-platformize/commit/7b7ea0a44ec62f10663c12f9673a1d5b850ca2a4))
* dispose shader recompile error ([7051938](https://github.com/deepkolos/three-platformize/commit/70519382fd92f40a0e3dc3c55bd1ffbdd6e8439b))
* sync PR filename & dispose ([80e8736](https://github.com/deepkolos/three-platformize/commit/80e8736fa20b7aeff25ed98fb44ebae40bb18c90))
* taobao pointerEvent ([b395fee](https://github.com/deepkolos/three-platformize/commit/b395feec36b77f18440ea000ae6c7572dee08d5d))


### Features

* add GLTFGPUCompressedTexture(doing) ([22cbda5](https://github.com/deepkolos/three-platformize/commit/22cbda53f36595a0d075888feda838895bf24568))
* add worker pool & zstd decoder dispose function ([57c9041](https://github.com/deepkolos/three-platformize/commit/57c90413a32406ad1ed7a423d0d8bfb0a58703e5))
* add WorkerPool & ZSTDDecoderWorker ([8735504](https://github.com/deepkolos/three-platformize/commit/8735504419344146ad266e0e548c85a7e52beea7))
* build confg update ([892832a](https://github.com/deepkolos/three-platformize/commit/892832a57c7fc885564480cd29c8191f90e264dc))
* GLTFGPUCompressedTexture add zstd support ([a306d38](https://github.com/deepkolos/three-platformize/commit/a306d38e1eb80c7a7fb497b123305a531b4c2fff))
* GLTFGPUCompressedTexture support load mipmap ([d67cd84](https://github.com/deepkolos/three-platformize/commit/d67cd84380bf93fbfa1169185f0ab418a4a407da))
* improve GLTFGPUCompressedTexture test case ([1aac31b](https://github.com/deepkolos/three-platformize/commit/1aac31bd10057b9ab716651dcbeae174594d0bc0))
* shade zstd wasm data between zstddec and zstddec worker ([e4c89cc](https://github.com/deepkolos/three-platformize/commit/e4c89cc70d3753bca29e277a4ae1a080baa6f711))
* taobao add getFromCloud helper ([8d393a3](https://github.com/deepkolos/three-platformize/commit/8d393a39090fdffb32d21460a9690c9a5a4021e5))
* update three to 133 & copy @types/three/examples/*.d.ts ([2f45f26](https://github.com/deepkolos/three-platformize/commit/2f45f2678685d52c2c2a0ae4a37437f52c8549d3))
* update three to r132 ([2a2c461](https://github.com/deepkolos/three-platformize/commit/2a2c4615f735196452778c5dc7a1b43a2b631b5e))
* update to r129 ([0cabace](https://github.com/deepkolos/three-platformize/commit/0cabace53f899e12b22e4014af3c7f2ac631faeb))
* update to r131 & add pointerEvent polyfill ([e0cb77b](https://github.com/deepkolos/three-platformize/commit/e0cb77bbc23a8f846605cd40254e8cd04673bcdd))



## [1.0.23](https://github.com/deepkolos/three-platformize/compare/1.0.22...v1.0.23) (2021-05-27)


### Bug Fixes

* byte canvas dispose ([e4a1add](https://github.com/deepkolos/three-platformize/commit/e4a1add4bd29e9b608066b15d2a42b480aa1b9fe))
* wechat game touchevent ([e6b6cef](https://github.com/deepkolos/three-platformize/commit/e6b6cef4b56ad257a9edc94c63f2383ff310752a))


### Features

* add wechat minigame platform ([1d33e29](https://github.com/deepkolos/three-platformize/commit/1d33e29dc6e79c9f09fa243512d66f1836163eed))



## [1.0.22](https://github.com/deepkolos/three-platformize/compare/v1.0.22...1.0.22) (2021-05-16)



## [1.0.22](https://github.com/deepkolos/three-platformize/compare/v1.0.21...v1.0.22) (2021-05-16)


### Bug Fixes

* BytePlatform img addEventListener ([b64a8a1](https://github.com/deepkolos/three-platformize/commit/b64a8a197288a879bbb7b9d7ddb71d92281e3b86))
* TaobaoPlatform readFile encoding ([d612dbb](https://github.com/deepkolos/three-platformize/commit/d612dbbf2f6e2305107d665da9bc45a43f5d686c))


### Features

* add BytePlatform(dev) & doc update ([b2368f2](https://github.com/deepkolos/three-platformize/commit/b2368f25858589fd6e678d2fca78187a5f26aab3))
* add MeshoptDecoder WXWebAssembly ([d311781](https://github.com/deepkolos/three-platformize/commit/d311781e75c3d2b46431b6c59390ddeca1131feb))



## [1.0.21](https://github.com/deepkolos/three-platformize/compare/v1.0.20...v1.0.21) (2021-04-23)


### Bug Fixes

* wechat useFetchPatch ([2a1f68b](https://github.com/deepkolos/three-platformize/commit/2a1f68bcf6514300d507dfa00c8304f04db240ee))



## [1.0.20](https://github.com/deepkolos/three-platformize/compare/v1.0.19...v1.0.20) (2021-04-19)


### Bug Fixes

* browserPlatform OffscreenCanvas ReferenceError ([a4cc3bb](https://github.com/deepkolos/three-platformize/commit/a4cc3bb1a757e3a30f2c7d398f35afdfe6644d60))



## [1.0.19](https://github.com/deepkolos/three-platformize/compare/v1.0.18...v1.0.19) (2021-04-14)


### Features

* add wechat ios xhr patch ([906d2b5](https://github.com/deepkolos/three-platformize/commit/906d2b5b0df037d4ee38dbf95977f56ea8413a87))



## [1.0.18](https://github.com/deepkolos/three-platformize/compare/v1.0.17...v1.0.18) (2021-04-12)


### Bug Fixes

* sync r127 rollup config ([75048b7](https://github.com/deepkolos/three-platformize/commit/75048b7e889562a9407cf3befa3c58fee797644e))


### Features

* three updata to r127 ([b7a4e68](https://github.com/deepkolos/three-platformize/commit/b7a4e689bd956038b92cbd68d7c78c8a73f6c992))



## [1.0.17](https://github.com/deepkolos/three-platformize/compare/v1.0.16...v1.0.17) (2021-04-02)


### Features

* add screenshot solution [#8](https://github.com/deepkolos/three-platformize/issues/8) ([de2760e](https://github.com/deepkolos/three-platformize/commit/de2760eb47392952f2af32a3b486103485c0ae42))



## [1.0.16](https://github.com/deepkolos/three-platformize/compare/v1.0.15...v1.0.16) (2021-03-26)


### Features

* update three 126.1 & fix: disposeNode ([4933a7b](https://github.com/deepkolos/three-platformize/commit/4933a7b3b3ad702bbe8d1effebf0b79d3d69d774))



## [1.0.15](https://github.com/deepkolos/three-platformize/compare/v1.0.14...v1.0.15) (2021-03-19)


### Bug Fixes

* 缓解 ios memory leak ([29926f6](https://github.com/deepkolos/three-platformize/commit/29926f62d05d677d421b8abde8ba12ced918d3d1))
* platform dispose error ([69d2640](https://github.com/deepkolos/three-platformize/commit/69d264001ef75ac3c672d791e5bc397b5043ca66))
* replace arraybuffer to base64 lib ([319a80a](https://github.com/deepkolos/three-platformize/commit/319a80a5d55e85323e976c382e383ffed36f7a74))
* wechat multi instance event overwrite by other ([95611ad](https://github.com/deepkolos/three-platformize/commit/95611ade04d624cf89dd2442f17589e51a07eaf1))



## [1.0.14](https://github.com/deepkolos/three-platformize/compare/v1.0.13...v1.0.14) (2021-03-13)


### Bug Fixes

* taobao新版IDE 加载glb失败问题 ([03b9af3](https://github.com/deepkolos/three-platformize/commit/03b9af35c774469c074a0764158dcee87da12ae5))
* wechat disableDeviceOrientation ([0f0353d](https://github.com/deepkolos/three-platformize/commit/0f0353d66deb083a3029dae444a46c3b010df6bb))
* wechat dispose error ([c08bb19](https://github.com/deepkolos/three-platformize/commit/c08bb19a974f4236cbaf6392cb7f48a65bcbab4d))
* wechat onDeviceMotionChange ([55ac960](https://github.com/deepkolos/three-platformize/commit/55ac96014481029952c5387435590864f2a4778f))



## [1.0.13](https://github.com/deepkolos/three-platformize/compare/v1.0.12...v1.0.13) (2021-03-04)


### Bug Fixes

* [#3](https://github.com/deepkolos/three-platformize/issues/3) taobao ios load texture & EXT_blend_minmax error ([28a2d3f](https://github.com/deepkolos/three-platformize/commit/28a2d3f2d734cc0153e0acff08305bf0c8b2233f))
* taobao onDeviceMotionChange ([ecbdfa6](https://github.com/deepkolos/three-platformize/commit/ecbdfa6f63c3f7e58c1504a028514cd6a2417bb9))
* TGALoader's texture default setting ([473e942](https://github.com/deepkolos/three-platformize/commit/473e94256e5c1e7829bf57c8faf353887ab719b1))



## [1.0.12](https://github.com/deepkolos/three-platformize/compare/v1.0.11...v1.0.12) (2021-02-28)


### Bug Fixes

* npmignore ([527651f](https://github.com/deepkolos/three-platformize/commit/527651f1fc164df95c7588f7b68dc2ae5b2d6baf))



## [1.0.11](https://github.com/deepkolos/three-platformize/compare/v1.0.10...v1.0.11) (2021-02-28)


### Bug Fixes

* [#4](https://github.com/deepkolos/three-platformize/issues/4) taobao phone preview error ([077df6c](https://github.com/deepkolos/three-platformize/commit/077df6c89651f077e0e59f1cff6dc1998ee1c9be))
* TaobaoPlatformTextureLoader & touchevent ([61985ec](https://github.com/deepkolos/three-platformize/commit/61985ece7b5d7c44c4852bb87192013dc307f7ed))
* update Platform.d.ts ([9325f7b](https://github.com/deepkolos/three-platformize/commit/9325f7bc173a9e253fdd37c189641162c2cf3929))


### Features

* add flip ([1289c17](https://github.com/deepkolos/three-platformize/commit/1289c173af1eab08cbc7339284e6a11feca5bfeb))
* TGALoader ([6558fc9](https://github.com/deepkolos/three-platformize/commit/6558fc925f75be792dd24aa9f31286b161e13caf))



## [1.0.10](https://github.com/deepkolos/three-platformize/compare/v1.0.9...v1.0.10) (2021-02-16)


### Bug Fixes

* export cancelAnimationFrame ([c056f74](https://github.com/deepkolos/three-platformize/commit/c056f74f51e158920ce3ed464d93fc92d9f329a8))
* taobao canvas h w ([27f2731](https://github.com/deepkolos/three-platformize/commit/27f2731ac791e6a4ee1410f47e11c4a947ccb56c))


### Features

* add MeshoptDecoder asm ([0d6b77e](https://github.com/deepkolos/three-platformize/commit/0d6b77eb52d0ad5e38d98538ef142b0720a49c74))



## [1.0.9](https://github.com/deepkolos/three-platformize/compare/v1.0.8...v1.0.9) (2021-02-05)


### Bug Fixes

* [#1](https://github.com/deepkolos/three-platformize/issues/1) TextDecoder ios doesn't work ([b054065](https://github.com/deepkolos/three-platformize/commit/b054065bbb3c70745b9f2af239f8affd540e6ce9))


### Features

* adapte TTFLoader ([d75be59](https://github.com/deepkolos/three-platformize/commit/d75be597b60c3631eb5258e0b32ac3ce9497b167))



## [1.0.8](https://github.com/deepkolos/three-platformize/compare/v1.0.7...v1.0.8) (2021-02-04)


### Features

* add adapter for ColladaLoader & doc update ([8e2e437](https://github.com/deepkolos/three-platformize/commit/8e2e4376dc4b1ca719d38504dc3dbff653046021))



## [1.0.7](https://github.com/deepkolos/three-platformize/compare/v1.0.6...v1.0.7) (2021-02-02)


### Features

* add ldr support & doc update ([7a46f04](https://github.com/deepkolos/three-platformize/commit/7a46f041546688aa8d7d9d2f91c3d6e48039f4bf))
* update three version 0.125.2 & fix $window type error ([019724b](https://github.com/deepkolos/three-platformize/commit/019724b8c818afdb7404485107f27ba543700d19))



## [1.0.6](https://github.com/deepkolos/three-platformize/compare/v1.0.5...v1.0.6) (2021-01-31)


### Bug Fixes

* toEnvMap import ([f4178ba](https://github.com/deepkolos/three-platformize/commit/f4178ba31b93c976ed26b5248a2039c800bf5ac6))


### Features

* add HDRPrefilterTexture ([11ff624](https://github.com/deepkolos/three-platformize/commit/11ff624fbc4cf8d83e1927043a393870685fdd68))
* HDRPrefilterTexture -> toEnvMap ([8e59f69](https://github.com/deepkolos/three-platformize/commit/8e59f6995a9e8c97018d0f70a8bf26e944c829d3))



## [1.0.5](https://github.com/deepkolos/three-platformize/compare/v1.0.4...v1.0.5) (2021-01-27)


### Bug Fixes

* meshopt location at examples/jsm/libs ([4cda31b](https://github.com/deepkolos/three-platformize/commit/4cda31b66c6c24a588009b7995f81817f60f29ab))
* update npmignore ([936eac9](https://github.com/deepkolos/three-platformize/commit/936eac97f44a9d732fe569f59778cd2741caf197))


### Features

* add meshopt & doc update & fix ownerDocument ([a6368e5](https://github.com/deepkolos/three-platformize/commit/a6368e53088f89c113adb4c2ee8bde7788a235e7))
* add TextDecoder polyfill & EXRLoader works ([25ff7c7](https://github.com/deepkolos/three-platformize/commit/25ff7c7dfa2b48e3f7cf781b15e2855edab9be9e))



## [1.0.4](https://github.com/deepkolos/three-platformize/compare/v1.0.3...v1.0.4) (2021-01-21)


### Features

* adapt DOMParser & SVGLoader ([254b1fe](https://github.com/deepkolos/three-platformize/commit/254b1fe6978008a95628561d66cf1dcd35d22ba3))



## [1.0.3](https://github.com/deepkolos/three-platformize/compare/v1.0.2...v1.0.3) (2021-01-20)


### Features

* adapt deviceorientation event ([1b5c901](https://github.com/deepkolos/three-platformize/commit/1b5c9018a5026804821680839cd4a2d59ac989ce))
* adapt DeviceOrientationControls ([6f44f30](https://github.com/deepkolos/three-platformize/commit/6f44f30f5956bbfc133fdf9b2d94db2555dcfa25))



## [1.0.2](https://github.com/deepkolos/three-platformize/compare/v1.0.1...v1.0.2) (2021-01-18)


### Bug Fixes

* URL polyfill ([0041ab4](https://github.com/deepkolos/three-platformize/commit/0041ab4ee5a7561457bd421a9e1540cbf8c64187))



## [1.0.1](https://github.com/deepkolos/three-platformize/compare/8460343f8277e439407152c00a1f60739c518cb5...v1.0.1) (2021-01-18)


### Bug Fixes

* taobao小程序实现GLB加载 ([830a271](https://github.com/deepkolos/three-platformize/commit/830a271868c796e032cf07965d5dc5c893bc2c58))


### Features

* platformize createImageBitmap & examples/jsm ([8460343](https://github.com/deepkolos/three-platformize/commit/8460343f8277e439407152c00a1f60739c518cb5))



