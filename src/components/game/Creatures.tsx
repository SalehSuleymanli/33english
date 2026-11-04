/**
 * Original Word Quest characters, drawn as inline SVG so they stay crisp,
 * light, theme-friendly and easy to animate. Heroes face right, enemies face left.
 */
import type { EnemyArt as EnemyArtId, HeroId } from "@/content/quest";

type Props = { size?: number; className?: string; mood?: "idle" | "happy" | "hurt" };

function Eyes({ x1, x2, y, r = 5, mood = "idle" }: { x1: number; x2: number; y: number; r?: number; mood?: Props["mood"] }) {
  if (mood === "hurt")
    return (
      <g stroke="#2a1d14" strokeWidth="3" strokeLinecap="round">
        <path d={`M${x1 - 4} ${y - 3}l8 6M${x1 + 4} ${y - 3}l-8 6`} />
        <path d={`M${x2 - 4} ${y - 3}l8 6M${x2 + 4} ${y - 3}l-8 6`} />
      </g>
    );
  if (mood === "happy")
    return (
      <g fill="none" stroke="#2a1d14" strokeWidth="3.2" strokeLinecap="round">
        <path d={`M${x1 - 5} ${y + 1}q5 -7 10 0`} />
        <path d={`M${x2 - 5} ${y + 1}q5 -7 10 0`} />
      </g>
    );
  return (
    <g>
      <circle cx={x1} cy={y} r={r} fill="#2a1d14" />
      <circle cx={x2} cy={y} r={r} fill="#2a1d14" />
      <circle cx={x1 + r * 0.35} cy={y - r * 0.4} r={r * 0.38} fill="#fff" />
      <circle cx={x2 + r * 0.35} cy={y - r * 0.4} r={r * 0.38} fill="#fff" />
    </g>
  );
}

const Blush = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <g fill="#ff8a8a" opacity="0.45">
    <ellipse cx={x1} cy={y} rx="6" ry="3.5" />
    <ellipse cx={x2} cy={y} rx="6" ry="3.5" />
  </g>
);

