# Media — live hitting video

## Hero expects live match hitting

Drop your edited clip here:

```text
public/video/stan-live.mp4
public/video/stan-live-poster.jpg   # optional still frame
```

The hero prefers **`stan-live.mp4`**. If it’s missing, it falls back to the stills montage (`stan-highlights.mp4`) so local dev still works.

## How to make the clip (your side)

I can’t download or re-host ATP / beIN / YouTube match film from here (copyright). You can build a short highlights cut yourself:

1. Open an official **ATP Tour** (or rights-holder) YouTube upload of Stan — ideally backhand winners / rally clips.
2. Note start/end times for continuous live hitting (not photo slideshows).
3. Download only if **you** have the right to use that upload (channel permission / fair editorial use / your own capture). Prefer official embeds or licensed assets when publishing.
4. Crop with ffmpeg, **keep end cards / copyright bumpers** if the source requires credit:

```bash
# Example: cut 0:42–1:18, keep source credit slate if it appears at the end of your range
ffmpeg -ss 00:00:42 -to 00:01:18 -i source.mp4 \
  -c:v libx264 -an -movflags +faststart \
  public/video/stan-live.mp4

# Poster frame
ffmpeg -ss 00:00:02 -i public/video/stan-live.mp4 -frames:v 1 \
  public/video/stan-live-poster.jpg
```

5. Put credit text in the site footer / hero caption (channel name, year, “clip used with permission / for unofficial tribute”).

## Ball scroll sequence

The soap-can-style scroll section uses a **generated tennis-ball frame scrub** (not match film). It’s a separate motion piece: scroll drives the sequence, then the ball bounces up. Live hitting stays in the hero video layer.
