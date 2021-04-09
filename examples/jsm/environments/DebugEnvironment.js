import { Scene, BoxGeometry, MeshStandardMaterial, BackSide, Mesh, PointLight, MeshLambertMaterial } from '../../../build/three.module.js';

function DebugEnvironment() {

	const envScene = new Scene();

	const geometry = new BoxGeometry();
	geometry.deleteAttribute( 'uv' );
	const roomMaterial = new MeshStandardMaterial( { metalness: 0, side: BackSide } );
	const room = new Mesh( geometry, roomMaterial );
	room.scale.setScalar( 10 );
	envScene.add( room );

	const mainLight = new PointLight( 0xffffff, 50, 0, 2 );
	envScene.add( mainLight );

	const material1 = new MeshLambertMaterial( { color: 0xff0000, emissive: 0xffffff, emissiveIntensity: 10 } );

	const light1 = new Mesh( geometry, material1 );
	light1.position.set( - 5, 2, 0 );
	light1.scale.set( 0.1, 1, 1 );
	envScene.add( light1 );

	const material2 = new MeshLambertMaterial( { color: 0x00ff00, emissive: 0xffffff, emissiveIntensity: 10 } );

	const light2 = new Mesh( geometry, material2 );
	light2.position.set( 0, 5, 0 );
	light2.scale.set( 1, 0.1, 1 );
	envScene.add( light2 );

	const material3 = new MeshLambertMaterial( { color: 0x0000ff, emissive: 0xffffff, emissiveIntensity: 10 } );

	const light3 = new Mesh( geometry, material3 );
	light3.position.set( 2, 1, 5 );
	light3.scale.set( 1.5, 2, 0.1 );
	envScene.add( light3 );

	return envScene;

}

export { DebugEnvironment };
