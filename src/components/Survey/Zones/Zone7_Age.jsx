import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import * as THREE from 'three';

// Time Portal Ring for age selection
const AgePortal = ({ position, ageId, ageRange, color, emissiveColor, onSelect, selected }) => {
    const [hovered, setHovered] = useState(false);
    const ringRef = useRef();
    const glowRef = useRef();

    // Physics trigger
    const [triggerRef] = useCylinder(() => ({
        isTrigger: true,
        position,
        args: [3, 3, 5, 16],
        rotation: [Math.PI / 2, 0, 0],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !selected) {
                setHovered(true);
                onSelect();
            }
        }
    }));

    // Animate portal rotation and glow
    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
        }

        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
            glowRef.current.material.emissiveIntensity = selected ? 2 : (hovered ? 1.5 : pulse);
        }
    });

    return (
        <group position={position}>
            {/* Outer portal ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[3, 0.3, 16, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={hovered ? 1.5 : 1}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Inner glow ring */}
            <mesh ref={glowRef}>
                <torusGeometry args={[3.2, 0.2, 16, 32]} />
                <meshBasicMaterial
                    color={emissiveColor}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Portal energy field */}
            <mesh>
                <circleGeometry args={[2.8, 64]} />
                <meshPhysicalMaterial
                    color={color}
                    metalness={0}
                    roughness={0.1}
                    transmission={0.95}
                    thickness={0.5}
                    transparent
                    opacity={0.3}
                    emissive={emissiveColor}
                    emissiveIntensity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Age range label above portal */}
            <Text
                position={[0, 4.5, 0]}
                fontSize={0.8}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={8}
                textAlign="center"
                outlineWidth={0.05}
                outlineColor="#000000"
            >
                {ageRange}
            </Text>

            {/* Time icon in center */}
            <Text
                position={[0, 0, 0.1]}
                fontSize={1.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                ⏳
            </Text>

            {/* Selection indicator */}
            {selected && (
                <>
                    <mesh>
                        <torusGeometry args={[3.8, 0.15, 16, 32]} />
                        <meshBasicMaterial
                            color="#00ff00"
                            transparent
                            opacity={0.8}
                        />
                    </mesh>

                    <Sparkles
                        count={5}
                        scale={8}
                        size={3}
                        speed={0.4}
                        opacity={0.8}
                        color="#00ff00"
                    />

                    <Text
                        position={[0, -4.5, 0]}
                        fontSize={0.7}
                        color="#00ff00"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ✓ SELECTED
                    </Text>
                </>
            )}

            {/* Particles through portal */}
            {!selected && (
                <Sparkles
                    count={2}
                    scale={4}
                    size={2}
                    speed={0.3}
                    opacity={0.5}
                    color={emissiveColor}
                />
            )}
        </group>
    );
};

// Main Zone7 Component
const Zone7_Age = ({ onComplete }) => {
    const [selectedAge, setSelectedAge] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const ageRanges = [
        {
            id: 'under-18',
            range: 'Under 18',
            color: '#FF6B9D',
            emissiveColor: '#FF1493',
            position: [-15, 4, -605]
        },
        {
            id: '18-24',
            range: '18-24',
            color: '#00D4FF',
            emissiveColor: '#00B8E6',
            position: [-9, 4, -605]
        },
        {
            id: '25-34',
            range: '25-34',
            color: '#4CAF50',
            emissiveColor: '#388E3C',
            position: [-3, 4, -605]
        },
        {
            id: '35-44',
            range: '35-44',
            color: '#FFD700',
            emissiveColor: '#FFA000',
            position: [3, 4, -605]
        },
        {
            id: '45-54',
            range: '45-54',
            color: '#FF9800',
            emissiveColor: '#F57C00',
            position: [9, 4, -605]
        },
        {
            id: '55-plus',
            range: '55+',
            color: '#9C27B0',
            emissiveColor: '#7B1FA2',
            position: [15, 4, -605]
        }
    ];

    const handleAgeSelect = (ageId) => {
        console.log('Age selected:', ageId);
        setSelectedAge(ageId);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(ageId);
        }, 2000);
    };

    return (
        <group name="zone-7-age">
            {/* Zone title */}
            <Text
                position={[0, 12, -595]}
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
                HOW OLD ARE YOU?
            </Text>

            {/* Subtitle */}
            <Text
                position={[0, 10.5, -595]}
                fontSize={0.6}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                maxWidth={40}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive through your age portal to continue your journey through time!
            </Text>

            {/* Time Portal label */}
            <Text
                position={[0, 9, -595]}
                fontSize={1}
                color="#00D4FF"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#000000"
            >
                ⏰ TIME PORTALS ⏰
            </Text>

            {/* All age portals */}
            {ageRanges.map((age) => (
                <AgePortal
                    key={age.id}
                    position={age.position}
                    ageId={age.id}
                    ageRange={age.range}
                    color={age.color}
                    emissiveColor={age.emissiveColor}
                    onSelect={() => handleAgeSelect(age.id)}
                    selected={selectedAge === age.id}
                />
            ))}

            {/* Chronological timeline floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -605]} receiveShadow>
                <planeGeometry args={[50, 20]} />
                <meshStandardMaterial
                    color="#1a0a2e"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Timeline markers on floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -605]}>
                <planeGeometry args={[40, 0.2]} />
                <meshBasicMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Lighting */}
            <ambientLight intensity={0.3} color="#9C27B0" />
            <directionalLight
                position={[20, 30, -605]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Colored rim lights from portals */}
            <pointLight position={[-15, 6, -605]} intensity={25} color="#FF6B9D" distance={10} />
            <pointLight position={[0, 6, -605]} intensity={25} color="#4CAF50" distance={10} />
            <pointLight position={[15, 6, -605]} intensity={25} color="#9C27B0" distance={10} />

            {/* Atmospheric particles */}
            <Sparkles
                count={10}
                scale={[50, 15, 20]}
                size={2}
                speed={0.15}
                opacity={0.4}
                color="#9C27B0"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 6, -600]}
                    fontSize={1}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    TIME PORTAL ACTIVATED! ⏰
                </Text>
            )}
        </group>
    );
};

export default Zone7_Age;
