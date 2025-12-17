import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshReflectorMaterial, Sparkles, Ring, Sphere, Box, RoundedBox } from '@react-three/drei';
import { useCylinder, useBox as useCannonBox } from '@react-three/cannon';
import * as THREE from 'three';

// Ultra-high quality Portal component with advanced materials and physics
const Portal = ({ position, icon, label, color, theme, onSelect, selected }) => {
    const portalRef = useRef();
    const glowRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Physics trigger zone using Cannon
    const [triggerRef] = useCylinder(() => ({
        isTrigger: true,
        position,
        args: [2.5, 2.5, 4, 16],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !selected) {
                setHovered(true);
                onSelect();
            }
        }
    }));

    // Animate portal rotation and glow
    useFrame((state) => {
        if (portalRef.current) {
            portalRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Hover effect - scale up
            const targetScale = hovered ? 1.1 : 1.0;
            portalRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }

        // Animated glow pulsing
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
            glowRef.current.material.opacity = selected ? 1.0 : (hovered ? 0.8 : pulse * 0.5);
        }
    });

    return (
        <group position={position}>
            {/* Main portal structure */}
            <group ref={portalRef}>
                {/* Portal frame - outer ring */}
                <mesh castShadow receiveShadow>
                    <torusGeometry args={[2, 0.2, 16, 32]} />
                    <meshStandardMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.1}
                        emissive={color}
                        emissiveIntensity={hovered ? 1.5 : 0.8}
                        envMapIntensity={1.5}
                    />
                </mesh>

                {/* Glowing inner ring */}
                <mesh ref={glowRef}>
                    <torusGeometry args={[2.1, 0.15, 16, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Portal energy field - animated shader */}
                <mesh rotation={[0, 0, 0]}>
                    <circleGeometry args={[2, 64]} />
                    <meshPhysicalMaterial
                        color={color}
                        metalness={0.0}
                        roughness={0.1}
                        transmission={0.9}
                        thickness={0.5}
                        transparent
                        opacity={0.4}
                        emissive={color}
                        emissiveIntensity={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Icon floating in front */}
                <Float
                    speed={2}
                    rotationIntensity={0.5}
                    floatIntensity={0.5}
                >
                    <Text
                        position={[0, 0, 0.5]}
                        fontSize={1.5}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.05}
                        outlineColor={color}
                    >
                        {icon}
                    </Text>
                </Float>

                {/* Label below */}
                <Text
                    position={[0, -3, 0]}
                    fontSize={0.4}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                    textAlign="center"
                    font="/fonts/Inter-Bold.woff"
                    outlineWidth={0.02}
                    outlineColor={color}
                >
                    {label}
                </Text>

                {/* Sparkles for premium feel */}
                <Sparkles
                    count={30}
                    scale={4}
                    size={3}
                    speed={0.4}
                    opacity={hovered ? 1 : 0.6}
                    color={color}
                />

                {/* Spotlight from above */}
                <spotLight
                    position={[0, 5, 0]}
                    angle={0.6}
                    penumbra={0.5}
                    intensity={hovered ? 80 : 40}
                    color={color}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                {/* Theme-specific decorations */}
                {theme === 'social' && (
                    <group position={[0, 0, -0.5]}>
                        <RoundedBox args={[0.8, 0.8, 0.2]} radius={0.1} castShadow>
                            <meshStandardMaterial color="#1DA1F2" metalness={0.8} roughness={0.2} />
                        </RoundedBox>
                    </group>
                )}

                {theme === 'qrcode' && (
                    <group position={[0, 0, -0.5]}>
                        <Box args={[1, 1, 1]} castShadow>
                            <meshStandardMaterial
                                color="#8B4513"
                                roughness={0.9}
                                metalness={0.1}
                                map={null} // TODO: Add cardboard texture
                            />
                        </Box>
                    </group>
                )}

                {theme === 'convention' && (
                    <group position={[0, 0, -0.5]}>
                        <mesh castShadow>
                            <coneGeometry args={[1, 1.5, 4]} />
                            <meshStandardMaterial
                                color="#FF6B6B"
                                roughness={0.6}
                                metalness={0.3}
                            />
                        </mesh>
                    </group>
                )}

                {theme === 'friend' && (
                    <group position={[0, 0, -0.5]}>
                        <mesh castShadow>
                            <torusKnotGeometry args={[0.4, 0.15, 100, 16]} />
                            <meshStandardMaterial
                                color="#FFD700"
                                metalness={1.0}
                                roughness={0.1}
                            />
                        </mesh>
                    </group>
                )}

                {theme === 'unknown' && (
                    <group position={[0, 0, -0.5]}>
                        <Sphere args={[0.5, 32, 32]} castShadow>
                            <meshPhysicalMaterial
                                color="#9B59B6"
                                metalness={0.5}
                                roughness={0.2}
                                clearcoat={1.0}
                                clearcoatRoughness={0.1}
                            />
                        </Sphere>
                    </group>
                )}
            </group>


            {/* Base platform */}
            <mesh position={[0, -0.5, 0]} receiveShadow>
                <cylinderGeometry args={[2.8, 3, 0.3, 32]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={selected ? 0.5 : 0.1}
                />
            </mesh>

            {/* Selection indicator */}
            {selected && (
                <group position={[0, -0.3, 0]}>
                    <Ring args={[3, 3.3, 32]}>
                        <meshBasicMaterial color="#00ff00" side={THREE.DoubleSide} />
                    </Ring>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.5}
                        color="#00ff00"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ✓ SELECTED
                    </Text>
                </group>
            )}
        </group>
    );
};

