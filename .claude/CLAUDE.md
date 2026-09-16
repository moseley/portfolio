# Tailwind v4 class conventions

Prefer canonical Tailwind v4 utility classes over arbitrary bracket values wherever a clean equivalent exists.

## Spacing (1 unit = 4px = 0.25rem)

Use decimal units instead of `[Xpx]` for width, height, gap, padding, margin, inset, etc.:
- `w-[34px]` → `w-8.5`
- `h-[50px]` → `h-12.5`
- `gap-x-[18px]` → `gap-x-4.5`
- `gap-y-[11px]` → `gap-y-2.75`
- `min-h-[76px]` → `min-h-19`

## Duration

- `duration-[440ms]` → `duration-440`

## CSS variable theme tokens

Only variables registered in `@theme inline` in `globals.css` can drop the `(--)` wrapper:
- `border-(--line)` → `border-line` ✓ (`--color-line` is in @theme)
- `hover:bg-(--hover)` → `hover:bg-hover` ✓ (`--color-hover` is in @theme)

Other CSS vars (`--muted`, `--accent`, `--border`, `--text`, etc.) are NOT in `@theme`, so keep the `(--)` form:
- `text-(--muted)` ← correct, do not simplify
- `border-(--border)` ← correct, do not simplify

## Keep brackets for

- Font sizes: `text-[11.5px]`, `text-[clamp(...)]` — font-size doesn't use the spacing scale
- Letter-spacing: `tracking-[0.14em]`
- Line-height: `leading-[0.95]`
- Complex grid templates: `grid-cols-[92px_1fr]`
- Viewport units: `max-h-[90vh]`
- Inset values that don't divide cleanly by 4: `right-[215px]` → `right-53.75` (per linter)
- Easing functions: `ease-[cubic-bezier(...)]`
