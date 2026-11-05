# Media — hero video

## Hero source (current)

Hero prefers a **local screen-record** (no play/pause UI ever):

```text
public/video/stan-live.mp4
public/video/stan-live-poster.jpg   # optional still frame
```

If that file is missing, it falls back to a muted YouTube embed of https://youtu.be/1FD_QiQxrE4 with controls off + full click shield + edge masks. YouTube can still flash chrome / bot walls — **screen-record and drop the mp4 above** for a clean hero.

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
