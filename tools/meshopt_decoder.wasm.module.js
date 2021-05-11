// This file is part of meshoptimizer library and is distributed under the terms of MIT License.
// Copyright (C) 2016-2020, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com)
var MeshoptDecoder = (function (path) {
  // Built with clang version 11.0.0 (https://github.com/llvm/llvm-project.git 0160ad802e899c2922bc9b29564080c22eb0908c)
  // Built from meshoptimizer 0.14

  if (typeof WXWebAssembly !== 'object') {
    // This module requires WebAssembly to function
    return {
      supported: false,
    };
  }

  var instance;
  var readyResolve;
  var promise = new Promise((resovle) => {
    readyResolve = resovle
  })

  function setWasmPath(path) {
    WXWebAssembly.instantiate(path, {}).then(function (result) {
      instance = result.instance;
      instance.exports.__wasm_call_ctors();
      readyResolve()
    });
  }


  function decode(fun, target, count, size, source, filter) {
    var sbrk = instance.exports.sbrk;
    var count4 = (count + 3) & ~3; // pad for SIMD filter
    var tp = sbrk(count4 * size);
    var sp = sbrk(source.length);
    var heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(source, sp);
    var res = fun(tp, count, size, sp, source.length);
    if (res == 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res != 0) {
      throw new Error('Malformed buffer data: ' + res);
    }
  }
  var filters = {
    // legacy index-based enums for glTF
    0: '',
    1: 'meshopt_decodeFilterOct',
    2: 'meshopt_decodeFilterQuat',
    3: 'meshopt_decodeFilterExp',
    // string-based enums for glTF
    NONE: '',
    OCTAHEDRAL: 'meshopt_decodeFilterOct',
    QUATERNION: 'meshopt_decodeFilterQuat',
    EXPONENTIAL: 'meshopt_decodeFilterExp',
  };

  var decoders = {
    // legacy index-based enums for glTF
    0: 'meshopt_decodeVertexBuffer',
    1: 'meshopt_decodeIndexBuffer',
    2: 'meshopt_decodeIndexSequence',
    // string-based enums for glTF
    ATTRIBUTES: 'meshopt_decodeVertexBuffer',
    TRIANGLES: 'meshopt_decodeIndexBuffer',
    INDICES: 'meshopt_decodeIndexSequence',
  };

  return {
    setWasmPath,
    ready: promise,
    supported: true,
    decodeVertexBuffer: function (target, count, size, source, filter) {
      decode(
        instance.exports.meshopt_decodeVertexBuffer,
        target,
        count,
        size,
        source,
        instance.exports[filters[filter]],
      );
    },
    decodeIndexBuffer: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexBuffer, target, count, size, source);
    },
    decodeIndexSequence: function (target, count, size, source) {
      decode(instance.exports.meshopt_decodeIndexSequence, target, count, size, source);
    },
    decodeGltfBuffer: function (target, count, size, source, mode, filter) {
      decode(
        instance.exports[decoders[mode]],
        target,
        count,
        size,
        source,
        instance.exports[filters[filter]],
      );
    },
  };
})();

export { MeshoptDecoder };
