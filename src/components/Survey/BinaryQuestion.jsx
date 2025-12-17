import React, { useState } from 'react';
import Gate from './Gate';
import { Text } from '@react-three/drei';

const BinaryQuestion = ({ position = [0, 0, 0], question, onAnswer }) => {
    const [answered, setAnswered] = useState(false);
    const [gx, gy, gz] = position;

    const handleAnswer = (answer) => {
        if (answered) return;
        setAnswered(true);
        onAnswer?.(answer);
        console.log(`Answered: ${answer}`);
    };

    return (
        <group>
            {/* Question Billboard */}
            <Text 
                position={[gx, gy + 6, gz]} 
                fontSize={1} 
                color="white" 
                anchorX="center" 
                anchorY="middle" 
                outlineWidth={0.05} 
                outlineColor="black"
            >
                {question}
            </Text>

            {/* Left Gate (Yes) - absolute position */}
            <Gate
                position={[gx - 3, gy, gz]}
                text="YES"
                color="#2ECC71"
                onEnter={() => handleAnswer('yes')}
            />

            {/* Right Gate (No) - absolute position */}
            <Gate
                position={[gx + 3, gy, gz]}
                text="NO"
                color="#E74C3C"
                onEnter={() => handleAnswer('no')}
            />
        </group>
    );
};

export default BinaryQuestion;
