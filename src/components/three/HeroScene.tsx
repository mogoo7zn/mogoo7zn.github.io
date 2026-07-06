import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

type ClickRef = React.MutableRefObject<{ x: number; y: number; time: number }>;
type DragRef = React.MutableRefObject<{
  active: number;
  dx: number;
  dy: number;
  totalX: number;
  totalY: number;
}>;
type MouseRef = React.MutableRefObject<{ x: number; y: number }>;
type Vec3 = [number, number, number];

const createLineGeometry = (positions: number[]) => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
};

const createPanelGuideGeometry = (
  width: number,
  height: number,
  columns: number,
  rows: number,
) => {
  const positions: number[] = [];
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  positions.push(
    -halfWidth,
    -halfHeight,
    0,
    halfWidth,
    -halfHeight,
    0,
    halfWidth,
    -halfHeight,
    0,
    halfWidth,
    halfHeight,
    0,
    halfWidth,
    halfHeight,
    0,
    -halfWidth,
    halfHeight,
    0,
    -halfWidth,
    halfHeight,
    0,
    -halfWidth,
    -halfHeight,
    0,
  );

  for (let column = 1; column < columns; column += 1) {
    const x = -halfWidth + (width / columns) * column;
    positions.push(x, -halfHeight, 0, x, halfHeight, 0);
  }

  for (let row = 1; row < rows; row += 1) {
    const y = -halfHeight + (height / rows) * row;
    positions.push(-halfWidth, y, 0, halfWidth, y, 0);
  }

  return createLineGeometry(positions);
};

