'use client';
import { useEffect, useRef, useState } from 'react';

export interface Manifest { count: number; width: number; height: number; pattern: string }

export function frameIndexForProgress(progress: number, count: number, speed: number): number {
	const accelerated = Math.min(progress * speed, 1);
	return Math.min(Math.floor(accelerated * count), count - 1);
}

export function coverDraw(o: { cw: number; ch: number; iw: number; ih: number; scaleFactor: number }) {
	const scale = Math.max(o.cw / o.iw, o.ch / o.ih) * o.scaleFactor;
	const dw = o.iw * scale, dh = o.ih * scale;
	return { dw, dh, dx: (o.cw - dw) / 2, dy: (o.ch - dh) / 2 };
}

function framePath(pattern: string, i: number): string {
	return pattern.replace('%04d', String(i + 1).padStart(4, '0'));
}

/** Preloads frames (first 10 eager, rest lazy) and returns a drawFrame(canvas,i) callback once ready. */
export function useFrameSequence(manifest: Manifest) {
	const frames = useRef<HTMLImageElement[]>([]);
	const [ready, setReady] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let cancelled = false;
		const imgs: HTMLImageElement[] = new Array(manifest.count);
		const load = (i: number) => new Promise<void>((res) => {
			const img = new Image();
			img.onload = img.onerror = () => res();
			img.src = framePath(manifest.pattern, i);
			imgs[i] = img;
		});
		(async () => {
			const eager = Math.min(10, manifest.count);
			await Promise.all(Array.from({ length: eager }, (_, i) => load(i)));
			if (cancelled) return;
			frames.current = imgs;
			setReady(true);
			setProgress(1);
			for (let i = eager; i < manifest.count; i++) {
				await load(i);
				if (cancelled) return;
				setProgress((i + 1) / manifest.count);
			}
		})();
		return () => { cancelled = true; };
	}, [manifest]);

	const drawFrame = (canvas: HTMLCanvasElement, i: number, scaleFactor = 0.85) => {
		const img = frames.current[i];
		const ctx = canvas.getContext('2d');
		if (!img || !ctx || !img.naturalWidth) return;
		const { dw, dh, dx, dy } = coverDraw({ cw: canvas.width, ch: canvas.height, iw: img.naturalWidth, ih: img.naturalHeight, scaleFactor });
		ctx.fillStyle = '#05060b';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, dx, dy, dw, dh);
	};

	return { ready, preloadProgress: progress, drawFrame };
}
