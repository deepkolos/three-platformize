import Blob from "./Blob";
import ArrayBufferToBase64 from "./ArrayBufferToBase64";

export default class $URL {

	createObjectURL(obj) {

		if (obj instanceof Blob) {

			const base64 = ArrayBufferToBase64(obj.parts[0]);
			const url = `data:${obj.options.type};base64,${base64}`;

      return url;

		}

		return "";
	}
	
	revokeObjectURL() {}

}
