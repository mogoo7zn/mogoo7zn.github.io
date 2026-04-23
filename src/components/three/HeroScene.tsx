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

function AmbientParticles({
  count,
  isDark,
}: {
  count: number;
  isDark: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];

    for (let index = 0; index < count; index += 1) {
      const spread = 2 + Math.random() * 4.6;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * spread * (0.95 + Math.random() * 0.5);
      const y = -2.9 + Math.random() * 3.6;
      const z = -3.2 + Math.random() * 2.6 + Math.sin(angle * 2) * 0.5;
      positions.push(x, y, z);
    }

    return createLineGeometry(positions);
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: isDark ? "#5FE3F6" : "#6366F1",
        size: 0.032,
        transparent: true,
        opacity: isDark ? 0.14 : 0.1,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [isDark],
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const elapsed = clock.elapsedTime;
    pointsRef.current.rotation.y = elapsed * 0.024;
    pointsRef.current.position.y = Math.sin(elapsed * 0.18) * 0.05 - 0.35;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function EmbodiedAICoreArtifact({
  clickRef,
  dragRef,
  isDark,
  mouseRef,
  position,
  scale,
}: {
  clickRef: ClickRef;
  dragRef: DragRef;
  isDark: boolean;
  mouseRef: MouseRef;
  position: Vec3;
  scale: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bioTraceRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const hoverMix = useRef(0);
  const dragRotX = useRef(0);
  const dragRotY = useRef(0);
  const lastPulseTime = useRef(0);

  const palette = useMemo(
    () => ({
      primary: isDark ? "#8CA0FF" : "#5B66F5",
      accent: isDark ? "#67E8F9" : "#06B6D4",
      accentSoft: isDark ? "#37C6D8" : "#0EA5B7",
      bio: isDark ? "#89D89E" : "#2FB670",
      warm: isDark ? "#E9C87B" : "#F59E0B",
    }),
    [isDark],
  );

  const materials = useMemo(
    () => ({
      coreShell: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.16,
        wireframe: true,
        depthWrite: false,
      }),
      coreFill: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
      orbit: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        depthWrite: false,
      }),
      orbitSoft: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.12,
        wireframe: true,
        depthWrite: false,
      }),
      armWire: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.26,
        wireframe: true,
        depthWrite: false,
      }),
      armFill: new THREE.MeshBasicMaterial({
        color: palette.accentSoft,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
      link: new THREE.LineBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      }),
      linkWarm: new THREE.LineBasicMaterial({
        color: palette.warm,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
      node: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0.76,
        depthWrite: false,
      }),
      nodePrimary: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
      }),
      bio: new THREE.LineBasicMaterial({
        color: palette.bio,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
      bioNode: new THREE.MeshBasicMaterial({
        color: palette.bio,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
      floorGlow: new THREE.MeshBasicMaterial({
        color: palette.primary,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      pulse: new THREE.MeshBasicMaterial({
        color: palette.accent,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    }),
    [palette],
  );

  const leftArmGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, -0.22, 0.08),
      new THREE.Vector3(-0.85, -0.1, 0.14),
      new THREE.Vector3(-1.55, 0.22, 0.08),
      new THREE.Vector3(-2.35, 0.08, -0.16),
    ]);
    return new THREE.TubeGeometry(curve, 80, 0.055, 10, false);
  }, []);

  const rightArmGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.2, -0.22, 0.08),
      new THREE.Vector3(0.95, -0.08, 0.16),
      new THREE.Vector3(1.6, 0.25, 0.1),
      new THREE.Vector3(2.45, 0.14, -0.12),
    ]);
    return new THREE.TubeGeometry(curve, 80, 0.055, 10, false);
  }, []);

  const latticeData = useMemo(() => {
    const nodes: Vec3[] = [
      [-1.8, 0.36, -0.06],
      [-1.15, 0.64, 0.14],
      [-0.44, 0.72, 0.1],
      [0.18, 0.56, 0.18],
      [0.9, 0.72, 0.1],
      [1.55, 0.46, -0.04],
      [-1.22, -0.06, 0.22],
      [-0.28, 0.02, 0.28],
      [0.72, -0.04, 0.24],
      [1.72, 0.08, 0.04],
      [0, -0.34, 0.34],
    ];

    const indices: Array<[number, number]> = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
      [6, 7],
      [7, 8],
      [8, 9],
      [7, 10],
      [8, 10],
      [2, 10],
      [3, 10],
    ];

    const warmIndices: Array<[number, number]> = [
      [0, 7],
      [1, 7],
      [3, 7],
      [3, 8],
      [5, 8],
      [4, 9],
    ];

    const positions: number[] = [];
    const warmPositions: number[] = [];

    indices.forEach(([start, end]) => {
      positions.push(...nodes[start], ...nodes[end]);
    });

    warmIndices.forEach(([start, end]) => {
      warmPositions.push(...nodes[start], ...nodes[end]);
    });

    return {
      nodes,
      geometry: createLineGeometry(positions),
      warmGeometry: createLineGeometry(warmPositions),
    };
  }, []);

  const bioTraceData = useMemo(() => {
    const curveA = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, -0.48, -0.2),
      new THREE.Vector3(-0.34, -0.16, -0.06),
      new THREE.Vector3(0.2, 0.12, 0.02),
      new THREE.Vector3(0.88, 0.3, -0.08),
    ]);
    const curveB = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.7, -0.26, -0.28),
      new THREE.Vector3(-0.12, -0.08, -0.16),
      new THREE.Vector3(0.46, 0.08, -0.04),
      new THREE.Vector3(1.02, 0.18, -0.12),
    ]);

    const pointsA = curveA.getPoints(48);
    const pointsB = curveB.getPoints(48);
    const positionsA: number[] = [];
    const positionsB: number[] = [];

    for (let index = 1; index < pointsA.length; index += 1) {
      positionsA.push(
        pointsA[index - 1].x,
        pointsA[index - 1].y,
        pointsA[index - 1].z,
        pointsA[index].x,
        pointsA[index].y,
        pointsA[index].z,
      );
    }

    for (let index = 1; index < pointsB.length; index += 1) {
      positionsB.push(
        pointsB[index - 1].x,
        pointsB[index - 1].y,
        pointsB[index - 1].z,
        pointsB[index].x,
        pointsB[index].y,
        pointsB[index].z,
      );
    }

    return {
      geometryA: createLineGeometry(positionsA),
      geometryB: createLineGeometry(positionsB),
      nodes: [
        [-0.64, -0.28, -0.2],
        [0.04, -0.05, -0.06],
        [0.82, 0.18, -0.14],
      ] as Vec3[],
    };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.elapsedTime;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const drag = dragRef.current;

    const hoverDistance = Math.hypot(
      mouseX * 7 - position[0],
      mouseY * 5 - position[1],
    );
    const hoverTarget = hoverDistance < 3.6 ? 1 : 0;
    hoverMix.current += (hoverTarget - hoverMix.current) * 0.04;

    if (drag.active === 1) {
      const startX = (mouseRef.current.x - drag.dx) * 7;
      const startY = (mouseRef.current.y + drag.dy) * 5;
      const dragDistance = Math.hypot(startX - position[0], startY - position[1]);

      if (dragDistance < 4.1) {
        dragRotY.current += drag.dx * 3.4;
        dragRotX.current -= drag.dy * 1.9;
      }
    }

    dragRotY.current *= 0.95;
    dragRotX.current *= 0.92;

    const clickDistance = Math.hypot(
      clickRef.current.x * 7 - position[0],
      clickRef.current.y * 5 - position[1],
    );
    if (clickRef.current.time > lastPulseTime.current && clickDistance < 4.2) {
      lastPulseTime.current = clickRef.current.time;
    }

    const pulseAge = Date.now() / 1000 - lastPulseTime.current;
    const pulseStrength =
      pulseAge >= 0 && pulseAge <= 1.4 ? 1 - pulseAge / 1.4 : 0;

    const targetRotY = elapsed * 0.075 + mouseX * 0.16 + dragRotY.current;
    const targetRotX =
      Math.sin(elapsed * 0.28) * 0.04 - mouseY * 0.09 + dragRotX.current;

    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.position.y = position[1] + Math.sin(elapsed * 0.34) * 0.06;

    const pulseScale =
      1 + hoverMix.current * 0.035 + Math.sin(elapsed * 0.6) * 0.008;
    groupRef.current.scale.setScalar(scale * pulseScale);

    if (orbitRef.current) {
      orbitRef.current.rotation.x = Math.PI / 2.45 + Math.sin(elapsed * 0.3) * 0.06;
      orbitRef.current.rotation.y = elapsed * 0.15;
      orbitRef.current.rotation.z = Math.sin(elapsed * 0.18) * 0.08;
    }

    if (latticeRef.current) {
      latticeRef.current.rotation.y = Math.sin(elapsed * 0.22) * 0.04;
      latticeRef.current.position.y = Math.sin(elapsed * 0.45) * 0.03 + 0.02;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -0.18 - hoverMix.current * 0.08;
      leftArmRef.current.rotation.y = -0.08 - hoverMix.current * 0.03;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 0.14 + hoverMix.current * 0.08;
      rightArmRef.current.rotation.y = 0.08 + hoverMix.current * 0.03;
    }

    if (bioTraceRef.current) {
      bioTraceRef.current.rotation.z = Math.sin(elapsed * 0.28) * 0.06;
      bioTraceRef.current.position.y = -0.02 + Math.sin(elapsed * 0.38) * 0.03;
    }

    materials.coreShell.opacity = 0.16 + hoverMix.current * 0.07;
    materials.coreFill.opacity = 0.08 + pulseStrength * 0.05;
    materials.orbit.opacity = 0.2 + hoverMix.current * 0.08;
    materials.orbitSoft.opacity = 0.12 + hoverMix.current * 0.05;
    materials.armWire.opacity = 0.26 + hoverMix.current * 0.1;
    materials.armFill.opacity = 0.08 + hoverMix.current * 0.05;
    materials.link.opacity = 0.26 + hoverMix.current * 0.06;
    materials.linkWarm.opacity = 0.18 + pulseStrength * 0.12;
    materials.node.opacity = 0.74 + hoverMix.current * 0.14;
    materials.nodePrimary.opacity = 0.82 + pulseStrength * 0.08;
    materials.bio.opacity = 0.1 + pulseStrength * 0.04;
    materials.bioNode.opacity = 0.28 + pulseStrength * 0.08;
    materials.floorGlow.opacity = 0.06 + pulseStrength * 0.04;
    materials.pulse.opacity = pulseStrength * 0.14;

    if (pulseRef.current) {
      const ringScale = 1 + (1 - pulseStrength) * 2.8;
      pulseRef.current.scale.setScalar(ringScale);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh
        position={[0.2, -1.32, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.floorGlow}
        scale={[1.65, 0.88, 1]}
      >
        <ringGeometry args={[1.15, 2.3, 120]} />
      </mesh>

      <mesh
        ref={pulseRef}
        position={[0.18, -1.32, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.pulse}
        scale={[1.55, 0.82, 1]}
      >
        <ringGeometry args={[0.95, 1.55, 120]} />
      </mesh>

      <group ref={orbitRef} position={[0.12, -0.12, 0]}>
        <mesh material={materials.orbit} scale={[1.8, 0.66, 1]}>
          <torusGeometry args={[1.22, 0.028, 10, 180]} />
        </mesh>
        <mesh
          rotation={[0.42, Math.PI / 2.5, 0.1]}
          material={materials.orbitSoft}
          scale={[1.5, 0.92, 1]}
        >
          <torusGeometry args={[0.92, 0.022, 8, 160]} />
        </mesh>
      </group>

      <mesh position={[0.18, -0.16, 0.08]} material={materials.coreShell}>
        <icosahedronGeometry args={[0.42, 1]} />
      </mesh>
      <mesh position={[0.18, -0.16, 0.08]} material={materials.coreFill}>
        <octahedronGeometry args={[0.22, 0]} />
      </mesh>
      <mesh position={[0.18, -0.16, 0.08]} material={materials.nodePrimary}>
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>

      <group ref={latticeRef}>
        <lineSegments geometry={latticeData.geometry} material={materials.link} />
        <lineSegments
          geometry={latticeData.warmGeometry}
          material={materials.linkWarm}
        />
        {latticeData.nodes.map((node, index) => (
          <mesh
            key={`lattice-node-${index}`}
            position={node}
            material={index % 3 === 0 ? materials.nodePrimary : materials.node}
          >
            <sphereGeometry args={[index === 10 ? 0.07 : 0.055, 14, 14]} />
          </mesh>
        ))}
      </group>

      <group ref={leftArmRef}>
        <mesh geometry={leftArmGeometry} material={materials.armWire} />
        <mesh geometry={leftArmGeometry} material={materials.armFill} />
        <mesh position={[-2.5, 0.16, -0.18]} material={materials.nodePrimary}>
          <sphereGeometry args={[0.065, 14, 14]} />
        </mesh>
        <mesh position={[-1.66, 0.34, 0.06]} material={materials.node}>
          <sphereGeometry args={[0.048, 14, 14]} />
        </mesh>
      </group>

      <group ref={rightArmRef}>
        <mesh geometry={rightArmGeometry} material={materials.armWire} />
        <mesh geometry={rightArmGeometry} material={materials.armFill} />
        <mesh position={[2.58, 0.2, -0.12]} material={materials.nodePrimary}>
          <sphereGeometry args={[0.065, 14, 14]} />
        </mesh>
        <mesh position={[1.78, 0.38, 0.08]} material={materials.node}>
          <sphereGeometry args={[0.048, 14, 14]} />
        </mesh>
      </group>

      <group ref={bioTraceRef} position={[0.12, -0.18, -0.24]}>
        <lineSegments geometry={bioTraceData.geometryA} material={materials.bio} />
        <lineSegments geometry={bioTraceData.geometryB} material={materials.bio} />
        {bioTraceData.nodes.map((node, index) => (
          <mesh
            key={`bio-trace-${index}`}
            position={node}
            material={materials.bioNode}
          >
            <sphereGeometry args={[0.042, 12, 12]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function HeroScene() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() =>
      setIsDark(html.classList.contains("dark")),
    );
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

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
    () => (isMobile ? [0, -2.42, -3.1] : [-1.05, -2.48, -3.15]),
    [isMobile],
  );
  const artifactScale = isMobile ? 0.82 : 1.18;
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
          return Math.hypot(mouseX - x, mouseY - y) < 4.3;
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
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.56]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <AmbientParticles isDark={isDark} count={isMobile ? 70 : 120} />
        <EmbodiedAICoreArtifact
          clickRef={clickRef}
          dragRef={dragRef}
          isDark={isDark}
          mouseRef={mouseRef}
          position={artifactPosition}
          scale={artifactScale}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
