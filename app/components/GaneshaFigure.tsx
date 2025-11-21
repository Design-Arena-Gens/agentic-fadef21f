'use client';

import { useMemo, useRef } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GaneshaFigureProps extends GroupProps {
  breathing?: boolean;
}

export function GaneshaFigure({ breathing = true, ...props }: GaneshaFigureProps) {
  const materials = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({ color: '#f2d0a4', roughness: 0.4, metalness: 0.1 }),
    cloth: new THREE.MeshStandardMaterial({ color: '#f79f1f', roughness: 0.6 }),
    gold: new THREE.MeshStandardMaterial({ color: '#ffd700', metalness: 0.9, roughness: 0.3 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8a5a44', roughness: 0.8 })
  }), []);

  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!breathing) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.015;
    group.current?.scale.set(scale, scale, scale);
  });

  return (
    <group ref={group} {...props}>
      <mesh material={materials.wood} position={[0, -1.1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.2, 24]} />
      </mesh>

      <group position={[0, -0.2, 0]}>
        <mesh material={materials.cloth} position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.9, 48, 48]} />
        </mesh>
        <mesh material={materials.skin} position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.6, 48, 48]} />
        </mesh>

        <mesh material={materials.skin} position={[0.3, 0.35, 0.6]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.18, 0.15, 0.9, 32]} />
        </mesh>
        <mesh material={materials.skin} position={[-0.3, 0.35, 0.6]} rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.18, 0.15, 0.9, 32]} />
        </mesh>

        <mesh material={materials.skin} position={[0.3, 0.75, 0.3]}>
          <sphereGeometry args={[0.18, 32, 32]} />
        </mesh>
        <mesh material={materials.skin} position={[-0.3, 0.75, 0.3]}>
          <sphereGeometry args={[0.18, 32, 32]} />
        </mesh>

        <mesh material={materials.gold} position={[0, 1.05, 0]}>
          <torusGeometry args={[0.52, 0.05, 16, 48]} />
        </mesh>

        <mesh material={materials.skin} position={[0, 0.6, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 0.9, 32]} />
        </mesh>

        <mesh material={materials.skin} position={[0.4, 0.8, 0]}>
          <dodecahedronGeometry args={[0.25, 0]} />
        </mesh>
        <mesh material={materials.skin} position={[-0.4, 0.8, 0]}>
          <dodecahedronGeometry args={[0.25, 0]} />
        </mesh>

        <mesh material={materials.gold} position={[0, 0.35, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 32]} />
        </mesh>
      </group>
    </group>
  );
}
