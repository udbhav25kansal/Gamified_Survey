import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Stars } from '@react-three/drei';
import { BrandProvider } from './context/BrandContext';
import World from './components/World/World';
import UI from './components/UI/UI';
import DecaBotIntro from './components/UI/DecaBotIntro';
import './index.css';

function App() {
    const [showIntro, setShowIntro] = useState(true);

    const handleStartSurvey = () => {
        setShowIntro(false);
    };

    return (
        <BrandProvider>
            <div className="app-container">
                {/* Deca Bot Intro Modal */}
                {showIntro && <DecaBotIntro onStart={handleStartSurvey} />}

                <Canvas
                    shadows
                    camera={{ position: [0, 8, 15], fov: 60 }}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: "high-performance"
                    }}
                    onCreated={({ gl }) => {
                        // Ensure the canvas can receive focus so keyboard input is reliable.
                        gl.domElement.tabIndex = 0;
                        gl.domElement.style.outline = 'none';
                        gl.domElement.focus();
                    }}
                    onPointerDown={(e) => {
                        // Re-focus canvas after interacting with UI/Html overlays.
                        e.target?.focus?.();
                    }}
                >
                    {/* Dark cyberpunk background */}
                    <color attach="background" args={['#0a0a0a']} />
                    <fog attach="fog" args={['#0a0a0a', 20, 100]} />

                    {/* Better Lighting Setup */}
                    <ambientLight intensity={0.3} />
                    <directionalLight
                        position={[10, 20, 10]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        shadow-camera-left={-50}
                        shadow-camera-right={50}
                        shadow-camera-top={50}
                        shadow-camera-bottom={-50}
                    />
                    <pointLight position={[0, 10, 0]} intensity={0.5} color="#E6007E" />
                    <pointLight position={[-20, 5, -20]} intensity={0.3} color="#00D4FF" />

                    <Suspense fallback={null}>
                        <Physics gravity={[0, -9.81, 0]}>
                            <World />
                        </Physics>

                        {/* Cyberpunk Stars */}
                        <Stars
                            radius={100}
                            depth={50}
                            count={5000}
                            factor={4}
                            saturation={0}
                            fade
                            speed={1}
                        />
                    </Suspense>
                </Canvas>
                <UI />
            </div>
        </BrandProvider>
    );
}

export default App;
