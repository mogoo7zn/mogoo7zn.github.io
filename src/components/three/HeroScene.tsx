import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

/* =====================================================================
   Helper: deterministic pseudo-random (shader-style hash)
   ===================================================================== */
const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/* =====================================================================
   FingerChain — 3-segment articulated finger with proper mesh wireframe.
   Each segment is a subdivided BoxGeometry (triangulated mesh visible).
   Joints are icosahedron wireframes for a mechanical look.
   ===================================================================== */
function FingerChain({
  base,
  lens,
  segRefs,
  startIdx,
  wire,
  fill,
  joint,
}: {
  base: [number, number, number];
  lens: [number, number, number];
  segRefs: React.MutableRefObject<(THREE.Group | null)[]>;
  startIdx: number;
  wire: THREE.Material;
  fill: THREE.Material;
  joint: THREE.Material;
}) {
  return (
    <group position={base}>
      <group
        ref={(el) => {
          segRefs.current[startIdx] = el;
        }}
      >
        {/* Proximal phalanx */}
        <mesh position={[0, lens[0] / 2, 0]} material={wire}>
          <boxGeometry args={[0.11, lens[0], 0.09, 2, 3, 2]} />
        </mesh>
        <mesh position={[0, lens[0] / 2, 0]} material={fill}>
          <boxGeometry args={[0.11, lens[0], 0.09]} />
        </mesh>
        <mesh position={[0, lens[0], 0]} material={joint}>
          <icosahedronGeometry args={[0.035, 1]} />
        </mesh>

        <group
          position={[0, lens[0], 0]}
          ref={(el) => {
            segRefs.current[startIdx + 1] = el;
          }}
        >
          {/* Middle phalanx */}
          <mesh position={[0, lens[1] / 2, 0]} material={wire}>
            <boxGeometry args={[0.09, lens[1], 0.075, 2, 2, 2]} />
          </mesh>
          <mesh position={[0, lens[1] / 2, 0]} material={fill}>
            <boxGeometry args={[0.09, lens[1], 0.075]} />
          </mesh>
          <mesh position={[0, lens[1], 0]} material={joint}>
            <icosahedronGeometry args={[0.03, 1]} />
          </mesh>

          <group
            position={[0, lens[1], 0]}
            ref={(el) => {
              segRefs.current[startIdx + 2] = el;
            }}
          >
            {/* Distal phalanx */}
            <mesh position={[0, lens[2] / 2, 0]} material={wire}>
              <boxGeometry args={[0.07, lens[2], 0.06, 2, 2, 1]} />
            </mesh>
            <mesh position={[0, lens[2] / 2, 0]} material={fill}>
              <boxGeometry args={[0.07, lens[2], 0.06]} />
            </mesh>
            <mesh position={[0, lens[2], 0]} material={joint}>
              <octahedronGeometry args={[0.022, 0]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* =====================================================================
   RoboticHand — Forearm + Wrist + Palm + 5 articulated fingers.
   All built from THREE.js mesh primitives with wireframe: true
   for proper triangulated mesh outlines. Click toggles grip.
   ===================================================================== */
function RoboticHand({
  isDark,
  mouseRef,
  clickRef,
  dragRef,
  position,
}: {
  isDark: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  clickRef: React.MutableRefObject<{ x: number; y: number; time: number }>;
  dragRef: React.MutableRefObject<{
    active: number;
    dx: number;
    dy: number;
    totalX: number;
    totalY: number;
  }>;
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  // 4 fingers × 3 segments + thumb × 2 segments = 14 ref slots
  const segRefs = useRef<(THREE.Group | null)[]>(new Array(14).fill(null));
  const gripRef = useRef(0);
  const gripTarget = useRef(0);
  const lastClick = useRef(0);
  const hoverGlow = useRef(0);

  const mats = useMemo(() => {
    const c = isDark ? "#22D3EE" : "#6366F1";
    const a = isDark ? "#67E8F9" : "#818CF8";
    return {
      wire: new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      }),
      fill: new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.035,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      joint: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    };
  }, [isDark]);

  const dragRotY = useRef(0);
  const dragRotX = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Click proximity → toggle grip
    const cx = clickRef.current.x * 7;
    const cy = clickRef.current.y * 5;
    const cd = Math.sqrt((cx - position[0]) ** 2 + (cy - position[1]) ** 2);
    if (clickRef.current.time > lastClick.current && cd < 4) {
      lastClick.current = clickRef.current.time;
      gripTarget.current = gripTarget.current < 0.5 ? 1 : 0;
    }

    // Drag rotation — check if drag is near this object
    const drag = dragRef.current;
    if (drag.active === 1) {
      const dmx = drag.dx !== undefined ? drag.dx : 0;
      const dmy = drag.dy !== undefined ? drag.dy : 0;
      // Only apply drag if started near this object
      const startX = (mouseRef.current.x - dmx) * 7;
      const startY = (mouseRef.current.y + dmy) * 5;
      const distStart = Math.sqrt(
        (startX - position[0]) ** 2 + (startY - position[1]) ** 2,
      );
      if (distStart < 5) {
        dragRotY.current += dmx * 3;
        dragRotX.current -= dmy * 3;
      }
    }
    // Slow decay of drag rotation
    dragRotY.current *= 0.995;
    dragRotX.current *= 0.995;

    // Smooth grip interpolation
    gripRef.current += (gripTarget.current - gripRef.current) * 0.03;
    const g = gripRef.current;

    // Animate 4 finger chains — kinematic curl
    for (let f = 0; f < 4; f++) {
      for (let s = 0; s < 3; s++) {
        const ref = segRefs.current[f * 3 + s];
        if (ref) ref.rotation.x = -g * (0.38 + s * 0.38);
      }
    }
    // Thumb curl
    if (segRefs.current[12]) segRefs.current[12]!.rotation.z = g * 0.6;
    if (segRefs.current[13]) segRefs.current[13]!.rotation.z = g * 0.45;

    // Hover glow
    const mdx = mx * 7 - position[0];
    const mdy = my * 5 - position[1];
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    hoverGlow.current += ((md < 3.5 ? 1 : 0) - hoverGlow.current) * 0.04;
    const h = hoverGlow.current;

    mats.wire.opacity = 0.34 + h * 0.3;
    mats.fill.opacity = 0.03 + h * 0.04;
    mats.joint.opacity = 0.5 + h * 0.35;

    // Tilt following mouse + drag rotation
    const targetRotY = t * 0.05 + mx * 0.25 + dragRotY.current;
    const targetRotX = Math.sin(t * 0.1) * 0.05 - my * 0.12 + dragRotX.current;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.025;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.025;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.25) * 0.06;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ---- Forearm ---- */}
      <mesh position={[0, -1.65, 0]} material={mats.wire}>
        <boxGeometry args={[0.48, 0.85, 0.24, 3, 5, 2]} />
      </mesh>
      <mesh position={[0, -1.65, 0]} material={mats.fill}>
        <boxGeometry args={[0.48, 0.85, 0.24]} />
      </mesh>
      {/* Forearm detail bands */}
      <mesh
        position={[0, -1.4, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mats.joint}
      >
        <torusGeometry args={[0.18, 0.012, 4, 12]} />
      </mesh>
      <mesh
        position={[0, -1.9, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mats.joint}
      >
        <torusGeometry args={[0.2, 0.012, 4, 12]} />
      </mesh>

      {/* ---- Wrist joint ring ---- */}
      <mesh
        position={[0, -1.18, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mats.joint}
      >
        <torusGeometry args={[0.22, 0.025, 8, 16]} />
      </mesh>

      {/* ---- Palm ---- */}
      <mesh position={[0, -0.55, 0]} material={mats.wire}>
        <boxGeometry args={[0.65, 0.85, 0.2, 4, 5, 2]} />
      </mesh>
      <mesh position={[0, -0.55, 0]} material={mats.fill}>
        <boxGeometry args={[0.65, 0.85, 0.2]} />
      </mesh>
      {/* Palm sensor details */}
      <mesh position={[0, -0.5, 0.105]} material={mats.joint}>
        <ringGeometry args={[0.06, 0.1, 6]} />
      </mesh>
      <mesh position={[0, -0.7, 0.105]} material={mats.joint}>
        <ringGeometry args={[0.03, 0.055, 6]} />
      </mesh>

      {/* ---- Knuckle joints ---- */}
      {[-0.22, -0.07, 0.07, 0.22].map((x, i) => (
        <mesh key={`kn-${i}`} position={[x, -0.08, 0]} material={mats.joint}>
          <icosahedronGeometry args={[0.042, 1]} />
        </mesh>
      ))}

      {/* ---- Fingers: Index, Middle, Ring, Pinky ---- */}
      <FingerChain
        base={[-0.22, -0.08, 0]}
        lens={[0.3, 0.24, 0.18]}
        segRefs={segRefs}
        startIdx={0}
        wire={mats.wire}
        fill={mats.fill}
        joint={mats.joint}
      />
      <FingerChain
        base={[-0.07, -0.03, 0]}
        lens={[0.34, 0.27, 0.21]}
        segRefs={segRefs}
        startIdx={3}
        wire={mats.wire}
        fill={mats.fill}
        joint={mats.joint}
      />
      <FingerChain
        base={[0.07, -0.05, 0]}
        lens={[0.32, 0.25, 0.19]}
        segRefs={segRefs}
        startIdx={6}
        wire={mats.wire}
        fill={mats.fill}
        joint={mats.joint}
      />
      <FingerChain
        base={[0.22, -0.1, 0]}
        lens={[0.26, 0.21, 0.16]}
        segRefs={segRefs}
        startIdx={9}
        wire={mats.wire}
        fill={mats.fill}
        joint={mats.joint}
      />

      {/* ---- Thumb ---- */}
      <group position={[-0.36, -0.5, 0.08]} rotation={[0, 0, 0.35]}>
        <mesh material={mats.joint}>
          <icosahedronGeometry args={[0.04, 1]} />
        </mesh>
        <group
          ref={(el) => {
            segRefs.current[12] = el;
          }}
        >
          <mesh position={[0, 0.16, 0]} material={mats.wire}>
            <boxGeometry args={[0.13, 0.32, 0.11, 2, 3, 2]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={mats.fill}>
            <boxGeometry args={[0.13, 0.32, 0.11]} />
          </mesh>
          <mesh position={[0, 0.32, 0]} material={mats.joint}>
            <icosahedronGeometry args={[0.035, 1]} />
          </mesh>
          <group
            position={[0, 0.32, 0]}
            ref={(el) => {
              segRefs.current[13] = el;
            }}
          >
            <mesh position={[0, 0.13, 0]} material={mats.wire}>
              <boxGeometry args={[0.11, 0.26, 0.09, 2, 2, 2]} />
            </mesh>
            <mesh position={[0, 0.13, 0]} material={mats.fill}>
              <boxGeometry args={[0.11, 0.26, 0.09]} />
            </mesh>
            <mesh position={[0, 0.26, 0]} material={mats.joint}>
              <octahedronGeometry args={[0.026, 0]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* =====================================================================
   SciFiDevice — Gyroscope-style device with 3 rotating torus rings,
   central icosahedron core, antenna/sensor protrusions, and side arms.
   All mesh primitives with wireframe. Click reverses spin direction.
   ===================================================================== */
function SciFiDevice({
  isDark,
  mouseRef,
  clickRef,
  dragRef,
  position,
}: {
  isDark: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  clickRef: React.MutableRefObject<{ x: number; y: number; time: number }>;
  dragRef: React.MutableRefObject<{
    active: number;
    dx: number;
    dy: number;
    totalX: number;
    totalY: number;
  }>;
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const spinDir = useRef(1);
  const lastClick = useRef(0);
  const hoverGlow = useRef(0);
  const dragRotY = useRef(0);
  const dragRotX = useRef(0);

  const mats = useMemo(() => {
    const c = isDark ? "#22D3EE" : "#6366F1";
    const a = isDark ? "#67E8F9" : "#818CF8";
    return {
      wire: new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
      fill: new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.025,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      ring: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
      core: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
      accent: new THREE.MeshBasicMaterial({
        color: a,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    };
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const d = spinDir.current;

    // Click → reverse spin
    const cx = clickRef.current.x * 7;
    const cy = clickRef.current.y * 5;
    const cd = Math.sqrt((cx - position[0]) ** 2 + (cy - position[1]) ** 2);
    if (clickRef.current.time > lastClick.current && cd < 4) {
      lastClick.current = clickRef.current.time;
      spinDir.current *= -1;
    }

    // Drag rotation
    const drag = dragRef.current;
    if (drag.active === 1) {
      const startX = (mouseRef.current.x - drag.dx) * 7;
      const startY = (mouseRef.current.y + drag.dy) * 5;
      const distStart = Math.sqrt(
        (startX - position[0]) ** 2 + (startY - position[1]) ** 2,
      );
      if (distStart < 5) {
        dragRotY.current += drag.dx * 3;
        dragRotX.current -= drag.dy * 3;
      }
    }
    dragRotY.current *= 0.995;
    dragRotX.current *= 0.995;

    // Ring rotations
    if (ring1.current) ring1.current.rotation.y += 0.004 * d;
    if (ring2.current) ring2.current.rotation.x += 0.005 * d;
    if (ring3.current) {
      ring3.current.rotation.y -= 0.003 * d;
      ring3.current.rotation.z += 0.002 * d;
    }

    // Core gentle pulse
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      coreRef.current.scale.setScalar(s);
    }

    // Hover glow
    const mdx = mx * 7 - position[0];
    const mdy = my * 5 - position[1];
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    hoverGlow.current += ((md < 3.5 ? 1 : 0) - hoverGlow.current) * 0.04;
    const h = hoverGlow.current;

    mats.wire.opacity = 0.28 + h * 0.25;
    mats.fill.opacity = 0.02 + h * 0.04;
    mats.ring.opacity = 0.38 + h * 0.3;
    mats.core.opacity = 0.5 + h * 0.35;
    mats.accent.opacity = 0.05 + h * 0.06;

    // Tilt following mouse + drag
    groupRef.current.rotation.y +=
      (t * 0.03 * d +
        mx * 0.2 +
        dragRotY.current -
        groupRef.current.rotation.y) *
      0.025;
    groupRef.current.rotation.x +=
      (Math.sin(t * 0.08) * 0.05 -
        my * 0.1 +
        dragRotX.current -
        groupRef.current.rotation.x) *
      0.025;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ---- Central core ---- */}
      <mesh ref={coreRef} material={mats.core}>
        <icosahedronGeometry args={[0.35, 1]} />
      </mesh>
      <mesh material={mats.accent}>
        <icosahedronGeometry args={[0.35, 1]} />
      </mesh>

      {/* ---- Ring 1 — horizontal, largest ---- */}
      <group ref={ring1}>
        <mesh material={mats.ring}>
          <torusGeometry args={[0.9, 0.028, 8, 36]} />
        </mesh>
        <mesh material={mats.fill}>
          <torusGeometry args={[0.9, 0.028, 4, 18]} />
        </mesh>
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((a, i) => (
          <mesh
            key={`r1-${i}`}
            position={[Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9]}
            material={mats.core}
          >
            <octahedronGeometry args={[0.04, 0]} />
          </mesh>
        ))}
      </group>

      {/* ---- Ring 2 — tilted 60° ---- */}
      <group ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <mesh material={mats.ring}>
          <torusGeometry args={[0.72, 0.022, 8, 30]} />
        </mesh>
        <mesh material={mats.fill}>
          <torusGeometry args={[0.72, 0.022, 4, 15]} />
        </mesh>
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((a, i) => (
          <mesh
            key={`r2-${i}`}
            position={[Math.cos(a) * 0.72, 0, Math.sin(a) * 0.72]}
            material={mats.core}
          >
            <octahedronGeometry args={[0.03, 0]} />
          </mesh>
        ))}
      </group>

      {/* ---- Ring 3 — tilted 120° ---- */}
      <group ref={ring3} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <mesh material={mats.ring}>
          <torusGeometry args={[1.05, 0.02, 8, 40]} />
        </mesh>
        <mesh material={mats.fill}>
          <torusGeometry args={[1.05, 0.02, 4, 20]} />
        </mesh>
      </group>

      {/* ---- Top antenna / sensor ---- */}
      <mesh position={[0, 0.42, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.025, 0.04, 0.5, 6, 3]} />
      </mesh>
      <mesh position={[0, 0.42, 0]} material={mats.fill}>
        <cylinderGeometry args={[0.025, 0.04, 0.5, 3, 1]} />
      </mesh>
      <mesh position={[0, 0.75, 0]} material={mats.core}>
        <octahedronGeometry args={[0.055, 0]} />
      </mesh>
      <mesh position={[0, 0.95, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.012, 0.018, 0.3, 4, 2]} />
      </mesh>
      <mesh position={[0, 1.15, 0]} material={mats.core}>
        <tetrahedronGeometry args={[0.035, 0]} />
      </mesh>

      {/* ---- Bottom actuator ---- */}
      <mesh position={[0, -0.42, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.04, 0.025, 0.5, 6, 3]} />
      </mesh>
      <mesh position={[0, -0.42, 0]} material={mats.fill}>
        <cylinderGeometry args={[0.04, 0.025, 0.5, 3, 1]} />
      </mesh>
      <mesh position={[0, -0.75, 0]} material={mats.core}>
        <octahedronGeometry args={[0.05, 0]} />
      </mesh>

      {/* ---- Side arm left ---- */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh position={[0, 0.58, 0]} material={mats.wire}>
          <cylinderGeometry args={[0.02, 0.032, 0.75, 6, 3]} />
        </mesh>
        <mesh position={[0, 0.58, 0]} material={mats.fill}>
          <cylinderGeometry args={[0.02, 0.032, 0.75, 3, 1]} />
        </mesh>
        <mesh position={[0, 1.0, 0]} material={mats.core}>
          <dodecahedronGeometry args={[0.05, 0]} />
        </mesh>
      </group>

      {/* ---- Side arm right ---- */}
      <group rotation={[0, 0, -Math.PI / 2]}>
        <mesh position={[0, 0.58, 0]} material={mats.wire}>
          <cylinderGeometry args={[0.02, 0.032, 0.75, 6, 3]} />
        </mesh>
        <mesh position={[0, 0.58, 0]} material={mats.fill}>
          <cylinderGeometry args={[0.02, 0.032, 0.75, 3, 1]} />
        </mesh>
        <mesh position={[0, 1.0, 0]} material={mats.core}>
          <dodecahedronGeometry args={[0.05, 0]} />
        </mesh>
      </group>
    </group>
  );
}

/* =====================================================================
   TechDecorations — Small floating wireframe shapes scattered in the
   background for a subtle sci-fi atmosphere. Octahedrons, torus rings,
   cubes, hexagonal prisms, and glowing dots with parallax drift.
   ===================================================================== */
function TechDecorations({
  isDark,
  mouseRef,
  count = 18,
}: {
  isDark: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  count?: number;
}) {
  const color = isDark ? "#22D3EE" : "#6366F1";
  const dotColor = isDark ? "#164E63" : "#C7D2FE";

  const items = useMemo(() => {
    const types = ["oct", "ring", "cube", "hex", "dot"] as const;
    return Array.from({ length: count }, (_, i) => ({
      pos: [
        (hash(i * 3) - 0.5) * 16,
        (hash(i * 3 + 1) - 0.5) * 9,
        (hash(i * 3 + 2) - 0.5) * 6 - 3,
      ] as [number, number, number],
      type: types[i % 5],
      scale: 0.025 + hash(i * 7) * 0.055,
      speed: 0.08 + hash(i * 11) * 0.12,
      phase: hash(i * 13) * Math.PI * 2,
      rotSpeed: [
        (hash(i * 17) - 0.5) * 0.4,
        (hash(i * 19) - 0.5) * 0.4,
        (hash(i * 23) - 0.5) * 0.3,
      ] as [number, number, number],
    }));
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
    [color],
  );

  const dotMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: dotColor,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
    [dotColor],
  );

  const refs = useRef<(THREE.Mesh | null)[]>(new Array(count).fill(null));

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < items.length; i++) {
      const ref = refs.current[i];
      if (!ref) continue;
      const item = items[i];

      // Float + parallax (deeper items move less)
      const depth = (item.pos[2] + 6) / 12;
      ref.position.x =
        item.pos[0] +
        Math.sin(t * item.speed + item.phase) * 0.12 +
        mx * (0.08 + depth * 0.15);
      ref.position.y =
        item.pos[1] +
        Math.cos(t * item.speed * 0.7 + item.phase) * 0.08 +
        my * (0.05 + depth * 0.1);
      ref.position.z = item.pos[2];

      ref.rotation.x += item.rotSpeed[0] * 0.002;
      ref.rotation.y += item.rotSpeed[1] * 0.002;
      ref.rotation.z += item.rotSpeed[2] * 0.002;
    }

    dotMat.opacity = 0.14 + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group>
      {items.map((item, i) => {
        const m = item.type === "dot" ? dotMat : mat;
        const s = item.scale;
        const p = item.pos;

        switch (item.type) {
          case "oct":
            return (
              <mesh
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                position={p}
                scale={s}
                material={m}
              >
                <octahedronGeometry args={[1, 0]} />
              </mesh>
            );
          case "ring":
            return (
              <mesh
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                position={p}
                scale={s}
                material={m}
              >
                <torusGeometry args={[1, 0.25, 6, 8]} />
              </mesh>
            );
          case "cube":
            return (
              <mesh
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                position={p}
                scale={s}
                material={m}
              >
                <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
              </mesh>
            );
          case "hex":
            return (
              <mesh
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                position={p}
                scale={s}
                material={m}
              >
                <cylinderGeometry args={[1, 1, 0.4, 6, 1]} />
              </mesh>
            );
          case "dot":
            return (
              <mesh
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                position={p}
                scale={s * 0.5}
                material={m}
              >
                <sphereGeometry args={[1, 4, 4]} />
              </mesh>
            );
        }
      })}
    </group>
  );
}

/* =====================================================================
   FloatingDrone — An AI Drone / floating robot with propellers,
   camera eye, body frame, antenna, and scanning beam.
   Click toggles scanning mode. Drag to rotate.
   ===================================================================== */
function FloatingDrone({
  isDark,
  mouseRef,
  clickRef,
  dragRef,
  position,
}: {
  isDark: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  clickRef: React.MutableRefObject<{ x: number; y: number; time: number }>;
  dragRef: React.MutableRefObject<{
    active: number;
    dx: number;
    dy: number;
    totalX: number;
    totalY: number;
  }>;
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const prop1 = useRef<THREE.Group>(null);
  const prop2 = useRef<THREE.Group>(null);
  const prop3 = useRef<THREE.Group>(null);
  const prop4 = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const eyeRef = useRef<THREE.Mesh>(null);
  const lastClick = useRef(0);
  const scanning = useRef(0);
  const scanTarget = useRef(0);
  const hoverGlow = useRef(0);
  const dragRotY = useRef(0);
  const dragRotX = useRef(0);

  const mats = useMemo(() => {
    const c = isDark ? "#22D3EE" : "#6366F1";
    const a = isDark ? "#67E8F9" : "#818CF8";
    const e = isDark ? "#F472B6" : "#EC4899";
    return {
      wire: new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
      fill: new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.03,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      joint: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
      eye: new THREE.MeshBasicMaterial({
        color: e,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
      eyeFill: new THREE.MeshBasicMaterial({
        color: e,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
      scan: new THREE.MeshBasicMaterial({
        color: e,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      prop: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    };
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Click → toggle scan mode
    const cx = clickRef.current.x * 7;
    const cy = clickRef.current.y * 5;
    const cd = Math.sqrt((cx - position[0]) ** 2 + (cy - position[1]) ** 2);
    if (clickRef.current.time > lastClick.current && cd < 4) {
      lastClick.current = clickRef.current.time;
      scanTarget.current = scanTarget.current < 0.5 ? 1 : 0;
    }
    scanning.current += (scanTarget.current - scanning.current) * 0.03;
    const sc = scanning.current;

    // Drag rotation
    const drag = dragRef.current;
    if (drag.active === 1) {
      const startX = (mouseRef.current.x - drag.dx) * 7;
      const startY = (mouseRef.current.y + drag.dy) * 5;
      const distStart = Math.sqrt(
        (startX - position[0]) ** 2 + (startY - position[1]) ** 2,
      );
      if (distStart < 5) {
        dragRotY.current += drag.dx * 3;
        dragRotX.current -= drag.dy * 3;
      }
    }
    dragRotY.current *= 0.995;
    dragRotX.current *= 0.995;

    // Propeller spin
    const propSpeed = 0.15 + sc * 0.1;
    if (prop1.current) prop1.current.rotation.y += propSpeed;
    if (prop2.current) prop2.current.rotation.y += propSpeed;
    if (prop3.current) prop3.current.rotation.y -= propSpeed;
    if (prop4.current) prop4.current.rotation.y -= propSpeed;

    // Scan cone visibility
    if (scanRef.current) {
      mats.scan.opacity = sc * 0.12 * (0.7 + Math.sin(t * 3) * 0.3);
      scanRef.current.rotation.y = t * 0.5;
    }

    // Eye pulse
    if (eyeRef.current) {
      const eyeScale = 1 + Math.sin(t * 2) * 0.08 + sc * 0.15;
      eyeRef.current.scale.setScalar(eyeScale);
      mats.eye.opacity = 0.6 + sc * 0.3 + Math.sin(t * 3) * 0.1;
      mats.eyeFill.opacity = 0.05 + sc * 0.1;
    }

    // Hover glow
    const mdx = mx * 7 - position[0];
    const mdy = my * 5 - position[1];
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    hoverGlow.current += ((md < 3.5 ? 1 : 0) - hoverGlow.current) * 0.04;
    const h = hoverGlow.current;

    mats.wire.opacity = 0.3 + h * 0.3;
    mats.fill.opacity = 0.025 + h * 0.04;
    mats.joint.opacity = 0.5 + h * 0.3;
    mats.prop.opacity = 0.35 + h * 0.25;

    // Float + tilt + drag
    const targetRotY = t * 0.04 + mx * 0.2 + dragRotY.current;
    const targetRotX = Math.sin(t * 0.12) * 0.08 - my * 0.1 + dragRotX.current;
    const tiltZ = Math.sin(t * 0.15) * 0.04;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.025;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.025;
    groupRef.current.rotation.z += (tiltZ - groupRef.current.rotation.z) * 0.02;
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.3) * 0.1 + sc * 0.05;
  });

  const armOffset = 0.55;
  const armLen = 0.55;

  return (
    <group ref={groupRef} position={position}>
      {/* ---- Central body (octagonal frame) ---- */}
      <mesh material={mats.wire}>
        <cylinderGeometry args={[0.35, 0.3, 0.2, 8, 2]} />
      </mesh>
      <mesh material={mats.fill}>
        <cylinderGeometry args={[0.35, 0.3, 0.2, 8, 1]} />
      </mesh>
      {/* Top plate */}
      <mesh position={[0, 0.12, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.32, 0.35, 0.04, 8, 1]} />
      </mesh>
      {/* Bottom plate */}
      <mesh position={[0, -0.12, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.3, 0.28, 0.04, 8, 1]} />
      </mesh>

      {/* ---- Eye / Camera (front) ---- */}
      <group position={[0, 0, 0.32]}>
        <mesh ref={eyeRef} material={mats.eye}>
          <sphereGeometry args={[0.1, 8, 6]} />
        </mesh>
        <mesh material={mats.eyeFill}>
          <sphereGeometry args={[0.1, 6, 4]} />
        </mesh>
        {/* Eye ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.joint}>
          <torusGeometry args={[0.14, 0.015, 6, 12]} />
        </mesh>
        {/* Lens detail */}
        <mesh position={[0, 0, 0.08]} material={mats.eye}>
          <ringGeometry args={[0.02, 0.05, 6]} />
        </mesh>
      </group>

      {/* ---- Scan cone (visible when scanning) ---- */}
      <mesh
        ref={scanRef}
        position={[0, -0.6, 0.2]}
        rotation={[-0.3, 0, 0]}
        material={mats.scan}
      >
        <coneGeometry args={[0.8, 1.2, 8, 1, true]} />
      </mesh>

      {/* ---- 4 Arms with propellers ---- */}
      {[
        { px: armOffset, pz: armOffset, propRef: prop1 },
        { px: -armOffset, pz: armOffset, propRef: prop2 },
        { px: armOffset, pz: -armOffset, propRef: prop3 },
        { px: -armOffset, pz: -armOffset, propRef: prop4 },
      ].map(({ px, pz, propRef }, i) => {
        const angle = Math.atan2(pz, px);
        return (
          <group key={`arm-${i}`}>
            {/* Arm strut */}
            <mesh
              position={[px * 0.5, 0, pz * 0.5]}
              rotation={[0, -angle, 0]}
              material={mats.wire}
            >
              <boxGeometry args={[armLen, 0.06, 0.06, 3, 1, 1]} />
            </mesh>
            {/* Motor housing */}
            <mesh position={[px, 0.06, pz]} material={mats.joint}>
              <cylinderGeometry args={[0.08, 0.08, 0.1, 6, 1]} />
            </mesh>
            {/* Propeller group (both blades rotate together) */}
            <group ref={propRef} position={[px, 0.14, pz]}>
              <mesh material={mats.prop}>
                <boxGeometry args={[0.5, 0.015, 0.06, 3, 1, 1]} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]} material={mats.prop}>
                <boxGeometry args={[0.5, 0.015, 0.06, 3, 1, 1]} />
              </mesh>
            </group>
            {/* Landing leg */}
            <mesh position={[px * 0.7, -0.22, pz * 0.7]} material={mats.wire}>
              <cylinderGeometry args={[0.015, 0.025, 0.2, 4, 1]} />
            </mesh>
            <mesh position={[px * 0.7, -0.34, pz * 0.7]} material={mats.joint}>
              <sphereGeometry args={[0.025, 4, 3]} />
            </mesh>
          </group>
        );
      })}

      {/* ---- Antenna on top ---- */}
      <mesh position={[0, 0.24, 0]} material={mats.wire}>
        <cylinderGeometry args={[0.012, 0.02, 0.25, 4, 2]} />
      </mesh>
      <mesh position={[0, 0.4, 0]} material={mats.joint}>
        <octahedronGeometry args={[0.03, 0]} />
      </mesh>

      {/* ---- Side sensor pods ---- */}
      {[-1, 1].map((side) => (
        <group key={`sensor-${side}`} position={[side * 0.38, 0, 0]}>
          <mesh material={mats.joint}>
            <boxGeometry args={[0.06, 0.12, 0.08, 1, 2, 1]} />
          </mesh>
          <mesh position={[side * 0.04, 0, 0]} material={mats.eye}>
            <sphereGeometry args={[0.02, 4, 3]} />
          </mesh>
        </group>
      ))}

      {/* ---- Decorative bottom ring ---- */}
      <mesh
        position={[0, -0.14, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mats.joint}
      >
        <torusGeometry args={[0.22, 0.012, 6, 10]} />
      </mesh>
    </group>
  );
}

/* =====================================================================
   SHAPE DEFINITIONS for Projection2D3D — 3 embodied-AI forms.
   Each shape is an array of line-segments [x1,y1,z1,x2,y2,z2].
   All padded to SEG_COUNT for smooth morph interpolation.
   ===================================================================== */
const SEG_COUNT = 72;

function _box(
  cx: number,
  cy: number,
  cz: number,
  w: number,
  h: number,
  d: number,
): number[][] {
  const [x0, x1] = [cx - w / 2, cx + w / 2];
  const [y0, y1] = [cy - h / 2, cy + h / 2];
  const [z0, z1] = [cz - d / 2, cz + d / 2];
  return [
    [x0, y0, z0, x1, y0, z0],
    [x1, y0, z0, x1, y0, z1],
    [x1, y0, z1, x0, y0, z1],
    [x0, y0, z1, x0, y0, z0],
    [x0, y1, z0, x1, y1, z0],
    [x1, y1, z0, x1, y1, z1],
    [x1, y1, z1, x0, y1, z1],
    [x0, y1, z1, x0, y1, z0],
    [x0, y0, z0, x0, y1, z0],
    [x1, y0, z0, x1, y1, z0],
    [x1, y0, z1, x1, y1, z1],
    [x0, y0, z1, x0, y1, z1],
  ];
}

function _pad(segs: number[][], n: number): number[][] {
  const last = segs[segs.length - 1] || [0, 0, 0, 0, 0, 0];
  const mx = (last[0] + last[3]) / 2,
    my = (last[1] + last[4]) / 2,
    mz = (last[2] + last[5]) / 2;
  while (segs.length < n) segs.push([mx, my, mz, mx, my, mz]);
  return segs.slice(0, n);
}

function _poly(
  cx: number,
  cy: number,
  cz: number,
  r: number,
  n: number,
  axis: "x" | "y" | "z",
): number[][] {
  const segs: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a1 = (i / n) * Math.PI * 2;
    const a2 = ((i + 1) / n) * Math.PI * 2;
    const c1 = Math.cos(a1) * r,
      s1 = Math.sin(a1) * r;
    const c2 = Math.cos(a2) * r,
      s2 = Math.sin(a2) * r;
    if (axis === "y") segs.push([cx + c1, cy, cz + s1, cx + c2, cy, cz + s2]);
    else if (axis === "x")
      segs.push([cx, cy + c1, cz + s1, cx, cy + c2, cz + s2]);
    else segs.push([cx + c1, cy + s1, cz, cx + c2, cy + s2, cz]);
  }
  return segs;
}

/* Shape 1: Quadruped Robot — Spot-style robot dog with detailed frame */
function _quadruped(): number[][] {
  const s: number[][] = [];
  // Body chassis
  s.push(..._box(0, 0.05, 0, 0.48, 0.11, 0.18));
  // Internal frame ribs
  s.push([0.1, -0.005, -0.09, 0.1, 0.105, -0.09]);
  s.push([-0.06, -0.005, -0.09, -0.06, 0.105, -0.09]);
  s.push([0.1, -0.005, 0.09, 0.1, 0.105, 0.09]);
  // Head module
  s.push(..._box(0.32, 0.11, 0, 0.11, 0.09, 0.11));
  // Neck connectors
  s.push([0.24, 0.07, -0.04, 0.265, 0.08, -0.04]);
  s.push([0.24, 0.07, 0.04, 0.265, 0.08, 0.04]);
  // LIDAR dome (hexagonal)
  s.push(..._poly(0.32, 0.155, 0, 0.035, 6, "y"));
  // Sensor eyes
  s.push([0.375, 0.13, -0.025, 0.375, 0.13, -0.005]);
  s.push([0.375, 0.13, 0.005, 0.375, 0.13, 0.025]);
  // Front-left leg: hip-upper-knee-lower-foot
  s.push([0.15, -0.005, -0.09, 0.15, -0.1, -0.095]);
  s.push([0.14, -0.1, -0.095, 0.16, -0.1, -0.095]);
  s.push([0.15, -0.1, -0.095, 0.14, -0.24, -0.095]);
  s.push([0.12, -0.24, -0.095, 0.17, -0.24, -0.095]);
  // Front-right leg
  s.push([0.15, -0.005, 0.09, 0.15, -0.1, 0.095]);
  s.push([0.14, -0.1, 0.095, 0.16, -0.1, 0.095]);
  s.push([0.15, -0.1, 0.095, 0.14, -0.24, 0.095]);
  s.push([0.12, -0.24, 0.095, 0.17, -0.24, 0.095]);
  // Rear-left leg
  s.push([-0.15, -0.005, -0.09, -0.15, -0.1, -0.095]);
  s.push([-0.16, -0.1, -0.095, -0.14, -0.1, -0.095]);
  s.push([-0.15, -0.1, -0.095, -0.16, -0.24, -0.095]);
  s.push([-0.18, -0.24, -0.095, -0.13, -0.24, -0.095]);
  // Rear-right leg
  s.push([-0.15, -0.005, 0.09, -0.15, -0.1, 0.095]);
  s.push([-0.16, -0.1, 0.095, -0.14, -0.1, 0.095]);
  s.push([-0.15, -0.1, 0.095, -0.16, -0.24, 0.095]);
  s.push([-0.18, -0.24, 0.095, -0.13, -0.24, 0.095]);
  // Tail (antenna-like)
  s.push([-0.24, 0.08, 0, -0.3, 0.16, 0]);
  s.push([-0.3, 0.16, 0, -0.34, 0.22, 0]);
  // Top sensor pack
  s.push([-0.08, 0.105, -0.06, 0.08, 0.105, -0.06]);
  s.push([0.08, 0.105, -0.06, 0.08, 0.105, 0.06]);
  s.push([0.08, 0.105, 0.06, -0.08, 0.105, 0.06]);
  s.push([-0.08, 0.105, 0.06, -0.08, 0.105, -0.06]);
  s.push([-0.08, 0.105, -0.06, -0.08, 0.13, -0.06]);
  s.push([0.08, 0.105, -0.06, 0.08, 0.13, -0.06]);
  // Belly crossbar + hip joint indicators
  s.push([0.1, -0.005, 0, -0.1, -0.005, 0]);
  s.push([0.17, 0.01, -0.09, 0.13, -0.02, -0.09]);
  s.push([0.17, 0.01, 0.09, 0.13, -0.02, 0.09]);
  s.push([-0.17, 0.01, -0.09, -0.13, -0.02, -0.09]);
  s.push([-0.17, 0.01, 0.09, -0.13, -0.02, 0.09]);
  return _pad(s, SEG_COUNT);
}

/* Shape 2: Humanoid Robot — detailed humanoid with articulated joints */
function _humanoid(): number[][] {
  const s: number[][] = [];
  // Head (octagonal ring face)
  s.push(..._poly(0, 0.35, 0, 0.045, 8, "z"));
  s.push([0, 0.395, -0.045, 0, 0.395, 0.045]);
  s.push([0, 0.305, -0.045, 0, 0.305, 0.045]);
  s.push([-0.045, 0.35, -0.045, -0.045, 0.35, 0.045]);
  s.push([0.045, 0.35, -0.045, 0.045, 0.35, 0.045]);
  // Visor slit
  s.push([-0.035, 0.36, 0.046, 0.035, 0.36, 0.046]);
  // Neck
  s.push([0, 0.305, 0, 0, 0.28, 0]);
  // Torso
  s.push(..._box(0, 0.18, 0, 0.16, 0.2, 0.09));
  // Chest reactor ring (hexagonal)
  s.push(..._poly(0, 0.2, 0.046, 0.035, 6, "z"));
  // Shoulder mounts
  s.push([0.08, 0.26, 0, 0.1, 0.26, 0]);
  s.push([-0.08, 0.26, 0, -0.1, 0.26, 0]);
  // Left arm: upper-elbow-forearm-hand
  s.push([0.1, 0.26, 0, 0.18, 0.2, -0.01]);
  s.push([0.17, 0.2, -0.01, 0.19, 0.2, -0.01]);
  s.push([0.18, 0.2, -0.01, 0.24, 0.1, 0]);
  s.push([0.24, 0.1, 0, 0.27, 0.06, 0.01]);
  // Right arm
  s.push([-0.1, 0.26, 0, -0.18, 0.2, -0.01]);
  s.push([-0.19, 0.2, -0.01, -0.17, 0.2, -0.01]);
  s.push([-0.18, 0.2, -0.01, -0.24, 0.1, 0]);
  s.push([-0.24, 0.1, 0, -0.27, 0.06, 0.01]);
  // Pelvis frame
  s.push([-0.06, 0.08, -0.04, 0.06, 0.08, -0.04]);
  s.push([0.06, 0.08, -0.04, 0.06, 0.08, 0.04]);
  s.push([0.06, 0.08, 0.04, -0.06, 0.08, 0.04]);
  s.push([-0.06, 0.08, 0.04, -0.06, 0.08, -0.04]);
  // Left leg: thigh-knee-shin-ankle-foot
  s.push([0.04, 0.08, 0, 0.05, -0.04, 0.01]);
  s.push([0.04, -0.04, 0.01, 0.06, -0.04, 0.01]);
  s.push([0.05, -0.04, 0.01, 0.05, -0.18, 0]);
  s.push([0.05, -0.18, 0, 0.045, -0.2, 0]);
  s.push([0.03, -0.2, 0, 0.08, -0.2, 0.01]);
  // Right leg
  s.push([-0.04, 0.08, 0, -0.05, -0.04, 0.01]);
  s.push([-0.06, -0.04, 0.01, -0.04, -0.04, 0.01]);
  s.push([-0.05, -0.04, 0.01, -0.05, -0.18, 0]);
  s.push([-0.05, -0.18, 0, -0.045, -0.2, 0]);
  s.push([-0.08, -0.2, 0, -0.03, -0.2, 0.01]);
  // Back power unit
  s.push([-0.04, 0.15, -0.045, 0.04, 0.15, -0.045]);
  s.push([0.04, 0.15, -0.045, 0.04, 0.24, -0.045]);
  s.push([0.04, 0.24, -0.045, -0.04, 0.24, -0.045]);
  s.push([-0.04, 0.24, -0.045, -0.04, 0.15, -0.045]);
  // Spine reinforcement
  s.push([0, 0.28, -0.045, 0, 0.12, -0.045]);
  return _pad(s, SEG_COUNT);
}

/* Shape 3: Drone / UAV — multi-rotor with gimbal camera and landing gear */
function _drone(): number[][] {
  const s: number[][] = [];
  // Central body (octagonal prism)
  s.push(..._poly(0, 0, 0, 0.1, 8, "y"));
  s.push(..._poly(0, -0.04, 0, 0.1, 8, "y"));
  // Vertical edges connecting top and bottom octagons
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    s.push([
      Math.cos(a) * 0.1,
      0,
      Math.sin(a) * 0.1,
      Math.cos(a) * 0.1,
      -0.04,
      Math.sin(a) * 0.1,
    ]);
  }
  // 4 arms to motors
  for (const [dx, dz] of [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ] as [number, number][]) {
    s.push([dx * 0.07, -0.02, dz * 0.07, dx * 0.3, -0.01, dz * 0.3]);
    s.push([dx * 0.28, -0.03, dz * 0.28, dx * 0.28, 0.03, dz * 0.28]);
    // Propeller cross
    s.push([dx * 0.3 - 0.08, 0.03, dz * 0.3, dx * 0.3 + 0.08, 0.03, dz * 0.3]);
    s.push([dx * 0.3, 0.03, dz * 0.3 - 0.08, dx * 0.3, 0.03, dz * 0.3 + 0.08]);
    // Motor housing (simplified square)
    s.push([
      dx * 0.3 - 0.03,
      0.015,
      dz * 0.3 - 0.03,
      dx * 0.3 + 0.03,
      0.015,
      dz * 0.3 - 0.03,
    ]);
    s.push([
      dx * 0.3 + 0.03,
      0.015,
      dz * 0.3 - 0.03,
      dx * 0.3 + 0.03,
      0.015,
      dz * 0.3 + 0.03,
    ]);
  }
  // Camera gimbal pod (underneath)
  s.push([0, -0.04, 0, 0, -0.08, 0.02]);
  s.push([-0.02, -0.08, 0.02, 0.02, -0.08, 0.02]);
  s.push([0, -0.08, 0.02, 0, -0.1, 0.04]);
  // GPS antenna (on top)
  s.push([0, 0, 0, 0, 0.08, 0]);
  s.push([-0.015, 0.08, 0, 0.015, 0.08, 0]);
  // Landing gear (2 skids)
  s.push([0.08, -0.04, -0.06, 0.08, -0.12, -0.06]);
  s.push([-0.08, -0.04, -0.06, -0.08, -0.12, -0.06]);
  s.push([0.08, -0.12, -0.06, -0.08, -0.12, -0.06]);
  s.push([0.08, -0.04, 0.06, 0.08, -0.12, 0.06]);
  s.push([-0.08, -0.04, 0.06, -0.08, -0.12, 0.06]);
  s.push([0.08, -0.12, 0.06, -0.08, -0.12, 0.06]);
  return _pad(s, SEG_COUNT);
}

const PROJ_SHAPES = [_quadruped(), _humanoid(), _drone()];

/* =====================================================================
   Projection2D3D — Enhanced 2D-3D holographic projection visualization.
   3D model auto-rotates showing true depth. 2D screen shows dynamic
   front-view projection. Rays connect corresponding points.
   Holographic platform + scanning effects. Click cycles through shapes.
   ===================================================================== */
function Projection2D3D({
  isDark,
  mouseRef,
  clickRef,
  dragRef,
  position,
}: {
  isDark: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  clickRef: React.MutableRefObject<{ x: number; y: number; time: number }>;
  dragRef: React.MutableRefObject<{
    active: number;
    dx: number;
    dy: number;
    totalX: number;
    totalY: number;
  }>;
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const lastClick = useRef(0);
  const shapeIdx = useRef(0);
  const prevIdx = useRef(0);
  const morph = useRef(1);
  const hoverGlow = useRef(0);
  const dragRotY = useRef(0);
  const dragRotX = useRef(0);

  const shapesFlat = useMemo(
    () =>
      PROJ_SHAPES.map((segs) => {
        const arr = new Float32Array(segs.length * 6);
        segs.forEach((seg, i) => {
          for (let j = 0; j < 6; j++) arr[i * 6 + j] = seg[j];
        });
        return arr;
      }),
    [],
  );

  /* Layout constants */
  const SCREEN_X = -0.85;
  const MODEL_X = 0.85;
  const S3 = 2.2; // 3D model scale
  const S2 = 1.6; // 2D projection scale
  const ptCount = SEG_COUNT * 2;

  /* Buffer geometries for morphing wireframes */
  const { geo3D, geo2D, geoProj } = useMemo(() => {
    const g3 = new THREE.BufferGeometry();
    g3.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(ptCount * 3), 3),
    );
    const g2 = new THREE.BufferGeometry();
    g2.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(ptCount * 3), 3),
    );
    const gP = new THREE.BufferGeometry();
    gP.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(ptCount * 2 * 3), 3),
    );
    return { geo3D: g3, geo2D: g2, geoProj: gP };
  }, []);

  /* 2D screen decoration geometries */
  const screenGeos = useMemo(() => {
    const W = 0.65,
      H = 0.52;
    // Border
    const bArr = [
      -W,
      -H,
      0,
      W,
      -H,
      0,
      W,
      -H,
      0,
      W,
      H,
      0,
      W,
      H,
      0,
      -W,
      H,
      0,
      -W,
      H,
      0,
      -W,
      -H,
      0,
    ];
    const border = new THREE.BufferGeometry();
    border.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(bArr), 3),
    );
    // Corner brackets (L-shapes for viewfinder effect)
    const cb = 0.09;
    const cArr = [
      -W,
      -H,
      0,
      -W,
      -H + cb,
      0,
      -W,
      -H,
      0,
      -W + cb,
      -H,
      0,
      W,
      -H,
      0,
      W,
      -H + cb,
      0,
      W,
      -H,
      0,
      W - cb,
      -H,
      0,
      W,
      H,
      0,
      W,
      H - cb,
      0,
      W,
      H,
      0,
      W - cb,
      H,
      0,
      -W,
      H,
      0,
      -W,
      H - cb,
      0,
      -W,
      H,
      0,
      -W + cb,
      H,
      0,
    ];
    const brackets = new THREE.BufferGeometry();
    brackets.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(cArr), 3),
    );
    // Grid
    const gArr: number[] = [];
    for (let i = 1; i < 6; i++) {
      const y = -H + i * ((2 * H) / 6);
      gArr.push(-W, y, 0, W, y, 0);
    }
    for (let i = 1; i < 7; i++) {
      const x = -W + i * ((2 * W) / 7);
      gArr.push(x, -H, 0, x, H, 0);
    }
    const grid = new THREE.BufferGeometry();
    grid.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(gArr), 3),
    );
    // Tick marks on edges
    const tArr: number[] = [];
    for (let i = 0; i <= 8; i++) {
      const x = -W + i * ((2 * W) / 8);
      tArr.push(x, -H, 0, x, -H - 0.025, 0);
      tArr.push(x, H, 0, x, H + 0.025, 0);
    }
    for (let i = 0; i <= 6; i++) {
      const y = -H + i * ((2 * H) / 6);
      tArr.push(-W, y, 0, -W - 0.025, y, 0);
      tArr.push(W, y, 0, W + 0.025, y, 0);
    }
    const ticks = new THREE.BufferGeometry();
    ticks.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(tArr), 3),
    );
    return { border, brackets, grid, ticks };
  }, []);

  /* Materials — enhanced palette with highlight accent */
  const mats = useMemo(() => {
    const c = isDark ? "#22D3EE" : "#6366F1";
    const a = isDark ? "#67E8F9" : "#818CF8";
    const hl = isDark ? "#F0ABFC" : "#C084FC";
    return {
      wire3D: new THREE.LineBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
      wire2D: new THREE.LineBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
      proj: new THREE.LineBasicMaterial({
        color: a,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      }),
      border: new THREE.LineBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
      }),
      brackets: new THREE.LineBasicMaterial({
        color: hl,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
      grid: new THREE.LineBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      }),
      ticks: new THREE.LineBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
      screen: new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.02,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      scanLine: new THREE.MeshBasicMaterial({
        color: hl,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
      dot3D: new THREE.PointsMaterial({
        color: a,
        size: 0.03,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        sizeAttenuation: true,
      }),
      dot2D: new THREE.PointsMaterial({
        color: c,
        size: 0.022,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        sizeAttenuation: true,
      }),
      platformWire: new THREE.MeshBasicMaterial({
        color: a,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
      platformWire2: new THREE.MeshBasicMaterial({
        color: c,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      }),
    };
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Click -> cycle shape
    const cx = clickRef.current.x * 7;
    const cy = clickRef.current.y * 5;
    const cd = Math.sqrt((cx - position[0]) ** 2 + (cy - position[1]) ** 2);
    if (clickRef.current.time > lastClick.current && cd < 4) {
      lastClick.current = clickRef.current.time;
      prevIdx.current = shapeIdx.current;
      shapeIdx.current = (shapeIdx.current + 1) % PROJ_SHAPES.length;
      morph.current = 0;
    }

    // Drag rotation
    const drag = dragRef.current;
    if (drag.active === 1) {
      const sx = (mx - drag.dx) * 7,
        sy = (my + drag.dy) * 5;
      if (Math.sqrt((sx - position[0]) ** 2 + (sy - position[1]) ** 2) < 5) {
        dragRotY.current += drag.dx * 3;
        dragRotX.current -= drag.dy * 3;
      }
    }
    dragRotY.current *= 0.995;
    dragRotX.current *= 0.995;

    // Morph progress with smooth cubic ease-in-out
    morph.current = Math.min(1, morph.current + 0.012);
    const mp = morph.current;
    const ease = mp < 0.5 ? 4 * mp * mp * mp : 1 - Math.pow(-2 * mp + 2, 3) / 2;

    // ── Auto-rotation for 3D model ──
    const autoRot = t * 0.35 + dragRotY.current * 0.5;
    const cosR = Math.cos(autoRot);
    const sinR = Math.sin(autoRot);

    // Update geometry buffers
    const prev = shapesFlat[prevIdx.current];
    const curr = shapesFlat[shapeIdx.current];
    const a3 = (geo3D.getAttribute("position") as THREE.BufferAttribute)
      .array as Float32Array;
    const a2 = (geo2D.getAttribute("position") as THREE.BufferAttribute)
      .array as Float32Array;
    const ap = (geoProj.getAttribute("position") as THREE.BufferAttribute)
      .array as Float32Array;

    for (let i = 0; i < SEG_COUNT; i++) {
      for (let ep = 0; ep < 2; ep++) {
        const si = i * 6 + ep * 3;
        const di = (i * 2 + ep) * 3;
        // Morphed vertex in local coords
        const lx = prev[si] * (1 - ease) + curr[si] * ease;
        const ly = prev[si + 1] * (1 - ease) + curr[si + 1] * ease;
        const lz = prev[si + 2] * (1 - ease) + curr[si + 2] * ease;

        // Apply Y-rotation for 3D model
        const rx = lx * cosR + lz * sinR;
        const ry = ly;
        const rz = -lx * sinR + lz * cosR;

        // 3D wireframe (right side, scaled, rotated)
        a3[di] = rx * S3 + MODEL_X;
        a3[di + 1] = ry * S3;
        a3[di + 2] = rz * S3;

        // 2D wireframe — front-view orthographic projection of rotated model
        a2[di] = rx * S2 + SCREEN_X;
        a2[di + 1] = ry * S2;
        a2[di + 2] = 0;

        // Projection ray: 2D -> 3D
        const pi = (i * 2 + ep) * 6;
        ap[pi] = rx * S2 + SCREEN_X;
        ap[pi + 1] = ry * S2;
        ap[pi + 2] = 0;
        ap[pi + 3] = rx * S3 + MODEL_X;
        ap[pi + 4] = ry * S3;
        ap[pi + 5] = rz * S3;
      }
    }
    geo3D.getAttribute("position").needsUpdate = true;
    geo2D.getAttribute("position").needsUpdate = true;
    geoProj.getAttribute("position").needsUpdate = true;

    // Platform rotation
    if (platformRef.current) platformRef.current.rotation.y = t * 0.15;

    // Scan line sweep
    if (scanRef.current) scanRef.current.position.y = Math.sin(t * 1.5) * 0.48;

    // Hover glow
    const mdx = mx * 7 - position[0],
      mdy = my * 5 - position[1];
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    hoverGlow.current += ((md < 3.5 ? 1 : 0) - hoverGlow.current) * 0.04;
    const hg = hoverGlow.current;
    const morphPulse = Math.sin(mp * Math.PI) * 0.12;

    mats.wire3D.opacity = 0.5 + hg * 0.35 + morphPulse;
    mats.wire2D.opacity = 0.3 + hg * 0.25 + morphPulse * 0.5;
    mats.proj.opacity =
      0.06 + hg * 0.1 + Math.sin(t * 2) * 0.015 + morphPulse * 0.3;
    mats.screen.opacity = 0.015 + hg * 0.025;
    mats.border.opacity = 0.16 + hg * 0.15;
    mats.brackets.opacity = 0.4 + hg * 0.35;
    mats.grid.opacity = 0.04 + hg * 0.04;
    mats.ticks.opacity = 0.1 + hg * 0.1;
    mats.scanLine.opacity =
      (0.08 + hg * 0.08 + Math.sin(t * 3) * 0.03) * (0.5 + mp * 0.5);
    mats.dot3D.opacity = 0.6 + hg * 0.3 + morphPulse * 0.5;
    mats.dot2D.opacity = 0.35 + hg * 0.25 + morphPulse * 0.3;
    mats.platformWire.opacity = 0.15 + hg * 0.15;
    mats.platformWire2.opacity = 0.08 + hg * 0.08;

    // Group tilt + float
    const tY = t * 0.04 + mx * 0.12;
    const tX = Math.sin(t * 0.08) * 0.04 - my * 0.06 + dragRotX.current;
    groupRef.current.rotation.y += (tY - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (tX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ---- 2D Screen ---- */}
      <mesh position={[SCREEN_X, 0, 0]} material={mats.screen}>
        <planeGeometry args={[1.3, 1.04]} />
      </mesh>
      <lineSegments
        geometry={screenGeos.border}
        position={[SCREEN_X, 0, 0.001]}
        material={mats.border}
      />
      <lineSegments
        geometry={screenGeos.brackets}
        position={[SCREEN_X, 0, 0.002]}
        material={mats.brackets}
      />
      <lineSegments
        geometry={screenGeos.grid}
        position={[SCREEN_X, 0, 0.001]}
        material={mats.grid}
      />
      <lineSegments
        geometry={screenGeos.ticks}
        position={[SCREEN_X, 0, 0.001]}
        material={mats.ticks}
      />
      {/* Sweep scan line */}
      <mesh
        ref={scanRef}
        position={[SCREEN_X, 0, 0.003]}
        material={mats.scanLine}
      >
        <planeGeometry args={[1.3, 0.008]} />
      </mesh>

      {/* ---- 2D wireframe + vertex dots ---- */}
      <lineSegments geometry={geo2D} material={mats.wire2D} />
      <points geometry={geo2D} material={mats.dot2D} />

      {/* ---- 3D wireframe + vertex dots ---- */}
      <lineSegments geometry={geo3D} material={mats.wire3D} />
      <points geometry={geo3D} material={mats.dot3D} />

      {/* ---- Projection rays connecting 2D to 3D ---- */}
      <lineSegments geometry={geoProj} material={mats.proj} />

      {/* ---- Holographic platform beneath 3D model ---- */}
      <group ref={platformRef} position={[MODEL_X, -0.65, 0]}>
        <mesh material={mats.platformWire} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.008, 4, 32]} />
        </mesh>
        <mesh material={mats.platformWire2} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.006, 4, 24]} />
        </mesh>
        <mesh material={mats.platformWire2} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.005, 4, 18]} />
        </mesh>
        {/* Tick marks on outer ring */}
        {Array.from({ length: 12 }, (_, i) => {
          const ang = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={`ptick-${i}`}
              position={[Math.cos(ang) * 0.55, 0, Math.sin(ang) * 0.55]}
              material={mats.platformWire}
            >
              <boxGeometry args={[0.015, 0.005, 0.05]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* =====================================================================
   Main HeroScene — Banner only
   ===================================================================== */
export default function HeroScene() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickRef = useRef({ x: 0, y: 0, time: 0 });
  const dragRef = useRef({ active: 0, dx: 0, dy: 0, totalX: 0, totalY: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() =>
      setIsDark(html.classList.contains("dark")),
    );
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
      if (isDragging.current) {
        dragRef.current.dx = nx - lastMouse.current.x;
        dragRef.current.dy = ny - lastMouse.current.y;
        dragRef.current.totalX += dragRef.current.dx;
        dragRef.current.totalY += dragRef.current.dy;
        dragRef.current.active = 1;
      } else {
        dragRef.current.dx = 0;
        dragRef.current.dy = 0;
        dragRef.current.active = 0;
      }
      lastMouse.current = { x: nx, y: ny };
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
      dragRef.current.totalX = 0;
      dragRef.current.totalY = 0;
    };
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    const onMouseUp = (e: MouseEvent) => {
      // Only fire click if not a significant drag
      const totalDrag =
        Math.abs(dragRef.current.totalX) + Math.abs(dragRef.current.totalY);
      if (totalDrag < 0.02) {
        clickRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: -(e.clientY / window.innerHeight - 0.5) * 2,
          time: Date.now() / 1000,
        };
      }
      isDragging.current = false;
      dragRef.current.active = 0;
      dragRef.current.dx = 0;
      dragRef.current.dy = 0;
    };
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Touch support for mobile drag
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDragging.current = true;
      lastMouse.current = {
        x: (touch.clientX / window.innerWidth - 0.5) * 2,
        y: -(touch.clientY / window.innerHeight - 0.5) * 2,
      };
      dragRef.current.totalX = 0;
      dragRef.current.totalY = 0;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const nx = (touch.clientX / window.innerWidth - 0.5) * 2;
      const ny = -(touch.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      if (isDragging.current) {
        dragRef.current.dx = nx - lastMouse.current.x;
        dragRef.current.dy = ny - lastMouse.current.y;
        dragRef.current.totalX += dragRef.current.dx;
        dragRef.current.totalY += dragRef.current.dy;
        dragRef.current.active = 1;
      }
      lastMouse.current = { x: nx, y: ny };
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onTouchEnd = () => {
      isDragging.current = false;
      dragRef.current.active = 0;
      dragRef.current.dx = 0;
      dragRef.current.dy = 0;
    };
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Track cursor style based on proximity to objects — set on #hero section
  // so cursor is visible above the z-stacked content overlay
  const containerRef = useRef<HTMLDivElement>(null);
  const objectPositions = useMemo(
    () => [
      [4.2, 0.2], // Hand
      [-4.2, -1.2], // Gyroscope
      [-4.5, 2.0], // Projection2D3D
    ],
    [],
  );

  useEffect(() => {
    if (isMobile) return;
    let rafId: number;
    const update = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const mx = mouseRef.current.x * 7;
        const my = mouseRef.current.y * 5;
        let near = false;
        for (const [ox, oy] of objectPositions) {
          const d = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
          if (d < 3.5) {
            near = true;
            break;
          }
        }
        const dragging = isDragging.current && near;
        heroEl.style.cursor = dragging
          ? "grabbing"
          : near
            ? "pointer"
            : "default";
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, objectPositions]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Background: subtle floating tech shapes */}
          <TechDecorations
            isDark={isDark}
            mouseRef={mouseRef}
            count={isMobile ? 10 : 18}
          />
          {/* Desktop only: 3 interactive objects */}
          {!isMobile && (
            <>
              {/* Right: Robotic Hand */}
              <RoboticHand
                isDark={isDark}
                mouseRef={mouseRef}
                clickRef={clickRef}
                dragRef={dragRef}
                position={[4.2, 0.2, -1]}
              />
              {/* Left-lower: Sci-Fi Gyroscope */}
              <SciFiDevice
                isDark={isDark}
                mouseRef={mouseRef}
                clickRef={clickRef}
                dragRef={dragRef}
                position={[-4.2, -1.2, -1.5]}
              />
              {/* Upper-left: 2D↔3D Projection (embodied AI shapes) */}
              <Projection2D3D
                isDark={isDark}
                mouseRef={mouseRef}
                clickRef={clickRef}
                dragRef={dragRef}
                position={[-4.5, 2.0, -0.5]}
              />
            </>
          )}
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
