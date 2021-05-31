import Blob from './Blob';
import { encode as ArrayBufferToBase64 } from './base64-arraybuffer';

export default class $URL {
  createObjectURL(obj) {
    if (obj instanceof Blob) {
      // TODO: use wasm to improve decode performance
      // 经测试主要耗时在于字符串拼接，使用assemblyscript的字符串拼接比js拼接慢非常多

      // 组长找到更好的方式，使用wx.fileSystemManager写入临时文件来获取url，但是需要手动管理临时文件

      // const t = Date.now();
      const base64 = ArrayBufferToBase64(obj.parts[0]);
      const url = `data:${obj.options.type};base64,${base64}`;
      // console.log('createObjectURL', Date.now() - t);
      return url;
    }

    return '';
  }

  revokeObjectURL() {}
}
