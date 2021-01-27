export class $TextDecoder {
  /**
   * 不支持 UTF-8 code points 大于 1 字节
   * @see https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
   * @param {Uint8Array} uint8Array 
   */
  decode(uint8Array) {
    return String.fromCharCode.apply(null, uint8Array);
  }
}
