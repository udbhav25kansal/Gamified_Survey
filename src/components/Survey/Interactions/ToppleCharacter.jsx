import React, { useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ToppleCharacter = ({ position, color = '#E6007E', scale = 1, characterType = 'box' }) => {
    const [toppled, setToppled] = useState(false);

    // Physics body - can be knocked over
    const [ref, api] = useBox(() => ({
        mass: 50,
        position,
        args: [1 * scale, 3 * scale, 1 * scale], // Width, Height, Depth
        allowSleep: false,
        linearDamping: 0.4,
        angularDamping: 0.4,
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !toppled) {
                setToppled(true);
                // Play sound effect here if you add audio
            }
        }
    }));

    // Slow recovery - stand back up after being knocked over
    useFrame(() => {
        if (toppled) {
            // Get current rotation
            const rotation = new THREE.Euler();
            ref.current?.rotation && rotation.setFromQuaternion(ref.current.quaternion);

            // If lying down too long, gradually stand back up
            if (Math.abs(rotation.x) > 0.5 || Math.abs(rotation.z) > 0.5) {
                // Apply small upward torque to slowly stand up
                api.applyTorque([0, 0, 0]);
                api.angularVelocity.set(0, 0, 0);

                // Reset toppled state after 5 seconds
                setTimeout(() => {
                    api.position.set(position[0], position[1], position[2]);
                    api.rotation.set(0, 0, 0);
                    api.velocity.set(0, 0, 0);
                    api.angularVelocity.set(0, 0, 0);
                    setToppled(false);
                }, 5000);
            }
        }
    });

    // Simple box character for now (can be replaced with 3D models later)
    return (
        <group ref={ref}>
            {/* Body */}
            <mesh castShadow>
                <boxGeometry args={[1 * scale, 3 * scale, 1 * scale]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Head */}
            <mesh position={[0, 1.8 * scale, 0]} castShadow>
                <sphereGeometry args={[0.6 * scale, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>

            {/* Eyes (simple dots) */}
            <mesh position={[-0.2 * scale, 1.9 * scale, 0.5 * scale]}>
                <sphereGeometry args={[0.1 * scale, 8, 8]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.2 * scale, 1.9 * scale, 0.5 * scale]}>
                <sphereGeometry args={[0.1 * scale, 8, 8]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            </mesh>

            {/* Base platform (ground contact) */}
            <mesh position={[0, -1.6 * scale, 0]} castShadow>
                <cylinderGeometry args={[0.6 * scale, 0.6 * scale, 0.2 * scale, 16]} />
                <meshStandardMaterial
                    color="#333"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Spotlight on character */}
            <spotLight
                position={[0, 5 * scale, 0]}
                angle={0.3}
                penumbra={0.5}
                intensity={0.5}
                castShadow={false}
                color={color}
            />
        </group>
    );
};

export default ToppleCharacter;
