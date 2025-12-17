import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const VideoScreen = ({ position, videoUrl = null, onVideoEnd, isPlaying }) => {
    const videoRef = useRef();
    const [videoTexture, setVideoTexture] = useState(null);

    useEffect(() => {
        if (videoUrl) {
            // Create video element
            const video = document.createElement('video');
            video.src = videoUrl;
            video.crossOrigin = 'anonymous';
            video.loop = false;
            video.muted = false;
            video.playsInline = true;

            videoRef.current = video;

            // Create video texture
            const texture = new THREE.VideoTexture(video);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            setVideoTexture(texture);

            // Handle video end
            video.addEventListener('ended', () => {
                console.log('Video ended!');
                onVideoEnd?.();
            });

            return () => {
                video.pause();
                video.src = '';
            };
        }
    }, [videoUrl, onVideoEnd]);

    useEffect(() => {
        if (videoRef.current && isPlaying) {
            console.log('Starting video playback...');
            videoRef.current.play().catch(err => {
                console.error('Error playing video:', err);
            });
        } else if (videoRef.current && !isPlaying) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <group position={position}>
            {/* Support pillars */}
            <mesh position={[-4.2, -2.5, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.3, 5, 16]} />
                <meshStandardMaterial
                    color="#333"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh position={[4.2, -2.5, 0]} castShadow>
                <cylinderGeometry args={[0.3, 0.3, 5, 16]} />
                <meshStandardMaterial
                    color="#333"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Screen frame (outer border) */}
            <mesh castShadow>
                <boxGeometry args={[8.4, 4.9, 0.2]} />
                <meshStandardMaterial
                    color="#222"
                    emissive="#E6007E"
                    emissiveIntensity={isPlaying ? 0.5 : 1}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Video screen surface */}
            <mesh position={[0, 0, 0.15]}>
                <planeGeometry args={[8, 4.5]} />
                {videoTexture && isPlaying ? (
                    <meshBasicMaterial map={videoTexture} toneMapped={false} />
                ) : (
                    // Placeholder when no video or not playing
                    <meshStandardMaterial
                        color="#111"
                        emissive="#333"
                        emissiveIntensity={0.1}
                    />
                )}
            </mesh>

            {/* Decorative corner accents */}
            {[-3.8, 3.8].map((x) =>
                [-2.1, 2.1].map((y) => (
                    <mesh key={`${x}-${y}`} position={[x, y, 0.2]}>
                        <boxGeometry args={[0.3, 0.3, 0.1]} />
                        <meshStandardMaterial
                            color="#00D4FF"
                            emissive="#00D4FF"
                            emissiveIntensity={2}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                ))
            )}

            {/* Screen backlight (creates glow effect) */}
            <pointLight
                position={[0, 0, -1]}
                intensity={isPlaying ? 1.5 : 0.8}
                distance={10}
                color={isPlaying ? "#ffffff" : "#E6007E"}
            />

            {/* Top spotlight */}
            <spotLight
                position={[0, 5, 2]}
                angle={0.5}
                penumbra={0.5}
                intensity={isPlaying ? 0.3 : 0.6}
                castShadow
                color="#E6007E"
            />

            {/* Floating "DECA GAMES" text above screen when not playing */}
            {!isPlaying && (
                <group position={[0, 3, 0]}>
                    <mesh>
                        <boxGeometry args={[4, 0.6, 0.1]} />
                        <meshStandardMaterial
                            color="#E6007E"
                            emissive="#E6007E"
                            emissiveIntensity={1.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                </group>
            )}

            {/* Particles floating around screen */}
            {!isPlaying && (
                <>
                    {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const radius = 5;
                        return (
                            <mesh
                                key={i}
                                position={[
                                    Math.cos(angle) * radius,
                                    Math.sin(angle) * radius * 0.5,
                                    0.5
                                ]}
                            >
                                <sphereGeometry args={[0.05, 8, 8]} />
                                <meshStandardMaterial
                                    color="#00D4FF"
                                    emissive="#00D4FF"
                                    emissiveIntensity={2}
                                />
                            </mesh>
                        );
                    })}
                </>
            )}
        </group>
    );
};

export default VideoScreen;
