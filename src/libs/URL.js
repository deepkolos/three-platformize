import Blob from './Blob';
import { encode as ArrayBufferToBase64 } from './base64-arraybuffer';

export default class $URL {
  createObjectURL(obj) {
    if (obj instanceof Blob) {
      // TODO: use wasm to improve decode performance
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
