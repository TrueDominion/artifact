/**
 * src/components/home/StatueSVG.tsx
 * Hero section: detailed graphite line drawing of a broken classical marble torso
 * half-emerging from illustrated sand / dust particles.
 * Stroke-only, no fills. Fine hatching for shading. Responsive SVG.
 */

export default function StatueSVG() {
  return (
    <svg
      viewBox="0 0 340 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs mx-auto"
      aria-label="Broken classical marble torso emerging from sand"
      role="img"
    >
      {/* ── Torso body ── */}
      {/* Main torso silhouette */}
      <path
        d="M130,120 C118,126 108,138 106,155 C104,172 110,195 112,215 C114,235 110,255 108,275 C106,290 104,305 106,318 C108,328 114,335 122,338 C134,342 148,340 160,340 C172,340 186,342 198,338 C206,335 212,328 214,318 C216,305 214,290 212,275 C210,255 206,235 208,215 C210,195 216,172 214,155 C212,138 202,126 190,120 Z"
        stroke="#2D2D2D"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Neck stub (broken) */}
      <path
        d="M148,120 C150,112 155,106 160,105 C165,106 170,112 172,120"
        stroke="#2D2D2D"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Broken neck edge — jagged */}
      <path
        d="M148,120 L151,114 L155,118 L158,110 L162,116 L165,109 L169,115 L172,120"
        stroke="#2D2D2D"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left shoulder (broken) */}
      <path
        d="M106,155 C96,152 86,148 80,150 C74,152 70,158 72,165"
        stroke="#2D2D2D"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Left arm stump break */}
      <path
        d="M80,150 L76,145 L82,143 L78,138 L85,140 L81,135"
        stroke="#2D2D2D"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right shoulder (broken) */}
      <path
        d="M214,155 C224,152 234,148 240,150 C246,152 250,158 248,165"
        stroke="#2D2D2D"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Right arm stump break */}
      <path
        d="M240,150 L244,145 L238,143 L242,138 L235,140 L239,135"
        stroke="#2D2D2D"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Muscle / anatomy hatching ── */}
      {/* Chest left pectoral hatching */}
      <path d="M118,138 C122,136 128,135 134,137" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M116,144 C120,141 128,140 136,142" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M115,150 C120,147 130,146 138,148" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M115,156 C121,153 131,152 139,154" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />

      {/* Chest right pectoral hatching */}
      <path d="M202,138 C196,136 190,135 184,137" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M204,144 C198,141 190,140 182,142" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M205,150 C198,147 188,146 180,148" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M205,156 C198,153 187,152 180,154" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />

      {/* Sternum line */}
      <path d="M160,130 C160,160 160,190 160,220" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />

      {/* Abdominal definition */}
      <path d="M140,170 C148,168 172,168 180,170" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M138,185 C147,183 173,183 182,185" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M137,200 C147,198 173,198 183,200" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <path d="M136,215 C147,213 173,213 184,215" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />

      {/* Side hatching left */}
      <path d="M108,170 L114,175" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M107,180 L113,185" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M107,190 L113,195" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M107,200 L112,205" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />

      {/* Side hatching right */}
      <path d="M212,170 L206,175" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M213,180 L207,185" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M213,190 L207,195" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      <path d="M213,200 L208,205" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />

      {/* ── Marble crack lines ── */}
      <path d="M145,165 L148,172 L143,178 L147,186" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.35" />
      <path d="M175,195 L178,204 L173,210" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.35" />
      <path d="M155,240 L159,250 L154,258 L158,265" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />

      {/* ── Lower body fading into sand ── */}
      {/* Draped fabric / lower torso */}
      <path
        d="M108,275 C112,272 120,270 130,271 C140,272 150,274 160,274 C170,274 180,272 190,271 C200,270 208,272 212,275"
        stroke="#2D2D2D"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M110,290 C116,286 126,284 140,285 C152,286 162,288 172,287 C182,286 196,284 210,288"
        stroke="#2D2D2D"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M112,305 C120,301 132,300 148,301 C160,302 168,304 180,303 C194,301 206,300 214,303"
        stroke="#2D2D2D"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M114,318 C124,314 138,313 155,314 C166,315 172,317 186,316 C200,314 210,313 216,316"
        stroke="#2D2D2D"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* ── Sand / dust particles ground ── */}
      {/* Ground surface line — irregular */}
      <path
        d="M60,340 C80,336 100,338 120,335 C140,332 160,334 180,333 C200,332 220,335 240,333 C258,331 276,334 290,332"
        stroke="#2D2D2D"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Sand texture — fine horizontal lines */}
      <path d="M72,348 C90,346 108,347 128,345 C148,343 168,345 188,344 C208,343 228,345 248,344" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
      <path d="M80,356 C98,354 118,355 138,353 C158,351 178,353 198,352 C215,351 232,353 250,352" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />
      <path d="M88,364 C106,362 126,363 146,361 C166,359 186,361 206,360 C222,359 238,361 256,360" stroke="#2D2D2D" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" />

      {/* Sand particles — scattered dots */}
      {[
        [85,337],[95,342],[115,339],[135,336],[145,341],[165,337],[175,342],[195,338],[215,336],[228,340],[242,337],
        [78,344],[102,348],[122,346],[142,350],[162,347],[182,351],[202,348],[222,346],[244,349],
        [92,352],[112,356],[132,354],[155,358],[172,355],[192,359],[212,356],[232,354],
        [88,360],[108,364],[128,362],[148,366],[168,363],[188,367],[208,364],[228,362],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.8" fill="#2D2D2D" opacity="0.25" />
      ))}

      {/* Larger sand grain clusters near statue base */}
      <circle cx="130" cy="334" r="1.2" fill="none" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      <circle cx="160" cy="332" r="1.0" fill="none" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />
      <circle cx="190" cy="333" r="1.1" fill="none" stroke="#2D2D2D" strokeWidth="0.5" opacity="0.3" />

      {/* Dust cloud wisps at base */}
      <path d="M100,330 C110,325 120,327 115,332" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
      <path d="M200,330 C210,325 220,328 215,333" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.2" />
      <path d="M145,328 C155,323 165,325 160,330" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.18" />
    </svg>
  )
}
