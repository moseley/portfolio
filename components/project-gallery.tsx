"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isVideo, stillFor, type Project } from "@/content/work";

// Static strings — Tailwind can't see interpolated class names.
const FRAME_ASPECT = {
  "16/9": "aspect-16/9",
  "16/10": "aspect-16/10 max-md:aspect-3/2",
  "9/16": "aspect-9/16",
  "4/3": "aspect-4/3",
} as const;

export default function ProjectGallery({
  project,
  imageIndex,
  onImageChange,
}: {
  project: Project;
  imageIndex: number;
  onImageChange: (index: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const programmaticRef = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    // Scroll the strip itself — scrollIntoView would also scroll every
    // ancestor, dragging the whole page down to the open row on mount.
    const left = imageIndex * scroller.clientWidth;
    if (Math.abs(scroller.scrollLeft - left) < 1) return;
    programmaticRef.current = true;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [imageIndex]);

  // Play only while on screen, so a collapsed row isn't decoding video.
  // Reduced-motion users keep the poster and never autoplay.
  useEffect(() => {
    const videos = scrollerRef.current?.querySelectorAll("video");
    if (!videos?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.15 },
    );
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [project.slug]);

  // Keyboard nav + body scroll lock while lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i !== null ? Math.min(i + 1, project.screenshots.length - 1) : null,
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, project.screenshots.length]);

  const fit = project.displayMode === "fit";
  const contain = project.objectFit === "contain";
  const mediaClass = contain ? "object-contain bg-black" : "object-cover object-top";

  const lbShot = lightboxIndex !== null ? project.screenshots[lightboxIndex] : null;

  return (
    <div className="min-w-0">
      <div
        className={`rounded border border-(--border) max-md:-mx-5 ${fit ? "overflow-hidden" : `relative overflow-hidden ${FRAME_ASPECT[project.aspect ?? "16/10"]}`}`}
      >
        <div
          ref={scrollerRef}
          onScroll={(event) => {
            const target = event.currentTarget;
            const index = Math.round(target.scrollLeft / target.clientWidth);
            // Ignore scroll events fired during a programmatic scroll — only
            // clear the flag once we've landed on the target slide.
            if (programmaticRef.current) {
              if (index === imageIndex) programmaticRef.current = false;
              return;
            }
            if (index !== imageIndex) onImageChange(index);
          }}
          className={`flex overflow-x-auto snap-x snap-mandatory max-md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${fit ? "" : "h-full"}`}
        >
          {project.screenshots.map((image, index) =>
            isVideo(image.src) ? (
              <div
                key={image.src}
                className={`flex-[0_0_100%] snap-center cursor-zoom-in ${fit ? "" : "relative h-full"}`}
                onClick={() => setLightboxIndex(index)}
              >
                <video
                  // React sets `muted` as a property, so it can be missing from
                  // the SSR'd HTML — without it Safari refuses to autoplay.
                  ref={(el) => {
                    if (el) el.muted = true;
                  }}
                  className={`h-full w-full ${mediaClass} pointer-events-none`}
                  poster={image.poster}
                  aria-label={image.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  {image.srcWebm && (
                    <source src={image.srcWebm} type="video/webm" />
                  )}
                  <source src={image.src} type="video/mp4" />
                </video>
              </div>
            ) : fit ? (
              <div
                key={image.src}
                className="flex-[0_0_100%] snap-center cursor-zoom-in"
                onClick={() => setLightboxIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto block"
                />
              </div>
            ) : (
              <div
                key={image.src}
                className="relative h-full flex-[0_0_100%] snap-center cursor-zoom-in"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className={mediaClass}
                  priority={index === 0}
                />
              </div>
            ),
          )}
        </div>
      </div>
      {project.screenshots.length > 1 && (
        <>
          <div className="mt-3 hidden gap-2 md:flex">
            {project.screenshots.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onImageChange(index);
                }}
                aria-label={`Show image ${index + 1}`}
                className={`relative h-13.5 w-21 overflow-hidden rounded-sm border transition-opacity ${index === imageIndex ? "border-(--text) opacity-100" : "border-(--border) opacity-50 hover:opacity-100"}`}
              >
                <Image
                  src={stillFor(image)}
                  alt=""
                  fill
                  sizes="84px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
          <div
            className="mt-3 flex justify-center gap-2 md:hidden"
            aria-label="Gallery position"
          >
            {project.screenshots.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onImageChange(index);
                }}
                aria-label={`Show image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === imageIndex ? "w-6 bg-(--text)" : "w-1.5 bg-(--border-strong)"}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {mounted &&
        lbShot &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lbShot.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/25 transition-colors"
            >
              ×
            </button>

            {/* Prev */}
            {lightboxIndex !== null && lightboxIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i !== null ? i - 1 : i));
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/25 transition-colors"
              >
                ‹
              </button>
            )}

            {/* Next */}
            {lightboxIndex !== null &&
              lightboxIndex < project.screenshots.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i !== null ? i + 1 : i));
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/25 transition-colors"
                >
                  ›
                </button>
              )}

            {/* Media */}
            <div
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(lbShot.src) ? (
                <video
                  ref={(el) => {
                    if (el) el.muted = true;
                  }}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                  poster={lbShot.poster}
                  aria-label={lbShot.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  {lbShot.srcWebm && (
                    <source src={lbShot.srcWebm} type="video/webm" />
                  )}
                  <source src={lbShot.src} type="video/mp4" />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lbShot.src}
                  alt={lbShot.alt}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
