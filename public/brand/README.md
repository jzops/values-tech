# Brand marks

`x-avatar-*.png` are 800x800 (X displays profile pictures at 400x400; 800 keeps
them crisp on retina). `x-avatar-*.svg` are the sources — edit those, re-render
the PNGs.

Four variants on one silhouette: a receipt with a rounded top and a torn bottom
edge. The tear is the only receipt cue that survives a 32px feed avatar, which
is why it carries the mark rather than the printed lines the site logo uses —
those close up and turn to mush at that size.

| file | reads as |
|---|---|
| `a-paper-bar`    | paper receipt, ink lines, one orange line |
| `b-paper-grade`  | paper receipt, ink F |
| `c-orange-bars`  | orange receipt, ink lines |
| `d-orange-grade` | orange receipt, ink F |

Colors are the site's: ink `#0A0A0C`, paper `#F7F4EF`, accent `#FF6B35`.

X crops to a circle, so everything sits inside a safe radius and the square ink
background is only ever seen as a disc. On X's dark theme the ink background
falls away against black and the receipt reads as floating — intended.
