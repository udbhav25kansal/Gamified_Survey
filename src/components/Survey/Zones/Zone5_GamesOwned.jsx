import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sparkles } from '@react-three/drei';
import { useBox, useCylinder } from '@react-three/cannon';
import * as THREE from 'three';

// Game Display Pedestal - collectible game boxes
const GamePedestal = ({ position, gameId, gameName, icon, color, emissiveColor, onToggle, selected }) => {
    const [collected, setCollected] = useState(false);

    // Physical game box that can be knocked over to collect
    const [gameBoxRef, gameBoxApi] = useBox(() => ({
        type: 'Dynamic',
        mass: 8,
        position: [position[0], position[1] + 2.5, position[2]],
        args: [2, 2, 2],
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
            if (e.body.name === 'chassis' && !collected) {
                setCollected(true);
                // Apply impulse to knock it over
                gameBoxApi.applyImpulse([0, 0, -5], [0, 1, 0]);
                setTimeout(() => onToggle(), 300);
            }
        }
    }));

    // Static pedestal base
    const [pedestalRef] = useCylinder(() => ({
        type: 'Static',
        position: [position[0], position[1] + 0.5, position[2]],
        args: [1.8, 2, 1, 16],
        material: {
            friction: 0.8,
            restitution: 0,
        }
    }));

    return (
        <group>
            {/* Label above game box */}
            <Text
                position={[position[0], position[1] + 6, position[2]]}
                fontSize={0.6}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={5}
                textAlign="center"
                outlineWidth={0.04}
                outlineColor="#000000"
            >
                {gameName}
            </Text>

            {/* Pedestal base */}
            <mesh ref={pedestalRef} castShadow receiveShadow>
                <cylinderGeometry args={[1.8, 2, 1, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissiveColor}
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Game box - physical */}
            <mesh ref={gameBoxRef} castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial
                    color={selected ? '#FFD700' : color}
                    emissive={selected ? '#FFD700' : emissiveColor}
                    emissiveIntensity={selected ? 2 : 1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Game icon on box face */}
            <Text
                position={[position[0], position[1] + 2.5, position[2] + 1.1]}
                fontSize={1.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {icon}
            </Text>

            {/* Selection indicator */}
            {selected && (
                <>
                    <mesh position={[position[0], position[1] + 0.05, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[2.5, 3, 32]} />
                        <meshBasicMaterial
                            color="#FFD700"
                            transparent
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    <Sparkles
                        count={3}
                        scale={5}
                        size={2}
                        speed={0.4}
                        opacity={0.8}
                        color="#FFD700"
                    />

                    <Text
                        position={[position[0], position[1] + 7, position[2]]}
                        fontSize={0.7}
                        color="#FFD700"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ✓ COLLECTED
                    </Text>
                </>
            )}
        </group>
    );
};

// Continue Gate
const ContinueGate = ({ position, onContinue, selectedCount }) => {
    const [triggerRef] = useCylinder(() => ({
        isTrigger: true,
        position: [position[0], position[1] + 1.5, position[2]],
        args: [3, 3, 4, 16],
        onCollide: (e) => {
            if (e.body.name === 'chassis') {
                onContinue();
            }
        }
    }));

    return (
        <group position={position}>
            {/* Gate pillars */}
            {[-3, 3].map((x, i) => (
                <mesh key={i} position={[x, 2, 0]} castShadow>
                    <boxGeometry args={[0.5, 4, 0.5]} />
                    <meshStandardMaterial
                        color="#FFD700"
                        emissive="#FFD700"
                        emissiveIntensity={2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}

            {/* Gate arch */}
            <mesh position={[0, 4, 0]} castShadow>
                <boxGeometry args={[6.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFD700"
                    emissiveIntensity={2}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Continue text */}
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

            {selectedCount > 0 && (
                <Text
                    position={[0, 3.5, 0]}
                    fontSize={0.5}
                    color="#FFD700"
                    anchorX="center"
                    anchorY="middle"
                >
                    {selectedCount} Collected
                </Text>
            )}

            <Sparkles
                count={5}
                scale={[8, 6, 2]}
                size={3}
                speed={0.3}
                opacity={0.6}
                color="#FFD700"
            />
        </group>
    );
};

// Main Zone5 Component
const Zone5_GamesOwned = ({ onComplete }) => {
    const [selectedGames, setSelectedGames] = useState([]);
    const [transitioning, setTransitioning] = useState(false);

    const games = [
        {
            id: 'shipping-empire',
            name: 'Shipping\nEmpire',
            icon: '🚢',
            color: '#2196F3',
            emissiveColor: '#1976D2',
            position: [-8, 0, -455]
        },
        {
            id: 'rivals-fairyland',
            name: 'Rivals in\nFairyland',
            icon: '🧚',
            color: '#E91E63',
            emissiveColor: '#C2185B',
            position: [0, 0, -455]
        },
        {
            id: 'mission-mars',
            name: 'Mission to\nMars',
            icon: '🚀',
            color: '#FF5722',
            emissiveColor: '#E64A19',
            position: [8, 0, -455]
        }
    ];

    const handleGameToggle = (gameId) => {
        setSelectedGames(prev => {
            if (prev.includes(gameId)) {
                return prev.filter(id => id !== gameId);
            } else {
                return [...prev, gameId];
            }
        });
    };

    const handleContinue = () => {
        console.log('Games owned:', selectedGames);
        setTransitioning(true);

        setTimeout(() => {
            onComplete?.(selectedGames);
        }, 1500);
    };

    return (
        <group name="zone-5-games-owned">
            {/* Zone title */}
            <Text
                position={[0, 10, -440]}
                fontSize={1.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={30}
                textAlign="center"
                outlineWidth={0.08}
                outlineColor="#FFD700"
                letterSpacing={0.05}
            >
                WHICH GAMES DO YOU OWN?
            </Text>

            {/* Subtitle */}
            <Text
                position={[0, 8.5, -440]}
                fontSize={0.6}
                color="#FFD700"
                anchorX="center"
                anchorY="middle"
                maxWidth={35}
                textAlign="center"
                outlineWidth={0.03}
                outlineColor="#000000"
            >
                Drive through game boxes to collect them - select all you own!
            </Text>

            {/* Game pedestals */}
            {games.map((game) => (
                <GamePedestal
                    key={game.id}
                    position={game.position}
                    gameId={game.id}
                    gameName={game.name}
                    icon={game.icon}
                    color={game.color}
                    emissiveColor={game.emissiveColor}
                    onToggle={() => handleGameToggle(game.id)}
                    selected={selectedGames.includes(game.id)}
                />
            ))}

            {/* Continue gate */}
            <ContinueGate
                position={[0, 0, -475]}
                selectedCount={selectedGames.length}
                onContinue={handleContinue}
            />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[20, 30, -455]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[512, 512]}
                color="#ffffff"
            />

            {/* Rim lights */}
            <pointLight position={[-12, 8, -455]} intensity={30} color="#2196F3" />
            <pointLight position={[12, 8, -455]} intensity={30} color="#FF5722" />

            {/* Atmospheric particles */}
            <Sparkles
                count={8}
                scale={[40, 15, 40]}
                size={2}
                speed={0.15}
                opacity={0.3}
                color="#FFD700"
            />

            {/* Transition message */}
            {transitioning && (
                <Text
                    position={[0, 5, -450]}
                    fontSize={1}
                    color="#FFD700"
                    anchorX="center"
                    anchorY="middle"
                >
                    GREAT COLLECTION! 🎮
                </Text>
            )}
        </group>
    );
};

export default Zone5_GamesOwned;
