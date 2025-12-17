import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraFollow = ({ target }) => {
    const cameraRef = useRef();

    // Offset: Behind and above
    const offset = new THREE.Vector3(0, 5, 10);
    const lookAtOffset = new THREE.Vector3(0, 0, -5); // Look slightly ahead of car

    useFrame((state) => {
        if (!target.current) return;

        // Get chassis position
        const chassisPos = new THREE.Vector3();
        target.current.getWorldPosition(chassisPos);

        // Calculate desired camera position
        const desiredPos = chassisPos.clone().add(offset);

        // Smoothly interpolate camera position (Lerp)
        state.camera.position.lerp(desiredPos, 0.1);

        // Look at the car (plus offset)
        const lookAtPos = chassisPos.clone().add(lookAtOffset);
        state.camera.lookAt(lookAtPos);
    });

    return null;
};

export default CameraFollow;
