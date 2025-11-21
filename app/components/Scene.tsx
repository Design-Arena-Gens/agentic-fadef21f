'use client';

import { Canvas } from '@react-three/fiber';
import { AccumulativeShadows, Environment, SoftShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { GaneshaFigure } from './GaneshaFigure';
import { TreeCluster } from './TreeCluster';
import { OrangeSlice } from './OrangeSlice';
import { OrangeJuiceBurst } from './OrangeJuiceBurst';
import { JuiceSea } from './JuiceSea';
import { SkyDome } from './SkyDome';
import { CinematicCameraRig } from './CinematicCameraRig';

const PerformanceMonitor = dynamic(() => import('./PerformanceMonitor'), { ssr: false });

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 16], fov: 45 }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        const renderer = gl as THREE.WebGLRenderer & { useLegacyLights?: boolean };
        renderer.useLegacyLights = false;
        renderer.toneMappingExposure = 1.2;
      }}
    >
      <Suspense fallback={null}>
        <CinematicCameraRig>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[6, 12, 4]}
            castShadow
            intensity={1.5}
            color="#ffdd9a"
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight
            position={[-8, 4, -6]}
            intensity={0.4}
            color="#6bc1ff"
          />
          <spotLight
            position={[2, 10, 5]}
            intensity={0.8}
            angle={0.7}
            penumbra={0.5}
            color="#ff8c00"
          />

          <SkyDome />
          <TreeCluster />

          <JuiceSea position={[0, -1.6, 0]} />

          <group position={[0, 0, 0]}>
            <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[8, 64]} />
              <meshStandardMaterial color="#224220" roughness={0.9} />
            </mesh>
            <GaneshaFigure position={[0, 0.2, 0]} />
            <OrangeSlice position={[0.6, 0.8, 0.7]} />
            <OrangeJuiceBurst position={[0.6, 0.8, 0.7]} />
          </group>

          <Sparkles count={300} scale={[30, 10, 30]} size={2} speed={0.1} color="#ffd16b" />

          <AccumulativeShadows temporal frames={200} alphaTest={0.9} scale={20} position={[0, -1.2, 0]}>
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffcd5c" />
          </AccumulativeShadows>

          <Environment preset="sunset" background={false} />
        </CinematicCameraRig>

        <SoftShadows size={20} samples={32} focus={0.4} />
        <PerformanceMonitor />
      </Suspense>
    </Canvas>
  );
}
