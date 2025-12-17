import React, { useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const PlayButton = ({ position, onPress }) => {
    const [pressed, setPressed] = useState(false);
    const [glowIntensity, setGlowIntensity] = useState(1);

    // Physics trigger zone - larger for easier detection
    const [triggerRef] = useBox(() => ({
        isTrigger: true,
        position,
        args: [3, 0.5, 3], // Larger detection area
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !pressed) {
                setPressed(true);
                onPress();
            }
        }
    }));

    // Pulsing glow animation when not pressed
    useFrame(({ clock }) => {
        if (!pressed) {
            setGlowIntensity(1 + Math.sin(clock.getElapsedTime() * 2) * 0.3);
        }
    });

    return (
        <group ref={triggerRef} position={position}>
            {/* Keyboard key base - bigger and more visible */}
            <mesh position={[0, pressed ? -0.12 : 0, 0]} castShadow>
                <boxGeometry args={[2, 0.3, 2]} />
                <meshStandardMaterial
                    color="#2a2a2a"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Key top surface */}
            <mesh position={[0, pressed ? -0.06 : 0.06, 0]} castShadow>
                <boxGeometry args={[1.9, 0.15, 1.9]} />
                <meshStandardMaterial
                    color="#3a3a3a"
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Large "PLAY" text on key */}
            <Text
                position={[0, pressed ? 0.08 : 0.2, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#E6007E"
            >
                PLAY
            </Text>

            {/* Play triangle icon above text */}
            <mesh
                position={[0, pressed ? 0.5 : 0.65, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <coneGeometry args={[0.25, 0.4, 3]} />
                <meshStandardMaterial
                    color="white"
                    emissive="#E6007E"
                    emissiveIntensity={pressed ? 0.5 : glowIntensity * 2}
                    metalness={0.1}
                    roughness={0.3}
                />
            </mesh>

            {/* Glowing ring around button (pulsing) */}
            {!pressed && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                    <ringGeometry args={[0.7, 0.85, 32]} />
                    <meshBasicMaterial
                        color="#00D4FF"
                        transparent
                        opacity={glowIntensity * 0.4}
                    />
                </mesh>
            )}

            {/* Ground glow effect */}
            {!pressed && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                    <circleGeometry args={[1.5, 32]} />
                    <meshBasicMaterial
                        color="#E6007E"
                        transparent
                        opacity={glowIntensity * 0.2}
                    />
                </mesh>
            )}

            {/* Particle sparkles */}
            {!pressed && (
                <>
                    <pointLight
                        position={[0, 0.5, 0]}
                        intensity={glowIntensity * 0.5}
                        distance={5}
                        color="#E6007E"
                    />
                </>
            )}

            {/* Pressed state light burst */}
            {pressed && (
                <pointLight
                    position={[0, 0.5, 0]}
                    intensity={3}
                    distance={10}
                    color="#00D4FF"
                />
            )}
        </group>
    );
};

export default PlayButton;
