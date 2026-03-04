import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  count?: number;
  isDark: boolean;
}

export default function NeuralNetwork({ count = 120, isDark }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Generate node positions
  const { positions, connections, originalPositions } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    const orig: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      pos.push(new THREE.Vector3(x, y, z));
      orig.push(new THREE.Vector3(x, y, z));
    }

    // Build connections based on proximity
    const conn: [number, number][] = [];
    const maxDist = 2.5;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pos[i].distanceTo(pos[j]) < maxDist) {
          conn.push([i, j]);
        }
      }
    }
    return { positions: pos, connections: conn, originalPositions: orig };
  }, [count]);

  // Mouse tracking
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodeColor = isDark
    ? new THREE.Color("#22D3EE")
    : new THREE.Color("#6366F1");
  const lineColor = isDark
    ? new THREE.Color("#334155")
    : new THREE.Color("#CBD5E1");

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const mouse3D = new THREE.Vector3(
      mousePos.current.x * viewport.width * 0.5,
      mousePos.current.y * viewport.height * 0.5,
      0,
    );

    // Update node positions with mouse interaction
    for (let i = 0; i < count; i++) {
      const orig = originalPositions[i];
      const pos = positions[i];

      // Gentle floating motion
      const floatX = Math.sin(time * 0.3 + i * 0.5) * 0.15;
      const floatY = Math.cos(time * 0.4 + i * 0.3) * 0.15;

      // Mouse repulsion
      const toMouse = new THREE.Vector3().subVectors(
        new THREE.Vector3(orig.x + floatX, orig.y + floatY, orig.z),
        mouse3D,
      );
      const dist = toMouse.length();
      const repulsion = Math.max(0, 1 - dist / 4) * 0.8;
      toMouse.normalize().multiplyScalar(repulsion);

      pos.x = orig.x + floatX + toMouse.x;
      pos.y = orig.y + floatY + toMouse.y;
      pos.z = orig.z;

      // Update instance matrix
      dummy.position.copy(pos);
      const scale = 0.03 + Math.sin(time + i) * 0.01;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connection lines
    const linePositions = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    let idx = 0;
    for (const [a, b] of connections) {
      linePositions.setXYZ(
        idx++,
        positions[a].x,
        positions[a].y,
        positions[a].z,
      );
      linePositions.setXYZ(
        idx++,
        positions[b].x,
        positions[b].y,
        positions[b].z,
      );
    }
    linePositions.needsUpdate = true;
  });

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(connections.length * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [connections]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.8} />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color={lineColor} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}
