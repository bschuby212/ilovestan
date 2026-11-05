# Media — hero video

## Hero source (current)

Hero uses a muted YouTube embed of Stan highlights:

- Video: https://youtu.be/1FD_QiQxrE4
- Embed: `youtube-nocookie.com` with controls off, modest branding, loop, muted autoplay
- UI hiding: oversized iframe cropped inside the hero + edge gradients + `pointer-events-none`

YouTube may still flash a title/logo on load — their player always reserves some chrome. If that keeps showing through, **screen-record the clip** and drop a local file instead (cleaner, no player UI):

```text
public/video/stan-live.mp4
public/video/stan-live-poster.jpg   # optional still frame
```

Then point `Hero.tsx` back at the local `<video>` (or ask the agent to swap).

## Optional local clip (preferred long-term)

```bash
# After you screen-record / export your cut:
ffmpeg -i your-recording.mp4 \
  -c:v libx264 -an -movflags +faststart \
  public/video/stan-live.mp4

ffmpeg -ss 00:00:02 -i public/video/stan-live.mp4 -frames:v 1 \
  public/video/stan-live-poster.jpg
```

Keep source credit in the footer if the rights-holder requires it.

## Ball scroll sequence

The soap-can-style scroll section uses a **generated tennis-ball frame scrub** (not match film). Live hitting stays in the hero layer.
