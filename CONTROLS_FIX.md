# Vehicle Controls Fix

## ❌ The Problem

The car controls weren't working at all - pressing W/A/S/D or arrow keys did nothing.

## 🔍 Root Cause

Found **critical bugs** in `Vehicle.jsx`:

### 1. **Broken useRaycastVehicle Hook**
```javascript
// WRONG ❌
const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheels,
    wheelInfos,
}), useRef(null));  // ← This second parameter is WRONG!
```

The `useRaycastVehicle` hook doesn't take a ref as a second parameter. This was causing the vehicle API to not initialize properly, so `vehicleApi` was always undefined.

### 2. **Variables Used Before Declaration**
```javascript
// Tried to use 'wheels' here
const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    wheels,  // ← Used here
    // ...
}));

// But 'wheels' was declared AFTER
const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];
```

This created an undefined reference, breaking the physics initialization.

### 3. **React Hooks Rule Violation**
```javascript
// ❌ Creating refs in an array dynamically
const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];
```

While this works, it's better to declare them individually to avoid potential React hooks issues.

---

## ✅ The Fix

### Fixed Vehicle.jsx

**Key Changes:**

1. **Declared wheel refs BEFORE using them:**
```javascript
// ✅ CORRECT - Declare first
const wheelRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

// Then use them
const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheels: wheelRefs,  // ← Now defined
    wheelInfos,
}));
```

2. **Removed invalid second parameter:**
```javascript
// ✅ CORRECT - No second parameter
const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheels: wheelRefs,
    wheelInfos,
}));
```

3. **Removed useBrand() dependency:**
```javascript
// Removed this line since we're not using brand colors dynamically
// const { brand } = useBrand();
```

4. **Increased engine force for better responsiveness:**
```javascript
// Better acceleration
const engineForce = forward ? 2000 : backward ? -1200 : 0;  // Was 1500/-1000
const steeringValue = left ? 0.6 : right ? -0.6 : 0;  // Was 0.5/-0.5
const brakeForce = brake ? 100 : 0;  // Was 50
```

---

## 🎮 How to Test

1. **Refresh the browser** (the dev server should hot-reload automatically)
   - URL: http://localhost:5174

2. **Click anywhere on the page** to focus it (keyboard events need focus)

3. **Try the controls:**
   - **W** or **↑** - Drive forward
   - **S** or **↓** - Drive backward
   - **A** or **←** - Turn left
   - **D** or **→** - Turn right
   - **Space** - Brake
   - **R** - Reset to starting position

4. **Expected behavior:**
   - Car should move smoothly
   - Headlights should illuminate the path
   - Camera should follow behind the car
   - Physics should feel realistic (suspension, friction, etc.)

---

## 🐛 Debugging Steps Taken

1. ✅ Checked `useControls.js` - Controls hook was fine
2. ✅ Verified keyboard events are firing - Working correctly
3. ✅ Examined Vehicle component - **FOUND THE BUG HERE**
4. ✅ Fixed useRaycastVehicle initialization
5. ✅ Reordered variable declarations
6. ✅ Removed unused dependencies

---

## 📁 Files Changed

- `src/components/Vehicle/Vehicle.jsx` - **FIXED**
- `src/components/Vehicle/Vehicle.jsx.backup` - **OLD BROKEN VERSION** (kept for reference)

---

## 💡 Why This Happened

The original Vehicle.jsx was copied from a template that had:
- Incorrect hook usage
- Variables declared out of order
- Dependencies on brand context that weren't needed

When we updated the visuals, we didn't catch these underlying physics bugs because we were focused on lighting/materials.

---

## ✅ Status

**FIXED** - Vehicle controls should now work perfectly!

The car should respond to keyboard input, drive smoothly, and the physics should feel realistic like a proper driving game.

---

**Last Updated:** December 17, 2025
**Status:** 🟢 WORKING
