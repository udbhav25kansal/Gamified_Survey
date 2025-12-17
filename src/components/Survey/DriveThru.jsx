import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { Text, Html } from '@react-three/drei';

const DriveThru = ({ position = [0, 0, 0], question, onAnswer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [gx, gy, gz] = position;

    const [ref] = useBox(() => ({
        isTrigger: true,
        position: [gx, gy + 2, gz], // World position, centered vertically
        args: [6, 4, 6],
        onCollide: (e) => {
            if (e.body.name === 'chassis') {
                setIsOpen(true);
            }
        }
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onAnswer?.(inputValue);
        setIsOpen(false);
    };

    return (
        <group position={position}>
            {/* Invisible physics trigger */}
            <mesh ref={ref} visible={false}>
                <boxGeometry args={[6, 4, 6]} />
            </mesh>
            
            {/* Visual Booth */}
            <mesh position={[3, 2, 0]}>
                <boxGeometry args={[1, 4, 4]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[-3, 2, 0]}>
                <boxGeometry args={[1, 4, 4]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[7, 1, 4]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            <Text position={[0, 5, 2]} fontSize={0.8} color="white" anchorX="center" anchorY="middle">
                {question}
            </Text>

            {/* HTML Overlay for Input */}
            {isOpen && (
                <Html position={[0, 2, 0]} center transform>
                    <div style={{
                        background: 'rgba(0,0,0,0.9)',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '2px solid #E6007E',
                        width: '300px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>{question}</h3>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                style={{ width: '100%', height: '80px', marginBottom: '10px', borderRadius: '5px' }}
                                placeholder="Type here..."
                                autoFocus
                            />
                            <button
                                type="submit"
                                style={{
                                    background: '#E6007E',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                SEND & DRIVE
                            </button>
                        </form>
                    </div>
                </Html>
            )}
        </group>
    );
};

export default DriveThru;
