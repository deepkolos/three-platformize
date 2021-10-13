import { WebGLNodeBuilder } from './WebGLNodeBuilder.js';
import NodeFrame from '../../nodes/core/NodeFrame.js';
import { Material } from '../../../../../build/three.module.js';

const builders = new WeakMap();
const nodeFrame = new NodeFrame();

Material.prototype.onBuild = function ( parameters, renderer ) {

	builders.set( this, new WebGLNodeBuilder( this, renderer, parameters ).build() );

};

Material.prototype.onBeforeRender = function ( renderer, scene, camera, geometry, object ) {

	const nodeBuilder = builders.get( this );

	if ( nodeBuilder !== undefined ) {

		nodeFrame.material = this;
		nodeFrame.camera = camera;
		nodeFrame.object = object;
		nodeFrame.renderer = renderer;

		for ( const node of nodeBuilder.updateNodes ) {

			nodeFrame.updateNode( node );

		}

	}

};

export { nodeFrame };
