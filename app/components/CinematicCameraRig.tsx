'use client';

import { ReactNode, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicCameraRigProps {
  children: ReactNode;
}

export function CinematicCameraRig({ children }: CinematicCameraRigProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const radius = 12;
    const height = 4 + Math.sin(t * 0.4) * 1.5;
    camera.position.lerp(
      new THREE.Vector3(
        Math.cos(t * 0.1) * radius,
        height,
        Math.sin(t * 0.1) * radius
      ),
      0.05
    );
    camera.lookAt(0, 1, 0);
  });

  return <group ref={group}>{children}</group>;
}
