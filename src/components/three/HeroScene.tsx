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
        size: 0.028,
        transparent: true,
        opacity: isDark ? 0.15 : 0.1,
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

function KineticResearchArtifact({
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
  const gimbalRef = useRef<THREE.Group>(null);
  const fieldRef = useRef<THREE.Group>(null);
  const leftPanelRef = useRef<THREE.Group>(null);
  const rightPanelRef = useRef<THREE.Group>(null);
  const satelliteARef = useRef<THREE.Mesh>(null);
  const satelliteBRef = useRef<THREE.Mesh>(null);
  const satelliteCRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const scanLeftRef = useRef<THREE.Mesh>(null);
  const scanRightRef = useRef<THREE.Mesh>(null);
  const hoverMix = useRef(0);
  const introMix = useRef(0);
  const dragRotX = useRef(0);
  const dragRotY = useRef(0);
  const lastPulseToken = useRef(0);
  const pulseStart = useRef(-10);

  const palette = useMemo(
    () => ({
      primary: isDark ? "#91A4FF" : "#5765F2",
      accent: isDark ? "#67E8F9" : "#0891B2",
      surface: isDark ? "#15213E" : "#EEF2FF",
      surfaceGlow: isDark ? "#1F2A56" : "#D7E6FF",
      line: isDark ? "#7EE7F6" : "#4A63FF",
      node: isDark ? "#F4D17F" : "#F59E0B",
      shadow: isDark ? "#020817" : "#C7D2FE",
    }),
    [isDark],
  );

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: palette.primary,
        emissive: palette.primary,
        emissiveIntensity: isDark ? 0.35 : 0.18,
        metalness: 0.38,
        roughness: 0.36,
        transparent: true,
        opacity: 0.28,
      }),
      shellWire: new THREE.MeshBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.42 : 0.28,
        wireframe: true,
        depthWrite: false,
      }),
      innerCore: new THREE.MeshStandardMaterial({
        color: palette.surface,
        emissive: palette.accent,
        emissiveIntensity: isDark ? 0.3 : 0.16,
        metalness: 0.18,
        roughness: 0.24,
        transparent: true,
        opacity: 0.94,
      }),
      ringPrimary: new THREE.MeshBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.44 : 0.22,
        depthWrite: false,
      }),
      ringSoft: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: isDark ? 0.22 : 0.12,
        depthWrite: false,
      }),
      plane: new THREE.MeshBasicMaterial({
        color: palette.surfaceGlow,
        transparent: true,
        opacity: isDark ? 0.16 : 0.14,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      planeGlow: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: isDark ? 0.1 : 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      guide: new THREE.LineBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.32 : 0.22,
        depthWrite: false,
      }),
      connector: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: isDark ? 0.18 : 0.14,
        depthWrite: false,
      }),
      connectorGlow: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: isDark ? 0.12 : 0.08,
        depthWrite: false,
      }),
      fieldLink: new THREE.LineBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: isDark ? 0.36 : 0.2,
        depthWrite: false,
      }),
      fieldNode: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.84,
        depthWrite: false,
      }),
      fieldNodeWarm: new THREE.MeshBasicMaterial({
        color: palette.node,
        transparent: true,
        opacity: 0.84,
        depthWrite: false,
      }),
      pulse: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      floorGlow: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: isDark ? 0.08 : 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      scan: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: isDark ? 0.26 : 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      satellite: new THREE.MeshStandardMaterial({
        color: palette.node,
        emissive: palette.node,
        emissiveIntensity: isDark ? 0.42 : 0.2,
        metalness: 0.18,
        roughness: 0.38,
      }),
    }),
    [isDark, palette],
  );

  const leftConnectorGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, -0.06, 0.04),
      new THREE.Vector3(-0.52, 0.06, 0.1),
      new THREE.Vector3(-0.96, 0.18, 0.06),
      new THREE.Vector3(-1.34, 0.26, -0.04),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.028, 12, false);
  }, []);

  const rightConnectorGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22, -0.12, 0.02),
      new THREE.Vector3(0.54, -0.08, 0.12),
      new THREE.Vector3(0.98, 0.02, 0.08),
      new THREE.Vector3(1.42, 0.08, -0.06),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.028, 12, false);
  }, []);

  const fieldGeometry = useMemo(() => {
    const nodes: Vec3[] = [
      [-1.18, 0.8, -0.06],
      [-0.58, 0.5, 0.16],
      [0.04, 0.68, 0.1],
      [0.64, 0.46, 0.18],
      [1.18, 0.74, 0.04],
      [-0.84, 0.08, 0.22],
      [-0.16, 0.04, 0.3],
      [0.54, -0.02, 0.24],
      [1.12, 0.08, 0.1],
      [0.04, -0.34, 0.34],
    ];

    const indices: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
      [5, 6],
      [6, 7],
      [7, 8],
      [6, 9],
      [7, 9],
      [2, 9],
      [3, 9],
    ];

    const positions: number[] = [];
    indices.forEach(([start, end]) => {
      positions.push(...nodes[start], ...nodes[end]);
    });

    return { nodes, geometry: createLineGeometry(positions) };
  }, []);

  const panelGuideGeometry = useMemo(() => createPanelGuideGeometry(1.22, 0.76, 4, 4), []);

  useFrame(({ clock }, rawDelta) => {
    if (!groupRef.current) return;

    const delta = Math.min(rawDelta, 0.03);
    const elapsed = clock.elapsedTime;
    const motionScale = reducedMotion ? 0.38 : 1;
    introMix.current = THREE.MathUtils.damp(
      introMix.current,
      1,
      reducedMotion ? 1.8 : 1.2,
      delta,
    );

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const drag = dragRef.current;

    const hoverDistance = Math.hypot(
      mouseX * 7 - position[0],
      mouseY * 5 - position[1],
    );
    const hoverTarget = hoverDistance < 3.8 ? 1 : 0;
    hoverMix.current = THREE.MathUtils.damp(
      hoverMix.current,
      hoverTarget,
      4,
      delta,
    );

    if (drag.active === 1) {
      const startX = (mouseRef.current.x - drag.dx) * 7;
      const startY = (mouseRef.current.y + drag.dy) * 5;
      const dragDistance = Math.hypot(startX - position[0], startY - position[1]);

      if (dragDistance < 4.2) {
        dragRotY.current = THREE.MathUtils.clamp(
          dragRotY.current + drag.dx * 1.35,
          -0.65,
          0.65,
        );
        dragRotX.current = THREE.MathUtils.clamp(
          dragRotX.current - drag.dy * 0.95,
          -0.42,
          0.42,
        );
      }
    }

    dragRotY.current = THREE.MathUtils.damp(dragRotY.current, 0, 3.2, delta);
    dragRotX.current = THREE.MathUtils.damp(dragRotX.current, 0, 3.6, delta);

    const clickDistance = Math.hypot(
      clickRef.current.x * 7 - position[0],
      clickRef.current.y * 5 - position[1],
    );
    if (clickRef.current.time > lastPulseToken.current && clickDistance < 4.1) {
      lastPulseToken.current = clickRef.current.time;
      pulseStart.current = elapsed;
    }

    const pulseAge = elapsed - pulseStart.current;
    const pulseStrength =
      pulseAge >= 0 && pulseAge <= 1.4 ? 1 - pulseAge / 1.4 : 0;
    const intro = introMix.current * motionScale;
    const hover = hoverMix.current;
    const baseRotY = elapsed * 0.022 * intro;
    const baseRotX = Math.sin(elapsed * 0.2) * 0.035 * intro;
    const targetRotY = baseRotY + mouseX * 0.11 + dragRotY.current;
    const targetRotX = baseRotX - mouseY * 0.08 + dragRotX.current;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3.4,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3.6,
      delta,
    );
    groupRef.current.position.y =
      position[1] + Math.sin(elapsed * 0.28) * 0.055 * intro;

    const scaleMix = 1 + hover * 0.035 + pulseStrength * 0.03;
    groupRef.current.scale.setScalar(scale * scaleMix);

    if (gimbalRef.current) {
      gimbalRef.current.rotation.x =
        Math.PI / 2.8 + Math.sin(elapsed * 0.22) * 0.06 * intro;
      gimbalRef.current.rotation.y = elapsed * 0.04 * intro;
      gimbalRef.current.rotation.z =
        Math.sin(elapsed * 0.16) * 0.08 * intro + hover * 0.04;
    }

    if (fieldRef.current) {
      fieldRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.06 * intro;
      fieldRef.current.position.y =
        0.06 + Math.sin(elapsed * 0.34) * 0.03 * intro;
    }

    if (leftPanelRef.current) {
      leftPanelRef.current.rotation.y =
        0.4 + hover * 0.12 + Math.sin(elapsed * 0.24) * 0.04 * intro;
      leftPanelRef.current.rotation.x =
        0.12 + Math.sin(elapsed * 0.18) * 0.03 * intro;
      leftPanelRef.current.position.z = -0.08 + hover * 0.08;
    }

    if (rightPanelRef.current) {
      rightPanelRef.current.rotation.y =
        -0.48 - hover * 0.12 + Math.sin(elapsed * 0.2 + 0.6) * 0.04 * intro;
      rightPanelRef.current.rotation.x =
        -0.08 + Math.sin(elapsed * 0.16 + 0.5) * 0.03 * intro;
      rightPanelRef.current.position.z = 0.02 + hover * 0.08;
    }

    if (scanLeftRef.current) {
      scanLeftRef.current.position.x =
        Math.sin(elapsed * (0.8 + hover * 0.18) * intro + 0.4) * 0.42;
    }

    if (scanRightRef.current) {
      scanRightRef.current.position.x =
        Math.sin(elapsed * (0.72 + hover * 0.2) * intro + Math.PI * 0.35) * 0.42;
    }

    const orbitSpeed = (0.42 + hover * 0.18) * intro;
    if (satelliteARef.current) {
      satelliteARef.current.position.set(
        Math.cos(elapsed * orbitSpeed) * 1.58,
        0.18 + Math.sin(elapsed * orbitSpeed * 1.7) * 0.18,
        Math.sin(elapsed * orbitSpeed) * 0.42,
      );
    }

    if (satelliteBRef.current) {
      satelliteBRef.current.position.set(
        Math.cos(elapsed * orbitSpeed + 2.2) * 1.22,
        -0.26 + Math.sin(elapsed * orbitSpeed * 1.4 + 0.9) * 0.16,
        Math.sin(elapsed * orbitSpeed + 2.2) * 0.52,
      );
    }

    if (satelliteCRef.current) {
      satelliteCRef.current.position.set(
        Math.cos(elapsed * orbitSpeed + 4.1) * 1.76,
        0.04 + Math.sin(elapsed * orbitSpeed * 1.25 + 0.4) * 0.22,
        Math.sin(elapsed * orbitSpeed + 4.1) * 0.34,
      );
    }

    materials.shell.opacity = 0.28 + hover * 0.08 + pulseStrength * 0.04;
    materials.shellWire.opacity = (isDark ? 0.42 : 0.28) + hover * 0.08;
    materials.innerCore.emissiveIntensity = (isDark ? 0.3 : 0.16) + hover * 0.08;
    materials.ringPrimary.opacity = (isDark ? 0.44 : 0.22) + hover * 0.08;
    materials.ringSoft.opacity = (isDark ? 0.22 : 0.12) + pulseStrength * 0.1;
    materials.plane.opacity = (isDark ? 0.16 : 0.14) + hover * 0.06;
    materials.planeGlow.opacity = (isDark ? 0.1 : 0.08) + pulseStrength * 0.08;
    materials.guide.opacity = (isDark ? 0.32 : 0.22) + hover * 0.06;
    materials.connector.opacity = (isDark ? 0.18 : 0.14) + hover * 0.04;
    materials.connectorGlow.opacity = (isDark ? 0.12 : 0.08) + pulseStrength * 0.08;
    materials.fieldLink.opacity = (isDark ? 0.36 : 0.2) + hover * 0.06;
    materials.fieldNode.opacity = 0.84 + hover * 0.08;
    materials.fieldNodeWarm.opacity = 0.84 + pulseStrength * 0.1;
    materials.floorGlow.opacity = (isDark ? 0.08 : 0.05) + pulseStrength * 0.05;
    materials.pulse.opacity = pulseStrength * 0.16;
    materials.scan.opacity = (isDark ? 0.26 : 0.18) + hover * 0.08;
    materials.satellite.emissiveIntensity = (isDark ? 0.42 : 0.2) + hover * 0.08;

    if (pulseRef.current) {
      const ringScale = 1 + (1 - pulseStrength) * 1.8;
      pulseRef.current.scale.setScalar(ringScale);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh
        position={[0.04, -1.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.floorGlow}
        scale={[1.5, 0.92, 1]}
      >
        <ringGeometry args={[1.04, 2.12, 128]} />
      </mesh>

      <mesh
        ref={pulseRef}
        position={[0.04, -1.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.pulse}
        scale={[1.1, 1.1, 1]}
      >
        <ringGeometry args={[0.92, 1.36, 128]} />
      </mesh>

      <group ref={gimbalRef} position={[0, -0.08, 0.02]}>
        <mesh material={materials.ringPrimary} scale={[1.58, 0.8, 1]}>
          <torusGeometry args={[0.96, 0.024, 10, 180]} />
        </mesh>
        <mesh rotation={[0.54, Math.PI / 2.7, 0.18]} material={materials.ringSoft}>
          <torusGeometry args={[0.76, 0.02, 10, 160]} />
        </mesh>
        <mesh rotation={[1.18, -0.42, 0.2]} material={materials.ringSoft}>
          <torusGeometry args={[1.18, 0.018, 10, 180]} />
        </mesh>
      </group>

      <mesh position={[0, -0.08, 0.04]} material={materials.shell}>
        <octahedronGeometry args={[0.34, 0]} />
      </mesh>
      <mesh position={[0, -0.08, 0.04]} material={materials.shellWire}>
        <icosahedronGeometry args={[0.5, 0]} />
      </mesh>
      <mesh position={[0, -0.08, 0.04]} material={materials.innerCore}>
        <sphereGeometry args={[0.12, 24, 24]} />
      </mesh>

      <group ref={leftPanelRef} position={[-1.32, 0.22, -0.08]} rotation={[0.12, 0.4, -0.28]}>
        <mesh material={materials.plane}>
          <planeGeometry args={[1.22, 0.76]} />
        </mesh>
        <mesh position={[0, 0, -0.01]} material={materials.planeGlow}>
          <planeGeometry args={[1.06, 0.64]} />
        </mesh>
        <lineSegments position={[0, 0, 0.012]} geometry={panelGuideGeometry} material={materials.guide} />
        <mesh ref={scanLeftRef} position={[0, 0, 0.018]} material={materials.scan}>
          <planeGeometry args={[0.14, 0.7]} />
        </mesh>
      </group>

      <group ref={rightPanelRef} position={[1.42, 0.02, 0.02]} rotation={[-0.08, -0.48, 0.2]}>
        <mesh material={materials.plane}>
          <planeGeometry args={[1.22, 0.76]} />
        </mesh>
        <mesh position={[0, 0, -0.01]} material={materials.planeGlow}>
          <planeGeometry args={[1.06, 0.64]} />
        </mesh>
        <lineSegments position={[0, 0, 0.012]} geometry={panelGuideGeometry} material={materials.guide} />
        <mesh ref={scanRightRef} position={[0, 0, 0.018]} material={materials.scan}>
          <planeGeometry args={[0.14, 0.7]} />
        </mesh>
      </group>

      <mesh geometry={leftConnectorGeometry} material={materials.connector} />
      <mesh geometry={leftConnectorGeometry} material={materials.connectorGlow} />
      <mesh geometry={rightConnectorGeometry} material={materials.connector} />
      <mesh geometry={rightConnectorGeometry} material={materials.connectorGlow} />

      <group ref={fieldRef} position={[0, 0.04, -0.24]}>
        <lineSegments geometry={fieldGeometry.geometry} material={materials.fieldLink} />
        {fieldGeometry.nodes.map((node, index) => (
          <mesh
            key={`field-node-${index}`}
            position={node}
            material={index === 2 || index === 9 ? materials.fieldNodeWarm : materials.fieldNode}
          >
            <sphereGeometry args={[index === 9 ? 0.065 : 0.052, 14, 14]} />
          </mesh>
        ))}
      </group>

      <mesh ref={satelliteARef} material={materials.satellite}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>
      <mesh ref={satelliteBRef} material={materials.satellite}>
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>
      <mesh ref={satelliteCRef} material={materials.satellite}>
        <sphereGeometry args={[0.045, 16, 16]} />
      </mesh>
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
    () => (isMobile ? [0, -2.36, -3.1] : [-1.02, -2.42, -3.12]),
    [isMobile],
  );
  const artifactScale = isMobile ? 0.86 : 1.2;
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
          return Math.hypot(mouseX - x, mouseY - y) < 4.1;
        });

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
      if (heroElement) heroElement.style.cursor = "default";
    };
  }, [interactivePoints, isMobile]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.68]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[4, 3, 5]} intensity={1.35} color={isDark ? "#A5B4FC" : "#818CF8"} />
        <pointLight position={[-4, -1, 4]} intensity={1.2} color={isDark ? "#67E8F9" : "#38BDF8"} />
        <pointLight position={[2.5, 2, 3.5]} intensity={0.9} color={isDark ? "#FDE68A" : "#FDBA74"} />
        <AmbientParticles isDark={isDark} count={isMobile ? 64 : 112} mouseRef={mouseRef} />
        <KineticResearchArtifact
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
