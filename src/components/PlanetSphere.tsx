import { useId, type CSSProperties } from "react";
import type { VisualSpec, Crater } from "@/data/bodies";

type Props = {
  spec: VisualSpec;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** 0 = terang penuh, 1 = gelap penuh dari arah cahaya */
  shadow?: number;
  litFrom?: "left" | "right" | "none";
  glow?: boolean;
  ring?: boolean;
  seedOffset?: number;
};

const R = 84;
const C = 100;

function san(s: string) {
  return s.replace(/[^a-zA-Z0-9]/g, "");
}

function Craters({ craters }: { craters: Crater[] }) {
  return (
    <g>
      {craters.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.r} fill="#000" opacity={(c.o ?? 0.3) * 0.55} />
          <circle
            cx={c.x - c.r * 0.14}
            cy={c.y - c.r * 0.14}
            r={c.r * 0.82}
            fill="#000"
            opacity={(c.o ?? 0.3) * 0.35}
          />
          <circle
            cx={c.x + c.r * 0.18}
            cy={c.y + c.r * 0.18}
            r={c.r * 0.72}
            fill="#fff"
            opacity={(c.o ?? 0.3) * 0.18}
          />
        </g>
      ))}
    </g>
  );
}

export default function PlanetSphere({
  spec,
  size = 96,
  className = "",
  style,
  shadow = 0,
  litFrom = "left",
  glow = true,
  ring,
  seedOffset = 0,
}: Props) {
  const raw = useId();
  const uid = san(raw);
  const clip = `cp${uid}`;
  const fTex = `tx${uid}`;
  const fLand = `ld${uid}`;
  const fCloud = `cl${uid}`;
  const gBase = `bs${uid}`;
  const gBand = `bd${uid}`;
  const gShade = `sh${uid}`;
  const gGlow = `gl${uid}`;
  const gTerm = `tm${uid}`;
  const ringBack = `rb${uid}`;
  const ringFront = `rf${uid}`;
  const seed = 7 + seedOffset * 13;

  const showRing = ring ?? spec.ring ?? false;

  /* --- gelap-terang (terminator) --- */
  const dark = Math.max(0, Math.min(1, shadow));
  const dir = litFrom === "right" ? 0 : litFrom === "left" ? 1 : 0.5;
  const termStops =
    litFrom === "none"
      ? [
          { o: 0, a: 0 },
          { o: 1, a: 0 },
        ]
      : [
          { o: 0, a: 0.0 },
          { o: Math.max(0.05, 0.62 - dark * 0.2), a: 0.0 },
          { o: Math.max(0.15, 0.82 - dark * 0.15), a: dark * 0.35 },
          { o: 1, a: dark },
        ];
  const termX1 = litFrom === "right" ? "0%" : "100%";
  const termX2 = litFrom === "right" ? "100%" : "0%";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ overflow: "visible", ...style }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx={C} cy={C} r={R} />
        </clipPath>

        <radialGradient id={gBase} cx="34%" cy="30%" r="78%">
          {spec.colors.map((c, i) => (
            <stop key={i} offset={`${(i / Math.max(1, spec.colors.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </radialGradient>

        {spec.bands && (
          <linearGradient id={gBand} x1="0" y1="0" x2="0" y2="1">
            {spec.bands.map((c, i) => (
              <stop key={i} offset={`${(i / (spec.bands!.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>
        )}

        <radialGradient id={gShade} cx="30%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.30" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="72%" stopColor="#000" stopOpacity="0.30" />
          <stop offset="92%" stopColor="#000" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.78" />
        </radialGradient>

        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor={spec.glow ?? "#c9d4e4"} stopOpacity={spec.glow ? 0.5 : 0.26} />
          <stop offset="78%" stopColor={spec.glow ?? "#c9d4e4"} stopOpacity={spec.glow ? 0.16 : 0.08} />
          <stop offset="100%" stopColor={spec.glow ?? "#c9d4e4"} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={gTerm} x1={termX1} y1="0%" x2={termX2} y2="0%">
          {termStops.map((s, i) => (
            <stop key={i} offset={`${s.o * 100}%`} stopColor="#030711" stopOpacity={s.a} />
          ))}
        </linearGradient>

        <filter id={fTex} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={spec.freq ?? 0.05}
            numOctaves={4}
            seed={seed}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={spec.disp ?? 0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id={fLand} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.021" numOctaves={5} seed={seed} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.16  0 0 0 0 0.42  0 0 0 0 0.20  0 0 0 11 -5.4"
          />
        </filter>

        <filter id={fCloud} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.026" numOctaves={5} seed={seed + 31} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 7 -4.6"
          />
        </filter>

        {showRing && (
          <>
            <clipPath id={ringBack}>
              <rect x="-40" y="-40" width="280" height={C} />
            </clipPath>
            <clipPath id={ringFront}>
              <rect x="-40" y={C} width="280" height="180" />
            </clipPath>
          </>
        )}
      </defs>

      {/* halo */}
      {glow && (
        <circle cx={C} cy={C} r={R + 22} fill={`url(#${gGlow})`} style={{ mixBlendMode: "screen" }} />
      )}

      {/* cincin belakang */}
      {showRing && (
        <g clipPath={`url(#${ringBack})`} opacity="0.95">
          <ellipse
            cx={C}
            cy={C}
            rx={R + 40}
            ry={(R + 40) * 0.26}
            fill="none"
            stroke="#d8c69a"
            strokeWidth="13"
            opacity="0.42"
          />
          <ellipse
            cx={C}
            cy={C}
            rx={R + 24}
            ry={(R + 24) * 0.26}
            fill="none"
            stroke="#f0e2bb"
            strokeWidth="8"
            opacity="0.6"
          />
        </g>
      )}

      {/* bola planet */}
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="200" height="200" fill={`url(#${gBase})`} />

        {spec.kind === "banded" && (
          <g filter={`url(#${fTex})`} opacity="0.92">
            <rect x="-30" y="-30" width="260" height="260" fill={`url(#${gBand})`} />
          </g>
        )}

        {spec.kind === "ice" && spec.bands && (
          <g filter={`url(#${fTex})`} opacity="0.55">
            <rect x="-30" y="-30" width="260" height="260" fill={`url(#${gBand})`} />
          </g>
        )}

        {(spec.kind === "rocky" || spec.kind === "moon" || spec.kind === "asteroid") && (
          <>
            <g filter={`url(#${fTex})`} opacity="0.28">
              <rect x="-30" y="-30" width="260" height="260" fill="#000" />
            </g>
            <g filter={`url(#${fTex})`} opacity="0.16">
              <rect x="-30" y="-30" width="260" height="260" fill="#fff" />
            </g>
          </>
        )}

        {spec.kind === "sun" && (
          <>
            <g filter={`url(#${fTex})`} opacity="0.35">
              <rect x="-30" y="-30" width="260" height="260" fill="#ff8a1f" />
            </g>
            <g filter={`url(#${fTex})`} opacity="0.22">
              <rect x="-30" y="-30" width="260" height="260" fill="#fff3c4" />
            </g>
          </>
        )}

        {spec.kind === "earth" && (
          <>
            <rect x="-30" y="-30" width="260" height="260" filter={`url(#${fLand})`} opacity="0.95" />
            <rect x="-30" y="-30" width="260" height="260" filter={`url(#${fCloud})`} opacity="0.42" />
            {spec.cap && (
              <>
                <ellipse cx={C} cy={16} rx={54} ry={22} fill="#f2fbff" opacity="0.85" />
                <ellipse cx={C} cy={186} rx={44} ry={20} fill="#eaf7ff" opacity="0.85" />
              </>
            )}
          </>
        )}

        {spec.kind === "comet" && (
          <g filter={`url(#${fTex})`} opacity="0.5">
            <rect x="-30" y="-30" width="260" height="260" fill="#cfe9ff" />
          </g>
        )}

        {spec.craters && <Craters craters={spec.craters} />}

        {spec.spot && (
          <g>
            <ellipse
              cx={spec.spot.x}
              cy={spec.spot.y}
              rx={spec.spot.rx}
              ry={spec.spot.ry}
              fill={spec.spot.color}
              opacity="0.9"
            />
            {spec.spot.ring && (
              <ellipse
                cx={spec.spot.x}
                cy={spec.spot.y}
                rx={spec.spot.rx + 6}
                ry={spec.spot.ry + 4}
                fill="none"
                stroke={spec.spot.ring}
                strokeWidth="2.5"
                opacity="0.55"
              />
            )}
          </g>
        )}

        {/* pencahayaan bola */}
        <rect x="0" y="0" width="200" height="200" fill={`url(#${gShade})`} />
        <rect x="0" y="0" width="200" height="200" fill={`url(#${gTerm})`} />

        {/* kilau tepi atmosfer */}
        {spec.glow && spec.kind !== "sun" && (
          <circle
            cx={dir === 0 ? C : C}
            cy={C}
            r={R - 1}
            fill="none"
            stroke={spec.glow}
            strokeWidth="2"
            opacity="0.35"
          />
        )}
      </g>

      {/* cincin depan */}
      {showRing && (
        <g clipPath={`url(#${ringFront})`}>
          <ellipse
            cx={C}
            cy={C}
            rx={R + 40}
            ry={(R + 40) * 0.26}
            fill="none"
            stroke="#e5d3a5"
            strokeWidth="13"
            opacity="0.8"
          />
          <ellipse
            cx={C}
            cy={C}
            rx={R + 24}
            ry={(R + 24) * 0.26}
            fill="none"
            stroke="#fdf3d6"
            strokeWidth="8"
            opacity="0.9"
          />
          <ellipse
            cx={C}
            cy={C}
            rx={R + 33}
            ry={(R + 33) * 0.26}
            fill="none"
            stroke="#8d7a4f"
            strokeWidth="3"
            opacity="0.55"
          />
        </g>
      )}

      {/* tepi luar */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="#0b1220" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}
