import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        src="https://ggfx-onebrokergroup.s3.eu-west-2.amazonaws.com/i/Homepage_Banner_Video2_8328_Bdd5c7_f31f1b5265.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-6">
        <div style={{ animation: 'slideUp 1.2s ease-out forwards' }} className="opacity-0">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-gold-light)] via-[var(--brand-gold)] to-[var(--brand-gold-dark)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          >
            Imperium Gate
          </h1>
        </div>

        <div style={{ animation: 'fadeIn 1s ease-out 0.8s forwards' }} className="opacity-0">
          <p
            className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl"
          >
            {t("imperium_gate_slogan")}
          </p>
        </div>

        <div style={{ animation: 'scaleIn 0.6s ease-out 1.2s forwards' }} className="opacity-0">
          <Link
            to="/projects"
            className="bg-brand-gold text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[var(--brand-gold-light)] transform transition duration-300"
          >
            {t("explore_projects")}
          </Link>
        </div>
      </div>
    </section>
  );
}