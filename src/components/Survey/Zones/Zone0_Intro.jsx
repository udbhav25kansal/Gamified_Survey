import React, { useState } from 'react';
import ToppleCharacter from '../Interactions/ToppleCharacter';
import VideoScreen from '../Interactions/VideoScreen';
import PlayButton from '../Interactions/PlayButton';
import StartGate from '../Interactions/StartGate';

const Zone0_Intro = ({ onComplete, videoUrl = null }) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [videoFinished, setVideoFinished] = useState(false);

    const handlePlayPress = () => {
        console.log('Play button pressed! Starting video...');
        setVideoPlaying(true);
        // TODO: Freeze car physics here
    };

    const handleVideoEnd = () => {
        console.log('Video ended!');
        setVideoPlaying(false);
        setVideoFinished(true);
        // TODO: Re-enable car physics here
    };

    const handleGateEnter = () => {
        console.log('Entered start gate! Zone 0 complete.');
        onComplete?.();
        // TODO: Trigger confetti, celebration effects
        // TODO: Load Zone 1
    };

    return (
        <group name="zone-0-intro">
            {/* Giant topple characters - Section 1 */}
            <ToppleCharacter
                position={[-2.5, 1.5, -8]}
                color="#E6007E"
                scale={1}
            />
            <ToppleCharacter
                position={[2.5, 1.5, -8]}
                color="#00D4FF"
                scale={1}
            />
            <ToppleCharacter
                position={[-2.5, 1.5, -12]}
                color="#FFD700"
                scale={1}
            />
            <ToppleCharacter
                position={[2.5, 1.5, -12]}
                color="#FF1493"
                scale={1}
            />

            {/* Video screen - Section 2 */}
            <VideoScreen
                position={[0, 2.5, -20]}
                videoUrl={videoUrl}
                onVideoEnd={handleVideoEnd}
                isPlaying={videoPlaying}
            />

            {/* Play button on ground (only show if video hasn't been played) */}
            {!videoPlaying && !videoFinished && (
                <PlayButton
                    position={[0, 0.15, -14]}
                    onPress={handlePlayPress}
                />
            )}

            {/* Start gate - Section 3 (after video) */}
            <StartGate
                position={[0, 0, -35]}
                onEnter={handleGateEnter}
            />

            {/* Additional atmospheric lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a0a', 30, 60]} />
        </group>
    );
};

export default Zone0_Intro;
