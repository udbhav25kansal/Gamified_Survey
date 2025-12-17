import React, { useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const StartGate = ({ position, onEnter }) => {
    const [triggered, setTriggered] = useState(false);
    const [proximityGlow, setProximityGlow] = useState(0);
    const diceRef = useRef();

    // Physics trigger zone
    const [triggerRef] = useBox(() => ({
        isTrigger: true,
        position,
        args: [6, 8, 2],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !triggered) {
                setTriggered(true);
                onEnter?.();
            }
        }
    }));

    // Rotate dice
    useFrame(({ clock }) => {
        if (diceRef.current) {
            diceRef.current.rotation.x = clock.getElapsedTime() * 0.5;
            diceRef.current.rotation.y = clock.getElapsedTime() * 0.7;
        }

        // Pulsing glow when not triggered
        if (!triggered) {
            setProximityGlow(0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.5);
        }
    });

    const glowIntensity = triggered ? 3 : 1 + proximityGlow;

    return (
        <group ref={triggerRef} position={position}>
            {/* Left pillar */}
            <mesh position={[-3, 2, 0]} castShadow>
                <boxGeometry args={[0.4, 8, 0.4]} />
                <meshStandardMaterial
                    color="#222"
                    emissive="#E6007E"
                    emissiveIntensity={glowIntensity}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Right pillar */}
            <mesh position={[3, 2, 0]} castShadow>
                <boxGeometry args={[0.4, 8, 0.4]} />
                <meshStandardMaterial
                    color="#222"
                    emissive="#E6007E"
                    emissiveIntensity={glowIntensity}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Top arch */}
            <mesh position={[0, 6, 0]} castShadow>
                <boxGeometry args={[6.8, 0.4, 0.4]} />
                <meshStandardMaterial
                    color="#222"
                    emissive="#E6007E"
                    emissiveIntensity={glowIntensity}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Main text: "LET'S ROLL!" */}
            <Text
                position={[0, 3, 0.5]}
                fontSize={0.8}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#E6007E"
            >
                LET'S ROLL!
            </Text>

            {/* Emoji: 🎯 (represented as target circles) */}
            <group position={[0, 1.5, 0.5]}>
                <mesh>
                    <circleGeometry args={[0.4, 32]} />
                    <meshStandardMaterial
                        color="white"
                        emissive="white"
                        emissiveIntensity={glowIntensity}
                    />
                </mesh>
                <mesh position={[0, 0, 0.01]}>
                    <circleGeometry args={[0.25, 32]} />
                    <meshStandardMaterial
                        color="#E6007E"
                        emissive="#E6007E"
                        emissiveIntensity={glowIntensity * 1.5}
                    />
                </mesh>
                <mesh position={[0, 0, 0.02]}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshStandardMaterial
                        color="white"
                        emissive="white"
                        emissiveIntensity={glowIntensity * 2}
                    />
                </mesh>
            </group>

            {/* Floating dice above gate */}
            <group ref={diceRef} position={[0, 7, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[0.6, 0.6, 0.6]} />
                    <meshStandardMaterial
                        color="white"
                        emissive="#00D4FF"
                        emissiveIntensity={glowIntensity * 0.8}
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>
                {/* Dice dots (simplified) */}
                {[-0.31, 0.31].map((x) =>
                    [-0.31, 0.31].map((y) => (
                        <mesh key={`${x}-${y}`} position={[x, y, 0.31]}>
                            <sphereGeometry args={[0.05, 8, 8]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    ))
                )}
            </group>

            {/* Ground particles/sparkles */}
            {!triggered && (
                <group position={[0, 0, 0]}>
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const radius = 3.5;
                        return (
                            <mesh
                                key={i}
                                position={[
                                    Math.cos(angle) * radius,
                                    0.1,
                                    Math.sin(angle) * radius
                                ]}
                            >
                                <sphereGeometry args={[0.05, 8, 8]} />
                                <meshStandardMaterial
                                    color="#00D4FF"
                                    emissive="#00D4FF"
                                    emissiveIntensity={proximityGlow * 3}
                                />
                            </mesh>
                        );
                    })}
                </group>
            )}

            {/* Ground glow circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <ringGeometry args={[3, 4, 64]} />
                <meshBasicMaterial
                    color="#E6007E"
                    transparent
                    opacity={proximityGlow * 0.3}
                />
            </mesh>

            {/* Lights */}
            <pointLight
                position={[-3, 4, 0]}
                intensity={glowIntensity * 0.5}
                distance={10}
                color="#E6007E"
            />
            <pointLight
                position={[3, 4, 0]}
                intensity={glowIntensity * 0.5}
                distance={10}
                color="#E6007E"
            />
            <pointLight
                position={[0, 7, 0]}
                intensity={glowIntensity * 0.8}
                distance={15}
                color="#00D4FF"
            />

            {/* Confetti burst when triggered */}
            {triggered && (
                <group>
                    {Array.from({ length: 30 }).map((_, i) => {
                        const angle = Math.random() * Math.PI * 2;
                        const radius = Math.random() * 5;
                        const height = Math.random() * 8;
                        return (
                            <mesh
                                key={i}
                                position={[
                                    Math.cos(angle) * radius,
                                    height,
                                    Math.sin(angle) * radius
                                ]}
                            >
                                <boxGeometry args={[0.1, 0.1, 0.1]} />
                                <meshStandardMaterial
                                    color={['#E6007E', '#00D4FF', '#FFD700'][i % 3]}
                                    emissive={['#E6007E', '#00D4FF', '#FFD700'][i % 3]}
                                    emissiveIntensity={2}
                                />
                            </mesh>
                        );
                    })}
                </group>
            )}
        </group>
    );
};

export default StartGate;
