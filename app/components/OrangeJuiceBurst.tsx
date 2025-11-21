'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type OrangeJuiceBurstProps = JSX.IntrinsicElements['points'] & {
  duration?: number;
};

export function OrangeJuiceBurst({ duration = 12, ...props }: OrangeJuiceBurstProps) {
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const directions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const elevation = Math.random() * Math.PI * 0.5;
      const speed = 6 + Math.random() * 12;
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      directions[i * 3 + 0] = Math.cos(angle) * Math.cos(elevation) * speed;
      directions[i * 3 + 1] = Math.sin(elevation) * speed;
      directions[i * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed;
    }
    return { positions, directions };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uDuration: { value: duration },
      uColor: { value: new THREE.Color('#ff7b00') }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uDuration;
      attribute vec3 direction;
      varying float vLife;
      void main() {
        float t = min(uTime, uDuration);
        vLife = 1.0 - (t / uDuration);
        vec3 displaced = position + direction * (t * 0.18) + vec3(0.0, -9.8, 0.0) * pow(t, 1.35) * 0.02;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        gl_PointSize = 20.0 * vLife;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vLife;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, dist) * vLife;
        gl_FragColor = vec4(uColor, alpha);
      }
    `
  }), [duration]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
  });

  return (
    <points {...props}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-direction" args={[particles.directions, 3]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}
