## Goal
Make the `/detection` YOLO HUD read like a real thermal feed: the people the boxes claim to detect should actually be partially visible as heat signatures in the frame, and the overlay should surface per-target temperature and a scene/surroundings analysis panel.

## Scope
Only `/detection` and its supporting asset/component. Nothing else changes.

---

## 1. New thermal frame with visible human signatures

Replace `src/assets/detection-frame.jpg` with a regenerated thermal aerial frame (`imagegen--edit_image` on the existing file, 4:3) where:
- Three human-shaped warm blobs are partially visible through smoke at the positions the current bounding boxes target (~22%/58%, ~46%/64%, ~71%/55%).
- Each figure is only partially resolved: head + shoulders or torso bleeding into smoke — clearly heat signatures, not photographic people.
- White-hot palette, dense black smoke around them, debris silhouettes (collapsed beams, rubble) as cooler dark shapes for context.
- Keep the existing aerial / top-down framing so the current box coordinates still land on the figures.

If the regenerated positions drift, nudge the `BOXES` array in `YoloDetectionDemo.tsx` (x/y/w/h only) to re-center on the new signatures.

## 2. Per-target temperature + track metadata

In `YoloDetectionDemo.tsx`, extend the `Box` type and the three entries:

```ts
type Box = {
  id; x; y; w; h; conf; label;
  trackId: string;     // e.g. "trk_0427"
  tempC: number;       // surface temp at signature centroid, e.g. 34.8
  posture: string;     // "prone" | "crawling" | "standing"
  rangeM: number;      // slant range from drone, e.g. 18
};
```

Update the label chip from `person · 0.94` to a two-line tag:
```
person · 0.94 · trk_0427
34.8°C · prone · 18 m
```

Confidence drifts ±0.02 per tick (smoothed, not random noise) so it reads like a live tracker rather than a static value. Temperature drifts ±0.3°C.

## 3. Scene / surroundings analysis panel

Add a new HUD element — a compact glass panel pinned to the bottom-left of the frame (replacing the current "Humans detected · N" pill, which moves into it):

```
SCENE ANALYSIS
─────────────────────────
Humans detected     3
Ambient (LWIR avg)  62°C
Hot spots (>400°C)  2  ← active fire
Structural debris   detected (NW quadrant)
Smoke opacity       87%  · visibility ≪ 2 m (RGB)
Egress path         blocked — S corridor
```

Values tick on the same 900 ms interval as FPS so it feels live. Hot-spot count and ambient drift slightly. "Egress path" and "Structural debris" stay static (they're per-scene classifier outputs, not per-frame).

Top-right chrome stays (`FLIR Boson 640×512 · LWIR`) and a new line is added under it: `Palette: White-Hot · AGC on`.

## 4. Box visuals tweak

So the boxes don't completely cover the (now visible) people:
- Drop box stroke opacity to ~70% and stroke width to `0.2`.
- Add a thin crosshair at each box centroid marking the temperature-sample point.
- Keep the corner ticks.

---

## Files touched
- `src/assets/detection-frame.jpg` — regenerated via `imagegen--edit_image`.
- `src/components/YoloDetectionDemo.tsx` — extended box metadata, new scene panel, updated labels, softer box stroke.

No other components, routes, copy, or styling change. `CommanderConsole` is untouched (you can ask for the same treatment there separately).

---

## Verification
1. Load `/detection`, scroll to the HUD.
2. Confirm three partially visible heat signatures sit inside the three bounding boxes.
3. Confirm each box label shows track ID + temperature + posture + range.
4. Confirm the SCENE ANALYSIS panel renders bottom-left with the listed fields, and that FPS / confidence / temperature values tick without errors.
5. Console clean, no error fallback.
