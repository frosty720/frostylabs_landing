#!/usr/bin/env bash
set -euo pipefail
RAW=/home/dude/Frosty/recordings/raw
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRAMES="$ROOT/public/frames/hero"
REC="$ROOT/public/recordings"
# HERO_START: t=85s — workflow nodes (INPUT, INITIAL_SEARCH, ANALYZER) begin
# streaming into the chat panel here; the most visually compelling product action.
HERO_START=${HERO_START:-85}
HERO_DUR=20

mkdir -p "$FRAMES" "$REC"

# --- Hero frames: ~220 webp @ 1920w from the curated 20s window ---
rm -f "$FRAMES"/frame_*.webp
ffmpeg -y -ss "$HERO_START" -t "$HERO_DUR" -i "$RAW/chat_Workflow.mp4" \
	-vf "fps=11,scale=1920:-1" -c:v libwebp -quality 80 -an "$FRAMES/frame_%04d.webp"
COUNT=$(ls "$FRAMES"/frame_*.webp | wc -l | tr -d ' ')
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$FRAMES/frame_0001.webp")
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$FRAMES/frame_0001.webp")
printf '{"count":%s,"width":%s,"height":%s,"pattern":"/frames/hero/frame_%%04d.webp"}\n' "$COUNT" "$WIDTH" "$HEIGHT" > "$FRAMES/manifest.json"
cp "$FRAMES/frame_0001.webp" "$FRAMES/poster.webp"

# --- Demo + ambient clips: transcode muted (-an) + poster still ---
transcode () { # $1 src  $2 outname
	ffmpeg -y -i "$1" -an -c:v libx264 -crf 26 -preset slow -vf "scale='min(1920,iw)':-2" -movflags +faststart "$REC/$2.mp4"
	ffmpeg -y -i "$1" -vframes 1 -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 80 "$REC/$2.poster.webp"
}
transcode "$RAW/researchFlow.mp4" researchflow
transcode "$RAW/sendUSDC_demo-VEED.mp4" sendusdc
transcode "$RAW/tokenAnn.mp4" tokenann
AMBIENT=$(ls "$ROOT"/ElevenLabs_video_veo-3-1-fast_*.mp4 2>/dev/null | head -1)
[ -n "$AMBIENT" ] && transcode "$AMBIENT" ambient_network
echo "media build complete: $COUNT hero frames"