// Impressive decorative environment blocks
const DecorativeBlocks = () => {
    const blockPositions = useMemo(() => {
        const positions = [];
        // Create impressive block structures around the zone
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 25 + Math.random() * 10;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const height = Math.random() * 8 + 2;

            positions.push({
                position: [x, height / 2, z],
                scale: [2 + Math.random() * 2, height, 2 + Math.random() * 2],
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
            });
        }
        return positions;
    }, []);

    return (
        <group>
            {blockPositions.map((block, i) => (
                <RoundedBox
                    key={i}
                    position={block.position}
                    args={block.scale}
                    radius={0.2}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        color={block.color}
                        metalness={0.6}
                        roughness={0.3}
                        emissive={block.color}
                        emissiveIntensity={0.2}
                    />
                </RoundedBox>
            ))}
        </group>
    );
};

// Main Zone1 Component
const Zone1_SourceTracking = ({ onComplete }) => {
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const portals = [
        {
            id: 'social',
            icon: '📱',
            label: 'Social Media',
            color: '#1DA1F2',
            position: [-12, 2, -40],
            theme: 'social'
        },
        {
            id: 'qrcode',
            icon: '📦',
            label: 'QR Code',
            color: '#8B4513',
            position: [-6, 2, -40],
            theme: 'qrcode'
        },
        {
            id: 'convention',
            icon: '🎪',
            label: 'Convention',
            color: '#FF6B6B',
            position: [0, 2, -40],
            theme: 'convention'
        },
        {
            id: 'friend',
            icon: '🔗',
            label: 'Friend Link',
            color: '#FFD700',
            position: [6, 2, -40],
            theme: 'friend'
        },
        {
            id: 'unknown',
            icon: '🤷',
            label: "Can't Remember",
            color: '#9B59B6',
            position: [12, 2, -40],
            theme: 'unknown'
        }
    ];

    const handlePortalSelect = (portalId) => {
        console.log('Portal selected:', portalId);
        setSelectedPortal(portalId);
        setTransitioning(true);

        // Transition effect and move to next zone
        setTimeout(() => {
            onComplete?.(portalId);
        }, 2000);
    };

    return (
        <group name="zone-1-source-tracking">
            {/* Zone title */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <Text
                    position={[0, 8, -35]}
                    fontSize={1.2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={20}
                    textAlign="center"
                    font="/fonts/Inter-Bold.woff"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    HOW'D YOU FIND US?
                </Text>
            </Float>

            {/* All 5 portals */}
            {portals.map((portal) => (
                <Portal
                    key={portal.id}
                    position={portal.position}
                    icon={portal.icon}
                    label={portal.label}
                    color={portal.color}
                    theme={portal.theme}
                    onSelect={() => handlePortalSelect(portal.id)}
                    selected={selectedPortal === portal.id}
                />
            ))}

            {/* Impressive decorative environment blocks */}
            <DecorativeBlocks />

            {/* Ultra-high quality reflective floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, -40]} receiveShadow>
                <planeGeometry args={[60, 30]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.8}
                />
            </mesh>

            {/* Atmospheric lighting */}
            <ambientLight intensity={0.2} />

            {/* Key light */}
            <directionalLight
                position={[20, 30, 20]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={100}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
            />

            {/* Rim lights for depth */}
            <pointLight position={[-20, 5, -40]} intensity={50} color="#00D4FF" />
            <pointLight position={[20, 5, -40]} intensity={50} color="#E6007E" />

            {/* Volumetric fog */}
            <fog attach="fog" args={['#0a0a0a', 20, 80]} />

            {/* Atmospheric particles */}
            <Sparkles
                count={100}
                scale={50}
                size={2}
                speed={0.2}
                opacity={0.3}
                color="#ffffff"
            />

            {/* Transition effect overlay */}
            {transitioning && (
                <group>
                    <Text
                        position={[0, 4, -30]}
                        fontSize={1}
                        color="#00ff00"
                        anchorX="center"
                        anchorY="middle"
                    >
                        AWESOME! ✨
                    </Text>
                </group>
            )}
        </group>
    );
};

export default Zone1_SourceTracking;
