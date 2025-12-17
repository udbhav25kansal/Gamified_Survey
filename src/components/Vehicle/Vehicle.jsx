import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { useControls } from '../../hooks/useControls';
import * as THREE from 'three';

const CameraRig = ({ target }) => {
    const { camera } = useThree();
    const smoothPos = useRef(new THREE.Vector3(0, 8, 15));
    const smoothLook = useRef(new THREE.Vector3());

    useFrame(() => {
        if (!target.current) return;

        const carPos = new THREE.Vector3();
        target.current.getWorldPosition(carPos);

        const carQuat = new THREE.Quaternion();
        target.current.getWorldQuaternion(carQuat);
        
        // Camera behind car
        const offset = new THREE.Vector3(0, 4, 10).applyQuaternion(carQuat);
        const desiredPos = carPos.clone().add(offset);
        
        smoothPos.current.lerp(desiredPos, 0.08);
        camera.position.copy(smoothPos.current);
        
        smoothLook.current.lerp(carPos, 0.15);
        camera.lookAt(smoothLook.current);
    });

    return null;
};

const Vehicle = ({ position = [0, 1, 0] }) => {
    const controls = useControls();
    
    // Smooth steering angle (not instant)
    const steeringAngle = useRef(0);
    const targetSteering = useRef(0);
    
    // Current car state
    const carRotation = useRef(0);
    const carSpeed = useRef(0);
    const yVelocity = useRef(0);

    const chassisWidth = 1.5;
    const chassisHeight = 0.6;
    const chassisLength = 3;

    const [chassisBody, chassisApi] = useBox(() => ({
        mass: 1,
        position,
        args: [chassisWidth, chassisHeight, chassisLength],
        allowSleep: false,
        fixedRotation: true,
        linearDamping: 0.1, // Very low - let our code handle friction
    }));

    // Track Y velocity for gravity
    React.useEffect(() => {
        const unsub = chassisApi.velocity.subscribe((v) => {
            yVelocity.current = v[1];
        });
        return unsub;
    }, [chassisApi]);

    useFrame((_, delta) => {
        if (!chassisApi) return;

        const { forward, backward, left, right, brake, reset } = controls.current;
        
        // === TUNING PARAMETERS ===
        const maxSpeed = 25;
        const maxReverse = 15;
        const acceleration = 40;      // How fast we speed up
        const braking = 60;           // How fast we slow with brake
        const friction = 15;          // Natural slowdown
        const maxSteerAngle = 0.8;    // Max steering angle in radians
        const steerSpeed = 5;         // How fast steering responds
        const turnRate = 3;           // Base turn rate
        
        // === ACCELERATION ===
        if (forward) {
            carSpeed.current += acceleration * delta;
            if (carSpeed.current > maxSpeed) carSpeed.current = maxSpeed;
        } else if (backward) {
            carSpeed.current -= acceleration * delta;
            if (carSpeed.current < -maxReverse) carSpeed.current = -maxReverse;
        } else {
            // Natural friction
            if (carSpeed.current > 0) {
                carSpeed.current -= friction * delta;
                if (carSpeed.current < 0) carSpeed.current = 0;
            } else if (carSpeed.current < 0) {
                carSpeed.current += friction * delta;
                if (carSpeed.current > 0) carSpeed.current = 0;
            }
        }

        // === BRAKING ===
        if (brake) {
            if (carSpeed.current > 0) {
                carSpeed.current -= braking * delta;
                if (carSpeed.current < 0) carSpeed.current = 0;
            } else if (carSpeed.current < 0) {
                carSpeed.current += braking * delta;
                if (carSpeed.current > 0) carSpeed.current = 0;
            }
        }

        // === STEERING ===
        // Set target steering based on input
        if (left) {
            targetSteering.current = maxSteerAngle;
        } else if (right) {
            targetSteering.current = -maxSteerAngle;
        } else {
            targetSteering.current = 0;
        }
        
        // Smooth steering interpolation
        steeringAngle.current += (targetSteering.current - steeringAngle.current) * steerSpeed * delta * 10;
        
        // === TURNING ===
        // Turn rate scales with speed (faster = tighter turns possible)
        const speedFactor = Math.abs(carSpeed.current) / maxSpeed;
        const effectiveTurnRate = turnRate * speedFactor;
        
        // Apply steering to rotation (reverse steering direction when going backward)
        const direction = carSpeed.current >= 0 ? 1 : -1;
        carRotation.current += steeringAngle.current * effectiveTurnRate * direction * delta;

        // === APPLY TO PHYSICS ===
        chassisApi.rotation.set(0, carRotation.current, 0);
        
        const vx = -Math.sin(carRotation.current) * carSpeed.current;
        const vz = -Math.cos(carRotation.current) * carSpeed.current;
        chassisApi.velocity.set(vx, yVelocity.current, vz);

        // === RESET ===
        if (reset) {
            chassisApi.position.set(0, 1, 0);
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.rotation.set(0, 0, 0);
            carRotation.current = 0;
            carSpeed.current = 0;
            steeringAngle.current = 0;
            targetSteering.current = 0;
        }
    });

    // Wheel animation
    const wheelSpin = useRef(0);
    const wheelSteer = useRef(0);
    
    useFrame((_, delta) => {
        // Spin wheels based on speed
        wheelSpin.current += carSpeed.current * delta * 3;
        // Front wheels turn with steering
        wheelSteer.current += (steeringAngle.current - wheelSteer.current) * 0.2;
    });

    return (
        <group>
            <CameraRig target={chassisBody} />

            <mesh ref={chassisBody} name="chassis" castShadow>
                <boxGeometry args={[chassisWidth, chassisHeight, chassisLength]} />
                <meshStandardMaterial
                    color="#E6007E"
                    emissive="#E6007E"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />

                {/* Cockpit */}
                <mesh position={[0, 0.3, -0.8]}>
                    <boxGeometry args={[1.3, 0.5, 1.2]} />
                    <meshStandardMaterial color="#00D4FF" transparent opacity={0.4} metalness={1} roughness={0} />
                </mesh>

                {/* Front lights */}
                <pointLight position={[0, 0, -1.6]} intensity={3} distance={20} color="white" />
                <mesh position={[-0.5, 0, -1.5]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
                </mesh>
                <mesh position={[0.5, 0, -1.5]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
                </mesh>

                {/* Tail lights */}
                <mesh position={[-0.5, 0, 1.5]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
                </mesh>
                <mesh position={[0.5, 0, 1.5]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={3} />
                </mesh>

                {/* Front Wheels - with steering */}
                {[
                    [-0.75, -0.4, -1.0],
                    [0.75, -0.4, -1.0],
                ].map((pos, i) => (
                    <group key={`front-${i}`} position={pos} rotation={[0, wheelSteer.current, 0]}>
                        <mesh rotation={[wheelSpin.current, 0, Math.PI / 2]} castShadow>
                            <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
                            <meshStandardMaterial color="#222" roughness={0.8} metalness={0.3} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.2, 0.2, 0.31, 16]} />
                            <meshStandardMaterial color="#E6007E" emissive="#E6007E" emissiveIntensity={1.5} metalness={1} roughness={0.2} />
                        </mesh>
                    </group>
                ))}
                
                {/* Rear Wheels - no steering */}
                {[
                    [-0.75, -0.4, 1.0],
                    [0.75, -0.4, 1.0],
                ].map((pos, i) => (
                    <group key={`rear-${i}`} position={pos}>
                        <mesh rotation={[wheelSpin.current, 0, Math.PI / 2]} castShadow>
                            <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
                            <meshStandardMaterial color="#222" roughness={0.8} metalness={0.3} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.2, 0.2, 0.31, 16]} />
                            <meshStandardMaterial color="#E6007E" emissive="#E6007E" emissiveIntensity={1.5} metalness={1} roughness={0.2} />
                        </mesh>
                    </group>
                ))}
            </mesh>
        </group>
    );
};

export default Vehicle;
