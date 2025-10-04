"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  fit?: "cover" | "contain";
};

export default function HeroCarousel({ images, intervalMs = 4000, fit = "contain" }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, paused]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) (delta > 0 ? prev() : next());
    touchStartX.current = null;
  };

  if (!images?.length) return null;

  return (
    <div
      className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur md:h-80"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides track */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src + i} className="relative h-full w-full shrink-0 grow-0 basis-full">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 560px, 100vw"
              className={fit === "cover" ? "object-cover" : "object-contain"}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 px-2 py-1 text-white hover:bg-black/50 focus:outline-none"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 px-2 py-1 text-white hover:bg-black/50 focus:outline-none"
      >
        ›
      </button>

      {/* Dots */}
      <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`pointer-events-auto h-1.5 w-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
            onClick={() => setIndex(i)}
            role="button"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}