import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

// Frequency Lane component - each lane represents a play frequency
const FrequencyLane = ({ position, frequency, color, emissiveColor, label, onSelect, selected, laneWidth = 4 }) => {
    const [hovered, setHovered] = useState(false);
    const laneRef = useRef();
    const glowRef = useRef();

    // Physics trigger for lane selection
    const [triggerRef] = useBox(() => ({
        isTrigger: true,
        position: [position[0], position[1], position[2]],
        args: [laneWidth, 3, 60],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !selected) {
                setHovered(true);
                onSelect();
            }
        }
    }));

    // Solid physics walls for lane boundaries - no bounce
    const [leftWallRef] = useBox(() => ({
        type: 'Static',
        position: [position[0] - laneWidth/2, position[1] + 0.5, position[2]],
        args: [0.2, 1, 60],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    const [rightWallRef] = useBox(() => ({
        type: 'Static',
        position: [position[0] + laneWidth/2, position[1] + 0.5, position[2]],
        args: [0.2, 1, 60],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Animate lane glow
    useFrame((state) => {
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.8;
            glowRef.current.material.emissiveIntensity = selected ? 2.0 : (hovered ? 1.5 : pulse);
        }
    });

    // Speed lines - more lines = higher frequency
    const speedLineCount = frequency === 'hardcore' ? 12 :
                          frequency === 'weekly' ? 8 :
                          frequency === 'monthly-few' ? 5 :
                          frequency === 'monthly' ? 3 : 2;

    return (
        <group position={position}>
            {/* Main lane surface */}
            <mesh
                ref={glowRef}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.01, 0]}
                receiveShadow
            >
                <planeGeometry args={[laneWidth, 60]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={hovered ? 1.5 : 1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Lane borders with glow */}
            {[-laneWidth/2, laneWidth/2].map((x, i) => (
                <mesh key={i} position={[x, 0.5, 0]}>
                    <boxGeometry args={[0.1, 1, 60]} />
                    <meshStandardMaterial
                        color={emissiveColor}
                        emissive={emissiveColor}
                        emissiveIntensity={selected ? 3 : 2}
                        toneMapped={false}
                    />
                </mesh>
            ))}

            {/* Speed lines - visual frequency indicators */}
            {Array.from({ length: speedLineCount }).map((_, i) => {
                const spacing = 60 / speedLineCount;
                const zPos = -30 + (i * spacing);
                return (
                    <mesh key={`line-${i}`} position={[0, 0.02, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[laneWidth * 0.6, 1]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            transparent
                            opacity={selected ? 0.9 : 0.5}
                        />
                    </mesh>
                );
            })}

            {/* Floating label at entrance of lane */}
            <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
                <Text
                    position={[0, 4, 25]}
                    fontSize={0.8}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={laneWidth * 0.9}
                    textAlign="center"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    {label}
                </Text>
            </Float>

            {/* Particle effects for selected lane */}
            {selected && (
                <Sparkles
                    count={5}
                    scale={[laneWidth, 2, 60]}
                    size={3}
                    speed={0.5}
                    opacity={0.8}
                    color={emissiveColor}
                />
            )}

            {/* Selection indicator at entrance */}
            {selected && (
                <Text
                    position={[0, 5.5, 25]}
                    fontSize={0.6}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="#000000"
                >
                    ✓ SELECTED
                </Text>
            )}
        </group>
    );
};

// Main Zone3 Component
const Zone3_PlayFrequency = ({ onComplete }) => {
    const [selectedFrequency, setSelectedFrequency] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const frequencies = [
        {
            id: 'hardcore',
            label: 'Multiple times\na week!',
            color: '#FF1744',
            emissiveColor: '#FF0000',
            position: [-10, 0, -275]
        },
        {
            id: 'weekly',
            label: 'About once\na week',
            color: '#FF6B35',
            emissiveColor: '#FF4500',
            position: [-5, 0, -275]
        },
        {
            id: 'monthly-few',
            label: 'A few times\na month',
            color: '#FFD700',
            emissiveColor: '#FFA500',
            position: [0, 0, -275]
        },
        {
            id: 'monthly',
            label: 'Once a month\nor less',
            color: '#4ECDC4',
            emissiveColor: '#00CED1',
            position: [5, 0, -275]
        },
        {
            id: 'wishful',
            label: 'Not as much as\nI\'d like 😅',
            color: '#9B59B6',
            emissiveColor: '#8B008B',
            position: [10, 0, -275]
        }
    ];

    const handleFrequencySelect = (frequencyId) => {
        console.log('Play frequency selected:', frequencyId);
        setSelectedFrequency(frequencyId);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(frequencyId);
        }, 2000);
    };

    return (
        <group name="zone-3-play-frequency">
            {/* Zone title */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <Text
                    position={[0, 8, -248]}
                    fontSize={1.5}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={30}
                    textAlign="center"
                    outlineWidth={0.08}
                    outlineColor="#FF6B35"
                    letterSpacing={0.05}
                >
                    HOW OFTEN DO YOU PLAY?
                </Text>
            </Float>

            {/* Subtitle instruction */}
            <Text
                position={[0, 6.5, -248]}
                fontSize={0.6}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                maxWidth={35}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive through your lane - each represents a different play frequency!
            </Text>

            {/* All frequency lanes */}
            {frequencies.map((freq) => (
                <FrequencyLane
                    key={freq.id}
                    position={freq.position}
                    frequency={freq.id}
                    color={freq.color}
                    emissiveColor={freq.emissiveColor}
                    label={freq.label}
                    onSelect={() => handleFrequencySelect(freq.id)}
                    selected={selectedFrequency === freq.id}
                />
            ))}

            {/* Overhead speedometer visualization */}
            <Float speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
                <Text
                    position={[0, 10, -260]}
                    fontSize={3}
                    color="#FF6B35"
                    anchorX="center"
                    anchorY="middle"
                >
                    ⏱️
                </Text>
            </Float>

            {/* Lighting */}
            <ambientLight intensity={0.4} />

            {/* Key light */}
            <directionalLight
                position={[20, 30, -250]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Colored rim lights from each lane */}
            <pointLight position={[-10, 5, -275]} intensity={20} color="#FF1744" distance={12} />
            <pointLight position={[10, 5, -275]} intensity={20} color="#9B59B6" distance={12} />

            {/* Atmospheric particles */}
            <Sparkles
                count={10}
                scale={[60, 10, 80]}
                size={2}
                speed={0.2}
                opacity={0.3}
                color="#FFD700"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 5, -250]}
                    fontSize={1}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    GREAT CHOICE! 🎯
                </Text>
            )}
        </group>
    );
};

export default Zone3_PlayFrequency;
