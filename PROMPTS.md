# One world. Nine scenes.

The goal is a coherent visual world, not nine unrelated beautiful images. Reuse the same medium, shapes, contrast structure, character description, and compositional rules. Only the scene and time of day change.

The bundled art was created using the built-in image generation tool. PNG originals are saved in `art-source/`; optimized WebP assets are in `public/art/`. No third-party game artwork or logos are used.

## 1. The style lock

Paste this block into every prompt, unchanged:

> Cinematic landscape background art plate for an arcade pause-menu personal portfolio. A coherent series of hand-painted 1990s California game-loading illustrations. Fine film grain, inked silhouettes, detailed editorial painterly forms, smooth atmospheric gradients. Wistful, adventurous, and premium. Ultrawide landscape composition, 16:9. The left half is simple, uncluttered dark negative space for large white website text; most objects and narrative details are on the right. Dark foreground silhouettes and consistent deep charcoal linework. No interface, text, logos, watermarks, typography, or readable lettering. Not a photograph. Not a 3D render.

For the strongest consistency, use the approved hero image as an explicit visual reference with every subsequent generation. State: “Reference image: style, grain, linework, palette relationships, and shadow density only. Create the new scene below; do not reproduce the original scene.”

Keep one approved reference throughout. Using each new scene as the next reference can compound drift.

## 2. The character lock

Keep a recurring character small and away from the text area. Repeat this exact description whenever the person appears:

> One lone adult creative, seen from behind or in a distant three-quarter silhouette, with short dark hair, a rust-red jacket, charcoal trousers, and dark shoes. Relaxed, contemplative posture. No visible facial detail. Small in the frame, placed on the far right. The character is part of the landscape, never a foreground portrait.

A written description encourages continuity but cannot guarantee identical identity across generations. If recognizable character consistency matters, create and approve a character sheet first, then supply it alongside the style reference. Keep jacket shape, hair, silhouette, proportions, and camera distance fixed. Avoid changing clothing when changing the time of day.

The vintage car, when present, is a dark 1980s-style two-door coupe with a simple boxy profile, no identifiable logo, and warm rear lights. It is always a supporting element.

## 3. The dark anchor

A bright sky often makes a model brighten everything: the ink linework disappears, shadows become pastel, and a gritty illustrated world turns into a soft travel poster. Preserve the shadow structure independently from the lighting.

Add this block to every scene, especially daylight scenes:

> Dark-anchor technique: reserve the lowest luminance values for a near-black foreground silhouette and deep charcoal linework. Keep foreground plants, furniture, architecture, and the figure dark even when the sky is bright. Light changes the atmosphere and accent colors, not the density of the ink. Maintain a clear three-plane structure: near-black foreground, muted midground, luminous distant sky. Do not lift the foreground shadows into pastel gray.

At least one tangible dark shape should touch a frame edge: a palm trunk, chair, window frame, roadside planting, or building facade. The UI overlay improves text contrast, but the source artwork should already have its own strong dark structure.

## 4. Day-cycle palette

Treat this as a curated trip through a day, rather than a strict chronological timeline. Keep accents slightly muted so they sit naturally beside the inked shadows.

| Screen | Time | Main palette | UI accent | Dark anchor |
| --- | --- | --- | --- | --- |
| Overview | Golden hour | Burnt orange, coral, tobacco, ocean blue | `#f39157` | Palms, coastal plants, coupe |
| About | Late afternoon | Sage, cream, warm honey | `#b9c79a` | Window frame, chair, plants |
| Skills | Blue hour | Cool teal, deep blue | `#80cecb` | Desk and workshop equipment |
| Projects | After sunset | Coral pink, mauve, burgundy | `#efa6ae` | Storefronts and palms |
| Experience | Twilight | Ochre, tobacco, charcoal | `#dec081` | Train platform and traveller |
| Achievements | City lights | Pale gold, olive black | `#e9d48b` | Rooftop parapet and figure |
| Services | First light | Lavender, smoky violet | `#c3acf0` | Drafting table and window |
| Contact | Night call | Dusty rose, plum, charcoal | `#eca8c0` | Telephone booth and palms |
| Outro | A new day | Peach, dusty blue, charcoal | `#f1b88e` | Roadside vegetation and coupe |

## 5. The nine scene prompts

Combine the style lock, appropriate character lock, dark-anchor block, and one scene below. These scene descriptions correspond to the bundled art. The original hero generation used the complete prompt in the next section.

### Overview — Pacific Coast

> A wide perspective from a hillside terrace across the Pacific Ocean, curving coastal highway and low Los Angeles houses, hazy distant hills on the left horizon, sun glowing near the upper middle, tall dark silhouetted palm trees on the right and far left edges. A tiny lone person in a rust-red jacket leaning on a dark vintage coupe at the far lower right, looking towards the coast. Dark silhouetted lush foreground plants at the bottom. Orange sunset, faded coral and dusty peach sky, tobacco brown, deep charcoal shadows, restrained blue ocean. Broad relatively uncluttered dark misty ocean and sky across the left half.

### About — The Home Studio

