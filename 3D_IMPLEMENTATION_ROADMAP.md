# 3D Implementation Roadmap
## Translating Chat Survey Master Guide to Interactive 3D Zones

**Created:** December 17, 2025
**Based on:** CHAT_SURVEY_MASTER_GUIDE.md
**Inspiration:** Bruno Simon's Portfolio (bruno-simon.com)

---

## Overview

We're transforming the Deca Games recruitment and follow-up chat surveys into a **high-quality 3D driving experience** where each question becomes an interactive zone the user drives through.

**Core Concept:** Drive through survey zones, answer questions by driving through gates/interacting with objects, feel like playing a game while actually completing a survey.

---

## Phase 1: Deca Games Recruitment Flow (Chat #1)

### Current Status
✅ Basic vehicle controls working
✅ Physics system operational
✅ Basic world with floor and decorations
⏳ Need to build survey zones

---

## Zone-by-Zone Implementation Plan

### **ZONE 0: Welcome & Intro**
**Chat Question:** Intro with Deca Bot disclosure + "Let's roll!" button

**3D Implementation:**
```
LOCATION: Starting area (0, 0, 0)
ELEMENTS:
- Large holographic "DECA BOT" character (floating, animated)
- Glowing text billboard: "Hey there, fellow gamer! 🎲"
- Secondary text: "I'm Deca Bot - your friendly neighborhood game guide."
- Disclosure: "(Yes, I'm a bot, but I promise I rolled high on charisma!)"
- Interactive gate with "LET'S ROLL! 🎯" text
- Particle effects (dice rolling animation)

INTERACTION:
- Drive through the gate to start
- Gate opens with satisfying animation
- Confetti/particle burst when passing through
- Audio: Dice rolling sound + upbeat music starts

TECHNICAL:
- BinaryQuestion component (modified for intro)
- Particle system from THREE.js
- Custom 3D text using Text component from drei
- Trigger zone using cannon.js physics
```

---

### **ZONE 1: Source Tracking**
**Chat Question:** "How'd you find us?" (5 options)

**3D Implementation:**
```
LOCATION: z = -30
ELEMENTS:
- 5 different themed entrance portals arranged in a row
- Each portal has icon + label:
  📱 Social Media Portal (glowing blue)
  📦 QR Code Portal (cardboard box theme)
  🎪 Convention Portal (tent/booth theme)
  🔗 Friend Link Portal (chain link design)
  🤷 Can't Remember Portal (question mark design)

INTERACTION:
- Drive through chosen portal
- Selected portal glows bright, others fade
- Portal teleports you to a transitional "tunnel" effect
- Acknowledgment message appears: "Awesome!"

VISUAL STYLE:
- Bruno Simon inspired: Each portal is a physical 3D structure
- Neon glow effects on edges
- Hover/proximity effect when car approaches
- Smooth transition animation

TECHNICAL:
- MultiPortal component (new)
- Each portal is a collision trigger
- Track selection in game state
- Smooth camera transition through portal
```

---

### **ZONE 1B: Which Deca Game? (Conditional)**
**Chat Question:** "Which game did you pick up?" (if QR code)

**3D Implementation:**
```
LOCATION: z = -45 (only appears if QR code portal chosen)
ELEMENTS:
- 3 pedestals displaying 3D game boxes:
  🚢 Shipping Empire (nautical theme)
  🧚 Rivals in Fairyland (magical theme)
  🚀 Mission to Mars (space theme)
- Each box rotates slowly on pedestal
- Glowing spotlights from above

INTERACTION:
- Drive close to chosen game box
- Box enlarges and glows
- Confetti burst in game's theme colors
- Message: "Ooh, great choice! 🎁"

VISUAL STYLE:
- Museum exhibit aesthetic
- High-quality game box 3D models
- Dramatic lighting (spot + rim)
- Metallic pedestals

TECHNICAL:
- ProductShowcase component
- Proximity detection (distance calculation)
- Animation using useFrame
- Conditional rendering based on previous answer
```

---

### **ZONE 2: Play Style**
**Chat Question:** "When you sit down to play, are you..." (4 personality types)

**3D Implementation:**
```
LOCATION: z = -80
ELEMENTS:
- 4 character statues/avatars in a plaza:
  🏆 Competitive Champion (trophy, flames)
  🤝 Team Player (holding hands icons)
  🎭 Story Immersion (book, theater masks)
  😂 Fun Vibes (party hat, balloons)
- Each has animated idle pose
- Themed environmental effects around each

INTERACTION:
- Drive up to chosen character
- Character "comes alive" with animation
- Character gives acknowledgment gesture
- Your car temporarily gets themed effect (aura/trail)

VISUAL STYLE:
- RPG character select screen vibe
- Dramatic pedestals with name plates
- Particle effects matching personality
- Cinematic lighting per character

TECHNICAL:
- CharacterSelection component
- Animated 3D models (GLB/GLTF)
- Particle systems per type
- State tracking for personality chosen
```

