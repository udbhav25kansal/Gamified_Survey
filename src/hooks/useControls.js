import { useEffect, useRef } from 'react';

const isTypingTarget = (target) => {
    if (!target) return false;
    const el = /** @type {HTMLElement} */ (target);
    const tag = (el.tagName || '').toUpperCase();
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
};

export const useControls = () => {
    const controls = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        brake: false,
        reset: false
    });

    useEffect(() => {
        console.log('useControls: Setting up keyboard listeners');

        const setKey = (e, isDown) => {
            if (isTypingTarget(e.target)) return;

            const key = typeof e.key === 'string' ? e.key.toLowerCase() : '';
            const code = typeof e.code === 'string' ? e.code : '';

            // Debug log
            if (isDown) {
                console.log('KEY PRESSED:', key, code);
            }

            // Prevent scrolling
            if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
                e.preventDefault?.();
            }

            // Forward
            if (key === 'w' || key === 'arrowup' || code === 'KeyW' || code === 'ArrowUp') {
                controls.current.forward = isDown;
                console.log('Forward:', isDown);
                return;
            }
            // Backward
            if (key === 's' || key === 'arrowdown' || code === 'KeyS' || code === 'ArrowDown') {
                controls.current.backward = isDown;
                return;
            }
            // Left
            if (key === 'a' || key === 'arrowleft' || code === 'KeyA' || code === 'ArrowLeft') {
                controls.current.left = isDown;
                return;
            }
            // Right
            if (key === 'd' || key === 'arrowright' || code === 'KeyD' || code === 'ArrowRight') {
                controls.current.right = isDown;
                return;
            }
            // Brake
            if (key === ' ' || code === 'Space') {
                controls.current.brake = isDown;
                return;
            }
            // Reset
            if (key === 'r' || code === 'KeyR') {
                controls.current.reset = isDown;
            }
        };

        const handleKeyDown = (e) => setKey(e, true);
        const handleKeyUp = (e) => setKey(e, false);

        window.addEventListener('keydown', handleKeyDown, true);
        window.addEventListener('keyup', handleKeyUp, true);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            window.removeEventListener('keyup', handleKeyUp, true);
        };
    }, []);

    return controls;
};
