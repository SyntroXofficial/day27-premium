import React from 'react';
import ParticleEffect from './particles/ParticleEffect';
import GradientOverlay from './background/GradientOverlay';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <GradientOverlay />
      <ParticleEffect />
    </div>
  );
}