---

### **ZONE 3: Play Frequency**
**Chat Question:** "How often does game night happen?" (5 options)

**3D Implementation:**
```
LOCATION: z = -120
ELEMENTS:
- Giant dial/gauge structure (speedometer style)
- 5 sections on dial:
  "Multiple times a week" (red zone, hardcore)
  "About once a week" (yellow)
  "A few times a month" (green)
  "Once a month or less" (blue)
  "Not as much as I'd like 😅" (grey)
- Physical pointer/needle

INTERACTION:
- Drive around the dial (circular track)
- Stop at chosen frequency section
- Needle swings to point at your position
- Section lights up and pulses
- Message: "Love it! 🎉"

VISUAL STYLE:
- Giant retro arcade aesthetic
- Neon tubing outlining sections
- Animated numbers/labels
- Glowing needle pointer

TECHNICAL:
- CircularSelection component
- Angle-based detection
- Smooth needle animation (lerp)
- Custom shader for glow effects
```

---

### **ZONE 4: Play Partners**
**Chat Question:** "Who's usually at the table?" (Multi-select: 6 options)

**3D Implementation:**
```
LOCATION: z = -160
ELEMENTS:
- 6 glowing gates in a branching path:
  👨‍👩‍👧‍👦 Family Gate
  👯 Friends Gate
  🎲 Gaming Group Gate
  💑 Partner Gate
  🌐 Online Players Gate
  🐺 Solo Gaming Gate
- Can drive through MULTIPLE gates
- Each gate tracks separately

INTERACTION:
- Drive through as many gates as apply
- Each gate you pass: Glows green ✓
- Gates not chosen stay white/neutral
- Continue to next zone when satisfied
- Message after passing through: "Got it! 👍"

VISUAL STYLE:
- Portal series inspired
- Each gate has icon floating above
- Selection confirmation particles
- Multiple correct paths (no wrong answer)

TECHNICAL:
- MultiSelectGates component (new)
- Track array of selections
- Independent collision detection per gate
- Visual feedback per gate state
```

---

### **ZONE 5: Games Owned**
**Chat Question:** "Which Deca games do you own?" (Media gallery with images)

**3D Implementation:**
```
LOCATION: z = -200
ELEMENTS:
- Trophy shelf / game collection room
- 3 large display cases, each with:
  - 3D model of game box
  - Holographic showcase
  - "Select" button underneath
- 4th case: "None yet - but I'm curious!"
- Each case lights up on approach

INTERACTION:
- Drive between cases
- Honk horn (Space key) to select/deselect
- Selected cases: Glow gold, checkmark appears
- Can select multiple
- Exit gate appears after at least one selection

VISUAL STYLE:
- Museum/gallery aesthetic
- Glass display cases
- Dramatic spotlighting
- Reflective floor
- High-quality game box models

TECHNICAL:
- TrophyShelf component (new)
- ProximitySelect interaction pattern
- Track multiple selections
- 3D models loaded from GLB files
- Conditional exit gate rendering
```

---

### **ZONE 5B: Expansions (Conditional)**
**Chat Question:** "Got any expansions too?" (Multi-select)

**3D Implementation:**
```
LOCATION: z = -220 (only if owns Deca game)
ELEMENTS:
- Smaller pedestals next to owned game(s)
- Expansion pack boxes (smaller scale)
- "Yes" / "Not yet" gates

INTERACTION:
- Drive through relevant expansion selections
- Same multi-select pattern as Zone 4

VISUAL STYLE:
- Extension of Trophy Shelf aesthetic
- Smaller but still detailed models
- Connected to parent game visually

TECHNICAL:
- Conditional rendering based on Zone 5 answers
- Dynamic positioning based on which games owned
```

---

### **ZONE 6: Location**
**Chat Question:** "Where in the world are you?" (6 regions)

