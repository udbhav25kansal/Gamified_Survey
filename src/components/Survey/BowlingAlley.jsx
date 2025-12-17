import React from 'react';
import { useCylinder, useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';

const Pin = ({ position }) => {
    const [ref] = useCylinder(() => ({
        mass: 0.5,
        position,
        args: [0.2, 0.2, 1.5, 16],
        material: { friction: 0.3, restitution: 0.2 },
    }));

    return (
        <mesh ref={ref} name="pin" castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
            <meshStandardMaterial color="white" />
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.21, 0.21, 0.1, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </mesh>
    );
};

const Bumper = ({ position }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position,
        args: [0.5, 1, 10],
    }));

    return (
        <mesh ref={ref} receiveShadow>
            <boxGeometry args={[0.5, 1, 10]} />
            <meshStandardMaterial color="#555" />
        </mesh>
    );
};

const BowlingAlley = ({ position = [0, 0, 0], question }) => {
    // Calculate absolute positions for pins (10-pin bowling setup)
    const [gx, gy, gz] = position;
    
    const pinPositions = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col <= row; col++) {
            const x = (col - row / 2) * 0.8;
            const z = row * 0.8;
            // Add group position to get world coordinates
            pinPositions.push([gx + x, gy + 0.75, gz + z]);
        }
    }

    return (
        <group>
            <Text 
                position={[gx, gy + 6, gz]} 
                fontSize={1} 
                color="white" 
                anchorX="center" 
                anchorY="middle" 
                outlineWidth={0.05} 
                outlineColor="black"
            >
                {question} (Smash for Stars!)
            </Text>

            {/* The Pins - with world coordinates */}
            {pinPositions.map((pos, i) => (
                <Pin key={i} position={pos} />
            ))}

            {/* Side Bumpers with physics */}
            <Bumper position={[gx - 3, gy + 0.5, gz]} />
            <Bumper position={[gx + 3, gy + 0.5, gz]} />
        </group>
    );
};

export default BowlingAlley;
