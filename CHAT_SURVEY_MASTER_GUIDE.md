# Chat Survey Design Master Guide
## Deep Analysis & Framework for Rival 3D Chat World

**Created:** December 17, 2025
**Sources Analyzed:**
- Create Effective Chat Surveys (Rival Technologies)
- Peachy Soda Chat Analysis (Real Implementation)
- 3 Counterintuitive Tips for Chatbot Survey Design

---

## Part 1: Core Philosophy

### The Fundamental Shift: Survey → Conversation

Traditional surveys are **interrogations**. Chat surveys are **dialogues**.

| Traditional Survey | Chat Survey |
|-------------------|-------------|
| Form-filling | Conversation |
| Formal tone | Casual tone |
| Long, exhaustive | Short, focused |
| Demographics first | Engagement first |
| Text-heavy | Visual, multimedia |
| Impersonal | Personality-driven |
| One-shot | Ongoing relationship |

**Key Insight:** People don't complete chat surveys because they have to—they complete them because they *want* to. The experience must be enjoyable.

---

## Part 2: The 9 Rules - Deep Analysis

### Rule #1: Be Conversational
**What it means:** Write like you're texting a friend, not filling out a government form.

**Evidence from Peachy Soda:**
- Opens with "Great to be here!" (not "Welcome to our survey")
- Uses "No problem at all!" when user declines video
- Closes with "That's all for now! 👋"

**Implementation Framework:**
```
BAD:  "On a scale of 1-10, how would you rate your satisfaction?"
GOOD: "So... how'd we do? 😊"

BAD:  "Please select your age range from the following options:"
GOOD: "Quick one - how old are you?"
```

**Why it works:** 70% of chats are completed on mobile—the same device people use to text friends. The interface should match the expectation.

---

### Rule #2: Brand Personality + Context
**What it means:** Your chat should feel like an extension of your brand, adjusted for the situation.

**Key Variables:**
1. **Who** are your respondents? (Age, familiarity with brand)
2. **Where** are they? (Live event vs. at home)
3. **When** is this happening? (Game night vs. post-purchase)
4. **What** mood are they likely in? (Excited fan vs. frustrated customer)

**Application to Deca Games:**
- Target: Board gamers (likely 25-45, tech-savvy, community-oriented)
- Context: Post-purchase or convention booth
- Mood: Excited about new game/expansion
- Tone: Enthusiastic, gamer-speak friendly, community-building

---

### Rule #3: Start with a Bang
**What it means:** NEVER start with demographics. Lead with engagement.

**Evidence from Peachy Soda:**
- First interaction: Product video (emotional hook)
- Second interaction: "How does this make you feel?" (emoji response)
- Demographics: NOT ASKED AT ALL in this example

**The Psychology:**
- Demographics feel like a *barrier* ("prove you're worthy")
- Engaging questions feel like an *invitation* ("we value your opinion")
- Young users especially find demographic questions suspicious

**If you MUST ask demographics early:**
Explain WHY: "Just a quick one so we can make sure we're chatting with the right folks..."

---

### Rule #4: Simplify and Shorten
**What it means:** Mobile-first. Respect their time. Less is more.

**Hard Numbers:**
- 70% complete on mobile
- 54% of respondents want surveys under 10 minutes
- Response rates: 50-70% for well-designed chats
- Subscription rates: up to 80% agree to future chats

**The Peachy Soda Structure (only 5-6 interactions!):**
1. Start button → Video context
2. Emoji feeling
3. Open text (what they like)
4. NPS score
5. Reason for score
6. Video request (optional) → Close

**Rule of Thumb:** If you can't fit it in 10 questions, save it for the next chat. The relationship is ongoing.

---

### Rule #5: Chop Out Repetitions
**What it means:** Vary your phrasing. Don't ask the same question 6 times.

**Bad Example:**
- "Have you heard of Brand A?" Yes/No
- "Have you heard of Brand B?" Yes/No
- "Have you heard of Brand C?" Yes/No

**Good Example:**
- "Have you heard of Brand A?" Yes/No
- "How about Brand B?"
- "And Brand C?"

**Media Gallery Warning:** Don't do 5 image galleries in a row. Mix heavy and light questions.

---

### Rule #6: Respond and Acknowledge
**What it means:** React to their answers. Make it feel like a real conversation.

**Evidence from Peachy Soda:**
- User declines video → "No problem at all! Thanks so much for your feedback today. We really appreciate you taking the time. 😊"

**Implementation Patterns:**
```
After positive answer: "Love it! 🎉"
After negative answer: "We hear you. Thanks for being honest."
After open text: "Great insight, thanks for sharing!"
After completing section: "Awesome, just a couple more..."
```

