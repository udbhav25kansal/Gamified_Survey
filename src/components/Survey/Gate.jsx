import React from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';

const Gate = ({ position, text, color, onEnter }) => {
    const [px, py, pz] = position;
    
    const [ref] = useBox(() => ({
        isTrigger: true,
        position: [px, py + 2, pz], // Center the trigger box
        args: [3, 4, 1],
        onCollide: (e) => {
            if (e.body.name === 'chassis') {
                onEnter?.();
            }
        }
    }));

    return (
        <group position={position}>
            {/* Invisible trigger uses ref from useBox */}
            <mesh ref={ref} visible={false}>
                <boxGeometry args={[3, 4, 1]} />
            </mesh>
            
            {/* Arch Visuals */}
            <mesh position={[-1.5, 2, 0]}>
                <boxGeometry args={[0.2, 4, 0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[1.5, 2, 0]}>
                <boxGeometry args={[0.2, 4, 0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[3.2, 0.2, 0.2]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>

            {/* Text Label */}
            <Text position={[0, 3, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                {text}
            </Text>
        </group>
    );
};

export default Gate;
