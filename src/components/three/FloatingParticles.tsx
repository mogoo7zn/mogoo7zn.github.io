import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  count?: number;
  isDark: boolean;
}

export default function FloatingParticles({ count = 300, isDark }: Props) {
  const ref = useRef<THREE.Points>(null);
  const color = isDark ? "#22D3EE" : "#6366F1";

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 20;
      arr[i + 1] = (Math.random() - 0.5) * 14;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => ({
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      vz: (Math.random() - 0.5) * 0.001,
    }));
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos.array[i3] += speeds[i].vx;
      pos.array[i3 + 1] += speeds[i].vy;
      pos.array[i3 + 2] += speeds[i].vz;

      // Wrap around bounds
      if (Math.abs(pos.array[i3]) > 10) speeds[i].vx *= -1;
      if (Math.abs(pos.array[i3 + 1]) > 7) speeds[i].vy *= -1;
      if (Math.abs(pos.array[i3 + 2]) > 5) speeds[i].vz *= -1;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}