> A warm intimate hillside creative studio at late afternoon, open windows overlooking the California coast, vintage chair and shelves, small rust jacket draped over a chair, olive green plants framing the right, honey sunlight. Muted sage, cream, and charcoal.

### Skills — The Workshop

> An atmospheric electronic workshop at blue hour, analog synthesizers, glowing computer display with abstract shapes, orderly desk and tools on the right side, coastal city through a large window. Cool teal, deep blue, and charcoal.

### Projects — Downtown District

> A beautiful 1990s California city boulevard at dusk with vintage storefronts and a small parked sports coupe on the right, dramatic palms, wet pavement reflections, no readable signs. Coral pink, mauve, and dark burgundy.

### Experience — Central Station

> A cinematic elevated train platform overlooking a dense coastal city at twilight, silhouetted traveller in a rust jacket at the far right, long railway vanishing toward mountains. Ochre gold, tobacco, and dark charcoal.

### Achievements — The Rooftop

> A striking nighttime rooftop above the California skyline, warm golden light from the right and a tiny lone person in a rust jacket contemplating the city, distant fireworks very subtle. Pale golden yellow and olive black.

### Services — The Design Lab

> A moody art and architecture studio at dawn, drafting table and sculptural models on the right, giant coastal window, purple flowers and a cool dawn sky. Lavender, smoky violet, and black shadows.

### Contact — The Connection

> A nostalgic roadside telephone booth on the right along a quiet coastal highway at blue hour, pink neon illuminating the booth with no text, silhouetted palms, ocean horizon, small figure in a rust jacket. Dusty rose, plum, and charcoal.

### Outro — The Open Road

> A quiet California coastal road leading away toward the rising sun, a vintage coupe small at the far right, silhouetted palm trees and dark foreground vegetation, dawn horizon. Warm peach orange, dusty blue, and charcoal.

## 6. Original hero prompt

```text
Use case: stylized-concept. Create a cinematic ultrawide 16:9 background art plate for a sophisticated arcade pause-menu personal portfolio. A beautifully illustrated 1990s California coast at orange sunset, hand painted editorial video game loading screen art, fine grain, inked silhouettes and smooth atmospheric gradients. Wide perspective from a hillside terrace across the Pacific Ocean, curving coastal highway and low Los Angeles houses, hazy distant hills on left horizon, sun glowing near upper middle, tall dark silhouetted palm trees on RIGHT and far left edges. A tiny lone person in rust-red jacket leaning on a dark vintage coupe at the far LOWER RIGHT, looking towards the coast. Dark silhouetted lush foreground plants bottom. Mood wistful, adventurous, premium. Palette burnt orange, faded coral, dusty peach sky, tobacco brown and deep charcoal shadows, restrained blue ocean. Composition: LEFT HALF must remain broad relatively uncluttered dark misty ocean/sky for website large white typography, details mostly on right half; sunset illumination but strongly dark anchored foreground. No text, no letters, no logos, no UI, no watermarks. Detailed painterly illustration, not photograph, not 3D. Landscape 1536x1024 or wider.
```

The other eight assets used this exact wrapper around their scene descriptions:

```text
Use case: stylized-concept. Create a cinematic landscape background art plate for an arcade pause-menu personal portfolio, matching a coherent series of hand-painted 1990s California game-loading illustrations. Scene: [SCENE DESCRIPTION] Style lock: fine film grain, inked silhouettes, detailed editorial painterly forms, smooth atmospheric gradients, wistful and premium. Composition: ultrawide landscape 16:9, LEFT HALF is simple uncluttered dark negative space for large white website text, objects mostly RIGHT. Dark-anchor technique: foreground stays near-black, even with bright sky, with consistent deep charcoal linework. Do not add UI, text, logos, watermarks, typography or readable lettering. Not 3D, not photograph. Keep a hand painted cinematic illustration aesthetic.
```

## 7. Fix-it table

| Drift | Targeted correction |
| --- | --- |
| Daylight turns everything pastel | Reapply the dark anchor; explicitly preserve near-black foreground values. |
| Looks photographic | Ask for visible painted simplification, inked contours, and flatter editorial material treatment. |
| Looks like a glossy 3D game | Remove plastic specularity, ray-traced lighting, and volumetric effects; reinforce painted surfaces. |
| Text area is too busy | Keep the left 45% quiet with broad atmospheric shapes; move the main subject right. |
| Character identity changes | Reuse the character sheet and exact description; restore the original distance and back-facing pose. |
| Accents become too saturated | Specify muted pigments, dusty midtones, and restrained highlights; keep charcoal unchanged. |
| New scene feels like another artist | Return to the original approved hero reference instead of the most recent generation. |
| Artwork contains fake lettering | Ask to remove all marks resembling letters; use blank signage or abstract geometric shapes. |
| Mobile crop loses the subject | Move the right-side subject slightly inward; test the image at a tall crop before accepting it. |
| Scene gets darker everywhere | Preserve the bright distant sky; deepen only the foreground and inked structures. |

Change one variable per revision. Compare at thumbnail scale first, then behind the real UI at desktop and mobile sizes. A beautiful standalone image is only successful here if the text remains easy to read.