function AmbientParticles({
  count,
  isDark,
  mouseRef,
}: {
  count: number;
  isDark: boolean;
  mouseRef: MouseRef;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];

    for (let index = 0; index < count; index += 1) {
      const spread = 2.4 + Math.random() * 5.4;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * spread * (0.84 + Math.random() * 0.48);
      const y = -3 + Math.random() * 4.2;
      const z = -3.6 + Math.random() * 2.8;
      positions.push(x, y, z);
    }

    return createLineGeometry(positions);
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: isDark ? "#75E6F7" : "#5C6CFF",
        size: 0.024,
        transparent: true,
        opacity: isDark ? 0.1 : 0.075,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [isDark],
  );

  useFrame(({ clock }, rawDelta) => {
    if (!pointsRef.current) return;

    const delta = Math.min(rawDelta, 0.03);
    const elapsed = clock.elapsedTime;
    const targetY = Math.sin(elapsed * 0.14) * 0.05 - 0.28 + mouseRef.current.y * 0.08;
    const targetX = mouseRef.current.x * 0.12;

    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.09) * 0.03;
    pointsRef.current.position.y = THREE.MathUtils.damp(
      pointsRef.current.position.y,
      targetY,
      3,
      delta,
    );
    pointsRef.current.position.x = THREE.MathUtils.damp(
      pointsRef.current.position.x,
      targetX,
      2.4,
      delta,
    );
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function ResearchArtifact({
  clickRef,
  dragRef,
  isDark,
  mouseRef,
  position,
  reducedMotion,
  scale,
}: {
  clickRef: ClickRef;
  dragRef: DragRef;
  isDark: boolean;
  mouseRef: MouseRef;
  position: Vec3;
  reducedMotion: boolean;
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const helixRef = useRef<THREE.Group>(null);
  const proteinRef = useRef<THREE.Group>(null);
  const assayPanelRef = useRef<THREE.Group>(null);
  const modelPanelRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseBloomRef = useRef<THREE.Mesh>(null);
  const scanAssayRef = useRef<THREE.Mesh>(null);
  const scanModelRef = useRef<THREE.Mesh>(null);
  const hoverMix = useRef(0);
  const introMix = useRef(0);
  const animationTime = useRef(0);
  const dragRotX = useRef(0);
  const dragRotY = useRef(0);
  const lastPulseToken = useRef(0);
  const pulseStart = useRef(-10);

  const palette = useMemo(
    () => ({
      primary: isDark ? "#9AA8FF" : "#5563E6",
      cyan: isDark ? "#6EE7F9" : "#0891B2",
      green: isDark ? "#6EE7B7" : "#059669",
      amber: isDark ? "#F6D58A" : "#D97706",
      surface: isDark ? "#12213A" : "#EEF6FF",
      surfaceSoft: isDark ? "#172A45" : "#DDEBFF",
      line: isDark ? "#A5B4FC" : "#4757D8",
    }),
    [isDark],
  );

  const materials = useMemo(
    () => ({
      helixA: new THREE.MeshStandardMaterial({
        color: palette.cyan,
        emissive: palette.cyan,
        emissiveIntensity: isDark ? 0.36 : 0.16,
        metalness: 0.18,
        roughness: 0.32,
      }),
      helixB: new THREE.MeshStandardMaterial({
        color: palette.green,
        emissive: palette.green,
        emissiveIntensity: isDark ? 0.3 : 0.12,
        metalness: 0.14,
        roughness: 0.34,
      }),
      basePair: new THREE.LineBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.22 : 0.15,
        depthWrite: false,
      }),
      baseNode: new THREE.MeshBasicMaterial({
        color: palette.amber,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
      proteinNode: new THREE.MeshStandardMaterial({
        color: palette.primary,
        emissive: palette.primary,
        emissiveIntensity: isDark ? 0.26 : 0.1,
        metalness: 0.12,
        roughness: 0.46,
        transparent: true,
        opacity: 0.48,
      }),
      proteinLink: new THREE.LineBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: isDark ? 0.14 : 0.1,
        depthWrite: false,
      }),
      pocket: new THREE.MeshStandardMaterial({
        color: palette.surface,
        emissive: palette.green,
        emissiveIntensity: isDark ? 0.22 : 0.1,
        metalness: 0.16,
        roughness: 0.28,
        transparent: true,
        opacity: 0.34,
      }),
      pocketWire: new THREE.MeshBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: isDark ? 0.18 : 0.12,
        wireframe: true,
        depthWrite: false,
      }),
      panel: new THREE.MeshBasicMaterial({
        color: palette.surfaceSoft,
        transparent: true,
        opacity: isDark ? 0.12 : 0.09,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      panelGlow: new THREE.MeshBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: isDark ? 0.04 : 0.03,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      guide: new THREE.LineBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.18 : 0.13,
        depthWrite: false,
      }),
      assayDot: new THREE.MeshBasicMaterial({
        color: palette.green,
        transparent: true,
        opacity: 0.56,
        depthWrite: false,
      }),
      assayHot: new THREE.MeshBasicMaterial({
        color: palette.amber,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
      }),
      graph: new THREE.LineBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: isDark ? 0.4 : 0.28,
        depthWrite: false,
      }),
      flow: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: isDark ? 0.2 : 0.14,
        depthWrite: false,
      }),
      floorGlow: new THREE.MeshBasicMaterial({
        color: palette.surfaceSoft,
        transparent: true,
        opacity: isDark ? 0.1 : 0.07,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      floorLine: new THREE.LineBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: isDark ? 0.16 : 0.1,
        depthWrite: false,
      }),
      pulse: new THREE.MeshBasicMaterial({
        color: palette.cyan,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      pulseBloom: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      scan: new THREE.MeshBasicMaterial({
        color: palette.green,
        transparent: true,
        opacity: isDark ? 0.18 : 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    }),
    [isDark, palette],
  );

  const helixGeometry = useMemo(() => {
    const segments = 104;
    const turns = 2.35;
    const height = 1.92;
    const radius = 0.42;
    const depth = 0.24;

    const createStrand = (phase: number) => {
      const points: THREE.Vector3[] = [];
      for (let index = 0; index <= segments; index += 1) {
        const t = index / segments;
        const angle = t * turns * Math.PI * 2 + phase;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            -height / 2 + t * height,
            Math.sin(angle) * depth,
          ),
        );
      }
      return points;
    };

    const strandA = createStrand(0);
    const strandB = createStrand(Math.PI);
    const pairPositions: number[] = [];
    const nodePositions: Vec3[] = [];

    for (let index = 4; index < segments; index += 8) {
      const a = strandA[index];
      const b = strandB[index];
      pairPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      if (index % 16 === 4) nodePositions.push([a.x, a.y, a.z]);
      if (index % 24 === 12) nodePositions.push([b.x, b.y, b.z]);
    }

    return {
      strandA: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandA), 88, 0.016, 6, false),
      strandB: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strandB), 88, 0.016, 6, false),
      basePairs: createLineGeometry(pairPositions),
      nodePositions,
    };
  }, []);

  const proteinGeometry = useMemo(() => {
    const nodes: Vec3[] = [
      [-0.72, -0.34, -0.14],
      [-0.48, -0.66, 0.08],
      [-0.12, -0.5, 0.22],
      [0.22, -0.68, 0.04],
      [0.54, -0.38, -0.1],
      [0.46, -0.02, 0.18],
      [0.1, 0.08, 0.32],
      [-0.26, -0.04, 0.2],
      [-0.58, 0.02, -0.04],
      [-0.16, -0.24, -0.22],
      [0.28, -0.24, -0.24],
    ];
    const links: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 0],
      [2, 7],
      [3, 10],
      [7, 9],
      [9, 10],
      [5, 10],
    ];
    const positions: number[] = [];
    links.forEach(([start, end]) => {
      positions.push(...nodes[start], ...nodes[end]);
    });
    return { nodes, links: createLineGeometry(positions) };
  }, []);

  const assayDots = useMemo(() => {
    const dots: Array<{ position: Vec3; hot: boolean; scale: number }> = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const signal = (row * 5 + col * 3) % 8;
        dots.push({
          position: [-0.36 + col * 0.24, -0.27 + row * 0.18, 0.026],
          hot: signal === 0 || signal === 5,
          scale: signal === 0 ? 1.18 : signal === 5 ? 1.04 : 0.82,
        });
      }
    }
    return dots;
  }, []);

  const modelGraphGeometry = useMemo(() => {
    const points: Vec3[] = [
      [-0.5, -0.22, 0.026],
      [-0.34, -0.05, 0.026],
      [-0.18, -0.12, 0.026],
      [0.0, 0.12, 0.026],
      [0.18, 0.02, 0.026],
      [0.34, 0.23, 0.026],
      [0.52, 0.16, 0.026],
    ];
    const positions: number[] = [];
    for (let index = 0; index < points.length - 1; index += 1) {
      positions.push(...points[index], ...points[index + 1]);
    }
    return { points, geometry: createLineGeometry(positions) };
  }, []);

  const panelGuideGeometry = useMemo(() => createPanelGuideGeometry(1.08, 0.74, 4, 4), []);
  const baseGuideGeometry = useMemo(() => createPanelGuideGeometry(3.0, 1.18, 6, 3), []);
  const flowGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.98, -0.08, 0.0),
      new THREE.Vector3(-0.58, 0.14, 0.14),
      new THREE.Vector3(-0.12, 0.08, 0.28),
      new THREE.Vector3(0.42, 0.18, 0.16),
      new THREE.Vector3(0.9, -0.02, -0.02),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.01, 6, false);
  }, []);

  useFrame((_, rawDelta) => {
    if (!groupRef.current) return;

    const delta = Math.min(rawDelta, 0.024);
    const motionScale = reducedMotion ? 0.22 : 1;
    introMix.current = THREE.MathUtils.damp(
      introMix.current,
      1,
      reducedMotion ? 0.85 : 0.55,
      delta,
    );
    const startupSpeed = reducedMotion ? 0.08 : 0.16 + introMix.current * 0.34;
    animationTime.current += delta * startupSpeed;
    const elapsed = animationTime.current;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const hoverDx = Math.abs(mouseX * 7 - position[0]);
    const hoverDy = Math.abs(mouseY * 5 - position[1]);
    const hoverTarget = hoverDx < 2.15 && hoverDy < 1.28 ? 1 : 0;
    hoverMix.current = THREE.MathUtils.damp(hoverMix.current, hoverTarget, 4, delta);

    const drag = dragRef.current;
    if (drag.active === 1) {
      const startX = (mouseRef.current.x - drag.dx) * 7;
      const startY = (mouseRef.current.y + drag.dy) * 5;
      const dragDx = Math.abs(startX - position[0]);
      const dragDy = Math.abs(startY - position[1]);

      if (dragDx < 2.25 && dragDy < 1.4) {
        dragRotY.current = THREE.MathUtils.clamp(
          dragRotY.current + drag.dx * 1.25,
          -0.62,
          0.62,
        );
        dragRotX.current = THREE.MathUtils.clamp(
          dragRotX.current - drag.dy * 0.86,
          -0.38,
          0.38,
        );
      }
    }

    dragRotY.current = THREE.MathUtils.damp(dragRotY.current, 0, 3.3, delta);
    dragRotX.current = THREE.MathUtils.damp(dragRotX.current, 0, 3.6, delta);

    const clickDx = Math.abs(clickRef.current.x * 7 - position[0]);
    const clickDy = Math.abs(clickRef.current.y * 5 - position[1]);
    if (
      clickRef.current.time > lastPulseToken.current &&
      clickDx < 2.25 &&
      clickDy < 1.4
    ) {
      lastPulseToken.current = clickRef.current.time;
      pulseStart.current = elapsed;
    }

    const pulseAge = elapsed - pulseStart.current;
    const pulseProgress =
      pulseAge >= 0 && pulseAge <= 1.55 ? pulseAge / 1.55 : 1;
    const pulseStrength =
      pulseAge >= 0 && pulseAge <= 1.55
        ? Math.sin(pulseProgress * Math.PI) * (1 - pulseProgress * 0.18)
        : 0;
    const intro = introMix.current * motionScale;
    const hover = hoverMix.current;
    const clickNudge = pulseStrength * Math.sin(pulseProgress * Math.PI * 2);

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      elapsed * 0.006 * intro + mouseX * 0.12 + dragRotY.current + clickNudge * 0.06,
      3.4,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(elapsed * 0.1) * 0.025 * intro - mouseY * 0.078 + dragRotX.current,
      3.7,
      delta,
    );
    groupRef.current.position.y =
      position[1] + Math.sin(elapsed * 0.25) * 0.055 * intro + pulseStrength * 0.035;
    groupRef.current.scale.setScalar(scale * (1 + hover * 0.045 + pulseStrength * 0.045));

    if (helixRef.current) {
      helixRef.current.rotation.y = elapsed * 0.055 * intro + hover * 0.045;
      helixRef.current.position.y = 0.04 + Math.sin(elapsed * 0.18) * 0.028 * intro;
    }

    if (proteinRef.current) {
      proteinRef.current.rotation.y = -elapsed * 0.024 * intro;
      proteinRef.current.rotation.z = Math.sin(elapsed * 0.1) * 0.045 * intro;
      proteinRef.current.position.y = -0.08 + Math.sin(elapsed * 0.16 + 0.6) * 0.02 * intro;
    }

    if (assayPanelRef.current) {
      assayPanelRef.current.rotation.y =
        0.5 + hover * 0.1 + Math.sin(elapsed * 0.09) * 0.026 * intro + pulseStrength * 0.035;
      assayPanelRef.current.position.z = -0.08 + hover * 0.08 + pulseStrength * 0.045;
    }

    if (modelPanelRef.current) {
      modelPanelRef.current.rotation.y =
        -0.5 - hover * 0.1 + Math.sin(elapsed * 0.08 + 0.7) * 0.026 * intro - pulseStrength * 0.035;
      modelPanelRef.current.position.z = 0.02 + hover * 0.08 + pulseStrength * 0.045;
    }

    if (scanAssayRef.current) {
      scanAssayRef.current.position.x =
        Math.sin(elapsed * (0.32 + hover * 0.08 + pulseStrength * 0.18) * intro) * 0.42;
    }

    if (scanModelRef.current) {
      scanModelRef.current.position.x =
        Math.sin(elapsed * (0.28 + hover * 0.08 + pulseStrength * 0.16) * intro + Math.PI * 0.4) * 0.42;
    }

    materials.basePair.opacity = (isDark ? 0.22 : 0.15) + hover * 0.04;
    materials.proteinLink.opacity = (isDark ? 0.14 : 0.1) + hover * 0.04;
    materials.pocket.opacity = 0.34 + hover * 0.06;
    materials.pocketWire.opacity = (isDark ? 0.18 : 0.12) + pulseStrength * 0.08;
    materials.panel.opacity = (isDark ? 0.12 : 0.09) + hover * 0.04;
    materials.panelGlow.opacity = (isDark ? 0.04 : 0.03) + pulseStrength * 0.06;
    materials.guide.opacity = (isDark ? 0.18 : 0.13) + hover * 0.04;
    materials.graph.opacity = (isDark ? 0.4 : 0.28) + hover * 0.06;
    materials.flow.opacity = (isDark ? 0.2 : 0.14) + pulseStrength * 0.08;
    materials.floorGlow.opacity = (isDark ? 0.1 : 0.07) + hover * 0.025 + pulseStrength * 0.04;
    materials.floorLine.opacity = (isDark ? 0.16 : 0.1) + hover * 0.04 + pulseStrength * 0.08;
    materials.pulse.opacity = pulseStrength * 0.32;
    materials.pulseBloom.opacity = pulseStrength * (isDark ? 0.17 : 0.12);
    materials.scan.opacity = (isDark ? 0.18 : 0.12) + hover * 0.06;

    if (pulseRef.current) {
      pulseRef.current.position.x = -1.34 + pulseProgress * 2.68;
      pulseRef.current.scale.set(1 + pulseStrength * 0.32, 1, 1);
    }

    if (pulseBloomRef.current) {
      pulseBloomRef.current.scale.set(
        1 + pulseProgress * 0.16,
        1 + pulseProgress * 0.1,
        1,
      );
    }
  });

  const baseRotation: Vec3 = [-Math.PI / 2, 0, 0];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh
        position={[0.02, -1.24, 0]}
        rotation={baseRotation}
        material={materials.floorGlow}
      >
        <planeGeometry args={[3.0, 1.18]} />
      </mesh>

      <lineSegments
        position={[0.02, -1.225, 0]}
        rotation={baseRotation}
        geometry={baseGuideGeometry}
        material={materials.floorLine}
      />

      <mesh
        ref={pulseBloomRef}
        position={[0.02, -1.218, 0]}
        rotation={baseRotation}
        material={materials.pulseBloom}
      >
        <planeGeometry args={[2.58, 0.92]} />
      </mesh>

      <mesh
        ref={pulseRef}
        position={[-1.34, -1.212, 0]}
        rotation={baseRotation}
        material={materials.pulse}
      >
        <planeGeometry args={[0.22, 1.18]} />
      </mesh>

      <group ref={helixRef} position={[0, 0.06, 0.02]} rotation={[0.1, -0.2, -0.08]}>
        <mesh geometry={helixGeometry.strandA} material={materials.helixA} />
        <mesh geometry={helixGeometry.strandB} material={materials.helixB} />
        <lineSegments geometry={helixGeometry.basePairs} material={materials.basePair} />
        {helixGeometry.nodePositions.map((node, index) => (
          <mesh
            key={`base-node-${index}`}
            position={node}
            material={materials.baseNode}
            scale={index % 2 === 0 ? 1 : 0.82}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
          </mesh>
        ))}
      </group>

      <group ref={proteinRef} position={[0, -0.14, 0.02]} rotation={[0.2, 0.35, -0.08]} scale={[0.88, 0.88, 0.88]}>
        <lineSegments geometry={proteinGeometry.links} material={materials.proteinLink} />
        {proteinGeometry.nodes.map((node, index) => (
          <mesh
            key={`protein-node-${index}`}
            position={node}
            material={materials.proteinNode}
          >
            <sphereGeometry args={[index === 6 ? 0.074 : 0.056, 16, 16]} />
          </mesh>
        ))}
        <mesh position={[0.02, -0.24, 0.02]} material={materials.pocket}>
          <icosahedronGeometry args={[0.34, 1]} />
        </mesh>
        <mesh position={[0.02, -0.24, 0.02]} material={materials.pocketWire}>
          <icosahedronGeometry args={[0.43, 1]} />
        </mesh>
      </group>

      <mesh geometry={flowGeometry} material={materials.flow} />

      <group ref={assayPanelRef} position={[-1.14, 0.12, -0.08]} rotation={[0.1, 0.46, -0.18]}>
        <mesh material={materials.panel}>
          <planeGeometry args={[1.08, 0.74]} />
        </mesh>
        <mesh position={[0, 0, -0.01]} material={materials.panelGlow}>
          <planeGeometry args={[0.92, 0.6]} />
        </mesh>
        <lineSegments position={[0, 0, 0.012]} geometry={panelGuideGeometry} material={materials.guide} />
        <mesh ref={scanAssayRef} position={[0, 0, 0.018]} material={materials.scan}>
          <planeGeometry args={[0.12, 0.68]} />
        </mesh>
        {assayDots.map((dot, index) => (
          <mesh
            key={`assay-dot-${index}`}
            position={dot.position}
            material={dot.hot ? materials.assayHot : materials.assayDot}
            scale={dot.scale}
          >
            <sphereGeometry args={[0.026, 10, 10]} />
          </mesh>
        ))}
      </group>

      <group ref={modelPanelRef} position={[1.12, -0.08, 0.02]} rotation={[-0.08, -0.46, 0.14]}>
        <mesh material={materials.panel}>
          <planeGeometry args={[1.08, 0.74]} />
        </mesh>
        <mesh position={[0, 0, -0.01]} material={materials.panelGlow}>
          <planeGeometry args={[0.92, 0.6]} />
        </mesh>
        <lineSegments position={[0, 0, 0.012]} geometry={panelGuideGeometry} material={materials.guide} />
        <lineSegments geometry={modelGraphGeometry.geometry} material={materials.graph} />
        <mesh ref={scanModelRef} position={[0, 0, 0.018]} material={materials.scan}>
          <planeGeometry args={[0.12, 0.68]} />
        </mesh>
        {modelGraphGeometry.points.map((node, index) => (
          <mesh
            key={`model-node-${index}`}
            position={node}
            material={index === 3 || index === 5 ? materials.assayHot : materials.assayDot}
            scale={index === 5 ? 1.18 : 0.9}
          >
            <sphereGeometry args={[0.032, 10, 10]} />
          </mesh>
        ))}
      </group>

    </group>
  );
}

