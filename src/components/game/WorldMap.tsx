"use client";
import { useMemo } from "react";
import { CAPITALS, MAP_ROWS, REGIONS, SEAT_COLORS, SEA_ROUTES } from "@/lib/game/conquest";

const S = 10; // hex radius
const W = Math.sqrt(3) * S;
const COLS = MAP_ROWS[0].length;
const VB_W = COLS * W + W / 2;
const VB_H = MAP_ROWS.length * 1.5 * S + S / 2;
const LETTER = new Map(REGIONS.map((r, i) => [r.letter, i]));

type Cell = { region: number; x: number; y: number; points: string };

function hexPoints(x: number, y: number) {
  return Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (60 * k - 30);
    return `${(x + (S - 0.4) * Math.cos(a)).toFixed(2)},${(y + (S - 0.4) * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

const CELLS: Cell[] = MAP_ROWS.flatMap((row, r) =>
  [...row].flatMap((ch, c) => {
    const region = LETTER.get(ch);
    if (region === undefined) return [];
    const x = c * W + (r % 2 ? W : W / 2);
    const y = r * 1.5 * S + S;
    return [{ region, x, y, points: hexPoints(x, y) }];
  }),
);

export const CENTERS = REGIONS.map((_, i) => {
  const cells = CELLS.filter((c) => c.region === i);
  return { x: cells.reduce((n, c) => n + c.x, 0) / cells.length, y: cells.reduce((n, c) => n + c.y, 0) / cells.length };
});

const SHORT: Record<string, string> = {
  canada: "Canada",
  usa: "USA",
  mexico: "C. America",
  brazil: "Brazil",
  andes: "Andes",
  westeu: "W. Europe",
  nordic: "Nordic",
  easteu: "E. Europe",
  sahara: "N. Africa",
  safrica: "S. Africa",
  mideast: "Mid East",
  russia: "Russia",
  india: "S. Asia",
  china: "E. Asia",
  seasia: "SE Asia",
  australia: "Australia",
};

export type MapProps = {
  owner: number[];
  towers: number[];
  legal?: number[];
  picked?: number | null;
  onPick?: (region: number) => void;
  arrow?: { from: number; to: number; color: string } | null;
  flash?: number[];
  pins?: { region: number; seat: number }[];
};

/** The battlefield: a stylised hex world. Colours show who owns each region. */
export function WorldMap({ owner, towers, legal = [], picked = null, onPick, arrow = null, flash = [], pins = [] }: MapProps) {
  const legalSet = useMemo(() => new Set(legal), [legal]);
  const fill = (r: number) => (owner[r] >= 0 ? SEAT_COLORS[owner[r]] : "#c7cede");
  return (
    <svg viewBox={`0 0 ${VB_W.toFixed(1)} ${VB_H.toFixed(1)}`} className="block h-auto w-full select-none" role="img" aria-label="World map">
      <defs>
        <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14284f" />
          <stop offset="1" stopColor="#0c1a36" />
        </linearGradient>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#fff" />
        </marker>
      </defs>
      <style>{`
        .wm-legal{animation:wm-glow 1.1s ease-in-out infinite;cursor:pointer}
        @keyframes wm-glow{0%,100%{opacity:.25}50%{opacity:.75}}
        .wm-flash{animation:wm-flash 1.2s ease-out 2}
        @keyframes wm-flash{0%{opacity:.95}100%{opacity:0}}
        .wm-arrow{stroke-dasharray:6 4;animation:wm-dash .6s linear infinite}
        @keyframes wm-dash{to{stroke-dashoffset:-10}}
        .wm-boom{animation:wm-boom .9s cubic-bezier(.2,1.6,.4,1) both;transform-box:fill-box;transform-origin:center}
        @keyframes wm-boom{0%{transform:scale(0)}100%{transform:scale(1)}}
        .wm-cell{transition:fill .6s ease}
      `}</style>
      <rect width={VB_W} height={VB_H} rx="10" fill="url(#ocean)" />
      {/* sea routes */}
      {SEA_ROUTES.map(([a, b]) => {
        const p = CENTERS[a];
        const q = CENTERS[b];
        if (Math.abs(p.x - q.x) > VB_W / 2) {
          // around the back of the globe: two stubs off the map edges
          const [l, r] = p.x < q.x ? [p, q] : [q, p];
          return (
            <g key={`${a}-${b}`} stroke="#8fb3ff" strokeOpacity=".45" strokeWidth="1.2" strokeDasharray="3 3">
              <line x1={l.x} y1={l.y} x2={0} y2={(l.y + r.y) / 2} />
              <line x1={r.x} y1={r.y} x2={VB_W} y2={(l.y + r.y) / 2} />
            </g>
          );
        }
        return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#8fb3ff" strokeOpacity=".45" strokeWidth="1.2" strokeDasharray="3 3" />;
      })}
      {/* land */}
      {CELLS.map((c, i) => (
        <polygon key={i} points={c.points} className="wm-cell" fill={fill(c.region)} stroke="#0c1a36" strokeOpacity=".35" strokeWidth=".6" />
      ))}
      {/* flashes on captured regions */}
      {CELLS.filter((c) => flash.includes(c.region)).map((c, i) => (
        <polygon key={`f${i}`} points={c.points} fill="#fff" className="wm-flash" pointerEvents="none" />
      ))}
      {/* clickable targets */}
      {CELLS.filter((c) => legalSet.has(c.region)).map((c, i) => (
        <polygon
          key={`l${i}`}
          points={c.points}
          fill="#fff"
          className="wm-legal"
          onClick={() => onPick?.(c.region)}
          role="button"
          aria-label={`Choose ${REGIONS[c.region].name}`}
        />
      ))}
      {/* labels, capitals, pins */}
      {REGIONS.map((r, i) => {
        const p = CENTERS[i];
        const cap = CAPITALS.indexOf(i);
        return (
          <g key={r.id} pointerEvents="none">
            {cap >= 0 && owner[i] === cap && (
              <g transform={`translate(${p.x - 7} ${p.y - 16})`}>
                <path d="M1 14V5h2v2h2V5h2v2h2V5h2v2h2V5h2v9z" fill="#fff" stroke="#0c1a36" strokeWidth=".8" />
                <text x="7" y="22" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#fff" stroke="#0c1a36" strokeWidth="1.6" paintOrder="stroke">
                  {"♜".repeat(Math.max(0, towers[cap] ?? 0))}
                </text>
              </g>
            )}
            <text x={p.x} y={p.y + (cap >= 0 ? 12 : 2)} textAnchor="middle" fontSize="5.2" fontWeight="800" fill="#fff" stroke="#0c1a36" strokeOpacity=".75" strokeWidth="1.6" paintOrder="stroke">
              {SHORT[r.id]}
            </text>
            {picked === i && (
              <text x={p.x} y={p.y - 6} textAnchor="middle" fontSize="11" className="wm-boom">
                🚩
              </text>
            )}
            {flash.includes(i) && (
              <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="13" className="wm-boom">
                💥
              </text>
            )}
          </g>
        );
      })}
      {pins.map((pin, k) => {
        const p = CENTERS[pin.region];
        return <circle key={k} cx={p.x + (k % 3) * 5 - 5} cy={p.y + 8} r="2.8" fill={SEAT_COLORS[pin.seat]} stroke="#fff" strokeWidth="1" pointerEvents="none" />;
      })}
      {arrow && <Arrow {...arrow} />}
    </svg>
  );
}

function Arrow({ from, to, color }: { from: number; to: number; color: string }) {
  const a = CENTERS[from];
  const b = CENTERS[to];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.min(40, Math.hypot(b.x - a.x, b.y - a.y) / 3);
  const d = `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
  return (
    <g pointerEvents="none">
      <path d={d} fill="none" stroke="#0c1a36" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" className="wm-arrow" markerEnd="url(#arrowhead)" />
      <text x={b.x} y={b.y - 8} textAnchor="middle" fontSize="12" className="wm-boom">
        ⚔️
      </text>
    </g>
  );
}

/** A region of `seat` next to `target`, to start the attack arrow from. */
export function attackFrom(owner: number[], seat: number, target: number): number {
  const near = REGIONS[target].adj.find((r) => owner[r] === seat);
  return near ?? CAPITALS[seat];
}
