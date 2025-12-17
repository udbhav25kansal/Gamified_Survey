# Zone 2: Play Style - Documentation

**Created:** December 17, 2025
**Component:** `Zone2_PlayStyle.jsx`
**Location:** `src/components/Survey/Zones/`

---

## Overview

Zone 2 is the **Play Style** zone where users answer "What's your play style?" by driving up glowing ramps onto one of 4 floating islands. This zone features a fantasy/magical aesthetic with floating crystals, mystical particles, and enchanted atmospheres inspired by floating island gameplay in fantasy games.

**Theme:** Fantasy/Magical with floating platforms and mystical effects

---

## Features Implemented

### 🎨 Fantasy Aesthetic Graphics

1. **Floating Island Platforms:**
   - RoundedBox geometry (4×1×4 units) with 0.3 radius for soft edges
   - PBR materials with metalness (0.6) and dynamic emissive properties
   - Gentle bobbing animation: `y = baseY + sin(time * 0.5) * 0.3`
   - Subtle rotation wobble: `rotationY = sin(time * 0.3) * 0.1`
   - Color-coded per play style theme

2. **Magical Crystals:**
   - 4 cone-shaped crystals underneath each island (inverted)
   - Full metallic material (metalness: 1, roughness: 0)
   - High emissive intensity (2.0) for magical glow
   - Float animation with varying speeds and intensities
   - Secondary color matching each island's theme

3. **Floating Magical Orbs:**
   - 6 spheres orbiting each island in a circular pattern
   - Radius: 3 units from island center
   - Semi-transparent (opacity: 0.8) with intense emission (3.0)
   - Independent float animation for each orb
   - Creates mystical atmosphere around islands