---

### Rule #7: Timing Matters
**What it means:** Deploy when they're most likely to respond.

**Optimal Times:**
- After work: 5:30-6:00 PM
- Multi-timezone: 6 PM ET / 3 PM PT
- Live events: During breaks, intermissions, end of sessions

**For Deca Games:**
- Convention booth: Immediately after interaction
- In-box QR code: Likely evening/weekend when they're playing
- Social media: Post-engagement timing

---

### Rule #8: Smart Visuals
**What it means:** Use images/video/GIFs, but don't overdo it.

**Peachy Soda Visual Strategy:**
- ONE video at the start (context-setting)
- Emoji scale (visual, not text)
- Video upload REQUEST at end (not required)

**Technical Considerations:**
- Keep images ~20KB for speed
- Avoid animated GIFs in first few questions
- Offer "No thanks" option for video requests

---

### Rule #9: Emojis
**What it means:** Emojis transcend language, add personality, increase engagement.

**Usage Patterns:**
- Push notifications: +85% open rate with emojis
- Rating scales: 😍 😊 😐 😕 😠 instead of text
- Transitions: "Thanks! 🙏"
- Closings: "That's all for now! 👋"

**From Peachy Soda:**
- Feeling question: Emoji-only options
- Closing: 😊 and 👋

---

## Part 3: Question Type Framework

### The F-P-W Model (Fun, Profile, Work)

Every chat should balance three types of questions:

| Type | Purpose | Examples | When to Use |
|------|---------|----------|-------------|
| **Fun** | Engagement, rapport | Opinion polls, "would you rather", favorites | START of chat, transitions |
| **Profile** | Demographics, segmentation | Age, location, ownership | Middle, with explanation |
| **Work** | Business insights | Behavior, feedback, NPS | After rapport established |

**Recruitment Chat Balance:** Heavy on Fun + Profile
**Follow-up Chat Balance:** Mix of all three, heavier on Work

---

### Question Format Matrix

| Format | Best For | Cognitive Load | Engagement |
|--------|----------|----------------|------------|
| Single emoji | Sentiment, feeling | Very Low | High |
| Thumbs up/down | Binary choice | Very Low | High |
| Button select | Multiple choice | Low | Medium |
| Slider/Scale | NPS, ratings | Medium | Medium |
| Open text | Qualitative | High | Variable |
| Media gallery | Product testing | High | High |
| Video upload | Deep insight | Very High | Low volume, high value |

---

## Part 4: The Peachy Soda Blueprint

### Why Each Step Works

```
STEP 1: "Great to be here!" button
├── PURPOSE: Confirm intent, create commitment
├── PSYCHOLOGY: User actively opts in
└── ALIGNMENT: Rule #3 (Start with a Bang)

STEP 2: Product video plays
├── PURPOSE: Set context, create emotional connection
├── PSYCHOLOGY: Show, don't tell
└── ALIGNMENT: Rule #8 (Smart Visuals)

STEP 3: "How does this make you feel?" + Emoji options
├── PURPOSE: Capture immediate emotional response
├── PSYCHOLOGY: Low friction, universal language
└── ALIGNMENT: Rule #9 (Emojis), Rule #4 (Simplify)

STEP 4: "What do you like most about it?" + Open text
├── PURPOSE: Qualitative depth
├── PSYCHOLOGY: They've committed, now they'll elaborate
└── ALIGNMENT: Rule #1 (Conversational)

STEP 5: NPS question (0-10)
├── PURPOSE: Standardized metric for business
├── PSYCHOLOGY: Familiar format, easy to answer
└── ALIGNMENT: Necessary data collection

STEP 6: "What's the main reason for your score?" + Open text
├── PURPOSE: Context for the number
├── PSYCHOLOGY: Explains the "why" behind the data
└── ALIGNMENT: Rule #6 (Acknowledge) - shows you care about their reasoning

STEP 7: Video request + "No thanks" option
├── PURPOSE: High-value qualitative data
├── PSYCHOLOGY: Optional = respectful = no drop-off
└── ALIGNMENT: Rule #8 (Rich Media), Rule #1 (Conversational)

STEP 8: Warm closing with emojis
├── PURPOSE: Leave positive impression
├── PSYCHOLOGY: They'll remember how you made them feel
└── ALIGNMENT: Rule #6 (Acknowledge), Rule #9 (Emojis)
```

---

## Part 5: Critical Don'ts

### The Three Counterintuitive Rules