**3D Implementation:**
```
LOCATION: z = -260
ELEMENTS:
- Giant 3D globe (rotating slowly)
- 6 glowing marker pins on continents:
  🇺🇸 USA
  🇨🇦 Canada
  🇬🇧 UK
  🇪🇺 Europe
  🌏 Asia Pacific
  🌎 Somewhere else
- Floating platforms/ramps leading to each region

INTERACTION:
- Drive up ramp to chosen region marker
- Globe rotates to highlight that region
- Pin pulses and enlarges
- Region name appears in large text
- Message: "Quick geography check! 🗺️"

VISUAL STYLE:
- "World Map" video game aesthetic
- Stylized continents (not photo-realistic)
- Glowing latitude/longitude lines
- Starfield background

TECHNICAL:
- InteractiveGlobe component
- Sphere geometry with custom texture
- Proximity detection per region
- Smooth rotation animation
- Text labels using HTML overlay
```

---

### **ZONE 7 & 8: Demographics**
**Chat Questions:** Age + Household (Quick questions)

**3D Implementation:**
```
LOCATION: z = -300
ELEMENTS:
- Sleek modern "Data Terminal" booth
- Floating holographic interface
- Message: "Almost done! Quick details..."
- Button options float in 3D space

For Age (Q7):
- 6 age bracket buttons hovering
- Clean, minimal design

For Household (Q8):
- Multi-select floating buttons
- Can drive through multiple

INTERACTION:
- Drive close to terminal
- Auto-slow zone (reduce speed)
- Select options by proximity + honk
- Each selection: Button glows, checkmark
- Auto-continue after selections

VISUAL STYLE:
- Sci-fi terminal aesthetic
- Tron-like minimal interface
- Blue/cyan accent colors
- Clean, not cluttered

TECHNICAL:
- FormTerminal component
- Slower speed zone (modify vehicle physics)
- Proximity-based button interaction
- Clean UI with drei's Html component
```

---

### **ZONE 9: Subscription Flow**
**Chat Question:** Invite to join community + benefits

**3D Implementation:**
```
LOCATION: z = -350
ELEMENTS:
- Two massive gates side-by-side:
  - LEFT: "COUNT ME IN! 🙌" (VIP gate, glowing gold)
  - RIGHT: "Maybe later" (neutral gate, grey)

- Above VIP gate, floating text showing benefits:
  🎁 Exclusive sneak peeks
  🏆 Win $100 Amazon gift cards
  🃏 Special edition card packs
  📣 Voice heard by designers

- Confetti cannons on VIP gate
- Red carpet leading to VIP gate

INTERACTION:
- Drive through chosen gate
- VIP gate: Massive celebration (confetti, fireworks particles, music crescendo)
- Maybe later gate: Simple acknowledgment
- If VIP chosen → Continue to email collection
- If Maybe later → Skip to final celebration

VISUAL STYLE:
- Grand finale aesthetic
- VIP gate: Gold, luxurious, inviting
- Dramatic scale difference
- Celebration bigger than any previous zone

TECHNICAL:
- BinaryChoice component (enhanced)
- Massive particle systems
- Audio triggers
- Conditional branching in world flow
```

---

### **ZONE 10: Email Collection (Conditional)**
**Chat Question:** Email input for gift card entry

**3D Implementation:**
```
LOCATION: z = -380 (only if subscribed)
ELEMENTS:
- Golden kiosk/terminal
- Holographic keyboard appears
- Message: "Drop your email - automatically entered to win $100! 🎉"
- Email input field (HTML overlay)

INTERACTION:
- Car stops at kiosk (physics slow zone)
- HTML input overlay appears
- Type email with keyboard
- Submit button
- Confirmation: "Perfect!" with particle burst

VISUAL STYLE:
- Luxurious gold theme
- Clean, premium feel
- Gift card visual in background
- Celebration particles

TECHNICAL:
- InputTerminal component
- HTML overlay for actual text input
- Form validation
- State management for email
- Resume driving after submission
```

---

### **ZONE 11: Final Celebration**
**Chat Question:** Closing message

**3D Implementation:**
```
LOCATION: z = -420
ELEMENTS:
- Finish line arch
- Giant "WELCOME TO THE PARTY! 🎊" text
- Deca Bot hologram waving
- Fireworks, confetti, celebration
- Trophy podium with your car
- Final message: "May your dice roll ever in your favor! 🎲✨"

INTERACTION:
- Drive through finish line
- Car automatically positioned on podium
- Camera pans around for cinematic shot
- Stats screen appears (questions answered, time taken)
- "THANKS! 👋" button to restart or exit

VISUAL STYLE:
- Racing game victory screen
- Maximum celebration
- Confetti everywhere
- Upbeat victory music
- Cinematic camera angles

TECHNICAL:
- FinishLine component
- Automatic camera animation
- Particle systems at max
- UI overlay for stats
- Reset/restart functionality
```

---

