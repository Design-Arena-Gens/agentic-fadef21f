'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

type SkyDomeProps = JSX.IntrinsicElements['mesh'];

export function SkyDome(props: SkyDomeProps) {
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    color: new THREE.Color('#ffb347'),
    fog: false
  }), []);

  return (
    <mesh {...props}>
      <sphereGeometry args={[120, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
