import React, { useMemo } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Stars, Float } from '@react-three/drei';

const RivalTheme = () => {
    return (
        <group>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <fog attach="fog" args={['#111', 10, 50]} />
            {/* Grid Floor Effect */}
            <gridHelper args={[100, 100, '#E6007E', '#222']} position={[0, 0.01, 0]} />

            {/* Floating Data Cubes */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={[Math.random() * 40 - 20, Math.random() * 5 + 2, Math.random() * 40 - 20]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="#E6007E" emissive="#E6007E" emissiveIntensity={2} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const DecaTheme = () => {
    return (
        <group>
            <color attach="background" args={['#34495e']} />
            <fog attach="fog" args={['#34495e', 20, 60]} />
            {/* Wooden Table Texture (Simulated with color for now) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>

            {/* Giant Dice */}
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[5, 5, -10]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </Float>
        </group>
    );
};

const RinoTheme = () => {
    return (
        <group>
            <color attach="background" args={['#87CEEB']} />
            <fog attach="fog" args={['#87CEEB', 20, 100]} />
            {/* Grass */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#4CAF50" roughness={1} />
            </mesh>

            {/* Trees (Cones) */}
            {Array.from({ length: 10 }).map((_, i) => (
                <mesh key={i} position={[Math.random() * 40 - 20, 2, Math.random() * 40 - 20]}>
                    <coneGeometry args={[1, 4, 8]} />
                    <meshStandardMaterial color="#2E7D32" />
                </mesh>
            ))}
        </group>
    );
};

const EnvironmentManager = () => {
    const { brand } = useBrand();

    switch (brand.name) {
        case 'Rival': return <RivalTheme />;
        case 'Deca': return <DecaTheme />;
        case 'Rino': return <RinoTheme />;
        default: return <RivalTheme />;
    }
};

export default EnvironmentManager;
