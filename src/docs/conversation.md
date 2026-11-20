Invitation.jsx get contax of this component and its child component so later you can make changes i want and main focus on intocurtain okay 

Got the full picture. Here's the context summary of Invitation.jsx and its main focus — CurtainIntro:

Invitation.jsx — Component Tree
Invitation({ config, skipCurtain })
├── SiteContext.Provider  (wraps everything with config data)
├── CurtainIntro          ← MAIN FOCUS (shown when !opened)
├── FlowerRain            (active after curtain opens)
├── InvitationHero        (active after curtain opens)
├── CountdownSection
├── EventsSection
└── VenueSection

State logic: opened (bool) — starts false (unless skipCurtain=true). Body scroll is locked while curtain is visible. Once user clicks the logo seal → opened = true → curtain hides, rest of invitation reveals.

CurtainIntro.jsx — Full Breakdown

File: CurtainIntro.jsx

Props
Prop	Default	Purpose
onOpen	—	Called after panels slide away
logoSrc	/images/logo.png	Center seal image
textureSrc	/images/mandala-texture.jpg	Panel background texture
Internal State & Logic
opening (bool) — set to true when user clicks the seal button
prefersReducedMotion — disables animations if user prefers
OPEN_DURATION = 1800ms — how long panels take to slide apart
After opening=true, waits OPEN_DURATION then calls onOpen() (via a ref to avoid stale closure)
Visual Structure
<div fixed fullscreen z-9999>
  ├── <style>  — keyframes: cv-pulse (seal glow) + cv-drift (petals float)
  ├── <CurtainPanel side="left" />   ← slides left on open
  ├── <CurtainPanel side="right" />  ← slides right on open
  ├── Gold seam line (center, fades on open)
  ├── PETALS × 6  (floating petal spans, fade on open)
  └── Center Logo Seal
        └── <button onClick → setOpening(true)>
              └── <span> gold radial-gradient circle, pulsing
                    └── <img src={logoSrc} />
CurtainPanel (internal sub-component)
Each panel is w-1/2, positioned left or right
On opening: slides out via translateX(-100%) / translateX(100%)
Has two layers:
Texture div — 100vw wide, offset by -25vw so texture appears centered across both halves
Shimmer overlay — subtle diagonal white gradient
Colors (constants)
Name	Value
GREEN	#0b2e1f
GOLD	#d4af37
GOLD_LIGHT	#f5e6a8
ROSE	#c95b6b

Ready! Tell me what changes you want to make to the CurtainIntro (or any other part) and I'll apply them.

now this is my website current curtain look like and what i want is this the 2nd image so i have added the image which need to use okay i  have uplooaded the my current status and then goal image and the asset image you need to use and create also in the goal image there is a text in beween no need of that text and just use my logo okay now proced it

Done! Here's what was changed:

✅ Changes Applied

Images replaced (in public/images/):

mandala-texture.jpg → your new gold & green detailed mandala image
logo.png → your MV monogram (Mihir & Vaishali gold seal)

CurtainIntro.jsx updated:

What	Before	After
Texture	Old dull mandala	Your rich gold-on-green mandala, now fills both halves seamlessly (each panel renders the full-width texture, offset correctly so left/right half shows the matching side)
Logo seal	Small 112px plain circle	Larger 136px MV monogram, object-cover fills the whole circle
Gold seam	1px simple line	2px glowing gold line with box-shadow glow
Seal ring	Single pulse glow	Ripple rings that expand outward + gold border ring around seal
Petals	6 floating rose/gold blobs	Removed (clean look matching your goal)
Vignette	White shimmer	Dark edge vignette (left fades dark on left edge, right on right edge) — matches the depth in your goal image

Check it in your browser — the curtain should now look like the goal image with the MV logo as the clickable seal!

1st image what you build this has only 1 design in center and check 2nd image the goal image that has 2 design side by side also i think it has some bg coloe on top of it this is the green varient is used #002011 check this out

I can see it clearly now:

Current: One mandala spanning the full width (texture offset trick)
Goal: Each panel has its own centered mandala, plus a #002011 dark green overlay on top to mute/darken the texture

Let me fix the CurtainPanel so each half has its own centered texture + overlay:

Done! Here's exactly what changed:

✅ Fix Applied
Issue	Before	After
Mandala layout	One texture spanning 100vw, offset so center is shared — single big mandala	Each panel has width: 100% with background-position: center — two independent centered mandalas
Dark overlay	None	rgba(0, 32, 17, 0.55) layer on top — matches the #002011 dark green tint in your goal
Panel base color	None (transparent)	backgroundColor: #002011 as the base so texture bleeds into that color