4. **Professional Lighting:**
   - Ambient magical lighting (0.3 intensity, purple tint)
   - Directional key light with shadows (1024×1024 shadow map)
   - Dramatic uplighting from beneath each island (10-30 intensity based on state)
   - Rim lights at edges (40 intensity, purple and pink)
   - Volumetric mystical fog (#1a0a2e)

5. **Ultra-High Quality Text:**
   - Large zone title (1.5 fontSize) with purple outline
   - Pink instruction subtitle (0.6 fontSize)
   - Bold island labels (0.5 fontSize) with letter spacing
   - Color-coded descriptions (0.3 fontSize) per island
   - Large emoji icons (2.0 fontSize) for visual identity

### ⚙️ Glowing Ramps & Navigation

1. **Ramp Design:**
   - 3-unit wide, 5-unit long elevated pathways
   - Angled at π/6 (30 degrees) for smooth approach
   - Semi-transparent (opacity: 0.8) for premium feel
   - Metallic material (0.7 metalness, 0.3 roughness)
   - Dynamic emissive intensity (0.8 base, 1.5 on hover)

2. **Ramp Edge Lighting:**
   - Glowing edge rails on both sides (0.1×0.3×5 units)
   - Basic material with full opacity on hover
   - Color matches island's primary theme
   - Creates clear visual guide to each island

3. **Mystical Particles on Ramps:**
   - 15 Sparkles per ramp in 3×3×5 scale
   - Slow movement (speed: 0.3) for magical effect
   - Semi-transparent (opacity: 0.6)
   - Color-matched to island theme

4. **Physics Integration:**
   - Cylindrical trigger zones (2×2×6 units) at ramp base
   - useCylinder hook with isTrigger: true
   - Chassis detection: `e.body.name === 'chassis'`
   - Hover state activation on approach
   - Selection trigger on collision

### 🎭 Four Play Style Islands

Each island has unique configuration, colors, and identity:

**Spatial Layout:**
- Islands positioned at z=-80 (30 units behind Zone 1)
- 8-unit horizontal spacing between islands
- Elevated at y=6 for dramatic floating effect
- Ramps connect from ground (y=0) to islands (y=6)

1. **🏆 Competitive Champion**
   - Position: [-12, 6, -80]
   - Primary Color: `#FF6B35` (Fiery orange)
   - Secondary Color: `#FFD700` (Victory gold)
   - Emissive: `#FF4500` (Orange-red glow)
   - Theme: "Victory & Glory"
   - Personality: For players who love winning and competition

2. **🤝 Team Player**
   - Position: [-4, 6, -80]
   - Primary Color: `#4ECDC4` (Team cyan)
   - Secondary Color: `#00D4FF` (Bright cyan)
   - Emissive: `#00CED1` (Turquoise glow)
   - Theme: "Collaboration First"
   - Personality: For players who prioritize teamwork

3. **🎭 Story Immersion**
   - Position: [4, 6, -80]
   - Primary Color: `#9B59B6` (Narrative purple)
   - Secondary Color: `#E6007E` (Dramatic pink)
   - Emissive: `#8B008B` (Dark magenta)
   - Theme: "Deep Narratives"
   - Personality: For players who love story and lore

4. **😂 Just Here for Fun**
   - Position: [12, 6, -80]
   - Primary Color: `#FFD93D` (Joyful yellow)
   - Secondary Color: `#FF1493` (Fun pink)
   - Emissive: `#FFA500` (Orange glow)
   - Theme: "Good Times Only"
   - Personality: For casual players enjoying the experience

### 🎬 Animations & Interactions

1. **Island Animations:**
   - Continuous floating bob (sine wave, 0.3 amplitude)
   - Gentle rotation wobble (sine wave, 0.1 amplitude)
   - Crystal floating beneath (drei's Float component)
   - Orb floating around perimeter (independent Float per orb)

2. **Ramp Interactions:**
   - Hover effect increases emissive intensity (0.8 → 1.5)
   - Edge rails brighten on approach (0.6 → 1.0 opacity)
   - Particle effects remain consistent (mystical atmosphere)

3. **Selection Feedback:**
   - Green selection ring (Torus, 2.5 unit radius) beneath island
   - "✓ SELECTED" text indicator below island
   - Island emissive increases (base → selected state)
   - Dramatic uplighting intensifies (10 → 30 intensity)
   - Sparkle opacity increases (0.6 → 1.0)

4. **Transition State:**
   - "PERFECT CHOICE! ✨" message appears at z=-75
   - 2-second delay before zone completion
   - Smooth transition to next zone

### 🌟 Atmospheric Effects

1. **Mystical Fog:**
   - Color: `#1a0a2e` (deep purple-black)
   - Near: 30 units, Far: 100 units
   - Creates depth and magical mystery

2. **Atmospheric Particles:**
   - 50 Sparkles across entire zone
   - Large scale (50 units) for environmental effect
   - Slow movement (speed: 0.1) for dreamlike quality
   - Low opacity (0.4) for subtle atmosphere
   - Purple color (#9B59B6) matching theme

3. **Rim Lighting:**
   - Left rim light at [-15, 10, -80] with purple color
   - Right rim light at [15, 10, -80] with pink color
   - Both at 40 intensity for dramatic edge definition

---

## Component Structure

```
Zone2_PlayStyle/
├── FloatingIsland Component
│   ├── Physics Trigger (ramp base)
│   │   └── useCylinder with collision detection
│   ├── Glowing Ramp
│   │   ├── Main ramp surface (angled box)
│   │   ├── Edge rails (2 boxes, left/right)
│   │   └── Mystical particles (Sparkles)
│   ├── Floating Island Platform
│   │   ├── Main platform (RoundedBox 4×1×4)
│   │   ├── Floating animation (useFrame)
│   │   ├── Island label text (bold, large)
│   │   ├── Description text (color-coded)
│   │   ├── Large emoji icon (visual identity)
│   │   ├── Island sparkles (20 per island)
│   │   └── Uplighting (pointLight beneath)
│   ├── Magical Decorations
│   │   ├── 4 Crystals underneath (cone geometry)
│   │   └── 6 Floating orbs (spheres in circle)
│   └── Selection Indicator
│       ├── Green ring (Torus)
│       └── "SELECTED" text
│
└── Main Zone
    ├── Zone title (floating text with animation)
    ├── Subtitle instructions
    ├── 4 FloatingIsland instances
    ├── Mystical fog
    ├── Lighting rig
    │   ├── Ambient light (purple tint)
    │   ├── Directional key light
    │   └── 2 Rim lights (purple/pink)
    └── Atmospheric particles (50 sparkles)
```

---

## Usage

```jsx
import Zone2_PlayStyle from './Zones/Zone2_PlayStyle';

<Zone2_PlayStyle
    onComplete={(selectedStyleId) => {
        console.log('User selected:', selectedStyleId);
        // Progress to next zone
    }}
/>
```

### Callback Data

The `onComplete` callback receives the selected play style ID:
- `'competitive'` - Competitive Champion
- `'team'` - Team Player
- `'story'` - Story Immersion
- `'fun'` - Just Here for Fun

---

## Technical Details

### Dependencies Used

```javascript
import { useFrame } from '@react-three/fiber';
import {
    Text, Float, Sparkles, RoundedBox,
    Sphere, Torus
} from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import * as THREE from 'three';
```

### Animation Implementation

**Floating Bob Animation:**
```javascript
useFrame((state) => {
    if (islandRef.current) {
        // Gentle bobbing motion
        islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;

        // Slight rotation for magical feel
        islandRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
});
```

### Physics Configuration

**Ramp Trigger Zone:**
```javascript
const [rampTrigger] = useCylinder(() => ({
    isTrigger: true,
    position: [position[0], 0, position[2]],
    args: [2, 2, 6, 16],
    onCollide: (e) => {
        if (e.body.name === 'chassis' && !selected) {
            setHovered(true);
            onSelect();
        }
    }
}));
```

### Performance Considerations

1. **Optimizations Applied:**
   - Sparkles per island: 20 (moderate count)
   - Atmospheric sparkles: 50 (spread across large area)
   - Crystals per island: 4 (optimized from potential 8+)
   - Orbs per island: 6 (balanced visual impact)
   - Shadow map: 1024×1024 (single directional light)
   - No spotlight shadows (major GPU savings)

2. **Geometry Reuse:**
   - RoundedBox geometries shared across islands
   - Cone geometry for crystals
   - Sphere geometry for orbs
   - Torus for selection rings

3. **Material Efficiency:**
   - Standard PBR materials (not physical)
   - Basic materials for glow elements
   - Selective transparency where needed

### State Management

```javascript
const [selectedStyle, setSelectedStyle] = useState(null);
const [transitioning, setTransitioning] = useState(false);
```

- `selectedStyle`: Tracks which island was selected (null initially)
- `transitioning`: Controls transition UI visibility

---

## Integration with ZoneManager

Zone2 is integrated into `ZoneManager.jsx`:

```javascript
const handleZone2Complete = (selectedStyle) => {
    console.log("Zone 2 complete! Play style:", selectedStyle);
    setSurveyData(prev => ({ ...prev, playStyle: selectedStyle }));
    setCurrentZone(3);
};

<Zone2_PlayStyle onComplete={handleZone2Complete} />
```

**Zone Positioning:**
- Zone 0 (Intro): z=0 to z=-20
- Zone 1 (Source Tracking): z=-50
- **Zone 2 (Play Style): z=-80** ← Current zone
- Zone 3+ (Future): z=-110 and beyond

---

## Design Philosophy

### Why Floating Islands?

1. **Visual Distinctiveness:** Dramatically different from Zone 1's portal-based approach
2. **Physical Interaction:** Driving up ramps creates engaging gameplay
3. **Fantasy Theme:** Magical aesthetic matches the "personality" nature of the question
4. **Vertical Space:** Utilizes 3D space effectively with elevated platforms
5. **Clear Choices:** 4 distinct islands with obvious visual identity

### Color Psychology

- **Orange/Gold (Competitive):** Energy, victory, achievement
- **Cyan (Team):** Trust, collaboration, communication
- **Purple/Pink (Story):** Mystery, creativity, imagination
- **Yellow/Pink (Fun):** Joy, playfulness, lightheartedness

### Inspiration Sources

- Floating island gameplay from fantasy games (Skyrim, Zelda: BotW)
- Magical aesthetics from fantasy RPGs
- Bruno Simon's portfolio: premium quality, smooth animations
- AAA game design: clear visual feedback, satisfying interactions

---

## Future Enhancements

### Potential Improvements:
1. Add more complex 3D objects per island theme (trophies, hands, books, balloons)
2. Implement particle burst effect on selection
3. Add sound effects (mystical ambience, selection chime)
4. Create custom shaders for energy fields around islands
5. Add bridge animations that extend from ground to ramp
6. Implement weather effects per island (rain for team, sparkles for fun)
7. Add floating name plates that face camera
8. Create themed music per island

---

## Testing Checklist

- [ ] All 4 islands are visible and properly positioned
- [ ] Islands float and bob smoothly
- [ ] Ramps are clearly visible and accessible
- [ ] Driving up ramp triggers hover effect
- [ ] Physics trigger detects vehicle correctly
- [ ] Only one island can be selected
- [ ] Selection visual feedback works (green ring, text)
- [ ] Transition message appears after selection
- [ ] onComplete callback fires with correct style ID
- [ ] Performance maintains 60 FPS
- [ ] Crystals float smoothly beneath islands
- [ ] Magical orbs orbit correctly
- [ ] Fog creates proper atmosphere
- [ ] Text is readable and well-positioned

---

## Credits

**Design Approach:** Fantasy/Magical floating island gameplay
**Inspiration:** Bruno Simon's Portfolio (premium quality standards)
**Physics Engine:** Cannon.js (via @react-three/cannon)
**3D Library:** Three.js (via @react-three/fiber)
**Helper Components:** drei (@react-three/drei)

---

**Status:** ✅ Complete and integrated
**Last Updated:** December 17, 2025
