import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles, RoundedBox } from '@react-three/drei';
import { useCylinder, useBox } from '@react-three/cannon';
import * as THREE from 'three';

// Character Pedestal component - represents each play partner option
const CharacterPedestal = ({ position, partnerId, icon, label, color, emissiveColor, onToggle, selected }) => {
    const [toppled, setToppled] = useState(false);
    const [hasBeenHit, setHasBeenHit] = useState(false);

    // Physical character box that can be knocked over
    const [characterRef, characterApi] = useBox(() => ({
        type: 'Dynamic',
        mass: 8,
        position: [position[0], position[1] + 2, position[2]],
        args: [1.5, 3, 0.8],
        linearDamping: 0.9,
        angularDamping: 0.9,
        sleepSpeedLimit: 0.05,
        allowSleep: true,
        sleepTimeLimit: 0.1,
        material: {
            friction: 1.0,
            restitution: 0,
        },
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !hasBeenHit) {
                setHasBeenHit(true);
                // Apply strong impulse to knock it over
                characterApi.applyImpulse([0, 0, -5], [0, 1.2, 0]);
            }
        }
    }));

    // Static pedestal base - no bounce
    const [pedestalRef] = useCylinder(() => ({
        type: 'Static',
        position: [position[0], position[1] + 0.5, position[2]],
        args: [1.5, 2, 1, 16],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Check if character has toppled over
    useFrame(() => {
        if (characterRef.current && hasBeenHit && !toppled) {
            const rotation = characterRef.current.rotation;
            const tiltAngle = Math.abs(rotation.x) + Math.abs(rotation.z);

            // If tilted more than 30 degrees, consider it toppled
            if (tiltAngle > Math.PI / 6) {
                setToppled(true);
                onToggle();
            }
        }
    });

    return (
        <group>
            {/* Label above character - always visible */}
            <Text
                position={[position[0], position[1] + 6, position[2]]}
                fontSize={0.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={4}
                textAlign="center"
                outlineWidth={0.04}
                outlineColor="#000000"
            >
                {label}
            </Text>

            {/* Pedestal base - static */}
            <mesh ref={pedestalRef} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 2, 1, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Character box - physical, can topple */}
            <mesh ref={characterRef} castShadow receiveShadow>
                <boxGeometry args={[1.5, 3, 0.8]} />
                <meshStandardMaterial
                    color={selected ? '#00ff00' : color}
                    emissive={emissiveColor}
                    emissiveIntensity={selected ? 2 : 1}
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* Icon on front face */}
            <Text
                position={[position[0], position[1] + 2, position[2] + 0.5]}
                fontSize={1.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {icon}
            </Text>

            {/* Selection indicator - glowing ring on ground */}
            {selected && (
                <>
                    <mesh position={[position[0], position[1] + 0.05, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[2, 2.5, 32]} />
                        <meshBasicMaterial
                            color="#00ff00"
                            transparent
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    {/* Particles */}
                    <Sparkles
                        count={3}
                        scale={4}
                        size={2}
                        speed={0.4}
                        opacity={0.8}
                        color="#00ff00"
                    />

                    {/* Checkmark above */}
                    <Text
                        position={[position[0], position[1] + 7, position[2]]}
                        fontSize={0.8}
                        color="#00ff00"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ✓
                    </Text>
                </>
            )}
        </group>
    );
};

// Continue Gate - appears after selections are made
const ContinueGate = ({ position, onContinue, selectedCount }) => {
    const [hovered, setHovered] = useState(false);

    // Physics trigger
    const [triggerRef] = useCylinder(() => ({
        isTrigger: true,
        position: [position[0], position[1] + 1.5, position[2]],
        args: [3, 3, 4, 16],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && selectedCount > 0) {
                setHovered(true);
                onContinue();
            }
        }
    }));

    if (selectedCount === 0) return null;

    return (
        <group position={position}>
            {/* Gate pillars */}
            {[-3, 3].map((x, i) => (
                <mesh key={i} position={[x, 2, 0]} castShadow>
                    <boxGeometry args={[0.5, 4, 0.5]} />
                    <meshStandardMaterial
                        color="#00ff00"
                        emissive="#00ff00"
                        emissiveIntensity={hovered ? 2 : 1}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}

            {/* Gate arch */}
            <mesh position={[0, 4, 0]} castShadow>
                <boxGeometry args={[6.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#00ff00"
                    emissive="#00ff00"
                    emissiveIntensity={hovered ? 2 : 1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Continue text */}
            <Float speed={1} rotationIntensity={0} floatIntensity={0.5}>
                <Text
                    position={[0, 4.8, 0]}
                    fontSize={0.8}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    CONTINUE ↑
                </Text>
            </Float>

            {/* Selection count */}
            <Text
                position={[0, 3.5, 0]}
                fontSize={0.5}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
            >
                {selectedCount} Selected
            </Text>

            {/* Particles */}
            <Sparkles
                count={5}
                scale={[8, 6, 2]}
                size={3}
                speed={0.3}
                opacity={0.6}
                color="#00ff00"
            />
        </group>
    );
};

// Main Zone4 Component
const Zone4_PlayPartners = ({ onComplete }) => {
    const [selectedPartners, setSelectedPartners] = useState([]);
    const [transitioning, setTransitioning] = useState(false);

    const partners = [
        {
            id: 'family',
            icon: '👨‍👩‍👧‍👦',
            label: 'Family',
            color: '#FF6B9D',
            emissiveColor: '#FF1493',
            position: [-10, 0, -370]
        },
        {
            id: 'friends',
            icon: '👯',
            label: 'Close Friends',
            color: '#FFD93D',
            emissiveColor: '#FFA500',
            position: [-6, 0, -365]
        },
        {
            id: 'gaming-group',
            icon: '🎲',
            label: 'Gaming Group',
            color: '#4ECDC4',
            emissiveColor: '#00CED1',
            position: [-2, 0, -362]
        },
        {
            id: 'partner',
            icon: '💑',
            label: 'Partner/Spouse',
            color: '#E91E63',
            emissiveColor: '#C2185B',
            position: [2, 0, -362]
        },
        {
            id: 'online',
            icon: '🌐',
            label: 'Online Players',
            color: '#9C27B0',
            emissiveColor: '#7B1FA2',
            position: [6, 0, -365]
        },
        {
            id: 'solo',
            icon: '🐺',
            label: 'Solo Gaming',
            color: '#607D8B',
            emissiveColor: '#455A64',
            position: [10, 0, -370]
        }
    ];

    const handlePartnerToggle = (partnerId) => {
        setSelectedPartners(prev => {
            if (prev.includes(partnerId)) {
                return prev.filter(id => id !== partnerId);
            } else {
                return [...prev, partnerId];
            }
        });
    };

    const handleContinue = () => {
        if (selectedPartners.length === 0) return;

        console.log('Play partners selected:', selectedPartners);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(selectedPartners);
        }, 1500);
    };

    return (
        <group name="zone-4-play-partners">
            {/* Zone title - static, above blocks */}
            <Text
                position={[0, 10, -355]}
                fontSize={1.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={30}
                textAlign="center"
                outlineWidth={0.08}
                outlineColor="#9C27B0"
                letterSpacing={0.05}
            >
                WHO DO YOU PLAY WITH?
            </Text>

            {/* Subtitle instruction */}
            <Text
                position={[0, 8.5, -355]}
                fontSize={0.6}
                color="#FFD93D"
                anchorX="center"
                anchorY="middle"
                maxWidth={35}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive through characters to select your gaming companions - pick all that apply!
            </Text>

            {/* Character pedestals */}
            {partners.map((partner) => (
                <CharacterPedestal
                    key={partner.id}
                    position={partner.position}
                    partnerId={partner.id}
                    icon={partner.icon}
                    label={partner.label}
                    color={partner.color}
                    emissiveColor={partner.emissiveColor}
                    onToggle={() => handlePartnerToggle(partner.id)}
                    selected={selectedPartners.includes(partner.id)}
                />
            ))}

            {/* Continue gate */}
            <ContinueGate
                position={[0, 0, -390]}
                selectedCount={selectedPartners.length}
                onContinue={handleContinue}
            />

            {/* Lighting */}
            <ambientLight intensity={0.3} color="#9C27B0" />

            {/* Key light */}
            <directionalLight
                position={[20, 30, -365]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Rim lights */}
            <pointLight position={[-15, 10, -365]} intensity={40} color="#FF6B9D" />
            <pointLight position={[15, 10, -365]} intensity={40} color="#9C27B0" />

            {/* Ground fog */}
            <fog attach="fog" args={['#1a0a2e', 30, 100]} />

            {/* Atmospheric particles */}
            <Sparkles
                count={8}
                scale={[50, 15, 50]}
                size={2}
                speed={0.15}
                opacity={0.4}
                color="#9C27B0"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 5, -355]}
                    fontSize={1}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    AWESOME CREW! 🎉
                </Text>
            )}
        </group>
    );
};

export default Zone4_PlayPartners;
