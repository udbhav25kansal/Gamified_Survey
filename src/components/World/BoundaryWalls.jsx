import React from 'react';
import { useBox } from '@react-three/cannon';

// Invisible boundary walls to keep the car within the playable area
const BoundaryWalls = () => {
    // Left boundary wall - extended to cover all zones
    const [leftWall] = useBox(() => ({
        type: 'Static',
        position: [-30, 2, -450],
        args: [1, 10, 1000],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Right boundary wall - extended to cover all zones
    const [rightWall] = useBox(() => ({
        type: 'Static',
        position: [30, 2, -450],
        args: [1, 10, 1000],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Back boundary wall (start area)
    const [backWall] = useBox(() => ({
        type: 'Static',
        position: [0, 2, 10],
        args: [60, 10, 1],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Front boundary wall (far end) - extended to cover all zones
    const [frontWall] = useBox(() => ({
        type: 'Static',
        position: [0, 2, -950],
        args: [60, 10, 1],
        material: {
            friction: 0.8,
            restitution: 0, // No bounce
        }
    }));

    // Invisible catch floor (in case car falls)
    const [catchFloor] = useBox(() => ({
        type: 'Static',
        position: [0, -10, -450],
        args: [100, 1, 1000],
        onCollide: (e) => {
            // If car falls, teleport it back up
            if (e.body.name === 'chassis') {
                e.body.position.set(0, 2, e.body.position.z);
                e.body.velocity.set(0, 0, 0);
                e.body.angularVelocity.set(0, 0, 0);
            }
        }
    }));

    // No visual meshes - these are invisible physics walls
    return null;
};

export default BoundaryWalls;
