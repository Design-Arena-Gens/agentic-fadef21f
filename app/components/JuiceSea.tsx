'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type JuiceSeaProps = JSX.IntrinsicElements['mesh'] & {
  radius?: number;
};

export function JuiceSea({ radius = 40, ...props }: JuiceSeaProps) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ff8c1a',
    emissive: '#ff6a00',
    emissiveIntensity: 0.15,
    roughness: 0.35,
    metalness: 0.0,
    transmission: 0.4,
    thickness: 1.2,
    clearcoat: 0.4,
    clearcoatRoughness: 0.15
  }), []);

  const surface = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const wave = Math.sin(t * 0.6) * 0.3;
    if (surface.current) {
      surface.current.position.y = Math.max(-1.6 + wave, -1.2);
    }
  });

  return (
    <mesh ref={surface} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <circleGeometry args={[radius, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