1. **DON'T start with demographics** - Even though it's "efficient" for quotas
2. **DON'T pretend to be human** - Disclose it's a chatbot upfront
3. **DON'T copy your online survey** - Rebuild from scratch for conversation

### Additional Don'ts

- DON'T use formal academic language
- DON'T have more than 2 media galleries in a row
- DON'T make video/audio required
- DON'T exceed 10 minutes
- DON'T forget to say "thank you"
- DON'T leave negative feedback unacknowledged

---

## Part 6: 3D World Application

### Translating Chat Principles to 3D

| Chat Element | 3D World Equivalent |
|--------------|---------------------|
| Text message | Floating text/billboard |
| Emoji buttons | Interactive objects (gates, targets) |
| Video | Drive-in screen, hologram |
| NPS scale | Bowling pins (1-10) |
| Binary choice | Fork in the road (YES/NO gates) |
| Open text | Drive-thru text input |
| Acknowledgment | Visual/audio feedback |
| Closing | Finish line, celebration |

### Engagement Principles in 3D

1. **Start with a bang** → Impressive entrance, immediate action
2. **Be conversational** → NPC-style guidance, casual billboards
3. **Smart visuals** → Environmental storytelling
4. **Emojis** → 3D emoji objects, particle effects
5. **Timing** → Pacing between zones, not overwhelming

---

# Part 7: Deca Games Chat Scripts

## Understanding Deca's Needs

**Company:** Board game publisher (3 games)
**Goals:**
1. Learn who buys/plays their games
2. Learn what other games people own
3. Get feedback
4. Test new ideas
5. Follow trends

**Audience Sources:**
- Social media followers
- QR codes in game boxes
- Convention booth visitors

---

## CHAT #1: Recruitment Chat

**Purpose:** Recruit community members from social media and in-box QR codes
**Length:** Max 10 questions
**Balance:** Heavy Fun + Profile, light Work
**Tone:** Enthusiastic gamer, community-building

---

### RECRUITMENT SCRIPT

```
[INTRO - Chatbot Disclosure]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hey there, fellow gamer! 🎲

I'm Deca Bot - your friendly neighborhood game guide. 
(Yes, I'm a bot, but I promise I rolled high on charisma!)

Ready to join the Deca community?

[BUTTON] → "Let's roll! 🎯"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q1 - FUN - Source Tracking]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Awesome! First things first - how'd you find us?

[BUTTONS]
→ 📱 Social media
→ 📦 QR code in my game box
→ 🎪 Convention booth
→ 🔗 A friend shared a link
→ 🤷 Can't remember!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q1b - CONDITIONAL - If "QR code in game box"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ooh, which game did you pick up? 🎁

[BUTTONS]
→ 🚢 Shipping Empire
→ 🧚 Rivals in Fairyland
→ 🚀 Mission to Mars
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q2 - FUN - Icebreaker]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick game night question! 🌙

When you sit down to play, are you usually trying to...

[BUTTONS]
→ 🏆 Crush your opponents (competitive!)
→ 🤝 Work together (team player!)
→ 🎭 Get lost in the story (immersive!)
→ 😂 Just have fun (vibes only!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q3 - WORK - Play Frequency]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Love it! 

So how often does game night happen for you?

[BUTTONS]
→ Multiple times a week (hardcore!)
→ About once a week
→ A few times a month
→ Once a month or less
→ Honestly, not as much as I'd like 😅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q4 - WORK - Play Partners]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
And who's usually at the table with you?

(Pick all that apply!)

[MULTI-SELECT BUTTONS]
→ 👨‍👩‍👧‍👦 Family
→ 👯 Close friends
→ 🎲 Gaming group/club
→ 💑 Partner/spouse
→ 🌐 Online players
→ 🐺 Solo gaming
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q5 - PROFILE - Deca Games Owned]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now the important stuff - which Deca games do you own? 🎮

(Select all you've got!)

[MULTI-SELECT WITH IMAGES - Media Gallery]
→ [Image: Shipping Empire box] Shipping Empire
→ [Image: Rivals in Fairyland box] Rivals in Fairyland  
→ [Image: Mission to Mars box] Mission to Mars
→ None yet - but I'm curious!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q5b - CONDITIONAL - If owns any Deca game]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Got any expansions too?

[MULTI-SELECT BUTTONS]
→ Yes - Shipping Empire expansion(s)
→ Yes - Rivals in Fairyland expansion(s)
→ Yes - Mission to Mars expansion(s)
→ Not yet!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q6 - PROFILE - Location]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick geography check! 🗺️

Where in the world are you gaming from?

[BUTTONS]
→ 🇺🇸 USA
→ 🇨🇦 Canada
→ 🇬🇧 UK
→ 🇪🇺 Europe
→ 🌏 Asia Pacific
→ 🌎 Somewhere else!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q7 - PROFILE - Age]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Almost done! Just need a couple quick details so we can 
tailor our community for you.

How old are you?

[BUTTONS]
→ Under 18
→ 18-24
→ 25-34
→ 35-44
→ 45-54
→ 55+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q8 - PROFILE - Household]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
And who's in your household?

[MULTI-SELECT BUTTONS]
→ Just me
→ Partner/Spouse
→ Kids under 12
→ Teens (13-17)
→ Adult kids (18+)
→ Roommates
→ Parents/Family
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[SUBSCRIPTION FLOW]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You're awesome! 🌟

Here's the deal: We'd love to chat with you again! 
As a member of the Deca community, you'll get:

🎁 Exclusive sneak peeks at new games
🏆 Chances to win $100 Amazon gift cards
🃏 Special edition card packs (members only!)
📣 Your voice heard by the game designers

Want in?

[BUTTON] → "Count me in! 🙌"
[BUTTON] → "Maybe later"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q9 - EMAIL COLLECTION - If subscribed]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Perfect! Drop your email and you're automatically 
entered to win a $100 Amazon gift card! 🎉

[EMAIL INPUT FIELD]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CLOSING]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Welcome to the party! 🎊

We'll be in touch soon with your first community chat.
In the meantime, may your dice roll ever in your favor! 🎲✨

Talk soon!
- Deca Bot 🤖

[BUTTON] → "Thanks! 👋"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## CHAT #2: Follow-Up Chat (1 Week After Recruitment)

**Purpose:** Deep profile building, answer "Who are our customers?"
**Length:** Max 15 questions
**Balance:** Mix of Fun, Profile, Work (heavier on Work)
**Tone:** Returning friend, genuine curiosity

---

### FOLLOW-UP SCRIPT

```
[INTRO - Re-engagement]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hey again! 👋

