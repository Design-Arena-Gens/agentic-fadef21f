'use client';

import { useMemo } from 'react';
import { GroupProps } from '@react-three/fiber';

interface TreeClusterProps extends GroupProps {
  radius?: number;
  count?: number;
}

export function TreeCluster({ radius = 12, count = 80, ...props }: TreeClusterProps) {
  const data = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius * 0.8 + radius * 0.2;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = Math.random() * 0.3;
      positions.push([x, y, z]);
    }
    return positions;
  }, [radius, count]);

  return (
    <group {...props}>
      {data.map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}> 
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.15, 0.3, 1.6, 12]} />
            <meshStandardMaterial color="#6a4023" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial color="#2f8f2f" roughness={0.6} />
          </mesh>
          <mesh position={[0.5, 1.6, 0.2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ff9f45" emissive="#ff8d23" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[-0.3, 1.7, -0.4]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#ffb347" emissive="#ff8015" emissiveIntensity={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
