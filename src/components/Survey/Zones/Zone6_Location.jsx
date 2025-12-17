import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

// Geographic Region Platform
const RegionPlatform = ({ position, regionId, regionName, flag, color, emissiveColor, onSelect, selected, size = [8, 8] }) => {
    const [hovered, setHovered] = useState(false);
    const platformRef = useRef();

    // Physics trigger for selection
    const [triggerRef] = useBox(() => ({
        isTrigger: true,
        position: [position[0], position[1] + 0.5, position[2]],
        args: [size[0], 2, size[1]],
        onCollide: (e) => {
            if (e.body.name === 'chassis' && !selected) {
                setHovered(true);
                onSelect();
            }
        }
    }));

    // Animate platform
    useFrame((state) => {
        if (platformRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
            platformRef.current.material.emissiveIntensity = selected ? 2 : (hovered ? 1.5 : pulse * 0.8 + 0.5);
        }
    });

    return (
        <group position={position}>
            {/* Platform base */}
            <mesh ref={platformRef} position={[0, 0.2, 0]} receiveShadow>
                <boxGeometry args={[size[0], 0.4, size[1]]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={hovered ? 1.5 : 1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Glowing border */}
            <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[size[0] + 0.2, 0.1, size[1] + 0.2]} />
                <meshBasicMaterial
                    color={emissiveColor}
                    transparent
                    opacity={selected ? 0.9 : 0.6}
                />
            </mesh>

            {/* Flag emoji */}
            <Text
                position={[0, 2, 0]}
                fontSize={2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {flag}
            </Text>

            {/* Region label */}
            <Text
                position={[0, 3.5, 0]}
                fontSize={0.6}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={size[0]}
                textAlign="center"
                outlineWidth={0.04}
                outlineColor="#000000"
            >
                {regionName}
            </Text>

            {/* Selection indicator */}
            {selected && (
                <>
                    <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[Math.max(...size) * 0.6, Math.max(...size) * 0.7, 32]} />
                        <meshBasicMaterial
                            color="#00ff00"
                            transparent
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    <Sparkles
                        count={3}
                        scale={[size[0], 3, size[1]]}
                        size={2}
                        speed={0.4}
                        opacity={0.8}
                        color="#00ff00"
                    />

                    <Text
                        position={[0, 4.5, 0]}
                        fontSize={0.7}
                        color="#00ff00"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ✓ SELECTED
                    </Text>
                </>
            )}
        </group>
    );
};

// Main Zone6 Component
const Zone6_Location = ({ onComplete }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const regions = [
        {
            id: 'usa',
            name: 'USA',
            flag: '🇺🇸',
            color: '#1976D2',
            emissiveColor: '#1565C0',
            position: [-12, 0, -530],
            size: [7, 7]
        },
        {
            id: 'canada',
            name: 'Canada',
            flag: '🇨🇦',
            color: '#D32F2F',
            emissiveColor: '#C62828',
            position: [-12, 0, -545],
            size: [7, 7]
        },
        {
            id: 'uk',
            name: 'UK',
            flag: '🇬🇧',
            color: '#303F9F',
            emissiveColor: '#283593',
            position: [0, 0, -530],
            size: [7, 7]
        },
        {
            id: 'europe',
            name: 'Europe',
            flag: '🇪🇺',
            color: '#0288D1',
            emissiveColor: '#0277BD',
            position: [0, 0, -545],
            size: [7, 7]
        },
        {
            id: 'asia-pacific',
            name: 'Asia Pacific',
            flag: '🌏',
            color: '#00897B',
            emissiveColor: '#00796B',
            position: [12, 0, -530],
            size: [7, 7]
        },
        {
            id: 'other',
            name: 'Somewhere\nElse',
            flag: '🌎',
            color: '#5E35B1',
            emissiveColor: '#512DA8',
            position: [12, 0, -545],
            size: [7, 7]
        }
    ];

    const handleLocationSelect = (locationId) => {
        console.log('Location selected:', locationId);
        setSelectedLocation(locationId);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(locationId);
        }, 2000);
    };

    return (
        <group name="zone-6-location">
            {/* Zone title */}
            <Text
                position={[0, 10, -520]}
                fontSize={1.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={30}
                textAlign="center"
                outlineWidth={0.08}
                outlineColor="#1976D2"
                letterSpacing={0.05}
            >
                WHERE ARE YOU GAMING FROM?
            </Text>

            {/* Subtitle */}
            <Text
                position={[0, 8.5, -520]}
                fontSize={0.6}
                color="#00D4FF"
                anchorX="center"
                anchorY="middle"
                maxWidth={35}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive onto your region on the world map!
            </Text>

            {/* World map title */}
            <Text
                position={[0, 6, -525]}
                fontSize={0.8}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.04}
                outlineColor="#000000"
            >
                🗺️ WORLD MAP 🗺️
            </Text>

            {/* All region platforms */}
            {regions.map((region) => (
                <RegionPlatform
                    key={region.id}
                    position={region.position}
                    regionId={region.id}
                    regionName={region.name}
                    flag={region.flag}
                    color={region.color}
                    emissiveColor={region.emissiveColor}
                    size={region.size}
                    onSelect={() => handleLocationSelect(region.id)}
                    selected={selectedLocation === region.id}
                />
            ))}

            {/* Map grid floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -537.5]} receiveShadow>
                <planeGeometry args={[50, 30]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Grid lines */}
            <gridHelper
                args={[50, 25, '#00D4FF', '#1a1a1a']}
                position={[0, 0.02, -537.5]}
            />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[20, 30, -537]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Rim lights for depth */}
            <pointLight position={[-20, 8, -537]} intensity={30} color="#1976D2" />
            <pointLight position={[20, 8, -537]} intensity={30} color="#00897B" />

            {/* Atmospheric particles */}
            <Sparkles
                count={10}
                scale={[50, 10, 30]}
                size={2}
                speed={0.15}
                opacity={0.3}
                color="#00D4FF"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 5, -530]}
                    fontSize={1}
                    color="#00ff00"
                    anchorX="center"
                    anchorY="middle"
                >
                    LOCATION CONFIRMED! 🌍
                </Text>
            )}
        </group>
    );
};

export default Zone6_Location;