## Phase 2: Chat #2 Follow-Up Flow

After Phase 1 is complete and polished, implement Chat #2 zones:

- Gaming Mood → Mood Lighting Selection Zone
- Recent Play → Calendar/Timeline Wall
- Play Context → Environment Selection
- Session Length → Time Dial
- Game Collection → Interactive Library
- Favorite Game → Spotlight Pedestal
- Video Request → Recording Studio Booth
- Future Interests → Crystal Ball Theater

---

## Technical Architecture

### Component Structure
```
src/components/Survey/
├── Zones/
│   ├── Zone0_Intro.jsx (Welcome)
│   ├── Zone1_SourceTracking.jsx (Portals)
│   ├── Zone1b_WhichGame.jsx (Conditional)
│   ├── Zone2_PlayStyle.jsx (Characters)
│   ├── Zone3_Frequency.jsx (Dial)
│   ├── Zone4_PlayPartners.jsx (Multi-gates)
│   ├── Zone5_GamesOwned.jsx (Trophy Shelf)
│   ├── Zone5b_Expansions.jsx (Conditional)
│   ├── Zone6_Location.jsx (Globe)
│   ├── Zone7_Age.jsx (Terminal)
│   ├── Zone8_Household.jsx (Terminal)
│   ├── Zone9_Subscription.jsx (VIP Gates)
│   ├── Zone10_Email.jsx (Conditional input)
│   └── Zone11_Finale.jsx (Celebration)
├── Interactions/
│   ├── ProximityTrigger.jsx
│   ├── GateInteraction.jsx
│   ├── MultiSelectGate.jsx
│   ├── DialSelector.jsx
│   └── InputTerminal.jsx
└── ZoneManager_DecaRecruitment.jsx (Orchestrates all zones)
```

### State Management
```javascript
// Use Zustand for survey state
const useSurveyStore = create((set) => ({
  answers: {
    source: null,
    whichGame: null,
    playStyle: null,
    frequency: null,
    playPartners: [],
    gamesOwned: [],
    expansions: [],
    location: null,
    age: null,
    household: [],
    subscribed: false,
    email: null
  },
  setAnswer: (key, value) => set((state) => ({
    answers: { ...state.answers, [key]: value }
  })),
  resetSurvey: () => set({ answers: {} })
}));
```

### Visual Quality Standards (Bruno Simon Inspired)

1. **Lighting:**
   - Dynamic lights that react to interactions
   - Rim lighting on important objects
   - Atmospheric fog for depth
   - Spotlights for focus

2. **Materials:**
   - Metallic/rough PBR materials
   - Emissive glows on interactive elements
   - Glass/transparency for premium feel
   - Consistent color palette (Deca brand colors)

3. **Animation:**
   - Smooth transitions (use lerp)
   - Particle effects for feedback
   - Camera movements for dramatic moments
   - Idle animations on objects

4. **Audio:**
   - Confirmation sounds for selections
   - Ambient background music
   - Celebration sounds
   - Engine sounds match environment

5. **Performance:**
   - Level of Detail (LOD) for complex models
   - Efficient particle systems
   - Texture optimization
   - Physics optimization

---

## Implementation Priority

### Week 1: Core Foundation
- ✅ Vehicle controls working
- ⏳ Zone 0: Intro/Welcome
- ⏳ Zone 1: Source Tracking (Portals)
- ⏳ State management setup

### Week 2: Core Survey Zones
- Zone 2: Play Style
- Zone 3: Frequency
- Zone 4: Play Partners
- Zone 5: Games Owned

### Week 3: Demographics & Finale
- Zones 7-8: Demographics
- Zone 9: Subscription
- Zone 11: Final Celebration
- Polish all transitions

### Week 4: Polish & Testing
- Visual quality pass
- Audio implementation
- Performance optimization
- Full flow testing

---

## Success Metrics

**Technical:**
- 60 FPS on desktop
- 30+ FPS on mobile
- No physics glitches
- Smooth transitions

**Experience:**
- Survey completion < 10 minutes
- All zones feel distinct
- Interactions are intuitive
- Celebration moments feel rewarding

**Alignment with Chat Survey Principles:**
- ✅ Conversational (via NPC-style guidance)
- ✅ Engaging first (no demographics upfront)
- ✅ Visual & multimedia-rich
- ✅ Brand personality (Deca's gaming theme)
- ✅ Acknowledgment & feedback
- ✅ Fun experience (gamified)

---

**Document Version:** 1.0
**Last Updated:** December 17, 2025
**Next Action:** Begin implementation of Zone 0 (Intro)
