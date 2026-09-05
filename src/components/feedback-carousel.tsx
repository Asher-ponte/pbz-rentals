"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { feedbackSlides } from "@/lib/feedback";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5500;

export function FeedbackCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = feedbackSlides.length;

  const goTo = useCallback((nextIndex: number) => {
    setIndex(((nextIndex % count) + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const slide = feedbackSlides[index];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10" aria-labelledby="feedback-heading">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
        From our clients
      </p>
      <h2 id="feedback-heading" className="mt-2 text-balance font-heading text-[1.65rem] font-extrabold tracking-tight sm:text-3xl">
        Client Feedback
      </h2>
      <p className="mt-2 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
        Real photos from PBZ Rentals — clean inventory, on-time delivery, and
        the same chairs, tables, and tents you can book here.
      </p>

      <div
        className="relative mt-5 overflow-hidden rounded-[1.6rem] border border-pink-100 bg-[#2a1c20] shadow-[0_18px_40px_-24px_rgba(219,39,119,0.55)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          if (delta < 0) next();
          else prev();
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {feedbackSlides.map((item) => (
            <figure
              key={item.src}
              className="relative min-w-full shrink-0 bg-[#1c1416]"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] md:aspect-[16/10]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 64rem"
                  className="object-contain"
                />
              </div>
            </figure>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pt-16 pb-4">
          <p className="text-xs font-bold tracking-[0.18em] text-[#e8b4b8] uppercase">
            {slide.caption}
          </p>
          {slide.quote ? (
            <p className="mt-1 max-w-xl text-sm leading-6 font-medium text-white">
              {slide.quote}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-[#fff4f7]"
          aria-label="Previous feedback photo"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-foreground shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-[#fff4f7]"
          aria-label="Next feedback photo"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {feedbackSlides.map((item, slideIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => goTo(slideIndex)}
            className="flex h-11 min-w-11 cursor-pointer items-center justify-center"
            aria-label={`Show ${item.caption}`}
            aria-current={slideIndex === index}
          >
            <span
              className={cn(
                "h-2 rounded-full transition-[width,background-color]",
                slideIndex === index ? "w-7 bg-primary" : "w-2 bg-rose-300 hover:bg-rose-400",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
