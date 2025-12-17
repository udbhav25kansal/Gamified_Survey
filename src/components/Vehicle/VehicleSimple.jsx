import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRaycastVehicle, useBox } from '@react-three/cannon';
import * as THREE from 'three';

const Wheel = React.forwardRef(({ radius, ...props }, ref) => {
    return (
        <group ref={ref} {...props}>
            {/* Tire */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[radius, radius, 0.4, 16]} />
                <meshStandardMaterial
                    color="#222"
                    roughness={0.8}
                    metalness={0.3}
                />
            </mesh>
            {/* Glowing Rim */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[radius * 0.5, radius * 0.5, 0.41, 16]} />
                <meshStandardMaterial
                    color="#E6007E"
                    emissive="#E6007E"
                    emissiveIntensity={1.5}
                    metalness={1}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
});

const CameraRig = ({ target }) => {
    const { camera } = useThree();
    const offset = new THREE.Vector3(0, 6, 12);

    useFrame(() => {
        if (!target.current) return;

        const pos = new THREE.Vector3();
        target.current.getWorldPosition(pos);

        const desiredPos = pos.clone().add(offset);
        camera.position.lerp(desiredPos, 0.1);
        camera.lookAt(pos.x, pos.y + 1, pos.z);
    });

    return null;
};

const Vehicle = ({ position = [0, 2, 0] }) => {
    console.log('=== VehicleSimple component rendering ===');

    // Keyboard state - using refs to avoid re-renders
    const keysPressed = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        brake: false,
        reset: false
    });

    console.log('keysPressed ref created:', keysPressed.current);

    // Setup keyboard listeners
    useEffect(() => {
        console.log('useEffect STARTING');

        const handleKeyDown = (e) => {
            console.log('🔥 KEY DOWN:', e.key);
            const key = e.key.toLowerCase();
            if (key === 'w' || key === 'arrowup') {
                keysPressed.current.forward = true;
                console.log('✅ Forward TRUE');
            }
            if (key === 's' || key === 'arrowdown') keysPressed.current.backward = true;
            if (key === 'a' || key === 'arrowleft') keysPressed.current.left = true;
            if (key === 'd' || key === 'arrowright') keysPressed.current.right = true;
            if (key === ' ') keysPressed.current.brake = true;
            if (key === 'r') keysPressed.current.reset = true;
        };

        const handleKeyUp = (e) => {
            console.log('🔥 KEY UP:', e.key);
            const key = e.key.toLowerCase();
            if (key === 'w' || key === 'arrowup') {
                keysPressed.current.forward = false;
                console.log('❌ Forward FALSE');
            }
            if (key === 's' || key === 'arrowdown') keysPressed.current.backward = false;
            if (key === 'a' || key === 'arrowleft') keysPressed.current.left = false;
            if (key === 'd' || key === 'arrowright') keysPressed.current.right = false;
            if (key === ' ') keysPressed.current.brake = false;
            if (key === 'r') keysPressed.current.reset = false;
        };

        console.log('✅ VehicleSimple: Adding keyboard listeners to window');
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        console.log('✅ Keyboard listeners added successfully');

        // Test if events work
        console.log('Testing: Press any key now and you should see 🔥 KEY DOWN');

        return () => {
            console.log('VehicleSimple: Removing keyboard listeners');
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Chassis dimensions
    const chassisWidth = 1.5;
    const chassisHeight = 0.6;
    const chassisLength = 3;
    const mass = 200;

    // Create chassis body
    const [chassisBody, chassisApi] = useBox(() => ({
        mass,
        position,
        args: [chassisWidth, chassisHeight, chassisLength],
        allowSleep: false,
    }));

    // Wheel refs
    const wheelRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    // Wheel configuration
    const wheelInfo = {
        radius: 0.4,
        directionLocal: [0, -1, 0],
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        maxSuspensionForce: 100000,
        maxSuspensionTravel: 0.3,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        axleLocal: [-1, 0, 0],
        chassisConnectionPointLocal: [1, 0, 1],
        useCustomSlidingRotationalSpeed: true,
        customSlidingRotationalSpeed: -30,
        frictionSlip: 2,
    };

    const wheelInfos = [
        { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-0.9, -0.3, 1.2] },
        { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [0.9, -0.3, 1.2] },
        { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-0.9, -0.3, -1.2] },
        { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [0.9, -0.3, -1.2] },
    ];

    // Create raycast vehicle
    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
        chassisBody,
        wheels: wheelRefs,
        wheelInfos,
    }));

    // Apply controls using refs
    useFrame(() => {
        if (!vehicleApi) {
            console.error('vehicleApi is undefined!');
            return;
        }

        const controls = keysPressed.current;
        console.log('Controls from ref:', controls);

        const engineForce = controls.forward ? 2000 : controls.backward ? -1200 : 0;
        const steeringValue = controls.left ? 0.6 : controls.right ? -0.6 : 0;
        const brakeForce = controls.brake ? 100 : 0;

        console.log('Applying forces:', { engineForce, steeringValue, brakeForce });
        console.log('vehicleApi:', vehicleApi);
        console.log('vehicleApi.applyEngineForce:', typeof vehicleApi.applyEngineForce);

        // Apply engine force to rear wheels
        console.log('Calling applyEngineForce(', engineForce, ', 2)');
        vehicleApi.applyEngineForce(engineForce, 2);
        console.log('Calling applyEngineForce(', engineForce, ', 3)');
        vehicleApi.applyEngineForce(engineForce, 3);

        // Apply steering to front wheels
        vehicleApi.setSteeringValue(steeringValue, 0);
        vehicleApi.setSteeringValue(steeringValue, 1);

        // Apply brakes to all wheels
        vehicleApi.setBrake(brakeForce, 0);
        vehicleApi.setBrake(brakeForce, 1);
        vehicleApi.setBrake(brakeForce, 2);
        vehicleApi.setBrake(brakeForce, 3);

        console.log('✅ All forces applied');

        // Reset vehicle
        if (controls.reset) {
            chassisApi.position.set(0, 2, 0);
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            chassisApi.rotation.set(0, 0, 0);
        }
    });

    return (
        <group ref={vehicle} name="vehicle">
            <CameraRig target={chassisBody} />

            {/* Chassis */}
            <mesh ref={chassisBody} name="chassis" castShadow>
                <boxGeometry args={[chassisWidth, chassisHeight, chassisLength]} />
                <meshStandardMaterial
                    color="#E6007E"
                    emissive="#E6007E"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />

                {/* Windshield/Cockpit */}
                <mesh position={[0, 0.3, 0.8]}>
                    <boxGeometry args={[1.3, 0.5, 1.2]} />
                    <meshStandardMaterial
                        color="#00D4FF"
                        transparent
                        opacity={0.4}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>

                {/* Headlights with actual light */}
                <pointLight
                    position={[0, 0, 1.6]}
                    intensity={3}
                    distance={20}
                    color="white"
                    castShadow
                />
                <mesh position={[-0.5, 0, 1.5]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial
                        color="white"
                        emissive="white"
                        emissiveIntensity={5}
                    />
                </mesh>
                <mesh position={[0.5, 0, 1.5]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial
                        color="white"
                        emissive="white"
                        emissiveIntensity={5}
                    />
                </mesh>

                {/* Tail lights */}
                <mesh position={[-0.5, 0, -1.5]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial
                        color="red"
                        emissive="red"
                        emissiveIntensity={3}
                    />
                </mesh>
                <mesh position={[0.5, 0, -1.5]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial
                        color="red"
                        emissive="red"
                        emissiveIntensity={3}
                    />
                </mesh>
            </mesh>

            {/* Wheels */}
            {wheelRefs.map((ref, i) => (
                <Wheel key={i} ref={ref} radius={wheelInfo.radius} />
            ))}
        </group>
    );
};

export default Vehicle;
