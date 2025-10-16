import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { developers as developerData } from '@/lib/project-data';

export default function DevelopersListPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-brand-navy text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-brand-gold">
          {t('featured_developers')}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2">
          {developerData.map((dev) => (
            <Link key={dev.slug} to={`/developers/${dev.slug}`} className="block group">
              <div className={`relative rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-300 transform hover:-translate-y-1 bg-zinc-900/50 backdrop-blur-md p-8 h-64 flex flex-col justify-between`}>
                 <div className={`absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-brand-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                 <div className="relative flex justify-between items-start">
                    <h2 className="text-3xl font-bold text-white">{dev.name}</h2>
                    <img src={dev.logo} alt={`${dev.name} Logo`} className="w-24 h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <p className="relative text-white/70 text-sm">{dev.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}