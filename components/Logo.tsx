

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-gold-light)" />
          <stop offset="50%" stopColor="var(--brand-gold)" />
          <stop offset="100%" stopColor="var(--brand-gold-dark)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#goldGradient)" stroke="var(--brand-gold-dark)" strokeWidth="2"/>
      <text x="50" y="55" fontFamily="Cairo, sans-serif" fontSize="40" fontWeight="bold" fill="#0B0E13" textAnchor="middle" dominantBaseline="middle">IG</text>
    </svg>
  );
};

export default Logo;