Remember me? Deca Bot here!

Hope you've had some epic game nights since we last chatted. 
Ready for round two?

[BUTTON] → "Let's do this! 🎯"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q1 - FUN - Warm-up]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Alright, quick warm-up!

What's your current gaming mood? 🎭

[EMOJI BUTTONS]
→ 🔥 Fired up - ready to strategize!
→ 😌 Chill - just want to hang with friends
→ 🧠 Brainy - give me a puzzle to solve
→ 🎲 Lucky - let's roll some dice!
→ 😴 Tired - but always down for games
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q2 - WORK - Recent Play - Deca Games]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
So... have you played any Deca games in the past week?

[BUTTONS]
→ Yes! 🎉
→ Not this week, but recently
→ It's been a while 😅
→ Haven't had a chance yet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q2b - CONDITIONAL - If played recently]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nice! Which one(s)?

[MULTI-SELECT]
→ 🚢 Shipping Empire
→ 🧚 Rivals in Fairyland
→ 🚀 Mission to Mars
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q3 - WORK - Play Context]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When you DO play, what's the usual setup?

[BUTTONS]
→ 🏠 At home - dedicated game night
→ 🏠 At home - spontaneous "let's play!"
→ 🏪 Local game store/cafe
→ 👥 At a friend's place
→ 🎪 Conventions/events
→ 💻 Online (Tabletop Simulator, etc.)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q4 - WORK - Session Length]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
And how long is a typical gaming session?

[BUTTONS]
→ Quick games - under an hour
→ 1-2 hours
→ 2-4 hours (the sweet spot!)
→ 4+ hours (marathon mode!)
→ All day/night (sleep is optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q5 - WORK - Other Games Owned - Media Gallery]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Let's talk about your collection! 📚

What TYPES of games fill your shelf?

[MEDIA GALLERY - Game category images]
→ [Image] Strategy/Eurogames (Catan, Wingspan)
→ [Image] Worker Placement (Agricola, Viticulture)
→ [Image] Cooperative (Pandemic, Spirit Island)
→ [Image] Party Games (Codenames, Wavelength)
→ [Image] Deck Builders (Dominion, Marvel Champions)
→ [Image] Dungeon Crawlers (Gloomhaven, Descent)
→ [Image] War Games (Twilight Imperium, Root)
→ [Image] Family Games (Ticket to Ride, Azul)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q6 - WORK - Favorite Game]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What's your #1 favorite game right now? 
(Deca games or otherwise - be honest!)

[OPEN TEXT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q7 - WORK - What Makes It Great]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ooh, good choice! 

