import ColorNode from './inputs/ColorNode.js';
import FloatNode from './inputs/FloatNode.js';
import Vector2Node from './inputs/Vector2Node.js';
import Vector3Node from './inputs/Vector3Node.js';
import Vector4Node from './inputs/Vector4Node.js';
import MathNode from './math/MathNode.js';
import OperatorNode from './math/OperatorNode.js';
import JoinNode from './utils/JoinNode.js';
import SplitNode from './utils/SplitNode.js';
import { Color, Vector2, Vector3, Vector4 } from '../../../../build/three.module.js';

// inputs

const NodeHandler = {

	get: function ( node, prop ) {

		// Split Properties Pass

		if ( typeof prop === 'string' && node[ prop ] === undefined ) {

			const splitProps = prop.match( /^[xyzw]{1,4}$/ );

			if ( splitProps !== null ) {

				return ShaderNodeObject( new SplitNode( node, splitProps[ 0 ] ) );

			}

		}

		return node[ prop ];

	}

};

const ShaderNodeObject = ( obj ) => {

	const type = typeof obj;

	if ( type === 'number' ) {

		return ShaderNodeObject( new FloatNode( obj ).setConst( true ) );

	} else if ( type === 'object' ) {

		if ( obj.isNode === true ) {

			const node = obj;

			if ( node.isProxyNode !== true ) {

				node.isProxyNode = true;

				return new Proxy( node, NodeHandler );

			}

		}

	}

	return obj;

};

const ShaderNodeArray = ( array ) => {

	const len = array.length;

	for ( let i = 0; i < len; i ++ ) {

		array[ i ] = ShaderNodeObject( array[ i ] );

	}

	return array;

};

const ShaderNodeScript = ( jsFunc ) => {

	return ( ...params ) => {

		ShaderNodeArray( params );

		return ShaderNodeObject( jsFunc( ...params ) );

	};

};

const ShaderNode = ( obj ) => {

	return ShaderNodeScript( obj );

};

//
// Node Material Shader Syntax
//

const uniform = ShaderNodeScript( ( inputNode ) => {

	inputNode.setConst( false );

	return inputNode;

} );

const float = ( val ) => {

	return ShaderNodeObject( new FloatNode( val ).setConst( true ) );

};

const color = ( ...params ) => {

	return ShaderNodeObject( new ColorNode( new Color( ...params ) ).setConst( true ) );

};

const join = ( ...params ) => {

	return ShaderNodeObject( new JoinNode( ShaderNodeArray( params ) ) );

};

const vec2 = ( ...params ) => {

	return ShaderNodeObject( new Vector2Node( new Vector2( ...params ) ).setConst( true ) );

};

const vec3 = ( ...params ) => {

	return ShaderNodeObject( new Vector3Node( new Vector3( ...params ) ).setConst( true ) );

};

const vec4 = ( ...params ) => {

	return ShaderNodeObject( new Vector4Node( new Vector4( ...params ) ).setConst( true ) );

};

const add = ( ...params ) => {

	return ShaderNodeObject( new OperatorNode( '+', ...ShaderNodeArray( params ) ) );

};

const sub = ( ...params ) => {

	return new OperatorNode( '-', ...ShaderNodeArray( params ) );

};

const mul = ( ...params ) => {

	return ShaderNodeObject( new OperatorNode( '*', ...ShaderNodeArray( params ) ) );

};

const div = ( ...params ) => {

	return ShaderNodeObject( new OperatorNode( '/', ...ShaderNodeArray( params ) ) );

};

const floor = ( ...params ) => {

	return ShaderNodeObject( new MathNode( 'floor', ...ShaderNodeArray( params ) ) );

};

const mod = ( ...params ) => {

	return ShaderNodeObject( new MathNode( 'mod', ...ShaderNodeArray( params ) ) );

};

const sign = ( ...params ) => {

	return ShaderNodeObject( new MathNode( 'sign', ...ShaderNodeArray( params ) ) );

};

export { ShaderNode, ShaderNodeArray, ShaderNodeObject, ShaderNodeScript, add, color, div, float, floor, join, mod, mul, sign, sub, uniform, vec2, vec3, vec4 };