export default function HeroScene() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickRef = useRef({ x: 0, y: 0, time: 0 });
  const dragRef = useRef({ active: 0, dx: 0, dy: 0, totalX: 0, totalY: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const setSceneDraggingState = (dragging: boolean) => {
    document.body.classList.toggle("hero-scene-dragging", dragging);
  };

  const isDragBlockedTarget = (target: EventTarget | null) =>
    target instanceof Element &&
    !!target.closest(
      "a, button, input, textarea, select, summary, [data-no-scene-drag]",
    );

  const isInsideHero = (clientX: number, clientY: number) => {
    const heroElement = document.getElementById("hero");
    if (!heroElement) return false;

    const rect = heroElement.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  };

  useEffect(() => {
    const html = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDark(html.classList.contains("dark"));
    setReducedMotion(media.matches);

    const observer = new MutationObserver(() =>
      setIsDark(html.classList.contains("dark")),
    );
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    const onMotionChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    media.addEventListener("change", onMotionChange);

    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });

    const onMouseMove = (event: MouseEvent) => {
      const nextX = (event.clientX / window.innerWidth - 0.5) * 2;
      const nextY = -(event.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging.current) {
        dragRef.current.dx = nextX - lastMouse.current.x;
        dragRef.current.dy = nextY - lastMouse.current.y;
        dragRef.current.totalX += dragRef.current.dx;
        dragRef.current.totalY += dragRef.current.dy;
        dragRef.current.active = 1;
      } else {
        dragRef.current.dx = 0;
        dragRef.current.dy = 0;
        dragRef.current.active = 0;
      }

      lastMouse.current = { x: nextX, y: nextY };
      mouseRef.current.x = nextX;
      mouseRef.current.y = nextY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const stopDragging = () => {
      isDragging.current = false;
      dragRef.current.active = 0;
      dragRef.current.dx = 0;
      dragRef.current.dy = 0;
      setSceneDraggingState(false);
    };

    const onMouseDown = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        !isInsideHero(event.clientX, event.clientY) ||
        isDragBlockedTarget(event.target)
      ) {
        stopDragging();
        return;
      }

      isDragging.current = true;
      lastMouse.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2,
      };
      dragRef.current.totalX = 0;
      dragRef.current.totalY = 0;
      setSceneDraggingState(true);
    };
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    const onMouseUp = (event: MouseEvent) => {
      if (!isDragging.current) {
        stopDragging();
        return;
      }

      const totalDrag =
        Math.abs(dragRef.current.totalX) + Math.abs(dragRef.current.totalY);
      if (totalDrag < 0.02) {
        clickRef.current = {
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: -(event.clientY / window.innerHeight - 0.5) * 2,
          time: Date.now() / 1000,
        };
      }

      stopDragging();
    };
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (
        !touch ||
        !isInsideHero(touch.clientX, touch.clientY) ||
        isDragBlockedTarget(event.target)
      ) {
        stopDragging();
        return;
      }

      isDragging.current = true;
      lastMouse.current = {
        x: (touch.clientX / window.innerWidth - 0.5) * 2,
        y: -(touch.clientY / window.innerHeight - 0.5) * 2,
      };
      dragRef.current.totalX = 0;
      dragRef.current.totalY = 0;
      setSceneDraggingState(true);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const nextX = (touch.clientX / window.innerWidth - 0.5) * 2;
      const nextY = -(touch.clientY / window.innerHeight - 0.5) * 2;

      mouseRef.current.x = nextX;
      mouseRef.current.y = nextY;

      if (isDragging.current) {
        dragRef.current.dx = nextX - lastMouse.current.x;
        dragRef.current.dy = nextY - lastMouse.current.y;
        dragRef.current.totalX += dragRef.current.dx;
        dragRef.current.totalY += dragRef.current.dy;
        dragRef.current.active = 1;
      }

      lastMouse.current = { x: nextX, y: nextY };
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onTouchEnd = () => stopDragging();
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      stopDragging();
      observer.disconnect();
      media.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const artifactPosition = useMemo<Vec3>(
    () => (isMobile ? [1.08, -0.72, -3.12] : [-0.18, -1.72, -3.12]),
    [isMobile],
  );
  const artifactScale = isMobile ? 0.68 : 1.16;
  const interactivePoints = useMemo(
    () => [[artifactPosition[0], artifactPosition[1]]],
    [artifactPosition],
  );

  useEffect(() => {
    if (isMobile) return;

    let rafId = 0;

    const updateCursor = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const mouseX = mouseRef.current.x * 7;
        const mouseY = mouseRef.current.y * 5;
        const isNearArtifact = interactivePoints.some(([x, y]) => {
          const focusDx = Math.abs(mouseX - x);
          const focusDy = Math.abs(mouseY - y);
          return focusDx < 1.85 && focusDy < 1.12;
        });

        heroElement.classList.toggle(
          "hero-scene-focused",
          isNearArtifact || isDragging.current,
        );

        heroElement.style.cursor = isDragging.current
          ? "grabbing"
          : isNearArtifact
            ? "grab"
            : "default";
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId);
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        heroElement.style.cursor = "default";
        heroElement.classList.remove("hero-scene-focused");
      }
    };
  }, [interactivePoints, isMobile]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.74]">
      <Canvas
        dpr={[0.75, 1.15]}
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.35 }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 3, 5]} intensity={1.35} color={isDark ? "#A5B4FC" : "#818CF8"} />
        <pointLight position={[-4, -1, 4]} intensity={1.2} color={isDark ? "#67E8F9" : "#38BDF8"} />
        <pointLight position={[2.5, 2, 3.5]} intensity={0.9} color={isDark ? "#FDE68A" : "#FDBA74"} />
        <AmbientParticles isDark={isDark} count={isMobile ? 22 : 42} mouseRef={mouseRef} />
        <ResearchArtifact
          clickRef={clickRef}
          dragRef={dragRef}
          isDark={isDark}
          mouseRef={mouseRef}
          position={artifactPosition}
          reducedMotion={reducedMotion}
          scale={artifactScale}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