What makes that game so great for you?

[BUTTONS]
→ The strategy depth
→ The theme/story
→ Easy to teach others
→ Perfect game length
→ The social interaction
→ Beautiful components
→ Replayability
→ Something else...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ACKNOWLEDGMENT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Great insights! This helps us understand what 
gamers like you are looking for. 🙏
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q8 - WORK - Deca Feedback - CONDITIONAL if owns Deca game]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now let's talk Deca! 

Thinking about the Deca game(s) you own, 
how would you rate your overall experience?

[EMOJI SCALE]
😍 Love it! → 😊 Really like it → 😐 It's okay → 😕 Could be better → 😞 Disappointed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q9 - WORK - Deca Improvement]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If you could change ONE thing about your Deca game(s), 
what would it be?

[OPEN TEXT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q10 - WORK - Discovery]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
How do you usually discover new games?

[MULTI-SELECT]
→ 📺 YouTube reviewers (SUSD, Dice Tower, etc.)
→ 📱 BoardGameGeek
→ 👥 Friends' recommendations
→ 🏪 Game store staff
→ 🎪 Conventions
→ 📲 Social media / TikTok
→ 🎙️ Podcasts
→ 🎁 Kickstarter
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q11 - WORK - Purchase Drivers]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When you're deciding to buy a new game, 
what matters MOST?

Rank your top 3:

[RANKING - Drag to order]
1. Price
2. Theme
3. Complexity level
4. Player count range
5. Game length
6. Reviews/ratings
7. Designer/Publisher reputation
8. Component quality
9. Solo mode availability
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q12 - VIDEO REQUEST - The Big Ask]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Okay, here's something special! 🎬

Our game designers would LOVE to hear directly from you.

Could you record a quick 30-second video telling us:
"What makes a perfect game night for you?"

Your video might even be shared with the design team! 
(With your permission, of course)

[BUTTON] → 🎥 Record video
[BUTTON] → ✍️ I'd rather type it
[BUTTON] → Skip for now
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q12b - CONDITIONAL - If "rather type"]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No problem! Tell us in words:

What makes a perfect game night for you?

[OPEN TEXT - Large]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q12c - CONDITIONAL - If recorded video]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Amazing! Thank you SO much for sharing that! 🙌

The team is going to love hearing your perspective.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Q13 - FUN - Future Engagement]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Last one! 

We're cooking up some cool stuff. 
What would you be most excited to see from Deca?

[MULTI-SELECT]
→ 🆕 Brand new game announcements
→ 📦 New expansions for existing games
→ 🎨 Behind-the-scenes design content
→ 🏆 Tournaments and competitions
→ 🎓 Strategy guides and tips
→ 🤝 Community meetups
→ 🎁 Exclusive member rewards
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CLOSING]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You're a legend! 🏆

Seriously, this kind of feedback helps us make 
better games for people like you.

Keep an eye out for our next chat - we might have 
some sneak peeks to share... 👀

Until then, roll well and may the meeples 
be ever in your favor!

🎲 Deca Bot

[BUTTON] → "Thanks! See you next time! 👋"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Part 8: Implementation Notes for 3D World

### Translating These Scripts to 3D Zones

**CHAT #1 (Recruitment) - 3D Zone Ideas:**

| Question | 3D Implementation |
|----------|-------------------|
| Source tracking | Entry portal selection (different themed entrances) |
| Play style | Character selection room |
| Frequency | Speed dial/gauge interaction |
| Who you play with | Avatar grouping zone |
| Games owned | Trophy shelf / collection room |
| Location | World map interaction |
| Demographics | Quick form booth |
| Subscription | VIP door unlock |
| Email | Terminal input |

**CHAT #2 (Follow-up) - 3D Zone Ideas:**

| Question | 3D Implementation |
|----------|-------------------|
| Gaming mood | Mood lighting selection |
| Recent play | Calendar/timeline wall |
| Game types | Library browse zone |
| Favorite game | Spotlight pedestal |
| Video request | Recording studio booth |
| Future interests | Crystal ball / preview theater |

---

## Conclusion

The key to effective chat surveys is **empathy for the respondent**. Every design decision should answer: "Would I enjoy answering this?"

The Peachy Soda example proves that you can gather NPS, qualitative feedback, and even video content in under 2 minutes while leaving users saying "that was fun!"

Apply these principles to the 3D world, and the survey becomes a game—which is exactly the point.

---

**Document Version:** 1.0
**Last Updated:** December 17, 2025
**Author:** Chat Survey Design Analysis for Rival 3D World