export function HeroArt({ id, size = 120, className = "", mood = "idle" }: Props & { id: HeroId }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label={id}>
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#000" opacity="0.12" />
      {id === "fox" && (
        <g>
          <path d="M22 86c-14-6-18-24-6-32 6 10 14 16 24 18" fill="#e8793a" />
          <path d="M14 60c-3 6-3 12 2 17 2-6 5-10 9-12" fill="#fff4ea" />
          <ellipse cx="62" cy="84" rx="30" ry="24" fill="#e8793a" />
          <ellipse cx="66" cy="90" rx="17" ry="15" fill="#fff4ea" />
          <path d="M40 42 34 14l22 18Z" fill="#e8793a" />
          <path d="M40 36 37 21l11 10Z" fill="#3b2216" />
          <path d="M84 42 92 14 70 32Z" fill="#e8793a" />
          <path d="M84 36 88 21l-11 10Z" fill="#3b2216" />
          <ellipse cx="62" cy="50" rx="30" ry="25" fill="#f08a47" />
          <path d="M62 54c-12 0-26 4-28 10 6 10 18 12 28 12s22-2 28-12c-2-6-16-10-28-10Z" fill="#fff4ea" />
          <Eyes x1={50} x2={74} y={47} mood={mood} />
          <ellipse cx="62" cy="60" rx="4.5" ry="3.2" fill="#2a1d14" />
          <path d="M57 65q5 4 10 0" fill="none" stroke="#2a1d14" strokeWidth="2" strokeLinecap="round" />
          <Blush x1={44} x2={80} y={58} />
          <ellipse cx="48" cy="106" rx="8" ry="5" fill="#3b2216" />
          <ellipse cx="76" cy="106" rx="8" ry="5" fill="#3b2216" />
        </g>
      )}
      {id === "turtle" && (
        <g>
          <ellipse cx="100" cy="76" rx="15" ry="13" fill="#8fd18a" />
          <Eyes x1={96} x2={106} y={72} r={3.6} mood={mood} />
          <path d="M97 82q5 3 10 0" fill="none" stroke="#2a1d14" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="36" cy="100" rx="9" ry="7" fill="#8fd18a" />
          <ellipse cx="80" cy="100" rx="9" ry="7" fill="#8fd18a" />
          <path d="M14 92c0-30 20-50 46-50s46 20 46 50Z" fill="#3f9e6b" />
          <path d="M60 50 74 60 70 78H50L46 60Z M30 70l14-10 4 18-12 10Z M90 70 76 60l-4 18 12 10Z" fill="#7cc48b" opacity="0.9" />
          <path d="M14 92h92" stroke="#2f7a52" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {id === "owl" && (
        <g>
          <path d="M34 30 40 46 50 36Z M86 30 80 46 70 36Z" fill="#6a4fb3" />
          <ellipse cx="60" cy="72" rx="34" ry="38" fill="#8a6bd1" />
          <ellipse cx="60" cy="84" rx="20" ry="22" fill="#d9ccf5" />
          <path d="M50 78q4 3 8 0M62 78q4 3 8 0M54 88q4 3 8 0M58 96q4 3 8 0" fill="none" stroke="#a88fe0" strokeWidth="2" />
          <circle cx="47" cy="54" r="13" fill="#fff" />
          <circle cx="73" cy="54" r="13" fill="#fff" />
          <Eyes x1={47} x2={73} y={54} r={6.5} mood={mood} />
          <path d="M60 60l-5 5h10Z" fill="#f5b82e" />
          <path d="M26 66c-6 14-2 28 8 34 0-12 2-22 6-30Z M94 66c6 14 2 28-8 34 0-12-2-22-6-30Z" fill="#6a4fb3" />
          <path d="M50 108h8M62 108h8" stroke="#f5b82e" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {id === "bunny" && (
        <g>
          <ellipse cx="48" cy="30" rx="9" ry="26" fill="#fbe6ee" transform="rotate(-10 48 30)" />
          <ellipse cx="48" cy="32" rx="4.5" ry="18" fill="#f2a6c0" transform="rotate(-10 48 32)" />
          <ellipse cx="74" cy="28" rx="9" ry="26" fill="#fbe6ee" transform="rotate(12 74 28)" />
          <ellipse cx="74" cy="30" rx="4.5" ry="18" fill="#f2a6c0" transform="rotate(12 74 30)" />
          <ellipse cx="60" cy="88" rx="28" ry="22" fill="#fbe6ee" />
          <circle cx="30" cy="92" r="9" fill="#fff" />
          <ellipse cx="62" cy="60" rx="27" ry="23" fill="#fff5f8" />
          <Eyes x1={51} x2={73} y={57} mood={mood} />
          <path d="M59 66h6l-3 3Z" fill="#e46d9b" />
          <path d="M62 69v3M58 72q4 3 8 0" fill="none" stroke="#2a1d14" strokeWidth="1.8" strokeLinecap="round" />
          <Blush x1={45} x2={80} y={66} />
          <ellipse cx="48" cy="106" rx="9" ry="5" fill="#f2a6c0" />
          <ellipse cx="74" cy="106" rx="9" ry="5" fill="#f2a6c0" />
        </g>
      )}
      {id === "bear" && (
        <g>
          <circle cx="36" cy="32" r="11" fill="#a0673f" />
          <circle cx="36" cy="32" r="5.5" fill="#d9a37a" />
          <circle cx="84" cy="32" r="11" fill="#a0673f" />
          <circle cx="84" cy="32" r="5.5" fill="#d9a37a" />
          <ellipse cx="60" cy="88" rx="34" ry="24" fill="#a0673f" />
          <ellipse cx="60" cy="92" rx="18" ry="15" fill="#d9a37a" />
          <ellipse cx="60" cy="54" rx="30" ry="26" fill="#b0744a" />
          <ellipse cx="62" cy="64" rx="13" ry="10" fill="#e8c4a2" />
          <Eyes x1={49} x2={73} y={50} mood={mood} />
          <ellipse cx="62" cy="60" rx="5" ry="3.6" fill="#2a1d14" />
          <path d="M57 67q5 4 10 0" fill="none" stroke="#2a1d14" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="44" cy="108" rx="10" ry="5" fill="#7a4c2c" />
          <ellipse cx="76" cy="108" rx="10" ry="5" fill="#7a4c2c" />
        </g>
      )}
    </svg>
  );
}

const Mean = ({ x1, x2, y, mood }: { x1: number; x2: number; y: number; mood?: Props["mood"] }) =>
  mood === "hurt" ? (
    <Eyes x1={x1} x2={x2} y={y} mood="hurt" />
  ) : (
    <g>
      <circle cx={x1} cy={y} r="5.5" fill="#fff" />
      <circle cx={x2} cy={y} r="5.5" fill="#fff" />
      <circle cx={x1 - 1.5} cy={y + 1} r="2.8" fill="#1a1426" />
      <circle cx={x2 - 1.5} cy={y + 1} r="2.8" fill="#1a1426" />
      <path d={`M${x1 - 7} ${y - 9}l10 4M${x2 + 7} ${y - 9}l-10 4`} stroke="#1a1426" strokeWidth="3" strokeLinecap="round" />
    </g>
  );

const Letters = ({ text, x, y, fill = "#fff", size = 10, opacity = 0.75 }: { text: string; x: number; y: number; fill?: string; size?: number; opacity?: number }) => (
  <text x={x} y={y} fontSize={size} fontWeight="800" fill={fill} opacity={opacity} fontFamily="ui-sans-serif, system-ui">
    {text}
  </text>
);

export function EnemyArt({ art, size = 120, className = "", mood = "idle" }: Props & { art: EnemyArtId }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label={art}>
      <ellipse cx="60" cy="112" rx="36" ry="6" fill="#000" opacity="0.14" />
      {(art === "slime" || art === "king") && (
        <g>
          <path d="M14 104c-2-40 18-66 46-66s48 26 46 66c-8 4-16-2-22 2s-14 4-24 0-16 4-24 0-14 2-22-2Z" fill={art === "king" ? "#8a5cf0" : "#59c98a"} />
          <ellipse cx="44" cy="58" rx="9" ry="6" fill="#fff" opacity="0.35" />
          <Mean x1={46} x2={70} y={70} mood={mood} />
          <path d="M48 88q12-8 24 0" fill="none" stroke="#1a1426" strokeWidth="3" strokeLinecap="round" />
          <Letters text="tpyo" x={36} y={102} />
          {art === "king" && (
            <g>
              <path d="M36 42 40 18 52 32 60 12 68 32 80 18 84 42Z" fill="#f5b82e" stroke="#c9860a" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="60" cy="30" r="4" fill="#e84a5f" />
            </g>
          )}
        </g>
      )}
      {art === "sprout" && (
        <g>
          <path d="M60 50c-6-18-20-26-34-24 4 14 16 22 34 24Zm0 0c6-18 20-26 34-24-4 14-16 22-34 24Z" fill="#6fbf4a" />
          <path d="M28 104c-6-30 10-52 32-52s38 22 32 52Z" fill="#3c3355" />
          <circle cx="40" cy="96" r="6" fill="#3c3355" />
          <circle cx="86" cy="92" r="5" fill="#3c3355" />
          <Mean x1={50} x2={72} y={76} mood={mood} />
          <path d="M52 92h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {(art === "twig" || art === "gnarl") && (
        <g>
          <path d={art === "gnarl" ? "M24 108c4-34 0-58 10-78 14 6 22 2 26-8 4 10 12 14 26 8 10 20 6 44 10 78Z" : "M40 108c2-30 0-50 6-66 8 4 20 4 28 0 6 16 4 36 6 66Z"} fill="#8b5e3c" />
          <path d={art === "gnarl" ? "M34 30 18 14M86 30l16-16M60 22V4" : "M46 42 30 26M74 42l16-16"} stroke="#6b4428" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy={art === "gnarl" ? 86 : 90} r={art === "gnarl" ? 14 : 9} fill="#f6e7c8" stroke="#6b4428" strokeWidth="3" />
          <path d={art === "gnarl" ? "M60 86V77M60 86l7 4" : "M60 90v-6M60 90l5 3"} stroke="#6b4428" strokeWidth="2.5" strokeLinecap="round" />
          <Mean x1={50} x2={70} y={art === "gnarl" ? 56 : 62} mood={mood} />
          {art === "gnarl" && <path d="M44 22l6-10 6 10M64 22l6-10 6 10" fill="none" stroke="#4f9a5a" strokeWidth="5" strokeLinecap="round" />}
        </g>
      )}
      {art === "moth" && (
        <g>
          <path d="M60 60C40 26 10 30 14 56c3 18 26 20 46 10Zm0 0c20-34 50-30 46-4-3 18-26 20-46 10Z" fill="#c3a3e6" />
          <path d="M60 66c-14 10-30 24-22 36 8 8 18-8 22-22Zm0 0c14 10 30 24 22 36-8 8-18-8-22-22Z" fill="#a27fd0" />
          <Letters text="?" x={30} y={54} fill="#5b3f8c" size={18} />
          <Letters text="?" x={82} y={54} fill="#5b3f8c" size={18} />
          <ellipse cx="60" cy="68" rx="9" ry="22" fill="#5b3f8c" />
          <Mean x1={55} x2={66} y={58} mood={mood} />
          <path d="M56 48c-4-10-10-14-16-14M64 48c4-10 10-14 16-14" fill="none" stroke="#5b3f8c" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {art === "golem" && (
        <g>
          <path d="M24 108 18 70l12-30 30-10 30 10 12 30-6 38Z" fill="#9aa6c4" />
          <path d="M30 40 60 30l30 10-30 14Z" fill="#b8c3df" />
          <path d="M40 76l14 6M70 70l12 10M46 96l10-8" stroke="#6f7a99" strokeWidth="3" strokeLinecap="round" />
          <Mean x1={48} x2={72} y={60} mood={mood} />
          <Letters text="?" x={52} y={104} fill="#4c5677" size={20} opacity={0.9} />
        </g>
      )}
      {art === "yeti" && (
        <g>
          <path d="M18 108c-4-26 0-52 14-66 6-12 18-20 28-20s22 8 28 20c14 14 18 40 14 66Z" fill="#eef3fb" />
          <path d="M30 50c-6-6-14-2-14 6M90 50c6-6 14-2 14 6" fill="none" stroke="#d3dcec" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="60" cy="62" rx="22" ry="18" fill="#b9c7e6" />
          <Mean x1={50} x2={70} y={58} mood={mood} />
          <path d="M50 72q10 8 20 0" fill="#fff" stroke="#1a1426" strokeWidth="2.5" />
          <path d="M53 72l3 4 3-4M61 72l3 4 3-4" fill="#fff" stroke="#1a1426" strokeWidth="1.2" />
          <path d="M28 96l-8 10M92 96l8 10" stroke="#d3dcec" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {art === "drake" && (
        <g>
          <path d="M60 46C40 20 14 26 8 40c14-2 24 4 30 14Zm0 0c20-26 46-20 52-6-14-2-24 4-30 14Z" fill="#6c3fb0" />
          <path d="M98 92c10 2 16 10 14 18-6-6-12-6-18-4Z" fill="#8a5cf0" />
          <ellipse cx="60" cy="82" rx="34" ry="26" fill="#8a5cf0" />
          <ellipse cx="58" cy="90" rx="18" ry="14" fill="#d2c0f7" />
          <path d="M40 40l-6-14 12 8M80 40l6-14-12 8" fill="#f5b82e" />
          <ellipse cx="60" cy="54" rx="24" ry="20" fill="#9b70f3" />
          <Mean x1={50} x2={70} y={52} mood={mood} />
          <path d="M48 64q12 8 24 0" fill="none" stroke="#1a1426" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 64l2 5 3-4M64 64l3 4 2-5" fill="#fff" />
          <path d="M44 106h10M66 106h10" stroke="#6c3fb0" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {art === "ghost" && (
        <g opacity="0.95">
          <path d="M24 104V54c0-22 16-36 36-36s36 14 36 36v50l-9-8-9 8-9-8-9 8-9-8-9 8-9-8Z" fill="#dfe3ff" />
          <Mean x1={48} x2={72} y={54} mood={mood} />
          <ellipse cx="60" cy="74" rx="7" ry="9" fill="#1a1426" />
          <Letters text="by…" x={38} y={96} fill="#7a7fb8" size={12} />
        </g>
      )}
      {art === "knight" && (
        <g>
          <path d="M30 108V68c0-26 14-46 30-46s30 20 30 46v40Z" fill="#7d86a8" />
          <path d="M34 60h52v14H34Z" fill="#2d3250" />
          <Letters text="_ _ _" x={41} y={71} fill="#ffcf5c" size={11} opacity={1} />
          <path d="M60 22V8M60 8c10 0 16 4 18 12" fill="none" stroke="#e84a5f" strokeWidth="5" strokeLinecap="round" />
          <path d="M30 86h60" stroke="#5d6585" strokeWidth="4" />
          <path d="M18 70l10 30-8 6" fill="none" stroke="#c9ced9" strokeWidth="5" strokeLinecap="round" />
          {mood === "hurt" && <path d="M44 62l8 10M76 62l-8 10" stroke="#fff" strokeWidth="3" />}
        </g>
      )}
      {art === "muddle" && (
        <g>
          <circle cx="60" cy="64" r="44" fill="#2a2140" />
          <circle cx="60" cy="64" r="44" fill="none" stroke="#8a5cf0" strokeWidth="4" strokeDasharray="10 8" />
          <Letters text="the" x={30} y={46} fill="#c8b6ff" size={11} />
          <Letters text="was" x={70} y={42} fill="#ffb3c1" size={11} />
          <Letters text="have" x={28} y={98} fill="#9fe3d8" size={11} />
          <Letters text="are" x={74} y={100} fill="#ffe08a" size={11} />
          <Mean x1={46} x2={74} y={60} mood={mood} />
          <path d="M42 80q18 14 36 0" fill="#e84a5f" stroke="#1a1426" strokeWidth="2.5" />
          <path d="M30 22l6 10M90 22l-6 10M60 12v10" stroke="#e84a5f" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
