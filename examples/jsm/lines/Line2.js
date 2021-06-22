import { LineSegments2 } from './LineSegments2.js';
import { LineGeometry } from './LineGeometry.js';
import { LineMaterial } from './LineMaterial.js';

class Line2 extends LineSegments2 {

	constructor( geometry = new LineGeometry(), material = new LineMaterial( { color: Math.random() * 0xffffff } ) ) {

		super( geometry, material );

		this.type = 'Line2';

	}

}

Line2.prototype.isLine2 = true;

export { Line2 };
