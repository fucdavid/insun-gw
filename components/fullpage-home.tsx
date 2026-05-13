"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type FullpageHomeProps = {
  labels: string[];
  children: ReactNode;
};

const TRANSITION_LOCK_MS = 760;
const WHEEL_THRESHOLD = 28;
const TOUCH_THRESHOLD = 42;

export function FullpageHome({ labels, children }: FullpageHomeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);

  const clampIndex = useCallback(
    (nextIndex: number) => Math.min(Math.max(nextIndex, 0), labels.length - 1),
    [labels.length]
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex((currentIndex) => {
        const targetIndex = clampIndex(nextIndex);
        return targetIndex === currentIndex ? currentIndex : targetIndex;
      });
    },
    [clampIndex]
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      if (lockedRef.current) return;

      setActiveIndex((currentIndex) => {
        const targetIndex = clampIndex(currentIndex + direction);
        if (targetIndex === currentIndex) return currentIndex;

        lockedRef.current = true;
        window.setTimeout(() => {
          lockedRef.current = false;
        }, TRANSITION_LOCK_MS);

        return targetIndex;
      });
    },
    [clampIndex]
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [step]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        step(-1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(labels.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, labels.length, step]);

  return (
    <div
      ref={containerRef}
      aria-label="首页整屏切换"
      className="relative h-screen overflow-hidden bg-[#f3f7fb]"
      data-active-panel={labels[activeIndex]}
      onTouchStart={(event) => {
        touchStartRef.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(event) => {
        const touchStart = touchStartRef.current;
        const touchEnd = event.changedTouches[0]?.clientY;
        touchStartRef.current = null;
        if (touchStart == null || touchEnd == null) return;

        const distance = touchStart - touchEnd;
        if (Math.abs(distance) < TOUCH_THRESHOLD) return;
        step(distance > 0 ? 1 : -1);
      }}
    >
      <div
        data-testid="homepage-track"
        className="h-full transition-transform duration-700 ease-[cubic-bezier(0.74,0,0.2,1)]"
        style={{ transform: `translate3d(0, -${activeIndex * 100}vh, 0)` }}
      >
        {children}
      </div>

      <nav
        aria-label="首页模块导航"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-current={activeIndex === index ? "step" : undefined}
            aria-label={`切换到${label}`}
            className={
              activeIndex === index
                ? "size-3 rounded-full border border-white bg-white shadow-[0_0_18px_rgba(255,255,255,0.65)]"
                : "size-2.5 rounded-full border border-white/70 bg-black/10 transition hover:bg-white/80"
            }
            onClick={() => goTo(index)}
          />
        ))}
      </nav>

      {activeIndex < labels.length - 1 ? (
        <button
          type="button"
          aria-label="切换到下一屏"
          className="fixed bottom-8 left-1/2 z-40 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/86 transition hover:text-white md:flex"
          onClick={() => step(1)}
        >
          <span className="relative h-12 w-7 rounded-full border-2 border-current">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-current" />
          </span>
          <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-current" />
        </button>
      ) : null}
    </div>
  );
}
