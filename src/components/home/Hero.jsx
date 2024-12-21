import React from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import FeaturedAccounts from './FeaturedAccounts';

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <HeroBackground />
      <div className="relative z-10">
        <HeroContent />
        <FeaturedAccounts />
      </div>
    </section>
  );
}