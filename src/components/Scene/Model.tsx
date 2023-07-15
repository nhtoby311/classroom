/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from '@react-three/drei';

export function Model(props) {
	const { nodes, materials }: any = useGLTF('/classroom.glb');
	return (
		<group {...props} dispose={null}>
			<mesh castShadow receiveShadow geometry={nodes.room.geometry}>
				<meshStandardMaterial />
			</mesh>
			<mesh
				geometry={
					nodes['Window002|Glass_L_Windowblend|Dupli|2_glass_0']
						.geometry
				}
				material={materials['glass.001']}></mesh>
			<mesh
				geometry={
					nodes['Window003|Glass_L_Windowblend|Dupli|2_glass_0']
						.geometry
				}
				material={materials['glass.001']}></mesh>
		</group>
	);
}

useGLTF.preload('/classroom.glb');