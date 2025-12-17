import React from 'react';
import { usePlane } from '@react-three/cannon';
import Vehicle from '../Vehicle/Vehicle';
import ZoneManager from '../Survey/ZoneManager';

const Floor = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        material: { friction: 0.01, restitution: 0.1 }
    }));

    return (
        <group>
            {/* Main floor - extends far in all directions */}
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial
                    color="#111111"
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>

            {/* Glowing grid overlay - centered further back to cover survey zones */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -200]}>
                <planeGeometry args={[500, 600]} />
                <meshBasicMaterial
                    color="#E6007E"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Grid helper - large and centered to cover survey areas */}
            <gridHelper
                args={[500, 250, '#E6007E', '#333333']}
                position={[0, 0.02, -100]}
            />
        </group>
    );
};

// Decorative cyberpunk elements spread throughout the world
const DecorativeElements = () => {
    // Use fixed seed for consistent random positions
    const cubePositions = React.useMemo(() => {
        const positions = [];
        for (let i = 0; i < 40; i++) {
            positions.push({
                x: (Math.sin(i * 1.5) * 0.5 + 0.5 - 0.5) * 150,
                y: (Math.cos(i * 2.3) * 0.5 + 0.5) * 4 + 2,
                z: -i * 8 + (Math.sin(i * 3.7) * 20),
                size: (Math.abs(Math.sin(i * 4.1)) * 0.5 + 0.3)
            });
        }
        return positions;
    }, []);

    return (
        <group>
            {/* Floating data cubes along the path */}
            {cubePositions.map((pos, i) => (
                <mesh key={i} position={[pos.x, pos.y, pos.z]}>
                    <boxGeometry args={[pos.size, pos.size, pos.size]} />
                    <meshStandardMaterial
                        color="#E6007E"
                        emissive="#E6007E"
                        emissiveIntensity={2}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}

            {/* Neon pillars along the sides of the path */}
            {Array.from({ length: 20 }).map((_, i) => (
                <React.Fragment key={`pillars-${i}`}>
                    <mesh position={[-25, 4, -i * 15]}>
                        <cylinderGeometry args={[0.3, 0.3, 8, 8]} />
                        <meshStandardMaterial
                            color="#00D4FF"
                            emissive="#00D4FF"
                            emissiveIntensity={1.5}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                    <mesh position={[25, 4, -i * 15]}>
                        <cylinderGeometry args={[0.3, 0.3, 8, 8]} />
                        <meshStandardMaterial
                            color="#00D4FF"
                            emissive="#00D4FF"
                            emissiveIntensity={1.5}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                </React.Fragment>
            ))}
        </group>
    );
};

const World = () => {
    return (
        <>
            <Floor />
            <DecorativeElements />
            <Vehicle position={[0, 1, 0]} />
            <ZoneManager />
        </>
    );
};

export default World;
