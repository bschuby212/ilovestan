# Media — hero video

## Hero source (current)

Hero prefers a **local screen-record** (no play/pause UI ever):

```text
public/video/stan-live.mp4
public/video/stan-live-poster.jpg   # optional still frame
```

If that file is missing, hero uses a sharp Stan still (no YouTube — embeds were hitting bot walls and breaking the section under the hero). **Screen-record your clip and drop it at the path above** when you want live video.

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
