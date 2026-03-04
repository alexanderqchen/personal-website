"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  emoji: string;
  text: string;
}

function cloudPath(w: number, h: number, padX: number, padTop: number, padBottom: number): string {
  const radii = [45, 65, 35, 58, 48, 70, 33, 55, 42, 68, 36, 52, 50, 67, 32, 48, 44, 63, 38, 56, 46, 69, 34, 50, 47, 64, 36, 54, 49, 66, 32, 52, 43, 62, 37, 58];
  const cr = 25; // corner arc radius

  const totalW = w + padX * 2;
  const totalH = h + padTop + padBottom;

  // Edge lengths (between corner arcs)
  const topLen = totalW - cr * 2;
  const rightLen = totalH - cr * 2;
  const bottomLen = topLen;
  const leftLen = rightLen;

  function edgeBumps(len: number, startX: number, startY: number, dx: number, dy: number, ri: number, forcedN?: number, sideR?: number): string {
    const n = forcedN ?? Math.max(3, Math.floor(len / 55));
    const step = len / n;
    let d = "";
    for (let i = 0; i < n; i++) {
      const r = sideR ?? radii[(ri + i) % radii.length];
      const ex = startX + dx * step * (i + 1);
      const ey = startY + dy * step * (i + 1);
      d += `A ${r},${r} 0 0,1 ${ex.toFixed(2)},${ey.toFixed(2)} `;
    }
    return d;
  }

  // Corners: TL(cr, 0) → TR(totalW-cr, 0) → BR(totalW-cr, totalH) → BL(cr, totalH)
  let d = `M ${cr},0 `;

  // Top edge: left to right
  let ri = 0;
  const topN = Math.max(3, Math.floor(topLen / 55));
  d += edgeBumps(topLen, cr, 0, 1, 0, ri);
  ri += topN;

  // Top-right corner arc
  d += `A ${cr},${cr} 0 0,1 ${totalW},${cr} `;

  // Right edge: 1 bump spanning the full side
  d += edgeBumps(rightLen, totalW, cr, 0, 1, 0, 1, 36);
  ri += 1;

  // Bottom-right corner arc
  d += `A ${cr},${cr} 0 0,1 ${totalW - cr},${totalH} `;

  // Bottom edge: right to left (reverse)
  const bottomN = Math.max(3, Math.floor(bottomLen / 55));
  d += edgeBumps(bottomLen, totalW - cr, totalH, -1, 0, ri % radii.length);
  ri += bottomN;

  // Bottom-left corner arc
  d += `A ${cr},${cr} 0 0,1 0,${totalH - cr} `;

  // Left edge: 1 bump spanning the full side
  d += edgeBumps(leftLen, 0, totalH - cr, 0, -1, 0, 1, 36);

  // Top-left corner arc (back to start)
  d += `A ${cr},${cr} 0 0,1 ${cr},0 `;

  return d + "Z";
}

export default function StatusBubble({ emoji, text }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 320, h: 64 });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
      setInitialized(true);
    });
    obs.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    setInitialized(true);
    return () => obs.disconnect();
  }, []);

  const maxR = 70;
  const padX = 38;
  const padTop = 40;
  const padBottom = 30;
  const svgW = size.w + padX * 2;
  const svgH = size.h + padTop + padBottom;

  return (
    <div style={{ paddingLeft: 8, marginTop: padTop, marginBottom: 0 }}>
      {/* Cloud */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <svg
          width={svgW}
          height={svgH}
          style={{ position: "absolute", top: -padTop, left: -padX, overflow: "visible", visibility: initialized ? "visible" : "hidden" }}
          aria-hidden="true"
        >
          <path
            d={cloudPath(size.w, size.h, padX, padTop, padBottom)}
            className="cloud-fill"
          />
        </svg>
        <div
          ref={contentRef}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0px",
          }}
        >
          <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
          <span className="cloud-label">{text}</span>
        </div>
      </div>

      {/* Thought trail — angled down-left */}
      <div style={{ position: "relative", height: 40, marginTop: padBottom + 6 }}>
        <div className="trail-dot" style={{ width: 14, height: 14, position: "absolute", left: 24, top: 0 }} />
        <div className="trail-dot" style={{ width: 10, height: 10, position: "absolute", left: 14, top: 14 }} />
        <div className="trail-dot" style={{ width: 6,  height: 6,  position: "absolute", left: 6,  top: 26 }} />
      </div>

      <style>{`
        .cloud-fill { fill: #e5e5e5; }
        .dark .cloud-fill { fill: #2a2a2a; }
        .cloud-label { font-size: 0.875rem; line-height: 1.4; color: #404040; max-width: 380px; font-weight: 500; }
        .dark .cloud-label { color: #d4d4d4; }
        .trail-dot { border-radius: 50%; background: #e5e5e5; }
        .dark .trail-dot { background: #2a2a2a; }
      `}</style>
    </div>
  );
}
