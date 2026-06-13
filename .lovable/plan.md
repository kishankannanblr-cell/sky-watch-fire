## Fix `/detection` crash (telemetry feed)

### Diagnosis
The `/detection` page crashes with `Cannot read properties of undefined (reading 'id')` at `src/components/YoloDetectionDemo.tsx:19`. TanStack's root `errorComponent` then renders the "Telemetry lost / This page didn't load" fallback the user is seeing.

The offending code (inside the `setInterval` in `useEffect`):

```ts
setShown((s) => [...s, BOXES[i].id]);
i++;
```

The updater function passed to `setShown` is a closure over the outer `i`. React 19 StrictMode double-invokes state updater functions in development. On the second invocation `i` has already advanced (eventually past `BOXES.length`), so `BOXES[i]` is `undefined` and `.id` throws.

### Fix (single, minimal edit)
Resolve the id to a local constant **before** calling `setShown`, so the updater no longer reads from the mutating outer `i`:

```ts
const id = BOXES[i].id;
setShown((s) => (s.includes(id) ? s : [...s, id]));
i++;
```

The `includes` guard makes the updater idempotent under StrictMode's double-invocation, preserving the visual behavior (3 boxes appearing sequentially) without duplicating entries.

### Scope
- Only `src/components/YoloDetectionDemo.tsx` is touched (lines 17–27 area, the `useEffect` that drives the bounding-box reveal).
- No content, copy, layout, styling, or other component changes.
- All other pages and components remain identical.

### Verification
After the edit, reload `/detection`, confirm the hero loads, scroll down, and confirm the YOLO HUD shows three labeled boxes animating in with no console error and no error-page fallback.