Now each panel shows its own mandala centered within that half, with the dark green overlay muting the gold just like in your reference image. The gold seam + MV logo seal sit on top of both.

1st image what you build and it wont has a stright line in 2nd image in goal check and add it 

I can see the issue — the gold seam line is hidden behind the panels (panels are z-5, but the line has no explicit z-index set so it falls behind them). I need to push it above the panels.

Fixed! The key change:

Problem	Before	After
Z-index	No z-index on the line → fell behind the panels (z-5)	zIndex: 15 → now sits above both panels (z-5) and below the logo seal (z-20)
Gradient coverage	Started fading in at 20% from each end	Starts at 8% from top — almost full top-to-bottom solid gold line
Glow	0.45 opacity glow	Slightly stronger 0.6 glow

The vertical gold dividing line should now be clearly visible from top to bottom, just like in the goal image.

now i want color theme for my invite website so what i was thinking is red, white, golden  color theme so i am thinking of red background and white an golden text so before making change check the all section and decide where to put which color right and ten tell me and after my aproval then make chages

Let me read all the section components first before proposing anything.

Now I have a full picture of every section. Here's my color theme proposal — please review and approve before I make any changes:

🎨 Proposed Color Theme: Red · White · Gold

Palette:

Deep Red #8B0000 / #A50000 → backgrounds
White #FFFFFF → cards, panels, body text on dark
Gold #D4AF37 / #F5E6A8 → headings, accents, borders, dividers
Section-by-Section Plan
Section	Background	Headings	Body Text	Accents / Details
CurtainIntro	Keep green (it's a separate opening act, not part of main theme)	—	—	Keep gold seam & MV seal
InvitationHero	Deep red gradient #8B0000 → #A50000	Groom/Bride names → Gold #D4AF37	"weds" label, invite text → White	❤️ button → Gold border on red bg
CountdownSection	Deep red #8B0000 solid or subtle texture	Title → Gold	Subtitle → White/80%	Timer boxes → White card, number in Gold, label in white
EventsSection	White section wrapper	Event title → Gold (over dark overlay)	Description, DATE/TIME/VENUE labels → White	No change needed (photo cards with dark overlay already work)
EventCard	Photo bg (unchanged) + dark overlay	Title → Gold instead of white	Details text → White	Label tracking text → Gold tint
VenueSection	Photo bg (unchanged) + deep red overlay rgba(139,0,0,.6) instead of black	"Our Venue" title → Gold	Subtitle + address → White	Glass card → white/15 tinted red
ScratchCard	Reveal area: cream bg → deep red #8B0000	Date & day → Gold #D4AF37	—	Gold foil scratch overlay (already gold)
FlowerRain	—	—	—	Change 🌸 petal to 🌹 red rose emoji for theme match
index.css tokens	Update wine-* → true red scale	Update blush/mauve/ink → white/cream variants	—	Gold tokens stay
Key Design Decisions

NOTE

The CurtainIntro stays green — it's a dramatic "envelope" that opens to reveal the red-themed invitation inside. The contrast between the dark green curtain and the warm red interior makes the reveal feel impactful.

TIP

Timer boxes in CountdownSection will be white cards with gold numbers — this gives a clean pop against the deep red background.

IMPORTANT

The wine-* Tailwind color tokens in index.css will be updated to match the new pure red. Many components reference text-wine-500, bg-wine-500 etc. — updating the token means all references update at once cleanly.

Does this plan look right to you? Once you approve I'll make all the changes in one go.

good make it

Making all changes now across every file simultaneously!

All done! Here's a full summary of every change made:

✅ All Changes Applied
File	What Changed
index.css	wine-* tokens → true pure red scale (#a50000 as 500, #8b0000 as 600)
InvitationHero	Bg → deep red gradient #6b0000→#8b0000→#a50000 · Names → Gold #d4af37 · "weds" / invite text → white/70 & white/85 · ❤️ button → transparent with gold border
CountdownSection	Bg → deep red gradient · Title → Gold · Subtitle → white/75 · Timer labels → bold uppercase dark red
EventsSection	Wrapper bg → warm #fff5f5 tint (soft blush instead of pure white)
EventCard	Dark overlay → red-tinted rgba(80,0,0) · Event title → warm gold #f5e6a8 · DATE/TIME/VENUE labels → gold tint · Description → white/90
VenueSection	Overlay → deep red rgba(100,0,0,.65) · Title → Gold · Subtitle/address → white/80-85 · Glass card → gold border accent
ScratchCard	Reveal bg → deep red #8b0000 · Date → Gold #d4af37 · Day → soft gold #f5e6a8
FlowerRain	Falling petals 🌸 → 🌹 red roses
comment this FlowerRain for now 

Done! FlowerRain is commented out in Invitation.jsx. Uncomment it anytime you want it back.

the red background applied only to the countdown section what about the card section ? all the card has white background why ? 

The EventsSection wrapper still has bg-[#fff5f5] — that white/blush shows around and between the cards. Let me fix it to deep red.

Done! The EventsSection wrapper is now #6b0000 (deep red), so the padding areas and gaps between event cards will show red instead of white. The cards themselves keep their photo backgrounds with the red-tinted dark overlay.

EventCard.jsx#L24-31  in this event section i have added this image but this is i have vertical image but section is horizontal how can i feet this image propprly sho my full image shows i think fit the image verticaly and background is white so it wont look like that right ?

I can see the problem clearly — a portrait image forced into a landscape card with object-cover crops most of the image, and the light cream background of the Ganesh image bleeds through.

Best fix: split card layout — image on the left (full height, object-contain on a deep red bg), event details panel on the right. This shows the full vertical image beautifully.

Done! Here's what changed:

✅ New EventCard Layout
┌─────────────────────────────────────────────┐
│  🖼️ Image panel (42%)  │  📋 Content (58%)  │
│  bg: #3a0000 (dark red)│  bg: red gradient  │
│  object-contain        │  Gold title        │
│  → full portrait shows │  White text        │
│  Soft fade toward text │  Gold dividers ✦   │
└─────────────────────────────────────────────┘
Fix	Detail
Image	object-contain on #3a0000 dark red bg → full portrait image visible, nothing cropped
Layout	Split: image left 42% + content right 58% (alternates sides for multiple events)
Background	Content panel → deep red gradient, no more white
Styling	Gold decorative ✦ dividers above/below details, gold labels, white values
Mobile	Stacks vertically — image on top, content below
this look good now move th venu section same as this event section left side title and place and right side map section

Done! The VenueSection now matches the EventCard split layout:

┌──────────────────────────────────────────────────┐
│   📋 Left panel (45%)    │   🗺️ Right panel (55%) │
│   Red gradient bg        │   Full map iframe      │
│   ✦ gold divider         │   fills entire height  │
│   Subtitle (gold label)  │                        │
│   Title (gold script)    │                        │
│   ◆ divider              │                        │
│   Venue name (white)     │                        │
│   Address (white/80)     │                        │
│   ✦ gold divider         │                        │
└──────────────────────────────────────────────────┘
Left → gold dividers, script title in #f5e6a8, venue name & address in white — same style as EventCard content panel
Right → map iframe fills the full height with no padding/border
Mobile → stacks vertically, details on top, map below
if i want to change the font then where should i need to look the font and then design the name i gave you and you can easily add to my site give me website name where i can see the diffrent font styles and family ? dont change any thing now just give me answers
🔤 Where to Browse & Pick Fonts
Best Website: Google Fonts

👉 fonts.google.com

This is the best choice because:

Free to use
Your project already uses Google Fonts (Poppins, Great Vibes, Tangerine are all from there)
Adding a new font is just one line of code — I can do it instantly once you pick one
How to Browse Smartly on Google Fonts
Go to fonts.google.com
In the search bar, type any font name to preview it
Use Categories filter on the left:
Serif → classic, elegant (good for formal wedding names)
Script → handwritten/cursive (great for couple names)
Display → decorative, fancy headings
Click "Type something" at the top → type your name "Mihir & Vaishali" to preview it in that font live
Fonts Already in Your Site
Token	Font	Used for
font-body	Poppins	All body/paragraph text
font-script	Great Vibes	Section headings (cursive style)
font-display	Tangerine	Couple names in Hero section
Other Good Font Browsing Sites
Site	Best for
fonts.google.com
	⭐ Main recommendation — free & easy to add
dafont.com
	Decorative/display fonts (download only)
fontsquirrel.com
	Free commercial fonts
myfonts.com
	Premium paid fonts

Once you find a font you like on Google Fonts, just tell me the name and which element (names, headings, body text) and I'll add it to your site in one shot. ✅

lets try this font - Edu NSW ACT Hand Cursive
is this possible ? then apply

Yes, it's available on Google Fonts! Let me first check where the current fonts are imported.