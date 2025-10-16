import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [dots, setDots] = useState(0);
  const [show, setShow] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    const timer = setTimeout(() => {
      setShow(false);
      // Let the fade-out animation play
      setTimeout(onFinish, 1200);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(dotInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) {
      return (
          <div className="fixed inset-0 bg-brand-navy flex flex-col items-center justify-center text-center z-[9999] animate-fadeOut" />
      )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] flex flex-col items-center justify-center text-center z-[9999]">
      <div className="w-40 md:w-52 mb-4 relative" style={{ animation: 'scaleIn 1.5s ease-out forwards' }}>
        <Logo />
        <div 
            className="absolute inset-0"
            style={{
                animation: 'shimmer 2s infinite linear',
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
                backgroundSize: '1000px 100%'
            }}
        />
      </div>
      <div className="text-brand-gold font-semibold opacity-0" style={{ animation: 'slideUp 0.6s ease-out 0.8s forwards' }}>
        <div className="text-xl md:text-2xl">إمبيريوم غيت</div>
        <div className="text-sm md:text-base text-white/70">
          {t('imperium_gate_slogan')}
        </div>
      </div>
      <p className="mt-8 text-sm text-gray-400 opacity-0" style={{ animation: 'fadeIn 1s ease-out 2s forwards' }}>
        {t('loading_luxury_experience')}{'.'.repeat(dots)}
      </p>
      <style>
        {`
            @keyframes shimmer {
              0% { background-position: -1000px 0; }
              100% { background-position: 1000px 0; }
            }
            @keyframes fadeOut {
              0% { opacity: 1; }
              100% { opacity: 0; }
            }
            .animate-fadeOut { animation: fadeOut 1.2s ease-out forwards; }
        `}
      </style>
    </div>
  );
}