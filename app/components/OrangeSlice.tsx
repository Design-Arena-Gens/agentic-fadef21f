'use client';

import { useFrame } from '@react-three/fiber';
import { GroupProps } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface OrangeSliceProps extends GroupProps {
  active?: boolean;
}

export function OrangeSlice({ active = true, ...props }: OrangeSliceProps) {
  const orangeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ff7f11', roughness: 0.35, emissive: '#ff922b', emissiveIntensity: 0.15 }),
    []
  );
  const fleshMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffd45c', roughness: 0.2, emissive: '#fcbf49', emissiveIntensity: 0.2 }),
    []
  );
  const knifeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e0e0e0', metalness: 0.9, roughness: 0.2 }),
    []
  );
  const handleMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3d2c29', roughness: 0.8 }),
    []
  );

  const topHalf = useRef<THREE.Group>(null);
  const bottomHalf = useRef<THREE.Group>(null);
  const knife = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cutProgress = Math.min(1, t / 4);
    if (active) {
      topHalf.current?.position.set(0.25 * cutProgress, 0.5 * cutProgress, 0);
      topHalf.current?.rotation.set(0, 0, -Math.PI * 0.45 * cutProgress);
      bottomHalf.current?.position.set(-0.25 * cutProgress, -0.1 * cutProgress, 0);
      knife.current?.rotation.set(-Math.PI / 4 + Math.sin(t * 1.2) * 0.05, Math.sin(t * 0.3) * 0.1, 0);
      knife.current?.position.set(0.2, 0.8 - cutProgress * 0.4, 0.4);
    }
  });

  return (
    <group {...props}>
      <group ref={bottomHalf}>
        <mesh material={orangeMaterial} scale={[1, 1, 1]}>
          <sphereGeometry args={[0.45, 48, 48]} />
        </mesh>
        <mesh material={fleshMaterial} scale={[0.44, 0.44, 0.44]}>
          <sphereGeometry args={[0.45, 48, 48]} />
        </mesh>
      </group>
      <group ref={topHalf}>
        <mesh material={orangeMaterial} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.45, 48, 48, 0, Math.PI]} />
        </mesh>
        <mesh material={fleshMaterial} scale={[0.98, 0.98, 0.98]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.45, 48, 48, 0, Math.PI]} />
        </mesh>
      </group>
      <group ref={knife} position={[0.2, 0.8, 0.4]}>
        <mesh material={knifeMaterial}>
          <boxGeometry args={[0.05, 1.2, 0.3]} />
        </mesh>
        <mesh material={handleMaterial} position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.5, 24]} />
        </mesh>
      </group>
    </group>
  );
}
