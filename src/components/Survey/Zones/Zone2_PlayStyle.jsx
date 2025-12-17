import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles, RoundedBox, Sphere, Torus } from '@react-three/drei';
import { useCylinder, useBox } from '@react-three/cannon';
import * as THREE from 'three';

// Floating Island component with fantasy/magical aesthetic
const FloatingIsland = ({ position, playStyle, color, icon, onSelect, selected }) => {
    const islandRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Floating animation
    useFrame((state) => {
        if (islandRef.current) {
            // Gentle bobbing motion
            islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;

            // Slight rotation for magical feel
            islandRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    // Physics body for solid ramp - thin for easy climbing, no bounce
    const [rampBody] = useBox(() => ({
        type: 'Static',
        position: [position[0], 1.5, position[2] - 1.5],
        rotation: [Math.PI / 6, 0, 0],
        args: [3, 0.15, 5],
        material: {
            friction: 0.5,
            restitution: 0, // No bounce
        }
    }));

    // Physics trigger for selection detection
    const [rampTrigger] = useCylinder(() => ({
        isTrigger: true,
        position: [position[0], 0, position[2]],
        args: [2, 2, 6, 16],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !selected) {
                setHovered(true);
                onSelect();
            }
        }
    }));

    // Island configuration based on play style
    const configs = {
        competitive: {
            label: 'Competitive Champion',
            description: 'Victory & Glory',
            primaryColor: '#FF6B35',
            secondaryColor: '#FFD700',
            emissive: '#FF4500',
            objects: [
                { type: 'trophy', position: [0, 1, 0] },
                { type: 'flame', position: [-0.8, 0.5, 0] },
                { type: 'flame', position: [0.8, 0.5, 0] }
            ]
        },
        team: {
            label: 'Team Player',
            description: 'Collaboration First',
            primaryColor: '#4ECDC4',
            secondaryColor: '#00D4FF',
            emissive: '#00CED1',
            objects: [
                { type: 'hands', position: [0, 1, 0] },
                { type: 'link', position: [-0.8, 0.8, 0] },
                { type: 'link', position: [0.8, 0.8, 0] }
            ]
        },
        story: {
            label: 'Story Immersion',
            description: 'Deep Narratives',
            primaryColor: '#9B59B6',
            secondaryColor: '#E6007E',
            emissive: '#8B008B',
            objects: [
                { type: 'book', position: [0, 1, 0] },
                { type: 'mask', position: [-0.7, 0.8, 0] },
                { type: 'mask', position: [0.7, 0.8, 0] }
            ]
        },
        fun: {
            label: 'Just Here for Fun',
            description: 'Good Times Only',
            primaryColor: '#FFD93D',
            secondaryColor: '#FF1493',
            emissive: '#FFA500',
            objects: [
                { type: 'balloon', position: [0, 1.5, 0] },
                { type: 'balloon', position: [-0.6, 1.2, 0] },
                { type: 'balloon', position: [0.6, 1.2, 0] }
            ]
        }
    };

    const config = configs[playStyle];

    return (
        <group>
            {/* Glowing ramp leading up to island */}
            <group position={[position[0], 0, position[2]]}>
                {/* Visual ramp mesh - thin for easy climbing */}
                <mesh rotation={[Math.PI / 6, 0, 0]} position={[0, 1.5, -1.5]} castShadow receiveShadow>
                    <boxGeometry args={[3, 0.15, 5]} />
                    <meshStandardMaterial
                        color={config.primaryColor}
                        emissive={config.emissive}
                        emissiveIntensity={hovered ? 1.5 : 0.8}
                        metalness={0.7}
                        roughness={0.3}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Ramp edges with glow */}
                {[-1.5, 1.5].map((x, i) => (
                    <mesh key={i} rotation={[Math.PI / 6, 0, 0]} position={[x, 1.5, -1.5]}>
                        <boxGeometry args={[0.1, 0.3, 5]} />
                        <meshStandardMaterial
                            color={config.secondaryColor}
                            emissive={config.secondaryColor}
                            emissiveIntensity={hovered ? 2 : 1}
                        />
                    </mesh>
                ))}

                {/* Mystical particles along ramp */}
                <Sparkles
                    count={2}
                    scale={[3, 3, 5]}
                    size={2}
                    speed={0.3}
                    opacity={0.6}
                    color={config.primaryColor}
                />
            </group>

            {/* Floating Island */}
            <group ref={islandRef} position={position}>
                {/* Main island platform - crystal/rock formation */}
                <RoundedBox args={[4, 1, 4]} radius={0.3} castShadow receiveShadow>
                    <meshStandardMaterial
                        color={config.primaryColor}
                        emissive={config.emissive}
                        emissiveIntensity={selected ? 1.2 : (hovered ? 0.8 : 0.4)}
                        metalness={0.6}
                        roughness={0.4}
                    />
                </RoundedBox>

                {/* Magical crystals underneath */}
                {[-1, 1].map((x, i) => (
                    <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
                        <mesh position={[x, -1.2, 0]} rotation={[0, i * Math.PI / 4, Math.PI]}>
                            <coneGeometry args={[0.2, 0.8, 6]} />
                            <meshStandardMaterial
                                color={config.secondaryColor}
                                emissive={config.secondaryColor}
                                emissiveIntensity={2}
                                metalness={1}
                                roughness={0}
                            />
                        </mesh>
                    </Float>
                ))}

                {/* Floating magical orbs around island */}
                {[0, 1, 2, 3].map((i) => {
                    const angle = (i / 4) * Math.PI * 2;
                    const radius = 3;
                    return (
                        <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={1}>
                            <mesh position={[Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius]}>
                                <sphereGeometry args={[0.15, 16, 16]} />
                                <meshStandardMaterial
                                    color={config.secondaryColor}
                                    emissive={config.secondaryColor}
                                    emissiveIntensity={3}
                                    transparent
                                    opacity={0.8}
                                />
                            </mesh>
                        </Float>
                    );
                })}

                {/* Island label - bold heading */}
                <Text
                    position={[0, 2.5, 0]}
                    fontSize={0.5}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                    textAlign="center"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                    letterSpacing={0.05}
                >
                    {config.label}
                </Text>

                {/* Description text */}
                <Text
                    position={[0, 1.8, 0]}
                    fontSize={0.3}
                    color={config.secondaryColor}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                    textAlign="center"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {config.description}
                </Text>

                {/* Large icon */}
                <Text
                    position={[0, 0.8, 0]}
                    fontSize={2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {icon}
                </Text>

                {/* Island sparkles/magical particles */}
                <Sparkles
                    count={3}
                    scale={5}
                    size={2}
                    speed={0.2}
                    opacity={selected ? 1 : 0.6}
                    color={config.primaryColor}
                />

                {/* Dramatic uplighting */}
                <pointLight
                    position={[0, -1, 0]}
                    intensity={selected ? 30 : (hovered ? 20 : 10)}
                    distance={15}
                    color={config.emissive}
                />

                {/* Selection indicator */}
                {selected && (
                    <group position={[0, -0.3, 0]}>
                        <Torus args={[2.5, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshBasicMaterial color="#00ff00" />
                        </Torus>
                        <Text
                            position={[0, -1, 0]}
                            fontSize={0.4}
                            color="#00ff00"
                            anchorX="center"
                            anchorY="middle"
                        >
                            ✓ SELECTED
                        </Text>
                    </group>
                )}
            </group>
        </group>
    );
};

// Main Zone2 Component
const Zone2_PlayStyle = ({ onComplete }) => {
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const islands = [
        {
            id: 'competitive',
            icon: '🏆',
            position: [-12, 6, -150]
        },
        {
            id: 'team',
            icon: '🤝',
            position: [-4, 6, -150]
        },
        {
            id: 'story',
            icon: '🎭',
            position: [4, 6, -150]
        },
        {
            id: 'fun',
            icon: '😂',
            position: [12, 6, -150]
        }
    ];

    const handleStyleSelect = (styleId) => {
        console.log('Play style selected:', styleId);
        setSelectedStyle(styleId);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(styleId);
        }, 2000);
    };

    return (
        <group name="zone-2-play-style">
            {/* Zone title */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <Text
                    position={[0, 10, -148]}
                    fontSize={1.5}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={20}
                    textAlign="center"
                    outlineWidth={0.08}
                    outlineColor="#9B59B6"
                    letterSpacing={0.05}
                >
                    WHAT'S YOUR PLAY STYLE?
                </Text>
            </Float>

            {/* Subtitle instruction */}
            <Text
                position={[0, 8.5, -148]}
                fontSize={0.6}
                color="#E6007E"
                anchorX="center"
                anchorY="middle"
                maxWidth={30}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive up a glowing ramp to choose your gaming personality
            </Text>

            {/* All 4 floating islands */}
            {islands.map((island) => (
                <FloatingIsland
                    key={island.id}
                    position={island.position}
                    playStyle={island.id}
                    icon={island.icon}
                    onSelect={() => handleStyleSelect(island.id)}
                    selected={selectedStyle === island.id}
                />
            ))}

            {/* Mystical fog/atmosphere */}
            <fog attach="fog" args={['#1a0a2e', 30, 100]} />

            {/* Ambient magical lighting */}
            <ambientLight intensity={0.3} color="#9B59B6" />

            {/* Key light */}
            <directionalLight
                position={[20, 30, 10]}
                intensity={1}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Mystical rim lights */}
            <pointLight position={[-15, 10, -150]} intensity={40} color="#9B59B6" />
            <pointLight position={[15, 10, -150]} intensity={40} color="#E6007E" />

            {/* Atmospheric particles */}
            <Sparkles
                count={8}
                scale={50}
                size={2}
                speed={0.1}
                opacity={0.4}
                color="#9B59B6"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 5, -145]}
                    fontSize={1}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    PERFECT CHOICE! ✨
                </Text>
            )}
        </group>
    );
};

export default Zone2_PlayStyle;
